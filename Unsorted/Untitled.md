# Pulse — Backend Implementation Plan

## Context

Group assignment (group-28): build the **backend and tests** of Pulse, a multi-source dashboard that pulls news (GNews), video (YouTube Data API v3), and discussion (Reddit) for a user's chosen interests, enriches/normalizes the data, computes a transparent relevance score, and clusters items about the same event into "stories". The repo currently contains only empty `backend/` and `frontend/` folders and a README stub. The deliverable is graded against a rubric emphasizing: RESTful design (nouns, correct HTTP methods, statelessness), CRUD + persistence, external-data enrichment (10 pts), TDD with git-visible test-first commits (10 pts), test coverage of success/failure/edge cases (20 pts), docstrings + type hints, no hardcoded secrets, `requirements.txt`, and feature-branch workflow.

Key design decisions:
- **Multi-user with login** — implemented with *stateless* signed bearer tokens (no Flask sessions, per rubric).
- **stdlib `sqlite3`** (no ORM) behind a small repository layer.
- **4 team members**, each on a dedicated feature branch.
- **No API keys yet** — fetchers built behind an interface with a fixture/demo mode; Reddit app registration starts immediately (one-time approval delay).

## Project structure

```
backend/
  app.py                  # create_app() factory, blueprint registration, error handlers
  config.py               # env-driven config via python-dotenv (.env, never committed)
  db.py                   # sqlite3 connection helper, schema.sql executor, per-request conn
  schema.sql              # all CREATE TABLE statements
  auth.py                 # password hashing (werkzeug), signed tokens (itsdangerous), @require_auth
  routes/
    users.py              # /api/users, /api/tokens, /api/users/me
    interests.py          # /api/interests CRUD
    items.py              # /api/items feed + query service, /api/items/stats
    stories.py            # /api/stories
    collections.py        # /api/collections CRUD + membership
    feedback.py           # /api/feedback
  services/
    fetchers/
      base.py             # SourceClient protocol + FixtureClient (demo mode)
      gnews.py, youtube.py, reddit.py
    normalize.py          # raw payload -> common Item dict
    enrich.py             # read/watch time, sentiment, keywords, credibility tier
    scoring.py            # transparent weighted relevance score + breakdown
    clustering.py         # group items into stories (Jaccard + union-find)
    cache.py              # TTL cache over api_cache table
    pipeline.py           # fetch -> normalize -> enrich -> store -> cluster orchestration
  repositories/           # plain-SQL data access: users.py, interests.py, items.py, ...
  fixtures/               # recorded sample JSON payloads per source (real API shapes)
  tests/
    conftest.py           # app fixture (in-memory DB), auth helper, fake fetchers
    test_auth.py, test_users_api.py, test_interests_api.py, test_items_api.py,
    test_stories_api.py, test_collections_api.py, test_feedback_api.py,
    test_normalize.py, test_enrich.py, test_scoring.py, test_clustering.py,
    test_cache.py, test_fetchers.py
requirements.txt          # flask, requests, python-dotenv, pytest
.env.example              # GNEWS_API_KEY=, YOUTUBE_API_KEY=, REDDIT_CLIENT_ID=, ... SECRET_KEY=
.gitignore                # .env, .venv/, __pycache__/, *.db, .pytest_cache/
README.md                 # fill in skeleton: setup, run, test, API table, architecture
```

Every module gets a module docstring; every function gets a docstring + full type hints (two 5-pt rubric lines).

## Database schema (SQLite, `schema.sql`)

- `users(id, username UNIQUE, password_hash, weights_json, source_prefs_json, created_at)` — weights = relevance tuning (interest/recency/popularity/source-type), satisfies "user-tunable".
- `interests(id, user_id FK, name, keywords_json, weight, created_at)`
- `items(id, external_id UNIQUE, source_type CHECK IN ('news','video','discussion'), source_name, url, title, summary, author, published_at, metrics_json, read_time_min, sentiment_score, sentiment_label, keywords_json, credibility_tier, story_id FK NULL, fetched_at)`
- `stories(id, title, item_count, first_seen_at, last_updated_at)`
- `collections(id, user_id FK, name, description, created_at)` + `collection_items(collection_id, item_id, added_at, PK(collection_id,item_id))`
- `feedback(id, user_id FK, item_id FK, kind CHECK IN ('more','less','hide'), created_at)`
- `api_cache(cache_key PK, payload_json, fetched_at, ttl_seconds)`

DB file path from config; tests use `:memory:`. Foreign keys ON, `ON DELETE CASCADE` for user-owned rows.

## REST API

All JSON, all under `/api`, errors as `{"error": {"code", "message"}}` (consistent envelope; 400 validation, 401 bad/expired token, 404, 409 duplicate, 502 upstream failure, 429 when upstream rate-limits). Empty results are `200` with `[]` + meta, never errors.

**Auth (stateless — no sessions):** `POST /api/users` register (hash via `werkzeug.security`); `POST /api/tokens` login → returns an `itsdangerous`-signed expiring token (nothing stored server-side); every protected route reads `Authorization: Bearer <token>` via `@require_auth`. Both libs ship with Flask — no new deps, and the API stores zero state between requests.

| Resource | Endpoints |
|---|---|
| Users | `POST /api/users` · `POST /api/tokens` · `GET /api/users/me` · `PATCH /api/users/me` (update weights/prefs) |
| Interests | `GET /api/interests` · `POST /api/interests` · `GET /api/interests/<id>` · `PUT /api/interests/<id>` · `DELETE /api/interests/<id>` |
| Items (feed + **query service**) | `GET /api/items?source_type=&interest_id=&q=&window=24h\|7d\|30d&sort=relevance\|recency\|popularity&page=&per_page=` · `GET /api/items/<id>` · `GET /api/items/stats?by=source_type\|interest\|day` (powers frontend charts) |
| Stories | `GET /api/stories` (same filters) · `GET /api/stories/<id>` (all clustered items) |
| Collections | `GET/POST /api/collections` · `GET/PUT/DELETE /api/collections/<id>` · `PUT /api/collections/<id>/items/<item_id>` (idempotent add) · `DELETE /api/collections/<id>/items/<item_id>` |
| Feedback | `GET/POST /api/feedback` · `DELETE /api/feedback/<id>` |
| Misc | `GET /api/health` |

Notes: 4+ filters on the query service (rubric needs ≥3). Item responses include `score` **and** `score_breakdown` (transparency requirement). No verb endpoints — refresh is lazy: `GET /api/items` triggers the pipeline when cache is stale.

## Core services (the 10-pt "External Data" standout)

- **Fetchers** (`base.py`): `SourceClient` protocol with `search(query, limit) -> list[dict]`. Real clients use `requests` with keys from env. `FixtureClient` replays `fixtures/*.json` when `FIXTURE_MODE=1` or a key is missing — the whole app runs and demos with zero keys. Tests always use fixtures/mocks (spec mandates mocked external calls).
- **normalize.py**: each raw source dict → one common item shape (id, title, url, published_at as UTC ISO, metrics like views/upvotes/comments). Handles missing fields, malformed dates, HTML entities.
- **enrich.py**: `read_time` (words/200wpm; videos parse ISO-8601 duration); `sentiment` (own small lexicon scorer, −1..1 + label — no dep, demonstrably our code); `keywords` (shared tokenizer + stopword removal + top-N frequency); `credibility_tier` (static domain/channel/subreddit → high/medium/unknown map).
- **scoring.py**: `score = w_i·interest_match + w_r·recency_decay + w_p·popularity + w_s·source_pref`, each component normalized to [0,1] (recency = exponential decay, half-life 24h; popularity = log-scaled per source type; interest_match = keyword overlap). Weights come from `users.weights_json` (PATCH-able), function returns `(score, breakdown)`.
- **clustering.py**: tokenize title+keywords (reuse enrich tokenizer) → Jaccard similarity; union-find merge for pairs ≥ threshold (~0.35) within a 72h window; story title from the highest-credibility/earliest item. Deterministic → easy to unit test.
- **cache.py + pipeline.py**: cache key = hash(source, normalized query); per-source TTLs (news 30 min, YouTube 60 min, Reddit 10 min) to respect quotas. Pipeline: for each interest → cache check → fetch → normalize → enrich → upsert items → re-cluster affected window.

## TDD + testing (30 rubric pts — non-negotiable workflow)

On **every** feature branch, in this order, as **separate commits** so git history proves test-first:
1. `test: add failing tests for <feature>` — commit.
2. `feat: implement <feature>` — commit (tests now pass).

Coverage matrix — each area gets success / failure / edge tests:
- **Unit**: normalize (missing fields, bad dates, unicode), enrich (empty text, zero-length video, neutral sentiment), scoring (zero weights, future timestamps, breakdown sums to score), clustering (identical titles, near-duplicates, singleton stories, window boundary), cache (hit, miss, expiry via injected clock), fetchers (parses fixture payloads, raises on 429/500).
- **API/integration** (Flask test client, fetchers monkeypatched): full CRUD per resource incl. 400 bad payloads, 401 missing/expired token, 404 wrong id, 409 duplicate username, ownership checks (user A can't touch user B's interest), all query-filter combos, empty feed, upstream-failure → 502, persistence across two app instances on the same DB file.

Run: `pytest backend/tests -q`.

## Work split — 4 members, feature branches off `main`

**Phase 0 — `feature/foundation`** (one member + review, merged first, ~day 1): app factory, `config.py`, `db.py` + `schema.sql`, error handlers, `/api/health`, `conftest.py`, `requirements.txt`, `.env.example`, `.gitignore`. Everything else branches after this merges.

**Phase 1 — parallel branches:**
- **Member A (ISIAH) — `feature/auth-users`**: register, tokens, `GET/PATCH /users/me`, `@require_auth`.
- **Member B (MIKOŁAJ)— `feature/sources`**: fetchers + fixtures + normalize + cache. *Also registers the Reddit app now.*
- **Member C (KARINA) — `feature/enrichment-scoring`**: enrich.py + scoring.py (pure functions, no API surface — zero merge conflicts).
- **Member D (IAIN) — `feature/crud`**: interests, collections, feedback endpoints + repositories.

**Phase 2 — integration branches:**
- **C (KARINA)— `feature/clustering`**: clustering.py + stories endpoints.
- **B + D (MIKOŁAJ + IAIN)— `feature/feed`**: pipeline.py + `GET /api/items` query service.
- **A (ISIAH)— `feature/stats`**: `/api/items/stats` + 429/502 upstream error handling polish.
- **All — `feature/docs`**: README (setup/run/test/API table), docstring & type-hint sweep.

Each branch: tests-first commits → PR → one teammate reviews → merge. Push everything well before the deadline (5 pts ride on it).

## Rubric checklist (verify before submission)

- [ ] Nouns-only endpoints, correct GET/POST/PUT/PATCH/DELETE
- [ ] No `flask.session` anywhere; auth via signed bearer token only
- [ ] Full CRUD on interests + collections (and users, feedback)
- [ ] SQLite persists across restarts (test covers it)
- [ ] Enrichment: normalization + 4 derived fields + scoring + clustering
- [ ] ≥3 query filters (we ship 4+ plus sort + pagination)
- [ ] Keys only in `.env` (git-ignored); `.env.example` committed; grep repo for key strings before pushing
- [ ] Docstrings + type hints on every function/module
- [ ] `requirements.txt` installs clean in a fresh venv
- [ ] Git history shows test commits preceding implementation commits on every branch

## Verification (end-to-end)

1. Fresh venv → `pip install -r requirements.txt` → `pytest backend/tests -q` (all green).
2. `FIXTURE_MODE=1 flask --app backend.app run` (no keys needed) and walk the scenario with curl/REST client: register → login → `POST /api/interests` ("AI") → `GET /api/items?sort=relevance` (scored, enriched feed from fixtures) → `GET /api/stories` (clustered) → create collection, add item → **restart the server** → login again → interests + collection still there (persistence) → `DELETE` interest → 404 on re-fetch.
3. Check error paths by hand: bad token → 401, malformed body → 400, duplicate username → 409.

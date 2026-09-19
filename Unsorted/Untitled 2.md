# Pulse — Coding Interview Prep (Group 28)

The interview (≤20 min) tests understanding of: **the project**, **the code**, **the tests**, plus
division of labour, challenges and team decisions. **You can be asked about code you did not write**,
so this covers the whole codebase. Read top-to-bottom once, then drill the "Likely questions".

---

## 1. The project in one breath

**Pulse** is a personalised, multi-source content dashboard. You pick topics ("interests"); it pulls
from **three external APIs** — **GNews** (news), **YouTube Data API v3** (video), **Lemmy** (discussion,
our stand-in for Reddit because Reddit's app approval was pending) — **normalises** everything into one
item shape, **enriches** it, **scores** each item for relevance, and **clusters** items about the same
event into a single **story**. Goal: replace checking five sites with one ranked feed.

**Stack:** Python + Flask backend exposing a **RESTful JSON API**; a separate **vanilla HTML/CSS/JS**
frontend; **SQLite** for storage; communication only over REST/JSON; all API keys server-side.

**The "standout" computational part** (what makes it more than an RSS reader): the **relevance scoring**
and the **cross-source clustering**.

---

## 2. Architecture & the data flow

```
Browser (frontend)  --REST/JSON-->  Flask backend  --HTTP-->  GNews / YouTube / Lemmy
       |                                  |
   serve.py proxy (:8000)            SQLite (pulse.db)
   forwards /api -> :5000
```

**The pipeline** (`backend/services/pipeline.py :: generate_feed`) is the heart:

```
fetch (cached, per query, per language)  ->  enrich  ->  score  ->  cluster  ->  sort
```

1. **Fetch** — for each interest/query (and each language), call each source via `_safe_fetch`, which wraps the fetcher in the cache and catches `UpstreamError` so one dead source doesn't kill the feed.
2. **Enrich** — add keywords, sentiment, credibility tier, read/watch time.
3. **Score** — `score_item` gives every item a relevance score in [0,1].
4. **Cluster** — `cluster_items` groups items into stories by keyword overlap.
5. **Sort** — order items *within* a story and the stories themselves by the chosen key.

---

## 3. Backend module map (know what each file does)

| File | Responsibility |
|---|---|
| `app.py` | App factory `create_app`, registers blueprints, health route, JSON error envelope, `init_db` |
| `db.py` | Per-request SQLite connection on Flask `g`, `row_factory=Row`, `PRAGMA foreign_keys=ON`, `init_db` (idempotent) |
| `schema.sql` | All tables (`CREATE TABLE IF NOT EXISTS`) |
| `auth.py` | Password hashing, signed tokens, `@require_auth` |
| `models.py` | Dataclasses: User, Interest, Item, Story, Collection, Feedback (`from_row` / `to_dict`) |
| `routes/users.py` | register, login, GET/PATCH profile |
| `routes/interests.py` | interests CRUD + `/suggestions` |
| `routes/collections.py` | collections CRUD + item membership |
| `routes/feed.py` | `GET /api/items` (the live feed) |
| `routes/items.py` | `GET /api/items/stats` |
| `routes/stories.py` | list/get stories, `POST` triggers ingest+persist |
| `routes/feedback.py` | feedback CRUD (more/less/hide) |
| `fetchers/{gnews,youtube,lemmy}.py` | call each external API (or fixtures) |
| `fetchers/normalize.py` | map each raw source into the common item shape |
| `services/fetchers/base.py` | `SourceClient` Protocol + `UpstreamError` hierarchy |
| `services/enrich.py` | read time, sentiment (VADER), keywords, credibility tier |
| `services/scoring.py` | relevance score (4 components) |
| `services/clustering.py` | greedy keyword clustering into stories |
| `services/pipeline.py` | orchestrates fetch→enrich→score→cluster→sort |
| `services/cache.py` | SQLite-backed cache with TTL |
| `services/persistence.py` | write stories/items to DB; stamp live feed items with ids |

---

## 4. Deep dives on the bits most likely to be probed

### Auth (stateless, no sessions)
- **Passwords:** `werkzeug.security.generate_password_hash` (pbkdf2) on register; `check_password_hash`
  on login. We never store plaintext; `password_hash` is excluded from `User.to_dict()`.
- **Tokens:** `itsdangerous.URLSafeTimedSerializer` signs `{"user_id": id}` with `SECRET_KEY`, salt
  `"auth-token"`, **1-hour expiry** (`max_age=3600`). **No server-side token store** → the API is
  stateless (this is the REST "stateless" criterion). A tampered/expired token fails the signature check.
- **`@require_auth`:** reads `Authorization: Bearer <token>`, verifies it, loads the user row, and sets
  `g.user_id` + `g.current_user`. Returns **401** (missing/invalid/expired) or **404** (user deleted).

### Relevance scoring (`scoring.py`) — the maths
`score = Σ component·weight`, each component in [0,1], final clamped to [0,1]. Four components:
- **interest** — **Jaccard overlap** of interest keywords vs item keywords: `|A∩B| / |A∪B|`.
- **recency** — **exponential decay**, 24-h half-life: `0.5 ^ (age_hours / 24)`; future dates → 1.0.
- **popularity** — **log10** of engagement over a per-source ceiling (news=shares 100k, video=views 10M,
  discussion=upvotes+comments 10k), so a few viral items don't dominate.
- **source** — the user's per-source preference (0–1, default 0.5).

Default weights: interest 0.4, recency 0.3, popularity 0.2, source 0.1. **User-tunable** via the settings
sliders → `weights_json` / `source_prefs_json`; `resolve_weights` merges valid overrides over defaults
(rejects NaN, negatives, non-numbers, unknown keys → can't break their own feed).

### Clustering (`clustering.py`)
Greedy, single pass: for each item, find the existing cluster with the **highest keyword Jaccard
similarity** that beats `threshold = 0.3`; if none, the item starts a new story. A matched cluster's
keyword set **grows** with the item's new words. Items **without keywords always form their own story**.
*Known property:* it's **order-dependent** (greedy), which is a fair "limitation/improvement" answer.

### Enrichment (`enrich.py`)
- **read_time** — `ceil(words / 200)`, min 1 (200 wpm assumption).
- **video_duration_minutes** — parse ISO-8601 (`PT1H2M30S`) via `isodate`.
- **sentiment** — `vaderSentiment` compound score → label (positive / negative / neutral by VADER cutoffs).
- **keywords** — lowercase, strip URLs, regex alphanumeric tokens, drop stop-words / 1-char / pure-number
  tokens, `Counter.most_common(top_n=5)`.
- **credibility_tier** — curated trust tables per source type (bbc/reuters = high, etc.), domain parsed
  with `tldextract`; unknown → "unknown".

### Normalisation (`normalize.py`)
Each source has its own JSON; `normalize_*` maps them to **one common shape**:
`id/external_id, source_type, source_name, url, title, text, summary, author, published_at, metrics`.
`_fix_iso_z` converts trailing `Z` to `+00:00` so `datetime.fromisoformat` works.

### Caching (`cache.py`)
`fetch_with_cache(query, fetch_fn, ttl=3600)` → returns cached payload if present, else fetches and
saves. Stored in the **`api_cache`** SQLite table keyed by a cache key (source+query+language).
`cleanup_expired_cache` runs on each read/write and deletes rows whose `fetched_at + ttl < now`. This
is what protects us from the APIs' rate limits / quotas.

### Persistence (`db.py`, `persistence.py`, `schema.sql`)
- SQLite, one connection per request on `g`, closed on teardown; **foreign keys ON**.
- `init_db` runs `schema.sql` (all `IF NOT EXISTS`) + a tiny `ALTER TABLE` migration for `languages_json`.
- Tables: `users, interests, stories, items, collections, collection_items, feedback, api_cache`.
- `items.external_id` is **UNIQUE** → `INSERT OR IGNORE` keeps item ids stable across re-fetches.
- `collection_items` is a join table (PK `(collection_id, item_id)`) → an item can be in many collections,
  `ON DELETE CASCADE`.

### REST design (the rubric criteria)
- **Nouns, not verbs:** `/users`, `/interests`, `/collections`, `/stories`, `/items`, `/feedback`, `/tokens`.
- **Correct methods:** GET read, POST create, PUT replace, PATCH partial update, DELETE remove.
- **Stateless:** signed token carries identity; no server session; DB connection is per-request.
- **CRUD:** full create/read/update/delete on **interests** and **collections** (incl. item membership).
- **Consistent JSON error envelope:** `{"error": {"code", "message"}}` for every 4xx/5xx.

---

## 5. Endpoint cheat-sheet

| Method + path | What it does |
|---|---|
| `GET /api/health` | liveness `{"status":"ok"}` |
| `POST /api/users` | register → token + user |
| `POST /api/tokens` | login → token (vague error on failure, no user enumeration) |
| `GET/PATCH /api/users/me` | read / partial-update profile (username, weights, prefs, languages) |
| `GET/POST /api/interests` · `GET/PUT/DELETE /api/interests/<id>` | interests CRUD |
| `GET /api/interests/suggestions` | static list of common interests (public) |
| `GET /api/items` | live ranked feed; filters `source`, `sort`, `query`, `days` |
| `GET /api/items/stats?by=source_type\|interest\|day` | aggregated counts |
| `GET/POST /api/stories` · `GET /api/stories/<id>` | list/ingest/get stories |
| `GET/POST/DELETE /api/collections` · `GET/PUT/DELETE /api/collections/<id>` | collections CRUD |
| `PUT/DELETE /api/collections/<id>/items/<item_id>` | add/remove item in a collection |
| `GET/POST/DELETE /api/feedback` | record/list/delete more-less-hide signals |

---

## 6. Tests (be ready to defend these)

- **Framework:** `pytest`. **335 tests** across 17 files. Run with `pytest backend/`.
- **Fixtures (`conftest.py`):** `app` (real but **temp-file SQLite**, so separate connections see each
  other's writes — closer to real than `:memory:`), `client` (Flask test client), `db` (direct seeding),
  helpers `make_user` and `auth_headers` (mints a token without hitting the login route).
- **External calls are mocked** — `fetch_with_cache` / the fetchers are patched (`unittest.mock.patch`),
  and `FIXTURE_MODE=1` serves recorded sample JSON. So tests never hit the real internet → fast, deterministic.
- **TDD evidence:** commit history shows *failing* test commits before implementation
  ("add failing tests for interests CRUD", "failing tests for app foundation", etc.).
- **Coverage by area:** enrich (31), scoring (28), clustering (15), normalize (18), fetchers (19),
  pipeline (20), cache (8), persistence (15), auth (16), db (5), and the API routes
  (users 48, items 49, interests 24, stories 15, collections 10, feedback 8, feed 6).
- **What the tests cover:** success paths, **failure paths** (400/401/404/409), and **edge cases**
  (empty inputs, malformed JSON, bad weights, ownership/security — one user can't touch another's data,
  expired/garbage tokens, upstream 429/5xx mapped to 429/502, case-sensitivity, multi-word keywords).

**"Where could the tests be lacking?" (good honest answer):** no automated *frontend* tests (manual +
the GenAI workflow); the full pipeline is only tested with mocked sources, not against the live APIs; no
load/concurrency tests; clustering is tested on keyword overlap but not on large real-world corpora.

---

## 7. Frontend (in case they ask)

Single-page app: `index.html` + `app.js` (hash router, fetch wrapper, all views) + `styles.css` +
`serve.py` (a tiny `http.server` that serves the static files and **proxies `/api` to Flask** so the
browser sees one origin → no CORS). Pages: landing (Three.js hero), onboarding, dashboard feed, search
(filters), story detail, collections, insights (source mix / topic mix / activity-over-time, all
**hand-built SVG**, no chart library), settings (live relevance-weight sliders + radar). Token + user
cached in `localStorage`.

---

## 8. Likely questions → strong answers

**"Walk me through what happens when the dashboard loads."**
Frontend calls `GET /api/items` with the user's token → `@require_auth` validates it → `generate_feed`
reads the user's interests, fetches each source through the cache, enriches, scores, clusters, sorts,
and returns story dicts → frontend renders cards.

**"Why Jaccard for both interest match and clustering?"** Simple, symmetric, dependency-free overlap
metric on keyword *sets*; good enough for short keyword lists and easy to reason about/test. Trade-off:
ignores term frequency and semantics (no embeddings) — a deliberate simplicity choice.

**"How is the relevance score computed?"** Weighted sum of four [0,1] components (interest, recency,
popularity, source pref), weights user-tunable, result clamped. (Then recite §4.)

**"Why is the API stateless / how does auth work without sessions?"** Identity lives in a *signed*
token (itsdangerous + SECRET_KEY, 1-h expiry); the server stores nothing per client, just verifies the
signature each request and loads the user. Scales horizontally, matches REST.

**"How do you handle an external API being down or rate-limited?"** Fetchers raise a typed
`UpstreamError` (`RateLimitError` / `UpstreamServerError` / `UpstreamParseError`); `_safe_fetch` catches
them so the feed continues with the remaining sources; the stats route maps them to **429/502**. Caching
reduces how often we call upstream at all.

**"Why SQLite / how is persistence done?"** Zero-config single-file DB, fine for this scale; per-request
connection on `g`, schema is idempotent, foreign keys on, unique `external_id` dedupes items.

**"What was hard / what would you improve?"** (pick 2–3, see §9.)

**"Which part did you personally work on, and can you explain a part you didn't?"** Be honest about your
slice, then explain another module from this guide (that's exactly what they test).

---

## 9. Honest "limitations / improvements" you can volunteer

- `GET /api/items` **persists** live items (to give them ids for saving to collections) — strictly a GET
  with a side effect; a cleaner design would ingest via a `POST`/background job.
- `stats_by_interest` matches with `LIKE %kw%` on `keywords_json` → possible **substring false positives**.
- Clustering is **greedy / order-dependent**; no merge step.
- `POST /api/stories` inserts a new story row each ingest → **story duplication** over time.
- Tokens have a fixed 1-h life, **no refresh** flow.
- No feed **pagination** (only `/stories` list takes limit/offset).
- Recency treats future-dated items as fully fresh (1.0).

---

## 10. Division of labour & team decisions (fill in your specifics)

Be ready to state: who built which backend area (auth, fetchers/normalize, scoring/clustering/enrich,
routes, tests), that the **frontend was individual** (each member built one with a GenAI tool, the team
picked one to merge into `dev`), and key decisions: **Lemmy instead of Reddit** (API approval delay),
**SQLite** (no server to run), **caching to respect rate limits**, **fixtures/`FIXTURE_MODE`** so the app
and tests run without keys, **TDD** with mocked upstreams, and **one feature branch per member**.

> Tip: open the repo during prep and read one file you didn't write end-to-end (e.g. `scoring.py` or
> `pipeline.py`) so you can speak to it confidently — that's the exact thing the rubric warns about.

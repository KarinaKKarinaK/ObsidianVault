# Claude Code — Exam Season Vault Instructions

You are operating inside Karina's Obsidian vault as an AI study assistant with full read/write access. Your job is to build, populate, and maintain a complete exam preparation system across 5 courses. Read this entire file before taking any action.

---

## Context: Who You Are Working For

**Student:** Karina, 2nd-year BSc AI student at Vrije Universiteit Amsterdam (Intelligent Systems track)
**Situation:** Exam season — 5 exams between May 21 and June 4, 2026
**Study hours:** 2-3h per day. Mondays blocked 8AM-7PM. Wednesdays almost entirely blocked.
**Working style:** Direct, technically precise, no fluff. Prefers copy-paste-ready outputs, strict sourcing, honest evaluation. Obsidian power user.

---

## Exam Overview

| ID | Course | Date | Time | Target | Status |
|----|--------|------|------|--------|--------|
| DB | Databases | Thu 21 May 2026 | 18:45 | Pass + 0.5 bonus | Bonus secured (90+ hw pts) |
| TM | Text Mining for AI | Tue 27 May 2026 | 08:30 | 9.0 / 10 | MC 60% + project 40% |
| HAI | History of AI | Thu 28 May 2026 | 15:30 | Pass comfortably | +1 bonus point secured |
| ML | Machine Learning | Tue 2 Jun 2026 | 08:30 | 35/40 | Currently 32/40 |
| SP | Statistics & Probability | Thu 4 Jun 2026 | 08:30 | 9.25 / 10 | Currently 7.0 |

---

## Vault Structure to Create

```
ObsidianVault/
├── CLAUDE.md
├── 000 MOC — Exam Season 2026.md
├── Daily Logs/
│   ├── Template — Daily Study Log.md
│   ├── 2026-04-17.md  through  2026-06-04.md
├── Courses/
│   ├── DB — Databases/
│   │   ├── DB — Index.md
│   │   ├── DB — Video Lecture Log.md
│   │   ├── DB — Topics & Definitions.md
│   │   ├── DB — SQL Practice.md
│   │   ├── DB — Normalization Drills.md
│   │   ├── DB — Transactions.md
│   │   ├── DB — Exam Strategy.md
│   │   └── Resources/
│   ├── TM — Text Mining/
│   │   ├── TM — Index.md
│   │   ├── TM — NLP Pipeline.md
│   │   ├── TM — Literature Map.md
│   │   ├── TM — Flashcards.md
│   │   ├── TM — Exam Strategy.md
│   │   └── Resources/
│   ├── HAI — History of AI/
│   │   ├── HAI — Index.md
│   │   ├── HAI — Lecture Themes (A-Questions).md
│   │   ├── HAI — Campbell-Kelly Chapters (B-Questions).md
│   │   ├── HAI — C-Question Concepts.md
│   │   ├── HAI — Practice Answers.md
│   │   ├── HAI — Exam Strategy.md
│   │   └── Resources/
│   ├── ML — Machine Learning/
│   │   ├── ML — Index.md
│   │   ├── ML — Gap Analysis.md
│   │   ├── ML — Topic Review.md
│   │   ├── ML — Practice Problems.md
│   │   ├── ML — Exam Strategy.md
│   │   └── Resources/
│   └── SP — Statistics & Probability/
│       ├── SP — Index.md
│       ├── SP — Probability Foundations.md
│       ├── SP — Distributions.md
│       ├── SP — Inference & Testing.md
│       ├── SP — Regression.md
│       ├── SP — Derivations Master List.md
│       ├── SP — Exam Strategy.md
│       └── Resources/
└── HTML Study Tools/
    ├── DB — Practice Tool.html
    ├── TM — Flashcard Tool.html
    ├── HAI — Flashcard Tool.html
    ├── ML — Practice Tool.html
    └── SP — Practice Tool.html
```

---

## Databases Video Lecture Schedule

All videos from joerg.endrullis.de/databases/. Total: 51 videos, ~770 min (~12h50).
Karina uses videos as **primary input** per DB topic, followed immediately by practice problems in the same session.
Budget: ~45-60 min video per DB block, leaving 60-90 min for problems.

### Full Video Inventory

**Section 1 — Introduction (28 min total)**
- Introduction (28 min)

**Section 2 — Relational Model, Week 1 (52 min total)**
- Example Database (3 min)
- Database Schemas (7 min)
- Database States (4 min)
- Null Values (8 min)
- Integrity Constraints (6 min)
- Keys (15 min)
- Foreign Keys (9 min)

**Section 3 — Data Modelling, Week 1 (70 min total)**
- Database Design Phases (3 min)
- ER Basics (10 min)
- Cardinality Limits (10 min)
- Relationship Sets with Attributes (5 min)
- Weak Entity Sets (12 min)
- ISA Inheritance (7 min)
- Aggregation (3 min)
- Notation Summary (3 min)
- UML / Unified Modelling Language (7 min)

**Section 4 — Translating Conceptual to Relational, Week 2 (37 min total)**
- Basic Translation (4 min)
- Optimised Translation / Eliminating Tables (7 min)
- Enforcing Cardinality Constraints via Integrity Constraints (10 min)
- Composite and Multivalued Attributes (3 min)
- ISA Inheritance translation (7 min)
- Keys and Recursive Relations (6 min)

**Section 5 — Advanced SQL, Weeks 2-3 (~230 min / 3h50 total)**
- Example Database (3 min)
- Basic SQL Syntax (9 min)
- Querying Multiple Tables (23 min)
- Self Joins (13 min)
- Duplicate Elimination (12 min)
- Outer and Inner Joins (27 min)
- Non-Monotonic Queries intro (3 min)
- Not In (9 min)
- Not Exists (12 min)
- For All (9 min)
- Nested Subqueries (15 min)
- All, Some, Any (5 min)
- Single Value Subqueries (5 min)
- Subqueries under From (7 min)
- Aggregation Functions (16 min)
- Aggregations with Group and Having (16 min)
- Aggregation Subqueries (13 min)
- Case Distinctions / Union / Case / Coalesce (15 min)
- Sorting Output / Order By (5 min)

**Section 6 — Functional Dependencies & Normalization, Week 4 (~220 min / 3h40 total)**
- Introduction to FDs (7 min)
- Functional Dependencies (20 min)
- Implication of Functional Dependencies (15 min)
- Canonical Sets of Functional Dependencies (20 min)
- Determining Keys (20 min)
- Determinants (11 min)
- Consequences of Bad Design (4 min)
- Boyce-Codd Normal Form (BCNF) (13 min)
- Third Normal Form (3NF) (8 min)
- Splitting Relations (15 min)
- Transformation to BCNF (22 min)
- Transformation to 3NF (15 min)
- Multivalued Dependencies and 4NF (17 min)
- Normal Forms and Conceptual Design (8 min)
- Denormalization (5 min)
- Other Constraints (5 min)

**Section 7 — Transactions, Weeks 5-6 (~130 min / 2h10 total)**
- Concurrency Anomalies (16 min)
- Transactions, Schedules and Serialisability (33 min)
- Two Phase Locking (20 min)
- Two Phase Locking — Deadlock Handling (4 min)
- Cascading Rollbacks (9 min)
- Strict and Preclaiming Two Phase Locking (7 min)
- Granularity of Locking (11 min)
- Isolation Levels (8 min)
- Optimistic Concurrency Control (6 min)
- Multiversion Concurrency Control (8 min)
- Optimizing Database Performance (4 min)

---

### DB Video Watching Schedule — Day by Day

Pre-fill into each daily log file. Each entry: WATCH [videos + total min] then DO [practice task].

```
Apr 17 (Thu) — DB video block:
  WATCH: Introduction (28min) + Example Database (3min) + Database Schemas (7min) [38min]
  DO: From memory, sketch what a relational database schema looks like. What makes a key a key?

Apr 19 (Sat) — DB video block:
  WATCH: Database States (4min) + Null Values (8min) + Integrity Constraints (6min) + Keys (15min) + Foreign Keys (9min) [42min]
  DO: Write precise definitions for: superkey, candidate key, primary key, foreign key, null semantics in SQL. Do 3 schema integrity problems using exercise exam schema.

Apr 20 (Sun) — DB video block:
  WATCH: Database Design Phases (3min) + ER Basics (10min) + Cardinality Limits (10min) + Relationship Sets with Attributes (5min) [28min]
  DO: Attempt exercise exam Q1a (ER diagram for professor/project/graduate scenario) from scratch without solution.

Apr 22 (Tue) — DB video block:
  WATCH: Weak Entity Sets (12min) + ISA Inheritance (7min) + Aggregation (3min) + Notation Summary (3min) + UML (7min) [32min]
  DO: Add weak entities, ISA, and aggregation to your ER diagram from Apr 20. Compare to exercise exam solution. Note every difference.

Apr 24 (Thu) — DB video block:
  WATCH: Basic Translation (4min) + Optimised Translation (7min) + Enforcing Cardinality Constraints via ICs (10min) + Composite and Multivalued Attributes (3min) [24min]
  DO: Derive the full relational schema from your ER diagram (exercise exam Q1b). Mark primary keys, foreign keys, nullable attributes, candidate keys.

Apr 26 (Sat) — DB video block:
  WATCH: ISA Inheritance translation (7min) + Keys and Recursive Relations (6min) + Basic SQL Syntax (9min) + Querying Multiple Tables (23min) [45min]
  DO: Write 3 SQL queries on Suppliers/Parts/Catalog: (1) basic SELECT with WHERE, (2) inner JOIN across all three tables, (3) subquery in WHERE clause.

Apr 27 (Sun) — DB video block:
  WATCH: Self Joins (13min) + Duplicate Elimination (12min) + Outer and Inner Joins (27min) [52min]
  DO: Write 4 SQL queries: (1) self-join on Catalog to find pairs of suppliers selling same part, (2) SELECT DISTINCT, (3) LEFT OUTER JOIN Parts to Catalog to find uncatalogued parts, (4) FULL OUTER JOIN.

Apr 29 (Tue) — DB video block:
  WATCH: Non-Monotonic Queries intro (3min) + Not In (9min) + Not Exists (12min) + For All (9min) [33min]
  DO: Solve exercise exam Q3a and Q3b from scratch. Q3a: parts supplied by only one supplier. Q3b: supplier names who sell ALL black parts. Use NOT EXISTS only — no GROUP BY. Explain in comments why double NOT EXISTS implements "for all".

May 1 (Thu) — DB video block:
  WATCH: Nested Subqueries (15min) + All Some Any (5min) + Single Value Subqueries (5min) + Subqueries under From (7min) [32min]
  DO: Write 3 nested subquery queries (different from Q3a/Q3b). Write 2 queries using ALL or ANY. Write 1 query using a subquery under FROM as an inline view.

May 3 (Sat) — DB video block:
  WATCH: Aggregation Functions (16min) + Aggregations with Group and Having (16min) + Aggregation Subqueries (13min) [45min]
  DO: Write 4 aggregation queries on Suppliers/Parts/Catalog: (1) COUNT parts per supplier using GROUP BY, (2) HAVING to filter groups with more than 2 parts, (3) aggregation subquery to find suppliers with above-average catalogue size, (4) MIN cost per part across all suppliers.

May 4 (Sun) — DB video block:
  WATCH: Case Distinctions / Union / Case / Coalesce (15min) + Sorting Output (5min) [20min]
  DO: Write 2 UNION queries, 1 CASE expression (e.g. label parts as cheap/medium/expensive based on cost), 1 ORDER BY with explicit null handling. Then: read Database API slides (no video exists for this section — exam relevant).

May 6 (Tue) — DB video block:
  WATCH: Introduction to FDs (7min) + Functional Dependencies (20min) + Implication of Functional Dependencies (15min) [42min]
  DO: For FD set {A→B, B→D, E→A}: compute closure of {A}, {B}, {E}, {AE}. Prove that A→D holds using Armstrong axioms, showing each step.

May 8 (Thu) — DB video block:
  WATCH: Canonical Sets of Functional Dependencies (20min) + Determining Keys (20min) [40min]
  DO: Derive canonical set for exercise exam FD set {A→DB, B→D, AE→ED, E→A} using the 4-step algorithm. Show every intermediate step. Then find all minimal keys. Check against solution.

May 10 (Sat) — DB video block:
  WATCH: Determinants (11min) + Consequences of Bad Design (4min) + BCNF (13min) + 3NF (8min) [36min]
  DO: Given canonical set from May 8: (1) state the BCNF definition, (2) check each FD for BCNF violation, (3) state the 3NF definition, (4) check each FD for 3NF violation. Write both definitions from memory before checking notes.

May 13 (Tue) — DB video block:
  WATCH: Splitting Relations (15min) + Transformation to BCNF (22min) + Transformation to 3NF (15min) [52min]
  DO: Decompose R(A,B,C,D,E) to BCNF — show each split. Synthesise to 3NF — show each relation created. Verify: is any FD lost in BCNF? Is any FD lost in 3NF? Target: complete in under 20 minutes.

May 15 (Thu) — DB video block:
  WATCH: Multivalued Dependencies and 4NF (17min) + Normal Forms and Conceptual Design (8min) + Denormalization (5min) + Other Constraints (5min) [35min]
  DO: Generate 2 new FD sets yourself. Run the full pipeline (canonical → keys → BCNF → 3NF) on each. Time yourself. Note: 4NF is bonus — BCNF and 3NF are exam focus.

May 17 (Sat) — DB video block:
  WATCH: Concurrency Anomalies (16min) + Transactions, Schedules and Serialisability (33min) [49min]
  DO: From the exercise exam schedule (T1: R(Z) R(Y), T2: R(Y) W(Y) R(V), T3: W(V) W(Z)): draw the precedence graph, identify all edges with justification, detect the cycle, conclude on conflict serializability. Write definitions of cascadeless and recoverable from memory.

May 18 (Sun) — DB video block (light — SP past paper is the priority today):
  WATCH: Two Phase Locking (20min) [20min]
  DO: Write out 2PL growing/shrinking phases. What does strict 2PL add? What does preclaiming 2PL add? No additional problems — SP takes priority.

May 20 (Tue) — DB video block (final):
  WATCH: Deadlock Handling (4min) + Cascading Rollbacks (9min) + Strict and Preclaiming 2PL (7min) + Granularity of Locking (11min) [31min]
  DO: Re-do exercise exam Q4 (transactions) completely from scratch. Then re-do exercise exam Q5 (APIs) from scratch. Check both against solutions. Fix any remaining gaps.

May 21 (Wed) — DB EXAM DAY: No new videos. Light review only AM.
```

---

## Step-by-Step Build Instructions

Work through these steps in order. Complete each fully before moving to the next.

---

### STEP 1 — Scan the vault for existing resources

```bash
find . -type f | sort
```

For each `Resources/` folder that contains files, read those files and extract:
- Past exam questions → add to relevant HTML practice tool and course practice notes under `## Past Exam Questions`
- Lecture slides → extract key definitions and formulas → merge into topic notes tagged `(Slides, Week X)`
- Formula sheets → extract all formulas → fill `SP — Derivations Master List.md`
- Lab assignments → add to `TM — NLP Pipeline.md` as practical exercise sections

Log findings in `_resource_scan.md` at vault root:

```markdown
# Resource Scan — [date]

## DB Resources
- [filename]: [what it contains, page count if PDF]

## TM Resources
- ...

## HAI Resources
- ...

## ML Resources
- ...

## SP Resources
- ...

## Missing Resources (still needed from Karina)
- SP: past exams 2025-I and 2025-II
- SP: formula sheet
- ML: past exams
- ML: lecture slides or topic overview
- TM: lecture slides
- TM: lab assignment PDFs
- DB: any past exams beyond the exercise exam
```

Do not proceed to Step 2 until scan is complete.

---

### STEP 2 — Create the MOC

Create `000 MOC — Exam Season 2026.md`:

```markdown
# Exam Season 2026 — Map of Content

> Last updated: {{date}}

## Exam Countdown

| Course | Exam Date | Days Left | Target | Status |
|--------|-----------|-----------|--------|--------|
| [[Courses/DB — Databases/DB — Index\|Databases]] | Thu 21 May, 18:45 | — | Pass + 0.5 bonus | 🟡 In progress |
| [[Courses/TM — Text Mining/TM — Index\|Text Mining]] | Tue 27 May, 08:30 | — | 9.0 | 🟡 In progress |
| [[Courses/HAI — History of AI/HAI — Index\|History of AI]] | Thu 28 May, 15:30 | — | Pass | 🟡 In progress |
| [[Courses/ML — Machine Learning/ML — Index\|Machine Learning]] | Tue 2 Jun, 08:30 | — | 35/40 | 🟡 In progress |
| [[Courses/SP — Statistics & Probability/SP — Index\|Statistics]] | Thu 4 Jun, 08:30 | — | 9.25 | 🟡 In progress |

## Today's Log
[[Daily Logs/2026-04-17]]

## Weekly Focus
- **Week 1 (Apr 17-23):** DB relational model + ER videos | SP probability foundations | TM ch.4-5 | HAI ch.4-7
- **Week 2 (Apr 24-30):** DB translation + SQL videos | SP distributions + joint | TM ch.17 + NER | HAI ch.9-11
- **Week 3 (May 1-7):** DB advanced SQL + FD intro videos | SP limit theorems + MLE | TM sentiment + transformers | HAI ch.12-15
- **Week 4 (May 8-14):** DB normalization videos + exercise exam | SP hypothesis testing | TM consolidation | ML gap drilling
- **Week 5 (May 15-21):** DB transactions videos → EXAM | SP regression + past paper | TM/HAI final prep
- **Week 6 (May 22-28):** TM EXAM → HAI EXAM | SP past papers | ML targeted
- **Week 7 (May 29-Jun 4):** ML RESIT → SP RESIT

## Course Notes
- [[Courses/DB — Databases/DB — Index|Databases]]
- [[Courses/TM — Text Mining/TM — Index|Text Mining for AI]]
- [[Courses/HAI — History of AI/HAI — Index|History of AI]]
- [[Courses/ML — Machine Learning/ML — Index|Machine Learning]]
- [[Courses/SP — Statistics & Probability/SP — Index|Statistics & Probability]]

## DB Video Progress
[[Courses/DB — Databases/DB — Video Lecture Log|DB Video Lecture Log]] — track all 51 videos here

## Study Tools (open in browser)
- [[HTML Study Tools/DB — Practice Tool.html|DB Practice Tool]]
- [[HTML Study Tools/TM — Flashcard Tool.html|TM Flashcard Tool]]
- [[HTML Study Tools/HAI — Flashcard Tool.html|HAI Flashcard Tool]]
- [[HTML Study Tools/ML — Practice Tool.html|ML Practice Tool]]
- [[HTML Study Tools/SP — Practice Tool.html|SP Practice Tool]]
```

---

### STEP 3 — Daily Log Template

Create `Daily Logs/Template — Daily Study Log.md`:

```markdown
# Daily Study Log — {{date}}

## DB Video Session
> Only fill on DB study days.

| Video | Duration | ✓ | Key Takeaway |
|-------|----------|---|--------------|
| | | ☐ | |

## Today's Plan

| # | Course | Task | Duration | ✓ |
|---|--------|------|----------|---|
| 1 | | | 1.5h | ☐ |
| 2 | | | 1h | ☐ |

## Problems Attempted

| Source | Question summary | My answer | Correct answer | ✓/✗ |
|--------|-----------------|-----------|----------------|-----|
| | | | | |

## What Clicked Today
-

## What Is Still Unclear
-

## Weak Points to Revisit
-

## Tomorrow's Priority
-

## Confidence (1=shaky, 5=solid)
| DB | TM | HAI | ML | SP |
|----|----|----|----|----|
| | | | | |
```

---

### STEP 4 — Generate all daily log files

Generate one file per study day from 2026-04-17 to 2026-06-04. Pre-fill the plan table for every day and the DB Video Session table for every DB video day.

**Complete daily schedule to pre-fill:**

```
2026-04-17 (Thu):
  DB (1.5h): WATCH Introduction (28min) + Example Database (3min) + Database Schemas (7min) → sketch relational model from memory
  SP (1h): Review Bayes theorem + law of total probability → 5 conditional probability problems

2026-04-18 (Fri):
  TM (1.5h): Read J&M ch.4 Logistic Regression for text classification → create 5 definition flashcards
  HAI (1h): Read Campbell-Kelly ch.4-5 → write 3 bullet notes per chapter (Moore school, IBM rise)

2026-04-19 (Sat):
  DB (1.5h): WATCH Database States (4min) + Null Values (8min) + Integrity Constraints (6min) + Keys (15min) + Foreign Keys (9min) → write key/constraint definitions + 3 schema integrity problems
  SP (1h): Binomial + Poisson PMF derivations from first principles → compute E[X] and Var[X] for both → 4 computation problems

2026-04-20 (Sun):
  DB (1.5h): WATCH Database Design Phases (3min) + ER Basics (10min) + Cardinality Limits (10min) + Relationship Sets with Attributes (5min) → attempt exercise exam Q1a ER diagram without looking at solution
  SP (1h): Geometric + Negative Binomial → prove memoryless property of Geometric → 3 computation problems

2026-04-21 (Mon) — BLOCKED 8AM-7PM:
  HAI (1h, evening only): Read Campbell-Kelly ch.6-7 light read → IBM 1401 technology+marketing narrative + Perry Crawford Whirlwind saves

2026-04-22 (Tue):
  DB (1.5h): WATCH Weak Entity Sets (12min) + ISA Inheritance (7min) + Aggregation (3min) + Notation Summary (3min) + UML (7min) → add weak entities + ISA to Apr 20 ER diagram → compare vs exercise exam solution
  TM (1h): Read J&M ch.5 word embeddings → 5 flashcards: distributional hypothesis, word2vec CBOW vs Skip-gram, GloVe, static vs contextual

2026-04-23 (Wed) — BLOCKED:
  [passive only if energy allows — no tasks assigned]

2026-04-24 (Thu):
  DB (1.5h): WATCH Basic Translation (4min) + Optimised Translation (7min) + Enforcing Cardinality via ICs (10min) + Composite + Multivalued Attributes (3min) → derive relational schema from ER diagram (exercise exam Q1b) → mark all primary keys, foreign keys, nullable attributes, candidate keys
  SP (1h): Joint distributions — joint PDF/PMF, marginals, conditional distributions → covariance and correlation definitions → 3 joint distribution problems

2026-04-25 (Fri):
  SP (1.5h): Exponential distribution (PDF, CDF, memoryless property proof, Poisson process link) + Normal distribution (standard normal, Z-scores, linear combinations) → 5 problems from past paper 2025-I normal/exponential section
  HAI (1h): Read Campbell-Kelly ch.9-10 (software crisis, OS/360, timesharing) → write one B-question paragraph per chapter (200 words each)

2026-04-26 (Sat):
  DB (1.5h): WATCH ISA Inheritance translation (7min) + Keys and Recursive Relations (6min) + Basic SQL Syntax (9min) + Querying Multiple Tables (23min) → write 3 SQL queries on Suppliers/Parts/Catalog schema
  ML (1h): Gap analysis session — reconstruct previous exam attempt from memory → list every question type you got wrong → group by topic → rank by point value

2026-04-27 (Sun):
  DB (1.5h): WATCH Self Joins (13min) + Duplicate Elimination (12min) + Outer and Inner Joins (27min) → write 4 SQL queries: self-join + DISTINCT + LEFT OUTER + FULL OUTER
  TM (1h): Read J&M ch.17 sequence labelling + Yadav & Bethard NER survey sections 2-3 → 5 flashcards: BIO tagging, CRF vs MaxEnt, BiLSTM-CRF, evaluation metrics

2026-04-28 (Mon) — BLOCKED:
  HAI (1h, evening only): Read Campbell-Kelly ch.11 → Silicon Valley narrative, two California cultures, personal computing rise

2026-04-29 (Tue):
  DB (1.5h): WATCH Non-Monotonic Queries intro (3min) + Not In (9min) + Not Exists (12min) + For All (9min) → solve exercise exam Q3a + Q3b from scratch — NOT EXISTS only, no GROUP BY — write explanation of double negation logic in comments
  TM (1h): Read Maynard et al. ch.1-2 → 3 flashcards: NLP for Semantic Web framing, entity layers, relation extraction overview

2026-04-30 (Wed) — BLOCKED:
  [no tasks]

2026-05-01 (Thu):
  DB (1.5h): WATCH Nested Subqueries (15min) + All Some Any (5min) + Single Value Subqueries (5min) + Subqueries under From (7min) → 3 nested subquery queries + 2 ALL/ANY queries + 1 inline view query
  SP (1h): LLN (weak + strong, statement and intuition) + CLT derivation via MGFs → 3 CLT approximation problems with continuity correction

2026-05-02 (Fri):
  SP (1.5h): MLE derivations from scratch: Bernoulli → p̂=x̄, Normal → μ̂=x̄ and σ̂²=(1/n)Σ(xᵢ-x̄)², Exponential → λ̂=1/x̄, Poisson → λ̂=x̄ → 3 MLE computation problems
  HAI (1h): Read Campbell-Kelly ch.12-13 (Internet three desires, globalisation) → write B-question paragraph: "three desires confluence" for Internet rise (200 words)

2026-05-03 (Sat):
  DB (1.5h): WATCH Aggregation Functions (16min) + Aggregations with Group and Having (16min) + Aggregation Subqueries (13min) → 4 aggregation queries: GROUP BY + HAVING + aggregation subquery + COUNT DISTINCT
  TM (1h): Read J&M ch.22 sentiment analysis + Vayansky & Kumar topic modelling sections 1-3 → 5 flashcards: sentiment vs opinion vs emotion, LDA generative model, topic coherence

2026-05-04 (Sun):
  DB (1.5h): WATCH Case Distinctions / Union / Case / Coalesce (15min) + Sorting Output (5min) → 2 UNION queries + 1 CASE expression + 1 ORDER BY NULLS LAST → read Database API slides (no video — exam relevant)
  HAI (1h): Read Campbell-Kelly ch.14-15 → notes on: Netflix + surveillance capitalism, Google ~2000, US vs EU privacy legislation differences

2026-05-05 (Mon) — BLOCKED:
  SP (1h, evening only): Method of Moments derivations for Binomial + Poisson → compare MLE vs MOM estimates → 2 problems

2026-05-06 (Tue):
  DB (1.5h): WATCH Introduction to FDs (7min) + Functional Dependencies (20min) + Implication of FDs (15min) → compute closures of {A}, {B}, {E}, {AE} for {A→B, B→D, E→A} → prove A→D using Armstrong axioms step by step
  TM (1h): Read Wolf et al. Transformers (abstract + sections 1-2) + Church 2021 fine-tuning (sections 1-3) → 5 flashcards: self-attention formula, pre-training vs fine-tuning, when fine-tuning wins

2026-05-07 (Wed) — BLOCKED:
  [no tasks]

2026-05-08 (Thu):
  DB (2h): WATCH Canonical Sets of FDs (20min) + Determining Keys (20min) → derive canonical set for {A→DB, B→D, AE→ED, E→A} with all intermediate steps → find all minimal keys → check vs solution

2026-05-09 (Fri):
  SP (1.5h): Confidence intervals — z-interval (σ known) vs t-interval (σ unknown) → interpretation (NOT probability) vs coverage → 3 interval construction problems
  HAI (1h): Lecture themes A-questions — write 4 summaries (4-6 sentences each): prehistory of AI, electronic brain metaphor, AI in education (1960s-70s), game culture + AI

2026-05-10 (Sat):
  DB (1.5h): WATCH Determinants (11min) + Consequences of Bad Design (4min) + BCNF (13min) + 3NF (8min) → check R(A,B,C,D,E) for BCNF and 3NF violations → write both definitions from memory before checking notes
  SP (1h): z-test vs t-test (when to use) → one-sample t-test derivation → two-sample t-test (pooled + Welch) → paired t-test → 4 hypothesis testing problems

2026-05-11 (Sun):
  ML (1.5h): Top 3 gap topics from gap analysis — targeted practice, aim for 100% accuracy on these specific question types
  HAI (1h): C-question practice essay: "To what extent does appropriation from traditional computing history apply to a history of AI?" (200-250 words, cite both book + lectures)

2026-05-12 (Mon) — BLOCKED:
  SP (1h, evening only): Chi-square test goodness of fit + independence in contingency tables → 2 problems

2026-05-13 (Tue):
  DB (1.5h): WATCH Splitting Relations (15min) + Transformation to BCNF (22min) + Transformation to 3NF (15min) → decompose R(A,B,C,D,E) to BCNF → synthesise to 3NF → check FD loss → target: under 20 minutes total
  TM (1h): Full flashcard review pass — every card, mark uncertain ones for re-review

2026-05-14 (Wed) — BLOCKED:
  [no tasks]

2026-05-15 (Thu):
  DB (1.5h): WATCH Multivalued Dependencies + 4NF (17min) + Normal Forms and Conceptual Design (8min) + Denormalization (5min) + Other Constraints (5min) → generate 2 fresh FD sets → run full pipeline on each → time yourself
  SP (1h): F-test for variance + one-way ANOVA F-statistic derivation + likelihood ratio tests → 3 problems

2026-05-16 (Fri):
  HAI (1.5h): Write B-question essay on timesharing (200-250 words, cite ch.6) → write A-question essay on how history of AI helps define AI (150-200 words, cite lectures)
  TM (1h): NLTK ch.6 — classification pipeline, feature extraction, Naive Bayes + decision trees + MaxEnt — note anything not covered in lectures

2026-05-17 (Sat):
  DB (1.5h): WATCH Concurrency Anomalies (16min) + Transactions Schedules Serialisability (33min) → draw precedence graph for exercise exam T1/T2/T3 → identify all edges with justification → detect cycle → write definitions of cascadeless + recoverable + conflict serializable from memory
  SP (1h): OLS derivation (β̂₁ = Sxy/Sxx, β̂₀ = ȳ - β̂₁x̄) → inference on coefficients (t-test) → R-squared interpretation → 3 regression problems

2026-05-18 (Sun):
  SP (2h+): PAST PAPER 2025-I — full timed attempt (2h15) → mark → log every lost point with topic tag
  DB (30min): WATCH Two Phase Locking (20min) → write 2PL growing/shrinking phases → what strict 2PL adds

2026-05-19 (Mon) — BLOCKED:
  DB (1h, evening only): Read ANSI SPARC architecture notes + API slides — final read before exam

2026-05-20 (Tue):
  DB (2h): WATCH Deadlock Handling (4min) + Cascading Rollbacks (9min) + Strict and Preclaiming 2PL (7min) + Granularity of Locking (11min) → re-do exercise exam Q4 (transactions) from scratch → re-do exercise exam Q5 (APIs) from scratch → check both → fix gaps → confirm iSubmit password

2026-05-21 (Wed) — DB EXAM 18:45:
  AM only: skim normalization notes + SQL NOT EXISTS patterns. No new videos. Arrive early. Confirm iSubmit login.

2026-05-22 (Thu):
  TM (1.5h): Full flashcard review — all cards, mark anything uncertain
  HAI (1h): Review 2025-I past exam questions → for each A/B/C type, mark: confident / partial / need review

2026-05-23 (Fri):
  TM (2h): Deep review session — write paragraph explanations (no notes) for: (1) why BERT fine-tuning works, (2) how self-attention computes a representation, (3) what makes LDA a generative model, (4) why CRF outperforms MaxEnt for sequence labelling

2026-05-24 (Sat):
  HAI (1.5h): Write C-question practice essay: "To what extent are histories used to further agendas?" — use AI winters, Babbage/Aiken narrative, McCorduck (200-250 words) → write 4-sentence summaries of ch.12-15 as B-question prep
  TM (1h): Read Maynard ch.7 + NLTK ch.7 (information extraction, chunking, relation extraction) → draw the full NLP pipeline from memory

2026-05-25 (Sun):
  TM (1.5h): Generate 10 MC-style questions for yourself covering all TM topics → answer them → check → spend remaining time on 3 weakest areas
  HAI (1h): Lecture themes final — data + AI / surveillance capitalism narrative, Web 2.0 enabling AI, computers entering ordinary life (1980s-90s) — 4-6 sentence summary each

2026-05-26 (Mon) — BLOCKED:
  TM (1h, evening only): Final flashcard pass → sleep early (exam 08:30 tomorrow)

2026-05-27 (Tue) — TM EXAM 08:30:
  [exam day]

2026-05-28 (Thu) — HAI EXAM 15:30:
  AM (1-2h): Reread practice answers → Bolter defining technology 2 examples → appropriation concept 2 examples → choose question strategy (best A + best 2 B + best C)

2026-05-29 (Fri):
  ML (1.5h): Gap list final pass → 10 targeted practice questions on weakest topics
  SP (1h): Begin past paper 2025-II → complete as much as possible in 1h

2026-05-30 (Sat):
  SP (2h): Finish + fully mark past paper 2025-II → identify any new weak areas → 3 targeted problems on newly identified weak topics

2026-05-31 (Sun):
  ML (1h): Full topic list confirmation pass — strong areas: confirm. Gap areas: one more targeted pass.
  SP (1.5h): Derivations from memory, no notes: CLT sketch proof, MLE for Normal, OLS coefficient formula, t-test statistic derivation

2026-06-01 (Mon) — BLOCKED:
  ML (1h, evening only): Gap list light final read → sleep well (exam 08:30 tomorrow)

2026-06-02 (Tue) — ML RESIT 08:30:
  Afternoon: light SP review only — no new topics

2026-06-03 (Wed) — BLOCKED:
  SP (1-2h if energy allows): Weak-area problems only — no new topics, show all steps clearly

2026-06-04 (Thu) — SP RESIT 08:30:
  [exam day]
```

---

### STEP 5 — Build DB — Video Lecture Log.md

`Courses/DB — Databases/DB — Video Lecture Log.md`:

```markdown
# DB — Video Lecture Log

[[Courses/DB — Databases/DB — Index|← Back to DB Index]]

Track every video. Add a one-sentence takeaway immediately after watching.

## Progress
- Total: 51 videos | ~770 min (~12h50)
- Watched: 0 / 51
- On schedule: ☐

---

## Section 1 — Introduction (28 min)
- [ ] Introduction (28 min) | Takeaway:

## Section 2 — Relational Model (52 min)
- [ ] Example Database (3 min) | Takeaway:
- [ ] Database Schemas (7 min) | Takeaway:
- [ ] Database States (4 min) | Takeaway:
- [ ] Null Values (8 min) | Takeaway:
- [ ] Integrity Constraints (6 min) | Takeaway:
- [ ] Keys (15 min) | Takeaway:
- [ ] Foreign Keys (9 min) | Takeaway:

## Section 3 — Data Modelling (70 min)
- [ ] Database Design Phases (3 min) | Takeaway:
- [ ] ER Basics (10 min) | Takeaway:
- [ ] Cardinality Limits (10 min) | Takeaway:
- [ ] Relationship Sets with Attributes (5 min) | Takeaway:
- [ ] Weak Entity Sets (12 min) | Takeaway:
- [ ] ISA Inheritance (7 min) | Takeaway:
- [ ] Aggregation (3 min) | Takeaway:
- [ ] Notation Summary (3 min) | Takeaway:
- [ ] UML / Unified Modelling Language (7 min) | Takeaway:

## Section 4 — Translating to Relational (37 min)
- [ ] Basic Translation (4 min) | Takeaway:
- [ ] Optimised Translation / Eliminating Tables (7 min) | Takeaway:
- [ ] Enforcing Cardinality Constraints via ICs (10 min) | Takeaway:
- [ ] Composite and Multivalued Attributes (3 min) | Takeaway:
- [ ] ISA Inheritance translation (7 min) | Takeaway:
- [ ] Keys and Recursive Relations (6 min) | Takeaway:

## Section 5 — Advanced SQL (~230 min)
- [ ] Example Database (3 min) | Takeaway:
- [ ] Basic SQL Syntax (9 min) | Takeaway:
- [ ] Querying Multiple Tables (23 min) | Takeaway:
- [ ] Self Joins (13 min) | Takeaway:
- [ ] Duplicate Elimination (12 min) | Takeaway:
- [ ] Outer and Inner Joins (27 min) | Takeaway:
- [ ] Non-Monotonic Queries intro (3 min) | Takeaway:
- [ ] Not In (9 min) | Takeaway:
- [ ] Not Exists (12 min) | Takeaway:
- [ ] For All (9 min) | Takeaway:
- [ ] Nested Subqueries (15 min) | Takeaway:
- [ ] All, Some, Any (5 min) | Takeaway:
- [ ] Single Value Subqueries (5 min) | Takeaway:
- [ ] Subqueries under From (7 min) | Takeaway:
- [ ] Aggregation Functions (16 min) | Takeaway:
- [ ] Aggregations with Group and Having (16 min) | Takeaway:
- [ ] Aggregation Subqueries (13 min) | Takeaway:
- [ ] Case Distinctions / Union / Case / Coalesce (15 min) | Takeaway:
- [ ] Sorting Output / Order By (5 min) | Takeaway:

## Section 6 — Normalization (~220 min)
- [ ] Introduction to FDs (7 min) | Takeaway:
- [ ] Functional Dependencies (20 min) | Takeaway:
- [ ] Implication of Functional Dependencies (15 min) | Takeaway:
- [ ] Canonical Sets of Functional Dependencies (20 min) | Takeaway:
- [ ] Determining Keys (20 min) | Takeaway:
- [ ] Determinants (11 min) | Takeaway:
- [ ] Consequences of Bad Design (4 min) | Takeaway:
- [ ] BCNF (13 min) | Takeaway:
- [ ] 3NF (8 min) | Takeaway:
- [ ] Splitting Relations (15 min) | Takeaway:
- [ ] Transformation to BCNF (22 min) | Takeaway:
- [ ] Transformation to 3NF (15 min) | Takeaway:
- [ ] Multivalued Dependencies and 4NF (17 min) | Takeaway:
- [ ] Normal Forms and Conceptual Design (8 min) | Takeaway:
- [ ] Denormalization (5 min) | Takeaway:
- [ ] Other Constraints (5 min) | Takeaway:

## Section 7 — Transactions (~130 min)
- [ ] Concurrency Anomalies (16 min) | Takeaway:
- [ ] Transactions, Schedules and Serialisability (33 min) | Takeaway:
- [ ] Two Phase Locking (20 min) | Takeaway:
- [ ] Two Phase Locking — Deadlock Handling (4 min) | Takeaway:
- [ ] Cascading Rollbacks (9 min) | Takeaway:
- [ ] Strict and Preclaiming Two Phase Locking (7 min) | Takeaway:
- [ ] Granularity of Locking (11 min) | Takeaway:
- [ ] Isolation Levels (8 min) | Takeaway:
- [ ] Optimistic Concurrency Control (6 min) | Takeaway:
- [ ] Multiversion Concurrency Control (8 min) | Takeaway:
- [ ] Optimizing Database Performance (4 min) | Takeaway:
```

---

### STEP 6 — Build all course Index files and sub-notes

Rules:
- Every sub-note links back to course Index: `[[Courses/COURSE/ID — Index|← Back to Index]]`
- Callout blocks: `> [!definition]`, `> [!formula]`, `> [!tip]`, `> [!warning]`, `> [!todo]`
- SP derivations: full LaTeX (`$...$` inline, `$$...$$` block)
- DB SQL: ` ```sql ` code blocks
- HAI claims: always cite `(Lectures)` or `(Campbell-Kelly ch.X)`
- Resource-extracted content: tag with `> Source: [filename], p.[X]`

DB Index must link to: DB — Video Lecture Log | DB — Topics & Definitions | DB — SQL Practice | DB — Normalization Drills | DB — Transactions | DB — Exam Strategy

Use the full topic lists from the "Course Topic Lists" section below for each Index checklist.

**DB — SQL Practice.md** must contain:
- Full Suppliers/Parts/Catalog schema with CREATE TABLE statements in SQL code blocks
- Exercise exam Q3a + Q3b with complete solutions + step-by-step explanation of double NOT EXISTS
- 5 additional NOT EXISTS practice queries with full answers
- SQL pattern reference table: Pattern | Use Case | Template Query

**DB — Normalization Drills.md** must contain:
- Canonical FD algorithm as explicit 4-step numbered procedure
- Exercise exam FD set {A→DB, B→D, AE→ED, E→A} worked fully (all intermediate steps)
- 3 additional generated FD problems with full solutions (generate varied examples)
- Drill log table: Date | FD Set | Time Taken | Errors Made | ✓

**SP — Derivations Master List.md** must contain:
- All derivations from the SP topic list in full LaTeX
- Organised by section with difficulty: ⭐ recall | ⭐⭐ reconstruct | ⭐⭐⭐ prove from scratch
- `> [!todo] INSERT FROM FORMULA SHEET — [formula name]` for each gap to fill from Karina's formula sheet

**ML — Gap Analysis.md** must contain:
```markdown
# ML — Gap Analysis

[[Courses/ML — Machine Learning/ML — Index|← Back to ML Index]]

> Previous score: 32/40. Target: 35/40. Need: +3 points.
> Fill in this file FIRST before studying anything else for ML.

## Step 1 — Reconstruct the exam

For each question you remember from the 32/40 attempt:

| # | Topic | Question type | Points | Got it? | Why wrong |
|---|-------|--------------|--------|---------|-----------|
| | | | | ✓ / ✗ | |

## Step 2 — Gap list (topics where points were lost)

| Topic | Points lost | Recovery difficulty (easy/medium/hard) | Priority |
|-------|-------------|----------------------------------------|----------|
| | | | |

## Step 3 — Study priority order
> Rank topics: highest points × easiest recovery = do first

1.
2.
3.

## Step 4 — Progress tracking

| Topic | Status | Last practiced | Confidence (1-5) |
|-------|--------|---------------|------------------|
| | Not started | | |

## Notes
> Add any patterns you notice about your errors (careless vs conceptual vs formula recall)
```

**HAI — Practice Answers.md** must contain:
- Answer template (claim → evidence → example structure)
- 1 full example A-answer from a past exam question (written by Claude, 150-200 words)
- 1 full example B-answer from a past exam question (written by Claude, 200-250 words)
- 1 full example C-answer from a past exam question (written by Claude, 200-250 words)
- For each: label the claim, evidence, and example sections explicitly
- Space for Karina's practice answers with feedback prompts

---

### STEP 7 — Course Topic Lists (use these to build Index checklists and HTML tools)

#### DB — Full topic checklist

```
CONCEPTUAL MODELLING
- [ ] ER diagrams: entities, attributes, relationships, cardinality notation
- [ ] Aggregation: when to use, how to model in ER
- [ ] Weak entity sets: identifying relationship, discriminator attribute
- [ ] ISA inheritance: overlapping vs disjoint, covering vs non-covering
- [ ] UML class diagrams: translation from ER
- [ ] Relational schema derivation: primary keys, foreign keys, nullable attributes, candidate keys

SQL
- [ ] Basic syntax: SELECT, FROM, WHERE, attribute references
- [ ] Joins: inner join, self-join, DISTINCT, LEFT/RIGHT/FULL OUTER JOIN
- [ ] Non-monotonic queries: (NOT) IN — limitations with NULLs
- [ ] NOT EXISTS: semantics, when to prefer over NOT IN
- [ ] "For all" via double NOT EXISTS: ¬∃ pattern
- [ ] Nested subqueries: correlated vs uncorrelated
- [ ] Subqueries under FROM: inline views
- [ ] Single value subqueries: scalar subqueries in WHERE
- [ ] ALL, SOME, ANY operators: semantics
- [ ] Aggregation: COUNT, SUM, AVG, MIN, MAX
- [ ] GROUP BY vs WHERE: when each applies
- [ ] HAVING: filtering on aggregate results
- [ ] Aggregation subqueries: aggregates inside subqueries
- [ ] UNION, INTERSECT, EXCEPT: set operations, duplicate handling
- [ ] CASE expressions, COALESCE, NULLIF
- [ ] ORDER BY: ASC/DESC, NULLS FIRST/LAST

NORMALIZATION
- [ ] Functional dependencies: definition, trivial FDs
- [ ] Closure of attribute sets: algorithm
- [ ] Armstrong axioms: reflexivity, augmentation, transitivity — with proofs
- [ ] Implication: proving FDs via axiom chains
- [ ] Canonical FD set (minimal basis): 4-step algorithm with all intermediate steps
- [ ] Minimal keys: derivation from canonical set
- [ ] Determinants and canonical dependencies
- [ ] 1NF definition and violation examples
- [ ] BCNF: definition and violation check
- [ ] 3NF: definition and how it differs from BCNF (prime attribute exception)
- [ ] BCNF decomposition: maximise RHS, iterative splits
- [ ] 3NF synthesis: one relation per canonical FD + key relation if needed
- [ ] FD loss in BCNF vs 3NF: which can lose FDs and why
- [ ] Multivalued dependencies (MVD) and 4NF: definition
- [ ] Denormalization: when and trade-offs

TRANSACTIONS
- [ ] Schedules: serial vs interleaved
- [ ] Conflict types: R-W, W-R, W-W
- [ ] Conflict serializability: definition
- [ ] Precedence graph: construction and cycle detection
- [ ] Cascadeless schedules: definition
- [ ] Recoverable schedules: definition
- [ ] Cascadeless ⊂ recoverable: why
- [ ] 2PL: growing and shrinking phases
- [ ] Strict 2PL: holds locks until commit
- [ ] Preclaiming 2PL: acquires all locks before start
- [ ] Deadlock detection: waits-for graph
- [ ] Cascading rollbacks: mechanism
- [ ] Granularity of locking: table vs page vs row
- [ ] Isolation levels: READ UNCOMMITTED → SERIALIZABLE
- [ ] Optimistic concurrency control: validate phase
- [ ] MVCC: readers don't block writers

DATABASE APIs
- [ ] String assembly: SQL injection vulnerability
- [ ] Prepared statements: mechanism and advantages
- [ ] ANSI SPARC: three levels (external, conceptual, internal)
- [ ] ORM position in ANSI SPARC: external/conceptual level
- [ ] ORM purpose: application view + schema evolution
- [ ] Hibernate, Entity Framework: examples
```

#### TM — Full topic checklist

```
NLP OVERVIEW
- [ ] Structured vs unstructured text: why NLP is needed
- [ ] Information layers: entities | events/topics | opinions/emotions
- [ ] Full NLP pipeline: tokenisation → POS → NER → parsing → semantics
- [ ] Core NLP challenges: ambiguity, coreference, world knowledge

TEXT CLASSIFICATION
- [ ] Logistic regression for text: log-linear model, feature vectors
- [ ] TF-IDF: formula and intuition
- [ ] Bag of words: strengths + limitations
- [ ] Regularisation: L1 vs L2 effects
- [ ] SVM for text: maximum margin, kernel trick (Saigal & Khanna 2020)
- [ ] Multi-class: one-vs-rest, softmax

WORD REPRESENTATIONS
- [ ] Distributional hypothesis
- [ ] Word2vec CBOW: predict target from context
- [ ] Word2vec Skip-gram: predict context from target
- [ ] Negative sampling
- [ ] GloVe: global co-occurrence
- [ ] Static vs contextual embeddings
- [ ] BERT: MLM + NSP pre-training

SEQUENCE LABELLING
- [ ] BIO/IOB tagging: B-begin, I-inside, O-outside
- [ ] BIOES extension
- [ ] HMM: emission + transition, Viterbi
- [ ] CRF: global normalisation, Viterbi decoding
- [ ] Why CRF > MaxEnt for sequences
- [ ] POS tagging as NER prerequisite

NER
- [ ] Entity types: PER, ORG, LOC, DATE, TIME, MONEY
- [ ] Rule-based: gazetteers + regex
- [ ] ML-based: CRF + hand-crafted features
- [ ] Deep learning: BiLSTM-CRF, BERT fine-tuned (Yadav & Bethard 2019)
- [ ] Evaluation: exact vs partial match, P/R/F1

SENTIMENT & OPINION
- [ ] Sentiment vs opinion vs emotion vs affect
- [ ] Lexicon-based: SentiWordNet, LIWC, VADER
- [ ] ML approaches: supervised classification
- [ ] Aspect-level sentiment analysis
- [ ] Subjectivity detection
- [ ] Connotation (J&M ch.22)

TOPIC MODELLING
- [ ] LDA: generative model, Dirichlet priors, Gibbs sampling
- [ ] Evaluation: perplexity + coherence
- [ ] NMF approach
- [ ] Neural topic models
- [ ] Vayansky & Kumar 2020 key claims
- [ ] Churchill & Singh 2021 key claims

TRANSFORMERS & FINE-TUNING
- [ ] Pre-training vs fine-tuning paradigm
- [ ] Self-attention: Q, K, V, formula Attention(Q,K,V)=softmax(QKᵀ/√dk)V
- [ ] Multi-head attention
- [ ] Positional encoding: sine/cosine
- [ ] Encoder vs decoder vs encoder-decoder
- [ ] BERT fine-tuning for classification (Sun et al. 2019)
- [ ] When fine-tuning outperforms from-scratch (Church 2021)
- [ ] HuggingFace ecosystem (Wolf et al. 2020)

NLTK PRACTICAL
- [ ] ch.6: Naive Bayes, decision trees, MaxEnt, feature extractors
- [ ] ch.7: chunking, NER pipeline, relation extraction
- [ ] ch.8: CFG, parsing, structural ambiguity

LITERATURE — key claim per paper
- [ ] Maynard et al. 2016: layered NLP for semantic annotation
- [ ] Jurafsky & Martin ch.4: logistic regression for classification
- [ ] Jurafsky & Martin ch.5: word embeddings
- [ ] Jurafsky & Martin ch.17: sequence labelling, CRF
- [ ] Jurafsky & Martin ch.22: sentiment, lexicons, connotation
- [ ] Wolf et al. 2020: HuggingFace unified NLP library
- [ ] Yadav & Bethard 2019: deep learning surpasses feature-based NER
- [ ] Vayansky & Kumar 2020: LDA remains competitive, evaluation challenges
- [ ] Churchill & Singh 2021: shift toward neural topic models
- [ ] Church et al. 2021: pre-trained models are more data-efficient
- [ ] Saigal & Khanna 2020: SVM competitive with DL on text classification
- [ ] Sun et al. 2019: domain-specific BERT pre-training + fine-tuning

EVALUATION
- [ ] Precision = TP/(TP+FP), Recall = TP/(TP+FN), F1 = 2PR/(P+R)
- [ ] Micro vs macro averaging
- [ ] When to use F1 vs accuracy
```

#### HAI — Full topic checklist

```
A-QUESTIONS (LECTURES)
- [ ] Prehistory of AI vs computing: common structures/events
- [ ] Paris 1951 conference: AI as driver of post-WWII computer development
- [ ] Acronyms in 1950s computing: social and institutional role
- [ ] Grace Hopper: direct + indirect contributions to computing and AI
- [ ] Programmed instruction hype (1950s/60s) vs LOGO (1970s/80s)
- [ ] History of AI as method for defining AI
- [ ] Computers in ordinary life (1980s-90s): statistics + blockbusters narrative
- [ ] Data and AI: surveillance capitalism rise
- [ ] Electronic brain metaphor (1950s): origins + AI link
- [ ] AI in 1960s/70s mathematics: two specific examples
- [ ] Game culture and AI: mutual beneficial interaction
- [ ] Web 2.0 and AI: enabling conditions
- [ ] Trust in technology: late 19th/early 20th century

B-QUESTIONS (CAMPBELL-KELLY)
- [ ] ch.4 Moore school: computing as means to an end
- [ ] ch.4-5 Magnetic tape problems vs punched cards
- [ ] ch.5 IBM 1401: technology + marketing (Watson vs Eckert/Mauchly)
- [ ] ch.5 Perry Crawford: two saves of project Whirlwind
- [ ] ch.6 OS/360 + software crisis: stakeholder perspectives
- [ ] ch.6 Timesharing: role in rise of personal computing
- [ ] ch.7 Whole Earth Catalogue: influence on personal computing
- [ ] ch.7 GUI OS failures 1980s: two companies + historical relevance
- [ ] ch.8 Personal computers: two California cultures
- [ ] ch.8 Broadening the appeal: main firms + strategies
- [ ] ch.9 Internet: three desires confluence
- [ ] ch.9 E-mail: social issues (sociologists + psychologists)
- [ ] ch.10 Off-shoring + out-sourcing: IT examples
- [ ] ch.11 Netflix: Web 2.0 + surveillance capitalism
- [ ] ch.11 Google ~2000: novelty + surveillance capitalism link
- [ ] ch.12 Diversity and inclusion: 2010s computer industry
- [ ] ch.14 US vs European privacy legislation
- [ ] ch.14-15 Computing as ethical liability: two government responses

C-QUESTION CONCEPTS
- [ ] Appropriation: traditional computing history → AI history
- [ ] Data-driven / digital culture: 21st century descriptor
- [ ] Prejudice in histories: caucasian male dominance + counter-examples
- [ ] Computer clubs: types, US vs European, agendas
- [ ] Defining technology (Bolter): 21st century AI examples
- [ ] Defining technology (Bolter): 1960s cybernetics examples
- [ ] AI winters + Babbage/Aiken: agendas in history writing
- [ ] McCorduck's history of AI: context of AI winters
- [ ] Silicon Valley myth vs reality: company culture comparison

KEY CONCEPTS
- [ ] Agendas: how histories further specific goals
- [ ] Appropriation: taking and reusing in new context
- [ ] Surveillance capitalism (Zuboff): data as business model
- [ ] Defining technology (Bolter): reshapes human self-understanding
- [ ] AI winters: definition and narrative function
```

#### ML — Full topic checklist

```
SUPERVISED LEARNING
- [ ] Bias-variance tradeoff: formal decomposition MSE = Bias² + Var + noise
- [ ] Overfitting + underfitting: detection, learning curves
- [ ] Regularisation: L1 (Lasso, sparsity), L2 (Ridge, weight decay), ElasticNet
- [ ] Cross-validation: k-fold, leave-one-out, stratified

EVALUATION
- [ ] Classification: accuracy, precision, recall, F1
- [ ] ROC curve + AUC-ROC
- [ ] Precision-recall curve
- [ ] Regression: MSE, RMSE, MAE, R-squared
- [ ] Confusion matrix

LINEAR MODELS
- [ ] Linear regression: OLS, assumptions, inference
- [ ] Logistic regression: sigmoid, log-loss, gradient descent
- [ ] Generalised linear models

TREE-BASED
- [ ] Decision trees: Gini impurity, information gain, pruning
- [ ] Random Forest: bagging, feature subsampling, OOB error
- [ ] Gradient Boosting: additive model, AdaBoost, XGBoost

SVMs
- [ ] Maximum margin classifier
- [ ] Support vectors and margin
- [ ] Kernel trick: RBF, polynomial, linear
- [ ] Soft margin: C parameter trade-off

NEURAL NETWORKS
- [ ] Backpropagation: chain rule
- [ ] Activation functions: ReLU, sigmoid, tanh, softmax
- [ ] SGD variants: Adam, RMSprop
- [ ] Batch normalisation, dropout

DEEP LEARNING
- [ ] CNNs: convolution, pooling, receptive field
- [ ] RNNs: vanishing gradient
- [ ] LSTMs: cell state, three gates
- [ ] GRUs: simplified gating
- [ ] Seq2seq models

ATTENTION + TRANSFORMERS
- [ ] Self-attention: Q, K, V
- [ ] Multi-head attention
- [ ] Positional encoding
- [ ] Transformer encoder/decoder

UNSUPERVISED
- [ ] K-means: algorithm, convergence, k selection
- [ ] Hierarchical clustering: agglomerative, dendrograms
- [ ] PCA: eigenvectors, explained variance, reconstruction
- [ ] Autoencoders

PROBABILISTIC MODELS
- [ ] Naive Bayes: conditional independence
- [ ] GMM + EM algorithm: E-step and M-step

TIME SERIES
- [ ] Stationarity: ADF test
- [ ] ARIMA
- [ ] PatchTST: patch-based transformer for time series
- [ ] FI-2010 benchmark: LOB mid-price prediction

GAP TOPICS (fill from Gap Analysis)
- [ ] [gap topic 1 — fill after gap analysis]
- [ ] [gap topic 2]
- [ ] [gap topic 3]
```

#### SP — Full topic checklist

```
PROBABILITY FOUNDATIONS
- [ ] Kolmogorov axioms: non-negativity, normalisation, countable additivity
- [ ] Conditional probability: P(A|B) = P(A∩B)/P(B)
- [ ] Independence: P(A∩B) = P(A)P(B)
- [ ] Law of Total Probability
- [ ] Bayes' theorem: derivation
- [ ] Combinatorics: nPr, nCr, multinomial

DISCRETE DISTRIBUTIONS
- [ ] Bernoulli(p): PMF, E[X], Var[X]
- [ ] Binomial(n,p): PMF, E[X]=np, Var[X]=np(1-p), MGF
- [ ] Geometric(p): PMF, E[X]=1/p, memoryless proof
- [ ] Negative Binomial(r,p): PMF, E[X]=r/p
- [ ] Poisson(λ): PMF derivation as Binomial limit, E[X]=λ, Var[X]=λ, MGF
- [ ] Hypergeometric: PMF, sampling without replacement

CONTINUOUS DISTRIBUTIONS
- [ ] Uniform(a,b): PDF, CDF, E[X], Var[X]
- [ ] Exponential(λ): PDF, CDF, memoryless proof, Poisson link
- [ ] Normal(μ,σ²): PDF, symmetry, Z-transform
- [ ] Linear combinations of normals
- [ ] Gamma(α,β): PDF, relation to Exponential
- [ ] Chi-squared(k): relation to Normal
- [ ] Beta(α,β): PDF on [0,1]
- [ ] Student's t(k): heavier tails than Normal

JOINT DISTRIBUTIONS
- [ ] Joint PMF/PDF: definition
- [ ] Marginal distributions
- [ ] Conditional distributions: f(x|y) = f(x,y)/f(y)
- [ ] Independence: f(x,y) = f(x)f(y)
- [ ] Covariance: Cov(X,Y) = E[XY] - E[X]E[Y]
- [ ] Correlation: ρ = Cov/(σ_X σ_Y)
- [ ] Zero correlation ≠ independence (unless jointly Normal)
- [ ] Bivariate Normal: conditional distributions

EXPECTATION & MOMENTS
- [ ] Linearity of expectation (no independence needed)
- [ ] LOTUS: E[g(X)] = ∫g(x)f(x)dx
- [ ] Conditional expectation: tower property E[X] = E[E[X|Y]]
- [ ] Var(X) = E[X²] - (E[X])²
- [ ] Var(X+Y) with covariance term
- [ ] MGF: M_X(t) = E[e^{tX}], uniqueness theorem
- [ ] MGF of sum: product of MGFs if independent

LIMIT THEOREMS
- [ ] Weak LLN: X̄ →ᵖ μ
- [ ] Strong LLN: X̄ →ᵃ·ˢ· μ
- [ ] CLT: √n(X̄-μ)/σ → N(0,1) — proof via MGFs
- [ ] Continuity correction

ESTIMATION
- [ ] Bias, variance, MSE = Bias² + Var
- [ ] MLE: log-likelihood, score equation
- [ ] MLE for Bernoulli, Normal (μ and σ²), Exponential, Poisson
- [ ] MOM: equate sample moments to theoretical
- [ ] Fisher information + Cramér-Rao lower bound
- [ ] Sufficient statistics: factorisation theorem

CONFIDENCE INTERVALS
- [ ] z-interval: X̄ ± z_{α/2} · σ/√n
- [ ] t-interval: X̄ ± t_{α/2,n-1} · S/√n
- [ ] Correct interpretation (frequentist — NOT probability the true value is in this interval)

HYPOTHESIS TESTING
- [ ] H₀, H₁, Type I (α), Type II (β), power = 1-β
- [ ] p-value definition
- [ ] z-test: known σ, large n
- [ ] One-sample t-test: T = (X̄-μ₀)/(S/√n) ~ t_{n-1}
- [ ] Two-sample t-test: pooled (equal var) vs Welch (unequal)
- [ ] Paired t-test
- [ ] Chi-square goodness of fit: χ² = Σ(O-E)²/E ~ χ²_{k-1}
- [ ] Chi-square independence: χ² ~ χ²_{(r-1)(c-1)}
- [ ] F-test for variance: F = S₁²/S₂² ~ F_{n₁-1,n₂-1}
- [ ] One-way ANOVA: F = MS_between/MS_within
- [ ] Likelihood ratio test: -2ln(Λ) ~ χ²_{df}

REGRESSION
- [ ] Simple OLS: β̂₁ = Sxy/Sxx, β̂₀ = ȳ - β̂₁x̄
- [ ] Gauss-Markov assumptions + BLUE
- [ ] Inference on coefficients: t-test df=n-2
- [ ] R-squared: R² = SSR/SST = 1 - SSE/SST
- [ ] F-test for overall fit
- [ ] Multiple regression: β̂ = (XᵀX)⁻¹Xᵀy
- [ ] Ceteris paribus interpretation
- [ ] Residual analysis: QQ-plot, residuals vs fitted
```

---

### STEP 8 — Build HTML Study Tools

One HTML file per course in `HTML Study Tools/`. Fully self-contained. Google Fonts CDN allowed. No localStorage — track state in JS memory only.

Each tool: three tab modes — Flashcards | Practice Problems | Quiz

**Design requirements:**
- Dark mode via `prefers-color-scheme: dark`
- iPad/mobile friendly: touch targets ≥44px, responsive layout
- Keyboard: spacebar = flip card, ← → = prev/next card, Enter = reveal answer
- Show keyboard shortcuts on screen
- Session progress bar
- End-of-quiz: score + topic breakdown showing weakest areas

**DB — Practice Tool.html**
- Flashcards: canonical FD algorithm steps, BCNF definition, 3NF definition, cascadeless vs recoverable (precise), strict vs preclaiming 2PL, ANSI SPARC three levels, ORM purpose, SQL injection mechanism, double NOT EXISTS logic, aggregation vs HAVING, all key SQL patterns (self-join, outer join, NOT EXISTS, FOR ALL)
- Practice problems: 5 normalization (varied FD sets, full pipeline), 5 SQL (Suppliers/Parts/Catalog schema), 3 transaction (precedence graph + serialisability decision), 2 API (ANSI SPARC level identification + ORM scenario)
- Quiz: 25 MC covering all DB sections, include exercise exam question types

**TM — Flashcard Tool.html**
- Flashcards: all 12 literature papers (author year | key claim | exam angle), all NLP concept definitions, self-attention formula, BIO tagging scheme, LDA generative model steps
- Practice problems: 6 explain questions — self-attention mechanism, CRF vs MaxEnt, LDA generative model, why BERT fine-tuning works, TF-IDF intuition, double NOT EXISTS (wait — that's DB; replace with: aspect-level sentiment analysis)
- Quiz: 25 MC, at least 10 literature-based questions

**HAI — Flashcard Tool.html**
- Flashcards: 13 A-question themes (lecture → line of thought), 18 B-question arguments (ch.X → Campbell-Kelly's claim), 9 C-question concepts (concept → definition + example)
- Practice problems: 3 essay structure guides with model outline for A/B/C type — prompt Karina to write, not pre-filled answers
- Quiz: 20 MC — key figures, company histories, chapter arguments, concept definitions

**ML — Practice Tool.html**
- Flashcards: all ML algorithms (name | key idea | when to use | complexity)
- Practice problems: 10 problems from Resources/past exams if available; otherwise generated from topic list, covering gap topics first
- Quiz: 25 MC, gap topics flagged with a ⚠️ indicator

**SP — Practice Tool.html**
- Flashcards: all 13 distributions — name | parameters | PMF/PDF | E[X] | Var[X] | MGF | key property
- Practice problems: 10 derivation problems (show all steps), 5 CI construction, 5 hypothesis test selection + execution, 3 regression, 3 CLT application
- Quiz: 25 MC — distribution identification from description, test selection from scenario, formula recall

---

### STEP 9 — Scan Resources/ and enrich all files

After all files created, scan each `Resources/` folder. Per file:
- Past exam → extract all questions → add to HTML practice tool + `## Past Exam Questions` in course practice notes
- Lecture slides → extract definitions/formulas → merge into topic notes with `(Slides, Week X)` tag
- Formula sheet → fill all `[!todo] INSERT FROM FORMULA SHEET` gaps in SP — Derivations Master List.md
- Lab assignments → add as practical exercise sections in TM — NLP Pipeline.md

Tag all extracted content: `> Source: [filename], p.[X]`

---

### STEP 10 — Final checks

- [ ] Every .md has at least one wikilink back to its course Index
- [ ] Every course Index links to all its sub-notes
- [ ] MOC links to all 5 course Indexes + all 5 HTML tools + DB Video Lecture Log
- [ ] DB — Video Lecture Log has all 51 videos listed
- [ ] All daily logs 2026-04-17 to 2026-06-04 exist with pre-filled plan tables
- [ ] DB video days have the DB Video Session table pre-filled
- [ ] All 5 HTML tools open in browser without syntax errors
- [ ] SP — Derivations Master List.md has ≥20 complete derivations
- [ ] DB — Normalization Drills.md has ≥3 full drill problems with solutions
- [ ] DB — SQL Practice.md has Q3a + Q3b fully explained
- [ ] HAI — Practice Answers.md has 3 example answers (A, B, C)
- [ ] ML — Gap Analysis.md is structured and ready for Karina to fill

---

## Ongoing Commands

### "update today's log"
Open today's daily log. Ask: (1) what did you complete, (2) what was unclear, (3) confidence per course 1-5. Update log. Check tomorrow — rebalance if behind on any course.

### "I watched [video name]"
Open DB — Video Lecture Log. Mark video complete. Ask for one-sentence takeaway. Record it. Update watched count.

### "add to [course] notes"
Open specified sub-note. Add content under correct heading. Add source tag. Update course Index checklist.

### "I finished [topic]"
Mark topic checkbox `- [x]` in course Index. Update upcoming daily logs if this topic was scheduled.

### "generate practice problems for [topic]"
Generate 5 problems increasing difficulty with full worked solutions. Add to course practice note under `## Generated Problems — [date]`.

### "I have [X] days until [exam]"
List unchecked topics in course Index. Rank by point value then recovery ease. Output day-by-day plan for remaining days.

### "new resource in [course]/Resources/"
Run Step 9 for that file only. Announce what was extracted and where.

---

## Working Style Notes

- Write to files — do not explain what you would write, just write it
- No flattery, no hedging, no summaries of work without doing the work
- Mark gaps with `> [!todo]` — never guess or hallucinate content
- Terminal output: concise. File content: verbose and complete.
- Ambiguous decisions: decide and document with `<!-- Claude decision: reason -->`
- DB video schedule is the backbone of DB prep — treat as non-negotiable unless Karina overrides

---

*Source of truth for Claude Code in this vault. Steps are idempotent — safe to re-run. Last updated: April 2026.*

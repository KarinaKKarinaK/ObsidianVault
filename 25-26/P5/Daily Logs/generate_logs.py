#!/usr/bin/env python3
"""Generate pre-filled daily study logs for exam season 2026-04-17 to 2026-06-04."""
import os

BASE = os.path.dirname(os.path.abspath(__file__))

# (date, weekday, [(course, task, duration)], [(video, duration)] or None)
SCHEDULE = [
    ('2026-04-17', 'Thu', [
        ('DB', 'WATCH Introduction (28min) + Example Database (3min) + Database Schemas (7min) → sketch relational model from memory', '1.5h'),
        ('SP', 'Review Bayes theorem + law of total probability → 5 conditional probability problems', '1h'),
    ], [
        ('Introduction', '28 min'),
        ('Example Database', '3 min'),
        ('Database Schemas', '7 min'),
    ]),
    ('2026-04-18', 'Fri', [
        ('TM', 'Read J&M ch.4 Logistic Regression for text classification → create 5 definition flashcards', '1.5h'),
        ('HAI', 'Read Campbell-Kelly ch.4–5 → write 3 bullet notes per chapter (Moore school, IBM rise)', '1h'),
    ], None),
    ('2026-04-19', 'Sat', [
        ('DB', 'WATCH Database States (4min) + Null Values (8min) + Integrity Constraints (6min) + Keys (15min) + Foreign Keys (9min) → write key/constraint definitions + 3 schema integrity problems', '1.5h'),
        ('SP', 'Binomial + Poisson PMF derivations from first principles → compute E[X] and Var[X] for both → 4 computation problems', '1h'),
    ], [
        ('Database States', '4 min'),
        ('Null Values', '8 min'),
        ('Integrity Constraints', '6 min'),
        ('Keys', '15 min'),
        ('Foreign Keys', '9 min'),
    ]),
    ('2026-04-20', 'Sun', [
        ('DB', 'WATCH Database Design Phases (3min) + ER Basics (10min) + Cardinality Limits (10min) + Relationship Sets with Attributes (5min) → attempt exercise exam Q1a ER diagram without looking at solution', '1.5h'),
        ('SP', 'Geometric + Negative Binomial → prove memoryless property of Geometric → 3 computation problems', '1h'),
    ], [
        ('Database Design Phases', '3 min'),
        ('ER Basics', '10 min'),
        ('Cardinality Limits', '10 min'),
        ('Relationship Sets with Attributes', '5 min'),
    ]),
    ('2026-04-21', 'Mon — BLOCKED 8AM–7PM', [
        ('HAI', 'Evening only: Read Campbell-Kelly ch.6–7 light read → IBM 1401 technology + marketing narrative + Perry Crawford Whirlwind saves', '1h'),
    ], None),
    ('2026-04-22', 'Tue', [
        ('DB', 'WATCH Weak Entity Sets (12min) + ISA Inheritance (7min) + Aggregation (3min) + Notation Summary (3min) + UML (7min) → add weak entities + ISA to Apr 20 ER diagram → compare vs exercise exam solution', '1.5h'),
        ('TM', 'Read J&M ch.5 word embeddings → 5 flashcards: distributional hypothesis, word2vec CBOW vs Skip-gram, GloVe, static vs contextual', '1h'),
    ], [
        ('Weak Entity Sets', '12 min'),
        ('ISA Inheritance', '7 min'),
        ('Aggregation', '3 min'),
        ('Notation Summary', '3 min'),
        ('UML / Unified Modelling Language', '7 min'),
    ]),
    ('2026-04-23', 'Wed — BLOCKED', [
        ('—', 'Passive only if energy allows — no tasks assigned', '—'),
    ], None),
    ('2026-04-24', 'Thu', [
        ('DB', 'WATCH Basic Translation (4min) + Optimised Translation (7min) + Enforcing Cardinality via ICs (10min) + Composite + Multivalued Attributes (3min) → derive relational schema from ER diagram (exercise exam Q1b) → mark all PKs, FKs, nullable attrs, candidate keys', '1.5h'),
        ('SP', 'Joint distributions — joint PDF/PMF, marginals, conditional distributions → covariance and correlation → 3 joint distribution problems', '1h'),
    ], [
        ('Basic Translation', '4 min'),
        ('Optimised Translation / Eliminating Tables', '7 min'),
        ('Enforcing Cardinality Constraints via ICs', '10 min'),
        ('Composite and Multivalued Attributes', '3 min'),
    ]),
    ('2026-04-25', 'Fri', [
        ('SP', 'Exponential distribution (PDF, CDF, memoryless proof, Poisson link) + Normal (standard normal, Z-scores, linear combinations) → 5 problems from past paper 2025-I normal/exponential section', '1.5h'),
        ('HAI', 'Read Campbell-Kelly ch.9–10 (software crisis, OS/360, timesharing) → write one B-question paragraph per chapter (200 words each)', '1h'),
    ], None),
    ('2026-04-26', 'Sat', [
        ('DB', 'WATCH ISA Inheritance translation (7min) + Keys and Recursive Relations (6min) + Basic SQL Syntax (9min) + Querying Multiple Tables (23min) → write 3 SQL queries on Suppliers/Parts/Catalog schema', '1.5h'),
        ('ML', 'Gap analysis session — reconstruct previous exam attempt from memory → list every question type wrong → group by topic → rank by point value', '1h'),
    ], [
        ('ISA Inheritance translation', '7 min'),
        ('Keys and Recursive Relations', '6 min'),
        ('Basic SQL Syntax', '9 min'),
        ('Querying Multiple Tables', '23 min'),
    ]),
    ('2026-04-27', 'Sun', [
        ('DB', 'WATCH Self Joins (13min) + Duplicate Elimination (12min) + Outer and Inner Joins (27min) → write 4 SQL queries: self-join + DISTINCT + LEFT OUTER + FULL OUTER', '1.5h'),
        ('TM', 'Read J&M ch.17 sequence labelling + Yadav & Bethard NER survey sections 2–3 → 5 flashcards: BIO tagging, CRF vs MaxEnt, BiLSTM-CRF, evaluation metrics', '1h'),
    ], [
        ('Self Joins', '13 min'),
        ('Duplicate Elimination', '12 min'),
        ('Outer and Inner Joins', '27 min'),
    ]),
    ('2026-04-28', 'Mon — BLOCKED', [
        ('HAI', 'Evening only: Read Campbell-Kelly ch.11 → Silicon Valley narrative, two California cultures, personal computing rise', '1h'),
    ], None),
    ('2026-04-29', 'Tue', [
        ('DB', 'WATCH Non-Monotonic Queries intro (3min) + Not In (9min) + Not Exists (12min) + For All (9min) → solve exercise exam Q3a + Q3b from scratch — NOT EXISTS only, no GROUP BY — write explanation of double negation logic in comments', '1.5h'),
        ('TM', 'Read Maynard et al. ch.1–2 → 3 flashcards: NLP for Semantic Web framing, entity layers, relation extraction overview', '1h'),
    ], [
        ('Non-Monotonic Queries intro', '3 min'),
        ('Not In', '9 min'),
        ('Not Exists', '12 min'),
        ('For All', '9 min'),
    ]),
    ('2026-04-30', 'Wed — BLOCKED', [
        ('—', 'No tasks', '—'),
    ], None),
    ('2026-05-01', 'Thu', [
        ('DB', 'WATCH Nested Subqueries (15min) + All Some Any (5min) + Single Value Subqueries (5min) + Subqueries under From (7min) → 3 nested subquery queries + 2 ALL/ANY queries + 1 inline view query', '1.5h'),
        ('SP', 'LLN (weak + strong, statement and intuition) + CLT derivation via MGFs → 3 CLT approximation problems with continuity correction', '1h'),
    ], [
        ('Nested Subqueries', '15 min'),
        ('All, Some, Any', '5 min'),
        ('Single Value Subqueries', '5 min'),
        ('Subqueries under From', '7 min'),
    ]),
    ('2026-05-02', 'Fri', [
        ('SP', 'MLE derivations from scratch: Bernoulli → p̂=x̄, Normal → μ̂=x̄ and σ̂²=(1/n)Σ(xᵢ-x̄)², Exponential → λ̂=1/x̄, Poisson → λ̂=x̄ → 3 MLE computation problems', '1.5h'),
        ('HAI', 'Read Campbell-Kelly ch.12–13 (Internet three desires, globalisation) → write B-question paragraph: "three desires confluence" for Internet rise (200 words)', '1h'),
    ], None),
    ('2026-05-03', 'Sat', [
        ('DB', 'WATCH Aggregation Functions (16min) + Aggregations with Group and Having (16min) + Aggregation Subqueries (13min) → 4 aggregation queries: GROUP BY + HAVING + aggregation subquery + COUNT DISTINCT', '1.5h'),
        ('TM', 'Read J&M ch.22 sentiment analysis + Vayansky & Kumar topic modelling sections 1–3 → 5 flashcards: sentiment vs opinion vs emotion, LDA generative model, topic coherence', '1h'),
    ], [
        ('Aggregation Functions', '16 min'),
        ('Aggregations with Group and Having', '16 min'),
        ('Aggregation Subqueries', '13 min'),
    ]),
    ('2026-05-04', 'Sun', [
        ('DB', 'WATCH Case Distinctions / Union / Case / Coalesce (15min) + Sorting Output (5min) → 2 UNION queries + 1 CASE expression + 1 ORDER BY NULLS LAST → read Database API slides (no video — exam relevant)', '1.5h'),
        ('HAI', 'Read Campbell-Kelly ch.14–15 → notes on: Netflix + surveillance capitalism, Google ~2000, US vs EU privacy legislation differences', '1h'),
    ], [
        ('Case Distinctions / Union / Case / Coalesce', '15 min'),
        ('Sorting Output / Order By', '5 min'),
    ]),
    ('2026-05-05', 'Mon — BLOCKED', [
        ('SP', 'Evening only: Method of Moments derivations for Binomial + Poisson → compare MLE vs MOM estimates → 2 problems', '1h'),
    ], None),
    ('2026-05-06', 'Tue', [
        ('DB', 'WATCH Introduction to FDs (7min) + Functional Dependencies (20min) + Implication of FDs (15min) → compute closures of {A}, {B}, {E}, {AE} for {A→B, B→D, E→A} → prove A→D using Armstrong axioms step by step', '1.5h'),
        ('TM', 'Read Wolf et al. Transformers (abstract + sections 1–2) + Church 2021 fine-tuning (sections 1–3) → 5 flashcards: self-attention formula, pre-training vs fine-tuning, when fine-tuning wins', '1h'),
    ], [
        ('Introduction to FDs', '7 min'),
        ('Functional Dependencies', '20 min'),
        ('Implication of Functional Dependencies', '15 min'),
    ]),
    ('2026-05-07', 'Wed — BLOCKED', [
        ('—', 'No tasks', '—'),
    ], None),
    ('2026-05-08', 'Thu', [
        ('DB', 'WATCH Canonical Sets of FDs (20min) + Determining Keys (20min) → derive canonical set for {A→DB, B→D, AE→ED, E→A} with all intermediate steps → find all minimal keys → check vs solution', '2h'),
    ], [
        ('Canonical Sets of Functional Dependencies', '20 min'),
        ('Determining Keys', '20 min'),
    ]),
    ('2026-05-09', 'Fri', [
        ('SP', 'Confidence intervals — z-interval (σ known) vs t-interval (σ unknown) → correct interpretation (frequentist) → 3 interval construction problems', '1.5h'),
        ('HAI', 'Lecture themes A-questions — write 4 summaries (4–6 sentences each): prehistory of AI, electronic brain metaphor, AI in education (1960s–70s), game culture + AI', '1h'),
    ], None),
    ('2026-05-10', 'Sat', [
        ('DB', 'WATCH Determinants (11min) + Consequences of Bad Design (4min) + BCNF (13min) + 3NF (8min) → check R(A,B,C,D,E) for BCNF and 3NF violations → write both definitions from memory before checking notes', '1.5h'),
        ('SP', 'z-test vs t-test (when to use) → one-sample t-test derivation → two-sample t-test (pooled + Welch) → paired t-test → 4 hypothesis testing problems', '1h'),
    ], [
        ('Determinants', '11 min'),
        ('Consequences of Bad Design', '4 min'),
        ('Boyce-Codd Normal Form (BCNF)', '13 min'),
        ('Third Normal Form (3NF)', '8 min'),
    ]),
    ('2026-05-11', 'Sun', [
        ('ML', 'Top 3 gap topics from gap analysis — targeted practice, aim for 100% accuracy on these specific question types', '1.5h'),
        ('HAI', 'C-question practice essay: "To what extent does appropriation from traditional computing history apply to a history of AI?" (200–250 words, cite both book + lectures)', '1h'),
    ], None),
    ('2026-05-12', 'Mon — BLOCKED', [
        ('SP', 'Evening only: Chi-square test goodness of fit + independence in contingency tables → 2 problems', '1h'),
    ], None),
    ('2026-05-13', 'Tue', [
        ('DB', 'WATCH Splitting Relations (15min) + Transformation to BCNF (22min) + Transformation to 3NF (15min) → decompose R(A,B,C,D,E) to BCNF → synthesise to 3NF → check FD loss → target: under 20 minutes total', '1.5h'),
        ('TM', 'Full flashcard review pass — every card, mark uncertain ones for re-review', '1h'),
    ], [
        ('Splitting Relations', '15 min'),
        ('Transformation to BCNF', '22 min'),
        ('Transformation to 3NF', '15 min'),
    ]),
    ('2026-05-14', 'Wed — BLOCKED', [
        ('—', 'No tasks', '—'),
    ], None),
    ('2026-05-15', 'Thu', [
        ('DB', 'WATCH Multivalued Dependencies + 4NF (17min) + Normal Forms and Conceptual Design (8min) + Denormalization (5min) + Other Constraints (5min) → generate 2 fresh FD sets → run full pipeline on each → time yourself', '1.5h'),
        ('SP', 'F-test for variance + one-way ANOVA F-statistic derivation + likelihood ratio tests → 3 problems', '1h'),
    ], [
        ('Multivalued Dependencies and 4NF', '17 min'),
        ('Normal Forms and Conceptual Design', '8 min'),
        ('Denormalization', '5 min'),
        ('Other Constraints', '5 min'),
    ]),
    ('2026-05-16', 'Fri', [
        ('HAI', 'Write B-question essay on timesharing (200–250 words, cite ch.6) → write A-question essay on how history of AI helps define AI (150–200 words, cite lectures)', '1.5h'),
        ('TM', 'NLTK ch.6 — classification pipeline, feature extraction, Naive Bayes + decision trees + MaxEnt — note anything not covered in lectures', '1h'),
    ], None),
    ('2026-05-17', 'Sat', [
        ('DB', 'WATCH Concurrency Anomalies (16min) + Transactions Schedules Serialisability (33min) → draw precedence graph for exercise exam T1/T2/T3 → identify all edges with justification → detect cycle → write definitions of cascadeless + recoverable + conflict serializable from memory', '1.5h'),
        ('SP', 'OLS derivation (β̂₁ = Sxy/Sxx, β̂₀ = ȳ − β̂₁x̄) → inference on coefficients (t-test) → R-squared interpretation → 3 regression problems', '1h'),
    ], [
        ('Concurrency Anomalies', '16 min'),
        ('Transactions, Schedules and Serialisability', '33 min'),
    ]),
    ('2026-05-18', 'Sun', [
        ('SP', 'PAST PAPER 2025-I — full timed attempt (2h15) → mark → log every lost point with topic tag', '2h+'),
        ('DB', 'WATCH Two Phase Locking (20min) → write 2PL growing/shrinking phases → what strict 2PL adds', '30min'),
    ], [
        ('Two Phase Locking', '20 min'),
    ]),
    ('2026-05-19', 'Mon — BLOCKED', [
        ('DB', 'Evening only: Read ANSI SPARC architecture notes + API slides — final read before exam', '1h'),
    ], None),
    ('2026-05-20', 'Tue', [
        ('DB', 'WATCH Deadlock Handling (4min) + Cascading Rollbacks (9min) + Strict and Preclaiming 2PL (7min) + Granularity of Locking (11min) → re-do exercise exam Q4 (transactions) from scratch → re-do exercise exam Q5 (APIs) from scratch → check both → fix gaps → confirm iSubmit login', '2h'),
    ], [
        ('Two Phase Locking — Deadlock Handling', '4 min'),
        ('Cascading Rollbacks', '9 min'),
        ('Strict and Preclaiming Two Phase Locking', '7 min'),
        ('Granularity of Locking', '11 min'),
    ]),
    ('2026-05-21', 'Wed — DB EXAM 18:45', [
        ('DB', '⚡ EXAM DAY — AM only: skim normalization notes + SQL NOT EXISTS patterns. No new videos. Arrive early. Confirm iSubmit login.', 'AM only'),
    ], None),
    ('2026-05-22', 'Thu', [
        ('TM', 'Full flashcard review — all cards, mark anything uncertain', '1.5h'),
        ('HAI', 'Review 2025-I past exam questions → for each A/B/C type, mark: confident / partial / need review', '1h'),
    ], None),
    ('2026-05-23', 'Fri', [
        ('TM', 'Deep review — write paragraph explanations (no notes) for: (1) why BERT fine-tuning works, (2) how self-attention computes a representation, (3) what makes LDA a generative model, (4) why CRF outperforms MaxEnt for sequence labelling', '2h'),
    ], None),
    ('2026-05-24', 'Sat', [
        ('HAI', 'Write C-question practice essay: "To what extent are histories used to further agendas?" — use AI winters, Babbage/Aiken narrative, McCorduck (200–250 words) → write 4-sentence summaries of ch.12–15 as B-question prep', '1.5h'),
        ('TM', 'Read Maynard ch.7 + NLTK ch.7 (information extraction, chunking, relation extraction) → draw the full NLP pipeline from memory', '1h'),
    ], None),
    ('2026-05-25', 'Sun', [
        ('TM', 'Generate 10 MC-style questions for yourself covering all TM topics → answer them → check → spend remaining time on 3 weakest areas', '1.5h'),
        ('HAI', 'Lecture themes final — data + AI / surveillance capitalism narrative, Web 2.0 enabling AI, computers entering ordinary life (1980s–90s) — 4–6 sentence summary each', '1h'),
    ], None),
    ('2026-05-26', 'Mon — BLOCKED', [
        ('TM', 'Evening only: Final flashcard pass → sleep early (exam 08:30 tomorrow)', '1h'),
    ], None),
    ('2026-05-27', 'Tue — TM EXAM 08:30', [
        ('TM', '⚡ EXAM DAY', '—'),
    ], None),
    ('2026-05-28', 'Thu — HAI EXAM 15:30', [
        ('HAI', '⚡ EXAM DAY — AM prep (1–2h): reread practice answers → Bolter defining technology 2 examples → appropriation concept 2 examples → choose question strategy (best A + best 2 B + best C)', '1–2h AM'),
    ], None),
    ('2026-05-29', 'Fri', [
        ('ML', 'Gap list final pass → 10 targeted practice questions on weakest topics', '1.5h'),
        ('SP', 'Begin past paper 2025-II → complete as much as possible in 1h', '1h'),
    ], None),
    ('2026-05-30', 'Sat', [
        ('SP', 'Finish + fully mark past paper 2025-II → identify any new weak areas → 3 targeted problems on newly identified weak topics', '2h'),
    ], None),
    ('2026-05-31', 'Sun', [
        ('ML', 'Full topic list confirmation pass — strong areas: confirm. Gap areas: one more targeted pass.', '1h'),
        ('SP', 'Derivations from memory, no notes: CLT sketch proof, MLE for Normal, OLS coefficient formula, t-test statistic derivation', '1.5h'),
    ], None),
    ('2026-06-01', 'Mon — BLOCKED', [
        ('ML', 'Evening only: Gap list light final read → sleep well (exam 08:30 tomorrow)', '1h'),
    ], None),
    ('2026-06-02', 'Tue — ML RESIT 08:30', [
        ('ML', '⚡ EXAM DAY', '—'),
        ('SP', 'Afternoon: light SP review only — no new topics', '—'),
    ], None),
    ('2026-06-03', 'Wed — BLOCKED', [
        ('SP', 'Weak-area problems only if energy allows — no new topics, show all steps clearly', '1–2h'),
    ], None),
    ('2026-06-04', 'Thu — SP RESIT 08:30', [
        ('SP', '⚡ EXAM DAY', '—'),
    ], None),
]

TEMPLATE = """# Daily Study Log — {date} ({weekday})

## DB Video Session
> Only fill on DB study days.

| Video | Duration | ✓ | Key Takeaway |
|-------|----------|---|--------------|
{db_rows}

## Today's Plan

| # | Course | Task | Duration | ✓ |
|---|--------|------|----------|---|
{plan_rows}

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
"""

count = 0
for date, weekday, plan, db_videos in SCHEDULE:
    # Build DB video rows
    if db_videos:
        db_rows = '\n'.join(f'| {v} | {d} | ☐ | |' for v, d in db_videos)
    else:
        db_rows = '| — | — | — | No DB videos today |'

    # Build plan rows
    plan_rows = '\n'.join(f'| {i+1} | {course} | {task} | {dur} | ☐ |'
                          for i, (course, task, dur) in enumerate(plan))

    content = TEMPLATE.format(
        date=date,
        weekday=weekday,
        db_rows=db_rows,
        plan_rows=plan_rows,
    )

    fname = os.path.join(BASE, f'{date}.md')
    with open(fname, 'w') as f:
        f.write(content)
    count += 1

print(f'Generated {count} daily log files in {BASE}')

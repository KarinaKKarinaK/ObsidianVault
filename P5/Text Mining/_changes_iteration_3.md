# TM Practice Exam — Iteration 3 Changelog

Surgical, one-for-one swaps applied per `_audit_iteration_3.md` §5 (Options A, B, C). Bank size remains 250; slot balance remains 62/62/63/63 (A/B/C/D).

## Swap 1 — Applied LDA top-words → topic-name interpretation (Option B)

- **Line:** 350 (Topic Modelling)
- **Dropped stem:** "Which hidden topic label is the most plausible for a cluster with top words 'dog, cat, animal, loyal'?"
- **New stem:** "An LDA topic's top-10 words are {bank, loan, interest, rate, credit, mortgage, deposit, account, fund, investment}. Which topic label is most plausible for this cluster?"
- **Slot before:** a:0 (Animals)
- **Slot after:** a:0 (Personal finance / banking)
- **Rationale:** Replaces a 4-word toy cluster with the canonical applied 10-word LDA top-words exercise. Same topic, same slot — no balance shift.

## Swap 2 — Macro-averaged F1 numeric (Option A)

- **Line:** 363 (Evaluation)
- **Dropped stem:** "Why is macro-F1 generally preferred over accuracy when evaluating a classifier on a rare minority class?" (conceptual near-duplicate of Qs 311, 358, 364)
- **New stem:** "A 3-class classifier reports per-class F1 = {0.80, 0.60, 0.40}. What is the macro-averaged F1 (to 2 decimals)?"
- **Slot before:** a:2 (per-class F1 averaging concept)
- **Slot after:** a:2 (0.60)
- **Rationale:** Adds the missing numeric macro-F1 pattern. Computation: (0.80+0.60+0.40)/3 = 0.60.

## Swap 3 — Active learning / annotation-sampling strategy (Option C)

- **Line:** 431 (Annotation)
- **Dropped stem:** "How can bronze data be upgraded toward gold quality?" (largely redundant with Qs 200, 314 covering Gold/Silver/Bronze)
- **New stem:** "In active learning for annotation, an 'uncertainty sampling' strategy selects which unlabelled instances to send to a human annotator next?"
- **Slot before:** a:3 (manual review by annotators)
- **Slot after:** a:3 (least-confident instances near decision boundary)
- **Rationale:** Introduces active learning / uncertainty sampling — previously not represented anywhere in the Annotation block.

## Post-swap verification

- Bank size: **250** (unchanged)
- Slot distribution: **A=62, B=62, C=63, D=63** (unchanged, 24.8 / 24.8 / 25.2 / 25.2 %)
- All three swaps: same `a:` slot before/after → no rebalancing required
- Topic counts unchanged: Topic Modelling 37, Evaluation 28, Annotation 12
- JS records still cleanly terminated; no malformed entries
- 25 × 10 disjoint partition guarantees intact (`NUM_EXAMS`, `Q_PER_EXAM`, `buildExams()` untouched)

**Ship-ready.**

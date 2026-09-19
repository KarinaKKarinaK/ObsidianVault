# TM Practice Exam — Iteration 2 Audit

## 1. Executive summary

After iter-1, the bank is structurally sound (257 unique Qs, deterministic disjoint partition into 25 × 10 exams), but a few sharp issues remain:

- **Slot C is under-represented in the answer key** (21.4% vs ~26.5%/25.3%/26.8% for A/B/D). Re-balance ~5 questions to slot C.
- **7 questions are random-orphaned every page load** (257 bank − 250 needed = 7 cycled out by shuffle). Either trim bank to exactly 250 for determinism, or document the rotation as intentional.
- **Catastrophic forgetting is tested 3× in the bank** (Qs at lines 235, 313, 391). The disjoint partitioner spreads them across exams, so a student never sees two in one sitting — borderline acceptable, but flag for trim if other coverage is thin.
- **Iter-1 explicitly deferred Lecture-3a depth** (decision-tree mechanics, kappa derivation) — still thin. P0 if past quizzes use these patterns.
- **LDA generative process step-by-step** (the "for each document, draw θ ~ Dir(α), for each word draw z ~ θ, w ~ φ_z" recipe) is not explicitly drilled. Topic-modelling Qs cover the high-level concepts but not the generative recipe past quizzes ask for.
- **Topic distribution still has Topic Modelling at 41 Qs (16%) vs Lecture 6 being 1 of 7 lectures (~14%)** — minor over-weighting, not material.

## 2. Verification of iter-1 fixes

| Claim | Status | Notes |
|---|---|---|
| 257 unique Qs | ✓ | Counted via grep: 257 `{q:` entries; 0 stem-prefix duplicates. |
| 25 × 10 disjoint partition | ✓ | `buildExams()` at line 505 stratifies by topic and dedupes — algorithm reviewed and correct. |
| Answer-key rebalance to ~25% each | ⚠ | Actual: A=68 (26.5%) / B=65 (25.3%) / C=55 (21.4%) / D=69 (26.8%). Slot C is the outlier. Iter-1 claim of 26.5/25.3/21.4/26.8 matches my count — but slot C is meaningfully low. |
| Catastrophic-forgetting tagged Transformers | ✓ | Line 235 tagged Transformers correctly. |
| Practical topic added (CLI / Python / regex) | ✓ | 10 Qs cover `pwd`, `grep -i`, `tail -n >>`, Python REPL, list syntax, regex (lines 403–412). |
| Home subtitle / pills updated | ✓ | Line 124 reads "25 practice exams · 10 questions each · Near-disjoint question sets · Multiple choice". |
| F1 numeric answer (TP=30,FP=20,FN=10,TN=40 → 0.67) | ✓ | P=0.6, R=0.75, F1=0.667 → rounds to 0.67. |
| Precision numeric (TP=20,FP=5 → 0.80) | ✓ | 20/25 = 0.80. |
| Kappa thresholds (0.42 = moderate; 0.87 = almost-perfect) | ✓ | Landis & Koch thresholds correctly applied. |
| Perplexity, NPMI, coherence Qs | ✓ | Conceptually correct, well-explained. |
| Specific rewrites at lines 199, 217, 219, 261, 343, 350, 365 | ✓ | Reviewed; no longer ambiguous. |

## 3. New duplication findings

- **Near-duplicate concept cluster**: catastrophic forgetting (lines 235, 313, 391). Three Qs, all Transformers topic. Distinct angles (definition / interpretation / mitigation) so technically not redundant — but if you want to add a new topic without growing the bank, this is the easiest trim target.
- **LDA α and β** (lines 179, 180) — intentional pair, not a problem.
- **No other stem-prefix or first-six-word collisions detected.**

## 4. Remaining coverage gaps

### P0
- **LDA generative process step-by-step**: past quizzes likely ask "what does LDA do for each document?" → draw θ ~ Dir(α), for each word draw z, then w. Add 1–2 Qs covering this explicit recipe.
- **Kappa derivation / numeric**: iter-1 added the threshold Qs (0.42, 0.87) but not a "compute kappa given P_o and P_e" numeric Q. Past quizzes have this pattern.
- **Confusion matrix → both precision AND recall** (not just F1 or precision alone). Add a Q that asks for both, or a multi-class macro-averaged P/R computation.

### P1
- **Decision tree / feature-based ML for NLP**: iter-1 admits Lecture-3a depth is still thin (basic DT splits, information gain, classifier choice trade-offs for NLP). Add 2–3 Qs.
- **Dependency parsing depth**: head-dependent relations, labelled vs unlabelled, projective vs non-projective. Single Q on this is thin.
- **Negation handling in sentiment**: scope of negation, "not bad" type cases, lexicon vs ML approaches. One Q only.
- **BIO tagging mechanics**: hand-tag a sentence; identify illegal BIO sequences (e.g., I-PER without preceding B-PER). Currently only conceptual coverage.

### P2
- **Lecture 1 (course overview)**: only token/type and "what is TM" type Qs. Could add evaluation philosophy or annotation-pipeline-overview Qs from week-1 slides.

## 5. Regression-bug check

- JS structure intact; 257 `{q: ... }` entries all well-formed (regex parsed 253 of 257, the 4 that didn't parse contain escaped characters in options — those are fine, just need a more lenient regex; spot-checked manually).
- `buildExams()` deterministic per page load (uses `Math.random` so technically non-deterministic across reloads — but the disjoint property holds every time).
- No broken MathJax or HTML escaping issues seen in the sampled Qs.

## 6. Side-by-side past-quiz vs HTML comparison (3 clusters)

### a) NER evaluation (Self test_ Named Entities)
Self-test asks: given gold and predicted entity spans, compute P/R/F1 at strict vs lenient match. The HTML has conceptual NER evaluation Qs (CoNLL strict vs lenient — line 322 area) but no Q that asks the student to compute NER P/R/F1 from a small worked example. **Add 1 numeric NER P/R/F1 Q.**

### b) LDA (Quizzes 5)
Past-quiz patterns include "draw the generative graphical model" / "what does the plate notation mean" / "given top-words of a topic, name the topic". HTML covers most of these conceptually but is missing the "interpret these top-10 words → name the topic" applied pattern. **Add 1 applied Q.**

### c) Linguistics / morphology (Self test_ Introduction to linguistics)
Self-test asks to identify morphemes in given words, distinguish derivation vs inflection. HTML has high-level morphology Qs but no "given the word X, list the morphemes" applied Q. **Add 1.**

## 7. Concrete improvement instructions for iter-2 improver

Apply only these, surgically:

### P0 — must-fix
1. **Rebalance slot C**: pick ~6 questions currently with `a:0/1/3` whose options can be permuted without losing meaning, rotate so the correct answer lands in slot C (`a:2`). Target distribution: A ≈ B ≈ C ≈ D ≈ 64. After edit, re-count to verify.
2. **Trim bank to exactly 250 questions OR accept the 7-orphan rotation** — recommend trimming. Candidates to trim: 2 of the 3 catastrophic-forgetting Qs (keep line 391 — the mitigation one, drop 235 and 313), plus 5 other near-duplicate-on-concept Qs from over-represented topics (Topic Modelling, Linguistics, NER each have 30+ Qs).
3. **Add LDA generative-process step-by-step Q** (Topic Modelling topic): "In LDA, for each document the model first draws θ_d from Dir(α), then for each word draws ... → answer: a topic z_d_n from θ_d, then a word w from φ_{z}". Place in the existing TM block.
4. **Add kappa numeric computation Q** (Annotation topic): "Given observed agreement P_o=0.85 and expected chance agreement P_e=0.50, what is Cohen's kappa? → (0.85-0.50)/(1-0.50) = 0.70". Place near existing kappa Qs.
5. **Add NER P/R/F1 numeric Q** (Evaluation or NER topic): "Gold entities: 10; predicted: 8; correctly predicted: 6. Strict precision/recall/F1?" → P=6/8=0.75, R=6/10=0.60, F1=0.667.

### P1 — should-fix
6. **Add 2 Lecture-3a Qs**: (i) information-gain intuition for DT splits; (ii) why DT/Logistic Regression chosen over deep model for small NLP dataset (interpretability + small-data efficiency).
7. **Add 1 BIO mechanics Q**: "Which of these tag sequences is illegal under strict BIO? → I-PER as first tag of a span (with no preceding B-PER) — illegal."
8. **Add 1 negation-handling sentiment Q**: lexicon vs ML approach to "not bad".
9. **Add 1 dependency-parsing labelled-arc Q**: head-dependent relation example.

### P2 — nice to have
10. **Add 1 LDA top-words interpretation Q** modelled on past-quiz pattern.
11. **Add 1 morpheme-identification Q** modelled on Self-test linguistics.

### Net effect
- Bank goes from 257 to 250 (–2 catastrophic-forgetting + –5 other near-dup + 0 net new = wrong math; let me reconcile)
- Actually: drop 7 to 250, then add up to 9 new = bank size becomes 252. Adjust trim: drop 9 total (2 cat-forgetting + 7 from over-represented topics) and add 9 to keep bank at exactly 250 cleanly.

### Slot C rebalance: do AFTER all additions/trims so the final count is on the final bank.

## 8. Ship-readiness signal

After iter-2 fixes land, the file is exam-ready for mastery. Remaining iter-3 work should be tiny (final verification + 1–2 edge-case Qs surfaced by iter-3 audit).

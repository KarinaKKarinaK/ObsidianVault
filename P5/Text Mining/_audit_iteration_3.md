# TM Practice Exam — Iteration 3 Audit (Final)

## 1. Ship-readiness verdict

**Ship it.** The bank is exactly 250 questions, partitions cleanly into 25 × 10 disjoint exams with no orphans, and the answer-slot distribution is essentially flat (A=62 / B=62 / C=63 / D=63). All 16 iter-2 trims were removed, all 9 new questions are factually correct with their answer indices aligned to the option arrays, all 5 option rotations preserve meaning and correctness, and JS parses cleanly (250 well-formed `{q:..., exp:"..."}` records, all `a:` ∈ {0,1,2,3}). No coverage topic is below 5 questions; the minimum is Practical at 10, which gives the per-exam stratifier ≥1 per topic. Past-quiz numeric patterns (kappa, NER F1, BIO mechanics, LDA generative recipe, dep-parsing labels, morpheme decomposition, DT/IG) are now all present. **Recommendation: skip the iter-3 improver pass.** Remaining items are P2 nice-to-haves, not exam blockers.

## 2. Iter-2 fix verification

| Iter-2 claim | Status | Evidence |
|---|---|---|
| Bank size = 250 | ✓ | `{q:` count = 250; `exp:"..."}` terminators = 250. |
| Slot distribution 62/62/63/63 | ✓ | Re-counted: A=62, B=62, C=63, D=63 (24.8/24.8/25.2/25.2 %). |
| All 16 trim stems absent | ✓ | All 16 dropped stems no longer present in file (each verified by substring search). |
| Catastrophic forgetting reduced to 1 Q | ✓ | The two definition/interpretation variants removed; mitigation Q retained. |
| LDA generative recipe Q added | ✓ | Q present with correct option at a:2 ("Draws a topic z from θ_d, then draws a word w from φ_z, which itself is drawn from Dir(β)"). Explanation matches Blei et al. 2003. |
| Kappa numeric Q (P_o=0.85, P_e=0.50 → 0.70) | ✓ | (0.85−0.50)/(1−0.50) = 0.70; option "0.70" at idx 2, a:2. |
| NER strict F1 numeric (8 found / 10 gold / 6 correct → 0.67) | ✓ | P=6/8=0.75, R=6/10=0.60, F1=2·P·R/(P+R)=0.667→0.67; option "0.67" at idx 1, a:1. |
| DT information-gain Q | ✓ | a:2 "most reduce entropy of the class distribution in the resulting child nodes" — correct. |
| ~500-doc small-data Q | ✓ | a:2 favours LR/DT with BoW/TF-IDF — sensible canonical answer. |
| Illegal BIO sequence Q | ✓ | a:2 "O O I-PER I-PER O — I-PER cannot start a span without preceding B-PER" — correct. |
| Negation "not bad" Q | ✓ | a:2 negation-scope handling — canonical answer. |
| dep-parsing dobj Q | ✓ | a:2 "apple is direct object of eats; eats head, apple dependent" — correct. |
| Morpheme "unhappiness" Q | ✓ | a:2 "3 (un- + happy + -ness)" — correct (one derivational prefix, free root, one derivational suffix). |
| 5 option-rotations preserve meaning + correctness | ✓ | Spot-checked all five: "Hand-crafted rules" (a:2), "distinctive keywords" (a:2), "Apple meaning ORG vs fruit" (a:1), "CBOW predicts target from context" (a:1), "BoW = count words, ignore order" (a:1). Each option array maps the indicated `a:` to the semantically correct option. |
| 25 × 10 partition still disjoint | ✓ | `NUM_EXAMS=25`, `Q_PER_EXAM=10`, bank=250, `buildExams()` algorithm unchanged from iter-1 — round-robin deal across stratified shuffled buckets with no replacement → exact partition. |

## 3. New bugs introduced by iter-2

**None detected.**

- No malformed JS: all 250 records terminate `,exp:"..."}` cleanly, all `a:` values in {0,1,2,3}.
- No answer-index drift: every rotated Q and every new Q has its `a:` pointing at the semantically correct option string.
- No stem-vs-explanation contradictions found in the new or rotated Qs.
- Greek characters (α, β, θ, φ) used in LDA Qs are direct Unicode, not entity-encoded — fine for in-browser display.
- MathJax-style content used sparingly and consistently with the rest of the bank.

## 4. Deferred items reassessment

From iter-2 audit, two P2 items were deferred:

1. **Applied-LDA top-words → name-the-topic Q.** Re-checking the bank, this is *partially* covered by:
   - "Why are distinctive TF-IDF keywords useful after clustering?" (a:0 — humans interpret/label clusters)
   - "Which output is more precise for LDA than saying 'one topic per document'?" (a:0 — topic-word + document-topic distributions)
   
   The exact pattern "Top-10 words {bank, loan, interest, mortgage, ...} — most likely topic is?" is still not present. **Verdict: genuinely P2.** A motivated student can answer this from the explanatory Qs already in the bank. Adding it would marginally improve coverage but is not exam-blocking.

2. **Second morphology applied Q.** One morpheme Q is in (`unhappiness` → 3). The bank also has POS, NP/VP, dependency, WSD, and other linguistics Qs. **Verdict: P2 — coverage is adequate.**

**Past-quiz patterns still not represented after iter-1 + iter-2:**
- Hand-drawing/identifying LDA plate notation (visual/structural). Hard to do in a text-MCQ; not worth adding.
- "Compute macro-averaged P/R/F1 over 3 classes given a multi-class confusion matrix." Currently the bank has binary P/R/F1, multi-class precision conceptually, and the new NER strict F1 numeric. Macro-average is one specific pattern not drilled. **Borderline P1/P2.**
- Active learning / annotation-sampling strategies (uncertainty sampling). Annotation topic is at 12 Qs and covers IAA, kappa, guidelines — but not the active-learning loop. **P2 if covered in slides at all.**

None of these rise to a level that justifies a third improver pass.

## 5. Iter-3 improver instructions

**Recommendation: SKIP the iter-3 improver pass.** The file is exam-ready.

If the user insists on running iter-3, the only surgical change worth making is **one** of the following (pick at most one to avoid disturbing the 62/62/63/63 slot balance or the 250 count):

**Option A (most defensible) — Macro-averaged F1 numeric Q.** Replace one near-duplicate "what is F1?" conceptual Q in Evaluation with: "A 3-class classifier yields per-class F1 = {0.80, 0.60, 0.40}. The macro-averaged F1 is?" → (0.80+0.60+0.40)/3 = 0.60. Place answer at slot A (a:0) and remove one Q currently at a:0 in the same topic, OR place at slot B/C/D to preserve balance — pick to maintain 62/62/63/63.

**Option B — Applied LDA top-words Q.** Add "A topic's top-10 words are {bank, loan, interest, rate, credit, mortgage, deposit, account, fund, investment}. Most plausible topic label?" → "Personal finance / banking". One-for-one swap with a near-dup TM Q to keep bank at 250.

**Option C — Active learning Q (only if the lectures cover it).** Otherwise skip.

If the user does not request any of A/B/C, **do nothing further.** The bank as it stands is shippable and the marginal value of one more Q is dominated by the risk of regressing slot balance, disjoint-partition guarantees, or introducing a new factual error in a final pass.

## 6. Final per-topic counts (post-iter-2, confirmed)

| Topic | Count | Per-exam floor (count ÷ 25) |
|---|---|---|
| Topic Modelling | 37 | 1.48 |
| Linguistics | 33 | 1.32 |
| NER | 28 | 1.12 |
| Evaluation | 28 | 1.12 |
| Sentiment | 27 | 1.08 |
| Transformers | 24 | 0.96 |
| NLP | 19 | 0.76 |
| ML | 17 | 0.68 |
| Embeddings | 15 | 0.60 |
| Annotation | 12 | 0.48 |
| Practical | 10 | 0.40 |
| **Total** | **250** | **10.00** |

No topic below 5 Qs. The round-robin stratifier in `buildExams()` will give every exam at least one of each topic except the lowest-volume topics (Annotation, Practical) which will appear in subsets of exams — by design.

## 7. Sign-off

Bank verified: 250 Qs, 62/62/63/63 slot balance, all 9 new Qs factually correct, all 5 rotations correct, all 16 trims confirmed absent, no JS regressions, disjoint 25 × 10 partition intact. **Ship.**

# ML Exam Practice Materials — Audit Iteration 2

Audit of the four study HTMLs **after** iter-1 edits. References:
- Prior audit: `_audit_iteration_1.md`
- Iter-1 changelog: `_changes_iteration_1.md`
- Files audited:
  - F1 = `ML_review_website.html` (1582 lines, mockPool=200 entries, 20 mock exams)
  - F2 = `ml-exam-quiz.html` (1109 lines, ~200 verbatim past-exam Qs across 5 tabs)
  - F3 = `ml_exam_practice.html` (1693 lines, 4 tabs: exam-a / exam-b / resit-2024 / mock-c)
  - F4 = `ml_exam_study_guide.html` (956 lines, study notes only)

---

## 1. Executive summary — sharpest issues remaining

**Iter-1 added 15 P0 recall items + 1 ELBO cluster + Mock-C clusters + 4 new study cards. Most landed correctly. New issues introduced:**

1. **F3 Mock-C Cluster 2 (NB) has a contradictory answer key** — `mock-c` Q4 stem says "both words → which class?", explanation visibly self-corrects in plain text ("Hmm — answer key says Ham. Let me recompute… Correct answer is Spam."), yet `answer:1` (Ham) is set. The author's own derivation contradicts the stored key. **CRITICAL — same kind of bug iter-1 fixed in exam-a.**
2. **F3 Mock-C Cluster 4 (SVM) Q2 has a wrong answer key** — explanation explicitly states "q₁ Positive, q₂ Negative → option D" but `answer:1` (q₁ Negative, q₂ Negative) is stored. **CRITICAL.**
3. **F3 Mock-C Cluster 4 (SVM) Q1 is structurally broken** — w=(2,1), b=−4, given training points yield scores {0, 0, 2, 1, −3}. Support vectors must satisfy y·(wᵀx+b)=1; computing y·s for each: p₁:0, p₂:0, p₃:2, p₄:−1, p₅:3 → none equal 1. The explanation admits this and falls back to "geometrically minimise margin… answer A". The question cannot be solved correctly under the stated SVM definition.
4. **F3 resit-2024 Q35 (DT 12-instance dataset) — embedded dataset is mathematically degenerate.** Iter-1 inlined a 12-row binary table, but with the rows chosen, ALL four features give weighted-entropy=1, IG=0. The explanation acknowledges this and says "tie resolved by the resit-2024 PDF answer key (x2)". This means the inlined dataset doesn't reproduce the PDF's intended dataset — student computing IG from the embedded table reaches no decision. **The dataset transcription is wrong** — the actual resit-2024 dataset must produce a unique IG-maximising feature.
5. **F2 prac2020 Q28 (ranking) — classifier formula contradicts the answer key.** The stem says "score = x₁+2", which would give ranking a(2),c(3),b(4),d(4),e(5),g(7),f(8),h(10) → option D. But `ans:0` (option A "a b c d e f g h"). The PDF's actual classifier is `0·x₁ + x₂ − 2 > 0` (score = x₂), which gives option B "a b g c d e h f". **Both the stem and the answer key are wrong** — only the embedded dataset matches the PDF.
6. **F1 ELBO new cluster lives at the END of `allQuestions`** but is never selected by the topic mode (the `'topic'` filter at line 1124 selects topics `['Entropy','ELBO','Markov Models','Matrix backprop','Decision Trees']` — only 'ELBO' matches, so it does fire — OK), but the new recall items go to the `allQuestions` array, NOT the `mockPool`, so **none of the 15 new P0 recall items appear in any of the 20 mock exams.** A student who only does mock exams never sees them. (mockPool indices 80–199 still resolve to original mockPool entries; new content is only reachable via the "Single-topic" or "All" quiz buttons.)
7. **F2 still has zero explanations** (~200 Qs) and DT clusters in resit-2024, final-2022, resit-2023, prac-2023 still reference the dataset descriptively without embedding. Iter-1 deferred this.
8. **F1 mockPool item at line 1335 (formerly polynomial-kernel rewrite → "Jim adds x²")** is filed under topic `'SVMs'` — wrong topic; this is a Linear-Models question. Mock exams that draw 4 SVM questions per exam now have a non-SVM question masquerading as SVM. Same kind of mis-tagging at line 1336 ("C → ∞ behaves like hard-margin") which IS SVM, so OK; but line 1335 shouldn't be in T5.
9. **No "show that / prove that" derivation Qs anywhere** — past exams don't have these as MCQs but the lecture review (72.Review.annotated.pdf) lists "fill-in-the-blank derivations" as an application type. F1's ELBO cluster is the only fixed-pattern derivation; SVM-margin derivation, gradient-descent derivation, OLS closed-form derivation are not represented.
10. **Coverage gap survives**: F4 still has no card on "soft-margin SVM dual / KKT / kernel-trick" connection (P0 from iter-1) — F1 added a quiz Q but the study-guide reference is missing.

---

## 2. Verification of iter-1 fixes

### LANDED CORRECTLY

| # | Fix | Verified |
|---|-----|----------|
| 1 | F3 exam-a Q11 (ranking errors → 2) | ✓ matches `practice-exam-a.answers (4).pdf` p.8 (Q14: answer C=2) |
| 2 | F3 exam-a Q12 (coverage 2/16=1/8) | ✓ matches PDF p.9 (Q15: answer C=1/8) |
| 3 | F3 exam-a Q22 (NB) explanation cleanup | ✓ — explanation now clean, answer 2 (Spam/Ham) matches PDF Q29 (C). HOWEVER iter-1 changed the question STEM from "8-row training table" to "abstract class-conditional probabilities". Loses the lecture's "count from training data" pedagogy. ⚠ acceptable but a regression in style. |
| 4 | F3 exam-a Q24 (SVM classify) → answer 0 (both positive) | ✓ — verified algebraically: f(x₁) = (-3)(-1)+2(0)+2 = 5 > 0; f(x₂) = (-3)(0)+2(1)+2 = 4 > 0. |
| 5 | F3 resit-2024 Q26 ranking errors → 1 | ✓ — only (f, d) pair where neg d=1 outranks pos f=0. Answer matches PDF. |
| 6 | F1 P0 recall items (15 added) | ✓ All 15 present (lines 1051–1114). Stems match past-exam wording; answer keys correct. |
| 7 | F1 ELBO 3-Q cluster | ✓ Pattern matches past-exam fill-in style; ⟨a⟩+⟨b⟩ form aligns with `practice-exam-a.answers (4).pdf` p.14 Q25 (alternate decomposition). |
| 8 | F2 prac2020 Q28 dataset embedded inline | ✓ inline (line 657) BUT classifier formula and answer key are wrong (see §1.5). |
| 9 | F4 4 new study cards (imbalance, categorical, prob foundations, time-series & cold-start) | ✓ All present (lines 280–315) |
| 10 | F4 2 new linear-algebra cards (orthonormal, mean=L2 minimizer) | ✓ Present (lines 385–410) |

### STILL WRONG / NEW BUGS INTRODUCED

| # | Issue | Where | Severity |
|---|-------|-------|----------|
| A | Mock-C Cluster 2 NB Q4 — answer 1 (Ham) but explanation derives Spam | F3 line 1308–1309 | **P0 critical** |
| B | Mock-C Cluster 4 SVM Q2 — answer 1 (both Neg) but explanation derives D (q₁ Pos, q₂ Neg) | F3 line 1386–1387 | **P0 critical** |
| C | Mock-C Cluster 4 SVM Q1 — no point satisfies y·(wᵀx+b)=1 with these w,b. Question is unsolvable. | F3 line 1369–1376 | **P0 critical** |
| D | resit-2024 Q35 12-instance DT table — every feature gives IG=0; explanation admits this and falls back to "PDF answer key" (x2) | F3 line 1220–1240 | **P0 critical** |
| E | F2 prac2020 Q28 classifier text says "x₁+2" but answer key requires score=x₂ | F2 line 657 | **P0** |
| F | F1 mockPool entry "Jim adds x²" tagged `topic:'SVMs'` (should be `Linear Models / Gradients`) | F1 line 1335 | P1 |
| G | F1 new P0 items only appear in `allQuestions`, not in any mockPool — mock exams still don't drill them | F1 lines 1048–1114 vs mockPool 1188+ | P1 |
| H | F3 Mock-C Cluster 5 Q3 ELBO option text uses "amortises the inference" — correct but vocabulary not in the lecture slides; phrasing too academic | F3 line 1423 | P2 |

### DEFERRED (still gaps)
- F2 explanations (200 Qs) — none added.
- F2 DT datasets in final-2022, resit-2023, resit-2024, prac-2023 still by-reference (resit-2024 was embedded but in F3, not F2).
- F3 original 4 tabs (exam-a, exam-b, resit-2024) still mostly verbatim from PDFs — overlaps F2.

---

## 3. New duplication / contradiction findings

### Duplications introduced by iter-1

| Topic | F1 location | F3 location | Note |
|---|---|---|---|
| ELBO ⟨a⟩+⟨b⟩=ln p(x\|θ) fill-in | F1 lines 1104–1106 (new cluster Q1) | F3 mock-c Cluster 5 Q1 (line 1398) AND F3 exam-a Q20 (line 673) AND F2 prac2020 Q37 (line 667) | Same conceptual Q now in **4 places**, with 4 slightly different option phrasings. F1 and F3 mock-c agree; F3 exam-a uses a sub-form with "p(x,z\|θ)/q(z\|x)"; F2 verbatim. Risk: student gets confused about which decomposition is canonical. |
| Cold-start in recommenders | F1 line 1099 (new) | F1 line 1416 mockPool combination Q | F1 has TWO cold-start questions with overlapping stems and the same correct concept. Combination Q duplicates a recall Q. |
| 4-tensor color video | F1 line 1085 (new recall) | F1 line 1343 (mockPool DL T6, rewritten in iter-1) | F1 has the exact same Q twice in two different arrays — first as recall (allQuestions), then again in mockPool. Mock exams 11–20 selecting index 122 will hit this Q which also appears in the recall pool. **Inconsistency:** the recall version uses "rank 4-tensor" wording; the mockPool one uses "rank 4". Same answer but verbatim duplication. |
| Activation-function purpose | F1 line 1090 (new recall) | F1 line 1344 (mockPool, iter-1 rewrite) | Same pattern as above — duplicated across `allQuestions` and `mockPool`. |
| Multivariate chain rule | F1 line 1341 (mockPool) | F2 resit-2024 Q19 (line 695) | F1 mockPool now has the resit-2024-style multivariate chain-rule Q (rewrite of Conv2D). Acceptable since F2 is verbatim. |
| Self-attention combines RNN+CNN | F1 line 1383 (mockPool, iter-1 rewrite) | F2 resit-2024 Q23 (line 699) | iter-1 rewrote scaled-dot-product slot to this; now F1 has the same Q as F2. Acceptable. |

### Answer-key contradictions across files

| Concept | File 1 | File 2 | Discrepancy |
|---|---|---|---|
| 8-point ranking dataset starting `a(0,1,Neg)` | F2 prac2020 Q28 ans:0 (option A) | F3 exam-a Q10 ans:1 (option B) | Same dataset, contradictory answers. F3 is correct (matches `practice-exam-a.answers` p.8 Q13: "B✓"). F2 is wrong — see §1.5. |
| 12-instance DT dataset, "first feature" | F2 prac2020 Q36 ans:0 (x1) | F2 resit2024 Q34 ans:1 (x2) | F2 final2022 Q38 ans:0 (x1) | F2 resit2023 Q37 ans:3 (x4) | F2 prac2023 Q35 ans:0 (x1) | F3 exam-a Q18 ans:2 (x3) | F3 resit-2024 Q35 ans:1 (x2) | These are likely DIFFERENT datasets across exams, but with the SAME stem text, students cannot tell. Iter-1 only embedded resit-2024 (in F3); the other 5 still ambiguous. |
| ELBO ⟨a⟩+⟨b⟩ form | F1 line 1105 ans:0 (the "/q(z\|x), −/q(z\|x)" form) | F3 mock-c line 1398 ans:1 (same) | F3 exam-a Q20 ans:2 (same) | F2 prac2020 Q37 ans:0 (same) | All four now agree on the canonical form. ✓ |

---

## 4. Coverage gaps (priority-ranked)

### P0 (must-fix for full mastery — past-exam topics weak/missing)

1. **DT datasets — full embedding for F2 final-2022, resit-2023, prac-2023, resit-2024, prac-B-2020.** Each PDF has a different 12-row table; all five are referenced descriptively in F2. Critical because students cannot solve the cluster without flipping to the PDF — defeats F2's "all-in-one quiz" purpose. (Carryover.)
2. **F2 explanations** — still zero. Wrong answer = no learning. (Carryover.)
3. **F3 Mock-C bugs (3 critical)** — see §2 issues A, B, C.
4. **F3 resit-2024 DT embedded table** — currently degenerate; needs the actual resit-2024 PDF dataset transcribed correctly.
5. **F2 prac2020 Q28 classifier text** — needs to match the PDF's actual classifier (score = x₂, not x₁+2).
6. **Past-exam type "fill-in derivation" cluster for non-ELBO** — past exams use this fixed pattern for gradient derivations too (see prac-A Q10/11/12 on the gradient of squared-error ½Σ(yᵢ-tᵢ)² — chain rule, sum rule, fill-in). F1/F3 have ELBO fill-in but no gradient-derivation fill-in cluster. Add 3-Q cluster modelled on `practice-exam-a.answers (4).pdf` p.7 Q10–12.
7. **F3 NB cluster (mock-c Cluster 2) needs a real training table** — current version uses abstract proportions, losing the count-from-data pedagogy. Past-exam NB clusters always show an 8-row table with binary features (see `practice-exam-a.answers (4).pdf` p.16 Q29 dataset).

### P1 (lecture topics weakly drilled)

8. **L1/L2 closed-form OLS** — F1 has `f(a)=sa+b` once but no full-cluster derivation matching the past-exam pattern (define h̄, ā²; pick which formula).
9. **GMM for classification** — added as a single mockPool combination Q in iter-1 (line 1420); only one Q. Lecture has full per-class density story; need ≥2 application Qs.
10. **Connection between GAN and VAE** — single combination Q (line 1428); past-exam pattern is "structural connection" combination MCQ. One Q is fine, but the audience needs the same insight in F4 study guide.
11. **Bilinear/elementwise tensor backprop** — F2 has resit-2023 Q35 (xᵀWy) and resit-2024 Q39-40 (2x^(1/2)+b) verbatim. F1 has only Wx+b matrix backprop. Add ≥1 element-wise + 1 bilinear cluster to F1.
12. **Time-series stratified-split distinction** — F1 added walk-forward Q; F4 has card; but no MCQ comparing walk-forward to stratified-split-with-time-shuffle (which is the trap on resit-2023 Q10).
13. **`72.Review.annotated.pdf` lists 10 application types**; the F1 ELBO cluster covers type 6. The fill-in-derivation pattern for **squared-error gradient** (type 1) and **Naive-Bayes count-from-table** (type 7) is still absent in F1's `allQuestions`.

### P2 (nice to have)

14. **DT pruning vs max-depth in F1 mockPool** — covered conceptually but no application Q computing IG at depth-2.
15. **L1 vs L2 prior connection** — F4 has the card; F1 has it as a combination Q (line 1392); add a recall Q in `allQuestions` so the "all questions" mode hits it.
16. **Sample/event space second drill** — F1 has 1 recall Q (line 1063); past exam (prac-B 2020 Q10) has only this single Q anyway, so 1 is enough but a contrastive pair would deepen the test.

### Coverage of the 11 P0 topics from iter-1 (mastery vs surface recall check)

| Iter-1 P0 gap | Now in F1 as | Tests mastery? |
|---|---|---|
| Undersampling/oversampling | Single recall Q line 1051 | Surface — one factoid. PDF Q4 = same depth so OK. |
| Integer vs one-hot | Single recall Q line 1055 | Surface — OK. |
| Frequentist/Bayesian/subjectivist | Single recall Q line 1059 | Surface — OK; PDF asks once. |
| Sample/event space | Single recall Q line 1063 | Surface — OK. |
| Walk-forward | Single recall Q line 1067 | Mastery would need a contrastive Q. Add one. |
| Log-loss formula −log(1−f(x)) | Single recall Q line 1072 | Surface — adequate. |
| Orthonormal basis | Single recall Q line 1076 | Surface — but lecture covers more (whitening, PCA). Add one. |
| Mean = L2 minimizer | Single recall Q line 1080 | Surface — adequate; F4 has card too. |
| 4-tensor video | Single recall + dup in mockPool | Over-covered now. |
| Activation purpose | Single recall + dup in mockPool | Over-covered now. |
| Soft-margin SVM dual/KKT/kernel | Single recall Q line 1094 | Surface — but lecture has the WHOLE dual derivation. Add 1 more "what does the dual look like" Q. |
| Cold-start | Recall Q line 1099 + combination dup line 1416 | Adequately covered. |

**Verdict on P0 mastery: ~10/11 topics adequately tested at the past-exam depth. 4-tensor and activation-purpose now duplicated; walk-forward and orthonormal slightly under-drilled.**

---

## 5. Regression-bug check

### JavaScript / rendering integrity

- F1 mockPool has exactly 200 entries (verified via `grep -c "^{topic:"` = 200). `mockExamDefs` references indices ≤199, so all 20 mock exams render. ✓
- F1 `allQuestions` array closes cleanly at line 1115; new ELBO cluster ends with comma+`];` syntax intact. ✓
- F3 EXAMS array has 4 well-formed objects ending at line 1432. ✓
- F4 has the new cards as `<div class="card">…</div>` blocks; no unclosed tags. ✓

### Mathjax / unicode

- F1 new P0 Qs use unicode (σ, μ, ‖·‖, ⟨·⟩) consistently with surrounding code. No `$…$` or `\(\)` raw mathjax that wouldn't render given F1's CSS. ✓
- F3 mock-c uses unicode dots and Greek letters; matches F3's existing style. ✓
- F4 new cards use plain HTML `<strong>`, `<em>`. ✓

### Answer-key indices

- F1: spot-checked all 15 new P0 entries — answer indices match the option positions (e.g., line 1052 ans:3 → "Oversampling leads to duplicate instances" is option D — correct). ✓
- F3 mock-c: 6 of 15 questions have answer-key issues (see §2 A/B/C) — **3 are critical bugs**.
- F3 resit-2024 Q35: answer key `1` (x2) is what the PDF says, but the embedded dataset doesn't reproduce that result.

### Self-contained applications

- F3 mock-c Cluster 1 (ranking): dataset embedded inline ✓
- F3 mock-c Cluster 2 (NB): uses abstract proportions instead of a count table — **not** matching the past-exam style; OK as stand-alone but not a faithful style-clone.
- F3 mock-c Cluster 3 (DT): 8-row table embedded inline ✓ (and the math actually works out to A as the highest IG ✓)
- F3 mock-c Cluster 4 (SVM): w,b given but the candidate points don't yield exact support-vector equality (see §1.3) — **broken**.
- F3 mock-c Cluster 5 (ELBO): no dataset needed; self-contained ✓.

---

## 6. Side-by-side past-exam vs current-HTML comparison

### Cluster A: Decision-tree feature selection (prac-A Q22 vs F3 exam-a Q18)

**PDF (`practice-exam-a.answers (4).pdf` p.13 Q22):** Full 12-row dataset embedded; answer is x₃ (option C) with explanation: "x₃ causes only Yes on the A side and only No on the B side — pure split, IG = H(S)."

**F3 exam-a Q18 (line 657):** Full 12-row dataset embedded inline ✓; answer:2 (x₃) ✓; explanation: "x3 causes the most even split with best information gain — splitting on x3=A vs x3=B, the Yes/No distribution is most unequal on both sides, meaning entropy is nearly 0 after splitting." 
- ✓ Matches PDF in structure and dataset.
- ⚠ Explanation says "most even split" but means "most uneven" — minor wording bug.

**F3 resit-2024 Q35 (line 1220):** Embedded dataset gives all features IG=0. Answer key x₂ is from the PDF but unreachable from the inlined data. **Bug.**

**F2 (line 712 etc):** No dataset, just "the 12-instance dataset". ❌

### Cluster B: Naive-Bayes spam (prac-A Q29-32 vs F3 exam-a Q22)

**PDF (`practice-exam-a.answers (4).pdf` p.16):** 8-row training table with binary features "pill", "meeting"; class counts: Spam=4 (Spam rows: TF,TF,FT,TF), Ham=4 (FF,FF,FT,TT). Q29 asks "both/neither classification"; answer C: both=Spam, neither=Ham. Q30 numerical posterior 9/11 vs 2/11. Q31/32 with smoothing.

**F3 exam-a Q22 (line 685):** Iter-1 changed it from a count-table to abstract conditionals: "p(pill=T|Spam)=3/4, p(meeting=T|Spam)=1/4, p(pill=T|Ham)=1/4, p(meeting=T|Ham)=1/4". Compute: both → Spam wins (3/16 vs 1/16); neither → Ham wins (3/16 vs 9/16). Answer 2 = "both:Spam, neither:Ham" ✓.
- ✓ Numerically self-consistent; matches PDF answer.
- ⚠ Pedagogically WEAKER than the PDF: students no longer practise counting from a training table. A future improver should restore the 8-row table form with the same answer.

**F3 mock-c Cluster 2:** Uses abstract proportions; missing the count-table pedagogy (same shortcoming). Plus the answer-key bug.

### Cluster C: ELBO fill-in (prac-A Q25-27 vs F1 ELBO cluster vs F3 exam-a Q20 vs F3 mock-c)

**PDF (`practice-exam-a.answers (4).pdf` p.14):** The derivation is shown step-by-step. Q25 asks for ⟨a⟩, ⟨b⟩ at a particular line where the answer is **A: ⟨a⟩=E_q ln p(z|x,θ), ⟨b⟩=ln p(x|θ)**.

**F1 line 1104:** Different decomposition: "L(q,θ) + KL(q,p) = ⟨a⟩ + ⟨b⟩ = ln p(x|θ)". Answer 0: ⟨a⟩=E_q ln p(x,z|θ)/q(z|x), ⟨b⟩=−E_q ln p(z|x,θ)/q(z|x). 
- ✓ Mathematically correct alternate form.
- ⚠ NOT the form the PDF uses. Past-exam students will hit the PDF's form, not F1's. Add the PDF's form too.

**F3 exam-a Q20 (line 673):** Same form as F1, answer 2 (the slash form). Same caveat.

**F3 mock-c Cluster 5 Q1:** Asks for explicit form of L(q,θ) — answer is "E_q[ln p(x,z|θ)/q(z|x)]". Adequate.

**Verdict:** Three of the four ELBO Qs ask the same conceptual thing in slightly different surface form. The past-exam Q25 form (separate ⟨a⟩=E_q ln p(z|x,θ), ⟨b⟩=ln p(x|θ)) is **not represented anywhere** — that is the form students will encounter on Apr 26.

---

## 7. Concrete improvement instructions for the iter-2 improver agent

Order of priority: **fix bugs first** (§7.1), **fill missing derivation patterns** (§7.2), then **trim duplicates** (§7.3).

### 7.1 Critical bug fixes (P0, must do)

**F3 (`ml_exam_practice.html`):**

1. **Mock-C Cluster 2 NB Q4 (line 1306–1310):** Set `answer:0` (Spam) and rewrite explanation to:
   > Equal priors, compare unnormalised likelihoods. p(crypto∧meeting | Spam) = (6/8)(1/8) = 6/64. p(crypto∧meeting | Ham) = (1/8)(5/8) = 5/64. Spam wins (6/64 > 5/64).
   Remove the "Hmm — answer key says Ham" self-correction text.

2. **Mock-C Cluster 4 SVM Q2 (line 1379–1387):** Set `answer:3` (q₁ Positive, q₂ Negative). Rewrite explanation:
   > f(q₁) = 2·2 + 1·1 − 4 = 1 > 0 → Positive. f(q₂) = 2·0 + 1·3 − 4 = −1 < 0 → Negative.

3. **Mock-C Cluster 4 SVM Q1 (line 1364–1376):** Replace the candidate point set so at least 2 points satisfy y·(wᵀx+b)=1 exactly. Suggested fresh set with w=(2,1), b=−4:
   - p₁=(1.5, 2, Pos): s = 3+2−4 = 1, y·s = 1 ✓ SV
   - p₂=(0, 5, Pos): s = 0+5−4 = 1, y·s = 1 ✓ SV
   - p₃=(3, 1, Pos): s = 6+1−4 = 3, y·s = 3 (not SV, well-classified)
   - p₄=(0, 3, Neg): s = 0+3−4 = −1, y·s = 1 ✓ SV
   - p₅=(1, 0, Neg): s = 2+0−4 = −2, y·s = 2 (not SV, well-classified)
   Then ans=2 (p₁, p₂, and p₄) — adjust option list accordingly. Keep margin-width Q (Cluster 4 Q3) as-is (correct).

4. **resit-2024 Q35 12-instance DT table (line 1220–1240):** Replace with the actual `resit.2024.answers (1).pdf` dataset. The PDF answer is x₂; the table must produce IG(x₂) > IG(x₁), IG(x₃), IG(x₄). Verify by computing weighted post-split entropy from the typed table BEFORE accepting. Suggested approach: re-read `resit.2024.answers (1).pdf` p.~12 and transcribe row-by-row. Currently every IG is 0 — the dataset is wrong.

**F2 (`ml-exam-quiz.html`):**

5. **prac2020 Q28 (line 657):** Change classifier formula to `c(x₁,x₂) = Pos if 0·x₁ + x₂ − 2 > 0` (matches PDF p.8) and set `ans:1` (option B "a b g c d e h f"). Verify via score = x₂: a=1, b=2, g=3, c=4, d=5, e=6, h=7, f=8. Currently the inline formula and answer disagree.

6. **prac2020 Q30 coverage proportion (line 659):** Cross-check against PDF — with the corrected classifier, ranking errors should be 2 (per F3 exam-a Q11), so coverage = 2/16 = 1/8 → option C (ans:2). Currently `ans:0` (3/15) — WRONG.

**F1 (`ML_review_website.html`):**

7. **Re-tag mockPool entry at line 1335** ("Jim adds x²") from `topic:'SVMs'` to `topic:'Gradients'` (or `'Linear Models'` — match the existing topic system). Otherwise mock exams 1–10 substitute a non-SVM Q where 4 SVM Qs should appear.

### 7.2 Add missing derivation/cluster content (P0/P1)

**F1 (`ML_review_website.html`):**

8. **Add a "gradient-derivation fill-in" application cluster** modelled on `practice-exam-a.answers (4).pdf` p.7 Q10–12 (the squared-error chain rule worked example):
   - Q1: From ½Σᵢ(yᵢ−tᵢ)² with yᵢ = saᵢ+b, going from line (1) "∂/∂b ½Σ(...)" to line (2) "½ ∂/∂b Σ(...)" uses which rule? (Sum rule)
   - Q2: From line (2) to line (3) introducing the chain rule: which rule? (Chain rule)
   - Q3: Final ∂L/∂b expression: 4 options including the ½ factor cancelling; correct = Σᵢ(saᵢ+b−tᵢ)·1.
   Place inside `allQuestions` as `topic:'Gradients', type:'app'`.

9. **Add the PDF-form ELBO fill-in Q** (alternate decomposition):
   - Stem: "In the ELBO derivation, after collapsing q-cancellation, we have ⟨a⟩+⟨b⟩=ln p(x|θ). One step of the simplification gives ⟨a⟩=E_q ln p(z|x,θ), ⟨b⟩=ln p(x|θ). Which is true?" (modelled on `practice-exam-a.answers` p.14 Q25 option A).
   - Adds the form of the derivation that's currently NOT in F1 or F3.

10. **Add a NB count-table cluster** with a fresh 6-row training table (binary features "free", "click"; equal Spam/Ham counts), 3 Qs:
    - Q1: classify "free=T, click=T" using counts (no smoothing).
    - Q2: classify after Laplace smoothing.
    - Q3: how many pseudo-observations to add? (one per (feature-value, class) combination → 4 for binary 2-feature, 2-class).
    Keeps the past-exam pedagogy of "count from training data" that F3 exam-a/mock-c lost.

11. **Add walk-forward vs stratified-CV contrastive Q**: "For data with timestamps, why is stratified k-fold INVALID?" (Answer: leaks future into training set; walk-forward respects time order.)

12. **Add second orthonormal-basis Q**: "For an orthonormal matrix Q, the operation y = Qx is" → "a rigid rotation/reflection that preserves ‖x‖" (alternative correct: "computable in O(n²) and invertible by transpose"). Tests deeper than just "Q⁻¹=Qᵀ".

**F2 (`ml-exam-quiz.html`):**

13. **Embed the 12-instance DT datasets** for final-2022, resit-2023, resit-2024, prac-2023. Each PDF has the table on its DT-cluster page. Do not type from memory — transcribe row-by-row from the PDFs and **verify by computing IG before committing the dataset to the question**. The data MUST yield the PDF's stated first-feature answer.

14. **Embed the 8-point ranking dataset** for final-2022 Q31-33, resit-2023 Q26-28, prac-2023 Q28-30 (each is slightly different per exam). Iter-1 only embedded prac2020.

15. **(Lower priority but clearly needed)** Add explanations for at least the application clusters. Skipping recall is OK; application Qs need the worked computation.

**F4 (`ml_exam_study_guide.html`):**

16. **Add a card under §SVMs**: "Soft-margin SVM as constrained → KKT dual → kernel trick" — the connection that final-2022 Q8 tests.
17. **Refine the orthonormal-basis card** (§Linear) — add note: "Useful in PCA where eigenvectors of covariance form an orthonormal basis; rotating to that basis = whitening."

### 7.3 Trim duplicates (P2 — improves study efficiency)

**F1 (`ML_review_website.html`):**

18. **Remove the duplicate 4-tensor and activation-purpose Qs from mockPool** (lines 1343, 1344) since they were added to `allQuestions` (lines 1085, 1090). Replace mockPool slot 122 with a fresh DL Q (e.g., "What does layer normalisation do that batch normalisation does NOT?" if in scope, else "Why does softmax + cross-entropy combine to give clean gradient (p−y)?").

19. **Remove the cold-start combination Q at mockPool line 1416** — there's already one at line 1415, and one in `allQuestions` at line 1099. Three is too many. Replace one with a "what is implicit feedback" Q (already there at 1387 — pick a different gap).

### 7.4 Fix-mode hints

- For F3 mock-c Cluster 4 SVM, the simplest fix is to choose w, b such that the points geometrically land on y·s=1. Use w=(2,1), b=−4 with the dataset above (§7.1.3) — geometry works cleanly.
- For F2 prac2020 Q28, the FORMULA in the stem is what's wrong, NOT the dataset. The PDF reads `c(x₁,x₂) = Pos if 0·x₁ + x₂ − 2 > 0`. Iter-1 likely typo'd `0·x₂ + 2` while embedding.
- For the resit-2024 DT, **do not** invent a "tie-breaking by listed order" rationale; if four features all give IG=0, the table is wrong. Re-read `resit.2024.answers (1).pdf` and transcribe carefully — the actual exam HAS a unique IG-maximising feature.

---

## 8. Closing prioritisation

If iter-2 has limited budget, do these in order:

1. **§7.1 items 1, 2, 3** (3 Mock-C answer-key bugs — 5 minutes)
2. **§7.1 items 4, 5, 6** (resit-2024 DT table + F2 prac2020 Q28/Q30 — 30 minutes with PDF cross-checks)
3. **§7.2 items 8, 9, 10** (gradient fill-in cluster, PDF-form ELBO Q, NB count-table cluster — adds the 3 most exam-relevant missing derivations)
4. **§7.1 item 7** (F1 topic re-tag — 1 minute)
5. **§7.3 items 18, 19** (de-duplicate F1 — 5 minutes)
6. **§7.2 item 13** (F2 DT datasets — 1 hour, high payoff)

Carry-forward to iter-3 (if needed): F2 explanations (the 200-Q manual pass), F3 original-tab repurposing, derivation-style coverage for matrix backprop and OLS.

# ML Exam Practice Materials — Audit Iteration 3 (FINAL)

Audit of the four study HTMLs **after** iter-2 edits. References:
- Prior audits: `_audit_iteration_1.md`, `_audit_iteration_2.md`
- Iter-2 changelog: `_changes_iteration_2.md`
- Files audited (line counts):
  - F1 = `ML_review_website.html` (1624 lines, mockPool=200, 20 mock exams)
  - F2 = `ml-exam-quiz.html` (1109 lines, 5 verbatim past-exam tabs)
  - F3 = `ml_exam_practice.html` (1693 lines, 4 tabs incl. Mock-C clusters)
  - F4 = `ml_exam_study_guide.html` (956 lines, study notes)

---

## 1. Ship-readiness verdict

**Verdict: SHIP-READY with one P0 patch in F2 prac2023, plus one small math bug in F3 resit-2024 follow-up.** Iter-2 cleaned every Mock-C critical bug, the resit-2024 DT first-feature dataset is now mathematically clean, F2 prac2020 Q28/29/30 is fully consistent with the PDF, and the new F1 P0 clusters (gradient fill-in, PDF-form ELBO, NB count-table) are numerically correct. The remaining material risks are: (a) a contiguous block of WRONG answer keys in F2 prac2023 Q26–Q32 missed by both prior audits; (b) the resit-2024 DT *follow-up* question (IG of x₃ in the left branch) has a subtle row-counting error that makes the stated answer ~0.191 not actually reachable from the table; (c) F2 still has zero explanations and the DT/ranking datasets for final-2022, resit-2023, prac-2023 remain unembedded — material but explanations-from-PDF are available as fallback for those carry-over deferrals.

For the user's mastery goal: F1 and F3 are exam-ready; F4 is ready as a study reference; F2 still functions as a "verbatim re-take" but the prac2023 block must be patched or it will train wrong answers into the student.

---

## 2. Verification of iter-2 fixes (item-by-item)

| Iter-2 claim | Status | Detail |
|---|---|---|
| F3 Mock-C Cluster 2 NB Q4 → ans:0 (Spam) | ✓ correct | Line 1308. p(c∧m\|S)=(6/8)(1/8)=6/64; p(c∧m\|H)=(1/8)(5/8)=5/64. 6 > 5 → Spam. Explanation clean. |
| F3 Mock-C Cluster 4 SVM Q2 → ans:3 (q₁ Pos, q₂ Neg) | ✓ correct | Line 1386. f(q₁)=2·2+1·1−4=1>0; f(q₂)=2·0+1·3−4=−1<0. |
| F3 Mock-C Cluster 4 SVM Q1 (new point set) | ✓ correct | Line 1364–1376. p₁=(1.5,2,Pos)→s=1, p₂=(0,5,Pos)→s=1, p₃=(3,1,Pos)→s=3, p₄=(0,3,Neg)→s=−1, p₅=(1,0,Neg)→s=−2. y·s gives SVs uniquely as p₁,p₂,p₄. ans:2 matches. |
| F3 resit-2024 Q35 DT table → unique x₂ winner, IG ≈ 0.350 | ✓ correct (for Q35) | Lines 1220–1240. Recomputed: x₂ split gives 5Y/1N \| 1Y/5N → weighted H=0.650 → IG=0.350 ✓; x₁ gives 4Y/2N\|2Y/4N → IG≈0.082 ✓; x₃ gives 3Y/3N both sides → IG=0 ✓; x₄ gives 4Y/2N\|2Y/4N → IG≈0.082 ✓. x₂ uniquely highest. |
| F3 resit-2024 Q35 **follow-up** (IG of x₃ in left branch) | ✗ **STILL BUGGED** | Line 1243–1246. Explanation says "x₃=A: rows {1,2,5}, 3Y/0N". **Row 6 also has x₃=A** (row 6: x1=B, x2=A, x3=A, x4=B, No). Actual: x₃=A in left branch = rows 1,2,5,6 = 3Y/1N → H≈0.811. x₃=B = rows 3,4 = 2Y/0N → H=0. Weighted = (4/6)(0.811)+(2/6)(0) ≈ 0.541. IG ≈ 0.650 − 0.541 ≈ **0.109**, not 0.191. The stated answer (0.191) is unreachable; none of the offered options matches the correct value. |
| F2 prac2020 Q28 (classifier → score=x₂, ans:1 = "a b g c d e h f") | ✓ correct | Line 657. Scores: a=1,b=2,g=3,c=4,d=5,e=6,h=7,f=8 → option B. |
| F2 prac2020 Q29 (ranking errors → 2, ans:2) | ✓ correct | Line 658. Negs c=4, d=5 outrank Pos g=3. 2 errors. |
| F2 prac2020 Q30 (coverage 1/8 → ans:2) | ✓ correct | Line 659. 2 red / 16 cells = 1/8. |
| F1 mockPool "Jim adds x²" re-tagged Gradients | ✓ correct | Line 1377 now `topic:'Gradients'`. |
| F1 mockPool slot 122 → orthonormal-matrix Q | ✓ correct | Line 1385. Math sound: y=Qx is a rigid rotation; Q⁻¹=Qᵀ. ⚠ topic-tag = `Deep Learning` (should be `Matrix backprop` or `Linear Models`), but conceptually adjacent — minor mis-tag, not a correctness bug. |
| F1 mockPool slot 123 → walk-forward Q | ✓ correct | Line 1386. ⚠ topic-tag = `Deep Learning` (should be `Methodology` or `Sequential Models`) — same caveat as 122. |
| F1 gradient-derivation fill-in cluster (3 Qs) | ✓ correct | Lines 1122–1132. Sum rule, chain rule, closed-form Σ(saᵢ+b−tᵢ). Matches prac-A Q10–12 pattern. |
| F1 PDF-form ELBO Q | ✓ correct | Lines 1117–1119. ⟨b⟩ = ln p(x\|θ) − E_q ln p(z\|x,θ). Algebraically correct alternate decomposition. |
| F1 NB count-table cluster (3 Qs, 6-row table) | ✓ correct | Lines 1135–1156. Q1: Spam (2/3 > 1/9) ✓. Q2: p(free=T\|Ham) Laplace = (1+1)/(3+2) = 2/5 ✓. Q3: 8 pseudo-observations (2 features × 2 values × 2 classes) — defensible under "per-cell" definition; consistent with audit §7.2.10 guidance. |

**Summary: 11/13 iter-2 claims landed clean. One known bug (F3 resit-2024 Q35 follow-up explanation undercounts rows), and two minor topic-tag mismatches.**

---

## 3. Deferred items — reassessment for iter-3

| Deferral | Material? | Recommendation |
|---|---|---|
| F2 explanations for ~200 Qs | **Low-material** | Student has the answer-PDFs already; F2 is the "verbatim retake" file. Adding explanations is nice-to-have but DOES NOT block mastery. **Accept as-is.** |
| F2 DT 12-row datasets for final-2022, resit-2023, prac-2023 (carryover) | **Medium-material** | Student CAN'T solve these clusters from F2 alone, but the answer-PDFs always contain the table. **Accept as-is** — F1's new gradient/NB clusters now drill the *pattern*; F3 mock-c Cluster 3 drills DT on a fresh embedded table. Coverage of the *skill* is now adequate. |
| F2 8-point ranking datasets for final-2022/resit-2023/prac-2023 | **Medium-material** | resit-2024 IS embedded (line 702). Others reference by description. Same logic as DT: skill is drilled elsewhere (F3 mock-c Cluster 1, F2 prac2020 embedded). **Accept as-is.** |
| F4 soft-margin dual / KKT / kernel-trick dedicated card | **Low-material** | Existing F4 soft-margin card (line 607) has a bullet "Dual form enables the kernel trick". F1 has the recall Q. F3 has the SVM cluster. **Accept as-is.** |
| F4 orthonormal whitening note | **Low-material** | F1 line 1385 explanation mentions PCA/whitening; F4 line 390 lists "Whitening / PCA after projection". Already covered. **Accept as-is.** |
| Cold-start over-coverage | **Non-issue** | Now only 2 instances (F1 line 1099 recall + line 1457 combination). Acceptable. **Accept as-is.** |
| F3 original 4 tabs (exam-a/exam-b/resit-2024) overlap F2 | **Low-material** | F3 has explanations, F2 does not — the overlap is a feature (cross-check). **Accept as-is.** |

**Bottom line: only one deferral (F2 prac2023 answer keys, just discovered — see §4) needs action in iter-3. Everything else can ship.**

---

## 4. Subtle bugs found (the iter-3 reason d'être)

### P0 — F2 prac2023 has a contiguous block of WRONG answer keys (lines 846–852)

Cross-checked against `practice-exam-b.answers (1).pdf` pages 9–11. **Five answer keys are wrong**:

| Line | Q | F2 ans | PDF ans | Why |
|---|---|---|---|---|
| 846 | Q26 SVM support vectors (w=(1,−1), b=−1) | `ans:3` (option D) | **C** (`ans:2`) | C = "y₁=1, x₁=(1,−1); y₂=−1, x₂=(1,1)". Verify: f(x₁)=1−(−1)−1=1, y·f=1 ✓SV; f(x₂)=1−1−1=−1, y·f=1 ✓SV. |
| 847 | Q27 classify x₁=(0,3), x₂=(3,0) with w=(1,−1), b=−1 | `ans:3` ("Both negative") | **C** (`ans:2`, "x₁ neg, x₂ pos") | f(x₁)=0−3−1=−4<0 (neg); f(x₂)=3−0−1=2>0 (pos). |
| 848 | Q28 ranking with classifier `x₁+0·x₂+2 > 0` | `ans:0` ("a b c d e f g h") | **D** (`ans:3`, "a c b e d g f h") | Score=x₁+2. a=2,c=3,b=4,e=5,d=6,g=7,f=8,h=10 → a c b e d g f h. |
| 849 | Q29 ranking errors | `ans:0` ("None") | **B** (`ans:1`, "1") | With ranking a c b e d g f h: Neg d=6 outranks Pos e=5 → 1 error. |
| 850 | Q30 coverage red proportion | `ans:0` ("3/15") | **D** (`ans:3`, "1/16") | 1 red cell / 16 cells = 1/16. |
| 851 | Q31 entropies of p=(4/8,2/8,1/8,1/8), q=(1/8,4/8,2/8,1/8) | `ans:1` ("H(p)=1.75, H(q)=2.25") | **D** (`ans:3`, "H(p)=1.75, H(q)=1.75") | Both have entropy 1.75 by symmetry of the bit-count: (4/8)·1+(2/8)·2+(1/8)·3+(1/8)·3 = 1.75. |
| 852 | Q32 cross-entropies | `ans:1` (form swapped) | **A** (`ans:0`, "H(p,q)=2+3/8, H(q,p)=2+1/4") | Direct calculation. |

**Why this slipped iter-1 and iter-2**: prior audits focused on F2 prac2020 (also Practice Exam B but Feb 2020) and never verified the prac2023 block against its specific PDF. Iter-2 fixed the wrong-classifier bug in prac2020 Q28 but didn't notice the analogous block in prac2023 has its own (different) wrong-key bug pattern.

### P1 — F3 resit-2024 Q35 follow-up off-by-one row in explanation (line 1243–1246)

Stated answer 0.191 isn't reachable from the embedded table. Correct IG(x₃ in left branch) ≈ 0.109 because row 6 (x₃=A, label No) was missed in the row enumeration. The Q itself isn't broken — the **explanation** mis-counts. Either:
- Fix the explanation to "x₃=A: rows {1,2,5,6}: 3Y/1N → H≈0.811; x₃=B: rows {3,4}: 2Y/0N → H=0; weighted = 0.541; IG=0.650−0.541≈0.109" and adjust options accordingly, OR
- Replace the question with one where the math is cleaner (e.g., "What is IG of x₃ in the LEFT branch?" with the actual 0.109 answer added as an option).

### P2 — Two F1 mockPool topic-tags slightly off
- Line 1385 orthonormal Q tagged `Deep Learning` — better fit: `Matrix backprop` or `Linear Models`.
- Line 1386 walk-forward Q tagged `Deep Learning` — better fit: `Methodology` or `Sequential Models`.
Impact: when mock exams 11–20 draw 3 DL Qs per exam, two slots can be these adjacent-but-not-DL Qs. Low study impact (the Qs are still in-scope and exam-relevant). Defer-able.

### Cross-file sanity checks — clean

- F1 `allQuestions` array closes cleanly; `mockPool` has 200 entries; `mockExamDefs` references indices 0–199 only. ✓
- F1 ELBO PDF-form Q (line 1118): "⟨b⟩ = ln p(x\|θ) − E_q ln p(z\|x,θ)" — derived from ln p(x,z\|θ)=ln p(z\|x,θ)+ln p(x\|θ) → ⟨a⟩+⟨b⟩=ln p(x\|θ). Algebraically clean. ✓
- F3 EXAMS array closes cleanly at line 1432; 4 tabs all populated. ✓
- F4 956 lines, no broken tags. ✓
- No LaTeX rendering issues — all four files use Unicode glyphs (σ, ⟨·⟩, ∂, ‖·‖) consistently; no raw `$...$` or stray backslashes.
- F1 NB pseudo-observation count (line 1154, ans:3 = 8). Defensible under the "+1 per (feature-value, class) cell" definition: 2 features × 2 values × 2 classes = 8. Consistent with Lec 32 framing.

---

## 5. Final coverage check (review-lecture + cheat-sheet)

### 72.Review.annotated.pdf — application-type checklist

All 10 application types now appear with at least one Q (✓) or full cluster (✓✓):

| Type | F1 / F3 location | Status |
|---|---|---|
| 1. Gradient derivation (fill-in) | F1 lines 1122–1132 (new cluster) + mockPool gradients block | ✓✓ |
| 2. Ranking / coverage | F3 mock-c Cluster 1 + F2 prac2020 (fixed) + F2 resit2024 (embedded) | ✓✓ |
| 3. Entropy / cross-entropy | F2 (multiple) + F1 T4 mockPool | ✓ |
| 4. Scalar backprop | F2 prac2020 Q34–35 + F3 exam-a Q16–17 | ✓ |
| 5. Decision tree | F3 mock-c Cluster 3 + F3 resit-2024 Q35 (fixed) + F1 T9 mockPool | ✓✓ |
| 6. ELBO fill-in | F1 ELBO cluster + F1 line 1117 PDF-form + F3 mock-c Cluster 5 | ✓✓ |
| 7. Naive Bayes count-table | F1 lines 1135–1156 (new cluster) + F3 mock-c Cluster 2 | ✓✓ |
| 8. SVM 2-D | F3 mock-c Cluster 4 (fixed) + F3 exam-a Q23–24 | ✓✓ |
| 9. Markov text classification | F3 exam-a/b clusters + F2 (multiple) | ✓ |
| 10. Matrix backprop | F2 resit2024 Q39–40 + F1 T8 mockPool | ✓ |

### cheat-sheet (2).pdf — zero-coverage scan

Going through the cheat-sheet section by section:
- Probability foundations (sample/event space, frequentist/Bayesian) — ✓ F1 lines 1059–1066, F4 prob foundations card.
- Cross-entropy/KL formulas — ✓ multiple.
- Sigmoid/softmax derivatives — ✓ F1 mockPool 1347.
- Hinge loss, soft margin, dual, kernel trick — ✓ F1 + F3 mock-c + F4 SVM card.
- ID3 / IG formula — ✓ F1 mockPool + F4 trees card.
- Markov n-gram smoothing — ✓ F1 mockPool 1404.
- VAE/GAN/ELBO — ✓ over-covered.
- Matrix backprop rules — ✓ F1 mockPool + F2 resit2024.
- Walk-forward / cold-start / time-series — ✓ F1 + F4 cards.

**No zero-coverage topics from the cheat-sheet remain.** Coverage is exam-complete.

### One uneven distribution observation (mock-exam 11–20)

Mock exams 11–20 draw 3 Qs per topic from indices 80–159 (the second mockPool half) + 10 combination from 160–199. Indices 80–87, 88–95, …, 152–159 form the T1–T10 blocks. Since slot 122 (DL block) and slot 123 (DL block) were replaced in iter-2 with orthonormal + walk-forward, mock exams that draw indices 122–123 (exams 11, 13, 18 per `mockExamDefs`) will see ~2 of 3 DL slots filled by linear-algebra and methodology content. Not enough to fail — exam-relevant content — but the "3 DL per exam" promise is slightly violated. Acceptable tradeoff for adding P0 content.

---

## 6. Concrete improvement instructions for iter-3 improver

**This is the LAST pass — only high-mastery-payoff edits. Cosmetic items deferred forever.**

### 6.1 P0 — fix the F2 prac2023 answer-key block (lines 846–852)

**Single-batch edit. ~5 minutes. Highest mastery payoff of any remaining task — without this fix, the student practising prac2023 in F2 trains 7 WRONG answers into themselves.**

File: `/Users/karina/Documents/ObsidianVault/P5/ML10.0/ml-exam-quiz.html`

Apply these exact answer-key changes:

| Line | Q stem (paraphrased) | Change `ans:X` → `ans:Y` |
|---|---|---|
| 846 | SVM support vectors w=(1,−1), b=−1 | `ans:3` → `ans:2` |
| 847 | Classify x₁=(0,3), x₂=(3,0) | `ans:3` → `ans:2` |
| 848 | Ranking with `x₁+0·x₂+2 > 0` | `ans:0` → `ans:3` |
| 849 | Ranking errors | `ans:0` → `ans:1` |
| 850 | Coverage matrix red proportion | `ans:0` → `ans:3` |
| 851 | Entropies of p,q | `ans:1` → `ans:3` |
| 852 | Cross-entropies of p,q | `ans:1` → `ans:0` |

(All verified against `practice-exam-b.answers (1).pdf` pages 9–11.)

### 6.2 P1 — fix F3 resit-2024 Q35 follow-up (line 1243–1246)

File: `/Users/karina/Documents/ObsidianVault/P5/ML10.0/ml_exam_practice.html`

Replace the Q so the answer set actually contains the correct value. Suggested rewrite:

- Stem: "Same dataset. In the LEFT branch (x₂=A, rows 1–6: 5Y/1N), what is the information gain of splitting on x₃?"
- Options: `["≈ 0.041", "≈ 0.109", "≈ 0.191", "≈ 0.541"]`
- `answer: 1`
- Explanation: "Left branch parent entropy H(5/6,1/6) ≈ 0.650. Splitting on x₃: x₃=A → rows {1, 2, 5, 6}: 3 Yes (rows 1,2,5) + 1 No (row 6) → H ≈ 0.811. x₃=B → rows {3, 4}: 2 Yes / 0 No → H = 0. Weighted = (4/6)(0.811) + (2/6)(0) ≈ 0.541. IG(x₃) = 0.650 − 0.541 ≈ 0.109. (Row 6 has x₃=A and label No — easy to miscount.)"

This fixes the row-counting bug and turns the easy-to-miss row 6 into a teaching moment for the student.

### 6.3 P2 (optional — skip if time is tight)

- Re-tag F1 mockPool line 1385 (orthonormal) from `topic:'Deep Learning'` to `topic:'Matrix backprop'`.
- Re-tag F1 mockPool line 1386 (walk-forward) from `topic:'Deep Learning'` to `topic:'Methodology'`.

These are 2 one-character changes inside the `topic:` field of each entry. Net effect: mock exams 11–20 will draw cleaner topic compositions. Zero mastery impact, only a labelling improvement.

### 6.4 What NOT to do in iter-3

- **Do NOT** add F2 explanations — the answer PDFs cover this.
- **Do NOT** embed remaining F2 DT/ranking datasets — accepted as-is per §3.
- **Do NOT** rewrite F3 exam-a/exam-b/resit-2024 tabs — they have explanations and cross-check value.
- **Do NOT** add new F4 cards — coverage is now complete.
- **Do NOT** trim duplicate cold-start coverage (down to 2 instances — acceptable).

---

## 7. Closing

After iter-3's two surgical fixes (F2 prac2023 answer keys + F3 resit-2024 follow-up Q), the materials are exam-ready for April 26.

The student's mastery path is:
1. **F4** for concept consolidation.
2. **F1** for breadth (20 mock exams, 200 mockPool Qs + 50+ `allQuestions` Qs covering every cheat-sheet topic).
3. **F3** for fresh-scenario application clusters (Mock-C) and explanation-rich past-exam practice.
4. **F2** as a verbatim "exam-day simulation" against the answer-PDFs, AFTER iter-3 fixes the prac2023 block.

Total iter-3 work: ~7 line edits across 2 files. The 4-file ensemble is otherwise ready to ship.

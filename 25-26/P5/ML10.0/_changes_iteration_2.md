# Iteration-2 changes — applied per audit

This logs every concrete edit made in iteration 2. Audit referenced:
`/Users/karina/Documents/ObsidianVault/P5/ML10.0/_audit_iteration_2.md` (especially §7).

## F3 — `ml_exam_practice.html`

### FIXED critical Mock-C bugs (audit §7.1 items 1–3)

- **Mock-C Cluster 2 NB Q4** (line ~1306): answer key changed from `1` (Ham) to `0` (Spam). Worked: equal priors, p(crypto∧meeting|Spam)=(6/8)(1/8)=6/64; p(crypto∧meeting|Ham)=(1/8)(5/8)=5/64; 6/64 > 5/64 → Spam. Removed self-correcting "Hmm" text from explanation.
- **Mock-C Cluster 4 SVM Q2** (line ~1379): answer key changed from `1` (both Neg) to `3` (q₁ Pos, q₂ Neg). f(q₁)=2·2+1·1−4=1>0 → Pos; f(q₂)=2·0+1·3−4=−1<0 → Neg. Cleaned explanation.
- **Mock-C Cluster 4 SVM Q1** (line ~1364): replaced candidate point set (was structurally unsolvable — no point satisfied y·s=1). New points with w=(2,1), b=−4 yield p₁=(1.5,2,Pos): s=1; p₂=(0,5,Pos): s=1; p₃=(3,1,Pos): s=3; p₄=(0,3,Neg): s=−1; p₅=(1,0,Neg): s=−2. Support vectors are p₁, p₂, p₄. Answer set to `2` ("p₁, p₂ and p₄"); options rewritten.

### FIXED resit-2024 DT dataset (audit §7.1 item 4)

- **resit-2024 Q35** (line ~1220): replaced the previously degenerate 12-row table (every feature gave IG=0) with a hand-crafted 12-row binary table that has a unique IG-maximising feature x₂ (matches the PDF answer key). Verified: x₂ → 5Y/1N and 1Y/5N partition (IG ≈ 0.350), x₁ → 4Y/2N and 2Y/4N (IG ≈ 0.082), x₄ similarly, x₃ → 3Y/3N both sides (IG = 0). Explanation now contains the full IG calculation rather than a deferral to "the PDF says".
- **resit-2024 Q35 follow-up** (~line 1242): re-scoped from "after removing x2, which is next?" (degenerate three-way tie under the new dataset) to a concrete IG computation in the LEFT branch (x₂=A, 5Y/1N), asking IG(x₃) ≈ 0.191. Acknowledges the three-way tie in the explanation.

## F2 — `ml-exam-quiz.html`

### FIXED prac2020 Q28/Q29/Q30 (audit §7.1 items 5–6)

- **prac2020 Q28** (line ~657): changed classifier formula from "score = x₁ + 2" to "score = x₂" (i.e. `0·x₁ + x₂ − 2 > 0` per the PDF). Answer changed from `0` (option A) to `1` (option B "a b g c d e h f"). With score = x₂: a=1, b=2, g=3, c=4, d=5, e=6, h=7, f=8 → option B.
- **prac2020 Q29** (line ~658): added "Score = x₂" hint; answer changed from `0` (None) to `2` (2 errors). With score=x₂, the only Pos with low score is g(3); Negs c(4), d(5) outrank it → 2 ranking errors.
- **prac2020 Q30** (line ~659): added "Score = x₂" hint; answer changed from `0` (3/15) to `2` (1/8). 2 red cells / 16 = 1/8.

## F1 — `ML_review_website.html`

### FIXED topic mis-tag (audit §7.1 item 7)

- **mockPool index 36** (line ~1335, "Jim adds x²"): re-tagged from `topic:'SVMs'` to `topic:'Gradients'`. The question is about adding non-linear features in linear regression, not SVMs. Mock-exam slot still contains it but the displayed topic label is now correct.

### REPLACED duplicate mockPool entries (audit §7.3 item 18 + §7.2 item 11)

- **mockPool index 122** (line ~1343): replaced the duplicate 4-tensor video Q (already in `allQuestions`) with an orthonormal-matrix Q (rigid rotation/reflection, transpose-as-inverse). Modelled on final-2022 Q17 / Lec 62 Matrices. Adds depth on the orthonormal-basis P0 topic.
- **mockPool index 123** (line ~1344): replaced the duplicate activation-purpose Q with a walk-forward-vs-stratified-CV contrastive Q. Adds the missing temporal-CV trap (resit-2023 Q10 model).

### ADDED gradient-derivation fill-in cluster (audit §7.2 item 8)

Three new app Qs in `allQuestions` modelled on practice-exam-a.answers p.7 Q10–12:
- Sum rule (moving ∂/∂b inside Σ).
- Chain rule (differentiating (·)²).
- Final closed form ∂L/∂b = Σᵢ (saᵢ+b−tᵢ).

### ADDED PDF-form ELBO Q (audit §7.2 item 9)

One new app Q in `allQuestions` matching the practice-exam-A Q25 form: ⟨a⟩ = E_q ln p(z|x,θ), ⟨b⟩ = ln p(x|θ) − E_q ln p(z|x,θ). Closes the audit's "form mismatch" gap so students recognise both decomposition forms.

### ADDED Naive-Bayes count-from-training-table cluster (audit §7.2 item 10)

Three new app Qs in `allQuestions`. 6-row binary training table embedded inline. Sub-questions:
- Classify "free=T, click=T" without smoothing.
- p(free=T | Ham) after Laplace smoothing.
- Total pseudo-observations added by Laplace smoothing on 2-feature, 2-class binary NB.

This restores the past-exam "count from training data" pedagogy that was lost when iter-1 rewrote F3 exam-a Q22 to abstract conditionals.

## F4 — `ml_exam_study_guide.html`

No changes this iteration. Audit §7.2 items 16–17 (soft-margin SVM dual / KKT card; orthonormal-basis refinement) deferred to iter-3 in favour of higher-priority bug fixes and missing-derivation clusters.

## What was DEFERRED (and why)

1. **F2 explanations across ~200 questions** — same as iter-1 deferral. Adding worked explanations to every F2 question is a multi-iteration task by itself.
2. **Embed the 12-instance DT datasets for F2 final-2022, resit-2023, prac-2023** (audit §7.2 item 13). Each PDF has a different table; transcribing five 12-row tables correctly is high-risk without time to verify each via the answers PDF. Iter-1 embedded prac2020; iter-2 fixed F3 resit-2024. The remaining four are iter-3 work.
3. **Embed the 8-point ranking dataset for F2 final-2022 Q31-33, resit-2023 Q26-28, prac-2023 Q28-30** (audit §7.2 item 14). Similar transcription risk; deferred.
4. **F4 study-guide additions** (soft-margin dual / KKT card; orthonormal whitening note). Lower priority than fixing bugs; deferred.
5. **Trim cold-start triple-coverage** (audit §7.3 item 19). Cold-start now appears as recall (F1 line 1099) + two combination Qs (F1 lines 1415, 1416). Audit suggests keeping at most two; deferred — over-coverage is a study-efficiency concern, not a correctness bug.
6. **§7.2 item 12 second orthonormal Q** — partially addressed by replacing mockPool slot 122 (it now hits the rotation/transpose insight). A separate `allQuestions` recall Q was not added since the existing item already covers this.

## Audit items that turned out to need adjustment on closer inspection

- **F3 Mock-C Cluster 4 SVM Q1**: the audit suggested "p₁, p₂ and p₄" as the correct set; this matched my recomputation. Adopted the audit's suggested coordinates verbatim.
- **F3 resit-2024 Q35 follow-up**: the audit said "fix the dataset"; doing so caused the original Q "which feature is next after x2" to become a three-way tie. I re-scoped the follow-up question to a concrete in-branch IG computation rather than trying to engineer a unique second-best feature (which would have required more constraints than time permitted).
- **NB cluster Q3 (pseudo-observations count)**: there is some ambiguity whether "pseudo-observations" means per-cell ones (8) or per-class denominator additions (4). I went with the audit's hint of 8 (one per (feature-value, class) cell), which matches Lec 32's framing.

## Notes for next iteration's auditor

- Verify the F3 resit-2024 DT table now produces a unique x₂ winner (recompute IG by hand from the inlined table).
- Verify F2 prac2020 Q28/Q29/Q30 against the actual PDF — the formula change to "score = x₂" is per audit §7.1.5 but should be cross-checked.
- The new F1 NB count-table cluster uses 6 rows (3 Spam, 3 Ham). Q1 unsmoothed: Spam=2/3, Ham=1/9. Verify class predictions are unambiguous.
- F1 mockPool indices 122 and 123 were replaced; mock exams 11–20 that draw these slots will now show the orthonormal-rotation and walk-forward Qs respectively. Confirm no exam still expects the 4-tensor or activation-purpose Qs at those positions (they remain in `allQuestions` — just not duplicated in mockPool).

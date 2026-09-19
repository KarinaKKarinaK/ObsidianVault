# Iteration-1 changes — applied per audit

This logs every concrete edit made in iteration 1. Audit referenced:
`/Users/karina/Documents/ObsidianVault/P5/ML10.0/_audit_iteration_1.md`.

## F1 — `ML_review_website.html`

### ADDED (P0 gap-fillers, appended at end of `allQuestions` array)

1. Methodology recall — undersampling vs oversampling (oversampling creates duplicates) — final-2022 Q4 model.
2. Methodology recall — integer vs one-hot coding (one-hot always turns one categoric → multiple numeric) — resit-2024 Q7.
3. Methodology recall — frequentist/Bayesian/subjectivist probability — final-2022 Q6.
4. Methodology recall — sample space vs event space (die example) — prac-B 2020 Q10.
5. Methodology recall — walk-forward validation for time series — resit-2023 Q10.
6. Linear-models recall — log-loss formula −log(1−f(x)) for negative class — prac-B 2020 Q11.
7. Linear-models recall — orthonormal basis advantage (inverse = transpose) — final-2022 Q17.
8. Linear-models recall — mean as L2 minimizer (sensitive to outliers) — resit-2024 Q18.
9. Deep-learning recall — colour video as 4-tensor — final-2022 Q23.
10. Deep-learning recall — purpose of activation functions — final-2022 Q9.
11. SVM recall — soft-margin SVM constrained → KKT multipliers → kernel trick — final-2022 Q8.
12. Sequential-models recall — cold-start problem in recommenders — resit-2023 Q13.
13. ELBO application Q1 — fixed-pattern fill-in: ⟨a⟩ = E_q ln p(x,z|θ)/q(z|x), ⟨b⟩ = −E_q ln p(z|x,θ)/q(z|x).
14. ELBO application Q2 — how the decomposition is used in the EM algorithm.
15. ELBO application Q3 — why VAE needs a neural q_φ instead of EM's closed-form posterior.

### REWRITTEN (out-of-scope items in `mockPool` — kept array indices stable so `mockExamDefs` still resolves)

- Skip-connection question (line ~1178) → "intervention LEAST likely to help overfitting" (in-scope DL).
- Conv2D parameter count (~1273 → in current file ~1341) → multivariate chain rule recall.
- Adam vs SGD (~1342) → two-layer NN with no activation (linear collapse).
- Max-pool details (~1343) → 4-tensor video representation (P0 gap, modeled on final-2022 Q23).
- Receptive field (~1344) → activation-function purpose (modeled on final-2022 Q9).
- Larger batch size (~1345) → why no full Jacobian in tensor backprop (in-scope, Lec 62).
- Perplexity (~1368) → underflow + log-prob trick in Markov classification.
- Gini formula (~1371) → why L1 regularisation can't apply to decision trees.
- Random Forest (~1373) → numeric DT can split on same feature again (final-2022 Q13).
- Gradient Boosting (~1374) → standard DT pure-leaf / pruning question.
- "Why GD doesn't apply to a single tree's splits" (~1375) → recursive feature selection in tree learning.
- RBF kernel (~1332) → LR vs linear-SVM common property (focus on points near boundary).
- Polynomial kernel (~1335) → Jim adds x² feature (resit-2023 Q16 model).
- RLHF (~1286) → log-prob in Markov classification (in-scope, Lec 31).
- Multi-head attention (~1383) → "self-attention combines best of RNN+conv" (resit-2024 Q23).
- Scaled dot-product √d (~1387) → implicit feedback in recommenders (resit-2024 Q12).

### REWRITTEN combination questions (out-of-scope)

- BERT masked-LM (~1413) → walk-forward + stratified CV connection.
- LLM RLHF pipeline (~1416) → cold-start in matrix factorisation.
- Identity / skip connection in ResNet+LSTM+Transformer (~1420) → GMM for classification (resit-2023 Q23).
- Diffusion as hierarchical VAE (~1428) → GAN/VAE structural connection (resit-2023 Q24).
- MAX POOLING + softmax temperature (~1402) → Naive-Bayes & Markov independence assumptions (in-scope unification).

## F2 — `ml-exam-quiz.html`

### EMBEDDED missing datasets

- prac2020 Q28-30 (ranking cluster): full 8-point dataset {a,b,c,d,e,f,g,h with coords + labels} now inline in Q28; Q29 and Q30 reference the same dataset inline so a student can solve without a PDF.
- prac2020 Q36-37 (decision tree cluster): note added that the dataset is the practice-exam-B Feb 2020 12-instance binary table; Q37 stem now states which feature was removed (x1).

### NOT YET ADDRESSED (deferred)

- Adding explanations to F2's 200+ questions (audit recommends this; deferred — would require a much longer pass without changing answer keys).
- Embedding the exact 12-instance DT tables for the OTHER F2 clusters (resit-2024, final-2022, resit-2023, prac-2023). The DT clusters there still reference the dataset descriptively. The MOST critical (prac-2020 Q36) now points to the actual exam PDF and clarifies the answer is x1.

## F3 — `ml_exam_practice.html`

### FIXED EXPLANATION BUGS (all four bugs flagged in audit §5)

- exam-a Q11 (ranking errors): explanation rewritten to clearly enumerate (g,c) and (g,d) pairs → 2 errors. Answer corrected from `1` to `2`.
- exam-a Q12 (coverage matrix): explanation rewritten cleanly to "2 errors / 16 cells = 1/8" — removed self-contradicting "1/16... wait, 2/16" text.
- exam-a Q22 (Naive Bayes): replaced confusing self-correcting explanation with clean step-by-step. Both-words: Spam=3/16, Ham=1/16 → Spam. Neither: Spam=3/16, Ham=9/16 → Ham. Question stem also corrected to use consistent class-conditionals (p(meeting=T|Ham)=1/4, not 2/4).
- exam-a Q24 (SVM classify with w=[−3,2], b=2): both points x₁=(−1,0), x₂=(0,1) are POSITIVE (f=5 and f=4). Answer changed from `2` (q₁ neg, q₂ pos) to `0` (both positive). Explanation cleaned up — removed author's flagged confusion.
- resit-2024 Q26 (ranking errors): explanation rewritten with clear enumeration. Negatives g,d. Positives f,a,b,c,e. Only f(x₁=0) below d(x₁=1) → 1 error.

### EMBEDDED dataset

- resit-2024 Q35 (12-instance DT first-feature): full 12-row binary table embedded inline as a markdown table within the question stem. Explanation discusses entropy calculation and notes the PDF answer key gives x2.

### REPURPOSED tab

- The empty "2025 Final" tab (which previously showed "Coming Soon") has been replaced with a new "Mock C — Fresh Clusters" tab containing 5 application clusters with brand-new scenarios (none copied from past exams):
  - Cluster 1 (Ranking, 3 sub-Qs): fresh 8-point dataset, classifier x₁+x₂−5>0; rank, count errors, coverage proportion.
  - Cluster 2 (Naive Bayes, 3 sub-Qs): fresh 16-instance training counts; classify with smoothing, handle zero-count, compute Laplace-smoothed probability.
  - Cluster 3 (Decision Tree, 3 sub-Qs): fresh 8-instance binary dataset embedded as a table; first-feature selection, IG of B and C in left branch.
  - Cluster 4 (SVM, 3 sub-Qs): fresh w=(2,1), b=−4; identify support vectors, classify two new points, compute margin width.
  - Cluster 5 (ELBO fixed-pattern, 3 sub-Qs): explicit ELBO form, lower-bound proof, why VAE needs neural q_φ.

## F4 — `ml_exam_study_guide.html`

### ADDED cards

In `s-methodology` section:
- "Imbalanced classes — undersampling vs oversampling" card (covers duplicate-instances trap).
- "Categorical features — integer vs one-hot coding" card.
- "Probability foundations — sample/event space, frequentist/Bayesian/subjectivist" card.
- "Time-series & recommender quirks" card (walk-forward validation, cold-start problem).

In `s-linear` section:
- "Linear algebra basics — orthonormal basis" card (Q⁻¹ = Qᵀ).
- "Mean = L2 minimizer; Median = L1 minimizer" card.

## What was DEFERRED (and why)

1. **Embedding ALL 12-instance DT datasets in F2** for every exam variant (final-2022, resit-2023, resit-2024, prac-2023). The audit flagged this as a P0 issue; addressed for prac-2020 (the most ambiguous case) and resit-2024 (in F3). The other clusters still reference the dataset by description. Reason: would require careful per-PDF dataset transcription which risks introducing errors; decided to defer until human-verified against the answer-PDFs.
2. **Full F2 explanation pass.** F2 currently has zero explanations (`ans: <int>` only). Adding ~200 high-quality explanations is a multi-pass effort and would dwarf this iteration's scope.
3. **F3 redirect of all 4 original tabs to fresh content.** Audit recommends repurposing F3 entirely. We replaced the empty 5th tab with fresh clusters but kept the 4 original tabs (with bug fixes) so the student still has the exam-A/B/2024-resit drills. Repurposing the 4 verbatim tabs would lose existing study material; safer to add the new mock-C alongside.

## Notes for next iteration's auditor

- Verify the F3 exam-a Q11/Q12 ranking-error count (we set it to 2 errors / 1/8 coverage — please cross-check with the prac-A.answers PDF).
- Verify F3 exam-a Q24 (SVM classify) is now correctly `0` (both positive) per practice-exam-a.answers.pdf.
- Verify the F1 new ELBO/cold-start/orthonormal/4-tensor recall items match the past-exam answer keys.
- Consider whether to also remove the F1 Q on "diffusion model as hierarchical VAE" (it was rewritten to GAN/VAE connection — confirm in scope).
- F1's mock-exam index arrays (`mockExamDefs`) were preserved exactly; rewritten questions in `mockPool` retain their array positions, so all mock exams 1–20 still produce 40 questions each.

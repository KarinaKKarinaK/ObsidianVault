# ML Exam Practice Materials — Audit Iteration 1

Audit of the four self-made study HTMLs against the past-exam PDFs and lecture
slides in `/Users/karina/Documents/ObsidianVault/P5/ML10.0/`.

Files audited:
- F1 = `ML_review_website.html` (largest — 200-question pool + 20 mock exams)
- F2 = `ml-exam-quiz.html` (verbatim re-exam bank: prac2020/B, resit2024, final2022, resit2023, prac2023/B — 5 exams x ~40 q each)
- F3 = `ml_exam_practice.html` (4-tab smaller version: Practice Exam A, Practice Exam B, 2024 Resit, 2025 Final placeholder/empty)
- F4 = `ml_exam_study_guide.html` (no quiz — pure study notes/cheat-sheet)

---

## 1. Executive summary (top issues)

1. **Massive duplication between F2 and F3** — F3 is essentially a strict subset of F2, with only minor wording variations. ~85–90% of F3 questions appear identically in F2. This wastes a whole HTML.
2. **F2 is a near-verbatim copy of the past-exam PDFs**, including the Practice Exam B (Feb 2020), Resit 2024, Final 2022, Resit 2023, and Practice Exam B (Feb 2023). Every option list matches the PDF word-for-word. There is no fresh practice in F2 at all — it is digital re-typing of the PDFs.
3. **F1 is the only file with original content** but mixes good (cross-topic combination questions, application drills) with weak content (some "trivia" recall items like "What is RLHF" and "BERT's masked LM" that go beyond the actual VU course).
4. **At least 4 explanations in F3 are visibly wrong** (the explanation text contradicts itself or the assigned answer letter), e.g. exam-a Q12 (coverage matrix), Q22 (Naive Bayes spam), Q24 (SVM classification with w=[−3,2]).
5. **Several P0 coverage gaps** (topics that DO appear on past exams but are missing or weakly tested in the HTMLs):
   - **Probability foundations**: sample space vs. event space, frequentist vs. Bayesian vs. subjectivist (final-exam-2022 Q6, prac2020 Q10) — only F2 covers, no original questions exist.
   - **Categorical features**: integer vs. one-hot coding (resit-2024 Q7, final-2022 Q5) — F1 has no question on it at all.
   - **Undersampling/oversampling** (final-2022 Q4, resit-2023 Q6) — completely missing from F1; only in verbatim F2 copies.
   - **Soft-margin SVM as constrained → KKT/dual** (final-2022 Q8) — the conceptual question about the dual formulation is absent in F1.
   - **Cold-start problem** in recommenders (resit-2023 Q13) — only F2.
   - **Walk-forward validation** for time series (resit-2023 Q10) — F1 mentions the concept once in F4 but has no quiz question.
   - **Tensor representation of video as 4-tensor** (final-2022 Q23) — not tested anywhere except verbatim F2.
   - **Activation functions: purpose** (final-2022 Q9) — F1 has it conceptually but no clean MCQ.
   - **The basis-matrix orthonormality / inverse=transpose** (final-2022 Q17) — completely missing in F1.
   - **Mean as L2-distance minimizer** (resit-2024 Q18, resit-2023 Q18) — only in F2 verbatim.
6. **No application-question practice with FULL exam datasets** in F1's mock exams — the 12-instance decision-tree dataset, the 8-point ranking dataset, and the linear-SVM 2D point sets are described in F2/F3 questions only by reference to the past-exam PDF without the dataset being shown. A student running F2 on its own cannot actually answer questions like "which feature is chosen first" because the dataset was never included.
7. **The F3 "2025 Final" tab is a placeholder** ("Coming Soon") — useless slot.
8. **F1's mock exams 1–10 leave Application Type 6 (ELBO derivation fill-in-the-blanks) under-tested** — F1's ELBO questions are mostly conceptual (which factorisation, why is L a lower bound) rather than the fixed-pattern fill-in-the-blank derivation that ALL past exams use.
9. **No question in any HTML walks through a 2-D SVM "find the support vectors" problem with the geometric reasoning shown** — past exams (resit-2023 Q30, prac2023 Q26, exam-a Q23) do this pattern repeatedly but the HTMLs only test "which option is the support vector" without a worked-out method.
10. **Inconsistent answer-key/explanation quality** across F1, F2, F3 — F2 has no explanations at all (just `ans: <int>`); F3 has explanations but several are wrong; F1's explanations are mostly correct and substantive. F4 has no quiz to grade.

---

## 2. Duplication matrix

A matrix showing where the SAME (or near-identical) question appears in multiple files. "Same" = identical stem + identical option list (with at most cosmetic punctuation differences). "Near" = same scenario / same correct answer but rewritten.

| # | Topic | F1 (Review) | F2 (Quiz) | F3 (Practice) | Source PDF | Match |
|---|-------|:-:|:-:|:-:|:-:|---|
| 1 | "Most important rule — never judge on training data" | — | resit2024 Q1, resit2023 Q1, F3 exam-a Q2 | exam-a Q2, resit-2024 Q1 | resit-2024 PDF Q1, prac-A Q2 | **Same** |
| 2 | Offline vs. RL distinction | — | (impl. covered) | exam-a Q1 | prac-A Q1 | F3=PDF verbatim |
| 3 | k-NN with k=17 / Rob mistake | — | prac2020 Q7, prac2023 Q7 | exam-b Q7 | prac-A Q4-area, prac-B | F2=F3 same wording |
| 4 | Spam classifier deletes — class vs cost imbalance | — | prac2020 Q8, prac2023 Q8 | exam-b Q8 | prac-A, prac-B | **Same** |
| 5 | Maria + outliers (atonal music, John Cage) | — | prac2020 Q9, prac2023 Q9 | exam-b Q9 | prac-A, prac-B | **Same** |
| 6 | "Which is NOT a method to put features on same scale" (imputation) | — | (none direct) | exam-a Q5 | prac-A Q5 | F3=PDF |
| 7 | VAE differs from autoencoder — NOT one of them (discriminator) | F1 quiz Q (Generative Models) "Which model uses a discriminator?" | prac2020 Q20, resit2024 Q21, final2022 (none direct), resit2023 (none), prac2023 Q19 | exam-a Q6, exam-b Q19, resit-2024 Q21 | recurring on every exam | **Heavy duplication** — appears 5× across F2/F3 with same options |
| 8 | Bayes' rule with joint p(A,B) table | — | prac2020 Q10 | exam-a Q7 | prac-A | F3=F2 verbatim |
| 9 | Why GD hard in RL | F1 quiz no clean Q | prac2020 (none direct), resit2024 (no), prac2023 Q22 | exam-a Q8 | prac-A | F3=F2=PDF |
| 10 | Squared error loss reasons | — | (no direct) | exam-a Q9 | prac-A | F3=PDF |
| 11 | Entropy of p=(1/4,1/4,1/4,1/4) and q=(0,1/4,1/4,1/2) | — | prac2020 Q31 (different distribution!), prac2023 Q31 | exam-a Q13 | prac-A vs prac-B | **Different distributions across files** — F3 uses prac-A, F2 uses prac-B |
| 12 | Cross-entropy H(q,p) when q has zero | — | prac2020 Q32, prac2023 Q32 | exam-a Q14, Q15 | prac-A, prac-B | **Same** |
| 13 | f(x)=sin(sin(x)cos(x)) — local derivatives | — | (no direct) | exam-a Q16, Q17 | prac-A | F3=PDF |
| 14 | DT 12-instance dataset choose first feature | — | prac2020 Q36 (ans=A=x1), resit2024 Q34 (ans=B=x2), final2022 Q38 (ans=A), resit2023 Q37 (ans=D), prac2023 Q35 (ans=A) | exam-a Q18 (ans=C=x3), exam-b Q35 (ans=C) | recurring | **Inconsistent answer keys across files** — F2 prac2020 says x1, F3 says x3, both reference "12-instance dataset" without showing it |
| 15 | ELBO ⟨a⟩+⟨b⟩=ln p(x|θ) | — | prac2020 Q37, prac2023 Q37, F3 Q20 | exam-a Q20, exam-b Q37 | prac-A, prac-B | **Same** |
| 16 | EM algorithm — how it uses ELBO | — | prac2020 Q38 (impl.), prac2023 Q38 | exam-a Q21, exam-b Q38 | prac-A | **Same** |
| 17 | Naive Bayes spam (pill / meeting) | F1 has app-type version | — | exam-a Q22 | prac-A | F3 only — F1 has different version |
| 18 | SVM w=[-3,2], b=2 — find support vectors | — | (no direct match) | exam-a Q23 | prac-A | F3=PDF, F1 has different SVM |
| 19 | Soft-margin SVM advantages | F1 quiz Q (SVMs "soft margin advantage") | resit2024 Q20, resit2023 Q22 | exam-b/resit Q (Q19 of resit) | repeated | **Same options across files** |
| 20 | Markov "how about a meeting soon" classification | — | prac2020 (different email "how about"), prac2023 (same?), but final2022 (no), resit2024 ("pay your invoice") | exam-a Q26 | prac-A | F3=F2 verbatim |
| 21 | Markov model word counts → which class | — | resit2024 Q32 | (none in F3) | resit-2024 Q34 | F2=PDF |
| 22 | Self-attention combines RNN + Convolution | — | resit2024 Q22, prac2023 (no), resit2023 (no) | (none) | resit-2024 Q23 | F2=PDF only |
| 23 | Conditional GAN (colorize photographs) | F1 quiz Q | prac2020 Q18, resit2024 Q22-area, resit2023 (no), prac2023 Q17 | exam-a/b (Q17 in exam-b) | recurring | **Same wording everywhere** |
| 24 | "Which is NOT a method to prevent overfitting?" Boosting answer | — | final2022 Q24 | (none in F3) | final-2022 Q24 | F2=PDF only |
| 25 | "Tensor rank for color video" (4-tensor) | — | final2022 Q23 | (none) | final-2022 Q23 | F2=PDF only |
| 26 | Cold start problem | — | resit2023 Q13, final2022 Q26 | (none) | resit-2023, final-2022 | F2=PDF only |
| 27 | Walk-forward validation | — | resit2023 Q10 | (none) | resit-2023 | F2=PDF only |
| 28 | Sample space vs event space | — | prac2020 Q10 | (none) | prac-B 2020 | F2=PDF only |
| 29 | Frequentist vs Bayesian vs subjectivist | — | final2022 Q6 | (none) | final-2022 | F2=PDF only |
| 30 | Logistic regression cross-entropy formula −log(1−f(x)) for negative | — | prac2020 Q11 | (none) | prac-B 2020 | F2=PDF only |

**Summary of duplication:**
- **F2 vs PDFs**: 100% — F2 is just a re-typed digital version of all past exams.
- **F3 vs F2**: ~85% overlap — practically every F3 question is also in F2 with identical wording.
- **F1 vs F2/F3**: ~30% conceptual overlap, but F1 phrases differently and adds combination questions, so this is mostly acceptable.
- F4 has no quiz so no duplication.

**Conclusion**: F3 is redundant. F2 is the "exam-bank" file. F1 is the "study/drill" file. F3 should either (a) be deleted, or (b) repurposed for fresh, never-before-seen scenario questions (option B is recommended — see §6).

---

## 3. Style/difficulty match per file

### Past-exam style benchmark (from PDFs):
- **40 MCQs, 1 point each, 4 options A–D, 2-hour exam, closed book + formula sheet.**
- **Three sections, ~13 questions each:** Recall (1/3), Combination (1/3), Application (1/3).
- **Recall**: short, unambiguous, single-slide facts. Phrased plainly.
- **Combination**: usually phrased negatively ("which is NOT one of them?", "which is FALSE?"), or asks the student to combine two concepts (e.g., "what connects GANs and VAEs?").
- **Application**: 10 fixed types (gradient, ranking, entropy, scalar backprop, decision trees, ELBO, Naive Bayes, SVMs, Markov, matrix backprop). Each comes as a CLUSTER of 2–3 sub-questions sharing one dataset/model. Heavy on numeric computation, fractions, and step-by-step derivations.
- Application clusters always have a SHARED context block (a dataset, a function decomposition, a Markov model bigram table) followed by a sequence of dependent sub-questions.

### F1 — `ML_review_website.html`
| Aspect | Assessment |
|---|---|
| Format | MCQ 4-option ✓, with explanations ✓ |
| Difficulty mix | Reasonable: clearly tagged `recall` vs `app` vs `combination`. The 40-question mock exams loosely follow the 1/3-1/3-1/3 split. |
| **Application questions** | **Weak on the cluster pattern.** F1 has isolated app questions but does not present a single shared context for 3 dependent sub-questions. E.g., the past exams ALWAYS go: "Q31 entropy of p,q" → "Q32 cross-entropy" → "Q33 KL relationship" using the same p,q. F1 has just one entropy question per topic. |
| Length/depth | Some questions are too short (single-line stems), unlike past exams which often have a 4–6 line scenario setup. |
| Use of math notation | Good — uses ⊗, ∇, σ, etc. |
| **Out-of-scope content** | A FEW questions venture beyond the VU course: BERT masked LM, RLHF, diffusion models as hierarchical VAE, momentum, Adam, ResNet skip connections, Conv2D parameter counts, RBF/polynomial kernels, max pooling, PPL/perplexity, Gini impurity, Random Forest, Gradient Boosting, KKT multipliers/Lagrangian, multi-head attention, scaled dot-product attention division by √d. These do NOT appear in any of the past exams or in the slides for this course (the course covers Transformers more conceptually). They are correct but waste exam-prep time. |
| Mock exams 11–20 | Heavy emphasis on combination questions (10 per exam) — this is HIGHER than the real exam's ~13 combination/40 ratio. Good for stretch, but mark them as "stretch" not exam-typical. |

**Verdict for F1**: Style matches reasonably; difficulty is occasionally HIGHER than the actual exam (good for a hard practice). Main fix: add proper **application clusters** with shared datasets so students practise the multi-step pattern. Trim the out-of-scope items.

### F2 — `ml-exam-quiz.html`
| Aspect | Assessment |
|---|---|
| Format | MCQ 4-option ✓, NO explanations (only `ans` index). |
| Difficulty | Identical to past exam — because IT IS the past exam, retyped. |
| **Critical issue** | Application clusters reference datasets and function decompositions ("for the same classifier and dataset (Q28)…") **without ever presenting the dataset.** A student opening F2 to do prac2020 Q28 cannot answer because the 8-point dataset is described only inside the question text in some entries (the prac2023 version shows it) but missing in others (prac2020 Q28 just says "for the dataset"). |
| Decision tree application | Same issue — "for the 12-instance decision tree dataset with features x1–x4" is referenced but the dataset itself is never embedded in F2. |
| Quality of options | Identical to PDFs, so high — but typing-error risk is real. Spot check: prac2020 Q31 entropy question uses different p,q than the actual prac-B PDF? Need verification. |

**Verdict for F2**: Functions as a reference exam-bank. Two fixes are urgent:
1. **Embed the missing datasets** (the 8-point ranking dataset, the 12-instance DT dataset, the SVM 2D points) inline in EVERY application cluster.
2. **Add explanations** for at least the application questions — currently a wrong answer just says "incorrect" with no learning value.

### F3 — `ml_exam_practice.html`
| Aspect | Assessment |
|---|---|
| Format | MCQ 4-option ✓, with explanations ✓. |
| Difficulty | Same as F2 (drawn from same past exams). |
| **Errors in explanations** | At least 4 visible: |
| → exam-a Q12 (coverage matrix) | Stem: "Coverage matrix size = 4 positives × 4 negatives = 16 cells. Ranking errors = 1 (pair g,d). Proportion = 1/16... wait, actually 2/16 = 1/8." — explanation visibly contradicts itself. The correct answer (1/8) implies 2 errors but the previous question said 1 error. **Internally inconsistent.** |
| → exam-a Q22 (NB spam) | Explanation contradicts itself: "Both: Spam=3/16 > Ham=1/16 → Spam... wait let me recheck... p(meeting=T|Ham)=2/4 not 1/4". The numbers in the explanation don't match the question. |
| → exam-a Q24 (SVM classify x₁=(−1,0),x₂=(0,1) with w=[-3,2],b=2) | Explanation: "Both are positive... but the answer key says C... Going with C as per exam key." — author flagged their own confusion. Either the question or the answer is wrong. |
| → resit-2024 ranking Q26 (ranking errors count) | Explanation: "Only pair f(0)–d(1)... that's 1 ranking error." but the answer is "1" while another question with the same data says "0" — internally inconsistent. |
| **2025 Final tab** | Empty placeholder ("Coming Soon"). |

**Verdict for F3**: Mostly redundant with F2 + has explanation bugs. Either delete or repurpose with fresh content (preferred).

### F4 — `ml_exam_study_guide.html`
| Aspect | Assessment |
|---|---|
| Format | NOT a quiz — pure study notes / cheat sheet structured by topic. |
| Quality | Strong. Organized by topic, with formulas, traps, and step-by-step procedures. |
| Coverage | Comprehensive across the 10 application types and the major recall/combination topics. |
| Issue | A few statements are slightly imprecise: "L1 regularization adds |w| penalty → sparse weights" (correct but misses Laplace prior connection), "F1 quick-fire 'which is NOT' traps" lists "Cost imbalance ≠ class imbalance" — good. |
| Missing topics in F4 | Frequentist vs. Bayesian vs. subjectivist (mentioned in passing); cold-start problem; walk-forward validation; sample-space vs. event-space; one-hot vs. integer coding; orthonormal basis; Gaussian Mixture Models. |

**Verdict for F4**: Keep as-is, BUT extend the missing topics above. Add one section on "Probability foundations" (sample/event space, frequentist/Bayesian/subjectivist), and one section on "Time-series & recommender quirks" (walk-forward, cold start).

---

## 4. Coverage table — lecture-by-lecture

P0 = topic appears on past exams AND missing/weak in HTMLs (highest priority)
P1 = topic in lectures but missing in HTMLs (important even if not yet on past exams)
P2 = topic in lectures, weakly covered in HTMLs

| Lecture | Key topic | Covered in quizzes? | Where (file + Q ref) | Severity |
|---|---|---|---|---|
| **22.Methodology2** | Train/val/test split + Rob k=17 mistake | Yes | F2 prac2020 Q7, prac2023 Q7; F3 exam-b Q7 | OK |
| | Cost imbalance vs. class imbalance | Yes | F2 prac2020 Q8; F3 exam-b Q8; F1 has trap-list mention only | OK |
| | Outliers (Maria 4'33") | Yes | F2 prac2020 Q9; F3 exam-b Q9 | OK |
| | Imputation NOT a normalization method | Yes | F3 exam-a Q5 (verbatim) | OK |
| | **Undersampling vs. oversampling** | Only F2 verbatim copy | F2 final2022 Q4, resit2023 Q6 | **P0** — never asked in F1 originally |
| | **One-hot vs. integer coding** | Only F2 verbatim copy | F2 final2022 Q5, resit2024 Q7 | **P0** |
| | **Frequentist / Bayesian / subjectivist probability** | Only F2 verbatim copy | F2 final2022 Q6 | **P0** |
| | **Sample space vs. event space (die example)** | Only F2 verbatim copy | F2 prac2020 Q10 | **P0** |
| | Confusion matrix — bias not computable | Yes | F2 prac2020/F3 exam-b Q9, resit-2024 Q16 | OK |
| | ROC AUC requires a ranker | Yes | F1 Q (Evaluation), F3 exam-a Q3 | OK |
| | Coverage matrix definition | Yes | F1, F2, F3 application clusters | OK |
| | Multiple testing | Mentioned only | F4 only | P2 |
| | k-fold CV / stratified split | F1 only (combination Q) | F1 Methodology Q | P2 |
| | Distribution shift / concept drift | F1 only | F1 Methodology Q | P2 (out-of-VU but useful) |
| | **Walk-forward validation for time series** | Only F2 verbatim | F2 resit2023 Q10 | **P0** |
| **31.ProbabilisticModels1** | Bayes' rule p(A|B) on joint table | Yes | F2 prac2020 Q10; F3 exam-a Q7 | OK |
| | Naive Bayes "naive" = conditional independence | Yes | F1, F2, F3, F4 all cover | OK |
| | Naive Bayes computation cluster (with smoothing) | Yes (but F1 only single Q, no cluster) | F1 has 2 Qs total; F2 prac-A cluster present | P1 — F1 lacks the multi-Q cluster |
| | Laplace smoothing — pseudo-obs count for binary 2-feature 2-class | Yes | F2 final2022 Q20 | OK |
| | Prior class prob / prosecutor's fallacy | F4 mention only | F4 study guide | P2 |
| | Sample space vs event space | Only F2 | (see above) | **P0** |
| **32.LinearModels2** | Logistic regression cross-entropy = −log(1−f(x)) for neg | Only F2 | F2 prac2020 Q11 | **P0** |
| | Sigmoid + cross-entropy gradient = (ŷ−y)x | F1 Q (Naive Bayes/cross-entropy) | F1 has it | OK |
| | Squared error reasons / why not for classification | Yes | F3 exam-a Q9 (verbatim) | OK |
| | Hinge loss properties | F1 has 2 Qs | F1 SVM section, mock 11+ | OK |
| | MLE → least squares (Gaussian errors) | F1 has it | F1 combination Q + F4 connection box | OK |
| | Log-likelihood preferred over likelihood | Yes | F2 final2022 Q21 | OK |
| | Two forms of squared error (½ vs full) | Only F2 | F2 final2022 Q16 | P1 |
| | **Orthonormal basis advantage (inverse=transpose)** | Only F2 | F2 final2022 Q17 | **P0** |
| | Logistic regression vs SVM common property (focus on points near boundary) | Only F2 | F2 final2022 Q19 | P1 |
| | Polynomial regression (Jim adds x²) | Only F2 | F2 resit2023 Q16 | P1 |
| | **Mean is sensitive to outliers (L2 minimizer)** | Only F2 | F2 resit2024 Q18, resit2023 Q18 | **P0** |
| **41.DeepLearning1** | Perceptron chaining = still linear | Yes | F2, F3 exam-b Q11 | OK |
| | Activation functions purpose | Only F2 | F2 final2022 Q9 | P1 |
| | ReLU vs sigmoid vanishing gradient | Yes | F1, F2, F3, F4 all cover | OK |
| | Dropout — randomly disable nodes | Yes | F1, F2, F3 all cover | OK |
| | Batch normalization | Yes | F1 (T6), F2 prac2020 Q25 | OK |
| | Lazy vs eager execution | Yes | F1, F2, F3 (verbatim from past exams) | OK |
| | Multivariate chain rule | Yes | F1 (gradient mock), F2 resit2024 Q19 | OK |
| | Tensor representation of color video (4-tensor) | Only F2 | F2 final2022 Q23 | **P0** |
| | Why not full Jacobian — VJPs | Yes | F1, F2, F3 all cover | OK |
| | Cross-entropy vs MSE for classification | F1 only | F1 T6 Q | OK |
| | Two-layer NN with no activation = linear | Only F2 | F2 resit2023 Q19 | P1 |
| **51.DeepLearning2** | L1 regularization needs continuous params | F1 + F4 | F1, F4 | OK |
| | Max-margin SVM, soft margin | Yes | F1 (T5), F2, F3 | OK |
| | Soft margin = unconstrained / KKT dual / kernel trick | Only F2 | F2 final2022 Q8 | **P0** |
| | Gradient methods (SGD/minibatch/full-batch) | F1 + F4 | OK | |
| | Saddle points in high-D | F1 only | F1 T2 Q | OK (out-of-VU but useful) |
| **52.Trees** | ID3 algorithm + IG | Yes | F1, F2, F3, F4 all cover | OK |
| | DT 12-instance dataset cluster | Verbatim only | F2 prac2020 Q36-37, resit2024 Q34, etc. — **DATASET NOT EMBEDDED** | **P0** for F2 |
| | Information gain shortcut (just min weighted post-split entropy) | F4 only | F4 study guide | P2 |
| | Pruning vs. max-depth vs. L1/L2 | Yes | F1 (T9), F2 (recurring) | OK |
| | "Decision tree on numeric features can split on same feature again" | Only F2 | F2 final2022 Q13 | P1 |
| | Random Forest / Gradient Boosting | F1 only — out of scope per actual VU exams | F1 mock 11–20 combination Qs | P2 (could be removed) |
| **61.SequentialModels** | Markov assumption (LSTM doesn't make it) | Yes | F1, F2 resit2024 Q10, F4 | OK |
| | First-order Markov classification cluster | Yes | F2 prac-A, prac-B, resit2023 clusters | OK (verbatim) |
| | LSTM gates (input/forget/output) | F1 + F4 | F1, F4 | OK |
| | n-gram smoothing | F1 only | F1 mock 11+ | OK |
| | RNNs vanishing gradient | F1 + F4 | OK | |
| | **Cold start problem** | Only F2 | F2 resit2023 Q13, final2022 Q26 | **P0** |
| | Walk-forward validation | Only F2 | F2 resit2023 Q10 | **P0** |
| | Recommender systems implicit feedback | Yes | F1, F2, F3 all cover | OK |
| | Word2Vec / matrix factorization | Yes | F1, F2, F3 | OK |
| **62.Matrices** | Matrix backprop b∇=y∇, x∇=y∇W, W∇=outer | Yes | F1 (T8), F2 application clusters, F4 | OK |
| | Element-wise function backprop (ReLU mask) | F1 only | F1 T8 Q | OK |
| | y = x ⊗ v + b derivative | Only F2 | F2 final2022 Q35 | P1 |
| | y = 2x^(1/2)+b derivative cluster | Only F2 | F2 resit2024 Q39-40 | P1 |
| | f(x,y) = xᵀWy bilinear | Only F2 | F2 resit2023 Q35 | P1 |
| **71.ReinforcementLearning** | Why GD hard in RL (non-diff reward step) | Yes | F1, F2, F3 | OK |
| | Exploration vs. exploitation | Yes | F1, F2, F3, F4 | OK |
| | Q-learning, value function, TD error | F1 only (T10/mock 11+) | F1 | OK (combination/stretch) |
| | Policy gradient REINFORCE | F1 only | F1 mock 11+ | OK |
| | Discount factor γ | F1 only | F1 mock 11+ | OK |
| | RLHF (modern LLM training) | F1 only — likely out-of-scope | F1 Sequential | P2 (may overlap with VU "instruction tuning") |
| **72.Review** | 10 application types overview | F4 lists them | F4 study guide | OK |
| | Common calculation mistakes | F4 lists them | F4 | OK |
| **Transformers** | Self-attention combines RNN + Conv | Yes | F2 resit2024 Q23 | OK |
| | Q,K,V projection meaning | F1 only (out-of-VU detail) | F1 mock 11+ | P2 |
| | Positional encoding | F1 only | F1 mock 11+ | P2 |
| | Multi-head attention | F1 only | F1 mock 11+ | P2 (likely out-of-VU) |
| | Cross-attention | F1 only | F1 mock 11+ | P2 |
| | √d scaling in attention | F1 only | F1 mock 11+ | P2 (out-of-VU) |
| **Generative models** | VAE differs from autoencoder (NOT discriminator) | Yes (5×!) | F1, F2 prac2020/resit2024/prac2023, F3, F4 | OK (over-covered) |
| | ELBO derivation (fill-in fixed pattern) | Conceptual only in F1 | F1 has 2 ELBO Qs but NOT the past-exam fill-in pattern | **P0** — every exam has the fill-in pattern, missing as a clean cluster |
| | EM algorithm | F1 + F2 | F1 T9, F2 prac-A | OK |
| | GAN mode collapse | Yes | F1, F2, F3 | OK |
| | Conditional GAN (colorization) | Yes | F1, F2, F3, F4 | OK (over-covered) |
| | CycleGAN | F1 + F4 mention | OK | |
| | StyleGAN | F1 mention | P2 | |
| | Reparameterisation trick | F1 only | F1 T7 + mock 11+ | OK |
| | KL term posterior collapse | F1 mock 11+ | F1 | OK |
| | GMM for classification | Only F2 | F2 resit2023 Q23 | P1 |
| | Connection between GAN and VAE | Only F2 | F2 resit2023 Q24 | P1 |
| **machine-learning-lecture-notes-intro** | Classification vs. regression | F2 only | F2 final2022 Q1 | P1 |
| | Supervised method identification | Yes | F1, F2 | OK |
| | Unsupervised method identification | Yes | F1, F2, F3 | OK |
| | Bias/variance | Yes | F1, F2 resit2024 Q15 | OK |
| | Ensemble cannot fix training time | Yes | F1, F2 | OK |
| **cheat-sheet** | All formulas | F4 mostly covers | OK | |

**P0 gaps summary** (must-fix for full mastery):
1. Undersampling/oversampling
2. One-hot vs integer coding
3. Frequentist/Bayesian/subjectivist probability
4. Sample space vs. event space
5. Walk-forward validation
6. Logistic-regression cross-entropy formula (negative class case)
7. Orthonormal basis advantage
8. Mean as L2 minimizer
9. Tensor rank for color video
10. Soft-margin SVM unconstrained / dual / KKT / kernel trick
11. Cold-start problem
12. Decision-tree datasets must be embedded inline in F2
13. ELBO fill-in-the-blanks application cluster

---

## 5. Question-quality issues per file

### F1 — `ML_review_website.html`
- **Q "Which model uses a discriminator?"** is too easy and overlaps with the `VAE differs from autoencoder` question 3 cells away in the same quiz.
- **Mock-exam app question on Markov spam (line 985)** has fractions that don't divide cleanly to the option `3/5·10⁻³` — student-facing math is messy.
- **Combination Q on Naive Bayes vs. Logistic Regression with infinite data** cites Ng & Jordan 2002 — useful background but stems from an academic paper not the VU course.
- **Several mock-11–20 questions venture into BERT, RLHF, diffusion, momentum, Adam, scaled attention** — these are not VU course material based on the lecture-slide titles. Out-of-scope.
- **Application Type 6 (ELBO fill-in)** has no proper cluster — the past-exam pattern of "what should ⟨a⟩ be" with 4 numerator/denominator options is not implemented as a fill-in question that mirrors the actual past-exam format.
- **No application cluster for SVMs** with a worked example (find the support vectors → classify two new points) using a fresh 2-D dataset.

### F2 — `ml-exam-quiz.html`
- **Datasets are not embedded inline** for the application clusters. E.g., prac2020 Q28 says "for the dataset and linear classifier c(x₁,x₂) = Pos if x₁ + 0·x₂ + 2 > 0" but the 8-point Pos/Neg dataset (a–h) is not shown to the student. Same for the 12-instance decision-tree question.
- **No explanations at all** (`ans: 0` only). Wrong answers give the student no learning value.
- Verbatim from PDFs means typing-error risk: e.g., `H(p) = 2.25, H(q) = 1.75` answer for prac2020 Q31 is correct, but the entire row of options needs visual verification against the PDF.
- **F2 prac2020 Q36** says answer is x1 (ans: 0) but the same dataset in F2 prac2023 Q35 also says x1 (ans: 0) and F3 exam-a Q18 says x3 (ans: 2). One of these is wrong, or they are different datasets that look similar — a student cannot tell. **Resolve with reference to the PDFs.**
- **prac2020 Q27** ("Boosting in research") is fine but identical wording appears in resit2024 (no), final2022 (no — but Q24), prac2023 — duplication redundant within F2.

### F3 — `ml_exam_practice.html`
- **exam-a Q12 (coverage matrix)**: Explanation contains "1/16... wait, actually 2/16 = 1/8" — the explanation visibly contradicts the previous question's answer. Bug.
- **exam-a Q22 (Naive Bayes spam)**: Explanation visibly self-corrects mid-text, refers to numbers that do not match the question stem. Bug.
- **exam-a Q24 (SVM classify x₁=(−1,0), x₂=(0,1) with w=[−3,2], b=2)**: The explanation says "Both positive… but the answer key says C… Going with C as per exam key." The author flagged their own confusion. Either the question, the option list, or the answer is WRONG. Verify against prac-A PDF.
- **resit-2024 Q26 (ranking errors)**: Explanation says "Only f(0)−d(1)... that's 1 ranking error" but a sibling question (Q25) says ranking is "g f d a c b e" — meaning d=1 is at index 2, f=0 is at index 1. f is positive, d is negative; if d is ranked AFTER f, that's the error pair. The math is correct but the explanation phrasing is confusing.
- **2025 Final tab is empty**.
- **Several questions in F3 reference data not shown** (same problem as F2): e.g., exam-a Q18 "Dataset for predicting y from binary features x1,x2,x3,x4: [12 instances]" — actually IS embedded here, but other clusters like decision-tree resit Q35 say "(See full dataset in resit exam, 12 instances)" — explicitly referring to an external PDF. Fix this.

### F4 — `ml_exam_study_guide.html`
- No quiz, so no answer-key bugs.
- A few minor overstatements:
  - "Boosting reduces bias" — true but misleading without "AND can also reduce variance through ensemble averaging in practice"
  - "L1/L2 can't apply to trees" — correct in the discrete-model-space sense, but recent gradient boosting tree libraries DO use L1/L2 on leaf values.
- **Missing topics** (per coverage table): probability foundations, walk-forward, cold start, orthonormal basis, integer/one-hot coding.

---

## 6. Concrete improvement instructions for the next agent

Below is a **file-by-file plan** the next agent can implement directly. For new questions I include rough difficulty, style, and a suggested option set / correct answer where useful.

### General principles to apply across all files

1. **Embed every dataset inline** in any application-cluster question. Never reference "see PDF" or "the same dataset".
2. **Always include explanations** for application questions (the multi-step computation is the learning value).
3. **Separate "exam-typical" from "stretch"** content. Tag mock exams 11–20 in F1 explicitly as "stretch — beyond past exams". Trim items that appear nowhere in 22.Methodology2 through 72.Review.

### F1 — `ML_review_website.html` (the primary drill file)

**Add (P0 priority — see coverage gaps):**
1. **Recall block on Methodology** — add 4 questions:
   - "What separates undersampling from oversampling? Which leads to duplicate instances?" (4-option, answer: oversampling leads to duplicates) — modeled on final-2022 Q4.
   - "Integer coding vs. one-hot coding — which is true?" (answer: one-hot always turns one categoric feature into multiple numeric features) — modeled on final-2022 Q5.
   - "A statement about probability of a specific quantity being true: which interpretation rejects this?" (answer: strict frequentist) — modeled on final-2022 Q6.
   - "Sample space vs. event space when rolling a die" (answer: 'rolling an even number' is in event space, 'rolling a 1' is in sample space) — modeled on prac-B 2020 Q10.
2. **Recall block on Linear Models** — add 3 questions:
   - "If x has the negative class and our logistic regression predicts σ(wx+b), what is the cross-entropy loss for this single example?" (answer: −log(1 − f(x))) — modeled on prac-B 2020 Q11.
   - "Why is the inverse of an orthonormal basis matrix equal to its transpose?" — modeled on final-2022 Q17.
   - "The mean is sensitive to outliers. Why?" (answer: because it minimizes squared distances) — modeled on resit-2024 Q18.
3. **Add a tensor-rank question**: "We want to represent color videos as a tensor. What rank?" (answer: 4 — frames × H × W × channels) — modeled on final-2022 Q23.
4. **Add a soft-margin SVM dual/KKT question**: "The soft-margin SVM is constrained. Rewriting using KKT multipliers allows what?" (answer: kernel trick) — modeled on final-2022 Q8.
5. **Add a recommender-systems cold-start question**: "What is the cold start problem?" (answer: new user/item with no rating history → no embedding) — modeled on resit-2023 Q13.
6. **Add a walk-forward validation question** for time-series — modeled on resit-2023 Q10.

**Add proper APPLICATION CLUSTERS (P0):**
Each cluster = a shared dataset + 3 dependent sub-questions, mirroring past-exam format.

7. **Cluster: Find a ranking + ranking errors + coverage** with a fresh 2-D dataset. Suggest a dataset like:
   ```
   a(1,2,Neg), b(3,1,Neg), c(2,3,Pos), d(4,2,Pos), e(1,4,Neg), f(5,5,Pos), g(2,1,Neg), h(4,4,Pos)
   Classifier: Pos if x₁ + x₂ − 5 > 0
   ```
   Q1: ranking from most-Neg to most-Pos. Q2: # ranking errors. Q3: coverage proportion.

8. **Cluster: Naive Bayes** with fresh 4-feature dataset and 2 classes; require Q1: classify with no smoothing, Q2: classify after Laplace smoothing, Q3: how many pseudo-observations to add.

9. **Cluster: Markov text classification** with fresh email + bigram counts table; Q1: classify email, Q2: probability of spam, Q3: probability ratio.

10. **Cluster: SVM 2-D** — give w, b, and 4 candidate points; Q1: which are support vectors, Q2: classify two new test points, Q3: compute the margin width.

11. **Cluster: Scalar backpropagation** — fresh function (e.g., f(x) = sin(x²)·e^x); Q1: identify required local derivatives, Q2: compute ∂f/∂x symbolically.

12. **Cluster: ELBO fill-in-the-blank** with the fixed VU pattern:
    ```
    L(q,θ) + KL(q,p) = ⟨a⟩ + ⟨b⟩ = ln p(x|θ)
    ```
    Q1: what is ⟨a⟩? (4 options on numerator/denominator) — modeled exactly on prac-B 2020 Q37.
    Q2: How is this used in EM?
    Q3: How is this used in VAE? (approximation step needed because true posterior is intractable)

13. **Cluster: Decision tree** — embed a fresh 8-instance binary dataset with 4 binary features (so the dataset is small and computable). Q1: which feature first? Q2: after removing that, which next? Q3: what is the information gain of feature X in the post-first-split branch?

14. **Cluster: Matrix backprop** — fresh module (e.g., y = x ⊙ v + b); Q1: compute ∂yᵢ/∂xⱼ; Q2: given upstream y∇, return x∇; Q3: given upstream y∇, return v∇.

**Remove (out-of-scope):**
- "BERT masked language modelling" combination Q (line ~1345)
- "RLHF" Q (line ~1218)
- "Diffusion model as hierarchical VAE" Q (line ~1360)
- "Adam outperforms SGD" Q (line ~1274)
- "Conv2D parameter count" Q (line ~1273)
- "Receptive field" Q (line ~1276)
- "Batch size in SGD" Q (line ~1277)
- "Skip connections in ResNet" Q (line ~1178)
- "Multi-head attention" Q (line ~1315)
- "Scaled dot-product √d division" Q (line ~1319)
- "PPL / perplexity" Q (line ~1300)
- "Gini impurity formula" Q (line ~1303) — keep info-gain only
- "Random Forest / Gradient Boosting" Qs (lines ~1305, 1306) — keep boosting concept only
- "RBF / polynomial kernel" detail Qs (line ~1264, 1267) — keep just "kernel trick" general idea
- "Softmax temperature limit" Q (line ~1334)

**Rewrite (errors / unclear):**
- F1 Markov mock Q line ~985: rewrite the fractions so options compute cleanly.
- F1 mock-11 line ~1342: smoothed bigram p("ran"|"cat") = 2/7 — verify the count of "cat" is 2; if "cat" appears as a head twice in "the cat sat the cat ran the dog ran" then yes. OK.

### F2 — `ml-exam-quiz.html` (verbatim past-exam bank)

**Critical fixes:**

1. **Embed datasets inline** in every application cluster. Specifically:
   - prac2020 Q28-30, prac2023 Q28-30: embed the 8-point ranking dataset {a(0,1,Neg), b(2,2,Neg), c(1,4,Neg), d(2,5,Neg) [or d(4,5,Neg) for the Feb-2020 version], e(3,6,Pos), f(6,8,Pos), g(5,3,Pos), h(8,7,Pos)}.
   - resit2024 Q26-28: embed {a(2,5,Pos), b(4,2,Pos), c(3,1,Pos), d(1,4,Neg), e(5,5,Pos), f(0,6,Pos), g(−3,−7,Neg)}.
   - final2022 Q31-33: embed {g(1,1), a(2,8), b(3,7), c(5,6), d(6,5), e(8,4), f(9,2)} with classifier c(x₁,x₂)=Pos if x₁−0·x₂>2.
   - resit2023 Q26-28: embed {c(3,1,Pos), b(2,2,Pos), a(1,3,Pos), d(6,4,Neg), e(5,5,Pos), f(4,6,Pos), g(7,7,Pos)} with classifier Pos if −0·x₁+x₂>−2.
   - All decision-tree application clusters: embed the actual 12-instance binary dataset (different across exams — use the exact one from each PDF).

2. **Add explanations** for every question, drawing from the answer keys in the corresponding PDFs and from F1's better-quality explanations where overlap exists.

3. **Verify the inconsistent decision-tree-first-feature answer keys**:
   - prac2020 Q36 (ans: x1) vs. F3 exam-a Q18 (ans: x3) — these are likely DIFFERENT datasets even though F2's question text is ambiguous. Re-check against `practice-exam-a.answers (4).pdf` and `practice-exam-b.answers (1).pdf` and label clearly.

4. **Add a 6th tab** to F2: blank "Final 2025" (or rename if real) — for now leave as TBD with note.

### F3 — `ml_exam_practice.html` (currently redundant)

**Recommended: REPURPOSE rather than delete.** Make F3 the home of fresh, never-seen scenario questions that test the same patterns but with different numbers, so the student practises beyond memorization.

**Steps:**

1. **Empty all current tabs** (which are duplicates of F2) and replace with 4 fresh "mock-style" tabs:
   - "Mock A — All recall, fresh wording"
   - "Mock B — All combination, fresh wording"
   - "Mock C — All application, fresh datasets"
   - "Mock D — Mixed mock 40-Q, exam-style"
2. **For Mock C (all application)**, use the cluster format described in F1 §6 above (12 clusters × ~3 sub-Qs = ~36 Qs, plus 4 stretch combination Qs).
3. **Fix the four explanation bugs** identified in §5 above before any new content is added:
   - exam-a Q12 coverage matrix
   - exam-a Q22 NB
   - exam-a Q24 SVM classify
   - resit-2024 Q26 ranking errors
4. **Remove the "2025 Final" empty tab** (or fill it — but only if real questions are available).

### F4 — `ml_exam_study_guide.html` (study notes — keep + extend)

1. Add a "Probability foundations" mini-section under §4 (Naive Bayes & Entropy):
   - Sample space vs. event space (with die example).
   - Frequentist / Bayesian / subjectivist views with the "probability that the mean Italian woman's height < 2m" example.

2. Add "Categorical features" subsection under §1 (Methodology):
   - Integer coding (1 numeric column) vs. one-hot (k columns).
   - When each becomes inefficient.

3. Add "Imbalanced classes" subsection under §1:
   - Undersampling (no duplicates) vs. oversampling (creates duplicates).
   - Why cost imbalance is different.
   - Stratified splits.

4. Add "Time-series & recommender quirks" mini-section:
   - Walk-forward validation.
   - Cold-start problem (new user/item).

5. Add "Linear algebra basics" mini-section under §2 (Linear models):
   - Orthonormal basis: inverse = transpose.
   - Why this is useful (whitening, fast inversion, etc.).

6. Refine the "common traps" list in §10 to flag:
   - Mean = L2 minimizer; median = L1 minimizer.
   - Log-loss = binary cross-entropy H(p,q) — direction matters.

### Additional cross-file fixes

1. **Tag every question** with the lecture it tests (e.g., `lecture: 22.Methodology2`). This lets the student filter to weak-area review.
2. **Fix "12-instance decision-tree dataset" datasets**: ensure the dataset shown in each tab corresponds to the right past exam (prac-B Feb 2020 has a different dataset than prac-B Feb 2023, even though both ask "which feature first"). Verify by reading `week6.answers.pdf` (which uses the dog/Bites dataset for ID3) and the prac-A/B answer PDFs.
3. **Add a "10-question application drill" mode** (separate from the mock exam mode) — random clusters with timer. This is the highest-ROI practice for the application questions.

---

## Closing notes

- **F2 + F4 are usable today**, with the caveat that F2 is missing datasets and explanations (high priority to fix).
- **F1 has the most original content** and is the right place to grow the question bank for cross-topic combination questions and richer application drills.
- **F3 is currently redundant** and should be repurposed.
- **The biggest single payoff for full mastery** is filling the P0 application gaps (proper ELBO fill-in cluster, embedded DT datasets, embedded SVM datasets, walk-forward, cold start) and the P0 recall gaps (one-hot coding, undersampling, sample/event space, frequentist/Bayesian, orthonormal basis, mean/L2, video-as-4-tensor).

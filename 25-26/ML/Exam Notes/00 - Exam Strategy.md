# Exam Strategy

## Exam Format
- **40 multiple choice questions**, 1 point each
- **2 hours** — ~3 min per question
- **Pass mark**: exam + quizzes >= 52 points
- **Allowed**: calculator/graphical calculator, formula sheet with handwritten cheat sheet box
- **Not allowed**: phone, other materials

## Question Distribution (~1/3 each)

### Recall Questions (Q1–Q12ish)
- Simple facts from a single slide
- **Never trick questions** — if it seems easy, it probably is
- Strategy: review every slide once, know definitions precisely

### Combination Questions (Q13–Q25ish)
- Combine info from different lectures
- Often phrased **negatively** ("Which is NOT...")
- May include common **misconceptions** as distractors
- Strategy: read ALL options carefully, watch for "not"/"false" framing

### Application Questions (Q26–Q40)
- **Most difficult but most predictable** — fixed patterns every year
- 10 possible types, exam picks ~5–6 of them (2–3 questions each)
- Strategy: **practice all 10 types until automatic**

## The 10 Application Question Types

| #   | Type                        | Appears in             | Frequency        |
| --- | --------------------------- | ---------------------- | ---------------- |
| 1   | Find the gradient           | Practice A             | Common           |
| 2   | Find a ranking              | All 4 exams            | **Every exam**   |
| 3   | Entropy / cross-entropy     | All 4 exams            | **Every exam**   |
| 4   | Scalar backpropagation      | All 4 exams            | **Every exam**   |
| 5   | Decision trees              | All 4 exams            | **Every exam**   |
| 6   | Evidence lower bound (ELBO) | Practice A, Practice B | Sometimes        |
| 7   | Naive Bayes                 | Practice A             | Sometimes        |
| 8   | Support vector machines     | Practice A, Practice B | Sometimes        |
| 9   | Markov models               | 2024, 2025             | **Recent exams** |
| 10  | Matrix backpropagation      | 2024, 2025             | **Recent exams** |

## What Appeared on Each Exam

| Type | Practice B | 2024 | 2025 |
|------|-----------|------|------|
| Ranking | Q28–30 | Q26–28 | Q26–28 |
| Backprop | Q34–35 | Q29–30 | Q29–30 |
| Entropy | Q31–33 | Q31–32 | Q31–32 |
| Decision trees | Q36–37 | Q36–38 | Q36–38 |
| ELBO | Q38–39 | — | — |
| SVM | Q26–27 | — | — |
| Markov model | — | Q33–35 | Q33–35 |
| Matrix backprop | — | Q39–40 | Q39–40 |

## Time Management Strategy
1. **First pass (60 min)**: Answer all recall/combination questions + easy application questions
2. **Second pass (45 min)**: Work through remaining application questions
3. **Final pass (15 min)**: Review flagged questions, check for sign errors in entropy/backprop

## Common Pitfalls
> [!warning] Top Mistakes
> - **Sign errors in entropy** — compute $-H$ first (positive sum), then negate
> - **Ranking errors are PAIRS**, not individual misclassifications — a dataset of 5 instances can have up to 10 ranking errors
> - **Coverage matrix proportion** = ranking errors / (num_pos x num_neg)
> - **Cross-entropy argument order**: $H(p,q) = -\sum p(x)\log q(x)$ — $p$ is the "true" distribution, $q$ goes inside the log
> - **0 log 0 = 0** in entropy, but **log 0 is undefined** otherwise (matters for cross-entropy!)
> - **Naive Bayes**: check your work — all 4 answer options are usually possible outcomes
> - **SVM support vectors**: $y_i(\mathbf{w}^T\mathbf{x}_i + b) = 1$, not just close to boundary
> - **Backprop**: use multivariate chain rule when x affects f through multiple paths — **sum** the contributions

## Tips from Practice Exam A
- Application questions follow a **fixed pattern** — you can create your own practice
- Focus on **recall + application** questions for passing
- Don't suspect trick questions when something seems too easy
- Practice enough to answer **quickly AND accurately**

See also: [[06 - Application Question Cookbook]]

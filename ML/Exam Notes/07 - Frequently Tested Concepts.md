# Frequently Tested Concepts

> [!info] Cross-exam analysis of what appears **repeatedly** across Practice A, Practice B, 2024, and 2025.

See also: [[00 - Exam Strategy]], [[06 - Application Question Cookbook]]

---

## Concepts Tested on Every Exam (4/4)

### Ranking Errors & Coverage
- Ranking error = **pair** (pos, neg) where neg ranked more positive
- Coverage = ranking errors / (num_pos × num_neg)
- Always uses a linear classifier; often one feature has coefficient 0
- **Appears**: Practice A Q13–15, Practice B Q28–30, 2024 Q26–28, 2025 Q26–28

### Entropy & Cross-Entropy Computation
- Compute $H(p)$, $H(q)$, and cross-entropies from given distributions
- Always includes an **undefined cross-entropy** trap ($q(x)=0$ but $p(x)\neq 0$)
- **Appears**: Practice A Q16–18, Practice B Q31–33, 2024 Q31–32, 2025 Q31–32

### Scalar Backpropagation
- Break function into modules, identify paths, apply multivariate chain rule
- Always has **two paths** requiring sum of contributions
- Common functions: $\frac{f(x)}{g(x)}$, $\sin$/$\cos$ compositions
- **Appears**: Practice A Q19–21, Practice B Q34–35, 2024 Q29–30, 2025 Q29–30

### Decision Trees (Information Gain)
- "Which feature to split on?" → tally class distributions, find most uneven
- "What is the information gain?" → compute weighted entropy reduction
- **Appears**: Practice A Q22–24, Practice B Q36–37, 2024 Q36–38, 2025 Q36–38

---

## Concepts Tested on Recent Exams (2024 + 2025)

### Markov Models for Classification
- Decompose email into bigram probabilities using chain rule
- Apply Bayes' rule with different priors
- Compute exact probability and probability ratio
- **Appears**: 2024 Q33–35, 2025 Q33–35

### Matrix Backpropagation
- Element-wise operations: $\frac{\partial y_i}{\partial x_j} = 0$ for $i \neq j$
- Backward pass: $x^\nabla = y^\nabla \otimes \text{local derivative}$
- **Appears**: 2024 Q39–40, 2025 Q39–40

---

## Recall Questions That Repeat Across Exams

| Topic | Exams | Key Answer |
|-------|-------|------------|
| SMOTE for class imbalance | 2024, 2025 | SMOTE = data augmentation |
| L1 regularization → sparsity | 2024, 2025 | Weights become exactly 0 |
| Perceptron composition problem | Practice B, 2024 | Linear + linear = linear |
| LSTM vs RNN (forget gate) | 2024, 2025 | LSTM has forget gate |
| VAE vs autoencoder | Practice B, 2024, 2025 | VAE has NO discriminator |
| Lazy algorithm = kNN | Practice B, 2024 | kNN is lazy; others aren't |
| Bias/variance: can't compute from single model | 2024, 2025 | Need multiple datasets |
| Bootstrapping: CAN estimate variance | 2024, 2025 | False: "cannot estimate variance" |
| Boosting rarely used alone in research | Practice B | Must also boost baseline |
| Gradient points uphill | Practice B | Gradient = direction of steepest increase |
| ROC AUC needs ranking classifier | Practice A, 2024, 2025 | Can't compute from confusion matrix alone |
| Conditional GAN for paired tasks | Practice B, 2025 | Colorization example |
| Cold start = new item, no embedding | 2024 | NOT about incomplete records |
| Non-differentiable environment → hard gradient descent | Practice A, Practice B | RL setting |
| Transductive learning | 2024 | Model sees test **features** (not labels) |

---

## Combination Question Patterns

### "Which is NOT..." (Negative Framing)
- Very common in combination questions
- Read ALL options — the correct answer is the one that **doesn't belong**
- Examples:
  - "Which is NOT a normalization method?" → **Imputation** (it handles missing values)
  - "Which is NOT a difference between VAE and autoencoder?" → **Discriminator** (that's GAN)
  - "Which is NOT a constraint in convolution?" → **L2 norm limit** on weights

### Common Misconceptions Used as Distractors
- "Composing perceptrons gives non-linear function" → FALSE (still linear)
- "Accuracy is good for imbalanced data" → FALSE
- "Bootstrapping can't estimate variance" → FALSE (it can!)
- "Sigmoid is preferred over ReLU" → FALSE (ReLU reduces vanishing gradients)
- "PCA finds principal components = features" → FALSE (principal components = directions of maximum variance)

---

## The "Understanding" Questions in Application Sections

Beyond computation, exams test **understanding**:

| Question Type | What They Ask | Key Insight |
|--------------|--------------|-------------|
| Entropy undefined | "What does it mean when $H(p,q)$ fails?" | Codelength for $q(x)=0$ is infinite |
| ELBO purpose | "Why does this decomposition help?" | $L(q,\theta)$ is a **lower bound** |
| VAE negation | "Why $-\ln p(x)$ instead of $\ln p(x)$?" | Convention: loss = lower is better |
| Multivariate chain rule | "When is it needed?" | When variable affects output through **multiple paths** |
| Decision tree overfitting | "Why is growing until pure a problem?" | Overfitting; solution: prune with validation |

---

## Study Priority

> [!tip] Ranked by Impact
> 1. **Application questions** (predictable, ~15 points) → [[06 - Application Question Cookbook]]
> 2. **Repeated recall facts** (table above, ~5-8 points)
> 3. **"Which is NOT" pattern** (read all options carefully)
> 4. **Understanding questions** embedded in application sections

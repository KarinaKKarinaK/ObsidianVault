# What To Memorize vs What's On The Sheet

> [!info] The formula sheet has most formulas. Focus your memorization effort on things that are **NOT** on the sheet.

See also: [[06 - Application Question Cookbook]], [[00 - Exam Strategy]]

---

## What's ON THE SHEET

### Linear Algebra
- [x] Dot product: $x^Ty = \sum_i x_i y_i$
- [x] Linear regression: $w^Tx + b = y$
- [x] Linear classification: $w^Tx + b >^? y$

### Probability
- [x] Joint, marginal, conditional probability formulas
- [x] Bayes' law: $p(B|A) = \frac{p(A|B)p(B)}{p(A)}$
- [x] Univariate and multivariate normal PDF
- [x] Expectation linearity

### Entropy
- [x] Entropy: $H(p) = -\sum_x p(x)\log_2 p(x)$
- [x] Cross-entropy: $H(p,q) = -\sum_x p(x)\log_2 q(x)$
- [x] KL divergence: $KL(p,q) = H(p,q) - H(p)$
- [x] Information gain: $I_S(V) = H(S) - \sum_i \frac{|S_i|}{|S|}H(S_i)$

### Differentiation
- [x] Constant rule, exponent rule, constant factor, sum rule, chain rule
- [x] Gradient definition
- [x] Common derivatives: $\sin$, $\cos$, $1/x$, $e^x$, $\log_b(x)$

### Optimization Objectives
- [x] Least squares (regression and classification)
- [x] SVM primal (soft margin)
- [x] SVM dual
- [x] Logistic regression loss

### Activations
- [x] Sigmoid: $\sigma(x) = \frac{1}{1+\exp(-x)}$
- [x] ReLU: $r(x) = \max(0, x)$

### Performance Metrics
- [x] Accuracy, TPR/recall, FPR, precision

### Miscellaneous
- [x] Log base conversion: $\log_2(x) = \frac{\ln(x)}{\ln(2)}$

---

## What You MUST MEMORIZE

### Entropy Rules (NOT on sheet)
- [ ] $0 \log_2 0 = 0$ in entropy (by convention)
- [ ] $\log_2 0$ is **undefined** otherwise → cross-entropy can be undefined
- [ ] Argument order: $H(p,q)$ → $p$ is true, $q$ goes in the log
- [ ] Cross-entropy is NOT symmetric
- [ ] Quick log values: $\log_2 1=0$, $\log_2 2=1$, $\log_2 4=2$, $\log_2 8=3$

### Backpropagation (NOT on sheet)
- [ ] **Multivariate chain rule**: when $x$ affects $f$ through multiple paths → **SUM** the contributions
- [ ] How to break functions into modules
- [ ] Matrix backprop: element-wise ops → backward = $y^\nabla \otimes \text{local deriv}$

### Ranking (NOT on sheet)
- [ ] Ranking error = **PAIR** of (pos, neg) ranked wrong way
- [ ] Coverage = ranking errors / (num_pos × num_neg)
- [ ] For linear classifier: rank by signed distance $w^Tx + b$

### Decision Trees (NOT on sheet — but formula IS on sheet)
- [ ] **Shortcut**: most uneven split wins (before computing information gain)
- [ ] Categorical feature: don't split on it again after using it
- [ ] Numeric feature: CAN split on it again with different threshold

### SVM (NOT on sheet)
- [ ] Support vector condition: $y_i(w^Tx_i + b) = 1$
- [ ] Classification: sign of $w^Tx + b$

### Naive Bayes (NOT on sheet)
- [ ] Independence assumption: $p(\text{features}|\text{class}) = \prod p(\text{feature}_j|\text{class})$
- [ ] Smoothing: add pseudo-observations (one per value per class per feature)

### Markov Models (NOT on sheet)
- [ ] Chain rule decomposition: $p(w_1, ..., w_n|\text{class}) = p(w_1|\text{class})\prod p(w_i|w_{i-1}, \text{class})$
- [ ] Bigram probability = bigram count / first word count
- [ ] Unigram probability = word count / total words in class
- [ ] Probability ratio: $\frac{p(\text{ham}|E)}{p(\text{spam}|E)}$ — many terms cancel

### ELBO (NOT on sheet)
- [ ] $L(q,\theta) + KL(q,p) = \ln p(x|\theta)$
- [ ] ELBO is a lower bound (because $KL \geq 0$)
- [ ] EM: alternate E-step (choose $q$) and M-step (choose $\theta$)
- [ ] VAE loss: reconstruction + KL to $\mathcal{N}(0,I)$

### Key Definitions (NOT on sheet)
- [ ] Lazy algorithm = kNN (stores data, no model)
- [ ] Hyperparameters = set before training
- [ ] Gradient points **uphill** (steepest increase)
- [ ] Convex surface → no local minima besides global
- [ ] Mode collapse = all GAN outputs look the same
- [ ] Transductive = model sees test features during training
- [ ] Cold start = new item with no embedding data

---

## What to Write on Your Cheat Sheet Box

> [!tip] Prioritize things you keep forgetting
> The box is small — write only what you'd otherwise get wrong:
> - [ ] Multivariate chain rule formula
> - [ ] Support vector condition: $y_i(w^Tx_i + b) = 1$
> - [ ] Ranking error definition (pair, not individual)
> - [ ] Coverage formula
> - [ ] Markov chain rule decomposition
> - [ ] Smoothing procedure for Naive Bayes
> - [ ] ELBO decomposition
> - [ ] Quick entropy table (common distributions)
> - [ ] $0\log 0 = 0$, but $\log 0 = \text{undefined}$
> - [ ] VAE vs GAN: VAE has NO discriminator
> - [ ] Sigmoid derivative: $\sigma(x)(1-\sigma(x))$ (useful for backprop)

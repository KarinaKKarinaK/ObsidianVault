# Probability & Information Theory

> [!info] Heavily tested — entropy/cross-entropy appears on **every exam** (Type 3). Bayes' rule is core to Naive Bayes (Type 7) and Markov models (Type 9).

See also: [[06 - Application Question Cookbook]], [[08 - What To Memorize vs What's On The Sheet]]

---

## Probability Basics

### Key Definitions
- **Joint probability** $p(A, B)$: probability of both A and B `ON SHEET`
- **Marginal probability** $p(B) = \sum_a p(A=a, B)$: sum out the other variable `ON SHEET`
- **Conditional probability** $p(A|B) = \frac{p(A,B)}{p(B)}$ `ON SHEET`
- **Bayes' law** $p(B|A) = \frac{p(A|B)p(B)}{p(A)}$ `ON SHEET`

### Frequentist vs Bayesian
- **Frequentist**: probability = long-run frequency of repeated experiments. Cannot assign probability to one-off events.
- **Bayesian**: probability = degree of belief. Can assign probabilities to anything, uses **priors**.
- **Maximum likelihood**: choose parameters that maximize $p(\text{data}|\theta)$

### Computing with Probabilities
- From a joint table $p(A, B)$:
  - Marginal: sum over rows or columns
  - Conditional $p(A=1|B=a)$: find the cell, divide by the **column** sum (sum over A values for fixed B)
- **Independence**: $p(A, B) = p(A)p(B)$
- **Conditional independence**: $p(A, B|C) = p(A|C)p(B|C)$ — this is the **Naive Bayes assumption**

### Normal Distributions `ON SHEET`
- Univariate: $\mathcal{N}(x|\mu, \sigma) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{1}{2\sigma^2}(x-\mu)^2\right)$
- Multivariate: $\mathcal{N}(x|\mu, \Sigma) = \frac{1}{\sqrt{(2\pi)^d|\Sigma|}} \exp\left(-\frac{1}{2}(x-\mu)^T\Sigma^{-1}(x-\mu)\right)$

### Expectation `ON SHEET`
- $\mathbb{E}[f(A) + g(B)] = \mathbb{E}[f(A)] + \mathbb{E}[g(B)]$ — linearity
- $\mathbb{E}[cf(A)] = c\mathbb{E}[f(A)]$ — constant factor

---

## Entropy

### Intuition
- Entropy = **average number of bits** needed to communicate a draw from a distribution
- **Optimal code**: assign shorter codes to more likely outcomes
- Higher entropy = more uncertainty = more bits needed
- Maximum entropy = **uniform distribution**

### Formulas `ON SHEET`

| Quantity         | Formula                                      | Meaning                                  |
| ---------------- | -------------------------------------------- | ---------------------------------------- |
| Entropy          | $H(p) = -\sum_x p(x)\log_2 p(x)$             | Optimal bits for distribution $p$        |
| Cross-entropy    | $H(p,q) = -\sum_x p(x)\log_2 q(x)$           | Bits using code $q$ for data from $p$    |
| KL divergence    | $KL(p,q) = H(p,q) - H(p)$                    | **Wasted** bits using $q$ instead of $p$ |
| Information gain | $I_S(V) = H(S) - \sum_i \frac{S_i}{S}H(S_i)$ | Entropy reduction after split            |


### Critical Rules `MEMORIZE`
- $0 \log_2 0 = 0$ in entropy computations
- $\log_2 0$ is **undefined** otherwise (matters for cross-entropy!)
- $H(p,q)$: $p$ is the "true" distribution, $q$ goes inside the $\log$
- $KL(p,q) \geq 0$ always, $= 0$ iff $p = q$
- $KL$ is **not symmetric**: $KL(p,q) \neq KL(q,p)$ in general
- Cross-entropy is also not symmetric: $H(p,q) \neq H(q,p)$

### Quick Log Values `MEMORIZE`

| $x$ | $\log_2 x$ |
|-----|-----------|
| 1 | 0 |
| 2 | 1 |
| 4 | 2 |
| 8 | 3 |
| $\frac{1}{2}$ | -1 |
| $\frac{1}{4}$ | -2 |
| $\frac{1}{8}$ | -3 |

Use: $\log_2 \frac{a}{b} = \log_2 a - \log_2 b$

### Quick Entropy Values

| Distribution | $H$ |
|-------------|-----|
| Certain (1,0,...) | 0 bits |
| Binary uniform (½,½) | 1 bit |
| Uniform over $n$ | $\log_2 n$ bits |
| (⅓, ⅔) | ≈ 0.918 |
| (¼, ¾) | ≈ 0.811 |

### The Undefined Trap (Exam Pattern)
For $H(p,q)$: check each term $-p(x)\log_2 q(x)$
- If $q(x) = 0$ and $p(x) \neq 0$: term is $-p(x) \cdot (-\infty)$ → **undefined**
- If $q(x) = 0$ and $p(x) = 0$: term is $0 \cdot (-\infty) = 0$ → **defined** (by convention)
- If $q(x) \neq 0$ and $p(x) = 0$: term is $0 \cdot \log_2 q(x) = 0$ → fine

> [!warning] Every recent exam (2024, 2025) includes an undefined cross-entropy. Always check!

### Connection to Loss Functions
- **Log loss** for binary classification = cross-entropy $H(p, q)$ where:
  - $p$ = true labels (one-hot: 0 or 1)
  - $q$ = model output probabilities (from sigmoid/softmax)
  - $q$ goes inside the log → log loss = $-\log q(\text{correct class})$

---

## KL Divergence & ELBO

### KL Divergence
- $KL(p,q) = -\sum_x p(x)\log_2 \frac{q(x)}{p(x)} = H(p,q) - H(p)$
- = bits **wasted** by using $q$ as a compressor for data from $p$
- The question about this in Practice B: "$KL(p,q)$ is the bits wasted by using $q$ for elements from $p$" — **true**. The **false** version flips the arguments.

### Evidence Lower Bound (ELBO)
$$L(q,\theta) + KL(q,p) = \ln p(x|\theta)$$
- $L(q,\theta)$: the ELBO — a **lower bound** on $\ln p(x|\theta)$
- Since $KL \geq 0$: $L(q,\theta) \leq \ln p(x|\theta)$
- **EM algorithm**: alternate maximizing $L$ w.r.t. $\theta$ and minimizing $KL$ w.r.t. $q$
- **VAE loss**: $-\mathbb{E}_q \ln p(x|z) + KL(q(z|x), \mathcal{N}(0,I))$
  - Reconstruction loss + KL regularizer
  - Negate because deep learning minimizes losses

---

## Log Conversion `ON SHEET`
$$\log_2(x) = \frac{\log_{10}(x)}{\log_{10}(2)} = \frac{\ln(x)}{\ln(2)}$$

Useful when your calculator doesn't have $\log_2$.

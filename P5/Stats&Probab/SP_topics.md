# SP — Statistics & Probability: Full Topic Guide

[[Stats&Probab/SP_derivations|→ Derivations]] | [[Stats&Probab/SP_practice_website|→ Practice Tool]]

> Course: Statistical Methods (X_401020 / XB_0115) — Exam Thu 4 Jun, target 9.25
> Tools allowed: formula sheet + non-programmable calculator
> Format: ~16–20 questions, MC + fill-in numerical, no deduction for wrong answers

---

## Topic Map & Exam Frequency

| Topic | Exams seen | Frequency |
|---|---|---|
| T1 Probability rules & set algebra | all 5 | ★★★★★ |
| T2 Conditional probability & Bayes' | all 5 | ★★★★★ |
| T3 Discrete distributions (Binomial, Poisson, Geometric, Pascal) | all 5 | ★★★★★ |
| T4 Continuous RVs — CDF, PDF, LOTUS | all 5 | ★★★★★ |
| T5 Normal distribution | all 5 | ★★★★★ |
| T6 Estimators & MLE | 4/5 | ★★★★ |
| T7 Confidence intervals | 4/5 | ★★★★ |
| T8 Hypothesis testing | 4/5 | ★★★★ |
| T9 CLT, sample mean & variance | 3/5 | ★★★ |

---

## T1 — Probability Rules & Set Algebra ★ (Easy)

### Key facts
- **Addition rule:** $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- **Complement:** $P(A^c) = 1 - P(A)$
- **De Morgan:** $P(A \cup B \cup C) = 1 - P(A^c \cap B^c \cap C^c)$
- **Partition:** $P(A) = P(A \cap B) + P(A \cap B^c)$
- $P(A \cap B) \leq P(A \cup B)$ always true
- **Countability:** $\mathbb{Q}$ is countable; $\mathbb{R}$ is uncountable. Cartesian product of countable sets is countable. $A \times B \neq B \times A$ in general.
- **Three sets disjoint** means $A \cap B = \emptyset$ AND $B \cap C = \emptyset$ AND $C \cap A = \emptyset$ (not just $A \cap B \cap C = \emptyset$).

### Exam traps
- "Three sets disjoint" requires **all three pairwise** intersections empty — exam has tested this exact distinction.
- $P(A \cup B \cup C) = 1 - P(A^c \cap B^c \cap C^c)$ is TRUE (De Morgan); this form appears multiple times.
- $P(A \cap B) - P(A^c \cap B^c) = P(A) + P(B) - 1$ (subtract and use complement rule).

### Worked example
> $P(A \cap B) = 0.1$, $P(A) = 0.3$, $P(B) = 0.2$. Find $P(A \cup B)$.
> $P(A \cup B) = 0.3 + 0.2 - 0.1 = \mathbf{0.4}$

---

## T2 — Conditional Probability & Bayes' ★★ (Medium)

### Key facts
- **Conditional probability:** $P(A|B) = \frac{P(A \cap B)}{P(B)}$
- **Multiplication rule:** $P(A \cap B) = P(A|B) \cdot P(B) = P(B|A) \cdot P(A)$
- **Independence:** $A \perp B \iff P(A \cap B) = P(A) P(B) \iff P(A|B) = P(A)$
- **Law of total probability:** $P(D) = \sum_i P(D | A_i) P(A_i)$
- **Bayes' theorem:** $P(A|D) = \frac{P(D|A) \cdot P(A)}{P(D)}$
- **Disjoint ≠ Independent:** if $A \cap B = \emptyset$ and $P(A), P(B) > 0$, then A and B are NOT independent (because $P(A \cap B) = 0 \neq P(A)P(B) > 0$).
- If A and B are **disjoint AND independent**, then $P(A) = 0$ or $P(B) = 0$ (one must be impossible).

### Bayes' template
Given: $P(A)$, $P(D|A)$, $P(D|A^c)$
1. $P(A^c) = 1 - P(A)$
2. $P(D) = P(D|A) \cdot P(A) + P(D|A^c) \cdot P(A^c)$ (total probability)
3. $P(A|D) = \frac{P(D|A) \cdot P(A)}{P(D)}$

### Classic exam scenarios
| Scenario | What to find |
|---|---|
| Machine A/B produces items, defect rate known | $P(\text{machine A} | \text{defect})$ — Bayes' |
| Test for disease, sensitivity/specificity given | $P(\text{disease} | \text{test positive})$ — Bayes' |
| Spam filter, $P(W|S)$ and $P(S)$ given | Check independence: $P(W) \neq P(W|S)$? → not independent |
| $P(A^c \cap B^c) = 1/2$, $P(C) = 1/3$, mutually independent | $P(A \cup B \cup C)$ |

### Worked Bayes' example
> Machine A makes 60%, B makes 40%. Defect rate: A=2%, B=5%. Item is defective. P(from machine A)?
> $P(D) = 0.6 \cdot 0.02 + 0.4 \cdot 0.05 = 0.012 + 0.020 = 0.032$
> $P(A|D) = \frac{0.02 \cdot 0.6}{0.032} = \frac{0.012}{0.032} = \mathbf{0.375}$

> **But if only machine A has defect info given:** $P(D|A)=0.02$, $P(A)=0.6$, $P(D)=0.1$ → $P(A|D)=0.02 \cdot 0.6 / 0.1 = \mathbf{0.12}$

---

## T3 — Discrete Distributions ★★ (Medium)

### Distribution reference table

| Distribution | PMF | Mean | Variance |
|---|---|---|---|
| Bernoulli($p$) | $P(X=1)=p$, $P(X=0)=1-p$ | $p$ | $p(1-p)$ |
| Binomial($n,p$) | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Geometric($p$) | $p(1-p)^{k-1}$, $k=1,2,...$ | $1/p$ | $(1-p)/p^2$ |
| Pascal($r,p$) | $\binom{k-1}{r-1}p^r(1-p)^{k-r}$, $k=r,r+1,...$ | $r/p$ | $r(1-p)/p^2$ |
| Poisson($\lambda$) | $e^{-\lambda}\lambda^k/k!$, $k=0,1,...$ | $\lambda$ | $\lambda$ |

### Key identities
- **Sum of Bernoullis:** $X + Y$ where $X,Y \sim \text{Bern}(p)$ iid $\Rightarrow X+Y \sim \text{Binom}(2,p)$
- **Poisson approximation:** $X \sim \text{Binom}(n,p)$ with large $n$, small $p$ $\Rightarrow X \approx \text{Poisson}(\lambda = np)$. Rule of thumb: $n \geq 100$, $p \leq 0.01$.
- **Geometric CDF:** $F_X(x) = 1 - (1-p)^{\lfloor x \rfloor}$, so $P(X \leq 2) = p + p(1-p) = 1-(1-p)^2$
- **Pascal:** "number of trials until $r$-th success." $P_X(k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$

### Exam traps
- Poisson probability $P(X > 1.8) = P(X \geq 2) = 1 - P(X=0) - P(X=1)$ (Poisson is discrete!)
- Geometric CDF at non-integer: $F_X(2.5) = P(X \leq 2)$ (floor it).
- Pascal vs Geometric: Geometric = Pascal with $r=1$.
- **Type I error with Geometric:** reject H0 if $X \geq k$ → $P(\text{Type I}) = P(X \geq k | \theta = \theta_0) = (1-\theta_0)^{k-1}$

### Worked examples
> **Poisson:** $X \sim \text{Poisson}(3)$, $P(X > 1.8) = P(X \geq 2) = 1 - e^{-3} - 3e^{-3} = 1 - 4e^{-3} \approx \mathbf{0.80}$

> **Binomial:** $X \sim \text{Binom}(5, 0.2)$, $P(X=2) = \binom{5}{2}(0.2)^2(0.8)^3 = 10 \cdot 0.04 \cdot 0.512 = \mathbf{0.205}$

> **Pascal(2, 0.3):** $P_X(5) = \binom{4}{1}(0.3)^2(0.7)^3 = 4 \cdot 0.09 \cdot 0.343 \approx \mathbf{0.12}$

> **Geometric(1/4):** $P_X(3) = (1/4)(3/4)^2 = 9/64 \approx \mathbf{0.14}$

---

## T4 — Continuous RVs: CDF, PDF, LOTUS ★★ (Medium)

### Key facts

**CDF properties** (memorize these — exam tests them directly):
- $F_X$ is **non-decreasing** ✓
- $F_X$ is **right-continuous** ✓
- $\lim_{x \to -\infty} F_X(x) = 0$, $\lim_{x \to +\infty} F_X(x) = 1$ ✓
- NOT always strictly increasing (flat on gaps in support)
- NOT always left-continuous (jumps at atoms for mixed distributions)

**PDF → CDF:** $F_X(x) = \int_{-\infty}^{x} f(t) \, dt$

**CDF → PDF:** $f_X(x) = F_X'(x)$

**Normalization:** $\int_{-\infty}^{\infty} f(x) \, dx = 1$ — use to find constant $c$.

**Expectation:** $E[X] = \int_{-\infty}^{\infty} x \, f(x) \, dx$

**LOTUS (Law of the Unconscious Statistician):** $E[g(X)] = \int_{-\infty}^{\infty} g(x) \, f(x) \, dx$

So $E[X^2] = \int x^2 f(x) \, dx$ — NOT $\left(\int x f(x) dx\right)^2$

**Variance:** $\text{Var}(X) = E[X^2] - (E[X])^2$

### Finding normalizing constant $c$

Set $\int f(x) dx = 1$ and solve for $c$. Example:
> $f(x) = cx^2$ on $[-1, 1]$. $\int_{-1}^{1} cx^2 dx = c \cdot [x^3/3]_{-1}^{1} = c \cdot (1/3 + 1/3) = 2c/3 = 1 \Rightarrow c = \mathbf{3/2}$

### Computing probabilities
> $P(X > 1/3)$ where $f(x) = x + 1/2$ on $[0,1]$:
> $\int_{1/3}^{1} (x+1/2) dx = [x^2/2 + x/2]_{1/3}^{1} = (1/2+1/2) - (1/18+1/6) = 1 - 4/18 = 21/27 \approx \mathbf{0.78}$

### Exam traps
- LOTUS: $E[X^2] = \int x^2 f_X(x) dx$ uses $f$, NOT $F$.
- $P(X > 1.8)$ for a continuous RV equals $\int_{1.8}^{\infty} f(x)dx$ (no floor needed, unlike discrete).
- $F_X(4)$ for $f(x) = x^{-2}$ on $[1,\infty)$: $\int_1^4 x^{-2}dx = [-1/x]_1^4 = -1/4 + 1 = 3/4 = \mathbf{0.75}$

---

## T5 — Normal Distribution ★★ (Medium)

### Key facts
- $X \sim N(\mu, \sigma^2)$: standardize $Z = (X-\mu)/\sigma \sim N(0,1)$
- $P(X > a) = 1 - \Phi\left(\frac{a-\mu}{\sigma}\right)$
- $\Phi(-z) = 1 - \Phi(z)$ (symmetry)
- $\Phi(1) = 1 - \Phi(-1)$ (both equivalent for answers)

**Linear transformation:** if $X \sim N(\mu, \sigma^2)$ and $Y = aX + b$:
- $E[Y] = a\mu + b$, $\text{Var}(Y) = a^2 \sigma^2$
- $Y \sim N(a\mu + b, a^2\sigma^2)$

**Sum of independent normals:** $X \sim N(\mu_1, \sigma_1^2)$, $Y \sim N(\mu_2, \sigma_2^2)$:
- $X + Y \sim N(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$

**Binomial → Normal approximation (CLT):** $X \sim \text{Binom}(n,p)$, approximate as $N(np, np(1-p))$

### z-quantile table (from formula sheet)
| $\alpha$ | $z_\alpha$ |
|---|---|
| 0.005 | 2.58 |
| 0.01 | 2.33 |
| 0.025 | 1.96 |
| 0.05 | 1.64 |
| 0.10 | 1.28 |

### Exam traps
- "N(μ, σ²) with σ²=4" means $\sigma=2$. When standardizing: divide by 2, not 4.
- $P(X > 4)$ for $X \sim N(3,4)$: $Z = (4-3)/2 = 0.5$, answer $= 1-\Phi(0.5)$ ✓
- Type I error with normal: X̄ has distribution $N(\mu, \sigma^2/n)$. Standard error = $\sigma/\sqrt{n}$.
- $X \sim \text{Binom}(20, 1/5)$, CLT approx for $P(X > 8)$: mean $=4$, var $=20 \cdot 0.2 \cdot 0.8 = 3.2$. $P(X>8) \approx P(Z > (8-4)/\sqrt{3.2}) = 1 - \Phi(4/\sqrt{3.2}) = 1-\Phi(\sqrt{5})$

---

## T6 — Estimators & Maximum Likelihood ★★★ (Hard)

### Estimator properties
- **Unbiased:** $E[\hat{\theta}] = \theta$
- **MSE:** $\text{MSE}(\hat{\theta}) = \text{Var}(\hat{\theta}) + \text{Bias}(\hat{\theta})^2$
- **Sample mean** $\bar{X} = \frac{1}{n}\sum X_i$: unbiased for $\mu$; $\text{Var}(\bar{X}) = \sigma^2/n$; MSE $= \sigma^2/n$
- **Sample variance** $S^2 = \frac{1}{n-1}\sum(X_i - \bar{X})^2$: unbiased for $\sigma^2$
- MSE of $\bar{X}$ equals $\sigma^2/n$ (bias=0, so MSE=Var). For $N(\mu,4)$: MSE $= 4/n$, NOT $2/\sqrt{n}$.

### MLE procedure
1. Write likelihood: $L(\theta) = \prod_{i=1}^n f(x_i; \theta)$
2. Take log: $\ell(\theta) = \sum \log f(x_i; \theta)$
3. Differentiate: $\frac{d\ell}{d\theta} = 0$
4. Solve for $\hat{\theta}$, verify it's a maximum

### MLE for common distributions
| Distribution | MLE |
|---|---|
| Bernoulli($p$) | $\hat{p} = \bar{x}$ |
| Binomial($n$, $p$) | $\hat{p} = \bar{x}/n$ |
| Poisson($\lambda$) | $\hat{\lambda} = \bar{x}$ |
| Geometric($p$) | $\hat{p} = 1/\bar{x}$ |
| Exponential($\lambda$) | $\hat{\lambda} = 1/\bar{x}$ (NOT $\bar{x}$!) |
| Normal($\mu$, $\sigma^2$) | $\hat{\mu}=\bar{x}$, $\hat{\sigma}^2 = \frac{1}{n}\sum(x_i-\bar{x})^2$ |

### Worked MLE examples
> **$L(\theta) = 12\theta^3(1-\theta)^5$:**
> $\ell = \log 12 + 3\log\theta + 5\log(1-\theta)$
> $d\ell/d\theta = 3/\theta - 5/(1-\theta) = 0 \Rightarrow 3(1-\theta) = 5\theta \Rightarrow \hat{\theta} = 3/8 = \mathbf{0.375}$

> **Geometric($\theta$), obs $x_1=3, x_2=2$:**
> $L(\theta) = (1-\theta)^2\theta \cdot (1-\theta)\theta = (1-\theta)^3\theta^2$
> $d\ell/d\theta = 2/\theta - 3/(1-\theta) = 0 \Rightarrow \hat{\theta} = 2/5 = \mathbf{0.4}$

> **Binomial(3,$\theta$), obs (1,3,2,2):**
> $L(\theta) = \binom{3}{1}\theta(1-\theta)^2 \cdot \binom{3}{3}\theta^3 \cdot \binom{3}{2}\theta^2(1-\theta) \cdot \binom{3}{2}\theta^2(1-\theta) = 27\theta^8(1-\theta)^4$

### Exam traps
- Exponential MLE: $\hat{\lambda} = 1/\bar{x}$ (the sample mean is NOT the MLE for $\lambda$; it's the MLE for $1/\lambda$).
- Likelihood depends on sum $\Rightarrow$ sufficient statistic. For exponential: YES, only depends on $\sum x_i$.
- Sample variance S² uses $n-1$ (unbiased); MLE for $\sigma^2$ uses $n$ (biased).

---

## T7 — Confidence Intervals ★★★ (Hard)

### The four CI formulas on the formula sheet

**1. CI for $\mu$ with known $\sigma$ (use $z$):**
$$\bar{X} \pm z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$$

**2. CI for $\mu$ with unknown $\sigma$, large $n$ (use $z$ with $S$):**
$$\bar{X} \pm z_{\alpha/2} \cdot \frac{S}{\sqrt{n}}$$

**3. CI for $\mu$, normal distribution, unknown $\sigma$ (use $t$):**
$$\bar{X} \pm t_{\alpha/2, n-1} \cdot \frac{S}{\sqrt{n}}$$

**4. CI for proportion $\theta$ (Bernoulli):**
$$\bar{X} \pm z_{\alpha/2} \cdot \sqrt{\frac{\bar{X}(1-\bar{X})}{n}}$$

**5. CI for $\sigma^2$ (chi-square):**
$$\left[\frac{(n-1)S^2}{\chi^2_{\alpha/2, n-1}}, \frac{(n-1)S^2}{\chi^2_{1-\alpha/2, n-1}}\right]$$

### Sample size for proportion CI
Margin of error $= z_{\alpha/2} \cdot \sqrt{\frac{p(1-p)}{n}} \leq m$

Worst case $p(1-p) = 0.25$ (at $p=0.5$):
$$n \geq \left(\frac{z_{\alpha/2}}{m}\right)^2 \cdot 0.25$$

For 90% CI with 3% margin: $n \geq (1.64/0.03)^2 \cdot 0.25 \approx 747 \Rightarrow n = 800$.

### Worked examples
> **99% CI for proportion**, $n=400$, $\hat{p} = 240/400 = 0.6$:
> $0.6 \pm 2.58 \cdot \sqrt{0.6 \cdot 0.4/400} = 0.6 \pm 2.58 \cdot 0.0245 = 0.6 \pm 0.063 = \mathbf{(0.54, 0.66)}$

> **95% CI for $\sigma^2$**, $n=16$, $s^2=0.04$:
> $(n-1)s^2 = 15 \cdot 0.04 = 0.6$
> $\chi^2_{0.025, 15} = 27.49$, $\chi^2_{0.975, 15} = 6.26$
> CI $= [0.6/27.49, 0.6/6.26] = \mathbf{[0.022, 0.096]}$

> **90% CI for $\mu$**, $X \sim N(\theta,1)$, $n=4$, $\bar{x}=2$:
> $2 \pm z_{0.05}/\sqrt{4} = 2 \pm 1.64/2 = 2 \pm 0.82 = \mathbf{[1.18, 2.82]}$

### Exam traps
- CI interpretation: "95% CI means 95% of CIs constructed this way contain the true μ" — NOT that P(μ∈CI)=0.95 after observing (μ is fixed, not random).
- For 95% two-sided: $\alpha=0.05$, $\alpha/2=0.025$, $z_{0.025}=1.96$.
- Chi-square CI: larger chi-square value goes in denominator of LOWER bound.

---

## T8 — Hypothesis Testing ★★★ (Hard)

### Framework
1. State $H_0$ vs $H_1$
2. Choose significance level $\alpha$
3. Compute test statistic (t or z)
4. Find p-value or compare to critical value
5. Decision: reject $H_0$ if p-value $< \alpha$

### Error types
| | H0 true | H0 false |
|---|---|---|
| **Reject H0** | Type I error (α) | Correct (power) |
| **Don't reject H0** | Correct | Type II error (β) |

- Type I: $P(\text{reject } H_0 | H_0 \text{ true}) = \alpha$
- Type II: $P(\text{fail to reject } H_0 | H_0 \text{ false}) = \beta$
- Larger rejection region → smaller β, larger α
- Rejected at level 0.025 → must be rejected at level 0.05 too (0.025 < 0.05)
- Rejected at level 0.025 → may or may NOT be rejected at level 0.01

### Test statistics (from formula sheet — Table 8.2)
| Case | Test statistic | Distribution |
|---|---|---|
| Normal, $\sigma$ known | $Z = \frac{\bar{X}-\mu_0}{\sigma/\sqrt{n}}$ | $N(0,1)$ |
| Non-normal, large $n$ | $Z = \frac{\bar{X}-\mu_0}{S/\sqrt{n}}$ | $N(0,1)$ approx |
| Normal, $\sigma$ unknown | $T = \frac{\bar{X}-\mu_0}{S/\sqrt{n}}$ | $t(n-1)$ |

### Computing Type I error probability
When rejection region is $\bar{X} > c$ and $H_0: \mu=\mu_0$:
$$P(\text{Type I}) = P(\bar{X} > c | \mu = \mu_0) = 1 - \Phi\left(\frac{c - \mu_0}{\sigma/\sqrt{n}}\right)$$

> $X_1,...,X_9 \sim N(\mu,1)$. Reject $H_0: \mu=1$ if $\bar{X} > 1.5$.
> $\text{Type I} = P(\bar{X}>1.5|\mu=1) = P\left(Z > \frac{1.5-1}{1/3}\right) = P(Z > 3/2) = 1-\Phi(3/2)$

### p-value computation
For $H_0: \mu=\mu_0$, $H_1: \mu < \mu_0$ (left-tailed):
$$\text{p-value} = P(Z \leq z_{\text{obs}}) = \Phi(z_{\text{obs}})$$

> $\bar{x}=24$, $\mu_0=25$, $\sigma=6$, $n=36$, $H_1: \mu < 25$:
> $z = (24-25)/(6/6) = -1$. p-value $= \Phi(-1)$

### Exam traps
- "Probability of Type II error is probability of not rejecting H0 when H0 is **false**" — exam tests this (the **false** part, not **true**).
- Right-tailed: H1 says μ **>** μ0. Left-tailed: H1 says μ **<** μ0.
- T=54, K=[55,∞): 54 ∉ K → don't reject H0. If true μ=52 (H1 is true) → Type II error.

---

## T9 — CLT, Sample Mean & Variance ★★ (Medium)

### Key facts
- **CLT:** $\bar{X}_n = \frac{1}{n}\sum_{i=1}^n X_i \xrightarrow{d} N(\mu, \sigma^2/n)$ as $n \to \infty$
- $E[\bar{X}] = \mu$ (unbiased)
- $\text{Var}(\bar{X}) = \sigma^2/n$
- $\text{SD}(\bar{X}) = \sigma/\sqrt{n}$ (standard error)
- **Sample variance:** $S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$, unbiased for $\sigma^2$

### Expected value formulas
| Distribution | E[X] |
|---|---|
| Geometric($p$) | $1/p$ → $p=0.5$: $E=2$ |
| Binomial($n,p$) | $np$ → Binom(40, 0.05): $E=2$ |
| Uniform$(a,b)$ | $(a+b)/2$ → Uniform(0,2): $E=1$ |
| Exponential($\lambda$) | $1/\lambda$ → Exp(2): $E=0.5$ |

### Worked examples
> **Var of sample mean:** $X_i$ iid, mean 3, variance 4, $n=20$. $\text{Var}(\bar{X}) = 4/20 = \mathbf{0.2}$

> **CLT application:** $X_1,...,X_{1000}$ iid, $\mu=0.4$, $\sigma^2=1$. $P(\sum X_i \leq 400) = P(\bar{X} \leq 0.4) \approx \Phi\left(\frac{0.4-0.4}{1/\sqrt{1000}}\right) = \Phi(0) = \mathbf{0.5}$

> **Sample variance:** $x_1=-2, x_2=0, x_3=2$. $\bar{x}=0$. $S^2 = \frac{1}{2}[4+0+4] = \mathbf{4}$

---

## Quick-Reference: Common Mistakes

| Mistake | Correction |
|---|---|
| Confusing disjoint and independent | Disjoint + positive prob → dependent |
| P(Type II) = P(not reject \| H0 **true**) | Should be H0 **false** |
| LOTUS: $E[X^2] = (\int x f dx)^2$ | $E[X^2] = \int x^2 f dx$ |
| MLE for Exponential($\lambda$) = $\bar{x}$ | MLE is $1/\bar{x}$ |
| Chi-square CI: bigger $\chi^2$ → bigger interval | Bigger $\chi^2$ → SMALLER lower bound |
| $P(X>1.8)$ for Poisson → treat as continuous | Floor to $P(X \geq 2)$ |
| Rejected at 0.025 → rejected at 0.01 | NOT necessarily; but YES at 0.05 |
| Var(Y) = a·Var(X) when Y=aX+b | Var(Y) = **a²**·Var(X) |
| MSE = Var + Bias (not squared) | MSE = Var + Bias**²** |
| $\chi^2$ CI: $(n-1)S^2$ uses $n-1$ | Correct — sample variance uses $n-1$ |

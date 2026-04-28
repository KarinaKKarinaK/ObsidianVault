# SP — Key Derivations

[[Stats&Probab/SP_topics|← Back to Topics]] | [[Stats&Probab/SP_practice_website|→ Practice Tool]]

> Step-by-step derivations for the 9 most exam-tested procedures. Work through these until you can reproduce them without notes.

---

## D1 — Finding Normalizing Constant $c$

**Goal:** given $f(x) = c \cdot g(x)$, find $c$ such that $f$ is a valid PDF.

**Method:** set $\int_{-\infty}^{\infty} f(x) dx = 1$ and solve for $c$.

---

**Example A:** $f(x) = cx^2$ on $[-1, 1]$, zero elsewhere.

$$\int_{-1}^{1} cx^2 \, dx = c \cdot \left[\frac{x^3}{3}\right]_{-1}^{1} = c \cdot \left(\frac{1}{3} - \frac{-1}{3}\right) = c \cdot \frac{2}{3} = 1$$
$$\Rightarrow c = \frac{3}{2} = 1.5$$

**Example B:** $f(x) = cx^{-4}$ on $x > 1$.

$$\int_1^{\infty} cx^{-4} dx = c \cdot \left[\frac{x^{-3}}{-3}\right]_1^{\infty} = c \cdot \left(0 - \frac{-1}{3}\right) = \frac{c}{3} = 1 \Rightarrow c = 3$$

---

## D2 — Computing $E[X]$ and $E[g(X)]$ (LOTUS)

**Key distinction:** $E[X] = \int x f(x) dx$ uses $f$, not $F$.

**LOTUS:** $E[g(X)] = \int g(x) f(x) dx$

---

**Example:** $f_X(x) = 4x(1-x)$ on $[0,1]$. Find $E[X]$ and $E[X^2]$.

$$E[X] = \int_0^1 x \cdot 4x(1-x) \, dx = 4 \int_0^1 (x^2 - x^3) dx = 4\left[\frac{x^3}{3} - \frac{x^4}{4}\right]_0^1 = 4\left(\frac{1}{3} - \frac{1}{4}\right) = 4 \cdot \frac{1}{12} = \frac{1}{3}$$

$$E[X^2] = \int_0^1 x^2 \cdot 4x(1-x) \, dx = 4\int_0^1 (x^3 - x^4) dx = 4\left[\frac{x^4}{4} - \frac{x^5}{5}\right]_0^1 = 4\left(\frac{1}{4} - \frac{1}{5}\right) = 4 \cdot \frac{1}{20} = \frac{1}{5}$$

$$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{1}{5} - \frac{1}{9} = \frac{9-5}{45} = \frac{4}{45}$$

**Example (Uniform):** $X \sim \text{Uniform}[0,2]$, find $E[X^3]$.

$$E[X^3] = \int_0^2 x^3 \cdot \frac{1}{2} \, dx = \frac{1}{2} \cdot \left[\frac{x^4}{4}\right]_0^2 = \frac{1}{2} \cdot \frac{16}{4} = \frac{1}{2} \cdot 4 = 2$$

---

## D3 — PDF to CDF and Back

**PDF → CDF:**
$$F_X(x) = \int_{-\infty}^{x} f(t) \, dt$$

For piecewise PDFs, split at boundaries and use:
$$F_X(x) = \int_a^x f(t) \, dt \quad \text{(when } a \text{ is the lower boundary of support)}$$

---

**Example:** $f_X(x) = x^{-2}$ for $x \geq 1$.

$$F_X(x) = \int_1^x t^{-2} dt = \left[-\frac{1}{t}\right]_1^x = -\frac{1}{x} + 1 = 1 - \frac{1}{x}$$

$$F_X(4) = 1 - \frac{1}{4} = \frac{3}{4} = 0.75$$

**Example (CDF → probability):** $F_X(x) = 1 - 1/x$ for $x \geq 1$.

$$P(X > 1.8) = 1 - F_X(1.8) = 1 - (1 - 1/1.8) = 1/1.8 \approx 0.556$$

**Discrete CDF at non-integer:** for PMF $P_X(k) = 2^{-k}$:
$$F_X(2.5) = P(X \leq 2) = P(X=1) + P(X=2) = \frac{1}{2} + \frac{1}{4} = \frac{3}{4} = 0.75$$

---

## D4 — Bayes' Theorem: Full Template

**Setup:** events $A_1, ..., A_k$ partition the sample space. Event $D$ observed.

$$P(A_i | D) = \frac{P(D | A_i) \cdot P(A_i)}{\sum_{j} P(D | A_j) \cdot P(A_j)}$$

---

**Standard two-machine problem:**

Given: $P(A) = 0.6$, $P(B) = 0.4$, $P(D|A) = 0.02$, $P(D|B) = 0.05$.

Step 1 — Total probability:
$$P(D) = P(D|A)P(A) + P(D|B)P(B) = 0.6(0.02) + 0.4(0.05) = 0.012 + 0.020 = 0.032$$

Step 2 — Bayes':
$$P(A|D) = \frac{P(D|A) \cdot P(A)}{P(D)} = \frac{0.02 \cdot 0.6}{0.032} = \frac{0.012}{0.032} = 0.375$$

**Variant:** only $P(D)$ given (not decomposed):
$$P(A|D) = \frac{0.02 \cdot 0.6}{0.1} = 0.12 \quad \text{(when total defect rate = 0.1)}$$

---

**Medical test problem:**

$P(B) = 1/7$, $P(N|B) = 0.02$, $P(N) = 0.85$.
$$P(B|N) = \frac{P(N|B) \cdot P(B)}{P(N)} = \frac{0.02 \cdot (1/7)}{0.85} = \frac{0.02/7}{0.85} \approx 0.0034$$

---

**Reverse Bayes (functioning given positive test):**

$P(\text{broken}) = 0.02$, $P(+|\text{broken}) = 0.97$, $P(-|\text{not broken}) = 0.99 \Rightarrow P(+|\text{not broken}) = 0.01$.

$$P(\text{functioning}|+) = \frac{P(+|\text{functioning}) \cdot P(\text{functioning})}{P(+|\text{functioning})P(\text{functioning}) + P(+|\text{broken})P(\text{broken})}$$
$$= \frac{0.01 \cdot 0.98}{0.01 \cdot 0.98 + 0.97 \cdot 0.02} = \frac{0.0098}{0.0098 + 0.0194} = \frac{0.0098}{0.0292} \approx 0.34$$

---

## D5 — Maximum Likelihood Estimation

### General procedure
$$L(\theta) = \prod_{i=1}^n f(x_i; \theta), \quad \ell(\theta) = \log L(\theta) = \sum_{i=1}^n \log f(x_i; \theta)$$
Set $\ell'(\hat{\theta}) = 0$ and solve. Verify $\ell''(\hat{\theta}) < 0$ (maximum).

---

### Derivation: MLE for Geometric($\theta$)

$f(x;\theta) = (1-\theta)^{x-1}\theta$, observations $x_1,...,x_n$.

$$\ell(\theta) = \sum_{i=1}^n \left[(x_i-1)\log(1-\theta) + \log\theta\right] = \left(\sum x_i - n\right)\log(1-\theta) + n\log\theta$$

$$\frac{d\ell}{d\theta} = -\frac{\sum x_i - n}{1-\theta} + \frac{n}{\theta} = 0$$

$$n(1-\theta) = \theta(\sum x_i - n) \Rightarrow n - n\theta = \theta\sum x_i - n\theta \Rightarrow n = \theta\sum x_i$$

$$\hat{\theta} = \frac{n}{\sum x_i} = \frac{1}{\bar{x}}$$

For $x_1=3, x_2=2$: $\hat{\theta} = 2/5 = 0.4$ ✓

---

### Derivation: MLE from given likelihood

**$L(\theta) = 12\theta^3(1-\theta)^5$:**

$$\ell(\theta) = \log 12 + 3\log\theta + 5\log(1-\theta)$$
$$\frac{d\ell}{d\theta} = \frac{3}{\theta} - \frac{5}{1-\theta} = 0 \Rightarrow 3(1-\theta) = 5\theta \Rightarrow 3 = 8\theta \Rightarrow \hat{\theta} = \frac{3}{8} = 0.375$$

**General pattern $L(\theta) \propto \theta^a(1-\theta)^b$:**
$$\hat{\theta} = \frac{a}{a+b}$$

So for $\theta^3(1-\theta)^5$: $\hat{\theta} = 3/(3+5) = 3/8$. Memorize this shortcut.

---

## D6 — Confidence Interval Construction

### CI for $\mu$ with known $\sigma$

$X_1,...,X_n \sim N(\mu, \sigma^2)$ (known $\sigma$).

$$\bar{X} \sim N\!\left(\mu, \frac{\sigma^2}{n}\right) \Rightarrow Z = \frac{\bar{X}-\mu}{\sigma/\sqrt{n}} \sim N(0,1)$$

$$P\!\left(-z_{\alpha/2} \leq \frac{\bar{X}-\mu}{\sigma/\sqrt{n}} \leq z_{\alpha/2}\right) = 1-\alpha$$

Rearrange for $\mu$:
$$P\!\left(\bar{X} - z_{\alpha/2}\frac{\sigma}{\sqrt{n}} \leq \mu \leq \bar{X} + z_{\alpha/2}\frac{\sigma}{\sqrt{n}}\right) = 1-\alpha$$

**Worked:** $\bar{x}=2$, $\sigma=1$ (known), $n=4$, 90% CI ($\alpha=0.1$, $z_{0.05}=1.64$):
$$2 \pm \frac{1.64}{\sqrt{4}} = 2 \pm \frac{1.64}{2} = 2 \pm 0.82 = [1.18, 2.82]$$

---

### CI for proportion

$X_1,...,X_n \sim \text{Bernoulli}(\theta)$. By CLT: $\bar{X} \approx N(\theta, \theta(1-\theta)/n)$.

$$\hat{\theta} = \bar{X}, \quad \text{CI: } \bar{X} \pm z_{\alpha/2}\sqrt{\frac{\bar{X}(1-\bar{X})}{n}}$$

**Worked:** $n=400$, $\bar{x}=0.6$, 99% CI ($z_{0.005}=2.58$):
$$0.6 \pm 2.58\sqrt{\frac{0.6 \cdot 0.4}{400}} = 0.6 \pm 2.58 \cdot 0.0245 = 0.6 \pm 0.063 = (0.537, 0.663)$$

---

### CI for $\sigma^2$

$(n-1)S^2/\sigma^2 \sim \chi^2(n-1)$. Find $a,b$ such that $P(a \leq \chi^2 \leq b) = 1-\alpha$:

$$P\!\left(\frac{(n-1)S^2}{\chi^2_{\alpha/2,n-1}} \leq \sigma^2 \leq \frac{(n-1)S^2}{\chi^2_{1-\alpha/2,n-1}}\right) = 1-\alpha$$

**Key:** use df $= n-1$ (NOT $n$). For $n=16$: df $=15$.

**Worked:** $n=16$, $s^2=0.04$, 95% CI. $(n-1)s^2 = 15 \cdot 0.04 = 0.6$.
$$\chi^2_{0.025,15} = 27.49, \quad \chi^2_{0.975,15} = 6.26$$
$$\left[\frac{0.6}{27.49}, \frac{0.6}{6.26}\right] = [0.022, 0.096]$$

---

## D7 — Hypothesis Testing: Type I Error Computation

**Setup:** sample $X_1,...,X_n \sim N(\mu,\sigma^2)$ (known $\sigma^2$). Test $H_0:\mu=\mu_0$ vs $H_1:\mu>\mu_0$. Reject if $\bar{X} > c$.

**Type I error probability:**

$$\alpha = P(\bar{X} > c \mid \mu = \mu_0) = P\!\left(Z > \frac{c-\mu_0}{\sigma/\sqrt{n}}\right) = 1 - \Phi\!\left(\frac{c-\mu_0}{\sigma/\sqrt{n}}\right)$$

---

**Full worked example:**

$X_1,...,X_9 \sim N(\mu,1)$. Reject $H_0:\mu=1$ if $\bar{X} > 1.5$.

Standard error of $\bar{X}$: $\text{SE} = \sigma/\sqrt{n} = 1/\sqrt{9} = 1/3$.

$$P(\text{Type I}) = P(\bar{X} > 1.5 \mid \mu=1) = P\!\left(Z > \frac{1.5-1}{1/3}\right) = P(Z > 3/2) = 1 - \Phi(3/2)$$

Answer: $1-\Phi(3/2)$ ✓

---

**Type I error for Geometric:**

$X \sim \text{Geometric}(\theta)$. Test $H_0:\theta=1/2$. Reject if $X \geq 3$.

$$P(\text{Type I}) = P(X \geq 3 \mid \theta=1/2) = \sum_{k=3}^{\infty} (1/2)(1/2)^{k-1} = (1-1/2)^2 = 1/4 = 0.25$$

(Use geometric series: $P(X \geq k) = (1-p)^{k-1}$ for Geometric.)

---

## D8 — p-value Computation

**Definition:** $p\text{-value} = P(\text{observe result as extreme or more} \mid H_0 \text{ true})$

For left-tailed ($H_1: \mu < \mu_0$), test statistic $z_{\text{obs}}$:
$$p\text{-value} = \Phi(z_{\text{obs}})$$

For right-tailed ($H_1: \mu > \mu_0$):
$$p\text{-value} = 1 - \Phi(z_{\text{obs}})$$

---

**Worked example:**

$H_0: \mu = 25$, $H_1: \mu < 25$ (left-tailed). $n=36$, $\bar{x}=24$, $\sigma=6$ (known).

$$z = \frac{\bar{x} - \mu_0}{\sigma/\sqrt{n}} = \frac{24-25}{6/\sqrt{36}} = \frac{-1}{6/6} = \frac{-1}{1} = -1$$

$$p\text{-value} = \Phi(-1)$$

Decision rule: reject $H_0$ if $p < \alpha$. If $\alpha = 0.05$: $\Phi(-1) \approx 0.159 > 0.05$ → fail to reject.

---

## D9 — CLT Applications

### Standardizing the sample mean

$X_1,...,X_n$ iid with mean $\mu$ and variance $\sigma^2$.

By CLT: $\bar{X} \approx N(\mu, \sigma^2/n)$, so $Z = \frac{\bar{X}-\mu}{\sigma/\sqrt{n}} \approx N(0,1)$.

**Equivalently:** $S_n = \sum X_i \approx N(n\mu, n\sigma^2)$.

---

**Example 1:** $X_i$ iid, $\mu=0.4$, $\sigma^2=1$, $n=1000$.

$$P\!\left(\sum_{i=1}^{1000} X_i \leq 400\right) = P\!\left(\bar{X} \leq \frac{400}{1000}\right) = P(\bar{X} \leq 0.4) = P\!\left(Z \leq \frac{0.4-0.4}{\sqrt{1/1000}}\right) = \Phi(0) = 0.5$$

**Example 2:** $X \sim \text{Binom}(20, 1/5)$, approximate $P(X > 8)$ with CLT.

$\mu = np = 4$, $\sigma^2 = np(1-p) = 3.2$, $\sigma = \sqrt{3.2}$.

$$P(X>8) \approx P\!\left(Z > \frac{8-4}{\sqrt{3.2}}\right) = P\!\left(Z > \frac{4}{\sqrt{3.2}}\right) = P(Z > \sqrt{5}) = 1-\Phi(\sqrt{5})$$

---

## D10 — Linear Transformations of Random Variables

If $X \sim N(\mu, \sigma^2)$ and $Y = aX + b$:

$$E[Y] = aE[X] + b = a\mu + b$$
$$\text{Var}(Y) = a^2 \text{Var}(X) = a^2\sigma^2$$
$$Y \sim N(a\mu+b, \, a^2\sigma^2)$$

**Example:** $X \sim N(2,1)$, $Y = 2X-1$.
$$E[Y] = 2(2)-1 = 3, \quad \text{Var}(Y) = 4(1) = 4, \quad \sigma_Y = 2$$
$$Y \sim N(3, 4), \quad \mu=3, \sigma=2$$

**Variance shortcut:** $\text{Var}(aX+b) = a^2\text{Var}(X)$ — the constant $b$ disappears!

---

## Appendix: Derivation Cheat Sheet

| What | Formula | Trap |
|---|---|---|
| MLE for $\theta^a(1-\theta)^b$ | $\hat{\theta} = a/(a+b)$ | — |
| MLE for Geometric | $\hat{\theta} = 1/\bar{x}$ | NOT $\bar{x}$ |
| MLE for Exponential | $\hat{\lambda} = 1/\bar{x}$ | NOT $\bar{x}$ |
| $E[X^2]$ | $\int x^2 f(x) dx$ | NOT $(\int x f dx)^2$ |
| Var of sample mean | $\sigma^2/n$ | NOT $\sigma/n$ |
| Sample variance denominator | $n-1$ | NOT $n$ |
| Chi-square CI df | $n-1$ | NOT $n$ |
| Type I for normal, reject if $\bar{X}>c$ | $1-\Phi((c-\mu_0)/(\sigma/\sqrt{n}))$ | — |
| Geometric: $P(X \geq k)$ | $(1-p)^{k-1}$ | — |
| MLE shortcut pattern | $a/(a+b)$ | Requires log-likelihood = 0 |

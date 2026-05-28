## 1) The big picture: learning with probability

We assume some "machine" (a probability distribution) generated our data. The machine is configured by **parameters** $\theta$. We know how the machine works, so $p(\text{Data} \mid \theta)$ is easy to compute. The problem: we observe the data but don't know $\theta$. We want to figure out the parameters from the data.

*// Think of it like this: nature has a hidden recipe (the parameters). We can't see the recipe, but we can taste the food (the data). Our job is to reverse-engineer the recipe from what we tasted.*

Two philosophical camps approach this differently: **frequentist** and **Bayesian**.

---

## 2) Frequentist learning: Maximum Likelihood Estimation (MLE)

### Core idea

The true model is **not** subject to probability. We just try to guess the single best $\theta$.

> [!important] MLE — the single most recurring idea in the course
> $$\hat{\theta} = \arg\max_\theta \; p(X \mid \theta)$$
> The function $L(\theta) = p(X \mid \theta)$ is called the **likelihood**. We pick the parameters that make our observed data most probable.
>
> *// "Out of all possible settings of the knobs ($\theta$), which setting makes the data we actually saw the least surprising?"*

### Coin example (building intuition)

Two coins: Straight ($p(\text{H})=1/2$) and Bent ($p(\text{H})=4/5$). Someone picks one coin and flips it 12 times: HTHHHTHHTHTH (8 heads, 4 tails).

- $p(D \mid \text{Bent}) = (4/5)^8 \cdot (1/5)^4 \approx 0.000268$
- $p(D \mid \text{Straight}) = (1/2)^{12} \approx 0.000244$

Bent has slightly higher likelihood, so MLE picks **Bent**. The coin flips are independent, so the total probability is just the product of individual flip probabilities.

### Log-likelihood

We almost always work with the **logarithm** of the likelihood instead:

- $\log$ is monotonic, so the maximum stays in the same place.
  *// monotonic = always going up. So if A > B, then log(A) > log(B). The winner doesn't change.*
- ==Turns products into sums== (much easier to work with).
  *// instead of multiplying 1000 tiny probabilities (which underflows to 0), we add their logs. Same answer, no numerical disaster.*
- Gives a smoother loss landscape for gradient descent.

> [!tip] Convention
> In ML we *minimize* a loss, so we use the ==**negative log-likelihood**== and do gradient descent.

---

## 3) MLE for the Normal distribution (important derivation)

The PDF of the univariate normal:

$$\mathcal{N}(x \mid \mu, \sigma) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\!\left[-\frac{1}{2\sigma^2}(x - \mu)^2\right]$$

*// Don't panic about this formula. It's just the bell curve. $\mu$ = where the center is, $\sigma$ = how wide/narrow it is. The rest is math to make it a valid probability distribution.*

Assuming data points are i.i.d., the log-likelihood is:

$$\arg\max_{\mu,\sigma} \sum_x \ln \frac{1}{\sqrt{2\pi\sigma^2}} - \frac{1}{2\sigma^2}(x-\mu)^2$$

*// i.i.d. = each data point was drawn independently from the same distribution. So the total probability = product of individual ones, which becomes a sum after taking the log.*

### Deriving the optimal mean

If we fix $\sigma$ and optimize only $\mu$:

1. The first term doesn't depend on $\mu$ -- drop it.
   *// it's a constant w.r.t. $\mu$, so it doesn't affect which $\mu$ wins.*
2. The factor $1/(2\sigma^2)$ is a positive constant -- can be removed from argmax.
   *// multiplying everything by the same positive number doesn't change which is biggest.*
3. Flip sign: $\arg\max_\mu \; -(x-\mu)^2 = \arg\min_\mu \sum_x (x-\mu)^2$
   *// maximizing a negative thing = minimizing the positive version of that thing.*

> [!important] Normal distribution = Least Squares
> MLE for the mean of a normal distribution **is** the least squares problem.
> - Optimal $\mu$ = ==**sample mean**==
> - Optimal $\sigma^2$ = ==**sample variance**==
>
> This is a deep connection: **assuming a normal distribution leads to the least squares loss.**

---

## 4) Bayesian learning

### Core idea

In the Bayesian view, we ==**assign probabilities to models**== themselves. Instead of one best guess, we get a full **posterior distribution** over $\theta$.

*// Frequentist says "there is ONE true model, let me guess it." Bayesian says "I'm not sure which model is right, so let me keep a scorecard of how likely each model is."*

> [!important] Bayes' Rule (know this cold)
> $$p(\theta \mid X) = \frac{p(X \mid \theta) \, p(\theta)}{p(X)}$$
>
> *// Read it as: "my updated belief about $\theta$ = (how well $\theta$ explains the data) $\times$ (what I believed before) / (a normalizing constant so it all adds up to 1)"*

| Term | Name | Meaning |
|---|---|---|
| $p(\theta \mid X)$ | ==**Posterior**== | Belief about $\theta$ *after* seeing data |
| $p(X \mid \theta)$ | **Likelihood** (data distribution) | How probable the data is under model $\theta$ |
| $p(\theta)$ | ==**Prior**== | Belief about $\theta$ *before* seeing data |
| $p(X)$ | **Model evidence** (marginal likelihood) | Probability of data across all models |

*// Model evidence $p(X)$: "if I average over ALL possible models, how likely is this data?" It's the denominator that makes the posterior sum to 1. Often the hardest part to compute.*

### Coin example (Bayesian version)

With a uniform prior ($p(\text{Straight}) = p(\text{Bent}) = 0.5$), the priors cancel and:

$$p(\text{Straight} \mid D) = \frac{p(D \mid \text{Straight})}{p(D \mid \text{Straight}) + p(D \mid \text{Bent})} = 0.48$$

$$p(\text{Bent} \mid D) = 0.52$$

Both approaches prefer Bent, but Bayesian tells us **how uncertain** we are: both models are still quite likely.

### Bayesian vs Frequentist — key differences

| | Frequentist (MLE) | Bayesian |
|---|---|---|
| Output | Single point estimate $\hat{\theta}$ | Full distribution $p(\theta \mid X)$ |
| Prior needed? | No | Yes |
| Uncertainty? | Not directly | Yes, from posterior variance |
| Downside | Loses uncertainty info | Hard to compute for complex models |

> [!tip] The prior **encodes our assumptions** about the problem. This is a feature, not a bug.

---

## 5) Probabilistic classification: two approaches

Given features $X$ and class $Y$, we want $p(Y \mid X)$.

> [!abstract] Know the difference
> - **Generative** classifier: learn $p(X \mid Y)$ and $p(Y)$, then flip with Bayes' rule.
> - **Discriminative** classifier: learn $p(Y \mid X)$ directly.
>
> *// Generative = "what does spam look like? what does ham look like?" then compare. Discriminative = "given this email, what's the chance it's spam?" directly.*

### Generative classifier

Learn $p(X \mid Y)$ and $p(Y)$, then apply Bayes' rule:

$$p(\text{pos} \mid x) = \frac{p(x \mid \text{pos})\,p(\text{pos})}{p(x \mid \text{pos})\,p(\text{pos}) + p(x \mid \text{neg})\,p(\text{neg})}$$

Models *how the data is generated* for each class.

### Discriminative classifier

Learn $p(Y \mid X)$ directly. Maps features to class probabilities (like a regression). Example: logistic regression.

### Three levels of generative classifiers

| Classifier | What it does | Trade-off |
|---|---|---|
| **Bayes optimal** | Marginalize over ALL models in the model class | Provably optimal, but usually too expensive to compute |
| **Bayes classifier** | Fit a single distribution $p(X \mid Y)$ per class | Reasonable for low-dimensional data |
| **Naive Bayes** | Assume conditionally independent features | Simple, cheap, effective for high-dimensional data |

*// The Bayes optimal classifier is not the same as the Bayes classifier. "Optimal" averages over every possible model; "Bayes" picks one best model per class. Know the difference.*

---

## 6) Bayes classifier

**Algorithm**:
1. Choose a probability distribution family (e.g., Multivariate Normal / MVN).
2. Separate training data by class.
3. Fit a separate distribution to each class subset using MLE.
4. Estimate class prior $p(Y)$ from class frequencies.
5. For a new point, apply Bayes' rule to get class probabilities.

For MVNs: the ML estimates are just the **sample mean** vector and **sample covariance matrix** of each class.

---

## 7) Naive Bayes classifier

> [!important] The Naive Bayes assumption
> Assume all features are ==**conditionally independent given the class**==:
> $$p(X_1, X_2, \ldots, X_n \mid Y) = p(X_1 \mid Y) \times p(X_2 \mid Y) \times \cdots \times p(X_n \mid Y)$$
> "Naive" because features are rarely truly independent. But it works surprisingly well for high-dimensional data.
>
> *// "Once I know it's spam, the fact that it contains 'pill' tells me nothing extra about whether it contains 'meeting'." That's the assumption. Probably wrong, but good enough in practice.*

> [!warning] Common exam trap
> We do **NOT** assume features are independent overall. They are only ==conditionally independent **given the class**==.
>
> *// "pill" and "meeting" CAN be correlated in the full dataset. But once you split by class (look at only spam, or only ham), they become independent. The class "explains away" the correlation.*

### How it works (spam example)

For binary features like word occurrences:
- Estimate $p(\text{feature}=T \mid \text{class})$ as the **relative frequency** in training data.
- For a new instance, multiply all per-feature probabilities together, then multiply by the class prior.
- Compare the resulting values across classes.

Example: email with "pill" and "meeting":
- $p(\text{ham} \mid x) \propto p(X_1{=}T \mid \text{ham}) \times p(X_2{=}T \mid \text{ham}) \times p(\text{ham}) = (2/6)(5/6)(6/11) \approx 0.15$
- $p(\text{spam} \mid x) \propto (3/5)(1/5)(5/11) \approx 0.055$
- Classify as **ham** (higher value). Normalize to get proper probabilities.

### Smoothing (Laplace smoothing)

> [!warning] The zero-probability problem
> If a feature value never appears for some class, its probability estimate is **0**. Since naive Bayes multiplies all features, ==**one zero kills everything**==.

**Solution**: add pseudo-observations (Laplace smoothing).

$$p(X_1{=}T \mid Y{=}\text{spam}) = \frac{\text{freq of T in spam} + 1}{\text{total spam instances} + v}$$

where $v$ = number of possible values for that feature.

*// Just pretend you saw each possible value one extra time. For binary features, v=2 (T or F). This way nothing is ever exactly 0.*

For less impact, use $\lambda$-smoothing (replace 1 with a small $\lambda$ like 0.01):

$$p(X_1{=}T \mid Y{=}\text{spam}) = \frac{\text{freq of T in spam} + \lambda}{\text{total spam instances} + \lambda v}$$

### Continuous Naive Bayes

Can use normal distributions per feature. The independence assumption means a ==**diagonal covariance matrix**== (axis-aligned ellipses only). Parameters grow **linearly** with features (vs quadratically for full MVN).

*// Diagonal covariance = the ellipse can only stretch horizontally or vertically, never tilted. Tilted ellipses require full covariance (feature pairs talking to each other), which Naive Bayes forbids.*

---

## 8) Logistic regression (discriminative classifier)

### Setup

A **linear** classifier with a probabilistic twist:

> [!important] Logistic regression model
> $$c(x) = \sigma(w^T x + b)$$
> The **logistic sigmoid** squeezes $w^T x + b$ into $[0,1]$, so the output = $p(\text{pos} \mid x)$.
>
> *// Step 1: compute a score $w^Tx + b$ (can be any number from $-\infty$ to $+\infty$). Step 2: feed it through the sigmoid to squash it into a valid probability between 0 and 1.*

### The logistic sigmoid

$$\sigma(t) = \frac{1}{1+e^{-t}} = \frac{e^t}{1+e^t}$$

> [!important] Memorize these properties
> - **Symmetry**: ==$1 - \sigma(t) = \sigma(-t)$==
>   *// flipping the sigmoid upside down is the same as mirroring it left-to-right*
> - **Derivative**: ==$\sigma'(t) = \sigma(t)\,(1 - \sigma(t))$==
>   *// the slope at any point is just the output times (1 minus the output). Super clean, which is why everyone uses this sigmoid.*
> - Range: $(0, 1)$; $\sigma(0) = 0.5$

### Log loss (binary cross-entropy loss)

We want to maximize the probability of the true class labels (MLE). Take the negative log:

$$\text{loss} = -\sum_{x \in X_P} \log q_x(\text{Pos}) - \sum_{x \in X_N} \log q_x(\text{Neg})$$

where $q_x(\text{Pos}) = \sigma(w^T x + b)$ and $q_x(\text{Neg}) = 1 - \sigma(w^T x + b)$.

*// For each point: "what probability did the classifier give to the CORRECT class?" Take -log of that. If it was confident and right (prob near 1), $-\log(1) \approx 0$ = low loss. If it was confident and wrong (prob near 0), $-\log(0) \to \infty$ = huge loss.*

### Why log loss is better than least squares for classification

> [!abstract] Key contrast (likely exam question)
> | | Least squares | Log loss |
> |---|---|---|
> | Far-away correct points | ==Huge residuals, pull boundary wrong== | Contribute ~0 loss |
> | Points near boundary | Moderate influence | ==Dominate the gradient== |
> | Outlier clusters | Break the classifier | No effect |

### Gradient (result of derivation)

$$\frac{\partial \text{loss}}{\partial w_i} = -\sum_{x \in X_P} q_x(N) \, x_i + \sum_{x \in X_N} q_x(P) \, x_i$$

*// For each positive point: the gradient contribution is (how wrong we are on it) $\times$ (its feature value). If we already classify it correctly with high confidence, $q_x(N) \approx 0$ and it contributes almost nothing. Misclassified points dominate the update.*

*// For each negative point: same logic but mirrored — $q_x(P)$ measures how wrongly we call it positive.*

### Decision boundary

> [!tip] The decision boundary is still **linear**
> Boundary at $\sigma(w^T x + b) = 0.5 \Rightarrow w^T x + b = 0$. Same hyperplane as before; ==only the loss function changed==.

### Convexity

There is no analytical (closed-form) solution for logistic regression, but the log loss is ==**convex**==, so gradient descent is guaranteed to find the global minimum.

*// Unlike many ML problems where you can get stuck in local minima, logistic regression has only one "valley." Any path downhill leads to the same bottom.*

### Caveat: overconfident probabilities

Logistic regression can express how certain it is about a classification, but in practice these probabilities are ==usually more confident than they should be==. Take them with a grain of salt.

*// The model might say "99% spam" when it should really say "85% spam." The probabilities are useful for ranking, but don't trust their exact values blindly.*

---

## 9) Information theory

### Intuition: codes from coin flips

Imagine simulating a 4-sided die with coin flips. Flip twice: HH=1, HT=2, TH=3, TT=4. Each outcome has probability $(1/2)^2 = 1/4$ and needs 2 coin flips = 2 bits.

Now imagine a **loaded** die where outcome "a" is very likely. You can build a tree where "a" needs only 1 flip (short path) and rare outcomes need 3+ flips (long paths). The resulting binary strings are a **prefix-free code**: no codeword is the start of another, so you can stick messages together without delimiters.

*// This is exactly what Morse code does: "e" (most common letter) gets a single dot, while "q" gets dash-dash-dot-dash. Samuel Morse knew frequent things should have short codes.*

The key connection: in these trees, the number of coin flips to reach outcome $x$ equals $-\log_2 p(x)$.

### Key insight: what does $-\log p(x)$ mean?

> [!important] $-\log_2 p(x)$ = the codelength of outcome $x$
> - High probability outcomes get **short** codes.
> - Low probability outcomes get **long** codes.
> - $L(x) = -\log_2 p(x)$ bits.
>
> *// Imagine encoding die rolls as binary messages. Common outcomes (like rolling a 1 on a loaded die) should get short codes (few bits), rare outcomes get long codes (many bits). $-\log_2 p(x)$ tells you exactly how many bits you need.*

### Entropy

> [!important] Entropy = expected codelength
> $$H(p) = -\sum_{x} p(x) \log p(x)$$
> Measures the ==**uncertainty / randomness**== of a distribution.
>
> *// "On average, how surprised will I be?" If all outcomes are equally likely, you're maximally surprised every time (high entropy). If you already know what's going to happen, no surprise (zero entropy).*

- ==**Uniform**== distribution = **maximum** entropy (most uncertain).
- ==**Deterministic**== distribution = entropy of **0** (no uncertainty).

Convention: $0 \cdot \log(0) = 0$ when computing entropy.

### Cross-entropy

// "Codelength" generally refers to ==the number of units (such as bits, bytes, or characters) used to represent data or a sequence of signals==.

Expected codelength if we use code from distribution $q$ but data comes from $p$:

$$H(p, q) = -\sum_x p(x) \log q(x)$$

*// "My data really comes from distribution $p$, but I built my codes based on distribution $q$. How many bits do I waste on average?" If $q$ matches $p$ perfectly, no waste. If $q$ is wrong, I waste bits.*

- Always $\geq H(p)$ (the entropy). ==Equal only when $p = q$==.
- Measures the "distance" between $p$ and $q$.

> [!important] Log loss IS cross-entropy loss
> Treat true labels as distribution $p$ and classifier output as $q$. Minimizing log loss = minimizing cross-entropy.

### KL divergence

The "extra cost" of using $q$ instead of $p$:

$$\text{KL}(p, q) = H(p, q) - H(p) = -\sum_x p(x) \log \frac{q(x)}{p(x)}$$

*// KL = cross-entropy minus entropy = the EXTRA bits wasted because you used $q$ instead of the perfect code $p$. It's 0 when your model is perfect, and gets bigger the more your model is off.*

- $\text{KL}(p,q) = 0$ iff $p = q$.
- ==**Not symmetric**== ($\text{KL}(p,q) \neq \text{KL}(q,p)$), so it's not a true distance.
  *// the "distance" from Amsterdam to the airport is different from the airport to Amsterdam (one-way streets). Same idea — direction matters.*

### Continuous versions

For continuous distributions, sums become integrals:

$$H(p) = -\int p(x) \log p(x) \, dx$$

$$\text{KL}(p, q) = -\int p(x) \log \frac{q(x)}{p(x)} \, dx$$

*// Same idea, just replace $\sum$ with $\int$. These show up when working with continuous models like normal distributions.*

---

## 10) Minimum Description Length (MDL)

### Core principle

> [!abstract] MDL in one sentence
> ==A model that compresses data well has learned something about it.==

**Two-part coding**: minimize total message = cost of describing the model + cost of describing the data given the model.

// The Minimum Description Length (MDL) principle in machine learning is ==an information-theoretic approach for model selection, stating that the best model for a given dataset is the one that minimizes the sum of the model's description length and the length of the data encoded by that model==

$$\arg\min_M \; \underbrace{L(M)}_{\text{model cost}} + \underbrace{L_M(X)}_{\text{data cost given model}}$$

*// Imagine texting a friend your dataset. You can either: (a) send every data point raw (expensive), or (b) first send a model ("it's roughly a line with slope 2") then send only the small errors. Option (b) is cheaper if the model is good. MDL says: the best model is the one that makes the total text message shortest.*

- Simple model (few parameters) = cheap to send, but large residuals.
- Complex model (many parameters) = expensive to send, but small residuals.
- MDL finds the **sweet spot**: balances model complexity vs fit quality.

### Connection to Bayesian learning

Maximizing the posterior $p(M)p(X \mid M)$ is the same as minimizing $-\log p(M) - \log p(X \mid M) = L(M) + L_M(X)$. The prior $p(M)$ becomes the cost of describing the model.

*// This is why Bayesian learning and MDL often give the same answer: the prior says "simple models are more likely", and MDL says "simple models are cheaper to transmit." Different words, same math.*

> [!tip] MDL encodes a **simplicity assumption**: compressible patterns generalize; incompressible parts are noise.

---

## Quick reference: what to know for the exam

> [!important] Must-know formulas

| Concept                        | Key formula / idea                                             |
| ------------------------------ | -------------------------------------------------------------- |
| **MLE**                        | $\hat{\theta} = \arg\max_\theta p(X \mid \theta)$              |
| **Log-likelihood**             | Take log, turn products into sums                              |
| **Normal MLE = least squares** | $\arg\min_\mu \sum(x-\mu)^2$ gives the sample mean             |
| **Bayes' rule for posterior**  | $p(\theta \mid X) = p(X \mid \theta)p(\theta) / p(X)$          |
| **Naive Bayes assumption**     | Features conditionally independent **given class**             |
| **Laplace smoothing**          | Add pseudo-counts to avoid zero probabilities                  |
| **Logistic sigmoid**           | $\sigma(t) = 1/(1+e^{-t})$; symmetry: $1-\sigma(t)=\sigma(-t)$ |
| **Log loss**                   | $-\sum \log q_x(\text{true class})$ = cross-entropy loss       |
| **Entropy**                    | $H(p) = -\sum p(x)\log p(x)$ = expected codelength             |
| **Cross-entropy**              | $H(p,q) = -\sum p(x)\log q(x) \geq H(p)$                       |
| **KL divergence**              | $\text{KL}(p,q) = H(p,q) - H(p)$; not symmetric                |
| **MDL**                        | $\min [L(\text{model}) + L(\text{data} \mid \text{model})]$    |



---

## Related Notes
- [[Stats/Stats Review]] — statistics and probability foundations
- [[ML/Lecture 2 — Model Evaluation (Experiments + Metrics + Basic Stats)]] — evaluation using statistical methods
- [[Quantitative Trading/Topic Notes/3 - Conditional Probability and Bayes]] — Bayes' theorem in probabilistic models
- [[ML/Lecture 4 — Neural Networks & Backpropagation]] — neural nets as an alternative to explicit probability models

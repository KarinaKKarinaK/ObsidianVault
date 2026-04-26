# Application Question Cookbook

> [!tip] Most Important File
> Application questions are the **most difficult but most predictable** part of the exam. There are 10 types — the exam picks ~5–6. Master all 10 and there will be **no surprises**.

See also: [[00 - Exam Strategy]], [[04 - Probability & Information Theory]], [[08 - What To Memorize vs What's On The Sheet]]

---

## Type 1: Find the Gradient

> **Frequency**: Practice A | **Pattern**: Given a polynomial model, derive $\frac{\partial \text{loss}}{\partial \theta}$

### Procedure
1. Write the loss: $\frac{1}{2}\sum_i (y_i - t_i)^2$ where $y_i = f_\theta(x_i)$
2. Apply rules step by step — identify which rule at each step:
   - **Sum rule**: move $\frac{\partial}{\partial \theta}$ inside $\sum$
   - **Chain rule**: $\frac{\partial (y_i - t_i)^2}{\partial \theta} = 2(y_i - t_i) \cdot \frac{\partial(y_i - t_i)}{\partial \theta}$
   - **Constant factor**: the $\frac{1}{2}$ cancels the $2$
3. Substitute $y_i$ definition and differentiate w.r.t. the specific parameter
4. The $\frac{1}{2}$ and the $2$ always cancel — final result has no $\frac{1}{2}$

### Worked Example (Practice A)
Model: $y_i = -vx_i^2 + wx_i + b$

**Derivative w.r.t. $b$:**
$$\frac{\partial}{\partial b}\frac{1}{2}\sum_i(y_i - t_i)^2 = \sum_i (y_i - t_i) \cdot \frac{\partial y_i}{\partial b} = \sum_i (-vx_i^2 + wx_i + b - t_i) \cdot 1$$

**Derivative w.r.t. $w$:** same but $\frac{\partial y_i}{\partial w} = x_i$, so answer has $x_i$ factor

> [!warning] Common Pitfall
> Know which rule is used at each step — the exam asks you to **name the rule** (sum rule, chain rule, constant factor). The names are on your formula sheet.

### `ON SHEET`: All differentiation rules, gradient definition

---

## Type 2: Find a Ranking

> **Frequency**: **Every exam** (Q26–28 or Q28–30) | 3 questions

### Procedure
1. **Identify the classifier**: $w^Tx + b >^? 0$ (or similar)
2. **Compute** $w^Tx + b$ for each instance
3. **Rank** from most negative to most positive based on the **signed distance** to the decision boundary
   - If only one feature matters (e.g., coefficient of $x_1 = 0$), just sort by the relevant feature
   - Check which direction is "positive" — **higher score = more positive** (but check the sign!)
4. **Count ranking errors**: a ranking error is a **PAIR** $(p, n)$ where a negative instance $n$ is ranked more positive than a positive instance $p$
5. **Coverage proportion** = ranking errors / (num_pos × num_neg)

### Worked Example (2024 Exam)
Classifier: $\text{Pos if } 0 \cdot x_1 - x_2 > -2$, i.e., $\text{Pos if } -x_2 + 2 > 0$, i.e., $\text{Pos if } x_2 < 2$

- Only $x_2$ matters. Decision boundary at $x_2 = 2$
- **Lower $x_2$ = more positive** (because of the negative sign!)
- Sort by $x_2$ descending (most negative first): g(7), f(5), d(5), e(4), b(3), a(2), c(1)
- Ranking: g, f, d, e, b, a, c → most neg to most pos

**Ranking errors**: pairs where neg is ranked more positive than pos:
- c(Neg) is ranked most positive → errors with f, e, b, a (4 positives to left) = 4 errors
- Plus (f,d) where d(Neg) is ranked below f(Pos) — wait, d is more negative... let me recount.

Actually from the exam: ranking is g,f,d,e,b,c,a and there are 5 ranking errors.

**Coverage** = 5 / (4 pos × 3 neg) = 5/12

> [!warning] Critical Pitfalls
> - A ranking error is a **PAIR**, not an individual misclassification!
> - On a dataset with $p$ positives and $n$ negatives, max ranking errors = $p \times n$
> - Check the **sign** carefully — negative coefficient means higher value = more negative class
> - Coverage = ranking errors / (num_pos × num_neg) — **simplify the fraction**

### 2025 Exam Variation
Same structure: classifier ignores $x_1$, rank by $x_2$. Had **11 ranking errors** out of 12 possible → coverage = 11/12.

### `ON SHEET`: Linear classification model $w^Tx + b >^? y$

---

## Type 3: Entropy & Cross-Entropy

> **Frequency**: **Every exam** (Q31–33) | 2–3 questions

### Procedure
1. **Entropy**: $H(p) = -\sum_x p(x) \log_2 p(x)$ — remember $0 \log_2 0 = 0$
2. **Cross-entropy**: $H(p, q) = -\sum_x p(x) \log_2 q(x)$ — $p$ is "true", $q$ goes in the log
3. **KL divergence**: $KL(p, q) = H(p, q) - H(p)$
4. Check for **undefined**: $\log_2(0)$ is undefined. If $q(x) = 0$ but $p(x) \neq 0$, then $H(p,q)$ is **undefined**. But if $p(x) = 0$ and $q(x) = 0$, term is $0 \cdot \log_2(0) = 0$ (defined).

### Speed Tips
- Use $\log_2 1 = 0$, $\log_2 2 = 1$, $\log_2 4 = 2$, $\log_2 8 = 3$
- Use $\log \frac{a}{b} = \log a - \log b$
- Compute $-H$ first (positive sum) then negate — **avoids sign errors**
- Uniform over $n$ outcomes → $H = \log_2 n$

### Worked Example (Practice A)
$p = (\frac{1}{4}, \frac{1}{4}, \frac{1}{4}, \frac{1}{4})$, $q = (\frac{1}{4}, 0, \frac{1}{4}, \frac{1}{2})$

**$H(p)$**: Uniform over 4 → $H(p) = \log_2 4 = 2$ bits

**$H(q)$**: $-[\frac{1}{4}\log_2\frac{1}{4} + 0\log_2 0 + \frac{1}{4}\log_2\frac{1}{4} + \frac{1}{2}\log_2\frac{1}{2}]$
$= -[\frac{1}{4}(-2) + 0 + \frac{1}{4}(-2) + \frac{1}{2}(-1)] = -[-\frac{1}{2} - \frac{1}{2} - \frac{1}{2}] = 1.5$ bits

**$H(q, p)$**: $-\sum q(x) \log_2 p(x) = -[\frac{1}{4}\log_2\frac{1}{4} + 0 + \frac{1}{4}\log_2\frac{1}{4} + \frac{1}{2}\log_2\frac{1}{4}]$
$= -[\frac{1}{4}(-2) + \frac{1}{4}(-2) + \frac{1}{2}(-2)] = -[-\frac{1}{2} - \frac{1}{2} - 1] = 2$

**$H(p, q)$**: **UNDEFINED** because $q(b) = 0$ but $p(b) = \frac{1}{4} \neq 0$ → we'd need $\frac{1}{4}\log_2(0)$

### Understanding Question (Practice A Q18)
When $q(a) = 0$ but $p(a) \neq 0$: the codelength for $a$ under code $q$ is infinite → expected codelength under $p$ is also infinite.

### Exam Patterns Across Years

| Exam | Distributions | Key Trap |
|------|--------------|----------|
| Practice A | Uniform $p$, zero in $q$ | $H(p,q)$ undefined |
| Practice B | Both $\frac{k}{8}$ fractions | Both cross-entropies defined |
| 2024 | $\frac{k}{8}$ fractions, zero in $q$ | $H(p,q)$ undefined, $H(q,p)$ defined |
| 2025 | $\frac{k}{8}$ fractions, zeros in both | $H(p,q)$ undefined, $H(q,p)$ defined |

> [!warning] The Undefined Trap
> **Every recent exam** has one cross-entropy that's undefined. Check: does $q(x) = 0$ for any $x$ where $p(x) \neq 0$? If yes → $H(p,q)$ is undefined. The reverse ($p(x) = 0$, $q(x) \neq 0$) gives $0 \cdot \log_2(\text{something})= 0$ → fine.

### `ON SHEET`: $H(p)$, $H(p,q)$, $KL(p,q)$, Information gain
### `MEMORIZE`: $0 \log_2 0 = 0$ convention, $\log_2 0$ undefined otherwise, argument order

---

## Type 4: Scalar Backpropagation

> **Frequency**: **Every exam** (Q29–30 or Q34–35) | 2 questions

### Procedure
1. **Break function into modules** — each module is one operation
2. **Draw computation graph** — identify all paths from input $x$ to output $f$
3. **Compute local derivatives** symbolically: $\frac{\partial(\text{output})}{\partial(\text{input})}$ for each module
4. **Apply chain rule** along each path; if $x$ affects $f$ through **multiple paths**, use the **multivariate chain rule** = **sum** the contributions from each path
5. Fill in values and simplify

### The Multivariate Chain Rule
If $x$ affects $f$ through paths via $a$ and $b$:
$$\frac{\partial f}{\partial x} = \frac{\partial f}{\partial a}\frac{\partial a}{\partial x} + \frac{\partial f}{\partial b}\frac{\partial b}{\partial x}$$

This is the **sum over all paths** from $x$ to $f$.

### Worked Example (Practice A)
$f(x) = \sin(\sin(x)\cos(x))$

**Modules:**
- $a = \sin(x)$, $b = \cos(x)$, $c = ab$, $f = \sin(c)$

**Computation graph**: $x \to a \to c \to f$ AND $x \to b \to c \to f$

**Local derivatives:**
- $\frac{\partial f}{\partial c} = \cos(c)$
- $\frac{\partial c}{\partial a} = b$, $\frac{\partial c}{\partial b} = a$
- $\frac{\partial a}{\partial x} = \cos(x)$, $\frac{\partial b}{\partial x} = -\sin(x)$

**Multivariate chain rule** (because $x$ affects $c$ through both $a$ and $b$):
$$\frac{\partial f}{\partial x} = \frac{\partial f}{\partial c}\left(\frac{\partial c}{\partial a}\frac{\partial a}{\partial x} + \frac{\partial c}{\partial b}\frac{\partial b}{\partial x}\right) = \cos(c)[b\cos(x) - a\sin(x)]$$

### Worked Example (2024)
$f(x) = \frac{3(4x+1)^2}{x^2}$

**Modules:** $a = 4x+1$, $b = x^2$, $c = 3a^2$, $f = c/b$

**Two paths**: $x \to a \to c \to f$ and $x \to b \to f$

**Local derivatives:**
- $\frac{\partial f}{\partial c} = \frac{1}{b}$, $\frac{\partial f}{\partial b} = -\frac{c}{b^2}$
- $\frac{\partial c}{\partial a} = 6a$, $\frac{\partial a}{\partial x} = 4$, $\frac{\partial b}{\partial x} = 2x$

$$\frac{\partial f}{\partial x} = \frac{1}{b} \cdot 6a \cdot 4 + \left(-\frac{c}{b^2}\right) \cdot 2x = \frac{24a}{b} - \frac{2cx}{b^2}$$

### Worked Example (2025)
$f(x) = \frac{\sin(x^{-1})}{\cos(x^{-1})}$

**Modules:** $c = x^{-1}$, $a = \sin(c)$, $b = \cos(c)$, $f = a/b$

**Two paths**: $x \to c \to a \to f$ and $x \to c \to b \to f$

**Local derivatives:**
- $\frac{\partial f}{\partial a} = \frac{1}{b}$, $\frac{\partial f}{\partial b} = -\frac{a}{b^2}$
- $\frac{\partial a}{\partial c} = \cos(c)$, $\frac{\partial b}{\partial c} = -\sin(c)$
- $\frac{\partial c}{\partial x} = -\frac{1}{x^2}$

$$\frac{\partial f}{\partial x} = \left(\frac{\cos c}{b} \cdot \left(-\frac{1}{x^2}\right)\right) + \left(-\frac{a\sin c}{b^2} \cdot \left(-\frac{1}{x^2}\right)\right) = -\frac{\cos c}{bx^2} - \frac{a\sin c}{b^2 x^2}$$

> [!warning] Key Pitfalls
> - **Always** check if $x$ reaches $f$ through **multiple paths** — if yes, you MUST sum
> - Know your common derivatives: $\frac{\partial}{\partial x}\frac{a}{b} = \frac{1}{b}$ w.r.t. $a$ and $-\frac{a}{b^2}$ w.r.t. $b$
> - The question asks for symbolic local derivatives — don't plug in numbers until the end

### `ON SHEET`: Chain rule, all common derivatives
### `MEMORIZE`: Multivariate chain rule (sum over paths), how to identify modules

---

## Type 5: Decision Trees

> **Frequency**: **Every exam** (Q36–38) | 2–3 questions

### Procedure — "Which feature to split on?"
1. For each feature, tally the class distribution on both sides of the split:

| Feature | A side | B side |
|---------|--------|--------|
| $x_1$ | Y:4, N:2 | Y:2, N:4 |
| $x_2$ | Y:5, N:1 | Y:1, N:5 |

2. **Most uneven = best split** (highest information gain)
3. If both sides have the same imbalance ratio, the feature with the most extreme ratio wins
4. **Shortcut**: if one feature gives perfect split (all Y on one side, all N on other) → that's it, entropy = 0

### Procedure — "Information gain for a specific feature"
1. Compute $H(S)$ = entropy of the class distribution before the split
2. After splitting, compute $H(S_i)$ for each child
3. $IG = H(S) - \sum_i \frac{|S_i|}{|S|} H(S_i)$

### Worked Example (2024 Q38)
At the open node, 4 instances with labels NYYN → $H(S) = 1$ bit (uniform 2:2)

Split on $x_1$: B-side gets YY → $H = 0$; A-side gets NN → $H = 0$

$IG = 1 - \frac{2}{4}(0) - \frac{2}{4}(0) = 1$

### Worked Example (2025 Q38)
At the open node, 4 instances with labels YYYY → $H(S) = 0$ bits

Any split gives: $IG = 0 - 0 = 0$

### Quick Entropy Values to Know
| Distribution | Entropy |
|-------------|---------|
| All same class | 0 bits |
| 50/50 (uniform binary) | 1 bit |
| Uniform over 4 | 2 bits |
| 1/3, 2/3 | ≈ 0.918 bits |
| 1/4, 3/4 | ≈ 0.811 bits |
| 1/8, 7/8 | ≈ 0.544 bits |

### `ON SHEET`: Information gain $I_S(V) = H(S) - \sum_i |S_i|/|S| \cdot H(S_i)$, Entropy formula
### `MEMORIZE`: Shortcut — look for most uneven split first before computing

---

## Type 6: Evidence Lower Bound (ELBO)

> **Frequency**: Practice A, Practice B | Sometimes (not in 2024/2025 as separate, but combined with decision trees section)

### The Derivation (Fill in the Blanks)
$$\underbrace{L(q,\theta)}_{\text{ELBO}} + \underbrace{KL(q, p)}_{\geq 0} = \ln p(x|\theta)$$

**Key identity**:
$$L(q,\theta) + KL(q,p) = \mathbb{E}_q \ln \frac{p(x,z|\theta)}{q(z|x)} - \mathbb{E}_q \ln \frac{p(z|x,\theta)}{q(z|x)}$$

The derivation shows that the two terms simplify to $\ln p(x|\theta)$.

### What to Memorize
- $L(q,\theta) = \mathbb{E}_q \ln \frac{p(x,z|\theta)}{q(z|x)}$ — the ELBO
- $KL(q,p) = -\mathbb{E}_q \ln \frac{p(z|x,\theta)}{q(z|x)}$ — always $\geq 0$
- Therefore $L(q,\theta) \leq \ln p(x|\theta)$ — ELBO is a **lower bound**

### How EM Uses This
- Iterate: choose $q$ to minimize $KL(q,p)$ (E-step), then choose $\theta$ to maximize $L(q,\theta)$ (M-step)

### How VAE Uses This
Further rewrite: $-\ln p(x) \geq -L(q,\theta)$
$$= -\mathbb{E}_q \ln p(x|z) + KL(q(z|x), \mathcal{N}(0, I))$$
- First term = reconstruction loss
- Second term = KL to standard normal (regularizer)
- We minimize $-\ln p(x)$ because deep learning uses **loss** (lower is better)

### Practice B Q38–39
- Fill in blanks in the decomposition
- Q39: "Why does this help?" → It shows $L(q,\theta)$ is a **lower bound** on the quantity we want to maximize

### `MEMORIZE`: The ELBO decomposition, EM steps, VAE loss terms

---

## Type 7: Naive Bayes

> **Frequency**: Practice A | Sometimes

### Procedure
1. **Compute class priors** from data: $p(\text{Spam}) = \frac{\text{count spam}}{\text{total}}$
2. For each feature value, compute **conditional probability**: $p(\text{feature}=v | \text{class})$
3. **Naive Bayes assumption**: features are independent given class
$$p(\text{class} | \text{instance}) \propto p(\text{class}) \prod_j p(\text{feature}_j | \text{class})$$
4. Compute for each class, then **normalize** to get probabilities

### Smoothing
- Add **pseudo-observations**: for each class, add one instance with all T's and one with all F's
- For $k$-valued features: add $k$ pseudo-observations per class (one for each value)
- This ensures no zero probabilities

### Worked Example (Practice A)
Dataset: 4 spam, 4 ham. Features: "pill" (T/F), "meeting" (T/F).

**Without smoothing — email with "pill"=T, "meeting"=F:**
- $p(\text{Spam}) = 4/8$, $p(\text{Ham}) = 4/8$
- $p(\text{pill}=T|\text{Spam}) = 3/4$, $p(\text{meeting}=F|\text{Spam}) = 3/4$
- $p(\text{pill}=T|\text{Ham}) = 1/4$, $p(\text{meeting}=F|\text{Ham}) = 2/4$
- Spam: $\frac{4}{8} \cdot \frac{3}{4} \cdot \frac{3}{4} = \frac{9}{32}$
- Ham: $\frac{4}{8} \cdot \frac{1}{4} \cdot \frac{2}{4} = \frac{2}{32}$
- $p(\text{Spam}|e) = \frac{9}{9+2} = \frac{9}{11}$

> [!warning] All 4 answer options are usually possible outcomes — check your work!

### `ON SHEET`: Bayes' law, conditional probability
### `MEMORIZE`: Naive Bayes independence assumption, smoothing procedure

---

## Type 8: Support Vector Machines

> **Frequency**: Practice A, Practice B | Sometimes

### Procedure — "Find support vectors"
A support vector satisfies: $y_i(w^Tx_i + b) = 1$

Where $y_i = +1$ for positive class, $y_i = -1$ for negative class.

1. For each candidate point, compute $w^Tx_i + b$
2. Multiply by $y_i$
3. If result = 1 → it's a support vector

### Procedure — "How are points classified?"
Simply compute $w^Tx + b$:
- If $> 0$ → Positive
- If $< 0$ → Negative

### Worked Example (Practice A)
$w = (-3, 2)^T$, $b = 2$

**Check** $y_1 = 1, x_1 = (1,1)$: $w^Tx_1 + b = -3+2+2 = 1$ → $y_1 \cdot 1 = 1$ ✓
**Check** $y_2 = -1, x_2 = (1,0)$: $w^Tx_2 + b = -3+0+2 = -1$ → $(-1)(-1) = 1$ ✓

So $(1,1)$ pos and $(1,0)$ neg are support vectors → **Answer C**

### Worked Example — Classification
$x_1 = (-1, 0)$: $w^Tx + b = 3+0+2 = 5 > 0$ → Positive
$x_2 = (0, 1)$: $w^Tx + b = 0+2+2 = 4 > 0$ → Positive

### `ON SHEET`: SVM classification objective, SVM dual
### `MEMORIZE`: Support vector condition $y_i(w^Tx_i + b) = 1$

---

## Type 9: Markov Models

> **Frequency**: 2024, 2025 | **Recent exams** (Q33–35)

### Procedure
1. **Decompose** using first-order Markov / chain rule of probability:
$$p(w_1, w_2, \ldots, w_n | \text{class}) = p(w_1|\text{class}) \prod_{i=2}^{n} p(w_i | w_{i-1}, \text{class})$$
2. **Estimate** each factor from the frequency table:
   - $p(w_1 | \text{class}) = \frac{\text{count}(w_1, \text{class})}{\text{total words in class}}$
   - $p(w_i | w_{i-1}, \text{class}) = \frac{\text{count}(w_{i-1}w_i, \text{class})}{\text{count}(w_{i-1}, \text{class})}$
3. **Apply Bayes' rule**: $p(\text{class}|E) \propto p(E|\text{class}) \cdot p(\text{class})$
4. For **classification**: just compare numerators (denominator $p(E)$ is the same)
5. For **exact probability**: compute full Bayes: $p(\text{spam}|E) = \frac{p(E|\text{spam})p(\text{spam})}{p(E|\text{spam})p(\text{spam}) + p(E|\text{ham})p(\text{ham})}$
6. For **probability ratio**: $\frac{p(\text{ham}|E)}{p(\text{spam}|E)} = \frac{p(E|\text{ham})p(\text{ham})}{p(E|\text{spam})p(\text{spam})}$ — lots of things cancel!

### Worked Example (2024)
Email: "complete your payment now"

Spam total: 100,000 words. Ham total: 200,000 words.

$$p(E|\text{spam}) = \frac{5000}{100000} \cdot \frac{100}{5000} \cdot \frac{100}{1000} \cdot \frac{100}{4000} = \frac{1}{20} \cdot \frac{1}{50} \cdot \frac{1}{10} \cdot \frac{1}{40} = \frac{1}{40} \cdot 10^{-4}$$

$$p(E|\text{ham}) = \frac{5000}{200000} \cdot \frac{250}{5000} \cdot \frac{250}{7500} \cdot \frac{250}{2500} = \frac{1}{40} \cdot \frac{1}{20} \cdot \frac{1}{30} \cdot \frac{1}{10} = \frac{1}{24} \cdot 10^{-4}$$

**Prior 1** (equal): spam $\propto \frac{1}{40}$, ham $\propto \frac{1}{24}$ → ham wins → classify as **ham**

**Prior 2** (80% spam): spam $\propto \frac{1}{40} \cdot \frac{80}{100} = \frac{1}{50}$, ham $\propto \frac{1}{24} \cdot \frac{20}{100} = \frac{1}{120}$ → spam wins

**Exact probability (Prior 1):**
$$p(\text{spam}|E) = \frac{\frac{1}{40} \cdot \frac{1}{2}}{\frac{1}{40} \cdot \frac{1}{2} + \frac{1}{24} \cdot \frac{1}{2}} = \frac{\frac{1}{40}}{\frac{1}{40} + \frac{1}{24}} = \frac{24}{24+40} = \frac{24}{64} = \frac{3}{8}$$

**Probability ratio (Prior 2):**
$$\frac{p(\text{ham}|E)}{p(\text{spam}|E)} = \frac{\frac{1}{24} \cdot \frac{20}{100}}{\frac{1}{40} \cdot \frac{80}{100}} = \frac{\frac{1}{120}}{\frac{1}{50}} = \frac{50}{120} = \frac{5}{12}$$

### 2025 Exam Variation
Same structure but different numbers. Spam total: 10,000, Ham total: 100,000.

> [!tip] Speed Tips
> - Group powers of 10 separately from other factors
> - Write both $p(E|\text{spam})$ and $p(E|\text{ham})$ with the **same exponent** for easy comparison
> - For the ratio, many factors cancel — write it as a fraction first before computing
> - You only need the **numerator** of Bayes' rule for classification

### `ON SHEET`: Bayes' law, conditional probability
### `MEMORIZE`: Chain rule decomposition for Markov models, bigram probability = bigram count / first word count

---

## Type 10: Matrix Backpropagation

> **Frequency**: 2024, 2025 | **Recent exams** (Q39–40)

### Procedure
1. Given a module $f$ computing a vector function, find the **scalar derivative** $\frac{\partial y_i}{\partial x_j}$
2. Key insight: if $y_i$ only depends on $x_i$ (element-wise operation), then $\frac{\partial y_i}{\partial x_j} = 0$ for $i \neq j$
3. For the **backward pass**: given $y^\nabla$ where $y_i^\nabla = \frac{\partial l}{\partial y_i}$, compute $x^\nabla$ where $x_i^\nabla = \frac{\partial l}{\partial x_i}$
4. Apply multivariate chain rule: $x_i^\nabla = \sum_k y_k^\nabla \frac{\partial y_k}{\partial x_i}$
5. Since most terms are zero (element-wise), this simplifies to $x_i^\nabla = y_i^\nabla \cdot \frac{\partial y_i}{\partial x_i}$
6. Express as a **vector operation** using $\otimes$ (element-wise multiplication)

### Worked Example (2024)
$y = x^2 + b$ (element-wise)

**Scalar derivative**: $\frac{\partial y_i}{\partial x_j} = 2x_j$ if $i = j$, else $0$

**Backward pass**:
$$x_i^\nabla = y_i^\nabla \cdot 2x_i$$
$$\therefore x^\nabla = y^\nabla \otimes 2x$$

### Worked Example (2025)
$y = x^2 + r(b)$ where $r$ is ReLU applied element-wise

**Scalar derivative of $y_i$ w.r.t. $b_j$**: $\frac{\partial y_i}{\partial b_j} = r'(b_j)$ if $i = j$, else $0$

Where $r'(b_j) = 1$ if $b_j > 0$, else $0$

**Backward pass for $b$**:
$$b_i^\nabla = y_i^\nabla \cdot r'(b_i)$$
$$\therefore b^\nabla = y^\nabla \otimes r'(b)$$

### Practice A Variation
$f_w(x) = x^2 w$ where $x$ is scalar, $w$ is vector

**Gradient w.r.t. $x$**: $x^\nabla = 2x \cdot f^{\nabla T}w$ (a scalar — dot product)
**Gradient w.r.t. $w$**: $w^\nabla = x^2 f^\nabla$ (a vector)

> [!warning] Key Pattern
> For element-wise operations: the backward pass is always $\text{upstream gradient} \otimes \text{local derivative}$
> The tricky part is when $x$ is scalar and output is vector — then you get a **dot product** (sum over all paths)

### `ON SHEET`: Chain rule, common derivatives
### `MEMORIZE`: Element-wise operations give diagonal Jacobians → backward = element-wise multiply

---

## Quick Reference: What Appears Where

| Type | Practice A | Practice B | 2024 | 2025 |
|------|-----------|------------|------|------|
| 1. Gradient | Q10–12 | — | — | — |
| 2. Ranking | Q13–15 | Q28–30 | Q26–28 | Q26–28 |
| 3. Entropy | Q16–18 | Q31–33 | Q31–32 | Q31–32 |
| 4. Backprop | Q19–21 | Q34–35 | Q29–30 | Q29–30 |
| 5. Decision trees | Q22–24 | Q36–37 | Q36–38 | Q36–38 |
| 6. ELBO | Q25–28 | Q38–39 | — | — |
| 7. Naive Bayes | Q29–32 | — | — | — |
| 8. SVM | Q33–34 | Q26–27 | — | — |
| 9. Markov model | Q35–37 | — | Q33–35 | Q33–35 |
| 10. Matrix backprop | Q38–41 | — | Q39–40 | Q39–40 |

> [!tip] Exam Prediction
> Based on the pattern, expect: **Ranking + Backprop + Entropy + Decision Trees** (guaranteed) + **Markov model and/or Matrix backprop** (very likely on recent exams). ELBO, Naive Bayes, SVM, and Gradient are less likely but still possible.

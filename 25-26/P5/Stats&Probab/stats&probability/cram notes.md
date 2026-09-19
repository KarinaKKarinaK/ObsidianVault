# STATS & PROBABILITY — LAST 30 MIN CRAM SHEET
> Course: Statistical Methods (X_401020) | Exam: Thu 4 Jun | Tools: formula sheet + calculator

---

## CRITICAL TRAPS (memorise these first)

| Trap | Wrong | Correct |
|---|---|---|
| MLE for Exponential(λ) | λ̂ = x̄ | **λ̂ = 1/x̄** |
| MLE for Geometric(p) | p̂ = x̄ | **p̂ = 1/x̄** |
| LOTUS for E[X²] | (∫x f dx)² | **∫x² f dx** |
| Var of sample mean | σ²/√n | **σ²/n** |
| Var(aX+b) | a·Var(X) | **a²·Var(X)** |
| MSE formula | Var + Bias | **Var + Bias²** |
| Sample variance denominator | n | **n−1** |
| Chi-square CI df | n | **n−1** |
| Type II error: H₀ is __ | true | **false** |
| Disjoint ↔ Independent | same thing | **opposite!** if P(A),P(B)>0, disjoint → dependent |
| Poisson P(X>1.8) | P(X>1.8) continuous | **P(X≥2)** = 1−P(0)−P(1) |
| MLE shortcut: L∝θᵃ(1−θ)ᵇ | differentiate fully | **θ̂ = a/(a+b)** |

---

## T1 — PROBABILITY RULES

**Core formulas:**
- P(A∪B) = P(A)+P(B)−P(A∩B)
- P(A∪B∪C) = 1 − P(Aᶜ∩Bᶜ∩Cᶜ) ← De Morgan, always true
- P(A∩B) ≤ P(A∪B) ← always true
- P(A∩B) − P(Aᶜ∩Bᶜ) = P(A)+P(B)−1

**Three sets disjoint** = ALL THREE pairwise empty: A∩B=∅ AND B∩C=∅ AND C∩A=∅  
(NOT just A∩B∩C=∅)

**Cannot be disjoint if:** P(B)+P(C) > 1 → they MUST overlap

---

## T2 — CONDITIONAL PROBABILITY & BAYES'

**Formulas:**
- P(A|B) = P(A∩B)/P(B) ← denominator is P(B), not P(A)
- Independence: P(A∩B) = P(A)·P(B)
- Disjoint + positive prob → DEPENDENT

**Bayes' 3-step:**
1. P(D) = P(D|A)·P(A) + P(D|Aᶜ)·P(Aᶜ)
2. P(A|D) = P(D|A)·P(A) / P(D)

**Three independent events:**  
P(A∪B∪C) = 1 − P(Aᶜ)·P(Bᶜ)·P(Cᶜ)

**Algebra trick:**  
P(A∪Bᶜ) = 1 − P(Aᶜ∩B) = 1 − P(Aᶜ)·P(B) [if independent]  
P(A∪Bᶜ) + P(A∩Bᶜ) = P(A) − P(B) + 1

---

## T3 — DISCRETE DISTRIBUTIONS

| Distribution | PMF | E[X] | Var(X) |
|---|---|---|---|
| Bernoulli(p) | P(1)=p | p | p(1−p) |
| Binomial(n,p) | C(n,k)pᵏ(1−p)ⁿ⁻ᵏ | np | np(1−p) |
| Geometric(p) | p(1−p)ᵏ⁻¹, k=1,2,... | 1/p | (1−p)/p² |
| Pascal(r,p) | C(k−1,r−1)pʳ(1−p)ᵏ⁻ʳ | r/p | r(1−p)/p² |
| Poisson(λ) | e⁻λλᵏ/k! | λ | λ |

**Key facts:**
- Geometric CDF: F(x) = 1−(1−p)^⌊x⌋, so F(2.5) = P(X≤2) = 1−(1−p)²
- P(X≥k) for Geometric = (1−p)^{k−1}
- Pascal = "k trials to get r-th success" = sum of r Geometrics
- Poisson approx Binom(n,p) when n≥100, p≤0.01, λ=np

---

## T4 — CONTINUOUS RVs: PDF, CDF, LOTUS

**CDF properties (memorise for MC):**
- ✓ Non-decreasing
- ✓ Right-continuous
- ✓ F(−∞)=0, F(+∞)=1
- ✗ NOT always strictly increasing (flat on gaps)
- ✗ NOT always left-continuous (mixed distributions)

**Formulas:**
- Find c: set ∫f(x)dx=1, solve for c
- E[X] = ∫x·f(x)dx
- **LOTUS:** E[g(X)] = ∫g(x)·f(x)dx → E[X²] = ∫x²·f(x)dx
- Var(X) = E[X²] − (E[X])²
- CDF from PDF: F(x) = ∫₋∞ˣ f(t)dt

**Common computation:**  
f(x)=cx² on [−1,1]: c=3/2  
f(x)=x⁻² on [1,∞): F(x)=1−1/x, F(4)=0.75

---

## T5 — NORMAL DISTRIBUTION

**Standardisation:** Z=(X−μ)/σ, then use Φ table  
- P(X>a) = 1−Φ((a−μ)/σ)
- Φ(−z) = 1−Φ(z) [symmetry]

**Linear transform:** Y=aX+b, X~N(μ,σ²) → Y~N(aμ+b, a²σ²)  
**Sum of independents:** X+Y~N(μ₁+μ₂, σ₁²+σ₂²)

**z-table (exam formula sheet):**
| CI level | α/2 | z_{α/2} |
|---|---|---|
| 90% | 0.05 | 1.64 |
| 95% | 0.025 | 1.96 |
| 99% | 0.005 | 2.58 |

**Watch:** σ²=4 means σ=2. Divide by σ=2 when standardising, not by 4.

---

## T6 — ESTIMATORS & MLE

**Properties:**
- Unbiased: E[θ̂]=θ
- MSE = Var + Bias²
- X̄ is unbiased for μ, MSE=σ²/n
- S²=1/(n−1)·Σ(Xᵢ−X̄)² is unbiased for σ²

**MLE procedure:**
1. L(θ) = ∏f(xᵢ;θ)
2. ℓ(θ) = log L = Σlog f(xᵢ;θ)
3. Set dℓ/dθ=0, solve
4. Verify it's a maximum (d²ℓ/dθ²<0)

**MLE shortcut:** L(θ) ∝ θᵃ(1−θ)ᵇ → **θ̂ = a/(a+b)**

| Distribution | MLE |
|---|---|
| Bernoulli/Binomial | p̂ = x̄ |
| Poisson | λ̂ = x̄ |
| Geometric | p̂ = **1/x̄** |
| Exponential | λ̂ = **1/x̄** |
| Normal | μ̂=x̄, σ̂²=Σ(xᵢ−x̄)²/n (biased!) |

---

## T7 — CONFIDENCE INTERVALS

**For μ (σ known):** x̄ ± z_{α/2} · σ/√n  
**For μ (σ unknown, large n):** x̄ ± z_{α/2} · S/√n  
**For μ (normal, σ unknown):** x̄ ± t_{α/2,n−1} · S/√n  
**For proportion θ:** x̄ ± z_{α/2} · √(x̄(1−x̄)/n)  
**For σ²:** [(n−1)S²/χ²_{α/2}, (n−1)S²/χ²_{1−α/2}]

**Sample size for proportion (worst case p=0.5):**  
n ≥ (z_{α/2}/m)² · 0.25  
→ 90% CI, m=0.03: n ≥ (1.64/0.03)²·0.25 ≈ 747 → **n=800**

**Interpretation:** 95% CI means "95% of intervals built this way contain μ" — NOT P(μ∈CI)=0.95 after observing.

**Chi-square trap:** bigger χ² goes in denominator of LOWER bound (makes it smaller).

---

## T8 — HYPOTHESIS TESTING

**Framework:** H₀ vs H₁ → choose α → compute test stat → p-value → decision (reject if p<α)

**Error table:**
| | H₀ true | H₀ false |
|---|---|---|
| Reject H₀ | **Type I** (α) | Correct (power) |
| Don't reject | Correct | **Type II** (β) |

**Type I error (normal, reject if X̄>c):**  
α = P(X̄>c | μ=μ₀) = 1−Φ((c−μ₀)/(σ/√n))

**Type I error (Geometric, reject if X≥k):**  
α = P(X≥k | θ=θ₀) = (1−θ₀)^{k−1}

**p-value:**
- Left-tailed (H₁: μ<μ₀): p = Φ(z_obs)
- Right-tailed (H₁: μ>μ₀): p = 1−Φ(z_obs)

**Key logic:**
- Rejected at α=0.025 → MUST reject at α=0.05 (0.025<0.05)
- Rejected at α=0.025 → may NOT reject at α=0.01
- Larger rejection region → smaller β (Type II), larger α (Type I)

---

## T9 — CLT & SAMPLE MEAN

**CLT:** X̄ = (1/n)ΣXᵢ → N(μ, σ²/n) as n→∞  
Sum Sₙ = ΣXᵢ → N(nμ, nσ²)

**Standardise sum:** P(Sₙ≤a) = Φ((a−nμ)/(σ√n))

**Sample variance:** S² = (1/(n−1))·Σ(Xᵢ−X̄)²  
→ E[S²] = σ² (unbiased)  
→ (n−1)S²/σ² ~ χ²(n−1)

**Worked example:** Xᵢ iid, μ=0.4, σ²=1, n=1000:  
P(ΣXᵢ≤400) = P(X̄≤0.4) = Φ(0) = **0.5**

---

## QUICK TRIGGER HOOKS — "If you see X, do exactly Y"

### 🔵 Normal distribution + probability
**Trigger:** "X ~ N(μ, σ²), find P(...)"
1. Identify μ and σ (note: σ² given → σ = √σ², e.g. σ²=4 → σ=2)
2. Standardise: Z = (X − μ)/σ
3. Rewrite as P(Z ≤ z) or P(Z > z)
4. Use Φ table. Right tail: P(Z > z) = 1 − Φ(z) = Φ(−z)
5. Sum/linear transform first if needed: Y=aX+b → N(aμ+b, a²σ²)

### 🔵 Normal distribution + confidence interval (σ known)
**Trigger:** "sample of n, σ² known, find 95% CI for μ"
1. Compute x̄ (or read it off)
2. Pick z_{α/2}: 90%→1.64, 95%→1.96, 99%→2.58
3. CI = x̄ ± z_{α/2} · σ/√n
4. Plug in numbers, round as asked
5. Sanity check: width = 2 · z · σ/√n

### 🔵 CI for μ (σ unknown)
**Trigger:** "sample of n, S given or computed, σ unknown"
1. Use t-distribution with df = n−1
2. CI = x̄ ± t_{α/2, n−1} · S/√n
3. If n is large (≥30), can use z instead of t

### 🔵 CI for proportion
**Trigger:** "proportion, x successes out of n"
1. p̂ = x/n
2. CI = p̂ ± z_{α/2} · √(p̂(1−p̂)/n)
3. Worst-case sample size: n ≥ (z_{α/2}/m)² · 0.25

### 🔵 MLE — any distribution
**Trigger:** "find MLE / maximum likelihood estimator"
1. Write L(θ) = ∏ f(xᵢ; θ)
2. Take log: ℓ(θ) = Σ log f(xᵢ; θ)
3. Differentiate dℓ/dθ, set = 0
4. **Shortcut:** if L ∝ θᵃ(1−θ)ᵇ → θ̂ = a/(a+b)
5. **Memorise:** Exponential/Geometric → λ̂ = 1/x̄; Poisson/Binomial → λ̂ or p̂ = x̄

### 🔵 Hypothesis test (z-test or t-test)
**Trigger:** "test H₀: μ = μ₀"
1. Compute test stat: z = (x̄ − μ₀)/(σ/√n) or t = (x̄ − μ₀)/(S/√n)
2. Identify tail: H₁: μ>μ₀ → right tail; H₁: μ<μ₀ → left tail; H₁: μ≠μ₀ → two-tail
3. p-value: right = 1−Φ(z); left = Φ(z); two = 2·min(Φ(z), 1−Φ(z))
4. Reject H₀ if p-value < α
5. Type I = α = P(reject | H₀ true); Type II = β = P(fail to reject | H₀ false)

### 🔵 Bayes' theorem
**Trigger:** "given that [effect], what's P([cause])?"
1. Label causes C₁, C₂ and effect D
2. P(D) = P(D|C₁)·P(C₁) + P(D|C₂)·P(C₂)
3. P(C₁|D) = P(D|C₁)·P(C₁) / P(D)

### 🔵 CLT / sum of iid RVs
**Trigger:** "sum Sₙ = ΣXᵢ or mean X̄, find probability"
1. E[Sₙ] = nμ, Var(Sₙ) = nσ²
2. Standardise: Z = (Sₙ − nμ)/(σ√n)
3. P(Sₙ ≤ a) = Φ((a − nμ)/(σ√n))
4. For X̄: same but divide by n → Z = (X̄ − μ)/(σ/√n)

### 🔵 Continuous RV from scratch
**Trigger:** "f(x) = ... find c / E[X] / Var(X) / P(...)"
1. Find c: ∫f(x)dx = 1 over support, solve for c
2. E[X] = ∫x·f(x)dx
3. E[X²] = ∫x²·f(x)dx (LOTUS — do NOT square E[X])
4. Var(X) = E[X²] − (E[X])²
5. CDF: F(x) = ∫₋∞ˣ f(t)dt; P(a<X<b) = F(b) − F(a)

### 🔵 Variance / MSE quick checks
**Trigger:** any estimator question
- Var(aX+b) = a²·Var(X) ← the a² trap
- Var(X̄) = σ²/n ← not σ/√n
- MSE = Var(θ̂) + [Bias(θ̂)]² ← Bias squared, not Bias

---

## PROBLEM-SOLVING STEPS

### Finding normalising constant c
1. Write ∫f(x)dx = 1 over the support
2. Compute integral (keep c as factor)
3. Set = 1, solve for c

### Bayes' theorem
1. Identify: P(cause), P(effect|cause), P(effect|not cause)
2. P(effect) = P(e|c₁)P(c₁) + P(e|c₂)P(c₂)
3. P(cause|effect) = P(e|c)P(c) / P(e)

### MLE from data
1. Write PMF/PDF for one observation
2. Write L(θ) = product over all observations
3. Take log, collect terms
4. Differentiate, set = 0
5. Use shortcut if L∝θᵃ(1−θ)ᵇ → θ̂=a/(a+b)

### CI computation
1. Compute x̄ and S (if needed)
2. Identify CI type → look up z or t value
3. Apply formula: x̄ ± z_{α/2} · SE

### Hypothesis test
1. Compute z = (x̄−μ₀)/(σ/√n) or t = (x̄−μ₀)/(S/√n)
2. Compare to critical value OR compute p-value
3. State conclusion: "reject/fail to reject H₀"
4. If asked for Type I/II: match to error table above

---

## DISTRIBUTION IDENTIFICATIONS

| Scenario | Distribution |
|---|---|
| Roll dice until first 6 | Geometric(1/6) and Pascal(1,1/6) |
| 5 dice rolled, count 6s | Binomial(5,1/6) |
| Emails per hour | Poisson(λ) |
| Sum of two dice | Discrete uniform + convolution |
| Heights of population | Normal |
| Waiting time for first event | Exponential |

---

## EXAM PATTERN ANALYSIS (Fall 2024 · Jan 2025 · March 2025)
> These three papers are the closest match to your exam format.

### Questions that appear on EVERY exam (guaranteed points)

| Topic | Format | What they actually test |
|---|---|---|
| Bayes' theorem | MCQ / numeric | P(cause\|effect) — draw the tree |
| Law of total probability | MCQ | P(event) = weighted sum across scenarios |
| MLE | numeric or MCQ | Write likelihood, differentiate, or use shortcut |
| Normal / CLT | numeric | Standardise → Φ(z), handle right tails |
| Var(X̄) | True/False | σ²/n vs σ/√n — always a trap |
| Type I error | MCQ / compute | Definition AND compute P(reject\|H₀) |
| p-value | compute | t-stat → Φ, compare to α |
| Conditional probability True/False | True/False table | Correct vs wrong identity variants |
| Independence vs disjoint | True/False | Both False when P(A),P(B)>0 |
| CDF properties | MCQ | Non-decreasing, right-continuous, limits |

### Resit-specific patterns
- Resit reuses questions from previous regular exams **verbatim** — know all regular exam Q's
- Harder variants: E[X³] instead of E[X], multi-step Bayes (sensitivity/specificity framing)
- Same question stem, different numerical answer across years — read every symbol carefully

### Three traps that appear every exam
1. **True/False conditional identity:** P(A∪B\|C) = P(A\|C)+P(B\|C)−P(A∩B\|C) is **True**; "=P(A\|C)+P(B\|C)" alone is **False**
2. **Independence ≠ disjoint:** if P(A)>0 and P(B)>0, disjoint → dependent. Both "independent ↔ disjoint" and "independent → disjoint" are **False**
3. **Open vs closed endpoints:** ask (1) does function *achieve* the boundary? → closed; (2) does it *reach* its limit asymptotically? → open

### Priority for ≥9.0
- **Tier 1 (automatic, ~6–7 Q):** Bayes+LTP, Normal/CLT, MLE, Type I/II errors
- **Tier 2 (most exams, ~3–4 Q):** Conditional probability T/F, E[X]/Var(X) integration, CDF computation
- **Tier 3 (occasional):** Chi-square CI for variance, sample size for CI, higher moments E[Xᵏ]

---

## LAST 5 MINUTES CHECKLIST
- [ ] Read each question fully before answering
- [ ] For fill-in: check decimal places requested  
- [ ] For MC: eliminate obviously wrong options first
- [ ] Poisson: check if asked P(X>k) — needs floor to P(X≥⌈k⌉+1) if non-integer
- [ ] MLE Exponential/Geometric: answer is **1/x̄**, not x̄
- [ ] No penalty for wrong answers → guess if unsure

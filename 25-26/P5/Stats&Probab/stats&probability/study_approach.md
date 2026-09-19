# Stats & Probability — Study Approach for a 10.0
> Exam: Thu 4 Jun · 2–3h/day available · Target: zero execution errors

---

## Diagnosis from 2026 Exam

| Question | My answer | Correct | Root cause |
|---|---|---|---|
| Var(X̄), σ²=9, n=100 | wrong | 0.09 | Confused σ²/n with σ/√n |
| Binomial P_X(2) | wrong | 0.31 | Calculation slip |
| CLT: P(S₁₀₀≥20)=Φ(x) | 0 | -2 | Didn't convert 1−Φ(2) → Φ(−2) |
| P(A∪Bᶜ), P(Aᶜ)=1/4 | 0.16 | 0.90 | Wrong formula path |
| Range of exp(−x), x≥0 | [0,1] | (0,1] | Missed open endpoint |
| CDF at x=2.75 for P_X(k)=3^{−k}·2 | ~0.52 | 0.89 | Summed wrong / forgot floor |
| Geometric MLE, x₁=3, x₂=5 | 0.41 | 0.25 | Used x̄ instead of 1/x̄ |
| Multi-selects (3 questions) | partial | — | Selected too many / wrong options |

---

## The 4 Error Types

### Type 1: Formula amnesia under pressure
*Var(X̄)=σ/√n, MLE=x̄ for Geometric*

**Fix — derive it, don't memorise it:**
- Var(X̄): X̄=(1/n)ΣXᵢ → Var(X̄)=(1/n²)·nσ²=σ²/n. Derive in 10s.
- Geometric MLE: L(θ)∝θᵃ(1−θ)ᵇ → θ̂=a/(a+b). For x₁=3,x₂=5: θ̂=2/(2+6)=0.25.

### Type 2: Direction errors in CLT/Normal
*P(S₁₀₀≥20)=1−Φ(2)=Φ(−2), answered 0*

**Fix — always draw the bell, shade the region:**
```
P(Z ≥ 2) = right tail = 1−Φ(2) = Φ(−2)
P(Z ≤ −2) = left tail = Φ(−2)   ← same number
```
Never write a normal probability without sketching first.

### Type 3: Formula path errors
*P(A∪Bᶜ) — wrong formula entirely*

**Fix — complement is always the first move:**
```
P(A∪Bᶜ) = 1 − P(A^c∩B)
         = 1 − P(A^c)·P(B)   [if independent]
         = 1 − (1/4)(2/5) = 0.9
```
Rule: for any union involving complements, take the complement of the whole thing first.

### Type 4: Boundary/endpoint carelessness
*exp(−x) for x≥0: range is (0,1] not [0,1]*

**Fix — two questions per range problem:**
1. Is the boundary achieved? (exp(0)=1 ✓ → closed at 1)
2. Does the function reach its limit? (exp(−∞)→0 but ≠0 → open at 0)

---

## Psychological Framework: Error-Driven Learning

**The 3-step loop for every wrong answer:**

1. **Reconstruct** — write out exactly what you did and why (not "calculation error" — be specific)
2. **Find the fork** — identify the exact step where reasoning diverged
3. **Write the rule** — one sentence that would prevent this error forever

This turns every mistake into a permanent patch.

---

## 5-Day Plan (2–3h/day)

### Day 1 — Error surgery
- Re-derive every 2026 wrong answer from scratch on paper
- Write the one-sentence rule for each
- Drill 10 similar questions targeting those exact error types

### Day 2 — Probability & distributions from scratch
- Derive P(A∪Bᶜ) from complement logic
- Re-derive Geometric/Binomial/Poisson PMFs from counting arguments
- Derive Geometric and Exponential MLE by hand (once = never forget)

### Day 3 — Continuous RVs + Normal + CLT
- Derive Var(X̄)=σ²/n from definition
- Do 5 full PDF→CDF→E[X]→Var(X) chains on paper
- CLT: convert between P(Sₙ≥a), P(X̄≥b), P(Z≥z) — draw picture every time

### Day 4 — Inference: CI + Hypothesis testing
- CI: random interval (pre-data) covering μ with prob 1−α. After observing: fixed, no probability.
- p-value: P(result this extreme or more | H₀ true). NOT P(H₀ true).
- Build Type I/II 2×2 table from scratch for 3 different scenarios

### Day 5 — Full exam simulation
- Pick one past exam (Jan 2025 or Fall 2024) in exam_practice.html
- 90 minutes, timer on, treat it as the real exam
- Apply 3-step error loop to every mistake
- Final hour: read cram notes once. Done.

---

## 10.0 Execution Rules (in the actual exam)

1. **Read every question twice** — misreading known material is the #1 source of lost points
2. **Show your work** — write formula → substitute → compute. Never skip steps mentally
3. **Draw the picture** for every normal distribution question, no exceptions
4. **Multi-select: eliminate first** — cross off obviously wrong options before selecting
5. **Guess everything** — no penalty for wrong answers. Eliminate 2, pick the better one
6. **Formula sheet** — know what's on it so you go directly to the right line under pressure

---

## First Principles: Why Things Work

### Why Var(X̄) = σ²/n
X̄ = (X₁+...+Xₙ)/n. By independence: Var(ΣXᵢ)=nσ². Scale by 1/n: Var(X̄)=(1/n²)·nσ²=σ²/n.

### Why MLE for Exponential/Geometric = 1/x̄
Both have log-likelihood with term −λΣxᵢ or similar. Setting derivative=0 gives λ̂=n/Σxᵢ=1/x̄. The parameter is a *rate*, so its estimate is the inverse of the mean.

### Why CLT works intuitively
Each Xᵢ adds independent random variation. By the law of large numbers, their average stabilises. The fluctuations around that stable value come from many small independent contributions — which, by the central limit theorem, always produce a bell curve regardless of the original distribution.

### Why a CI is not P(μ∈[a,b])=0.95
Before the experiment, [a,b] is random (it depends on X̄). 95% of all such random intervals contain the true μ. After observing, [a,b] is fixed. μ is fixed (not random). A fixed number either is or isn't in a fixed interval — there's no probability.

### Why p-value < α means reject
p-value = P(data this extreme | H₀). If this probability is very small, the data is unlikely under H₀ — so we doubt H₀. α is how small "very small" needs to be.

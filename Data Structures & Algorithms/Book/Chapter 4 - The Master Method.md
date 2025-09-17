![[Screenshot 2025-09-17 at 17.00.50.jpeg]]

---

## Chapter Goals

- Provide a **general recipe** for solving recurrences of the form:
    
    ```
    T(n) = aT(n/b) + f(n)
    ```
    
- Apply to divide-and-conquer algorithms (MergeSort, Karatsuba, Strassen, etc.).
    
- Understand the **three cases** of the Master Method.
    
- Learn to identify **dominant terms** and reason about total work.
    

---

## 4.1 The Problem Setup

Many divide-and-conquer algorithms lead to recurrences:

```
T(n) = aT(n/b) + f(n)
```

where:

- `a ≥ 1`: number of subproblems.
    
- `b > 1`: factor by which input shrinks.
    
- `f(n)`: cost of dividing + combining.
    

### Examples

- **MergeSort**: `T(n) = 2T(n/2) + Θ(n)`.
    
- **Karatsuba multiplication**: `T(n) = 3T(n/2) + Θ(n)`.
    
- **Strassen multiplication**: `T(n) = 7T(n/2) + Θ(n^2)`.
    

---

## 4.2 Recursion Tree Intuition

- Expand recurrence as a **tree of work**.
    
- Each level: `a^level` subproblems, each of size `n/b^level`.
    
- Work per level = `a^level * f(n/b^level)`.
    
- Height of recursion = `log_b n` (until subproblem size = 1).
    
- Total work = sum over all levels.
    

Key insight: Growth depends on whether the **per-level work** grows, shrinks, or stays balanced.

---

## 4.3 The Master Method

Let:

```
T(n) = aT(n/b) + f(n)
```

Define:

```
α = log_b a   (the “critical exponent”)
```

### Three Cases

**Case 1: Divide dominates**

- If `f(n) = O(n^{α−ε})` for some ε > 0.
    
- Interpretation: per-level combine cost is **smaller** than total recursive cost.
    
- Solution: `T(n) = Θ(n^α)`.
    

**Case 2: Balanced**

- If `f(n) = Θ(n^α · log^k n)` for some k ≥ 0.
    
- Interpretation: combine work matches recursive work.
    
- Solution: `T(n) = Θ(n^α log^{k+1} n)`.
    

**Case 3: Combine dominates**

- If `f(n) = Ω(n^{α+ε})` for some ε > 0, and **regularity condition** holds:
    
    ```
    a·f(n/b) ≤ c·f(n)   for some constant c < 1
    ```
    
- Interpretation: per-level combine cost dwarfs recursion.
    
- Solution: `T(n) = Θ(f(n))`.
    

---

## 4.4 Worked Examples

### Example 1: MergeSort

```
T(n) = 2T(n/2) + Θ(n)
```

- a = 2, b = 2 → α = log₂2 = 1.
    
- f(n) = Θ(n) = Θ(n^1).
    
- Matches **Case 2** (balanced).
    
- Solution: `Θ(n log n)`.
    

### Example 2: Karatsuba Multiplication

```
T(n) = 3T(n/2) + Θ(n)
```

- a = 3, b = 2 → α = log₂3 ≈ 1.585.
    
- f(n) = Θ(n).
    
- Compare: n vs n^1.585 → f(n) = O(n^{α−ε}).
    
- Case 1.
    
- Solution: `Θ(n^{log₂3}) ≈ Θ(n^1.585)`.
    

### Example 3: Strassen

```
T(n) = 7T(n/2) + Θ(n^2)
```

- a = 7, b = 2 → α = log₂7 ≈ 2.807.
    
- f(n) = Θ(n^2).
    
- Compare: n^2 vs n^2.807 → f(n) = O(n^{α−ε}).
    
- Case 1.
    
- Solution: `Θ(n^2.807)`.
    

### Example 4: Heavier combine

```
T(n) = 2T(n/2) + Θ(n^2)
```

- a = 2, b = 2 → α = 1.
    
- f(n) = Θ(n^2).
    
- Compare: n^2 vs n^1 → f dominates.
    
- Check regularity: 2·f(n/2) = 2·Θ((n/2)^2) = Θ(n^2/2) = O(f(n)).
    
- Case 3.
    
- Solution: `Θ(n^2)`.
    

---

## 4.5 Regularity Condition (for Case 3)

- Needed to avoid pathological cases where f(n) grows too irregularly.
    
- Intuitively: ensures that **most of the work is at the top levels**, not scattered across recursion.
    

Example: If `f(n) = n^2 / log n`, then it’s not “regular enough” for Case 3 without careful analysis.

---

## 4.6 Variants & Extensions

- **Master Method doesn’t apply** if:
    
    - Unequal subproblem sizes.
        
    - Non-polynomial combine terms (e.g., f(n) = n/log n).
        
    - Irregular divide/conquer patterns.
        
- In such cases: use **recursion trees** or **substitution method**.
    

---

# 🔑 Chapter 4 Upshot

- Master Method = shortcut for solving recurrences `T(n) = aT(n/b) + f(n)`.
    
- Compute `α = log_b a`.
    
- Compare f(n) to n^α:
    
    - If f smaller → recursion dominates → `Θ(n^α)`.
        
    - If f balanced → multiply by log → `Θ(n^α log n)`.
        
    - If f larger (and regular) → combine dominates → `Θ(f(n))`.
        
- Applies to classic algorithms:
    
    - MergeSort → `Θ(n log n)`.
        
    - Karatsuba → `Θ(n^1.585)`.
        
    - Strassen → `Θ(n^2.807)`.
        
- Essential tool for divide-and-conquer analysis.
    

---

## 🎓 Exam / Interview Tips

- Always **compute α = log_b a** first.
    
- Clearly identify which case applies by comparing f(n) vs n^α.
    
- Remember **Case 2** adds one log factor.
    
- For Case 3: don’t forget the **regularity condition**.
    
- If Master Theorem doesn’t apply, fall back to **recursion trees** or substitution.
    
- Be able to apply quickly to MergeSort/Karatsuba/Strassen.
    

---

## 🧠 Common Pitfalls

- Miscomputing α (log base confusion).
    
- Forgetting that log base doesn’t matter for asymptotics.
    
- Assuming Case 3 without checking regularity.
    
- Forgetting log^{k+1} factor in Case 2.
    

---
Next: [[Chapter 5 - The Fast Fourier Transform]]
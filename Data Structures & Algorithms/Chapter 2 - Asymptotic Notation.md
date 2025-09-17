
---

## Main Focus

- Build a precise language for algorithm analysis.
    
- Learn **Big-O, Big-Ω, Big-Θ** notations formally.
    
- Understand why constants and lower-order terms are ignored.
    
- Rank functions by **growth rates** to compare algorithms.
    

---

## 2.1 The Motivation: Why Asymptotics?

- Running times differ by machine, compiler, or language.
    
- We want **machine-independent analysis**.
    
- Focus is on **scalability** → how performance changes as _n → ∞_.
    

💡 Rule of thumb: _Suppress constants and lower-order terms._

### Example

MergeSort analysis gave: `6n log₂n + 6n`.

- For asymptotics → **O(n log n)**.
    
- Constants (6) and smaller terms (6n) don’t matter at large n.
    

---

## 2.2 Big-O Notation

**Definition**:  
`f(n) = O(g(n))` if ∃ constants `c > 0` and `n₀` such that:

```
f(n) ≤ c · g(n),   for all n ≥ n₀
```

- Interpreted as an **upper bound** on growth.
    
- Formalizes: f does not grow faster than g (beyond some constant multiple).
    

**Analogy**: Big-O is like saying _this car will never exceed 200 km/h on the highway._

### Key Points

- Constants don’t matter → scaling factors are ignored.
    
- Lower-order terms vanish at infinity.
    

### Example 1

```
f(n) = 5n² + 3n + 2
```

- Leading term: n² dominates.
    
- `f(n) = O(n²)`.
    

### Example 2

```
f(n) = 20n log₂n + 300n
```

- Leading term: n log n.
    
- `f(n) = O(n log n)`.
    

---

## 2.3 Big-Ω Notation

**Definition**:  
`f(n) = Ω(g(n))` if ∃ constants `c > 0` and `n₀` such that:

```
f(n) ≥ c · g(n),   for all n ≥ n₀
```

- Interpreted as a **lower bound**.
    
- Means f grows at least as fast as g (up to constant factors).
    

**Analogy**: The car _always goes at least 100 km/h_ on the highway.

### Example

```
5n² + 3n + 2 = Ω(n²)
```

---

## 2.4 Big-Θ Notation

**Definition**:  
`f(n) = Θ(g(n))` if:

```
f(n) = O(g(n)) AND f(n) = Ω(g(n))
```

- Interpreted as a **tight bound**.
    
- f grows exactly like g asymptotically.
    

**Analogy**: The car’s speed is _always between 100 and 200 km/h_.

### Example

```
20n log₂n + 300n = Θ(n log n)
```

---

## 2.5 Hierarchy of Growth Rates

Functions ranked by asymptotic growth:

```
log n << n << n log n << n² << n³ << 2^n << n!
```

### Intuitions

- **Logarithmic (log n)**: grows extremely slowly.
    
- **Linear (n)**: proportional scaling.
    
- **n log n**: like linear but slightly heavier (MergeSort).
    
- **Quadratic (n²)**: explodes for large n (BubbleSort).
    
- **Exponential (2^n)**: impossible for even moderate n.
    
- **Factorial (n!)**: astronomically large growth.
    

---

## 2.6 Additional Examples

1. `n² + n log n = Θ(n²)` (dominant term is n²).
    
2. `1000n log n + n³ = Θ(n³)` (cubic dominates).
    
3. `n^0.5` vs `n^0.6` → `n^0.6` grows faster.
    
4. `n^1000` vs `2^n` → exponential dominates, even though `n^1000` looks huge.
    

**Note**: Logarithm base is irrelevant in asymptotics → `log₂n = Θ(log₁₀n)`.

---

## 2.7 Little-o Notation (Extra)

**Definition**:  
`f(n) = o(g(n))` means f grows _strictly slower_ than g.

Example:

```
n^1000 = o(2^n)
```

- No matter how large the polynomial exponent, exponentials dominate.
    

---

## 🧮 Visualization Table

|Function|Example Algorithm|Growth|
|---|---|---|
|log n|Binary search|Very slow|
|n|Linear scan|Moderate|
|n log n|MergeSort|Efficient|
|n²|BubbleSort|Inefficient|
|2^n|Brute-force TSP|Infeasible|

---

# 🔑 The Upshot of Chapter 2

- **Asymptotics provide a universal language** for comparing algorithms.
    
- **Big-O** gives an upper bound, **Ω** gives a lower bound, **Θ** gives a tight bound.
    
- Constants and lower-order terms are irrelevant.
    
- Growth rate hierarchy (log n < n < n log n < n² < 2^n < n!).
    
- Log base does not matter → all logs are equivalent up to a constant.
    
- Exponential functions eventually dominate any polynomial.
    
- Little-o and little-ω extend the vocabulary for strict comparisons.
    

---

## 🎓 Exam / Interview Tips

- Always state formal definitions (constants c, n₀).
    
- Give **tight Θ bounds** if possible, not just O.
    
- Be able to rank functions by growth rate.
    
- Show which term dominates in a sum.
    
- Remember: base of logarithm is irrelevant.
    
- Classic question: compare polynomial vs exponential vs factorial growth.
    

---
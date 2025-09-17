
---
## Chapter Goals

- Master the **divide-and-conquer (D&C)** paradigm: divide → conquer → combine.
    
- Apply D&C to three core problems:
    
    1. **Counting inversions** in an array in **O(n log n)**.
        
    2. **Strassen’s algorithm** for matrix multiplication in **O(n^{log₂7}) ≈ O(n^{2.807})**.
        
    3. **Closest pair of points** in the plane in **O(n log n)** (packing argument + strip trick).
        
- Practice formal **recurrence setup** and analysis intuition for D&C.
    

---

## 3.1 The Divide-and-Conquer Paradigm

**Template**

1. **Divide** the input into smaller subproblems (often halves or sub-blocks).
    
2. **Conquer** each subproblem **recursively**.
    
3. **Combine** the sub-solutions into the full solution.
    

**When D&C helps**

- The problem splits into a **small number** of subproblems of **comparable size**.
    
- There exists a **fast combine** step (linear or near-linear in input size).
    
- Typical recurrences: `T(n) = a·T(n/b) + f(n)` with `a ≥ 1`, `b > 1`.
    

**Common analysis tools**

- **Recursion tree**: add work across levels; look for geometric series/level-wise sums.
    
- **Master method** (next chapter) for `T(n) = aT(n/b) + f(n)`.
    

---

## 3.2 Counting Inversions in O(n log n)

### Problem

- **Inversion**: a pair of indices `(i, j)` with `i < j` and `A[i] > A[j]`.
    
- **Goal**: count all inversions in `A[0..n-1]`.
    
- Intuition: measures **“out-of-orderedness”**; equals the **Kendall tau distance** between the array and its sorted version.
    

### Upper bound and sanity checks

- Minimum inversions = **0** (already sorted).
    
- Maximum inversions = **n(n−1)/2** (reverse sorted).
    

### D&C strategy (MergeSort-with-counts)

Key idea: **count split inversions** efficiently during the merge step.

1. **Divide**: split array into `L` and `R`.
    
2. **Conquer**: recursively count inversions in `L` and in `R` (these are **internal inversions**).
    
3. **Combine**: count **split inversions** (pairs with left in `L` and right in `R`) while merging `L` and `R` into sorted order.
    

**How split counting works**

- Maintain two pointers `i` (for `L`) and `j` (for `R`).
    
- When `L[i] ≤ R[j]`, append `L[i]` (no new split inversions), `i++`.
    
- When `L[i] > R[j]`, append `R[j]` and **add `|L|−i` to the count** (every remaining element in `L[i..]` exceeds `R[j]`). Then `j++`.
    
- This runs in **O(|L|+|R|)** just like a standard merge.
    

### Correctness sketch

- Every inversion is either internal to `L`, internal to `R`, or split across `L` and `R`—these three sets are **disjoint and exhaustive**.
    
- The merge procedure identifies **exactly** the split inversions, because `L` and `R` are individually sorted in the merge stage; whenever an element from `R` wins against `L[i]`, it is smaller than **all remaining** elements in `L[i..]`, contributing exactly `|L|−i` new inversions.
    

### Time complexity

- Recurrence: `T(n) = 2T(n/2) + O(n)` → **O(n log n)**.
    
- Space: `O(n)` auxiliary (like MergeSort), or `O(1)` extra if done in-place with careful buffering (harder).
    

### Pseudocode (Pythonic pseudocode)

```python
def count_inversions(A):
    if len(A) <= 1:
        return A, 0
    mid = len(A) // 2
    L, invL = count_inversions(A[:mid])
    R, invR = count_inversions(A[mid:])
    merged, split = merge_and_count(L, R)
    return merged, invL + invR + split

def merge_and_count(L, R):
    i = j = inv = 0
    out = []
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:
            out.append(L[i]); i += 1
        else:
            out.append(R[j]); j += 1
            inv += len(L) - i  # count split inversions in one go
    out.extend(L[i:]); out.extend(R[j:])
    return out, inv
```

### Extra techniques (useful to know)

- **Binary Indexed Tree / Fenwick Tree** or **Balanced BST**: also count inversions in `O(n log n)` by sweeping from right to left, counting how many smaller elements have been seen.
    
- **Coordinate compression**: necessary if values are large or negative for BIT.
    

### Pitfalls & tips

- Stable compare `<=` during merge to avoid overcounting.
    
- Handle duplicates carefully: if duplicates are allowed, the definition of inversion typically uses **strict** `>`; stability avoids double counting.
    

---

## 3.3 Strassen’s Matrix Multiplication (n^{log₂7})

### Problem & baseline

- Multiply two `n×n` matrices `A·B = C` over a ring/field.
    
- **Naïve algorithm**: triple loop → `Θ(n^3)` scalar mults.
    
- **Block D&C (8 subproblems)**: partition into `2×2` blocks; `T(n) = 8T(n/2) + O(n^2)` (adds of blocks) → still `Θ(n^3)`.
    

### Strassen’s insight: reduce 8 sub-multiplications → **7**

Let `A` and `B` be partitioned into four `(n/2)×(n/2)` blocks:

```
A = [A11 A12; A21 A22],   B = [B11 B12; B21 B22]
```

Define the **seven products** (`Mi`) using only **7** recursive multiplications:

```
M1 = (A11 + A22)(B11 + B22)
M2 = (A21 + A22) B11
M3 = A11 (B12 − B22)
M4 = A22 (B21 − B11)
M5 = (A11 + A12) B22
M6 = (A21 − A11) (B11 + B12)
M7 = (A12 − A22) (B21 + B22)
```

Then recover `C` via **linear combinations** (only additions/subtractions):

```
C11 = M1 + M4 − M5 + M7
C12 = M3 + M5
C21 = M2 + M4
C22 = M1 − M2 + M3 + M6
```

### Complexity

- Recurrence: `T(n) = 7T(n/2) + O(n^2)` (matrix adds are `Θ(n^2)`).
    
- Solution: `T(n) = Θ(n^{log₂7}) ≈ Θ(n^{2.807})` — asymptotically faster than `n^3`.
    

### Practical notes

- **Thresholding/hybrid**: For small `n`, classical `n^3` is faster; use Strassen only beyond a cutoff.
    
- **Padding**: If `n` isn’t a power of 2, pad to next power-of-two (or use rectangular recursion).
    
- **Numerical stability**: Slightly worse than classical multiplication (more adds/subs). For exact arithmetic (e.g., integers, finite fields), not an issue.
    
- **Memory**: More temporaries (7 subproblems + sums) → higher constant factors.
    

### When to use

- Large dense matrices where `n` is big enough to overcome constants.
    
- In practice, libraries use hybrids and even faster asymptotic algorithms (beyond the course scope) only for very large `n`.
    

---

## 3.4 Closest Pair of Points in O(n log n)

### Problem

- Input: `n` points in the plane: `P = {(x_i, y_i)}`.
    
- Goal: find the **minimum Euclidean distance** between any two distinct points.
    
- Brute force: check all pairs → `Θ(n^2)`.
    

### High-level D&C algorithm

1. **Pre-sort** points by `x` (call this list `Px`) and by `y` (call `Py`).
    
2. **Divide** by vertical line through median `x` (split `Px` into `Lx`, `Rx`; similarly partition `Py` into `Ly`, `Ry` in linear time).
    
3. **Conquer** recursively on left and right: obtain distances `δL`, `δR`; let `δ = min(δL, δR)`.
    
4. **Combine**: examine the **vertical strip** of width `2δ` centered on the dividing line. From `Py`, extract `Sy = {p ∈ P : |p.x − x_mid| ≤ δ}`.
    
5. **Strip check**: For each point in `Sy` (already **sorted by y**), compare it only to the **next up to 7 points** in `Sy`. Update the global minimum.
    
6. **Return** the best distance.
    

### Why only 7 comparisons per point in the strip?

- **Packing/geometry argument**: In a `δ × 2δ` rectangle split into `δ/2 × δ/2` squares, at most **one** point can occupy each square (else two points would be ≤ `δ/√2` apart). Within `δ` vertical distance, there are at most **7** relevant squares ahead of a point, limiting candidates to a **constant**.
    

### Correctness sketch

- Any closest pair either lies entirely in the left/right half or **crosses the boundary** and must lie within `δ` of the midline. The strip check, with the **y-sorted order**, enumerates all potential cross-boundary pairs without missing any.
    

### Time complexity (key implementation detail)

- If you **re-sort** by y in each recursion, you get `O(n log^2 n)`.
    
- To achieve **O(n log n)**, **pass down** `Ly` and `Ry` by **linear-time splitting of `Py`** (stable partition by which side of the midline a point belongs to). Each level does `O(n)` work; levels = `O(log n)`.
    

### Pseudocode (schematic)

```python
def closest_pair(P):
    Px = sorted(P, key=lambda p: p.x)
    Py = sorted(P, key=lambda p: p.y)
    return dnc(Px, Py)

def dnc(Px, Py):
    n = len(Px)
    if n <= 3:  # brute force base case
        return brute_force(Px)
    mid = n // 2
    xmid = Px[mid].x
    Lx, Rx = Px[:mid], Px[mid:]
    Ly, Ry = [], []
    for p in Py:  # linear-time split preserving y-order
        (Ly if p.x <= xmid else Ry).append(p)
    δL = dnc(Lx, Ly)
    δR = dnc(Rx, Ry)
    δ = min(δL, δR)
    # Build the strip in y-order
    Sy = [p for p in Py if abs(p.x - xmid) <= δ]
    # Check only next up to 7 points in y-order
    best = δ
    for i in range(len(Sy)):
        for j in range(i+1, min(i+8, len(Sy))):
            best = min(best, dist(Sy[i], Sy[j]))
    return best
```

### Practical tips

- Use **squared distances** to avoid floating-point sqrt until the very end.
    
- Be consistent about **tie-breaking** on the midline (`≤` vs `<`) so each point goes to exactly one side.
    
- **Numerical robustness**: be wary with doubles; consider EPS if needed.
    
- **Degenerate inputs** (duplicate points): distance can be 0; handle early.
    

---

## 🔑 Chapter 3 Upshot

- D&C shines when:
    
    - subproblems are balanced,
        
    - combine step is **linear or near-linear**, and
        
    - subproblem count is small.
        
- **Counting inversions**: augment MergeSort’s merge to count **split inversions** → **Θ(n log n)**.
    
- **Strassen**: clever algebra reduces multiplications from 8→7; `T(n)=7T(n/2)+Θ(n^2)` → **Θ(n^{2.807})**.
    
- **Closest pair**: pre-sort by `x` and `y`, maintain y-order, **strip + 7-check** → **Θ(n log n)**.
    
- Analysis patterns: set up recurrences; reason **per level**; ensure **linear combine** to retain `n log n`.
    

---

## 🎓 Exam / Interview Tips

- For inversions: be able to **derive** the split-count formula `+ (|L| - i)` and argue correctness.
    
- For Strassen: memorize **M1..M7** and **C11..C22** formulas; explain why `7 > 8` makes the difference; know the recurrence.
    
- For closest pair: emphasize the **pre-sorting by y**, the **strip**, and the **constant 7** comparisons (packing argument).
    
- Always write the **recurrence** and **solve/justify** its order.
    

---

## 🧠 Common Pitfalls & Checks

- **Inversions**: off-by-one when adding `|L|−i`; forgetting stability with duplicates.
    
- **Strassen**: forgetting to add/sub temporary matrices costs `Θ(n^2)` each; watch memory usage.
    
- **Closest pair**: re-sorting by y at each level → `O(n log^2 n)` (too slow); must **split Py in linear time**.
    

---

## 📌 Bonus Intuition & Connections

- Inversions ↔ **Kendall tau**; used in ranking and **collaborative filtering** similarity.
    
- Strassen inspired a long line of matrix multiplication improvements; asymptotic exponents < 2.4 exist but are **impractical** for most real `n`.
    
- Closest pair’s strip idea is a classic example of **geometric packing** leading to a constant bound on local comparisons.

Next: [[Chapter 4 - The Master Method]]

---

## Chapter Goals

- Understand the **selection problem**: find the k-th smallest element in an array.
    
- Explore randomized and deterministic linear-time algorithms.
    
- Learn about the **Median-of-Medians** algorithm (a worst-case linear-time selection method).
    
- Reinforce partitioning-based techniques (like QuickSort) for selection.
    

---

## 6.1 The Selection Problem

### Definition

- Input: Unsorted array `A[1..n]`, integer `k` (1 ≤ k ≤ n).
    
- Output: The element of rank `k` (i.e., the k-th smallest).
    

### Examples

- k = 1 → minimum.
    
- k = n → maximum.
    
- k = ⌊n/2⌋ → median.
    

### Applications

- Order statistics (quantiles, medians).
    
- Robust statistics (median filtering).
    
- Machine learning (feature selection, k-th thresholds).
    

---

## 6.2 Randomized QuickSelect

### Idea

- Very similar to QuickSort but recurse **only into one partition**.
    

### Algorithm (QuickSelect)

1. Choose a pivot p (randomized version: pick at random).
    
2. Partition array around p.
    
3. Let j = rank of pivot after partition.
    
4. If k = j → return pivot.
    
5. If k < j → recurse on left subarray.
    
6. Else recurse on right subarray.
    

### Pseudocode

```python
def QuickSelect(A, l, r, k):
    if l == r:
        return A[l]
    i = random.randint(l, r)
    A[l], A[i] = A[i], A[l]  # random pivot
    j = Partition(A, l, r)
    if k == j:
        return A[j]
    elif k < j:
        return QuickSelect(A, l, j-1, k)
    else:
        return QuickSelect(A, j+1, r, k)
```

### Running Time

- Partition step = Θ(n).
    
- Only one recursive call (not two like QuickSort).
    

Recurrence:

```
T(n) = T(n/2) + Θ(n)   (expected)
```

- Expected runtime: **Θ(n)**.
    

Worst-case (bad pivots): `Θ(n^2)` (like QuickSort with bad pivot).

---

## 6.3 Deterministic Linear-Time Selection (Median-of-Medians)

To guarantee **worst-case linear time**, we need a strategy for consistently choosing a good pivot.

### Algorithm Outline

1. Divide array into groups of 5 elements.
    
2. Sort each group of 5 (constant time per group).
    
3. Extract the median of each group.
    
4. Recursively compute the **median of these medians** → use as pivot.
    
5. Partition around this pivot.
    
6. Recurse only into the relevant partition.
    

### Why groups of 5?

- Ensures pivot is **“good enough”**.
    
- At least 30% of elements ≤ pivot, 30% ≥ pivot.
    
- Guarantees we shrink subproblem by a **constant fraction** each time.
    

### Recurrence Analysis

- Partition: Θ(n).
    
- Median-of-medians pivot selection:
    
    - Grouping & sorting groups: Θ(n).
        
    - Recursing on n/5 medians: T(n/5).
        
- Recursive call on ≤ 7n/10 elements.
    

Recurrence:

```
T(n) ≤ T(n/5) + T(7n/10) + Θ(n)
```

By recursion-tree analysis: **T(n) = Θ(n)**.

### Comparison

- Randomized QuickSelect → expected Θ(n), worst-case Θ(n^2).
    
- Median-of-Medians → deterministic Θ(n) worst-case.
    

---

## 6.4 Practical Considerations

- **Randomized QuickSelect**: faster in practice, very low probability of worst-case.
    
- **Median-of-Medians**: strong theoretical guarantee, but constants are higher.
    
- Many real libraries (like C++) use hybrid strategies.
    

### Trade-offs

- If adversarial input possible → deterministic safer.
    
- If randomization acceptable → QuickSelect usually better.
    

---

# 🔑 Chapter 6 Upshot

- The **selection problem** asks for the k-th order statistic.
    
- **QuickSelect** (randomized) solves it in expected Θ(n).
    
- **Median-of-Medians** guarantees worst-case Θ(n) by ensuring good pivot.
    
- Partitioning logic = same as QuickSort.
    
- Shows how careful pivot choice transforms worst-case quadratic → linear.
    

---

## 🎓 Exam / Interview Tips

- Be able to code QuickSelect from memory.
    
- Explain why only **one recursive call** is needed.
    
- Recall the **recurrence** for randomized selection: T(n) = T(n/2) + Θ(n).
    
- For Median-of-Medians: explain grouping of 5, median-of-medians as pivot, and constant shrinkage argument.
    
- Show how 30% rule ensures recursion depth = O(log n).
    
- Be able to justify Θ(n) runtime using recurrence.
    

---

## 🧠 Common Pitfalls

- Forgetting to update k relative to subarray boundaries.
    
- Confusing rank (position in sorted order) with index.
    
- Assuming randomized selection has worst-case Θ(n) (it doesn’t; only expected).
    
- Forgetting why groups of 5 work (guarantees 30/70 split).
    

---
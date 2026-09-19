
---

## Lecture Goals

- Review limits of simple quadratic-time sorting.
    
- Introduce the **Divide-and-Conquer** paradigm.
    
- Study **MergeSort** in detail:
    
    - Pseudocode, correctness, runtime analysis.
        
- Understand why **comparison-based sorting** cannot beat Ω(n log n).
    

---

## 4.1 Motivation

- Insertion Sort, Selection Sort, Bubble Sort = O(n²).
    
- Too slow for large n.
    
- Need faster algorithms.
    
- Divide-and-Conquer gives powerful framework to break O(n²) barrier.
    

---

## 4.2 Divide-and-Conquer Paradigm

**General recipe:**

1. **Divide** problem into smaller subproblems.
    
2. **Conquer**: solve each recursively.
    
3. **Combine**: merge solutions.
    

Many fast algorithms rely on this (MergeSort, QuickSort, FFT, Strassen).

---

## 4.3 MergeSort

### Algorithm idea

- To sort array A[1..n]:
    
    1. Divide into two halves A[1..n/2], A[n/2+1..n].
        
    2. Recursively sort each half.
        
    3. Merge two sorted halves into sorted array.
        

### Pseudocode

```python
def MergeSort(A, l, r):
    if l < r:
        m = ⌊(l + r)/2⌋
        MergeSort(A, l, m)
        MergeSort(A, m+1, r)
        Merge(A, l, m, r)

def Merge(A, l, m, r):
    n1 = m - l + 1
    n2 = r - m
    L = A[l..m]
    R = A[m+1..r]
    i = j = 0
    k = l
    while i < n1 and j < n2:
        if L[i] ≤ R[j]:
            A[k] = L[i]
            i += 1
        else:
            A[k] = R[j]
            j += 1
        k += 1
    # Copy remaining elements
    while i < n1:
        A[k] = L[i]; i+=1; k+=1
    while j < n2:
        A[k] = R[j]; j+=1; k+=1
```

### Correctness (loop invariant of Merge)

- At each iteration, A[l..k−1] contains smallest k−l elements of L∪R in sorted order.
    
- Initialization: holds before any elements copied.
    
- Maintenance: next smallest chosen correctly.
    
- Termination: all elements copied.
    

✅ Correct.

---

## 4.4 MergeSort Example

Input: [5,2,4,7,1,3,2,6]

- Divide into [5,2,4,7] and [1,3,2,6].
    
- Recursively sort → [2,4,5,7] and [1,2,3,6].
    
- Merge → [1,2,2,3,4,5,6,7].
    

---

## 4.5 Runtime Analysis

Recurrence:

```
T(n) = 2T(n/2) + Θ(n)
```

- Dividing = constant.
    
- Conquering = 2 recursive calls.
    
- Combining = merge = Θ(n).
    

### Recursion tree

- Height = log₂n.
    
- Each level = Θ(n).
    
- Total = Θ(n log n).
    

### Space

- Needs Θ(n) auxiliary space (for temporary arrays).
    

---

## 4.6 Comparison-Based Sorting Lower Bound

### Model: decision tree

- Sorting by comparisons = binary decision tree.
    
- Each internal node = comparison between two elements.
    
- Each leaf = one permutation of n elements.
    

### Argument

- Tree must have ≥ n! leaves (all orderings possible).
    
- Binary tree of height h has ≤ 2^h leaves.
    
- So 2^h ≥ n! → h ≥ log₂(n!).
    
- By Stirling’s approximation: log₂(n!) = Θ(n log n).
    

Thus: any comparison-based sorting requires Ω(n log n).

### Implication

- MergeSort’s Θ(n log n) is **asymptotically optimal**.
    
- QuickSort, HeapSort also achieve this.
    

---

## 🔑 Lecture IV Upshot

- Divide-and-Conquer is a universal algorithm design technique.
    
- **MergeSort** sorts in Θ(n log n), much better than quadratic sorts.
    
- Proof of correctness relies on loop invariants.
    
- Decision tree argument → no comparison sort beats Ω(n log n).
    
- Therefore MergeSort is optimal within comparison-based framework.
    

---

## 🎓 Exam / Interview Tips

- Write MergeSort + Merge pseudocode cleanly.
    
- Prove correctness with loop invariant.
    
- Derive recurrence T(n) = 2T(n/2) + Θ(n).
    
- Solve recurrence using recursion tree or Master Theorem.
    
- Explain decision-tree lower bound argument clearly.
    

---

## 🧠 Common Pitfalls

- Forgetting to copy leftover elements after merge loop.
    
- Miscomputing recurrence (e.g., T(n)=T(n/2)+Θ(n) → wrong answer).
    
- Confusing Ω(n log n) lower bound with O(n log n) upper bound.
    
- Ignoring auxiliary space c
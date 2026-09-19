
---
## Main Focus

- Define **algorithms** and explain why they matter.
    
- Show how algorithmic ingenuity drastically reduces computation.
    
- Introduce **divide-and-conquer** with MergeSort as the flagship example.
    
- Establish principles for **algorithm analysis**.
    

---

## 1.1 What Is an Algorithm? Why Study Them?

**Definition**: An **algorithm** is a finite, precise sequence of rules that takes an input and produces the correct output.

**Reasons to Study Algorithms**:

1. **Foundational to Computer Science**
    
    - Networking → shortest paths (Dijkstra).
        
    - Cryptography → modular arithmetic, number theory.
        
    - Databases → hash tables, balanced search trees.
        
    - Computational biology → sequence alignment via dynamic programming.
        
2. **Innovation driver**
    
    - Algorithms can create entire industries.
        
    - Example: **Google’s PageRank** algorithm revolutionized web search.
        
3. **Practicality**
    
    - Efficient algorithms make problems solvable at scale.
        
    - Inefficient ones make them infeasible.
        
4. **Career and Interviews**
    
    - Core skillset for technical interviews.
        
    - Algorithm questions test reasoning, efficiency, and problem-solving.
        

---

## 1.2 Integer Multiplication (Naïve Method)

### Problem:

Multiply two _n_-digit integers.

### Naïve (Grade-School) Algorithm:

- Multiply each digit of one number by each digit of the other.
    
- Running time: **O(n²)** single-digit operations.
    

**Example**: Multiplying `1234 × 5678` involves 16 multiplications.

💡 _Growth Intuition_: For n=1,000 digits → ~1,000,000 operations.

---

## 1.3 Karatsuba’s Algorithm (Smarter Multiplication)

### Idea: Reduce recursive multiplications.

Represent numbers split in half:

```
x = 10^(n/2)·a + b
y = 10^(n/2)·c + d
```

- where `a, b, c, d` are n/2-digit numbers.
    

Naïve expansion:

```
x·y = (10^n)(a·c) + (10^(n/2))(a·d + b·c) + (b·d)
```

Requires **4 multiplications** of size n/2.

### Karatsuba’s Trick:

Instead compute:

```
(a+b)(c+d) = a·c + b·d + (a·d + b·c)
```

So:

```
a·d + b·c = (a+b)(c+d) – a·c – b·d
```

Now only **3 multiplications** of size n/2 are needed:

- a·c
    
- b·d
    
- (a+b)(c+d)
    

### Recurrence:

```
T(n) = 3T(n/2) + O(n)
```

By Master Theorem → **T(n) = O(n^log₂3) ≈ O(n^1.59)**.

⚡ Speedup vs naïve O(n²).

---

## 1.4 Sorting – The Problem

### Input:

Array of _n_ numbers.

### Output:

Sorted array (non-decreasing order).

### Naïve Sorting Algorithms:

- **Selection Sort, Insertion Sort, Bubble Sort** → **O(n²)**.
    
- Fine for small n, but catastrophic for large n.
    

---

## 1.5 MergeSort – Divide and Conquer

### Strategy:

1. **Divide** array into halves.
    
2. **Conquer** → recursively sort each half.
    
3. **Combine** → merge two sorted halves in O(n).
    

### Example:

Sort `[5,4,1,8,7,2,6,3]`

- Split into `[5,4,1,8]` and `[7,2,6,3]`.
    
- Sort recursively.
    
- Merge `[1,4,5,8]` + `[2,3,6,7]` → `[1,2,3,4,5,6,7,8]`.
    

### Pseudocode:

```python
def merge_sort(A):
    if len(A) <= 1:
        return A
    mid = len(A)//2
    left = merge_sort(A[:mid])
    right = merge_sort(A[mid:])
    return merge(left, right)

def merge(L, R):
    result = []
    i = j = 0
    while i < len(L) and j < len(R):
        if L[i] <= R[j]:
            result.append(L[i])
            i += 1
        else:
            result.append(R[j])
            j += 1
    result.extend(L[i:])
    result.extend(R[j:])
    return result
```

---

## 1.6 MergeSort Analysis

### Recurrence:

```
T(n) = 2T(n/2) + O(n)
```

### Recursion Tree Method:

- Each level → O(n) work.
    
- Number of levels → log₂ n.
    
- Total = **O(n log n)**.
    

### Comparison:

- Bubble/Selection/Insertion Sort = O(n²).
    
- MergeSort = O(n log n).
    

For n=1,000,000:

- Quadratic → ~10^12 operations.
    
- n log n → ~20×10^6 (50,000× faster).
    

---

## 1.7 Guiding Principles for Algorithm Analysis

1. **Worst-case analysis**
    
    - Guarantees performance for all inputs.
        
    - Easier to reason about.
        
2. **Asymptotic analysis**
    
    - Focus on input size → infinity.
        
    - Ignore machine constants and lower-order terms.
        
3. **Growth rate matters most**
    
    - Linear vs quadratic is decisive.
        
    - Example: O(n) beats O(n²) even if constants differ hugely.
        
4. **Divide-and-Conquer**
    
    - Solve large problems by splitting into smaller ones.
        
    - Often gives O(n log n) or better runtimes.
        

---

# 🔑 The Upshot of Chapter 1

- **Algorithms matter**: They drive technology, science, and industry.
    
- **Naïve algorithms are not enough**: Example: O(n²) integer multiplication and sorting.
    
- **Smarter approaches exist**: Karatsuba’s trick (O(n^1.59)) vs O(n²).
    
- **Divide-and-conquer** is powerful: MergeSort achieves O(n log n).
    
- **Analysis framework**: Use recurrences and asymptotics to reason about efficiency.
    
- **Worst-case and growth rates**: Core to algorithm design and comparison.
    

---

## 🎓 Exam / Interview Tips

- Define input/output clearly when describing an algorithm.
    
- Always compare naive vs improved solution.
    
- Be able to derive and solve recurrences.
    
- Memorize MergeSort pseudocode + O(n log n) proof.
    
- Explain Karatsuba’s trick in plain words and algebra.
    
- Growth rate intuition is key: always think how runtime scales.
    

---
Next: [[Chapter 2 - Asymptotic Notation]]

---

## Lecture Goals

- Introduce **Insertion Sort** as a simple sorting algorithm.
    
- Use **loop invariants** to prove correctness.
    
- Analyze **running time** rigorously.
    
- Build foundations for comparing algorithm performance.
    

---

## 2.1 Why Study Sorting?

- Sorting is a fundamental computational task.
    
- Forms the basis for more advanced algorithms (searching, divide-and-conquer, etc.).
    
- Many algorithms reduce to sorting as a subroutine.
    
- Sorting provides a first deep dive into **design + analysis**.
    

---

## 2.2 Insertion Sort

### Intuition

- Sort an array by **inserting** each element into its correct position among the already-sorted left portion.
    
- Works like how humans often sort playing cards in their hands.
    

### Pseudocode

```python
def InsertionSort(A):
    for j in range(2, len(A)+1):
        key = A[j]
        i = j - 1
        while i > 0 and A[i] > key:
            A[i+1] = A[i]
            i = i - 1
        A[i+1] = key
```

### Example

Array = [5, 2, 4, 6, 1, 3]

1. Start with first element (5) – trivially sorted.
    
2. Insert 2 → [2,5,4,6,1,3].
    
3. Insert 4 → [2,4,5,6,1,3].
    
4. Insert 6 → [2,4,5,6,1,3].
    
5. Insert 1 → [1,2,4,5,6,3].
    
6. Insert 3 → [1,2,3,4,5,6].
    

Sorted!

---

## 2.3 Correctness via Loop Invariants

### What is a loop invariant?

A property that is true **before and after each iteration** of a loop.

**For Insertion Sort:**

- At the start of each iteration of outer loop (for j), the subarray A[1..j−1] is sorted.
    

### Three-step proof technique

1. **Initialization:** Before first iteration (j=2), A[1..1] is trivially sorted.
    
2. **Maintenance:** If A[1..j−1] sorted before iteration, insertion step places A[j] into correct spot → A[1..j] sorted.
    
3. **Termination:** When loop ends (j=n+1), entire array A[1..n] is sorted.
    

✅ Correctness proven.

#### From The Lecture:

**To prove a statement is a loop invariant, we must show:** 

- it holds true prior to the first iteration of the loop
- if it is true before an iteration, it remains true before the next iteration
- upon termination of the loop, the invariant (along with the condition which caused the loop to terminate) help to determine the algorithm is correct

*We refer to the three properties as Initialization, Maintenance and Termination respectively.*
![[Screenshot 2025-09-19 at 10.19.05.png]]

![[Screenshot 2025-09-19 at 10.20.20.png]]## 2.4 Running Time Analysis

We measure running time as a function of **input size n**.

### Cost model

- Count number of primitive operations (comparisons, assignments).
    
- Analyze **best, worst, average case**.
    

### Best case (already sorted)

- Inner `while` rarely executes.
    
- Running time = Θ(n).
    

### Worst case (reverse sorted)

- Each insertion shifts ~j elements.
    
- Total shifts ~ 1 + 2 + … + (n−1) = Θ(n²).
    

### Average case

- Also Θ(n²).
    

### Conclusion

- Insertion Sort: Θ(n²) worst-case.
    
- Good for small n or nearly sorted arrays.
    

---

## 2.5 Comparison with Other Sorting

- Insertion Sort vs MergeSort:
    
    - Insertion Sort: simple, Θ(n²).
        
    - MergeSort: asymptotically faster, Θ(n log n).
        
- Insertion Sort is often used as **subroutine** in faster algorithms (e.g., small subarrays in MergeSort/QuickSort).
    

---

## 2.6 Big-O Notation Refresher

- **Big-O:** asymptotic _upper bound_.
    
- **Big-Ω:** asymptotic _lower bound_.
    
- **Big-Θ:** tight bound (both upper and lower).
    

Examples:

- Insertion Sort worst-case: O(n²).
    
- MergeSort: Θ(n log n).
    

---

# 🔑 Lecture II Upshot

- Sorting is fundamental; Insertion Sort is the simplest starting point.
    
- **Loop invariants** are a rigorous method to prove correctness.
    
- Insertion Sort: Θ(n) best-case, Θ(n²) worst-case.
    
- Demonstrates why algorithm analysis matters.
    
- Sets stage for faster algorithms.
    

---

## 🎓 Exam / Interview Tips

- Be able to write Insertion Sort pseudocode from scratch.
    
- Practice proving correctness with loop invariants.
    
- State best- and worst-case runtimes clearly.
    
- Know when Insertion Sort is practical (small arrays, nearly sorted arrays).
    
- Common question: _What happens if array is already sorted?_ (Θ(n)).
    

---

## 🧠 Common Pitfalls

- Forgetting initialization step in loop invariant proof.
    
- Confusing best- vs average-case.
    
- Thinking Insertion Sort is always Θ(n²) – remember best-case linear.
    
- Off-by-one errors in pseudocode (indexing A[j], A[i+1]).
    

---
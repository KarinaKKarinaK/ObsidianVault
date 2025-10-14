- Review Big-O, Big-Theta, Big-Omega + worst case and avg case for diff algorithms
- Lopp invariant: initialisation, maintenance, termination
- Hash tables - how they work and what they are
- Running time analysis - memorize for different algorithms & how to do teh basic calculations & show them (T(n))
- Implementing stack as 2 queues, and queue as 2 stacks
- What is the difference between iterative and recursive algs
- Heaps; Max-Heap, Heapify (how they work, their running time, the array access to parent/children (as in 2i, 2i+1, floow(i/2), etc)
- Pseudocode for all basic algs
---
# DSA Exam Crash Review

## 1. Big-O, Big-Θ, Big-Ω

- **Big-O** = upper bound (worst-case growth).
    
- **Big-Ω** = lower bound (best-case growth).
    
- **Big-Θ** = tight bound (both upper + lower).
    

Examples:

- Insertion Sort:
    
    - Best = Ω(n) (already sorted).
        
    - Worst = O(n²).
        
    - Average = Θ(n²).
        
- Merge Sort: O(n log n), Ω(n log n), Θ(n log n).
    
- Quick Sort: Best/Avg = Θ(n log n), Worst = Θ(n²).
    
- Heapify = O(log n), Build-Heap = O(n), HeapSort = O(n log n).
    
- Hash Table (with chaining, good hash): Expected O(1) insert/search/delete, worst O(n).
    

---

## 2. Loop Invariants

Use for proving correctness:

- **Initialization:** True before loop starts.
    
- **Maintenance:** If true before iteration, stays true after.
    
- **Termination:** When loop ends, invariant + condition ⇒ correctness.
    

_Example:_ In Insertion Sort, invariant: subarray A[0..i-1] is sorted.

#### More examples - to memorize:

**Selection Sort**

- Invariant: _At the start of each iteration `i`, the subarray `A[0..i-1]` contains the `i-1` smallest elements in sorted order._
    
- **Init:** Empty prefix is trivially sorted.
    
- **Maint:** Find smallest in remainder, swap into position `i`.
    
- **Term:** Array is fully sorted.

**Linear Search**

- Invariant: _Before each step `i`, no element in subarray `A[0..i-1]` is equal to `x`
    
- **Maint:** If found, stop. Else continue.
    
- **Term:** Either found `x`, or scanned all and return NIL.

 **Binary Search**

- Invariant: _At the start of each iteration, if `x` is in `A`, it must be between indices `low` and `high`._
    
- **Maint:** Update interval by halving.
    
- **Term:** If `low > high`, `x` not in array.
    


 **Merge (in Merge Sort)**

- Invariant: _At each step of merging, the output array contains the smallest elements from left+right subarrays in sorted order._
    
- **Maint:** Compare front elements, pick smaller.
    
- **Term:** All elements merged, output sorted.
    

 **Heapify (Max-Heapify)**

- Invariant: _Before each recursive step, the subtrees of `i` are max-heaps, but node `i` may violate the heap property._
    
- **Maint:** Swap with larger child, recurse.
    
- **Term:** Property restored at `i`, heap valid.
    

**Partition (QuickSort)**

- Invariant: _At any time: all elements ≤ pivot are before index `i`, all elements ≥ pivot are after index `j`, and elements between `i` and `j` are unexamined._
    
- **Maint:** Move pointers until done.
    
- **Term:** Pivot in correct position.
---

## 3. Hash Tables

- **Hash function:** maps key → index (e.g., division method, multiplicative).
    
- **Collisions:**
    
    - Chaining (linked lists in buckets).
        
    - Open addressing (linear probing, quadratic, double hashing).
        
- **Load factor α = n/m.** Keep α ≤ 0.75 for performance.
    
- **Expected runtime:** O(1), worst-case O(n).
    
- Used for fast lookup, insert, delete.
    

---

## 4. Running Time Analysis

- **Basic recurrences:**
    
    - T(n) = T(n/2) + Θ(n) ⇒ Θ(n log n).
        
    - T(n) = 2T(n/2) + Θ(n) ⇒ Θ(n log n).
        
    - T(n) = T(n-1) + Θ(1) ⇒ Θ(n).
        
- **Technique:**
    
    - Identify base case, recursive part, and combine step.
        
    - Use recurrence tree or Master Theorem.
        
- **Memorize common runtimes:**
    
    - Sorting: Insertion O(n²), Merge O(n log n), Quick O(n log n) avg, Heap O(n log n), Bucket (expected O(n)).
        
    - Searching: Binary Search O(log n), Linear O(n).
        
    - Hashing: O(1) expected.
        

# Running Time Analysis Cheat Sheet

## Structure of an Algorithm’s Time

Every algorithm has 3 parts:

1. **Base case:** cost for trivial/small input (`n=1` or constant size). Usually Θ(1).
    
2. **Recursive/iterative part:** how many recursive calls, and on what fraction of `n`.
    
3. **Combine step:** the extra work (e.g., scanning, merging, partitioning).
    
![[Screenshot 2025-09-22 at 14.54.34.png]]

## General Patterns

### Iterative algorithms

- Usually: **loop through array** → O(n).
    
- Sometimes: **nested loops** → O(n²).
    
- Rarely: add log factors if loop halves data each time (e.g., Binary Search = O(log n)).
    

**Example:** Linear search

- Base: none (no recursion).
    
- Loop: check each element.
    
- Cost = Θ(n).
    

**Example:** Binary search (iterative form)

- Each iteration halves the range.
    
- Cost = Θ(log n).

### Recursive algorithms

Use recurrence relation.

#### a) Divide and Conquer (common!)

- **Merge Sort:**
    
    - Base = Θ(1).
        
    - Recursive = 2 subproblems, size n/2.
        
    - Combine = Θ(n) (merge).
        
    - Recurrence: T(n) = 2T(n/2) + Θ(n).
        
    - Solution: Θ(n log n).
        
- **Binary Search (recursive):**
    
    - Base = Θ(1).
        
    - Recursive = 1 subproblem, size n/2.
        
    - Combine = Θ(1).
        
    - T(n) = T(n/2) + Θ(1) ⇒ Θ(log n).
        

#### b) Decreasing-size recursion

- **Insertion Sort recursive form:**
    
    - Base = Θ(1).
        
    - Recursive = T(n-1).
        
    - Combine = Θ(n) (insert last element).
        
    - T(n) = T(n-1) + Θ(n) ⇒ Θ(n²).
        
- **QuickSort:**
    
    - Base = Θ(1).
        
    - Recursive = 2 subproblems of size ~n/2 (best/avg).
        
    - Combine = Θ(n) (partition).
        
    - Best/Avg: T(n) = 2T(n/2) + Θ(n) = Θ(n log n).
        
    - Worst: T(n) = T(n-1) + Θ(n) = Θ(n²).

## How to Answer Exam-Style

- Identify:
    
    1. Base case (what happens when n=1).
        
    2. Recursive step (how many subproblems, what size).
        
    3. Combine cost (how much extra work).
        
- Write recurrence.
    
- Solve (or state known solution).

![[Screenshot 2025-09-22 at 14.55.53.png]]
---

## 5. Stack & Queue Implementations

**Queue with 2 Stacks:**

- Enqueue: push to S1.
    
- Dequeue: if S2 empty, pop all from S1 into S2, then pop from S2.
    
- Amortized O(1).
    

**Stack with 2 Queues:**

- Method 1: Push O(1), Pop O(n) (move all but one element).
    
- Method 2: Push O(n), Pop O(1).
    

### Queue using Two Stacks (S1, S2)
```text
ENQUEUE(Q, x):
    PUSH(S1, x)
    
DEQUEUE(Q):
    if S2 is empty:
        while S1 is not empty:
            y = POP(S1)
            PUSH(S2, y)
    if S2 is empty:
        error "queue underflow"
    return POP(S2)

```


### Stack using Two Queues (Q1, Q2)
```text
PUSH(S, x):
    ENQUEUE(Q1, x)

POP(S):
    if Q1 is empty:
        error "stack underflow"
    while size(Q1) > 1:
        y = DEQUEUE(Q1)
        ENQUEUE(Q2, y)
    popped = DEQUEUE(Q1)     // last element
    swap(Q1, Q2)             // make Q1 the main queue again
    return popped

```
---

## 6. Iterative vs Recursive Algorithms

- **Recursive:** function calls itself on smaller input. Easier to prove, shorter code.
    
- **Iterative:** uses loops, no extra call stack. More memory-efficient.
    
- Example: Factorial n! = recursive `n*fact(n-1)` vs iterative loop.
    

---

## 7. Heaps

- **Heap:** Complete binary tree, stored in array.
    
- **Index formulas:**
    
    - Parent(i) = ⌊i/2⌋
        
    - Left(i) = 2i
        
    - Right(i) = 2i+1
        
- **Max-Heap property:** H[parent(i)] ≥ H[i].
    
- **Min-Heap property:** H[parent(i)] ≤ H[i].
    

### Max-Heapify

- Fixes one violation at node i.
    
- Time: O(log n).
    

### Build-Heap

- Calls Heapify bottom-up.
    
- Time: O(n).
    

### HeapSort

1. Build-Heap O(n).
    
2. Repeatedly extract max + heapify.
    
3. Total O(n log n).
    

---

## 8. Pseudocode (must know)

**Insertion Sort:**

```text
for j = 2 to n:
   key = A[j]
   i = j - 1
   while i > 0 and A[i] > key:
       A[i+1] = A[i]
       i = i - 1
   A[i+1] = key
```

**Merge Sort:**

```text
MERGE-SORT(A, p, r):
   if p < r:
      q = floor((p+r)/2)
      MERGE-SORT(A, p, q)
      MERGE-SORT(A, q+1, r)
      MERGE(A, p, q, r)
```

**Quick Sort:**

```text
QUICKSORT(A, p, r):
   if p < r:
      q = PARTITION(A, p, r)
      QUICKSORT(A, p, q-1)
      QUICKSORT(A, q+1, r)
```

**Heapify:**

```text
MAX-HEAPIFY(A, i):
   l = LEFT(i)
   r = RIGHT(i)
   if l ≤ heap-size and A[l] > A[i]:
       largest = l
   else largest = i
   if r ≤ heap-size and A[r] > A[largest]:
       largest = r
   if largest ≠ i:
       swap A[i] with A[largest]
       MAX-HEAPIFY(A, largest)
```

**Bucket Sort:**

```text
BUCKET-SORT(A):
   n = length(A)
   create n empty buckets
   for each element A[i]:
       insert A[i] into bucket B[floor(n*A[i])]
   for each bucket:
       sort bucket with insertion sort
   concatenate buckets
```

---

✅ **Exam strategy:**

- Always state best/avg/worst complexity.
    
- Mention loop invariants for correctness.
    
- For heaps, remember index formulas and Heapify O(log n).
    
- For hash tables, emphasize expected O(1).
    
- For sorting, memorize runtimes.
    
- For stack/queue trick questions, recall amortized vs worst-case costs.
    


Exhaustive guide covering **all concepts, formulas, facts, strategies, and problem-solving methods** needed for assignments and exams (midterms).

---

## 1. Algorithmic Thinking

### What is an Algorithm?

- Finite, precise step-by-step procedure for solving a problem.
    
- Input → Algorithm → Output.
    

**Qualities of good algorithms:**

1. Correctness.
    
2. Efficiency (time & space).
    
3. Clarity (easy to implement and prove).
    

---

## 2. Pseudocode Conventions

- Written in a mix of plain English + structured code.
    
- Control structures: `if-else`, `for`, `while`, recursion.
    
- Example format:
    

```python
Algorithm Example(A, n):
    for i := 1 to n do
        if A[i] > 0 then
            print(A[i])
```

- Use `:=` for assignment, `=` for comparison.
    
- Arrays are often **1-indexed** in algorithms textbooks (watch out).
    

---

## 3. Mathematical Tools

### 3.1 Summations

- Σᵢ₌₁ⁿ i = n(n+1)/2 = Θ(n²).
    
- Σᵢ₌₁ⁿ log i = Θ(n log n).
    
- Σᵢ₌₀^{log n} n/2^i = Θ(n).
    

### 3.2 Recurrences

- Express runtime of divide-and-conquer algorithms.
    
- Example: MergeSort → T(n) = 2T(n/2) + Θ(n).
    
- Solve using:
    
    - **Recursion tree method**.
        
    - **Master theorem**.
        

### 3.3 Master Theorem

For T(n) = aT(n/b) + f(n), let α = log_b a:

1. If f(n) = O(n^{α−ε}) → T(n) = Θ(n^α).
    
2. If f(n) = Θ(n^α log^k n) → T(n) = Θ(n^α log^{k+1} n).
    
3. If f(n) = Ω(n^{α+ε}), regularity condition → T(n) = Θ(f(n)).
    

### 3.4 Growth Rates

```
1 << log n << n << n log n << n² << n³ << 2^n << n!
```

---

## 4. Asymptotic Notation

- **Big-O (O):** upper bound.
    
- **Big-Ω (Ω):** lower bound.
    
- **Big-Θ (Θ):** tight bound.
    
- **Little-o:** strictly smaller order.
    
- Ignore constants and lower-order terms.
    

**Key facts to memorize:**

- log base doesn’t matter (log₂n = Θ(log₁₀n)).
    
- Exponential >> polynomial >> logarithmic.
    
- Any comparison-based sort ≥ Ω(n log n).
    

---

## 5. Loop Invariants (Proving Correctness)

**Definition:** A property that holds before and after each iteration of a loop.

### 3-Step Proof Technique

1. **Initialization** → true before loop starts.
    
2. **Maintenance** → if true before iteration, remains true after.
    
3. **Termination** → when loop ends, invariant gives correctness.
    

### Example: Insertion Sort

Invariant: A[1..j−1] is sorted before iteration j.

- Initialization: j=2 → A[1] sorted.
    
- Maintenance: insertion step keeps A[1..j] sorted.
    
- Termination: j=n+1 → whole array sorted.
    

**You MUST be able to:**

- State the invariant clearly.
    
- Prove it with 3 steps.
    
- Use it for sorting, searching, merging.
    

---

## 6. Fundamental Data Structures

### Stack

- LIFO (Last-In First-Out).
    
- Operations: push(x), pop(), top().
    
- O(1) per operation.
    

### Queue

- FIFO (First-In First-Out).
    
- Operations: enqueue(x), dequeue().
    
- O(1) per operation.
    

### Trick Implementations

- Queue with 2 stacks.
    
- Stack with 2 queues.
    
- Queue with circular array.
    

### Linked Lists

- Singly (next pointer).
    
- Doubly (next + prev).
    
- Pros: dynamic size, O(1) insertion/deletion.
    
- Cons: O(n) search.
    

---

## 7. Trees

### Rooted Trees

- Each node has children.
    
- Binary tree = ≤2 children.
    

### Binary Search Tree (BST)

- Left subtree ≤ root ≤ right subtree.
    
- Traversals:
    
    - Inorder = sorted order.
        
    - Preorder = root-first.
        
    - Postorder = root-last.
        
- Search, insert, delete = O(h), h=height.
    
- Worst case h=O(n), balanced h=O(log n).
    

### AVL Trees

- Self-balancing BST.
    
- After insert/delete, rotate to maintain balance.
    
- Guarantees h=O(log n).
    

### Heaps

- Complete binary tree.
    
- Max-heap property: parent ≥ children.
    
- Stored as array.
    
- Operations:
    
    - MaxHeapify O(log n).
        
    - BuildMaxHeap O(n).
        
    - ExtractMax O(log n).
        
    - HeapSort O(n log n).
        

---

## 8. Hash Tables

- Map keys → table slots using hash function.
    
- Collisions inevitable.
    

### Collision resolution

1. **Chaining** → linked lists.
    
    - Search O(1+α), α=load factor.
        
2. **Open addressing** → linear probing, quadratic, double hashing.
    
    - Search/insertion O(1) expected.
        

### Worst case

- All keys map to same slot → O(n).
    

---

## 9. Sorting Algorithms

### Insertion Sort

- Best: Θ(n). Worst: Θ(n²).
    
- Loop invariant proof.
    

### Selection Sort

- Always Θ(n²).
    
- Invariant: first i elements sorted.
    

### Bubble Sort

- Best: Θ(n) if already sorted.
    
- Worst: Θ(n²).
    

### MergeSort

- Divide-and-conquer.
    
- Recurrence T(n)=2T(n/2)+Θ(n).
    
- Runtime: Θ(n log n).
    

### QuickSort

- Partition-based.
    
- Best: Θ(n log n).
    
- Worst: Θ(n²).
    
- Expected: Θ(n log n).
    

### HeapSort

- Build heap + extract max repeatedly.
    
- Θ(n log n), in-place.
    

### Counting Sort

- O(n+k), stable.
    
- Not comparison-based.
    

### Bucket Sort

- Expected O(n) if uniform distribution.
    

### Radix Sort

- Works with stable subroutine.
    
- Not correct without stability.
    

---

## 10. Problem-Solving Strategies

### For Stack/Queue Problems

- Translate into known operations.
    
- If asked for implementation with other structure: simulate with push/pop/enqueue/dequeue.
    
- Dry-run small example to check FIFO/LIFO correctness.
    

### For Sorting Problems

- Know each algorithm’s best/worst/average.
    
- Be able to trace step-by-step.
    
- State loop invariants.
    
- Derive recurrences.
    

### For Hashing Problems

- Write table, insert step-by-step.
    
- Apply probing rules carefully.
    

### For Tree/Heap Problems

- Draw structure!
    
- Trace each insertion, deletion, or rotation.
    
- For heaps: remember array index rules.
    

### For Runtime Analysis

- Identify loops (nested = multiply complexities).
    
- Use summations and Θ notation.
    
- For recurrences: apply recursion tree or Master theorem.
    

---

# 🔑 Final Checklist: What to Memorize

1. **Definitions**: stack, queue, linked list, BST, AVL, heap, hash table.
    
2. **Pseudocode templates**: insertion sort, merge, merge sort, partition, quicksort, heapify, build-heap, enqueue/dequeue via stacks/queues.
    
3. **Loop invariant 3-step method**.
    
4. **Summation formulas**.
    
5. **Master theorem cases**.
    
6. **Complexity table**:
    
    - Insertion Sort: Θ(n²) worst, Θ(n) best.
        
    - Selection Sort: Θ(n²).
        
    - Bubble Sort: Θ(n²), best Θ(n).
        
    - MergeSort: Θ(n log n).
        
    - QuickSort: expected Θ(n log n), worst Θ(n²).
        
    - HeapSort: Θ(n log n).
        
    - Counting Sort: Θ(n+k).
        
    - Bucket Sort: expected Θ(n).
        
7. **Lower bound**: any comparison-based sort ≥ Ω(n log n).
    
8. **Hashing**: chaining vs open addressing, load factor.
    
9. **Tree traversals** orders.
    
10. **Heap array formulas**: parent=⌊i/2⌋, left=2i, right=2i+1.
    

---

# Exam Tips

- Always state loop invariant when proving correctness.
    
- Be explicit with Big-O definitions (constants c, n₀).
    
- For pseudocode: clarity > syntax.
    
- Show intermediate steps when tracing.
    
- When in doubt, compare to known growth rates.
    

---
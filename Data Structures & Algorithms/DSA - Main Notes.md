For pseudocode: [[DSA - Pseudocode]]
#### Exam Concepts:
- Insertion Sort
- Bucket Sort
- Merge Sort
- Counting sort
- Selection Sort
- Quick Sort
- Heap Sort
- Bubble Sort
- hash maps/tables - Lecture 3
- heaps
Chapter 1, 10, 2, 11, 7, 8, 6
# Sorting Algorithms

### **Insertion Sort**

- **Key idea:** Build the sorted list one element at a time by inserting each new element into its correct place.
    
- **Analogy:** Like sorting cards in your hand.
    
- **Time:** Best O(n) (already sorted), worst O(n²).
    
- **Use:** Small or nearly sorted arrays.
    

---

### **Bucket Sort**

- **Key idea:** Divide the input into “buckets” (intervals), sort each bucket (often with insertion sort), then concatenate.
    
- **Works best when:** Input is uniformly distributed.
    
- **Time:** Average O(n), worst O(n²) if all fall in one bucket.
    
- **Use:** Numbers from uniform distribution (e.g., [0,1)).
    

---

### **Merge Sort**

- **Key idea:** Divide-and-conquer. Split array in half, recursively sort halves, then merge them.
    
- **Recurrence:** T(n) = 2T(n/2) + Θ(n) = Θ(n log n).
    
- **Properties:** Stable, always O(n log n).
    
- **Use:** Large datasets, when stability matters.
    

---

### **Counting Sort**

- **Key idea:** Count occurrences of each value (within range 0..k), then compute positions.
    
- **Time:** O(n + k).
    
- **Properties:** Non-comparison, stable.
    
- **Use:** Small integer ranges.
    

---

### **Selection Sort**

- **Key idea:** Repeatedly find the minimum element and put it in the front.
    
- **Time:** Always O(n²).
    
- **Properties:** Few swaps, but many comparisons.
    
- **Use:** When memory writes are expensive.
    

---

### **Quick Sort**

- **Key idea:** Choose a pivot, partition array into < pivot and > pivot, recursively sort partitions.
    
- **Recurrence:** Best O(n log n), worst O(n²) (bad pivots).
    
- **Use:** General-purpose sorting (very fast on average).
    

---

### **Heap Sort**

- **Key idea:** Use a heap (priority queue) to repeatedly extract max/min and rebuild heap.
    
- **Steps:** Build heap O(n), extract n times O(n log n).
    
- **Time:** Always O(n log n).
    
- **Use:** In-place, no recursion needed.
    

---

### **Bubble Sort**

- **Key idea:** Repeatedly swap adjacent elements until array is sorted.
    
- **Time:** Worst O(n²), best O(n) (if already sorted).
    
- **Use:** Teaching basic sorting; rarely in practice.
    

---

**Summary memory hooks**

- **Insertion** = card game
    
- **Bucket** = bins + uniform spread
    
- **Merge** = divide + merge
    
- **Counting** = counts, no comparisons
    
- **Selection** = find min each time
    
- **Quick** = pivot + partition
    
- **Heap** = tree with max/min at root
    
- **Bubble** = swap neighbors repeatedly
    
- **Hash tables** = O(1) dictionary
    
- **Heaps** = fast priority queues


# Data Structures

### **Hash Maps / Hash Tables**

- **Key idea:** Store key → value pairs in an array using a hash function.
    
- **Search/insert/delete:** O(1) average, O(n) worst (collisions).
    
- **Collision handling:** Chaining (linked lists) or open addressing (linear probing, quadratic probing).
    
- **Use:** Fast lookups (e.g., dictionaries, caches).
    

---

### **Heaps**

- **Key idea:** Binary tree with heap property: parent ≥ children (max-heap) or parent ≤ children (min-heap).
    
- **Operations:**
    
    - Insert: O(log n)
        
    - Extract-max/min: O(log n)
        
    - BuildHeap: O(n)
        
- **Use:** Priority queues, heap sort, scheduling.

# Exam Info:
--> Focus on **concepts, pseudocode, analysis, and exam tricks** rather than rote memorization.

---

# Exam Prep Guide (DSA)

## 1. **Core Sorting Algorithms**

You already have the pseudocode. What you need to focus on is:

- **Key properties** (stable or not, in-place or not, recursive or iterative, best/worst/average time).
    
- **When to use which** (e.g., insertion = small/nearly sorted; merge = stable O(n log n); quick = fast avg; counting/bucket = non-comparison; heap = in-place O(n log n)).  
    👉 Tip: Be ready to **write pseudocode skeletons quickly** (like quicksort, merge sort, heapify).
    

---

## 2. **Searching**

- **Linear Search**
    
    ```text
    for i = 1 to n:
        if A[i] = x: return i
    return NOT_FOUND
    ```
    
    - Time: O(n).
        
- **Binary Search** (sorted input)
    
    ```text
    low = 1; high = n
    while low <= high:
        mid = floor((low+high)/2)
        if A[mid] = x: return mid
        else if A[mid] < x: low = mid + 1
        else: high = mid - 1
    return NOT_FOUND
    ```
    
    - Time: O(log n).
        

👉 **Key exam angle:**

- Binary search uses **loop invariant**: at start of each loop, if x is in A, then it must be in A[low..high]
    

---

## 3. **Loop Invariants** (important exam theme!)

- **Definition:** A condition that is true before and after each loop iteration.
    
- **Used for proofs of correctness.**
    
- **Structure of proof:**
    
    1. **Initialization:** Show it holds before first iteration.
        
    2. **Maintenance:** Show it remains true after each iteration.
        
    3. **Termination:** When loop ends, invariant + exit condition = correctness.
        

👉 **Classic example: Insertion Sort**  
Invariant: `A[1..i-1]` is sorted at start of iteration i.

---

## 4. **Heaps**

### More on heaps: [[Heaps - DSA]]

- **Heap property:** Each parent ≥ children (max-heap).
    
- **Implementation:** Complete binary tree in array.
    
- **Operations:**
    
    - `MAX-HEAPIFY` = O(log n).
        
    - `BUILD-MAX-HEAP` = O(n).
        
    - `HEAP-SORT` = O(n log n).
        
    - Priority queue ops: Insert, Extract-Max, Increase-Key.  
        👉 Tip: **Know the array indexing formulas**:
        
- Left(i) = 2i
    
- Right(i) = 2i+1
    
- Parent(i) = floor(i/2)
    

---

## 5. **Hash Tables**

- **Hash function:** h(k) = k mod m (common).
    
- **Collision handling:**
    
    - Chaining (linked lists).
        
    - Open addressing (linear probing, quadratic probing, double hashing).
        
- **Time:** O(1) average, O(n) worst (collisions).
    

👉 Exam trap: Be ready to trace inserts/searches with given hash function + table size.

---

## 6. **Queues and Stacks**

- **Stack (LIFO):**
    
    - Push, Pop = O(1).
        
    - Use for recursion simulation, undo.
        
- **Queue (FIFO):**
    
    - Enqueue, Dequeue = O(1).
        
    - Implementation: Circular array (`(tail+1) mod n = head` means full).  
        👉 Tip: They love asking “is the queue full/empty?” with modular arithmetic.
        

---

## 7. **Iterative vs Recursive**

- **Recursive:** Natural for divide-and-conquer (quicksort, mergesort, binary search). Needs base case.
    
- **Iterative:** Often more space-efficient (no recursion stack).  
    👉 Exam angle: “Write iterative binary search” vs “recursive version.”
    

---

## 8. **Time Complexity Analysis**

- **Summations**
    
    - Σi = n(n+1)/2 = Θ(n²)
        
    - Σ log i = Θ(n log n)
        
- **Recurrence examples:**
    
    - Merge Sort: T(n) = 2T(n/2) + Θ(n) → Θ(n log n)
        
    - Quicksort worst: T(n) = T(n-1) + Θ(n) → Θ(n²)
        
    - Quicksort best: T(n) = 2T(n/2) + Θ(n) → Θ(n log n)
        
- **Heapsort:** O(n log n).
    
- **Binary Search:** O(log n).
    

---

# 🔹 Exam Tips

1. **Don’t memorize entire code** — just skeleton + key idea.
    
2. **Write clear loop invariants** (show correctness of your algorithm).
    
3. **When analyzing runtime, think:**
    
    - Does it scan all elements? (n)
        
    - Does it split in half? (log n levels)
        
    - Does it do both? (n log n).
        
4. **Trace examples**: be able to run insertion sort, heapify, hash table insert by hand.
    
5. **Recursive vs iterative**: examiners often test if you can convert between them.
    

---

✅ If I were you, I’d spend my last days:

- Practicing **pseudocode writing** for: insertion, quicksort, merge, heapify, hash insert/search, binary search.
    
- Practicing **runtime derivations** with recurrences.
    
- Practicing **invariant writing** (especially for insertion sort + binary search).
    
- Doing 1–2 example traces per algorithm.
    

---
# Algorithm Overview Cheat Sheet

|Algorithm|Key Properties|Best / Avg / Worst Time|Space|Mechanism (short)|When to Use|
|---|---|---|---|---|---|
|**Insertion Sort**|Stable ✅, In-place ✅, Iterative|Best: O(n) Avg: O(n²) Worst: O(n²)|O(1)|Insert each new element into correct position (like card sorting).|Small or nearly sorted arrays.|
|**Selection Sort**|Not stable ❌, In-place ✅, Iterative|Best/Avg/Worst: O(n²)|O(1)|Repeatedly select min and place at front. Few swaps.|When swaps are costly but comparisons are cheap.|
|**Bubble Sort**|Stable ✅, In-place ✅, Iterative|Best: O(n) Avg/Worst: O(n²)|O(1)|Repeatedly swap adjacent out-of-order pairs.|Teaching/simple cases, rarely in practice.|
|**Merge Sort**|Stable ✅, Not in-place ❌ (needs O(n)), Recursive|Best/Avg/Worst: O(n log n)|O(n)|Divide array in halves, sort recursively, merge.|Large datasets, when stability is needed.|
|**Quick Sort**|Not stable ❌, In-place ✅, Recursive|Best: O(n log n) Avg: O(n log n) Worst: O(n²)|O(log n) (recursion)|Partition around pivot, recurse on subarrays.|General-purpose sort, very fast in practice.|
|**Heap Sort**|Not stable ❌, In-place ✅, Iterative|Best/Avg/Worst: O(n log n)|O(1)|Build max-heap, repeatedly extract max.|In-place guaranteed O(n log n) sort.|
|**Counting Sort**|Stable ✅, Not in-place ❌, Iterative|O(n + k) (all cases)|O(n + k)|Count occurrences, compute prefix sums, output in order.|Integers in small range.|
|**Bucket Sort**|Stable ✅ (if inner sort stable), Not in-place ❌|Avg: O(n) Worst: O(n²)|O(n)|Divide into buckets, sort each, concatenate.|Uniformly distributed input.|
|**Linear Search**|Iterative, works on unsorted data|Best: O(1) Avg/Worst: O(n)|O(1)|Scan elements one by one.|Very small or unsorted datasets.|
|**Binary Search**|Iterative or Recursive, requires sorted input|Best: O(1) Avg/Worst: O(log n)|O(1)|Halve the search interval each step.|Searching in sorted arrays.|
|**Heaps (priority queue)**|Max-heap: parent ≥ children; array-based|Insert: O(log n) Extract-Max: O(log n) Build: O(n)|O(1) extra|Tree structure maintained via heapify.|Priority queues, scheduling, heap sort.|
|**Hash Tables**|Avg O(1), Worst O(n), Not ordered|Insert/Search/Delete: Avg O(1), Worst O(n)|O(m) buckets|Hash function maps keys → buckets; collisions via chaining or probing.|Fast lookups, dictionaries, symbol tables.|
|**Stack**|LIFO, In-place|Push/Pop: O(1)|O(1) extra|Use array or linked list, top pointer tracks end.|Undo, recursion simulation.|
|**Queue**|FIFO, In-place (circular array)|Enqueue/Dequeue: O(1)|O(1) extra|Head/tail indices wrap with modulo.|Scheduling, BFS traversal.|

---

# Memory Hooks

- **Stable sorts:** Insertion, Merge, Counting, Bucket (if inside sort stable).
    
- **Always O(n log n):** Merge, Heap.
    
- **Fast average, bad worst:** Quick.
    
- **Quadratic worst-case:** Insertion, Selection, Bubble, Quick (bad pivot).
    
- **Non-comparison:** Counting, Bucket.
    
- **Search:** Linear (unsorted), Binary (sorted).
    
- **DS:** Heap = priority queue; Hash = O(1) average dictionary; Stack/Queue = O(1) ops.
    

---

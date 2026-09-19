
# 🔹 What is a Heap?

- A **heap** is a special kind of **binary tree** stored efficiently in an array.
    
- Two main properties:
    
    1. **Heap property** (ordering):
        
        - In a **max-heap**: every parent ≥ its children.
            
        - In a **min-heap**: every parent ≤ its children.
            
        - 👉 The root is always the largest (max-heap) or smallest (min-heap).
            
    2. **Shape property**: The tree is **complete** → filled level by level, left to right, no gaps.
        

---

# 🔹 Array Implementation

We don’t store pointers — just put the heap in a 1-indexed array.  
If a node is at index `i`:

- **Left child:** `2i`
    
- **Right child:** `2i+1`
    
- **Parent:** `floor(i/2)`
    

👉 This works because of the complete tree structure (no wasted slots).

Example (max-heap):

```
       16 (A[1])
      /   \
   14       10
  /  \     /  \
  8   7   9    3
 / \
 2   4
```

Array representation:  
`A = [16, 14, 10, 8, 7, 9, 3, 2, 4]`

---

# 🔹 Core Operations

## 1. **MAX-HEAPIFY(A, i)**

- **Goal:** Fix one local violation of heap property at index `i`.
    
- **Process:** Compare A[i] with children → if smaller than child, swap with larger child → recurse down.
    
- **Cost:** O(height) = O(log n).
    

👉 Example:  
Heap `[1, 14, 10, 8, 7, 9, 3, 2, 4]` violates heap at root (1).  
After heapify → `[14, 8, 10, 4, 7, 9, 3, 2, 1]`.

---

## 2. **BUILD-MAX-HEAP(A)**

- **Goal:** Turn an arbitrary array into a heap.
    
- **Process:** Call `MAX-HEAPIFY` bottom-up for all non-leaf nodes:
    
    ```text
    for i = floor(n/2) downto 1:
        MAX-HEAPIFY(A, i)
    ```
    
- **Why O(n) not O(n log n)?**
    
    - Half the nodes are leaves → O(1) work each.
        
    - A quarter of nodes have height 1 → O(1) work each.
        
    - Work decreases geometrically by level.
        
    - Summation = O(n).
        

👉 Intuition: most nodes are near the bottom, so they require very little work.

---

## 3. **HEAP-SORT(A)**

- Steps:
    
    1. Build max-heap (O(n)).
        
    2. Repeat: swap root with last element, reduce heap size by 1, call `MAX-HEAPIFY` on root.
        
- Total runtime: O(n log n).
    
- **Properties:** In-place, not stable.
    

---

## 4. **Priority Queue Operations** (using heap)

- **Insert(A, key):** Add new element, bubble up if needed. O(log n).
    
- **Maximum(A):** Return root A[1]. O(1).
    
- **Extract-Max(A):** Remove root, move last element to root, heapify down. O(log n).
    
- **Increase-Key(A, i, newKey):** Increase a key, bubble it up to restore order. O(log n).
    

---

# 🔹 Summary of Costs

|Operation|Time Complexity|
|---|---|
|MAX-HEAPIFY|O(log n)|
|BUILD-MAX-HEAP|O(n)|
|HEAP-SORT|O(n log n)|
|Insert|O(log n)|
|Extract-Max|O(log n)|
|Maximum|O(1)|
|Increase-Key|O(log n)|

---

# 🔹 Memory Hook

- **Heap property = order.**
    
- **Complete tree = shape.**
    
- **Array formulas:** Left = 2i, Right = 2i+1, Parent = ⌊i/2⌋.
    
- **Max-heapify:** Fixes **one** violation.
    
- **Build-heap:** Fixes **all** violations bottom-up.
    
- **Heap sort:** Heapify + extract repeatedly.
    
- **PQ ops:** Think “bubble up” (insert/increase) or “bubble down” (extract).
    

---

👉 Do you want me to also **draw recursion trees / summations** to prove why `BUILD-MAX-HEAP = O(n)` (common exam question), or keep it at the intuitive explanation?
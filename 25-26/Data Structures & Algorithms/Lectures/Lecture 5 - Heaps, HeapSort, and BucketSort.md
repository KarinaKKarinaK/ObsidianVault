
---

## Lecture Goals

- Learn the **heap data structure** and properties.
    
- Understand **HeapSort** algorithm (in-place, O(n log n)).
    
- Study **BucketSort** (linear time under distributional assumptions).
    

---

## 5.1 Heaps

### Definition

A **heap** is a nearly complete binary tree stored in an array, satisfying the **heap property**:

- **Max-heap:** each parent ≥ its children.
    
- **Min-heap:** each parent ≤ its children.
    

### Representation

- A heap with n elements uses array A[1..n].
    
- For node at index i:
    
    - Parent(i) = ⌊i/2⌋
        
    - Left(i) = 2i
        
    - Right(i) = 2i + 1
        

**Complete tree property:** all levels filled except possibly last, which is filled left-to-right.

---

## 5.2 Heap Operations

### MAX-HEAPIFY(A, i)

- Ensures subtree rooted at i obeys max-heap property.
    
- If A[i] < one of its children, swap with larger child and recurse.
    

**Pseudocode:**

```python
def MaxHeapify(A, i, heap_size):
    l = 2*i
    r = 2*i + 1
    if l <= heap_size and A[l] > A[i]:
        largest = l
    else:
        largest = i
    if r <= heap_size and A[r] > A[largest]:
        largest = r
    if largest != i:
        A[i], A[largest] = A[largest], A[i]
        MaxHeapify(A, largest, heap_size)
```

- Runs in O(log n) (tree height).
    

### BUILD-MAX-HEAP(A)

- Turn arbitrary array into a max-heap.
    
- Apply MaxHeapify bottom-up.
    
- Runs in O(n).
    

### HEAP-MAXIMUM(A)

- Return A[1] (root).
    
- O(1).
    

### HEAP-EXTRACT-MAX(A)

- Remove and return max element.
    
- Replace root with last element, reduce heap size, call MaxHeapify.
    
- O(log n).
    

### HEAP-INCREASE-KEY(A, i, key)

- Increase value at index i, bubble up as needed.
    
- O(log n).
    

### MAX-HEAP-INSERT(A, key)

- Insert new key at end, bubble up.
    
- O(log n).
    

---

## 5.3 HeapSort

### Idea

- Build a max-heap from input.
    
- Repeatedly extract max and place at end of array.
    
- Shrink heap size.
    

**Pseudocode:**

```python
def HeapSort(A):
    BuildMaxHeap(A)
    heap_size = len(A)
    for i in range(len(A), 2, -1):
        A[1], A[i] = A[i], A[1]
        heap_size -= 1
        MaxHeapify(A, 1, heap_size)
```

### Example

Input [16,14,10,8,7,9,3,2,4,1]:

- BuildMaxHeap → valid heap.
    
- Extract max repeatedly → sorted ascending.
    

### Complexity

- BuildMaxHeap = O(n).
    
- Each Extract-Max = O(log n), repeated n times.
    
- Total = O(n log n).
    
- In-place (only O(1) auxiliary memory).
    

### Comparison

- MergeSort = Θ(n log n), needs O(n) extra space.
    
- HeapSort = Θ(n log n), in-place.
    
- QuickSort = Θ(n log n) expected, O(n²) worst-case, usually fastest in practice.
    

---

## 5.4 BucketSort

### Assumptions

- Input uniformly distributed over [0,1).
    
- n inputs.
    

### Idea

- Divide [0,1) interval into n equal buckets.
    
- Scatter numbers into buckets.
    
- Sort each bucket individually (Insertion Sort).
    
- Concatenate buckets.
    

### Pseudocode

```python
def BucketSort(A):
    n = len(A)
    B = [[] for _ in range(n)]
    for x in A:
        index = int(n * x)  # bucket index
        B[index].append(x)
    for i in range(n):
        InsertionSort(B[i])
    return [x for bucket in B for x in bucket]
```

### Example

Input = [.78,.17,.39,.72,.94,.21,.12,.23,.68]

- Place into buckets.
    
- Sort each bucket.
    
- Concatenate → sorted.
    

### Correctness

- If two elements go into same bucket, insertion sort orders them.
    
- If into different buckets, concatenation ensures order.
    

### Runtime

- Expected O(n) (if distribution is uniform).
    
- Worst-case O(n²) (if all fall in one bucket).
    

---

## 🔑 Lecture V Upshot

- **Heaps**: complete binary trees, O(log n) operations.
    
- **HeapSort**: in-place, O(n log n), optimal comparison-based.
    
- **BucketSort**: linear time if assumptions hold, relies on distribution.
    
- Sorting landscape:
    
    - Comparison sorts: Ω(n log n) lower bound.
        
    - Distribution-based: can beat n log n under assumptions.
        

---

## 🎓 Exam / Interview Tips

- Be able to code MaxHeapify and HeapSort.
    
- Know difference: max-heap vs min-heap.
    
- Explain why BuildMaxHeap = O(n) (not O(n log n)).
    
- For BucketSort: explain assumptions (uniform distribution).
    
- Compare HeapSort, MergeSort, QuickSort (space, time, stability).
    

---

## 🧠 Common Pitfalls

- Forgetting to reduce heap size after extracting max.
    
- Off-by-one indexing in parent/child calculations.
    
- Assuming BucketSort always O(n) (distribution assumption matters).
    
- Confusing HeapSort with Priority Queue operations.
    

---
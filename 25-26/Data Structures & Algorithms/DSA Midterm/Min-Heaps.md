
# Min-Heap Pseudocode

## Array indexing

```text
PARENT(i)      return ⌊i/2⌋
LEFT(i)        return 2i
RIGHT(i)       return 2i + 1
```

Heap stored in array `A[1..n]` (1-indexed).

---

## 1. MIN-HEAPIFY

- Restores the min-heap property at node `i` (children already heaps).
    
- Time: O(log n).
    

```text
MIN-HEAPIFY(A, i):
   l = LEFT(i)
   r = RIGHT(i)
   if l ≤ heap-size[A] and A[l] < A[i]:
       smallest = l
   else:
       smallest = i
   if r ≤ heap-size[A] and A[r] < A[smallest]:
       smallest = r
   if smallest ≠ i:
       swap A[i] with A[smallest]
       MIN-HEAPIFY(A, smallest)
```

---

## 2. BUILD-MIN-HEAP

- Turns arbitrary array into min-heap.
    
- Time: O(n).
    

```text
BUILD-MIN-HEAP(A):
   heap-size[A] = length[A]
   for i = ⌊length[A]/2⌋ downto 1:
       MIN-HEAPIFY(A, i)
```

---

## 3. HEAP-MINIMUM

- Returns smallest element (root).
    
- Time: O(1).
    

```text
HEAP-MINIMUM(A):
   return A[1]
```

---

## 4. HEAP-EXTRACT-MIN

- Removes and returns the min element.
    
- Time: O(log n).
    

```text
HEAP-EXTRACT-MIN(A):
   if heap-size[A] < 1:
       error "heap underflow"
   min = A[1]
   A[1] = A[heap-size[A]]
   heap-size[A] = heap-size[A] - 1
   MIN-HEAPIFY(A, 1)
   return min
```

---

## 5. HEAP-DECREASE-KEY

- Decreases the key at index `i` to value `key` (must be ≤ current).
    
- Time: O(log n).
    

```text
HEAP-DECREASE-KEY(A, i, key):
   if key > A[i]:
       error "new key is larger than current key"
   A[i] = key
   while i > 1 and A[PARENT(i)] > A[i]:
       swap A[i] with A[PARENT(i)]
       i = PARENT(i)
```

---

## 6. MIN-HEAP-INSERT

- Inserts new key.
    
- Time: O(log n).
    

```text
MIN-HEAP-INSERT(A, key):
   heap-size[A] = heap-size[A] + 1
   A[heap-size[A]] = +∞
   HEAP-DECREASE-KEY(A, heap-size[A], key)
```

---

# ✅ Summary

- **Core operations:** MIN-HEAPIFY, BUILD-MIN-HEAP.
    
- **Priority queue ops:** HEAP-MINIMUM, HEAP-EXTRACT-MIN, HEAP-DECREASE-KEY, MIN-HEAP-INSERT.
    
- **Runtimes:**
    
    - Heapify O(log n), Build O(n), Extract/Insert O(log n), Minimum O(1).
        

Algorithm overviews: [[DSA - Main Notes]] 

---
# Insertion Sort

```text
procedure INSERTION-SORT(A[1..n]):
    for i = 2 to n:
        key = A[i]
        j = i - 1
        while j >= 1 and A[j] > key:
            A[j+1] = A[j]
            j = j - 1
        A[j+1] = key
```

---

# Bucket Sort

```text
procedure BUCKET-SORT(A[1..n]):
    create B[0..n-1] as lists
    for i = 1 to n:
        b = floor(n * A[i])
        append A[i] to B[b]
    for b = 0 to n-1:
        INSERTION-SORT(B[b])
    return CONCATENATE(B[0], ..., B[n-1])
```

---

# Merge Sort

```text
procedure MERGE-SORT(A[1..n]):
    if n <= 1: return A
    m = floor(n/2)
    L = MERGE-SORT(A[1..m])
    R = MERGE-SORT(A[m+1..n])
    return MERGE(L, R)

procedure MERGE(L, R):
    i = 1; j = 1; C = empty list
    while i <= |L| and j <= |R|:
        if L[i] <= R[j]:
            append L[i] to C; i = i + 1
        else:
            append R[j] to C; j = j + 1
    append remaining elements of L to C
    append remaining elements of R to C
    return C
```

---

# Counting Sort

```text
procedure COUNTING-SORT(A[1..n], k):
    let C[0..k] = 0
    for i = 1 to n:
        C[A[i]] = C[A[i]] + 1
    for v = 1 to k:
        C[v] = C[v] + C[v-1]
    let B[1..n]
    for i = n downto 1:
        v = A[i]
        B[C[v]] = v
        C[v] = C[v] - 1
    return B
```

---

# Selection Sort

```text
procedure SELECTION-SORT(A[1..n]):
    for i = 1 to n-1:
        minIdx = i
        for j = i+1 to n:
            if A[j] < A[minIdx]: minIdx = j
        swap A[i], A[minIdx]
```

---

# Quick Sort

```text
procedure QUICK-SORT(A[p..r]):
    if p < r:
        q = PARTITION(A, p, r)
        QUICK-SORT(A, p, q-1)
        QUICK-SORT(A, q+1, r)

procedure PARTITION(A, p, r):
    x = A[r]       // pivot
    i = p - 1
    for j = p to r-1:
        if A[j] <= x:
            i = i + 1
            swap A[i], A[j]
    swap A[i+1], A[r]
    return i + 1
```

---

# Heap Sort

```text
function LEFT(i):  return 2*i
function RIGHT(i): return 2*i + 1
function PARENT(i):return floor(i/2)

procedure MAX-HEAPIFY(A, i, heapSize):
    l = LEFT(i); r = RIGHT(i)
    largest = i
    if l <= heapSize and A[l] > A[largest]: largest = l
    if r <= heapSize and A[r] > A[largest]: largest = r
    if largest != i:
        swap A[i], A[largest]
        MAX-HEAPIFY(A, largest, heapSize)

procedure BUILD-MAX-HEAP(A[1..n]):
    for i = floor(n/2) downto 1:
        MAX-HEAPIFY(A, i, n)

procedure HEAP-SORT(A[1..n]):
    BUILD-MAX-HEAP(A)
    heapSize = n
    for i = n downto 2:
        swap A[1], A[i]
        heapSize = heapSize - 1
        MAX-HEAPIFY(A, 1, heapSize)
```

---

# Bubble Sort

```text
procedure BUBBLE-SORT(A[1..n]):
    for i = 1 to n-1:
        swapped = false
        for j = 1 to n - i:
            if A[j] > A[j+1]:
                swap A[j], A[j+1]
                swapped = true
        if swapped = false: break
```

---

# Hash Tables (chaining)

```text
function H(k): return hash(k) mod m

procedure HT-INSERT(T, k, v):
    b = H(k)
    for each (key, val) in T[b]:
        if key = k: val = v; return
    prepend (k, v) to T[b]

function HT-SEARCH(T, k):
    b = H(k)
    for each (key, val) in T[b]:
        if key = k: return val
    return NOT_FOUND
```

---

# Heaps (priority queue ops)

```text
procedure HEAP-MAXIMUM(A): return A[1]

procedure HEAP-EXTRACT-MAX(A, heapSize):
    if heapSize < 1: error "underflow"
    max = A[1]
    A[1] = A[heapSize]
    heapSize = heapSize - 1
    MAX-HEAPIFY(A, 1, heapSize)
    return max

procedure HEAP-INCREASE-KEY(A, i, key):
    if key < A[i]: error "new key smaller"
    A[i] = key
    while i > 1 and A[PARENT(i)] < A[i]:
        swap A[i], A[PARENT(i)]
        i = PARENT(i)

procedure MAX-HEAP-INSERT(A, key, heapSize):
    heapSize = heapSize + 1
    A[heapSize] = -∞
    HEAP-INCREASE-KEY(A, heapSize, key)
```

---

Would you like me to make a **single-page cheat sheet** that puts all of these side by side (shorter pseudocode, runtimes, and key notes), so you can print and revise more easily?
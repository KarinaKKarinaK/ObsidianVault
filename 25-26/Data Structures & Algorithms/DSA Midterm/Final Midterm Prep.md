# In 1 Page: What to “know cold”

- **Heaps (max-heap):** complete binary tree in array; Left=2i, Right=2i+1, Parent=⌊i/2⌋. `MAX-HEAPIFY` O(log n), `BUILD-MAX-HEAP` O(n), `HEAP-SORT` O(n log n).
    
- **Partition (Lomuto):** pivot = A[r]; invariant: `A[p..i] ≤ x`, `A[i+1..j-1] > x`, `A[j..r-1] unknown`, `A[r]=pivot`.
    
- **Loop invariants** (state + IMT structure):
    
    - Insertion sort: before i-th iter, `A[1..i-1]` sorted.
        
    - Linear search: before i-th iter, `x ∉ A[1..i-1]`.
        
    - Merge’s first while: `A[p..k-1]` are the i+j smallest from L[0..i-1]∪R[0..j-1], sorted.
        
- **Hash tables:** h(k)=k mod m (example). Chaining vs open addressing (linear/quadratic/double hashing). Load factor α=n/m. Avg O(1), worst O(n). Deletion with tombstone for open addressing.
    
- **Queues/Stacks:**
    
    - Stack: push/pop O(1).
        
    - Queue (circular array): empty if `head==tail`; full if `(tail+1) mod N == head`.
        
    - With sentinel (linked list) ops are uniform O(1).
        
- **Time bounds:**
    
    - Insertion: best O(n), worst/avg O(n²), stable, in-place.
        
    - Selection: Θ(n²) all cases, few swaps, not stable.
        
    - Bubble: best O(n) with early exit, worst/avg O(n²), stable.
        
    - Merge: Θ(n log n) all, stable, not in-place (Θ(n) extra).
        
    - Quick: best/avg O(n log n), worst O(n²); **all equal keys ⇒ Θ(n²)** with Lomuto; in-place, not stable.
        
    - Heap: Θ(n log n) all, in-place, not stable.
        
    - Counting: Θ(n+k), stable; Bucket: avg Θ(n) (uniform), worst Θ(n²); Radix (LSD) needs stable inner sort.
        
    - Linear search: O(n). Binary search: O(log n) on sorted array.
        
- **Recurrences:**
    
    - Merge/Quick(best): T(n)=2T(n/2)+Θ(n) ⇒ Θ(n log n).
        
    - Quick(worst): T(n)=T(n−1)+Θ(n) ⇒ Θ(n²).
        
    - BuildHeap: Σ (nodes at height h)·O(h) = n·Σ h/2^h = O(n).
        

---

# Sorting algorithms — key facts + mini pseudocode

**Insertion Sort (stable, in-place)**  
Idea: insert A[i] into `A[1..i-1]` (sorted).

```text
for i = 2..n:
  key = A[i]; j = i-1
  while j>=1 and A[j] > key:
    A[j+1] = A[j]; j = j-1
  A[j+1] = key
```

Invariant: before iter i, `A[1..i-1]` sorted.

**Selection Sort (few writes)**  
Find min in suffix, swap with A[i].

```text
for i = 1..n-1:
  minIdx = i
  for j = i+1..n: if A[j] < A[minIdx]: minIdx = j
  swap A[i], A[minIdx]
```

**Bubble Sort (stable; early-exit)**

```text
for i = 1..n-1:
  swapped = false
  for j = 1..n-i:
    if A[j] > A[j+1]: swap; swapped = true
  if not swapped: break
```

**Merge Sort (stable; Θ(n) extra space)**

```text
MERGE-SORT(A):
  if |A|<=1: return
  split A into L,R
  MERGE-SORT(L); MERGE-SORT(R)
  A = MERGE(L,R)

MERGE(L,R):
  i=j=0; C=[]
  while i<|L| and j<|R|:
    if L[i] <= R[j]: push L[i]; i++
    else:            push R[j]; j++
  append remaining; return C
```

Merge’s while-loop invariant (know it!).

**Quick Sort (in-place)**

```text
QUICK-SORT(A,p,r):
  if p<r:
    q = PARTITION(A,p,r)
    QUICK-SORT(A,p,q-1)
    QUICK-SORT(A,q+1,r)

PARTITION(A,p,r): // Lomuto
  x = A[r]; i = p-1
  for j = p..r-1:
    if A[j] <= x: i++; swap A[i],A[j]
  swap A[i+1],A[r]; return i+1
```

Partition invariant (state it).

**Heap Sort (in-place)**

```text
LEFT(i)=2i; RIGHT(i)=2i+1; PARENT(i)=⌊i/2⌋

MAX-HEAPIFY(A,i,heapSize):
  l=LEFT(i); r=RIGHT(i); largest=i
  if l<=heapSize and A[l]>A[largest]: largest=l
  if r<=heapSize and A[r]>A[largest]: largest=r
  if largest!=i: swap A[i],A[largest]; MAX-HEAPIFY(A,largest,heapSize)

BUILD-MAX-HEAP(A):
  for i = ⌊n/2⌋ downto 1: MAX-HEAPIFY(A,i,n)

HEAP-SORT(A):
  BUILD-MAX-HEAP(A); heapSize=n
  for i = n downto 2:
    swap A[1],A[i]; heapSize--; MAX-HEAPIFY(A,1,heapSize)
```

**Why O(n) build?** Sum over heights: `n·Σ h/2^h = O(n)`.

**Counting Sort (stable; keys ∈ [0..k])**

```text
COUNTING-SORT(A, k):
  C[0..k]=0
  for v in A: C[v]++
  for v=1..k: C[v]+=C[v-1]  // prefix sums
  B[1..n]
  for i=n..1: v=A[i]; B[C[v]] = v; C[v]--
  return B
```

**Bucket Sort (avg Θ(n) for uniform [0,1))**

```text
BUCKET-SORT(A):
  make n empty lists B[0..n-1]
  for x in A: b = ⌊n*x⌋; push x into B[b]
  for b=0..n-1: insertion-sort B[b]
  return concatenation of B[0],...,B[n-1]
```

Note: worst Θ(n²) if many fall in one bucket.

**Radix Sort (LSD, base b)**  
Sort digits from least significant to most using a **stable** inner sort (e.g., counting sort). Inner sort must be stable—know why.

---

# Heaps & Priority Queues

**Properties**

- **Heap property:** max-heap parent ≥ children.
    
- **Shape:** complete binary tree.
    
- **Array layout:** 1-indexing with Left/Right/Parent formulas.
    

**PQ operations (max-heap)**

```text
HEAP-MAXIMUM(A) = A[1]  // O(1)

HEAP-EXTRACT-MAX(A,heapSize):
  if heapSize<1: error
  max = A[1]; A[1]=A[heapSize]; heapSize--
  MAX-HEAPIFY(A,1,heapSize); return max  // O(log n)

HEAP-INCREASE-KEY(A,i,key):
  if key < A[i]: error
  A[i]=key
  while i>1 and A[PARENT(i)] < A[i]:
    swap A[i],A[PARENT(i)]; i=PARENT(i)  // O(log n)

MAX-HEAP-INSERT(A,key,heapSize):
  heapSize++; A[heapSize] = -∞
  HEAP-INCREASE-KEY(A,heapSize,key)      // O(log n)
```

**BuildMaxHeap O(n) proof sketch**  
At height h there are ≤ n/2^{h+1} nodes; each costs O(h):  
`Σ (n/2^{h+1})·h = n·Σ h/2^h = O(n)`.

---

# Hash Tables

**Hashing basics**

- Table size m, keys n, **load factor** α = n/m.
    
- Good choice: division method h(k)=k mod m (prefer m prime) or multiplication; double hashing for open addressing.
    

**Collision handling**

- **Chaining:** each slot is a list (or dynamic array).
    
    - Insert at head; search scans list.
        
    - Expected cost ≈ O(1+α). Worst O(n).
        
- **Open addressing:** keep everything in table; probe.
    
    - **Linear probing:** `(h(k)+i) mod m` — primary clustering.
        
    - **Quadratic probing:** `h(k)+c1 i + c2 i^2`.
        
    - **Double hashing:** `h1(k)+i·h2(k)` — best distribution.
        
    - **Delete:** mark as **DELETED (tombstone)**, not NIL.
        

**Worst-case inevitability (pigeonhole):** for large enough universe, ∃ n keys that hash to same slot ⇒ chaining worst-case search Θ(n).

**Trace checklist (exam):**

1. compute h(k) for each key,
    
2. build chains or show probe sequence,
    
3. show final table,
    
4. state α.
    

---

# Queues, Stacks, Linked Lists & Sentinels

**Stack (array)**

```text
push(S,x): if top==N: overflow; S[top]=x; top++
pop(S): if top==0: underflow; top--; return S[top]
```

**Queue (circular array, size N)**

```text
empty if head==tail
full  if (tail+1) mod N == head

ENQUEUE(Q,x): if full: overflow; A[tail]=x; tail=(tail+1) mod N
DEQUEUE(Q): if empty: underflow; x=A[head]; head=(head+1) mod N; return x
```

**Linked list with sentinel (`L.nil`)**

- Head = `L.nil.next`, Tail = `L.nil.prev`.
    
- **Delete x:**
    

```text
x.prev.next = x.next
x.next.prev = x.prev   // Θ(1)
```

- **Insert after node y:**
    

```text
x.next = y.next; x.prev = y
y.next.prev = x; y.next = x
```

Sentinel makes empty/head/tail cases uniform.

---

# Searching + Loop Invariants

**Linear search**

```text
for i=1..n: if A[i]==x: return i; return NIL
```

Invariant: before iter i, `x ∉ A[1..i-1]`.

**Binary search (iterative)**

```text
low=1; high=n
while low<=high:
  mid=floor((low+high)/2)
  if A[mid]==x: return mid
  else if A[mid] < x: low=mid+1
  else: high=mid-1
return NIL
```

Invariant: if `x` in A, it lies in `A[low..high]`.

**Partition invariant** (repeat):  
Before each loop iter: `A[p..i] ≤ x`, `A[i+1..j-1] > x`, `A[j..r-1] unknown`, `A[r]=x`.

**Merge while invariant** (repeat):  
`A[p..k-1]` holds the i+j smallest from prefixes, sorted.

**SumArray invariant:** before iter i, `sum = Σ_{t=1}^{i-1} A[t]`.

_Always prove: Initialization → Maintenance → Termination._

---

# Asymptotic analysis you might need to do fast

- **Summations:**
    
    - Σ_{i=1}^n i = n(n+1)/2 = Θ(n²)
        
    - Σ_{i=1}^n log i = Θ(n log n)
        
- **Master-like patterns:**
    
    - `T(n)=aT(n/b)+cn` with a=b=2 ⇒ Θ(n log n)
        
    - `T(n)=T(n-1)+cn` ⇒ Θ(n²)
        
- **Exact crossover example:**  
    If asked to find n₀ s.t. `n³+147n ≥ 21n²+343` ⇒ `(n−7)³ ≥ 0` ⇒ n₀=7.
    

---

# Typical exam tasks & how to answer

1. **Write/trace an algorithm**
    
    - Give clean pseudocode (from these skeletons).
        
    - If trace: show each pass/heap level/probe step clearly.
        
2. **Prove correctness with invariants**
    
    - State invariant precisely.
        
    - Do **Initialization, Maintenance, Termination** one after another.
        
3. **Time complexity**
    
    - Show dominant loop counts or recurrence and solve quickly.
        
    - For merge/partition: argue Θ(n) because each element is moved/compared O(1).
        
4. **Heaps**
    
    - If asked worst-case heapify/build: give example arrays and reason via height.
        
    - For BuildMaxHeap=O(n): write the `n·Σ h/2^h` one-liner.
        
5. **Hash table exercise**
    
    - Compute `k mod m`, build chains or probe.
        
    - Mention α and expected cost.
        
    - Deletion in open addressing uses tombstones.
        
6. **Queues/Stacks with sentinel**
    
    - Show constant-time pointer splices; no edge cases.
        

---

# Mini practice list (do from memory)

- Insertion, Merge (+Merge), Quick (+Partition), HeapSort (+heapify/build), Selection, Bubble.
    
- Counting, Bucket, (Radix explanation + stability).
    
- Linear & Binary search (both forms).
    
- Stack ops, Queue circular ops (with full/empty tests).
    
- Chaining insert/search/delete; Linear probing insert/search/delete (with DELETED).
    
- Loop invariants for Insertion, Linear, Partition, Merge-while.
    
- BuildMaxHeap O(n) summation.
    

---

# Pitfalls to avoid

- Forgetting **stability** (Insertion/Merge/Counting/Bucket stable; Quick/Heap/Selection typically not).
    
- Saying HeapSort is divide-and-conquer (it isn’t in the usual sense).
    
- Off-by-one in Partition (return `i+1`).
    
- Forgetting circular queue **full** condition.
    
- Open addressing **deletes** without tombstone → breaks search.
    
- QuickSort on all-equal data with Lomuto → worst-case Θ(n²).
    
- Merge needs Θ(n) **auxiliary space**.
    

---

# If you blank on code…

- Write **high-level steps** + invariants + key lines (pivot selection, swap, index moves).
    
- State complexity and properties (stable? in-place?).
    
- Partial but correct logic gets points.
    

---

you’re set. if you want, i can turn this into a 1-page printable cheat sheet layout, or drill you with a 5-question mock exam right now.

## 1. 🃏 Insertion Sort (Card-Sorting Analogy)

**Array to sort:**  
`A = [5, 2, 4, 6, 1, 3]`

### Step Trace

1. Start with `[5]` → already sorted (trivial).
    
2. Insert `2`: compare with `5`, shift → `[2, 5]`.
    
3. Insert `4`: compare with `5` → shift, then insert → `[2, 4, 5]`.
    
4. Insert `6`: already bigger than `5`, stays → `[2, 4, 5, 6]`.
    
5. Insert `1`: compare/shift all → `[1, 2, 4, 5, 6]`.
    
6. Insert `3`: shift `4,5,6` → `[1, 2, 3, 4, 5, 6]`.
    

✅ Sorted in **O(n²)** worst case.

**Exam tip**: Mention the **[[Loop Invariant]]**: At the beginning of each iteration `i`, subarray `A[1..i-1]` is sorted.

---

## 2. ⚡ Merge Sort (Divide & Conquer)

**Array to sort:**  
`A = [12, 3, 7, 9, 14, 6, 11, 2]`

### Step Trace

1. Split → `[12,3,7,9]` and `[14,6,11,2]`
    
2. Split again → `[12,3]`, `[7,9]`, `[14,6]`, `[11,2]`
    
3. Split again → `[12] [3]`, `[7] [9]`, `[14] [6]`, `[11] [2]`
    
4. Merge step by step:
    
    - Merge `[12] [3]` → `[3,12]`
        
    - Merge `[7] [9]` → `[7,9]`
        
    - Merge `[14] [6]` → `[6,14]`
        
    - Merge `[11] [2]` → `[2,11]`
        
5. Merge again:
    
    - Merge `[3,12] [7,9]` → `[3,7,9,12]`
        
    - Merge `[6,14] [2,11]` → `[2,6,11,14]`
        
6. Final merge: `[3,7,9,12] [2,6,11,14]` → `[2,3,6,7,9,11,12,14]`
    

✅ Sorted in **Θ(n log n)**.

**Exam tip**: If asked about recurrence: `T(n) = 2T(n/2) + Θ(n)`.

---

## 3. ⚔️ Quicksort (Pivot Partitioning)

**Array to sort:**  
`A = [10, 80, 30, 90, 40, 50, 70]`  
Pivot = last element = `70`.

### Step Trace

Partition step:

- Compare each element with `70`, rearrange:
    
    - `[10, 30, 40, 50]` go left
        
    - `[80, 90]` go right
        
- Result after partition: `[10,30,40,50,70,80,90]`
    

Recursive steps:

- Sort `[10,30,40,50]` (pivot = 50).
    
- Sort `[80,90]`.
    

✅ Sorted array.

- **Best case:** Balanced splits → `Θ(n log n)`.
    
- **Worst case:** Already sorted, pivot always extreme → `Θ(n²)`.
    

**Exam tip**: Draw a **recursion tree** if asked; it shows cost at each level = `n`, depth = `log n`.

---

## 4. 🌲 Heapsort

**Array to sort:**  
`A = [4, 10, 3, 5, 1]`

### Step Trace

1. Build Max Heap: `[10, 5, 3, 4, 1]`
    
2. Swap root with last: `[1, 5, 3, 4, 10]`, heapify → `[5, 4, 3, 1, 10]`
    
3. Swap root with last (of heap): `[1, 4, 3, 5, 10]`, heapify → `[4, 1, 3, 5, 10]`
    
4. Swap root with last: `[3, 1, 4, 5, 10]`, heapify → `[3, 1, 4, 5, 10]`
    
5. Swap root with last: `[1, 3, 4, 5, 10]`
    

✅ Sorted array: `[1,3,4,5,10]`.

**Exam tip**: Worst case is always `Θ(n log n)` (never worse).

---

## 5. 🧮 Counting Sort (Non-Comparison)

**Array to sort:**  
`A = [4, 2, 2, 8, 3, 3, 1]`  
Keys ∈ `[1..8]`.

### Step Trace

1. Count occurrences:
    
    ```
    count = [0,1,2,2,1,0,0,1]  # index = value
    ```
    
2. Compute prefix sums (cumulative counts):
    
    ```
    count = [1,3,5,6,6,6,7] 
    ```
    
3. Place elements into output:
    
    - Scan original array backward for **stability**.
        
    - Final result: `[1,2,2,3,3,4,8]`.
        

✅ Sorted in `Θ(n+k)`.

**Exam tip**: Always say: **Stable sorting** is crucial for radix sort correctness.

---

## 6. 📊 Selection Sort

**Array to sort:**  
`A = [64, 25, 12, 22, 11]`

### Step Trace

1. Find smallest → 11, swap with 64 → `[11,25,12,22,64]`
    
2. Find smallest in rest → 12, swap with 25 → `[11,12,25,22,64]`
    
3. Find smallest in rest → 22, swap with 25 → `[11,12,22,25,64]`
    
4. Continue…
    

✅ Sorted in `Θ(n²)` always.

**Exam tip**: **Loop invariant**: After `i` iterations, first `i` elements are sorted.

---

# Midterm Exam Checklist (Sorting Focus)

- ✅ Be ready to **state best/worst case complexities** (Insertion Θ(n²), Merge Θ(n log n), etc.).
    
- ✅ **Dry run at least 1 array per algorithm** (like above).
    
- ✅ Know **loop invariants** for insertion/selection.
    
- ✅ If asked about **recurrence**, just write it, don’t always solve (`T(n) = 2T(n/2)+Θ(n)`).
    
- ✅ For heaps: draw tree diagrams → easier points.
    
- ✅ For quicksort: mention **pivot choice** influences complexity.
    
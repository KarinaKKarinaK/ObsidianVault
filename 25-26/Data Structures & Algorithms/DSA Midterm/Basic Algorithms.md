# Search Algorithms

### Linear Search

- Scan elements one by one until found.
    
- **Best case**: first element → `O(1)`.
    
- **Worst case**: not found → `O(n)`.
    
#### Loop Invariant
At step `i`, element `x` has not been found in `A[1..i-1]`.

---
## Sorting Algorithms

### Insertion Sort

- Works like sorting a **hand of cards**.
    
- Key idea: Maintain a **sorted subarray** `A[1..i-1]`, insert `A[i]` in correct place.

##### Pseudocode:
``` 
def insertion_sort(A):
    for i in range(1, len(A)):
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key:
            A[j+1] = A[j]
            j -= 1
        A[j+1] = key
```
- **Best case**: already sorted → `O(n)`.
    
- **Worst case**: reverse order → `O(n^2)`.
    
- **Exam Tip**: Always mention **loop invariants** (init, maintenance, termination).

---

### Merge Sort (Divide & Conquer)

- Split → Sort subarrays → Merge back.
    
- Recurrence: `T(n) = 2T(n/2) + Θ(n)`.
    
- Solution: `Θ(n log n)`.
    

##### Pseudocode:
```
def merge_sort(A):
    if len(A) <= 1:
        return A
    mid = len(A)//2
    L = merge_sort(A[:mid])
    R = merge_sort(A[mid:])
    return merge(L, R)

```

**Analogy:** Sorting **papers** by splitting piles, sorting each, then merging.

## Divide & Conquer (Book - Ch. 3)

### Paradigm

1. Divide → Split into subproblems.
    
2. Conquer → Solve recursively.
    
3. Combine → Merge solutions.
    

### Classic Examples

- **MergeSort** :
    
    - Recurrence: `T(n) = 2T(n/2) + Θ(n)` → Θ(n log n).
        
- **Counting Inversions**:
    
    - Brute force = Θ(n²).
        
    - D&C piggybacks on MergeSort → Θ(n log n).
        
- **Strassen’s Matrix Multiplication**:
    
    - Improves over naïve O(n³) → ~O(n^2.81). (Nice-to-know, not core).
        

⚠️ Exam tip: If asked “give recurrence” → just write it, don’t solve unless asked.

## The Master Method (Book - Ch. 4)

A shortcut for solving divide & conquer recurrences:

For recurrences like:  
`T(n) = aT(n/b) + f(n)`

- Compare `f(n)` with `n^(log_b a)`.
    
- Three cases:
    
    1. If `f(n)` is smaller → T(n) = Θ(n^(log_b a)).
        
    2. If equal → T(n) = Θ(n^(log_b a) log n).
        
    3. If bigger → T(n) = Θ(f(n)).
        

👉 Example: MergeSort → `T(n) = 2T(n/2) + Θ(n)` → case 2 → Θ(n log n).

⚠️ Exam tip: Write **which case applies**.

---
### Quicksort

- Choose pivot, partition into `< pivot`, `>= pivot`, then recurse.
    
- **Best case** (balanced partitions): `Θ(n log n)`.
    
- **Worst case** (already sorted, bad pivot choice): `Θ(n^2)`.
    

**Exam Tip:**

- Worst case occurs when pivot = min or max.
    
- Best case occurs when pivot splits evenly.

#### More On Quicksort (Book -Ch. 5)

- **Partition step**: Rearrange elements around pivot.
    
- **Best case**: Balanced partitions → Θ(n log n).
    
- **Worst case**: Pivot = smallest/largest every time → Θ(n²).
    
- **Randomized Quicksort**:
    
    - Picks pivot randomly.
        
    - Expected time complexity: Θ(n log n).
        

⚠️ Exam tip: If asked “when does worst case occur?” → say: _when pivot is min/max → unbalanced partition_

---
### Heapsort

- Build max heap → repeatedly extract max.
    
- Always `Θ(n log n)`.
    
- Uses heap property: parent ≥ children.

---
### Counting Sort

- Non-comparison sort. Works when keys ∈ `[0..k]`.
    
- Complexity: `Θ(n + k)`.
    
Stable sort – order of equal keys preserved (important for radix sort correctness).


---
## Non-Comparison Sorts (Book - Ch. 5.6)

These **beat n log n** under assumptions :

- **Counting Sort** – works if keys ∈ [0..k], runs in Θ(n + k), stable.
    
- **Bucket Sort** – uniform distribution [0,1), avg Θ(n).
    
- **Radix Sort** – sorts digits using Counting Sort, good for large integers.
    

⚠️ Exam tip: Mention **stability** when relevant → Radix Sort fails if subroutine is not stable


## Randomized Algorithms (Ch. 5)

- Randomness avoids bad worst cases.
    
- Quicksort example: pivot chosen randomly → avg = Θ(n log n).
    
- Uses **probability analysis** (expectation, linearity).
    

⚠️ Exam tip: You don’t need deep probability, just know why random pivot = balanced splits on average.


## Selection Algorithms (Ch. 6)

Goal: find the k-th smallest element.

- **Randomized Selection (RSelect)**:
    
    - Partition like Quicksort.
        
    - Expected Θ(n).
        
- **Deterministic Selection (DSelect, Median of Medians)**:
    
    - Guarantees Θ(n) worst case.
---
## Time Complexity
*!Memorise for the exam*!

**Quizlet Flashcards for memorisation:**
[Big-O Algorithms Time Complexity](https://quizlet.com/81400870/big-o-algorithms-time-complexity-flash-cards/)

## Asymptotic Notation (Ch. 2)

- **Big-O (`O`)**: Upper bound – algorithm never worse than this (like ≤).
    
- **Big-Ω (`Ω`)**: Lower bound – algorithm never better than this (like ≥).
    
- **Big-Θ (`Θ`)**: Tight bound – algorithm always scales like this (like =).
    

##### Analogy:

- O = “at most”; Big-O means "less than or equal to (<=)"
    
- Ω = “at least”; Big-Omega means "greater or equal to (>=)"
    
- Θ = “exactly this growth”; Big-Theta means "equal to (=)"
    

**Examples** :

- Insertion Sort worst case = Θ(n²).
    
- Merge Sort = Θ(n log n).
    
- Counting Sort = Θ(n + k).
    

⚠️ Exam tip: If they ask for complexity → use Θ, not just O.

![[Pasted image 20250913145553.png]]


---
# Dictionary

**[[Loop Invariant]]:**
- a condition or property about program variables that is true immediately before and after every iteration of a loop
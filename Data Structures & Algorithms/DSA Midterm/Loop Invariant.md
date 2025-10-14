
# Loop Invariants Cheat Sheet

## 1. Definition

A **loop invariant** is a property that:

- Holds **before** the first iteration (initialization),
    
- Is **maintained** after each iteration,
    
- Helps prove **correctness** at termination.
    

---

## 2. The Three Steps (always write these!)

1. **Initialization**  
    Show the invariant is true **before** the loop begins.
    
2. **Maintenance**  
    Assume it’s true at the start of an iteration. Show it remains true after one execution of the loop body.
    
3. **Termination**  
    When the loop ends, use the invariant (and the reason for termination) to prove the algorithm is correct.
    

---

## 3. Typical Forms of Invariants

- **Searching:**
    
    - Example (linear search): Before iteration i, `x` not in `A[1..i-1]`.
        
- **Sorting:**
    
    - Example (insertion sort): Before iteration i, subarray `A[1..i-1]` is sorted.
        
- **Swapping/Partitioning:**
    
    - Example (quicksort partition): At each step, left side ≤ pivot, right side ≥ pivot.
        

---

## 4. Common Exam Patterns

- **Linear search** → "Already checked elements do not contain x."
    
- **Insertion sort** → "The first i-1 elements are sorted."
    
- **Selection sort** → "The first i-1 elements are the smallest elements, in order."
    
- **Binary search** → "The target, if present, is in the current interval [low, high]."
    
- **Quicksort partition** → "All elements left of the pivot index ≤ pivot; all right ≥ pivot."
    

---

## 5. Skeleton Answer Format

Whenever asked, structure like this:

> **Loop Invariant:** [State the property clearly]
> 
> **Initialization:** Holds because [reason].
> 
> **Maintenance:** If it holds before iteration k, after processing it still holds because [reason].
> 
> **Termination:** When loop ends, invariant + termination condition imply [algorithm correctness].

---

## 6. Key Tips

✅ Always **state the invariant first** (clear, one sentence).  
✅ Then go through init → maintenance → termination in 3 short paragraphs.  
✅ Don’t overcomplicate — keep it **formal but simple**.  
✅ If stuck: think “what is guaranteed to be true _so far_ at each step?”

---Perfect — this is a classic exam question type! Here’s a **cheat sheet of loop invariants** for the main sorting and searching algorithms.

---

# 🔑 Loop Invariants for Sorting & Searching

## 1. **Linear Search**

- **Invariant:** Before iteration `i`, the element `x` is not in `A[1..i-1]`.
    
- **Initialization:** Before the first iteration, no elements checked.
    
- **Maintenance:** At each step, if not found at `i`, then `x` not in `A[1..i]`.
    
- **Termination:** If found, return index; if loop ends, `x` not in array.
    

---

## 2. **Binary Search**

- **Invariant:** If `x` is in `A`, then it is always within the current interval `[low..high]`.
    
- **Initialization:** At start, interval = whole array.
    
- **Maintenance:** Each iteration halves interval, and if `x` exists, it remains inside.
    
- **Termination:** When `low > high`, interval is empty → `x` not found; else return index when match found.
    

---

## 3. **Insertion Sort**

- **Invariant:** At the start of iteration `i`, the subarray `A[1..i-1]` is sorted.
    
- **Initialization:** `A[1]` is trivially sorted.
    
- **Maintenance:** Insert `A[i]` into sorted `A[1..i-1]` → still sorted.
    
- **Termination:** At end (`i = n+1`), whole array `A[1..n]` is sorted.
    

---

## 4. **Selection Sort**

- **Invariant:** At the start of iteration `i`, the subarray `A[1..i-1]` contains the `i-1` smallest elements, in sorted order.
    
- **Initialization:** Before iteration 1, `A[0]` (empty) is trivially sorted.
    
- **Maintenance:** Find min in `A[i..n]`, swap into position `i`. Invariant holds.
    
- **Termination:** At end, all n elements sorted in order.
    

---

## 5. **Bubble Sort**

- **Invariant:** At the start of iteration `i`, the last `i-1` elements are in their final (sorted) position.
    
- **Initialization:** Before first pass, nothing is sorted.
    
- **Maintenance:** Each pass bubbles largest unsorted element to the right.
    
- **Termination:** After `n-1` passes, entire array sorted.
    

---

## 6. **Merge Sort**

- **Invariant:** Each recursive call sorts its subarray correctly.
    
- **Initialization:** Base case (size=1) is trivially sorted.
    
- **Maintenance:** Merge of two sorted halves is sorted.
    
- **Termination:** Full array is sorted after final merge.
    

---

## 7. **Quicksort (Partition step)**

- **Partition Invariant:** At any point in partition procedure:
    
    - `A[low..i]` ≤ pivot,
        
    - `A[i+1..j-1]` > pivot,
        
    - `A[j..high]` unknown.
        
- **Initialization:** Before partition starts, nothing classified.
    
- **Maintenance:** Each step moves one element into ≤ pivot or > pivot set.
    
- **Termination:** All elements partitioned; pivot in correct position.
    

---

# 🎯 Exam Strategy

- Always **state the invariant first** (short, clear sentence).
    
- Then write **Initialization → Maintenance → Termination** (IMT).
    
- Use the **“what is already guaranteed so far”** mindset.
    

---


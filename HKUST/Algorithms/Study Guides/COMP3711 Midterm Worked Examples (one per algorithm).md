# COMP3711 Midterm: one example question and solution per algorithm

Midterm Fri Oct 16 2026, 20:00 to 22:00. Closed book, one A4 cheat sheet, no calculator. Coverage: prerequisites and asymptotics up to sorting in linear time (Tutorials 1 to 5). No greedy, no DP, no graphs, no Huffman.

## 1. What you are expected to know

Algorithms you must be able to run by hand, write in pseudocode, and give the running time of:

| Topic | Algorithms | Time |
|---|---|---|
| Sorting, simple | Insertion sort | n², best n, O(n + I) with I inversions |
| Sorting, D&C | Mergesort, Merge, counting inversions | n log n |
| Sorting, D&C | Quicksort, Partition (last element pivot), randomized quicksort | n² worst, n log n expected |
| Selection | Select with random pivot, median of medians (groups of 5) | O(n) expected, O(n) worst |
| Search | Binary search and its variants (first item ≥ x, rotated array, bitonic array, unknown size) | O(log n) |
| D&C | Max subarray (D&C and Kadane), Karatsuba, Strassen | n log n or n, n^1.585, n^2.81 |
| Heaps | Insert, extract max, sift up, sift down, build-heap, heapsort, heap applications | log n per op, build n, sort n log n |
| Linear sorting | Counting sort, radix sort | n + k, d(n + k) |
| Randomized | Indicator variables, linearity of expectation, geometric trials, coupon collector | |
| Lower bounds | Decision tree argument, n log n for comparison sorting, n − 1 for max | |

Theory you must be able to write: O, Ω, Θ definitions and proofs from the definition; recursion tree total cost formula and the three cases; the master-theorem style case split with α and β.

## 2. Problem types that appear on the paper

1. Compare two running times, answer A, B or U, or true or false with a one-line reason.
2. Prove f = O(g) or f ≠ O(g) from the definition, giving c and n₀.
3. Solve a recurrence, often "from first principles" with the recursion tree, and give α and β in Θ(n^α log^β n).
4. Run an algorithm by hand and fill in a table: radix or counting sort passes, partition steps, heap after each insert, mergesort merges.
5. Design an algorithm with a required running time (O(log n), O(n), O(n log n)) using black boxes like Select, Merge, Partition, binary search, a heap. State input and output, steps, running time with a recurrence or sum.
6. Expected value questions: expected comparisons, expected empty bins, expected tries until success. Use indicators and add.
7. Lower bound or "can it be done faster" questions: decision tree, or say when counting or radix sort applies.
8. Short facts: which sort is stable, in place, best for nearly sorted input, worst case input for quicksort.

## 3. Example question and solution per algorithm

### Asymptotics: compare (A / B / U)

Question. For each pair say which algorithm is faster for large n. (i) T_A = n log n, T_B = n^1.1. (ii) T_A = 2^n, T_B = n!. (iii) T_A = n, T_B = 3^(log₄ n). (iv) T_A = O(n²), T_B = O(n log n).

Solution. (i) A: log n grows slower than any n^ε, so n log n is smaller than n^1.1. (ii) A: n! grows faster than 2^n (from n ≥ 4 each new factor is ≥ 4 > 2). (iii) B: 3^(log₄ n) = n^(log₄ 3) = n^0.79, smaller than n. (iv) U: only upper bounds are given; both could really be Θ(n).

True or false quickies: n² = O(n³) true. 2^(n+1) = O(2^n) true, it is 2·2^n. 2^(2n) = O(2^n) false, 4^n / 2^n = 2^n is unbounded. log₂ n = Θ(log₁₀ n) true, constant factor. If f = O(g) then 2^f = O(2^g): false, take f = 2n, g = n.

### Asymptotics: prove from the definition

Question. Show 3n² + 10n = O(n²) and n² ≠ O(n).

Solution. For n ≥ 1, 10n ≤ 10n², so 3n² + 10n ≤ 13n². Take c = 13, n₀ = 1. For the second: suppose n² ≤ c·n for all n ≥ n₀. Divide by n: n ≤ c for all n ≥ n₀, impossible since n grows without bound.

### Recurrences: from first principles

Question. Solve T(n) = 3T(n/3) + n, T(1) = 1, using the recursion tree.

Solution. Row i has 3^i nodes of size n/3^i, each costing n/3^i, so the row costs 3^i · n/3^i = n. There are L = log₃ n rows and 3^L = n leaves. Total = n (leaves) + n · L = Θ(n log n). α = 1, β = 1.

Question. Solve T(n) = 4T(n/4) + n log₄ n.

Solution. Row i costs 4^i · (n/4^i) log₄(n/4^i) = n(L − i), L = log₄ n. Leaves 4^L = n. Total = n + n(L + (L−1) + … + 1) = n + n·L(L+1)/2 = Θ(n log² n). α = 1, β = 2.

Quick cases (f = n^c log^k n, d = log_b a): 2T(n/2) + n² gives c = 2 > d = 1, so Θ(n²). 4T(n/2) + n gives c = 1 < d = 2, so Θ(n²). T(n/2) + 1 gives Θ(log n). T(n − 1) + n is 1 + 2 + … + n = Θ(n²). T(√n) + 1: set m = log n, S(m) = S(m/2) + 1 = Θ(log m) = Θ(log log n).

### Insertion sort

Question. Sort 5, 2, 4, 6, 1, 3. Show the array after each insertion and count the inversions of the input.

Solution.
- insert 2: 2 5 4 6 1 3
- insert 4: 2 4 5 6 1 3
- insert 6: 2 4 5 6 1 3
- insert 1: 1 2 4 5 6 3
- insert 3: 1 2 3 4 5 6

Inversions (pairs out of order): (5,2) (5,4) (5,1) (5,3) (2,1) (4,1) (4,3) (6,1) (6,3) = 9. Running time O(n + I) = each insertion shifts exactly as many items as the inversions it fixes.

### Merge and mergesort, counting inversions

Question. Merge 1, 4, 7 with 2, 3, 8. Then count the inversions of 2, 4, 1, 3, 5 using mergesort.

Solution. Merge: compare the fronts, copy the smaller. 1 vs 2 → 1. 4 vs 2 → 2. 4 vs 3 → 3. 4 vs 8 → 4. 7 vs 8 → 7. Then 8. Output 1 2 3 4 7 8, five comparisons. Ties take the left item, which is what makes mergesort stable.

Inversions: split into 2, 4 and 1, 3, 5. Each half has 0 inversions. Merge: 1 is copied from the right while 2 and 4 are still waiting on the left, add 2. Then 2. Then 3 is copied from the right while 4 waits, add 1. Then 4, 5. Total 3, which matches (2,1) (4,1) (4,3). Time 2T(n/2) + n = Θ(n log n).

### Partition and quicksort

Question. Run Partition on 3, 8, 2, 5, 1, 4 with the last element as pivot. Then finish quicksort.

Solution. Pivot 4. Wall i starts before the array. Walk j left to right:
- 3 ≤ 4: wall moves to position 1, swap with itself: 3 8 2 5 1 4
- 8 > 4: nothing
- 2 ≤ 4: wall to position 2, swap 8 and 2: 3 2 8 5 1 4
- 5 > 4: nothing
- 1 ≤ 4: wall to position 3, swap 8 and 1: 3 2 1 5 8 4
- end: swap pivot with position 4: 3 2 1 4 8 5

Pivot 4 sits at position 4, its final place. Recurse on 3 2 1 (pivot 1 gives 1 2 3, then 2 3 with pivot 3 stays) and on 8 5 (pivot 5 gives 5 8). Final 1 2 3 4 5 8.

Worst case: already sorted input with last pivot, each partition removes one item, T(n) = T(n − 1) + n = Θ(n²). Random pivot: expected Θ(n log n) because z_i and z_j are compared with probability 2/(j − i + 1).

### Select (k-th smallest)

Question. Find the 3rd smallest of 3, 8, 2, 5, 1, 4 with Select.

Solution. Partition with pivot 4 (above): pivot lands at position 4. k = 3 < 4, so recurse on the left part 3 2 1 with k = 3. Partition with pivot 1: position 1. k = 3 > 1, recurse on the right part 2 3 with k = 3 − 1 = 2. Pivot 3 lands at position 2 = k. Answer 3.

Random pivot: expected O(n), since a pivot in the middle half (probability 1/2) throws away at least a quarter. Median of medians: groups of 5, median of each, median of the medians as pivot, T(n) ≤ T(n/5) + T(7n/10) + O(n) = O(n) worst case. On the exam you may use "Select, Θ(n)" as a black box.

### Binary search and variants

Question. In 2, 5, 8, 12, 16, 23, 38, 56, 72, 91 find 23, then find the first element ≥ 20.

Solution. Find 23: l = 1, r = 10, m = 5 (16 < 23) so l = 6. m = 8 (56 > 23) so r = 7. m = 6, A[6] = 23, found. Three steps.

First element ≥ 20 (lower bound version, r = n + 1): l = 1, r = 11, m = 6 (23 ≥ 20) so r = 6. m = 3 (8 < 20) so l = 4. m = 5 (16 < 20) so l = 6. l = r = 6, answer index 6, value 23.

Design variant. Sorted array of distinct integers, find an index with A[i] = i in O(log n). Idea: A[i] − i never decreases (each step A grows by at least 1 and i by exactly 1), so binary search for the value 0 in A[i] − i. Rotated sorted array, find the max: look at the middle, if A[m] > A[m + 1] that is the max, else go to the side that is "unsorted", O(log n). Bitonic array (up then down), find the peak: same test. Sorted array of unknown length, find x: probe positions 1, 2, 4, 8, … until A[i] ≥ x, then binary search between i/2 and i, O(log k) where k is the position.

### Max subarray

Question. Find the maximum-sum contiguous subarray of −2, 1, −3, 4, −1, 2, 1, −5, 4. Then: stock prices 7, 1, 5, 3, 6, 4, best single buy and sell.

Solution. Kadane: keep cur = max(a, cur + a) and the best so far. cur: −2, 1, −2, 4, 3, 5, 6, 1, 5. Best 6, the subarray 4, −1, 2, 1. O(n).

Divide and conquer check: split after the 4th item. Best suffix of the left half (−2, 1, −3, 4) is 4. Best prefix of the right half (−1, 2, 1, −5, 4) is 2. Crossing = 4 + 2 = 6. Best left-only and right-only are 4 and 4, so 6 wins. T(n) = 2T(n/2) + n = Θ(n log n).

Stock: take daily differences −6, 4, −2, 3, −2. Max subarray is 4 − 2 + 3 = 5: buy at 1, sell at 6.

### Karatsuba and Strassen

Question. Multiply 12 × 34 with Karatsuba and state the recurrence.

Solution. a = 1, b = 2, c = 3, d = 4. Three products: ac = 3, bd = 8, (a + b)(c + d) = 3 · 7 = 21. Middle term = 21 − 3 − 8 = 10. Result = 3·100 + 10·10 + 8 = 408. Recurrence T(n) = 3T(n/2) + O(n) = Θ(n^(log₂ 3)) = Θ(n^1.585). Naive is 4T(n/2) + n = Θ(n²).

Strassen: 7 products of n/2 × n/2 matrices instead of 8, T(n) = 7T(n/2) + Θ(n²) = Θ(n^(log₂ 7)) = Θ(n^2.81). Naive 8T(n/2) + n² = Θ(n³).

### Heaps

Question. Insert 4, 3, 8, 2, 7, 9 one by one into an empty max-heap, showing the array after each insert. Then extract the max.

Solution. Children of index i are 2i and 2i + 1, parent is ⌊i/2⌋. New item goes at the end and swaps up while bigger than its parent.
- insert 4: 4
- insert 3: 4 3
- insert 8: 4 3 8, 8 > parent 4, swap: 8 3 4
- insert 2: 8 3 4 2, parent 3, fine
- insert 7: 8 3 4 2 7, parent 3 < 7, swap: 8 7 4 2 3
- insert 9: 8 7 4 2 3 9, parent 4 < 9, swap: 8 7 9 2 3 4, parent 8 < 9, swap: 9 7 8 2 3 4

Extract max: remove 9, move the last item 4 to the root: 4 7 8 2 3. Sift down: children 7 and 8, swap with the larger 8: 8 7 4 2 3. 4 has no children, stop. Returned 9.

Build-heap on 4 3 8 2 7 9 directly (bottom up, start at index n/2 = 3): node 8 has child 9, swap: 4 3 9 2 7 8. Node 3 has children 2, 7, swap with 7: 4 7 9 2 3 8. Node 4 has children 7, 9, swap with 9: 9 7 4 2 3 8, then 4 has child 8, swap: 9 7 8 2 3 4. Build-heap is O(n), inserting one by one is O(n log n); the two methods can give different valid heaps.

Heapsort: build a max-heap, then n times swap the root with the last item, shrink the heap by one, sift the new root down. O(n log n), in place, not stable.

Applications to recognise: k largest of n in O(n + k log n) (build-heap then k extracts). Merge k sorted lists in O(n log k) (min-heap of the k heads). Running median (max-heap of the lower half, min-heap of the upper half, O(log n) per item). Priority queue with decrease-key through a position map.

### Counting sort

Question. Sort 2, 5, 3, 0, 2, 3, 0, 3 with counting sort, keys in 0 to 5. Show the count array and the output.

Solution. Count each key: 0:2, 1:0, 2:2, 3:3, 4:0, 5:1. Running totals give the last position of each key: 0:2, 1:2, 2:4, 3:7, 4:7, 5:8. Walk the input from the end to the start, drop each item into its key's position, then decrease that position: 3 → slot 7, 0 → slot 2, 2 → slot 4, 3 → slot 6, 0 → slot 1, 3 → slot 5, 5 → slot 8, 2 → slot 3. Output 0 0 2 2 3 3 3 5. Walking from the end keeps equal keys in input order, so it is stable. Time Θ(n + k).

### Radix sort

Question. Sort 9341, 6275, 4194, 7819, 3532 with radix sort, showing the table after each pass.

Solution. One stable pass per digit, rightmost digit first. Ties keep their current order.

| Pass | Digit | Result |
|---|---|---|
| 1 | ones | 9341, 3532, 4194, 6275, 7819 |
| 2 | tens | 7819, 3532, 9341, 6275, 4194 |
| 3 | hundreds | 4194, 6275, 9341, 3532, 7819 |
| 4 | thousands | 3532, 4194, 6275, 7819, 9341 |

Time d(n + k) with d digits in base k. To sort n integers below n³ in O(n): write each as 3 digits in base n, 3 passes of counting sort, Θ(3(n + n)) = Θ(n).

### Randomized algorithms and expectation

Question. n balls are thrown into n bins uniformly at random. Expected number of empty bins? Expected number of times the running maximum changes when scanning a random permutation of n distinct numbers?

Solution. Empty bins: indicator X_i = 1 if bin i is empty. Pr = (1 − 1/n)^n ≈ 1/e. By linearity, E = n(1 − 1/n)^n ≈ n/e ≈ 0.37n.

Max updates: the i-th item is a new maximum iff it is the largest of the first i, probability 1/i. E = 1 + 1/2 + … + 1/n = H_n = Θ(log n).

Tools: E[X + Y] = E[X] + E[Y] always, no independence needed. Trials until first success with probability p: expected 1/p. Coupon collector with n types: with i owned the next new one has probability (n − i)/n, so E = Σ n/(n − i) = nH_n = Θ(n log n). Random quicksort: z_i, z_j compared with probability 2/(j − i + 1), total Θ(n log n).

### Lower bounds

Question. Show any comparison-based sorting algorithm needs Ω(n log n) comparisons. Then: can n integers in the range 1 to n² be sorted in O(n)?

Solution. A comparison sort is a decision tree. Each comparison is a yes/no question, so a tree of height h has at most 2^h leaves. The n! orderings must all be leaves, so 2^h ≥ n!, h ≥ log₂(n!) ≥ (n/2) log₂(n/2) = Ω(n log n).

Yes for 1 to n²: this is not a comparison sort. Write each number as 2 digits in base n and radix sort, 2 passes, Θ(n). Finding the max needs n − 1 comparisons: every comparison rules out at most one candidate and n − 1 must be ruled out.

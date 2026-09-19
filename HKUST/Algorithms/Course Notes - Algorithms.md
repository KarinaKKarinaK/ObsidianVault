# COMP 3711 Course Notes (up to date)

Covers lectures 01-07 (prerequisites/asymptotics, binary search, mergesort + inversions, maximum subarray, multiplication + Master theorem, randomization, quicksort + selection), the stack/queue review deck, tutorials 1-2, and the quiz. For logistics see [[Course Overview - Algorithms]].

---

# Lecture 1: Prerequisites and Asymptotic Analysis

## Why algorithms (even with AI)

- Coding interviews (AI disallowed) and AI-enabled interviews, where what matters is algorithmic ideas, verification (AI makes mistakes), and complexity trade-offs.
- Most fundamental CS area; open problems: P = NP?, matrix multiplication in $O(n^2)$?, strongly polynomial LP.
- Everything in this course predates 1990 and is still used.

## Data structure warm-ups

- **Valid parentheses**: stack + a map from opener to closer; push openers, pop on matching closer, valid iff stack empty at end. $O(n)$ with hash table.
- **Sliding window maximum**: deque of candidates kept decreasing; pop back while smaller than new element, pop front when it leaves the window; front = max. $O(n)$ amortized (each element pushed/popped once).

## Pseudocode rules

- Standard keywords, $x \leftarrow$ value, math notation not code ($i = i+1$ not `i++`, $x \bmod y$), data structures and known algorithms as black boxes, plain language when clearer.

## Asymptotic notation

- $T(n)$ counts basic operations; keep only the dominant term, drop constants.
- $f = O(g)$: $\exists c, n_0: f(n) \le c\,g(n)$ for $n \ge n_0$ (dominated by). $\Omega$: lower bound (dominates). $\Theta$: both.
- $f = \Theta(g)$ iff $f = O(g)$ and $f = \Omega(g)$ - always prove the two separately.
- Input size is problem-specific: sorting n = array size; multiplication n = bits; graphs n = vertices, m = edges.
- Examples: $32n^2 + 17n - 32 = \Theta(n^2)$; #1-bits of n is $O(\log n)$ and $\Omega(1)$, no $\Theta$; $n! \le n^n$, $n! \ge (n/2)^{n/2}$, Stirling: $n! = \Theta(\sqrt{n}(n/e)^n)$.

## Exponents and logs

- $2^{2n} \ne \Theta(2^n)$ (constants MULTIPLYING the exponent matter); $2^{n+c} = \Theta(2^n)$ (constants ADDED do not).
- $\log_b a = \log_c a / \log_c b$ → **log base is asymptotically irrelevant**. $\log(n^c) = \Theta(\log n)$. Swap rule: $a^{\log_b n} = n^{\log_b a}$ (e.g. $4^{\log_2 n} = n^2$).
- Hierarchy: constant < log powers < polynomials < exponentials: $9999^{9999^{9999}} < \log^{10} n < n^{0.1} < n\log n < n^2 < 2^n$.

## Insertion sort (running example)

```
for j <- 2 to n:
    key <- A[j]; i <- j-1
    while i >= 1 and A[i] > key: A[i+1] <- A[i]; i <- i-1
    A[i+1] <- key
```

- Sorted input $\Theta(n)$; reversed $\Theta(n^2)$. Running time depends on the input, not just n.
- **Worst-case analysis is the default.** To show worst case $\Theta(g)$: prove $O(g)$ for all inputs + exhibit one input achieving $\Omega(g)$.
- When theory ties (bubble/selection/insertion all $\Theta(n^2)$): compare constants, typical inputs, cache behavior, experiments.

## Series bounds (core proof techniques)

- $\sum_{i=1}^n i = \Theta(n^2)$: upper - replace every term by n; lower (**half-trick**) - keep top half, each $\ge n/2$: $\ge n^2/4$. Closed form $n(n+1)/2$.
- $\sum i^c = \Theta(n^{c+1})$ same way.
- **Harmonic** $H_n = \sum 1/i = \Theta(\log n)$: group into doubling blocks $\{1\}, \{1/2,1/3\}, \{1/4..1/7\},...$; each block between 1/2 and 1; $\log n$ blocks.
- $\max(f,g) = \Theta(f+g)$: $\max \le f + g$ and $2\max \ge f+g$.
- **Substitution trick** for exotic comparisons: set $m = \log n$ or $m = 2^{n/2}$ etc. E.g. $\log\sqrt{n}$ vs $\sqrt{\log n}$: with $m = \sqrt n$, compare $\log m$ vs $\sqrt{2\log m}$ → first dominates.
- True/false drill answers: $1000n + n\log n = O(n\log n)$ T; $n^2 + n\log(n^3) = O(n\log(n^3))$ F ($= \Theta(n^2)$); $n^2+n = \Omega(n^3)$ F; $n^3 + 1000n^{2.9} = \Theta(n^3)$ T; $n^3 - n^2 = \Theta(n)$ F.
- Pairs: $2^n$ vs $2^{n/2}$: only $\Omega$ ($m^2$ vs $m$); $n\log_3 n$ vs $n\log_4 n$: $\Theta$; $\log 2^n$ vs $\log 3^n$: $\Theta$ (both $\Theta(n)$).

---

# Stack & Queue (COMP 2011 review deck)

- **Stack = LIFO**: push/pop/top at the top. Array implementation: `top_index` starts -1; empty iff -1, full iff BUFFER_SIZE-1, size = top_index+1. All ops $O(1)$. Classic use: decimal→binary (push remainders of repeated /2, pop to print reversed: $26 \to 11010_2$).
- **Queue = FIFO**: enqueue at back, dequeue/front at front. **Circular queue**: array as ring, state = `first` + `num_items`; insert at $(first + num\_items) \bmod B$; dequeue: $first \leftarrow (first+1) \bmod B$. Mod arithmetic avoids shifting; all ops $O(1)$.

---

# Lecture 2: Binary Search (Divide & Conquer intro)

- **D&C**: break a size-n problem into smaller ones, solve recursively, combine.
- Binary search on sorted $A[1..n]$: compare with middle, recurse into one half.

```
BinarySearch(A, l, r, x):
    if l > r return nil
    m <- floor((l+r)/2)
    if A[m] = x return m
    if x < A[m]: BinarySearch(A, l, m-1, x) else BinarySearch(A, m+1, r, x)
```

- Recurrence $T(n) \le T(n/2) + 2$, $T(1) = 1$. **Expansion**: $T(n) \le T(n/2^i) + 2i$; at $i = \log_2 n$: $T(n) \le 1 + 2\log_2 n = O(\log n)$. Lower bound: unsuccessful search always takes $\Omega(\log n)$ → $\Theta(\log n)$. Recursion tree: one node per level, 2 comparisons per level, $2\log n + 1$ total.
- **No-equality variant** (the library version):

```
l <- 1, r <- n+1
while l < r:
    m <- floor((l+r)/2)
    if A[m] < x: l <- m+1 else r <- m
return l
```

Returns position of first element ≥ x (or n+1); with $\le$ instead: first element > x (successor). One comparison per level; loop version is $O(1)$ space, no call overhead. This is `std::lower_bound`/`bisect_left`.

- **Rotated sorted array**: find the max position k ($A[k] > A[k+1]$, the "drop"): if $A[m] > A[m+1]$ return m; if $A[m] \ge A[l]$ the drop is right, else left. $O(\log n)$. Then search x in whichever sorted run: if $x \ge A[1]$ search $A[1..k]$ else $A[k+1..n]$.
- **Last 0 in 000...111**: binary search on the 0/1 boundary; one-comparison loop versions use ceiling vs floor of midpoint to guarantee shrink.
- **Galloping search** ($O(\log k)$ when the boundary k << n): double i while $A[i] = 0$ (capped at n), then binary search in $[i/2, i]$: $\log k + \log(k/2) = O(\log k)$.

---

# Lecture 3: Mergesort and Counting Inversions

## Towers of Hanoi (recursion + recurrence warm-up)

- Move n-1 to spare, move largest, move n-1 onto it. $T(n) = 2T(n-1) + 1$, $T(1) = 1$ → expansion gives $T(n) = 2^n - 1$. Recursion tree: level i has $2^i$ nodes → $\Theta(2^n)$ total.

## Mergesort

```
Mergesort(A, l, r):
    if l = r return
    m <- floor((l+r)/2)
    Mergesort(A, l, m); Mergesort(A, m+1, r); Merge(A, l, m, r)
```

- **Merge**: copy halves into L, R with **$\infty$ sentinels**; repeatedly write the smaller head into $A[k]$. Ties take L (stability). One element placed per iteration → $\Theta(n)$ always, for any input.
- Correctness: induction; smallest unplaced element is always at the head of L or R.
- Worked example: merging $[2,4,5,7]$ with $[1,2,3,6]$ → $[1,2,2,3,4,5,6,7]$ in 8 steps.
- Full trace input $[1,5,4,8,10,2,6,9,12,11,3,7]$: depth-first, left half → $[1,2,4,5,8,10]$, right half → $[3,6,7,9,11,12]$, final merge → sorted.

## Recurrence

- $T(n) = 2T(n/2) + n$, $T(1) = 1$ (simplify: drop O's, assume n a power of 2 - justified since $T(n) \le T(n') \le T(2n)$ for increasing polynomial-ish T).
- Expansion: $T(n) = 2^i T(n/2^i) + in$; at $i = \log_2 n$: $T(n) = n\log_2 n + n$. Recursion tree: every level costs exactly n, $\log n$ levels.
- $\Omega(n\log n)$ too: merge is $\Theta(n)$ regardless of input → **every input is worst case** → mergesort is $\Theta(n \log n)$.

## Counting inversions

- Inversion: $i < j$ but $A[i] > A[j]$. Measures unsortedness / ranking similarity. Max $\binom{n}{2}$. Naive $O(n^2)$.
- D&C: total = inversions in left + in right + **cross (blue-green)** inversions. Piggyback on mergesort (sorting a half doesn't change its cross count). Count during merge: when the else-branch fires ($R[j]$ wins), all remaining L elements exceed $R[j]$: add $c \leftarrow c + m - l - i + 2$ (block add, not one at a time).
- Same recurrence → $\Theta(n \log n)$. Worked: $[1,5,4,8,10,2,6,9,12,11,3,7]$ has 5 + 8 + 9 = **22** inversions.

---

# Lecture 4: Maximum Subarray

Input $A[1..n]$ (positives and negatives); maximize $V(i,j) = \sum_{k=i}^j A[k]$, empty subarray not allowed.

| Algorithm | Time | Idea |
| --- | --- | --- |
| Brute force | $\Theta(n^3)$ | compute every $V(i,j)$ from scratch |
| Data reuse | $\Theta(n^2)$ | $V(i,j) = V(i,j-1) + A[j]$ |
| Divide & conquer | $\Theta(n\log n)$ | 3 cases; crossing = best suffix of left ending at m + best prefix of right, each by linear scan; $T(n) = 2T(n/2) + n$ |
| Kadane | $\Theta(n)$ | $V \leftarrow \max(V + A[i], A[i])$ = best subarray ending at i; special case of DP (proof later) |

- Kadane worked example on $[-2,1,-3,4,-1,2,1,-5,4]$ → answer 6 (subarray $4,-1,2,1$).
- **Stock profit problem** (buy day i, sell day j > i, maximize $p[j] - p[i]$): D&C version - crossing case = min of left half, max of right half, $\Theta(n\log n)$. Better: **reduce to max subarray** via $Profit[i] = Price[i+1] - Price[i]$; the sum telescopes to $Price[j+1] - Price[i]$ → Kadane, $O(n)$ total. (Reverse reduction: prefix sums as prices.)

---

# Lecture 5: Integer & Matrix Multiplication, Master Theorem

## Integer multiplication (n-bit numbers)

- Long multiplication: $\Theta(n^2)$ bit operations.
- Split $a = 2^{n/2}a_1 + a_0$, $b = 2^{n/2}b_1 + b_0$: $ab = 2^n a_1b_1 + 2^{n/2}(a_1b_0 + a_0b_1) + a_0b_0$. Shifts ($\ll$) and additions cost $\Theta(n)$.
- **Naive D&C: 4 subproblems** → $T(n) = 4T(n/2) + n$. Expansion: $4^{\log_2 n} = n^2$, total $\Theta(n^2)$ - no better than school method.
- **Karatsuba (1960): 3 subproblems** via $a_1b_0 + a_0b_1 = (a_1+a_0)(b_1+b_0) - a_1b_1 - a_0b_0$.
	- $T(n) = 3T(n/2) + n \Rightarrow \Theta(n^{\log_2 3}) = \Theta(n^{1.585})$. Bottom level dominates ($3^{\log_2 n} = n^{\log_2 3}$ leaves).
- History: Toom-3 $\Theta(n^{1.465})$, Toom-4 $\Theta(n^{1.404})$, Schonhage-Strassen $\Theta(n\log n\log\log n)$, Harvey & van der Hoeven 2019: $\Theta(n\log n)$. Practice: libraries switch algorithms by size (school < ~10 words, Karatsuba ~10-20, Toom-3 ~100-1000, FFT beyond).

## Simplified Master Theorem

For $T(n) = aT(n/b) + n$:

| Case | Condition | Result | Who dominates |
| --- | --- | --- | --- |
| 1 | $a > b$ | $\Theta(n^{\log_b a})$ | leaves |
| 2 | $a = b$ | $\Theta(n \log n)$ | every level equal |
| 3 | $a < b$ | $\Theta(n)$ | root |

- Proof: recursion tree, level i work $n(a/b)^i$, leaves $a^{\log_b n} = n^{\log_b a}$; the geometric series is increasing / flat / decreasing.
- Memorize the identity $a^{\log_b n} = n^{\log_b a}$.

## Matrix multiplication

- Brute force $\Theta(n^3)$. Block D&C with 8 products: $T(n) = 8T(n/2) + n^2 \Rightarrow \Theta(n^3)$, no gain.
- **Strassen (1969): 7 products**:
	- $P_1 = A_{11}(B_{12}-B_{22})$, $P_2 = (A_{11}+A_{12})B_{22}$, $P_3 = (A_{21}+A_{22})B_{11}$, $P_4 = A_{22}(B_{21}-B_{11})$, $P_5 = (A_{11}+A_{22})(B_{11}+B_{22})$, $P_6 = (A_{12}-A_{22})(B_{21}+B_{22})$, $P_7 = (A_{11}-A_{21})(B_{11}+B_{12})$
	- $C_{11} = P_5+P_4-P_2+P_6$; $C_{12} = P_1+P_2$; $C_{21} = P_3+P_4$; $C_{22} = P_5+P_1-P_3-P_7$
	- $T(n) = 7T(n/2) + n^2 \Rightarrow \Theta(n^{\log_2 7}) = \Theta(n^{2.807})$. Used in practice for n > ~100.
- Exponent race: 2.807 (Strassen) → 2.376 (Coppersmith-Winograd 1990) → 2.3711 (2026); conjectured $\omega = 2$.
- **Lesson**: in $T(n) = aT(n/b) + f(n)$ with leaves dominating, only a matters - the win is trading multiplications for additions (4→3, 8→7).

---

# Lecture 6: Randomized Algorithms

## Expectation toolkit

- $E[X] = \sum_i i \Pr[X = i]$. Dice: one die 3.5; max of two ≈ 4.47; sum of two = 7.
- **Indicator variables**: $X \in \{0,1\} \Rightarrow E[X] = \Pr[X=1]$.
- **Linearity of expectation**: $E[X+Y] = E[X] + E[Y]$, **independence NOT required**. ($E[XY] = E[X]E[Y]$ only under independence.)
- Standard technique: write the quantity as a sum of indicators, apply linearity.

## Classic examples

- Card guessing, no memory: $E = n \cdot \frac{1}{n} = 1$. With memory: $E = \sum \frac{1}{n-i+1} = H_n = \Theta(\log n)$.
- **Hashing with chaining** ($h: U \to [m]$, simple uniform hashing): expected #keys colliding with any x is $\le n/m$ (sum of indicators, each $1/m$). Load factor $\alpha = n/m$; ops $O(1+\alpha)$ expected; choose $m = \Theta(n)$ for expected $O(1)$. This is `unordered_map`.
- **Birthday paradox**: $E[\#\text{colliding pairs}] = \binom{k}{2}\frac{1}{n} = \frac{k(k-1)}{2n} \ge 1$ around $k \approx \sqrt{2n} + 1 \approx 28$ for n = 365. Hash collisions likely at $\sqrt{n}$ keys.
- **Hiring problem** (hire whenever candidate beats current best, input randomly permuted): $\Pr[\text{hire } i] = 1/i$ → $E = H_n = \Theta(\log n)$ hires.
- **Geometric distribution**: waiting time for success probability p: $E[X] = 1/p$. Also via the tail formula $E[X] = \sum_{i \ge 1} \Pr[X \ge i]$.
- **Coupon collector**: stage i (have i types) waits $E = \frac{n}{n-i}$ → total $n H_n = \Theta(n \log n)$.

## Random permutation (Fisher-Yates)

```
for i <- 1 to n: swap A[i] with A[Random(1, i)]
```

$O(n)$ time, in place. Correctness by induction: after step i every permutation of $A[1..i]$ has probability $1/i!$ (prob of required predecessor $\frac{1}{(i-1)!}$ times $\Pr[Random = j] = \frac 1 i$).

## Majority element (appears > n/2 times)

1. Sort + count: $O(n\log n)$.
2. D&C: majority of A must be majority of a half; verify both candidates: $O(n\log n)$.
3. Hash table of counts: $O(n)$ expected, $O(n)$ space.
4. **Try and check**: random pick succeeds with prob > 1/2 → expected < 2 rounds, $O(n)$ expected, $O(1)$ space.
5. **Boyer-Moore vote** (deterministic, $O(n)$, $O(1)$): candidate m with counter c; c=0 → adopt A[i]; equal → c++; different → c--. Invariant: prefix = c copies of m + items cancelled in pairs of distinct values; majority can't be fully cancelled. Verify with one pass if majority not guaranteed.

## Measuring randomized algorithms

- Measure = expected time on the **worst-case input**: $\max_{|I|=n} E_R[T(I,R)]$. Adversary picks the input, not the coin flips.
- Open problem whether randomization is strictly necessary for e.g. O(1)-time hashing.

---

# Lecture 7: Quicksort and Selection

## Quicksort = mergesort's dual

- Mergesort: trivial divide, all work in combine. Quicksort: all work in divide (Partition), zero combine.

```
Quicksort(A, l, r):
    if l >= r return
    m <- Partition(A, l, r)
    Quicksort(A, l, m-1); Quicksort(A, m+1, r)
```

## Partition (Lomuto, last element pivot)

```
x <- A[r]; i <- l-1
for j <- l to r-1:
    if A[j] <= x: i <- i+1; swap A[i], A[j]
swap A[i+1], A[r]; return i+1
```

- Invariant zones: $A[l..i] \le x$ | $A[i+1..j-1] > x$ | unexamined | pivot at r. $\Theta(n)$ time, **in place** ($O(1)$ space).
- Worked: $[2,8,7,1,3,5,6,4]$, pivot 4 → $[2,1,3,4,7,5,6,8]$, return index of 4.

## Best/worst case and randomization

- Best (median pivot): $T(n) = 2T(n/2) + \Theta(n) = \Theta(n\log n)$. Worst (min/max pivot, e.g. sorted input): $T(n) = T(n-1) + \Theta(n) = \Theta(n^2)$.
- **Randomized quicksort**: pick pivot uniformly at random. Intuition: average pivot splits 1/4-3/4; $T(n) = T(n/4) + T(3n/4) + n = O(n\log n)$.

## Expected comparisons = $\Theta(n \log n)$ (full proof)

- Relabel sorted values $z_1 < \dots < z_n$. Pivot choices form a BST; **$z_i, z_j$ compared iff one is an ancestor of the other iff the first pivot chosen from $Z = \{z_i..z_j\}$ is $z_i$ or $z_j$**.
- $\Pr = \frac{2}{j-i+1}$ (first pivot in Z is uniform over its $j-i+1$ elements).
- $E[X] = \sum_{i<j}\frac{2}{j-i+1}$; each of the n rows sums to $\le 2H_n - 1 = O(\log n)$ → $\Theta(n\log n)$.
- Practice: small constants, cache-friendly, in-place; introsort (switch to heapsort past depth ~$10\log n$); C++ STL.

## Randomized selection (QuickSelect): i-th smallest in expected $\Theta(n)$

```
Select(A, l, r, i):
    if l = r return A[l]
    random pivot -> Partition -> position m; k <- m-l+1
    if i = k return A[m]
    if i < k: Select(A, l, m-1, i) else Select(A, m+1, r, i-k)
```

- One-sided recursion. Analysis: pivot is **good** (middle half) with prob 1/2; a good pivot discards ≥ 1/4 of items. Stage i: sizes $\le (3/4)^i n$, expected 2 pivots per stage (geometric) → $E \le \sum 2(3/4)^i n = 8n = O(n)$.
- Deterministic linear-time selection exists (median-of-medians) but is complicated.

## Exercise: k-th smallest of two sorted arrays in $\Theta(\log k)$

- Compare $A1[k/2]$-th and $A2[k/2]$-th candidates; the smaller side's first k/2 elements cannot contain the answer - discard them, recurse with k/2. Base k=1: min of the two fronts.

---

# Tutorial 1 (asymptotics problems)

Problems 1, 2, 4 answered in Lecture 1 notes above. Additional:
- P3: $T_1 = O(f), T_2 = O(f)$: (a) $T_1 + T_2 = O(f)$ true; (b) $T_1/T_2 = O(1)$ false; (c) $T_1 = O(T_2)$ false (both false via e.g. $T_1 = n, T_2 = 1$... any pair with different growth under the same bound).
- P5: fixed k: $g_k = O(f)$ true (constant number of terms); $g(n) = \sum_{i=1}^n T_i(n)$: $O(f)$ not guaranteed, $O(n f(n))$ true only if the constants $c_i$ are uniformly bounded - careful, each $T_i$ has its own constant.
- P6: prove the triple loop is $\Theta(n^3)$ rigorously: upper $n^3$; lower via half-trick (restrict $i \le n/4$, $j \ge 3n/4$, giving $\ge \frac{n}{4}\cdot\frac{n}{4}\cdot\frac{n}{2}$ work).

# Tutorial 2 (divide and conquer, TA: Arman Haghighi)

- **Closest pair of points**: naive $O(n^2)$; D&C: sort by x, split, $d = \min(d_l, d_r)$, check strip of width 2d sorted by y (each point vs O(1) neighbors) → $T(n) = 2T(n/2) + O(n\log n) = O(n\log^2 n)$, improvable to $O(n\log n)$ with presorting.
- **Majority element**: naive $O(n^2)$; sort + check middle $O(n\log n)$; D&C (majority must be majority of a half, verify both candidates) $O(n\log n)$; bit-counting per position $O(n)$ (verify candidate!); Boyer-Moore $O(n)$.
- **Max contiguous product**: crossing case needs BOTH max and min prefix/suffix products (two negatives make a positive); $T(n) = 2T(n/2) + O(n) = O(n\log n)$.
- **Knights and rogues**: > n/2 knights, pairwise queries, find one knight (majority-vote flavored; solution not in deck).

# Quiz (with answers)

1. $f$ vs $g$: $n^{1.5}$ vs $\frac{n^2}{\log^2 n}$ → O only; $n$ vs $3^{\log_2 n}$ ($= n^{\log_2 3} = n^{1.585}$) → O only; $\log_3 n$ vs $2^{\log_2\log_2 n}$ ($= \log_2 n$) → $\Theta$; $\sqrt{\log n}$ vs #1-bits of n → none (the bit count oscillates between 1 and $\log n$).
2. Rotated-array FindK loop: Q1 `l < r`; Q2 `l <- m+1`; Q3 `r <- m-1` (or `r <- m`).
3. Recurrences: $8T(n/2)+n = \Theta(n^3)$; $3T(n/4)+n = \Theta(n)$; $3T(n/3)+n = \Theta(n\log n)$; $2T(n/2)+n\log n = \Theta(n\log^2 n)$ (not covered by the simplified Master theorem - every level costs $\approx n\log n$, $\log n$ levels).

# Exam checklist

- Prove $\Theta$ = separate O and $\Omega$; worst case $\Theta$ = O for all inputs + one bad input.
- Series: max-term upper bound, half-trick lower bound, doubling blocks for $H_n = \Theta(\log n)$; substitution for weird comparisons.
- $a^{\log_b n} = n^{\log_b a}$; exponent constants multiply → matter, add → don't; log base never matters.
- Recurrence solving: expansion to general term, plug stopping i; recursion tree = work per level x levels. Master: a vs b.
- Know cold: binary search variants + invariants, merge with sentinels, inversion count ($c += m-l-i+2$), Kadane, Karatsuba identity, Strassen's 7 products (or at least the 7-vs-8 idea), Partition invariant, quicksort $\Pr[\text{compare}] = \frac{2}{j-i+1}$, QuickSelect good-pivot stage argument, Fisher-Yates induction, Boyer-Moore invariant.
- Randomized analysis recipe: indicators + linearity (no independence needed); geometric waiting time $1/p$; measure = expected time on worst-case input.

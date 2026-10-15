# COMP3711 Midterm Cram Notes (60 minutes)

Built 2026-10-15 from the lecture decks 01 to 07 in `resources/Lecture Slides/` and Tutorials 1 to 5. The two decks that exist only on Canvas (Heap and Heapsort, Sorting Lower Bound and Linear-Time Sorting) are reconstructed from Tutorials 4 and 5 and CLRS chapters 6 and 8, so section 8 and 9 follow the standard presentation rather than the exact slides.

Scope (Sep 18 announcement): "prerequisites" to "Sorting in linear time". Greedy, Huffman, DP, graphs are out.

## How to spend the 60 minutes

| Minutes | Section | Why |
| --- | --- | --- |
| 0 to 8 | 1 Asymptotics and sums | Q1 on every past paper |
| 8 to 16 | 2 Recurrences (binary search, mergesort, master theorem) | 9 of 11 papers |
| 16 to 24 | 3 Divide and conquer catalogue | design questions |
| 24 to 34 | 4 Randomization and expectation | 9 of 11 papers |
| 34 to 42 | 5 Quicksort and selection | A/B/U rows and black boxes |
| 42 to 52 | 6 Heaps | drawing plus design, near certain |
| 52 to 58 | 7 Lower bounds and linear-time sorting | short parts |
| 58 to 60 | 8 Exam protocol | marks for free |

Every section ends with "Self-check". Cover the answer, say it out loud, move on.

---

## 1. Prerequisites and asymptotics (deck 01, Tutorial 1)

### 1.1 How to write an algorithm in this course

- Pseudocode: `if/then/else`, `while`, `for`, `return`, `x ← value`, `A[i]`, `x mod y`, `x · y`. Not C++. Write `i = i + 1` not `i++`.
- Say the idea in plain English first, then pseudocode.
- Data structures and taught algorithms are black boxes: "sort A with mergesort, O(n log n)" is a complete sentence. Define the input and output of any subroutine you invent.
- Running time: count operations as a function of input size n, worst case, asymptotic.

Two warm-up examples from deck 01 that reappear as black boxes:

- Valid parentheses: push opening brackets on a stack, pop on a matching close, valid iff stack empty at the end. O(n).
- Sliding window max (window k): keep a deque of candidates in decreasing order. New element pops smaller ones from the back; pop the front if it just left the window; the front is the answer. O(n) total because every element is pushed and popped at most once.

### 1.2 The three symbols

In plain words. We want to compare how fast two functions grow when n gets huge. We do not care about constant factors (3n and 100n count as the same) and we do not care about small n. So:

- "f is O(g)" means: f grows no faster than g. g is a ceiling. Example: 5n + 3 is O(n²) because for big n, n² is way above it.
- "f is Omega(g)" means: f grows at least as fast as g. g is a floor. Example: n² is Omega(n).
- "f is Theta(g)" means: f and g grow at the same rate. Both a ceiling and a floor. Example: 3n² + 7n is Theta(n²).

Analogy: O is "I earn at most about as much as you", Omega is "at least about as much", Theta is "about the same". "About" = up to a constant factor, and only once we are both grown up (large n).

Formal, for the exam (write exactly this if asked to define):

| Symbol | Definition |
| --- | --- |
| f = O(g) | there exist constants c > 0 and n0 such that f(n) ≤ c·g(n) for all n ≥ n0 |
| f = Omega(g) | there exist c > 0 and n0 such that f(n) ≥ c·g(n) for all n ≥ n0 |
| f = Theta(g) | both hold (possibly with different constants). To prove Theta, prove O and Omega separately. |

"Worst-case running time is Theta(g)" means two things: the algorithm never takes more than O(g) on any input, and there is some family of inputs on which it really does take Omega(g).

Example: 32n² + 17n − 32 is O(n²), O(n³), Omega(n²), Omega(n), Theta(n²). It is not O(n), not Omega(n³).

Worst case is the default. To prove an algorithm is Theta(n²) worst case: show O(n²) for every input, then exhibit one input that costs Omega(n²). Insertion sort: Theta(n) on sorted input, Theta(n²) on reverse sorted, so worst case Theta(n²).

### 1.3 The growth ladder (memorise the order)

constant < log log n < log n < (log n)^k < n^0.1 < n < n log n < n² < n^k < 2^n < n! < n^n

Rules that solve most A/B/U rows:

- Only the largest term matters: n³ + 1000n^2.9 = Theta(n³). n² + n log(n³) = Theta(n²).
- Base of a log does not matter: log_10 n = Theta(log 2 n). But base of an exponent does: 2^n vs 3^n are different, 4^n = (2^n)² is not Theta(2^n).
- Constants added in the exponent are fine, multiplied are not: 2^(n+2) = 4·2^n = Theta(2^n), but 2^(2n) = (2^n)² is not Theta(2^n).
- log(n^c) = c log n = Theta(log n). log(2^n) = n. log(3^n) = n log 3 = Theta(n).
- a^(log_b n) = n^(log_b a). So 4^(log 2 n) = n², 2^(log n) = n.
- Polynomial beats any power of log: (log n)^100 = O(n^0.1). Exponential beats any polynomial: n^100 = O(2^n).
- max(f, g) = Theta(f + g). Proof: max ≤ f + g, and 2·max ≥ f + g.
- Substitution trick: to compare log(sqrt n) with sqrt(log n), set m = log n. Then log(sqrt n) = m/2 and sqrt(log n) = sqrt m, so the first dominates. To compare 2^n with 2^(n/2), set m = 2^(n/2); then 2^n = m², so 2^n is strictly bigger: Omega only.
- n!: n! ≤ n^n, and n! ≥ (n/2)^(n/2). Stirling: n! = Theta(sqrt(n) (n/e)^n), so log(n!) = Theta(n log n).
- Number of 1 bits in n: O(log n) and Omega(1).

A/B/U decision rule for "A is O, Omega, Theta of B": simplify both to a Theta form, compare on the ladder. If equal growth, all three hold. If A grows slower, only O. If faster, only Omega.

### 1.4 Sums you must do by hand

The "half trick" lower bound: throw away the smaller half of the terms, replace the rest by the smallest kept term.

- Arithmetic: 1 + 2 + ... + n = n(n+1)/2 = Theta(n²). Upper: n terms each ≤ n. Lower: last n/2 terms each ≥ n/2, so ≥ n²/4.
- Polynomial: Σ i^c = Theta(n^(c+1)), same trick.
- Harmonic: H_n = 1 + 1/2 + ... + 1/n = Theta(log n). Group terms into blocks of size 1, 2, 4, 8: each block sums to at most 1 (upper bound log n + 1) and at least 1/2 (lower bound (log n)/2).
- Geometric: 1 + 2 + 4 + ... + 2^k = 2^(k+1) − 1 = Theta(2^k). Any increasing geometric series is Theta(last term). Any decreasing one (ratio < 1) is Theta(first term) = Theta(1) if it starts at 1.

### Self-check 1

- n log n vs n²/log n? (n log n = O(n²/log n), strictly.)
- log(n!) vs n log n? (Theta.)
- 2^n vs 2^(n/2)? (Omega only.)
- Σ_{i=1}^{n} 1/i? (Theta(log n).)

---

## 2. Recurrences (decks 02, 03, 05)

In plain words. A recursive algorithm calls itself on smaller inputs, so its running time is described by an equation that refers to itself: "time for n = (some number of calls) × (time for a smaller size) + (work done in this call)". That equation is a recurrence. Example, mergesort: "sorting n things costs two sorts of n/2 things plus n steps of merging", written T(n) = 2T(n/2) + n.

Solving it means turning the self-referencing equation into a plain formula like n log n. There are two ways, and they are the same arithmetic drawn differently:

- Expansion: keep substituting the equation into itself until you hit the base case, then add up everything you collected along the way.
- Recursion tree: draw the calls as a tree, write the work done at each level, add up the levels.

The exam says "from first principles, do not use the Master Theorem", so practise the unrolling.

Formal, the three symbols in a recurrence T(n) = a·T(n/b) + f(n): a = how many recursive calls, b = how much smaller each call is, f(n) = work done outside the recursive calls (splitting and combining).

### 2.1 Expansion template (copy this shape)

```
T(n) = a T(n/b) + f(n)
     = a [ a T(n/b²) + f(n/b) ] + f(n)
     = a² T(n/b²) + a f(n/b) + f(n)
     = ...
     = a^i T(n/b^i) + Σ_{j=0}^{i-1} a^j f(n/b^j)        (general level i)
stop when n/b^i = 1, i.e. i = log_b n, a^i = a^(log_b n) = n^(log_b a)
T(n) = n^(log_b a) · T(1) + Σ_{j=0}^{log_b n − 1} a^j f(n/b^j)
```

Then evaluate the sum: it is geometric. Say which end dominates.

### 2.2 Recursion tree table (what Fall 2025 asked for)

| Level | Number of subproblems | Size each | Work per subproblem | Work per level |
| --- | --- | --- | --- | --- |
| 0 | 1 | n | f(n) | f(n) |
| 1 | a | n/b | f(n/b) | a f(n/b) |
| i | a^i | n/b^i | f(n/b^i) | a^i f(n/b^i) |
| log_b n | a^(log_b n) = n^(log_b a) | 1 | T(1) | n^(log_b a) |

Leaves: n^(log_b a). Total: sum of the last column.

### 2.3 The worked examples from the slides

- Binary search, T(n) = T(n/2) + 2, T(1) = 1: unrolls to T(n/2^i) + 2i, stop at i = log n, gives 2 log n + 1 = Theta(log n). Also Omega(log n): when x is absent the algorithm must go all the way down.
- Towers of Hanoi, T(n) = 2T(n−1) + 1: 2^i T(n−i) + (2^(i−1) + ... + 1), at i = n−1 gives 2^n − 1.
- Mergesort, T(n) = 2T(n/2) + n: 2^i T(n/2^i) + i·n, at i = log n gives n log n + n = Theta(n log n). Every level costs exactly n, there are log n + 1 levels.
- Naive integer multiplication, T(n) = 4T(n/2) + n: 4^i T(n/2^i) + n(2^(i−1) + ... + 1), at i = log n: n² + n(n − 1) = Theta(n²). Bottom level dominates.
- Karatsuba, T(n) = 3T(n/2) + n: 3^(log n) = n^(log 2 3) = n^1.585, plus n·((3/2)^(i−1) + ... + 1) which is Theta((3/2)^(log n)) · n = Theta(n^(log 2 3)). Total Theta(n^1.585).

### 2.4 Simplified Master Theorem (course form, f(n) = n)

T(n) = a T(n/b) + n. Total = n^(log_b a) + n·Σ_{i=0}^{log_b n − 1} (a/b)^i.

| Case | Condition | Series | Answer | Who dominates |
| --- | --- | --- | --- | --- |
| 1 | a > b (log_b a > 1) | increasing geometric, Theta(last term) = Theta(n^(log_b a)/n) | Theta(n^(log_b a)) | leaves |
| 2 | a = b | every term 1, log_b n terms | Theta(n log n) | every level equal |
| 3 | a < b | decreasing geometric, Theta(1) | Theta(n) | root |

General version (CLRS) for f(n) = n^c: compare c with log_b a. c < log_b a: n^(log_b a). c = log_b a: n^c log n. c > log_b a: n^c. For f(n) = n^c (log n)^k with c = log_b a the answer is n^c (log n)^(k+1).

### 2.5 Recurrences to recognise on sight

| Recurrence | Answer | Where from |
| --- | --- | --- |
| T(n/2) + 1 | log n | binary search |
| T(n/2) + n | n | one half, linear work: decreasing series |
| 2T(n/2) + 1 | n | leaves dominate |
| 2T(n/2) + n | n log n | mergesort, inversions, max subarray |
| 2T(n/2) + n log n | n log² n | |
| 2T(n/2) + n² | n² | root dominates |
| 3T(n/2) + n | n^1.585 | Karatsuba |
| 4T(n/2) + n | n² | naive multiply |
| 7T(n/2) + n² | n^2.807 | Strassen |
| 8T(n/2) + n² | n³ | naive matrix multiply |
| T(n−1) + n | n² | |
| 2T(n−1) + 1 | 2^n | Hanoi |
| T(n−1) + 1 | n | |
| T(sqrt n) + 1 | log log n | set m = log n, gives S(m) = S(m/2) + 1 |
| T(sqrt n) + log n | log n | set m = log n, S(m) = S(m/2) + m |
| T(n/4) + T(3n/4) + n | n log n | average quicksort split |
| 2T(n/4) + sqrt n | sqrt n log n | a = b^c case 2 |
| T(n/2) + log n | log² n | |

### Self-check 2

- Solve T(n) = 3T(n/3) + n from first principles. (Level i: 3^i subproblems of size n/3^i, work n per level, log 3 n levels, Theta(n log n).)
- T(n) = 2T(n/2) + n/log n? (Each level i costs n/(log n − i); sum is n·H_(log n) = Theta(n log log n).)

---

## 3. Divide and conquer catalogue (decks 02 to 05)

Divide and conquer = split into smaller copies of the same problem, solve recursively, combine. The running time is set by (a) how many pieces, (b) how small, (c) the combine cost. If you are asked for a target time, work backwards: O(log n) means one half each step with O(1) work; O(n log n) means two halves with O(n) combine; O(log² n) means O(log n) binary searches.

### 3.1 Binary search and its variants (deck 02)

```
BinarySearch(A, l, r, x):          // first call (A, 1, n, x)
  if l > r then return nil
  m ← floor((l + r)/2)
  if A[m] = x then return m
  if x < A[m] then return BinarySearch(A, l, m − 1, x)
  else return BinarySearch(A, m + 1, r, x)
```

Lower-bound variant (no equality test, returns the first position with A[m] ≥ x, or n + 1):

```
l ← 1, r ← n + 1
while l < r
  m ← floor((l + r)/2)
  if A[m] < x then l ← m + 1 else r ← m
return l
```

Change `<` to `≤` and it returns the first element strictly greater than x (the successor). This is `std::lower_bound` and `bisect_left`. Loop version uses O(1) space, no stack overflow.

Rotated sorted array (A[1..k] increasing, A[k+1..n] increasing, A[n] < A[1]):

```
FindK(A, l, r):                    // returns k, the index of the max
  m ← floor((l + r)/2)
  if A[m] > A[m + 1] then return m
  if A[m] ≥ A[l] then return FindK(A, m + 1, r)   // left part is sorted, max is right
  else return FindK(A, l, m − 1)
```

Then search x: if x ≥ A[1] binary search A[1..k], else A[k+1..n]. O(log n).

Last 0 in 000111: find m with A[m] = 0 and A[m+1] = 1; if A[m] = 0 go right, else go left. O(log n). If the answer k is small: galloping. Double i (i ← min(2i, n)) while A[i] = 0, which takes log k steps, then binary search in A[i/2..i], another O(log k). Total O(log k).

### 3.2 Mergesort and counting inversions (deck 03)

```
Mergesort(A, l, r):                Merge(A, l, m, r):
  if l = r then return               L ← A[l..m], R ← A[m+1..r], append ∞ to both
  m ← floor((l + r)/2)               i ← 1, j ← 1
  Mergesort(A, l, m)                 for k ← l to r
  Mergesort(A, m + 1, r)               if L[i] ≤ R[j] then A[k] ← L[i], i ← i + 1
  Merge(A, l, m, r)                    else A[k] ← R[j], j ← j + 1
```

Theta(n log n) on every input (merge always costs Theta(n)), so best = worst. Stable because of the `≤`. Needs O(n) extra space.

Inversions: pairs i < j with A[i] > A[j]. Measures how unsorted an array is, or how different two rankings are. Sort-and-Count returns c1 + c2 + c3: inversions inside the left half, inside the right half, across. The across count happens during merge: when R[j] is copied out (L[i] > R[j]), every remaining left element is bigger than it, so add `m − l − i + 2`. Same recurrence as mergesort, Theta(n log n).

### 3.3 Maximum subarray (deck 04)

Input: array with positive and negative numbers, find the contiguous block with the largest sum (empty not allowed).

- Brute force: every (i, j) summed from scratch, Theta(n³).
- Reuse V(i, j) = V(i, j−1) + A[j]: Theta(n²).
- Divide and conquer: best in left half, best in right half, best crossing the middle. Crossing = (best suffix of the left half ending at m) + (best prefix of the right half starting at m+1), each by one linear scan. T(n) = 2T(n/2) + n = Theta(n log n).
- Kadane: V ← max(V + A[i], A[i]); track the max V. Theta(n). Correctness is a DP argument, not examinable now, but you may cite it as a black box.

Stock profit (buy day i, sell day j > i, maximise p[j] − p[i]): D&C with crossing case = (min of left half, max of right half), Theta(n log n). Or reduce to max subarray on the difference array Profit[i] = p[i+1] − p[i] in O(n), since the sum of consecutive differences telescopes to p[j] − p[i].

### 3.4 Integer and matrix multiplication (deck 05)

Integers of n bits. Split a = 2^(n/2) a1 + a0, b = 2^(n/2) b1 + b0. Then ab = 2^n a1b1 + 2^(n/2)(a1b0 + a0b1) + a0b0. Multiplying by 2^k is a left shift, additions are Theta(n).

- Four recursive products: T(n) = 4T(n/2) + n = Theta(n²). No better than school method.
- Karatsuba: a1b0 + a0b1 = (a1 + a0)(b1 + b0) − a1b1 − a0b0, so three products. T(n) = 3T(n/2) + n = Theta(n^(log 2 3)) = Theta(n^1.585).
- History: Toom-3 (5 pieces of n/3, n^1.465), Toom-4 (n^1.404), FFT n log n log log n (1968), Harvey and van der Hoeven Theta(n log n) in 2019. In practice: schoolbook below 10 words, Karatsuba 10 to 20, Toom-3 100 to 1000, FFT above.

Matrices n by n. Brute force Theta(n³). Blocks of n/2: 8 products plus Theta(n²) additions, T(n) = 8T(n/2) + n² = Theta(n³). Strassen: 7 products of n/2 blocks, T(n) = 7T(n/2) + n² = Theta(n^(log 2 7)) = Theta(n^2.807). Used in practice above about n = 100. Best known exponent is about 2.371.

### 3.5 Other D&C answers you can quote

- k-th smallest in two sorted arrays (deck 07 exercise, Fall 2017 Q6, Fall 2025 Q4): compare A1[k/2] with A2[k/2]; the smaller one's first k/2 elements cannot contain the answer, discard them, recurse with k/2. Base k = 1: min of the two heads. Theta(log k). Naive: merge until the k-th, Theta(k).
- Majority element by D&C: majority of the whole must be majority of at least one half; check the two candidates by counting. O(n log n), equality tests only.
- Distinct values of a sorted array with Theta(log n) distinct values: repeatedly binary search for the successor of the current value. log n searches of O(log n) each, O(log² n). (Spring 2025 Q6, Spring 2026 Q3.)
- Partition n numbers into k equal blocks in sorted order of blocks: find the median with linear-time Select, partition, recurse on both sides, stop after log k levels. O(n log k).

### Self-check 3

- Target O(log n) on a sorted array: what shape of algorithm? (One binary search.)
- Why is the crossing case of max subarray linear? (One scan leftwards from m, one scan rightwards from m+1, keep the best running sum.)
- Karatsuba's three products? (a1b1, a0b0, (a1+a0)(b1+b0).)

---

## 4. Randomized algorithms and expectation (deck 06, Tutorial 3)

### 4.1 The two tools (this is 90 percent of every randomness question)

In plain words. "Expected value" is the long-run average if you repeated the random experiment many times. A die averages 3.5. Most exam questions ask "on average, how many X happen", and the trick is never to compute that directly. Instead:

1. Break the big count into many yes/no questions. "Does person 1 get their own hat? Person 2? ..." Each yes/no question is a 0/1 variable, called an indicator.
2. The average of a yes/no variable is just the probability of "yes". Nothing to compute.
3. The average of a sum is the sum of the averages, always, even when the yes/no questions influence each other. So the answer is: add up the probabilities.

Example: n people, each takes a random hat. Average number with their own hat? Person i gets their own hat with probability 1/n. There are n people. Answer: n × 1/n = 1. Done, no case analysis.

Formal, write these sentences on the exam:

- Indicator random variable: X_i = 1 if event i happens, 0 otherwise. Then E[X_i] = Pr[X_i = 1].
- Linearity of expectation: E[X + Y] = E[X] + E[Y] for any random variables, independent or not. (E[XY] = E[X]·E[Y] does need independence.)
- Recipe: X = Σ X_i, so E[X] = Σ E[X_i] = Σ Pr[event i].

Two more facts, for "how long until something happens" questions:

- Waiting for a success. If each try succeeds with probability p, you need 1/p tries on average. A 1-in-6 chance takes 6 tries on average. (Formal: geometric distribution, E = 1/p.)
- Tail sum. For a count X that is 0, 1, 2, ..., its average equals Pr[X ≥ 1] + Pr[X ≥ 2] + Pr[X ≥ 3] + ... (Formal: E[X] = Σ_{i≥1} Pr[X ≥ i].) Handy when "at least i" is easier to compute than "exactly i".

### 4.2 Worked examples from the deck (quote them)

| Problem | X_i | Pr[X_i = 1] | E[X] |
| --- | --- | --- | --- |
| Guess n shuffled cards, no memory | guess i correct | 1/n | 1 |
| Guess with memory (random among unseen) | guess i correct | 1/(n − i + 1) | H_n = Theta(log n) |
| Hiring problem (hire when better than current best, random order) | candidate i hired | 1/i (best of first i is last) | H_n = Theta(log n) |
| Hashing with chaining, n keys, m slots | key y collides with x | 1/m | n/m = load factor alpha; operations O(1 + alpha) expected |
| Birthday, k people, n days | pair (i, j) same birthday | 1/n | C(k,2)/n = k(k−1)/(2n); ≥ 1 when k ≈ sqrt(2n) + 1 ≈ 28 for n = 365 |
| Coupon collector, n types | X_i = boxes spent in stage i (have i types, wait for a new one) | success prob (n − i)/n, so E = n/(n − i) | Σ n/(n − i) = n H_n = Theta(n log n) |
| Randomized quicksort | z_i, z_j compared | 2/(j − i + 1) | Theta(n log n), see section 5 |

Coupon collector variants that were on recent papers: boxes to get n/2 distinct types = Σ_{i<n/2} n/(n − i) ≤ (n/2)·2 = Theta(n). Expected distinct types after n boxes = n·(1 − (1 − 1/n)^n) ≈ n(1 − 1/e), by X_t = 1 if type t appears, Pr = 1 − (1 − 1/n)^n.

Hat check (n people get random hats): expected number with own hat = n · 1/n = 1. Expected number with own hat or a better one (rank ≤ own) = Σ i/n = (n+1)/2.

### 4.3 Random permutation (Fisher-Yates)

```
for i ← 1 to n: swap A[i] with A[Random(1, i)]
```

O(n) time, O(1) space. Correct by induction on i: after step i each of the i! arrangements of A[1..i] has probability 1/(i − 1)! · 1/i = 1/i!.

### 4.4 Majority element, four ways (deck 06)

Find the element appearing more than n/2 times, assuming it exists.

| Method | Time | Space | Notes |
| --- | --- | --- | --- |
| Sort and count | O(n log n) | O(1) | deterministic |
| Divide and conquer | O(n log n) | O(log n) | equality tests only |
| Hash table of counts | O(n) expected | O(n) | randomized |
| Try and check: pick random item, count it, repeat | O(n) expected | O(1) | each try succeeds with prob > 1/2, so expected ≤ 2 tries |
| Boyer-Moore vote | O(n) worst | O(1) | deterministic, equality only |

Boyer-Moore: counter c and candidate m. If c = 0 set m ← A[i]; else if A[i] = m then c++ else c−−. Invariant: A[1..i] = c copies of m plus cancelled pairs of unequal items. At most n/2 copies of the majority can be cancelled, so it survives.

### 4.5 How randomized algorithms are measured

Worst-case input, expected over the algorithm's own coin flips: max over inputs I of E_R[T(I, R)]. Try-and-check has unbounded worst-case time but O(n) expected. Open problem whether randomization gives asymptotic speedups at all; hashing is the candidate.

### Self-check 4

- n people throw their hat in a pile and take one at random. Expected number who get their own? (1.) Set-up sentence? ("Let X_i = 1 if person i gets own hat, Pr = 1/n, sum by linearity.")
- Expected flips of a coin with heads probability 1/3 until the first head? (3.)
- You keep rolling a die until you have seen all six faces. Expected rolls? (6 H_6 = 14.7.)

---

## 5. Quicksort and selection (deck 07, Tutorial 4)

### 5.1 Partition and quicksort

```
Partition(A, l, r):                 // pivot x = A[r], returns pivot position
  x ← A[r], i ← l − 1
  for j ← l to r − 1
    if A[j] ≤ x then i ← i + 1, swap A[i] and A[j]
  swap A[i + 1] and A[r]
  return i + 1

Quicksort(A, l, r):
  if l ≥ r then return
  m ← Partition(A, l, r)
  Quicksort(A, l, m − 1); Quicksort(A, m + 1, r)
```

Invariant during the loop: A[l..i] ≤ x, A[i+1..j−1] > x, A[j..r−1] unseen. Theta(n) time, in place. Quicksort is mergesort's dual: all the work is in the divide step, the combine step is free.

Pivot matters: median pivot gives 2T(n/2) + n = Theta(n log n); smallest or largest pivot gives T(n−1) + n = Theta(n²) (already sorted input is the worst case for a last-element pivot). Fix: pick the pivot uniformly at random, swap it to A[r], partition. An "average" pivot splits 1/4 : 3/4, and T(n) = T(n/4) + T(3n/4) + n is still Theta(n log n).

### 5.2 Expected comparisons of randomized quicksort (be able to reproduce)

Relabel the elements in sorted order z_1 < ... < z_n. The pivots form a binary search tree: a pivot's subarray is exactly its subtree.

1. z_i and z_j are compared at most once, and only if one is the pivot while both are in the same subarray. That happens iff z_i or z_j is the first pivot chosen from {z_i, ..., z_j}. If some z_k strictly between them is chosen first, they land in different sides and never meet.
2. The first pivot chosen from that set is uniform over its j − i + 1 elements, so Pr[compared] = 2/(j − i + 1).
3. X = Σ_{i<j} X_ij, E[X] = Σ_{i<j} 2/(j − i + 1).
4. Fix i: the row sums 2(1/2 + 1/3 + ... + 1/(n − i + 1)) ≤ 2 H_n = O(log n). n rows, so O(n log n). Also Omega(n log n) since the top row alone is Theta(log n) and so are the first n/2 rows. Theta(n log n) expected.

In practice: Theta(n log n) with high probability, small constants, cache friendly, beats mergesort. Engineering: switch to insertion sort or heapsort when recursion goes deeper than about 10 log n.

### 5.3 Randomized selection (i-th smallest)

```
Select(A, l, r, i):
  if l = r then return A[l]
  pick a random pivot in A[l..r], swap it with A[r]
  m ← Partition(A, l, r); k ← m − l + 1        // pivot is the k-th smallest of A[l..r]
  if i = k then return A[m]
  if i < k then return Select(A, l, m − 1, i)
  else return Select(A, m + 1, r, i − k)
```

Only one side is recursed on. Analysis: a pivot is "good" if it lands in the middle half (between the 25th and 75th percentile). Pr[good] = 1/2, and each good pivot throws away at least 1/4 of the array. Stage i = the calls between the i-th and (i+1)-th good pivot; the array size in stage i is at most (3/4)^i n; the expected number of calls in a stage is 2 (geometric with p = 1/2). Expected total ≤ Σ 2 (3/4)^i n = 8n = O(n). A deterministic O(n) selection exists (median of medians) and you may cite "linear-time Select" as a black box.

Tutorial 4 redid this with indicators: Pr[z_i, z_j compared] = 2/(j − i + 1) if i ≤ k ≤ j, 2/(k − i + 1) if i < j < k, 2/(j − k + 1) if k < i < j. Each case sums to O(n) (diagonals, columns, rows each sum to O(1) and there are O(n) of them).

### 5.4 Sorting facts table

| Algorithm | Worst | Best | Expected | Stable | Extra space |
| --- | --- | --- | --- | --- | --- |
| Insertion sort | n² | n (sorted) | n² | yes | O(1) |
| Mergesort | n log n | n log n | n log n | yes | O(n) |
| Quicksort (random pivot) | n² | n log n | n log n | no | O(log n) stack |
| Heapsort | n log n | n log n | n log n | no | O(1) |
| Counting sort | n + k | n + k | | yes | O(n + k) |
| Radix sort | d(n + k) | same | | yes | O(n + k) |

Which to pick: almost sorted or tiny arrays, insertion sort (O(n + inversions)). Need stability or linked lists or guaranteed n log n, mergesort. In-place and fast on average, quicksort. In-place and guaranteed n log n, heapsort. Small integer keys, counting or radix.

### Self-check 5

- Why does quicksort compare z_1 and z_n with probability 2/n? (One of them must be the very first pivot chosen overall.)
- Why is selection O(n) but quicksort O(n log n)? (Selection recurses into one side, so the sizes form a geometric series; quicksort recurses into both, so every level costs n.)

---

## 6. Heaps (Canvas deck, Tutorials 4 and 5)

### 6.1 What a heap is

A binary min-heap is a complete binary tree (every level full except the last, which is filled left to right) where each node is ≤ its children. Stored in an array with no pointers: node i has children 2i and 2i + 1 and parent floor(i/2). Height floor(log 2 n). Max-heap is the same with ≥. Analogy: a tournament bracket where the champion is always at the top but siblings are in no particular order.

| Operation | Cost | How |
| --- | --- | --- |
| FindMin | O(1) | A[1] |
| Insert | O(log n) | put at A[n+1], bubble up while smaller than parent |
| ExtractMin | O(log n) | move A[n] to A[1], n ← n − 1, sink: swap with the smaller child while bigger |
| Delete at position p | O(log n) | replace by A[n], then bubble up or sink |
| DecreaseKey | O(log n) | bubble up |
| BuildHeap | O(n) | sink nodes from floor(n/2) down to 1 |
| Heapsort | O(n log n) | build max-heap, repeat n times: swap A[1] with A[n], n ← n − 1, sink A[1]; in place |

### 6.2 How to draw the insert sequence (half a mark per mistake)

Insert 4, 3, 8, 2 into an empty min-heap:

```
insert 4:   [4]                       tree: 4
insert 3:   [4,3] → 3 < parent 4, swap → [3,4]       tree: 3 / 4
insert 8:   [3,4,8]  8 ≥ parent 3, stay              tree: 3 / 4 8
insert 2:   [3,4,8,2]  2 < parent 4 → [3,2,8,4]  2 < parent 3 → [2,3,8,4]
            tree: 2 / 3 8 / 4 (4 is left child of 3)
```

For every insert: write the array, say which parent you compare with, draw the tree. Extract-min: write the root removed, move the last element to the root, sink step by step comparing with the smaller child.

### 6.3 Build-heap is O(n) (proved on Fall 2025, Tutorial 4)

Sink every node from the bottom up (nodes floor(n/2) down to 1; leaves need nothing). A node at height h costs O(h) and there are at most n/2^(h+1) of them (2^(k−h) when n = 2^(k+1) − 1). Total

Σ_{h} h · n/2^(h+1) = (n/2) Σ h/2^h ≤ (n/2)·2 = O(n), because Σ_{h≥1} h/2^h = 2.

Inserting one by one instead costs Σ log i = Theta(n log n). Fall 2025's version: merge two heaps of equal size under a new root and sink the root, bottom up; same sum.

### 6.4 Heap designs that have been on midterms

- k-way merge (Tutorial 4): min-heap of size k holding (value, array index, position). Pop the min, append it, push the next element from the same array. N elements each inserted and extracted once: O(N log k), space O(k). Also: sort a k-nearly-sorted array in O(n log k) with a heap of size k + 1.
- Running median (Tutorial 4): max-heap of the lower half, min-heap of the upper half, sizes differ by at most 1. Insert into the correct side, rebalance by moving one root. Median = root of the bigger heap or the average of both roots. Insert O(log n), query O(1).
- Sliding window max (Tutorial 5): max-heap of (value, index). Insert each new element; while the root's index has left the window, pop it (lazy deletion). Root is the answer. Each element inserted and popped once: O(n log n) in general; with a position map so the outgoing element is deleted at once, the heap stays at size W and it is O(n log W). The deque from deck 01 does it in O(n).
- Top-k largest of n numbers in O(n log k): min-heap of size k, push each number, pop when size exceeds k.
- Largest log n numbers in O(n log log n) (Spring 2026): build-heap in O(n) over the whole array, which turns max-finding into a tree; then extract from a second small heap that holds candidate nodes, log n extractions each on a heap of size O(log n). Or: select the (n − log n)-th element in O(n), then sort the log n survivors in O(log n log log n).
- Minimum over m sets with findmin O(1) and insert O(log m + log n_i) (Spring 2025): one heap per set plus a heap of the m set-minima, with position pointers so a changed minimum can be updated in the top heap.
- d-ary heap (Tutorial 5): children of i are d(i − 1) + 2 ... di + 1, parent of j is floor((j − 2)/d) + 1, height log_d n, insert O(log_d n), extract O(d log_d n). Larger d helps when inserts and decrease-keys outnumber extracts.

### Self-check 6

- Index of the parent of A[13]? (6.) Children of A[5]? (10 and 11.)
- Why is build-heap O(n) when there are n/2 sink calls of O(log n) each? (Most nodes are near the bottom and sink only a few levels; the weighted sum Σ h/2^h converges.)
- Heapsort stable? (No.)

---

## 7. Lower bounds and linear-time sorting (Canvas deck, Tutorial 5)

### 7.1 Decision tree argument (four lines, reuse for any lower bound)

In plain words. A lower bound says "no algorithm of this kind can be faster than this, ever". For algorithms that only learn about the input by comparing two items, there is a counting trick. Each comparison is a yes/no question. After q questions you can tell apart at most 2^q different situations (two answers per question, multiplied). If the problem has L different possible answers, you need 2^q ≥ L, so q ≥ log 2 L. Sorting has n! possible answers (every ordering of the n items), and log(n!) is about n log n, so no comparison sort beats n log n.

Analogy: twenty questions. With 20 yes/no questions you can single out one of at most 2^20 things. If there are more candidates than that, 20 questions cannot be enough.

Formal, write these four lines:

1. Any comparison-based algorithm is a binary decision tree: each internal node is one comparison, each leaf is one output.
2. The tree needs at least one leaf per distinguishable output, so at least L leaves.
3. A binary tree with L leaves has height at least log 2 L.
4. Worst-case number of comparisons = height ≥ log 2 L.

| Problem | Number of outputs L | Bound |
| --- | --- | --- |
| Sort n items | n! | log(n!) = Omega(n log n) |
| Find the k smallest in order | ≥ (n/2)^k, or n!/(n−k)! | Omega(k log n) |
| Merge two sorted arrays of n | C(2n, n) | log C(2n, n) ≈ 2n − O(log n) = Omega(n) |
| Find the minimum | n | log n (adversary argument gives the true n − 1) |

Why log(n!) = Omega(n log n): n! ≥ (n/2)^(n/2), so log(n!) ≥ (n/2) log(n/2). Mergesort and heapsort match, so they are optimal among comparison sorts.

### 7.2 Counting sort (keys are integers in 0..k)

```
C[0..k] ← 0
for j ← 1 to n: C[A[j]] ← C[A[j]] + 1             // counts
for v ← 1 to k: C[v] ← C[v] + C[v − 1]             // C[v] = number of keys ≤ v = last slot for v
for j ← n downto 1: B[C[A[j]]] ← A[j]; C[A[j]] ← C[A[j]] − 1
```

Theta(n + k) time and space. Scanning backwards makes it stable: the last copy of a value takes the last slot. Scanning forwards would reverse equal keys. Useful alone only when k = O(n).

Range query in O(1) after O(n + k) preprocessing: the prefix-sum array C answers "how many keys in [a, b]" as C[b] − C[a − 1].

### 7.3 Radix sort

Sort by the least significant digit first, then the next, each pass with a stable sort (counting sort). After the pass on digit t, the array is sorted by the lowest t digits; stability is exactly what keeps the lower digits in order when a higher digit ties. Correctness is induction on the digit position.

d digits in base k: Theta(d (n + k)). For w-bit keys and base k: Theta(ceil(w / log k) · (n + k)). Best base is k = n, giving Theta(ceil(w / log n) · n).

Rule: radix sort is linear iff keys have O(log n) bits iff the range is polynomial in n.

| Range | Bits w | Base-n radix time | Linear |
| --- | --- | --- | --- |
| n³ (any n^c) | Theta(log n) | 3 passes, Theta(n) | yes |
| n^(ln n) | Theta(log² n) | Theta(n log n) | no, ties comparison sorting |
| 2^Theta(n) | Theta(n) | Theta(n²/log n) | no |

Sort n fractions p_i/q_i with p, q in [1, n] in O(n): two distinct fractions differ by at least 1/n² (the cross-product difference is a positive integer over q1 q2 ≤ n²), so the integer key K_i = floor(n² p_i / q_i) in [n, n³] preserves the order; radix sort the keys in base n with 3 passes. Floats fail because gaps below 1/n² fall under double precision for large n. Do not reduce by gcd (Euclid costs log n each).

Bucket sort: n buckets for uniformly distributed reals in [0, 1), insertion sort each bucket. Expected Theta(n). Different assumption (distribution, not range).

### Self-check 7

- Sort n integers in [0, n²) in O(n)? (Two passes of counting sort in base n.)
- Why not counting sort directly on [0, n³)? (Theta(n + n³).)
- Lower bound to find the largest 3 numbers in order? (log(n(n−1)(n−2)) = Theta(log n); true answer n + O(log n) by other arguments, but the decision tree gives only Omega(log n).)

---

## 8. Exam protocol (Oct 14 announcement)

- Closed book, one A4 cheat sheet, no calculator. Pseudocode or plain language both fine.
- No correctness proofs required. A brief running-time justification is required: name the recurrence or count the loop.
- Taught algorithms and data structures are black boxes. If you modify one, explain the modification fully. Define the input and output of every subroutine you name.
- Answer structure that scores: (1) idea in two sentences, (2) pseudocode or steps, (3) subroutine I/O, (4) running time with one line of justification, (5) sanity check on a tiny example if time allows.
- A/B/U rows: simplify, compare on the ladder, write the one-line reason (for example "log(n!) = Theta(n log n) by Stirling").
- Recurrence "from first principles": unroll three times, state the general level i, say where it stops, evaluate the geometric sum, give Theta(n^a (log n)^b).
- Heap drawing: array and tree after every single insert.
- Expectation: indicator sentence, probability, sum. Never skip the sentence.
- Time: 2 hours for 45 to 60 points. Roughly 2 minutes per point. Do Q1 (asymptotics) first for safe marks, then the heap question, then the rest.

## Final 2-minute self test (answers in brackets)

1. 2T(n/2) + n log n? (n log² n.)
2. log 2 n vs log 3 n? (Theta.)
3. n^(1/log n)? (Constant: n^(1/log n) = 2.)
4. Expected comparisons of randomized quicksort between z_i and z_j? (2/(j − i + 1).)
5. Boxes to collect all n coupons? (n H_n.)
6. Build-heap cost? (O(n).) Insert? (O(log n).)
7. Comparison sort lower bound and why? (Omega(n log n), n! leaves.)
8. Radix sort linear when? (Range polynomial in n, base n.)
9. k-way merge time? (O(N log k).)
10. Karatsuba recurrence and answer? (3T(n/2) + n, n^1.585.)

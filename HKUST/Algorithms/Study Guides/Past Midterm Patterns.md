# COMP3711 midterm: what the past papers say will be asked

Written 2026-10-15 from all 11 midterms in `resources/Past Exams/` (Spring 2015 to Spring 2026). Spring 2015 exists only as a solution sheet, so its questions were inferred from the answers.

## What the Oct 16 midterm covers, and the source

- The Sep 18 Canvas announcement "Midterm exam venue and date" says: covers topics from "prerequisites" to "Sorting in linear time". Those are the titles of the lecture decks on the Canvas Lecture Materials page.
- In lecture order that is: 01 Prerequisites and Asymptotics, 02 Binary Search, 03 Mergesort (merge, inversions), 04 Maximum Subarray, 05 Integer and Matrix Multiplication, 06 Randomized Algorithms, 07 Quicksort and Selection, then the two decks that are on Canvas only: Heap and Heapsort, and Sorting Lower Bound and Linear-Time Sorting. Tutorial 5 (heaps, linear-time sorting) is the last in-scope tutorial; Tutorial 6 (greedy) is marked after the midterm.
- The Oct 14 announcement "Instructions for the midterm exam" sets the rules: closed book, one A4 cheat sheet, no calculator, pseudocode or plain language, define input and output of every subroutine, no correctness proofs needed, brief running-time justification required.
- Greedy, Huffman, dynamic programming, and graphs are not in that range. They appear in the 2015 to 2022 papers because the course order was different then; ignore those questions.

## Tally across the 11 papers

| Question type | Papers | Count |
| --- | --- | --- |
| Asymptotic comparison (A/B/U table, or order the functions) | all 11 | 11 |
| Solve recurrences (closed form, Theta) | S15, F15, S16, F17, S19, F22, S25, F25, S26 | 9 |
| Heap trace (insert, extract, build, draw the tree) | S15, F15, S16, F16, F18, F25, S26 | 7 |
| Heap used in an algorithm design (k-way merge, sliding window, top-k, heap of heaps) | F17, F22, S25, F25, S26 | 5 |
| Expectation with indicator random variables | S15, F15, S16, F16, F18, S19, S25, F25, S26 | 9 |
| Divide and conquer algorithm design | F15, S16, F16, F17, F18, F22, F25 | 7 |
| Binary search variant on a sorted array | S15, F22, S25, S26 | 4 |
| Sorting facts (stable, best or worst case, which sort when) | S15, F15, F16, F18, S19, F25 | 6 |
| Decision tree or counting lower bound | F16, S19, S25, F25 | 4 |
| Radix or counting sort (trace or use) | S15, F18, S19, F22, F25 | 5 |
| Greedy, Huffman, DP (out of scope now) | F15, S16, F16, F17, F18, S19, F22 | 7, none since 2022 |

## The current format (Spring 2025, Fall 2025, Spring 2026)

- 4 to 6 questions, 45 or 60 points, 2 hours, lots of blank space per question.
- Question 1 is always asymptotics: an A/B/U table of 5 rows (one row is a recurrence you must solve first), plus one recurrence solved "from first principles, do not use the Master Theorem", in the form Theta(n^a (log n)^b). Fall 2025 asked for the recursion tree with level 0, 1, 2, general level i, and the leaf count.
- One heap question: draw the min-heap after each insertion of an 8-number sequence (0.5 marks off per mistake), then a design part that uses a heap (merge heaps bottom-up and prove build-heap is O(n); output the largest log n numbers in O(n log log n); maintain m sets with findmin O(1) and add O(log m + log n_i)).
- One randomization question: coupon collector variants (expected boxes for n/2 coupons is Theta(n); expected distinct coupons after n boxes is n - n(1-1/n)^n), or expected cost of a randomized search (random-access binary search, O(n) expected).
- One searching or divide and conquer design: output the Theta(log n) distinct values of a sorted array with frequencies in O(log^2 n); kth smallest in the union of two sorted arrays in O(log k).
- Short parts (3 to 4 marks each): radix sort pass-by-pass table; which sort is fastest for a given scenario and its worst-case time; a counting lower bound (k smallest in order needs Omega(k log n) because there are at least (n/2)^k outputs).

## Questions that were reused word for word

- Coupon collector (n/2 coupons, distinct after n boxes): Spring 2025 Q5 and Spring 2026 Q2.
- Distinct values of a sorted array in O(log^2 n): Spring 2025 Q6 and Spring 2026 Q3.
- Heap insert-sequence drawing: Fall 2025 Q2a and Spring 2026 Q4a.
- kth smallest in two sorted arrays: Fall 2017 Q6 and Fall 2025 Q4.
- Partition into k blocks in O(n log k) using linear-time Select: Spring 2016 Q3, Fall 2018 Q6, Fall 2022 Q4.
- Hat-check expectation (own hat: 1; own or better: (n+1)/2): Fall 2015 Q3, Fall 2016 Q8, Spring 2019 Q5.
- Lower bound by counting outputs (decision tree with m leaves has height at least log m): Spring 2019 Q4b, Fall 2025 Q1b.
- Range query on a sorted or small-range array via binary search or counting-sort prefix sums: Fall 2018 Q5, Fall 2022 Q2.

## Most likely paper on Oct 16 (my ranking)

1. A/B/U table with 5 rows including one recurrence row, plus one recurrence solved by expansion or recursion tree. Near certain.
2. Min-heap insert sequence drawing plus a heap-based design with a running-time derivation. Near certain.
3. Expectation via indicator variables (coupon collector, hat check, birthday pairs, or a "how many calls in expectation" question). Very likely.
4. A binary-search or divide-and-conquer design with a target time like O(log^2 n), O(log k), O(n log k), O(n log log n). Very likely.
5. Short facts: radix sort table, which sort for which input, a counting lower bound, stability. Likely as sub-parts.
6. Max subarray, inversions, Karatsuba or Strassen, quicksort or selection analysis. Covered in lectures but rarely a whole question; expect them inside an A/B/U row or as a black box you cite.

## How to use this

- Do Fall 2025 and Spring 2026 first under 2 hours each. They are the exact format.
- Then Spring 2025, Fall 2022 (Q1 to Q4 only), Fall 2018 (Q1 to Q6).
- For 2015 to 2019 papers do only the in-scope questions: asymptotics, recurrences, heaps, sorting facts, lower bounds, randomization, divide and conquer. Solved copies of Fall 2015, Fall 2016, Fall 2017 are in `resources/Past Exams/`.
- All of the following is on side B of the FINAL cheat sheet: the two coupon-collector results, hat-check (n+1)/2, birthday pairs n^2/(2m), the lower-bound template "count outputs, height at least log(count)", the expansion template for a T(n/b) + n^c, and the heap-design templates (k-way merge, top-k with a heap of size k, index pointer into a heap).

# How to use the COMP3711 cheat sheets

Written 2026-10-15, updated the same evening. The sheets below live in this folder. The exam allows one A4 sheet, single or double sided, printed or handwritten. Pick one to bring; print it double sided on one page.

| File | Pages | Who it is for |
| --- | --- | --- |
| `COMP3711 Midterm Cheat Sheet CLEAR (double-sided, bring this).pdf` | 2 sides | **bring this one.** Rebuilt after the "too crammed" feedback: 2 columns, about 8pt, one fact per line, numbered sections 1 to 8 with an index strip at the top of each side, every section opens with an "In words" box then a "Formal" box, then templates, results, pitfalls. Same colour scheme. Covers everything in the FINAL sheet except a few rarely used rows. |
| `COMP3711 Midterm Cheat Sheet FINAL (double-sided, colour).pdf` | 2 sides | the dense version (3 columns, 7.3pt), kept as a backup. Everything: side A theory, side B randomness, heaps, lower bounds, the answer bank from all 11 past midterms, tutorials 1 to 5, lecture decks 01 to 07, and the exam protocol. Colour coded by topic. |
| `COMP3711 Midterm Cheat Sheet (simple, from zero).pdf` | 2 sides | plain-words version: what every symbol means, the pseudocode template, how to draw heaps step by step, the classic expectations with set-ups. Same colour scheme. Read it the evening before. |
| `COMP3711 Midterm Cheat Sheet v1 (colour, side A only).pdf` | 1 side | side A of FINAL on its own, for a single-sided print |
| `COMP3711 Midterm Cheat Sheet v2 (double-sided).pdf` | 2 sides | same content as FINAL without colour (black and white printer) |
| `COMP3711 Midterm Cheat Sheet.pdf` (v1) | 1 side | the original one-sider, kept unchanged |

## Colour code (same on every sheet)

- Blue bar: asymptotics and the A/B/U rule.
- Purple bar: recurrences.
- Green bar: binary search and divide and conquer. Green-edged grey boxes are pseudocode.
- Orange bar: sorting and selection.
- Red bar: randomization and expectation.
- Teal bar: heaps.
- Brown bar: decision trees and lower bounds.
- Slate bar: past-exam answer bank. Black bar: exam protocol.
- Block types: blue box = definition; green box = template to copy; yellow box = result or derivation to quote; red box = pitfalls. Yellow highlight = a formula to memorise.
- On FINAL and v1, every blue definition box starts with an "In words" sentence (plain-English meaning, a tiny example) followed by "Formal" (the exact wording to write on the exam). Sections A1, A2, B1, B2, B3 have them. v2 (black and white) does not have the "In words" lines.

## What is where on FINAL (and v2)

Side A (theory, numbered A1 to A4) and side B (applications and exam bank, numbered B1 to B5). Each box has a black header bar, so scan the bars first.

**Side A**
- **A1 Asymptotics**, top left. Definitions of O, Omega, Theta; the growth ladder; the rewrite rules (a^(log_b n) = n^(log_b a), added vs multiplied constants in exponents, 2^f vs 2^g); sums and the half trick; harmonic numbers. The last paragraph is the A/B/U decision rule: when a one-sided bound forces the answer and when it leaves it U.
- **A2 Recurrences**, left and middle. The Master theorem in the course's form, the expansion template to copy out, the recursion-tree table layout, the substitution trick for T(sqrt n). Then the big table of about 30 recurrences with answers. Look up the recurrence first, then write the expansion to justify it.
- **A3 Binary search and divide and conquer**, middle. Pseudocode for binary search, lower bound, rotated array, last zero, galloping, last occurrence, and the distinct values in O(log^2 n) routine. Then the k-th smallest of two sorted arrays. Then the design template and the "hints in the target bound" line, which maps a required running time to the technique. Then one-liners for mergesort, inversions, max subarray, Karatsuba, Strassen, closest pair, majority, k blocks.
- **A4 Sorting and selection**, right. Partition, quicksort, Select, Fisher-Yates, counting sort, radix sort pseudocode; the quicksort and selection proofs; the sorting facts table (worst case, stable, space); when radix sort is linear; which sort to pick for which input; range queries.

**Side B**
- **B1 Randomization**, top left. The recipe (indicator variables, linearity, waiting times) and a table of every classic result with its decomposition: hat check, coupon collector in four variants, birthday pairs, hashing, local minima, random-access search, fair-coin generator.
- **B2 Heaps**, left and middle. Array indexing, insert, extract, delete with a position map, build-heap in O(n) with the sum written out, the Fall 2025 bottom-up build, d-ary heaps, sliding window max, the Fall 2022 update routine. Then every heap design that has appeared on a midterm: k-way merge, running median, largest log n numbers in O(n log log n), minimum over m sets.
- **B3 Decision trees and lower bounds**, middle. The four-line template and the counts for sorting, k smallest in order, block lists, merging, median of three, minimum of four.
- **B4 Past-exam answer bank**, middle and right. Every A/B/U row from the 11 papers with its answer; the order-the-functions answers; the recurrence derivations that were asked "from first principles", written out; a list of every design question that recurred, with the idea and the time.
- **B5 Exam protocol**, bottom right. Time budget, the five-part answer structure, the sentences that earn marks, the pitfalls list, and the math facts (logs, Stirling, binomial bounds, geometric sums).

## Where things are on CLEAR

Side A: 1 Asymptotics (definitions, ladder, rewrite rules, sums, A/B/U rule, reused rows) · 2 Recurrences (expansion template, Master cases, lookup table) · 3 Binary search and divide and conquer (pseudocode block, one-line algorithms, design answer template) · 4 Sorting and selection (partition, quicksort, select pseudocode, the two proofs, sorting facts table). Side B: 5 Randomness (recipe, table of every classic expectation) · 6 Heaps (formal ops, drawing steps, build-heap proof, design table) · 7 Lower bounds and linear sorting (four-line template, counts table, counting and radix sort, when radix is linear) · 8 Exam protocol and math facts.

## How to navigate it in the exam

1. Read the question and classify it: asymptotics, recurrence, search or divide and conquer, sorting, randomization, heap, lower bound. Go to that box.
2. For A/B/U: simplify each entry, then check the B4 table for the same pair (many are reused). If it is not there, apply the rule at the end of A1.
3. For a recurrence: find it in the A2 table, then copy the expansion template and fill in a, b, f. If it has a log in f or a square root, use the two special lines under the template.
4. For a design question: read the target bound, find the matching hint in A3, then find the closest recurring question in B4 and adapt its idea. Write the answer in the five-part structure from B5.
5. For a heap drawing: B2 first paragraph. Draw the tree and the array after every insert.
6. For an expectation: B1 table. Find the closest classic, copy its decomposition, change the probability.
7. For a lower bound: B3 template. Count outputs, take the log.
8. Before handing in: run down the pitfalls list in B5.

## How to use the simple sheet

Read it once the evening before as a self-test: cover the right column of each table and say the answer. Section 4 (how to write an algorithm answer) and section 6 (how to draw heaps) are the two things most students lose marks on; copy their formats exactly.

## Suggested routine with these sheets

- Tonight: do Fall 2025 and Spring 2026 under time with v2 next to you. Mark in pencil every item you had to look up.
- Tomorrow: do Spring 2025 and the solved Fall 2016 and Fall 2017 in-scope questions. Anything you looked up twice, write by hand in the margin of the printed v2 (handwriting is allowed on a printed sheet).
- Print v2 double sided on one A4 page. Print the simple sheet separately for reading; do not bring both into the exam, only one A4 sheet is allowed.

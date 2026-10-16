# How to think about a design question (COMP3711 midterm)

Written 2026-10-16 from the design questions in the Fall 2025, Spring 2025 and Spring 2026 midterms. Use with the CLEAR cheat sheet: section 3 (target-time table, answer shape), section 4 (sorting black boxes), section 5 (expectation), section 6 (heap designs), section 7 (lower bounds).

## The 5-step loop

1. **Read the target time first.** It is the biggest hint. Look it up in the section 3 table.
   - O(log n): one binary search on something monotone.
   - O(log^2 n): log n binary searches, or a binary search inside a binary search.
   - O(log k): binary search where the "size" is k, not n (halve k each step).
   - O(n): one pass, build-heap, counting sort, or a geometric series of shrinking work.
   - O(n log k) or O(k log n): a heap of size k, or k heap operations.
   - O(n log log n): pieces of size log n (sorting a piece costs log n log log n) or a heap of size log n.
   - O(n log n): sort first, then something linear.
   - findmin O(1) with insert O(log): a heap; "m sets" means a heap of heaps.
2. **Find the structure the brute force ignores.** The question often says "scanning takes O(n), too slow". Ask: what is special about the input? Sorted means binary search. Many duplicates means runs. Only log n items wanted means do not sort everything. Pointers to parent and children means you can sift.
3. **Pick black boxes and name their input and output.** Allowed: sort, binary search, Partition, Select, Merge, counting sort, radix sort, heap insert, extract, sift down, build-heap. Write "Sort(B) returns B in increasing order" style lines.
4. **Write in the answer shape.** Idea in one sentence. Numbered steps. Why it is correct in one or two sentences (an invariant: "after step i, ... holds"). Time: cost per step times number of steps, then the sum, naming the series.
5. **Check.** Does the target time appear in your sum? Boundary case (k = 1, empty set, last run)? Stop condition when a count is not given?

## The six moves behind the past design questions

| Past question | Move | How it looks |
| --- | --- | --- |
| Distinct numbers with frequencies in O(log^2 n) (Spring 2025, 2026) | Binary search for the boundary, repeat | Sorted array = runs. Binary search for the end of the run starting at p (precondition A[p] = x). Next run starts at k+1. Stop when the end is n. m = Theta(log n) runs times O(log n) each. |
| Largest log n numbers in O(n log log n) (Spring 2026) | Chop into blocks of size log n | n / log n blocks. Sort each: log n times log log n, total n log log n. Heap of the block heads (n / log n inserts of log n each = O(n)). Pop and refill log n times: O(log^2 n). First step dominates. |
| m sets with findmin O(1), add O(log m + log n_i) (Spring 2025) | Heap of heaps with a position map | One heap per set. A top heap of the m minimums. add: insert into set heap (log n_i); if it is the new minimum, update its entry in the top heap and bubble up (log m), updating the position pointers of whatever you swap. |
| k-th smallest of two sorted arrays in O(log k) (Fall 2025) | Throw away k/2 at a time | Compare A[k/2] with B[k/2]. The smaller side's first k/2 elements cannot be the answer; discard them, search for the (k/2)-th in what is left. k halves each call, O(1) per call. Treat a missing element as infinity. k = 1: return min(A[1], B[1]). |
| Build a heap in O(n) from pairs of heaps (Fall 2025) | Merge bottom-up by levels, sum a geometric series | Make a new root over two heaps of size 2^k - 1, sift the root down: O(k). Level k has 2^(m-k-1) merges. Total sum k 2^(m-k) = O(2^m) = O(n). |
| Random-access database search, expected O(n) cost (Fall 2025) | Good step with probability 1/2 removes a quarter | Binary search where the probe is random. A probe in the middle half is "good" (probability 1/2) and shrinks the range to 3/4. Expected 2 probes per good step. Cost at most sum 2 (3/4)^i n = 8n. Same analysis as Select. |
| k smallest in order needs Omega(k log n) comparisons (Fall 2025) | Count outputs, take the log | Outputs at least n(n-1)...(n-k+1) >= (n/2)^k. Decision tree height >= log of that = k log(n/2) = Omega(k log n). |

## Being creative under time pressure

- Generate three candidate tools from the target time, then try the simplest one first. Most midterm designs are one tool plus one trick.
- If stuck, solve the problem for a tiny case by hand (n = 8, k = 2) and watch what you did. The algorithm is usually what your hands did.
- If the brute force is named in the question, your job is to beat it by using one property of the input. Name that property in your first sentence.
- When the time has two parts (log m + log n_i), the algorithm has two parts, one per term.
- When the time is n times something small, the something small is the cost per element: sort within a small block, or one heap operation on a small heap.
- Do not invent a new data structure. Combine two taught ones.

## Marks you can lose for free

- Not saying the input and output of each subroutine.
- Not stating the stop condition when a count is "not given".
- Not summing the running time: write the sum and name it (geometric, equal rows, harmonic).
- Forgetting the expected-time wording for randomized algorithms: "expected number of ... is ... by linearity" or "each stage lasts 1/p steps on average".


Input: finite sequence of numbers.
Output: sorted permutation of input sequence.

Elements usually ints

Intuitive working:
- Array consists of Sorted and Non-Sorted sections
- Go through array, insert each Current Element into the correctly-sorted place among Already-Sorted Elements
	- Insert by checking against already-sorted part and swapping into correct position

- Work depends on sortedness of list
	- best-case already-sorted; worst-case inverse sort.
- Best-case scenario $T(N)$
- Worst-case:
- $T(n) = an^2 + bn + c$; $T(n) \le dn^2$




# **Algorithm:**
```
Algorithm insertionSort(A, n = A.length):
	for j = 2; j <= n:
		key = A[j]
		i = j - 1
		while i > 0 && A[i] > key:
			A[i + 1] = A[i]
			i -= 1
		A[i + 1] = key
```


# Questions:

- Slight optimisation?
- Recursive version?
- Adapt to other orderings?



- Pseudocode correct?
	- How to show this?
	- Loop invariant:
		- Invariant *I*: at the start of for-loop, sub-array A \[1 ... $j$ - 1\] is sorted permutation of sub-array A \[1 ... $j$ - 1\] at the beginning
		- init: *I* holds for $j$ = 2
		- Loop: Assuming *I* holds for $j$ = $k$, *I* holds true for $j = k+1$
			- ![[Pasted image 20221103155532.png]]
			- ![[Pasted image 20221103155832.png]]
		- End: *I* holds after the loop has run
			- ![[Pasted image 20221103160118.png]]
		- Invariant difficult to find (cannot be automated); not used universally (eg mergesort uses induction instead)
	- 
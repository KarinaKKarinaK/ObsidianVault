# Assumptions

- There is a finite (and relatively small) number of possible elements.

# Intuition

- Create array of possible values `C`
- Iterate through array, increment `C[A[i]]`
- Iterate through `C`, update it so that it shows the number of elements *up to or equal to* $i$
- Create a new array `B` of the same length as `A`.
- Iterate through the original array in reverse; for each `A[i]` copy `A[i]` to `B[C[A[i]]]`, then decrement `C[A[I]]`

# Pseudocode

```
Algorithm countingSort(A, B, k): 
	new array C[0 . . . k] 
	for i = 0; i <= k:
		C[i] = 0 
	for j = 1; J < A.length:
		C[A[j]] += 1 
	for i = 1; i < k:
		C[i] += C[i − 1]
	for j = A.length; j >= 1; j--:
		B[C[A[j]]] = A[j] 
		C[A[j]] -= 1
```

# Efficiency

![[Pasted image 20221118175110.png]]

![[Pasted image 20221215145825.png]]

# Pseudocode:

```
Algorithm binarySearch(k, A, l, r): // A = sorted array
	if a > r: 
		return false
	else:
		i = floor((l + r) / 2)
		if k < A[i]:
			binarySearch(k, A, l, i - 1)
		if k == A[i]:
			return i
		if k > A[i]:
			binarySearch(k, A, i + 1, r)
```
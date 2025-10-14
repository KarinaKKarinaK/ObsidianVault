

```
Algorithm mergeSort(A, p, r)
if p < r:
	q == ceil((p + r)/2)
	mergeSort(A, p, q)
	mergeSort(A, q+1, r)
	merge(A, p, q, r)
```

Merge (intuitive):
-> n = 1
-> compare the first element of both arrays.
-> append the smaller of the two to resultant array.
-> iterate to next element of popped array
-> repeat.

- in odd-numbered arrays, array 1 will be larger
- 
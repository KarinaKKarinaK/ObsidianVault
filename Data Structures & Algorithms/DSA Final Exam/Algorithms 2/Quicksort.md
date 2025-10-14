
# Idea

- Take a list
- Choose a pivot
- Split list into elements below the pivot and elements above the pivot
- Recursively sort smaller part
- Recursively sort larger part

![[Pasted image 20221118134811.png]]

# Pseudocode

```
Algorithm quickSort(A, p, r):
	if p < r:
		q = partition(A, p, r)
		quickSort(A, p, q - 1)
		quickSort(A, q+1, r)
	
```

## Correctness

![[Pasted image 20221118141739.png]]

## Runtime

![[Pasted image 20221118141838.png]]
![[Pasted image 20221118142112.png]]
![[Pasted image 20221118142139.png]]
![[Pasted image 20221118142156.png]]
![[Pasted image 20221118142226.png]]
![[Pasted image 20221118142243.png]]




# Partition

## Intuition

- Return array with all elements lower than the pivot followed by all elements higher than the pivot, along with the position of the last Small element
- Iterate through the array, keeping track of where the last Small element is; if a Small element is encountered, swap with the first Large element, and update the position

## Algorithm

```
Algorithm partition(A, p, r):
	// p, r = first and last index to be sorted

	x = A[r] // select pivot
	i = p - 1
	for j = p; j <= r - 1:
		if A[j] <= x:
			i += 1
			swap (A[i], A[j])
	swap (A[i+1, A[r]]) // last index == pivot, so put in small part
	return A[i+1]
```

## Runtime

![[Pasted image 20221118140723.png]]

## Correctness

- Loop Invariant
	- Sorted part of the array consists of $i - p$ Small elements, followed by $(j - p) - i$ Large elements
	- In other words, the part up to $i$ contains all current Small elements, and the part from $i$ to $j$ contains all current Large elements

![[Pasted image 20221118141600.png]]
![[Pasted image 20221118141608.png]]
![[Pasted image 20221118141615.png]]



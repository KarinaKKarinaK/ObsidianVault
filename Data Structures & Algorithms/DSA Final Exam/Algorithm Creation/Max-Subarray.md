# The Problem

You have an array with ints. What is the maximum sum of a sub-array?

![[Pasted image 20221216134150.png]]


# The Solutions

## A Terrible One

- go through all possibilities; for each start, test each end
- $O(n^2)$

```
Algorithm maxSubArray(A, n):
	max = 0
	for left = 1; left <= n:
		sum = 0
		for right = left; right <= n:
			sum = sum + A[right]
			if sum < max:
				max = sum
	return max
```

## A Slightly Better One

![[Pasted image 20221216134421.png]]


![[Pasted image 20221216134503.png]]
![[Pasted image 20221216134432.png]]

![[Pasted image 20221216134527.png]]


## The Nice One (Dynamic Programming)

![[Pasted image 20221216134552.png]]

```
Algorithm maxSubArray(A, n):
	new array B
	B[1] = max(A[1], 0)
	m = B[1]
	for r = 2; r <= n:
		B[r] = max(0, B[r-1] + A[r])
		m = max(m, B[r])
	return m
```

This runs in $O(n)$ time.


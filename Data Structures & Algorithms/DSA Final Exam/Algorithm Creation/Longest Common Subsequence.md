
(or LCS if you want to sound cool)
# Problem

Given two sequences over some alphabet, find (the length of) their longest common subsequence
$X = \langle x_1, \dots, x_m \rangle$
$Y = \langle y_1, \dots, y_n \rangle$
- a *subsequence* is obtained by removing elements; doesn't have to be uninterrupted in original

![[Pasted image 20221216141227.png]]


# Approaches

## Brute-Force

- Consider every subsequence of X
- Keep track whether also subsequence of Y
- Keep track of longest success found

There are $2^m$ subsequences of X so this is terrible

## Recursion

![[Pasted image 20221216141851.png]]

## Dynamic Programming

![[Pasted image 20221216141910.png]]

```
Algorithm LCS(X, Y):
	new Array C[0 ... m][0 ... n]
	for i = 0; i <= m:
		C[i, 0] = 0
	for j = 0; j <= n:
		C[0, j] = 0
	for i = 1; i <= m:
		for j = 1; j <= n:
			if x_i == y_j:
				C[i, j] = C[i - 1, j - 1] + 1
			else:
				C[i, j] = max(C(i, j-1), C(i-1, j))
	return C
```

![[Pasted image 20221216142307.png]]



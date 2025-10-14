
# The Problem

Given a set with $n$ items, with each item $i$ having a weight $w_i$ and benefit $b_i$
Given a maximum total weight $W$

Give subset of items $T \subseteq S$ to maximise $\sum_{i \in T} b_i$
under constraint $\sum_{i \in T} w_i \leq W$

# The Solutions

## Naive Approach

- consider all $2^n$ possible subsets $T$
![[Pasted image 20221216135438.png]]

```
Algorithm 01Knapsack(S, W):
	new Array B[0 ... n][0 ... W]
	for w = 0; w <= W:
		B[0, w] = 0
	for k = 1; k < n:
		B[k, 0] = 0
		for w = 1; w <= W:
			if w_k <= W:
				B[k, w] = max(B[k-1, w], B[k-1, w - w_k] + b_k)
			else:
				B[k, w] = B[k-1, w]
```

![[Pasted image 20221216135843.png]]
![[Pasted image 20221216135851.png]]

## The Better Solution

- improvement on space complexity; uses only one array

```
Algorithm 01Knapsack(S, W):
	for w = 0; w <= W:
		B[w] = 0
	for k = 1; k <= n:
		for w = W ... w_k:
			if B[w - w_k] + b_k > B[w]:
				B[w] = B[w - w_k] + b_k
```

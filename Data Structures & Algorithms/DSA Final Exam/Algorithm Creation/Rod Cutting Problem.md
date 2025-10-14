- Optimisation problem
- Rod of n units
- Table of prices $p_i$ for $i = 1, \dots, n$ units
- Determine maximum revenue $r_n$

$2^{n-1}$ possibilities of cutting the rod

# Algorithm

## The Terrible One (Recursive)

```
Algorithm rodCuttingRec(p, n):
	if n == 0:
		return 0
	q = -inf
	for i = 1; i <= n:
		q = max(q, p[i] + rodCuttingRec(p, n - i))
	return q
```

This is terrible:
- loop i times
- For each, recur

![[Pasted image 20221215180313.png]]

This leads to $O(2^n)$ time complexity:
![[Pasted image 20221215180319.png]]

## The Okay One (Dynamic Programming)

```
Algorithm rodCuttingDP(p, n):
	new array b[0 ... n]
	b[0] = 0
	for j = 1; j <= n:
		q = -inf
		for i = 1; i <= j:
			q = max(q, p[i] + b[j-i])
		b[j] = q
	return b[n]
```

![[Pasted image 20221216134045.png]]
![[Pasted image 20221216134057.png]]




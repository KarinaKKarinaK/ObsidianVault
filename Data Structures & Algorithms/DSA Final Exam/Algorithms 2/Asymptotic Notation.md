 



# Theta Notation

![[Pasted image 20221103161037.png]]

For the following algorithm:
```
Algorithm find(k, A):
	for i = 1; i < A.length:
		if A[i] == k
			return true
	return false
```

Worst-case scenario:
	$T(n) = c_1(n + 1) + c_2 \cdot c_2 + c_3 \cdot n + c_4$ 
	$= \Theta(n)$

![[Pasted image 20221103163701.png]]

![[Pasted image 20221103164229.png]]

![[Pasted image 20221103165225.png]]

![[Pasted image 20221103165501.png]]
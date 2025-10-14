
# Definition

![[Pasted image 20221215174422.png]]

# Algorithm

## The bad one (recursive)

```
Algorithm fib(n):
	if n == 1 || n == 2:
		return 1
	else:
		return fib(n-1) + fib(n-2)
```

## The okay one (iterative)

```
Algorithm fib(n):
	new Array r[n]
	r[1] = 1
	r[2] = 1
	for i = 3; i <= n:
		r[i] = r[i-1] + r[i-2]
	return r[n]
```

![[Pasted image 20221215175943.png]]

## The scuffed one (bitwise xor)

*TODO:* deal with [this](https://akos.ma/blog/fibonacci/) later

# Miscellanea

![[Pasted image 20221215175632.png]]
![[Pasted image 20221215175652.png]]
![[Pasted image 20221215175641.png]]
![[Pasted image 20221215175747.png]]
![[Pasted image 20221215175757.png]]
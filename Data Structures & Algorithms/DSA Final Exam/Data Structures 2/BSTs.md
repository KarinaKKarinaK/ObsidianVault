- Type of tree
- Main purpose = search, add, delete

![[Pasted image 20221215150334.png]]

# Implementation

![[Pasted image 20221215150342.png]]

# Operations

## Query

Intuitive example:
![[Pasted image 20221215150440.png]]
Runtime in $O(h)$

### Pseudocode (Recursive)

```
Algorithm treeSearch(v, k):
	if v == null || k == v.key:
		return v
	if k < v.key:
		return treeSearch(v.left, k)
	else:
		return treeSearch(v.right, k)
```

### Pseudocode (Iterative)

```
Algorithm treeSearchIterative(v, k):
	while v != null && k != v.key:
		if k < v.key:
			v = v.left
		else:
			v = v.right
	return v
```

## Min, max

![[Pasted image 20221215150959.png]]
![[Pasted image 20221215151007.png]]

(input: non-null node in BST)

```
Algorithm treeMin(x):
	while x.left != null:
		x = x.left
	return x
```

```
Algorithm treeMax(x):
	while x.right != null:
		x = x.right
	return x
```

## Successor (next node in in-order):

Intuition:
![[Pasted image 20221215151443.png]]
(if unclear, draw a binary tree, pick a node, follow above slide)

```
Algorithm treeSuccessor(x):
	if x.right != null:
		return treeMin(x.right)
	y = x.parent
	while y != null & x == y.right:
		x = y
		y = y.parent
	return y
```


## Adding

(this isn't even the worst part yet

![[Pasted image 20221215152405.png]]

```
Algorithm insert(T, z):
	y = null
	x = T.root
	while x != null:
		y = x
		if z.key < x.key:
			x = x.left
		else:
			x = x.right
	z.parent = y
	
	if y = null:
		T.root = z
	elif z.key < y.key:
		y.left = z
	else:
		y.right = z
```


## Removal

(this is fucking horrible)

### Intuition

![[Pasted image 20221215152806.png]]

![[Pasted image 20221215152638.png]]
![[Pasted image 20221215152656.png]]
![[Pasted image 20221215152704.png]]
![[Pasted image 20221215152720.png]]
![[Pasted image 20221215152744.png]]
![[Pasted image 20221215152751.png]]

### Pseudocode

```
Algorithm treeDelete(T, z):
	if z.left == null:
		transplant(T, z, z.right)
	elif z.right == null:
		transplant(T, z, z.left)
	else:
		y = treeMin(z.right)
		if y.parent != z:
			transplant(T, y, y.right)
			y.right = z.right
			y.right.parent = y 
		transplant(T, z, y)
		y.left = z.left
		y.left.parent = y
```

```
Algorithm transplant(T, u, v):
	if u.parent == null:
		T.root = v
	elif u == u.parent.left:
		u.parent.left = v
	else:
		u.parent.right = v
	if v != null:
		v.parent = u.parent
```


# Time Complexity

![[Pasted image 20221215153956.png]]
![[Pasted image 20221215154007.png]]

# Misc Notes & Improvements

![[Pasted image 20221215154022.png]]

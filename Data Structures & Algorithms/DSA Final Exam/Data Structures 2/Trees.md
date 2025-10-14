
# Definitions

![[Pasted image 20221114141101.png]]
![[Pasted image 20221215141509.png]]
![[Pasted image 20221114141123.png]]
![[Pasted image 20221114141132.png]]
![[Pasted image 20221114141152.png]]

# Implementation (array)

- Almost-complete binary trees use this implementation:

![[Pasted image 20221214124122.png]]
![[Pasted image 20221114141201.png]]


# Implementation (linked)

![[Pasted image 20221215141607.png]]


# Traversal

- Node first, then successors (pre-order)
- Successors first, then node (post-order)
- Left subtree, then node, then right subtree (in-order)

## Pre-Order Traversal

```
Algorithm preOrder(v):
	if v != null:
		visit(v)
		if v.left != null:
			preOrder (v.left)
		if v.right != null:
			preOrder (v.right)
```

## Post-Order Traversal

```
Algorithm postOrder(v):
	if v != null:
		if v.left != null:
			postOrder (v.left)
		if v.right != null:
			postOrder (v.right)
		visit(v)
```

## In-Order Traversal

```
Algorithm inOrder(v):
	if v != null:
		if v.left != null:
			inOrder (v.left)
		visit(v)
		if v.right != null:
			inOrder (v.right)
```

## Euler Traversal

![[Pasted image 20221215144921.png]]

(This basically generalises pre-, post-, in-order traversal into (left, below, right); key-getting may be in either visit() command)

### Pseudocode

```
Algorithm eulerTour(v):
	visitLeft(v)
	if v.left != null:
		eulerTour(v.left)
	visitBelow(v)
	if v.right != null:
		eulerTour(v.right)
```


## Traversal Performance

- Worst-case runtime in $\theta(n)$



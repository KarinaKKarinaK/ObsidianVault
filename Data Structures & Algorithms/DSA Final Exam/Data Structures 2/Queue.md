# Properties

- Linear data structure
- First-in-first-out (FIFO) behaviour
- Intuitively like... a queue

# Implementation

![[Pasted image 20221214145516.png]]
![[Pasted image 20221214145523.png]]

# Operations
*over/underflow exceptions and checks omitted*

## Enqueue / Add

```
Algorithm enqueue(Q, x):
	Q[Q.tail] = x
	if Q.tail == Q.length:
		Q.tail = 1
	else:
		Q.tail += 1
```

## Dequeue / Remove

```
Algorithm dequeue(Q):
	x = Q[Q.head]
	if Q.head == Q.length:
		Q.head = 1
	else:
		Q.head += 1
	return x
```

## First / View first

```
Algorithm first(Q):
	return Q[Q.head]
```

# Misc

- Worst-case complexity for enqueue, dequeue, first is $O(1)$
- Max size predetermined at setup




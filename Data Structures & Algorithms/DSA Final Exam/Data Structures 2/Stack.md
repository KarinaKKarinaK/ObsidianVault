# Properties

- Linear data structure
- Last-in-first-out (LIFO) behaviour
- Intuition: works like a stack of papers


# Implementation

![[Pasted image 20221214144740.png]]


# Operations

## Push / Add

```
Algorithm push(S, x):
	if S.top == N:
		error fullStackException
	else:
		S.top += 1
		S[S.top] = x
```


## Pop / Remove

```
Algorithm pop(S):
	if isEmpty(S):
		error emptyStackException
	else:
		x = S[S.top]
		S.top -= 1
		return x
```


## View youngest (s.top)

```
Algorithm top(S):
	if isEmpty(S):
		error emptyStackException
	else:
		return S[S.top]
```

# Misc

- $O(1)$ worst-case complexity for push, pop, top
- Max size predetermined in this implementation
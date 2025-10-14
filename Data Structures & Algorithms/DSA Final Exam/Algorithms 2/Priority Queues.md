*This uses pseudocode from [[Heapsort]].*

# Purpose

- ADT
- Maintaining dynamic sets
	- sets that change over time
	- insert into middle of the set
- most important element served first

- add: `insert` with priorities `queue` and `key`
- remove: `popMax` pops & returns max key

- implementation: uses max-heap for storing keys
	- $O(\log N)$ for insertion
	- $O(log N)$ for extraction

![[Pasted image 20221118161628.png]]

# Extraction

## Find maximum

- $O(1)$
- Does not update the list

```
Algorithm findMax(H):
	return H[1]
```

## Pseudocode

```
Algorithm popMax(H):
	max = findMax(H)
	H[1] = H[H.heap-size]
	H.heapsize -= 1
	maxHeapify(H, 1) // this is log(n); code below
	return max
```

# Insertion

## Pseudocode

```
Algorighm heapInsert(H, k):
	H.heap-size += 1
	H[H.heap-size] = - \inf
	heapIncreaseKey(H, H.heap-size, k)
```

```
Algorithm heapIncreaseKey(H, i, k):
	if k < H[i]:
		return error
	H[i] = k
	while i > 1 && H[parent(i)] < H[i]:
		swap(H.parent[i], H[i])
		i = parent(i)
```


# Efficiency

![[Pasted image 20221118161710.png]]


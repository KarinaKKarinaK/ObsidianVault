# Intuitive function

- Construct max-heap
- Swap root with last node of heap
- Construct max-heap excluding last node.


# Algorithmic Function

- Two procedures:
	- `buildMaxHeap`
		- turns an array into a max-heap
	- `maxHeapify`
		- make a root with max-heaps as children into a max-heap


# General Pseudocode

```
H[1 ... n] == int array

H.heap-size = H.length


Algorithm heapSort(H):
	buildMaxHeap(H)
	for i = H.length; i >= 2; i--:
		swap(H[1], H[i])
		H.heap-size -= 1
		maxHeapify(H, 1)
```


# Reconstructing Max-Heap Property

- Start with a node with left and right max-heaps.
- Reconstruct max-heap property using *down-heap bubble*.
![[Pasted image 20221115120324.png]]
## Pseudocode:

```


Algorithm maxHeapify(A, i):
	l = left(i)
	r = right(i)
	if l <= A.heap-size && A[l] > A[i]:
		largest = l
	else
		largest = i
	if r <= A.heap-size && A[r] > A[largest]:
		largest = r

	if largest != i:
		swap(A[i], A[largest])
		maxHeapify(A, largest)
```

## Time Complexity:
Intuitive through height:
- Worst-case: Determined by height of bubble; bubble travels to very bottom of tree
	- $T(h) = T(h - 1) + c$ $\therefore T(h) \in \Theta(h)$ 
	- $h \in \Theta(\log n)$
	- $\therefore T(n) \in \Theta (\log n)$

Intuitive through nodes:
![[Pasted image 20221115121728.png]]
![[Pasted image 20221115121853.png]]
![[Pasted image 20221115121911.png]]

# Building a max-heap
Intuition:
- The array is already a tree
- Leaves are, by definition, max-heaps
- Consider highest to lowest indices for non-leaves
- maxHeapify those indices.

![[Pasted image 20221115122058.png]]
![[Pasted image 20221115122141.png]]

## Pseudocode

```
Algorithm buildMaxHeap(H):
	H.heap-size = H.length
	for i = floor(H.length / 2); i >= 1; i--:
		maxHeapify(H, i)
```

## Correctness

![[Pasted image 20221115122331.png]]

## Time Complexity

- $O(\log n)$
- Proof in book


![[Pasted image 20221115122548.png]]

- sorted input: heapify checks that every mini-heap is already heapified; no swaps happen
- O(n) when input is sorted?


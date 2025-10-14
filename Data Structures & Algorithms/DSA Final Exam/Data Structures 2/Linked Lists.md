# Properties

- Linear data structure for dynamic set
- Access to elements
- Each element can access the next
	- doubly linked lists can access previous
- List attribute gives access to head

- Can be singly or double linked
- May or may not have sentinel
- May or may not be circular or ordered

# Singly Linked Lists

## Implementation

For a list `L`:
- `L.head` points to head of the list; `null` if list is empty
For an element `x`:
- `x.next` points to next element in list
- `x.key` returns key

## Operations

- `listInsert(L,x)` inserts element `x` with key `x.key` already set in list `L` 
- `listSearch(L,k)` searches for an element `x` with key `k` in the list `L` 
- `listInsertBefore(L,v,x)` inserts element `x` in list `L` before element `v` 
- `listInsertAfter(L,v,x)` inserts element `x` in list `L` after element `v` 
- `listDelete(L,x)` deletes element `x` from list `L`

# Doubly Linked Lists

## Implementation

For a list `L`:
- `L.head` points to head of the list; `null` if list is empty
For an element `x`:
- `x.next` points to next element in list
- `x.prev` points to previous element in list
- `x.key` returns key

## Operations

Same as for singly linked lists:
- `listInsert(L,x)` inserts element `x` with preset `x.key` in list `L` 
- `listSearch(L,k)` searches for an element `x` with key `k` in the list `L` 
- `listInsertBefore(L,v,x)` inserts element `x` in list `L` before element `v` 
- `listInsertAfter(L,v,x)` inserts element `x` in list `L` after element `v` 
- `listDelete(L,x)` deletes element `x` from list `L`

# Algorithms

## Search
- Input: list, key
- Ouptut: pointer pointing to first matching element in list (or null if not present)
- Intuition: Traverse entire linked list until value found or list traversed

```
Algorithm listSearch(L, k):
	x = L.head
	while x != null && x.key != k:
		x = x.next
	return x
```

- Worst-case complexity in $O(n)$

## Insert
- Input: list, key
- Node added to front of list

```
Algorithm listInsert(L, x):
	x.next = L.head
	// if L.head != null: L.head.prev = x
	L.head = x
	// x.prev = null
```

- Worst-case time complexity in $O(1)$

## Delete
- Intuition: Point adjacent elements to each other
- Input: List, pointer to element to be deleted
- Only possible in doubly linked lists; singly linked lists must first search for previous element.

```
Algorithm listDelete(L, x):
	if x.next != null:
		x.next.prev = x.prev
	else:
		L.head = x.next
	if x.prev != null:
		x.prev.next = x.next
```

- Worst-case time complexity in $O(1)$.
	- If given a key, worst-case complexity in $O(n)$, as we have to search the list for the key.

## Re-insert
- x still has a pointer to its previous and next element
- Therefore, we may sometimes be able to re-insert x (assuming no garbage collection)

```
x.prev.next = x
x.next.prev = x
```

# Sentinels

- Dummy elements (no key)
- Simplify dealing with boundaries
	- `L.null` represents `null`, is start of list
	- `L.null.next` = first element of list
	- `L.null.prev` = last element of list (if doubly linked)

	- If `x` is last element, `x.next` points to `L.null`
	- If `x` is first element, `x.prev` points to `L.null`

	- Empty list is just sentinel `L. null`
	- `L.head` obsolete

## Why?

- usually does not change asymptotic runtime
- may perform marginally better
- may add to clarity

## Sentinel Search

```
Algorithm listSearchSen(L, d):
	x = L.null.next
	while x != L.null && x.key != d:
		x = x.next
	return x
```

## Sentinel Insert

```
Algorithm listInsertSen(L, x):
	x.next = L.null.next
	x.prev = L.null
	L.null.next.prev = x
	L.null.next = x
```

## Sentinel Delete

```
Algorithm listDeleteeSen(L, x):
	x.next.prev = x.prev
	x.prev.next = x.next
```



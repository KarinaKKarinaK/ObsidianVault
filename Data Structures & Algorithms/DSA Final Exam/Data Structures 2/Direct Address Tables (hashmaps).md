
![[Pasted image 20221214183308.png]]

It's a hashmap

A *super fast* explanation can be found [here](https://www.youtube.com/watch?v=vJvqYFKXo5E)

![[Pasted image 20221214183727.png]]
![[Pasted image 20221214183915.png]]
![[Pasted image 20221214183929.png]]


# What the fuck?

Okay, so you have an array that stores a key-value pair that's arbitrarily long. 
Since array access is almost instant, you just run the key through a hash function and access the corresponding index in the array. 
The hash function should be chaotic (basically no way to predict what you'll end up with), must be deterministic (same inputs always yield same outputs)

Take the hash modulo the array length, store the key in that index.

Access works the same way -- hash the key, access the index, access the value.

## Hash Functions

![[Pasted image 20221214185412.png]]
![[Pasted image 20221214185435.png]]


# Collisions

There will almost certainly be collisions, where two different keys will produce the same hash value. In that case, we have two options:

## Chaining

- Every index in the array is actually a list, where all matching key-values are stored
- To access, search linked list for key.
![[Pasted image 20221214185104.png]]

The best way to minimise this problem is to use a hash function which distributes keys uniformly.

![[Pasted image 20221214185244.png]]
![[Pasted image 20221214185302.png]]

So average case with a correctly set-up hash table is O(1) for ~all operations.

## Open Addressing 

- Make a probe sequence for every key
	- Dictates order in which indices are tried
	- For insertion:
		- try incides in sequence, take the first available one
	- For view:
		- try indices in sequence, return the first with matching key
	- Removal is difficult
		- ![[Pasted image 20221215135318.png]]

### Linear Probing

Basically, check the initial index, then check the next one, then the next, etc.

- ![[Pasted image 20221215135359.png]]
- ![[Pasted image 20221215135416.png]]

### Quadratic Probing
- (no notes on slides, update later)

### Double Hashing

Basically:
- First index in probe sequence = $h_1(k)$ (hash of key)
- For each next index in probe sequence, add second hash of key ($h_2(k)$) instead of 1
	- it's like linear probing, but you add a hashed number every time instead of 1

![[Pasted image 20221215135437.png]]
![[Pasted image 20221215135510.png]]


### Performance

![[Pasted image 20221215135844.png]]
![[Pasted image 20221215135547.png]]
![[Pasted image 20221215135619.png]]
![[Pasted image 20221215135816.png]]

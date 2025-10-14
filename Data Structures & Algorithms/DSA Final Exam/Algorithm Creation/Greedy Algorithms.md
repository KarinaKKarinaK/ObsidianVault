- Used for optimal solutions to a problem where exhaustive search is bad

So, what you do is: for every step, make the most optimal choice; this eventually leads to the most optimal solution
- This only works with a specific set of problems (problems that have the greedy property), where making a greedy choice doesn't cause issues down the line
	- example of a non-greedy problem would be pathfinding in graphs, as traversing the longest possible step may lead you further away from where you started

# Examples

## Change

### The Problem

- Make a set sum with a minimum number of coins

![[Pasted image 20221217105356.png]]

![[Pasted image 20221217105410.png]]

### The Solution

- For each step, add largest possible coin value
	- This is the locally-optimal step
	- This also leads to the best possible overall set of coins

### Alternate (worse) Solutions

#### The Recursive (Bad) Solution

![[Pasted image 20221217105443.png]]
![[Pasted image 20221217105451.png]]

#### The Dynamic Programming (less bad) Solution

![[Pasted image 20221217135427.png]]
![[Pasted image 20221217135434.png]]




## Activity Selection

### The Problem

You are given a set of activities, each with a start time and a finish time. Fit as many activities into a day as possible.
*Definitions for nerds:*
- Set $S$ of activities $a_i$, each with a start time $s_i$ and finish time $f_i$
- $s_i < f_i$
- Compatible activities: $f_i \leq s_k \lor f_i \leq s_k$
	- one finishes before or just as the other starts

### Greedy Solution

We do not have to consider all activities
- Remember all Added activities
- For each step, Add the activity with the smallest Compatible finishing time

#### Pseudocode

```
Algorithm activitySelector(s, f):
	n = s.length
	A = {a_1}
	k = 1
	for m = 2; m <= n:
		if s[m] >= f[k]:
			A = A ∪ {A_m}
			k = m
```


### Previous (Dynamic Programming) Solution

Formal notation:
- Let $S_{ij} =$ the set of all activities starting after $a_i$ and finishing before $a_j$
- Let $A_{ij} =$ the maximum-size subset of $S_{ij}$ of mutually compatible activities
- Suppose $a_k$ is in $a_{ij}$
- Then, $A_{ij} = A_{ik} \cup \{a_k\} \cup A_{kj}$

![[Pasted image 20221217154837.png]]
![[Pasted image 20221217154902.png]]


## Fractional Knapsack

- Variation on & continuation of [[Knapsack-01]]
- Using the same notation

- Every item has a weight and a benefit
- Every item, therefore, has a weight efficiency (benefit per kilogram)
- Example:
	- ![[Pasted image 20221217155801.png]]




### The Greedy Algorithm

- In each step, take as much of the iten with the best possible efficiency as possible
- Repeat until weight limit reached

#### The Pseudocode

```
Algorithm fractionalKnapsack(S, W):
	for each i in S:
		x_i = 0
		v_i = b_i / w_i
	w = 0
	A = ∅
	while w < W:
		S = S \ i; i has highest efficiency
		a = min(w_i, W - w)
		x_i = a
		w += a
	return x_0 -> x_i for all i in s
```

### Time Complexity

![[Pasted image 20221217161244.png]]

### Misc.

- A greedy algorithm doesn't work on knapsack01, as you can only take whole items.
	- Taking all of the most Valuable item may result in unused space which may prevent you from fitting a more optimal solution
	- ![[Pasted image 20221217161612.png]]



## Huffman Codes

### The Problem

- Encoding of characters from a finite set
- Optimal for smallest codes
	- Most common characters have the shortest codes
- Codes MUST be prefix codes:
![[Pasted image 20221217162501.png]]
![[Pasted image 20221217162635.png]]

Ideally, most common characters have shortest codes
(a, d, e are more common than b, c in this example) 

### The Solution
every character in C has an attribute c.freq

```
Algorithm huffmannCode(C):
	T = new Tree
	n = C.size
	Q = new MinQueue = C
	for i = 1; i <= n - 1:
		new node z in T
		z.left = x = removeMin(Q)
		z.right = y = removeMin(Q)
		z.freq = x.freq + y.freq
		insert(Q, z)
	return removeMin(Q)
```


# Proof
- Proving correctness of greedy approach
	- (for activity selection)

![[Pasted image 20221217155000.png]]
![[Pasted image 20221217160951.png]]

This is proof by negation, i.e. if you take an algorithm that isn't greedy, there's always a more optimal solution

![[Pasted image 20221217161107.png]]
![[Pasted image 20221217161154.png]]

Basically, these examples illustrate that, the closer you get to a greedy algorithm, the more optimal your solution becomes.
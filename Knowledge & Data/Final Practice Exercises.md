#### Problem 1
Given k < n.
Heap, because:
**Heap:**
	insertion = O(log n)
	extract = O(log n) --> if we're doing top k elements then it would be: O(k * log n)
	so **total for insertion & extraction** = O(n + k log n)

**BST (Binary Search Tree):**
	Insertion = O(n log n)
	Extract = O(h), basically O(n) linear, and the more nodes added to the tree, the more time it takes
	so it would take O(n log n + k) **total for insertion & extraction**

***Since k < n then Heap is faster because O(n + k log n) < O(n log n + k) (given that k is always smaller than n)***

### Problem 2

**Idea:** during DFS, if we ever reach a vertex that is already visited and is not our parent, a cycle exists.

```python
DFS(u, parent): #true if path contains a cycle, False if no cycle

# We start at vertex u, knowing which node we came from ("parent")
	mark u as visited
	for each neighbor v of u:
        if v is not visited:
        # look at all nodes directly connected to `u`.
            if DFS(v, u) returns True:
                return True
        # if a neighbor v is visited and it is not the parent then there is a cycle
        else if v ≠ parent:
            return True
    return False # no cycle exists
    
DFShasCycle(G) --> Bool:
	# if v is visited & != parent[v] then True (cycle exists)
	
	# our function = DFS(u, parent) 
	# for every unvisited vertex (in case the graph has multiple components), we start a DFS.  
	for each vertex u:
		if u not visited:
			if DFS(u, NIL):
			# If any DFS finds a cycle, we return `True`.
				return True
	return False
```

Works in O(V + E)

### Problem 3

unweighted, directed graph

find if exists (True) a path s --> t, which uses k edges

use BFS (BFS uses queue)

so we look at the queue 

each state in the queue is `(vertex, edges_used)`

Steps, modify BFS so that:
1. We keep track of how any edges visited so far
2. initialize queue with (s, 0), so s = starting point, e edges so far = 0
3. while teh queue is not empty:
	1. dequeue (u, d)
		1. if u = t and d = k → return True.
		2. If d < k, enqueue (v, d+1) for each edge u → v.
	2. return Treu if teh queue empties

Time = O(kE) since every edge may be used for k levels.

So suppose thsi is teh BFS pseudocode we are given:
```python
BFS(G, s):
    for each vertex v in G:
        visited[v] = False
        distance[v] = ∞

    visited[s] = True
    distance[s] = 0

    Q = empty queue
    enqueue(Q, s)

    while Q is not empty:
        u = dequeue(Q)
        for each neighbor v of u:
            if not visited[v]:
                visited[v] = True
                distance[v] = distance[u] + 1
                enqueue(Q, v)

```

We modify it to become:

```python
BFS_Kedges(G, s, t, k):
 # t = target
 # k = number of edges
 
 # u is teh current vertex
 # d is current distance (num of edges)
 # if u == t and d == k	 then we reached the target and using k edges
 
	Q = empty queue
	enqueue(Q, (s, 0))

	while Q is not empty:
		(u, d) = dequeue(Q)
		if u == t and d == k:
			return True
		
		# only continue exploring if we haven’t exceeded K edges
		if d < k:
		#move to neighbor, increasing edge count by 
			for each neighbor v of u:
                enqueue(Q, (v, d + 1))
	
	return False

```

## Problem 4

##### Part A:
If all edges are distinct, then there can only be one MST.

Proof: If two spqnning trees are different, by definition, tehy have to differ by at least one edge. And replacing edges can only increase the total weight since all the weights are different.

#### Part B:
If all edges have same weight the the weight of the minimum spanning tree is weight * (V - 1), given that we know that any spanning of V vertices has (V -1) edges.

#### Part C:
make MST that must include egde 'e'. How to modify Krusklal's or Prim's  to satisfy that?

Use Kruskal's with Union-Find:
- STart by adding edge e and unioning its endpoints.
- Then continue normally with Kruskal's (adding edges from smallest to largest) until you complete the MST.

(A valid MST exists only if e is **not heavier than** any edge in the cycle it would create—i.e. e must be a **safe edge**.)

### Problem 5
you get items (integers) and need to maintain the median ("medium" integer) using 2 heaps

The idea:
- Use 2 heaps, one min-heap (upper half) and one max-heap (lower half)
- keep their sizes equal (or off just by 1)
- Insert into max-heap if integer is ≤ max of lower half, else min-heap
	- Rebalance so heaps sizes differ ≤ 1 → O(log n)
	
- **Get median:**
	- If heaps equal size → average of tops.
	- Else median = top of larger heap.  
	    → O(1)

**Since we're using heaps:** 
**Total:** insert O(log n), median O(1).

```php
Add(x):
    // 1) Place x in a heap
    if Lower is empty OR x ≤ peekMax(Lower):
        Lower.insert(x)
    else:
        Upper.insert(x)

    // 2) Fix ordering invariant if crossed
    if Lower not empty AND Upper not empty AND peekMax(Lower) > peekMin(Upper):
        a = Lower.extractMax()
        b = Upper.extractMin()
        Lower.insert(b)
        Upper.insert(a)

    // 3) Rebalance sizes (keep size difference ≤ 1)
    if size(Lower) > size(Upper) + 1:
        Upper.insert( Lower.extractMax() )
    else if size(Upper) > size(Lower) + 1:
        Lower.insert( Upper.extractMin() )
        
        
        
GetMedian():
    if size(Lower) == size(Upper):
        return (peekMax(Lower) + peekMin(Upper)) / 2
    else if size(Lower) > size(Upper):
        return peekMax(Lower)
    else:
        return peekMin(Upper)


```

### Problem 6:
minimze wieght (cost) but no verticisen (node) can be more than D edges away from center vertice (node)

Modify Prim's, to build an MST rooted at center node and every node is at most D edges away from that center node.

Give pseudocode and time complexity

Main idea: We run Prim’s but **stop expanding** beyond D edges from the center.

```php
// Input: graph G, start node, number of hops D (the linit of edges away from start node)

//Output: MST
modifiedPrims(G, start, D):
	for each vertex v in G:
		depth[v] = inf
		dist[v]= inf
	dist[start] = 0
	depth[start] = 0

	PQ = min-heap of (dist, vertex) //priority queue
	 //whiel tehb queue is not yet emptied (still contains some un-added verticies) do:
	while PQ not empty:
		(d, u) = extractMin(PQ)
		if depth[u] == D:
			continue
			
			// basic Prim's
			for each edge in (u, v, w):
				if depth[u] + 1 ≤ D and w < dist[v]:
	                dist[v] = w
	                depth[v] = depth[u] + 1
	                parent[v] = u
	                insert(PQ, (dist[v], v))

```

Complexity = O(E log V) (same as Prim).  
Some vertices may remain unreached if distance > D.


### Problem 7
- DIjkstra's (shortest path from s -->t)
- only can pursue and edge if you have anough fuel F
- Have to visit gas stations G, where you refuel to F units

**Idea:** You can only traverse edge (u → v, w) **if w ≤ fuel_left**.  
At gas stations G, refuel back to F units.

- Each edge `(u → v)` has a **cost** `w` (how much fuel it consumes).
- You can only travel along that edge if you have at least `w` fuel left.
- You start with `F` fuel units.
- Some nodes are **gas stations** (`G`) — when you reach one, you can **refuel back to full (F units)**.

In standard Dijkstra’s algorithm, each state is just:

> (current node, current distance)

Here, each state becomes:

> (current node, current fuel_left, current distance)

So we’re essentially doing Dijkstra’s search in a **larger graph** where every node is duplicated for every possible fuel level.

Example:  
If there are 4 vertices and 5 fuel units, you’ll have 4 × 6 = 24 possible “states” (node + fuel).

```php
// → we initialize a 2D distance array: one distance per (node, fuel_left) combination.  
// We start at the source `s` with a **full tank (F)**, so distance = 0 there.
for each vertex v and fuel f:
	dist[v][f] = ∞
dist[s][F] = 0

// We push states into a priority queue by **total distance so far**, just like in Dijkstra.
PQ = min-heap of (dist, v, fuel)

// Take the state with the smallest distance.  
// That’s the next best (shortest) known path to that `(node, fuel_left)` state.
while PQ not empty:
	(d, u, f) = extract-min(PQ)
		// stopping condition:
	// If we reach the target node `t`, we’ve found the shortest path considering all fuel constraints.
	if u == t: 
		return d
	
	// If the current node `u` is a gas station, refill your fuel to full capacity.
	if u in G: 
		f = F          // refuel
		
	// - You can only go along the edge if you have **enough fuel** (w ≤ f).
    
// - When you go from `u` to `v`, you spend `w` fuel, so your new state is `(v, f - w)`.
    
// - If this new path is shorter than the previously known one, update it and push it to the heap.
	for each edge (u,v,w):
		if w ≤ f:
			if d + w < dist[v][f-w]:
				dist[v][f-w] = d + w
				insert(PQ, (dist[v][f-w], v, f-w))

```

Each node can appear in up to **F different fuel states**,  
so it’s like running Dijkstra’s on a graph with **V × F** nodes and **E × F** edges.

O((V×F+E×F)log(V×F))

So total time complexity = O(F(V + E) log (VF))
# New practice
### **Problem 1 — Building a Min-Heap Efficiently**

You are given an unsorted array of _n_ integers.  
Describe two ways to build a min-heap: (a) inserting elements one by one, and (b) using the bottom-up heapify method.  
Which approach is faster, and what are the time complexities?

**Answer:**

- (a) Inserting one by one → each insert costs O(log n), total O(n log n).
    
- (b) Bottom-up heapify → start from middle index and sift down → O(n).  
    ✅ Bottom-up heapify is faster (linear time) and is the method used in practice.

How bottom-up heapify works:
**Bottom-up heapify works by starting at the lowest level of parent nodes and moving up the tree, ensuring that the heap property (e.g., parent is larger than or equal to children for a max-heap) is satisfied at each node.**

The total time complexity is O(n), which is more efficient than inserting elements one by one (which would be O(nlogn) ).
- The key to the efficiency is that while the process involves a potentially recursive "sinking" operation, most of the nodes are at the bottom of the tree.

1. **Start at the last non-leaf node**: 
    
    Begin with the parent of the last element in the array. Since leaves are already valid heaps (they have no children), there's no need to check them.

- We start from the **last non-leaf node**, which is at index `⌊n/2⌋ - 1`, and “sift down” each node to ensure the heap property holds below it.
- Not all nodes need to move all the way to the bottom:
	- Nodes near the **bottom** move **very little** (maybe 1 level).
	- Only a few nodes near the **top** might move many levels (up to log n).
## **Problem 2 — Heap vs Priority Queue Operations**

Explain how heaps are used to implement priority queues.  
What are the time complexities for `insert`, `getMin` (or `getMax`), and `extractMin` operations?

**Answer:**  
A binary heap stores elements such that the parent is always ≤ (or ≥) its children.

- `insert` → O(log n)
    
- `getMin` → O(1)
    
- `extractMin` → O(log n)  
    ✅ The heap ensures fast access to the smallest (or largest) element by maintaining partial order.
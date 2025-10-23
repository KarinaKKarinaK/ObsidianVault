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


```python
maintainMedianHeap():

```

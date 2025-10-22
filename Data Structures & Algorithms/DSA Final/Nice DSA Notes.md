# Algorithms
## Prim's Algorithm

1. Start at any node, put into list of "visited"
2. Find the closest (smallest connecting edge weight node) node to any of the already "visited" nodes
3. Connect it & mark it as visited
4. Repeat until all nodes are connected

#### Prim's Pseudocode
```python
Prim(G, start):
	forn each vertex v in G:
	key[v] = infinity
	parent[v] = NIL
	inMST[v] = FALSE

key[start] = 0

for i = 1 to |V| - 1:
	u = vertex with minimum key[u] not in MST
	inMST[u] = TRUE
	
	for each neighbor v of u:
		if (edge(u, v) exists) and (inMST[v] == FALSE) and (weight(u, v) < key[v]):
			parent[v] = u
			key[v] = weight(u, v)
			
	return parent[]
	
```

- `key[v]` = smallest weight edge connecting vertex `v` to the growing MST.
    
- `parent[v]` = which vertex connects `v` in the MST.
    
- `inMST[v]` = whether `v` is already included in the MST.
    
- At the end, `parent[]` gives all the edges of the **minimum spanning tree**.

##### **Time complexity**

- Using adjacency matrix + linear search → **O(V²)**
    
	- Using adjacency list + min-heap (priority queue) → **O(E log V)**

### Prim's Using Priority Queue
```python
PrimPQ(G, start):
    for each vertex v in G:
        key[v]    = infinity          // best-known edge weight to reach v
        parent[v] = NIL
        inMST[v]  = FALSE

    key[start] = 0
    H = empty min-heap
    for each vertex v in G:
        H.insert( (key[v], v) )

    while H is not empty:
        (k, u) = H.extract_min()
        if inMST[u]: continue       // skip if an outdated heap entry
        inMST[u] = TRUE

        for each (u, v, w) in G.adj[u]:     // neighbor v with edge weight w
            if not inMST[v] and w < key[v]:
                parent[v] = u
                key[v]    = w
                H.insert( (key[v], v) )     // acts as decrease-key

    return { (parent[v], v) for all v with parent[v] ≠ NIL }

```

##### **Time Complexity**
- Each edge may cause one heap insert: **O(E log V)** overall time.

## Kruskal's Algorithm
1. Pick smallest edge of the whole graph (that doesn't create a cycle, and isn't connecting two already connected nodes) (if two edges have the same weight, you can choose either)
2. Repeat until all nodes are added as part of the newly formed tree

**cycle** = a path that starts and ends at the same vertex, with all other vertices in the sequence being distinct
### Kruskal's Pseudocode
```python
Kruskal(G):
	MST = empty
	
	# Step 1: Sort all edges of G in increasing weight order
	sort G.edges by weight
	
	# Step 2: Create a disjoint-set for each vertex
	for each vertex v in G:
		MakeSet(v)
	
	# Step 3: Process edges in increasing weight order
	for each edge (u, v, w) in G.edges(sorted):
		if Findset(u) != FindSet(v):
			MST = MST union {(u, v, w)} #add the edge to MST
			Union(u, v) # merge teh two sets
			
	return MST
```

#### Helper Functions - Disjoint Set (Union-Find)n Functions
```python
MakeSet(x):
    parent[x] = x
    rank[x] = 0

FindSet(x):
    if x ≠ parent[x]:
        parent[x] = FindSet(parent[x])     # path compression
    return parent[x]

Union(x, y):
    rootX = FindSet(x)
    rootY = FindSet(y)

    if rootX == rootY: return

    // union by rank
    if rank[rootX] < rank[rootY]:
        parent[rootX] = rootY
    else if rank[rootX] > rank[rootY]:
        parent[rootY] = rootX
    else:
        parent[rootY] = rootX
        rank[rootX] += 1
```

### **Explanation**

- Sorts edges by weight.
    
- Picks the smallest edge that **does not form a cycle** (checked via disjoint sets).
    
- Continues until the MST has **V – 1 edges**.

#### *Time Complexity*
- Kruskal's algorithm is limited by sorting the edges (we can use merge sort to do this)
- **Time Complexity =** O(E log E)
- But with Union-Find operations (amortized): **O(E α(V))** --> **Total: O(E log V)**

## Dijkstra's Algorithm

- Running on a weighted, directed graph
- Shortest path from **one** node to every other node

1. Make a list of unvisited nodes (initially, store all nodes there).
2. Pick the starting node (any).
3. Keep track of distances to every other node from the chosen starting node. For now distance to starting node = 0, and to all other nodes = infinity
4. Update the cost of traveling to adjacent nodes to the starting node.
5. Pick the smallest edge of which the vertex has not yet been chosen (not yet visited).
6. Visit that node and remove it from the "unvisited" list
7. Repeat; choose the closest unvisited node from the already "visited" nodes, update their costs

### Dijkstra's Pseudocode (using a Min-Heap / Priority Queue)
```python
Dijsktra(G, source):
	for each vertex v in G:
		dist[v] = inifnity
		parent[v] = NIL
		visited[v] = FALSE
		
	dist[source] = 0
	
	H = empty min-heap
	H.insert(0, source) #(distance, vertex)
	
	while H is not empty:
	(d, u) = H.extract_min()
	if visited[u]:
		continue
	visited[u] = TRUE
	
	for each (u, v, w) in G.adj[u]: # edge u --> v with weight w
		if not visited[v] and dist[u]
 + w < dist[v]:
		   dist[v] = dist[u] + w
		   parent[v] = u
		   H.insert(dist[v], v) # acts as a decrease-key
	   
	return dist[], parent[]	 
```

- `dist[v]` = shortest known distance from source to `v`.
    
- `parent[v]` = previous node on the shortest path to `v`.
    
- Each vertex is extracted once with the smallest current distance.
    
- The heap ensures that the vertex with the smallest tentative distance is always processed next.
    
- The algorithm stops when all reachable vertices are visited.

- Works only for **non-negative edge weights**.  

- Can reconstruct paths using the `parent[]` array.


#### **Time Complexity**
- **Time Complexity =** O(|E| + |V| log |V|)

| Implementation                   | Time Complexity      |
| -------------------------------- | -------------------- |
| Adjacency matrix + linear search | **O(V²)**            |
| Adjacency list + binary heap     | **O((V + E) log V)** |
| Adjacency list + Fibonacci heap  | **O(E + V log V)**   |


# Algorithms
## Prim's Algorithm

1. Start at any node, put into list of "visited"
2. Find the closest (smallest connecting edge weight node) node to any of the already "visited" nodes
3. Connect it & mark it as visited
4. Repeat until all nodes are connected

#### Prim's Pseudocode
```python
Prim(G, start):
	for each vertex v in G:
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

## A* Star (with Min-Heap)

```php
AStar(G, start, goal, h):
    for each vertex v in G:
        g[v] = ∞                 // cost from start to v
        parent[v] = NIL
    g[start] = 0

    f_start = g[start] + h(start)
    OPEN = empty min-heap ordered by f
    OPEN.insert( (f_start, start) )
    CLOSED = empty set

    while OPEN is not empty:
        (f_u, u) = OPEN.extract_min()

        if u == goal:
            return ReconstructPath(parent, goal), g[goal]

        if u in CLOSED: 
            continue
        CLOSED.add(u)

        for each (u, v, w) in G.adj[u]:   // edge u→v with cost w
            tentative = g[u] + w
            if tentative < g[v] and v not in CLOSED:
                g[v] = tentative
                parent[v] = u
                f_v = g[v] + h(v)
                OPEN.insert( (f_v, v) )   // works as decrease-key

    return "no path", ∞


ReconstructPath(parent, t):
    path = []
    while t ≠ NIL:
        prepend t to path
        t = parent[t]
    return path

```

**What the symbols mean**

- `g[v]`: best-known cost from `start` to `v`.
    
- `h(v)`: heuristic estimate from `v` to `goal`.
    
- `f[v] = g[v] + h(v)`: priority key (estimated total path cost).
    
- `OPEN`: frontier (min-heap by `f`).
    
- `CLOSED`: expanded nodes.
    

---

### Requirements for optimality

- Edge costs **non-negative**.
    
- **Admissible** heuristic: `0 ≤ h(v) ≤ true_cost(v→goal)` → never overestimates.
    
- **Consistent** (monotone) heuristic (stronger, preferred):  
    `h(u) ≤ w(u,v) + h(v)` for every edge `u→v`.  
    With consistency, A* never needs to re-expand a node (each node settled once).
    

_(If `h(v) ≡ 0`, A_ becomes Dijkstra.)*

---

### Complexity (high level)

- Time: depends on heuristic quality; worst-case exponential in path length.  
    With binary heap and adjacency lists: **O((V + E) log V)** for the explored region.
    
- Space: stores frontier and visited sets: up to **O(V)**.
    

---

### Practical tips

- **Tie-breaking:** when equal `f`, prefer larger `g` (deeper) or smaller `h` to reduce node blow-up on plateaus.
    
- **Weighted A***: use `f = g + w·h` (w>1) for faster, not guaranteed optimal paths.
    
- **Grid paths:** a common consistent `h` is Manhattan (4-neighbor) or Euclidean (8-neighbor).

### A* Star - More Simply

![[Screenshot 2025-10-22 at 13.20.10.png]]


#### Or also...
**A* with priority queue** 
The priority queue will help in having the next best vertex always at the front. The numbers in blue are estimations of the actual distance between each node and the target node e.

**Correctness of A*** 
- If the heuristic function is admissible (meaning that it never overestimates the actual cost to get to the goal), A* is guaranteed to return a least-cost path from start to goal

## The 0/1 Knapsack Problem

- First, we create a table of n + 1 rows and w + 1 columns (n is the number of items and w is the weight units). A row number i represents the set of all the items from rows 1— i. 
- For instance, the values in row 3 assumes that we only have items 1, 2, and 3. A column number j represents the weight capacity of our knapsack. 
- Therefore, the values in column 5, for example, assumes that our knapsack can hold 5 weight units

![[Screenshot 2025-10-22 at 13.24.59.png]]![[Screenshot 2025-10-22 at 13.25.31.png]]![[Screenshot 2025-10-22 at 13.25.49.png]]![[Screenshot 2025-10-22 at 13.26.21.png]]![[Screenshot 2025-10-22 at 13.26.43.png]]

##### **Solution to the 0/1 Knapsack problem**

- **Complexity:** A naive approach would be to list all possible combinations. If order doesn't matter, then 2^n.
- Using **dynamic programming**, for every instance of the Knapsack problem, the Knapsack algorithm returns the total value of an optimal solution and runs in time O(n*w), where n is the number of items and w is the Knapsack capacity



---

## I. Asymptotic Notation Explanation

Asymptotic notation is used to describe the **running time** of an algorithm, which is an estimation (in terms of input size $n$ or $V, E$) of the time it takes to solve a problem. When analyzing running time, you **suppress constant factors and lower-order terms**, as these terms are irrelevant for large inputs and too system-dependent.

|Notation|Name|Characterization|Definition/Condition|
|:--|:--|:--|:--|
|**$O$**|**Big O**|**Worst-case asymptotic running time** or **Upper bound**. A function grows no faster than a certain rate.|$f(n) = O(g(n))$ if there exist positive constants $c$ and $n_0$ such that $0 \le f(n) \le c \cdot g(n)$ for all $n \ge n_0$.|
|**$\Omega$**|**Big Omega**|**Best-case asymptotic running time** or **Lower bound**. A function grows at least as fast as a certain rate.|$f(n) = \Omega(g(n))$ if there exist positive constants $c$ and $n_0$ such that $0 \le c \cdot g(n) \le f(n)$ for all $n \ge n_0$.|
|**$\Theta$**|**Big Theta**|**Asymptotically precise bound** (Tight Bound). Characterizes the rate of growth of the function precisely (within constant factors).|$T(n) = \Theta(f(n))$ if and only if there exist positive constants $c_1, c_2$ and $n_0$ such that $c_1 \cdot f(n) \le T(n) \le c_2 \cdot f(n)$ for all $n \ge n_0$. This is equivalent to $f(n) = O(g(n))$ AND $f(n) = \Omega(g(n))$.|

The sources note that algorithm designers often use **$O$-notation** even when **$\Theta$-notation** would be more appropriate.

## II. Big-O Running Times for Algorithms and Data Structures

The tables below list the Big-O complexities mentioned in the sources. $V$ or $n$ denotes the number of vertices/nodes, and $E$ or $m$ denotes the number of edges.

### A. Graph Algorithms (Shortest Paths & Search)

|Algorithm / Implementation|Running Time|Explanation / Context|Source|
|:--|:--|:--|:--|
|**BFS** (Breadth-First Search)|**$O(V + E)$** or **$O(n + m)$**|Linear time running time for BFS. Total work is $O(V)$ for queue operations and initialization, plus $O(E)$ for scanning adjacency lists.||
|**DFS** (Depth-First Search)|**$O(V + E)$**|Linear time complexity. Total time is $\Theta(V)$ for initialization and loops, plus $\Theta(E)$ for recursive calls/adjacency list scans.||
|**Topological Sort** (on a DAG)|**$O(V + E)$**|Achieved by performing DFS and inserting vertices onto a list in order of decreasing finish time.||
|**DAG Shortest Paths**|**$\Theta(V + E)$**|Linear time, requires topological sort followed by a single pass of edge relaxation.||
|**Dijkstra's Algorithm (Straightforward)**|**$O(m \cdot n)$** or **$O(mn)$**|The straightforward implementation uses exhaustive search to find the minimum score in each of $O(n)$ iterations, costing $O(m)$ time per iteration.||
|**Dijkstra's Algorithm (Heap-Based)**|**$O((m + n) \log n)$**|Improved running time achieved by using a Min-Heap (or Binary Heap) to store unprocessed nodes. Can be simplified to $O(m \log n)$.||
|**A* Algorithm (Heap-Based)**|**$O((m + n) \log n)$**|The A* algorithm, when implemented with a heap, has the same complexity as the heap-based Dijkstra algorithm (especially when the heuristic $h$ is $O(1)$, i.e., equal to 0).||

### B. Minimum Spanning Tree (MST) Algorithms

|Algorithm / Implementation|Running Time|Explanation / Context|Source|
|:--|:--|:--|:--|
|**Prim's Algorithm (Straightforward/Naive)**|**$O(m \cdot n)$** or **$O(mn)$**|Due to $O(n)$ iterations, each requiring $O(m)$ time to exhaustively search all edges for the least cost crossing edge.||
|**Prim's Algorithm (Heap-Based)**|**$O((m + n) \log n)$**|Heap use minimizes the time spent identifying the next vertex. Can be simplified to $O(m \log n)$ when $G$ is connected ($m \ge n-1$).||
|**Kruskal's Algorithm (Straightforward/Naive)**|**$O(m \cdot n)$** or **$O(mn)$**|Sorting costs $O(m \log n)$, but the main loop performs $m$ iterations, with cycle checking (using DFS/BFS) taking $O(n)$ per iteration.||
|**Kruskal's Algorithm (Union-Find-Based)**|**$O((m + n) \log n)$**|Dominated by sorting $O(m \log n)$ and $O(m)$ efficient Union-Find operations (Find/Union, typically $O(\log n)$ each).||

### C. Data Structure Operations (Heaps and Trees)

|Data Structure / Operation|Running Time|Context|Source|
|:--|:--|:--|:--|
|**Binary Search Tree (Unbalanced)** (Operation Time)|**$O(h)$** (where $h$ is tree height, $h \le n$)|The running time of most operations is proportional to the tree's height, which can be $O(\log n)$ (best case) to $O(n)$ (worst case).||
|**Balanced Search Tree** (Insert, Delete, Search)|**$O(\log n)$**|Balanced BSTs guarantee logarithmic time for Insert/Delete/Search by performing additional work (rotations) to maintain balance.||
|**Red-Black Tree** (Insert, Delete)|**$O(\log n)$**|A Red-Black tree (a form of balanced BST) guarantees $O(\log n)$ time for insertion and deletion.||
|**Min/Max Heap: Insert**|**$O(\log n)$**||
|**Min/Max Heap: Extract Min/Max**|**$O(\log n)$**||
|**Min/Max Heap: Delete**|**$O(\log n)$**||
|**Min/Max Heap: Find Min/Max**|**$O(1)$**|Reading the root of the heap takes constant time.||
|**Heapify** (or **BUILD-MAX-HEAP**)|**$O(n)$**|Building a heap from an unordered array has linear running time.||
|**Union-Find** (Find/Union using Rank/Compression)|**$O(\log n)$**|This bound is achievable using parent graph implementation strategies.||

### D. Other Functions

|Operation|Running Time|Context|Source|
|:--|:--|:--|:--|
|**Selection Sort** (Worst-Case)|**$\Theta(n^2)$**|The worst-case running time of selection sort.||
|**Insertion Sort** (Worst-Case)|**$\Theta(n^2)$**|The worst-case running time of Insertion Sort.||
|**Merge Sort** (Worst-Case/All Cases)|**$\Theta(n \lg n)$**|Merge sort runs in $\Theta(n \lg n)$ time in all cases.||
|**Recursive Fibonacci Calculation**|**$O(2^n)$**|Upper bound for the naive recursive calculation.||

## III. Key Information to Memorize for the Final Exam (Concise Summary)

Based on the topics emphasized (search, shortest paths, MST, and complexity theory), the following are essential facts to memorize:

### Core Definitions

- **Asymptotic Notation Purpose:** Characterize the **order of growth** of running time by suppressing constant factors and lower-order terms.
- **Big O ($O$):** Upper bound / Worst-case time.
- **Big Theta ($\Theta$):** Tight bound / Exact growth rate.
- **Running Time of an Algorithm:** Always aim for the **simplest and most precise** bound, typically using $\Theta$ if possible, otherwise $O$.

### Graph Search and Shortest Paths

- **BFS Running Time:** **$O(V + E)$**.
- **DFS Running Time:** **$O(V + E)$**.
- **Topological Sort:** Always uses **DFS** (not BFS) and runs in **$O(V + E)$**. It only exists for **Directed Acyclic Graphs (DAGs)**.
- **Shortest Path (Unweighted):** Use **BFS** for shortest paths in terms of number of edges.
- **Dijkstra's Algorithm (Required Assumption):** Requires **non-negative edge lengths**.
- **Dijkstra's Naive Complexity:** **$O(mn)$**.
- **Dijkstra's Heap Complexity:** **$O((m + n) \log n)$**.
- **A* Complexity:** **$O((m + n) \log n)$** (If the heuristic is $h=0$, A* degenerates to Dijkstra).

### Minimum Spanning Trees (MST)

- **Prim's Algorithm:** Grows a single tree.
    - **Naive Complexity:** **$O(mn)$**.
    - **Optimized Complexity:** **$O((m + n) \log n)$** (using a **Heap** data structure).
- **Kruskal's Algorithm:** Grows a forest.
    - **Optimized Complexity:** **$O((m + n) \log n)$** (using **Union-Find**).
- **MST Edge Requirement:** An MST for a connected graph with $V$ vertices always has exactly **$V - 1$** edges.

### Data Structures

- **Heap Operations (Insert, Extract Min/Max, Delete):** **$O(\log n)$**.
- **Heap Operation (Find Min/Max):** **$O(1)$**.
- **Heapify (Build Heap):** **$O(n)$** (Linear time).
- **Balanced Search Trees (BST):** Operations guarantee **$O(\log n)$** running time.


# Union Find
Union-find, also known as the [Disjoint Set Union (DSU)](https://www.google.com/search?rlz=1C5CHFA_enCZ969CZ970&cs=0&sca_esv=d915882ffb3cd600&q=Disjoint+Set+Union+%28DSU%29&sa=X&ved=2ahUKEwif5dGBgrqQAxVu_7sIHXSOBbcQxccNegQIAxAB&mstk=AUtExfDmLdKS5aqCtGaRgfFS-4cPgkHYrOdXF2A3tI0JmStJxxyYOG8uAoVYS4x6rBh_Cu5fblcuJiXlxpq7FqDGHLUQNdoK_4oj0sTPcQaz2xXiMAwY0ZF5VhlRrtcchXi1LWb9KzTKh31xnFtikoCBfHGdw3_8m6Vlpr0eewXhM8X0FDw-2pPdItpPfDqZ-dsKacLN&csui=3) data structure, is ==a way to efficiently manage a collection of non-overlapping sets and track which elements belong to which set==. It provides two main operations: `Find`, which determines the representative of the set an element belongs to, and `Union`, which merges the sets containing two given elements. It's commonly used to solve dynamic connectivity problems and is a key component in algorithms like [Kruskal's algorithm for finding a minimum spanning tree](https://www.google.com/search?rlz=1C5CHFA_enCZ969CZ970&cs=0&sca_esv=d915882ffb3cd600&q=Kruskal%27s+algorithm+for+finding+a+minimum+spanning+tree&sa=X&ved=2ahUKEwif5dGBgrqQAxVu_7sIHXSOBbcQxccNegQICRAB&mstk=AUtExfDmLdKS5aqCtGaRgfFS-4cPgkHYrOdXF2A3tI0JmStJxxyYOG8uAoVYS4x6rBh_Cu5fblcuJiXlxpq7FqDGHLUQNdoK_4oj0sTPcQaz2xXiMAwY0ZF5VhlRrtcchXi1LWb9KzTKh31xnFtikoCBfHGdw3_8m6Vlpr0eewXhM8X0FDw-2pPdItpPfDqZ-dsKacLN&csui=3).
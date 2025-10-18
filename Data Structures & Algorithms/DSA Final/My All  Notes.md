# Lecture 5: Heaps

A **(binary) heap** is a **data structure** which can be viewed as a **complete binary tree**, satisfying a key property (max/min).

Every level (but possibly the last) is filled

**A max-heap,** H, satisfies the *max heap* property: ==Heaps H[Parent(i)] ≥ H[i]==

**A min-heap**, satisfies: ==H[Parent(i)] ≤ H[i]==

#### Accessing Elements
	PARENT(i):
		return ⌊i/2⌋

	LEFTCHILD(i) 
		return 2i

	RIGHTCHILD(i) 
		return 2i + 1


### MAX-HEAPIFY(A,i) and BUILD-MAX-HEAP(A, n)

**MAX-HEAPIFY(A,i) -->** takes a heap A, where the max-heap property is violated with respect to node i, and restores the property at that node

![[Screenshot 2025-10-17 at 18.38.48.png]]

**The MAX-HEAPIFY(A,i) procedure can be used to build a heap from an unsorted array.**

![[Screenshot 2025-10-17 at 18.41.17.png]]

***Before each iteration, nodes i+1,…n act as root of a max-heap.***

- **Initialization:** Nodes ⌊n/2⌋, . . . , n are leaves, thus max-heaps.
- **Maintenance:** When iteration at node i is called, it holds (from the previous iterations) that i.left and i.right are roots of max-heaps
	- Thus the heap, with based at node i, violate the max-heap property only at the root. When MAX-HEAPIFY is called on such a heap, it corrects the violation, while introducing no new ones
		- Thus, nodes i,….,n, are roots of max-heaps after the iteration
- **Termination:** Terminates at i=0, with i+1=1 being the root of a max-heap, proving the whole heap is a max-heap.

**Time complexity:** **O(n * log(n))**

The **BUILD-MAX-HEAP,** procedure can be used to sort an un-ordered array, in log-linear running time
![[Screenshot 2025-10-17 at 18.51.51.png]]
The **HEAPSORT(A,n)** procedure satisfies the **loop invariant**: 
- At the start of iteration i - The subarray A[1:i] is a max-heap containing the smallest elements. 
- The subarray A[i+1:n] contains the rest and is sorted.

	- **Initialization:** A[1:n] is a max-heap (from initial BUILD-MAX-HEAP). A[n+1:n] is empty and trivially sorted.
	
	- **Maintenance:** A[1:i] was initially a max-heap, with the smallest i elements. The largest of which, A[1], was put in position, A[i] so now A[1:i-1] contains the smallest elements. The max heap property was violated at the root, but this was corrected, leaving A[1:i-1] a max heap. Subarray A[i:n]= A[i] followed by A[i+1:n] now has the largest values
	
	- **Termination:** A[1:1] is trivially a max-heap. A[2:n] is sorted and contains the larger elements. Implying A[1:n] is sorted.



# Lecture 6: Graph Theory

A **(simple) graph** is a **pair G = (V, E)**, where V is the (finite) set of vertices (or nodes), E is the (finite) set of edges, **and each edge is an unordered pair of vertices**.

![[Screenshot 2025-10-17 at 18.57.01.png]]


![[Screenshot 2025-10-17 at 18.57.24.png]]

The **vertex set** of a graph G is denoted by **V(G)** or simply V; the **edge set** of a graph G is denoted by **E(G) o**r simply E. An **edge {u, v}** can be simply denoted by **uv**.

The order of a graph is the cardinality of its vertex set, and the size of a graph is the cardinality of its edge set.

##### Cardinality 
In graph theory, **cardinality** refers to ==the number of elements in a set of graph components, such as vertices or edges==. 

The **cardinality** of the vertex set **(|V|)**, often called **the order of the graph**, is the **number of vertices**. The cardinality of the edge set **(|E|)**, known as the **size of the graph**, is the **number of edges.**

![[Screenshot 2025-10-17 at 19.02.31.png]]

![[Screenshot 2025-10-17 at 19.04.00.png]]
##### Example
![[Screenshot 2025-10-17 at 19.05.18.png]]



![[Screenshot 2025-10-17 at 19.05.53.png]]

- **Degree of a vertex (deg(v))** → how many edges touch that vertex.
    
- **Maximum degree (Δ(G))** → the highest degree among all vertices.
    
- **Minimum degree (δ(G))** → the lowest degree among all vertices.
    
- **Degree sequence** → a list of all vertex degrees, usually written from largest to smallest.

##### Example
![[Screenshot 2025-10-17 at 19.09.04.png]]




>***Theorem***: In a graph G, the sum of the degrees of the vertices is equal to twice the number of edges. Consequently, the number of vertices with odd degree is even

![[Screenshot 2025-10-17 at 19.13.09.png]]

![[Screenshot 2025-10-17 at 19.13.55.png]]

![[Screenshot 2025-10-17 at 19.15.17.png]]

![[Screenshot 2025-10-17 at 19.17.31.png]]

- A graph is **connected** if every pair of vertices can be joined by a path. Informally, if one can pick up an entire graph by grabbing just one vertex, then the graph is connected. 

- A graph that is not connected is said to be **disconnected.** 

- Each maximal connected piece of a graph is called a **connected component.**

- A graph is said to be **complete** if every vertex is adjacent to every other vertex. The complete graph of order n is denoted by Kn.

- The **empty graph** on n vertices, denote by En, is the graph of order n where E is the empty set.

![[Screenshot 2025-10-17 at 19.24.09.png]]

![[Screenshot 2025-10-17 at 19.24.26.png]]

![[Screenshot 2025-10-17 at 19.27.22.png]]


![[Screenshot 2025-10-17 at 19.28.05.png]]



![[Screenshot 2025-10-17 at 19.29.21.png]]





![[Screenshot 2025-10-17 at 19.32.00.png]]

![[Screenshot 2025-10-17 at 19.32.41.png]]

![[Screenshot 2025-10-17 at 19.34.32.png]]
![[Screenshot 2025-10-17 at 19.35.40.png]]
![[Screenshot 2025-10-17 at 19.37.31.png]]


![[Screenshot 2025-10-17 at 19.44.32.png]]

![[Screenshot 2025-10-17 at 19.44.56.png]]

![[Screenshot 2025-10-17 at 19.48.06.png]]


> ***Theorem:*** For any connected graph G, rad(G) ↔ diam(G) ↔ 2 rad(G).

![[Screenshot 2025-10-17 at 19.50.17.png]]
## Tree

![[Screenshot 2025-10-17 at 20.13.37.png]]

![[Screenshot 2025-10-17 at 20.18.32.png]]

### Kruskal's Algorithm
![[Screenshot 2025-10-17 at 20.18.52.png]]

## Binary Search Trees

![[Screenshot 2025-10-18 at 19.21.09.png]]


![[Screenshot 2025-10-18 at 19.21.31.png]]

The **binary search tree** property also enables for **efficient** **minimum and maximum search algorithms.**

![[Screenshot 2025-10-18 at 19.22.36.png]]
To **preserve the binary search tree property**, the **insertion** operation **adds new elements as leaves.**![[Screenshot 2025-10-18 at 19.24.07.png]]


To **preserve the binary search tree property**, the **deletion** operation needs to significantly **alter the data structure.**

![[Screenshot 2025-10-18 at 19.27.20.png]]


## Lecture 6 (Graph Theory) Recap

### 🟢 **Basic Concepts**

- **Graph (G = (V, E))** → set of vertices (V) and edges (E).
    
- **Order** → number of vertices |V|.
    
- **Size** → number of edges |E|.
    
- **Adjacent vertices** → connected by an edge.
    
- **Incident edge** → edge touching a vertex.
    

---

### 🟣 **Types of Graphs**

- **Simple graph** → no loops, no multiple edges.
    
- **Directed graph (digraph)** → edges have directions.
    
- **Multigraph** → multiple edges allowed.
    
- **Pseudograph** → loops allowed.
    
- **Hypergraph** → edges can connect >2 vertices.
    
- **Infinite graph** → infinite vertices/edges.
    

---

### 🔵 **Neighborhood and Degree**

- **Open neighborhood N(v)** → all vertices adjacent to v.
    
- **Closed neighborhood N[v]** → N(v) + the vertex v itself.
    
- **Degree deg(v)** → number of edges connected to v.
    
- **Max degree Δ(G)** → largest degree in graph.
    
- **Min degree δ(G)** → smallest degree in graph.
    
- **Degree sequence** → list of all vertex degrees (descending).
    

---

### 🟠 **Key Theorem**

- **Sum of degrees = 2 × number of edges**  
    ⇒ number of odd-degree vertices is even.
    

---

### 🔺 **Walks, Paths, Trails, Cycles**

- **Walk** → sequence of connected vertices (repeats allowed).
    
- **Trail** → no repeated edges.
    
- **Path** → no repeated vertices.
    
- **Cycle** → closed path (starts and ends at same vertex).
    

---

### 🟢 **Connectedness**

- **Connected graph** → every pair of vertices connected by a path.
    
- **Disconnected graph** → not fully connected.
    
- **Connected components** → separate connected parts.
    

---

### ⚪ **Special Graphs**

- **Complete graph (Kn)** → all vertices connected to each other.
    
- **Empty graph (En)** → no edges.
    
- **Complement (Ḡ)** → same vertices, opposite edges.
    
- **Regular graph** → all vertices have same degree.
    
- **Cycle (Cn)** → one big closed loop.
    
- **Path (Pn)** → sequence of vertices in a line.
    
- **Bipartite graph** → vertices split into two groups; edges only go across.
    
    - **Complete bipartite (Km,n)** → all possible cross edges.
        

---

### 🔷 **Isomorphic Graphs**

Two graphs are **isomorphic** if there’s a one-to-one mapping between vertices that preserves adjacency.

---

### 🔶 **Distances**

- **Distance d(u,v)** → shortest path between u and v.
    
- **Eccentricity ecc(v)** → farthest distance from v to any vertex.
    
- **Radius rad(G)** → smallest eccentricity.
    
- **Diameter diam(G)** → largest eccentricity.
    
- **Center** → vertices with ecc = radius.
    
- **Periphery** → vertices with ecc = diameter.
    
- **Theorem:** rad(G) ≤ diam(G) ≤ 2 × rad(G).
    

---

### 🧮 **Graphs and Matrices**

- **Adjacency matrix (A)** → A[i,j] = 1 if edge between vi, vj.
    
- **Aⁿ** → entry (i,j) = number of walks of length n from vi to vj.
    

---

### 🌳 **Trees**

- **Tree** → connected, no cycles.
    
- **Forest** → set of trees.
    
- **Leaf** → vertex with degree 1.
    
- **Theorem:**
    
    - Tree with n vertices → has n−1 edges.
        
    - Forest with k components → has n−k edges.
        
    - A graph is a tree ↔ connected and has n−1 edges.
        

---

### 🪵 **Spanning Trees**

- **Spanning tree** → subgraph that’s a tree and includes all vertices.
    
- **Weighted graph** → edges have weights.
    
- **Minimum spanning tree (MST)** → spanning tree with minimal total edge weight.
    
- **Kruskal’s Algorithm:** add smallest edges step by step, avoiding cycles.
    


# Lecture 7: Graph Distances: Theory & Computation

### Breadth First Search (BFS)

![[Screenshot 2025-10-18 at 19.31.11.png]]

***Nodes with yet unexplored neighbors, are kept track of with a queue, Q.***
- When a node is initially discovered, it is added to the queue.
	- It’s distance to the source node is recorded. (and the node is colored grey)
		- Once the node is dequeued, and it’s neighbors discovered, (the node is colored black).

![[Screenshot 2025-10-18 at 19.33.53.png]]


![[Screenshot 2025-10-18 at 19.34.08.png]]

![[Screenshot 2025-10-18 at 19.34.40.png]]

**To prove the correctness of BFS, for any graph G and source vertex x, we need to show v.d = d(s,v) for any vertex v**.
- We begin by showing, a loop invariant: at any point of the algorithm, it holds that: v.d >= d(s,v) for any vertex v.

[[BFS Correctness]]

![[Screenshot 2025-10-18 at 19.37.29.png]]


# Lecture 8: DFS

#### BFS vs DFS
![[Screenshot 2025-10-18 at 19.41.19.png]]

#### DFS - Iterative Version

![[Screenshot 2025-10-18 at 19.41.38.png]]

#### BFS - Recursive Version

![[Screenshot 2025-10-18 at 19.45.34.png]]

## Prim's Algorithm

![[Screenshot 2025-10-18 at 19.47.25.png]]![[Screenshot 2025-10-18 at 19.49.04.png]]

**Complexity ("naive" implementation):** 
- Iterations: O(|V|) = O(n) 
- Edge search: O(|E|) = O(m) O(n*m)

![[Screenshot 2025-10-18 at 19.51.05.png]]

![[Screenshot 2025-10-18 at 19.52.33.png]]

Prim's algorithm is a **greedy algorithm** used to find a **Minimum Spanning Tree (MST)** of a connected, undirected, and weighted graph. The goal is to select a set of edges that connects all the vertices while ensuring the **total cost (sum of edge weights) is the minimum possible**.

It achieves this by **growing a single tree structure** one edge at a time, starting from an arbitrary vertex, much like a mold spreading across the graph.

Here is the simple step-by-step process:

1. **Initialization:** Start with an **arbitrarily chosen vertex** $s$, which forms the initial set of processed vertices, $X$. The set of MST edges, $T$, is initialized as empty.
2. **Greedy Expansion (Main Loop):** While the set of spanned vertices $X$ does not include all vertices ($X \ne V$):
    - **Find the Cheapest Link:** Identify the edge $(v^*, w^*)$ that has the **least cost**. This edge must connect a vertex $v \in X$ (a vertex already in the growing tree) to a vertex $w \in V-X$ (a vertex not yet included).
    - **Add to Tree:** Add the newly selected vertex w to $X$ and add the edge (v, w) to the set of result edges $T$.

The algorithm continues until all vertices are included, returning the set $T$, which constitutes the Minimum Spanning Tree.

---

### Implementation Detail (How it finds the minimum)

To efficiently find the least cost edge in each step, implementations often rely on a special data structure:

- **Priority Queue/Heap:** Prim's algorithm strongly resembles Dijkstra's shortest-path algorithm. It uses a **min-priority queue (heap)** to manage the vertices not yet processed ($V-X$). The **key** of a vertex $w \in V-X$ is defined as the **minimum cost of any edge connecting $w$ to a vertex already in $X$**.
- **Efficiency:** Using a heap enables the algorithm to quickly extract the minimum-key vertex (the one connected by the cheapest edge to the current tree), allowing the algorithm to run in a near-linear time of $O((|V|+|E|) \log |V|)$ or $O(m \log n)$.

## Kruskal's Algorithm
![[Screenshot 2025-10-18 at 19.53.11.png]]

**Complexity:** It depends a lot on sorting and acyclic checking! 
**"Naive" implementation:** Assuming the usage of **Merge Sort** for sorting and **DFS** for acyclic checking, that would result in **O(m*n).**

![[Screenshot 2025-10-18 at 19.54.20.png]]


![[Screenshot 2025-10-18 at 19.56.34.png]]


![[Screenshot 2025-10-18 at 19.56.54.png]]

Kruskal's algorithm is a greedy method, just like Prim's, that finds the **Minimum Spanning Tree (MST)** of a connected, weighted graph.

The main difference is that instead of starting from one vertex and growing a single tree outward (like Prim's), Kruskal's algorithm looks at the entire graph simultaneously and builds many small fragments, often referred to as a **forest**.

Here is the extremely simple process:

### Kruskal's Algorithm: The Three Steps

1. **List and Sort:** Take every edge in the entire graph and sort them all by cost, from the **cheapest to the most expensive**.
2. **Greedy Selection:** Go through the list of edges in this sorted order, examining each one.
3. **The Only Rule (Cycle Check):** Add the current edge to your resulting MST _unless_ adding it would **create a closed loop (a cycle)** with the edges you have already chosen.

The algorithm keeps accepting edges this way until all the vertices in the graph are connected.

---

### How the Cycle Check Works Simply

The key challenge is checking for cycles. Kruskal's efficiently handles this by keeping track of "connected groups" or **connected components**.

- Initially, every single vertex is its own group.
- When you pick an edge:
    - If the edge connects two vertices that belong to **different groups**, you accept the edge, and the two groups permanently **merge** into one larger group.
    - If the edge connects two vertices that are **already in the same group**, adding that edge would complete a circuit (a cycle), so you **skip** it.

This mechanism ensures the resulting structure remains a tree (acyclic) while achieving the minimum total cost because the decisions are always made based on the cheapest available edge overall. This efficient checking is handled internally by a data structure often called **Union-Find**.

#### Prim's vs Kruskal's 

![[Screenshot 2025-10-18 at 19.57.14.png]]


Both are **greedy algorithms** for **minimum spanning tree (MST**):
- **Prim** grows a **tree** while **Kruskal** grows a **forest** 
- In which situation one is better than the other one?
	- ***Prim is better for dense graphs while Kruskal is better for sparse graphs***


![[Screenshot 2025-10-18 at 19.58.56.png]]


# Lecture 9: Dijkstra's Algorithm

![[Screenshot 2025-10-18 at 20.01.33.png]]![[Screenshot 2025-10-18 at 20.01.48.png]]![[Screenshot 2025-10-18 at 20.02.02.png]]

![[Screenshot 2025-10-18 at 20.02.47.png]]![[Screenshot 2025-10-18 at 20.04.43.png]]


#### Applications - BFS and DFS:

**BFS:** 
- Finding the shortest path (next lecture) 
- Finding all neighboring locations 
- Broadcasting tasks, such as with networks
**DFS:** 
- Solving puzzles, such as mazes 
- Topological ordering (this lecture)

![[Screenshot 2025-10-18 at 20.06.41.png]]![[Screenshot 2025-10-18 at 20.07.07.png]]![[Screenshot 2025-10-18 at 20.07.23.png]]

# Lecture 10: A* Algorithm

![[Screenshot 2025-10-18 at 20.08.18.png]]![[Screenshot 2025-10-18 at 20.08.55.png]]
**Correctness of A***
If the heuristic function is admissible (meaning that it never overestimates the actual cost to get to the goal), A* is guaranteed to return a least-cost path from start to goal.

![[Screenshot 2025-10-18 at 20.09.49.png]]![[Screenshot 2025-10-18 at 20.10.07.png]]![[Screenshot 2025-10-18 at 20.10.19.png]]


**Dynamic programming -->** At each step, we make use of our solutions to previous sub-problems

![[Screenshot 2025-10-18 at 20.11.01.png]]


# Lecture 11: DYNAMIC PROGRAMMING AND SEARCH TREES

![[Screenshot 2025-10-18 at 20.15.29.png]]![[Screenshot 2025-10-18 at 20.15.51.png]]![[Screenshot 2025-10-18 at 20.16.09.png]]
***We consider the vertices in reverse topological sort order.***


![[Screenshot 2025-10-18 at 20.17.14.png]]![[Screenshot 2025-10-18 at 20.18.23.png]]![[Screenshot 2025-10-18 at 20.19.07.png]]![[Screenshot 2025-10-18 at 20.19.25.png]]
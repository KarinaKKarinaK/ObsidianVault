### **Open Answer Examination Question: Dijkstra's Shortest-Path Algorithm**

This question concerns Dijkstra’s algorithm, which solves the **Single-Source Shortest Paths problem**. The algorithm finds the shortest path distance, $dist(s, v)$, from a starting vertex $s$ to every other vertex $v$ in a directed graph $G=(V, E)$.

A simplified representation of Dijkstra’s core greedy logic (without explicit heap optimization) is provided below, where $X$ is the set of vertices whose shortest distance from $s$ has been finalized, and $\ell_{en}(v)$ stores the current shortest path length found so far to $v$:

```
Dijkstra (Simplified Pseudocode)
Input: directed graph G = (V,E), source s ∈ V, non-negative length ℓe for each e ∈ E.
// Initialization
1 X := {s}
2 len(s) := 0, len(v) := +∞ for every v ≠ s
// Main loop
3 while there is an edge (v, w) with v ∈ X, w ∉ X do
4 (v*, w*) := such an edge minimizing len(v) + ℓvw
5 add w* to X
6 len(w*) := len(v*) + ℓv*w*
```

---

### Part A: Algorithm Constraints and Correctness

1. **Critical Assumption:** Identify the single most critical assumption regarding the input edge lengths/weights required for Dijkstra’s algorithm to guarantee that $\ell_{en}(v) = dist(s, v)$ for all vertices $v$.
	- ***that all the edges are non-negative; because Dijkstra's final step assumes that once anvertex' weight is chosen with minimum score, then len(v) + l (v* w), and no alternative path discovered later can beat that value, which is based on the assumption that any additional edges you append later can only increase the path length (non-negative increments) - but never decrease it.***
2. **Failure Scenario:** Draw a minimal directed graph (label vertices S, A, B) and assign weights such that if this critical assumption is violated, Dijkstra’s algorithm fails to compute the correct shortest path distance from source S to a destination vertex (e.g., B). Explain why the algorithm fails in this specific case, referencing the mechanism of the Dijkstra Score calculation.
	- S --> A, weight = 1
	- S --> B, weight = 0
	- A --> B, weight = -3
		- **True shortest distances from S:**
			- dist(S,S) = 0
			- dist(S, A) = 1
			- dist(S, B) = 1 + (-3) = -2 via S --> A --> B
		- **Now Dijkstra's run using the given pseudocode:**
			- Initially: X= {S}, len(S) = 0, others +infinity
			- Frontier edges from X:
				- S --> A : score = len(S) + l(SA) = 0 + 1 = 1
				- S --> B : score = len(S) + l(SB) = 0 + 0 = 0
			- Picking the min: (S, B) with score 0 --> finaize B: set len(B) = 0, X = {S, B}
			- Next, the only remaining vertex is A via S --> A --> finalize A with len(A) = 1
			- Dijkstra **finalized BBB** at length 0 before seeing the better path S→A→BS\to A\to BS→A→B of length **−2**. The negative edge A→BA\to BA→B allows a later-discovered path to **decrease** the distance to a vertex already finalized, contradicting the algorithm’s greedy “settle once” logic. That’s exactly why non-negative weights are required.

### Part B: Complexity and Optimization

1. **Naive Complexity:** Assuming the straightforward implementation implied by the provided pseudocode (where step 4 involves an exhaustive search across the entire frontier edges in each iteration) and using an adjacency-list representation, state the overall running time complexity in Big-O notation, where $n = |V|$ and $m = |E|$. Explain which part of the graph processing dominates this running time.
	- there are n-1 iterations
	- in the worst case, the set of edges crossing (X, V / X) can be O(m) each time, and we search it from scratch, exhaustively --> so we get to O(nm)
		- This is **dominated by the repeated full scans to find the minimum len(v)+ℓvw**​ on the frontier at each iteration.
2. **Heap Optimization:** Dijkstra's algorithm can be significantly improved by implementing the main loop (lines 3–6) using a heap data structure.
    - What function is the **key** value of a vertex $w$ in the heap based upon, and why does using a heap improve the running time?.
	    - the heap key is its current tentative distance: key(w) = len(w) = min(v,w), the best Dijkstra score found so far for w
	    - it helps bevause instead of rescanning all the frontier edges every iteration, we maintain min-priority queue of vertices keyed by their tentative distances.
		    - knwoing that extract-min gives the next vertex to finalize with O(log n)
		    - and each edge relaxation can trigger a decrease-key (or a re-insert) in O(log n), this vids the O(m)-per-iteration frontier rescan
    - State the improved Big-O running time complexity when using an efficient heap implementation.
	    - with a binary heap + adjacency lists: O(m log m)
	    - wih a heap: O(m + n log n)

### Part C: Relationship to BFS

1. **Reduction:** The sources state that Breadth-First Search (BFS) is a special case of Dijkstra’s algorithm. Describe the specific condition that must hold for the input graph weights such that Dijkstra’s algorithm (which tracks $\ell_{en}(v)$ as the path length sum) yields the exact same result and search pattern as BFS (which finds the minimum number of edges).
	- All edges have to have equal weight (any positive constant) for Dijkstra to behave like BFS. Then the path cost would be proprotional to the number of edges, so Dijkstra's tentative distances increase level by level  exactly as BFS explore layers.

---

This course covers several high-yield areas beyond basic graph traversal (BFS/DFS) and shortest path/MST algorithms. Based on the course syllabus structure, lecture focus, and explicit assignments (A4 and material linked to Exam Part B), **Dynamic Programming (specifically the 0/1 Knapsack Problem)** is a highly likely topic for an open-answer examination question.

Here is a question drawing on the principles and practical computation of Dynamic Programming:

---

The following are open-answer questions, designed in an exam style, covering fundamental concepts and algorithms within the topic of graphs, drawing exclusively from the provided source materials.

---

### Open Answer Questions for Graph Theory and Algorithms

#### Question 1: Graph Traversal Algorithms: BFS and DFS

**Task:** Compare and contrast Breadth-First Search (BFS) and Depth-First Search (DFS) based on their core mechanism, typical data structure implementations, and applications related to shortest paths and graph structure analysis.

**Required response elements:**

1. **Mechanism:** Describe the exploration order of BFS (layer by layer) and DFS (exploring deeply first).
2. **Implementation:** State the standard data structure used for each algorithm and briefly explain why it supports the respective search strategy.
3. **Applications & Complexity:** Explain the key application where BFS finds the shortest path and state the overall running time complexity for both algorithms in terms of vertices ($V$ or $n$) and edges ($E$ or $m$).

#### Question 2: Dijkstra's Algorithm and the Impact of Negative Weights

**Task:** Discuss the assumptions required for Dijkstra’s algorithm to correctly compute the shortest paths and explain why the algorithm fails specifically when negative edge weights are present in the input graph.

**Required response elements:**

1. **Assumptions:** List the primary assumptions necessary for Dijkstra's algorithm to guarantee a correct solution for the single-source shortest path problem.
2. **Mechanism Overview:** Briefly explain the core greedy principle of Dijkstra’s algorithm, referencing the **Dijkstra score** ($d_{score} = len(v) + l_{vw}$) used to select the next vertex to add to the explored set $X$.
3. **Failure Analysis:** Using the concept of reweighting (e.g., adding a constant positive number to all edges) and citing the presented example, explain why this approach fails to solve the single-source shortest path problem when negative edge lengths are involved, resulting in incorrect shortest paths being chosen in the transformed graph.

#### Question 3: Minimum Spanning Tree (MST) Algorithms

**Task:** Compare Kruskal's algorithm and Prim's algorithm for finding a Minimum Spanning Tree (MST). Analyze how the graph's density influences the choice between optimized implementations of the two algorithms.

**Required response elements:**

1. **Greedy Strategies:** Describe the fundamental difference in how Prim's algorithm and Kruskal's algorithm operate (i.e., Prim grows a single tree, Kruskal grows a forest/fuses components).
2. **Optimized Implementation and Complexity:** State the Big-O running time complexity of both algorithms when optimized using efficient data structures (Heap for Prim's, Union-Find for Kruskal's).
3. **Density Comparison:** Based on their operational principles and optimized running times, advise whether Prim's or Kruskal's algorithm is generally preferred for **dense graphs** versus **sparse graphs**.

#### Question 4: Advanced Search: A* Algorithm

**Task:** Explain the conceptual relationship between the A* algorithm and Dijkstra’s algorithm. Specifically, detail the role of the heuristic function $h(n)$ in A* and discuss the property that the heuristic must possess (e.g., consistency) to guarantee that A* returns an optimal solution.

**Required response elements:**

1. **A* Purpose and Relation to Dijkstra:** State the goal of the A* algorithm (shortest path from a single source to a single destination). Explain how the A* evaluation function combines the Dijkstra score (cost from source $s$) with the heuristic $h(n)$.
2. **Role of Heuristic:** Describe the intuitive purpose of the heuristic function $h(n)$ (estimating proximity to target) and how a good heuristic can lead to A* exploring fewer nodes than Dijkstra's algorithm.
3. **Optimality Guarantee:** Identify the necessary property (e.g., consistency) that the heuristic function must satisfy to guarantee that the A* search returns an optimal solution.

#### Question 5: Longest Path in Directed Acyclic Graphs (DAGs)

**Task:** Describe a dynamic programming approach for finding a longest weighted simple path from a distinguished source vertex $s$ to a distinguished target vertex $t$ in a directed acyclic graph (DAG) with real-valued edge weights.

**Required response elements:**

1. **Problem Context:** Explain why the longest path problem is particularly tractable when restricted to DAGs (i.e., the absence of cycles avoids arbitrarily large path lengths).
2. **Dynamic Programming Approach:** Outline the steps of the `LONGEST-PATH-DAG(G, s, t)` procedure, noting the initial requirement of performing a **topological sort** on the graph $G$.
3. **Recursive Relation (Update Rule):** Define the core computation used to update the path length $d[v]$ for a vertex $v$ based on its predecessors $u$ in the topologically sorted order.
4. **Running Time:** State the overall running time complexity of the algorithm.
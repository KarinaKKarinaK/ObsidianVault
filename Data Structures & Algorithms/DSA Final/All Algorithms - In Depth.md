Algorithms are defined as a finite sequence of precise instructions for performing a computation or solving a problem, requiring inputs, producing outputs, possessing definiteness, correctness, finiteness, and generality.

## I. Sorting Algorithms

Sorting methods are crucial for ordering data. The course emphasizes comparison sorts like Merge Sort, Quick Sort, Bubble Sort, and Selection Sort, all necessary for Assignment 1. Merge Sort and Quick Sort are noted as "blazingly fast algorithms" with an impressive running time of $O(n \log n)$.

### 1. Insertion Sort

- **Paradigm:** Incremental method.
- **Description:** For each element $A[i]$, it is inserted into its proper place within the already sorted subarray $A[1 \dots i-1]$. The inner loop uses a linear search backward through the sorted subarray.
- **Running Time:** The worst-case running time is $\mathbf{\Theta(n^2)}$. The best case, when the array is already sorted, results in a linear running time. Insertion Sort is fast for small input sizes and sorts "in place".
- **Process (High-Level):** The outer loop runs $n-1$ times, regardless of the values being sorted. The inner loop’s iterations depend on the values being sorted.

### 2. Merge Sort

- **Paradigm:** **Divide-and-Conquer**. It breaks the problem into subproblems that are similar but smaller, solves them recursively, and combines the solutions.
- **Description:** Merge Sort is an effective sorting algorithm. It works recursively based on three steps:
    1. **Divide:** Split the array $A[p \dots r]$ into two halves: $A[p \dots q]$ and $A[q+1 \dots r]$, where $q$ is the midpoint.
    2. **Conquer:** Recursively sort the two subarrays using Merge Sort.
    3. **Combine (Merge):** Merge the two sorted subarrays back into $A[p \dots r]$ to produce the final sorted answer.
- **Running Time:** $\mathbf{\Theta(n \log n)}$ worst-case and average-case. This is achieved because the time to merge $n$ items is $\Theta(n)$.
- **Drawback:** It requires a **temporary array to merge** the sorted arrays, meaning it uses a lot of memory for the recursive step.
- **Process (Pseudocode excerpt):**
    
    ```
    MERGE-SORT(A, p, r)
    1 if p < r // zero or one element?
    2 return
    3 q = floor((p + r) / 2) // midpoint of A[p..r]
    4 MERGE-SORT(A, p, q) // recursively sort A[p..q]
    5 MERGE-SORT(A, q + 1, r) // recursively sort A[q+1..r]
    6 // Merge A[p..q] and A[q+1..r] into A[p..r].
    7 MERGE(A, p, q, r)
    ```
    

### 3. Quick Sort

- **Paradigm:** **Divide-and-Conquer**.
- **Description:** Quick Sort is competitive and practically used, often included in standard libraries. It sorts **in place**, which leads to minimal memory overhead. Its speed is due to having small constant factors in its running time.
- **Running Time:** The worst-case running time is $\mathbf{\Theta(n^2)}$. The expected (average) running time is $\mathbf{\Theta(n \log n)}$.
- **Process (High-Level):** The algorithm relies on a **PARTITION** subroutine. The `quicksort` function is called recursively on the partitions.

### 4. Heap Sort

- **Paradigm:** Uses a dedicated data structure (**Heap**) to manage information.
- **Description:** Like Merge Sort, Heap Sort has a running time of $O(n \log n)$, but like Insertion Sort, it sorts **in place**. It relies on the max-heap data structure.
- **Running Time:** $\mathbf{O(n \log n)}$ worst-case.
- **Process (Steps):**
    1. **Build Max-Heap:** Convert the unordered input array into a max-heap.
    2. **Swap:** Exchange the first element (the largest, at the root) with the last element in the currently considered range of the array.
    3. **Decrease Range:** Decrease the considered range of the array by one (the largest element is now in its final sorted position).
    4. **Max-Heapify (Sift Down):** Sift down the new first element to its appropriate index to maintain the heap property.
    5. **Repeat:** Go to Step 2 unless the considered range is one element.

---

## II. Graph Search Algorithms

The objective of graph search is to **identify the vertices reachable** from a starting vertex $s$.

### 5. Breadth-First Search (BFS)

- **Paradigm:** Graph search strategy.
    
- **Description:** BFS explores the vertices of a graph **in layers**, in order of increasing distance (number of edges) from the starting vertex $s$. BFS computes the shortest path distance in graphs where all edges have unit length.
    
- **Data Structure:** Implemented using a **Queue** (First-In, First-Out or FIFO). The queue helps track which vertices to explore next.
    
- **Running Time:** $\mathbf{O(V+E)}$. This is linear in the size of the adjacency-list representation of the graph, making it a "for-free primitive".
    
- **Applications:**
    
    - Finding the shortest path (in terms of minimum number of edges).
    - Computing the connected components of an undirected graph.
    - Broadcasting tasks, such as in networks.
- **Process (Pseudocode High-Level):**
    
    1. Initialize all vertices as unexplored (color WHITE) except $s$, which is marked as explored (color GRAY).
    2. Initialize a Queue, $Q$, with $s$.
    3. **Loop:** While $Q$ is not empty: a. Remove vertex $v$ from the front of $Q$. b. For each neighbor $w$ of $v$: i. If $w$ is unexplored (WHITE), mark $w$ as explored (GRAY). ii. Add $w$ to the end of $Q$. c. Mark $v$ as BLACK (behind the frontier).

### 6. Depth-First Search (DFS)

- **Paradigm:** Graph search strategy.
    
- **Description:** DFS searches "deeper" in the graph whenever possible. It explores edges out of the most recently discovered vertex $v$ that still has unexplored edges leaving it. It then "backtracks" when all edges from $v$ have been explored.
    
- **Data Structure:** Implemented using a **Stack** (Last-In, First-Out or LIFO).
    
- **Running Time:** $\mathbf{O(V+E)}$.
    
- **Applications:**
    
    - Solving puzzles, such as mazes.
    - **Topological Ordering** of a Directed Acyclic Graph (DAG).
    - Finding Strongly Connected Components.
- **Process (High-Level):** DFS starts by marking a source node $s$ as explored. When visiting a node, it immediately selects one of its unexplored neighbors to visit next, thus diving deep into the graph before backtracking.
    
- **Example (DFS for Path Finding):** When searching for a path from a `start` node to an `end` node using DFS, a stack is used to track nodes and their paths. The algorithm iteratively pops the stack, extracts the current node and path, checks if the node is the `end` node, and if not, pushes its neighbors onto the stack.
    

---

## III. Shortest Path Algorithms

These algorithms aim to find a path such that the path from the source node to any other node is the shortest one in the graph.
![[Screenshot 2025-10-17 at 17.50.27.png]]

![[Screenshot 2025-10-17 at 17.52.19.png]]
### 7. Dijkstra's Algorithm

- **Paradigm:** Greedy Algorithm. It explores the cheapest next edge (according to the Dijkstra score).
- **Description:** Solves the **single-source shortest paths problem** by finding the shortest path from a vertex $s$ to **every other vertex** in the graph. It generalizes BFS to handle weighted edges.
- **Assumptions:** Requires the input graph to be **directed** and all edge lengths ($l_e$) must be **non-negative** ($l_e \ge 0$).
- **Running Time (Optimized):** When implemented with a **heap** data structure to facilitate repeated minimum computations, the running time is $\mathbf{O((V+E) \log V)}$.
- **Process (Pseudocode High-Level):**
    1. **Initialization:** $X = {s}$ (set of vertices for which shortest path is known). Set $len(s) = 0$ and $len(v) = +\infty$ for all other $v \neq s$.
    2. **Main Loop:** While there is an edge $(v, w)$ where $v \in X$ and $w \notin X$: a. Find the edge $(a, b)$ that minimizes $len(v) + l_{vw}$ among all edges crossing the boundary of $X$. b. Add $b$ to $X$. c. Set $len(b) = len(a) + l_{ab}$.
- **Example (Vertex Order):** Starting at vertex A, the order in which vertices are deleted from the priority queue (and their shortest distance from A) could be: A, 0; D, 3; B, 4; G, 4; C, 6; E, 6; F, 7.

### 8. A* Search Algorithm

- **Paradigm:** Informed Search Algorithm (heuristic search).
- **Description:** A* is used in graph traversal to find the shortest path from a **single source to a single destination**. It uses a **heuristic approximation** of the true distance to the target to guide its choices.
- **Evaluation:** A* uses an evaluation function $f(n) = g(n) + h(n)$, where $g(n)$ is the cost from the source to $n$, and $h(n)$ is the estimated cost from $n$ to the destination (the heuristic).
- **Optimality:** A* search is **guaranteed to return an optimal solution** if the heuristic function $h(n)$ is consistent (or admissible).
- **Implementation:** It can be implemented using a **priority queue** to speed up the selection of the next vertex to visit according to the combined score.
- **Running Time:** The running time depends on the choice of the heuristic function.

### 9. Topological Sort

- **Paradigm:** Graph Algorithm application of DFS.
- **Description:** A linear ordering of all vertices in a **Directed Acyclic Graph (DAG)** such that if an edge $(u, v)$ exists, $u$ appears before $v$ in the ordering. Topological sorting is defined only on directed graphs that are acyclic (no linear ordering is possible with a cycle).
- **Application:** Used for problems with prerequisites, such as course dependencies.
- **Running Time:** $\mathbf{O(V+E)}$ by using DFS.
- **Process (High-Level):** Topological sort is performed using DFS. It involves running DFS and recording the vertices in order of **decreasing finish time**.

---

## IV. Minimum Spanning Tree (MST) Algorithms

The goal of MST algorithms is to design a network with the **minimum cost**. They apply the **Greedy Algorithm** design paradigm. The input graph must be **weighted, connected, and undirected**.

### 10. Prim’s Algorithm

- **Paradigm:** Greedy Algorithm.
- **Description:** Prim's algorithm grows a single tree one edge at a time, starting from an arbitrary vertex $s$. In each iteration, it greedily adds the cheapest edge that connects a vertex in the tree-so-far ($v \in X$) to a vertex outside the tree ($w \in V-X$). It resembles Dijkstra's algorithm.
- **Running Time (Optimized):** When implemented with a **heap** (min-priority queue), the running time is **$\mathbf{O((V+E) \log V)}$** or $\mathbf{O((m+n) \log n)}$.
- **Process (Pseudocode High-Level):**
    1. **Initialization:** $X := {s}$ (a starting vertex); $T := \emptyset$ (set of MST edges).
    2. **Main Loop:** While $X \neq V$ (not all vertices included): a. Find the edge $(v, w)$ with the least cost such that $v \in X$ and $w \in V-X$. b. $X := X \cup {w}$ (add the new vertex). c. $T := T \cup {(v, w)}$ (add the new edge).
    3. Return $T$.

### 11. Kruskal’s Algorithm

- **Paradigm:** Greedy Algorithm.
- **Description:** Kruskal’s algorithm considers edges in order of monotonically increasing cost and adds an edge if it does not form a cycle. It uses the **Union-Find** data structure to check for cycles efficiently.
- **Running Time (Optimized):** $\mathbf{O(E \log V)}$ or $\mathbf{O(m \log n)}$. This complexity is dominated by the time required to sort the edges initially.

---

## V. Advanced Algorithms (Integer Multiplication & Dynamic Programming)

### 12. Karatsuba’s Algorithm (Integer Multiplication)

- **Paradigm:** Divide-and-Conquer, specifically designed for recursion.
- **Description:** Karatsuba's algorithm is an efficient recursive multiplication algorithm for large integers. It improves upon the naive recursive approach (which runs in $\Theta(n^2)$) by performing only **three recursive calls** instead of four.
- **Running Time:** The complexity is superior to $O(n^2)$ due to the reduction in recursive calls. The time complexity for multiplying two $\beta$-bit integers is $\mathbf{\Theta(\beta^{\lg 3})}$ (approx. $O(\beta^{1.58})$).

### 13. Dynamic Programming (DP)

- **Paradigm:** Optimization technique that solves problems by combining solutions to subproblems. DP is necessary when subproblems **overlap**.
- **Key Ingredients:**
    1. **Optimal Substructure:** An optimal solution contains within it optimal solutions to subproblems.
    2. **Overlapping Subproblems:** The recursive solution repeatedly solves the same subproblems.
- **Application Example: Optimal Binary Search Trees (Optimal BST)**
    - **Problem:** Given distinct keys $K$ and probabilities of searching for each key $p_i$ and dummy key $q_i$, construct a BST that minimizes the expected search cost.
    - **Approach:** This problem can be solved efficiently with Dynamic Programming because an exhaustive search requires examining an exponential number of possible binary search trees ($\Theta(4^n / n^{3/2})$).
    - **Optimal Substructure:** Any subtree of an optimal BST must itself be optimal for the keys it contains.

### 14. Binary Search (Search Algorithm)

- **Paradigm:** Divide-and-Conquer (implicitly).
- **Description:** Binary search is an efficient way to find an element in a **sorted array**. It works by continually checking the object in the middle position of the array and recursing on the left half or the right half.
- **Running Time:** Each recursive call cuts the array size by a factor of 2, leading to at most $\log_2 n$ recursive calls. The overall worst-case running time is $\mathbf{\Theta(\log n)}$.
- **Example (Search in Array):** To search the array $h3, 6, 10, 11, 17, 23, 30, 36i$ for the key 8:
    1. Examine the fourth object (key 11).
    2. Recurse on the left half (keys 3, 6, and 10).
    3. Check the second object (key 6).
    4. Recurse on the right half of the remaining array (key 10).
    5. Conclude that the key 8 would be between the second and third objects, and report "none".
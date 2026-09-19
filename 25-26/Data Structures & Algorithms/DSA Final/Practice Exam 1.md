This practice examination covers core concepts, complexity analysis, data structures, graph algorithms, and shortest path/MST algorithms, based entirely on the provided course material. Note that the Practicum components (Part A and B) focus on implementation knowledge of Assignments 1–4, while the Theory parts focus on conceptual understanding, complexity, and algorithm pseudocode logic.

---

## DSA Practice Examination (8 Questions)

### Question 1: Computational Complexity (Big-O Notation)

Given the pseudocode function below, what is the tightest upper bound complexity expressed in terms of Big-O notation, assuming $n$ is the input size?

```
function x(int n){
    for(int i=1 ; i<=n ; i++){
        for(int j=1 ; j<=n ; j++){
            for(int k=3 ; k<=n ; k++){
                for(int l=1 ; l<=n ; l=l*2){
                    int h=4;
                }
            }
        }
    }
}
```

A. $O(n^3)$ B. $O(n^4)$ C. $O(n^3 \cdot \log n)$ D. $O(n^2 \cdot \log n)$

### Question 2: Shortest Path Algorithms (Dijkstra and A*)

Mark all statements that are **TRUE** regarding Dijkstra's Algorithm and the A* Search Algorithm.

A. Dijkstra's algorithm is proven correct only if the input graph is directed and contains non-negative edge lengths. B. In A*, the evaluation function $f(n)$ is calculated as the sum of the distance from the source $g(n)$ and the heuristic approximation $h(n)$ of the distance to the target, $f(n) = g(n) + h(n)$. C. Dijkstra's algorithm running on an unweighted graph works just like a classic Breadth-First Search (BFS). D. The complexity of Dijkstra’s algorithm implemented with a heap data structure is $O(n \log n)$.

### Question 3: Minimum Spanning Trees (Prim’s and Kruskal’s)

Select the statement that is **FALSE** regarding Minimum Spanning Tree (MST) algorithms.

A. Both Prim’s algorithm and Kruskal’s algorithm are examples of greedy algorithms for finding an MST. B. Kruskal’s algorithm is generally preferred for sparse graphs, while Prim’s algorithm is generally preferred for dense graphs. C. If a connected undirected graph has distinct real-valued edge costs, its Minimum Spanning Tree is guaranteed to be unique. D. The time complexity of Prim’s algorithm, when implemented with a heap data structure, is asymptotically worse than the linear time needed to read the input, typically running in $O(E \log V)$ or $O((m+n) \log n)$ time.

### Question 4: Heap Data Structure Operations

What is the worst-case running time (in terms of Big-O notation) for the **Find min** operation on a standard Min-Heap data structure containing $n$ elements?

A. $O(\log n)$ B. $O(n)$ C. $O(1)$ D. $O(n \log n)$

### Question 5: Graph Search Memory Usage

Mark all statements that are **TRUE** when comparing the implementation and memory characteristics of Breadth-First Search (BFS) and Depth-First Search (DFS).

A. BFS explores the graph in layers and is typically implemented using a Queue data structure. B. DFS explores deeper into the graph whenever possible and is typically implemented using a Stack data structure. C. The maximum memory taken by Depth-First Search is equal to the depth of the tree, and the maximum memory taken by Breadth-First Search is equal to the width of the tree. D. Computing a topological ordering of a Directed Acyclic Graph (DAG) is the most typical application of the BFS algorithm.

### Question 6: Binary Search Tree (BST) Property and Performance

Select the statement that correctly describes the operation and performance of searching in a standard (not necessarily balanced) Binary Search Tree (BST).

A. The key defining property of a BST is that for any node $x$, the keys in $x$'s left subtree are smaller than $x$'s key, and the keys in $x$'s right subtree are larger than $x$'s key. B. The `Search` operation in a BST always runs in $O(\log n)$ time, regardless of the tree's height, where $n$ is the number of nodes. C. A BST supports the `Select` operation (finding the $i$-th smallest element) in $O(1)$ time, making it superior to sorted arrays for this operation. D. The search procedure requires recursively checking the middle element of the array, similar to binary search in a sorted array, until the key is found.

### Question 7: Data Structure Choice for Dynamic Data

The Principle of Parsimony suggests choosing the simplest data structure that supports all required operations. Consider an application that requires constantly maintaining an ordered set of elements while frequently performing **Insert** and **Delete** operations, as well as logarithmic-time searches.

Which of the following comparisons correctly describes the efficiency trade-offs of the most suitable data structure compared to a simpler structure?

A. A **Sorted Array** should be used because its `Search` time is $O(\log n)$, which is faster than the search time for a Balanced Search Tree (BST). B. A **Heap** should be used because it provides faster `Insert` and `Delete` operations ($O(\log n)$) than a Sorted Array ($O(n)$), compensating for the lack of ordered access. C. A **Balanced Search Tree** should be chosen because it guarantees $O(\log n)$ for `Insert`, `Delete`, and `Search` operations, whereas a Sorted Array suffers from $O(n)$ time complexity for `Insert` and `Delete`. D. A **Heap** is the best choice because its primary function is to store an evolving set of objects with keys, supporting `Insert` and `Extract min` in $O(\log n)$ time, fulfilling all requirements.

### Question 8: Algorithm Design Paradigms

Prim’s algorithm for MST and the single-source shortest path problem (Dijkstra) are both fundamentally examples of which algorithmic design paradigm, based on their approach of making locally optimal choices?

A. Divide-and-Conquer B. Brute Force C. Dynamic Programming D. Greedy Algorithm

---

## Answer Key

### Question 1: Computational Complexity (Big-O Notation)

**Correct Answer: C. $O(n^3 \cdot \log n)$**

**Explanation:** The total running time $T(n)$ is determined by the nested loops:

1. Outer loop (i): runs $n$ times.
2. Second loop (j): runs $n$ times.
3. Third loop (k): runs $n$ times.
4. Innermost loop (l): multiplies $l$ by 2 until it reaches $n$, which means it runs $\log_2 n$ times.

Therefore, $T(n) = n \cdot n \cdot n \cdot \log n = O(n^3 \cdot \log n)$.

### Question 2: Shortest Path Algorithms (Dijkstra and A*)

**Correct Answers: A, B, C**

**Explanation:** A. Dijkstra's algorithm requires the input graph to be **directed** and have **non-negative edge lengths** for its correctness proof to hold. B. The A* evaluation function combines the actual distance traversed so far ($g$) and the heuristic estimate of the remaining distance ($h$). C. Dijkstra's algorithm operates by selecting the next node based on the shortest cumulative distance. If all edge weights are 1 (unweighted graph), this is equivalent to Breadth-First Search (BFS), which minimizes the number of edges/hops. D. The complexity of the heap-based Dijkstra algorithm is $O((V+E) \log V)$ or $O((m+n) \log n)$, not just $O(n \log n)$. The heap operations (Insert, ExtractMin, Delete) dominate the running time, giving the $O((m+n) \log n)$ bound.

### Question 3: Minimum Spanning Trees (Prim’s and Kruskal’s)

**Correct Answer: D. The time complexity of Prim’s algorithm, when implemented with a heap data structure, is asymptotically worse than the linear time needed to read the input, typically running in $O(E \log V)$ or $O((m+n) \log n)$ time.**

**Explanation:** D is **FALSE**. The heap-based implementation of Prim's algorithm runs in $\mathbf{O((m+n) \log n)}$ time, which is recognized as "only a logarithmic factor more than the time required to read the input", and thus qualifies the MST problem as a "for-free primitive". This time is considered **near-linear** or "blazingly fast".

A, B, and C are true statements.

### Question 4: Heap Data Structure Operations

**Correct Answer: C. $O(1)$**

**Explanation:** For both [[Min-Heaps]] and Max-Heaps, the minimum (or maximum) element is always stored at the root (index 0 or 1). Therefore, the `Find min` operation only requires reading the root of the heap. This operation has a running time of **$O(1)$**.

### Question 5: Graph Search Memory Usage

**Correct Answers: A, B, C**

**Explanation:** A. BFS is a layer-by-layer exploration strategy implemented using a First-In, First-Out (FIFO) **Queue**. B. DFS pursues branches deeply, implemented using a Last-In, First-Out (LIFO) **Stack**. C. The maximum memory used by DFS is proportional to the **depth** of the tree, while BFS memory usage is proportional to the **width** of the tree. D. This statement is **FALSE**. DFS (not BFS) is the **typical algorithm** used to compute a topological ordering of a DAG, usually requiring only minor changes to the recursive DFS implementation.

### Question 6: Binary Search Tree (BST) Property and Performance

**Correct Answer: A. The key defining property of a BST is that for any node $x$, the keys in $x$'s left subtree are smaller than $x$'s key, and the keys in $x$'s right subtree are larger than $x$'s key.**

**Explanation:** A. This is the correct definition of the Binary Search Tree property. B. The `Search` operation runs in $O(h)$ time, where $h$ is the height of the tree. Since a standard BST can degenerate into a list (worst case $h=n$), the worst-case search time is $O(n)$, not always $O(\log n)$. C. The `Select` operation in a search tree runs in $O(height)$ time, which is $O(\log n)$ only for balanced trees, but requires augmenting the BST with size information. Sorted arrays are superior for `Select`, running in $O(1)$ time. D. The search procedure starts at the root and repeatedly traverses left or right based on the comparison with the current key. It does not involve recursively checking a middle element of an array, though the logic is analogous to binary search.

### Question 7: Data Structure Choice for Dynamic Data

**Correct Answer: C. A **Balanced Search Tree** should be chosen because it guarantees $O(\log n)$ for `Insert`, `Delete`, and `Search` operations, whereas a Sorted Array suffers from $O(n)$ time complexity for `Insert` and `Delete`.**

**Explanation:** The requirements are **ordered maintenance, frequent Insert/Delete, and logarithmic Search**.

- A Sorted Array supports $O(\log n)$ search but $O(n)$ insertion/deletion.
- A Heap supports fast $O(\log n)$ modification but lacks ordered search/retrieval.
- A **Balanced Search Tree** (BST) is the correct choice because it is designed to maintain a totally ordered representation of an evolving set of objects, guaranteeing all required operations (Search, Insert, Delete) run in $\mathbf{O(\log n)}$ time.

### Question 8: Algorithm Design Paradigms

**Correct Answer: D. Greedy Algorithm**

**Explanation:** Both Prim's and Kruskal's algorithms for MST, as well as Dijkstra's algorithm for shortest paths, operate by making a sequence of choices that are locally optimal at each step (e.g., choosing the cheapest available edge/vertex) in the hope of reaching a globally optimal solution. This approach characterizes the **Greedy Algorithm** paradigm.
The correctness of Breadth-First Search (BFS) primarily rests on its ability to explore the graph **in layers**, guaranteeing that it finds the shortest path in terms of the number of edges (for unweighted graphs).

### BFS Correctness Explained

The primary correctness goal of BFS is to show that, upon termination, the calculated distance attribute for every vertex $v$, denoted $v.d$ (or $l(v)$ in some pseudocode), is equal to the true shortest-path distance from the source $s$, denoted $\delta(s, v)$:

$$\mathbf{v.d = \delta(s, v)}$$

BFS achieves this because it operates using a queue (a First-In, First-Out structure), ensuring that all vertices at distance $k$ from the source $s$ are discovered and processed before any vertex at distance $k+1$ is processed. This sequential layer-by-layer discovery ensures that the first time a vertex $v$ is reached and its distance $v.d$ is set, that distance must be the minimum possible number of edges, $\delta(s, v)$.

### Outline of the Proof

The rigorous proof that $v.d = \delta(s, v)$ is typically achieved by demonstrating two things: 1) that $v.d$ never overestimates the distance, and 2) that $v.d$ never underestimates the distance, often using a proof by contradiction.

#### 1. Upper Bound (Proof: $v.d \le \delta(s, v)$)

This step establishes a [[Loop Invariant]] that $v.d$ is an upper bound on the shortest path distance: $\mathbf{v.d \le \delta(s, v)}$ for any vertex $v$.

- **Initialization:** For the source $s$, $s.d = 0 = \delta(s, s)$. For all other vertices $v$, $v.d = \infty$ (or $+1$), which trivially satisfies $v.d \ge \delta(s, v)$.
- **Maintenance:** When an unexplored (white) vertex $v$ is discovered via vertex $u$, BFS sets $v.d = u.d + 1$. By the inductive hypothesis, $u.d \ge \delta(s, u)$. Since $\delta(s, v) \le \delta(s, u) + 1$ (triangle inequality), then $v.d = u.d + 1 \ge \delta(s, u) + 1 \ge \delta(s, v)$. Thus, $v.d$ remains an upper bound.

#### 2. Shortest Distance Found (Proof: $v.d \ge \delta(s, v)$ via Contradiction)

We must show that $v.d$ is exactly $\delta(s, v)$, meaning it cannot be strictly greater.

1. **Assumption for Contradiction:** Assume there exists a vertex $v$ such that $v.d > \delta(s, v)$.
2. **Minimal Counterexample:** Choose $v$ to be the vertex that violates this assumption, but has the minimum possible shortest-path distance, $\delta(s, v)$.
3. **Predecessor Analysis:** Let $u$ be the vertex immediately preceding $v$ on a shortest path from $s$ to $v$. By construction, $\delta(s, v) = \delta(s, u) + 1$.
4. **Applying Minimality:** Since $\delta(s, u) < \delta(s, v)$, vertex $u$ must satisfy the correctness property: $u.d = \delta(s, u)$.
5. **Deriving Contradiction:** Substituting this into the assumption $v.d > \delta(s, v)$, we get $v.d > u.d + 1$.
6. **Resolution:** However, when BFS processed $u$ and discovered $v$ (if $v$ was white), it would have set $v.d = u.d + 1$. This equality contradicts the premise $v.d > u.d + 1$. (If $v$ was already colored gray or black, it can be shown that $v.d \le u.d + 1$ must still hold, leading to a contradiction regardless of $v$'s color when $u$ is processed.)
7. **Conclusion:** The initial assumption must be false. Therefore, $\mathbf{v.d = \delta(s, v)}$ for all vertices $v$, proving the algorithm's correctness.
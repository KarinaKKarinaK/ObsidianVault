- Use of Priority Queue
- if priority queue implemented with heap then in $O(|E | · log |V |)$

# Algorithm

## Pseudocode & Input
```
Directed graph      G = (V, E)
Positive weights    w
Start vertex        s in G
```

```
Algorithm Dijkstra(G, w, s):
	initialize(G, s)
	S = ∅    // Set containing all vertices for which 
			 // shortest path found
			 
	Q = G.V  // Priority queue of all vertices

	while Q != ∅:
		u = extractMin(Q)
		S = S ∪ {u}
			 // Visit the closest available vertex to starting point
			 // Add that vertex to S
		for each v ∈ G.Adj[u]:
			relax(u, v, w)
			 // Update distances for each neighbour
```

A better intuition of Dijkstra can be gained [here](https://www.youtube.com/watch?v=_lHSawdgXpI).

## Alternate Pseudocode
![[Pasted image 20221214123820.png]]

## High-level algorithm

- Start at a point
- Get heap of adjacent unvisited points
- Go to the closest unvisited point (minimum distance from starting point)
- From that point, update heap of adjacent unvisited points
- If (there are unvisited points | target point has not been visited) goto step 3

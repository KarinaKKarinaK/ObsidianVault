Improvement on Binary Search Trees

BST with additional balancing property:
 - For every node, absolute value of (right subtree height- left subtree height) is at most 1
	- Empty tree height = -1

![[Pasted image 20221215154658.png]]

![[Pasted image 20221215154710.png]]

# Operations

![[Pasted image 20221215154725.png]]

## Insertion

- Insert node using BST algorithm ($O(\log n)$)
- Check for unbalanced nodes; identify lowest between new node and root $O(\log n)$
- Rebalance nodes using rotation $O(1)$

- Total operation in $O(\log n)$

![[Pasted image 20221215170118.png]]

### Intuition

![[Pasted image 20221215155208.png]]
![[Pasted image 20221215155231.png]]

(mirror these two to get all four cases:)

![[Pasted image 20221215155310.png]]



### Detailed Notes

![[Pasted image 20221215154909.png]]

![[Pasted image 20221215155013.png]]
![[Pasted image 20221215155028.png]]
![[Pasted image 20221215155036.png]]


## Deletion

### Intuition

- Remove using BST algorithm ($O(\log n)$)
- Find first unbalanced node ($O(\log n)$)
- Rebalance $O(1)$
	- 6 possible cases of unbalanced nodes (3 pairs)
	- One balancing step not necessarily sufficient
- **If necessary, consider next unbalanced node and rebalance ($O(\log n)$)**

- No additional rules needed

![[Pasted image 20221215171924.png]]

### Detailed Notes

![[Pasted image 20221215171427.png]]


## Rebalancing

- 6 cases total (3 symmetric pairs)
	- 4 used in insertion
	- All 6 used in deletion

- I really recommend doing at least a few instances of both to gain intuition about it; it's kinda terrible to really understand unless you actually play around with it (unfortunately)

![[Pasted image 20221215155208.png]]
![[Pasted image 20221215155231.png]]


![[Pasted image 20221215171810.png]]



![[Pasted image 20221215171906.png]]

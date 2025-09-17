
---

## Lecture Goals

- Learn about fundamental non-array data structures:
    
    - **Linked Lists** (dynamic memory-friendly sequences).
        
    - **Rooted Trees** (hierarchical structures).
        
    - **Binary Search Trees (BSTs)** and traversals.
        
    - **Hash Tables** (fast dictionary-like access).
        
- Understand how these structures are implemented and analyzed.
    

---

## 3.1 Linked Lists

### Motivation

- Arrays have drawbacks:
    
    - Fixed size.
        
    - Costly insertions/deletions (need shifting).
        
- Linked Lists solve this by using dynamic allocation + pointers.
    

### Singly Linked List

- Each node has:
    
    - `key` (data).
        
    - `next` (pointer to next node).
        
- Last node points to `NIL`.
    

**Operations:**

- **Search(L, k)**: traverse nodes until key found. → O(n).
    
- **Insert(L, x)**: insert at head (constant-time). → O(1).
    
- **Delete(L, x)**: adjust pointers. → O(1) if pointer to node known; else O(n) (need to search).
    

### Doubly Linked List

- Each node has:
    
    - `key`, `next`, `prev`.
        
- Allows bidirectional traversal.
    
- Supports deletion without searching backward (if pointer given).
    

### Advantages & Disadvantages

- Pros: dynamic size, efficient insertion/deletion.
    
- Cons: O(n) search, extra memory for pointers.
    

---

## 3.2 Rooted Trees

### Definition

- A **tree** is a non-linear hierarchical structure.
    
- A **rooted tree** has a designated root node.
    
- Each node may have children.
    
- **Binary tree:** each node has ≤2 children (left, right).
    

### Binary Search Tree (BST)

- A BST is a binary tree with the property:
    
    - For each node x:
        
        - All keys in left subtree ≤ key[x].
            
        - All keys in right subtree ≥ key[x].
            
- Enables **efficient search, insert, delete** (O(h), h = height).
    

### Tree Traversals

- **In-order (L, Root, R):** prints sorted order.
    
- **Pre-order (Root, L, R):** useful for copying tree.
    
- **Post-order (L, R, Root):** useful for deleting/freeing tree.
    

### Print-Tree Pseudocode

```python
def PrintTreeWalk(x):
    if x != NIL:
        PrintTreeWalk(x.left)
        print(x.key)
        PrintTreeWalk(x.right)
```

- Produces sorted order in BST.
    

### Complexity

- Worst-case height h = O(n) (if tree is skewed).
    
- Balanced BSTs (e.g., AVL, Red-Black Trees) guarantee h = O(log n).
    

---

## 3.3 Hash Tables

### Motivation

- Need fast **dictionary** operations: search, insert, delete.
    
- Arrays → O(1) but require contiguous keys.
    
- Linked lists/trees → O(n) or O(log n).
    
- Hash tables → **expected O(1)** per operation.
    

### Hash Function

- Maps a universe of keys into indices of a table:
    
    ```
    h: U → {0,1,…,m−1}
    ```
    
- Keys with same hash value cause **collisions**.
    

### Collision Handling

1. **Chaining:** each table entry points to linked list of elements with same hash.
    
    - Insert: prepend to list.
        
    - Search/Delete: traverse list.
        
    - Expected time: O(1 + α), α = load factor (n/m).
        
2. **Open Addressing:** all elements stored in table itself.
    
    - Resolve collisions by probing (linear, quadratic, double hashing).
        
    - Load factor must stay < 1.
        

### Performance

- Expected O(1) for well-designed hash function & reasonable α.
    
- Worst-case O(n) if collisions degenerate.
    

### Analogy

- Like buckets (bins) for keys; collisions → multiple items in one bucket.
    

---

## 🔑 Lecture III Upshot

- **Linked Lists**: dynamic, flexible, O(1) insertion/deletion; O(n) search.
    
- **Rooted Trees & BSTs**: hierarchical, in-order traversal yields sorted order; search = O(h).
    
- **Hash Tables**: average O(1) search/insert/delete; collisions must be managed.
    
- Data structure choice = trade-off between access speed, memory, and operations.
    

---

## 🎓 Exam / Interview Tips

- Draw **linked list diagrams** (singly vs doubly).
    
- Be able to **trace BST traversals** (pre/in/post-order).
    
- Write **PrintTreeWalk** pseudocode.
    
- Know collision resolution strategies (chaining vs open addressing).
    
- Discuss load factor α and its impact.
    

---

## 🧠 Common Pitfalls

- Forgetting to update `prev` in doubly linked list deletion.
    
- Confusing **tree height vs depth**.
    
- Assuming BST is always balanced (can degenerate to linked list).
    
- Thinking hash tables guarantee O(1) (only expected; worst-case O(n)).
    

---
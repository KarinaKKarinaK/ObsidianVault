
---

## Lecture Goals

- Introduce the course structure and motivation for studying algorithms.
    
- Understand the **importance of algorithm analysis**.
    
- Explore the first non-trivial data structure/algorithmic trick: **implementing a queue using two stacks**.
    

---

## 1.1 What Are Algorithms?

**Definition**: An **algorithm** is a finite sequence of precise instructions for solving a computational problem.

- Input → algorithm → output.
    
- Properties: correctness, efficiency, clarity.
    

**Why study them?**

1. Algorithms form the **core of computer science**.
    
2. Crucial for **scalability** (efficiency determines feasibility).
    
3. Central in **AI, ML, robotics, databases, cryptography**.
    

**Algorithm analysis** asks: _How does runtime scale with input size?_ (ignoring constants and machine specifics).

---

## 1.2 The Queue Abstract Data Type (ADT)

### Queue definition

- A **queue** is a linear data structure supporting:
    
    - **ENQUEUE(x)** → insert element at the **back**.
        
    - **DEQUEUE()** → remove element from the **front**.
        
- Follows **FIFO** order (First-In-First-Out).
    
- Analogy: waiting in line at a store.
    

### Implementation options

- Using arrays (circular buffer).
    
- Using linked lists.
    
- But: today’s focus → using **two stacks**.
    

---

## 1.3 Stacks Refresher

A **stack** supports:

- **PUSH(x)**: insert on top.
    
- **POP()**: remove from top.
    
- Follows **LIFO** (Last-In-First-Out).
    
- Analogy: stack of plates.
    

---

## 1.4 Queue Using Two Stacks

**Problem**: How to implement queue operations with **only stacks**?

### Data structure setup

- Two stacks: `S1` and `S2`.
    

### ENQUEUE(x)

```
PUSH(S1, x)
```

- Always push new elements into `S1`.
    
- Runs in Θ(1).
    

### DEQUEUE()

```
if S2 is empty:
    while S1 not empty:
        PUSH(S2, POP(S1))
if S2 is empty:
    error "queue underflow"
else:
    return POP(S2)
```

- If `S2` has elements, pop directly.
    
- If `S2` is empty, move all items from `S1` into `S2` (reversing their order), then pop.
    

### Correctness intuition

- Reversing twice restores FIFO order:
    
    - First reversal: pushing into `S1` stores newest elements on top.
        
    - Second reversal: moving into `S2` restores correct front-to-back order.
        

---

## 1.5 Example Walkthrough

Operations:

```
ENQUEUE(1)
ENQUEUE(2)
ENQUEUE(3)
DEQUEUE() → 1
ENQUEUE(4)
DEQUEUE() → 2
DEQUEUE() → 3
DEQUEUE() → 4
```

### Step-by-step

- After ENQUEUE(1,2,3): `S1 = [1,2,3]`, `S2 = []`.
    
- First DEQUEUE: `S2` empty → move all from `S1` → `S2 = [3,2,1]`. POP → 1.
    
- ENQUEUE(4): `S1 = [4]`, `S2 = [3,2]`.
    
- Next DEQUEUE: POP `S2` → 2.
    
- Next DEQUEUE: POP `S2` → 3.
    
- Last DEQUEUE: `S2` empty → move all from `S1` → `S2 = [4]`. POP → 4.
    

Correct FIFO behavior achieved.

---

## 1.6 Running Time Analysis

- **Worst-case DEQUEUE**: O(n) (when moving all elements from S1 → S2).
    
- **Amortized analysis**:
    
    - Each element is moved from `S1` to `S2` at most **once**.
        
    - Each element is pushed and popped at most **twice**.
        
    - Across m operations, total = O(m).
        
    - So **amortized cost per operation = O(1)**.
        

### Conclusion

- Queue with two stacks gives **amortized O(1) ENQUEUE + DEQUEUE**.
    

---

# 🔑 Lecture I Upshot

- Algorithms are about correctness + efficiency.
    
- Data structures implement abstract operations with performance trade-offs.
    
- Queue (FIFO) and stack (LIFO) are fundamental.
    
- Clever trick: **two stacks = one queue**.
    
- Worst-case `O(n)`, but amortized `O(1)` per operation.
    

---

## 🎓 Exam / Interview Tips

- Be able to write **pseudocode** for ENQUEUE & DEQUEUE using two stacks.
    
- Explain **amortized analysis** argument clearly.
    
- Give a **step-by-step example** (like ENQUEUE 1,2,3 then DEQUEUE).
    
- Distinguish between **worst-case** vs **amortized** runtime.
    
- Common interview question: _Implement a queue with stacks._
    

---

## 🧠 Common Pitfalls

- Forgetting to check underflow (`S1` and `S2` both empty).
    
- Confusing **LIFO vs FIFO order** when reasoning about correctness.
    
- Thinking each DEQUEUE is O(n) → the key is amortized analysis.
    

---
**Algorithm** = A step-by-step procedure that transforms input → output.
##### 3 outcomes:
1. Halts & gives correct answer.
2. Halts & gives wrong answer.
3. Never halts (infinite loop).

### Arrays

- Stored **contiguously in memory**.
    
- Constant-time element access: `O(1)`.
    
- Address formula: address(i) = base + i * size```

Example: If base = 1000, size = 4 bytes:
- A[0] = 1000`, `A[1] = 1004`, `A[2] = 1008`


### Matrices

**Stored either:**
- **Row-major** (C, Python): row by row  => read line by line.
    
- **Column-major** (Fortran, MATLAB) => read column by column like a newspaper.

### Stacks (LIFO – “Last In, First Out”)

- Operations:
    
    - `PUSH(x)` – insert.
        
    - `POP()` – delete most recent.
        
- Analogy: **Stack of plates** in a cafeteria.
    
- Complexity: `O(1)`.

```
def push(S, x):
    if S.top == S.size:
        raise OverflowError("Stack full")
    S.top += 1
    S[S.top] = x

def pop(S):
    if S.top == 0:
        raise ValueError("Stack empty")
    x = S[S.top]
    S.top -= 1
    return x
```

**Errors:**
- **Overflow** – push to full stack.
- **Underflow** – pop from empty stack.


### Queues (FIFO – “First In, First Out”)

- Operations:
    
    - `ENQUEUE(x)` – insert at tail.
        
    - `DEQUEUE()` – remove from head.
        
- Analogy: **People waiting in line**.
    
- Implemented with **circular arrays**.


```
def enqueue(Q, x):
    if (Q.tail + 1) % Q.size == Q.head:
        raise OverflowError("Queue full")
    Q[Q.tail] = x
    Q.tail = (Q.tail + 1) % Q.size

def dequeue(Q):
    if Q.head == Q.tail:
        raise ValueError("Queue empty")
    x = Q[Q.head]
    Q.head = (Q.head + 1) % Q.size
    return x
```

## Next:
[[Basic Algorithms]]
# DB — Transactions

[[DB — Index|← Back to DB Index]]

---

## Key Definitions

> Source: slides/06_transactions.pdf

**Transaction:** a logical unit of work — executed fully or not at all (atomic).

**Schedule:** an interleaving of operations R(X)/W(X) from multiple transactions.

**Conflict:** two ops conflict if: different transactions + same data item + at least one is a write.

| Conflict type | Example | Problem |
|--------------|---------|---------|
| W-R | T1 writes X, T2 reads X | Dirty read |
| R-W | T1 reads X, T2 writes X | Unrepeatable read |
| W-W | T1 writes X, T2 writes X | Lost update |

---

## Concurrency Anomalies

**Lost update:** Two transactions read, both modify, second write overwrites first.
> T1: R(X)...W(X=100) | T2: R(X)...W(X=200) → if T2 commits after T1, T1's update is lost.

**Inconsistent read:** T2 reads data mid-way through T1's multi-step update, seeing a temporary state.
> Money transfer: T1 deducts from checking (step 3), T2 reads sum (step 4), T1 adds to savings (step 6). T2 sees total as reduced by 500 that "disappeared."

---

## Precedence Graph — Step by Step

> Source: ExerciseExam (1).pdf, Q4b schedule

**Schedule from exercise exam:**
```
T1:  R(Z)              R(Y)
T2:       R(Y)  W(Y)        R(V)
T3:  W(V)                         W(Z)
```

**Step 1: List all operations in time order:**
```
T3:W(V), T1:R(Z), T2:R(Y), T2:W(Y), T1:R(Y), T2:R(V), T3:W(Z)
```

**Step 2: Find all conflicting pairs (different txn, same item, ≥1 write):**

| Op 1 | Op 2 | Item | Conflict type | Edge |
|------|------|------|--------------|------|
| T3:W(V) | T2:R(V) | V | W-R | T3 → T2 |
| T2:W(Y) | T1:R(Y) | Y | W-R | T2 → T1 |
| T1:R(Z) | T3:W(Z) | Z | R-W | T1 → T3 |

**Step 3: Draw precedence graph:**
```
T1 ──→ T3
↑        |
│        ↓
T2 ←── T3
```
More precisely: T3→T2, T2→T1, T1→T3

**Step 4: Detect cycle:**
T3 → T2 → T1 → T3: **CYCLE EXISTS**

**Conclusion:** Schedule is **NOT conflict serializable**.

---

## Cascadeless vs Recoverable

> [!definition] Recoverable Schedule
> For every pair (Ti, Tj): if Ti **reads** a value **written by Tj**, then Tj must **commit before** Ti commits.
>
> Ensures: if Tj aborts, Ti can be safely rolled back.
> Does NOT prevent cascading rollbacks.

> [!definition] Cascadeless Schedule
> Transactions only read data written by **already-committed** transactions.
>
> If no dirty reads occur → no cascading rollbacks possible.
> **Cascadeless ⊂ Recoverable** (every cascadeless schedule is recoverable, not vice versa.)

**Example — recoverable but not cascadeless:**
```
T1: W(X)
T2:       R(X)    -- reads T1's uncommitted write (dirty read → not cascadeless)
T1:            COMMIT
T2:                   COMMIT  -- T1 committed before T2 → recoverable
```

**Example — not recoverable:**
```
T1: W(X)
T2:       R(X)
T2:            COMMIT  -- T2 commits before T1 → if T1 aborts, T2's read was wrong
T1:                   ABORT
```

---

## Two-Phase Locking (2PL)

> [!formula] 2PL Protocol
> - **Growing phase**: acquire locks freely, release NONE
> - **Shrinking phase**: release locks, acquire NONE
> - Lock point = moment first lock is released
>
> **Guarantees:** conflict serializable schedules

> [!formula] Strict 2PL
> Hold ALL locks (shared + exclusive) until **commit or abort**.
> - Prevents dirty reads
> - Ensures cascadeless schedules
> - Still susceptible to deadlocks

> [!formula] Preclaiming (Conservative) 2PL
> Acquire ALL needed locks at the **start of the transaction** before doing anything.
> - Prevents deadlocks
> - May cause starvation (transaction waits for all locks at once)

| Protocol | Conflict serializable | Cascadeless | Deadlock-free |
|----------|----------------------|-------------|---------------|
| 2PL | ✓ | ✗ | ✗ |
| Strict 2PL | ✓ | ✓ | ✗ |
| Preclaiming 2PL | ✓ | ✓ | ✓ |

---

## Isolation Levels

| Level | Prevents dirty reads | Prevents unrepeatable reads | Prevents phantom reads |
|-------|---------------------|---------------------------|----------------------|
| READ UNCOMMITTED | ✗ | ✗ | ✗ |
| READ COMMITTED | ✓ | ✗ | ✗ |
| REPEATABLE READ | ✓ | ✓ | ✗ |
| SERIALIZABLE | ✓ | ✓ | ✓ |

**Phantom read:** new rows inserted by another transaction appear in a re-executed range query.

---

## OCC and MVCC

**Optimistic Concurrency Control (OCC):**
1. **Read phase** — read and write to local copies, no locking
2. **Validate phase** — check for conflicts with committed transactions
3. **Write phase** — apply changes if validation passes

Best when conflicts are rare (read-heavy workloads).

**MVCC — Multiversion Concurrency Control:**
- Multiple versions of each data item maintained
- Readers never block writers; writers never block readers
- Readers see a consistent snapshot at the start of their transaction
- Used by: PostgreSQL, Oracle

---

## Exercise Exam Q4 — Full Answer

**Q4(a): Define cascadeless and recoverable schedules.**

A **recoverable** schedule ensures that for any two transactions Ti and Tj, if Ti reads data written by Tj, then Tj commits before Ti commits. This ensures that if Tj aborts, Ti's reads are still valid.

A **cascadeless** schedule is stricter: transactions only read data written by already-committed transactions. This prevents dirty reads entirely and eliminates cascading rollbacks. Every cascadeless schedule is recoverable, but not vice versa.

**Q4(b): The schedule from the exam (see Precedence Graph section above).**

The most efficient way to decide conflict serializability is the **precedence graph** (also called serialisation graph):
- Add one node per transaction
- For each pair of conflicting operations where Ti's op precedes Tj's op, add edge Ti → Tj
- If the graph is **acyclic** → conflict serializable; if it has a **cycle** → not

For the given schedule: cycle T1→T3→T2→T1 exists → **NOT conflict serializable**.

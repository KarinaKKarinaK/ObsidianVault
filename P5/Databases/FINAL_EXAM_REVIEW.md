# Databases — Final Exam Master Review

> Everything you need to know. Read top to bottom. Each topic = simple explanation → keywords → examples → tips → mind tricks.

---

## Exam Map (point allocation)

| Q | Topic | Pts |
|---|-------|-----|
| 1 | ER diagram + relational schema | 2.0 |
| 2 | Normalization (FDs, keys, BCNF, 3NF) | 2.5 |
| 3 | SQL (NOT EXISTS heavy) | 2.0 |
| 4 | Transactions (cascadeless/recoverable + precedence graph) | 1.0 |
| 5 | DB APIs (SQL injection + ANSI SPARC/ORM) | 1.0 |
| **Total above base 1.0** | | **~8.5** |

**Before you start the exam, dump on scratch paper:**
1. BCNF def: *every non-trivial FD X→A has X as superkey*
2. 3NF def: *... OR A is prime*
3. Cascadeless ⊂ Recoverable (subset direction)
4. 2PL: Growing (acquire only) → Shrinking (release only)
5. ANSI SPARC: External → Conceptual → Internal
6. Double NOT EXISTS skeleton:
```sql
WHERE NOT EXISTS (SELECT 1 FROM T WHERE ... AND NOT EXISTS (SELECT 1 FROM S WHERE ...))
```

---

# PART 1 — CONCEPTUAL MODELLING (ER)

## What ER is
A picture of the real world before you make tables. You draw boxes (things), diamonds (relationships between things), and ovals (attributes describing things).

## Building blocks — simple

| Symbol | Means | Example |
|--------|-------|---------|
| Rectangle | Entity (a thing) | Student, Course |
| Double rectangle | Weak entity (can't exist alone) | OrderItem (needs Order) |
| Diamond | Relationship | Enrolls |
| Double diamond | Identifying relationship | for weak entities |
| Oval | Attribute | name, age |
| Underlined oval | Primary key | studentID |
| Dashed underline | Discriminator (weak entity's local id) | line# inside Order |
| Double oval | Multivalued attribute | phone_numbers |
| Oval with line | Derived attribute (computed) | age (from birthdate) |

## Cardinality — the (min, max) trick
Written on the line between an entity and a relationship.
- `(0, 1)` = participates optionally, at most once
- `(1, 1)` = mandatory exactly one
- `(0, N)` = optional, any number
- `(1, N)` = at least one

**Mind trick:** read it like *"this entity participates in (min) to (max) relationship instances"*.

Common cardinality shorthand:
- **1:1** = one student has one locker
- **1:N** = one professor teaches many courses
- **M:N** = many students enroll in many courses

## Weak entity — the rule
A weak entity **cannot be identified by its own attributes alone** — it borrows the owner's key.
- Drawn with double rectangle
- Connected to owner via a double diamond (identifying relationship)
- Has a **discriminator** (dashed underline) — unique only within that owner
- Final PK of weak entity = owner's PK + discriminator

**Example:** `Building → contains → Room`. Room#101 only makes sense inside Building A. PK of Room = (BuildingID, RoomNumber).

## ISA Inheritance — 2 dimensions
- **Disjoint vs Overlapping**: can an entity be in two subtypes at once?
  - Disjoint: Student is *either* Undergrad or Grad
  - Overlapping: Person can be *both* Employee and Student
- **Covering vs Non-covering**: must every supertype be in *some* subtype?
  - Covering (total): every Vehicle is Car OR Truck
  - Non-covering (partial): some Vehicle is neither

## Aggregation
When a **relationship itself** needs to be related to another entity. Draw a box around the diamond and treat the whole bundle as a virtual entity.
- Example: `(Project assigns Employee)` then needs to be `managed_by` a Manager.

## ER → Relational schema (Q1b)
Mechanical translation rules:

1. **Each entity** → one table; entity's PK = table's PK.
2. **1:N relationship** → add owner's PK as **FK** on the "many" side (no new table needed).
3. **M:N relationship** → **new table** with FKs to both sides; PK = both FKs combined.
4. **1:1 relationship** → FK on either side (pick the mandatory side); add UNIQUE.
5. **Weak entity** → table includes owner's PK as part of its PK.
6. **Multivalued attribute** → separate table (entity_id, value), PK = both.
7. **ISA**: three options — (a) one table for everything, (b) one table per subtype only, (c) one for super + one per sub.

**Notation in answer:** underline PK, write `→` for FK, mark NULLable explicitly.

## ER tips
- **Read scenario twice** before drawing.
- **Document every assumption** — graders give marks for reasoning.
- Verify cardinality reads in both directions ("each student takes (1,N) courses; each course has (0,N) students").
- M:N is *never* an FK — always becomes a table.

---

# PART 2 — RELATIONAL MODEL

## Key concepts — simple

| Term | Plain meaning |
|------|---------------|
| **Relation** | A table |
| **Tuple** | A row |
| **Attribute** | A column |
| **Domain** | The data type (legal values) of a column |
| **Schema** | The structure: table names, columns, types, constraints |
| **State / instance** | The actual data right now |

## Keys — the hierarchy

```
Superkey ⊇ Candidate Key ⊇ Primary Key
                  ↑                ↑
            (minimal)      (the chosen one)
```

- **Superkey**: any set of columns that's unique. `{studentID}` is super; so is `{studentID, name}`.
- **Candidate key**: a *minimal* superkey — can't drop any column.
- **Primary key**: the one candidate key you pick. Underlined. Never NULL.
- **Foreign key**: a column referencing the PK of another table.
- **Prime attribute**: any attribute that's part of *some* candidate key.

## NULL semantics (very testable)
- `NULL = NULL` → **UNKNOWN**, not TRUE
- `x = NULL` → UNKNOWN — *use `x IS NULL`*
- Three-valued logic: TRUE, FALSE, UNKNOWN
- `NULL` in an arithmetic expression → NULL
- `COUNT(*)` counts NULLs; `COUNT(col)` skips NULLs
- `SUM/AVG` skip NULLs
- `NULL` inside a `NOT IN` subquery makes the whole condition UNKNOWN → silently empty result

## Integrity Constraints
- **Domain**: value must match the type
- **Key**: PK unique + not null
- **Referential integrity**: FK must reference a real PK (or be NULL if allowed)
- **NOT NULL**: column can't be null
- **CHECK**: arbitrary condition (`CHECK (age >= 0)`)

---

# PART 3 — NORMALIZATION (Q2 — highest value)

## Functional Dependency (FD) — simple
`X → Y` means: *"if two rows have the same X, they have the same Y"*. X **determines** Y.

**Example:** `studentID → name`. Two rows with the same studentID must have the same name.

A **trivial FD**: `X → Y` where Y ⊆ X (always true, useless).

## Armstrong Axioms — the 3 rules
You can derive new FDs from existing ones:
1. **Reflexivity**: Y ⊆ X ⟹ X → Y (trivial)
2. **Augmentation**: X → Y ⟹ XZ → YZ (add same stuff both sides)
3. **Transitivity**: X → Y and Y → Z ⟹ X → Z (chain)

**Mind trick:** *"reflex, augment, transit"* — like a yoga class.

## Closure X⁺ — the workhorse
**Definition:** X⁺ = all attributes you can determine starting from X.

**Algorithm:**
```
X⁺ := X
repeat:
   for each FD L → R in F:
       if L ⊆ X⁺:
           X⁺ := X⁺ ∪ R
until no change
```

**Why care?** Closure is used for *everything*: finding keys, checking BCNF, removing redundant FDs.

**Mind trick:** *"keep eating FDs until you're full."*

## Canonical (Minimal) FD Set — 4 steps

> Used in Q2a. Show every step.

**Step 1 — Split RHS.** Every FD must have a single attribute on the right.
`A → BC` becomes `A → B` and `A → C`.

**Step 2 — Remove redundant LHS attributes.**
For each FD `XY → A`, ask: does `X → A` already hold? (Compute X⁺ ignoring this FD; if A is in X⁺, drop Y.)

**Step 3 — Remove redundant FDs.**
For each FD `X → A`, temporarily remove it. Compute X⁺ in the rest. If A is still in X⁺, the FD was redundant — delete it.

**Step 4 — Done.** The result is `F_c`.

**Tips:**
- Trivial FDs (RHS ⊆ LHS) — remove first.
- Canonical set is **not unique** — order of steps changes the result; all are valid.

## Finding Minimal Keys

A **key** K satisfies K⁺ = all attributes.
A **minimal key** = remove any attribute, it stops working.

**Strategy:**
1. Find attributes that appear **only on LHS** (or never on RHS) — they must be in *every* key.
2. Find attributes that appear **only on RHS** — they're never in a key.
3. Start with the must-have set; try adding the smallest combinations.
4. Test each candidate by computing its closure.

**Mind trick:** *"left-only attributes are stuck in every key; right-only attributes are never in a key."*

## Normal Forms — simple ladder

| NF | Rule (plain English) |
|----|----------------------|
| **1NF** | All cells are atomic (no lists, no nested tables) |
| **2NF** | (rarely tested) No partial dependency on a composite key |
| **3NF** | For every non-trivial FD X→A: X is a superkey **OR** A is prime |
| **BCNF** | For every non-trivial FD X→A: X is a superkey (no exception) |
| **4NF** | For every non-trivial MVD X↠Y: X is a superkey |

**Mind trick:** BCNF is strict ("everything must be a key"); 3NF gives a free pass to prime attributes.

## BCNF vs 3NF — which to use?
| | BCNF | 3NF |
|---|------|-----|
| Stricter? | Yes | No |
| Preserves all FDs? | Not always | Always |
| Always achievable? | Yes (lossless join) | Yes (lossless join + FD preserve) |

**Rule:** if asked "is R in BCNF?", check every FD. **The first FD whose LHS is not a superkey = violation.**

## BCNF Decomposition — step by step

When `X → A` violates BCNF in R:
1. Split R into:
   - R1 = (X ∪ {all attributes X determines})
   - R2 = (X ∪ {everything else})
2. Recurse on R1 and R2 until all are in BCNF.

**Risk:** may lose FDs (some FDs end up spanning both new tables).

## 3NF Synthesis — step by step

1. Compute canonical set F_c.
2. For each FD X → A in F_c, make a relation containing X ∪ {A} (group FDs with same LHS).
3. If no resulting relation contains a candidate key of R, add one extra relation = a candidate key.
4. Remove relations whose attributes are a subset of another's.

**Mind trick:** *"3NF synthesizes (builds up from FDs); BCNF decomposes (breaks down to fix violations)."*

## MVD and 4NF
- **MVD `X ↠ Y`**: for a given X, the set of Y values is independent of any other attribute.
- **4NF**: for every non-trivial MVD X ↠ Y, X is a superkey.
- 4NF removes "cross-product" redundancy that FDs can't capture.

## Worked Example — `R(A,B,C,D,E), F = {A→DB, B→D, AE→ED, E→A}`

**Step 1 split:** `A→D, A→B, B→D, AE→E (trivial, drop), AE→D, E→A`

**Step 2 reduce LHS of AE→D:** A⁺ = {A,B,D} — D is in there, so drop E. AE→D becomes A→D (duplicate, drop).

After step 2: `{A→D, A→B, B→D, E→A}`

**Step 3 redundancy:**
- A→D: drop it. A⁺ in rest = {A,B,D} — has D → A→D is redundant, remove.
- A→B: drop it. A⁺ = {A} — no B → keep.
- B→D: drop it. B⁺ = {B} — no D → keep.
- E→A: drop it. E⁺ = {E} — no A → keep.

**Canonical set:** `F_c = {A→B, B→D, E→A}`

**Minimal keys:** C never appears on any RHS → must be in every key. Try CE: CE⁺ = {C,E,A,B,D} = all ✓. Only key = **{CE}**.

**BCNF?** Every FD: is LHS a superkey?
- A→B: A⁺={A,B,D} — not all attrs → ✗ violation
- B→D, E→A also violate.
**Not in BCNF.**

**3NF?** Prime attrs = {C, E}. Check:
- A→B: A not superkey, B not prime → violation
- All FDs violate. **Not in 3NF.**

**3NF synthesis:** {(A,B), (B,D), (E,A), (C,E)} ← the key relation

---

# PART 4 — SQL (Q3 — most practical)

## Build-Order Rule
SQL is **executed** in this order (even though you *write* SELECT first):
```
FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT
```

**Mind trick:** *"Fetch, Filter, Group, Filter-groups, Select, Dedup, Sort, Limit"*. Knowing this order tells you what each clause "sees" — e.g., HAVING sees groups, WHERE doesn't.

## All keywords — explained simply

### Core
| Keyword | Purpose | Example |
|---------|---------|---------|
| `SELECT` | What columns to return | `SELECT name, age` |
| `FROM` | Which table(s) | `FROM Students` |
| `WHERE` | Filter rows | `WHERE age > 18` |
| `GROUP BY` | Group rows by column value | `GROUP BY dept` |
| `HAVING` | Filter groups | `HAVING COUNT(*) > 5` |
| `ORDER BY` | Sort result | `ORDER BY age DESC` |
| `LIMIT` | Cap rows returned | `LIMIT 10` |
| `DISTINCT` | Remove duplicate rows | `SELECT DISTINCT dept` |
| `AS` | Rename column/table | `SELECT name AS n` |

### Joining
| Keyword | What it does |
|---------|--------------|
| `JOIN` / `INNER JOIN` | Keep only matching rows from both |
| `LEFT [OUTER] JOIN` | Keep all left rows; NULL where right has no match |
| `RIGHT [OUTER] JOIN` | Mirror of LEFT |
| `FULL [OUTER] JOIN` | Keep everything from both, fill NULLs |
| `ON` | Join condition |
| `USING (col)` | Shortcut when both sides use same column name |
| `CROSS JOIN` | Cartesian product (every combination) |

### Subqueries / sets
| Keyword | Meaning |
|---------|---------|
| `IN` | x equals any value in set |
| `NOT IN` | x equals none — **dangerous with NULLs** |
| `EXISTS` | True if subquery returns ≥1 row |
| `NOT EXISTS` | True if subquery returns 0 rows — *NULL-safe* |
| `ANY` / `SOME` | x compared to at least one value |
| `ALL` | x compared to every value |
| `UNION` | Combine + deduplicate |
| `UNION ALL` | Combine, keep duplicates |
| `INTERSECT` | Rows in both |
| `EXCEPT` (MINUS) | Rows in first but not second |

### NULL & conditionals
| Keyword | Meaning |
|---------|---------|
| `IS NULL` / `IS NOT NULL` | Only legal way to test NULL |
| `COALESCE(a, b, c)` | First non-NULL |
| `NULLIF(a, b)` | NULL if a=b else a |
| `CASE WHEN ... THEN ... ELSE ... END` | If/else expression |

### Aggregation
| Function | What it does | Skips NULL? |
|----------|--------------|-------------|
| `COUNT(*)` | Count all rows | No |
| `COUNT(col)` | Count non-null values | Yes |
| `COUNT(DISTINCT col)` | Count unique values | Yes |
| `SUM(col)` | Add up | Yes |
| `AVG(col)` | Average | Yes |
| `MIN/MAX(col)` | Extremes | Yes |

## How aggregation keywords connect

```
WHERE  → filters individual ROWS (no aggregates allowed)
GROUP BY → bundles rows into GROUPS
HAVING → filters GROUPS (aggregates allowed)
SELECT → projects columns; can use aggregates on the groups
```

**Rule:** Anything in `SELECT` that isn't an aggregate **must be in `GROUP BY`** (or you get a syntax error).

## NOT IN vs NOT EXISTS — the NULL trap

```sql
-- NOT IN bug:
SELECT * FROM Parts
WHERE pid NOT IN (SELECT pid FROM Catalog);
-- If Catalog has even ONE NULL pid → returns ZERO rows.
```

```sql
-- NOT EXISTS — safe:
SELECT * FROM Parts p
WHERE NOT EXISTS (
    SELECT 1 FROM Catalog c WHERE c.pid = p.pid
);
```

**Always prefer NOT EXISTS.** The exam awards full marks only when GROUP BY is avoided and NOT EXISTS used.

## The Double NOT EXISTS — "for all" pattern

**Logic:** "for every x, P(x)" ≡ "there is no x such that NOT P(x)".

Template:
```sql
SELECT ...
FROM Outer o
WHERE NOT EXISTS (
    SELECT 1
    FROM RequiredSet r            -- "for every r in RequiredSet"
    WHERE <r is relevant>         -- (e.g. r.color = 'black')
      AND NOT EXISTS (
          SELECT 1
          FROM Bridge b           -- "o is connected to r"
          WHERE b.outer_id = o.id
            AND b.required_id = r.id
      )
);
```

**Reading rhythm:** *"There is NO `r` such that `o` does NOT have it."* = "`o` has them all."

### Worked Q3(b): Suppliers selling all black parts

```sql
SELECT s.sname
FROM Suppliers s
WHERE NOT EXISTS (
    SELECT 1
    FROM Parts p
    WHERE p.color = 'black'
      AND NOT EXISTS (
          SELECT 1
          FROM Catalog c
          WHERE c.sid = s.sid AND c.pid = p.pid
      )
);
```

### Worked Q3(a): Parts supplied by only one supplier

"Only one" = "exists at least one, AND no second different one exists."

```sql
SELECT DISTINCT c1.pid
FROM Catalog c1
WHERE NOT EXISTS (
    SELECT 1
    FROM Catalog c2
    WHERE c2.pid = c1.pid
      AND c2.sid <> c1.sid
);
```

## How to BUILD any SQL query — step-by-step recipe

> Use this every time. Don't write SQL "outside in" — build it inside out.

**Step 1: Translate the English to logic.**
- "find X where Y" → SELECT X FROM ... WHERE Y
- Look for trigger words:
  - "all" / "every" → **double NOT EXISTS**
  - "at least one" → **EXISTS**
  - "none" / "no" → **NOT EXISTS**
  - "exactly one" → **EXISTS + NOT EXISTS(another)**
  - "at least two different" → **self-join with `<>`** or `c1.sid < c2.sid`
  - "more than N" → **GROUP BY ... HAVING COUNT(*) > N** (if allowed) OR existence pattern
  - "the most / max" → subquery `WHERE x = (SELECT MAX...)` or `ALL (SELECT ...)`

**Step 2: Identify the "outer" entity** (what you're selecting).

**Step 3: For each condition, pick a pattern:**
- Simple equality → JOIN or WHERE
- "Must have a matching ..." → EXISTS
- "Must NOT have a matching ..." → NOT EXISTS
- "Must have ALL of ..." → double NOT EXISTS

**Step 4: Build correlated subqueries.** The inner query MUST reference outer aliases (e.g. `c.sid = s.sid`), otherwise it's uncorrelated and wrong.

**Step 5: Trace with a tiny example.** Imagine 2 suppliers, 2 parts. Manually evaluate inner/outer NOT EXISTS. Does it give the right answer for both cases?

**Step 6: Final checks**
- `IS NULL` not `= NULL`?
- DISTINCT needed?
- All correlations present (`s.sid = c.sid`)?
- Aliases unique (`c1`, `c2`)?
- ORDER BY for "list" questions?

## Patterns cheat sheet

| English | Pattern |
|---------|---------|
| Has at least one X | `EXISTS (SELECT 1 FROM X WHERE corr)` |
| Has no X | `NOT EXISTS (SELECT 1 FROM X WHERE corr)` |
| Has all Xs | `NOT EXISTS (SELECT 1 FROM X WHERE NOT EXISTS (...))` |
| Has exactly one X | `EXISTS(...) AND NOT EXISTS(another X)` |
| Pairs (no symmetric dupes) | `FROM T t1, T t2 WHERE ... AND t1.id < t2.id` |
| Max-priced X | `WHERE price = (SELECT MAX(price) FROM ...)` |
| Above average | `WHERE x > (SELECT AVG(x) FROM ...)` |
| Never referenced | `LEFT JOIN ... WHERE other.id IS NULL` |

## Common SQL mistakes
- Forgetting correlation in NOT EXISTS — query becomes always-true or always-false.
- Using `= NULL` instead of `IS NULL`.
- Using NOT IN with a subquery that can produce NULLs.
- Aggregate in WHERE (must use HAVING).
- Forgetting `DISTINCT` — getting duplicate rows from joins.
- Mixing tables without specifying which column you mean.

---

# PART 5 — TRANSACTIONS (Q4)

## ACID — what each letter means
- **A — Atomicity**: all or nothing
- **C — Consistency**: DB stays valid (constraints hold)
- **I — Isolation**: txns don't interfere visibly
- **D — Durability**: committed changes survive crashes

## Concurrency anomalies — simple
- **Lost update**: T1 and T2 both read x=10, both write x+1, second write overwrites → final 11 instead of 12.
- **Dirty read**: T2 reads an uncommitted value from T1, then T1 aborts → T2 used garbage.
- **Unrepeatable read**: T1 reads x=5, T2 updates x=6 and commits, T1 reads x again → different value within same txn.
- **Phantom read**: T1 runs a range query, T2 inserts a new row in that range, T1 re-runs → new row appears.

## Schedule notation
`R_i(X)` = transaction i reads X. `W_i(X)` = writes X.

A **serial schedule** runs txns one after another, no interleaving. Always safe but slow.

## Conflict — the 3-part rule
Two ops conflict iff:
1. **Different transactions**, AND
2. **Same data item**, AND
3. **At least one is a WRITE**

| Pair | Type | Anomaly enabled |
|------|------|-----------------|
| R-W (T1 reads, T2 writes) | RW | unrepeatable read |
| W-R (T1 writes, T2 reads) | WR | dirty read |
| W-W (T1 writes, T2 writes) | WW | lost update |

Two reads (R-R) **never conflict**.

## Conflict serializability — what it means
A schedule is *conflict serializable* if you can rearrange it to a serial one by swapping **non-conflicting adjacent** operations.

## Precedence Graph — the algorithm (Q4)
1. **Node per transaction**.
2. For every pair of conflicting ops where Ti's op comes FIRST in time, draw `Ti → Tj`.
3. If the graph has **no cycle** → conflict serializable. If cycle → NOT.

**Mind trick:** edge points *from earlier to later*. The earlier one must come first in the equivalent serial order.

### Worked example
Schedule (in time order):
`T3:W(V), T1:R(Z), T2:R(Y), T2:W(Y), T1:R(Y), T2:R(V), T3:W(Z)`

Conflicts:
- T3:W(V) before T2:R(V) → **T3 → T2**
- T2:W(Y) before T1:R(Y) → **T2 → T1**
- T1:R(Z) before T3:W(Z) → **T1 → T3**

Edges: T3→T2, T2→T1, T1→T3 → **cycle** → **NOT serializable**.

## Recoverable vs Cascadeless

- **Recoverable**: if Ti reads from Tj, Tj must commit *before* Ti commits.
  - Why: if Tj aborts later, we can't safely keep Ti's commit.
- **Cascadeless** (stricter): Ti only reads values written by **already-committed** Tjs.
  - Result: no dirty reads → no cascading aborts.

**Containment:** Cascadeless ⊂ Recoverable ⊂ All schedules.

**Mind trick:** *Cascadeless = "I only trust committed people." Recoverable = "If you trusted me, I better commit first."*

## Two-Phase Locking (2PL)

Two lock types:
- **S (shared / read)**: many txns can hold simultaneously
- **X (exclusive / write)**: only one txn holds, blocks all others

**Compatibility:**
| | S | X |
|---|---|---|
| **S** | ✓ | ✗ |
| **X** | ✗ | ✗ |

**2PL Protocol:**
1. **Growing phase**: acquire locks freely, release NONE.
2. **Shrinking phase**: release locks, acquire NONE.

**Guarantee:** conflict serializability.
**Doesn't prevent:** deadlocks, cascading rollbacks.

## Variants

| Variant | Extra rule | Prevents |
|---------|-----------|----------|
| Basic 2PL | growing/shrinking phases | non-serializable schedules |
| **Strict 2PL** | hold ALL locks until commit/abort | + dirty reads, cascading rollbacks |
| **Preclaiming (Conservative) 2PL** | acquire ALL locks before starting | + deadlocks (but may starve) |

**Mind trick:** *"Strict = hold to the end. Preclaiming = grab at the start."*

## Deadlock
- **Definition**: cycle in the waits-for graph.
- **Detection**: build waits-for graph, look for cycle.
- **Resolution**: abort one transaction in the cycle ("victim").
- **Prevention**: preclaiming 2PL, or wait-die / wound-wait schemes (timestamp-based).

## Isolation levels — the table you must memorize

| Level | Dirty | Unrepeatable | Phantom |
|-------|-------|--------------|---------|
| READ UNCOMMITTED | ✓ allowed | ✓ allowed | ✓ allowed |
| READ COMMITTED | ✗ | ✓ | ✓ |
| REPEATABLE READ | ✗ | ✗ | ✓ |
| SERIALIZABLE | ✗ | ✗ | ✗ |

**Mind trick:** Each step up the ladder closes one anomaly: dirty → unrepeatable → phantom.

## OCC and MVCC (short)

**OCC — Optimistic CC** (3 phases):
1. **Read**: do everything in local copies, no locks.
2. **Validate**: at commit, check for conflicts with other committed txns.
3. **Write**: if valid, apply.

Best for read-heavy / low-conflict workloads.

**MVCC — Multi-Version CC:**
- Keep multiple versions of each item.
- Readers see a **snapshot** from txn start.
- Readers never block writers; writers never block readers.
- Used by PostgreSQL, Oracle.

## Q4 answering rhythm
1. State the definitions cleanly.
2. List all conflicting pairs in a table.
3. Draw the graph.
4. Explicitly find/list the cycle (or state "no cycle").
5. Conclude: "conflict serializable" / "not".

---

# PART 6 — DATABASE APIs (Q5)

## String Assembly (Dynamic SQL) — VULNERABLE
```java
String q = "SELECT * FROM users WHERE name = '" + userInput + "'";
```
If user inputs `' OR '1'='1` → query becomes `WHERE name = '' OR '1'='1'` → returns everything = **SQL injection**.

**Other disadvantages:**
- No compile-time syntax check
- Query plan re-parsed every time (no caching)
- Type errors only at runtime

**Advantages:**
- Flexible — query structure can change at runtime
- Easy to compose dynamic filters

## Prepared Statements — SAFE
```java
PreparedStatement ps = conn.prepareStatement(
    "SELECT * FROM users WHERE name = ?");
ps.setString(1, userInput);
```

**Advantages:**
- Parameters are bound, never concatenated → SQL injection prevented
- Query compiled & plan cached → performance
- Type-safe binding (setString, setInt)

## Static vs Dynamic SQL
| | Static (embedded) | Dynamic (API) |
|---|---|---|
| When parsed | Compile time | Runtime |
| Flexibility | Low | High |
| Examples | SQLJ, Embedded C SQL | JDBC, ODBC, Python DB-API |
| Errors caught | Compile time | Runtime |

## ANSI/SPARC — three levels (memorize cold)

```
External (top)    — views per user/application       [the UI of the data]
Conceptual        — full logical schema (all tables) [the source of truth]
Internal (bottom) — physical storage (files, idx)    [bytes on disk]
```

**Mind trick:** *"External = what you see, Internal = what's stored, Conceptual = the agreement in the middle."*

**Independence:**
- **Logical data independence**: change conceptual schema without breaking external views.
- **Physical data independence**: change storage without breaking conceptual schema.

## ORM — Object-Relational Mapping
**Position:** sits at the **external / conceptual** level — it gives apps an object view of relational data.

**Purpose:**
- Hides navigational SQL behind objects/methods
- Provides an application-level view
- Supports schema evolution without changing application code
- Maps tables ↔ classes, rows ↔ objects, FKs ↔ references

**Examples:** Hibernate (Java/JPA), Entity Framework (.NET/LINQ), ActiveRecord (Rails), ADO.NET.

---

# PART 7 — UNIVERSAL EXAM TIPS

## Approach for every question

| Question type | Approach |
|--------------|----------|
| **ER diagram** | Read twice → list entities → list relationships + cardinality → mark weak/ISA → list assumptions |
| **Schema derivation** | Apply the 7 translation rules mechanically; underline PKs, draw FKs as → |
| **Canonical FD set** | Always show step 1 (split), step 2 (LHS), step 3 (FD) with closures |
| **Find keys** | Identify must-in / never-in attrs first, then try smallest supersets |
| **BCNF / 3NF check** | Quote definition first → check each FD → state violation explicitly |
| **SQL query** | Identify quantifier ("all"/"any"/"none") → pick pattern → write inside out → trace small example |
| **Precedence graph** | Time-order ops → conflict table → draw edges → cycle? → conclude |
| **Definitions** | Always quote the formal definition first, then explain |

## Mind tricks summary
- **Closure**: "eat FDs till you're full"
- **Canonical**: "split, slim LHS, slim FDs"
- **BCNF**: "every FD is a key"
- **3NF**: "every FD is a key, OR the right side is part of a key"
- **NOT EXISTS for ALL**: "there's nobody who I'm missing"
- **Cascadeless ⊂ Recoverable**: "tighter ⊂ looser"
- **2PL phases**: "first grab, then drop"
- **Precedence edge direction**: "earlier → later"
- **ANSI SPARC**: "view (top) → schema → storage (bottom)"

## Show-your-work commandments
1. **Quote the definition** before applying it.
2. **Show every closure** computation, not just the answer.
3. **Number your steps** in canonical set / decomposition.
4. **List every conflicting pair** in the precedence graph table.
5. **State assumptions** in ER diagrams.
6. **Trace SQL** with a tiny mental example before declaring final.

## Final warnings
- Don't use `GROUP BY` if `NOT EXISTS` works — full marks require existential quantification.
- Don't use `=` with NULL.
- Don't forget the correlation in subqueries (inner must reference outer alias).
- Don't forget to iterate the closure algorithm.
- Don't confuse 3NF and BCNF — prime attribute exception is the difference.
- Don't forget that cascadeless implies recoverable, not the other way.
- Don't draw precedence edges backwards — earlier op's txn gets the OUTGOING edge.

---

*Good luck. Quote definitions, show steps, prefer NOT EXISTS.*

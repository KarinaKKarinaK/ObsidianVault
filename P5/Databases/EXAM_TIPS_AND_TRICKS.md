# Databases Exam — Tips, Tricks & Cheat Sheet

> Written in your language. Think of this as the friend who did all the exams before you explaining everything over coffee.

---

## TABLE OF CONTENTS
1. [SQL — The Big Picture](#sql-overview)
2. [SQL — EXISTS / NOT EXISTS patterns](#sql-exists)
3. [SQL — GROUP BY and HAVING](#sql-groupby)
4. [SQL — Aggregates, JOINs, IN/NOT IN, ALL](#sql-other)
5. [SQL — Division Queries (NOT EXISTS magic)](#sql)
6. [Normalisation — 3NF step by step](#3nf)
7. [Normalisation — BCNF step by step](#bcnf)
8. [ER Diagrams — Shapes, Cardinalities, Tips](#er)
9. [Relational Schema — How to write it out](#schema)
10. [Transactions — 2PL, Strict 2PL, Rollbacks](#transactions)
11. [Assumption Sections — What to write to get points](#assumptions)
12. [Anomalies — Insertion, Deletion, Update](#anomalies)
13. [Multi-Granularity Locking](#mgl)
14. [Database Application Programming](#app)

---

## 1. SQL — The Big Picture {#sql-overview}

### First question to ask yourself when you see any SQL question:

> **"What am I returning? What's the condition? Does it involve ALL/EVERY, or just SOME/AT LEAST ONE?"**

Use this decision tree every time:

```
Does the question involve "all", "every", "each", "only"?
    YES → double NOT EXISTS (or double NOT IN)  [see section 5]
    NO  → keep reading...

Does the question involve counting, averages, or "at least N"?
    YES → GROUP BY + HAVING  [see section 3]
    NO  → keep reading...

Does the question ask if something EXISTS or does NOT EXIST?
    YES → EXISTS / NOT EXISTS  [see section 2]
    NO  → simple JOIN + WHERE filter
```

### The golden rule from the exam solutions:
> **"You will only obtain maximal points if your answers avoid use of GROUP BY in favour of existential quantification."**

This means: when in doubt between GROUP BY and NOT EXISTS → **use NOT EXISTS**. It's cleaner, they prefer it, and it's what gets full marks.

---

### When to go SIMPLE (don't overthink it):

If the question is just filtering rows — a plain `WHERE` clause is enough:

```sql
-- "Find employees earning more than 10000"
SELECT employeeName FROM Works WHERE salary > 10000

-- "Find employees NOT working for FBC"
SELECT employeeName FROM Works WHERE companyName <> 'First Bank Corporation'
```

No subqueries, no GROUP BY. If you can write it with a simple WHERE → do that.

---

## 2. SQL — EXISTS and NOT EXISTS Patterns {#sql-exists}

### The mental model:

- **EXISTS** = "there IS at least one row matching this"
- **NOT EXISTS** = "there is NO row matching this"

They always come with a correlated subquery — the subquery references something from the outer query (that's the whole point).

---

### Pattern 1: "Find X that HAVE at least one Y" → EXISTS

```sql
-- "Find people who have at least one friend"
SELECT name
FROM Person P
WHERE EXISTS (
    SELECT *
    FROM Friend F
    WHERE P.id = F.id1 OR P.id = F.id2
)
```

Reading it: *"Give me people where there EXISTS a friend row that mentions them."*

Alternative with IN (same result, pick whichever feels cleaner):
```sql
SELECT name FROM Person P
WHERE P.id IN (SELECT id1 FROM Friend)
   OR P.id IN (SELECT id2 FROM Friend)
```

---

### Pattern 2: "Find X that have NO Y" → NOT EXISTS

```sql
-- "Find people with no friends"
SELECT name
FROM Person P
WHERE NOT EXISTS (
    SELECT *
    FROM Friend F
    WHERE P.id = F.id1 OR P.id = F.id2
)
```

Reading it: *"Give me people where there does NOT EXIST any friend row mentioning them."*

Alternative with NOT IN:
```sql
SELECT name FROM Person P
WHERE P.id NOT IN (SELECT id1 FROM Friend)
  AND P.id NOT IN (SELECT id2 FROM Friend)
```

Note the **AND** — to have NO friends, you must not appear on EITHER side. (If you use OR here, you break it.)

---

### Pattern 3: "Find the cheapest / minimum" → NOT EXISTS (no GROUP BY!)

```sql
-- "Find names of the cheapest suppliers of part 42"
SELECT S.name
FROM Suppliers S JOIN Catalog C ON S.sid = C.sid
WHERE C.pid = 42
  AND NOT EXISTS (
      SELECT *
      FROM Catalog C1
      WHERE C1.pid = 42 AND C1.price < C.price
  )
```

Reading it: *"Give me suppliers of part 42 where there does NOT EXIST a cheaper offer for that same part."*

This is the exam-preferred way to find minimums/maximums. Don't reach for `MIN()` + `GROUP BY` — use NOT EXISTS.

---

### Pattern 4: "Find X that do NOT have the minimum" → EXISTS

```sql
-- "Find (pid, sid) of suppliers NOT offering at the lowest price"
SELECT C.sid, C.pid
FROM Catalog C
WHERE EXISTS (
    SELECT *
    FROM Catalog C1
    WHERE C1.pid = C.pid AND C1.price < C.price
)
```

Reading it: *"Give me catalog rows where there EXISTS a cheaper offer for the same part."* = this supplier isn't the cheapest.

---

### Pattern 5: "Find X that appear only ONCE" → NOT EXISTS with self-reference

```sql
-- "Find parts supplied by only one supplier"
SELECT C.pid
FROM Catalog C
WHERE NOT EXISTS (
    SELECT *
    FROM Catalog C1
    WHERE C1.pid = C.pid AND C1.sid <> C.sid
)
```

Reading it: *"Give me parts where there does NOT EXIST another catalog row with the same part but a different supplier."*

---

### EXISTS vs IN — when to use which:

| Situation | Use |
|---|---|
| Subquery result is a simple list of values | `IN` / `NOT IN` |
| Subquery needs to reference the outer query (correlated) | `EXISTS` / `NOT EXISTS` |
| Finding min/max without GROUP BY | `NOT EXISTS` |
| Division queries ("all", "every") | Double `NOT EXISTS` |
| Performance on large tables | `EXISTS` (stops at first match) |

---

## 3. SQL — GROUP BY and HAVING {#sql-groupby}

### When to use GROUP BY:

> "Per X, find the Y" or "find all X that have AT LEAST N of Y"

The pattern is: you're collapsing multiple rows into one per group, then doing something with that group.

---

### The structure (always in this order):

```sql
SELECT [grouping columns], [aggregate]
FROM [tables]
WHERE [row-level filter — applied BEFORE grouping]
GROUP BY [grouping columns]
HAVING [group-level filter — applied AFTER grouping]
ORDER BY [optional]
```

**Key rule:** Anything in SELECT that is NOT an aggregate function MUST be in GROUP BY.

---

### WHERE vs HAVING — the difference:

| | WHERE | HAVING |
|---|---|---|
| When applied | Before grouping | After grouping |
| Can reference | Individual row values | Aggregate results (COUNT, AVG, etc.) |
| Example | `WHERE salary > 1000` | `HAVING COUNT(*) >= 2` |

**Simple rule:** If your filter involves `COUNT()`, `AVG()`, `SUM()` etc. → it goes in HAVING. Everything else → WHERE.

---

### Pattern: "Find X that have at least N of Y" → GROUP BY + HAVING COUNT

```sql
-- "Find people who know at least 2 people"
SELECT P.name
FROM Person P, Knows K
WHERE P.id = K.id1
GROUP BY P.id, P.name
HAVING COUNT(*) >= 2
```

Note: Group by `P.id` AND `P.name` — because name is in SELECT but not an aggregate, it must be in GROUP BY too.

---

### Pattern: "Per X, show the average/sum/count of Y"

```sql
-- "Per artist, show the average insurance value of their paintings"
SELECT P.artist, AVG(L.insurance)
FROM Paintings P, Loans L
WHERE P.colID = L.colID
GROUP BY P.artist
ORDER BY P.artist
```

The WHERE joins the tables (row-level), GROUP BY collapses by artist, AVG operates on each group.

---

### When NOT to use GROUP BY:

- When the question uses "all", "every", "each" → use NOT EXISTS instead
- When you're looking for a minimum/maximum → use NOT EXISTS instead
- When you just need to check existence → use EXISTS instead
- When you're doing a simple filter → use WHERE instead

The solutions are explicit: **prefer NOT EXISTS over GROUP BY** when both could work.

---

### DISTINCT — when to add it:

Add `SELECT DISTINCT` when your JOIN could produce duplicate rows for the same entity:

```sql
-- Multiple loans of the same painting → painting appears multiple times
-- DISTINCT collapses them back to one row per painting
SELECT DISTINCT E.place
FROM Paintings P, Loans L, Exhibitions E
WHERE P.colID = L.colID AND L.exID = E.exID AND P.artist = 'Breitner'
```

**When NOT to use DISTINCT:** When you actually want duplicates (e.g. counting things). And never use DISTINCT to "fix" a broken query — if you need it to remove logically wrong duplicates, your query structure might be wrong.

---

## 4. SQL — Aggregates, JOINs, IN / NOT IN, ALL {#sql-other}

### Aggregate functions cheatsheet:

| Function | What it does | Example use |
|---|---|---|
| `COUNT(*)` | Count rows in group | "how many employees per dept" |
| `COUNT(DISTINCT x)` | Count unique values | "how many distinct cities" |
| `SUM(x)` | Total of a column | "total salary per dept" |
| `AVG(x)` | Average | "average insurance per artist" |
| `MIN(x)` / `MAX(x)` | Smallest / largest value | (prefer NOT EXISTS on exams) |

---

### JOINs — keep it simple:

For this exam, **implicit join syntax** (comma-separated tables + WHERE) is fine and often cleaner:

```sql
-- Implicit join (fine for exams):
SELECT E.name FROM Employee E, Works W
WHERE E.id = W.id AND W.company = 'FBC'

-- Explicit JOIN (same result, also fine):
SELECT E.name FROM Employee E
JOIN Works W ON E.id = W.id
WHERE W.company = 'FBC'
```

When you join multiple tables: list them all in FROM, then connect them in WHERE with join conditions first, then filter conditions.

```sql
-- Three-table join: always write join conditions first, filters after
SELECT DISTINCT E.place
FROM Paintings P, Loans L, Exhibitions E
WHERE P.colID = L.colID      -- join condition
  AND L.exID = E.exID        -- join condition
  AND P.artist = 'Breitner'  -- filter
```

---

### Self-join — when a table joins with itself:

Use when you need to compare rows within the same table (e.g. "paintings shown twice", "employees earning more than another employee"):

```sql
-- "Find parts with at least two different suppliers" (no GROUP BY version)
SELECT C1.pid
FROM Catalog C1, Catalog C2
WHERE C1.pid = C2.pid AND C1.sid <> C2.sid
```

Give the same table two aliases (C1, C2) and compare rows against each other.

---

### IN / NOT IN:

Use when you have a simple subquery producing a list to filter against:

```sql
-- "Find paintings never on loan"
SELECT colID FROM Paintings
WHERE colID NOT IN (SELECT colID FROM Loans)
```

This is simpler than NOT EXISTS here because the subquery is just a list with no correlation to the outer query.

**Watch out with NOT IN and NULLs:** If the subquery can return NULLs, `NOT IN` breaks silently (returns no rows). In that case use `NOT EXISTS` instead — it handles NULLs correctly.

---

### ALL quantifier:

Use when: "Find X where value > ALL values from some set"

```sql
-- "Find employees earning more than EVERY employee at SBC"
SELECT employeeName
FROM Works
WHERE salary > ALL (
    SELECT salary FROM Works WHERE companyName = 'SBC'
)
```

Reading it: *"Salary must be greater than the maximum salary at SBC."* (It's equivalent to `> MAX(...)` but uses ALL.)

---

### The "only in cities of SBC" problem — double NOT IN:

This comes up as a tricky case. The naive approach fails:

```sql
-- WRONG: this finds companies with ANY location in SBC cities
-- (a company in Amsterdam+Utrecht would pass if SBC is in Amsterdam)
SELECT companyName FROM Company
WHERE city IN (SELECT city FROM Company WHERE companyName = 'SBC')
```

The correct approach (double NOT IN = same idea as double NOT EXISTS):

```sql
-- CORRECT: companies whose locations are a SUBSET of SBC's locations
SELECT companyName FROM Company
WHERE companyName NOT IN (
    SELECT companyName FROM Company
    WHERE city NOT IN (
        SELECT city FROM Company WHERE companyName = 'SBC'
    )
)
```

Inside out:
1. Innermost: SBC's cities
2. Middle: companies that have at least ONE location NOT in SBC's cities → the "bad" companies
3. Outer: companies NOT in that bad list → companies only in SBC cities

---

## 5. SQL — Division Queries {#sql}

### The trigger: when do you use this?

> "Find X who have **ALL** of Y"
> "Find X that supply **every** black part"
> "Find X that have done **every** task"

Any time you see **"all", "every", "each"** — think double NOT EXISTS.

---

### The mental trick: translate to natural language FIRST

Before writing any SQL, translate it into:

> **"There is no [thing] such that [X] does NOT have it"**

Example: *"Find suppliers who sell all black parts"*
→ *"There is no black part that this supplier does NOT sell"*

Now write it from the **inside out** — start with the innermost NOT EXISTS, work outward.

---

### Template: Double NOT EXISTS

```sql
SELECT S.name
FROM Suppliers S
WHERE NOT EXISTS (
    SELECT *
    FROM Parts P
    WHERE P.color = 'black'
    AND NOT EXISTS (
        SELECT *
        FROM Catalog C
        WHERE C.sid = S.sid AND C.pid = P.pid
    )
)
```

**How to read it, inside out:**
1. Innermost: "Does this supplier sell this part?" → if NO → this part is a problem
2. Middle NOT EXISTS: "Is there a black part they don't sell?" → if YES → skip this supplier
3. Outer query: "Give me suppliers for whom no such problem exists"

---

### Single NOT EXISTS (simpler case)

Use when: *"Find parts supplied by only ONE supplier"*

```sql
SELECT C.pid
FROM Catalog C
WHERE NOT EXISTS (
    SELECT *
    FROM Catalog C2
    WHERE C2.pid = C.pid AND C2.sid <> C.sid
)
```

→ *"There is no other supplier for this part"*

---

### Alternative: double NOT IN (same idea, different syntax)

```sql
SELECT companyName
FROM Company
WHERE companyName NOT IN (
    SELECT companyName
    FROM Company
    WHERE city NOT IN (
        SELECT city
        FROM Company
        WHERE companyName = 'SBC'
    )
)
```

Reading inside out:
1. Innermost: cities where SBC operates
2. Middle: companies that exist in OTHER cities (not SBC cities)
3. Outer: companies NOT in that "bad" list → companies only in SBC cities

---

### Quick rules to remember for SQL exams

- **Never use GROUP BY for division queries** — the NOT EXISTS approach is cleaner and what they want
- Always think inside-out when reading/writing nested queries
- `SELECT "foo"` or `SELECT *` inside NOT EXISTS is fine — the value doesn't matter, just existence
- The outer query always has the thing you're returning (supplier, company, etc.)
- The middle loop is over the "all" thing (all black parts, all cities, etc.)
- The inner NOT EXISTS checks the connection between them

---

## 2. Normalisation — 3NF Step by Step {#3nf}

### Your understanding is basically right — here's the clean version:

**Goal of 3NF:** Keep all your functional dependencies (so queries still work), but make the relations nice and clean. You will NOT lose any FDs.

---

### The steps (plain English):

**Step 1: Find the canonical/minimal set of FDs**

This means cleaning up your FDs:
- **Split the right-hand side** so each FD only has ONE thing on the right
  - `AE → DEF` becomes `AE → D`, `AE → E`, `AE → F`
- **Remove trivial FDs** (where the right side is already in the left side)
  - `AE → E` is trivial → delete it
- **Remove redundant attributes from the left side**
  - For `AE → F`, check: can you drop A? Compute `E+` — if F is not in it, you can't drop A. Can you drop E? Compute `A+` — if F is not in it, you can't drop E either → keep both
- **Remove redundant FDs entirely**
  - If you can already get `AE → D` by following other FDs (like `AE → F → D`), then `AE → D` is redundant → delete it

**Step 2: Group by left-hand side**

Take all FDs with the same left side and merge them into one relation.
- `AE → C`, `AE → D`, `AE → F` → becomes one relation with `AE` as key and `C, D, F` as attributes

**Step 3: Make each group a relation**

Each group becomes one table. The left-hand side = primary key.

**Step 4: Remove redundant relations**

If one relation's attributes are completely contained in another relation → delete the smaller one (it's covered).

**Step 5: Add a key relation if needed**

If NONE of your resulting relations contains a candidate key of the original table → add one extra relation that just contains a candidate key. This ensures you can still join everything back together.

---

### Example:

FDs: `AE → F`, `C → DE`, `F → C`

After cleanup (canonical form): same FDs, verified minimal.

Candidate key: Find attributes never on the right side → `A` and `B` are never on RHS → `AB` must be in any key → compute `ABE+` = everything? Check. The candidate key is `ABE`.

3NF relations:
- `R1(A, E, F)` — from `AE → F`
- `R2(C, D, E)` — from `C → DE`
- `R3(F, C)` — from `F → C`
- Add `R4(A, B, E)` — because no relation contains the full candidate key `ABE`

---

## 3. Normalisation — BCNF Step by Step {#bcnf}

### How BCNF is different from 3NF:

> **3NF:** Keep all FDs, even if the schema isn't perfect.
> **BCNF:** Make the schema perfect, even if you lose some FDs.

BCNF is stricter. The rule is simple: **every FD's left side must be a superkey** (meaning it determines everything). If it doesn't → you have a BCNF violation → you must split.

**Warning:** BCNF might lose FDs. That's okay — it's a known trade-off. On the exam, always mention which FD was lost.

---

### The steps (plain English):

**Step 1: Maximize right-hand sides first**

Take your minimal FDs and expand the RHS using closure.
- `AE → F` → compute `(AE)+` = `A, E, F, C, D` (using all FDs) → so `AE → ACDF`
- `C → DE` → compute `(C)+` = `C, D, E` → so `C → DE`
- `F → C` → compute `(F)+` = `F, C, D, E` → so `F → CDE`

Write these maximized FDs.

**Step 2: Find a BCNF violation**

Check each FD: is the left side a superkey (i.e., does it determine ALL attributes)?
- `C → DE` — is C a superkey? Compute `C+` = `C, D, E`. Does it include ALL attributes (`A, B, C, D, E, F`)? No → **BCNF violation!**

**Step 3: Split on the violation**

When you find a violating FD `X → Y`:
- One relation: `X ∪ Y` (the FD's stuff)
- Other relation: `X ∪ (everything else)` (X stays as the join key)

Example — split on `C → DE`:
- `R1(C, D, E)` — from the FD
- `R2(A, B, C, F)` — everything else, C stays as foreign key

**Step 4: Check each new relation for violations**

Repeat for each new relation. Find which FDs still apply to it and check again.

**Step 5: Note what was lost**

On the exam: always write *"This decomposition loses FD: AE → F"* — you get points for noticing this.

---

### BCNF vs 3NF — quick comparison:

| | 3NF | BCNF |
|---|---|---|
| Loses FDs? | Never | Sometimes |
| Always possible? | Yes | Yes |
| Result quality | Good, not perfect | Perfect |
| When to use | When preserving FDs matters | When you want no redundancy |

---

## 4. ER Diagrams {#er}

### The shapes — what each one means:

```
┌──────────────┐
│   Rectangle  │  = ENTITY (a thing that exists independently)
└──────────────┘  Example: Student, Course, Book

┌──────────────┐
│   Rectangle  │  = WEAK ENTITY (can't exist without its owner)
│  (double     │  Example: OrderLine (can't exist without Order)
│   border)    │
└──────────────┘

◇ Diamond      = RELATIONSHIP (connects entities)
                 Example: "Enrolls" between Student and Course

◇ Diamond      = IDENTIFYING RELATIONSHIP (connects weak entity to owner)
(double border)  Example: "Contains" between Order and OrderLine

○ Oval         = ATTRIBUTE of an entity
⊙ Oval         = MULTIVALUED ATTRIBUTE (can have many values)
                 Example: phone numbers, hobbies
--- Oval       = DERIVED ATTRIBUTE (computed, not stored)

▭ Underlined   = PRIMARY KEY attribute
```

**Lines:**
- `────` = regular connection
- `════` = total participation (EVERY entity in this set MUST participate)
- Arrow `───▶` = at most 1 (this side is the "one" in one-to-many)

---

### Cardinality table:

| Notation | Meaning | Example |
|---|---|---|
| `1..1` | Exactly one | Each employee has exactly one SSN |
| `0..1` | Zero or one (optional) | An employee may or may not have a parking spot |
| `1..*` | One or more | A department must have at least one employee |
| `0..*` | Zero or more | A student can take zero or more courses |

**Common cardinality patterns:**

| Relationship type | What it looks like | Example |
|---|---|---|
| One-to-one (1:1) | Arrow on both sides | Each person has one passport |
| One-to-many (1:N) | Arrow on the "one" side | One department, many employees |
| Many-to-many (M:N) | No arrows | Students take many courses, courses have many students |

**How to think about it:** Ask these two questions:
- "Can ONE [A] be connected to MANY [B]?" → if yes, the arrow goes on A's side
- "Can ONE [B] be connected to MANY [A]?" → if yes, the arrow goes on B's side

---

### Rules for ER diagrams — practical tips:

1. **Stay as close to the scenario as possible** — if the text says "each employee has one manager", that's a 1:1 or 1:N relationship, not a separate table.

2. **When to use a weak entity:** When an entity's primary key only makes sense relative to a parent. Example: a room number only makes sense within a specific building.

3. **When to use aggregation:** When a relationship itself participates in another relationship. Example: a project is supervised BY a manager THROUGH a department.

4. **Merging relations into entities:** When a relationship has cardinality max 1 on one side, you can fold its attributes into that entity. Less clutter.

5. **Multivalued attributes → become their own table** in the relational model (an entity can have many phone numbers → PhoneNumber table with FK back to entity).

6. **NULL smell:** If merging would create lots of NULLs (because not everyone has that attribute) → keep it separate.

---

## 5. Relational Schema — How to Write It {#schema}

### The template:

```
EntityName(primaryKey, attribute1, attribute2, foreignKey→OtherEntity)
```

**Rules:**
- **Underline the primary key** (in written form, write it as: `_primaryKey_`)
- **Arrow for foreign keys:** `→ OtherEntity` to show what it references
- **Candidate keys:** mention separately if there are alternative unique keys
- **Nullable attributes:** always annotate with `// nullable: attribute1, attribute2`

---

### Example:

```
Student(_studentId_, name, email)
// nullable: email

Course(_courseId_, title, department)

Enrollment(_studentId_→Student, _courseId_→Course, grade, enrollmentDate)
// nullable: grade
// candidate key: (studentId, courseId)
```

---

### When a relationship becomes a table:

- **Many-to-many relationships** always become their own table (include PKs of both entities as FKs, together they form the PK)
- **One-to-many relationships** — the FK goes on the "many" side (no new table needed)
- **One-to-one relationships** — merge into either entity (prefer the one where NULL values are avoided)
- **Relationships with attributes** — become their own table, FK to both entities

---

### When cardinality lets you merge:

If a relationship has max 1 on one side → no need for a separate table → add the FK directly into that entity.

Example: `SectionHead` relationship where each section has at most one head → add `headEmployeeId → Employee` into the `Section` table instead of making a `SectionHead` table.

---

## 6. Transactions — 2PL, Strict 2PL, Rollbacks {#transactions}

### The basics — what locks are:

- **S (Shared lock)** = I want to READ this. Others can also read. Nobody can write.
- **X (Exclusive lock)** = I want to WRITE this. Nobody else can read or write.
- **U (Unlock)** = I'm done with this lock.

**Conflict rules (memorise these):**

| T1 holds | T2 wants | Conflict? |
|---|---|---|
| S | S | No (both just reading — fine) |
| S | X | YES (can't write while someone's reading) |
| X | S | YES (can't read while someone's writing) |
| X | X | YES (can't both write) |

---

### 2PL (Two-Phase Locking):

**The rule:** A transaction must NOT acquire any new lock after it has released any lock.

Two phases:
1. **Growing phase:** Acquire locks freely
2. **Shrinking phase:** Release locks — once you release ONE lock, you can't get any new ones

```
T1:  S(X) → R(X) → X(Y) → W(Y) → U(X) → U(Y)   ✓ (released after done)
T2:  S(X) → R(X) → U(X) → X(Y) → W(Y) → U(Y)   ✓
```

Basic 2PL allows cascading rollbacks (see below).

---

### Strict 2PL:

**The rule:** Hold ALL locks until the transaction commits or aborts. Only release at the very end.

This prevents cascading rollbacks because no transaction can read data that hasn't been committed yet.

```
T1:  S(X) → R(X) → X(Y) → W(Y) → COMMIT → U(X) → U(Y)
```

---

### Preclaiming 2PL:

**The rule:** Declare ALL the locks you'll ever need at the START of the transaction. Acquire them all upfront before doing anything.

Prevents deadlocks (since you either get everything or wait from the start).

---

### Summary of the three types:

| Type | When do you release? | Prevents deadlock? | Prevents cascading rollback? |
|---|---|---|---|
| Basic 2PL | After you're done with the item (two phases) | No | No |
| Strict 2PL | Only at commit/abort | No | YES |
| Preclaiming 2PL | After done (but acquired all upfront) | YES | No |

---

### Conflict Serialisability:

**The question:** Can this schedule be reordered to look like transactions ran one after another?

**How to check — draw a precedence graph:**

Two operations CONFLICT if:
- They are from different transactions
- They access the same data item
- At least one is a WRITE

For each conflict, draw an arrow: if T1's operation comes before T2's conflicting operation → draw `T1 → T2`

**If the graph has a cycle → NOT conflict serialisable.**
**If no cycle → IS conflict serialisable** (any topological order of the graph is a valid serial order).

---

### Cascading Rollbacks — how to trace them:

When a transaction T is aborted, you need to abort every transaction that READ data written by T.

**The chain:**
1. T4 is aborted
2. T1 read something T4 wrote → T1 must be aborted
3. T2 read something T1 wrote → T2 must be aborted
4. T6 read something T2 wrote → T6 must be aborted
5. Keep going until no more transactions are affected

**Key rule:** Only "read-after-write" chains cause cascading rollbacks.
- T1 wrote X → T2 read X → T2 is affected
- T1 wrote X → T2 also wrote X (without reading) → T2 is NOT affected

---

### Read/Write conflict table (quick reference):

| | T2: R(x) | T2: W(x) |
|---|---|---|
| **T1: R(x)** | No conflict | Conflict (T1→T2 or T2→T1) |
| **T1: W(x)** | Conflict | Conflict |

---

## 7. Assumption Sections — What to Write {#assumptions}

### When the exam says "explain your design choices and assumptions":

This is FREE POINTS. Here's exactly what to write:

---

### Template phrases (use these, adapted to your scenario):

**Opening:**
> "In this design we have tried to stay as close as possible to the scenario description while still guaranteeing that every entity set has a primary key."

**On artificial keys:**
> "We introduced an artificial key [id] for [Entity] since there is no natural unique identifier mentioned in the scenario."

**On cardinalities:**
> "We modelled the relationship between [A] and [B] as [1:N / M:N / 1:1] because [reason from the text]. Alternative cardinalities could also be justified — for example, if [X], then the relationship could be [M:N] instead."

**On merging relations:**
> "Due to the cardinality (max 1) on the [A] side of the [relationship] relationship, we merged it into the [A] entity instead of creating a separate relation table. This avoids unnecessary NULLs."

**On weak entities:**
> "[Entity] is modelled as a weak entity because it cannot be uniquely identified without reference to its owner [Entity]."

**On multivalued attributes:**
> "[Attribute] is multivalued (e.g. a person can have multiple phone numbers), so it is represented as a separate relation with a foreign key back to [Entity]."

**On design alternatives:**
> "Instead of modelling [X] as an attribute of [Entity], one could model it as a separate entity. We chose the attribute approach because the scenario does not suggest [X] needs its own identity."

**On nullable attributes:**
> "The [attribute] of [entity] is nullable because not every [entity] is guaranteed to have one according to the scenario."

---

### Checklist — things to mention to get points:

- [ ] Mention artificial keys where you introduced them (and why)
- [ ] Mention at least one cardinality choice and justify it from the scenario
- [ ] Say there could be alternative cardinalities that also make sense
- [ ] Mention any merging decisions (relationship folded into entity)
- [ ] Mention nullable attributes
- [ ] Note any weak entities and why they're weak
- [ ] If you used aggregation — explain why
- [ ] Mention the general design principle: stay close to the scenario, every entity needs a PK

---

### BCNF/3NF — what to mention:

- Always state which FDs are lost in BCNF
- State your candidate keys explicitly before decomposing
- Show intermediate steps — the marker wants to see your working
- In 3NF: explicitly say "R4 was added because no previous relation contained the candidate key"
- In BCNF: explicitly say "splitting on FD [X → Y] because [X] is not a superkey"

---

## 12. Anomalies — What They Are and How to Spot Them {#anomalies}

### The core idea:

Anomalies are the **bad things that happen when your table is not normalised**. They're the reason we do 3NF and BCNF in the first place. On the exam you might be asked to identify them in a given (bad) relation, or to explain why normalisation fixes them.

There are three types:

---

### Update anomaly

> You have to change the same fact in multiple rows — and if you miss one, your data becomes inconsistent.

**Example:** Table `Works(employeeName, companyName, companyCity)`

| employeeName | companyName | companyCity |
|---|---|---|
| Alice | FBC | Amsterdam |
| Bob | FBC | Amsterdam |
| Carol | FBC | Amsterdam |

If FBC moves to Utrecht, you have to update 3 rows. Miss one → inconsistency.

**Why it happens:** `companyName → companyCity` but `companyName` is not the key. The city fact is repeated once per employee.

**Fix:** Split into `Works(employeeName, companyName)` and `Company(companyName, companyCity)`.

---

### Insertion anomaly

> You can't record a fact without also having unrelated information to fill in.

**Example:** Same table `Works(employeeName, companyName, companyCity)`

You want to record that a new company "NewCorp" is based in Rotterdam — but you can't insert it without having an employee to go with it (because `employeeName` is part of the key).

**Why it happens:** You're trying to store two independent facts (employee works at company; company is in city) in one table.

**Fix:** Same split as above — separate table for company info.

---

### Deletion anomaly

> Deleting one fact accidentally destroys another unrelated fact.

**Example:** Same table. If Carol is the only employee at NewCorp and she leaves → you delete her row → and now you've lost the fact that NewCorp exists in Rotterdam.

**Why it happens:** Two independent facts are tied together in one row.

**Fix:** Separate tables so deleting an employee doesn't destroy company information.

---

### How to identify anomalies on the exam:

1. Look for a non-trivial FD where the LHS is **not** a superkey (= BCNF violation)
2. That FD is the source of all three anomalies
3. The repeated value on the RHS → **update anomaly**
4. Can't insert RHS fact without LHS → **insertion anomaly**
5. Deleting the only row with LHS value → **deletion anomaly**

**Quick phrase to write on exam:**
> "This relation has an update anomaly because [companyCity] depends on [companyName] which is not a key — the same city is repeated for every employee of that company. It also has an insertion anomaly because a new company cannot be added without an employee, and a deletion anomaly because deleting the last employee of a company destroys the company's location data."

---

## 13. Multi-Granularity Locking {#mgl}

### The idea:

Instead of locking at just one level (e.g. always the whole table, or always individual rows), multi-granularity locking lets transactions lock at different levels of a hierarchy:

```
Database
  └── Table
        └── Page
              └── Row (tuple)
```

A lock at a higher level implicitly covers everything below it. But to allow other transactions to lock at lower levels, you need **intention locks** to signal your intentions upward.

---

### The five lock types:

| Lock | Name | Meaning |
|---|---|---|
| **S** | Shared | I want to READ this node (and everything below) |
| **X** | Exclusive | I want to WRITE this node (and everything below) |
| **IS** | Intention Shared | I intend to place S locks on some children |
| **IX** | Intention eXclusive | I intend to place X locks on some children |
| **SIX** | Shared + Intention eXclusive | I'm reading the whole thing (S) AND will write some children (IX) |

---

### The protocol — two rules:

1. **Top-down to acquire:** Before locking a node, you must hold the appropriate intention lock on its parent.
2. **Bottom-up to release:** Release locks from the bottom up (leaves first, then parents).

**Example:** To write a single row:
- Lock Database with IS or IX
- Lock Table with IX
- Lock Row with X

---

### Compatibility matrix (can two transactions hold these simultaneously?):

|  | IS | IX | S | SIX | X |
|---|---|---|---|---|---|
| **IS** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **IX** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **S** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **SIX** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **X** | ❌ | ❌ | ❌ | ❌ | ❌ |

**Key things to memorise:**
- IS and IX are compatible with each other (two transactions can both "intend" things at lower levels — conflicts only happen when they actually try to lock the same row)
- S and IX are NOT compatible (you can't read the whole table while someone intends to write part of it)
- SIX and anything except IS is incompatible
- X is compatible with nothing

---

### The exam trick question:

> "Can T1 hold IX and T2 hold IS on the same table at the same time?"

**Answer: YES** — they are compatible at the table level. The actual conflict (if any) only appears when they try to lock the same row at a lower level. The intention locks just warn each other that something's happening below.

---

### When to use which lock in practice:

| What you want to do | Locks to acquire on the table |
|---|---|
| Read a few rows | IS on table, then S on rows |
| Write a few rows | IX on table, then X on rows |
| Read the entire table | S on table (no need for row locks) |
| Read entire table + write a few rows | SIX on table, then X on the specific rows |
| Write the entire table | X on table |

---

## 14. Database Application Programming {#app}

### The core exam topics here:

This section tests whether you understand what happens when application code talks to a database — the problems that arise, and the tools used to solve them.

---

### Impedance mismatch

> The data model in your programming language and the data model in your database don't match. Bridging that gap is the "impedance mismatch" problem.

**Concrete examples of the mismatch:**
- Databases have NULL; most languages don't (or handle it differently)
- Databases work with sets/tables; languages work with objects, lists, loops
- Database types (VARCHAR, DECIMAL) don't map 1:1 to language types (String, float)
- A database query returns a set of rows; a language expects individual objects

**On the exam:** If asked to define impedance mismatch, hit these two points:
1. Difference in data model (tables vs objects)
2. Specific examples: NULLs, types, set-at-a-time vs record-at-a-time

---

### String-based query construction — why it's bad

Building SQL by concatenating strings:

```java
String query = "SELECT * FROM Users WHERE name = '" + userName + "'";
```

**Advantage:** Flexible — you can build any query shape dynamically.

**Disadvantage — SQL injection:** If `userName` is `' OR '1'='1` → the query becomes:
```sql
SELECT * FROM Users WHERE name = '' OR '1'='1'
```
→ returns all users. Attacker can read, delete, or modify anything.

**Fix: prepared statements** — parameters are sent separately, never interpolated into the query string:

```java
PreparedStatement ps = conn.prepareStatement("SELECT * FROM Users WHERE name = ?");
ps.setString(1, userName);
```

The `?` is a placeholder. The database treats the parameter as a value, never as SQL code.

---

### Prepared statements — why they're also faster

Beyond security, prepared statements are parsed and compiled once, then reused with different parameters. This avoids re-parsing the query every time → performance win for repeated queries.

---

### JDBC performance features (know these three):

1. **Prepared statements** — compile once, execute many times, also prevents SQL injection
2. **Connection pooling** — reuse database connections instead of opening a new one per query (connections are expensive to create)
3. **Stored procedures** — move logic into the database itself, reducing round-trips between app and DB; the DB compiles and optimises them

---

### ORMs (Object-Relational Mappers)

Tools like **Hibernate** (Java) or **Entity Framework** (.NET) that automatically map between database tables and programming language objects.

**What they solve:** Impedance mismatch — you work with objects in your code, the ORM handles the SQL.

**In the ANSI-SPARC architecture:**
- **Physical level** — how data is stored on disk (indexes, pages)
- **Logical/Conceptual level** — the relational schema (tables, FDs)
- **External/View level** — what individual applications see

ORMs sit at the **external/conceptual level** — they provide the application with its own view of the data, and can hide database schema changes from the application (as long as you update the ORM mapping after the schema change).

---

### LINQ (Language-Integrated Query)

An extension in C# / Visual Basic that lets you write queries directly in the programming language — no SQL strings, no impedance mismatch.

**Key advantage:** Static type checking — the compiler catches query errors before runtime. Normal SQL-as-strings only fails at runtime.

**Key advantage:** No impedance mismatch — queries work on any collection (database, list, array) using the same syntax.

---

### Quick exam phrase bank:

- *"String-based query construction is flexible but vulnerable to SQL injection — the fix is to use prepared statements where parameters are passed separately."*
- *"Impedance mismatch arises because databases model data as relations with NULL, while programming languages model data as typed objects without a native NULL."*
- *"ORMs provide the external level of the ANSI-SPARC architecture — they allow the application schema to evolve independently of the underlying database schema."*
- *"Connection pooling avoids the overhead of creating a new database connection per query — connections are kept open and reused."*

---

*Good luck — you've got this.*

---

## Related Notes
- [[Technical Skills/Notes/05 - Databases]] — databases in engineering context
- [[Knowledge & Data/K&D Notes]] — knowledge and data representation
- [[DAL/ExamPrep AI/Database Schema]] — database schema design

# Databases Exam — Tips, Tricks & Cheat Sheet

> Written in your language. Think of this as the friend who did all the exams before you explaining everything over coffee.

---

## TABLE OF CONTENTS
1. [SQL — Division Queries (NOT EXISTS magic)](#sql)
2. [Normalisation — 3NF step by step](#3nf)
3. [Normalisation — BCNF step by step](#bcnf)
4. [ER Diagrams — Shapes, Cardinalities, Tips](#er)
5. [Relational Schema — How to write it out](#schema)
6. [Transactions — 2PL, Strict 2PL, Rollbacks](#transactions)
7. [Assumption Sections — What to write to get points](#assumptions)

---

## 1. SQL — Division Queries {#sql}

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

*Good luck — you've got this.*

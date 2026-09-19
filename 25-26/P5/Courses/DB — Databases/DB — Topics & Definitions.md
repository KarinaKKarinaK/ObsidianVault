# DB — Topics & Definitions

[[DB — Index|← Back to DB Index]]

---

## CONCEPTUAL MODELLING

> Source: slides/02_data_modelling.pdf

> [!definition] Entity
> A distinguishable real-world object. Represented as a rectangle in ER diagrams. Has attributes.

> [!definition] Relationship
> An association between two or more entities. Represented as a diamond. Can have attributes.

> [!definition] Weak Entity Set
> An entity that cannot be uniquely identified by its own attributes alone. Depends on a **identifying relationship** with an owner entity. Identified by its **discriminator attribute** + the owner's primary key.
> - Drawn with double rectangle (entity) + double diamond (identifying relationship)
> - Discriminator attribute underlined with dashed line

> [!definition] ISA Inheritance
> A specialisation relationship where a subtype IS-A supertype.
> - **Overlapping vs Disjoint**: can an entity belong to multiple subtypes?
> - **Covering vs Non-covering**: must every supertype instance belong to a subtype?

> [!definition] Aggregation
> Treating a relationship as an entity so it can participate in another relationship. Used when a relationship itself needs to be related to something else.

> [!definition] Cardinality Notation
> Expresses the number of entities that can participate in a relationship:
> - **1:1** — one-to-one
> - **1:N** — one-to-many
> - **M:N** — many-to-many
> - Written as (min, max) on the participation lines

---

## RELATIONAL MODEL

> Source: slides/01_relational_model.pdf

> [!definition] Superkey
> Any set of attributes that uniquely identifies a tuple in a relation.

> [!definition] Candidate Key
> A **minimal** superkey — removing any attribute breaks uniqueness.

> [!definition] Primary Key
> The chosen candidate key used as the main row identifier. Underlined in schema notation. Cannot be NULL.

> [!definition] Foreign Key
> An attribute (or set) in relation R that references the primary key of relation S. Enforces **referential integrity**: every FK value must exist as a PK in the referenced table (or be NULL if allowed).

> [!definition] NULL Semantics
> NULL means "unknown" or "not applicable". In SQL:
> - `NULL = NULL` evaluates to UNKNOWN (not TRUE)
> - Use `IS NULL` / `IS NOT NULL` for NULL checks
> - NULL in a NOT IN subquery causes the entire condition to return UNKNOWN

> [!definition] Integrity Constraints
> Rules that the database enforces:
> - **Domain constraints**: attribute values must be of the correct type
> - **Key constraints**: primary key values are unique and not null
> - **Referential integrity**: FK values reference valid PK values
> - **NOT NULL**: attribute cannot be null

---

## NORMALIZATION

> Source: slides/04_functional_dependencies.pdf

> [!definition] Functional Dependency (FD)
> {A₁,...,Aₙ} → {B₁,...,Bₘ} **holds for relation R** in state I if and only if:
> for all tuples t, u ∈ I(R): if t.A₁ = u.A₁ ∧ ... ∧ t.Aₙ = u.Aₙ, then t.B₁ = u.B₁ ∧ ... ∧ t.Bₘ = u.Bₘ
>
> Intuition: knowing the LHS attributes tells you the RHS attributes.

> [!definition] Trivial FD
> An FD X → Y where Y ⊆ X. Always holds; contains no information.

> [!definition] Closure of Attribute Set X⁺
> The set of all attributes that X functionally determines (directly or via transitivity).
> **Algorithm:** Start with X⁺ = X. Repeat: for each FD L→R in F, if L ⊆ X⁺ then add R to X⁺. Stop when no change.

> [!definition] Armstrong Axioms
> Sound and complete rules for deriving FDs:
> 1. **Reflexivity**: if Y ⊆ X then X → Y (trivial FDs)
> 2. **Augmentation**: if X → Y then XZ → YZ (add attributes to both sides)
> 3. **Transitivity**: if X → Y and Y → Z then X → Z

> [!definition] Canonical (Minimal Basis) FD Set
> A set F_c equivalent to F where:
> 1. Every RHS is a **single attribute**
> 2. No FD has a **redundant attribute on the LHS** (cannot remove any LHS attribute and preserve equivalence)
> 3. No FD is **redundant** (cannot remove any FD and preserve equivalence)

> [!definition] 1NF — First Normal Form
> All table entries are **atomic** (not lists, sets, records, or relations).
> All further normal forms assume 1NF.
> Note: `char(100)` storing a CSV is technically 1NF but bad design.

> [!definition] BCNF — Boyce-Codd Normal Form
> Relation R is in BCNF if for every non-trivial FD X → A in F:
> **X is a superkey of R**
>
> Rough intuition: "all FDs are keys."
> - More restrictive than 3NF, easier to define
> - A well-designed ER model → relational schema is automatically in BCNF
> - BCNF decomposition may lose FDs

> [!definition] 3NF — Third Normal Form
> Relation R is in 3NF if for every non-trivial FD X → A in F:
> **X is a superkey of R**, OR **A is a prime attribute** (member of some candidate key)
>
> - Less restrictive than BCNF (prime attribute exception)
> - 3NF always preserves all FDs
> - 3NF synthesis always exists

> [!definition] Prime Attribute
> An attribute that is a member of at least one candidate key.

> [!definition] FD Loss
> - **BCNF decomposition**: may lose FDs (some FDs span multiple resulting relations)
> - **3NF synthesis**: always preserves all FDs (each canonical FD becomes a relation)

> [!definition] Multivalued Dependency (MVD)
> X ↠ Y: given X, the set of Y values is independent of the other attributes.
> 4NF requires that for every non-trivial MVD X ↠ Y, X is a superkey.

> [!formula] Canonical Set Algorithm (4 steps)
> **Input:** FD set F on relation R
> 1. **Split RHS**: rewrite each FD X → {A,B,...} as X→A, X→B, ...
> 2. **Remove redundant LHS attributes**: for each FD XY→A, check if X→A holds without Y (compute X⁺ in F − {XY→A} ∪ {X→A}). If yes, remove Y.
> 3. **Remove redundant FDs**: for each FD X→A, check if X→A holds in F without that FD (compute X⁺ in F − {X→A}). If A ∈ X⁺, remove it.
> 4. Result is canonical set F_c

> [!formula] Minimal Keys
> A set K is a key of R if K⁺ = all attributes of R.
> K is **minimal** if removing any attribute from K means K no longer determines all attributes.
> To find all minimal keys: try all subsets starting from smallest; check closure.

---

## SQL

> Source: slides/05_sql.pdf

> [!definition] NOT EXISTS vs NOT IN
> - **NOT IN**: `WHERE x NOT IN (SELECT ...)` — if subquery returns ANY NULL, the entire NOT IN evaluates to UNKNOWN for all rows → silently wrong results
> - **NOT EXISTS**: `WHERE NOT EXISTS (SELECT 1 FROM ... WHERE ...)` — NULL-safe; checks existence of rows, not value equality

> [!definition] Double NOT EXISTS (Universal Quantification)
> To express "∀ x: P(x)" use "¬∃ x: ¬P(x)":
> ```sql
> WHERE NOT EXISTS (         -- there is no x
>     SELECT 1 FROM T WHERE  -- such that
>     NOT EXISTS (...)       -- P(x) fails
> )
> ```

> [!definition] Correlated vs Uncorrelated Subquery
> - **Uncorrelated**: inner query runs once, independently of outer query
> - **Correlated**: inner query references outer query variables; runs once per outer row

> [!definition] Aggregation — GROUP BY vs WHERE vs HAVING
> - **WHERE**: filters individual rows **before** grouping
> - **GROUP BY**: groups remaining rows by specified attributes
> - **HAVING**: filters **groups** (can use aggregate functions)
> - Order: WHERE → GROUP BY → HAVING → SELECT

---

## TRANSACTIONS

> Source: slides/06_transactions.pdf

> [!definition] Transaction
> A sequence of database operations executed as a single logical unit. Must be **atomic** (all or nothing).

> [!definition] Concurrency Anomalies (from slides)
> - **Lost update anomaly**: two transactions both read a value, both modify it, second write overwrites first
> - **Inconsistent read anomaly**: transaction reads a value mid-way through another transaction's update, seeing a temporary inconsistent state

> [!definition] Schedule
> An interleaving of operations from multiple transactions. Notation: R(X) = read X, W(X) = write X.

> [!definition] Serial Schedule
> A schedule where transactions execute one after another with no interleaving. Always correct.

> [!definition] Conflict
> Two operations **conflict** if:
> 1. They belong to **different transactions**
> 2. They access the **same data item**
> 3. At least one is a **write**
>
> Three conflict types: R-W (dirty read risk), W-R (unrepeatable read), W-W (lost update)

> [!definition] Conflict Serializable
> A schedule is conflict serializable if it can be transformed into a serial schedule by swapping **non-conflicting** adjacent operations.

> [!definition] Precedence Graph (Serialisability Test)
> Nodes = transactions. Edge Ti → Tj if Ti has an operation that conflicts with and precedes an operation of Tj.
> **Theorem**: schedule is conflict serializable ⟺ precedence graph is **acyclic**.

> [!definition] Recoverable Schedule
> A schedule where if Ti reads data written by Tj, then Tj **commits before** Ti commits.
> (If Tj aborts, Ti can still be safely rolled back.)

> [!definition] Cascadeless Schedule
> A schedule where transactions only read data written by **already committed** transactions.
> - Cascadeless ⊂ Recoverable (cascadeless implies recoverable, not vice versa)
> - Prevents cascading rollbacks

> [!definition] 2PL — Two-Phase Locking
> A protocol ensuring conflict serializability:
> - **Growing phase**: transaction acquires locks, releases none
> - **Shrinking phase**: transaction releases locks, acquires none
> - Lock point = moment transaction enters shrinking phase

> [!definition] Strict 2PL
> 2PL + hold ALL locks until the transaction **commits or aborts**.
> Prevents cascading rollbacks (ensures cascadeless schedules).

> [!definition] Preclaiming 2PL (Conservative 2PL)
> 2PL + acquire ALL needed locks **before the transaction starts**.
> Prevents deadlocks (but may cause starvation).

> [!definition] Deadlock
> Cycle in the waits-for graph (Ti waits for Tj waits for ... waits for Ti).
> Resolution: abort one transaction in the cycle.

> [!definition] Isolation Levels (SQL standard)
> | Level | Dirty Read | Unrepeatable Read | Phantom Read |
> |-------|-----------|------------------|--------------|
> | READ UNCOMMITTED | ✓ possible | ✓ possible | ✓ possible |
> | READ COMMITTED | ✗ prevented | ✓ possible | ✓ possible |
> | REPEATABLE READ | ✗ | ✗ prevented | ✓ possible |
> | SERIALIZABLE | ✗ | ✗ | ✗ prevented |

> [!definition] Optimistic Concurrency Control (OCC)
> Three phases: Read (no locking) → Validate (check conflicts at commit time) → Write.
> Best when conflicts are rare.

> [!definition] MVCC — Multiversion Concurrency Control
> Multiple versions of data items maintained.
> Readers don't block writers; writers don't block readers.
> Used by PostgreSQL, Oracle.

---

## DATABASE APIs

> Source: slides/07_db_application_programming.pdf

> [!definition] String Assembly (Dynamic SQL Vulnerability)
> Building SQL queries by concatenating user input as strings.
> ```java
> // VULNERABLE:
> String query = "SELECT * FROM users WHERE name = '" + userName + "'";
> ```
> Risk: **SQL injection** — attacker inputs `' OR '1'='1` to bypass logic.

> [!definition] Prepared Statements
> SQL query with placeholders, compiled once, executed with parameters separately.
> ```java
> // SAFE:
> PreparedStatement ps = conn.prepareStatement(
>     "SELECT * FROM users WHERE name = ?");
> ps.setString(1, userName);
> ```
> Advantages: SQL injection prevention, query plan cached (performance), type safety.

> [!definition] Static vs Dynamic SQL
> - **Static embedded SQL**: queries fixed at compile time (e.g. SQLJ, Embedded SQL for C/C++). Inflexible but syntax-checked at compile time.
> - **Dynamic SQL**: queries constructed at runtime via API (e.g. JDBC, Python DB-API, ODBC, OLE-DB). Flexible but error-prone.

> [!definition] ANSI SPARC Architecture — Three Levels
> | Level | Name | Description |
> |-------|------|-------------|
> | External (highest) | View level | How individual users/applications see the data. Multiple external schemas possible. |
> | Conceptual (middle) | Logical level | The full logical structure of the database (all tables, FKs, constraints). |
> | Internal (lowest) | Physical level | How data is physically stored (files, indexes, storage structures). |

> [!definition] ORM — Object-Relational Mapping
> Sits at the **external/conceptual** level of ANSI SPARC.
> **Purpose**: hides navigational access behind objects; provides an application-level view of the database; supports schema evolution without changing application code.
> Examples: Hibernate (Java/JPA), Entity Framework (.NET/LINQ), Ruby on Rails (ActiveRecord), ADO.NET.

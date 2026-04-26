# DB — Databases Index

[[../../000 MOC — Exam Season 2026|← Back to MOC]]

> **Exam:** Thu 21 May 2026, 18:45 | **Target:** Pass + 0.5 bonus | **Status:** Bonus secured (90+ hw pts)
> **Primary resource:** joerg.endrullis.de/databases/ (51 videos)

## Sub-notes

| File | Purpose |
|------|---------|
| [[DB — Video Lecture Log]] | Track all 51 videos — mark ✓ after each |
| [[DB — Topics & Definitions]] | Key definitions for all topic areas |
| [[DB — SQL Practice]] | Schema + Q3a + Q3b + NOT EXISTS patterns |
| [[DB — Normalization Drills]] | Canonical FD algorithm + worked drills |
| [[DB — Transactions]] | Schedules, 2PL, isolation levels |
| [[DB — Exam Strategy]] | Question types, point allocation, timing |

## Source Materials
- Slides: `../../Databases/slides/` (00–07)
- Exercises: `../../Databases/exercises/` (Modelling, Normalisation, SQL, Transactions + solutions)
- Past exam: `../../Databases/past_exams/ExerciseExam (1).pdf` + solutions

---

## Topic Checklist

### CONCEPTUAL MODELLING
- [ ] ER diagrams: entities, attributes, relationships, cardinality notation
- [ ] Aggregation: when to use, how to model in ER
- [ ] Weak entity sets: identifying relationship, discriminator attribute
- [ ] ISA inheritance: overlapping vs disjoint, covering vs non-covering
- [ ] UML class diagrams: translation from ER
- [ ] Relational schema derivation: primary keys, foreign keys, nullable attributes, candidate keys

### SQL
- [ ] Basic syntax: SELECT, FROM, WHERE, attribute references
- [ ] Joins: inner join, self-join, DISTINCT, LEFT/RIGHT/FULL OUTER JOIN
- [ ] Non-monotonic queries: (NOT) IN — limitations with NULLs
- [ ] NOT EXISTS: semantics, when to prefer over NOT IN
- [ ] "For all" via double NOT EXISTS: ¬∃ pattern
- [ ] Nested subqueries: correlated vs uncorrelated
- [ ] Subqueries under FROM: inline views
- [ ] Single value subqueries: scalar subqueries in WHERE
- [ ] ALL, SOME, ANY operators: semantics
- [ ] Aggregation: COUNT, SUM, AVG, MIN, MAX
- [ ] GROUP BY vs WHERE: when each applies
- [ ] HAVING: filtering on aggregate results
- [ ] Aggregation subqueries: aggregates inside subqueries
- [ ] UNION, INTERSECT, EXCEPT: set operations, duplicate handling
- [ ] CASE expressions, COALESCE, NULLIF
- [ ] ORDER BY: ASC/DESC, NULLS FIRST/LAST

### NORMALIZATION
- [ ] Functional dependencies: definition, trivial FDs
- [ ] Closure of attribute sets: algorithm
- [ ] Armstrong axioms: reflexivity, augmentation, transitivity — with proofs
- [ ] Implication: proving FDs via axiom chains
- [ ] Canonical FD set (minimal basis): 4-step algorithm with all intermediate steps
- [ ] Minimal keys: derivation from canonical set
- [ ] Determinants and canonical dependencies
- [ ] 1NF definition and violation examples
- [ ] BCNF: definition and violation check
- [ ] 3NF: definition and how it differs from BCNF (prime attribute exception)
- [ ] BCNF decomposition: maximise RHS, iterative splits
- [ ] 3NF synthesis: one relation per canonical FD + key relation if needed
- [ ] FD loss in BCNF vs 3NF: which can lose FDs and why
- [ ] Multivalued dependencies (MVD) and 4NF: definition
- [ ] Denormalization: when and trade-offs

### TRANSACTIONS
- [ ] Schedules: serial vs interleaved
- [ ] Conflict types: R-W, W-R, W-W
- [ ] Conflict serializability: definition
- [ ] Precedence graph: construction and cycle detection
- [ ] Cascadeless schedules: definition
- [ ] Recoverable schedules: definition
- [ ] Cascadeless ⊂ recoverable: why
- [ ] 2PL: growing and shrinking phases
- [ ] Strict 2PL: holds locks until commit
- [ ] Preclaiming 2PL: acquires all locks before start
- [ ] Deadlock detection: waits-for graph
- [ ] Cascading rollbacks: mechanism
- [ ] Granularity of locking: table vs page vs row
- [ ] Isolation levels: READ UNCOMMITTED → SERIALIZABLE
- [ ] Optimistic concurrency control: validate phase
- [ ] MVCC: readers don't block writers

### DATABASE APIs
- [ ] String assembly: SQL injection vulnerability
- [ ] Prepared statements: mechanism and advantages
- [ ] ANSI SPARC: three levels (external, conceptual, internal)
- [ ] ORM position in ANSI SPARC: external/conceptual level
- [ ] ORM purpose: application view + schema evolution
- [ ] Hibernate, Entity Framework: examples

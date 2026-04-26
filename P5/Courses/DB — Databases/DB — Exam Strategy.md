# DB — Exam Strategy

[[DB — Index|← Back to DB Index]]

---

## Grading (from Exercise Exam)

| Question | Topic | Points |
|----------|-------|--------|
| 1(a) | ER Diagram | **1.5 pts** |
| 1(b) | Relational Schema derivation | 0.5 pts |
| 2(a) | Canonical FD set | 0.5 pts |
| 2(b) | Minimal keys | 0.5 pts |
| 2(c) | BCNF (check + decompose) | **1.0 pt** |
| 2(d) | 3NF (check + synthesise) | 0.5 pts |
| 3(a) | SQL: parts supplied by one supplier | **1.0 pt** |
| 3(b) | SQL: suppliers selling all black parts | **1.0 pt** |
| 4(a) | Define cascadeless + recoverable | 0.5 pts |
| 4(b) | Precedence graph + serialisability | 0.5 pts |
| 5(a) | String assembly advantages/disadvantages | 0.5 pts |
| 5(b) | ANSI SPARC levels + ORM | 0.5 pts |
| **Total** | | **~7.5 pts from 1** |

> Grading starts at 1. Total = 8.5 points worth of questions above the base.

---

## Time Allocation

Exam is written. Estimated 2h total.

| Question | Suggested time |
|----------|---------------|
| Q1: ER + schema | 35 min |
| Q2: Normalization (4 sub-questions) | 35 min |
| Q3: SQL (2 queries) | 20 min |
| Q4: Transactions | 15 min |
| Q5: APIs | 10 min |
| Buffer / check | 5 min |

---

## High-Value Exam Moves

> [!tip] Q1 ER Diagram (1.5 pts — biggest single question)
> - Read scenario twice before drawing anything
> - Identify: entities, attributes, relationships, cardinalities
> - Check for: weak entities (need owner + identifying relationship), ISA, aggregation
> - Document assumptions explicitly — marks awarded for reasoning, not just the diagram
> - In Q1b: underline PKs, use → for FKs, explicitly state NULLable attributes and candidate keys

> [!tip] Q2 Normalization — show ALL intermediate steps
> "Show your intermediate steps in all the answers" — from exam. No steps = no partial credit.
> - Q2a: show each of the 3 steps of the canonical algorithm
> - Q2b: show closures computed, not just the answer
> - Q2c/d: state the definition first, then check each FD explicitly

> [!tip] Q3 SQL — avoid GROUP BY
> "You will only obtain maximal points for your answers if your answers avoid use of GROUP BY in favor of existential quantification."
> - For "only one supplier" → double self-join NOT EXISTS
> - For "all black parts" → double NOT EXISTS pattern
> - Mentally trace through your query with a small example before writing final answer

> [!tip] Q4 Precedence graph — be systematic
> 1. Write all operations in time order
> 2. List every conflicting pair (different txn, same item, ≥1 write)
> 3. Draw edges
> 4. State cycle / no cycle explicitly
> 5. State conclusion: conflict serializable / not

> [!tip] Q5 APIs — know the ANSI SPARC levels cold
> External (highest) = views/applications | Conceptual (middle) = logical schema | Internal (lowest) = physical storage
> ORM sits at external level. Purpose: hides navigation, supports schema evolution.

---

## Things to Write From Memory Before the Exam Starts

On your scratch paper in the first 2 minutes:
1. BCNF definition: "for every non-trivial FD X→A, X is a superkey"
2. 3NF definition: "... OR A is a prime attribute"
3. Cascadeless ⊂ Recoverable (direction matters)
4. 2PL phases: growing (acquire) → shrinking (release)
5. ANSI SPARC: External → Conceptual → Internal
6. Double NOT EXISTS template:
```sql
WHERE NOT EXISTS (
    SELECT 1 FROM T WHERE condition AND
    NOT EXISTS (SELECT 1 FROM S WHERE ...)
)
```

---

## Common Mistakes to Avoid

> [!warning] ER → Relational: don't forget
> - Many-to-many relationships always become their own table
> - Weak entity: FK to owner is part of the PK
> - ISA: three translation options — pick one and be consistent

> [!warning] FD closure: don't forget to iterate
> The closure algorithm must repeat until no more attributes are added — one pass is not enough.

> [!warning] Canonical set: check for trivial FDs first
> Remove any FD where RHS ⊆ LHS before doing steps 2 and 3.

> [!warning] SQL: don't confuse WHERE and HAVING
> WHERE filters rows before grouping. HAVING filters groups after aggregation. Using WHERE with an aggregate function is a syntax error.

> [!warning] Precedence graph edges go Ti → Tj
> The edge direction is: the transaction whose operation comes **first in time** gets the outgoing edge. Not the other way around.

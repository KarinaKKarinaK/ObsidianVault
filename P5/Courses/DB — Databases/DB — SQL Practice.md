# DB — SQL Practice

[[DB — Index|← Back to DB Index]]

---

## Schema: Suppliers / Parts / Catalog

> Source: ExerciseExam (1).pdf, p.2

```sql
-- Primary keys underlined; → indicates foreign key

CREATE TABLE Suppliers (
    sid     INT PRIMARY KEY,
    sname   VARCHAR(100) NOT NULL,
    saddress VARCHAR(200)
);

CREATE TABLE Parts (
    pid     INT PRIMARY KEY,
    pname   VARCHAR(100) NOT NULL,
    color   VARCHAR(50)
);

CREATE TABLE Catalog (
    sid     INT REFERENCES Suppliers(sid),
    pid     INT REFERENCES Parts(pid),
    cost    DECIMAL(10,2),
    PRIMARY KEY (sid, pid)
);
```

> **Exam note:** Avoid GROUP BY in favour of existential quantification (NOT EXISTS). You only get full marks with NOT EXISTS patterns.

---

## SQL Pattern Reference

| Pattern | Use Case | Key Syntax |
|---------|----------|-----------|
| Basic join | Retrieve data from multiple tables | `FROM A, B WHERE A.x = B.x` |
| Self-join | Compare rows in same table | `FROM T t1, T t2 WHERE t1.x = t2.y` |
| DISTINCT | Remove duplicate rows | `SELECT DISTINCT col` |
| LEFT OUTER JOIN | Keep all rows from left table | `LEFT OUTER JOIN T ON ...` |
| NOT IN | Simple exclusion (avoid with NULLs!) | `WHERE x NOT IN (SELECT ...)` |
| NOT EXISTS | Existential negation (NULL-safe) | `WHERE NOT EXISTS (SELECT 1 FROM ... WHERE ...)` |
| Double NOT EXISTS | Universal quantification ("for all") | `WHERE NOT EXISTS (SELECT 1 FROM ... WHERE NOT EXISTS (...))` |
| Scalar subquery | Single value in WHERE | `WHERE cost > (SELECT AVG(cost) FROM ...)` |
| Inline view | Subquery as table in FROM | `FROM (SELECT ...) AS sub` |
| GROUP BY + HAVING | Aggregate + filter groups | `GROUP BY x HAVING COUNT(*) > 1` |
| UNION | Combine result sets (deduplicates) | `SELECT ... UNION SELECT ...` |
| UNION ALL | Combine without deduplication | `SELECT ... UNION ALL SELECT ...` |
| CASE | Conditional expression | `CASE WHEN ... THEN ... ELSE ... END` |
| COALESCE | First non-null value | `COALESCE(a, b, default)` |
| ORDER BY NULLS | Explicit null ordering | `ORDER BY x ASC NULLS LAST` |

---

## Exercise Exam — Q3a and Q3b

### Q3(a): Find pids of parts that are supplied by only one supplier

> Source: ExerciseExam (1).pdf, p.2 — worth 1 point

**Strategy:** A part is supplied by only one supplier if there does NOT exist a second supplier (different sid) who also supplies it.

```sql
-- NOT EXISTS version (full marks):
SELECT DISTINCT c1.pid
FROM Catalog c1
WHERE NOT EXISTS (
    SELECT 1
    FROM Catalog c2
    WHERE c2.pid = c1.pid
      AND c2.sid <> c1.sid
);
```

**Reading this query:**
- For each part `c1.pid`, look for any other catalog entry `c2` with the same `pid` but a different `sid`.
- If no such entry exists → the part is supplied by exactly one supplier → include it.

**Why not GROUP BY?**
```sql
-- Avoid (loses marks):
SELECT pid
FROM Catalog
GROUP BY pid
HAVING COUNT(DISTINCT sid) = 1;
```
The exam explicitly penalises GROUP BY in favour of existential quantification.

---

### Q3(b): Find supplier names who sell all black parts

> Source: ExerciseExam (1).pdf, p.2 — worth 1 point

**Strategy:** A supplier sells ALL black parts if there does NOT EXIST a black part that they do NOT supply.

This is the **double NOT EXISTS** pattern implementing universal quantification: ∀x P(x) ≡ ¬∃x ¬P(x).

```sql
SELECT s.sname
FROM Suppliers s
WHERE NOT EXISTS (
    -- Is there a black part...
    SELECT 1
    FROM Parts p
    WHERE p.color = 'black'
      AND NOT EXISTS (
          -- ...that this supplier does NOT have in their catalog?
          SELECT 1
          FROM Catalog c
          WHERE c.sid = s.sid
            AND c.pid = p.pid
      )
);
```

**Reading this query:**
1. Outer loop: for each supplier `s`
2. Inner NOT EXISTS: does there exist a black part `p` such that...
3. Innermost NOT EXISTS: `s` does NOT catalog `p`?
4. If no such "missing black part" exists → supplier sells all black parts → include them.

**Double negation logic:**
```
"sells all black parts"
= ¬∃ black part p such that (supplier does not sell p)
= NOT EXISTS (black part WHERE NOT EXISTS (catalog entry))
```

---

## 5 Additional NOT EXISTS Practice Queries

### Q1: Suppliers who supply at least one part costing less than 10

```sql
SELECT s.sname
FROM Suppliers s
WHERE EXISTS (
    SELECT 1
    FROM Catalog c
    WHERE c.sid = s.sid
      AND c.cost < 10
);
```

### Q2: Parts that are NOT supplied by supplier with sid = 5

```sql
SELECT p.pid, p.pname
FROM Parts p
WHERE NOT EXISTS (
    SELECT 1
    FROM Catalog c
    WHERE c.pid = p.pid
      AND c.sid = 5
);
```

### Q3: Suppliers who supply ALL parts (every part in the Parts table)

```sql
SELECT s.sname
FROM Suppliers s
WHERE NOT EXISTS (
    SELECT 1
    FROM Parts p
    WHERE NOT EXISTS (
        SELECT 1
        FROM Catalog c
        WHERE c.sid = s.sid
          AND c.pid = p.pid
    )
);
```

### Q4: Self-join — pairs of suppliers selling the same part

```sql
SELECT DISTINCT c1.sid AS sid1, c2.sid AS sid2, c1.pid
FROM Catalog c1, Catalog c2
WHERE c1.pid = c2.pid
  AND c1.sid < c2.sid;   -- < avoids symmetric duplicates
```

### Q5: LEFT OUTER JOIN — parts with no catalog entry (never supplied)

```sql
SELECT p.pid, p.pname
FROM Parts p
LEFT OUTER JOIN Catalog c ON p.pid = c.pid
WHERE c.pid IS NULL;
```

### Q6: Suppliers whose average catalog cost exceeds the overall average

```sql
SELECT s.sname
FROM Suppliers s
WHERE (
    SELECT AVG(c.cost)
    FROM Catalog c
    WHERE c.sid = s.sid
) > (
    SELECT AVG(cost) FROM Catalog
);
```

---

## Aggregation Queries

### COUNT parts per supplier
```sql
SELECT s.sname, COUNT(c.pid) AS num_parts
FROM Suppliers s
LEFT JOIN Catalog c ON s.sid = c.sid
GROUP BY s.sid, s.sname;
```

### HAVING — suppliers with more than 2 parts
```sql
SELECT s.sname, COUNT(c.pid) AS num_parts
FROM Suppliers s
JOIN Catalog c ON s.sid = c.sid
GROUP BY s.sid, s.sname
HAVING COUNT(c.pid) > 2;
```

### CASE — label parts by price tier
```sql
SELECT p.pname,
       CASE
           WHEN c.cost < 10  THEN 'cheap'
           WHEN c.cost < 50  THEN 'medium'
           ELSE                   'expensive'
       END AS price_tier
FROM Parts p
JOIN Catalog c ON p.pid = c.pid;
```

### UNION — sids from suppliers or from catalog
```sql
SELECT sid FROM Suppliers
UNION
SELECT sid FROM Catalog;
```

### ORDER BY with NULLS LAST
```sql
SELECT p.pname, c.cost
FROM Parts p
LEFT JOIN Catalog c ON p.pid = c.pid
ORDER BY c.cost ASC NULLS LAST;
```

---

## Common Mistakes

> [!warning] NULL trap with NOT IN
> `WHERE pid NOT IN (SELECT pid FROM Catalog WHERE cost IS NULL)` — if any returned value is NULL, NOT IN returns UNKNOWN for all rows, silently excluding everything. Always use NOT EXISTS when NULLs are possible.

> [!warning] Missing correlation in NOT EXISTS
> The inner subquery MUST reference the outer query's variable (e.g. `c.sid = s.sid`). Without this, the subquery is uncorrelated and either always true or always false.

> [!warning] GROUP BY on exam
> Using GROUP BY instead of NOT EXISTS costs marks. Practice writing every "for all" and "exactly one" query with double NOT EXISTS.

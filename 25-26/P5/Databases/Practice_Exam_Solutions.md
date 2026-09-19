# Practice Exam Solutions & Hints
*Self-check guide — try the exams first before reading these.*

---

## EXAM 1

### 2a — Canonical FDs
Starting: $f = \{A \to BC,\ B \to D,\ C \to E,\ E \to B\}$

**Step 1 – split RHS:** $\{A \to B,\ A \to C,\ B \to D,\ C \to E,\ E \to B\}$

**Step 2 – check for redundant FDs:**
- $A \to B$: without it, $A^+ = \{A, C, E, B, D\}$ (via $A \to C \to E \to B \to D$). So $A \to B$ is **derivable** → **remove**.
- Revised: $\{A \to C,\ B \to D,\ C \to E,\ E \to B\}$
- All remaining FDs: check none are derivable without the others (they are not).

**Canonical:** $\{A \to C,\ B \to D,\ C \to E,\ E \to B\}$

### 2b — Minimal Keys
$A^+ = \{A, C, E, B, D\} = $ all of R(A,B,C,D,E). So **{A}** is a key.

A does not appear on any RHS → A must be in every key. {A} is the **only minimal key**.

### 2c — BCNF
Check each FD:
- $A \to C$: A is a key ✓
- $B \to D$: $B^+ = \{B, D\}$. B is **not** a key → **violates BCNF**
- $C \to E$: $C^+ = \{C, E, B, D\}$. C is not a key → **violates BCNF**
- $E \to B$: $E^+ = \{E, B, D\}$. E is not a key → **violates BCNF**

Decomposition (one path):
1. Decompose on $C \to E$: **R1(C, E, B, D)** and **R2(A, C)**.
2. R2(A,C): only $A \to C$, A is key ✓. **BCNF.**
3. R1(C,E,B,D): $C^+ = \{C,E,B,D\}$ = all of R1 → C is key. Check $E \to B$: E not key → violates. Decompose on $E \to B$: **R1a(E,B,D)** and **R1b(C,E)**.
4. R1b(C,E): $C \to E$, C is key ✓. **BCNF.**
5. R1a(E,B,D): $E \to B$, $B \to D$. $E^+ = \{E,B,D\}$ = all → E is key. $B \to D$: B not key → violates. Decompose: **R1a1(B,D)** and **R1a2(E,B)**.
6. Both in BCNF.

**Final BCNF:** R1a1(B,D), R1a2(E,B), R1b(C,E), R2(A,C).

**Lost FDs:** All canonical FDs are preserved in individual relations. Nothing is lost.

*(For 3NF via synthesis: R1(A,C), R2(B,D), R3(C,E), R4(E,B) — same as BCNF here.)*

### 3 — SQL Answers (Exam 1)

**(a) Conditions:**
```sql
SELECT name, dob
FROM Patient
WHERE city = 'Amsterdam' AND dob < '1985-01-01';
```

**(b) Joins:**
```sql
SELECT DISTINCT p.name
FROM Patient p
JOIN Appointment a ON p.pid = a.pid
JOIN Doctor d ON a.did = d.did
WHERE d.specialization = 'Cardiology';
```

**(c) Aggregations:**
```sql
SELECT d.name, COUNT(DISTINCT a.pid) AS patient_count
FROM Doctor d
JOIN Appointment a ON d.did = a.did
GROUP BY d.did, d.name
HAVING COUNT(DISTINCT a.pid) > 3;
```

**(d) Non-Monotonic (no GROUP BY):**
*Patients whose appointments are all with one doctor — no second distinct doctor exists:*
```sql
SELECT DISTINCT a1.pid
FROM Appointment a1
WHERE NOT EXISTS (
    SELECT 1 FROM Appointment a2
    WHERE a2.pid = a1.pid AND a2.did <> a1.did
);
```

**(e) Advanced — division (no GROUP BY):**
*Doctor sees every ICU patient — no ICU patient exists that the doctor has NOT seen:*
```sql
SELECT d.name
FROM Doctor d
WHERE NOT EXISTS (
    SELECT 1
    FROM AdmittedTo at
    JOIN Ward w ON at.wid = w.wid
    WHERE w.ward_name = 'ICU'
    AND NOT EXISTS (
        SELECT 1 FROM Appointment a
        WHERE a.pid = at.pid AND a.did = d.did
    )
);
```

### 4a — Two-Phase Locking (Exam 1)
Schedule:
```
T1:  start   R(X)          W(Y)          commit
T2:          start   R(X)        W(Y)    commit
```

**Strict 2PL:** T1 acquires SL(X). T2 acquires SL(X) — **compatible** (shared locks). T1 acquires XL(Y). T2 tries XL(Y) — **blocked** (T1 holds XL(Y)). T1 commits, releases SL(X) and XL(Y). T2 acquires XL(Y), commits. ✓ **Achievable.**

**Preclaiming 2PL:** T1 must pre-acquire {SL(X), XL(Y)} before starting. T2 must pre-acquire {SL(X), XL(Y)}. SL(X) + SL(X) compatible ✓. XL(Y) + XL(Y) **not compatible** ✗. T2 cannot pre-acquire until T1 commits. Therefore T2 cannot start until after T1 finishes → the interleaving shown is **not achievable** with preclaiming 2PL.

---

## EXAM 2

### 2a — Canonical FDs
Starting: $f = \{A \to BD,\ B \to C,\ D \to E,\ E \to D,\ AB \to C\}$

**Step 1 – split RHS:** $\{A \to B,\ A \to D,\ B \to C,\ D \to E,\ E \to D,\ AB \to C\}$

**Step 2 – left-side simplification of AB → C:**
- $A^+ = \{A, B, D, C, E\}$ (via $A \to B \to C$, $A \to D \to E$). A alone determines C.
- So $AB \to C$ reduces to $A \to C$.
- But $A \to C$ is already derivable via $A \to B \to C$. So $A \to C$ is **redundant** → **remove** $AB \to C$.

**Step 3 – check redundancy:**
- $A \to B$: without, $A^+ = \{A, D, E\}$. Cannot derive B. **Keep.**
- $A \to D$: without, $A^+ = \{A, B, C\}$. Cannot derive D. **Keep.**
- $B \to C$: without, $B^+ = \{B\}$. **Keep.**
- $D \to E$: without (with $E \to D$), $D^+ = \{D\}$. **Keep.**
- $E \to D$: without, $E^+ = \{E\}$. **Keep.**

**Canonical:** $\{A \to B,\ A \to D,\ B \to C,\ D \to E,\ E \to D\}$

### 2b — Minimal Keys
$A^+ = \{A, B, D, C, E\}$ = all. **{A}** is a key.

A does not appear on any RHS → must be in every key. **Only minimal key: {A}.**

### 2c — BCNF
- $A \to B$: A is key ✓
- $A \to D$: A is key ✓
- $B \to C$: $B^+ = \{B, C\}$, B not key → **violates**
- $D \to E$: $D^+ = \{D, E\}$, D not key → **violates**
- $E \to D$: $E^+ = \{E, D\}$, E not key → **violates**

Decompose on $B \to C$: **R1(B, C)**, **R2(A, B, D, E)**.
R1: B is key ✓. BCNF.
R2(A,B,D,E): FDs $A \to B$, $A \to D$, $D \to E$, $E \to D$. Key: $A^+ = \{A,B,D,E\}$. A is key.
- $D \to E$ violates (D not key in R2). Decompose: **R2a(D,E)**, **R2b(A,B,D)**.
- R2a: D→E, E→D. Both D and E are keys ✓. BCNF.
- R2b(A,B,D): $A \to B$, $A \to D$. A is key ✓. BCNF.

**Final BCNF:** R1(B,C), R2a(D,E), R2b(A,B,D).

**Lost FDs:** All canonical FDs preserved. Nothing lost.

### 3 — SQL Answers (Exam 2)

**(a) Conditions:**
```sql
SELECT username, age
FROM User
WHERE age > 25 AND city = 'Amsterdam';
```

**(b) Joins:**
```sql
SELECT DISTINCT s.title
FROM Song s
JOIN PlaylistSong ps ON s.sid = ps.sid
JOIN Playlist p ON ps.plid = p.plid
JOIN User u ON p.uid = u.uid
WHERE u.username = 'alice';
```

**(c) Aggregations:**
```sql
SELECT a.name, COUNT(*) AS total_listens
FROM Artist a
JOIN Song s ON a.aid = s.aid
JOIN Listens l ON s.sid = l.sid
GROUP BY a.aid, a.name
HAVING COUNT(*) > 50;
```

**(d) Non-Monotonic:**
```sql
SELECT DISTINCT u.username
FROM User u
WHERE EXISTS (SELECT 1 FROM Listens l WHERE l.uid = u.uid)
  AND NOT EXISTS (SELECT 1 FROM Rating r WHERE r.uid = u.uid);
```

**(e) Advanced — division (no GROUP BY):**
*User follows every Jazz artist — no Jazz artist exists that the user does NOT follow:*
```sql
SELECT u.username
FROM User u
WHERE NOT EXISTS (
    SELECT 1 FROM Artist a
    WHERE a.genre = 'Jazz'
    AND NOT EXISTS (
        SELECT 1 FROM Follows f
        WHERE f.uid = u.uid AND f.aid = a.aid
    )
);
```

### 4a — Two-Phase Locking (Exam 2)
Schedule:
```
T1:  start   W(A)                    R(B)   commit
T2:          start   R(A)   W(B)            commit
T3:  start   R(B)                           commit
```

**Strict 2PL:** T1 acquires XL(A). T2 waits for SL(A) (blocked by T1's XL). T3 acquires SL(B). T1 acquires SL(B) — compatible with T3's SL(B) ✓. T1 commits, releases XL(A) and SL(B). T2 gets SL(A), reads A. T2 acquires XL(B) — T3 still holds SL(B)? T3 commits before T2 needs XL(B) (T3 only reads B at the start). So T2 gets XL(B), commits. ✓ **Achievable.**

**Preclaiming 2PL:** T1 needs {XL(A), SL(B)}; T2 needs {SL(A), XL(B)}; T3 needs {SL(B)}.
- XL(A) and SL(A): incompatible → T2 waits.
- SL(B) and SL(B): compatible (T1 and T3 both want SL(B)) ✓.
- XL(B) and SL(B): incompatible → T2 must wait for both T1 and T3.
T2 cannot interleave with T1 as shown. **Not achievable** with preclaiming 2PL; T1 and T3 run, then T2 runs serially.

---

## EXAM 3

### 2a — Canonical FDs
$f = \{A \to B,\ BC \to D,\ D \to A,\ D \to E,\ E \to C\}$

**Step 1 – RHS are already singletons.**

**Step 2 – left-side simplification of BC → D:**
- $B^+ = \{B\}$; $C^+ = \{C\}$. Neither alone determines D. **Keep BC → D.**

**Step 3 – redundancy check:**
- $A \to B$: without, $A^+ = \{A\}$. Cannot derive B. **Keep.**
- $BC \to D$: without, $BC^+ = \{B,C\}$. Cannot derive D. **Keep.**
- $D \to A$: without, $D^+ = \{D,E,C\}$. Cannot derive A. **Keep.**
- $D \to E$: without (keep $D \to A$), $D^+ = \{D,A,B\}$. Cannot derive E. **Keep.**
- $E \to C$: without, $E^+ = \{E\}$. Cannot derive C. **Keep.**

**Canonical:** $\{A \to B,\ BC \to D,\ D \to A,\ D \to E,\ E \to C\}$ (already canonical)

### 2b — Minimal Keys
Compute closures:
- $D^+$: $D \to A \to B$; $D \to E \to C$; then $BC \to D$ (already have D). $D^+ = \{A,B,C,D,E\}$ = all. **{D}** is a key.
- $BC^+$: $BC \to D \to A,E$; $E \to C$ (have C); $A \to B$ (have B). $BC^+ = $ all. **{B,C}** is a key.
- $AE^+$: $A \to B$; $E \to C$; then $BC \to D$; $D \to A,E$. $AE^+ = $ all. Check minimality: $A^+ = \{A,B\}$ (not all), $E^+ = \{E,C\}$ (not all). **{A,E}** is a minimal key.
- $AC^+$: $A \to B$; $BC \to D$ (have B,C); $D \to A,E$; $E \to C$. $AC^+ = $ all. $A^+ \neq$ all, $C^+ = \{C\}$ (not all). **{A,C}** is a minimal key.

**All minimal keys: {D}, {B,C}, {A,E}, {A,C}.**

### 2c — BCNF
Non-key FDs that violate BCNF:
- $A \to B$: $A^+ = \{A,B\}$. A not a key → **violates**.
- $E \to C$: $E^+ = \{E,C\}$. E not a key → **violates**.
(BC→D, D→A, D→E: all have keys as LHS ✓)

Decompose on $A \to B$: **R1(A,B)**, **R2(A,C,D,E)**.
R1: A key ✓. BCNF.
R2(A,C,D,E): Project FDs: $D \to A$ ✓, $D \to E$ ✓, $E \to C$ ✓. Keys: $D^+ = \{D,A,E,C\}$ = all → D key.
- $E \to C$: $E^+ = \{E,C\}$, E not key → violates. Decompose: **R2a(C,E)**, **R2b(A,D,E)**.
- R2a: E→C, E key ✓. BCNF.
- R2b(A,D,E): $D \to A$, $D \to E$. D key ✓. BCNF.

**Final BCNF:** R1(A,B), R2a(C,E), R2b(A,D,E).

**Lost FD: $BC \to D$** — B is only in R1, C only in R2a, D only in R2b. The FD cannot be checked in any single relation. This loss is unavoidable because BC is a key of R (full BCNF), yet its constituent attributes end up in different relations.

*3NF via synthesis:* Creates R1(A,B), R2(B,C,D), R3(A,D,E) [merging D→A, D→E], R4(C,E). All FDs preserved, including BC→D in R2. This illustrates why 3NF is preferred when FD preservation matters.

### 3 — SQL Answers (Exam 3)

**(a) Conditions:**
```sql
SELECT DISTINCT s.name, s.major
FROM Student s
JOIN Enrollment e ON s.sid = e.sid
JOIN CourseEdition ce ON e.eid = ce.eid
WHERE s.city = 'Rotterdam' AND ce.semester = 'Fall2024';
```

**(b) Joins:**
```sql
SELECT s.name, c.title
FROM Student s
JOIN Enrollment e ON s.sid = e.sid
JOIN CourseEdition ce ON e.eid = ce.eid
JOIN Course c ON ce.cid = c.cid
WHERE e.grade = 'A';
```

**(c) Aggregations:**
```sql
SELECT c.department, COUNT(DISTINCT ce.eid) AS num_editions
FROM Course c
JOIN CourseEdition ce ON c.cid = ce.cid
WHERE ce.semester = 'Spring2025'
GROUP BY c.department
HAVING COUNT(DISTINCT ce.eid) > 2;
```

**(d) Non-Monotonic:**
```sql
SELECT DISTINCT s.name
FROM Student s
WHERE EXISTS (SELECT 1 FROM Enrollment e WHERE e.sid = s.sid)
  AND NOT EXISTS (SELECT 1 FROM Enrollment e WHERE e.sid = s.sid AND e.grade IS NOT NULL);
```
*(All enrolments exist but none has a grade yet.)*

**(e) Advanced — division (no GROUP BY):**
*Professor teaches every CS course edition — no CS edition exists that the professor does NOT teach:*
```sql
SELECT p.name
FROM Professor p
WHERE NOT EXISTS (
    SELECT 1
    FROM CourseEdition ce
    JOIN Course c ON ce.cid = c.cid
    WHERE c.department = 'Computer Science'
    AND NOT EXISTS (
        SELECT 1 FROM Teaches t
        WHERE t.pid = p.pid AND t.eid = ce.eid
    )
);
```

### 4a — Two-Phase Locking (Exam 3)
Schedule:
```
T1:  start   R(X)   W(Y)                  commit
T2:                  start   W(X)   R(Y)  commit
```

**Strict 2PL:**
- T1: acquires SL(X). T1 acquires XL(Y). T1 commits, releases SL(X) and XL(Y).
- T2: starts after T1's W(Y). T2 acquires XL(X) — T1 has released SL(X) ✓. T2 acquires SL(Y) — T1 released XL(Y) ✓. T2 commits.
✓ **Achievable** — the schedule respects lock compatibility at every step.

**Preclaiming 2PL:**
- T1 needs {SL(X), XL(Y)}; T2 needs {XL(X), SL(Y)}.
- SL(X) and XL(X): **incompatible**. T2 must wait until T1 releases SL(X).
- But T2 also needs SL(Y) and T1 holds XL(Y) until commit.
- T2 cannot start until T1 commits → no interleaving possible. **Not achievable.** T2 runs fully after T1.

---

## Quick Reference: Lock Compatibility Matrix (Multi-Granularity)

|       | IS | IX | SIX | S  | X  |
|-------|----|----|-----|----|----|
| **IS** | ✓ | ✓  | ✓   | ✓  | ✗  |
| **IX** | ✓ | ✓  | ✗   | ✗  | ✗  |
| **SIX**| ✓ | ✗  | ✗   | ✗  | ✗  |
| **S**  | ✓ | ✗  | ✗   | ✓  | ✗  |
| **X**  | ✗ | ✗  | ✗   | ✗  | ✗  |

**Rules for multi-granularity locking (top-down):**
- Before S or IS on a node → need IS on parent.
- Before X, IX, or SIX on a node → need IX on parent.
- SIX = S + IX (read whole table + intend to update some records).

---

## ANSI/SPARC Three-Level Architecture

| Level | Name | Description |
|-------|------|-------------|
| External | View level | What each user/application sees (views) |
| Conceptual | Logical level | Full logical schema; where ORMs operate |
| Internal | Physical level | How data is stored on disk (indexes, file org.) |

**Logical data independence:** changes to the conceptual schema don't require changes to external views.  
**Physical data independence:** changes to internal storage don't require changes to the conceptual schema.

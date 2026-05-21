# Practice Exam 3 — Databases
**Total: 75 points** | Domain: University Course Registration

---

## 1. Conceptual Modelling (20 pts)

### Case Description

A university wants to build a database for managing courses, enrolments, and academic staff.

- **Students** have a unique student ID, a full name, a date of birth, a major (e.g., "Computer Science"), and a city of residence.
- **Professors** have a unique professor ID, a name, and a home department (e.g., "Mathematics").
- **Departments** have a unique department code and a name. Each department has **exactly one** head professor. A professor can head at most one department.
- **Courses** have a unique course ID, a title, the number of credits, and belong to **exactly one department**. A course may have **prerequisites** (other courses that must be completed first); the order of prerequisites does not matter.
- **Course Editions** represent a specific offering of a course in a particular semester (e.g., "CS101 – Fall 2024"). Each edition has a maximum enrolment capacity and is taught by **one or more professors**. A professor can teach multiple editions.
- **Students enrol** in course editions. The enrolment records the semester and the final grade (A, B, C, D, F) once the course is complete; the grade is NULL until awarded. A student may enrol in the same course multiple times (in different editions) but not the same edition twice.
- **Classrooms** have a unique room ID, a building name, and a seating capacity. Each course edition is scheduled in **exactly one classroom**. A classroom can host multiple editions (at different times).
- **Exams** are associated with a course edition. An exam has a unique exam ID, a date, a start time, and a duration. A course edition can have multiple exams. Each exam takes place in **exactly one classroom**, which may differ from the course edition classroom.

### Task 1a — Entity Relationship Diagram [12 pts]

Provide a conceptual ER diagram using min..max cardinality notation. Include all entity sets, relationships, key attributes, and any weak entities. Mark nullable and derived attributes appropriately.

Explain the three most important design decisions and state your assumptions explicitly.

### Task 1b — Relational Model [8 pts]

Translate the ER diagram to a relational schema:

> **R**(<u>A1</u>, A2, A3 → S, ...)

- Underline primary keys; mark foreign keys with `→ S`.
- Annotate nullable attributes.
- Mention UNIQUE constraints.
- Explain which constraints from the ER diagram **cannot** be captured in the relational model.

---

## 2. Database Normalization (20 pts)

Consider relation **R(A, B, C, D, E)** and the following functional dependencies:

$$f = \{\ A \to B,\quad BC \to D,\quad D \to A,\quad D \to E,\quad E \to C\ \}$$

Show **all intermediate steps** in every sub-question.

### Task 2a — Canonical Functional Dependencies [5 pts]

Is $f$ already canonical? If not, compute the canonical set. For each step (right-hand side split, left-hand side reduction, redundancy removal), show what you are testing and why.

### Task 2b — Minimal Keys [5 pts]

Determine **all** minimal keys of R using the canonical set from 2a. Compute the attribute closure of each candidate and justify minimality. *(Hint: there are more than two.)*

### Task 2c — Boyce-Codd Normal Form [5 pts]

Decompose R into BCNF. Show each decomposition step. Identify which FDs (if any) are **lost** and explain why this is unavoidable for this particular set of FDs.

### Task 2d — Anomalies [5 pts]

Consider the following instance of the original relation R(A, B, C, D, E):

| A  | B  | C  | D  | E  |
|----|----|----|----|----|
| a1 | b1 | c1 | d1 | e1 |
| a2 | b2 | c1 | d1 | e1 |
| a3 | b1 | c2 | d2 | e2 |
| a3 | b1 | c2 | d2 | e2 |

(i) Identify and describe a concrete **update anomaly**.  
(ii) What information **cannot be inserted** without introducing a spurious tuple? (Insertion anomaly.)  
(iii) What information is **unintentionally lost** if the last row referencing D = d2 is deleted? (Deletion anomaly.)  
(iv) Explain what **3NF synthesis** guarantees that BCNF decomposition does not.

---

## 3. SQL (20 pts)

Consider the following schema for a university course registration system:

```
Student(sid, name, major, city)
Professor(pid, name, department)
Course(cid, title, department, credits)
CourseEdition(eid, cid → Course, semester, capacity)
Enrollment(sid → Student, eid → CourseEdition, grade)
Teaches(pid → Professor, eid → CourseEdition)
Classroom(rid, building, capacity)
Exam(xid, eid → CourseEdition, rid → Classroom, exam_date, duration_min)
```

Primary keys: `sid`, `pid`, `cid`, `eid`, `(sid, eid)`, `(pid, eid)`, `rid`, `xid`.  
`grade` is nullable (NULL until awarded).

For sub-questions (d) and (e): **avoid GROUP BY; use existential quantification instead.**

### Task 3a — Conditions [4 pts]

Write an SQL query that finds the **name and major** of all students living in `'Rotterdam'` who are enrolled in at least one course edition in semester `'Fall2024'`.

### Task 3b — Joins [4 pts]

Write an SQL query that returns the **student name** and **course title** for every enrolment where the student received a grade of `'A'`.

### Task 3c — Aggregations [4 pts]

Write an SQL query that, for each department, returns the **department name** and the **number of distinct course editions** offered in semester `'Spring2025'`. Show only departments with **more than 2 editions** in that semester.

### Task 3d — Non-Monotonic [4 pts]

Write an SQL query that finds the **names of students** who are enrolled in **at least one course edition** but have **no grade yet** (grade IS NULL) for **any** of their enrolments. Do **not** use GROUP BY.

### Task 3e — Advanced [4 pts]

Write an SQL query that finds the **names of professors** who teach **every course edition** in the `'Computer Science'` department (i.e., for every CS course edition, the professor teaches it). Do **not** use GROUP BY.

---

## 4. Transactions (10 pts)

### Task 4a — Two-Phase Locking [5 pts]

Consider the following schedule:

```
T1:  start   R(X)   W(Y)                  commit
T2:                  start   W(X)   R(Y)  commit
```

(i) Can this schedule be produced by **strict two-phase locking**? Show the full lock/unlock sequence for T1 and T2, and verify that the schedule ordering is achievable.

(ii) Can this schedule be produced by **preclaiming (conservative) two-phase locking**? If not, describe what schedule would be produced instead and why.

### Task 4b — Multi-Granularity Locking [5 pts]

A university database has the hierarchy: **Database → Table → Record**.

Three transactions run concurrently on the `Enrollment` table:
- **T1**: Reads **all enrolment records** for a specific course edition (eid = 5) to compute the class average.
- **T2**: Updates **all enrolment records** in the entire `Enrollment` table (batch grade correction).
- **T3**: Updates a **single enrolment record** (sid = 12, eid = 5).

(i) State the lock types (IS, IX, SIX, S, X) each transaction acquires at each level (Database, Table, Record).

(ii) Are T1 and T3 **compatible** at the table level? Justify.

(iii) Are T2 and T3 **compatible** at the table level? Justify.

(iv) Suppose T1 needs to both read most records and update a few records in the same table. What lock type is most appropriate at the table level, and why is it more efficient than acquiring two separate locks?

---

## 5. Database Application Programming (5 pts)

(i) **[2 pts]** Explain the difference between **static SQL** (compiled queries embedded at build time) and **dynamic SQL** (queries assembled at runtime). What is the primary security advantage of using **prepared statements** with parameter binding over string concatenation? Name the vulnerability that string concatenation enables.

(ii) **[2 pts]** Consider an ORM (Object-Relational Mapper) such as Hibernate or the Django ORM. Explain at which level of the ANSI/SPARC three-schema architecture ORMs operate. What is the **N+1 query problem** in the context of ORMs, and how can it be avoided?

(iii) **[1 pt]** Describe the difference between a **cascading rollback** and a **recoverable schedule**. Give an example of a schedule that is recoverable but **not** cascadeless.

---

*End of Practice Exam 3*

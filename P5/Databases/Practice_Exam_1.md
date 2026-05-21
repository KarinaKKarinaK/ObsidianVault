# Practice Exam 1 — Databases
**Total: 75 points** | Domain: Hospital Management System

---

## 1. Conceptual Modelling (20 pts)

### Case Description

A hospital needs to manage its staff, patients, and medical operations. The relevant information is as follows:

- **Doctors** have a unique staff ID, a name, a specialization (e.g., cardiology, neurology), and a consulting fee.
- **Patients** have a unique patient ID, a name, a date of birth, and a contact phone number. A patient may have a city of residence.
- **Nurses** have a unique staff ID, a name, and a shift (morning, evening, or night).
- **Wards** have a unique ward ID, a ward name (e.g., "ICU", "Pediatrics"), and a maximum capacity (number of beds).
- Each ward is headed by **exactly one nurse** (the head nurse). A nurse can head at most one ward.
- Nurses are assigned to **exactly one ward**.
- **Doctors can work in multiple wards**; each ward must have at least one assigned doctor.
- A patient may be **admitted to at most one ward** at a time; the admission date is recorded.
- **Appointments** are scheduled between a patient and a doctor. Each appointment has a date, a start time, and a room number. A patient can have multiple appointments; a doctor can have multiple appointments.
- **Medications** have a unique medication ID and a name.
- A **Prescription** links a doctor, a patient, and a medication. It records the prescribed dosage and the start date of treatment. The same doctor can prescribe the same medication to different patients, and the same patient can receive multiple prescriptions from different doctors.

### Task 1a — Entity Relationship Diagram [12 pts]

Provide a conceptual database model in the form of an ER diagram. Use min..max cardinality notation (e.g., `0..*`, `1..1`). Indicate all entity sets, relationship sets, key attributes (underlined), and derived/multi-valued attributes where relevant.

Explain the three most important design choices you made and document any assumptions.

### Task 1b — Relational Model [8 pts]

Translate your ER diagram into a relational schema. Use the notation:

> **R**(<u>A1</u>, A2, A3 → S, ...)  
> where primary keys are underlined and `→ S` denotes a foreign key referencing relation S.

Additionally:
- Indicate which attributes may be NULL.
- State any UNIQUE constraints beyond the primary key.
- Explain which constraints from the ER diagram **cannot** be enforced in the relational model.

---

## 2. Database Normalization (20 pts)

Consider relation **R(A, B, C, D, E)** and the following set of functional dependencies:

$$f = \{\ A \to BC,\quad B \to D,\quad C \to E,\quad E \to B\ \}$$

Show **all intermediate steps** in every sub-question.

### Task 2a — Canonical Functional Dependencies [5 pts]

Is $f$ a canonical (minimal) set? If not, compute the canonical set. Recall: a canonical set has no redundant FDs, all right-hand sides are singletons, and no left-hand side has a redundant attribute.

### Task 2b — Minimal Keys [5 pts]

Determine **all** minimal (candidate) keys of R. Justify each key by showing its attribute closure, and justify minimality by showing no proper subset is also a key.

### Task 2c — Boyce-Codd Normal Form [5 pts]

Is R in BCNF with respect to the canonical set from 2a? If not, decompose R into BCNF relations using the decomposition algorithm. State whether any functional dependencies are **lost** in the process and identify which ones.

### Task 2d — Anomalies [5 pts]

Consider the following instance of the **original non-normalised** relation R(A, B, C, D, E):

| A  | B  | C  | D  | E  |
|----|----|----|----|----|
| a1 | b1 | c1 | d1 | e1 |
| a1 | b1 | c2 | d1 | e2 |
| a2 | b2 | c3 | d2 | e3 |
| a2 | b2 | c3 | d2 | e3 |

(i) Identify and describe a concrete **update anomaly** using the table above.  
(ii) Identify and describe a concrete **insertion anomaly** using the table above.  
(iii) Identify and describe a concrete **deletion anomaly** using the table above.  
(iv) Which normal form violation causes these anomalies? Explain briefly.

---

## 3. SQL (20 pts)

Consider the following relational schema for a hospital information system:

```
Patient(pid, name, city, dob)
Doctor(did, name, specialization)
Appointment(pid → Patient, did → Doctor, appt_date, duration_min)
Ward(wid, ward_name, capacity)
AdmittedTo(pid → Patient, wid → Ward, admission_date)
```

Primary keys are underlined where applicable; `→` denotes a foreign key. All attributes are NOT NULL unless otherwise stated. `dob` is a date; `appt_date` is a date.

For sub-questions (d) and (e): **you will only receive full marks if you avoid GROUP BY and instead use existential quantification (EXISTS / NOT EXISTS / IN / NOT IN).**

### Task 3a — Conditions [4 pts]

Write an SQL query that finds the **name and date of birth** of all patients who live in `'Amsterdam'` and were born before `'1985-01-01'`.

### Task 3b — Joins [4 pts]

Write an SQL query that finds the **name of every patient** who has had at least one appointment with a doctor whose specialization is `'Cardiology'`.

### Task 3c — Aggregations [4 pts]

Write an SQL query that, for each doctor, returns the **doctor's name** and the **number of distinct patients** they have seen. Include only doctors who have seen **more than 3 distinct patients**.

### Task 3d — Non-Monotonic [4 pts]

Write an SQL query that finds the **pid of every patient** who has appointments with **only one distinct doctor** (i.e., all their appointments are with the same doctor). Do **not** use GROUP BY.

### Task 3e — Advanced [4 pts]

Write an SQL query that finds the **names of doctors** who have appointments with **every patient admitted to ward 'ICU'**. That is, for each doctor, every current ICU patient has at least one appointment with that doctor. Do **not** use GROUP BY.

---

## 4. Transactions (10 pts)

### Task 4a — Two-Phase Locking [5 pts]

Consider the following schedule, where `start` and `commit` mark transaction boundaries:

```
T1:  start   R(X)          W(Y)          commit
T2:          start   R(X)        W(Y)    commit
```

(i) Can this schedule be produced by **strict two-phase locking**? Motivate your answer by describing the lock/unlock sequence for each transaction and showing that no locking rule is violated.

(ii) Can this schedule be produced by **preclaiming (conservative) two-phase locking**? Motivate your answer. If not, explain what schedule preclaiming would produce instead.

### Task 4b — Multi-Granularity Locking [5 pts]

A hospital database has the following hierarchy: **Database → Table → Record**.

Three transactions run concurrently:
- **T1**: Bulk-updates **all records** in the `Appointment` table (e.g., adding 10 minutes to every duration).
- **T2**: Reads a **single record** in `Appointment` (appt\_id = 42).
- **T3**: Reads **all appointments** for a specific patient (pid = 7).

(i) For each transaction, list the **lock type** (IS, IX, SIX, S, X) acquired at each level of the hierarchy (Database, Table, Record), following multi-granularity locking rules.

(ii) Determine whether T1 and T2 are **compatible** (can run simultaneously). Justify using the compatibility matrix.

(iii) Determine whether T2 and T3 are **compatible**. Justify.

(iv) Briefly explain why **intention locks** are essential for efficiency in multi-granularity locking — what problem do they solve?

---

## 5. Database Application Programming (5 pts)

(i) **[2 pts]** A junior developer writes the following Python snippet to look up a patient record:

```python
query = "SELECT * FROM Patient WHERE name = '" + user_input + "'"
cursor.execute(query)
```

Explain the **security vulnerability** this code introduces. Give a concrete example of a malicious `user_input` value and explain what it would do. How should the developer fix this?

(ii) **[2 pts]** The ANSI/SPARC architecture identifies **three levels** of database modeling. Name each level and briefly describe its purpose. At which level do Object-Relational Mappers (ORMs) such as Hibernate or SQLAlchemy operate? What is the main function of that level?

(iii) **[1 pt]** What is the difference between a **recoverable schedule** and a **cascadeless schedule**? Which is the stronger condition?

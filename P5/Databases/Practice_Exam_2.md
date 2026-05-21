# Practice Exam 2 — Databases
**Total: 75 points** | Domain: Music Streaming Platform

---

## 1. Conceptual Modelling (20 pts)

### Case Description

A music streaming company wants to build a database to manage users, content, and listening activity.

- **Users** have a unique user ID, a username, an email address, a city of residence, and an age.
- **Artists** have a unique artist ID, a stage name, and a primary genre (e.g., "Rock", "Jazz", "Pop").
- **Albums** have a unique album ID, a title, and a release year. Each album is released by **exactly one artist**. An artist can release many albums.
- **Songs** have a unique song ID, a title, and a duration (in seconds). Each song belongs to **exactly one album**. An album has at least one song. Songs have an ordering within an album (track number).
- **Playlists** have a unique playlist ID and a name. A playlist is created by **exactly one user**. A user can have many playlists. A playlist contains **zero or more songs**; the same song can appear in multiple playlists. The **order** of songs within a playlist matters.
- A **Listen event** records that a user listened to a specific song on a specific date and time. The same user can listen to the same song multiple times (each is a separate event). The **listen count** is therefore derivable.
- Users can **follow** artists. We store when they started following (a follow date). A user can follow many artists; an artist can be followed by many users.
- Users can **rate** a song with a score from 1 to 5. A user can rate a song at most once.

### Task 1a — Entity Relationship Diagram [12 pts]

Provide a conceptual database model in the form of an ER diagram. Use min..max cardinality notation (e.g., `0..*`, `1..1`). Indicate all entity sets, relationship sets, key attributes (underlined), and any weak entities or derived attributes.

Explain the three most important design choices and document any assumptions.

### Task 1b — Relational Model [8 pts]

Translate your ER diagram into a relational schema using the notation:

> **R**(<u>A1</u>, A2, A3 → S, ...)

- Underline primary keys; use `→ S` for foreign keys referencing relation S.
- Indicate which attributes are nullable.
- State any UNIQUE constraints.
- Explain which ER constraints **cannot** be expressed in the relational model.

---

## 2. Database Normalization (20 pts)

Consider relation **R(A, B, C, D, E)** and the following set of functional dependencies:

$$f = \{\ A \to BD,\quad B \to C,\quad D \to E,\quad E \to D,\quad AB \to C\ \}$$

Show **all intermediate steps** in every sub-question.

### Task 2a — Canonical Functional Dependencies [5 pts]

Compute the canonical (minimal) set of $f$. Recall: eliminate redundant FDs (one at a time), simplify right-hand sides to singletons, and remove redundant attributes from left-hand sides.

### Task 2b — Minimal Keys [5 pts]

Determine **all** minimal (candidate) keys of R using the canonical set from 2a. Show attribute closures and justify minimality.

### Task 2c — Boyce-Codd Normal Form [5 pts]

Decompose R into BCNF using the canonical set from 2a. Apply the decomposition algorithm step by step. State whether any FDs are **lost** and identify which ones.

### Task 2d — Anomalies [5 pts]

Consider this instance of the **original relation** R(A, B, C, D, E):

| A  | B  | C  | D  | E  |
|----|----|----|----|----|
| a1 | b1 | c1 | d1 | e1 |
| a1 | b1 | c1 | d2 | e2 |
| a2 | b2 | c2 | d1 | e1 |
| a3 | b2 | c2 | d3 | e3 |

(i) Identify a concrete **update anomaly** in this table.  
(ii) Identify a concrete **insertion anomaly**: what information cannot be recorded without causing a problem?  
(iii) Identify a concrete **deletion anomaly**: what information is unintentionally lost if a row is deleted?  
(iv) Explain why decomposing R into 3NF eliminates these anomalies.

---

## 3. SQL (20 pts)

Consider the following schema for a music streaming platform:

```
User(uid, username, city, age)
Artist(aid, name, genre)
Song(sid, title, duration, aid → Artist)
Playlist(plid, uid → User, playlist_name)
PlaylistSong(plid → Playlist, sid → Song)
Listens(uid → User, sid → Song, listen_date)
Follows(uid → User, aid → Artist, follow_date)
Rating(uid → User, sid → Song, score)
```

Primary keys: `uid`, `aid`, `sid`, `plid`, `(plid, sid)`, `(uid, sid, listen_date)`, `(uid, aid)`, `(uid, sid)`.

For sub-questions (d) and (e): **avoid GROUP BY; use existential quantification instead.**

### Task 3a — Conditions [4 pts]

Write an SQL query that returns the **username and age** of all users who are older than 25 and live in `'Amsterdam'`.

### Task 3b — Joins [4 pts]

Write an SQL query that finds the **title of every song** that appears in at least one playlist created by the user with username `'alice'`.

### Task 3c — Aggregations [4 pts]

Write an SQL query that returns each **artist's name** and the **total number of times** their songs have been listened to (across all songs by that artist). Show only artists whose songs have been listened to **more than 50 times** in total.

### Task 3d — Non-Monotonic [4 pts]

Write an SQL query that finds the **username of every user** who has listened to **at least one song** but has **never rated any song**. Do **not** use GROUP BY.

### Task 3e — Advanced [4 pts]

Write an SQL query that finds the **usernames of users** who follow **every artist** in the genre `'Jazz'`. That is, return users for whom there is no Jazz artist they do not follow. Do **not** use GROUP BY.

---

## 4. Transactions (10 pts)

### Task 4a — Two-Phase Locking [5 pts]

Consider the following schedule:

```
T1:  start   W(A)                    R(B)   commit
T2:          start   R(A)   W(B)            commit
T3:  start   R(B)                           commit
```

(i) Can this schedule be produced by **strict two-phase locking**? Show the lock/unlock sequence for each transaction and check all rules.

(ii) Can this schedule be produced by **preclaiming two-phase locking**? Motivate your answer. If not, what schedule would result?

### Task 4b — Multi-Granularity Locking [5 pts]

Consider a music database with the hierarchy: **Database → Table → Record**.

Three transactions run concurrently:
- **T1**: Reads the **entire** `Song` table (to compute aggregate statistics).
- **T2**: Updates a **single record** in `Song` (changes the duration of song sid=17).
- **T3**: Updates **all songs** by a specific artist (bulk update of 40 records in `Song`).

(i) For each transaction, state the lock type (IS, IX, SIX, S, X) acquired at each hierarchy level (Database, Table, Record).

(ii) Are T1 and T2 **compatible**? Show using the compatibility matrix.

(iii) Are T1 and T3 **compatible**? Show using the compatibility matrix.

(iv) What is the advantage of a **SIX lock**? When would T3 use it instead of a plain X lock on the table?

---

## 5. Database Application Programming (5 pts)

(i) **[2 pts]** A developer builds a login query in Java as follows:

```java
String query = "SELECT * FROM User WHERE username = '" + username
             + "' AND password = '" + password + "'";
stmt.execute(query);
```

Describe the **SQL injection** attack this enables. Give a concrete value for `username` or `password` that bypasses authentication. Explain the correct fix.

(ii) **[2 pts]** The ANSI/SPARC three-schema architecture separates three levels of database description. Name all three levels and their purpose. At which level is **data independence** between the physical storage and the application achieved, and how?

(iii) **[1 pt]** What is **optimistic concurrency control**? Describe the three phases (read, validate, write) and explain when a transaction is aborted in the validate phase.

---

*End of Practice Exam 2*

/* MCQ practice bank — 16 quizzes × 10-12 single-choice questions × 4 options.
 * First 6 quizzes are topic-focused; quizzes 7-16 mix all course topics.
 * Each question has exactly one correct option (answer.value is the option index, 0-based).
 * Mirrors the MCQ section of the final exam.
 */
window.__MCQ_BANK = {
  "quizzes": [
    /* ============================================================ */
    {
      "id": "mcq-modelling",
      "name": "Conceptual Modelling (ER)",
      "tagline": "Entities, weak entities, ISA, cardinalities, aggregation, ER→relational.",
      "icon": "🗂",
      "questions": [
        {
          "id": "mcq-mod-01",
          "subtopic": "Cardinalities",
          "prompt": "A school owns many classrooms; every classroom belongs to exactly one school. Using min..max notation on the Classroom side of the relationship 'school owns classroom', which is correct?",
          "options": ["0..1", "1..1", "0..*", "1..*"],
          "answer": { "value": 1 },
          "explanation": "Every classroom belongs to exactly one school: min=1, max=1, so the Classroom side is 1..1."
        },
        {
          "id": "mcq-mod-02",
          "subtopic": "Weak entities",
          "prompt": "A 'Floor' has a number (1, 2, 3…) that is only unique within its 'Building'. How is Floor best modelled?",
          "options": [
            "A strong entity with the floor number as primary key",
            "A multivalued attribute 'floors' on Building",
            "A weak entity whose discriminator is the floor number and whose identifying entity is Building",
            "An ISA subclass of Building"
          ],
          "answer": { "value": 2 },
          "explanation": "An entity that has no global key but is identified by a discriminator together with an owner entity is a weak entity; the owner participates through an identifying relationship."
        },
        {
          "id": "mcq-mod-03",
          "subtopic": "Generalisation / ISA",
          "prompt": "Every Employee is either a Manager or an Engineer; no employee is both, but every employee belongs to exactly one of the two. Which ISA constraints apply?",
          "options": [
            "Partial, overlapping",
            "Partial, disjoint",
            "Total, overlapping",
            "Total, disjoint"
          ],
          "answer": { "value": 3 },
          "explanation": "'Every employee belongs to one' → total (covering); 'no employee is both' → disjoint."
        },
        {
          "id": "mcq-mod-04",
          "subtopic": "Attributes",
          "prompt": "The 'age' of a person can always be computed from the stored 'date of birth'. How should 'age' be modelled in an ER diagram?",
          "options": [
            "As a normal (stored) attribute of Person",
            "As a derived attribute of Person (dashed ellipse)",
            "As a multivalued attribute of Person",
            "As a separate entity Age"
          ],
          "answer": { "value": 1 },
          "explanation": "An attribute whose value is computable from other stored attributes is a derived attribute, drawn as a dashed ellipse."
        },
        {
          "id": "mcq-mod-05",
          "subtopic": "Aggregation",
          "prompt": "You need to record which Employee evaluated which (Project, Manager) supervision pair. The evaluation refers to a relationship, not to plain entities. Which construct fits best?",
          "options": [
            "A ternary relationship Evaluates among Employee, Project, Manager",
            "Aggregation: treat the Project–Manager relationship as a higher-level entity and connect Evaluates to it",
            "Generalisation of Project and Manager into a superclass",
            "A weak entity Evaluation owned by Project"
          ],
          "answer": { "value": 1 },
          "explanation": "When a relationship itself participates in another relationship, ER uses aggregation: the inner relationship is treated as a virtual entity that the outer relationship can connect to."
        },
        {
          "id": "mcq-mod-06",
          "subtopic": "N-ary relationships",
          "prompt": "A pharmacist dispenses a drug to a patient on the prescription of a specific doctor — the doctor depends on the (pharmacist, drug, patient) combination. Which design captures this most precisely?",
          "options": [
            "Three independent binary relationships Dispenses, Treats, Prescribes",
            "A ternary relationship Dispenses among Pharmacist, Drug, Patient plus a separate binary Prescribes",
            "A 4-ary relationship Dispenses among Pharmacist, Drug, Patient, Doctor",
            "A weak entity Dispense owned by Drug"
          ],
          "answer": { "value": 2 },
          "explanation": "The doctor is determined by the triple (pharmacist, drug, patient), so all four must participate in the same relationship — a 4-ary relationship."
        },
        {
          "id": "mcq-mod-07",
          "subtopic": "ER → relational",
          "prompt": "Translating an M:N relationship 'Student takes Course' (without attributes) into the relational model gives:",
          "options": [
            "One table Student with a multivalued column 'courses'",
            "A new relation Takes(student_id, course_id) with both columns forming the primary key, each a foreign key",
            "A new column course_id added to Student",
            "A new column student_id added to Course"
          ],
          "answer": { "value": 1 },
          "explanation": "An M:N relationship always becomes its own relation whose key is the union of both entity keys; each is a foreign key to the respective entity table."
        },
        {
          "id": "mcq-mod-08",
          "subtopic": "ER → relational",
          "prompt": "A 1:1 relationship 'Country has Capital City' with mandatory participation on the Country side is best translated by:",
          "options": [
            "Creating a separate relation HasCapital(country_id, city_id)",
            "Adding capital_id as a foreign key to Country, declared NOT NULL and UNIQUE",
            "Merging Country and City into a single relation",
            "Adding country_id to City, allowing NULL"
          ],
          "answer": { "value": 1 },
          "explanation": "Mandatory 1:1 is best expressed by inlining the foreign key on the mandatory side with NOT NULL (min=1) and UNIQUE (max=1 on the other side)."
        },
        {
          "id": "mcq-mod-09",
          "subtopic": "Multivalued attributes",
          "prompt": "An Employee can have several 'phone' numbers. When translating this multivalued attribute to the relational model, you:",
          "options": [
            "Add multiple columns phone1, phone2, phone3 to Employee",
            "Store all phones in one text column separated by commas",
            "Create a new relation Phone(employee_id, phone) with both columns as the primary key",
            "Drop the phone attribute — multivalued attributes cannot be stored relationally"
          ],
          "answer": { "value": 2 },
          "explanation": "Multivalued attributes become their own relation with a composite key linking back to the owning entity; this preserves 1NF."
        },
        {
          "id": "mcq-mod-10",
          "subtopic": "Identifying relationships",
          "prompt": "In an ER diagram, an identifying relationship is drawn as:",
          "options": [
            "A single line between two strong entities",
            "A double diamond (double border) connecting a weak entity to its owner, with double lines on the weak-entity side",
            "A dashed line with an arrow",
            "A triangle with the label 'ISA'"
          ],
          "answer": { "value": 1 },
          "explanation": "An identifying relationship that ties a weak entity to its owner is rendered with a doubled diamond and a doubled connection on the weak entity side."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-sql",
      "name": "SQL Querying",
      "tagline": "Joins, NULLs, aggregates, GROUP BY/HAVING, subqueries, set operators.",
      "icon": "🧮",
      "questions": [
        {
          "id": "mcq-sql-01",
          "subtopic": "Joins",
          "prompt": "Which join keeps every row of the left table even if there is no match in the right table?",
          "options": ["INNER JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "CROSS JOIN"],
          "answer": { "value": 1 },
          "explanation": "A LEFT OUTER JOIN preserves all rows from the left table; columns from the right table are filled with NULL when there is no matching row."
        },
        {
          "id": "mcq-sql-02",
          "subtopic": "NULL handling",
          "prompt": "How many rows does the predicate `WHERE phone = NULL` match in a normal SQL semantics?",
          "options": [
            "All rows whose phone is NULL",
            "Zero rows — comparison with NULL is UNKNOWN, never TRUE",
            "All rows whose phone is empty string",
            "A runtime error is raised"
          ],
          "answer": { "value": 1 },
          "explanation": "Any comparison with NULL using = yields UNKNOWN, which WHERE treats as not-true. You must write `phone IS NULL`."
        },
        {
          "id": "mcq-sql-03",
          "subtopic": "Aggregates",
          "prompt": "Which statement about COUNT is correct?",
          "options": [
            "COUNT(*) and COUNT(col) always return the same value",
            "COUNT(col) counts only rows where col IS NOT NULL; COUNT(*) counts every row",
            "COUNT(*) ignores NULLs",
            "COUNT(DISTINCT col) counts NULLs as one distinct value"
          ],
          "answer": { "value": 1 },
          "explanation": "COUNT(*) counts every row regardless of NULLs; COUNT(col) and COUNT(DISTINCT col) both ignore NULL values."
        },
        {
          "id": "mcq-sql-04",
          "subtopic": "GROUP BY / HAVING",
          "prompt": "What is the correct difference between WHERE and HAVING?",
          "options": [
            "WHERE filters groups after aggregation; HAVING filters rows before aggregation",
            "WHERE filters rows before grouping; HAVING filters groups after aggregation",
            "WHERE works only on numeric columns; HAVING works on text",
            "They are interchangeable in standard SQL"
          ],
          "answer": { "value": 1 },
          "explanation": "WHERE applies row-level filters before GROUP BY; HAVING applies filters on already-aggregated groups."
        },
        {
          "id": "mcq-sql-05",
          "subtopic": "GROUP BY rules",
          "prompt": "Given `SELECT department, MAX(salary) FROM Employee GROUP BY department;`, which extra column may safely appear in the SELECT clause without changing GROUP BY?",
          "options": [
            "employee_name",
            "salary",
            "COUNT(*)",
            "hiring_date"
          ],
          "answer": { "value": 2 },
          "explanation": "Only the grouping columns and aggregate expressions may appear in the SELECT list. COUNT(*) is an aggregate; the other columns are neither grouped nor aggregated."
        },
        {
          "id": "mcq-sql-06",
          "subtopic": "Anti-joins",
          "prompt": "Which query correctly returns the customers who have placed no orders?",
          "options": [
            "SELECT * FROM Customer c JOIN Orders o ON c.id = o.customer_id WHERE o.id IS NULL",
            "SELECT * FROM Customer c LEFT JOIN Orders o ON c.id = o.customer_id WHERE o.id IS NULL",
            "SELECT * FROM Customer WHERE id NOT IN (SELECT customer_id FROM Orders)  -- and customer_id never IS NULL",
            "Both B and C are correct"
          ],
          "answer": { "value": 3 },
          "explanation": "An anti-join can be expressed as LEFT JOIN with IS NULL on the right side, or as a NOT IN / NOT EXISTS subquery — both work when the right-side key cannot be NULL."
        },
        {
          "id": "mcq-sql-07",
          "subtopic": "Division",
          "prompt": "You want students who have taken ALL of the courses required by a given study program. Which technique implements this 'relational division'?",
          "options": [
            "A single INNER JOIN of Student and Required",
            "A double-negated NOT EXISTS: 'there is no required course that the student has NOT taken'",
            "GROUP BY student HAVING COUNT(*) > 0",
            "UNION of Student and Required"
          ],
          "answer": { "value": 1 },
          "explanation": "Division is typically expressed in SQL with two nested NOT EXISTS quantifiers: for every required course, there exists no missing enrolment for that student."
        },
        {
          "id": "mcq-sql-08",
          "subtopic": "Set operators",
          "prompt": "What is the difference between UNION and UNION ALL?",
          "options": [
            "UNION ALL removes duplicates; UNION keeps them",
            "UNION removes duplicate rows; UNION ALL keeps every row (including duplicates)",
            "UNION is for tables with different schemas; UNION ALL needs identical schemas",
            "There is no difference"
          ],
          "answer": { "value": 1 },
          "explanation": "UNION performs an implicit DISTINCT; UNION ALL is faster because it does not remove duplicates."
        },
        {
          "id": "mcq-sql-09",
          "subtopic": "NULL traps (NOT IN vs NOT EXISTS)",
          "prompt": "You write `SELECT * FROM Parts WHERE pid NOT IN (SELECT pid FROM Catalog);`. The Catalog happens to contain one row whose pid IS NULL. What does the outer query return?",
          "options": [
            "All Parts that have no matching row in Catalog — the NULL is silently ignored",
            "Zero rows: NOT IN expands to a chain of `pid <> x` comparisons; any comparison with NULL is UNKNOWN, so WHERE filters every row out",
            "A runtime error, because NULL is not comparable",
            "Exactly the same rows as `NOT EXISTS (SELECT 1 FROM Catalog c WHERE c.pid = Parts.pid)`"
          ],
          "answer": { "value": 1 },
          "explanation": "`x NOT IN (..., NULL, ...)` is equivalent to `x <> a AND x <> b AND ... AND x <> NULL`. The last conjunct is UNKNOWN, which collapses the whole predicate to UNKNOWN — WHERE then drops the row. This is exactly why the exam prefers NOT EXISTS for anti-joins."
        },
        {
          "id": "mcq-sql-10",
          "subtopic": "Logical evaluation order",
          "prompt": "In which logical order does SQL evaluate the clauses of a query?",
          "options": [
            "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
            "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
            "FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY",
            "WHERE → FROM → GROUP BY → SELECT → HAVING → ORDER BY"
          ],
          "answer": { "value": 1 },
          "explanation": "Logical order: FROM (build the working table), WHERE (filter rows), GROUP BY, HAVING (filter groups), SELECT (compute output), ORDER BY (sort)."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-fd-keys",
      "name": "Functional Dependencies & Keys",
      "tagline": "FDs, Armstrong's axioms, closure, candidate keys, minimal cover.",
      "icon": "🔑",
      "questions": [
        {
          "id": "mcq-fd-01",
          "subtopic": "Definition",
          "prompt": "Which sentence correctly defines the functional dependency X → Y on relation R?",
          "options": [
            "For every value of Y in R there is exactly one matching value of X",
            "For any two tuples of R that agree on X, they also agree on Y",
            "Y can be computed by some SQL formula from X",
            "X and Y together form a candidate key of R"
          ],
          "answer": { "value": 1 },
          "explanation": "FD X → Y means: whenever two tuples of R have the same X-value, they must have the same Y-value."
        },
        {
          "id": "mcq-fd-02",
          "subtopic": "Trivial FDs",
          "prompt": "Which FD is trivial?",
          "options": [
            "A → B",
            "AB → A",
            "A → AB",
            "B → A"
          ],
          "answer": { "value": 1 },
          "explanation": "An FD X → Y is trivial when Y ⊆ X. Here {A} ⊆ {A,B}, so AB → A is trivial and always holds."
        },
        {
          "id": "mcq-fd-03",
          "subtopic": "Armstrong's axioms",
          "prompt": "Which of the following is NOT one of Armstrong's three sound and complete axioms?",
          "options": ["Reflexivity", "Augmentation", "Decomposition", "Transitivity"],
          "answer": { "value": 2 },
          "explanation": "Armstrong's axioms are Reflexivity, Augmentation, and Transitivity. Decomposition is a useful but derived rule."
        },
        {
          "id": "mcq-fd-04",
          "subtopic": "Attribute closure",
          "prompt": "Let R(A,B,C,D) with F = { A → B, B → C, C → D }. What is {A}⁺ under F?",
          "options": ["{A}", "{A,B}", "{A,B,C}", "{A,B,C,D}"],
          "answer": { "value": 3 },
          "explanation": "Starting from A: A→B adds B; B→C adds C; C→D adds D. Closure is {A,B,C,D}, so A is a (super)key."
        },
        {
          "id": "mcq-fd-05",
          "subtopic": "Candidate keys",
          "prompt": "A candidate key of a relation is:",
          "options": [
            "Any set of attributes whose closure is the full attribute set",
            "A minimal set of attributes whose closure is the full attribute set",
            "The first column in the schema",
            "A foreign key from another relation"
          ],
          "answer": { "value": 1 },
          "explanation": "A candidate key is a minimal superkey: it uniquely identifies tuples and no proper subset does."
        },
        {
          "id": "mcq-fd-06",
          "subtopic": "Super vs candidate keys",
          "prompt": "Which statement is true?",
          "options": [
            "Every superkey is a candidate key",
            "Every candidate key is a superkey",
            "A relation has at most one superkey",
            "Candidate keys cannot be composite"
          ],
          "answer": { "value": 1 },
          "explanation": "Candidate keys are by definition minimal superkeys, so they are a special case of superkeys. The converse does not hold."
        },
        {
          "id": "mcq-fd-07",
          "subtopic": "Prime attributes",
          "prompt": "An attribute is called 'prime' if it…",
          "options": [
            "Is the first declared column",
            "Appears in at least one candidate key",
            "Has no functional dependencies on the left side",
            "Is declared NOT NULL"
          ],
          "answer": { "value": 1 },
          "explanation": "Prime attributes are those that participate in some candidate key; non-prime attributes appear in none."
        },
        {
          "id": "mcq-fd-08",
          "subtopic": "Minimal cover",
          "prompt": "A minimal (canonical) cover of an FD set F requires that…",
          "options": [
            "Every right-hand side is a single attribute, there are no redundant attributes on the left, and no FD is redundant",
            "Every left-hand side is a single attribute",
            "The cover contains as many FDs as possible",
            "Each FD has the same number of attributes on each side"
          ],
          "answer": { "value": 0 },
          "explanation": "A minimal cover has (1) singleton RHS, (2) no extraneous LHS attributes, and (3) no redundant FD — while being equivalent to F."
        },
        {
          "id": "mcq-fd-09",
          "subtopic": "Counting keys",
          "prompt": "Given R(A,B,C) with F = { AB → C, C → A }, how many candidate keys does R have?",
          "options": ["1: {A,B}", "1: {B,C}", "2: {A,B} and {B,C}", "3: {A}, {B}, {C}"],
          "answer": { "value": 2 },
          "explanation": "{A,B}⁺ = {A,B,C} and {B,C}⁺ = {B,C,A} = full set; neither attribute alone determines all others, and both are minimal. Two candidate keys."
        },
        {
          "id": "mcq-fd-10",
          "subtopic": "Decomposition & FDs",
          "prompt": "A decomposition of R into R1 and R2 is called 'dependency-preserving' if…",
          "options": [
            "Joining R1 and R2 always reconstructs R losslessly",
            "The union of FDs that can be checked locally on R1 and R2 (without joining) is equivalent to the original F",
            "Every attribute of R appears in at least one of R1, R2",
            "R1 and R2 share at least one attribute"
          ],
          "answer": { "value": 1 },
          "explanation": "Dependency preservation = every FD of F is either locally enforceable on one of the fragments or implied by the union of local FDs — no cross-fragment check needed."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-normal-forms",
      "name": "Normal Forms & Normalization",
      "tagline": "1NF, 2NF, 3NF, BCNF, lossless join, dependency preservation, decomposition.",
      "icon": "📐",
      "questions": [
        {
          "id": "mcq-nf-01",
          "subtopic": "1NF",
          "prompt": "Which relation violates 1NF?",
          "options": [
            "Person(id, name, dob) with one row per person",
            "Order(id, customer, items) where 'items' stores a list like '[apple, pear, milk]'",
            "Order(id, customer)",
            "Item(order_id, item_name)"
          ],
          "answer": { "value": 1 },
          "explanation": "1NF requires atomic values in every cell. A list of items in one column violates 1NF."
        },
        {
          "id": "mcq-nf-02",
          "subtopic": "2NF",
          "prompt": "A relation is in 2NF when it is in 1NF and…",
          "options": [
            "Every non-prime attribute is fully functionally dependent on every candidate key (no partial dependencies)",
            "Every non-prime attribute is non-transitively dependent on every candidate key",
            "Every determinant is a superkey",
            "Every attribute is atomic"
          ],
          "answer": { "value": 0 },
          "explanation": "2NF eliminates partial dependencies of non-prime attributes on parts of a composite candidate key."
        },
        {
          "id": "mcq-nf-03",
          "subtopic": "3NF",
          "prompt": "Which condition exactly characterises 3NF?",
          "options": [
            "Every nontrivial FD X → A satisfies that X is a superkey",
            "For every nontrivial FD X → A, X is a superkey OR A is a prime attribute",
            "There are no nontrivial FDs at all",
            "Every attribute is a key"
          ],
          "answer": { "value": 1 },
          "explanation": "3NF allows X → A with A prime even if X is not a superkey; this is the relaxation that makes 3NF dependency-preserving."
        },
        {
          "id": "mcq-nf-04",
          "subtopic": "BCNF",
          "prompt": "Which condition exactly characterises BCNF?",
          "options": [
            "Every nontrivial FD X → A satisfies that X is a superkey",
            "For every nontrivial FD X → A, X is a superkey OR A is prime",
            "There are no transitive dependencies, but partial ones are allowed",
            "The relation has at most one candidate key"
          ],
          "answer": { "value": 0 },
          "explanation": "BCNF demands that the left-hand side of every nontrivial FD is a superkey — strictly stronger than 3NF."
        },
        {
          "id": "mcq-nf-05",
          "subtopic": "BCNF vs 3NF",
          "prompt": "Which statement is correct?",
          "options": [
            "Every relation in 3NF is automatically in BCNF",
            "Every relation in BCNF is automatically in 3NF",
            "BCNF and 3NF are equivalent",
            "Neither implies the other"
          ],
          "answer": { "value": 1 },
          "explanation": "BCNF strictly implies 3NF; the converse is not true (3NF may keep a non-superkey determinant for a prime attribute)."
        },
        {
          "id": "mcq-nf-06",
          "subtopic": "Decomposition properties",
          "prompt": "The two desirable properties of a relational schema decomposition are:",
          "options": [
            "Lossless join and dependency preservation",
            "1NF and 2NF",
            "Atomicity and durability",
            "Foreign keys and primary keys"
          ],
          "answer": { "value": 0 },
          "explanation": "When we split a relation, we want a lossless join (no spurious tuples) and ideally dependency preservation (all FDs locally enforceable)."
        },
        {
          "id": "mcq-nf-07",
          "subtopic": "Lossless join test",
          "prompt": "A binary decomposition of R into R1 and R2 is guaranteed lossless if the common attributes R1 ∩ R2:",
          "options": [
            "Form a superkey of R1 or of R2",
            "Are empty",
            "Contain exactly one attribute that is in F",
            "Appear in some FD"
          ],
          "answer": { "value": 0 },
          "explanation": "A binary decomposition is lossless iff the common attributes functionally determine all attributes of at least one side — i.e. form a superkey of R1 or R2."
        },
        {
          "id": "mcq-nf-08",
          "subtopic": "Algorithms",
          "prompt": "Which algorithm always yields a decomposition that is both lossless and dependency-preserving (but may stop at 3NF, not BCNF)?",
          "options": [
            "BCNF decomposition (analysis algorithm)",
            "3NF synthesis algorithm (based on a minimal cover)",
            "Boyce-Codd reduction by candidate keys",
            "Greedy attribute promotion"
          ],
          "answer": { "value": 1 },
          "explanation": "The 3NF synthesis algorithm produces a dependency-preserving and lossless decomposition in 3NF; BCNF decomposition may sacrifice dependency preservation."
        },
        {
          "id": "mcq-nf-09",
          "subtopic": "Classifying a relation",
          "prompt": "Consider R(A, B, C) with F = { A → B, B → C } and only candidate key {A}. In which normal forms is R?",
          "options": [
            "Not even 1NF",
            "1NF and 2NF, but not 3NF (transitive dependency A → B → C)",
            "Up to 3NF, but not BCNF",
            "BCNF"
          ],
          "answer": { "value": 1 },
          "explanation": "Because B → C with B not a superkey and C non-prime, A → B → C is a transitive dependency. R is in 2NF (no partial deps on single-attr key) but violates 3NF and BCNF."
        },
        {
          "id": "mcq-nf-10",
          "subtopic": "Anomalies",
          "prompt": "Update, insertion, and deletion anomalies in an unnormalised schema are typically caused by:",
          "options": [
            "Use of foreign keys",
            "Redundancy: the same fact stored in multiple rows due to a non-key determinant",
            "Indexes",
            "Use of NULL values"
          ],
          "answer": { "value": 1 },
          "explanation": "Anomalies arise from redundancy. Normalisation eliminates non-key determinants by moving them into their own relation, so each fact is stored once."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-transactions",
      "name": "Transactions, Schedules & Locking",
      "tagline": "ACID, conflicts, serializability, 2PL, recoverability, cascading rollbacks.",
      "icon": "🔁",
      "questions": [
        {
          "id": "mcq-tx-01",
          "subtopic": "ACID",
          "prompt": "In ACID, the 'I' (Isolation) guarantees that…",
          "options": [
            "All operations of a transaction succeed or none do",
            "Committed changes survive system failure",
            "Concurrently running transactions appear to execute as if they ran one after another",
            "The database remains in a state that satisfies all integrity constraints"
          ],
          "answer": { "value": 2 },
          "explanation": "Isolation = concurrent transactions do not see each other's intermediate state; the result is equivalent to some serial schedule."
        },
        {
          "id": "mcq-tx-02",
          "subtopic": "Conflicts",
          "prompt": "Two operations from different transactions on the same data item are in conflict if…",
          "options": [
            "Both are reads",
            "At least one of them is a write",
            "They run on different objects",
            "Both belong to the same transaction"
          ],
          "answer": { "value": 1 },
          "explanation": "RR is non-conflicting; RW, WR and WW conflict because swapping them can change the outcome."
        },
        {
          "id": "mcq-tx-03",
          "subtopic": "Isolation levels",
          "prompt": "Under the SQL isolation level READ COMMITTED, which anomaly is still possible?",
          "options": [
            "Dirty reads",
            "Unrepeatable reads (and phantoms)",
            "None — READ COMMITTED is equivalent to SERIALIZABLE",
            "Lost updates only, never phantoms"
          ],
          "answer": { "value": 1 },
          "explanation": "READ COMMITTED prevents dirty reads (you only see committed values) but still permits unrepeatable reads and phantoms. The ladder closes one anomaly per step: READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE."
        },
        {
          "id": "mcq-tx-04",
          "subtopic": "Conflict serializability",
          "prompt": "How do you test conflict-serializability of a schedule?",
          "options": [
            "Check that no two transactions access the same item",
            "Build the precedence (conflict) graph and verify it is acyclic",
            "Verify that locks are acquired in alphabetical order",
            "Count the number of writes and ensure it is even"
          ],
          "answer": { "value": 1 },
          "explanation": "Conflict-serializability ⇔ the precedence graph (edge T_i → T_j whenever T_i has a conflict that precedes T_j's) is acyclic."
        },
        {
          "id": "mcq-tx-05",
          "subtopic": "View vs conflict serializability",
          "prompt": "What is the relationship between conflict serializability (CSR) and view serializability (VSR)?",
          "options": [
            "Every CSR schedule is VSR, but not every VSR is CSR",
            "Every VSR schedule is CSR, but not every CSR is VSR",
            "They are exactly the same class",
            "They are disjoint"
          ],
          "answer": { "value": 0 },
          "explanation": "CSR ⊊ VSR. View serializability is strictly more permissive (it also accepts schedules with 'blind writes' that look equivalent)."
        },
        {
          "id": "mcq-tx-06",
          "subtopic": "Two-phase locking",
          "prompt": "The Two-Phase Locking protocol guarantees that…",
          "options": [
            "All schedules are serial",
            "All produced schedules are conflict-serializable",
            "There can be no deadlocks",
            "There can be no aborts"
          ],
          "answer": { "value": 1 },
          "explanation": "2PL (no lock acquired after the first release) produces only conflict-serializable schedules; it does NOT prevent deadlocks."
        },
        {
          "id": "mcq-tx-07",
          "subtopic": "Strict 2PL",
          "prompt": "Strict 2PL extends 2PL by…",
          "options": [
            "Releasing read locks immediately after reading",
            "Holding all exclusive (write) locks until the transaction commits or aborts, preventing cascading rollbacks",
            "Forbidding more than one transaction at a time",
            "Eliminating deadlocks"
          ],
          "answer": { "value": 1 },
          "explanation": "In strict 2PL, write locks are kept until commit/abort, so no other transaction reads uncommitted data ⇒ no cascading aborts."
        },
        {
          "id": "mcq-tx-08",
          "subtopic": "Cascading rollbacks",
          "prompt": "A cascading rollback can occur when…",
          "options": [
            "A transaction reads data written by another transaction that later aborts",
            "Two transactions run serially",
            "A transaction commits before reading any data",
            "Indexes are missing"
          ],
          "answer": { "value": 0 },
          "explanation": "Reading uncommitted data ('dirty read') means an abort of the writer forces aborting every transaction that read its writes — a cascading rollback."
        },
        {
          "id": "mcq-tx-09",
          "subtopic": "Deadlocks",
          "prompt": "Which of the following is NOT a typical strategy for handling deadlocks in a DBMS?",
          "options": [
            "Deadlock prevention (wait-die / wound-wait timestamps)",
            "Deadlock detection (wait-for graph) and victim selection",
            "Timeouts on lock requests",
            "Increasing the number of indexes"
          ],
          "answer": { "value": 3 },
          "explanation": "Standard strategies are prevention, detection, or timeouts. Adding indexes does not address deadlocks."
        },
        {
          "id": "mcq-tx-10",
          "subtopic": "Recoverability",
          "prompt": "A schedule is called 'recoverable' if…",
          "options": [
            "Every transaction commits in the order it started",
            "A transaction T_j only commits after every transaction T_i whose written data T_j read has already committed",
            "There are no read operations",
            "Every aborted transaction can be undone with a single UNDO record"
          ],
          "answer": { "value": 1 },
          "explanation": "Recoverability requires that if T_j depends on T_i (read T_i's writes), then T_i commits before T_j — otherwise an abort of T_i would leave a committed T_j based on lost data."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-db-api",
      "name": "Database APIs (JDBC & friends)",
      "tagline": "Connections, statements, transactions, SQL injection, ORMs, exceptions.",
      "icon": "🔌",
      "questions": [
        {
          "id": "mcq-api-01",
          "subtopic": "JDBC basics",
          "prompt": "In JDBC, the standard way to obtain a Connection object is:",
          "options": [
            "new Connection(url, user, password)",
            "DriverManager.getConnection(url, user, password)",
            "Connection.open(url)",
            "ResultSet.connect(url)"
          ],
          "answer": { "value": 1 },
          "explanation": "Connections are produced by the DriverManager (or a DataSource), not by directly instantiating Connection — the implementation is driver-specific."
        },
        {
          "id": "mcq-api-02",
          "subtopic": "Statement vs PreparedStatement",
          "prompt": "Which advantage does a PreparedStatement give over a plain Statement?",
          "options": [
            "Parameters are sent separately from the SQL text, which prevents SQL injection and lets the DBMS reuse the parsed plan",
            "It is faster only on the first execution",
            "It automatically commits each statement",
            "It returns rows as JSON instead of a ResultSet"
          ],
          "answer": { "value": 0 },
          "explanation": "PreparedStatement uses parameter placeholders (?). Parameter values are sent and bound separately, so they cannot be interpreted as SQL, and the prepared plan can be cached and reused."
        },
        {
          "id": "mcq-api-03",
          "subtopic": "ResultSet",
          "prompt": "A JDBC ResultSet object represents…",
          "options": [
            "An open transaction",
            "A forward (and optionally scrollable) cursor over the rows returned by a query",
            "A cached copy of the entire table in memory",
            "A connection pool"
          ],
          "answer": { "value": 1 },
          "explanation": "ResultSet is a cursor: rs.next() advances it; rows are typically streamed from the server, not fully materialised in client memory."
        },
        {
          "id": "mcq-api-04",
          "subtopic": "ANSI/SPARC architecture",
          "prompt": "In the ANSI/SPARC three-level architecture, which level contains per-user / per-application views of the data?",
          "options": [
            "Internal level (physical storage — files, indexes, page layout)",
            "Conceptual level (the unified logical schema — all tables, all constraints)",
            "External level (views tailored to specific users or applications)",
            "Aggregation level (above the conceptual schema)"
          ],
          "answer": { "value": 2 },
          "explanation": "ANSI/SPARC distinguishes External (top — user views) on top of Conceptual (middle — the agreed logical schema), which sits on top of Internal (bottom — bytes on disk)."
        },
        {
          "id": "mcq-api-05",
          "subtopic": "Transactions",
          "prompt": "Which sequence groups several statements into a single transaction in JDBC?",
          "options": [
            "Just call conn.commit() once at the end",
            "conn.setAutoCommit(false); /* statements */ conn.commit(); (or conn.rollback() on error)",
            "Start every statement with BEGIN;",
            "Wrap statements in a try-with-resources block — that already creates a transaction"
          ],
          "answer": { "value": 1 },
          "explanation": "To use explicit transactions, disable auto-commit, run the statements, and finish with commit() or rollback() in the catch block."
        },
        {
          "id": "mcq-api-06",
          "subtopic": "SQL injection",
          "prompt": "Which Java snippet is vulnerable to SQL injection?",
          "options": [
            "stmt = conn.prepareStatement(\"SELECT * FROM Users WHERE name = ?\"); stmt.setString(1, name);",
            "stmt = conn.createStatement(); rs = stmt.executeQuery(\"SELECT * FROM Users WHERE name = '\" + name + \"'\");",
            "stmt = conn.prepareStatement(\"SELECT * FROM Users WHERE id = ?\"); stmt.setInt(1, id);",
            "Calling a stored procedure with CallableStatement and bound parameters"
          ],
          "answer": { "value": 1 },
          "explanation": "Concatenating user input straight into the SQL string allows an attacker to terminate the literal and inject SQL. Parameterised queries (PreparedStatement) are safe."
        },
        {
          "id": "mcq-api-07",
          "subtopic": "Connection pooling",
          "prompt": "What is the main purpose of a connection pool?",
          "options": [
            "To encrypt database passwords",
            "To reuse a fixed set of already-opened connections instead of paying the cost of opening a new one for every request",
            "To replicate the database across multiple servers",
            "To turn JDBC into an asynchronous API"
          ],
          "answer": { "value": 1 },
          "explanation": "Establishing a new database connection is expensive. A pool keeps connections open and hands them out to clients on demand."
        },
        {
          "id": "mcq-api-08",
          "subtopic": "ORMs",
          "prompt": "What does an Object-Relational Mapper (ORM) primarily do?",
          "options": [
            "Translates between application objects and relational rows, generating SQL automatically",
            "Stores objects directly in binary files",
            "Encrypts the database",
            "Replaces the SQL standard with a graph query language"
          ],
          "answer": { "value": 0 },
          "explanation": "ORMs map classes ↔ tables and instances ↔ rows, and generate SQL for CRUD and queries (often with lazy loading and identity maps)."
        },
        {
          "id": "mcq-api-09",
          "subtopic": "Data independence",
          "prompt": "A DBA replaces a hash index with a B-tree index and reorganises the underlying files on disk. No application SQL has to change. Which ANSI/SPARC property does this illustrate?",
          "options": [
            "Logical data independence (conceptual changes do not affect external views)",
            "Physical data independence (internal-level changes do not affect the conceptual schema)",
            "Referential integrity",
            "Transactional isolation"
          ],
          "answer": { "value": 1 },
          "explanation": "Physical data independence = the storage / internal level can be reorganised without touching the conceptual schema. Logical data independence is the related property between the conceptual and external levels."
        },
        {
          "id": "mcq-api-10",
          "subtopic": "Errors",
          "prompt": "In JDBC, errors from the database are signalled as…",
          "options": [
            "Return codes from execute()",
            "Instances of java.sql.SQLException (and its subclasses)",
            "Silent NULL ResultSets",
            "Operating-system signals"
          ],
          "answer": { "value": 1 },
          "explanation": "Every JDBC method that talks to the DB declares 'throws SQLException'; the exception carries the SQLState, vendor code, and chained causes."
        }
      ]
    },

    /* ============================================================ */
    /* ================== MIXED PRACTICE QUIZZES ================== */
    /* ============================================================ */

    {
      "id": "mcq-mixed-a",
      "name": "Mixed Practice A",
      "tagline": "Drill across ER, SQL, FDs, normal forms, transactions, and APIs.",
      "icon": "🎯",
      "questions": [
        {
          "id": "mcq-mxa-01",
          "subtopic": "ER cardinalities",
          "prompt": "A library has many books; each book copy belongs to exactly one library. Using (min..max) notation on the Book side of 'Library owns Book', which is correct?",
          "options": ["(0..1)", "(1..1)", "(0..*)", "(1..*)"],
          "answer": { "value": 1 },
          "explanation": "Each book is owned by exactly one library — both min and max are 1, giving (1..1)."
        },
        {
          "id": "mcq-mxa-02",
          "subtopic": "ER → relational (1:N)",
          "prompt": "A 1:N relationship 'Department employs Employee' is most efficiently translated by:",
          "options": [
            "Creating a new relation Employs(dept_id, emp_id)",
            "Adding dept_id as a foreign key on Employee (the 'many' side)",
            "Adding emp_id as a foreign key on Department",
            "Merging Department and Employee into one relation"
          ],
          "answer": { "value": 1 },
          "explanation": "1:N relationships are inlined as a foreign key on the 'many' side — no separate relation is required."
        },
        {
          "id": "mcq-mxa-03",
          "subtopic": "Relational model",
          "prompt": "In the relational model, the domain of an attribute is:",
          "options": [
            "The number of tuples in the relation",
            "The set of allowed values the attribute may take",
            "The primary-key constraint of the relation",
            "The set of foreign keys referencing it"
          ],
          "answer": { "value": 1 },
          "explanation": "A domain restricts the legal values of an attribute (e.g. INTEGER, VARCHAR(50), DATE)."
        },
        {
          "id": "mcq-mxa-04",
          "subtopic": "SQL joins",
          "prompt": "Given `SELECT * FROM A INNER JOIN B ON A.x = B.x`, what rows appear in the result?",
          "options": [
            "All rows of A, with NULLs where B has no match",
            "Only rows where A.x equals some B.x (matching pairs only)",
            "All rows of A and all rows of B combined",
            "Only rows where A.x is NULL"
          ],
          "answer": { "value": 1 },
          "explanation": "INNER JOIN returns exactly the matching pairs; unmatched rows from either side are dropped."
        },
        {
          "id": "mcq-mxa-05",
          "subtopic": "SQL HAVING",
          "prompt": "Which clause is required to filter on the result of an aggregate function like SUM or COUNT?",
          "options": ["WHERE", "HAVING", "ORDER BY", "DISTINCT"],
          "answer": { "value": 1 },
          "explanation": "WHERE is evaluated before grouping and cannot reference aggregates; HAVING filters groups after aggregation."
        },
        {
          "id": "mcq-mxa-06",
          "subtopic": "FD closure",
          "prompt": "Given F = { A → B, AB → C, C → D } on R(A,B,C,D), compute {A}⁺.",
          "options": ["{A}", "{A,B}", "{A,B,C}", "{A,B,C,D}"],
          "answer": { "value": 3 },
          "explanation": "A→B adds B; then {A,B} triggers AB→C, adding C; then C→D adds D. Closure is {A,B,C,D}, so A alone is a key."
        },
        {
          "id": "mcq-mxa-07",
          "subtopic": "3NF check",
          "prompt": "R(A,B,C) has F = { A → B, B → C } and the only candidate key is {A}. Which form is R in?",
          "options": [
            "BCNF",
            "3NF but not BCNF",
            "2NF but not 3NF (transitive dependency)",
            "Not even 1NF"
          ],
          "answer": { "value": 2 },
          "explanation": "B → C: B is not a superkey and C is non-prime, so this is a transitive dependency violating 3NF. The single-attribute key means no partial dependency is possible, so 2NF holds."
        },
        {
          "id": "mcq-mxa-08",
          "subtopic": "ACID — Atomicity",
          "prompt": "Atomicity in ACID guarantees that:",
          "options": [
            "Either all operations of a transaction take effect, or none do",
            "Committed changes survive system crashes",
            "The database is always in a consistent state between transactions",
            "Transactions appear to run one at a time"
          ],
          "answer": { "value": 0 },
          "explanation": "Atomicity = 'all-or-nothing'. Partial effects of a failed transaction must be rolled back."
        },
        {
          "id": "mcq-mxa-09",
          "subtopic": "Two-phase locking",
          "prompt": "The 'two phases' of the 2PL protocol are:",
          "options": [
            "Read phase and write phase",
            "Growing phase (only acquiring locks) and shrinking phase (only releasing locks)",
            "Commit phase and recovery phase",
            "Logging phase and flushing phase"
          ],
          "answer": { "value": 1 },
          "explanation": "Under 2PL, once a transaction releases any lock it may not acquire any new lock — the lock count first grows then shrinks."
        },
        {
          "id": "mcq-mxa-10",
          "subtopic": "JDBC exceptions",
          "prompt": "What exception type does virtually every JDBC operation declare?",
          "options": [
            "RuntimeException",
            "SQLException",
            "IOException",
            "ClassNotFoundException"
          ],
          "answer": { "value": 1 },
          "explanation": "java.sql.SQLException is the checked exception that carries the SQLState, vendor error code, and chained causes."
        },
        {
          "id": "mcq-mxa-11",
          "subtopic": "SQL injection",
          "prompt": "Which line of Java is the most dangerous from an SQL-injection standpoint?",
          "options": [
            "ps = c.prepareStatement(\"SELECT * FROM U WHERE name = ?\"); ps.setString(1, name);",
            "String q = \"SELECT * FROM U WHERE name = '\" + name + \"'\"; st.executeQuery(q);",
            "ps = c.prepareStatement(\"SELECT * FROM U WHERE id = ?\"); ps.setInt(1, id);",
            "Using a stored procedure with bound parameters"
          ],
          "answer": { "value": 1 },
          "explanation": "Concatenating user input into the SQL string lets an attacker close the literal and inject arbitrary SQL. The fix is parameterised queries."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-mixed-b",
      "name": "Mixed Practice B",
      "tagline": "Weak entities, NULLs, BCNF, recoverable schedules, ANSI/SPARC.",
      "icon": "🧩",
      "questions": [
        {
          "id": "mcq-mxb-01",
          "subtopic": "Weak entities — translation",
          "prompt": "A weak entity 'OrderLine' (discriminator: line_no) is owned by 'Order' (PK: order_id). What is the primary key of the resulting relation OrderLine?",
          "options": [
            "line_no alone",
            "order_id alone",
            "(order_id, line_no)",
            "An auto-generated surrogate column"
          ],
          "answer": { "value": 2 },
          "explanation": "Weak entities inherit the owner's PK plus their own discriminator as a composite primary key."
        },
        {
          "id": "mcq-mxb-02",
          "subtopic": "ISA — covering constraint",
          "prompt": "An ISA hierarchy is 'covering' (total) when:",
          "options": [
            "Every supertype instance must also be in at least one subtype",
            "Subtypes may overlap",
            "Subtypes are mutually exclusive",
            "The superclass has no attributes of its own"
          ],
          "answer": { "value": 0 },
          "explanation": "Covering / total = every supertype instance belongs to some subtype; the alternative is 'partial' (an instance may exist only as the supertype)."
        },
        {
          "id": "mcq-mxb-03",
          "subtopic": "Relational integrity",
          "prompt": "The entity-integrity constraint requires that:",
          "options": [
            "Every foreign key refers to an existing primary key",
            "No attribute participating in the primary key may be NULL",
            "Every relation has at least one foreign key",
            "Every column declared UNIQUE may not be NULL"
          ],
          "answer": { "value": 1 },
          "explanation": "Entity integrity = primary-key attributes must be non-NULL. Referential integrity is the constraint about foreign keys."
        },
        {
          "id": "mcq-mxb-04",
          "subtopic": "SQL NULL aggregates",
          "prompt": "If the column 'bonus' contains the values {100, 200, NULL, NULL, 300}, what does `SELECT AVG(bonus)` return?",
          "options": ["120", "200", "NULL", "600"],
          "answer": { "value": 1 },
          "explanation": "AVG ignores NULLs: (100+200+300)/3 = 200. NULLs are not counted in either sum or count."
        },
        {
          "id": "mcq-mxb-05",
          "subtopic": "SQL EXISTS",
          "prompt": "Which is true about `EXISTS (SELECT ... )`?",
          "options": [
            "It returns the rows of the subquery",
            "It evaluates to TRUE iff the subquery produces at least one row, FALSE otherwise",
            "The columns selected inside affect the truth value",
            "It requires DISTINCT on the inner SELECT"
          ],
          "answer": { "value": 1 },
          "explanation": "EXISTS is a boolean — only the existence of any row matters; the selected columns are irrelevant (that is why `SELECT 1` is idiomatic)."
        },
        {
          "id": "mcq-mxb-06",
          "subtopic": "Trivial FDs",
          "prompt": "Which FD is trivial on any relation?",
          "options": ["A → B", "AB → C", "ABC → AB", "C → AB"],
          "answer": { "value": 2 },
          "explanation": "X → Y is trivial when Y ⊆ X. {A,B} ⊆ {A,B,C}, so ABC → AB always holds."
        },
        {
          "id": "mcq-mxb-07",
          "subtopic": "BCNF identification",
          "prompt": "R(A,B,C) has F = { AB → C, C → B } and candidate keys {A,B} and {A,C}. Is R in BCNF?",
          "options": [
            "Yes — both FDs are fine",
            "No — C → B violates BCNF because C is not a superkey",
            "No — AB → C violates BCNF because B is prime",
            "Yes — every attribute is prime"
          ],
          "answer": { "value": 1 },
          "explanation": "C alone is not a superkey ({C}⁺ = {C,B}, missing A), but B is prime, so 3NF still holds. BCNF however requires the LHS to be a superkey — violated by C → B."
        },
        {
          "id": "mcq-mxb-08",
          "subtopic": "Recoverable schedules",
          "prompt": "Schedule S has T1 write X, then T2 read X, then T2 commit, then T1 commit. Is S recoverable?",
          "options": [
            "Yes — T2 commits before T1, which is fine because they are independent",
            "No — T2 read uncommitted data from T1 and committed before T1, so if T1 aborts we cannot undo T2's commit",
            "Yes — committing in any order is always recoverable",
            "Cannot be decided without knowing values"
          ],
          "answer": { "value": 1 },
          "explanation": "Recoverability requires that a transaction T_j only commits after every T_i whose writes T_j read. Here T2 reads T1's write but commits first → not recoverable."
        },
        {
          "id": "mcq-mxb-09",
          "subtopic": "Precedence graph",
          "prompt": "What property of the precedence (conflict) graph determines that a schedule is conflict-serializable?",
          "options": [
            "It has no nodes",
            "It is acyclic",
            "It is a tree",
            "It is bipartite"
          ],
          "answer": { "value": 1 },
          "explanation": "A schedule is conflict-serializable iff its precedence graph (edge T_i → T_j when T_i has a conflicting operation that precedes T_j's) is acyclic."
        },
        {
          "id": "mcq-mxb-10",
          "subtopic": "Connection pooling",
          "prompt": "Why does a typical web app use a JDBC connection pool instead of opening a fresh connection per HTTP request?",
          "options": [
            "Pools encrypt traffic by default",
            "Opening a connection involves TCP setup and authentication — much slower than borrowing one from a pool",
            "Pools automatically detect SQL injection",
            "JDBC forbids opening more than one connection per process"
          ],
          "answer": { "value": 1 },
          "explanation": "Establishing a JDBC connection is expensive (network handshake, authentication, session setup). A pool keeps a fixed set of connections warm and hands them out."
        },
        {
          "id": "mcq-mxb-11",
          "subtopic": "ANSI/SPARC — physical independence",
          "prompt": "Reorganising files on disk and switching from a hash to a B-tree index without touching the conceptual schema illustrates:",
          "options": [
            "Logical data independence",
            "Physical data independence",
            "Referential integrity",
            "View serializability"
          ],
          "answer": { "value": 1 },
          "explanation": "Physical data independence = internal-level changes (storage layout, indexes) do not affect the conceptual schema or the applications above it."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-mixed-c",
      "name": "Mixed Practice C",
      "tagline": "Aggregation, division, candidate-key counting, strict 2PL, ORMs.",
      "icon": "⚙️",
      "questions": [
        {
          "id": "mcq-mxc-01",
          "subtopic": "Aggregation",
          "prompt": "Why does the ER model introduce 'aggregation'?",
          "options": [
            "To denote summation in queries like SUM(...)",
            "To allow a relationship itself to participate in another relationship",
            "To replace ISA hierarchies with composition",
            "To merge two entities into one"
          ],
          "answer": { "value": 1 },
          "explanation": "Aggregation is the ER construct for treating a relationship as a higher-level entity so another relationship can connect to it."
        },
        {
          "id": "mcq-mxc-02",
          "subtopic": "Multivalued attributes — translation",
          "prompt": "An entity Employee has a multivalued attribute 'skill'. The cleanest relational translation creates:",
          "options": [
            "Columns skill1, skill2, ..., skillN on Employee",
            "One text column holding a comma-separated list of skills",
            "A new relation Skill(emp_id, skill) with both columns forming the PK",
            "An array column (vendor-specific) — multivalued attributes cannot otherwise be stored"
          ],
          "answer": { "value": 2 },
          "explanation": "Multivalued attributes become their own relation whose primary key is the composite (entity_id, value); this preserves 1NF."
        },
        {
          "id": "mcq-mxc-03",
          "subtopic": "GROUP BY rules",
          "prompt": "Which SELECT is legal in standard SQL given `GROUP BY dept`?",
          "options": [
            "SELECT dept, emp_name FROM E GROUP BY dept",
            "SELECT dept, AVG(salary) FROM E GROUP BY dept",
            "SELECT * FROM E GROUP BY dept",
            "SELECT salary FROM E GROUP BY dept"
          ],
          "answer": { "value": 1 },
          "explanation": "Only grouping columns and aggregates may appear in the SELECT clause of a grouped query. emp_name and salary are neither, so they are illegal."
        },
        {
          "id": "mcq-mxc-04",
          "subtopic": "Relational division (NOT EXISTS)",
          "prompt": "The double-NOT EXISTS pattern `WHERE NOT EXISTS (SELECT 1 FROM Req r WHERE NOT EXISTS (SELECT 1 FROM Took t WHERE t.s = S.id AND t.c = r.c))` expresses:",
          "options": [
            "Students who took at least one required course",
            "Students who took every required course (relational division)",
            "Required courses no student has taken",
            "Students who took only required courses"
          ],
          "answer": { "value": 1 },
          "explanation": "'There is no required course for which the student has no matching enrolment' = the student took every required course — relational division."
        },
        {
          "id": "mcq-mxc-05",
          "subtopic": "Counting candidate keys",
          "prompt": "On R(A,B,C) with F = { A → B, B → A, B → C }, how many candidate keys exist?",
          "options": ["1: {A}", "1: {B}", "2: {A} and {B}", "3: {A}, {B}, {C}"],
          "answer": { "value": 2 },
          "explanation": "{A}⁺ = {A,B,C}; {B}⁺ = {B,A,C}; both are minimal and cover all attributes, so there are two candidate keys: {A} and {B}."
        },
        {
          "id": "mcq-mxc-06",
          "subtopic": "BCNF vs 3NF",
          "prompt": "Which is the key reason BCNF decomposition can sacrifice dependency preservation while 3NF synthesis cannot?",
          "options": [
            "BCNF allows non-prime determinants and 3NF forbids them",
            "BCNF disallows X → A when X is not a superkey, even if A is prime; this may split an FD across fragments",
            "3NF is undecidable for relations with more than five attributes",
            "BCNF requires lossy joins"
          ],
          "answer": { "value": 1 },
          "explanation": "3NF allows X → A when A is prime, so it can keep all FDs locally. BCNF forbids this, sometimes forcing a decomposition that scatters an FD across two relations."
        },
        {
          "id": "mcq-mxc-07",
          "subtopic": "Dirty reads — isolation",
          "prompt": "Which SQL isolation level is the only one that allows dirty reads?",
          "options": [
            "READ UNCOMMITTED",
            "READ COMMITTED",
            "REPEATABLE READ",
            "SERIALIZABLE"
          ],
          "answer": { "value": 0 },
          "explanation": "READ UNCOMMITTED is the weakest level and is the only one where a transaction may read another transaction's uncommitted (dirty) writes."
        },
        {
          "id": "mcq-mxc-08",
          "subtopic": "Strict 2PL",
          "prompt": "Compared to plain 2PL, strict 2PL eliminates which problem?",
          "options": [
            "Deadlocks",
            "Cascading rollbacks",
            "Phantom reads",
            "Lost updates"
          ],
          "answer": { "value": 1 },
          "explanation": "Strict 2PL holds write locks until commit/abort, so no other transaction can read uncommitted data → cascading aborts cannot occur. Deadlocks are still possible."
        },
        {
          "id": "mcq-mxc-09",
          "subtopic": "ORMs",
          "prompt": "An ORM (Object-Relational Mapper) is best described as:",
          "options": [
            "A query optimiser inside the DBMS",
            "A layer that maps application classes to relations and instances to rows, generating SQL transparently",
            "A replacement for the relational model based on graphs",
            "A connection pool for NoSQL stores"
          ],
          "answer": { "value": 1 },
          "explanation": "ORMs hide the SQL boilerplate by mapping objects ↔ rows and classes ↔ tables, generating CRUD and queries automatically."
        },
        {
          "id": "mcq-mxc-10",
          "subtopic": "ANSI/SPARC — external views",
          "prompt": "A user is only allowed to see (employee_id, name, dept) instead of the full Employee table. Which ANSI/SPARC level encodes this restriction?",
          "options": [
            "Internal",
            "Conceptual",
            "External (per-user view)",
            "Physical"
          ],
          "answer": { "value": 2 },
          "explanation": "External-level schemas (views) define what each user / application sees of the unified conceptual schema."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-mixed-d",
      "name": "Mixed Practice D",
      "tagline": "Ternary relationships, partial dependencies, view serializability, deadlocks.",
      "icon": "🧠",
      "questions": [
        {
          "id": "mcq-mxd-01",
          "subtopic": "Identifying relationships",
          "prompt": "Which symbol distinguishes an identifying relationship in an ER diagram?",
          "options": [
            "A solid diamond",
            "A double-bordered diamond (often with double lines on the weak-entity side)",
            "A triangle labelled 'ISA'",
            "A circle around the relationship name"
          ],
          "answer": { "value": 1 },
          "explanation": "Identifying relationships — those that tie a weak entity to its owner — use a doubled diamond. The weak entity side also uses doubled lines."
        },
        {
          "id": "mcq-mxd-02",
          "subtopic": "Ternary vs binary",
          "prompt": "A genuine ternary relationship is needed when:",
          "options": [
            "Three entities happen to be related to each other pairwise",
            "The truth of the relationship depends jointly on all three participating entities and cannot be inferred from binary projections",
            "Three entities share a common attribute",
            "There are three foreign keys in the resulting relation"
          ],
          "answer": { "value": 1 },
          "explanation": "A ternary relationship is required when no decomposition into binary relationships captures the same facts — the three-way association is irreducible."
        },
        {
          "id": "mcq-mxd-03",
          "subtopic": "ER → relational — total participation",
          "prompt": "Mandatory (total) participation of an entity in a 1:N relationship is best enforced at the relational level by:",
          "options": [
            "Declaring the corresponding foreign key column NOT NULL",
            "Adding a UNIQUE constraint",
            "Using a check constraint COUNT(*) > 0",
            "Total participation cannot be enforced in SQL DDL"
          ],
          "answer": { "value": 0 },
          "explanation": "Min cardinality of 1 means every row on that side must reference exactly one row on the other — enforced by NOT NULL on the FK column."
        },
        {
          "id": "mcq-mxd-04",
          "subtopic": "SQL self-join",
          "prompt": "An Employee table has columns (id, name, manager_id). Which query lists each employee with their manager's name?",
          "options": [
            "SELECT e.name, m.name FROM Employee e, Employee m",
            "SELECT e.name, m.name FROM Employee e JOIN Employee m ON e.manager_id = m.id",
            "SELECT name, manager_id FROM Employee",
            "SELECT e.name, m.name FROM Employee e LEFT JOIN Manager m ON e.id = m.id"
          ],
          "answer": { "value": 1 },
          "explanation": "Self-join: alias the same table twice and join on manager_id → id. Option A omits the join condition (Cartesian product)."
        },
        {
          "id": "mcq-mxd-05",
          "subtopic": "SQL subquery in FROM",
          "prompt": "Subqueries used in the FROM clause of a SELECT are also called:",
          "options": [
            "Correlated subqueries",
            "Derived tables (or inline views)",
            "Common table expressions only",
            "Set-returning functions"
          ],
          "answer": { "value": 1 },
          "explanation": "A subquery used as a table in FROM is called a derived table (or inline view); it must usually be aliased."
        },
        {
          "id": "mcq-mxd-06",
          "subtopic": "Prime attributes",
          "prompt": "On R(A,B,C,D) with candidate keys {A,B} and {C,D}, which attributes are non-prime?",
          "options": [
            "None — all four attributes are prime",
            "A and B",
            "C and D",
            "There are no prime attributes"
          ],
          "answer": { "value": 0 },
          "explanation": "Every attribute appears in at least one candidate key, so every attribute is prime — there are no non-prime attributes."
        },
        {
          "id": "mcq-mxd-07",
          "subtopic": "Partial dependencies / 2NF",
          "prompt": "R(A,B,C,D) has the candidate key {A,B} and an FD A → C. The dependency A → C is:",
          "options": [
            "Transitive",
            "Partial (a non-prime attribute depends on part of the key)",
            "Trivial",
            "Multivalued"
          ],
          "answer": { "value": 1 },
          "explanation": "C is non-prime and depends on A, which is only part of the composite candidate key — that is the definition of a partial dependency, violating 2NF."
        },
        {
          "id": "mcq-mxd-08",
          "subtopic": "Lossless join (binary)",
          "prompt": "Decomposing R(A,B,C,D) with F = { A → B, A → C, A → D } into R1(A,B,C) and R2(A,D) is:",
          "options": [
            "Lossy — the common attribute A is not a key of either fragment",
            "Lossless — A is a superkey of both R1 and R2",
            "Lossless only if D is NULL",
            "Lossy because R1 and R2 must be disjoint"
          ],
          "answer": { "value": 1 },
          "explanation": "Binary decomposition is lossless iff the common attributes form a superkey of at least one fragment. {A} determines everything in both R1 and R2."
        },
        {
          "id": "mcq-mxd-09",
          "subtopic": "View serializability",
          "prompt": "Which statement about view serializability (VSR) is correct?",
          "options": [
            "VSR is strictly weaker than CSR (CSR ⊃ VSR)",
            "Every conflict-serializable schedule is also view-serializable (CSR ⊂ VSR)",
            "VSR and CSR are equivalent",
            "VSR is undefined for schedules with writes"
          ],
          "answer": { "value": 1 },
          "explanation": "CSR ⊊ VSR. Every conflict-serializable schedule is view-serializable, but VSR also accepts certain schedules with 'blind writes' that CSR rejects."
        },
        {
          "id": "mcq-mxd-10",
          "subtopic": "Deadlock handling",
          "prompt": "Which of the following is NOT a deadlock-handling strategy used by DBMSs?",
          "options": [
            "Wait-die / wound-wait timestamp-based prevention",
            "Periodic detection by analysing the wait-for graph and aborting a victim",
            "Lock timeouts that abort transactions waiting too long",
            "Increasing the number of indexes on hot tables"
          ],
          "answer": { "value": 3 },
          "explanation": "Standard strategies are prevention (timestamp ordering), detection (wait-for graph), and timeouts. Adding indexes is unrelated to deadlocks."
        },
        {
          "id": "mcq-mxd-11",
          "subtopic": "JDBC ResultSet",
          "prompt": "After `ResultSet rs = ps.executeQuery();`, which call is needed before reading the first row?",
          "options": [
            "rs.open()",
            "rs.next()  // advances the cursor; returns false when done",
            "rs.first()  // mandatory",
            "Nothing — the cursor is already on the first row"
          ],
          "answer": { "value": 1 },
          "explanation": "A ResultSet is positioned before the first row initially. rs.next() advances the cursor and returns true while there is a row."
        },
        {
          "id": "mcq-mxd-12",
          "subtopic": "ANSI/SPARC — conceptual",
          "prompt": "The conceptual level in the ANSI/SPARC architecture contains:",
          "options": [
            "File layout, page size, and index types",
            "The unified logical schema of the entire database (tables, attributes, constraints)",
            "User-specific views",
            "The query optimiser's plans"
          ],
          "answer": { "value": 1 },
          "explanation": "The conceptual schema is the single agreed-upon logical description of the database — sitting above the internal level and below user-specific external views."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-mixed-e",
      "name": "Mixed Practice E",
      "tagline": "Derived attributes, UNION, minimal cover, cascading rollbacks, autocommit.",
      "icon": "🚀",
      "questions": [
        {
          "id": "mcq-mxe-01",
          "subtopic": "Derived attributes",
          "prompt": "An attribute drawn as a dashed ellipse in an ER diagram represents:",
          "options": [
            "A primary-key attribute",
            "A multivalued attribute",
            "A derived attribute (computable from other stored attributes)",
            "A foreign-key attribute"
          ],
          "answer": { "value": 2 },
          "explanation": "Dashed ellipses denote derived attributes; they don't need to be stored, since they can be re-computed."
        },
        {
          "id": "mcq-mxe-02",
          "subtopic": "1:1 translation",
          "prompt": "A 1:1 relationship 'Employee owns Laptop' that is mandatory on the Laptop side but optional on the Employee side is best translated by:",
          "options": [
            "Adding emp_id as NOT NULL UNIQUE on Laptop",
            "Adding laptop_id as NOT NULL UNIQUE on Employee",
            "Creating a join table Owns(emp_id, laptop_id)",
            "Merging Employee and Laptop into one relation"
          ],
          "answer": { "value": 0 },
          "explanation": "Inline the FK on the mandatory side (Laptop) so it can be NOT NULL; UNIQUE enforces the 1:1 cardinality. Adding it on the optional side would force a NULLable FK."
        },
        {
          "id": "mcq-mxe-03",
          "subtopic": "Foreign keys",
          "prompt": "A foreign-key constraint enforces that:",
          "options": [
            "The referencing column must be UNIQUE",
            "Every non-NULL value in the referencing column matches some value of the referenced primary key",
            "The referencing and referenced columns must have the same name",
            "The referenced table must be empty when the FK is declared"
          ],
          "answer": { "value": 1 },
          "explanation": "Referential integrity: a FK either is NULL or refers to an existing row in the referenced relation."
        },
        {
          "id": "mcq-mxe-04",
          "subtopic": "UNION vs UNION ALL",
          "prompt": "What is the difference between UNION and UNION ALL?",
          "options": [
            "UNION ALL removes duplicates; UNION keeps them",
            "UNION removes duplicate rows (implicit DISTINCT); UNION ALL keeps every row including duplicates",
            "UNION requires both queries to return the same number of rows",
            "UNION ALL is undefined for tables with more than one column"
          ],
          "answer": { "value": 1 },
          "explanation": "UNION does an implicit DISTINCT. UNION ALL skips that step (cheaper, retains duplicates)."
        },
        {
          "id": "mcq-mxe-05",
          "subtopic": "NULL arithmetic",
          "prompt": "What is the value of the SQL expression `100 + NULL`?",
          "options": ["100", "0", "NULL", "An error"],
          "answer": { "value": 2 },
          "explanation": "Any arithmetic involving NULL yields NULL — the 'unknown' propagates."
        },
        {
          "id": "mcq-mxe-06",
          "subtopic": "Armstrong's axioms",
          "prompt": "Which of the following is the augmentation axiom?",
          "options": [
            "If Y ⊆ X then X → Y",
            "If X → Y then XZ → YZ for any Z",
            "If X → Y and Y → Z then X → Z",
            "If X → YZ then X → Y and X → Z"
          ],
          "answer": { "value": 1 },
          "explanation": "Augmentation: adding the same attributes to both sides of an FD preserves the FD. Reflexivity (A), transitivity (C) and decomposition (D) are different rules."
        },
        {
          "id": "mcq-mxe-07",
          "subtopic": "Minimal cover",
          "prompt": "A minimal (canonical) cover of an FD set F requires:",
          "options": [
            "Every FD has a single attribute on the right; no extraneous attributes on the left; no redundant FDs",
            "Every FD has a single attribute on the left",
            "Every attribute appears in some FD",
            "F has as many FDs as possible"
          ],
          "answer": { "value": 0 },
          "explanation": "Three rules: singleton RHS; no extraneous LHS attribute; no FD is implied by the others — while staying equivalent to F."
        },
        {
          "id": "mcq-mxe-08",
          "subtopic": "2NF",
          "prompt": "Which scenario violates 2NF on R(student_id, course_id, course_name)?",
          "options": [
            "Candidate key is {student_id, course_id} and course_name depends only on course_id (a partial dependency)",
            "Candidate key is {student_id} alone and course_name depends on student_id",
            "There are no FDs at all",
            "course_name is NULL for some rows"
          ],
          "answer": { "value": 0 },
          "explanation": "course_name is a non-prime attribute depending on only part (course_id) of the composite key — that is a partial dependency, violating 2NF."
        },
        {
          "id": "mcq-mxe-09",
          "subtopic": "Serial vs serializable",
          "prompt": "Which statement is correct?",
          "options": [
            "Every serial schedule is conflict-serializable, but not every conflict-serializable schedule is serial",
            "Every conflict-serializable schedule is serial",
            "Serial and serializable schedules are exactly the same",
            "Serial schedules may produce non-serializable results"
          ],
          "answer": { "value": 0 },
          "explanation": "A serial schedule (no interleaving) is trivially serializable. The point of conflict serializability is to allow more interleavings that are still equivalent to some serial order."
        },
        {
          "id": "mcq-mxe-10",
          "subtopic": "Cascading rollbacks",
          "prompt": "Cascading rollbacks occur because:",
          "options": [
            "Disks fail",
            "A transaction read uncommitted data; if the writer aborts, every dependent transaction must also abort",
            "Locks are released too late",
            "Deadlock-detection picks the wrong victim"
          ],
          "answer": { "value": 1 },
          "explanation": "If T2 reads T1's uncommitted write and T1 aborts, T2 must also be rolled back — and so on for anything that read T2's writes."
        },
        {
          "id": "mcq-mxe-11",
          "subtopic": "JDBC autocommit",
          "prompt": "By default a fresh JDBC Connection is in autocommit mode. What does that mean?",
          "options": [
            "Every statement is committed automatically as a single-statement transaction",
            "Nothing is ever committed unless conn.commit() is called",
            "Connections are returned to the pool after every statement",
            "Statements are buffered and committed when the JVM exits"
          ],
          "answer": { "value": 0 },
          "explanation": "Autocommit wraps each SQL statement in its own transaction. To group several statements you must call conn.setAutoCommit(false), then commit() or rollback() explicitly."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-mixed-f",
      "name": "Theory Deep Dive A",
      "tagline": "Relation definitions, integrity constraints, BCNF theorem, durability.",
      "icon": "📚",
      "questions": [
        {
          "id": "mcq-mxf-01",
          "subtopic": "Relational definitions",
          "prompt": "In the relational model, a 'relation' is formally:",
          "options": [
            "A list of rows with no schema",
            "A set of tuples drawn from the Cartesian product of attribute domains",
            "A pointer to a file on disk",
            "A query result that always preserves row order"
          ],
          "answer": { "value": 1 },
          "explanation": "A relation is a (mathematical) set of tuples; each tuple is an element of D1 × D2 × … × Dn for the domains of the attributes."
        },
        {
          "id": "mcq-mxf-02",
          "subtopic": "Referential integrity",
          "prompt": "Referential integrity is violated when:",
          "options": [
            "A primary-key column contains NULL",
            "A foreign-key column has a non-NULL value that does not match any primary-key value in the referenced relation",
            "A relation has no foreign keys",
            "Two rows have identical values"
          ],
          "answer": { "value": 1 },
          "explanation": "Referential integrity = every non-NULL FK refers to an existing PK. A dangling FK violates it. (A NULL PK violates entity integrity, not referential.)"
        },
        {
          "id": "mcq-mxf-03",
          "subtopic": "ER — optional attribute",
          "prompt": "In ER, how would you represent the fact that 'middle name' is optional — a person may or may not have one?",
          "options": [
            "As a derived attribute",
            "As a multivalued attribute",
            "As a normal attribute, and at the relational level allow NULL on the corresponding column",
            "As a weak entity"
          ],
          "answer": { "value": 2 },
          "explanation": "Optionality is typically modelled by allowing NULL on the resulting relational column; ER itself often just notes the attribute and treats nullability at the schema level."
        },
        {
          "id": "mcq-mxf-04",
          "subtopic": "SQL COUNT semantics",
          "prompt": "Which is true about `COUNT(col)` versus `COUNT(*)`?",
          "options": [
            "Both count every row identically",
            "COUNT(*) counts every row; COUNT(col) counts only rows where col IS NOT NULL",
            "COUNT(col) counts NULLs as one distinct value",
            "COUNT(*) raises an error on empty tables"
          ],
          "answer": { "value": 1 },
          "explanation": "COUNT(*) counts every row of the (grouped) input. COUNT(col) and COUNT(DISTINCT col) skip rows where col IS NULL."
        },
        {
          "id": "mcq-mxf-05",
          "subtopic": "Attribute closure",
          "prompt": "Given F = { AB → C, C → D, D → E } on R(A,B,C,D,E), compute {A,B}⁺.",
          "options": ["{A,B}", "{A,B,C}", "{A,B,C,D}", "{A,B,C,D,E}"],
          "answer": { "value": 3 },
          "explanation": "AB→C adds C; C→D adds D; D→E adds E. Closure is the full attribute set, so {A,B} is a superkey."
        },
        {
          "id": "mcq-mxf-06",
          "subtopic": "BCNF — exact condition",
          "prompt": "R is in BCNF iff:",
          "options": [
            "For every nontrivial FD X → A in F+, X is a superkey of R",
            "Every attribute is prime",
            "Every FD has a single-attribute LHS",
            "There are no transitive dependencies"
          ],
          "answer": { "value": 0 },
          "explanation": "BCNF formally: every nontrivial FD in F+ has a superkey on its left. (3NF relaxes this by also allowing A to be prime.)"
        },
        {
          "id": "mcq-mxf-07",
          "subtopic": "3NF synthesis claim",
          "prompt": "Which guarantee does the 3NF synthesis algorithm give that BCNF decomposition does not?",
          "options": [
            "Strictly stronger normal form",
            "Always dependency-preserving AND lossless",
            "Always at most two relations in the result",
            "Always avoids NULLs in the schema"
          ],
          "answer": { "value": 1 },
          "explanation": "3NF synthesis from a minimal cover yields a decomposition that is both lossless and dependency-preserving. BCNF decomposition is always lossless but may lose dependency preservation."
        },
        {
          "id": "mcq-mxf-08",
          "subtopic": "Conflict serializability test",
          "prompt": "Schedule S has operations: r1(X), w2(X), r1(Y), w2(Y), commit1, commit2. Is S conflict-serializable?",
          "options": [
            "Yes, equivalent to T1 then T2",
            "Yes, equivalent to T2 then T1",
            "No — the precedence graph has a cycle T1↔T2",
            "Cannot determine without values"
          ],
          "answer": { "value": 0 },
          "explanation": "r1(X) precedes w2(X) → edge T1→T2 on X; r1(Y) precedes w2(Y) → another T1→T2. Only T1→T2 edges; acyclic; equivalent to serial order T1, T2."
        },
        {
          "id": "mcq-mxf-09",
          "subtopic": "ACID — Durability",
          "prompt": "Durability guarantees that:",
          "options": [
            "Concurrent transactions do not see each other's intermediate state",
            "Either all operations of a transaction take effect or none do",
            "Once a transaction has committed, its effects survive subsequent system failures",
            "The database satisfies all integrity constraints between transactions"
          ],
          "answer": { "value": 2 },
          "explanation": "Durability = persistence of committed state across crashes. Typically enforced by write-ahead logging (WAL) that is flushed before COMMIT returns."
        },
        {
          "id": "mcq-mxf-10",
          "subtopic": "ANSI/SPARC layers",
          "prompt": "From bottom to top, the ANSI/SPARC three-level schema architecture orders the levels as:",
          "options": [
            "Conceptual → Internal → External",
            "External → Conceptual → Internal",
            "Internal → Conceptual → External",
            "Internal → External → Conceptual"
          ],
          "answer": { "value": 2 },
          "explanation": "Internal (bytes on disk) → Conceptual (the unified logical schema) → External (per-user views)."
        },
        {
          "id": "mcq-mxf-11",
          "subtopic": "ORMs — purpose",
          "prompt": "Which of the following is NOT typically a feature of an ORM framework?",
          "options": [
            "Mapping classes to tables and instances to rows",
            "Generating SQL for CRUD operations",
            "Replacing the underlying DBMS with a graph database automatically",
            "Lazy loading of associated objects"
          ],
          "answer": { "value": 2 },
          "explanation": "An ORM sits on top of a relational DBMS; it does not change the underlying storage model."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-mixed-g",
      "name": "Theory Deep Dive B",
      "tagline": "Relational algebra, decomposition, timestamps, PreparedStatement.",
      "icon": "🧪",
      "questions": [
        {
          "id": "mcq-mxg-01",
          "subtopic": "Relational algebra — projection",
          "prompt": "Which relational-algebra operator selects a subset of columns?",
          "options": ["σ (selection)", "π (projection)", "⋈ (join)", "ρ (rename)"],
          "answer": { "value": 1 },
          "explanation": "π (projection) chooses columns. σ (selection) chooses rows by a predicate."
        },
        {
          "id": "mcq-mxg-02",
          "subtopic": "Relational algebra — selection",
          "prompt": "The relational-algebra expression σ_{age > 18}(Person) corresponds to which SQL?",
          "options": [
            "SELECT age FROM Person",
            "SELECT * FROM Person WHERE age > 18",
            "SELECT * FROM Person ORDER BY age",
            "SELECT * FROM Person GROUP BY age HAVING age > 18"
          ],
          "answer": { "value": 1 },
          "explanation": "σ filters rows by a predicate — exactly what WHERE does in SQL."
        },
        {
          "id": "mcq-mxg-03",
          "subtopic": "ER → relational — ISA strategies",
          "prompt": "Which of the following is NOT one of the three standard relational mappings of an ISA hierarchy?",
          "options": [
            "One relation for the superclass plus one relation per subclass (most common)",
            "One relation per subclass only (no superclass relation)",
            "A single relation for the superclass and all subclasses (with NULLs for non-applicable attributes)",
            "Replace the ISA with a single multivalued attribute on the superclass"
          ],
          "answer": { "value": 3 },
          "explanation": "Standard ISA mappings: (1) super + subs, (2) only subs, (3) single relation. A multivalued attribute is not a substitute for ISA."
        },
        {
          "id": "mcq-mxg-04",
          "subtopic": "SQL ORDER BY",
          "prompt": "Which statement about ORDER BY is correct?",
          "options": [
            "ORDER BY is evaluated before WHERE and GROUP BY",
            "ORDER BY produces a deterministically sorted result and may sort by columns, aliases, or expressions not in SELECT",
            "ORDER BY is identical to GROUP BY",
            "ORDER BY requires DISTINCT"
          ],
          "answer": { "value": 1 },
          "explanation": "ORDER BY runs last (after SELECT) and may reference SELECT-list aliases or arbitrary expressions over the input. WHERE / GROUP BY / HAVING are evaluated earlier."
        },
        {
          "id": "mcq-mxg-05",
          "subtopic": "SQL — aggregate without GROUP BY",
          "prompt": "What does `SELECT MAX(salary) FROM Employee;` return when Employee is empty?",
          "options": [
            "0",
            "An error: aggregate over empty input is undefined",
            "A single row containing NULL",
            "No rows at all"
          ],
          "answer": { "value": 2 },
          "explanation": "Aggregates over an empty input return a single row. MAX/MIN/SUM/AVG return NULL; COUNT returns 0."
        },
        {
          "id": "mcq-mxg-06",
          "subtopic": "Decomposition rule",
          "prompt": "Which of the following is the decomposition rule for FDs (derivable from Armstrong's axioms)?",
          "options": [
            "If X → YZ then X → Y and X → Z",
            "If X → Y and Y → Z then X → Z",
            "If Y ⊆ X then X → Y",
            "If X → Y then XZ → YZ"
          ],
          "answer": { "value": 0 },
          "explanation": "Decomposition: the RHS can be split. (B is transitivity, C is reflexivity, D is augmentation.)"
        },
        {
          "id": "mcq-mxg-07",
          "subtopic": "3NF check",
          "prompt": "On R(A,B,C,D) with F = { AB → C, C → D } and the only candidate key {A,B}, R is:",
          "options": [
            "In BCNF",
            "In 3NF but not BCNF (C is not a superkey; D is non-prime, so 3NF fails)",
            "Not in 3NF (C → D violates 3NF since C is not a superkey AND D is non-prime)",
            "Not in 2NF"
          ],
          "answer": { "value": 2 },
          "explanation": "3NF: every FD X → A must have X a superkey OR A prime. C is not a superkey ({C}⁺ = {C,D}) and D is non-prime → 3NF (and BCNF) violated."
        },
        {
          "id": "mcq-mxg-08",
          "subtopic": "BCNF decomposition",
          "prompt": "Why is BCNF decomposition sometimes undesirable?",
          "options": [
            "It may produce a lossy join",
            "It may sacrifice dependency preservation",
            "It always introduces redundancy",
            "It cannot be applied if the relation has more than one candidate key"
          ],
          "answer": { "value": 1 },
          "explanation": "BCNF decomposition is always lossless, but may split an FD across two fragments, forcing a join to enforce the constraint — i.e. lose dependency preservation."
        },
        {
          "id": "mcq-mxg-09",
          "subtopic": "Wait-for graph",
          "prompt": "A deadlock is present iff:",
          "options": [
            "The precedence (conflict) graph has a cycle",
            "The wait-for graph has a cycle",
            "Some transaction has been running too long",
            "Locks are released before commit"
          ],
          "answer": { "value": 1 },
          "explanation": "The wait-for graph has an edge T_i → T_j when T_i is waiting for a lock held by T_j. A cycle means a cyclic wait — i.e. a deadlock."
        },
        {
          "id": "mcq-mxg-10",
          "subtopic": "Timestamp-based prevention",
          "prompt": "Under the 'wait-die' deadlock-prevention scheme:",
          "options": [
            "An older transaction waits for a younger one; a younger one is aborted ('dies') if it requests a lock held by an older one",
            "Younger always waits, older always dies",
            "Either transaction may be aborted at random",
            "Wait-die only applies to read locks"
          ],
          "answer": { "value": 0 },
          "explanation": "Wait-die uses timestamps: an older T waits for a younger one; a younger T requesting a lock held by an older one is aborted (dies) and restarted with its original timestamp."
        },
        {
          "id": "mcq-mxg-11",
          "subtopic": "PreparedStatement",
          "prompt": "Which is a benefit of PreparedStatement that a plain Statement does not provide?",
          "options": [
            "Parameter values are sent separately, so they cannot be interpreted as SQL — preventing injection — and the parsed plan can be reused",
            "It auto-commits after every executeUpdate()",
            "It returns rows as JSON",
            "It is required to open a Connection"
          ],
          "answer": { "value": 0 },
          "explanation": "PreparedStatement uses ? placeholders and separately binds typed parameters. This both prevents SQL injection and lets the DBMS cache the prepared plan."
        },
        {
          "id": "mcq-mxg-12",
          "subtopic": "Logical data independence",
          "prompt": "Adding a new column to the conceptual schema without breaking existing application views illustrates:",
          "options": [
            "Physical data independence",
            "Logical data independence",
            "Referential integrity",
            "Strict 2PL"
          ],
          "answer": { "value": 1 },
          "explanation": "Logical data independence = conceptual-level changes (new columns, restructuring) do not require external views (and the apps using them) to change."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-mixed-h",
      "name": "Mixed Practice F",
      "tagline": "Multivalued attrs, M:N, superkey, LEFT JOIN, 1NF, 2PL nuances.",
      "icon": "🧷",
      "questions": [
        {
          "id": "mcq-mxh-01",
          "subtopic": "ER — multivalued",
          "prompt": "A multivalued attribute is drawn in an ER diagram as:",
          "options": [
            "A solid single ellipse",
            "A double ellipse",
            "A dashed ellipse",
            "An ellipse with an underlined label"
          ],
          "answer": { "value": 1 },
          "explanation": "Double ellipse = multivalued. (Dashed = derived; underlined = key.)"
        },
        {
          "id": "mcq-mxh-02",
          "subtopic": "ER → relational (M:N)",
          "prompt": "An M:N relationship 'Student takes Course' with attribute 'grade' becomes which relation?",
          "options": [
            "Takes(student_id, course_id)  with grade absorbed into Student",
            "Takes(student_id, course_id, grade)  with PK = (student_id, course_id), each component a FK",
            "Takes(grade)  with student_id and course_id absorbed",
            "Two relations Takes1 and Takes2"
          ],
          "answer": { "value": 1 },
          "explanation": "M:N → its own relation whose PK is the union of both entity keys; relationship attributes go into that relation."
        },
        {
          "id": "mcq-mxh-03",
          "subtopic": "Superkeys",
          "prompt": "A superkey of a relation is:",
          "options": [
            "Any subset of attributes whose closure equals the full attribute set",
            "A minimal subset of attributes whose closure equals the full attribute set",
            "A column that is declared UNIQUE",
            "A foreign key"
          ],
          "answer": { "value": 0 },
          "explanation": "A superkey is any set of attributes that uniquely determines every row. A candidate key is a minimal superkey."
        },
        {
          "id": "mcq-mxh-04",
          "subtopic": "LEFT JOIN behaviour",
          "prompt": "If Department has rows {1, 2, 3} and Employee has 5 rows referencing dept_id values {1, 1, 1, 2, 2}, how many rows does `Department d LEFT JOIN Employee e ON d.id = e.dept_id` return?",
          "options": ["5", "6", "8", "15"],
          "answer": { "value": 1 },
          "explanation": "Dept 1 → 3 matches; Dept 2 → 2 matches; Dept 3 → 0 matches but preserved as 1 row (with NULLs). Total = 3 + 2 + 1 = 6."
        },
        {
          "id": "mcq-mxh-05",
          "subtopic": "Augmentation",
          "prompt": "By Armstrong's augmentation axiom, if A → B then which always holds?",
          "options": ["A → AB", "AC → BC for any C", "B → A", "A → B AND B → A"],
          "answer": { "value": 1 },
          "explanation": "Augmentation: adding the same attributes to both sides preserves the FD. So A → B implies AC → BC."
        },
        {
          "id": "mcq-mxh-06",
          "subtopic": "1NF",
          "prompt": "Which relation violates 1NF?",
          "options": [
            "Person(id, name)",
            "Order(id, customer, items)  where 'items' stores a JSON list",
            "Phone(person_id, phone_no)  with composite PK",
            "Address(person_id, street, city)"
          ],
          "answer": { "value": 1 },
          "explanation": "1NF requires atomic values. Storing a list in a single column violates 1NF."
        },
        {
          "id": "mcq-mxh-07",
          "subtopic": "Cascading abort",
          "prompt": "A 'cascading abort' is exactly:",
          "options": [
            "A single transaction aborting because of an integrity violation",
            "A chain reaction in which the abort of T1 forces other transactions that read T1's writes to also abort",
            "Two transactions aborting because of deadlock detection",
            "A rollback caused by exceeding a lock timeout"
          ],
          "answer": { "value": 1 },
          "explanation": "Cascading aborts arise when uncommitted data is read by other transactions; the writer's abort propagates to all dependents."
        },
        {
          "id": "mcq-mxh-08",
          "subtopic": "2PL vs strict 2PL",
          "prompt": "Which property does strict 2PL add on top of plain 2PL?",
          "options": [
            "All locks are released as early as possible",
            "Exclusive (write) locks are held until commit/abort",
            "Deadlocks become impossible",
            "Both read and write locks are released after the first phase"
          ],
          "answer": { "value": 1 },
          "explanation": "Strict 2PL keeps write locks until the transaction commits/aborts. This prevents cascading aborts but still allows deadlocks."
        },
        {
          "id": "mcq-mxh-09",
          "subtopic": "PreparedStatement binding",
          "prompt": "Given `ps = c.prepareStatement(\"INSERT INTO Person(id, name) VALUES (?, ?)\");`, which call sets the first parameter to 42?",
          "options": [
            "ps.setInt(0, 42);",
            "ps.setInt(1, 42);",
            "ps.bind(\"id\", 42);",
            "ps.setObject(0, 42, Types.INTEGER);"
          ],
          "answer": { "value": 1 },
          "explanation": "JDBC parameter indices are 1-based. Use setInt(1, 42) for the first ?."
        },
        {
          "id": "mcq-mxh-10",
          "subtopic": "ANSI/SPARC — external schemas",
          "prompt": "External schemas in ANSI/SPARC are useful because they:",
          "options": [
            "Define the storage layout of files on disk",
            "Define per-user / per-application views of the conceptual schema, providing customisation and access control",
            "Replace the conceptual schema entirely for each application",
            "Are mandatory in every SQL standard"
          ],
          "answer": { "value": 1 },
          "explanation": "External schemas are user/application views over the conceptual schema. They tailor what each app sees and form the basis for restriction-style access control."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-mixed-i",
      "name": "Mixed Practice G",
      "tagline": "DISTINCT, extraneous attributes, phantom reads, SQL injection.",
      "icon": "🔬",
      "questions": [
        {
          "id": "mcq-mxi-01",
          "subtopic": "ER cardinality notations",
          "prompt": "Two ER cardinality notations widely used in textbooks are:",
          "options": [
            "Chen-style 1:N and (min..max) intervals — both communicate the same constraints in different graphical conventions",
            "JSON and XML",
            "Big-O and Big-Θ",
            "ASCII and Unicode"
          ],
          "answer": { "value": 0 },
          "explanation": "The two common ER cardinality notations are Chen-style (1, N, M:N) and (min..max) annotations on the relationship lines."
        },
        {
          "id": "mcq-mxi-02",
          "subtopic": "Weak entity translation",
          "prompt": "After translating a weak entity to a relation, the schema typically contains:",
          "options": [
            "Only the discriminator attribute",
            "The discriminator plus the owner's PK, with the union forming the new PK and the owner's PK declared as a FK",
            "Only the owner's PK",
            "Two separate relations for the same weak entity"
          ],
          "answer": { "value": 1 },
          "explanation": "The composite PK is (owner_PK, discriminator), and owner_PK is simultaneously a FK to the owner relation."
        },
        {
          "id": "mcq-mxi-03",
          "subtopic": "Schema vs instance",
          "prompt": "Which best describes the difference between a relation's schema and its instance?",
          "options": [
            "Schema = the actual rows; instance = the structural description",
            "Schema = the structural description (attributes, domains, constraints); instance = the set of current tuples",
            "They are the same",
            "Schema only exists in NoSQL systems"
          ],
          "answer": { "value": 1 },
          "explanation": "Schema = R(A1:D1, ..., An:Dn) plus constraints. Instance = the current set of tuples; changes constantly while the schema is stable."
        },
        {
          "id": "mcq-mxi-04",
          "subtopic": "Correlated subquery",
          "prompt": "Which is true of a correlated subquery?",
          "options": [
            "It is evaluated once, independently of the outer query",
            "It references columns from the outer query and is re-evaluated for each candidate outer row",
            "It must always be rewritten as a JOIN",
            "It cannot use aggregates"
          ],
          "answer": { "value": 1 },
          "explanation": "A correlated subquery depends on the outer row (e.g. via WHERE inner.x = outer.x) and conceptually runs once per outer row. Many can be rewritten as joins or NOT EXISTS for performance."
        },
        {
          "id": "mcq-mxi-05",
          "subtopic": "DISTINCT",
          "prompt": "Which statement is true about `SELECT DISTINCT col FROM T`?",
          "options": [
            "Two NULL values are considered different by DISTINCT",
            "All duplicate combinations (treating NULL = NULL for DISTINCT purposes) are collapsed into one row",
            "DISTINCT preserves duplicates if col is numeric",
            "DISTINCT is just a synonym for GROUP BY"
          ],
          "answer": { "value": 1 },
          "explanation": "DISTINCT removes duplicate rows. For DISTINCT (and GROUP BY) purposes, NULL is treated as equal to NULL, so all NULL rows collapse into one."
        },
        {
          "id": "mcq-mxi-06",
          "subtopic": "Extraneous attribute",
          "prompt": "An attribute A on the LHS of an FD XA → Y is 'extraneous' when:",
          "options": [
            "Y already contains A",
            "X → Y is implied by F (so removing A from the LHS still gives a valid FD)",
            "A is a foreign key",
            "A is non-prime"
          ],
          "answer": { "value": 1 },
          "explanation": "Extraneous LHS attribute: removing it preserves the FD set's closure. Removing extraneous attributes is part of computing a minimal cover."
        },
        {
          "id": "mcq-mxi-07",
          "subtopic": "3NF synthesis algorithm",
          "prompt": "The 3NF synthesis algorithm builds the result schema from:",
          "options": [
            "The original relation only",
            "A minimal (canonical) cover of F — one relation per FD, plus a key-preserving relation if needed",
            "The BCNF-decomposed schemas",
            "The view definitions in the external schema"
          ],
          "answer": { "value": 1 },
          "explanation": "3NF synthesis: compute a minimal cover, then create one relation for each FD (grouping FDs with the same LHS), and add a relation containing a candidate key if none of the created relations already does."
        },
        {
          "id": "mcq-mxi-08",
          "subtopic": "ACID — Consistency",
          "prompt": "Consistency in ACID means:",
          "options": [
            "Concurrent transactions see consistent snapshots",
            "Every transaction takes the database from one valid state (satisfying all declared integrity constraints) to another valid state",
            "Committed data survives crashes",
            "The system uses serializable isolation by default"
          ],
          "answer": { "value": 1 },
          "explanation": "Consistency: a transaction is a contract — it preserves the integrity rules of the database (PK, FK, CHECK, application invariants). Often delivered jointly by atomicity, isolation, and the constraints themselves."
        },
        {
          "id": "mcq-mxi-09",
          "subtopic": "Phantom reads",
          "prompt": "A phantom read occurs when:",
          "options": [
            "A transaction reads the same row twice and sees different column values",
            "A transaction re-runs a range query and finds new rows that weren't there before (inserted/committed by another transaction)",
            "A query returns NULL where there should be data",
            "A deadlock is detected"
          ],
          "answer": { "value": 1 },
          "explanation": "A phantom is a new row that 'appears' in the result of a repeated query because another transaction inserted (and committed) it in between. Prevented only by SERIALIZABLE (or predicate locks / range locks)."
        },
        {
          "id": "mcq-mxi-10",
          "subtopic": "Preventing SQL injection",
          "prompt": "The principal defence against SQL injection in application code is:",
          "options": [
            "Escaping every quote with a manual regex",
            "Using parameterised queries (PreparedStatement with bound parameters)",
            "Renaming database tables to obscure names",
            "Storing input in a temporary file first"
          ],
          "answer": { "value": 1 },
          "explanation": "Parameterised queries separate code from data: the SQL text is fixed and the values are transmitted as typed parameters that cannot become SQL."
        },
        {
          "id": "mcq-mxi-11",
          "subtopic": "ORMs — abstraction trade-off",
          "prompt": "A typical drawback of using an ORM is:",
          "options": [
            "It forces the use of NoSQL databases",
            "Generated SQL may be suboptimal; complex queries may need to be hand-written, and abstractions can obscure performance problems (e.g. N+1 queries)",
            "It removes the need to write any code",
            "It cannot use transactions"
          ],
          "answer": { "value": 1 },
          "explanation": "ORMs are pragmatic abstractions: they save boilerplate but generated SQL can be inefficient, and convenient accessors can hide expensive query patterns (classically: N+1 selects)."
        }
      ]
    },

    /* ============================================================ */
    {
      "id": "mcq-mixed-j",
      "name": "Mixed Practice H",
      "tagline": "ISA mapping, COUNT DISTINCT, dependency preservation, isolation hierarchy.",
      "icon": "🏁",
      "questions": [
        {
          "id": "mcq-mxj-01",
          "subtopic": "ISA — partial, overlapping",
          "prompt": "An ISA hierarchy where an entity may belong to two subtypes simultaneously and where not every supertype instance must be in any subtype is:",
          "options": [
            "Total, disjoint",
            "Total, overlapping",
            "Partial, disjoint",
            "Partial, overlapping"
          ],
          "answer": { "value": 3 },
          "explanation": "'May belong to two subtypes' = overlapping; 'not every supertype instance is in a subtype' = partial (non-covering)."
        },
        {
          "id": "mcq-mxj-02",
          "subtopic": "ISA — single-table mapping",
          "prompt": "When an ISA hierarchy is collapsed into a single relation 'Vehicle(id, type, all-attributes-of-all-subclasses, ...)', the main drawback is:",
          "options": [
            "It always loses information",
            "Many columns will be NULL for subtypes that do not have them",
            "The relation cannot be queried with SQL",
            "Foreign keys are forbidden"
          ],
          "answer": { "value": 1 },
          "explanation": "Single-table inheritance produces sparse rows: attributes specific to one subclass are NULL in rows of other subclasses. Convenient but wasteful."
        },
        {
          "id": "mcq-mxj-03",
          "subtopic": "HAVING vs WHERE",
          "prompt": "Why does `WHERE COUNT(*) > 10` produce a syntax error in standard SQL?",
          "options": [
            "COUNT(*) is not a real function",
            "WHERE is evaluated before grouping/aggregation, so aggregates are not available there — they belong in HAVING",
            "Only numeric comparisons are allowed in WHERE",
            "COUNT(*) must be inside a subquery"
          ],
          "answer": { "value": 1 },
          "explanation": "WHERE filters individual rows before GROUP BY. Aggregates live in HAVING, which filters groups after aggregation."
        },
        {
          "id": "mcq-mxj-04",
          "subtopic": "COUNT DISTINCT",
          "prompt": "Given column values {1, 2, 2, NULL, 3, NULL}, what does `SELECT COUNT(DISTINCT col)` return?",
          "options": ["3", "4", "5", "6"],
          "answer": { "value": 0 },
          "explanation": "DISTINCT ignores NULLs. Distinct non-NULL values are {1, 2, 3} → 3."
        },
        {
          "id": "mcq-mxj-05",
          "subtopic": "Dependency preservation",
          "prompt": "A decomposition of R into R1, R2, ... is dependency-preserving when:",
          "options": [
            "The natural join of all fragments equals R",
            "Every FD in F can be checked locally on one of the fragments without joining them",
            "Each Ri contains a candidate key",
            "Each Ri is in BCNF"
          ],
          "answer": { "value": 1 },
          "explanation": "Dependency preservation: F+ is captured by the union of the projected FDs on the fragments, so every constraint can be enforced without cross-fragment joins."
        },
        {
          "id": "mcq-mxj-06",
          "subtopic": "Lossless join (3-way)",
          "prompt": "For a decomposition of R into more than two relations, the standard test for losslessness is:",
          "options": [
            "Check pairwise intersections only",
            "The chase algorithm (a tableau test using F)",
            "Compute the closure of every attribute",
            "Such decompositions are always lossy"
          ],
          "answer": { "value": 1 },
          "explanation": "For binary decompositions there is the simple superkey test. For decompositions into more than two relations one usually runs the chase: start with a tableau and apply FDs until either a fully-unsubscripted row appears (lossless) or no more progress can be made (lossy)."
        },
        {
          "id": "mcq-mxj-07",
          "subtopic": "BCNF — lossless guarantee",
          "prompt": "Which property does the BCNF decomposition algorithm always guarantee?",
          "options": [
            "Dependency preservation",
            "Lossless join",
            "Minimal number of relations",
            "No NULLs anywhere"
          ],
          "answer": { "value": 1 },
          "explanation": "BCNF decomposition is always lossless (it splits on the offending FD's LHS, which is a superkey of one fragment). Dependency preservation is the property that BCNF may sacrifice."
        },
        {
          "id": "mcq-mxj-08",
          "subtopic": "2PL — deadlocks",
          "prompt": "Why can two-phase locking still produce deadlocks?",
          "options": [
            "It releases locks too early",
            "Two transactions may each acquire a lock the other needs before either releases anything — the growing phase forbids no such cycle",
            "It uses optimistic concurrency",
            "It only locks read operations"
          ],
          "answer": { "value": 1 },
          "explanation": "2PL prevents non-serializable schedules but does not coordinate lock acquisition order — circular waits are still possible, hence deadlocks."
        },
        {
          "id": "mcq-mxj-09",
          "subtopic": "Recoverable / cascadeless / strict",
          "prompt": "Which inclusion among the schedule classes is correct?",
          "options": [
            "Recoverable ⊃ Cascadeless ⊃ Strict",
            "Strict ⊃ Cascadeless ⊃ Recoverable",
            "Recoverable = Cascadeless = Strict",
            "Cascadeless ⊃ Recoverable ⊃ Strict"
          ],
          "answer": { "value": 0 },
          "explanation": "Strict ⊂ Cascadeless ⊂ Recoverable. Strict is the most restrictive (no read or overwrite of uncommitted data); recoverable is the most permissive."
        },
        {
          "id": "mcq-mxj-10",
          "subtopic": "JDBC typed accessors",
          "prompt": "When reading a column you know to be an INTEGER, which JDBC call is most appropriate?",
          "options": [
            "rs.getString(\"age\")  // then parse",
            "rs.getInt(\"age\")",
            "rs.getObject(\"age\")  // always",
            "rs.read(\"age\", Integer.class)"
          ],
          "answer": { "value": 1 },
          "explanation": "Typed accessors like getInt avoid boxing and an extra parse step; getObject is the generic fallback when the type isn't known."
        },
        {
          "id": "mcq-mxj-11",
          "subtopic": "Physical vs logical independence",
          "prompt": "Changing the underlying file format from row-store to column-store without altering the conceptual schema is an example of:",
          "options": [
            "Logical data independence",
            "Physical data independence",
            "View materialisation",
            "Lossy decomposition"
          ],
          "answer": { "value": 1 },
          "explanation": "Storage-format changes are internal-level. If the conceptual schema is unaffected, that's physical data independence."
        },
        {
          "id": "mcq-mxj-12",
          "subtopic": "ORM — transparent persistence",
          "prompt": "An ORM's claim of 'transparent persistence' refers to:",
          "options": [
            "Encrypting all data at rest",
            "Making it appear that objects simply live in memory while the ORM transparently SELECTs / INSERTs / UPDATEs on the underlying tables",
            "Removing the need for a database connection",
            "Allowing schema changes without restarting the JVM"
          ],
          "answer": { "value": 1 },
          "explanation": "Transparent persistence: the application code looks like ordinary object manipulation; the ORM handles the SQL CRUD behind the scenes when objects are loaded, modified or saved."
        }
      ]
    }
  ]
};

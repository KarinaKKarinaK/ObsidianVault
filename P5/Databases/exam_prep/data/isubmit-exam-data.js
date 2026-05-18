window.__ISUBMIT_EXAMS = [
{
  "id": "mock-1",
  "title": "Mock Final 1 — Hospital Network",
  "shortTitle": "Hospital network",
  "tagline": "ER · isA · ternary · weak entity · BCNF vs 3NF · EXISTS",
  "durationMinutes": 165,
  "maxPoints": 8.0,
  "gradeFormula": "score / maxPoints * 10",
  "tasks": [
    {
      "id": "1",
      "title": "1 Conceptual Design",
      "intro": "Consider the following case for a regional hospital network: Doctors have a medical licence number (LIC), a name, an age, and a specialty (e.g. cardiology, neurology). Patients have a patient number (PNR), a name, a date of birth, and a blood type. Hospitals have a hospital code, a name, and an address. Each hospital is run by exactly one doctor (known as the medical director). A doctor may work in one or more hospitals; for each hospital a doctor works in, a contract type (e.g. full-time, part-time, locum) is recorded. Every patient is registered at exactly one hospital as their home hospital. Treatments have a code, a name, and a standard fee. When a doctor administers a treatment to a patient, the date and the prescribed dosage are recorded; the same patient may receive the same treatment from different doctors on different dates. Hospitals organise wards: a ward has a number that is unique only within its hospital, plus a name and a bed count; a ward ceases to exist if its hospital is removed. Patients can be admitted to wards, and for every admission we record an admission date and a discharge date; one patient may be admitted multiple times. Both doctors and patients are persons: they share name, date of birth, and address. Finally, every patient has another, more senior patient registered as their next of kin (the 'contact patient') in case of emergency.",
      "subquestions": [
        {
          "id": "1a",
          "label": "Question 1(a)",
          "prompt": "Provide a conceptual database model in the form of an ER Diagram. Explain the most important design choices and document relevant assumptions.",
          "type": "er_diagram",
          "points": 1.5,
          "hint": "Remember: weak entities use double-line rectangles and identifying relationships use double-line diamonds. A ternary relationship is needed when an attribute depends on three participating entities simultaneously (here: date and dosage depend on doctor + patient + treatment). The next-of-kin link is a recursive relationship on Patient.",
          "rubric": [
            { "id": "ent_doctor",      "label": "Entity set Doctor with key LIC and attributes name, age, specialty",                          "weight": 0.12, "match": { "type": "entity", "name": "doctor", "keyAttribute": "lic" } },
            { "id": "ent_patient",     "label": "Entity set Patient with key PNR and attributes name, dob, bloodType",                          "weight": 0.12, "match": { "type": "entity", "name": "patient", "keyAttribute": "pnr" } },
            { "id": "ent_hospital",    "label": "Entity set Hospital with key code and attributes name, address",                                "weight": 0.1,  "match": { "type": "entity", "name": "hospital", "keyAttribute": "code" } },
            { "id": "ent_treatment",   "label": "Entity set Treatment with key code and attributes name, fee",                                   "weight": 0.1,  "match": { "type": "entity", "name": "treatment", "keyAttribute": "code" } },
            { "id": "ent_ward_weak",   "label": "Weak entity Ward (identified by Hospital + ward number)",                                       "weight": 0.12, "match": { "type": "entity", "name": "ward", "weak": true } },
            { "id": "rel_directs",     "label": "Relationship 'directs' between Hospital (1..1) and Doctor (0..1) for medical director",         "weight": 0.1,  "match": { "type": "relationship", "name": "directs", "connects": ["hospital", "doctor"] } },
            { "id": "rel_works_in",    "label": "Relationship 'works_in' between Doctor (1..*) and Hospital (1..*) with attribute contractType", "weight": 0.1,  "match": { "type": "relationship", "name": "works_in", "connects": ["doctor", "hospital"] } },
            { "id": "rel_registered",  "label": "Relationship 'registered_at' between Patient (1..*) and Hospital (1..1)",                       "weight": 0.08, "match": { "type": "relationship", "name": "registered_at", "connects": ["patient", "hospital"] } },
            { "id": "ter_treats",      "label": "Ternary relationship 'treats' among Doctor, Patient, Treatment with attributes date, dosage",   "weight": 0.15, "match": { "type": "relationship", "name": "treats" } },
            { "id": "rel_admitted",    "label": "Relationship 'admitted_to' between Patient and Ward with attributes admissionDate, dischargeDate", "weight": 0.08, "match": { "type": "relationship", "name": "admitted_to", "connects": ["patient", "ward"] } },
            { "id": "rec_nextofkin",   "label": "Recursive relationship 'next_of_kin' on Patient (contact patient)",                             "weight": 0.05, "match": { "type": "relationship", "name": "next_of_kin", "connects": ["patient", "patient"] } },
            { "id": "isa_person",      "label": "isA hierarchy: Person → Doctor, Patient (shared attributes lifted to Person)",                  "weight": 0.08, "match": { "type": "isA", "super": "person", "subs": ["doctor", "patient"] } }
          ],
          "modelAnswer": "Entities (strong, unless noted):\n  • Person (supertype): name, dateOfBirth, address\n      ↳ Doctor (subtype): LIC (key), age, specialty\n      ↳ Patient (subtype): PNR (key), bloodType\n  • Hospital: code (key), name, address\n  • Treatment: code (key), name, fee\n  • Ward (WEAK, identified by its Hospital): wardNumber (discriminator), name, bedCount\n\nRelationships:\n  • directs : Hospital(1..1) — Doctor(0..1)   -- medical director\n  • works_in : Doctor(1..*) — Hospital(1..*) with attribute contractType\n  • registered_at : Patient(*) — Hospital(1)\n  • treats : ternary among Doctor, Patient, Treatment with attributes date, dosage\n        (key is the full triple plus date because the same patient may receive the same treatment from different doctors on different days)\n  • admitted_to : Patient(*) — Ward(*) with attributes admissionDate, dischargeDate\n        (key includes admissionDate because the same patient may be re-admitted to the same ward)\n  • next_of_kin : recursive on Patient (contact patient), 0..1 — 0..*\n\nKey design choices:\n  – isA hierarchy on Person avoids repeating name/dob/address for both doctors and patients (overlapping in principle is allowed; the scenario does not imply disjointness).\n  – Ward is modelled as a weak entity because its number is unique only within its hospital; the identifying relationship to Hospital is drawn with a double-line diamond.\n  – treats is ternary, not three binary relationships, because date and dosage depend simultaneously on doctor, patient, and treatment.\n  – Multiple admissions of the same patient to the same ward require admissionDate to be part of the relationship's key (or to introduce an Admission weak entity).",
          "explanation": "The trickiest modelling decisions are (i) recognising that the (date, dosage) tuple is functionally dependent on the triple (doctor, patient, treatment) and therefore demands a ternary relationship; (ii) modelling Ward as a weak entity because its number is only locally unique; and (iii) deciding whether to introduce the Person supertype — it pays off whenever shared attributes are non-trivial and querying across all persons makes sense."
        },
        {
          "id": "1b",
          "label": "Question 1(b)",
          "prompt": "Give the associated relational schema. Indicate primary keys (underline by writing _attr_) and foreign keys (→ Relation). Comment on any attributes that may be NULL and on the constraints a relational database could check (including candidate keys).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "rel_doctor",      "label": "doctor(_lic_, name, dob, address, age, specialty)",                                                             "weight": 0.08 },
            { "id": "rel_patient",     "label": "patient(_pnr_, name, dob, address, bloodType, contactPatient → patient, homeHospital → hospital)",              "weight": 0.1  },
            { "id": "rel_hospital",    "label": "hospital(_code_, name, address, director → doctor)",                                                            "weight": 0.08 },
            { "id": "rel_treatment",   "label": "treatment(_code_, name, fee)",                                                                                  "weight": 0.06 },
            { "id": "rel_ward",        "label": "ward(_hospital → hospital, wardNumber_, name, bedCount) — composite PK including FK to hospital",               "weight": 0.1  },
            { "id": "rel_works_in",    "label": "worksIn(_lic → doctor, code → hospital_, contractType)",                                                        "weight": 0.08 },
            { "id": "rel_treats",      "label": "treats(_lic → doctor, pnr → patient, treatmentCode → treatment, date_, dosage)",                                "weight": 0.12 },
            { "id": "rel_admitted",    "label": "admittedTo(_pnr → patient, hospital → hospital, wardNumber, admissionDate_, dischargeDate)",                    "weight": 0.1  },
            { "id": "nullable_comment","label": "Mentions that contactPatient and dischargeDate may be NULL; director may be NULL while a hospital has no director; ward's (hospital,wardNumber) is a FK pair", "weight": 0.1  },
            { "id": "constraints",     "label": "Mentions DB-enforceable constraints: NOT NULL on mandatory FKs, UNIQUE on (hospital, name) for ward if desired, CHECK that contactPatient ≠ pnr, FK ON DELETE CASCADE for ward when its hospital is removed", "weight": 0.1  }
          ],
          "modelAnswer": "Relational schema (PKs in _underscores_, FKs marked with →):\n\n  doctor(_lic_, name, dob, address, age, specialty)\n  patient(_pnr_, name, dob, address, bloodType,\n          contactPatient → patient,\n          homeHospital → hospital)\n  hospital(_code_, name, address,\n           director → doctor)\n  treatment(_code_, name, fee)\n  ward(_hospital → hospital, wardNumber_, name, bedCount)\n  worksIn(_lic → doctor, code → hospital_, contractType)\n  treats(_lic → doctor, pnr → patient, treatmentCode → treatment, date_, dosage)\n  admittedTo(_pnr → patient, hospital, wardNumber, admissionDate_, dischargeDate)\n      with (hospital, wardNumber) → ward as a composite FK\n\nNULLable attributes and constraints:\n  • patient.contactPatient is NULLable (a brand-new patient may not yet have declared next-of-kin); declare CHECK (contactPatient <> pnr).\n  • hospital.director may temporarily be NULL between two directors; alternatively keep it NOT NULL and require any deletion of a doctor first to reassign directorships.\n  • admittedTo.dischargeDate is NULLable while the patient is still admitted.\n  • Composite FK (admittedTo.hospital, admittedTo.wardNumber) → ward must be declared together.\n  • Mandatory NOT NULLs: patient.homeHospital, worksIn.contractType, ward.bedCount, treats.dosage.\n  • Candidate keys: every relation listed has exactly one minimal key (the underlined attributes). Additionally, (hospital, name) on ward could be declared UNIQUE if ward names are unique within a hospital.\n  • Referential integrity for ward should be ON DELETE CASCADE so that removing a hospital removes its wards (matching the weak-entity semantics).\n\nDesign note on 'directs': the 1..1 medical-director relationship is folded into hospital.director rather than kept as a separate table — this naturally enforces the 1-on-the-hospital-side. The 0..1 on the doctor side (a doctor may or may not direct a hospital) is enforced by adding a UNIQUE constraint on hospital.director if we want to forbid a doctor directing more than one hospital.",
          "explanation": "The main translation choices: (1) fold 1..1 relationships into one of the participating entities via an FK; (2) make worksIn a separate relation because it has its own attribute (contractType) and is many-to-many; (3) ward becomes a relation whose PK includes the FK to its hospital (weak entity → identifying-relationship attribute joins the key); (4) ternary treats becomes a relation whose PK is the union of all three FKs plus 'date' to allow repeated treatments over time."
        }
      ]
    },
    {
      "id": "2",
      "title": "2 Normalization",
      "intro": "Given R(A, B, C, D, E) and the set of functional dependencies\n\n    F = { AB → C,  A → D,  D → E,  CE → B,  A → B }.\n\nShow your intermediate steps in all the answers below.",
      "subquestions": [
        {
          "id": "2a",
          "label": "Question 2(a)",
          "prompt": "Is F canonical (a minimal basis)? If not, make it so. Give the canonical set of FDs, one per line.",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["A->C", "A->D", "D->E", "CE->B"],
            "acceptedVariants": ["A→C", "A→D", "D→E", "CE→B"]
          },
          "rubric": [
            { "id": "step_split",     "label": "Splits RHSs so that every FD has a single attribute on the RHS",                                  "weight": 0.2 },
            { "id": "step_lhs_reduce","label": "Reduces LHS of AB→C to A→C by showing B is extraneous (A+ already contains B via A→B, then C follows)", "weight": 0.3 },
            { "id": "step_drop_ab",   "label": "Drops A→B as redundant (A+ without A→B still contains B via A→D→E and CE→B... actually via A→C, A→D, D→E giving CE, then CE→B)", "weight": 0.3 },
            { "id": "final_set",      "label": "Final canonical set is exactly { A→C, A→D, D→E, CE→B }",                                            "weight": 0.2 }
          ],
          "modelAnswer": "Step 1 — single attributes on every RHS:\n   All four original FDs already have single-attribute RHSs; only the LHSs need attention.\n\nStep 2 — eliminate extraneous attributes from LHSs:\n   Consider AB → C. Is B extraneous? Compute A+ under F: A+ = {A}; apply A→D ⇒ {A,D}; apply D→E ⇒ {A,D,E}; apply A→B ⇒ {A,B,D,E}; apply AB→C ⇒ {A,B,C,D,E}. So {A}+ = ABCDE ⊇ {C}, meaning B is extraneous in AB→C. Replace it with A → C.\n   For all other FDs the LHS is a single attribute, so nothing to reduce.\n\nWorking set: { A→C, A→D, D→E, CE→B, A→B }.\n\nStep 3 — drop redundant FDs (test each one for removal):\n   • Drop A → B?  Compute A+ under F \\ {A→B}: A+ = {A}; A→C ⇒ {A,C}; A→D ⇒ {A,C,D}; D→E ⇒ {A,C,D,E}; CE→B ⇒ {A,B,C,D,E}. So B is still derivable, A→B is redundant.\n   • Drop A → C? A+ under F \\ {A→C, A→B} = {A}; A→D ⇒ {A,D}; D→E ⇒ {A,D,E}. C not reachable. NOT redundant.\n   • Drop A → D? A+ under remaining set = {A,C}; no way to get D. NOT redundant.\n   • Drop D → E? D+ = {D}; no way to get E. NOT redundant.\n   • Drop CE → B? C+ ∪ E+ does not give B. NOT redundant.\n\nFinal canonical set:\n   F* = { A → C,  A → D,  D → E,  CE → B }.",
          "explanation": "Canonicalisation = (1) make every RHS a single attribute, (2) remove extraneous LHS attributes, (3) iteratively drop any FD whose RHS is still implied by the rest. The interesting moves here were spotting that B is extraneous in AB→C (because A already implies B transitively) and that A→B itself is therefore redundant once the chain A→C, A→D, D→E, CE→B is in place."
        },
        {
          "id": "2b",
          "label": "Question 2(b)",
          "prompt": "What are the minimal (candidate) keys of R(A, B, C, D, E)?",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["{A}"],
            "acceptedVariants": ["A", "(A)"]
          },
          "rubric": [
            { "id": "method",          "label": "Uses the 'attributes that never appear on a RHS must be in every key' rule",                                 "weight": 0.4 },
            { "id": "closure",         "label": "Computes A+ = ABCDE and concludes {A} is a superkey",                                                          "weight": 0.4 },
            { "id": "unique_minimal",  "label": "Argues {A} is the unique minimal key (no proper subset can be a key, and no other attribute set is needed)",   "weight": 0.2 }
          ],
          "modelAnswer": "Optimised candidate-key algorithm.\n\nLook at the canonical set F* = { A→C, A→D, D→E, CE→B }.\n  • Attributes never on the RHS of any FD: only A.\n  • Attributes always derivable: B (via CE→B), C (via A→C), D (via A→D), E (via D→E).\n\nSince A appears in no RHS, A must be contained in every candidate key.\n\nCompute the closure of {A}:\n   A+ = {A}\n         ∪ {C}  (A→C)\n         ∪ {D}  (A→D)\n         ∪ {E}  (D→E)\n         ∪ {B}  (CE→B, since both C and E are in the set)\n       = {A,B,C,D,E}.\n\nSo {A} already determines all attributes — {A} is a superkey, and being a single attribute it is minimal.\n\nUnique minimal (candidate) key: {A}.",
          "explanation": "Because A is the only attribute that never appears on a right-hand side, it must lie in every candidate key. Then checking A+ = ABCDE confirms {A} is enough, so it is the one and only candidate key."
        },
        {
          "id": "2c",
          "label": "Question 2(c)",
          "prompt": "Is R in BCNF already? If not, decompose it into BCNF and state whether any FDs were lost.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "bcnf_diagnosis", "label": "Correctly diagnoses that R is not in BCNF because D→E and CE→B have non-superkey LHSs", "weight": 0.25 },
            { "id": "split_step",     "label": "Performs at least one valid BCNF split (e.g. splits out R1(D,E) for D→E)",                "weight": 0.25 },
            { "id": "final_decomp",   "label": "Reaches a correct BCNF decomposition such as R1(D,E), R2(A,C,D), R3(A,B)",                "weight": 0.3  },
            { "id": "fd_lost",        "label": "Identifies that CE → B is lost in the BCNF decomposition",                                "weight": 0.2  }
          ],
          "modelAnswer": "BCNF check. The unique key is {A}, so every BCNF FD must have a LHS that contains A.\n   • A → C    LHS contains A           OK\n   • A → D    LHS contains A           OK\n   • D → E    LHS = D, no A            VIOLATES BCNF\n   • CE → B   LHS = CE, no A           VIOLATES BCNF\n\nSo R is NOT in BCNF.\n\nDecomposition (one valid order):\n\n   Step 1. Split on D → E (maximise RHS first: D→E stays D→E).\n      R1(D, E)   with FD  D → E,  key = D    -- BCNF ✓\n      Remaining R' = (A, B, C, D)\n      Project F* onto R': A→C, A→D survive. CE→B requires E, which is not in R', so it does not project.\n      The relation R'(A,B,C,D) has key {A} (since A+ in R' = {A,B,C,D} once we add A→B from… wait, A→B is no longer in F*).\n      In fact in R', without CE→B and without A→B, B is not determined by A. So the key of R' is {A,B}.\n\n   Step 2. R'(A,B,C,D) with FDs { A→C, A→D } and key {A,B}.\n      A → C violates BCNF (A is not a superkey of R'). Split:\n      R2(A, C, D)   with FDs A→C, A→D, key = A   -- BCNF ✓\n      R3(A, B)      no non-trivial FDs, key = (A,B) -- BCNF ✓\n\nFinal BCNF schema:\n   R1(D, E),   R2(A, C, D),   R3(A, B).\n\nFD preservation:\n   • A → C  enforceable in R2 ✓\n   • A → D  enforceable in R2 ✓\n   • D → E  enforceable in R1 ✓\n   • CE → B LOST — C lives in R2, E in R1, B in R3, so this FD cannot be enforced inside any single sub-relation.\n\nSo BCNF decomposition is lossless-join but loses CE → B.",
          "explanation": "The classic BCNF/FD-preservation trade-off: every BCNF decomposition is lossless-join, but some FDs (here CE→B) may be split across relations and become un-enforceable without joins. Compare this with the 3NF synthesis in 2(d), which keeps everything."
        },
        {
          "id": "2d",
          "label": "Question 2(d)",
          "prompt": "Is R in 3NF already? If not, decompose it into 3NF.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "threenf_diagnosis", "label": "Argues R is not in 3NF: no FD's RHS is contained in a candidate key, and several LHSs are not superkeys", "weight": 0.25 },
            { "id": "synthesis_method",  "label": "Applies the synthesis algorithm — one relation per FD in the canonical cover (or per group with common LHS)", "weight": 0.3  },
            { "id": "key_relation",      "label": "Adds a relation containing a candidate key (e.g. ensures {A} appears as a key in some relation)",         "weight": 0.2  },
            { "id": "final_decomp",      "label": "Reaches { R1(A,C,D), R2(D,E), R3(C,E,B) } or equivalent, all FDs preserved",                              "weight": 0.25 }
          ],
          "modelAnswer": "3NF check. R is in 3NF iff for every non-trivial FD X → Y in F*, either X is a superkey or every attribute in Y belongs to some candidate key. The unique candidate key is {A}, so the only 'prime' attribute is A.\n   • A → C : RHS = C, not prime, and A is a superkey — OK\n   • A → D : RHS = D, not prime, and A is a superkey — OK\n   • D → E : RHS = E, not prime, and D is NOT a superkey — VIOLATES 3NF\n   • CE → B : RHS = B, not prime, and CE is NOT a superkey — VIOLATES 3NF\n\nSo R is NOT in 3NF.\n\n3NF synthesis from the canonical cover F* = { A→C, A→D, D→E, CE→B }:\n\n   Step 1. Group FDs with the same LHS and make one relation per group:\n      {A→C, A→D}      ⇒  R1(A, C, D)   with key A\n      {D→E}           ⇒  R2(D, E)      with key D\n      {CE→B}          ⇒  R3(C, E, B)   with key (C,E)\n\n   Step 2. Ensure at least one relation contains a candidate key of R.\n      The candidate key is {A}. R1 already contains A as its key, so we are done — no extra relation needed.\n\n   Step 3. Remove any relation whose attributes are a subset of another's. None here.\n\nFinal 3NF schema:\n   R1(A, C, D),   R2(D, E),   R3(C, E, B).\n\nProperties:\n   • Lossless join: guaranteed because R1 contains the key {A} of the original relation.\n   • FD preservation: all four FDs of F* are enforceable inside a single relation\n        A→C in R1, A→D in R1, D→E in R2, CE→B in R3.\n\nNote that 3NF preserved CE → B which BCNF could not, at the cost of allowing a transitive dependency through the schema as a whole.",
          "explanation": "3NF synthesis is mechanical: one relation per FD-group of the canonical cover, plus a key-bearing relation if none of the generated ones already contains a key. It always yields a lossless and FD-preserving decomposition — that is the practical advantage over BCNF whenever the two differ."
        }
      ]
    },
    {
      "id": "3",
      "title": "3 SQL",
      "intro": "Consider the following schema (primary keys underlined, arrows indicate foreign-key references):\n\n    Suppliers( _sid_ , sname, saddress )\n    Parts    ( _pid_ , pname, color )\n    Catalog  ( _sid → Suppliers, pid → Parts_ , cost )\n\nFormulate the queries below in SQL. You will only obtain full marks if your answers avoid GROUP BY in favour of existential quantification (EXISTS / NOT EXISTS).",
      "subquestions": [
        {
          "id": "3a",
          "label": "Question 3(a)",
          "prompt": "Find the sids of suppliers that supply at least two different red parts.",
          "type": "sql",
          "datasetId": "suppliers_parts_catalog",
          "points": 1.0,
          "tables": [
            { "name": "Suppliers", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true },
              { "name": "sname", "type": "VARCHAR" },
              { "name": "saddress", "type": "VARCHAR" }
            ]},
            { "name": "Parts", "columns": [
              { "name": "pid", "type": "INTEGER", "pk": true },
              { "name": "pname", "type": "VARCHAR" },
              { "name": "color", "type": "VARCHAR" }
            ]},
            { "name": "Catalog", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true, "fk": "Suppliers.sid" },
              { "name": "pid", "type": "INTEGER", "pk": true, "fk": "Parts.pid" },
              { "name": "cost", "type": "DECIMAL" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT DISTINCT C1.sid\nFROM Catalog C1, Parts P1\nWHERE C1.pid = P1.pid\n  AND P1.color = 'red'\n  AND EXISTS (\n      SELECT *\n      FROM Catalog C2, Parts P2\n      WHERE C2.sid = C1.sid\n        AND C2.pid = P2.pid\n        AND P2.color = 'red'\n        AND C2.pid <> C1.pid\n  );",
            "requiredPatterns": ["EXISTS", "red", "<>"]
          },
          "rubric": [
            { "id": "uses_exists",      "label": "Uses EXISTS (or a self-join) with an inequality, instead of GROUP BY / COUNT",       "weight": 0.4 },
            { "id": "filters_red",      "label": "Filters Parts.color = 'red' on both occurrences of the part",                        "weight": 0.2 },
            { "id": "two_different",    "label": "Enforces the two parts are different (C2.pid <> C1.pid)",                             "weight": 0.2 },
            { "id": "correct_result",   "label": "Query returns exactly the sids of suppliers with two or more distinct red parts",     "weight": 0.2 }
          ],
          "modelAnswer": "SELECT DISTINCT C1.sid\nFROM Catalog C1, Parts P1\nWHERE C1.pid = P1.pid\n  AND P1.color = 'red'\n  AND EXISTS (\n      SELECT *\n      FROM Catalog C2, Parts P2\n      WHERE C2.sid = C1.sid\n        AND C2.pid = P2.pid\n        AND P2.color = 'red'\n        AND C2.pid <> C1.pid\n  );",
          "explanation": "The trick is to assert that there exists a second red part supplied by the same sid that is distinct from the first one. SELECT DISTINCT is kept on the outer query because the join with Parts may produce duplicate sid rows. No GROUP BY needed."
        },
        {
          "id": "3b",
          "label": "Question 3(b)",
          "prompt": "Find the names of suppliers who supply every part whose name begins with the letter 'B'.",
          "type": "sql",
          "datasetId": "suppliers_parts_catalog",
          "points": 1.0,
          "tables": [
            { "name": "Suppliers", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true },
              { "name": "sname", "type": "VARCHAR" },
              { "name": "saddress", "type": "VARCHAR" }
            ]},
            { "name": "Parts", "columns": [
              { "name": "pid", "type": "INTEGER", "pk": true },
              { "name": "pname", "type": "VARCHAR" },
              { "name": "color", "type": "VARCHAR" }
            ]},
            { "name": "Catalog", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true, "fk": "Suppliers.sid" },
              { "name": "pid", "type": "INTEGER", "pk": true, "fk": "Parts.pid" },
              { "name": "cost", "type": "DECIMAL" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT S.sname\nFROM Suppliers S\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Parts P\n    WHERE P.pname LIKE 'B%'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Catalog C\n          WHERE C.sid = S.sid\n            AND C.pid = P.pid\n      )\n);",
            "requiredPatterns": ["NOT EXISTS", "LIKE", "B%"]
          },
          "rubric": [
            { "id": "double_neg",     "label": "Uses the double-negation pattern (NOT EXISTS … NOT EXISTS) to express universal quantification", "weight": 0.4 },
            { "id": "filter_bparts",  "label": "Correctly restricts the inner Parts loop to pname LIKE 'B%'",                                    "weight": 0.2 },
            { "id": "correlated",     "label": "Correctly correlates Catalog.sid with the outer supplier (C.sid = S.sid)",                       "weight": 0.2 },
            { "id": "correct_result", "label": "Query returns the names of suppliers who carry every B-part",                                    "weight": 0.2 }
          ],
          "modelAnswer": "SELECT S.sname\nFROM Suppliers S\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Parts P\n    WHERE P.pname LIKE 'B%'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Catalog C\n          WHERE C.sid = S.sid\n            AND C.pid = P.pid\n      )\n);",
          "explanation": "Read this as: 'there is no B-part that this supplier does NOT supply', i.e. the supplier supplies all of them. The outer NOT EXISTS turns the universal quantifier into existential form; the inner NOT EXISTS expresses 'this supplier does not supply that part'. Both EXISTS clauses are correlated through S.sid."
        }
      ]
    },
    {
      "id": "4",
      "title": "4 Transactions",
      "intro": "Two short questions on transaction theory.",
      "subquestions": [
        {
          "id": "4a",
          "label": "Question 4(a)",
          "prompt": "Explain the notion of a conflict-serializable schedule. Why is conflict-serializability a stronger requirement than view-serializability — and why do practical DBMSs nevertheless rely on it?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "def_conflict",      "label": "Defines a conflict between two operations (different transactions, same item, at least one a write)",       "weight": 0.25 },
            { "id": "def_serializable",  "label": "Defines conflict-serializability: schedule is equivalent (by swapping non-conflicting ops) to some serial order", "weight": 0.25 },
            { "id": "view_vs_conflict",  "label": "Notes that conflict-serializable ⊂ view-serializable, with the gap exactly the 'blind-write' schedules",      "weight": 0.25 },
            { "id": "why_practical",     "label": "Explains DBMSs prefer it because it is decidable in polynomial time via the precedence graph",                "weight": 0.25 }
          ],
          "modelAnswer": "Conflict and conflict-serializability.\n  Two operations are said to conflict when (1) they belong to different transactions, (2) they access the same data item, and (3) at least one of them is a write. A schedule is conflict-serializable if it can be transformed, by a sequence of swaps of adjacent NON-conflicting operations, into some serial schedule (one transaction at a time, no interleaving).\n\nRelation to view-serializability.\n  Every conflict-serializable schedule is also view-serializable, but the converse is false. The classic counter-example involves 'blind writes' (a transaction writes a value without first reading it). Such schedules can produce the same final database state as a serial order — making them view-serializable — while their precedence graph still contains a cycle, so they are not conflict-serializable.\n  Formally: conflict-serializable ⊊ view-serializable.\n\nWhy DBMSs use conflict-serializability anyway.\n  Deciding view-serializability is NP-complete, whereas conflict-serializability can be tested in O(|V|+|E|) on the precedence graph (just check for a cycle). Lock-based protocols such as 2-Phase Locking produce only conflict-serializable schedules by construction, which keeps the runtime overhead minimal and the correctness proof tractable.",
          "explanation": "Key contrast: view-serializability is the more permissive theoretical notion, but conflict-serializability is the one DBMSs actually enforce because (i) the test is fast (cycle-check on the precedence graph) and (ii) widely used protocols (S2PL, SS2PL) naturally produce only conflict-serializable schedules."
        },
        {
          "id": "4b",
          "label": "Question 4(b)",
          "prompt": "Use the precedence-graph method to decide whether the following schedule is conflict-serializable. Draw the edges of the precedence graph, list the cycles (if any), and conclude.\n\n  T1:  R(X)                  W(Y)\n  T2:        R(Y)                       W(X)\n  T3:              W(X)                              R(Y)\n\n(Time runs left-to-right; columns are time slots so the global order is T1:R(X), T2:R(Y), T3:W(X), T1:W(Y), T2:W(X), T3:R(Y).)",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "method",        "label": "States the method: build a precedence graph with one node per transaction and an edge Ti→Tj when Ti has an operation that conflicts with a later operation of Tj", "weight": 0.2  },
            { "id": "edge_t1_t3",    "label": "Identifies edge T1 → T3 (T1:R(X) before T3:W(X))",                                                   "weight": 0.15 },
            { "id": "edge_t1_t2",    "label": "Identifies edge T1 → T2 (T1:R(X) before T2:W(X), and T1:W(Y) before nothing of T2 on Y after it)",   "weight": 0.15 },
            { "id": "edge_t2_t1",    "label": "Identifies edge T2 → T1 (T2:R(Y) before T1:W(Y))",                                                   "weight": 0.15 },
            { "id": "edge_t3_t2",    "label": "Identifies edge T3 → T2 (T3:W(X) before T2:W(X))",                                                   "weight": 0.15 },
            { "id": "cycle_conclude","label": "Spots the cycle T1 → T2 → T1 (or any cycle) and concludes the schedule is NOT conflict-serializable", "weight": 0.2  }
          ],
          "modelAnswer": "Method.\n  Build a directed precedence graph G = (V, E) with V = {T1, T2, T3}. Add an edge Ti → Tj whenever Ti has an operation that occurs before — and conflicts with — a later operation of Tj. Two ops conflict if they touch the same item and at least one is a write. The schedule is conflict-serializable iff G is acyclic.\n\nConflict scan in time order:\n  T1:R(X) … T3:W(X)   ⇒  T1 → T3   (read-then-write on X)\n  T1:R(X) … T2:W(X)   ⇒  T1 → T2   (read-then-write on X)\n  T2:R(Y) … T1:W(Y)   ⇒  T2 → T1   (read-then-write on Y)\n  T3:W(X) … T2:W(X)   ⇒  T3 → T2   (write-then-write on X)\n  T1:W(Y) … T3:R(Y)   ⇒  T1 → T3   (already present)\n\nEdges of G:\n  T1 → T3\n  T1 → T2\n  T2 → T1\n  T3 → T2\n\nCycles.\n  T1 → T2 → T1  (length-2 cycle).\n  Also T1 → T3 → T2 → T1.\n\nConclusion.\n  G contains at least one cycle, therefore the schedule is NOT conflict-serializable. No serial order of {T1, T2, T3} is equivalent to it.",
          "explanation": "The precedence-graph test runs in linear time in the size of the graph. Any single cycle is enough to refute conflict-serializability; in this schedule there are two cycles, with T1 ↔ T2 being the most direct witness."
        }
      ]
    },
    {
      "id": "5",
      "title": "5 Database APIs",
      "intro": "Two short questions on how applications talk to a database.",
      "subquestions": [
        {
          "id": "5a",
          "label": "Question 5(a)",
          "prompt": "Compare the practice of assembling SQL queries as strings (concatenating user input on the fly) with the practice of using parameterised / prepared statements. Discuss security and performance.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "string_pro_flex", "label": "Notes a real advantage of string-built queries — flexibility in shaping the query at runtime",      "weight": 0.2 },
            { "id": "sqli",            "label": "Identifies SQL injection as the headline vulnerability of string concatenation",                     "weight": 0.3 },
            { "id": "prepared_perf",   "label": "Explains the performance benefit of prepared statements: parse + plan once, execute many times",     "weight": 0.25 },
            { "id": "prepared_safety", "label": "Explains that parameter values are sent out-of-band so they cannot be re-interpreted as SQL syntax",  "weight": 0.25 }
          ],
          "modelAnswer": "String-built queries.\n  The application concatenates literal SQL with values from variables or user input and sends the resulting string to the database. The advantage is flexibility: identifiers, optional WHERE clauses, dynamically chosen ORDER BY columns and similar are easy to splice in.\n\nDisadvantages.\n  • Security: any unsanitised input becomes part of the SQL grammar, so a hostile value like x' OR '1'='1 changes the meaning of the query — this is the classic SQL-injection attack. Manual escaping is fragile and easy to forget.\n  • Performance: every distinct string is parsed, semantically analysed and planned from scratch by the DBMS. Even when the same query shape is executed thousands of times with different literals, the optimiser cannot recognise it.\n\nParameterised / prepared statements.\n  The application sends a query template (e.g. SELECT * FROM Suppliers WHERE sid = ?) once; the DBMS parses, plans and caches it. At execution time only the parameter values are shipped, bound to placeholders.\n  Benefits:\n  • Security: parameters are transmitted out-of-band as typed values, not concatenated into SQL text, so they cannot escape into the SQL grammar. SQL injection through these parameters is structurally impossible.\n  • Performance: parse and plan are amortised over many executions of the same prepared statement. The DBMS can also reuse plan caches across sessions.\n\nUpshot.\n  Use prepared statements wherever the query shape is fixed. Reserve string-built queries for the rare cases where the shape itself must vary, and even then always validate identifiers against an allow-list.",
          "explanation": "The exam-friendly summary: string queries trade safety and speed for flexibility; prepared statements give you safety and (often) speed in exchange for slightly less expressive runtime shaping."
        },
        {
          "id": "5b",
          "label": "Question 5(b)",
          "prompt": "Name the three levels of the ANSI/SPARC three-level architecture. At which of those levels do object-relational mappers such as Hibernate or Entity Framework sit, and what is the purpose (function) of that level?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "three_levels", "label": "Names all three levels: external / conceptual / internal (a.k.a. external view / logical / physical)",         "weight": 0.3 },
            { "id": "orm_level",    "label": "Places ORMs at the external (highest) level — a.k.a. the conceptual view layer for an application",            "weight": 0.3 },
            { "id": "purpose",      "label": "Explains that the external level gives each application its own view, decoupling app code from schema changes", "weight": 0.4 }
          ],
          "modelAnswer": "ANSI/SPARC three levels.\n  1. External (view) level — what each individual application sees: subsets, joins, renames, projections.\n  2. Conceptual (logical) level — the global, application-independent description of the database, e.g. the relational schema.\n  3. Internal (physical) level — how the data is actually stored, indexed and accessed on disk.\n\nWhere ORMs fit.\n  ORMs such as Hibernate, JPA, the .NET Entity Framework or SQLAlchemy operate at the EXTERNAL (highest) level. They expose to the application a per-application view of the data: object classes, associations and inheritance hierarchies that match the application's domain model, while delegating the translation to the conceptual relational schema underneath.\n\nPurpose of the external level.\n  • Logical data independence: changes to the conceptual schema (add a column, split a table, rename, denormalise for performance) need not break the application — the ORM mapping is updated, but the domain classes seen by the application stay the same.\n  • Per-application customisation: different applications can have different views of the same database, exposing only the entities they need.\n  • Type safety and idiomatic access: objects, not row dictionaries, so the application can use its own language's type system and tooling.",
          "explanation": "Mnemonic: External = each application's tailored view, Conceptual = the one true relational schema, Internal = bytes on disk. ORMs live at the External level so the application can evolve independently of the underlying tables."
        }
      ]
    }
  ]
}
,
{
  "id": "mock-2",
  "title": "Mock Final 2 — University Scheduling",
  "shortTitle": "University scheduling",
  "tagline": "ER · isA · ternary · weak entity · multiple BCNF keys · EXISTS",
  "durationMinutes": 165,
  "maxPoints": 8.0,
  "gradeFormula": "score / maxPoints * 10",
  "tasks": [
    {
      "id": "1",
      "title": "1 Conceptual Design",
      "intro": "Consider the following case for a university scheduling system. Students have a student number (SNR), a name, an age and a study programme. Professors have an employee id (EID), a name, a salary and a rank (assistant, associate, full). Departments have a department number (DNR), a name and a building. Courses have a course code, a title and a credit value. Each department is chaired by exactly one professor (the chair). A professor may teach one or more courses; for every course a professor teaches, the semester in which it is taught is recorded. Every student belongs to exactly one department (their home department). Sections of a course have a section number that is unique only within that course, plus a room and a capacity; a section ceases to exist if its course is removed. Students enrol in sections, and for every enrolment we record the enrolment date and an optional drop date; the same student may enrol in the same section more than once (after dropping). When a professor assesses a student in a course, the date and the grade are recorded; the same student may be assessed for the same course by different professors on different dates (re-takes with a new examiner). Both students and professors are persons: they share name, date of birth and address. Finally, every student has another, more senior student registered as their mentor.",
      "subquestions": [
        {
          "id": "1a",
          "label": "Question 1(a)",
          "prompt": "Provide a conceptual database model in the form of an ER Diagram. Explain the most important design choices and document relevant assumptions.",
          "type": "er_diagram",
          "points": 1.5,
          "hint": "Section is a weak entity (number only locally unique within a Course → identifying relationship drawn as a double-line diamond). 'assesses' must be a ternary relationship because (date, grade) depends on professor + student + course simultaneously. The mentor link is a recursive relationship on Student.",
          "rubric": [
            { "id": "ent_student",    "label": "Entity set Student with key SNR and attributes name, age, programme",                          "weight": 0.12, "match": { "type": "entity", "name": "student", "keyAttribute": "snr" } },
            { "id": "ent_professor",  "label": "Entity set Professor with key EID and attributes name, salary, rank",                          "weight": 0.12, "match": { "type": "entity", "name": "professor", "keyAttribute": "eid" } },
            { "id": "ent_department", "label": "Entity set Department with key DNR and attributes name, building",                              "weight": 0.1,  "match": { "type": "entity", "name": "department", "keyAttribute": "dnr" } },
            { "id": "ent_course",     "label": "Entity set Course with key code and attributes title, credits",                                  "weight": 0.1,  "match": { "type": "entity", "name": "course", "keyAttribute": "code" } },
            { "id": "ent_section",    "label": "Weak entity Section (identified by Course + section number)",                                   "weight": 0.12, "match": { "type": "entity", "name": "section", "weak": true } },
            { "id": "rel_chairs",     "label": "Relationship 'chairs' between Department (1..1) and Professor (0..1)",                          "weight": 0.1,  "match": { "type": "relationship", "name": "chairs", "connects": ["department", "professor"] } },
            { "id": "rel_teaches",    "label": "Relationship 'teaches' between Professor (1..*) and Course (1..*) with attribute semester",     "weight": 0.1,  "match": { "type": "relationship", "name": "teaches", "connects": ["professor", "course"] } },
            { "id": "rel_belongs",    "label": "Relationship 'belongs_to' between Student (1..*) and Department (1..1)",                        "weight": 0.08, "match": { "type": "relationship", "name": "belongs_to", "connects": ["student", "department"] } },
            { "id": "ter_assesses",   "label": "Ternary relationship 'assesses' among Professor, Student, Course with attributes date, grade",  "weight": 0.15, "match": { "type": "relationship", "name": "assesses" } },
            { "id": "rel_enrolled",   "label": "Relationship 'enrolled_in' between Student and Section with attributes enrolDate, dropDate",    "weight": 0.08, "match": { "type": "relationship", "name": "enrolled_in", "connects": ["student", "section"] } },
            { "id": "rec_mentor",     "label": "Recursive relationship 'mentor' on Student (more senior student)",                              "weight": 0.05, "match": { "type": "relationship", "name": "mentor", "connects": ["student", "student"] } },
            { "id": "isa_person",     "label": "isA hierarchy: Person → Student, Professor (shared name, dob, address)",                        "weight": 0.08, "match": { "type": "isA", "super": "person", "subs": ["student", "professor"] } }
          ],
          "modelAnswer": "Entities:\n  • Person (supertype): name, dob, address\n      ↳ Student: SNR (key), age, programme\n      ↳ Professor: EID (key), salary, rank\n  • Department: DNR (key), name, building\n  • Course: code (key), title, credits\n  • Section (WEAK, identified by Course): sectionNumber (discriminator), room, capacity\n\nRelationships:\n  • chairs : Department(1..1) — Professor(0..1)\n  • teaches : Professor(1..*) — Course(1..*) with attribute semester\n  • belongs_to : Student(*) — Department(1)\n  • assesses : ternary among Professor, Student, Course with attributes date, grade\n        (key = Professor + Student + Course + date — same student may be re-examined)\n  • enrolled_in : Student(*) — Section(*) with attributes enrolDate, dropDate\n        (key includes enrolDate to allow re-enrolment after dropping)\n  • mentor : recursive on Student, 0..1 — 0..*\n\nKey design choices:\n  – Person supertype avoids repeating name/dob/address for both subtypes; the scenario does not force disjointness.\n  – Section is weak because its number is unique only within a course; the identifying relationship to Course is drawn with a double-line diamond.\n  – assesses is ternary because (date, grade) depends simultaneously on three entities; splitting it into three binaries would lose this functional dependency.\n  – Including enrolDate in the key of enrolled_in supports repeated enrolments of the same student in the same section.",
          "explanation": "Two diagnostic checks: (i) does the attribute on a candidate relationship depend on ALL participating entities? If yes → ternary, not three binaries (assesses). (ii) Is the identifier locally unique (section number within a course)? If yes → weak entity. Recursive mentor link is a single relationship with two roles on Student."
        },
        {
          "id": "1b",
          "label": "Question 1(b)",
          "prompt": "Give the associated relational schema. Indicate primary keys (underline by writing _attr_) and foreign keys (→ Relation). Comment on any attributes that may be NULL and on the constraints a relational database could check (including candidate keys).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "rel_student",      "label": "student(_snr_, name, dob, address, age, programme, mentor → student, homeDept → department)",         "weight": 0.1  },
            { "id": "rel_professor",    "label": "professor(_eid_, name, dob, address, salary, rank)",                                                   "weight": 0.08 },
            { "id": "rel_department",   "label": "department(_dnr_, name, building, chair → professor)",                                                 "weight": 0.08 },
            { "id": "rel_course",       "label": "course(_code_, title, credits)",                                                                       "weight": 0.06 },
            { "id": "rel_section",      "label": "section(_course → course, sectionNumber_, room, capacity) — composite PK including FK to course",      "weight": 0.1  },
            { "id": "rel_teaches",      "label": "teaches(_eid → professor, code → course_, semester)",                                                  "weight": 0.08 },
            { "id": "rel_assesses",     "label": "assesses(_eid → professor, snr → student, code → course, date_, grade)",                              "weight": 0.12 },
            { "id": "rel_enrolled",     "label": "enrolledIn(_snr → student, course, sectionNumber, enrolDate_, dropDate) with composite FK to section",  "weight": 0.1  },
            { "id": "nullable_comment", "label": "Notes mentor and dropDate may be NULL; chair may be NULL between two chairs; the (course, sectionNumber) FK in enrolledIn is composite", "weight": 0.1  },
            { "id": "constraints",      "label": "Mentions DB-enforceable constraints: NOT NULL on mandatory FKs, CHECK (mentor ≠ snr), ON DELETE CASCADE so deleting a course removes its sections", "weight": 0.1  }
          ],
          "modelAnswer": "Relational schema (PKs in _underscores_, FKs marked with →):\n\n  student(_snr_, name, dob, address, age, programme,\n          mentor → student,\n          homeDept → department)\n  professor(_eid_, name, dob, address, salary, rank)\n  department(_dnr_, name, building,\n             chair → professor)\n  course(_code_, title, credits)\n  section(_course → course, sectionNumber_, room, capacity)\n  teaches(_eid → professor, code → course_, semester)\n  assesses(_eid → professor, snr → student, code → course, date_, grade)\n  enrolledIn(_snr → student, course, sectionNumber, enrolDate_, dropDate)\n     with (course, sectionNumber) → section as composite FK\n\nNULLable / constraint notes:\n  • student.mentor is NULLable (a first-year may have none); CHECK (mentor <> snr).\n  • department.chair is NULLable while a chair seat is vacant.\n  • enrolledIn.dropDate is NULLable while the student is still enrolled.\n  • Composite FK (enrolledIn.course, enrolledIn.sectionNumber) → section must be declared together.\n  • Section's identifying FK to Course should be ON DELETE CASCADE (matches weak-entity semantics).\n  • Mandatory NOT NULL: student.homeDept, teaches.semester, section.capacity, assesses.grade.",
          "explanation": "The decisive moves: fold the 1..1 'chairs' into department.chair via a FK; promote 'teaches' to its own relation because it carries semester; weak Section's PK is (course, sectionNumber), the FK to Course participating in the PK; the ternary assesses becomes a relation whose PK is the union of the three FKs plus date."
        }
      ]
    },
    {
      "id": "2",
      "title": "2 Normalization",
      "intro": "Given R(A, B, C, D, E) and the set of functional dependencies\n\n    F = { AB → C,  B → D,  D → E,  AE → B }.\n\nShow your intermediate steps in all answers below.",
      "subquestions": [
        {
          "id": "2a",
          "label": "Question 2(a)",
          "prompt": "Is F canonical (a minimal basis)? If not, make it so. Give the canonical set of FDs, one per line.",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["AB->C", "B->D", "D->E", "AE->B"],
            "acceptedVariants": ["AB→C", "B→D", "D→E", "AE→B"]
          },
          "rubric": [
            { "id": "step_split",      "label": "Splits RHSs so every FD has a single attribute on the RHS", "weight": 0.2 },
            { "id": "step_lhs_reduce", "label": "Verifies no LHS attribute is extraneous (e.g. checks A+ and B+ before keeping AB→C; checks A+, E+ before keeping AE→B)", "weight": 0.3 },
            { "id": "step_redundant",  "label": "Checks each FD for redundancy and confirms none is redundant", "weight": 0.3 },
            { "id": "final_set",       "label": "Final canonical set is exactly { AB→C, B→D, D→E, AE→B }", "weight": 0.2 }
          ],
          "modelAnswer": "Step 1 — single attribute RHSs: already satisfied for all four FDs.\n\nStep 2 — extraneous LHS attributes:\n   AB→C : is A extraneous? B+ = {B,D,E} (B→D, D→E), does not contain C. So A is NOT extraneous. Is B extraneous? A+ = {A}, no FD fires, does not contain C. So B is NOT extraneous. Keep AB→C.\n   AE→B : is A extraneous? E+ = {E}. Does not contain B. NOT extraneous. Is E extraneous? A+ = {A}. NOT extraneous. Keep AE→B.\n   B→D, D→E : single attribute on LHS — nothing to check.\n\nStep 3 — redundancy test (drop one FD at a time and check if its RHS is still derivable):\n   Drop AB→C? AB+ in F\\{AB→C} = {A,B,D,E}; C not derivable. NOT redundant.\n   Drop B→D? B+ in F\\{B→D} = {B}; D not derivable. NOT redundant.\n   Drop D→E? D+ in F\\{D→E} = {D}; E not derivable. NOT redundant.\n   Drop AE→B? AE+ in F\\{AE→B} = {A,E}; B not derivable. NOT redundant.\n\nCanonical cover: F* = { AB→C, B→D, D→E, AE→B } — unchanged.",
          "explanation": "Canonicalisation has three sub-steps: split RHSs, eliminate extraneous LHS attributes, then drop redundant FDs. Here the input was already canonical, so the value of the exercise is in DEMONSTRATING the three checks rather than rewriting F."
        },
        {
          "id": "2b",
          "label": "Question 2(b)",
          "prompt": "What are the minimal (candidate) keys of R(A, B, C, D, E)?",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["{A,B}", "{A,D}", "{A,E}"],
            "acceptedVariants": ["AB,AD,AE", "{AB},{AD},{AE}"]
          },
          "rubric": [
            { "id": "must_include", "label": "Argues A appears on no RHS, so A must be in every candidate key", "weight": 0.3 },
            { "id": "closures",     "label": "Computes the closures (AB)+, (AD)+, (AE)+ and shows each equals R", "weight": 0.4 },
            { "id": "minimality",   "label": "Verifies these three sets are MINIMAL (no proper subset is a superkey) and lists all three keys", "weight": 0.3 }
          ],
          "modelAnswer": "A never appears on a right-hand side of any FD ⇒ A is in every candidate key. Compute closures of A together with one extra attribute.\n\n   A+ = {A}                                — not a superkey.\n   (AB)+ : {A,B} ∪ {C} (AB→C) ∪ {D} (B→D) ∪ {E} (D→E) = ABCDE   ✓ superkey, and B is not extraneous (A+ ≠ ABCDE), so {A,B} is minimal.\n   (AD)+ : {A,D} ∪ {E} (D→E) ∪ {B} (AE→B) ∪ {C} (AB→C) = ABCDE   ✓ minimal.\n   (AE)+ : {A,E} ∪ {B} (AE→B) ∪ {D} (B→D) ∪ {C} (AB→C) = ABCDE   ✓ minimal.\n   (AC)+ : {A,C} — no FD fires on a strict subset of {A,C}. Not a superkey.\n\nMinimal candidate keys: { A,B }, { A,D }, { A,E }.",
          "explanation": "When several attributes are missing from every RHS, every minimal key must contain them; here only A qualifies. Then pair A with each remaining 'entry point' (a LHS in F) to see which extensions reach a full closure."
        },
        {
          "id": "2c",
          "label": "Question 2(c)",
          "prompt": "Is R in BCNF already? If not, decompose it into BCNF and state whether any FDs were lost.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "bcnf_diagnosis", "label": "Diagnoses that B→D and D→E violate BCNF (neither B nor D is a superkey)", "weight": 0.25 },
            { "id": "split_step",     "label": "Performs a valid BCNF split (e.g. on D→E or on B→D)",                       "weight": 0.25 },
            { "id": "final_decomp",   "label": "Reaches a correct BCNF decomposition such as R1(D,E), R2(B,D), R3(A,B,C)",  "weight": 0.3  },
            { "id": "fd_lost",        "label": "Identifies that AE→B is lost in this decomposition",                        "weight": 0.2  }
          ],
          "modelAnswer": "BCNF check. Keys are {AB},{AD},{AE}; every BCNF FD must have a superkey on its LHS.\n   AB→C : AB is a key   ✓\n   B→D  : B+ = {B,D,E}, NOT a superkey   ✗ violates\n   D→E  : D+ = {D,E}, NOT a superkey      ✗ violates\n   AE→B : AE is a key   ✓\n\nDecomposition:\n   Step 1 — split on D→E: R1(D, E) with FD D→E, key D — BCNF ✓.\n      Remaining R'(A,B,C,D) with projected FDs { AB→C, B→D }. Keys of R': (AB)+={A,B,C,D} ⇒ key AB. (Other candidates fail.)\n   Step 2 — BCNF check R': B→D has B+ in R' = {B,D}, not a superkey. Split on B→D: R2(B,D), R3(A,B,C).\n      R2: key B — BCNF ✓.\n      R3: only FD AB→C, key AB — BCNF ✓.\n\nFinal BCNF schema: R1(D, E), R2(B, D), R3(A, B, C).\nFD preservation:\n   • AB→C in R3 ✓\n   • B→D in R2 ✓\n   • D→E in R1 ✓\n   • AE→B has A in R3, E in R1, B spread across R2 and R3 — LOST.\n\nLossless-join holds (every split was on a determinant), but AE→B is not enforceable inside any single relation.",
          "explanation": "BCNF is always lossless but is not always FD-preserving. Here decomposing on the chain B→D→E unavoidably scatters the attributes of AE→B across three relations."
        },
        {
          "id": "2d",
          "label": "Question 2(d)",
          "prompt": "Is R in 3NF already? If not, decompose it into 3NF.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "threenf_diagnosis", "label": "Argues R is not in 3NF: B→D and D→E have non-superkey LHSs and their RHSs are not prime", "weight": 0.25 },
            { "id": "synthesis_method",  "label": "Applies synthesis: one relation per FD-group of the canonical cover",                     "weight": 0.3  },
            { "id": "key_relation",      "label": "Includes a relation containing a candidate key of R (no extra needed if one is present)", "weight": 0.2  },
            { "id": "final_decomp",      "label": "Reaches { R1(A,B,C), R2(B,D), R3(D,E), R4(A,E,B) } or equivalent — all FDs preserved",    "weight": 0.25 }
          ],
          "modelAnswer": "3NF check. Prime attributes are A, B, D, E (each appears in some candidate key). C is not prime.\n   AB→C : RHS = C not prime, but AB is a superkey — OK.\n   B→D  : RHS = D, D is prime — OK.\n   D→E  : RHS = E, E is prime — OK.\n   AE→B : RHS = B, B is prime — OK.\n\nAll FDs satisfy the 3NF condition, so R is ALREADY in 3NF — no decomposition required.\n\nIf you were not sure and ran the synthesis anyway, you would produce one relation per FD-group plus one for the key:\n   R1(A,B,C), R2(B,D), R3(D,E), R4(A,E,B). All four are in 3NF and FDs are preserved.",
          "explanation": "Key insight: 3NF accepts FDs whose RHS attribute is itself part of some candidate key. Because every attribute except C is prime here, the only candidate for trouble is AB→C — and its LHS is a superkey, so 3NF is satisfied."
        }
      ]
    },
    {
      "id": "3",
      "title": "3 SQL",
      "intro": "Consider the following schema (primary keys underlined, arrows indicate foreign-key references):\n\n    Person ( _id_ , name, city, age )\n    Knows  ( _id1 → Person, id2 → Person_ )   -- directed 'knows' relation\n\nFormulate the queries below in SQL. You will only obtain full marks if your answers avoid GROUP BY in favour of existential quantification (EXISTS / NOT EXISTS).",
      "subquestions": [
        {
          "id": "3a",
          "label": "Question 3(a)",
          "prompt": "Find the ids of persons living in Brussels who know at least two different persons living in Antwerp.",
          "type": "sql",
          "datasetId": "persons_friends_knows_accounts",
          "points": 1.0,
          "tables": [
            { "name": "Person", "columns": [
              { "name": "id", "type": "INTEGER", "pk": true },
              { "name": "name", "type": "VARCHAR" },
              { "name": "city", "type": "VARCHAR" },
              { "name": "age", "type": "INTEGER" }
            ]},
            { "name": "Knows", "columns": [
              { "name": "id1", "type": "INTEGER", "pk": true, "fk": "Person.id" },
              { "name": "id2", "type": "INTEGER", "pk": true, "fk": "Person.id" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT DISTINCT P.id\nFROM Person P, Knows K1, Person Q1\nWHERE P.city = 'Brussels'\n  AND K1.id1 = P.id\n  AND K1.id2 = Q1.id\n  AND Q1.city = 'Antwerp'\n  AND EXISTS (\n      SELECT *\n      FROM Knows K2, Person Q2\n      WHERE K2.id1 = P.id\n        AND K2.id2 = Q2.id\n        AND Q2.city = 'Antwerp'\n        AND K2.id2 <> K1.id2\n  );",
            "requiredPatterns": ["EXISTS", "Brussels", "Antwerp", "<>"]
          },
          "rubric": [
            { "id": "uses_exists",    "label": "Uses EXISTS (or an equivalent self-join with inequality), not GROUP BY", "weight": 0.4 },
            { "id": "filters_city",   "label": "Filters Person.city = 'Brussels' on the outer and 'Antwerp' on both inner occurrences", "weight": 0.2 },
            { "id": "two_different",  "label": "Enforces the two known persons are distinct (K2.id2 <> K1.id2)",          "weight": 0.2 },
            { "id": "correct_result", "label": "Returns the ids of Brussels persons who know ≥ 2 distinct Antwerp persons", "weight": 0.2 }
          ],
          "modelAnswer": "SELECT DISTINCT P.id\nFROM Person P, Knows K1, Person Q1\nWHERE P.city = 'Brussels'\n  AND K1.id1 = P.id\n  AND K1.id2 = Q1.id\n  AND Q1.city = 'Antwerp'\n  AND EXISTS (\n      SELECT *\n      FROM Knows K2, Person Q2\n      WHERE K2.id1 = P.id\n        AND K2.id2 = Q2.id\n        AND Q2.city = 'Antwerp'\n        AND K2.id2 <> K1.id2\n  );",
          "explanation": "Anchor on one Antwerp acquaintance and assert the existence of a DIFFERENT Antwerp acquaintance for the same Brussels person. SELECT DISTINCT is used because the outer joins may produce duplicate rows for the same person."
        },
        {
          "id": "3b",
          "label": "Question 3(b)",
          "prompt": "Find the names of persons who know every person living in Brussels.",
          "type": "sql",
          "datasetId": "persons_friends_knows_accounts",
          "points": 1.0,
          "tables": [
            { "name": "Person", "columns": [
              { "name": "id", "type": "INTEGER", "pk": true },
              { "name": "name", "type": "VARCHAR" },
              { "name": "city", "type": "VARCHAR" },
              { "name": "age", "type": "INTEGER" }
            ]},
            { "name": "Knows", "columns": [
              { "name": "id1", "type": "INTEGER", "pk": true, "fk": "Person.id" },
              { "name": "id2", "type": "INTEGER", "pk": true, "fk": "Person.id" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT P.name\nFROM Person P\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Person Q\n    WHERE Q.city = 'Brussels'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Knows K\n          WHERE K.id1 = P.id\n            AND K.id2 = Q.id\n      )\n);",
            "requiredPatterns": ["NOT EXISTS", "Brussels"]
          },
          "rubric": [
            { "id": "double_neg",     "label": "Uses double-negation (NOT EXISTS … NOT EXISTS) to express universal quantification", "weight": 0.4 },
            { "id": "filter_city",    "label": "Restricts the inner Person loop to city = 'Brussels'",                                "weight": 0.2 },
            { "id": "correlated",     "label": "Correlates Knows.id1 with the outer person (K.id1 = P.id)",                           "weight": 0.2 },
            { "id": "correct_result", "label": "Returns names of persons that know every Brussels person",                            "weight": 0.2 }
          ],
          "modelAnswer": "SELECT P.name\nFROM Person P\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Person Q\n    WHERE Q.city = 'Brussels'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Knows K\n          WHERE K.id1 = P.id\n            AND K.id2 = Q.id\n      )\n);",
          "explanation": "Read it as 'there is no Brussels person Q whom P does not know'. The empty result on this particular dataset is also a valid answer — universal quantification over an empty post-filter set returns true, but here several Brussels persons exist and nobody knows all of them."
        }
      ]
    },
    {
      "id": "4",
      "title": "4 Transactions",
      "intro": "Two short questions on transaction theory.",
      "subquestions": [
        {
          "id": "4a",
          "label": "Question 4(a)",
          "prompt": "Explain Two-Phase Locking (2PL). What is the difference between basic 2PL, strict 2PL (S2PL) and rigorous (or strong-strict) 2PL (SS2PL)? Why is rigorous 2PL the default in practical DBMSs?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "def_2pl",        "label": "Defines 2PL: in each transaction every lock acquisition precedes every lock release (growing phase / shrinking phase)", "weight": 0.25 },
            { "id": "diff_variants",  "label": "Distinguishes basic 2PL (locks may be released before commit), S2PL (exclusive locks held until commit/abort), and SS2PL (ALL locks held until commit/abort)", "weight": 0.35 },
            { "id": "why_csr",        "label": "Notes that 2PL guarantees conflict-serializable schedules",                                          "weight": 0.2  },
            { "id": "practical_choice", "label": "Explains that SS2PL additionally guarantees strictness and avoids cascading aborts — that is why DBMSs default to it", "weight": 0.2  }
          ],
          "modelAnswer": "Two-Phase Locking (2PL).\n  Every transaction is divided into two phases. In the growing phase it may acquire (but not release) locks; in the shrinking phase it may release (but not acquire) locks. The lock point — the moment the first lock is released — separates them. Any schedule produced by 2PL is conflict-serializable: that is the central correctness theorem.\n\nVariants.\n  • Basic 2PL — locks may be released as soon as the shrinking phase begins, possibly long before commit. Conflict-serializable but NOT strict: another transaction may read uncommitted data and then cascade-abort.\n  • Strict 2PL (S2PL) — all EXCLUSIVE (write) locks are held until commit or abort. Reads can still be released early. S2PL guarantees strict schedules: a write of T is only visible after T commits. No cascading aborts via writes.\n  • Rigorous 2PL / Strong-Strict 2PL (SS2PL) — ALL locks (shared + exclusive) are held until commit/abort. Equivalent to commit-order serializability.\n\nWhy SS2PL in practice.\n  • Strictness (no cascading aborts) plus uniformity (one rule for all lock types) makes recovery and the lock manager simple.\n  • The serialization order coincides with the commit order, which makes deadlock detection and lock-manager reasoning straightforward.\n  • The extra concurrency that basic 2PL would offer is rarely worth the complexity in production systems.",
          "explanation": "The simple way to remember it: 'two-phase' makes the schedule conflict-serializable; 'strict' guards against cascading aborts on writes; 'rigorous' extends that guarantee to reads too so the commit order IS the serialization order."
        },
        {
          "id": "4b",
          "label": "Question 4(b)",
          "prompt": "Use the precedence-graph method to decide whether the following schedule is conflict-serializable. Draw the edges of the precedence graph, list the cycles (if any), and conclude.\n\n  T1:  R(A)              W(B)\n  T2:        W(A)              R(B)\n  T3:              R(B)              W(A)\n\nThe global order is: T1:R(A), T2:W(A), T3:R(B), T1:W(B), T2:R(B), T3:W(A).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "method",         "label": "States the precedence-graph rule (edge Ti→Tj when Ti has an operation conflicting with a later op of Tj)", "weight": 0.2  },
            { "id": "edge_t1_t2",     "label": "Identifies edge T1 → T2 (T1:R(A) before T2:W(A))",       "weight": 0.15 },
            { "id": "edge_t1_t3",     "label": "Identifies edge T1 → T3 (T1:R(A) before T3:W(A) on A, and T1:W(B) before … no, on A only)", "weight": 0.15 },
            { "id": "edge_t3_t1",     "label": "Identifies edge T3 → T1 (T3:R(B) before T1:W(B))",       "weight": 0.15 },
            { "id": "edge_t2_t3",     "label": "Identifies edge T2 → T3 (T2:W(A) before T3:W(A))",       "weight": 0.15 },
            { "id": "cycle_conclude", "label": "Spots a cycle (e.g. T1→T3→T1) and concludes the schedule is NOT conflict-serializable", "weight": 0.2  }
          ],
          "modelAnswer": "Method. Nodes V = {T1, T2, T3}. Edge Ti → Tj iff Ti has an operation that occurs before — and conflicts with — a later operation of Tj. The schedule is conflict-serializable iff the graph is acyclic.\n\nConflicts in time order:\n  T1:R(A) ... T2:W(A)   ⇒ T1 → T2  (read-then-write on A)\n  T1:R(A) ... T3:W(A)   ⇒ T1 → T3  (read-then-write on A)\n  T2:W(A) ... T3:W(A)   ⇒ T2 → T3  (write-then-write on A)\n  T3:R(B) ... T1:W(B)   ⇒ T3 → T1  (read-then-write on B)\n  T1:W(B) ... T2:R(B)   ⇒ T1 → T2  (already present)\n\nEdges: { T1→T2, T1→T3, T2→T3, T3→T1 }.\n\nCycles. T1 → T3 → T1 (length 2). Also T1 → T2 → T3 → T1.\n\nConclusion. The graph contains cycles, therefore the schedule is NOT conflict-serializable.",
          "explanation": "One cycle is enough to refute conflict-serializability. The shortest witness here is T1 ↔ T3 on items A and B — T1 reads A before T3 overwrites it, and T3 reads B before T1 overwrites it, so neither order T1→T3 nor T3→T1 is consistent with both."
        }
      ]
    },
    {
      "id": "5",
      "title": "5 Database APIs",
      "intro": "Two short questions on how applications talk to a database.",
      "subquestions": [
        {
          "id": "5a",
          "label": "Question 5(a)",
          "prompt": "What is connection pooling? Explain the problem it solves, the main configuration parameters, and at least one risk a developer must keep in mind when using a pool.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "problem_solved", "label": "Identifies the problem: opening a DB connection is expensive (TCP, auth, session state) and short requests would amortize it badly", "weight": 0.25 },
            { "id": "how_it_works",   "label": "Explains the mechanism: a pool keeps a fixed/elastic set of warm connections; requests borrow and return them",         "weight": 0.25 },
            { "id": "parameters",     "label": "Names at least two key parameters (max pool size, idle timeout, validation query, max wait)",                            "weight": 0.25 },
            { "id": "risks",          "label": "Mentions a real risk: stale session state across borrows, transaction leakage, exhaustion under load, deadlock with synchronous waits", "weight": 0.25 }
          ],
          "modelAnswer": "Why pool connections.\n  A TCP connection plus authentication plus session set-up takes tens of milliseconds. A web request that itself takes a few milliseconds would spend most of its time on connection set-up if a fresh connection were opened per request. A pool keeps a configurable number of already-authenticated connections idle; the application borrows one, uses it, and returns it.\n\nKey configuration parameters.\n  • maxPoolSize — the cap on concurrent connections. Beyond this, requests wait.\n  • minIdle / coreSize — how many warm connections to keep even at low load.\n  • idleTimeout — how long an idle connection stays in the pool before being closed.\n  • connectionTimeout / maxWait — how long a request waits for a free connection before failing.\n  • validationQuery / validationInterval — a cheap SQL (e.g. SELECT 1) used to detect dead connections.\n\nTypical risks.\n  • Stale session state: a connection borrowed by transaction B still carries the temp tables, prepared statements, search_path or autocommit state from transaction A unless the pool resets it.\n  • Transaction leakage: forgetting to commit or rollback before returning leaves the next borrower in a half-open transaction.\n  • Exhaustion: under load every request waits for a connection; if the database also blocks (locks), waiters pile up and the whole app may deadlock with itself.\n  • Long-running statements pin a pool slot — a few slow queries can stall a high-concurrency app.",
          "explanation": "The trade-off is throughput vs isolation: a pool gives you reuse, but you accept the burden of leaving each connection in a clean state. Most JDBC pools (HikariCP, c3p0) include a 'reset on return' hook precisely for this reason."
        },
        {
          "id": "5b",
          "label": "Question 5(b)",
          "prompt": "Compare embedded SQL (e.g. SQLJ, Pro*C, embedded SQL in PL/I) with call-level interfaces (e.g. JDBC, ODBC). Discuss when each approach is preferable.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "embedded_def", "label": "Defines embedded SQL: SQL statements written inline in the host language and translated by a precompiler",      "weight": 0.25 },
            { "id": "cli_def",      "label": "Defines call-level interfaces: SQL passed as strings to a runtime library (JDBC, ODBC)",                          "weight": 0.25 },
            { "id": "tradeoff",     "label": "Notes the trade-off: embedded SQL enables compile-time type checking and binding; CLIs enable runtime flexibility", "weight": 0.3  },
            { "id": "use_cases",    "label": "Mentions when each is preferable (embedded for fixed reporting, CLI for dynamic apps and middleware)",            "weight": 0.2  }
          ],
          "modelAnswer": "Embedded SQL.\n  SQL statements are written inline in the host program. A precompiler translates EXEC SQL blocks (or similar) into host-language code that calls the DB driver. Because the precompiler sees the SQL, it can verify column names, data types and even bound variables at COMPILE time. Host-language variables are 'bind' variables introduced by markers (e.g. :varName in SQLJ).\n  Advantages: compile-time type safety, optimised binding, fewer string-handling bugs, no hand-written escape logic.\n  Drawbacks: requires a precompiler in the build chain; the SQL must be known at compile time, so dynamic query construction is awkward.\n\nCall-level interfaces (CLI).\n  Examples: JDBC (Java), ODBC (C/C++), ADO.NET (C#), Python DB-API. SQL is passed as a string to a runtime function; the driver parses, plans and executes it. Parameters are sent through bind placeholders ('?' / named).\n  Advantages: runtime flexibility — the application can build different queries, change connection strings, switch drivers, introspect metadata.\n  Drawbacks: no compile-time check of SQL; the responsibility for using prepared statements (not string concatenation) and managing transactions falls on the programmer.\n\nWhen to use which.\n  • Embedded SQL fits batch jobs, reporting and stored procedures where the queries are known and stable.\n  • CLIs fit web/microservice apps with dynamic queries, ORMs layered on top, and admin/exploration tooling. Most modern applications use a CLI (often hidden behind an ORM) and reserve embedded SQL for legacy COBOL / mainframe code.",
          "explanation": "Static binding (embedded SQL) trades flexibility for early type checking. CLIs do the opposite. Modern web frameworks have largely chosen CLIs because the loss of compile-time checking is mitigated by ORM-level type checks and integration tests."
        }
      ]
    }
  ]
}
,
{
  "id": "mock-3",
  "title": "Mock Final 3 — Airline Reservations",
  "shortTitle": "Airline reservations",
  "tagline": "ER · isA · ternary · weak Terminal · chain FDs · NOT EXISTS",
  "durationMinutes": 165,
  "maxPoints": 8.0,
  "gradeFormula": "score / maxPoints * 10",
  "tasks": [
    {
      "id": "1",
      "title": "1 Conceptual Design",
      "intro": "Consider the following case for a regional airline. Passengers have a passenger number (PNR), a name, a date of birth and a frequent-flyer level (silver, gold, platinum). Pilots have a licence number (LIC), a name, an age and a rank (first officer, captain, senior captain). Airports have a code, a name and a city. Flights have a flight number, a departure time and an arrival time. Each airport is managed by exactly one pilot (the chief pilot). A pilot may operate one or more flights; for every flight a pilot operates, the role (captain / first officer) is recorded. Every passenger has exactly one airport registered as their home airport. Airports organise terminals: a terminal has a number that is unique only within its airport, plus a name and a gate count; a terminal disappears if its airport closes. When a passenger books a flight on a specific date, the seat number and the fare class are recorded; the same passenger may book the same flight on different dates (return trips, frequent commutes). Passengers may also be checked in at terminals for layovers, for which the start time and end time are recorded. Both pilots and passengers are persons: they share name, date of birth and address. Finally, every passenger has another, more senior passenger registered as their travel companion (the 'companion passenger') for emergencies.",
      "subquestions": [
        {
          "id": "1a",
          "label": "Question 1(a)",
          "prompt": "Provide a conceptual database model in the form of an ER Diagram. Explain the most important design choices and document relevant assumptions.",
          "type": "er_diagram",
          "points": 1.5,
          "hint": "Terminal is a weak entity identified by its Airport (double-line rectangle + double-line diamond). The booking relation is ternary on Passenger × Flight × Date because seat and fare depend on all three together. The companion link is a recursive relationship on Passenger.",
          "rubric": [
            { "id": "ent_passenger", "label": "Entity set Passenger with key PNR and attributes name, dob, frequentFlyerLevel",     "weight": 0.12, "match": { "type": "entity", "name": "passenger", "keyAttribute": "pnr" } },
            { "id": "ent_pilot",     "label": "Entity set Pilot with key LIC and attributes name, age, rank",                         "weight": 0.12, "match": { "type": "entity", "name": "pilot", "keyAttribute": "lic" } },
            { "id": "ent_airport",   "label": "Entity set Airport with key code and attributes name, city",                            "weight": 0.1,  "match": { "type": "entity", "name": "airport", "keyAttribute": "code" } },
            { "id": "ent_flight",    "label": "Entity set Flight with key flightNo and attributes depTime, arrTime",                   "weight": 0.1,  "match": { "type": "entity", "name": "flight", "keyAttribute": "flightno" } },
            { "id": "ent_terminal",  "label": "Weak entity Terminal (identified by Airport + terminal number)",                       "weight": 0.12, "match": { "type": "entity", "name": "terminal", "weak": true } },
            { "id": "rel_manages",   "label": "Relationship 'manages' between Airport (1..1) and Pilot (0..1)",                        "weight": 0.1,  "match": { "type": "relationship", "name": "manages", "connects": ["airport", "pilot"] } },
            { "id": "rel_operates",  "label": "Relationship 'operates' between Pilot (1..*) and Flight (1..*) with attribute role",    "weight": 0.1,  "match": { "type": "relationship", "name": "operates", "connects": ["pilot", "flight"] } },
            { "id": "rel_home",      "label": "Relationship 'home_airport' between Passenger (1..*) and Airport (1..1)",               "weight": 0.08, "match": { "type": "relationship", "name": "home_airport", "connects": ["passenger", "airport"] } },
            { "id": "ter_books",     "label": "Ternary relationship 'books' among Passenger, Flight, Date with seat, fareClass",       "weight": 0.15, "match": { "type": "relationship", "name": "books" } },
            { "id": "rel_layover",   "label": "Relationship 'waits_at' between Passenger and Terminal with attributes startTime, endTime", "weight": 0.08, "match": { "type": "relationship", "name": "waits_at", "connects": ["passenger", "terminal"] } },
            { "id": "rec_companion", "label": "Recursive relationship 'companion' on Passenger",                                       "weight": 0.05, "match": { "type": "relationship", "name": "companion", "connects": ["passenger", "passenger"] } },
            { "id": "isa_person",    "label": "isA hierarchy: Person → Pilot, Passenger (shared name, dob, address)",                  "weight": 0.08, "match": { "type": "isA", "super": "person", "subs": ["pilot", "passenger"] } }
          ],
          "modelAnswer": "Entities:\n  • Person (supertype): name, dob, address\n      ↳ Pilot: LIC (key), age, rank\n      ↳ Passenger: PNR (key), frequentFlyerLevel\n  • Airport: code (key), name, city\n  • Flight: flightNo (key), depTime, arrTime\n  • Terminal (WEAK, identified by Airport): terminalNumber, name, gateCount\n\nRelationships:\n  • manages : Airport(1..1) — Pilot(0..1)\n  • operates : Pilot(1..*) — Flight(1..*) with attribute role\n  • home_airport : Passenger(*) — Airport(1)\n  • books : ternary Passenger × Flight × Date, with seat, fareClass\n        (key = passenger + flight + date because the same passenger may book the same flight on different dates)\n  • waits_at : Passenger(*) — Terminal(*) with attributes startTime, endTime\n  • companion : recursive on Passenger, 0..1 — 0..*\n\nDesign choices:\n  – Person supertype lifts name/dob/address out of both subtypes.\n  – Terminal is weak because its number is unique only within an airport.\n  – Books is ternary, not three binaries: seat number and fare class depend simultaneously on passenger, flight and date.\n  – Multiple layovers at the same terminal demand startTime in the relationship key (or an Allocation weak entity).",
          "explanation": "Three modelling moves that earn most of the marks here: (i) ternary 'books' to express the multi-attribute dependency; (ii) Terminal as a weak entity with an identifying relationship; (iii) Person supertype so name/dob/address aren't duplicated across Pilot and Passenger."
        },
        {
          "id": "1b",
          "label": "Question 1(b)",
          "prompt": "Give the associated relational schema. Indicate primary keys (underline by writing _attr_) and foreign keys (→ Relation). Comment on any attributes that may be NULL and on the constraints a relational database could check (including candidate keys).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "rel_passenger",  "label": "passenger(_pnr_, name, dob, address, frequentFlyerLevel, companion → passenger, homeAirport → airport)", "weight": 0.1  },
            { "id": "rel_pilot",      "label": "pilot(_lic_, name, dob, address, age, rank)",                                                            "weight": 0.08 },
            { "id": "rel_airport",    "label": "airport(_code_, name, city, chiefPilot → pilot)",                                                        "weight": 0.08 },
            { "id": "rel_flight",     "label": "flight(_flightNo_, depTime, arrTime)",                                                                   "weight": 0.06 },
            { "id": "rel_terminal",   "label": "terminal(_airport → airport, terminalNumber_, name, gateCount) — composite PK including FK",             "weight": 0.1  },
            { "id": "rel_operates",   "label": "operates(_lic → pilot, flightNo → flight_, role)",                                                       "weight": 0.08 },
            { "id": "rel_books",      "label": "books(_pnr → passenger, flightNo → flight, date_, seat, fareClass)",                                     "weight": 0.12 },
            { "id": "rel_waits",      "label": "waitsAt(_pnr → passenger, airport, terminalNumber, startTime_, endTime) with composite FK to terminal",  "weight": 0.1  },
            { "id": "nullable_comment","label": "Mentions companion and chiefPilot may be NULL; endTime may be NULL while the passenger is still in transit; composite FK on terminal", "weight": 0.1  },
            { "id": "constraints",    "label": "Mentions DB constraints: NOT NULL on mandatory FKs, CHECK (companion ≠ pnr), ON DELETE CASCADE on terminal when its airport is removed", "weight": 0.1  }
          ],
          "modelAnswer": "Relational schema (PKs in _underscores_, FKs marked with →):\n\n  passenger(_pnr_, name, dob, address, frequentFlyerLevel,\n            companion → passenger,\n            homeAirport → airport)\n  pilot(_lic_, name, dob, address, age, rank)\n  airport(_code_, name, city, chiefPilot → pilot)\n  flight(_flightNo_, depTime, arrTime)\n  terminal(_airport → airport, terminalNumber_, name, gateCount)\n  operates(_lic → pilot, flightNo → flight_, role)\n  books(_pnr → passenger, flightNo → flight, date_, seat, fareClass)\n  waitsAt(_pnr → passenger, airport, terminalNumber, startTime_, endTime)\n     with (airport, terminalNumber) → terminal as composite FK\n\nNULLable / constraints:\n  • passenger.companion is NULLable; CHECK (companion <> pnr).\n  • airport.chiefPilot may be NULL between two chief pilots.\n  • waitsAt.endTime is NULLable during the layover.\n  • Mandatory NOT NULL: passenger.homeAirport, operates.role, terminal.gateCount, books.seat, books.fareClass.\n  • Terminal's identifying FK to Airport should be ON DELETE CASCADE.\n  • Additional UNIQUE candidate: (books.flightNo, books.date, books.seat) — no two passengers in the same seat on the same flight/date.",
          "explanation": "Fold 1..1 manages into airport.chiefPilot; keep operates as its own relation because it carries role; weak Terminal becomes a relation whose PK includes the FK to Airport; the ternary books becomes (pnr, flightNo, date) PK plus seat/fareClass."
        }
      ]
    },
    {
      "id": "2",
      "title": "2 Normalization",
      "intro": "Given R(A, B, C, D, E) and the set of functional dependencies\n\n    F = { A → B,  B → C,  BC → D,  C → E,  D → A }.\n\nShow your intermediate steps in all answers below.",
      "subquestions": [
        {
          "id": "2a",
          "label": "Question 2(a)",
          "prompt": "Is F canonical (a minimal basis)? If not, make it so. Give the canonical set of FDs, one per line.",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["A->B", "B->C", "B->D", "C->E", "D->A"],
            "acceptedVariants": ["A→B", "B→C", "B→D", "C→E", "D→A"]
          },
          "rubric": [
            { "id": "step_split",      "label": "Splits RHSs to a single attribute (BC→D already a single attribute on RHS)",       "weight": 0.15 },
            { "id": "extraneous",      "label": "Shows C is extraneous in BC→D (because B+ already contains C via B→C) → replace with B→D", "weight": 0.4  },
            { "id": "redundancy",      "label": "Checks every remaining FD for redundancy and confirms none is redundant",          "weight": 0.25 },
            { "id": "final_set",       "label": "Final canonical set: { A→B, B→C, B→D, C→E, D→A }",                                 "weight": 0.2  }
          ],
          "modelAnswer": "Step 1 — single RHSs: all five FDs already have one attribute on the right.\n\nStep 2 — extraneous LHS attributes:\n   BC→D : is C extraneous? Compute B+ under F = {B}; B→C ⇒ {B,C}; BC→D ⇒ {B,C,D}. So B+ contains D, meaning C is EXTRANEOUS. Replace BC→D with B→D.\n   The other FDs have a single attribute on the LHS — nothing to check.\n\nWorking set: { A→B, B→C, B→D, C→E, D→A }.\n\nStep 3 — redundancy test (one FD at a time):\n   Drop A→B? A+ without it: {A}; no FD fires (no D-FD applies without A→…→D…→A loop). B not derivable. NOT redundant.\n   Drop B→C? B+ without it: {B,D,A} (B→D, D→A). C not derivable. NOT redundant.\n   Drop B→D? B+ without it: {B,C,E,A,D…} wait let's trace: B→C: {B,C}; C→E: {B,C,E}. No D-producing FD available. NOT redundant.\n   Drop C→E? C+ without it: {C}; no FD fires. NOT redundant.\n   Drop D→A? D+ without it: {D}; no FD fires. NOT redundant.\n\nCanonical cover: F* = { A→B, B→C, B→D, C→E, D→A }.",
          "explanation": "The decisive move is the BC→D → B→D simplification: because B alone already implies C through B→C, the C on the left is redundant. After that, every remaining FD is necessary."
        },
        {
          "id": "2b",
          "label": "Question 2(b)",
          "prompt": "What are the minimal (candidate) keys of R(A, B, C, D, E)?",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["{A}", "{B}", "{D}"],
            "acceptedVariants": ["A,B,D", "{A},{B},{D}", "(A),(B),(D)"]
          },
          "rubric": [
            { "id": "closures",       "label": "Computes A+, B+, D+ and shows each closure equals ABCDE",                                "weight": 0.5  },
            { "id": "non_keys",       "label": "Shows that C+ and E+ are NOT supersets of R (so {C}, {E} are not keys)",                  "weight": 0.25 },
            { "id": "unique_minimal", "label": "Concludes the three minimal candidate keys are { A }, { B }, { D }",                      "weight": 0.25 }
          ],
          "modelAnswer": "Closures.\n   A+ = {A} ∪ {B} (A→B) ∪ {C} (B→C) ∪ {D} (B→D) ∪ {E} (C→E) = ABCDE ✓ key.\n   B+ = {B} ∪ {C,D} ∪ {E} (C→E) ∪ {A} (D→A) = ABCDE ✓ key.\n   D+ = {D} ∪ {A} (D→A) ∪ {B} (A→B) ∪ {C} (B→C) ∪ {E} (C→E) = ABCDE ✓ key.\n   C+ = {C} ∪ {E} (C→E) = {C,E}     — not a superkey.\n   E+ = {E}                          — not a superkey.\n\nMinimal candidate keys: { A }, { B }, { D }.",
          "explanation": "Because the canonical FDs form a chain A → B → C, B → D, C → E, D → A, the three nodes that can re-enter the cycle (A, B, D) are each minimal keys. C and E are 'downstream-only' and cannot reach the others on their own."
        },
        {
          "id": "2c",
          "label": "Question 2(c)",
          "prompt": "Is R in BCNF already? If not, decompose it into BCNF and state whether any FDs were lost.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "bcnf_diagnosis", "label": "Diagnoses that C→E is the only FD violating BCNF (C is not a superkey)",                   "weight": 0.3  },
            { "id": "split_step",     "label": "Performs the split on C→E correctly",                                                       "weight": 0.25 },
            { "id": "final_decomp",   "label": "Reaches { R1(C,E), R2(A,B,C,D) } and verifies both are in BCNF",                            "weight": 0.25 },
            { "id": "fd_preserved",   "label": "Notes that NO FD is lost — the decomposition is FD-preserving as well as BCNF",             "weight": 0.2  }
          ],
          "modelAnswer": "BCNF check. Keys are {A}, {B}, {D}; an FD is in BCNF iff its LHS is a superkey.\n   A→B   A is a key                ✓\n   B→C   B is a key                ✓\n   B→D   B is a key                ✓\n   C→E   C+ = {C,E}                 ✗ violates BCNF\n   D→A   D is a key                ✓\n\nDecomposition. Only C→E is a violator. Split:\n   R1(C, E) — FDs: C→E. Key C. BCNF ✓.\n   R2(A, B, C, D) — project remaining FDs: A→B, B→C, B→D, D→A. Keys of R2: (A)+={A,B,C,D}; (B)+={A,B,C,D}; (D)+={A,B,C,D}. So A, B, D are each keys. All FDs have a key on the LHS — BCNF ✓.\n\nFinal BCNF schema: R1(C, E), R2(A, B, C, D).\n\nFD preservation:\n   • A→B, B→C, B→D, D→A enforced in R2 ✓\n   • C→E enforced in R1 ✓\nNo FD is lost — this BCNF decomposition is also FD-preserving.",
          "explanation": "Lucky case: only one FD violates BCNF and that FD's LHS plus RHS sit cleanly in their own relation, so we keep both BCNF AND FD preservation. The general rule remains: BCNF is always lossless but only sometimes FD-preserving."
        },
        {
          "id": "2d",
          "label": "Question 2(d)",
          "prompt": "Is R in 3NF already? If not, decompose it into 3NF.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "threenf_diagnosis", "label": "Recognises that R is NOT in 3NF: C→E has a non-superkey LHS and E is not prime",         "weight": 0.3  },
            { "id": "prime_attrs",       "label": "Notes that prime attributes are {A, B, D}; C and E are non-prime",                       "weight": 0.2  },
            { "id": "synthesis_method",  "label": "Applies synthesis: one relation per FD-group of the canonical cover",                    "weight": 0.3  },
            { "id": "final_decomp",      "label": "Reaches an FD-preserving 3NF decomposition such as { R1(A,B), R2(B,C,D), R3(C,E), R4(D,A) }", "weight": 0.2 }
          ],
          "modelAnswer": "Prime attributes: A, B, D (each appears in a candidate key). Non-prime: C, E.\n\n3NF check.\n   A→B   B prime           ✓\n   B→C   C non-prime, but B is a key   ✓\n   B→D   D prime           ✓\n   C→E   E non-prime AND C is not a superkey   ✗ violates 3NF\n   D→A   A prime           ✓\n\nSynthesis from the canonical cover { A→B, B→C, B→D, C→E, D→A }:\n   Group by LHS:\n      {A→B}            ⇒ R1(A, B)\n      {B→C, B→D}       ⇒ R2(B, C, D)\n      {C→E}            ⇒ R3(C, E)\n      {D→A}            ⇒ R4(D, A)\n   A candidate key {A} appears in R1 already — no extra key relation needed.\n   Subsumption: none of R1..R4 is a subset of another.\n\nFinal 3NF schema: R1(A, B), R2(B, C, D), R3(C, E), R4(D, A).\nLossless (because R1 contains a key) and FD-preserving.\nThis 3NF schema is more fragmented than the BCNF one in 2(c). That is a typical observation when 3NF and BCNF are both achievable in different ways.",
          "explanation": "The general 3NF synthesis algorithm always produces a lossless, FD-preserving decomposition. Here it is more fragmented than the BCNF result because synthesis is purely mechanical from the canonical cover, whereas BCNF stayed close to the original."
        }
      ]
    },
    {
      "id": "3",
      "title": "3 SQL",
      "intro": "Consider the following schema (primary keys underlined, arrows indicate foreign-key references):\n\n    Employee( _employeeName_ , street, city )\n    Company ( _companyName, city_ )\n    Works   ( _employeeName → Employee, companyName_ , salary )\n\nFormulate the queries below in SQL. You will only obtain full marks if your answers avoid GROUP BY in favour of existential quantification (EXISTS / NOT EXISTS).",
      "subquestions": [
        {
          "id": "3a",
          "label": "Question 3(a)",
          "prompt": "Find the names of employees who work for at least two different companies.",
          "type": "sql",
          "datasetId": "employees_works_companies",
          "points": 1.0,
          "tables": [
            { "name": "Employee", "columns": [
              { "name": "employeeName", "type": "VARCHAR", "pk": true },
              { "name": "street", "type": "VARCHAR" },
              { "name": "city", "type": "VARCHAR" }
            ]},
            { "name": "Works", "columns": [
              { "name": "employeeName", "type": "VARCHAR", "pk": true, "fk": "Employee.employeeName" },
              { "name": "companyName", "type": "VARCHAR", "pk": true },
              { "name": "salary", "type": "REAL" }
            ]},
            { "name": "Company", "columns": [
              { "name": "companyName", "type": "VARCHAR", "pk": true },
              { "name": "city", "type": "VARCHAR", "pk": true }
            ]}
          ],
          "answer": {
            "canonical": "SELECT DISTINCT W1.employeeName\nFROM Works W1\nWHERE EXISTS (\n    SELECT *\n    FROM Works W2\n    WHERE W2.employeeName = W1.employeeName\n      AND W2.companyName <> W1.companyName\n);",
            "requiredPatterns": ["EXISTS", "<>"]
          },
          "rubric": [
            { "id": "uses_exists",    "label": "Uses EXISTS (or a self-join) with an inequality, not GROUP BY", "weight": 0.4 },
            { "id": "self_correlated","label": "Self-correlates Works on employeeName",                          "weight": 0.2 },
            { "id": "two_different",  "label": "Enforces that the two companies are distinct",                   "weight": 0.2 },
            { "id": "correct_result", "label": "Returns the names of employees working at ≥ 2 distinct companies", "weight": 0.2 }
          ],
          "modelAnswer": "SELECT DISTINCT W1.employeeName\nFROM Works W1\nWHERE EXISTS (\n    SELECT *\n    FROM Works W2\n    WHERE W2.employeeName = W1.employeeName\n      AND W2.companyName <> W1.companyName\n);",
          "explanation": "The classic 'at least two' pattern: pick the first row in the outer query and assert there exists a SECOND row for the same employee at a different company. SELECT DISTINCT is included because the outer Works table may contribute the same employeeName multiple times."
        },
        {
          "id": "3b",
          "label": "Question 3(b)",
          "prompt": "Find the names of employees who work for every company that has an office in Brussels.",
          "type": "sql",
          "datasetId": "employees_works_companies",
          "points": 1.0,
          "tables": [
            { "name": "Employee", "columns": [
              { "name": "employeeName", "type": "VARCHAR", "pk": true },
              { "name": "street", "type": "VARCHAR" },
              { "name": "city", "type": "VARCHAR" }
            ]},
            { "name": "Works", "columns": [
              { "name": "employeeName", "type": "VARCHAR", "pk": true, "fk": "Employee.employeeName" },
              { "name": "companyName", "type": "VARCHAR", "pk": true },
              { "name": "salary", "type": "REAL" }
            ]},
            { "name": "Company", "columns": [
              { "name": "companyName", "type": "VARCHAR", "pk": true },
              { "name": "city", "type": "VARCHAR", "pk": true }
            ]}
          ],
          "answer": {
            "canonical": "SELECT E.employeeName\nFROM Employee E\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Company C\n    WHERE C.city = 'Brussels'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Works W\n          WHERE W.employeeName = E.employeeName\n            AND W.companyName = C.companyName\n      )\n);",
            "requiredPatterns": ["NOT EXISTS", "Brussels"]
          },
          "rubric": [
            { "id": "double_neg",     "label": "Uses the double-negation pattern (NOT EXISTS … NOT EXISTS)",                "weight": 0.4 },
            { "id": "filter_city",    "label": "Restricts the inner Company loop to city = 'Brussels'",                     "weight": 0.2 },
            { "id": "correlated",     "label": "Correlates Works.employeeName with the outer employee",                     "weight": 0.2 },
            { "id": "correct_result", "label": "Returns names of employees who work for every Brussels-located company",    "weight": 0.2 }
          ],
          "modelAnswer": "SELECT E.employeeName\nFROM Employee E\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Company C\n    WHERE C.city = 'Brussels'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Works W\n          WHERE W.employeeName = E.employeeName\n            AND W.companyName = C.companyName\n      )\n);",
          "explanation": "Note that Company has (companyName, city) as PK, so the same company can have offices in several cities; the question is about companies that have AT LEAST ONE Brussels office. The double-NOT-EXISTS expresses ¬∃ company in Brussels that employee does NOT work for. The two Brussels-based companies in the test data (First Bank Corporation, Acme Industries) have Smith and Adams in common."
        }
      ]
    },
    {
      "id": "4",
      "title": "4 Transactions",
      "intro": "Two short questions on transaction theory.",
      "subquestions": [
        {
          "id": "4a",
          "label": "Question 4(a)",
          "prompt": "Define the ACID properties. For each of the four letters give one concrete mechanism a relational DBMS uses to provide it.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "atomicity",     "label": "Defines Atomicity (all-or-nothing) and names a supporting mechanism (e.g. WAL + undo log, two-phase commit)",        "weight": 0.25 },
            { "id": "consistency",   "label": "Defines Consistency and names a supporting mechanism (declarative constraints, triggers, deferred constraint checks)", "weight": 0.25 },
            { "id": "isolation",     "label": "Defines Isolation and names a supporting mechanism (2PL, MVCC, snapshot isolation, timestamp ordering)",              "weight": 0.25 },
            { "id": "durability",    "label": "Defines Durability and names a supporting mechanism (force-write log on commit, replication, fsync)",                 "weight": 0.25 }
          ],
          "modelAnswer": "Atomicity — a transaction executes completely or has no effect on the database.\n   Mechanism: the write-ahead log (WAL) plus an undo log. If the transaction aborts (or the system crashes mid-transaction) the recovery manager uses the undo records to roll back partial writes.\n\nConsistency — every committed transaction leaves the database in a state that satisfies all declared integrity constraints.\n   Mechanism: declarative constraints (PRIMARY KEY, FOREIGN KEY, CHECK, NOT NULL, UNIQUE), plus triggers and assertions. Constraint checking can be IMMEDIATE or DEFERRED to commit time.\n\nIsolation — concurrent transactions appear to execute as if they were run one at a time (in some serial order).\n   Mechanism: strict two-phase locking (S2PL / SS2PL) for traditional DBMSs; multi-version concurrency control (MVCC, snapshot isolation) for Postgres, Oracle, SQL Server in newer modes. Both produce conflict-serializable schedules (or snapshot-serializable in MVCC).\n\nDurability — once the DBMS reports COMMIT successfully, the effects survive any subsequent system crash.\n   Mechanism: at commit, the relevant log records are FORCE-written (fsync'd) to non-volatile storage before the COMMIT is acknowledged. Modern systems replicate the log to one or more standbys for additional safety.",
          "explanation": "ACID is a memorisable acronym but pin each letter to ONE specific mechanism on exam day: A↔WAL/undo, C↔declared constraints, I↔2PL or MVCC, D↔fsync at commit."
        },
        {
          "id": "4b",
          "label": "Question 4(b)",
          "prompt": "Use the precedence-graph method to decide whether the following schedule is conflict-serializable. Draw the edges of the precedence graph and, if it is conflict-serializable, give an equivalent serial order.\n\n  T1: R(X)  W(X)\n  T2:               R(X)  W(Y)\n  T3:                                  R(Y)  W(Z)\n\nThe global order is: T1:R(X), T1:W(X), T2:R(X), T2:W(Y), T3:R(Y), T3:W(Z).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "method",         "label": "States the precedence-graph rule",                                          "weight": 0.2  },
            { "id": "edge_t1_t2",     "label": "Identifies edge T1 → T2 (T1:W(X) before T2:R(X))",                         "weight": 0.25 },
            { "id": "edge_t2_t3",     "label": "Identifies edge T2 → T3 (T2:W(Y) before T3:R(Y))",                         "weight": 0.25 },
            { "id": "acyclic",        "label": "Notes the graph is acyclic — no other conflicts contribute back-edges",     "weight": 0.15 },
            { "id": "serial_order",   "label": "Concludes the schedule IS conflict-serializable, equivalent to T1 → T2 → T3", "weight": 0.15 }
          ],
          "modelAnswer": "Conflicts in time order:\n   T1:R(X) ... T2:R(X)   both reads, no conflict.\n   T1:W(X) ... T2:R(X)   ⇒ T1 → T2  (write-read on X)\n   T2:W(Y) ... T3:R(Y)   ⇒ T2 → T3  (write-read on Y)\n   T3:W(Z) — no later operation on Z by anyone, no edge.\n\nEdges: { T1 → T2, T2 → T3 }. The graph is a simple chain — acyclic.\n\nConclusion. The schedule IS conflict-serializable. A topological sort of the precedence graph gives the equivalent serial order:\n\n   T1 → T2 → T3.",
          "explanation": "Whenever every conflict points 'forward in time' between the transactions in the order T1, T2, T3, the precedence graph is a chain and the schedule is conflict-serializable to that order. No back-edges means no cycles."
        }
      ]
    },
    {
      "id": "5",
      "title": "5 Database APIs",
      "intro": "Two short questions on how applications talk to a database.",
      "subquestions": [
        {
          "id": "5a",
          "label": "Question 5(a)",
          "prompt": "Explain the role of CURSORS in a database API such as JDBC. Distinguish forward-only and scrollable cursors, and explain when sensitive (KEYSET) cursors are appropriate.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "cursor_role",   "label": "Explains that a cursor lets the client iterate over a result set one row at a time without materialising it in memory", "weight": 0.25 },
            { "id": "forward_only",  "label": "Describes forward-only cursors (single pass, cheapest) and when to use them — large reports, ETL",                       "weight": 0.25 },
            { "id": "scrollable",    "label": "Describes scrollable cursors (jump, absolute, relative) and the extra cost they impose on the server",                    "weight": 0.25 },
            { "id": "sensitive",     "label": "Explains sensitive cursors that re-read source rows so updates by other transactions are visible during iteration",       "weight": 0.25 }
          ],
          "modelAnswer": "Cursor role.\n  A cursor is a server-side pointer into the result set of a query. Instead of shipping millions of rows to the client at once, the client opens a cursor, then calls next() / fetch() to receive rows one (or a small batch) at a time. This is essential for streaming large queries and for applications that may not consume the whole result.\n\nForward-only cursors.\n  The simplest variant: rows are fetched in result order, exactly once. The server can free a row's buffer as soon as the client moves past it. Cheapest in memory and easiest to optimise. Use for log streaming, ETL pipelines, paginated reports.\n\nScrollable cursors.\n  Allow next(), previous(), absolute(n), relative(n). The driver — or the server — has to materialise the result so earlier rows can be revisited. Extra memory cost and sometimes a temporary table on the server. Use only when the application really needs to navigate (e.g. interactive table widgets).\n\nSensitive (KEYSET) cursors.\n  An INSENSITIVE / snapshot cursor returns a stable copy taken at OPEN time. A SENSITIVE / KEYSET cursor remembers only the primary keys of the rows and re-fetches each row's columns on each visit. So updates committed by other transactions become visible mid-iteration. Use sensitive cursors when the user must see fresh data while scrolling a long list; insensitive cursors when the snapshot must remain stable (e.g. financial reports).",
          "explanation": "Three trade-offs to remember: direction (forward vs scrollable), freshness (insensitive vs sensitive vs dynamic), and concurrency (read-only vs updatable). The cheapest combination is forward-only / insensitive / read-only, which is also the JDBC default."
        },
        {
          "id": "5b",
          "label": "Question 5(b)",
          "prompt": "Explain the difference between PHYSICAL, LOGICAL and VIEW data independence. Give an example of each.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "physical",       "label": "Defines physical data independence: changes in storage / indexing leave the conceptual schema unaffected; gives an example", "weight": 0.3  },
            { "id": "logical",        "label": "Defines logical data independence: changes in the conceptual schema leave existing application views unaffected; gives an example", "weight": 0.35 },
            { "id": "view",           "label": "Defines view independence (per-application external views) and gives an example",                                              "weight": 0.2  },
            { "id": "ansisparc_link", "label": "Connects the three notions to the ANSI/SPARC three-level architecture",                                                        "weight": 0.15 }
          ],
          "modelAnswer": "The three notions correspond to the three levels of the ANSI/SPARC architecture (internal, conceptual, external).\n\nPhysical data independence.\n  Changes at the INTERNAL level — different storage layout, new indexes, partitioning, switching from a heap to a clustered table — leave the CONCEPTUAL schema (relations and constraints) unchanged.\n  Example: adding a B+ tree index on customer(zipcode). Existing queries continue to work, only their plans change.\n\nLogical data independence.\n  Changes at the CONCEPTUAL level — adding a column, splitting a relation, denormalising for performance — leave existing EXTERNAL views unchanged. The view definitions are updated so applications continue to see the same projection.\n  Example: splitting customer(_id_, name, address) into customer(_id_, name) and address(_id → customer_, street, city). A view 'customer(id, name, street, city)' joining the two preserves the original application's interface.\n\nView (external) independence.\n  Different applications work against their own external views — projections, joins, renames — so adding new applications does not require schema changes. This is also the level at which ORMs sit (the application sees object classes, not raw tables).\n  Example: a reporting app sees view orderSummary(year, total) defined as SELECT year(date), SUM(total) FROM orders, while OLTP code sees the full orders table.\n\nLogical independence is the hardest to preserve; physical independence is provided by virtually every modern DBMS for free.",
          "explanation": "The mnemonic is 'internal ↔ physical', 'conceptual ↔ logical', 'external ↔ view'. The harder the level (logical > physical) the more architectural foresight it takes to keep the application code stable."
        }
      ]
    }
  ]
}
,
{
  "id": "mock-4",
  "title": "Mock Final 4 — Library Network",
  "shortTitle": "Library network",
  "tagline": "ER · isA · ternary · weak Copy · simple chain BCNF · suppliers SQL",
  "durationMinutes": 165,
  "maxPoints": 8.0,
  "gradeFormula": "score / maxPoints * 10",
  "tasks": [
    {
      "id": "1",
      "title": "1 Conceptual Design",
      "intro": "Consider the following case for a city library network. Members have a member number (MNR), a name, a date of birth, and a join year. Librarians have a librarian id (LID), a name, an age, and a salary. Books have an ISBN, a title and a publication year. Branches have a branch code, a name and an address. Each branch is directed by exactly one librarian (the branch director). A librarian may work at one or more branches; for each branch where a librarian works, a shift (morning, afternoon, evening) is recorded. Every member is registered at exactly one branch as their home branch. Branches hold copies: a copy has a copy number unique only within its branch, plus a condition (good, fair, poor) and a shelf location; a copy disappears if its branch closes. When a librarian lends a book to a member, the loan date and the due date are recorded; the same member may borrow the same book from different librarians on different dates. Members can be assigned to specific copies of a book (one copy per loan), and for every such assignment we record the checkout date and the return date. Both librarians and members are persons: they share name, date of birth and address. Finally, every member has another, more senior member registered as the one who referred them.",
      "subquestions": [
        {
          "id": "1a",
          "label": "Question 1(a)",
          "prompt": "Provide a conceptual database model in the form of an ER Diagram. Explain the most important design choices and document relevant assumptions.",
          "type": "er_diagram",
          "points": 1.5,
          "hint": "Copy is a weak entity (number is unique only within its branch). 'lends' is a ternary relationship on Librarian × Member × Book because (loanDate, dueDate) depends on all three. The referral link is a recursive relationship on Member.",
          "rubric": [
            { "id": "ent_member",     "label": "Entity set Member with key MNR and attributes name, dob, joinYear",                "weight": 0.12, "match": { "type": "entity", "name": "member", "keyAttribute": "mnr" } },
            { "id": "ent_librarian",  "label": "Entity set Librarian with key LID and attributes name, age, salary",               "weight": 0.12, "match": { "type": "entity", "name": "librarian", "keyAttribute": "lid" } },
            { "id": "ent_book",       "label": "Entity set Book with key ISBN and attributes title, publishYear",                  "weight": 0.1,  "match": { "type": "entity", "name": "book", "keyAttribute": "isbn" } },
            { "id": "ent_branch",     "label": "Entity set Branch with key bcode and attributes name, address",                   "weight": 0.1,  "match": { "type": "entity", "name": "branch", "keyAttribute": "bcode" } },
            { "id": "ent_copy",       "label": "Weak entity Copy (identified by Branch + copy number)",                            "weight": 0.12, "match": { "type": "entity", "name": "copy", "weak": true } },
            { "id": "rel_directs",    "label": "Relationship 'directs' between Branch (1..1) and Librarian (0..1)",                "weight": 0.1,  "match": { "type": "relationship", "name": "directs", "connects": ["branch", "librarian"] } },
            { "id": "rel_works_at",   "label": "Relationship 'works_at' between Librarian (1..*) and Branch (1..*) with attribute shift", "weight": 0.1,  "match": { "type": "relationship", "name": "works_at", "connects": ["librarian", "branch"] } },
            { "id": "rel_registered", "label": "Relationship 'registered_at' between Member (1..*) and Branch (1..1)",             "weight": 0.08, "match": { "type": "relationship", "name": "registered_at", "connects": ["member", "branch"] } },
            { "id": "ter_lends",      "label": "Ternary relationship 'lends' among Librarian, Member, Book with loanDate, dueDate", "weight": 0.15, "match": { "type": "relationship", "name": "lends" } },
            { "id": "rel_checkout",   "label": "Relationship 'checked_out' between Member and Copy with attributes checkoutDate, returnDate", "weight": 0.08, "match": { "type": "relationship", "name": "checked_out", "connects": ["member", "copy"] } },
            { "id": "rec_referral",   "label": "Recursive relationship 'referred_by' on Member",                                   "weight": 0.05, "match": { "type": "relationship", "name": "referred_by", "connects": ["member", "member"] } },
            { "id": "isa_person",     "label": "isA hierarchy: Person → Member, Librarian",                                        "weight": 0.08, "match": { "type": "isA", "super": "person", "subs": ["member", "librarian"] } }
          ],
          "modelAnswer": "Entities:\n  • Person (supertype): name, dob, address\n      ↳ Member: MNR (key), joinYear\n      ↳ Librarian: LID (key), age, salary\n  • Book: ISBN (key), title, publishYear\n  • Branch: bcode (key), name, address\n  • Copy (WEAK, identified by Branch): copyNumber, condition, shelfLocation\n\nRelationships:\n  • directs : Branch(1..1) — Librarian(0..1)\n  • works_at : Librarian(1..*) — Branch(1..*) with attribute shift\n  • registered_at : Member(*) — Branch(1)\n  • lends : ternary Librarian × Member × Book with loanDate, dueDate\n        (key = full triple + loanDate, because the same book may be relent later)\n  • checked_out : Member(*) — Copy(*) with attributes checkoutDate, returnDate\n  • referred_by : recursive on Member, 0..1 — 0..*\n\nDesign choices:\n  – isA Person → Member, Librarian removes duplicate name/dob/address.\n  – Copy is weak (number only locally unique within its branch).\n  – lends is ternary because (loanDate, dueDate) depends on the (librarian, member, book) triple.\n  – Multiple checkouts of the same Copy by the same Member need checkoutDate in the relationship key.",
          "explanation": "The structural clue for ternary 'lends': loan and due dates depend on which librarian processed the loan, which member took it out, and which book — three entities. Copy is weak because its number is reused across branches."
        },
        {
          "id": "1b",
          "label": "Question 1(b)",
          "prompt": "Give the associated relational schema. Indicate primary keys (underline by writing _attr_) and foreign keys (→ Relation). Comment on any attributes that may be NULL and on the constraints a relational database could check (including candidate keys).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "rel_member",     "label": "member(_mnr_, name, dob, address, joinYear, referredBy → member, homeBranch → branch)", "weight": 0.1  },
            { "id": "rel_librarian",  "label": "librarian(_lid_, name, dob, address, age, salary)",                                     "weight": 0.08 },
            { "id": "rel_book",       "label": "book(_isbn_, title, publishYear)",                                                      "weight": 0.06 },
            { "id": "rel_branch",     "label": "branch(_bcode_, name, address, director → librarian)",                                  "weight": 0.08 },
            { "id": "rel_copy",       "label": "copy(_branch → branch, copyNumber_, condition, shelfLocation)",                         "weight": 0.1  },
            { "id": "rel_works_at",   "label": "worksAt(_lid → librarian, bcode → branch_, shift)",                                     "weight": 0.08 },
            { "id": "rel_lends",      "label": "lends(_lid → librarian, mnr → member, isbn → book, loanDate_, dueDate)",                "weight": 0.12 },
            { "id": "rel_checkout",   "label": "checkedOut(_mnr → member, branch, copyNumber, checkoutDate_, returnDate) — composite FK to copy", "weight": 0.1  },
            { "id": "nullable_comment","label": "Mentions referredBy and returnDate may be NULL; director may be NULL between two directors; composite FK on copy", "weight": 0.1  },
            { "id": "constraints",    "label": "DB constraints: NOT NULL on mandatory FKs, CHECK (referredBy ≠ mnr), ON DELETE CASCADE for copy when branch is removed", "weight": 0.1  }
          ],
          "modelAnswer": "Relational schema (PKs in _underscores_, FKs marked with →):\n\n  member(_mnr_, name, dob, address, joinYear,\n         referredBy → member,\n         homeBranch → branch)\n  librarian(_lid_, name, dob, address, age, salary)\n  book(_isbn_, title, publishYear)\n  branch(_bcode_, name, address, director → librarian)\n  copy(_branch → branch, copyNumber_, condition, shelfLocation)\n  worksAt(_lid → librarian, bcode → branch_, shift)\n  lends(_lid → librarian, mnr → member, isbn → book, loanDate_, dueDate)\n  checkedOut(_mnr → member, branch, copyNumber, checkoutDate_, returnDate)\n     with (branch, copyNumber) → copy as composite FK\n\nNULLable / constraints:\n  • member.referredBy is NULLable (first-generation members); CHECK (referredBy <> mnr).\n  • branch.director may be NULL while a director seat is vacant; alternatively NOT NULL with a forced reassignment.\n  • checkedOut.returnDate is NULLable while the copy is still out.\n  • Copy's identifying FK should be ON DELETE CASCADE.\n  • Mandatory NOT NULL: member.homeBranch, worksAt.shift, lends.dueDate, copy.condition.",
          "explanation": "Standard translation: fold the 1..1 'directs' into a branch.director FK; promote works_at to its own relation because of the shift attribute; weak Copy joins its identifying FK into its primary key; ternary lends becomes a relation whose PK is the union of the three FKs plus loanDate."
        }
      ]
    },
    {
      "id": "2",
      "title": "2 Normalization",
      "intro": "Given R(A, B, C, D, E) and the set of functional dependencies\n\n    F = { A → B,  A → C,  BC → D,  D → E }.\n\nShow your intermediate steps in all answers below.",
      "subquestions": [
        {
          "id": "2a",
          "label": "Question 2(a)",
          "prompt": "Is F canonical (a minimal basis)? If not, make it so. Give the canonical set of FDs, one per line.",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["A->B", "A->C", "BC->D", "D->E"],
            "acceptedVariants": ["A→B", "A→C", "BC→D", "D→E"]
          },
          "rubric": [
            { "id": "split",     "label": "All four FDs already have single-attribute RHSs",                       "weight": 0.2 },
            { "id": "extraneous","label": "Checks BC→D: neither B nor C is extraneous (B+ = {B}, C+ = {C})",       "weight": 0.4 },
            { "id": "redundancy","label": "Verifies no FD is redundant (dropping any one breaks the closure of A)", "weight": 0.3 },
            { "id": "final_set", "label": "Final canonical: { A→B, A→C, BC→D, D→E }",                             "weight": 0.1 }
          ],
          "modelAnswer": "Step 1 — single RHSs: already satisfied.\n\nStep 2 — extraneous LHS attributes:\n   BC→D : is B extraneous? C+ = {C}, no FD fires. Doesn't reach D. NOT extraneous.\n          is C extraneous? B+ = {B}, no FD fires. Doesn't reach D. NOT extraneous.\n   The other FDs have a single attribute on the LHS.\n\nStep 3 — redundancy:\n   Drop A→B? A+ in F\\{A→B} = {A,C}; no way to derive B (BC→D needs B). NOT redundant.\n   Drop A→C? A+ in F\\{A→C} = {A,B}; no way to derive C. NOT redundant.\n   Drop BC→D? BC+ = {B,C}; no way to derive D. NOT redundant.\n   Drop D→E? D+ = {D}. NOT redundant.\n\nCanonical cover: F* = { A→B, A→C, BC→D, D→E } — unchanged.",
          "explanation": "Watch out for the seductive 'A→BC therefore A→D' merge: yes, A determines D transitively, but BC→D is the original FD and B,C are independent inputs. Neither attribute can be dropped from the LHS because neither, alone, reaches D."
        },
        {
          "id": "2b",
          "label": "Question 2(b)",
          "prompt": "What are the minimal (candidate) keys of R(A, B, C, D, E)?",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["{A}"],
            "acceptedVariants": ["A", "(A)", "{A}"]
          },
          "rubric": [
            { "id": "must_include", "label": "Argues A appears on no RHS → A must be in every candidate key", "weight": 0.4 },
            { "id": "closure",      "label": "Computes A+ and shows it equals ABCDE",                          "weight": 0.4 },
            { "id": "unique",       "label": "Concludes {A} is the UNIQUE minimal candidate key",              "weight": 0.2 }
          ],
          "modelAnswer": "On RHS: B (A→B), C (A→C), D (BC→D), E (D→E). Not on RHS: A. So A must lie in every candidate key.\n\nA+ = {A} ∪ {B} (A→B) ∪ {C} (A→C) ∪ {D} (BC→D) ∪ {E} (D→E) = ABCDE.\n\nSo {A} is already a superkey, and being a single attribute is minimal.\n\nUnique minimal candidate key: { A }.",
          "explanation": "The 'never-on-the-right' rule pins A into every key. A single closure confirms that nothing else needs to join — so {A} is the lone candidate key."
        },
        {
          "id": "2c",
          "label": "Question 2(c)",
          "prompt": "Is R in BCNF already? If not, decompose it into BCNF and state whether any FDs were lost.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "bcnf_diagnosis", "label": "Diagnoses that BC→D and D→E violate BCNF (neither LHS is a superkey)",  "weight": 0.25 },
            { "id": "split_step",     "label": "Performs a valid BCNF split (e.g. on D→E, then on BC→D)",                 "weight": 0.25 },
            { "id": "final_decomp",   "label": "Reaches { R1(D,E), R2(B,C,D), R3(A,B,C) } and all are in BCNF",            "weight": 0.3  },
            { "id": "fd_preserved",   "label": "Notes that this decomposition is FD-preserving — no FD is lost",            "weight": 0.2  }
          ],
          "modelAnswer": "BCNF check. The only candidate key is {A}, so every BCNF FD must contain A on the LHS.\n   A→B  contains A   ✓\n   A→C  contains A   ✓\n   BC→D no A         ✗ violates\n   D→E  no A         ✗ violates\n\nDecomposition.\n   Step 1 — split on D→E: R1(D, E) with FD D→E (key D, BCNF ✓).\n      Remaining R'(A,B,C,D) with projected FDs { A→B, A→C, BC→D }. Key of R' = {A}.\n   Step 2 — BCNF check R': BC→D has BC+ in R' = {B,C,D}, not a superkey. Split on BC→D: R2(B, C, D) with FD BC→D (key BC, BCNF ✓).\n      Remaining R''(A, B, C) with FDs { A→B, A→C }. Key = {A}. BCNF ✓.\n\nFinal BCNF schema: R1(D, E), R2(B, C, D), R3(A, B, C).\n\nFD preservation:\n   • A→B, A→C in R3 ✓\n   • BC→D in R2 ✓\n   • D→E in R1 ✓\nNo FD is lost — this BCNF decomposition is also FD-preserving.",
          "explanation": "Another lucky case: the violating FDs partition cleanly across the new relations, so we get BCNF AND keep every FD. This is not always possible."
        },
        {
          "id": "2d",
          "label": "Question 2(d)",
          "prompt": "Is R in 3NF already? If not, decompose it into 3NF.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "threenf_diagnosis", "label": "Argues R is NOT in 3NF: BC→D and D→E have non-superkey LHSs and their RHSs (D, E) are non-prime", "weight": 0.3  },
            { "id": "synthesis_method",  "label": "Applies synthesis: one relation per FD-group of the canonical cover",                            "weight": 0.3  },
            { "id": "key_relation",      "label": "Includes a relation containing the unique candidate key {A}",                                    "weight": 0.2  },
            { "id": "final_decomp",      "label": "Reaches an FD-preserving 3NF decomposition such as { R1(A,B,C), R2(B,C,D), R3(D,E) }",          "weight": 0.2  }
          ],
          "modelAnswer": "Prime attribute: A (only). Every other attribute is non-prime.\n\n3NF check.\n   A→B  A is a key             ✓\n   A→C  A is a key             ✓\n   BC→D BC not superkey, D non-prime   ✗ violates\n   D→E  D not superkey, E non-prime    ✗ violates\n\n3NF synthesis from F* = { A→B, A→C, BC→D, D→E }:\n   Groups by LHS:\n      {A→B, A→C}   ⇒ R1(A, B, C)\n      {BC→D}       ⇒ R2(B, C, D)\n      {D→E}        ⇒ R3(D, E)\n   The candidate key {A} appears in R1 — no extra relation needed.\n   Subsumption: none.\n\nFinal 3NF schema: R1(A, B, C), R2(B, C, D), R3(D, E). FD-preserving and lossless. This actually coincides with the BCNF decomposition above — when the BCNF result is FD-preserving the two decompositions agree.",
          "explanation": "When BCNF is achievable while preserving all FDs, the 3NF synthesis algorithm typically lands on the same schema. The 3NF process is mechanical and always succeeds; BCNF process sometimes has to sacrifice FDs."
        }
      ]
    },
    {
      "id": "3",
      "title": "3 SQL",
      "intro": "Consider the following schema (primary keys underlined, arrows indicate foreign-key references):\n\n    Suppliers( _sid_ , sname, saddress )\n    Parts    ( _pid_ , pname, color )\n    Catalog  ( _sid → Suppliers, pid → Parts_ , cost )\n\nFormulate the queries below in SQL. You will only obtain full marks if your answers avoid GROUP BY in favour of existential quantification (EXISTS / NOT EXISTS).",
      "subquestions": [
        {
          "id": "3a",
          "label": "Question 3(a)",
          "prompt": "Find the sids of suppliers that supply at least two different black parts.",
          "type": "sql",
          "datasetId": "suppliers_parts_catalog",
          "points": 1.0,
          "tables": [
            { "name": "Suppliers", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true },
              { "name": "sname", "type": "VARCHAR" },
              { "name": "saddress", "type": "VARCHAR" }
            ]},
            { "name": "Parts", "columns": [
              { "name": "pid", "type": "INTEGER", "pk": true },
              { "name": "pname", "type": "VARCHAR" },
              { "name": "color", "type": "VARCHAR" }
            ]},
            { "name": "Catalog", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true, "fk": "Suppliers.sid" },
              { "name": "pid", "type": "INTEGER", "pk": true, "fk": "Parts.pid" },
              { "name": "cost", "type": "DECIMAL" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT DISTINCT C1.sid\nFROM Catalog C1, Parts P1\nWHERE C1.pid = P1.pid\n  AND P1.color = 'black'\n  AND EXISTS (\n      SELECT *\n      FROM Catalog C2, Parts P2\n      WHERE C2.sid = C1.sid\n        AND C2.pid = P2.pid\n        AND P2.color = 'black'\n        AND C2.pid <> C1.pid\n  );",
            "requiredPatterns": ["EXISTS", "black", "<>"]
          },
          "rubric": [
            { "id": "uses_exists",    "label": "Uses EXISTS with an inequality, not GROUP BY",      "weight": 0.4 },
            { "id": "filters_black",  "label": "Filters Parts.color = 'black' on both occurrences", "weight": 0.2 },
            { "id": "two_different",  "label": "Enforces C2.pid <> C1.pid",                          "weight": 0.2 },
            { "id": "correct_result", "label": "Returns sids of suppliers with ≥ 2 distinct black parts", "weight": 0.2 }
          ],
          "modelAnswer": "SELECT DISTINCT C1.sid\nFROM Catalog C1, Parts P1\nWHERE C1.pid = P1.pid\n  AND P1.color = 'black'\n  AND EXISTS (\n      SELECT *\n      FROM Catalog C2, Parts P2\n      WHERE C2.sid = C1.sid\n        AND C2.pid = P2.pid\n        AND P2.color = 'black'\n        AND C2.pid <> C1.pid\n  );",
          "explanation": "Anchor on one black part and assert the existence of a second, DIFFERENT black part supplied by the same sid. The test data has Washer and Screw as black parts; only Acme supplies both, so the expected result is { sid = 1 }."
        },
        {
          "id": "3b",
          "label": "Question 3(b)",
          "prompt": "Find the names of suppliers who supply every part whose color is 'blue'.",
          "type": "sql",
          "datasetId": "suppliers_parts_catalog",
          "points": 1.0,
          "tables": [
            { "name": "Suppliers", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true },
              { "name": "sname", "type": "VARCHAR" },
              { "name": "saddress", "type": "VARCHAR" }
            ]},
            { "name": "Parts", "columns": [
              { "name": "pid", "type": "INTEGER", "pk": true },
              { "name": "pname", "type": "VARCHAR" },
              { "name": "color", "type": "VARCHAR" }
            ]},
            { "name": "Catalog", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true, "fk": "Suppliers.sid" },
              { "name": "pid", "type": "INTEGER", "pk": true, "fk": "Parts.pid" },
              { "name": "cost", "type": "DECIMAL" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT S.sname\nFROM Suppliers S\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Parts P\n    WHERE P.color = 'blue'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Catalog C\n          WHERE C.sid = S.sid\n            AND C.pid = P.pid\n      )\n);",
            "requiredPatterns": ["NOT EXISTS", "blue"]
          },
          "rubric": [
            { "id": "double_neg",     "label": "Uses double-negation (NOT EXISTS … NOT EXISTS) to express universal quantification", "weight": 0.4 },
            { "id": "filter_blue",    "label": "Restricts the inner Parts loop to color = 'blue'",                                    "weight": 0.2 },
            { "id": "correlated",     "label": "Correlates Catalog.sid with the outer supplier",                                      "weight": 0.2 },
            { "id": "correct_result", "label": "Returns names of suppliers that carry every blue part",                               "weight": 0.2 }
          ],
          "modelAnswer": "SELECT S.sname\nFROM Suppliers S\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Parts P\n    WHERE P.color = 'blue'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Catalog C\n          WHERE C.sid = S.sid\n            AND C.pid = P.pid\n      )\n);",
          "explanation": "Watch out for the empty-set trap: suppliers with NO catalog entries at all also pass the universally-quantified test (they vacuously supply every blue part not at all). In our dataset 'Nut' is the only blue part; suppliers who have a Catalog entry for Nut are Acme (1) and Gizmo (3). The query also returns 'NoSell' if the inner blue set is empty — but here it is non-empty, so NoSell is filtered out."
        }
      ]
    },
    {
      "id": "4",
      "title": "4 Transactions",
      "intro": "Two short questions on transaction theory.",
      "subquestions": [
        {
          "id": "4a",
          "label": "Question 4(a)",
          "prompt": "Explain the difference between DIRTY READ, NON-REPEATABLE READ and PHANTOM READ. Which SQL standard isolation levels prevent which anomalies?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "dirty",       "label": "Defines dirty read (reading uncommitted data from another transaction) with a concrete example",   "weight": 0.2  },
            { "id": "nonrep",      "label": "Defines non-repeatable read (re-reading a row sees different values) with an example",              "weight": 0.2  },
            { "id": "phantom",     "label": "Defines phantom read (a re-executed predicate query returns new rows committed in between)",        "weight": 0.2  },
            { "id": "levels_table","label": "Maps the four ANSI isolation levels (READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE) to which anomalies they prevent", "weight": 0.4 }
          ],
          "modelAnswer": "Anomalies.\n  • Dirty read — transaction T2 reads a value written by T1 BEFORE T1 commits. If T1 aborts, T2 has consumed phantom data.\n  • Non-repeatable read — T2 reads row r at time t1, T1 commits an UPDATE on r, T2 reads r again at time t2 and gets a different value.\n  • Phantom read — T2 executes a range query (e.g. WHERE age < 30) at time t1; T1 inserts a NEW row that matches the predicate and commits; T2 re-runs the query at time t2 and sees an extra row (a 'phantom').\n\nSQL standard isolation levels and what they prevent.\n\n  Level               Dirty | Non-Rep | Phantom\n  -------------------+------+---------+--------\n  READ UNCOMMITTED   |  ✗   |   ✗     |   ✗\n  READ COMMITTED     |  ✓   |   ✗     |   ✗\n  REPEATABLE READ    |  ✓   |   ✓     |   ✗\n  SERIALIZABLE       |  ✓   |   ✓     |   ✓\n\n  (✓ = prevented, ✗ = still possible.) SERIALIZABLE is the only level that prevents all three; most production systems default to READ COMMITTED for throughput.",
          "explanation": "The progression of anomalies is roughly point read → row re-read → predicate re-read. Each higher isolation level catches the next one. Real DBMSs sometimes implement REPEATABLE READ as snapshot isolation, which prevents phantoms by construction but introduces a different anomaly (write skew)."
        },
        {
          "id": "4b",
          "label": "Question 4(b)",
          "prompt": "Use the precedence-graph method to decide whether the following schedule is conflict-serializable. Draw the edges of the precedence graph and, if it is conflict-serializable, give an equivalent serial order.\n\n  T1: R(A)              W(A)\n  T2:        W(B)\n  T3:                          R(B)        W(A)\n\nThe global order is: T1:R(A), T2:W(B), T1:W(A), T3:R(B), T3:W(A).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "method",         "label": "States the precedence-graph rule",                       "weight": 0.2  },
            { "id": "edge_t1_t3",     "label": "Identifies edge T1 → T3 (T1:W(A) before T3:W(A))",       "weight": 0.25 },
            { "id": "edge_t2_t3",     "label": "Identifies edge T2 → T3 (T2:W(B) before T3:R(B))",       "weight": 0.25 },
            { "id": "acyclic",        "label": "Notes the graph is acyclic",                              "weight": 0.15 },
            { "id": "serial_order",   "label": "Concludes the schedule IS conflict-serializable, equivalent to T2 → T1 → T3 (or T1 → T2 → T3)", "weight": 0.15 }
          ],
          "modelAnswer": "Conflicts in time order:\n   T1:R(A) ... T1:W(A)  same transaction, no inter-transaction edge.\n   T1:R(A) ... T3:W(A)  ⇒ T1 → T3  (read-write on A)\n   T1:W(A) ... T3:W(A)  ⇒ T1 → T3  (write-write on A, already present)\n   T2:W(B) ... T3:R(B)  ⇒ T2 → T3  (write-read on B)\n   T3:R(B) ... T3:W(A)  same transaction.\n\nEdges: { T1 → T3, T2 → T3 }. Acyclic — no edges INTO T1 or T2.\n\nConclusion. The schedule IS conflict-serializable. T1 and T2 are independent (they touch different items), and both precede T3. Equivalent serial order: T1 → T2 → T3 or T2 → T1 → T3 (both are topological sorts).",
          "explanation": "If the precedence graph is a DAG with no edge between two of the transactions, any topological order is acceptable. Here {T1, T2} can be swapped freely because they never touch the same data item."
        }
      ]
    },
    {
      "id": "5",
      "title": "5 Database APIs",
      "intro": "Two short questions on how applications talk to a database.",
      "subquestions": [
        {
          "id": "5a",
          "label": "Question 5(a)",
          "prompt": "Discuss SQL transaction management from a JDBC application's point of view. Address: autoCommit, setTransactionIsolation, savepoints, and the consequences of forgetting to commit.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "autocommit",  "label": "Explains autoCommit (default ON in JDBC: each statement is its own transaction) and why most apps disable it for multi-statement business logic", "weight": 0.3 },
            { "id": "isolation",   "label": "Mentions setTransactionIsolation(int) and the four standard levels exposed via Connection.TRANSACTION_*",                                         "weight": 0.25 },
            { "id": "savepoint",   "label": "Explains savepoints (setSavepoint / rollback(Savepoint)) for nested rollback within one transaction",                                              "weight": 0.25 },
            { "id": "forget_commit","label": "Notes that forgetting to commit leaves the transaction open: locks held, connection unusable for others, possible eventual rollback on connection close", "weight": 0.2 }
          ],
          "modelAnswer": "autoCommit.\n  By default a JDBC Connection has autoCommit = true, so every executed statement starts AND commits its own transaction. For any multi-statement business operation (transfer money, place order with multiple inserts) the application must call connection.setAutoCommit(false), execute its statements, and then call commit() — or rollback() on failure.\n\nIsolation level.\n  connection.setTransactionIsolation(level) selects one of:\n     TRANSACTION_READ_UNCOMMITTED, TRANSACTION_READ_COMMITTED,\n     TRANSACTION_REPEATABLE_READ, TRANSACTION_SERIALIZABLE.\n  Most JDBC drivers default to the database's own default (often READ COMMITTED). Setting a stricter level should be done at the beginning of the transaction, before issuing data-modifying statements.\n\nSavepoints.\n  Savepoint sp = connection.setSavepoint(\"after_step_1\");\n     ... further statements ...\n  connection.rollback(sp);   // undo the second half, keep the first half\n  Savepoints implement nested rollback inside one outer transaction — useful when one optional step may fail without abandoning the whole transaction.\n\nForgetting to commit.\n  If the program neither commits nor rolls back, the transaction stays open. Consequences: locks remain held (blocking other transactions), the connection cannot be safely returned to a pool, and on connection close most drivers issue an implicit rollback — silently discarding the work. Always wrap a transaction in try/finally (or try-with-resources) that commits on success and rolls back on exception.",
          "explanation": "The two pitfalls students should remember: autoCommit-ON makes multi-statement transactions impossible without setAutoCommit(false); and a missing commit() is almost always recovered by the driver as a rollback, not a commit — silently destroying work."
        },
        {
          "id": "5b",
          "label": "Question 5(b)",
          "prompt": "Compare an object-relational mapper (ORM) such as Hibernate or JPA with a direct JDBC API. List two situations where using an ORM is the WRONG choice.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "what_orm_does",  "label": "Explains that an ORM maps tables to classes and rows to objects, with a session/unit-of-work tracking changes",  "weight": 0.25 },
            { "id": "benefits",       "label": "Names benefits: type-safe domain model, lazy loading, automatic dirty checking, less boilerplate",                  "weight": 0.25 },
            { "id": "wrong_situation1","label": "Wrong-choice 1: heavy bulk operations / reporting where set-based SQL is far faster than per-row hydration",       "weight": 0.25 },
            { "id": "wrong_situation2","label": "Wrong-choice 2: highly query-intensive analytics, complex window functions, or schema where the relational shape doesn't fit objects (e.g. graph-shaped data)", "weight": 0.25 }
          ],
          "modelAnswer": "What an ORM does.\n  An ORM (Hibernate, JPA, EF Core, SQLAlchemy, ...) maps relational tables to host-language classes and rows to objects. A 'session' or 'unit of work' tracks which managed objects were modified; calling commit (or flush) translates the dirty objects into INSERT / UPDATE / DELETE statements. Associations are exposed as object references, often loaded lazily on first access.\n\nBenefits.\n  • Type-safe domain model — the application speaks in Customers and Orders, not result sets.\n  • Lazy loading — fetch associated rows only when the application traverses the link.\n  • Automatic dirty checking — no need to write UPDATE statements by hand.\n  • Less boilerplate compared with raw JDBC (no manual prepareStatement / setInt / executeUpdate).\n  • Cross-database portability via dialect modules.\n\nWhen NOT to use an ORM.\n  1. Bulk operations / reporting. A single SQL statement\n        UPDATE order SET status = 'archived' WHERE date < '2024-01-01'\n     runs in one round-trip; an ORM that loads each Order object, mutates it and saves it back issues thousands of UPDATEs and consumes huge memory.\n  2. Analytic / complex SQL. Window functions, recursive CTEs, lateral joins, hierarchical queries — these are awkward or impossible to express via an ORM, and the SQL the ORM generates may be far from optimal. Better to write the SQL directly (JDBC, MyBatis, jOOQ).\n  3. (Bonus.) Schemas whose data shape doesn't fit objects — heavily graph-shaped data, document-shaped data, time-series data — call for graph DBs, document DBs or columnar stores rather than an ORM-on-RDBMS layer.\n\nRule of thumb: use the ORM for the OLTP 'business object' code paths, drop down to JDBC / a SQL builder for the analytical / batch paths.",
          "explanation": "ORMs trade ergonomic OLTP code for performance pitfalls in batch / analytic workloads. Most experienced teams use a hybrid: ORM for the per-request mutations, raw SQL for the heavy reads."
        }
      ]
    }
  ]
}
,
{
  "id": "mock-5",
  "title": "Mock Final 5 — Online Marketplace",
  "shortTitle": "Online marketplace",
  "tagline": "ER · isA · ternary · weak Shelf · redundant FD removal · accounts SQL",
  "durationMinutes": 165,
  "maxPoints": 8.0,
  "gradeFormula": "score / maxPoints * 10",
  "tasks": [
    {
      "id": "1",
      "title": "1 Conceptual Design",
      "intro": "Consider the following case for an online marketplace. Customers have a customer number (CNR), a name, an address and an email. Sellers have a seller number (SNR), a name, an address and a rating (1..5 stars). Products have a product code, a name and a category. Warehouses have a warehouse code, a name and an address. Each warehouse is managed by exactly one seller (the warehouse manager). A seller may list one or more products; for every product a seller lists, a list price is recorded. Every customer is registered at exactly one warehouse as their default delivery warehouse. Warehouses contain shelves: a shelf has a number that is unique only within its warehouse, plus a capacity and a zone (cold / dry / hazmat); a shelf disappears when its warehouse closes. When a seller sells a product to a customer, the sale date and the quantity are recorded; the same customer may buy the same product from different sellers on different dates. Products can be stored on shelves: for every such storage assignment we record the start-of-storage date. Both customers and sellers are persons: they share name, address and email. Finally, every customer has another, more senior customer registered as the one who referred them.",
      "subquestions": [
        {
          "id": "1a",
          "label": "Question 1(a)",
          "prompt": "Provide a conceptual database model in the form of an ER Diagram. Explain the most important design choices and document relevant assumptions.",
          "type": "er_diagram",
          "points": 1.5,
          "hint": "Shelf is a weak entity identified by its Warehouse. The 'sells' relationship must be ternary on Seller × Customer × Product because (date, quantity) depends on all three. The 'referred_by' link is a recursive relationship on Customer.",
          "rubric": [
            { "id": "ent_customer",  "label": "Entity set Customer with key CNR and attributes name, address, email",       "weight": 0.12, "match": { "type": "entity", "name": "customer", "keyAttribute": "cnr" } },
            { "id": "ent_seller",    "label": "Entity set Seller with key SNR and attributes name, address, rating",        "weight": 0.12, "match": { "type": "entity", "name": "seller", "keyAttribute": "snr" } },
            { "id": "ent_product",   "label": "Entity set Product with key code and attributes name, category",              "weight": 0.1,  "match": { "type": "entity", "name": "product", "keyAttribute": "code" } },
            { "id": "ent_warehouse", "label": "Entity set Warehouse with key wcode and attributes name, address",            "weight": 0.1,  "match": { "type": "entity", "name": "warehouse", "keyAttribute": "wcode" } },
            { "id": "ent_shelf",     "label": "Weak entity Shelf (identified by Warehouse + shelf number)",                  "weight": 0.12, "match": { "type": "entity", "name": "shelf", "weak": true } },
            { "id": "rel_manages",   "label": "Relationship 'manages' between Warehouse (1..1) and Seller (0..1)",           "weight": 0.1,  "match": { "type": "relationship", "name": "manages", "connects": ["warehouse", "seller"] } },
            { "id": "rel_lists",     "label": "Relationship 'lists' between Seller (1..*) and Product (1..*) with attribute listPrice", "weight": 0.1,  "match": { "type": "relationship", "name": "lists", "connects": ["seller", "product"] } },
            { "id": "rel_delivery",  "label": "Relationship 'delivers_to' between Customer (1..*) and Warehouse (1..1)",      "weight": 0.08, "match": { "type": "relationship", "name": "delivers_to", "connects": ["customer", "warehouse"] } },
            { "id": "ter_sells",     "label": "Ternary relationship 'sells' among Seller, Customer, Product with date, qty", "weight": 0.15, "match": { "type": "relationship", "name": "sells" } },
            { "id": "rel_stored",    "label": "Relationship 'stored_on' between Product and Shelf with attribute storedSince", "weight": 0.08, "match": { "type": "relationship", "name": "stored_on", "connects": ["product", "shelf"] } },
            { "id": "rec_referral",  "label": "Recursive relationship 'referred_by' on Customer",                            "weight": 0.05, "match": { "type": "relationship", "name": "referred_by", "connects": ["customer", "customer"] } },
            { "id": "isa_person",    "label": "isA hierarchy: Person → Customer, Seller",                                    "weight": 0.08, "match": { "type": "isA", "super": "person", "subs": ["customer", "seller"] } }
          ],
          "modelAnswer": "Entities:\n  • Person (supertype): name, address, email\n      ↳ Customer: CNR (key)\n      ↳ Seller: SNR (key), rating\n  • Product: code (key), name, category\n  • Warehouse: wcode (key), name, address\n  • Shelf (WEAK, identified by Warehouse): shelfNumber, capacity, zone\n\nRelationships:\n  • manages : Warehouse(1..1) — Seller(0..1)\n  • lists : Seller(1..*) — Product(1..*) with attribute listPrice\n  • delivers_to : Customer(*) — Warehouse(1)\n  • sells : ternary Seller × Customer × Product, with saleDate, quantity\n        (key = full triple + saleDate)\n  • stored_on : Product(*) — Shelf(*) with attribute storedSince\n  • referred_by : recursive on Customer, 0..1 — 0..*\n\nDesign choices:\n  – Person supertype lifts shared attributes.\n  – Shelf is weak (number unique only within its warehouse).\n  – 'sells' is ternary because date + quantity depend on the (seller, customer, product) triple.\n  – Adding saleDate to the key of 'sells' supports repeat purchases.",
          "explanation": "The recurring pattern: any time an attribute depends on more than two entities simultaneously, you need a ternary (or higher-arity) relationship, not multiple binaries."
        },
        {
          "id": "1b",
          "label": "Question 1(b)",
          "prompt": "Give the associated relational schema. Indicate primary keys (underline by writing _attr_) and foreign keys (→ Relation). Comment on any attributes that may be NULL and on the constraints a relational database could check (including candidate keys).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "rel_customer",   "label": "customer(_cnr_, name, address, email, referredBy → customer, deliveryWarehouse → warehouse)", "weight": 0.1  },
            { "id": "rel_seller",     "label": "seller(_snr_, name, address, email, rating)",                                                  "weight": 0.08 },
            { "id": "rel_product",    "label": "product(_code_, name, category)",                                                              "weight": 0.06 },
            { "id": "rel_warehouse",  "label": "warehouse(_wcode_, name, address, manager → seller)",                                          "weight": 0.08 },
            { "id": "rel_shelf",      "label": "shelf(_warehouse → warehouse, shelfNumber_, capacity, zone) — composite PK",                   "weight": 0.1  },
            { "id": "rel_lists",      "label": "lists(_snr → seller, code → product_, listPrice)",                                             "weight": 0.08 },
            { "id": "rel_sells",      "label": "sells(_snr → seller, cnr → customer, code → product, saleDate_, quantity)",                    "weight": 0.12 },
            { "id": "rel_stored",     "label": "storedOn(_code → product, warehouse, shelfNumber_, storedSince) with composite FK to shelf",   "weight": 0.1  },
            { "id": "nullable_comment","label": "Notes referredBy and manager may be NULL; composite FK on shelf; ON DELETE CASCADE for shelf", "weight": 0.1  },
            { "id": "constraints",    "label": "DB constraints: NOT NULL on mandatory FKs, CHECK (referredBy ≠ cnr), CHECK on rating in [1..5]", "weight": 0.1  }
          ],
          "modelAnswer": "Relational schema (PKs in _underscores_, FKs marked with →):\n\n  customer(_cnr_, name, address, email,\n           referredBy → customer,\n           deliveryWarehouse → warehouse)\n  seller(_snr_, name, address, email, rating)\n  product(_code_, name, category)\n  warehouse(_wcode_, name, address, manager → seller)\n  shelf(_warehouse → warehouse, shelfNumber_, capacity, zone)\n  lists(_snr → seller, code → product_, listPrice)\n  sells(_snr → seller, cnr → customer, code → product, saleDate_, quantity)\n  storedOn(_code → product, warehouse, shelfNumber_, storedSince)\n     with (warehouse, shelfNumber) → shelf as composite FK\n\nNULLable / constraints:\n  • customer.referredBy is NULLable; CHECK (referredBy <> cnr).\n  • warehouse.manager may be NULL.\n  • CHECK (rating BETWEEN 1 AND 5) on seller.\n  • Shelf's identifying FK should be ON DELETE CASCADE.\n  • Mandatory NOT NULL: customer.deliveryWarehouse, lists.listPrice, sells.quantity, shelf.capacity.",
          "explanation": "The 'sells' relation behaves much like a fact table in a star schema: it has three foreign keys (seller, customer, product), a time dimension (saleDate) and a measure (quantity)."
        }
      ]
    },
    {
      "id": "2",
      "title": "2 Normalization",
      "intro": "Given R(A, B, C, D, E) and the set of functional dependencies\n\n    F = { AB → C,  A → D,  D → E,  BE → C }.\n\nShow your intermediate steps in all answers below.",
      "subquestions": [
        {
          "id": "2a",
          "label": "Question 2(a)",
          "prompt": "Is F canonical (a minimal basis)? If not, make it so. Give the canonical set of FDs, one per line.",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["A->D", "D->E", "BE->C"],
            "acceptedVariants": ["A→D", "D→E", "BE→C"]
          },
          "rubric": [
            { "id": "split",       "label": "All FDs already have single-attribute RHSs",                                       "weight": 0.1 },
            { "id": "extraneous",  "label": "Tests extraneous LHS attributes (A, B in AB→C; B, E in BE→C; D in A→D; etc.)",     "weight": 0.25 },
            { "id": "redundancy",  "label": "Shows that AB→C IS REDUNDANT (because AB+ already implies C via A→D→E and BE→C)", "weight": 0.45 },
            { "id": "final_set",   "label": "Final canonical set: { A→D, D→E, BE→C }",                                          "weight": 0.2 }
          ],
          "modelAnswer": "Step 1 — single RHSs: already.\n\nStep 2 — extraneous LHS attributes:\n   AB→C : is B extraneous? A+ = {A,D,E} (A→D, D→E). Does not contain C. So B is NOT extraneous.\n          is A extraneous? B+ = {B}. NOT extraneous.\n   BE→C : is E extraneous? B+ = {B}. Doesn't get to C. NOT.\n          is B extraneous? E+ = {E}. NOT.\n\nStep 3 — redundancy (one FD at a time):\n   Drop AB→C? Compute AB+ in F \\ {AB→C}: {A,B} ∪ {D} (A→D) ∪ {E} (D→E) ∪ {C} (BE→C, since B and E are in the set) = ABCDE. So C is still derivable — AB→C is REDUNDANT, drop it.\n   Drop A→D? A+ without it: {A}; cannot derive D. NOT redundant.\n   Drop D→E? D+ without it: {D}. NOT redundant.\n   Drop BE→C? BE+ without it: {B,E}. NOT redundant.\n\nCanonical cover: F* = { A→D, D→E, BE→C }.",
          "explanation": "The interesting move is detecting that AB→C is implied transitively: A determines D, D determines E, and then BE determines C. So AB also implies C through that chain — making AB→C redundant."
        },
        {
          "id": "2b",
          "label": "Question 2(b)",
          "prompt": "What are the minimal (candidate) keys of R(A, B, C, D, E)?",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["{A,B}"],
            "acceptedVariants": ["AB", "{AB}", "(A,B)"]
          },
          "rubric": [
            { "id": "must_include", "label": "Argues A and B both appear on no RHS → both must be in every candidate key", "weight": 0.45 },
            { "id": "closure",      "label": "Computes (AB)+ and shows it equals ABCDE",                                    "weight": 0.4  },
            { "id": "unique",       "label": "Concludes {A,B} is the unique minimal candidate key",                         "weight": 0.15 }
          ],
          "modelAnswer": "On RHS in F*: D (A→D), E (D→E), C (BE→C). Not on RHS: A, B. So both A and B must lie in every candidate key.\n\nClosure (AB)+ = {A,B} ∪ {D} (A→D) ∪ {E} (D→E) ∪ {C} (BE→C) = ABCDE.\n\nSo {A,B} is a superkey, and being a 2-element set with both attributes mandatory, it is minimal.\n\nUnique minimal candidate key: { A, B }.",
          "explanation": "When more than one attribute is missing from every RHS, all of them must be in every candidate key. Here that yields the unique minimal key {A,B}."
        },
        {
          "id": "2c",
          "label": "Question 2(c)",
          "prompt": "Is R in BCNF already? If not, decompose it into BCNF and state whether any FDs were lost.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "bcnf_diagnosis", "label": "Diagnoses that A→D, D→E and BE→C all violate BCNF (no LHS is a superkey of R)",  "weight": 0.25 },
            { "id": "split_step",     "label": "Performs valid BCNF splits",                                                    "weight": 0.25 },
            { "id": "final_decomp",   "label": "Reaches an FD-preserving BCNF decomposition such as { R1(B,C,E), R2(D,E), R3(A,D), R4(A,B) }", "weight": 0.3 },
            { "id": "fd_preserved",   "label": "Notes that this particular decomposition keeps every FD (BE→C in R1, D→E in R2, A→D in R3, plus the key A,B in R4)", "weight": 0.2 }
          ],
          "modelAnswer": "BCNF check. Unique key = {A,B}.\n   A→D    A+ = {A,D,E}     NOT a superkey   ✗\n   D→E    D+ = {D,E}        ✗\n   BE→C   BE+ = {B,E,C}     ✗\n\nDecomposition (decompose-on-violation):\n   Step 1 — split on BE→C: R1(B, C, E) with FD BE→C, key BE — BCNF ✓.\n      Remaining R'(A, B, D, E). Projected FDs: A→D, D→E. (AB→C dropped during canonicalisation; BE→C does not project — C is gone.)\n      Key of R' = {A,B}? AB+ in R' = {A,B,D,E} = R'. ✓.\n   Step 2 — BCNF check R': A→D has A+ in R' = {A,D,E}. Not superkey. ✗. Split:\n      R2(A, D), R'' = (A, B, E). FDs in R'': A→D? D not in R''. D→E? D not in R''. No FDs project to R''. Key = (A,B,E)? Let's check: with no FDs in R'', the only key is the full attribute set. Actually, since R'' has no FDs and we need to preserve dependency on key {A,B} of R, we keep R''(A,B,E). All keys are full.\n   Step 3 — BCNF check R2: A→D, A is the key — ✓.\n   Step 4 — Check R': we also need D→E somewhere. After Step 2, D is in R2 only (since R'' = (A,B,E) has no D). We need to keep D→E enforceable. Add R3(D,E) and check that R' = R2 ⋈ R3 ⋈ R'' is lossless. Yes, with the (A,B) join key shared between R'' and R2 through A, then (D,E) shared via D between R2 and R3.\n\nFinal BCNF schema: R1(B, C, E), R2(A, D), R3(D, E), R4(A, B, E).\n\nFD preservation:\n   • BE→C in R1 ✓\n   • A→D in R2 ✓\n   • D→E in R3 ✓\nAll three canonical FDs preserved. Lossless thanks to keeping the key {A,B} across the joins (A,B both appear in R4).",
          "explanation": "Order of decomposition matters: peeling off BE→C first keeps that FD; doing it last would scatter B, E and C across three relations and lose BE→C."
        },
        {
          "id": "2d",
          "label": "Question 2(d)",
          "prompt": "Is R in 3NF already? If not, decompose it into 3NF.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "threenf_diagnosis", "label": "Argues R is NOT in 3NF: A→D and D→E have non-superkey LHSs and D, E are non-prime; BE→C also",       "weight": 0.3  },
            { "id": "synthesis_method",  "label": "Applies synthesis: one relation per FD-group of the canonical cover { A→D, D→E, BE→C }",            "weight": 0.3  },
            { "id": "key_relation",      "label": "Adds a relation containing the candidate key {A,B} since none of the synthesised relations contains it", "weight": 0.2 },
            { "id": "final_decomp",      "label": "Reaches an FD-preserving 3NF decomposition such as { R1(A,D), R2(D,E), R3(B,C,E), R4(A,B) }",        "weight": 0.2 }
          ],
          "modelAnswer": "Prime attribute: A and B (the unique candidate key is {A,B}). Non-prime: C, D, E.\n\n3NF check.\n   A→D    D non-prime, A not superkey   ✗\n   D→E    E non-prime, D not superkey   ✗\n   BE→C   C non-prime, BE not superkey  ✗\n\n3NF synthesis from F* = { A→D, D→E, BE→C }:\n   Groups by LHS:\n      {A→D}   ⇒ R1(A, D)\n      {D→E}   ⇒ R2(D, E)\n      {BE→C}  ⇒ R3(B, C, E)\n   NONE of R1, R2, R3 contains the candidate key {A,B}. So add a key-bearing relation R4(A, B).\n   Subsumption: none of R1..R4 is a subset of another.\n\nFinal 3NF schema: R1(A, D), R2(D, E), R3(B, C, E), R4(A, B). FD-preserving (each FD lives inside one relation) and lossless because R4 contains a key.",
          "explanation": "Key tip: after synthesis, always check whether any synthesised relation contains a candidate key. If none does, add a relation just for the key to keep the join lossless."
        }
      ]
    },
    {
      "id": "3",
      "title": "3 SQL",
      "intro": "Consider the following schema (primary keys underlined, arrows indicate foreign-key references):\n\n    Person     ( _id_ , name, city, age )\n    Account    ( _accountNr_ , balance )\n    BelongsTo  ( _id → Person, accountNr → Account_ )\n    Knows      ( _id1 → Person, id2 → Person_ )   -- directed\n\nFormulate the queries below in SQL. You will only obtain full marks if your answers avoid GROUP BY in favour of existential quantification (EXISTS / NOT EXISTS).",
      "subquestions": [
        {
          "id": "3a",
          "label": "Question 3(a)",
          "prompt": "Find the ids of persons who own at least two different accounts.",
          "type": "sql",
          "datasetId": "persons_friends_knows_accounts",
          "points": 1.0,
          "tables": [
            { "name": "Person", "columns": [
              { "name": "id", "type": "INTEGER", "pk": true },
              { "name": "name", "type": "VARCHAR" },
              { "name": "city", "type": "VARCHAR" },
              { "name": "age", "type": "INTEGER" }
            ]},
            { "name": "Account", "columns": [
              { "name": "accountNr", "type": "INTEGER", "pk": true },
              { "name": "balance", "type": "REAL" }
            ]},
            { "name": "BelongsTo", "columns": [
              { "name": "id", "type": "INTEGER", "pk": true, "fk": "Person.id" },
              { "name": "accountNr", "type": "INTEGER", "pk": true, "fk": "Account.accountNr" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT DISTINCT B1.id\nFROM BelongsTo B1\nWHERE EXISTS (\n    SELECT *\n    FROM BelongsTo B2\n    WHERE B2.id = B1.id\n      AND B2.accountNr <> B1.accountNr\n);",
            "requiredPatterns": ["EXISTS", "<>"]
          },
          "rubric": [
            { "id": "uses_exists",    "label": "Uses EXISTS (or a self-join with <>), not GROUP BY",       "weight": 0.4 },
            { "id": "self_correlated","label": "Self-correlates BelongsTo on the person id",                "weight": 0.2 },
            { "id": "two_different",  "label": "Enforces that the two accountNr values are different",      "weight": 0.2 },
            { "id": "correct_result", "label": "Returns ids of persons owning ≥ 2 distinct accounts",       "weight": 0.2 }
          ],
          "modelAnswer": "SELECT DISTINCT B1.id\nFROM BelongsTo B1\nWHERE EXISTS (\n    SELECT *\n    FROM BelongsTo B2\n    WHERE B2.id = B1.id\n      AND B2.accountNr <> B1.accountNr\n);",
          "explanation": "Pick any one of the person's accounts and assert a SECOND different account exists. Person 1 owns accounts 100 and 101 in the test data, so the expected result is { 1 }."
        },
        {
          "id": "3b",
          "label": "Question 3(b)",
          "prompt": "Find the names of persons who know every person whose name starts with the letter 'A'.",
          "type": "sql",
          "datasetId": "persons_friends_knows_accounts",
          "points": 1.0,
          "tables": [
            { "name": "Person", "columns": [
              { "name": "id", "type": "INTEGER", "pk": true },
              { "name": "name", "type": "VARCHAR" },
              { "name": "city", "type": "VARCHAR" },
              { "name": "age", "type": "INTEGER" }
            ]},
            { "name": "Knows", "columns": [
              { "name": "id1", "type": "INTEGER", "pk": true, "fk": "Person.id" },
              { "name": "id2", "type": "INTEGER", "pk": true, "fk": "Person.id" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT P.name\nFROM Person P\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Person Q\n    WHERE Q.name LIKE 'A%'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Knows K\n          WHERE K.id1 = P.id\n            AND K.id2 = Q.id\n      )\n);",
            "requiredPatterns": ["NOT EXISTS", "LIKE", "A%"]
          },
          "rubric": [
            { "id": "double_neg",     "label": "Uses double-negation (NOT EXISTS … NOT EXISTS)",   "weight": 0.4 },
            { "id": "filter_like",    "label": "Restricts the inner Person loop to name LIKE 'A%'", "weight": 0.2 },
            { "id": "correlated",     "label": "Correlates Knows.id1 with the outer person",        "weight": 0.2 },
            { "id": "correct_result", "label": "Returns names of persons who Know every A-person",  "weight": 0.2 }
          ],
          "modelAnswer": "SELECT P.name\nFROM Person P\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Person Q\n    WHERE Q.name LIKE 'A%'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Knows K\n          WHERE K.id1 = P.id\n            AND K.id2 = Q.id\n      )\n);",
          "explanation": "Two persons in the test data have names starting with 'A' — Alice (id 1) and Alice (id 9). Nobody Knows both, so the expected result is empty. The structure of the query is identical to the classic 'supplies every red part' pattern."
        }
      ]
    },
    {
      "id": "4",
      "title": "4 Transactions",
      "intro": "Two short questions on transaction theory.",
      "subquestions": [
        {
          "id": "4a",
          "label": "Question 4(a)",
          "prompt": "Define a DEADLOCK. Sketch a wait-for graph that exhibits one and explain at least one DETECTION scheme and one PREVENTION scheme.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "definition",      "label": "Defines deadlock: a set of transactions each waiting for a lock held by another, with no possible progress", "weight": 0.25 },
            { "id": "wait_for_graph",  "label": "Sketches a wait-for graph (transactions are nodes; Ti → Tj iff Ti waits for a lock held by Tj) and points out a cycle", "weight": 0.25 },
            { "id": "detection",       "label": "Describes detection: periodically check the wait-for graph for cycles, abort a victim in the cycle",            "weight": 0.25 },
            { "id": "prevention",      "label": "Describes a prevention scheme (e.g. WAIT-DIE / WOUND-WAIT timestamping, or strict ordering of resource acquisition)", "weight": 0.25 }
          ],
          "modelAnswer": "Deadlock. A deadlock occurs when a set of transactions T1, T2, ..., Tk is mutually blocked: each Ti waits on a lock held by some Tj in the set, and no transaction can proceed. The classic example:\n   T1 holds X(A), wants X(B).\n   T2 holds X(B), wants X(A).\n\nWait-for graph.\n  Nodes are running transactions. Edge Ti → Tj iff Ti is blocked waiting for a lock held by Tj. For the example above:\n       T1 ───→ T2\n        ↑       │\n        └───────┘\n  A cycle ⇔ a deadlock.\n\nDetection scheme.\n  Periodically (every few seconds, or every N lock acquisitions) the lock manager runs a cycle detection over the wait-for graph. If a cycle is found, the system aborts a VICTIM — typically the youngest transaction or the one with the least work invested — releasing its locks. The remaining transactions can then proceed.\n\nPrevention scheme — WAIT-DIE.\n  When Ti requests a lock held by Tj:\n     • If Ti is older (smaller timestamp) than Tj, Ti is allowed to WAIT.\n     • Otherwise (Ti younger), Ti is aborted (DIES) and restarted with its original timestamp.\n  This guarantees the wait-for graph contains only edges from older to younger transactions; cycles are impossible.\n\n(Equivalent alternative: WOUND-WAIT, in which older transactions preempt younger ones rather than dying themselves.)",
          "explanation": "Two angles to remember: detection (let deadlocks happen, find them with a cycle search) versus prevention (use timestamps so the wait-for graph never has cycles). Most production DBMSs choose detection because prevention can lead to high abort rates under contention."
        },
        {
          "id": "4b",
          "label": "Question 4(b)",
          "prompt": "Use the precedence-graph method to decide whether the following schedule is conflict-serializable. Draw the edges of the precedence graph, list the cycles (if any), and conclude.\n\n  T1: R(X)              W(Y)\n  T2:        W(X)                 R(Z)\n  T3:                  R(Y)              W(Z)\n\nThe global order is: T1:R(X), T2:W(X), T3:R(Y), T1:W(Y), T2:R(Z), T3:W(Z).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "method",         "label": "States the precedence-graph rule",                            "weight": 0.2  },
            { "id": "edge_t1_t2",     "label": "Identifies edge T1 → T2 (T1:R(X) before T2:W(X))",          "weight": 0.15 },
            { "id": "edge_t3_t1",     "label": "Identifies edge T3 → T1 (T3:R(Y) before T1:W(Y))",          "weight": 0.15 },
            { "id": "edge_t2_t3",     "label": "Identifies edge T2 → T3 (T2:R(Z) before T3:W(Z))",          "weight": 0.15 },
            { "id": "cycle",          "label": "Spots the cycle T1 → T2 → T3 → T1 and concludes NOT conflict-serializable", "weight": 0.35 }
          ],
          "modelAnswer": "Conflicts in time order:\n   T1:R(X) ... T2:W(X)   ⇒ T1 → T2  (read-write on X)\n   T3:R(Y) ... T1:W(Y)   ⇒ T3 → T1  (read-write on Y)\n   T2:R(Z) ... T3:W(Z)   ⇒ T2 → T3  (read-write on Z)\n   (No other conflicting pairs.)\n\nEdges: { T1 → T2, T2 → T3, T3 → T1 }.\n\nCycle: T1 → T2 → T3 → T1 (length 3, the full triangle).\n\nConclusion. The graph contains a cycle, therefore the schedule is NOT conflict-serializable.",
          "explanation": "The classic three-transaction cycle: each pair contributes one edge, and the three edges close the loop. A useful sanity check — if all three edges go in the same rotational direction around the triangle, you have a cycle."
        }
      ]
    },
    {
      "id": "5",
      "title": "5 Database APIs",
      "intro": "Two short questions on how applications talk to a database.",
      "subquestions": [
        {
          "id": "5a",
          "label": "Question 5(a)",
          "prompt": "Explain SQL INJECTION with a concrete example, and show how prepared statements (parameterised queries) prevent it. Why is escaping by hand not a robust alternative?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "concrete_example", "label": "Gives a concrete vulnerable query and a malicious input that bypasses authentication or leaks data", "weight": 0.3  },
            { "id": "prepared_fix",     "label": "Shows the SAME query rewritten as a prepared statement with bind parameters",                        "weight": 0.3  },
            { "id": "out_of_band",      "label": "Explains that bound parameter values are sent OUT-OF-BAND so they cannot be re-parsed as SQL",        "weight": 0.2  },
            { "id": "manual_escape_bad","label": "Notes that manual escaping is fragile: easy to miss a code path, encodings differ, second-order injection through stored values is still possible", "weight": 0.2 }
          ],
          "modelAnswer": "Concrete vulnerability.\n   String sql = \"SELECT * FROM Users WHERE name = '\" + userInput + \"' AND pwd = '\" + pwdInput + \"'\";\n   statement.executeQuery(sql);\n  Attacker submits userInput = a' OR '1'='1 — the resulting SQL becomes\n   SELECT * FROM Users WHERE name = 'a' OR '1'='1' AND pwd = '...'\n  which returns every row, bypassing authentication. Worse variants chain UNION SELECT to exfiltrate data, or DROP TABLE for destruction.\n\nPrepared-statement fix.\n   PreparedStatement ps = con.prepareStatement(\n       \"SELECT * FROM Users WHERE name = ? AND pwd = ?\");\n   ps.setString(1, userInput);\n   ps.setString(2, pwdInput);\n   ps.executeQuery();\n  The DBMS parses and plans the template ONCE; the values are shipped separately to the driver and bound to placeholders at execution time. They never enter the SQL grammar, so the injection above is structurally impossible.\n\nWhy out-of-band matters.\n  The dangerous step in the vulnerable code is concatenation — that re-introduces user content into the SQL TEXT. Prepared statements break that chain by transporting the value as a typed parameter through the protocol, alongside the (already-parsed) query.\n\nWhy manual escaping is not a robust alternative.\n  • The application must remember every code path that builds SQL — one missed concatenation is enough.\n  • Escape rules differ by DBMS (MySQL vs Postgres vs SQL Server) and by character encoding (multi-byte UTF-8 collations have historically broken escape functions).\n  • Second-order injection: an attacker stores a malicious value in row r through a properly escaped path, then a LATER query concatenates that stored value into SQL and is exploited. Defending against this requires escaping again at every read site.\n  • Static analysis tools cannot easily prove a concatenation site safe; they CAN prove a prepared-statement site safe by construction.",
          "explanation": "The point of prepared statements is not just safer typing of values — it is the architectural decoupling of the query text from the parameter values. As long as you never concatenate user input into the query text, you cannot be injection-vulnerable through that surface."
        },
        {
          "id": "5b",
          "label": "Question 5(b)",
          "prompt": "Discuss the IMPEDANCE MISMATCH between a programming language and the relational model. How do (i) raw JDBC, (ii) ORMs, and (iii) embedded SQL each address it?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "explain_mismatch", "label": "Explains what the mismatch is (rows vs objects, type systems differ, navigation by reference vs by key, transactions vs lexical scope)", "weight": 0.3  },
            { "id": "jdbc",             "label": "JDBC keeps the boundary explicit — programmer writes both Java code and SQL, manually marshals ResultSet to objects",                          "weight": 0.2  },
            { "id": "orm",              "label": "ORM tries to hide the boundary — objects ARE rows, navigation produces JOINs lazily, but with leaky abstractions (N+1, dirty sessions)",        "weight": 0.3  },
            { "id": "embedded_sql",     "label": "Embedded SQL bridges the boundary at compile time — bind variables and pre-checked SQL inside host code",                                       "weight": 0.2  }
          ],
          "modelAnswer": "The impedance mismatch.\n  Programming languages think in terms of objects, references, inheritance, control flow and lexically scoped local data. The relational model thinks in terms of sets of rows, foreign keys, set operations and transactions. Concretely:\n  • Identity. Java objects have identity by reference; rows have identity by primary key.\n  • Type system. Class hierarchies and parametric types vs flat columns with NULLs.\n  • Navigation. Following a Java reference is O(1); following a row across a foreign key is a JOIN or a separate query.\n  • Lifetime. Java objects live as long as some root holds them; database rows live until DELETE.\n  • Transaction scope. Java has lexical scope; transactions have their own begin/commit boundary that crosses many method calls.\n\nHow the three approaches address it.\n\n  (i) Raw JDBC. Leaves the mismatch visible. The programmer writes SQL by hand, calls executeQuery, and walks a ResultSet, manually mapping columns into fields of POJOs. The boundary is explicit, which is verbose but predictable: there is no magic at runtime, and the developer can tune the SQL.\n\n  (ii) ORMs (Hibernate, JPA, EF Core). Try to make objects LOOK like rows. Persistent classes are mapped to tables; the runtime tracks which managed objects were modified and emits SQL on flush. Association traversal is implemented as lazy JOINs. The mismatch is hidden but the abstraction is leaky — the N+1-query problem, dirty session contention and surprising fetch graphs are direct consequences of trying to pretend that following a reference is free.\n\n  (iii) Embedded SQL (SQLJ, Pro*C). Bridges the boundary at COMPILE time. SQL statements appear inline in the host code (EXEC SQL ... INTO :host_var) and a precompiler translates them into safe call-level invocations after type-checking the column / variable types. Less flexible than JDBC, but the boundary crossings are validated up front and there is no runtime metadata reflection.\n\nNo single approach 'wins': raw JDBC for performance-critical or analytic code, ORMs for boilerplate-heavy business code, embedded SQL for legacy and statically-known reporting jobs.",
          "explanation": "The mismatch is the reason 'just use the database directly' is not as easy as it sounds. Each toolkit picks a different point on the trade-off curve between abstraction and predictability."
        }
      ]
    }
  ]
}
,
{
  "id": "mock-6",
  "title": "Mock Final 6 — Music Streaming",
  "shortTitle": "Music streaming",
  "tagline": "ER · isA · ternary · weak Track · transitive FD reduction · companies SQL",
  "durationMinutes": 165,
  "maxPoints": 8.0,
  "gradeFormula": "score / maxPoints * 10",
  "tasks": [
    {
      "id": "1",
      "title": "1 Conceptual Design",
      "intro": "Consider the following case for a music streaming service. Users have a user id (UID), a name, a country and a join date. Artists have an artist id (AID), a stage name, a genre and a monthly-listener count. Songs have a song code, a title and a duration (seconds). Albums have an album code, a title and a release date. Each album has exactly one main artist who released it. An artist may perform on one or more songs; for every song an artist performs on, the role (lead / featured) is recorded. Every user has exactly one artist registered as their favourite artist. Users curate playlists, which have a playlist id (PLID), a name and a public/private flag. A playlist contains tracks: a track has a position number unique only within its playlist, plus the date it was added; a track ceases to exist when its playlist is deleted; each track refers to exactly one song. When a user listens to a song on a given date, the duration listened and the device type (phone, desktop, speaker) are recorded; the same user may listen to the same song many times on different dates. Both users and artists are persons: they share name, date of birth and country. Finally, every user can follow another user (the 'followed user'), which is a recursive relationship on User.",
      "subquestions": [
        {
          "id": "1a",
          "label": "Question 1(a)",
          "prompt": "Provide a conceptual database model in the form of an ER Diagram. Explain the most important design choices and document relevant assumptions.",
          "type": "er_diagram",
          "points": 1.5,
          "hint": "Track is a weak entity inside Playlist. 'listens' must be ternary on User × Song × Date because (duration, deviceType) depends on all three. The 'follows' link is a recursive relationship on User.",
          "rubric": [
            { "id": "ent_user",     "label": "Entity set User with key UID and attributes name, country, joinDate",        "weight": 0.12, "match": { "type": "entity", "name": "user", "keyAttribute": "uid" } },
            { "id": "ent_artist",   "label": "Entity set Artist with key AID and attributes stageName, genre, monthlyListeners", "weight": 0.12, "match": { "type": "entity", "name": "artist", "keyAttribute": "aid" } },
            { "id": "ent_song",     "label": "Entity set Song with key code and attributes title, duration",                 "weight": 0.1,  "match": { "type": "entity", "name": "song", "keyAttribute": "code" } },
            { "id": "ent_playlist", "label": "Entity set Playlist with key PLID and attributes name, isPublic",              "weight": 0.1,  "match": { "type": "entity", "name": "playlist", "keyAttribute": "plid" } },
            { "id": "ent_track",    "label": "Weak entity Track (identified by Playlist + position)",                         "weight": 0.12, "match": { "type": "entity", "name": "track", "weak": true } },
            { "id": "rel_released", "label": "Relationship 'released_by' between Album/main-album-artist (1..1) and Artist", "weight": 0.1,  "match": { "type": "relationship", "name": "released_by" } },
            { "id": "rel_performs", "label": "Relationship 'performs' between Artist (1..*) and Song (1..*) with attribute role", "weight": 0.1, "match": { "type": "relationship", "name": "performs", "connects": ["artist", "song"] } },
            { "id": "rel_favourite","label": "Relationship 'favourite_artist' between User (1..*) and Artist (1..1)",         "weight": 0.08, "match": { "type": "relationship", "name": "favourite_artist", "connects": ["user", "artist"] } },
            { "id": "ter_listens",  "label": "Ternary relationship 'listens' among User, Song, Date with duration, deviceType", "weight": 0.15, "match": { "type": "relationship", "name": "listens" } },
            { "id": "rel_refers",   "label": "Relationship between Track and Song ('track_song' or 'refers_to')",             "weight": 0.08, "match": { "type": "relationship", "name": "refers_to", "connects": ["track", "song"] } },
            { "id": "rec_follows",  "label": "Recursive relationship 'follows' on User",                                      "weight": 0.05, "match": { "type": "relationship", "name": "follows", "connects": ["user", "user"] } },
            { "id": "isa_person",   "label": "isA hierarchy: Person → User, Artist",                                          "weight": 0.08, "match": { "type": "isA", "super": "person", "subs": ["user", "artist"] } }
          ],
          "modelAnswer": "Entities:\n  • Person (supertype): name, dateOfBirth, country\n      ↳ User: UID (key), joinDate\n      ↳ Artist: AID (key), stageName, genre, monthlyListeners\n  • Song: code (key), title, duration\n  • Playlist: PLID (key), name, isPublic\n  • Track (WEAK, identified by Playlist): position, addedDate\n  (Optional 6th entity: Album if you choose to model it explicitly.)\n\nRelationships:\n  • released_by : (Album or main-artist-of-album) — Artist(1) [if Album modelled explicitly]\n  • performs : Artist(1..*) — Song(1..*) with attribute role\n  • favourite_artist : User(*) — Artist(1)\n  • listens : ternary User × Song × Date with attributes duration, deviceType\n  • refers_to : Track — Song(*), each Track refers to exactly one Song\n  • follows : recursive on User, 0..* — 0..*\n  • belongs_to_playlist : identifying relationship between Track and Playlist (weak entity link)\n\nDesign choices:\n  – Track is weak because its position number is unique only within a playlist, and it disappears with its playlist.\n  – 'listens' is ternary because duration and deviceType depend on user, song and date together.\n  – favourite_artist is a 1..* / 1 relationship (each User has exactly one favourite); modelled as a simple binary.",
          "explanation": "Two non-obvious moves: (i) Track is a weak entity even though it is just an ordered list element — its IDENTITY (position) only makes sense relative to its playlist; (ii) listens is ternary, not a binary on User × Song with a date attribute, because date is part of the key (multiple listens per pair)."
        },
        {
          "id": "1b",
          "label": "Question 1(b)",
          "prompt": "Give the associated relational schema. Indicate primary keys (underline by writing _attr_) and foreign keys (→ Relation). Comment on any attributes that may be NULL and on the constraints a relational database could check (including candidate keys).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "rel_user",     "label": "user(_uid_, name, dob, country, joinDate, favouriteArtist → artist)",          "weight": 0.1  },
            { "id": "rel_artist",   "label": "artist(_aid_, name, dob, country, stageName, genre, monthlyListeners)",         "weight": 0.08 },
            { "id": "rel_song",     "label": "song(_code_, title, duration)",                                                  "weight": 0.06 },
            { "id": "rel_playlist", "label": "playlist(_plid_, name, isPublic, owner → user)",                                 "weight": 0.08 },
            { "id": "rel_track",    "label": "track(_playlist → playlist, position_, addedDate, song → song)",                 "weight": 0.1  },
            { "id": "rel_performs", "label": "performs(_aid → artist, code → song_, role)",                                    "weight": 0.08 },
            { "id": "rel_listens",  "label": "listens(_uid → user, code → song, date_, duration, deviceType)",                 "weight": 0.12 },
            { "id": "rel_follows",  "label": "follows(_follower → user, followed → user_) with CHECK follower ≠ followed",     "weight": 0.1  },
            { "id": "nullable_comment","label": "Mentions track.song should be NOT NULL; favouriteArtist is NOT NULL; playlist.owner NOT NULL; ON DELETE CASCADE for track", "weight": 0.1 },
            { "id": "constraints",  "label": "DB constraints: UNIQUE (playlist, song) optionally if a song appears only once per playlist; NOT NULL on FKs", "weight": 0.1 }
          ],
          "modelAnswer": "Relational schema:\n\n  user(_uid_, name, dob, country, joinDate,\n       favouriteArtist → artist)\n  artist(_aid_, name, dob, country, stageName, genre, monthlyListeners)\n  song(_code_, title, duration)\n  playlist(_plid_, name, isPublic, owner → user)\n  track(_playlist → playlist, position_, addedDate, song → song)\n  performs(_aid → artist, code → song_, role)\n  listens(_uid → user, code → song, date_, duration, deviceType)\n  follows(_follower → user, followed → user_)\n      with CHECK (follower <> followed)\n\nNULLable / constraints:\n  • track.song NOT NULL — every track refers to exactly one song.\n  • playlist.owner NOT NULL — every playlist has an owner.\n  • user.favouriteArtist may be NULL if we allow new users without a chosen favourite; otherwise NOT NULL.\n  • Track's FK to playlist is part of the PK → ON DELETE CASCADE matches weak-entity semantics.\n  • Optional UNIQUE (playlist, song) on track if no song should appear twice in the same playlist.",
          "explanation": "Note that 'follows' becomes a stand-alone relation with composite PK; the CHECK constraint forbids self-following. Track's identifying FK to Playlist participates in its primary key, so it doubles as a CASCADE delete trigger."
        }
      ]
    },
    {
      "id": "2",
      "title": "2 Normalization",
      "intro": "Given R(A, B, C, D, E) and the set of functional dependencies\n\n    F = { A → B,  B → C,  AC → D,  D → E }.\n\nShow your intermediate steps in all answers below.",
      "subquestions": [
        {
          "id": "2a",
          "label": "Question 2(a)",
          "prompt": "Is F canonical (a minimal basis)? If not, make it so. Give the canonical set of FDs, one per line.",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["A->B", "B->C", "A->D", "D->E"],
            "acceptedVariants": ["A→B", "B→C", "A→D", "D→E"]
          },
          "rubric": [
            { "id": "split",       "label": "All FDs single-attribute on the RHS",                                                "weight": 0.1 },
            { "id": "extraneous",  "label": "Shows C is extraneous in AC→D (A+ already contains C via A→B→C) → replace with A→D", "weight": 0.5 },
            { "id": "redundancy",  "label": "Confirms no remaining FD is redundant",                                              "weight": 0.25 },
            { "id": "final_set",   "label": "Final canonical set: { A→B, B→C, A→D, D→E }",                                        "weight": 0.15 }
          ],
          "modelAnswer": "Step 1 — single RHSs: already satisfied.\n\nStep 2 — extraneous LHS attributes:\n   AC→D : is C extraneous? Compute A+ under F: {A} ∪ {B} (A→B) ∪ {C} (B→C) = {A,B,C}. So A+ already contains C. Therefore C is EXTRANEOUS in AC→D; replace with A→D.\n          is A extraneous? C+ = {C}; does not contain D. NOT extraneous.\n   The other FDs have single attributes on the LHS.\n\nWorking set: { A→B, B→C, A→D, D→E }.\n\nStep 3 — redundancy:\n   Drop A→B? A+ in F\\{A→B} = {A,D,E}; no B. NOT redundant.\n   Drop B→C? B+ in F\\{B→C} = {B}; no C. NOT redundant.\n   Drop A→D? A+ in F\\{A→D} = {A,B,C}; no D. NOT redundant.\n   Drop D→E? D+ = {D}. NOT redundant.\n\nCanonical cover: F* = { A→B, B→C, A→D, D→E }.",
          "explanation": "The key step is spotting that A→B→C makes C redundant on the LEFT of AC→D. After that, A simplifies the FD to A→D directly."
        },
        {
          "id": "2b",
          "label": "Question 2(b)",
          "prompt": "What are the minimal (candidate) keys of R(A, B, C, D, E)?",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["{A}"],
            "acceptedVariants": ["A", "{A}", "(A)"]
          },
          "rubric": [
            { "id": "must_include", "label": "Argues A appears on no RHS, so A must be in every candidate key",            "weight": 0.4 },
            { "id": "closure",      "label": "Computes A+ and shows it equals ABCDE",                                      "weight": 0.4 },
            { "id": "unique",       "label": "Concludes {A} is the unique minimal candidate key",                          "weight": 0.2 }
          ],
          "modelAnswer": "On RHS in F*: B (A→B), C (B→C), D (A→D), E (D→E). Not on RHS: A. So A must be in every candidate key.\n\nA+ = {A} ∪ {B} (A→B) ∪ {C} (B→C) ∪ {D} (A→D) ∪ {E} (D→E) = ABCDE ✓ superkey.\n\nSingle-attribute → minimal. Unique candidate key: { A }.",
          "explanation": "Same shape as Mock 4: the 'never-on-RHS' trick fixes A; closure A+ confirms minimality."
        },
        {
          "id": "2c",
          "label": "Question 2(c)",
          "prompt": "Is R in BCNF already? If not, decompose it into BCNF and state whether any FDs were lost.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "bcnf_diagnosis", "label": "Diagnoses that B→C and D→E violate BCNF (neither B nor D is a superkey)",   "weight": 0.25 },
            { "id": "split_step",     "label": "Performs valid BCNF splits",                                                  "weight": 0.25 },
            { "id": "final_decomp",   "label": "Reaches { R1(D,E), R2(B,C), R3(A,B,D) } and all are in BCNF",                  "weight": 0.3 },
            { "id": "fd_preserved",   "label": "Notes that no FD is lost — decomposition is FD-preserving",                    "weight": 0.2 }
          ],
          "modelAnswer": "BCNF check. The unique key is {A}.\n   A→B   A is key   ✓\n   B→C   B+ = {B,C}, NOT superkey   ✗\n   A→D   A is key   ✓\n   D→E   D+ = {D,E}, NOT superkey   ✗\n\nDecomposition.\n   Step 1 — split on D→E: R1(D, E), key D — BCNF ✓.\n     Remaining R'(A, B, C, D) with FDs { A→B, B→C, A→D }. Key {A}.\n   Step 2 — BCNF check R': B→C has B+ = {B,C}, not superkey. ✗. Split on B→C: R2(B, C), key B — BCNF ✓.\n     Remaining R''(A, B, D) with FDs { A→B, A→D }. Key {A}. All LHSs are the key. BCNF ✓.\n\nFinal BCNF schema: R1(D, E), R2(B, C), R3(A, B, D).\n\nFD preservation:\n   • A→B and A→D in R3 ✓\n   • B→C in R2 ✓\n   • D→E in R1 ✓\nNo FD is lost — this BCNF decomposition is also FD-preserving.",
          "explanation": "Chain-of-FDs schemas (A→B→C, A→D→E) typically decompose cleanly: each two-attribute violator becomes its own relation, and what remains is the 'spine' through the candidate key."
        },
        {
          "id": "2d",
          "label": "Question 2(d)",
          "prompt": "Is R in 3NF already? If not, decompose it into 3NF.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "threenf_diagnosis", "label": "Argues R is NOT in 3NF: B→C and D→E have non-superkey LHSs and C, E are non-prime",     "weight": 0.3  },
            { "id": "synthesis_method",  "label": "Applies synthesis: one relation per FD-group of the canonical cover",                  "weight": 0.3  },
            { "id": "key_relation",      "label": "Includes a relation containing the candidate key {A} (R3 here)",                       "weight": 0.2  },
            { "id": "final_decomp",      "label": "Reaches { R1(A,B,D), R2(B,C), R3(D,E) } or equivalent FD-preserving 3NF decomposition", "weight": 0.2  }
          ],
          "modelAnswer": "Prime attribute: A only. Non-prime: B, C, D, E.\n\n3NF check.\n   A→B   A is the key                  ✓\n   B→C   C non-prime, B not superkey   ✗\n   A→D   A is the key                  ✓\n   D→E   E non-prime, D not superkey   ✗\n\n3NF synthesis from F* = { A→B, B→C, A→D, D→E }:\n   Groups by LHS:\n      {A→B, A→D}   ⇒ R1(A, B, D)\n      {B→C}        ⇒ R2(B, C)\n      {D→E}        ⇒ R3(D, E)\n   Candidate key {A} is contained in R1 — no extra key relation needed.\n   Subsumption: none.\n\nFinal 3NF schema: R1(A, B, D), R2(B, C), R3(D, E). Coincides with the BCNF decomposition above. Lossless and FD-preserving.",
          "explanation": "When BCNF preserves all FDs (as here), the 3NF synthesis algorithm typically lands on the same decomposition. The two algorithms only diverge when BCNF is forced to break an FD."
        }
      ]
    },
    {
      "id": "3",
      "title": "3 SQL",
      "intro": "Consider the following schema (primary keys underlined, arrows indicate foreign-key references):\n\n    Employee( _employeeName_ , street, city )\n    Company ( _companyName, city_ )\n    Works   ( _employeeName → Employee, companyName_ , salary )\n\nFormulate the queries below in SQL. You will only obtain full marks if your answers avoid GROUP BY in favour of existential quantification (EXISTS / NOT EXISTS).",
      "subquestions": [
        {
          "id": "3a",
          "label": "Question 3(a)",
          "prompt": "Find the names of companies that employ at least two different employees who live in Brussels.",
          "type": "sql",
          "datasetId": "employees_works_companies",
          "points": 1.0,
          "tables": [
            { "name": "Employee", "columns": [
              { "name": "employeeName", "type": "VARCHAR", "pk": true },
              { "name": "street", "type": "VARCHAR" },
              { "name": "city", "type": "VARCHAR" }
            ]},
            { "name": "Works", "columns": [
              { "name": "employeeName", "type": "VARCHAR", "pk": true, "fk": "Employee.employeeName" },
              { "name": "companyName", "type": "VARCHAR", "pk": true },
              { "name": "salary", "type": "REAL" }
            ]},
            { "name": "Company", "columns": [
              { "name": "companyName", "type": "VARCHAR", "pk": true },
              { "name": "city", "type": "VARCHAR", "pk": true }
            ]}
          ],
          "answer": {
            "canonical": "SELECT DISTINCT W1.companyName\nFROM Works W1, Employee E1\nWHERE W1.employeeName = E1.employeeName\n  AND E1.city = 'Brussels'\n  AND EXISTS (\n      SELECT *\n      FROM Works W2, Employee E2\n      WHERE W2.companyName = W1.companyName\n        AND W2.employeeName = E2.employeeName\n        AND E2.city = 'Brussels'\n        AND W2.employeeName <> W1.employeeName\n  );",
            "requiredPatterns": ["EXISTS", "Brussels", "<>"]
          },
          "rubric": [
            { "id": "uses_exists",    "label": "Uses EXISTS with an inequality, not GROUP BY",                                "weight": 0.4 },
            { "id": "filter_city",    "label": "Filters Employee.city = 'Brussels' on both the outer and the inner subquery", "weight": 0.2 },
            { "id": "two_different",  "label": "Enforces W2.employeeName <> W1.employeeName",                                 "weight": 0.2 },
            { "id": "correct_result", "label": "Returns names of companies employing ≥ 2 distinct Brussels-resident employees", "weight": 0.2 }
          ],
          "modelAnswer": "SELECT DISTINCT W1.companyName\nFROM Works W1, Employee E1\nWHERE W1.employeeName = E1.employeeName\n  AND E1.city = 'Brussels'\n  AND EXISTS (\n      SELECT *\n      FROM Works W2, Employee E2\n      WHERE W2.companyName = W1.companyName\n        AND W2.employeeName = E2.employeeName\n        AND E2.city = 'Brussels'\n        AND W2.employeeName <> W1.employeeName\n  );",
          "explanation": "Anchor on one Brussels employee at the company and assert a SECOND, different Brussels employee at the same company exists. In the test data, Brussels employees are Smith, Brown and Taylor — all of them work at First Bank Corporation — so FBC is in the result."
        },
        {
          "id": "3b",
          "label": "Question 3(b)",
          "prompt": "Find the names of companies that employ every person who lives in Antwerp.",
          "type": "sql",
          "datasetId": "employees_works_companies",
          "points": 1.0,
          "tables": [
            { "name": "Employee", "columns": [
              { "name": "employeeName", "type": "VARCHAR", "pk": true },
              { "name": "street", "type": "VARCHAR" },
              { "name": "city", "type": "VARCHAR" }
            ]},
            { "name": "Works", "columns": [
              { "name": "employeeName", "type": "VARCHAR", "pk": true, "fk": "Employee.employeeName" },
              { "name": "companyName", "type": "VARCHAR", "pk": true },
              { "name": "salary", "type": "REAL" }
            ]},
            { "name": "Company", "columns": [
              { "name": "companyName", "type": "VARCHAR", "pk": true },
              { "name": "city", "type": "VARCHAR", "pk": true }
            ]}
          ],
          "answer": {
            "canonical": "SELECT DISTINCT C.companyName\nFROM Company C\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Employee E\n    WHERE E.city = 'Antwerp'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Works W\n          WHERE W.companyName = C.companyName\n            AND W.employeeName = E.employeeName\n      )\n);",
            "requiredPatterns": ["NOT EXISTS", "Antwerp"]
          },
          "rubric": [
            { "id": "double_neg",     "label": "Uses double-negation (NOT EXISTS … NOT EXISTS)",                            "weight": 0.4 },
            { "id": "filter_city",    "label": "Restricts the inner Employee loop to city = 'Antwerp'",                      "weight": 0.2 },
            { "id": "correlated",     "label": "Correlates Works.companyName with the outer company",                       "weight": 0.2 },
            { "id": "correct_result", "label": "Returns names of companies that employ every Antwerp resident",             "weight": 0.2 }
          ],
          "modelAnswer": "SELECT DISTINCT C.companyName\nFROM Company C\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Employee E\n    WHERE E.city = 'Antwerp'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Works W\n          WHERE W.companyName = C.companyName\n            AND W.employeeName = E.employeeName\n      )\n);",
          "explanation": "Antwerp residents in the test data are Jones and Wilson. Both work at First Bank Corporation, so FBC employs every Antwerp resident → FBC is in the result. Note SELECT DISTINCT because Company has compound PK (companyName, city) and one company can have multiple rows."
        }
      ]
    },
    {
      "id": "4",
      "title": "4 Transactions",
      "intro": "Two short questions on transaction theory.",
      "subquestions": [
        {
          "id": "4a",
          "label": "Question 4(a)",
          "prompt": "Explain Multi-Version Concurrency Control (MVCC) and how it differs from lock-based concurrency control. Give one advantage and one disadvantage.",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "definition",       "label": "Defines MVCC: writes create a new VERSION of a row; readers see a consistent snapshot based on commit timestamps", "weight": 0.3  },
            { "id": "vs_locking",       "label": "Contrasts with lock-based: in MVCC, READS DO NOT BLOCK WRITES and vice versa",                                        "weight": 0.3  },
            { "id": "advantage",        "label": "Names an advantage (better read concurrency; snapshot consistency without read locks)",                              "weight": 0.2  },
            { "id": "disadvantage",     "label": "Names a disadvantage (storage overhead; write skew under snapshot isolation; need for vacuum / garbage collection)", "weight": 0.2  }
          ],
          "modelAnswer": "MVCC.\n  Under MVCC, every write produces a NEW VERSION of the modified row, tagged with the transaction's identifier and commit timestamp. Old versions are kept until no running transaction can still see them. When transaction T reads row r, it does not see the latest version but the version that was COMMITTED before T started (or before T's last savepoint, depending on the isolation level) — this is the snapshot T sees.\n\nDifference from lock-based concurrency.\n  • In strict 2PL, a writer holds an exclusive lock on r, blocking other readers; a reader holds a shared lock, blocking writers. Readers and writers conflict.\n  • In MVCC, readers never wait for writers and writers never wait for readers — they read different versions. Only writer–writer conflicts on the same row remain (resolved by a row-level lock or by aborting one transaction).\n\nAdvantage.\n  Massively better concurrency for read-heavy workloads. Long analytic reads (reporting queries, backups) can run alongside OLTP writes without blocking. Postgres, Oracle, SQL Server (in snapshot mode), MySQL InnoDB and CockroachDB all use MVCC for this reason.\n\nDisadvantage.\n  • Storage overhead — many versions of the same row pile up; the system needs background garbage collection (VACUUM in Postgres, rollback segments in Oracle).\n  • Snapshot isolation, the default 'MVCC mode', is NOT serializable — it admits WRITE SKEW (two transactions each read a snapshot, each modify disjoint rows in a way that violates a global invariant). True serializable MVCC (SSI in Postgres) is more complex and adds extra abort risk.",
          "explanation": "Memorise the key contrast: MVCC writes new versions, locking blocks readers/writers. MVCC trades storage for concurrency."
        },
        {
          "id": "4b",
          "label": "Question 4(b)",
          "prompt": "Use the precedence-graph method to decide whether the following schedule is conflict-serializable. Draw the edges of the precedence graph and conclude.\n\n  T1:  R(A)        W(A)\n  T2:        R(B)        W(C)\n  T3:                R(A) R(C)         W(B)\n\nThe global order is: T1:R(A), T2:R(B), T3:R(A), T1:W(A), T3:R(C), T2:W(C), T3:W(B).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "method",         "label": "States the precedence-graph rule",                                  "weight": 0.2  },
            { "id": "edge_t3_t1",     "label": "Identifies edge T3 → T1 (T3:R(A) before T1:W(A))",                  "weight": 0.2  },
            { "id": "edge_t2_t3",     "label": "Identifies edge T2 → T3 (T2:R(B) before T3:W(B))",                  "weight": 0.15 },
            { "id": "edge_t3_t2",     "label": "Identifies edge T3 → T2 (T3:R(C) before T2:W(C))",                  "weight": 0.15 },
            { "id": "cycle",          "label": "Spots the cycle T2 → T3 → T2 (or any cycle) and concludes NOT conflict-serializable", "weight": 0.3 }
          ],
          "modelAnswer": "Conflicts in time order:\n   T1:R(A) ... T3:R(A)  both reads, no conflict.\n   T1:R(A) ... T1:W(A)  same transaction.\n   T3:R(A) ... T1:W(A)  ⇒ T3 → T1  (read-write on A)\n   T2:R(B) ... T3:W(B)  ⇒ T2 → T3  (read-write on B)\n   T3:R(C) ... T2:W(C)  ⇒ T3 → T2  (read-write on C)\n\nEdges: { T3 → T1, T2 → T3, T3 → T2 }.\n\nCycles. T2 → T3 → T2 — a length-2 cycle through items B and C.\n\nConclusion. The schedule is NOT conflict-serializable.",
          "explanation": "A two-edge cycle between two transactions on different items is the classic write-skew shape: T2 and T3 read each other's about-to-be-written data."
        }
      ]
    },
    {
      "id": "5",
      "title": "5 Database APIs",
      "intro": "Two short questions on how applications talk to a database.",
      "subquestions": [
        {
          "id": "5a",
          "label": "Question 5(a)",
          "prompt": "Explain how BATCHED PREPARED STATEMENTS work in a typical database API (e.g. JDBC's addBatch / executeBatch). What performance problem do they solve, and how do they interact with autoCommit?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "problem",     "label": "Identifies the problem they solve: per-statement network round-trips dominate latency for bulk inserts/updates",            "weight": 0.3  },
            { "id": "how_it_works","label": "Explains addBatch + executeBatch: queue many parameter bindings, send in one round-trip, server executes them in sequence", "weight": 0.3  },
            { "id": "autocommit",  "label": "Notes the interaction with autoCommit: with autoCommit ON each batch item is its own transaction; usually you turn it off and commit once after the batch", "weight": 0.25 },
            { "id": "error_handling","label": "Mentions partial failure handling: BatchUpdateException.getUpdateCounts() reports which rows succeeded",                  "weight": 0.15 }
          ],
          "modelAnswer": "Problem solved.\n  Bulk operations — loading 100 000 rows from a CSV, applying a backfill to many rows — dominated by network round-trips if each INSERT is shipped separately. Even with a prepared statement, executing it N times means N parse/bind + N round-trips, plus N transactions if autoCommit is on.\n\nHow batched prepared statements work.\n  PreparedStatement ps = con.prepareStatement(\"INSERT INTO log(ts, msg) VALUES (?, ?)\");\n  for (Row r : rows) {\n     ps.setLong(1, r.ts);\n     ps.setString(2, r.msg);\n     ps.addBatch();             // queue the binding locally\n  }\n  int[] counts = ps.executeBatch();  // ship the whole queue in one (or a few) round-trips\n  The driver sends a chunk of bind-parameter sets to the server; the server applies the (already-parsed) statement once per set. Most drivers automatically split the batch into reasonable chunks if it is very large.\n\nInteraction with autoCommit.\n  • autoCommit = true: each statement in the batch is its own transaction, so even though the network cost is amortised, the COMMIT cost per row remains. Almost always wrong for bulk operations.\n  • autoCommit = false: the batch executes inside one transaction, with one commit() at the end. Much faster and atomic — if the load fails halfway, rollback() leaves the table clean.\n\nPartial failures.\n  If a statement in the batch fails, the driver throws BatchUpdateException. Call BatchUpdateException.getUpdateCounts() — it returns the success / failure indicators for each statement up to the failure point, so the application can decide whether to retry just the failing rows or roll back the whole transaction.",
          "explanation": "Round-trip count is what kills bulk loaders, not CPU. Batching collapses many round-trips into one, and turning off autoCommit collapses many commits into one. The two optimisations stack."
        },
        {
          "id": "5b",
          "label": "Question 5(b)",
          "prompt": "Explain STORED PROCEDURES and TRIGGERS. What are the security and performance arguments for putting application logic INSIDE the database — and what are the arguments AGAINST?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "stored_proc",   "label": "Defines stored procedures (named compiled SQL blocks callable by clients) and triggers (procedures that fire on INSERT / UPDATE / DELETE)", "weight": 0.3  },
            { "id": "pro_perf",      "label": "Names a performance argument: reduce round-trips, plan caching, server-side joins on local data",                                            "weight": 0.2  },
            { "id": "pro_sec",       "label": "Names a security argument: grant EXECUTE on the procedure while denying direct table access; enforce business rules via triggers",           "weight": 0.25 },
            { "id": "against",       "label": "Names an argument against: harder to test/version, vendor lock-in, business logic split between app and DB, slow CI/CD",                     "weight": 0.25 }
          ],
          "modelAnswer": "Stored procedures and triggers.\n  • Stored procedure — a named, server-side block of SQL (often with control flow, variables and loops in PL/SQL, T-SQL or PL/pgSQL) that a client can invoke by name. The procedure body is parsed and compiled when created.\n  • Trigger — a stored procedure that fires AUTOMATICALLY in response to INSERT / UPDATE / DELETE events on a table (BEFORE or AFTER, ROW or STATEMENT level). The application code does not need to call it explicitly.\n\nArguments FOR putting logic in the database.\n  Performance.\n   • Round-trips: one CALL invokes many statements that run server-side, eliminating Latin-American-shaped fan-out of network calls.\n   • Plan caching: the procedure is parsed and planned once; subsequent calls reuse the plan.\n   • Locality: the procedure operates on data that already lives in the database; no need to ship rows to the application.\n\n  Security.\n   • Privilege separation: grant EXECUTE on a procedure while DENYING direct SELECT/UPDATE on the underlying tables. Users cannot bypass the procedure's checks.\n   • Trigger-based enforcement: audit logging, soft-delete propagation, derived columns can be enforced by triggers — application code that forgets the rules cannot violate them.\n\nArguments AGAINST.\n  • Tooling and testing: stored procedures live outside the application source tree; unit testing them is awkward, and changes are deployed through DB migrations rather than the normal CI/CD pipeline.\n  • Vendor lock-in: PL/SQL, T-SQL and PL/pgSQL are mutually incompatible. Moving from Oracle to Postgres rewrites every procedure.\n  • Hidden behaviour: triggers can cause UPDATE on table A to update tables B and C silently. Debugging is harder; application developers may not even know a trigger fires.\n  • Scaling: the database is usually the hardest tier to scale horizontally. Pushing CPU-heavy work into it concentrates load where capacity is most expensive.\n\nGuideline: keep cross-table integrity rules and audit triggers in the database; keep complex business workflow in the application tier.",
          "explanation": "The trade-off is consistency vs flexibility: putting logic in the DB guarantees no client can bypass it, but it sacrifices the agility and tooling of modern application development. Most teams settle on a hybrid — triggers and constraints for invariants, application code for workflows."
        }
      ]
    }
  ]
}
,
{
  "id": "mock-7",
  "title": "Mock Final 7 — Restaurant Reservations",
  "shortTitle": "Restaurant reservations",
  "tagline": "ER · isA · ternary · weak Table · two BCNF keys · suppliers SQL",
  "durationMinutes": 165,
  "maxPoints": 8.0,
  "gradeFormula": "score / maxPoints * 10",
  "tasks": [
    {
      "id": "1",
      "title": "1 Conceptual Design",
      "intro": "Consider the following case for a chain of restaurants. Guests have a guest number (GNR), a name, a date of birth and a loyalty level (bronze, silver, gold). Waiters have an employee id (EID), a name, a hire date and a salary. Dishes have a dish code, a name and a price. Restaurants have a restaurant code, a name and an address. Each restaurant is managed by exactly one waiter (the head waiter). A waiter may work at one or more restaurants; for each restaurant where a waiter works, a shift (lunch, dinner) is recorded. Every guest has exactly one restaurant registered as their favourite restaurant. Restaurants have tables: a table has a number unique only within its restaurant, plus a seat count and a location (terrace, indoor, bar); a table disappears if its restaurant closes. When a waiter serves a dish to a guest, the date and the quantity are recorded; the same guest may order the same dish from different waiters on different dates. Guests can reserve tables, and for every reservation we record the reservation start time and the reservation end time. Both waiters and guests are persons: they share name, date of birth and address. Finally, every guest has another, more senior guest registered as the one who recommended the chain to them.",
      "subquestions": [
        {
          "id": "1a",
          "label": "Question 1(a)",
          "prompt": "Provide a conceptual database model in the form of an ER Diagram. Explain the most important design choices and document relevant assumptions.",
          "type": "er_diagram",
          "points": 1.5,
          "hint": "Table is a weak entity identified by its Restaurant. 'serves' must be ternary on Waiter × Guest × Dish because (date, quantity) depends on all three. The recommended-by link is a recursive relationship on Guest.",
          "rubric": [
            { "id": "ent_guest",      "label": "Entity set Guest with key GNR and attributes name, dob, loyaltyLevel",        "weight": 0.12, "match": { "type": "entity", "name": "guest", "keyAttribute": "gnr" } },
            { "id": "ent_waiter",     "label": "Entity set Waiter with key EID and attributes name, hireDate, salary",         "weight": 0.12, "match": { "type": "entity", "name": "waiter", "keyAttribute": "eid" } },
            { "id": "ent_dish",       "label": "Entity set Dish with key code and attributes name, price",                      "weight": 0.1,  "match": { "type": "entity", "name": "dish", "keyAttribute": "code" } },
            { "id": "ent_restaurant", "label": "Entity set Restaurant with key rcode and attributes name, address",             "weight": 0.1,  "match": { "type": "entity", "name": "restaurant", "keyAttribute": "rcode" } },
            { "id": "ent_table",      "label": "Weak entity Table (identified by Restaurant + table number)",                   "weight": 0.12, "match": { "type": "entity", "name": "table", "weak": true } },
            { "id": "rel_manages",    "label": "Relationship 'manages' between Restaurant (1..1) and Waiter (0..1)",            "weight": 0.1,  "match": { "type": "relationship", "name": "manages", "connects": ["restaurant", "waiter"] } },
            { "id": "rel_works_at",   "label": "Relationship 'works_at' between Waiter (1..*) and Restaurant (1..*) with attribute shift", "weight": 0.1, "match": { "type": "relationship", "name": "works_at", "connects": ["waiter", "restaurant"] } },
            { "id": "rel_favourite",  "label": "Relationship 'favourite_restaurant' between Guest (1..*) and Restaurant (1..1)", "weight": 0.08, "match": { "type": "relationship", "name": "favourite_restaurant", "connects": ["guest", "restaurant"] } },
            { "id": "ter_serves",     "label": "Ternary relationship 'serves' among Waiter, Guest, Dish with attributes date, quantity", "weight": 0.15, "match": { "type": "relationship", "name": "serves" } },
            { "id": "rel_reserves",   "label": "Relationship 'reserves' between Guest and Table with attributes startTime, endTime", "weight": 0.08, "match": { "type": "relationship", "name": "reserves", "connects": ["guest", "table"] } },
            { "id": "rec_recommended","label": "Recursive relationship 'recommended_by' on Guest",                               "weight": 0.05, "match": { "type": "relationship", "name": "recommended_by", "connects": ["guest", "guest"] } },
            { "id": "isa_person",     "label": "isA hierarchy: Person → Guest, Waiter",                                          "weight": 0.08, "match": { "type": "isA", "super": "person", "subs": ["guest", "waiter"] } }
          ],
          "modelAnswer": "Entities:\n  • Person (supertype): name, dob, address\n      ↳ Guest: GNR (key), loyaltyLevel\n      ↳ Waiter: EID (key), hireDate, salary\n  • Dish: code (key), name, price\n  • Restaurant: rcode (key), name, address\n  • Table (WEAK, identified by Restaurant): tableNumber, seatCount, location\n\nRelationships:\n  • manages : Restaurant(1..1) — Waiter(0..1)\n  • works_at : Waiter(1..*) — Restaurant(1..*) with attribute shift\n  • favourite_restaurant : Guest(*) — Restaurant(1)\n  • serves : ternary Waiter × Guest × Dish, with date, quantity\n        (key = full triple + date)\n  • reserves : Guest(*) — Table(*) with attributes startTime, endTime\n        (key includes startTime so a guest may reserve the same table later)\n  • recommended_by : recursive on Guest, 0..1 — 0..*\n\nDesign choices:\n  – Person isA Guest, Waiter avoids duplicating shared attributes.\n  – Table is weak: its number is unique only within a restaurant.\n  – serves is ternary (date and quantity depend on the trio).\n  – startTime is part of reserves' key to support repeated bookings of the same table.",
          "explanation": "Mirror of the hospital example with different concrete nouns. The same three patterns dominate: ternary 'serves', weak Table, isA Person."
        },
        {
          "id": "1b",
          "label": "Question 1(b)",
          "prompt": "Give the associated relational schema. Indicate primary keys (underline by writing _attr_) and foreign keys (→ Relation). Comment on any attributes that may be NULL and on the constraints a relational database could check (including candidate keys).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "rel_guest",      "label": "guest(_gnr_, name, dob, address, loyaltyLevel, recommendedBy → guest, favouriteRestaurant → restaurant)", "weight": 0.1  },
            { "id": "rel_waiter",     "label": "waiter(_eid_, name, dob, address, hireDate, salary)",                                                    "weight": 0.08 },
            { "id": "rel_dish",       "label": "dish(_code_, name, price)",                                                                              "weight": 0.06 },
            { "id": "rel_restaurant", "label": "restaurant(_rcode_, name, address, headWaiter → waiter)",                                                "weight": 0.08 },
            { "id": "rel_table",      "label": "tableT(_restaurant → restaurant, tableNumber_, seatCount, location)",                                    "weight": 0.1  },
            { "id": "rel_works_at",   "label": "worksAt(_eid → waiter, rcode → restaurant_, shift)",                                                     "weight": 0.08 },
            { "id": "rel_serves",     "label": "serves(_eid → waiter, gnr → guest, dishCode → dish, date_, quantity)",                                   "weight": 0.12 },
            { "id": "rel_reserves",   "label": "reserves(_gnr → guest, restaurant, tableNumber, startTime_, endTime) with composite FK to table",         "weight": 0.1  },
            { "id": "nullable_comment","label": "Mentions recommendedBy and endTime may be NULL; headWaiter may be NULL; composite FK on table",         "weight": 0.1  },
            { "id": "constraints",    "label": "Constraints: NOT NULL on mandatory FKs, CHECK (recommendedBy ≠ gnr), CHECK (startTime < endTime), ON DELETE CASCADE for table", "weight": 0.1 }
          ],
          "modelAnswer": "Relational schema (PKs in _underscores_, FKs marked with →):\n\n  guest(_gnr_, name, dob, address, loyaltyLevel,\n        recommendedBy → guest,\n        favouriteRestaurant → restaurant)\n  waiter(_eid_, name, dob, address, hireDate, salary)\n  dish(_code_, name, price)\n  restaurant(_rcode_, name, address, headWaiter → waiter)\n  tableT(_restaurant → restaurant, tableNumber_, seatCount, location)\n  worksAt(_eid → waiter, rcode → restaurant_, shift)\n  serves(_eid → waiter, gnr → guest, dishCode → dish, date_, quantity)\n  reserves(_gnr → guest, restaurant, tableNumber, startTime_, endTime)\n     with (restaurant, tableNumber) → tableT as composite FK\n\nNULLable / constraints:\n  • guest.recommendedBy is NULLable; CHECK (recommendedBy <> gnr).\n  • restaurant.headWaiter may be NULL.\n  • reserves.endTime is NULLable while the booking is still active.\n  • CHECK (startTime < endTime) when endTime is set.\n  • Table's identifying FK should be ON DELETE CASCADE.\n  • Mandatory NOT NULL: guest.favouriteRestaurant, worksAt.shift, serves.quantity.",
          "explanation": "The 'tableT' renaming avoids clashing with the SQL keyword TABLE. Otherwise this is the standard 3-step translation we've seen across all variants."
        }
      ]
    },
    {
      "id": "2",
      "title": "2 Normalization",
      "intro": "Given R(A, B, C, D, E) and the set of functional dependencies\n\n    F = { AB → C,  B → D,  C → E,  AD → B }.\n\nShow your intermediate steps in all answers below.",
      "subquestions": [
        {
          "id": "2a",
          "label": "Question 2(a)",
          "prompt": "Is F canonical (a minimal basis)? If not, make it so. Give the canonical set of FDs, one per line.",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["AB->C", "B->D", "C->E", "AD->B"],
            "acceptedVariants": ["AB→C", "B→D", "C→E", "AD→B"]
          },
          "rubric": [
            { "id": "split",      "label": "All FDs single-attribute RHS",                                                "weight": 0.15 },
            { "id": "extraneous", "label": "Checks A and B in AB→C; A and D in AD→B; concludes none are extraneous",     "weight": 0.4  },
            { "id": "redundancy", "label": "Confirms each FD is needed (closures without it miss the RHS attribute)",     "weight": 0.3  },
            { "id": "final_set",  "label": "Final canonical set: { AB→C, B→D, C→E, AD→B }",                              "weight": 0.15 }
          ],
          "modelAnswer": "Step 1 — single RHSs: already.\n\nStep 2 — extraneous LHS attributes:\n   AB→C : is A extraneous? B+ = {B,D}. No C. NOT extraneous. Is B extraneous? A+ = {A}. NOT extraneous.\n   AD→B : is A extraneous? D+ = {D}. No B. NOT extraneous. Is D extraneous? A+ = {A}. NOT extraneous.\n\nStep 3 — redundancy:\n   Drop AB→C? AB+ in F\\{AB→C} = {A,B,D}; no C. NOT redundant.\n   Drop B→D? B+ in F\\{B→D} = {B}; no D. NOT redundant.\n   Drop C→E? C+ in F\\{C→E} = {C}; no E. NOT redundant.\n   Drop AD→B? AD+ in F\\{AD→B} = {A,D}; no B. NOT redundant.\n\nCanonical cover: F* = { AB→C, B→D, C→E, AD→B } — unchanged.",
          "explanation": "Every FD is necessary and no LHS attribute is extraneous — F is already canonical. The exercise is to PROVE that, not to rewrite."
        },
        {
          "id": "2b",
          "label": "Question 2(b)",
          "prompt": "What are the minimal (candidate) keys of R(A, B, C, D, E)?",
          "type": "text_lines",
          "points": 0.5,
          "answer": {
            "lines": ["{A,B}", "{A,D}"],
            "acceptedVariants": ["AB,AD", "{AB},{AD}", "(A,B),(A,D)"]
          },
          "rubric": [
            { "id": "must_include", "label": "Argues A appears on no RHS → A must be in every candidate key",            "weight": 0.3 },
            { "id": "closures",     "label": "Computes (AB)+ and (AD)+ and shows each equals ABCDE",                     "weight": 0.4 },
            { "id": "no_other_min", "label": "Shows that (AC)+ and (AE)+ are not full closures, so the minimal keys are exactly {AB} and {AD}", "weight": 0.3 }
          ],
          "modelAnswer": "On RHS in F*: C (AB→C), D (B→D), E (C→E), B (AD→B). Not on RHS: A. So A ∈ every key.\n\nClosures:\n   A+ = {A}                                                                       — not a superkey.\n   (AB)+ = {A,B} ∪ {C} (AB→C) ∪ {D} (B→D) ∪ {E} (C→E) = ABCDE                       ✓ key.\n   (AD)+ = {A,D} ∪ {B} (AD→B) ∪ {C} (AB→C, since A and B both present) ∪ {E} (C→E) = ABCDE   ✓ key.\n   (AC)+ = {A,C} ∪ {E} (C→E) = {A,C,E}                                             — not a superkey.\n   (AE)+ = {A,E}                                                                   — not a superkey.\n\nMinimal candidate keys: { A, B } and { A, D }.",
          "explanation": "Both AB and AD give us a 'second attribute' that lets us enter the FD chain (via either B→D or AD→B). AC and AE are dead ends — they do not produce a back-arc to the missing attributes."
        },
        {
          "id": "2c",
          "label": "Question 2(c)",
          "prompt": "Is R in BCNF already? If not, decompose it into BCNF and state whether any FDs were lost.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "bcnf_diagnosis", "label": "Diagnoses that B→D and C→E violate BCNF (neither B nor C is a superkey)",  "weight": 0.25 },
            { "id": "split_step",     "label": "Performs valid BCNF splits",                                                "weight": 0.25 },
            { "id": "final_decomp",   "label": "Reaches { R1(C,E), R2(B,D), R3(A,B,C) } and all are in BCNF",                "weight": 0.3  },
            { "id": "fd_lost",        "label": "Identifies that AD→B is lost in the BCNF decomposition",                    "weight": 0.2  }
          ],
          "modelAnswer": "BCNF check. Keys: {AB},{AD}.\n   AB→C   AB is a key                ✓\n   B→D    B+ = {B,D}                   ✗ violates\n   C→E    C+ = {C,E}                   ✗ violates\n   AD→B   AD is a key                  ✓\n\nDecomposition.\n   Step 1 — split on C→E: R1(C, E), key C — BCNF ✓.\n     Remaining R'(A, B, C, D) with FDs { AB→C, B→D, AD→B }. Keys: AB+ in R' = {A,B,C,D}, ✓; AD+ in R' = {A,B,C,D}, ✓. Both AB and AD are keys.\n   Step 2 — BCNF check R': B→D has B+ in R' = {B,D}. Not superkey. ✗. Split on B→D: R2(B, D), key B — BCNF ✓.\n     Remaining R''(A, B, C) with FDs { AB→C }. Key AB — BCNF ✓. (AD→B does not project because D not in R''.)\n\nFinal BCNF schema: R1(C, E), R2(B, D), R3(A, B, C).\n\nFD preservation:\n   • AB→C in R3 ✓\n   • B→D in R2 ✓\n   • C→E in R1 ✓\n   • AD→B — A is in R3, D is in R2, B is in both R2 and R3. The FD AD→B cannot be checked inside any single relation, so it is LOST.\n\nLossless-join holds (every split was on a determinant), but AD→B is not preserved.",
          "explanation": "This is the prototypical BCNF / FD-preservation conflict: one of the two candidate keys was 'AD', but after splitting B→D out the attribute D no longer co-exists with A in any one relation, so the AD→B rule has no home."
        },
        {
          "id": "2d",
          "label": "Question 2(d)",
          "prompt": "Is R in 3NF already? If not, decompose it into 3NF.",
          "type": "multi_line",
          "points": 0.5,
          "rubric": [
            { "id": "threenf_diagnosis", "label": "Argues R is NOT in 3NF: C→E has a non-superkey LHS and E is non-prime", "weight": 0.25 },
            { "id": "synthesis_method",  "label": "Applies synthesis: one relation per FD-group of the canonical cover",  "weight": 0.3  },
            { "id": "key_relation",      "label": "Notes that a candidate key (AB or AD) is contained in some synthesised relation, so no extra key relation needed", "weight": 0.2 },
            { "id": "final_decomp",      "label": "Reaches an FD-preserving 3NF decomposition such as { R1(A,B,C), R2(B,D), R3(C,E), R4(A,D,B) }", "weight": 0.25 }
          ],
          "modelAnswer": "Prime attributes: A, B, D (each appears in a candidate key). Non-prime: C, E.\n\n3NF check.\n   AB→C   C non-prime, AB is a key                   ✓\n   B→D    D prime                                    ✓\n   C→E    E non-prime AND C is not a superkey        ✗ violates\n   AD→B   B prime                                    ✓\n\n3NF synthesis from F* = { AB→C, B→D, C→E, AD→B }:\n   Groups by LHS:\n      {AB→C}   ⇒ R1(A, B, C)\n      {B→D}    ⇒ R2(B, D)\n      {C→E}    ⇒ R3(C, E)\n      {AD→B}   ⇒ R4(A, D, B)\n   Candidate key AB ⊂ R1 — done.\n   Subsumption: is R2(B,D) ⊂ R4(A,D,B)? Yes — drop R2 (B→D is still enforceable in R4 because both attributes are present). Actually wait — to keep B→D enforceable we must keep it in some relation where B is a key. In R4(A,B,D) the key is AD (since AD→B and FDs project as B→D and AD→B). The FD B→D still applies (B determines D in R4). So R2 is subsumed and can be dropped.\n\nFinal 3NF schema: R1(A, B, C), R3(C, E), R4(A, D, B). All four FDs preserved (AB→C in R1, B→D and AD→B in R4, C→E in R3). Lossless because R1 contains a key (AB) of R.",
          "explanation": "3NF wins back AD→B that BCNF had to discard. The price is the relation R4(A,B,D) which is not in BCNF (B→D and B is not a superkey of R4) — that is exactly the 3NF / BCNF trade-off."
        }
      ]
    },
    {
      "id": "3",
      "title": "3 SQL",
      "intro": "Consider the following schema (primary keys underlined, arrows indicate foreign-key references):\n\n    Suppliers( _sid_ , sname, saddress )\n    Parts    ( _pid_ , pname, color )\n    Catalog  ( _sid → Suppliers, pid → Parts_ , cost )\n\nFormulate the queries below in SQL. You will only obtain full marks if your answers avoid GROUP BY in favour of existential quantification (EXISTS / NOT EXISTS).",
      "subquestions": [
        {
          "id": "3a",
          "label": "Question 3(a)",
          "prompt": "Find the pids of parts that are supplied by at least two different suppliers.",
          "type": "sql",
          "datasetId": "suppliers_parts_catalog",
          "points": 1.0,
          "tables": [
            { "name": "Suppliers", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true },
              { "name": "sname", "type": "VARCHAR" },
              { "name": "saddress", "type": "VARCHAR" }
            ]},
            { "name": "Parts", "columns": [
              { "name": "pid", "type": "INTEGER", "pk": true },
              { "name": "pname", "type": "VARCHAR" },
              { "name": "color", "type": "VARCHAR" }
            ]},
            { "name": "Catalog", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true, "fk": "Suppliers.sid" },
              { "name": "pid", "type": "INTEGER", "pk": true, "fk": "Parts.pid" },
              { "name": "cost", "type": "DECIMAL" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT DISTINCT C1.pid\nFROM Catalog C1\nWHERE EXISTS (\n    SELECT *\n    FROM Catalog C2\n    WHERE C2.pid = C1.pid\n      AND C2.sid <> C1.sid\n);",
            "requiredPatterns": ["EXISTS", "<>"]
          },
          "rubric": [
            { "id": "uses_exists",    "label": "Uses EXISTS with an inequality, not GROUP BY",      "weight": 0.4 },
            { "id": "self_correlated","label": "Self-correlates Catalog on pid",                     "weight": 0.2 },
            { "id": "two_different",  "label": "Enforces C2.sid <> C1.sid",                         "weight": 0.2 },
            { "id": "correct_result", "label": "Returns pids of parts supplied by ≥ 2 distinct sids", "weight": 0.2 }
          ],
          "modelAnswer": "SELECT DISTINCT C1.pid\nFROM Catalog C1\nWHERE EXISTS (\n    SELECT *\n    FROM Catalog C2\n    WHERE C2.pid = C1.pid\n      AND C2.sid <> C1.sid\n);",
          "explanation": "Symmetric to the classic 'sid supplied by ≥ 2 parts' query. Parts 10 and 14 in the test data each have two suppliers (Acme & Bolts), so the expected result is { 10, 14 }."
        },
        {
          "id": "3b",
          "label": "Question 3(b)",
          "prompt": "Find the names of parts that are supplied by every supplier whose name starts with the letter 'A'.",
          "type": "sql",
          "datasetId": "suppliers_parts_catalog",
          "points": 1.0,
          "tables": [
            { "name": "Suppliers", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true },
              { "name": "sname", "type": "VARCHAR" },
              { "name": "saddress", "type": "VARCHAR" }
            ]},
            { "name": "Parts", "columns": [
              { "name": "pid", "type": "INTEGER", "pk": true },
              { "name": "pname", "type": "VARCHAR" },
              { "name": "color", "type": "VARCHAR" }
            ]},
            { "name": "Catalog", "columns": [
              { "name": "sid", "type": "INTEGER", "pk": true, "fk": "Suppliers.sid" },
              { "name": "pid", "type": "INTEGER", "pk": true, "fk": "Parts.pid" },
              { "name": "cost", "type": "DECIMAL" }
            ]}
          ],
          "answer": {
            "canonical": "SELECT P.pname\nFROM Parts P\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Suppliers S\n    WHERE S.sname LIKE 'A%'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Catalog C\n          WHERE C.sid = S.sid\n            AND C.pid = P.pid\n      )\n);",
            "requiredPatterns": ["NOT EXISTS", "LIKE", "A%"]
          },
          "rubric": [
            { "id": "double_neg",     "label": "Uses double-negation (NOT EXISTS … NOT EXISTS)",       "weight": 0.4 },
            { "id": "filter_like",    "label": "Restricts the inner Suppliers loop to sname LIKE 'A%'", "weight": 0.2 },
            { "id": "correlated",     "label": "Correlates Catalog.pid with the outer part",            "weight": 0.2 },
            { "id": "correct_result", "label": "Returns names of parts supplied by every A-supplier",   "weight": 0.2 }
          ],
          "modelAnswer": "SELECT P.pname\nFROM Parts P\nWHERE NOT EXISTS (\n    SELECT *\n    FROM Suppliers S\n    WHERE S.sname LIKE 'A%'\n      AND NOT EXISTS (\n          SELECT *\n          FROM Catalog C\n          WHERE C.sid = S.sid\n            AND C.pid = P.pid\n      )\n);",
          "explanation": "In the test data, the only supplier whose name starts with 'A' is Acme (sid 1). Every part that Acme supplies passes the universal quantifier — pids 10, 11, 12, 13, 14, 15, 16. So the result is the names of those seven parts."
        }
      ]
    },
    {
      "id": "4",
      "title": "4 Transactions",
      "intro": "Two short questions on transaction theory.",
      "subquestions": [
        {
          "id": "4a",
          "label": "Question 4(a)",
          "prompt": "Explain WRITE-AHEAD LOGGING (WAL). What two rules does WAL enforce? What is the role of CHECKPOINT records, and what is the difference between UNDO and REDO records in recovery?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "wal_rules",   "label": "States the two WAL rules: (a) log record describing a change is on stable storage BEFORE the page is, (b) commit record is on stable storage BEFORE COMMIT is acknowledged", "weight": 0.3 },
            { "id": "redo_undo",   "label": "Distinguishes REDO (re-apply effects of committed transactions) from UNDO (roll back effects of uncommitted transactions)",                                       "weight": 0.3 },
            { "id": "checkpoint",  "label": "Explains the role of CHECKPOINT records: bound how far back recovery must scan the log by recording the state of in-flight transactions and dirty pages",          "weight": 0.25 },
            { "id": "recovery",    "label": "Mentions ARIES-style recovery: analyse → redo all logged changes from the checkpoint → undo transactions still uncommitted",                                       "weight": 0.15 }
          ],
          "modelAnswer": "Write-Ahead Logging.\n  Every change a transaction makes is first recorded in the WAL (a sequential log on stable storage) and only afterwards applied to the data pages in the buffer pool. The two cardinal rules:\n  1. UNDO rule: before a dirty page is flushed to disk, the LOG RECORD describing the change must already be on stable storage. (Otherwise we could not roll the page back.)\n  2. REDO rule: before COMMIT is acknowledged to the client, the COMMIT record (and every log record of the transaction) must be on stable storage. (Otherwise we could lose a 'committed' transaction.)\n\nUNDO vs REDO records.\n  • REDO record — describes the AFTER-image of a change. Used after a crash to RE-APPLY effects of committed transactions whose pages were not yet flushed.\n  • UNDO record — describes the BEFORE-image. Used to ROLL BACK effects of transactions that were active at the time of the crash and never committed.\n  Most systems use combined UNDO/REDO records (e.g. ARIES) so both can be performed from one log entry.\n\nCheckpoint records.\n  A periodic CHECKPOINT writes (i) the list of transactions currently active, (ii) the list of dirty pages and their oldest log-sequence-numbers (LSNs). After a crash the recovery manager does not have to scan the WHOLE log; it starts from the last checkpoint and walks forward. Without checkpoints, recovery time would grow without bound.\n\nARIES-style recovery (3 phases).\n  1. Analysis pass — replay from the last checkpoint, rebuild the transaction table and the dirty-page table at the time of crash.\n  2. Redo pass — for every logged update later than the oldest dirty-page LSN, reapply it (idempotent).\n  3. Undo pass — for every transaction that was active at the time of crash, traverse its log records in reverse and apply the UNDO records.",
          "explanation": "Three things to lock into memory: 'log before page' (UNDO rule), 'log before commit' (REDO rule), checkpoints to bound the recovery work. ARIES = Analysis / Redo / Undo."
        },
        {
          "id": "4b",
          "label": "Question 4(b)",
          "prompt": "Use the precedence-graph method to decide whether the following schedule is conflict-serializable. Draw the edges of the precedence graph and, if it is conflict-serializable, give an equivalent serial order.\n\n  T1: R(X) R(Y)\n  T2:             R(Y)              W(X)\n  T3:                   W(Y)\n\nThe global order is: T1:R(X), T1:R(Y), T2:R(Y), T3:W(Y), T2:W(X).",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "method",         "label": "States the precedence-graph rule",                                "weight": 0.2  },
            { "id": "edge_t1_t3",     "label": "Identifies edge T1 → T3 (T1:R(Y) before T3:W(Y))",                "weight": 0.2  },
            { "id": "edge_t2_t3",     "label": "Identifies edge T2 → T3 (T2:R(Y) before T3:W(Y))",                "weight": 0.2  },
            { "id": "edge_t1_t2",     "label": "Identifies edge T1 → T2 (T1:R(X) before T2:W(X))",                "weight": 0.2  },
            { "id": "serial_order",   "label": "Notes graph is acyclic; equivalent serial order T1 → T2 → T3",     "weight": 0.2  }
          ],
          "modelAnswer": "Conflicts in time order:\n   T1:R(X) ... T2:W(X)   ⇒ T1 → T2   (read-write on X)\n   T1:R(Y) ... T2:R(Y)   both reads, no conflict.\n   T1:R(Y) ... T3:W(Y)   ⇒ T1 → T3   (read-write on Y)\n   T2:R(Y) ... T3:W(Y)   ⇒ T2 → T3   (read-write on Y)\n\nEdges: { T1 → T2, T1 → T3, T2 → T3 }.\n\nNo back-edges — the graph is a DAG with T1 as source and T3 as sink.\n\nConclusion. The schedule IS conflict-serializable. Topological sort: T1 → T2 → T3.",
          "explanation": "A 'fan-out' DAG with no edges going back is the simplest sign of conflict-serializability. The unique topological sort gives the serial order."
        }
      ]
    },
    {
      "id": "5",
      "title": "5 Database APIs",
      "intro": "Two short questions on how applications talk to a database.",
      "subquestions": [
        {
          "id": "5a",
          "label": "Question 5(a)",
          "prompt": "Explain SECOND-ORDER SQL INJECTION. Why is input that was sanitised once when it was stored still a risk later? What is the defence?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "first_order_recap",  "label": "Briefly recaps first-order SQL injection (concatenated user input on first request)",                                  "weight": 0.2  },
            { "id": "second_order_def",   "label": "Defines second-order injection: malicious value is stored after sanitisation; a LATER query that concatenates that stored value is exploited", "weight": 0.35 },
            { "id": "concrete_example",   "label": "Gives a concrete two-step scenario (e.g. attacker sets profile name = 'admin\\' --'; later report query concatenates name)", "weight": 0.2 },
            { "id": "defence",            "label": "States the defence: use parameterised queries EVERYWHERE that data is read back into SQL, not only at the input gate",       "weight": 0.25 }
          ],
          "modelAnswer": "Recap of first-order SQL injection. The classic attack: the application concatenates user input directly into a SQL string on the same request, so a value like x' OR '1'='1 changes the meaning of the query.\n\nSecond-order injection. The attacker's input is properly sanitised (or stored via a parameterised query) on the first request — so a malicious value is safely STORED in the database. Some LATER code path then reads that stored value and concatenates it into a different SQL statement; that second query is now vulnerable because the developer assumed everything from the database is 'trusted'.\n\nConcrete example.\n  1. Attacker registers with userName = 'admin\\\\'; DROP TABLE Audit; --'. The registration path uses a prepared statement, so the literal string is safely stored.\n  2. The reporting module later builds a query by concatenation:\n        \"SELECT * FROM Audit WHERE actor = '\" + user.getUserName() + \"'\"\n     becomes\n        SELECT * FROM Audit WHERE actor = 'admin\\\\'; DROP TABLE Audit; --'\n  Now the dangerous payload escapes back into SQL syntax and the table is dropped.\n\nDefence.\n  • The right rule is 'parameterise every query', not just queries that read user input directly. Treat values returned from the database with the same suspicion as values from the request.\n  • Code review and static analysis must look for concatenation patterns even in 'safe-looking' paths (admin reports, internal tools).\n  • Output encoding handles a different problem (XSS), not injection: it cannot save a query that is already malformed.\n\nIn short: input sanitisation is not durable. Parameterisation is. Apply it at every query site.",
          "explanation": "The mental model that fails developers is 'inputs are hostile, data from DB is trusted'. In a second-order attack, hostile content makes the round trip through the database and re-enters the SQL grammar on the way out."
        },
        {
          "id": "5b",
          "label": "Question 5(b)",
          "prompt": "Compare the ANSI/SPARC three-level database architecture with the layered architecture of a typical web application (UI / Service / Repository / DB). Which DBMS-level concepts map onto which application-level layers?",
          "type": "long_text",
          "points": 0.5,
          "rubric": [
            { "id": "ansi_sparc",   "label": "Names the three ANSI/SPARC levels (external / conceptual / internal)",                                                "weight": 0.3  },
            { "id": "web_layers",   "label": "Names the typical web-app layers (UI / Service / Repository or DAO / Database)",                                      "weight": 0.2  },
            { "id": "mapping",      "label": "Maps: external level → Repository / DAO objects exposed to the service layer; conceptual level → the relational schema; internal level → the DBMS storage / index layer", "weight": 0.3 },
            { "id": "data_independence","label": "Connects the mapping to data independence: app code talks to repositories so it survives schema changes (logical independence)",                            "weight": 0.2 }
          ],
          "modelAnswer": "ANSI/SPARC three levels.\n  • External (view) — per-application views of the data: subsets, joins, renames.\n  • Conceptual (logical) — the global relational schema (tables, FKs, constraints).\n  • Internal (physical) — how the data is stored, indexed, partitioned on disk.\n\nTypical web-app layers.\n  • UI / presentation — renders pages or returns JSON to clients.\n  • Service / application — business logic, validation, transaction boundaries.\n  • Repository / DAO — translation between domain objects and the database.\n  • Database — the relational DBMS itself.\n\nMapping the two stacks.\n  • External level ↔ Repository / DAO layer. Each application defines its own 'view' of the database as a set of repository methods that return domain objects. ORMs sit at this boundary. The service layer never sees raw rows or SQL — it interacts only with the repository's API.\n  • Conceptual level ↔ The relational schema itself, owned by the DBA / migration scripts. It is what the repository layer talks to under the hood.\n  • Internal level ↔ The DBMS's storage / index layer. Application code (and the repository layer) ideally never has to think about it; physical decisions (B+ tree on column X, partition by date) are made by DBAs and the optimiser.\n\nData independence.\n  • Physical independence — changing storage layout or indexes leaves the conceptual schema (and therefore the repositories) untouched.\n  • Logical independence — when the conceptual schema evolves (split a table, add a column), only the repository layer changes; the service and UI layers continue to use the same domain objects. This is the value proposition that justifies having a repository / DAO layer at all.\n\nIn other words: the repository / DAO pattern is the application-side embodiment of the ANSI/SPARC external level.",
          "explanation": "The clean mental picture: DBMS layers describe where data LIVES; application layers describe where CODE lives that uses that data. The repository layer is the bridge — and it is precisely the bridge ANSI/SPARC designed for in the form of external views."
        }
      ]
    }
  ]
}
/* === ADDITIONAL MOCK EXAMS APPENDED BELOW === */
];
window.__ISUBMIT_EXAM = window.__ISUBMIT_EXAMS[0];

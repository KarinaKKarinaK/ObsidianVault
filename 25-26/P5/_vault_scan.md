# Vault Scan — 2026-04-26

> Scanned by Claude Code. All file paths relative to P5/.

---

## DB — Databases

### Files found

| File                                           | Type         | Contents                                                                                                                                              |
| ---------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLAUDE_DATABASES.md`                          | Instructions | Complete build instructions for DB prep — video schedule (51 videos, ~770 min), daily schedule Apr 17–Jun 4, all 10 build steps, full topic checklist |
| `other_resources.md`                           | Links        | Notion notes links (vscos, applesauce, lausta) + exam review link                                                                                     |
| `exercises/ExercisesModelling.pdf`             | PDF          | ER diagram exercises                                                                                                                                  |
| `exercises/ExercisesModellingSolution.pdf`     | PDF          | Solutions for modelling exercises                                                                                                                     |
| `exercises/ExercisesNormalisation.pdf`         | PDF          | Normalisation / FD exercises                                                                                                                          |
| `exercises/ExercisesNormalisationSolution.pdf` | PDF          | Solutions for normalisation exercises                                                                                                                 |
| `exercises/ExercisesSQL.pdf`                   | PDF          | SQL exercises (likely Suppliers/Parts/Catalog schema)                                                                                                 |
| `exercises/ExercisesSQLSolution.pdf`           | PDF          | SQL exercise solutions                                                                                                                                |
| `exercises/ExercisesTransactions.pdf`          | PDF          | Transaction / serialisability exercises                                                                                                               |
| `exercises/ExercisesTransactionsSolution.pdf`  | PDF          | Solutions for transaction exercises                                                                                                                   |
| `past_exams/ExerciseExam (1).pdf`              | PDF          | Exercise exam (used as main practice exam in CLAUDE_DATABASES.md)                                                                                     |
| `past_exams/ExerciseExamSolutions (1).pdf`     | PDF          | Solutions for exercise exam                                                                                                                           |
| `slides/00_introduction.pdf`                   | Slides       | Introduction to databases                                                                                                                             |
| `slides/01_relational_model.pdf`               | Slides       | Relational model — schemas, keys, constraints                                                                                                         |
| `slides/02_data_modelling.pdf`                 | Slides       | ER diagrams, cardinality, weak entities, ISA                                                                                                          |
| `slides/03_tranlation_to_relation.pdf`         | Slides       | ER → relational schema translation                                                                                                                    |
| `slides/04_functional_dependencies.pdf`        | Slides       | FDs, canonical sets, BCNF, 3NF, 4NF                                                                                                                   |
| `slides/05_sql.pdf`                            | Slides       | SQL — all patterns including NOT EXISTS, aggregation                                                                                                  |
| `slides/06_transactions.pdf`                   | Slides       | Transactions, 2PL, serialisability, isolation levels                                                                                                  |
| `slides/07_db_application_programming.pdf`     | Slides       | DB APIs, ANSI SPARC, ORM, prepared statements                                                                                                         |

### Coverage assessment
- All 7 lecture topics have slides ✓
- Exercise exam + solutions exist ✓
- Exercises with solutions for all 4 main topic areas ✓
- **No additional past exams beyond the exercise exam**

### Missing
> [!todo] Missing: Additional past exam papers (exercise exam is the only one — confirmed from CLAUDE_DATABASES.md)

---

## TM — Text Mining for AI

### Files found

| File | Type | Contents |
|------|------|----------|
| `more_resources.md` | Notes | GitHub link for labs (`github.com/cltl/ba-text-mining`) + Canvas course info: quizzes are the ONLY practice (no separate practice exam) |
| `Lectures/tm-ba-lecture-1-course-overview.pdf` | Slides | Course overview, NLP intro |
| `Lectures/tm-ba-lecture-2-linguistics-nlp.pdf` | Slides | Linguistics + NLP pipeline |
| `Lectures/tm-ba-lecture-3-machine-learning-nlp-part1.pdf` | Slides | ML for NLP — text classification |
| `Lectures/tm-ba-lecture-3-machine-learning-nlp-part2.pdf` | Slides | ML for NLP — continued (word embeddings, sequence labelling) |
| `Lectures/tm-ba-lecture-4-sentiment.pdf` | Slides | Sentiment analysis |
| `Lectures/tm-ba-lecture-5a-nerc.pdf` | Slides | Named entity recognition (NER) |
| `Lectures/tm-ba-lecture-6-topic-modelling.pdf` | Slides | Topic modelling (LDA, NMF, neural) |
| `Fine-tuned-transformer-models.ipynb` | Notebook | Fine-tuning transformer models (BERT etc.) — practical lab notebook |

### Coverage assessment
- 6 lecture PDFs available (lectures 1–6) ✓
- Fine-tuning notebook covers transformers topic ✓
- Canvas quizzes = primary practice source (not downloadable — online only)
- **No Quizzes folder** — quiz PDFs not present
- **No transformers lecture PDF** — transformer content is only in the notebook
- **No lab assignment PDFs** — assignments are on GitHub (online only)

### Missing
> [!todo] Missing: TM Quizzes — canvas quiz PDFs/questions not downloaded. These are the primary practice source per course info.
> [!todo] Missing: TM Lecture 7 or transformers lecture PDF — transformer content only in notebook.
> [!todo] Missing: Lab assignment PDFs — available on GitHub (`github.com/cltl/ba-text-mining`) but not in vault.

---

## HoAI — History of AI

### Files found

| File | Type | Contents |
|------|------|----------|
| `Assignments/Screenshot 2026-04-26 at 12.57.00 AM.png` | Image | Assignment screenshot |
| `Assignments/Screenshot 2026-04-26 at 12.57.14 AM.png` | Image | Assignment screenshot |
| `Assignments/Screenshot 2026-04-26 at 12.57.29 AM.png` | Image | Assignment screenshot |
| `Assignments/Screenshot 2026-04-26 at 12.57.44 AM.png` | Image | Assignment screenshot |
| `Lectures/HoAI 2026 Lecture 1.pdf` | Slides | HoAI Lecture 1 |
| `Lectures/HoAI 2026 Lecture 2.pdf` | Slides | HoAI Lecture 2 |
| `Lectures/HoAI 2026 Lecture 3.pdf` | Slides | HoAI Lecture 3 |
| `Lectures/HoAI 2026 Lecture 4.pdf` | Slides | HoAI Lecture 4 |
| `Lectures/HoAI Seminar 2.pdf` | PDF | Seminar 2 materials |
| `Lectures/HoAI Seminar 3.pdf` | PDF | Seminar 3 materials |
| `Lectures/HoAI reading and writing seminar 1.pdf` | PDF | Seminar 1 — reading and writing skills |
| `Past_Exams/Exam XB_0113 2025 I (1).pdf` | PDF | Past exam 2025-I |
| `Past_Exams/Exam XB_0113 2025 II (1).pdf` | PDF | Past exam 2025-II |

### Coverage assessment
- 4 lectures + 3 seminars ✓
- 2 past exams (2025-I and 2025-II) ✓
- Assignment screenshots (content unclear — need to read for what's assigned)
- No Campbell-Kelly chapter PDFs in vault (assumed student has the book)

### Missing
> [!todo] Missing: Campbell-Kelly book chapters — not in vault. Build notes from topic checklist in CLAUDE_DATABASES.md which references chs. 4–15.
> [!todo] Missing: Seminar 4 (if it exists) — only Seminars 1, 2, 3 present.

---

## ML10.0 — Machine Learning

### Files found

| File | Type | Contents |
|------|------|----------|
| `cheat-sheet (2).pdf` | PDF | ML cheat sheet / formula reference |
| `Practice_Exam_A_noanswers.pdf` | PDF | Practice exam A (no answers) |
| `practice-exam-a.answers (4).pdf` | PDF | Practice exam A answers |
| `practice-exam-b.noanswers (4).pdf` | PDF | Practice exam B (no answers) — version 4 |
| `practice-exam-b.noanswers (5).pdf` | PDF | Practice exam B (no answers) — version 5 |
| `practice-exam-b.answers (1).pdf` | PDF | Practice exam B answers |
| `final-exam-machine-learning-28-03-2022-answers.pdf` | PDF | 2022 final exam with answers |
| `resit-exam-with-answers.pdf` | PDF | Resit exam with answers |
| `resit.2024.answers (1).pdf` | PDF | 2024 resit exam with answers |
| `ml-exam-quiz.html` | HTML | Existing ML exam quiz tool |
| `ml_exam_practice.html` | HTML | Existing ML exam practice tool |

### Coverage assessment
- Good exam coverage: Practice A + B + 2022 final + resit + 2024 resit = 5 exams/practice sets ✓
- Cheat sheet present ✓
- Two existing HTML tools already built ✓
- **No lecture slides or topic notes** — largest gap

### Additional files added 2026-04-26

| File | Type | Contents |
|------|------|----------|
| `machine-learning-lecture-notes-intro-to-ml-concepts-and-classifiers.pdf` | PDF | Intro to ML — concepts and classifiers lecture notes |
| `Machine_Learning_2026 (4).pdf` | PDF | Course guide / syllabus 2026 |
| `22.Methodology2.annotated.pdf` | Annotated slides | Week 2: Methodology |
| `31.ProbabilisticModels1.annotated (1).pdf` | Annotated slides | Week 3: Probabilistic Models |
| `32.LinearModels2.annotated.pdf` | Annotated slides | Week 3: Linear Models |
| `41.DeepLearning1.annotated.pdf` | Annotated slides | Week 4: Deep Learning I |
| `51.Deep Learning2.annotated.pdf` | Annotated slides | Week 5: Deep Learning II |
| `52.Trees.annotated.pdf` | Annotated slides | Week 5: Tree-based models |
| `61.SequentialModels.annotated.pdf` | Annotated slides | Week 6: Sequential Models |
| `62.Matrices.annotated.pdf` | Annotated slides | Week 6: Matrix methods |
| `71.Reinforcement Learning.annotated.pdf` | Annotated slides | Week 7: Reinforcement Learning |
| `72.Review.annotated.pdf` | Annotated slides | Week 7: Review |
| `Transformers.annotated.pdf` | Annotated slides | Transformers lecture |
| `week2.answers (1).pdf` + `week2.noanswers (1).pdf` | PDF | Week 2 exercises + answers |
| `week3.answers (1/2).pdf` + `week3.noanswers (1/2).pdf` | PDF | Week 3 exercises + answers |
| `week4.answers.pdf` + `week4.noanswers.pdf` | PDF | Week 4 exercises + answers |
| `week5.answers.pdf` + `week5.noanswers.pdf` | PDF | Week 5 exercises + answers |
| `week6.answers.pdf` + `week6.noanswers.pdf` | PDF | Week 6 exercises + answers |
| `ml_exam_study_guide.html` | HTML | Existing ML study guide HTML |

**Flag status: FIXED** — lecture slides and weekly exercises now present for all weeks.

### Missing
> [!todo] Missing: Week 1 annotated slides (not present — intro PDF may cover this).
> [!todo] Missing: Any identification of which specific topics lost points (gap analysis needed from student).

---

## Stats&Probab — Statistics & Probability

### Files found

| File | Type | Contents |
|------|------|----------|
| `Chapter_4.pdf` | PDF | Textbook Chapter 4 (likely probability distributions) |
| `Chapter_7.pdf` | PDF | Textbook Chapter 7 (likely inference / estimation) |
| `Chapter_8.pdf` | PDF | Textbook Chapter 8 (likely hypothesis testing or regression) |
| `formulasheet_CS-1.pdf` | PDF | Formula sheet — primary reference |
| `formulasheet_CS-1 (1).pdf` | PDF | Formula sheet (duplicate copy) |
| `Statistical+Methods+Final+2025.pdf` | PDF | Past exam: Statistical Methods Final 2025 |
| `Statistical+Methods+Final+2025 (1).pdf` | PDF | Duplicate |
| `Statistical+Methods+Final+2025 (2).pdf` | PDF | Duplicate |
| `examCS_jan2025.pdf` | PDF | Past exam: Jan 2025 |
| `examCS_jan2025 (1).pdf` | PDF | Duplicate |
| `examCS_jan2025 (2).pdf` | PDF | Duplicate |
| `exam_fall2024.pdf` | PDF | Past exam: Fall 2024 |
| `exam_fall2024 (2).pdf` | PDF | Duplicate |
| `exam_fall2024 (3).pdf` | PDF | Duplicate |
| `tentamen_Probability_and_Statistics_XB_0115_March_2025.pdf` | PDF | Past exam: March 2025 |
| `tentamen_Probability_and_Statistics_XB_0115_March_2025 (1).pdf` | PDF | Duplicate |
| `tentamen_Probability_and_Statistics_XB_0115_March_2025 (2).pdf` | PDF | Duplicate |
| `formula_sheet.html` | HTML | Formula sheet (HTML version) |
| `practice_exams.html` | HTML | Existing practice exam tool |
| `practice_test_jan2025.html` | HTML | Jan 2025 practice test |
| `practice_test_march2025.html` | HTML | March 2025 practice test |
| `practice_test_oct2025.html` | HTML | Oct 2025 practice test |
| `prob_stats_exam_notes.html` | HTML | Existing exam notes |
| `ps_exam_notes.html` | HTML | Existing exam notes (duplicate?) |
| `stats_concepts.html` | HTML | Existing stats concepts HTML |
| `stats_exam.html` | HTML | Existing stats exam HTML |

### Coverage assessment
- 4 distinct past exams (Fall 2024, Jan 2025, March 2025, Statistical Methods Final 2025) ✓
- Formula sheet present ✓
- Textbook chapters 4, 7, 8 present ✓
- Multiple existing HTML tools ✓
- Note: many duplicated files (numbered copies) — keep originals, ignore (1)/(2)/(3) copies
- **No answer keys for past exams** — cannot verify answers

### Additional files added 2026-04-26

| File | Type | Contents |
|------|------|----------|
| `Midterm-Statistics-2025 (1).pdf` | PDF | Midterm exam 2025 |
| `midterm-exam-notes-for-statistical-methods-course-code-161122.pdf` | PDF | Midterm exam notes |
| `midterm-solutions-for-statistical-methods-161122-exam-answers.pdf` | PDF | **Midterm solutions with answers** ✓ |

**Flag status: PARTIALLY FIXED** — midterm answer key now present. Final exam answer keys still absent.

### Missing
> [!todo] Missing: Answer keys for final exams (Fall 2024, Jan 2025, March 2025, StatMeth Final 2025) — worked solutions will be generated.
> [!todo] Missing: Textbook chapters 1–3, 5, 6 (only chs. 4, 7, 8 present).

---

## Summary — What to build vs what exists

| Course | Has lecture slides | Has past exams | Has existing tools | Main gaps |
|--------|-------------------|----------------|-------------------|-----------|
| DB | ✓ All 8 | ✓ 1 exercise exam | ✗ None yet | No extra past exams |
| TM | ✓ 6/7 lectures | ✗ None (canvas quizzes only) | ✗ None yet | No quiz PDFs, no transformers lecture |
| HoAI | ✓ 4 lectures + 3 seminars | ✓ 2 past exams | ✗ None yet | No Campbell-Kelly PDFs |
| ML | ✗ No slides | ✓ 5 exam PDFs + cheat sheet | ✓ 2 HTML tools | No lecture content |
| SP | ✓ 3 chapters | ✓ 4 past exams | ✓ 8 HTML tools | No answer keys |

---

## Priority actions before building

1. **TM:** Download/paste canvas quiz questions — these are the only practice source for the MC exam. Without them, quiz bank will be generated rather than sourced.
2. **ML:** No lecture slides available — ML review will be built from past exam patterns + cheat sheet only. Gap analysis must be filled by Karina first.
3. **SP:** Past exam answer keys missing — worked solutions will be generated, not extracted.

---

*Scan complete. Ready for Task 2 (Databases build) when instructed.*

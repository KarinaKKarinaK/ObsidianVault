>**Databases** --> 9.25 on exam + 0.5 bonus point ==> 9.75 -> 10.0 final
**Text Mining** --> MCQ 60% = 9.25up + Group Project =  9.25up ==> 9.5 final
**Stats&Probab** --> at least a 9.0
**ML** --> 35/40 points on exam ==> 9.0 final
**HoAI** --> 1.0 bonus + 8.0 on teh exam ==> 9.0 final

# Exam Season Study Plan — April 17 to June 4, 2026

> **Karina's resit + final exam season** 5 exams across 7 weeks. 2-3h study blocks per day. Mondays blocked 8AM-7PM (light evening only). Wednesdays almost entirely blocked.

---

## Exam Schedule

|Exam|Date|Time|Target|Notes|
|---|---|---|---|---|
|Databases|Thu 21 May|18:45|Pass + 0.5 bonus|Bonus secured (90+ homework pts)|
|Text Mining for AI|Tue 27 May|08:30|9.0|MC (60%) + project (40%)|
|History of AI|Thu 28 May|15:30|Pass comfortably|+1 bonus point secured|
|ML resit|Tue 2 Jun|08:30|35/40|Currently 32/40, need +3 pts|
|Statistics & Probability|Thu 4 Jun|08:30|9.25|Currently 7.0, major push needed|

---

## Exam-by-Exam Strategy

### Databases

**Format:** Closed-book digital exam on iSubmit. Mix of homework-style tasks + unseen MC/open questions. Limited attempts per task (2-3) — no new task assigned when you run out. Open questions allow unlimited saves. ~1h30 exercise exam available as practice.

**Strategy:**

- Do the full exercise exam under timed conditions (aim for 1h30), then check solutions carefully
- SQL without GROUP BY is explicitly required — practice NOT EXISTS / NOT IN patterns until mechanical
- Normalization: be able to derive canonical FDs, minimal keys, BCNF and 3NF decompositions by hand with full intermediate steps shown
- Transactions: draw precedence graphs by hand to check conflict serializability
- Read the Database API slides — no videos exist for this section but it is exam-relevant
- Memorise your iSubmit password before exam day

**Topics to cover:**

- [ ] Conceptual modelling: ER diagrams, aggregation, weak entities
- [ ] Relational schema derivation from ER: primary keys, foreign keys, nullable attributes, candidate keys
- [ ] SQL: basic syntax, attribute references, joins (inner, outer, self)
- [ ] SQL: non-monotonic queries — (NOT) IN, (NOT) EXISTS, "for all" via double negation
- [ ] SQL: nested subqueries, subqueries under FROM, single-value subqueries
- [ ] SQL: aggregations — GROUP BY, HAVING, advanced aggregation patterns
- [ ] SQL: case distinctions — UNION, conditional expressions, sorting
- [ ] Functional dependencies: Armstrong axioms, implication, closure
- [ ] Canonical FDs (minimal basis): splitting, left-hand side elimination, redundancy removal
- [ ] Minimal keys: key derivation algorithm using canonical FD set
- [ ] Normal forms: 1NF, BCNF, 3NF — definitions and violation criteria
- [ ] BCNF decomposition: maximise RHS, decompose step by step
- [ ] 3NF synthesis from canonical FDs, adding key relation if needed
- [ ] Transactions: schedules, conflicts, conflict serializability
- [ ] Precedence graphs: construction and cycle detection
- [ ] Cascadeless and recoverable schedules: definitions and differences
- [ ] Two-phase locking: strict 2PL, deadlock detection, cascading rollbacks
- [ ] Database APIs: string assembly vs prepared statements, SQL injection risk
- [ ] ANSI SPARC architecture: three levels (conceptual, logical, physical), ORM position

**Key resource:** Exercise exam + solutions PDF (already uploaded)

---

### Text Mining for AI

**Format:** Multiple choice exam (60%) + group project report (40%). Both components must score at least 5.0. Average must be 5.5+ to pass. Weekly lab assignments must be completed to sit the exam. MC is based on literature AND lecture slides.

**Strategy for 9.0:**

- The MC exam rewards precise definitions and understanding of _why_ methods work, not just what they do
- Cover Jurafsky & Martin chapters 4, 5, 17, 22 thoroughly — these are the core exam chapters
- Maynard et al. chapters 1, 2, 3, 7 are explicitly listed — read them for NLP for the Semantic Web framing
- Transformers paper (Wolf et al. 2020) and NER survey (Yadav & Bethard) are listed literature — understand their key claims
- Make flashcards for definitions: NLP layers, information extraction types, named entity types, sentiment vs opinion vs emotion
- Topic modelling: understand both LDA-style and neural approaches (Vayansky + Churchill surveys)
- For 9.0 on MC: pay attention to edge cases and contrasting concepts (e.g. cascaded vs joint NLP pipelines, generative vs discriminative)

**Topics to cover:**

- [ ] NLP overview: structured vs unstructured text, layers of information (entities, events, opinions)
- [ ] Text pre-processing: tokenisation, stemming, lemmatisation, POS tagging pipeline
- [ ] Text classification: logistic regression for text, feature representations (J&M ch.4)
- [ ] Word embeddings: word2vec, GloVe, contextual embeddings (J&M ch.5)
- [ ] Sequence labelling: IOB/BIO tagging schemes, CRF models (J&M ch.17)
- [ ] Named entity recognition: rule-based vs ML vs deep learning approaches (Yadav & Bethard survey)
- [ ] Sentiment analysis: lexicon-based approaches, ML approaches, aspect-level sentiment (J&M ch.22)
- [ ] Opinion mining: distinguishing opinion, sentiment, emotion, affect
- [ ] Topic modelling: LDA, evaluation methods (Vayansky 2020 + Churchill 2021)
- [ ] Fine-tuning: what it means, when to use it, BERT fine-tuning for classification (Church 2021 + Sun et al.)
- [ ] Transformers: architecture overview, self-attention, encoder vs decoder (Wolf et al. 2020)
- [ ] SVM for text classification: multi-category news classification (Saigal & Khanna 2020)
- [ ] NLTK practical skills: ch.6 (classification), ch.7 (information extraction), ch.8 (sentence structure)
- [ ] Semantic web NLP context (Maynard et al. ch.1, 2, 3, 7)
- [ ] Evaluation metrics: precision, recall, F1 for NLP tasks — micro vs macro averaging

---

### History of AI

**Format:** Written exam 2h15. You pick 4 questions: 1 A-question (lectures), 2 B-questions (Campbell-Kelly book ch.4-15), 1 C-question (combined book + lectures). Each worth 2 points. Bonus point already secured from assignments (avg 6+). No bonus question needed.

**Strategy:**

- You start with 1 extra point — protect it by writing solid answers on 4 questions, not gambling
- Always structure answers as: claim + evidence from source + concrete example
- A-questions are about lecture content: know the key narratives and lines of thought
- B-questions are about Campbell-Kelly: know specific chapter arguments, named figures, company histories
- C-questions require synthesis — practice writing one C-answer before exam day
- Key concepts to master for C-questions: **agendas, appropriation, surveillance capitalism, defining technology (Bolter's sense), AI winters**
- Review both past exams (2025 I and 2025 II) to understand question patterns

**Lecture themes (A-questions pool):**

- [ ] Prehistory of AI vs prehistory of computing — common events/structures
- [ ] Paris 1951 conference: AI as driver of early post-WWII computer development
- [ ] Acronyms in 1950s computing: function and social role
- [ ] Grace Hopper: direct and indirect contributions to computing and AI
- [ ] Programmed instruction hype (1950s/60s) vs LOGO hype (1970s/80s) — AI visibility
- [ ] History of AI as a way of defining AI
- [ ] Computers entering ordinary life in the 1980s-90s: statistics + blockbuster movies narrative
- [ ] Data and AI: rise of surveillance capitalism and data collection
- [ ] Electronic brain metaphor (1950s): origins, AI relationship
- [ ] AI in 1960s/70s mathematics (two specific examples)
- [ ] Game culture and AI research: mutual influence
- [ ] Web 2.0 and AI: causal relationships
- [ ] Trust in technology: late 19th/early 20th century narrative

**Campbell-Kelly topics (B-questions pool, ch.4-15):**

- [ ] Moore school: computing as means to an end
- [ ] Magnetic tape problems: manufacturers and novel storage challenges
- [ ] IBM 1401: technology + marketing success story
- [ ] Perry Crawford and project Whirlwind
- [ ] OS/360 as exemplar of the software crisis
- [ ] Timesharing and rise of personal computing
- [ ] The Whole Earth Catalogue and personal computing
- [ ] GUI OS companies that failed in the 1980s (two examples)
- [ ] Internet: sociologists/psychologists and e-mail social issues
- [ ] Off-shoring and out-sourcing as globalisation features
- [ ] Netflix and Web 2.0 / surveillance capitalism
- [ ] US vs European legislative differences on privacy
- [ ] Maurice Wilkes's roles
- [ ] Business machine reconstruction of the automatic computer (early 1950s)
- [ ] Watson "rational but wrong" vs Eckert/Mauchly "irrational but right"
- [ ] Real-time computing: military origin, near failure
- [ ] Software crisis: multiple stakeholder perspectives
- [ ] Personal computers: two cultures of California
- [ ] Broadening the appeal of personal computers (1980s)
- [ ] Internet: three desires confluence
- [ ] Diversity and inclusion in the 2010s computer industry
- [ ] Google search engine ca. 2000 and surveillance capitalism

**C-question concepts to have ready:**

- [ ] Appropriation (traditional history of computing) applied to history of AI
- [ ] Data-driven culture / digital culture as descriptor of 21st century
- [ ] Prejudice in AI/computing history: caucasian male dominance, counter-examples
- [ ] Computer clubs since 1960s: types, US vs European versions, agendas
- [ ] Defining technology (Bolter): 21st century AI examples, 1960s cybernetics examples
- [ ] AI winters narrative vs Babbage narrative: agendas in history
- [ ] AI winters and Pamela McCorduck

---

### Machine Learning Resit

**Format:** You scored 32/40. Target is 35/40. You need to gain exactly 3 more points. This is a targeted drill — not a full re-study of the course.

**Strategy:**

- Step 1 before anything else: reconstruct exactly which questions/topics you got wrong in the 32/40 attempt. Make a list of the specific 8 points lost.
- Categorise each lost point: was it a conceptual gap, a calculation error, or a careless mistake?
- Allocate study time only to those categories — you already know 80% of this material well
- Practice under timed exam conditions: the exam format is fixed, so simulate it
- For the 3 points you need: focus on whichever 3-4 topics are most recoverable given your gap list
- ML exam is June 2, after two other exams in the same week — preserve energy, do not over-prepare

**Core ML topics (review based on your gap analysis):**

- [ ] Supervised learning: regression, classification, bias-variance tradeoff
- [ ] Regularisation: L1 (Lasso), L2 (Ridge), ElasticNet — effects on model and coefficients
- [ ] Model evaluation: cross-validation, train/val/test splits, metrics (accuracy, F1, AUC-ROC)
- [ ] Decision trees: splitting criteria, pruning, overfitting
- [ ] Ensemble methods: Random Forest, bagging, boosting (AdaBoost, XGBoost)
- [ ] Support Vector Machines: margin, kernel trick, soft margin
- [ ] Neural networks: backpropagation, activation functions, gradient descent variants
- [ ] CNNs and sequential models: architecture overview, use cases
- [ ] Sequence models: LSTM, GRU — architecture and when to use
- [ ] Attention mechanisms and Transformers: self-attention, positional encoding
- [ ] Unsupervised learning: k-means, hierarchical clustering, PCA
- [ ] Probabilistic models: Naive Bayes, Gaussian Mixture Models, EM algorithm
- [ ] Time series: stationarity, AR/MA/ARIMA, feature engineering for sequential data
- [ ] LOB price prediction context: FI-2010 benchmark, PatchTST, LSTM baselines (relevant from your own paper)

---

### Statistics & Probability

**Format:** Resit. Previous score: 7.0. Target: 9.25. This is the largest improvement needed — requires mastery, not just gap-filling. 2h15 written exam.

**Strategy for 9.25:**

- 7.0 to 9.25 means you need to move from "can apply formulas" to "can derive, prove, and handle edge cases"
- For every topic: know the formula, know the derivation, know the edge cases
- Show full reasoning steps — partial credit exists but 9+ requires clean, complete proofs
- Work through both 2025 past papers (I and II, uploaded) completely, under timed conditions
- Identify exactly where you lost points in the 7.0 attempt — do not re-study topics you already scored well on
- MATH 5411 (measure-theoretic probability, HKUST) context is an advantage — use rigorous notation where appropriate
- Statistics exam is last (June 4) — plan energy carefully after ML exam June 2

**Topics to cover:**

_Probability foundations:_

- [ ] Sample spaces, sigma-algebras, probability axioms (Kolmogorov)
- [ ] Conditional probability: definition, computation, independence
- [ ] Bayes' theorem: derivation, law of total probability, applications
- [ ] Combinatorics: permutations, combinations, multinomial coefficients

_Discrete distributions:_

- [ ] Bernoulli, Binomial: PMF, expectation, variance, MGF
- [ ] Geometric, Negative Binomial: PMF, memoryless property
- [ ] Poisson: PMF, derivation as limit of Binomial, Poisson process
- [ ] Hypergeometric: sampling without replacement

_Continuous distributions:_

- [ ] Uniform: PDF, CDF, expectation, variance
- [ ] Exponential: PDF, CDF, memoryless property, relationship to Poisson
- [ ] Normal: PDF, CDF, standard normal, Z-scores, linear combinations
- [ ] Gamma, Beta, Chi-squared: definitions, relationships
- [ ] Log-normal: definition and properties

_Joint distributions:_

- [ ] Joint PMF/PDF, marginal distributions, conditional distributions
- [ ] Independence: definition and verification
- [ ] Covariance and correlation: definitions, properties, computation
- [ ] Bivariate normal distribution

_Expectation and moments:_

- [ ] Expected value: linearity, LOTUS, conditional expectation
- [ ] Variance: computation, variance of sums (with/without independence)
- [ ] Moment generating functions: definition, uniqueness theorem, uses
- [ ] Characteristic functions (if in syllabus)

_Limit theorems:_

- [ ] Law of Large Numbers: weak vs strong, statement and intuition
- [ ] Central Limit Theorem: statement, proof sketch, applications
- [ ] Continuity correction for normal approximation to Binomial

_Estimation:_

- [ ] Point estimation: bias, variance, MSE
- [ ] Maximum Likelihood Estimation (MLE): derivation for common distributions
- [ ] Method of Moments (MOM): derivation and comparison to MLE
- [ ] Sufficient statistics, Cramer-Rao lower bound (if in syllabus)

_Confidence intervals and hypothesis testing:_

- [ ] Confidence intervals: construction, interpretation, common misconceptions
- [ ] Hypothesis testing: null/alternative hypotheses, Type I/II errors, power
- [ ] p-values: definition, interpretation, limitations
- [ ] z-test, t-test (one-sample, two-sample, paired): when to use each
- [ ] Chi-square test: goodness of fit, independence
- [ ] F-test: variance comparison, ANOVA
- [ ] Likelihood ratio tests

_Regression:_

- [ ] Simple linear regression: OLS derivation, assumptions, inference
- [ ] Multiple linear regression: matrix form, interpretation
- [ ] Coefficient of determination R-squared
- [ ] Residual analysis and model diagnostics

---

## Week-by-Week Daily Plan

> **Legend:** DB = Databases | TM = Text Mining | HAI = History of AI | ML = Machine Learning | SP = Statistics & Probability **Blocked:** Mon 8AM-7PM (evening only, ~1h max) | Wed almost entirely blocked

---

### Week 1: April 17-23 — Foundation sprint

> **Priority this week:** DB normalization + SQL foundations | SP probability foundations | TM NLP pipeline | HAI book ch.4-8

---

#### Thu 17 Apr — 2-3h

**Focus: DB + SP**

- [ ] **DB (1.5h):** Do all database homeworks
- [ ] **SP (1h):** 1 past paper from scratch

---

#### Fri 18 Apr — 2-3h

**Focus: TM + HAI**

- [ ] **TM (1.5h):** Read Jurafsky & Martin ch.4 (Logistic Regression and Text Classification). Note: feature representation, log-linear models, regularisation for text. Make 5 flashcard definitions.
- [ ] **HAI (1h):** Read Campbell-Kelly ch.4-5. Note key narrative: Moore school, computing as means to end, early computer manufacturers. Write 3 bullet points per chapter.

---

#### Sat 19 Apr — 2-3h

**Focus: SP + DB**

- [ ] **SP (1.5h):** Discrete distributions — Binomial and Poisson. Derive the PMFs from first principles. Prove E[X] and Var[X] for both. Do 4 computation problems.
- [ ] **DB (1h):** SQL basics — inner joins, self-joins, outer joins. Write 3 SQL queries using the Suppliers/Parts/Catalog schema from the exercise exam.

---

#### Sun 20 Apr — 2-3h

**Focus: DB + SP**

- [ ] **DB (1.5h):** Functional dependencies — Armstrong axioms (reflexivity, augmentation, transitivity). Derive closure of attribute sets. Do exercise: compute closure of {A} and {AE} for the exam FD set {A→B, B→D, E→A}.
- [ ] **SP (1h):** Geometric and Negative Binomial distributions. Prove memoryless property of Geometric. Do 3 computation problems.

---

#### Mon 21 Apr — ~1h (evening only, blocked 8AM-7PM)

**Focus: light HAI reading**

- [ ] **HAI (1h):** Read Campbell-Kelly ch.6-7. Notes on: IBM 1401 success (technology + marketing), Perry Crawford and Whirlwind.

---

#### Tue 22 Apr — 2-3h

**Focus: DB + TM**

- [ ] **DB (1.5h):** Canonical FD derivation — full algorithm: (1) split RHS, (2) eliminate trivial FDs, (3) LHS minimisation, (4) remove redundant FDs. Work through the exam example: {A→DB, B→D, AE→ED, E→A} → canonical set step by step. Check against solution.
- [ ] **TM (1h):** Read J&M ch.5 (Word Embeddings). Key concepts: distributional hypothesis, word2vec CBOW vs Skip-gram, GloVe, contextual vs static embeddings. 5 flashcards.

---

#### Wed 23 Apr — blocked (light only if energy allows)

**Focus: passive review**

- [ ] **HAI (30min max):** Skim Campbell-Kelly ch.8 (IBM dominance era). Note the "Watson rational but wrong" narrative.

---

### Week 2: April 24-30 — Deep dives

> **Priority this week:** DB normal forms | SP continuous distributions + joint | TM sequence labelling + NER | HAI ch.9-11 + lecture themes

---

#### Thu 24 Apr — 2-3h

**Focus: DB normalization**

- [ ] **DB (2h):** BCNF and 3NF decomposition. Given the canonical set {A→B, B→D, E→A}: (1) derive minimal keys, (2) check BCNF violations, (3) decompose to BCNF step by step, (4) synthesise 3NF. Compare results. Verify that the exercise exam solution matches your work. Write the algorithm steps on paper until you can do it without looking.

---

#### Fri 25 Apr — 2-3h

**Focus: SP + HAI**

- [ ] **SP (1.5h):** Continuous distributions — Exponential (including memoryless property proof), Normal (standard normal, Z-score transformations). Practice: 5 normal distribution problems from past paper 2025-II.
- [ ] **HAI (1h):** Read Campbell-Kelly ch.9-10 (software crisis, OS/360, timesharing). Key argument for each: write one paragraph summary as if answering a B-question.

---

#### Sat 26 Apr — 2-3h

**Focus: SP + ML gap analysis**

- [ ] **SP (1.5h):** Joint distributions — joint PDF/PMF, marginals, conditional distributions. Covariance and correlation: definitions, computation, and the difference between independence and zero correlation. Do 3 joint distribution problems.
- [ ] **ML (1h):** Reconstruct your previous exam attempt. Write down every question type you remember. Mark which ones you got wrong or were uncertain about. Build your gap list — this is the most important ML task of the entire plan.

---

#### Sun 27 Apr — 2-3h

**Focus: TM + DB**

- [ ] **TM (1.5h):** Read J&M ch.17 (Sequence Labelling for POS and NER). Focus on: BIO/IOB tagging, CRF as a sequence model, Viterbi algorithm intuition. Read Yadav & Bethard NER survey abstract + sections 2-3 (overview of deep learning approaches). Make 5 flashcards.
- [ ] **DB (1h):** SQL — NOT EXISTS and NOT IN patterns. Solve exercise exam Q3a (parts supplied by only one supplier) and Q3b (supplier names who sell all black parts) from scratch before checking solutions. Note: Q3b requires double negation.

---

#### Mon 28 Apr — ~1h (evening only)

**Focus: HAI**

- [ ] **HAI (1h):** Read Campbell-Kelly ch.11 (personal computing rise, two cultures of California). Note the Silicon Valley narrative: "two boys and a garage" myth vs reality.

---

#### Tue 29 Apr — 2-3h

**Focus: SP + TM**

- [ ] **SP (2h):** Expectation — LOTUS (Law of the Unconscious Statistician), conditional expectation E[X|Y]. Moment generating functions: derive MGF for Binomial and Poisson. Practice: 4 expectation/MGF problems.
- [ ] **TM (1h):** Read Maynard et al. ch.1-2 (NLP for Semantic Web: overview, entities and relations). Note framing differences from J&M. 3 flashcards.

---

#### Wed 30 Apr — blocked

---

### Week 3: May 1-7 — Consolidation + new topics

> **Priority this week:** DB transactions | SP limit theorems + estimation | TM sentiment + topic models | HAI ch.12-15 + lecture themes

---

#### Thu 1 May — 2-3h

**Focus: DB transactions**

- [ ] **DB (2h):** Transactions — schedules, conflicts (read-write, write-read, write-write), conflict serializability. Draw the precedence graph for the exercise exam schedule (T1: R(Z) R(Y), T2: R(Y) W(Y) R(V), T3: W(V) W(Z)). Verify: T1→T3, T2→T1, T3→T2 cycle → not conflict serializable. Cascadeless vs recoverable schedules: write precise definitions. Two-phase locking: strict 2PL, deadlock detection via waits-for graph, cascading rollbacks.

---

#### Fri 2 May — 2-3h

**Focus: SP + HAI**

- [ ] **SP (1.5h):** Law of Large Numbers (weak + strong, statement and intuition). Central Limit Theorem: state precisely, prove via MGFs for i.i.d. case. Practice: 3 CLT approximation problems with continuity correction.
- [ ] **HAI (1h):** Read Campbell-Kelly ch.12-13 (Internet rise, three desires; globalization). Write B-question paragraph: "Campbell-Kelly discusses the rise of Internet as the confluence of three desires — which desires and how do they explain the rise?"

---

#### Sat 3 May — 2-3h

**Focus: TM + SP**

- [ ] **TM (1.5h):** Read J&M ch.22 (Lexicons for Sentiment, Affect, Connotation). Key: SentiWordNet, LIWC, aspect-level sentiment, subjectivity vs sentiment. Read Vayansky & Kumar topic modelling overview (sections 1-3: LDA overview, evaluation). 5 flashcards.
- [ ] **SP (1h):** Point estimation — bias, variance, MSE. MLE derivation for: Bernoulli, Normal (both mean and variance), Exponential. Do 3 MLE derivation problems.

---

#### Sun 4 May — 2-3h

**Focus: DB full review + HAI**

- [ ] **DB (1.5h):** Read Database API slides (no videos available — exam-relevant). Cover: string assembly APIs (flexible but SQL injection vulnerable), prepared statements (send parameters separately, safer, better performance), JDBC/ODBC patterns. ANSI SPARC three levels: conceptual, logical (relational), physical. ORMs (Hibernate, Entity Framework) sit at the conceptual level — purpose: application-level view, schema evolution without breaking apps.
- [ ] **HAI (1h):** Read Campbell-Kelly ch.14-15 (Web 2.0, surveillance capitalism, governance/ethics). Note Netflix + Google + surveillance capitalism arguments. US vs European privacy legislation differences.

---

#### Mon 5 May — ~1h (evening only)

**Focus: SP**

- [ ] **SP (1h):** Method of Moments (MOM) derivation for Binomial and Poisson. Compare MLE vs MOM: when do they agree? Do 2 problems.

---

#### Tue 6 May — 2-3h

**Focus: TM + ML**

- [ ] **TM (1.5h):** Read Wolf et al. Transformers paper (abstract, sections 1-2, conclusion). Key claims: HuggingFace ecosystem, architecture overview, self-attention. Read Church 2021 fine-tuning paper (sections 1-3). Note: when fine-tuning outperforms from-scratch training and why. 5 flashcards.
- [ ] **ML (1h):** Based on your gap list from Apr 26: pick the top 2 weakest topics. Study those specifically. Do not study anything else for ML today.

---

#### Wed 7 May — blocked

---

### Week 4: May 8-14 — Past papers + exam simulation

> **Priority this week:** DB exercise exam timed run | SP hypothesis testing | TM literature consolidation | HAI lecture theme revision | ML targeted drilling

---

#### Thu 8 May — 2-3h

**Focus: DB full exercise exam (timed)**

- [ ] **DB (2h+):** Sit the full exercise exam under real conditions. Set a timer for 1h30. Attempt all questions without notes. After time is up: check solutions for Q1 (ER + schema), Q2 (normalization), Q3 (SQL), Q4 (transactions), Q5 (APIs). Score yourself. Write down every point lost and why.

---

#### Fri 9 May — 2-3h

**Focus: SP + HAI**

- [ ] **SP (1.5h):** Confidence intervals — construction for mean (z-interval and t-interval), interpretation (common misconception: it is NOT the probability the true mean is in the interval). Hypothesis testing framework: H0/H1, Type I error (alpha), Type II error (beta), power = 1 - beta. Do 3 confidence interval construction problems.
- [ ] **HAI (1h):** Lecture themes revision. Write brief notes (4-6 sentences each) on: (1) prehistory of AI narrative, (2) electronic brain metaphor, (3) AI in education 1960s-70s, (4) game culture and AI. These are A-question territory.

---

#### Sat 10 May — 2-3h

**Focus: SP + TM**

- [ ] **SP (1.5h):** z-test vs t-test — when to use each (known vs unknown variance, large vs small n). One-sample t-test: derivation of test statistic, degrees of freedom. Two-sample t-test (equal and unequal variance). Paired t-test. Do 4 hypothesis testing problems.
- [ ] **TM (1h):** Read Maynard et al. ch.3 and ch.7. Read Saigal & Khanna (SVM for multi-category news classification) — key results and contribution. Read Sun et al. BERT fine-tuning paper abstract + results. Consolidate into a 1-page summary of all listed literature.

---

#### Sun 11 May — 2-3h

**Focus: ML + HAI**

- [ ] **ML (1.5h):** Work through the top 3 gap topics from your list with past exam-style questions. Aim for 100% accuracy on those specific question types before the exam.
- [ ] **HAI (1h):** C-question practice. Write one full practice answer (target 200-250 words) for this question: "To what extent does the concept of appropriation from the traditional history of computing also apply to a history of AI?" Use both book and lecture references explicitly.

---

#### Mon 12 May — ~1h (evening only)

**Focus: SP**

- [ ] **SP (1h):** Chi-square test — goodness of fit (test statistic derivation, degrees of freedom), test for independence in contingency tables. Do 2 problems.

---

#### Tue 13 May — 2-3h

**Focus: SP + TM**

- [ ] **SP (1.5h):** F-test for variance comparison. One-way ANOVA: F-statistic, between-group vs within-group variance. Likelihood ratio tests: general framework. Do 3 problems covering chi-square + F-test.
- [ ] **TM (1h):** Full literature flashcard review — go through all flashcards made in weeks 1-3. For any card you hesitate on: reread that section. Focus especially on: NER deep learning approaches, transformer self-attention mechanism, topic modelling evaluation.

---

#### Wed 14 May — blocked

---

### Week 5: May 15-21 — DB final push + SP regression + HAI/TM consolidation

> **DB exam Thu 21 May 18:45**

---

#### Thu 15 May — 2-3h

**Focus: SP linear regression**

- [ ] **SP (2h):** Simple linear regression: OLS derivation in matrix form (or scalar). Assumptions: linearity, homoscedasticity, independence, normality of errors. Inference: t-tests on coefficients, F-test for overall fit. R-squared. Multiple linear regression: interpretation of coefficients (ceteris paribus). Do 3 regression problems from past papers.

---

#### Fri 16 May — 2-3h

**Focus: HAI + TM**

- [ ] **HAI (1.5h):** Write practice answer for one B-question: "Campbell-Kelly discusses the role of timesharing as essential for the rise of computing as something interesting for ordinary people." (200-250 words, specific chapter references). Write practice answer for one A-question: "Discuss in what ways the history of AI helps define AI." (150-200 words).
- [ ] **TM (1h):** NLTK practice — work through NLTK book ch.6 (sections 1-6): classification pipeline, feature extraction, Naive Bayes classifier, decision trees, MaxEnt. Note anything you have not seen in lectures.

---

#### Sat 17 May — 2-3h

**Focus: DB normalization + SQL final review**

- [ ] **DB (2h):** Rapid-fire normalization: generate 3 new FD sets yourself, derive canonical set, find minimal keys, check BCNF and 3NF, decompose. Time yourself: aim for under 20 minutes per FD problem. Review the most complex SQL patterns: double NOT EXISTS for "for all" queries, subqueries under FROM.

---

#### Sun 18 May — 2-3h

**Focus: SP past paper 2025-I (full timed)**

- [ ] **SP (2h+):** Sit 2025-I past paper under timed conditions (2h15). After time: mark it, identify all lost points. Write a list: "I lost X points on topic Y because Z." These become your final revision targets for the June 4 exam.

---

#### Mon 19 May — ~1h (evening only)

**Focus: DB final light review**

- [ ] **DB (1h):** Skim your notes on: ANSI SPARC + ORM, Database API slides (SQL injection, prepared statements). These are the easiest points to secure on the non-homework sections.

---

#### Tue 20 May — 2-3h

**Focus: DB exam prep (final)**

- [ ] **DB (2h):** Re-do exercise exam Q2 (normalization) and Q3 (SQL) from scratch without notes. Time: 45 minutes. Check answers. Fix any remaining errors. Re-read solutions for Q4 (transactions) and Q5 (APIs) slowly. Confirm iSubmit password. Know the exam location and arrival time.

---

#### **Wed 21 May — DB EXAM DAY**

**Databases exam at 18:45**

- [ ] Morning/afternoon: light review only — skim your own normalization notes and SQL patterns. No new material.
- [ ] Arrive at exam location with time to spare.
- [ ] In exam: read all questions before starting. Attempt homework-style tasks first (highest familiarity). Save button for open questions — use it regularly.
- [ ] Attempt limit: do NOT waste all attempts on one formulation — think before submitting.

---

### Week 6: May 22-28 — TM + HAI exams

> **Text Mining exam Tue 27 May 08:30** **History of AI exam Thu 28 May 15:30**

---

#### Thu 22 May — 2-3h (post-DB, recovery day)

**Focus: TM + HAI light**

- [ ] **TM (1.5h):** Full flashcard review pass — all definitions, all literature summaries. Flag anything uncertain.
- [ ] **HAI (1h):** Review your two practice answers from May 16. Revise based on what you know now. Read the 2025-I exam paper question list — mark which A, B, C questions you feel most confident on.

---

#### Fri 23 May — 2-3h

**Focus: TM deep review**

- [ ] **TM (2h):** Go through each topic on the topics list above. For every topic: can you define it precisely? Can you explain why the method works, not just what it does? Write one-paragraph explanations for: (1) why BERT fine-tuning works, (2) how self-attention computes representations, (3) what makes LDA a generative model. These are the types of questions that distinguish 8.0 from 9.0.

---

#### Sat 24 May — 2-3h

**Focus: HAI + TM**

- [ ] **HAI (1.5h):** Write practice C-question answer: "To what extent are histories used to further agendas?" (use AI winters, Babbage/Aiken narrative, McCorduck). 200-250 words. Also: write 4-6 sentence summaries of chapters 12-15 in your own words as B-question preparation.
- [ ] **TM (1h):** Maynard et al. ch.7 final read. NLTK ch.7 (information extraction: NER, relation extraction). Consolidate: what does the full NLP pipeline look like end to end? Can you draw it from memory?

---

#### Sun 25 May — 2-3h

**Focus: TM past questions + HAI**

- [ ] **TM (1.5h):** Write 10 MC-style questions for yourself covering the full syllabus. Answer them. Check against your notes. Focus the final hour on the 3 topics you felt weakest on.
- [ ] **HAI (1h):** Final lecture themes review: data and AI / surveillance capitalism narrative, Web 2.0 and AI, computers entering ordinary life (1980s-90s statistics + movies narrative). These cover the most recent A-question topics.

---

#### Mon 26 May — ~1h (evening only)

**Focus: TM final**

- [ ] **TM (1h):** Read through all your TM flashcards one final time. Sleep early — exam is 08:30.

---

#### **Tue 27 May — TEXT MINING EXAM**

**Text Mining for AI at 08:30**

- [ ] Arrive early. MC exam: read each question fully before answering. For any question about a specific paper (Wolf, Yadav, Vayansky, etc.) — recall the key claim of that paper, not just the topic.
- [ ] You have the project grade already — the MC is the remaining 60%. Aim clean.

---

#### Wed 28 May — HAI exam day (blocked until exam)

**Focus: HAI final prep (light)**

- [ ] **HAI (1-2h in morning):** Re-read your practice answers. Review Bolter's "defining technology" concept — prepare 2 examples. Review appropriation concept — prepare 2 examples.

#### **Thu 28 May — HISTORY OF AI EXAM**

**History of AI at 15:30**

- [ ] You have the bonus point. You need 3 solid answers across A, B, C types (4 total).
- [ ] Choose your questions strategically: pick the A-question topic you know most confidently. Pick the 2 B-questions covering chapters/figures you prepared explicitly. Pick the C-question where you have both a book argument and a lecture concept ready to combine.
- [ ] Always state your claim in the first sentence. Evidence in the middle. Concrete example to close.

---

### Week 7: May 29 — June 4 — ML + Statistics final push

> **ML resit Tue 2 Jun 08:30** **Statistics resit Thu 4 Jun 08:30**

---

#### Fri 29 May — 2-3h (post-HAI recovery)

**Focus: ML + SP**

- [ ] **ML (1.5h):** Go through your gap list one more time. Do 10 practice questions specifically on your weakest 2-3 topics. Aim for clean answers.
- [ ] **SP (1h):** Past paper 2025-II timed run — start it today. Complete as many questions as possible in 1h.

---

#### Sat 30 May — 2-3h

**Focus: SP past paper 2025-II (complete + mark)**

- [ ] **SP (2h):** Finish and fully mark 2025-II. Compare your score to 2025-I attempt. Note any new weak areas. Do 3 targeted problems on anything newly identified as weak.

---

#### Sun 31 May — 2-3h

**Focus: ML + SP**

- [ ] **ML (1h):** Final ML review — go through each topic on the topics list. For your strong areas: just confirm. For your gap areas: one more pass on the specific question types.
- [ ] **SP (1.5h):** Full derivation revision — without notes, derive: CLT (sketch), MLE for Normal, OLS coefficient formula, t-test statistic. These are the proof-level elements needed for 9+.

---

#### Mon 1 Jun — ~1h (evening only)

**Focus: ML final**

- [ ] **ML (1h):** Light review of your gap list one last time. Sleep well — exam is 08:30.

---

#### **Tue 2 Jun — ML RESIT**

**ML at 08:30**

- [ ] Go in with precision, not anxiety. You know 80% of this content well. The 3 extra points are in your gap topics — execute cleanly on those.
- [ ] After exam: brief rest, then light SP review in the afternoon.

---

#### Wed 3 Jun — blocked (light only)

**Focus: SP**

- [ ] **SP (1-2h if energy allows):** Final pass on weakest areas from past paper marking. No new topics. Focus on doing problems cleanly, showing all steps.

---

#### **Thu 4 Jun — STATISTICS & PROBABILITY RESIT**

**Statistics at 08:30**

- [ ] Show all derivation steps — partial credit is real.
- [ ] For any proof: state what you are proving, state assumptions, derive, conclude.
- [ ] If stuck on a derivation, move to the next question and return — do not freeze.
- [ ] 9.25 is achievable: it requires clean execution on topics you have now drilled for 7 weeks.

---

## Quick Reference: Subject Priorities by Week

|Week|Primary|Secondary|Background|
|---|---|---|---|
|Apr 17-23|DB (ER, SQL, FDs)|SP (probability foundations)|TM, HAI|
|Apr 24-30|DB (normal forms)|SP (distributions, joint)|TM, HAI|
|May 1-7|DB (transactions, APIs)|SP (limit theorems, estimation)|TM, HAI|
|May 8-14|DB (exercise exam)|SP (hypothesis testing)|TM, ML gaps|
|May 15-21|DB (final prep + EXAM)|SP (regression)|TM, HAI|
|May 22-28|TM (EXAM) + HAI (EXAM)|SP (past papers)|ML|
|May 29-Jun 4|ML (RESIT) + SP (RESIT)|—|—|

---

## Tips for Exam Conditions

### All exams

- Sleep at least 7h the night before every exam
- Eat before morning exams; 08:30 start means breakfast matters

### iSubmit (Databases)

- Log in during exam setup time, do not wait for the first question
- Use Save button on open questions every 5-10 minutes
- Budget attempts: think through your answer before submitting on limited-attempt tasks
- If stuck on a task: move on, return later — open questions have unlimited attempts

### Multiple choice (Text Mining)

- Eliminate obviously wrong answers first
- For literature-based questions: recall the key claim of the paper, not just the author name
- Do not change your first instinct unless you have a clear reason

### Written essay (History of AI)

- First sentence of every answer = your claim/thesis
- Do not write lists — write in paragraphs
- Name-drop specific figures, companies, and dates from the book — this signals command of the material
- Time management: 4 questions in 2h15 = ~30 min per question. Leave 10 min to reread.

### Written derivations (Statistics)

- State every assumption before using it
- Show all intermediate algebra steps — do not skip to the answer
- Label your final answer clearly
- If a derivation goes wrong: write "assuming X, then..." and continue — partial credit exists

---

_Generated April 2026. Update the checkboxes in Obsidian as you complete each task._
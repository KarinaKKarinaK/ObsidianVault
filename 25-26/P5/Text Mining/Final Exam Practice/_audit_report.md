# Audit Report — Text Mining Final Exam Practice Files
*Audited: 2026-05-24 | 7 exams × 35 questions = 245 questions total*

---

## 1. Duplicate / Near-Duplicate Questions

The threshold applied: questions testing the **exact same fact with the same framing**, or questions so similar that a student who has seen one cannot be surprised by the other.

### Confirmed Duplicates

| # | Exam A | Exam B | Topic / Overlap |
|---|--------|--------|-----------------|
| D1 | E1 Q14 (high-recall scenario → tsunami alert) | E3 Q18 (high-precision scenario → spam auto-delete) | These are **complementary inversions of the same example set** — the tsunami vs. spam auto-delete pair. E1 Q14 asks which scenario favours recall and uses "tsunami" as the correct answer; E3 Q18 asks which scenario favours precision and uses "auto-delete spam" as the correct answer. The **distractors overlap substantially** (both options list "tsunami alert", "auto-delete spam", "cancer screening", "fraud detection"). A student who has seen either question immediately recognises the full set of options in the other. Flag: **near-duplicate framing of the same precision/recall example bank**. |
| D2 | E1 Q32 (variation → "US, United States, America, The States") | E6 Q2 (name variation in NER → IBM/International Business Machines/Big Blue) | Both questions test **variation vs. ambiguity** using named-entity surface-form examples. The concept tested is identical (multiple surface forms for one referent). The examples differ, but the question stem and lesson are the same. Mild risk — acceptable if kept in separate exams; worth noting. |
| D3 | E3 Q17 (IOB labels B-ORG/I-ORG/B-PER/I-PER/O used for token-level NE sequence labelling) | E3 Q20 (IOB representation for "American Airlines") + E3 Q21 (illegal IOB sequence "O I-PER I-PER") | All three are in **the same exam (Exam 3)** and all test IOB mechanics. Q17 asks what IOB labels are for; Q20 asks to label a specific entity; Q21 asks to spot an illegal sequence. Together they make IOB over-represented within a single exam (3 out of 35 questions). Not cross-exam duplicates, but intra-exam redundancy. |
| D4 | E4 Q34 (BERTopic steps: S-BERT → cluster → TF/ClusterFrequency) | E7 Q19 (BERTopic: clustering sentence embeddings + TF/ClusterFrequency) + E7 Q35 (BERTopic workflow summary) | E4 Q34 and E7 Q19 are **near-identical in both stem and correct answer**. Both describe BERTopic as "represent with S-BERT/sentence transformer → cluster → extract keywords with TF/ClusterFrequency". E7 Q35 is a slightly reworded version of the same workflow. **E4 Q34 and E7 Q19 are the clearest hard duplicate in the set.** |
| D5 | E4 Q27 (ITPT boosts performance before fine-tuning) | E7 Q20 (Sun et al. 2020 → BERT-CDPT-FiT is best strategy) | Both test Sun et al. (2020) ITPT/further-pretraining finding. E4 Q27 tests the general claim; E7 Q20 tests the specific strategy name (BERT-CDPT-FiT). Overlapping but distinguishable — borderline. |
| D6 | E4 Q28 (catastrophic forgetting definition) | E7 Q34 (multi-task fine-tuning insight from Sun et al.) | Different enough — not a duplicate. |
| D7 | E3 Q15 (NERC on CoNLL 2003 → Wikinews drop > 20 F1 points) | E6 Q22 (cross-domain NERC drop up to 20 F1 points) | Both state the same empirical finding (>20 F1 point cross-domain drop) from the same course material. The framing differs slightly (E3 names CoNLL→Wikinews; E6 says "trained on news, tested on biomedical"), but both answers are "more than 20 F1 points". **Near-duplicate empirical fact tested identically.** |
| D8 | E3 Q30 (NERC trained on news, applied to clinical notes → significant drop) | E6 Q18 (key factor affecting NERC performance → genre and domain) | Related concepts (cross-domain drop and domain importance), but tested differently enough to keep. |
| D9 | E5 Q35 (code for Dutch sentiment HuggingFace) | E5 Q17 (which HuggingFace model for Dutch sentiment) | Both are in **Exam 5** and both ask about the same Dutch sentiment model (`wietsedv/bert-base-dutch-cased-finetuned-sentiment`). Q17 asks which model; Q35 asks which code snippet. **Intra-exam near-duplicate.** |
| D10 | E1 Q5 ("I saw her duck" → syntactic/lexical ambiguity) | E2 Q25 ("may may still rule in May" → same surface form, multiple POS) | Both test lexical ambiguity/POS variation. Different examples and different angles — acceptable. |

### Summary of Flagged Duplicates

| Severity | Items |
|----------|-------|
| **Hard duplicate (same fact, same answer choices)** | D4: E4-Q34 vs E7-Q19 |
| **Near-duplicate (same empirical fact, same numerical answer)** | D7: E3-Q15 vs E6-Q22 |
| **Near-duplicate (same example bank, inverted framing)** | D1: E1-Q14 vs E3-Q18 |
| **Intra-exam redundancy (same exam, same concept)** | D3: E3-Q17/Q20/Q21 (IOB × 3); D9: E5-Q17/Q35 (Dutch model × 2) |
| **Borderline / acceptable overlap** | D2, D5, D8, D10 |

---

## 2. Coverage Map

### Lecture 1 — Course overview, text mining vs NLP, ambiguity, variation, metonymy, metaphor, pipeline architecture, Zipf's Law

| Sub-topic | Covered | Where |
|-----------|---------|-------|
| Text mining vs NLP distinction | YES | E1-Q1, E1-Q28, E1-Q35 |
| Ambiguity (lexical, syntactic, structural) | YES | E1-Q5, E1-Q9, E1-Q24, E2-Q14, E2-Q20 |
| Variation (multiple forms, one meaning) | YES | E1-Q9, E1-Q32, E6-Q2 |
| Metonymy | YES | E1-Q18, E1-Q27, E6-Q3 |
| Metaphor | YES | E1-Q21 |
| NLP pipeline architecture (layers, error propagation) | YES | E1-Q2, E1-Q3, E1-Q8, E1-Q15, E1-Q22, E1-Q30 |
| Zipf's Law | YES | E1-Q10 |
| Tokenisation challenges | YES | E1-Q4, E1-Q7, E1-Q12, E1-Q13, E1-Q29, E1-Q34 |
| spaCy / NLTK | YES | E1-Q6, E1-Q20 |
| Data sparseness | YES | E1-Q31 |
| Bag-of-Words intro | YES | E1-Q11, E1-Q25 |

**Verdict: FULLY COVERED**

---

### Lecture 2 — Linguistics (morphology, syntax, semantics, pragmatics)

| Sub-topic | Covered | Where |
|-----------|---------|-------|
| Morphology (inflection vs derivation) | YES | E2-Q3, E2-Q4, E2-Q34 |
| Morphemes | YES | E2-Q2 |
| Morphologically rich languages | YES | E2-Q24 |
| Constituent / phrase-structure parsing | YES | E2-Q5, E2-Q11 |
| Dependency parsing | YES | E2-Q6 |
| Chunking / shallow parsing | YES | E2-Q21, E2-Q32 |
| PP-attachment ambiguity | YES | E2-Q20 |
| WordNet (synsets, structure) | YES | E2-Q7, E2-Q8, E2-Q15, E2-Q18, E2-Q30 |
| Hyponymy (Is-a) | YES | E2-Q9 |
| Meronymy / Holonymy (Part-of) | YES | E2-Q10, E2-Q33 |
| Synonymy / near-synonymy | YES | E2-Q23 |
| Semantic roles (Agent, Patient, Instrument) | YES | E2-Q12, E2-Q13, E2-Q29, E2-Q35 |
| Pragmatics | YES | E2-Q16, E2-Q17 |
| Polysemy | YES | E2-Q31 |
| Coreference | YES | E2-Q26, E1-Q33 |
| POS tagging / token vs type | YES | E2-Q19, E2-Q27, E2-Q28 |

**Verdict: FULLY COVERED**

---

### Lecture 3 — ML for NLP (Evaluation & Representation)

| Sub-topic | Covered | Where |
|-----------|---------|-------|
| Precision, Recall, F1 (with computation) | YES | E3-Q1, E3-Q2, E3-Q3, E3-Q5, E3-Q11 |
| Accuracy + imbalanced data problem | YES | E3-Q4, E3-Q8 |
| Macro / micro averaging | YES | E3-Q9, E3-Q10, E3-Q33, E3-Q34 |
| Cross-validation (10-fold) | YES | E3-Q6 |
| Train / dev / test split | YES | E3-Q7, E3-Q26 |
| Confusion matrix | YES | E3-Q32 |
| Overfitting | YES | E3-Q22 |
| Cohen's Kappa (IAA) | YES | E3-Q23, E3-Q24 |
| Gold / Silver / Bronze annotation | YES | E3-Q25 |
| Naive Bayes | YES | E3-Q27 |
| SVM | YES | E3-Q28 |
| Logistic Regression | YES | E3-Q29 |
| CRF | YES | E3-Q13 |
| BoW representation | YES | E3-Q12, E3-Q31 |
| TF-IDF | YES | E5-Q26 (also implied in E7) |
| Feature engineering | YES | E3-Q19, E3-Q35 |
| IOB tagging | YES | E3-Q17, E3-Q20, E3-Q21 |
| Cross-domain evaluation | YES | E3-Q14, E3-Q15, E3-Q30 |
| Precision/recall trade-off | YES | E1-Q14, E3-Q16, E3-Q18 |

**Verdict: FULLY COVERED**

---

### Lecture 4 — Sentiment Analysis

| Sub-topic | Covered | Where |
|-----------|---------|-------|
| Subjectivity (broad definition) | YES | E5-Q1 |
| SIP verbs (cognitive, speech-act) | YES | E5-Q3, E5-Q6, E5-Q21 |
| Opinion structure (holder/target/polarity) | YES | E5-Q4, E5-Q29 |
| ABSA (aspect-based sentiment) | YES | E5-Q10, E5-Q32 |
| Explicit vs implicit sentiment | YES | E5-Q2, E5-Q14 |
| Figurative language / negation / intensifiers | YES | E5-Q7, E5-Q8, E5-Q28 |
| Ravi & Ravi pipeline | YES | E5-Q15, E5-Q19, E5-Q34 |
| VADER | YES | E5-Q11 |
| NRC Emotion Lexicon | YES | E5-Q12 |
| WordNet Affect | YES | E5-Q30 |
| Plutchik / Ekman emotions | YES | E5-Q18, E5-Q12 |
| Hedonometer | YES | E5-Q5 |
| Brexit example | YES | E5-Q31 |
| Double propagation | YES | E5-Q9 |
| Agenda setting | YES | E5-Q13 |
| Opinion spam | YES | E5-Q34 |
| SVM for sentiment | YES | E5-Q33, E3-Q28 |
| Lexicon resources (Bing Liu) | YES | E5-Q27 |

**Verdict: FULLY COVERED**

---

### Lecture 5 — NERC

| Sub-topic | Covered | Where |
|-----------|---------|-------|
| NER vs NEC vs NEL distinction | YES | E6-Q1, E6-Q8 |
| IOB tagging | YES | E3-Q17, E3-Q20, E3-Q21, E6 (multiple) |
| Entity types (CoNLL) | YES | E6-Q4 |
| Gazetteers | YES | E6-Q7 |
| Word shape features | YES | E6-Q6, E6-Q24, E6-Q35 |
| Affix features | YES | E6-Q28 |
| CRF for sequence labelling | YES | E3-Q13 |
| BiLSTM+CRF | YES | E6-Q13, E6-Q14 |
| BERT for NER | YES | E6-Q16, E6-Q34, E4-Q21 |
| CoNLL 2003 | YES | E6-Q15, E6-Q27 |
| Cross-domain drop | YES | E3-Q15, E6-Q22 |
| Entity linking (AIDA, DBpedia Spotlight) | YES | E6-Q11, E6-Q33 |
| Coreference resolution | YES | E6-Q12, E6-Q26, E2-Q26 |
| FIGER types | YES | E6-Q5, E6-Q29 |
| NIL entities | YES | E6-Q9 |
| Spurious entity / boundary errors | YES | E6-Q19, E6-Q20, E6-Q32 |
| Strict vs partial span evaluation | YES | E6-Q20 |
| Name variation vs metonymy in NER | YES | E6-Q2, E6-Q3 |
| Character embeddings | YES | E6-Q14, E6-Q21 |
| Document-level features | YES | E6-Q17 |
| Real-world consequence (McAlpine) | YES | E6-Q10 |

**Verdict: FULLY COVERED**

---

### Lecture 6 — Topic Modelling

| Sub-topic | Covered | Where |
|-----------|---------|-------|
| Topics vs genres distinction | YES | E7-Q1 |
| LSA/LSI (SVD) | YES | E7-Q4, E7-Q31 |
| LDA generative model | YES | E7-Q6 |
| Document-topic matrix | YES | E7-Q7 |
| Topic-word matrix | YES | E7-Q8 |
| K selection (perplexity, PMI coherence) | YES | E7-Q12, E7-Q13, E7-Q29 |
| Bag-of-words limitation in LDA | YES | E7-Q9 |
| LDA variants: CTM | YES | E7-Q10 |
| LDA variants: Hierarchical LDA | YES | E7-Q30 |
| LDA variants: Short-text | YES | E7-Q26 |
| LDA variants: Dynamic | YES | E7-Q25 |
| Model selection decision tree | YES | E7-Q11, E7-Q24 |
| Supervised classification vs unsupervised | YES | E7-Q15, E7-Q16 |
| Reuters-21578 | YES | E7-Q3 |
| IPTC | YES | E7-Q2 |
| EuroVoc / JRC-Acquis | YES | E7-Q17 |
| BERTopic | YES | E4-Q34, E7-Q19, E7-Q35 |
| One-vs-rest classification | YES | E7-Q18 |
| Topic granularity | YES | E7-Q32 |
| Topic diversity metric | YES | E7-Q14 |
| Newsbrief / NWO examples | YES | E7-Q23, E7-Q27 |
| DBPedia dataset | YES | E7-Q22 |

**Verdict: FULLY COVERED**

---

### Word Embeddings & Transformers

| Sub-topic | Covered | Where |
|-----------|---------|-------|
| Distributional hypothesis (Firth) | YES | E4-Q1 |
| Context vectors / co-occurrence | YES | E4-Q2 |
| Word2Vec (positive pairs, hidden layer, analogy) | YES | E4-Q4, E4-Q5, E4-Q6 |
| GloVe (global co-occurrence) | YES | E4-Q31 |
| ELMo (contextual, BiLSTM) | YES | E4-Q23 |
| Static embedding limitation | YES | E4-Q7 |
| Bag-of-embeddings | YES | E4-Q8, E4-Q9 |
| CNN for text | YES | E4-Q10 |
| LSTM encoder-decoder | YES | E4-Q11 |
| Transformer / self-attention | YES | E4-Q12, E4-Q13, E4-Q14 |
| BERT MLM (15% masking) | YES | E4-Q15 |
| BERT NSP | YES | E4-Q18 |
| BERT specifications (768-dim, 12L, 12H) | YES | E4-Q17 |
| [CLS] token | YES | E4-Q18 |
| BERT encoder vs GPT decoder | YES | E4-Q16, E4-Q19 |
| Fine-tuning strategies (Sun et al. 2020) | YES | E4-Q27, E7-Q20, E7-Q21 |
| Catastrophic forgetting | YES | E4-Q28 |
| ITPT (within-task / in-domain pretraining) | YES | E4-Q27, E7-Q20 |
| WordPiece tokenisation | YES | E4-Q22 |
| BPE tokenisation | YES | E4-Q29 |
| XLM-RoBERTa (cross-lingual) | YES | E4-Q32, E6-Q23 |
| Transfer learning | YES | E4-Q20 |
| GPT autoregressive / parameter count | YES | E4-Q24 |
| Model size progression | YES | E4-Q30 |
| Pretraining corpora | YES | E4-Q33, E4-Q35 |
| HuggingFace NER pipeline | YES | E4-Q25, E4-Q26, E6-Q23, E7-Q33 |
| BERT fine-tuning for token classification | YES | E4-Q21 |

**Verdict: FULLY COVERED**

---

## 3. Coverage Gaps

After thorough review, **no major topic area listed in the syllabus is completely absent** from the 7 exams. However, the following sub-topics receive thin or no coverage:

| Gap | Severity | Detail |
|-----|----------|--------|
| **Sentence-level vs. document-level sentiment distinction** (explicitly as a sub-topic) | Minor | The difference is implied through ABSA questions but never asked directly. |
| **OpinionFinder / MPQA lexicon** | Minor | MPQA appears as a wrong-answer distractor in E5-Q11 but is never the correct answer or directly tested. |
| **WordNet Affect A-Labels named explicitly** (EMOTION, MOOD, TRAIT, etc.) | Covered | E5-Q30 — actually fully covered. |
| **Specific SemEval task mechanics beyond ABSA** (e.g., subtask A vs B labelling) | Minor | Only surface-level coverage of SemEval 2014 Task 4. |
| **Evaluation of topic models beyond perplexity and PMI** (e.g., human evaluation, topic coherence Cv)** | Minor | Only perplexity and PMI are explicitly tested (E7-Q12, Q13). |
| **Exact BERT-large specifications** (1024-dim, 24L, 16H) | Minor | BERT-base specs are tested (E4-Q17); BERT-large specs appear only as a distractor, not the answer. |

None of these gaps are critical. The syllabus items listed are all substantively covered.

---

## 4. Overall Verdict

### PASS — with two mandatory fixes and two recommended fixes

**Mandatory fixes (hard/near-hard duplicates):**

1. **E4-Q34 vs E7-Q19** — Hard duplicate. Both describe the BERTopic workflow with near-identical answer choices. Remove or substantially reframe one of them (e.g., reframe E4-Q34 to test how BERTopic differs from LDA rather than repeating the workflow steps).

2. **E3-Q15 vs E6-Q22** — Near-duplicate (same empirical finding, same numerical answer: >20 F1 points cross-domain drop). One should be changed — e.g., convert E6-Q22 into a question about *why* cross-domain performance drops rather than *how much*.

**Recommended fixes (intra-exam redundancy):**

3. **E3-Q17, Q20, Q21** — Three IOB questions in one exam is excessive. Drop one (Q17 is the most generic) and replace with a question on another underrepresented ML topic (e.g., TF-IDF computation or silver data bootstrapping).

4. **E5-Q17 and Q35** — Both ask about the Dutch sentiment model in HuggingFace (one asks the model name, one asks the code snippet). Replace Q35 with a question on a sentiment topic not yet covered in Exam 5 (e.g., the SNAP/Yelp dataset context or cross-lingual sentiment challenges).

**Overall:** The exam bank demonstrates broad, balanced coverage of all 7 lecture clusters. Topic distribution across exams is logical and well-organised. The two hard/near-hard duplicates are the only disqualifying issues, and both are straightforward to fix.

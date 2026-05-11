# TM Practice Exam Audit — Iteration 1

**File audited:** `/Users/karina/Documents/ObsidianVault/P5/Text Mining/TM_practice_exams.html`
**Date:** 2026-05-10
**Auditor scope:** Cross-exam uniqueness, style match to past quizzes/self-tests, lecture coverage, question quality, topic distribution.

---

## 1. Executive Summary (TOP ISSUES)

1. **The "25 exams × 35 questions" claim is misleading.** The HTML question bank contains only **168 unique questions** (lines 186–365). `buildExams()` (line 380) randomly samples 35 questions per exam from that single pool. Every "exam" therefore overlaps **massively** with every other exam — there are not 875 distinct questions, there are 168 reused 5–6× each on average. Mastery via repetition becomes a memorisation loop, not differentiated practice.
2. **A huge fraction of the bank is verbatim/near-verbatim copies of the Canvas self-test PDFs.** Q1–10 of the "LINGUISTICS" / "NLP" / "NER" / "SENTIMENT" / "TOPIC MODELLING" / "ML/EVALUATION" sections (lines 186–248) are direct copies of Quizzes 2/3/4/5 and the three self-tests, sometimes with the option order untouched. This is good for style match but bad for breadth — the student already has these.
3. **Distractor `a:3` bias is severe.** Of 168 questions, `a:3` appears far more often than any other answer index in the first 78 questions (every question 186–227 has `a:3`). This is a serious test-taking artefact: a student noticing the pattern can score ~30% by always picking option D. See lines 186–227.
4. **Answer-key bug.** Question on line 238 ("What is catastrophic forgetting during fine-tuning?") is filed under `topic:"Transformers"` (correct) but sits inside the `// ── TOPIC MODELLING ──` block (line 229) — disordered banking, will skew topic counters if a student greps by header.
5. **One factually shaky claim about NSP.** Line 261 says BERT pre-training uses MLM + NSP. Original BERT (Devlin 2018) did use NSP, but lecture 3-part2 emphasises MLM only and later research (RoBERTa) dropped NSP. The lecture slides (per the extracts) talk about masked language modelling, not NSP — this answer may not match what the course expects.
6. **Two key topic areas under-tested vs lecture weight:** **Evaluation/Annotation** (~14+4 = 18 of 168 = 11%) and **Embeddings** (10 = 6%) are under-represented given how much lecture 3 spends on them. **Sentiment** (23) and **Topic Modelling** (25) are slightly over-represented vs lecture weight.
7. **No command-line, regex, Python, or BIO-tagging practical questions exist** even though `Self test_ Command line test.pdf` is a major Canvas self-test (12 fill-in-the-blank questions on `pwd`, `cd`, `mkdir`, `grep -i`, `tail -n`, `bash`, `rm temp*txt`, Python lists, etc.). Format mismatch: HTML is 100% multiple-choice; past quizzes include **fill-in-the-blank and essay**. P0 gap.
8. **Several mid-level conceptual gaps:** no questions on **Cohen's kappa numeric interpretation thresholds**, **F1 calculation from a confusion matrix**, **TF-IDF formula**, **perplexity** (mentioned in the audit brief), **LDA hyperparameters (α, β, K)**, **coreference resolution depth**, **CoNLL evaluation modes (strict/lenient)**, **chunking IOB output**, or **regex for tokenisation**.
9. **Topic-modelling questions cluster narrowly** around 6 ideas (LDA randomness, IPTC, TF-IDF labelling, supervised vs unsupervised, granularity, long-doc difficulty) — they recycle the same concepts (lines 230–237, 349–364) instead of probing perplexity, coherence, Gibbs sampling, document-topic distribution shape, or LSA vs LDA.
10. **Question 219 (line 219) has a numerically wrong-flavoured answer key.** The math in the explanation gives recall ≈ 0.29 (10/40 + 20/60)/2, and the option D wording "Recall and precision are both 0.3" rounds correctly to 0.3 — but option A ("Precision 0.3, Recall 0.5") is not what the course's Quizzes 4.pdf shows as correct either. Verify: Canvas Quiz 4 answer is "Recall & precision are both 0.3" — so the HTML answer `a:3` is right but it depends on rounding; **flag for the improver to add a worked-numerics version that strips rounding ambiguity**.

---

## 2. Duplication Map

### 2a. Structural duplication

The `buildExams()` function (HTML line 380) at runtime samples 35 from a 168-item pool. Expected reuse rate: each question appears in ~5.2 of the 25 exams on average, ~16 exams' worth of overlap pairwise.

**This is the single biggest design flaw.** It cannot be diagnosed by reading the rendered exams — it is a property of the build code.

### 2b. Within-bank duplication clusters (same concept, two phrasings)

Even within the 168 unique questions, the following clusters test the same idea twice. The improver should collapse or differentiate these:

| Cluster | Lines | Topic | Note |
|---|---|---|---|
| Catastrophic forgetting | **238** + **316** | Transformers | Two near-identical questions, one in Topic-Modelling block (mislabelled-adjacent), one in addendum. Same correct answer wording. |
| LDA random initialisation instability | **237** + **364** | Topic Modelling | Both ask "why are LDA results unstable"; same answer (random init / sampling). |
| Topic granularity is application-dependent | **233** + **360** | Topic Modelling | Identical answer key wording. |
| Why universal topics are hard | **231** + **361** | Topic Modelling | Same idea (subjective, world changes). |
| Long texts harder for topic detection | **230** + **359** | Topic Modelling | Same answer. |
| TF-IDF for cluster labelling | **236** + **357** | Topic Modelling | Same idea repeated. |
| Disadvantage of supervised topic classification | **235** + **356** | Topic Modelling | Repackaged. |
| Macro vs micro averaging | **244** + **321** + **322** | Evaluation | Three near-identical, split as macro-defines + micro-defines + contrast. The contrast version (244) subsumes the other two. |
| BoW definition | **266** + **329** | ML/Embeddings | Both define BoW; one asks about sparsity, the other about order. |
| Skip-gram vs CBOW | **253** + **334** | Embeddings | Same content, one is forward (CBOW=context→target), one is reverse. |
| Static embedding polysemy limitation | **255** + **332** | Embeddings | Same example ("bank"). |
| TF-IDF definition vs use | **256** + **328** | Embeddings | First defines, second uses for feature selection — okay-ish but borderline. |
| BERT MLM/objective | **261** + **315** | Transformers | First is broad ("MLM+NSP"), second focuses on what MLM contributes. |
| Fine-tuning definition | **263** + **313** | Transformers | Two near-identical. |
| Lemmatisation vs stemming | **269** + **270** + **331** | NLP | Stemming defined, lemmatisation defined, lemmatisation-preferable. Some redundancy. |
| NER ambiguity examples | **214** + **299** | NER | Apple-as-org vs IBM-as-Big-Blue: one tests ambiguity, one tests variation — actually a good pair, keep. |
| BIO/IOB format purpose | **208** + (implicit in 305, 306) | NER | Could be tightened. |
| Sentiment features lists | **226** + **346** | Sentiment | Both ask "what features are used"; 226 is shorter, 346 is exhaustive. |
| Ravi & Ravi SVM finding | **227** + **347** | Sentiment | Same source citation; 227 asks "what's most used", 347 asks "what accuracy was found". Borderline okay. |
| Aspect-based sentiment | **223** + **348** | Sentiment | Same concept, different example. |
| Plutchik/Ekman emotions | **225** + **341** + **342** | Sentiment | Three questions on basic emotions — keep one Ekman + one Plutchik intensity. |

**Total flagged duplicate or near-duplicate concept pairs: ~22 clusters** covering ~45 of the 168 questions (27% redundancy). Combined with random sampling reuse, the same student will see "TF-IDF for cluster labelling" potentially 8–10 times across 25 exams.

### 2c. Identical to past quizzes (not duplicates per se, but worth flagging)

These HTML questions are **near-verbatim copies** of the Canvas materials — the student has already seen them. The improver should keep representative examples but should generate fresh angles, since these will train recall of one fixed wording.

- HTML 186 = Self test_ Introduction to linguistics Q1 ("Text Mining Course" → NP)
- HTML 187 = Self test_ Linguistics Q2 (dependency vs constituent parsing)
- HTML 188 = Self test_ Linguistics Q3 (chunkers)
- HTML 189 = Self test_ Linguistics Q4 (lecture room / university building → meronymy)
- HTML 190 = Self test_ Linguistics Q5 (parsers/chunkers → Syntax)
- HTML 191 = Self test_ Linguistics Q6 (semantics vs pragmatics)
- HTML 192 = Self test_ Linguistics Q7 (prefix → morphology)
- HTML 193 = Self test_ Linguistics Q8 (inflection)
- HTML 194 = Self test_ Linguistics Q9 (dependency relations)
- HTML 195 = Self test_ Linguistics Q10 (metaphor vs metonymy)
- HTML 197–206 = Quizzes 2 Q1–10 (entire NLP self-test, verbatim)
- HTML 208–217 = Self test_ Named Entities Q1–10 (entire NERC self-test, verbatim)
- HTML 219–228 = Quizzes 4 Q1–10 (entire sentiment self-test, verbatim)
- HTML 230–239 = Quizzes 5 Q1–10 (entire topic modelling self-test, verbatim — but Q239 is the Churchill & Singh question filed under Topic-Modelling, mismatch noted in §5)

**About 60 of the first 78 questions are 1:1 copies of Canvas self-tests.** This is great for style benchmark but the student gains nothing new from re-doing them.

---

## 3. Style / Difficulty Match to Past Quizzes

### 3a. Format match (PARTIAL)

| Quiz format observed | Count in past materials | Count in HTML |
|---|---|---|
| 4-option multiple choice | ~50 questions across self-tests + quizzes | 168 (100%) |
| Fill-in-the-blank | 10 in Command-line self-test (`pwd`, `cd`, `mkdir`, `grep -i "cat"`, `tail -n 6 input >> output`, `bash run.sh`, `rm temp*txt`, `>>>`, Python list syntax) | **0** |
| Short essay | 2 in Command-line self-test (Tab key, option vs argument) | **0** |
| Numeric / "calculate this" MCQ | 1 (Quiz 4 Q1, the precision/recall calculation) | 1 (HTML 219) |

**Verdict:** Format match for MCQ is good; **the entire command-line / Python / regex strand of the course is missing from the HTML**. The course final is "multiple choice, individual" per home page line 144, so this may be okay — but the user said "every gap matters" and Command-line self-test exists on Canvas.

### 3b. Difficulty distribution

Sampling 12 representative HTML questions vs past quizzes:

| Difficulty | Past quizzes | HTML practice exams |
|---|---|---|
| Easy (definitional, one-keyword recall) | ~40% | ~55% |
| Medium (conceptual contrast, "which best describes") | ~50% | ~38% |
| Hard (numeric calculation, multi-step reasoning, novel application) | ~10% | ~7% |

The HTML skews **easier** than the past quizzes. Past Quiz 4 Q1 (precision/recall numeric) and the Command-line essay questions are harder than 90% of the HTML bank. The HTML also lacks:
- Multi-step numeric questions (only one — line 219)
- "Read this 3-line snippet and identify the bug" style
- Cross-lecture synthesis (e.g., "you have noisy bronze data and a CRF NER tagger; what evaluation strategy?")

### 3c. Wording style

Past-quiz wording often includes a **scenario premise** ("Assume you have 100 movie reviews…"; "Consider the sentence X"; "In the previous question…"). HTML questions are mostly bare-question style. Only ~10 HTML items (lines 279, 283, 296, 317, 319, 320, 326, 332, 338, 345) use scenario framing. Past quizzes use scenario framing ~30% of the time.

### 3d. Use of code / regex / linguistic examples

- **Linguistic examples in HTML:** Plentiful (good) — "may may still rule in May", "I saw her duck", "Old women and men", "cold soda vs cold person", "color/colour", "IBM | NNP | B-NP | XXX | B-ORG".
- **Code snippets in HTML:** **Zero.** The past Command-line self-test demands `grep -i "cat"`, `tail -n 6 input >> output`, `rm temp*txt`, `>>>` Python prompt, `wine = ['beaujolais', 'rioja', 'champagne']`, `print(wine[0])`. None of this is in the HTML.
- **Regex in HTML:** Zero. The course `more_resources.md` (not read but inferred) and lab sessions almost certainly cover regex.
- **CoNLL tagging snippets:** Only one (line 305, `IBM | NNP | B-NP | XXX | B-ORG`). Past lecture 3 spends multiple slides on this format.

---

## 4. Lecture Content Coverage Table

P0 = past-quiz topic AND missing/weak in HTML | P1 = lecture topic missing in HTML | P2 = lecture topic weakly covered

### Lecture 1 — Course Overview

| Key topic | Covered? | # questions | Gap |
|---|---|---|---|
| Definition of text mining (unstructured → structured) | Yes | 1 (line 279) | OK |
| CL vs NLP vs TM distinction | Yes | 1 (line 280) | OK |
| "No such thing as simple text" | Yes | 1 (line 281) | OK |
| Toolkits (NLTK/spaCy/HuggingFace) | Yes | 1 (line 282) | OK |
| NLP pipeline structure | Yes | 3 (lines 200, 283, 286) | OK |
| Error propagation in pipelines | Yes | 1 (line 283) | OK |
| Failure/success cases (vaccines, airline) | Partial | 0 explicit | **P2** — lecture opens with these examples |
| Course logistics (60% MC exam, ≥5.5 pass) | Mentioned in home | 0 questions | OK (not testable) |

### Lecture 2 — Linguistics and NLP

| Key topic | Covered? | # questions | Gap |
|---|---|---|---|
| Tokens vs types | No | 0 | **P1** |
| Tokenisation challenges | Yes | 3 (lines 197, 284, hyphenated terms) | OK |
| Sentence splitting issues (`Dr.`) | Yes | 1 (line 283) | OK |
| Morphology (derivation, inflection, compounding) | Yes | 2 (lines 192, 193) | OK |
| Open vs closed POS classes | Yes | 1 (line 292) | OK |
| POS tagging baseline (~90% most-frequent-tag) | Yes | 1 (line 293) | OK |
| Dependency vs constituent parsing | Yes | 2 (lines 187, 194) | OK |
| Chunking | Yes | 2 (lines 188, 297) | OK |
| Constituent types (NP, VP, AdjP, PP) | Yes | 1 (line 186) | OK — single question, P2 to add a "VP" or "AdjP" focused question |
| Lexical relations (synonymy, hyponymy, meronymy, homophony, polysemy) | Partial | 1 (line 189) | **P2** — only meronymy tested |
| Word sense disambiguation | No | 0 | **P1** |
| Semantics vs pragmatics | Yes | 1 (line 191) | OK |
| Metaphor vs metonymy | Yes | 1 (line 195) | OK |
| Zipf's law | Yes | 1 (line 290) | OK |
| Ambiguity (lexical, syntactic, scope) | Yes | 3 (lines 201, 285, 296) | OK |
| Morphologically rich languages, forms:stems ratio | Yes | 1 (line 294) | OK |
| Stopwords (not a POS class) | Yes | 2 (lines 271, 295) | OK |
| Stemming vs lemmatisation | Yes | 3 (lines 269, 270, 331) | OK (slightly redundant) |
| Subject-verb agreement (dependency) | Yes | 1 (line 298) | OK |
| WordNet | Yes | 1 (line 199) | OK (movement words) |

### Lecture 3 Part 1 — Machine Learning for NLP I

| Key topic | Covered? | # questions | Gap |
|---|---|---|---|
| Supervised vs unsupervised learning | Yes | 1 (line 206) | OK |
| Annotation: inline vs standoff | Yes | 1 (line 202) | OK |
| Gold/silver/bronze | Yes | 2 (lines 203, 324) | OK |
| Inter-annotator agreement (IAA) concept | Yes | 1 (line 247) | OK |
| Cohen's kappa formula | Yes | 1 (line 248) | OK |
| Kappa thresholds (0.55 = moderate, 0.87 = high) | Partial | 1 (line 323) | OK |
| Feature engineering | Yes | 2 (lines 204, 205) | OK |
| Bag-of-words | Yes | 2 (lines 266, 329) | OK (redundant) |
| N-grams | Yes | 2 (lines 268, 330) | OK |
| TF-IDF | Yes | 3 (lines 256, 328, 357) | OK |
| Sparsity of BoW vectors | Yes | 1 (line 329) | OK |
| Precision/Recall/F1 definitions | Yes | 3 (lines 241, 242, 243) | OK |
| Macro vs micro averaging | Yes | 3 (lines 244, 321, 322) | OK (redundant) |
| **F1 from a confusion matrix (numeric)** | **No** | **0** | **P0** — past Quiz 4 Q1 is numeric |
| Confusion matrix interpretation | Yes | 2 (lines 245, 327) | OK |
| Accuracy on imbalanced data | Yes | 1 (line 326) | OK |
| Cross-validation | Yes | 2 (lines 246, 318) | OK |
| Domain shift / generalisation | Yes | 1 (line 317) | OK |
| Train/dev/test split discipline | Yes | 1 (line 250) | OK |
| Overfitting | Yes | 1 (line 249) | OK |
| Workflow order (data → annotation → features → train → eval) | Yes | 1 (line 325) | OK |
| Naive Bayes | Yes | 1 (line 265) | OK |
| Logistic regression vs NB | Yes | 1 (line 267) | OK |
| **Decision trees, k-NN, SVM (as classifiers)** | Weak | only SVM via Ravi & Ravi | **P2** |
| **Cost-sensitive learning, class weighting** | No | 0 | **P1** |
| Stopwords | Yes | 2 (lines 271, 295) | OK |

### Lecture 3 Part 2 — Machine Learning for NLP II

| Key topic | Covered? | # questions | Gap |
|---|---|---|---|
| Word embeddings concept | Yes | 1 (line 252) | OK |
| Word2Vec CBOW vs Skip-gram | Yes | 2 (lines 253, 334) | OK |
| GloVe (global co-occurrence) | Yes | 1 (line 333) | OK |
| Vector analogies (king − man + woman) | Yes | 1 (line 254) | OK |
| Static embedding polysemy limit | Yes | 2 (lines 255, 332) | OK |
| Sentence embeddings (mean) | Yes | 1 (line 335) | OK |
| **ELMo / contextual non-BERT embeddings** | No | 0 | **P1** |
| Transformer architecture (self-attention) | Yes | 1 (line 258) | OK |
| BERT vs GPT | Yes | 2 (lines 259, 260) | OK |
| BERT pre-training (MLM, NSP) | Yes | 2 (lines 261, 315) | OK |
| Fine-tuning | Yes | 4 (lines 262, 263, 313, 365) | OK (redundant) |
| Catastrophic forgetting | Yes | 2 (lines 238, 316) | OK |
| WordPiece / SentencePiece | Yes | 2 (lines 310, 311) | OK |
| BERT dimensions (768) / heads (12) | Yes | 1 (line 314) | OK |
| HuggingFace pipeline tasks | Yes | 2 (lines 309, 312) | OK |
| CRF on top of BiLSTM | Yes | 1 (line 306) | OK |
| **LSTM / BiLSTM mechanics (gates, memory)** | No | 0 | **P1** |
| **Encoder vs decoder vs encoder-decoder** | Weak | 1 (line 260, indirect) | **P2** |
| **Attention head visualisation / interpretability** | No | 0 | **P1** |
| **Positional encoding** | No | 0 | **P1** |

### Lecture 4 — Sentiment Analysis

| Key topic | Covered? | # questions | Gap |
|---|---|---|---|
| Subjectivity vs sentiment (broad definition) | Yes | 2 (lines 336, 340) | OK |
| Opinion holder, target, expression, polarity | Yes | 3 (lines 220, 222, 344) | OK |
| Source-Introducing Predicates (SIPs) | Yes | 1 (line 337) | OK |
| Implicit vs explicit sentiment | Yes | 1 (line 338) | OK |
| Agenda setting | Yes | 1 (line 339) | OK |
| Stance vs opinion vs polarity | Yes | 1 (line 340) | OK |
| Negation words | Yes | 1 (line 221) | OK |
| Aspect-based sentiment | Yes | 2 (lines 223, 348) | OK |
| Figurative language (simile, metaphor, metonymy) | Yes | 1 (line 224) | OK |
| Domain dependence (cold person / cold soda) | Yes | 1 (line 345) | OK |
| Ekman six basic emotions | Yes | 1 (line 225) | OK |
| Plutchik wheel | Yes | 2 (lines 341, 342) | OK |
| Sentiment features (n-grams, POS, lexicons, negation, dependency) | Yes | 2 (lines 226, 346) | OK |
| Ravi & Ravi: SVM most common | Yes | 1 (line 227) | OK |
| Ravi & Ravi: 72–92% in-domain accuracy | Yes | 1 (line 347) | OK |
| Ravi & Ravi pipeline (subjectivity, polarity, sentiment, spam, aspect) | Yes | 1 (line 343) | OK |
| Five opinion-extraction classification problems | Yes | 1 (line 344) | OK |
| VADER specialisation | Yes | 1 (line 228) | OK |
| **VADER mechanics (valence, intensifiers, emoji)** | No | 0 | **P1** |
| **Lexicon-based vs ML-based sentiment trade-offs** | Weak | implicit only | **P2** |
| **NRC emotion lexicon** | No | 0 | **P1** — appears explicitly in lecture |
| **Argumentation, attribution as subjectivity types** | Weak | 1 (line 336 mentions) | **P2** |

### Lecture 5a — NERC

| Key topic | Covered? | # questions | Gap |
|---|---|---|---|
| BIO/IOB format | Yes | 1 (line 208) | OK |
| Metonymy in NER (Washington as PER/LOC/GOV) | Yes | 1 (line 209) | OK |
| Balanced evaluation datasets | Yes | 1 (line 210) | OK |
| Referring expressions (pronouns, common NPs) | Yes | 2 (lines 211, 301) | OK |
| NER vs NEC vs NEL/NED | Yes | 2 (lines 212, 300) | OK |
| NERC features (word, lookup, document) | Yes | 1 (line 213) | OK |
| Ambiguity vs variation in NER | Yes | 2 (lines 214, 299) | OK |
| Word-shape features | Yes | 2 (lines 215, 305) | OK |
| Token-level features (POS, lemma, IOB, length) | Yes | 1 (line 216) | OK |
| Factors affecting NERC performance | Yes | 1 (line 217) | OK |
| Entity extent / nested entity ambiguity | Yes | 1 (line 302) | OK |
| Fine-grained typing (FIGER 112 types) | Yes | 1 (line 303) | OK |
| Gazetteers | Yes | 1 (line 304) | OK |
| CRF in neural NER | Yes | 1 (line 306) | OK |
| Lample et al. 2016 BiLSTM+CRF | Yes | 1 (line 307) | OK |
| Affix embeddings (Yadav & Bethard) | Yes | 1 (line 308) | OK |
| Sequence labelling concept | Yes | 1 (line 272) | OK |
| POS tagging as sequence labelling | Yes | 1 (line 273) | OK |
| CRF for sequence labelling | Yes | 1 (line 274) | OK |
| **Coreference resolution** | Weak | mentioned but no Q | **P1** — lecture explicitly says "for TM/IE coreference is important" |
| **Entity linking targets (Wikipedia, DBpedia, YAGO, AIDA/AGDISTIS, DBpedia Spotlight)** | Partial | 1 (line 300) | **P2** — only generic question |
| **CoNLL-2003 evaluation modes (strict span vs lenient)** | No | 0 | **P1** |
| **NER error analysis types (boundary, type, missed, spurious)** | No | 0 | **P1** |

### Lecture 6 — Topic Modelling

| Key topic | Covered? | # questions | Gap |
|---|---|---|---|
| Long-text topic ambiguity | Yes | 2 (lines 230, 359) | OK (redundant) |
| Universal topics are hard | Yes | 2 (lines 231, 361) | OK (redundant) |
| Topic modelling vs text categorisation | Yes | 1 (line 232) | OK |
| Granularity is application-dependent | Yes | 2 (lines 233, 360) | OK (redundant) |
| Topic unit (sentence/doc/book) | Yes | 1 (line 234) | OK |
| Supervised topic classification disadvantages | Yes | 2 (lines 235, 356) | OK (redundant) |
| Supervised topic classification advantages | Yes | 1 (line 355) | OK |
| TF-IDF for cluster labelling | Yes | 2 (lines 236, 357) | OK (redundant) |
| LDA random init instability | Yes | 2 (lines 237, 364) | OK (redundant) |
| Churchill & Singh factors (dataset size, noise, doc length) | Yes | 1 (line 239) | OK |
| Genres ≠ topics | Yes | 1 (line 349) | OK |
| IPTC top-level categories | Yes | 1 (line 350) | OK |
| IPTC 1,200 multilingual terms | Yes | 1 (line 351) | OK |
| Reuters-21578 | Yes | 1 (line 352) | OK |
| JRC-Acquis / EuroVoc | Yes | 1 (line 353) | OK |
| One-vs-all multi-label | Yes | 1 (line 354) | OK |
| LDA bag-of-words assumption | Yes | 1 (line 362) | OK |
| LDA document-topic + topic-word distributions | Yes | 1 (line 358) | OK |
| Hidden topic interpretation example | Yes | 1 (line 363) | OK |
| **LDA hyperparameters (α, β, K — number of topics)** | No | 0 | **P0** — lecture covers, exam likely asks |
| **Perplexity / topic coherence as evaluation** | No | 0 | **P0** — listed explicitly in audit brief |
| **Gibbs sampling / inference** | No | 0 | **P1** |
| **LSA vs LDA** | No | 0 | **P1** |
| **Top-layer transformer for topic classification (S-BERT, CLS token)** | Weak | implicit | **P2** — lecture 6 ends on this |
| **Multi-task fine-tuning ("marginally helps")** | No | 0 | **P2** — lecture footer claim |
| **Decreasing learning rate to combat catastrophic forgetting** | No | 0 | **P2** — lecture says this explicitly |

---

## 5. Question-Quality Issues

### 5a. Wrong or debatable answers

| Line | Issue |
|---|---|
| **219** | Macro precision/recall arithmetic question. Compute: pos P=10/50=0.2, neg P=20/50=0.4 → macro P=0.30. Pos R=10/40=0.25, neg R=20/60=0.333 → macro R≈0.292. The answer key `a:3` ("Recall and precision are both 0.3") rounds both to 0.3 — defensible **only at 1-decimal rounding**. At 2-decimal precision the right answer doesn't exist among the options. Past Quiz 4 has the same answer. Acceptable, but flag that the options are weak. |
| **261** | "Masked Language Modelling AND Next Sentence Prediction" — original BERT used both, but lecture 3-part2 (per extracted headers) emphasises MLM and "the model learns which tokens from the [context]". Verify what the slides actually say about NSP — if the slides only cover MLM, mark `a:1` may be off vs course expectation. |
| **350** | "Which is an IPTC top-level category?" Answer `crime/law/justice` — verify wording: lecture mentions "crime, law and justice" as a category but other distractors (politics, sport, health) are also IPTC categories so the question is poorly constructed. The given correct answer is fine, but a fairer item would have only one IPTC and three non-IPTC distractors. |
| **199** | "How many words in English for movements per WordNet?" Answer `more than 3000`. This trivia question has options `between 30 and 300 / between 3 and 30 / between 300 and 3000 / more than 3000`. Past Quiz 3 confirms `more than 3000` (the student got this wrong on attempt 1). The question is a pure recall lottery — keep, but it's the lowest-signal question in the bank. |
| **343** | "Which is one of Ravi & Ravi's subjectivity mining pipeline steps?" Answer `Opinion spam detection`. Distractors are all CS topics (MST, A*, DB normalization) — too easy. Mark as P2 quality. |
| **350** | See above. |
| **365** | The "exam answer is strongest if asked why transformer fine-tuning changed text classification" phrasing is meta and awkward — it's asking the student to pick the right answer to a hypothetical exam question. Rewrite as a direct question. |

### 5b. Ambiguous/dual-correct options

| Line | Issue |
|---|---|
| **211** | Two answer options both have technical merit: option C "A communicative act to identify an entity" is a textbook definition of "referring expression" in pragmatics; option D (the marked correct) is more specific. Could be argued either way. |
| **189** | "Lecture room → university building = meronymy". A student might call this hyponymy (a lecture room is a kind of room, which is a kind of building space). The lecture treats it as part-whole, so meronymy — but ensure the explanation makes this airtight. |
| **226** + **346** | Both are "all of the above" / "all listed features" questions. These are weak because the test-taker can identify the pattern. |
| **204** + **213** | Both heavily rely on "all of the above" or "everything not-physical" elimination. |

### 5c. Trivia vs conceptual depth

These items test memorised facts rather than understanding (consider rotating with deeper questions):

- 199 (WordNet 3000 movement words)
- 314 (BERT 768 dim / 12 layers)
- 351 (IPTC 1,200 terms)
- 352 (Reuters-21578 as a dataset)
- 353 (JRC-Acquis = 22 languages)
- 307 (Lample et al. 2016 architecture)
- 308 (Yadav & Bethard affix discussion)

Five out of seven of these come from one lecture each. Keep 2–3, drop or repurpose the rest.

### 5d. Option-style problems

- **"All of the above" overuse:** Lines 193, 213, 224, 226, 234, 346 — six items. Past quizzes use this sparingly. Reduce to ≤3.
- **Mutually exclusive but trivial distractors:** Line 217 (font size as a NERC factor — silly distractor), line 285 (option C "Pipelines cannot perform POS tagging" — clearly false), line 343 (MST, A*, DB normalization for sentiment). Easy to eliminate by domain knowledge.
- **Long option D bias:** In ~70% of questions where `a:3` is correct, option D is also the longest. A test-savvy student picks D on uncertainty. **This is the #1 fixable quality issue.** Shuffle answer indices uniformly: aim for ~25% each of a:0/1/2/3.

### 5e. Mislabelled topics

- Line 238 (catastrophic forgetting) is `topic:"Transformers"` but sits in the `// ── TOPIC MODELLING ──` block.
- Line 239 (Churchill & Singh, which is topic modelling) is labelled `topic:"Topic Modelling"` correctly but Q238 above is wrong-bucketed.
- Line 309 (HuggingFace NER pipeline output) is `topic:"Transformers"` — could also be NER. Borderline.

---

## 6. Topic Distribution Analysis

Question bank counts (extracted via grep on `topic:"..."` in HTML):

| Topic | # questions | % of bank | Lecture weight (approx slide count) | Verdict |
|---|---|---|---|---|
| Topic Modelling | 25 | 14.9% | Lecture 6 only (~80 slides) | **Over-represented** vs lecture time (1 of 7 ≈ 14% would be right, but the lecture is shorter than Lect 3) |
| NLP (general / pipeline / preprocessing) | 25 | 14.9% | Spread across L1, L2, L3p1 | OK |
| Sentiment | 23 | 13.7% | Lecture 4 (~80 slides) | OK |
| NER | 22 | 13.1% | Lecture 5a (~70 slides) | OK |
| Linguistics | 21 | 12.5% | Lecture 2 (~80 slides) | OK |
| Transformers | 16 | 9.5% | Lecture 3p2 (large) | **Slightly under** — should be closer to 18–20 given lecture weight |
| Evaluation | 14 | 8.3% | Spread (L3p1 mostly) | OK |
| Embeddings | 10 | 6.0% | Lecture 3p2 share | **Under-represented** given importance — add 4–5 |
| ML (general / BoW / NB / LR) | 8 | 4.8% | Spread | **Under** — add 3–4 |
| Annotation | 4 | 2.4% | L3p1 has a whole module | **Under** — add 3 (kappa thresholds, IAA disagreement causes, annotation guidelines) |

**Recommended target distribution (per past quiz frequency and lecture weight):**

| Topic | Recommended # in a 200-Q bank |
|---|---|
| Linguistics | 25 |
| NLP / Pipeline / Preprocessing | 25 |
| ML general (BoW, NB, LR, classifiers) | 18 |
| Evaluation | 20 |
| Annotation & IAA | 10 |
| Embeddings | 18 |
| Transformers / BERT | 25 |
| NER / NERC | 25 |
| Sentiment | 20 |
| Topic Modelling | 18 |

**Total recommended bank size: 200–225 unique questions** (vs current 168). Then either expand pool and keep random sampling, or — better — **replace `buildExams()` with deterministic 25 disjoint 25-question subsets** so the 25 exams are truly independent.

---

## 7. Concrete Improvement Instructions for the Iter-1 Improver Agent

### 7.1 STRUCTURAL FIX (highest priority)

**Problem:** `buildExams()` at HTML line 380 samples 35 from 168 with replacement across exams (no global deduplication between exams). Result: massive cross-exam duplication.

**Fix options (pick one):**

- **Option A (recommended):** Expand the bank to **at least 250 unique questions** and rewrite `buildExams()` to partition them into 25 exams of 10 questions each (with stratified topic coverage), OR keep 35 questions but reduce to 7 exams. Smaller-but-disjoint is better than 25 overlapping.
- **Option B:** Keep the 25 × 35 framing but partition the 875 question-slots from a bank of ~600 unique questions, with each question used ≤2 times across the 25 exams, and never twice in the same exam. Requires growing the bank from 168 to ~600.
- **Option C (cheapest):** Add a per-exam seeded shuffle so each "exam N" is reproducible, and explicitly tell the student "the 25 exams reuse questions; expect overlap". Honest but doesn't fix mastery.

**My recommendation: Option A with 10-question exams** — matches Canvas self-test length (10 Qs), is realistic exam-prep granularity, and avoids reuse.

### 7.2 ANSWER-KEY DE-BIAS (must do)

The `a` field is `:3` in ~70 of 168 questions. Currently:
- a:0 ≈ 35 (21%)
- a:1 ≈ 30 (18%)
- a:2 ≈ 15 (9%)
- a:3 ≈ 88 (52%)

**Fix:** For every question, randomly permute the `opts` array and update `a` so that, across the bank, each index appears ~25% of the time. Verify post-fix with a one-liner count.

### 7.3 REMOVE / COLLAPSE DUPLICATE CLUSTERS

For each cluster in §2b, **keep the higher-quality variant and delete or rewrite the other**. Specific cuts:

- Delete line 270 (lemmatisation alone) — keep 269 + 331 which together cover stemming-vs-lemmatisation contrast.
- Collapse lines 244, 321, 322 (macro/micro averaging) into one comparison + one calculation question.
- Collapse lines 237 + 364 (LDA random init) into a single question. Replace the second slot with **LDA hyperparameters α/β/K (P0)**.
- Collapse lines 230 + 359 (long-text topic difficulty) into one. Replace second slot with **perplexity (P0)**.
- Collapse lines 231 + 361 (universal topics hard) into one. Replace with **LSA vs LDA (P1)**.
- Collapse lines 233 + 360 (granularity is application-dependent) into one. Replace with **topic coherence vs perplexity (P0)**.
- Collapse lines 235 + 356 (supervised topic disadvantages) into one. Replace with **multi-task fine-tuning marginal help (P2)**.
- Collapse lines 236 + 357 (TF-IDF cluster labelling) into one. Replace with **S-BERT CLS-token classification (P2)**.
- Collapse lines 238 + 316 (catastrophic forgetting) into one. Replace with **decreasing-learning-rate as anti-forgetting mitigation (P2)**.
- Collapse lines 253 + 334 (CBOW vs Skip-gram) into one. Replace with **negative sampling / hierarchical softmax (P1)**.
- Collapse lines 255 + 332 (static embedding polysemy) into one. Replace with **ELMo as contextual non-BERT (P1)**.
- Collapse lines 263 + 313 (fine-tuning definition) into one. Replace with **positional encoding in Transformers (P1)**.
- Collapse lines 266 + 329 (BoW) into one. Replace with **n-gram language modelling (P1)**.
- Collapse lines 261 + 315 (BERT MLM) into one. Replace with **encoder-only vs decoder-only architectures (P2)**.
- Fix line 238's bucket: move to Transformers block.

### 7.4 NEW QUESTIONS TO ADD (P0 gaps — must)

**Format guidance for each:** 4-option MCQ, ~25 words for the stem, ~12–18 words per option, one short explanation. Mix in scenario framing ("Suppose you train…", "Given the following confusion matrix…").

#### P0 — Evaluation / numerics

1. **F1 from confusion matrix.** "A classifier gives TP=30, FP=20, FN=10. What is the F1 score?" Compute: P=30/50=0.60, R=30/40=0.75, F1=2(0.6)(0.75)/(0.6+0.75)=0.667. Options should require honest calculation, not rounding luck.
2. **Imbalanced data — choose metric.** "Spam dataset is 95% ham / 5% spam. A classifier achieves 95% accuracy by always predicting ham. Which metric reveals the failure?" Options: macro-F1, accuracy, training loss, kappa.
3. **Kappa threshold interpretation.** "An annotation task on hotel-review polarity returns Cohen's kappa = 0.42. What does this indicate?" Options drawing the threshold (poor / fair / moderate / substantial / near-perfect agreement per Landis & Koch).
4. **Confusion matrix → per-class precision.** Multi-class confusion matrix given as text; ask for one class's precision.

#### P0 — Topic Modelling

5. **LDA hyperparameter K.** "Increasing K (number of topics) in LDA from 10 to 100 typically results in…" — more fine-grained topics but worse interpretability and overfitting risk.
6. **LDA α and β.** "What do the Dirichlet priors α and β control in LDA?" — α: per-doc topic concentration; β: per-topic word concentration.
7. **Perplexity.** "Lower perplexity on held-out documents means…" — better fit; but doesn't always correlate with human-judged coherence.
8. **Topic coherence metric.** "Topic coherence is preferred over perplexity for evaluating LDA because…" — correlates with human topic-quality judgement.

#### P0 — Command-line / Practical (only if course exam includes practical)

Confirm with course staff whether the final exam includes practical-style questions. If yes:

9. "Which command lists files including hidden ones, in long format, sorted by modification time?" — `ls -lat` (or similar).
10. "What does `grep -i "cat" file.txt` do?" — case-insensitive search.
11. "What is `tail -n 6 input >> output`?" — appends last 6 lines.
12. "What is the Python prompt symbol?" — `>>>`.
13. "How to remove all files starting with `temp` and ending with `txt`?" — `rm temp*txt`.

(If practical not on exam, **skip these** — they're for the Canvas self-test only.)

### 7.5 NEW QUESTIONS TO ADD (P1 / P2 gaps — should/could)

#### P1 — Linguistics

14. **Tokens vs types.** "In the sentence 'the cat sat on the mat', how many tokens and types are there?" — 6 tokens, 5 types.
15. **Word sense disambiguation (WSD).** "WSD is the task of…" — selecting the intended sense of a polysemous word in context.
16. **Lexical relations breadth.** Polysemy vs homonymy vs synonymy vs hyponymy — currently only meronymy is tested.

#### P1 — NER

17. **CoNLL strict vs lenient evaluation.** "A predicted entity 'Bank of America' overlaps with gold 'Bank of America Corp.'. Under strict span evaluation this counts as…" — wrong (false positive + false negative).
18. **Coreference resolution.** "Which NLP task links 'Obama' and 'he' to the same referent across sentences?" — coreference resolution.
19. **NER error types.** "A system tags 'Apple' (the fruit) as ORG. This is a…" — type confusion / spurious entity.
20. **DBpedia Spotlight / AIDA.** "Which NEL tool uses graph-based candidate selection to maximise coherence?" — AIDA/AGDISTIS.

#### P1 — Transformers / Embeddings

21. **Positional encoding.** "Why do Transformers need positional encodings?" — self-attention is permutation-invariant; positions must be injected.
22. **Attention computation.** "In scaled dot-product attention, what does softmax(QK^T/√d_k) compute?" — attention weights over the value vectors.
23. **Encoder-only vs decoder-only.** "BERT is encoder-only; GPT is decoder-only. T5 is…" — encoder-decoder.
24. **ELMo.** "How does ELMo differ from word2vec?" — context-dependent contextual embedding via bidirectional LSTM.
25. **Negative sampling in word2vec.** "Why use negative sampling?" — computational efficiency vs full softmax over vocabulary.

#### P1 — Sentiment

26. **VADER mechanics.** "VADER assigns a compound sentiment score using…" — valence-weighted lexicon, intensifiers, negation, punctuation, and emoji.
27. **NRC emotion lexicon.** "The NRC emotion lexicon associates each word with…" — 8 emotions (Plutchik) and 2 polarities.
28. **Lexicon-based vs ML sentiment trade-off.** Coverage vs domain-specific accuracy.

#### P2 — Topic Modelling

29. **LSA vs LDA.** "LSA uses SVD on a term-document matrix; LDA uses…" — generative probabilistic model with Dirichlet priors.
30. **Gibbs sampling for LDA inference.** Conceptual question.

#### P2 — Cross-cutting

31. **Annotation guidelines.** "Why are written annotation guidelines important?" — to enable inter-annotator reproducibility and resolve edge cases.
32. **Bronze → Gold workflow.** "How can bronze data be upgraded to gold?" — manual review and correction by trained annotators.
33. **Cost-sensitive learning.** When the minority class matters more.

### 7.6 REWRITE THESE EXISTING QUESTIONS

| Line | Rewrite reason | Suggested change |
|---|---|---|
| 365 | Meta phrasing ("Which exam answer is strongest…") | Direct: "Why has transformer fine-tuning been so impactful for text classification?" |
| 350 | Multiple options are valid IPTC categories | Make three distractors non-IPTC labels (e.g., "DBpedia entity types", "BERT layers", "Cohen's kappa") and only one IPTC. |
| 199 | Pure trivia | Either drop or rewrite as: "Which lexical resource provides synonym sets (synsets) for English?" with WordNet as answer. |
| 343 | Distractors absurd (MST, A*, DB normalization) | Replace distractors with plausible NLP tasks: "named-entity disambiguation", "coreference resolution", "discourse parsing". |
| 217 | "Text font size" is silly | Replace with: "Quality of the gazetteer", "Choice of evaluation metric", "Optimizer learning rate" — all plausible but only one is "doesn't impact NERC performance". |
| 226 / 346 | Both "all of the above" | Reduce to one, rewrite other as: "Which feature would be LEAST useful for sentiment classification?" with concrete options. |

### 7.7 WHICH EXAMS TO RE-BALANCE

Since `buildExams()` is random, individual exam-numbered rebalancing is moot until structure is fixed. Once partitioned (per §7.1), enforce per-exam topic minimums:

| Topic | Min per 35-Q exam | Min per 10-Q exam |
|---|---|---|
| Linguistics | 4 | 1 |
| NLP / Pipeline | 4 | 1 |
| ML | 3 | 1 |
| Evaluation + Annotation | 4 | 1 |
| Embeddings | 3 | 1 |
| Transformers | 4 | 1 |
| NER | 4 | 1 |
| Sentiment | 4 | 1 |
| Topic Modelling | 3 | 1 |
| Flex (any) | 2 | 2 |

### 7.8 META-FIX (UX)

- The home page (HTML line 124) says "25 full practice exams · 35 questions each". Add a note: "Questions are drawn from a shared pool — expect overlap across exams." Or fix the structure per §7.1.
- The home page topic-pill list (lines 127–140) lists "Fine-tuning" as a topic but no question carries `topic:"Fine-tuning"` (all fine-tuning questions are under Transformers). Either add the topic field or remove the pill.
- The home page lists "Text Classification" as a pill — there is no `topic:"Text Classification"` either. Same fix.
- The home page lists "Annotation" — only 4 questions carry it. Boost per §6.

---

## Appendix: Quick reference — bank file line ranges

- HTML structure / CSS: lines 1–180
- Question bank, primary block: lines 184–275
- Question bank, addendum block (`QB.push(...)`): lines 277–366
- `buildExams()` function: lines 380–404
- State / render / submit logic: lines 408–620

All question numbers in this report are HTML file line numbers, since `buildExams()` randomly orders and indexes inside any given rendered exam.

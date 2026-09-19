# TM — Text Mining Topics & Notes

[[TM — Index|← Back to TM Index]]

> Source files: tm-ba-lecture-1 through tm-ba-lecture-6, Fine-tuned-transformer-models.ipynb

---

## Topic Checklist

- [x] NLP pipeline & preprocessing
- [x] Linguistics foundations (morphology, syntax, semantics)
- [x] Bag-of-Words classification
- [x] Evaluation metrics
- [x] Word embeddings
- [x] Contextual embeddings & transformers
- [x] Sentiment / Subjectivity Mining
- [x] Named Entity Recognition & Classification (NERC)
- [x] Topic Modelling & Text Classification
- [x] Fine-tuning with HuggingFace

---

## 1. Text Mining — Introduction

> Source: tm-ba-lecture-1-course-overview.pdf

**Definition:** Text mining = the process of converting unstructured text into structured data (information or knowledge).

**Key terminology:**
| Term | Definition |
|------|-----------|
| Computational linguistics | Algorithms that model language (similarity, information value, sequence probabilities, language models) |
| NLP | Engineering to address aspects of natural language (tokenisation, lemmatisation, entity detection, sentiment) |
| NLP Toolkits | Software packages providing collections of NLP modules |
| Text mining | From unstructured text → structured information/knowledge |

**NLP Toolkits:**
- **NLTK** — well-documented, multi-language, good for teaching
- **spaCy** — faster, industrial use
- **AllenNLP** — focuses on deep learning
- **HuggingFace** — tools, datasets, pre-trained models (backed by Google)
- Utility packages: Scikit-learn, Gensim, Pandas

**Core insight:** "There is no such thing as simple text." A single tweet requires: entity phrase detection, entity linking, coreference resolution, provenance attribution, semantic parsing, and judgement extraction.

**Perspective graph:** A TM system can build a map: Claims × Sources × Stance (CONFIRM_CERTAIN, DENIAL_CERTAIN, CONFIRM_UNCERTAIN) — showing who believes what.

**Exam format:** MC exam = 60% of grade (individual). Project = 40% (group). Both parts must score ≥5; average ≥5.5.

> **Exam tip:** Know the distinction between computational linguistics, NLP, and text mining. Know which toolkits are used for which tasks.

---

## 2. Linguistics Foundations

> Source: tm-ba-lecture-2-linguistics-nlp.pdf

### 2a. Linguistics subdisciplines → NLP modules

| Subdiscipline | Medium/unit | NLP module |
|---------------|-------------|------------|
| Phonetics/phonology | Audio signals | Automatic Speech Recognition |
| Morphology | Words, word formation | Segmentizers, tokenizers, POS taggers, lemmatizers, compound splitters |
| Syntax | Sentences, grammatical structure | Syntactic parsers, chunkers |
| Semantics | Sentence/word meaning | Semantic parsers, word-sense disambiguation |
| Pragmatics | Language use in context | Context and domain models |

### 2b. Forms in language

- 11–112 phonemes per language
- 4,000–10,000 morphemes
- ~50,000 common words; millions including terminology
- Infinite number of sentences

**Zipf's Law (power law of word frequency):**
$$f(w_i) = \frac{f(W_1)}{r(w_i)}$$
- Frequency of a word = frequency of the most frequent word / rank
- Most frequent words: short, many meanings, make up **~80% of any text**
- Power law: rank 1=100, rank 2=50, rank 3=30, rank 4=25, rank 5=20...

> **Exam tip:** Zipf's law: frequency ∝ 1/rank. Most frequent words = stopwords with little content value.

### 2c. Morphology

**Morphemes** = smallest meaning-bearing units.
- *walked* → walk (activity) + -ed (past tense)

**Free morphemes** — occur independently (*boy, walk*)
**Bound morphemes** — cannot occur alone; have a function:
  - **Inflection**: modify a word (*-ed → walked; -s → boys*)
  - **Derivation**: create a new word (*-ism → racism; -ity → necessity*)
  - **Affixes**: prefixes (*be-, un-*), infixes (*minister-s-post*), suffixes (*love-able*)

**Word forms:** all inflected variants of a word (number, gender, case, tense, aspect).
- English 2:1 (walk → walks, walked)
- Dutch/German 5:1
- Finnish/Turkish >200:1 (morphologically rich)

> **Exam tip:** Why lemmatization matters: reduces word form variation to a canonical form; important especially for morphologically rich languages.

### 2d. Part-of-Speech (POS)

- **Open class** (open to neologisms): Noun, Verb, Adjective, Adverb
- **Closed class** (change slowly): Pronouns, Prepositions — small set of <100 words
- **Stopwords**: frequent words with little content (a, the, in, is, be) — NOT a linguistic class, includes both open and closed class

**POS tagging:** Assign POS to every token in a text.
- Choosing the most frequent tag (prior) already gives **90% accuracy**
- At least 50 different tagsets exist (Universal Dependencies: https://universaldependencies.org/u/pos/)
- Traditional method: Markov Models (next state depends on current state)

### 2e. Syntax

**Phrase (constituent):** a word or group of words functioning as a single unit.
- Built around a **head** word with **modifiers**; can be nested
- Types: NP (head=noun), VP (head=verb), AP (head=adjective), PP (head=preposition), S (sentence)

**Syntactic trees:** hierarchical structure showing phrase membership.

**Dependency relations:** links between heads of constituents.
- Subject (agrees in number with main verb)
- Object (obligatory NPs/PPs that make a sentence grammatical)
- Adjunct, Modifier

**Syntactic issues:**
- PP-attachment ambiguity: "Krelis waved at the cow with a hat" (two parse trees!)
- Scope ambiguity: "Old women and men can be annoying"
- Structural ambiguity: "flies like sailing ships"
- Ungrammatical sentences (tweets/chat) — parsers must be robust

**Chunking (shallow parsing):** list of constituents up to depth 2 (typically); cheaper alternative to full parse trees.
> [Krelis]NP [quickly waved]VP [at [the cow]NP]PP [with [a hat]NP]PP

### 2f. Two main problems for Text Mining

1. **Ambiguity** — structural and lexical (polysemy)
   - 121 most frequent English nouns have on average **7.8 meanings** each (Ng & Lee 1996, Princeton WordNet)
   - Lexical ambiguity is pervasive but humans do not perceive it
2. **Variation** — same meaning expressed many different ways

### 2g. Performance vs. Complexity

> Source: Maynard et al. 2016, Figure 1.3

Performance decreases as task complexity increases:
- Bag-of-words (simple, general) → ~90% performance
- Entities → ~80%
- Relations → ~50%
- Events → ~30%

The "usable accuracy" threshold lies in the middle of this curve.

---

## 3. NLP Pipelines & Preprocessing

> Source: tm-ba-lecture-3-machine-learning-nlp-part1.pdf

### 3a. NLP Pipeline Architecture

Complex problems broken into smaller problems solved in sequence. Modules pass output to the next:
- Tokenisation → Lexical Analysis → Syntactic Analysis → Semantic Analysis → Pragmatic Analysis

**Pipeline examples:**
- **NER pipeline:** Document → Tokenisation + Sentence Splitting → POS Tagging → Named Entity Recognition & Disambiguation
- **Sentiment pipeline:** Document → Tokenisation + Sentence Splitting → POS Tagging → Word Sense Disambiguation → Sentiment Analysis
- **Medical NLP pipeline:** PDF/HTML → Section detection → Sentence/Token → PoS/Lemma → Syntax → Named Entity → Entity Linking → Event → Relation → Time → Hedging → Structured Data

**Pipeline issues:**
1. **Error propagation** — errors in early modules cascade to later modules
2. **Ambiguities not exploited** — POS tagger gives "80% noun, 20% verb" but next module ignores the uncertainty
3. **Conflicts** — different modules output incompatible information
4. **Complexity** — input/output must be interoperable across modules

**Error propagation empirical result:** Propagated results for cross-folded benchmarks are significantly worse than isolated results (TOKENS, PoS, ENTITY, SYNTAX all degrade).

### 3b. Preprocessing (always required)

**Tokenisation problems:** hyphens (nitty-gritty), brackets ((semi-)irony), currencies ($523.45), encoding (UTF-8, diacritics), contractions (don't, men's), end-of-sentence hyphens.

**Sentence splitting problems:** abbreviations (Dr., Mrs., Bol.com), decimal numbers (7.5), HTML markup (`<body><h1>`), whitespace, formulae.

> **Exam tip:** Preprocessing is required even for state-of-the-art deep learning systems. "There is no such thing as simple text."

---

## 4. Bag-of-Words & Machine Learning for Text Classification

> Source: tm-ba-lecture-3-machine-learning-nlp-part1.pdf, tm-ba-lecture-3-machine-learning-nlp-part2.pdf

### 4a. Bag-of-Words (BoW)

Text represented as a vector of word counts — order is ignored.

**TF-IDF (Term Frequency × Inverse Document Frequency):**
- TF: how often a term appears in a document
- IDF: log(N/df) — downweights common terms, upweights rare distinctive terms
- Useful for feature selection and keyword extraction (e.g. in topic modelling)

### 4b. Supervised Classification Workflow

1. Data acquisition
2. Dataset construction
3. Labelling (annotation)
4. Feature construction
5. Data representation
6. Feature selection / projection
7. Classifier training
8. Solution evaluation

### 4c. Text Representations Compared

| Representation | Description |
|----------------|-------------|
| One-hot BoW | Each word → unique index; vector = counts |
| Embedding token encoding | Each word → dense vector [200d] per token |
| Mean sentence embedding | Average of token embeddings → single [200d] vector |
| IOB opinions | Sequence labels: B-pos, I-pos, O... |
| Sentiment word sequences | O O NEG POS O O... |

---

## 5. Evaluation

> Source: tm-ba-lecture-3-machine-learning-nlp-part2.pdf

### 5a. Core Metrics

$$\text{Precision} = \frac{tp}{tp + fp}$$
$$\text{Recall} = \frac{tp}{tp + fn}$$
$$\text{F1} = \frac{2 \cdot P \cdot R}{P + R}$$
$$\text{Accuracy} = \frac{tp + tn}{tp + fp + tn + fn}$$

- **Accuracy** only reliable for **balanced** data (spam example: 1% spam → 99% "not spam" classifier has 99% accuracy but is useless)
- **Contingency table** (confusion matrix): gold labels × system output labels

### 5b. Multi-class Averaging

| Method | How | When to use |
|--------|-----|-------------|
| **Macro** | Calculate P/R per class, then average | When performance must be balanced across classes (small classes matter equally) |
| **Micro** | Pool all TPs, divide by TP+FP | When number of cases is balanced across classes |

### 5c. Evaluation Framework

- **Train / dev / test** split (dev = development/validation set)
- **10-fold cross-validation:** rotate which 10% is held out; average performance
- **Church 2021 warning:** Cross-validation alone is not the real test — domain shift reveals true generalization

### 5d. Domain Shift

Performance drops **>20%** when shifting test data to a different domain (NERC Wikinews benchmark example).

### 5e. Application-Driven Precision/Recall Trade-off

| Scenario | Priority | Example |
|----------|----------|---------|
| Tsunami alert | High recall, low precision OK | Better to alarm too often than miss a tsunami |
| Topic classification | High recall | Don't miss relevant documents |
| Spam filter (no false positives) | High precision | One wrongly blocked email = bad |

**Strategy:** First maximize recall, then improve precision.

> **Exam tip:** Know macro vs micro averaging, when accuracy is misleading, and Church 2021's domain shift warning.

---

## 6. Word Embeddings

> Source: tm-ba-lecture-3-machine-learning-nlp-part1.pdf; J&M ch.5

### 6a. Why Embeddings?

BoW/one-hot: high-dimensional, sparse, no semantic similarity. Embeddings: low-dimensional, dense, similar words are close in vector space.

### 6b. Static Embeddings (Word2Vec / GloVe)

- **Word2Vec:** predict a word from its context (CBOW) or context from a word (Skip-gram)
- **GloVe:** trained on global word co-occurrence statistics; outputs 300D vectors
- Semantic properties: king − man + woman ≈ queen
- **Limitation:** one embedding per word regardless of context ("bank" = river bank or financial bank?)

### 6c. Contextual Embeddings (BERT / Transformers)

- Each token gets a different embedding depending on surrounding context
- BERT: 768 dimensions, 12 layers/attention heads
- Pre-trained via MASK prediction → fine-tuned on task-specific data
- "Apple delayed iPhone 13" vs "Apple with cinnamon" → different embeddings for Apple
- **Wolf et al. 2020:** HuggingFace Transformers library — standard toolkit for fine-tuning
- **Church et al. 2021:** fine-tuning: train model on small labelled dataset; inference: use fine-tuned model

> **Exam tip:** Static embeddings (GloVe/Word2Vec) = one vector per word form. Contextual (BERT) = one vector per token occurrence. Contextual embeddings resolve word sense ambiguity.

---

## 7. Subjectivity Mining / Sentiment Analysis

> Source: tm-ba-lecture-4-sentiment.pdf

### 7a. Key Definitions

**Subjectivity** = all kinds of social and emotional relationships expressed when posting information.

**Explicit sentiment:** "boundless energy" (pos), "ridiculous" (neg)
**Implicit sentiment:** "dies", "suffer" (neg?) — inferred rather than lexically marked

### 7b. Opinion Structure

**Holder → Source Introducing Predicate (SIP) → Sentiment → Target**

- **SIPs:**
  - Speech-act verbs: *say, claim, state, deny, confirm, reject*
  - Cognitive verbs: *think, believe, feel, hate, like*
- **Holders:**
  - **Author** — expresses their own opinion
  - **Participants** — emotions inferred from context (they die, they suffer)
- **Agenda setting:** author's subjective choice of what to mention or omit

### 7c. Emotion Models

| Model | Details |
|-------|---------|
| **Ekman et al. 1976** | 6 basic emotions: Anger, Disgust, Fear, Happiness, Sadness, (Surprise) |
| **Plutchik 1980** | Wheel of Emotions: intensity (ecstasy > joy > serenity); mixtures (love = joy + trust) |

**WN-Affect A-Labels (11 types):**
EMOTION, MOOD, TRAIT, COGNITIVE STATE, PHYSICAL STATE, HEDONIC SIGNAL, EMOTION-ELICITING SITUATION, EMOTIONAL RESPONSE, BEHAVIOUR, ATTITUDE, SENSATION

### 7d. Terminology Table

| Term | Meaning |
|------|---------|
| Subjectivity / Attitude | Broad umbrella term |
| Sentiment / Polarity | Positive / negative / neutral |
| Opinion | Lexically realised ("I like him") |
| Stance | In debate context ("I support X") |
| Aspects/Facets | Opinion about an aspect ("incredible battery") |
| Argumentation | "because..." justification |
| Emotion | Anger, joy, sadness... |
| Attribution | Source + cue + content ("BMW spokesman said: '...'") |

### 7e. Subjectivity Mining Pipeline (Ravi & Ravi 2015)

1. **Step 1:** Subjectivity classification → polarity determination
2. **Step 2:** Sentiment classification (ML / lexicon / hybrid; multi-lingual; cross-domain)
3. **Step 3:** Opinion spam detection
4. **Step 4:** Aspect extraction (ontology-based / non-ontology)

### 7f. 5 Opinion Extraction Classification Problems

1. Is this text subjective?
2. Does it contain an opinion expression?
3. Who is the holder?
4. What is the target?
5. What is the polarity?

### 7g. Features for Sentiment

- BoW / n-grams
- POS tags
- Opinion word lists (lexicons)
- Valence intensifiers, shifters, negation
- Syntactic dependencies
- Feature selection: TF×IDF, term position

### 7h. ML Methods (Ravi & Ravi 2015 survey)

| Method | # articles |
|--------|-----------|
| SVM | 55 (most popular) |
| DBA | 41 |
| Naïve Bayes | 28 |

Accuracy: 72–92% in-domain.

### 7i. Performance Results (document-level)

| System | F1 |
|--------|----|
| Rule + lexicon | 78.3 |
| NB + BoW | 82.3 |
| BoW + LEMMA | 83.6 |
| BoW + sentiment + rules (negator_tag) | 84.7 |
| Best combined | ~92% |

### 7j. Inter-Annotator Agreement (Cohen's κ)

| Task | κ |
|------|---|
| Hotel reviews (doc-level) | 0.87 (high) |
| Black Pete tweets | 0.65 / 0.57 / 0.55 |
| News opinion expressions | 0.70 |

### 7k. Context Dependence

"Cold" person (neg) ≠ "cold" soda (pos) → solution: weak supervision or **double propagation**.

### 7l. Levels of Analysis

- **Corpus** — emotions before/after WW-II, 9/11
- **Document** — one document has one sentiment
- **Sentence**
- **Phrase/Aspect**

> **Exam tip:** Know the 6 Ekman emotions by name. Know Ravi & Ravi 2015's 4-step pipeline. Know when SVM dominates. Know κ = inter-annotator agreement.

---

## 8. Named Entity Recognition & Classification (NERC)

> Source: tm-ba-lecture-5a-nerc.pdf

### 8a. Core Definitions

| Term | Definition |
|------|-----------|
| **Entity** | Instance of a person, org, place, object, or incident existing in some world |
| **Reference** | Communicative act to identify an entity |
| **Referring expression** | Proper noun / common noun phrase / pronoun |
| **Named entity expression** | Definite noun phrases, proper nouns |
| **NER** | Task of finding and classifying named entity expressions in text |

### 8b. Entity Types

People, Locations, Organisations, Time, Events — no universal agreed-upon full set.

### 8c. NERC-D/L Pipeline

| Step | Task |
|------|------|
| **NER** (Recognition) | Detect the phrase |
| **NEC** (Classification) | Assign entity type (PER, LOC, ORG...) |
| **NEL** (Linking) / **NED** (Disambiguation) | Link to reference database (Wikipedia, DBPedia, YAGO) |
| **Coreference** | Any phrase referring to same entity (pronouns, NPs, abbreviations) |

### 8d. What Makes NER Hard?

| Challenge | Example |
|-----------|---------|
| **Variation** | IBM / "The Big Blue" |
| **Ambiguity** | "may may still rule in may" |
| **Extent** | Nested: whole phrase vs. 3 entities |
| **Types** | Fine-grained: FIGER has 112 types |
| **Time** | Relative: "yesterday" |
| **Metonymy** | "US" → people / org / location |

### 8e. Classic vs. Modern Pipeline

**Classic:** Linguistic Pre-processing → Gazetteer Lookup → Grammar Rules → Co-reference Resolution

**Modern:** Pre-processing → Pre-trained transformers fine-tuned for token classification + BIO/IOB labelling

### 8f. NERC Feature Engineering (Nadeau & Sekine 2007)

**Word-level features:**
- Case: Capitalized, all-caps, mixed
- Punctuation: period, apostrophe, hyphen
- Digit, Character, Morphology (prefix/suffix), POS, Function word
- Word shape: Xxx, Xxxxxxxxx, xxxXx
- Short word shape: Xx, Xx, xXx

**Gazetteers/Lexicons:**
- General lists
- Entity lists (orgs, persons, locations, astral bodies)
- Entity cues (org typical words, person titles, location typical words)

**Document features:**
- Multiple occurrences (anaphora/coreference)
- Local syntax (position in sentence/paragraph/document)
- Meta information (URI/XML section)
- Corpus frequency / co-occurrences

### 8g. CoNLL Feature Representation

```
Word | POS | Chunk | Short shape | Label
IBM  | NNP | B-NP  | XXX         | B-ORG
said | VBD | B-VP  | xxxx        | O
```

Labels: B-ORG, I-ORG, B-PER, I-PER, B-LOC, I-LOC, O

### 8h. Sequence Labelling

- Classifier uses surrounding token context (window approach)
- **CRF (Conditional Random Field):** models sequence dependencies L→R and R→L
- **BIO/IOB** encoding: B = beginning of entity span, I = inside, O = outside

### 8i. BiLSTM + CRF Architecture (Lample et al. 2016)

```
Char + GloVe Embeddings (300D)
→ Character LSTM
→ Left-to-right LSTM (l-layer)
→ Right-to-left LSTM (r-layer)
→ Concatenation (c-layer)
→ CRF Layer → BIO labels
```

### 8j. Architectures Compared (Yadav & Bethard 2018)

| Architecture | Description |
|-------------|-------------|
| Word-level NN | Word embeddings only |
| Character-level NN | Character embeddings only |
| Word + Character | Combined |
| Word + Character + Affix | Add n-gram prefixes/suffixes |

**Affix = n-gram prefixes/suffixes** → captures linguistic units; best results with combined approach.

### 8k. NERC Performance (CoNLL benchmarks)

- Feature-inferring NN models **outperform** feature-engineered models even without domain-specific rules
- Best F1: Yadav et al. 2018 (150 epochs): ~87 Spanish, ~87 Dutch, ~91 English, ~79 German

### 8l. Pre-trained Transformers for NERC

- 768 dimensions, 12 layers/attention heads
- MASK-based pretraining resolves ambiguity ("Apple delayed iPhone 13" vs "Apple with cinnamon")
- Fine-tuned on CoNLL2003 with BIO annotations
- Output: I-PER (0.996), I-ORG (0.999), I-LOC (0.982) — very high confidence

> **Exam tip:** Know the NERC-D/L 4-step pipeline. Know the 6 "hard" challenges. Know BIO labelling. Know BiLSTM+CRF architecture. Know that transformer fine-tuning outperforms hand-crafted features.

---

## 9. Topic Modelling & Text Classification

> Source: tm-ba-lecture-6-topic-modelling.pdf

### 9a. What is a Topic?

A **topic** = main area of interest; can be events, activities, situations, people, organisations, places, or abstract concepts. **No a priori definition; subjective and world-dependent.**

**Genres ≠ Topics:** Genres = conventional styles (tweets, news, blogs, product reviews). Topics = what a document is about.

### 9b. IPTC Media Topics Taxonomy

- 1,200 terms; 4 levels deep; multi-language; continuously updated (e.g. cybercrime added)
- **17 top-level categories:**

| | | |
|---|---|---|
| arts/culture/entertainment/media | conflict/war/peace | crime/law/justice |
| disaster/accident/emergency | economy/business/finance | education |
| environment | health | human interest |
| labour | lifestyle/leisure | politics |
| religion/belief | science/technology | society |
| sport | weather | |

### 9c. Datasets

- **Reuters-21578:** 120 categories (grain, wheat, oilseed, soybean, veg-oil); used for supervised classification
- **JRC-Acquis:** 22 EU official languages; multi-label; uses EuroVoc thesaurus

### 9d. How to Assign Topics

**Option A — Supervised Text Classification:**
- BoW, TF×IDF, LSA (dimensionality reduction), fine-tune LMs
- Multi-label: one-against-all; keyword extraction via TF×IDF
- Workflow: Data acquisition → Dataset → Labelling → Feature construction → Representation → Selection → Train → Evaluate

| Pros | Cons |
|------|------|
| Control over topic set | New topics cannot be detected |
| High performance | Biased to training distribution |
| | Manual maintenance required |

**Option B — Unsupervised Topic Modelling:**
- Clustering on shared word associations
- Label clusters using distinctive TF×IDF keywords

### 9e. LDA-Style Topic Modelling

1. Collect documents with words
2. Create vocabulary (treat words independently)
3. Map words to intrinsic topic representation (word co-assignment)
4. Iteratively increase word-topic relationship → pool document to hidden topic
5. Result: **P(words | topic)** + **P(topics | word)** → contrastive learning on words and documents

**Example hidden topics:**
- Animals: dog, animal, loyal, cat
- Sports: Olympics, corner
- Tech: AI, beat, Dota, players

> **Exam tip:** Know the 17 IPTC top-level categories. Know the difference between supervised and unsupervised topic assignment. Know LDA produces two probability distributions. Know supervised pros/cons.

---

## 10. Fine-tuning Transformers (Practical)

> Source: Fine-tuned-transformer-models.ipynb; Wolf et al. 2020; Church et al. 2021

### 10a. HuggingFace Pipeline API

```python
from transformers import pipeline

# NER (default: dbmdz/bert-large-cased-finetuned-conll03-english)
nerc_classifier = pipeline("ner")

# Sentiment (default: distilbert-base-uncased-finetuned-sst-2-english)
sentiment_classifier = pipeline("sentiment-analysis")

# Multilingual NER
nerc_classifier = pipeline("ner", model="xlm-roberta-large-finetuned-conll03-english")
```

### 10b. Available Task Types

audio-classification, automatic-speech-recognition, conversational, feature-extraction, fill-mask, image-classification, **ner**, question-answering, **sentiment-analysis**, summarization, **text-classification**, text-generation, **token-classification**, translation, **zero-shot-classification**

### 10c. Key Output Properties

- Output per token: `{'entity': 'I-PER', 'score': 0.9959, 'index': 5, 'word': 'Il', 'start': 10, 'end': 12}`
- BERT tokenises sub-word: "Ilia" → ["Il", "##ia"] (WordPiece)
- XLM-RoBERTa uses SentencePiece: "Ilia" → ["▁Ili", "a"]
- Multilingual model handles Dutch ("Vrije Universiteit") → I-ORG with near-perfect score (0.9999)

### 10d. Wolf et al. 2020 Key Points

HuggingFace Transformers library provides a unified API for:
- 10,000+ pre-trained models
- All major architectures (BERT, GPT, T5, RoBERTa, XLM...)
- Works across PyTorch and TensorFlow

### 10e. Church et al. 2021 Key Points

- **Fine-tuning:** train a pre-trained LM on a small labelled dataset for a specific task
- **Inference:** use the fine-tuned model to make predictions on new text
- Cross-validation is not enough — real-world performance requires testing on out-of-domain data
- Fine-tuning changed NLP: no longer need task-specific architectures for each problem

> **Exam tip:** Know what fine-tuning means vs. pre-training. Know that HuggingFace pipeline() provides one-line access to fine-tuned models. Know WordPiece vs SentencePiece tokenization.

---

## Literature Map

| Author/Year | Key Claim | MC Exam Relevance |
|-------------|-----------|-------------------|
| **Maynard et al. 2016** (NLP for Semantic Web ch.2) | Performance decreases as NLP task complexity increases (BoW→events). Two main TM problems: Ambiguity & Variation. | Performance curve; ambiguity types; structural vs lexical |
| **NLTK ch.8** (Analyzing sentence structure) | Formal syntax, parse trees, context-free grammars | Phrase structures, PP-attachment, syntactic ambiguity |
| **NLTK ch.6** (Learning to classify) | Feature-based text classification; Naïve Bayes; decision trees | Classification pipeline; feature selection |
| **J&M ch.4** (Logistic Regression) | LR for text classification; gradient descent; cross-entropy loss | Logistic regression as classifier; sigmoid; softmax |
| **J&M ch.5** (Word Embeddings) | Dense vector representations; Word2Vec; GloVe; semantic relationships | Why embeddings > BoW; king-man+woman=queen |
| **Wolf et al. 2020** (HuggingFace Transformers) | Single library for 10K+ pre-trained transformer models; unified API | pipeline() API; available task types; model naming |
| **Church et al. 2021** (Fine-tuning intro) | Fine-tuning pre-trained LMs achieves SOTA on NLP tasks; cross-validation not the real test | Domain shift; fine-tuning definition; inference |
| **J&M ch.17** (Sequence Labelling: HMM, CRF) | HMMs and CRFs for sequence labelling; Viterbi decoding | CRF for NER; sequence dependencies; IOB |
| **J&M ch.22** (Coreference) | Coreference resolution: find all expressions referring to same entity | Coreference in NERC-D/L pipeline |
| **Yadav & Bethard 2018/2019** (NER survey) | Word+char+affix NN architectures achieve best CoNLL F1; feature-inferring > feature-engineered | Architecture comparison table; affix embeddings |
| **Lample et al. 2016** (Neural Architectures for NER) | BiLSTM-CRF architecture for NER; character embeddings improve performance | BiLSTM+CRF diagram; character-level features |
| **Huang et al. 2015** (BiLSTM-CRF) | Bi-directional LSTM with CRF outperforms previous sequence labelling methods | BiLSTM-CRF architecture; sequence labelling |
| **Nadeau & Sekine 2007** (NERC survey) | Comprehensive feature taxonomy for NERC: word-level, gazetteers, document features | Feature engineering tables; word shape; gazetteers |
| **Ravi & Ravi 2015** (Sentiment survey) | 4-step sentiment analysis pipeline; SVM most used (55/136 papers); 72–92% in-domain accuracy | 4 steps; ML method counts; SVM dominance |
| **Ekman et al. 1976** (Basic emotions) | 6 universal basic emotions: Anger, Disgust, Fear, Happiness, Sadness, Surprise | Which 6 emotions; cross-cultural universality |
| **Plutchik 1980** (Wheel of Emotions) | Emotions vary in intensity and can combine (love = joy + trust) | Wheel structure; intensity; mixtures |
| **Saigal & Khanna 2020** (SVM news classification) | SVM effective for multi-category news text classification | SVM for text classification; feature importance |
| **Churchill & Singh 2021** (Topic modeling survey) | Evolution of topic modeling from LSA to neural LDA variants | Historical context; LDA variants |
| **Vayansky & Kumar 2020** (LDA review) | Review of LDA and its variants; different priors and formulations | LDA variants; probabilistic topic models |
| **Sun et al. 2019** (Fine-tune BERT for classification) | Fine-tuning strategies for BERT on text classification tasks | How to fine-tune; layer freezing; task-specific heads |

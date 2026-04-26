# TM — Quiz Bank (30 MC Questions)

[[TM — Index|← Back to TM Index]]

> 30 questions covering all topics. ≥10 literature-based questions (marked [LIT]).
> Format: stem + 4 options + ✓ correct answer + explanation.

---

## Topic 1 — Introduction & NLP Fundamentals

**Q1.** Which of the following best defines "text mining"?

A) The process of training language models on large corpora
B) The process of converting unstructured text into structured data or knowledge
C) The application of regular expressions to extract named entities
D) Sentiment analysis of social media posts

✓ **B**
*Explanation: Text mining is defined in L1 as "from unstructured text to structured data (information or knowledge)". It encompasses all NLP tasks applied toward knowledge extraction, not just any one technique.*

---

**Q2.** What are the two fundamental problems that affect all Text Mining tasks?

A) Tokenisation and lemmatisation
B) Precision and recall
C) Ambiguity and variation
D) Supervised and unsupervised learning

✓ **C**
*Explanation: L3 and Maynard et al. 2016 identify Ambiguity (one form, multiple meanings) and Variation (multiple forms, one meaning) as the two core challenges for Text Mining.*

---

**Q3.** [LIT] According to Maynard et al. 2016, how does NLP task performance relate to task complexity?

A) Performance increases as tasks become more complex
B) Performance is constant regardless of task complexity
C) Performance decreases as tasks become more complex (from BoW ~90% to events ~30%)
D) Performance only decreases for domain-specific tasks

✓ **C**
*Explanation: Maynard et al. 2016 (Figure 1.3) shows a clear performance decline: Bag-of-Words (simplest) achieves ~90%, entities ~80%, relations ~50%, events ~30%. This is the key figure from that paper.*

---

## Topic 2 — Linguistics Foundations

**Q4.** A language with a forms-to-stems ratio of >200:1 is an example of:

A) A low-resource language
B) A morphologically rich language
C) A language with complex syntax
D) A language with many loanwords

✓ **B**
*Explanation: Finnish and Turkish have >200:1 ratios (e.g. Finnish has 15 noun/adjective cases, 12 pronoun forms, 24 verb forms). English has just 2:1. This matters for NLP: more word forms means sparser training data per word form.*

---

**Q5.** What does Zipf's Law predict about the most frequent words in any text?

A) They tend to be long words with precise meanings
B) They tend to be short, have many different meanings, and make up ~80% of any text
C) They tend to be content words (nouns and verbs)
D) They tend to occur only once in a corpus

✓ **B**
*Explanation: Zipf's Law: f(w) = f(W₁)/rank. Most frequent words (the, of, and, is...) are short, highly polysemous, and make up ~80% of any text. They function as stopwords.*

---

**Q6.** What is the baseline accuracy for POS tagging if you simply choose the most frequent tag for each word?

A) 50%
B) 70%
C) 90%
D) 99%

✓ **C**
*Explanation: L2 states that choosing the prior (most frequent POS tag for each word) already gives ~90% accuracy. This is why POS tagging is considered a relatively easy task — but the remaining 10% are the hard, ambiguous cases.*

---

**Q7.** Which of the following is an example of PP-attachment ambiguity?

A) "John or Mary may win"
B) "Krelis waved at the cow with a hat"
C) "Flying planes can be dangerous"
D) "Hospitals Sued by 7 Foot Doctors"

✓ **B**
*Explanation: PP-attachment ambiguity arises when a prepositional phrase can be attached to different constituents in the parse tree. "With a hat" can modify "cow" (the cow has a hat) or "waved" (Krelis has a hat while waving).*

---

## Topic 3 — NLP Pipeline & Preprocessing

**Q8.** In NLP pipeline architectures, "error propagation" means:

A) Models propagate gradients back through layers during training
B) Errors in early pipeline modules cascade into and degrade later modules
C) Classification errors that occur equally across all classes
D) Evaluation metrics that propagate from the development to the test set

✓ **B**
*Explanation: In a pipeline (tokenisation → POS → entities → syntax), an error in tokenisation affects every subsequent module. L3 shows that propagated cross-folded results are significantly worse than isolated module results.*

---

**Q9.** Which of the following is NOT one of the issues with NLP pipeline architectures?

A) Error propagation across modules
B) Ambiguities with confidence scores not exploited by downstream modules
C) Overfitting due to shared parameters
D) Conflicts between different modules

✓ **C**
*Explanation: L3 lists pipeline issues as: error propagation, ambiguities not exploited (confidence scores ignored), conflicts between modules, and complexity of maintaining interoperable I/O. Shared parameter overfitting is not listed — it's a problem of end-to-end deep learning, not pipelines.*

---

## Topic 4 — Evaluation

**Q10.** For a multi-class text classification task where you want small classes to count equally, which averaging method should you use?

A) Micro-averaging, because it pools all true positives
B) Macro-averaging, because it calculates P/R per class and then averages
C) Weighted averaging, because it weights by class frequency
D) Binary averaging, because it treats all classes as one vs. rest

✓ **B**
*Explanation: Macro-averaging computes precision/recall separately for each class then averages — giving equal weight to each class regardless of size. Micro-averaging pools all instances and favours large classes.*

---

**Q11.** [LIT] According to Church, Chen & Ma 2021, what is the limitation of cross-validation as an evaluation framework?

A) It is computationally too expensive for large datasets
B) It cannot be applied to multi-class problems
C) Cross-validation alone is not the real test — domain shift reveals true generalization
D) It only works for binary classification

✓ **C**
*Explanation: Church et al. 2021 explicitly warn that cross-validation is insufficient. True performance requires testing on out-of-domain data. The NERC Wikinews benchmark shows >20% performance drops when the test domain differs from training.*

---

**Q12.** Which application scenario requires high recall but can tolerate low precision?

A) Spam filter with no false positives
B) Medical records deduplication
C) Tsunami early-warning alert system
D) Financial document retrieval for audits

✓ **C**
*Explanation: L3 Part 2 gives this exact example. Tsunami alerts prioritise recall (never miss a real disaster) and can tolerate false alarms (low precision). Spam filters need high precision (no legitimate emails blocked).*

---

**Q13.** A classifier achieves 99% accuracy on a spam detection task where only 1% of emails are spam. This result is:

A) Excellent — 99% accuracy indicates a highly effective classifier
B) Misleading — a classifier that always predicts "not spam" achieves the same score
C) Acceptable — precision and recall are not needed for this task
D) Problematic only if the test set is different from the training set

✓ **B**
*Explanation: On imbalanced data (99% not spam), a trivial classifier achieves 99% accuracy without ever detecting any spam. Precision and recall are essential to evaluate performance on the minority class.*

---

## Topic 5 — Word Embeddings & Transformers

**Q14.** What is the key advantage of contextual embeddings (e.g. BERT) over static embeddings (e.g. GloVe)?

A) Contextual embeddings have a smaller vocabulary
B) Contextual embeddings produce a different vector per token occurrence, resolving word sense ambiguity
C) Static embeddings require more training data
D) Contextual embeddings can only process single sentences

✓ **B**
*Explanation: GloVe/Word2Vec produce one fixed vector per word type regardless of context. BERT produces a different vector for each token depending on surrounding words — so "Apple" gets different representations in "Apple delayed iPhone 13" vs "Apple with cinnamon".*

---

**Q15.** [LIT] What does the Wolf et al. 2020 HuggingFace Transformers paper provide?

A) A new training algorithm for BERT that is 10× faster
B) A unified API for 10,000+ pre-trained models working across PyTorch and TensorFlow
C) The first implementation of the attention mechanism
D) Benchmarks comparing transformer architectures on CoNLL-2003

✓ **B**
*Explanation: Wolf et al. 2020 introduced the HuggingFace Transformers library as a unified API enabling access to thousands of pre-trained models across architectures (BERT, GPT, T5, RoBERTa) and frameworks.*

---

**Q16.** How does BERT tokenise the name "Ilia" using WordPiece?

A) ["Ilia"] — as a single token
B) ["I", "l", "i", "a"] — character by character
C) ["Il", "##ia"] — split into subword units with ## prefix on continuations
D) ["UNK"] — as an unknown token

✓ **C**
*Explanation: BERT uses WordPiece tokenisation. "Ilia" → ["Il", "##ia"] where ## indicates the sub-word continues from the previous token. XLM-RoBERTa uses SentencePiece: "▁Ili", "a".*

---

## Topic 6 — Sentiment / Subjectivity Mining

**Q17.** Which of the following is the correct definition of a Source Introducing Predicate (SIP)?

A) A pronoun that refers back to a previously mentioned entity
B) A verb that introduces a claim or opinion, such as speech-act or cognitive verbs
C) A preposition that marks the relation between an agent and a target
D) A negation word that reverses the polarity of a sentiment expression

✓ **B**
*Explanation: SIPs are verbs that introduce opinions or claims: speech-act verbs (say, claim, state, deny, confirm) and cognitive verbs (think, believe, feel, hate, like). They mark the link between a holder and their expressed sentiment.*

---

**Q18.** [LIT] According to Ekman et al. 1976, what are the 6 basic emotions?

A) Love, Hate, Joy, Sadness, Fear, Surprise
B) Anger, Disgust, Fear, Happiness, Sadness, Surprise
C) Anger, Joy, Trust, Fear, Sadness, Disgust
D) Happiness, Sadness, Anger, Fear, Anticipation, Surprise

✓ **B**
*Explanation: Ekman et al. 1976 identified 6 cross-culturally universal basic emotions: Anger, Disgust, Fear, Happiness, Sadness, and Surprise. Note: Plutchik 1980 adds Trust and Anticipation in his Wheel of Emotions.*

---

**Q19.** [LIT] According to Ravi & Ravi 2015, which machine learning method was used most often for sentiment analysis?

A) Naïve Bayes (28 articles)
B) Decision trees (31 articles)
C) SVM (55 articles)
D) Deep Belief Architecture (41 articles)

✓ **C**
*Explanation: Ravi & Ravi 2015's survey of 136 papers found SVM was used in 55 papers, making it the most popular method. DBA second (41), NB third (28). In-domain accuracy ranged from 72–92%.*

---

**Q20.** What is "agenda setting" in the context of subjectivity mining?

A) A process for determining which topics appear in a corpus
B) The author's subjective choice of what to mention or omit from a report
C) A technique for identifying the holder of an opinion
D) A method for setting confidence thresholds in opinion classifiers

✓ **B**
*Explanation: Agenda setting refers to the implicit subjectivity in a text caused by the author's choices about what to include or exclude. An author who only reports negative events about a politician is expressing a subjective stance even without explicit opinion words.*

---

**Q21.** The example "'cold' person (negative) ≠ 'cold' soda (positive)" illustrates which problem in sentiment analysis?

A) Domain shift between training and test data
B) Context dependence: the same word has opposite polarity in different contexts
C) Inter-annotator disagreement about subjectivity
D) The inability of SVM to handle polarity inversion

✓ **B**
*Explanation: Context dependence means polarity cannot be determined from a word alone — surrounding context determines it. "Cold" is negative for describing a person's character but positive for describing a refreshing drink.*

---

**Q22.** Which of the following is NOT one of the 5 opinion extraction classification problems defined in L4?

A) Is this text subjective?
B) Who is the holder?
C) What is the stance of the holder toward a debate position?
D) What is the polarity?

✓ **C**
*Explanation: The 5 classification problems are: (1) subjective?, (2) opinion expression?, (3) holder?, (4) target?, (5) polarity?. Stance (toward a debate position) is a related but distinct concept — it is not listed as one of the 5 opinion extraction classification problems.*

---

## Topic 7 — Named Entity Recognition

**Q23.** What does the "B" label in BIO/IOB sequence labelling mean?

A) "Background" — the token is in the background of the entity
B) "Beginning" — the token is the first word of an entity span
C) "Binary" — the token is either an entity or not
D) "Bidirectional" — the token is processed left-to-right and right-to-left

✓ **B**
*Explanation: BIO = Beginning, Inside, Outside. B marks the first token of an entity span. I marks continuation tokens within the span. O marks tokens that are not part of any entity.*

---

**Q24.** [LIT] What was the key architectural contribution of Lample et al. 2016 for NER?

A) The introduction of Conditional Random Fields (CRF) for sequence labelling
B) A BiLSTM + CRF model using character embeddings to capture morpho-syntactic properties
C) A transformer-based model that replaced LSTMs for NER
D) The first use of gazetteers in a neural NER system

✓ **B**
*Explanation: Lample et al. 2016 (NAACL) introduced a BiLSTM + CRF architecture that uses both word-level (GloVe 300D) and character-level embeddings. The character LSTM captures word shape and morphological patterns. CRF models sequence-level dependencies.*

---

**Q25.** [LIT] According to Nadeau & Sekine 2007, word shape features like "Xxx" and "xxxXx" capture which type of information?

A) The syntactic category of a token (noun, verb, adjective)
B) The case pattern of a word (initial cap, all-caps, mixed case) used for entity detection
C) The word's sentiment polarity (positive, negative, neutral)
D) The word's frequency rank in a reference corpus

✓ **B**
*Explanation: Word shape features (Xxx = initial capital, Xxxxxxxxx = all-caps, xxxXx = mixed/camelCase) capture capitalisation patterns that are strong indicators of proper nouns/entities. Short word shapes (Xx, xX) provide compact versions.*

---

**Q26.** "The US decided to intervene" — "US" refers to the US government (organisation), not the geographical USA. This is an example of:

A) Coreference
B) Entity extent ambiguity
C) Metonymy
D) Type ambiguity (fine-grained vs. coarse)

✓ **C**
*Explanation: Metonymy = using the name of one entity to refer to a related entity (e.g. "the White House" meaning the US president, "US" meaning the US government). L5 lists metonymy as one of the 6 challenges for NER.*

---

**Q27.** [LIT] Yadav & Bethard 2018 tested four NN architectures for NER. Which combination achieved the best results?

A) Word-level NN only
B) Character-level NN only
C) Word + Character + Affix embeddings
D) Word + Gazetteer features

✓ **C**
*Explanation: Yadav & Bethard tested word-level, character-level, word+character, and word+character+affix. The word+char+affix combination achieved the best F1 scores (~91% on English CoNLL). Affix = n-gram prefixes/suffixes acting as linguistic units.*

---

## Topic 8 — Topic Modelling

**Q28.** [LIT] What does LDA (Latent Dirichlet Allocation) produce as output?

A) A single topic label per document
B) A ranked list of keywords per document
C) Two probability distributions: P(words|topic) and P(topics|document)
D) A binary classification of documents as relevant or irrelevant

✓ **C**
*Explanation: LDA outputs (1) word distributions per topic (P(words|topic)) — the "topic-word" matrix — and (2) topic distributions per document (P(topics|document)) — the "document-topic" matrix. Both are needed to interpret topics and classify documents.*

---

**Q29.** Which of the following is a disadvantage of supervised text classification for topic assignment?

A) It cannot achieve high accuracy
B) It cannot handle multi-label classification
C) New topics that emerge after training cannot be detected without retraining and relabelling
D) It requires too much computational resources compared to LDA

✓ **C**
*Explanation: Supervised topic classification is biased to its training label set. New topics (e.g. "deepfakes" emerging after model training) are invisible to the model. Unsupervised methods can discover new topics but offer less control.*

---

**Q30.** [LIT] What was the main finding of Sun et al. 2019 regarding BERT for text classification?

A) BERT performs worse than traditional SVM for text classification tasks
B) Pre-training BERT on domain-specific data is always necessary before fine-tuning
C) Fine-tuning BERT with task-specific strategies achieves state-of-the-art results on text classification
D) BERT's performance plateaus after 3 epochs of fine-tuning regardless of dataset size

✓ **C**
*Explanation: Sun et al. 2019 showed that fine-tuning pre-trained BERT — with appropriate strategies such as task-specific pre-training on in-domain data and careful layer selection — achieves SOTA on text classification benchmarks. This established fine-tuning as the dominant paradigm.*

---

## Answer Key

| Q | ✓ | Topic |
|---|---|-------|
| 1 | B | Intro |
| 2 | C | Intro |
| 3 | C | [LIT] Maynard 2016 |
| 4 | B | Linguistics |
| 5 | B | Linguistics / Zipf |
| 6 | C | Linguistics / POS |
| 7 | B | Syntax |
| 8 | B | Pipeline |
| 9 | C | Pipeline |
| 10 | B | Evaluation |
| 11 | C | [LIT] Church 2021 |
| 12 | C | Evaluation |
| 13 | B | Evaluation |
| 14 | B | Embeddings |
| 15 | B | [LIT] Wolf 2020 |
| 16 | C | Transformers |
| 17 | B | Sentiment |
| 18 | B | [LIT] Ekman 1976 |
| 19 | C | [LIT] Ravi 2015 |
| 20 | B | Sentiment |
| 21 | B | Sentiment |
| 22 | C | Sentiment |
| 23 | B | NER |
| 24 | B | [LIT] Lample 2016 |
| 25 | B | [LIT] Nadeau 2007 |
| 26 | C | NER |
| 27 | C | [LIT] Yadav 2018 |
| 28 | C | [LIT] LDA / Topic |
| 29 | C | Topic Modelling |
| 30 | C | [LIT] Sun 2019 |

**Literature-based questions (≥10):** Q3, Q11, Q15, Q18, Q19, Q24, Q25, Q27, Q28, Q30 = 10 literature questions ✓

# Exam 14 — Mixed Topics VII
*35 questions | Correct answer marked with \**

---

**Q1.** The NLP concept of "variation" is illustrated by which example?
- A) "May" functioning as modal verb, proper name, or month
- B) "IBM", "Big Blue", and "International Business Machines" all referring to the same company *
- C) "Bank" meaning financial institution vs. river bank
- D) "Duck" being a noun or a verb

**Q2.** Which of the following morphological processes produces "unhappily" from "happy"?
- A) Inflection only (past tense)
- B) Compounding then inflection
- C) Two derivational steps (happy → unhappy → unhappily) combined with inflection
- D) Two derivational steps: un- + happy → unhappy, then + -ly → unhappily *

**Q3.** A dataset has 3 classes with counts 200, 150, and 50. A classifier always predicts the majority class. Its accuracy is:
- A) 0.33
- B) 0.45
- C) 0.50 *
- D) 0.67

**Q4.** In the scaled dot-product attention formula, what is the purpose of dividing by √d_k before softmax?
- A) To make the attention weights sum to exactly 1
- B) To prevent large dot products from pushing softmax into saturation, causing vanishing gradients *
- C) To normalise the Query and Key matrices independently
- D) To apply dropout during training

**Q5.** In the course, the most accurate description of "implicit sentiment" is:
- A) Sentiment expressed using negation (e.g., "not bad")
- B) Sentiment conveyed through described events or situations without explicit opinion words *
- C) Sentiment from non-native speakers with grammar errors
- D) Sentiment found only in figurative language

**Q6.** In BIO tagging, which sequence is ILLEGAL for the entity "John Smith" (a PERSON)?
- A) B-PER I-PER
- B) O B-PER I-PER
- C) I-PER I-PER *
- D) B-PER I-PER O

**Q7.** Which of the following correctly distinguishes the LDA alpha hyperparameter's effect?
- A) High alpha → each document is concentrated on a few topics; low alpha → documents spread over many topics
- B) Low alpha → each document is concentrated on fewer topics; high alpha → documents spread over many topics *
- C) Alpha controls topic-word sparsity; beta controls document-topic sparsity
- D) Alpha and beta both control the number of topics K

**Q8.** When computing TF-IDF, a word that appears in every single document gets which IDF value?
- A) 1.0 (maximum weight)
- B) log(N/N) = 0 (minimum weight — the word is uninformative) *
- C) The average IDF across the vocabulary
- D) An undefined value (division by zero)

**Q9.** The key advantage of "macro-averaged" evaluation over "micro-averaged" is:
- A) Macro averaging weights common classes more, giving a better overall picture
- B) Macro averaging gives equal weight to every class, preventing dominant classes from masking poor performance on rare classes *
- C) Macro averaging is always higher than micro averaging
- D) Macro averaging is only valid for binary classification

**Q10.** Which of the following is the correct definition of "holonymy"?
- A) A word being a more general category of another word
- B) A word being a part of another word or entity
- C) A word being the whole of which another word is a part *
- D) Two words being synonymous

**Q11.** Which of the following word-shape patterns correctly represents the string "COVID-19"?
- A) Xx
- B) XX-xx
- C) XXXXX-dd *
- D) xXxXx

**Q12.** The "Newsbrief" system at the JRC is described as updating topic-classified news:
- A) Once per day
- B) Every 10 minutes *
- C) Every hour
- D) Once per week

**Q13.** In the context of text mining, "information extraction" differs from "information retrieval" in that:
- A) Information retrieval finds structured facts; information extraction ranks documents by relevance
- B) Information extraction finds and structures specific facts (entities, relations, events) from text; retrieval ranks documents by relevance *
- C) Information retrieval uses NLP; information extraction uses only keyword matching
- D) They are synonymous terms for the same task

**Q14.** The SemEval 2014 Task 4 for ABSA was applied to which specific domains?
- A) Hotels and airlines
- B) Books and electronics
- C) Laptops and restaurants *
- D) Movies and music

**Q15.** In the Lample et al. (2016) BiLSTM-CRF NER model, what is the purpose of character-level CNN/LSTM embeddings?
- A) To replace word-level embeddings entirely
- B) To capture morphological information and word-shape patterns useful for entity detection *
- C) To compute attention weights between token pairs
- D) To perform topic classification before NER

**Q16.** A sentence with a Cohen's Kappa of 0.40 for annotation would be considered:
- A) Almost perfect agreement
- B) Substantial agreement
- C) Moderate agreement *
- D) Poor agreement

**Q17.** The "Pointwise Mutual Information" (PMI) between two words w1 and w2 is defined as:
- A) log[P(w1, w2) / (P(w1) × P(w2))] *
- B) P(w1) + P(w2) - P(w1, w2)
- C) P(w1 | w2) / P(w2 | w1)
- D) log[P(w1) × P(w2)]

**Q18.** In the context of BERT pretraining, approximately what percentage of input tokens are replaced by [MASK]?
- A) 5%
- B) 15% *
- C) 25%
- D) 50%

**Q19.** Which of the following is the most appropriate model for classifying a large corpus of scientific abstracts into 10 predefined research areas?
- A) Unsupervised LDA with K=10 (no labels needed)
- B) Supervised text classification fine-tuning a pretrained BERT on labelled examples *
- C) Dynamic topic model (for temporal evolution)
- D) BERTopic clustering (no predefined categories)

**Q20.** The "AIDA/AGDISTIS" entity linking system is distinguished by its use of:
- A) Surface string matching and word-level similarity to DBpedia entries
- B) Graph-based coherence that jointly disambiguates all entity mentions in a document *
- C) Fine-tuned BERT representations for each entity candidate
- D) A manually curated gazetteer of entity-KB mappings

**Q21.** In a three-class classification problem (A, B, C), a system achieves per-class F1 of 0.80, 0.40, and 0.90. The macro F1 is:
- A) 0.70 *
- B) 0.80
- C) 0.60
- D) 0.75

**Q22.** Which of the following correctly describes the difference between LSA (LSI) and LDA?
- A) LSA uses probabilistic Dirichlet priors; LDA uses matrix factorisation
- B) LSA uses SVD on a word-document matrix producing latent dimensions; LDA uses a generative probabilistic model with interpretable topics *
- C) LSA requires specifying K topics; LDA infers K automatically
- D) They are functionally equivalent with different names

**Q23.** In named entity recognition, the word "van" in "Marijn van der Berg" illustrates:
- A) A gazetteer failure (Dutch particles not in lists)
- B) A tokenisation challenge (particle boundaries)
- C) The problem of lowercase words within proper-name entities, requiring context to classify correctly *
- D) An example of the MISC entity type

**Q24.** Which of the following models uses a "bottleneck" that limits its ability to handle long input sequences?
- A) Transformer with self-attention
- B) BERT (encoder-only)
- C) LSTM encoder-decoder without attention *
- D) BiLSTM-CRF for sequence labelling

**Q25.** According to the course, the main purpose of the development (dev) set in an ML experiment is:
- A) To compute the final published result for comparison with other systems
- B) To provide additional training data when the training set is small
- C) To tune hyperparameters and model design decisions without contaminating the test set *
- D) To compute inter-annotator agreement before annotation begins

**Q26.** Which of the following is a correct statement about "polysemy" vs. "homonymy"?
- A) Polysemy involves different etymological origins; homonymy involves related meanings of the same root
- B) Polysemy involves multiple related meanings of the same word form; homonymy involves unrelated meanings that happen to share the same form *
- C) They are interchangeable terms in modern linguistics
- D) Polysemy only applies to verbs; homonymy only to nouns

**Q27.** In the context of the course, the MPQA (Multi-Perspective Question Answering) corpus is best described as:
- A) A benchmark for topic classification of news articles
- B) An annotated corpus of private-state expressions (opinions, beliefs, sentiments) in news text *
- C) A dataset for named entity linking to Wikipedia
- D) A parallel multilingual corpus for machine translation evaluation

**Q28.** In an LDA model with K=10, how many distributions does the model learn?
- A) 10 document-topic distributions only
- B) 10 topic-word distributions and one document-topic distribution per document *
- C) 10 topic-word distributions and one topic-word distribution shared across all documents
- D) Exactly 20 distributions (10 document-topic + 10 topic-word)

**Q29.** What makes the "Correlated Topic Model" different from standard LDA?
- A) CTM allows the number of topics K to grow with the corpus
- B) CTM uses a logistic-normal distribution instead of the Dirichlet prior, allowing topics to be correlated *
- C) CTM requires author metadata to learn topic distributions
- D) CTM applies SVD instead of Gibbs sampling for inference

**Q30.** A "false positive" in NER evaluation means:
- A) A gold entity that the system failed to predict
- B) An entity the system predicted correctly in both span and type
- C) An entity the system predicted but which does not exist in the gold standard *
- D) An entity the system predicted with the correct span but wrong type

**Q31.** The concept of "error propagation" in NLP pipelines is most severe when:
- A) All modules use the same underlying algorithm
- B) All modules are trained on the same dataset
- C) An early module with low accuracy feeds its noisy output to multiple downstream modules *
- D) The final module is evaluated on a different domain than training

**Q32.** Which of the following describes the ELMo approach to generating word representations?
- A) Training a single LSTM in the left-to-right direction on a language modelling objective
- B) Training a deep bidirectional LSTM on a language model objective and using internal layer representations weighted by downstream task *
- C) Fine-tuning BERT on word similarity benchmarks
- D) Computing static co-occurrence vectors from a large corpus

**Q33.** The "AgNews" dataset, mentioned in the course, contains:
- A) 14 topic classes with ~560,000 examples
- B) 4 topic classes (world, sports, business, technology) with ~120,000 training examples *
- C) Binary sentiment labels for news headlines
- D) Multi-label topic annotations following IPTC taxonomy

**Q34.** In named entity extent decisions, "nested entities" create a challenge because:
- A) Standard IOB/BIO tagging cannot represent entities that contain other entities *
- B) Nested entities always have conflicting entity types
- C) Nested entities require three-word context windows
- D) Standard CRF models cannot process tokens that appear in multiple entities simultaneously

**Q35.** Which of the following claims about XLM-RoBERTa is supported by the course?
- A) It was trained on English text only and generalised to other languages via transfer
- B) It is a monolingual Dutch BERT model
- C) It is a massively multilingual model trained on 100 languages that can be applied to Dutch NER via HuggingFace *
- D) It requires language-specific fine-tuning before any cross-lingual application

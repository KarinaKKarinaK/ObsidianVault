# Exam 3 — Machine Learning for NLP: Evaluation & Representation
*35 questions | Correct answer marked with \**

---

**Q1.** Given TP=50, FP=10, FN=20, compute Precision (to 2 decimals).
- A) 0.71
- B) 0.83 *
- C) 0.67
- D) 0.50

**Q2.** Given TP=50, FP=10, FN=20, compute Recall (to 2 decimals).
- A) 0.63
- B) 0.83
- C) 0.71 *
- D) 0.50

**Q3.** Given Precision=0.83 and Recall=0.71, compute F1 (to 2 decimals).
- A) 0.77 *
- B) 0.72
- C) 0.80
- D) 0.65

**Q4.** A system is evaluated on 100 emails: 20 spam, 80 ham. It classifies 10 as spam (5 correctly). What is the accuracy?
- A) 0.75
- B) 0.80 *
- C) 0.25
- D) 0.50

**Q5.** Using the same scenario (100 emails, 20 spam, 10 classified as spam of which 5 correct), what is the F1 for the spam class?
- A) 0.50
- B) 0.40
- C) 0.33 *
- D) 0.25

**Q6.** In 10-fold cross-validation, the data is:
- A) Randomly split once into 10% train and 90% test
- B) Split into 10 equal parts; each part used as test set in turn while the others form the training set *
- C) Repeated 10 times with the same split but different random initialisations
- D) Used entirely for training, with a separate 10% held out for all tests

**Q7.** The development (validation) set is used for:
- A) Final performance reporting
- B) Building the initial training corpus
- C) Tuning hyperparameters and making modelling decisions without touching the test set *
- D) Computing inter-annotator agreement

**Q8.** Why is accuracy an unreliable metric on imbalanced datasets (e.g., 99% negative, 1% positive)?
- A) Accuracy can only be computed when classes are balanced
- B) A classifier predicting only the majority class scores very high while missing all positives *
- C) Accuracy and F1 are identical on imbalanced data
- D) Precision becomes undefined on imbalanced data

**Q9.** Macro averaging (across 3 classes with per-class F1 of 0.90, 0.70, 0.50) gives a macro F1 of:
- A) 0.70 *
- B) 0.75
- C) 0.80
- D) 0.60

**Q10.** Micro averaging differs from macro averaging in that:
- A) Micro averaging gives equal weight to all classes
- B) Micro averaging pools TPs, FPs, and FNs across classes before computing the metric, weighting frequent classes more *
- C) Micro averaging is only used for binary classification
- D) Micro averaging always gives lower scores than macro

**Q11.** For a NERC system that labels 30 entities, where 24 match the gold (which has 30 entities), the strict F1 is:
- A) 0.80 *
- B) 0.75
- C) 0.73
- D) 0.65

**Q12.** Which representation results in a vector whose length equals the vocabulary size, with most values being zero?
- A) Dense word embedding (word2vec)
- B) One-hot Bag-of-Words *
- C) Mean sentence embedding
- D) Contextual BERT embedding

**Q13.** In a Conditional Random Field (CRF) for sequence labelling, which property makes it superior to independently classifying each token?
- A) CRFs use much larger training datasets
- B) CRFs model dependencies between adjacent output labels, penalising illegal sequences *
- C) CRFs use attention mechanisms
- D) CRFs can only be trained on gold-annotated data

**Q14.** Which evaluation approach is recommended when you want to assess generalisation to unseen domains?
- A) In-domain 10-fold cross-validation
- B) Leave-one-document-out cross-validation
- C) Train on one domain, test on a different domain (cross-domain evaluation) *
- D) Using the training set as the test set

**Q15.** The large performance drop in NERC when tested on out-of-domain data (e.g., trained on Reuters, tested on Wikinews) is primarily caused by:
- A) The test set being too small to draw meaningful conclusions
- B) Differences in vocabulary, entity naming conventions, and entity type distributions between domains *
- C) The IOB label set being incompatible between news corpora
- D) Cross-validation not being applied correctly

**Q16.** The strategy of first maximising recall and then improving precision addresses which two problems respectively?
- A) Ambiguity first, then variation
- B) Overfitting first, then underfitting
- C) Variation and data sparseness first (recall); then ambiguity and feature selection (precision) *
- D) Tokenisation first, then lemmatisation

**Q17.** IOB labels B-ORG, I-ORG, B-PER, I-PER, O are used for:
- A) Document-level topic assignment
- B) Sentence-level sentiment polarity
- C) Token-level sequence labelling for named entities *
- D) Word-level TF-IDF weighting

**Q18.** Which scenario most clearly calls for a classifier with high precision on the positive class?
- A) Tsunami alert: must catch all real events
- B) Cancer screening: missing any cancer is catastrophic
- C) Auto-deleting emails classified as spam: false positives block legitimate mail *
- D) Fraud detection: every suspicious transaction must be flagged

**Q19.** A feature set for NLP classification typically consists of:
- A) Gold labels from the test set
- B) Pixel values of rendered document images
- C) Representations derived from text such as word n-grams, POS tags, and linguistic features *
- D) Raw PDFs with metadata

**Q20.** In the example sequence "American Airlines", a correct CoNLL IOB representation would be:
- A) American=O, Airlines=O
- B) American=B-ORG, Airlines=I-ORG *
- C) American=B-PER, Airlines=I-PER
- D) American=B-LOC, Airlines=I-LOC

**Q21.** An IOB sequence "O I-PER I-PER" is illegal because:
- A) Two I-PER in a row is never allowed
- B) An I-PER cannot begin a span without a preceding B-PER *
- C) "O" must always follow another "O"
- D) PER entities must always contain at least three tokens

**Q22.** Overfitting in a machine learning model is characterised by:
- A) Low training accuracy and low test accuracy
- B) High training accuracy and high test accuracy
- C) High training accuracy but poor generalisation to unseen test data *
- D) Equal training and test accuracy

**Q23.** Which metric adjusts observed agreement between annotators for the level of agreement expected by chance?
- A) Accuracy
- B) F1 score
- C) Cohen's Kappa *
- D) Perplexity

**Q24.** A Cohen's Kappa of 0.65 is typically interpreted as:
- A) Poor agreement
- B) Slight agreement
- C) Moderate agreement
- D) Substantial agreement *

**Q25.** Gold data is distinguished from Bronze data primarily by:
- A) Gold data being used only for testing, Bronze only for training
- B) Gold data being manually annotated by humans; Bronze being automatically labelled *
- C) Gold data being larger than Bronze data
- D) Gold data being monolingual; Bronze being multilingual

**Q26.** In a train/dev/test experimental setup, which set should NEVER be used during model development to tune hyperparameters?
- A) Training set
- B) Development set
- C) Test set *
- D) Validation set (which is the same as the dev set)

**Q27.** Naive Bayes applied to text assumes:
- A) Word order determines the class probability
- B) All words are conditionally independent given the class label *
- C) The most frequent word determines the class
- D) Features must be continuous-valued

**Q28.** Which classifier type is described in the lecture as most commonly used for sentiment classification according to Ravi & Ravi (2015)?
- A) Logistic Regression
- B) Decision Tree
- C) Naive Bayes
- D) Support Vector Machine *

**Q29.** The key advantage of logistic regression over Naive Bayes for text is that:
- A) Logistic regression requires no labelled data
- B) Logistic regression never overfits
- C) Logistic regression is discriminative and handles correlated features without assuming independence *
- D) Logistic regression uses embedding features by default

**Q30.** When a NERC system trained on news articles is applied to clinical notes, the expected outcome is:
- A) Performance identical to news domain
- B) Slight improvement due to domain transfer
- C) Significant performance drop due to vocabulary, entity types, and conventions differing *
- D) The model refuses to process clinical text

**Q31.** Which representation preserves some local word order information that pure unigram BoW loses?
- A) TF-IDF unigrams
- B) Bigrams and trigrams *
- C) Document-level embeddings
- D) One-hot character vectors

**Q32.** The purpose of a confusion matrix (contingency table) is to:
- A) Show the training loss curve over epochs
- B) Display how predicted labels align with gold labels across all classes *
- C) Measure word co-occurrence in a corpus
- D) Compute the TF-IDF weight of each feature

**Q33.** In a 3-class problem with per-class precision 0.42, 0.52, 0.86, the macro precision is:
- A) 0.52
- B) 0.60 *
- C) 0.73
- D) 0.86

**Q34.** In the same 3-class problem, if total TP=268 and total FP=99, the micro precision is approximately:
- A) 0.60
- B) 0.68
- C) 0.73 *
- D) 0.80

**Q35.** Which of the following best describes what features are in an NLP classification system?
- A) The class labels assigned by the model
- B) The raw bytes of the input file
- C) Measurable properties derived from text (word counts, POS tags, syntactic patterns) used as input to the classifier *
- D) The hidden layers of a neural network

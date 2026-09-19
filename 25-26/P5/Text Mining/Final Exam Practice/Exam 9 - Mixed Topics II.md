# Exam 9 — Mixed Topics II
*35 questions | Correct answer marked with \**

---

**Q1.** Which of the following is the correct formula for TF-IDF weight of term t in document d?
- A) TF(t,d) × log(N / df(t)) *
- B) TF(t,d) + log(N × df(t))
- C) log(TF(t,d)) / df(t)
- D) TF(t,d) / (TF(t,d) + df(t))

**Q2.** A language model that assigns probability to a word based solely on the previous word is called a:
- A) Unigram model
- B) Bigram model *
- C) Skip-gram model
- D) CRF model

**Q3.** In BERT's pretraining, the Next Sentence Prediction (NSP) task trains the model to:
- A) Predict the next token autoregressively given all previous tokens
- B) Predict whether sentence B actually follows sentence A in the original text *
- C) Identify named entities in the second sentence
- D) Generate a paraphrase of the input sentence

**Q4.** PP-attachment ambiguity in syntax arises because:
- A) Prepositional phrases can only attach to noun phrases
- B) A prepositional phrase can plausibly modify either the verb phrase or the noun phrase it follows *
- C) Prepositions are never assigned POS tags
- D) Prepositional phrases always create coreference chains

**Q5.** Which of the following is NOT one of Ekman's six basic emotions?
- A) Fear
- B) Disgust
- C) Contempt
- D) Anticipation *

**Q6.** In NER, the word shape feature "xXx" represents:
- A) All lowercase letters
- B) Initial uppercase followed by all lowercase
- C) Mixed case with lowercase, uppercase, and lowercase letters (camelCase style) *
- D) All uppercase letters

**Q7.** In the BERTopic pipeline, what is the role of UMAP?
- A) To train a topic-word distribution using Dirichlet priors
- B) To reduce the dimensionality of sentence embeddings before clustering *
- C) To compute TF-IDF weights over the full corpus
- D) To assign BIO labels to topic-relevant tokens

**Q8.** Macro-averaged F1 across three classes with per-class F1 of 0.60, 0.75, and 0.90 is:
- A) 0.72
- B) 0.75 *
- C) 0.80
- D) 0.68

**Q9.** Which of the following is a key difference between homonymy and polysemy?
- A) Homonymy involves multiple spellings; polysemy involves multiple pronunciations
- B) Polysemy involves historically related, connected senses; homonymy involves historically unrelated meanings sharing the same form *
- C) Homonymy only applies to verbs; polysemy only to nouns
- D) Polysemy is a syntactic phenomenon; homonymy is a pragmatic phenomenon

**Q10.** ABSA (Aspect-Based Sentiment Analysis) requires the system to identify which TWO things?
- A) Document polarity and author identity
- B) Aspect terms/categories and their associated sentiment polarity *
- C) Sentence-level subjectivity and document-level topic
- D) Named entities and their coreference chains

**Q11.** In the CoNLL 2003 strict evaluation, a predicted entity span is counted as a true positive only if:
- A) The entity type is correct, regardless of span boundaries
- B) The span boundaries are correct, regardless of entity type
- C) Both the span boundaries AND the entity type exactly match the gold standard *
- D) At least one token of the span overlaps with the gold entity

**Q12.** The word2vec CBOW (Continuous Bag of Words) model predicts:
- A) The surrounding context words given a target word
- B) A target word given its surrounding context words *
- C) The document topic given a bag of word embeddings
- D) The named entity type given the word's character n-grams

**Q13.** Which property of transformers allows them to handle long-range dependencies better than LSTMs?
- A) Transformer embeddings have higher dimensionality than LSTM hidden states
- B) Self-attention directly connects any two tokens in a sequence regardless of their distance *
- C) Transformers process tokens character by character
- D) Transformers use recurrent connections that propagate information across the entire sequence

**Q14.** "Agenda setting" as a form of subjectivity refers to:
- A) Using emotionally charged vocabulary to express opinions
- B) The strategic selection of which facts to report, implicitly framing interpretation without explicit polarity words *
- C) Assigning sentiment scores to news headlines
- D) Using metonymy to refer to political institutions

**Q15.** Which of the following statements about lemmatisation vs. stemming is correct?
- A) Stemming always produces valid dictionary forms; lemmatisation does not
- B) Lemmatisation uses dictionary lookup and morphological analysis to produce the base form; stemming uses heuristic rules and may produce non-words *
- C) Stemming requires a POS tagger; lemmatisation does not
- D) Both produce identical output for all English words

**Q16.** In entity linking, what challenge do "name ambiguity" cases pose?
- A) The same name refers to different entities (e.g., "Paris" as city, person, or film), requiring context to disambiguate *
- B) Different names for the same entity (e.g., "JFK" and "John F. Kennedy")
- C) Names that cross sentence boundaries
- D) Names that are misspelled in the source text

**Q17.** A Cohen's Kappa of 0.20 indicates:
- A) Almost perfect agreement
- B) Substantial agreement
- C) Moderate agreement
- D) Slight agreement (barely above chance) *

**Q18.** Which of the following is the primary output of the LDA inference process for a new document?
- A) A ranked list of the most likely words in the document
- B) A probability distribution over K topics for that document *
- C) A BIO-labelled sequence of topic spans
- D) The perplexity of the document relative to the corpus

**Q19.** In the scaled dot-product attention formula Attention(Q, K, V) = softmax(QK^T / √d_k)V, what do Q, K, and V represent?
- A) Query, Keyword, and Value matrices derived from the input
- B) Query, Key, and Value matrices, all linear projections of the input *
- C) Quality, Knowledge, and Vocabulary lookup tables
- D) Quantisation, Kernel, and Vector parameters of the CNN

**Q20.** The LIWC (Linguistic Inquiry and Word Count) tool is used for:
- A) Named entity recognition in clinical text
- B) Psycholinguistic text analysis, measuring categories like positive/negative emotion and social processes *
- C) Training word2vec embeddings on large corpora
- D) Computing inter-annotator agreement for annotation tasks

**Q21.** Which of the following is a morphological feature useful for identifying person names in NERC?
- A) The word appearing in a stop-word list
- B) The word ending in suffixes like "-son", "-sen", "-ski", or "-berg" *
- C) The word having a TF-IDF score below the corpus average
- D) The word appearing fewer than 5 times in training

**Q22.** The "agent" semantic role refers to:
- A) The entity that undergoes the action
- B) The entity that volitionally initiates or causes the action *
- C) The endpoint or destination of the action
- D) The instrument used to perform the action

**Q23.** Which approach does DBpedia Spotlight use to link entity mentions to a knowledge base?
- A) Graph-based coherence ranking across all candidate entities
- B) Word-level surface string matching and statistical similarity to DBpedia resource descriptions *
- C) BiLSTM-based disambiguation with character embeddings
- D) Dirichlet allocation to assign entities to topic clusters

**Q24.** In n-gram language models, the "data sparseness" problem means that:
- A) The vocabulary is too small to represent all possible sentences
- B) Many n-grams seen at test time were never observed in training, leading to zero probabilities *
- C) N-gram models require GPU computation for large N
- D) Stop words dominate all n-gram counts

**Q25.** ELMo (Embeddings from Language Models) addresses the limitation of static embeddings by:
- A) Using a larger vocabulary than word2vec
- B) Training a separate embedding for each document
- C) Computing word representations from the internal states of a deep bidirectional LSTM, which are context-dependent *
- D) Fine-tuning on a supervised NER dataset before producing embeddings

**Q26.** Which of the following best describes what "implicit sentiment" means?
- A) Sentiment expressed with direct evaluative adjectives such as "excellent" or "terrible"
- B) Sentiment conveyed through factual descriptions of events or attributes without explicit opinion words *
- C) Sentiment found only in the first sentence of a review
- D) Sentiment that can be detected only by rule-based systems

**Q27.** The SemEval 2014 Task 4 dataset focused on which two domains?
- A) Hotel reviews and Twitter posts
- B) Laptop reviews and restaurant reviews *
- C) Movie reviews and news articles
- D) Medical reports and legal documents

**Q28.** In text classification, "one-hot encoding" of a vocabulary of size V produces:
- A) A dense V-dimensional vector with all non-zero values
- B) A V-dimensional sparse binary vector with exactly one 1 at the word's index *
- C) A 300-dimensional dense embedding for each token
- D) A probability distribution over all V words

**Q29.** The "dynamic topic model" variant of LDA is designed for corpora where:
- A) Documents are very short (e.g., tweets)
- B) Topics evolve over time across different time slices of the corpus *
- C) Author metadata is available for every document
- D) Multiple languages are present in the same corpus

**Q30.** Which argument correctly explains why the Transformer architecture replaced LSTMs for most NLP tasks?
- A) Transformers use less memory than LSTMs during inference
- B) Transformers can be fully parallelised during training (no sequential dependency) and capture long-range context directly *
- C) Transformers produce discrete token predictions; LSTMs produce continuous representations
- D) Transformers require smaller training sets than LSTMs

**Q31.** In pragmatics, a "conversational implicature" occurs when:
- A) The literal meaning of a sentence is identical to its intended meaning
- B) A speaker conveys more than what is literally said, relying on shared context and Gricean maxims *
- C) A pronoun refers to an entity mentioned earlier in the discourse
- D) A sentence has multiple valid parse trees

**Q32.** The precision of a NERC system that predicts 50 entities, of which 35 match the gold standard, is:
- A) 0.70 *
- B) 0.35
- C) 0.65
- D) 0.80

**Q33.** Which of the following correctly describes why "catastrophic forgetting" is a risk during fine-tuning?
- A) The model loses access to its tokenisation vocabulary
- B) Large gradient updates overwrite the general knowledge encoded in pretrained weights *
- C) The loss function becomes undefined for unseen labels
- D) The attention heads deactivate when fine-tuning data is too small

**Q34.** Which of the following is NOT a standard feature type used in classic (pre-neural) NERC feature engineering?
- A) POS tag of the current token
- B) Gazetteer membership (is the word in a list of known person names?)
- C) The document's TF-IDF category label *
- D) Character n-gram prefixes and suffixes of the current token

**Q35.** The hyperparameter K in LDA and the number of clusters in BERTopic both serve which analogous function?
- A) Controlling the sparsity of the topic-word distribution
- B) Determining how many distinct topics the model will discover *
- C) Setting the learning rate for the inference algorithm
- D) Defining the context window size for word co-occurrence

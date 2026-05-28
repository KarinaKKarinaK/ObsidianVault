# Exam 8 — Mixed Topics I
*35 questions | Correct answer marked with \**

---

**Q1.** Which of the following best describes Zipf's Law applied to a corpus?
- A) Every word appears equally often across all documents
- B) The product of a word's rank and its frequency is approximately constant *
- C) Word frequency grows linearly with vocabulary size
- D) Rare words account for less than 5% of total tokens

**Q2.** In morphology, "cliticisation" refers to:
- A) Adding a derivational affix to change a word's POS
- B) Combining two free morphemes to form a compound noun
- C) Attaching a weakly stressed element to an adjacent word (e.g., "I'm", "don't") *
- D) Inflecting a verb for tense or agreement

**Q3.** Given TP=80, FP=20, FN=40, what is the F1 score (to 2 decimals)?
- A) 0.73 *
- B) 0.80
- C) 0.67
- D) 0.61

**Q4.** Which statement about PPMI (Positive PMI) correctly describes how it improves over raw PMI?
- A) PPMI weights rare word pairs more heavily
- B) PPMI replaces all negative PMI values with zero, removing noise from low co-occurrence pairs *
- C) PPMI normalises context vectors to unit length
- D) PPMI uses document frequency instead of context window counts

**Q5.** In the opinion quadruple (Holder, SIP, Sentiment, Target), what is the role of the SIP?
- A) It specifies the intensity of the sentiment (mild vs. strong)
- B) It introduces and attributes the opinion expression to its holder *
- C) It names the entity being evaluated
- D) It marks the polarity reversal caused by negation

**Q6.** Which of the following is the correct IOB label sequence for "New York City" as a single LOCATION entity?
- A) B-LOC, B-LOC, B-LOC
- B) B-LOC, I-LOC, I-LOC *
- C) I-LOC, I-LOC, I-LOC
- D) O, B-LOC, I-LOC

**Q7.** In LDA, the hyperparameter alpha controls:
- A) The number of topics K
- B) The sparsity of the topic-word distribution
- C) The sparsity of the document-topic distribution (low alpha → documents concentrated on few topics) *
- D) The learning rate of Gibbs sampling

**Q8.** BERT uses WordPiece tokenisation. What happens to the word "tokenisation" if it is split into ["token", "##isation"]?
- A) Only "token" gets an embedding; "##isation" is discarded
- B) Both subwords get separate embeddings; the final token representation can be the first subword's output *
- C) The word is replaced by [UNK]
- D) Only the subword with the highest TF-IDF weight is kept

**Q9.** Which statement about the Naive Bayes classifier's conditional independence assumption is TRUE?
- A) It holds exactly in real-world text data
- B) It assumes that each feature is independent of all others given the class label *
- C) It requires continuous-valued features
- D) It is only used when the dataset has more than 10,000 examples

**Q10.** The semantic relation between "tulip" and "plant" is:
- A) Meronymy (tulip is part of a plant)
- B) Antonymy (tulip is the opposite of plant)
- C) Hyponymy (tulip is a kind of plant) *
- D) Holonymy (plant is a part of tulip)

**Q11.** Which of the following is NOT a challenge specific to sentiment analysis?
- A) Context-dependent polarity (e.g., "cold" positive for beer, negative for service)
- B) Figurative language (irony, sarcasm, metaphor)
- C) Recovering the sentence parse tree *
- D) Negation scope (e.g., "not bad" being positive)

**Q12.** The "author-topic model" is an LDA variant that:
- A) Infers topic distributions from sentence length statistics
- B) Models authors as probability distributions over topics, connecting authorship to content *
- C) Assigns a single topic to each author uniformly
- D) Replaces word tokens with author IDs

**Q13.** In a BiLSTM+CRF model for NER (Lample et al. 2016), what is the role of the CRF layer?
- A) It computes character-level embeddings from raw text
- B) It applies dropout regularisation during training
- C) It models dependencies between consecutive output labels, enforcing valid BIO transitions *
- D) It produces the sentence-level classification using the [CLS] token

**Q14.** What does it mean for a topic model to have high "topic diversity"?
- A) The model assigns every document to a different topic
- B) The top keywords of each topic are largely distinct from those of other topics *
- C) The model produces more topics than documents
- D) Alpha is set to a high value, producing diffuse topic distributions

**Q15.** TF-IDF upweights terms that are:
- A) Frequent everywhere in the corpus (low IDF) but rare in a document
- B) Frequent in a document but rare across the corpus (high IDF) *
- C) Stop words appearing in every document
- D) OOV terms not seen in training

**Q16.** Which evaluation measure is specifically designed to correct for chance agreement between annotators?
- A) Micro F1
- B) Accuracy
- C) Cohen's Kappa *
- D) Perplexity

**Q17.** The "Goal" semantic role is best illustrated by:
- A) "John" in "John broke the window" (initiator)
- B) "the window" in "John broke the window" (affected entity)
- C) "London" in "She sent the package to London" (endpoint/destination) *
- D) "the hammer" in "He hit the nail with the hammer" (means)

**Q18.** In word2vec skip-gram training, "negative sampling" means:
- A) Removing negative-sentiment words from the training corpus
- B) Randomly sampling non-context words as negative examples to contrast against true context pairs *
- C) Applying a negative TF-IDF weight to stop words
- D) Discarding training examples where the target word is negated

**Q19.** Chunking is best described as:
- A) Full recursive constituency parsing producing a complete parse tree
- B) Dependency parsing assigning head-dependent relations
- C) Flat, non-overlapping segmentation of text into basic phrase types (NP, VP, PP) *
- D) Sentence splitting based on punctuation heuristics

**Q20.** Cross-entropy fine-tuning of BERT for sequence classification adds which component on top of the transformer stack?
- A) A CRF layer over all token outputs
- B) A softmax classification head on the [CLS] token representation *
- C) A separate LSTM encoder for the input sequence
- D) A bag-of-embeddings pooling layer

**Q21.** "Spurious" and "missing" are two error types in NER evaluation. Which pairing is correct?
- A) Spurious = wrong type; missing = wrong boundary
- B) Spurious = system predicts entity not in gold; missing = gold entity not predicted by system *
- C) Spurious = boundary error; missing = type error
- D) Spurious = entity in training but not test; missing = entity in test but not training

**Q22.** Which property makes SVMs effective for high-dimensional text classification?
- A) They require fewer training examples than Naive Bayes
- B) They model joint probabilities of features and labels
- C) They find a maximum-margin hyperplane, generalising well even in sparse high-dimensional spaces *
- D) They automatically select the most relevant n-gram features

**Q23.** Which statement about GloVe compared to word2vec is accurate?
- A) GloVe uses a local context window exclusively; word2vec uses global co-occurrence statistics
- B) GloVe trains on global word-word co-occurrence matrices; word2vec trains on local context predictions *
- C) GloVe produces context-sensitive embeddings; word2vec produces static embeddings
- D) GloVe requires fine-tuning on a downstream task; word2vec does not

**Q24.** The "plate notation" in LDA represents:
- A) The data flow in a neural network's forward pass
- B) A graphical model showing repeated variables (plates) for documents and words, and latent topic variables *
- C) The confusion matrix of topic assignments
- D) The BIO label sequence for topic-relevant spans

**Q25.** Which NLP task is most directly harmed by poor sentence splitting?
- A) Word-level POS tagging
- B) Any downstream task that relies on sentence boundaries (e.g., parsing, relation extraction) *
- C) Character n-gram computation
- D) TF-IDF weighting of individual words

**Q26.** "Holonymy" is the inverse of meronymy. Which example illustrates holonymy?
- A) "finger" → "hand" (finger is a part of hand) — holonymy for "hand" *
- B) "tulip" → "flower" (tulip is a type of flower)
- C) "hot" → "cold" (antonyms)
- D) "buy" → "purchase" (near-synonyms)

**Q27.** According to VADER's design, what characteristic makes it suitable for social media?
- A) It was trained on biomedical text corpora
- B) It handles emoji, slang, ALL CAPS intensification, and punctuation-based sentiment cues *
- C) It uses a large bidirectional LSTM
- D) It performs aspect-level sentiment classification by default

**Q28.** In multi-label text classification with one-vs-rest, how many binary classifiers are trained for a taxonomy with 100 labels?
- A) 1
- B) 10
- C) 50
- D) 100 *

**Q29.** The IMDb dataset is used in text classification research for:
- A) Named entity linking across movie titles
- B) Topic classification of Wikipedia articles
- C) Binary sentiment classification of movie reviews *
- D) Multi-label classification of news into IPTC categories

**Q30.** When a NERC system is trained on newswire text and evaluated on social media tweets, what performance effect is typically observed and why?
- A) Performance improves because social media contains simpler entities
- B) Performance drops significantly due to different capitalisation conventions, informal writing, and novel entity types *
- C) Performance is unchanged because BERT handles all domains equally
- D) Performance improves because tweets are shorter and easier to parse

**Q31.** Which of the following is an example of derivational morphology creating a new POS?
- A) "dogs" (noun → noun plural)
- B) "walked" (verb → verb past tense)
- C) "digitise" (noun "digit" → verb) *
- D) "running" (verb → verb present participle)

**Q32.** In the Transformer architecture, "multi-head attention" with H heads means:
- A) The model runs H separate forward passes and averages their outputs
- B) The model applies H independent attention functions in parallel, concatenating their outputs *
- C) Only H tokens in the sequence attend to each other
- D) H separate vocabulary embeddings are learned

**Q33.** Which of the following best describes "silver data" in NLP annotation?
- A) Data annotated by two independent expert annotators with high agreement
- B) Automatically labelled data (e.g., by a classifier or heuristic) without human verification *
- C) Data annotated by crowdworkers with inter-annotator agreement measured by kappa
- D) A held-out test set used only once for final evaluation

**Q34.** The LDA hyperparameter beta (β) controls:
- A) The document-topic distribution sparsity
- B) The topic-word distribution sparsity (lower beta → each topic uses fewer words) *
- C) The number of Gibbs sampling iterations
- D) The learning rate for the topic model

**Q35.** Why is the "conditional random field" (CRF) preferred over a simple maximum entropy classifier for NER sequence labelling?
- A) CRFs require less labelled data
- B) CRFs model the joint probability of the entire label sequence, enabling global constraints *
- C) CRFs automatically extract features from raw text
- D) CRFs run faster than maximum entropy classifiers at inference time

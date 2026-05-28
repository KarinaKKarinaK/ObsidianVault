# Exam 7 — Topic Modelling, Text Classification & Advanced Transformers
*35 questions | Correct answer marked with \**

---

**Q1.** According to the course, topics are NOT the same as genres. Which statement correctly distinguishes them?
- A) Topics are file formats; genres are document styles
- B) Genres are communicative forms (tweets, news, books); topics are what the content is about (politics, sport, health) *
- C) Genres are supervised categories; topics are always unsupervised
- D) Topics are BIO sequences; genres are document classes

**Q2.** The IPTC Media Topics taxonomy contains approximately:
- A) 100 terms at 2 levels
- B) 600 terms at 3 levels
- C) 1,200 terms at 4 levels *
- D) 5,000 terms at 6 levels

**Q3.** The Reuters-21578 dataset reflects financial news bias because:
- A) It covers only sport and entertainment
- B) Its most frequent categories are earn, acq, money-fx, grain, and crude *
- C) All documents have exactly one topic label
- D) It uses IPTC codes for all 17 top-level topics

**Q4.** Latent Semantic Analysis (LSA) reduces the document-word matrix using:
- A) Dirichlet-distributed priors over topics
- B) Gibbs sampling
- C) Singular Value Decomposition (SVD) *
- D) Gradient descent on a softmax classifier

**Q5.** In LDA, the number of topics K must be:
- A) Automatically inferred from the data without any prior setting
- B) Set to the number of documents in the corpus
- C) Set to the vocabulary size
- D) Specified in advance by the researcher *

**Q6.** LDA is described as a "generative" model because:
- A) It generates new documents for data augmentation
- B) It provides a probabilistic story for how documents are generated from latent topics and topic-word distributions *
- C) It uses gradient-based generation like GPT
- D) It generates BIO labels for entity detection

**Q7.** In LDA's document-topic matrix, each row represents:
- A) A word's probability distribution over topics
- B) A document's probability distribution over K topics *
- C) A topic's probability distribution over vocabulary words
- D) A cluster label for each document

**Q8.** In LDA's topic-word matrix, each row represents:
- A) A document's probability distribution over topics
- B) A word's co-occurrence count with other words
- C) A topic's probability distribution over vocabulary words *
- D) A TF-IDF weight for each word

**Q9.** A key limitation of LDA is that words are treated as independent of each other (bag-of-words). This causes problems such as:
- A) LDA cannot be run more than once
- B) Topics being computed deterministically
- C) "Queen's gambit" and "queen's throne" sharing the word "queen" without distinguishing semantic drift across documents *
- D) LDA requiring GPU computation

**Q10.** The Correlated Topic Model (CTM) was developed to address which LDA limitation?
- A) Fixed number of topics K
- B) Random initialisation
- C) Topics being modelled as independent of each other (CTM models co-variance between topics) *
- D) Bag-of-words assumption

**Q11.** The decision tree for selecting a topic model (Vayanski & Kumar 2020) recommends Latent Dirichlet Allocation when:
- A) Documents are very short (< 50 words) and complex topic relationships are needed
- B) Documents are long (≥ 50 words) and complex topic relationships are NOT the primary interest *
- C) Only temporal patterns are needed
- D) Author information is available

**Q12.** Perplexity as a topic model evaluation metric measures:
- A) How well annotators agree on topic labels
- B) The proportion of words correctly classified into topics
- C) How well the model predicts held-out documents (lower = better fit) *
- D) The number of unique words in each topic

**Q13.** Pointwise Mutual Information (PMI) as a topic coherence measure evaluates:
- A) Whether word co-occurrence in a topic is higher than expected by chance *
- B) The recall of topics against a ground truth taxonomy
- C) The document-level accuracy of topic assignment
- D) The inter-annotator agreement on topic labels

**Q14.** Topic diversity in cluster evaluation means:
- A) That the model produces many topics
- B) The proportion of words that are unique to a topic and do not appear in other topics *
- C) The number of documents per cluster
- D) The F1 score of topic classification against IPTC labels

**Q15.** Supervised text classification has which advantage over unsupervised topic modelling?
- A) It can detect topics never seen before
- B) It requires no labelled data
- C) It gives the developer control over the predefined topic set and typically achieves high performance *
- D) It always produces stable, deterministic results

**Q16.** A disadvantage of supervised topic classification is that:
- A) Topics are always too fine-grained
- B) It cannot use TF-IDF features
- C) It is biased toward the training distribution and cannot detect genuinely new topics without retraining *
- D) It never achieves more than 70% accuracy

**Q17.** EuroVoc is described in the course as:
- A) A sentiment lexicon for European languages
- B) A European thesaurus of topics used to label JRC-Acquis multilingual legislative texts *
- C) A BERT model fine-tuned on EU parliamentary debates
- D) A named entity gazetteer for European countries

**Q18.** One-against-all (one-vs-rest) classification is the typical approach for multi-label topic classification because:
- A) It trains a single classifier that outputs one topic per document
- B) It trains one binary classifier per label, allowing any subset of labels to be predicted *
- C) It uses the LDA topic distribution as soft multi-label output
- D) It requires that documents have exactly two topics

**Q19.** BERTopic (Grootendorst 2020) combines pretrained transformer representations with:
- A) Supervised fine-tuning on IPTC labels
- B) Clustering of sentence embeddings followed by TF/ClusterFrequency keyword extraction *
- C) Gibbs sampling from a Dirichlet prior
- D) BIO-sequence labelling for topic spans

**Q20.** According to Sun et al. (2020), which BERT fine-tuning strategy typically gives the best text classification performance?
- A) Fine-tuning only the top layer
- B) Fine-tuning with a very high learning rate (>1e-3)
- C) Further pretraining on in-domain/task data (ITPT) then fine-tuning on the target task (BERT-CDPT-FiT) *
- D) Freezing all BERT layers and only training a linear classifier

**Q21.** The Sun et al. (2020) study on BERT fine-tuning for text classification found that for BERT layers:
- A) Lower layers are most useful for text classification
- B) The last (top) layer or last 4 layers are most useful for classification, as they encode semantic information *
- C) All 12 layers are equally useful
- D) Only layers 1-3 should be used for topic classification

**Q22.** Which text classification dataset in the course has 14 topic classes and approximately 560,000 training examples?
- A) IMDb
- B) TREC
- C) AG's News
- D) DBPedia *

**Q23.** The Newsbrief system at the European Joint Research Centre is notable for:
- A) Providing real-time topic-classified news articles updated every 10 minutes *
- B) Being the primary training corpus for BERT
- C) Classifying named entities across 22 languages
- D) Automatically generating Wikipedia summaries

**Q24.** Which factor does Churchill & Singh (2021) list as important when choosing a topic model?
- A) The asymptotic complexity of the inference algorithm
- B) The programming language used for implementation
- C) Document length (phrases, sentences, paragraphs, pages) *
- D) The number of annotators who labelled the data

**Q25.** Dynamic topic modelling is appropriate when:
- A) Documents are all very short
- B) Topics are assumed to be stable over time
- C) Author information is available and corpus is small
- D) Topics change continuously over time and temporal patterns are of interest *

**Q26.** Short-text topic models address which specific challenge of standard LDA?
- A) Fixed K
- B) Random initialisation
- C) Insufficient co-occurrence information in very short texts (each message has few words to vote on topic) *
- D) The bag-of-words assumption

**Q27.** The National Science Agenda (NWO Wetenschapsagenda) example in the course illustrates:
- A) Supervised classification of 1,200 IPTC categories
- B) Hierarchical clustering of 11K public research questions with term extraction and word clouds *
- C) Fine-tuning BERT on scientific abstracts
- D) NERC applied to Dutch academic texts

**Q28.** An LDA model with K=5 on a document containing 100 words produces:
- A) One topic label for the entire document
- B) 100 individual topic labels (one per word)
- C) A distribution over 5 topics for the document AND a distribution over vocabulary words for each topic *
- D) 5 BIO-labelled spans in the document

**Q29.** Why does increasing K (number of topics) in LDA not always improve results?
- A) More topics always means lower perplexity, which is always better
- B) After an optimal K, topics become fragmented, redundant, and harder to interpret *
- C) LDA can only handle up to 20 topics efficiently
- D) More topics cause the Dirichlet prior to become undefined

**Q30.** The Hierarchical LDA variant addresses which limitation of standard LDA?
- A) Random initialisation instability
- B) The bag-of-words assumption
- C) The need to specify K in advance (it uses a directed graph of topics to infer a hierarchy) *
- D) The inability to handle short texts

**Q31.** According to the course, LSI (Latent Semantic Indexing) is a matrix-factorisation approach that:
- A) Uses Dirichlet priors and Gibbs sampling
- B) Applies SVD to group words with similar distributional patterns (e.g., chess piece vocabulary) *
- C) Generates text via a decoder
- D) Performs BIO tagging for topic-relevant terms

**Q32.** In the context of topic classification, "topic granularity" refers to:
- A) The resolution of the input text (sentence vs. document)
- B) The level of specificity of the topic categories, which should match the application's needs *
- C) The number of annotators who labelled the data
- D) The hyperparameter alpha in LDA

**Q33.** Which of the following is the correct call in the course for running a default HuggingFace NER pipeline (which defaults to BERT-large fine-tuned on CoNLL 2003)?
- A) `pipeline("ner", model="distilbert-base-uncased")`
- B) `pipeline("sentiment-analysis")`
- C) `pipeline("ner")` *
- D) `pipeline("token-classification", model="gpt2")`

**Q34.** A key insight from the course about multi-task fine-tuning of transformers (Sun et al. 2020) is that:
- A) Multi-task fine-tuning always dramatically outperforms single-task fine-tuning
- B) Multi-task fine-tuning is mutually exclusive with within-task pretraining
- C) Multi-task fine-tuning helps only marginally over single-task fine-tuning in many settings *
- D) Multi-task fine-tuning eliminates the need for labelled data

**Q35.** Which statement most accurately summarises the BERTopic workflow?
- A) Tokenise text → train LDA → assign topics by word probability → evaluate with kappa
- B) Encode text with a sentence transformer → cluster representations → extract distinctive keywords per cluster → label topics *
- C) Fine-tune BERT on IPTC labels → predict a single topic per document → evaluate with accuracy
- D) Apply SVD to document-word matrix → extract latent factors → assign documents to largest factor

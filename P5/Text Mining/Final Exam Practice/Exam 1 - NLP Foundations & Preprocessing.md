# Exam 1 — NLP Foundations & Preprocessing
*35 questions | Correct answer marked with \**

---

**Q1.** Which of the following best defines the task of text mining?
- A) Ranking documents by relevance to a query
- B) Converting unstructured text into structured information or knowledge *
- C) Translating text between natural languages
- D) Compressing text files for storage

**Q2.** In the NLP pipeline, which layer comes immediately after tokenisation?
- A) Pragmatic analysis
- B) Semantic analysis
- C) Lexical analysis *
- D) Coreference resolution

**Q3.** Error propagation in NLP pipelines means:
- A) Grammar errors in source text slow down processing
- B) A mistake in one module can degrade the output of all subsequent modules *
- C) Models trained on one domain fail on another
- D) Annotators propagate disagreements to the gold standard

**Q4.** Which of the following is NOT a tokenisation challenge?
- A) Hyphens in compound words like "state-of-the-art"
- B) Currency symbols like "$523.45"
- C) Whether to lemmatise words *
- D) Abbreviations like "Dr." that resemble sentence endings

**Q5.** The sentence "I saw her duck" is an example of:
- A) Variation — two spellings of the same word
- B) Coreference — "her" refers to a person mentioned before
- C) Syntactic/lexical ambiguity — "duck" can be verb or noun *
- D) Metonymy — "duck" refers to a restaurant

**Q6.** Which NLP toolkit is described in the course as faster and more suitable for industrial use?
- A) NLTK
- B) HuggingFace Datasets
- C) spaCy *
- D) scikit-learn

**Q7.** The phrase "Bol.com" poses a problem primarily for which NLP task?
- A) Named entity classification
- B) Sentence splitting *
- C) Topic modelling
- D) Coreference resolution

**Q8.** In traditional NLP pipelines, why is passing only the single best output between modules problematic?
- A) It violates copyright on linguistic data
- B) It prevents modules from considering uncertainty from previous steps *
- C) It requires all modules to use the same programming language
- D) It forces all modules to use rule-based approaches

**Q9.** Which of the following correctly characterises ambiguity as opposed to variation?
- A) Ambiguity = multiple forms for one meaning; variation = one form with multiple meanings
- B) Ambiguity = one form with multiple possible interpretations; variation = multiple forms for the same meaning *
- C) Ambiguity only occurs in spoken language; variation only in written language
- D) Ambiguity is solved by tokenisation; variation by lemmatisation

**Q10.** According to Zipf's Law, as a word's rank increases:
- A) Its frequency increases proportionally
- B) Its frequency stays constant across all ranks
- C) Its frequency decreases roughly proportionally *
- D) Its frequency becomes unpredictable

**Q11.** Which of the following is a defining property of the Bag-of-Words representation?
- A) It captures word order and syntactic dependencies
- B) It uses dense 300-dimensional vectors
- C) It represents documents by word counts, ignoring word order *
- D) It requires a pre-trained language model

**Q12.** Sentence splitting is particularly challenging when encountering:
- A) Function words like "the" and "of"
- B) Named entities of type PERSON
- C) Decimal numbers like "3.14" that contain periods *
- D) Words with more than five syllables

**Q13.** The number of tokens in "the Jelly Bean and Ice Cream Sandwich operating systems" is:
- A) 7
- B) 8
- C) 9 *
- D) 10

**Q14.** Which of the following describes a use case where high recall is prioritised over precision?
- A) Spam deletion from an inbox (spam is auto-deleted permanently)
- B) Tsunami alert system (must not miss any real tsunami) *
- C) Search engine result ranking
- D) Autocorrect suggestions in a word processor

**Q15.** The NLP pipeline layer concerned with identifying who said what to whom is:
- A) Morphological analysis
- B) Lexical analysis
- C) Syntactic analysis
- D) Pragmatic analysis *

**Q16.** Which encoding issue can cause problems during tokenisation?
- A) Using lemmatisation before POS tagging
- B) Non-UTF-8 characters that split incorrectly across byte boundaries *
- C) Words appearing more than 100 times
- D) Stop words overlapping with open-class words

**Q17.** In a medical NLP pipeline, section detection and document-format conversion are needed before linguistic analysis because:
- A) They replace all later NLP modules
- B) They calculate precision and recall automatically
- C) They convert PDF/HTML structure into usable text so linguistic modules receive correct content *
- D) They create gold labels automatically

**Q18.** Which of the following is an example of metonymy?
- A) "Time is money" (mapping time onto financial concepts)
- B) "The Kremlin announced new sanctions" (using building to refer to government) *
- C) "cold person" being negative while "cold soda" is positive
- D) "IBM" and "Big Blue" referring to the same company

**Q19.** The acronym "NLP" in the course stands for:
- A) Natural Linguistic Processing
- B) Neural Language Programming
- C) Natural Language Processing *
- D) Normalised Lexical Parsing

**Q20.** Which statement about NLTK is most consistent with the course materials?
- A) NLTK is the fastest toolkit for industrial NLP deployment
- B) NLTK is primarily a deep learning framework
- C) NLTK is well-documented and often used for teaching NLP *
- D) NLTK focuses exclusively on named entity recognition

**Q21.** The phrase "Save data up in the cloud" is described in the lectures as an example of:
- A) Metonymy
- B) Metaphor *
- C) Hyponymy
- D) Variation

**Q22.** Which layer of the NLP pipeline is responsible for tasks such as coreference resolution and discourse structure?
- A) Lexical analysis
- B) Syntactic analysis
- C) Morphological analysis
- D) Semantic and pragmatic analysis *

**Q23.** Which preprocessing step converts "running" → "run" using dictionary and POS information?
- A) Stemming
- B) Stop-word removal
- C) Lemmatisation *
- D) Chunking

**Q24.** A POS tagger assigns "NN" to "bank" when the intended meaning is "riverbank" but "NN" is also correct for "financial bank". This is an example of:
- A) Variation
- B) Error propagation
- C) Ambiguity (one form, multiple senses both of the same POS) *
- D) Domain shift

**Q25.** The statement "the chicken produced an egg" and "the egg produced a chicken" demonstrate:
- A) That Bag-of-Words is sufficient for all classification tasks
- B) That word order matters for meaning and BoW loses it *
- C) That n-grams cannot capture sequential information
- D) That named entities must be detected before sentiment

**Q26.** Which characteristic is shared by all NLP pipelines regardless of task?
- A) They all use transformers
- B) They all perform some form of tokenisation or text segmentation as an early step *
- C) They all require gold-annotated training data
- D) They all process one sentence at a time

**Q27.** "The three pizzas still need to pay" is an example of:
- A) Metaphor
- B) Polysemy
- C) Metonymy (pizzas stand for the people who ordered them) *
- D) Structural ambiguity

**Q28.** Which distinction is drawn in Lecture 1 between NLP and text mining?
- A) NLP is always unsupervised; text mining is always supervised
- B) NLP builds language-processing modules; text mining uses them to extract structured knowledge *
- C) NLP deals with speech; text mining deals with written text only
- D) NLP produces summaries; text mining produces translations

**Q29.** Which of the following is a key challenge for sentence splitting when dealing with abbreviations?
- A) Abbreviations always end sentences
- B) Abbreviations like "Dr." end with a period that may or may not signal a sentence boundary *
- C) Abbreviations are never followed by proper nouns
- D) Abbreviations must always be expanded before sentence splitting

**Q30.** In a traditional NLP pipeline, which module is typically placed LAST?
- A) Tokenisation
- B) POS tagging
- C) Sentiment or pragmatic analysis *
- D) Sentence splitting

**Q31.** According to the course, data sparseness is primarily a problem because:
- A) Large corpora are expensive to store
- B) Rare words or expressions may not appear in training data, making it hard to generalise *
- C) POS taggers fail on common words
- D) Sentence splitters cannot handle long documents

**Q32.** Which of the following illustrates the concept of variation in the context of named entity recognition?
- A) "Apple" can mean either a company or a fruit
- B) "US", "United States", "America", and "The States" all refer to the same country *
- C) "Bank" can be a financial institution or a river bank
- D) "may" can be a modal verb, a name, or a month

**Q33.** Which module in an NLP pipeline is most directly responsible for identifying that "he" in sentence 2 refers to "Lincoln" introduced in sentence 1?
- A) POS tagger
- B) Named entity recogniser
- C) Coreference resolver *
- D) Sentence splitter

**Q34.** The phrase "state-of-the-art" is problematic for tokenisers because:
- A) It contains illegal characters
- B) Different tokenisers make different decisions about whether to split on hyphens *
- C) It is always treated as four separate tokens
- D) It cannot be lemmatised

**Q35.** Which of the following best describes what distinguishes computational linguistics from text mining?
- A) Computational linguistics is applied to industry; text mining is theoretical
- B) Computational linguistics studies algorithms and models of language; text mining applies NLP tools to extract structured information *
- C) Computational linguistics uses neural networks; text mining uses rules
- D) They are synonyms — no distinction is made in the course

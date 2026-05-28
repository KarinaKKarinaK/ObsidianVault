# Exam 11 — Mixed Topics IV
*35 questions | Correct answer marked with \**

---

**Q1.** In the NLP pipeline, which layer directly follows morphological analysis?
- A) Pragmatic analysis
- B) Lexical analysis (POS tagging) *
- C) Coreference resolution
- D) Sentence splitting

**Q2.** The compound word "sunflower" is formed via:
- A) Inflection
- B) Cliticisation
- C) Derivation (adding an affix)
- D) Compounding (two free morphemes combined) *

**Q3.** In 10-fold cross-validation on a dataset of 1,000 examples, how many training examples are used in each fold?
- A) 100
- B) 500
- C) 900 *
- D) 1,000

**Q4.** The "skip-gram" model in word2vec predicts:
- A) A target word given its context words
- B) Context words surrounding a given target word *
- C) The next sentence given the current sentence
- D) The document topic given all word embeddings

**Q5.** In aspect-based sentiment analysis, an "aspect category" differs from an "aspect term" in that:
- A) Aspect categories are surface strings found in the text; aspect terms are abstract categories
- B) Aspect categories are abstract attributes (e.g., FOOD#QUALITY); aspect terms are specific text spans (e.g., "pasta") *
- C) Aspect terms are used in SemEval 2014; aspect categories only in SemEval 2016
- D) Aspect categories are always positive; aspect terms can be positive or negative

**Q6.** Which of the following best characterises the "IOB2" (also called "BIO") tagging scheme?
- A) Every entity token is tagged B-TYPE regardless of position
- B) The first token of every entity span is tagged B-TYPE; subsequent tokens of the same entity are I-TYPE; non-entity tokens are O *
- C) The last token of an entity is tagged E-TYPE; all others are I-TYPE
- D) Entity tokens are tagged with their type only (no positional B/I distinction)

**Q7.** The Correlated Topic Model (CTM) uses which distribution instead of the Dirichlet prior in LDA?
- A) Gaussian distribution
- B) Logistic Normal distribution (to capture topic correlations) *
- C) Multinomial distribution
- D) Bernoulli distribution

**Q8.** In the Transformer's self-attention, the "Value" matrix V is used to:
- A) Compute the similarity scores between query and key vectors
- B) Produce the weighted sum of content representations to form the output *
- C) Store the absolute positions of tokens
- D) Mask future tokens in autoregressive decoding

**Q9.** Which of the following is a correct statement about the "Bing Liu opinion lexicon"?
- A) It is a psycholinguistic resource covering 80+ categories including social processes
- B) It contains several thousand positive and negative English opinion words used as a seed lexicon for sentiment *
- C) It maps words to eight Plutchik emotion categories
- D) It was specifically designed for Dutch sentiment analysis

**Q10.** What is the key limitation of the fixed context vector in the LSTM encoder-decoder (seq2seq) architecture without attention?
- A) LSTMs cannot process sequences longer than 10 tokens
- B) The entire input sequence must be compressed into a single fixed-size vector, which becomes a bottleneck for long inputs *
- C) The decoder cannot generate tokens at the same length as the input
- D) LSTM hidden states cannot be used for cross-lingual tasks

**Q11.** In NER, which error type occurs when the system identifies "European Commission" but the gold standard is "the European Commission" (with "the")?
- A) Spurious entity (false positive)
- B) Missing entity (false negative)
- C) Type error (wrong entity type)
- D) Boundary error (wrong span) *

**Q12.** Which of the following is a "cognitive" SIP (Source-Introducing Predicate) verb?
- A) "announce"
- B) "claim"
- C) "believe" *
- D) "confirm"

**Q13.** In the LDA generative story, which step is performed FIRST when generating a document?
- A) Sample words from a topic-word distribution
- B) Choose a document-length from a Poisson distribution
- C) Sample a topic distribution for the document from a Dirichlet prior *
- D) Assign BIO labels to topic-relevant tokens

**Q14.** What is "topic coherence" as measured by PMI?
- A) The proportion of documents that can be assigned to a single dominant topic
- B) How consistently the top keywords of a topic co-occur in the corpus, indicating a meaningful theme *
- C) The inter-annotator agreement on topic labels
- D) The perplexity of held-out documents given the topic model

**Q15.** Which of the following is NOT a valid application described in the course for NER and entity linking?
- A) Populating a knowledge graph from news articles
- B) Answering factoid questions using named entity disambiguation
- C) Generating word embeddings from character n-grams *
- D) Identifying companies and locations in financial reports

**Q16.** In the context of feature engineering for NLP classification, n-grams capture:
- A) The global co-occurrence statistics of words in a corpus
- B) Local sequential patterns by treating sequences of n consecutive tokens as features *
- C) The morphological decomposition of each word
- D) The dependency structure of sentences

**Q17.** According to the course, what was the approximate Cohen's Kappa for the document-level hotel sentiment annotation task?
- A) 0.42
- B) 0.65
- C) 0.75
- D) 0.87 *

**Q18.** Which of the following best distinguishes NER from named entity linking (NEL)?
- A) NER produces BIO labels; NEL produces document-level topic labels
- B) NER finds and classifies entity spans in text; NEL disambiguates those spans to specific entries in a knowledge base *
- C) NER is supervised; NEL is always unsupervised
- D) NER only identifies people and locations; NEL handles all entity types

**Q19.** The model that uses a directed graph over words instead of specifying K topics in advance is:
- A) Correlated Topic Model
- B) Dynamic Topic Model
- C) Hierarchical LDA *
- D) Author-Topic Model

**Q20.** In subword tokenisation with WordPiece, "##" prefix indicates:
- A) The token is a named entity
- B) The token is a continuation piece that should be merged with the preceding subword *
- C) The token was masked during BERT pretraining
- D) The token has negative sentiment

**Q21.** Micro-averaged precision for a system with TP=150, FP=50, across all classes is:
- A) 0.60
- B) 0.75 *
- C) 0.80
- D) 0.50

**Q22.** The "open-class" vs. "closed-class" distinction in POS tagging matters for NLP because:
- A) Closed-class words never appear in training data
- B) Open-class words (nouns, verbs, adjectives) carry more content and can include new words; closed-class words (prepositions, pronouns) have a fixed small inventory *
- C) Open-class words are always stop words
- D) Closed-class words require lemmatisation; open-class words do not

**Q23.** Which of the following statements about BERT's attention mechanism is correct?
- A) BERT uses causal (left-to-right) attention like GPT
- B) BERT uses bidirectional self-attention, where every token can attend to every other token simultaneously *
- C) BERT uses cross-attention between encoder and decoder stacks
- D) BERT uses attention only in layers 7-12, not in lower layers

**Q24.** In the course, "double propagation" for lexicon building:
- A) Trains two classifiers simultaneously on positive and negative data
- B) Starts from seed opinion words, uses syntactic patterns to extract aspects and new opinions iteratively *
- C) Applies two rounds of fine-tuning: first on unlabelled, then on labelled data
- D) Combines two separate word2vec embeddings using vector arithmetic

**Q25.** Which of the following describes what WordNet Affect provides beyond standard WordNet?
- A) Named entity types for all nouns
- B) Emotion labels (A-Labels: EMOTION, MOOD, TRAIT, COGNITIVE STATE) for affective words *
- C) Dependency arc labels for verb frames
- D) Topic categories aligned to IPTC taxonomy

**Q26.** What does the term "type" refer to in the context of tokens and types in corpus linguistics?
- A) The syntactic category (POS) assigned to a word token
- B) The unique word form (distinct orthographic item) in a vocabulary *
- C) The entity type (PERSON, ORG, LOC) of a named entity
- D) The document category label in a classification task

**Q27.** Which of the following preprocessing steps can MOST damage downstream task performance if done incorrectly?
- A) Converting all text to lowercase (which can destroy entity-case information critical for NER) *
- B) Removing leading and trailing whitespace from documents
- C) Sorting the vocabulary alphabetically
- D) Computing document frequencies after tokenisation

**Q28.** In named entity linking (NEL), the set of candidate entities for a mention is typically generated by:
- A) Running LDA and selecting the top topic for the mention
- B) Querying the knowledge base for entries whose labels or aliases match or resemble the mention string *
- C) Applying a CRF to identify the most likely IOB label sequence
- D) Computing cosine similarity between the mention's TF-IDF vector and all KB entries

**Q29.** The MPQA (Multi-Perspective Question Answering) corpus is described in the course as:
- A) A topic-modelling benchmark with IPTC category labels
- B) An annotated opinion corpus marking subjective expressions, sources, and attitudes in news *
- C) A named entity linking benchmark mapping mentions to Wikipedia
- D) A multilingual parallel corpus for machine translation

**Q30.** Which of the following is FALSE about the GPT family of models?
- A) GPT models use a decoder-only (autoregressive) Transformer architecture
- B) GPT-2 uses byte-pair encoding (BPE) tokenisation
- C) GPT-3 has approximately 175 billion parameters
- D) GPT models are bidirectional and can attend to future tokens during generation *

**Q31.** The "hedonometer" project tracks happiness over time by:
- A) Conducting daily mood surveys with 10,000 participants
- B) Assigning valence scores to words and computing a weighted average over sampled Twitter data *
- C) Applying LDA to identify happy vs. sad topics in news corpora
- D) Fine-tuning BERT on happiness-labelled social media posts

**Q32.** In the context of text classification, "domain adaptation" refers to:
- A) Translating training data into the target language
- B) Adapting a model trained on one domain (e.g., news) to perform well on another (e.g., biomedical) *
- C) Increasing the number of labelled examples by data augmentation
- D) Using a larger transformer model for a different classification task

**Q33.** The JRC-Acquis corpus is described in the course as:
- A) A monolingual news corpus for topic classification in English
- B) A multilingual parallel corpus of EU legislative documents labelled with EuroVoc topics *
- C) A biomedical NER benchmark in Dutch
- D) A Twitter sentiment dataset in multiple European languages

**Q34.** Which of the following best describes "affix features" used in NER?
- A) The presence of a word in a city or person-name gazetteer
- B) The POS tag assigned to the token by a tagger
- C) Character-level prefixes (e.g., first 2-4 chars) and suffixes (last 2-4 chars) of each token *
- D) The cosine similarity between the token's embedding and known entity embeddings

**Q35.** The "attention mechanism" in sequence-to-sequence models was introduced primarily to solve which problem?
- A) The inability of LSTMs to process batches of different-length sequences
- B) The bottleneck of compressing all source information into a single fixed vector before decoding *
- C) The high computational cost of training recurrent models
- D) The lack of contextual representations in static word embeddings

# Exam 13 — Mixed Topics VI
*35 questions | Correct answer marked with \**

---

**Q1.** In the NLP pipeline, which task is responsible for assigning grammatical roles like subject, object, and modifier to words?
- A) Tokenisation
- B) Morphological analysis
- C) Syntactic analysis (parsing) *
- D) Lexical analysis (POS tagging)

**Q2.** The word "teacher" is formed from "teach" by:
- A) Inflection (grammatical variation)
- B) Compounding (combining two stems)
- C) Derivation (adding -er suffix to create a new noun from a verb) *
- D) Cliticisation (attaching a clitic)

**Q3.** A system labels 100 tokens in a test set. Gold has 40 positive tokens; system predicts 50 as positive, of which 30 are correct. What is the F1 for the positive class?
- A) 0.63
- B) 0.67 *
- C) 0.70
- D) 0.60

**Q4.** Firth's distributional hypothesis motivates word embeddings because it claims:
- A) Words are defined by their morphological structure
- B) A word's meaning is captured by the contexts in which it appears *
- C) Words that look similar (orthographically) have similar meaning
- D) Word meaning is universal across all languages

**Q5.** Which of the following is NOT a stage in the Ravi & Ravi (2015) sentiment analysis pipeline?
- A) Opinion spam detection
- B) Subjectivity classification
- C) Aspect extraction
- D) Named entity linking *

**Q6.** The entity extent problem in NER refers to:
- A) Entities that span multiple sentences
- B) Uncertainty about the exact token boundaries of an entity mention *
- C) Entities that have no entry in the knowledge base
- D) Entities whose type cannot be determined from context

**Q7.** Which of the following is FALSE about LDA?
- A) LDA assigns each word in a document to a latent topic
- B) LDA produces a document-topic matrix and a topic-word matrix
- C) LDA automatically selects the optimal number of topics K *
- D) LDA uses Dirichlet priors over topic and word distributions

**Q8.** The XLM-RoBERTa model is particularly useful for:
- A) Generating long text sequences in English only
- B) Cross-lingual token classification tasks (e.g., Dutch NER using a model trained on multiple languages) *
- C) Computing TF-IDF representations for large document corpora
- D) Training sentence classifiers on small English datasets only

**Q9.** In sentiment analysis, "negation scope" refers to:
- A) The distance between the negation word and the sentence boundary
- B) The span of text whose polarity is inverted by a negation expression *
- C) The list of negation words in a sentiment lexicon
- D) The number of negated sentences in a document

**Q10.** Which of the following is TRUE about the CoNLL 2003 NER shared task evaluation?
- A) Partial span matches (overlapping spans) count as true positives
- B) Only the entity type must match; span boundaries need not be exact
- C) Both span boundaries and entity type must exactly match for a true positive *
- D) F1 is computed per token, not per entity span

**Q11.** In the context of the Transformer, "layer normalisation" is applied to:
- A) The positional encoding vectors before they are added to token embeddings
- B) The output of each sub-layer (attention and feed-forward) before passing to the next layer *
- C) The final output embeddings only
- D) The K and V matrices before computing attention scores

**Q12.** In the opinion structure framework, "cognitive SIP verbs" include words like "think" and "believe" because:
- A) They directly express positive or negative polarity
- B) They introduce mental states — the holder's internal beliefs or thoughts — as the attributed opinion *
- C) They are always negated in sentiment-bearing sentences
- D) They function as aspect category markers in ABSA

**Q13.** Which of the following is the correct computation of micro-averaged F1 from TP=200, FP=50, FN=80?
- A) 0.75
- B) 0.73 *
- C) 0.80
- D) 0.68

**Q14.** The "short-text topic model" variant of LDA addresses the problem that:
- A) LDA is too slow for long documents
- B) Standard LDA co-occurrence statistics are unreliable for very short texts (tweets, sentences) *
- C) LDA cannot handle numeric data in documents
- D) LDA produces too many topics for small corpora

**Q15.** Which of the following resources is used specifically for training Dutch NLP models mentioned in the course?
- A) CoNLL 2003 English data with English BERT
- B) wietsedv/bert-base-dutch-cased-finetuned-sentiment *
- C) xlm-roberta-large for English only
- D) VADER lexicon adapted for Dutch

**Q16.** In word embeddings, the cosine similarity between two vectors is preferred over Euclidean distance because:
- A) Cosine similarity is always faster to compute
- B) Cosine similarity measures the angle between vectors (direction of meaning) rather than their absolute magnitude *
- C) Cosine similarity can be negative while Euclidean distance cannot
- D) Euclidean distance requires normalisation while cosine does not

**Q17.** Which of the following is a "named entity variation" challenge specific to NERC?
- A) Deciding whether "bank" is a financial institution or a river bank
- B) The same entity referred to as "The United States", "U.S.", "America", and "the US" requiring all to be recognised *
- C) Identifying that "running" is a verb or noun
- D) Resolving the PP-attachment of "in the city"

**Q18.** The "patient" role in semantic role labelling identifies:
- A) The entity that initiates or causes the event
- B) The entity that is affected by or undergoes the event *
- C) The location where the event takes place
- D) The instrument used to carry out the event

**Q19.** In supervised text classification, "one-vs-rest" (OvR) binary decomposition means:
- A) One annotator checks all labels; the rest are automatic
- B) One binary classifier per label, trained to distinguish each label from all other labels *
- C) One neural network layer per class label
- D) Each document is assigned to exactly one class, not multiple

**Q20.** The "dynamic topic model" captures which phenomenon that standard LDA cannot?
- A) Correlations between co-occurring topics in the same document
- B) Topic distributions that evolve over time (e.g., how news topics change across decades) *
- C) Topic distributions conditioned on document length
- D) Fine-grained type hierarchies within each topic

**Q21.** In the context of NER feature engineering, "gazetteer" features are:
- A) Character n-gram frequency patterns derived from training data
- B) Lookup features indicating whether a token appears in a pre-compiled list of known names or entities *
- C) Document-level TF-IDF weights assigned to named entity tokens
- D) POS tags derived from a morphological analyser

**Q22.** Which of the following correctly describes what "implicature" means in pragmatics?
- A) A direct, literal statement of fact
- B) A meaning that is conveyed but not explicitly stated, inferred from context and communicative conventions *
- C) A morphological process creating new words from existing ones
- D) A syntactic structure where multiple readings are possible

**Q23.** The BiLSTM in the Lample et al. (2016) NER model processes:
- A) Character embeddings only, producing a character-level representation per sentence
- B) Word-level input (word embeddings + optionally character-level features) and produces context-sensitive token representations *
- C) Document-level embeddings for sequence classification
- D) Only entity boundary detection without type classification

**Q24.** According to the course, which hyperparameter search strategy for LDA K is commonly used in practice?
- A) Setting K = square root of the number of documents
- B) Trying different values of K and evaluating coherence and perplexity to find a good K *
- C) Setting K = vocabulary size divided by 100
- D) Fixing K = 50 for all corpora regardless of size

**Q25.** Which of the following is NOT an advantage of BERTopic over LDA?
- A) BERTopic leverages pretrained semantic representations
- B) BERTopic does not require specifying K in advance
- C) BERTopic produces fully interpretable probabilistic topic-word distributions like LDA *
- D) BERTopic can capture semantically coherent topics even with sparse co-occurrence data

**Q26.** What is "metonymy" in linguistics?
- A) A figure of speech mapping an abstract concept onto a concrete one
- B) Using a word to stand for something related (e.g., the container for the contents) *
- C) A word having multiple unrelated historical meanings
- D) Marking the speech act of a quoted source with a SIP verb

**Q27.** In the context of the Transformer self-attention, what is the role of the "Query" matrix?
- A) It stores the content to be retrieved
- B) It defines what the current token is "looking for" in other tokens *
- C) It computes the final output of the attention layer
- D) It masks future tokens during autoregressive decoding

**Q28.** The FIGER type system provides 112 fine-grained entity types organised into:
- A) A flat list with no hierarchy
- B) A two-level hierarchy where types have both a coarse and a fine-grained category *
- C) A tree with 10 levels of specificity
- D) A graph where each type can have multiple parents

**Q29.** Which of the following is an example of a "speech act" SIP verb in sentiment analysis?
- A) "think"
- B) "know"
- C) "assert" *
- D) "fear"

**Q30.** According to the course, the performance drop from CoNLL 2003 (newswire) to Wikinews (cross-domain NER) is primarily caused by:
- A) Wikinews having longer sentences on average
- B) Different capitalisation conventions, entity types, and vocabulary distributions *
- C) Wikinews using a different IOB label scheme
- D) The CoNLL 2003 model being too large to apply to Wikinews

**Q31.** What is the role of the feed-forward sub-layer in each Transformer block?
- A) It computes attention weights between all token pairs
- B) It applies a position-wise non-linear transformation to each token representation independently *
- C) It performs cross-attention between encoder and decoder representations
- D) It encodes the absolute position of each token in the sequence

**Q32.** In the context of the course, "gold data" is defined as:
- A) Data automatically labelled by a trained model
- B) Training data from any large publicly available corpus
- C) Manually annotated data by humans, considered the ground truth for evaluation *
- D) Data that achieves Cohen's Kappa > 0.80

**Q33.** The Plutchik emotion wheel organises emotions by:
- A) Mapping each emotion to a specific brain region
- B) Arranging eight basic emotions in a wheel with opposite emotions across from each other, and intensity levels on the radial axis *
- C) Clustering emotions into three groups: positive, negative, and neutral
- D) Ranking emotions by their frequency in social media text

**Q34.** Which of the following correctly describes the difference between "type" error and "boundary" error in NER?
- A) Type error: wrong span; boundary error: wrong entity type
- B) Type error: wrong entity type with correct span; boundary error: wrong span boundaries *
- C) Type error: false positive; boundary error: false negative
- D) They are synonyms describing the same error category

**Q35.** In the course, document-level accuracy for hotel sentiment (positive/negative) was reported at approximately:
- A) 72%
- B) 80%
- C) 92% *
- D) 99%

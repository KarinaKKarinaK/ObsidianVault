# Exam 12 — Mixed Topics V
*35 questions | Correct answer marked with \**

---

**Q1.** Which of the following is the most accurate definition of a "morpheme"?
- A) A syllable unit in phonology
- B) The smallest meaning-bearing unit of language *
- C) A phrase structure constituent
- D) A POS category assigned by a tagger

**Q2.** The sentence "Flying planes can be dangerous" is ambiguous because:
- A) "flying" can be a gerund (the activity) or a participial adjective (modifying planes), giving two different subjects *
- B) "planes" can be noun or verb
- C) "dangerous" is a homonym with two unrelated meanings
- D) "can" is ambiguous between a modal and a noun

**Q3.** Given Precision=0.70 and Recall=0.84, the F1 score is approximately:
- A) 0.74
- B) 0.77 *
- C) 0.80
- D) 0.72

**Q4.** What is PPMI (Positive PMI) designed to correct for in distributional semantic models?
- A) Underweighting of frequent stop words
- B) Negative PMI values caused by rare word pairs, which add noise *
- C) Over-representation of content words in context vectors
- D) Missing values caused by OOV terms

**Q5.** Which of the following statements about the VADER sentiment tool is FALSE?
- A) VADER was specifically designed for social media text
- B) VADER handles ALL CAPS as an intensifier
- C) VADER requires fine-tuning on domain-specific data to work *
- D) VADER handles emoticons and common social media slang

**Q6.** The "short word shape" feature in NERC represents a word by collapsing:
- A) All characters to lowercase
- B) All consecutive identical character types into one representative character (e.g., "London" → "Xx") *
- C) Only the first and last character of the word
- D) The character n-gram count per position

**Q7.** In the LDA plate notation, the outer plate (over documents) and inner plate (over words) represent:
- A) The vocabulary size V and the number of topics K
- B) The repeated generation of documents (D documents) and words per document (N words) *
- C) The Dirichlet hyperparameters α and β
- D) The training and test sets respectively

**Q8.** Which of the following is the correct description of what the [SEP] token does in BERT?
- A) It marks the position of masked tokens during pretraining
- B) It separates two input segments (e.g., sentence A and sentence B) in the NSP pretraining task *
- C) It encodes positional information for the sequence
- D) It indicates the beginning of a new paragraph in long documents

**Q9.** Which of the following correctly describes what "precision" measures in NER evaluation?
- A) Of all gold entities, how many did the system correctly predict?
- B) Of all entities the system predicted, how many are actually correct? *
- C) The average span length of correctly predicted entities
- D) The proportion of tokens that were labelled correctly

**Q10.** The "one-hot" vector representation assigns to each document:
- A) A dense continuous vector from a pre-trained language model
- B) A binary vector where each position indicates the presence or absence of a vocabulary term *
- C) The average of all token embeddings in the document
- D) A probability distribution over topic labels

**Q11.** Aspect-Based Sentiment Analysis (ABSA) differs from document-level sentiment analysis in that ABSA:
- A) Classifies entire documents as positive, negative, or neutral
- B) Extracts and classifies sentiment at the level of specific aspects or entities mentioned in text *
- C) Uses only unsupervised methods without any labelled training data
- D) Only applies to product reviews with explicit star ratings

**Q12.** Which of the following entity types is specific to the biomedical NER domain and NOT found in CoNLL 2003?
- A) PERSON
- B) ORGANISATION
- C) CHEMICAL *
- D) LOCATION

**Q13.** Micro-averaged recall for a system where per-class TP counts are [40, 30, 20] and FN counts are [10, 20, 30] is:
- A) 0.60
- B) 0.67 *
- C) 0.70
- D) 0.75

**Q14.** The "encoder-only" transformer architecture (like BERT) is best suited for which types of tasks?
- A) Text generation, autocompletion, and story writing
- B) Machine translation requiring parallel input-output sequences
- C) Classification, token labelling, and sentence pair tasks *
- D) Dialogue management and response generation

**Q15.** Which of the following is an application of entity linking mentioned in the course?
- A) Detecting syntactic parse errors in raw text
- B) Linking person mentions in news to their Wikipedia entries for knowledge base population *
- C) Assigning BIO labels to all tokens in a sentence
- D) Computing TF-IDF weights for named entity tokens

**Q16.** The "Ravi & Ravi (2015)" survey categorises sentiment classification methods under which broad headings?
- A) Supervised, unsupervised, and deep learning methods *
- B) Rule-based, statistical, and neural methods exclusively
- C) Lexicon-based, SVM, and BERT-based methods only
- D) Document-level, sentence-level, and aspect-level only

**Q17.** In a dependency parse, the "root" of the sentence is:
- A) Always the first word of the sentence
- B) Always the main verb (or functional equivalent) of the main clause *
- C) The word with the most dependents
- D) The subject noun phrase of the sentence

**Q18.** The "author-topic model" is most appropriate for which research question?
- A) How topics in a corpus change over decades
- B) Which topics are associated with which authors or groups of authors *
- C) How many topics a document should be assigned given its length
- D) Whether two documents discuss the same topic

**Q19.** What is the effect of using a very small learning rate when fine-tuning BERT (as discussed in Sun et al. 2020)?
- A) It speeds up convergence but risks overfitting
- B) It prevents catastrophic forgetting of pretrained knowledge by making smaller parameter updates *
- C) It forces the model to only update the top classification layer
- D) It has no practical effect on fine-tuning outcomes

**Q20.** In the SemEval 2014 Task 4 restaurant domain, which aspect category was most frequently annotated?
- A) AMBIENCE#GENERAL
- B) SERVICE#GENERAL
- C) FOOD#QUALITY *
- D) RESTAURANT#PRICES

**Q21.** The NLP concept of "data sparseness" in the context of n-gram models means:
- A) Most documents in the corpus are very short
- B) The majority of possible n-gram combinations are never observed in training data *
- C) Named entities are underrepresented in training corpora
- D) The vocabulary grows faster than the number of labelled examples

**Q22.** In named entity recognition, which feature type provides evidence about the broader document context (not just the current token)?
- A) Character n-gram suffixes of the current word
- B) The POS tag immediately to the right
- C) Document-level frequency counts: has this name appeared before in the same document? *
- D) The word's cosine similarity to its nearest embedding neighbour

**Q23.** Which statement about GPT (Generative Pre-trained Transformer) is correct?
- A) GPT uses bidirectional self-attention like BERT
- B) GPT is an encoder-decoder model trained with cross-attention
- C) GPT uses autoregressive (left-to-right) masked attention and is a decoder-only model *
- D) GPT-2 was trained on the BookCorpus only

**Q24.** Semantic role labelling helps text mining applications because it:
- A) Assigns topic categories to documents
- B) Identifies who did what to whom — the agent, action, patient, and other roles in events *
- C) Measures the sentiment polarity of event descriptions
- D) Clusters documents by topical similarity using LDA

**Q25.** Which of the following is the definition of "recall" in binary classification?
- A) TP / (TP + FP)
- B) TP / (TP + FN) *
- C) TN / (TN + FP)
- D) TP / (TP + TN)

**Q26.** The "ITPT" fine-tuning strategy from Sun et al. (2020) stands for:
- A) In-Task Pre-Training (continued pretraining on within-task unlabelled data before fine-tuning) *
- B) Iterative Training with Perplexity Thresholding
- C) Input-Target Pair Training on parallel sentence data
- D) Intermediate Task Pre-Training on NLI data

**Q27.** The compound noun "blackboard" illustrates compounding where the meaning:
- A) Is a straightforward combination of component meanings (a board that is black)
- B) Has lexicalised to a meaning not directly compositional from its parts (a specific type of teaching surface) *
- C) Can only be determined from syntactic context
- D) Is identical to the adjective "black" applied to "board"

**Q28.** In the BERTopic workflow, what does the c-TF-IDF step accomplish?
- A) It trains a Dirichlet-based topic-word distribution
- B) It extracts representative keywords for each cluster by computing TF-IDF within each cluster vs. the rest *
- C) It fine-tunes the sentence transformer on cluster labels
- D) It assigns probability scores to each document's topic membership

**Q29.** Which of the following is a disadvantage of using stop-word removal in sentiment analysis?
- A) Stop words are always negative sentiment words
- B) Stop words like "not", "no", and "never" are crucial negation markers for sentiment and may be incorrectly removed *
- C) Stop-word lists are too large to store efficiently
- D) Stop words cause TF-IDF weights to become negative

**Q30.** Which heuristic is used in most sentence splitters to distinguish abbreviation periods from sentence-final periods?
- A) Check whether the next word is a proper noun (capitalised)
- B) Use a list of known abbreviations and check if the period follows one *
- C) Apply a full parse tree to determine if a sentence is complete
- D) Count syllables in the preceding word to determine if it is an abbreviation

**Q31.** The "Patient" semantic role in "The surgeon removed the tumour" is:
- A) "The surgeon" (initiator)
- B) "removed" (the event)
- C) "the tumour" (entity undergoing the action) *
- D) No patient role is present in this sentence

**Q32.** In inter-annotator agreement, a Kappa of 0.80 is typically interpreted as:
- A) Moderate agreement
- B) Substantial agreement
- C) Almost perfect agreement *
- D) Fair agreement

**Q33.** Which of the following correctly explains why LDA produces different results on different runs with the same data and K?
- A) LDA uses different hyperparameters each run
- B) Gibbs sampling is a stochastic inference algorithm sensitive to random initialisation *
- C) LDA applies different stop-word lists each time
- D) The vocabulary is randomly permuted before each run

**Q34.** Named entity linking systems must handle "NIL" entities. Which situation creates a NIL entity?
- A) The NER system predicts a wrong entity type
- B) The entity mention exists in the text but has no matching entry in the reference knowledge base *
- C) The entity span crosses a sentence boundary
- D) Two different mentions in the same document refer to the same entity

**Q35.** According to the course, which word has approximately 59 senses listed in WordNet?
- A) "run"
- B) "go"
- C) "break" *
- D) "make"

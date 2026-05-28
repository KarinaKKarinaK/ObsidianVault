# Exam 6 — Named Entity Recognition & Classification
*35 questions | Correct answer marked with \**

---

**Q1.** Named Entity Recognition and Classification (NERC) involves:
- A) Only assigning entity types, not finding spans
- B) Finding named entity spans AND classifying their type *
- C) Clustering documents by topic
- D) Disambiguating word senses in a lexicon

**Q2.** Which of the following is an example of name variation in NER (same entity, different expressions)?
- A) "Apple" referring to either the tech company or the fruit
- B) "Washington" as city, state, person, or government
- C) "IBM", "International Business Machines", and "Big Blue" all referring to the same company *
- D) "May" being a month, a name, or a modal verb

**Q3.** Metonymy in NER creates type ambiguity because:
- A) Different people have the same name
- B) The same name can be used to refer to entities of different types (e.g., "Washington" as city, government, or person) *
- C) Entity spans often cross sentence boundaries
- D) Abbreviations like "IBM" are ambiguous between multiple companies

**Q4.** Which of the following entity types would be LEAST typical in the classic CoNLL 2003 NERC task?
- A) PERSON
- B) ORGANISATION
- C) LOCATION
- D) CHEMICAL *

**Q5.** Fine-grained entity typing (e.g., FIGER's 112 types) makes NERC harder because:
- A) It reduces the number of entity mentions
- B) It eliminates the need for BIO tagging
- C) It introduces many more categories, increasing ambiguity and annotation difficulty *
- D) It only applies to biomedical text

**Q6.** The word shape feature "Xx" represents a word where:
- A) All characters are uppercase
- B) All characters are lowercase
- C) The word starts with an uppercase letter followed by lowercase letters *
- D) The word contains a digit

**Q7.** Which type of lookup feature (gazetteer) would help identify "Paris" as a city name?
- A) A list of common English verb forms
- B) A list of geographic entity names *
- C) A list of negative sentiment words
- D) A list of topic taxonomy terms

**Q8.** The entity linking (NEL) task differs from named entity recognition in that:
- A) NEL identifies entity spans while NER links them to a knowledge base
- B) NER identifies entity spans; NEL links/disambiguates the entity to a specific entry in a reference database (Wikipedia, DBpedia) *
- C) NEL classifies entity types; NER links them to a knowledge base
- D) NEL uses BIO labels; NER uses topic labels

**Q9.** NIL entities in entity linking refer to:
- A) Entities of type "null" (no type assigned)
- B) Entities whose mention spans are predicted as "O" (outside any entity)
- C) Entities that do not exist in the reference knowledge base *
- D) Entities whose type cannot be determined from context

**Q10.** The Alistair McAlpine "trial by twitter" case in the course illustrates:
- A) The importance of evaluating NER on balanced datasets
- B) How entity disambiguation errors can have real-world consequences (wrong person identified) *
- C) Why CRFs outperform neural models for NER
- D) The difference between BIO and IO tagging schemes

**Q11.** The entity linking method AIDA/AGDISTIS differs from DBpedia Spotlight because:
- A) AIDA uses word-level text similarity; Spotlight uses graph coherence
- B) AIDA uses graph-based coherence across all candidate entities simultaneously; Spotlight uses word-level similarity *
- C) DBpedia Spotlight only works for German
- D) AIDA does not use any knowledge base

**Q12.** Coreference resolution is important for text mining and information extraction because:
- A) Most references to an entity in a document are not the full proper name (they are pronouns or common NPs) *
- B) It is a prerequisite for sentence splitting
- C) It assigns IOB labels to all tokens
- D) It computes TF-IDF weights for entity mentions

**Q13.** A BiLSTM encoder processes text in:
- A) Only the left-to-right direction
- B) Only the right-to-left direction
- C) Both left-to-right and right-to-left, with results concatenated *
- D) Parallel processing of all tokens simultaneously (like self-attention)

**Q14.** In the Lample et al. (2016) NER architecture, character embeddings are used primarily to:
- A) Replace word embeddings entirely
- B) Capture morphological and word-shape properties that may be missing from word-level embeddings *
- C) Compute attention weights between tokens
- D) Perform sentence-level classification

**Q15.** The best published NERC F1 on CoNLL 2003 English from feature-engineered systems (Agerri & Rigau 2016 with dictionary) was approximately:
- A) 85.0
- B) 88.5
- C) 91.36 *
- D) 95.0

**Q16.** Contextual embeddings from BERT solve which specific problem that static word2vec embeddings cannot?
- A) Processing documents longer than 512 tokens
- B) Representing different senses of a polysemous word differently depending on context *
- C) Handling multiple languages in one model
- D) Computing TF-IDF weights for rare terms

**Q17.** Document-level features for NERC include:
- A) The character shape pattern of the current token
- B) Whether the word appears in a gazetteer
- C) Multiple occurrences of a name elsewhere in the document (for anaphora/coreference) *
- D) The POS tag of the immediately preceding token

**Q18.** Which of the following is a key factor that affects NERC system performance according to the course?
- A) The file format of the source document (PDF vs. HTML)
- B) The font size of the document
- C) The genre and domain of the text *
- D) The programming language used to implement the system

**Q19.** "Boundary errors" in NER evaluation occur when:
- A) The system predicts the wrong entity type
- B) The system misses an entity completely
- C) The system predicts the correct entity type but with an incorrect span boundary *
- D) The system predicts an entity where there is none in the gold standard

**Q20.** Under strict span evaluation (CoNLL), a predicted span "Bank of America" when the gold span is "Bank of America Corp" counts as:
- A) A true positive (partial match)
- B) A false negative only
- C) A false positive and a false negative *
- D) A true negative

**Q21.** Character-level vectors in the context of NERC are useful because they:
- A) Contain pre-defined entity type information
- B) Capture morpho-syntactic patterns and word-shape properties such as capitalisation *
- C) Provide sentence-level topic distributions
- D) Replace the CRF layer entirely

**Q22.** According to the course, cross-domain NERC performance (e.g., trained on news, tested on biomedical) can drop by up to:
- A) 5 F1 points
- B) 10 F1 points
- C) 20 F1 points *
- D) No drop occurs

**Q23.** Which code snippet runs a cross-lingual NER model for Dutch in HuggingFace per the course?
- A) `pipeline("ner")` with default model
- B) `pipeline("ner", model="xlm-roberta-large-finetuned-conll103-english")` *
- C) `pipeline("sentiment-analysis", model="distilbert")`
- D) `pipeline("text-generation", model="gpt2")`

**Q24.** The short word shape of "American" is:
- A) "Xxxxxxxxx"
- B) "Ax"
- C) "Xx" *
- D) "XXXXXXXXX"

**Q25.** Entity extent (span boundary) ambiguity is best illustrated by:
- A) Whether "IBM" refers to a company or an acronym for something else
- B) Whether "United States of America Library of Congress" is one entity, nested entities, or multiple *
- C) Whether "May" is a month or a modal verb
- D) Whether "Washington" refers to the city or the person

**Q26.** Which of the following entity tasks involves tracking all expressions (pronouns, abbreviations, proper nouns) that refer to the same entity across a document?
- A) Named entity recognition (NER)
- B) Named entity classification (NEC)
- C) Named entity linking (NEL)
- D) Coreference resolution *

**Q27.** The dataset used in the course for NERC evaluation for English is:
- A) SemEval 2014 Task 4
- B) Reuters-21578
- C) CoNLL 2003 *
- D) JRC-Acquis

**Q28.** Affix features (n-gram prefixes and suffixes) are useful for NERC primarily because:
- A) They reveal sentiment polarity of entity names
- B) They capture morphological cues such as person-name endings and organisation suffixes *
- C) They replace gazetteer lookups entirely
- D) They compute TF-IDF scores for entity tokens

**Q29.** The FIGER entity type system uses how many fine-grained types according to the course?
- A) 4
- B) 17
- C) 60
- D) 112 *

**Q30.** In entity linking, "name variation" refers to:
- A) The same entity referred to by multiple different surface forms *
- B) Different entities sharing the same name
- C) Entity types changing over time
- D) Boundary disagreements between annotators

**Q31.** Relative time expressions ("last Tuesday", "three weeks ago") present which specific challenge for named entity systems?
- A) They have extremely long spans
- B) They require knowledge of the document date to resolve *
- C) They are always classified as PERSON entities
- D) They cannot be represented in IOB format

**Q32.** "A spurious entity" error in NER evaluation means:
- A) The system predicts the correct entity span but wrong type
- B) The system misses a gold entity entirely
- C) The system predicts an entity span for which no gold entity exists *
- D) The system predicts the wrong span boundaries

**Q33.** Which of the following correctly describes the NED/NEL process for "Obama" in a sentence?
- A) Determine the BIO tag (B-PER or I-PER) for the token
- B) Find the entity span → list candidate KB entries → rank by context similarity → select the most likely entry *
- C) Compute the TF-IDF weight of "Obama" in the document
- D) Assign "Obama" to a topic category using LDA

**Q34.** For a system using pre-trained BERT for NER, how does BERT's pretraining help with entity detection?
- A) BERT was pretrained on CoNLL 2003 directly
- B) BERT's contextual representations encode surrounding context, helping disambiguate entities like "Apple" (org vs. fruit) *
- C) BERT assigns BIO tags during pretraining
- D) BERT's attention heads are tuned to gazetteer entries

**Q35.** Word-level features for NERC include case, punctuation, digit patterns, character patterns, morphology, POS, and function word status. Which combination is MOST likely used to detect a proper noun?
- A) Lowercase + high word frequency + no punctuation
- B) Initial capital letter + low corpus frequency + presence in a name gazetteer *
- C) All digits + surrounded by punctuation
- D) Only context from previous two tokens

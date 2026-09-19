# Exam 5 — Sentiment & Subjectivity Analysis
*35 questions | Correct answer marked with \**

---

**Q1.** Subjectivity in NLP is broader than simple positive/negative polarity. Which of the following best captures this broader view?
- A) Only adjectives carry subjective meaning
- B) Subjectivity includes opinions, emotions, stance, attribution, agenda setting, and social relations *
- C) Subjectivity is limited to product reviews
- D) Subjectivity only applies to Twitter data

**Q2.** What distinguishes explicit from implicit sentiment?
- A) Explicit sentiment uses neural models; implicit uses rules
- B) Explicit sentiment is document-level; implicit is sentence-level
- C) Explicit sentiment uses direct opinion words; implicit is inferred from events or context without polarity words *
- D) Explicit sentiment is in English; implicit is in other languages

**Q3.** A Source-Introducing Predicate (SIP) such as "claims" or "denies" is important for sentiment analysis because:
- A) It identifies the target of the opinion
- B) It indicates that the following content is attributed to a specific holder, not the author *
- C) It marks the beginning of a named entity span
- D) It converts a negative sentence into a positive one

**Q4.** In the opinion structure Holder → SIP → Sentiment → Target, what is the "Target"?
- A) The emotion category of the sentiment
- B) The person expressing the opinion
- C) The entity, product, or topic being evaluated *
- D) The speech-act verb connecting holder to sentiment

**Q5.** According to the lecture, hedonometer.org tracks happiness using:
- A) Survey responses from 1,000 participants per day
- B) Sentiment-scored Twitter data correlated with real-world events *
- C) Star ratings from product review sites
- D) Physiological measurements of facial expressions

**Q6.** Which of the following is a cognitive SIP verb?
- A) "announce"
- B) "promise"
- C) "hate" *
- D) "confirm"

**Q7.** Valence intensifiers in sentiment analysis refer to:
- A) Words that negate the polarity of an opinion
- B) Words that strengthen or weaken the intensity of an opinion expression *
- C) Named entities that appear in opinion sentences
- D) Modal verbs signalling uncertainty

**Q8.** The context-dependence of sentiment is illustrated by "cold person" vs. "cold soda". This primarily means:
- A) Sentiment lexicons are always wrong
- B) Negation always reverses polarity
- C) The same adjective can be positive or negative depending on the noun it modifies *
- D) Implicit sentiment cannot be detected

**Q9.** Double propagation for sentiment analysis works by:
- A) Training two separate classifiers on positive and negative examples
- B) Starting with seed sentiment words, using syntactic patterns to find aspects, then new sentiments, iterating *
- C) Pre-training a model and then fine-tuning on review data
- D) Running two separate LDA models and merging the topics

**Q10.** Aspect-Based Sentiment Analysis (ABSA) as used in SemEval 2014 Task 4 requires:
- A) Only document-level polarity classification
- B) Identifying both aspect spans (BIO token classification) and their associated sentiment polarity *
- C) Classifying documents into IPTC topic categories
- D) Running coreference resolution before sentiment classification

**Q11.** Which of the following tools was specifically designed for social media sentiment and handles emoticons and informal writing?
- A) WordNet Affect
- B) LIWC
- C) MPQA / OpinionFinder
- D) VADER *

**Q12.** The NRC Emotion Lexicon (Mohammad & Turney) associates words with:
- A) Two polarity classes (positive/negative) only
- B) Eight Plutchik emotions and two polarity classes (positive/negative) *
- C) Ekman's six basic emotions and a neutrality class
- D) Intensity scores on a continuous scale from −5 to +5

**Q13.** Agenda setting is described in the lectures as a form of subjectivity because:
- A) It always uses explicit polarity words
- B) Choosing what facts to include or omit can express stance without direct opinion words *
- C) It is identical to metaphor use
- D) It only applies to political texts

**Q14.** The phrase "The new iPhone dies after 2 hours" expresses:
- A) Explicit positive sentiment about the iPhone
- B) No sentiment — it is a neutral factual statement
- C) Implicit negative sentiment through the event described *
- D) Positive sentiment about battery technology

**Q15.** In the Ravi & Ravi (2015) sentiment analysis pipeline, which step comes FIRST?
- A) Aspect extraction
- B) Subjectivity classification *
- C) Sentiment classification
- D) Opinion spam detection

**Q16.** Document-level hotel sentiment annotation had a Cohen's Kappa of approximately:
- A) 0.42
- B) 0.55
- C) 0.65
- D) 0.87 *

**Q17.** Which HuggingFace model is mentioned in the course for Dutch sentiment analysis?
- A) bert-large-cased-finetuned-conll03-english
- B) distilbert-base-uncased-finetuned-sst-2-english
- C) wietsedv/bert-base-dutch-cased-finetuned-sentiment *
- D) xlm-roberta-large-finetuned-conll103-english

**Q18.** Plutchik's Wheel of Emotions (1980) extends Ekman's basic emotions by:
- A) Reducing the number of basic emotions to four
- B) Modelling emotion intensity levels and combinations of basic emotions *
- C) Replacing emotions with opinion targets
- D) Only classifying emotions as positive or negative

**Q19.** The survey paper most associated in the course with the overview of sentiment analysis methods from 2015 is:
- A) Feldman 2013
- B) Pang & Lee 2007
- C) Ravi & Ravi 2015 *
- D) Tsytsarau & Palpanas 2012

**Q20.** According to the course, in-domain sentiment analysis accuracy for hotel reviews can reach up to:
- A) 65%
- B) 78%
- C) 92% *
- D) 99%

**Q21.** Which of the following would be classified as a speech-act SIP verb?
- A) "think"
- B) "feel"
- C) "believe"
- D) "deny" *

**Q22.** The SNAP review datasets and Yelp dataset are mentioned in the course as:
- A) Named entity linking benchmarks
- B) Pretraining corpora for BERT
- C) Datasets for sentiment analysis *
- D) Topic modelling evaluation resources

**Q23.** Which of the following is a feature type specifically useful for detecting holders and targets in sentiment analysis?
- A) Character n-grams
- B) Document length
- C) Syntactic dependency relations (e.g., subject and object of SIP verbs) *
- D) TF-IDF of the entire vocabulary

**Q24.** According to Hilte et al. (2023), which pattern was observed in hateful content posting?
- A) Both males and females increase hate posting with age equally
- B) Males decrease hate posting with age; females remain stable
- C) Males increase hate posting with age (from ~0.2 to ~0.75); females remain stable (~0.5) *
- D) Age has no effect on hateful content for either gender

**Q25.** The code `pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")` returns:
- A) A list of topics with probabilities
- B) A BIO-labelled sequence of tokens
- C) A label (POSITIVE/NEGATIVE) and a confidence score *
- D) A word embedding for each token

**Q26.** TF*IDF-weighted term position (e.g., terms in the title or first/last sentences) is used in sentiment analysis as a feature because:
- A) Title and opening terms are more reliable indicators of overall document sentiment *
- B) POS tags are only reliable in the first sentence
- C) Lemmatisation only works on title terms
- D) Stop words appear only in titles

**Q27.** Which of the following is an example of an opinion lexicon/tool for English mentioned in the course?
- A) CoNLL 2003 dataset
- B) Reuters-21578
- C) Bing Liu's opinion lexicon *
- D) JRC-Acquis

**Q28.** Figurative language (metaphors, irony, metonymy) poses a challenge for sentiment analysis because:
- A) It is too infrequent to matter in practice
- B) Literal lexicon-based approaches assign incorrect polarity to figurative expressions *
- C) It only appears in scientific texts
- D) It is perfectly handled by Naive Bayes

**Q29.** The five classification problems for opinion extraction include: subjective text, opinion expression, holder, target, and:
- A) Document length
- B) Topic category
- C) Polarity (positive / negative) *
- D) Coreference chain

**Q30.** Which resource uses A-Labels such as EMOTION, MOOD, TRAIT, COGNITIVE STATE, and PHYSICAL STATE?
- A) VADER
- B) NRC Emotion Lexicon
- C) WordNet Affect *
- D) LIWC

**Q31.** The Brexit 2016 dataset example in the course shows that females were approximately how much more in favour (FOR) than males?
- A) Identical percentages
- B) Females 68% FOR; males 55% FOR *
- C) Females 55% FOR; males 68% FOR
- D) Both approximately 70% neutral

**Q32.** In the aspect-based analysis from SemEval, which of the following was a top restaurant aspect?
- A) battery life
- B) keyboard
- C) food *
- D) windows

**Q33.** Which statement about SVM for sentiment classification is consistent with the course?
- A) SVMs were rarely used before 2010
- B) SVMs are decoder-only models
- C) SVMs appeared in 55 articles in the Ravi & Ravi (2015) survey and yielded 72-92% in-domain accuracy *
- D) SVMs cannot handle BoW features

**Q34.** The concept of "opinion spam" in the Ravi & Ravi pipeline refers to:
- A) Opinions containing more than 100 words
- B) Opinions posted in multiple languages
- C) Fake or deceptive reviews designed to mislead consumers *
- D) Opinions classified by the wrong holder

**Q35.** Which code snippet correctly loads a Dutch sentiment analysis model in HuggingFace according to the course?
- A) `pipeline("ner", model="bert-large-cased-finetuned-conll03-english")`
- B) `pipeline("sentiment-analysis", model="wietsedv/bert-base-dutch-cased-finetuned-sentiment")` *
- C) `pipeline("text-generation", model="gpt2")`
- D) `pipeline("summarization", model="facebook/bart-large-cnn")`

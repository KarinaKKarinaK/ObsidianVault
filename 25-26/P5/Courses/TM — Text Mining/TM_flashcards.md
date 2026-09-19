# TM — Flashcards

[[TM — Index|← Back to TM Index]]

> 68 cards total. Format: **Front** → Back. Literature cards marked [LIT].

---

## Block 1 — Definitions & Terminology

**FC-01** What is Text Mining?
→ The process of converting **unstructured text** into **structured data** (information or knowledge). Goal: understand the technology, limitations, and build applications.

**FC-02** What is the difference between NLP and Text Mining?
→ **NLP** = engineering to address aspects of natural language (tokenisation, POS tagging, etc.). **Text mining** = broader goal of extracting structured information/knowledge from text using NLP as a tool.

**FC-03** Name four Python NLP toolkits.
→ **NLTK** (well-documented, teaching), **spaCy** (fast, industrial), **AllenNLP** (deep learning), **HuggingFace** (models + datasets, backed by Google). Utility: Scikit-learn, Gensim, Pandas.

**FC-04** What are the two main problems for Text Mining?
→ **Ambiguity** (one form, multiple meanings) and **Variation** (multiple forms, one meaning).

**FC-05** Define lexical ambiguity (polysemy). Give a stat.
→ A word has more than one meaning. The 121 most frequent English nouns have on average **7.8 meanings** each (Ng & Lee 1996, Princeton WordNet).

**FC-06** Define structural ambiguity. Give an example.
→ A sentence has more than one valid parse tree. Example: "Krelis waved at the cow **with a hat**" (does Krelis have the hat, or the cow?).

**FC-07** What is a morpheme?
→ The **smallest meaning-bearing unit** of language. "walked" = walk + -ed (two morphemes).

**FC-08** Free morpheme vs. bound morpheme?
→ **Free morpheme** = occurs independently (boy, walk). **Bound morpheme** = must attach to another morpheme (-ed, -ism); cannot stand alone.

**FC-09** Inflection vs. Derivation?
→ **Inflection** = modifies a word without changing its category (walk → walked; boy → boys). **Derivation** = creates a new word, often changes category (race → racism; essential → essentially).

**FC-10** What is Zipf's Law?
→ $f(w_i) = f(W_1) / r(w_i)$. The frequency of a word is proportional to 1/rank. Most frequent words make up ~80% of any text; they tend to be short with many meanings (stopwords).

**FC-11** Word forms ratio: English vs. Finnish?
→ English 2:1 (walk/walks/walked → 3 forms, 1 stem). Finnish/Turkish >200:1 (one verb root can have 200+ surface forms). Dutch/German 5:1.

**FC-12** What is Chunking (shallow parsing)?
→ A cheap and robust alternative to full parsing. Produces a **list of constituents up to depth 2** (typically) without generating a full syntactic tree. E.g.: [Krelis]NP [quickly waved]VP [at [the cow]NP]PP.

**FC-13** What are Open-class vs. Closed-class words?
→ **Open class** (add new words freely): Noun, Verb, Adjective, Adverb. **Closed class** (rarely change): Pronouns, Prepositions — fewer than 100 words per language.

**FC-14** Why is accuracy a misleading metric for imbalanced data?
→ If 99% of emails are not spam, a classifier that always says "not spam" achieves 99% accuracy while being completely useless. Precision and recall (or F1) are needed.

---

## Block 2 — Evaluation

**FC-15** Formula for Precision.
→ $P = \frac{tp}{tp + fp}$. Of all items the system said were positive, how many actually were?

**FC-16** Formula for Recall.
→ $R = \frac{tp}{tp + fn}$. Of all items that were actually positive, how many did the system find?

**FC-17** Formula for F1.
→ $F1 = \frac{2 \cdot P \cdot R}{P + R}$. Harmonic mean of precision and recall.

**FC-18** Macro averaging vs. micro averaging.
→ **Macro:** calculate P/R per class, then average → each class counts equally (use when small classes matter). **Micro:** pool all TPs and divide by TP+FP → each instance counts equally (use when class sizes are balanced).

**FC-19** What is Church 2021's key warning about evaluation?
→ Cross-validation alone is **not the real test**. True generalization must be tested on **out-of-domain data**. Performance drops >20% when shifting to a different domain (e.g. NERC on Wikinews).

**FC-20** High recall + low precision scenario. Give an example.
→ **Tsunami alert**: better to alarm too often than miss a real disaster. Topic classification also prioritises recall.

**FC-21** High precision + low recall scenario. Give an example.
→ **Spam filter with no false positives**: one legitimate email wrongly blocked = bad. Precision is maximised at the cost of missing some spam.

**FC-22** What is a contingency table (confusion matrix)?
→ A table with **gold labels** on one axis and **system output labels** on the other, showing TP, FP, FN, TN counts.

---

## Block 3 — NLP Pipeline

**FC-23** Name the 5 layers of the NLP pipeline in order.
→ Tokenisation → Lexical Analysis → Syntactic Analysis → Semantic Analysis → Pragmatic Analysis.

**FC-24** What is error propagation in NLP pipelines?
→ Errors in early pipeline modules (e.g. tokenisation) **cascade** to later modules. Propagated cross-folded benchmarks show significantly worse performance than isolated module benchmarks.

**FC-25** Name 3 problems with tokenisation.
→ Hyphens (nitty-gritty), contractions (don't, men's), encoding (UTF-8, diacritics), currency ($523.45), end-of-sentence hyphens, brackets ((semi-)irony).

**FC-26** Name 3 pipeline issues besides error propagation.
→ (1) Ambiguities not exploited (confidence scores ignored by downstream modules). (2) Conflicts between modules. (3) Complexity — input/output must be interoperable.

**FC-27** What are the 3 modules in a simple NER pipeline?
→ Tokenisation + Sentence Splitting → POS Tagging → Named Entity Recognition & Disambiguation.

**FC-28** What are the 4 modules in a sentiment analysis pipeline?
→ Tokenisation + Sentence Splitting → POS Tagging → Word Sense Disambiguation → Sentiment Analysis.

---

## Block 4 — Embeddings & Transformers

**FC-29** Static embeddings vs. contextual embeddings.
→ **Static (GloVe/Word2Vec):** one fixed vector per word type, regardless of context. **Contextual (BERT):** each token occurrence gets a different vector based on surrounding context → resolves word sense ambiguity.

**FC-30** What does GloVe stand for, and what does it capture?
→ **Global Vectors** for word representation. Trained on global word co-occurrence statistics. 300D vectors. Captures semantic analogy: king − man + woman ≈ queen.

**FC-31** BERT dimensions and layers.
→ BERT: **768 dimensions**, **12 layers and 12 attention heads**. Pre-trained via [MASK] token prediction.

**FC-32** What is fine-tuning?
→ Taking a **pre-trained language model** and training it further on a **small labelled dataset** for a specific downstream task (NER, sentiment, classification, etc.).

**FC-33** How does BERT tokenise "Ilia"?
→ BERT (WordPiece): ["Il", "##ia"]. XLM-RoBERTa (SentencePiece): ["▁Ili", "a"]. Sub-word tokenisation handles unknown words.

**FC-34** Name 5 tasks available in the HuggingFace pipeline API.
→ ner, sentiment-analysis, text-classification, fill-mask, question-answering, summarization, translation, zero-shot-classification, token-classification, text-generation.

---

## Block 5 — Sentiment / Subjectivity Mining

**FC-35** Define subjectivity (in Text Mining context).
→ All kinds of **social and emotional relationships** expressed when posting information. Broader than sentiment: includes opinions, emotions, stances, attributions.

**FC-36** Explicit vs. implicit sentiment. Give examples.
→ **Explicit:** "boundless energy" (pos), "ridiculous" (neg) — clearly marked. **Implicit:** "dies", "suffer" (neg inferred from event, not lexical marking).

**FC-37** What is a Source Introducing Predicate (SIP)?
→ A verb that introduces an opinion or claim: **speech-act verbs** (say, claim, state, deny, confirm) and **cognitive verbs** (think, believe, feel, hate, like).

**FC-38** Opinion structure: what are the 4 components?
→ **Holder → SIP → Sentiment → Target**. Example: "BMW spokesman (holder) said (SIP): 'excellent engine' (sentiment) about the new model (target)."

**FC-39** Holder types: Author vs. Participant.
→ **Author:** expresses their own opinion directly. **Participant:** emotions inferred from context — they are described as dying, suffering, celebrating.

**FC-40** What is agenda setting?
→ The author's **subjective choice** of what to mention or omit from a report — a form of implicit subjectivity.

**FC-41** Ekman's 6 basic emotions (1976).
→ **Anger, Disgust, Fear, Happiness, Sadness, Surprise**. Claimed to be cross-culturally universal.

**FC-42** What is Plutchik's Wheel of Emotions (1980)?
→ Model where emotions vary in **intensity** (ecstasy > joy > serenity) and can **combine** (love = joy + trust; submission = trust + fear).

**FC-43** What does WN-Affect label?
→ 11 A-label types including: EMOTION, MOOD, TRAIT, COGNITIVE STATE, PHYSICAL STATE, HEDONIC SIGNAL, EMOTION-ELICITING SITUATION, EMOTIONAL RESPONSE, BEHAVIOUR, ATTITUDE, SENSATION.

**FC-44** Which ML method was most used for sentiment analysis per Ravi & Ravi 2015?
→ **SVM** (55 out of 136 articles), followed by DBA (41) and Naïve Bayes (28). In-domain accuracy: 72–92%.

**FC-45** What is Cohen's κ? Give a high vs. low example from TM.
→ Inter-annotator agreement statistic correcting for chance. Hotel reviews doc-level: **κ=0.87** (high). Black Pete tweets: **κ=0.55–0.65** (moderate). News opinion expressions: **κ=0.70**.

**FC-46** Context dependence in sentiment. Give the classic example.
→ "Cold" person = negative. "Cold" soda = positive. Same word, opposite polarity. Solution: weak supervision or **double propagation** (propagate sentiment from known to unknown via syntactic dependencies).

**FC-47** Ravi & Ravi 2015: name the 4 steps of the sentiment analysis pipeline.
→ (1) Subjectivity classification → polarity determination. (2) Sentiment classification (ML/lexicon/hybrid). (3) Opinion spam detection. (4) Aspect extraction (ontology-based / non-ontology).

---

## Block 6 — Named Entity Recognition

**FC-48** Define: Entity, Reference, Named entity expression.
→ **Entity:** instance of a person, org, place, object, or incident in some world. **Reference:** communicative act to identify an entity. **Named entity expression:** definite noun phrases and proper nouns used to refer to entities.

**FC-49** What does NERC-D/L stand for?
→ **NER** (Recognition/Detection) + **NEC** (Classification) + **NEL/NED** (Entity Linking / Disambiguation). Plus **Coreference** resolution.

**FC-50** Name 5 entity types.
→ **People, Locations, Organisations, Time, Events**. No universal agreed-upon full set — FIGER has 112 fine-grained types.

**FC-51** What makes NER hard? Name 4 challenges.
→ **Variation** (IBM/"The Big Blue"), **Ambiguity** ("may may still rule in may"), **Extent** (nested entities), **Metonymy** ("US" = people/org/location), **Types** (fine-grained), **Time** (relative: "yesterday").

**FC-52** What is BIO/IOB tagging?
→ Sequence labelling scheme: **B** = Beginning of entity span, **I** = Inside span, **O** = Outside any entity. Example: "Apple B-ORG delayed O iPhone O 13 O".

**FC-53** BiLSTM+CRF architecture for NER. Describe it.
→ Char + GloVe Embeddings (300D) → Character LSTM → Left-to-right LSTM + Right-to-left LSTM → Concatenation → CRF Layer → BIO labels. (Lample et al. 2016)

**FC-54** What is an affix in the context of NER features?
→ **n-gram prefixes and suffixes** of words that capture morpho-syntactic patterns. Affixes help identify entity types: "isation" → probably not a person; "berg" → possibly a German location.

**FC-55** What are gazetteers in NERC?
→ **Lists of known entities and entity cues**: organisation names, person names, location names, person titles (Dr., President), organisation typical words (Inc., Corp.).

**FC-56** Which architecture outperforms hand-crafted feature engineering for NER?
→ **Feature-inferring NN models** (especially character + word + affix combinations) outperform feature-engineered models even without domain-specific rules. Best: Yadav et al. 2018, F1 ~91% on English CoNLL.

---

## Block 7 — Topic Modelling

**FC-57** What is the IPTC Media Topics taxonomy?
→ 1,200 terms, **17 top-level categories**, 4 levels deep, multi-language, continuously updated. Standard for news topic classification.

**FC-58** Name the 17 IPTC top-level topics.
→ arts/culture, conflict/war, crime/law, disaster/accident, economy/business, education, environment, health, human interest, labour, lifestyle/leisure, politics, religion/belief, science/technology, society, sport, weather.

**FC-59** What is LDA and what does it output?
→ **Latent Dirichlet Allocation** — probabilistic topic model. Outputs: (1) **P(words | topic)** — word distribution per topic; (2) **P(topics | document)** — topic distribution per document.

**FC-60** Supervised vs. unsupervised topic assignment: key trade-off.
→ **Supervised:** high performance, controlled topics, but cannot detect new topics and requires manual maintenance. **Unsupervised:** discovers hidden structure, but no control over what topics emerge.

**FC-61** What is multi-label text classification? How is it typically done?
→ A document can belong to multiple categories simultaneously. Implemented as **one-against-all** (binary classifier per class). Keyword extraction via TF×IDF.

**FC-62** What is JRC-Acquis?
→ A multilingual corpus of EU legal documents in 22 official EU languages, **multi-label**, using the EuroVoc thesaurus as topic taxonomy.

---

## Block 8 — Literature Cards

**FC-63** [LIT] Wolf et al. 2020
→ HuggingFace Transformers library provides a **unified API** for 10,000+ pre-trained models across all major transformer architectures (BERT, GPT, T5...). Works with PyTorch and TensorFlow. Key contribution: democratised access to fine-tuned NLP models.

**FC-64** [LIT] Church, Chen & Ma 2021
→ "Emerging trends: A gentle introduction to fine-tuning." Key claims: (1) Fine-tuning pre-trained LMs achieves SOTA on NLP tasks. (2) **Cross-validation alone is not the real test** — out-of-domain performance is what matters. (3) Performance drops >20% with domain shift.

**FC-65** [LIT] Lample et al. 2016 (NAACL)
→ "Neural Architectures for NER." Introduced **BiLSTM + CRF** with character embeddings. Character-level features capture morpho-syntactic and word shape properties. Outperformed feature-engineered CRFs.

**FC-66** [LIT] Nadeau & Sekine 2007
→ Comprehensive survey of NERC. Defined the standard **feature taxonomy** for NERC: word-level features (case, shape, punctuation), gazetteers (entity lists, entity cues), and document features (multiple occurrences, local syntax, meta-information).

**FC-67** [LIT] Ravi & Ravi 2015
→ Survey of sentiment analysis. Key findings: (1) 4-step pipeline for sentiment analysis. (2) **SVM most popular** (55/136 papers). (3) In-domain accuracy 72–92%. (4) Identified 5 classification problems for opinion extraction.

**FC-68** [LIT] Maynard, Derczynski & Bontcheva 2016
→ NLP for Semantic Web. Key figure: **performance vs. complexity curve** — BoW (~90%) declines to events (~30%). Two fundamental TM problems: Ambiguity & Variation. Structural vs. lexical ambiguity distinction.

# Cram Card — Text Mining Exam (27 May)

Ultra-dense single-page reference. Pulls the highest-yield items from [[Glossary]], [[Exam Recap — Cheatsheet]] and [[Wrong Answers — Review]]. Read this last.

---

## Formulas (memorise exactly)

**Precision** = TP / (TP + FP) — *of what I predicted positive, how many were right*
**Recall** = TP / (TP + FN) — *of what was actually positive, how many did I catch*
**F1** = 2·P·R / (P+R) = 2·TP / (2·TP + FP + FN)
**Accuracy** = (TP + TN) / total *(misleading on imbalanced data)*

**Macro-F1** = average per-class F1 (equal weight per class)
**Micro-F1** = pool TP/FP/FN across classes, then compute (dominated by majority class)

**TF-IDF**(w, d) = tf(w, d) · log( N / df(w) )
→ high for words frequent in *this* doc and rare *across* the corpus
→ word in every doc → IDF = log(N/N) = 0 → killed

**PMI**(w₁, w₂) = log[ P(w₁, w₂) / (P(w₁) · P(w₂)) ]
→ joint over product-of-marginals, then log
→ NOT a conditional probability ratio

**Cosine sim** = direction (angle), not magnitude. Preferred over Euclidean because magnitude is noise.

---

## Lexical relations table (the -onymy zoo)

| Term | Direction | Example |
|---|---|---|
| Synonymy | A = B | *car / automobile* |
| Antonymy | A ↔ ¬B | *hot / cold* |
| **Hyponymy** | A ⊂ B, A is child (more specific) | *tulip* is hyponym of *flower* |
| **Hypernymy** | A ⊃ B, A is parent (more general) | *flower* is hypernym of *tulip* |
| **Meronymy** | A ⊂ B, A is part | *wheel* is meronym of *car* |
| **Holonymy** | A ⊃ B, A is whole | *car* is holonym of *wheel* |
| Homonymy | one form, *unrelated* meanings | *bank* (financial / river) |
| Polysemy | one form, *related* meanings | *head* (body / department / queue) |
| Homophony | same sound | *flower / flour* |
| Homography | same spelling | *lead* (metal / verb) |

**Mnemonics**: hypo=under (specific), hyper=over (general), mero=part, holo=whole.

---

## Morphology

| Process | What it does | Example |
|---|---|---|
| **Inflection** | grammatical variation, same lexeme | *walk → walked*, *dog → dogs* |
| **Derivation** | new word, often new POS | *happy → happiness*, *un- + happy → unhappy* |
| **Compounding** | two stems joined | *blackboard*, *raincoat* |
| **Cliticisation** | bound form attached | *I'll, don't, Mary's* |

*unhappily* from *happy* = **two derivational steps**: prefix un- + suffix -ly.
*teacher* from *teach* = derivation (-er suffix).

---

## Pragmatics

| Term | Definition | Example |
|---|---|---|
| **Metaphor** | mapping across unrelated domains | *time is money* |
| **Metonymy** | related concept, name slides | *White House said* = administration |
| **Synecdoche** | whole-for-part or part-for-whole | *all hands on deck* |
| **Implicature** | implied, not stated | *"It's cold in here"* → close the window |
| Irony | opposite of meant | "lovely weather" in storm |
| Sarcasm | mocking irony | "great job!" after mistake |

**Metonymy in NER**: *Holland* (country LOC) → *Holland* (government ORG) — same name, related concepts, type slides.
**Ambiguity in NER**: *Paris* (city) vs *Paris* (person) — same form, unrelated entities.
**Variation in NER**: *NY / NYC / Big Apple / The City* — different forms, one entity.

---

## NER essentials

**Tasks**: NER (find span) → NEC (classify type PER/LOC/ORG/MISC) → NEL/NED (link to KB entry) → coreference (link expressions of same entity).

**BIO tagging rules (LEGAL vs ILLEGAL):**
- `B-X I-X I-X` ✓ — clean entity
- `O O B-PER` ✓ — O can precede anything
- `B-PER I-PER O` ✓ — entity then outside
- `O I-PER ...` ✗ — I cannot follow O (must follow B or I of *same type*)
- `B-LOC I-PER` ✗ — I type must match its B

**Word shape**: spaCy → `xxxXx`, COVID-19 → `XXXXX-dd`, Joe → `Xxx`, 12-10-2007 → `dd-dd-dddd`.

**Standard CRF features**: case, shape, suffix, POS, IOB of ±1 context. **Word length is not typical.**

**CoNLL 2003 evaluation**: strict span AND type must match exactly. Partial doesn't count.

**NER error types**:
- **Type error**: right span, wrong class
- **Boundary error**: right type, wrong span
- **Spurious (FP)**: invented entity
- **Miss (FN)**: missed gold entity

**Nested entities**: BIO can't represent entities containing other entities.

**Why NER hard**: variation, ambiguity, extent/nesting, type set is open, time expressions, metonymy.

**Lample et al. (2016)**: BiLSTM-CRF, word + character embeddings → captures morphology and shape.

**FIGER**: 112 fine-grained types in a 2-level hierarchy.

**AIDA / AGDISTIS**: graph-based joint entity linking (coherence across all mentions in document).

---

## Sentiment / Subjectivity

**Subjectivity > sentiment.** Sentiment is one slot under the subjectivity umbrella (stance, emotion, judgement, agenda, opinion, argumentation, attribution).

**Opinion = Holder + Judgement + Target.** Not subject/verb/object.

**SIP (Source Introducing Predicate)** — verb linking holder to claim:
- **Speech-act SIP**: *say, claim, promise, deny, confirm, announce, assert*
- **Cognitive SIP**: *think, believe, hate, like, love, fear, know*

**Negation words** (flip polarity): *not, never, no, neither*. Not intensifiers.

**Negation scope** = span of text whose polarity is inverted by a negation expression.

**Implicit sentiment** = sentiment conveyed through described events/situations, no explicit opinion words.

**Ekman (1976)**: 6 basic emotions — happiness, sadness, anger, fear, surprise, disgust.
**Plutchik (1980)**: 8 basic + intensity gradients (serenity → joy → ecstasy) + mixtures (joy + trust = love). **Plutchik is the more complex one** — wheel with opposites across, intensity radial.

**Ravi & Ravi (2015) pipeline stages**: subjectivity classification, sentiment classification, aspect extraction, opinion spam detection, opinion summarisation. **Not** named entity linking.
**Most common Ravi & Ravi approach**: SVM.

**Resources**:
- **VADER** — rule-based, social media (emoji, ALL CAPS, intensifiers). Threshold ±0.05.
- **NRC Emotion Lexicon** — 8 Plutchik emotions + 2 polarity, crowdsourced.
- **Bing Liu** — English pos/neg word lists.
- **MPQA** — annotated private-state expressions (opinions, beliefs, sentiments) in news.
- **WordNet Affect** — A-Labels (EMOTION, MOOD, TRAIT, …).
- **LIWC** — psychological categories.
- **wietsedv/bert-base-dutch-cased-finetuned-sentiment** — Dutch sentiment via HuggingFace.

---

## Topic Modelling & Classification

**Text categorisation (supervised)** — labels given a priori (BoW/TF-IDF → classifier).
**Topic modelling (unsupervised)** — topics emerge from clustering.

**Predefined categories ⇒ supervised.** Don't pick LDA for "classify into 10 predefined areas" — that's BERT fine-tuning.

**Multi-label classification** = one-vs-all (one binary classifier per label).
**Multi-class single-label** = softmax over classes.

**LDA**:
- Matrix factorisation: M ≈ A · B
- A = document-topic matrix (rows = docs, cols = K topics)
- B = topic-word matrix (rows = topics, cols = vocab)
- K fixed in advance
- **Alpha (α)** = doc-topic Dirichlet prior. **Low α → docs concentrate on few topics. High α → docs spread over many.**
- **Beta (β)** = topic-word prior. Low β → narrow topics. High β → broad topics.
- Inference: Gibbs sampling (gensim) or variational (sklearn).
- Outputs **K topic-word distributions + one doc-topic distribution per document.**
- **Hyperparameter search for K**: try several values, evaluate coherence and perplexity.

**LDA limitations**: K fixed, unstable across runs (random init), topics independent, BoW only.

**LDA variants — what each fixes**:
| Variant | Fixes |
|---|---|
| **CTM** (Correlated Topic Model) | topic independence — uses logistic-normal instead of Dirichlet |
| **Hierarchical LDA** | flat granularity, infers hierarchy |
| **ETM / lda2vec** | data sparseness — embedding-based |
| **BTM / DMM** | short texts (tweets) — one topic per message |
| **DTM** (Dynamic Topic Model) | topics drifting over time (e.g. news across decades) |

**BERTopic**:
- Sentence embeddings → UMAP → HDBSCAN clustering → c-TF-IDF per cluster
- **No K needed** (HDBSCAN determines it)
- Wins: semantic representations, K-free, robust to short text, sparse co-occurrence
- **Loses to LDA on**: proper probabilistic topic-word distributions (c-TF-IDF is not a probability distribution)

**LSA / LSI**: SVD on doc-word matrix, latent dimensions are not interpretable. LDA = probabilistic with interpretable topics.

**Evaluation**: perplexity (lower = better fit), topic coherence (higher = more interpretable, PMI-based).

**Datasets**:
- **AG News**: **4** classes (World, Sports, Business, Sci/Tech), ~**120K** train. (14 classes / 560K is **DBpedia** — don't confuse.)
- **IPTC Media Topics**: **17** top-level, **1,200** terms, **4** levels deep.
- **Reuters-21578**: classic news, dominated by *earn, acq, money-fx, grain, crude*.
- **Newsbrief / EMM**: real-time news, updated every **10 minutes**.
- **SemEval 2014 Task 4 (ABSA)**: **laptops + restaurants**.

---

## Transformers (high level)

- **Self-attention**: each token has Q (query, "what am I looking for"), K (key, "what do I expose"), V (value, "what content I carry"). Score = QKᵀ / √d_k, softmax, weighted sum of Vs.
- **√d_k**: prevents softmax saturation → avoids vanishing gradients.
- **Layer norm**: applied to output of each sub-layer (attention + FFN) before passing on.
- **Feed-forward sub-layer**: position-wise non-linear transformation, applied independently per token.
- **BERT pretraining**: MLM with ~**15%** of tokens masked.
- **ELMo**: deep bidirectional LSTM, language modelling objective, layer reps weighted per task.
- **XLM-RoBERTa**: massively multilingual (100 languages), good for cross-lingual token classification (e.g. Dutch NER).
- **DistilBERT**: smaller, faster BERT.

---

## Evaluation / data essentials

**Cohen's Kappa scale**:
| κ | Agreement |
|---|---|
| < 0 | poor |
| 0.00–0.20 | slight |
| 0.21–0.40 | fair |
| **0.41–0.60** | **moderate** |
| 0.61–0.80 | substantial |
| 0.81–1.00 | almost perfect |

**Data tiers**: Gold (humans), Silver (semi-auto + human check), Bronze (auto).

**Train / Dev / Test**:
- **Train**: fit model
- **Dev / validation**: tune hyperparameters, design decisions
- **Test**: final evaluation only — never tune on it

**Error propagation**: early module with low accuracy feeds noisy output to many downstream modules → cascade.

**Cross-domain NER drop**: up to 20 F1 points. Caused by different capitalisation, entity types, vocabulary distributions (CoNLL newswire vs Wikinews).

---

## Numbers to remember

| Stat | Value |
|---|---|
| WordNet *person* | ~5,000 words |
| WordNet *movements* | ~4,000 |
| WordNet *noise* | ~2,000 |
| Most ambiguous noun | *head*, **33** senses |
| Most ambiguous word overall | *break*, **59** verb senses |
| IPTC top-level / total / depth | **17** / **1,200** / **4** |
| FIGER fine-grained types | **112** |
| AG News classes / size | **4** / **~120K** |
| BERT MLM mask rate | **15%** |
| CRF c1 = c2 default | **0.1** |
| Hotel sentiment Kappa | **0.87** |
| Hotel sentiment doc-level accuracy | up to **92%** |
| Best CoNLL 2003 feature F1 | **91.36** (Agerri & Rigau) |
| Cross-domain NER F1 drop | up to **20 pts** |
| VADER threshold | **±0.05** |

---

## MC trap patterns (read before going in)

1. **"Predefined" / "given labels" → supervised.** Never pick LDA or BERTopic.
2. **NOT-question**: pick the option that's *false* about the subject, not the option that sounds odd.
3. **All-of-the-above**: pick it when 2+ options clearly true; **avoid** when the question says "specifically" or "primarily."
4. **Long-option preference**: when two options paraphrase each other, pick the longer, more-caveated one.
5. **Direction flips**: TF-IDF (rare across corpus, not frequent), subjectivity > sentiment (not reverse), Ekman = 6 basic / Plutchik = wheel with intensity.
6. **Don't pick the biggest number** for dataset stats — AG News is small.
7. **Ambiguity vs metonymy**: ambiguity = unrelated meanings, metonymy = related.
8. **BIO sequence**: I-X only after B-X or I-X of same type.
9. **Macro vs micro F1**: macro = equal weight per class; micro = pooled.
10. **PMI** = log of (joint / product-of-marginals). Not conditional ratios.

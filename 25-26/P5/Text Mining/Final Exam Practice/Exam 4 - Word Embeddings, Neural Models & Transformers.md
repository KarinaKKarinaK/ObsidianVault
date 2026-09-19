# Exam 4 — Word Embeddings, Neural Models & Transformers
*35 questions | Correct answer marked with \**

---

**Q1.** Firth's (1957) distributional hypothesis, the basis for word embeddings, states:
- A) Words with the same spelling have the same meaning
- B) A word's meaning can be determined by the company it keeps (its contexts) *
- C) All words share a universal semantic core
- D) Word meaning is fully determined by morphological structure

**Q2.** Context vectors represent a word's meaning by:
- A) Its position in a dictionary
- B) Its one-hot index in the vocabulary
- C) Co-occurrence counts with other words in a window *
- D) The POS tag most frequently assigned to it

**Q3.** Given word vectors cat=[0.1,0.4,0.3,0.9] and dog=[0.1,0.3,0.4,0.8], their semantic similarity would be assessed as:
- A) Very dissimilar (opposite vectors)
- B) Identical (same vector)
- C) High (vectors are close in the embedding space) *
- D) Not computable without knowing vocabulary size

**Q4.** Word2Vec training creates "positive pairs" consisting of:
- A) A word and a random word from another document
- B) A word and a word that appears near it in the same context *
- C) A word and its antonym
- D) A word and its lemma

**Q5.** In Word2Vec, the hidden layer typically has how many nodes?
- A) Exactly 100
- B) 300 *
- C) 768
- D) Vocabulary size

**Q6.** The analogy task "king − man + woman = ?" in word embeddings is solved by:
- A) Looking up the answer in WordNet
- B) Performing arithmetic on embedding vectors and finding the closest result *
- C) Running a sentiment classifier
- D) Applying a CRF over the token sequence

**Q7.** A key limitation of static word embeddings (word2vec, GloVe) is that:
- A) They cannot be used as input to any classifier
- B) They require more than 1 billion training examples
- C) They assign one fixed vector per word type regardless of context, failing to distinguish senses *
- D) They only work for English

**Q8.** Bag-of-embeddings creates a document representation by:
- A) Using the last token's embedding as the document embedding
- B) Averaging all token embeddings in the document into a single vector *
- C) Concatenating all token embeddings
- D) Multiplying token embeddings element-wise

**Q9.** For the document "Vaccines are safe", with word vectors [0.23,0.45,0.21,0.78], [0.12,0.34,0.11,0.32], [0.01,0.41,0.05,0.91], the averaged embedding's first dimension is:
- A) 0.36
- B) 0.12
- C) 0.12 *
- D) 0.23

**Q10.** A CNN applied to text typically uses a sliding context window to:
- A) Tokenise the raw text
- B) Extract local n-gram features at multiple scales *
- C) Compute attention between all token pairs
- D) Perform sentence splitting

**Q11.** In an LSTM encoder-decoder for machine translation, what does the encoder produce?
- A) The translated output tokens one by one
- B) A fixed-size representation summarising the source sentence *
- C) BIO labels for named entities in the source
- D) Topic probabilities for the document

**Q12.** The self-attention mechanism in Transformers (Vaswani et al. 2017) allows:
- A) Only the previous token to influence the current token's representation
- B) Each token to attend to all other tokens simultaneously *
- C) Convolutional filters to scan the input
- D) Recurrent hidden states to be updated step by step

**Q13.** In scaled dot-product attention, dividing the dot product scores by √d_k prevents:
- A) Negative scores from appearing
- B) Large dot products from pushing softmax into saturation, causing vanishing gradients *
- C) The model from attending to padding tokens
- D) Positional encoding from dominating

**Q14.** Why do Transformer models require positional encodings?
- A) To embed word meanings more accurately
- B) Because self-attention is order-invariant and needs explicit position information injected *
- C) To handle out-of-vocabulary words
- D) To perform faster inference

**Q15.** BERT's masked language modelling objective masks approximately what fraction of tokens?
- A) 5%
- B) 15% *
- C) 30%
- D) 50%

**Q16.** Which of the following is a BERT-style (encoder) model rather than a GPT-style (decoder) model?
- A) GPT-3
- B) OPT
- C) RoBERTa *
- D) LLaMA

**Q17.** BERT-base has which of the following specifications?
- A) 300 dimensions, 6 layers, 6 attention heads
- B) 768 dimensions, 12 layers, 12 attention heads *
- C) 1024 dimensions, 24 layers, 16 attention heads
- D) 512 dimensions, 8 layers, 8 attention heads

**Q18.** The [CLS] token in BERT is used for:
- A) Marking the beginning of each named entity
- B) Separating two sentences in the NSP task and as the sentence-level classification representation *
- C) Replacing masked tokens during pretraining
- D) Encoding positional information

**Q19.** GPT-style models differ from BERT-style models in that GPT uses:
- A) Bidirectional self-attention seeing all tokens
- B) Masked self-attention attending only to left context (autoregressive, decoder-only) *
- C) A cross-attention mechanism between encoder and decoder
- D) Character-level tokenisation exclusively

**Q20.** Transfer learning in NLP involves:
- A) Translating training data from one language to another
- B) Pre-training on massive unlabelled data then fine-tuning on a small labelled task dataset *
- C) Transferring labelled data from one annotator to another
- D) Using the same model architecture for all tasks without any task-specific training

**Q21.** Fine-tuning for token classification (e.g., NERC) with BERT works by:
- A) Using the [CLS] token output for the entire document
- B) Using each token's final hidden state to predict an IOB label *
- C) Running a separate classifier on the mean of all hidden states
- D) Only fine-tuning the first two layers of BERT

**Q22.** WordPiece tokenisation (used by BERT) handles rare or unseen words by:
- A) Replacing them with a single [UNK] token
- B) Decomposing them into known subword units (e.g., "playing" → "play", "##ing") *
- C) Looking them up in a gazetteer
- D) Assigning them the embedding of the most similar known word

**Q23.** ELMo differs from word2vec because:
- A) ELMo uses convolutional networks; word2vec uses recurrent networks
- B) ELMo produces context-sensitive embeddings via a bidirectional LSTM; word2vec produces static vectors *
- C) ELMo was trained on images; word2vec on text
- D) ELMo uses byte-pair encoding; word2vec uses characters

**Q24.** The approximate parameter count of GPT-3 is:
- A) 110 million
- B) 1.5 billion
- C) 11 billion
- D) 175 billion *

**Q25.** Which HuggingFace pipeline task string is used to run a NERC classifier in the course?
- A) "text-generation"
- B) "summarization"
- C) "ner" or "token-classification" *
- D) "audio-classification"

**Q26.** When the HuggingFace NER pipeline outputs sub-tokens for a word like "Ilia", the "##" prefix indicates:
- A) The token is the beginning of a new entity
- B) The token is a continuation subword that should be merged with the preceding piece *
- C) The token was masked during pretraining
- D) The token has a negative sentiment score

**Q27.** The course notes state that within-task and in-domain pretraining (ITPT) before fine-tuning:
- A) Has no effect on downstream performance
- B) Hurts performance by overfitting to domain-specific patterns
- C) Boosts downstream performance compared to fine-tuning from generic pretraining alone *
- D) Can only be applied to sentiment classification

**Q28.** "Catastrophic forgetting" in the context of fine-tuning refers to:
- A) A neural network forgetting the input text during inference
- B) The model's pretrained weights being overwritten by large gradient updates during fine-tuning *
- C) The training data being accidentally deleted
- D) The model forgetting classes seen early in a multi-task curriculum

**Q29.** Byte-Pair Encoding (BPE), used by GPT-2 and later models, builds a vocabulary by:
- A) Splitting all words into individual characters only
- B) Iteratively merging the most frequent adjacent byte pairs into new subword units *
- C) Using the WordNet synset ID for each word
- D) Assigning each document a unique token

**Q30.** Which statement about model size progression is correct per the course?
- A) BERT-Large → GPT-2 → T5 → GPT-3 in increasing parameter count *
- B) GPT-3 → BERT-Large → T5 → GPT-4 in increasing parameter count
- C) T5 → ELMo → BERT-Large → GPT-2 in increasing parameter count
- D) All listed models have approximately the same parameter count

**Q31.** GloVe trains word embeddings from:
- A) Local context-window prediction (predicting neighbours)
- B) Sentence-pair classification tasks
- C) Global word-word co-occurrence statistics *
- D) BIO-tagged sequence data

**Q32.** The XLM-RoBERTa model is notable in the course because:
- A) It only works for English named entity recognition
- B) It is a cross-lingual model that can be applied to Dutch and other languages via the same pipeline *
- C) It uses character-level tokenisation only
- D) It is a decoder-only model like GPT

**Q33.** Which of the following is one of the pretraining datasets used by large language models mentioned in the course?
- A) CoNLL 2003 (Reuters NER annotations)
- B) Common Crawl *
- C) SemEval 2014 task 4 (restaurant reviews)
- D) VADER lexicon

**Q34.** What is the key advantage of BERT-large over BERT-base for downstream NLP tasks?
- A) BERT-large uses a different training objective (NSP only, no MLM)
- B) BERT-large has more layers (24) and attention heads (16), giving richer representations at the cost of more compute *
- C) BERT-large uses byte-pair encoding while BERT-base uses WordPiece
- D) BERT-large is decoder-only and better suited for text generation

**Q35.** According to the lecture notes, the Billion Word Benchmark and Book Corpus are used as:
- A) Named entity annotation datasets
- B) Evaluation benchmarks for sentiment classification
- C) Pretraining corpora for large language models *
- D) Topic taxonomies for news classification

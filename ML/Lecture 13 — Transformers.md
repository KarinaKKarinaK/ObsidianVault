## 1) Self-attention: the core idea

RNNs process sequences one step at a time (sequential bottleneck). ==**Self-attention**== lets every position attend to every other position in parallel.

*// In an RNN, word 50 can only "see" word 1 through a chain of 49 hidden states — information degrades. In self-attention, word 50 can directly look at word 1 in a single step.*

### Simple self-attention

Given a sequence of input vectors $\mathbf{x}_1, \dots, \mathbf{x}_T$, the output at position $i$ is a ==**weighted sum of all inputs**==:

$$\mathbf{y}_i = \sum_j w_{ij} \mathbf{x}_j$$

The weights $w_{ij}$ measure how much position $i$ should "attend to" position $j$.

### Computing attention weights

1. **Raw similarity**: use the dot product as a similarity score:
$$w'_{ij} = \mathbf{x}_i^\top \mathbf{x}_j$$

2. **Normalize**: apply softmax so weights sum to 1:
$$w_{ij} = \frac{e^{w'_{ij}}}{\sum_k e^{w'_{ik}}}$$

*// "For each position, look at all other positions, decide which ones are relevant (high dot product = similar), and take a weighted average." It's a soft version of a lookup table.*

### Vectorized form

$$W' = X^\top X, \quad W = \text{softmax}(W'), \quad Y^\top = W X^\top$$

where $X$ is the matrix of input vectors and softmax is applied row-wise.

> [!important] Properties of simple self-attention
> - ==**No parameters**== (in the simple version) — weights come purely from input similarity
> - ==**No positional information**== — treating the sequence as a set (order doesn't matter)
> - ==**Permutation equivariant**== — permuting the input permutes the output the same way
> - **Linear operation path** — information flows directly, no vanishing gradients

---

## 2) Standard self-attention (Keys, Queries, Values)

Simple self-attention uses the same vectors for everything. Standard self-attention adds ==**learned transformations**== to give the model flexibility.

### Three roles

Each input $\mathbf{x}_i$ is projected into three different roles:

$$\mathbf{q}_i = Q\mathbf{x}_i \quad \text{(query: "what am I looking for?")}$$
$$\mathbf{k}_i = K\mathbf{x}_i \quad \text{(key: "what do I contain?")}$$
$$\mathbf{v}_i = V\mathbf{x}_i \quad \text{(value: "what do I provide if selected?")}$$

where $Q, K, V$ are ==learned parameter matrices==.

### Scaled dot-product attention

$$w'_{ij} = \frac{\mathbf{q}_i^\top \mathbf{k}_j}{\sqrt{k}}$$

$$w_{ij} = \text{softmax}_j(w'_{ij})$$

$$\mathbf{y}_i = \sum_j w_{ij} \mathbf{v}_j$$

> [!important] Why scale by $\sqrt{k}$?
> Without scaling, dot products grow with the embedding dimension $k$, pushing softmax into saturated regions where gradients vanish. Dividing by $\sqrt{k}$ keeps the variance manageable.
>
> *// If $k = 512$, raw dot products could be in the hundreds. Softmax of [300, 301, 299] is basically [0, 1, 0] — completely peaked. Dividing by $\sqrt{512} \approx 22$ brings them back to a reasonable range.*

### Why three separate projections?

*// Query and key don't have to be the same projection. This means "what I'm searching for" can be different from "what I advertise to others." And the value lets the information passed forward be different from what's used to compute relevance. This flexibility is crucial.*

---

## 3) Multi-head attention

Instead of one attention operation, run ==**multiple attention heads in parallel**==, each with its own $Q, K, V$ matrices:

$$\text{head}_h = \text{Attention}(Q_h X, K_h X, V_h X)$$
$$\text{MultiHead}(X) = \text{concat}(\text{head}_1, \dots, \text{head}_H) W^O$$

> [!tip] Why multiple heads?
> Each head can attend to ==different aspects== of the input:
> - Head 1 might capture syntactic dependencies (subject-verb)
> - Head 2 might capture semantic similarity
> - Head 3 might capture positional relationships
>
> *// One pair of eyes can only focus on one thing at a time. Multiple heads = multiple pairs of eyes, each looking at different relationships simultaneously.*

---

## 4) The transformer block

A single transformer block consists of:

$$\text{output} = \text{LayerNorm}(\mathbf{x} + \text{FeedForward}(\text{LayerNorm}(\mathbf{x} + \text{MultiHeadAttention}(\mathbf{x}))))$$

### Components

| Component | Role |
|---|---|
| **Multi-head self-attention** | Token interaction (global context) |
| **Feed-forward network** | Per-position nonlinear transformation (2-layer MLP) |
| **Residual connections** | ==$\mathbf{x} + f(\mathbf{x})$==; gradient highway, easier training |
| **Layer normalization** | Stabilize activations; normalize across features per position |

> [!important] Residual connections
> The $\mathbf{x} + f(\mathbf{x})$ pattern means information can ==skip the layer entirely== via the "+" path. This:
> - Makes deep networks trainable (gradients flow through the shortcut)
> - Lets each layer learn a **correction** to the identity, rather than a full transformation
>
> *// Same idea as ResNets in CNNs. Without residuals, stacking 24 transformer blocks would be very hard to train.*

### Stacking

A full transformer = many blocks stacked. BERT uses 24 blocks; GPT-3 uses 96. Each block refines the representations.

---

## 5) Position embeddings

Self-attention treats its input as a ==set== (permutation equivariant). But word order matters! Solution: ==**add position information**== to the input embeddings.

$$\mathbf{x}_i' = \mathbf{x}_i + \mathbf{p}_i$$

where $\mathbf{p}_i$ is a position embedding for position $i$.

Options:
- **Learned**: treat positions as tokens with trainable embeddings (most common)
- **Sinusoidal** (original transformer): use sine/cosine functions at different frequencies

*// Without position embeddings, "the cat sat on the mat" and "the mat sat on the cat" would produce identical outputs. Position embeddings break this symmetry.*

---

## 6) Tokenization

### The problem

Neural networks work with fixed vocabularies, but language is open-ended. How do you handle words you've never seen?

### Approaches

| Method | Unit | Vocab size | Trade-off |
|---|---|---|---|
| **Word-level** | Whole words | Large (100K+) | Can't handle unseen words (OOV) |
| **Character-level** | Single characters | Tiny (~100) | Very long sequences; hard to learn meaning |
| **Sub-word** | Word pieces | Medium (30–50K) | ==Best of both worlds== |

### Sub-word tokenization

==**Byte Pair Encoding (BPE)**==:
1. Start with character-level vocabulary
2. Count all adjacent pairs; merge the most frequent pair into a new token
3. Repeat for a fixed number of merges

*// "unhappiness" might become ["un", "happi", "ness"]. Common words stay whole ("the"), rare words get split into familiar pieces. You never encounter a truly unknown token.*

**WordPiece** (used by BERT): similar to BPE but merges based on likelihood rather than frequency.

---

## 7) BERT (Bidirectional Encoder)

### Architecture

- 24 transformer blocks, dimension 1024, 16 attention heads
- ==340M parameters==
- Processes the ==entire sequence bidirectionally== (every token can attend to every other token)

### Pre-training: Masked Language Model (MLM)

> [!important] BERT's pre-training task
> Randomly ==corrupt 15% of tokens== (replace with [MASK], a random token, or keep unchanged), then predict the original tokens.
>
> *// Like a fill-in-the-blank exercise: "The [MASK] sat on the mat" → predict "cat." Because attention is bidirectional, the model uses both left AND right context to fill in the blank.*

### Fine-tuning for classification

1. Prepend a special ==[CLS] token== to the input
2. The transformer processes the whole sequence
3. Take the [CLS] token's final representation → feed through a small classification head
4. ==Fine-tune the entire model== (pre-trained weights + new classification head) on labeled data

*// Pre-training learns general language understanding from billions of words. Fine-tuning adapts it to your specific task (sentiment, NER, etc.) with much less data.*

> [!abstract] Why BERT was revolutionary
> - One pre-trained model for many tasks (transfer learning)
> - Bidirectional context (unlike left-to-right language models)
> - State-of-the-art on 11 NLP benchmarks when released (2018)

---

## 8) Causal self-attention (for generation)

For autoregressive generation (predicting the next token), position $i$ must ==not see positions $> i$==. This is enforced by **masking**:

$$w'_{ij} = \begin{cases} \mathbf{q}_i^\top \mathbf{k}_j / \sqrt{k} & \text{if } j \leq i \\ -\infty & \text{if } j > i \end{cases}$$

After softmax, $-\infty$ becomes 0 → future positions contribute nothing.

*// Cover the upper-right triangle of the attention matrix with $-\infty$. Each position can only attend to itself and earlier positions. This is what makes left-to-right generation possible.*

---

## 9) GPT (Generative Pre-trained Transformer)

### Architecture

Same transformer blocks as BERT, but with ==**causal (masked) self-attention**== instead of bidirectional.

### Pre-training: autoregressive language modeling

$$p(x_1, \dots, x_T) = \prod_{t=1}^T p(x_t \mid x_1, \dots, x_{t-1})$$

The model predicts the next token at every position — the standard language modeling objective from Lecture 8, now powered by transformers instead of n-grams.

### BERT vs GPT

| | BERT | GPT |
|---|---|---|
| Attention | ==Bidirectional== | ==Causal (left-to-right)== |
| Pre-training task | Masked language model (fill in blanks) | Next token prediction |
| Strength | Understanding / classification | ==Generation== |
| Use case | Encode a sentence → classify, extract, compare | Generate text, complete prompts |

*// BERT reads the whole sentence at once (like reading a paragraph). GPT reads left-to-right and predicts what comes next (like writing a story one word at a time). Different tools for different jobs.*

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **Self-attention** | $\mathbf{y}_i = \sum_j w_{ij} \mathbf{v}_j$; weighted sum over all positions |
| **Attention weights** | Dot product similarity → softmax → weights that sum to 1 |
| **Scaled dot product** | Divide by $\sqrt{k}$ to prevent softmax saturation |
| **KQV** | Query (what I want), Key (what I have), Value (what I give) |
| **Multi-head attention** | Multiple parallel attention operations; different "perspectives" |
| **Transformer block** | Self-attention + FFN + residual connections + layer norm |
| **Residual connections** | $\mathbf{x} + f(\mathbf{x})$; gradient highway for deep networks |
| **Position embeddings** | Added to inputs to encode ordering (attention is order-blind) |
| **BPE tokenization** | Merge frequent character pairs; sub-word vocabulary |
| **BERT** | Bidirectional; MLM pre-training; [CLS] for classification; fine-tuning |
| **Causal attention** | Mask future positions ($-\infty$); enables left-to-right generation |
| **GPT** | Causal transformer; autoregressive next-token prediction |

---

## Related Notes
- [[Robotics/08 - Key Subfields & Concepts]] — VLA models (Vision-Language-Action): transformers applied to robot control
- [[Robotics/02 - Recent Breakthroughs 2023–2025]] — RT-2, π0, Gemini Robotics: transformer-based robot models
- [[Technical Skills/Notes/Subtopics/LLMs]] — LLMs are transformer-based; GPT, BERT, Claude architecture
- [[ML/Lecture 9 — Sequential Models (Deep Learning on Sequences)]] — RNNs that transformers replaced
- [[ML/Lecture 4 — Neural Networks & Backpropagation]] — neural network fundamentals transformers build on
- [[Artificial Intelligence/AI Agents/AI Agents - Core Components]] — LLM-based agents use transformer models

## 1) From n-grams to neural sequence models

N-gram models are limited: they only look at a fixed window of context and can't generalize to unseen word combinations. Neural networks can learn ==**distributed representations**== and capture longer-range dependencies.

*// An n-gram model treats "the cat sat" and "the dog sat" as completely unrelated contexts. A neural model can learn that "cat" and "dog" are similar, and transfer knowledge between them.*

---

## 2) Embeddings: representing discrete tokens

### The problem with raw tokens

Words (or any discrete symbols) aren't numbers. We need to convert them to vectors before a neural network can process them.

### One-hot encoding

Represent each token as a vector of length $V$ (vocabulary size) with a 1 in its position and 0s elsewhere.

$$\text{"cat"} \to [0, 0, 1, 0, \dots, 0]$$

> [!warning] Problems with one-hot
> - Vectors are ==huge== (dimension = vocabulary size, often 50,000+)
> - ==All tokens are equidistant==: $\|\text{cat} - \text{dog}\| = \|\text{cat} - \text{airplane}\|$
> - No notion of similarity between tokens

### Learned embeddings

An ==**embedding layer**== is a trainable lookup table: each token maps to a dense vector of dimension $k$ (typically 64–512).

$$\text{embed}: \{1, \dots, V\} \to \mathbb{R}^k$$

Mathematically, this is equivalent to multiplying the one-hot vector by an ==**embedding matrix**== $E \in \mathbb{R}^{V \times k}$. The one-hot vector simply selects a row of $E$.

*// Instead of a sparse 50,000-dimensional vector, each word gets a dense 300-dimensional vector where similar words end up close together. The network learns these representations during training.*

### Word2Vec and pretrained embeddings

**Word2Vec (skip-gram)**: train a simple model to predict context words from a center word. The learned embedding vectors capture semantic relationships:

$$\text{king} - \text{man} + \text{woman} \approx \text{queen}$$

> [!tip] Pretraining
> Train embeddings on a huge unlabeled corpus (Wikipedia, web text), then ==reuse them== for your downstream task. This transfers general language knowledge even to tasks with small datasets.

---

## 3) Sequence-to-sequence layers: the building blocks

A sequence model takes a sequence of vectors in and produces a sequence of vectors out. The key architectural choice: what kind of layer processes the sequence?

### Three configurations

| Config | Input | Output | Example use |
|---|---|---|---|
| **Sequence-to-sequence (s2s)** | Sequence of length $T$ | Sequence of length $T$ | POS tagging, token-level tasks |
| **Sequence-to-label (s2l)** | Sequence of length $T$ | Single vector | Sentiment classification |
| **Label-to-sequence (l2s)** | Single vector | Sequence of length $T$ | Text generation from a prompt |

*// s2s = annotate every position. s2l = summarize the whole thing into one decision. l2s = expand a single representation into a sequence.*

### Going from s2s to s2l: global pooling

To turn a sequence of vectors into a single vector, use ==**global pooling**==:
- **Global average pooling**: average all position vectors
- **Global max pooling**: take element-wise maximum across positions

Alternatively, use a special ==**global unit**== (e.g., a [CLS] token) whose output summarizes the sequence.

---

## 4) 1D Convolutions for sequences

### Adapting CNNs to 1D

The same convolution idea from images, but sliding a 1D kernel over a sequence:

$$y_t = \sum_{j=0}^{k-1} w_j \cdot x_{t+j}$$

where $k$ is the kernel size. Each output position summarizes a ==local window== of the input.

*// A 1D conv with kernel size 3 looks at three consecutive tokens at a time. It's like a sliding n-gram detector, but with learned weights.*

### Properties

- **Local context**: each output depends on a window of size $k$
- **Weight sharing**: same kernel at every position (translation equivariant)
- **Receptive field**: stacking multiple conv layers increases the effective context window

### Causal convolutions

For autoregressive models (predicting the next token), the output at position $t$ must not depend on positions $> t$. ==**Causal convolutions**== achieve this by only using the current and past positions:

$$y_t = \sum_{j=0}^{k-1} w_j \cdot x_{t-j}$$

*// Padding on the left only, not the right. Position $t$ can see $t, t{-}1, \dots, t{-}k{+}1$ but not $t{+}1$. This preserves the temporal ordering needed for generation.*

> [!tip] Dilated causal convolutions
> To increase the receptive field without adding many layers, use **dilation**: skip positions in the input (e.g., dilation=2 means the kernel looks at positions $t, t{-}2, t{-}4$). This gives exponentially growing receptive fields with linearly growing depth.

---

## 5) Recurrent Neural Networks (RNNs)

### The idea

Instead of a fixed window, an RNN maintains a ==**hidden state**== that accumulates information from all previous time steps:

$$\mathbf{h}_t = \sigma(W_h \mathbf{h}_{t-1} + W_x \mathbf{x}_t + \mathbf{b})$$

- $\mathbf{x}_t$: input at time $t$
- $\mathbf{h}_{t-1}$: hidden state from the previous step (the "memory")
- $\mathbf{h}_t$: updated hidden state
- $W_h, W_x, \mathbf{b}$: ==shared parameters across all time steps==

*// At each step, the RNN reads the new input AND its own memory from the previous step, then updates its memory. It's like reading a book while maintaining a running mental summary.*

> [!important] RNN key properties
> - **Variable length**: can process sequences of any length
> - **Parameter sharing**: same weights at every time step
> - **Theoretically infinite context**: $\mathbf{h}_t$ depends on all of $\mathbf{x}_1, \dots, \mathbf{x}_t$
> - **In practice**: ==struggles with long-range dependencies== (vanishing/exploding gradients)

### Backpropagation through time (BPTT)

Training an RNN = unrolling it across time steps and applying standard backprop. The gradient flows backward through all time steps, which is why long sequences cause gradient problems.

### The vanishing gradient problem

> [!warning] Why RNNs struggle with long sequences
> During BPTT, gradients are multiplied by $W_h$ at each step. If the largest eigenvalue of $W_h$ is:
> - $< 1$: gradients ==shrink exponentially== → early inputs are "forgotten"
> - $> 1$: gradients ==grow exponentially== → training becomes unstable
>
> *// Like the telephone game: pass a message through 100 people, and by the end it's unrecognizable. The gradient signal degrades the same way.*

---

## 6) LSTMs (Long Short-Term Memory)

### The fix: gated memory

An ==**LSTM**== solves the vanishing gradient problem by adding explicit **gates** that control information flow:

> [!important] LSTM gates
> | Gate | Symbol | Role |
> |---|---|---|
> | **Forget gate** | $\mathbf{f}_t$ | ==What to erase== from the cell state |
> | **Input gate** | $\mathbf{i}_t$ | ==What new information to write== |
> | **Output gate** | $\mathbf{o}_t$ | ==What to expose== as the hidden state |

### LSTM equations

$$\mathbf{f}_t = \sigma(W_f [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_f)$$
$$\mathbf{i}_t = \sigma(W_i [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_i)$$
$$\tilde{\mathbf{c}}_t = \tanh(W_c [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_c)$$
$$\mathbf{c}_t = \mathbf{f}_t \odot \mathbf{c}_{t-1} + \mathbf{i}_t \odot \tilde{\mathbf{c}}_t$$
$$\mathbf{o}_t = \sigma(W_o [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_o)$$
$$\mathbf{h}_t = \mathbf{o}_t \odot \tanh(\mathbf{c}_t)$$

*// The cell state $\mathbf{c}_t$ is a "conveyor belt" that runs through the entire sequence. The forget gate can erase parts of it, the input gate can write new information to it. Because information can flow through $\mathbf{c}_t$ with only element-wise operations (no matrix multiplications), ==gradients don't vanish==.*

### Why LSTMs work

The ==**cell state $\mathbf{c}_t$**== provides a direct gradient highway through time. The forget gate's ability to be close to 1 means gradients can flow unchanged across many time steps, solving the vanishing gradient problem.

> [!abstract] Comparison
> | | Vanilla RNN | LSTM |
> |---|---|---|
> | Memory | Single hidden state | Cell state + hidden state |
> | Long-range deps | Poor (vanishing gradients) | ==Good (gradient highway)== |
> | Parameters | Fewer | ~4× more (four gate matrices) |
> | Variant | — | **GRU** (simpler: 2 gates instead of 3, similar performance) |

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **One-hot encoding** | Sparse, high-dimensional, no notion of similarity |
| **Embedding layer** | Learned dense vectors; lookup table = row selection from matrix |
| **Word2Vec** | Pretrained embeddings from context prediction; captures semantics |
| **1D convolution** | Sliding kernel over sequence; local context, weight sharing |
| **Causal convolution** | Output at $t$ can't see inputs at $t+1, \dots$ |
| **RNN** | $\mathbf{h}_t = \sigma(W_h \mathbf{h}_{t-1} + W_x \mathbf{x}_t)$; shared weights across time |
| **Vanishing gradient** | Gradients shrink exponentially through long sequences |
| **LSTM** | Forget/input/output gates; cell state as gradient highway |
| **s2s / s2l / l2s** | Sequence-to-sequence / sequence-to-label / label-to-sequence configs |
| **Global pooling** | Average or max across positions to get a single vector |

## 1) Sequential data: what makes it special

So far, every instance was a fixed-size vector of features. ==**Sequential data**== has a variable length and an ordering that matters.

*// An email is a bag of words (order doesn't matter much). A sentence is a sequence of words (order changes meaning: "dog bites man" ≠ "man bites dog").*

### Types of sequences

| | Symbolic | Numeric |
|---|---|---|
| **1D** | Text, DNA, music notes | Stock prices, temperature readings |
| **nD** | Video (sequence of images) | Multivariate time series (e.g., sensor array) |

### Two problem settings

- **Single sequence**: one long sequence (e.g., the English Wikipedia). Goal: model the structure within it.
- **Set of sequences**: many independent sequences (e.g., 10,000 movie reviews). Goal: classify, translate, or compare them.

---

## 2) Feature extraction for sequences

The simplest approach: ==**convert sequences to fixed-length feature vectors**==, then use any standard classifier.

Examples:
- Text → bag of words (count each word; ignore order)
- Time series → summary statistics (mean, variance, min, max, trend)
- Signal → Fourier coefficients

*// This throws away ordering information, but it lets you use all the tools you already know (logistic regression, trees, etc.). Sometimes that's good enough.*

> [!warning] Walk-forward validation for time series
> Standard cross-validation randomly splits data → future data leaks into the training set. For time series, always use ==**walk-forward validation**==: train on data up to time $t$, test on $t+1, \dots, t+k$, then slide the window forward.
>
> *// You can't use tomorrow's stock prices to predict today. Your train/test split must respect the arrow of time.*

---

## 3) The chain rule of probability

Any joint probability over a sequence can be decomposed:

$$p(x_1, x_2, \dots, x_T) = p(x_1) \cdot p(x_2 \mid x_1) \cdot p(x_3 \mid x_1, x_2) \cdots p(x_T \mid x_1, \dots, x_{T-1})$$

> [!important] This is exact — no assumptions
> $$p(x_1, \dots, x_T) = \prod_{t=1}^T p(x_t \mid x_1, \dots, x_{t-1})$$
> Each term conditions on the ==entire history==. This is always true by the definition of conditional probability.

*// Read it as: "The probability of a sentence = probability of the first word × probability of the second word given the first × probability of the third word given the first two × ..."*

The problem: estimating $p(x_t \mid x_1, \dots, x_{t-1})$ requires exponentially many parameters as $t$ grows. We need simplifying assumptions.

---

## 4) The Markov assumption

> [!important] The Markov assumption
> The probability of the next element depends only on the ==**last $n$ elements**==, not the full history:
> $$p(x_t \mid x_1, \dots, x_{t-1}) \approx p(x_t \mid x_{t-n}, \dots, x_{t-1})$$

- $n = 0$: **unigram** model — each element is independent
- $n = 1$: **bigram** model — depends only on the previous element
- $n = 2$: **trigram** model — depends on the last two elements
- General: ==**$n$-gram**== model

*// "To predict the next word, I only look at the last $n$ words." For bigrams: given "the cat sat on the", predict the next word using only "the". Crude, but tractable.*

### Why this helps

With a vocabulary of size $V$:
- Full history model: exponentially many possible contexts
- Bigram model: only $V$ possible previous words → $V \times V$ parameters (a manageable matrix)

---

## 5) N-gram language models

A ==**language model**== assigns a probability to every possible sequence (or equivalently, predicts the next token given context).

### Estimating n-gram probabilities

Count occurrences in a training corpus:

$$p(w_t \mid w_{t-1}) = \frac{\text{count}(w_{t-1}, w_t)}{\text{count}(w_{t-1})}$$

*// Bigram probability of "cat" after "the" = (number of times "the cat" appears) / (number of times "the" appears followed by anything).*

### For trigrams:

$$p(w_t \mid w_{t-2}, w_{t-1}) = \frac{\text{count}(w_{t-2}, w_{t-1}, w_t)}{\text{count}(w_{t-2}, w_{t-1})}$$

> [!tip] Representation: the transition matrix
> For bigrams with vocabulary size $V$, the model is a $V \times V$ matrix where entry $(i, j)$ = $p(w_j \mid w_i)$. Each row sums to 1 (it's a probability distribution over next words given the current word).

---

## 6) Laplace smoothing (for n-grams)

> [!warning] The zero-count problem
> If a bigram never appears in training data, its probability is 0. Then any sequence containing it gets probability 0 — ==one unseen pair kills everything==.

Solution: ==**Laplace smoothing**== (add-one smoothing):

$$p(w_t \mid w_{t-1}) = \frac{\text{count}(w_{t-1}, w_t) + 1}{\text{count}(w_{t-1}) + V}$$

where $V$ is the vocabulary size. This ensures no probability is ever exactly zero.

*// Pretend every bigram was seen at least once. You shift probability mass from frequent pairs to unseen ones. Same idea as Laplace smoothing in Naive Bayes.*

For less aggressive smoothing, use $\lambda$-smoothing (replace 1 with a small $\lambda$).

---

## 7) Sequence classification with a Bayes classifier

Given a sequence $\mathbf{s}$, classify it into class $c$:

$$p(c \mid \mathbf{s}) \propto p(\mathbf{s} \mid c) \cdot p(c)$$

**How to estimate $p(\mathbf{s} \mid c)$**: train a separate n-gram model for each class using only that class's training sequences. Then the class-conditional probability of a new sequence = the probability assigned by that class's language model.

*// Train one bigram model on all positive reviews and another on all negative reviews. Given a new review, ask: "which model thinks this sequence is more probable?" That's your classification.*

> [!abstract] Generative classification with sequences
> 1. Separate training data by class
> 2. Train an n-gram model per class
> 3. For a new sequence, compute its probability under each class model
> 4. Apply Bayes' rule → classify

---

## 8) Sequential sampling (autoregressive generation)

Once you have a language model, you can ==**generate new sequences**== by sampling one token at a time:

1. Sample $x_1 \sim p(x_1)$
2. Sample $x_2 \sim p(x_2 \mid x_1)$
3. Sample $x_3 \sim p(x_3 \mid x_1, x_2)$
4. Continue until a stop token or max length

This is ==**autoregressive**== generation: each new token depends on all previously generated tokens.

*// The model writes one word at a time, each time choosing from a probability distribution over the vocabulary. The quality of the output depends entirely on how good the language model is.*

> [!tip] Temperature sampling
> You can control the "creativity" of sampling by scaling the logits before softmax:
> - **Low temperature** ($T < 1$): sharper distribution → more predictable, repetitive output
> - **High temperature** ($T > 1$): flatter distribution → more diverse, surprising (sometimes nonsensical) output
> - **$T = 1$**: sample from the model's actual learned distribution

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **Chain rule of probability** | $p(x_1, \dots, x_T) = \prod p(x_t \mid x_{<t})$; exact, no assumptions |
| **Markov assumption** | Only the last $n$ elements matter: $p(x_t \mid x_{t-n}, \dots, x_{t-1})$ |
| **N-gram model** | Estimate conditional probabilities from counts of n-grams |
| **Bigram probability** | $\text{count}(w_{i-1}, w_i) / \text{count}(w_{i-1})$ |
| **Laplace smoothing** | Add pseudo-counts to avoid zero probabilities |
| **Walk-forward validation** | Respect temporal ordering in train/test splits |
| **Sequence classification** | Bayes classifier with per-class n-gram models |
| **Autoregressive sampling** | Generate token-by-token from conditional distributions |

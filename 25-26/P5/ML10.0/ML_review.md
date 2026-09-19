# ML Review — Master Index

[[← P5 Index]]

> **Target:** 35/40 (currently 32/40). Exam: 40 MC questions, 2h, closed-book. Formula sheet + handwritten cheat sheet allowed.
> **Exam structure:** ~1/3 recall | ~1/3 combination | ~1/3 application (10 fixed application types — see §11)

---

## Quick navigation

| § | Topic | Key application type |
|---|-------|---------------------|
| 1 | Introduction & Methodology | — |
| 2 | Gradients | Find the gradient |
| 3 | Evaluation & Probabilistic Models | Ranking / coverage matrix |
| 4 | Naive Bayes & Entropy | Naive Bayes classification; Entropy |
| 5 | SVMs & Backpropagation | SVMs; scalar backprop |
| 6 | Deep Learning 1 | Scalar backprop (continued) |
| 7 | Deep Learning 2 | — |
| 8 | Markov Models & Tensor Backprop | Markov models; matrix backprop |
| 9 | Decision Trees & VAEs | Decision trees; ELBO |
| 10 | Sequential Models, RL, Transformers | — |
| 11 | **10 Application Types — Master Reference** | All 10 |
| 12 | Gap analysis template | — |

---

## §1 — Introduction & Methodology

> Source: practice-exam-a.answers (4).pdf, practice-exam-b.answers (1).pdf, resit.2024.answers (1).pdf

### Key concepts

**What is ML?** Learning a model from data. The model is a function from input to output.

**Terminology:**
- **Instance / example:** one row of data (e.g. one email, one image)
- **Feature / attribute:** one input variable describing an instance
- **Feature space:** each axis = one feature; each point = one instance
- **Model space:** the space of all possible models the algorithm can produce
- **Class / label / target:** the output variable we want to predict

**Learning paradigms:**
- **Offline (supervised):** training data is labeled; model learned from labeled examples
- **Reinforcement learning:** agent acts in environment, receives reward signal; no labeled data
- **Unsupervised:** no labels — examples: k-means, clustering, density estimation

**Search strategies:**
- **Gradient descent:** computes direction of steepest descent; requires differentiable loss
- **Random search:** evaluates random candidate models; use when model is not differentiable (e.g. decision trees, discrete model spaces)

**Overfitting:**
- Model performs well on training data but poorly on new data
- **Test-set rule:** never evaluate on training data; use a held-out test set
- **Validation set:** for hyperparameter selection (never the test set)
- Getting good training loss but poor validation loss = sure sign of overfitting
- High-variance models (decision trees, neural networks) are most prone

**Exam traps:**
- Reusing the test set for hyperparameter search inflates performance estimate (k-NN Q7 in Exam B)
- Class imbalance → accuracy is misleading; use precision/recall
- Outliers: leave them in — they are important examples
- Cost imbalance → be careful about which metric to optimize

---

## §2 — Gradients

> Source: week2.answers (1).pdf

### Differentiation rules

| Rule | Formula |
|------|---------|
| Constant | ∂c/∂x = 0 |
| Exponent | ∂x^n/∂x = nx^(n-1) |
| Constant factor | ∂(c·f(x))/∂x = c · ∂f/∂x |
| Sum | ∂(f+g)/∂x = ∂f/∂x + ∂g/∂x |
| Chain | ∂f(g(x))/∂x = (∂f/∂g)(∂g/∂x) |

**Gradient** ∇f(a,b) = (∂f/∂a, ∂f/∂b) — vector of all partial derivatives; points in direction of steepest ascent.

**Gradient descent update rule:**
$$\theta_\text{new} = \theta - \eta \nabla\text{loss}(\theta)$$
where η is the learning rate.

### Linear regression (OLS)

Model: f_{s,b}(a) = sa + b

Loss: loss(s,b) = ½ Σᵢ(saᵢ + b - hᵢ)²

Derivatives:
$$\frac{\partial\text{loss}}{\partial s} = \sum_i (a_i s + b - h_i) a_i = s\sum a_i^2 + b\sum a_i - \sum a_i h_i$$
$$\frac{\partial\text{loss}}{\partial b} = \sum_i (a_i s + b - h_i) = s\sum a_i + bn - \sum h_i$$

Setting to zero → optimal parameters:
$$s = \frac{\overline{ah} - \bar{a}\bar{h}}{\overline{a^2} - \bar{a}^2}, \qquad b = \bar{h} - s\bar{a}$$

**Why squared error?** Summing raw residuals lets big positive and negative errors cancel. Squaring also emerges naturally from MLE under Gaussian noise assumption.

### Exam question type: Find the gradient

Given a model f(x; w) = polynomial in w, compute ∂f/∂w step by step using chain + exponent + sum rules. Set to zero to find optimal parameters, or compute one GD step.

**Practice:** f(x; v, w) = -vx² + wx + b → ∂f/∂v = -x², ∂f/∂w = x

---

## §3 — Evaluation: ROC, Confusion Matrix, Ranking

> Source: week3.answers (1).pdf

### Confusion matrix

| | Predicted Pos | Predicted Neg |
|---|---|---|
| **True Pos** | TP | FN |
| **True Neg** | FP | TN |

**Metrics:**
- Accuracy = (TP+TN)/total
- Precision = TP/(TP+FP) — of all predicted positive, how many actually are?
- Recall = TPR = TP/(TP+FN) — of all actual positives, how many did we find?
- FPR = FP/(TN+FP) — of all actual negatives, how many did we predict positive?
- F1 = 2·P·R/(P+R)

**What confusion matrix cannot compute:** AUC (needs a ranking classifier, not just a threshold classifier)

### Ranking classifiers

**Linear classifier → ranking:** Sort points by distance to decision boundary (negative on one side, positive on other). Rank from most negative to most positive.

**Decision tree → ranking:** Group points by leaf segment, assign class probability by relative frequency in training data. Sort groups by class probability.

### Coverage matrix

- Rows = positive instances (sorted from most positive at bottom)
- Columns = negative instances (sorted from most positive at left)
- Cell (pos, neg): green if pos ranked higher than neg (correct), red if neg ranked higher (error), yellow if tied

**Ranking errors** = number of red cells. Ties count as 0.5.

**ROC curve:** Normalize coverage matrix axes. AUC = green area in ROC space = probability that a randomly chosen Pos is ranked above a randomly chosen Neg.

**Key exam fact:** ROC AUC requires a ranking classifier. Confusion matrix metrics do not.

---

## §4 — Naive Bayes & Entropy

> Source: week3.answers (1).pdf

### Naive Bayes

**Classification rule:**
$$\hat{y} = \arg\max_Y p(X_1|Y) \cdot p(X_2|Y) \cdots p(X_k|Y) \cdot p(Y)$$

**Why "naive":** assumes features are conditionally independent given the class. This is almost always false but works well in practice.

**Estimating probabilities:** relative frequency in training data. E.g. p(X_p = 1 | Spam) = count(pill, spam) / count(spam).

**Denominator p(X):** same for all classes → skip it to find argmax. Compute it (normalization) only if you need actual probabilities.

**Zero-count problem:** if a feature value never appears with a class in training data, the entire product collapses to 0.

**Smoothing (pseudo-observations):** for each feature, add one observation with each feature value for each class. This ensures every probability is nonzero.

Example: Without smoothing → p(hello|spam) = 0 → p(spam|...) = 0 even if other features strongly predict spam. With smoothing → p(hello|spam) = 1/6 instead.

### Entropy

$$H(X) = -\sum_x p(x) \log_2 p(x)$$

- H = 0 when distribution is deterministic (one outcome certain)
- H is maximized by uniform distribution: H = log₂(n) for n equally likely outcomes
- Interpretation: expected code length (bits) under optimal binary code

**Computation trick:** H(-5/8 log 5/8 - 3/8 log 3/8) = -1/8(5(log5 - 3) + 3(log3 - 3))

**Cross-entropy:** H(p,q) = -Σ p(x) log₂ q(x) — expected code length of q when true distribution is p. Undefined if q(x) = 0 for any x where p(x) > 0.

**KL divergence:** KL(p‖q) = H(p,q) - H(p) ≥ 0. Measures how much extra code length we pay for using q instead of p.

**Information gain (for decision trees):**
$$I(F) = H(S) - \sum_{v \in F} \frac{|S_v|}{|S|} H(S_v)$$

---

## §5 — SVMs & Scalar Backpropagation

> Source: week4.answers.pdf, practice-exam-b.answers (1).pdf

### Support Vector Machines

**Model:** Linear classifier f(x) = w^T x + b. Class = sign(f(x)).

**Training objective (soft margin):**
$$\min_{w,b} \frac{1}{2}||w|| + C\sum_i p_i \quad \text{s.t.} \quad y_i(w^T x_i + b) \geq 1 - p_i, \; p_i \geq 0$$

where y_i = +1 for positive examples, y_i = -1 for negative examples.

**Support vectors:** instances where w^T x_i + b = y_i (exactly on the margin). These are the closest points to the decision boundary.

**Identifying support vectors:** compute w^T x + b for each point; support vector ↔ result equals y_i (±1).

**Hard vs soft margin:**
- Hard margin: L1 regularization, non-differentiable → can't use gradient descent
- Soft margin: allows slack (misclassification penalty C) → differentiable → gradient descent works

**Exam traps:**
- SVM is supervised (not unsupervised)
- SVMs are linear classifiers; kernel trick allows nonlinear decision boundaries
- "Support vectors are closest to the decision boundary" — correct
- Soft margin advantage: allows gradient descent (NOT "better boundaries for linearly separable")

**Practice:** Given w=(1,-2), b=1, classify (2,1), (1,2), (2,2). Compute w^T x + b = 1·x₁ - 2·x₂ + 1 for each.

### Scalar Backpropagation

**Idea:** Break complex function into modules with simple local derivatives. Use chain rule to compose.

**Algorithm:**
1. **Forward pass:** compute and store all intermediate values
2. **Backward pass:** compute local derivatives, multiply upstream × local

**For a 2-layer network** y = v₁h₁ + v₂h₂, h₁ = σ(w₁x), h₂ = σ(w₂x):
$$\frac{\partial\text{loss}}{\partial w_1} = \frac{\partial\text{loss}}{\partial y} \cdot \frac{\partial y}{\partial h_1} \cdot \frac{\partial h_1}{\partial k_1} \cdot \frac{\partial k_1}{\partial w_1} = (y-t) \cdot v_1 \cdot \sigma(k_1)(1-\sigma(k_1)) \cdot x$$

**Sigmoid derivative:** σ'(k) = σ(k)(1 - σ(k))

**Multivariate chain rule:** needed when output depends on input along multiple paths (diamond in computation graph). Sum contributions from all paths.

**Exam question type: Scalar backprop**

Given f broken into modules, compute ∂f/∂x step by step. Example: f = (x²+1)/(x³+2).
Let a = x²+1, b = x³+2, f = a/b. Then ∂f/∂x = (∂f/∂a)(∂a/∂x) + (∂f/∂b)(∂b/∂x) = (1/b)(2x) + (-a/b²)(3x²).

---

## §6 — Deep Learning 1

> Source: resit.2024.answers (1).pdf, practice-exam-a.answers (4).pdf, practice-exam-b.answers (1).pdf

### Activations

| Activation | Formula | Derivative | Use |
|-----------|---------|-----------|-----|
| Sigmoid | σ(x) = 1/(1+e^{-x}) | σ(x)(1-σ(x)) | Output layer (binary) |
| ReLU | r(x) = max(0, x) | 0 if x<0, 1 if x≥0 | Hidden layers |
| Softmax | exp(xᵢ)/Σexp(xⱼ) | — | Output layer (multiclass) |

**Why ReLU over sigmoid?**
- Sigmoid derivative ≈ 0 for large |x| → vanishing gradients in deep networks
- ReLU derivative is 0 or 1 → gradient flows through unchanged (no shrinkage)

### Perceptron limitation

A composition of linear functions is linear. Perceptron (no activation) cannot learn non-linear patterns.

**Non-linear separation:** derive new features (feature engineering) or use non-linear activation.

### Regularization

- **L1/L2 regularization:** add penalty term to loss. L1 promotes sparsity. Works on continuous model space (not decision trees).
- **Dropout:** randomly disable nodes during training → prevents co-adaptation. Each node learns more independent features.
- **Batch normalization:** normalize output of each layer to be zero-mean, unit-variance over the batch → stabilizes training, allows higher learning rates.

### Bias-variance tradeoff

- **High bias (underfitting):** model too simple, misses patterns
- **High variance (overfitting):** model too complex, memorizes training data
- **High-variance models:** can still have low average error — variance means predictions are spread out, not necessarily wrong on average

### Lazy vs eager execution

- **Eager (PyTorch default):** computation graph built dynamically on each forward pass
- **Lazy (TensorFlow 1.x):** static graph compiled once before execution

### Loss vs evaluation metric

Loss must be differentiable (smooth gradient surface). Evaluation metric doesn't have to be (e.g. accuracy). They measure related but different things — a bad loss surface shape is why accuracy can't be the loss function.

---

## §7 — Deep Learning 2: Generative Models

> Source: practice-exam-b.answers (1).pdf, resit.2024.answers (1).pdf

### Autoencoders vs VAE vs GAN

| Model | Purpose | Key mechanism |
|-------|---------|---------------|
| Autoencoder | Compression/reconstruction | Encoder → bottleneck → decoder |
| VAE | Generation + structured latent space | Encoder → distribution q(z|x) → sample z → decoder |
| GAN | Realistic generation | Generator vs discriminator adversarial training |

**VAE — key facts:**
- Encoder produces a **distribution** (mean + variance), NOT a point embedding
- This is what distinguishes VAE from a regular autoencoder
- VAE does NOT include a discriminator (that's GAN)
- VAE avoids mode collapse via the encoder network (not a discriminator)
- ELBO loss = reconstruction term + KL divergence to prior

**GAN — key facts:**
- Discriminator solves mode collapse by pushing generator to cover all modes
- Conditional GAN: generator conditioned on input (e.g. image colorization, text-to-image)
- Use conditional GAN when you want input-conditional generation

---

## §8 — Markov Models & Tensor (Matrix) Backpropagation

> Source: week5.answers.pdf, practice-exam-b.answers (1).pdf

### Markov Models for sequence classification

**Goal:** classify a sequence (e.g. email "claim prize you won") as spam/ham.

**Approach — Bayes' rule:**
$$p(\text{spam}|E) \propto p(E|\text{spam}) \cdot p(\text{spam})$$

**Chain rule expansion:**
$$p(w_1, w_2, w_3, w_4|\text{spam}) = p(w_4|w_3,\text{spam}) \cdot p(w_3|w_2,\text{spam}) \cdot p(w_2|w_1,\text{spam}) \cdot p(w_1|\text{spam})$$

**First-order Markov assumption:** each word depends only on the previous word.

**Estimating probabilities:**
- p(won | you, spam) = count("you won" in spam) / count("you" in spam)
- p(claim | spam) = count("claim" in spam) / total words in spam

**Classification:** compute p(E|spam)·p(spam) and p(E|ham)·p(ham), pick larger. Prior can flip the result if very strong.

**Exam question type: Markov models**

Given a frequency table (bigrams + unigrams for each class) and an email, compute unnormalized class probabilities and classify. Watch for prior.

### Tensor (Matrix) Backpropagation

**Problem:** For tensors, full Jacobian is too large to store. Instead, compute **Jacobian-vector products** directly.

**For a linear layer y = Wx + b:**

Given upstream gradient y^∇ (same shape as y), compute:
- **Gradient for b:** b^∇ = y^∇ (just pass upstream through)
- **Gradient for x:** x^∇ = y^∇ W (row vector times W)
- **Gradient for W:** W^∇ = (y^∇)^T x^T

**Key insight:** never compute the full Jacobian. Compute the product of upstream × local directly.

**Exam question type: Matrix backprop**

Given y = Wx + b and upstream gradient y^∇, write the backward pass expressions. Answer: b^∇ = y^∇, x^∇ = y^∇W.

---

## §9 — Decision Trees & VAE (ELBO)

> Source: week6.answers.pdf

### Decision Trees (ID3)

**Algorithm:** Recursively split data on the feature with highest information gain.

**Information gain:**
$$I(F) = H(S) - \sum_{v} \frac{|S_v|}{|S|} H(S_v)$$

**Procedure for exam:**
1. Tally class counts for each feature value (Yes/No split)
2. Compute post-split entropy for each feature
3. Pick feature with lowest weighted post-split entropy (= highest gain)
4. Repeat recursively on each subset

**Shortcut:** if splitting on feature F makes all subsets pure (one class each), then post-split entropy = 0 → maximum possible gain. Look for this first.

**Overfitting:**
- Decision trees memorize training data → high variance
- **Prevention:** max-depth stopping (hyperparameter tuned on validation set); post-hoc pruning (validation set)
- Why not L1 regularization? Decision trees have a **discrete** model space (L1 requires continuous parameter vector)

**Classification with a trained tree:** follow branches based on feature values; leaf node gives class label.

### ELBO / Variational Lower Bound

**Decomposition:**
$$\ln p(\mathbf{x}|\theta) = L(q,\theta) + KL(q, p)$$

Since KL ≥ 0: ln p(x|θ) ≥ L(q,θ). Hence L is the **lower bound** (ELBO).

**Proof:**
$$L + KL = \mathbb{E}_q \ln \frac{p(\mathbf{x},\mathbf{z}|\theta)}{q(\mathbf{z}|\mathbf{x})} - \mathbb{E}_q \ln \frac{p(\mathbf{z}|\mathbf{x},\theta)}{q(\mathbf{z}|\mathbf{x})} = \mathbb{E}_q \ln p(\mathbf{x}|\theta) = \ln p(\mathbf{x}|\theta)$$

**VAE decomposition of L:**
$$L(v,w) = \mathbb{E}_{q_v} \ln p_w(\mathbf{x}|\mathbf{z}) - KL(q_v(\mathbf{z}|\mathbf{x}), p_w(\mathbf{z}))$$

- First term: reconstruction quality (how well decoder reconstructs x)
- Second term: how close encoder distribution is to the prior

**Training:** maximize L = minimize reconstruction loss + KL to prior.

**Why can't we set KL = 0 as in EM?** To do so we'd need p(z|x,θ), which requires inverting the decoder network — intractable. Instead, approximate with encoder q_v(z|x).

**Exam question type: ELBO**

Show the derivation step by step using properties: p(a,b) = p(a|b)p(b), log products = sum of logs, E[f+g] = Ef + Eg, E[constant] = constant.

---

## §10 — Sequential Models, Reinforcement Learning, Transformers

> Source: resit.2024.answers (1).pdf, practice-exam-b.answers (1).pdf

### Sequential Models

**Markov assumption:** each output depends on a fixed window of previous inputs.

**RNN:** hidden state carries information forward. Makes Markov assumption implicitly.

**LSTM:** Long Short-Term Memory. Does NOT make the Markov assumption — memory gates allow information to be retained over long sequences.

**Self-attention (Transformers):**
- Like **RNN:** can access all previous positions (global access)
- Like **CNN:** computation is parallelizable (no sequential dependency)

### Reinforcement Learning

**Setup:** agent interacts with environment, receives reward. Goal: maximize cumulative reward.

**Exploration-exploitation tradeoff:** agent must balance exploring new actions vs exploiting known good actions.

**Why gradient descent is hard in RL:** the step between agent output and reward is non-differentiable (reward from environment, not from a smooth function).

**Prefer RL when:** labeled training data is unavailable; learning from interaction with environment.

### Transformers & LLMs

**Instruction tuning:** fine-tune an LLM on natural language instructions (input-output pairs). Allows the model to follow diverse instructions.

**Fine-tuning:** take a pre-trained model and train further on a smaller, task-specific dataset.

### Recommender Systems

- **Explicit feedback:** ratings, reviews, direct preferences
- **Implicit feedback:** behavior-inferred associations (clicks, purchases, play time) — no explicit rating

**Collaborative filtering approaches:**
- **Matrix factorization:** embed users and items into shared Euclidean vector space
- **Word2Vec-style:** embed featureless objects into Euclidean space; similar objects → nearby vectors

### Ensemble methods

**What ensembles CAN solve:** high variance (overfitting), poor single-model generalization.
**What ensembles CANNOT solve:** high training time (averaging slow models = slower).

---

## §11 — 10 Application Types: Master Reference

> These 10 application question types appear on every exam with different data. Mastering the procedure guarantees correct answers.

### Type 1: Find the gradient

**Given:** model formula y = f(x; w) (polynomial or similar)
**Find:** gradient ∂loss/∂w

**Procedure:**
1. Write out loss function (usually squared error)
2. Apply chain rule + differentiation rules
3. Simplify to closed form
4. Optionally: compute one GD update step θ_new = θ - η·∇loss

**Example:** y = -vx² + wx + b, loss = ½(y-t)²
→ ∂loss/∂w = (y-t)·x

---

### Type 2: Ranking and coverage matrix

**Given:** dataset with Pos/Neg labels + a classifier rule
**Find:** ranking, coverage matrix, number of ranking errors

**Procedure:**
1. Apply classifier to each instance; record score/distance
2. Sort from most negative to most positive → this is the ranking
3. Build coverage matrix: rows = Pos instances (y-axis), columns = Neg instances (x-axis)
4. Fill green (correct), red (error), yellow (tie) for each (pos, neg) pair
5. Count errors (red cells + 0.5×yellow)

---

### Type 3: Entropy / cross-entropy / KL divergence

**Given:** two distributions p and q over a set of outcomes
**Find:** H(p), H(q), H(p,q), KL(p‖q)

**Procedure:**
$$H(p) = -\sum p(x)\log_2 p(x)$$
$$H(p,q) = -\sum p(x)\log_2 q(x) \quad \text{(undefined if } q(x)=0 \text{ where } p(x)>0\text{)}$$
$$KL(p\|q) = H(p,q) - H(p)$$

**Watch out:** cross-entropy H(p,q) is not symmetric. H(p,q) undefined if any q(x)=0 has p(x)>0.

---

### Type 4: Scalar backpropagation

**Given:** function f broken into modules (a = g(x), b = h(x), f = a·b or similar)
**Find:** ∂f/∂x using backpropagation

**Procedure:**
1. Identify modules and intermediate variables
2. Draw computation graph
3. Compute local derivatives for each module
4. Apply chain rule: if x feeds into multiple paths, sum contributions (multivariate chain rule)

**Formula:** ∂f/∂x = Σ_paths (product of local derivatives along path)

---

### Type 5: Decision trees (information gain)

**Given:** dataset with binary features and binary class label
**Find:** best split feature; build tree

**Procedure:**
1. Compute pre-split entropy H(S)
2. For each feature: tally class counts for each feature value
3. Compute weighted post-split entropy: Σ_v (|S_v|/|S|) H(S_v)
4. Pick feature with highest I(F) = H(S) - weighted post-split entropy
5. Recurse on each subset (features already used can be excluded)
6. Stop when all instances in a subset have the same class

**Shortcut:** if any feature creates all-pure subsets, it has maximum gain.

---

### Type 6: ELBO derivation

**Given:** decomposition ln p(x|θ) = L(q,θ) + KL(q,p)
**Find:** prove equality, or decompose L further

**Key properties to apply:**
- p(a,b) = p(a|b)·p(b)
- log(fg) = log f + log g; log(f/g) = log f - log g
- E[f+g] = Ef + Eg
- E[c] = c if c is constant w.r.t. the distribution

**Final form:** L(v,w) = E_q[ln p_w(x|z)] - KL(q_v(z|x), p_w(z))

---

### Type 7: Naive Bayes classification

**Given:** dataset with binary features, binary class; possibly a new instance to classify
**Find:** class probabilities with and without smoothing

**Procedure (without smoothing):**
$$p(\text{class}|x_1,\ldots,x_k) \propto \prod_i p(x_i|\text{class}) \cdot p(\text{class})$$

Estimate each factor from relative frequencies. Multiply. Normalize if needed.

**Procedure (with smoothing):**
Add one pseudo-observation per feature value per class. Recount.

---

### Type 8: SVM support vectors

**Given:** weights w, bias b, and a set of points with labels
**Find:** which points are support vectors; classify new points

**Procedure:**
1. Compute f(x) = w^T x + b for each point
2. Support vector: f(x) = y_i (i.e. exactly ±1)
3. Classification: class = sign(f(x))
4. Decision boundary: w^T x + b = 0 → rearrange to x₂ = -(w₁/w₂)x₁ - b/w₂

---

### Type 9: Markov model classification

**Given:** frequency table (bigrams + unigrams per class), email to classify, prior
**Find:** class for each email

**Procedure:**
1. Apply Bayes' rule: p(class|E) ∝ p(E|class)·p(class)
2. Use chain rule: p(w1,w2,w3|class) = p(w3|w2,class)·p(w2|w1,class)·p(w1|class)
3. Estimate each factor: bigram count / unigram count for bigrams; unigram count / total words for unigrams
4. Multiply all factors and the prior
5. Compare classes — pick larger

**Watch for:** strong prior can flip classification even when likelihood strongly favors one class.

---

### Type 10: Matrix backpropagation

**Given:** linear layer y = Wx + b, upstream gradient y^∇
**Find:** gradients for b, x, and W

**Answers:**
- b^∇ = y^∇ (same shape as b, just the upstream gradient)
- x^∇ = y^∇ W (row vector × matrix)
- W^∇ = (y^∇)^T x^T

**Key point:** never compute the full Jacobian ∂y/∂x. Compute the Jacobian-vector product directly.

---

## §12 — Gap Analysis Template

> Fill this in to identify your weakest areas before the exam.

| Topic | Recall (definitions) | Combination (reasoning) | Application (computation) | Confidence |
|-------|---------------------|------------------------|--------------------------|-----------|
| Gradients & OLS | | | | /5 |
| ROC / AUC / coverage matrix | | | | /5 |
| Naive Bayes + smoothing | | | | /5 |
| Entropy / cross-entropy / KL | | | | /5 |
| SVMs | | | | /5 |
| Scalar backprop | | | | /5 |
| Deep learning (ReLU, dropout, batchnorm) | | | | /5 |
| Markov models | | | | /5 |
| Matrix backprop | | | | /5 |
| Decision trees | | | | /5 |
| VAE / ELBO | | | | /5 |
| GAN / conditional GAN | | | | /5 |
| Sequential models / LSTM / self-attention | | | | /5 |
| Reinforcement learning | | | | /5 |
| Transformers / instruction tuning | | | | /5 |

**Scoring:** 1=confused, 2=shaky, 3=recall only, 4=can compute, 5=confident

**Priority targets (gap from 32→35):** Focus on application types 3, 5, 6, 9 — these require computation and appear every year. Any score below 4 on these is a lost point.

---

## Common exam traps (quick reference)

| Trap | Correct answer |
|------|---------------|
| SVM is unsupervised | False — SVM is supervised |
| Conditional independence = independence | False — conditional on class |
| p(A|B) = p(B|A) | False in general |
| High-variance model → high average error | False — variance ≠ bias |
| Soft-margin SVM advantage = better boundaries | False — advantage = allows gradient descent |
| Dropout → disable random nodes at test time | False — only at training time |
| VAE encoder → point embedding | False — encoder outputs a distribution |
| VAE uses discriminator | False — that's GAN |
| L1 regularization for decision trees | False — discrete model space |
| Reuse test set for hyperparameter selection | Wrong — use validation set |
| Accuracy bad because imbalanced classes | Partially true — also bad because gradient ~0 everywhere |

# ML EXAM CRAM — 37+/40
> 40 MCQ · 2h · Formula sheet + handwritten cheat sheet allowed
> Structure: ~12 Recall → ~13 Combination → ~15 Application

---

## 1. LEARNING PARADIGMS

### All types + what belongs where

| Paradigm | What you have | Goal | Examples |
|---|---|---|---|
| **Supervised** | Labeled data (x, y) | Predict y from x | Linear regression, logistic regression, SVM, decision tree, random forest, MLP, CNN, LSTM, k-NN, Naive Bayes |
| **Unsupervised** | Unlabeled data (x only) | Find structure | k-Means, PCA, autoencoders, VAE, GAN, matrix factorization, Word2Vec, density estimation |
| **Reinforcement** | Agent + environment + reward signal | Learn policy | Policy Gradients, DQN |
| **Online** | Data arrives sequentially over time | Update model as data arrives | Any model adapted to streaming data |
| **Transductive** | Training data + test features (no test labels) | Predict specifically for those test instances | Semi-supervised methods |

**Key distinctions:**
- kNN is supervised (needs labels) AND lazy (no model built)
- VAE/GAN are unsupervised (generate from unlabeled data)
- Logistic regression is supervised (needs labels y ∈ {0,1})
- k-Means is unsupervised, but NOT lazy (builds centroids, discards data)

---

## 2. ALL ALGORITHMS — What they are and how they differ

### Linear Models
**Linear regression**: w·x + b = y. Continuous output. Loss = ½Σ(ŷ−y)².
**Logistic regression**: σ(w·x + b) = probability. Binary classification. Loss = cross-entropy. Same as 1-layer NN with sigmoid. Points near the boundary weigh most heavily.
**Linear classifier**: w·x + b > 0 → positive class. Decision boundary = hyperplane where score = 0.

**Why square the error (MSE)?**
1. Prevents positive/negative errors from cancelling
2. Penalizes large errors more than small ones
3. Equivalent to MLE under Gaussian noise assumption
❌ NOT because: "points near the boundary weigh heavily" (that's log loss)

### k-Nearest Neighbours (k-NN)
- **Lazy**: stores all training data. No training phase.
- Prediction: find k closest training instances, majority vote (classification) or average (regression)
- Non-parametric: can approximate any decision boundary
- Cost: O(n) per prediction (slow on large datasets)
- Hyperparameter k: small k = overfitting, large k = underfitting

### Support Vector Machines (SVMs)
- Goal: find hyperplane with **maximum margin** between classes
- **Support vectors**: training points closest to boundary (where yᵢ(w·xᵢ+b) = 1)
- **Hard margin**: no misclassifications allowed
- **Soft margin**: allow violations with penalty C. Large C = fewer violations, smaller margin
- **Kernel trick**: compute dot products in high-dimensional space without explicit transformation. Enables non-linear boundaries.

### Decision Trees
- Split features to maximize **information gain** (= reduce entropy most)
- Works natively on categorical AND numeric features
- Categorical feature: only split once per branch (already partitioned)
- Numeric feature: CAN split multiple times with different thresholds
- **Overfitting**: fully grown tree memorizes training data → prune using validation set

### k-Means Clustering
- Assign each point to nearest centroid; update centroids; repeat
- Unsupervised, NOT lazy (builds model = centroids)
- Converges to local minimum (depends on initialization)

### Naive Bayes
- Generative classifier: models P(x|class) × P(class)
- **Naive Bayes assumption**: features are conditionally independent given the class
  P(class | x₁,x₂,...) ∝ P(class) × P(x₁|class) × P(x₂|class) × ...
- Fast, works well for text classification
- Contrast with logistic regression (discriminative: directly models P(class|x))

---

## 3. NEURAL NETWORKS IN DEPTH

### Why perceptrons alone fail
- A single perceptron = linear classifier
- **Composing linear functions = still linear**: f(g(x)) = linear if both f and g are linear
- Need **activation functions** between layers to get non-linearity
- MLP (Multi-Layer Perceptron) with activations = universal approximator

### Activation functions

| Function | Formula | Derivative | Problem/Advantage |
|---|---|---|---|
| Sigmoid | σ(x) = 1/(1+e⁻ˣ) | σ(x)(1−σ(x)) ≤ 0.25 | **Vanishing gradients** in deep nets |
| ReLU | max(0, x) | 1 if x>0, else 0 | **Fixes** vanishing gradients, preferred |
| Tanh | (eˣ−e⁻ˣ)/(eˣ+e⁻ˣ) | 1−tanh²(x) ≤ 1 | Better than sigmoid but still vanishes |

**Vanishing gradient problem:**
- Sigmoid derivative always < 0.25 → through L layers: (0.25)^L → essentially 0
- Early layers stop learning (gradient signal dies before reaching them)
- ReLU fix: derivative is 1 for positive inputs → gradient passes through unchanged

### Batch Normalization
- Normalizes layer activations to ~N(0,1) over the current mini-batch
- Effect: stabilizes training, allows higher learning rates
- ❌ NOT about: dropout, weight constraints, batch size selection

### Dropout
- Randomly set neuron outputs to 0 during training (probability p)
- Creates ensemble-like effect: different network topology each step
- Reduces overfitting (variance), does NOT change model capacity (bias)
- At test time: all neurons active, outputs scaled by (1-p)

### L1 vs L2 Regularization — Deep comparison

| Property | L1 (Lasso) | L2 (Ridge) |
|---|---|---|
| Penalty added to loss | Σ\|wᵢ\| | Σwᵢ² |
| Effect on weights | Drives weights to **exactly 0** (sparsity) | Shrinks weights toward 0, never exactly 0 |
| Gradient at w=0 | Undefined (subdifferential exists) | 0 → no force pushing to exactly 0 |
| Use case | Feature selection (irrelevant features → 0) | General overfitting prevention |
| Solution shape | Sparse (many zeros) | Small but non-zero weights |
| Geometry | L1 "ball" has corners at axes → solutions hit corners | L2 "ball" is smooth sphere |

**Why L1 gives exact zeros:** The subgradient at w=0 includes the range [−1,+1]. If the gradient of the loss at w=0 is < 1 in magnitude, the update stops at exactly 0.

**Why L2 doesn't:** The gradient 2w → 0 as w → 0, so the regularization force vanishes before reaching 0.

---

## 4. CNNs — Exactly what convolution does

A convolutional layer = a fully connected layer with **two constraints**:
1. **Connections removed**: each output unit connects only to a local region (receptive field)
2. **Weights shared**: the same filter weights are used at every spatial position

❌ NOT: limiting L2 norm of weights (that's weight decay / L2 regularization)
❌ NOT: pooling (that's a separate operation)

**Operations:**
- **Padding**: add zeros around border → preserves spatial dimensions
- **Stride**: how far the filter moves between applications. Stride=2 halves spatial dimensions
- **Max pooling**: for each n×n region, keep only the maximum → translation invariance, dimension reduction

**Why CNNs work for images:**
- Local structure: nearby pixels are more related than distant ones
- Translation invariance: a feature (edge, texture) can appear anywhere

---

## 5. SEQUENCES: RNN vs LSTM vs TRANSFORMER

### RNN
- Maintains hidden state hₜ = f(hₜ₋₁, xₜ)
- **Problem**: vanishing gradients over long sequences — early tokens forgotten
- Makes no explicit Markov assumption, but in practice limited

### LSTM
- Has **forget gate**, input gate, output gate, cell state
- **Forget gate**: decides what to keep from cell state (values in [0,1])
- Cell state = "conveyor belt" — information can pass unchanged → no vanishing gradient
- Does NOT make Markov assumption (can model arbitrary long-range dependencies)
- ✓ Solves vanishing gradients | ❌ Still sequential (can't parallelize)

### Transformer
- Uses **self-attention** — only mechanism that propagates info along time dimension
- Computes relationships between ALL pairs of tokens simultaneously → parallelizable
- **Position embeddings**: added to token embeddings to encode order (attention is order-invariant without them)
- Can model any length sequence, direct long-range connections
- No recurrent or convolutional layers in standard definition
- ✓ Parallelizable | ✓ Long-range dependencies | ❌ Quadratic memory with sequence length

### Which is sequence-to-sequence?
✓ 1D Convolution, RNN, LSTM, Transformer
❌ Gradient Boosting, Word2Vec, DQN, MLP (no sequential structure)

---

## 6. GENERATIVE MODELS — Full comparison

### Autoencoder
- Encoder: x → z (bottleneck latent representation)
- Decoder: z → x̂ (reconstruction)
- Loss: reconstruction loss only (||x − x̂||²)
- Unsupervised
- z is a **single point** per input
- Cannot generate new samples (latent space not structured)

### Variational Autoencoder (VAE)
- Encoder: x → (μ, σ) i.e., a **distribution** N(μ, σ²) over z
- Sample: z ~ N(μ, σ²) using **reparameterization trick**: z = μ + σ·ε, ε~N(0,I)
- Decoder: z → x̂
- Loss: reconstruction loss + KL(q(z|x) || N(0,I))
  - KL term forces latent space to be structured like N(0,1)
- ❌ **NO discriminator** (that's GAN)
- ✓ Can generate new samples (sample z ~ N(0,I), decode)
- ELBO: L(q,θ) + KL(q,p) = ln p(x|θ). ELBO is a **lower bound** on log-likelihood.

**Why ELBO?** We want to maximize ln p(x|θ) but can't compute it directly (would need to integrate over all z). The ELBO is tractable and provides a lower bound we can optimize.

### GAN (Generative Adversarial Network)
- **Generator G**: random noise z → fake data
- **Discriminator D**: real or fake? → binary output
- Adversarial training: G tries to fool D; D tries to detect fakes
- **Mode collapse**: G produces same few outputs that consistently fool D. Lack of diversity.
- No KL divergence, no ELBO, no encoder

### GAN Variants

| GAN Type | Key feature | Use case |
|---|---|---|
| **Standard GAN** | G + D adversarial | Unconditional generation |
| **Conditional GAN** | Both G and D receive conditioning signal y | Paired input→output (colorization, sketch→photo) |
| **CycleGAN** | Cycle consistency loss: G(F(x))≈x | **Unpaired** image translation (horse→zebra) |
| **StyleGAN** | Separates style and content in latent space | High-quality face generation |

**Conditional GAN vs CycleGAN:**
- Conditional: requires paired training examples (sketch + its photo)
- CycleGAN: works with unpaired collections (horse photos + zebra photos, no matching pairs needed)

### VAE vs GAN comparison

| | VAE | GAN |
|---|---|---|
| Has discriminator? | **NO** | Yes |
| Latent space | Structured (N(0,I)) | Unstructured |
| Training stability | More stable | Can be unstable |
| Mode collapse? | Rare | Common problem |
| Output quality | Slightly blurry | Sharp |

---

## 7. EMBEDDINGS & RECOMMENDER SYSTEMS

### Matrix Factorization
- Decompose user-item rating matrix R ≈ U × Vᵀ
- Each user u gets embedding vector uᵤ, each item i gets vᵢ
- Predicted rating: r̂ᵤᵢ = uᵤ · vᵢ (dot product)
- **Cold start**: new item/user has no interactions → no embedding can be learned
  - NOT about incomplete feature records (those are fine)

### Word2Vec
- Learns word embeddings from co-occurrence in unlabeled text
- Two variants: CBOW (predict word from context) and Skip-gram (predict context from word)
- Similar words → similar vectors (king − man + woman ≈ queen)
- Unsupervised — no labels needed

**Both matrix factorization and Word2Vec:**
- Embedding methods for **featureless objects** (no predefined features)
- Learn a vector for each object in a shared Euclidean space

### Implicit vs Explicit Feedback
- **Explicit**: star ratings, written reviews, thumbs up/down — rare, biased toward active users
- **Implicit**: clicks, views, purchases, listening time — abundant, noisier but more representative

---

## 8. REINFORCEMENT LEARNING

- Agent observes state s, takes action a, receives reward r
- **Why gradient descent is hard**: the environment step s → r is non-differentiable
- **Policy Gradient (PG)**: network outputs P(action|state). Train to maximize expected reward.
- **DQN (Deep Q-Network)**: network outputs Q-value for each action given state. Q(s,a) = expected future reward.
- Difference: PG directly optimizes the policy; DQN learns a value function

---

## 9. TREES & ENSEMBLES

### Decision Tree Splits
Information gain = H(parent) − Σᵥ (|Sᵥ|/|S|) × H(Sᵥ)

**Shortcut**: look at class distribution on each side of the split.
- Most uneven = highest info gain (no need to compute if one split is obviously more extreme)
- Perfect split (all + on one side, all − on other): IG = H(parent) − 0 = H(parent)

**Entropy values to know:**
- H(1, 0) = 0 bits (pure)
- H(1/2, 1/2) = 1 bit (maximum for binary)
- H(1/3, 2/3) ≈ 0.918 bits
- H(1/4, 3/4) ≈ 0.811 bits
- H(1/8, 7/8) ≈ 0.544 bits
- Uniform over n: H = log₂(n) bits

### Bagging vs Boosting — Full comparison

| | Bagging | Boosting |
|---|---|---|
| Training order | **Parallel** — independent | **Sequential** — each corrects previous |
| Data sampling | Bootstrap samples (with replacement) | Reweight misclassified examples |
| What it reduces | **Variance** | **Bias** |
| When to use | Model overfits (high variance) | Model underfits (high bias) |
| Example | Random Forest | AdaBoost, Gradient Boosting |

**Random Forest** = Bagging + random feature subsets at each split (further decorrelates trees)

**AdaBoost**: after each weak learner, increase weights of misclassified examples. Next learner focuses on hard cases.

**Gradient Boosting**: each new tree fits the **residuals** (negative gradient of loss) of the current ensemble. Trees are additive.

**Key fact**: boosting rarely used alone in research — must apply to baseline too for fair comparison.

---

## 10. EVALUATION & METHODOLOGY

### Confusion Matrix

| | Predicted + | Predicted − |
|---|---|---|
| **Actual +** | TP | FN |
| **Actual −** | FP | TN |

**Metrics:**
- Accuracy = (TP+TN)/total
- Recall/TPR = TP/(TP+FN) — of all actual positives, how many caught
- Precision = TP/(TP+FP) — of all predicted positives, how many correct
- FPR = FP/(FP+TN) — of all actual negatives, how many wrongly flagged
- F1 = 2×Precision×Recall/(Precision+Recall)

**ROC AUC**: requires a **ranking classifier** (real-valued score, not just binary prediction). Cannot compute from confusion matrix alone. AUC = P(random positive ranked above random negative).

### Bias-Variance Tradeoff

**Bias**: systematic error — model consistently wrong in same direction. Cause: too simple a model.
**Variance**: random error — model changes a lot between different training sets. Cause: too complex a model.

- High bias + low variance = underfitting (decision stump, linear model on non-linear data)
- Low bias + high variance = overfitting (deep tree, large network, no regularization)
- **Cannot compute** bias or variance from a single model on a single dataset. Need multiple datasets or bootstrapping.

**Reducing bias**: use boosting, increase model capacity, add features
**Reducing variance**: use bagging, add regularization (L1/L2/dropout), get more data, reduce model capacity

### Class Imbalance vs Cost Imbalance
- **Class imbalance**: 99% negative → always predict negative = 99% accuracy (misleading). Use F1, AUC.
- **Cost imbalance**: misclassifying one direction is much worse (e.g., spam filter deleting real emails). Even with balanced classes, this matters.
- SMOTE: synthetic minority oversampling — create new minority examples by interpolating between existing ones

### Bootstrapping
- Sample with replacement from dataset → synthetic datasets
- Use: estimate variance, compute confidence intervals, create diverse training sets (bagging)
- ✓ CAN estimate variance. ❌ Common trap: "bootstrapping cannot estimate variance" = FALSE

### Methodology
- **Never evaluate on training data** — will always look better than true performance
- Train/val/test split: train model on train, tune hyperparameters on val, report once on test
- **k-fold cross-validation**: k rotations, each fold is validation once → more reliable estimate
- **Walk-forward validation**: for time series — always train on past, validate on future
- **Data leakage**: computing normalization stats (mean/std) on full dataset including test = leakage. Should use train set only.

---

## 11. PROBABILITY & INFORMATION THEORY

### Bayes' Rule
P(B|A) = P(A|B) × P(B) / P(A)

For classification: P(class|data) ∝ P(data|class) × P(class)

### Entropy & Cross-Entropy

**Entropy**: H(p) = −Σ p(x) log₂ p(x)
- Measures uncertainty / average bits needed to encode a draw from p
- Maximum at uniform distribution

**Cross-entropy**: H(p,q) = −Σ p(x) log₂ q(x)
- p = true distribution, **q goes in the log**
- Average bits needed to encode data from p using code optimized for q
- Always H(p,q) ≥ H(p)
- ❌ Not symmetric: H(p,q) ≠ H(q,p)

**KL divergence**: KL(p||q) = H(p,q) − H(p)
- "Wasted bits" from using q instead of p
- KL ≥ 0 always. KL = 0 iff p = q
- ❌ Not symmetric: KL(p||q) ≠ KL(q||p)

**THE KEY TRAP — undefined cross-entropy:**
- H(p,q) is **undefined** if q(x) = 0 but p(x) > 0 (you'd need log₂(0) = −∞)
- H(p,q) is **defined** (= 0) if both p(x) = 0 and q(x) = 0 (by convention: 0·log(0) = 0)
- Check EVERY q(x) = 0 position. Is the corresponding p(x) > 0? If yes → undefined.

**Quick log₂ values:**
log₂(1)=0, log₂(2)=1, log₂(4)=2, log₂(8)=3, log₂(1/2)=−1, log₂(1/4)=−2, log₂(1/8)=−3
log₂(a/b) = log₂(a) − log₂(b)
Calculator: log₂(x) = ln(x)/ln(2)

---

## 12. NAIVE BAYES — Full worked procedure

### Classification (no smoothing)
**Goal**: argmax_c P(c) × P(x₁|c) × P(x₂|c) × ... × P(xₙ|c)

**Step 1**: Count class priors from data
- P(Spam) = #spam / #total, P(Ham) = #ham / #total

**Step 2**: For each feature and each class, count conditional probabilities
- P(feature=T | Spam) = (# Spam with feature=T) / (# Spam total)

**Step 3**: Multiply scores for each class (proportional to posterior)
- Score(Spam) = P(Spam) × P(f1|Spam) × P(f2|Spam) × ...
- Score(Ham) = P(Ham) × P(f1|Ham) × P(f2|Ham) × ...

**Step 4**: Predict the class with higher score. For exact probabilities: divide by sum of scores.

### Laplace Smoothing
**Problem**: if a feature-class combination never appeared in training, P=0 → whole product = 0
**Fix**: add pseudo-observations — add 1 to each count, add #values to denominator

Smoothed P(feature=T | class) = (count + 1) / (class_total + #feature_values)

For binary feature (T/F): add 1 to numerator, add 2 to denominator
- Before: 3/4. After smoothing: (3+1)/(4+2) = 4/6

**Important**: do NOT simplify fractions before smoothing (e.g., 2/4 → 1/2 will give wrong smoothed result)

### Full probability (not just argmax)
P(class | email) = Score(class) / (Score(Spam) + Score(Ham))

### Example worked through
Training data (5 spam, 5 ham), features: "crypto" (T/F), "schedule" (T/F):
- P(crypto=T | Spam) = 3/5 → smoothed = 4/7
- P(schedule=T | Spam) = 1/5 → smoothed = 2/7
- P(crypto=T | Ham) = 0/5 → smoothed = 1/7 (without smoothing: would make Ham score = 0!)

New email (crypto=T, schedule=T):
- Score Spam: (1/2)(3/5)(1/5) = 3/50
- Score Ham: (1/2)(0/5)(4/5) = 0 → **Spam wins** (without smoothing)
- With smoothing: Score Spam: (1/2)(4/7)(2/7) = 8/98; Score Ham: (1/2)(1/7)(5/7) = 5/98 → Spam still wins

---

## 13. MARKOV MODELS FOR TEXT CLASSIFICATION

### Bigram language model
P(w₁, w₂, ..., wₙ) = P(w₁) × P(w₂|w₁) × P(w₃|w₂) × ... × P(wₙ|wₙ₋₁)

Each probability estimated from training corpus counts:
- P(w₂|w₁) = count(w₁w₂) / count(w₁)
- P(w₁) = count(w₁) / total words

### Classification with Markov models
P(class | email) ∝ P(email | class) × P(class)
= P(w₁|class) × P(w₂|w₁, class) × ... × P(class)

Build separate bigram models for each class using training emails from that class.

### Probability ratio trick
P(spam|E) / P(ham|E) = [P(E|spam) × P(spam)] / [P(E|ham) × P(ham)]

Many bigram probabilities appear in both numerator and denominator → cancel out. Only the differing terms remain. Ratio > 1 → spam.

---

## 14. BACKPROPAGATION — Complete procedure

### Scalar backprop (f: ℝ → ℝ)
1. **Break into modules**: each module = one simple operation
2. **Draw computation graph**: identify ALL paths from input x to output f
3. **Compute local derivatives** for each module: ∂(output)/∂(input)
4. **Apply chain rule along each path**
5. **Sum if x affects f through multiple paths** (multivariate chain rule)

**Common local derivatives to know:**
- d/dx sin(x) = cos(x)
- d/dx cos(x) = −sin(x)
- d/dx eˣ = eˣ
- d/dx ln(x) = 1/x
- d/dx xⁿ = nxⁿ⁻¹
- d/dx (1/x) = −1/x²
- For f=a·b: ∂f/∂a = b, ∂f/∂b = a (product rule)
- For f=a/b: ∂f/∂a = 1/b, ∂f/∂b = −a/b²

**Worked example (2026 exam)**: f(x) = sin(3/cos x) · cos x
- Modules: a=cos x, b=3/a, c=sin b, f=a·c
- Local derivatives: ∂a/∂x=−sin x, ∂b/∂a=−3/a², ∂c/∂b=cos b, ∂f/∂a=c, ∂f/∂c=a
- Two paths from x to f: (1) x→a→f directly, (2) x→a→b→c→f
- ∂f/∂x = c·(−sin x) + a·cos b·(−3/a²)·(−sin x)
- = −sin x(c − 3cos b/a)

### Matrix backprop (y = xA)
- x is 1×n row vector, A is n×m matrix, y is 1×m row vector
- yᵢ = Σₖ Aₖᵢ xₖ
- Scalar derivative: ∂yᵢ/∂xⱼ = Aⱼᵢ
- **Backward pass**: given upstream gradient y∇ (1×m row vector)
  - x∇ = y∇ · Aᵀ
  - Derivation: x∇ⱼ = Σᵢ y∇ᵢ · (∂yᵢ/∂xⱼ) = Σᵢ y∇ᵢ · Aⱼᵢ = (y∇Aᵀ)ⱼ
- ❌ NOT x∇ = y∇A (missing transpose)

---

## 15. RANKING ERRORS — Full procedure

**Setup**: linear classifier scores each instance. Rank from most negative (lowest score) to most positive (highest score).

**Ranking error**: a PAIR (positive, negative) where the negative is ranked more positive than the positive.
- This is NOT an individual misclassification — it's about relative ordering.

**Coverage matrix**: rows = positive instances, columns = negative instances
- Cell (p, n) = red if negative n ranks above positive p (= error)
- Proportion red = ranking errors / (#pos × #neg) = coverage

**AUC** = 1 − coverage

**Procedure:**
1. Compute score for each instance: s = w·x + b
2. Sort instances by score (ascending = most negative to most positive)
3. For each positive instance p, count how many negatives n have score(n) > score(p) → ranking errors from p
4. Sum over all positives

**Watch for ties**: if score(positive) = score(negative) → convention is to count as a ranking error

---

## 16. ELBO & VAE LOSS — Full derivation

ELBO + KL(q||p) = ln p(x|θ)

Since KL(q||p) ≥ 0: **ELBO ≤ ln p(x|θ)** — ELBO is a lower bound

**Why we use it**: ln p(x|θ) = ln ∫ p(x,z|θ) dz requires integrating over all latent z — intractable. ELBO is tractable.

**VAE loss** (negated, because we minimize):
−ELBO = −E_q[ln p(x|z)] + KL(q(z|x) || N(0,I))
= Reconstruction loss + KL regularizer

ELBO decomposition fill-in-the-blank (2026 exam format):
L(q,θ) + KL(q,p) = E_q ln[p(x,z|θ)/q(z|x)] − E_q ln[p(z|x,θ)/q(z|x)] = ln p(x|θ)

---

## 17. PREPROCESSING

### Normalization methods compared

| Method | Formula | Result | Use when |
|---|---|---|---|
| **Min-max** | (x−min)/(max−min) | [0,1] | Values have known bounds |
| **Z-score** | (x−μ)/σ | Mean=0, std=1 | Values roughly Gaussian |
| **Whitening** | Decorrelate + unit variance | Uncorrelated, unit variance | Features correlated |
| **PCA** | Project onto principal components | Reduced dimensions | Dimensionality reduction |

**Imputation** = filling missing values (mean, median, most frequent). NOT a normalization method.

**One-hot encoding**: for unordered categorical features. Integer encoding (1,2,3) implies false ordering.

**Mean vs median**: mean minimizes MSE, median minimizes MAE (more robust to outliers).

**Survivorship bias**: drawing conclusions from incomplete data that only includes "survivors." WWII planes example: holes on returning planes = where you DON'T need to reinforce.

**Anscombe's Quartet**: 4 datasets with identical mean, variance, correlation, regression line — but completely different distributions. Lesson: always visualize.

---

## 18. SOCIAL IMPACT / UNINTENTIONAL HARM

- Harm depends on **actions taken** based on model predictions, not predictions alone
- If no action is taken on a prediction → unlikely to cause harm
- Sensitive attributes (race, religion): even removing them, correlated proxies remain (zip code, name)
- Separate prediction from decision: evaluate fairness at the decision level, not just accuracy

---

## 19. CRITICAL TRAPS TABLE

| Question framing | Wrong answer | Correct answer |
|---|---|---|
| What reduces variance? | Boosting | **Bagging** |
| What reduces bias? | Bagging | **Boosting** |
| VAE has a ___? | Discriminator | **No discriminator** (that's GAN) |
| LSTM makes a Markov assumption? | Yes | **No** |
| Composing perceptrons = ? | Non-linear | **Still linear** (need activations) |
| Ranking error = ? | Misclassification | **Pair (pos, neg) ranked wrong way** |
| Coverage = ? | errors/total | **errors / (#pos × #neg)** |
| 0·log(0) = ? | Undefined | **0** (by convention in entropy) |
| log₂(0) = ? | 0 | **Undefined** (−∞) |
| H(p,q) when q(x)=0, p(x)>0 = ? | 0 | **Undefined** |
| Bootstrapping estimates variance? | False | **True — it can** |
| Cold start = ? | Incomplete records | **New item/user with no interaction history** |
| Matrix backprop y=xA: x∇ = ? | y∇A | **y∇Aᵀ** |
| L1 drives weights to? | Small values | **Exactly 0** (sparsity) |
| L2 drives weights to? | Exactly 0 | **Small but non-zero** |
| ReLU vs sigmoid in hidden layers? | Sigmoid preferred | **ReLU** (avoids vanishing gradients) |
| Imputation is a ___ method? | Normalization | **Missing value handling** — NOT normalization |
| H(p,q) ≥ or ≤ H(p)? | Could be either | **Always ≥** (equals only when p=q) |
| KL(p||q) symmetric? | Yes | **No — KL(p||q) ≠ KL(q||p)** |
| Bias/variance from single model? | Yes | **No — need multiple datasets** |
| Disjoint events → independent? | Yes | **No — opposite!** disjoint + P>0 → dependent |
| Class imbalance = cost imbalance? | Same thing | **Different problems** |
| Gradient points | Downhill | **Uphill** (descent subtracts gradient) |
| Sequence-to-sequence: is gradient boosting? | Yes | **No** — it's a tree ensemble, not sequential layer |
| kNN is lazy? | No (it trains) | **Yes** — stores data, computes at prediction time |
| k-Means is lazy? | Yes | **No** — builds centroids, discards data |
| Decision tree: can split numeric feature twice? | No | **Yes** — different thresholds |
| Batch norm normalizes to ___ distribution? | Uniform | **Normal (Gaussian)** |

---

## 20. EXAM EXECUTION

**Timing**: 40 Q in 120 min = 3 min/Q average
- Recall Q1–12: 90 sec each. Mark unknowns, move on.
- Combination Q13–25: 2.5 min each. Read ALL 4 options before answering.
- Application Q26–40: 5 min each. Write out your work. Never guess without computing.

**Application strategy**:
- Ranking: compute scores first, draw ranking, then count pairs
- Entropy: check for undefined FIRST before computing anything
- Backprop: draw the computation graph, label all modules, find all paths
- Decision trees: tally distributions for each feature, spot most uneven
- Naive Bayes: don't simplify fractions before smoothing
- Matrix backprop: the answer is almost always y∇Aᵀ

**No penalty for wrong answers** → guess everything. For a 4-option question: eliminate 2, pick better.

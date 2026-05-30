# ML EXAM CRAM — 37+/40
> 40 MCQ · 2h · Formula sheet + handwritten cheat sheet allowed
> Structure: ~12 Recall → ~13 Combination → ~15 Application

---

## PART 1: RECALL (Q1–12) — Know cold

### Learning types
- **Supervised**: labeled data → classification, regression
- **Unsupervised**: unlabeled → k-Means, PCA, autoencoders, density estimation
- **Reinforcement**: agent + environment + rewards
- **Online**: data arrives over time (vs offline = fixed dataset)
- **Transductive**: model sees test **features** (not labels) during training

### Key distinctions
- **Parameters**: learned by training (weights w, bias b)
- **Hyperparameters**: set before training (k in kNN, learning rate, depth)
- **Lazy algorithm**: kNN — stores data, no training. Decision trees/linear/k-Means = NOT lazy
- **Ranking classifier**: orders instances. Needed for ROC AUC. NOT needed for accuracy/precision/recall

### Linear models
- Decision boundary: w·x + b = 0
- Squaring the error: (1) negatives don't cancel, (2) large errors penalized more, (3) MLE under Gaussian noise
- "Points near boundary weigh most" = log loss, NOT squared error

### Preprocessing
- **Normalization (min-max)**: [0,1] — z = (x−min)/(max−min)
- **Standardization (z-score)**: mean=0, std=1 — z = (x−μ)/σ
- **Whitening**: uncorrelated features with unit variance
- **Imputation**: fills missing values — NOT a normalization method
- **One-hot encoding**: for unordered categories (avoids false ordering)
- Median minimizes absolute error (robust to outliers); mean minimizes squared error

### Regularization
- **L1**: sparsity — weights become exactly 0. Favors sparse solutions.
- **L2**: penalizes large weights. Sum of squared weights.
- **Dropout**: randomly disable nodes → ensemble-like effect
- **Batch norm**: normalize layer outputs to be ~N(0,1) over current batch

### Deep learning fundamentals
- Composing perceptrons = still linear. Activation functions make networks non-linear.
- **Vanishing gradients**: sigmoid derivatives < 0.25 → gradient shrinks through layers → use ReLU
- **Tensors**: scalar=0, vector=1, matrix=2, RGB image=3, video=4-tensor
- Lazy execution: graph compiled once. Eager: graph built each forward pass.
- Multivariate chain rule: needed when node affects output via **multiple paths** → SUM contributions

### CNNs
- Convolution = fully connected with: (a) connections removed + (b) weights shared
- NOT about: limiting L2 norm, pooling operations
- Padding → preserves spatial dimensions. Stride > 1 → reduces resolution.

### Sequences
- **Markov assumption**: probability depends only on fixed history window
- **RNN**: has hidden state, vanishing gradient problem
- **LSTM**: has forget gate, solves vanishing gradients. Does NOT make Markov assumption.
- Sequence-to-sequence: Convolutions, RNN, LSTM — NOT gradient boosting, Word2Vec, DQN

### Generative models
- **Autoencoder**: encoder → latent → decoder (reconstruction loss)
- **VAE**: sampling step + KL loss + distribution output. **NO discriminator.**
- **GAN**: generator + discriminator (adversarial). Mode collapse risk.
- **Conditional GAN**: paired input→output (e.g., colorization)
- **CycleGAN**: unpaired translation, cycle-consistency loss
- ELBO: L(q,θ) + KL(q,p) = ln p(x|θ) → VAE maximizes ELBO (lower bound on log-likelihood)

### Trees & Ensembles
- Decision tree: choose feature that maximizes information gain (reduces entropy most)
- Pruning: prevent overfitting using validation set
- **Bagging** (Random Forest): reduces **variance**. Many uncorrelated trees.
- **Boosting** (AdaBoost, gradient boosting): reduces **bias**. Sequential, each corrects previous.
- Bias high → use boosting. Variance high → use bagging.

### Embeddings
- **Matrix factorization**: user-item matrix → embeddings for collaborative filtering
- **Word2Vec**: word embeddings from co-occurrence
- **Cold start**: new item has NO data → no embedding (NOT about incomplete records)
- **Implicit feedback**: inferred from behavior (clicks, views), not explicit ratings

### Evaluation
- Bias/variance decomposition: need **multiple datasets** (can't compute from single model)
- Bootstrapping: CAN estimate variance (common trap: "cannot")
- Survivorship bias: only see "survivors" → biased conclusions
- SMOTE: data augmentation for class imbalance (synthetic minority examples)
- ROC AUC: needs ranking classifier, NOT just confusion matrix

### RL
- Policy Gradients: predict action probability distribution
- DQN: predict Q-values for each action
- Hard to use gradient descent: environment is non-differentiable

---

## PART 2: COMBINATION (Q13–25) — Pattern recognition

### "Which is NOT" traps
| Wrong answer trap | Correct answer |
|---|---|
| "Imputation is normalization" | Imputation handles missing values — NOT normalization |
| "Composing perceptrons = non-linear" | Still linear! Need activations. |
| "Bootstrapping can't estimate variance" | FALSE — it can |
| "Sigmoid preferred over ReLU" | FALSE — ReLU reduces vanishing gradients |
| "VAE has discriminator" | VAE doesn't. GAN does. |
| "Accuracy good for imbalanced data" | FALSE — use F1/AUC |
| "Disjoint events → independent" | OPPOSITE — disjoint (and P>0) → dependent |

### Key "which belongs" patterns
- **Sequence-to-sequence layers**: Conv1D, RNN, LSTM — NOT: gradient boosting, DQN, Word2Vec
- **Unsupervised methods**: k-Means, PCA, autoencoders, density estimation — NOT: logistic regression, SVM
- **Lazy algorithms**: kNN only
- **Has forget gate**: LSTM only
- **Needs ranking classifier**: ROC AUC only (not precision, recall, accuracy)

### Probability & information theory facts
- H(p,q) undefined when q(x)=0 but p(x)≠0 (infinite codelength)
- H(p,q) ≥ H(p) always (cross-entropy ≥ entropy)
- KL(p,q) = H(p,q) − H(p) ≥ 0
- For uniform over n: H = log₂n bits
- 0·log(0) = 0 by convention (defined!)

---

## PART 3: APPLICATION (Q26–40) — Mechanical, learn the procedure

### TYPE A: RANKING ERRORS (always Q26–28)

**Setup**: linear classifier, rank instances, count errors.

**Step 1** — Compute score for each instance: s = w·x + b

**Step 2** — Rank from most negative (score → −∞) to most positive (score → +∞)
- Watch signs: negative weight means **higher feature value = more negative class**

**Step 3** — Count ranking errors: a PAIR (pos, neg) where neg is ranked more positive than pos
- Draw coverage matrix: positives on rows, negatives on columns. Red cell = error.

**Step 4** — Coverage = ranking errors / (num_pos × num_neg)

**Traps**:
- Ranking error = PAIR, not individual misclassification
- If one coefficient is 0, only the other feature matters
- Coverage matrix size = #pos × #neg

---

### TYPE B: ENTROPY & CROSS-ENTROPY (always Q31–33)

**Formulas**:
- H(p) = −Σ p(x) log₂ p(x)
- H(p,q) = −Σ p(x) log₂ q(x)  ← p is true, q goes in log
- KL(p,q) = H(p,q) − H(p)

**Rules**:
- 0·log(0) = 0 (defined)
- log₂(0) with nonzero p(x) → H(p,q) = **undefined**
- Uniform over n outcomes → H = log₂n

**Quick log₂ values**: log₂(1)=0, log₂(2)=1, log₂(4)=2, log₂(8)=3, log₂(1/2)=−1

---

### TYPE C: SCALAR BACKPROP (always Q29–30)

**Procedure**:
1. Break f(x) into named modules: a, b, c, ... with simple operations
2. Draw the computation graph — find ALL paths from x to output
3. Apply multivariate chain rule: sum contributions over all paths
4. Compute local derivatives for each module
5. Multiply along each path, sum paths

**2026 example**: f(x) = sin(3/cos x) · cos x
- a = cos x, b = 3/a, c = sin b, f = ac
- Two paths: x → a → f directly, and x → a → b → c → f
- ∂f/∂x = (∂f/∂a)(∂a/∂x) + (∂f/∂c)(∂c/∂b)(∂b/∂a)(∂a/∂x)
- Local derivatives: ∂f/∂a=c, ∂f/∂c=a, ∂c/∂b=cos b, ∂b/∂a=−3/a², ∂a/∂x=−sin x
- Result: −sin x(c − 3cos b/a)

**Key local derivatives to know**:
- sin → cos (derivative)
- cos → −sin
- 1/a = a⁻¹ → −a⁻² = −1/a²
- product ac: ∂/∂a = c, ∂/∂c = a

---

### TYPE D: VAE / ELBO (Q31–32 in 2026)

**ELBO decomposition**:
L(q,θ) + KL(q,p) = ln p(x|θ)

- L(q,θ) = ELBO (Evidence Lower BOund)
- KL ≥ 0, so L ≤ ln p(x|θ) — L is a LOWER BOUND
- We want to maximize ln p(x|θ) but cannot compute it directly → maximize L instead
- The VAE loss = −ELBO = reconstruction loss + KL term

**Why needed**: cannot easily compute log probability of x. Decomposition gives a tractable lower bound.

---

### TYPE E: NAIVE BAYES (Q33–35 in 2026)

**Classification rule**: argmax_c p(c) · Π p(xᵢ|c)

**Procedure**:
1. Count class priors from data: p(Spam) = #spam/#total
2. Count feature likelihoods: p(feature=T|class) = count/class_total
3. Multiply: p(c)·p(x₁|c)·p(x₂|c)·...
4. Argmax over classes

**Laplace smoothing** (for unseen combinations):
- Add 1 to each count numerator
- Add #values to denominator
- e.g., p(C|Ha) = (3+1)/(4+2) = 4/6

**Full probability** (not just argmax):
- p(class|email) = score(class) / (score(Spam) + score(Ham))

---

### TYPE F: DECISION TREES (Q36–38 in 2026)

**Choose best split**: find feature with most uneven class distribution after split

**Shortcut** (when splits are always one feature value vs another):
1. For each feature, tally Y/N in A-side and B-side
2. Most uneven = furthest from 50/50 → best split (highest info gain)

**Information gain formula**:
IG(feature) = H(before) − Σ_v (|Sv|/|S|) · H(Sv)

**Entropy**: H(p) = −p·log₂p − (1−p)·log₂(1−p)
- H(1/2) = 1 (maximum), H(0) = H(1) = 0 (pure)
- H(1/3) ≈ 0.918, H(1/4) ≈ 0.811

**In partial trees**: only consider instances that reach that node.

---

### TYPE G: MATRIX BACKPROP (Q39–40 in 2026)

**Setup**: y = xA where x, y are row vectors, A is matrix
- yᵢ = Σₖ Aₖᵢ xₖ

**Scalar derivative**: ∂yᵢ/∂xⱼ = Aⱼᵢ (only k=j term survives)

**Gradient computation**: given y∇ (upstream gradient row vector)
- x∇ = y∇ · Aᵀ (multiply upstream by transpose of A)
- This is because: x∇ⱼ = Σᵢ y∇ᵢ · (∂yᵢ/∂xⱼ) = Σᵢ y∇ᵢ · Aⱼᵢ = (y∇A^T)ⱼ

**Key rule**: for y = xA, backward pass gives x∇ = y∇Aᵀ

---

### TYPE H: MARKOV MODELS (Q33–35 in 2024/2025)

**Bigram probability**: p(w₁w₂...wₙ) = p(w₁) · p(w₂|w₁) · p(w₃|w₂) · ...

**Classification**: Bayes' rule: p(class|seq) ∝ p(seq|class)·p(class)
- Ratio of class probabilities: p(class1|seq)/p(class2|seq) = [p(seq|c1)·p(c1)] / [p(seq|c2)·p(c2)]

---

## CRITICAL TRAPS — Memorize

| Trap | Wrong | Correct |
|---|---|---|
| Boosting reduces | variance | **bias** |
| Bagging reduces | bias | **variance** |
| VAE has | discriminator | **NO discriminator** (GAN does) |
| LSTM makes | Markov assumption | **no** — handles arbitrary dependencies |
| Ranking error = | misclassification | **PAIR** (pos, neg) where neg ranked higher |
| Coverage formula | errors / total_pairs_possible | errors / (#pos × #neg) |
| 0·log(0) = | undefined | **0** (by convention) |
| Bootstrapping | can't estimate variance | **CAN** estimate variance |
| Composing perceptrons = | non-linear | **still linear** |
| Cold start = | incomplete records | **new item, no historical data** |
| Matrix backprop y=xA: x∇ = | y∇A | **y∇Aᵀ** |
| Imputation is | normalization | **NOT** — it fills missing values |

---

## EXAM EXECUTION

- **Q1–12 (Recall)**: 2 min each. Mark unknowns, move on. Come back.
- **Q13–25 (Combination)**: 3 min each. Read all 4 options. Eliminate obviously wrong.
- **Q26–40 (Application)**: 5 min each. Use a systematic procedure — never jump to answer.
- **Time budget**: 24 + 39 + 75 = 138 min < 120 min → budget 90 sec for each recall, 2.5 min combination, 4 min application. Skip and return.
- **No penalty** for wrong answers → guess if unsure. Eliminate 2, pick better.
- For application: write out your work explicitly — easier to spot errors.

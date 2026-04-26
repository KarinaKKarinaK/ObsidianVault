# Core Concepts & Definitions

> [!info] Recall questions (Q1–Q12) test these directly. Know each definition precisely.

See also: [[02 - Models & Algorithms]], [[05 - Evaluation & Methodology]]

---

## Lecture 1: Introduction

- **Instances**: individual examples/data points we learn from
- **Features**: measurable attributes of each instance (input to model)
- **Classes/Labels**: target values we want to predict
- **Model space**: set of all possible models (each point = one model)
- **Feature space**: each point = one instance in the dataset
- **Supervised learning**: learn from labeled data (classification, regression)
- **Unsupervised learning**: learn from unlabeled data (clustering, density estimation, generative modeling)
  - Unsupervised methods: k-Means, clustering, density estimation, PCA, autoencoders
- **Reinforcement learning**: agent takes actions, receives rewards from environment
- **Online learning**: data arrives over time (vs offline: fixed dataset)

---

## Lecture 2: Linear Models

- **Linear model**: $w^Tx + b$ — weighted sum of features + bias
- **Decision boundary**: hyperplane where $w^Tx + b = 0$
- **Feature engineering**: derive new features to make data linearly separable
  - Linear boundary in new space = non-linear boundary in original space
- **Hyperparameters**: set **before** training (e.g., $k$ in kNN, learning rate)
  - vs **Parameters**: learned by the training algorithm (e.g., weights $w$)
- **Squaring the error** — three reasons:
  1. Negative and positive differences don't cancel
  2. Large errors count heavily
  3. Consequence of assuming normally distributed errors (maximum likelihood)
  - **NOT** a reason: "points near boundary weigh most heavily" (that's log loss)

---

## Lecture 3: Methodology & Evaluation

- **Most important rule**: never judge performance on training data
- **Overfitting**: model memorizes training data, poor generalization
- **Train/validation/test split**: evaluate hyperparameters on validation, report on test
- **Cross-validation**: k-fold rotation of validation set
- **Walk-forward validation**: for temporal data — preserves time ordering
- **Multiple testing**: testing too many times on test set → inflated performance
- **Lazy algorithm**: stores training data, no real training (e.g., kNN)
  - Decision trees, linear classifiers, k-Means are NOT lazy
- **Ranking classifier**: orders instances from most negative to most positive
	- Needed for ROC AUC computation
	- Not needed for precision, recall, accuracy, confusion matrix

---

## Lecture 4: Preprocessing

- **Survivorship bias**: drawing conclusions from incomplete data (only observing "survivors"). Classic WWII example: reinforce where returning planes are NOT hit
- **Anscombe's Quartet**: datasets with identical statistics but different distributions → always visualize
- **Normalization (min-max)**: scale to [0,1]. $z = \frac{x - x_{min}}{x_{max} - x_{min}}$
- **Standardization (z-score)**: transform to mean=0, std=1. $z = \frac{x - \mu}{\sigma}$
- **Whitening**: transform to uncorrelated features with unit variance
- **Imputation**: fill in missing values (mean, median, mode, predictive) — NOT a normalization method
- **One-hot encoding**: preferred over integer coding for unordered categories (avoids false ordering)
- **PCA**: can be used for normalization/dimensionality reduction
- Mean minimizes squared error; **median** minimizes absolute error (robust to outliers)

---

## Lecture 5: Probability

- **Frequentist vs Bayesian**: see [[04 - Probability & Information Theory]]
- **Maximum likelihood**: choose model that maximizes $p(\text{data}|\theta)$
- **Log-likelihood**: $\ln p(\text{data}|\theta)$ — maximize this (equivalent, numerically stable)
- As a loss: minimize $-\ln p(\text{data}|\theta)$ (convention: lower = better)

---

## Lecture 6: Deep Learning

- **Perceptrons**: linear → composing them gives nothing new
- **Activation functions**: make networks non-linear
- **Vanishing gradients**: sigmoid derivatives < 0.25 → gradient shrinks through layers
  - Solution: ReLU (derivative 0 or 1), LSTM (for sequences)
- **Lazy vs eager execution**:
  - **Lazy**: computation graph compiled and kept static during training
  - **Eager**: computation graph built for each forward pass
- **Backpropagation**: compute gradients via chain rule through computation graph
  - **Multivariate chain rule**: needed when node affects output through multiple paths → SUM contributions
- **Tensors**: generalization of matrices
  - Scalar = 0-tensor, vector = 1-tensor, matrix = 2-tensor
  - RGB image = 3-tensor, video = **4-tensor**
- Modern frameworks: don't compute full Jacobians, compute upstream × local derivative product directly

---

## Lecture 7: Regularization & Practical DL

- **L1 regularization**: promotes **sparsity** (weights become exactly 0). Penalizes points near axes less.
- **L2 regularization**: penalizes large weights, prevents overfitting. Sum of squared weights.
- **Dropout**: randomly disable nodes → ensemble-like effect
- **Batch normalization**: normalize layer output to be **normally distributed** over current batch

---

## Lecture 8: CNNs

- Convolution = fully connected with: connections removed + weights shared
- NOT: limiting L2 norm of weights
- Padding preserves spatial dimensions; stride > 1 reduces resolution
- Max pooling: returns max from each n×n region

---

## Lecture 9: Sequences

- **Markov assumption**: probability depends only on fixed number of previous items
- **RNN**: hidden state, vanishing gradient problem
- **LSTM**: forget gate, solves vanishing gradients, does NOT make Markov assumption
- Both can be used in VAE architecture
- **Sequence-to-sequence layers**: Convolutions, RNN, LSTM (NOT gradient boosting, Word2Vec, DQN)

---

## Lecture 10: Trees & Ensembles

- **Information gain**: choose split that reduces entropy most
- **Pruning**: prevent overfitting by removing nodes using validation set
- **Bagging** → reduces variance. **Boosting** → reduces bias.
- **Random Forest**: bagging + random features = reduces variance
- Boosting rarely used alone in research (must also boost baseline)

---

## Lecture 11: Transformers

- **Self-attention**: only mechanism that propagates info along time dimension
- **Position embeddings**: allow model to use token ordering
- No recurrent or convolutional layers in standard transformer
- Can handle variable-length sequences

---

## Lecture 12: Generative Models

- **Autoencoder**: encoder → latent → decoder, reconstruction loss
- **VAE**: adds sampling step, KL loss, distribution output. NO discriminator.
- **GAN**: generator + discriminator, adversarial training
- **Mode collapse**: generator produces same output for all inputs
- **Conditional GAN**: for paired input→output tasks (e.g., colorization)
- **CycleGAN**: unpaired translation, cycle-consistency loss
- VAE and GAN connection: both train generator networks, different approaches

---

## Lecture 13: Embeddings & Recommender Systems

- **Matrix factorization**: decompose user-item matrix, learn embeddings
- **Word2Vec**: learn word embeddings from co-occurrence
- Both: embedding methods for **featureless objects** into Euclidean space (each object = vector)
- **Cold start problem**: new item has no data → no embedding
  - NOT about incomplete records (that's fine for matrix factorization)
- **Implicit feedback**: associations inferred from user behavior (not explicit ratings)

---

## Lecture 14: Reinforcement Learning

- **Policy Gradients**: predict action probability distribution
- **DQN**: predict Q-values for each action
- **Gradient descent is hard**: non-differentiable step between model output and reward
- **Inductive learning**: learn general model from training data
- **Transductive learning**: model sees **features** of test data during training (not labels)

---

## Social Impact

- **Unintentional harm**: depends on **actions** taken based on predictions
  - If no action taken → unlikely to cause harm
- Attributes like address/birthplace correlate with sensitive attributes (ethnicity)
- Separate predictions from actions

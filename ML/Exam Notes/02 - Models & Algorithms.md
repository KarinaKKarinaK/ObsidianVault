# Models & Algorithms

> [!info] Every model covered in the course. Recall questions test definitions; combination questions test comparisons between models.

See also: [[03 - Loss Functions & Optimization]], [[01 - Core Concepts & Definitions]]

---

## Linear Models

### Linear Regression `ON SHEET`
- Model: $w^Tx + b = y$ (predict continuous value)
- Loss: least squares $\frac{1}{2}\sum_i (f_\theta(x_i) - y_i)^2$
- Same as a neural network with linear output and no hidden layers

### Linear Classification `ON SHEET`
- Model: $w^Tx + b >^? 0$ (decision boundary is a hyperplane)
- Positive side: $w^Tx + b > 0$
- Can use least squares loss or log loss
- **Not linearly separable?** → derive new features (feature engineering) to get non-linear boundary in original space

### Logistic Regression
- Linear classifier + sigmoid activation: $q = \sigma(w^Tx + b)$
- Output is a probability
- Loss: cross-entropy / log loss
- Same as a neural network with sigmoid output and no hidden layers

---

## k-Nearest Neighbors (kNN)
- **Lazy algorithm**: stores training data, no model training
- At test time: find $k$ closest training instances, majority vote
- Hyperparameter $k$ controls smoothness
- Non-parametric, can learn any decision boundary
- Slow at test time for large datasets

---

## Support Vector Machines (SVMs)
- Find the **maximum margin** hyperplane
- **Support vectors**: points where $y_i(w^Tx_i + b) = 1$ (closest to boundary)
- **Hard margin**: no misclassifications allowed
- **Soft margin**: allow violations with penalty $C$ `ON SHEET`
  - Primal form: remove constraints → use gradient descent
  - Dual form: remove $w$ → allows **kernel trick**
- **Kernel trick**: compute dot products in high-dimensional space without explicitly transforming

---

## Decision Trees
- Split on features to maximize **information gain** `ON SHEET`
- Works natively on **categorical features**
- For numeric features: choose a threshold to create binary split
- Splitting on same categorical feature twice is useless; numeric features can be reused
- **Overfitting**: trees grow until all leaves are pure → prune using validation set
- No feature already split on (categorical) needs to be split again

---

## Ensemble Methods

### Bagging (Bootstrap Aggregating)
- Train multiple models on **bootstrapped** datasets
- Average predictions → reduces **variance**
- **Random Forest**: bagging + random feature subsets per split

### Boosting
- Train models sequentially, each focusing on previous errors
- Reduces **bias**
- **AdaBoost**: reweight misclassified instances
- **Gradient Boosting**: fit residuals of previous model
- Rarely used alone in research: if applied to your model, must also apply to baseline

---

## Neural Networks

### Perceptron
- Single linear classifier with step activation
- **Problem**: composition of linear functions is still linear → need non-linear activations

### Multi-Layer Perceptron (MLP)
- Hidden layers + non-linear activations (ReLU, sigmoid)
- Universal approximator (with enough hidden units)
- Trained with backpropagation + gradient descent

### Convolutional Neural Networks (CNNs)
- A fully connected layer with two constraints:
  1. Some connections **removed** (local connectivity)
  2. Some weights **forced to be equal** (weight sharing)
- NOT: limiting the L2 norm of weights
- Good for spatial data (images)
- Can be used as sequence-to-sequence layers

### Recurrent Neural Networks (RNNs)
- Process sequences by maintaining hidden state
- **Problem**: vanishing gradient for long sequences
- Makes no explicit Markov assumption, but in practice limited by vanishing gradients

### LSTM (Long Short-Term Memory)
- Solves vanishing gradient with **gating mechanism**
- All LSTMs have a **forget gate** (allows ignoring parts of cell state)
- Does NOT make the Markov assumption
- Can be used as encoder/decoder in VAE

### Transformers
- Replace recurrence with **self-attention** mechanism
- Self-attention is the only part that propagates information along the time dimension
- **Position embeddings**: allow behavior to depend on token ordering
- Not required for generation, but help
- No recurrent or convolutional layers (in the standard definition)
- Maximum context length in practice, but can handle variable-length sequences

### Batch Normalization
- Normalizes layer output to be **normally distributed** over the current batch
- Not uniformly distributed, not about batch size selection

---

## Generative Models

### Autoencoders
- Encoder: input → latent representation
- Decoder: latent → reconstruction
- Trained to minimize reconstruction loss
- Unsupervised (no labels needed)

### Variational Autoencoders (VAEs)
Differences from regular autoencoder:
1. Encoder outputs **distribution** (mean + variance), not a single point
2. **Sampling step** in the middle (reparameterization trick for backprop)
3. **KL loss term** ensuring latent space ≈ standard normal $\mathcal{N}(0, I)$
4. Does **NOT** have a discriminator (that's GANs!)

### Generative Adversarial Networks (GANs)
- Generator: random noise → fake data
- Discriminator: real vs fake
- Trained adversarially
- **Mode collapse**: all outputs look the same (like average of data)
  - Cause: comparing random sample to random target, no matching

### GAN Variants
- **Conditional GAN**: generator receives input + noise → controlled output (e.g., colorization)
- **CycleGAN**: unpaired image translation, cycle-consistency loss
- **StyleGAN**: separates style and content in generation

### What Connects VAE and GAN?
Both are ways to train a **generator network** that maps random input to realistic output. Different training approaches.

---

## Embedding / Recommender Models

### Matrix Factorization
- Decompose user-item matrix into low-rank factors
- Each user and item gets an **embedding vector**
- Predict rating ≈ dot product of embeddings
- **Cold start problem**: new item/user has no data → no embedding

### Word2Vec
- Learn word embeddings from co-occurrence
- Similar words → similar vectors
- Both Word2Vec and matrix factorization are embedding methods for **featureless objects**

---

## Reinforcement Learning
- Agent takes actions, receives rewards from environment
- **Why gradient descent is hard**: non-differentiable step between model output and reward (the environment)
- **Policy Gradients (PG)**: predict probability distribution over actions
- **Deep Q-Learning (DQN)**: predict Q-value for each action given state
- Difference: PG trains policy network directly; DQN trains value network

---

## Dimensionality Reduction

### PCA (Principal Component Analysis)
- Find orthonormal basis that maximizes variance
- Can be used for normalization (but primarily for dimensionality reduction)
- **Orthonormal basis**: inverse = transpose `ON SHEET`-adjacent
- Unsupervised method

---

## Clustering

### k-Means
- Assign points to nearest centroid, update centroids
- Unsupervised
- NOT a lazy algorithm (learns centroids, can discard data)

---

## Quick Classification Table

| Method | Supervised? | Lazy? | Linear? |
|--------|-----------|-------|---------|
| Linear regression | Yes | No | Yes |
| Logistic regression | Yes | No | Yes |
| kNN | Yes | **Yes** | No |
| SVM | Yes | No | Yes (without kernel) |
| Decision tree | Yes | No | No |
| Random forest | Yes | No | No |
| MLP | Yes | No | No |
| k-Means | No | No | N/A |
| PCA | No | No | Yes |
| VAE | No | No | No |
| GAN | No | No | No |

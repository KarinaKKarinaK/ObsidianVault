## 1) PCA as matrix factorization

Principal Component Analysis (PCA) can be reframed as a ==matrix factorization== problem, connecting it to the recommender system framework from the previous lecture.

### Standard PCA recap

PCA finds a low-dimensional representation of data that preserves as much variance as possible. Given data matrix $X \in \mathbb{R}^{n \times p}$ (centered), PCA finds directions (principal components) along which the data varies most.

### The matrix factorization view

PCA decomposes the data matrix:

$$X \approx Z W^\top$$

where:
- $Z \in \mathbb{R}^{n \times k}$: the ==low-dimensional representations== (scores) for each data point
- $W \in \mathbb{R}^{p \times k}$: the ==principal component directions== (loadings)
- $k$: number of components kept

> [!important] PCA ↔ Matrix factorization connection
> | Recommender system | PCA |
> |---|---|
> | User embeddings $U$ | Data representations $Z$ |
> | Item embeddings $M$ | Principal components $W$ |
> | Rating matrix $R$ | Data matrix $X$ |
> | $R \approx U^\top M$ | $X \approx Z W^\top$ |
>
> *// PCA is just matrix factorization where ALL entries are observed (no missing values) and the factors are constrained to be orthogonal.*

---

## 2) PCA variants through the factorization lens

Viewing PCA as factorization opens the door to variants that standard PCA can't handle.

### Incomplete PCA

What if the data matrix has ==missing values==? Standard PCA requires a complete matrix, but the factorization view handles it naturally: just minimize the reconstruction error on observed entries only.

$$\min_{Z, W} \sum_{(i,j) \in \text{observed}} (x_{ij} - \mathbf{z}_i^\top \mathbf{w}_j)^2$$

*// This is exactly the recommender system setup! "Incomplete PCA" and "matrix factorization for recommendations" are the same algorithm. The only difference is the application domain.*

### Sparse PCA

Add an ==L1 penalty== on the loadings $W$ to encourage sparsity (many zero entries):

$$\min_{Z, W} \|X - ZW^\top\|_F^2 + \lambda \|W\|_1$$

*// Standard PCA components are linear combinations of ALL features. Sparse PCA forces each component to use only a few features, making the result more interpretable. "This component is driven by features 3, 7, and 12" is easier to understand than "it's 0.02 × feature 1 + 0.15 × feature 2 + ..."*

### Logistic PCA

For ==binary data== (0/1 matrices), squared error doesn't make sense. Replace the reconstruction loss with a logistic (cross-entropy) loss:

$$p(x_{ij} = 1) = \sigma(\mathbf{z}_i^\top \mathbf{w}_j)$$

*// If your data is binary (user clicked or didn't; gene is expressed or not), logistic PCA treats the factorization as predicting probabilities, which is more appropriate than treating 0/1 as continuous values.*

### Non-negative Matrix Factorization (NMF)

Constrain both $Z \geq 0$ and $W \geq 0$ (all entries non-negative):

$$X \approx ZW^\top, \quad Z \geq 0, \; W \geq 0$$

> [!tip] Why non-negativity?
> When factors are non-negative, the representation is ==**additive**== — each component contributes positively. This gives a "parts-based" decomposition:
> - For face images: components correspond to nose, mouth, eyes (parts)
> - Standard PCA components look like full faces with positive and negative regions
> - NMF components look like recognizable parts
>
> *// You can only ADD features, never subtract. This forces the model to decompose objects into building blocks rather than using cancellation tricks.*

---

## 3) Summary of PCA variants

| Variant | Key modification | When to use |
|---|---|---|
| **Standard PCA** | Orthogonal factors, MSE loss | Complete numeric data |
| **Incomplete PCA** | Loss on observed entries only | Missing values |
| **Sparse PCA** | L1 penalty on loadings | Need interpretable components |
| **Logistic PCA** | Cross-entropy loss | Binary data |
| **NMF** | Non-negativity constraints | Parts-based decomposition |

---

## 4) Graph models (overview)

### Graphs as data

Many real-world structures are naturally represented as ==**graphs**==: social networks, molecules, citation networks, road maps.

- **Nodes** = entities (people, atoms, papers)
- **Edges** = relationships (friendships, bonds, citations)
- Nodes can have ==feature vectors==; edges can have weights or types

### Embeddings for graphs

The same embedding idea applies: learn a vector $\mathbf{z}_v$ for each node such that ==graph structure is preserved in the embedding space==.

*// If two people are friends (connected by an edge), their embedding vectors should be close. If they're far apart in the social network, their vectors should be far apart too.*

### Common graph tasks

| Task | Description | Example |
|---|---|---|
| **Node classification** | Predict a label for each node | Is this user a bot? |
| **Link prediction** | Predict whether an edge exists | Will these two users become friends? |
| **Graph classification** | Classify an entire graph | Is this molecule toxic? |

### Connection to matrix factorization

An adjacency matrix $A$ (where $a_{ij} = 1$ if nodes $i, j$ are connected) can be factorized just like a rating matrix:

$$A \approx Z^\top Z$$

This gives node embeddings where the dot product predicts edge existence — ==link prediction as matrix factorization==.

*// The adjacency matrix is just another matrix with (mostly) missing/zero entries. Factorizing it gives embeddings. This bridges recommender systems, PCA, and graph learning under one framework.*

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **PCA as factorization** | $X \approx ZW^\top$; same framework as recommender systems |
| **Incomplete PCA** | Handle missing values by loss on observed entries only |
| **Sparse PCA** | L1 penalty → few non-zero loadings → interpretable |
| **Logistic PCA** | Cross-entropy loss for binary data |
| **NMF** | Non-negative factors → additive, parts-based decomposition |
| **Graph embeddings** | Learn node vectors that preserve graph structure |
| **Adjacency factorization** | $A \approx Z^\top Z$; link prediction as matrix factorization |

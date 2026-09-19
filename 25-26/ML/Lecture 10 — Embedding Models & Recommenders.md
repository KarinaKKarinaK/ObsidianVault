## 1) Recommender systems: the problem

Given a matrix of users × items with mostly missing entries (e.g., movie ratings), ==predict the missing values== so you can recommend items a user would like.

*// Netflix has millions of users and thousands of movies. Each user has rated maybe 100 movies. The job: guess how much each user would like the movies they haven't seen yet, then recommend the best ones.*

### The Netflix Prize

In 2006, Netflix offered $1M to anyone who could beat their recommendation system by 10%. The winning solution combined matrix factorization with ensemble methods. This competition popularized ==**collaborative filtering**==.

### Types of feedback

| Type | What you observe | Example |
|---|---|---|
| **Explicit** | User gives a rating | 1–5 stars on a movie |
| **Implicit** | User behavior implies preference | Clicks, watch time, purchases |

*// Explicit feedback is clean but rare (most users don't rate things). Implicit feedback is noisy but abundant (you always know what someone clicked on).*

---

## 2) Collaborative filtering: the abstract task

> [!important] Core assumption
> ==Users who agreed in the past will agree in the future.== If Alice and Bob both loved movies A, B, C, and Alice loved movie D, then Bob will probably like D too.

No content features needed — just the pattern of who liked what. This is "collaborative" because users implicitly collaborate through their shared ratings.

### Social impact note

Recommender systems can create ==**filter bubbles**==: they keep showing you things similar to what you already like, narrowing your exposure. This can reinforce existing preferences and biases.

---

## 3) Matrix factorization

### The model

Represent each user $u$ as a vector $\mathbf{u} \in \mathbb{R}^k$ and each movie $m$ as a vector $\mathbf{m} \in \mathbb{R}^k$. The predicted rating is:

$$\hat{r}_{um} = \mathbf{u}^\top \mathbf{m}$$

*// Each user and each movie gets a $k$-dimensional "personality." The dot product measures compatibility: if user and movie vectors point in the same direction, the predicted rating is high.*

These vectors are ==**embeddings**== — the same concept as word embeddings, but for users and movies. The dimension $k$ (typically 20–200) is a hyperparameter.

### Matrix view

Stack all user vectors into $U \in \mathbb{R}^{k \times n_u}$ and all movie vectors into $M \in \mathbb{R}^{k \times n_m}$. Then:

$$R \approx U^\top M$$

The full ratings matrix $R$ is approximated by the product of two ==low-rank matrices==.

> [!important] Why "factorization"?
> We're decomposing (factoring) the big ratings matrix $R$ into two smaller matrices. The rank $k$ controls the expressiveness:
> - Small $k$: very compressed, captures only broad patterns
> - Large $k$: more expressive but risks overfitting

---

## 4) Training: handling missing values

### The loss

We only compute the loss on ==**observed entries**== (not the missing ones):

$$\mathcal{L} = \sum_{(u,m) \in \text{observed}} (r_{um} - \mathbf{u}^\top \mathbf{m})^2$$

*// You can't penalize the model for getting an unobserved rating wrong — you don't know the true value. So you only train on what you have, and hope the learned embeddings generalize to the missing entries.*

### Optimization: two approaches

**Alternating Least Squares (ALS)**:
1. Fix $M$, solve for optimal $U$ (this is just linear regression)
2. Fix $U$, solve for optimal $M$ (again linear regression)
3. Alternate until convergence

*// Each sub-problem is a standard least squares problem with a closed-form solution. You toggle back and forth, each time improving the other matrix.*

**SGD (Stochastic Gradient Descent)**:
For a single observed entry $(u, m)$ with rating $r$:

$$\text{error} = r - \mathbf{u}^\top \mathbf{m}$$
$$\mathbf{u} \leftarrow \mathbf{u} + \eta \cdot \text{error} \cdot \mathbf{m}$$
$$\mathbf{m} \leftarrow \mathbf{m} + \eta \cdot \text{error} \cdot \mathbf{u}$$

*// The gradient pushes user and movie vectors closer together when the prediction is too low, and apart when too high.*

---

## 5) Improvements to basic matrix factorization

### Bias terms

Some users rate everything high; some movies are universally popular. Add ==**bias terms**==:

$$\hat{r}_{um} = \mu + b_u + b_m + \mathbf{u}^\top \mathbf{m}$$

- $\mu$: global average rating
- $b_u$: user bias (does this user rate higher/lower than average?)
- $b_m$: movie bias (is this movie generally liked more/less?)

*// Before asking "does this user like this movie specifically?", first account for "this user rates everything high" and "this is a popular movie." The dot product then captures the residual personal preference.*

### L2 regularization

Prevent overfitting by penalizing large embedding values:

$$\mathcal{L} = \sum_{(u,m)} (r_{um} - \hat{r}_{um})^2 + \lambda(\|\mathbf{u}\|^2 + \|\mathbf{m}\|^2 + b_u^2 + b_m^2)$$

### Cold start problem

> [!warning] New users / new items have no data
> A brand-new user has no ratings → no way to learn their embedding. Solutions:
> - Ask for initial ratings (onboarding)
> - Use ==**side information**== (demographics, item metadata)
> - Default to popularity-based recommendations

### Side information

Incorporate features beyond the rating matrix. For a user with feature vector $\mathbf{y}_u$:

$$\hat{r}_{um} = \mu + b_u + b_m + (\mathbf{u} + Y \mathbf{y}_u)^\top \mathbf{m}$$

where $Y$ is a learned matrix that maps user features to the embedding space.

### Implicit feedback

For implicit data (clicks, views), create an additional embedding $\mathbf{m}^{\text{imp}}$ per item. Aggregate all items a user interacted with:

$$\hat{r}_{um} = \mu + b_u + b_m + \left(\mathbf{u} + \frac{1}{\sqrt{|I_u|}} \sum_{i \in I_u} \mathbf{m}_i^{\text{imp}}\right)^\top \mathbf{m}$$

*// "You are what you watch." Summarize a user by the average of all movies they've interacted with, then add this to their learned embedding.*

### Temporal dynamics

User preferences and movie popularity change over time. Make bias terms and embeddings ==time-dependent== (e.g., bin time into windows and learn separate parameters per window).

---

## 6) The Frobenius norm

The loss $\sum (r_{um} - \hat{r}_{um})^2$ over observed entries can be written in matrix notation using the ==**Frobenius norm**==:

$$\|A\|_F = \sqrt{\sum_{i,j} a_{ij}^2}$$

This is just the "element-wise" norm of a matrix — like the Euclidean norm but for matrices.

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **Collaborative filtering** | Predict ratings from user-item interaction patterns |
| **Matrix factorization** | $R \approx U^\top M$; user and item embeddings of dimension $k$ |
| **Predicted rating** | $\hat{r}_{um} = \mathbf{u}^\top \mathbf{m}$ (dot product of embeddings) |
| **Train on observed only** | Loss computed only on known ratings |
| **ALS** | Fix one matrix, solve the other; alternate |
| **SGD updates** | $\mathbf{u} \leftarrow \mathbf{u} + \eta \cdot \text{error} \cdot \mathbf{m}$ (and vice versa) |
| **Bias terms** | $\mu + b_u + b_m$ captures global/user/item baselines |
| **Cold start** | New users/items have no embedding; use side info or onboarding |
| **Frobenius norm** | $\sqrt{\sum a_{ij}^2}$; matrix version of Euclidean norm |

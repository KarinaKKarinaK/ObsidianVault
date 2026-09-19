## 1) Decision trees: the idea

A decision tree classifies by asking a ==sequence of questions== about the features, branching left or right at each node until reaching a leaf that gives a prediction.

*// Like a flowchart: "Is the temperature > 30°C? Yes → Is it humid? Yes → Don't play tennis." Each internal node tests one feature; each leaf gives a class label.*

### Why decision trees?

- **Interpretable**: you can read off the decision rules
- **No feature scaling needed**: splits are based on thresholds, not distances
- **Handle mixed feature types**: numeric and categorical features natively
- **Nonlinear**: the decision boundary is piecewise-constant (axis-aligned rectangles)

---

## 2) Building a tree: the ID3 / C4.5 algorithm

### Greedy top-down construction

Trees are built ==**greedily**==: at each node, pick the single best feature and threshold to split on, then recurse on each subset.

1. Consider all possible splits (feature + threshold)
2. Pick the one that ==maximizes **information gain**==
3. Split the data into two subsets
4. Recurse on each subset
5. Stop when a stopping criterion is met

*// The tree never looks ahead — it picks the locally best split at each step. This is fast but not guaranteed to find the globally optimal tree (which is NP-hard to compute).*

### Stopping conditions

- All examples in the node have the ==same class value== (pure node)
- All examples have the ==same feature values== (can't split further)
- Maximum depth reached

### Entropy (recap)

$$H(Y) = -\sum_{c} p(c) \log_2 p(c)$$

- Measures the ==uncertainty== in the class distribution
- $H = 0$: all examples belong to one class (pure node)
- $H = 1$ (for binary): 50/50 split (maximum uncertainty)

### Conditional entropy

$$H(Y \mid X) = \sum_{v \in \text{values}(X)} p(X = v) \cdot H(Y \mid X = v)$$

*// The expected entropy of $Y$ after we learn the value of $X$. If $X$ perfectly predicts $Y$, this is 0. If $X$ tells us nothing, this equals $H(Y)$.*

### Information gain

> [!important] Information gain = how much a split reduces uncertainty
> $$\text{IG}(Y, X) = H(Y) - \sum_{v \in \text{values}(X)} \frac{|S_v|}{|S|} H(Y \mid X = v)$$
>
> *// "How much does knowing feature $X$ reduce my uncertainty about class $Y$?" Entropy before the split minus the weighted average entropy after the split.*

Pick the feature with the ==**highest information gain**== at each step.

### Gain ratio (C4.5 improvement)

Information gain is biased toward features with many values (e.g., a unique ID feature would perfectly split every example). ==**Gain ratio**== normalizes by the feature's own entropy:

$$\text{GainRatio}(Y, X) = \frac{\text{IG}(Y, X)}{H(X)}$$

*// A feature that splits data into many tiny groups has high $H(X)$. Dividing by it penalizes "cheap" splits that are only good because they create many partitions.*

---

### Numeric features

For numeric features, the split is a ==threshold==: "is $x_j \leq t$?" The algorithm tries all possible thresholds (typically midpoints between consecutive sorted values) and picks the one with highest information gain.

> [!tip] Key difference from categorical features
> With categorical features, once you split on a feature, it's "used up" for that branch. With numeric features, ==splitting on the same feature again IS useful== — you can create multiple thresholds to carve out intervals (e.g., $20 \leq \text{age} \leq 30$).

---

## 3) Stopping and pruning

### When to stop splitting

- All examples in the node have the same class (pure)
- Maximum depth reached
- Minimum number of examples per leaf
- Information gain below a threshold

### Pruning (avoiding overfitting)

A fully grown tree memorizes the training data. ==**Pruning**== removes branches that don't help on validation data:

- **Pre-pruning**: stop growing early (using the criteria above)
- **Post-pruning**: grow the full tree, then remove subtrees that don't improve validation performance

> [!warning] Overfitting with trees
> An unpruned tree can achieve 0% training error by creating a unique leaf for every example. This is pure memorization — it will perform terribly on unseen data. Pruning is essential.

---

## 4) Regression trees

Same structure, but leaves predict a ==**number**== (typically the mean of training values in that leaf) instead of a class.

- Split criterion: minimize ==**variance**== (or MSE) of the target in each child node (instead of entropy)
- Leaf prediction: mean (for MSE) or median (for MAE / robustness to outliers)
- Prediction: piecewise-constant function (one flat value per rectangular region)

*// The feature space gets chopped into axis-aligned rectangles. Each rectangle has a single predicted value. More rectangles = more flexible fit, but risk of overfitting.*

### Generalization hierarchy

Decision trees form a natural hierarchy of model complexity:

| Model | Complexity | Description |
|---|---|---|
| **Constant** | Simplest | Always predict the same value (mean/mode) |
| **Decision stump** | One split | A tree with depth 1; one question, two leaves |
| **Full tree** | Most complex | Arbitrarily deep; can memorize training data |

*// A decision stump is the weakest reasonable tree. It's the building block of AdaBoost.*

---

## 5) Ensembles: combining multiple models

> [!important] Core idea
> A single model (especially a single tree) is often weak. ==Combining many weak models can produce a strong model.==
>
> *// One doctor might make a mistake, but if you consult 100 doctors and take a vote, the consensus is usually right. Same principle.*

### Why ensembles work (bias-variance trade-off)

| | High bias | High variance |
|---|---|---|
| **Meaning** | Model is too simple; systematically wrong | Model is too complex; sensitive to training data |
| **Example** | Linear model on nonlinear data | Deep unpruned tree |
| **Ensemble fix** | Boosting (reduce bias) | Bagging (reduce variance) |

---

## 6) Bagging (Bootstrap Aggregating)

### Bootstrapping: the foundation

==**Bootstrapping**== treats the training set as an approximation of the true data distribution. By sampling **with replacement** from the training set, we create new datasets that simulate drawing fresh data from the population.

- Each bootstrap sample has the same size $n$ as the original
- On average, ~==63.2%== of the original instances appear (some multiple times); ~36.8% are left out
- This approximates sampling from the ==empirical distribution== (the CDF estimated from the data)

*// We can't get truly new data from the real distribution, but we can resample from what we have. It's not perfect, but it gives us useful diversity.*

### Algorithm

1. From the training set of size $n$, create $B$ ==**bootstrap samples**== (sample $n$ points with replacement — some points appear multiple times, others are left out)
2. Train one model (typically a decision tree) on each bootstrap sample
3. ==**Aggregate**== predictions: majority vote (classification) or average (regression)

*// Each tree sees a slightly different version of the data, so they make different mistakes. Averaging over many trees smooths out the individual errors.*

### Unstable learners benefit most

Bagging works best with ==**unstable learners**== — models where small changes in the training data lead to very different models. Decision trees are highly unstable (removing one example can completely change the tree structure). Linear models are stable and benefit little from bagging.

> [!tip] Why bagging reduces variance
> If individual trees have variance $\sigma^2$ and are uncorrelated, the variance of their average is $\sigma^2 / B$. Even with correlation, averaging still helps. ==The key is diversity among the trees.==

---

## 7) Random Forests

Random forests = bagging + ==**random feature selection**==.

At each split, instead of considering all features, only consider a random subset of $m$ features (typically $m \approx \sqrt{p}$ where $p$ = total features).

> [!important] Why random feature subsets?
> Without this, if one feature is very strong, every bagged tree will use it first → all trees look similar → they're correlated → averaging doesn't help much. Forcing trees to use different features ==decorrelates them==, making the ensemble more effective.

### Random forest properties

- Very hard to overfit (more trees ≈ never hurts)
- Requires almost no hyperparameter tuning
- Works well on most tabular datasets
- Parallelizable (each tree is independent)
- **Out-of-bag (OOB) error**: each tree wasn't trained on ~37% of the data → use those as a free validation set

---

## 8) Stacking

Train several **different** model types (e.g., tree, SVM, neural net), then train a ==**meta-learner**== (combiner) on their outputs.

### Ensemble combination strategies

| Strategy | Method |
|---|---|
| **Majority vote** | Each model gets one vote; pick the majority |
| **Average** | Average the predictions (regression or probabilities) |
| **Weighted average** | Weight each model by its quality (e.g., validation accuracy) |
| **Stacking** | Train a combiner model on the base models' outputs |

The stacking combiner is typically a ==**logistic regression**== — simple enough to avoid overfitting on the meta-level, while learning which base models to trust for which inputs.

*// The meta-learner learns "the tree is good at X, the SVM is good at Y" and combines them optimally. Like having specialists and a manager who delegates.*

---

## 9) Boosting

### Core idea

Instead of training models independently (like bagging), train them ==**sequentially**==. Each new model focuses on the mistakes of the previous ones.

*// First model makes some errors. Second model specifically targets those errors. Third model targets remaining errors. Together they cover each other's weaknesses.*

### AdaBoost (Adaptive Boosting)

1. Start with equal weights on all training examples: $w_i = 1/n$
2. Train a weak classifier (e.g., a decision stump — a tree with one split) using ==**weighted loss**==
3. Compute weighted error: $\epsilon_t = \sum_{i: \text{wrong}} w_i$
4. ==**Increase weights**== on misclassified examples; decrease on correctly classified ones
5. Train the next weak classifier on the reweighted data
6. Repeat for $T$ rounds
7. Final prediction: ==weighted vote== of all classifiers (better classifiers get more weight)

The weight update uses an ==**exponential**== rule: misclassified examples' weights are multiplied by $e^{\alpha_t}$, making them exponentially more important to subsequent classifiers.

> [!important] AdaBoost weight update
> The weight of classifier $t$ in the final vote depends on its error rate $\epsilon_t$:
> $$\alpha_t = \frac{1}{2} \ln \frac{1 - \epsilon_t}{\epsilon_t}$$
> - Low error → high $\alpha$ (trusted more)
> - Error = 0.5 (random guessing) → $\alpha = 0$ (ignored)
> - Error > 0.5 → negative $\alpha$ (flip predictions — a classifier that's always wrong is still useful!)

### Gradient Boosting

A more general version: each new model is trained to predict the ==**residuals**== (errors) of the current ensemble. Equivalent to doing gradient descent in function space.

*// If the current ensemble predicts 5.0 but the true value is 7.0, the residual is 2.0. The next model learns to predict this 2.0 correction. Add it to the ensemble, and now you predict 7.0.*

> [!tip] Gradient boosting in practice
> **XGBoost**, **LightGBM**, and **CatBoost** are highly optimized implementations. They dominate Kaggle competitions and are the go-to for structured/tabular data.

---

## 10) Comparing ensemble methods

| Method | Diversity source | Bias/variance | Parallelizable? |
|---|---|---|---|
| **Bagging** | Bootstrap samples | Reduces variance | ==Yes== |
| **Random forest** | Bootstrap + random features | Reduces variance more | ==Yes== |
| **Boosting** | Focus on mistakes | ==Reduces bias== | No (sequential) |
| **Stacking** | Different model types | Reduces both | Partially |

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **Information gain** | $H(Y) - H(Y \mid X)$; pick the feature that reduces uncertainty most |
| **Gain ratio** | IG divided by $H(X)$; corrects bias toward many-valued features |
| **Pruning** | Remove branches to avoid overfitting; essential for single trees |
| **Bagging** | Train on bootstrap samples, aggregate by voting/averaging |
| **Random forest** | Bagging + random feature subsets at each split; decorrelates trees |
| **Boosting** | Sequential training; each model targets previous mistakes |
| **AdaBoost** | Reweight examples; classifier weight $\alpha_t = \frac{1}{2}\ln\frac{1-\epsilon}{\epsilon}$ |
| **Gradient boosting** | Fit residuals of current ensemble; gradient descent in function space |
| **Bias-variance** | Bagging reduces variance; boosting reduces bias |
| **Conditional entropy** | $H(Y \mid X) = \sum p(X{=}v) H(Y \mid X{=}v)$; expected entropy after split |
| **Numeric splits** | Threshold-based; same feature can be split on multiple times |
| **Unstable learners** | Small data changes → big model changes; benefit most from bagging |
| **Stacking combiner** | Usually logistic regression on base model outputs |
| **Bootstrapping** | Sample with replacement; ~63.2% unique instances per sample |

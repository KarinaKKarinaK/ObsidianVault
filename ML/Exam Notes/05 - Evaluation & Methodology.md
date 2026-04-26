# Evaluation & Methodology

> [!info] Tested in recall/combination questions. Ranking evaluation is also tested as an application question (Type 2).

See also: [[06 - Application Question Cookbook]], [[01 - Core Concepts & Definitions]]

---

## Train / Validation / Test Split

- **Never judge performance on training data** → overfitting
- **Test set reuse** inflates performance estimates → multiple testing problem
- **Solution**: train/validation/test split
  - Train on training set
  - Choose model/hyperparameters using validation set
  - Report final performance on test set (used **once**)
- **Cross-validation**: k-fold — rotate which fold is validation. Better use of data.
- **Walk-forward validation**: for temporal data — train on past, test on future, then slide forward. Preserves time ordering.

---

## Performance Metrics `ON SHEET`

### Confusion Matrix

|  | Predicted Pos | Predicted Neg |
|--|--------------|--------------|
| **Actual Pos** | TP | FN |
| **Actual Neg** | FP | TN |

### Metrics

| Metric | Formula | Meaning |
|--------|---------|---------|
| Accuracy | $(TP+TN)/\text{total}$ | Overall correctness |
| TPR / Recall | $TP/(TP+FN)$ | Of actual positives, how many found |
| FPR | $FP/(TN+FP)$ | Of actual negatives, how many wrongly flagged |
| Precision | $TP/(TP+FP)$ | Of predicted positives, how many correct |

### What You Can/Cannot Compute from a Confusion Matrix
- **Can**: accuracy, recall, precision, FPR, TPR
- **Cannot**: ROC AUC — needs a **ranking classifier**, not just a single threshold
- **Cannot**: bias (of the model in the bias/variance sense)

---

## Ranking & ROC

- A **ranking classifier** orders instances from most negative to most positive
- For a linear classifier: rank by $w^Tx + b$ (signed distance to boundary)
- **Ranking error**: a pair (positive, negative) where negative is ranked more positive
  - Max ranking errors = $|\text{pos}| \times |\text{neg}|$
- **Coverage matrix**: rows = positive instances, columns = negative instances
  - Red cell = ranking error pair
  - Proportion of red cells = ranking errors / total cells
- **ROC curve**: plot TPR vs FPR as threshold varies
- **AUC**: area under ROC curve. AUC = 1 - (proportion of ranking errors)

---

## Class Imbalance vs Cost Imbalance

- **Class imbalance**: one class has far more examples (e.g., 99% negative)
  - Problem: accuracy is misleading (predict all negative → 99% accuracy)
  - Solutions: SMOTE, oversampling minority, undersampling majority
- **Cost imbalance**: misclassifying one class is much worse than the other
  - Example: spam filter that deletes emails — FP (deleting real email) is worse than FN
  - Even with balanced classes, cost imbalance matters
- 2024 Q8 / 2025 Q3: spam with equal class ratio but cost imbalance → answer is **cost imbalance**

---

## Bias/Variance Decomposition

- **Bias**: systematic error — model consistently wrong in same direction
  - High bias → underfitting → use boosting
- **Variance**: sensitivity to training data — model changes a lot between datasets
  - High variance → overfitting → use bagging
- Can only estimate with **multiple datasets** or **bootstrapping**
- **Cannot** compute for a single model on a single dataset (exam question: 2024, 2025)

---

## Bootstrapping

- Sample with replacement from your dataset → create synthetic datasets
- **Uses**:
  1. Estimate variance of a performance measure
  2. Bagging: train ensemble on bootstrapped data
- **Does NOT** solve the hypothesis boosting question
- Same instance may appear multiple times → problematic for some models

---

## Regularization

- **L1** (Lasso): $\sum |w_i|$ → promotes **sparsity** (weights become exactly 0). Penalizes points far from axes less.
- **L2** (Ridge): $\sum w_i^2$ → penalizes large weights, promotes small values. Prevents overfitting.
- **Dropout**: randomly disable nodes during training → ensemble-like effect

---

## No Free Lunch Theorem
- Averaged over **all possible tasks**, all algorithms perform equally
- No universally best algorithm — algorithm choice depends on the problem

---

## Key Exam Facts
- [ ] Train/val/test split purpose and when each is used
- [ ] Accuracy, TPR, FPR, precision formulas (on sheet)
- [ ] ROC AUC requires ranking classifier
- [ ] AUC interpretation: probability that a random positive is ranked above a random negative
- [ ] Bias/variance cannot be computed from single model + single dataset
- [ ] Class imbalance ≠ cost imbalance
- [ ] SMOTE = data augmentation for class imbalance
- [ ] Bootstrapping estimates variance, leads to bagging
- [ ] L1 → sparsity, L2 → small weights
- [ ] Hyperparameter search: random search outperforms grid search
- [ ] No Free Lunch: no universally best algorithm

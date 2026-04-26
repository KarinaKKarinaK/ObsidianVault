## 0) Before you model: look at your data

### Survivorship bias

==**Survivorship bias**== is the error of focusing on things that survived a selection process while ignoring those that didn't.

*// Classic example: in WWII, the military wanted to armor bombers where they saw bullet holes on returning planes. Abraham Wald pointed out they should armor where there were NO holes — because planes hit there never came back. The returning planes were survivors, not a representative sample.*

### Anscombe's quartet & the Datasaurus dozen

Always ==visualize your data== before modeling. Anscombe's quartet shows four datasets with identical summary statistics (mean, variance, correlation, linear regression) but wildly different distributions when plotted.

The **Datasaurus dozen** extends this idea: 13 datasets share the same summary statistics but include shapes like a dinosaur, a star, and parallel lines. Summary statistics alone can be deeply misleading.

*// The lesson: never skip exploratory data analysis (EDA). Scatter plots, histograms, and pair plots reveal structure that means and variances hide.*

---

## 1) Core principle: evaluation must simulate production

- **Evaluation on the test set is a simulation of production.**
- **Validation is a simulation of evaluation.**
- Don’t apply train/val/test splits or cross-validation “blindly”.  
    If you do something in evaluation that you **cannot** do in production (e.g., training on future data), you are **cheating** your evaluation.
    
> [!tip] Practical rule
> When in doubt:
> - Make sure **evaluation ≈ production**.
> - Make sure **validation ≈ evaluation**.

// ==**Simulation** creates a virtual model to test scenarios safely and cost-effectively. **Validation** ensures this model or product accurately represents the real-world system and meets user needs. **Production** is the final, live implementation of the validated design==.

---

## 2) Data splits and what each dataset is for

### Test vs validation vs training metrics

- **Test accuracy** (or any test metric): computed **once at the very end** to confirm conclusions.
- **Validation accuracy**: used repeatedly to select hyperparameters.
- **Training accuracy**: not used to claim performance; used diagnostically (e.g., detect over/underfitting).

### Generalization gap (overfitting/underfitting signal)

- Compare training vs validation performance:
    - **Generalization gap** = training metric − validation metric.
- Large gap → overfitting; low performance on both → underfitting (often seen when increasing model complexity/hyperparameters).

---

## 3) Cross-validation (when training data is scarce)

### k-fold cross-validation (typical: 5-fold)

- Split the (non-test) data into **k folds** (e.g., 5).
- For each hyperparameter setting:
    - Train k times, each time using a different fold as validation.
    - **Average** the k validation scores.
- Cost: you train **k×** as many models, but every instance gets to be in validation exactly once (across folds).
- After picking hyperparameters via cross-validation, you still do **one final test** on the held-out test set.

> [!note]
> Some papers also estimate final error by cross-validation (multiple test sets), but this is “complicated” and “has fallen out of fashion” in this course context.

---

## 4) Temporal / time-sensitive data: don’t leak the future

### Why random splitting can be wrong

- If instances have a meaningful temporal order, training on future samples relative to the test period is unrealistic.
- In such cases:
    - Don’t randomly sample the test set.
    - **Maintain ordering** (train on the past, test on the future).
### Walk-forward validation (time-series cross-validation idea)

- Slice the timeline into sequential train→validate blocks, repeating across time, then average validation results.

> [!warning] Reminder
> If the ordering is only “timestamped” but not informative for leakage (e.g., many email tasks), random split can still be fine.

---

## 5) Hyperparameter search strategies

### Which hyperparameters to try?

Options (as long as you **don’t** look at the test set):
- **Trial-and-error / intuition** (common and often effective).
- **Grid search**: define a finite set per hyperparameter and try all combinations.
- **Random search** (and other search methods).
### Caution: too many trials with small val/test sets
- If validation/test sets are small, trying too many hyperparameter settings can be misleading (you effectively “overfit” to the validation).
### Random vs grid (why random can win)
- In high-dimensional hyperparameter spaces, grid search often wastes trials on unimportant dimensions; random search explores more distinct values of the important dimensions (Bergstra & Bengio 2012).

---

## 5.5) Missing values

### Missing features vs missing labels

- **Missing features**: some values in the input matrix are absent (sensor failed, user didn't answer a question).
- **Missing labels**: some instances lack class labels (common in semi-supervised settings).

### Handling missing features

Simple solutions:
- **Remove the feature entirely** (if too many values are missing and the feature isn't critical)
- **Remove instances** with missing values (if only a few are affected)
- Check if values are missing ==uniformly at random== or systematically (systematic missingness is informative and harder to handle)

==**Imputation**== — fill in missing values:
- **Mode** for categorical features
- **Mean or median** for numerical features
- **Model-based**: predict the missing value from other features (e.g., train a small model on complete instances)

### Missing labels

- **Train only on labeled data** (simplest; wastes unlabeled data)
- **Impute labels** (use a model to pseudo-label, then retrain)
- **Semi-supervised learning**: use both labeled and unlabeled data together
- For the **test set** with missing labels: report uncertainty (best-case / worst-case bounds on performance)

---

## 5.6) Outliers

### Natural vs unnatural outliers

- ==**Natural outliers**==: genuine extreme values from a heavy-tailed distribution (e.g., very high incomes). These are real data and shouldn't be removed.
- **Unnatural outliers**: data entry errors, sensor glitches, corrupted records. These should be identified and removed or corrected.

### Mean vs median (connection to loss functions)

- ==MSE is minimized by the **mean**==; it's heavily influenced by outliers.
- ==MAE is minimized by the **median**==; it's robust to outliers.

*// If your data has natural outliers (heavy-tailed), prefer MAE over MSE, or use heavy-tailed distributions (like Laplace instead of Gaussian). The median ignores how far the outliers are, while the mean gets dragged toward them.*

---

## 5.7) Handling class imbalance (remedies)

### Resampling strategies

When your training data is imbalanced, you can manipulate the training set:

- ==**Oversampling**==: duplicate instances from the minority class (simple but can overfit to specific examples)
- ==**Undersampling**==: remove instances from the majority class (loses information)
- ==**SMOTE**== (Synthetic Minority Over-sampling TEchnique): create *new* minority instances by interpolating between existing minority examples in feature space

*// SMOTE picks a minority instance, finds its k nearest minority neighbors, and creates a synthetic point somewhere on the line between them. This is more robust than simple duplication because it adds variety.*

> [!tip] Important
> Always resample the **training set only**. Never resample the test set — it should reflect the true class distribution to give honest evaluation.

---

## 5.8) Feature engineering

### Why it matters

Raw data rarely comes in a form that's optimal for learning. ==**Feature engineering**== transforms raw inputs into features that make patterns easier for the model to learn.

### Numeric ↔ categorical conversion

- **Categorical → numeric**: ==**one-hot encoding**== (create a binary column for each category value). E.g., color ∈ {red, green, blue} → three binary features.
- **Numeric → categorical**: binning/discretization (e.g., age → {young, middle, old})

### Expanding features for nonlinear boundaries

A linear model can only draw straight decision boundaries. But if you add ==**derived features**== like cross-products or squares, a linear model in the expanded space becomes nonlinear in the original space.

Example: with features $d$ and $p$, adding $d \cdot p$ (their product) lets a linear model learn XOR-like patterns.

*// The XOR problem is unsolvable with a linear classifier on two features. But if you add the cross-product feature $x_1 \cdot x_2$, a linear model can separate XOR perfectly. This is the same idea behind polynomial kernels and neural network hidden layers.*

---

## 6) Class imbalance and why accuracy/error can be useless

### Majority-class baseline (a key sanity check)

- **Majority class classifier**: always predicts the most prevalent class (simple baseline).
- On imbalanced data, a low error like 0.05 might be achievable by this baseline, so you only care about improvements **below** that band (e.g., error in [0, 0.05]).

### Imbalance reduces "resolution" of evaluation

Example: 10,000 instances total, test split 1,000. If positives are rare, you may end up with only ~50 positives in the test set. Your classifier's job is to find those 50. If it finds 48, recall = 96%. If it finds 47, recall = 94%. You can only ever get recall in steps of 1/50 = 2% — you can't distinguish a 95% model from a 96% one. It's like measuring millimeters with a ruler that only has centimeter marks. More positives in the test set = finer ruler.

> [!warning] Tradeoff
> Increasing test size helps evaluation confidence but reduces training positives, which can hurt the detector (needs enough positive examples).

---

## 7) Cost imbalance + social impact (why “high accuracy” can still harm)

- Any deployed classifier implicitly chooses a tradeoff between mistake types, even if you don’t calculate costs explicitly.
- Social impact example:
    - A classifier can achieve ~99% accuracy predicting sex from appearance.
    - The 1% misclassified can disproportionately affect vulnerable groups if the mistakes are not uniformly distributed.

---

## 7.5) Evaluating regression + bias-variance tradeoff

### RMSE over MSE

==If you use MSE as your loss, report the **root mean squared error (RMSE)** — same minimum, but it has the same units as the output (e.g., meters instead of square meters), making it easier to interpret.==

### Bias and variance

Two components of regression error:

- **Bias**: the gap between your model's best possible error and the true optimal error. Caused by the model being too simple to capture the real pattern (underfitting). Example: fitting a line to curved data.
- ==**Variance**: how much your model's error fluctuates when you retrain on different samples.== Caused by the model being too complex, so it fits random noise (overfitting). Example: a regression tree that perfectly fits every training point but gives wildly different predictions on new data.

Dartboard analogy: bias = how far the center of your dart cluster is from the bullseye; variance = how spread out your darts are.

### The tradeoff

- Reducing bias (increase model capacity, add features) tends to increase variance.
- Reducing variance (reduce capacity, add regularization, increase k in kNN) tends to increase bias.
- The generalization gap (training metric − validation metric) is a practical signal for where you are on this tradeoff.

---

## 8) Confusion matrix (foundation for most classification metrics)

### Definition

- Table with **actual classes** on rows and **predicted classes** on columns.
- Counts per cell show how often each actual class gets each prediction.

### Binary case terms

Let positives be the “target” class.
- **TP** (true positives): actual pos predicted pos
- **TN** (true negatives): actual neg predicted neg
- **FP** (false positives): actual neg predicted pos
- **FN** (false negatives): actual pos predicted neg

### Why it’s useful

- Doesn’t collapse to one number, but gives insight into what the classifier is actually doing.
- In cost imbalance, the FP vs FN balance indicates whether the classifier aligns with misclassification costs.

> [!info] You can compute the confusion matrix on training/validation/test; all can be informative.

---

## 9) Precision and Recall (tradeoff metrics)

### ==Definitions (binary classification)==

Using TP/FP/FN/TN:

- **Precision**:  
    $$  
    \text{precision}=\frac{TP}{TP+FP}  
    $$  
    “Of the predicted positives, what fraction are truly positive?”
    
- **Recall** (aka **TPR** / true positive rate):  
    $$  
    \text{recall}=\frac{TP}{TP+FN}  
    $$  
    “Of all actual positives, what fraction did we find?”
    

### Intuition: why there’s a tradeoff

- Calling more things positive → recall increases, but precision can drop (more negatives included).
- Main challenge under class/cost imbalance: find the “right” precision–recall tradeoff.

### Precision/Recall space

- Extreme points:
    - Recall = 1.0 by calling everything positive.
    - Precision can be near 1.0 by selecting only the single most confident positive (risky; could be 0 if wrong)

---

## 10) TPR and FPR + ROC space

### Definitions

- **Accuracy**:  
    $$  
    \text{accuracy}=\frac{TP+TN}{TP+TN+FP+FN}  
    $$
    
- **True Positive Rate (TPR)**:  
    $$  
    \text{TPR}=\frac{TP}{TP+FN}=\frac{TP}{\text{actual positives}}  
    $$
    
- **False Positive Rate (FPR)**:  
    $$  
    \text{FPR}=\frac{FP}{FP+TN}=\frac{FP}{\text{actual negatives}}  
    $$  
### Interpretation example (medical screening framing)

- TPR: “how many people with cancer did we detect?” (higher is better).
- FPR: “how many healthy people did we diagnose with cancer?” (lower is better).

### ROC space
- Axes: x = FPR, y = TPR.
- Best region: **top-left** (high TPR, low FPR).
- ROC = “receiver-operating characteristic” (historical origin in WWII radar detection).

![[roc-space.svg]]

// ROC (Receiver Operating Characteristic) curves and AUC (Area Under the Curve) are ==key metrics for evaluating binary classification models==. ROC graphs plot the true positive rate (sensitivity) against the false positive rate (1-specificity) at various thresholds. AUC quantifies the model's ability to distinguish between classes, with a score of 1.0 indicating perfect classification and 0.5 suggesting random guessing.

---

## 11) ROC/PR curves, ranking classifiers, and AUC

### Single classifier vs a collection of classifiers

- Confusion matrix metrics (accuracy/precision/recall/TPR/FPR) describe **a single classifier** at a single operating point.
- **AUC** describes **a collection of classifiers**, usually built by varying a threshold on a **ranking**.

### How to turn a classifier into a ranking classifier (depends on model class)

- Linear classifiers: rank by **distance to the decision boundary**.
- Decision trees: rank segments by **class proportion** in each segment (all points in a segment share the same rank).

Moving the threshold along the ranking from "call everything positive" to "call everything negative" traces out the ROC curve.

### Ranking errors (exam topic)

A **ranking error** is a *pair* of instances ranked the wrong way around: a positive instance is ranked as more negative than a negative instance. Not the same as a misclassified example — it's a property of a pair. A single instance can be part of multiple ranking errors.

// A ranking error in machine learning ==occurs when a model incorrectly orders items, typically placing less relevant items above more relevant ones, often termed an inversion==.
### Coverage matrix

Put all negative instances on one axis, all positive on the other, ordered by the ranking. Color a cell green if the pair is ranked correctly, red if not. The proportion of green cells = the ROC-AUC.

![[coverage-matrix.svg]]

### AUC interpretation (ROC-AUC)

- ==ROC-AUC = the green proportion of the coverage matrix = **the probability that the ranking puts a randomly drawn (positive, negative) pair in the correct order**.==

### ROC vs Precision–Recall curves

- PR curve is an alternative; sometimes more informative, especially under strong class imbalance (often worth plotting both).
- ROC has a clean interpretation for AUC (pairwise ordering probability); PR-AUC interpretation is less standard.

### When AUC is especially useful

- AUC is a good metric if:
    - you don’t know the relative importance of classes, or
    - classes are unbalanced.

> [!info] Interpreting AUC properly requires knowing how ranking was produced and whether it’s ROC-AUC or PR-AUC.

---

## 12) Setting a decision threshold (deploying a single classifier)

If you must output a single label:

- You can still use ROC/PR curves for model selection, but you must pick a **threshold** (what score counts as positive).

Two approaches:

1. **Show curve to users/stakeholders** and choose an operating point (hard to do accurately).
2. **Estimate misclassification costs** and minimize expected cost by building them into the loss (e.g., class weights).

### Class weights example (sklearn-style)

- If a false negative costs as much as 3 false positives:
    - set positive class weight = 3, negative class weight = 1.

---

## 13) Basic statistics for evaluation: mean, spread, confidence

Concrete setup: you train a classifier and test it on 1,000 instances. You get 82% accuracy. But that 82% came from *this specific* test set. If you drew a different 1,000 instances from the same source, you'd get a slightly different number — maybe 81.3%, maybe 83.1%. The question is: how much can we trust that 82%?

## 13.1) Key terms

- **True accuracy**: the accuracy you'd get if you could test on *every possible instance*. You can never know this. It's fixed.
- **Sample accuracy**: 82%. Your estimate, based on the test set you happened to draw. It varies from sample to sample.
- ==**SEM (standard error of the mean)**: measures how much the sample accuracy would jump around if you kept redrawing test sets. Small SEM = your 82% is reliable. Large SEM = it could easily have been 78% or 86%.==
- SEM shrinks with more data: 100 test instances → big uncertainty. 10,000 → small uncertainty. The more you test on, the closer your sample accuracy is to the true accuracy.

## 13.2) 95% confidence interval (CI)

Continuing the example: you got 82% accuracy. The 95% CI is the range around 82% such that if you repeated the whole experiment many times (new test set each time), 95% of those ranges would contain the true accuracy.

$$
\text{95% CI} \approx \text{mean} \pm 1.96 \cdot \text{SEM}
$$

(often remembered as "mean ± ~2·SEM"). So if SEM = 1.2%, your CI is roughly 82% ± 2.4%, i.e., [79.6%, 84.4%].

## 13.3) "True" vs "estimated" confidence intervals

- The true CI requires knowing the true accuracy (which you can't). So in practice, you plug in your sample accuracy instead. This gives an *estimated* CI — slightly imprecise, but good enough for large test sets.

### Correct interpretation of a CI (frequentist wording)

- Don't say: "There's a 95% chance the true accuracy is in this interval."
- Do say: "If we repeated this experiment many times, 95% of the intervals we compute would contain the true accuracy."
- The interval moves from experiment to experiment. The true accuracy is fixed.

## 14) Error bars: SD vs SEM vs CI (and why you must label them)

- There is **no universal standard** for what error bars mean.
- If authors don’t specify, that’s a mistake.

Common meanings:

1. **Standard deviation (SD)**: spread/variance of the data distribution (does not necessarily shrink with more samples; estimate becomes more accurate).
2. **Standard error (SEM)**: confidence about the mean (shrinks with more data).
3. **Confidence interval (CI)**: also a confidence measure; under assumptions, 95% CI is roughly twice SEM.

---

## 15) Overlap of error bars and “significance” (careful)

- Under assumptions, SEM relates to whether a Student’s t-test can reject “same distribution”.

Rules of thumb from slides:

- If **SEM bars overlap** → implies **no significant difference** (difference could be random).
- If **CI bars do not overlap** → you _may_ conclude the difference is significant; repeating experiment likely keeps ordering (A beats B again).

But:

- Converse statements don’t always hold (no overlap of SEM bars does not guarantee significance; overlap of CI bars doesn’t guarantee non-significance).

![](../../98%20–%20Attachments/Screenshot%202026-02-15%20at%2018.22.07.png)

---

## 16) Why use statistics in ML: confidence vs spread

### Two goals

- **Show confidence**: how reliable is your measured metric as an estimate of the true (unobservable) value?
- **Show spread**: how much does your pipeline vary due to randomness? (insight for reader).

### Sources of randomness (spread)

- Data sampling randomness.
- Search/training algorithm randomness (e.g., random initialization in gradient descent).

How to report spread:

- Repeat runs and report **standard deviation**, and explicitly describe what you repeated (new data samples vs same data with different random seeds, etc.).

### Resampling methods for estimating spread

- **Cross-validation**: provides some indication (k slightly different datasets), but folds overlap heavily, so it's imperfect.
- **Bootstrapping**: sample *with replacement* from your data to create a new dataset of the same size (~63.2% unique instances on average). Repeat as many times as you like. Better than cross-validation for small datasets, but some classifiers respond poorly to duplicate instances.

// Bootstrapping in machine learning is ==a powerful, non-parametric resampling technique used to estimate the uncertainty of a model, evaluate model performance, and enhance stability==.It involves repeatedly sampling from the original dataset **with replacement** to create multiple "bootstrap samples" of the same size as the original data.

---

## 17) No Free Lunch theorem and inductive bias

### The theorem (Wolpert & Macready 1997)

Any two optimization algorithms are equivalent when their performance is averaged across *all possible problems*. There is no universally best learning method.

Example: gradient descent works great on smooth loss surfaces. But for every task where it beats gradient *ascent*, there exists a (bizarre) task where gradient ascent wins. The "winning" tasks for gradient descent are just the ones that actually occur in practice.

### Why it doesn't ruin everything

Not all datasets are equally likely. The universe tends to produce data with structure (compressible, simple patterns). Our methods are biased toward exactly those kinds of datasets, which is why they work in practice even though NFL says no method is universally best.

### Inductive bias

==The assumptions built into a learning algorithm that make it suitable for certain problems and unsuitable for others. A linear model has an inductive bias for linear relations. A decision tree has an inductive bias for axis-aligned splits.==

The job of the ML researcher = create models with useful inductive biases. The job of the data scientist = figure out which bias fits the problem at hand.

### Occam's razor

=="The simplest explanation is often the best."== If two models fit the data equally well, prefer the simpler one — it's less likely to be overfitting. This is the motivation behind regularization (covered in later lectures).

---

## 18) Social Impact 2: interpreting results responsibly

### Key questions to ask about any ML result

1. **Consider history**: is this research area associated with past pseudoscience? (e.g., physiognomy — inferring character from facial features — has been repeatedly debunked)
2. **Are you looking at what you think you’re looking at?** (Clever Hans effect): a chest X-ray classifier might get accuracy from a "PORTABLE" label in the image (indicating a sicker patient) rather than from the actual medical features.
3. **What’s the causal direction?** A correlation between feature A and label B doesn’t mean A causes B. There could be confounders (social class, grooming choices, etc.).
4. **What do positive results actually mean?** Even 0.91 AUC is closer to "educated guessing" than "detecting." For reference: guessing someone’s sex from height alone gives ~0.84 accuracy and ~0.92 AUC.

### Detecting vs predicting vs guessing

- **Detecting**: strictly controlled features, one source of information (e.g., a blood test).
- **Predicting**: combining multiple known factors with explicit reasoning (e.g., a doctor using symptoms + history).
- **Guessing**: a black-box model finding correlations in pixel data — you don’t know which features drive the result.

Most ML classifiers are closer to guessing. Be honest about this when framing results.

### AUC reference points (predicting sex/gender from a single measurement)

| Feature | Accuracy | AUC |
|---|---|---|
| Age (all Dutch census) | 0.51 | 0.52 |
| Age (80+ only) | 0.61 | 0.57 |
| Waist circumference | 0.68 | 0.74 |
| Height | 0.84 | 0.92 |

Takeaway: ~0.91 AUC sounds impressive until you realize that’s about as good as guessing sex from height. There’s a real correlation, but it doesn’t mean tall women are "masculine" or short men are "feminine" — it’s just a slight statistical tendency. Interpret AUC in the 0.8–0.95 range accordingly.

### Ethics of publishing controversial results

- Suppressing genuine findings isn’t the answer — but framing matters.
- Don’t say "detecting" when the model is guessing. Don’t emphasize causal theories (e.g., "prenatal hormones cause X") when your data only shows correlation.
- Consider multiple hypotheses (biological, social, grooming/presentation choices) and be explicit that your experiment can’t distinguish between them.

### Always read the paper

As an academic, don’t form opinions from headlines or social media. The truth is usually subtle. Your responsibility is to dig into the primary source before judging.
# COMP 4331 Course Notes (up to date)

Covers: Lecture 1 (Intro), Lecture 2 (Preprocessing basics + Preprocessing + LLMs as preprocessors), Lecture 3 (Classification intro), Tutorial 1.

For logistics see [[Course Overview - Data Mining]].

---

# Lecture 1: Introduction

## Why Data Mining?

- Explosive growth of data: global data generated annually went from near zero in 2010 to ~180+ zettabytes projected by 2025.
- Size prefixes (increasing): kilo, mega, giga, tera, peta, exa, zetta.
- Major sources:
	- **Society**: news, social networks (Facebook, YouTube)
	- **Business**: web, e-commerce, transactions, stocks
	- **Science**: sensors, bioinformatics, simulations
- Core motivation: **"We are drowning in data, but starving for knowledge."** Traditional techniques are inapplicable at this scale, we need efficient ways to analyze raw data and extract knowledge.
- Motivating examples: book store recommendations from other customers' purchases (business), DNA similarity search (science), finding influential users in a social network (society).

## What Is Data Mining?

- Extraction of **interesting** (non-trivial, implicit, previously unknown, potentially useful) patterns or knowledge from huge amounts of data.
- Exploration and analysis, by automatic or semi-automatic means, of large quantities of data to discover **meaningful** patterns.
- **NOT data mining**: simple search/query processing, e.g. looking up a phone number in a directory, or googling "Amazon".
- Data mining is a confluence of: statistics, database technology, algorithms, machine learning, visualization, pattern recognition, other disciplines.

### Architecture of a typical data mining system (bottom to top)

1. **Data sources**: databases, data warehouse, WWW, other repositories
2. **Data preprocessing**: cleaning, integration, selection, transformation
3. **Database or data warehouse server**
4. **Data mining engine**
5. **Pattern evaluation** module (engine + evaluation both interact with a **knowledge base**)
6. **User interface**

## On What Kind of Data?

- **Relational data**: set of tables, each with attributes (columns/fields) and records (tuples/rows). E.g. Employee, Branch, Works_At tables.
- **Transactional data**: special relational data, each record is a transaction involving a set of items. E.g. TID 1: {Bread, Butter, Milk, Cereal}.
- **Graph data**: captures relationships among objects, e.g. social networks. Tasks: discover communities, model link strength, identify influential users (viral marketing).
- **Sequence data**: ordered sequences of events, with or without concrete time. E.g. genomic sequences (GGTTCCGC...).
- **Time series data**: sequence data from repeated measurements over time (hourly, daily, weekly). E.g. stock prices.
- **Spatial data**: geographical attributes such as coordinates or areas. E.g. road networks.
- **Text and multimedia data**: text databases contain word descriptions (e.g. document term vectors of term counts per doc); multimedia databases store image, audio, video.

## Data Mining Functionalities (Major Tasks)

### Classification

- A **training set** of records; each record has attributes, one designated **categorical** (discrete) attribute is the **class**.
- Build a **model** from the training set, use it to **predict** the class of new records.
- Example, direct marketing: dataset of consumers who bought a similar previous product + demographics = training set; class = {buy, don't buy}; predict which mail recipients are likely buyers.
- Example, PayPal fraud: historical transactions labeled Legitimate/Fraudulent; model uses transaction size, location, device ID, typing speed, IP; high-risk transactions blocked or sent to multi-factor verification; fraud below 0.2% of revenue.

### Regression

- Classification predicts **categorical** values, regression predicts **numerical** values.
- Fit a function (**model**) to the training points, use it to predict values for new records.
- Applications: healthcare, finance, forecasting, marketing.

### Clustering (cluster analysis)

- Given objects with attributes and a **similarity measure**, find clusters such that objects within a cluster are more similar to each other, and objects in different clusters are less similar.
- **Unsupervised**: no known class labels (key contrast with classification).
- Example: image segmentation (MRI regions, foreground/background).
- Example, Spotify: cluster listeners on features like acousticness, tempo, listening hours, skip rates; powers Discover Weekly (recommend a song loved by another user in your cluster).

### Outlier detection

- An **outlier** is an object far away from any cluster.
- Example, credit card fraud: cluster a holder's old transactions by location/amount; flag an incoming transaction dissimilar to all clusters.

### Association analysis

- Find sets of objects that **frequently appear within the same transactions** (also called **frequent pattern mining**).
- Input: transaction database; output: **association rules**, e.g. item2 → item3, {item2, item3} → item4.
- Example use: supermarket promotions.

---

# Lecture 2a: Preprocessing Basics and Data Summarization

## Why Preprocessing? Real-world data is dirty

| Type | Example | Causes |
| --- | --- | --- |
| **Incomplete** | occupation = " " | "not applicable" at collection, changed considerations, human/hardware/software problems |
| **Noisy** | salary = "-10" | faulty instruments, entry errors, transmission errors |
| **Inconsistent** | age = 42 but birthday contradicts it | different data sources |
| **Redundant** | duplicate records, derivable attributes | integration of multiple sources |

- **"No quality data = no quality mining results!"** Duplicate/missing data can cause incorrect or misleading statistics.
- Size matters too: more objects and more/complex attributes = more expensive mining.
- Preprocessing = preparation stage that removes dirty data and reduces size/complexity, to improve **quality** of results and **performance** of tasks.
- The four preprocessing tasks: **cleaning, integration, transformation, reduction**.

## Basic concepts

- **Dataset** = collection of **objects** (record, tuple, point, case, sample, entity, instance).
- Object characterized by **attributes** (variable, field, characteristic, feature); attribute values are numbers or symbols.
- Attribute types:
	- **Categorical - Nominal**: only distinguishes objects, no order (zip code, ID, eye color, gender). **Binary** = special case with two values.
	- **Categorical - Ordinal**: enough info to order objects (grades, {good, better, best}).
	- **Numeric (continuous)**: dates, temperature.

## Central tendency

- **Mean**: $\bar{x} = \frac{\sum_{i=1}^{N} x_i}{N}$. Sensitive to extreme values.
- **Weighted mean**: $\bar{x} = \frac{\sum w_i x_i}{\sum w_i}$
- **Trimmed mean**: drop low and high extremes. Example: data 0,4,5,6,7,7,8,10,11,18; 10% trimmed drops 0 and 18, mean = $(4+5+6+7+7+8+10+11)/8 = 7.25$. Real-world: diving judges drop two highest and two lowest scores.
- **Median**: middle value of ordered data, not sensitive to extremes.
	- median(1,5,2,8,7) = 5; median(1,6,2,8,7,2) = (2+6)/2 = 4 (even count: average two middle values). Median = 50th percentile.
- **Mode**: most frequent value. **Midrange**: (max + min)/2.
- Distribution shape: symmetric → mean = median = mode; right (positively) skewed → mode < median < mean; left skewed → mean < median < mode.

## Dispersion

- **Range** = max − min.
- **kth percentile**: value below which k% of the data lie. **Quartiles**: $Q_1$ = 25th, median = 50th, $Q_3$ = 75th.
- **IQR** = $Q_3 - Q_1$
- **Five-number summary**: min, $Q_1$, median, $Q_3$, max.
- **Variance**: $\sigma^2 = \frac{1}{N}\sum(x_i - \bar{x})^2 = \frac{1}{N}\left[\sum x_i^2 - \frac{1}{N}\left(\sum x_i\right)^2\right]$
- **Standard deviation** $\sigma = \sqrt{\sigma^2}$; $\sigma = 0$ iff all values equal.

## Graphic display

- **Boxplot**: draws the five-number summary. Box ends at $Q_1$ and $Q_3$ (box height = IQR), median line inside, whiskers to min/max (or to $1.5 \times IQR$ with points beyond marked as **outliers**). Outlier rule: value beyond $1.5 \times IQR$ from the quartiles.
- **Histogram**: divide data into buckets, count per bucket (equal-width partitions common).
	- Important: two different histograms (different distributions) can share the **same boxplot** (same five-number summary). Histograms carry shape info that boxplots lose.
- **Scatter plot**: each pair of values is a coordinate point; reveals **positive correlation**, **negative correlation**, or **no correlation** between two numerical attributes. Example: scatter-plot matrix of FB/AMZN/NFLX/GOOG daily returns showing positive correlation.

---

# Lecture 2b: Data Preprocessing

## 1. Data cleaning

Fix missing values, smooth noise/outliers, correct inconsistencies.

### Missing values, options

- Ignore the record (usually only when the class label is missing; wastes the other attribute values)
- Fill in manually (tedious, often infeasible)
- Global constant e.g. "unknown" (danger: acts like a new class)
- Attribute mean
- Attribute mean of the record's class
- Most probable value (may need a model)

### Noise, options

- Remove outliers found by graphic display
- **Binning**: smooth a sorted value using its neighborhood.
	- Example: sorted prices 4, 8, 15, 21, 21, 24, 25, 28, 34 → equal-sized bins {4,8,15}, {21,21,24}, {25,28,34} → smoothing by bin means: 9,9,9 / 22,22,22 / 29,29,29.
- Regression (fit a function, later lecture)
- Clustering (detect and remove outliers, later lecture)

### Inconsistencies

- Some fixable with **domain knowledge / metadata** (data about data), e.g. height cannot be negative.
- Others need an external source, e.g. verify an address against the insurer's customer database.

## 2. Data integration

Combine multiple sources into a coherent store. Three issues:

1. **Entity identification**: do customer_id=234 and cust_num=234 refer to the same entity? Metadata (name, meaning, type, range) helps.
2. **Data value conflicts**: kg vs pounds; total_sales of one branch vs whole region.
3. **Data redundancy**: duplicate records; derivable attributes (annual_income from revenue − expenses). Detect via correlation analysis.

### Correlation (numerical attributes)

$$r_{A,B} = \frac{\sum_{i=1}^{N} a_i b_i - N\bar{A}\bar{B}}{N \sigma_A \sigma_B}, \quad -1 \le r_{A,B} \le 1$$

- $r > 0$ positively correlated, $r < 0$ negatively, $r = 0$ uncorrelated.

### Probability revision

- $P(B|A) = \frac{P(A \cap B)}{P(A)}$, so $P(A \cap B) = P(A)P(B|A)$.
- **Independence**: $P(X,Y) = P(X)P(Y)$, equivalently $P(X|Y) = P(X)$. E.g. two fair coin tosses independent; midterm and final grades likely not.

### Chi-square test (categorical attributes)

- Contingency table, observed frequency $o_{ij}$; expected under independence:
$$e_{ij} = \frac{count(A = a_i) \times count(B = b_j)}{N}$$
$$\chi^2 = \sum_{i}\sum_{j} \frac{(o_{ij} - e_{ij})^2}{e_{ij}}$$
- Large $\chi^2$ → attributes more likely related. Degrees of freedom = $(r-1)(c-1)$; reject independence if $\chi^2$ exceeds the critical value at the chosen significance level.
- Worked example (gender vs reading, N=1500): observed fiction/male 250 (expected $\frac{300 \times 450}{1500} = 90$), etc. $\chi^2 = 507.93$, df = 1, critical value at 0.001 is 10.83; since 507.93 > 10.83, gender and reading preference are **dependent**.
- **Independence ⇒ uncorrelated, but uncorrelated ⇏ independence** (scatter shapes like rings and X's have r = 0 yet are dependent).

## 3. Data transformation

Goal: modify data to improve mining performance.

- **Feature construction**: create new features that capture information better (e.g. Fourier/wavelet transform, time → frequency domain).
- **Normalization**:
	- **Min-max**: $v' = \frac{v - min_A}{max_A - min_A}(new\_max_A - new\_min_A) + new\_min_A$. Example: income 12,000-98,000 → [0,1]; 73,600 → $\frac{73600-12000}{98000-12000} = 0.716$.
	- **Z-score**: $v' = \frac{v - \bar{A}}{\sigma_A}$. Example: $\mu = 54000, \sigma = 16000$; 73,000 → 1.225. Use when min/max unknown or there are outliers. (Normal curve: ~68.3% within $\pm 1\sigma$, ~95.4% within $\pm 2\sigma$.)
- **Discretization**: divide a continuous attribute's range into intervals (age → 0-10, 11-20, ... or youth/adult/senior). Reduces data size. Methods: histograms, cluster analysis, decision-tree analysis.

## 4. Data reduction

Reduced representation, (almost) same analytical results.

### Curse of dimensionality

- Uniform points in d-dim unit hypercube: to capture fraction $r$ of data with a hypercube of edge $\ell$: $\ell = r^{1/d}$.
- d=10, r=0.01 → $\ell = 0.63$: capturing 1% of the data needs 63% of each attribute's range.
- High dimensions → sparse data, distances less meaningful. Reducing dimensions avoids this, removes irrelevant/noisy features, saves time/space, eases visualization.

### PCA

- Project data onto the direction $\mathbf{w}$ maximizing $var(\mathbf{w}^T\mathbf{x})$ (largest variation).
- Covariance matrix $\mathbf{C} = \sum_k (\mathbf{x}_k - \bar{\mathbf{x}})(\mathbf{x}_k - \bar{\mathbf{x}})^T$; solve $\mathbf{C}\mathbf{v} = \lambda\mathbf{v}$.
	- $\mathbf{v}$ = principal component (direction), $\lambda$ = eigenvalue = variance in that direction.
- Keep the first k components (sorted by decreasing $\lambda$); **proportion of variance explained** = $\frac{\lambda_1 + \cdots + \lambda_k}{\lambda_1 + \cdots + \lambda_d}$; e.g. stop when > 0.9.
- Example: 100x100 digit "3" images; reconstructions with M = 1, 10, 50, 250 components go from blurry to near-perfect.

### Feature subset selection

- Remove **redundant** features (purchase price vs sales tax paid) and **irrelevant** features (student ID for predicting GPA).
- $d$ features → $2^d$ subsets, infeasible → **greedy**:
	- **Forward selection**: start empty, add best attribute each step: {} → {A1} → {A1,A4} → {A1,A4,A6}.
	- **Backward elimination**: start full, remove worst each step. Can combine both.
	- "Best" e.g. by correlation with the target.

### Numerosity reduction

- **Parametric**: assume a model, store only parameters (e.g. linear regression), discard data except outliers.
- **Nonparametric**: histograms; clustering (store centroids); **sampling** (without replacement vs with replacement; **simple random** vs **stratified**, which samples per partition/stratum, good for skewed data); **data cube aggregation** (e.g. quarterly sales → annual totals: 2008 → $1,568,000).

---

# Lecture 2c: LLMs as Data Preprocessors

- LLMs (timeline 2019-2023: GPT-3 → InstructGPT/PaLM → ChatGPT, GPT-4, LLaMA...) are a powerful tool for data preprocessing tasks.
- **Zero-shot prompting**: ask for the output with no examples.
- **Few-shot prompting**: condition the LLM with a few input-output examples in the prompt.

| Task | Approach | Prompt |
| --- | --- | --- |
| Error detection | zero-shot | `Is there an error in attr : val?` |
| Outlier detection | zero-shot | `Are there any outliers in 70F, 71F, ..., 74F?` (numeric) or `Are there any outliers in {audi, chevrolet, dodge, ...}?` (semantic/categorical) |
| Missing value imputation | few-shot | `City: Detroit, County: Wayne \n City: Fargo, County: Cass \n ... City: Athens, County:` (LLM completes the pattern) |
| Ordinal vs non-ordinal | few-shot | Pairwise: `Is "totally agree" higher than "agree"? Yes ...`; or direct: `Is (low, medium, high) an ordinal? Yes \n Is (door, window, wheel) an ordinal? No ...` |

- Ordinal logic: exactly one direction of "higher than" holds → ordinal; both directions No (New York vs Chicago) → non-ordinal.
- Key advantage over classical preprocessing: LLMs bring **semantic world knowledge** (which county Athens is in, platinum > gold), enabling decisions pure statistics cannot make, including outliers in categorical data.

---

# Lecture 3: Classification (Introduction)

## The task

- Assign a **label** (class value) to an object from its attribute values.
- Examples: loan applicants "safe"/"risky"; customers "buys"/"doesn't buy"; patients → treat_A/treat_B/treat_C.

## Three-step process

1. **Training set**: archived data. Attributes of any type, but one **categorical class attribute** whose values must be available (supervised). E.g. age, income, student, credit_rating → buys_computer.
2. **Build a model (classifier)**: takes non-class attribute values, returns a class value, e.g. $f(age{=}young, income{=}low) = risky$. Possible implementations (later lectures): decision trees, rule-based, Bayesian, neural networks, SVMs, k-nearest neighbor.
3. **Evaluate accuracy** on a **test set**: same attributes, tuples **disjoint** from training set; predict each tuple's class and compare to the actual class.

## Accuracy and the confusion matrix

- **Accuracy** = % of tuples correctly classified.
- **Confusion matrix**: rows = actual class, columns = predicted; $c_{ij}$ = tuples of class i predicted as class j. Diagonal = correct.
- Worked example (buys_computer, N=10,000): yes-row 6954/46 (99.34%), no-row 412/2588 (86.27%), overall $\frac{6954+2588}{10000} = 95.42\%$.
- **Accuracy can mislead under class imbalance**: 9,990 non_cancer vs 10 cancer; predicting everything non_cancer gives 99.9% accuracy but catches zero cancer cases.

## Precision, recall, F-measure

With $C_1$ the class of interest (positives): TP, FN in the positive row; FP, TN in the negative row.

- **Precision** $= \frac{TP}{TP + FP}$ (fraction of retrieved that are relevant)
- **Recall** $= \frac{TP}{TP + FN}$ (fraction of relevant that are retrieved)
- **F-measure** $= \frac{2 \cdot P \cdot R}{P + R}$ (harmonic mean)

## Macro vs micro averaging (multi-class)

Worked example: 10 predictions over Airplane/Boat/Car, 6 correct → accuracy 0.60.

| Class | Precision | Recall | F1 | Support |
| --- | --- | --- | --- | --- |
| Airplane | 0.67 | 0.67 | 0.67 | 3 |
| Boat | 0.25 | 1.00 | 0.40 | 1 |
| Car | 1.00 | 0.50 | 0.67 | 6 |

- **Macro-average**: compute metric per class, unweighted mean. $F1_{macro} = \frac{0.67 + 0.40 + 0.67}{3} = 0.58$. Every class counts equally.
- **Micro-average**: pool TP/FP/FN totals first (here TP=6, FP=4, FN=4), then compute once: $P_{micro} = R_{micro} = F1_{micro} = 0.60$. Every instance counts equally; in single-label multi-class, micro P = micro R = accuracy.

## Evaluation methods

- **Holdout**: random disjoint split, typically 2/3 train, 1/3 test. Weaknesses: fewer training records; result depends on the particular split; class over-represented in training is under-represented in test.
- **Repeated subsampling**: repeat holdout k times with new random splits; average the accuracies.
- **k-fold cross-validation**: partition into k disjoint folds; iteration i uses fold $D_i$ as validation, the other k−1 folds as training. Each example validates exactly once; fraction $(1 - \frac{1}{k})$ used for training each round; all data contributes to the estimate. Typical k ≈ 10.
- **Leave-one-out**: k = |D|, validate on 1 example each time; for small datasets.
- **Stratified k-fold**: each class uniformly distributed among folds (each fold mirrors the full class distribution); avoids folds missing a class. 10-fold stratified is typical practice.
- **Final deployed classifier**: after evaluation, train on the **entire dataset** (cross-validation only estimates how well it will do).

---

# Tutorial 1: Python Environment

- **Anaconda** = conda + tools (Python, JupyterLab, numpy, ...). **Conda** = package + environment manager; environments avoid package conflicts (e.g. PyTorch vs TensorFlow) and pin Python versions.
- Key commands:
	- `conda create -n env_name`, `conda activate env_name`, `conda deactivate`, `conda info --envs`
	- `conda list`, `conda install pkg_name`, `conda update pkg_name`, `conda remove pkg_name`
- JupyterLab: `conda install -c conda-forge jupyterlab`, then `jupyter lab` (port 8888, or `--port=8889`).
- Alternative: Google Colab (no install; runtime files are temporary, download results before session ends).

## Plotting examples (matplotlib)

- **Boxplot**: `ax.boxplot(box_data, tick_labels=['A','B','C'], patch_artist=True)`. Box spans $Q_1$-$Q_3$, line at median, whiskers to range. Example medians (7 sorted values each): A=68, B=82, C=72.
- **Histogram**: `ax.hist(values, bins=6, edgecolor='white')`, equal-width bins.
- **Scatter**: `ax.scatter(x, y, alpha=.8)`, e.g. x=1..8 vs y=3..19 shows positive roughly linear trend ($y \approx 2x$).

---

# Exam checklist

- Binning: 4,8,15 / 21,21,24 / 25,28,34 → bin means 9 / 22 / 29.
- Min-max: 73,600 → 0.716; z-score: 73,000 → 1.225.
- Chi-square: $e_{ij}$ from row/col totals; 507.93 > 10.83 (df 1, sig 0.001) → dependent. Independence ⇒ uncorrelated, not vice versa.
- Curse of dimensionality: $\ell = r^{1/d}$.
- PCA = eigenvectors of covariance matrix; keep by proportion of variance explained (> 0.9 typical).
- Forward selection adds best, backward elimination removes worst; both greedy because $2^d$ subsets.
- Trimmed mean example = 7.25; median of even-count list = mean of two middle values.
- Same five-number summary (boxplot) does not imply same distribution.
- Precision/recall/F1 definitions; macro F1 0.58 vs micro 0.60 example; micro = accuracy in single-label multi-class.
- Accuracy misleads with imbalance (99.9% cancer example).
- Holdout weaknesses; k-fold trains on $(1-\frac{1}{k})$ of data; stratified mirrors class distribution; final model trains on all of D.

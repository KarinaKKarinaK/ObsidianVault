## 1) What “machine learning” is doing (the big idea)

Machine learning is usually presented as a workflow:

1. You start with a real problem (e.g., spam filtering, handwriting recognition, prediction).
2. You **abstract** (part of) it into a standard ML task (classification, regression, clustering, …).
3. You pick an existing algorithm/model class that fits that task and train it. 

![](../../98%20–%20Attachments/Screenshot%202026-02-13%20at%2015.12.26.png)

That’s the “recipe mindset” of the course: translate → represent → choose model class → search for a good model. 

![](../../98%20–%20Attachments/Screenshot%202026-02-13%20at%2014.48.40.png)

- ML programs usually allow very little insight into *why* we should trust their predictions.

**Where do we use ML?**
- Inside other software
- Analytics, data mining, data science
- In science / statistics

> **Machine learning** provides systems the ability to automatically learn and improve from experience without being explicitly programmed.

**Online vs offline learning**

![](../../98%20–%20Attachments/Screenshot%202026-02-13%20at%2014.51.12.png)

The simplified view used in this course is **offline learning**, where you separate:
1. Learning a model, and
2. Putting a learned model to use.

---

## 2) Supervised learning: the core setup

### Key terms (must know)

In supervised learning, your dataset contains **labeled examples**.

- **Instance** = one example you’re trying to learn about (e.g., an email).
- **Features** = measurements you choose to represent the instance (numeric or categorical). Feature choice is a big part of the “art” of ML.
- **Target value / label** = what you want to predict (class for classification, number for regression).
- **Learning algorithm** = takes the labeled dataset and produces a **model** (classifier/regressor).
- **Model** = a “machine” that predicts labels/targets for new, unseen instances. 
    
Important: a good model is **not** just memorizing the dataset. It can even disagree with a training example if that helps it generalize (learn a rule rather than store all details). 

![](../../98%20–%20Attachments/Screenshot%202026-02-13%20at%2014.59.22.png)

### The two main supervised tasks

- **Classification**: predict one of a finite set of categories (spam/ham, digits 0–9).
- **Regression**: predict a number (e.g., age). 

---

## 3) Classification: how to think about it

### Reducing a real problem to classification

Example: handwriting recognition for ZIP codes is complicated (find address, segment digits, etc.). The lecture shows you simplify it to:

> “Assume we already have an image of a single digit → predict which digit it is.” 

### Training data + labeling cost

You need many labeled examples. Collecting images can be automated, but **labeling typically requires human annotation** (you can’t automate it without already having a classifier). 
### MNIST example (classic supervised dataset)

The lecture mentions the digit dataset originally built at **NIST**, which evolved into MNIST (60,000 handwritten digits). Each image is an instance; the target is one of 10 classes. 

A simple representation: flatten a 28×28 image into **784 pixel features** (values 0–1). This loses 2D structure, but can still work. 

(They also note a very strong classifier can get ~0.21% error on unseen examples for that task.) 

### Three example classifiers
- **Linear classifier**
- **Decision tree classifier**
	![](../../98%20–%20Attachments/Screenshot%202026-02-13%20at%2015.05.45.png)
	The shape a classifier draws in feature space to separate the two classes is called the **decision boundary**.
- **Nearest-neighbour classifier**

### Binary vs multiclass vs multilabel

- **Binary**: 2 classes (spam vs ham).
- **Multiclass**: choose 1 of many classes (digits 0–9). Often you need a strategy to extend binary methods to multiclass.
- **Multilabel**: multiple classes can be true at once (e.g., movie genres) — noted as more complex and not covered deeply here. 

### Scores & confidence (especially for high-stakes decisions)

Instead of a single hard label, a classifier can output **scores per class** (top-1, top-2, etc.) and sometimes a notion of how sure it is—important when mistakes are costly (medical/crime investigation examples are mentioned). 

---

## 4) Feature space, hyperplanes, model space, and loss

### Feature space vs model space

- **Feature space / instance space**: each instance is a point (defined by its features).
- **Model space**: the space of all models allowed by your assumptions (e.g., “all lines” if you assume a linear separator). In 2D, a line can be represented by parameters (a, b, c), so the model space becomes 3D. 

> Feature space = the multi-dimensional numerical representation of input data, where each point corresponds to a data sample. Model space (hypothesis/parameter space) = all possible functions/weights/parameters a model can adopt to map inputs to outputs.

### Hyperplanes (generalizing “a line”)

“Draw a line” works only in 2D. The general version is:
- 1D → a point threshold
- 3D → a plane
- 4D+ → a **hyperplane** (can’t visualize, but math stays simple). 

### Loss function = how we decide what “good” means

Once you have a model space, you need a way to compare models. A **loss function** maps a model to “how bad it is on the data” (lower = better). For classification, a simple loss is “number of misclassified examples.” 

Crucial subtlety:
- The **model** takes data as input (predicts from features).
- The **loss** takes the model as input (evaluates model performance on fixed data). 

---

## 5) Regression: same pipeline, different output

Regression is like classification except the output is real-valued (a function from feature space to ℝ). The lecture introduces notation:

- instance features: xi
- true target label: ti
- model: f
- prediction: f(xi)
    Goal: make f(xi) close to ti. 

### Mean Squared Error (MSE) loss

For regression, a common choice is **MSE**:
- compute residuals (prediction − target) per instance
- square and sum/average them → one number  
    Lower MSE = better fit. The lecture uses the “rubber band” intuition pulling the line toward points. 

> For each instance, take the difference between prediction and target (the **residual**), square it, then sum/average over all instances. The lower that number, the better the fit.

### Different regression model types (same task, different assumptions)

They show multiple ways to build a regressor (same dataset idea, different model class):
- **Linear regression** (a line)
- **Regression tree** (piecewise constant blocks; can fit training data extremely well—raises the “is it really better?” question)
- **kNN regression** (predict average of k nearest neighbors) 

---

## 6) Unsupervised learning: no labels, find structure

Unsupervised learning means: you only have inputs (features), no target labels. The goal is to discover useful structure. 

Main unsupervised tasks listed:

- **Clustering**
- **Density estimation**
- **Generative modeling** 

### Clustering + k-means (the iterative picture)

k-means (not kNN) example steps:

1. Choose k random “means” in feature space (one per cluster).
2. Assign each point to its nearest mean.
3. Recompute each mean as the average of points assigned to it.
4. Repeat until means stop moving. 

They emphasize: clusters might align with “real” categories (e.g., species) but clustering itself doesn’t know the meaning—you interpret afterwards. 

### Density estimation (probability distribution behind the data)

Density estimation predicts a number meaning “how likely this instance is.” In the strict form:
- not negative
- sums/integrates to 1 over the feature space (acts like a probability density). 

They connect it to familiar statistics: fitting a normal distribution (mean + std) is basically density estimation; more complex patterns may need mixture models. 

### Generative modeling (sampling)

Sometimes it’s easier to **generate** realistic samples than to compute exact densities. A generative model can sample new examples (e.g., realistic faces) without giving you a clean probability density for a given example. 

---

## 7) Semi-supervised learning: mix of labeled + unlabeled

Setup:
- X_L: small labeled set
- X_U: large unlabeled set

Example approach — **self-training**:
1. Train classifier C on X_L.
2. Use C to label X_U → retrain on X_L ∪ X_U.
3. Repeat.

The intuition: a classifier trained on the full dataset can better understand the underlying structure of the instances, even if the labels it assigned itself are noisy.

---

## 8) "Machine learning vs …" (common confusions)

### ML vs AI

ML is a subfield of AI: AI includes many non-learning approaches (reasoning, planning, etc.). Even chess engines historically didn't use learning (though AlphaChess changed that).

### ML vs Data Science

All ML is part of data science, but data science also includes gathering, cleaning, harmonizing, interpreting data — ML is often just one step in a pipeline.

### ML vs Data Mining

- ML aims to produce a predictive **model/software**.
- Data mining aims to produce **insight/knowledge** about the data.
- Methods overlap; the difference is in the end product (software vs knowledge).

### ML vs Information Retrieval

Search/retrieval can be modeled as classification (relevant vs irrelevant documents), which also helps think about ranking + class imbalance.

### ML vs Statistics

Both model data, but:
- Statistics often aims to "get at the truth" (models should resemble the real data-generating process).
- ML often accepts unrealistic assumptions if they work well for prediction (e.g., spam "bag of words").

### ML vs Deep Learning

Deep learning is a **subfield** of ML (all DL is ML, not vice versa).

---

## 9) Social impact

ML is no longer confined to the lab — it's deployed at scale, affecting millions. The lecture asks you to think critically about what you're building.

### Case study: Google removes gender classification

Google removed gender labels from its Cloud Vision API, citing its AI principle of avoiding unfair bias. The question the lecture poses: why is gender special? All ML tasks have some error, so imperfect accuracy alone can't be the reason.

### Sensitive attributes

Some features/targets require extra care. Examples: sexual orientation, race/ethnicity, gender/sex. Three key questions to ask:

**1. Can it be used for harm intentionally?**

- Example: surveillance systems in Xinjiang using ethnicity classification to aid mass internment of Uyghur people.
- Rare case where the harmful effect is largely intended (or at least not denied).

**2. Can harm result unintentionally?**

- Example: **COMPAS**, a parole-decision system in the US. ProPublica found it disproportionately denied Black people parole, even though race was explicitly excluded as a feature.
- Problem: other features (e.g., postcode) are correlated with race, so the system infers it anyway.

**3. Training data bias**

- Face recognition trained on non-diverse data fails on non-white faces (Joy Buolamwini's research; Proctorio exam software at VU Amsterdam not recognizing Black students).
- **Technological legacy**: biases compound across systems. The Shirley card (photo calibration based on white skin) influenced decades of photography. The PULSE system (upscaling low-res photos via StyleGAN) turned non-white faces into white ones because the underlying generator was biased.

### Amplifying bias

Even correct predictions can amplify bias. Example: Google Translate chose "male doctor" for a gender-neutral English sentence because the training data had more male doctors. A 70% prediction applied deterministically becomes 100% bias in the output. The fix was to show both possible translations, communicating uncertainty rather than hiding it.

### Are you predicting what you think you're predicting?

Self-reported data is unreliable. If survey respondents lie about drug use, a classifier trained on that data predicts *willingness to lie on a questionnaire*, not actual drug use. Just because a column says "drug use" doesn't mean it measures drug use.

### What are you predicting from?

A persistence weather model (predict tomorrow = today) is very accurate on average but useless for a ship captain who cares about storm probability. Correlation (today's weather ≈ tomorrow's) is not the same as causation. Features with causal links to the target are more informative.

### Can predictions be offensive or hurtful?

Even accurate guesses can be unwelcome. Guessing someone's sexuality from their nose shape at a party would be offensive regardless of accuracy — the issue is choosing to guess at all, rather than asking or leaving it. When ML models make billions of such guesses daily, one engineer's decision has outsized impact.

### Are you implying a causal relation?

ML finds correlations, never causes. Publishing a result like "we can predict sexuality from profile pictures" implies a causal link between facial features and sexuality — a conclusion the data does not support. The authors argued their goal was to *warn* people their photos could expose sensitive information, but the implication is hard to avoid.

### Should sensitive attributes be in data at all?

It depends on context:
- To **study** bias, you need the sensitive attributes annotated.
- **Removing** them doesn't help if other features are correlated (the system still infers them).
- Sometimes **explicitly including** a sensitive attribute with user consent gives more control than letting it leak in through proxies.
- There are **valid use cases**: race and sex affect medical outcomes (e.g., Parkinson's diagnosis).

### ML is shallow (even deep learning)

- Classification forces complex phenomena into a few discrete categories. Fine for benchmarks, dangerous in production.
- Models pick up surface features first.
- 95% accuracy still means 1 mistake in 20 — at scale, that's millions of errors.
- Interpretability remains hard: we often don't know what a model is actually looking at.

---

---

## Related Notes
- [[ML/Lecture 1 — Linear Models & Optimization]] — first concrete ML models
- [[Technical Skills/Notes/09 - Machine Learning]] — applied ML for software engineering context
- [[Linear Algebra & Calc/Linear Algebra Notes]] — mathematical foundations for ML
- [[Stats/Stats Review]] — statistics foundations for ML (probability, distributions)
- [[Artificial Intelligence/Index - Artificial Intelligence]] — AI broader context
- [[Robotics/08 - Key Subfields & Concepts]] — ML applied to robotics

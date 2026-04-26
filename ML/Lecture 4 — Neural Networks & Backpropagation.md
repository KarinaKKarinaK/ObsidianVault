## 1) From linear models to neural networks

Linear models can only draw straight decision boundaries. Real problems need curves. The trick: ==**stack linear models with nonlinearities in between**==.

*// A single linear model can only draw one line/plane. But if you chain several together with "bends" (nonlinearities) between them, the composite function can draw arbitrarily complex shapes.*

---

## 2) The perceptron (historical starting point)

The perceptron is the simplest neural unit:

$$y = \sigma(\mathbf{w}^\top \mathbf{x} + b)$$

where $\sigma$ is a nonlinear **activation function**. Originally this was a step function (output 0 or 1), but modern networks use smooth activations.

### Common activation functions

| Name | Formula | Notes |
|---|---|---|
| **Sigmoid** | $\sigma(t) = \frac{1}{1+e^{-t}}$ | Squashes to $(0,1)$; used in logistic regression |
| **Tanh** | $\tanh(t) = \frac{e^t - e^{-t}}{e^t + e^{-t}}$ | Squashes to $(-1,1)$; zero-centered |
| **ReLU** | $\text{ReLU}(t) = \max(0, t)$ | Simple, fast; ==default choice in modern deep learning== |

*// Why ReLU won: sigmoid/tanh squash large values into flat regions where the gradient nearly vanishes (the "vanishing gradient" problem). ReLU has a constant gradient of 1 for positive inputs, which keeps gradients flowing through deep networks.*

> [!important] Why nonlinearity matters
> Without an activation function, stacking linear layers just gives another linear function:
> $$W_2(W_1 \mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 = W_2 W_1 \mathbf{x} + (W_2 \mathbf{b}_1 + \mathbf{b}_2)$$
> This is still linear. The nonlinearity between layers is what gives neural networks their power.

---

## 3) Feedforward neural networks (MLPs)

A **multi-layer perceptron (MLP)** chains layers:

$$\mathbf{h}_1 = \sigma(W_1 \mathbf{x} + \mathbf{b}_1)$$
$$\mathbf{h}_2 = \sigma(W_2 \mathbf{h}_1 + \mathbf{b}_2)$$
$$\mathbf{y} = W_3 \mathbf{h}_2 + \mathbf{b}_3$$

Each layer: **linear transformation → nonlinearity**. The intermediate values $\mathbf{h}_i$ are called ==**hidden layers**==.

*// Think of each layer as a new "lens" that re-represents the data. The first layer might detect edges, the second combinations of edges, etc. By the final layer, the representation is (hopefully) linearly separable.*

### Architecture terminology

- **Width** = number of neurons per layer
- **Depth** = number of layers
- **Parameters** = all the weights and biases across all layers

> [!tip] Universal approximation theorem
> A single hidden layer with enough neurons can approximate any continuous function. But in practice, ==deeper networks with fewer neurons per layer work better than wide shallow ones== — depth gives you compositional structure.

---

## 4) Output layers and softmax

### Regression output
For regression: the final layer is just a linear transformation (no activation). Output is a real number.

### Binary classification output
Use a sigmoid on the final layer → output in $(0,1)$ = probability of the positive class. Train with log loss.

### Multiclass classification: softmax

For $K$ classes, the final layer produces $K$ raw scores (logits) $z_1, \dots, z_K$. The ==**softmax**== function converts them to probabilities:

$$p(y = k) = \frac{e^{z_k}}{\sum_{j=1}^K e^{z_j}}$$

> [!important] Softmax properties
> - All outputs are positive and sum to 1 → valid probability distribution.
> - It's a "soft" version of argmax: the largest logit gets the most probability, but others aren't zeroed out.
> - Train with ==**cross-entropy loss**== (negative log of the probability assigned to the correct class).

*// Softmax amplifies differences: if one logit is much larger, it gets nearly all the probability. If they're close, the distribution is more uniform.*

---

## 5) Training neural networks with SGD

### Full gradient descent vs stochastic gradient descent

Full (batch) gradient descent computes the gradient over **all** training examples, then takes one step. This is expensive for large datasets.

==**Stochastic Gradient Descent (SGD)**==: compute the gradient on a **single** randomly chosen example (or a small **mini-batch**) and update immediately.

*// Instead of surveying the entire landscape before each step, you ask one random person "which way is downhill?" and walk that way. Each individual direction is noisy, but on average they point the right way.*

> [!abstract] SGD trade-offs
> | | Full batch GD | SGD (mini-batch) |
> |---|---|---|
> | Gradient quality | Exact | Noisy estimate |
> | Step cost | Expensive (all data) | Cheap (one batch) |
> | Convergence path | Smooth | Zigzaggy but fast |
> | Escaping local minima | No | ==Yes (noise helps!)== |

### Learning rate schedules

Common practice: start with a larger learning rate (explore broadly) and ==decrease it over time== (settle into a minimum). Examples: step decay, cosine annealing, warmup + decay.

---

## 6) Backpropagation: computing gradients efficiently

### The problem

A neural network's loss is a composition of many functions:

$$\text{loss} = L(f_3(f_2(f_1(\mathbf{x}))))$$

We need $\frac{\partial \text{loss}}{\partial w}$ for every weight $w$ in every layer. Computing each one from scratch would be absurdly expensive.

### Computation graphs

Represent the forward computation as a ==**directed acyclic graph (DAG)**==. Each node is an operation; edges carry values.

*// Think of it as a recipe: each step takes ingredients (inputs from previous steps) and produces an output. The graph makes explicit which step depends on which.*

### The chain rule (core of backprop)

For composed functions $f(g(x))$:

$$\frac{df}{dx} = \frac{df}{dg} \cdot \frac{dg}{dx}$$

For a longer chain $f(g(h(x)))$:

$$\frac{df}{dx} = \frac{df}{dg} \cdot \frac{dg}{dh} \cdot \frac{dh}{dx}$$

*// Each link in the chain contributes a multiplicative factor. The total derivative is the product of all local derivatives along the path.*

### Forward pass and backward pass

> [!important] The two passes of backpropagation
> 1. **Forward pass**: compute the output layer by layer, storing all intermediate values.
> 2. **Backward pass**: starting from the loss, propagate gradients backward through the graph using the chain rule. Each node computes its ==local gradient== and multiplies it by the gradient coming from above.

Example for a simple chain $y = f(g(h(x)))$:
- Forward: compute $a = h(x)$, $b = g(a)$, $y = f(b)$, loss $= L(y)$
- Backward: $\frac{\partial L}{\partial y}$ → $\frac{\partial L}{\partial b} = \frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial b}$ → $\frac{\partial L}{\partial a} = \frac{\partial L}{\partial b} \cdot \frac{\partial b}{\partial a}$ → etc.

### Why backward and not forward?

> [!tip] Efficiency of reverse-mode differentiation
> Forward mode: for each parameter, trace its influence forward through the network. Cost = $O(\text{num parameters})$ forward passes.
> Backward mode: ==one forward pass + one backward pass computes gradients for ALL parameters simultaneously==.
> Since neural nets have millions of parameters but one scalar loss, backward mode is vastly cheaper.

### Nodes with multiple outputs

When a node feeds into multiple downstream operations, the gradients from all paths are ==**summed**== (multivariate chain rule). If $a$ is used by both $b$ and $c$:

$$\frac{\partial L}{\partial a} = \frac{\partial L}{\partial b} \cdot \frac{\partial b}{\partial a} + \frac{\partial L}{\partial c} \cdot \frac{\partial c}{\partial a}$$

*// The total effect of changing $a$ = its effect through path $b$ + its effect through path $c$. You add up all the ways $a$ influences the loss.*

---

## 7) Support Vector Machines (SVMs)

### The margin idea

Among all hyperplanes that separate the classes, which is "best"? The SVM picks the one with the ==**maximum margin**== — the largest gap between the boundary and the nearest points of either class.

*// Imagine two countries separated by a border. The SVM draws the border so that the "demilitarized zone" (the margin) is as wide as possible. Wider margin = more confident classification of points near the border.*

### Support vectors

The ==**support vectors**== are the training points that lie exactly on the edge of the margin. They are the only points that matter — moving any other point (as long as it stays outside the margin) doesn't change the solution at all.

> [!important] Key SVM properties
> - The decision boundary depends **only** on the support vectors.
> - Removing a non-support-vector point doesn't change the model.
> - This makes SVMs robust to outliers (as long as they're far from the boundary).

### Hinge loss

The SVM loss for a single example with true label $t_i \in \{-1, +1\}$:

$$\text{hinge}(f(\mathbf{x}_i), t_i) = \max(0, \; 1 - t_i \cdot f(\mathbf{x}_i))$$

where $f(\mathbf{x}_i) = \mathbf{w}^\top \mathbf{x}_i + b$.

*// If the point is correctly classified AND far enough from the boundary ($t_i \cdot f(\mathbf{x}_i) \geq 1$), loss = 0. Otherwise, the loss grows linearly with how wrong we are.*

> [!abstract] Comparing classification losses
> | Loss | Correctly classified, far away | Near boundary | Misclassified |
> |---|---|---|---|
> | **Hinge (SVM)** | ==0 (ignores it)== | Penalized linearly | Penalized linearly |
> | **Log loss** | ~0 (small) | Penalized smoothly | Penalized, grows to ∞ |
> | **Least squares** | ==Penalized (bad!)== | Moderate | Penalized |

### SVM objective

The full SVM optimization combines hinge loss with a ==**regularization term**== that penalizes large weights (encourages a wide margin):

$$\min_{\mathbf{w}, b} \; \sum_i \max(0, \; 1 - t_i(\mathbf{w}^\top \mathbf{x}_i + b)) + \lambda \|\mathbf{w}\|^2$$

- First term: hinge loss (fit the data)
- Second term: $L_2$ regularization (keep the margin wide)
- $\lambda$: trade-off hyperparameter

*// Small $\|\mathbf{w}\|$ means the function changes slowly across feature space, which geometrically means a wide margin. The regularizer says "don't make sharp decisions unless the data forces you to."*

---

## 8) Hard-margin vs soft-margin SVMs (constraints)

### Hard-margin (separable case)

We want the decision boundary to be as ==flat== as possible while keeping every point outside the margin:

$$\min_{\mathbf{w}, b} \frac{1}{2}\|\mathbf{w}\|^2 \quad \text{s.t. } y_i(\mathbf{w}^\top \mathbf{x}_i + b) \ge 1 \;\; \forall i$$

- The margin width is $2 / \|\mathbf{w}\|$.
- The constraints force the closest points to land on the $\pm1$ margin lines → those are the support vectors.

### Soft-margin (non-separable / noisy data)

Allow violations with slack variables $\xi_i$:

$$\min_{\mathbf{w}, b, \xi} \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_i \xi_i \quad \text{s.t. } y_i(\mathbf{w}^\top \mathbf{x}_i + b) \ge 1 - \xi_i,\; \xi_i \ge 0$$

- $C$ controls the trade-off: large $C$ = fewer violations (harder margin), small $C$ = more slack.
- Soft margin often generalizes better even when data is separable.

*// Hard margin = “no mistakes allowed.” Soft margin = “a few mistakes are OK if we get a wider gap overall.”*

> [!tip] Hinge loss as constraint-free version
> The soft-margin objective is equivalent to hinge loss + $L_2$ regularization, which is why the ==maximum-margin loss== shows up inside neural nets too.

---

## 9) Constrained optimization → Lagrange + dual view

The margin objective is a **constrained** problem. A standard trick: build a ==Lagrangian== and derive the **dual**.

Key outcomes:
- We get one weight $\alpha_i$ per training example.
- Only examples with $\alpha_i > 0$ matter → these are the support vectors.
- The dual depends on **dot products** between examples.

*// This is the mathematical doorway to the kernel trick: if you only ever need dot products, you can swap them for a kernel function.* 

---

## 10) The kernel trick (optional but important conceptually)

If an algorithm only uses dot products $\mathbf{x}_i^\top \mathbf{x}_j$, we can replace them with a ==kernel==:

$$k(\mathbf{x}_i, \mathbf{x}_j) = \phi(\mathbf{x}_i)^\top \phi(\mathbf{x}_j)$$

This lets us fit a linear model in a **huge (even infinite) feature space** without ever constructing $\phi(\mathbf{x})$.

### Common kernels

- **Polynomial**: $k(\mathbf{x}, \mathbf{z}) = (\mathbf{x}^\top \mathbf{z} + 1)^d$
  - Larger $d$ = more expressive, more risk of overfitting.
- **RBF / Gaussian**: $k(\mathbf{x}, \mathbf{z}) = \exp(-\gamma \|\mathbf{x}-\mathbf{z}\|^2)$
  - Very powerful; prone to overfitting without careful $\gamma$.
- **Domain kernels**: string kernels (text/DNA), Weisfeiler–Lehman kernels (graphs).

> [!tip] Kernel SVM recipe (practical)
> 1) Normalize features.  
> 2) Choose kernel (linear / poly / RBF).  
> 3) Tune $C$ and kernel hyperparameters ($d$, $\gamma$).  

---

## 11) Why neural nets came back (and kernel SVMs faded)

- **Compute scaling**: SVM training needs all pairwise dot products → $O(N^2)$.
- **Gradient descent scales**: neural nets need $k$ passes → $O(kN)$.
- **Hand-crafted kernels**: good SVMs required careful kernel design.
- **Architecture breakthroughs**: ConvNets + LSTMs (1998) + better hardware revived deep nets.

*// With big data, SGD becomes the cheaper route. And learned features beat hand-designed kernels.*

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **Why nonlinearity?** | Without it, stacked linear layers collapse to one linear layer |
| **ReLU** | $\max(0, t)$; default activation; avoids vanishing gradients |
| **Softmax** | Turns logits into probabilities: $e^{z_k} / \sum e^{z_j}$ |
| **SGD** | Update on mini-batches; noisy but fast; can escape local minima |
| **Backprop = chain rule on computation graphs** | Forward pass stores values; backward pass propagates gradients |
| **Reverse mode** | One backward pass gives all gradients (cheap for many params, one loss) |
| **Multi-path gradients** | Sum gradients from all paths through a node |
| **SVM** | Maximum margin classifier; depends only on support vectors |
| **Hinge loss** | $\max(0, 1 - t \cdot f(x))$; zero loss for confident correct predictions |
| **SVM objective** | Hinge loss + $\lambda\|\mathbf{w}\|^2$ regularization |
| **Hard vs soft margin** | Hard: no violations; Soft: slack $\xi_i$ with trade-off $C$ |
| **Kernel trick** | Replace dot products with $k(x_i, x_j)$ to get nonlinear boundaries |

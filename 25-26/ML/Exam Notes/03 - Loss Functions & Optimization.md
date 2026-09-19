# Loss Functions & Optimization

See also: [[06 - Application Question Cookbook]], [[08 - What To Memorize vs What's On The Sheet]]

---

## Loss Functions `ON SHEET`

### Least Squares Regression
$$\text{loss}(\theta) = \frac{1}{2}\sum_i (f_\theta(x_i) - y_i)^2$$
- The $\frac{1}{2}$ is for convenient differentiation (cancels the 2 from chain rule)
- Assumes normally distributed errors → maximum likelihood solution

### Least Squares Classification
$$\frac{1}{2}\sum_i (f_\theta(x_i) - y_i)^2, \quad y_i \in \{-1, +1\}$$
- Points **far** from boundary weigh heavily (problematic — outliers dominate)

### Logistic Regression / Log Loss
$$\text{loss}(\theta) = \sum_i H(y_i, q_i), \quad q_i = \sigma(w^Tx_i + b), \quad y_i \in \{0, 1\}$$
- Cross-entropy between true labels and predicted probabilities
- Points **near** the boundary weigh most heavily (good for classification)
- Log loss = $-\log q(\text{correct class})$
- This is equivalent to $H(p, q)$ where $p$ is the true label distribution

### SVM (Soft Margin) `ON SHEET`
$$\frac{1}{2}||w|| + C\sum_i \max(0, y_i(w^Tx + b) - 1)$$
- Hinge loss: only penalizes points inside/on wrong side of margin
- $C$ controls trade-off: larger $C$ → fewer margin violations

### SVM Dual `ON SHEET`
$$-\frac{1}{2}\sum_i\sum_j \alpha_i\alpha_j y_i y_j x_i^T x_j + \sum_i \alpha_i$$
subject to $0 \leq \alpha_i \leq C$ and $\sum_i \alpha_i y_i = 0$
- Allows the **kernel trick** (replace $x_i^T x_j$ with kernel function)

---

## Optimization

### Gradient Descent
- Update: $\theta \leftarrow \theta - \eta \nabla \text{loss}(\theta)$
- $\eta$ = learning rate
- Requires differentiable loss function
- **Gradient points uphill** (direction of steepest increase) → we go opposite direction

### When to Use Gradient Descent vs Random Search
- **Gradient descent**: model is differentiable
- **Random search**: model is NOT differentiable (e.g., reinforcement learning with non-differentiable environment step)

### Convex Loss Surface
- No local minima other than the global minimum
- Guaranteed to find optimal solution with gradient descent

### Loss Function ≠ Evaluation Function
- Sometimes the evaluation metric (e.g., accuracy) has a bad loss surface (flat "staircase" with sharp ridges)
- Use a **surrogate loss** (e.g., cross-entropy) that has smooth gradients
- Optimize the surrogate, evaluate with the real metric

---

## Backpropagation

### Core Idea
- Compute gradients efficiently using the **chain rule**
- Break computation into modules, compute **local derivatives**, propagate backwards
- **Forward pass**: compute outputs
- **Backward pass**: propagate gradients from loss back to parameters

### Chain Rule `ON SHEET`
$$\frac{\partial f(g)}{\partial x} = \frac{\partial f(g)}{\partial g} \cdot \frac{\partial g}{\partial x}$$

### Multivariate Chain Rule `MEMORIZE`
When $x$ affects $f$ through **multiple paths**:
$$\frac{\partial f}{\partial x} = \sum_{\text{paths}} \text{(chain rule along each path)}$$

### Modern Frameworks
- Don't compute full local derivatives (Jacobians) — too expensive for tensors
- Instead compute the **product** of upstream derivative with local derivative directly
- This is what the "matrix backprop" exam questions test (Type 10)

---

## Activations `ON SHEET`

| Function | Formula | Derivative | Notes |
|----------|---------|-----------|-------|
| Sigmoid | $\sigma(x) = \frac{1}{1+e^{-x}}$ | $\sigma(x)(1-\sigma(x))$ | Squashes to (0,1), causes vanishing gradients |
| ReLU | $r(x) = \max(0, x)$ | 1 if $x > 0$, 0 otherwise | Reduces vanishing gradients, preferred for hidden layers |

### Vanishing Gradient Problem
- Sigmoid derivative is always < 0.25 → gradients shrink exponentially through layers
- **ReLU** fixes this: derivative is 0 or 1 → gradients either pass through or die
- **LSTM** also fixes this for sequences (gating mechanism — cell state conveyor belt)

---

## Advanced Optimizers

- **Momentum**: accumulate velocity $v = \mu v - \eta \nabla \text{loss}$; helps cross flat regions
- **Adam**: adaptive learning rates via gradient mean and variance estimates. Most widely used.
- **Weight initialization**: He/Xavier — preserve zero mean and unit variance across layers

---

## Key Exam Facts
- [ ] Least squares: $\frac{1}{2}$ cancels with chain rule's 2
- [ ] Log loss = cross-entropy $H(p,q)$ where $q$ (model) goes inside log
- [ ] SVM: primal allows gradient descent (no constraints), dual allows kernel trick
- [ ] Gradient points **uphill** (common trick question)
- [ ] Convex → no local minima besides global
- [ ] Multivariate chain rule: SUM over all paths
- [ ] ReLU preferred over sigmoid because it reduces vanishing gradients

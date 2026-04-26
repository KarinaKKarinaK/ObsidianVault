# 1) Linear Regression: The Model (What You're Fitting)

The linear model is the simplest model class. It's not powerful on its own, but it's the vehicle for introducing the search methods (especially gradient descent) that power almost all of modern ML.

Running example throughout: predicting a penguin's body mass from its flipper length. One feature, one target, six instances. The model is just a line through this data — the question is *which* line.

## One Feature

A linear regression model with one feature $x$:

$$
f_{w,b}(x) = wx + b
$$

- $w$ = weight / slope (how much the output changes when $x$ increases by 1)
- $b$ = bias / intercept (what the model predicts when $x = 0$)

So picking a model = picking a $(w, b)$ pair = picking a specific line.

---

## Multiple Features

With features $x_1, x_2$:

$$
f(x_1, x_2) = w_1 x_1 + w_2 x_2 + b
$$

Geometrically: the output is now a **plane** over the feature space (not a line). Each weight represents a slope along its corresponding axis — $w_1$ says how much the output changes if we increase $x_1$ by 1 while keeping $x_2$ fixed.

---

## Vector Form (Important)

For $n$ features, we stack everything into vectors:

$$
f_{w,b}(\mathbf{x}) = \mathbf{w}^\top \mathbf{x} + b
$$

This is just a **dot product + bias**. The dot product has two interpretations:

Algebraic (just multiply and sum):

$$
\mathbf{w}^\top \mathbf{x} = \sum_i w_i x_i
$$

Geometric (involves the angle $\alpha$ between the two vectors):

$$
\mathbf{w}^\top \mathbf{x} = \|\mathbf{w}\| \|\mathbf{x}\| \cos(\alpha)
$$

The geometric form will be useful later when we reason about the direction of steepest ascent/descent.

---

# 2) What the Weights Mean (Intuition)

Example: predicting blood pressure risk from three features:

- job stress
- healthy diet
- age

The model computes $\mathbf{w}^\top \mathbf{x} + b$, which is a weighted sum. Each weight tells you:

- **Positive** weight → that feature *increases* the prediction (e.g., more stress → higher risk)
- **Negative** weight → that feature *decreases* the prediction (e.g., healthier diet → lower risk)
- **Larger magnitude** → the feature matters more to the prediction

This is one of the nice properties of linear models: the weights are directly interpretable.

---

# 3) Loss Function for Regression: MSE

We have a model space (all possible lines), but how do we decide which line is best? We need a **loss function** — a single number that says "how bad is this model on this data."

## Mean Squared Error (MSE)

$$
\text{loss}_{X,T}(w,b)
=
\frac{1}{n}
\sum_i
\left(
\mathbf{w}^\top \mathbf{x}_i + b - t_i
\right)^2
$$

Step by step:
1. For each instance $i$, compute the **residual**: prediction minus true target ($f(\mathbf{x}_i) - t_i$).
2. **Square** each residual — this prevents positives and negatives from cancelling, and penalizes large errors disproportionately.
3. **Sum** (or average) over all instances → one number.

Lower MSE = better fit. Intuition: imagine rubber bands pulling the line toward each data point. MSE is the total tension.

Common variations (sum vs average, extra $\frac{1}{2}$ factor) only change scaling, not which model minimizes the loss.

---

# 4) Feature Space vs Model Space

This distinction is crucial and easy to confuse.

## Feature Space (Instance Space)

Where **data points** live. Axes = the features ($x_1, x_2, \dots$). Each point is one instance. In the penguin example: one axis for flipper length, the other for body mass.

## Model Space (Hypothesis Space)

Where **parameters** live. Axes = $w_1, w_2, \dots, b$. Each point is one complete model. In 1D linear regression, a model has two parameters $(w, b)$, so model space is 2D. Every point in model space corresponds to a specific line in feature space.

The **loss function** maps each point in model space to a single real number (the loss). If we plot loss over model space, we get the **loss surface** (or loss landscape). Our goal is to find the lowest point on this surface.

For the penguin example with $(w, b)$: the loss surface looks like a smooth bowl with one clear minimum — the best-fitting line.

---

# 5) Optimization vs Machine Learning

Important conceptual distinction:

- **Optimization**: find the absolute minimum of the loss. Lower is always better, no caveats.
- **Machine learning**: find a model that *generalizes* — low loss on unseen test data, not just training data.

For simple models like linear regression, overfitting is unlikely, so the distinction doesn't matter much: the training minimum is probably close to the test minimum. But for complex models (like regression trees from Lecture 0), the training minimum can overfit badly. We'll return to this.

---

# 6) Black-Box Search Methods

All the methods in this section are "black-box": they only need to *evaluate* the loss function for a given model. They don't look inside the model or the loss — just "give me a model, I'll tell you the loss."

## A) Random Search (Local Hill Descent)

Algorithm:

1. Start at random point $p$ in model space
2. Propose nearby $p'$ (sampled from a hypersphere of radius $r$ around $p$)
3. If $\text{loss}(p') < \text{loss}(p)$: accept ($p \leftarrow p'$); otherwise reject
4. Repeat

Analogy: a **hiker in a snowstorm** who can't see anything. Take a step in a random direction; if you go uphill, step back; if downhill, keep going. This captures how blind random search is to the larger structure of the landscape — it can only feel what's immediately underfoot.

On the loss surface, this looks like a slow, wandering path that eventually stumbles toward low-loss regions. Not a beeline, but it gets there.

### Convexity

Whether random search reliably finds the best model depends on the shape of the loss surface:

- **Convex** surface: a line drawn between any two points on the surface lies entirely above it ⇒ any local minimum is automatically the global minimum. So as long as we keep moving downhill, we're heading the right way.
- **Non-convex** ⇒ multiple local minima. Random search can get trapped: it reaches a point where all neighbors are higher, but far away there's a much lower point.

The MSE loss surface for linear regression is convex (a smooth bowl), which is why even simple search works.

Important nuance: local minima are not always bad. With a complex model, the global minimum may overfit — a good local minimum can actually be preferable.

---

## B) Simulated Annealing

Same as random search, except: if $p'$ is worse, **accept it anyway** with some small probability $q$.

This allows occasional uphill moves → the algorithm can escape local minima. If we remember the best model seen across the entire run, the random jumping doesn't hurt us.

(Name comes from metallurgy: controlled cooling of metal to grow crystals. The energy landscape there is mathematically similar to our loss landscape.)

---

## C) Practical Variations

- **Different step distributions**: fixed radius (on the hypersphere), uniform (within the hypersphere), Gaussian (most steps small, rare large jumps — so any point in model space is theoretically reachable in one step)
- **Parallel random search**: run multiple independent searches; hope one starts close to the global minimum. For simulated annealing, one long run ≈ many short runs, so parallelism mainly helps because it uses multiple cores.
- **Discrete model spaces**: random search works for trees too, as long as you define "close" (e.g., two trees are neighbors if one becomes the other by adding/removing a single node).

All of these are **black-box optimization**: they only need to compute the loss function. No knowledge of the model's internals required. Simple, general, but potentially slow.

---

# 7) Population Methods

Instead of one searcher, maintain a *population* of models that communicate.

Examples: evolutionary algorithms, particle swarm, ant colony optimization.

## Evolutionary Algorithm Loop

1. Start with a population of $k$ random models
2. Rank by loss
3. Remove the worst half
4. **Breed** new models from the best half (in continuous spaces: average two parents; in discrete spaces: designing the crossover operator is the hard part)
5. Optional: add a little noise to each child
6. Repeat

Pros:
- Parallelizable
- Powerful — the population can cover multiple minima simultaneously

Cons:
- Slow (computing loss for many models per iteration)
- Many hyperparameters to tune

---

# 8) From Random Search to Gradient Descent

## Branching Search (stepping stone to gradient descent)

Instead of taking one random step, try $k$ random steps and move in the direction of the best one:

1. Pick $k$ random neighbors of $p$
2. Move to the one with lowest loss

The more samples we take, the more directly we head for low loss ($k = 2$ wanders; $k = 15$ makes near-straight lines toward the minimum). But this is expensive: we evaluate the loss $k$ times per step just to find a direction.

Key insight: **if the model space is continuous and the loss smooth, calculus gives us the optimal direction for free** — no sampling needed. This is gradient descent.

---

# 9) Calculus Refresher

For a function $f(x)$ of one variable:

- The **tangent line** at point $p$ is a linear approximation of $f$ near $p$. Zoomed in close enough, the tangent and the function look identical.
- The **derivative** $f'(p)$ is the slope of this tangent line.
- If $f'(p) < 0$: the function decreases to the right → move right to go downhill.
- If $f'(p) > 0$: the function increases to the right → move left to go downhill.

Setting $f'(p) = 0$ finds stationary points (local min/max).

---

# 10) Gradient (Multi-Parameter Derivative)

When the loss depends on multiple parameters (which it always does), we generalize the derivative to the **gradient**. Instead of a tangent *line*, we now have a tangent **hyperplane** — a flat surface that locally approximates the loss function.

For $f(x,y)$:

$$
\nabla f(x,y)
=
\left(
\frac{\partial f}{\partial x},
\frac{\partial f}{\partial y}
\right)
$$

Each component is a **partial derivative**: the slope of the tangent hyperplane along one axis.

Key ideas:

- The gradient vector $\nabla f$ points in the **direction of steepest ascent** on the tangent hyperplane.
- Therefore $-\nabla f$ points in the **direction of steepest descent** — exactly the direction we want to move.
- The *magnitude* of the gradient tells us how steep the slope is. Near the minimum, the landscape flattens out → gradient gets small → steps automatically shrink.

The tangent hyperplane is only a *local* approximation. It's accurate nearby, but if we step too far, the approximation breaks down. This is why we need a learning rate.

---

# 11) Gradient Descent Algorithm

$$
p \leftarrow p - \eta \nabla \text{loss}(p)
$$

- $p$ = current parameters (all the $w$'s and $b$)
- $\nabla \text{loss}(p)$ = gradient at current point (direction of steepest ascent)
- We subtract it → move in direction of steepest descent
- $\eta$ = **learning rate** — scales down the step (typically between 0.0001 and 0.1)

The algorithm is fully **deterministic**: no trial and error, no rejected steps. Compute the optimal direction, take a step, repeat.

Stopping criteria (pick one):
- Fixed number of iterations
- Loss drops below a threshold
- Gradient ≈ 0 (we've reached a (local) minimum)

**Important**: don't confuse the two linear functions in play. The **model** is a linear function from features to predictions (parameterized by $\mathbf{w}, b$). The **tangent hyperplane** is a linear approximation of the loss surface (its slope is the gradient $\nabla \text{loss}$). They live on different spaces.

---

## Gradients for 1D Linear Regression (MSE)

==For the loss $\frac{1}{n} \sum_i (wx_i + b - t_i)^2$, the partial derivatives are:==

$$
\frac{\partial \text{loss}}{\partial w}
=
\frac{2}{n}
\sum_i
(wx_i + b - t_i)x_i
$$

$$
\frac{\partial \text{loss}}{\partial b}
=
\frac{2}{n}
\sum_i
(wx_i + b - t_i)
$$

Each partial derivative is a sum over all instances of (the residual × something). The $\partial w$ term multiplies by $x_i$ because $w$ is the coefficient of $x$; the $\partial b$ term doesn't, because $b$ is a constant offset.

The update moves $(w,b)$ in the direction that reduces the total residual.

---

## Learning Rate Behavior

- **Too high** → the step overshoots the minimum, bounces from side to side, may diverge entirely
- **Too low** → converges but very slowly (tiny steps)
- **Just right** → quick, direct convergence to the minimum

The best $\eta$ is different for each dataset and model. Found by experimentation.

The gradient also provides **automatic step-size adaptation**: as we approach the minimum, the loss surface flattens → the gradient magnitude decreases → steps get smaller naturally, preventing overshoot.

---

## Gradient Descent: Properties Summary

- Only works for **continuous** model spaces with **smooth** loss functions for which we can compute the gradient
- Does **not** escape local minima (unlike simulated annealing) — heads straight for the nearest minimum and stays
- Very fast, low memory, very accurate
- Backbone of ~99% of modern machine learning

For non-convex problems: we can try multiple random restarts, or use stochastic gradient descent (introduced later), which adds randomness back in by computing gradients on subsets of the data.

---

## Analytic Solution (Linear Regression Only)

==For linear regression specifically, we can set:==

==$$==
==\nabla \text{loss} = 0==
==$$==

==and solve algebraically for $w$ and $b$. This gives the **closed-form (OLS) solution** — the exact optimum, no iteration needed.==

But this only works because the MSE loss for a linear model has a nice algebraic structure. For other models (neural nets, etc.) no closed-form solution exists, and gradient descent is the only option. That's why we learn GD even though we don't strictly need it here.

---

# 12) Linear Classification

Same functional form as regression, but used differently.

Model:

$$
f(\mathbf{x}) = \mathbf{w}^\top \mathbf{x} + b
$$

Binary classification rule: the function defines a value above and below the feature space. Wherever it's positive → class A; wherever it's negative → class B.

- If $f(\mathbf{x}) > 0$ → class A
- If $f(\mathbf{x}) < 0$ → class B

The **decision boundary** is the set of points where the output is exactly zero:

$$
\mathbf{w}^\top \mathbf{x} + b = 0
$$

In 1D this is a point, in 2D a line, in 3D a plane, in general a hyperplane.

==Geometric interpretation of $\mathbf{w}$: since $\mathbf{w}$ is the direction of steepest ascent of the function $f$, it is **perpendicular to the decision boundary** and **points toward the positive class side**==. This is useful for geometric intuition about what a classifier is doing.

Why $\nabla f = \mathbf{w}$? Because the model is linear: $f = w_1 x_1 + w_2 x_2 + b$. The partial derivative with respect to each input is just the weight ($\partial f / \partial x_1 = w_1$, etc.), so the gradient is $\mathbf{w}$ itself.

Why does that make $\mathbf{w}$ perpendicular to the boundary? Think of the decision boundary as a contour line on a map — every point on it has the same "elevation" ($f = 0$). If you walk *along* the contour, the elevation doesn't change. The gradient points in the direction of steepest *increase*, which can't have any component along the contour (that direction gives zero change) — so it must be entirely perpendicular to it. And since moving in the direction of $\mathbf{w}$ increases $f$, it points toward the region where $f > 0$ — the positive class side.

// Simpler way to see it: $\mathbf{w} \cdot \mathbf{x}$ measures how much $\mathbf{x}$ aligns with $\mathbf{w}$. On the boundary, every point has the same alignment score ($-b$). So walking along the boundary means you're moving entirely *sideways* relative to $\mathbf{w}$ — never getting closer or further. If every direction along the boundary is sideways to $\mathbf{w}$, then $\mathbf{w}$ is perpendicular to it. Concrete example: if $\mathbf{w} = (1,0)$ and $b = -3$, the boundary is $x_1 = 3$ (a vertical line), and $\mathbf{w}$ points horizontally — perpendicular to it.

![[w-decision-boundary.svg]]

Note the difference from regression: in regression, we draw a line *through* the data in feature+output space (a function from features to a number). In classification, we draw a line *in* feature space alone, dividing it into two regions.

---

# 13) Loss for Classification

### Why not just use misclassification error?

The error (number of misclassified examples) seems natural, but is terrible for gradient descent:

- **Loss surface is almost entirely flat**: changing $w$ or $b$ by a tiny amount almost never flips a prediction. So the loss stays constant almost everywhere.
- **Gradient = 0** in all the flat regions, undefined on the ridges between them.
- GD would either crash or never move.

Important lesson: **your loss function does not have to be the same as your evaluation metric**. 

A loss function serves two purposes:
1. Express what we want to optimize.
2. Provide a **smooth surface** so search algorithms can find a path from a bad model to a good one.

Use a smooth surrogate loss for training; evaluate with the metric you actually care about (e.g., error rate) afterwards.

### Classification losses (roadmap)

Three losses covered in this course:
1. **Least-squares loss** (this lecture) — simple but not great
2. **Log loss / cross-entropy** (Lecture 5, Probability)
3. **SVM loss** (Lecture 6, Linear Models 2)

---

## Least-Squares Classification

Trick: encode the two classes as numbers, then use MSE.

- positive class = $+1$
- negative class = $-1$

Now the target is numeric, and we can use squared loss:

$$
\text{loss}(w,b)
=
\sum_{i \in pos}
(\mathbf{w}^\top \mathbf{x}_i + b - 1)^2
+
\sum_{i \in neg}
(\mathbf{w}^\top \mathbf{x}_i + b + 1)^2
$$

The model is pushed to output values near $+1$ for positive examples and near $-1$ for negative examples. The decision boundary falls where the output crosses zero.

This gives a **smooth** loss surface → gradient descent has no problem finding a solution.

Caveat: even if data is linearly separable, the least-squares optimum **may not perfectly separate the classes**. The smooth loss doesn't "know" that all we care about is the sign of the output — it also penalizes positive examples that are classified correctly but with output far from exactly $+1$. This can pull the boundary away from a perfect separation.

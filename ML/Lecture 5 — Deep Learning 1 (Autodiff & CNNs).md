## 1) Automatic differentiation: letting the computer do calculus

In the previous lecture we computed gradients by hand using the chain rule. **Automatic differentiation (autodiff)** automates this: you write the forward computation in code, and the framework computes all gradients for you.

*// You don't derive gradients on paper anymore. You define "loss = ..." in PyTorch/TensorFlow, call `loss.backward()`, and every parameter's gradient appears. Autodiff is the engine behind this magic.*

### Two modes

| | Forward mode | Reverse mode (backprop) |
|---|---|---|
| Computes | $\frac{\partial \text{output}}{\partial \text{one input}}$ per pass | $\frac{\partial \text{one output}}{\partial \text{all inputs}}$ per pass |
| Cost | One pass per input variable | ==One pass for all parameters== |
| Best when | Few inputs, many outputs | Few outputs (1 loss), many parameters |

Neural networks have millions of parameters but one scalar loss → ==reverse mode wins by a massive margin==.

---

## 2) Tensors: the data structure of deep learning

A **tensor** is a multi-dimensional array — the generalization of scalars, vectors, and matrices:

| Rank | Name | Example |
|---|---|---|
| 0 | Scalar | A single loss value |
| 1 | Vector | A row of pixel values |
| 2 | Matrix | A grayscale image (height × width) |
| 3 | 3-tensor | A color image (height × width × channels) |
| 4 | 4-tensor | A batch of color images (batch × height × width × channels) |

*// In frameworks like PyTorch, everything is a tensor. Your data, your weights, your gradients — all tensors. Learning to think in tensors is essential for deep learning.*

### Operations on tensors

- **Element-wise**: apply a function independently to each element (e.g., ReLU, squaring)
- **Reductions**: collapse a dimension by summing/averaging (e.g., sum over batch → one loss)
- **Matrix multiplication**: the workhorse of linear layers

---

## 3) Computation graphs: eager vs lazy

A ==**computation graph**== tracks every operation performed on tensors, building up the chain of dependencies needed for backprop.

### Eager execution (PyTorch style)

Operations execute immediately as you write them. The graph is built dynamically as code runs.

*// Write Python code normally. Behind the scenes, PyTorch records what you did so it can replay it backward for gradients.*

### Lazy execution (old TensorFlow style)

You first define the entire computation graph symbolically, then execute it in a separate step.

*// Like writing a recipe (graph definition) vs actually cooking (graph execution). More optimization opportunities, but harder to debug.*

> [!tip] Modern practice
> Most frameworks now use ==eager execution by default== (PyTorch always did; TensorFlow switched with TF2). Easier to debug, more Pythonic.

---

## 4) Tensor backpropagation

### The challenge

In the scalar chain rule, derivatives are just numbers you multiply. With tensors, "derivatives" become **Jacobians** — matrices of partial derivatives. For a function $\mathbf{y} = f(\mathbf{x})$ where both are vectors:

$$J = \frac{\partial \mathbf{y}}{\partial \mathbf{x}} = \begin{pmatrix} \frac{\partial y_1}{\partial x_1} & \cdots & \frac{\partial y_1}{\partial x_n} \\ \vdots & \ddots & \vdots \\ \frac{\partial y_m}{\partial x_1} & \cdots & \frac{\partial y_m}{\partial x_n} \end{pmatrix}$$

### The multivariate chain rule

For composed tensor functions $\mathbf{z} = g(f(\mathbf{x}))$:

$$\frac{\partial \mathbf{z}}{\partial \mathbf{x}} = \frac{\partial \mathbf{z}}{\partial \mathbf{y}} \cdot \frac{\partial \mathbf{y}}{\partial \mathbf{x}}$$

This is a ==matrix multiplication of Jacobians==.

*// Same chain rule as before, but now each "derivative" is a matrix. The chain rule becomes matrix multiplication instead of scalar multiplication.*

### In practice: we never build full Jacobians

Full Jacobians are huge ($m \times n$ for each layer). Instead, reverse mode computes ==**vector-Jacobian products (VJPs)**== — multiplying a row vector (the incoming gradient) by the Jacobian, without ever forming the full matrix.

> [!important] Key insight for implementation
> Each operation only needs to know how to compute: "given the gradient of the loss w.r.t. my output, what is the gradient of the loss w.r.t. my input?" This is the VJP, and it's always cheaper than forming the full Jacobian.

---

## 5) Backprop for common operations

### Matrix multiplication $Y = XW$

If $L$ is the loss:

$$\frac{\partial L}{\partial X} = \frac{\partial L}{\partial Y} W^\top \qquad \frac{\partial L}{\partial W} = X^\top \frac{\partial L}{\partial Y}$$

*// The gradient w.r.t. one input involves the transpose of the other input. This pattern shows up everywhere in neural network backprop.*

### Element-wise operations

For $y_i = f(x_i)$ applied element-wise:

$$\frac{\partial L}{\partial x_i} = \frac{\partial L}{\partial y_i} \cdot f'(x_i)$$

The Jacobian is diagonal (each output depends on only one input), so it's just element-wise multiplication.

### Sum/reduction

If $y = \sum_i x_i$, then $\frac{\partial y}{\partial x_i} = 1$ for all $i$. The gradient is broadcast (copied) back to the shape of the input.

---

## 6) Convolutions: exploiting spatial structure

### Motivation

For image data, a fully connected layer treating each pixel independently has problems:
- ==Too many parameters== (a 224×224 RGB image → 150,528 inputs per neuron)
- ==Ignores spatial structure== (nearby pixels are related; a pattern in the top-left should be detected in the bottom-right too)

### The convolution operation

A **kernel** (small weight matrix, e.g., 3×3) slides over the input image. At each position, it computes a dot product between the kernel weights and the local patch of the image → one output value.

$$(\text{input} * \text{kernel})[i,j] = \sum_{m,n} \text{input}[i+m, j+n] \cdot \text{kernel}[m, n]$$

> [!important] Key properties of convolutions
> - ==**Weight sharing**==: the same kernel is used at every position → dramatically fewer parameters than a fully connected layer.
> - ==**Translation equivariance**==: if the input shifts, the output shifts by the same amount. A cat detector works regardless of where the cat is in the image.
> - **Local connectivity**: each output only depends on a small local patch of the input.

### Padding

Without padding, the output shrinks (a 5×5 input with a 3×3 kernel gives a 3×3 output). ==**Zero-padding**== adds a border of zeros around the input to keep the output the same size.

*// "Same" padding = output has same spatial dimensions as input. "Valid" padding = no padding, output shrinks.*

### Stride

The stride controls how far the kernel moves between positions. Stride 1 = slide one pixel at a time (standard). Stride 2 = skip every other position → output is half the size (a form of downsampling).

### Channels

Real images have multiple channels (RGB = 3). A convolutional layer:
- Input: $C_{\text{in}}$ channels
- Each kernel is actually $C_{\text{in}} \times k \times k$ (spans all input channels)
- Use $C_{\text{out}}$ different kernels → output has $C_{\text{out}}$ channels

*// Each output channel is one "feature detector." Early layers might detect edges, textures; deeper layers detect more complex patterns. The network learns what to detect.*

### Pooling

==**Max pooling**== (or average pooling) downsamples by taking the max (or mean) over local patches. Reduces spatial dimensions while keeping the most prominent features.

*// Max pooling says "I don't care exactly where in this 2×2 patch the strong activation is, just that it's there." This adds a bit of translation invariance.*

---

## 7) CNN architectures (the big picture)

A typical CNN alternates:

$$\text{Conv} \to \text{ReLU} \to \text{Pool} \to \text{Conv} \to \text{ReLU} \to \text{Pool} \to \cdots \to \text{Flatten} \to \text{FC} \to \text{Softmax}$$

- **Convolutional blocks**: extract increasingly abstract spatial features
- **Flatten**: reshape the 3D feature map into a 1D vector
- **Fully connected (FC) layers**: combine features for final classification

> [!tip] Trend in modern architectures
> Deeper networks with smaller kernels (3×3) outperform shallow networks with large kernels. Key architectures: LeNet (1998), AlexNet (2012), VGG (2014), ResNet (2015, introduced ==skip/residual connections==).

---

## 8) Making deep nets work (practical training tricks)

### 8.1 Vanishing gradients & activations

Sigmoid/tanh saturate → gradients go to ~0 in deep nets.  
ReLU helps, but can create **dead neurons** (always negative → gradient 0).

*// If the neuron never activates, it never learns. Proper initialization keeps ~half the activations positive so gradients flow.*

### 8.2 Initialization (keep mean ~0, variance ~1)

First, **standardize inputs** (mean 0, variance 1). Then initialize weights so activations don’t explode or vanish:

- **Orthogonal init** (random orthogonal matrix)  
- **Glorot / Xavier** (keeps variance stable through layers)

### 8.3 Mini-batch gradient descent

Like SGD but with a small batch:

- Small batch → noisy gradients, more exploration
- Large batch → stable gradients, more parallelism (but memory heavy)
- Rule of thumb: **16–128** per batch

### 8.4 Optimizers

Common variants of gradient descent:

- **Momentum**: smooths updates using velocity  
- **Nesterov momentum**: look-ahead gradient for better convergence  
- **RMSProp / AdaGrad / AdaDelta / AdaMax**: adapt learning rate per parameter  
- **Adam / Nadam**: momentum + adaptive scaling (default choice)

> [!tip] Practical advice  
> Start with **Adam**. If it fails to converge, try Nesterov momentum.

### 8.5 Regularization

Prevent overfitting in large nets:

- **L2**: penalize large weights (smooth, spherical penalty)  
- **L1**: promotes sparsity (diamond penalty, more exact zeros)  
- **Dropout**: randomly zero hidden units with probability $p$ during training  

During inference, dropout is turned off; outputs are scaled by $p$ to keep activations consistent.

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **Autodiff** | Framework computes all gradients automatically from forward code |
| **Reverse mode** | One backward pass for all parameters; standard for neural nets |
| **Tensor** | Multi-dimensional array; the basic data structure |
| **Jacobian** | Matrix of all partial derivatives between two vector quantities |
| **VJP** | Vector-Jacobian product; efficient way to backprop without full Jacobians |
| **Convolution** | Slide a kernel over input; dot product at each position |
| **Weight sharing** | Same kernel everywhere → fewer params, translation equivariance |
| **Padding** | Zeros around border to control output size |
| **Stride** | Step size of kernel movement; stride > 1 downsamples |
| **Channels** | Each kernel spans all input channels; multiple kernels → multiple output channels |
| **Pooling** | Downsample by taking max/mean over local patches |
| **Vanishing gradients** | Sigmoid/tanh saturate; ReLU helps but can create dead neurons |
| **Initialization** | Orthogonal or Glorot/Xavier to stabilize variance |
| **Mini-batches** | 16–128 typical; trade off noise vs parallelism |
| **Optimizers** | Momentum, Nesterov, RMSProp, Adam (default) |
| **Regularizers** | L2, L1, Dropout |

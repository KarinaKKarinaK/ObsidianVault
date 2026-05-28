## 1) Generative models: the big picture

So far we've built models that **discriminate** (classify or predict). Generative models learn to ==**produce new data**== that resembles the training set.

*// A discriminative model answers "is this a cat or a dog?" A generative model answers "what does a cat look like?" and can draw you a new one.*

### Why generative models?

- **Data augmentation**: generate more training examples
- **Creative applications**: art, music, text generation
- **Understanding data**: learning to generate requires understanding structure
- **Density estimation**: some generative models also estimate $p(\mathbf{x})$

---

## 1.5) Turning a neural network into a probability distribution

There are three main options for making a neural network output a probability distribution:

| Option | Approach | Use case |
|---|---|---|
| **Option 1**: Fixed distribution, learn parameters | Network outputs parameters (e.g., $\mu, \sigma$) of a known distribution | Regression with uncertainty |
| **Option 2**: Generator (sample from latent space) | Feed noise $\mathbf{z}$ through the network → samples from implicit distribution | GANs, generators |
| **Option 3**: Energy-based / normalizing flows | Learn an unnormalized density and normalize it | Density estimation |

### Loss functions from probability distributions

> [!important] Distribution → loss function mapping
> The choice of output distribution determines the loss function:
>
> | Assumed distribution | Loss function |
> |---|---|
> | **Bernoulli** | ==Binary cross-entropy== |
> | **Categorical** | ==Categorical cross-entropy== |
> | **Normal** (learn mean only, fixed $\sigma$) | ==MSE (least squares)== |
> | **Normal** (learn mean AND variance) | Modified MSE (weighted by $1/\sigma^2$ + $\log \sigma$ penalty) |
> | **Laplace** | ==MAE (mean absolute error)== |
>
> *// This is a deep insight: MSE isn't just "a popular loss" — it's what you get when you assume your errors are normally distributed and do maximum likelihood. MAE corresponds to Laplace-distributed errors. The loss function encodes your assumptions about the noise.*

### Diagonal and isotropic Gaussians

When outputting a multivariate normal, the full covariance matrix has $O(n^2)$ parameters. Simplifications:
- ==**Diagonal Gaussian**==: only learn per-dimension variances ($n$ parameters). Assumes features are independent.
- ==**Isotropic Gaussian**==: single shared variance for all dimensions ($1$ parameter). Simplest option.

---

## 2) Generator networks

A ==**generator**== is a neural network that takes a random noise vector $\mathbf{z}$ as input and produces a data sample (e.g., an image):

$$\mathbf{x} = G(\mathbf{z}), \quad \mathbf{z} \sim \mathcal{N}(0, I)$$

The noise vector $\mathbf{z}$ lives in a low-dimensional ==**latent space**==. The generator maps this to high-dimensional data space.

*// Think of the latent space as a "control panel" with a few knobs. Each setting of the knobs produces a different image. The generator is the machine that turns knob settings into pictures.*

### Generator as a probabilistic model

Instead of outputting a single point, a generator can output a **distribution** (e.g., Gaussian mean + variance).
Training then maximizes **log-likelihood**:

$$\max_\theta \sum_i \log p_\theta(x_i)$$

### Why naive generator training fails

If you train a generator with simple maximum likelihood and it can only output one mode (point) per input, it will ==average over all possible outputs==, leading to blurry results. This is a form of **mode collapse**: the model hedges by outputting the mean of all modes rather than committing to one.

---

## 3) Mixture Density Networks

A **mixture density network** outputs the parameters of a ==mixture of Gaussians== instead of a single point prediction. This allows modeling **multi-modal distributions** — situations where multiple outputs are valid for the same input.

The network outputs for each component $k$: a mixing weight $\pi_k$, a mean $\mu_k$, and a variance $\sigma_k^2$.

*// Classic example: **inverse kinematics** — given a target position for a robot's hand, there are usually multiple valid joint configurations. A standard network averages them (giving an impossible pose). An MDN says "here are 3 valid configurations with these probabilities."*

*// If you ask "what color could this pixel be?" the answer might be "either red or blue." A standard network averages them (giving purple). A mixture density network says "50% chance red, 50% chance blue."*

---

## 4) Generative Adversarial Networks (GANs)

### The adversarial setup

A GAN trains two networks against each other:

- ==**Generator $G$**==: takes random noise, produces fake data. Goal: fool the discriminator.
- ==**Discriminator $D$**==: takes real or fake data, outputs probability that the input is real. Goal: correctly distinguish real from fake.

> [!important] The GAN game
> $$\min_G \max_D \; \mathbb{E}_{\mathbf{x} \sim p_{\text{data}}}[\log D(\mathbf{x})] + \mathbb{E}_{\mathbf{z} \sim p_z}[\log(1 - D(G(\mathbf{z})))]$$
>
> - $D$ wants to maximize: correctly label real as real and fake as fake.
> - $G$ wants to minimize: make $D$ label fake as real.
> - At equilibrium, $G$ produces data indistinguishable from real, and $D$ outputs 0.5 for everything.

*// Two art students: one forges paintings, the other inspects them. They keep training against each other until the forger is so good the inspector can't tell the difference. That's a GAN.*

### Training procedure

1. Sample a batch of real data and a batch of noise
2. Generate fake data with $G$
3. Train $D$ for a few steps (maximize its accuracy)
4. Train $G$ for a step (minimize $D$'s accuracy on fakes)
5. Repeat

> [!warning] GAN training is notoriously unstable
> - **Mode collapse**: $G$ learns to produce only a few types of outputs, ignoring the diversity of the real data.
> - **Training oscillation**: $G$ and $D$ chase each other without converging.
> - Requires careful hyperparameter tuning and architectural choices.

### GAN variants

| Variant | Key idea |
|---|---|
| **Conditional GAN** | Generator also takes a class label → can generate specific classes on demand |
| **CycleGAN** | Learns to translate between two domains (e.g., horses ↔ zebras) without paired examples |
| **StyleGAN** | Generates high-resolution faces with controllable style attributes |

### CycleGAN: unpaired image translation

CycleGAN uses ==**cycle consistency loss**==: if you translate an image from domain A to B and back to A, you should get the original back.

$$\mathcal{L}_{\text{cycle}} = \|G_{B \to A}(G_{A \to B}(\mathbf{x})) - \mathbf{x}\|$$

*// Without paired training data, the model could learn a useless mapping (map everything to one image). Cycle consistency prevents this: the translation must be reversible. Interestingly, research showed CycleGANs sometimes "cheat" by hiding information in imperceptible high-frequency patterns (==steganography==) to make the reverse translation easier.*

### StyleGAN: controllable generation

StyleGAN's key architectural innovation: instead of feeding the latent vector $\mathbf{z}$ only at the input, it feeds a ==**style vector at each layer**== of the generator, plus ==per-layer noise== for stochastic details.

- **Style vector per layer**: controls coarse features (pose, face shape) at early layers and fine features (hair texture, freckles) at later layers
- **Per-layer noise**: adds random variation (individual hairs, pores) without affecting overall structure

*// This separation means you can mix styles from different latent vectors at different layers — take the pose from one face and the appearance from another.*

---

## 5) Adversarial examples (a cautionary tale)

Small, carefully crafted perturbations to input data can ==**fool classifiers completely**== while being imperceptible to humans.

*// Add invisible noise to a photo of a panda → the model now says "gibbon" with 99% confidence. The image looks identical to you, but the model's decision boundary is strange in high dimensions.*

> [!warning] Implications
> - Neural networks are vulnerable to adversarial attacks — a serious concern for safety-critical applications (self-driving cars, medical diagnosis).
> - The existence of adversarial examples suggests models aren't learning the same features humans use.
> - Defense is an active research area (adversarial training, certified defenses, etc.).

---

## 6) Autoencoders

### The bottleneck idea

An ==**autoencoder**== is trained to reconstruct its own input through a narrow bottleneck:

$$\mathbf{x} \to \underbrace{f(\mathbf{x})}_{\text{encoder}} = \mathbf{z} \to \underbrace{g(\mathbf{z})}_{\text{decoder}} \approx \mathbf{x}$$

- **Encoder** $f$: compresses $\mathbf{x}$ into a low-dimensional ==**latent representation**== $\mathbf{z}$
- **Decoder** $g$: reconstructs $\mathbf{x}$ from $\mathbf{z}$
- Loss: ==**reconstruction error**== (e.g., MSE between input and output)

*// Force all the information through a tiny pipe ($\mathbf{z}$). Whatever survives must be the most important structure. The bottleneck forces the network to learn a compressed representation.*

### What are autoencoders good for?

- **Dimensionality reduction** (like PCA but nonlinear)
- **Denoising** (train on corrupted inputs, reconstruct clean outputs)
- **Feature learning** (use the encoder's latent space as features for other tasks)
- **Anomaly detection** (normal data reconstructs well; anomalies don't)

### Limitations as generative models

You can try to sample new data by picking random $\mathbf{z}$ vectors and decoding them. But the latent space of a plain autoencoder is ==not structured==: there's no guarantee that a random $\mathbf{z}$ maps to a realistic output. This motivates VAEs.

---

## 7) Variational Autoencoders (VAEs)

### The fix: regularize the latent space

A VAE modifies the autoencoder so that the latent space has a ==known, smooth structure== (a standard normal distribution).

> [!important] VAE key idea
> The encoder doesn't output a single $\mathbf{z}$. Instead, it outputs the **parameters** of a distribution: a mean $\boldsymbol{\mu}$ and variance $\boldsymbol{\sigma}^2$. Then we **sample** $\mathbf{z} \sim \mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\sigma}^2)$.
>
> *// Instead of "this image maps to point $\mathbf{z}$", the encoder says "this image maps to a cloud centered at $\boldsymbol{\mu}$ with spread $\boldsymbol{\sigma}$." Sampling from that cloud adds beneficial randomness.*

### VAE loss

$$\mathcal{L} = \underbrace{\text{reconstruction loss}}_{\text{make output ≈ input}} + \underbrace{\text{KL}(q(\mathbf{z}|\mathbf{x}) \| p(\mathbf{z}))}_{\text{keep latent space close to } \mathcal{N}(0, I)}$$

- **Reconstruction loss**: standard MSE or cross-entropy between input and output
- **KL term**: ==penalizes the encoder for deviating from the prior $\mathcal{N}(0, I)$==

*// The KL term is the magic ingredient. It forces the latent space to be smooth and continuous. Nearby points in latent space decode to similar outputs, and random samples from $\mathcal{N}(0, I)$ produce realistic outputs.*

### The reparameterization trick

Sampling is not differentiable. The fix: instead of sampling $\mathbf{z} \sim \mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\sigma}^2)$ directly, write:

$$\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(0, I)$$

Now the randomness is in $\boldsymbol{\epsilon}$ (which doesn't depend on parameters), and $\mathbf{z}$ is a differentiable function of $\boldsymbol{\mu}$ and $\boldsymbol{\sigma}$ → backprop works.

*// Move the randomness to a fixed source (standard normal). The network parameters only appear in deterministic operations (multiply, add), so gradients flow normally.*

### VAEs vs GANs

| | VAE | GAN |
|---|---|---|
| Training | Stable (single loss) | ==Unstable (adversarial game)== |
| Output quality | Tends to be blurry | ==Sharp, realistic== |
| Latent space | Smooth, structured | Less interpretable |
| Density estimation | Yes (approximate) | No |
| Mode coverage | Good (covers all modes) | May suffer mode collapse |

---

## 8) Latent space properties

> [!tip] What makes a good latent space
> - **Smoothness**: small changes in $\mathbf{z}$ → small changes in output
> - **Interpolation**: walking between two points in latent space produces meaningful intermediate outputs (e.g., a smooth morph between two faces)
> - **Disentanglement**: individual dimensions of $\mathbf{z}$ correspond to interpretable features (e.g., one dimension controls hair color, another controls pose)

*// The famous "king − man + woman = queen" arithmetic in word embeddings is the same idea: a well-structured latent space supports meaningful operations on its coordinates.*

### Spherical linear interpolation (slerp)

When the latent space is sampled from a Gaussian, points concentrate on a ==**hypersphere**== in high dimensions. Linear interpolation passes through the low-density center, producing worse results. ==**Spherical linear interpolation (slerp)**== follows the surface of the sphere instead:

$$\text{slerp}(\mathbf{z}_1, \mathbf{z}_2, t) = \frac{\sin((1-t)\Omega)}{\sin \Omega} \mathbf{z}_1 + \frac{\sin(t\Omega)}{\sin \Omega} \mathbf{z}_2$$

where $\Omega = \arccos(\hat{\mathbf{z}}_1 \cdot \hat{\mathbf{z}}_2)$.

*// In high dimensions, Gaussian samples almost never land near the origin — they cluster on a thin shell. Walking through the center (linear interpolation) passes through "no man's land." Slerp stays on the shell where the density is.*

### Autoencoders as dimensionality reduction

Autoencoders can be viewed as a ==nonlinear generalization of PCA==. With linear activations and MSE loss, an autoencoder recovers exactly the PCA solution. With nonlinear activations, it can capture more complex structure than PCA.

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **Generator network** | Maps noise $\mathbf{z}$ to data; latent space → data space |
| **GAN** | Generator vs discriminator adversarial game |
| **GAN loss** | $\min_G \max_D$ objective; equilibrium at $D = 0.5$ |
| **Mode collapse** | GAN failure: generator only produces a few types |
| **Conditional GAN** | Generator conditioned on class label |
| **Adversarial examples** | Imperceptible perturbations fool classifiers |
| **Autoencoder** | Encoder → bottleneck $\mathbf{z}$ → decoder; minimize reconstruction error |
| **VAE** | Encoder outputs $\mu, \sigma$; KL regularizer makes latent space smooth |
| **VAE loss** | Reconstruction + KL divergence to $\mathcal{N}(0,I)$ |
| **Reparameterization trick** | $\mathbf{z} = \mu + \sigma \odot \epsilon$ makes sampling differentiable |
| **Loss ↔ distribution** | Normal→MSE, Laplace→MAE, Bernoulli→binary CE, Categorical→CE |
| **MDN** | Outputs mixture of Gaussians; handles multi-modal predictions |
| **CycleGAN** | Cycle consistency loss; unpaired domain translation |
| **StyleGAN** | Style vector per layer + per-layer noise; controllable generation |
| **Slerp** | Spherical interpolation in latent space; stays on high-density shell |

---

## Related Notes
- [[ML/Lecture 5 — Deep Learning 1 (Autodiff & CNNs)]] — deep learning foundations
- [[ML/Lecture 4 — Neural Networks & Backpropagation]] — neural net fundamentals
- [[Robotics/08 - Key Subfields & Concepts]] — Diffusion Policy uses diffusion generative models for robot actions
- [[Technical Skills/Notes/Subtopics/LLMs]] — LLMs are a form of generative model

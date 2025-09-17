
---

## Chapter Goals

- Learn how to **multiply large integers or polynomials** faster than `O(n^2)`.
    
- Introduce the **Discrete Fourier Transform (DFT)** as a tool.
    
- Show how the **Fast Fourier Transform (FFT)** computes DFT in `Θ(n log n)`.
    
- Apply FFT to polynomial and integer multiplication.
    

---

## 5.1 Polynomial Multiplication Problem

### Setup

- Given two degree-(n−1) polynomials:
    
    ```
    A(x) = a0 + a1x + … + a_{n−1}x^{n−1}
    B(x) = b0 + b1x + … + b_{n−1}x^{n−1}
    ```
    
- Want product:
    
    ```
    C(x) = A(x)·B(x) = c0 + c1x + … + c_{2n−2}x^{2n−2}
    ```
    
- Naïve algorithm: compute coefficients directly → `Θ(n^2)`.
    

### Goal

- Achieve **O(n log n)** multiplication.
    

---

## 5.2 Evaluation & Interpolation Framework

### Key trick

- To multiply polynomials, instead of working with coefficients, work with **values at sample points**.
    

1. **Evaluate** both A(x), B(x) at many points.
    
2. Multiply pointwise: `C(xi) = A(xi)·B(xi)`.
    
3. **Interpolate** to recover coefficients of C.
    

### Requirements

- Need `2n−1` distinct points to recover a degree-(2n−2) polynomial.
    
- If evaluation & interpolation cost `Θ(n log n)`, total = `Θ(n log n)`.
    

This is where the DFT/FFT comes in.

---

## 5.3 Discrete Fourier Transform (DFT)

### Definition

For vector `(a0,…,a_{n−1})`, define:

```
DFT(a0,…,a_{n−1}) = (A(ω0), A(ω1), …, A(ω_{n−1}))
```

where:

- `A(x) = Σ_{j=0}^{n−1} aj x^j`.
    
- `ωk = e^{2πik/n}` = nth complex roots of unity.
    

So DFT maps **coefficient representation** → **value representation** at nth roots of unity.

### Inverse DFT

- There exists an explicit inverse transform (scaled conjugate of DFT).
    
- So we can recover coefficients from values.
    

---

## 5.4 FFT Algorithm

### Goal

- Compute DFT in `Θ(n log n)` instead of naïve `Θ(n^2)`.
    

### Divide-and-conquer idea

1. Split polynomial A(x) into even and odd terms:
    
    ```
    A(x) = A_even(x^2) + x·A_odd(x^2)
    ```
    
2. To evaluate at nth roots of unity `ωk`, note:
    
    - `(ωk)^2` are the nth roots squared = the (n/2)th roots.
        
    - So evaluating size-n DFT reduces to **two size-(n/2) DFTs**.
        
3. Combine results in O(n).
    

### Recurrence

```
T(n) = 2T(n/2) + O(n)
```

- By Master Theorem: `T(n) = Θ(n log n)`.
    

### Requirements

- n must be a power of 2 (pad with zeros if not).
    
- Uses symmetry of complex roots of unity.
    

---

## 5.5 Polynomial Multiplication via FFT

### Steps

1. Pad coefficient vectors to length 2n (power of 2).
    
2. Compute DFT of A and B: `Â, B̂`.
    
3. Multiply pointwise: `Ĉk = Âk · B̂k`.
    
4. Apply inverse FFT to get coefficients of C.
    
5. Round if working with integers (small floating-point errors possible).
    

### Complexity

- Two forward FFTs + one inverse FFT = `3·Θ(n log n)`.
    
- Pointwise multiplication = `Θ(n)`.
    
- Total: **Θ(n log n)**.
    

### Integer multiplication

- Represent large integers as polynomials in base `B`.
    
- Multiply polynomials with FFT.
    
- This yields fast large-integer multiplication algorithms.
    

---

## 5.6 Example Walkthrough (n=4)

Let `A(x) = a0 + a1x + a2x^2 + a3x^3`.

- Evaluate at 4th roots of unity: {1, i, −1, −i}.
    
- Compute recursively using FFT decomposition.
    
- Combine even/odd results.
    

This reduces computation dramatically compared to direct evaluation.

---

## 5.7 Practical Considerations

- **Numerical stability**: floating-point error accumulates; need rounding.
    
- **Modular FFT (NTT)**: use Number Theoretic Transform (with modular arithmetic) to avoid floating-point issues in cryptographic/large integer contexts.
    
- **Padding**: always pad input size to power of 2.
    
- **Libraries**: FFT is heavily optimized in libraries like FFTW, numpy.fft.
    

---

# 🔑 Chapter 5 Upshot

- Multiplying polynomials naively is quadratic, but via FFT it is `Θ(n log n)`.
    
- FFT leverages **divide-and-conquer** and root-of-unity symmetries.
    
- Framework: evaluation (FFT) → pointwise multiplication → interpolation (inverse FFT).
    
- Core recurrence: `T(n) = 2T(n/2) + O(n)` → `Θ(n log n)`.
    
- Applications:
    
    - Fast integer multiplication (used in cryptography, big number libraries).
        
    - Signal processing (FFT = cornerstone of digital signal analysis).
        

---

## 🎓 Exam / Interview Tips

- Be able to explain the **even/odd decomposition**: `A(x) = A_even(x^2) + xA_odd(x^2)`.
    
- Know why nth roots of unity help: squaring them halves the problem.
    
- Memorize the **FFT recurrence** and runtime `Θ(n log n)`.
    
- Explain the 3-step algorithm for polynomial multiplication via FFT.
    
- Mention practical issues (padding, rounding, modular arithmetic).
    

---

## 🧠 Common Pitfalls

- Forgetting to pad to next power of 2 → FFT fails.
    
- Mixing up coefficient vs value representations.
    
- Ignoring floating-point errors when converting back to integers.
    
- Misunderstanding roots of unity: they are evenly spaced points on the complex unit circle.
    

---
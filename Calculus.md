
---

## **1. The average rate of change of (f(x)) on ([a,b])**

This measures how much (f(x)) changes _on average_ between two points.

$$ \text{Average rate of change} = \frac{f(b)-f(a)}{b-a}.  $$

It is the slope of the secant line connecting ((a,f(a))) and ((b,f(b))).

---

## **2. The instantaneous rate of change of (f(x)) at (x=a)**

This is the **derivative** at that point:

$$f'(a) = \lim_{x\to a} \frac{f(x)-f(a)}{x-a}.  $$


It is the slope of the tangent line at (x=a).

---

## **3. $$\displaystyle \lim_{x\to a} f(x) = L)$$**

As (x) gets arbitrarily close to (a), (f(x)) gets arbitrarily close to (L).  
The value **at** (x=a) does not matter.

---

## **4. One-sided limits**

### **Right-hand limit:**

$$ \lim_{x\to a^+} f(x) = L  $$

Means as (x) approaches (a) **from the right**, (f(x)) approaches (L).

### **Left-hand limit:**

[  
\lim_{x\to a^-} f(x) = L  
]  
Means as (x) approaches (a) **from the left**, (f(x)) approaches (L).

---

## **5. Limits at infinity**

### **(\lim_{x\to \infty} f(x)=L)**

As (x) becomes very large, (f(x)) gets close to (L).

### **(\lim_{x\to -\infty} f(x)=L)**

As (x) becomes very negative, (f(x)) gets close to (L).

This often describes horizontal asymptotes.

---

## **6. Infinite limits**

### **(\lim_{x\to a} f(x)=\infty)**

As (x) gets close to (a), (f(x)) grows without bound.

### **(\lim_{x\to a^+} f(x) = -\infty)**

As (x) approaches (a) from the right, (f(x)) decreases without bound.

These describe _vertical asymptotes_.

---

## **7. (f) is continuous at (c)**

Three things must all be true:

1. (f(c)) is defined
    
2. (\lim_{x\to c} f(x)) exists
    
3. (\lim_{x\to c} f(x) = f(c))
    

If any of these fail, (f) is not continuous at (c).

---

## **8. (f) is left (or right) continuous at (c)**

### Left continuous:

[  
\lim_{x\to c^-} f(x) = f(c)  
]

### Right continuous:

[  
\lim_{x\to c^+} f(x) = f(c)  
]

Used for piecewise functions.

---

## **9. (f) has a continuous extension to (c)**

Even if (f(c)) is not defined or incorrect, **we can redefine** (f(c)) to make it continuous.

Example:  
If (f(x)=\frac{x^2-1}{x-1}), undefined at (x=1), but we can define (f(1)=2) to make it continuous.

---

## **10. (f) is a continuous function**

Means (f) is continuous **at all points** in its domain.  
Examples: polynomials, exponentials, sin, cos.

---

## **11. (f) takes maximum and minimum values on interval (I)**

This happens if (f) is continuous on a **closed, bounded interval** ([a,b]).  
This is guaranteed by the **Extreme Value Theorem (EVT)**.

---

## **12. (f) is bounded on interval (I)**

There exists some number (M) such that:

[  
|f(x)| \le M \quad \text{for all } x\in I.  
]

Continuous functions on closed intervals are always bounded.

---

## **13. (f) has the intermediate-value property on interval (I)**

If (f(a) < k < f(b)), then **there exists some (c\in(a,b))** such that:

[  
f(c) = k.  
]

This is the **Intermediate Value Theorem (IVT)**.  
Means the graph has no jumps.

---
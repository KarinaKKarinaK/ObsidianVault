## How these concepts hang together (exam “mental map”)

When you see a **matrix A**, you should connect:

- **System Ax = b**
    
    - Row-reduce [A|b]
        
    - Consistent? Pivot in last column? Free variables? → solution set form.
        
- **Transformation T(x)=Ax**
    
    - Onto? → pivot in every row ↔ columns span Rm\mathbb{R}^mRm.
        
    - One-to-one? → pivot in every column ↔ columns linearly independent ↔ Nul A = {0}.
        
- **Invertible?**
    
    - Square matrix; det A ≠ 0; row-reduce to I; n pivots; columns form a basis of Rn\mathbb{R}^nRn; transformation is bijective.
        
- **Vector spaces / subspaces**
    
    - Nul A is a subspace of Rn\mathbb{R}^nRn (kernel).
        
    - Col A is a subspace of Rm\mathbb{R}^mRm (range).
        
    - A basis is the “minimal generating set without redundancy.”
        

Almost every exam question is: **take the matrix, row-reduce it, and then apply the right theorem.**
---

## Related Notes
- [[ML/Lecture 1 — Linear Models & Optimization]] — linear models built on linear algebra
- [[ML/Lecture 4 — Neural Networks & Backpropagation]] — matrix operations in neural nets
- [[ML/Lecture 0 — What is ML]] — ML uses linear algebra throughout
- [[Stats/Stats Review]] — probability and statistics as the other math pillar of ML
- [[Quantitative Trading/Topic Notes/1 - Probability – Core Concepts]] — probability for quant trading

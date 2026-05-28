### **Probability Fundamentals (2 hours)**

#### Topics:

- Multiplication rule
- Conditional probability
- Bayes formula intuition
- Complement events
- Expected payoff in multi-step scenarios
- Dice questions (like their “odds of rolling a 6?” example)

#### Practice:

- Green Book chapter on probability
- Brainstellar conditional probability
- Classic: cards, dice, balls, draws


## Overview
- Definition:
- Why it matters for trading:
- Key principles:

## Core Rules
- Addition rule:
- Multiplication rule:
- Complement rule:
- Independence vs dependence:

## Cheat Notes
- Common shortcuts:
- Common traps:
- How Optiver may test this:

## Worked Examples
1)
2)
3)

## Practice Section
- [ ] Solve 10 probability basics
- [ ] Solve 5 “market-style” probability questions

## Flashcards
Q:: What is the complement rule?  
A::

Q:: What indicates independence between two events?  
A::

---
Below is **everything you need to know about probability + Bayes Theorem for Optiver** — **no fluff, only what is actually used in cognitive interviews**.  
This is the **exact level** tested at Optiver, IMC, Jane Street, SIG, etc.

If you master the material below + practice a few examples, you will absolutely **ace** the probability section of your technical interview.

---

# ✅ **1. The Optiver Probability Core (What They Actually Test)**

Optiver does _not_ test abstract measure theory or integrals.

They test:

### ✔ Fast, intuitive probability

### ✔ Conditional probability

### ✔ Bayes theorem

### ✔ Expected value

### ✔ Odds → probability conversions

### ✔ Law of total probability

### ✔ Combinatorics (light: choose, permutations)

### ✔ Binomial distributions (only simple)

### ✔ Independence vs. dependence

### ✔ Probability updates when new information arrives (very important for market making)

If you are solid in the above, you’re already in the top 10%.

---

# ✅ **2. Core Definitions (You Must Know These Cold)**

### **Probability of an event A**

![](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==)
![[Screenshot 2025-11-24 at 14.58.09.png]]


### **Complement**

$$ 
P(A^c) = 1 - P(A)  
$$

### **Union**

$$  
P(A \cup B) = P(A) + P(B) - P(A \cap B)  
$$

### **Intersection (if independent)**

$$  
P(A \cap B) = P(A) P(B)  
$$

### **Conditional Probability**

$$
P(A|B) = \frac{P(A \cap B)}{P(B)}  
$$

This is tested EXTREMELY frequently.

---

# ✅ **3. Expected Value (Most Important For Traders)**

$$
EV = \sum p_i \cdot x_i  
$$

Optiver constantly asks questions like:

- “Is this game +EV or –EV?”
    
- “If event probability is 20%, what payoff do you require for EV = 0?”
    
- “If EV is negative, what price should change?”
    

### Translate Probabilities to Fair Prices

If probability of outcome A is _p_, then the _fair price_ of $1 payout is:

[  
\text{fair price} = p  
]

Example:  
20% event → value is $0.20.

**This intuition is the heart of market making.**

---

# ✅ **4. Odds vs. Probability (Critical)**

You must convert between odds and probability _fast_.

### **Probability → Odds**

[  
p = \frac{1}{n} \Rightarrow \text{odds} = (n-1):1  
]

Example:  
20% = 1/5 chance = **4:1 odds**  
(You win 4 for every 1 you lose.)

### **Odds → Probability**

If odds are _a : b_:

[  
p = \frac{b}{a+b}  
]

Example:  
4:1 odds → p = 1/(5) = 20%

---

# ✅ **5. Law of Total Probability**

If B partitions the sample space:

[  
P(A) = P(A|B)P(B) + P(A|B^c) P(B^c)  
]

Example:  
Machine is:

- Good: 90% of the time → outputs correct item 95%
    
- Bad: 10% → outputs correct item 50%
    

Overall correctness:  
[  
P(\text{correct}) = 0.9(0.95) + 0.1(0.5)  
]

These types appear in Optiver interviews all the time.

---

# ✅ **6. Bayes Theorem — MUST KNOW**

The most important formula in trading probability:

[  
P(A|B) = \frac{P(B|A)P(A)}{P(B)}  
]

Expanded:  
[  
P(A|B) = \frac{P(B|A)P(A)}{P(B|A)P(A) + P(B|A^c)P(A^c)}  
]

This is used constantly when updating beliefs after trades.

---

# 📌 **Bayes Theorem Intuition (Trader Version)**

**Posterior ∝ Likelihood × Prior**

- "Prior" = what you believed before
    
- "Likelihood" = how consistent is the new info with each hypothesis?
    
- "Posterior" = updated belief
    

Example:  
You're market making:

Your theoretical value = 31M.  
Trader buys aggressively from you at your ask → that means his belief > your ask.

**You update your distribution upward.**  
That is Bayes Theorem intuition in market making.

---

# ✔️ **7. Binomial Distribution (Simple Version Only)**

Optiver tests **only the following level**:

[  
P(X=k) = {n \choose k} p^k (1-p)^{n-k}  
]

Where:

- n = number of trials
    
- p = probability of success
    
- k = # of successes
    

You need to do these FAST.

### Example:

Biased coin P(H)=0.6  
Flip 5 times.  
P(exactly 3 heads) = ?

[  
{5 \choose 3} 0.6^3 0.4^2  
]

---

# ✔️ **8. Combinatorics (Choose)**

Only this:

[  
{n \choose k} = \frac{n!}{k!(n-k)!}  
]

Examples they like:

- Probability of drawing certain combinations of cards
    
- Selecting items without replacement
    
- Arrangements conditional on a property
    
- “Two balls same color” problems
    

---

# ✔️ **9. Markets + Probability (Very Important)**

These ideas appear constantly in technical interviews:

### **1 → If someone hits your ask**

- They think true value > your ask
    
- So shift your market upward
    
- And widen a bit
    
- Because now you’re short → risk
    

### **2 → If someone hits your bid**

- They think value < your bid
    
- Shift downward
    
- Adjust position risk
    

### **3 → If they buy/sell a LOT quickly**

There’s strong information → update faster  
(because their likelihood is strong)

This is exactly Bayesian updating.

---

# ⚠️ **10. Most Common Probability Questions in Optiver Interviews**

### **1. Probability two drawn balls are same color**

Know how to compute:

[  
P(\text{same}) = \frac{\binom{W}{2} + \binom{B}{2}}{\binom{W+B}{2}}  
]

### **2. Rolling dice → probability of at least X**

Compute complement first:

[  
P(\text{≥ 9}) = 1 - P(\text{≤8})  
]

### **3. “Pick a random point” geometric probability**

Often interval lengths → ratio

### **4. Card problems**

Use inclusion-exclusion:

[  
P(A \cup B) = P(A) + P(B) - P(A \cap B)  
]

### **5. “At least one” problems**

Use complement:

[  
P(\text{at least one}) = 1 - P(\text{none})  
]

### **6. Conditional probability**

You MUST speak your logic clearly.

---

# 🔥 **11. Bayes Theorem — Optiver-Style Examples**

### **Example 1 — Coin Problem**

You have 2 coins:

- Fair coin
    
- Biased coin (P(H)=0.75)
    

Pick a coin at random, flip once, get heads.  
What’s the probability you picked the biased coin?

[  
P(\text{bias}|\text{H}) = \frac{0.5(0.75)}{0.5(0.75) + 0.5(0.5)}  
]

[  
= \frac{0.375}{0.375 + 0.25} = \frac{0.375}{0.625} = 0.6  
]

🎯 **Takeaway: after seeing Heads, biased is more likely.**

---

### **Example 2 — Market Making with Bayes**

Your theoretical value = 50  
You quote 48–52  
Trader buys from your ask at 52.

Posterior belief shifts, because:

[  
P(\text{value high}|\text{aggressive buying}) > P(\text{value high})  
]

So next quote might be 51–55.

This is the intuition they want.

---

# 🔥 **12. Shortcuts You Should Use in the Interview**

### **1. Use complements**

E.g., “P(at least one) = 1 – P(none)”  
This is faster.

### **2. Use symmetry**

E.g., drawing 2 balls same color.

### **3. Convert EV → fair price instantly**

E.g., 20% → $0.20  
If payout is $1 → fair bet = 0.20

### **4. When stuck: verbalize uncertainty**

Traders care about clarity more than correctness.

---

# 🎯 **13. How to Speak Probability During the Interview**

This is CRUCIAL.  
Use this style:

**“Let me structure the problem.  
First I compute the total sample space.  
Then the favorable outcomes.  
Finally I divide to get the probability.”**

**“Let me check conditional probability:  
P(A|B)=P(A∩B)/P(B).”**

**“Now I compute expected value:  
Probability × payoff.”**

**“Now updating my belief after the trade — this is Bayesian.”**

If you speak like this, you will sound _exactly like a quant trader_.

---

# 🔥 READY FOR THE NEXT STEP?

If you want, I can now:

👉 Create probability flashcards  
👉 Generate 50 Optiver-style probability drills  
👉 Create a timed test  
👉 Run a live mock interview  
👉 Explain any topic deeper (Bayes, EV, etc.)

Just tell me:  
**“Give me the drills”** or **“Start the mock interview”**
---

## Related Notes
- [[Quantitative Trading/Topic Notes/2 - EV]] — expected value using probability
- [[Quantitative Trading/Topic Notes/3 - Conditional Probability and Bayes]] — Bayes' theorem
- [[Quantitative Trading/Topic Notes/4 - Combinatronics & Permutations]] — counting methods
- [[Stats/Stats Review]] — formal statistics foundations
- [[ML/Lecture 3 — Probabilistic Models]] — probabilistic ML

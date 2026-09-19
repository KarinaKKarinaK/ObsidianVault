# COMP 2711 Course Notes (complete, exam-oriented)

Everything from all 19 lecture decks, plus question patterns mined from the 2023-2025 past exams. For logistics and exam format see [[Course Overview - Discrete Math Tools]].

---

# 1. Logic

## Connectives and truth tables (memorize)

| $s$ | $t$ | $s \wedge t$ | $s \vee t$ | $s \oplus t$ | $s \Rightarrow t$ | $s \Leftrightarrow t$ |
|---|---|---|---|---|---|---|
| T | T | T | T | F | T | T |
| T | F | F | T | T | F | F |
| F | T | F | T | T | T | F |
| F | F | F | F | F | T | T |

- $\vee$ is inclusive or; $\oplus$ exactly one. $\neg$ binds only to the statement immediately right of it.
- **Equivalence**: same truth value under ALL settings. Prove by truth table or laws; disprove with ONE counterexample row.
- **$s \Rightarrow t$ is false ONLY when s=T, t=F** - false hypothesis makes it vacuously true (card example: "if heart then queen" is not a lie when the card is a diamond). Principle of the excluded middle: true exactly when not false.
- Four phrasings of $s \Rightarrow t$: "s implies t", "if s then t", "t if s", "**s only if t**".
- $s \Leftrightarrow t = (t \Rightarrow s) \wedge (s \Rightarrow t)$.

## Named laws

- **Distributive**: $w \wedge (u \vee v) \equiv (w \wedge u) \vee (w \wedge v)$ (and dual)
- **Associative**, **commutative** for $\wedge, \vee$
- **DeMorgan**: $\neg(p \vee q) \equiv \neg p \wedge \neg q$; $\neg(p \wedge q) \equiv \neg p \vee \neg q$
- **Implication law**: $p \Rightarrow q \equiv \neg p \vee q$ (used constantly in "no truth table" proofs)
- Double negation. XOR: $p \oplus q \equiv (p \vee q) \wedge \neg(p \wedge q) \equiv \neg(\neg(p \vee q) \vee (p \wedge q))$.

# 2. Quantifiers

- Free variables need a **universe**; always state it. $\forall$ = for all, $\exists$ = there exists.
- Proving: $\exists$ true → exhibit one witness. $\forall$ false → exhibit one counterexample. $\exists$ false / $\forall$ true → argue for every element.
- **Restriction to a subset (Theorem 3.2)**: $\forall x \in U_1(p(x)) \equiv \forall x \in U_2(q(x) \Rightarrow p(x))$ (universal uses $\Rightarrow$); $\exists x \in U_1(p(x)) \equiv \exists x \in U_2(q(x) \wedge p(x))$ (existential uses $\wedge$). Mixing these up is a classic error.
- **Negation rules** (exam staple: "push negations to the predicates"):
	- $\neg\forall x\,p(x) \equiv \exists x\,\neg p(x)$; $\neg\exists x\,p(x) \equiv \forall x\,\neg p(x)$
	- Nested: flip every quantifier, negate the inner formula, apply DeMorgan/implication law inside. Example (F2025): $\neg\forall x (p(x) \vee \exists y (p(y) \Rightarrow \forall z\, q(x,z)))$ becomes $\exists x (\neg p(x) \wedge \forall y (p(y) \wedge \exists z\, \neg q(x,z)))$.
- Order matters: $\exists y \forall x$ implies $\forall x \exists y$, NOT conversely.
- Implicit quantification: "the sum of even integers is even" = $\forall m \forall n ((even(m) \wedge even(n)) \Rightarrow even(m+n))$.
- Example nested formalization (Euclid's division theorem): $\forall n \in Z^+\, \forall m \in N\, \exists q \exists r\, ((r < n) \wedge (m = qn + r))$.

# 3. Inference and Proof Methods

## Principles

- **Modus ponens** (3.3): from $p$ and $p \Rightarrow q$ conclude $q$.
- **Conditional proof** (3.4): assume $p$, derive $q$ → conclude $p \Rightarrow q$.
- **Universal generalization** (3.5): prove $p(x)$ for a generic $x \in U$ → $\forall x\,p(x)$.
- **Contraposition** (3.6): $p \Rightarrow q \equiv \neg q \Rightarrow \neg p$. NOT the **converse** $q \Rightarrow p$ (classic trap - not equivalent).
- **Contradiction** (rule 12): assume $p$ and $\neg q$, derive $r \wedge \neg r$ → conclude $p \Rightarrow q$.
- Other rules: conjunction, disjunction introduction, biconditional from both directions, transitivity/hypothetical syllogism, existential generalization, disjunctive syllogism (from $p \vee q$ and $\neg p$ conclude $q$ - appears in every exam derivation).

## Exam derivation recipe (appears on EVERY midterm)

Given premises, derive the conclusion line by line, naming the rule: simplification (from $a \wedge b$ get $a$), modus ponens, disjunctive syllogism, conjunction. Example (F2025): premises $p \Rightarrow (r \Rightarrow q)$, $\neg q$, $(q \vee p) \wedge t$ ⊢ $\neg r \wedge t$: get $t$ and $q \vee p$ by simplification; $p$ by disjunctive syllogism with $\neg q$; $r \Rightarrow q$ by MP; $\neg r$ by modus tollens/contrapositive with $\neg q$; conjoin.

## Model proofs

- Direct: "$m$ even $\Rightarrow m^2$ even": $m = 2k \Rightarrow m^2 = 2(2k^2)$.
- Contraposition: "$n^2 > 100 \Rightarrow n > 10$": assume $n \le 10$, then $n^2 \le 100$.
- Contradiction: **$\sqrt{5}$ (or $\sqrt2 + \sqrt3$) irrational**: assume $= m/n$, square, count prime factors (even vs odd count) or use the even/even gcd argument. For $\sqrt2 + \sqrt3$: square to get $5 + 2\sqrt6$ rational → $\sqrt6$ rational → contradiction.

# 4. Modular Arithmetic and Crypto Intro

- **Euclid's Division Theorem (2.12)**: for $n > 0$, every $m$ has UNIQUE $q, r$ with $m = nq + r$, $0 \le r < n$. Existence by smallest counterexample; uniqueness: $n(q - q^*) = r^* - r$ with $|r^* - r| < n$ forces both zero.
- $m \bmod n$ = that unique $r$ (smallest nonnegative). **Negatives**: $(-m) \bmod n = n - (m \bmod n)$ when $m \bmod n \ne 0$. E.g. $-25 \bmod 4 = 3$.
- **Lemma 2.2**: $(i + kn) \bmod n = i \bmod n$.
- **Lemma 2.3**: reduce mod n anywhere, anytime - but always take a final mod: $(ij) \bmod n = ((i \bmod n)(j \bmod n)) \bmod n$. Without the final mod it's false ($2 \cdot 8 = 16 \ne 7 = 16 \bmod 9$).
- **$Z_n = \{0..n-1\}$** with $+_n, \cdot_n$; commutative, associative, distributive all hold (Theorem 2.4; proof unwraps definitions via Lemma 2.3).
- **Caesar cipher**: encrypt $x \mapsto (x + s) \bmod 26$, decrypt subtract; key = shift.
- **Multiplication cipher** $M \mapsto a \cdot_n M$: decryptable iff $f$ invertible iff $\gcd(a, n) = 1$. (In $Z_{12}$: $a = 4$ maps 4 values to 0; $a = 5$ works.)
- **Public-key idea**: everyone has public $P$ and secret $S$, mutual inverses; secure only if $S$ is hard to get from $P$. RSA achieves this.

# 5. GCDs, Extended Euclid, Inverses

- $\gcd$, primes, **relatively prime** = $\gcd = 1$.
- **Lemma 2.13**: $k = jq + r \Rightarrow \gcd(j,k) = \gcd(r,j)$ → **Euclidean algorithm**: repeat $k = jq + r$; gcd is last nonzero remainder. Trace: $102 = 70(1)+32$, $70 = 32(2)+6$, $32 = 6(5)+2$, $6 = 2(3)+0$ → gcd 2.
- **Extended Euclid (2.14)**: finds $x, y$ with $jx + ky = \gcd(j,k)$. Recursion: from $\gcd = rx' + jy'$ and $r = k - jq$: $x = y' - qx'$, $y = x'$. **Exam format**: table down (record $k, j, q, r$), back-substitute up starting from $(x,y) = (1,0)$. Trace $k=24, j=14$: gcd 2, $24(3) + 14(-5) = 2$.
- **Bezout (2.15)**: $\gcd(j,k) = 1 \iff \exists x,y: jx + ky = 1$.
- **Inverses**: $a^{-1}$ exists in $Z_n$ **iff $\gcd(a,n) = 1$** (Cor 2.16); for prime $p$ every nonzero element invertible (2.17). Compute: extended Euclid gives $ax + ny = 1$, then $a^{-1} = x \bmod n$ (2.18). Worked: $27^{-1}$ in $Z_{58}$: $27(-15) + 58(7) = 1$ → $-15 \bmod 58 = 43$.
- **Solving $ax \equiv b \pmod n$**: if $\gcd(a,n) = 1$: $x = a^{-1}b \bmod n$, unique (Lemma 2.5). If not coprime: divide the whole congruence (including modulus) by the common factor first - e.g. $28x \equiv 32 \pmod{46}$ → $14x \equiv 16 \pmod{23}$, $14^{-1} = 5$, $x \equiv 11 \pmod{23}$ (S2025 exam question).

# 6. Fermat, RSA, CRT

- **Permutation lemma (2.20)**: $p$ prime, $a \ne 0$ → $x \mapsto x \cdot_p a$ permutes $\{1..p-1\}$.
- **Fermat's Little Theorem (2.21)**: $p$ prime, $p \nmid a$: $a^{p-1} \bmod p = 1$. Proof: multiply the permuted list, cancel.
- **Exponent reduction**: $a^m \bmod p = a^{m \bmod (p-1)} \bmod p$. **Exam staple - tower computations**: $47^{37^{27}} \bmod 11$: $47 \equiv 3$; reduce exponent mod 10: $37^{27} \equiv 7^{27} \equiv 3 \pmod{10}$; answer $3^3 = 27 \equiv 5$. Also used to prove compositeness: $2^{62} \equiv 4 \not\equiv 1 \pmod{63}$ → 63 not prime.
- **RSA key generation**: primes $p, q$; $n = pq$; $T = (p-1)(q-1)$; choose $e$ with $\gcd(e, T) = 1$; $d = e^{-1} \bmod T$ via extended Euclid. Public $(e, n)$, secret $d$.
- **Encrypt** $y = x^e \bmod n$; **decrypt** $x = y^d \bmod n$.
- **Correctness proof (2.23)** - reproduce on exam: $ed = 1 + kT$. Step 1: $x^{ed} \equiv x \pmod p$ (case $p \mid x$: both 0; else Fermat on $(x^{k(q-1)})^{p-1}$). Step 2: same mod $q$. Step 3: $p, q$ both divide $x^{ed} - x$ and are distinct primes → $pq \mid x^{ed} - x$ → $x^{ed} \bmod n = x$.
- Worked numbers: $p=5, q=11, n=55, T=40, e=7, d=23$; $12 \to 23 \to 12$. Exam variants: $p=7,q=11,T=60,e=7$: $1 = 2 \cdot 60 - 17 \cdot 7$ → $d = 43$; $p=23,q=37, e=17$: $d = 233$.
- **Fast exponentiation (repeated squaring)**: write $e$ in binary; square repeatedly to get $I_i = a^{2^i} \bmod n$; multiply the $I_i$ for the 1-bits. $\le 2\log_2 e$ multiplications. Worked: $3^7 \bmod 77$: $3^2 = 9$, $3^4 = 81 \equiv 4$; $3^7 = 3 \cdot 9 \cdot 4 = 108 \equiv 31$.
- **CRT (2.24)**: $\gcd(m,n) = 1$ → system $x \equiv a \pmod m$, $x \equiv b \pmod n$ has exactly one solution in $[0, mn)$. Construction: find $\bar n$ with $n\bar n \equiv 1 \pmod m$ and $\bar m$ with $m\bar m \equiv 1 \pmod n$; $x = (a\bar n n + b\bar m m) \bmod mn$. Worked: $x \equiv 3 (6), 7 (11)$: $x = 51$.
	- **Exam variants**: 3+ congruences ($M_i = M/m_i$, $x = \sum a_i M_i y_i$); redundant congruence (drop mod 2 if mod 4 present); coefficients on x (multiply by inverse first). Answer-only scores 0 - show steps.

# 7. Induction

## Smallest counterexample (precursor)

Assume a counterexample exists; well-ordering gives a smallest one $m$; base value works so $m > b$; use truth below $m$ to prove $p(m)$ - contradiction.

## Weak induction (Principle 4.1)

$p(b)$ true and $\forall n > b: p(n-1) \Rightarrow p(n)$ → $p(n)$ for all $n \ge b$.

**Template (write all parts):** 1. Define $p(n)$. 2. Base case $p(b)$ by computation. 3. Inductive hypothesis (at $n-1$). 4. Inductive step deriving $p(n)$. 5. Inductive conclusion.

Worked examples:
- $\sum_{i=0}^n i = \frac{n(n+1)}{2}$: add $n$ to the IH.
- $1 + 3 + \cdots + (2k-1) = k^2$: add $2n-1$.
- $2^{n+1} \ge n^2 + 2$ (base 0): multiply IH by 2, split $2(n-1)^2 + 4 = (n^2+2) + (n-2)^2$. **Inequality trick**: double the IH, rewrite as target + perfect square.
- **Find the base first**: $2^n > n^2$ is true at $n=1$, FALSE at $n = 2,3,4$, true from $n = 5$. Test small cases; the step also needed $n > 5$ inside the algebra ($-4n > -n \cdot n$ since $4 < n$).

## Strong induction (Principle 4.2)

Hypothesis: $p(k)$ for ALL $b \le k < n$. Needed when the reduction jumps back unpredictably. Worked: every positive integer is a product of prime powers ($n = ab$ with $a, b < n$, apply IH to both). Weak and strong are equivalent in power; well-ordering ≡ induction.

## Common mistakes checklist

Missing/wrong base; using $p(n-1)$ when $n-1 < b$; assuming what's to be proven; never defining $p(n)$; reaching back further than the hypothesis allows; no conclusion sentence.

## Advanced induction (Big-O proofs of recurrences)

Goal shape: $\exists n_0, k: \forall n > n_0, T(n) \le k f(n)$; work on powers of the divisor.
- **Discovery style**: run the step with symbolic $k$, collect constraints, set $k = \max\{\dots\}$ at the end.
- $T(n) \le 2T(n/2) + cn \Rightarrow O(n\log n)$: base must start at $n = 2$ ($kn\log n = 0$ at 1!); constraints $k \ge T(2)/2$, $k \ge c$; step: $2k(n/2)\log(n/2) + cn = kn\log n - kn + cn \le kn\log n$.
- $T(n) \le T(n/3) + cn \Rightarrow O(n)$: constraints $k \ge T(1)$, $k \ge 3c/2$.
- **Stronger hypothesis trick**: $T(n) \le 4T(n/2) + cn \Rightarrow O(n^2)$: the natural claim $T(n) \le kn^2$ FAILS (step leaves $kn^2 + cn$, and $cn \le 0$ is impossible). Fix: prove $T(n) \le k_1 n^2 - k_2 n$; step leaves $(c - k_2)n$, choose $k_2 = c$, then $k_1 = T(1) + c$ for the base. **If the step ends with target + positive leftover, subtract a lower-order term from the claim and retry.**

# 8. Recurrences

## First-order linear

- Recurrence + initial condition specifies the function. Derive from problems: Hanoi $M(n) = 2M(n-1)+1$, $M(1)=1$ → $2^n - 1$; subsets $S(n) = 2S(n-1)$, $S(0)=1$ → $2^n$; loan $T(n) = (1 + \frac{0.01p}{12})T(n-1) - M$.
- **Theorem 4.1**: $T(n) = rT(n-1) + a$, $T(0) = b$, $r \ne 1$:
$$T(n) = r^n b + a\,\frac{1 - r^n}{1 - r}$$
Worked: $T(n) = 3T(n-1) + 2$, $T(0) = 5$ → $6 \cdot 3^n - 1$.
- **Theorem 4.5** (general g): $T(n) = rT(n-1) + g(n)$, $T(0) = a$:
$$T(n) = r^n a + \sum_{i=1}^n r^{n-i} g(i)$$
Worked: $T(n) = 4T(n-1) + 2^n$, $T(0)=6$ → $7 \cdot 4^n - 2^n$.
- **Theorem 4.6**: $\sum_{i=1}^n i x^i = \frac{n x^{n+2} - (n+1)x^{n+1} + x}{(1-x)^2}$ ($x \ne 1$).
- **Geometric series**: $\sum_{i=0}^{n-1} r^i = \frac{1 - r^n}{1 - r}$; for constant $r \ne 1$ it is $\Theta$(largest term) (Lemma 4.3).

## Divide-and-conquer (method: iterate/expand, then sum)

Assume $n$ a power of 2 (or 3); constants → 1. Iterate to the general term, plug the stopping $i$:

| Recurrence | Solution |
| --- | --- |
| $T(n) = 2T(n/2) + n$ | $nT(1) + n\log_2 n = \Theta(n\log n)$ |
| $T(n) = T(n/2) + 1$ | $1 + \log_2 n = \Theta(\log n)$ |
| $T(n) = T(n/2) + n$ | $\le 2n = \Theta(n)$ |
| $T(n) = 3T(n/3) + n$ | $n + n\log_3 n$ |
| $T(n) = 4T(n/2) + n$ | $2n^2 - n = \Theta(n^2)$ |

- **Lemma 4.7 (three behaviors)** for $T(n) = aT(n/2) + n$: $a < 2$ → $\Theta(n)$ (top dominates); $a = 2$ → $\Theta(n\log n)$ (levels equal); $a > 2$ → $\Theta(n^{\log_2 a})$ (bottom dominates). Key identity: $a^{\log_2 n} = n^{\log_2 a}$.
- **Exam pattern (every final)**: (i) derive the recurrence from a story ("spider with 10 legs, doubles then loses 2": $a_n = 2a_{n-1} - 2$, $a_0 = 10$ → $8 \cdot 2^n + 2$); (ii) solve by EXPANSION showing steps (master theorem often banned); (iii) prove the closed form by induction. Harder variant: $T(n) = \sqrt{n}\,T(\sqrt n) + n$ → $O(n\log\log n)$ (set $k = \log\log n$).

# 9. Counting

## The four rules

- **Sum principle**: mutually disjoint sets: $|\bigcup S_i| = \sum |S_i|$. Partition into easy blocks.
- **Product principle** (v2): lists where position $j$ always has $i_j$ choices regardless of earlier picks: $\prod i_j$.
- **Bijection principle**: same size iff a bijection exists - recount a hard set as an easy one.
- **Division rule**: if each target object is counted exactly $d$ times, divide by $d$.

## Core counts (know cold)

| Object | Order | Repeats | Count |
| --- | --- | --- | --- |
| $k$-list from $t$ symbols (= function $k$-set → $t$-set) | yes | yes | $t^k$ |
| $k$-permutation of $n$-set | yes | no | $n^{\underline{k}} = \frac{n!}{(n-k)!}$ |
| Permutation ($k = n$) | yes | no | $n!$ |
| $k$-subset | no | no | $\binom{n}{k} = \frac{n!}{k!(n-k)!}$ |
| Multiset / stars and bars: $x_1 + \cdots + x_n = k$, $x_i \ge 0$ | no | yes | $\binom{n+k-1}{k}$ |

- $\sum_{i=1}^{n-1} i = \frac{n(n-1)}{2} = \binom{n}{2}$ (Gauss pairing trick). Selection sort makes $\binom n2$ comparisons.
- Functions: injective (one-to-one), surjective (onto), bijective. #functions $k$-set → $t$-set $= t^k$.
- Password-style: partition by length then multiply: $\sum_{i=4}^{8} 52^i$.

## Exam counting patterns (every fall midterm + every final)

- **Adjacency constraints**: glue adjacent people into a block (multiply by block-internal orderings); "no two X adjacent": place others first, insert X into gaps. E.g. 6 teachers, 5 students: all teachers adjacent $= 6! \cdot 6!$; no two teachers adjacent $= 5! \cdot 6!$ wait - place 5 students ($5!$), 6 gaps, choose+order teachers: $5! \cdot 6!$.
- **Digit strings**: strictly decreasing 6-digit = $\binom{10}{6}$ (any 6 digits, one order); strictly increasing = $\binom96$ (no 0); non-strict → stars and bars on digit multiplicities.
- **Digit sum**: 6-digit numbers with digit sum 11: first digit ≥ 1, substitute, $\binom{15}{5}$ minus cases with a digit > 9: $2992$.
- **Lattice paths**: paths $(0,0) \to (m,n)$ = $\binom{m+n}{m}$; through a point = product; avoiding = subtract.
- Leave answers in $\binom{n}{k}$/factorial form.

# 10. Binomial Coefficients

- $\binom{n}{0} = \binom{n}{n} = 1$ (with $0! = 1$); **symmetry** $\binom nk = \binom{n}{n-k}$ (complement bijection).
- **Pascal's identity (1.3)**: $\binom nk = \binom{n-1}{k-1} + \binom{n-1}{k}$. Combinatorial proof: partition $k$-subsets by containing $x_n$ or not. Builds Pascal's triangle.
- **Row sum**: $\sum_{i=0}^n \binom ni = 2^n$. Proofs: subsets ↔ 0/1 incidence vectors (bijection), or $x = y = 1$ in binomial theorem.
- **Binomial theorem (1.4)**: $(x+y)^n = \sum_{i=0}^n \binom ni x^{n-i} y^i$. Proof: coefficient of $x^{n-k}y^k$ counts which $k$ factors contribute $y$.
- **Trinomial/multinomial**: #labelings with $k_1 + k_2 + k_3 = n$ labels $= \frac{n!}{k_1!k_2!k_3!}$; that's the coefficient of $x^{k_1}y^{k_2}z^{k_3}$ in $(x+y+z)^n$.
- **Combinatorial proof technique (exam staple)**: show both sides count the same set, two ways. Examples from exams:
	- $\binom nk - \binom{n-3}{k} = \binom{n-1}{k-1} + \binom{n-2}{k-1} + \binom{n-3}{k-1}$: k-subsets containing at least one of a,b,c; partition by first of a,b,c contained.
	- $\binom nk P(k,r) = \binom{n-r}{k-r} P(n,r)$: committee of k with r ordered officers, chosen in two orders.
	- Hockey stick: $\sum_{i=r}^{n} \binom ir = \binom{n+1}{r+1}$ (classify by largest element).

# 11. Inclusion-Exclusion

- 2 sets: $|E \cup F| = |E| + |F| - |E \cap F|$. 3 sets: singles − pairs + triple.
- **General (Thm 5.3)**: $P(\bigcup E_i) = \sum_{k=1}^n (-1)^{k+1} \sum_{i_1 < \cdots < i_k} P(E_{i_1} \cap \cdots \cap E_{i_k})$. Same for counting with $|\cdot|$. Proof by induction: split off $E_n$, use 2-set case + distributive law.
- **Symmetric shortcut**: if all $k$-fold intersections equal $v_k$: $\sum_k (-1)^{k+1}\binom nk v_k$.
- **Derangements** (backpacks): $P(E_{i_1} \cap \cdots \cap E_{i_k}) = \frac{(n-k)!}{n!}$; $P(\text{at least one fixed point}) = \sum_{k=1}^n \frac{(-1)^{k+1}}{k!}$; $P(\text{no fixed point}) = \sum_{i=0}^n \frac{(-1)^i}{i!} \to e^{-1} \approx 0.3679$.
- **Surjections (Thm 5.4)**: #onto functions $n$-set → $m$-set $= \sum_{k=0}^m (-1)^k \binom mk (m-k)^n$.
- **Exam patterns**: "each of digits 1,2,3 appears at least once in a 6-digit number": $9 \cdot 10^5 - 3(8 \cdot 9^5) + 3(7 \cdot 8^5) - 6 \cdot 7^5$. "No 2x2 all-red square in a random 3x3 coloring": PIE over the 4 possible 2x2 squares → $417/512$. When the question says "must use inclusion-exclusion", set up $A_i$ = bad events explicitly.

# 12. Pigeonhole Principle

- $m$ pigeons, $n < m$ holes → some hole has ≥ 2. General: some hole has $\ge \lceil m/n \rceil$. Proof by induction on $|B|$ (no injection when $|A| > |B|$).
- Exam patterns: partition a structure into boxes, force collision. 8x8 grid, 17 red cells → 16 2x2 blocks, two reds share a block hence a corner. Socks (100R/80G/60B/40K), guarantee 10 pairs: answer 23 (at most one unpaired per color, parity argument), and show 22 fails. Always argue BOTH: $n$ suffices AND $n-1$ doesn't.

# 13. Probability

- **Sample space** S (can be infinite: coin until first H); **event** = subset; **weights** $P(x) \ge 0$ summing to 1; $P(E) = \sum_{x \in E} P(x)$.
- **Axioms**: $P(A) \ge 0$; $P(S) = 1$; additivity for disjoint events.
- **Complement (Thm 5.1)**: $P(E) = 1 - P(\bar E)$. "At least one" → compute "none" first.
- **Uniform (Thm 5.2)**: $P(E) = |E|/|S|$ - ONLY for equiprobable outcomes. Non-uniform: sum weights (counterexample: #heads in 3 flips has weights $\frac18, \frac38, \frac38, \frac18$; derive aggregate weights from the underlying uniform space).
- **Hashing/birthday**: $n$ keys, $m$ slots, uniform over $m^n$ tuples. $P(\text{no collision}) = \frac{m^{\underline{n}}}{m^n}$; collisions likely by $n \approx \sqrt m$.

## Conditional probability and independence

- $P(E \mid F) = \frac{P(E \cap F)}{P(F)}$ (rescales surviving outcomes by $1/P(F)$, preserving ratios).
- **Law of total probability**: $P(R) = P(R \mid K)P(K) + P(R \mid \bar K)P(\bar K)$. (Student knows 80%, guesses rest: score $= 1(.8) + .5(.2) = .9$.)
- **Bayes (exam staple, every final)**: $P(A \mid B) = \frac{P(B \mid A)P(A)}{\sum_i P(B \mid A_i)P(A_i)}$. Worked: truth-teller (prob 3/4) says die landed 6: $P = \frac{(3/4)(1/6)}{(3/4)(1/6) + (1/4)(5/6)} = \frac38$. Marble boxes: $P(A \mid white) = \frac{(1/2)(6/8)}{(1/2)(6/8) + (1/2)(2/6)} = \frac{9}{13}$.
- **Independence**: $E \perp F$ iff $P(E \mid F) = P(E)$ iff $P(E \cap F) = P(E)P(F)$ (Thm 5.5); symmetric. Verify, never assume (same key to two positions is NOT independent).
- **Independent trials process**: stage outcomes independent of history; sequence probability = product of stage probabilities (Thm 5.7). Cards WITH replacement yes, WITHOUT no ($\frac{4 \cdot 3}{52 \cdot 51}$ vs $\frac{4^2}{52^2}$ for two aces).
- At least one H in n flips: $1 - \frac{1}{2^n}$.

# 14. Random Variables, Expectation, Variance

- **RV** = function from sample space to numbers. **Bernoulli**: success prob $p$. **Binomial (Thm 5.8)**: $P(X = k) = \binom nk p^k (1-p)^{n-k}$; sums to 1 by binomial theorem.
- **Expectation**: $E(X) = \sum_i x_i P(X = x_i) = \sum_{s \in S} X(s)P(s)$ (Lemma 5.9). Die: 7/2; two dice sum: 7.
- **Linearity (5.10, 5.11)**: $E(X + Y) = E(X) + E(Y)$ ALWAYS (no independence needed); $E(cX) = cE(X)$. $E(XY) = E(X)E(Y)$ only if independent.
- **Indicators**: $E(X_i) = P(\text{event})$. Sums of indicators + linearity is THE technique:
	- Binomial mean: $E = np$ (Thm 5.12).
	- Derangements: $E(\#\text{fixed points}) = n \cdot \frac1n = 1$, for any n, despite dependence.
	- Exam: adjacent boy-girl pairs in a random row of 5 B, 9 G: 13 positions × $P(BG \text{ or } GB) = \frac{45}{91}$ → $E = \frac{45}{7}$. Hash table: expected empty slots $= n(1 - 1/n)^k$; exactly one $= k(1-1/n)^{k-1}$.
- **Geometric (Thm 5.13)**: $P(F^{i-1}S) = (1-p)^{i-1}p$; expected trials to first success $= \frac1p$. (First head: 2 flips; first sum-7: 6 rolls.)
- **Variance**: $V(X) = E((X - E(X))^2)$. ($E(X - E(X)) = 0$ always, hence the square.)
	- One coin flip: $\frac14$; one 0.8-question: $p(1-p) = .16$.
	- **RV independence**: $P(X=x \wedge Y=y) = P(X=x)P(Y=y)$ for all x, y. Then $E(XY) = E(X)E(Y)$ (Lemma 5.28) and $V(X+Y) = V(X) + V(Y)$ (Thm 5.29; cross term vanishes). NOT additive in general (two coins drawn without replacement: $V = 0 \ne 4+4$).
	- **Binomial variance**: $V = np(1-p)$. Also $V(aX) = a^2 V(X)$.
- **Standard deviation** $\sigma = \sqrt{V}$. **CLT**: sums of iid RVs ≈ normal; 68% within $1\sigma$, 95.5% within $2\sigma$, 99.7% within $3\sigma$. Worked: to be 95% sure heads in n flips is within 1% of n/2: $2\sigma = .01 \cdot \frac n2$ with $\sigma = \frac{\sqrt n}{2}$ → $n = 40{,}000$.

# 15. Graphs

- $G = (V, E)$, $n = |V|$, $m = |E|$. Adjacent, incident, loop, multi-edge, **simple graph**, complete graph $K_n$.
- **Path**: no repeated vertices; length = #edges; **distance** = shortest path length. **Walk**: repeats allowed; **cycle** = closed walk, no repeats. **Lemma 6.1**: walk between x, y → path (cut out the loops).
- **Degree**: loop counts twice. **Handshake lemma (6.2)**: $\sum_v \deg(v) = 2m$ (induction on m). Consequences: degree sum even; #odd-degree vertices even; catches impossible degree sequences.
- **Connectivity**: equivalence relation → **connected components**. Adding an edge merges 2 components or changes nothing.
- **Trees** = connected + acyclic:
	- **Thm 6.3**: exactly one path between any pair (two paths → cycle).
	- **Lemma 6.4**: deleting an edge gives exactly 2 components, both trees.
	- **Thm 6.5**: n vertices → $n-1$ edges (induction via 6.4).
	- **Cor 6.6**: any tree with $> 1$ vertex has a leaf (else $\sum\deg \ge 2n$ → $m \ge n$).
	- Minimum edges to connect n vertices: $n - 1$.
- Subgraph vs **induced** subgraph (must keep ALL edges among chosen vertices); $C_n$, $P_n$.
- **Exam extras seen on finals** (beyond this deck - review separately): bipartite ⟺ no odd cycle; Euler circuit ⟺ connected + all degrees even; Chinese postman (duplicate cheapest path between the two odd vertices); self-complementary graphs ($2S = n(n-1)$, so $n \equiv 0, 1 \pmod 4$); a simple graph with $n$ vertices and $\ge n$ edges contains a cycle.

# 16. Countability (appears on most exams as rapid-fire)

- Countable = finite or bijective with $\mathcal{N}$. $\mathcal{N} \times \mathcal{N}$ countable (anti-diagonal enumeration; explicit bijection $f(a,b) = \frac{(1+a+b)(a+b)}{2} + a$; or countable union of countable sets).
- Countable: integers, rationals, finite products/unions of countables, polynomials with INTEGER coefficients (any fixed degree or all), finite subsets of $\mathcal{N}$, $\Sigma^*$.
- Uncountable: reals, any interval, power set of $\mathcal N$, functions $\mathcal N \to \{0,1\}$, polynomials with REAL coefficients (even degree ≤ 5).
- Finite: roots of one polynomial.

---

# Exam playbook (from F/S 2023-2025 papers)

## Midterm bankers

1. **Inference derivation** (every midterm): premises → conclusion, name each rule.
2. **Equivalence/tautology without truth tables** (every midterm): use implication law + DeMorgan + distributivity; disprove with one assignment (try making implications false: p=F often does it).
3. **Translate English → predicate logic with restricted symbols** (every midterm), e.g. $\forall x \exists a \exists b\,(4x = a^2 - b^2)$; then negate with no $\neg$ (use $\ne$, $\nmid$).
4. **Quantifier negation** (most): flip quantifiers, DeMorgan inside.
5. **Countability classification** (most): rapid-fire, no justification.
6. Fall: counting battery, combinatorial proof, PIE, pigeonhole. Spring: Fermat towers, extended Euclid inverse, CRT/RSA numbers, contradiction proofs, structural induction.

## Final bankers

1. **Bayes word problem** (4/4 finals).
2. **Recurrence: derive → expand → induction-verify** (4/4; master theorem may be banned).
3. **Constrained counting** (4/4): blocks, gaps, stars and bars, lattice paths.
4. **Indicators + linearity** (3/4): adjacent pairs, hash slots.
5. **CRT with a twist** (3/4): redundant congruence, coefficient to invert.
6. **Fermat** (3/4): towers, compositeness, or prove FLT via $p \mid \binom pk$ + induction (the in-class proof may score 0 if a specific method is demanded!).
7. **RSA 3-parter** (fall finals): valid e's, d via extended Euclid, encrypt via repeated squaring.
8. **Big-O pair classification** (3/4): 1 pt each; substitute variables, compare exponents. Remember $3^{\log_2 n^2} = n^{2\log_2 3} \approx n^{3.17}$; $\log(n!) = \Theta(n\log n)$.
9. **Graphs** (3/4): T/F + degree sequence + postman/Euler.

## Ground rules for full credit

- Show steps on extended Euclid and CRT (answer alone = 0). Respect forced methods. Leave counting answers symbolic. State universes, define $p(n)$, write all induction parts. One counterexample kills an equivalence; one witness proves $\exists$.

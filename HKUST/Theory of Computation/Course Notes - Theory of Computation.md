# COMP 3721 Course Notes (up to date)

Covers lectures 00-08 (intro through the pumping theorem), tutorials 1-2 with full solutions, HW1 and Quiz 2. For logistics see [[Course Overview - Theory of Computation]].

---

# Lecture 0: Introduction

- **Theory of computation** = mathematical study of computing machines, their capabilities and limitations. Two halves:
	- **Computability**: what can be computed at all (in principle)?
	- **Complexity**: what can be computed efficiently (in practice)? Answered via NP-completeness.

## The Halting Problem (motivation)

- Can a program take **any** program as input and output Yes if it terminates, No otherwise? **No, not solvable.**
- To prove a problem solvable: give an algorithm. To prove it **unsolvable by any computer**: hard, you need a **mathematical model** of "program" and of "problem".

## Decision problems as language recognition

- **Decision problem**: output Yes/No.
- Example: "is n even?" → $L = \{0, 2, 4, ...\}$, each number a **string** over alphabet $\Sigma = \{0..9\}$. A set of words over $\Sigma$ is a **(formal) language**; $\Sigma^*$ = all words over $\Sigma$. Deciding "$w \in L$?" is a **language recognition problem**. Any decision problem transforms this way.
- Halting Problem = recognizing $H$ = the language of all program source strings that terminate. $H$ is the "hardest" language; the course starts with the simplest (**regular**), then **context-free**.

## Models

- **Finite automata** recognize regular languages; **pushdown automata** recognize context-free languages; **Turing machines** model all programs (**Church-Turing Thesis**).
- TMs cannot recognize $H$ → the halting problem is **undecidable**.
- Other problems shown undecidable by **reduction**: proved $H$ unsolvable; show "if A solvable then H solvable"; conclude A unsolvable.
	- Example: do two programs compute the same function? Undecidable.
	- Example: **Post Correspondence Problem** (dominos with top/bottom strings; find a sequence where concatenated tops = concatenated bottoms). Undecidable via reduction from H.

## Complexity preview

- **0-1 Integer Programming**: given inequalities $\sum_j a_{ij}x_j \ge b_i$, is there a 0/1 assignment satisfying all? Brute force $O(2^n)$. Polynomial-time algorithm believed not to exist.
- **NP-completeness**: thousands of practical problems; if any one NPC problem has a poly-time algorithm, all do. Use: prove your problem NP-complete instead of searching for a fast algorithm.
- Class hierarchy: Regular ⊂ CFL ⊂ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME ⊂ decidable ⊂ recognizable. Big open problem: **P = NP?**
- Assumption: one sequential deterministic computation at a time (parallel/distributed are equivalent to deterministic TMs).

---

# Lecture 1: Sets, Relations, Functions (review)

## Sets

- Repetitions and order ignored. $\{a\} \ne a$. $\emptyset$ = empty set. Finite/infinite.
- $A \subseteq B$: every element of A in B. $A = B$ iff $A \subseteq B$ and $B \subseteq A$. Proper subset $A \subset B$: $A \subseteq B, A \ne B$ ($\emptyset$ is a proper subset of any non-empty set).
- Operations: $A \cap B$, $A \cup B$, $A - B$; disjoint if $A \cap B = \emptyset$.
- **Power set** $2^A$ = set of all subsets; $2^{\{c,d\}} = \{\emptyset, \{c\}, \{d\}, \{c,d\}\}$.
- **Partition** of A: non-empty subsets, mutually disjoint, union = A.
- **Cartesian product** $A \times B$ = all **ordered** pairs; $A \times A = A^2$.

## Relations

- **Binary relation** on A, B = any subset of $A \times B$. A relation $R \subseteq A \times A$ can be drawn as a directed graph (arrow $a \to b$ iff $(a,b) \in R$).
- **Reflexive** ($\forall a: (a,a) \in R$), **symmetric**, **transitive**. All three = **equivalence relation**; its clusters are **equivalence classes**.
	- Example: "shares a family name" is an equivalence relation; "a shaves b" is none of the three.

## Functions

- $f: A \to B$ is a binary relation with **exactly one** pair per first component. Domain A, codomain B; $f(a)$ = image.
- **Injective (one-to-one)**: $a \ne a' \Rightarrow f(a) \ne f(a')$. **Surjective (onto)**: $\forall b \exists a: f(a) = b$. **Bijection** = both (one-to-one correspondence).

---

# Lecture 2: Languages and Regular Expressions

## Words

- **Alphabet** $\Sigma$: finite set of symbols. **Word**: finite sequence of symbols. $|w|$ = length. **Empty word** $e$, $|e| = 0$, $e \notin \Sigma$.
- **Concatenation** $wu$: $ew = we = w$, associative. **Reversal**: $e^R = e$; $(au)^R = u^R a$. **Power**: $w^0 = e$, $w^{i+1} = w^i w$.
- **Theorem** $(uw)^R = w^R u^R$, proved by induction on $|u|$ (basis $u = e$; step: $u = av$, $(uw)^R = (a(vw))^R = (vw)^R a = w^R v^R a = w^R u^R$). Model proof for the course.

## Languages

- A language = any $L \subseteq \Sigma^*$. **$\emptyset \ne \{e\}$** (no words vs one empty word).
- Operations: $L_1 L_2 = \{xy : x \in L_1, y \in L_2\}$; $L^R$; $L^0 = \{e\}$, $L^{n+1} = L^n L$; **Kleene star** $L^* = L^0 \cup L^1 \cup L^2 \cup \cdots$ ($e \in L^*$ always); $L^+ = LL^*$.
- Worked: $L_1 = \{a, ab\}, L_2 = \{e, ba\}$: $L_1L_2 = \{a, ab, aba, abba\}$, $L_1^2 = \{aa, aab, aba, abab\}$, $L_2^2 = \{e, ba, baba\}$.
- Edge cases to memorize: $\{e\}^{1000} = \{e\}$; $L\emptyset = \emptyset$; $\emptyset^* = \{e\}$; $e \in L^+$ iff $e \in L$; $L^n \subseteq L^{n+1}$ NOT in general (only if $e \in L$); $L^n \subseteq L^*$ always.

## Regular expressions

- Inductive definition (a R.E. is a string over $\Sigma \cup \{(, ), \emptyset, \cup, {}^*\}$):
	1. $\emptyset$ and each $\sigma \in \Sigma$ are R.E.s
	2. If $\alpha, \beta$ R.E.s, so are $(\alpha\beta)$, $(\alpha \cup \beta)$, $\alpha^*$
	3. Nothing else.
- Note: $e$ is NOT part of R.E. syntax; use $\emptyset^*$ for $\{e\}$.
- Language function: $L(\emptyset) = \emptyset$, $L(a) = \{a\}$, $L(\alpha\beta) = L(\alpha)L(\beta)$, $L(\alpha \cup \beta) = L(\alpha) \cup L(\beta)$, $L(\alpha^*) = L(\alpha)^*$.
- Precedence: $*$ tightest, then concatenation, then $\cup$ (like times and plus).
- Worked: $L[(a \cup b)^* a] = \{w : w \text{ ends with } a\}$.
- **Theorem**: $L[c^*(a \cup bc^*)^*] = \{w \in \{a,b,c\}^* : w \text{ has no substring } ac\}$. Proof needs BOTH inclusions: ⊆ by structure (after an $a$ only $a$ or $b$ can follow); ⊇ by segmentation ($w = $ c-prefix, then segments each "one a" or "one b plus c's").
- Construction examples over $\{0,1\}$:
	- even number of 0's: $1^*(01^*01^*)^*$
	- at least two 0's: $1^*01^*0(0 \cup 1)^*$
	- even length: $((0\cup1)(0\cup1))^*$
	- any finite language is regular (union its words).
- **Regular language** = $L(\alpha)$ for some R.E. $\alpha$. Closure: $AB$, $A \cup B$, $A^*$, $A^R$ regular directly via R.E.s; complement and intersection also closed but need DFAs.
- **Generator** (R.E. generates words) vs **recognizer** (algorithm tests membership; a scan with a "did I just see a?" flag = 2-state memory, foreshadowing DFAs).

---

# Lecture 3: Countability

- **Cardinality** $|A|$. **Pigeonhole principle** (finite sets only): $|A| > |B|$ → no injective $A \to B$.
- **Equinumerous**: bijection exists. **Countably infinite**: equinumerous with $\mathcal{N}$. **Countable** = finite or countably infinite; else **uncountable**.
- **Fact**: A countably infinite iff its elements can be enumerated $a_0, a_1, a_2, \dots$ (every element at a finite position).

## Closure of countability

| Operation | Result |
| --- | --- |
| $A \cup B$, finite unions | countable (interleave) |
| countable union of countable sets | countable (anti-diagonal/dovetail walk of the grid) |
| $A \times B$, finite products | countable (zigzag) |
| infinite product $A_1 \times A_2 \times \cdots$ | **uncountable** (encodes decimal expansions of reals) |
| $2^{\mathcal{N}}$, $2^{\Sigma^*}$ | **uncountable** |
| finite subsets of $\mathcal{N}$; finite languages; $\Sigma^*$ | countable |
| reals in $[0,1]$ | **uncountable** |

## Diagonalization principle (Cantor 1873)

- For $R \subseteq A \times A$: row sets $R_a = \{b : (a,b) \in R\}$; diagonal set $D = \{a : (a,a) \notin R\}$. Then $D \ne R_a$ for every $a$ (D differs from $R_a$ at position a; proof by contradiction on $k \in R_k$ vs $k \notin R_k$).
- Same idea underlies: Barber's paradox, Russell's paradox ($R = \{S : S \notin S\}$), Liar paradox, Gödel incompleteness. Theme: **self-reference**.
- **$2^{\mathcal{N}}$ uncountable**: assume enumeration $A_0, A_1, \dots$; define $(i,j) \in R \iff j \in A_i$ so $R_i = A_i$; $D = \{i : i \notin A_i\} \subseteq \mathcal{N}$ differs from every $A_i$; contradiction.
- **$[0,1]$ uncountable**: list $x_i = 0.d_{i0}d_{i1}\dots$; build $x$ with $i$-th digit $\bar d_i = 0$ if $d_{ii} \ne 0$ else $1$; $x$ differs from every $x_i$.

## First major theorem

- Any finite representation of a language is a finite string over some finite alphabet $\Sigma_1$, so there are at most countably many representations ($\Sigma_1^*$ countable). But there are uncountably many languages ($2^{\Sigma^*}$).
- **Therefore some languages have no finite representation** in ANY representation system → there exist non-regular languages, and unsolvable problems, for every computation model. (Existence only; a specific one comes later.)

---

# Lecture 4: Deterministic Finite Automata

- Simplest machine model: finite states only. Real examples: vending machines, lifts, traffic lights.
- Physical picture: input tape + finite control + one-way read head. Start leftmost in initial state; each symbol read moves head right and updates state deterministically; accept iff in a final state after reading everything.

## Formal definition

$M = (K, \Sigma, \delta, s, F)$: finite states $K$, alphabet $\Sigma$, initial $s \in K$, finals $F \subseteq K$, **transition function** $\delta: K \times \Sigma \to K$ (total, exactly one next state = deterministic).

- **State diagram**: nodes = states, $>$ marks initial, double circle = final, arrow $q \to q'$ labeled $\sigma$ iff $\delta(q, \sigma) = q'$.
- **Configuration** $(q, w)$ = current state + unread input. **Yields**: $(q, \sigma w') \vdash_M (q', w')$ if $\delta(q, \sigma) = q'$; $\vdash_M^*$ = reflexive transitive closure.
- **Acceptance**: $w$ accepted iff $(s, w) \vdash_M^* (q, e)$ with $q \in F$. $L(M) = \{w : w \text{ accepted}\}$.
- Worked trace (2-state machine, b flips state, a keeps it; $L(M)$ = even number of b's): $(q_0, aabba) \vdash (q_0, abba) \vdash (q_0, bba) \vdash (q_1, ba) \vdash (q_0, a) \vdash (q_0, e)$, accept.

## Design patterns

- **Parity / mod-k counting**: state = remainder. Even length: 2 states toggling on every symbol. Divisible by 3 (decimal): 3 states for digit-sum mod 3; digits 0,3,6,9 self-loop, 1,4,7 advance +1, 2,5,8 advance +2; add a fresh initial state + **sink (dead/trap) state** to reject leading zeros.
- **Substring matching (Ctrl-F)**: one state per prefix of the pattern ($e, 1, 10, 101, 1011, 10110$); forward edges spell the pattern; failure edges fall back to the longest prefix still matching; final state self-loops forever.

## Closure via DFAs

- **Complement**: swap finals, $M' = (K, \Sigma, \delta, s, K - F)$ accepts $\overline{L}$. Works because determinism gives exactly one run per string. (Fails for NFAs.)
- **Intersection (product construction)**: $M = (K_1 \times K_2, \Sigma, \delta, (s_1, s_2), F_1 \times F_2)$, $\delta((p,q), \sigma) = (\delta_1(p, \sigma), \delta_2(q, \sigma))$ - run both machines in parallel.
- **Union**: same product with $F = (F_1 \times K_2) \cup (K_1 \times F_2)$, or De Morgan: $L_1 \cup L_2 = \overline{\overline{L_1} \cap \overline{L_2}}$.
- Worked product: even-a's x even-b's machines → 4 states $(p_i, q_j)$; a-edges toggle one coordinate, b-edges the other.
- **Concatenation/star stuck**: a DFA cannot know where to split $w = uv$ ($u \in L_1$, $v \in L_2$) - motivates NFAs (guessing).

---

# Lecture 5: Nondeterministic Finite Automata

- Example $L = (ab \cup aba)^*$: DFA needs 5 states incl. a trap; NFAs need only 3.
- NFA features: multiple edges with the same symbol from one state; **e-transitions** (move without reading); missing edges (branch gets **stuck**). Computation is a **tree**, not a path.
- NFAs are not realistic machines; they are an easy-to-design specification. Every NFA converts to an equivalent DFA (next lecture) - nondeterminism adds no power.

## Formal definition

$M = (K, \Sigma, \Delta, s, F)$ with **transition relation** $\Delta \subseteq K \times (\Sigma \cup \{e\}) \times K$. Only difference from DFA: $\Delta$ vs $\delta$. Every DFA is an NFA.

- Yields: $(q, w) \vdash_M (q', w')$ iff $\exists u \in \Sigma \cup \{e\}$: $w = uw'$ and $(q, u, q') \in \Delta$.
- **Accepted iff at least ONE computation path ends in a final state** with input exhausted; rejected only if ALL paths fail (or get stuck).
- Worked ($M_1$ with $\Delta = \{(q_0,a,q_1),(q_1,b,q_0),(q_1,b,q_2),(q_2,a,q_0)\}$, $F = \{q_0\}$): on $aba$, path via $q_1 \to q_0 \to q_1$ fails but path via $q_2 \to q_0$ accepts → $aba \in L(M_1)$.
- **Reversal closure**: reverse every edge, swap start/final roles. If several finals: add a new start state with e-edges into the old finals; old start becomes the unique final.

---

# Lecture 6: DFA = NFA = Regular Expression (Fundamental Theorem)

**Theorem.** For $L \subseteq \Sigma^*$, equivalent: (1) some DFA accepts L, (2) some NFA accepts L, (3) some R.E. represents L. Proof cycle: RE → NFA → DFA → RE, plus DFA → NFA trivial.

Consequences: to show a DFA can recognize a language, give a regex; to show no DFA exists, show no regex exists.

## RE → NFA (structural induction)

- Basis: $\emptyset$ → single non-final state, no transitions; $\sigma$ → two states, one $\sigma$-edge.
- **Union** $\alpha \cup \beta$: new start state, e-edges to $s_1$ and $s_2$; $F = F_1 \cup F_2$.
- **Concatenation** $\alpha\beta$: e-edges from every $f \in F_1$ to $s_2$; start $s_1$; finals $= F_2$ only. Nondeterminism tries all splits; accepted iff one split works.
- **Star** $\alpha^*$: **new start state $s$, also final**, e-edge $s \to s_1$, e-edges $F_1 \to s$.
	- Why a NEW start state: making the old start final fails, e.g. $\alpha = a(ba)^*$ would wrongly accept $ab$.
- Worked bottom-up build of the NFA for $(ab \cup aba)^*$: base machines for a and b → concatenate to ab, aba → union with new start → star with new final start.

## NFA → DFA (subset construction)

- **e-closure** $E(q) = \{p : (q,e) \vdash_M^* (p,e)\}$ (states reachable without reading; $q \in E(q)$).
- DFA $M' = (2^K, \Sigma, \delta', E(s), F')$:
	- $\delta'(Q, \sigma) = \bigcup_{q \in Q} \{E(p) : (q, \sigma, p) \in \Delta\}$ (all $\sigma$-moves from Q, then e-close)
	- $F' = \{Q : Q \cap F \ne \emptyset\}$
	- $\emptyset$ = dead state; many subsets unreachable (build only reachable ones).
- Correctness: induction on $|w|$ via claim $(q,w) \vdash_M^* (p,e) \iff (E(q), w) \vdash_{M'}^* (P, e)$ for some $P \ni p$.

## DFA → RE (the R(i,j,k) method)

- Number states $q_1..q_n$, $s = q_1$. $R(i,j,k)$ = strings driving M from $q_i$ to $q_j$ with no **intermediate** state numbered > k (endpoints exempt).
- $L(M) = \bigcup \{R(1,j,n) : q_j \in F\}$.
- **Recurrence**: $R(i,j,k) = R(i,j,k{-}1) \cup R(i,k,k{-}1)\,R(k,k,k{-}1)^*\,R(k,j,k{-}1)$ (path avoids $q_k$, or visits it: enter, loop, leave).
- Basis $R(i,j,0)$: direct edges only, plus $e$ when $i = j$; finite set → has an R.E. Induction on k: recurrence uses only $\cup$, concatenation, $*$ → every $R(i,j,k)$ has an R.E.
- Worked (triangle DFA: a self-loops everywhere, b-edges $q_1 \to q_2 \to q_3 \to q_1$, $F = \{q_2\}$): expanding top-down gives $R(1,2,3) = a^*ba^* \cup a^*ba^*b(a \cup e \cup ba^*ba^*b)^* ba^*ba^*$, which is the strings with #b's $\equiv 1 \pmod 3$.

---

# Lecture 7: Closure Properties of Regular Languages

**Theorem.** Regular languages are closed under: concatenation, union, Kleene star (via R.E.s or NFAs), **complementation** (DFA, swap finals - must be a DFA), **intersection** (De Morgan: $L_1 \cap L_2 = \overline{\overline{L_1} \cup \overline{L_2}}$).

Three ways to prove a language regular: give an R.E.; give a DFA/NFA; combine known regular languages with closure operations.

Worked example - decimals divisible by 2 or 3 are regular:
1. Valid representations: $L_1 = \{0\} \cup \{1..9\}\Sigma^*$ (regex, no leading zeros).
2. Divisible by 2: $L_2 = L_1 \cap \Sigma^*\{0,2,4,6,8\}$ (intersection of regulars).
3. Divisible by 3: $L_3 = L_1 \cap L_4$ where $L_4$ = digit-sum mod 3 machine (3-state DFA).
4. $L = L_2 \cup L_3$ regular by closure under union.

Pattern: decompose into simple pieces, glue with closure operations instead of building one monolithic automaton.

---

# Lecture 8: Proving Non-Regularity (Pumping Theorem)

- Intuition ($\{0^n1^n\}$ needs unbounded memory) is not a proof, and misleads: equal #0s and #1s is NOT regular, but equal #01 and #10 substrings IS regular.
- **Pigeonhole principle** (proved by induction on $|B|$): $|A| > |B|$ finite → no injection. Corollary: path between two vertices in an n-vertex graph implies a path of length ≤ n.

## Pumping Theorem

Let L be regular. Then $\exists n \ge 1$ such that every $w \in L$ with $|w| \ge n$ can be written $w = xyz$ with:
1. $y \ne e$
2. $|xy| \le n$
3. $xy^i z \in L$ for all $i \ge 0$.

Proof: DFA with n states; first n symbols visit n+1 states → some state repeats (pigeonhole) → the loop between repeats is y; pump or delete it.

**Quantifier structure** (critical for proofs): $\exists n\, \forall w\, \exists x,y,z\, \forall i$. To prove NOT regular, show the negation: **for all n, there exists w, such that for ALL valid splits, there exists i with $xy^iz \notin L$**.

### Proof template

1. Assume L regular; let n be the pumping constant.
2. Choose ONE clever $w \in L$, $|w| \ge n$.
3. For EVERY split $w = xyz$ ($y \ne e$, $|xy| \le n$), exhibit ONE i with $xy^iz \notin L$.
4. Contradiction → L not regular.

### Worked examples

- $\{a^i b^i\}$: pick $w = a^n b^n$. $|xy| \le n$ forces $y = a^k$, $k > 0$. Take $i = 0$: $a^{n-k}b^n \notin L$.
- $\{a^i : i \text{ prime}\}$: pick $w = a^s$, s prime ≥ n; $x = a^p, y = a^q, z = a^r$. Pump to $i = p + 2q + r + 2$: count $= (q+1)(p+2q+r)$, product of two factors > 1, not prime. (Pumping only $p+r$ times fails: $p + r$ may be 0 or 1.)
- Equal #0s = #1s: use **closure instead**: $L \cap L(0^*1^*) = \{0^n1^n\}$; if L were regular the intersection would be, contradiction.

### Limits of the P.T.

- Necessary but **not sufficient**: some non-regular languages satisfy it (a known counterexample exists). So: cannot use P.T. to prove a language IS regular; and not every non-regular language can be killed by the P.T.

---

# Tutorial 1 (solutions): Sets, Languages, R.E.s

- $\emptyset \in \emptyset$ false; $\emptyset \subseteq \emptyset$ true; $\{a,b\} \subseteq \{a,b,\{a,b\}\}$ true; $\{a,b\} \in \{a,b,\{a,b\}\}$ true. ($\in$ = membership, $\subseteq$ = elementwise inclusion.)
- $\{a,b\}^* = \{a\}^*(\{b\}\{a\}^*)^*$: prove both inclusions. ⊇ trivial. ⊆ must case-split: (i) no b → in $\{a\}^*$ (zero star repetitions); (ii) ≥ 1 b → decompose as $a^*ba^*b \cdots a^*$. Forgetting case (i) is the classic mistake.
- Notation hygiene: $\{a,b\}^*$ is a language; $(a \cup b)^*$ is a regular expression; $L((a \cup b)^*) = \{a,b\}^*$. Never write $w \in (a \cup b)^*$.
- $abcd \in L((a(cd)^*b)^*)$? False - every nonempty member ends in b.
- $\{a^nb^n\}\{b^nc^n\} = \{a^nb^{2n}c^n\}$? False - exponents independent; counterexample $abbbcc$.
- R.E. constructions over $\{a,b\}$:
	- ≤ 3 a's: $b^* \cup b^*ab^* \cup b^*ab^*ab^* \cup b^*ab^*ab^*ab^*$, or $b^*(ab^* \cup b^*)^3$.
	- #a's divisible by 3: $b^*(b^*ab^*ab^*ab^*)^*$ - the leading $b^*$ is needed for all-b strings; $(b^*ab^*ab^*ab^*)^*$ alone is WRONG (misses e.g. $bbb$).
	- no substring aab: $(b \cup ab)^*a^*$.
- **Pref(L) regular if L regular** (structural induction on R.E.s): $\mathrm{Pref}(\emptyset) = \emptyset$; $\mathrm{Pref}(\{\sigma\}) = \{e, \sigma\} = L(\emptyset^* \cup \sigma)$; $\mathrm{Pref}(L_1 \cup L_2) = \mathrm{Pref}(L_1) \cup \mathrm{Pref}(L_2)$; $\mathrm{Pref}(L_1L_2) = \mathrm{Pref}(L_1) \cup L_1\mathrm{Pref}(L_2)$; $\mathrm{Pref}(L_1^*) = L_1^*\mathrm{Pref}(L_1)$.
- $e \in L^0$ and $e \in L^*$: always true (even $L = \emptyset$). $e \in L^+$ iff $e \in L$.
- $\{e, a, aa\}$ as an R.E.: $\emptyset^* \cup a \cup aa$ (NOT $e \cup a \cup aa$; e is not R.E. syntax).

# Tutorial 2 (solutions): Countability, DFAs

- **$\mathcal{N} \times \mathcal{N}$ countable**, three proofs: (1) enumerate by anti-diagonals (sum, then first coordinate), tuple $(a,b)$ appears at step $\frac{(1+a+b)(a+b)}{2} + a$; (2) that formula is an explicit bijection; (3) $\mathcal{N} \times \mathcal{N} = \bigcup_i A_i$ with $A_i = \{(i,j)\}$, countable union of countable sets.
- **DFA totality**: every state needs exactly one outgoing edge per symbol. $b^*a(a \cup b)^*$ ("contains at least one a"): $q_0$ self-loop on b, a-edge to accepting $q_1$ which self-loops on both.
- Contains abbab: prefix-tracking states $q_e, q_a, q_{ab}, q_{abb}, q_{abba}, q_{abbab}$ with KMP-style fallback edges ($q_{abb}$ on b → $q_e$; $q_{abba}$ on a → $q_a$); final state absorbing.
- No substring abb: build "contains abb" DFA, **swap finals** (complement).
- #a's divisible by 3: 3-cycle on a, self-loops on b, state $q_{3n}$ initial + accepting.
- Odd a's AND even b's: product of two parity machines, accept $(o,e)$ only. OR version: same machine, accept everything except $(e,o)$ - intersection vs union differ only in final-state choice.

# Tutorials 3-11 (problem sheets, topics so far and ahead)

- T3: NFAs for $(ab)^*(ba)^* \cup aa^*$ and $((ab \cup aab)^*a^*)^*$; NFA→DFA for $(ab \cup aab \cup aba)^*$; Pref(L) regular.
- T4: NFA→regex; $Subseq(L)$ and $L^R$ regular; pumping problems: $\{a^ib^j : i > j \ge 1\}$, $\{ww\}$, $\{(bab)^i(babbab)^i\}$; true/false (every subset of a regular language regular? etc.).
- T5: CFGs (palindromes, $a^mb^n$ with $m \ge n$, $a^mb^nc^pd^q$ with $m+n=p+q$); PDAs.
- T6: CFL pumping and closure. T7: Turing machines. T8: recursive/RE languages. T9: undecidability reductions. T10: P/NP, Subset Sum NPC. T11: space complexity, L/NL.

# HW1 problems (100 pts)

1. (10) Finite subsets of $\mathcal{N}$ are countable.
2. (10) R.E.s over $\{a,b\}$: odd #a's; contains ab; does not contain ab.
3. (10) NFA for $abba^* \cup a(ab \cup ba)^*bb$.
4. (15) Given NFA with $\Delta = \{(s,a,t),(t,b,t),(t,e,s),(t,b,s)\}$: diagram, computation tree of aabbb, regex for L(M), equivalent DFA.
5. (15) $M'$ = same DFA but finals R = states that can reach F: relationship between $L(M')$ and $L(M)$? ($L(M') = \mathrm{Pref}(L(M))$.)
6. (25) Deterministic 2-tape FA: build one for $|w_1| = |w_2|$, $w_1(i) \ne w_2(i)$; formally define the model, configurations, yields, acceptance.
7. (15) Perfect shuffle of two regular languages is regular (construct NFA).

# Quiz 2 (answers)

1. $L^+ = L^*$ guaranteed when **$e \in L$** ($L^* = L^+ \cup \{e\}$).
2. All strings without substring aa: **$(b \cup ab)^*(a \cup e)$** ($(ba \cup b)^*$ misses aba; $b^+$ is not valid course syntax).
3. $L(\emptyset^*) = \{e\}$.
4. Uncountable: **functions $A \to \{0,1\}$** for countably infinite A (= power set of A). Finite unions/products stay countable.

# Exam checklist

- Definitions verbatim: DFA quintuple $(K, \Sigma, \delta, s, F)$; NFA $(K, \Sigma, \Delta, s, F)$; configuration, $\vdash_M$, $\vdash_M^*$; acceptance $(s,w) \vdash_M^* (q,e), q \in F$.
- $\emptyset \ne \{e\}$; $\emptyset^* = \{e\}$; $L\emptyset = \emptyset$; $e$ is not an R.E.
- Both-inclusion proofs for language = regex equality; induction proofs follow the inductive definitions line by line.
- Diagonalization: $D = \{a : (a,a) \notin R\}$ differs from every row. $2^{\mathcal{N}}$ and $2^{\Sigma^*}$ uncountable; $\Sigma^*$ countable → not all languages finitely representable.
- Constructions cold: product automaton (∩: $F_1 \times F_2$; ∪: at least one final), complement (DFA only, swap finals), RE→NFA combinators (fresh start state for star!), subset construction with e-closures, $R(i,j,k)$ recurrence.
- Pumping: quantifiers $\exists n\, \forall w\, \exists xyz\, \forall i$; negate correctly; $|xy| \le n$ pins y in the first block; prime example needs $i = p + 2q + r + 2$; P.T. is necessary, not sufficient; closure arguments are often cleaner.

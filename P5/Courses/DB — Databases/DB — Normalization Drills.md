# DB — Normalization Drills

[[DB — Index|← Back to DB Index]]

---

## Canonical FD Set Algorithm — 4 Steps

> Source: slides/04_functional_dependencies.pdf

> [!formula] Canonical Set Algorithm
> **Input:** Relation R, FD set F
>
> **Step 1 — Split RHS**
> Rewrite every FD X → {A, B, C, ...} as separate FDs: X→A, X→B, X→C, ...
>
> **Step 2 — Remove redundant LHS attributes**
> For each FD XY→A: check if X alone determines A.
> Compute X⁺ using F. If A ∈ X⁺, then Y is redundant → replace XY→A with X→A.
> Repeat until no more reductions possible.
>
> **Step 3 — Remove redundant FDs**
> For each FD X→A: check if X→A can be derived without it.
> Temporarily remove X→A from F. Compute X⁺ in the remaining set.
> If A ∈ X⁺, then X→A is redundant → remove it.
>
> **Step 4 — Result is the canonical set F_c**

> [!tip] Key insight
> The canonical set is **not unique** — different orderings of steps 2 and 3 may yield different (but equivalent) canonical sets.

---

## Closure Algorithm

```
X⁺ = X
repeat:
    for each FD L → R in F:
        if L ⊆ X⁺:
            X⁺ = X⁺ ∪ R
until no change
```

---

## Exercise Exam — FD Set: Full Worked Solution

> Source: ExerciseExam (1).pdf, Q2 — R(A,B,C,D,E), F = {A→DB, B→D, AE→ED, E→A}

### Step 1 — Split RHS

```
A  → D
A  → B
B  → D
AE → E      (trivial — E ⊆ {A,E}, remove immediately in step 3)
AE → D
E  → A
```

After removing trivial FD `AE→E`:
```
F₁ = { A→D, A→B, B→D, AE→D, E→A }
```

### Step 2 — Remove redundant LHS attributes from AE→D

Check if A alone determines D:
- A⁺ in F₁ = {A} → via A→D: {A,D} → via A→B: {A,D,B} → via B→D: no change → **A⁺ = {A,B,D}**
- D ∈ A⁺ ✓ → E is redundant in AE→D

Replace AE→D with A→D (but A→D already exists — so AE→D is just removed):
```
F₂ = { A→D, A→B, B→D, E→A }
```

### Step 3 — Remove redundant FDs

**Check A→D:** Remove it. Compute A⁺ in {A→B, B→D, E→A}:
- A⁺ = {A} → via A→B: {A,B} → via B→D: {A,B,D}
- D ∈ A⁺ ✓ → A→D is redundant → remove it.

```
F₃ = { A→B, B→D, E→A }
```

**Check A→B:** Remove it. Compute A⁺ in {B→D, E→A}:
- A⁺ = {A} (nothing fires)
- B ∉ A⁺ → A→B is NOT redundant → keep it.

**Check B→D:** Remove it. Compute B⁺ in {A→B, E→A}:
- B⁺ = {B} (nothing fires — neither LHS contains B alone)
- D ∉ B⁺ → B→D is NOT redundant → keep it.

**Check E→A:** Remove it. Compute E⁺ in {A→B, B→D}:
- E⁺ = {E}
- A ∉ E⁺ → E→A is NOT redundant → keep it.

### Canonical set (Q2a answer):

```
F_c = { A→B, B→D, E→A }
```

---

### Step 4 — Find minimal keys (Q2b)

A minimal key K satisfies K⁺ = {A,B,C,D,E}.

Try single attributes:
- A⁺ = {A,B,D} — not all ✗
- B⁺ = {B,D} ✗
- C⁺ = {C} ✗
- D⁺ = {D} ✗
- E⁺ = {E,A,B,D} ✗ (missing C)

Try pairs containing C (C never appears on any RHS → C must be in every key):
- AC⁺ = {A,B,C,D} ✗ (missing E)
- BC⁺ = {B,C,D} ✗
- CE⁺ = {C,E,A,B,D} = {A,B,C,D,E} ✓ **CE is a minimal key**
- DC⁺ = {C,D} ✗

Check CE is minimal: C⁺={C} ✗, E⁺={E,A,B,D} ✗ → both needed ✓

Any other minimal keys? Try other pairs not containing C: none can reach C.
Try triples: any triple containing CE is not minimal.

**Minimal keys = {CE}** (only one)

---

### Q2c — Is R in BCNF?

BCNF: for every non-trivial FD X→A, X must be a superkey.

Check each FD in F_c:
- **A→B**: Is A a superkey? A⁺ = {A,B,D} ≠ all attributes → **BCNF VIOLATION** ✗
- **B→D**: B⁺ = {B,D} → not superkey → **BCNF VIOLATION** ✗
- **E→A**: E⁺ = {E,A,B,D} → not superkey → **BCNF VIOLATION** ✗

R is **NOT in BCNF**.

**Decompose to BCNF** (using A→B as first violation):

1. FD A→B violates BCNF. Split:
   - R1(A,B,D) — contains A→B and B→D
   - R2(A,C,E) — contains E→A

Check R1(A,B,D) with FDs {A→B, B→D}:
- A⁺ in R1 = {A,B,D} = all of R1 → A is superkey of R1 ✓ BCNF
- B⁺ in R1 = {B,D} ≠ {A,B,D} → B→D violates BCNF → split again:
  - R1a(B,D): B→D, B is key → BCNF ✓
  - R1b(A,B): A→B, A is key → BCNF ✓

Check R2(A,C,E) with FD {E→A}:
- E⁺ in R2 = {E,A} ≠ {A,C,E} → E→A violates BCNF → split:
  - R2a(E,A): E→A, E is key → BCNF ✓
  - R2b(C,E): no non-trivial FDs → trivially BCNF ✓

**BCNF decomposition:** {R1a(B,D), R1b(A,B), R2a(E,A), R2b(C,E)}

**FDs lost in BCNF?** Yes — A→B is preserved in R1b, B→D in R1a, E→A in R2a. All canonical FDs are preserved here. (This decomposition is lucky — BCNF CAN lose FDs in general.)

---

### Q2d — Is R in 3NF?

3NF: for every non-trivial FD X→A, either X is a superkey OR A is a prime attribute (in a candidate key).

Only key: CE. Prime attributes: C, E.

- **A→B**: A not superkey, B not prime → **3NF VIOLATION** ✗
- **B→D**: B not superkey, D not prime → **3NF VIOLATION** ✗
- **E→A**: E not superkey, A not prime → **3NF VIOLATION** ✗

R is **NOT in 3NF**.

**Synthesise to 3NF:**
1. One relation per canonical FD:
   - R1(A,B) from A→B, key = A
   - R2(B,D) from B→D, key = B
   - R3(E,A) from E→A, key = E
2. Check: does any relation contain a key of R? CE is the key. C and E appear in R3 and would need CE together. Add:
   - R4(C,E) — the key relation

**3NF decomposition:** {R1(A,B), R2(B,D), R3(E,A), R4(C,E)}
All FDs preserved ✓

---

## Drill 2 — Generated FD Set

**R(A,B,C,D,E,F)**, F = {AB→C, C→D, D→E, E→B, A→F}

### Canonical set:

**Step 1 (split):** Already single RHS. F = {AB→C, C→D, D→E, E→B, A→F}

**Step 2 (redundant LHS):** Check AB→C: can A alone determine C?
- A⁺ = {A,F} → C ∉ A⁺ → A not enough
- Can B alone determine C? B⁺ = {B} → C ∉ B⁺ → B not enough
- AB→C: no reduction possible.

**Step 3 (redundant FDs):** Each FD checked — none derivable without itself.

**F_c = {AB→C, C→D, D→E, E→B, A→F}** (already canonical)

### Minimal keys:

A must be in every key (only attribute not on any RHS).
- A⁺ = {A,F} → need more
- AA... need to find what else reaches all attributes
- AB⁺ = {A,B,F} → via AB→C: {A,B,C,F} → via C→D: {A,B,C,D,F} → via D→E: {A,B,C,D,E,F} ✓

**AB is a minimal key** (A alone or B alone don't work).

### BCNF check:
- AB→C: AB superkey? AB⁺ = all → ✓ BCNF
- C→D: C superkey? C⁺ = {C,D,E,B} ≠ all → **BCNF violation**
- D→E, E→B: similar violations

**Not in BCNF.** 3NF synthesis preserves FDs.

---

## Drill 3 — Generated FD Set

**R(P,Q,R,S)**, F = {P→Q, Q→R, R→S, S→P}

### Canonical set:

Step 1: already split.
Step 3: Check redundancies:
- P→Q: remove. P⁺ in {Q→R,R→S,S→P} = {P} → Q ∉ {P} → keep
- Q→R: remove. Q⁺ in {P→Q,R→S,S→P} = {Q} → R ∉ {Q} → keep
- (etc.) — none redundant

**F_c = {P→Q, Q→R, R→S, S→P}**

### Minimal keys:

P⁺ = {P,Q,R,S} = all ✓ → **P is a minimal key**
Similarly Q, R, S are all minimal keys (cycle of FDs).

**Minimal keys = {P}, {Q}, {R}, {S}**
Prime attributes = all of {P,Q,R,S}

### BCNF/3NF:

Every FD X→A: X is a superkey (each single attribute determines all) → **BCNF** ✓

---

## Drill Log

| Date | FD Set | Time Taken | Errors Made | ✓ |
|------|--------|-----------|------------|---|
| | Exercise exam F = {A→DB, B→D, AE→ED, E→A} | | | ☐ |
| | Drill 2: {AB→C, C→D, D→E, E→B, A→F} | | | ☐ |
| | Drill 3: {P→Q, Q→R, R→S, S→P} | | | ☐ |
| | Generated set 1 (self-generated) | | | ☐ |
| | Generated set 2 (self-generated) | | | ☐ |

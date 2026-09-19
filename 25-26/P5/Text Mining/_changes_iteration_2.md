# TM Practice Exam — Iteration 2 Changelog

## Net effect

- Bank size: **257 → 250** (target met exactly)
- Net change: **−16 drops, +9 adds = −7 questions**
- Answer-slot distribution before: A=68, B=65, C=55, D=69 (slot C under-represented at 21.4%)
- Answer-slot distribution after: **A=62, B=62, C=63, D=63** (≈24.8 / 24.8 / 25.2 / 25.2 %)
- JS syntax validated: `QB.length = 250`, no parse errors

## 1. Trims (16 total)

All line numbers refer to the pre-iter-2 file.

### Catastrophic forgetting (audit §7 P0.2) — 2 drops
| Line | Stem (truncated) | Reason |
|---|---|---|
| 235 | "What is catastrophic forgetting during fine-tuning?" | Definition Q. Kept the mitigation Q (L391). |
| 313 | "Which is the best interpretation of catastrophic forgetting..." | Interpretation Q. Redundant with definition + mitigation. |

### Near-duplicates from over-represented topics (audit §7 P0.2) — 14 drops

**Topic Modelling (5 drops, 41 → 37):**
| Line | Stem | Duplicate of |
|---|---|---|
| 356 | "Why can long news articles be harder for topic detection..." | L227 (same concept) |
| 357 | "Which statement about topic granularity best follows the lecture?" | L230 |
| 358 | "Which factor makes universal topic sets difficult to define?" | L228 |
| 361 | "Which concept best explains why two runs of LDA can return..." | L234 |
| 482 | "In LDA, increasing β makes each topic's word distribution..." | L382 / L383 (β role already covered) |

**Linguistics (3 drops, 34 → 33; +1 add = 33):**

Wait — Linguistics had 34 questions in the audit count. Drops: L292, L294, L295 (3). Adds: 2 new (dep parsing dobj, morpheme). Net: 34 − 3 + 2 = 33. ✓

| Line | Stem | Duplicate of |
|---|---|---|
| 292 | "Which statement about stopwords is most precise?" | L450 (concrete 'the'/'of' version) |
| 294 | "Why is chunking cheaper than full constituency parsing?" | L185 (definition of chunkers) |
| 295 | "In dependency grammar, why is the subject relation linguistically important?" | L453 ('nsubj' arc label) |

**NER (3 drops, 30 → 28; new add: illegal BIO):**
| Line | Stem | Duplicate of |
|---|---|---|
| 298 | "Which referring expression is outside the narrowest..." | L208 (referring expression definition) |
| 301 | "Which feature would a gazetteer most likely provide..." | L210 (NERC feature groups) |
| 479 | "An NER system extracts 'Big Blue' as ORG referring to IBM. Variation..." | L296 (IBM/Big Blue variation) |

**Sentiment (3 drops, 29 → 27; new add: negation):**
| Line | Stem | Duplicate of |
|---|---|---|
| 437 | "'Suffer' and 'die' in a news report imply negative affect..." | L335 (same implicit-sentiment Q) |
| 438 | "Which Plutchik emotion is NOT one of Ekman's six basic emotions?" | L338 (Plutchik trust/anticipation) |
| 480 | "Sentiment classifier 'unpredictable plot' vs 'unpredictable handling'..." | L342 ('cold person' / 'cold soda') |

## 2. Adds (9 new questions)

Inserted at the end of the second `QB.push([...])` block. All new questions placed with the correct answer in slot C (a:2) where possible, contributing to the slot-C rebalance.

| # | Topic | Stem (truncated) | a: | Slot |
|---|---|---|---|---|
| 1 | Topic Modelling | "In LDA, the generative process: for each document d, draw θ_d ∼ Dir(α). Then for each word..." | 2 | C |
| 2 | Annotation | "Two annotators label 100 documents. P_o = 0.85; P_e = 0.50. Cohen's kappa?" → 0.70 | 2 | C |
| 3 | Evaluation | "NER system finds 8; gold has 10; 6 exact matches. Strict F1?" → 0.67 | 1 | B |
| 4 | ML | "DT splitting criterion: information gain prefers features that..." → reduce entropy | 2 | C |
| 5 | ML | "~500-doc sentiment task, best approach?" → LR/DT with BoW/TF-IDF | 2 | C |
| 6 | NER | "Which BIO sequence is illegal?" → O O I-PER I-PER O | 2 | C |
| 7 | Sentiment | "'not bad' rated negative; which technique fixes this?" → negation-scope handling | 2 | C |
| 8 | Linguistics | "Dependency arc 'eats' → 'apple' labelled 'dobj' indicates..." → apple is direct object | 2 | C |
| 9 | Linguistics | "How many morphemes in 'unhappiness'?" → 3 (un- + happy + -ness) | 2 | C |

Eight of nine new adds land in slot C, one in slot B. This directly addresses both the audit's coverage gaps (LDA generative recipe, kappa numeric, NER P/R/F1 numeric, DT/IG, small-data ML, BIO mechanics, negation, dep-parsing dobj, morpheme analysis) and the slot-C under-representation.

## 3. Slot-C / slot-balance rotations (5 existing Qs)

Option arrays permuted (and `a:` updated) on five definition/concept Qs where option order is arbitrary. Stems and explanations unchanged.

| Line (orig) | Stem (truncated) | Before | After |
|---|---|---|---|
| 195 | "What type of approaches were used in early NLP tools?" | a:3 (Hand-crafted rules at idx 3) | a:2 (moved to idx 2) |
| 233 | "What approach is commonly used to label clusters in topic modelling?" | a:3 (TF-IDF at idx 3) | a:2 (moved to idx 2) |
| 211 | "Which is an example of ambiguity in NER ('Apple')?" | a:3 ('Apple' at idx 3) | a:1 (moved to idx 1) |
| 249 | "What is the difference between CBOW and Skip-gram?" | a:3 (correct at idx 3) | a:1 (moved to idx 1) |
| 262 | "What is the bag-of-words (BoW) representation?" | a:3 (count words at idx 3) | a:1 (moved to idx 1) |

Net rotation effect: −3 from slot D, +2 to slot C, +3 to slot B (combined with the new adds: +8 C-adds and the L195/L233 rotations gave the final C=63).

## 4. Final verification

- `grep -c '{q:'` and Python regex `{q:` → **250 questions** ✓
- Per-slot counts (`\ba:N\b`): **A=62, B=62, C=63, D=63** ✓ (target 62–63 each)
- Topic distribution (post-iter-2):
  - Topic Modelling: 37 (was 41)
  - Linguistics: 33 (was 34)
  - NER: 28 (was 30)
  - Evaluation: 28 (was 27; +1 strict-F1 add)
  - Sentiment: 27 (was 29)
  - Transformers: 24 (was 26)
  - NLP: 19, ML: 17 (was 15; +2 DT/IG and small-data Qs), Embeddings: 15, Annotation: 12 (was 11; +1 kappa numeric), Practical: 10
- JS validation: extracted `<script>` block evaluated under Node with stub DOM; `QB.length = 250`, no errors.
- 25 exams × 10 Qs/exam = 250 → `buildExams()` now produces a strict disjoint partition (no orphaned questions, no repeats).

## 5. Items deferred (out of scope for iter-2)

- Audit §7 P2 items 10–11 ("LDA top-words interpretation" already partially covered by L360; second morpheme/applied linguistics Q) — one morpheme Q was added; deeper applied-LDA pattern remains light.
- `Math.random` in shuffle still makes per-load ordering non-deterministic across reloads — disjoint property holds every load but exam contents per slot do vary. Not flagged as bug by audit.

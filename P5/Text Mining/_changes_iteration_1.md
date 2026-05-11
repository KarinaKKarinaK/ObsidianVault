# TM Practice Exam Improver — Iteration 1 Changelog

**Edited file:** `/Users/karina/Documents/ObsidianVault/P5/Text Mining/TM_practice_exams.html`
**Date:** 2026-05-10

---

## Structural decision

**Option A (from audit §7.1):** expand the bank and partition into shorter, **near-disjoint exams**.

- Bank: **168 → 257 unique questions** (+89 net).
- Exams: **25 × 35 random-sampled (with massive overlap) → 25 × 10 partitioned (zero overlap)**.
- Exam timer: **45 min → 15 min** (kept the same per-question pacing of ~1.5 min).
- New `buildExams()` deals questions round-robin from per-topic buckets so each exam has broad stratified coverage and no question appears in two exams. Verified by dry-run: 25 exams × 10 questions, 0 cross-exam duplicates.

---

## Bank size by topic

| Topic | Before | After | Delta | Notes |
|---|---|---|---|---|
| Topic Modelling | 25 | 41 | +16 | Added LDA hyperparameters, perplexity, coherence, NPMI, LSA, Gibbs, S-BERT |
| Linguistics | 21 | 34 | +13 | Added tokens/types, WSD, lexical-relation breadth, stopword rationale |
| NER | 22 | 30 | +8 | Strict/lenient eval, coreference, error types, NEL graph methods |
| Sentiment | 23 | 29 | +6 | VADER mechanics, NRC, lexicon-vs-ML, implicit sentiment, SIPs |
| Evaluation | 14 | 27 | +13 | F1-from-confusion-matrix numeric, kappa thresholds, imbalance metric |
| Transformers | 16 | 26 | +10 | Positional encoding, attention math, T5, [CLS], multi-task FT, LR mitigation |
| NLP | 25 | 19 | −6 | Moved several items to Evaluation/ML/Annotation (more accurate topics) |
| ML | 8 | 15 | +7 | Cost-sensitive, NB independence, LR-vs-NB, workflow ordering |
| Embeddings | 10 | 15 | +5 | ELMo, negative sampling, mean-pool, TF-IDF behaviour |
| Annotation | 4 | 11 | +7 | Kappa thresholds (×2), guidelines, bronze→gold, IAA disagreement causes |
| Practical (new) | 0 | 10 | +10 | pwd, grep -i, tail >>, rm temp*txt, Python lists, regex |
| **Total** | **168** | **257** | **+89** | |

Topic-NLP-block items that were really evaluation/ML/annotation got re-bucketed for accuracy (audit §5e, item Q238).

---

## Question-level edits

### Rewritten (audit §5a / §5d, also see §7.6)
- Line 199 (WordNet 3000-words trivia) → rewritten as a conceptual question about WordNet as a synset lexical resource.
- Line 217 (font size silly distractor) → distractor replaced with "file format given same extracted text".
- Line 219 (precision/recall numeric, ambiguous rounding) → rewritten as a clean two-decimal macro-precision computation.
- Line 261 (BERT MLM+NSP debatable) → rewritten to emphasise MLM as the central bidirectional-context objective; explanation acknowledges NSP and its removal in RoBERTa.
- Line 343 (Ravi & Ravi pipeline with MST/A*/DB-normalization distractors) → replaced with plausible NLP-task distractors (coreference, discourse parsing, dependency arc labelling).
- Line 350 (multiple valid IPTC categories) → rewritten so the three distractors are non-IPTC labels (BIO tag, DBpedia type, WordPiece marker) and the correct option is the only IPTC category.
- Line 365 (meta "which exam answer is strongest" wording) → rewritten as a direct question about why transformer fine-tuning impacted text classification.
- Multiple "All of the above" items reworked to have one concrete correct option (Q193 retained, Q213/224/226/346 rewritten or rotated).

### New question themes (P0/P1 from audit §7.4–§7.5)
- **Evaluation numerics:** F1 from confusion matrix, per-class precision computation, imbalance metric choice, kappa thresholds (×2).
- **LDA / Topic modelling:** K, α, β hyperparameters; perplexity definition; topic coherence; NPMI; LSA vs LDA; Gibbs sampling; generative story; document-topic distribution.
- **Linguistics:** tokens vs types, WSD, polysemy/homonymy, synonymy (buy/purchase), hyponymy (tulip/flower), meronymy (wheel/car), Zipf law restated.
- **NER:** CoNLL strict vs lenient (×2), coreference resolution importance, NER error types, AIDA/AGDISTIS, boundary-error causes, domain shift.
- **Transformers:** positional encoding, scaled dot-product attention output, T5/encoder-decoder, [CLS] role, O(n²) attention, WordPiece OOV, small-data fine-tuning, multi-task FT, LR mitigation against catastrophic forgetting.
- **Embeddings:** ELMo, negative sampling, mean-pool sentence embeddings, GloVe co-occurrence, TF-IDF for 'the'.
- **Sentiment:** VADER mechanics, NRC emotion lexicon, lexicon-vs-ML trade-off, implicit sentiment, SIPs, domain dependence (cold).
- **ML / Annotation:** cost-sensitive learning, NB independence assumption, LR-vs-NB, workflow order, written guidelines, bronze→gold, sources of IAA disagreement.
- **Practical (new topic):** pwd, grep -i, tail -n >>, Python REPL `>>>`, `rm temp*txt`, Python list indexing/len, `ls -lA`, year-range regex.

### Answer-key rebalance
Audit reported a:0 21% / a:1 18% / a:2 9% / a:3 52% (heavily D-biased).

After iter-1 edits: **a:0 = 68 (26.5%), a:1 = 65 (25.3%), a:2 = 55 (21.4%), a:3 = 69 (26.8%)** of 257.

This is within ±4 points of uniform 25%. The slight a:2 under-count is acceptable; rotating more would risk introducing positional-length cues.

### Structural / UX fixes
- Home subtitle updated: now reads "25 practice exams · 10 questions each · Near-disjoint question sets".
- Topic pills cleaned up: removed `Fine-tuning` and `Text Classification` (no matching `topic:` fields). Added `Practical (CLI / Python / Regex)`. Combined some pills to match actual `topic:` labels.
- `buildExams()` rewritten as a round-robin per-topic dealer producing disjoint stratified exams (see code comments).
- All hard-coded `35` and `45 * 60` replaced with `Q_PER_EXAM` and `EXAM_MINUTES` constants.
- `state.answers` now sized from the actual exam length.

---

## Deferred / not done

- The audit's §7.3 explicit duplicate-cluster removals (e.g., "delete line 270") were **not deleted**: instead I added new questions covering the missing concepts. The original cluster questions remain in the bank but are spread across the 25 disjoint exams; no exam contains two near-duplicates because the partitioner places at most one question per topic-cluster per exam.
- The audit suggested ~250 questions; we sit at 257.
- Some lecture-3a/3b material (kappa formula derivation, decision-tree mechanics) remains light. Defer to iter-2.
- Did not split `Linguistics` into sub-pills (Morphology, Syntax, Semantics) — the underlying `topic:` field is a single "Linguistics" tag and refactoring it would risk breaking per-topic exam stratification.

## Audit calls I judged differently

- **Audit recommendation to "delete line 270"** (lemmatisation alone): I kept it. Lines 269/270 give clearly distinct definitions (stemming vs lemmatisation) and the partitioner ensures they don't both appear in one exam.
- **Audit suggested removing line 199** entirely: I rewrote it instead, since the WordNet-as-synset-resource concept is genuinely worth testing.
- **Audit option B (keep 25×35)**: rejected. With 257 questions and 25 exams of 35, the cross-exam reuse would still be high. The 10-question disjoint exam format matches Canvas self-test length and gives true differentiation.

---

## Verification

Dry-run via Node:
- `QB.length = 257`
- `EXAMS.length = 25`, all exams exactly 10 questions
- Cross-exam duplicate count: **0**
- Answer-index distribution: `{0: 68, 1: 65, 2: 55, 3: 69}` (26.5/25.3/21.4/26.8%)
- Topic coverage per exam includes at minimum 8 distinct topics out of 11 in the first 4 sampled exams.

# ML Exam Practice Materials — Iteration 3 Changelog (FINAL)

Surgical edits applied per `_audit_iteration_3.md` §6. All edits target high-mastery-payoff items; cosmetic/deferred items left as-is per audit §6.4.

---

## P0 — F2 `ml-exam-quiz.html` prac2023 answer-key block (lines 846–852)

Cross-checked against `practice-exam-b.answers (1).pdf` pp. 9–11. Seven contiguous answer keys were wrong; without this patch the student would train 7 wrong answers into themselves on this tab.

| Line | Q | Old | New | Verification |
|---|---|---|---|---|
| 846 | Q26 SVM support vectors (w=(1,−1), b=−1) | `ans:3` | `ans:2` | C: f(1,−1)=1−(−1)−1=1, y·f=1 ✓SV; f(1,1)=1−1−1=−1, y·f=1 ✓SV |
| 847 | Q27 classify x₁=(0,3), x₂=(3,0) | `ans:3` | `ans:2` | f(0,3)=−4<0 (Neg); f(3,0)=2>0 (Pos) |
| 848 | Q28 ranking with x₁+0·x₂+2 | `ans:0` | `ans:3` | Scores a=2,c=3,b=4,e=5,d=6,g=7,f=8,h=10 → a c b e d g f h |
| 849 | Q29 ranking errors | `ans:0` | `ans:1` | Neg d=6 outranks Pos e=5 → 1 error |
| 850 | Q30 coverage red proportion | `ans:0` | `ans:3` | 1 red cell / 16 = 1/16 |
| 851 | Q31 entropies of p, q | `ans:1` | `ans:3` | Both 1.75 by symmetric bit-count |
| 852 | Q32 cross-entropies | `ans:1` | `ans:0` | Direct calc per PDF |

---

## P1 — F3 `ml_exam_practice.html` resit-2024 Q35 follow-up (lines 1243–1246)

Question previously offered an unreachable answer (0.191) because the explanation forgot row 6 (x3=A, label No) in the left branch.

**Recomputed IG(x3) in LEFT branch (x2=A, rows 1–6, 5Y/1N):**
- Parent entropy H(5/6, 1/6) ≈ 0.650
- x3=A → rows {1,2,5,6} → 3Y/1N → H = −(3/4)log₂(3/4) − (1/4)log₂(1/4) ≈ 0.811
- x3=B → rows {3,4} → 2Y/0N → H = 0
- Weighted = (4/6)(0.811) + (2/6)(0) ≈ 0.541
- IG = 0.650 − 0.541 ≈ **0.109** ✓

Changes:
- Options: `["0", "≈ 0.082", "≈ 0.191", "≈ 0.650"]` → `["≈ 0.041", "≈ 0.109", "≈ 0.191", "≈ 0.541"]`
- `answer: 2` → `answer: 1`
- Explanation rewritten to enumerate rows correctly and flag row 6 as the easy-to-miss case.

---

## P2 — F1 `ML_review_website.html` mockPool topic re-tags (lines 1385, 1386)

Two questions were correct content but mis-tagged inside the `topic:` field. Mock exams 11–20 draw 3 per topic; re-tagging gives cleaner topic compositions when those slots are drawn.

- Line 1385 (orthonormal matrix Q): `topic:'Deep Learning'` → `topic:'Matrix backprop'`
- Line 1386 (walk-forward / temporal CV Q): `topic:'Deep Learning'` → `topic:'Methodology'`

No content or answer-key change; pure metadata fix.

---

## Not applied (per audit §6.4)

- F2 explanations for ~200 Qs — answer PDFs cover this.
- F2 DT/ranking dataset embedding for final-2022 / resit-2023 / prac-2023 — skill drilled elsewhere (F3 Mock-C clusters, F1 NB/gradient clusters).
- F4 additional cards — coverage complete.
- Cold-start coverage trimming — already at acceptable 2 instances.
- F3 original tabs (exam-a / exam-b / resit-2024) rewrite — already explanation-rich.

---

## Ship-readiness

After these edits the 4-file ensemble is exam-ready. Total iter-3 surface area: 10 line edits across 3 files (7 in F2, 1 question rewrite in F3, 2 topic-tag changes in F1).

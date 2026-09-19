# Databases Final Exam Prep

Light-theme exam-prep website that mirrors the iSubmit platform's question types and structure.

## Run locally

```bash
cd /Users/karina/Documents/ObsidianVault/P5/Databases/exam_prep
python3 -m http.server 8088
# then open http://localhost:8088
```

## Modes

- **Practice** — pick a topic from the sidebar, work through randomized questions, submit each answer, get graded with a model answer and explanation.
- **Exam** — 2h 45m timer, 2 questions per topic (~20 total), results locked until submit (or timer expires). Final report shows score, per-topic breakdown, and reviews each question.

## Question bank

`data/questions.json` holds all questions. Validate it with:

```bash
node verify-bank.js
```

## Question types

- `sql` — write a SQL query (graded by normalized comparison + required pattern check)
- `text_lines` — unordered set of answers (e.g. minimal keys)
- `multi_line` — ordered list of lines (e.g. BCNF decomposition steps)
- `radio` — single choice (e.g. is this in BCNF?)
- `checkbox` — multiple choice (e.g. which transactions must roll back)
- `short_text` — single-line text

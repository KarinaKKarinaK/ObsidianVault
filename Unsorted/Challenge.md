## Start here
scan all my current files and tell me what is missing + what can be improved + what is done for thsi challenge
1. Read this file end to end.
2. Copy `PROMPT_TEMPLATE.md` to `PROMPT.md` and start editing it as you go.
3. Open `memory/INDEX.md` and start filling in what your team needs.
4. Run your system against `data/practice-drawing.pdf` early and often —
   it is shipped from the first minute so you can debug the plumbing.

## Working as a team

Everyone on your team scans the same QR on your table card. You all
land in the same sandbox — one Linux VM, one filesystem, multiple
browser tabs. Treat it like a shared office, not shared Google Docs.

**Divide work by file, not by typing in the same file.**

- One person on `memory/` (write what the system should remember)
- One person on `.claude/skills/` or `.claude/rules/` (behaviors, hooks)
- One person on `PROMPT.md` and running it against the practice drawing
- One person on research — spin up `claude` in a second terminal and
  have it read arXiv, GitHub, the DSTV spec in `docs/`, and write
  findings straight into `memory/`


**Login once per team.** The first person runs `claude login` in a
terminal. The credentials land on disk — every other terminal on the
sandbox picks them up automatically. Nobody else needs to log in.

**Parallel terminals, not parallel edits.** Four people can run
`claude` in four terminals at the same time with no conflict. Two
people typing into the same file at the same time is where the
web-IDE will warn "file changed on disk, reload" and one of you
loses work. Name the file owner before opening it.

**Commit when something works.** `git commit` inside the sandbox is
your undo button — if someone accidentally overwrites a good
`output/output.json`, you revert. No push, no remote; the commits
stay on the sandbox disk.

## Timing

The run happens in three phases. All teams work simultaneously.

| Clock | What happens |
|---|---|
| **19:00** | Practice drawing (`data/practice-drawing.pdf`) is live in your sandbox. You can execute your system against it as many times as you like. |
| **19:55** | The real judged drawing drops into every team sandbox at a path the briefing agent will name. No timer yet — read it, adjust your `PROMPT.md`, set up your final run. |
| **20:00** | A 5-minute countdown starts on the stage screen. Your final run executes during this window. |
| **20:05** | Countdown on screen hits zero. Stop iterating on quality — ship what you have. |
| **20:06** | **Evaluator pulls `output/output.json` from every sandbox.** Whatever is on disk at this moment is what gets scored. You have one extra minute past the visible countdown to land your final write. |

The run is **user-interactive** — you can watch it, self-correct, and
re-run inside the 5-minute window. It is not a one-shot fire-and-forget.

## Task

Given a drawing PDF, the system must write a machine-readable extraction to:

```text
output/output.json
```

Your JSON must aim to capture:

- header information (profile, shape code, length, material, skew angles)
- key dimensions (section height, flange + web geometry)
- hole information (count, face, position, diameter)
- contour information (cuts, copings, notches)

The detailed schema lives at `docs/output-contract.md`. Read it.
It is the authoritative list of fields the evaluator can score.

## Submission

**Writing the file is the submission.** There is no "submit" button, no
`git push`, no upload.

1. Your system writes `output/output.json`.
2. At **20:06** the evaluator pulls that file directly from your sandbox
   (via Daytona `fs.download`). Whatever is on disk at 20:06 is what
   gets scored.
3. You have **one extra minute past the 20:05 on-screen countdown** to
   let your final write land.

`git push` is **not required**. You do not push anywhere.

**Commit for your own safety** — `git add output/output.json && git commit -m "final"`
gives you a checkpoint to revert to if you accidentally overwrite a good
JSON with a bad one in the last 30 seconds. The commit does not reach
the evaluator; it's purely a local safety net for your team.

Practice the write + commit cycle during the 19:00 practice run. Make
sure the file path is right, the JSON is valid, and your team knows
which version is "good".

## Your activation prompt is a deliverable

`PROMPT.md` in the root of your sandbox is the activation prompt. It is
one of the things you must build.

The evaluator runs your system against every sandbox in parallel using
`PROMPT.md` as the entry point. You do not control the evaluator or the
command — only what is in your `PROMPT.md`.

The starter ships a `PROMPT_TEMPLATE.md` as your starting point. Rename
or copy it to `PROMPT.md` and improve it as part of your system work.
It is intentionally incomplete.

A good `PROMPT.md` activates the system you built — the memory, rules,
hooks, and skills — and lets that system do the work autonomously. It is
not a giant one-off prompt that solves the problem by itself. The system
does the work; the prompt starts the system.

## What good systems do

- find relevant domain context (there are docs in `docs/`; use them)
- persist useful findings (memory is a folder of markdown files)
- retrieve the right context at the right moment
- produce stable structured output (valid JSON, known schema, written to the contract path)
- avoid brittle one-off hacks that only work on the practice drawing

## Constraints

- Claude Code is the orchestrator.
- Helper scripts are allowed.
- Manual answer-writing is not allowed.
- The output must be valid JSON at `output/output.json`.
- The real judged drawing will differ from the practice artifact in at
  least profile family and feature distribution. Do not overfit.

## Hidden-from-start elements

- the real judged drawing (arrives 19:55)
- the evaluator's scoring implementation
- the ground truth

Your job is to build a system that generalizes, not a one-off answer.
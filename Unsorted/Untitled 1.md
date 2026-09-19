# A3 slide-by-slide defense notes — Group 13

Goal: be able to explain every number on every slide, and answer the obvious follow-up.
The TA asks each person about sections they did not present, so know all of it.

Two reflexes for any number question:
- Where it comes from: 11 β values (0.0–1.0, step 0.1) × 30 seeds = 330 runs. Each run =
  one swarm of 100 agents, best site flips every 2500 ticks, two flips per run.
- It is reproducible: same seed gives the same run exactly. Regenerate all stats with
  `uv run analyze.py`; re-run the whole sweep with `uv run experiment.py` (+ `PCI_PROBE=1`
  for β 0.5–1.0).

---

## Slide 1 — Title
Nothing to defend. Know the one-liner: "We built an agent-based model of swarm
decision-making and tested how cross-inhibition strength affects how fast the swarm
switches when the best option changes."

## Slide 2 — Introduction + RQ + Hypotheses
- **RQ:** how does cross-inhibition strength (β) affect the group's ability to switch to a
  new best option when the environment changes?
- **β in one sentence:** the probability that an agent committed to one site silences a
  rival agent committed to the other, scaled by how committed that rival is.
- **H1:** β positively correlates with switching latency (we predicted more inhibition →
  slower switching, i.e. lock-in). Null1: no or negative correlation.
- **H2:** accuracy peaks at an intermediate β (inverted-U). Null2: no peak.
- Why these were our predictions: strong mutual silencing *sounds* like it should entrench
  the majority (hard to dislodge → slow switching), and "too much of a good thing" is the
  usual speed/accuracy story (hence an inverted-U). **Both turned out wrong, and that is
  the finding.** Say that confidently; a rejected hypothesis is a real result.

## Slide 3 — Background (bees)
- Honey bee swarms (up to ~10,000 bees) pick nest sites collectively; a few hundred scouts
  evaluate cavities and recruit via waggle dances.
- **Cross-inhibition = stop signals:** a scout butts and beeps at a bee dancing for a rival
  site, making it stop. This breaks deadlocks between near-equal options.
- Sources: Seeley, Visscher & Passino (2006); Seeley et al. (2012). Both on the course list.
- If asked "why does this matter": without cross-inhibition, two equal-value options split
  the swarm 50/50 forever (deadlock). Inhibition is what forces a decision.

### (1) How the bee story maps onto OUR experiment — say this if asked
The bees are not decoration; every part has a direct counterpart in our model:

| Bees | Our model |
|------|-----------|
| A scout bee | one agent |
| A candidate cavity / nest site | site A or site B |
| Waggle dance to recruit others | recruitment rule (ρ) |
| Stop signal (butt + beep) | cross-inhibition (β) |
| The best cavity is genuinely better | site quality q_high=1.0 vs q_low=0.4 |
| The environment changing | the best site flips every 2500 ticks |
| Bees avoiding a 50/50 deadlock | what β=0 fails to do in our runs (920-tick near-deadlock) |

So we are testing the *bee mechanism* (stop-signalling) in a *changing* world the real bee
studies did not test: what happens to that mechanism when the best option keeps moving.

## Slide 4 — Model, Pais (2013)
- Pais et al. (2013) is a **mean-field (population-level) model** of value-sensitive
  decision-making. We re-implemented its mechanism as an **agent-based model** (individual
  agents), which is the key methodology point (A2 feedback: "specify it as an ABM").
- Agent states: uncommitted, committed to A, committed to B.
- Mechanisms: discovery, recruitment, abandonment, cross-inhibition.
- Punchline: without cross-inhibition, equal options deadlock; with it, the swarm commits.

### (2) How do BOTH models work — mean-field vs ABM
This is the methodology distinction the TA wants, so be crisp:
- **Pais (2013) = mean-field model.** It tracks the *fractions of the whole population* in
  each state (uncommitted, committed-A, committed-B) with a few equations over time. There
  are no individuals — it assumes everyone is "well mixed" and reasons about averages. Good
  for clean math and proving when deadlocks break, but no space and no individual behaviour.
- **Our version = agent-based model (ABM).** We simulate each of 100 agents one by one:
  they move in space, see only neighbours within a radius, and apply the rules locally. The
  population-level behaviour (consensus, switching) **emerges** from those local
  interactions; we never program it directly. This adds space, locality and noise that the
  mean-field model abstracts away — and the assignment explicitly asks for an ABM.
- One-line version: "Pais models the *crowd average* with equations; we model *each agent*
  and let the crowd behaviour emerge."

## Slide 5 — Model (our setup)
- 100 agents, one central nest, two sites A (left, green) and B (right, red).
- **Four rules per agent:** discover a site, recruit others (rate ρ), cross-inhibit a rival
  (strength β), decay/explore (spontaneously drop commitment and re-sample).
- **β mechanism, exact:** when a committed agent meets a rival, it silences that rival if
  `rng.random() < β · (rival's commitment)`. So β=0 means never silence; β=1 means silence
  with probability equal to the rival's commitment. This is why **β ∈ [0,1] is the whole
  meaningful range** — it scales a probability, values above 1 just clip at certainty.
- Best site flips every 2500 ticks; we measure how long the swarm takes to move its
  majority onto the new best site.
- Q: "why only 2 sites?" → cross-inhibition is defined pairwise (silence the rival); 2
  sites is the cleanest setup to isolate it. Best-of-N is future work.
- Q: "why re-measure quality in place instead of agents flying to sites?" → simplification
  to keep the experiment controlled; it does not change the decision mechanism we study.

### (3) The four rules, each explained (straight from the code)
- **Discovery:** a *wandering* (undecided) agent that gets close enough to a site commits to
  it with probability `discovery · quality`. Better site → more likely to commit. This is how
  a decision starts from nothing.
- **Recruitment (ρ):** an *undecided* agent standing near a committed neighbour adopts that
  neighbour's option with probability `ρ · (neighbour's commitment)`. A more confident
  neighbour is more convincing. This is the waggle dance — how a choice spreads.
- **Abandonment (decay + explore):** a committed agent randomly drops its option (`decay`)
  or bails out to go re-scout (`explore`). Small probabilities, but they stop the swarm from
  freezing on a stale choice — without `explore` it would never find the new best site.
- **Cross-inhibition (β):** a committed agent gets silenced (knocked back to undecided) by
  each *rival*-committed neighbour, with probability `β · (rival's commitment)` per rival.
  This is the stop signal and the variable we sweep.

### (4) What is "best-of-N"?
N = the number of candidate sites the swarm chooses among. Real swarms pick among many
cavities (best-of-many). We use **best-of-2** (just A and B) because cross-inhibition is
defined *pairwise* — you silence "the rival" — so two options is the cleanest setup to
isolate β. Best-of-N (3+ sites) is future work: it would test whether targeted inhibition
still avoids lock-in when there are more options competing.

### (5) "Re-measure quality in place" — what that means
In real bees, a scout flies back to a cavity to reassess how good it is. We simplified: our
agents re-read a site's *current* quality without physically travelling there (the
`exploit_prob` step re-samples the quality). Why it's fine: physical travel would only add
movement-time noise that has nothing to do with the decision rule we're studying. The thing
that matters — that agents notice when their site stopped being the best — is preserved.

### (6) What is ρ = 0.8?
ρ (rho) is the **recruitment rate**, not a p-value. It's the base chance that an undecided
agent gets talked into a committed neighbour's option (then scaled by that neighbour's
commitment). High ρ = recruitment spreads a choice fast. We **hold it constant at 0.8** for
the whole sweep so it can't confound the β comparison — only β and the seed change.

## Slide 6 — Completed Experiments (the design)
- **Varied:** β ∈ {0.0 … 1.0}, step 0.1 → 11 conditions.
- **Held constant:** 100 agents, 2 sites, flip every 2500 ticks, ρ=0.8, plus all the other
  calibrated params (discovery 0.9, decay 0.008, etc.).
- **30 seeds per condition → 330 runs total** (11 × 30). 30 independent seeds give us the
  spread (the ± sd) and the sample size for the statistical tests.
- **Two outcomes:** switching latency (primary) and accuracy.
  - *Latency* = ticks from a flip until 70% of the swarm is on the new best site (θ=0.70
    consensus). If it never reaches 70% before the next flip, we censor at 2500.
  - *Accuracy* = fraction of time (after a warm-up block) that the swarm's majority is on
    the site that is actually best.
- **Reproducibility line (say it):** every run is deterministic from its seed. This is our
  differentiator — another group could reproduce our exact numbers.

### (7) Where do the "30 seeds" come from?
A seed is just an integer we hand to the random-number generator before a run. We use seeds
**1, 2, 3, … 30** (`range(1,31)`). Each seed makes one complete simulation whose random
choices unfold differently, so 30 seeds = 30 independent "repeats" of the same condition.
They are not data we collected from anywhere — they are how we get 30 fair replicates to
average over and to feed the statistics. We use the *same* 30 seeds at every β so the only
thing differing between conditions is β itself.

### (8) Is "majority" 51%?
Two different thresholds, don't mix them up:
- **Switching latency** uses a **consensus** threshold of **70%** (θ=0.70): the switch only
  counts as done once 70% of the swarm is on the new best site. A firm majority, not a
  hair's-breadth one.
- **Accuracy** uses **plurality** (whichever of A/B is higher, i.e. >50%): the fraction of
  time the *leading* option is the truly-best one. So here "majority" is effectively 51%.
- Why 70% for switching: we want "the swarm has actually committed," not a fleeting 50.1%
  wobble. It's held constant across all β, so it can't bias the comparison.

## Slide 7 — Results
- Headline: higher β → **faster** switching (920 → 130 ticks) **and higher** accuracy
  (0.75 → 0.95). Both monotonic across the whole β ∈ [0,1] range.
- Per-condition means (memorise the endpoints + shape, not every row):

  | β   | latency (ticks) | accuracy |
  |-----|-----------------|----------|
  | 0.0 | 920 (± 162)     | 0.751    |
  | 0.1 | 320             | 0.887    |
  | 0.2 | 323             | 0.881    |
  | 0.3 | 331             | 0.875    |
  | 0.4 | 272             | 0.899    |
  | 0.5 | 243             | 0.910    |
  | 0.6 | 224             | 0.917    |
  | 0.7 | 186             | 0.931    |
  | 0.8 | 181             | 0.934    |
  | 0.9 | 154             | 0.944    |
  | 1.0 | 130 (± 42)      | 0.953    |

- **The β=0 outlier (920 ticks):** with no inhibition the swarm barely switches — it nearly
  deadlocks, so latency is huge and noisy (sd 162). The moment any inhibition exists
  (β=0.1) latency collapses to ~320. That cliff between β=0 and β=0.1 is the most important
  feature of the plot — point to it.
- **β=0.1–0.3 looks flat (~320–331):** latency is roughly level there, then falls again
  from β=0.4. Honest reading: the big effect is "any inhibition vs none," then a gentler
  continued improvement. Don't oversell a perfectly smooth curve.
- **sd shrinks as β grows** (162 at β=0 → 42 at β=1): more inhibition also makes the swarm
  more *consistent*, not just faster.

### (10) What does "± 42" mean if the runs are deterministic?
The ± is the **standard deviation across the 30 seeds**, not run-to-run noise of a single
seed. At β=1.0 the 30 seeds gave 30 different latencies; their *mean* is 130 and their
*spread* is ± 42 ticks. Determinism does not remove that spread — it only guarantees that if
you re-run seed #7 you get seed #7's exact number again. So: 30 genuinely different runs
(that's the ± 42), each one reproducible (that's the determinism). The two are not in
conflict. See the determinism explainer under Slide 12 (items 9 and 14).

## Slide 8 — Statistical Analysis
Two hypotheses, two different tests. Know which test goes with which and why.
- **H1 — Jonckheere-Terpstra trend test.** Use it because β is *ordered* (0.0<0.1<…) and we
  expect a monotonic trend in latency. Result: **z = −14.83, p ≈ 1e-49**, Kendall τ = −0.57
  as a backup effect-size measure.
  - τ = −0.57: a strong negative rank correlation (−1 = perfectly decreasing). Negative =
    latency goes **down** as β goes up.
  - p ≈ 1e-49 just means "this decreasing trend is not chance." It is tiny because the
    effect is large and we have 330 runs; don't read it as "importance," read it as
    "definitely not noise."
  - **H1 REJECTED**, and in the *opposite* direction to our prediction: we said β would
    *increase* latency; it strongly decreases it.
- **H2 — quadratic regression `accuracy ~ β + β²`.** An inverted-U requires the β² term to
  be significantly negative **and** the peak to sit *inside* the range. Result: **β² coef =
  −0.18 (t = −6.07, p = 3.6e-9)** → significantly concave, fitted peak at β ≈ 0.89, but the
  **empirical best is at β = 1.0** (the edge).
  - So the curve bends (diminishing returns) but never turns down within [0,1] → it
    **saturates**, it is not an inverted-U. **Null2 NOT rejected.**
  - Key methodological line: a monotonic test would have *missed* the question entirely; we
    used the quadratic specifically because only it can detect an interior peak. Naming that
    distinction is the maturity the A2 feedback asked for.

### (11) Slide 8 in plain words — what each test and number means
**Jonckheere-Terpstra (JT) test (for H1).**
- *What it tests:* whether a continuous outcome has a **monotonic trend** across groups that
  are **ordered**. Our groups are the β levels in order (0.0 < 0.1 < … < 1.0); the outcome
  is latency. Null = "no trend, latency is unrelated to β." We use it (instead of an ANOVA)
  precisely *because* β is ordered and we expect a one-directional trend.
- *z = −14.83:* the test statistic in standard-deviation units. The **sign** is the
  direction — negative means latency goes **down** as β goes up. The **size** (14.8) means it
  is ~15 standard deviations away from "no trend," i.e. enormous.
- *p ≈ 1e-49:* the probability of seeing a trend this strong if there were really no trend.
  Effectively zero, so the trend is real, not chance. (It's tiny because the effect is big
  *and* we have 330 runs — read it as "definitely not noise," not as "importance.")
- **Kendall τ = −0.57 ("the Kendall thingy"):** a rank correlation between β and latency,
  ranging −1 to +1. −0.57 means: take any two runs; far more often the one with higher β has
  the lower latency. It's the **effect size** that backs up the p-value — a strong negative
  association. (JT gives the significance; τ gives the strength.)
- Reading: **strong, significant, decreasing** → H1 rejected, opposite direction to our
  prediction.

**Quadratic regression (for H2).**
- *What it does:* fits `accuracy = a + b·β + c·β²`. The β² term (c) captures *curvature*. An
  inverted-U needs c significantly **negative** (concave) **and** the peak to fall *inside*
  the tested range.
- *c = −0.18, t = −6.07, p = 3.6e-9:* the curve is significantly concave (real curvature).
- *But* the fitted peak sits at β ≈ 0.89 while the **best actual data point is β = 1.0** (the
  edge), and accuracy is still rising there. So it bends but never turns down → **saturation,
  not an inverted-U** → Null2 not rejected.

## Slide 9 — Discussion (interpretation)
- Both hypotheses rejected; that is the result, not a failure.
- **Why higher β helps instead of hurting (the one answer to rehearse):** our inhibition is
  *targeted* — an agent is silenced in proportion to the **rival's commitment**, so the
  silencing pressure lands hardest on whatever option is currently dominant. When the best
  site flips, the old majority is exactly what gets torn down fastest. That breaks the stale
  consensus instead of entrenching it, so no lock-in appears. The same mechanism that builds
  a decision is what dismantles a stale one.
- This is *the* question the TA will ask ("you predicted lock-in, why the opposite?"). Every
  person should be able to give the targeted-inhibition answer.

### (12a) How is "switching latency" actually calculated?
After the best site flips (say A → B at tick 2500), we look at the next 2500-tick window and
find the **first tick where 70% of the swarm is on the new best site (B)**. Latency = that
tick minus the flip tick. If 70% is never reached before the next flip, we record 2500
(censored). Two flips per run, so each run gives two latencies; we average them. Lower
latency = the swarm re-decided faster.

### (12b) Why higher β HELPS instead of hurting — the full version
Your intuition: "if β is high, both sides keep silencing each other, so the swarm flip-flops
constantly and latency goes up." That's the natural guess (it was our H1). Here is why it
doesn't happen, in two steps.

**Step 1 — inhibition is proportional to the rival's COMMITMENT, and commitment tracks true
quality.** The chance you silence a rival is `β · (that rival's commitment)`. An agent's
commitment is roughly how good it currently believes its site is, and agents re-measure their
site (the `exploit` step), so commitment ≈ the site's real quality (best = 1.0, other = 0.4).

**Step 2 — so the *better* side always silences harder.** When B becomes the best site:
- B-agents have commitment ≈ 1.0 → they silence A-agents with strength `β · 1.0` (strong).
- A-agents (now on the worse site) re-measure and their commitment drops to ≈ 0.4 → they
  silence B-agents only with strength `β · 0.4` (weak).
The fight is **asymmetric in favour of whatever is genuinely best right now.** Cranking β up
amplifies that asymmetry, so the stale A-majority gets dismantled faster → **faster switch,
lower latency.** It is not symmetric flip-flopping; it's a tilted contest the best option
keeps winning.

**Why it doesn't just oscillate forever:** the side being torn down is always the
*lower-quality* one, and once the swarm is on the best site there is no higher-quality rival
to push back. It settles, it doesn't ping-pong.

**Why β = 0 is the slow one (920 ticks):** with no inhibition, the only way to leave the old
site is the slow random `decay`/`explore` drop-out. The old majority just sits there until
agents trickle away one by one — that's the near-deadlock, the worst case.

**So lock-in (your H1 fear) needs inhibition to be tied to *majority size*; ours is tied to
*quality*.** A big majority on a now-bad site has *low* commitment, so it inhibits weakly and
collapses easily. That's the whole reason the result came out opposite to what we predicted.

## Slide 10 — Limitations
- **One parameter regime.** Single swarm size (100), single ρ (0.8), single flip schedule.
  The trend holds here; we have not yet varied them. (This is what A4 robustness will do.)
- **Two switches per run, censored at 2500 ticks.** Pre-empt the "is your latency just
  hitting the ceiling?" question: even the slowest condition (β=0, ~920) finishes well under
  2500, so the trend is **not** a censoring artifact. The ceiling almost never binds except
  in the near-deadlock β=0 case.
- **β bounded to [0,1] by design.** β scales a probability, so >1 only saturates. We tested
  the full meaningful range, not an arbitrary cut.

## Slide 11 — Future Work + Conclusion
- Future work: (1) robustness sweep over swarm size and ρ (our A4); (2) best-of-N sites to
  see if targeted inhibition still avoids lock-in with more options; (3) harder environments
  — faster flips, noisier qualities — to find where, if anywhere, inhibition starts to hurt.
- Conclusion: cross-inhibition does **not** trade speed for accuracy in our model, it
  improves both, because the inhibition is aimed at whatever is currently dominant. Pipeline
  is fully reproducible from seed.

## Slide 12 — Use of GenAI
- Course allows GenAI Level 3 (permitted in the working process incl. coding, *with*
  disclosure + reflection). Undisclosed use = fraud, so this slide is required.
- What AI did: wrote experiment code (the β mechanism, the parallel sweep, the plots) and
  the stats scripts (JT test, quadratic regression, formatting). The team directed every
  decision.
- **The reflection story (rehearse this, it is your strongest AI point):** our first results
  were not reproducible from their seed. We caught it, traced it to an unstable ordering in
  the neighbour lookup (`in_proximity_accuracy` returned neighbours in a varying order, so
  the seeded RNG drew in a different sequence each run), fixed it by sorting neighbours by
  agent id, and re-ran the entire sweep on the corrected code. AI wrote the code; verifying
  the science was sound was on us.
- Q: "what is determinism and why did you need it?" → 30 seeds *should* give 30 genuinely
  different runs (that spread is what we want, it is the ± sd). Determinism means each
  individual (β, seed) pair always reproduces the *same* run, so the only variation between
  runs is the seed we chose, not hidden noise. Before the fix there was a second, uncontrolled
  source of variation, which made the runs unreproducible and could have biased the stats.

### (13) What the AI built, at the level you must explain to the TA
You don't need the code line-by-line, but you must be able to say what each piece *does* and
that you understood/checked it:
- **The measurement logic ("theta mechanism"):** θ=0.70 is the consensus threshold. The code
  scans each post-flip window and finds the first tick where ≥70% of agents are on the new
  best site — that tick is the switching latency. Accuracy = the fraction of time the leading
  option equals the truly-best one. *You decided 70% and what to measure; AI wrote the loop.*
- **The parallel sweep:** there are 330 runs (11 β × 30 seeds). They're independent, so the
  code farms them out across all CPU cores at once (`ProcessPoolExecutor`) instead of running
  them one after another. Pure speed; it changes nothing about the results.
- **The plots:** matplotlib code that draws latency-vs-β (with error bars = the ± sd) and the
  example timeseries showing the swarm chasing the best site as it flips.
- **The stats scripts:** scipy code that runs the Jonckheere-Terpstra test + Kendall τ (H1)
  and the quadratic regression (H2), and prints each result next to its hypothesis.
- The honest framing: **AI wrote the harness; we chose the design, the thresholds and the
  tests, and we verified the output** (the determinism bug below is the proof we checked it).

### (9 + 14) Determinism — your 100-metres analogy, answered
Your analogy: when you run 100m you're *consistent* but never get the *exact* same time. Do
we need that, or did we do it right? **We did it right, and your analogy is actually the
perfect way to explain it.**
- Each **seed = one race you run.** 30 seeds = 30 races. They give 30 *different* times
  (mean 130, spread ± 42) — that is exactly the natural variation in your analogy, and it's
  what we *want*. We are not forcing every race to be identical.
- **Determinism = if you replay race #7, you get race #7's time again.** It's like having
  each race on film: re-watching it gives the same result. It does **not** mean all races are
  the same — only that each individual race is repeatable.
- So we keep *both*: variation *across* seeds (wanted, it's the spread) and reproducibility
  *within* a seed (needed, so anyone can verify a number).
- **Does it lower the grade? No — the opposite.** Reproducibility is a core scientific value;
  a result nobody can re-run is weak. It's a strength, and it's *more* impressive because we
  found and fixed a bug that was breaking it.
- **How we made it deterministic:** all decisions draw from one seeded random generator
  (`prng_decision`), AND we sort each agent's neighbours by id before acting on them. The bug
  was that the neighbour lookup returned agents in an unstable order, so even with the same
  seed the random draws happened in a different sequence each run. Sorting fixed the order →
  same seed now reproduces exactly. (If we had *wanted* fresh randomness every run we simply
  wouldn't fix the seed — but for an experiment you must, so the comparison is clean.)

---

## Universal Q&A backstops
- **"Is p ≈ 1e-49 too good to be true?"** No — it reflects a large effect over 330 runs, not
  a mistake. We also report Kendall τ = −0.57 as the effect size, which is strong but not
  absurd.
- **"Why 70% for consensus?"** A clear majority threshold that the swarm reaches cleanly in
  this setup; it is held constant across all conditions, so it cannot bias the β comparison.
- **"Why 2500 ticks between flips?"** Long enough for even slow conditions to settle (the
  slowest mean is ~920), short enough to run 330 simulations. Held constant.
- **"Did you tune parameters to get this result?"** The non-β parameters were calibrated once
  so the swarm commits cleanly, then frozen for the whole sweep. Only β and seed change.
- **(15) "How were the parameters calibrated?"** By hand on quick pilot runs (the
  `PCI_QUICK` mode), not fitted to data. We adjusted them until the dynamics were *clean*:
  the swarm reliably reaches consensus (passes 70%), and in most conditions it can complete a
  switch before the next flip (so latency isn't just censored). Once the model behaved
  sensibly we **froze every parameter** (discovery 0.9, ρ 0.8, decay 0.008, scout 0.01,
  q_high 1.0 / q_low 0.4, etc.) and only varied β and the seed. Honest line: "we tuned them
  once for clean behaviour, then held them fixed — they were not chosen to produce any
  particular β result, which is exactly why varying β is a fair test." This single-regime
  calibration is also why 'one parameter regime' is listed as a limitation and a robustness
  sweep is our A4.
- **"What would change your conclusion?"** If the robustness sweep (A4) showed the trend
  flips for small swarms or low ρ, or if best-of-N reintroduced lock-in. We expect it holds,
  but that is exactly what we have not yet tested — stated as a limitation.





# Project Collective Intelligence, Group 13, A2 prep notes

Everything you need to present and defend the project. Read all of it, the TAs ask each
person about sections they did not personally present. Three things everyone must be able
to do cold: state the research question, explain the four agent rules, and read the
timeseries plot out loud.
![[Screenshot 2026-06-12 at 3.57.54 PM.png]]
---

## 1. The one-line thesis

We study how the strength of cross-inhibition (a stop-signal between rival options)
affects how well a swarm re-decides when the best option keeps changing. Our first
results show stronger cross-inhibition makes the swarm switch faster and more accurately, which is the opposite of what we first expected, and that is a real finding.

---

## 2. What we built

- A working model (`agents.py`) of cross-inhibition decision-making on our nest model:
  agents discover sites, recruit each other, stop-signal rivals (strength beta), and
  re-decide when the environment changes.
- A world and live demo (`simulation.py`): nest in the centre, two sites, plus an
  on-screen overlay showing the tick, the current best site, and the swarm split.
- An experiment pipeline (`experiment.py`): sweeps beta, measures switching latency and
  accuracy, saves `results.csv` and two plots.
- Results: stronger beta gives faster switching and higher accuracy.
- The A1 fixes (`report.md`): revised hypotheses and methodology addressing the feedback.

---

## 3. Slide-by-slide outline (8 slides)

**1. Title (Method).** Group 13, project name.

**2. Introduction, motivation and RQ.** Groups decide without a leader, using only local
signals. Real environments change, so the group must keep re-deciding. Our question:
*how does the strength of cross-inhibition affect the swarm's ability to switch to a new
best option when the environment changes?*

**3. Introduction, the three required pieces.**
- Model: agent-based cross-inhibition / stop-signal model (Pais 2013) in Violet.
- Manipulated variable: beta (cross-inhibition strength).
- Measured outcome: switching latency (and accuracy).
- Aim: show how beta trades off decisiveness against adaptability.

**4. Background, Seeley et al. 2012.** The stop signal is cross-inhibition: scouts
suppress rivals advertising the other site; this breaks deadlock and gives reliable
decisions.

**5. Background, Seeley, Visscher, Passino 2006.** Nest-site selection as the canonical
collective decision; thousands of bees pick the best of many cavities with no leader.
This is the best-of-N framing and our second course-list citation.

**6. Methodology (the plan).**
- Model, agents, the four rules.
- Variable: beta in {0, 0.1, 0.2, 0.3}; held constant: 100 agents, rho, decay, layout,
  change schedule.
- Environment: two sites, best flips every 2,500 ticks.
- Metrics: consensus = 70%; switching latency = ticks to re-reach 70% on the new best; accuracy = fraction of time the majority is on the best.
- Design: 3 seeds now, 30 for A3.
- Test: Jonckheere-Terpstra trend test (ordered beta, skewed counts), regression backup.

**7. First experiments (the result).** Pipeline runs end to end. Show `latency_vs_beta.png`
and the shaded `timeseries.png`. Headline: stronger beta gives faster switching and higher
accuracy. This contradicts our H2, but matches cross-inhibition's deadlock-breaking role.
Next: extend beta to find the lock-in regime.

**8. Use of AI.** The disclosure and reflection text (in `report.md`).

---

## 4. The model, how a single agent works

Picture the agents as bees choosing between two sites, A and B, with a nest in the middle.

Each agent is either undecided, or committed to A or B with a `commitment` value (its
estimate of that site's quality, 0 to 1). It moves through a small state machine:

- **Ruminating:** undecided, hanging around the nest, can be recruited.
- **Wandering:** undecided, out scouting for a site.
- **Recruiting:** committed, back at the nest advertising its site.

The four local rules (this is the part you will get grilled on):

1. **Discovery.** A scout near a site commits to it with probability `discovery x quality`.
   Better sites win you over more easily.
2. **Recruitment (rho).** An undecided agent near a committed neighbour adopts its option
   with probability `rho x that neighbour's commitment`. A more confident neighbour is
   more persuasive.
3. **Cross-inhibition (beta).** A committed agent meeting a rival-committed neighbour
   reverts to undecided with probability `beta x rival's commitment`. More rivals, or a
   bigger beta, means more likely to be silenced. This is the mechanism we study.
4. **Decay and exploration.** Committed agents occasionally drop out on their own (noise),
   or leave to re-scout, so the swarm never locks in permanently and can find the new best.

Plus re-measuring: committed agents occasionally re-sample their site's quality. This is
how the swarm notices the environment changed (their site got worse, so commitment drops,
and meanwhile scouts find the now-better site).

The environment: every 2,500 ticks the better site flips A to B (and back). Quality is not
stored on the site, it is computed from the current tick, which is what makes it change
over time.

---

## 5. The code, how it all fits together

Three files, one pipeline: model, then run, then measure.

### `agents.py`, the agent (the brain)
- `SwarmConfig` holds every parameter, so one run is fully described by its config (the
  sweep just changes beta). It also computes the changing environment via
  `best_option(frame)` and `quality(name, frame)`.
- `SwarmAgent` is the state machine plus the four rules above, in small helper methods
  (`maybe_discover`, `maybe_get_recruited`, `maybe_cross_inhibited`).
- Every tick, `record()` logs each agent's option with `save_data`.

### `simulation.py`, the world and the demo
- `build()` places the nest in the centre and sites A (left) and B (right), stores them
  on the simulation's own object (not a global, so parallel runs do not collide), seeds a
  separate decision RNG, and spawns the agents.
- `headless=True` skips the window (for the sweep). The visible run uses `StatsSimulation`,
  which draws the live overlay (tick, best site, A/B/undecided split, consensus).

### `experiment.py`, the experiment (the science)
- Loops over beta x seeds, runs each headless.
- Measures from the logged data: groups by frame to get the A/B fractions, finds when the
  swarm hits 70% on the new best after each flip (latency), and how often the majority is
  correct (accuracy).
- Saves `results.csv` and the two figures.

### The data flow (one line to memorise)
Each agent `save_data` every tick, then Violet builds a table (one row per agent per tick),
then `experiment.py` turns it into per-frame A/B fractions, then computes latency and
accuracy, then plots.

---

## 6. The experiment, setup to result

**What we vary:** beta, the cross-inhibition strength. Everything else is held constant.

**Sweep:** beta in {0.0, 0.1, 0.2, 0.3}. Held constant: 100 agents, rho, decay, discovery,
radius, layout, and the change schedule.

**Environment:** two sites; the best flips every 2,500 ticks, so each run makes the swarm
form a consensus, then react to a change, repeatedly.

**Metrics (exact):**
- Consensus = at least 70% of agents on one site.
- Switching latency (primary) = after the best flips at tick t, the number of ticks until
  the swarm reaches 70% on the new best. Censored at 2,500 if it never gets there.
- Accuracy (secondary) = fraction of time (after warm-up) the majority is on the best site.

**Runs:** 3 seeds per beta now (4 x 3 = 12 runs, this is what is in `results.csv`).
Scaling to ~30 seeds per beta for A3.

**Statistical test:** Jonckheere-Terpstra trend test, because beta is ordered and latency
is a skewed count. Backed by a linear regression slope.

**Results (trend, exact values in `results.csv`):**

| beta | switching latency (ticks) | accuracy |
|------|---------------------------|----------|
| 0.0  | ~900                      | ~0.73    |
| 0.1  | ~460                      | ~0.83    |
| 0.2  | ~270                      | ~0.90    |
| 0.3  | ~190                      | ~0.93    |

**Two figures:**
- `latency_vs_beta.png`: latency falls sharply as beta rises.
- `timeseries.png`: the shaded background is which site is currently best (green = A,
  red = B); the lines are how much of the swarm is on each; the dotted line is the 70%
  consensus mark. At beta 0 the swarm is slow and mushy and barely tracks the best; at
  beta 0.3 it commits near 100% and flips fast after each change.

**Interpretation (the headline):** stronger cross-inhibition makes the swarm switch faster
and stay correct more often. This contradicts our hypothesis H2 (which predicted lock-in
would slow switching), but it matches what cross-inhibition is known to do (Pais 2013,
Seeley 2012): it breaks the deadlock between options. Without it (beta 0) the swarm cannot
cleanly resolve A versus B, so switching is slow and sloppy. We expect the lock-in we
predicted only at much higher beta, which is the next thing to test, and that would make
the full relationship the non-monotonic shape of our H3.

**Limitations to state ourselves:** only 3 seeds so far (small sample); narrow beta range
(0 to 0.3), not yet high enough to find lock-in; preliminary, and it contradicts our
hypothesis, which we treat as a finding to investigate.

---

## 7. Glossary, parameters and terms

**Parameters (all in `SwarmConfig`):**
- **beta** = cross-inhibition strength. The thing we vary. Chance a committed agent is
  knocked back to undecided by a rival.
- **rho** (the Greek letter, looks like a "p") = recruitment strength. Chance an undecided
  agent is talked into a committed neighbour's option.
- **decay** = chance a committed agent drops out on its own (noise).
- **discovery** = base chance of committing to a site you found, scaled by its quality.
- **explore** = chance a committed agent leaves to re-scout (keeps the swarm adaptable).
- **q_high / q_low** = quality of the best site vs the other one.
- **switch_every** = ticks between the best site flipping (2,500).

**Terms:**
- **Headless** = run the simulation without opening the window or drawing anything. Same
  maths, no picture, much faster. Used for the experiment. The visible run is only for
  watching.
- **Cross-inhibition, mutual?** Each agent only ever changes its own state (it can revert
  itself). But every agent runs each tick and proximity is mutual, so when a green and a
  red agent meet, each independently rolls its own chance to drop out. Net effect: both
  sides suppress each other.
- **Consensus** = at least 70% of the swarm on one option.
- **Seed** = the random-number starting point. Same seed gives the same run, so we use
  several seeds per beta to average out randomness.
- **Jonckheere-Terpstra test** = a non-parametric test for a monotonic trend across
  ordered groups. It asks "as beta increases, does the outcome consistently go up or
  down?". It works on ranks, so it does not assume the data is normally distributed.
  Different from a t-test (only 2 groups) and from ANOVA / Kruskal-Wallis (those ignore
  the ordering of beta). It fits us because beta is ordered and we predict a direction.

---

## 8. Q&A prep

- *Independent and dependent variable?* beta / switching latency (and accuracy).
- *How does cross-inhibition work in code?* a committed agent meeting a rival-committed
  neighbour reverts to undecided with probability beta x the rival's commitment; both
  agents in a pair each roll this on their own turn.
- *How does the environment change reach the agents?* committed agents re-measure quality,
  see their site got worse, commitment drops; meanwhile scouts find the now-better site.
- *Why two options, and why re-measure in place instead of walking back to the site?*
  binary is the canonical cross-inhibition setup; in-place re-measuring keeps agents at
  the nest so consensus can actually form (a bug we hit and fixed).
- *Your result contradicts your hypothesis?* Yes, and it is explainable: cross-inhibition
  breaks deadlock, so the swarm commits and switches faster. Lock-in likely shows only at
  higher beta.
- *Why Jonckheere-Terpstra?* ordered beta, skewed count outcome; it tests a monotone trend
  specifically.
- *How many runs?* 4 beta x 3 seeds = 12 now, scaling to 30 seeds for A3.
- *Why 70% for consensus?* a clear majority above the 50% noise line; standard quorum
  choice, robust to nearby thresholds.

---

## 9. What everyone must be able to do

1. State the research question (model, variable, outcome) in one sentence.
2. Explain the four agent rules and which one is cross-inhibition.
3. Read the timeseries plot out loud (shaded = best site, lines = swarm split, dotted =
   consensus).
4. Say why the result contradicts H2 and why that is still a good result.

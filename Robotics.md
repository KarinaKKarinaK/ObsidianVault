### the repo

= a pipeline that turns a natural-language task description ("make the robot walk forward") into a trained RL policy, with LLMs handling the hardest part: writing the reward function. 

How it does it:

1. An LLM writes reward code (this is the part Eureka pioneered).
2. A Code Review step sanity-checks that code before it runs.
3. The reward trains a policy in IsaacLab (NVIDIA's sim).
4. Two judges evaluate the trained policy: a Code Judge (reads code and training stats) and a VLM Judge (watches video of the policy).
5. A Synthesizer combines those two judgments into one feedback signal, with the option to re-query if it's uncertain.
6. A Revise Agent rewrites the reward, pulling past attempts via tool-use, and the loop repeats.

So basically its Eureka, but with multimodal judging and a smarter revise loop

### My 3RQs:

_RQ1, multi-judge ensemble._ Right now one VLM provider judges per round. Here we are basiclaly asking: if Claude, Gemini, vLLM, and Ollama all judge in parallel alongside the Code Judge, do they disagree, and is that disagreement itself a useful signal that the evaluation is unreliable? 
--> The novelty here is using disagreement as a calibrated uncertainty signal, not just averaging scores or doing majority vote.

_RQ2, evolutionary search plus revise loop._ Currently when a reward fails, the Revise Agent rewrites it along one lineage. Eureka-style systems often try many candidates in parallel; ReEvo adds crossover and mutation. 
What I'd do here: run a population of rewards, let the Synthesizer's failure tags guide which ones get mutated or crossed over, then refine the survivors with the existing revise loop. The hypothesis = population (exploration) plus revise (exploitation) beats either alone.

_RQ3, manipulation, not just locomotion._ Most LLM-reward papers test on locomotion (walking, hopping) because rewards like "go forward fast" map cleanly to physics. Manipulation is harder: rewards are sparse (you only know if you succeeded at the end), horizons are long, and contact dynamics ("press gently, then twist") are hard to put in code. here I'd be asking: where exactly does Prompt2Policy break on manipulation, at the intent elicitation step, the reward authoring step, the training step, or the judging step? So a failure-mode study, publishable in its own right?

### Quick Definitions

_Reward function:_ the equation telling an RL agent what counts as good behavior. Notoriously hard to design by hand for complex tasks, which is why LLMs writing them is interesting.

_Eureka (NVIDIA, 2023):_ the seminal paper for "LLM writes reward code, evaluate via training stats, iterate." Everything in this space is downstream of it.

_Text2Reward:_ parallel work, more structured/templated reward generation.

_ReEvo:_ evolutionary algorithms (selection, crossover, mutation) applied to LLM-generated code or solutions.

_LLM-as-judge:_ using an LLM to evaluate outputs rather than relying on fixed numeric metrics.

_VLM (Vision Language Model):_ a model like Claude or Gemini that can look at video clips of a policy rolling out and reason about whether the behavior looks correct.

_IsaacLab:_ NVIDIA's GPU-accelerated robotics sim, ships with locomotion and manipulation suites (Franka arm, UR10, dexterous hands).

_Sparse vs. dense reward:_ dense gives feedback every step, sparse only at the end. Manipulation is usually sparse, which is why it is hard.

_Ensemble disagreement as uncertainty:_ if four judges agree, trust the score; if they split, the evaluation itself is suspect. Classic idea in ML, underexplored for VLM judges.

_Iterative refinement vs. population search:_ refinement walks one trajectory through the space of rewards; population searches many in parallel. Different exploration/exploitation profiles.

---
Looking into the Rqs: - feedback from LLMs hahahh

- RQ1 seems to be the most novel methodologically (multi-VLM disagreement as uncertainty is genuinely underexplored).
- RQ2 is the most mechanically interesting, but ReEvo already exists, so you will need to articulate the delta cleanly (the Synthesizer's failure tags guiding mutation is the actual new bit).
- RQ3 is the most practically valuable and easiest to scope, but it is an empirical study, not a method paper, so the framing matters more.

---

## Related Notes
- [[Robotics/00 - Robotics MOC]] — full robotics knowledge base
- [[Robotics/02 - Recent Breakthroughs 2023–2025]] — Eureka, RT-2, π0, and other key 2023–2025 papers
- [[Robotics/08 - Key Subfields & Concepts]] — RL for robots, sim-to-real, IsaacLab, VLAs
- [[Robotics/07 - Key Bottlenecks]] — compute constraints, sim-to-real gap
- [[Robotics Last Meeting Notes]] — D2C, COvolve, OMNI, ACCEL research
- [[ML/Lecture 12 — Reinforcement Learning]] — RL theory underlying reward functions and policy training


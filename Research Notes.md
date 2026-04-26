1min pitch = 
Language-conditioned robot policies assume a clean task description, but real deployment doesn't give you that. I work on context compaction for LLM agents at Orq.ai and the methods transfer cleanly: you compact the messy task description into something task-relevant before it conditions the policy. RQ1 tests this on TeNet with noisy Meta-World descriptions. RQ2 asks the same question for ETAPE's foundation-model setup. RQ3 uses failure-driven analysis to characterize what information robot policies actually need, which is a contribution even if the compaction doesn't help. Timeline to mid-August, workshop-paper scope.



A **language-conditioned policy** is a function that takes text and produces robot behavior. Text can enter the pipeline in three places:

1. **Instruction to a high-level planner** — "make coffee" → planner breaks it into steps.
2. **Conditioning signal to a policy network** — the text becomes an embedding that tells the network "you are now a coffee-making policy."
3. **Joint vision-language-action model** — text + pixels → motor commands, end to end.

**TeNet sits in category 2.** Text is used once to instantiate a compact policy via a hypernetwork, then thrown away. The policy runs on state alone.

### What I want to research

In all three categories, the quality of the text matters. Noisy text → noisy embeddings → degraded policy. Context compaction is a preprocessing step that cleans the text before it enters the pipeline.

### Formal framing
- Policy: **π(a | s)** maps state to action.
- Language-conditioned policy: **π(a | s, ℓ)** adds a language input ℓ.
- In TeNet, ℓ is only consumed at instantiation time to pick which policy is running. The policy itself operates on state s only.

**My research direction:** not touching the control part, only touching the language part.

---

## The core asymmetry

The LLM's text encoder is attention-based. In principle it can ignore irrelevant tokens. In practice, irrelevant context degrades performance anyway. This is the **"lost in the middle"** phenomenon, well-documented (Liu et al. 2024, also in my recent LinkedIn post from Orq).

### Anticipated pushbacks

**"Why not just let the LLM handle it?"**
Because LLMs demonstrably don't handle long noisy context well, and when the output is downstream-conditioning (not just text generation), the noise can propagate into the generated policy in ways that are hard to predict.

**"Why do you expect noise in the task description? TeNet assumes it's clean."**
That's the assumption I want to stress-test. Real deployment scenarios involve multi-turn specification.

**"TeNet uses the LLM only at instantiation. Why would compaction help if the expensive step runs once?"**
Because the quality of that one step determines every subsequent action for the lifetime of the policy. Instantiation-time compute is cheap; getting instantiation-time *signal* wrong is expensive.

**"Robotics is different, your NLP methods won't transfer."**
The specific signal that's load-bearing will differ, yes. That's exactly what RQ3 is designed to characterize. But the evaluation framework (paired trajectories, failure-driven analysis, guideline optimization) transfers cleanly.

---

## Context compaction approaches

### Summarization-based

- An LLM reads the history and produces a structured summary.
- Anthropic's `compact-2026-01-12` does this. Claude Code does this.
- **Strengths:** interpretable, high fidelity.
- **Weaknesses:** expensive, introduces LLM-call latency.

### Token-level pruning

- Score each token by importance, drop the low-scoring ones.
- **LLMLingua-2** does this using a BERT classifier distilled from GPT-4.
- **Strengths:** fast, cheap, no extra LLM call.
- **Weaknesses:** can break grammar, less interpretable.

### Observation pruning / masking

- Don't touch the reasoning, just replace verbose tool outputs with placeholders like `[output masked, 2,847 tokens]`.
- Surprisingly effective. **ACON** extends this.

---

## ACON (Agent Context Optimization), Oct 2025

### Key innovation

1. Take paired trajectories: same task, run once with full context (succeeds), once with compressed context (fails).
2. Ask a capable LLM to analyze *why* the compressed version failed. What information was lost?
3. Use that analysis as a "natural language gradient" to update the compression guideline (the prompt that controls the compressor).
4. Iterate. Eventually distill the optimized compressor into a smaller model.

### Results

26–54% peak token reduction on AppWorld, OfficeBench, Multi-objective QA while preserving 95%+ task accuracy. Gradient-free (no weight updates), so works with any API model.

### Why it matters for this proposal

**ACON's methodology is directly portable to my research setting.** Run TeNet with raw task descriptions (baseline), run with compressed (compare), failure-analyze the divergences, update the compression guideline. **This is the core of RQ3.**

---

## The mathematical object is the same

In both agentic NLP and robot policy conditioning, there's a map:

> **long text → short representation → downstream action**

The loss function differs (tool-call success vs. robot task execution) but the information-theoretic problem is the same: *what subset of the input text is load-bearing for the downstream action, and what can be dropped?*

### Headroom in practice

Framework used at Orq.ai for deciding when to fire the compactor in long agentic sessions. Track tokens-per-task across a session, not just per-request.

---

## Hypernetworks

A **hypernetwork** is a neural network whose output is the weights of another neural network. A function factory.

- **Normal network:** input → output
- **Hypernetwork:** task description → weights of a small policy network
- **Generated policy then runs:** state → action

### Why this is powerful for robotics

The policy network can be tiny (fast enough for real-time control), because all the heavy lifting is done once by the hypernetwork at instantiation time. Pay the LLM cost once, not per action.

### TeNet's twist

The hypernetwork is conditioned on **text embeddings from a pretrained LLM**. Effectively: "describe the task in English, receive a compact policy ready to execute."

---

## Meta-World and MuJoCo

- **Meta-World** = benchmark of 50 manipulation tasks in MuJoCo.
- **MuJoCo** = physics simulator, the standard sim environment for robot learning.
- Standard in multi-task and meta-learning RL.
- Each task has a clean, hand-written description like "push the red block to the goal."
- **TeNet was evaluated on Meta-World.**

### For my proposal

Don't change the tasks, just change the descriptions. Instead of the clean hand-crafted ones, feed in noisy variants (paraphrases, multi-turn, trace-embedded) and measure degradation. Then compact and measure recovery.

---

## ETAPE

**Embodiment- and Task-Aware Parameter Embeddings for Robotic Foundation Models.**

### Problem it addresses

Robotic foundation models (large models trained on many robots, many tasks) struggle when deployed on a new robot or a new task because they can't reliably figure out:

- Which robot they're controlling (embodiment problem)
- What task they're supposed to be doing (task-identification problem)

### ETAPE's proposal

Structure the model's internal embedding space so embodiment and task are explicit, separable dimensions.

---

- I think the research question is only interesting if the downstream system is a robot policy. Text-summary-for-text-summary-sake isn't novel. Robot-policy-conditioning is what makes this publishable.

- **"What's the minimum viable version of this project?"**
    - RQ1 only, on Meta-World, with one compactor (LLMLingua is the cheapest and fastest), one noise type (paraphrase), and the standard Meta-World success metric. That's a 6-week project on its own and still yields a clean empirical result.
- ETAPE accepts negative results as valuable
	- RQ3 framing: even if compaction doesn't help TeNet performance, the failure analysis itself characterizes what robotic policies need from their text conditioning. This is a positive contribution regardless of the compaction verdict.

#### RQ3 - borrowed from ACON
- 1. **Run two conditions on the same tasks.** Condition A: clean task description (or compacted version). Condition B: noisy task description (or full raw version). Same Meta-World tasks, same TeNet backbone.

2. **Find the divergences.** Cases where A succeeds and B fails. These are the informative examples, because they tell you something changed _because of the text difference_.

3. **Diff the inputs and analyze the failures.** For each divergence, ask a capable LLM (or inspect manually) what information was present in A but absent or distorted in B. Categorize the answer.

4. **Build a taxonomy.** After enough divergences, patterns emerge. Maybe spatial relations are dropped disproportionately often. Maybe temporal ordering survives but object identity doesn't. Maybe the policy collapses whenever a specific syntactic structure is removed, regardless of semantic content.

5. **Report that taxonomy.** That taxonomy is your contribution. It tells the field: "here are the information categories that a TeNet-style language-conditioned policy is actually sensitive to. Preserving these matters. Dropping these doesn't."

---

For RQ1 --> "clean vs noisy" descriptions
Noisy = 
- Paraphrase variants: GPT-generated rewordings of each Meta-World task description. Tests robustness to lexical variation.
- Dialog-embedded variants: task description wrapped in a simulated multi-turn conversation with clarifications and corrections. Tests robustness to structural noise.
- Trace-embedded variants: task description mixed with simulated agent tool-call traces. Tests robustness to irrelevant content.
+
- "How do you generate the noisy variants?" → GPT-4 class model to generate paraphrases and dialog wrappers. Document the generation prompt for reproducibility. Sanity-check a sample by hand.
- "What's your metric?" → Meta-World task success rate (standard), plus RoboEval-style diagnostic metrics for failure-mode analysis.
- 
- "How many seeds?" → Standard in the field is 5-10 seeds for RL results. TeNet policies are more deterministic post-instantiation, but the instantiation itself is stochastic, so you need multiple instantiations per description.

---


> "Even in the world where compaction turns out to be the wrong intervention, the paired-trajectory analysis in RQ3 gives us a characterization of what language-conditioned policies are actually sensitive to in their text input. That's a contribution about the class of systems, not about compaction specifically. It's the kind of empirical taxonomy the field doesn't have yet for TeNet-style architectures."
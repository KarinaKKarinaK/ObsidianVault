# Synthetic Data Generation in Practice: How to Generate, Filter, and Avoid Self-Destructing Your Model

## Takeaways

1. **Accumulate, never replace.** Synthetic data is additive, not substitutive. Phi-4 (14B) beat GPT-4o on GPQA and MATH with ~40% data-mixture weight from synthetic — but blended on top of real seeds, not in place of them. Replace-only loops collapse; accumulate loops don't.
2. **The filter is the product.** Pipelines generate 3–5x what they keep. Quality lives in the filter stack (schema → verifier → judge → dedupe), not in clever generation prompts. Skip it, train on noise.
3. **Generator diversity is the jury argument, re-applied.** A single-generator dataset carries that generator's style, hedges, and biases. Mix providers and methods for the same reason an LLM jury beats a single judge: independent error surfaces.

---

## The Do's and Don'ts (at a glance)

The operational summary. The rest of this doc explains the reasoning behind each row.

| Decision | Do | Don't |
|---|---|---|
| Real vs synthetic mix | Accumulate synthetic on top of real data. Keep real data in every iteration. | Replace real data with synthetic. This is the canonical model-collapse setup. |
| Generator choice | Use multiple providers for diversity (Anthropic + OpenAI + open-weights, or similar). | Train a student on a single teacher and call it done. Style and bias inherit. |
| Generator vs judge separation | Use different model families for generation and for filtering. | Filter Claude-generated data with Claude. Self-preference bias inflates pass rates. |
| Volume strategy | Generate 3 to 5x what you plan to keep. Aggressive filter. | Generate exactly what you need. No headroom for filtering means low-quality data ships. |
| Verification | Use mechanical verifiers (run code, check math, parse schema) wherever the task allows. | Trust the generator's self-reported correctness. It is consistently overconfident. |
| Diversity | Persona-condition, prompt-evolve, or seed from real-user inputs. Measure embedding spread. | Generate 50K examples from one prompt template. The set will collapse to a few modes. |
| Deduplication | Embed and dedupe with cosine threshold 0.85 to 0.92 before train/eval split. | Dedupe after splitting. You'll leak train examples into eval. |
| Eval data | Hold out a real eval set the generator has never seen. Decontaminate semantically. | Generate synthetic eval from the same pipeline as synthetic train. You'll measure memorization. |
| Bias control | Audit for stereotype amplification on a labeled probe set. | Assume synthetic data is bias-neutral because it isn't human. Generators carry training-data bias. |
| Hallucination | Filter on factuality with a verifier or jury. Pair every example with grounding when possible. | Ship unverified generations into fine-tuning. Hallucination amplification under unverified pipelines is widely reported (one preliminary study reports up to 4.7x). |
| Provenance | Log generator model, version, prompt, temperature, and timestamp per example. | Lose track of which model produced which row. You will need this when something breaks. |
| Iteration loop | Iterate: generate, filter, train, eval, inspect failure modes, update prompts. Expect 2 to 3 cycles. | Generate once, ship, hope. The first run reveals your real failure modes, not your final pipeline. |
| Format compliance | Validate schema and structure before semantic checks. Cheapest filter first. | Run expensive LLM-judge filtering on data that fails basic format checks. |
| Domain coverage | Audit topic distribution against your target use case. Fill gaps with targeted generation. | Generate uniformly and assume coverage matches usage. It rarely does. |

---

## Synthetic data for orq.ai-shaped use cases

Most of the literature on synthetic data — Phi-4, Alpaca, Magpie, the Persona Hub mega-set — is about **pretraining and fine-tuning**. That is not where most orq.ai users live. The three use cases that actually show up in production agent and LLM pipelines are: **evaluation datasets**, **red-team / adversarial sets**, and **multi-turn agent trajectories**. Each one inherits the do's and don'ts above, but with a different center of gravity.

### Eval-dataset generation

The most common reason a team reaches for synthetic data is that they need an evaluation set and don't have one. The trap: it is tempting to generate the eval set with the same pipeline you'd use for training data, then "use it to measure quality." This measures the generator's consistency with itself, not real-world performance.

Operational shape that does work:

- **Seed from real production traces** (sampled in orq.ai), not from a blank prompt. The eval distribution should mirror the production distribution.
- **Generate pairs and edge cases**, not single examples. For judge eval: contrastive pairs (clearly good vs clearly bad, plus borderline). For regression: known-failure replays plus paraphrased variants.
- **Decontaminate semantically against the held-out real eval set.** N-gram dedup is not enough — [Yang et al. (2023)](https://arxiv.org/abs/2311.04850) is the canonical demonstration that rephrasing defeats it.
- **Generate with one provider; judge with another.** Self-preference bias compounds when generator and judge share a family.

Sharpest tradeoff: synthetic eval is good for *coverage* (you see failure modes you'd otherwise miss for months), and bad for *absolute scoring* (the numbers drift toward the generator's prior). Use synthetic eval to find bugs; use real held-out eval to measure progress.

### Red-team / adversarial generation

Adversarial prompt generation has the cleanest cost-benefit profile of the three. Real adversarial data is scarce by definition — you can't crowdsource a thousand novel jailbreaks — and the failure-mode space is long-tailed, exactly the situation where synthetic generation pays off most.

Patterns that work in practice:

- **Attacker personas.** The Persona Hub approach generalizes: condition on attacker archetypes (curious user, jailbreaker, social engineer, prompt-injection author, regulated-domain abuser). Each archetype hits a different surface.
- **Harm-category coverage.** Start from a taxonomy. External anchors worth pointing at: [MLCommons AILuminate v1.0](https://mlcommons.org/benchmarks/ailuminate/), the [NIST AI RMF GenAI Profile (AI 600-1)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), and the [OWASP Top 10 for LLM Applications (2025)](https://owasp.org/www-project-top-10-for-large-language-model-applications/). For each category, generate N adversarial prompts × M phrasings. Measure coverage *before* measuring pass-rate.
- **Evol-Instruct works in reverse here.** Start from a known-bad prompt the model now refuses; evolve it toward subtlety (rephrase, add context, embed in a benign frame). This is how you find the next refusal-bypass without waiting for a real user to.
- **Structured automation is starting to land.** [Learning-Based Automated Adversarial Red-Teaming (arXiv:2512.20677)](https://arxiv.org/abs/2512.20677) frames red-teaming as a meta-prompt-guided adversarial search with hierarchical execution across standardized threat categories (reward hacking, deceptive alignment, sandbagging, tool misuse, CoT manipulation) — more rigorous than persona-conditioning alone, and aligned with the direction the field is moving.
- **Production example.** Anthropic's [Constitutional Classifiers](https://www.anthropic.com/research/constitutional-classifiers) ([paper](https://arxiv.org/pdf/2501.18837)) trained safety classifiers on synthetically generated adversarial prompts plus auto-red-teamed variants — a worked example of end-to-end synthetic red-team pipelines in production.
- **Always pair with a separate-family judge.** A red-team set is worthless if your safety classifier was trained by the same lab that wrote the model that generated the adversarial set.

(This stream of work has a dedicated home in the team's `10 - Red Teaming/` track; the do's and don'ts above translate directly.)

### Multi-turn agent trajectories

Agents are where synthetic data is hardest and most useful. Single-shot instruction-response generation is a solved-enough problem; **conversation, tool use, and trajectory-level synthesis** are still open. The shape of the data is also different — each example is a tree of (user turn → agent turn → tool call → tool return → agent turn → …), not a pair.

What we've seen work and what to avoid:

- **Use a user-simulator + agent-rollout setup.** One LLM plays the user (with a goal and a persona), the other is the agent under test. Roll out the conversation, log the trajectory, label it from the simulator's goal-completion signal. This is the conversational analog of Self-Instruct.
- **Generate tool-use trajectories from a tool schema, not from text.** Seed with the tool's JSON schema and a goal; let the model produce the call sequence; verify mechanically (did the args parse, did the call succeed). The verifier is much stronger than for prose. [TOUCAN (Xu et al., 2025)](https://arxiv.org/abs/2510.01179) is the canonical reference here — 1.5M tool-agentic trajectories generated from ~2,000 real-world MCP tools across 495 environments, validated with rule-based + model-based checks. Models fine-tuned on TOUCAN beat closed-source baselines on BFCL V3.
- **Blueprint-first, then rollout.** [APIGen-MT (Prabhakar et al., NeurIPS 2025)](https://arxiv.org/abs/2504.03601) splits generation into two stages: (a) a committee of LLM reviewers builds a verified task *blueprint*, (b) the blueprint is realized through simulated agent-human interplay. xLAM-2-70b trained on this data hits 78.19% on BFCL v3 and 56.2% on τ-bench — beating GPT-4o. The blueprint-first pattern is worth borrowing even if you don't use their stack.
- **Watch for trajectory monoculture.** A single user-simulator generates conversations that all look like the same person. Vary persona, goal complexity, and turn budget the way you'd vary seed prompts in Self-Instruct.
- **Don't synthesize the user *and* the success label with the same model.** That's self-grading. Pull the success signal from the tool layer (did the booking happen?) or from a separate judge.

The economics here are different from instruction tuning: a single agent trajectory can cost as much as 50 single-turn pairs (more turns, more tool calls). This pushes you toward smaller, more curated synthetic sets and harder filtering.

---

## When to use synthetic data

Synthetic data is appropriate when one of these is true:

- **Real data is scarce, private, or expensive.** Healthcare, legal, financial QA, and any domain where annotators cost more than compute.
- **You need long-tail coverage.** Edge cases, rare phenotypes, multi-step reasoning, adversarial inputs. Real corpora under-represent these by construction.
- **You need controlled distributions.** Programmatically generated math, code, structured outputs, function-calling traces, where ground truth is mechanically verifiable. Code is the cleanest case — a working interpreter is the verifier — which is why the synthetic-data literature on code is more mature than the literature on prose (see [Nadas et al., 2025 survey](https://arxiv.org/abs/2503.14023) for the text-vs-code split).
- **You need evaluation pairs.** Pointwise/pairwise judge inputs, regression sets, red-team prompts. Especially useful when you can pair generation with a verifier.

(For the inverse — when it's the *wrong* tool — see the dedicated "When NOT to use" section below.)

---

## How synthetic data fails (the real risks)

There are four well-documented failure modes. Internalizing them is what separates a useful pipeline from a feedback loop that quietly degrades the model over a quarter.

### 1. Model collapse (and the nuance everyone misses)

[Shumailov et al. (Nature, 2024)](https://www.nature.com/articles/s41586-024-07566-y) showed that recursively training a generative model on its own outputs causes irreversible loss of the tails of the original distribution. After enough iterations, the model produces gibberish. This finding made headlines, was widely misread as "synthetic data poisons models," and is still cited incorrectly in product docs. Schaeffer, Kazdan et al. (2025) push back on the popular reading directly in [*Position: Model Collapse Does Not Mean What You Think*](https://arxiv.org/abs/2503.03150) — cataloguing 8 distinct definitions of collapse across 3 families (test-loss degradation, distribution deformation, data-scaling failure) and arguing several "canonical" collapse scenarios rely on unrealistic assumptions.

The operational nuance comes from [Gerstgrasser et al. (2024)](https://arxiv.org/abs/2404.01413) and follow-up work ([Kazdan, Schaeffer et al., 2025, *Collapse or Thrive?*, ICML](https://arxiv.org/abs/2410.16713)): collapse happens when each generation **replaces** real data. When synthetic data **accumulates** on top of the original real corpus, test error has a finite upper bound, independent of the number of iterations. The Stanford SALT Lab et al. result is empirical (causal transformers on text, diffusion models on molecules, VAEs on images) and analytically proved in a tractable linear-model setting. A 2026 follow-up, [*Escaping Model Collapse via Synthetic Data Verification*](https://arxiv.org/abs/2510.16657), proves both analytically and empirically (linear regression, VAEs on MNIST, SmolLM2-135M on XSUM) that injecting a verification step prevents collapse — at the cost of drifting toward the verifier's "knowledge center" long-term. So the verifier becomes the new ceiling, which is exactly why the filter stack is load-bearing.

```
Test error
  │
  │                                          replace loop ↗ (unbounded)
  │                                       ↗
  │                                    ↗
  │                                 ↗
  │                              ↗
  │                           ↗
  │                        ↗
  │                     ↗
  │                  ↗
  │               ↗
  │            ↗
  │  ──────────────────────────────────────── accumulate loop (bounded)
  │
  └─────────────────────────────────────────────────► training iteration
```

*Figure 1 (schematic, after Gerstgrasser et al. 2024). With the same real corpus held constant, replace-style retraining drives test error up without bound; accumulate-style retraining converges to a finite ceiling. A polished version of this chart belongs in the published post — placeholder for now.*

**Operational implication:** never delete real data when adding synthetic. Always blend.

### 2. Bias inheritance and amplification

Synthetic data carries the generator's biases by construction, and fine-tuning on it can amplify those biases on downstream tasks. [*Understanding and Mitigating Bias Inheritance*](https://arxiv.org/abs/2502.04419) (Li et al., 2025) studies 6 bias types across 10 classification and generation tasks and shows the amplification is nuanced (sometimes amplification, sometimes neutralization, depending on bias ratio).

This is the synthetic-data analog of self-preference bias in LLM juries: a Claude-generated dataset will subtly skew toward Claude's response style, hedging patterns, refusal heuristics, and format preferences. Train a student on a single teacher and the student inherits the teacher.

**Operational implication:** use multiple generators when possible, the same way a jury uses multiple judges. Provider diversity reduces inherited bias.

### 3. Hallucination propagation

If your generator hallucinates 5% of the time and you don't verify, your training set is now 5% wrong with high confidence. Worse, the errors are fluent, plausible, and pass surface-level QA. One preliminary study ([Silva-Atencio, 2025](https://ojs.bonviewpress.com/index.php/AIA/article/view/6620)) reports unverified synthetic data can increase downstream hallucination rates by up to 4.7x while improving perturbation resistance by 23%. The specific multipliers come from a single low-profile-venue paper and should be treated as directional, not load-bearing — but the underlying tradeoff (fluent errors compound without verification) is widely observed.

**Operational implication:** every synthetic example needs a verification path. For verifiable tasks (math, code, structured extraction), run the verifier. For non-verifiable tasks, use an LLM jury (see Arian's post) or human spot-checks.

### 4. Test set contamination

Generators trained on the public internet have seen the benchmarks. [Phi-1](https://arxiv.org/abs/2306.11644) (Gunasekar et al., 2023) is a useful case: the authors themselves disclosed n-gram overlap between their synthetic CodeExercises and HumanEval, then ran a "strong-form" decontamination pass (removing &gt;40% of CodeExercises) and re-evaluated. Even with that level of author transparency, contamination is hard to fully rule out. [Yang et al. (2023)](https://arxiv.org/abs/2311.04850) showed a 13B model can hit GPT-4 level scores on MMLU by training on rephrased test data that bypasses n-gram decontamination. Embedding-based detection often can't tell rephrased test items from real same-topic items.

**Operational implication:** decontaminate generated data against your eval set with semantic similarity, not just n-grams. If you can't verify decontamination, hold out fresh eval data the generator hasn't seen.

---

## Generation strategies: what they are and when to use them

Most production pipelines mix two or three of these. Pick by task structure, not by hype.

A useful organizing axis (borrowed from [Alismail & Lanquillon's 2025 survey](https://link.springer.com/chapter/10.1007/978-3-031-93418-6_9)): **single-LLM methods** (Self-Instruct, Evol-Instruct, Persona Hub, Magpie, distillation) generate examples with one model and a clever prompt. **Agentic-workflow methods** (TOUCAN, APIGen-MT, Meta's Matrix) chain multiple LLM roles — reviewer, simulator, verifier — to produce examples no single prompt could. The 2026 frontier is agentic; the well-understood ground is single-LLM. Start with the single-LLM methods below, graduate to agentic workflows when your verifier or rollout logic needs the extra structure.

### Self-Instruct ([Wang et al., 2022](https://arxiv.org/abs/2212.10560))
The classic. Seed with a small hand-written set (the original paper used 175 tasks), prompt a strong LLM to generate similar ones, filter, repeat. Stanford's Alpaca ([repo](https://github.com/tatsu-lab/stanford_alpaca), [CRFM post](https://crfm.stanford.edu/2023/03/13/alpaca.html)) used this to fine-tune LLaMA-7B on 52K examples. Cheap, well-understood, weak on diversity (the generated set tends to inherit the seed style). [Reference implementation](https://github.com/yizhongw/self-instruct).

### Evol-Instruct ([Xu et al., 2023, WizardLM](https://arxiv.org/abs/2304.12244))
Take an existing instruction and prompt the LLM to make it **harder** along specific axes: add constraints, deepen reasoning, increase complexity, broaden scope. Generates harder examples than Self-Instruct without needing harder seeds. Best for instruction-following datasets where seed difficulty caps the ceiling. [Reference implementation](https://github.com/nlpxucan/WizardLM/tree/main/Evol_Instruct).

### Persona Hub ([Ge et al., 2024](https://arxiv.org/abs/2406.20094))
Condition generation on a persona description. Tencent released 1 billion personas curated from web data ([HF dataset](https://huggingface.co/datasets/proj-persona/PersonaHub), [code](https://github.com/tencent-ailab/persona-hub)). A prompt like "as a structural engineer in Lagos, write a math problem about bridge load distribution" generates semantically different math problems than "as a high school teacher in Texas." Persona-conditioning is, in our experience, one of the cheaper mechanisms for breaking generator monoculture — though it has not been benchmarked head-to-head against Evol-Instruct or multi-generator panels.

### Magpie ([Xu et al., 2024](https://arxiv.org/abs/2406.08464))
Exploits a quirk of aligned models: prompt them with only the template prefix (no user message) and they hallucinate plausible user messages. Generate instruction-response pairs without any seeds. t-SNE analysis showed Magpie-Pro coverage exceeds Alpaca + Evol-Instruct + [UltraChat](https://huggingface.co/datasets/stingning/ultrachat) combined. Weakness: it follows the aligned model's natural distribution, so it underperforms on narrow domains (specialized code, medical, internal tooling). [GitHub](https://github.com/magpie-align/magpie) · [HuggingFace org with datasets and models](https://huggingface.co/Magpie-Align).

### Distillation
Use a strong teacher to generate outputs for prompts from your real input distribution. Phi-4 and most modern small models lean on this. The most-disclosed industrial example is [NVIDIA Nemotron-4 340B (2024)](https://arxiv.org/abs/2406.11704), where ~98% of the alignment data was synthetic. Note: self-training (model on its own outputs) often matches teacher distillation on hallucination reduction ([Lewis et al., 2025](https://arxiv.org/abs/2502.19545)), likely due to exposure-bias mitigation.

### CoT-Self-Instruct ([Yu et al., Meta FAIR, 2025](https://arxiv.org/abs/2507.23751))

Prompt the generator to reason via chain-of-thought first, then produce the example. The intermediate reasoning surfaces complexity and constraint that single-shot generation flattens out. Outperforms s1k and OpenMathReasoning on MATH500, AMC23, AIME24, GPQA-Diamond.

---

## Filtering: where the quality actually comes from

A reasonable rule of thumb across the literature: generate 3 to 5x what you intend to keep, then aggressively filter.

The filter stack:

1. **Format and parseability.** Cheapest first. Discard anything that fails schema or regex.
2. **Verifier when available.** Math: run the answer. Code: run tests. Structured extraction: compare to ground truth. This is the highest-signal filter you can have.
3. **LLM-as-judge.** Apply the jury pattern from the companion post. For subjective quality (helpfulness, clarity, faithfulness), a 3-model panel beats a single judge and costs less than a large one. Critical: the judges should not be from the same family as the generator (self-preference bias).
4. **Deduplication.** Embed each example, compute pairwise cosine, drop anything above the threshold. Working practitioner ranges: 0.85 for aggressive, 0.92 for permissive (not anchored to a single paper — tune to your embedding model and domain). Run before splitting train/eval, not after.
5. **Diversity scoring.** [QDIT (Bukharin et al., 2023)](https://arxiv.org/abs/2311.14736) and similar greedy approaches optimize a joint quality-diversity score. Useful when you have more candidates than budget.

A working heuristic (practitioner-derived, not from the literature): if your filter is keeping more than 50% of generated examples, your filter is too loose or your generator is too good (rare). If it's keeping less than 10%, your generator is too noisy or your prompts are wrong.

You don't have to build this stack from scratch. [Argilla's Distilabel](https://github.com/argilla-io/distilabel) ([docs](https://distilabel.argilla.io/latest/)) is the most-used open-source framework for chaining generation + AI-feedback + filtering steps. [NVIDIA NeMo Curator](https://github.com/NVIDIA-NeMo/Curator) runs at GPU scale and powers Nemotron-CC. [DataDreamer (ACL 2024)](https://github.com/datadreamer-dev/DataDreamer) emphasises reproducibility — the closest open tool to "provenance Do/Don't" in our table.

---

## Provider and method diversity matter

A dataset where every example came from one model carries that model's stylistic and epistemic signature. Mixing generators (one Anthropic, one OpenAI, one open-weights) gives you the same benefit a diverse jury gives an evaluation pipeline: independent error surfaces.

This is no longer just intuition. [*Synthetic Eggs in Many Baskets*](https://arxiv.org/abs/2511.01490) (ACL Findings 2026) studied three axes empirically and found: higher source diversity mitigates distribution collapse; synthetic data preserves output quality but reduces adversarial robustness more than human data; **single-source synthetic data weakens the de-biasing effect of fine-tuning**. The last finding is the load-bearing one — generator diversity is a bias-control mechanism, not just a stylistic one.

This matters more for subjective and reasoning data (where style and framing carry signal) than for verifiable data (where the answer is the answer).

---

## When NOT to use synthetic data

Synthetic data is not free, and it is not always the right tool.

- **When real data exists and is accessible.** Synthetic data is a substitute for missing real data. If you have real data, use it. Augment only if you have a specific gap.
- **For final evaluation.** Synthetic eval data measures consistency with the generator, not real-world performance. Hold out a real eval set.
- **For modeling rare humans.** User-behavior models, recommendation systems, and demographic studies need real distributions. Generators don't sample from the real human distribution; they sample from the training-data distribution of a model.
- **When you cannot verify outputs.** If no mechanical or judge-based verifier exists for your task, synthetic data risk is hard to bound. Pause and build the verifier first.
- **For high-stakes domains without expert review.** Medical, legal, financial. Generator confidence is uncalibrated. Human expert review is non-optional, regardless of how good the generator looks.

---

## Key stats and reference numbers

| Number | What it is | Source |
|---|---|---|
| ~40% | Synthetic share (by data-mixture weight) of Phi-4 pretraining data | [Phi-4 Tech Report (Abdin et al., 2024)](https://arxiv.org/abs/2412.08905) |
| ~33% | Synthetic share of Nemotron 3 Nano pretraining (~3.53T of 10.6T tokens) | NVIDIA Nemotron 3 Nano Tech Report (Dec 2025) |
| 14B | Phi-4 parameter count (beats GPT-4o on GPQA, MATH) | Phi-4 (2024) |
| 1 billion | Personas in Persona Hub | [Ge et al. (2024)](https://arxiv.org/abs/2406.20094) |
| 1.5M | Tool-agentic trajectories in TOUCAN (2,000 tools across 495 MCP environments) | [Xu et al. (2025)](https://arxiv.org/abs/2510.01179) |
| 3 to 5x | Generation-to-kept ratio in practitioner pipelines | Industry practitioner playbooks (2024-2026) |
| 0.85 to 0.92 | Working cosine threshold for embedding deduplication | Practitioner heuristic (tune per embedding model) |
| 4.7x | Hallucination amplification for unverified synthetic data (preliminary, single low-profile paper) | [Silva-Atencio (2025)](https://ojs.bonviewpress.com/index.php/AIA/article/view/6620) |
| 52K | Self-Instruct examples used to fine-tune Alpaca (LLaMA-7B) | [Taori et al. (2023)](https://crfm.stanford.edu/2023/03/13/alpaca.html) |
| 8-18% | HumanEval contamination found in RedPajama and StarCoder pretraining sets | [Yang et al. (2023)](https://arxiv.org/abs/2311.04850) |
| Finite | Upper bound on test error when data accumulates (vs unbounded growth when replaced) | [Gerstgrasser et al. (2024)](https://arxiv.org/abs/2404.01413) |

---

## Building this for yourself: a minimal pipeline

If you're starting from zero, the minimum viable pipeline is small:

1. **Define the task.** Write 20 to 50 hand-crafted gold examples. These are your seeds and your eval anchor.
2. **Pick two generators from different providers.** Run each on the seeds. Compare style and failure modes.
3. **Add a persona or evol step.** Even a list of 50 personas or 5 evolution prompts breaks generator monoculture cheaply.
4. **Filter.** Schema check, then dedupe (embed + cosine), then LLM-jury for quality. Keep ~20 to 30% of generations. [Distilabel](https://github.com/argilla-io/distilabel) is the fastest way to wire the whole stack without writing it.
5. **Train and eval.** Train on the filtered set, eval on the held-out real set. Inspect failures.
6. **Iterate the prompts, not the model.** If the panel is rejecting too much, fix the generation prompt. If the model is failing on a domain, generate more of that domain with persona conditioning.

The whole loop should fit in two engineering days for a first run, including the eval round. Don't optimize before you've seen the first failure modes; they're rarely what you expected.

---

## Open questions worth tracking

These are areas where the literature hasn't settled and our pipeline should not assume a fixed answer:

- **Optimal real-to-synthetic ratio per task.** Phi-4's 40% is one data point. Domain, model size, and training objective change the optimum.
- **When self-training beats distillation.** Lewis et al. (2025) found self-training competitive with GPT-4o distillation on hallucination reduction in product QA. Reproducing this on other tasks is open.
- **Whether persona-conditioned data generalizes beyond persona slots.** Persona Hub shows diversity in generation; the downstream effect on model generality is less measured.
- **Detection of synthetic data in mixed corpora.** Current detectors are weak. This becomes important for both contamination audits and for understanding what's in pretraining sets we don't control.

---

## Sources

### Core references (the ten papers behind the doc)

- Shumailov, I. et al. (2024). *AI models collapse when trained on recursively generated data*. Nature 631, 755-759.
- Gerstgrasser, M. et al. (2024). *Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data*. arXiv:2404.01413
- Wang, Y. et al. (2022). *Self-Instruct*. arXiv:2212.10560
- Xu, C. et al. (2023). *WizardLM* (Evol-Instruct). arXiv:2304.12244
- Ge, T. et al. (2024). *Scaling Synthetic Data Creation with 1,000,000,000 Personas* (Persona Hub). arXiv:2406.20094
- Xu, Z. et al. (2024). *Magpie*. arXiv:2406.08464
- Abdin, M. et al. (2024). *Phi-4 Technical Report*. arXiv:2412.08905
- Yu, P. et al. (2025). *CoT-Self-Instruct*. arXiv:2507.23751
- Li, M. et al. (2025). *Understanding and Mitigating the Bias Inheritance in LLM-based Data Augmentation*. arXiv:2502.04419
- Yang, S. et al. (2023). *Rethinking Benchmark and Contamination ... Rephrased Samples*. arXiv:2311.04850

### Further reading

Gunasekar et al. (2023, Phi-1 / *Textbooks Are All You Need*, arXiv:2306.11644) · Bukharin et al. (2023, QDIT, arXiv:2311.14736) · Lewis et al. (2025, self-training vs distillation, arXiv:2502.19545) · Kazdan, Schaeffer et al. (2025, *Collapse or Thrive?*, ICML) · Dong et al. (2024, contamination, ACL Findings) · Silva-Atencio (2025, hallucination tradeoff, Bon View Press — preliminary; treat numbers as directional). Surveys: Long et al. (2024, ACL Findings) · Wang K. et al. (2024, arXiv:2410.12896) · Nadas et al. (2025, arXiv:2503.14023). Practitioner: Stanford CRFM Alpaca post (2023) · Databricks blog on synthetic data for chatbots (2025).

---

*Version: v0.3, draft for internal review. Changes since v0.2: sharper TL;DR; Do's/Don'ts table moved up after TL;DR; new "Synthetic data for orq.ai-shaped use cases" section (eval, red-team, multi-turn agents); accumulate-vs-replace chart sketch added; "When to use" / "When NOT to use" de-duplicated; Sources trimmed to 10 core + compact further reading. Companion to "Three judges beat one: notes on building an LLM jury."*
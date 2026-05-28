
- PYBULET PHSYCIS SIMULATOR - FIND A BETTER IOEN SIURCE PHSYICS SIMULATOR
- RESEARCH FERE API KEYS
- CALCULATE HOWMUCH COMPUTE AND HWO MUCHTIME WOULD BE REUQIRED BASED ON KEVIN'S PAPER NUMBERS
- autoresearch Kapathy's
- research cool things from googledeepminds cool findings we can apply
- prompt repetition?
- look into Transfrom2Act
- claude cocde CAD design- so going into cad CLaude generated real robot deisgns instead of teh more basic research-common (toy exanple) topology design)
- ForgeCAD github repo !!!!!!!!!!!
- ForgeCAD -> give simple prompt -> get as STL -> convert to XML -> give to MoJoCu (MJX, etc - check out if better simulkatords?) and see if teh phsycis hold
- how to get around teh colision problem?
- mujoco Newton -> base don Nidia Warp -> chekc teh repos and see if we can use it
- random ktchen sinks Google Deepmin -> explore


1. Set up D2C codebase & test it
2. Then make adaptations to envirnpment generation (1st fiuxed curriculum learning) to see how D2C behaves in difefrent envs
3. Then we move into new random env egneration
4. Think can we add autoreserahc to this

## COvolve (2026)
- **RQ:** can two LLMs play a zero-sum game to co-evolve environments and policies without forgetting?
- **keywords:** unsupervised environment design, two-player zero-sum game, mixed-strategy Nash equilibrium (MSNE), PSRO, code-as-policy, code-as-environment, adversarial curriculum, catastrophic forgetting
- **frameworks:** environment designer LLM + policy designer LLM, both emit Python; payoff matrix over policy-env pairs; MSNE solved via linear program (PuLP + CBC)
- **domains:** MiniGrid, PyGame 2D nav, CARLA urban driving
- **findings:** MSNE mixture beats latest-only (UED-Greedy) and uniform mixtures; emergent curricula with rising complexity; generalizes to unseen benchmarks (DoorKey, LockedRoom, Town02); zero-shot on hardest level fails → curriculum is necessary; weaker LLM (GPT-4.1) still works, just lower ceiling
- 

## OMNI (ICLR 2024)
- **RQ:** can foundation models replace hand-crafted novelty metrics by judging which tasks are *interesting*?
- **keywords:** interestingness, auto-curriculum, learning progress (LP), Goodhart's law, Model of Interestingness (MoI), foundation models as judges
- **frameworks:** LP curriculum (Kanitscheider et al.) reweighted by FM-predicted interestingness; boring tasks downweighted ×0.001
- **findings:** LP alone gets distracted by boring variants (e.g., "collect 2 wood, 3 wood..."); OMNI ≈ oracle MoI; works on repetitive, compound, and synonymous distractor tasks; fails when agent lacks language prior unless prompt is updated

## OMNI-EPIC (ICLR 2025)
- **rQ:** can FMs generate not just task names but full environment + reward code, for truly open-ended task spaces?
- **keywords:** infinite task space, code-as-environment, code-as-reward, FM-as-judge, open-endedness
- **frameworks:** FM proposes task + executable env + success check; second FM filters for interestingness over learned-task history
- **findings:** unbounded task generation works; interestingness filter prevents drift into nonsense; bodies are still fixed (gap D2C can fill)

## Eurekaverse (CoRL 2024)
- **RQ:** can LLMs generate a curriculum of progressively harder robotics environments that transfers to real robots?
- **keywords:** LLM environment generation, parkour, sim-to-real, quadruped locomotion, iterative difficulty
- **frameworks:** LLM proposes next env conditioned on current capability; fine-tune latest policy on each new level
- **findings:** transfers to real quadruped; **but** retains only latest policy → COvolve showed this causes forgetting; closest robotics precedent to D2C-style env generation

## ACCEL (ICML 2022)
- **RQ:** can regret-based level *editing* (vs generation from scratch) produce strong zero-shot transfer?
- **keywords:** regret, UED, level replay, evolutionary editing, PPO student
- **frameworks:** curated buffer of high-regret levels; mutate them; resample by regret
- **findings:** editing beats generating; standard non-LLM UED baseline; the "what does the field do without LLMs" reference point

## POET / Enhanced POET (2019, ICML 2020)
- **RQ:** can env-agent pairs co-evolve open-endedly, with transfer between niches?
- **keywords:** paired open-ended trailblazer, co-evolution, niching, transfer, open-endedness paradigm
- **frameworks:** population of (env, agent) pairs; envs mutate; agents specialize; periodic transfer attempts
- **findings:** finds solutions direct training can't; mostly cited for *framing*, not algorithm; algorithmically dated, but the conceptual ancestor of everything above


### D2C angles - ranked

1. **Designer vs Critic**; because very clean empirical claim (reward-hacking gap + transfer), clean baseline ladder (cooperative D2C → +Hacker → +MSNE), operationalizes a real alignment concern with an actual oracle (`S`), natural extension of the pivot already made. 
2. **Embodied Interestingness**, seems very elegant, but measurement problem?; risks being a relabeling of OMNI with morphology metadata. 
	- maybe better as a _component_ of #1 (how the Hacker scores exploits) than a standalone paper.
3. **Morphology-Aware Curriculum**: most ambitious, highest varianc
4. 
5. 
6. e, probably out of reach on compute and timeline. seems like a natural follow-up to #1, but maybe not the best as a standalone starting point.

---

# key concepts to remember :))

## foundations

**foundation model (FM)** — large model pretrained on broad data (text, images, code) that can be adapted to many downstream tasks. examples: GPT-4, Claude, CLIP. used as a knowledge prior, judge, or generator.

**large language model (LLM)** — foundation model trained on text. predicts next token. used here as: code generator, task proposer, interestingness judge.

**reinforcement learning (RL)** — agent learns by taking actions in an environment, getting rewards, updating policy to maximize cumulative reward. trial-and-error learning.

**policy** — the function mapping observations to actions. what the agent "is." can be a neural net, code, or a lookup table.

**reward function** — function `r(s, a)` that tells the agent how good a state-action is. the thing the agent optimizes. design is hard because of Goodhart.

## environment design

**unsupervised environment design (UED)** — automatically generate training environments tailored to the agent's current skill, instead of hand-crafting them. solves the "infinite possible environments" problem.

**curriculum learning** — train on easy tasks first, then progressively harder ones. like school. auto-curriculum = the system picks the order itself.

**domain randomization (DR)** — randomly vary environment parameters during training so the policy generalizes. crude but works. lacks adaptivity.

**learning progress (LP)** — how much the agent's success rate on a task is changing recently. high LP = task is at the right difficulty, neither trivial nor impossible. core signal for auto-curricula.

**regret** — gap between best-known performance and current performance on a task. high regret = lots of room to improve = good task to train on. ACCEL's core idea.

## game theory bits

**two-player zero-sum game** — two players, one's gain is the other's loss. classic setup for adversarial training. used by COvolve to frame env-designer vs policy-designer.

**Nash equilibrium** — strategy profile where no player can improve by unilaterally deviating. the "stable" point of a game.

**mixed-strategy Nash equilibrium (MSNE)** — Nash equilibrium where players randomize over strategies with specific probabilities. solves "what if no single strategy is best?"

**minimax** — pick the strategy that minimizes your worst-case loss (or maximizes your worst-case payoff). robust by design.

**Policy Space Response Oracles (PSRO)** — multi-agent learning framework: maintain a population of policies, compute payoffs between them, find the meta-strategy (mixture) that's robust. COvolve adapts this to UED.

**payoff matrix** — table of outcomes for every (strategy A, strategy B) pair in a game. the raw material for finding equilibria.

## interestingness & open-endedness

**open-endedness** — algorithms that keep producing novel, increasingly complex behaviors forever. no fixed goal. the holy grail of this research area.

**interestingness** — ineffable quality of "worth learning." humans know it when they see it. hard to quantify. OMNI's contribution: let FMs judge it.

**Goodhart's law** — "when a measure becomes a target, it ceases to be a good measure." the reason hand-crafted novelty/interestingness metrics get gamed. the central problem your D2C pivot addresses for reward functions.

**novelty search** — optimize for behaviors different from past behaviors, ignoring the actual objective. surprisingly effective sometimes. Lehman & Stanley.

**intrinsic motivation** — reward the agent gives itself for curiosity/novelty/exploration, separate from external task reward. helps with sparse-reward problems.

**catastrophic forgetting** — when learning new tasks degrades performance on old ones. classic neural net problem. MSNE mixtures prevent it by keeping old policies in the mixture.

## code-as-X

**code-as-policy** — the policy is a Python program, not a neural net. more interpretable, generalizable, modular. Liang et al.

**code-as-environment** — the environment is generated as code (e.g., MiniGrid class). lets LLMs design environments via program synthesis. COvolve, OMNI-EPIC.

**code-as-reward** — reward function written as code by an LLM. lets reward design be automated. Eureka, OMNI-EPIC.

## auto-curriculum methods (quick map)

- **uniform sampling** — pick tasks randomly. baseline. usually bad.
- **threshold-based** — graduate to next task when success > X. static, brittle.
- **regret-based** — pick high-regret tasks. ACCEL, PAIRED.
- **learning progress** — pick tasks with high recent improvement. OMNI base.
- **adversarial** — let an opponent pick tasks to expose weaknesses. COvolve, PAIRED.

## RL algorithms (you'll see these names)

**PPO (Proximal Policy Optimization)** — workhorse on-policy RL algorithm. stable, simple, used everywhere. Schulman et al. 2017.

**SAC (Soft Actor-Critic)** — off-policy, continuous control. good for robotics. Haarnoja et al.

**QR-DQN** — distributional value-based RL for discrete actions. Dabney et al.

**Stable-Baselines3** — open-source library with these algos. standard baseline kit.

## POMDP & friends

**MDP** — Markov Decision Process. states, actions, transitions, rewards. the standard RL formalism.

**POMDP** — Partially Observable MDP. agent doesn't see full state, only observations. more realistic.

**UPOMDP** — Underspecified POMDP. POMDP with a parameter space of environment configurations. UED operates over UPOMDPs: pick parameters → get a concrete POMDP.

**level** — a specific environment instance, i.e., a specific parameter setting of the UPOMDP. "task" and "level" are used interchangeably.

## D2C-specific terms (your project)

**Designer** — agent proposing the artifact (originally morphology; in your pivot, also reward).
**Critic / Antithesis** — agent producing counter-proposals in the cooperative loop.
**Hacker** — your addition: adversarial agent searching for policies that maximize `r` while failing `S`.
**Synthesis** — merging step that produces the final artifact.
**`r`** — training reward (what the policy optimizes).
**`S`** — held-out task score (what you actually care about). the oracle.
**reward hacking** — policy gets high `r` without doing the intended task. the gap `r − S` is the hack signal.

---

## Related Notes
- [[Robotics/00 - Robotics MOC]] — full robotics knowledge base
- [[Robotics/08 - Key Subfields & Concepts]] — RL for robots, sim-to-real, IsaacLab, VLAs, policy concepts
- [[Robotics/02 - Recent Breakthroughs 2023–2025]] — Eureka paper context; π0, RT-2
- [[Robotics/07 - Key Bottlenecks]] — data scarcity, manipulation difficulty, compute
- [[Robotics]] — Prompt2Policy project notes (sister file)
- [[ML/Lecture 12 — Reinforcement Learning]] — MDP formalism, reward functions, PPO, Q-learning
- [[Artificial Intelligence/AI Agents/AI Agents - Core Components]] — LLM-as-judge, agent orchestration patterns
## 1) The reinforcement learning setup

In supervised learning, someone gives you the right answer for every example. In RL, an ==**agent**== learns by interacting with an environment and receiving rewards — no one tells it what the correct action is.

*// Like training a dog: you can't explain "sit" in words. Instead, the dog tries things, and you give treats for good behavior. Over time, it figures out what actions lead to treats.*

### Key components

| Component | Symbol | Role |
|---|---|---|
| **Agent** | — | The learner / decision maker |
| **Environment** | — | Everything the agent interacts with |
| **State** | $s$ | Current situation (what the agent observes) |
| **Action** | $a$ | What the agent can do |
| **Reward** | $r$ | Scalar feedback signal (higher = better) |
| **Policy** | $\pi$ | ==Strategy for choosing actions==: $\pi(s) \to a$ |

### The loop

$$s_0 \xrightarrow{a_0} r_0, s_1 \xrightarrow{a_1} r_1, s_2 \xrightarrow{a_2} \cdots$$

At each step: observe state → choose action → receive reward → transition to new state → repeat.

### Markov Decision Process (MDP)

> [!important] The formal framework
> An MDP is defined by $(S, A, T, R)$:
> - $S$: set of states
> - $A$: set of actions
> - $T(s' \mid s, a)$: transition probabilities (==Markov==: next state depends only on current state and action)
> - $R(s, a)$: reward function

### Episodic learning

Many RL problems have natural episodes (a game ends, a robot reaches the goal or falls). The ==**return**== for an episode is the total reward:

$$G = r_0 + r_1 + r_2 + \cdots + r_T$$

Often discounted: $G = r_0 + \gamma r_1 + \gamma^2 r_2 + \cdots$ where $\gamma \in [0,1)$ makes future rewards worth less.

---

## 2) Why RL is hard: four problems

> [!warning] What makes RL fundamentally different from supervised learning

**1. Sparse rewards**: the agent might only get a reward at the very end (win/lose). Most time steps give zero signal.

*// In chess, you only know if you won or lost at the end. Was move 17 good or bad? Hard to tell from just the final result.*

**2. Delayed reward / credit assignment**: even when a reward arrives, which earlier actions deserve credit?

*// You won the chess game 50 moves later. Was it because of your opening? Your middle-game sacrifice? Assigning credit to individual actions is the ==**credit assignment problem**==.*

**3. Non-differentiable loss**: the environment is a black box. You can't compute $\frac{\partial \text{reward}}{\partial \text{action}}$ because you don't have a differentiable model of the world.

**4. Exploration vs exploitation**: should the agent do what it thinks is best (exploit) or try something new that might be better (explore)?

*// Always going to your favorite restaurant (exploit) means you'll never discover a better one. Always trying random restaurants (explore) means you eat a lot of bad food. You need a balance.*

---

## 3) Simple approach: random search

Parameterize the policy $\pi_\theta$ and search over parameters:

1. Sample random parameters $\theta$
2. Run the policy, collect total reward
3. Keep the best $\theta$ found so far

This works for simple problems but scales terribly. No gradient information → blind search.

---

## 4) Policy gradients

### The idea

Directly optimize the policy parameters $\theta$ to maximize expected reward. The challenge: the reward is not differentiable w.r.t. actions. The trick: use the ==**log-derivative trick**==.

### The math (REINFORCE)

> [!important] The policy gradient theorem
> $$\nabla_\theta \mathbb{E}_{a \sim \pi_\theta}[r(a)] = \mathbb{E}_{a \sim \pi_\theta}[r(a) \nabla_\theta \ln \pi_\theta(a)]$$
>
> *// "The gradient of expected reward = expected value of (reward × gradient of log-probability of the action)." We don't need to differentiate through the reward — only through the policy.*

### REINFORCE algorithm

1. Sample actions from current policy $\pi_\theta$
2. Observe rewards
3. Compute gradient estimate: $\hat{g} = r(a) \nabla_\theta \ln \pi_\theta(a)$
4. Update: $\theta \leftarrow \theta + \eta \hat{g}$

*// If an action got high reward, increase its probability. If it got low reward, decrease its probability. The reward acts as a weighting factor on the gradient.*

> [!tip] Intuition
> - Good action + high reward → ==make this action more likely==
> - Bad action + low reward → ==make this action less likely==
> - The policy gradually shifts probability mass toward actions that lead to rewards

### Variance problem

Policy gradients are ==**high variance**==: the reward signal is noisy, so gradient estimates are noisy. Many tricks exist to reduce variance (baselines, advantage functions, etc.).

---

## 5) Exploration strategies

### Boltzmann exploration (softmax)

Choose actions with probability proportional to their estimated value:

$$\pi(a \mid s) = \frac{e^{Q(s,a) / T}}{\sum_{a'} e^{Q(s,a') / T}}$$

- **High temperature $T$**: nearly uniform (lots of exploration)
- **Low temperature $T$**: almost always picks the best action (exploitation)
- Common practice: ==start with high $T$, decrease over time== (explore early, exploit later)

### Epsilon-greedy

$$\pi(a \mid s) = \begin{cases} \text{best action} & \text{with probability } 1 - \epsilon \\ \text{random action} & \text{with probability } \epsilon \end{cases}$$

Simple and effective. Typically $\epsilon$ starts high and decays.

---

## 6) Q-learning

### Value functions

The ==**value function**== $V^\pi(s)$ = expected total future reward starting from state $s$ and following policy $\pi$:

$$V^\pi(s) = \mathbb{E}_\pi\left[\sum_{t=0}^{\infty} \gamma^t r_t \mid s_0 = s\right]$$

### The Q-function

The ==**Q-function**== $Q^\pi(s, a)$ = expected total future reward starting from state $s$, taking action $a$, then following $\pi$:

$$Q^\pi(s, a) = \mathbb{E}_\pi\left[\sum_{t=0}^{\infty} \gamma^t r_t \mid s_0 = s, a_0 = a\right]$$

> [!important] Optimal policy from Q*
> If you know the optimal Q-function $Q^*$, the optimal policy is trivial:
> $$\pi^*(s) = \arg\max_a Q^*(s, a)$$
> ==Just pick the action with the highest Q-value.==

### The Bellman equation (recursive definition)

$$Q^*(s, a) = R(s, a) + \gamma \sum_{s'} T(s' \mid s, a) \max_{a'} Q^*(s', a')$$

*// "The value of taking action $a$ in state $s$ = the immediate reward + the discounted value of the best action in the next state." Today's value = today's reward + tomorrow's best value.*

### Tabular Q-learning algorithm

For small state/action spaces, store $Q(s, a)$ in a table:

1. Initialize $Q(s, a) = 0$ for all $s, a$
2. Observe state $s$, choose action $a$ (e.g., $\epsilon$-greedy)
3. Observe reward $r$ and next state $s'$
4. Update:

$$Q(s, a) \leftarrow Q(s, a) + \alpha \left[ r + \gamma \max_{a'} Q(s', a') - Q(s, a) \right]$$

5. Repeat

*// The update nudges $Q(s,a)$ toward the "target" $r + \gamma \max_{a'} Q(s', a')$. Over many iterations, the table converges to $Q^*$.*

> [!tip] Q-learning is ==off-policy==
> The update uses $\max_{a'} Q(s', a')$ regardless of what action the agent actually takes next. This means Q-learning learns the optimal policy even while exploring with $\epsilon$-greedy.

---

## 7) Deep Q-learning (DQN)

For large state spaces (e.g., Atari game pixels), a table is impossible. Instead, approximate $Q(s, a)$ with a ==**neural network**==:

$$Q(s, a; \theta) \approx Q^*(s, a)$$

The network takes a state as input and outputs Q-values for all actions.

### Key innovations (DeepMind, 2013)

- **Experience replay**: store transitions $(s, a, r, s')$ in a buffer; sample random mini-batches for training. This breaks correlations between consecutive samples.
- **Target network**: use a slowly-updated copy of the network for computing targets, improving stability.

*// Without these tricks, DQN training is extremely unstable — the target keeps moving as the network updates. Experience replay and target networks were the breakthroughs that made deep RL work on Atari games.*

---

## 8) AlphaGo (RL meets game playing)

AlphaGo combined:
1. **Supervised learning**: train a policy network from expert human games
2. **RL (policy gradients)**: improve the policy by self-play
3. **Monte Carlo Tree Search (MCTS)**: use the policy + value network to guide search during play

The result: superhuman Go performance in 2016. Later versions (AlphaZero) dropped the human data entirely and learned purely through self-play.

---

## Quick reference: what to know for the exam

> [!important] Must-know concepts

| Concept | Key idea |
|---|---|
| **MDP** | $(S, A, T, R)$; Markov property; agent-environment loop |
| **Four RL problems** | Sparse rewards, credit assignment, non-differentiable, explore/exploit |
| **Policy gradient** | $\nabla \mathbb{E}[r] = \mathbb{E}[r \nabla \ln \pi(a)]$; log-derivative trick |
| **REINFORCE** | Sample actions, weight gradient by reward, update policy |
| **$\epsilon$-greedy** | Best action with prob $1{-}\epsilon$, random with prob $\epsilon$ |
| **Boltzmann** | Softmax over Q-values with temperature $T$ |
| **Q-function** | $Q^*(s,a)$ = expected future reward; optimal policy = $\arg\max_a Q^*$ |
| **Bellman equation** | $Q^*(s,a) = R(s,a) + \gamma \sum_{s'} T \max_{a'} Q^*(s',a')$ |
| **Q-learning update** | $Q(s,a) \leftarrow Q(s,a) + \alpha[r + \gamma \max_{a'} Q(s',a') - Q(s,a)]$ |
| **DQN** | Neural net approximates Q; experience replay + target network |

---

## Related Notes
- [[Robotics/08 - Key Subfields & Concepts]] — RL for robots: PPO, SAC, sim-to-real, Isaac Gym
- [[Robotics/07 - Key Bottlenecks]] — data scarcity and the challenge of RL in the real world
- [[Robotics Last Meeting Notes]] — RL reward functions, Eureka, D2C, OMNI research
- [[Robotics]] — Prompt2Policy: LLMs writing RL reward functions
- [[ML/Lecture 0 — What is ML]] — supervised learning contrast to RL
- [[ML/Lecture 8 — Sequential Models (Markov Models)]] — Markov chains as precursor to MDPs
- [[Artificial Intelligence/AI Agents/AI Agents - Core Components]] — RL agents in real-world systems

# Robotics — Map of Content

A comprehensive knowledge base covering everything you need to know about robotics in 2025.

## Notes in This Vault

| Note | What's Inside |
|---|---|
| [[01 - History of Robotics]] | Ancient automata → industrial era → deep learning era → foundation model era |
| [[02 - Recent Breakthroughs 2023–2025]] | RT-2, π0, Gemini Robotics, Figure BotQ, key papers |
| [[03 - Embodied AI]] | What embodied AI is, why it matters, how it relates to robotics |
| [[04 - Famous People in Robotics]] | Researchers, founders, engineers — who they are and what they built |
| [[05 - Famous Companies in Robotics]] | Humanoid, industrial, AI-first, AV, infrastructure companies |
| [[06 - Countries & Ecosystems]] | Robot density rankings, ecosystem profiles per country |
| [[07 - Key Bottlenecks]] | Data scarcity, sim-to-real, hardware, generalization, cost |
| [[08 - Key Subfields & Concepts]] | Robot learning, IL, RL, VLAs, manipulation, locomotion, SLAM, etc. |
| [[09 - Glossary & Acronyms]] | ~70 terms defined: DOF, SLAM, VLA, ACT, PPO, and more |

## Quick Orientation

**The big picture**: Robotics is undergoing a paradigm shift. For decades, robots were programmed — hand-coded rules for specific tasks. Now they are *learned* — trained on data using the same techniques behind ChatGPT. The current frontier is **Vision-Language-Action (VLA)** models: large neural networks that take in camera images + a language instruction and output motor commands.

**The core challenge**: Robots need enormous amounts of training data, but collecting real-world robot data is slow and expensive. This is the field's #1 bottleneck.

**The hottest area**: Humanoid robots — companies are racing to deploy general-purpose humanoid robots in factories and homes. 2024–2025 is when this went from research demos to commercial products.

## Key Vocabulary (Start Here)
- **VLA** — Vision-Language-Action model (image + text → robot actions)
- **Imitation Learning (IL)** — learning from human demonstrations
- **Sim-to-Real** — training in simulation, deploying in the real world
- **Embodied AI** — AI that has a physical body and acts in the real world
- **Foundation Model for Robotics** — large pre-trained model that generalizes across robot tasks

→ Full glossary: [[09 - Glossary & Acronyms]]

---

## Research & Project Notes (Root Vault)
- [[Robotics]] — Prompt2Policy project: LLMs writing RL reward functions; research questions
- [[Robotics Last Meeting Notes]] — D2C, COvolve, OMNI, OMNI-EPIC, Eurekaverse research notes

## Connecting Concepts in Other Vault Areas
- [[ML/Lecture 12 — Reinforcement Learning]] — RL theory: MDPs, policy gradients, Q-learning
- [[ML/Lecture 13 — Transformers]] — transformer architecture behind VLA models
- [[ML/Lecture 4 — Neural Networks & Backpropagation]] — neural network foundations
- [[Artificial Intelligence/AI Agents/AI Agents - Core Components]] — agent architectures; perception-reasoning-action loops
- [[Technical Skills/Notes/Subtopics/LLMs]] — LLMs used in VLA models and robot task planning
- [[Mini Essays/Transhumanism]] — philosophical context for where robotics is headed

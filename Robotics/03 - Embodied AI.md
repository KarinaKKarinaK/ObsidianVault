# Embodied AI

Tags: #robotics #embodied-ai #foundations

---

## Definition

**Embodied AI** refers to AI systems with a physical body that perceive, reason, and act in the real world. The key insight: intelligence emerges from the tight coupling of **perception, cognition, and action** within a physical environment.

Unlike purely software AI (LLMs that process text), embodied agents are *grounded* in physical reality — they can touch, move, and change the world.

> "Intelligence requires a body." — Rodney Brooks (paraphrased)

---

## Core Components of Embodied AI

```
Sensing → Perception → Cognition → Action → [changes environment] → back to Sensing
```

1. **Sensing**: cameras, lidar, tactile sensors, IMU, encoders (proprioception)
2. **Perception**: understanding what sensors are seeing (object recognition, depth estimation, scene graphs)
3. **Cognition**: reasoning, planning, understanding intent (where LLMs/VLMs plug in)
4. **Action**: motor commands that change the physical world
5. **Feedback loop**: actions change the environment → new observations → new decisions

---

## Relationship to Robotics

Embodied AI is the **AI inside robots**. The relationship has evolved:

| Era | Robot Intelligence |
|---|---|
| 1960s–1990s | Hard-coded rules, finite state machines, hand-designed controllers |
| 2000s–2010s | Probabilistic reasoning, SLAM, classical ML for perception |
| 2012–2020 | Deep learning for perception (vision, speech); RL for locomotion/games |
| 2020–present | Foundation models (VLMs, LLMs) as the robot's "brain"; VLA paradigm |

**The key shift**: from *programmed* robots → *learned* robots

---

## Why Embodiment Matters

1. **Causal grounding**: robots learn cause-and-effect by *doing*, not just observing text
2. **Active perception**: proactively gathering information through movement (look around a corner, poke an object)
3. **Sensorimotor coupling**: the shape of the body constrains and enables cognitive strategies (a hand with 5 fingers affords different manipulation than a 2-finger gripper)
4. **Real-world data gap**: internet text/images lack physical interaction data — robots must collect it themselves

This is why Yann LeCun argues that current LLMs will never achieve true intelligence — they lack a body and physical grounding.

---

## Embodied AI vs. Disembodied AI

| Aspect | Disembodied (LLMs) | Embodied (Robots) |
|---|---|---|
| Training data | Trillions of text/image tokens | Millions of interaction trajectories |
| Data cost | Cheap (scraped from internet) | Expensive (requires real hardware + time) |
| Consequences of actions | None (just tokens) | Real physical consequences |
| Iteration speed | Fast (GPU clusters) | Slow (hardware in the loop) |
| Generalization | Broad across domains | Narrow — embodiment + environment specific |
| Grounding | Statistical correlations | Physical cause-and-effect |

---

## Key Paradigm Shifts (2022–2025)

### 1. LLMs as Task Planners (2022)
**SayCan** (Google, 2022): Language model plans robot tasks; a separate "affordance" module checks what the robot is *actually capable* of doing.

### 2. VLMs for Perception
Vision-Language Models (GPT-4V, Gemini, PaLI) can answer questions about robot camera feeds — "Is the cup upright?", "Which object should I pick?"

### 3. VLA Models (2023–present)
**Vision-Language-Action**: end-to-end model that takes image(s) + language instruction and outputs motor commands.
- RT-2 (2023) → π0 (2024) → Gemini Robotics (2025)
- No longer need separate perception + planning + control modules

### 4. Foundation Models for Robotics
Pre-trained on diverse internet data, fine-tuned on robot data. Benefits:
- Transfer of world knowledge (know that cups are fragile, eggs roll)
- Zero-shot generalization to novel tasks
- Language as universal interface for task specification

---

## Current Challenges for Embodied AI

- **Data scarcity**: robots are 120,000x data-poorer than LLMs (per Ken Goldberg, NVIDIA GTC 2025)
- **Physical grounding is still partial**: VLAs know words like "fragile" but don't always act on them correctly
- **Compute on the edge**: running Gemini-scale models in real-time on a robot body is not yet practical
- **Multi-task interference**: training on 100 tasks often hurts performance on any individual task

---

## Key Embodied AI Projects to Know

| Project | Who | What |
|---|---|---|
| **GATO** | DeepMind (2022) | Generalist agent across text, images, games, and robot tasks |
| **SayCan** | Google (2022) | LLM planning grounded in robot affordances |
| **RT-2** | Google DeepMind (2023) | First practical VLA at scale |
| **π0** | Physical Intelligence (2024) | Generalist VLA; real-world deployment |
| **Gemini Robotics** | Google DeepMind (2025) | Gemini 2.0 backbone; multi-embodiment |
| **LeRobot** | Hugging Face (2024) | Open-source embodied AI framework |

---

## Influential Ideas & Thinkers

- **Rodney Brooks**: "Subsumption architecture" — intelligence emerges from layers of simple behaviors, not central planning. Body-first AI.
- **Yann LeCun**: World models — AI needs internal models of physics to plan; LLMs alone can't get there.
- **Jürgen Schmidhuber**: Curiosity-driven learning — embodied agents should seek novel states as intrinsic reward.
- **Andy Clark** (philosopher): "Being There" and extended mind thesis — cognition extends beyond the skull into body and environment.

→ See also: [[08 - Key Subfields & Concepts]] | [[04 - Famous People in Robotics]]

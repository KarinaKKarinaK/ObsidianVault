# Key Bottlenecks in Robotics

Tags: #robotics #challenges #bottlenecks

---

## 1. Data Scarcity (The #1 Bottleneck)

**The problem**: LLMs were trained on trillions of tokens; the best robot datasets have millions of trajectories at best.

> "Robots are ~120,000x data-poorer than large language models." — Ken Goldberg, NVIDIA GTC 2025

**Why it matters**: Foundation models need diverse, high-quality training data to generalize. Robots need *interaction* data (image + action + outcome) which is expensive to collect.

**Numbers**:
- GPT-4 trained on: ~13 trillion tokens
- Open X-Embodiment (largest robot dataset): ~1 million trajectories
- A single manipulation task demonstration: ~30 seconds, 1 operator

**Solutions being explored**:
- **Sim-to-real**: Generate millions of trajectories in simulation
- **Teleoperation at scale**: ALOHA system, VR teleoperation
- **Cross-embodiment datasets**: Train on diverse robot types (OXE dataset)
- **Video pre-training**: Learn from YouTube/internet videos of humans doing tasks
- **Synthetic data**: Procedurally generated or LLM-described scenarios
- **World models**: Learn a model of physics to generate synthetic robot data

---

## 2. Sim-to-Real Gap

**The problem**: Simulated physics ≠ real-world physics. Policies trained in simulation often fail when deployed on real hardware.

**Sources of the gap**:
- **Contact dynamics**: Friction, sliding, bouncing are hard to simulate accurately
- **Deformable objects**: Cloth, food, cables behave very differently in sim vs. reality
- **Visual gap**: Sim textures/lighting ≠ real camera images
- **Actuator modeling**: Real motors have backlash, compliance, delays not captured in sim
- **Sensor noise**: Real IMUs, cameras, encoders have noise patterns different from sim

**Mitigation techniques**:
- **Domain Randomization (DR)**: Randomize sim parameters (mass, friction, lighting) so policy learns robust behavior
- **Domain Adaptation**: Use small amount of real data to adapt sim-trained policy
- **System Identification**: Measure real-world physical parameters to calibrate simulation
- **Photorealistic Simulation**: NVIDIA Omniverse/Isaac Sim reduce visual gap
- **Digital Twins**: Exact digital replica of real environment

**Current state**: Locomotion has largely solved sim-to-real (Unitree G1 trained almost entirely in Isaac Lab). Dexterous manipulation remains largely unsolved.

---

## 3. Hardware Limitations

**Battery & energy**:
- Current humanoids run 90 minutes – 5 hours per charge
- Walking, lifting, and compute all drain energy rapidly
- No fundamental battery breakthrough in sight; gradual improvements only

**Actuators**:
- Balancing power, weight, backdrivability, and cost is unsolved
- Hydraulic: powerful but messy and heavy (Atlas old design)
- Electric (motors): lighter but lower power density
- Series Elastic Actuators (SEA): compliant but complex
- Quasi-direct drive: increasingly popular for legged robots

**Dexterous hands**:
- Human hand: 27 DOF, ~17,000 mechanoreceptors per hand
- Best robotic hands (Shadow Dexterous Hand): ~$100k, fragile, complex
- Cheap grippers: 2-3 DOF, limited task repertoire
- Gap between what humans can do with hands vs. robots is enormous

**Cost**:
- Full humanoid robot: $100k–250k+ (Figure 02, Atlas)
- Exception: Unitree G1 at ~$16k (China-subsidized)
- Target for widespread deployment: <$30k
- For consumer: probably needs to be <$5–10k (speculative, 5–10 year horizon)

---

## 4. Generalization

**The problem**: Robots trained on specific tasks fail on novel tasks, objects, environments, and lighting conditions.

**Distribution shift**: The real world always presents new situations not seen during training.

**Examples of failures**:
- Robot trained on red cups fails with blue cups (color shift)
- Robot trained indoors fails outdoors (lighting shift)
- Robot trained with one gripper fails with a different gripper (embodiment shift)
- Robot trained to pick mugs fails with a wine glass (object shift)

**Why foundation models help**: Pre-trained VLMs bring broad world knowledge (know what a wine glass is, how it's used, that it's fragile). But fine-tuning on limited robot data still limits generalization.

**Active research**: 
- Cross-embodiment training (OXE dataset)
- Zero-shot VLA evaluation
- Data augmentation (color jitter, novel object injection)
- Semantic scene understanding for novel object generalization

---

## 5. Dexterous Manipulation

**The problem**: Humans take 1–2 years to develop hand dexterity; robots still can't match it after decades of research.

**Hard sub-problems**:
- Contact-rich tasks (peg in hole, screwing, folding clothes)
- Precise force control without damaging fragile objects
- In-hand manipulation (rotating an object within the grasp)
- Soft/deformable objects (food prep, cloth, cables)
- Long-horizon tasks where small errors compound

**Current state**:
- Can reliably pick-and-place rigid objects with known poses
- Struggle with cloth, thin objects, irregular grasps
- OpenAI Dactyl (2019) solved Rubik's Cube but required 13k CPU years of RL training
- Progress is being made but still far from human-level

---

## 6. Reasoning & Planning Over Long Horizons

**The problem**: Robots struggle with multi-step plans, error recovery, and novel reasoning in the real world.

- **Plan execution failures**: Step 5 fails; robot doesn't know how to recover
- **Semantic reasoning**: "Move the thing near the lamp" requires scene understanding
- **Instruction ambiguity**: "Put it away" — where? Which object?
- **Long-horizon credit assignment**: Hard to learn from sparse end-of-task rewards over 50 steps

**LLMs partially help** by providing planning ability and semantic grounding, but:
- Add significant inference latency
- May hallucinate physically impossible actions
- Closed-loop correction in real-time remains a research challenge

---

## 7. Compute & Inference Latency

**The problem**: Running large VLA models on-robot in real-time requires power and compute not yet available in robot form factors.

- GPT-4-scale models: can't run locally on a robot
- π0: ~3B parameters; requires cloud or powerful onboard GPU
- Control loops often need <10ms response time
- Current VLAs may produce actions at 10–20Hz (borderline for reactive manipulation)

**Solutions**:
- Edge AI chips (NVIDIA Jetson Orin, future custom ASICs)
- Model distillation: train small fast model from large capable model
- Action chunking: predict 10–50 actions at once, reducing how often model is called
- Hybrid architecture: fast low-level controller + slow high-level VLA planner

---

## 8. Safety & Robustness

**The problem**: Learned robot policies fail in unexpected ways that are hard to predict or verify.

- A robot trained to fold towels might accidentally fold a child's arm
- Adversarial inputs can cause unexpected behavior (analogous to vision adversarial examples)
- No certification framework exists for safety-critical learned robotics
- Contact with humans must be fail-safe: ISO/TS 15066 (cobot safety) is for programmed robots, not learned policies

**Active work**: 
- Conformal prediction for robot action uncertainty
- Safety-constrained RL
- Formal verification of neural controllers (limited to small networks)
- Regulatory frameworks being drafted in EU, US

---

## 9. Cost of Integration & Deployment

**The problem**: Even cheap hardware requires expensive integration work.

- Calibration and commissioning: days–weeks of engineer time
- Custom end-effectors for each application
- Reliability and uptime expectations (robots need >99% uptime for ROI)
- Re-training when environment changes
- Maintenance and spare parts

**ROI barrier**: For many applications, human labor is still cheaper when full deployment cost is factored in. Robotics ROI clearest in: automotive, electronics assembly, logistics, welding, painting.

---

## Summary: Where the Field Is Focused

| Bottleneck | Severity | Leading Approach |
|---|---|---|
| Data scarcity | 🔴 Critical | Sim-to-real, cross-embodiment datasets, video learning |
| Sim-to-real gap | 🟡 High (manipulation) | Photorealistic sim, domain randomization |
| Hardware (hands, battery) | 🟡 High | Incremental engineering; no silver bullet |
| Generalization | 🔴 Critical | Foundation models (VLAs), cross-embodiment training |
| Dexterous manipulation | 🔴 Critical | Imitation learning (ACT, Diffusion Policy), RL |
| Reasoning/planning | 🟡 High | LLM integration, chain-of-thought for robots |
| Compute/latency | 🟡 Medium | Edge AI, action chunking, distillation |
| Safety | 🟡 High | Regulatory frameworks, uncertainty quantification |
| Deployment cost | 🟠 Medium | Platform standardization, no-code programming |

→ See also: [[08 - Key Subfields & Concepts]] | [[03 - Embodied AI]]

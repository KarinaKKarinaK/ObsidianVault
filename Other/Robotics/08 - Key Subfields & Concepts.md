# Key Subfields & Concepts in Robotics

Tags: #robotics #concepts #subfields

---

## Overview Map

```
Robotics
├── Perception (sensing the world)
│   ├── Computer Vision (cameras, depth)
│   ├── LiDAR / Point Cloud Processing
│   ├── SLAM (mapping + localization)
│   └── Tactile Sensing
├── Cognition (deciding what to do)
│   ├── Task Planning
│   ├── Foundation Models (LLMs, VLMs, VLAs)
│   └── Reasoning under uncertainty
├── Motion & Control (doing it)
│   ├── Kinematics & Dynamics
│   ├── Motion Planning
│   ├── Locomotion (walking, running)
│   ├── Manipulation (grasping, dexterous)
│   └── Control Theory (PID, MPC, impedance)
└── Learning
    ├── Imitation Learning (from demos)
    ├── Reinforcement Learning (from rewards)
    ├── Foundation Models for Robotics
    └── Sim-to-Real Transfer
```

---

## Robot Learning (Umbrella Field)

Robot learning = using machine learning to train robot behavior rather than hand-coding it.

**Why it matters**: Hand-coded robots are brittle. Every new task requires new programming. Learned robots can generalize.

**Sub-fields**:
1. Imitation Learning — learn from human demonstrations
2. Reinforcement Learning — learn by trial and error
3. Self-supervised learning — learn from unlabeled data
4. Foundation models — large pre-trained models adapted to robotics

---

## Imitation Learning (IL)

Learning robot behavior from expert demonstrations (no reward needed).

### Behavioral Cloning (BC)
- Simplest approach: supervised learning on (observation, action) pairs
- Weakness: **compounding errors** — small mistakes at test time push robot into states not in training data, where it fails badly
- Mitigation: collect lots of diverse data; or use DAgger

### DAgger (Dataset Aggregation)
- During execution, query expert to provide correct action at current (possibly out-of-distribution) state
- Fixes distribution shift but requires interactive expert

### ACT (Action Chunking with Transformers) — 2023
- By Tony Zhao (Stanford/MIT)
- Predict a *chunk* of future actions (e.g., 10–50 steps) instead of one action at a time
- Uses CVAE to handle multi-modal demonstrations
- Trained with ALOHA bimanual setup — ~10 minutes of demos enough for fine-grained tasks
- **Key insight**: Action chunking reduces compounding errors and temporal smoothness improves quality

### Diffusion Policy — 2023
- By Chi et al. (Columbia / MIT)
- Model action distribution as a **diffusion process**: start from random noise, iteratively denoise to get the action
- Captures multi-modal action distributions (different valid ways to do a task)
- Strong empirical performance; slower inference than BC
- **Key insight**: Diffusion models can represent complex, multi-modal action distributions

### How demos are collected
- **Teleoperation**: Human operates robot via joystick, VR controller, or exoskeleton
- **Kinesthetic teaching**: Physically guide the robot arm by hand
- **ALOHA**: Stanford's ~$20k bimanual teleoperation platform — enabled ACT work
- **Video imitation**: Learn from YouTube videos of humans (hard but active research area)

---

## Reinforcement Learning (RL) for Robots

Robot learns by trial and error, maximizing a reward signal.

### Core Concepts
- **Policy (π)**: Function mapping observations → actions
- **Reward (r)**: Scalar signal indicating how good an action was
- **Episode**: One rollout from start to termination
- **Return (G)**: Cumulative discounted reward over episode
- **Value function (V)**: Expected return from a given state
- **Q-function**: Expected return from a given state-action pair

### Key Algorithms

| Algorithm | Type | Notes |
|---|---|---|
| **PPO** (Proximal Policy Optimization) | On-policy | Most widely used; stable training; Schulman et al. 2017 |
| **SAC** (Soft Actor-Critic) | Off-policy | Sample efficient; maximum entropy RL; Haarnoja et al. 2018 |
| **TD3** (Twin Delayed DDPG) | Off-policy | Stable continuous control |
| **TRPO** | On-policy | PPO's predecessor; constrained policy updates |
| **TD-MPC2** | Model-based | Better sample efficiency via learned dynamics model |

### Challenges for Robot RL
- **Sparse rewards**: Only success/fail signal; billions of random actions before first success
- **Sample inefficiency**: Millions of environment steps needed; real hardware is slow
- **Real-world RL**: Dangerous/expensive to train directly on real hardware → sim-to-real
- **Reward engineering**: Designing the right reward function is hard (Eureka uses LLMs to help)
- **Safety during exploration**: Random robot motion can damage hardware or surroundings

### Key Applications of RL in Robotics
- Locomotion (walking, running, climbing) — RL now dominates here
- Dexterous manipulation (Dactyl)
- Reward design via LLMs (NVIDIA Eureka)
- Low-level controllers for legged robots (MIT Cheetah, Unitree G1)

---

## Sim-to-Real Transfer

Training in simulation, deploying on real hardware.

### Why simulation?
- Can run 1000+ parallel environments simultaneously (Isaac Gym)
- No hardware damage from random exploration
- Fast reset: instantly restart after failure
- Domain randomization: free to vary parameters

### The Sim-to-Real Gap
Real world ≠ simulation in: friction, contact dynamics, lighting, actuator delays, sensor noise

### Key Techniques
| Technique | What It Does |
|---|---|
| **Domain Randomization (DR)** | Randomize sim parameters at train time → real world is just another sample |
| **System Identification** | Measure real-world physical parameters → calibrate sim |
| **Domain Adaptation** | Use small amount of real data to adapt sim policy |
| **Photorealistic Sim** | NVIDIA Omniverse/Isaac Sim reduce visual gap |
| **Digital Twins** | Exact replica of real environment in simulation |

### Current state
- **Locomotion**: Largely solved — Unitree G1, MIT Cheetah trained almost entirely in sim
- **Manipulation**: Gap remains significant, especially for contact-rich tasks

---

## Foundation Models for Robotics

Large pre-trained models (VLMs, LLMs) adapted to control robots.

### Vision-Language-Action (VLA) Architecture
```
Input: [camera image(s)] + [language instruction]
     ↓
VLM backbone (PaLiGemma, Gemini, LLaVA...)
     ↓
Action head (fine-tuned on robot trajectory data)
     ↓
Output: joint positions / end-effector velocity / base velocity
```

### Key VLA Models

| Model | Year | Who | Notes |
|---|---|---|---|
| **RT-1** | 2022 | Google | First transformer robot policy at scale; 130k demos |
| **SayCan** | 2022 | Google | LLM + affordance model; semantic task planning |
| **RT-2** | 2023 | Google DeepMind | VLA paradigm established; PaLI-X backbone |
| **Gato** | 2022 | DeepMind | Generalist agent: text + images + games + robot control |
| **OpenVLA** | 2024 | Stanford | Open-source 7B VLA; reproducible |
| **Octo** | 2024 | UC Berkeley | Open-source; diffusion action head; cross-embodiment |
| **π0** | 2024 | Physical Intelligence | Flow-matching; generalist dexterous manipulation |
| **Gemini Robotics** | 2025 | Google DeepMind | Gemini 2.0 backbone; multi-embodiment; most capable as of Sept 2025 |
| **RDT-1B** | 2024 | Tsinghua | 1B-parameter diffusion transformer; open-source |

### Action Representations
- **Joint position**: Direct joint angle targets
- **End-effector delta**: Change in gripper position/orientation (Cartesian)
- **Flow matching (π0)**: Generate action as flow from noise to action → fast, good quality
- **Diffusion (Octo, RDT)**: Denoise from noise to action → high quality, slower

---

## Dexterous Manipulation

Highly skilled object manipulation — analogous to human hand dexterity.

### Why it's hard
- Human hand: 27 DOF, ~17k mechanoreceptors, years to develop
- Robot hand: typically 2–16 DOF, limited tactile sensing
- Contact-rich control requires precise force regulation
- Soft/deformable objects have infinite degrees of freedom

### Key Tasks (from easy to hard)
1. Pick-and-place rigid objects (mostly solved)
2. Grasping novel objects
3. Precise insertion (peg-in-hole, USB plug)
4. Bimanual manipulation (two hands coordinating)
5. Cloth/cable/food manipulation
6. In-hand manipulation (rotating within grasp)

### Key Systems
| System | Notes |
|---|---|
| **Shadow Dexterous Hand** | Most human-like commercial robotic hand; 24 DOF; ~$100k; fragile |
| **Allegro Hand** | Lower-cost 4-finger research hand; ~$15k |
| **Barrett Hand** | 3-finger underactuated hand; robust; common in research |
| **OpenAI Dactyl** | Shadow Hand + RL; solved Rubik's Cube (2019) |
| **ALOHA** | Bimanual setup (2 WidowX arms); low-cost teleoperation |

---

## Locomotion

Science of making robots move through environments.

### Types
- **Wheeled**: Simple, energy-efficient, limited to flat terrain (AMRs in warehouses)
- **Tracked**: Good on rough terrain, slow (military robots, rescue)
- **Legged (biped)**: Human-like; most versatile but hardest to control
- **Legged (quadruped)**: Very stable; 4 legs; SpotMini, ANYmal, Unitree Go2
- **Flying (UAV/drone)**: DJI, autonomous inspection; limited payload
- **Hybrid**: Aerial-ground robots; wheeled-legged (drives flat, walks rough)

### Key Concepts
| Concept | Definition |
|---|---|
| **Gait** | Pattern of leg movements (walk, trot, gallop, bound) |
| **Zero Moment Point (ZMP)** | Point where ground reaction force has no moment; used in static stability |
| **Dynamic balance** | Maintaining balance through motion (like humans) vs. static stability (like a table) |
| **Underactuated** | Fewer actuators than degrees of freedom; must exploit dynamics |
| **Whole Body Control** | Optimizing all DOF simultaneously for full-body task execution |
| **MPC for locomotion** | Real-time trajectory optimization over a few footsteps ahead |

### Key Systems
| System | Notes |
|---|---|
| **Boston Dynamics Atlas** | Most advanced bipedal; electric since 2024; commercial |
| **Boston Dynamics Spot** | Most deployed quadruped (~$75k); robust; enterprise-ready |
| **MIT Mini Cheetah** | Open-source quadruped; RL-trained gaits; academic platform |
| **ETH Zurich ANYmal** | Research quadruped; force-torque sensing; locomotion research |
| **Unitree Go2** | ~$3k quadruped; widely used in research globally |
| **Unitree H1/G1** | Humanoids at $20k–$50k range; used for research |

---

## Teleoperation

Human operator controls robot remotely in real-time.

### Two main use cases
1. **Data collection**: Human demonstrates tasks → robot learns from demo (imitation learning)
2. **Remote operation**: Dangerous/inaccessible environments (surgery, nuclear, space, underwater)

### Systems
| System | Fidelity | Cost | Notes |
|---|---|---|---|
| Joystick | Low | ~$100 | Simple; imprecise; used for wheeled robots |
| VR Controllers | Medium | ~$500 | Intuitive 3D; used for arm teleoperation |
| Exoskeleton | High | $10k–$100k+ | Operator wears wearable robot; space/surgical robotics |
| ALOHA | High | ~$20k | Stanford's bimanual platform; enabled ACT; biggest impact |
| SpaceMouse | Medium | ~$150 | 6DOF desktop input; industrial use |

### Key challenge: latency
- >50ms delay degrades operator performance significantly
- At 200ms+, operators lose sense of embodiment
- For surgical robotics: <20ms required

---

## SLAM (Simultaneous Localization and Mapping)

Robot builds a map of unknown environment **while** tracking its position within it.

Without SLAM: robot doesn't know where it is or what's around it.

### Algorithms
| Algorithm | Notes |
|---|---|
| **EKF-SLAM** | Extended Kalman Filter; classic; assumes Gaussian noise |
| **Particle Filter SLAM** | Monte Carlo; non-Gaussian distributions |
| **Graph-based SLAM** | Pose graph optimization (g2o, GTSAM); current standard for accuracy |
| **ORB-SLAM3** | Visual SLAM with ORB features; monocular/stereo/RGB-D; widely used |
| **LOAM / LIO-SAM** | LiDAR-based SLAM; outdoor robotics and AV |
| **NeRF-based SLAM** | Neural implicit maps; active research (iMAP, NICE-SLAM) |

### Inputs
- **Visual SLAM**: RGB cameras (mono, stereo, RGB-D)
- **LiDAR SLAM**: 3D point clouds
- **Visual-Inertial (VIO)**: Camera + IMU fusion (most common in practice)

### Used in
Autonomous vehicles, warehouse AMRs, exploration robots, household robots

---

## Kinematics

Mathematical description of robot motion without considering forces.

| Concept | Definition |
|---|---|
| **Forward Kinematics (FK)** | Given joint angles → compute end-effector position & orientation |
| **Inverse Kinematics (IK)** | Given desired end-effector pose → compute required joint angles |
| **Jacobian** | Matrix relating joint velocities to end-effector velocities |
| **Workspace** | Set of all poses the end-effector can reach |
| **Singularity** | Configuration where IK has no solution or infinite solutions; robot loses DOF |
| **Redundancy** | More DOF than needed for a task → multiple solutions |

**IK methods**:
- Analytical IK: closed-form; fast; only works for specific arm geometries (6-DOF standard)
- Numerical IK: iterative optimization; general; slower; used for redundant robots

---

## Dynamics & Control

Accounts for forces, torques, and inertia.

| Concept | Definition |
|---|---|
| **Forward Dynamics** | Joint torques → resulting accelerations |
| **Inverse Dynamics** | Desired accelerations → required torques |
| **PID Control** | Proportional-Integral-Derivative feedback control; simple and robust |
| **Impedance Control** | Controls robot stiffness/damping — safer near humans |
| **Admittance Control** | Inverse of impedance; measures force, commands position |
| **Whole-Body Control (WBC)** | Coordinate all robot DOF simultaneously via optimization |
| **Model Predictive Control (MPC)** | Optimize trajectory over rolling future horizon in real-time |
| **Operational Space Control** | Control in task space (EE position) rather than joint space |

---

## Sensors in Robotics

| Sensor | Measures | Key Use |
|---|---|---|
| **RGB Camera** | Color images | Perception, manipulation, navigation |
| **Depth Camera (RGBD)** | Image + per-pixel depth | 3D scene reconstruction; e.g., Intel RealSense, Azure Kinect |
| **LiDAR** | 3D point clouds via laser | Autonomous vehicles, outdoor SLAM |
| **IMU** | Acceleration + angular velocity | State estimation, balance |
| **Force/Torque Sensor** | Forces at joints or end-effector | Safe interaction, contact detection |
| **Tactile Sensor** | Distributed surface contact forces | Dexterous manipulation |
| **GPS** | Global position | Outdoor navigation only |
| **Encoders** | Joint position | Proprioception (robot's sense of own body) |
| **Stereo Camera** | Disparity → depth | Passive depth without IR (works outdoors) |

---

## Robot Operating System (ROS)

Open-source middleware framework for robot software.

| Version | Notes |
|---|---|
| **ROS 1** | Released 2007 by Willow Garage; dominant but lacks real-time guarantees |
| **ROS 2** | Released 2017; rebuilt with DDS middleware; real-time support; current standard |

**Key concepts**:
- **Node**: A process that performs a specific function (camera driver, arm controller, etc.)
- **Topic**: Named channel for publish/subscribe messaging between nodes
- **Service**: Request/reply interface between nodes
- **Action**: Goal-oriented interface for long-running tasks
- **tf2**: Coordinate transform library — tracks all frames in the robot's body

**Ecosystem**: Thousands of packages for SLAM (Cartographer, RTAB-Map), manipulation (MoveIt), simulation (Gazebo), visualization (RViz)

---

## Robotics Data Collection Methods

A critical bottleneck area — how do we get enough data to train good robot policies?

| Method | Description | Scale | Quality |
|---|---|---|---|
| **Teleoperation** | Human operates robot directly | Low-medium | High |
| **Kinesthetic teaching** | Physically guide the arm | Low | Medium |
| **Autonomous data collection** | Robot explores + collects its own data | High | Variable |
| **Sim-generated data** | Simulation generates trajectories | Very high | Medium (sim-to-real gap) |
| **Video imitation** | Learn from human video (YouTube) | Very high | Hard to extract actions |
| **Retargeting from motion capture** | Human MoCap → robot motion | Medium | High |
| **Crowdsourced teleoperation** | Many operators via web interface | High | Varies |
| **Cross-embodiment reuse** | Train on data from multiple robot types | Higher | Varies |

→ See also: [[07 - Key Bottlenecks]] | [[09 - Glossary & Acronyms]]

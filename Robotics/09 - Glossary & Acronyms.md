# Glossary & Acronyms

Tags: #robotics #glossary #reference

---

## A

| Term | Definition |
|---|---|
| **ACT** | Action Chunking with Transformers — imitation learning method predicting chunks of future actions; Tony Zhao et al. 2023 |
| **Action Chunking** | Predicting multiple future actions at once rather than one step at a time; reduces compounding errors |
| **Actuator** | Device that converts energy (electrical, hydraulic) into mechanical motion; the robot's "muscles" |
| **Admittance Control** | Control mode: measure force → command position; compliant interaction with environment |
| **Affordance** | What actions an object or environment enables (a cup "affords" grasping; a chair "affords" sitting) |
| **AGV** | Automated Guided Vehicle — robot following fixed physical guides (magnetic tape, QR codes); older technology, contrast with AMR |
| **ALOHA** | A Low-cost Open-source Hardware System for Bimanual Teleoperation — Stanford's ~$20k bimanual teleoperation platform |
| **AMR** | Autonomous Mobile Robot — self-navigating robot; uses SLAM; common in warehouses (Kiva/Amazon) |
| **Anthropomorphic** | Human-like in form; a robot with two arms, two legs, and a head |

## B

| Term | Definition |
|---|---|
| **BC** | Behavioral Cloning — simplest imitation learning; supervised learning on (state, action) pairs from expert demos |
| **BEV** | Bird's Eye View — top-down 2D representation of 3D sensor data; used in autonomous vehicle planning |
| **Bipedal** | Two-legged robot (walking like humans); e.g., Atlas, Digit, ASIMO |
| **Backdrivability** | Property of an actuator: can be moved by external force; important for safe human interaction and force sensing |

## C

| Term | Definition |
|---|---|
| **Cartesian Space** | 3D coordinate space (X, Y, Z + orientation) in which end-effector positions are expressed |
| **CoRL** | Conference on Robot Learning — premier conference for ML applied to robotics; fastest growing venue |
| **Cross-embodiment** | Policy trained on multiple robot types that generalizes across different robot bodies |
| **CVAE** | Conditional Variational Autoencoder — generative model for multi-modal distributions; used in ACT for multi-modal action prediction |
| **Cobot** | Collaborative Robot — robot arm designed to safely work alongside humans; compliant; force-limited |

## D

| Term | Definition |
|---|---|
| **DAgger** | Dataset Aggregation — interactive imitation learning; queries expert at test-time states to fix distribution shift |
| **Dense Reward** | Reward given at every timestep (easier to learn from but requires careful engineering) |
| **Diffusion Policy** | Robot policy using diffusion process to generate actions; Chi et al. 2023; captures multi-modal distributions |
| **Digital Twin** | Exact digital replica of a real environment used for simulation and planning |
| **DOF** | Degrees of Freedom — number of independent axes of motion; 6-DOF arm has full position + orientation control |
| **Domain Randomization (DR)** | Randomizing simulation parameters during training so real world appears as another sample |
| **Drake** | Open-source C++ toolbox for robot control and simulation; developed by Russ Tedrake's group at MIT/TRI |
| **DROID** | Distributed Robot Interaction Dataset — large-scale in-the-wild manipulation dataset; Franka arm; 86 labs |
| **Dexterity** | Skilled, precise manipulation; ability to handle objects with high control fidelity |

## E

| Term | Definition |
|---|---|
| **Embodied AI** | AI systems with a physical body that perceive, reason, and act in the real world |
| **Embodiment** | The physical body/form of a robot — its shape, joints, sensors, actuators |
| **End-Effector (EE)** | The robot's "hand" or tool at the tip of an arm; gripper, suction cup, welding torch, etc. |
| **Encoder** | Sensor measuring joint angle/position; provides proprioception |
| **EKF** | Extended Kalman Filter — nonlinear state estimation algorithm; classic approach for SLAM and localization |
| **Episode** | One complete trial of a robot task from start to termination |
| **Eureka** | NVIDIA project using LLMs to automatically generate RL reward functions |

## F

| Term | Definition |
|---|---|
| **FK** | Forward Kinematics — given joint angles → compute end-effector position and orientation |
| **Flow Matching** | Generative modeling approach used in π0 for action generation; faster than diffusion with comparable quality |
| **Force Control** | Controlling force exerted by robot rather than just position; needed for contact-rich tasks |
| **Foundation Model** | Large pre-trained model (often LLM or VLM backbone) adapted for a downstream task; in robotics: VLAs |
| **Few-shot** | Performing a task after seeing only a few examples |

## G

| Term | Definition |
|---|---|
| **Gait** | Pattern of leg movements in locomotion (walk, trot, gallop, bound, pronk) |
| **Gazebo** | Open-source 3D robot simulator; widely used with ROS |
| **Grasping** | Picking up and securing an object with a gripper or hand |
| **GTSAM** | Georgia Tech Smoothing and Mapping — factor graph optimization library for SLAM |

## H

| Term | Definition |
|---|---|
| **HRI** | Human-Robot Interaction — study and design of how humans interact with robots |
| **HRC** | Human-Robot Collaboration — humans and robots working together on shared tasks |
| **Hexapod** | Six-legged robot |
| **Humanoid** | Robot with human-like morphology: bipedal, with two arms, head |

## I

| Term | Definition |
|---|---|
| **ICRA** | International Conference on Robotics and Automation — IEEE's flagship robotics conference; largest robotics venue |
| **IK** | Inverse Kinematics — given desired end-effector pose → compute required joint angles |
| **IL** | Imitation Learning — learning robot behavior from expert demonstrations |
| **IMU** | Inertial Measurement Unit — sensor measuring acceleration and angular velocity; used for state estimation |
| **Impedance Control** | Controls robot's mechanical impedance (stiffness/damping) rather than pure position |
| **In-hand Manipulation** | Reorienting objects within the grasp without releasing and re-grasping |
| **Isaac Gym / Isaac Lab** | NVIDIA GPU-accelerated RL simulation environment; enables 1000s of parallel environments |
| **IROS** | International Conference on Intelligent Robots and Systems — major IEEE robotics conference |

## J

| Term | Definition |
|---|---|
| **Jacobian** | Matrix relating joint velocities to end-effector velocities; central to velocity control and IK |
| **Joint Space** | Configuration space described by joint angles; contrast with Cartesian/task space |

## K

| Term | Definition |
|---|---|
| **Kinesthetic Teaching** | Teaching a robot by physically guiding its arm by hand |
| **Kinematics** | Mathematical description of motion without forces; FK and IK |

## L

| Term | Definition |
|---|---|
| **Legged Robotics** | Robots that move using legs; bipedal, quadruped, hexapod |
| **LeRobot** | Hugging Face's open-source robot learning framework; democratizes access to robot AI |
| **LiDAR** | Light Detection and Ranging — sensor emitting laser pulses to measure 3D distances; produces point clouds |
| **LLM** | Large Language Model — text-generating neural network (e.g., Claude, GPT-4) |
| **Locomotion** | The motion of a robot through its environment; walking, running, rolling |

## M

| Term | Definition |
|---|---|
| **MAML** | Model-Agnostic Meta-Learning — Chelsea Finn's algorithm for fast adaptation to new tasks from few examples |
| **MDP** | Markov Decision Process — formal framework for sequential decision making; basis of RL |
| **MoCap** | Motion Capture — system recording precise 3D positions of markers; used for robot demonstration data |
| **Morphology** | The physical form/structure of a robot |
| **MPC** | Model Predictive Control — optimizes trajectory over a rolling future time horizon in real-time |
| **MuJoCo** | Multi-Joint dynamics with Contact — physics simulator widely used for robot RL research; acquired by DeepMind |

## N

| Term | Definition |
|---|---|
| **NeRF** | Neural Radiance Field — neural 3D scene representation from 2D images; increasingly used in robot perception |

## O

| Term | Definition |
|---|---|
| **Octo** | UC Berkeley's open-source generalist robot policy (2024); diffusion action head; cross-embodiment |
| **Offline RL** | Reinforcement learning from a static dataset without environment interaction |
| **Open X-Embodiment (OXE)** | 1M+ trajectory robot dataset from 34 labs across 22 robot types; enables cross-embodiment training |
| **Operational Space Control** | Control in task space (end-effector) rather than joint space |

## P

| Term | Definition |
|---|---|
| **PID Control** | Proportional-Integral-Derivative feedback control; simple and robust; most widely used controller |
| **π0 (pi-zero)** | Physical Intelligence's VLA model (2024) using flow matching; generalist manipulation |
| **POMDP** | Partially Observable MDP — MDP where agent cannot observe full state |
| **Policy** | Function mapping observations to actions; the robot's decision-making brain |
| **PPO** | Proximal Policy Optimization — on-policy RL algorithm; most widely used in robot training; Schulman et al. 2017 |
| **Proprioception** | Robot's sense of its own body position — joint angles, velocities from encoders |

## Q

| Term | Definition |
|---|---|
| **Quadruped** | Four-legged robot (like a dog); e.g., Spot, ANYmal, Unitree Go2 |
| **Q-function** | Function estimating expected return from a given (state, action) pair |

## R

| Term | Definition |
|---|---|
| **RDT-1B** | Robotics Diffusion Transformer 1B — 1B-param diffusion transformer for manipulation; Tsinghua 2024 |
| **Reward Shaping** | Adding intermediate rewards to a sparse reward to guide learning |
| **RL** | Reinforcement Learning — learning via trial-and-error with a reward signal |
| **ROS** | Robot Operating System — open-source middleware for robot software; publish/subscribe architecture |
| **ROS 2** | Current version of ROS; rebuilt with DDS; supports real-time; current standard |
| **RSS** | Robotics: Science and Systems — highly selective robotics conference |
| **RT-1 / RT-2** | Robotics Transformer 1/2 — Google DeepMind's large-scale robot transformer models |

## S

| Term | Definition |
|---|---|
| **SAC** | Soft Actor-Critic — off-policy RL algorithm using maximum entropy framework; sample efficient |
| **SayCan** | Google's 2022 system combining LLM planning with robot affordance grounding |
| **SDF** | Simulation Description Format — alternative to URDF used in Gazebo |
| **Sim-to-Real Gap** | Performance difference between simulation-trained and real-world-deployed robot policies |
| **SLAM** | Simultaneous Localization and Mapping — building a map while tracking own position |
| **Sparse Reward** | Reward only given at task completion; hard to learn from |
| **Subsumption Architecture** | Rodney Brooks' behavior-based AI architecture; layered simple behaviors, no central planner |
| **System Identification** | Measuring real-world physical parameters to calibrate simulation |

## T

| Term | Definition |
|---|---|
| **Task Horizon** | Number of steps in a task; longer horizon = harder to learn |
| **Teleoperation** | Human operator controlling a robot remotely in real-time |
| **Trajectory** | Time-parameterized sequence of robot poses/configurations |
| **TRPO** | Trust Region Policy Optimization — RL algorithm constraining policy update size; predecessor to PPO |

## U

| Term | Definition |
|---|---|
| **Underactuated** | Robot with fewer actuators than DOF; must exploit dynamics for control |
| **URDF** | Unified Robot Description Format — XML format describing robot geometry, kinematics, dynamics |

## V

| Term | Definition |
|---|---|
| **VIO** | Visual-Inertial Odometry — camera + IMU fusion for state estimation; used in drones, handheld devices |
| **VLA** | Vision-Language-Action model — end-to-end model: image(s) + text → robot motor commands |
| **VLM** | Vision-Language Model — model understanding both images and text (e.g., GPT-4V, Gemini, PaLI) |

## W

| Term | Definition |
|---|---|
| **Waypoint** | Intermediate target position in a robot's path |
| **Whole Body Control (WBC)** | Coordinating all robot DOF simultaneously via optimization; full-body task execution |
| **World Model** | Internal model of environment dynamics; robot can plan by simulating outcomes in its "head" |
| **Workspace** | Set of all positions the robot end-effector can reach |

## Z

| Term | Definition |
|---|---|
| **Zero-shot** | Performing a task never seen during training |
| **ZMP** | Zero Moment Point — point where ground reaction has no horizontal moment; used in humanoid walking stability |

---

## Key Conference Quick Reference

| Acronym | Full Name | Type | Focus |
|---|---|---|---|
| **ICRA** | Int'l Conference on Robotics and Automation | IEEE Conference | Broad robotics; largest |
| **IROS** | Int'l Conference on Intelligent Robots and Systems | IEEE Conference | Intelligent robots |
| **CoRL** | Conference on Robot Learning | Academic Conference | ML for robotics; fastest growing |
| **RSS** | Robotics: Science and Systems | Academic Conference | Theory + systems; very selective |
| **NeurIPS/ICML/ICLR** | — | ML Conferences | RL/learning methods applicable to robotics |
| **RA-L** | Robotics and Automation Letters | IEEE Journal | Main robotics letters journal |
| **IJRR** | International Journal of Robotics Research | Journal | Top robotics research journal |
| **Science Robotics** | — | High-impact Journal | High-profile robotics results |

→ See also: [[08 - Key Subfields & Concepts]] | [[04 - Famous People in Robotics]]

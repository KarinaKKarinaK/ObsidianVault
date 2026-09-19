# Recent Breakthroughs 2023–2025

Tags: #robotics #current #breakthroughs

---

## 2023

| Development | Who | What |
|---|---|---|
| **RT-2** | Google DeepMind | VLA model combining language understanding with robot actions; built on PaLI-X |
| **Open X-Embodiment** | 34-lab consortium | 1M+ trajectory dataset across 22 robot types; enables cross-embodiment training |
| **ACT** | Tony Zhao (Stanford/MIT) | Bimanual manipulation from ~10 min of demos using transformers + action chunking |
| **Diffusion Policy** | Chi et al. (Columbia) | Diffusion model as robot policy; strong multi-modal action coverage |
| **Eureka** | NVIDIA | LLM-generated reward functions for RL; trained in IsaacGym; superhuman dexterity on some tasks |
| **DROID Dataset** | Berkeley et al. | Large-scale in-the-wild manipulation dataset (single Franka arm, diverse settings) |

---

## 2024

| Development | Who | What |
|---|---|---|
| **π0 (pi-zero)** | Physical Intelligence | Generalist VLA; flow-matching action head; multi-task dexterous manipulation |
| **Electric Atlas** | Boston Dynamics | Hydraulic Atlas retired; all-electric humanoid for commercial deployment |
| **Figure 01 → 02** | Figure AI | Humanoid robots at BMW automotive assembly; OpenAI partnership (then ended) |
| **Octo** | UC Berkeley | Open-source generalist robot policy; diffusion action head; cross-embodiment |
| **RDT-1B** | Tsinghua | 1B-parameter diffusion transformer for robot manipulation |
| **OpenVLA** | Stanford | Open-source VLA; 7B params; reproducible and accessible |

---

## 2025

| Development | Who | What |
|---|---|---|
| **Gemini Robotics** | Google DeepMind | Gemini 2.0-based VLA; supports bipedal, bimanual, and mobile robots |
| **Gemini Robotics 1.5** | Google DeepMind | Most capable VLA to date as of Sept 2025 |
| **Figure BotQ factory** | Figure AI | First dedicated humanoid robot factory; 12k units/year capacity; $39B valuation |
| **π0.5 / π0-FAST** | Physical Intelligence | Follow-ups to pi-zero; speed + generalization improvements |
| **Amazon 1 millionth robot** | Amazon | Milestone deployment (July 2025) |
| **Waymo 10M rides** | Waymo | Autonomous vehicle milestone (May 2025) |
| **$7.3B VC deal value** | Market | H1 2025 robotics deal value — humanoid + mobile robot focus |

---

## Key Research Papers (Must-Know)

| Paper | Authors | Year | Why It Matters |
|---|---|---|---|
| **RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control** | Google DeepMind | 2023 | Established VLA paradigm; showed internet-trained VLMs can control robots |
| **Open X-Embodiment: Robotic Learning Datasets and RT-X Models** | 34 labs | 2023 | First cross-embodiment dataset at scale |
| **Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware (ACT)** | Zhao et al. | 2023 | ALOHA + ACT = practical bimanual learning from minimal demos |
| **Diffusion Policy: Visuomotor Policy Learning via Action Diffusion** | Chi et al. | 2023 | Diffusion models > BC for complex action distributions |
| **π₀: A Vision-Language-Action Flow Model for General Robot Control** | Black et al. (Physical Intelligence) | 2024 | First large-scale generalist VLA; flow matching beats diffusion on speed |
| **Octo: An Open-Source Generalist Robot Policy** | Ghosh et al. (UC Berkeley) | 2024 | Open-source baseline; makes cross-embodiment research reproducible |
| **DROID: A Large-Scale In-The-Wild Robot Manipulation Dataset** | Khazatsky et al. | 2024 | Data diversity at scale matters more than quantity in fixed settings |
| **Eureka: Human-Level Reward Design via Coding Large Language Models** | Ma et al. (NVIDIA) | 2023 | LLMs can design RL reward functions; removes human reward engineering bottleneck |

---

## The Big Narrative Arc (2022–2025)

```
2022: LLMs start helping robots plan (SayCan, RT-1)
2023: VLA paradigm established (RT-2); data at scale (OXE); efficient IL (ACT, Diffusion Policy)
2024: Generalist VLAs arrive (π0, Octo, OpenVLA); first commercial humanoids ship
2025: Race to factory-scale humanoid deployment; VLAs become production systems
```

**Funding context**: Robotics VC investment reached $7.3B in H1 2025 alone — driven by belief that humanoid robots will be the next major computing platform.

---

## Companies Racing for Humanoid Supremacy (2025)

| Company | Key Product | Status |
|---|---|---|
| Figure AI | Figure 02, 03 | BotQ factory building 12k/year; $39B valuation |
| Physical Intelligence | π software layer | $1.1B raised; supplies brains to other robot companies |
| Boston Dynamics | Electric Atlas | Commercially deployed; Hyundai-backed |
| 1X Technologies | NEO (home) | OpenAI-backed; targeting consumer market |
| Agility Robotics | Digit | Deployed at Amazon warehouses |
| Unitree | G1 (~$16k) | Cheapest capable humanoid; dominant in research |
| Tesla | Optimus | Vertical integration with FSD/Autopilot data pipeline |

→ See also: [[05 - Famous Companies in Robotics]] | [[08 - Key Subfields & Concepts]]

# Famous People in Robotics

Tags: #robotics #people #researchers

---

## Founding Figures

| Name | Dates | Known For |
|---|---|---|
| **George Devol** | 1912–2011 | Invented Unimate (1954) — first programmable industrial robot. Filed the patent that launched industrial robotics. |
| **Joseph Engelberger** | 1925–2015 | "Father of Robotics." Commercialized Devol's Unimate; founded Unimation — first robot company. |
| **Ichiro Kato** | 1925–1994 | Waseda University. Built WABOT-1 (1973) — first full-scale anthropomorphic humanoid robot. |
| **Karel Čapek** | 1890–1938 | Czech playwright who coined the word "robot" in 1921 (*R.U.R.*). Not an engineer, but named the field. |
| **Isaac Asimov** | 1920–1992 | Sci-fi author who formulated the Three Laws of Robotics (1942) — still discussed in robot ethics. |

---

## Locomotion & Hardware Legends

### Marc Raibert
- **Affiliation**: Founder of Boston Dynamics (1992); now Executive Director, Boston Dynamics AI Institute
- **Education**: MIT PhD
- **Known for**: Pioneered *dynamic* legged locomotion — robots that balance and move like animals, not static walkers. Founded Leg Lab at CMU, then MIT. Built BigDog (2005), Spot (2018), Atlas. Sold Boston Dynamics to Google (2013), then SoftBank (2017), then Hyundai (2021).
- **Key insight**: Robots should use dynamic balance (like humans) rather than static stability (like a table). Motion itself provides stability.

### Rodney Brooks
- **Affiliation**: MIT (Professor Emeritus); co-founder iRobot (1990); founder Rethink Robotics (2008)
- **Known for**: **Subsumption architecture** — behavior-based robotics; intelligence emerges from layered simple behaviors without central planning. Co-founded iRobot which made the Roomba. Created Baxter cobot.
- **Key paper**: "Intelligence Without Representation" (1991) — argued against symbolic AI; embodied reactive systems instead.
- **Quote**: "The world is its own best model."

---

## Academic Leaders (Current — UC Berkeley Cluster)

### Pieter Abbeel
- **Affiliation**: UC Berkeley (Professor); co-founder Covariant AI (2017)
- **Known for**: Deep RL for robotics; learning from demonstrations (LfD); advisor to John Schulman (PPO author) and other OpenAI founders. TRPO. Ran Berkeley AUTOLAB.
- **Covariant**: Warehouse picking AI; trained RFM-1 (Robot Foundation Model)

### Sergey Levine
- **Affiliation**: UC Berkeley (Professor); co-founder Physical Intelligence (π)
- **Known for**: Deep RL for robot control; offline RL (learning from static datasets without environment interaction); key author on RT-1, RT-2, Open X-Embodiment; π0 architecture
- **Lab**: Berkeley Robot Learning Lab (RAIL)

### Ken Goldberg
- **Affiliation**: UC Berkeley (Professor)
- **Known for**: Robot grasping (geometric analysis); cloud robotics; robot data collection; famous for saying robots are ~120,000x data-poorer than LLMs (NVIDIA GTC 2025)

---

## Academic Leaders (Current — Stanford / MIT)

### Chelsea Finn
- **Affiliation**: Stanford (Professor); co-founder Physical Intelligence (π)
- **Known for**: **MAML** (Model-Agnostic Meta-Learning, 2017) — algorithm for fast adaptation to new tasks from few examples. Robot learning; applied meta-learning to manipulation.

### Russ Tedrake
- **Affiliation**: MIT (Professor); SVP Large Behavior Models at Toyota Research Institute (TRI)
- **Known for**: Underactuated robotics; **Drake** — open-source simulator/toolbox for model-based control; nonlinear control; dexterous manipulation. Author of famous MIT OCW course "Underactuated Robotics."
- **Philosophy**: Rigorous mathematical control theory meets learning.

### Tony Zhao
- **Affiliation**: Stanford/MIT → contributor to Hugging Face LeRobot ecosystem
- **Known for**: Created **ALOHA** (low-cost bimanual teleoperation) and **ACT** (Action Chunking with Transformers, 2023). Showed that ~10 minutes of demonstrations can teach a robot fine-grained bimanual tasks. Made imitation learning practical for dexterous manipulation.

### Cynthia Breazeal
- **Affiliation**: MIT Media Lab (Professor)
- **Known for**: Social robotics; built **Kismet** (1999) — first robot to recognize and simulate human facial emotions. Founded Jibo (social robot startup, 2012). Pioneer in HRI.

---

## Academic Leaders (Other)

### Dennis Hong
- **Affiliation**: UCLA (Professor), Director of RoMeLa lab
- **Known for**: Novel locomotion mechanisms; first car for the blind; various humanoid robot designs (CHARLI, THOR); diverse and creative robot morphologies.

### Dieter Fox
- **Affiliation**: University of Washington (Professor); NVIDIA Research
- **Known for**: SLAM; deep learning for manipulation; robot perception; Dex-Net (grasp planning dataset)

### Oussama Khatib
- **Affiliation**: Stanford (Professor)
- **Known for**: Robot control theory; operational space control; underwater humanoid robotics (OceanOne); influential on KUKA iiwa cobot design

### Andrew Ng
- **Affiliation**: Stanford; Coursera; AI Fund
- **Known for**: Early robot learning; STAIR project at Stanford which drove creation of ROS; Google Brain co-founder; made ML accessible globally. Less active in robotics now but foundational to the field's ML roots.

### Yann LeCun
- **Affiliation**: NYU (Professor); VP & Chief AI Scientist at Meta AI
- **Known for**: Deep learning pioneer (CNNs, backpropagation). Vocal critic of current LLM-centric AI for robotics — argues we need **world models** (internal physics models) for genuine intelligence. Not a roboticist per se, but highly influential on the field's direction.

---

## Industry Researchers (2020s)

| Name | Affiliation | Known For |
|---|---|---|
| **Karol Hausman** | Physical Intelligence; formerly Google Brain | Robot learning; co-founder of π (Physical Intelligence) |
| **Brian Ichter** | Physical Intelligence; formerly Google Brain | "Code as actions" for robot planning; robot task planning with LLMs |
| **Vincent Vanhoucke** | Google DeepMind | RT-1, RT-2, large-scale robot learning at Google |
| **Pete Florence** | Google DeepMind | Transporter Networks (2020); Diffusion Policy; robot manipulation |
| **Ben Mildenhall** | Google DeepMind | Invented **NeRF** (Neural Radiance Fields, 2020) — key for 3D robot perception |
| **Scott Reed** | Google DeepMind | **Gato** (2022) — generalist agent across text, images, games, and robotics |
| **John Schulman** | (formerly OpenAI) | PPO, TRPO — the most-used RL algorithms in robot training |

---

## Who's Who Quick Reference

**If you hear about…**
- Dynamic legged locomotion → **Marc Raibert** / Boston Dynamics
- Social/emotional robots → **Cynthia Breazeal**
- Meta-learning / fast task adaptation → **Chelsea Finn** (MAML)
- Behavior-based robotics / no central planner → **Rodney Brooks**
- Bimanual teleoperation + ACT → **Tony Zhao** (ALOHA)
- Deep RL at Berkeley → **Pieter Abbeel** or **Sergey Levine**
- Drake simulator / underactuated robotics → **Russ Tedrake**
- π0, Physical Intelligence → **Sergey Levine** + **Chelsea Finn** + Karol Hausman
- Diffusion Policy → **Pete Florence** (Google DeepMind / Columbia collab)
- NeRF for scene understanding → **Ben Mildenhall**

→ See also: [[05 - Famous Companies in Robotics]] | [[01 - History of Robotics]]

**Agent Operations (AgentOps**) = operational methodology which addresses the challenges of reliability & responsibility in production. 
- adapts the principles of DevOps, MLOps, and Data Ops, but for AI Agents
- gives a systematic, automated, ad reproducible framework for handling the complexities of non-deterministic, LLM-based systems in production environments.
- systemizes the development process
- provides continouous feedback loops to improve an agent's reliability, safety, and performance across its tools, reasoning capabilities, and underlying models.

Traditional testing often focuses on lexical correctness (the accuracy and appropriateness of the words), but agent evaluation must address 2 harder problems:
1. semantic correctness (did the agent understand and helpfully answer the user's intent?)
2. and reasoning correctness (did the agent follow a logical and efficient path to its conclusion?)

#### Layer 1: Component-level evaluation (deterministic unit tests)
This layer focuses on the predictable, non-LLM components of the agent's system.

#### Layer 2: Trajectory evaluation (procedural correctness)
Most critical layer for evaluating the agent's reasoning process. A "trajectory" is the full sequence of Reason, Act, and Observe steps the agent takes to complete a task.

#### Layer 3: Outcome evaluation (semantic correctness)
Evaluates the final, user-facing response generated after the ReAct loop has concluded.

#### Layer 4: System-level monitoring (in-production)
Evaluating doesn't stop at deployment, continuously monitoring the agent's live performance is critical. This layer tracks the real-world performance and detects operational failures or behavioral drift.
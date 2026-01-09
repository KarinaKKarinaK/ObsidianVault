### Core Capabilities
**perception**, **reasoning**, **planning**, **decision-making**, **action execution**, **learning**, and **memory**

## Key Components of Every Agent

#### Models: Selection and Tuning

***model = agent's brain***; you use the model to read user requests, figure out what actions need to be taken, generate responses

**choosing the right model =>** finding balance between capability, speed, and cost (the 3 conflicting characteristics)

- **common mistake:** over-investing in capability when a use-case doesn't need it, leads to unnecessary over-spending and slower performance

at a system level, robust cognitive architectures use multiple specialized agents, each using a model that suits best for its specific task

###### Model Tuning
Once you select a model, you can also **fine-tune** it to **specialize its knowledge and style** for your specific needs.
###### Tooling
**Tools =** defined capabilities that enable an agent to do more than native functions of its core reasoning model, *e.g. interacting with external systems via API calls*.

Tools can include different components like:
- **Internal functions and services** => proprietary logic written by your own team
- **APIs** => connections to internal & external services
- **Data sources** => ability to query databases, vector stores or other repositories of information
- **Other agents** => in a multi-agent system, one agent can use another specialized agent as a tool

**Fine-tuning vs grounding**
Fine-tuning = adapting a model's style and refining it's knwoeldge on a specific task versus grounding = connecting a model to real-time, verfifiable data sources to ensure its responses are factually accurate.

## Data Architecture For Agentic Systems

1. **Long-term knowledge base (grounding & retrieval)** => the foundation for the agent's intelligence, grounding and personalization. 
	- Distinct from the short-term context of a live conversation.
	- Should be comprised of 3 core components:
		- a structured knowledge base for fact-based grounding via retrieval-augmented generation (RAG)
		- a persistent store for user interaction history to enable a continuous, personalized experience
		- an operational data lake for raw material like conversation transcripts and workflow states (for more complex cognitive processes and future analytics).
2. **Working memory (conversational context & short-term state)**
	- this layer manages the transit info needed for and ongoing task or conversation.
	- must provide extremely low-latency access to maintain a responsive user experience
3. **Transactional memory (state management and action auditing)**
	- this layer records actions and state changes with consistency & integrity
	- serves as the system of record, (often requires ACID guarantees to ensure reliability)

## Agent Orchestration - The Executive Function

**Orchestration** == the opertional core which guides the agent through a multi-step task
- for any task that **requires more than one step**, orchetsration determines **which tools** are needed, **in what sequence**, and **how their outputs should be combined** to achieve a final goal.
- "responsible for planning and decision-making"

Common & effective **orchestration pattern** --> **ReAct (Reason + Action) == a framework** that synergizes the reasoning & acting capabilities of LLMs.
- it sets a dynamic, multi-turn loop where the model generates both reasoning traces (thoughts) and task-specific actions in an interleaved manner
	- this allows for greater synergy --> reaosning helps the model track & update action plans, while actions gather info from external tools to inform the reasoning process.
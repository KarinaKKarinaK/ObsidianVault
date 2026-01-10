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

**How this pattern works:**
1. **Reason:** agent assesses goal & current state, forms a hypothesis abot the next best step & whether a tool is required
2. **Act:** agent selects & invokes the appropriate tool
3. **Observe:** agent receives the output from the tool. This new info is integrated into the agent's context and feeds into the next Reason step of the cycle.

## Runtime: Deploying Agents At Scale

Deploying an agent into production requires robust **runtime architecture**. Handling complex **operational requirements** like **security, load balancing, and error handling.**

Production-grade runtime environment for AI agents must provide several core capabilities:
- **Scalability:** automatic scaling (from zero to million requests); thsi includes both request-based load balancing and resource-based
- **Security:** managing identity, network access ontrols, secure communication channels (to protect the agent and the data it accesses).
- **Reliability & Observability:** mechanisms for error handling, autom atic retries, comprehensive monitoring (this involves: logging agent actions & tool outputs, and cvollecting metrics on performance and resource utilization to diagnose & resolve issues)

# The Role Of Grounding In Agentic Systems + RAG
The **agent's credibility & usefulness** depends on its ability to provide **accurate, trustworthy answers** based on **verifiable facts**, a process known as **grounding**.

***RAG grounds an agent by retrieving text based on semantic similarity.***

- **Retrieving text**: fetching relevant documents or passages from a knowledge source.
    
- **Grounding**: constraining the model’s responses to be based on retrieved, factual information.
    
- **Semantic similarity**: measuring how close in meaning two pieces of text are, not just their exact words.

**GraphRAG =>** enriches grounding by understanding the explicit relationships between data points in a knowledge graph.

**Agentic RAG =>** the agent is no longer a passive recipient of info but rather an active, reasoning participant in the retrieval process itself, capable of executing m ulti-step strategies to find the best possible answer.

### RAG:
- The RAG approach **enhances an LLM's responses** by **retrieving relevant info** from an **external knowledge base** before generating an answer.
- Instead of relying solely on its pre-trained knowledge, the agent performs semantic search to find verifiable data, which is then passed to the LLM in context. (ensures a basleine of grounded, verifiable answers).
- **Limitations:** its a simple retrieve-then-generate process whcih treats knwoeldge as **a flat collection of disconnected facts**, its effective for **direct question-answering**, but it falls short on **complex queries that require a deeper understanding of the relationships between data points**.
- **Benefits:**
	- **Agents can access the latest info =>** retrieved info is more current than the one from the agent's last training date
	- **Agents are more accurate =>** RAG reduces risk of outputs that could lead to incorrect or inappropriate agentic actions
	- **Faster responses** => vector embeddings and specialized databases enable really fast semantic searches of massive datasets, so agents can deliver more responsive, timely decisions.
	- **More comprehensive agent awareness** => the **RAG workflow** (which consists of **ingesting, parsing, chunking, embedding, storing, and retrieving**) can be applied to text, images, and other data types. With this **deeper understanding** --> agents can perform more complex, multistep reasoning tasks.


![[Pasted image 20260110142912.png]]


### Vector Databases: Search by meaning
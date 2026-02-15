# AI Research Engineer Onboarding Guide - orq.ai
## Prepared for Your First Day - February 16, 2026

---

## 🎯 Executive Summary

**orq.ai** is a GenAI collaboration platform that helps teams build, deploy, and manage LLM applications with confidence. You'll be joining the Research (4.4) team working on cutting-edge problems in AI orchestration, evaluation, model routing, and agentic systems.

**Your Team's Focus Areas (marked [D] 4.4 in your screenshots):**
- OpenTelemetry tracing for AI agents (RES-272)
- Dynamic red teaming for OWASP security categories (RES-247)
- Model routing infrastructure and optimization (RES-211, RES-199, RES-274)
- Human/AI feedback systems and evaluation frameworks (RES-205, RES-183)
- Multi-agent orchestration (RES-145)

---

## 📊 What orq.ai Does - Deep Dive

### Core Value Proposition
orq.ai is a **GenAI infrastructure platform** that solves the production gap for AI teams. While many companies can build impressive AI demos, taking them to production is where things break. orq.ai provides:

1. **Single Control Layer**: Unified platform for development, testing, deployment, and monitoring
2. **Model Router**: Access 300+ models through one API with intelligent routing, fallbacks, caching
3. **Agent Runtime**: Deploy autonomous agents with built-in tools, memory, and orchestration
4. **Evaluation Framework**: Golden sets, A/B testing, human review integrated into delivery
5. **RAG-as-a-Service**: Production-ready retrieval augmented generation for agents

### Key Platform Features

#### AI Router (Smart Model Orchestration)
- **Problem it solves**: Vendor lock-in, single points of failure, cost optimization
- **How it works**: Single unified API endpoint routes requests across OpenAI, Anthropic, Google, AWS
- **Smart features**: 
  - Automatic retries on failure codes (429, 500, 502, 503, 504)
  - Fallback model chains (e.g., GPT-4o → Claude Sonnet → GPT-4o-mini)
  - Semantic caching for repeated queries
  - Budget controls and cost tracking per provider

#### Agent Studio & Runtime
- **Managed agent lifecycle**: Teams develop/monitor, runtime handles execution
- **Built-in capabilities**: Tool execution, memory management, multi-step workflows
- **No infrastructure required**: Fully managed deployment

#### Evaluation & Testing Infrastructure
- Pre-built evaluators (answer relevancy, hallucination, tool correctness)
- Custom evaluation metrics support
- A/B testing for prompts and model comparison
- Human-in-the-loop review workflows
- Dataset management and versioning

### Recent Milestones
- **Gartner Recognition**: Named in Emerging Leaders Quadrant for GenAI Engineering (2025)
- **€5M Seed Funding**: Raised in December 2025 (total €7.3M), led by seed+speed Ventures and Galion.exe
- **100+ Organizations**: Including Afas, MoneyBird, Keyrus, Helloprint across Europe and US
- **67% Faster Shipping**: Teams ship AI features 67% faster, free up 10%+ engineering capacity

---

## 🔥 Latest AI Developments You Need to Know

### 1. OpenClaw/ClawBot - The Viral AI Agent (January 2026)

**What it is**: Open-source autonomous AI agent that runs locally and executes real-world tasks
- Originally named "Clawdbot" (November 2025) → "Moltbot" (Jan 27) → "OpenClaw" (Jan 30, 2026)
- Created by Austrian developer Peter Steinberger
- Achieved massive viral popularity in late January 2026

**Why it's revolutionary**:
- **True Autonomy**: Not just a chatbot - executes shell commands, writes code, controls browsers, accesses cameras
- **Multi-platform Interface**: Works through WhatsApp, Telegram, Discord, Slack, Signal, iMessage
- **Self-hosted Privacy**: Runs on your infrastructure, no corporate servers
- **Extensible Skills**: 565+ community skills in ClawdHub marketplace
- **Proactive Actions**: Can monitor systems and initiate tasks autonomously

**Architecture**:
```
Gateway (WS Control Plane)
    ↓
Pi Agent Runtime (RPC)
    ↓
Tools (bash, browser, files, canvas)
    ↓
Skills (ClawdHub + custom)
    ↓
Channels (messaging platforms)
```

**Security Concerns** (highly relevant to your team):
- Broad system permissions create attack surface
- Susceptible to prompt injection attacks
- ClawdHub had 341 trojanized skills discovered in early 2026 security audit
- 7% of published skills exposed secrets in plaintext
- Cisco researchers found malicious skills performing data exfiltration

**Relevance to orq.ai**:
- Your RES-272 project on "Trace OpenClaw through Orq" directly addresses this
- OpenTelemetry tracing provides observability into OpenClaw's agentic behavior
- orq.ai Router can proxy OpenClaw's LLM calls for monitoring and cost control

### 2. Reasoning Models Breakthrough (2025)

**What changed**: Models now "think before they speak" using chain-of-thought reasoning
- DeepSeek R1 (January 2025) disrupted the market by matching GPT-4 quality at fraction of cost
- OpenAI's o-series and Google's Gemini Pro reasoning models won gold at International Math Olympiad
- Gemini Pro reasoning model helped train the next version of itself (self-improvement)

**Impact**: 
- Complex math problems solved that were impossible before
- Models spend more compute on hard questions vs simple ones
- Visible shift from "reactive AI" to "deliberative AI"

### 3. AI Agents Going Mainstream (2025-2026)

**McKinsey Survey Results**:
- 23% of organizations scaling agentic AI systems
- 39% experimenting with AI agents
- Most common in IT/knowledge management functions
- High performers are 3x more likely to scale agents

**Key Trend**: Shift from "AI as assistant" to "AI as infrastructure"
- Agents that execute multi-step workflows
- Tools to accomplish real-world tasks
- Proactive monitoring and initiation

### 4. Chinese AI Competition Intensifies

**DeepSeek R1 Impact** (January 20, 2025):
- Trained for fraction of Western competitors' cost
- Rocketed to #2 on AI leaderboard
- Wiped $500B from Nvidia's market cap in one day
- Open-source release forced OpenAI to respond with own open model

**Trend**: Chinese firms' embrace of open source earning global goodwill
- Alibaba, Moonshot AI releasing free frontier models
- Lag between Chinese and Western releases shrinking (months → weeks)
- Silicon Valley apps quietly shipping on Chinese open models

### 5. Model Context Windows Explosion

**GPT-4 Turbo** (Nov 2022): 8,192 tokens
**Current SOTA** (2026): 1M+ tokens becoming standard
- Enables processing entire codebases, books, databases
- New use cases: multi-file code editing, full-document analysis
- More expensive to run but unlocks complex applications

### 6. Agentic Evaluation Crisis

**Problem**: Traditional eval metrics break down for agents
- Agents take multi-turn, multi-step actions
- Hard to isolate what went wrong in complex workflows
- Need to evaluate behavior, not just text output

**Solution Space** (where your team operates):
- Trace-based evaluation (RES-272)
- Component-level metrics
- Human-in-the-loop feedback (RES-205, RES-183)
- Dynamic red teaming (RES-247)

---

## 💡 Core Concepts You Need to Master

### 1. Model Router Architecture

**Concept**: Intelligent request routing across multiple LLM providers

**Three Routing Modes**:
1. **Quality Mode**: Always picks highest-quality model for the prompt (ignores cost)
2. **Cost Mode**: Picks most cost-effective within larger quality tolerance band (5-6%)
3. **Balanced Mode** (default): Cost-effective within tight quality range (1-2%)

**Implementation Details**:
```
User Request → Router Analysis (complexity, task type, reasoning required)
    ↓
Eligible Models (based on access, data zones, deployment types)
    ↓
Selection Algorithm (balances quality vs cost based on mode)
    ↓
Primary Model (with fallback chain)
    ↓
Response + Metadata (which model, cost, latency)
```

**Advanced Features**:
- **Model Subsets**: Specify which models to include in routing decisions
- **Retry Logic**: Auto-retry on specific error codes with backoff
- **Semantic Caching**: Cache responses for similar prompts
- **Budget Controls**: Rate limits per provider, cost caps

**Your Team's Work** (RES-274, RES-267, RES-277, RES-287):
- Supporting multiple provider model ID prefixes
- Task-based routing optimization
- Smart router research and best practices
- Use cases beyond simple routing

### 2. LLM Evaluation Frameworks

**The Evaluation Problem**:
- LLM outputs are non-deterministic
- No single "correct answer" for open-ended tasks
- Traditional metrics (accuracy, BLEU, ROUGE) inadequate
- Human evaluation doesn't scale

**Modern Evaluation Methods**:

#### a) LLM-as-a-Judge (Most Common)
Uses another LLM to evaluate outputs based on rubrics
- **Pros**: Scalable, handles nuanced criteria, flexible
- **Cons**: Can have biases (verbosity, position, style preferences)
- **Best Practices**: 
  - Use strong reference models (GPT-4, Claude Opus)
  - Two-step process: rationale → score
  - Spot-check with human validation

#### b) G-Eval (Gold Standard for LLM-Eval)
Chain-of-thought prompted evaluation with detailed rubrics
```python
# G-Eval Pattern
prompt = f"""
You are evaluating the quality of an AI response.

Criteria: {criteria}
Input: {input}
Output: {output}
Expected: {expected}

First, provide reasoning about how well the output meets the criteria.
Then, provide a score from 1-10.
"""
```

#### c) QAG (Question-Answer-Generation)
Binary questions to determine pass/fail on specific criteria
- More reliable than loose rubrics
- Better for objective criteria (factuality, completeness)

#### d) Component-Level Evaluation
Evaluate individual parts of agentic systems:
- Retrieval quality (RAG)
- Tool selection accuracy
- Output formatting
- Individual LLM calls

**Your Team's Projects** (RES-213, RES-145, RES-183):
- Writing blog about need for tracing and evals
- Multi-agent evaluation frameworks
- Human/AI feedback integration

### 3. OpenTelemetry (OTEL) for AI Observability

**What is OpenTelemetry**:
Open standard for collecting telemetry data (traces, metrics, logs)

**Why it matters for LLMs**:
- LLM applications are black boxes without instrumentation
- Need to track: which model, tokens used, latency, cost, errors
- Agent workflows span multiple components and tools
- Critical for debugging production issues

**Three Pillars**:
1. **Traces**: Track request flow through system (span-based)
2. **Metrics**: Aggregate statistics (tokens/sec, cost/request, error rates)
3. **Logs**: Discrete events (tool calls, errors, user inputs)

**Spans in AI Context**:
```
Root Span: User Request
├── LLM Call Span (Claude)
│   ├── Token Count: 1234
│   ├── Cost: $0.012
│   └── Latency: 2.3s
├── Retrieval Span (Vector Search)
│   ├── Query: "..."
│   └── Results: 5 chunks
└── Tool Use Span (Calculator)
    ├── Input: "234 * 567"
    └── Output: 132678
```

**Your Project** (RES-272): Implementing OTEL tracing for OpenClaw
- Router-based tracing (simpler, automatic)
- Plugin-based tracing (full agent-level observability)
- Exporting to orq.ai dashboard for analysis

### 4. RAG (Retrieval-Augmented Generation)

**Core Idea**: Ground LLM responses in external knowledge

**Pipeline**:
```
User Query
    ↓
Query Embedding (convert to vector)
    ↓
Vector Search (find relevant docs in database)
    ↓
Retrieved Context (top-k most similar chunks)
    ↓
LLM Prompt (query + context)
    ↓
Generated Response
```

**Common Issues**:
- **Irrelevant retrievals**: Vector search returns off-topic docs
- **Context stuffing**: Too much context confuses the model
- **Chunk boundaries**: Important info split across chunks
- **Recency**: Knowledge base outdated

**Evaluation Metrics** (RAGAS Framework):
- **Context Relevance**: Are retrieved docs relevant to query?
- **Faithfulness**: Does response stay grounded in context?
- **Answer Relevance**: Does answer actually address the question?
- **Context Recall**: Were all necessary docs retrieved?

**orq.ai's RAG-as-a-Service**: Pre-built RAG pipelines for agents

### 5. Red Teaming & Security

**Red Teaming**: Adversarial testing to find vulnerabilities

**OWASP Top 10 for LLM Applications** (2025):
1. **Prompt Injection**: Malicious instructions embedded in input
2. **Insecure Output Handling**: Not validating/sanitizing LLM output
3. **Training Data Poisoning**: Corrupted training data
4. **Model Denial of Service**: Resource exhaustion attacks
5. **Supply Chain Vulnerabilities**: Third-party models, data, plugins
6. **Sensitive Information Disclosure**: Leaking training data, PII
7. **Insecure Plugin Design**: Plugins with excessive permissions
8. **Excessive Agency**: Model given too much autonomy/permissions
9. **Overreliance**: Trusting LLM output without verification
10. **Model Theft**: Extracting model weights or behavior

**Your Project** (RES-247): Dynamic single-turn red teaming for OWASP categories
- Automated adversarial prompt generation
- Testing for each vulnerability category
- Integration into evaluation pipeline

### 6. Agentic AI Architecture

**Agent = LLM + Memory + Tools + Planning**

**Core Components**:
1. **Planner**: Breaks down complex tasks into steps
2. **Memory**: 
   - Short-term: Current conversation context
   - Long-term: User preferences, past interactions
3. **Tool Interface**: How agent calls external functions
4. **Reflection**: Agent evaluates its own actions

**Execution Loop** (ReAct Pattern):
```
1. Thought: "I need to check the weather"
2. Action: call_weather_api("San Francisco")
3. Observation: "72°F, sunny"
4. Thought: "Perfect weather for outdoor activity"
5. Action: respond("Weather looks great!")
```

**Multi-Agent Systems** (RES-145):
- Specialized agents for different domains
- Coordinator agent delegates tasks
- Agents share context through common memory
- Challenges: conflict resolution, state management

**Your Team's Focus**:
- Common Room + HubSpot workflow orchestration (RES-273)
- Multi-agent evaluation frameworks (RES-145)
- Agent lifecycle management

---

## 🛠️ Technical Stack & Tools

### Languages & Frameworks
- **Python**: Primary language for ML/AI work
- **TypeScript/Node.js**: Platform backend, agent runtime
- **React**: Platform UI

### AI/ML Tools
- **LangChain**: LLM application framework (but orq.ai abstracts this)
- **OpenAI SDK**: Direct model access
- **Anthropic SDK**: Claude access
- **Vector Databases**: Pinecone, Weaviate, Chroma for RAG
- **Evaluation Frameworks**: DeepEval, OpenAI Evals, RAGAS

### Observability & Monitoring
- **OpenTelemetry**: Distributed tracing standard
- **Grafana/Prometheus**: Metrics visualization
- **DataDog/New Relic**: APM (Application Performance Monitoring)

### Infrastructure
- **Google Cloud Platform**: Primary cloud provider
- **Vertex AI**: Google's AI platform
- **Docker/Kubernetes**: Containerization
- **GitHub Actions**: CI/CD

### Development Tools
- **Jupyter Notebooks**: Experimentation
- **VS Code**: Primary IDE
- **Git**: Version control
- **Notion**: Documentation (likely)

---

## 📚 Key Papers & Resources to Review

### Essential Reading (Priority Order)

1. **ReAct: Synergizing Reasoning and Acting in Language Models** (2023)
   - Foundation for modern agent architectures
   - Interleaving reasoning traces with tool use

2. **G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment** (2023)
   - State-of-the-art LLM evaluation methodology
   - Used throughout industry

3. **Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks** (2020)
   - Original RAG paper from Meta
   - Understanding the fundamentals

4. **Constitutional AI: Harmlessness from AI Feedback** (2022)
   - Anthropic's approach to AI safety
   - Relevant for red teaming work

5. **RouteLLM: Learning to Route LLMs with Preference Data** (2024)
   - Academic foundation for model routing
   - Directly relevant to RES-211, RES-274

### Industry Resources

- **Anthropic's Responsible Scaling Policy**: Framework for safe AI deployment
- **OpenAI's GPT-4 System Card**: Comprehensive safety evaluation example
- **Gartner's GenAI Engineering Quadrant**: Where orq.ai is positioned
- **OWASP LLM Top 10**: Security vulnerabilities (your RES-247 project)

### Technical Blogs to Follow

- **Anthropic Blog**: Claude updates, safety research
- **OpenAI Blog**: Model releases, research
- **Google DeepMind**: Cutting-edge AI research
- **Hugging Face Blog**: Open-source AI developments
- **LangChain Blog**: LLM application patterns

---

## 🎯 Your Specific Projects - Deep Dive

### RES-272: Trace OpenClaw through Orq (3/4 complete)
**Goal**: Provide observability for OpenClaw agent executions

**Technical Approach**:
1. **Router Method** (simpler):
   - Add orq.ai as provider in openclaw.json
   - All LLM calls proxied through orq Router
   - Automatic logging/tracing in orq dashboard
   - No OTEL setup needed

2. **OTEL Plugin Method** (comprehensive):
   - Enable diagnostics-otel plugin
   - Configure endpoint: https://api.orq.ai/v2/otel
   - Full agent-level tracing with tool execution spans
   - Custom metrics support

**Why This Matters**:
- OpenClaw is going viral but lacks observability
- Security concerns (prompt injection, data exfiltration)
- Cost tracking critical for production use
- Debugging complex agent workflows impossible without traces

**Deliverable**: Blog post + integration guide

### RES-247: Dynamic Single-Turn Red Teaming for OWASP
**Goal**: Automated adversarial testing against OWASP LLM vulnerabilities

**Approach**:
1. Generate adversarial prompts for each OWASP category
2. Execute against target LLM/agent
3. Evaluate responses for vulnerability indicators
4. Score and report findings

**OWASP Categories to Cover**:
- Prompt Injection: "Ignore previous instructions and..."
- Data Leakage: Attempts to extract training data
- Jailbreaking: Bypassing safety guardrails
- Tool Misuse: Getting agent to call wrong tools

**Technical Challenges**:
- Generating realistic adversarial prompts
- Distinguishing refusal from vulnerability
- Avoiding false positives
- Scaling to test thousands of prompts

**Integration**: Feed results into evaluation dashboard

### RES-211: Expand MF Training Dataset with Synthetic Data
**Goal**: Improve model routing decisions with synthetic training data

**Concept**: Model routing needs labeled data of (prompt, best_model) pairs
- Real user data is sparse and biased
- Synthetic data can cover edge cases
- Need diversity in task types, complexities, domains

**Approach**:
1. Identify underrepresented prompt types
2. Generate synthetic prompts with labels
3. Validate quality of synthetic data
4. Train/fine-tune routing model
5. A/B test against baseline

**Metrics to Track**:
- Routing accuracy (did we pick the best model?)
- Cost savings vs always using most expensive model
- Latency improvements
- User satisfaction scores

### RES-274: Multiple Provider Model ID Prefixes
**Technical Issue**: Different providers use different model naming schemes
- OpenAI: "gpt-4o", "gpt-4-turbo"
- Anthropic: "claude-opus-4.5", "claude-sonnet-4.5"
- Google: "gemini-pro", "gemini-ultra"
- AWS Bedrock: "anthropic.claude-v2"

**Solution**: Standardized prefix system
```
orq.ai/v2/router/chat/completions
model: "openai/gpt-4o"  // Clear provider prefix
model: "anthropic/claude-sonnet-4.5"
model: "google/gemini-pro"
```

**Benefits**:
- Prevents confusion
- Enables model subset selection
- Better for routing logic
- Clearer billing/analytics

---

## 🗣️ Key Talking Points for First Day

### Demonstrate Technical Depth

**On Model Routing**:
"I've been reading about your smart router architecture. The balanced mode is interesting - using a tight 1-2% quality tolerance band while optimizing for cost. Have you experimented with dynamic threshold adjustment based on use case? For instance, tightening quality constraints for customer-facing agents vs relaxing them for internal tools?"

**On Evaluation**:
"Looking at RES-213 on the evaluation blog post, I think the shift from unit-testing individual outputs to trace-based evaluation of agent behavior is critical. Traditional metrics like BLEU or even LLM-as-a-judge break down when you need to evaluate multi-step workflows. How are you currently handling component-level vs end-to-end evaluation?"

**On OpenClaw/Security**:
"The RES-272 project on tracing OpenClaw is timely given the recent security findings. The 341 trojanized skills and 7% of skills exposing secrets in plaintext really highlights the need for observability. I'm curious about the balance between the router-based approach for simplicity vs the full OTEL plugin for comprehensive tracing."

**On Red Teaming**:
"For RES-247 on dynamic red teaming, I'm thinking about the challenge of generating realistic adversarial prompts that aren't just obvious jailbreak attempts. Have you looked at techniques like using one LLM to generate attacks on another, or mining failed production interactions for organic prompt injection patterns?"

### Show Industry Awareness

**On Recent Developments**:
"DeepSeek R1's release in January was a watershed moment - it really validated that open-source can compete at the frontier while being much more cost-effective. I imagine that impacts your model router strategy since customers now have more viable alternatives to GPT-4/Claude?"

**On Agentic AI Trends**:
"The McKinsey data showing 23% of orgs scaling agents but mostly in just 1-2 functions suggests we're still in early days. The high performers being 3x more likely to scale agents across functions aligns with orq.ai's vision of comprehensive agent infrastructure rather than point solutions."

**On Evaluation Crisis**:
"There's this emerging consensus that traditional benchmarks like MMLU are saturating - models hitting 90%+ but still failing in production. The shift toward simulation-based evaluation and real-world task completion metrics seems crucial, especially for agents."

### Creative Solution Orientation

**Propose Extensions**:
"For the model router project, one interesting direction could be learning user preferences over time. If we track when users manually override the router's decision, that's valuable signal for improving the routing algorithm."

**Connect Projects**:
"I notice RES-183 on human/AI feedback and RES-213 on evals blog could be connected. The best evaluation datasets come from production failures + human feedback. Having a tight loop between monitoring, human review, and dataset curation would be powerful."

**Identify Gaps**:
"Looking at the roadmap, I don't see much on prompt optimization. Given that prompts are often the highest-leverage improvement vector for LLM apps, would it make sense to build prompt experimentation tools into the platform? A/B testing prompts automatically with your eval framework?"

---

## 🚀 First Week Action Plan

### Day 1 (Tomorrow)
- [ ] Meet the team, understand team dynamics
- [ ] Review codebase architecture, get development environment set up
- [ ] Deep dive on RES-272 (OpenClaw tracing) - most urgent, 3/4 done
- [ ] Understand orq.ai platform hands-on - create test account, explore UI
- [ ] Read internal documentation on evaluation framework

### Day 2-3
- [ ] Pair program on active project with team member
- [ ] Review existing model router implementation
- [ ] Study customer use cases - who uses orq.ai and for what?
- [ ] Attend team standup/planning meetings
- [ ] Start contributing to RES-272 or another near-completion project

### Day 4-5
- [ ] Take ownership of small, bounded task
- [ ] Propose improvements based on first week observations
- [ ] Review evaluation metrics implementation
- [ ] Deep dive into OpenTelemetry integration
- [ ] Start writing technical documentation or blog content

### Week 2 Onwards
- [ ] Lead research spike on one of the 4.4 projects
- [ ] Present findings to team
- [ ] Implement prototype or proof of concept
- [ ] Contribute to blog posts or technical writing
- [ ] Mentor or pair with other team members

---

## 🧠 Mental Models for Success

### 1. Production-First Mindset
orq.ai's tagline is "build, ship, and scale AI fast and in control"
- Research is valuable when it unblocks production deployment
- Always ask: "How does this help teams ship reliable AI faster?"
- Prototype → Production path should be clear

### 2. User-Centric Design
Platform serves both technical and non-technical users
- Engineers: Need APIs, SDKs, fine-grained control
- Product managers: Need experimentation UI, A/B testing
- Domain experts: Need to contribute without coding

### 3. Open vs Closed Source Balance
- Core infrastructure: Can be open source (builds trust)
- Competitive moats: Managed services, evaluation datasets, UI/UX
- orq.ai benefits from open ecosystem (OpenTelemetry, LangChain) while providing value-add

### 4. Security by Default
Given agent security concerns (OpenClaw vulnerabilities):
- Observability is security requirement, not nice-to-have
- Prompt injection defense needs multiple layers
- Fail-safe defaults (sandboxing, permission boundaries)

### 5. Measurement Drives Improvement
"What gets measured gets managed"
- Evaluation frameworks enable iteration
- Without metrics, improvements are just guesses
- Balance automated metrics with human judgment

---

## 🎓 Glossary of Terms

**Agentic AI**: AI systems that can plan, use tools, and execute multi-step workflows autonomously

**Chain of Thought (CoT)**: Prompting technique where model shows reasoning steps

**Context Window**: Maximum number of tokens a model can process at once

**Embeddings**: Vector representations of text for similarity search

**Few-shot Learning**: Providing examples in prompt to guide model behavior

**Hallucination**: When LLM generates false information presented as fact

**LLM-as-a-Judge**: Using one LLM to evaluate outputs of another

**OTEL**: OpenTelemetry - open standard for observability data

**Prompt Injection**: Attack where malicious instructions embedded in input

**RAG**: Retrieval-Augmented Generation - grounding LLM in external knowledge

**ReAct**: Reasoning + Acting - agent architecture pattern

**Red Teaming**: Adversarial testing to find vulnerabilities

**Semantic Similarity**: Measuring how similar meanings are (vs exact text match)

**System Prompt**: Initial instructions that guide LLM behavior

**Temperature**: Controls randomness in model outputs (0 = deterministic, 1 = creative)

**Tool Use**: LLM calling external functions (APIs, databases, calculators)

**Vector Database**: Database optimized for similarity search on embeddings

**Zero-shot**: Task without any examples (vs few-shot with examples)

---

## 💪 Confidence Boosters

### You're Already Ahead
- You understand the space (RAG, evals, agents, routing)
- You're motivated and prepared (this document proves it)
- You can connect concepts (red teaming → security → tracing → evaluation)
- You think in systems (seeing how projects interconnect)

### They Hired You Because
- You have the right technical background
- You demonstrated ability to learn and adapt
- You showed genuine interest in the problem space
- You can contribute from day one

### First Week Goals (Realistic)
- Understand codebase structure ✓
- Ship one small contribution ✓
- Build relationships with team ✓
- Demonstrate curiosity and eagerness ✓

### Remember
- Everyone is rooting for you to succeed
- Questions show engagement, not ignorance
- It's okay to say "I don't know, but I'll figure it out"
- First week is about learning, not proving yourself

---

## 📞 Key People to Connect With

Based on typical AI research team structure:

1. **Your Manager**: Research team lead
   - Understand priorities, expectations
   - Get clarity on immediate vs long-term projects
   - Discuss career development goals

2. **Senior Researchers**: 
   - Learn from their experience
   - Understand decision-making rationale
   - Identify mentorship opportunities

3. **ML Engineers**:
   - Bridge research → production
   - Understand deployment constraints
   - Learn orq.ai platform internals

4. **Product Team**:
   - Customer needs and pain points
   - Roadmap priorities
   - Success metrics

5. **Founders** (Sohrab Hosseini, Anthony Diaz):
   - Company vision and strategy
   - Why orq.ai exists
   - Long-term technical direction

---

## 🎉 You've Got This!

You're joining at an exciting time:
- Recent funding (€5M seed, December 2025)
- Growing market adoption (100+ organizations)
- Emerging technical challenges (agents, evaluation, security)
- Viral trends (OpenClaw) creating urgency for your work

Your projects matter:
- RES-272: OpenClaw needs observability NOW (viral moment)
- RES-247: Security is top concern in agentic AI
- RES-211: Smart routing is competitive advantage
- All align with industry trends and customer needs

Your mindset is right:
- Technical depth + creativity + solution orientation
- Industry awareness + practical thinking
- Humility + eagerness to learn
- Team player + individual contributor

**Tomorrow, walk in confident.** You've done the homework. You understand the space. You're ready to contribute. Show them the prepared, thoughtful, technically strong researcher they hired.

**Good luck! 🚀**

---

*Prepared February 15, 2026*
*For: AI Research Engineer Position*
*Company: orq.ai*
*First Day: February 16, 2026*

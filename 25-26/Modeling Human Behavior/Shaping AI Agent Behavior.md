Here is a **concise, structured summary** of your notes, keeping **key findings, core ideas, and necessary detail** while removing repetition and narrative weight.

---

## Core Insight

**Correctness alone does not create trust in agentic AI.**  
Users trust agents when they align with human mental models, behave predictably, and enable smooth human handoff — not just when answers are technically correct.

---

## Why Traditional Evaluation Fails

Engineering-led evaluations focus on:

- Correct tool usage
    
- Correct data source
    
- Factual accuracy
    
- Task completion
    

But agents can still feel “wrong” when:

- Handoffs happen too early
    
- Answers are accurate but unhelpful
    
- Problems are solved awkwardly or unnaturally
    

**Key problem:**  
Traditional usability metrics assume failure along a single axis.  
Agentic AI fails **across multiple, interacting dimensions**.

When outcomes collapse into “good vs bad”:

- Teams can’t diagnose root causes
    
- Fixes become blunt
    
- Improving one dimension can degrade another
    

**Layered evaluation is required.**

---

## Layered Evaluation Framework

Agent behavior must be evaluated across **three connected layers**, each telling a different part of the story:

### 1. **Trust** (Foundation)

**Question:** Can the user rely on the agent as a collaborator?

- Trust emerges when users understand the agent’s _intent_, not just its output.
    
- High trust → users tolerate mistakes and recover
    
- Low trust → small errors trigger disengagement or churn
    

**Engineering evaluates:**

- Output correctness
    
- Logic paths
    
- Task completion
    

**UX evaluates:**

- Did the agent follow the _expected process_?
    
- Could a human confidently pick up midstream?
    
- Does the agent optimize for shared outcomes?
    

**Behavioral trust signals:**

- Increased auditing behavior
    
- More verification clicks
    
- Longer time spent checking outputs
    

---

### 2. **Momentum** (Productivity)

**Question:** Does the interaction move work forward smoothly?

Momentum evaluates **multi-turn conversations end-to-end**, including:

- Context preservation
    
- Decision continuity
    
- Quality and timing of handoffs
    

Common momentum failures:

- Handoffs too early
    
- Overly conservative system prompts
    
- Missing context due to system constraints
    
- Knowledge sources conflicting with workflows
    

**Key insight:**  
Momentum breakdowns erode trust over time — even when individual responses are correct.

---

### 3. **Sentiment** (Diagnostic Signal)

**Question:** How does the human feel as the interaction progresses?

Sentiment is not a success metric, but a **signal** pointing to trust or momentum issues.

Useful measures:

- Sentiment trajectory (improving / stable / degrading)
    
- Emotional volatility (steady vs spiky)
    
- Correlation with specific workflow moments
    

---

## Why UX Must Own AI Evaluation

Layered evaluation is **design work**, not just technical validation.

**Ownership model:**

- Engineering → accuracy, reliability
    
- UX → trust, momentum, perception
    
- Product → connects insights to roadmap decisions
    

Evaluators often must run **in sequence**  
(e.g., no point evaluating conversation quality if the wrong tool was used).

---

## Measurement Approach

- Thread-level evaluators
    
- LLM-as-a-judge for process adherence
    
- Human-labeled data used to train evaluators
    
- Evaluators surface _patterns_, not just failures
    

---

## How Evaluation Changes with Scale

### Development

- Daily reviews
    
- Flexible evaluators
    
- Heavy dogfooding
    
- Primary focus: **trust + correctness**
    
- Goal: establish a reliable foundation, not perfection
    

### Beta

- Live user data
    
- Daily team syncs to review patterns
    
- Shift focus from trust → **momentum**
    
- UX must actively lead prioritization
    
- Connect signals across layers into a coherent story
    

### At Scale

- Weekly review cadence
    
- Evaluation becomes **infrastructure**
    
- Integrated into dashboards, alerts, PM tools
    

**Operational workflow:**

1. **Detection** – dashboards flag patterns
    
2. **Investigation** – UX reviews threads
    
3. **Prioritization** – issues documented and queued
    
4. **Validation before merge** – side-by-side evals before shipping
    

➡️ Prevents fixes that improve one layer while breaking another.

---

## Leadership & Team Support (Critical Insight)

Agentic UX lacks established playbooks → **low predictability = high stress**

### How Leaders Create Stability

#### 1. **Triad Alignment**

- Explicit agreement between UX, Engineering, Product
    
- Reinforce UX-led evaluation as _infrastructure_, not a nice-to-have
    
- Misalignment is immediately felt by teams
    

#### 2. **Anchoring in UX Foundations**

- Translate agentic problems into known UX concepts:
    
    - Mental models
        
    - Error recovery
        
    - Cognitive load
        
    - Handoffs
        
- Acknowledge uncertainty openly
    

#### 3. **Psychological Safety**

- Treat evaluation as collective learning
    
- Normalize ambiguity and iteration
    
- Review failures without blame
    
- Share ownership instead of isolating responsibility
    

**Key leadership insight:**  
Creativity and judgment collapse when teams enter survival mode.  
Support keeps teams in the “thinking brain,” where nuanced agent design is possible.

---

## Final Takeaway

**Layered evaluation enables precision.**  
It turns vague frustration into actionable insight, prevents overcorrection, and aligns teams around how humans actually experience collaboration with AI.

UX ownership of evaluation doesn’t just improve agents —  
it creates teams capable of shaping agentic systems with confidence, clarity, and care.
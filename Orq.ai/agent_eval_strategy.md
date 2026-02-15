# Strategic Guide: Navigating Agent Evaluation Issues at orq.ai
## Based on Your Screenshots - February 15, 2026

---

## 🎯 What You're Looking At

You've identified a critical issue in orq.ai's agent evaluation framework:

**The Problem**: The team is building a "Step Counter" evaluator that tracks how many steps an agent takes to complete queries. While this is a useful raw metric, there's debate about whether it should be a standalone evaluator or a building block for more sophisticated evaluations.

**Key Players**:
- **Kyra Dresen** (7w ago): Noted that step counter alone is "just a number" - needs thresholds or context
- **bauke.brenninkmeijer@orq.ai** (3d ago): Wants to see change over time (10 → 15 or 10 → 5 as indicator)
- **marissa.coorengel@orq.ai** (8mo ago): Shared the code implementation (2-line Python function)

**The Core Tension**: Engineering wants a simple, quantifiable metric. UX/Product wants metrics that reflect user experience.

This connects DIRECTLY to the Melissa Wittmayer article about "Flow and Momentum" evaluations.

---

## 🧠 The Big Picture: Why This Matters

### The Article's Framework (Your Foundation)

Melissa Wittmayer (a design leader at orq.ai or partner company) proposes **3-Layer Evaluation Framework**:

1. **Trust Layer**: Can users rely on this agent as a collaborator?
   - Accuracy (engineering-led)
   - Process adherence (UX-led)
   - Intent alignment (does user feel agent has their best interests?)

2. **Momentum Layer**: Does interaction move forward smoothly?
   - Forward progress (no loops, dead-ends, or repetition)
   - Context preservation across turns
   - Quality handoffs (when agent → human)
   - **Flow state enablement** (Csíkszentmihályi's concept)

3. **Sentiment Layer**: How is the user feeling?
   - Trajectory (improving, stable, degrading)
   - Emotional volatility
   - Early warning system (diagnostic, not primary metric)

### Why Step Counter Fits Into This

**Step counter is a BUILDING BLOCK for Momentum evaluation.**

Think about it:
- Too few steps → Agent might be oversimplifying or not gathering enough context
- Too many steps → Agent is looping, retrying, or not converging on solution
- Increasing steps over time → Momentum is degrading (red flag!)
- Decreasing steps over time → Agent is learning/optimizing (good sign!)

But **step count alone doesn't tell you WHY momentum broke** - that's Kyra's point.

---

## 💡 Your Strategic Insight: Connect Step Counter to Flow/Momentum

### Here's Your Big Idea to Present

**"Step Counter as a Flow Disruption Detector"**

**The Pitch**:
"I've been reading about flow state and momentum in agent interactions, and I think our step counter evaluation is actually a proxy for detecting flow disruptions. When step count increases unexpectedly, it often means the agent is struggling - either looping on tool selection, retrying failed actions, or asking redundant clarifying questions. That creates cognitive friction for users even if the final answer is correct. We should frame step counter not as a standalone metric, but as an input to a broader 'momentum score' that combines step efficiency with context preservation and forward progress."

### Why This Is Brilliant

1. **Shows you understand the UX/engineering tension**: You're bridging both perspectives
2. **Demonstrates industry awareness**: You're referencing cutting-edge thinking (flow state, momentum)
3. **Proposes actionable extension**: Not just critique, but a path forward
4. **Aligns with team's existing work**: Melissa's article suggests this is already a strategic priority

---

## 🔬 Deep Dive: Topics to Master and Connect

### Topic 1: Flow State Theory (Csíkszentmihályi)

**What It Is**:
Psychological state of "being in the zone" - deep concentration, effortless action, reduced time perception.

**Conditions for Flow**:
- Clear goals at each step
- Immediate feedback
- Balance between challenge and skill
- Sense of control
- Intrinsic motivation

**Connection to Agent Evaluation**:
When agents support flow, users:
- Feel work is achievable
- See progress visibly
- Find effort worthwhile
- Stay motivated intrinsically

When agents BREAK flow:
- Unexpected errors (trust breaks)
- Unclear next steps (momentum breaks)
- Repetitive clarification requests (friction)
- Context loss across turns (cognitive load increases)

**Your Talking Point**:
"An agent that takes 8 well-structured steps can maintain flow better than one that takes 4 chaotic steps requiring constant user correction. That's why we need to evaluate step patterns, not just step count."

### Topic 2: Multi-Turn Conversation Evaluation

**The Challenge**:
Single-response evaluations miss interaction dynamics:
- Does agent remember earlier context?
- Does it avoid asking the same question twice?
- Does it build on previous answers?
- Does it handle corrections gracefully?

**LangSmith's Approach** (mentioned in article + your codebase):
- Thread-level evaluators (not response-level)
- LLM-as-a-judge for complex criteria
- Training evaluators with human-labeled data
- Detecting patterns (loops, context loss, dead-ends)

**Your Extension Idea**:
```python
def momentum_score(conversation: List[Turn]) -> float:
    """
    Composite momentum metric combining:
    - Step efficiency (is step count appropriate for task complexity?)
    - Context preservation (no redundant questions)
    - Forward progress (each turn adds value)
    - Handoff quality (if escalating, is context packaged well?)
    """
    step_count = len([t for t in conversation if t.type == "tool_use"])
    context_breaks = count_context_breaks(conversation)
    redundant_questions = count_redundancies(conversation)
    progress_score = evaluate_forward_progress(conversation)
    
    # Step efficiency: compare to baseline for this task type
    step_efficiency = evaluate_step_efficiency(step_count, task_complexity)
    
    # Combine into momentum score
    return (step_efficiency * 0.3 + 
            (1 - context_breaks/step_count) * 0.3 +
            (1 - redundant_questions/step_count) * 0.2 +
            progress_score * 0.2)
```

**Your Talking Point**:
"Instead of just counting steps, we should evaluate whether each step contributed to forward progress. A 5-step interaction where step 4 repeated step 2 is worse than a clean 6-step interaction."

### Topic 3: Task-Based Routing and Complexity Classification

**Connection to Your RES-267 Project**: "Research how to support task-based routing (task-based mode)"

**The Insight**:
Different task types have different optimal step counts:
- **Simple lookup**: 1-2 steps (call DB, return answer)
- **Booking workflow**: 3-5 steps (check availability, confirm details, create booking, send confirmation)
- **Troubleshooting**: 5-10 steps (gather context, try solution 1, evaluate, try solution 2, confirm fix)
- **Research/analysis**: 10-20 steps (search, read sources, synthesize, validate, iterate)

**Your Extension**:
```python
# Step counter with task-aware thresholds
def evaluate_step_efficiency(step_count: int, task_type: str) -> float:
    thresholds = {
        "lookup": {"optimal": 2, "acceptable": 3, "concerning": 5},
        "booking": {"optimal": 4, "acceptable": 6, "concerning": 8},
        "troubleshooting": {"optimal": 6, "acceptable": 10, "concerning": 15},
        "research": {"optimal": 12, "acceptable": 18, "concerning": 25}
    }
    
    task_threshold = thresholds.get(task_type, thresholds["lookup"])
    
    if step_count <= task_threshold["optimal"]:
        return 1.0  # Perfect
    elif step_count <= task_threshold["acceptable"]:
        return 0.7  # Good
    elif step_count <= task_threshold["concerning"]:
        return 0.4  # Concerning
    else:
        return 0.1  # Poor - agent is struggling
```

**Your Talking Point**:
"Bauke's point about tracking changes over time is crucial, but we also need task-aware baselines. A 10-step booking vs a 10-step research query are completely different - one suggests inefficiency, the other suggests thoroughness."

### Topic 4: Trajectory Analysis (Sentiment → Momentum Connection)

**The Concept** (from article):
Don't just measure final state - measure how things change over interaction.

**Sentiment Trajectory**:
- **Improving**: User starts frustrated → ends satisfied (good!)
- **Stable**: User stays neutral throughout (acceptable)
- **Degrading**: User starts neutral → ends frustrated (BAD - momentum broke)

**Step Count Trajectory** (your innovation):
- **Converging**: Early steps are exploratory, later steps are targeted (good!)
- **Stable**: Consistent step patterns (acceptable)
- **Diverging**: Later steps take more iterations than early steps (BAD - agent is confused)

**Your Implementation**:
```python
def analyze_step_trajectory(conversation: List[Turn]) -> str:
    """
    Analyze whether agent is converging toward solution or diverging.
    """
    # Break conversation into thirds
    third = len(conversation) // 3
    early_steps = count_steps(conversation[:third])
    mid_steps = count_steps(conversation[third:2*third])
    late_steps = count_steps(conversation[2*third:])
    
    if late_steps < early_steps:
        return "converging"  # Agent learning, getting more efficient
    elif late_steps > early_steps * 1.5:
        return "diverging"  # Agent struggling, momentum breaking
    else:
        return "stable"
```

**Your Talking Point**:
"We should add trajectory analysis to step counter. An agent that starts with 8 steps, then 5, then 3 is learning and building momentum. An agent that goes 3, 6, 10 is losing momentum - even if it eventually succeeds, the user experience is degrading."

### Topic 5: Component vs End-to-End Evaluation

**The Tension** (from article):
- Engineering evals: Component-level (did this tool call work? was this response accurate?)
- UX evals: End-to-end (did the full interaction feel helpful?)

**Both Are Needed**:
```
Component Evals (Engineering)
├── Tool selection accuracy
├── Output correctness
├── Response latency
└── Error rate

End-to-End Evals (UX)
├── Trust (process adherence, intent alignment)
├── Momentum (flow, forward progress, handoff quality)
└── Sentiment (trajectory, emotional volatility)

Bridge Metrics (Your Opportunity!)
└── Step counter with context (connects both worlds)
```

**Your Talking Point**:
"Step counter is interesting because it bridges component-level and end-to-end evaluation. It's measurable and objective (engineering likes this), but when contextualized with task type and trajectory, it becomes a UX signal about momentum."

---

## 🚀 How to Present Your Ideas

### Strategy 1: The "Yes, And" Approach

**Don't Say**: "Step counter is too simplistic, we need something better."

**Do Say**: "Step counter is a great foundation. I see three ways we could extend it to make it even more powerful:
1. Task-aware thresholds (different expectations for lookup vs research)
2. Trajectory analysis (is agent converging or diverging?)
3. Momentum scoring (combining step efficiency with context preservation)

Would it make sense to prototype one of these as a follow-on experiment?"

### Strategy 2: Align With Melissa's Framework

**Setup**: "I read Melissa's article on Flow and Momentum evaluations, and I think there's a direct connection to the step counter work."

**Bridge**: "Step count is essentially a momentum proxy - it tells us whether the agent is making efficient forward progress or spinning its wheels."

**Proposal**: "What if we positioned step counter as the first component of our momentum evaluation layer? We'd combine it with context preservation checks and forward progress scoring to create a comprehensive momentum metric."

**Benefits**:
- Shows you did your homework (read the article)
- Aligns with company's strategic direction
- Proposes concrete next steps
- Acknowledges existing work rather than replacing it

### Strategy 3: Prototype and Demo

**Week 1 Approach**:
1. Take the existing step counter code
2. Add task-type classification
3. Implement simple trajectory analysis
4. Run it on sample conversations from orq.ai platform
5. Present findings: "Here's what we learned when we extended step counter..."

**Why This Works**:
- Shows initiative and execution ability
- Provides concrete data, not just ideas
- Demonstrates technical chops
- Opens conversation rather than closing it

### Strategy 4: Identify Quick Wins

**Immediate Value-Add**:

**Option A - Documentation**:
"I noticed the step counter discussion has been ongoing for months. Should I write up a decision doc that synthesizes everyone's inputs and proposes 2-3 implementation paths? That might help us converge faster."

**Option B - Threshold Calibration**:
"Bauke mentioned wanting to see changes over time. Should I pull historical data from our production agents and establish baseline step counts per task type? That would give us data-driven thresholds."

**Option C - Integration Proposal**:
"Kyra noted that step counter needs context. What if I draft a spec for how step counter would integrate with our existing trust and sentiment evaluators? I could outline the data flows and API surface."

---

## 🎤 Sample First-Day Conversations

### Conversation 1: With Your Manager

**You**: "I saw the discussion about flow and momentum evaluations in the Linear tickets. The step counter evaluation debate seems central to this. Should I dive deeper into how we might extend step counter to support momentum scoring? I have some ideas about task-aware thresholds and trajectory analysis."

**Why This Works**: Shows you reviewed tickets, connected dots, and have concrete ideas ready.

---

### Conversation 2: With bauke.brenninkmeijer

**You**: "I saw your comment about tracking step count changes over time - I think that's the key insight. Changes reveal momentum patterns: converging (agent learning), stable (consistent), or diverging (losing traction). Would you be interested in exploring trajectory analysis as an extension to the basic counter?"

**Why This Works**: Validates his idea, extends it, offers collaboration.

---

### Conversation 3: With Kyra Dresen

**You**: "Your point about step counter needing thresholds really resonated. I've been thinking about how different task types have different optimal step counts - a booking should take 4-6 steps, but research might take 15-20. Should we classify tasks first, then apply task-aware thresholds? That would make the metric more interpretable."

**Why This Works**: Acknowledges her critique, proposes specific solution, shows systems thinking.

---

### Conversation 4: With Team (Standup/Meeting)

**You**: "I read Melissa's article on momentum evaluation, and I think there's a strong connection to our step counter work. Step count is essentially a momentum proxy - it tells us if an agent is making efficient forward progress or getting stuck in loops. What if we position step counter as the foundation of our momentum layer, then augment it with context preservation and progress scoring? I'd be happy to draft a proposal."

**Why This Works**: Shows you understand the broader strategy, connects your work to it, offers to lead.

---

## 📊 Concepts to Connect - Cheat Sheet

| Concept | Explanation | Connection to Step Counter | Your Talking Point |
|---------|-------------|---------------------------|-------------------|
| **Flow State** | Psychological state of effortless concentration and intrinsic motivation (Csíkszentmihályi) | Step count impacts flow - too many steps breaks concentration, causes friction | "We should evaluate step patterns, not just count, to preserve user flow" |
| **Momentum Layer** | One of 3 evaluation layers (Trust, Momentum, Sentiment) - measures forward progress | Step counter is momentum proxy | "Step counter fits naturally in momentum layer as efficiency metric" |
| **Trajectory Analysis** | Measuring change over time, not just snapshots | Kyra's insight about seeing change (10→15 or 10→5) | "Let's add trajectory: converging (good), stable (ok), diverging (bad)" |
| **Task-Based Routing** | Different tasks need different models/approaches | Different tasks have different optimal step counts | "We need task-aware baselines: lookup=2, booking=4, research=12" |
| **Thread-Level Evaluation** | Evaluating full conversation, not individual responses | Step counter currently looks at full thread | "We're already doing thread-level eval, let's add context preservation checks" |
| **Component vs E2E** | Tension between engineering metrics and UX metrics | Step counter bridges both worlds | "Step count is objective (eng) but with context becomes UX signal (momentum)" |
| **LLM-as-a-Judge** | Using AI to evaluate AI based on rubrics | Could generate step count explanations | "Could we use LLM-judge to explain WHY step count is high/low per conversation?" |

---

## 🎯 Your Action Plan: Day 1 Execution

### Morning (First 2-3 Hours)
- [ ] Introduce yourself to team
- [ ] In 1:1 with manager, mention you reviewed tickets and saw step counter discussion
- [ ] Ask: "Should I dive deeper into momentum evaluation as my first project?"
- [ ] Get access to codebase, dev environment, sample data

### Afternoon (Next 3-4 Hours)
- [ ] Pull up the step counter code (it's just 2 lines - easy!)
- [ ] Run it on sample conversations
- [ ] Calculate basic stats: mean, median, variance across task types
- [ ] Identify outliers: Which conversations had unusually high/low step counts?
- [ ] Screenshot interesting examples

### End of Day (Last Hour)
- [ ] Draft quick Slack message or doc:
  - "Explored step counter today. Found interesting patterns: lookups avg 2 steps, bookings avg 5, troubleshooting avg 9. Some outliers worth discussing - would love to sync tomorrow on potential extensions (task-aware thresholds, trajectory analysis)."
- [ ] Shows initiative, execution, and curiosity
- [ ] Sets up deeper conversation for Day 2

### Week 1 Goal
- [ ] By end of week, have prototype of "Step Counter 2.0" with:
  - Task classification
  - Trajectory analysis
  - Momentum score calculation
- [ ] Present in team meeting: "Here's what I learned this week..."
- [ ] Propose next steps based on team feedback

---

## 💪 Why This Positions You Perfectly

### You Demonstrate:

1. **Technical Depth**: You understand the code, algorithms, and can extend them
2. **Strategic Thinking**: You connect step counter to broader momentum framework
3. **Industry Awareness**: You reference Csíkszentmihályi, Melissa's article, current eval challenges
4. **Product Mindset**: You think about user experience, not just metrics
5. **Collaboration**: You validate others' ideas and build on them
6. **Execution**: You don't just propose - you prototype and demo
7. **Communication**: You frame ideas clearly and persuasively

### You Avoid Common Pitfalls:

❌ Coming in hot with "everything is wrong"
✅ Coming in with "great foundation, here's how we extend it"

❌ Dismissing engineering concerns
✅ Bridging engineering (objective metrics) and UX (experience quality)

❌ Proposing vague improvements
✅ Proposing concrete, testable extensions

❌ Working in isolation
✅ Collaborating and building on others' insights

---

## 🎓 Extended Reading (If You Have Time)

### Academic Papers
1. **"Flow: The Psychology of Optimal Experience"** - Mihály Csíkszentmihályi (1990)
   - Foundation for understanding momentum and flow state
   - Key insight: Balance challenge and skill for optimal experience

2. **"ReAct: Synergizing Reasoning and Acting in Language Models"** (2023)
   - Understanding agent step patterns
   - Why agents take multiple steps and when that's appropriate

3. **"Measuring and Narrowing the Compositionality Gap in Language Models"** (2023)
   - How LLMs struggle with multi-step reasoning
   - Why step count can indicate difficulty

### Industry Blog Posts
1. **Melissa Wittmayer's Part One**: Covers trust layer in detail
2. **Melissa Wittmayer's Part Three** (if published): Likely covers infrastructure and tooling
3. **LangSmith Documentation**: Multi-turn conversation evaluation
4. **Anthropic's "Measuring LLM Agent Behavior"**: Best practices for agent evaluation

### Internal Resources (Ask for Access)
1. orq.ai evaluation framework documentation
2. Sample conversations from production agents
3. Historical step count data
4. Task classification schemas

---

## 🔥 Your Elevator Pitch (30 Seconds)

"I've been looking at the step counter discussion, and I think it's the foundation for our momentum evaluation layer. Right now it's just a number, but if we add task-aware thresholds and trajectory analysis - tracking whether agents are converging or diverging - it becomes a powerful signal for flow disruption. I'd love to prototype this and show the team what patterns emerge from our production data."

---

## 🎉 You've Got This - Specific Version

**Your Unique Advantage**:
You're joining exactly when this problem is hot:
- The discussion is active (3 days ago)
- There's no consensus yet (your input matters)
- It connects to strategic priority (Melissa's framework)
- You can be the one who synthesizes and executes

**Day 1 Goal**:
Walk out of first day with manager saying:
"Great initiative on diving into the step counter work. Let's sync tomorrow on your extension ideas."

**Week 1 Goal**:
Present at team meeting:
"Step Counter 2.0: Task-Aware Momentum Evaluation"
(with working prototype and production data analysis)

**You're not just the new person - you're the person who connected the dots, extended the thinking, and shipped a prototype. That's the impression you want.**

---

*Now go crush your first day! 🚀*

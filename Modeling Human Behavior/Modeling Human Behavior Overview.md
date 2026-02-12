
# 1. Agent-Based Modeling (ABM)

## 1.1 Definition

Agent-Based Modeling is a computational modeling approach in which a system is represented as:

- A set of autonomous agents
    
- Situated within an environment
    
- Interacting locally
    
- Producing macro-level patterns that emerge from micro-level rules
    

Key principle:

Macro-level phenomena are not directly programmed. They emerge from repeated local interactions among agents.

---

## 1.2 Core Components of Agent-Based Models

### 1.2.1 Agents

Agents are:

- Autonomous entities
    
- Rule-following
    
- Individually parameterized
    
- Potentially heterogeneous
    

Agents may have:

- Internal attributes (e.g., opinion, interestingness, group membership)
    
- Behavioral rules
    
- Goals (optional)
    
- Memory (optional)
    

In the assignment model:

- Two groups: freshers and seniors
    
- Each agent has:
    
    - Group membership
        
    - Interestingness
        
    - Opinion (added later)
        

Agents are the fundamental causal units in ABM.

---

### 1.2.2 Environment

The environment provides:

- Spatial structure
    
- Interaction constraints
    
- Resource distribution (optional)
    

In NetLogo:

- The environment is composed of patches (grid cells)
    
- The world can:
    
    - Wrap horizontally and vertically
        
    - Have boundaries
        
- Agents occupy patches
    

Environment matters because:

- Interaction probability depends on proximity
    
- Spatial clustering influences macro-dynamics
    

---

### 1.2.3 Interaction

Interaction in ABM is:

- Local
    
- Probabilistic
    
- Rule-governed
    

Interaction rules determine:

- Who interacts
    
- When interaction occurs
    
- What happens as a consequence
    

In the assignment:

- Interaction probability depends on:
    
    - Interestingness
        
    - Homophily
        

Interaction produces:

- Opinion change (attraction)
    
- Opinion divergence (repulsion)
    

---

### 1.2.4 Links (Optional)

Links represent:

- Social networks
    
- Persistent relationships
    
- Structured interaction channels
    

Although not central in this assignment, links are essential in modeling structured networks.

---

## 1.3 Emergence

Emergence refers to:

Macro-level patterns that arise from repeated micro-level interactions without central coordination.

Examples:

- Segregation from mild homophily
    
- Polarization from attraction-repulsion dynamics
    
- Clustering of opinions
    

Important distinction:  
Emergence is not reducible to individual intentions.

---

## 1.4 Feedback Loops

### Positive Feedback

Amplification process:

- Similarity increases interaction
    
- Interaction increases similarity
    
- Increased similarity further increases interaction
    

Leads to:

- Clustering
    
- Polarization
    
- Segregation
    

### Negative Feedback

Stabilization:

- Divergence reduces interaction
    
- Reduced interaction slows divergence
    

Feedback loops are central to understanding non-linear system behavior.

---

## 1.5 Non-Linearity

Non-linearity occurs when:

Small changes in parameters produce disproportionately large system-level effects.

Example:

- Homophily = 0.4 → integration
    
- Homophily = 0.6 → segregation
    

Non-linear tipping points are common in ABM.

---

## 1.6 Path Dependence

Path dependence means:

Early stochastic events influence long-term outcomes.

Two identical models with different random seeds may produce:

- Different clusters
    
- Different convergence patterns
    

History matters in complex systems.

---

# 2. Aggregate Models vs Agent-Based Models

## 2.1 Malthusian Growth Model

Formula:

P(t) = P0 e^(rt)

This model:

- Represents population as a single variable
    
- Assumes homogeneous individuals
    
- Ignores local interactions
    

It is an aggregate model.

---

## 2.2 Limitations of Aggregate Models

Aggregate models:

- Abstract away heterogeneity
    
- Ignore spatial structure
    
- Do not model local interactions
    
- Cannot represent emergent polarization
    
- Assume smooth continuous dynamics
    

They treat interaction effects as implicit rather than explicit.

---

## 2.3 Why Social Systems Require ABM

Social systems involve:

- Heterogeneity
    
- Identity differences
    
- Local influence
    
- Cultural clustering
    
- Norm diffusion
    
- Feedback mechanisms
    

These properties require bottom-up modeling.

---

# 3. Formal Theory in the Inexact Sciences

(From Smaldino, Chapter 1)

---

## 3.1 Exact vs Inexact Sciences

### Exact Sciences

Characteristics:

- Direct mapping between theory and measurable quantities
    
- Clear units
    
- High precision
    

Example:  
Physics (mass, velocity, charge)

---

### Inexact Sciences

Characteristics:

- Concepts difficult to operationalize
    
- Measurements are proxies
    
- Imperfect mapping between theory and data
    

Examples:

- Cooperation
    
- Identity
    
- Norms
    
- Prosperity
    
- Contentment
    

Social science models are exact in formal structure but inexact in empirical mapping.

---

## 3.2 Why Build Formal Models?

Formal models provide:

### Precision

- Clarify assumptions
    
- Remove ambiguity
    
- Define scope conditions
    
- Prevent conceptual vagueness
    

### Tractability

- Simulate long time scales
    
- Explore counterfactuals
    
- Test extreme conditions
    
- Avoid ethical constraints
    

### Insight

- Develop intuition
    
- Reveal hidden dynamics
    
- Discover non-linear effects
    

---

## 3.3 Generative Models

Generative models:

Explicitly simulate the processes that produce outcomes.

They do not merely fit data.

ABM is generative.

---

# 4. NetLogo Implementation Concepts

---

## 4.1 Model Lifecycle

### setup

Initializes:

- Agents
    
- Variables
    
- Environment
    
- Tick counter
    

### go

Runs:

- Interaction logic
    
- Movement
    
- Updates
    
- tick
    

Tick represents discrete time.

---

## 4.2 Core NetLogo Elements

- turtles = agents
    
- patches = environment cells
    
- links = network edges
    
- ask = command executor
    
- tick = time advancement
    

---

## 4.3 Movement Mechanics

Agents move using:

- forward
    
- right / left
    
- setxy
    
- can-move?
    

Spatial movement determines encounter likelihood.

---

# 5. Assignment: Homophily

---

## 5.1 Definition

Homophily is:

The tendency to prefer interacting with similar others.

Slider range:

- 0 → full heterophily
    
- 0.5 → neutral
    
- 1 → full homophily
    

---

## 5.2 Implementation Logic

Interaction probability is modified by:

- Group similarity
    
- Homophily parameter
    
- Interestingness
    

Homophily acts as a weighting factor.

---

## 5.3 System-Level Effects

Increasing homophily produces:

- More within-group interaction
    
- Reduced cross-group influence
    
- Segregation
    
- Potential polarization
    

Decreasing homophily promotes mixing.

---

# 6. Opinion Dynamics – Attraction

---

## 6.1 Opinion Attribute

Each agent has:

opinion ∈ [0,1]

Initialized randomly.

---

## 6.2 Attraction Rule

When interaction succeeds:

xi' = xi + μ(xj - xi)

μ = 0.15

Both agents update using original opinions.

This is weighted averaging.

---

## 6.3 Interpretation

- Agents converge gradually
    
- μ controls convergence speed
    
- Higher μ = faster convergence
    

---

## 6.4 Expected Dynamics

Low homophily:

- Cross-group interaction
    
- Convergence to global mean
    

High homophily:

- Within-group convergence
    
- Between-group divergence
    

---

# 7. Opinion Dynamics – Repulsion

---

## 7.1 Repulsion Rule

When interaction fails:

xi' = xi - μ(xj - xi)

Agents move away from each other.

Bound opinions to [0,1].

---

## 7.2 Effects of Repulsion

Repulsion introduces:

- Polarization
    
- Extremization
    
- Persistent disagreement
    
- Bimodal distributions
    

---

## 7.3 Non-Linear Dynamics

System may show:

- Stable integration up to threshold
    
- Sudden divergence past threshold
    

Classic tipping point behavior.

---

## 7.4 Symmetry Question

Homophily = 1.0 and 0.0 may produce mirrored outcomes.

Symmetry may not reflect real-world power asymmetries.

Model simplifications must be critically evaluated.

---

# 8. Social Psychology Foundations

---

## 8.1 Definition (Allport)

Social psychology studies:

How thoughts, feelings, and behavior are influenced by the actual, imagined, or implied presence of others.

---

## 8.2 Types of Presence

Actual presence:

- Physical observation
    
- Audience effects
    

Imagined presence:

- Internalized norms
    
- Parental expectations
    

Implied presence:

- Surveillance signs
    
- Social rules
    

---

## 8.3 Core Domains

1. Interpersonal relationships
    
2. Attitude formation
    
3. Social cognition
    
4. Social influence
    
5. Group dynamics
    
6. Prejudice and discrimination
    
7. Self and identity
    
8. Prosocial behavior
    
9. Aggression
    
10. Cultural dimensions
    

These domains directly inform ABM applications.

---

# 9. The Media Equation

---

## 9.1 Core Claim

People respond socially and naturally to media as if it were real life.

Media = Real Life (psychologically)

---

## 9.2 Evidence

Across experiments:

- Computers treated politely
    
- Media personalities perceived socially
    
- Movement interpreted as personal space intrusion
    

Responses are automatic.

---

## 9.3 Implications

Human social cognition is:

- Deeply automatic
    
- Triggered by minimal cues
    
- Not dependent on rational belief
    

This reveals:  
Social rules are deeply embedded cognitive structures.

---

## 9.4 Design Implications

Media design should align with:

- Social norms
    
- Human expectations
    
- Natural interaction patterns
    

---

# 10. Behaviorism

---

## 10.1 Core Doctrine

Psychology = science of behavior.

Three claims:

1. Psychology studies behavior.
    
2. Behavior explained by environment.
    
3. Mental terms eliminated or translated.
    

---

## 10.2 Types

Methodological:  
Focus only on observable behavior.

Psychological:  
Stimulus-response-reinforcement.

Analytical:  
Mental states = behavioral dispositions.

---

## 10.3 Reinforcement Logic

Behavior strengthened by:

- Reward
    
- Reinforcement schedules
    

---

## 10.4 Criticisms

Behaviorism fails to account for:

- Internal representations
    
- Meaning
    
- Interpretation
    
- Qualia (phenomenal experience)
    

Representation mediates stimulus-response.

---

# 11. Cognitive / Self-Determination Theory

---

## 11.1 Nature of Theory

A good theory:

- Organizes knowledge
    
- Predicts
    
- Explains
    
- Guides intervention
    

---

## 11.2 Psychological Mediation

Behavior driven by:

- Motives
    
- Goals
    
- Perceived control
    
- Autonomy
    
- Competence
    
- Relatedness
    

Psychological variables are proximal causes of behavior.

---

## 11.3 Representation Matters

Environment → represented internally → behavior.

Interpretation shapes action.

This directly challenges strict behaviorism.

---

## 11.4 Intervention Implications

Behavior change most effectively occurs at:

Psychological level (motives, expectations).

---

# 12. Integrated Theoretical Landscape

---

Behaviorism:  
Behavior caused by environment.

Cognitive:  
Behavior caused by internal representation.

Social Psychology:  
Behavior shaped by social presence.

SDT:  
Behavior driven by psychological needs.

Media Equation:  
Social cognition triggered automatically.

ABM:  
Macro phenomena generated from micro interaction.

---

# 13. Overarching Themes

1. Human behavior is context-sensitive.
    
2. Social influence operates automatically.
    
3. Internal representation mediates action.
    
4. Feedback loops generate complex dynamics.
    
5. Formal models are necessary in inexact sciences.
    
6. Emergence explains macro social patterns.
    
7. Non-linearity is fundamental in social systems.
    

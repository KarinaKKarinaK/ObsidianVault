## What is Agent-Based Modeling (ABM)?

**Agent-Based Modeling (ABM)** is a computational modeling approach used to simulate and analyze complex systems by modeling them as collections of **autonomous interacting agents**.

Instead of describing a system using aggregate equations (like averages or totals), ABM builds the system from the bottom up, focusing on:

- Individual entities (agents)
    
- Their rules of behavior
    
- Their interactions
    
- The environment in which they operate
    

Macro-level patterns then **emerge** from repeated micro-level interactions.

---

## Core Idea

ABM answers the question:

> How do large-scale social patterns arise from individual behavior?

Rather than assuming global trends, ABM simulates:

- What each individual does
    
- Who they interact with
    
- How those interactions change them
    

Over time, population-level outcomes (like segregation, consensus, polarization, diffusion) emerge.

---

## Core Components of ABM

### 1. Agents

Agents are autonomous entities that:

- Have attributes (e.g., opinion, wealth, group identity)
    
- Follow decision rules
    
- May differ from one another (heterogeneity)
    

Examples:

- People
    
- Firms
    
- Animals
    
- Voters
    
- Cells
    

---

### 2. Environment

Agents exist within an environment that:

- May be spatial (grid, map)
    
- May be network-based
    
- Constrains who interacts with whom
    

The environment influences:

- Movement
    
- Encounter probability
    
- Resource access
    

---

### 3. Interaction Rules

Agents interact locally according to defined rules.

Examples:

- Opinion updating after discussion
    
- Imitation of neighbors
    
- Attraction or repulsion
    
- Cooperation or defection
    

Interactions are typically:

- Probabilistic
    
- Repeated
    
- Decentralized
    

---

### 4. Time

ABMs usually run in discrete time steps.

At each step:

- Agents update their state
    
- Interact with others
    
- The system evolves
    

---

## Key Concepts in ABM

### Emergence

Large-scale patterns arise that were not explicitly programmed.

Example:

- Mild preference for similar neighbors leads to strong segregation.
    

---

### Heterogeneity

Agents differ from one another.

This allows:

- Realistic modeling
    
- Non-uniform outcomes
    

---

### Non-Linearity

Small changes in parameters can produce large changes in outcomes.

Example:

- Slight increase in homophily leads to sudden polarization.
    

---

### Feedback Loops

Agent behavior influences the environment, which then influences agents again.

---

## How ABM Differs from Traditional Models

|Traditional (Aggregate) Models|Agent-Based Models|
|---|---|
|Use equations for averages|Simulate individuals|
|Assume homogeneity|Allow heterogeneity|
|Often smooth dynamics|Can produce sudden shifts|
|Interactions implicit|Interactions explicit|

Example:

Aggregate model:  
[  
P(t) = P_0 e^{rt}  
]

ABM:

- Simulate individuals reproducing
    
- Let population size emerge from micro behavior
    

---

## Why Use ABM?

ABM is particularly useful when systems involve:

- Social influence
    
- Identity and group dynamics
    
- Local interactions
    
- Network effects
    
- Polarization
    
- Norm formation
    
- Diffusion processes
    

These systems cannot be fully understood by looking only at averages.

---

## ABM in Social Sciences

ABM is especially powerful in **inexact sciences** like social behavior, where:

- Internal states matter
    
- Local interaction drives change
    
- Emergent macro patterns cannot be directly inferred
    

It allows researchers to:

- Clarify assumptions
    
- Explore counterfactuals
    
- Test mechanism-based explanations
    

---

## Simple Example

Imagine a model where:

- Each agent has an opinion between 0 and 1.
    
- When two agents interact, they move slightly toward each other.
    

Over time:

- Opinions converge.
    

Now add:

- Preference for interacting with similar agents (homophily).
    
- Repulsion when interaction fails.
    

Suddenly:

- Polarization may emerge.
    

That is ABM: simple local rules → complex system behavior.

---

## One-Sentence Definition

Agent-Based Modeling is a bottom-up simulation method that models complex systems as collections of interacting autonomous agents whose local interactions generate emergent macro-level patterns.

---

If you'd like, I can also give:

- A 3-sentence exam definition
    
- A conceptual diagram explanation
    
- A mathematical formulation explanation
    
- Or a critical evaluation of ABM
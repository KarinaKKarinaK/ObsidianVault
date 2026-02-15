# Model Router

From your board:
- AI model router blogpost
- Smart router research
- Task-based routing
- Use cases beyond AI routing

## What Is a Model Router?
A system that:
- Takes a request
- Classifies the task
- Decides:
    - Which model?        
    - Which temperature?
    - Which system prompt?
    - Whether tools are needed?

### Types of Routing

#### 1. Static routing
If task == "code" → use Model X

#### 2. Heuristic routing
Based on:
- Prompt length
- Keywords
- Metadata
- Cost threshold

#### 3. Learned routing (research heavy)

Use a classifier or smaller LLM to choose the best model.

# OpenTelemetry Tracing

From:

> "Trace OpenClaw through Orq"

This is **observability for LLM pipelines.**

OpenTelemetry is:

- An open standard for tracing distributed systems
    

In AI systems, this means:

- Track prompt
    
- Track model chosen
    
- Track tool calls
    
- Track token usage
    
- Track latency
    
- Track errors
    
- Track evaluation score
    

Why this matters:

Without tracing:

- You cannot debug
    
- You cannot evaluate
    
- You cannot improve routing
    

Modern AI infra = **LLM DevOps**

Key concept:

> Every LLM call must be traceable.


# Evaluators (Very Important)

From your board:

- Write blog about tracing and evals
    
- Multi-agent evals
    
- Human/AI feedback
    
- Prompt learning
    

## What Is an Evaluator?

A system that automatically scores model outputs.

Example:

User asks:

> Write SQL query for X

Evaluator checks:

- Does SQL execute?
    
- Does it return correct result?
    

Types:

### 1. LLM-as-judge

Use another model to score output.

### 2. Rule-based evaluator

Regex, exact match, etc.

### 3. Programmatic evaluator

Run code, verify correctness.

### 4. Human feedback

Gold standard.

--- 

Modern trend:

> Continuous evaluation pipelines

Meaning:

- Every deployment
    
- Every routing change
    
- Every prompt tweak  
    → Must be evaluated automatically.

---
The [OWASP Top 10](https://owasp.org/www-project-top-ten/) is ==a regularly updated, standard awareness document from the Open Web Application Security Project (OWASP) highlighting the most critical web application security risks==It provides developers and security professionals with consensus-based, actionable guidance to mitigate risks like broken access control, cryptographic failures, and injection, generally updated every 2-3 years. 

**Key Components of the OWASP Top 10 (2021/2025 Trends):**

- **[Broken Access Control](https://www.google.com/search?q=Broken+Access+Control&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgAEAs):** Users acting outside of their intended permissions.
- **[Cryptographic Failures](https://www.google.com/search?q=Cryptographic+Failures&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgAEA0):** Sensitive data exposure due to lack of encryption.
- **[Injection](https://www.google.com/search?q=Injection&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgAEA8)

- **[Insecure Design](https://www.google.com/search?q=Insecure+Design&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgBEAE):** A focus on risks related to design and architectural flaws.

- **[Security Misconfiguration](https://www.google.com/search?q=Security+Misconfiguration&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgCEAE):** Insecure default configurations, incomplete setups, or verbose error messages.

- **[Vulnerable and Outdated Components](https://www.google.com/search?q=Vulnerable+and+Outdated+Components&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgDEAE):** Using libraries or frameworks with known security gaps.

- **[Identification and Authentication Failures](https://www.google.com/search?q=Identification+and+Authentication+Failures&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgEEAE):** Weaknesses in handling user identity, sessions, and authentication.

- **[Software and Data Integrity Failures](https://www.google.com/search?q=Software+and+Data+Integrity+Failures&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgFEAE):** Code or infrastructure that fails to protect against integrity violations (e.g., insecure deserialization).

- **[Security Logging and Monitoring Failures](https://www.google.com/search?q=Security+Logging+and+Monitoring+Failures&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgGEAE):** Inability to detect or respond to breaches in time.

- **[Server-Side Request Forgery (SSRF)](https://www.google.com/search?q=Server-Side+Request+Forgery+%28SSRF%29&sca_esv=ebc9003c0e8ff0d8&rlz=1C5AJCO_enAE1191NL1193&sxsrf=ANbL-n5tJYwvbAVvtJogKq9OY32jebae2A%3A1771190607873&ei=TzmSaYOANdGhi-gPht_FgQY&biw=1512&bih=861&oq=what+is+owasp&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXdoYXQgaXMgb3dhc3AqAggAMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMgoQABiwAxjWBBhHMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg0QABiABBiwAxhDGIoFMg4QABiwAxjkAhjWBNgBATIOEAAYsAMY5AIY1gTYAQEyDhAAGLADGOQCGNYE2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBMhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBSJAIUABYAHABeAGQAQCYAQCgAQCqAQC4AQHIAQCYAgGgAgKYAwCIBgGQBhG6BgYIARABGAmSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgA&sclient=gws-wiz-serp&ved=2ahUKEwjy97qbt9ySAxWU4wIHHYruJ8sQgK4QegYIAQgHEAE):** Applications fetching remote resources without proper validation. 

**Why the OWASP Top 10 Matters**

- **Industry Standard:** It is a widely accepted, foundational document for web application security, often used by developers and auditors.
- **Risk Mitigation:** It helps organizations identify and prioritize fixing the most critical security vulnerabilities.
- **Continuous Updates:** The list is updated every few years to reflect the latest, most pressing threats, ensuring relevance as technology evolve

#### OWASP Top 10 for LLMs includes:

- Prompt injection
    
- Data leakage
    
- Insecure output handling
    
- Model misuse
    
- Jailbreak attacks
    
- Training data extraction
    

**Red teaming means:**

- Systematically attacking your own system
    
- Using adversarial prompts
    
- Testing for vulnerabilities
    

Dynamic red teaming:

- Generate attacks automatically
    
- Evaluate system robustness
    

This is cutting-edge research area.

---

# Multi-Agent Evals

This is advanced.

You might have:

- Planner agent
    
- Tool agent
    
- Retrieval agent
    
- Summarizer agent
    

Evaluating single output is easy.

Evaluating multi-agent system:

- Did planner choose correct subtask?
    
- Did tool agent fail?
    
- Did conversation converge?
    

This requires:

- Graph-based trace evaluation
    
- Node-level scoring
    

Very advanced infra problem.

---

Understand:

- Prompt templates
    
- System vs user vs tool roles
    
- Token limits
    
- Temperature / top_p
    
- Determinism vs creativity
    
- Streaming
    
- Function calling
    
- Tool use
    
- RAG pipelines
---
## Embeddings
== Embeddings in AI are numerical representations of data—such as text, images, or audio—converted into vectors of floating-point numbers. They map complex, high-dimensional inputs into a lower-dimensional space, where similar items are placed closer together. This allows AI models to understand semantic relationships, context, and meaning. 

Used for:

- Task classification
    
- Semantic routing
    
- Retrieval
    
- Similarity scoring

---
## Evaluation Metrics

- BLEU (legacy)
    
- ROUGE
    
- BERTScore
    
- Exact match
    
- Execution accuracy
    
- Human preference ranking
    
- Pairwise comparison
    

Modern practice:

> Automated + Human hybrid evaluation


---

Ask tomorrow:

- How do we measure router success?
    
- What’s the routing objective function?
    
- Do we optimize cost or accuracy?
    
- Do we log model confidence?
    
- How are eval datasets constructed?
    
- How do we detect regression?
    
- How is red teaming automated?
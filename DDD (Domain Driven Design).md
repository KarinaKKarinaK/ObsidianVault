Domain-Driven Design(DDD) is **a collection of principles and patterns that help developers craft elegant object systems**

- **ubiquitous language (UL)** is one of the pillars of DDD. In a nutshell, the UL describes precisely what objects, behaviors, use cases are in your project so everyone can understand it, from the project owners with no technical knowledge to the newly onboarded developer.

1. applying Domain-Driven Design, **you want to focus on the most critical part of your application first**: the one that is delivering value for your organization

In DDD, **_strategic patterns_ are large-grained patterns used to distill the domain knowledge** & they  act as the global strategy to guide the implementation :

- **Domain:** a domain is what your organization does. 
	- DAL does edtech software, examp prep AI LMS specifically does: an exam-prep learning management system that manages a teacher-curated question bank, generates AI-assisted question variants with human approval, delivers assessments/mocks to students, grades attempts deterministically, and computes mastery/progress analytics to adapt future mock composition.
	- **Core Domain** = the specific part of what your organization does
		- DAL Core Domain = the “ExamPrep Engine”: high-quality assessment generation + attempt lifecycle + deterministic grading + mastery/progress modeling + adaptive mock composition (with AI assistance constrained by guardrails).
	- **Subdomain** =  less important areas of your business we use the term
		- not the main area of expertise of your organization thus making it less critical than your **Core Domain** but still not optional if you want to provide a full-fledged solution.
		- DAL Subdomain = platform/support capabilities around the core engine, eg.==>
			- Content operations (tagging, syllabus taxonomy management, review workflows, audit trails
			- user/tenant management (auth, roles for teacher/student/admin, organization/tenant structure if multi-tenant later)
			- Observability & governance (agent run logging, prompt/version management, cost tracking, rate limiting
			- Integrations & delivery plumbing (queues/workers, notifications, reporting exports)
- **Bounded Context:** The ubiquitous language makes sense in a specific context. An “account” means different things whether you see it in a banking context (a bank account) or in a user management context (a user account).  
    In DDD we call this kind of context a _bounded context_. **A bounded context defines a clear conceptual boundary around a whole application or a part of it**. Outside the _bounded context_, the same word may (and certainly does) means something totally different. _Bounded context_ forms the second pillar of DDD.

**DAL DDD (Exam Prep AI LMS specific) ==** core = assessment & personalization intelligence; subdomains = everything that lets it run safely at scale (users, ops, governance, infra)

![[Pasted image 20260116182212.png]]

## The Definition of Good Project Architecture By DDD Standards

###### Wwe should aim for an architecture :
- independent of Frameworks
- testable
- independent of UI
- independent of Database
- independent of any external agency

![[Pasted image 20260116183209.png]]
> "The inner layer is your business logic, the application layer orchestrates this business logic in response to clients requests and the infrastructure layer contains concrete implementations of the code dealing with the database, web-services, etc."

> There are many architectures following those guidelines: [Onion Architecture](https://blog.thedigitalgroup.com/understanding-onion-architecture), [Ports & Adapters Architecture (or Hexagonal Architecture)](https://herbertograca.com/2017/09/14/ports-adapters-architecture/), or the [Clean Architecture](http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) to name a few.

> "This rule says that _source code dependencies_ can only point _inwards_. Nothing in an inner circle can know anything at all about something in an outer circle. In particular, the name of something declared in an outer circle must not be mentioned by the code in an inner circle. That includes, functions, classes. variables, or any other named software entity."

> We can use the [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) to declare in the inner layers abstractions that will be implemented (and potentially injected at runtime) in the outer layers. **So inner and outer layers depend on abstractions instead of implementation details.**

### Resources:
- https://medium.com/spotlight-on-javascript/domain-driven-design-for-javascript-developers-9fc3f681931a
- https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/february/best-practice-an-introduction-to-domain-driven-design
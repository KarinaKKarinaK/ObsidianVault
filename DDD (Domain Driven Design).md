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
==Find summary of the blocked text below it in key points! ==

> "The inner layer is your business logic, the application layer orchestrates this business logic in response to clients requests and the infrastructure layer contains concrete implementations of the code dealing with the database, web-services, etc."

> There are many architectures following those guidelines: [Onion Architecture](https://blog.thedigitalgroup.com/understanding-onion-architecture), [Ports & Adapters Architecture (or Hexagonal Architecture)](https://herbertograca.com/2017/09/14/ports-adapters-architecture/), or the [Clean Architecture](http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) to name a few.

> "This rule says that _source code dependencies_ can only point _inwards_. Nothing in an inner circle can know anything at all about something in an outer circle. In particular, the name of something declared in an outer circle must not be mentioned by the code in an inner circle. That includes, functions, classes. variables, or any other named software entity."

> We can use the [Dependency Inversion Principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) to declare in the inner layers abstractions that will be implemented (and potentially injected at runtime) in the outer layers. **So inner and outer layers depend on abstractions instead of implementation details.**

#### So all of the above in a few key points:
- **Layered responsibility**
    
    - **Inner layer (Domain)**: pure business logic and rules
        
    - **Application layer**: orchestrates use cases in response to client requests
        
    - **Infrastructure layer**: technical details (DB, APIs, web services, frameworks)
        
- **Architectural styles that follow this model**
    
    - Onion Architecture
        
    - Hexagonal / Ports & Adapters
        
    - Clean Architecture
        
- **Dependency rule**
    
    - Source code dependencies **only point inward**
        
    - Inner layers must not reference outer layers
        
    - Inner layers cannot depend on outer-layer classes, functions, or variables
        
- **How this is enforced**
    
    - Use the **Dependency Inversion Principle**
        
    - Inner layers define **abstractions (interfaces)**
        
    - Outer layers implement those abstractions and inject them at runtime
        
    - Result: layers depend on abstractions, not concrete implementations

### DDD OOP tactical Patterns

- **Entity**
    
    - Mutable object with a stable identity (ID)
        
    - Equality is based on identifier, not attributes
        
    - State changes via business logic
        
    - References other entities by ID, not in-memory objects
        
    - Lives in the **domain layer**
        
- **Value Object**
    
    - Immutable, represents a value (no identity)
        
    - Equality based on property values
        
    - Encapsulates small pieces of business logic
        
    - Lives in the **domain layer**
        
- **Aggregate**
    
    - Cluster of entities and value objects treated as one unit
        
    - Enforces business invariants and consistency rules
        
    - Defines a **transactional boundary**
        
    - Only aggregates are loaded/saved from the database
        
    - Lives in the **domain layer**
        
- **Domain Event**
    
    - Represents something meaningful that happened in the domain
        
    - Used to signal state changes or trigger reactions
        
    - Lives in the **domain layer**
        
- **Repository**
    
    - Abstraction for retrieving and persisting aggregates
        
    - Hides database/technical details from domain logic
        
    - Interface in **domain layer**, implementation in **infrastructure layer**
        
- **Domain Service**
    
    - Holds domain logic that doesn’t belong naturally to an entity or value object
        
    - Named using ubiquitous language
        
    - Should be used sparingly to avoid an anemic domain model
        
    - Interface and logic in **domain layer**, implementation in **infrastructure layer**
        
- **Application Service**
    
    - Orchestrates a specific use case
        
    - Loads aggregates, invokes domain logic, persists changes
        
    - Returns data needed by the client/UI
        
    - Lives in the **application layer**


#### For more clarity some clarification on teh above in context:

- **Entity =** a domain object that represents a concept with a persistent identity and a lifecycle, whose state can change over time while its identity remains the same.
    
- **Value Object =** a domain object that represents a descriptive aspect of the domain, is immutable, has no identity, and is defined solely by the values of its attributes.
    
- **Aggregate =** a cluster of related domain objects that are treated as a single unit for consistency, enforcing business rules and invariants within a transactional boundary.
    
- **Aggregate Root =** the primary entity of an aggregate that controls access to all other objects within the aggregate and is the only object directly persisted or retrieved.
    
- **Domain Event =** a representation of something significant that has occurred in the domain, expressed as an immutable fact that other parts of the system may react to.
    
- **Repository =** an abstraction that provides collection-like access to aggregates, shielding the domain model from persistence and infrastructure concerns.
    
- **Domain Service =** a stateless component that contains domain logic which does not naturally belong to any single entity or value object.
    
- **Application Service =** a layer responsible for coordinating application use cases by invoking domain logic, managing transactions, and handling input/output flow.
    
- **Infrastructure Service =** a technical implementation that fulfills interfaces defined by inner layers, dealing with external systems such as databases, messaging, or APIs.
    
- **Bounded Context =** a defined boundary within which a particular domain model, language, and set of rules are consistent and unambiguous.
    

---
### ### Rich Domain Model vs Anemic Domain Model

- **Rich Domain Model**
    
    - Business logic is encapsulated inside entities and value objects
        
    - Data and behavior are grouped together
        
    - Core principle of object-oriented design
        
- **Anemic Domain Model**
    
    - Entities are only data holders (getters/setters)
        
    - Business logic lives outside entities (e.g. in services)
        
    - Leads to uncontrolled state changes and fragile code
        
    - Considered an **anti-pattern in OOP**
        
- **Why anemic models are problematic in OOP**
    
    - Logic scattered across services
        
    - Hard to reason about state changes
        
    - Breaks encapsulation and invariants
        
- **Functional Programming perspective**
    
    - Anemic models are intentional and desirable
        
    - Data and behavior are separated by design
        
    - Immutability and pure functions prevent state issues
        
    - Modules and functions replace classes as core abstractions
        
- **Key takeaway**
    
    - Rich domain models fit **OOP**
        
    - Anemic models fit **functional programming**
        
    - The “right” model depends on the paradigm you’re using


--> Since functions are first-class citizens in javascript, we’re going to apply a more functional approach to DDD than an object-oriented one. We’re going to favor :

- modules and factory functions as an encapsulation mechanism over classes
- immutability and pure functions over mutable classes
- higher-order functions for dependency inversion and dependency injection over interfaces (well…because there is no interface in javascript)

This logic is implemented in the different aggregates/entities/value objects/domain services.

**Example below:**
![[Screenshot 2026-01-16 at 6.47.00 PM.png]]
 ![[Screenshot 2026-01-16 at 6.47.21 PM.png]]
 
 ![[Screenshot 2026-01-16 at 6.47.47 PM.png]]
 ![[Screenshot 2026-01-16 at 6.48.00 PM.png]]
 ![[Screenshot 2026-01-16 at 6.48.24 PM.png]]
 ![[Screenshot 2026-01-16 at 6.48.42 PM.png]]
![[Screenshot 2026-01-16 at 6.48.53 PM.png]]
 ![[Screenshot 2026-01-16 at 6.49.15 PM.png]]
 ```js
 
 ```
 
 
 ## Resources:
- https://medium.com/spotlight-on-javascript/domain-driven-design-for-javascript-developers-9fc3f681931a
- https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/february/best-practice-an-introduction-to-domain-driven-design
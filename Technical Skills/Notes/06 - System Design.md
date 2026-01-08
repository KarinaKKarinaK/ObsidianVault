**System Design**  = the process of defining how individual software components come together to meet certain requirements.

| **System design is not about the “best” solution; it’s about the _right trade-offs_.**

- This includes both **functional** (what the system should do) and **non-functional** (how well the system should perform).
	- ### Functional Requirements
		→ _What the system does_
		- User login
		- Post creation
		- Search functionalit
	- ### Non-Functional Requirements
		→ _How well the system works_
		- Scalability
		- Latency
		- Availability
		- Security
		- Cost
- Involves **decisions** about ***architecture, data flow, scalability, fault tolerance, and trade-offs between competing goals like cost, speed, and complexity.***

Two categories of system design:
- **[High-level System Design](https://www.systemdesignhandbook.com/answers/what-is-high-level-system-design/)** — focusing on the overall architecture, communication between services, and major technology choices (e.g., microservices vs. monoliths).
- **[Low-level or detailed design](https://www.systemdesignhandbook.com/answers/what-is-low-level-system-design/)** — zooming into how individual modules, APIs, or data models work internally.

|Level|Focus|
|---|---|
|High-Level Design (HLD)|Architecture, components|
|Low-Level Design (LLD)|Classes, APIs, schemas|

***When working on system design one must balance the guiding qualities:***

- **Scalability**: Can it handle more users or data as it grows?
	- (Same as for databases) 
	- **Vertical scaling (scale-up)**: Adding more resources to a single machine (more CPU, RAM). It’s simpler but limited by hardware constraints.
	- **Horizontal scaling (scale-out)**: Adding more machines or instances. It’s harder to manage but offers near-infinite growth potential.

|Type|Description|
|---|---|
|Vertical|Bigger machine|
|Horizontal|More machines|

- **Reliability**: Will it keep working even when parts fail?
	- **Reliability** is how consistently a system performs its intended function.
	- **[Availability](https://en.wikipedia.org/wiki/Availability)** measures how often the system is operational (uptime percentage).
		- Techniques like **redundancy**, **replication**, and **automatic failover** ensure that even if one component goes down, users don’t notice.
		- **Failover** = Automatic switching to backup systems; critical for **uptime**
	- **Single Point of Failure (SPOF)**
		- Any component whose failure breaks the system == NO
		- Eliminate with redundancy == YES
- **Performance**: Does it meet latency and throughput goals?
- **Maintainability**: Is it easy to extend, debug, and evolve?
- **Cost-efficiency**: Are resources being used wisely?

## E.g. Client–Server Architecture

- **Client** → requests data
    
- **Server** → processes logic
    
- **Database** → stores data

**Example:**  
Browser --> API --> DB
### Consistency and partition tolerance

Add notes here.
## CAP Theorem 

The **[CAP theorem](https://www.systemdesignhandbook.com/blog/cap-theorem-for-system-design-interviews/)** states that in a [distributed file system](https://www.systemdesignhandbook.com/blog/exploring-distributed-file-systems/), you can only guarantee two of the following three at once:
1. **Consistency** = all users see the same data at the same time.
2. **Availability** =  the system responds even if some nodes fail.
3. **Partition tolerance** = the system continues working despite network partitions.

Trade-offs are unavoidable.
### Latency vs throughput

- **[Latency](https://www.systemdesignhandbook.com/blog/difference-between-latency-and-throughput-in-system-design/)** is the delay in processing a single request.
- **Throughput** is the number of requests a system can handle per second.

Designing for low latency often increases cost or complexity, while designing for high throughput may sacrifice response speed. The best engineers learn how to balance these in context.

### For scalability -->  Load balancing, caching, and sharding
- **[Load balancing](https://www.f5.com/glossary/load-balancer)** distributes traffic evenly across servers to prevent overload.
	**Algorithms:**
	- Round-robin
	- Least connections
	- Hash-based
- **[Caching](https://www.systemdesignhandbook.com/guides/design-a-distributed-cache-system/)** stores frequently accessed data in memory (Redis, CDN) to speed up responses.
- **Sharding** splits large datasets into smaller chunks (by user ID or region) for parallel access.
	- Splits data across servers
	- Enables massive scale
	- Adds complexity
##### Stateless vs Stateful Services

- **Stateless** → no memory between requests (easy to scale)
    
- **Stateful** → stores session data (harder to scale)

### Microservices, events, and messaging

Modern systems thrive on **asynchronous communication** and **service isolation**.

- **Microservices** break down monoliths into smaller, independently deployable services.
- **Event-driven architectures** use message queues (Kafka, RabbitMQ) to decouple producers and consumers, enabling resilience and scalability.

## Event-Driven Architecture

- Components react to events
- Loosely coupled
- Highly scalable
# Framework for approaching system design:

1. **Understand teh requirements**
	- Start by clarifying **functional requirements** (what the system must do) and **non-functional requirements** (how it must perform). For example:
		- ***Functional:*** “The system should let users upload and share photos.”
		- ***Non-functional:*** “It should support 10 million users, maintain 99.99% uptime, and respond within 200 ms.”
2. **Define the system boundaries** => Identify your **core components** and what’s out of scope.
3. **Deisgn the high-level architecture**
	 . Lay out the key building blocks:
		- **Clients** (web, mobile, API consumers)
		- **Load balancer** for distributing requests
		- **Application servers** or microservices
		- **Database/storage layers**
		- **Cache**, **message queues**, and **search systems** if applicable
4. **Data modeling & storage choices** => Decide how data will be stored, indexed, and retrieved.
5. **Plan for scalability & reliability**
	- Introduce caching (Redis, Memcached), database sharding, replication, or partitioning. Use **load balancers** and **content delivery networks (CDNs)** to reduce latency. Think through **failure scenarios** and **graceful degradation**—what happens if a node or data center goes down?
6. **Address trade-offs** (e.g. consistency vs availability, simplicity vs scalability, latency vs cost)
7. **Security, observabilitry, and maintainability**
	- Include **authentication, authorization, encryption, and secure data storage**. Add **monitoring and alerting pipelines**. Emphasize maintainability; **versioning APIs, automating deployments, and ensuring documentation.**

### Further resources:
- https://www.systemdesignhandbook.com/guides/system-design/
- https://roadmap.sh/system-design - FAVORITE, mind-map style
- https://github.com/donnemartin/system-design-primer 
- Nice "how to learn system design" overview: https://medium.com/@himanshusingour7/how-i-learned-system-design-d7444d454367
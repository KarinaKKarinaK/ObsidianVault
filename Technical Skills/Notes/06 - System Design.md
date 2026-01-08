System Design  = the process of defining how individual software components come together to meet certain requirements.
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

***When working on system design one must balance the guiding qualities:***

- **Scalability**: Can it handle more users or data as it grows?
	- (Same as for databases) 
	- **Vertical scaling (scale-up)**: Adding more resources to a single machine (more CPU, RAM). It’s simpler but limited by hardware constraints.
	- **Horizontal scaling (scale-out)**: Adding more machines or instances. It’s harder to manage but offers near-infinite growth potential.
- **Reliability**: Will it keep working even when parts fail?
	- **Reliability** is how consistently a system performs its intended function.
	- **[Availability](https://en.wikipedia.org/wiki/Availability)** measures how often the system is operational (uptime percentage).
		- Techniques like **redundancy**, **replication**, and **automatic failover** ensure that even if one component goes down, users don’t notice.
- **Performance**: Does it meet latency and throughput goals?
- **Maintainability**: Is it easy to extend, debug, and evolve?
- **Cost-efficiency**: Are resources being used wisely?

### Consistency and partition tolerance

The **[CAP theorem](https://www.systemdesignhandbook.com/blog/cap-theorem-for-system-design-interviews/)** states that in a [distributed file system](https://www.systemdesignhandbook.com/blog/exploring-distributed-file-systems/), you can only guarantee two of the following three at once:

1. **Consistency** = all users see the same data at the same time.
2. **Availability** =  the system responds even if some nodes fail.
3. **Partition tolerance** = the system continues working despite network partitions.

### Latency vs throughput

- **[Latency](https://www.systemdesignhandbook.com/blog/difference-between-latency-and-throughput-in-system-design/)** is the delay in processing a single request.
- **Throughput** is the number of requests a system can handle per second.

Designing for low latency often increases cost or complexity, while designing for high throughput may sacrifice response speed. The best engineers learn how to balance these in context.


### For scalability -->  Load balancing, caching, and sharding
- **[Load balancing](https://www.f5.com/glossary/load-balancer)** distributes traffic evenly across servers to prevent overload.
- **[Caching](https://www.systemdesignhandbook.com/guides/design-a-distributed-cache-system/)** stores frequently accessed data in memory (Redis, CDN) to speed up responses.
- **Sharding** splits large datasets into smaller chunks (by user ID or region) for parallel access.

### Microservices, events, and messaging

Modern systems thrive on **asynchronous communication** and **service isolation**.

- **Microservices** break down monoliths into smaller, independently deployable services.
- **Event-driven architectures** use message queues (Kafka, RabbitMQ) to decouple producers and consumers, enabling resilience and scalability.
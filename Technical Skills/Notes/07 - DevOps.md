**DevOps** = set of "practices" that combines software development (Dev) and IT operations (Ops) to autiomate & speed up software delivery.

- DevOps is just a natural extension of **Agile**.
- "Instead of delivering big, infrequent releases (once every 3 to 9 months) like traditional development teams at major enterprises, DevOps takes a “continuous delivery” approach. This means releasing small, incremental improvements regularly — often even several times per day."

**Companies using DevOps** (according to [this post](https://blog.devops.dev/devops-in-a-nutshell-c85070a87c3e)): 

- 30x more frequent deployments
- 60% higher change success rates
- 60x fewer failures
- 160x faster recoveries

## Basic DevOps Principles

- Automation over manual work
    
- Infrastructure as Code
    
- Continuous feedback
    
- Small, frequent releases
    
- Blameless postmortems

so DevOps is basically a combination o **culture + process + tools** (not just tools alone).

### Some definitions:
Adapted from: [A Medium Post](https://medium.com/@bhanuchaddha/demystifying-devops-key-concepts-in-a-nutshell-f7f2856db129)

- **Continuous Integration (CI)**  
    → Automatically combining code changes often to catch problems early.
    
- **Continuous Deployment (CD)**  
    → Automatically releasing new code to production quickly and safely.
    
- **Infrastructure as Code (IaC)**  
    → Setting up servers and infrastructure using code instead of manual work.
    
- **Configuration Management**  
    → Making sure all environments are set up the same way.
    
- **Containerization and Orchestration**  
    → Packaging apps so they run the same everywhere and managing many copies easily.
    
- **Version Control**  
    → Tracking code changes and working together using tools like Git.
    
- **Automated Build Processes**  
    → Automatically turning code into a ready-to-run application.
    
- **Release Management**  
    → Organizing when and how new versions of software are released.
    
- **Monitoring Infrastructure and Applications**  
    → Watching systems to detect problems early.
    
- **Testing for Quality**  
    → Checking code automatically to make sure it works correctly.
    
- **DevOps Culture**  
    → Teams working together and sharing responsibility for software.
    
- **Incident Management**  
    → Quickly fixing problems when systems fail.
    
- **Scalability and High Availability**  
    → Making systems handle more users and stay online.
    
- **Embracing Cloud Computing**  
    → Using cloud services instead of managing physical servers.
    
- **Serverless Architecture**  
    → Writing code without worrying about servers.
    
- **Ensuring Security in DevOps**  
    → Building security into every step of development.
    
- **Compliance and Governance**  
    → Automatically following rules and regulations.
    
- **GitOps**  
    → Using Git to manage and deploy infrastructure and apps.
    
- **Observability**  
    → Understanding what’s happening inside a system using data.
    
- **Continuous Documentation**  
    → Keeping documentation updated as the system changes.

## Some Helpful Visuals Of Basic Concepts
![[Pasted image 20260108174957.png]]
![[Pasted image 20260108174754.png]]

### DevOps Toolkit

**Version Control:**
- **GitHub (& GitLab)**
- also Bitbucket

**Container Management**
- **Docker**: Docker is a light-weight tool that aims to simplify and accelerate various workflows in your SDLC with an integrated approach. A docker container image is a standalone, executable package that includes everything you need to run an application.
- **Kubernetes**: Kubernetes is an open-source DevOps tool used to automate deployment and management of containerized applications & perhaps one of the most popular container orchestration tools.
- also Mesos

| Aspect                   | Docker                               | Kubernetes                               |
| ------------------------ | ------------------------------------ | ---------------------------------------- |
| **What it is**           | Tool to package and run applications | Tool to manage many containers           |
| **Main purpose**         | Create and run containers            | Orchestrate (control) containers         |
| **Focus**                | Single application or container      | Large-scale container systems            |
| **Scaling**              | Manual or limited                    | Automatic scaling                        |
| **Container management** | Runs containers                      | Deploys, scales, heals containers        |
| **Fault handling**       | If container fails, it stops         | Automatically restarts failed containers |
| **Typical use**          | Development, testing, small apps     | Production, large systems                |
| **Relationship**         | Creates containers                   | Uses Docker containers                   |

**Application Performance Monitoring**
- **Prometheus** = open-source and community driven performance monitoring solution; supports container monitoring and creates alerts based on time series data.
- Also Dynatrance and AppDynamics

**Deployment & Server Monitoring**
- Datadog
- Splunk
- Sensu

...and a lot more, you'll find out as you need them.

---

***Its also useful to cover & understand the following:***
## Networking Basics

- TCP/IP
    
- DNS
    
- HTTP/HTTPS
    
- Ports & firewalls
    
- Load balancing

**Canary releases** = "A canary release _provides a similar form of early warning for potential problems_ before impacting your entire production infrastructure or user base."

**Blue-green deployment** = a strategy for releasing software with zero downtime by running two identical production environments, "Blue" (current version) and "Green" (new version), and gradually shifting live user traffic from Blue to Green after the new version is tested and stable, allowing for instant rollbacks if issues arise.

**Rollbacks** = the process of quickly reverting an application or system to a previous, stable version after a new deployment causes errors, performance issues, or unexpected failures.

## Cloud Fundamentals

- Compute
    
- Storage
    
- Networking
    
- IAM

**Providers:**
- Amazon Web Services
- Google Cloud Platform
- Microsoft Azure

### Monitoring

- Metrics
    
- Alerts
    
- SLIs & SLOs

### Logging

- Structured logs
    
- Log aggregation
    
- Correlation IDs

## Reliability Engineering (SRE)

- Error budgets
    
- Chaos engineering
    
- Incident response
    
- Postmortems

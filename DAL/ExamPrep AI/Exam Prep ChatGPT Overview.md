What it is = **high-quality Question Bank + test/attempt engine + analytics + progressive mocks**.

**Users + roles: Admin / Teacher / Student**
#### **hybrid AI architecture**:

- **Teacher side = non-agentic, LLM-assisted**: AI can _suggest/generate_, but _never publishes_ directly. Teacher approval is the gate. ("human-in-the-loop")
    
- **Student side = agentic orchestration with deterministic core**: orchestration can use LLM for planning/narrative, but **selection constraints, grading, scoring, analytics are code (deterministic)** with retries + fallbacks.

Selling point: “LLM for assistance, not authority.”

## Tech Stack:

- Backend: Node.js + TypeScript (NestJS or Fastify). Pick one; NestJS is fine for modular architecture.
    
- DB: Postgres
    
- Vector search: pgvector extension (same Postgres)
    
- ORM: Prisma (fast, typed) or TypeORM (Nest default). Prisma preferred.
    
- Queue: BullMQ + Redis
    
- Auth: JWT + refresh tokens; bcrypt
    
- File storage: S3-compatible (MinIO for dev)
    
- Observability: structured logs (pino), request tracing (OpenTelemetry), error tracking (Sentry optional)

Structure --> modular monolith

#### High level architecture:

- Single repo, modular boundaries:

- apps/api (HTTP API)
    
- apps/worker (BullMQ workers for agent jobs)
    
- packages/shared (types, zod schemas, utils)
    
- packages/agent-runtime (orchestrator, agent specs, tool registry, guardrails)
    
- packages/evals (offline eval runner + datasets + metrics)

### Core domain modules

1. Identity & Access (users, roles)
    
2. Academics (batches, enrollments, syllabus)
    
3. Question Bank
    
4. Test Engine
    
5. Attempts & Grading
    
6. Analytics
    
7. Agent Runtime
    
8. Admin/Teacher UI (frontend can be separate repo, but API must be stable)


### So Basically The Tech Stack..(In more Detail)

##### Frontends (actors)

- **Student UI**: assessment form submission, start test, autosave answers, submit attempt, view results/progress, request next mock.
    
- **Teacher Admin UI**: question bank CRUD, request variants for a base question, review generated variants, set statuses (Draft/In Review/Approved/Retired).
##### API layer

- **API Server (Node.js + TypeScript)**: validates requests, auth/RBAC, fetches data from Postgres, enqueues background jobs, exposes endpoints for polling/fetching results and updating statuses.
    
    - Framework choice is left open: **NestJS vs Fastify**.
        
    - Suggested modular monolith structure with DDD-style module boundaries.
        

##### Data layer

- **Postgres** is the system of record:
    
    - Questions (typed JSON payloads), versions, tags/syllabus mapping, tests, attempts, attempt answers
        
    - Analytics snapshots (mastery, ranks/percentiles)
        
    - AI traceability: `agent_runs`, `human_feedback`, `prompt_versions`
        
- **pgvector (optional but recommended)** for similarity search / de-duplication via embeddings stored in Postgres (keeps infra simpler than running a separate vector DB).
    

##### Async / background processing

- **Redis + BullMQ** for queues:
    
    - `ai-variants` (teacher variant generation)
        
    - `agent-tasks` (student orchestration tasks)
        
    - `analytics-recompute`
        
    - `embeddings`
        
- **Worker services**:
    
    - Variant processor worker (teacher flow)
        
    - Agent runtime worker (student flow)
        
    - Analytics recompute worker
        
    - Embeddings worker
        

##### OpenAI usage

- **LLM**: strict-JSON outputs for (a) teacher variants, (b) student narrative summaries, and optionally (c) constrained “propose question IDs only” selection assistance.
    
- **Embeddings**: similarity search + optional duplicate checks.
    

##### Validation / guardrails

- **Zod schema validation** for every LLM output (per question type / per task schema).
    
- **Constraint validator** on student-side selection (blueprint adherence, anti-repeat, approved-only, etc.).
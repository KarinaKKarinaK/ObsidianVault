Minimum schema that supports v1 fully + agent logs + eval feedback:

### Core tables

users

- id (uuid), name, phone/email, password_hash, role (ADMIN|TEACHER|STUDENT), is_active, created_at
    

batches

- id, name, exam_type (JEE|NEET), start_date, end_date, created_at
    

enrollments

- id, batch_id, student_id, status
    

syllabus_nodes

- id, exam_type, subject, topic, subtopic, parent_id (nullable), depth, display_order
    

### Question Bank

questions

- id
    
- status: DRAFT | IN_REVIEW | APPROVED | RETIRED
    
- exam_type (JEE|NEET)
    
- subject/topic/subtopic (foreign keys to syllabus_nodes or denormalized strings initially)
    
- difficulty_band (1–5)
    
- year_asked (nullable)
    
- question_type (SCQ|MCQ_MULTI|NAT|...)
    
- payload_json (jsonb)
    
- answer_key_json (jsonb)
    
- solution_json (jsonb nullable)
    
- attachments_json (jsonb nullable)
    
- created_by (user_id)
    
- approved_by (user_id nullable)
    
- created_at, updated_at
    
- current_version_id
    

question_versions

- id, question_id, payload_json, answer_key_json, solution_json, editor_id, edit_reason, created_at
    

question_tags (optional if you want flexible tags beyond syllabus)

- id, name, category  
    question_tag_map
    
- question_id, tag_id
    

question_embeddings

- question_id
    
- embedding (vector)
    
- embedding_model
    
- created_at
    

### Tests & attempts

tests

- id, batch_id
    
- test_type: MOCK0 | MOCK | PRACTICE | SECTIONAL
    
- title
    
- config_json (time, marking rules, sections)
    
- blueprint_json (topic weightage, difficulty mix, constraints)
    
- created_by, created_at
    
- status: DRAFT | PUBLISHED | ARCHIVED
    

test_sections

- id, test_id, name, time_limit_sec, order_index, config_json
    

test_questions

- id, test_id, section_id (nullable)
    
- question_id
    
- order_index
    
- marks_json (override optional)
    

attempts

- id, test_id, student_id
    
- started_at, submitted_at
    
- status: IN_PROGRESS | SUBMITTED | EVALUATED
    
- total_score, percentile, rank (computed later)
    
- meta_json (device, network etc.)
    

attempt_answers

- id, attempt_id, question_id
    
- answer_json (selected options / numeric answer etc.)
    
- is_correct, marks_awarded
    
- time_spent_sec
    

### Analytics

topic_mastery_snapshots

- id, student_id, batch_id
    
- node_id (syllabus topic/subtopic)
    
- mastery_score (0–1)
    
- accuracy, avg_time_sec, attempts_count
    
- updated_at
    

rank_snapshots

- id, test_id, batch_id
    
- student_id, score, rank, percentile
    

### Agent runtime + learning loop

agent_runs

- id
    
- task_type (INGEST|TAG|CRITIC|MOCK_COMPOSE|INSIGHT|PATHWAY)
    
- status (SUCCESS|FAIL|REVIEW)
    
- input_json, output_json
    
- model_id, prompt_version
    
- tool_calls_json
    
- validation_errors_json
    
- latency_ms, cost_estimate
    
- created_by (system)
    
- created_at
    

human_feedback

- id
    
- entity_type (QUESTION|TAGGING|INSIGHT|PATHWAY)
    
- entity_id
    
- agent_run_id
    
- decision (APPROVED|EDITED|REJECTED)
    
- diff_json (agent output vs final)
    
- notes (rejection reasons)
    
- created_by (teacher/admin)
    
- created_at

### Duplicate companion skills could block in build-evaluator


In `skills/build-evaluator/SKILL.md` lines 1–20 -> Claude sees two conflicting companion skill lists. Depending on which block it prioritizes, it may omit `generate-synthetic-dataset`, `optimize-prompt`, or `build-agent` from post-skill recommendations.

See:

```

Line 9: **Companion skills:** ← first block: 5 companions

Line 14: - build-agent

Line 16: [description text]

Line 18: **Companion skills:** ← second block: 2 companions, re-lists run-experiment

Line 20: - run-experiment ← duplicate

```

**Fix:** Remove the second block (lines 17–20). Merge `prompt-learning` from the second block into the first.

---

  
### Prompt-learning execution path references deleted skill `feedback-loop`

  
When running `grep "feedback-loop|trace-analysis" skills/prompt-learning/SKILL.md`
Lines 14 and 18 are already known finding #8. But line 195 is inside the actual Steps section. When a user has fewer than 10 failure traces, the skill hits this branch and tells them to use `feedback-loop`, which doesn't exist. The user has no alternative path.

**Evidence:**

```

Line 14: - `feedback-loop` — set up feedback collection ← companion list (cosmetic)

Line 18: - `trace-analysis` — deep-dive into traces ← companion list (cosmetic)

Line 195: suggest using `feedback-loop` to set up collection first ← EXECUTION PATH

```

**Fix:** Line 195: replace with `"use analyze-trace-failures to collect and tag traces, or add more production feedback via orq.ai Annotation Queues."`

  

---
### generate-synthetic-dataset contradicts its own dataset structure documentation

In `skills/generate-synthetic-dataset/SKILL.md` lines 53–55 vs line 260:

```

Lines 53–55 (orq.ai Dataset Structure section — correct):

"Datasets contain three optional components: Inputs (prompt variables),

Messages (system/user/assistant), and Expected Outputs"

  

Line 260 (Phase 5 step 9 — the actual instruction — wrong):

"Structure: input (user message), reference (expected behavior)"

```

  So the step instruction directly contradicts the overview. This is the root cause of original finding #5 (wrong dataset message mapping). The skill creates datasets with `input`/`reference` fields instead of `messages` with `user`/`assistant` roles, making datasets unusable for conversation evaluation.

**Fix:** Update line 260 to: `Structure: messages array with {role: "user", content: "..."} for input and {role: "assistant", content: "..."} for expected output.`


---

### Linear MCP declared in 3 skills that never use it

  
To see the issue: `grep "mcp__linear" skills/*/SKILL.md` + see `skills/run-experiment/SKILL.md` lines 468–471

```

Line 468: "Ask the user where they want tickets created. Detect available project management tools by checking for connected MCP servers (Linear, Jira, GitHub, etc.) or ask the user directly. Options: Connected PM tool / Markdown file / Skip"

```

run-experiment explicitly handles the no-Linear case. Not a bug for this skill.

  

**Evidence — the other 3 (are a bug):**

```

skills/build-evaluator/SKILL.md line 4: allowed-tools: ... mcp__linear-server__*

skills/analyze-trace-failures/SKILL.md line 4: allowed-tools: ... mcp__linear-server__*

skills/prompt-learning/SKILL.md line 4: allowed-tools: ... mcp__linear-server__*

```

None of these three skills mention Linear anywhere in their Steps sections. They declare permission to use it but never use it. Which can be misleading since users may expect ticket creation from these skills. Also unnecessarily expands the tool surface.

**Fix:** Remove `mcp__linear-server__*` from the `allowed-tools` frontmatter of build-evaluator, analyze-trace-failures, and prompt-learning.

  
---

### optimize-prompt has no path for inline prompts

See `skills/optimize-prompt/SKILL.md` Phase 1.

**Evidence:**

```

Phase 1 Step 1:

"Use search_entities with type: "prompts" to find the target prompt
Use HTTP API to get full prompt details including current version text"

```

No documented fallback if the user pastes a prompt inline that doesn't exist in orq.ai.


**Impact:** User says "optimize this prompt: [pastes text]". Skill calls `search_entities`, finds nothing, stalls. There is no instruction to proceed with the pasted text. Confirmed by the `when to use` triggers which include "User has a prompt that needs general improvement" — but Phase 1 always assumes the prompt exists in orq.ai.
  

**Fix:** Add to Phase 1 Step 1: *"If the user provided prompt text inline (not referencing an orq.ai prompt), skip the search and proceed directly to Phase 2 using the provided text. Skip Phase 4 (Apply) unless the user asks to save it."*

---

### Step numbering bug in two command files

See:  `grep "### 3\.|### 4\." commands/workspace.md`

```

commands/workspace.md: ### 2. Fetch data

### 4. Display the overview ← step 3 missing

### 4. Error handling ← duplicate step 4

  

commands/models.md: ### 2. Fetch data

### 4. Display models ← step 3 missing

### 4. Error handling ← duplicate step 4

```

**Impact:** Minor but sloppy. Any tooling that parses step numbers will break.
**Fix:** Renumber: step 3 = Display, step 4 = Error handling.

---

### Evaluator `key` field is null on direct GET fetch

**How found:** After creating the professional-tone evaluator via the build-evaluator skill, ran `GET /v2/evaluators/<ID>`.

**Evidence:** `key: null` on direct fetch, but `key: "professional-tone"` was confirmed at creation time and appeared in the list endpoint response.

**Impact:** Skills that retrieve an evaluator by ID to confirm creation will see `null` and either display nothing or fail name-based lookups in follow-up sessions.

---

### Evaluator list endpoint is paginated but skills don't document it

**How found:** `GET /v2/evaluators` returned `has_more: true` with the newly created evaluator missing from the first page.

**Evidence:** API returns `{data: [...], has_more: bool}`. Skills document the endpoint but never mention the paginated response shape or how to fetch beyond the first page.

**Impact:** Users following the HTTP API examples in skill files will silently miss evaluators beyond the first page. No `?limit=` parameter or cursor pagination is documented in any skill.

---
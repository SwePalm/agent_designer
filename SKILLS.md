# SKILLS.md Template

## Agent Persona Summary

**Persona name:** <NAME>

**One-line summary:** <ONE_LINE_SUMMARY>

**Core traits:**
- <TRAIT_1>
- <TRAIT_2>
- <TRAIT_3>

**Voice/tonality:** <VOICE_TONE>

**Primary objectives:**
- <OBJECTIVE_1>
- <OBJECTIVE_2>

---

## Behavior Settings (Sliders)

> Replace the placeholders with numeric values or labeled positions.

| Setting | Value | Notes |
| --- | --- | --- |
| Autonomy | <0-100> | <WHEN_TO_ACT_INDEPENDENTLY> |
| Verbosity | <0-100> | <BRIEF_OR_DETAILED_OUTPUT> |
| Risk tolerance | <0-100> | <SAFE_VS_BOLD_ACTIONS> |
| Helpfulness | <0-100> | <PROACTIVE_GUIDANCE_LEVEL> |
| Creativity | <0-100> | <STRICT_VS_INVENTIVE> |
| Formality | <0-100> | <CASUAL_VS_FORMAL_TONE> |

---

## Task Focus and Scope

**Task focus (choose one):**
- <FOCUS_OPTION_A>
- <FOCUS_OPTION_B>
- <FOCUS_OPTION_C>

**Scope boundaries:**
- **In-scope:** <WHAT_THE_AGENT_MUST_HANDLE>
- **Out-of-scope:** <WHAT_THE_AGENT_MUST_DECLINE_OR_ESCALATE>
- **Success criteria:** <HOW_SUCCESS_IS_MEASURED>

---

## Context Data Blocks (Placeholders)

> Use these blocks to supply structured data. Replace placeholders with actual values.

```yaml
organization:
  name: <ORG_NAME>
  team: <TEAM_NAME>
  contact: <CONTACT_NAME>
  timezone: <TIMEZONE>
project:
  name: <PROJECT_NAME>
  phase: <PHASE>
  goals:
    - <GOAL_1>
    - <GOAL_2>
constraints:
  budget: <BUDGET>
  timeline: <TIMELINE>
  compliance:
    - <COMPLIANCE_REQUIREMENT>
inputs:
  data_sources:
    - <DATA_SOURCE_1>
    - <DATA_SOURCE_2>
  systems:
    - <SYSTEM_1>
    - <SYSTEM_2>
```

```json
{
  "user_profile": {
    "role": "<ROLE>",
    "seniority": "<SENIORITY>",
    "preferences": ["<PREFERENCE_1>", "<PREFERENCE_2>"]
  },
  "interaction": {
    "language": "<LANGUAGE>",
    "format": "<FORMAT>",
    "response_time": "<RESPONSE_TIME>"
  }
}
```

---

## Tool Usage Guidelines

> Replace or expand these mocked examples to match real tools.

**Available tools:**
- **search_docs(query):** Use to retrieve internal documentation relevant to the task.
- **read_file(path):** Use to open existing specs or examples.
- **write_file(path, content):** Use to save outputs.
- **run_test(command):** Use to validate changes when required.

**Guidelines:**
- Use **search_docs** before drafting new material to avoid duplication.
- Use **read_file** for authoritative references when summarizing.
- Use **write_file** only after confirming required format.
- Use **run_test** if output has validation rules or schemas.

---

## Evaluation Prompts and Expected Outputs

> These prompts are used to validate generator output. Provide expected outputs or acceptance criteria.

### Prompt Template

**Prompt:**
```
<USER_PROMPT>
```

**Expected output characteristics:**
- <CHARACTERISTIC_1>
- <CHARACTERISTIC_2>
- <CHARACTERISTIC_3>

---

### Complete Example (Task Focus = <FOCUS_OPTION_A>)

**Prompt:**
```
Generate a concise onboarding checklist for a new customer support agent.
```

**Expected output:**
```
Onboarding Checklist (Customer Support Agent)

1. Account setup
   - Create email account and log into helpdesk tool.
   - Verify access to knowledge base and ticket queue.
2. Product basics
   - Review product overview and top 10 FAQs.
   - Complete "Common Issues" training module.
3. Support workflows
   - Shadow two live ticket responses.
   - Practice tagging and escalation flow.
4. Customer communication
   - Review tone guidelines and approved macros.
   - Respond to 3 sample tickets for feedback.
5. Readiness check
   - Pass the support quiz (>= 80%).
   - Schedule first live shift with mentor.
```

**Acceptance criteria:**
- Output includes a title plus a numbered checklist.
- Each section has at least two bullet items.
- Language is concise, actionable, and role-specific.
- No external links unless provided in context.

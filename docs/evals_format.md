# Eval Inputs & Scoring Format

## Input Structure
Each eval uses a single JSON object with the following required keys:

```json
{
  "prompt": "string",
  "context": {
    "task_focus": "string",
    "constraints": ["string"],
    "artifacts": {
      "input": "string",
      "reference": "string"
    }
  },
  "expected_response": "string"
}
```

### Field Definitions
- `prompt`: The user request the model should answer.
- `context`: Extra information needed to answer correctly.
  - `task_focus`: The single skill being evaluated (e.g., "summarization", "classification").
  - `constraints`: Hard requirements the response must follow.
  - `artifacts`: Supporting inputs for the task.
    - `input`: The primary content to operate on.
    - `reference`: Optional reference material to ground the answer.
- `expected_response`: The target response used for grading.

## Pass/Fail Criteria
Eval scoring uses a **checklist rubric** with three checks:

1. **Content Accuracy**: The response preserves all required facts from `expected_response` with no contradictions.
2. **Constraint Compliance**: All `constraints` are satisfied (format, length, tone, etc.).
3. **Task Focus Alignment**: The response directly addresses `task_focus` without unrelated additions.

**Pass** requires all three checks to be satisfied. **Fail** if any check fails. Partial credit is not awarded.

## Example Evals (Task Focus: Summarization)

### Example 1
```json
{
  "prompt": "Summarize the incident report in one sentence.",
  "context": {
    "task_focus": "summarization",
    "constraints": ["one sentence", "<= 25 words"],
    "artifacts": {
      "input": "The outage began at 2:10 PM due to a misconfigured firewall rule. Service was restored by 2:47 PM after rollback.",
      "reference": ""
    }
  },
  "expected_response": "A misconfigured firewall rule caused an outage at 2:10 PM, and service was restored by 2:47 PM after rollback."
}
```

### Example 2
```json
{
  "prompt": "Provide a concise summary of the customer feedback.",
  "context": {
    "task_focus": "summarization",
    "constraints": ["two sentences", "neutral tone"],
    "artifacts": {
      "input": "Customers liked the new dashboard layout but reported slow load times on mobile devices and requested quicker filters.",
      "reference": ""
    }
  },
  "expected_response": "Customers appreciated the new dashboard layout. They noted slow mobile load times and requested faster filters."
}
```

### Example 3
```json
{
  "prompt": "Summarize the release notes for executives.",
  "context": {
    "task_focus": "summarization",
    "constraints": ["one sentence", "executive tone"],
    "artifacts": {
      "input": "Release 3.2 adds SSO support, fixes the billing export bug, and improves search performance by 30%.",
      "reference": ""
    }
  },
  "expected_response": "Release 3.2 introduces SSO, resolves the billing export issue, and delivers a 30% search performance improvement."
}
```

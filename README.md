Agent Designer is a guided workspace for shaping how an AI assistant should behave, written for people who want clear outcomes rather than technical setup. It helps you describe the kind of help you want, gather the right details, and then turns that into a plain-language SKILLS.md file you can share or iterate on.

## MVP flow
1. Select a behavior (e.g., fast researcher, careful planner).
2. Choose tasks that matter to you.
3. Add the context the agent will need.
4. Define simple evaluations to judge success.
5. Generate `SKILLS.md`.

## Run the MVP locally
The MVP is a static HTML app. From the repo root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## MVP non-goals
- No real tool execution, automation, or external integrations yet.
- No live data fetching or system access.
- No multi-agent orchestration or long-running workflows.

## Documentation
- [MVP details](docs/mvp.md)
- [Task & Context Catalog](docs/task_context_catalog.md)
- [Behavior controls schema](docs/behavior_schema.md)

## Evaluation Format
See [docs/evals_format.md](docs/evals_format.md) for the eval input structure, scoring criteria, and example evals.

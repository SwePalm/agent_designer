# Behavior Controls Schema

This document defines the stable slider names, their ranges, and the exact JSON fields they map to. These names are **stable identifiers** and must not change without a coordinated update to both the UI and the generator.

## Slider Definitions

### 1) `formality`
- **UI label:** Formality
- **Range:** 0–100
- **Min/Max labels:** Casual → Formal
- **JSON mapping:**
  - `style.formality` = `formality` / 100
  - **Type:** number (0.00–1.00)
  - **Example:** `formality = 25` → `{ "style": { "formality": 0.25 } }`

### 2) `autonomy`
- **UI label:** Autonomy
- **Range:** 0–100
- **Min/Max labels:** Assistive → Self-directed
- **JSON mapping:**
  - `behavior.autonomy` = `autonomy` / 100
  - **Type:** number (0.00–1.00)
  - **Example:** `autonomy = 80` → `{ "behavior": { "autonomy": 0.8 } }`

### 3) `risk_tolerance`
- **UI label:** Risk tolerance
- **Range:** 0–100
- **Min/Max labels:** Cautious → Risk-seeking
- **JSON mapping:**
  - `safety.riskTolerance` = `risk_tolerance` / 100
  - **Type:** number (0.00–1.00)
  - **Example:** `risk_tolerance = 10` → `{ "safety": { "riskTolerance": 0.1 } }`

### 4) `creativity`
- **UI label:** Creativity
- **Range:** 0–100
- **Min/Max labels:** Literal → Imaginative
- **JSON mapping:**
  - `generation.temperature` = `0.2 + (creativity / 100) * 0.7`
  - **Type:** number (0.20–0.90)
  - **Example:** `creativity = 60` → `{ "generation": { "temperature": 0.62 } }`

### 5) `verbosity`
- **UI label:** Verbosity
- **Range:** 0–100
- **Min/Max labels:** Brief → Detailed
- **JSON mapping:**
  - `generation.maxTokens` = `256 + round((verbosity / 100) * 768)`
  - **Type:** integer (256–1024)
  - **Example:** `verbosity = 50` → `{ "generation": { "maxTokens": 640 } }`

## Integration Notes
- The stable slider **name** (e.g., `risk_tolerance`) is the only key the UI and generator should depend on.
- The JSON fields are intended for later embedding into `SKILLS.md` without renaming.

const SLIDERS = [
  {
    id: "autonomy",
    label: "Autonomy",
    minLabel: "Assistive",
    maxLabel: "Self-directed",
    defaultValue: 50,
  },
  {
    id: "verbosity",
    label: "Verbosity",
    minLabel: "Brief",
    maxLabel: "Detailed",
    defaultValue: 55,
  },
  {
    id: "risk_tolerance",
    label: "Risk tolerance",
    minLabel: "Cautious",
    maxLabel: "Risk-seeking",
    defaultValue: 30,
  },
  {
    id: "creativity",
    label: "Creativity",
    minLabel: "Literal",
    maxLabel: "Imaginative",
    defaultValue: 45,
  },
  {
    id: "formality",
    label: "Formality",
    minLabel: "Casual",
    maxLabel: "Formal",
    defaultValue: 50,
  },
];

const TASK_FOCUS_OPTIONS = [
  "Meeting notes summarizer",
  "Email triage helper",
  "Product release brief generator",
  "Customer feedback synthesizer",
  "Incident postmortem drafter",
  "Sales call recap builder",
  "Research digest composer",
  "Project status updater",
];

const CONTEXT_TYPES = [
  {
    title: "Company glossary",
    description: "Acronyms, product names, internal jargon, and preferred terminology.",
  },
  {
    title: "Team process",
    description: "Rituals, roles, decision-making steps, and escalation paths.",
  },
  {
    title: "Product overview",
    description: "Product positioning, target personas, and feature boundaries.",
  },
  {
    title: "Audience profile",
    description: "Intended readers, tone, and communication preferences.",
  },
  {
    title: "Compliance & privacy rules",
    description: "Redaction policies, regulated data, retention requirements.",
  },
  {
    title: "Data source inventory",
    description: "Approved tools, systems of record, and data freshness.",
  },
  {
    title: "Quality bar & success criteria",
    description: "Output standards, acceptance thresholds, and review steps.",
  },
  {
    title: "Stakeholder map",
    description: "Owners, approvers, and escalation contacts.",
  },
];

const form = document.getElementById("designer-form");
const sliderGroup = document.getElementById("slider-group");
const taskFocusSelect = document.getElementById("task-focus-select");
const contextGrid = document.getElementById("context-grid");
const skillsOutput = document.getElementById("skills-output");
const copyButton = document.getElementById("copy-button");
const downloadButton = document.getElementById("download-button");

const state = {
  sliders: {},
};

function createSlider({ id, label, minLabel, maxLabel, defaultValue }) {
  const wrapper = document.createElement("div");
  wrapper.className = "slider-card";

  const header = document.createElement("div");
  header.className = "slider-header";

  const title = document.createElement("div");
  title.innerHTML = `<strong>${label}</strong><span id="${id}-value">${defaultValue}</span>`;

  header.appendChild(title);

  const input = document.createElement("input");
  input.type = "range";
  input.min = "0";
  input.max = "100";
  input.value = defaultValue;
  input.name = id;

  const labels = document.createElement("div");
  labels.className = "slider-labels";
  labels.innerHTML = `<span>${minLabel}</span><span>${maxLabel}</span>`;

  input.addEventListener("input", (event) => {
    const value = event.target.value;
    document.getElementById(`${id}-value`).textContent = value;
    state.sliders[id] = Number(value);
    updateOutput();
  });

  wrapper.appendChild(header);
  wrapper.appendChild(input);
  wrapper.appendChild(labels);

  state.sliders[id] = defaultValue;
  return wrapper;
}

function createTaskFocusOptions() {
  TASK_FOCUS_OPTIONS.forEach((task) => {
    const option = document.createElement("option");
    option.value = task;
    option.textContent = task;
    taskFocusSelect.appendChild(option);
  });
}

function createContextCards() {
  CONTEXT_TYPES.forEach((context, index) => {
    const card = document.createElement("label");
    card.className = "context-card";
    card.innerHTML = `
      <input type="checkbox" name="contextType" value="${context.title}" />
      <div>
        <strong>${context.title}</strong>
        <p>${context.description}</p>
        <textarea name="contextDetail-${index}" rows="3" placeholder="Notes or sources for this context."></textarea>
      </div>
    `;
    contextGrid.appendChild(card);
  });
}

function getCommaList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getInputValue(name) {
  const field = form.elements[name];
  if (!field) {
    return "";
  }
  return field.value.trim();
}

function getContextDetails() {
  const cards = contextGrid.querySelectorAll(".context-card");
  return Array.from(cards)
    .map((card, index) => {
      const checkbox = card.querySelector("input[type='checkbox']");
      const textarea = card.querySelector(`textarea[name='contextDetail-${index}']`);
      if (!checkbox || !checkbox.checked) {
        return null;
      }
      return {
        title: checkbox.value,
        detail: textarea.value.trim(),
      };
    })
    .filter(Boolean);
}

function buildContextSection(contextSelections, yamlBlock, jsonBlock) {
  let section = "## Context Data Blocks (Placeholders)\n\n";
  if (contextSelections.length) {
    section += "**Selected context blocks:**\n";
    contextSelections.forEach((item) => {
      section += `- **${item.title}:** ${item.detail || "Notes pending."}\n`;
    });
    section += "\n";
  }
  if (yamlBlock) {
    section += "```yaml\n";
    section += `${yamlBlock}\n`;
    section += "```\n\n";
  }
  if (jsonBlock) {
    section += "```json\n";
    section += `${jsonBlock}\n`;
    section += "```\n\n";
  }
  return section;
}

function buildEvalSection() {
  const prompt = getInputValue("evalPrompt");
  const constraints = getCommaList(getInputValue("evalConstraints"));
  const taskFocus = getInputValue("evalTaskFocus");
  const inputArtifact = getInputValue("evalInput");
  const referenceArtifact = getInputValue("evalReference");
  const expected = getInputValue("evalExpected");

  if (!prompt && !expected && !inputArtifact) {
    return "## Evaluation Prompts and Expected Outputs\n\n" +
      "Add eval prompts to validate outputs in the MVP format.\n";
  }

  const evalObject = {
    prompt: prompt || "",
    context: {
      task_focus: taskFocus || "",
      constraints,
      artifacts: {
        input: inputArtifact || "",
        reference: referenceArtifact || "",
      },
    },
    expected_response: expected || "",
  };

  return (
    "## Evaluation Prompts and Expected Outputs\n\n" +
    "```json\n" +
    `${JSON.stringify(evalObject, null, 2)}\n` +
    "```\n"
  );
}

function updateOutput() {
  const traits = getCommaList(getInputValue("personaTraits"));
  const objectives = getCommaList(getInputValue("personaObjectives"));
  const contextSelections = getContextDetails();
  const yamlBlock = getInputValue("contextYaml");
  const jsonBlock = getInputValue("contextJson");

  const behaviorRows = SLIDERS.map((slider) => {
    const value = state.sliders[slider.id] ?? slider.defaultValue;
    return `| ${slider.label} | ${value} | ${slider.minLabel} → ${slider.maxLabel} |`;
  }).join("\n");

  const markdown = `# SKILLS.md\n\n` +
    `## Agent Persona Summary\n\n` +
    `**Persona name:** ${getInputValue("personaName") || "<NAME>"}\n\n` +
    `**One-line summary:** ${getInputValue("personaSummary") || "<ONE_LINE_SUMMARY>"}\n\n` +
    `**Core traits:**\n${traits.length ? traits.map((trait) => `- ${trait}`).join("\n") : "- <TRAIT_1>\n- <TRAIT_2>\n- <TRAIT_3>"}\n\n` +
    `**Voice/tonality:** ${getInputValue("personaVoice") || "<VOICE_TONE>"}\n\n` +
    `**Primary objectives:**\n${objectives.length ? objectives.map((obj) => `- ${obj}`).join("\n") : "- <OBJECTIVE_1>\n- <OBJECTIVE_2>"}\n\n` +
    `---\n\n` +
    `## Behavior Settings (Sliders)\n\n` +
    `| Setting | Value | Notes |\n| --- | --- | --- |\n` +
    `${behaviorRows}\n\n` +
    `---\n\n` +
    `## Task Focus and Scope\n\n` +
    `**Task focus (choose one):**\n- ${getInputValue("taskFocus") || "<FOCUS_OPTION>"}\n\n` +
    `**Scope boundaries:**\n` +
    `- **In-scope:** ${getInputValue("scopeIn") || "<WHAT_THE_AGENT_MUST_HANDLE>"}\n` +
    `- **Out-of-scope:** ${getInputValue("scopeOut") || "<WHAT_THE_AGENT_MUST_DECLINE_OR_ESCALATE>"}\n` +
    `- **Success criteria:** ${getInputValue("scopeSuccess") || "<HOW_SUCCESS_IS_MEASURED>"}\n\n` +
    `---\n\n` +
    `${buildContextSection(contextSelections, yamlBlock, jsonBlock)}` +
    `---\n\n` +
    `${buildEvalSection()}`;

  skillsOutput.value = markdown;
}

function handleCopy() {
  skillsOutput.select();
  document.execCommand("copy");
  copyButton.textContent = "Copied";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 2000);
}

function handleDownload() {
  const blob = new Blob([skillsOutput.value], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "SKILLS.md";
  link.click();
  URL.revokeObjectURL(url);
}

SLIDERS.forEach((slider) => sliderGroup.appendChild(createSlider(slider)));
createTaskFocusOptions();
createContextCards();
updateOutput();

form.addEventListener("input", updateOutput);
copyButton.addEventListener("click", handleCopy);
downloadButton.addEventListener("click", handleDownload);

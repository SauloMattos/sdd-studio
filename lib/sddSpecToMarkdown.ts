import type { AcceptanceCriterion, SddSpec } from "@/types/sdd";

function bulletList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function acceptanceCriteriaList(items: AcceptanceCriterion[]): string {
  return items
    .map((criterion) => `- **${criterion.id}:** ${criterion.description}`)
    .join("\n");
}

function numberedList(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

export function sddSpecToMarkdown(spec: SddSpec): string {
  return [
    `# ${spec.title}`,
    "",
    `**Task type:** ${spec.taskType}`,
    "",
    "## Summary",
    spec.summary,
    "",
    "## Goals",
    bulletList(spec.goals),
    "",
    "## Non-goals",
    bulletList(spec.nonGoals),
    "",
    "## Acceptance Criteria",
    acceptanceCriteriaList(spec.acceptanceCriteria),
    "",
    "## Implementation Plan",
    numberedList(spec.implementationPlan),
    "",
    "## Suggested Agent Prompts",
    numberedList(spec.suggestedAgentPrompts),
    "",
    "## Test Checklist",
    bulletList(spec.testChecklist),
    "",
    "## Risks and Edge Cases",
    bulletList(spec.risksAndEdgeCases),
  ].join("\n");
}

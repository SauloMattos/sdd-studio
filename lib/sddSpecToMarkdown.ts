import type { AcceptanceCriterion, SddSpec } from "@/types/sdd";
import { TASK_TYPE_LABELS } from "@/types/sdd";

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
    `**Tipo de tarefa:** ${TASK_TYPE_LABELS[spec.taskType]}`,
    "",
    "## Resumo",
    spec.summary,
    "",
    "## Objetivos",
    bulletList(spec.goals),
    "",
    "## Fora de escopo",
    bulletList(spec.nonGoals),
    "",
    "## Critérios de aceite",
    acceptanceCriteriaList(spec.acceptanceCriteria),
    "",
    "## Plano de implementação",
    numberedList(spec.implementationPlan),
    "",
    "## Prompts sugeridos para agente",
    numberedList(spec.suggestedAgentPrompts),
    "",
    "## Checklist de testes",
    bulletList(spec.testChecklist),
    "",
    "## Riscos e casos de borda",
    bulletList(spec.risksAndEdgeCases),
  ].join("\n");
}

import type { AcceptanceCriterion, SddSpec } from "@/types/sdd";
import { TASK_TYPE_LABELS } from "@/types/sdd";

function bulletList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function acceptanceCriteriaList(items: AcceptanceCriterion[]): string {
  return items
    .map((criterion) => `- ${criterion.id}: ${criterion.description}`)
    .join("\n");
}

function promptList(items: string[]): string {
  return items
    .map((prompt, index) => `Prompt ${index + 1}:\n${prompt}`)
    .join("\n\n");
}

export function sddSpecToChatPrompt(spec: SddSpec): string {
  return [
    "Quero que você me ajude a executar esta spec em etapas. Não implemente tudo de uma vez. Comece apenas pelo Prompt 1. Depois que eu validar o resultado, eu peço para continuar para o próximo prompt.",
    "",
    "Regras de execução:",
    "- Trabalhe em uma etapa pequena por vez.",
    "- Respeite os critérios de aceite da spec.",
    "- Se faltar contexto crítico, faça perguntas antes de implementar.",
    "- Não avance para o próximo prompt sem minha validação.",
    "- Evite ampliar o escopo além do que está descrito.",
    "",
    "Spec SDD:",
    `Título: ${spec.title}`,
    `Tipo de tarefa: ${TASK_TYPE_LABELS[spec.taskType]}`,
    `Resumo: ${spec.summary}`,
    "",
    "Objetivos:",
    bulletList(spec.goals),
    "",
    "Fora de escopo:",
    bulletList(spec.nonGoals),
    "",
    "Critérios de aceite:",
    acceptanceCriteriaList(spec.acceptanceCriteria),
    "",
    "Prompts para executar em sequência:",
    promptList(spec.suggestedAgentPrompts),
    "",
    "Checklist de validação:",
    bulletList(spec.testChecklist),
  ].join("\n");
}

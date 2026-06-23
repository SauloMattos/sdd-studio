import type { LocalRecipe, MicroTask } from "@/lib/local-sdd/localSddTypes";

export function buildAgentPrompt(
  idea: string,
  recipe: LocalRecipe,
  task: MicroTask,
): string {
  return [
    `Contexto: estou usando o SDD Studio em modo local para transformar esta ideia em uma etapa pequena: "${idea}". Domínio detectado: ${recipe.label}.`,
    `Objetivo: ${task.objective}.`,
    `Escopo: ${task.scope}.`,
    `Fora de escopo: ${task.outOfScope}.`,
    `Critérios de aceite: ${task.acceptanceCriteria.join(" ")}`,
    `Instrução final: implemente apenas a etapa "${task.title}" e pare. Ao final, explique rapidamente o que mudou e como validar.`,
  ].join("\n");
}

export function buildSuggestedAgentPrompts(
  idea: string,
  recipe: LocalRecipe,
  isLargeScope: boolean,
): string[] {
  const prompts = recipe.microTasks.map((task) =>
    buildAgentPrompt(idea, recipe, task),
  );

  if (!isLargeScope) {
    return prompts;
  }

  return prompts.map(
    (prompt) =>
      `${prompt}\nObservação: a ideia parece ampla; execute este prompt sozinho antes de passar para o próximo.`,
  );
}

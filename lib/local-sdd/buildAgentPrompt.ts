import {
  DEFAULT_USER_PROFILE,
  USER_PROFILE_LABELS,
  type UserProfile,
} from "@/types/sdd";
import type { LocalRecipe, MicroTask } from "@/lib/local-sdd/localSddTypes";

const PROFILE_PROMPT_COPY: Record<
  UserProfile,
  {
    guidance: string;
    finalInstruction: (taskTitle: string) => string;
  }
> = {
  beginner: {
    guidance:
      "Orientação de perfil: escreva de forma didática, explique decisões em passos curtos e mostre como validar cada mudança.",
    finalInstruction: (taskTitle) =>
      `Instrução final: implemente apenas a etapa "${taskTitle}" e pare. Ao final, explique em passos simples o que mudou e como validar.`,
  },
  experienced: {
    guidance:
      "Orientação de perfil: seja direto, técnico e conciso; priorize contratos, arquivos impactados, casos de borda e validação objetiva.",
    finalInstruction: (taskTitle) =>
      `Instrução final: implemente apenas a etapa "${taskTitle}" e pare. Ao final, entregue um resumo técnico curto com arquivos alterados e validação.`,
  },
  common: {
    guidance:
      "Orientação de perfil: use linguagem simples, evite jargões desnecessários e explique qualquer termo técnico indispensável.",
    finalInstruction: (taskTitle) =>
      `Instrução final: implemente apenas a etapa "${taskTitle}" e pare. Ao final, explique em linguagem simples o que mudou e como conferir se funcionou.`,
  },
};

export function buildAgentPrompt(
  idea: string,
  recipe: LocalRecipe,
  task: MicroTask,
  userProfile: UserProfile = DEFAULT_USER_PROFILE,
): string {
  const profileCopy = PROFILE_PROMPT_COPY[userProfile];

  return [
    `Contexto: estou usando o SDD Studio em modo local para transformar esta ideia em uma etapa pequena: "${idea}". Domínio detectado: ${recipe.label}.`,
    `Perfil do usuário: ${USER_PROFILE_LABELS[userProfile]}.`,
    profileCopy.guidance,
    `Objetivo: ${task.objective}.`,
    `Escopo: ${task.scope}.`,
    `Fora de escopo: ${task.outOfScope}.`,
    `Critérios de aceite: ${task.acceptanceCriteria.join(" ")}`,
    profileCopy.finalInstruction(task.title),
  ].join("\n");
}

export function buildSuggestedAgentPrompts(
  idea: string,
  recipe: LocalRecipe,
  isLargeScope: boolean,
  userProfile: UserProfile = DEFAULT_USER_PROFILE,
): string[] {
  const prompts = recipe.microTasks.map((task) =>
    buildAgentPrompt(idea, recipe, task, userProfile),
  );

  if (!isLargeScope) {
    return prompts;
  }

  return prompts.map(
    (prompt) =>
      `${prompt}\nObservação: a ideia parece ampla; execute este prompt sozinho antes de passar para o próximo.`,
  );
}

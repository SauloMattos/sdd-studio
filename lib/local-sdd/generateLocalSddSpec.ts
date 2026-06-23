import {
  DEFAULT_USER_PROFILE,
  type LocalSddInput,
  type SddSpec,
} from "@/types/sdd";
import { buildSuggestedAgentPrompts } from "@/lib/local-sdd/buildAgentPrompt";
import { detectLocalRecipe } from "@/lib/local-sdd/detectLocalRecipe";
import { TASK_TYPE_COPY } from "@/lib/local-sdd/localSddRecipes";
import type { LocalRecipe } from "@/lib/local-sdd/localSddTypes";
import {
  normalizeForSearch,
  normalizeIdeaText,
} from "@/lib/local-sdd/localSddText";

function makeTitle(idea: string, recipe: LocalRecipe): string {
  const compactIdea = idea.length > 72 ? `${idea.slice(0, 69)}...` : idea;
  return `Spec SDD local (${recipe.label}): ${compactIdea}`;
}

function isLargeIdea(normalizedIdea: string, wordCount: number): boolean {
  return (
    wordCount >= 26 ||
    normalizedIdea.includes("plataforma") ||
    normalizedIdea.includes("sistema completo") ||
    normalizedIdea.includes("mvp") ||
    normalizedIdea.includes("do zero") ||
    normalizedIdea.includes("todos os") ||
    normalizedIdea.includes("tudo")
  );
}

function buildAcceptanceCriteria(
  idea: string,
  recipe: LocalRecipe,
): SddSpec["acceptanceCriteria"] {
  return [
    {
      id: "AC-1",
      description: `A primeira entrega responde diretamente à ideia do usuário: "${idea}".`,
    },
    ...recipe.acceptanceCriteria.map((description, index) => ({
      id: `AC-${index + 2}`,
      description,
    })),
  ];
}

function buildImplementationPlan(
  recipe: LocalRecipe,
  isLargeScope: boolean,
): string[] {
  const plan = [...recipe.implementationPlan];

  if (isLargeScope) {
    return [
      "Tratar esta ideia como ampla: executar um prompt sugerido por vez e validar antes de avançar.",
      ...plan,
    ];
  }

  return plan;
}

function buildGoals(recipe: LocalRecipe, isLargeScope: boolean): string[] {
  if (!isLargeScope) {
    return recipe.goals;
  }

  return [
    ...recipe.goals,
    "Executar a spec em microtarefas sequenciais, copiando um prompt por vez para a IA externa.",
  ];
}

function buildNonGoals(recipe: LocalRecipe, isLargeScope: boolean): string[] {
  if (!isLargeScope) {
    return recipe.nonGoals;
  }

  return [
    ...recipe.nonGoals,
    "Não pedir para a IA implementar toda a ideia em um único prompt.",
  ];
}

function buildTestChecklist(recipe: LocalRecipe, isLargeScope: boolean): string[] {
  if (!isLargeScope) {
    return recipe.testChecklist;
  }

  return [
    "Validar cada microtarefa separadamente antes de iniciar a próxima.",
    ...recipe.testChecklist,
  ];
}

function buildRisks(recipe: LocalRecipe, isLargeScope: boolean): string[] {
  if (!isLargeScope) {
    return recipe.risksAndEdgeCases;
  }

  return [
    "Pedir tudo em um único prompt pode gerar implementação grande, cara e difícil de revisar.",
    ...recipe.risksAndEdgeCases,
  ];
}

export function generateLocalSddSpec(input: LocalSddInput): SddSpec {
  const idea = normalizeIdeaText(input.idea);
  const taskType = TASK_TYPE_COPY[input.taskType];
  const userProfile = input.userProfile ?? DEFAULT_USER_PROFILE;
  const wordCount = idea.split(/\s+/).filter(Boolean).length;
  const recipe = detectLocalRecipe(input, idea);
  const largeScope = isLargeIdea(normalizeForSearch(idea), wordCount);

  return {
    title: makeTitle(idea, recipe),
    taskType: input.taskType,
    summary: `Gerar uma ${taskType} local-first para esta ideia: "${idea}". Receita detectada: ${recipe.label}. O objetivo é ${recipe.summaryFocus}, mantendo tudo determinístico, copiável e sem chamadas externas.`,
    goals: buildGoals(recipe, largeScope),
    nonGoals: buildNonGoals(recipe, largeScope),
    acceptanceCriteria: buildAcceptanceCriteria(idea, recipe),
    implementationPlan: buildImplementationPlan(recipe, largeScope),
    suggestedAgentPrompts: buildSuggestedAgentPrompts(
      idea,
      recipe,
      largeScope,
      userProfile,
    ),
    testChecklist: buildTestChecklist(recipe, largeScope),
    risksAndEdgeCases: buildRisks(recipe, largeScope),
  };
}

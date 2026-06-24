import type { SddSpec } from "@/types/sdd";
import type {
  SddSpecQualityEvaluation,
  SddSpecQualityStatus,
} from "@/types/sddQuality";

const MIN_SCORE = 0;
const MAX_SCORE = 100;
const BROAD_SCOPE_SIGNALS = [
  "sistema completo",
  "plataforma inteira",
  "do zero",
  "aplicação inteira",
  "aplicacao inteira",
  "app completo",
  "reescrever tudo",
];

function clampScore(score: number): number {
  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, Math.round(score)));
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function textIncludesAny(text: string, terms: string[]): boolean {
  const normalizedText = text.toLowerCase();
  return terms.some((term) => normalizedText.includes(term));
}

function acceptanceCriteriaAreDescriptive(spec: SddSpec): boolean {
  return (
    spec.acceptanceCriteria.length >= 1 &&
    spec.acceptanceCriteria.every(
      (criterion) =>
        criterion.id.trim().length > 0 &&
        countWords(criterion.description) >= 4,
    )
  );
}

function hasClearObjective(spec: SddSpec): boolean {
  return countWords(spec.summary) >= 10 && spec.goals.length >= 1;
}

function hasAcceptanceCriteria(spec: SddSpec): boolean {
  return spec.acceptanceCriteria.length >= 2 && acceptanceCriteriaAreDescriptive(spec);
}

function hasBroadScopeSignal(spec: SddSpec): boolean {
  const scopeText = [
    spec.title,
    spec.summary,
    ...spec.goals,
    ...spec.acceptanceCriteria.map((criterion) => criterion.description),
    ...spec.implementationPlan,
    ...spec.suggestedAgentPrompts,
  ].join(" ");
  const normalizedScopeText = scopeText.toLowerCase();

  return (
    /\btudo\b/.test(normalizedScopeText) ||
    textIncludesAny(normalizedScopeText, BROAD_SCOPE_SIGNALS)
  );
}

function hasSmallScope(spec: SddSpec): boolean {
  const totalWorkItems =
    spec.goals.length +
    spec.implementationPlan.length +
    spec.suggestedAgentPrompts.length;

  return (
    spec.goals.length >= 1 &&
    spec.implementationPlan.length >= 1 &&
    spec.suggestedAgentPrompts.length >= 1 &&
    !hasBroadScopeSignal(spec) &&
    spec.goals.length <= 4 &&
    spec.implementationPlan.length <= 6 &&
    spec.suggestedAgentPrompts.length <= 4 &&
    totalWorkItems <= 12
  );
}

function hasTestableSteps(spec: SddSpec): boolean {
  return (
    spec.implementationPlan.length >= 2 &&
    spec.testChecklist.length >= 2 &&
    acceptanceCriteriaAreDescriptive(spec)
  );
}

function hasEnoughContextForCodingAi(spec: SddSpec): boolean {
  const promptsText = spec.suggestedAgentPrompts.join(" ");

  return (
    spec.suggestedAgentPrompts.length >= 1 &&
    spec.nonGoals.length >= 1 &&
    spec.risksAndEdgeCases.length >= 1 &&
    countWords(promptsText) >= 20
  );
}

function statusFromScore(
  score: number,
  suggestions: string[],
): SddSpecQualityStatus {
  if (score >= 80 && suggestions.length === 0) {
    return "boa";
  }

  if (score >= 50) {
    return "precisa-de-refinamento";
  }

  return "muito-vaga";
}

function buildStrengths(
  clearObjective: boolean,
  acceptanceCriteria: boolean,
  smallScope: boolean,
  testableSteps: boolean,
  enoughContext: boolean,
): string[] {
  const strengths: string[] = [];

  if (clearObjective) {
    strengths.push("Objetivo principal está claro.");
  }

  if (acceptanceCriteria) {
    strengths.push("Critérios de aceite ajudam a validar a entrega.");
  }

  if (smallScope) {
    strengths.push("Escopo está pequeno o bastante para execução incremental.");
  }

  if (testableSteps) {
    strengths.push("Plano e checklist favorecem validação prática.");
  }

  if (enoughContext) {
    strengths.push("Prompts trazem contexto suficiente para uma coding AI.");
  }

  return strengths.slice(0, 4);
}

function buildSuggestions(
  clearObjective: boolean,
  acceptanceCriteria: boolean,
  smallScope: boolean,
  testableSteps: boolean,
  enoughContext: boolean,
): string[] {
  const suggestions: string[] = [];

  if (!clearObjective) {
    suggestions.push("Deixe o objetivo mais específico e ligado ao resultado esperado.");
  }

  if (!acceptanceCriteria) {
    suggestions.push("Adicione critérios de aceite verificáveis antes de implementar.");
  }

  if (!smallScope) {
    suggestions.push("Reduza o escopo para uma primeira entrega menor.");
  }

  if (!testableSteps) {
    suggestions.push("Inclua passos e checklist que possam ser testados localmente.");
  }

  if (!enoughContext) {
    suggestions.push("Inclua contexto, fora de escopo e riscos para orientar a coding AI.");
  }

  return suggestions.slice(0, 4);
}

export function evaluateSddSpec(spec: SddSpec): SddSpecQualityEvaluation {
  const clearObjective = hasClearObjective(spec);
  const acceptanceCriteria = hasAcceptanceCriteria(spec);
  const smallScope = hasSmallScope(spec);
  const testableSteps = hasTestableSteps(spec);
  const enoughContext = hasEnoughContextForCodingAi(spec);

  const score = clampScore(
    (clearObjective ? 20 : 0) +
      (acceptanceCriteria ? 20 : 0) +
      (smallScope ? 20 : 0) +
      (testableSteps ? 20 : 0) +
      (enoughContext ? 20 : 0),
  );
  const strengths = buildStrengths(
    clearObjective,
    acceptanceCriteria,
    smallScope,
    testableSteps,
    enoughContext,
  );
  const suggestions = buildSuggestions(
    clearObjective,
    acceptanceCriteria,
    smallScope,
    testableSteps,
    enoughContext,
  );

  return {
    score,
    status: statusFromScore(score, suggestions),
    strengths,
    suggestions,
  };
}

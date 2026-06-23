import type { SddSpec } from "@/types/sdd";
import type {
  SddQualityLevel,
  SddScopeClassification,
  SddSpecQualityEvaluation,
} from "@/types/sddQuality";

const MIN_SCORE = 0;
const MAX_SCORE = 100;

function clampScore(score: number): number {
  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, Math.round(score)));
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function averageWordCount(items: string[]): number {
  if (items.length === 0) {
    return 0;
  }

  const totalWords = items.reduce((sum, item) => sum + countWords(item), 0);
  return totalWords / items.length;
}

function classifyScope(spec: SddSpec): SddScopeClassification {
  const totalItems =
    spec.goals.length +
    spec.nonGoals.length +
    spec.acceptanceCriteria.length +
    spec.implementationPlan.length +
    spec.suggestedAgentPrompts.length +
    spec.testChecklist.length +
    spec.risksAndEdgeCases.length;

  if (
    spec.suggestedAgentPrompts.length > 4 ||
    spec.implementationPlan.length > 6 ||
    totalItems > 24
  ) {
    return "Large";
  }

  if (
    spec.suggestedAgentPrompts.length >= 3 ||
    spec.implementationPlan.length >= 4 ||
    totalItems > 14
  ) {
    return "Medium";
  }

  return "Small";
}

function classifyTokenEfficiency(spec: SddSpec): SddQualityLevel {
  const averagePromptWords = averageWordCount(spec.suggestedAgentPrompts);
  const summaryWords = countWords(spec.summary);

  if (
    spec.suggestedAgentPrompts.length <= 3 &&
    averagePromptWords <= 24 &&
    summaryWords <= 45
  ) {
    return "High";
  }

  if (
    spec.suggestedAgentPrompts.length <= 4 &&
    averagePromptWords <= 40 &&
    summaryWords <= 70
  ) {
    return "Medium";
  }

  return "Low";
}

function classifyClarity(spec: SddSpec): SddQualityLevel {
  const claritySignals = [
    countWords(spec.summary) >= 12,
    spec.goals.length >= 2,
    spec.nonGoals.length >= 2,
    spec.risksAndEdgeCases.length >= 2,
  ].filter(Boolean).length;

  if (claritySignals >= 4) {
    return "High";
  }

  if (claritySignals >= 2) {
    return "Medium";
  }

  return "Low";
}

function classifyValidationReadiness(spec: SddSpec): SddQualityLevel {
  const acceptanceCriteriaHaveIds = spec.acceptanceCriteria.every(
    (criterion) => criterion.id.trim().length > 0,
  );
  const validationSignals = [
    spec.acceptanceCriteria.length >= 3,
    acceptanceCriteriaHaveIds,
    spec.testChecklist.length >= 3,
    spec.implementationPlan.length >= 3,
  ].filter(Boolean).length;

  if (validationSignals >= 4) {
    return "High";
  }

  if (validationSignals >= 2) {
    return "Medium";
  }

  return "Low";
}

function levelScore(level: SddQualityLevel): number {
  if (level === "High") {
    return 25;
  }

  if (level === "Medium") {
    return 17;
  }

  return 8;
}

function scopeScore(scope: SddScopeClassification): number {
  if (scope === "Small") {
    return 25;
  }

  if (scope === "Medium") {
    return 18;
  }

  return 10;
}

function buildSuggestions(
  spec: SddSpec,
  scope: SddScopeClassification,
  tokenEfficiency: SddQualityLevel,
  clarity: SddQualityLevel,
  validationReadiness: SddQualityLevel,
): string[] {
  const suggestions: string[] = [];

  if (scope === "Large") {
    suggestions.push("Divida a spec em um primeiro recorte de implementação menor.");
  } else if (scope === "Medium") {
    suggestions.push(
      "Verifique se algum objetivo ou passo de implementação pode ser adiado.",
    );
  }

  if (tokenEfficiency !== "High") {
    suggestions.push(
      "Encurte os prompts sugeridos para que cada um peça uma ação concreta.",
    );
  }

  if (clarity !== "High") {
    suggestions.push(
      "Adicione objetivos, itens fora de escopo ou riscos mais claros antes de enviar a um agente.",
    );
  }

  if (validationReadiness !== "High") {
    suggestions.push(
      "Adicione critérios de aceite e itens de checklist que possam ser verificados localmente.",
    );
  }

  if (spec.risksAndEdgeCases.length === 0) {
    suggestions.push(
      "Inclua pelo menos um risco ou caso de borda antes da implementação.",
    );
  }

  return suggestions.slice(0, 4);
}

export function evaluateSddSpec(spec: SddSpec): SddSpecQualityEvaluation {
  const scope = classifyScope(spec);
  const tokenEfficiency = classifyTokenEfficiency(spec);
  const clarity = classifyClarity(spec);
  const validationReadiness = classifyValidationReadiness(spec);
  const score = clampScore(
    scopeScore(scope) +
      levelScore(tokenEfficiency) +
      levelScore(clarity) +
      levelScore(validationReadiness),
  );

  return {
    score,
    scope,
    tokenEfficiency,
    clarity,
    validationReadiness,
    suggestions: buildSuggestions(
      spec,
      scope,
      tokenEfficiency,
      clarity,
      validationReadiness,
    ),
  };
}

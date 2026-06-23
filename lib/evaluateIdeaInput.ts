import type {
  IdeaQualityEvaluation,
  IdeaQualityLevel,
} from "@/types/ideaQuality";

export const IDEA_QUALITY_MIN_WORDS = 4;

const MIN_SCORE = 0;
const MAX_SCORE = 100;

const OBJECTIVE_TERMS = [
  "add",
  "allow",
  "automate",
  "build",
  "create",
  "fix",
  "generate",
  "implement",
  "improve",
  "refactor",
  "validate",
  "adicionar",
  "automatizar",
  "corrigir",
  "criar",
  "gerar",
  "implementar",
  "melhorar",
  "permitir",
  "validar",
];

const ACTOR_TERMS = [
  "admin",
  "agent",
  "customer",
  "developer",
  "maintainer",
  "operator",
  "user",
  "cliente",
  "desenvolvedor",
  "operador",
  "usuario",
];

const TECHNICAL_TERMS = [
  "api",
  "auth",
  "backend",
  "component",
  "database",
  "endpoint",
  "frontend",
  "hook",
  "library",
  "next",
  "node",
  "postgres",
  "react",
  "route",
  "server",
  "supabase",
  "tailwind",
  "typescript",
  "webhook",
  "banco",
  "componente",
  "rota",
];

const WORKFLOW_TERMS = [
  "dashboard",
  "flow",
  "form",
  "page",
  "screen",
  "step",
  "view",
  "workflow",
  "fluxo",
  "formulario",
  "pagina",
  "tela",
];

const DATA_TERMS = [
  "csv",
  "data",
  "input",
  "output",
  "payload",
  "return",
  "state",
  "dados",
  "entrada",
  "estado",
  "retorno",
  "saida",
];

const CONSTRAINT_TERMS = [
  "avoid",
  "constraint",
  "do not",
  "don't",
  "only",
  "scope",
  "without",
  "apenas",
  "escopo",
  "nao",
  "restricao",
  "sem",
];

const TESTABILITY_TERMS = [
  "acceptance",
  "criteria",
  "edge",
  "error",
  "expected",
  "scenario",
  "test",
  "validate",
  "criterio",
  "erro",
  "esperado",
  "cenario",
  "teste",
  "validar",
];

function normalizeIdea(idea: string): string {
  return idea.trim().replace(/\s+/g, " ");
}

function normalizeForSearch(idea: string): string {
  return normalizeIdea(idea)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function countWords(text: string): number {
  return normalizeIdea(text).split(/\s+/).filter(Boolean).length;
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function clampScore(score: number): number {
  return Math.max(MIN_SCORE, Math.min(MAX_SCORE, Math.round(score)));
}

function levelFromScore(score: number, maxScore: number): IdeaQualityLevel {
  const ratio = maxScore === 0 ? 0 : score / maxScore;

  if (ratio >= 0.75) {
    return "High";
  }

  if (ratio >= 0.45) {
    return "Medium";
  }

  return "Low";
}

export function shouldEvaluateIdeaInput(idea: string): boolean {
  return countWords(idea) >= IDEA_QUALITY_MIN_WORDS;
}

export function evaluateIdeaInput(idea: string): IdeaQualityEvaluation {
  const normalizedIdea = normalizeForSearch(idea);
  const wordCount = countWords(idea);
  const hasObjective = includesAny(normalizedIdea, OBJECTIVE_TERMS);
  const hasActor = includesAny(normalizedIdea, ACTOR_TERMS);
  const hasTechnicalContext = includesAny(normalizedIdea, TECHNICAL_TERMS);
  const hasWorkflow = includesAny(normalizedIdea, WORKFLOW_TERMS);
  const hasDataBoundary = includesAny(normalizedIdea, DATA_TERMS);
  const hasConstraint = includesAny(normalizedIdea, CONSTRAINT_TERMS);
  const hasTestSignal = includesAny(normalizedIdea, TESTABILITY_TERMS);
  const hasExpectedOutcome =
    normalizedIdea.includes("so that") ||
    normalizedIdea.includes("para que") ||
    normalizedIdea.includes("should") ||
    normalizedIdea.includes("deve");

  const clarityScore =
    (wordCount >= 20 ? 16 : wordCount >= 10 ? 11 : 6) +
    (hasObjective ? 8 : 0) +
    (hasActor ? 5 : 0) +
    (hasWorkflow ? 6 : 0);

  const technicalContextScore =
    (hasTechnicalContext ? 13 : 0) +
    (hasWorkflow ? 7 : 0) +
    (hasDataBoundary ? 5 : 0) +
    (hasConstraint ? 5 : 0);

  const testabilityScore =
    (hasTestSignal ? 13 : 0) +
    (hasExpectedOutcome ? 9 : 0) +
    (normalizedIdea.includes("error") || normalizedIdea.includes("erro")
      ? 6
      : 0) +
    (hasConstraint ? 7 : 0);

  const missingInformation: string[] = [];
  const suggestions: string[] = [];

  if (!hasObjective) {
    missingInformation.push("Clear objective");
    suggestions.push("Start with the concrete outcome this change should deliver.");
  }

  if (!hasActor) {
    missingInformation.push("Primary user or actor");
    suggestions.push("Name who uses the feature or who is affected by the change.");
  }

  if (!hasTechnicalContext) {
    missingInformation.push("Technical stack or system area");
    suggestions.push("Mention the relevant stack, module, route, component, or service.");
  }

  if (!hasTestSignal && !hasExpectedOutcome) {
    missingInformation.push("Validation or expected behavior");
    suggestions.push("Add how you would test or validate the expected behavior.");
  }

  if (!hasConstraint) {
    missingInformation.push("Constraints or non-goals");
    suggestions.push("Add what should stay out of scope for the first implementation.");
  }

  return {
    score: clampScore(clarityScore + technicalContextScore + testabilityScore),
    clarity: levelFromScore(clarityScore, 35),
    technicalContext: levelFromScore(technicalContextScore, 30),
    testability: levelFromScore(testabilityScore, 35),
    missingInformation,
    suggestions: suggestions.slice(0, 4),
  };
}

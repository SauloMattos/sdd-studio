import type { SddInput, SddSpec } from "@/types/sdd";

const TASK_TYPE_COPY: Record<SddInput["taskType"], string> = {
  feature: "feature",
  bugfix: "bugfix",
  refactor: "refactor",
  test: "test coverage task",
  documentation: "documentation update",
};

function normalizeIdea(idea: string): string {
  return idea.trim().replace(/\s+/g, " ");
}

function makeTitle(idea: string): string {
  const compactIdea = idea.length > 72 ? `${idea.slice(0, 69)}...` : idea;
  return `SDD Spec: ${compactIdea}`;
}

export function generateMockSddSpec(input: SddInput): SddSpec {
  const idea = normalizeIdea(input.idea);
  const taskType = TASK_TYPE_COPY[input.taskType];

  return {
    title: makeTitle(idea),
    taskType: input.taskType,
    summary: `Create a focused ${taskType} for this user idea: "${idea}". This mock spec keeps the scope local and concrete so the product flow can be validated before any AI integration exists.`,
    goals: [
      "Turn the raw idea into a small, reviewable implementation target.",
      "Keep the first iteration narrow enough for an AI coding agent to complete safely.",
      "Make expected behavior observable through clear acceptance criteria and tests.",
    ],
    nonGoals: [
      "Do not call an external AI provider in this step.",
      "Do not add API routes, authentication, or database persistence.",
      "Do not expand beyond the user-entered idea until the workflow is validated.",
    ],
    acceptanceCriteria: [
      {
        id: "AC-1",
        description: `The implemented work directly addresses the idea: "${idea}".`,
      },
      {
        id: "AC-2",
        description:
          "The change can be verified locally without external services or credentials.",
      },
      {
        id: "AC-3",
        description:
          "The final behavior is documented with a concise test checklist.",
      },
    ],
    implementationPlan: [
      "Identify the smallest user-facing behavior implied by the idea.",
      "Update only the files required for that behavior.",
      "Keep data local and deterministic for the first validation pass.",
      "Run typecheck and a local dev-server smoke test.",
    ],
    suggestedAgentPrompts: [
      `Implement the smallest local ${taskType} for: "${idea}". Do not add external services.`,
      "Review the changed files for type safety, unnecessary scope expansion, and missing tests.",
      "Produce a concise verification summary that maps changes back to the acceptance criteria.",
    ],
    testChecklist: [
      "Run npm run typecheck.",
      "Start the app with npm run dev.",
      "Exercise the primary form flow in the browser.",
      "Confirm the resulting UI state matches the acceptance criteria.",
    ],
    risksAndEdgeCases: [
      "The idea may be too broad and need a narrower first slice.",
      "A later AI-backed version may generate different structure than this mock output.",
      "Very long user input should remain readable in generated sections.",
    ],
  };
}

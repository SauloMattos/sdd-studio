import { describe, expect, it } from "vitest";
import { evaluateSddSpec } from "../lib/evaluateSddSpec";
import { generateMockSddSpec } from "../lib/generateMockSddSpec";
import type { SddSpec } from "../types/sdd";

const incompleteSpec: SddSpec = {
  title: "SDD Spec: Import CSV rows",
  taskType: "feature",
  summary: "Import CSV rows.",
  goals: ["Import rows"],
  nonGoals: [],
  acceptanceCriteria: [],
  implementationPlan: [],
  suggestedAgentPrompts: [
    "Implement a very broad CSV import workflow with parsing, validation, retries, reconciliation, UI, logging, and reporting in one pass.",
  ],
  testChecklist: [],
  risksAndEdgeCases: [],
};

describe("evaluateSddSpec", () => {
  it("returns a score between 0 and 100", () => {
    const spec = generateMockSddSpec({
      idea: "Build a local export flow for maintainers",
      taskType: "feature",
    });
    const evaluation = evaluateSddSpec(spec);

    expect(evaluation.score).toBeGreaterThanOrEqual(0);
    expect(evaluation.score).toBeLessThanOrEqual(100);
  });

  it("returns suggestions when the spec is missing validation detail", () => {
    const evaluation = evaluateSddSpec(incompleteSpec);

    expect(evaluation.suggestions.length).toBeGreaterThan(0);
    expect(evaluation.suggestions).toContain(
      "Add acceptance criteria and test checklist items that can be verified locally.",
    );
  });

  it("is deterministic for the same spec", () => {
    expect(evaluateSddSpec(incompleteSpec)).toEqual(
      evaluateSddSpec(incompleteSpec),
    );
  });
});

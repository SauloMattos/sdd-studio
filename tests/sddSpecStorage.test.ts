import { describe, expect, it } from "vitest";
import { generateMockSddSpec } from "../lib/generateMockSddSpec";
import {
  normalizeStoredSddSpec,
  parseStoredSddSpec,
  sddSpecToStorageJson,
} from "../lib/sddSpecStorage";

describe("sddSpecStorage", () => {
  it("serializes and parses a valid SddSpec", () => {
    const spec = generateMockSddSpec({
      idea: "Criar dashboard com filtros por período",
      taskType: "feature",
      userProfile: "experienced",
    });

    expect(parseStoredSddSpec(sddSpecToStorageJson(spec))).toEqual(spec);
  });

  it("rejects invalid JSON without throwing", () => {
    expect(parseStoredSddSpec("{invalid")).toBeNull();
    expect(parseStoredSddSpec(null)).toBeNull();
  });

  it("rejects invalid spec shapes", () => {
    expect(
      normalizeStoredSddSpec({
        title: "Spec inválida",
        taskType: "feature",
        summary: "Sem listas obrigatórias.",
      }),
    ).toBeNull();

    expect(
      normalizeStoredSddSpec({
        title: "Spec inválida",
        taskType: "other",
        summary: "Tipo inválido.",
        goals: ["Objetivo"],
        nonGoals: ["Fora de escopo"],
        acceptanceCriteria: [{ id: "AC-1", description: "Critério" }],
        implementationPlan: ["Plano"],
        suggestedAgentPrompts: ["Prompt"],
        testChecklist: ["Teste"],
        risksAndEdgeCases: ["Risco"],
      }),
    ).toBeNull();
  });
});

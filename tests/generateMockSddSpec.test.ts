import { describe, expect, it } from "vitest";
import { generateMockSddSpec } from "../lib/generateMockSddSpec";

describe("generateMockSddSpec", () => {
  it("includes the user idea in generated spec fields", () => {
    const idea = "Build a release checklist for maintainers";
    const spec = generateMockSddSpec({
      idea: `  ${idea}  `,
      taskType: "feature",
    });

    expect(spec.title).toContain(idea);
    expect(spec.summary).toContain(idea);
    expect(spec.acceptanceCriteria[0]?.description).toContain(idea);
    expect(spec.suggestedAgentPrompts[0]).toContain(idea);
  });

  it("preserves the selected task type", () => {
    const spec = generateMockSddSpec({
      idea: "Document the release workflow",
      taskType: "documentation",
    });

    expect(spec.taskType).toBe("documentation");
    expect(spec.summary).toContain("atualização de documentação");
  });
});

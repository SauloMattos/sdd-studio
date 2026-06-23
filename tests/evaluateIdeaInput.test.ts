import { describe, expect, it } from "vitest";
import { evaluateIdeaInput } from "../lib/evaluateIdeaInput";

describe("evaluateIdeaInput", () => {
  it("scores a short vague idea lower than a complete idea", () => {
    const vagueIdea = evaluateIdeaInput("Improve onboarding for users");
    const completeIdea = evaluateIdeaInput(
      "Build a React form for developers to validate release checklist errors without API calls",
    );

    expect(vagueIdea.score).toBeLessThan(completeIdea.score);
    expect(vagueIdea.missingInformation).toContain(
      "Stack técnica ou área do sistema",
    );
  });

  it("improves technical context and testability when stack and validation details are present", () => {
    const basicIdea = evaluateIdeaInput("Build onboarding for users");
    const technicalIdea = evaluateIdeaInput(
      "Build a React form for developers to validate release checklist errors without API calls",
    );

    expect(basicIdea.technicalContext).toBe("Low");
    expect(basicIdea.testability).toBe("Low");
    expect(technicalIdea.technicalContext).toBe("High");
    expect(technicalIdea.testability).toBe("High");
  });

  it("is deterministic for the same input", () => {
    const idea =
      "Create a TypeScript utility for developers to test CSV import errors without API calls";

    expect(evaluateIdeaInput(idea)).toEqual(evaluateIdeaInput(idea));
  });
});

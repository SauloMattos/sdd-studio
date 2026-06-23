import { describe, expect, it } from "vitest";
import { generateMockSddSpec } from "../lib/generateMockSddSpec";
import { sddSpecToChatPrompt } from "../lib/sddSpecToChatPrompt";

describe("sddSpecToChatPrompt", () => {
  it("builds a conversational execution package for step-by-step AI use", () => {
    const spec = generateMockSddSpec({
      idea: "Criar uma tela de login simples em React",
      taskType: "feature",
      userProfile: "beginner",
    });
    const prompt = sddSpecToChatPrompt(spec);

    expect(prompt).toContain(
      "Quero que você me ajude a executar esta spec em etapas.",
    );
    expect(prompt).toContain("Não implemente tudo de uma vez");
    expect(prompt).toContain("Comece apenas pelo Prompt 1");
    expect(prompt).toContain("Não avance para o próximo prompt");
    expect(prompt).toContain("Se faltar contexto crítico");
    expect(prompt).toContain("Evite ampliar o escopo");
  });

  it("includes suggested prompts and acceptance criteria", () => {
    const spec = generateMockSddSpec({
      idea: "Refatorar componente React grande sem mudar comportamento",
      taskType: "refactor",
      userProfile: "experienced",
    });
    const prompt = sddSpecToChatPrompt(spec);

    expect(prompt).toContain("Critérios de aceite:");
    expect(prompt).toContain(spec.acceptanceCriteria[0]?.description);
    expect(prompt).toContain("Prompts para executar em sequência:");
    expect(prompt).toContain("Prompt 1:");
    expect(prompt).toContain(spec.suggestedAgentPrompts[0]);
  });
});

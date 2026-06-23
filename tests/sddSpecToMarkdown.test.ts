import { describe, expect, it } from "vitest";
import { generateMockSddSpec } from "../lib/generateMockSddSpec";
import { sddSpecToMarkdown } from "../lib/sddSpecToMarkdown";

describe("sddSpecToMarkdown", () => {
  it("exports the main SDD spec sections", () => {
    const spec = generateMockSddSpec({
      idea: "Create a dashboard filter for operators",
      taskType: "feature",
    });
    const markdown = sddSpecToMarkdown(spec);

    expect(markdown).toContain(`# ${spec.title}`);
    expect(markdown).toContain("**Tipo de tarefa:** Funcionalidade");
    expect(markdown).toContain("## Resumo");
    expect(markdown).toContain("## Objetivos");
    expect(markdown).toContain("## Fora de escopo");
    expect(markdown).toContain("## Critérios de aceite");
    expect(markdown).toContain("## Plano de implementação");
    expect(markdown).toContain("## Prompts sugeridos para agente");
    expect(markdown).toContain("## Checklist de testes");
    expect(markdown).toContain("## Riscos e casos de borda");
  });

  it("formats acceptance criteria with stable ids", () => {
    const spec = generateMockSddSpec({
      idea: "Create a dashboard filter for operators",
      taskType: "feature",
    });
    const markdown = sddSpecToMarkdown(spec);

    expect(markdown).toContain("- **AC-1:**");
    expect(markdown).toContain("- **AC-2:**");
    expect(markdown).toContain("- **AC-3:**");
  });
});

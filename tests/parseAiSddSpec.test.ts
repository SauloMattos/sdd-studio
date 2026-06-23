import { describe, expect, it } from "vitest";
import { parseAiSddSpec } from "../lib/parseAiSddSpec";
import type { SddSpec } from "../types/sdd";

const validAiResponse = {
  title: "Spec SDD: Corrigir envio duplo no checkout",
  taskType: "bugfix",
  summary:
    "Corrigir o envio duplo do formulário de pagamento mantendo o escopo local e verificável.",
  goals: [
    "Impedir múltiplos envios do formulário de pagamento.",
    "Manter o comportamento atual para um envio válido.",
  ],
  nonGoals: [
    "Não trocar o provedor de pagamentos.",
    "Não alterar o fluxo completo de checkout.",
  ],
  acceptanceCriteria: [
    {
      id: "AC-1",
      description:
        "Ao clicar duas vezes no botão de envio, apenas uma submissão é processada.",
    },
    {
      id: "AC-2",
      description:
        "O botão fica indisponível enquanto a submissão está em andamento.",
    },
  ],
  implementationPlan: [
    "Identificar o estado de submissão do formulário.",
    "Bloquear novos envios enquanto a submissão estiver ativa.",
    "Adicionar testes para clique duplo.",
  ],
  suggestedAgentPrompts: [
    "Implemente o bloqueio local de envio duplo no formulário de checkout.",
    "Adicione testes para garantir que clique duplo não cria duas submissões.",
  ],
  testChecklist: [
    "Rodar npm run typecheck.",
    "Rodar npm run test.",
    "Validar manualmente o clique duplo no formulário.",
  ],
  risksAndEdgeCases: [
    "Falhas de rede podem deixar o estado de submissão preso.",
    "O bloqueio não deve impedir uma nova tentativa após erro.",
  ],
};

describe("parseAiSddSpec", () => {
  it("converts a structurally valid AI object response into SddSpec", () => {
    const spec: SddSpec = parseAiSddSpec(validAiResponse);

    expect(spec).toEqual(validAiResponse);
    expect(spec.taskType).toBe("bugfix");
    expect(spec.acceptanceCriteria[0]?.id).toBe("AC-1");
  });

  it("parses a JSON string response into SddSpec", () => {
    const spec = parseAiSddSpec(JSON.stringify(validAiResponse));

    expect(spec.title).toBe(validAiResponse.title);
    expect(spec.suggestedAgentPrompts).toHaveLength(2);
  });

  it("trims string fields while validating the response", () => {
    const spec = parseAiSddSpec({
      ...validAiResponse,
      title: "  Spec SDD: Corrigir envio duplo no checkout  ",
      goals: ["  Impedir múltiplos envios do formulário de pagamento.  "],
    });

    expect(spec.title).toBe("Spec SDD: Corrigir envio duplo no checkout");
    expect(spec.goals[0]).toBe(
      "Impedir múltiplos envios do formulário de pagamento.",
    );
  });

  it("rejects invalid task types", () => {
    expect(() =>
      parseAiSddSpec({
        ...validAiResponse,
        taskType: "migration",
      }),
    ).toThrow();
  });

  it("rejects responses that are broader than the contract allows", () => {
    expect(() =>
      parseAiSddSpec({
        ...validAiResponse,
        suggestedAgentPrompts: [
          "Prompt 1",
          "Prompt 2",
          "Prompt 3",
          "Prompt 4",
          "Prompt 5",
        ],
      }),
    ).toThrow();
  });

  it("rejects Markdown-wrapped JSON strings", () => {
    expect(() =>
      parseAiSddSpec(`\`\`\`json\n${JSON.stringify(validAiResponse)}\n\`\`\``),
    ).toThrow();
  });
});

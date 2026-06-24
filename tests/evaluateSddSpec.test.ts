import { describe, expect, it } from "vitest";
import { evaluateSddSpec } from "../lib/evaluateSddSpec";
import type { SddSpec } from "../types/sdd";

const goodSpec: SddSpec = {
  title: "Spec SDD: Criar filtro de pedidos",
  taskType: "feature",
  summary:
    "Criar um filtro simples de pedidos por status para ajudar operadores a encontrar pedidos pendentes com menos esforço.",
  goals: [
    "Adicionar filtro por status na listagem de pedidos.",
    "Manter o comportamento atual da listagem sem filtro.",
  ],
  nonGoals: ["Não alterar autenticação.", "Não criar novos relatórios."],
  acceptanceCriteria: [
    {
      id: "AC-1",
      description: "Operador consegue filtrar pedidos por status pendente.",
    },
    {
      id: "AC-2",
      description: "Filtro vazio mostra todos os pedidos como antes.",
    },
  ],
  implementationPlan: [
    "Adicionar estado local para o status selecionado.",
    "Filtrar a lista renderizada antes de exibir os pedidos.",
    "Validar visualmente os estados com e sem filtro.",
  ],
  suggestedAgentPrompts: [
    "Contexto: existe uma listagem de pedidos. Objetivo: adicionar apenas filtro por status. Escopo: estado local, select e filtragem da lista. Fora de escopo: autenticação e API. Critérios de aceite: validar filtro pendente e filtro vazio.",
  ],
  testChecklist: [
    "Validar filtro por status pendente.",
    "Verificar que filtro vazio mantém todos os pedidos.",
  ],
  risksAndEdgeCases: [
    "Lista vazia deve continuar exibindo estado vazio.",
    "Status desconhecido não deve quebrar a tela.",
  ],
};

const vagueSpec: SddSpec = {
  title: "Spec SDD: Fazer app",
  taskType: "feature",
  summary: "Fazer um app.",
  goals: [],
  nonGoals: [],
  acceptanceCriteria: [],
  implementationPlan: [],
  suggestedAgentPrompts: ["Faça tudo."],
  testChecklist: [],
  risksAndEdgeCases: [],
};

const partialSpec: SddSpec = {
  title: "Spec SDD: Melhorar cadastro",
  taskType: "feature",
  summary:
    "Melhorar o cadastro de usuário com validação simples para reduzir erros de preenchimento.",
  goals: ["Adicionar validação básica no formulário."],
  nonGoals: ["Não integrar novo provedor externo."],
  acceptanceCriteria: [
    {
      id: "AC-1",
      description: "Email inválido mostra uma mensagem de erro.",
    },
  ],
  implementationPlan: ["Adicionar validação no submit."],
  suggestedAgentPrompts: [
    "Contexto: formulário de cadastro existente. Objetivo: adicionar validação básica de email. Escopo: validação no submit e mensagem de erro. Fora de escopo: backend e autenticação.",
  ],
  testChecklist: ["Validar email inválido."],
  risksAndEdgeCases: ["Mensagem de erro não deve apagar dados digitados."],
};

const structuredTestableSpecWithoutMagicWords: SddSpec = {
  ...goodSpec,
  implementationPlan: [
    "Adicionar regra para email vazio no envio.",
    "Mostrar mensagem abaixo do campo de email.",
  ],
  acceptanceCriteria: [
    {
      id: "AC-1",
      description: "Email vazio mostra mensagem de erro.",
    },
    {
      id: "AC-2",
      description: "Email preenchido segue fluxo atual.",
    },
  ],
  testChecklist: [
    "Email vazio mostra mensagem de erro.",
    "Email preenchido segue fluxo atual.",
  ],
  suggestedAgentPrompts: [
    "Contexto: formulário de cadastro existente. Objetivo: adicionar mensagens para email vazio. Escopo: regra no envio, mensagem no campo e fluxo atual preservado. Fora de escopo: backend e autenticação.",
  ],
};

const broadButShortSpec: SddSpec = {
  ...goodSpec,
  summary:
    "Criar um app completo de pedidos para operadores gerenciarem vendas, clientes e status em uma única entrega.",
  goals: ["Criar app completo de pedidos para operadores."],
  implementationPlan: [
    "Criar tela principal de pedidos.",
    "Adicionar controle de status do pedido.",
  ],
  suggestedAgentPrompts: [
    "Contexto: existe uma ideia de pedidos para operadores. Objetivo: criar app completo de pedidos. Escopo: tela principal, status, clientes e vendas em uma entrega. Fora de escopo: nenhum.",
  ],
};

describe("evaluateSddSpec", () => {
  it("scores a good spec higher and returns strengths", () => {
    const evaluation = evaluateSddSpec(goodSpec);

    expect(evaluation.score).toBeGreaterThanOrEqual(80);
    expect(evaluation.status).toBe("boa");
    expect(evaluation.strengths).toContain("Objetivo principal está claro.");
    expect(evaluation.strengths).toContain(
      "Critérios de aceite ajudam a validar a entrega.",
    );
    expect(evaluation.suggestions).toHaveLength(0);
  });

  it("scores a vague spec lower and returns useful suggestions", () => {
    const evaluation = evaluateSddSpec(vagueSpec);

    expect(evaluation.score).toBeLessThan(50);
    expect(evaluation.status).toBe("muito-vaga");
    expect(evaluation.strengths).toHaveLength(0);
    expect(evaluation.suggestions).toContain(
      "Deixe o objetivo mais específico e ligado ao resultado esperado.",
    );
    expect(evaluation.suggestions).toContain(
      "Adicione critérios de aceite verificáveis antes de implementar.",
    );
  });

  it("scores a partially complete spec between vague and good specs", () => {
    const vagueEvaluation = evaluateSddSpec(vagueSpec);
    const partialEvaluation = evaluateSddSpec(partialSpec);
    const goodEvaluation = evaluateSddSpec(goodSpec);

    expect(partialEvaluation.score).toBeGreaterThan(vagueEvaluation.score);
    expect(partialEvaluation.score).toBeLessThan(goodEvaluation.score);
    expect(partialEvaluation.status).toBe("precisa-de-refinamento");
    expect(partialEvaluation.suggestions.length).toBeGreaterThan(0);
  });

  it("recognizes testable structure without magic validation words", () => {
    const evaluation = evaluateSddSpec(structuredTestableSpecWithoutMagicWords);

    expect(evaluation.strengths).toContain(
      "Plano e checklist favorecem validação prática.",
    );
    expect(evaluation.suggestions).not.toContain(
      "Inclua passos e checklist que possam ser testados localmente.",
    );
  });

  it("does not reward small scope when short specs contain broad scope signals", () => {
    const evaluation = evaluateSddSpec(broadButShortSpec);

    expect(evaluation.strengths).not.toContain(
      "Escopo está pequeno o bastante para execução incremental.",
    );
    expect(evaluation.suggestions).toContain(
      "Reduza o escopo para uma primeira entrega menor.",
    );
  });

  it("does not mark specs with important suggestions as good", () => {
    const evaluation = evaluateSddSpec(broadButShortSpec);

    expect(evaluation.score).toBeGreaterThanOrEqual(80);
    expect(evaluation.suggestions.length).toBeGreaterThan(0);
    expect(evaluation.status).toBe("precisa-de-refinamento");
  });

  it("is deterministic for the same spec", () => {
    expect(evaluateSddSpec(partialSpec)).toEqual(evaluateSddSpec(partialSpec));
  });
});

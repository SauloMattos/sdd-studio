import { describe, expect, it } from "vitest";
import {
  generateLocalSddSpec,
  generateMockSddSpec,
} from "../lib/generateMockSddSpec";

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

  it("keeps the compatible export mapped to the local generator", () => {
    const input = {
      idea: "Criar filtro no dashboard para operadores",
      taskType: "feature" as const,
    };

    expect(generateMockSddSpec(input)).toEqual(generateLocalSddSpec(input));
  });

  it("generates ecommerce microtasks for catalog, cart, and checkout", () => {
    const spec = generateMockSddSpec({
      idea: "Criar loja com catálogo de produto, carrinho e checkout local",
      taskType: "feature",
    });
    const text = [
      spec.summary,
      ...spec.implementationPlan,
      ...spec.testChecklist,
      ...spec.risksAndEdgeCases,
      ...spec.suggestedAgentPrompts,
    ].join("\n");

    expect(spec.summary).toContain("e-commerce");
    expect(text).toContain("catálogo");
    expect(text).toContain("carrinho");
    expect(text).toContain("checkout");
  });

  it("generates auth microtasks for login, protected routes, and validation", () => {
    const spec = generateMockSddSpec({
      idea: "Adicionar login com Google e proteger a rota /dashboard",
      taskType: "feature",
    });
    const text = [
      spec.summary,
      ...spec.implementationPlan,
      ...spec.testChecklist,
      ...spec.risksAndEdgeCases,
      ...spec.suggestedAgentPrompts,
    ].join("\n");

    expect(spec.summary).toContain("autenticação e login");
    expect(text).toContain("login");
    expect(text).toContain("rotas privadas");
    expect(text).toContain("Validar estados de autenticação");
  });

  it("generates API backend microtasks for contract, endpoint, validation, and tests", () => {
    const spec = generateMockSddSpec({
      idea: "Criar endpoint backend para salvar pedidos com validação de payload",
      taskType: "feature",
    });
    const text = [
      spec.summary,
      ...spec.acceptanceCriteria.map((criterion) => criterion.description),
      ...spec.implementationPlan,
      ...spec.testChecklist,
      ...spec.suggestedAgentPrompts,
    ].join("\n");

    expect(spec.summary).toContain("API e backend");
    expect(text).toContain("contrato");
    expect(text).toContain("endpoint");
    expect(text).toContain("validação");
    expect(text).toContain("testes");
  });

  it("generates refactor microtasks that preserve behavior and validate regressions", () => {
    const spec = generateMockSddSpec({
      idea: "Refatorar componente grande separando estado, dados e renderização",
      taskType: "refactor",
    });
    const text = [
      spec.summary,
      ...spec.implementationPlan,
      ...spec.testChecklist,
      ...spec.risksAndEdgeCases,
      ...spec.suggestedAgentPrompts,
    ].join("\n");

    expect(spec.summary).toContain("refatoração");
    expect(text).toContain("comportamento existente");
    expect(text).toContain("Separar responsabilidades");
    expect(text).toContain("Validar regressões");
  });

  it("generates dashboard microtasks for metrics, filters, and data states", () => {
    const spec = generateMockSddSpec({
      idea: "Criar dashboard com relatórios, gráficos e filtros por período",
      taskType: "feature",
    });
    const text = [
      spec.summary,
      ...spec.implementationPlan,
      ...spec.testChecklist,
      ...spec.suggestedAgentPrompts,
    ].join("\n");

    expect(spec.summary).toContain("dashboard e relatórios");
    expect(text).toContain("métricas");
    expect(text).toContain("filtros");
    expect(text).toContain("Estados de erro e vazio");
  });

  it("generates testing microtasks when the selected task type is test", () => {
    const spec = generateMockSddSpec({
      idea: "Criar testes para cálculo de total do pedido",
      taskType: "test",
    });
    const text = [
      spec.summary,
      ...spec.implementationPlan,
      ...spec.testChecklist,
      ...spec.suggestedAgentPrompts,
    ].join("\n");

    expect(spec.summary).toContain("testes");
    expect(text).toContain("Mapear cenários críticos");
    expect(text).toContain("caminho feliz");
    expect(text).toContain("nenhum teste chama rede real");
  });

  it("generates documentation microtasks when the selected task type is documentation", () => {
    const spec = generateMockSddSpec({
      idea: "Documentar o fluxo de release para novos mantenedores",
      taskType: "documentation",
    });
    const text = [
      spec.summary,
      ...spec.implementationPlan,
      ...spec.testChecklist,
      ...spec.suggestedAgentPrompts,
    ].join("\n");

    expect(spec.summary).toContain("documentação");
    expect(text).toContain("Mapear público e objetivo");
    expect(text).toContain("passo a passo");
    expect(text).toContain("Limitações atuais");
  });

  it("falls back to a generic MVP recipe for broad product ideas", () => {
    const spec = generateMockSddSpec({
      idea: "Criar um aplicativo para organizar tarefas pessoais",
      taskType: "feature",
    });
    const text = [
      spec.summary,
      ...spec.implementationPlan,
      ...spec.testChecklist,
      ...spec.suggestedAgentPrompts,
    ].join("\n");

    expect(spec.summary).toContain("projeto genérico ou MVP");
    expect(text).toContain("jornada principal");
    expect(text).toContain("dados mínimos");
    expect(text).toContain("fluxo vertical pequeno");
  });

  it("builds copy-ready prompts with the required SDD sections", () => {
    const spec = generateMockSddSpec({
      idea: "Criar endpoint backend para consultar relatórios",
      taskType: "feature",
    });

    for (const prompt of spec.suggestedAgentPrompts) {
      expect(prompt).toContain("Contexto:");
      expect(prompt).toContain("Objetivo:");
      expect(prompt).toContain("Escopo:");
      expect(prompt).toContain("Fora de escopo:");
      expect(prompt).toContain("Critérios de aceite:");
      expect(prompt).toContain("Instrução final:");
      expect(prompt).toContain("implemente apenas a etapa");
    }
  });

  it("recommends running one prompt at a time for broad ideas", () => {
    const spec = generateMockSddSpec({
      idea: "Criar uma plataforma MVP completa de e-commerce com produtos, carrinho, checkout, relatórios, usuários e painel administrativo",
      taskType: "feature",
    });

    expect(spec.goals).toContain(
      "Executar a spec em microtarefas sequenciais, copiando um prompt por vez para a IA externa.",
    );
    expect(spec.nonGoals).toContain(
      "Não pedir para a IA implementar toda a ideia em um único prompt.",
    );
    expect(spec.suggestedAgentPrompts[0]).toContain(
      "execute este prompt sozinho antes de passar para o próximo",
    );
  });
});

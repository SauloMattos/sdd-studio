import { describe, expect, it } from "vitest";
import { buildSddGenerationPrompt } from "../lib/buildSddGenerationPrompt";

describe("buildSddGenerationPrompt", () => {
  it("builds a pt-BR prompt with the user idea and selected task type", () => {
    const prompt = buildSddGenerationPrompt({
      idea: "  Criar filtros no dashboard para operadores  ",
      taskType: "feature",
    });

    expect(prompt).toContain(
      "Você é um assistente de especificação SDD para desenvolvedores.",
    );
    expect(prompt).toContain(
      "transformar uma ideia vaga de software em uma spec pequena",
    );
    expect(prompt).toContain("português do Brasil");
    expect(prompt).toContain("Criar filtros no dashboard para operadores");
    expect(prompt).toContain("Tipo de tarefa: Funcionalidade (feature)");
  });

  it("asks for valid JSON without Markdown and keeps the taskType fixed", () => {
    const prompt = buildSddGenerationPrompt({
      idea: "Corrigir envio duplo no checkout",
      taskType: "bugfix",
    });

    expect(prompt).toContain("Responda apenas com JSON válido");
    expect(prompt).toContain("sem Markdown fora do JSON");
    expect(prompt).toContain('"taskType": "bugfix"');
    expect(prompt).toContain(
      "Mantenha o campo taskType exatamente igual ao valor recebido.",
    );
  });

  it("instructs the model to keep scope small and token-efficient", () => {
    const prompt = buildSddGenerationPrompt({
      idea: "Refatorar a página de clientes",
      taskType: "refactor",
    });

    expect(prompt).toContain("Escopo pequeno");
    expect(prompt).toContain("Economia de tokens");
    expect(prompt).toContain("Evitar tarefas grandes demais");
    expect(prompt).toContain("menor recorte útil");
  });
});

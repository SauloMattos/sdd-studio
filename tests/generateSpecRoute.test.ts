import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { aiSddSpecSchema } from "../lib/aiSddSpecSchema";

const { openAiConstructorMock, responsesParseMock, zodTextFormatMock } =
  vi.hoisted(() => {
    const responsesParseMock = vi.fn();
    const openAiConstructorMock = vi.fn(function OpenAI() {
      return {
        responses: {
          parse: responsesParseMock,
        },
      };
    });
    const zodTextFormatMock = vi.fn(() => ({
      type: "json_schema",
      name: "sdd_spec",
    }));

    return {
      openAiConstructorMock,
      responsesParseMock,
      zodTextFormatMock,
    };
  });

vi.mock("openai", () => ({
  default: openAiConstructorMock,
}));

vi.mock("openai/helpers/zod", () => ({
  zodTextFormat: zodTextFormatMock,
}));

import { POST } from "../app/api/generate-spec/route";

const originalApiKey = process.env.OPENAI_API_KEY;

const validRequestBody = {
  idea: "Corrigir envio duplo no checkout",
  taskType: "bugfix",
};

const validAiResponse = {
  title: "Spec SDD: Corrigir envio duplo no checkout",
  taskType: "bugfix",
  summary:
    "Corrigir o envio duplo do formulário de pagamento mantendo o escopo local e verificável.",
  goals: ["Impedir múltiplos envios do formulário de pagamento."],
  nonGoals: ["Não alterar o provedor de pagamentos."],
  acceptanceCriteria: [
    {
      id: "AC-1",
      description:
        "Ao clicar duas vezes no botão de envio, apenas uma submissão é processada.",
    },
  ],
  implementationPlan: ["Bloquear novos envios enquanto a submissão estiver ativa."],
  suggestedAgentPrompts: [
    "Implemente o bloqueio local de envio duplo no formulário de checkout.",
  ],
  testChecklist: ["Rodar npm run test."],
  risksAndEdgeCases: ["Falhas de rede podem exigir liberação do estado de envio."],
};

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/generate-spec", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/generate-spec", () => {
  beforeEach(() => {
    delete process.env.OPENAI_API_KEY;
    openAiConstructorMock.mockClear();
    responsesParseMock.mockReset();
    zodTextFormatMock.mockClear();
  });

  afterEach(() => {
    if (originalApiKey) {
      process.env.OPENAI_API_KEY = originalApiKey;
    } else {
      delete process.env.OPENAI_API_KEY;
    }
  });

  it("returns 400 when the request body is not valid JSON", async () => {
    const response = await POST(makeRequest("{invalid-json"));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Envie um JSON válido com idea e taskType.");
    expect(openAiConstructorMock).not.toHaveBeenCalled();
  });

  it("returns 400 when idea is empty", async () => {
    const response = await POST(
      makeRequest({
        idea: "   ",
        taskType: "feature",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Informe uma ideia válida para gerar a Spec SDD.");
    expect(openAiConstructorMock).not.toHaveBeenCalled();
  });

  it("returns 400 when taskType is invalid", async () => {
    const response = await POST(
      makeRequest({
        idea: "Criar filtro no dashboard",
        taskType: "migration",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Informe um tipo de tarefa válido.");
    expect(openAiConstructorMock).not.toHaveBeenCalled();
  });

  it("returns 500 when OPENAI_API_KEY is not configured", async () => {
    const response = await POST(makeRequest(validRequestBody));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe(
      "A integração com IA não está configurada. Defina OPENAI_API_KEY no ambiente do servidor.",
    );
    expect(openAiConstructorMock).not.toHaveBeenCalled();
  });

  it("uses OpenAI with the internal prompt and returns a validated SddSpec", async () => {
    process.env.OPENAI_API_KEY = "test-api-key";
    responsesParseMock.mockResolvedValue({
      output_parsed: validAiResponse,
      output_text: "",
    });

    const response = await POST(makeRequest(validRequestBody));
    const body = await response.json();
    const openAiCall = responsesParseMock.mock.calls[0]?.[0];

    expect(response.status).toBe(200);
    expect(body).toEqual(validAiResponse);
    expect(openAiConstructorMock).toHaveBeenCalledWith({
      apiKey: "test-api-key",
    });
    expect(zodTextFormatMock).toHaveBeenCalledWith(
      aiSddSpecSchema,
      "sdd_spec",
    );
    expect(openAiCall).toMatchObject({
      model: "gpt-4.1-mini",
      temperature: 0.2,
    });
    expect(openAiCall.input).toContain(
      "Você é um assistente de especificação SDD para desenvolvedores.",
    );
    expect(openAiCall.input).toContain("Corrigir envio duplo no checkout");
  });

  it("returns 502 when the AI response cannot be validated", async () => {
    process.env.OPENAI_API_KEY = "test-api-key";
    responsesParseMock.mockResolvedValue({
      output_parsed: null,
      output_text: JSON.stringify({
        ...validAiResponse,
        taskType: "invalid",
      }),
    });

    const response = await POST(makeRequest(validRequestBody));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body.error).toBe(
      "Não foi possível gerar uma Spec SDD válida com IA. Tente novamente.",
    );
  });
});

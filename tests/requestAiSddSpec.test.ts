import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AI_GENERATION_NOT_CONFIGURED_MESSAGE,
  requestAiSddSpec,
} from "../lib/requestAiSddSpec";

const validSpec = {
  title: "Spec SDD: Corrigir envio duplo",
  taskType: "bugfix",
  summary: "Corrigir envio duplo no checkout.",
  goals: ["Impedir envios duplicados."],
  nonGoals: ["Não alterar o provedor de pagamento."],
  acceptanceCriteria: [
    {
      id: "AC-1",
      description: "Clique duplo dispara apenas uma submissão.",
    },
  ],
  implementationPlan: ["Bloquear o botão enquanto envia."],
  suggestedAgentPrompts: ["Implemente o bloqueio de envio duplo."],
  testChecklist: ["Rodar npm run test."],
  risksAndEdgeCases: ["Erro de rede deve liberar nova tentativa."],
};

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json",
    },
    ...init,
  });
}

describe("requestAiSddSpec", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the input to the AI generation route and returns the spec", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(validSpec));
    vi.stubGlobal("fetch", fetchMock);

    const spec = await requestAiSddSpec({
      idea: "Corrigir envio duplo",
      taskType: "bugfix",
    });

    expect(spec).toEqual(validSpec);
    expect(fetchMock).toHaveBeenCalledWith("/api/generate-spec", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        idea: "Corrigir envio duplo",
        taskType: "bugfix",
      }),
    });
  });

  it("maps missing API key errors to the friendly UI message", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse(
        {
          error:
            "A integração com IA não está configurada. Defina OPENAI_API_KEY no ambiente do servidor.",
        },
        { status: 500 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      requestAiSddSpec({
        idea: "Criar filtro no dashboard",
        taskType: "feature",
      }),
    ).rejects.toThrow(AI_GENERATION_NOT_CONFIGURED_MESSAGE);
  });

  it("uses the API error message for other failed responses", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse(
        {
          error:
            "Não foi possível gerar uma Spec SDD válida com IA. Tente novamente.",
        },
        { status: 502 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      requestAiSddSpec({
        idea: "Criar filtro no dashboard",
        taskType: "feature",
      }),
    ).rejects.toThrow(
      "Não foi possível gerar uma Spec SDD válida com IA. Tente novamente.",
    );
  });

  it("uses a generic error when the failed response has no JSON body", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("erro", { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      requestAiSddSpec({
        idea: "Criar filtro no dashboard",
        taskType: "feature",
      }),
    ).rejects.toThrow(
      "Não foi possível gerar a Spec SDD com IA. Tente novamente ou use o modo local.",
    );
  });
});

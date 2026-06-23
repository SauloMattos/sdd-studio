import type { SddInput, SddSpec } from "@/types/sdd";

export const AI_GENERATION_NOT_CONFIGURED_MESSAGE =
  "A geração com IA não está configurada neste ambiente. Use o modo local ou configure OPENAI_API_KEY.";

const DEFAULT_AI_GENERATION_ERROR_MESSAGE =
  "Não foi possível gerar a Spec SDD com IA. Tente novamente ou use o modo local.";

function getApiErrorMessage(body: unknown): string | null {
  if (
    body &&
    typeof body === "object" &&
    "error" in body &&
    typeof body.error === "string"
  ) {
    return body.error;
  }

  return null;
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function requestAiSddSpec(input: SddInput): Promise<SddSpec> {
  const response = await fetch("/api/generate-spec", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const body = await readJson(response);

  if (!response.ok) {
    const apiErrorMessage = getApiErrorMessage(body);

    if (
      response.status === 500 &&
      apiErrorMessage?.includes("OPENAI_API_KEY")
    ) {
      throw new Error(AI_GENERATION_NOT_CONFIGURED_MESSAGE);
    }

    throw new Error(apiErrorMessage ?? DEFAULT_AI_GENERATION_ERROR_MESSAGE);
  }

  return body as SddSpec;
}

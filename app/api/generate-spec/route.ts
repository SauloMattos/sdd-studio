import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";
import { z } from "zod";
import { aiSddSpecSchema } from "@/lib/aiSddSpecSchema";
import { buildSddGenerationPrompt } from "@/lib/buildSddGenerationPrompt";
import { parseAiSddSpec } from "@/lib/parseAiSddSpec";

export const runtime = "nodejs";

const OPENAI_MODEL = "gpt-4.1-mini";

const generateSpecRequestSchema = z
  .object({
    idea: z.string().trim().min(1),
    taskType: z.enum([
      "feature",
      "bugfix",
      "refactor",
      "test",
      "documentation",
    ]),
  })
  .strict();

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function validationMessage(error: z.ZodError): string {
  const firstIssuePath = error.issues[0]?.path[0];

  if (firstIssuePath === "idea") {
    return "Informe uma ideia válida para gerar a Spec SDD.";
  }

  if (firstIssuePath === "taskType") {
    return "Informe um tipo de tarefa válido.";
  }

  return "Requisição inválida. Envie um JSON com idea e taskType.";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Envie um JSON válido com idea e taskType.", 400);
  }

  const parsedBody = generateSpecRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return jsonError(validationMessage(parsedBody.error), 400);
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return jsonError(
      "A integração com IA não está configurada. Defina OPENAI_API_KEY no ambiente do servidor.",
      500,
    );
  }

  try {
    const client = new OpenAI({ apiKey });
    const prompt = buildSddGenerationPrompt(parsedBody.data);
    const response = await client.responses.parse({
      model: OPENAI_MODEL,
      input: prompt,
      temperature: 0.2,
      text: {
        format: zodTextFormat(aiSddSpecSchema, "sdd_spec"),
      },
    });

    const spec = parseAiSddSpec(response.output_parsed ?? response.output_text);

    return NextResponse.json(spec);
  } catch (error) {
    console.error("[generate-spec] Failed to generate AI spec:", error);

    const message =
      error instanceof Error ? error.message : "Erro desconhecido.";

    return jsonError(
      `Erro interno ao gerar Spec SDD com IA: ${message}`,
      502,
    );
  }
}
import { aiSddSpecSchema } from "@/lib/aiSddSpecSchema";
import type { SddSpec } from "@/types/sdd";

function parseUnknownJson(response: unknown): unknown {
  if (typeof response !== "string") {
    return response;
  }

  return JSON.parse(response);
}

export function parseAiSddSpec(response: unknown): SddSpec {
  const parsedResponse = parseUnknownJson(response);
  const spec = aiSddSpecSchema.parse(parsedResponse);

  return {
    title: spec.title,
    taskType: spec.taskType,
    summary: spec.summary,
    goals: spec.goals,
    nonGoals: spec.nonGoals,
    acceptanceCriteria: spec.acceptanceCriteria,
    implementationPlan: spec.implementationPlan,
    suggestedAgentPrompts: spec.suggestedAgentPrompts,
    testChecklist: spec.testChecklist,
    risksAndEdgeCases: spec.risksAndEdgeCases,
  };
}

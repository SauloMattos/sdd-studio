import { z } from "zod";
import type { SddSpec } from "@/types/sdd";

export const SDD_LAST_SPEC_STORAGE_KEY = "sdd-studio:last-spec";

const nonEmptyString = z.string().trim().min(1);

const taskTypeSchema = z.enum([
  "feature",
  "bugfix",
  "refactor",
  "test",
  "documentation",
]);

const storedAcceptanceCriterionSchema = z.object({
  id: nonEmptyString,
  description: nonEmptyString,
});

const storedSddSpecSchema = z
  .object({
    title: nonEmptyString,
    taskType: taskTypeSchema,
    summary: nonEmptyString,
    goals: z.array(nonEmptyString).min(1),
    nonGoals: z.array(nonEmptyString).min(1),
    acceptanceCriteria: z.array(storedAcceptanceCriterionSchema).min(1),
    implementationPlan: z.array(nonEmptyString).min(1),
    suggestedAgentPrompts: z.array(nonEmptyString).min(1),
    testChecklist: z.array(nonEmptyString).min(1),
    risksAndEdgeCases: z.array(nonEmptyString).min(1),
  })
  .strict();

export function normalizeStoredSddSpec(value: unknown): SddSpec | null {
  const parsed = storedSddSpecSchema.safeParse(value);

  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}

export function parseStoredSddSpec(rawSpec: string | null): SddSpec | null {
  if (!rawSpec) {
    return null;
  }

  try {
    return normalizeStoredSddSpec(JSON.parse(rawSpec));
  } catch {
    return null;
  }
}

export function sddSpecToStorageJson(spec: SddSpec): string {
  return JSON.stringify(spec);
}

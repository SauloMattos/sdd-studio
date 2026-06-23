import { z } from "zod";

const trimmedString = z.string().trim().min(1);

const taskTypeSchema = z.enum([
  "feature",
  "bugfix",
  "refactor",
  "test",
  "documentation",
]);

const acceptanceCriterionSchema = z.object({
  id: trimmedString.regex(/^AC-\d+$/),
  description: trimmedString,
});

export const aiSddSpecSchema = z
  .object({
    title: trimmedString,
    taskType: taskTypeSchema,
    summary: trimmedString,
    goals: z.array(trimmedString).min(1).max(4),
    nonGoals: z.array(trimmedString).min(1).max(4),
    acceptanceCriteria: z.array(acceptanceCriterionSchema).min(1).max(5),
    implementationPlan: z.array(trimmedString).min(1).max(6),
    suggestedAgentPrompts: z.array(trimmedString).min(1).max(4),
    testChecklist: z.array(trimmedString).min(1).max(6),
    risksAndEdgeCases: z.array(trimmedString).min(1).max(5),
  })
  .strict();

export type AiSddSpecResponse = z.infer<typeof aiSddSpecSchema>;

/**
 * Core domain types for SDD Studio.
 *
 * SDD = "Spec-Driven Development" style output: a small, structured,
 * testable specification derived from a vague software idea.
 */

/** The kind of task the spec describes. */
export type TaskType =
  | "feature"
  | "bugfix"
  | "refactor"
  | "test"
  | "documentation";

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  feature: "Funcionalidade",
  bugfix: "Correção de bug",
  refactor: "Refatoração",
  test: "Teste",
  documentation: "Documentação",
};

/** Human-friendly labels for each TaskType, useful for selects/UI. */
export const TASK_TYPE_OPTIONS: ReadonlyArray<{
  value: TaskType;
  label: string;
}> = [
  { value: "feature", label: TASK_TYPE_LABELS.feature },
  { value: "bugfix", label: TASK_TYPE_LABELS.bugfix },
  { value: "refactor", label: TASK_TYPE_LABELS.refactor },
  { value: "test", label: TASK_TYPE_LABELS.test },
  { value: "documentation", label: TASK_TYPE_LABELS.documentation },
];

/** What the user provides: the raw idea plus the chosen task type. */
export interface SddInput {
  /** The vague idea the user typed. */
  idea: string;
  /** The selected task type. */
  taskType: TaskType;
}

/** A single acceptance criterion in the generated spec. */
export interface AcceptanceCriterion {
  id: string;
  description: string;
}

/**
 * The structured specification produced from an SddInput.
 */
export interface SddSpec {
  title: string;
  taskType: TaskType;
  summary: string;
  goals: string[];
  nonGoals: string[];
  acceptanceCriteria: AcceptanceCriterion[];
  implementationPlan: string[];
  suggestedAgentPrompts: string[];
  testChecklist: string[];
  risksAndEdgeCases: string[];
}

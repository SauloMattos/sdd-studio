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

/** Human-friendly labels for each TaskType, useful for selects/UI. */
export const TASK_TYPE_OPTIONS: ReadonlyArray<{
  value: TaskType;
  label: string;
}> = [
  { value: "feature", label: "Feature" },
  { value: "bugfix", label: "Bugfix" },
  { value: "refactor", label: "Refactor" },
  { value: "test", label: "Test" },
  { value: "documentation", label: "Documentation" },
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

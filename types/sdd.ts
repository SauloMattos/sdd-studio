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

/** The audience profile used to tune local SDD prompts. */
export type UserProfile = "beginner" | "experienced" | "common";

export const DEFAULT_USER_PROFILE: UserProfile = "beginner";

export const USER_PROFILE_LABELS: Record<UserProfile, string> = {
  beginner: "Iniciante",
  experienced: "Dev experiente",
  common: "Usuário comum",
};

export const USER_PROFILE_OPTIONS: ReadonlyArray<{
  value: UserProfile;
  label: string;
}> = [
  { value: "beginner", label: USER_PROFILE_LABELS.beginner },
  { value: "experienced", label: USER_PROFILE_LABELS.experienced },
  { value: "common", label: USER_PROFILE_LABELS.common },
];

/** What the user provides: the raw idea plus the chosen task type. */
export interface SddInput {
  /** The vague idea the user typed. */
  idea: string;
  /** The selected task type. */
  taskType: TaskType;
}

/** Local generator input. The profile is optional for backwards compatibility. */
export interface LocalSddInput extends SddInput {
  /** The selected audience profile for local prompt generation. */
  userProfile?: UserProfile;
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

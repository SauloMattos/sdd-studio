export type LocalRecipeId =
  | "auth"
  | "ecommerce"
  | "dashboard"
  | "api"
  | "tests"
  | "refactor"
  | "documentation"
  | "mvp";

export interface MicroTask {
  title: string;
  objective: string;
  scope: string;
  outOfScope: string;
  acceptanceCriteria: string[];
}

export interface LocalRecipe {
  id: LocalRecipeId;
  label: string;
  summaryFocus: string;
  goals: string[];
  nonGoals: string[];
  microTasks: MicroTask[];
  acceptanceCriteria: string[];
  implementationPlan: string[];
  testChecklist: string[];
  risksAndEdgeCases: string[];
}

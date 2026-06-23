export type SddScopeClassification = "Small" | "Medium" | "Large";

export type SddQualityLevel = "Low" | "Medium" | "High";

export interface SddSpecQualityEvaluation {
  score: number;
  scope: SddScopeClassification;
  tokenEfficiency: SddQualityLevel;
  clarity: SddQualityLevel;
  validationReadiness: SddQualityLevel;
  suggestions: string[];
}

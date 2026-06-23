export type IdeaQualityLevel = "Low" | "Medium" | "High";

export interface IdeaQualityEvaluation {
  score: number;
  clarity: IdeaQualityLevel;
  technicalContext: IdeaQualityLevel;
  testability: IdeaQualityLevel;
  missingInformation: string[];
  suggestions: string[];
}

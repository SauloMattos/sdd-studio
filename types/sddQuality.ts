export type SddSpecQualityStatus =
  | "boa"
  | "precisa-de-refinamento"
  | "muito-vaga";

export interface SddSpecQualityEvaluation {
  score: number;
  status: SddSpecQualityStatus;
  strengths: string[];
  suggestions: string[];
}

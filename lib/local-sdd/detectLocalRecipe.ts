import type { SddInput } from "@/types/sdd";
import {
  LOCAL_RECIPE_IDS,
  LOCAL_RECIPES,
  RECIPE_KEYWORDS,
} from "@/lib/local-sdd/localSddRecipes";
import type { LocalRecipe, LocalRecipeId } from "@/lib/local-sdd/localSddTypes";
import { normalizeForSearch } from "@/lib/local-sdd/localSddText";

function countMatches(text: string, keywords: string[]): number {
  return keywords.filter((keyword) => text.includes(keyword)).length;
}

export function detectLocalRecipe(input: SddInput, idea: string): LocalRecipe {
  const normalizedIdea = normalizeForSearch(idea);

  if (input.taskType === "test") {
    return LOCAL_RECIPES.tests;
  }

  if (input.taskType === "refactor") {
    return LOCAL_RECIPES.refactor;
  }

  if (input.taskType === "documentation") {
    return LOCAL_RECIPES.documentation;
  }

  const recipeScores: Array<{ id: LocalRecipeId; score: number }> =
    LOCAL_RECIPE_IDS.map((id) => ({
      id,
      score: countMatches(normalizedIdea, RECIPE_KEYWORDS[id]),
    }));
  const bestRecipe = recipeScores.sort((a, b) => b.score - a.score)[0];

  if (bestRecipe && bestRecipe.score > 0) {
    return LOCAL_RECIPES[bestRecipe.id];
  }

  return LOCAL_RECIPES.mvp;
}

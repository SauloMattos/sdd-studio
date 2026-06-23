export function normalizeIdeaText(idea: string): string {
  return idea.trim().replace(/\s+/g, " ");
}

export function normalizeForSearch(text: string): string {
  return normalizeIdeaText(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

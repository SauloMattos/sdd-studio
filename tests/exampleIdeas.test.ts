import { describe, expect, it } from "vitest";
import { EXAMPLE_IDEAS } from "../lib/exampleIdeas";
import type { UserProfile } from "../types/sdd";

describe("exampleIdeas", () => {
  it("includes examples for every user profile", () => {
    const profiles = new Set(EXAMPLE_IDEAS.map((example) => example.userProfile));
    const expectedProfiles: UserProfile[] = ["beginner", "experienced", "common"];

    expect(profiles).toEqual(new Set(expectedProfiles));
  });

  it("provides title, idea, task type, and recommended profile for each example", () => {
    for (const example of EXAMPLE_IDEAS) {
      expect(example.title.trim().length).toBeGreaterThan(0);
      expect(example.idea.trim().length).toBeGreaterThan(0);
      expect(example.taskType).toMatch(
        /^(feature|bugfix|refactor|test|documentation)$/,
      );
      expect(example.userProfile).toMatch(/^(beginner|experienced|common)$/);
    }
  });
});

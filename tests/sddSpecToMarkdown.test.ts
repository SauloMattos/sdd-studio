import { describe, expect, it } from "vitest";
import { generateMockSddSpec } from "../lib/generateMockSddSpec";
import { sddSpecToMarkdown } from "../lib/sddSpecToMarkdown";

describe("sddSpecToMarkdown", () => {
  it("exports the main SDD spec sections", () => {
    const spec = generateMockSddSpec({
      idea: "Create a dashboard filter for operators",
      taskType: "feature",
    });
    const markdown = sddSpecToMarkdown(spec);

    expect(markdown).toContain(`# ${spec.title}`);
    expect(markdown).toContain("**Task type:** feature");
    expect(markdown).toContain("## Summary");
    expect(markdown).toContain("## Goals");
    expect(markdown).toContain("## Non-goals");
    expect(markdown).toContain("## Acceptance Criteria");
    expect(markdown).toContain("## Implementation Plan");
    expect(markdown).toContain("## Suggested Agent Prompts");
    expect(markdown).toContain("## Test Checklist");
    expect(markdown).toContain("## Risks and Edge Cases");
  });

  it("formats acceptance criteria with stable ids", () => {
    const spec = generateMockSddSpec({
      idea: "Create a dashboard filter for operators",
      taskType: "feature",
    });
    const markdown = sddSpecToMarkdown(spec);

    expect(markdown).toContain("- **AC-1:**");
    expect(markdown).toContain("- **AC-2:**");
    expect(markdown).toContain("- **AC-3:**");
  });
});

import { describe, expect, it } from "vitest";
import {
  normalizeSddFormDraft,
  parseSddFormDraft,
  sddFormDraftToJson,
} from "../lib/sddFormDraft";

describe("sddFormDraft", () => {
  it("serializes only the local form draft fields", () => {
    const json = sddFormDraftToJson({
      idea: "Criar uma tela de login",
      taskType: "feature",
      userProfile: "beginner",
    });

    expect(JSON.parse(json)).toEqual({
      idea: "Criar uma tela de login",
      taskType: "feature",
      userProfile: "beginner",
    });
  });

  it("parses a valid draft", () => {
    const draft = parseSddFormDraft(
      JSON.stringify({
        idea: "Refatorar componente",
        taskType: "refactor",
        userProfile: "experienced",
      }),
    );

    expect(draft).toEqual({
      idea: "Refatorar componente",
      taskType: "refactor",
      userProfile: "experienced",
    });
  });

  it("falls back to beginner profile for older drafts", () => {
    const draft = normalizeSddFormDraft({
      idea: "Criar testes",
      taskType: "test",
    });

    expect(draft).toEqual({
      idea: "Criar testes",
      taskType: "test",
      userProfile: "beginner",
    });
  });

  it("rejects invalid JSON and invalid draft shape", () => {
    expect(parseSddFormDraft("{invalid")).toBeNull();
    expect(parseSddFormDraft(null)).toBeNull();
    expect(
      normalizeSddFormDraft({
        idea: "Criar checkout",
        taskType: "invalid",
        userProfile: "common",
      }),
    ).toBeNull();
  });
});

import {
  DEFAULT_USER_PROFILE,
  type LocalSddInput,
  type TaskType,
  type UserProfile,
} from "@/types/sdd";

export const SDD_FORM_DRAFT_STORAGE_KEY = "sdd-studio:draft";

const TASK_TYPES: ReadonlySet<TaskType> = new Set([
  "feature",
  "bugfix",
  "refactor",
  "test",
  "documentation",
]);

const USER_PROFILES: ReadonlySet<UserProfile> = new Set([
  "beginner",
  "experienced",
  "common",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isTaskType(value: unknown): value is TaskType {
  return typeof value === "string" && TASK_TYPES.has(value as TaskType);
}

function isUserProfile(value: unknown): value is UserProfile {
  return (
    typeof value === "string" && USER_PROFILES.has(value as UserProfile)
  );
}

export function normalizeSddFormDraft(value: unknown): LocalSddInput | null {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.idea !== "string" || !isTaskType(value.taskType)) {
    return null;
  }

  return {
    idea: value.idea,
    taskType: value.taskType,
    userProfile: isUserProfile(value.userProfile)
      ? value.userProfile
      : DEFAULT_USER_PROFILE,
  };
}

export function parseSddFormDraft(rawDraft: string | null): LocalSddInput | null {
  if (!rawDraft) {
    return null;
  }

  try {
    return normalizeSddFormDraft(JSON.parse(rawDraft));
  } catch {
    return null;
  }
}

export function sddFormDraftToJson(input: LocalSddInput): string {
  return JSON.stringify({
    idea: input.idea,
    taskType: input.taskType,
    userProfile: input.userProfile ?? DEFAULT_USER_PROFILE,
  });
}

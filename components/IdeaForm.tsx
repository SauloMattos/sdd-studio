"use client";

import { useState } from "react";
import {
  TASK_TYPE_OPTIONS,
  type SddInput,
  type SddSpec,
  type TaskType,
} from "@/types/sdd";
import { IdeaQualityPanel } from "@/components/IdeaQualityPanel";
import { SpecPreview } from "@/components/SpecPreview";
import {
  evaluateIdeaInput,
  shouldEvaluateIdeaInput,
} from "@/lib/evaluateIdeaInput";
import { generateMockSddSpec } from "@/lib/generateMockSddSpec";

const INITIAL_INPUT: SddInput = {
  idea: "",
  taskType: "feature",
};

export function IdeaForm() {
  const [input, setInput] = useState<SddInput>(INITIAL_INPUT);
  const [spec, setSpec] = useState<SddSpec | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSpec(generateMockSddSpec(input));
  };

  const isDisabled = input.idea.trim().length === 0;
  const ideaEvaluation = shouldEvaluateIdeaInput(input.idea)
    ? evaluateIdeaInput(input.idea)
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label htmlFor="idea" className="block text-sm font-medium">
          Your idea
        </label>
        <textarea
          id="idea"
          name="idea"
          rows={6}
          value={input.idea}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, idea: e.target.value }))
          }
          placeholder="Describe the software idea you have in mind..."
          className="w-full resize-y rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
        />
        {ideaEvaluation ? (
          <IdeaQualityPanel evaluation={ideaEvaluation} />
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="taskType" className="block text-sm font-medium">
          Task type
        </label>
        <select
          id="taskType"
          name="taskType"
          value={input.taskType}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              taskType: e.target.value as TaskType,
            }))
          }
          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm outline-none focus:border-neutral-500"
        >
          {TASK_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Generate SDD Spec
      </button>

      <SpecPreview spec={spec} />
    </form>
  );
}

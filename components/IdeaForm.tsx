"use client";

import { useState } from "react";
import {
  DEFAULT_USER_PROFILE,
  TASK_TYPE_OPTIONS,
  USER_PROFILE_OPTIONS,
  type LocalSddInput,
  type SddInput,
  type SddSpec,
  type TaskType,
  type UserProfile,
} from "@/types/sdd";
import { ExampleIdeas } from "@/components/ExampleIdeas";
import { IdeaQualityPanel } from "@/components/IdeaQualityPanel";
import { SpecPreview } from "@/components/SpecPreview";
import {
  evaluateIdeaInput,
  shouldEvaluateIdeaInput,
} from "@/lib/evaluateIdeaInput";
import { EXAMPLE_IDEAS, type ExampleIdea } from "@/lib/exampleIdeas";
import { generateMockSddSpec } from "@/lib/generateMockSddSpec";
import { requestAiSddSpec } from "@/lib/requestAiSddSpec";

type GenerationMode = "local" | "ai";

const INITIAL_INPUT: SddInput = {
  idea: "",
  taskType: "feature",
};

const INITIAL_LOCAL_INPUT: LocalSddInput = {
  ...INITIAL_INPUT,
  userProfile: DEFAULT_USER_PROFILE,
};

const GENERATION_MODE_OPTIONS: ReadonlyArray<{
  value: GenerationMode;
  label: string;
}> = [
  { value: "local", label: "Local — recomendado" },
  { value: "ai", label: "IA — experimental" },
];

export function IdeaForm() {
  const [input, setInput] = useState<LocalSddInput>(INITIAL_LOCAL_INPUT);
  const [spec, setSpec] = useState<SddSpec | null>(null);
  const [generationMode, setGenerationMode] =
    useState<GenerationMode>("local");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isGenerating) {
      return;
    }

    setGenerationError(null);

    if (generationMode === "local") {
      setSpec(generateMockSddSpec(input));
      return;
    }

    setIsGenerating(true);

    try {
      const aiInput: SddInput = {
        idea: input.idea,
        taskType: input.taskType,
      };
      const aiSpec = await requestAiSddSpec(aiInput);
      setSpec(aiSpec);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível gerar a Spec SDD com IA. Tente novamente ou use o modo local.";
      setGenerationError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleSelect = (example: ExampleIdea) => {
    setInput((prev) => ({
      ...prev,
      idea: example.idea,
      taskType: example.taskType,
      userProfile: example.userProfile,
    }));
    setSpec(null);
    setGenerationError(null);
  };

  const isDisabled = input.idea.trim().length === 0 || isGenerating;
  const ideaEvaluation = shouldEvaluateIdeaInput(input.idea)
    ? evaluateIdeaInput(input.idea)
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label htmlFor="idea" className="block text-sm font-medium">
          Sua ideia
        </label>
        <textarea
          id="idea"
          name="idea"
          rows={6}
          value={input.idea}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, idea: e.target.value }))
          }
          placeholder="Descreva a ideia de software que você tem em mente..."
          className="w-full resize-y rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm outline-none placeholder:text-neutral-600 focus:border-neutral-500"
        />
        {ideaEvaluation ? (
          <IdeaQualityPanel evaluation={ideaEvaluation} />
        ) : null}
      </div>

      <ExampleIdeas
        examples={EXAMPLE_IDEAS}
        onSelect={handleExampleSelect}
      />

      <div className="space-y-2">
        <label htmlFor="taskType" className="block text-sm font-medium">
          Tipo de tarefa
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

      <div className="space-y-2">
        <label htmlFor="userProfile" className="block text-sm font-medium">
          Perfil
        </label>
        <select
          id="userProfile"
          name="userProfile"
          value={input.userProfile ?? DEFAULT_USER_PROFILE}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              userProfile: e.target.value as UserProfile,
            }))
          }
          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 p-3 text-sm outline-none focus:border-neutral-500"
        >
          {USER_PROFILE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="text-sm leading-6 text-neutral-500">
          Usado no modo Local para ajustar o tom e o nível de detalhe dos
          prompts.
        </p>
      </div>

      <fieldset className="space-y-2">
        <legend className="block text-sm font-medium">Modo de geração</legend>
        <p className="text-sm leading-6 text-neutral-500">
          O SDD Studio não precisa chamar uma IA por você. Ele prepara prompts
          melhores para a IA que você já usa.
        </p>
        <div className="grid gap-1 rounded-lg border border-neutral-800 bg-neutral-900 p-1 sm:grid-cols-2">
          {GENERATION_MODE_OPTIONS.map((option) => {
            const isSelected = generationMode === option.value;

            return (
              <label
                key={option.value}
                className={`cursor-pointer rounded-md px-3 py-2 text-center text-sm font-semibold transition ${
                  isSelected
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-100"
                }`}
              >
                <input
                  type="radio"
                  name="generationMode"
                  value={option.value}
                  checked={isSelected}
                  onChange={() => {
                    setGenerationMode(option.value);
                    setGenerationError(null);
                  }}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>
        <div className="space-y-1 text-sm leading-6 text-neutral-500">
          <p>
            <strong className="font-semibold text-neutral-300">Local:</strong>{" "}
            gratuito, sem API key e ideal para copiar prompts e usar em
            qualquer IA.
          </p>
          <p>
            <strong className="font-semibold text-neutral-300">IA:</strong>{" "}
            recurso avançado que requer OPENAI_API_KEY configurada no servidor.
            Não é necessário para usar a demo pública.
          </p>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isDisabled}
        className="rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isGenerating ? "Gerando com IA..." : "Gerar Spec SDD"}
      </button>

      {isGenerating ? (
        <p role="status" className="text-sm text-neutral-400">
          Gerando com IA...
        </p>
      ) : null}

      {generationError ? (
        <p
          role="alert"
          className="rounded-md border border-red-900/60 bg-red-950/30 p-3 text-sm leading-6 text-red-200"
        >
          {generationError}
        </p>
      ) : null}

      <SpecPreview spec={spec} />
    </form>
  );
}

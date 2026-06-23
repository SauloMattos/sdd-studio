import type { IdeaQualityEvaluation } from "@/types/ideaQuality";

interface IdeaQualityPanelProps {
  evaluation: IdeaQualityEvaluation;
}

interface IdeaQualityMetricProps {
  label: string;
  value: string;
}

function IdeaQualityMetric({ label, value }: IdeaQualityMetricProps) {
  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-950/30 p-3">
      <dt className="text-xs font-medium text-neutral-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-neutral-100">{value}</dd>
    </div>
  );
}

export function IdeaQualityPanel({ evaluation }: IdeaQualityPanelProps) {
  return (
    <aside
      aria-label="Idea quality evaluation"
      className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-100">
            Idea Quality
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            Local pre-flight check before generating a spec.
          </p>
        </div>
        <div className="rounded-md border border-neutral-700 px-4 py-2 text-center">
          <div className="text-2xl font-bold text-neutral-100">
            {evaluation.score}
          </div>
          <div className="text-xs font-medium text-neutral-500">/ 100</div>
        </div>
      </div>

      <dl className="grid gap-3 sm:grid-cols-3">
        <IdeaQualityMetric label="Clarity" value={evaluation.clarity} />
        <IdeaQualityMetric
          label="Technical Context"
          value={evaluation.technicalContext}
        />
        <IdeaQualityMetric label="Testability" value={evaluation.testability} />
      </dl>

      {evaluation.missingInformation.length > 0 ? (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-neutral-100">
            Missing Information
          </h4>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-300">
            {evaluation.missingInformation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-neutral-100">Suggestions</h4>
        {evaluation.suggestions.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-300">
            {evaluation.suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-6 text-neutral-300">
            The idea has enough detail for a first local spec draft.
          </p>
        )}
      </div>
    </aside>
  );
}

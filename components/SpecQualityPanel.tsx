import type { SddSpecQualityEvaluation } from "@/types/sddQuality";

interface SpecQualityPanelProps {
  evaluation: SddSpecQualityEvaluation;
}

interface QualityMetricProps {
  label: string;
  value: string;
}

function QualityMetric({ label, value }: QualityMetricProps) {
  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-950/40 p-3">
      <dt className="text-xs font-medium text-neutral-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-neutral-100">{value}</dd>
    </div>
  );
}

export function SpecQualityPanel({ evaluation }: SpecQualityPanelProps) {
  return (
    <aside
      aria-label="Spec quality evaluation"
      className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-950/50 p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-100">
            Quality Evaluation
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            Local deterministic heuristics for agent readiness.
          </p>
        </div>
        <div className="rounded-md border border-neutral-700 px-4 py-2 text-center">
          <div className="text-2xl font-bold text-neutral-100">
            {evaluation.score}
          </div>
          <div className="text-xs font-medium text-neutral-500">/ 100</div>
        </div>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2">
        <QualityMetric label="Scope" value={evaluation.scope} />
        <QualityMetric
          label="Token Efficiency"
          value={evaluation.tokenEfficiency}
        />
        <QualityMetric label="Clarity" value={evaluation.clarity} />
        <QualityMetric
          label="Validation Readiness"
          value={evaluation.validationReadiness}
        />
      </dl>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-neutral-100">
          Suggestions
        </h4>
        {evaluation.suggestions.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-300">
            {evaluation.suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-6 text-neutral-300">
            No immediate improvements suggested by the local heuristic.
          </p>
        )}
      </div>
    </aside>
  );
}

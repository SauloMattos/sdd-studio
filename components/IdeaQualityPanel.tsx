import type {
  IdeaQualityEvaluation,
  IdeaQualityLevel,
} from "@/types/ideaQuality";

const IDEA_QUALITY_LEVEL_LABELS: Record<IdeaQualityLevel, string> = {
  Low: "Baixa",
  Medium: "Média",
  High: "Alta",
};

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
      aria-label="Avaliação de qualidade da ideia"
      className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-100">
            Qualidade da ideia
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            Verificação local antes de gerar uma spec.
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
        <IdeaQualityMetric
          label="Clareza"
          value={IDEA_QUALITY_LEVEL_LABELS[evaluation.clarity]}
        />
        <IdeaQualityMetric
          label="Contexto técnico"
          value={IDEA_QUALITY_LEVEL_LABELS[evaluation.technicalContext]}
        />
        <IdeaQualityMetric
          label="Testabilidade"
          value={IDEA_QUALITY_LEVEL_LABELS[evaluation.testability]}
        />
      </dl>

      {evaluation.missingInformation.length > 0 ? (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-neutral-100">
            Informações ausentes
          </h4>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-300">
            {evaluation.missingInformation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-neutral-100">Sugestões</h4>
        {evaluation.suggestions.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-300">
            {evaluation.suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-6 text-neutral-300">
            A ideia tem detalhes suficientes para um primeiro rascunho local de
            spec.
          </p>
        )}
      </div>
    </aside>
  );
}

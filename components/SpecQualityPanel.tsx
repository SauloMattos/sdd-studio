import type {
  SddSpecQualityEvaluation,
  SddSpecQualityStatus,
} from "@/types/sddQuality";

const STATUS_LABELS: Record<SddSpecQualityStatus, string> = {
  boa: "Boa",
  "precisa-de-refinamento": "Precisa de refinamento",
  "muito-vaga": "Muito vaga",
};

interface SpecQualityPanelProps {
  evaluation: SddSpecQualityEvaluation;
}

export function SpecQualityPanel({ evaluation }: SpecQualityPanelProps) {
  return (
    <aside
      aria-label="Avaliação de qualidade da spec"
      className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-950/50 p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-100">
            Qualidade da spec
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            Avaliação local baseada em clareza, escopo, teste e contexto.
          </p>
        </div>
        <div className="rounded-md border border-neutral-700 px-4 py-2 text-center">
          <div className="text-2xl font-bold text-neutral-100">
            {evaluation.score}
          </div>
          <div className="text-xs font-medium text-neutral-500">
            / 100 · {STATUS_LABELS[evaluation.status]}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-neutral-100">
            Pontos fortes
          </h4>
          {evaluation.strengths.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-300">
              {evaluation.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-6 text-neutral-300">
              Ainda não há sinais fortes suficientes na spec.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-neutral-100">
            Sugestões
          </h4>
          {evaluation.suggestions.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-300">
              {evaluation.suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-6 text-neutral-300">
              Nenhuma melhoria imediata sugerida pela heurística local.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

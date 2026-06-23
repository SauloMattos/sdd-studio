import { CopyButton } from "@/components/CopyButton";
import { SpecQualityPanel } from "@/components/SpecQualityPanel";
import { evaluateSddSpec } from "@/lib/evaluateSddSpec";
import { sddSpecToMarkdown } from "@/lib/sddSpecToMarkdown";
import { TASK_TYPE_LABELS, type SddSpec } from "@/types/sdd";

interface SpecPreviewProps {
  spec: SddSpec | null;
}

interface SpecSectionProps {
  title: string;
  items?: string[];
  children?: React.ReactNode;
}

function SpecSection({ title, items, children }: SpecSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-neutral-100">{title}</h3>
      {children}
      {items ? (
        <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-neutral-300">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function SpecPreview({ spec }: SpecPreviewProps) {
  const markdown = spec ? sddSpecToMarkdown(spec) : "";
  const evaluation = spec ? evaluateSddSpec(spec) : null;

  return (
    <section
      aria-label="Prévia da spec"
      className="min-h-[12rem] rounded-lg border border-dashed border-neutral-800 bg-neutral-900/40 p-6"
    >
      {spec ? (
        <article className="space-y-6">
          <header className="flex flex-col gap-4 border-b border-neutral-800 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase text-neutral-500">
                {TASK_TYPE_LABELS[spec.taskType]}
              </p>
              <h2 className="text-xl font-semibold text-neutral-100">
                {spec.title}
              </h2>
            </div>
            <CopyButton
              text={markdown}
              label="Copiar Markdown"
              className="w-full min-w-[8.5rem] sm:w-auto"
            />
          </header>

          {evaluation ? <SpecQualityPanel evaluation={evaluation} /> : null}

          <SpecSection title="Resumo">
            <p className="text-sm leading-6 text-neutral-300">
              {spec.summary}
            </p>
          </SpecSection>

          <SpecSection title="Objetivos" items={spec.goals} />
          <SpecSection title="Fora de escopo" items={spec.nonGoals} />

          <SpecSection title="Critérios de aceite">
            <ol className="space-y-2 text-sm leading-6 text-neutral-300">
              {spec.acceptanceCriteria.map((criterion) => (
                <li key={criterion.id} className="grid gap-1 sm:grid-cols-[4rem_1fr]">
                  <span className="font-mono text-xs font-semibold text-neutral-500">
                    {criterion.id}
                  </span>
                  <span>{criterion.description}</span>
                </li>
              ))}
            </ol>
          </SpecSection>

          <SpecSection
            title="Plano de implementação"
            items={spec.implementationPlan}
          />
          <SpecSection title="Prompts sugeridos para agente">
            <ol className="space-y-3 text-sm leading-6 text-neutral-300">
              {spec.suggestedAgentPrompts.map((prompt, index) => (
                <li
                  key={prompt}
                  className="grid gap-2 rounded-md border border-neutral-800 bg-neutral-950/40 p-3 sm:grid-cols-[1fr_auto] sm:items-start"
                >
                  <p>
                    <span className="mr-2 font-mono text-xs font-semibold text-neutral-500">
                      {index + 1}.
                    </span>
                    {prompt}
                  </p>
                  <CopyButton
                    text={prompt}
                    label="Copiar prompt"
                    className="w-full min-w-[6.75rem] sm:w-auto"
                  />
                </li>
              ))}
            </ol>
          </SpecSection>
          <SpecSection title="Checklist de testes" items={spec.testChecklist} />
          <SpecSection
            title="Riscos e casos de borda"
            items={spec.risksAndEdgeCases}
          />
        </article>
      ) : (
        <div className="flex h-full min-h-[9rem] items-center justify-center text-center text-sm text-neutral-500">
          Sua Spec SDD gerada aparecerá aqui.
        </div>
      )}
    </section>
  );
}

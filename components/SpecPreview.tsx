import type { SddSpec } from "@/types/sdd";

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
  return (
    <section
      aria-label="Spec preview"
      className="min-h-[12rem] rounded-lg border border-dashed border-neutral-800 bg-neutral-900/40 p-6"
    >
      {spec ? (
        <article className="space-y-6">
          <header className="space-y-2 border-b border-neutral-800 pb-4">
            <p className="text-xs font-medium uppercase text-neutral-500">
              {spec.taskType}
            </p>
            <h2 className="text-xl font-semibold text-neutral-100">
              {spec.title}
            </h2>
          </header>

          <SpecSection title="Summary">
            <p className="text-sm leading-6 text-neutral-300">
              {spec.summary}
            </p>
          </SpecSection>

          <SpecSection title="Goals" items={spec.goals} />
          <SpecSection title="Non-goals" items={spec.nonGoals} />

          <SpecSection title="Acceptance Criteria">
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
            title="Implementation Plan"
            items={spec.implementationPlan}
          />
          <SpecSection
            title="Suggested Agent Prompts"
            items={spec.suggestedAgentPrompts}
          />
          <SpecSection title="Test Checklist" items={spec.testChecklist} />
          <SpecSection
            title="Risks and Edge Cases"
            items={spec.risksAndEdgeCases}
          />
        </article>
      ) : (
        <div className="flex h-full min-h-[9rem] items-center justify-center text-center text-sm text-neutral-500">
          Your generated SDD spec will appear here.
        </div>
      )}
    </section>
  );
}

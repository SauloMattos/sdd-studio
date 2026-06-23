import type { ExampleIdea } from "@/lib/exampleIdeas";
import { TASK_TYPE_LABELS } from "@/types/sdd";

interface ExampleIdeasProps {
  examples: ReadonlyArray<ExampleIdea>;
  onSelect: (example: ExampleIdea) => void;
}

export function ExampleIdeas({ examples, onSelect }: ExampleIdeasProps) {
  return (
    <section aria-labelledby="example-ideas-heading" className="space-y-3">
      <div className="space-y-1">
        <h2
          id="example-ideas-heading"
          className="text-sm font-semibold text-neutral-100"
        >
          Teste um exemplo
        </h2>
        <p className="text-sm text-neutral-500">
          Carregue uma ideia inicial realista e gere a spec quando estiver
          pronto.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {examples.map((example) => (
          <button
            key={example.title}
            type="button"
            onClick={() => onSelect(example)}
            className="rounded-md border border-neutral-800 bg-neutral-900/60 p-3 text-left transition hover:border-neutral-600 hover:bg-neutral-900 focus:border-neutral-500 focus:outline-none"
          >
            <span className="block text-sm font-semibold text-neutral-100">
              {example.title}
            </span>
            <span className="mt-1 block text-xs font-medium uppercase text-neutral-500">
              {TASK_TYPE_LABELS[example.taskType]}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

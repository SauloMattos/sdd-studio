import type { SddSpec } from "@/types/sdd";

interface SpecPreviewProps {
  spec: SddSpec | null;
}

/**
 * Renders the generated spec. In this first step generation is not wired up,
 * so `spec` is always null and we show an empty placeholder state.
 */
export function SpecPreview({ spec }: SpecPreviewProps) {
  return (
    <section
      aria-label="Spec preview"
      className="min-h-[12rem] rounded-lg border border-dashed border-neutral-800 bg-neutral-900/40 p-6"
    >
      {spec ? (
        <pre className="whitespace-pre-wrap text-sm text-neutral-200">
          {JSON.stringify(spec, null, 2)}
        </pre>
      ) : (
        <div className="flex h-full min-h-[9rem] items-center justify-center text-center text-sm text-neutral-500">
          Your generated SDD spec will appear here.
        </div>
      )}
    </section>
  );
}

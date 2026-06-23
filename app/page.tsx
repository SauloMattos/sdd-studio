import { IdeaForm } from "@/components/IdeaForm";

const HOW_TO_USE_STEPS = [
  "Descreva sua ideia do jeito que conseguir.",
  "Escolha seu perfil para ajustar o nível de detalhe.",
  "Gere a Spec SDD no modo local, sem API key.",
  "Copie um prompt por vez ou use o pacote para ChatGPT/Claude.",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">SDD Studio</h1>
        <p className="text-lg text-neutral-400">
          Transforme ideias vagas em prompts SDD prontos para usar em qualquer
          IA.
        </p>
        <p className="text-sm leading-6 text-neutral-500">
          Use o modo local para estruturar sua ideia, copiar os prompts e colar
          no ChatGPT, Claude, Cursor, Codex ou Claude Code.
        </p>
        <p className="text-sm leading-6 text-neutral-500">
          Projeto open source para estudar, usar e contribuir.{" "}
          <a
            href="https://github.com/SauloMattos/sdd-studio"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-neutral-200 underline underline-offset-4 transition hover:text-white"
          >
            Ver no GitHub
          </a>
          .
        </p>
      </header>

      <section
        aria-labelledby="how-to-use-heading"
        className="space-y-3 border-l border-neutral-700 pl-4"
      >
        <h2
          id="how-to-use-heading"
          className="text-sm font-semibold text-neutral-100"
        >
          Como usar
        </h2>
        <ol className="grid gap-2 text-sm leading-6 text-neutral-400 sm:grid-cols-2">
          {HOW_TO_USE_STEPS.map((step, index) => (
            <li key={step} className="flex gap-2">
              <span className="font-mono text-xs font-semibold text-neutral-500">
                {index + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <IdeaForm />
    </main>
  );
}

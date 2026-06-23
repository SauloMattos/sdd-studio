import { IdeaForm } from "@/components/IdeaForm";

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
      </header>

      <IdeaForm />
    </main>
  );
}

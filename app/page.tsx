import { IdeaForm } from "@/components/IdeaForm";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">SDD Studio</h1>
        <p className="text-lg text-neutral-400">
          Transforme ideias vagas em specs pequenas, testáveis e prontas para
          agentes de código com IA.
        </p>
      </header>

      <IdeaForm />
    </main>
  );
}

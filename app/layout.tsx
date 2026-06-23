import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SDD Studio",
  description:
    "Transforme ideias vagas em specs pequenas, testáveis e prontas para agentes de código com IA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}

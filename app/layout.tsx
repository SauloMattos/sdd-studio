import type { Metadata } from "next";
import "./globals.css";

const title = "SDD Studio — Prompts melhores para desenvolver com IA";
const description =
  "Transforme ideias vagas em specs SDD e prompts pequenos, sequenciais e prontos para usar no ChatGPT, Claude, Cursor ou Codex.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "SDD Studio",
  keywords: [
    "SDD",
    "prompts",
    "IA",
    "desenvolvimento",
    "local-first",
    "ChatGPT",
    "Claude",
    "Cursor",
    "Codex",
    "Spec-Driven Development",
  ],
  openGraph: {
    title,
    description,
    siteName: "SDD Studio",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
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

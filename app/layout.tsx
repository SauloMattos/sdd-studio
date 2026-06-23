import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SDD Studio",
  description:
    "Transform vague ideas into small, testable specs for AI coding agents.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}

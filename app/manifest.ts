import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SDD Studio",
    short_name: "SDD Studio",
    description:
      "Transforme ideias vagas em specs SDD e prompts pequenos, sequenciais e prontos para usar em qualquer IA.",
    lang: "pt-BR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
  };
}

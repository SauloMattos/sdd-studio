# SDD Studio

SDD Studio é uma ferramenta open source local-first para transformar ideias vagas de software em prompts SDD pequenos, claros, testáveis e econômicos em tokens.

A tese do produto é simples: antes de pedir código a uma IA, vale preparar melhor o pedido. O SDD Studio ajuda você a estruturar a ideia, copiar o prompt e colar na IA que já usa, como ChatGPT, Claude, Cursor, Codex ou Claude Code.

O fluxo principal funciona sem login, sem banco, sem billing e sem `OPENAI_API_KEY`. A integração direta com IA existe como recurso experimental para quem clonar o projeto e configurar a própria chave no servidor.

## Status atual

Este projeto ainda está em estágio inicial.

Funciona hoje:

- Digitar uma ideia inicial de software.
- Avaliar localmente a qualidade da ideia.
- Gerar uma Spec SDD localmente, sem API paga.
- Usar uma rota experimental de geração com IA quando `OPENAI_API_KEY` está configurada no servidor.
- Revisar a spec gerada em seções estruturadas.
- Avaliar localmente a qualidade da spec gerada.
- Copiar a spec completa como Markdown.
- Copiar prompts individuais sugeridos para agente.
- Rodar testes unitários para heurísticas, contrato de IA e conversão para Markdown.

Ainda não existe:

- Banco de dados.
- Autenticação.
- Persistência.
- Billing.
- Streaming.

O modo Local é o fluxo principal e recomendado. Ele é determinístico e continua funcionando mesmo quando a integração com IA não está configurada.

## Fluxo do produto

1. Escreva uma ideia bruta para uma tarefa de software.
2. Revise o painel local de qualidade da ideia.
3. Melhore a entrada se fizer sentido.
4. Gere uma Spec SDD no modo Local recomendado.
5. Revise as seções da spec:
   - Resumo
   - Objetivos
   - Fora de escopo
   - Critérios de aceite
   - Plano de implementação
   - Prompts sugeridos para agente
   - Checklist de testes
   - Riscos e casos de borda
6. Revise o painel local de qualidade da spec.
7. Copie a spec em Markdown ou prompts individuais para a IA que você já usa.

## Por que existe

Agentes de código com IA são mais úteis quando o trabalho está bem enquadrado:

- O objetivo é específico.
- O escopo é pequeno.
- Os critérios de aceite são testáveis.
- Os itens fora de escopo são explícitos.
- O prompt de handoff é conciso.

SDD Studio foca nessa camada de preparação. A integração com IA é opcional e BYOK, não a base do produto.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vitest
- npm

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

Run the TypeScript check:

```bash
npm run typecheck
```

Run unit tests:

```bash
npm run test
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the local Next.js development server. |
| `npm run build` | Builds the Next.js app for production. |
| `npm run start` | Starts the production server after a build. |
| `npm run lint` | Runs the configured Next.js lint command. |
| `npm run typecheck` | Runs TypeScript with `tsc --noEmit`. |
| `npm run test` | Runs unit tests with Vitest. |

## Variáveis de ambiente

Nenhuma variável de ambiente é necessária para usar o fluxo principal no modo Local.

A rota experimental `POST /api/generate-spec` exige `OPENAI_API_KEY` quando chamada no modo IA. Essa chave deve existir apenas no servidor. Nunca exponha `OPENAI_API_KEY` no client.

## Project Structure

```text
app/          Next.js app routes and global styles
components/   UI components for the local workflow
lib/          Pure domain functions and formatters
tests/        Unit tests for domain functions
types/        Shared TypeScript domain types
```

## Testing Scope

Current tests cover pure domain behavior and the backend AI route contract:

- Idea-quality evaluation heuristics.
- Mock SDD spec generation.
- Spec-quality evaluation heuristics.
- Markdown export formatting.
- AI prompt contract and response parsing.
- API route error handling without external calls.

React component tests and end-to-end tests are not part of the current test suite yet.

## Roadmap

See [ROADMAP.md](./ROADMAP.md).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT License. See [LICENSE](./LICENSE).

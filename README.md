# SDD Studio

SDD Studio é uma ferramenta open source local-first para transformar ideias vagas de software em prompts SDD pequenos, claros, testáveis e prontos para copiar em qualquer IA.

A tese do produto é simples: antes de pedir código a uma IA, vale preparar melhor o pedido. O SDD Studio ajuda você a estruturar a ideia, quebrar o trabalho em etapas menores e copiar prompts para ChatGPT, Claude, Cursor, Codex, Claude Code ou outra IA que você já usa.

O fluxo principal funciona sem login, sem banco, sem billing e sem `OPENAI_API_KEY`. A demo pública pode ser usada diretamente no modo Local.

## Para quem é

O SDD Studio foi pensado para três perfis:

- **Iniciante:** precisa de prompts mais didáticos, com contexto e orientação de validação.
- **Dev experiente:** quer prompts objetivos, técnicos e sem enrolação.
- **Usuário comum:** quer criar pequenos projetos com ajuda de IA, usando linguagem simples e menos jargão técnico.

O seletor de perfil ajusta o tom dos prompts gerados no modo Local.

## Status atual

Funciona hoje:

- Digitar uma ideia inicial de software.
- Escolher perfil: Iniciante, Dev experiente ou Usuário comum.
- Usar exemplos clicáveis organizados por perfil.
- Avaliar localmente a qualidade da ideia.
- Gerar uma Spec SDD localmente, sem API key.
- Revisar prompts sugeridos como etapas sequenciais.
- Avaliar localmente a qualidade da spec gerada.
- Copiar um prompt individual por vez.
- Copiar a spec completa em Markdown.
- Copiar um pacote pronto para colar no ChatGPT/Claude.
- Usar uma rota experimental de geração com IA quando `OPENAI_API_KEY` está configurada no servidor.
- Rodar testes unitários para heurísticas, contrato de IA, exports e rota backend.

Ainda não existe:

- Banco de dados.
- Autenticação.
- Persistência.
- Billing.
- Streaming.

O modo Local é o fluxo principal e recomendado. Ele é determinístico e continua funcionando mesmo quando a integração com IA não está configurada.

## Como usar

1. Descreva sua ideia do jeito que conseguir.
2. Escolha seu perfil para ajustar o nível de detalhe.
3. Gere a Spec SDD no modo Local.
4. Copie um prompt por vez ou copie o pacote para ChatGPT/Claude.

Os prompts devem ser usados em sequência. Comece pelo Prompt 1, valide o resultado e só depois avance para o próximo. Isso reduz escopo, retrabalho e gasto de tokens.

## Exemplos por perfil

Os exemplos clicáveis ajudam a entender rapidamente como escrever uma boa ideia inicial.

- **Iniciante:** exemplo de primeira tela de login em React.
- **Dev experiente:** exemplo de refatoração de componente React grande.
- **Usuário comum:** exemplo de app simples para controlar gastos do mês.

Ao clicar em um exemplo, o formulário preenche a ideia, o tipo de tarefa e o perfil recomendado. A spec não é gerada automaticamente; você ainda clica em `Gerar Spec SDD`.

## Formas de cópia

Depois de gerar a spec, você pode copiar a saída de três formas:

- **Prompt individual:** melhor para executar uma etapa pequena por vez.
- **Markdown completo:** útil para documentação, issues, PRs ou revisão técnica.
- **Pacote para ChatGPT/Claude:** texto pronto para colar em uma IA conversacional, com instruções para trabalhar em etapas e aguardar validação antes de avançar.

## Modo IA experimental

O modo IA integrado é experimental e BYOK. Ele só funciona para quem clonar o projeto e configurar `OPENAI_API_KEY` no servidor.

Esse modo não é necessário para usar a demo pública. O produto principal é local-first: o SDD Studio prepara prompts melhores para a IA que você já usa, sem precisar chamar uma IA por você.

## Por que existe

Agentes de código com IA são mais úteis quando o trabalho está bem enquadrado:

- O objetivo é específico.
- O escopo é pequeno.
- Os critérios de aceite são testáveis.
- Os itens fora de escopo são explícitos.
- O prompt de handoff é conciso.
- A execução acontece em etapas verificáveis.

SDD Studio foca nessa camada de preparação. A integração com IA é opcional, não a base do produto.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vitest
- npm

## Desenvolvimento local

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o app:

```text
http://localhost:3000
```

Rode a checagem TypeScript:

```bash
npm run typecheck
```

Rode os testes unitários:

```bash
npm run test
```

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor local do Next.js. |
| `npm run build` | Gera o build de produção. |
| `npm run start` | Inicia o servidor de produção após o build. |
| `npm run lint` | Roda o comando de lint configurado pelo Next.js. |
| `npm run typecheck` | Roda TypeScript com `tsc --noEmit`. |
| `npm run test` | Roda os testes unitários com Vitest. |
| `npm run ship -- "mensagem do commit"` | Executa `git add .`, `git commit -m` e `git push`. |

## Variáveis de ambiente

Nenhuma variável de ambiente é necessária para usar o fluxo principal no modo Local.

A rota experimental `POST /api/generate-spec` exige `OPENAI_API_KEY` quando chamada no modo IA. Essa chave deve existir apenas no servidor. Nunca exponha `OPENAI_API_KEY` no client.

## Estrutura do projeto

```text
app/          Rotas Next.js e estilos globais
components/   Componentes de UI do fluxo principal
lib/          Funções puras de domínio, geração local e formatadores
tests/        Testes unitários
types/        Tipos TypeScript compartilhados
```

## Escopo de testes

Os testes atuais cobrem comportamento de domínio e contrato backend:

- Heurísticas de avaliação da ideia.
- Geração local da Spec SDD.
- Perfis de usuário no gerador local.
- Exemplos clicáveis por perfil.
- Avaliação de qualidade da spec.
- Export em Markdown.
- Pacote para ChatGPT/Claude.
- Contrato de prompt e parsing de resposta de IA.
- Rota backend sem chamadas externas nos testes.

Testes de componentes React e testes end-to-end ainda não fazem parte da suíte atual.

## Roadmap

Veja [ROADMAP.md](./ROADMAP.md).

## Contribuindo

Veja [CONTRIBUTING.md](./CONTRIBUTING.md).

## Licença

MIT License. Veja [LICENSE](./LICENSE).

# SDD Studio

SDD Studio is an early-stage open source workflow tool for turning vague software ideas into small, testable, token-efficient specs for AI coding agents.

The core idea is simple: better preparation before using tools like ChatGPT, Codex, Claude Code, Cursor, or other coding agents should lead to clearer implementation work, smaller prompts, and more predictable reviews.

SDD Studio is not just a prompt generator. It is a local-first workflow builder for shaping the work before handing it to an agent.

## Current Status

This project is intentionally early-stage.

What works today:

- Type an initial software idea.
- Get a local deterministic quality evaluation for the idea.
- Generate a mock SDD spec locally.
- Review the generated spec in structured sections.
- Get a local deterministic quality evaluation for the generated spec.
- Copy the full spec as Markdown.
- Copy individual suggested agent prompts.
- Run unit tests for the domain heuristics and Markdown conversion.

What does not exist yet:

- No API routes.
- No database.
- No authentication.
- No persistence.
- No real AI provider integration.
- No calls to OpenAI, Anthropic, or any external model provider.

All current generation and evaluation logic runs locally and deterministically.

## Product Flow

1. Write a raw idea for a software task.
2. Review the local idea-quality panel.
3. Improve the input if useful.
4. Generate a mock SDD spec.
5. Review the spec sections:
   - Summary
   - Goals
   - Non-goals
   - Acceptance Criteria
   - Implementation Plan
   - Suggested Agent Prompts
   - Test Checklist
   - Risks and Edge Cases
6. Review the local spec-quality panel.
7. Copy the full Markdown spec or individual prompts into your coding-agent workflow.

## Why This Exists

AI coding agents are more useful when the work is framed clearly:

- The goal is specific.
- The scope is small.
- The acceptance criteria are testable.
- Non-goals are explicit.
- The handoff prompt is concise.

SDD Studio focuses on that preparation layer. The planned AI integration is an enhancement, not the foundation of the product.

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

## Environment Variables

No environment variables are required for the current local-only version.

An `.env.example` file is included so future integrations can document required keys without exposing secrets.

## Project Structure

```text
app/          Next.js app routes and global styles
components/   UI components for the local workflow
lib/          Pure domain functions and formatters
tests/        Unit tests for domain functions
types/        Shared TypeScript domain types
```

## Testing Scope

Current tests cover pure domain behavior:

- Idea-quality evaluation heuristics.
- Mock SDD spec generation.
- Spec-quality evaluation heuristics.
- Markdown export formatting.

React component tests and end-to-end tests are not part of the current test suite yet.

## Roadmap

See [ROADMAP.md](./ROADMAP.md).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT License. See [LICENSE](./LICENSE).

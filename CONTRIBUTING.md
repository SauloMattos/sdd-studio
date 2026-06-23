# Contributing

Thanks for your interest in SDD Studio.

This project is early-stage. Contributions are welcome when they keep the workflow focused: helping developers turn vague software ideas into small, testable, token-efficient specs for coding agents.

## Development Setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Run the main validation commands:

```bash
npm run typecheck
npm run test
```

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js app. |
| `npm run build` | Build the app for production. |
| `npm run start` | Start the production build. |
| `npm run lint` | Run the configured lint command. |
| `npm run typecheck` | Check TypeScript types. |
| `npm run test` | Run Vitest unit tests. |

## Current Architecture

The current app is local-first:

- No API routes.
- No database.
- No authentication.
- No external AI provider integration.
- Domain behavior is implemented through pure functions in `lib/`.
- Shared domain types live in `types/`.
- Unit tests live in `tests/`.

## Contribution Guidelines

Please keep changes small and easy to review.

Good first contribution areas:

- Improve deterministic heuristics.
- Add focused unit tests.
- Improve documentation.
- Refine Markdown formatting.
- Add examples that clarify the SDD workflow.

Please avoid in early contributions:

- Adding external provider integrations without a focused proposal.
- Adding a database or authentication layer.
- Replacing the local deterministic workflow with model-only behavior.
- Large UI redesigns without discussion.
- Broad refactors that are not needed for the issue being solved.

## Testing Expectations

For changes to domain logic, add or update unit tests.

Before opening a pull request, run:

```bash
npm run typecheck
npm run test
```

If your change affects rendered behavior, also run the app locally:

```bash
npm run dev
```

## Environment Variables

No environment variables are currently required.

Do not commit real secrets. Use `.env.example` only to document safe placeholder keys when future integrations need them.

## Pull Request Notes

When opening a pull request, include:

- What changed.
- Why the change is useful.
- How it was tested.
- Any known limitations or follow-up work.

Keep the project thesis in mind: SDD Studio is a workflow builder for better agent handoff, not just a prompt generator.

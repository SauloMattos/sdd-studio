# SDD Studio

SDD Studio is an open source Next.js app for turning vague software ideas into small, testable specs for AI coding agents.

This repository is intentionally early-stage. The current app contains the initial local UI shell and domain types only. Spec generation, API routes, database persistence, and AI integrations are not wired up yet.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run the TypeScript check:

```bash
npm run typecheck
```

## Project goals

- Keep specs small, concrete, and testable.
- Avoid token-heavy planning documents.
- Help AI coding agents receive clearer implementation targets.
- Preserve a simple local-first development workflow.

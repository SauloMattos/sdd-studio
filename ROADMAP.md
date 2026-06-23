# Roadmap

SDD Studio is early-stage. This roadmap is intentionally split into small phases so the project can evolve without overbuilding.

The order may change as the workflow becomes clearer.

## Phase 0: Local Workflow Foundation

Status: in progress

- Local idea input.
- Local deterministic idea-quality evaluation.
- Local mock SDD spec generation.
- Local deterministic spec-quality evaluation.
- Markdown copy for full specs.
- Copy buttons for individual suggested prompts.
- Unit tests for pure domain functions.
- Initial public documentation.

## Phase 1: Stronger Local SDD Model

Goal: make the local workflow more useful before adding any AI provider.

Planned improvements:

- Refine scoring heuristics for idea quality and spec quality.
- Make missing-information suggestions more actionable.
- Add more task-type-aware spec structure.
- Improve Markdown output for easier handoff to coding agents.
- Add more unit tests around edge cases and scoring boundaries.

## Phase 2: Better Handoff Workflows

Goal: make generated specs easier to use in real development workflows.

Possible improvements:

- Export presets for different coding-agent styles.
- Copy smaller prompt bundles by phase.
- Add lightweight examples of good input and output.
- Add a changelog-friendly project history.
- Add optional local templates for common task types.

## Phase 3: Optional AI Provider Integration

Goal: add real AI-assisted generation only after the local workflow is stable.

Important constraints:

- Provider integration should be explicit and optional.
- Secrets must stay server-side or local-only.
- The app should still work without external provider credentials.
- The local deterministic workflow should remain testable.

Possible providers may include OpenAI, Anthropic, or other tools, but no provider integration exists today.

## Phase 4: Persistence and Collaboration

Goal: explore durable workflows only when the product shape justifies them.

Possible improvements:

- Save local spec drafts.
- Compare versions of a spec.
- Share specs with collaborators.
- Add project-level organization.

These ideas are not implemented and should not be assumed as committed scope.

## Non-Goals for Now

- Do not add a database before the local workflow is proven.
- Do not add authentication before there is a clear multi-user need.
- Do not make provider integration required.
- Do not turn the app into a generic chat interface.
- Do not optimize for long planning documents over small, testable specs.

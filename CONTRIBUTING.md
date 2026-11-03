# Contributing to FitMatch Frontend

Thank you for contributing to the `fitmatch-frontend` repository.

## 1. Governance & Architectural Rules (ADR-003, ADR-005, ADR-010)
- **Design System Fidelity:** Maintain WCAG 2.2 AA accessibility, visible focus rings, $\ge 48\text{px}$ touch targets, and a 12px minimum font size floor.
- **Brand Voice Integrity:** Zero body-shaming or misleading guarantee microcopy in UI components.
- **Typed API Contracts:** Consume backend APIs exclusively through typed OpenAPI contracts or the typed client (`src/lib/api-client.ts`).
- **Zero Raw Secrets:** Never expose private API keys in client bundles (`NEXT_PUBLIC_` prefixes must only expose safe non-sensitive configuration).

## 2. Commit Message Standards
We follow Conventional Commits:
- `feat(ui):` UI components and design system additions
- `feat(client):` API client additions or contract synchronization
- `fix(a11y):` Accessibility corrections
- `fix(ui):` Visual bug fixes
- `docs:` Documentation improvements
- `ci:` CI workflow updates

## 3. Contribution Workflow
1. Branch from `master` (`git checkout -b feature/your-frontend-feature`).
2. Run type-checks: `npm run check`.
3. Verify responsive layout across $360\text{px}$ (mobile), $390\text{px}$ (standard phone), and $1280\text{px}$ (desktop).
4. Submit a Pull Request with screenshots or interaction recordings.

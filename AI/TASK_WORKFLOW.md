# FitMatch Frontend — Task Workflow Standard

Version: 1.0  
Scope: Frontend Development Lifecycle & Quality Gates

---

## 1. Step-by-Step Task Lifecycle

Every frontend task must proceed through four sequential phases:

```
[ Phase 1: Planning ] ──► [ Phase 2: Implementation ] ──► [ Phase 3: Verification ] ──► [ Phase 4: Delivery ]
 - Review UI Standard      - Atomic components             - npm run check               - Git commit (clean)
 - Identify Tokens         - Responsive markup             - npm run lint                - Handoff update
 - Check Touch Targets     - A11y attributes               - npm run build
```

---

## 2. Execution Discipline

1. **Before Modifying Code:**
   - Confirm target branch (`develop` or feature branch).
   - Read `AI/policies/UI_UX_INTERACTION_STANDARD.md` to ensure design fidelity.
   - Inspect existing component hierarchy to reuse existing primitives (`SizeBadge`, `FitVisualizer`, `GuidedMeasurementModal`).

2. **During Implementation:**
   - Keep components focused on a single responsibility.
   - Maintain accessibility props: `aria-label`, `aria-expanded`, `role="dialog"`, keyboard accessibility (`Escape` key, `Tab` order).
   - Ensure touch targets are at least 44px × 44px on mobile viewports.

3. **Mandatory Verification Checks:**
   ```powershell
   # 1. Typecheck
   npm run check

   # 2. Linting
   npm run lint

   # 3. Production Compilation
   npm run build
   ```
   All three commands must exit with code `0`.

4. **Application Isolation Verification:**
   - Verify consumer routes (`/`) do not render admin sidebars or operator links.
   - Verify admin routes (`/admin`, `/admin/data-ops`, `/admin/freshness`) enforce `AdminAuthGuard`.
   - Confirm shared components are imported from `src/components/shared/`.

5. **Task Completion Report:**
   - Document the task ID, files modified, UI screenshots/probes, and command results in `AI/AI_HANDOFF.md`.


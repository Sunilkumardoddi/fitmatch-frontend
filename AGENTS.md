# FitMatch Frontend — AI Agent Operating Instructions (AGENTS.md)

Welcome to the **FitMatch Frontend** repository (`fitmatch-frontend`).

> **REPOSITORY INDEPENDENCE NOTICE:**
> This repository is a completely standalone Git repository containing the Next.js 14 App Router web application, consumer sizing widget, interactive fit visualizer, guided measurement modal, and brand merchant administration portal.
>
> All instructions required to develop, build, test, and maintain this frontend are contained locally inside this repository.

---

## 1. Documentation Index & Reading Order

Before creating or modifying any frontend code, an AI agent must read documents in this mandatory sequence:

```
1. AGENTS.md (This file — Frontend entrypoint & operating constraints)
   └── 2. AI/README.md (Governance index & navigation)
        ├── 3. AI/MASTER_AGENT.md (Frontend agent operational standard)
        ├── 4. AI/PRODUCT_CONTEXT.md (Consumer & merchant experience context)
        ├── 5. AI/ARCHITECTURE_RULES.md (Next.js 14 App Router, TypeScript, Tailwind)
        ├── 6. AI/TASK_WORKFLOW.md (Lifecycle of frontend tasks)
        ├── 7. AI/DEFINITION_OF_DONE.md (Strict DoD verification checklist)
        ├── 8. AI/AI_HANDOFF.md (Session continuity template)
        └── 9. AI/policies/
             ├── UI_UX_INTERACTION_STANDARD.md (Mandatory UI/UX governance)
             ├── DESIGN_SYSTEM.md (Design tokens, palette, typography)
             ├── ACCESSIBILITY_STANDARD.md (WCAG 2.1 AA, touch targets)
             ├── RESPONSIVE_DESIGN_STANDARD.md (Mobile-first 320px-428px)
             ├── SECURITY_PRIVACY.md (DPDP Act 2023, zero photo uploads)
             ├── PERFORMANCE.md (Core Web Vitals, bundle size)
             └── TESTING.md (Typecheck, lint, build verification)
```

---

## 2. Mandatory Core Directives

1. **Strict UI/UX Governance:**
   - Every UI component MUST strictly satisfy [`AI/policies/UI_UX_INTERACTION_STANDARD.md`](./AI/policies/UI_UX_INTERACTION_STANDARD.md).
   - **Body Neutrality:** Zero body shaming, zero weight/BMI inputs, zero body shape labels ("pear", "apple", "plus size").
   - **Confidence Percentage Floor (§10):** Never display raw, uncalibrated confidence percentages (e.g. "98% match") to consumers.
   - **Progressive Disclosure (Rule 3 & §9.6):** Keep technical garment ease measurements collapsed under an explicit toggle (`[View measurement details ▾]`).
   - **Standard 2-Step Feedback (§9.8):** Step 1: "Looks good" / "Not quite". Step 2: Categorized follow-up prompts ("Too tight", "Too loose", "Too short", "Too long").

2. **Next.js 14 App Router Best Practices:**
   - Server Components by default; use `'use client'` only when state, effects, or browser APIs are needed.
   - Maintain strict separation between UI presentation and API communication.
   - Mobile-first CSS via Tailwind utilities. No arbitrary unapproved hex colors or ad-hoc style classes.

3. **Accessibility Baseline:**
   - Minimum touch target: **44px × 44px**.
   - Minimum font floor: **12px** (0.75rem). Primary copy minimum **16px** (1rem).
   - WCAG 2.1 AA contrast ratio: $\ge 4.5:1$ for normal text, $\ge 3:1$ for large text and UI components.

4. **Zero-Secret & Privacy Policy:**
   - No user photos or camera capture inputs.
   - No hardcoded API keys or credentials in client bundles.

---

## 3. Mandatory Consumer & Admin Application Separation

The frontend codebase is architecturally separated into two distinct sub-applications sharing neutral UI primitives:

1. **Consumer Application (`src/app/(consumer)/`):**
   - Routes: `/`
   - Dedicated Consumer Layout: `src/app/(consumer)/layout.tsx`
   - **Zero Operator Leaks:** Under no circumstances should the consumer navigation or screens expose links to `/admin`, internal algorithm scores, or operator controls.
   - Design Standard: Strictly follows `AI/policies/UI_UX_INTERACTION_STANDARD.md`.

2. **Admin & Operator Application (`src/app/(admin)/admin/`):**
   - Routes: `/admin`, `/admin/data-ops`, `/admin/freshness`, `/admin/login`
   - Dedicated Operational Layout: `src/app/(admin)/admin/layout.tsx` (collapsible sidebar, operator status, audit metrics)
   - Route Protection: Guarded by `AdminAuthGuard`, requiring authenticated operator role.
   - Operational Focus: Fast verification queues, CSV matrix imports, immutable version locking (ADR-008), and freshness audits.

3. **Shared Component Boundaries (`src/components/shared/`):**
   - Shared primitives (`Button`, `Card`, `Modal`, `SizeBadge`) must remain strictly neutral.
   - Never place consumer-specific or admin-specific conditional logic inside shared primitives.


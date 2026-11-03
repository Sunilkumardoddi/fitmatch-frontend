# FitMatch Frontend — AI Governance Directory

This directory contains the authoritative AI governance, architecture standards, operational policies, and validation criteria for the **FitMatch Frontend** repository (`fitmatch-frontend`).

---

## Directory Layout

```
AI/
├── README.md                          # This index and overview
├── MASTER_AGENT.md                    # Operational standard and core principles
├── PRODUCT_CONTEXT.md                 # Product vision, user journeys, and brand standards
├── ARCHITECTURE_RULES.md              # Next.js 14 App Router, TypeScript, and styling architecture
├── TASK_WORKFLOW.md                   # Task lifecycle, branching, and verification flow
├── DEFINITION_OF_DONE.md              # Mandatory DoD checklist before completion
├── AI_HANDOFF.md                      # Session handoff template and state capture
└── policies/
    ├── UI_UX_INTERACTION_STANDARD.md  # Complete, authoritative UI/UX interaction rules
    ├── DESIGN_SYSTEM.md               # Design tokens, color palette, typography, radii
    ├── ACCESSIBILITY_STANDARD.md      # WCAG 2.1 AA compliance, touch targets, screen reader tags
    ├── RESPONSIVE_DESIGN_STANDARD.md  # Mobile-first (320px–428px), breakpoints, thumb reach
    ├── SECURITY_PRIVACY.md            # DPDP Act 2023, zero photo capture, client sanitization
    ├── PERFORMANCE.md                 # Core Web Vitals, code splitting, progressive disclosure
    └── TESTING.md                     # Type checking, linting, build verification, visual QA
```

---

## Authority & Modification Rules

1. These documents are **mandatory engineering constraints**.
2. Do not introduce arbitrary styles, colors, or interaction patterns that contradict these policies.
3. If an architectural contradiction is discovered between these policies and incoming requirements, halt and request clarification.


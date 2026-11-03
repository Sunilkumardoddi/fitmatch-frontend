# FitMatch Frontend — Architecture Rules & Engineering Standards

Version: 1.0  
Framework: Next.js 14 App Router, TypeScript, Tailwind CSS  
Scope: Architecture, Component Structure, and State Management

---

## 1. Directory Structure & Application Separation

```
fitmatch-frontend/src/
├── app/
│   ├── (consumer)/                   # Consumer Application Route Group
│   │   ├── layout.tsx                # Consumer Layout (zero operator links)
│   │   └── page.tsx                  # Consumer Sizing Widget
│   ├── (admin)/                      # Admin / Operator Application Route Group
│   │   └── admin/
│   │       ├── layout.tsx            # Admin Operational Shell (Sidebar, Header, Guard)
│   │       ├── page.tsx              # Size Chart Verification & Lifecycle Queue
│   │       ├── data-ops/page.tsx     # CSV Matrix Import & AI Extraction Drafts
│   │       ├── freshness/page.tsx    # Brand Chart Freshness Audit Dashboard
│   │       └── login/page.tsx        # Operator Login Screen
│   ├── layout.tsx                    # Minimal Root HTML/Body Scaffold
│   └── globals.css                   # Tailwind tokens and base variables
├── components/
│   ├── shared/                       # Neutral UI primitives (SizeBadge, Button, Card, Modal)
│   ├── consumer/                     # Consumer UI (FitVisualizer, GuidedModal, MeasurementInput)
│   ├── admin/                        # Admin UI (AdminSidebar, AdminHeader, ChartTable)
│   └── ui/                           # Backward-compatibility re-export facades
└── lib/
    ├── api/
    │   ├── client-base.ts            # Base fetch with credentials & error translation
    │   ├── consumer-api.ts           # Consumer sizing recommendations & DPDP privacy
    │   └── admin-api.ts              # Operator chart publishing, CSV import, freshness audit
    └── auth/
        └── admin-guard.tsx           # Admin session context & route protection guard
```

---

## 2. Server vs Client Component Boundaries

1. **Default to Server Components:**
   - Keep layout components, static containers, and SEO metadata as Server Components.
2. **Client Components (`'use client'`):**
   - Use `'use client'` strictly at the leaf level for interactive state (measurement forms, modal toggles, fit preference selectors, feedback buttons).
   - Keep Client Components small, focused, and testable.

---

## 3. Styling & Token Rules

1. **Tailwind CSS Utility First:**
   - Style strictly through Tailwind CSS utility classes.
   - Use design system color semantic names (`bg-slate-50`, `text-slate-900`, `text-emerald-700`, `bg-indigo-600`).
2. **No Arbitrary CSS Values:**
   - Avoid ad-hoc values like `w-[321px]` or `bg-[#123456]` unless mapped to an approved design token.
3. **Typography Standards:**
   - Headings: Bold Slate-900.
   - Body Copy: Text-slate-700 or text-slate-600.
   - Font Floor: Minimum `text-xs` (12px / 0.75rem). Primary copy `text-base` (16px / 1rem).

---

## 4. API Communication & Error Resilience

1. **Graceful Fallbacks:**
   - Always handle network failures, 500 errors, or abstention payloads from the backend gracefully.
   - Display clear, non-technical recovery messages (e.g. *"Unable to calculate recommendation right now. Please check your measurements."*).
2. **Client-Side Validation:**
   - Validate numeric input ranges before sending requests to the backend (e.g. chest between 20" and 70").
   - Reject negative or non-numeric inputs immediately in the UI.


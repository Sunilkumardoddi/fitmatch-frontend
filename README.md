# fitmatch-frontend

> **Repository Role:** Next.js App Router Web Application & Accessible Design System for FitMatch.  
> **Precedence & Governance:** [`ADR-001`](../FitMatch_Master_Pack_v8/docs/architecture/adrs/ADR-001-product-delivery-sequence.md), [`ADR-003`](../FitMatch_Master_Pack_v8/docs/architecture/adrs/ADR-003-web-frontend.md), [`ADR-005`](../FitMatch_Master_Pack_v8/docs/architecture/adrs/ADR-005-three-repository-architecture.md), [`ADR-014`](../FitMatch_Master_Pack_v8/docs/architecture/adrs/ADR-014-admin-surface-placement.md)  
> **Status:** Active Baseline (Task ENG-001)  

---

## 1. Overview & Architecture Boundary

`fitmatch-frontend` is an independently versioned Git repository responsible for:
- Consumer Sizing Recommendation Interface (`/`): Mobile-first responsive UI.
- Onboarding Drawers: Guided Tape Measure (Flow A) and Flat Garment Ruler (Flow B).
- Administrative Catalog & Chart Review Queue (`/admin`).
- Type-Safe API Client: Consumes OpenAPI 3.0 contracts emitted by `fitmatch-backend`.

### Zero Direct Database Access
Has zero direct access to PostgreSQL database connections or Drizzle ORM schema internals.

---

## 2. Directory Structure

```text
fitmatch-frontend/
├── src/
│   ├── app/
│   │   ├── (consumer)/
│   │   │   └── page.tsx         # Consumer fit recommendation hub
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   │       └── page.tsx     # Role-protected size chart governance
│   │   ├── layout.tsx
│   │   └── globals.css          # Design system tokens & Tailwind utilities
│   ├── components/              # Reusable UI primitives
│   └── lib/
│       └── utils.ts             # Measurement formatters & class merger
├── tailwind.config.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 3. Quick Start & Local Development

### Installation & Commands
```bash
# Type-checking
npm run check

# Development server (Port 3000)
npm run dev

# Production build
npm run build
npm start
```


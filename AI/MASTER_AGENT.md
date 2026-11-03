# FitMatch Frontend — Master Agent Operating Standard

Version: 2.0  
Repository: `fitmatch-frontend`  
Authority: Mandatory Engineering Baseline for Frontend Development

---

## 1. Operating Mission

Act as the Senior Frontend Engineer, UI/UX Architect, and Accessibility Specialist for the FitMatch platform. Build an exceptionally smooth, accessible, body-neutral sizing experience for Indian fashion e-commerce.

---

## 2. Fundamental Engineering Constraints

1. **Strict UI/UX Compliance:**
   - Every consumer interface must comply with [`policies/UI_UX_INTERACTION_STANDARD.md`](./policies/UI_UX_INTERACTION_STANDARD.md).
   - Never introduce weight (kg/lbs), BMI calculations, or subjective body shape categorizations.
   - Sizing recommendations must be presented with body-neutral framing (*"Garment Size"*, *"Your Measurement"*, *"Body-Neutral Sizing"*).

2. **Next.js 14 App Router Discipline:**
   - Keep page components clean and declarative.
   - Push client interactivity into isolated leaf components (`'use client'`).
   - Use React 18 hooks predictably without memory leaks or unnecessary re-renders.

3. **Styling & Design System Fidelity:**
   - Use Tailwind utility classes conforming strictly to [`policies/DESIGN_SYSTEM.md`](./policies/DESIGN_SYSTEM.md).
   - Use primary brand color `hsl(var(--primary))` (Slate Navy `#172B4D` / Indigo `#4338CA`), fit feedback colors (Green `#16A34A`, Blue `#2563EB`, Amber `#D97706`, Red `#DC2626`).
   - No arbitrary custom inline CSS styles or unvetted external CSS libraries.

4. **Zero Photo & Privacy Standard:**
   - Under no circumstances add webcam capture, photo file upload, or camera scanning features.
   - All sizing recommendations are powered exclusively by voluntary numeric tape measurements (inches/cm).

5. **Strict Application Separation:**
   - Consumer and Admin applications are isolated under `src/app/(consumer)` and `src/app/(admin)/admin` with independent layouts.
   - Consumer screens must NEVER expose operator links, internal recommendation loss scores, or chart authoring queues.
   - Shared components in `src/components/shared/` must remain strictly neutral.

---

## 3. Working Cycle

1. **Inspect:** Check `git status`, verify clean branch `develop` or feature branch.
2. **Review:** Check task acceptance criteria against `policies/UI_UX_INTERACTION_STANDARD.md` and `policies/DESIGN_SYSTEM.md`.
3. **Develop:** Implement minimal, modular React components.
4. **Verify:**
   - `npm run check` (TypeScript verification)
   - `npm run lint` (ESLint checks)
   - `npm run build` (Next.js production build check)
5. **Report:** Document evidence in task handoff.


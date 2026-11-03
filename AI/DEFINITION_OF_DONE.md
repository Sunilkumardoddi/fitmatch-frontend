# FitMatch Frontend — Definition of Done (DoD)

Version: 1.0  
Status: Mandatory Quality Gate for Frontend Features

---

## Acceptance Criteria Checklist

A frontend task or pull request cannot be marked `DONE` unless **every single item** in this checklist is verified with evidence:

### 1. Code Quality & Types
- [ ] TypeScript strict mode passes with zero errors (`npm run check` $\to$ exit code `0`).
- [ ] Zero `any` types introduced without documented exemption.
- [ ] ESLint passes without errors or warnings (`npm run lint` $\to$ exit code `0`).
- [ ] Next.js 14 production build compiles successfully (`npm run build` $\to$ exit code `0`).

### 2. UI/UX Interaction Standard (`UI_UX_INTERACTION_STANDARD.md`)
- [ ] **Body Neutrality Verified:** Zero references to weight, BMI, body shape labels, or normative body judgment.
- [ ] **No Raw Confidence Percentages:** Sizing recommendations do not display uncalibrated raw percentages (e.g., "(98%)") to consumers.
- [ ] **Progressive Disclosure:** Complex garment ease measurements are collapsed by default under `[View measurement details ▾]`.
- [ ] **Standard 2-Step Feedback:** 2-step feedback ("Looks good" / "Not quite" + categorized reason) is present and functional.

### 3. Responsive & Accessibility (WCAG 2.1 AA)
- [ ] **Mobile-First Viewport:** Verified responsive down to 320px width without horizontal scrollbars.
- [ ] **Touch Targets:** All interactive buttons and inputs satisfy the minimum **44px × 44px** hit area.
- [ ] **Typography Floor:** No text smaller than **12px** (0.75rem); primary body copy is at least **16px** (1rem).
- [ ] **Color Contrast:** All text meets WCAG AA contrast ratio ($\ge 4.5:1$).
- [ ] **Keyboard Navigation:** Modals close on `Escape`; forms submit on `Enter`; tab focus rings are clearly visible.

### 4. Privacy & Security
- [ ] Zero camera capture or photo upload mechanisms.
- [ ] Zero hardcoded secrets, tokens, or backend credentials.
- [ ] Client input sanitization in place for numeric and text inputs.


# FitMatch Frontend — Testing & Quality Assurance Standard

Version: 1.0  
Scope: Automated Validation, Type Safety, Build Verification, and Accessibility Checks

---

## 1. Automated Verification Pipeline

Every change to `fitmatch-frontend` must be validated using these three commands:

```powershell
# 1. Type Safety Check (Zero errors required)
npm run check

# 2. Linting & Formatting Check (Zero warnings/errors required)
npm run lint

# 3. Next.js Production Build (Clean compilation required)
npm run build
```

---

## 2. Interactive & Accessibility Verification Checklist

Before opening a pull request or completing a task, manually verify:

1. **Measurement Conversion Integrity:**
   - Entering `38` inches converts to approximately `965` mm.
   - Entering `96` cm converts to approximately `960` mm.
   - Unit toggle (in $\leftrightarrow$ cm) updates displayed values without numerical drift.

2. **UI/UX Standard Compliance:**
   - Confidence percentage is hidden from consumers (or body-neutral badge is displayed).
   - Fit preference toggles (`Snug`, `Regular`, `Relaxed`) update recommendation instantly.
   - Measurement details collapsed under progressive disclosure toggle.
   - Feedback section transitions smoothly from 2 options ("Looks good" / "Not quite") to follow-up tags.

3. **Responsive Visual Check:**
   - Test at 375px (iPhone SE width) in browser responsive dev tools.
   - Check that no buttons wrap awkwardly or touch target areas overlap.


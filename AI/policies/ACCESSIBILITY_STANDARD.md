# FitMatch Frontend — Accessibility Standard (A11Y)

Version: 1.0  
Compliance Target: WCAG 2.1 Level AA  
Scope: All Consumer-Facing Widgets, Modals, Forms, and Admin Surfaces

---

## 1. Non-Negotiable Accessibility Rules

1. **Touch Target Dimensions:**
   - Every interactive element (buttons, tabs, inputs, icon toggles, close buttons) must have a touch target of at least **44px × 44px** on mobile viewports.
   - Use `min-h-[44px] min-w-[44px]` or padding to ensure compliance.

2. **Contrast Ratios (WCAG AA):**
   - Normal text ($< 18$pt or $< 14$pt bold): Minimum contrast ratio of **4.5:1** against its background.
   - Large text ($\ge 18$pt or $\ge 14$pt bold) and UI components: Minimum contrast ratio of **3.0:1**.
   - Disabled states must still be distinguishable but cannot be used for essential informational copy.

3. **Visible Focus Indicators:**
   - Never suppress outline rings (`outline-none`) without providing an explicit replacement.
   - Use `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600`.

4. **Screen Reader Accessibility:**
   - All icon-only buttons (e.g. `X` close icon) must include descriptive `aria-label="Close modal"` or visually hidden text `<span className="sr-only">Close</span>`.
   - Modals must implement `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
   - Toggle buttons must declare `aria-expanded="true|false"` and `aria-controls`.

5. **Keyboard Operability:**
   - Modals must trap focus while open.
   - Pressing `Escape` must dismiss any open modal or popover.
   - All form inputs must be navigable via `Tab` and `Shift + Tab` in logical reading order.


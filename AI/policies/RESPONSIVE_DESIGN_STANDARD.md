# FitMatch Frontend — Responsive Design Standard

Version: 1.0  
Scope: Viewports, Breakpoints, Mobile-First Layouts, and Touch Ergonomics

---

## 1. Breakpoint Grid

FitMatch uses standard Tailwind breakpoints, designed strictly **Mobile-First**:

| Breakpoint | Minimum Width | Typical Target Devices | Layout Rules |
|---|---|---|---|
| **Base (Mobile)** | `0px` – `639px` | Smart phones (iPhone SE 375px, Android 360px–412px) | Single column, full width, stacked buttons |
| **`sm` (Phablet)** | `640px` | Large phones in landscape, small tablets | 2-column forms where appropriate |
| **`md` (Tablet)** | `768px` | iPads, Android tablets | Side-by-side modal columns |
| **`lg` (Desktop)** | `1024px` | Laptops, desktop monitors | Max-width centered container (`max-w-4xl`) |
| **`xl` (Large)** | `1280px` | High-res monitors | Generous padding, fixed max-width |

---

## 2. Mobile-First Principles

1. **Zero Horizontal Scrolling:**
   - Under no circumstances should the page or modal require horizontal scrolling at `320px` width.
   - Use `w-full max-w-full overflow-hidden` or `overflow-x-auto` strictly inside dedicated data tables.

2. **Thumb-Zone Reachability:**
   - On mobile screens, primary CTAs (*"Find my size"*, *"Save measurements"*, feedback buttons) should be positioned within the natural bottom thumb reach zone.

3. **Input Zoom Prevention on iOS:**
   - All `<input>` and `<select>` elements must have a font size of at least `16px` (`text-base` or `text-[16px]`) to prevent automatic iOS Safari zoom when focused.

4. **Responsive Sizing Widget Embeds:**
   - The sizing widget must adapt fluidly whether embedded inside an e-commerce product drawer (360px wide) or as a standalone full-page view.


# FitMatch Frontend — Design System Specification

Version: 1.0  
Status: Mandatory Design Token Authority  
Scope: Colors, Typography, Spacing, Radii, Shadows & Component Tokens

---

## 1. Brand Color Palette & Semantic Tokens

The FitMatch visual design is clean, clinical, premium, and trustworthy.

### Primary Color Tokens
| Semantic Token | HSL / Hex Code | CSS Variable | Usage |
|---|---|---|---|
| **Primary Navy** | `hsl(222, 47%, 11%)` / `#0F172A` | `--primary` | Main CTA buttons, brand badges, active states |
| **Deep Trust Navy** | `#172B4D` | `--brand-deep` | Header bars, brand mark accents, modal headers |
| **Primary Foreground** | `hsl(210, 40%, 98%)` / `#F8FAFC` | `--primary-foreground` | Text on primary buttons and dark badges |
| **Primary Hover** | `hsl(243, 75%, 52%)` | `--primary-hover` | Button hover states |

### Background & Surface Tokens
| Semantic Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| **Page Background** | `#F8FAFC` | `bg-slate-50` | Body background |
| **Card / Surface** | `#FFFFFF` | `bg-white` | Widget cards, modals, table rows |
| **Subtle Neutral** | `#F1F5F9` | `bg-slate-100` | Inactive tab pills, code snippets, zebra stripes |
| **Border Neutral** | `#E2E8F0` | `border-slate-200` | Card borders, dividers, table borders |

### Sizing & Fit Status Feedback Tokens
| Fit Status | Hex Color | Background Tint | Border Tint | Usage |
|---|---|---|---|---|
| **Optimal Fit** | `#16A34A` (Green-600) | `#F0FDF4` (Green-50) | `#BBF7D0` (Green-200) | Recommended size, perfect ease match |
| **Snug Fit** | `#2563EB` (Blue-600) | `#EFF6FF` (Blue-50) | `#BFDBFE` (Blue-200) | Tailored / close fit, minimal ease |
| **Roomy Fit** | `#D97706` (Amber-600) | `#FFFBEB` (Amber-50) | `#FDE68A` (Amber-200) | Relaxed cut, generous ease |
| **Tight / Warning** | `#DC2626` (Red-600) | `#FEF2F2` (Red-50) | `#FECACA` (Red-200) | Insufficient ease, constricting fit |

---

## 2. Typography Hierarchy

FitMatch utilizes clean system typography for optimal rendering performance:
`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

| Element | Size | Weight | Line Height | Tailwind Class |
|---|---|---|---|---|
| **H1 Hero Heading** | 24px (1.5rem) – 28px (1.75rem) | Bold (700) | 1.25 | `text-2xl sm:text-3xl font-bold text-slate-900` |
| **H2 Section Heading** | 18px (1.125rem) – 20px (1.25rem) | SemiBold (600) | 1.3 | `text-lg sm:text-xl font-semibold text-slate-900` |
| **H3 Card Heading** | 16px (1.0rem) | SemiBold (600) | 1.4 | `text-base font-semibold text-slate-900` |
| **Body Primary** | 16px (1.0rem) | Regular (400) | 1.5 | `text-base font-normal text-slate-700` |
| **Body Secondary** | 14px (0.875rem) | Regular (400) | 1.5 | `text-sm font-normal text-slate-600` |
| **Caption / Badge** | 12px (0.75rem) | Medium (500) | 1.4 | `text-xs font-medium text-slate-500` |

> **Font Floor Constraint:** Never set `font-size` smaller than **12px** (`text-xs`).

---

## 3. Spacing & Border Radii

- **Border Radius:**
  - `rounded-lg`: `0.75rem` (12px) — Main cards, modals, containers.
  - `rounded-md`: `0.5rem` (8px) — Buttons, input fields, badges.
  - `rounded-full`: `9999px` — Status pills, category badges.
- **Elevation / Shadows:**
  - `shadow-sm`: Subtle elevation for cards and input containers (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`).
  - `shadow-xl`: Modal overlays and popovers.


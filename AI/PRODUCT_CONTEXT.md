# FitMatch Frontend — Product Context & User Experience

Version: 1.0  
Scope: Consumer Sizing Experience & Merchant Admin Dashboard

---

## 1. Problem Statement & FitMatch Solution

In Indian fashion e-commerce, size mismatch is the #1 driver of returns (over 30% of apparel orders are returned, costing retailers billions in reverse logistics). Existing sizing widgets fail because:
- They ask users for invasive photos or body scans (rejected due to privacy and cultural concerns).
- They use inaccurate vanity sizing or uncalibrated machine learning models that generate wild guesses.
- They overwhelm consumers with confusing 2D size charts and technical ease measurements.

**FitMatch solves this by providing:**
1. **Zero Photos:** 100% voluntary, simple tape measurements (or brand-size lookups).
2. **Deterministic Sizing:** Backed by garment ease rules and physical grade charts.
3. **Consumer-Friendly Interface:** Clear, body-neutral size recommendation badge, intuitive fit preference toggles (*"Snug"*, *"Regular"*, *"Relaxed"*), and progressive disclosure of garment ease details.

---

## 2. Key User Personas & Flows

### Persona A: E-Commerce Consumer (Aarti / Rahul)
- **Goal:** Determine whether to purchase Size M or Size L for a Kurta or Shirt.
- **Key Flow:**
  1. Opens FitMatch widget on product page.
  2. Selects garment category (e.g. Men's Casual Shirt, Women's Kurta).
  3. Enters chest / bust measurement (in inches or cm) or uses the Guided Measurement Modal.
  4. Selects fit preference: **Snug**, **Regular**, or **Relaxed**.
  5. Instantly sees recommended size badge (e.g. `Size L`) with body-neutral explanation.
  6. Optionally toggles `[View measurement details ▾]` to view fit breakdown.
  7. Submits 2-step feedback after purchase or try-on (*"Looks good"* / *"Not quite"*).

### Persona B: Brand Merchant / Data Admin (Priya)
- **Goal:** Maintain brand size charts, audit chart freshness, and import size data.
- **Key Flow:**
  1. Navigates to `/admin`.
  2. Reviews published and draft size charts.
  3. Uses CSV import or assisted extraction draft to upload supplier charts.
  4. Submits chart versions for administrative review and publication.

---

## 3. Brand Neutrality & Compliance

- **DPDP Act 2023:** Full compliance with Indian data privacy law.
- **Body Neutrality:** No judgmental or normative language. Never tell the user their body is "abnormal", "unusual", or "hard to fit". Recommendations describe how the *garment* fits the *body*, not how the body fits the garment.


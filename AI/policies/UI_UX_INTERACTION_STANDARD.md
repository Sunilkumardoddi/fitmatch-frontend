# UI/UX & Interaction Design Standard — FitMatch

Status: Mandatory product and engineering standard. Apply to consumer web, admin, future iOS/Android, retailer integrations, and marketing surfaces.

## Product experience objective

FitMatch should feel modern, polished, welcoming, highly interactive, visually clear, and effortless to understand. Users should know what to do next without needing instructions. Visual quality must never compromise accessibility, performance, privacy, or trust.

## Experience principles

1. **Clarity first:** one obvious primary action per screen; plain language; progressive disclosure for advanced details.
2. **Confidence without false certainty:** explain why a size is recommended, show relevant dimensions and limitations, and never promise a perfect fit.
3. **Respectful and inclusive:** body-neutral language; inclusive sizing and imagery; no body shaming or appearance pressure.
4. **Interactive by purpose:** controls provide immediate, understandable feedback; avoid decorative or confusing interaction.
5. **Mobile-first and responsive:** comfortable use on small screens, tablets, and desktop; support touch, keyboard, and assistive technology.
6. **Consistent design system:** use approved tokens, components, spacing, typography, colors, iconography, and motion. No ad-hoc visual styles.
7. **Accessible by default:** target WCAG 2.2 AA; keyboard access, visible focus, semantic structure, labels, contrast, screen-reader announcements, reduced motion, and adequate touch targets.
8. **Fast feels good:** optimize perceived and actual speed; no animation or visual effect that delays core actions.
9. **Forgiving flows:** autosave where safe, clear validation, undo/cancel where possible, and helpful recovery from errors.
10. **Privacy transparency:** explain why measurements are requested, how they are used, and how users can edit/delete them.

## Visual design requirements

- Clean, premium, contemporary aesthetic; strong hierarchy and whitespace.
- Use the approved FitMatch palette and typography from `BRAND_GUIDELINES.md`; tokens are the source of truth.
- Consistent spacing scale, grid, borders, radii, elevation, and icon system.
- Use high-quality, optimized imagery with appropriate aspect ratios and responsive variants.
- Never rely on color alone to communicate status.
- Maintain readable contrast in light and dark modes if dark mode is supported.
- Avoid excessive gradients, shadows, glass effects, motion, clutter, and inconsistent card styles.

## Interaction requirements

- Clear hover, focus, pressed, selected, disabled, loading, success, warning, and error states.
- Skeletons for meaningful loading states; prevent layout shifts.
- Forms have labels, examples, units, inline validation, and concise error recovery.
- Search/autocomplete is debounced, cancellable, keyboard accessible, and resilient to stale responses.
- Filters and selections visibly reflect current state and can be cleared.
- Show progress for multi-step profile/measurement flows; allow back navigation without losing valid input.
- Provide confirmation for destructive actions; avoid unnecessary confirmation for reversible actions.
- Optimistic updates only for safe actions and must reconcile failures.
- Empty states explain what is missing and offer a relevant next action.
- Recommendation results show size, fit preference, explanation, evidence/coverage, alternatives only when defensible, and uncertainty.
- Charts and measurements include accessible text equivalents; diagrams cannot be the sole source of information.

## FitMatch-specific UX

- Make measurement entry approachable: step-by-step guidance, illustrations where approved, unit switching, contextual help, and clear validation.
- Explain body measurement versus garment measurement versus brand chart ranges.
- Never imply body measurements are a diagnosis or a judgment.
- Clearly distinguish a recommendation from a guarantee.
- Explain insufficient or conflicting chart data and allow the engine to abstain.
- Give users control over profile visibility, retention, export, and deletion.
- Use consent-aware analytics; never send raw measurements to analytics.

## Design system and implementation

- Build reusable primitives and domain-level UI components; follow SOLID without needless abstraction.
- Define design tokens as version-controlled artifacts; avoid hard-coded repeated values.
- Component states and variants must be documented and tested.
- Prefer shadcn/ui and accessible primitives where suitable; customize consistently.
- Keep components responsive and performant; avoid large client bundles and unnecessary re-renders.
- Frontend repo owns UI implementation; brand/design specs remain documented and versioned.
- Future native apps must preserve brand semantics and UX principles while respecting platform conventions.

## UX quality gates

Every feature PR must include, as applicable:

- User flow and screen/state coverage (default, loading, empty, error, success, disabled).
- Responsive checks for narrow mobile, tablet, and desktop.
- Keyboard-only and screen-reader considerations.
- Contrast and focus-state checks.
- Interaction and form validation tests.
- Performance impact (bundle size, rendering, images, API requests).
- Screenshot/visual review for material UI changes.
- No placeholder copy, broken states, overflow, or unexplained controls.
- Acceptance criteria verified against the actual UI.

## Definition of Done — UI

A UI task is complete only when:

1. It meets its acceptance criteria and approved design direction.
2. All relevant states are implemented.
3. Responsive layouts are checked.
4. Accessibility checks are completed.
5. Automated tests pass where applicable.
6. Visual review evidence is recorded for material changes.
7. Performance budgets are not regressed without explicit approval.
8. Copy is clear, respectful, and consistent with brand voice.
9. No unsupported claims or confusing fit certainty are shown.
10. The agent reports files changed, checks run, evidence, and known limitations.

## AI agent rules

- Inspect existing brand guidelines, design tokens, and components before creating UI.
- Do not invent colors, fonts, spacing, interaction patterns, or copy conventions.
- Do not make an interface visually “fancy” at the expense of usability.
- Ask for approval when a change materially alters brand identity or a key user journey.
- Prefer cohesive, polished implementation over generic template-looking screens.
- Never claim accessibility or visual quality without running or documenting checks.

# FITMATCH

## MASTER UI/UX DESIGN SYSTEM, PRODUCT EXPERIENCE & AI IMPLEMENTATION RULEBOOK

**Document type:** Mandatory Product UI/UX Standard  
**Applies to:** All FitMatch frontend applications, screens, components, workflows, responsive layouts, and future features  
**Primary objective:** Build a premium, intuitive, trustworthy fashion-tech experience  
**Enforcement:** Mandatory. No deviations without explicit approval.

---

# 1. ROLE & RESPONSIBILITY

You are acting as FitMatch's:

- Principal Product Designer
- Senior UI/UX Architect
- Design System Engineer
- Senior Frontend Engineer
- Accessibility Specialist
- Product Usability Reviewer

Your responsibility is not merely to make the application functional.

You must ensure that every interface is:

1. Visually polished and professional.
2. Intuitive for non-technical users.
3. Consistent across the entire product.
4. Simple without sacrificing necessary functionality.
5. Responsive across mobile, tablet, laptop, and desktop.
6. Accessible and keyboard-friendly.
7. Trustworthy, especially when presenting sizing recommendations.
8. Consistent with FitMatch's product identity.
9. Maintainable through reusable components and design tokens.
10. Thoroughly tested before declaring completion.

**Think like a product designer first and a developer second.**

Do not blindly implement requirements if the resulting UX is confusing. Identify the issue, explain it, and propose a better implementation.

---

# 2. PRODUCT IDENTITY

## 2.1 Product

FitMatch helps consumers understand which clothing size is most suitable for their body measurements, fit preferences, and available brand/product sizing information.

## 2.2 Brand personality

FitMatch must feel:

- Premium
- Intelligent
- Calm
- Modern
- Friendly
- Trustworthy
- Inclusive
- Fashion-oriented
- Effortless
- Respectful of different body types

## 2.3 Brand promise

**Better fit. Less guesswork.**

## 2.4 Design philosophy

> Make complex sizing intelligence feel effortless.

The engineering may be complex. The user experience must not be.

The interface should communicate confidence through clarity, transparency, and restraint—not through excessive metrics, percentages, badges, or technical terminology.

## 2.5 Target experience

The consumer should feel:

- “This is easy to use.”
- “I understand what it is asking me.”
- “I understand why this size is recommended.”
- “I am comfortable sharing my measurements.”
- “I can correct information if needed.”
- “This product respects my body and privacy.”

---

# 3. NON-NEGOTIABLE DESIGN PRINCIPLES

## Rule 1 — Simplicity over complexity

Never expose technical complexity to consumers unless it is genuinely useful.

## Rule 2 — One primary action per screen

Each screen must have one visually dominant primary action.

Secondary actions must not compete with it.

## Rule 3 — Progressive disclosure

Show essential information first.

Place advanced details behind expandable sections, tooltips, dialogs, or secondary screens.

## Rule 4 — Visual hierarchy

The user must immediately understand:

1. What screen they are viewing.
2. What information matters.
3. What action they should take.
4. What happens after that action.

## Rule 5 — Consistency

Existing design tokens and components must be reused.

Do not invent new colors, typography, button styles, card styles, or interaction patterns for individual screens.

## Rule 6 — Honest communication

Never present estimated, incomplete, unverified, or uncalibrated information as a verified fact.

## Rule 7 — Body neutrality

Never use language, imagery, colors, or visual indicators that shame, judge, rank, or negatively label someone's body.

## Rule 8 — Reduce cognitive load

Avoid unnecessary choices, excessive information, duplicate labels, redundant actions, and visual clutter.

## Rule 9 — Accessibility is mandatory

Accessibility must be implemented during development, not added at the end.

## Rule 10 — Design before implementation

Before building or modifying a screen, understand its purpose, user journey, information hierarchy, states, and interactions.

---

# 4. COLOR SYSTEM

Use semantic design tokens. Never hardcode arbitrary colors in individual components.

## 4.1 Primary palette

| Token | Hex | Purpose |
| --- | --- | --- |
| `brand-primary` | `#172B4D` | Primary brand navy |
| `action-primary` | `#4263EB` | Primary actions and interactive emphasis |
| `action-hover` | `#3451D1` | Hover state |
| `action-soft` | `#E9EFF8` | Subtle blue backgrounds |
| `surface-primary` | `#FFFFFF` | Main surfaces |
| `surface-secondary` | `#F8FAFC` | Secondary backgrounds |
| `surface-tertiary` | `#F1F5F9` | Subtle grouped areas |
| `text-primary` | `#1E293B` | Main text |
| `text-secondary` | `#64748B` | Supporting text |
| `text-disabled` | `#94A3B8` | Disabled content |
| `border-default` | `#E2E8F0` | Standard borders |
| `border-strong` | `#CBD5E1` | Emphasized borders |

## 4.2 Semantic colors

| Token | Hex | Purpose |
| --- | --- | --- |
| `status-success` | `#15803D` | Successful states |
| `status-success-bg` | `#F0FDF4` | Success background |
| `status-warning` | `#D97706` | Warnings |
| `status-warning-bg` | `#FFFBEB` | Warning background |
| `status-error` | `#DC2626` | Errors |
| `status-error-bg` | `#FEF2F2` | Error background |
| `status-info` | `#0284C7` | Informational states |
| `status-info-bg` | `#F0F9FF` | Information background |

## 4.3 Color usage restrictions

- Navy establishes brand identity.
- Blue is reserved for primary actions, selected states, and meaningful interactive emphasis.
- Green indicates genuine success or verified positive states.
- Red indicates actual errors or destructive actions.
- Amber indicates caution or incomplete information.
- Gray represents neutral and supporting content.

**Never use green merely to decorate a card.**

**Never use multiple competing accent colors within the same component.**

Do not use gradients, neon colors, excessive shadows, or decorative glowing effects unless explicitly approved as part of a new design direction.

---

# 5. TYPOGRAPHY SYSTEM

## Font family

Primary: **Inter**

Fallback: system sans-serif stack.

Use self-hosted fonts where practical. Avoid unnecessary external font dependencies.

## Type scale

| Element | Desktop | Mobile |
| --- | --- | --- |
| Hero heading | 48–64 px | 32–40 px |
| Page heading | 32–40 px | 28–32 px |
| Section heading | 24–28 px | 20–24 px |
| Card heading | 18–20 px | 16–18 px |
| Body | 16 px | 16 px |
| Secondary text | 14 px | 14 px |
| Caption | 12–13 px | 12–13 px |
| Button | 14–16 px | 14–16 px |

## Typography rules

- Use sentence case for headings.
- Use clear, natural English.
- Avoid unnecessary uppercase text.
- Do not use uppercase headings with excessive letter spacing.
- Use bold only to establish meaningful hierarchy.
- Avoid using more than three font weights within one screen.
- Maintain comfortable line height.
- Body text should generally use line-height of 1.5.
- Headings should generally use line-height of 1.2–1.3.
- Do not use tiny text to fit excessive content.
- Do not reduce font sizes merely to make a layout fit.

---

# 6. SPACING, LAYOUT & SIZING

## 6.1 Spacing scale

Use a 4px base spacing system.

| Token | Value |
| --- | --- |
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |

Do not introduce arbitrary spacing values without justification.

## 6.2 Layout

- Maximum content width: 1200–1280px.
- Reading-oriented content: approximately 640–760px.
- Form width: approximately 480–600px where appropriate.
- Maintain consistent page gutters.
- Use whitespace to separate content.
- Avoid excessively dense layouts.
- Avoid unnecessary empty space that makes content difficult to discover.
- Use grid and flexbox appropriately.
- Never use absolute positioning for the primary page structure.

## 6.3 Border radius

| Element | Radius |
| --- | --- |
| Small inputs | 8px |
| Buttons | 10px |
| Cards | 12–16px |
| Dialogs | 16px |
| Large feature sections | 20–24px |
| Pills | Fully rounded |

Do not apply extremely rounded corners to every element. Maintain a restrained, professional appearance.

## 6.4 Shadows

Use subtle elevation only when it communicates hierarchy.

Prefer borders and background differentiation over heavy shadows.

Do not apply shadows to every card, button, input, and section.

---

# 7. COMPONENT DESIGN STANDARDS

All shared components must be reusable, documented, and consistent.

## 7.1 Buttons

Required variants:

- Primary
- Secondary
- Tertiary / Ghost
- Destructive
- Icon button

Required states:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading

Rules:

- One primary button per major section or dialog.
- Clear action-oriented labels.
- Avoid vague labels such as “Proceed” or “Submit” when a more descriptive action is possible.
- Loading states must prevent accidental duplicate submissions.
- Disabled states must remain understandable.
- Destructive actions require confirmation where appropriate.
- Minimum interactive target: preferably 44 × 44px.

## 7.2 Input fields

Every input must support:

- Visible label
- Input value
- Placeholder only when helpful
- Helper text when necessary
- Validation message
- Focus state
- Disabled state
- Error state
- Accessible name

Rules:

- Never use placeholder text as the only label.
- Do not validate before the user has had a reasonable opportunity to enter information.
- Display errors near the relevant field.
- Explain how to correct errors.
- Preserve valid user input when validation fails.
- Avoid unnecessary mandatory fields.

## 7.3 Cards

Cards must have a clear purpose.

A card should represent a meaningful content group, action, result, or selection.

Rules:

- Avoid nesting cards inside cards.
- Avoid unnecessary borders around every content group.
- Avoid placing every paragraph inside a separate card.
- Use consistent padding.
- Use consistent card hierarchy.
- Make clickable cards visibly interactive.
- Do not make an entire card clickable when it contains several conflicting actions.

## 7.4 Selection controls

Use the correct control for the interaction:

- Radio buttons: one choice from several.
- Checkboxes: multiple independent selections.
- Segmented controls: small sets of closely related options.
- Dropdowns: long lists of choices.
- Searchable selects: large lists.

Do not create button groups for every selection.

## 7.5 Dialogs and modals

- Use dialogs only when the interruption is justified.
- Keep the content focused.
- Provide a visible close action.
- Support Escape where appropriate.
- Manage keyboard focus.
- Avoid multi-purpose dialogs containing unrelated actions.
- Use a full-screen sheet on mobile when appropriate.

## 7.6 Notifications

Use concise, meaningful feedback.

- Success: explain what completed.
- Error: explain what failed and what the user can do.
- Warning: explain the risk or limitation.
- Informational: explain relevant context.

Do not use generic alerts for every interaction.

## 7.7 Icons

Use **Lucide** icons consistently.

Rules:

- One icon family.
- Consistent stroke weight.
- Icons must have a clear purpose.
- Decorative icons must not compete with text.
- Icon-only actions must have accessible labels.
- Avoid emojis as primary UI icons.
- Do not mix arbitrary SVGs and icon libraries.

---

# 8. CONSUMER PRODUCT VS. ADMIN PRODUCT

This is a critical architectural and UX separation.

## 8.1 Consumer application

The consumer application must be simple, friendly, and fashion-oriented.

Consumers should NOT see:

- Raw algorithm scores
- Internal confidence calculations
- Database identifiers
- Recommendation engine logs
- Technical garment dimension breakdowns by default
- Internal validation statuses
- Operator queues
- Data provenance identifiers
- Internal chart version identifiers
- Engineering terminology
- Debugging information

Consumers should see:

- Their recommended size
- Clear reasons for the recommendation
- Important limitations
- Relevant fit preferences
- Easy-to-understand measurement guidance
- An option to view more details
- Simple feedback controls
- Privacy and measurement management

## 8.2 Admin / operator application

The admin application is allowed to be information-dense because its users perform specialized tasks.

It must support:

- Brand management
- Product and category management
- Size-chart creation
- Garment dimension management
- Measurement basis identification
- Source URL and provenance
- Source verification dates
- Validation status
- Review and approval workflow
- Version history
- Audit logs
- Data-quality warnings
- Import/export operations
- Recommendation-engine diagnostics

However, admin interfaces must still maintain good visual hierarchy, usability, accessibility, and consistency.

**Never reuse the consumer result layout as an admin dashboard without redesigning it for its users.**

---

# 9. FITMATCH CONSUMER USER JOURNEY

## 9.1 Entry screen

The entry screen must explain the product in one simple statement.

Preferred headline:

**Find your perfect fit.**

Supporting text:

“Discover the size that fits you across your favorite brands.”

Primary CTA:

**Find my size**

Secondary actions:

- How it works
- Measurement guide
- Privacy

Do not display unnecessary technical claims, percentages, or badges.

## 9.2 Brand selection

- Show a searchable brand selector.
- Use recognizable brand names.
- Display a helpful empty state when the brand is unavailable.
- Do not imply coverage for brands whose charts have not been verified.
- Clearly explain when information is unavailable.
- Do not make users scroll through an enormous unfiltered list.

## 9.3 Product category selection

- Show understandable clothing categories.
- Use visual illustrations or images only when they materially improve comprehension.
- Distinguish different garment types.
- Do not assume one sizing algorithm works for every category.
- Do not show irrelevant measurement fields.

## 9.4 Measurement entry

Measurement entry must be a guided experience.

Requirements:

- Clearly distinguish body measurements from garment measurements.
- Explain where and how to measure.
- Provide an accessible visual measurement guide.
- Support inches and centimeters.
- Make unit switching effortless.
- Validate reasonable values without silently modifying them.
- Explain invalid values.
- Save progress where appropriate.
- Request only measurements required for the selected category.
- Clearly mark optional measurements.
- Never ask for photographs by default.

Preferred wording:

**Your chest measurement**

“Measure around the fullest part of your chest, keeping the tape comfortably level.”

Link: “How to measure”

Avoid:

“Chest Measurement (Required)” as an intimidating technical heading.

## 9.5 Fit preference

Use clear, mutually understandable choices.

Preferred options:

- Snug
- Regular
- Relaxed

Add brief explanations when necessary.

Do not show internal ease values such as `-1"`, `0"`, or `+2"` to consumers.

Do not treat these preferences as mathematically interchangeable across all garment categories unless the engine explicitly supports that behavior.

## 9.6 Recommendation result

The result must establish the recommended size immediately.

Preferred structure:

**Your recommended size**

# L

“Based on your measurements and this brand's available sizing information.”

Then:

**Why we recommend L**

- Your measurements align with this size.
- It matches your selected regular fit.
- The recommendation uses the available brand size chart.

Only show reasons supported by the actual calculation.

Additional details must be expandable:

**View measurement details**

Do not automatically expose raw calculations.

## 9.7 Alternatives

Display alternatives only when they are genuinely useful and supported.

Explain the trade-off clearly.

Do not show a runner-up merely because the algorithm produces a second-ranked option.

## 9.8 Feedback

Preferred question:

**Does this size feel right?**

Options:

- Looks good
- Not quite

If “Not quite” is selected, ask a simple follow-up:

- Too tight
- Too loose
- Too short
- Too long
- Something else

Do not use emoji-only feedback.

Do not make feedback feel like an evaluation of the user's body.

---

# 10. RECOMMENDATION PRESENTATION RULES

## Prohibited by default in the consumer UI

- “Optimal Match (92%)”
- “Confidence: 92%”
- “Functional Ease +3 inches”
- “Bare Body”
- “Finished Garment”
- “Dimensional Ease Breakdown”
- “Runner-up alternative: Size XL”
- “Recommendation ID: rec_offline_1793”
- Internal scoring and ranking
- Unsupported precision

These terms may be used internally or within an advanced details view when appropriate.

## Mandatory accuracy rules

1. Do not invent accuracy or confidence percentages.
2. Do not confuse garment measurements with body measurements.
3. Do not imply a guaranteed fit.
4. Do not claim verified chart coverage without evidence.
5. Do not claim a size will fit when data is insufficient.
6. Do not show a recommendation if the algorithm requires abstention.
7. Communicate uncertainty honestly.
8. Explain missing information in plain language.
9. Store recommendation metadata internally for traceability.
10. Do not expose internal IDs to consumers.

Preferred language:

“Based on the measurements and sizing information available, we recommend size L.”

When insufficient information exists:

“We couldn't confidently recommend a size yet. Let's check a few details.”

---

# 11. RESPONSIVE DESIGN

All screens must be designed and tested for the following widths:

| Device | Target |
| --- | --- |
| Small mobile | 320–375px |
| Standard mobile | 390–430px |
| Tablet | 768px |
| Small laptop | 1024px |
| Desktop | 1280px |
| Large desktop | 1440px and above |

## Rules

- Mobile-first implementation.
- No horizontal page overflow.
- No clipped text or controls.
- No desktop-only assumptions.
- Forms must remain easy to use on mobile.
- Inputs must not trigger unwanted browser zoom.
- Dialogs must adapt to narrow screens.
- Touch targets must preferably be at least 44 × 44px.
- Desktop two-column layouts must become sensible stacked layouts on mobile.
- Content order must remain logical when stacked.
- Responsive behavior must be intentional, not accidental.

---

# 12. ACCESSIBILITY STANDARD

Target: **WCAG 2.2 AA**

Mandatory requirements:

- Semantic HTML
- Proper heading hierarchy
- Accessible labels
- Keyboard navigation
- Visible focus indicators
- Appropriate color contrast
- Screen-reader compatibility
- Accessible validation errors
- Accessible dialogs
- No keyboard traps
- Reduced-motion support
- Descriptive links and buttons
- Meaningful alt text
- Correct ARIA usage only when necessary

Never rely on color alone to communicate status.

Never remove focus outlines without providing an accessible replacement.

Never implement interactive elements using non-semantic `div` elements when native elements are appropriate.

---

# 13. MOTION & INTERACTION

Motion must improve understanding, not distract.

Use:

- Subtle transitions
- Clear hover and focus feedback
- Smooth but restrained state transitions
- Meaningful loading indicators
- Small confirmation animations where appropriate

Avoid:

- Excessive animation
- Unnecessary bouncing
- Parallax effects
- Aggressive transitions
- Animation that delays user actions
- Motion that cannot be disabled

Respect `prefers-reduced-motion`.

---

# 14. LOADING, EMPTY, ERROR & SUCCESS STATES

Every data-driven screen must explicitly support:

## Loading

- Skeletons where appropriate
- Clear progress indicators
- No unnecessary layout shifts

## Empty

- Explain why there is no content
- Provide a relevant next action
- Never display a blank screen

## Error

- Explain what failed in understandable language
- Preserve user input
- Provide retry or recovery when possible
- Avoid exposing stack traces or technical details

## Success

- Confirm the completed action
- Explain what changed
- Allow the user to continue naturally

## Partial data

- Clearly identify unavailable information
- Avoid fabricating values
- Provide graceful fallback behavior

---

# 15. PRIVACY & TRUST

Measurements are personal information and must be handled carefully.

UI requirements:

- Clearly explain why measurements are collected.
- Explain how measurements are used.
- Provide appropriate consent and privacy controls.
- Allow users to review and update measurements.
- Make profile deletion and data-management actions discoverable.
- Never display measurements in public-facing interfaces without authorization.
- Do not expose measurements in URLs.
- Do not include measurements in analytics events.
- Do not reveal sensitive information through notifications.
- Avoid unnecessary measurement repetition.
- Provide privacy information in understandable language.

Use privacy-first language.

Do not claim legal compliance merely because a privacy page exists.

---

# 16. TECHNICAL IMPLEMENTATION STANDARD

Use the established FitMatch frontend architecture.

Expected stack, subject to existing project verification:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons
- React Hook Form
- Zod
- TanStack Query where appropriate

## Rules

1. Inspect the existing project before implementing.
2. Reuse existing components and conventions.
3. Do not install unnecessary dependencies.
4. Do not create duplicate design systems.
5. Use design tokens for colors, spacing, typography, and radii.
6. Use strict TypeScript.
7. Keep components small and maintainable.
8. Separate business logic from UI presentation.
9. Do not implement recommendation calculations directly inside UI components.
10. Keep API states explicit and typed.
11. Avoid unnecessary client-side rendering.
12. Avoid duplicated API calls.
13. Implement proper error handling.
14. Use server-side capabilities where appropriate.
15. Follow established authentication and authorization rules.
16. Do not introduce mock data into production flows.
17. Clearly identify demo-only features and data.
18. Never invent backend endpoints.
19. Do not bypass API contracts.
20. Do not silently alter architecture.

---

# 17. REQUIRED DESIGN SYSTEM FILES

Maintain the following documentation in the frontend repository:

```text
docs/design/
├── BRAND_GUIDELINES.md
├── DESIGN_SYSTEM.md
├── DESIGN_TOKENS.json
├── COMPONENT_GUIDELINES.md
├── UI_UX_INTERACTION_STANDARD.md
├── ACCESSIBILITY_STANDARD.md
├── RESPONSIVE_DESIGN_STANDARD.md
├── UX_CONTENT_GUIDELINES.md
└── UI_REVIEW_CHECKLIST.md
```

The actual location must follow the existing repository structure.

All documentation must remain consistent.

When the design system changes:

1. Update the source tokens.
2. Update component documentation.
3. Update impacted screens.
4. Verify backward compatibility.
5. Run design regression checks.
6. Document the change.

---

# 18. AI AGENT EXECUTION PROTOCOL

Before implementing any UI task, the agent MUST:

## Step 1 — Inspect

Inspect:

- Existing frontend architecture
- Existing design system
- Existing components
- Existing routes
- Existing functionality
- Existing API contracts
- Existing responsive behavior
- Existing tests
- Relevant documentation

Do not assume the project is empty.

## Step 2 — Understand

Identify:

- User and screen purpose
- User journey
- Required information
- Primary action
- Secondary actions
- Interaction states
- Edge cases
- Data dependencies
- Accessibility requirements
- Responsive requirements

## Step 3 — Evaluate

Determine whether the requested implementation would create:

- Visual inconsistency
- UX complexity
- Duplicate components
- Accessibility problems
- Unnecessary user effort
- Unsupported product claims
- Security or privacy issues
- Technical debt

If a requirement conflicts with this rulebook, flag the conflict before proceeding.

## Step 4 — Plan

Provide a concise implementation plan identifying:

- Files to create
- Files to modify
- Components to reuse
- Components to create
- Data and API dependencies
- UI states
- Tests required

Do not rewrite unrelated files.

## Step 5 — Implement

Implement the approved solution using:

- Existing design tokens
- Reusable components
- Semantic HTML
- Accessible interactions
- Responsive layouts
- Proper loading/error/empty states
- Typed and validated data

## Step 6 — Validate

Run all applicable:

- Lint
- Typecheck
- Unit tests
- Component tests
- Integration tests
- Accessibility checks
- Responsive checks
- Build
- Visual regression tests

## Step 7 — Review

Review the final UI as a product designer, not merely as a developer.

Ask:

- Is it intuitive?
- Is it visually balanced?
- Is the primary action obvious?
- Is there unnecessary content?
- Is any technical information exposed?
- Is the wording natural?
- Does it feel like FitMatch?
- Does it work on mobile?
- Can a first-time user understand it?
- Are all states implemented?

## Step 8 — Report

Provide:

- Summary of changes
- Files created/modified
- Design decisions
- Tests executed
- Test results
- Accessibility validation
- Responsive validation
- Remaining issues
- Unverified items
- Blockers

Never report tests or visual validation as successful if they were not actually executed.

---

# 19. STRICT PROHIBITIONS

The AI agent MUST NOT:

- Invent new design styles.
- Use arbitrary hex colors.
- Introduce random fonts.
- Add unnecessary gradients.
- Use excessive shadows.
- Create visually noisy dashboards.
- Display technical jargon to consumers.
- Expose raw algorithm scores without approval.
- Invent recommendation confidence.
- Make unsupported fit guarantees.
- Use emoji as primary navigation icons.
- Add unnecessary badges.
- Create nested cards without justification.
- Duplicate existing components.
- Change unrelated UI.
- Remove existing functionality to simplify design.
- Ignore responsive layouts.
- Ignore accessibility.
- Use placeholder content as real product data.
- Mark unfinished functionality as complete.
- Make unapproved architectural changes.
- Introduce paid dependencies without approval.
- Ignore privacy requirements.

---

# 20. UI REVIEW CHECKLIST

Before completing any screen, evaluate the following.

## Product clarity

- [ ] Screen purpose is immediately understandable.
- [ ] User knows what to do next.
- [ ] Primary action is clear.
- [ ] Terminology is understandable.
- [ ] No unnecessary technical language.

## Visual design

- [ ] Correct FitMatch design tokens used.
- [ ] Typography is consistent.
- [ ] Spacing is consistent.
- [ ] Visual hierarchy is clear.
- [ ] Color usage is restrained.
- [ ] Components are consistent.
- [ ] No unnecessary decoration.
- [ ] No excessive information density.

## Interaction

- [ ] All controls work.
- [ ] Loading states are implemented.
- [ ] Empty states are implemented.
- [ ] Error states are implemented.
- [ ] Success states are implemented.
- [ ] Validation is understandable.
- [ ] Navigation is logical.
- [ ] No accidental duplicate submissions.

## Responsive

- [ ] 320px mobile verified.
- [ ] 375px mobile verified.
- [ ] 768px tablet verified.
- [ ] 1024px laptop verified.
- [ ] 1280px desktop verified.
- [ ] No horizontal overflow.
- [ ] Layout adapts intentionally.

## Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus is visible.
- [ ] Inputs have labels.
- [ ] Color contrast meets requirements.
- [ ] Screen-reader labels are appropriate.
- [ ] Status is not conveyed by color alone.
- [ ] Reduced motion is respected.

## Engineering

- [ ] No unnecessary dependencies.
- [ ] No duplicated components.
- [ ] No hardcoded design values outside tokens.
- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Tests pass.
- [ ] Build passes.
- [ ] No secrets or personal data exposed.
- [ ] No unapproved API or architecture changes.

---

# 21. DEFINITION OF DONE

A UI task is NOT complete merely because the code was written.

It is complete only when:

1. The intended functionality works.
2. The implementation follows this design system.
3. The interface is visually coherent.
4. The user journey is understandable.
5. Responsive behavior has been checked.
6. Accessibility has been addressed.
7. Loading, empty, error, and success states are handled.
8. Relevant tests have been executed.
9. No unrelated functionality has been broken.
10. All known limitations are disclosed.
11. The final implementation has been reviewed.
12. The completion report is evidence-based.

If any mandatory requirement is not satisfied, report the task as **PARTIALLY COMPLETE** or **BLOCKED**, not COMPLETE.

---

# 22. FINAL DIRECTIVE

Before every UI implementation, internalize this principle:

**FitMatch is a fashion-tech product, not a technical measurement dashboard.**

The consumer experience must be:

- Simple, not simplistic.
- Premium, not flashy.
- Intelligent, not intimidating.
- Transparent, not overwhelming.
- Personalized, not intrusive.
- Consistent, not repetitive.
- Accessible, not exclusive.
- Beautiful, but always functional.

The user should experience the intelligence of FitMatch without having to understand its engineering complexity.

**These rules apply to all existing and future FitMatch consumer screens, admin screens, components, and workflows. Follow them consistently. Do not silently omit, weaken, or reinterpret mandatory requirements.**

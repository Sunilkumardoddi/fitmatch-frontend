# FitMatch Frontend — Performance Engineering Standard

Version: 1.0  
Benchmark: Google Core Web Vitals  
Scope: Load Times, Bundle Size, and Runtime Efficiency

---

## 1. Core Web Vitals Targets

| Metric | Target | Rationale |
|---|---|---|
| **Largest Contentful Paint (LCP)** | $\le 2.0\text{ s}$ | Fast initial rendering of the size recommendation card. |
| **Interaction to Next Paint (INP)** | $\le 100\text{ ms}$ | Instant response when selecting fit preference or toggling measurement breakdown. |
| **Cumulative Layout Shift (CLS)** | $\le 0.05$ | Zero layout jumps when recommendation results load. |

---

## 2. Bundle Optimization & Progressive Disclosure

1. **Lazy Loading Heavy Modals:**
   - The `GuidedMeasurementModal` is dynamically loaded or rendered only when triggered by the user (`useState(isOpen)`).
   - Do not bundle unneeded third-party icon libraries. Import specific icons directly from `lucide-react` (e.g. `import { Check, Info, X } from 'lucide-react'`).

2. **Server-Side Rendering & Streaming:**
   - Keep page scaffolds rendered on the server.
   - Use React Suspense boundaries around dynamic brand charts.

3. **Font Loading Strategy:**
   - Use Next.js native font optimization or standard system font stacks (`-apple-system, BlinkMacSystemFont, Segoe UI...`) to eliminate external webfont network round-trips and FOIT/FOUT.


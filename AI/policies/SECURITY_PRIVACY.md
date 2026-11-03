# FitMatch Frontend — Security & Privacy Standard

Version: 1.0  
Compliance: Digital Personal Data Protection (DPDP) Act 2023  
Scope: Client-Side Data Handling, Token Storage, and User Privacy

---

## 1. Zero-Photo / Zero-Biometric Invariant

1. **No Camera or Image Uploads:**
   - FitMatch completely rejects photo-based body scanning. Do not include `<input type="file" accept="image/*">` or WebRTC camera streams.
   - Sizing recommendations must rely exclusively on voluntary numerical tape measurements.

2. **Body Neutrality as a Privacy Guarantee:**
   - Body measurements are classified as sensitive personal data under the DPDP Act 2023.
   - They must never be exposed in public URL query strings or logged to client telemetry/analytics.

---

## 2. Authentication & Session Security

1. **HttpOnly Cookie Architecture (ADR-011):**
   - Authentication tokens (`fitmatch_session`) must never be stored in `localStorage` or `sessionStorage` (which are vulnerable to XSS).
   - All session state is managed via secure, `httpOnly`, `SameSite=Lax` cookies set by the backend.

2. **Cross-Site Scripting (XSS) Prevention:**
   - Never use `dangerouslySetInnerHTML` without rigorous DOMPurify sanitization.
   - React's default JSX string escaping must be preserved.

3. **Cross-Site Request Forgery (CSRF):**
   - All mutating requests (POST, PUT, DELETE) include standard CSRF headers or rely on SameSite cookie isolation.


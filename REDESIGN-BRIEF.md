# IVR Pakistan — Website Rebuild Brief (for Claude in VS Code)

> Save this file in the repo root as `REDESIGN-BRIEF.md`. In VS Code, start with:
> **"Read REDESIGN-BRIEF.md and execute Phase 0 only. Do not write any code yet."**

---

## 0. Context

- **Project:** IVR Pakistan — interventional radiology clinic website (Karachi).
- **Repo:** `Faisal9029/IVRPakistan` — already live on Netlify.
- **Stack (do not add anything else without asking):** Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react, Sanity CMS.
- **Problem:** Recent local edits broke the structure — duplicate sections, inconsistent styling, components that don't compose. This is a **structural rebuild**, not a fresh `create-next-app`.

**Reference direction:** Pakistani specialist-clinic sites (e.g. irccpakistan.com) — match the *information architecture and UX patterns* of that category: authority-first hero, credential stats, procedure grid, trust signals, prominent booking CTA. Do **not** copy their colours, copy, imagery, or CSS. IVR Pakistan keeps its own blue-cyan glass identity.

---

## 1. Rules of engagement (non-negotiable)

1. **Never rewrite more than one section per turn.** One component → build passes → stop → report.
2. **Read before writing.** Open the existing file and reuse what works. No blind overwrites.
3. **Do not invent content.** No lorem ipsum, no fake doctor names, no fake reviews, no invented statistics. If a piece of content is missing, insert `{{ ASK_FAISAL: description }}` and list it in your report.
4. **Do not touch** `netlify.toml`, `.env*`, or the Sanity `SECRETS_SCAN_OMIT_KEYS` config. That deploy setup is working.
5. **Do not add dependencies.** If you believe one is required, stop and ask with a one-line justification.
6. **Check `package.json` before importing.** Framer Motion v11+ imports from `motion/react`, older versions from `framer-motion` — read the installed version, don't assume.
7. **Run `npx tsc --noEmit && npm run build` after every section.** A section is not done until both pass clean.
8. **Server Components by default.** `"use client"` only on files that actually use state, effects, or event handlers. Data fetching stays on the server.
9. If something in this brief conflicts with the existing codebase, **say so before proceeding**. Don't silently pick one.

---

## 2. Phase 0 — Audit (no code)

Produce a written report only:

- Full tree of `app/`, `components/`, `sanity/` (or equivalent).
- **Duplicates:** components rendering the same thing, or the same section mounted twice.
- **Dead files:** not imported anywhere.
- **Client/server violations:** `"use client"` where it isn't needed.
- **Styling drift:** hardcoded hex values, arbitrary Tailwind values (`w-[437px]`), competing spacing systems, `!important`.
- **Sanity layer:** which schemas exist, which queries exist, which components are hardcoded that should be CMS-driven.
- **Broken imports / type errors:** paste the actual `tsc` output.
- A proposed **delete list** and **keep list**, with one line of reasoning each.

End the report with: *"Approve the delete list to continue to Phase 1."* Then stop.

---

## 3. Design system contract (Phase 1)

Everything after this phase derives from these tokens. No component defines its own colours or spacing.

**Tailwind v4 is CSS-first** — configure in `app/globals.css` with `@import "tailwindcss";` and an `@theme` block. Do not create a `tailwind.config.js`.

Define in `@theme`:

- **Colour:** 5–6 named tokens only — deep clinical navy (primary text/surfaces), cyan accent (CTAs, active states), one soft neutral for card backgrounds, one muted grey for body copy, one success/positive tone for trust badges. Every colour in the app references a token. Dark mode via `class` strategy — the existing `ThemeToggle` must keep working.
- **Type:** two families max — a confident sans for headings (tight tracking, weight 600–700) and a highly readable body sans (weight 400, generous line-height). Define a 6-step scale. Medical audiences skew older: body text minimum 16px, mobile line-length under 70 characters.
- **Spacing & radius:** one scale, used everywhere. One card radius, one button radius, one shadow token for rest + one for hover.
- **Motion:** one shared `fadeInUp` variant + one `stagger` container variant in `lib/motion.ts`. Every section imports these — no per-file animation definitions. Duration 0.4–0.6s, ease-out, `viewport={{ once: true }}`. **Wrap all motion in `prefers-reduced-motion` handling.**

**Restraint rule:** the hero + stat counters are the one animated moment on the page. Below the fold, animation is a quiet fade-in only. A clinic site must feel calm and credible, not like a product launch.

**Quality floor, unstated but enforced:** responsive from 360px up, visible keyboard focus rings, semantic heading order (one `h1` per page), alt text on every image, colour contrast ≥ 4.5:1.

Deliverable for Phase 1: `globals.css` tokens + `lib/motion.ts` + a `/styleguide` route rendering every token, button state, and card variant. Then stop.

---

## 4. Component architecture contract

```
app/
  layout.tsx            # fonts, metadata defaults, ThemeProvider
  page.tsx              # home: imports sections, fetches Sanity data, passes as props
  (routes)/...
components/
  layout/               # Navbar, Footer, ThemeToggle
  sections/             # one file per homepage section
  ui/                   # Button, Card, Section, Container, Accordion — primitives only
lib/
  motion.ts  sanity.ts  utils.ts
```

Rules:
- Sections are **presentational**. They receive data via props. Sanity fetches happen in `page.tsx` / route segments.
- Every section wraps in a shared `<Section>` primitive that owns vertical rhythm. Individual sections never set their own `py-*`. This is what stops the spacing chaos from coming back.
- One export per file, named after the file.
- If a section needs interactivity, split it: `ServicesSection.tsx` (server) + `ServicesSectionClient.tsx` (client). This pattern already exists in the repo — follow it.

---

## 5. Build order (one phase per turn)

Each phase: build it → `tsc` + `build` pass → screenshot or describe the result → list any `ASK_FAISAL` gaps → stop.

| # | Section | Acceptance criteria |
|---|---------|---------------------|
| 2 | **Navbar + Footer** | Glass/frosted, sticky with scroll-state change. Links: Home, About, Services (dropdown), Blogs, Clinics, Contact. `tel:` links clickable, WhatsApp button, "Book Appointment" CTA. Mobile: full-screen drawer, closes on route change, body scroll locked. Footer: quick links, locations, contact, Google Maps link, socials, newsletter, privacy/terms, copyright. |
| 3 | **Hero** | `h1` credential-first headline, sub-line with the doctor's real qualifications, two CTAs, doctor photo (`next/image`, `priority`, correct `sizes`). Three stat counters animating on first view only, using real numbers — leave `ASK_FAISAL` if unknown. Must not shift layout (CLS 0). |
| 4 | **Expertise + Why Choose Us** | Large image + three expertise cards; three icon cards with real reasons (not generic "24/7 support" filler). lucide-react icons only. |
| 5 | **Services grid** | Sanity-driven. Card = image + title + 1–2 line description + "Know More". Hover: image zoom + card lift. Mobile: horizontal snap-scroll carousel with visible scroll affordance. Keep the existing dynamic-icon + category-filter logic. |
| 6 | **Category-wise services** | Two columns by category, each with image, short intro, bullet list. Only build if the categories exist in Sanity — otherwise flag it. |
| 7 | **Appointment form** | Fields: name, phone, message. Client-side validation with inline errors. Loading, success, and failure states — errors say what went wrong and how to fix it. Submit to a Next.js route handler that posts to WhatsApp API or email. Honeypot field for spam. Never expose secrets client-side. |
| 8 | **FAQ + Testimonials** | FAQ: accessible accordion (proper `button` + `aria-expanded`, keyboard operable), real clinical questions. Testimonials: Sanity-driven, pauses on hover/focus, keyboard-navigable. **No fabricated reviews.** |
| 9 | **Blog grid + media/TikTok row** | Latest posts from Sanity: image, date, title, excerpt, link. Reuse the existing `TikTokCarousel.tsx` — do not rebuild it. |
| 10 | **SEO + performance pass** | `generateMetadata` per route, canonical URLs, OG + Twitter tags, `MedicalClinic` + `FAQPage` JSON-LD schema, sitemap, robots. Then: audit bundle, remove unused `"use client"`, verify every image has width/height and `sizes`, confirm fonts are `next/font` with `display: swap`. |
| 11 | **Final QA** | Full-page check at 360 / 768 / 1440px. Keyboard-only walkthrough. Dark mode on every section. Zero console errors/warnings. Confirm Netlify build config untouched. |

---

## 6. Hard NOs

- No `localStorage`-dependent rendering that breaks hydration.
- No fabricated medical claims, cure rates, or success statistics — ever.
- No stock-photo "smiling doctor" placeholders passed off as the real team.
- No `any` types. No `@ts-ignore`.
- No inline styles for anything a token covers.
- No section that renders `null` silently when Sanity returns empty — render a real empty state.
- No new global CSS files.

---

## 7. Reporting format (every turn)

```
DONE: <what was built>
FILES: <changed / created / deleted>
BUILD: tsc ✅ | next build ✅
ASK_FAISAL: <content still needed, or "none">
NEXT: <the single next phase>
```

Then wait for approval.

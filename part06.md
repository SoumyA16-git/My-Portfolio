## 30. Performance Requirements

Premium must not mean slow. The concrete budgets are in §45; this section states the strategy that meets them.

### 30.1 Rendering strategy

- Every route is **prerendered to static HTML at build time** and hydrated. Content and layout are visible before JavaScript runs.
- The **LCP element is the hero headline (text), not an image.** The hero Plate loads eagerly at normal priority (≤ 80 KB AVIF at mobile size) but must never outrank the font in the network queue.
- Below-the-fold sections use `content-visibility: auto` with `contain-intrinsic-size` estimates that match real heights, so off-screen layout and paint are skipped without scroll jumps.
- Plates use `contain: layout paint`; the number of composited layers on screen stays ≤ 12.

### 30.2 Motion tiers

At load the site picks one tier and stores it on `<html data-motion="…">`:

| Tier | Conditions | Includes |
|---|---|---|
| **full** | Fine pointer, no reduced-motion request, `saveData` off, `deviceMemory` ≥ 4 (or unknown), `hardwareConcurrency` ≥ 4 | Everything in §25 incl. cursor, Lenis, tilt, parallax, pins, optional WebGL |
| **lite** | Touch device, or `saveData`, or `deviceMemory` ≤ 2, or a failed 20-frame benchmark | Reveals (600 ms), Plate-to-Page (700 ms), menu, magnetic **off**, cursor **off**, Lenis **off**, parallax **off**, pins **off**, WebGL **off** |
| **none** | `prefers-reduced-motion: reduce` or `?motion=off` | Static layout, 150 ms crossfades, native scroll |

`?motion=off` is also the deterministic mode for automated tests and screenshots.

### 30.3 Loading strategy

| Resource | Strategy |
|---|---|
| HTML | Prerendered, `Cache-Control: public, max-age=0, must-revalidate` |
| CSS | Single Tailwind-generated file, inlined critical rules only if it removes a render-blocking request; target ≤ 25 KB gzip |
| JS | Route-level code splitting (`Home`, `WorkArchive`, `CaseStudy`). Critical chunk: React, router, app shell, GSAP core, SplitText, ScrollTrigger. **Deferred until idle (`requestIdleCallback`, 1.5 s fallback):** Flip, Lenis, cursor module, analytics, WebGL |
| Fonts | §20.4. Only the sans WOFF2 is preloaded |
| Images | AVIF first, WebP fallback, JPEG last, via `<picture>`; explicit `width`/`height`; `loading="lazy"` and `decoding="async"` below the fold; `sizes` per §22.3 |
| Intent prefetch | On hover, focus or `touchstart` of a project link: prefetch route chunk and the 1600 px hero image |
| Third parties | One analytics script (`defer`, ≤ 3 KB), loaded after `load`. No embeds, no tag manager, no web-font CDN |
| Caching | Hashed assets: `public, max-age=31536000, immutable`. Brotli compression (Vercel default) |

### 30.4 Animation performance rules

1. `transform`, `opacity`, `clip-path` only. No layout-triggering properties in tweens.
2. Apply `will-change` immediately before an animation and remove it on complete. Never leave it set globally.
3. One `gsap.ticker` loop drives everything, including Lenis. No stray `requestAnimationFrame` loops.
4. Pointer effects use `quickTo`/`quickSetter` writing directly to elements. **No React state updates on pointer or scroll events.**
5. Batch DOM reads before writes. No `getBoundingClientRect` inside per-frame callbacks except through GSAP/ScrollTrigger internals.
6. Reveal triggers use ScrollTrigger `once: true`; observers are destroyed after use.
7. Pause and destroy everything on route change and when the tab is hidden.
8. No long tasks: SplitText and ScrollTrigger setup are chunked across frames if they exceed 50 ms on the reference device.

### 30.5 Mobile strategy

Mid-range Android is the reference device (Moto G Power-class, 4 GB RAM, throttled 4G). On mobile: no parallax, no pins, no smooth scroll, no cursor, no WebGL, shorter reveals, mobile-cropped smaller images, and Display sizes set by `vw` so no JavaScript is required to fit the hero.

### 30.6 Monitoring

Lighthouse CI on every pull request against §45 budgets; `size-limit` bundle guard; field Core Web Vitals via the `web-vitals` library sent as anonymous aggregate events to the analytics provider (no user identifiers).

---

## 31. SEO Requirements

### 31.1 Global

| Item | Requirement |
|---|---|
| Rendering | Every route prerendered; per-route `<title>`, meta description, canonical, Open Graph and Twitter tags present in the initial HTML (not injected after hydration) |
| Canonical | Absolute `https://[DOMAIN]/…`, no trailing slash, one canonical per route |
| Titles | ≤ 60 characters; pattern `[Page] | [NAME]` |
| Descriptions | 120–155 characters, unique per route, written for humans |
| Open Graph | `og:type=website`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (1200 × 630), `og:image:alt`, `og:locale=en_IN` **[INPUT: or en_US]** |
| Twitter/X | `twitter:card=summary_large_image`, title, description, image, image alt |
| Robots | `robots.txt` allows all, disallows `/api/`, references the sitemap |
| Sitemap | `sitemap.xml` generated at build from routes and published projects, with `lastmod` from `dates.updated` |
| Structured data | JSON-LD per §31.2 |
| Images | Every Plate has meaningful alt text (validated at build); OG images generated at build |
| Internal links | Capabilities "Seen in" links, Next project and breadcrumb create crawlable internal links |
| Social profiles | `rel="me"` on owned profile links; `sameAs` in JSON-LD |
| Performance | Core Web Vitals budgets (§45) are an SEO requirement |

### 31.2 Per-page recommendations

| Page | Title | Description | H1 | Structured data | OG image |
|---|---|---|---|---|---|
| **Home** `/` | "[NAME] | Web designer and developer" | "Independent web designer and developer. I design and build business websites, online stores, landing pages and web applications. Available for select projects." | "Websites with a point of view." | `WebSite`, `Person` (`name`, `jobTitle`, `url`, `sameAs`, `knowsAbout`) | Hero Plate + wordmark on Ink |
| **Archive** `/work` | "Selected work | [NAME]" | "Websites and web applications designed and built by [NAME]: [N] projects across e-commerce, business sites and custom tools." | "Work" | `CollectionPage` with `ItemList` of projects | Composite of first three Plates |
| **Case study** `/work/:slug` | "[Project]: [category] website | [NAME]" (or `seo.title` override) | `summary` extended to 120–155 chars, or `seo.description` | Project name | `CreativeWork` (`name`, `creator`, `dateCreated`, `about`, `url`, `image`), `BreadcrumbList` | Hero Plate + title |
| **404** | "Page not found | [NAME]" | "That page doesn't exist. Head back to the work or get in touch." | "That page doesn't exist." | none | Default site image |

Copy uses natural terms visitors search for ("web designer", "web developer", "e-commerce website", "business website") in headings, descriptions and Capabilities, never in stuffed lists.

---

## 32. Content Architecture

### 32.1 Principles

- Content lives in JSON files, typed and validated at build; components contain no literal copy except UI strings (labels, errors).
- **Nothing is invented.** Absent information is a placeholder that is visible in development and blocks production builds.
- Replacing content never requires touching component code.

### 32.2 Content files

| File | Purpose |
|---|---|
| `src/content/site.json` | Name, role, contact, availability, socials, about copy, capabilities, process, default SEO, contact copy |
| `src/content/projects.json` | All projects (§33) |
| `src/content/image-manifest.json` | Generated. Image dimensions, `placeholderColor`, available widths and formats |
| `public/assets/…` | Optimised images (generated) |
| `assets-src/…` | Original screenshots and photography (not deployed) |

### 32.3 `site.json` structure

```json
{
  "name": "[NAME]",
  "studioName": null,
  "role": "Web designer and developer",
  "email": "[EMAIL]",
  "domain": "[DOMAIN]",
  "location": { "city": "[CITY]", "country": "India", "timezone": "Asia/Kolkata", "showCity": false },
  "availability": { "status": "available", "label": "Available for select projects", "bookingFrom": "[MONTH 2026]", "replyTime": "[2 business days]" },
  "socials": [ { "network": "LinkedIn", "url": "[URL]" } ],
  "resume": { "label": "Download résumé (PDF)", "url": null },
  "hero": { "headline": ["Websites", "with a", "point of", "view."], "descriptor": "Independent web designer and developer. I design and build websites for businesses, brands and creatives.", "metadata": ["Web development, digital design", "2026", "India"] },
  "philosophy": { "statement": "…", "design": ["…", "…", "…"], "code": ["…", "…", "…"] },
  "capabilities": [ { "discipline": "Web", "items": [ { "name": "Business websites", "tag": "business-websites", "description": "…" } ] } ],
  "process": [ { "number": "01", "title": "Discover", "description": "…", "youGet": "…" } ],
  "about": { "lead": "…", "paragraphs": ["…"], "howIWork": ["…"], "tools": ["…"], "portrait": { "src": "about/portrait", "alt": "…" } },
  "contact": { "statement": ["Tell me", "what you're", "making."], "projectTypes": ["A new website", "A redesign", "An online store", "A web application", "Something else"] },
  "seo": { "titleTemplate": "%s | [NAME]", "defaultDescription": "…", "ogImage": "og/default" }
}
```

(This is a data shape, not implementation.)

### 32.4 Validation and placeholder policy

A build step `validate:content` (Zod) runs before every build:

| Rule | Development build | Production build |
|---|---|---|
| Any string matching `[NAME]`, `[CITY]`, `[EMAIL]`, `[DOMAIN]`, `[INPUT…]`, `[MONTH…]` | Warn; render visible `PLACEHOLDER` marker | **Fail** |
| Project with `"placeholder": true` | Render with a visible marker | **Fail** if `status` is `published` |
| Missing `alt`, `width`, `height` or `placeholderColor` on any image | Fail | Fail |
| Duplicate `slug` or `order` | Fail | Fail |
| `results.metrics[].verified !== true` while a number is present | Fail | Fail |
| More than 5 `featured` projects | Warn | Warn |
| Image file referenced but missing | Fail | Fail |
| Capability `tag` referenced by a project but not defined | Fail | Fail |

### 32.5 Editing workflow

1. Add or replace source images in `assets-src/projects/<slug>/`.
2. Run `npm run images` (generates responsive files and the manifest).
3. Edit `projects.json` or `site.json`.
4. Run `npm run validate:content` and `npm run dev` to review.
5. Merge; Vercel builds and deploys. Future option: MDX case-study bodies and a headless CMS behind the same JSON contract.

---

## 33. Project Data Schema

### 33.1 Example (placeholder values only)

```json
{
  "id": "prj_001",
  "slug": "project-slug",
  "status": "draft",
  "placeholder": true,
  "featured": true,
  "order": 1,
  "featureLayout": null,
  "title": "Project name",
  "client": null,
  "year": 2026,
  "category": "E-commerce",
  "role": ["Design", "Development"],
  "tools": ["React", "GSAP"],
  "capabilities": ["e-commerce", "front-end-build", "animation"],
  "summary": "One sentence of at most 22 words describing what the site does and for whom.",
  "overview": "Two or three sentences of context for the case study.",
  "links": { "live": null, "source": null },
  "images": {
    "thumbnail": {
      "src": "projects/project-slug/thumb",
      "alt": "Describe what is visible and why it matters.",
      "width": 1600, "height": 2000,
      "focal": { "desktop": [50, 40], "mobile": [50, 30] },
      "placeholderColor": "#1a1a19"
    },
    "hero": {
      "src": "projects/project-slug/hero",
      "alt": "…", "width": 2400, "height": 1350,
      "focal": { "desktop": [50, 50], "mobile": [40, 50] },
      "placeholderColor": "#1a1a19"
    }
  },
  "sections": [
    { "type": "text", "heading": "The problem", "body": "60–110 words." },
    { "type": "text", "heading": "The approach", "body": "…" },
    { "type": "plate", "layout": "offset", "image": { "src": "…", "alt": "…", "width": 1600, "height": 1000, "placeholderColor": "#1a1a19" }, "caption": "Short caption." },
    { "type": "gallery", "images": [ { "src": "…", "alt": "…", "width": 1200, "height": 800, "placeholderColor": "#1a1a19" } ] },
    { "type": "responsive", "desktop": { "src": "…", "alt": "…", "width": 1600, "height": 1000, "placeholderColor": "#1a1a19" }, "tablet": null, "mobile": null },
    { "type": "compare", "beforeLabel": "Before", "afterLabel": "After", "before": { "src": "…", "alt": "…", "width": 1600, "height": 1000, "placeholderColor": "#1a1a19" }, "after": { "src": "…", "alt": "…", "width": 1600, "height": 1000, "placeholderColor": "#1a1a19" } },
    { "type": "list", "heading": "Features", "items": [ { "name": "Feature", "note": "One line." } ] },
    { "type": "challenges", "items": [ { "challenge": "…", "response": "…" } ] },
    { "type": "result", "body": "Qualitative statement.", "metrics": [] }
  ],
  "seo": { "title": null, "description": null, "ogImage": null },
  "dates": { "published": null, "updated": null }
}
```

### 33.2 Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | Yes | Stable identifier, never reused |
| `slug` | string | Yes | Lowercase kebab-case, unique, becomes `/work/:slug`. Immutable once published; if it must change, add a 301 in `vercel.json` |
| `status` | `"draft"` \| `"published"` | Yes | Only `published` projects are rendered, in the sitemap and in the Archive |
| `placeholder` | boolean | Yes | `true` blocks production if published (§32.4) |
| `featured` | boolean | Yes | Featured projects appear as Features on Home (max 5) |
| `order` | integer | Yes | Ascending; unique. Displayed index numbers (`01`…) derive from position in the sorted published list at build time |
| `featureLayout` | `"v1"`…`"v6"` \| null | No | Overrides the default rotation (§12.2) |
| `title`, `year`, `category` | string, integer, string | Yes | Category is plain language ("E-commerce", "Business website") |
| `client` | string \| null | No | Omit when the client cannot be named |
| `role`, `tools` | string[] | Yes | Facts only; no proficiency levels |
| `capabilities` | string[] | Yes | Tags from `site.json → capabilities[].items[].tag`. Drives "Seen in" |
| `summary` | string | Yes | ≤ 22 words |
| `overview` | string | Yes | 2–3 sentences |
| `links.live`, `links.source` | URL \| null | No | `live` gets a tracked "Visit live site ↗" link |
| `images.thumbnail` | Image | Yes | Used by Features, Archive preview, OG fallback. Aspect 4:5 recommended |
| `images.hero` | Image | Yes | Case-study hero, aspect 16:9 |
| `images.mobileHero` | Image | No | Alternate mobile crop if a focal point is not enough |
| `sections` | Section[] | Yes | Ordered blocks (§33.3). Optional blocks may be omitted |
| `seo.*` | string \| null | No | Overrides |
| `dates.*` | ISO date | Published: yes | Used for `lastmod` and structured data |

**Image object:** `src` (logical key, not a file path), `alt` (required, non-empty unless `decorative: true`), `width`, `height` (source pixel dimensions), `focal.desktop` and `focal.mobile` (percent x, y for `object-position`), `placeholderColor` (hex; generated by the image script), optional `treatment: "color" | "mono"` (default `color`).

### 33.3 Section block types

| `type` | Renders as | Layout notes |
|---|---|---|
| `text` | H3 + paragraph in cols 5–9 | Optional `caption` in margin cols 10–12 |
| `plate` | One Plate; `layout`: `offset`, `full`, `pair` | `pair` takes two images |
| `gallery` | Screens (horizontal) | 4–8 images |
| `responsive` | Desktop, tablet, mobile Plates, or a Rotato export via `deviceTriplet` | Shown once per case study |
| `compare` | Before/after slider | Redesign projects only |
| `list` | Typographic list with rules | Features or Development notes |
| `challenges` | Two-column list | 2–4 items |
| `result` | Text; optional `metrics` `[ { label, value, verified: true, source } ]` | Numbers require `verified: true` |

### 33.4 Image references and routing

- `src` is a logical key resolved through `image-manifest.json` to `/assets/<key>-<width>.<format>`; the manifest supplies widths and formats to build `srcset`.
- Routes: `/work/:slug`. Unknown slug → 404 (prerender emits 404 for unpublished slugs).
- **Ordering:** by `order` ascending. **Featured:** `featured: true`, first five by `order`. **Next project:** the next published project by `order`, wrapping to the first.

### 33.5 Adding a new project

1. Add source images to `assets-src/projects/<slug>/` (naming: `thumb`, `hero`, `01…nn`).
2. `npm run images`.
3. Append an object to `projects.json` with `status: "draft"`, a unique `slug`, `order` and every required field.
4. Write sections; add capability tags.
5. Run `npm run validate:content`; fix reported problems.
6. Preview; set `placeholder: false`, `status: "published"`, `dates.published`; commit.

---

## 34. MCP Component Research & Adaptation Strategy

### 34.1 Position

The component ecosystem is **raw material**. It is used for discovery, comparison, prototyping, animation ideas, accessible primitives and complex interaction patterns. It is never used to determine the look of the site. The look is defined by this PRD (§19–23); a component earns a place only after it has been stripped of its original identity and rebuilt on the tokens.

Note the author disclosure at the top: the pre-selections in §35 are hypotheses to be validated by the research pass below.

### 34.2 The process (Phase 0, before any component is built)

| Step | Action | Output |
|---|---|---|
| 1. Identify | For each row of §35, restate the need as an interaction or component requirement | Requirement list |
| 2. Search | Query the MCP libraries (plan in §34.3). Capture 2–5 candidates per need with source, license, dependencies, demo behaviour | Candidate notes |
| 3. Compare | Evaluate candidates against: visual fit, performance, accessibility, mobile support, customisation, consistency with GSAP-only motion, technical complexity | Comparison table per need |
| 4. Select | Choose the most suitable candidate, or decide to build from scratch if none passes the Admission Test | Decision |
| 5. Adapt | Rebuild on tokens (§34.5) | Component in `src/components/` |
| 6. Strip identity | Run the identity audit (§34.6) | Sign-off |

### 34.3 Search plan

| Need | Search terms | Query first | What to look for |
|---|---|---|---|
| Accessible primitives (dialog, label, slider, visually-hidden, slot) | dialog, sheet, slider, label, visually hidden | Radix UI, shadcn/ui | Focus management, ARIA correctness, unstyled or easily re-styled |
| Line-mask text reveal | split text, text reveal, mask reveal, text effect | React Bits, Motion-Primitives, Animate UI, GSAP docs | Line-level masks, a11y handling, GSAP compatibility |
| Magnetic interaction | magnetic, magnet button, attractor | React Bits, Motion-Primitives, Design Spells | Pointer math, release behaviour, touch handling |
| Cursor and image preview | custom cursor, follow cursor, image trail, hover reveal, link preview | React Bits, Aceternity UI, Design Spells, Skiper UI | State model, performance of the follow loop, unmount cleanup |
| Image reveal and tilt | clip-path reveal, image reveal, tilt card, parallax image | Motion UI, Aceternity UI, React Bits | Crop handling, transform-only implementation |
| Shared-element transition | shared layout, flip, page transition | GSAP (Flip demos), Motion UI, Skiper UI | Crop interpolation, route integration |
| Sticky / pinned / horizontal scroll | sticky scroll, pinned section, horizontal scroll | GSAP demos, Skiper UI, Aceternity UI | Mobile fallback, reduced-motion path |
| Comparison slider | compare, before after | Aceternity UI, Radix Slider | Keyboard support, ARIA `slider` semantics |
| Form controls | input, textarea, select, field, validation | shadcn/ui, Radix, HeroUI, Untitled UI | Native semantics, error association |
| Shader and WebGL references | displacement, distortion, image shader, hover effect | Three.js Components/Templates/Interactive Shaders | Small shaders, dispose logic |
| Device presentation | device mockup, 3D screen | Rotato | Static export quality |
| Micro-interaction timing | button, hover, underline, focus | Motion UI, Animate UI, Design Spells, UI Guideline, Iteration UX | Durations and easings as reference only |
| Backgrounds and decoration | background, gradient, blob, wave, particles | Haikei, HorizonX, AI Particle Simulator, Vengeance UI | Searched **to confirm rejection** (§34.4) |

### 34.4 Selected, customised, rejected

| Outcome | Items | Why |
|---|---|---|
| **Selected as structural base** | Radix Dialog (menu), Radix Slot/`asChild`, Radix VisuallyHidden, Radix Label; shadcn scaffolds only for those | Accessibility is hard to get right; these are unstyled and small |
| **Selected as reference, rebuilt** | Magnetic (Motion-Primitives / React Bits), text-mask reveals (React Bits / Motion-Primitives), cursor follow and image preview (React Bits / Aceternity / Design Spells), tilt (React Bits / Aceternity), shared layout ideas (Motion UI / Skiper UI), comparison slider (Aceternity, plus Radix Slider semantics) | The interaction ideas are sound; the implementations bring their own visual identity, a second animation engine or card styling. Rebuilt on GSAP and tokens |
| **Custom from scratch** | Plate, Grid, Feature compositions, Process pin, Screens gallery, Capabilities blocks, Archive rows, Contact form | No library component matches the composition; these *are* the design system |
| **Rejected: identity conflict** | HeroUI, MUI, daisyUI, Untitled UI (as UI kits) | Ship a complete visual language (radii, shadows, colour systems, ripple) and theme layers that conflict with the token system |
| **Rejected: brief conflict** | AI Particle Simulator, Haikei backgrounds, HorizonX and Vengeance UI decorative components, Aceternity spotlight/aurora/beam backgrounds, React Bits splash/blob backgrounds, looping marquees | Particle fields, blobs, gradients and decorative loops are forbidden (§3.4) |
| **Reference only** | Design Spells, UI Guideline, Iteration UX, Skiper UI, Animate UI, Motion UI | Timing values, interaction ideas, pattern checks |
| **Not from the ecosystem, added deliberately** | Lenis (smooth scroll) | Tiny, standard companion to GSAP ScrollTrigger; ScrollSmoother is heavier and transforms the page container |

### 34.5 Admission Test (a component must pass all)

1. Renders correctly using **only** project tokens; no hard-coded colours, radii, shadows or fonts remain.
2. Adds **no new animation engine**. Motion is GSAP or CSS transitions on tokens.
3. Keyboard operable and screen-reader correct (verified, not assumed).
4. Has a defined touch behaviour and a reduced-motion behaviour.
5. Adds ≤ 5 KB gzip, or the addition is justified in the decision log.
6. Adds no new runtime dependency unless justified in the decision log.
7. Contains no visual trait that identifies its origin library.

### 34.6 Adaptation checklist and identity audit

**Adaptation:** copy the source into `src/components/` (owned code, licence permitting, with a licence/attribution comment); convert to TypeScript strict; delete unused variants and props; replace every colour, radius, shadow and font with tokens; replace easings and durations with §25 tokens; move any animation to GSAP; add `data-cursor` attributes; add focus, touch and reduced-motion paths; verify at 320, 768, 1440.

**Identity audit** (after each integration and again before launch): screenshot each section at desktop and mobile and confirm nothing looks recognisably like: Aceternity spotlight/beam/aurora effects, default shadcn card and muted greys, HeroUI or MUI rounded surfaces and ripples, daisyUI theme utilities, React Bits stock backgrounds and text presets, or Untitled UI's SaaS chrome. Any hit is restyled or removed.

**Decision log:** each component gets an entry in `docs/component-decisions.md`: need, candidates considered, choice, reasons, what was stripped, dependencies added (target: zero), bundle delta.

---

## 35. Component Selection Matrix

Pre-selections for validation under §34. Each row: **best candidate → alternatives → why → adaptation → performance**.

| Requirement | Best candidate | Alternatives | Why | Adaptation needed | Performance notes |
|---|---|---|---|---|---|
| Header / navigation | **Custom** using Radix `Slot` | shadcn navigation-menu, HeroUI Navbar, Untitled UI header | Three links need no nav component; libraries add mega-menu machinery | Fixed header, scroll-spy, hide/show, paper theme switching | No dependency |
| Full-screen menu (accessible overlay) | **Radix Dialog** (via shadcn sheet scaffold) | HeroUI Modal, MUI Drawer | Proven focus trap, `aria-modal`, Esc, scroll lock | Remove default animation classes and shadows; GSAP clip-path open/close | Radix Dialog is small; loaded with the header |
| Dialogs generally | Radix Dialog | shadcn Dialog wrapper | Same | Same | Same |
| Buttons | **Radix Slot + custom Button** (shadcn structure as scaffold) | Untitled UI, HeroUI Button | Two variants only; libraries ship variants and sizes that would need deleting | Pill shape, fill wipe, magnetic hook | Negligible |
| Magnetic behaviour | **Custom GSAP hook** | Motion-Primitives Magnetic, React Bits Magnet | ~30 lines; avoids a second animation engine | Radius 120 px, strength 0.3, max 10 px, disabled on touch and reduced motion | `quickTo`, no React state |
| Hero text reveal | **GSAP SplitText** (line masks) | React Bits SplitText, Motion-Primitives TextEffect, Animate UI | Line masks with precise control; built-in ARIA handling; same engine as everything else | Wrap in `SplitLines` behaviour; re-split after fonts and on resize | ~7 KB gzip; runs after `fonts.ready` |
| Other text effects | **Custom CSS/GSAP** (underline draw, mask roll) | React Bits, Motion-Primitives | Effects are small and must match §26 | Tokenised timings | CSS only where possible |
| Hero Plate tilt and parallax | **Custom GSAP `quickTo`** | React Bits TiltedCard, Aceternity 3D Card | Library versions add glare, shadows and card chrome | ±4°, perspective 1200 px, damped 600 ms | Fine pointer only |
| Custom cursor | **Custom** | React Bits Target/Splash Cursor, Design Spells references | Needs the six-state model in §27; splash/fluid cursors are gimmicks | State machine via `data-cursor` | Two `quickTo`/`quickSetter` loops |
| Archive hover preview | **Custom GSAP** | React Bits Image Trail, Aceternity Following Pointer / Link Preview | One image, defined states and focus equivalent | 320 × 400 Plate, clip reveal 450 ms | One element; preloaded thumbnails |
| Plate reveal (clip-path) | **GSAP** | Motion UI, Aceternity image reveals | Consistent easing and engine | Tokens; `once: true` | Transform/clip-path only |
| Plate-to-Page shared element | **GSAP Flip** + fixed transition layer | Motion `layoutId`, View Transitions API | Crop interpolation and fallback control; same engine; Flip cross-browser | Overlay layer, crop morph, fallbacks (§26.2) | Flip loaded on idle (~8 KB gzip) |
| Smooth scroll | **Lenis** (fine pointer, full tier only) | GSAP ScrollSmoother, native | Tiny, integrates with ScrollTrigger via ticker | Off on touch and reduced motion; `lenis.stop()` for overlays | ~3 KB gzip |
| Pinned Process | **GSAP ScrollTrigger** (custom) | Skiper UI sticky patterns, Aceternity sticky scroll | Numeral roll and progress rule are bespoke | Mobile stacked fallback | Pin only ≥ 1024, motion allowed |
| Horizontal Screens gallery | **ScrollTrigger pin + native scroll-snap fallback** | Aceternity / React Bits carousels | Carousels bring card styling and drag physics we don't want | Peek affordance, keyboard scroll | Disabled on touch and reduced motion |
| Comparison slider | **Custom on Radix Slider semantics** | Aceternity Compare | Correct `role="slider"` keyboard behaviour | Clip-path divider, 44 px handle | Single element clip |
| Forms | **Native controls + Radix Label + Zod** | shadcn Form (react-hook-form), HeroUI Input, Untitled UI | Five fields do not justify a form library; native `<select>` is best on mobile | Bottom-rule fields, error pattern | Saves ~10 KB vs form library |
| Toasts / notifications | **None** (`role="status"` text) | Sonner, shadcn Toast | Nothing needs a toast | — | — |
| Icons | **Two inline SVGs** (Lucide-derived) | Untitled UI icons, react-icons | Only two glyphs exist | 1.5 px stroke | Zero runtime dependency |
| Background SVG | **None** | Haikei | Blobs, waves and gradients are forbidden (§3.4) | — | — |
| Shader Plate (Phase 5) | **Three.js** (single plane + ShaderMaterial), lazy | OGL (approved substitute if chunk > 150 KB gzip), Three.js Components/Shader templates as references | Justified only as an enhancement to the hero Plate | §37 | Dynamic import, render-on-demand |
| 3D device presentation | **Rotato static exports** (AVIF) | Three.js device models | Rendered offline; zero runtime cost | One triplet per case study at most | Image only |
| Micro-interactions | **CSS transitions + GSAP** | Motion UI, Animate UI, Motion-Primitives | References for timing only | Tokens | Cheap |
| Scroll-spy | **Custom IntersectionObserver** | Library scrollspy hooks | ~20 lines | Paper theme aware | Negligible |
| Skip link, visually hidden text | Radix VisuallyHidden / custom CSS | — | Standard | — | — |
| Layout grid | **Custom Grid primitive** (Tailwind + CSS Grid) | UI kit grids | Must match §22 exactly | — | — |
| Design guidance | Design Spells, UI Guideline, Iteration UX | — | Reference for patterns and checklists | — | — |

---

## 36. GSAP Strategy

### 36.1 Versions and plugins

- Pin exact versions of `gsap` and `@gsap/react` in Phase 0 and verify plugin APIs against the docs at that time. Plugins used: **ScrollTrigger**, **SplitText**, **Flip**, **CustomEase**. (GSAP and its plugins are free to use; verify current terms when pinning.)
- Not used: ScrollSmoother, MorphSVG, Draggable (drag interactions use pointer events), GSDevTools in production.
- All registration happens once in `src/motion/gsap.ts`; nothing else imports from `gsap` directly except `src/motion/*`.

### 36.2 React integration

| Rule | Detail |
|---|---|
| Hook | `useGSAP` with a `scope` ref per component; all tweens and ScrollTriggers created inside the hook so cleanup is automatic |
| Event handlers | Wrapped with `contextSafe` when they create tweens |
| No React state for animation | Pointer/scroll positions never enter React state |
| Server-side rendering | No `window`, `document`, or GSAP calls at module top level; plugins register in a client-only module guarded by `typeof window` |
| Strict Mode | Every effect must be idempotent under double-invocation |

### 36.3 `matchMedia` contract

One `gsap.matchMedia()` instance per major behaviour, using these conditions:

| Name | Condition |
|---|---|
| `motion` | `(prefers-reduced-motion: no-preference)` |
| `fine` | `(hover: hover) and (pointer: fine)` |
| `desktop` | `(min-width: 1024px)` |
| `tablet` | `(min-width: 768px) and (max-width: 1023px)` |
| `mobile` | `(max-width: 767px)` |

Everything animated is created inside a branch that combines `motion` with the relevant others (e.g. Process pin: `motion` and `desktop` and `fine`). Leaving a condition reverts everything created in it.

### 36.4 Timelines and naming

- One master timeline per signature moment: `hero.intro` and `route.plateToPage`. Others are single tweens or small timelines.
- Labels use `area.event` naming (`hero.linesIn`, `route.flip`). Durations and eases come only from `src/motion/tokens.ts`, which mirrors §25.4 and the CSS variables.

### 36.5 ScrollTrigger configuration

- `ScrollTrigger.config({ ignoreMobileResize: true })`; `invalidateOnRefresh: true` on pinned triggers; `anticipatePin: 1` on the Process pin.
- Refresh once after `document.fonts.ready` and once after above-fold images have decoded; further refreshes only on width changes (debounced 150 ms) or after Plate images resolve.
- Reveal triggers: `start: "top 75%"`, `once: true`. Pins: `pinSpacing: true`, no `snap`. All triggers have explicit `id`s.
- `normalizeScroll` is not used.

### 36.6 Lenis synchronisation

Create Lenis only in `fine` + `motion` + full tier. Drive it from `gsap.ticker` (`lenis.raf(time * 1000)`), set `gsap.ticker.lagSmoothing(0)`, and update ScrollTrigger from Lenis' `scroll` event. Stop Lenis when the menu overlay opens or during Plate-to-Page; destroy on unmount. Route changes reset scroll with `lenis.scrollTo(0, { immediate: true })` (or `window.scrollTo` when Lenis is absent).

### 36.7 SplitText

Use lines with `mask: "lines"`, `autoSplit: true` and an `onSplit` callback so the reveal builds after every re-split; run after `document.fonts.ready`. Only Display, H1 and H2 elements are ever split. Rely on built-in ARIA handling (§29.1).

### 36.8 Flip

Used for Plate-to-Page and the Phase 5 Archive gallery morph only. State is captured in a click handler wrapped with `contextSafe`; the transition layer lives in a portal at the app root; the sequence and fallbacks are exactly §26.2.

### 36.9 Pointer effects

Cursor, tilt, magnetic, counter-parallax and Archive preview use `gsap.quickTo` per axis (or `quickSetter` for the exact-follow dot), created once and reused; inputs come from a single `pointermove` listener (passive) per behaviour.

### 36.10 Files and testing hooks

`src/motion/` contains `gsap.ts`, `tokens.ts`, `tier.ts` (motion tier detection), `hero.ts`, `plateToPage.ts`, `reveal.ts`, `cursor.ts`, `magnetic.ts`, `smoothScroll.ts`, `process.ts`, `gallery.ts`. `?motion=off` forces the `none` tier for deterministic tests and screenshots; `?motion=lite` forces `lite`.

---

## 37. Three.js / WebGL Strategy

### 37.1 Status and rule

WebGL is an **optional Phase 5 enhancement**. The site must be complete, polished and shippable without it, and the WebGL element must be removable by deleting one component with no layout change.

### 37.2 The single permitted use

The hero Plate becomes a WebGL surface that responds physically to the pointer, so the "digital object" feels tangible.

- **Why it earns its place:** the Plate *is* the work; giving it a subtle physical response strengthens the concept without introducing unrelated imagery.
- **Not permitted:** spheres, cubes, particle fields, noise backgrounds, floating meshes, WebGL on any other section, WebGL page transitions, or 3D device models.

### 37.3 Implementation constraints

| Aspect | Requirement |
|---|---|
| Loading | Dynamic `import()` after first paint and `requestIdleCallback`; never in the critical chunk; chunk ≤ **150 KB gzip** (substitute OGL if exceeded) |
| Scene | One plane, one texture (the hero image, max 1024 px long side), one `ShaderMaterial`; no lights, no post-processing |
| Shader behaviour | Soft displacement of UV coordinates driven by smoothed pointer position and velocity; amplitude ≤ 0.02 UV; decays to exactly zero when idle so the resting frame is pixel-identical to the DOM Plate. **No chromatic aberration, glow, noise overlay or colour shifts** |
| Rendering | Render-on-demand: render only while displacement > 0 or the pointer is moving; stop the loop when settled. Pause when off-screen (IntersectionObserver) or the tab is hidden |
| Resolution | Device pixel ratio clamped to 1.5 |
| Capability check | WebGL2 available, `full` motion tier, fine pointer, viewport ≥ 1024 px, and a 20-frame benchmark averaging ≤ 20 ms. Any failure keeps the DOM Plate |
| Handover | Canvas is inserted over the DOM `<img>` (which stays in the DOM for SEO and accessibility) and becomes visible only after its first frame renders identically to the image |
| Failure | Handle `webglcontextlost` and shader compile errors by removing the canvas and leaving the DOM Plate; log an anonymous analytics event, no user-facing error |
| Memory | ≤ 32 MB texture and buffers; dispose geometry, material, texture and renderer on unmount and route change |
| Frame budget | ≤ 4 ms GPU and ≤ 2 ms main thread per frame on the reference device |
| Fallback | The DOM Plate with tilt (§11.5) is the designed experience for everyone else |
| Mobile | Disabled |
| Reduced motion | Disabled |
| Shipping gate | Ship only if LCP, INP and CLS budgets still hold with it enabled and side-by-side review shows it adds tangible value. Otherwise remove |

---

## 38. Asset Strategy

### 38.1 Presentation treatments

| Treatment | Where | Rule |
|---|---|---|
| **Cropped editorial screenshot** (default) | Features, Archive preview, hero Plate | Full colour, tight crop on the most characteristic region of the interface; per-breakpoint focal points |
| **Full-bleed** | V3 Feature, case-study hero, Next project | Edge to edge inside the grid rules; never stretched |
| **Layered composition** | V5 and V6 only | Two Plates max, overlapping by ≤ 15 % |
| **Monochrome** | Portrait only | `grayscale(1) contrast(1.05)` |
| **Device presentation** | Case study "Responsive views" only | Rotato static export; one per case study; neutral device, Ink background, consistent lighting. Not used on Home |
| **Browser frames** | **Never** | Frames make the site read like a mockup catalogue |
| **Comparison** | Redesign projects | Before/after slider |
| **Subtle masks / hover displacement** | Hero Plate (Phase 5 shader) only | No other displacement |

### 38.2 Capture guidelines

- Capture at 1440 × 900 @2x for desktop and 390 × 844 @3x for mobile, lossless PNG. Use real content and a consistent browser state (no extensions, no cookie banners, no dev tools).
- Capture the states that show craft (typography, layout, hover states, responsive behaviour), not just the landing view.
- Crop to composition, not to the browser viewport. The mobile crop is a separate art-directed image or focal point, not an afterthought.
- Only show work the owner is entitled to show (**[INPUT]**: client permission and NDAs).

### 38.3 Image pipeline

`npm run images` (Sharp): for every source in `assets-src/`, output AVIF (quality ≈ 55), WebP (≈ 75) and JPEG (≈ 78 progressive, fallback) at widths 480, 768, 1200, 1600, 2400 (never upscaling), strip metadata, compute `placeholderColor` (average colour), and write dimensions to `image-manifest.json`. Filenames are content-hashed.

| Budget | Value |
|---|---|
| Hero Plate at mobile size (AVIF) | ≤ 80 KB |
| Feature Plate (AVIF, 1600 w) | ≤ 200 KB |
| Case-study body Plate (AVIF, 1600 w) | ≤ 220 KB |
| Full-bleed (AVIF, 2400 w) | ≤ 380 KB |
| Archive preview (AVIF, 640 w) | ≤ 50 KB |

### 38.4 Other assets

- **Favicon:** SVG (monogram or wordmark initial) with `prefers-color-scheme` variants, plus a 180 px Apple touch icon and a 32 px PNG fallback.
- **OG images:** generated at build (Satori or Sharp composition) at 1200 × 630 from the hero Plate and title.
- **Video:** none in v1. If added to a case study later: muted, looping, ≤ 1 MB, MP4/WebM, `preload="none"`, with a poster Plate, never in the hero.
- **Placeholders:** neutral tonal Plates with a visible "Placeholder" label at the correct aspect ratios; they exist only in development.
- **Résumé PDF:** owner-supplied **[INPUT]**, ≤ 300 KB.

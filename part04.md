## 19. Visual Design System

### 19.1 Foundations

| Foundation | Decision |
|---|---|
| Colour | Ink / Surface / Bone plus one Ultramarine accent (§21) |
| Typography | Instrument Sans (variable, weight + width axes) and Newsreader (statements only) (§20) |
| Spacing | 4 px base scale, 12 steps (§23) |
| Radius | `--radius-plate: 4px`, `--radius-field: 4px`, `--radius-pill: 999px` (buttons, cursor). Nothing else is rounded. No 12/16/24 px "card" radii anywhere |
| Borders | `--border-hairline: 1px solid var(--color-border)`. Used only for Rules (index rows, list rows, form fields, outline button) |
| Shadows and elevation | **None.** Elevation is expressed by surface tone: Ink (0) → Surface (1) → Surface-2 (2). Overlays use a flat scrim `rgba(10,10,10,0.72)`; no blur, no glow |
| Motion | Tokens in §25: three easings, five durations |
| Iconography | Only two glyphs exist: `arrow-up-right` (external link marker) and `x` (menu close). Inline SVG, 1.5 px stroke, sized `0.75em` (arrow) and 24 px (close). No icon library is imported at runtime; SVGs are copied from Lucide into `components/ui/icons` |
| Focus | 2 px solid `--color-focus`, 3 px offset, on every interactive element (§29) |
| Selection | Background Ultramarine, text Ink |
| Z-index scale | Content 1–10, sticky facts 20, header 800, menu overlay 900, cursor 1000, skip link 1100 |

### 19.2 The Plate (image object)

One component used for every image on the site.

| Property | Spec |
|---|---|
| Aspect ratios | `4:5`, `1:1`, `16:10`, `16:9`, `21:9`; ratio fixed by the component, never by the image |
| Radius | 4 px; container `overflow: hidden` |
| Edge | `outline: 1px solid rgba(243,241,236,0.08)` offset −1 px so dark images do not dissolve into Ink |
| Placeholder | Flat `placeholderColor` from the image manifest until decoded; no blur-up, no spinner |
| Crop | Per-image focal point per breakpoint (`object-position`). Mobile crop is a first-class field |
| Treatments | `color` (all project imagery) and `mono` (portrait only): `grayscale(1) contrast(1.05)` |
| Reveal | `clip-path: inset(100% 0 0 0)` → `inset(0)`; inner image scale 1.15 → 1 |
| Pointer response (fine pointer) | Tilt (hero only), counter-parallax (≤ 8 px), scale to 1.03 on hover |
| Captions | Outside the Plate, Small size, secondary colour. Type never sits inside a Plate except in V4 where it overlaps by design |
| Failure state | Solid `placeholderColor` with no broken-image icon; alt text still present in DOM |

### 19.3 Patterns

| Pattern | Definition | Used in |
|---|---|---|
| **Project reveal** | Plate reveal on entering the viewport, once | Features, Screens, case-study body |
| **Section transition** | Hard edges. No crossfades or gradients between sections. The only surface change is Ink → Bone at Contact | Whole page |
| **Image reveal** | The Plate reveal above | Everywhere |
| **Text reveal** | SplitText line masks, translate-up 110% → 0. **Display and H1/H2 lines only**, once on entering. Body text never animates | Hero, Contact, Philosophy headline, H1 on case studies |
| **CTA interaction** | Pill fill wipes up from the bottom (300 ms, `--ease-standard`), label colour inverts; magnetic pull on fine pointers | Nav Contact pill, Send message |
| **Page transition** | Plate-to-Page (project routes) or 250/450 ms fade (all other routes) | Router |

---

## 20. Typography System

### 20.1 Families

| Role | Family | Why | Notes |
|---|---|---|---|
| Primary (all sans roles) | **Instrument Sans**, variable, axes `wght` 400–700, `wdth` 75–100 (Google Fonts, OFL) | High x-height, neutral but with subtle character in the caps and figures; the **width axis** lets one file produce condensed display lines that fit four-word headlines at mobile widths | Self-hosted WOFF2, Latin subset. Use weights 400, 500, 600 only |
| Secondary | **Newsreader**, roman only, `opsz` axis instanced (Google Fonts, OFL) | A calm text serif with real optical sizes; sits well under a condensed grotesk; not currently a "trend" serif | Used **only** for the Philosophy statement and the About lead. Subset and instanced to the weight-400 optical range; italic is not loaded |

Not used: monospace, display/decorative fonts, a third family.

**Verification step (Phase 0):** confirm the shipped Instrument Sans file actually includes both `wght` and `wdth` axes and that tabular figures (`tnum`) are available. If tabular figures are missing, set index numbers in fixed-width containers. If the width axis is unavailable through the chosen distribution, fall back to static "Instrument Sans Condensed" instances where available, otherwise reduce Display size by ≈ 12 % and re-check the mobile fit rule.

### 20.2 Type scale

| Role | Token | Family / weight / width | Desktop (1440) | Mobile (390) | Tracking | Notes |
|---|---|---|---|---|---|---|
| **Display** | `--text-display` | Sans 600, wdth 84 (78 mobile) | 168 px / 0.88 | 80 px / 0.90 | −0.035em desktop, −0.03em mobile | Uppercase. Hero and Contact only. See scale table below |
| **H1** | `--text-h1` | Sans 600, wdth 88 | 96 px / 0.95 | 44 px / 1.0 | −0.035em / −0.03em | Sentence case. Project names, case-study titles, Capabilities discipline names |
| **H2** | `--text-h2` | Sans 600, wdth 92 | 56 px / 1.0 | 32 px / 1.05 | −0.03em / −0.025em | Section headings ("Selected work", "Process") |
| **H3** | `--text-h3` | Sans 500, wdth 100 | 28 px / 1.15 | 22 px / 1.2 | −0.015em / −0.01em | Capability items, case-study block headings |
| **Lead** | `--text-lead` | Sans 400 | 22 px / 1.4 | 18 px / 1.45 | −0.005em | Hero descriptor, case-study overview |
| **Body** | `--text-body` | Sans 400 | 17 px / 1.55 | 16 px / 1.55 | 0 | Max measure 62 ch |
| **Small** | `--text-small` | Sans 400 | 14 px / 1.5 | 14 px / 1.5 | +0.005em | Captions, form help |
| **Metadata** | `--text-meta` | Sans 500, uppercase, tabular figures | 12 px / 1.3 | 12 px / 1.3 | +0.04em | Category, year, index numbers, hero metadata row. Never below 12 px |
| **Label** | `--text-label` | Sans 500, sentence case | 13 px / 1.2 | 13 px / 1.2 | +0.01em | Form labels |
| **Navigation** | `--text-nav` | Sans 500, sentence case | 15 px / 1 | 15 px / 1 | 0 | Header links. Menu overlay links use 44 px / 1.0, weight 600, wdth 88, −0.03em |
| **Statement** | `--text-statement` | Newsreader 400 | 40 px / 1.2 | 26 px / 1.25 | −0.01em / −0.005em | Serif rule: slightly more line-height than sans; max 24 em |
| **Numeral** | `--text-numeral` | Sans 600, wdth 78 | 34 vw / 0.8 (≈ 490 px) | 120 px / 0.85 | −0.05em | Process step numerals |

**Display size by breakpoint** (hand-set, not one fluid clamp, so lines break where the composition expects):

| Breakpoint | Display size |
|---|---|
| Mobile ≤ 360 | 68 px |
| Mobile 361–767 | `20.5vw`, clamped to 68–104 px (80 px at 390) |
| Tablet | 128 px |
| Laptop | 152 px |
| Desktop 1440 | 168 px |
| Wide ≥ 1920 | 208 px (cap) |

### 20.3 Rules

1. **Uppercase policy.** Uppercase is used for Display lines and Metadata only. Navigation, buttons, headings, body and labels are sentence case.
2. **Fit rule.** The widest Display line ("WEBSITES" / "POINT OF") must fit its container with ≥ 8 px to spare at every width from 320 upward. Test at 320, 360, 390, 430, 768, 1024, 1440, 1920. If it fails, reduce the size for that band; do not allow wrapping.
3. **Balance.** `text-wrap: balance` on headings; `text-wrap: pretty` on paragraphs.
4. **No fake weights.** `font-synthesis: none`. `font-optical-sizing: auto` on Newsreader.
5. **Numerals.** `font-variant-numeric: tabular-nums` on index numbers, years, clock.
6. **Hyphenation.** Off for headings, `auto` for paragraphs (`lang="en"` set on `<html>`).
7. **Line length.** Body ≤ 62 ch; Lead ≤ 34 ch; Statement ≤ 24 em.
8. **Single-style headlines.** No italic, colour or weight change on individual words within a headline.

### 20.4 Loading strategy

- Preload **only** the Instrument Sans variable WOFF2 (critical, ≤ 60 KB). Newsreader loads after `window.load` (or when the Philosophy section is within 1 viewport) with `font-display: swap`.
- `font-display: swap` for both, with a **metric-matched fallback** (`size-adjust`, `ascent-override`, `descent-override`, `line-gap-override`) generated at build (Capsize or Fontaine) so swap causes CLS ≤ 0.01.
- Fallback stacks: sans `"Instrument Sans", "Instrument Sans Fallback", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`; serif `"Newsreader", "Newsreader Fallback", Georgia, "Times New Roman", serif`.
- SplitText and ScrollTrigger measure **after** `document.fonts.ready` (§36).

---

## 21. Color System

### 21.1 Tokens

**Dark theme (default)**

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0A0A0A` | Page ground (Ink) |
| `--color-surface` | `#111111` | About section, form fields on dark, one step above Ink |
| `--color-surface-2` | `#181817` | Menu overlay, raised surfaces |
| `--color-fg` | `#F3F1EC` | Primary text, borders at full strength (Bone) |
| `--color-fg-secondary` | `#A9A7A1` | Descriptions, captions |
| `--color-fg-muted` | `#85837E` | Metadata, disabled hints |
| `--color-border` | `rgba(243,241,236,0.14)` | Hairline Rules |
| `--color-border-strong` | `rgba(243,241,236,0.32)` | Form field rule, outline pill |
| `--color-accent` | `#5A6CFF` | Ultramarine: availability dot, progress fill, selection |
| `--color-accent-hover` | `#7A89FF` | Hover state for accent text/links |
| `--color-focus` | `#8C99FF` | Focus ring (≥ 3:1 against Ink and Surface) |
| `--color-selection-bg` / `--color-selection-fg` | `#5A6CFF` / `#0A0A0A` | Text selection |
| `--color-error` | `#FF6B5E` | Form errors (always paired with text and `aria-invalid`) |
| `--color-success` | `#8FD9A8` | Success confirmation (paired with text) |
| `--color-scrim` | `rgba(10,10,10,0.72)` | Menu overlay backdrop |

**Paper theme (Contact + Footer, applied with `[data-theme="paper"]`)**

| Token | Value |
|---|---|
| `--color-bg` | `#F3F1EC` |
| `--color-surface` | `#EAE7E0` |
| `--color-fg` | `#0A0A0A` |
| `--color-fg-secondary` | `#4A4945` |
| `--color-fg-muted` | `#6B6A65` |
| `--color-border` | `rgba(10,10,10,0.14)` |
| `--color-border-strong` | `rgba(10,10,10,0.40)` |
| `--color-accent` | `#1F2FD6` (Ultramarine on light) |
| `--color-accent-hover` | `#0F1FB0` |
| `--color-focus` | `#1F2FD6` |
| `--color-error` | `#B3261E` |

### 21.2 Accent discipline

Ultramarine is used only for: the availability dot, the Process progress fill, text selection, the focus ring (lighter tint on dark), accent-coloured hover for links on Bone, and the secondary "Seen in" number hover. **It is never used for large fills, backgrounds, gradients, headings or buttons.** No more than one accent element is visible in a typical viewport.

### 21.3 Contrast (verify with tooling in Phase 1)

| Pair | Approx. ratio | Requirement |
|---|---|---|
| Bone on Ink | ≈ 17:1 | Body and display |
| `fg-secondary` on Ink | ≈ 8:1 | Descriptions |
| `fg-muted` on Ink / Surface | ≈ 5.4:1 / ≈ 5:1 | Metadata (≥ 4.5:1 required) |
| Ultramarine `#5A6CFF` on Ink | ≈ 4.7:1 | Small text allowed, but the accent is not used for body text |
| Ink on Bone | ≈ 17:1 | Contact body |
| `fg-secondary` (paper) on Bone | ≈ 7.7:1 | |
| `fg-muted` (paper) on Bone | ≈ 4.7:1 | |
| `#1F2FD6` on Bone | ≈ 7.6:1 | Links on Bone |
| Focus ring vs adjacent colours | ≥ 3:1 | WCAG 2.2 non-text contrast |

Ratios are approximate and must be re-measured with a contrast tool; any pair below its requirement is adjusted, not accepted.

---

## 22. Grid System

### 22.1 Grid definition

| Breakpoint | Columns | Outer margin | Gutter | Content max | Column width at reference |
|---|---|---|---|---|---|
| Desktop ≥ 1440 | 12 | 48 px | 24 px | 1600 px (centred beyond 1696 px viewport) | 90 px at 1440 |
| Laptop 1024–1439 | 12 | 40 px | 20 px | fluid | ≈ 82 px at 1280 |
| Tablet 768–1023 | 8 | 32 px | 20 px | fluid | ≈ 77 px at 820 |
| Mobile 320–767 | 4 | 20 px | 12 px (16 px ≥ 480) | fluid | ≈ 78 px at 390 |

Implementation: a single `Grid` layout primitive using CSS Grid with `grid-template-columns: repeat(var(--cols), minmax(0, 1fr))`, `column-gap: var(--gutter)`, `padding-inline: var(--margin)`. Children place with `col-start` / `col-span` utilities per breakpoint. Full-bleed elements break out using a named `full` line, not negative margins.

### 22.2 Widths

| Token | Value | Use |
|---|---|---|
| `--measure-text` | 62 ch | Body paragraphs |
| `--measure-lead` | 34 ch | Lead and hero descriptor |
| `--measure-statement` | 24 em | Serif statements |
| Display lines | Unconstrained by measure; constrained by column span (hero: cols 1–8) | |

### 22.3 Plate widths (desktop 1440)

| Plate | Span | Width | `sizes` hint |
|---|---|---|---|
| Hero | cols 9–12 | ≈ 432 px | `(min-width:1440px) 432px, (min-width:768px) 40vw, 100vw` |
| Feature wide (V1) | cols 1–12 | 1344 px | `(min-width:1440px) 1344px, 100vw` |
| Feature split (V2) | cols 1–7 | ≈ 780 px | `(min-width:1440px) 780px, 100vw` |
| Feature full-bleed (V3) | viewport | 1440 px | `100vw` |
| Small overlap (V4 / V5 secondary) | cols 8–11 / 3 cols | ≈ 330 px | `(min-width:1024px) 330px, 60vw` |
| Archive preview | fixed | 320 × 400 | `320px` |
| Case-study body | cols 5–12 | ≈ 900 px | `(min-width:1440px) 900px, 100vw` |

### 22.4 Asymmetry rules

- Adjacent sections use opposite anchors: Hero (left-heavy type, right Plate), Work (alternating), Philosophy (left statement, right principles), Capabilities (left sticky heading, right list), Process (left numeral, right text), About (left portrait, right text), Contact (statement full width, form right).
- Never centre a headline. Centring is reserved for the scroll cue only.
- Indents are always whole columns.

---

## 23. Spacing System

### 23.1 Scale (4 px base)

| Token | Value | Token | Value |
|---|---|---|---|
| `--space-1` | 4 px | `--space-7` | 48 px |
| `--space-2` | 8 px | `--space-8` | 64 px |
| `--space-3` | 12 px | `--space-9` | 96 px |
| `--space-4` | 16 px | `--space-10` | 128 px |
| `--space-5` | 24 px | `--space-11` | 192 px |
| `--space-6` | 32 px | `--space-12` | 256 px |

### 23.2 Section rhythm

| Token | Value | Notes |
|---|---|---|
| `--section-space` | `clamp(96px, 12vw, 192px)` | Vertical padding above and below every section |
| Hero bottom to Work | 0 (the Work heading enters within the first viewport on mobile) | See §11.6 |
| Feature to Feature | 160 px desktop / 96 px mobile | |
| Heading to content | 48 px desktop / 32 px mobile | |
| Display line to descriptor | 96 px desktop / 40 px mobile | |
| List row | 24 px top and bottom padding | Capabilities, Archive, Features list |
| Form field gap | 32 px | |
| Component internal padding | Pill button 0 28 px; field 12 px vertical | |

Rules: vertical distance between a section's last element and the next section's first element is never less than the height of the larger Display/H1 line involved; all layout distances are multiples of 4; Plate heights derive from aspect ratio and column span, never from a fixed pixel value.

---

## 24. Component Architecture

### 24.1 Layers

```
Foundations   tokens (CSS variables), Tailwind theme mapping, font-face, reset
Primitives    Text, Plate, Rule, Icon, Link, Button, Field, Select, Textarea
Behaviours    SplitLines (line-mask reveal), Magnetic, RevealOnEnter, SmoothScroll,
              CursorProvider, ThemeSection (data-theme switching), PageTransition
Sections      Header, MenuOverlay, Hero, WorkFeatures, FeatureBlock, Philosophy,
              Capabilities, Process, About, Contact, Footer
Pages         Home, WorkArchive, CaseStudy, NotFound
```

Rules: Primitives contain no motion except hover/focus transitions. Behaviours wrap primitives and are the only place GSAP is called (via hooks in `src/motion/`). Sections compose primitives and behaviours and contain layout only. Pages fetch content.

### 24.2 Component state matrix

| Component | Desktop | Tablet | Mobile | Hover | Focus | Reduced motion |
|---|---|---|---|---|---|---|
| **Header** | Wordmark, availability, Work, About, Contact pill. Fixed. Ink background fades in after 80 px scroll | Wordmark, Work, About, Menu button. Hides on scroll down | Wordmark, Menu button. Hides on scroll down | Links: 1 px underline draws (250 ms) | 2 px focus ring; skip link visible on first Tab | Underline appears instantly; no hide/show translate (opacity only) |
| **MenuOverlay** | Not rendered | Full-screen, Radix Dialog | Same | Link text mask-rolls (300 ms) | Focus trapped; first link focused on open; Esc closes; focus returns to Menu button | Overlay opens with 150 ms opacity; no mask roll |
| **Button (primary pill)** | 48 px high, Bone fill, Ink text; magnetic | Same, no magnetic | 48 px min, full width in forms | Fill wipe up 300 ms, text inverts; magnetic ≤ 10 px | Focus ring 3 px offset | No wipe: instant colour swap; no magnetic |
| **Button (outline pill)** | 36 px high, `--color-border-strong`; nav Contact | 40 px | n/a (in overlay as text link) | Fill wipe as above | Same | Same as above |
| **TextLink** | Underline 1 px; external adds `arrow-up-right` | Same | Same, 44 px min hit area | Underline draws left to right 400 ms | Focus ring | Underline static |
| **Plate** | Reveal on enter; hover parallax and scale | Reveal; no hover | Reveal (600 ms) | Scale 1.03 (600 ms); cursor state | When wrapped by link: ring around Plate + text | No reveal, no parallax; 150 ms fade |
| **FeatureBlock** | Six variants | Two variants | One vertical unit | See §12.3 | One tab stop | See §12.3 |
| **ArchiveRow** | 128 px row; preview follows cursor | Row with inline Plate | Row with inline Plate | Title shift 16 px, siblings dim to 35 % | Preview anchored to the right column | No shift/dim; preview crossfades 150 ms |
| **Metadata / Tag** | 12 px uppercase; Tag has 1 px pill border, 28 px high | Same | Same | None (not interactive) | n/a | n/a |
| **Cursor** | Five states (§27) | Off | Off | State changes | Cursor does not replace focus indication | Off; native cursor returns |
| **Field / Select / Textarea** | Bottom rule; 48 px min height | Same | 48 px min height; native select UI on iOS/Android | Rule strengthens to `--color-fg` | Focus ring plus 2 px underline draw | Underline appears instantly |
| **ProcessSequence** | Pinned; numeral roll | Stacked, sticky numerals | Stacked | Tick links underline | Tick links focus ring | Stacked, no animation |
| **CapabilityBlock** | Sticky heading, 8 px row shift on hover | Sticky heading | Non-sticky | Row shifts 8 px; "Seen in" underlines | "Seen in" links have focus ring | No shift |
| **ComparisonSlider** | Drag handle 44 px; arrow keys 5 % | Same | Drag plus Before/After toggle buttons | Handle enlarges 1.1× | Handle is `role="slider"` with `aria-valuenow` | No inertia; instant jumps |
| **HorizontalGallery** | Pinned, scrubbed x | Native scroll-snap | Native scroll-snap, 12 % peek | Cursor "Drag" | Container focusable with arrow-key scroll | Native scroll-snap only |
| **Footer parts** | One row | Two rows | Stacked | Links as TextLink | Same | Back to top is instant |
| **PageTransition** | Plate-to-Page or fade | Same, 700 ms | Same, 700 ms | n/a | Focus moves to new page `<h1>`; route announced | 150 ms opacity |

### 24.3 Button and link specification

| Variant | Spec |
|---|---|
| Primary pill | Height 48 px; padding 0 28 px; radius pill; Bone fill, Ink text (paper theme: Ink fill, Bone text); label 15 px / 500 |
| Outline pill | Height 36 px (40 tablet); 1 px `--color-border-strong`; Bone text; fill wipe on hover |
| Text link | Inherit size; 1 px underline offset 4 px; hover: underline redraws left → right; visited state not styled |
| Text button (Copy, Back to top) | Same as text link but a `<button>`; minimum hit area 44 × 44 px |

### 24.4 Menu overlay specification

- Radix Dialog with `aria-modal`, focus trap, Esc to close, scroll lock (also stops Lenis), focus return to the trigger.
- Contents: Work, About, Contact as 44 px links; below, email, social links, availability line.
- Open: clip-path from `inset(0 0 100% 0)` to `inset(0)`, 600 ms `--ease-inout`; links mask-roll in with 50 ms stagger. Close: 400 ms.
- Breakpoint: rendered below 1024 px only. If the viewport is resized past 1024 while open, it closes.

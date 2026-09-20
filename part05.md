## 25. Motion System

### 25.1 Philosophy

Motion is **physical and consequential**: things move from where they are to where they are going; nothing appears from nowhere; nothing loops. The site is still unless the visitor acts or the page is doing exactly one deliberate thing. Motion is never used to make content wait.

### 25.2 Hard budget

- At most **one** non-user-triggered animation is running in any viewport at any moment.
- Level-4 moments in the whole site: **three** (hero opening, Plate-to-Page, optional WebGL Plate response). Adding a fourth requires removing one.
- All motion uses `transform`, `opacity` or `clip-path` (plus `color` and `background-size` at L1). No animation of layout properties, `box-shadow` or `filter` (the portrait's grayscale on hover is the single exception, capped at 500 ms, one element).
- No looping animation anywhere. The availability dot and the scroll cue line are static after their entrance.

### 25.3 Levels

| Level | Purpose | Duration range | Examples |
|---|---|---|---|
| **L1 Micro** | Confirm a pointer or focus event | 120–400 ms | Underline draw, button fill wipe, field underline, focus ring, copy confirmation |
| **L2 Component** | A component responds or arrives | 300–700 ms | Plate hover, cursor state change, Archive row shift and dim, magnetic pull, menu link roll, Plate reveal |
| **L3 Section** | A section changes state | 600–1000 ms | Display-line reveals, Process step change, route fade, Contact reveal, pinned gallery |
| **L4 Signature** | Once or few per session | 900–1700 ms | Hero opening, Plate-to-Page, WebGL Plate response |

### 25.4 Tokens

| Token | Value | GSAP registration | Used for |
|---|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | `CustomEase "studioOut"` | Entrances, line masks |
| `--ease-inout` | `cubic-bezier(0.76, 0, 0.24, 1)` | `CustomEase "studioInOut"` | Clip-path reveals, route and overlay transitions, Flip |
| `--ease-standard` | `cubic-bezier(0.25, 1, 0.5, 1)` | `CustomEase "studioHover"` | Hover, colour, underline |
| linear | — | `"none"` | Scrubbed scroll progress, progress fills only |
| `--dur-instant` | 120 ms | | Colour swaps, press states |
| `--dur-fast` | 220 ms | | Header fade, focus, label crossfades |
| `--dur-base` | 400 ms | | Underlines, small reveals |
| `--dur-slow` | 700 ms | | Plate hover response, Process step change, menu |
| `--dur-scene` | 1100 ms | | Clip-path reveals on large Plates |

**Forbidden easings:** bounce, elastic, back (overshoot), spring physics with visible oscillation.

### 25.5 Entrance motion

Entrances exist for exactly four things: the hero opening (§11.4), Display/H1/H2 line masks, Plate reveals, and the Contact statement. Everything else, including all body copy, lists, metadata and form fields, is simply present. There are no fade-up section entrances.

### 25.6 Hover motion

Only on `(hover: hover) and (pointer: fine)`. Translation ≤ 16 px; scale ≤ 1.03 (Plates) and ≤ 1.1 (slider handle only); duration 300–600 ms with `--ease-standard`. Hover never carries information that is unavailable by focus or by tap.

### 25.7 Scroll motion

| Scrubbed / scroll-driven item | Detail |
|---|---|
| Hero exit | Hero Plate translates −8 % over the first viewport of scroll (linear scrub) |
| Feature V6 pair | Differential parallax ≤ 6 % between the two Plates |
| Process | Pin plus progress fill (linear); step changes are *triggered*, not scrubbed |
| Case-study Screens | Horizontal translation, scrub 0.5 |
| Everything else | Not scroll-driven |

Use scrubbed timelines **only** where scroll synchronisation carries meaning (progress, a pinned sequence, a horizontal journey). Reveals are triggered once, not scrubbed.

### 25.8 Route transitions

| Route change | Transition |
|---|---|
| Home or Archive → Case study | **Plate-to-Page** (§26.2) |
| Case study → Case study via "Next project" | Plate-to-Page from the Next project Plate |
| Case study → Archive / Home ("Back to work", nav) | Exit: content opacity 1 → 0 over 250 ms; Enter: opacity 0 → 1 with 24 px translate-up over 450 ms, `--ease-out` |
| Any route → 404 | Same fade |

### 25.9 Reduced motion (`prefers-reduced-motion: reduce`)

| Feature | Behaviour |
|---|---|
| Hero opening | Content simply visible; 200 ms opacity fade at most |
| Display line masks, Plate reveals | Removed; content visible |
| Plate tilt, parallax, counter-parallax | Removed |
| Custom cursor | **Off** (native cursor); hover states still change colour/underline |
| Smooth scroll (Lenis) | Off; native scroll; anchor jumps are instant |
| Process pin | Off; stacked list |
| Screens pin | Off; native scroll-snap |
| Plate-to-Page | 150 ms opacity crossfade |
| Magnetic buttons | Off |
| WebGL | Off; static DOM Plate |
| Menu overlay | 150 ms opacity |

Implementation: all motion is created inside `gsap.matchMedia()` under the `(prefers-reduced-motion: no-preference)` condition; the reduced branch sets final states directly. A CSS safety net at `@media (prefers-reduced-motion: reduce)` caps transitions at 150 ms and sets `scroll-behavior: auto`.

### 25.10 Motion never hides content

- The `<html>` element gets class `js-motion` from a tiny inline script **only** when JavaScript runs and reduced motion is not requested. Initial hidden states (hero lines, Plates awaiting reveal) are scoped under `.js-motion`, so with JavaScript off or motion reduced all content is visible.
- Safety timeout: if the animation system has not taken control within 2.5 s, `js-motion` is removed and content becomes visible.

---

## 26. Interaction System

### 26.1 Interaction language

The whole site speaks with five verbs. Every interactive element belongs to exactly one.

| Verb | Applies to | Cursor (fine pointer) | Hover | Activation | Touch | Keyboard |
|---|---|---|---|---|---|---|
| **Open** | Hero Plate, Feature, Next project | "Open" circle | Counter-parallax, scale 1.03, underline draws | Plate-to-Page | Tap; press scales to 98.5 % | Enter on the Feature link |
| **View** | Archive rows | "View" circle; preview Plate follows | Title shifts, siblings dim | Plate-to-Page from the preview Plate | Inline Plate; tap opens | Focus shows preview in the right column |
| **Drag** | Screens gallery, comparison slider | "Drag" circle | Handle enlarges (slider) | Pointer drag | Native swipe or drag | Arrow keys; Home/End on slider |
| **Go** | Nav, TextLink, Back to top | Ring | Underline draws | Anchor scroll (900 ms) or navigation | Tap | Enter |
| **Send / Copy** | Primary pill, Copy button | Ring | Fill wipe, magnetic | Submit or clipboard write | Tap | Enter / Space |

**Magnetic buttons.** Applied to the outline and primary pills only. Attraction radius 120 px around the button centre; strength 0.3; maximum displacement 10 px; the label moves 1.4× the button for a slight parallax. Movement uses `gsap.quickTo` (0.4 s, `power3.out`); release returns to origin over 0.6 s with no overshoot. Disabled on touch and under reduced motion.

**Underline animation.** Implemented with `background-size` from 0 → 100 % on a 1 px linear gradient anchored left, 400 ms `--ease-standard`. On leave the origin flips right and it retracts over 300 ms.

**Text displacement.** Restricted to Archive titles (16 px), Capabilities items (8 px) and the menu overlay links.

**Split text.** SplitText (line masks) on Display, H1 and H2 only. Character-level movement is not used anywhere. Body text is never split.

**Navigation.** Minimal (§11.7). Scroll-spy underlines the active section link on desktop.

### 26.2 Signature experience

#### Five concepts evaluated

**Concept 1: Variable-type field.** *Interaction:* the hero headline's `wght` and `wdth` axes respond to pointer proximity, so letters swell and narrow under the cursor. *Visual:* the type appears to breathe. *Technical:* per-character spans, `quickSetter` writing `font-variation-settings` each frame. *Performance impact:* moderate to high, because variable-font axis changes force text re-layout on every frame across ~30 characters and can shift line breaks. *Fit:* showcases typography and suits a designer-developer, but it is desktop-only, discoverable only by accident, and risks legibility and layout stability. **Rejected for v1**; may inform a Phase 5 one-line experiment.

**Concept 2: Index-to-Gallery morph.** *Interaction:* on `/work` a toggle transforms the typographic list into an irregular Plate arrangement. *Visual:* rows fold into images in place. *Technical:* GSAP Flip on ≤ 12 elements. *Performance:* low to moderate. *Fit:* good and on-brand but confined to the Archive, so most visitors never meet it. **Kept as a Phase 5 supporting feature.**

**Concept 3: Plate-to-Page transition.** *Interaction:* opening a project expands its image from its place on the page into the case-study hero while the page content clears and the title sets over. *Visual:* one continuous object moving between contexts. *Technical:* GSAP Flip plus a fixed overlay layer (§ below). *Performance:* one transform-driven element per navigation; low. *Fit:* it literalises the "digital object" concept, occurs on the site's most important user action, repeats for every project, works on touch, degrades to a fade. **Selected as the primary signature.**

**Concept 4: Interactive editorial grid.** *Interaction:* a draggable, inertial canvas of Plates. *Visual:* a wall of work you pan across. *Technical:* Observer/Draggable or WebGL with 20–30 items. *Performance:* moderate to high. *Fit:* belongs to Direction B; poor accessibility, weak on business-client comprehension, high maintenance. **Rejected.**

**Concept 5: Scroll-driven transformation.** *Interaction:* the hero headline scales down and docks into the header wordmark while the hero Plate becomes the first Feature. *Visual:* one object transforming across sections. *Technical:* ScrollTrigger scrub plus Flip across responsive layouts. *Performance:* moderate. *Fit:* elegant, but layout coupling between hero and header is fragile across breakpoints and font-loading states. **Rejected for v1.**

#### Primary signature: Plate-to-Page

**Preconditions.** The source Plate must be at least 30 % visible and its image decoded. On hover, focus or `touchstart` of a project link, prefetch (a) the case-study route chunk and (b) the 1600 px hero image, and call `img.decode()`. If the decode has not completed within 400 ms of activation, fall back to the standard fade.

**Sequence (desktop, ≈ 1.1 s total; content interactive at ≈ 0.8 s).**

| t (ms) | Event |
|---|---|
| 0 | Activation. Capture `Flip.getState` of the source Plate. Clone it into a fixed transition layer (z-index 950) at its exact rect. Hide the original with `visibility: hidden`. Cursor "Open" compresses to 90 % |
| 0–220 | All page content except the transition layer fades to opacity 0 (no movement). The Ink ground remains, so nothing flashes |
| 220 | Router navigates. New route mounts behind the layer; scroll is set to 0 immediately (`immediate`); the target hero Plate is present with `visibility: hidden` |
| 260–900 | Flip moves the layer from the source rect to the target rect, 640 ms `--ease-inout`. The crop (`object-position` and clip-path) interpolates from the source crop to the target crop so the image is never stretched. Radius stays 4 px |
| 700–1100 | Title lines mask up (stagger 70 ms, 700 ms, `--ease-out`); facts table and header fade in (300 ms) |
| 1100 | Layer removed; the real hero Plate is shown (identical pixels); focus moves to the page `<h1>`; the live region announces "[Project name], case study" |

**Variants.**

- *Mobile / tablet:* same sequence at 700 ms total, no cursor state.
- *Back navigation or "Back to work":* if the originating Plate exists in the restored page, play the reverse Flip; otherwise use the standard fade.
- *Next project:* the source is the Next project Plate at the end of a case study; the current content fades as above.
- *Direct landing:* standard Plate reveal (900 ms clip-path), no transition layer.
- *Reduced motion:* 150 ms opacity crossfade.
- *Failure:* any thrown error in the sequence aborts the animation and performs a normal navigation with a fade.
- *Double activation or rapid Back:* the second input is ignored while the timeline is running; Back during the timeline completes it instantly, then navigates.

**Acceptance.** No layout shift (CLS 0 attributable to the transition); no flash of unstyled or blank content; sustained 60 fps on a reference mid-range Android (Moto G-class) with ≤ 2 dropped frames; the destination is fully usable without waiting for the timeline to end.

---

## 27. Cursor System

Applies **only** when `(hover: hover) and (pointer: fine)` is true, motion is not reduced, and the visitor has moved the pointer at least once (the native cursor stays visible until then).

| State | Trigger (`data-cursor`) | Visual | Label |
|---|---|---|---|
| **Default** | none | 8 px Bone dot, exact pointer position | none |
| **Link** | `link` (text links, buttons, nav) | 36 px ring (1 px Bone), dot hidden | none |
| **Open** | `open` (hero Plate, Features, Next project) | 88 px Bone circle | "Open", Ink, 12 px / 500 |
| **View** | `view` (Archive rows) | 72 px Bone circle | "View", Ink |
| **Drag** | `drag` (Screens gallery, comparison handle) | 72 px Bone circle | "Drag", Ink |
| **Hidden** | `hide` (form fields, select, textarea, iframes, menu overlay) | Not rendered; native cursor shown | none |

Implementation notes:

- Two layers: the **dot** follows exactly (`gsap.quickSetter`, no lag); the **ring/circle** follows with `gsap.quickTo` (x, y at 0.35 s, `power3.out`). Size and label changes: 250 ms `--ease-standard`, label crossfade 150 ms. Maximum perceived lag is 200 ms.
- The cursor layer is `position: fixed`, `pointer-events: none`, `z-index: 1000`, `contain: layout paint`. No `mix-blend-mode`.
- `cursor: none` is applied through a class on `<html>` only after the first pointer move, and never on form controls.
- Paper theme: dot and ring switch to Ink, labels to Bone.
- The cursor is decoration for orientation. It never replaces the focus ring, and no functionality depends on it.
- Pointer leaves the window: the cursor fades out (150 ms). Cursor is removed on `blur` of the window to avoid ghost cursors.
- Touch devices, reduced motion, `forced-colors: active` and screen-reader-only workflows: the native cursor is used and the cursor layer is not mounted.

---

## 28. Responsive Strategy

### 28.1 Principle

Desktop and mobile are **designed separately**. Mobile is not a scaled-down desktop; each breakpoint has its own composition, image crops and interaction model.

### 28.2 Breakpoints

| Name | Range | Tailwind | Grid |
|---|---|---|---|
| Desktop | ≥ 1440 | `xl` | 12 col |
| Laptop | 1024–1439 | `lg` | 12 col |
| Tablet | 768–1023 | `md` | 8 col |
| Mobile | 320–767 | base | 4 col |

### 28.3 What changes at each breakpoint

| Topic | Desktop | Laptop | Tablet | Mobile |
|---|---|---|---|---|
| **Hero** | Headline cols 1–8, Plate cols 9–12, metadata row | Same, Display 152 px, availability hidden < 1200 | Headline 128 px over 5 of 8 cols, Plate right 3 cols | Headline full width at 68–104 px, Plate below at 4:5, availability under Plate |
| **Typography** | Scale §20 | Display 152 px, H1 80 px | Display 128 px, H1 64 px | Display 80 px, H1 44 px |
| **Selected Work** | Six variants | Six variants, tighter overlaps | Two variants | One vertical unit; aspect and bleed alternate |
| **Archive** | Cursor-following preview | Same | Inline Plate rows | Inline Plate rows |
| **Navigation** | Inline links, outline pill | Same | Inline Work/About + Menu | Menu only |
| **Cursor** | Custom (fine pointer only) | Same | Off | Off |
| **Motion** | Full L1–L4 | Full | Reveals kept; pins disabled if touch | Shorter reveals (600 ms), no parallax, no pins, no smooth scroll |
| **WebGL Plate** | Enabled if capability check passes | Same | Disabled | Disabled |
| **Images** | Up to 2400 w for full-bleed; AVIF/WebP | 1600 w | 1200 w | 768–1200 w, mobile crops |
| **Process** | Pinned | Pinned | Stacked | Stacked |
| **Case-study facts** | Sticky column | Sticky column | Inline | Inline definition list |
| **Contact** | Statement full width; form cols 7–12 | Same | Single column | Single column, 48 px fields |

### 28.4 Touch devices

- No fake cursor and no hover-dependent functionality. Every hover effect has a tap, focus or always-visible equivalent (§26.1).
- Touch targets ≥ 48 × 48 px (WCAG 2.2 requires 24 px; the site sets a higher floor). Adjacent targets ≥ 8 px apart.
- Press feedback: 120 ms scale to 98.5 % on Plates and 90 % opacity on links. Native scrolling with momentum (Lenis smoothing is off for touch input).

### 28.5 Other conditions

- Use `svh`/`dvh`, not `vh`, for full-height layouts; handle safe-area insets (`env(safe-area-inset-*)`) on the header, menu overlay and footer.
- Landscape phones (height < 500 px): hero min-height 560 px, Display sized by `min(vw-based, 22vh)`, Plate hidden below the fold.
- Zoom to 200 % and text-only zoom must not break layouts; body and UI text use `rem`; reflow at 400 % zoom (320 CSS px) is supported.
- Orientation change re-measures ScrollTrigger and SplitText (debounced 150 ms).

---

## 29. Accessibility Requirements

Target: **WCAG 2.2 Level AA**, with Level AAA effort on target size and motion where cheap.

### 29.1 Structure

- Semantic landmarks: `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`. Each home section is a `<section aria-labelledby="…">`.
- **Heading hierarchy:** one `<h1>` per page. Home: the hero headline. Sections use `<h2>`; block headings inside them `<h3>`. Case study: `<h1>` is the project name. No skipped levels.
- The hero headline is authored in sentence case ("Websites with a point of view.") and set uppercase with CSS `text-transform`, so screen readers read words, not letters. SplitText is used with its built-in ARIA handling (`aria-label` on the parent, split children `aria-hidden`).
- A visible **skip link** ("Skip to content") is the first focusable element.

### 29.2 Keyboard and focus

- Every interactive element is reachable and operable by keyboard; tab order equals visual order.
- Focus ring: 2 px `--color-focus`, 3 px offset, never removed. On Bone the ring is Ultramarine `#1F2FD6`.
- `scroll-padding-top: 96px` on `<html>` so sticky/fixed header never obscures a focused element (WCAG 2.4.11).
- Menu overlay: focus trap, Esc closes, focus returns to trigger.
- Route change: focus moves to the new `<h1>` (`tabindex="-1"`), and a polite live region announces the page title.
- Pinned Process and Screens are **not** scroll traps: PageUp/PageDown, Space, arrow keys and Home/End move through them normally.
- No keyboard traps anywhere, including the comparison slider (arrow keys plus Tab out).

### 29.3 Alternatives to gestures and pointers (WCAG 2.5.7, 2.5.8)

- Dragging (Screens, comparison slider) has non-drag alternatives: arrow keys, and on the slider a Before/After toggle pair.
- Targets ≥ 44 px (48 px on touch) for interactive elements; text links inline in paragraphs may be smaller but have adequate spacing.

### 29.4 Forms

- Visible labels for every field; `autocomplete` tokens set (`name`, `email`).
- Errors: linked via `aria-describedby`, `aria-invalid="true"`, text plus colour (never colour alone); first invalid field receives focus on failed submit; a summary is not required for a five-field form but the error text names the field.
- Success and failure messages use `role="status"` / `role="alert"` respectively; focus moves to the success message.
- Honeypot field is removed from the accessibility tree (`aria-hidden`, `tabindex="-1"`, off-screen, no label).
- No CAPTCHA that requires solving a puzzle (WCAG 3.3.8). If Turnstile is introduced, use the invisible mode.

### 29.5 Images and media

- Every Plate has descriptive alt text stating what the image shows and why it matters ("Home page of [Project] on a desktop screen, showing…"). Decorative images use `alt=""`. Alt text is a required field in `projects.json` (§33) and validated at build.
- No autoplaying video or audio. Any future video must have controls and captions.

### 29.6 Colour and contrast

- Text contrast ≥ 4.5:1 (large text ≥ 3:1); UI and focus indicators ≥ 3:1 (§21.3). Information is never conveyed by colour alone (errors have icons/text; the availability dot is accompanied by text).
- `forced-colors: active` (Windows High Contrast): the custom cursor is off, focus rings use system `Highlight`, Plate edges use `CanvasText`.

### 29.7 Motion and vestibular safety

- Reduced motion behaviour per §25.9. No flashing (no more than 3 flashes per second, none at all in practice). Parallax is capped at 8 % and disabled with reduced motion.
- The hero opening never blocks interaction.

### 29.8 Language and reading

- `<html lang="en">`; page titles unique and descriptive; link text is descriptive ("View project: [Name]" via visually hidden suffix where the visible text is "View project").
- External links open in the same tab unless there is a strong reason; if `target="_blank"` is used, include `rel="noopener noreferrer"` and an announced suffix ("opens in a new tab").

### 29.9 Verification

Automated (axe-core in CI on every route and breakpoint) plus manual: keyboard-only pass, VoiceOver (macOS and iOS), NVDA with Firefox and Chrome, TalkBack on Android, 200 % and 400 % zoom, Windows High Contrast, and reduced-motion on. See §46 and §50.

## 10. Homepage Experience

### 10.1 Scroll narrative

The home page is one continuous scroll of about 16–17 desktop viewport heights. It has four kinds of moment; only the first and third are "performed":

| Moment | Where | Nature |
|---|---|---|
| Opening | Hero | The single orchestrated page-load sequence (L4) |
| Working surface | Selected Work, Capabilities, About | Static content with pointer-driven Plate behaviour (L1–L2) |
| Pinned sequence | Process (desktop only) | Scroll-synchronised, because a sequence benefits from scroll (L3) |
| Ending | Contact + Footer | Surface inverts to Bone with a hard edge; display type reveals once (L3) |

Rhythm rules: no two adjacent sections share the same alignment axis; sections alternate between left-anchored and right-anchored compositions; whitespace between sections is `--section-space` (§23), never less than the height of the largest display line above it.

### 10.2 Desktop homepage wireframe (1440 × full scroll)

```wf 92
┌
│ [NAME]                  ● Available for select projects           Work   About  (Contact)
│
│ WEBSITES                                                       ┌──────────────────┐
│       WITH A                                                   │                  │
│ POINT OF                                                       │    HERO PLATE    │
│       VIEW.                                                    │    4:5 · tilts   │
│                                                                │                  │
│ Independent web designer and developer.                        └──────────────────┘
│ I design and build websites for businesses,                     Project name   Year
│ brands and creatives.
│ Web development, digital design        2026   India                       Scroll
├
│ Selected work                                                                All work
│
│  01                                          ┌──────────────────────────────────┐
│  Project name                                │                                  │
│  Category, year                              │        FEATURE PLATE             │
│  One-sentence description.                   │        (composition varies)      │
│  View project                                │                                  │
│                                              └──────────────────────────────────┘
│                    ┌────────────────────────────────────────────────┐   02
│                    │                                                │   Project name
│                    │        FEATURE PLATE (wide)                    │   Category, year
│                    │                                                │   View project
│                    └────────────────────────────────────────────────┘
│  · · · 3–5 Features, never the same composition twice in a row · · ·
├
│ A website is the first thing a client's customer touches. It should feel
│ considered before anyone reads a word.                       (serif, statement)
│
│ Design                          Code
│ Three short principles          Three short principles
├
│ Web                     ┌ Business websites ........ Seen in 01, 03
│ (sticky, large)         │ E-commerce ............... Seen in 02
│                         │ Landing pages
│                         └ Custom web applications
│ Design                  ┌ Interface direction ...
│ Development             ┌ Front-end build ...
├
│ 03                                                                 Design
│ (huge numeral, rolls)                                     Sentence describing the
│                                                           step. You get: …
│ ── 01 02 [03] 04 05 06 ─────────────────────────────────  (progress rule)
├
│ ┌────────────┐   I design and build websites myself, so what is drawn
│ │  PORTRAIT  │   is what ships. (serif lead)
│ │  4:5 mono  │
│ └────────────┘   Working style, in two short paragraphs.      Tools  [INPUT]
├ BONE SURFACE (lights on)
│ TELL ME
│ WHAT YOU'RE
│ MAKING.
│
│ [EMAIL]  Copy               Name ________  Email ________
│ ● Taking projects from      I'm making ▾   Message ______
│   [MONTH 2026]              (Send message)
│
│ [NAME]   LinkedIn  GitHub   © 2026   India, 14:32 IST   Back to top
└
```

### 10.3 Tablet homepage wireframe (768–1023, 8 columns)

```wf 58
┌
│ [NAME]        ● Available          Work About (Menu)
│
│ WEBSITES
│      WITH A            ┌──────────────┐
│ POINT OF               │  HERO PLATE  │
│      VIEW.             │  4:5         │
│                        └──────────────┘
│ Independent web designer and developer.
│ Web development, digital design       2026   India
├
│ Selected work                              All work
│
│ 01   Project name
│      Category, year
│ ┌────────────────────────────────────────┐
│ │       FEATURE PLATE (16:10)            │
│ └────────────────────────────────────────┘
│      One-sentence description.  View project
│
│ ┌───────────────────┐  02
│ │  FEATURE PLATE    │  Project name
│ │  (4:5, left)      │  Category, year
│ └───────────────────┘  View project
├
│ Statement (serif, 36px)
│ Design | Code  (two columns)
├
│ Web
│   Business websites ........ Seen in 01, 03
│   E-commerce ............... Seen in 02
│ Design (stacked, headings sticky)
│ Development
├
│ 01  Discover   Step description. You get: …
│ 02  Define     (stacked, sticky numerals, no pin)
├
│ ┌────────┐  Serif lead. Working style.
│ │PORTRAIT│  Tools list
│ └────────┘
├ BONE SURFACE
│ TELL ME
│ WHAT YOU'RE
│ MAKING.
│ [EMAIL]  Copy
│ Form (single column)
│ Footer row
└
```

Tablet specifics: navigation shows Work and About inline plus a Menu button for the overlay; the cursor system is off (touch); Process is stacked with per-step sticky numerals instead of a pin; Features use a two-composition rhythm (wide 16:10 and offset 4:5) instead of six.

### 10.4 Mobile homepage wireframe (320–767, 4 columns)

```wf 36
┌
│ [NAME]                 (Menu)
│
│ WEBSITES
│ WITH A
│ POINT OF
│ VIEW.
│
│ ┌────────────────────────────┐
│ │       HERO PLATE (4:5)     │
│ └────────────────────────────┘
│ ● Available for select projects
│
│ Independent web designer and
│ developer. I design and build
│ websites for businesses, brands
│ and creatives.
│
│ Web development, digital design
│ 2026   India           Scroll
├
│ Selected work        All work
│
│ 01  Project name
│ Category, year
│ ┌────────────────────────────┐
│ │   PLATE (4:5, full-bleed)  │
│ └────────────────────────────┘
│ One-sentence description.
│ View project
│
│ 02  Project name
│ ┌───────────────────────┐
│ │  PLATE (1:1, inset)   │
│ └───────────────────────┘
│ ...
├
│ Statement (serif, 26px)
│ Design
│ Code
├
│ Web
│ Business websites
│ E-commerce ...
│ Design ...
│ Development ...
├
│ 01 Discover
│ Step text. You get: …
│ 02 Define ...
├
│ ┌────────────────────────────┐
│ │      PORTRAIT (4:5, mono)  │
│ └────────────────────────────┘
│ Serif lead. Working style.
├ BONE SURFACE
│ TELL ME
│ WHAT YOU'RE
│ MAKING.
│ [EMAIL]  Copy
│ Form (single column)
│ [NAME]  LinkedIn  GitHub
│ © 2026  India, 14:32 IST
│ Back to top
└
```

Mobile specifics: the hero puts the Plate **below** the headline (not beside it), so the headline gets full width at the largest size that fits; nothing depends on hover; tap targets are ≥ 48 × 48 px; menu opens as a full-screen overlay (§24).

---

## 11. Hero Specification

### 11.1 Headline directions

Five directions were developed. Each supports a different visual strategy. The set is a menu, not a mandate: the selected one is final unless the owner objects in review.

| # | Headline | Strategy it supports | Strength | Weakness |
|---|---|---|---|---|
| H1 | **DESIGNED / AND BUILT / BY ONE / PERSON.** | Pragmatic clarity. States the "no handoff" advantage. Stacked lines make a solid text block | Most explicit value | Reads as a statement about process, not about taste |
| H2 | **THE WEB, / DONE WITH / INTENT.** | Calm confidence; a poster. Very short lines allow enormous type | Elegant, quotable | Slightly abstract for a client scanning for "what do you make?" |
| H3 | **CODE. / DESIGN. / MOTION.** | Interactive typography: each word maps to a featured project and swaps the hero Plate on hover | Strong interaction hook | Capability-list feel; "Motion" over-promises for a business client |
| **H4 (selected)** | **WEBSITES / WITH A / POINT OF / VIEW.** | Claim plus poster composition. Names the product (websites) and the differentiator (a point of view = art direction) | Clear to clients, distinctive to designers, gives four lines for asymmetric indents | "Point of view" is a claim; the work below must back it up immediately (§12 does) |
| H5 | **[NAME] / WEB DESIGN / & DEVELOPMENT / 2026** | Identity-first studio plate; name is the object | Very editorial | Weakest for conversion; the person's name means little to a cold visitor |

**Selected: H4.** Runner-up if the owner wants a more pragmatic tone: H1.

### 11.2 Composition (desktop 1440 × 900)

```wf 92
┌
│ [NAME]                ● Available for select projects           Work  About (Contact)
│ ↑ 32 px from top; nav row height 64 px; text 15 px                         ↑ only pill
│
│ WEBSITES                                                       ┌──────────────────┐
│       WITH A                              col 9–12             │                  │
│ POINT OF                                  432 × 540            │     HERO PLATE   │
│       VIEW.                               top aligned to       │     (links to    │
│                                           line 1 cap height     │     featured     │
│ ← cols 1–8 →                                                   │     project)     │
│ Display 168 px / 0.88 / −0.035em                               └──────────────────┘
│ Lines 2 and 4 indent by 1 column (114 px)                       01  Project name  Year
│
│ Independent web designer and developer.       (Body-L, cols 1–4, max 34ch)
│ I design and build websites for businesses,
│ brands and creatives.
│
│ Web development, digital design      2026    India                          Scroll
│ ↑ metadata, 12 px, three separate       ↑ baseline-aligned         ↑ centred on col 12
└
```

Alignment and spacing:

- Headline occupies columns 1–8 and is left-aligned with alternating one-column indents on lines 2 and 4. It never touches the Plate: minimum 48 px between the widest line and the Plate's left edge at 1440.
- The Plate is columns 9–12, aspect 4:5, top-aligned to the cap height of line 1. It **does not overlap type**.
- Descriptor block is columns 1–4, set 96 px below the last headline line.
- Bottom metadata row sits 32 px above the bottom edge; three groups separated by whitespace, not by dots or slashes.
- Total hero height is `100svh` with a minimum of 720 px; at heights below 720 the descriptor moves under the Plate instead of shrinking the headline.

### 11.3 Content

| Element | Content |
|---|---|
| Availability | **● Available for select projects** (dot is Ultramarine, static). Text becomes "Booking from [MONTH 2026]" when the owner sets `availability.status = "booking"` **[INPUT]** |
| Descriptor | "Independent web designer and developer. I design and build websites for businesses, brands and creatives." |
| Metadata | "Web development, digital design", "2026", "India" (broad location only) |
| Plate caption | Featured project's index, name and year (`01 Project name, 2026`), set outside the Plate. Whole Plate is a link |
| Scroll cue | The word "Scroll" with a 1 px line that draws down once (1.2 s) and then stays still. Hidden after the first 80 px of scroll |

### 11.4 Opening sequence (Level 4 moment 1)

Total duration ≤ **1.7 s**, never blocks input, and runs once per session (a `sessionStorage` flag makes later visits use a 400 ms fade).

| t (ms) | Event | Detail |
|---|---|---|
| 0 | Page visible | Ink ground, nav present at opacity 0 |
| 0–300 | Nav fades in | Opacity only, 300 ms, `--ease-standard` |
| 100–1100 | Headline lines | SplitText line masks; each line translates up from 110% to 0. Stagger 90 ms, duration 900 ms, `--ease-out` |
| 500–1600 | Hero Plate | `clip-path: inset(100% 0 0 0)` → `inset(0)`, 1100 ms, `--ease-inout`; inner image scale 1.15 → 1 |
| 900–1300 | Descriptor and metadata | Opacity 0 → 1, 400 ms, stagger 80 ms |
| 1300–1700 | Availability dot and scroll cue | Opacity; the cue line draws |

Pointer events are enabled from t = 0; nothing waits for the timeline. If the user scrolls during the sequence, the timeline completes instantly.

### 11.5 Pointer behaviour

- **Fine pointer:** Plate tilts toward the pointer up to ±4° on each axis (perspective 1200 px), 600 ms damping; on hover the cursor becomes "Open" (§27).
- **Touch:** no tilt; tap opens the featured project with Plate-to-Page.
- **Optional enhancement (Phase 5):** the Plate becomes a WebGL surface with a soft displacement response (§37). The DOM Plate is the fallback and must look finished by itself.

### 11.6 Tablet and mobile

- **Tablet (768–1023):** headline 128 px across 5 of 8 columns; Plate sits in the right 3 columns, top-aligned to line 2; metadata row stays at the bottom.
- **Mobile (320–767):** headline uses 80 px / 0.9 at 390 (scaled down to 68 px at 360 and below so "WEBSITES" and "POINT OF" fit without wrapping); condensed width axis 78%. Plate follows the headline, full column width, 4:5. Availability sits under the Plate. Scroll cue is replaced by the natural continuation of the Selected Work heading peeking at the bottom edge (first 12 % of the next section is visible in the first viewport at 390 × 844).

### 11.7 Navigation specification

| Breakpoint | Layout |
|---|---|
| Desktop / laptop | `[NAME]` left; availability centre (hidden below 1200 px); **Work**, **About** as text links; **Contact** as the only outline pill (magnetic) |
| Tablet | `[NAME]`; Work, About inline; **Menu** button opens the overlay |
| Mobile | `[NAME]`; **Menu** button |

Rules: header is `position: fixed`, transparent, with `mix-blend-mode: difference` **not** used (it produces inconsistent contrast). Instead the header gets an Ink background at 0 → 92 % opacity after the first 80 px of scroll (opacity transition only, 200 ms). Header hides on scroll down and returns on scroll up (translateY, 300 ms) on mobile and tablet; on desktop it stays visible. Active section link is underlined (1 px) using scroll-spy. On Bone sections the header switches tokens to the paper theme.

---

## 12. Selected Work Specification

Selected Work is the most important proof on the site. It is **not** a card grid and not a list of thumbnails. It is a sequence of Features, each an art-directed composition, followed by a link to the Archive.

### 12.1 What every Feature shows

| Item | Detail |
|---|---|
| Index number | Two digits (`01`). It is an *address*: Capabilities cross-references it ("Seen in 01, 03") |
| Project name | Sentence case, `--text-h1` (96 px desktop), weight 600, width 88 % |
| Category and year | Metadata style (12 px), e.g. "E-commerce, 2026". No middle dots |
| Description | One sentence, ≤ 22 words, Body size, secondary colour |
| Plate | Main image with a per-project crop for each breakpoint |
| Link | "View project" text link with a 1 px underline that draws on hover. Internal, so no glyph. The whole Feature (Plate and text) activates the same destination |

A11y note: the Plate and the text share one destination, so implement **one** real anchor (wrapping the title and the "View project" text) and make the Plate a non-focusable, presentational region that forwards pointer clicks to that anchor. One tab stop per Feature, one link announced per Feature.

### 12.2 Six composition variants

Variants rotate; the same variant never appears twice in a row. Default order follows project order: V2, V1, V4, V5, V3, V6. A project may override with `featureLayout`.

| Variant | Composition |
|---|---|
| **V1 Wide plate** | Plate cols 1–12 (or 2–12 offset), 16:9. Title and meta below-left; description right column |
| **V2 Asymmetric split** | Plate cols 1–7, 4:5. Text stack cols 9–12, bottom-aligned to Plate |
| **V3 Full bleed** | Plate edge to edge, 21:9. Title sticks to the top-left of the viewport while the Plate scrolls through |
| **V4 Oversized type + Plate** | Project name at 12 vw across cols 1–12; a small Plate (cols 8–11) sits behind line 2, type in front with `mix-blend-mode: difference` only if the Plate's dominant tone passes a contrast check, otherwise type is placed clear of the Plate |
| **V5 Image-first, side-aligned** | Large Plate cols 5–12, text left cols 1–3 top-aligned; a smaller secondary Plate (mobile view) overlaps the large Plate's bottom-left corner |
| **V6 Stacked pair** | Two Plates, desktop view (cols 1–8) and mobile view (cols 9–11) offset vertically, moving at slightly different scroll speeds (≤ 6 % differential) |

```wf 82
┌
│ V2  Asymmetric split
│
│ ┌────────────────────────────┐
│ │                            │
│ │                            │            01
│ │        PLATE 4:5           │            Project name
│ │        cols 1–7            │            (H1, cols 9–12)
│ │                            │
│ │                            │            E-commerce, 2026
│ │                            │            One sentence description of what
│ └────────────────────────────┘            the site does. View project
├
│ V1  Wide plate
│
│ ┌──────────────────────────────────────────────────────────────────────────┐
│ │                                                                          │
│ │                    PLATE 16:9 (cols 1–12)                                │
│ │                                                                          │
│ └──────────────────────────────────────────────────────────────────────────┘
│ 02  Project name                                     One sentence. View project
│     Web application, 2026
├
│ V4  Oversized type + plate
│
│ 03 PROJECT NAME IN DISPLAY SCALE       ┌──────────┐
│                                        │  PLATE   │   (type sits in front)
│ Category, 2026                         └──────────┘
│ One sentence. View project
├
│ V5  Image-first, side-aligned
│
│ 04                    ┌──────────────────────────────────────────────┐
│ Project name          │                                              │
│ Category, 2026        │        LARGE PLATE (cols 5–12)               │
│ One sentence.       ┌─┴────────┐                                     │
│ View project        │ SMALL    │                                     │
│                     │ (mobile) │                                     │
│                     └──────────┘─────────────────────────────────────┘
└
```

### 12.3 Behaviour

| Interaction | Desktop (fine pointer) | Touch / mobile |
|---|---|---|
| Reveal | When 25 % of the Plate is in view (once): `clip-path` inset reveal 900 ms `--ease-inout`, inner image scale 1.15 → 1 over 1200 ms | Same, but 600 ms and no scale |
| Hover | Cursor becomes "Open"; image translates opposite the pointer by up to 8 px (`quickTo`, 500 ms); image scale 1.03 over 600 ms; the "View project" underline draws left to right (400 ms) | None |
| Focus | 2 px Ultramarine outline, 3 px offset, around the Plate and title as a group; same underline draw | Same |
| Press | Cursor "Open" compresses to 90 % for 120 ms | Plate scales to 98.5 % for 120 ms |
| Activate | **Plate-to-Page** (§26.2) | Same, shortened to 700 ms |
| Reduced motion | No reveal animation, no parallax, 150 ms opacity transition on route change | Same |

Do **not** add: staggered fade-ups on text, tilt on Feature Plates, glow on hover, or dimming siblings. Feature text is simply present.

### 12.4 Mobile compositions

Each Feature becomes one vertical unit: number and name, category and year, Plate, description, link. Variation is retained through **Plate aspect and bleed** rather than layout: the default cycle is 4:5 full-bleed → 1:1 inset (20 px margins) → 16:10 full-bleed → 4:5 inset right-aligned (80 % width). Each project supplies a `mobileCrop` focal point per Plate (§33).

### 12.5 The Archive (`/work`)

A typographic index of all published projects. It is the "exploration" surface.

| Element | Spec |
|---|---|
| Row | Rule above; index number (metadata style), project name (`--text-h1` at 64 px), category, year. Rows are 128 px tall on desktop |
| Hover (fine pointer) | Row title shifts 16 px right over 350 ms; other rows drop to 35 % opacity over 250 ms; a **preview Plate** (320 × 400) follows the cursor with `quickTo` (x, y, 500 ms lag) and reveals with a 450 ms clip-path. Cursor is "View" |
| Focus (keyboard) | Same as hover, but the preview Plate is anchored to the right column instead of following a pointer |
| Touch | Each row shows a 88 × 110 Plate at its right edge; tap opens the case study. No preview, no dimming |
| Activation | Plate-to-Page from the preview Plate (desktop) or the inline Plate (touch) |
| Sort | Project `order` ascending. No filters in v1 (few projects) |
| Phase 5 | View toggle **Index / Gallery**. Gallery morphs the same rows into an irregular Plate layout using Flip (never a three-column card grid) |

### 12.6 Count rules

- Launch minimum: **3 published projects** **[INPUT]**. Home shows up to 5 Features; the Archive shows all.
- With fewer than 3: Features render with V2 only, the Archive link is hidden, and the build prints a warning.
- Placeholder projects never ship (§32).

---

## 13. Project Detail Specification

### 13.1 Design intent

A case study is a visual essay with sticky context, not a long document. Imagery leads; text is short and set in narrow columns; the visitor can leave at any point to the live site.

### 13.2 Recommended template

Blocks are optional except the first three. The order below is the default; the `sections` array in each project (§33) controls the actual order.

| # | Block | Layout | Content |
|---|---|---|---|
| 1 | **Case hero** | Title (H1, cols 1–9), facts table (cols 10–12: Year, Category, Role, Tools). Below: full-width Plate 16:9, edge to edge inside the margins | Receives the Plate from Plate-to-Page |
| 2 | **Overview** | Text cols 5–9 (≤ 62 ch), large body | 2–3 sentences. "Visit live site ↗" pill and optional "View source ↗" |
| 3 | **Sticky facts** | Cols 1–3, `position: sticky; top: 96px` | Project name, year, role, tools, live link. Present from the Overview onward |
| 4 | **The problem** | Text cols 5–9; optional margin caption cols 10–12 | Sentence-case H3 heading, 60–110 words. No eyebrow labels |
| 5 | **The approach** | Same | Same |
| 6 | **Design direction** | Text + Plate composition (pair, offset, or full-bleed) | Type, colour, imagery decisions with small captions |
| 7 | **Screens** | Horizontal gallery (pinned) | 4–8 Plates; desktop scroll-driven x movement; touch uses native horizontal scroll-snap |
| 8 | **Responsive views** | Three Plates or one Rotato device-triplet export | Desktop, tablet, mobile side by side. Shown once per case study |
| 9 | **Comparison** | Before/after slider | Redesign projects only. Keyboard: left/right arrows move the divider by 5 % |
| 10 | **Development** | Text + typographic list with rules | Stack, key technical decisions, integrations. Plain language |
| 11 | **Features** | Typographic list (name left, one line right), rules between | 4–8 items |
| 12 | **Challenges** | Two-column list: challenge / what was done | 2–4 items |
| 13 | **Result** | Text cols 5–9 | Qualitative statement. **Numbers appear only if `results[].verified` is true** and the owner has supplied them |
| 14 | **Live website** | Full-width text link at H2 scale | "Visit live site ↗" |
| 15 | **Next project** | Full-bleed Plate of the next project with its title | Activating uses Plate-to-Page; last project links to the first |

### 13.3 Desktop wireframe

```wf 88
┌
│ [NAME]                                                   Work   About  (Contact)
│
│ Project name across two                                   Year        2026
│ lines at display scale                                    Category    E-commerce
│ (H1, cols 1–9)                                       Role        Design, development
│                                                           Tools       React, GSAP
│ ┌──────────────────────────────────────────────────────────────────────────────┐
│ │                                                                              │
│ │                     CASE HERO PLATE 16:9                                     │
│ │                     (arrives via Plate-to-Page)                              │
│ │                                                                              │
│ └──────────────────────────────────────────────────────────────────────────────┘
├
│ Project name          Overview text, 2–3 sentences,
│ Year                  large body, cols 5–9.
│ Role                  (Visit live site ↗)
│ Tools
│ Live site ↗
│ (sticky, cols 1–3)    The problem
│                       60–110 words.                          Caption in margin
│                       ┌──────────────────────────────────┐   cols 10–12
│                       │  PLATE (offset composition)      │
│                       └──────────────────────────────────┘
│                       The approach ...
├
│ SCREENS (pinned, x moves as you scroll)
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────
│ │  plate   │ │  plate   │ │  plate   │ │  plate   │ │  plate
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────
├
│ Responsive views:  ┌────────────┐ ┌──────┐ ┌───┐
│                    │  desktop   │ │tablet│ │ m │
│                    └────────────┘ └──────┘ └───┘
├
│ Development · Features · Challenges · Result   (text + typographic lists)
├
│ Visit live site ↗                                       (H2 scale link)
├
│ ┌──────────────────────────────────────────────────────────────────────────────┐
│ │       NEXT PROJECT: full-bleed Plate, title over lower-left (clear zone)      │
│ └──────────────────────────────────────────────────────────────────────────────┘
└
```

### 13.4 Mobile behaviour

- Single column; facts table collapses under the H1 as a two-row definition list.
- No sticky facts; the live-site link is repeated as a pill after the Overview and at the end.
- Screens gallery is a native horizontal scroll-snap strip with 12 % of the next Plate visible as the affordance.
- Comparison slider works by drag with a 48 px handle; a "Before / After" toggle button pair is the keyboard/AT alternative on all breakpoints.
- Next project is a full-width Plate with the title beneath it.

### 13.5 Transitions and scroll behaviour

| Interaction | Behaviour |
|---|---|
| Arrival | Plate-to-Page (§26.2). Direct landing (no prior page) instead reveals the hero Plate with the standard 900 ms clip reveal |
| Sticky facts | CSS `position: sticky`; no JS |
| Pinned Screens | ScrollTrigger pin, scrub 0.6, length = 1.2 × the gallery's overflow width. Disabled on touch and reduced motion |
| Plate reveals within body | Same clip-path reveal as Features, once |
| Leaving | "Next project", or nav; default route transition is a 250 ms exit fade plus 450 ms enter fade |

### 13.6 Content rules for case studies

- Every claim is either observable from the screenshots or supplied by the owner. Anything else is omitted.
- Client names and live URLs are optional; a project may be titled by its category if the client name cannot be shown (**[INPUT]**).
- Placeholder case studies must be visibly marked `PLACEHOLDER` in dev builds and are blocked from production builds (§32).

# [NAME] — Personal Studio Portfolio

**Product Requirements Document · v1.0 · 20 September 2026**

| | |
|---|---|
| Document type | Build-ready PRD: product, art direction, interaction design and front-end architecture in one document |
| Intended reader | A senior front-end developer or AI coding agent building the site end to end without inventing design direction |
| Scope | Home page, `/work` archive, project case studies, 404. Static-first, one serverless function for the contact form |
| Status | Ready for handoff. Anything marked **[INPUT]** needs owner content before launch |
| Placeholders | `[NAME]`, `[CITY]`, `[EMAIL]`, `[DOMAIN]` and similar are literal placeholders. Nothing here is a claim about the owner's history, clients or results |

### Reading conventions

- **MUST / SHOULD / MAY** carry their usual meaning. **Decision** means final: the implementer does not reopen it unless a stated gate fails.
- Design tokens are written `--color-*`, `--space-*`, `--ease-*`, `--dur-*`, `--text-*`. Names are normative; values live in §19–23.
- Breakpoint names: **mobile** 320–767, **tablet** 768–1023, **laptop** 1024–1439, **desktop** ≥1440. Tailwind screens: `md` 768, `lg` 1024, `xl` 1440.
- Vocabulary used throughout: **Plate** (the image container, §19), **Feature** (one Selected Work composition, §12), **Archive** (`/work`), **Plate-to-Page** (the signature transition, §26), **L1–L4** (motion levels, §25).

### Author disclosure (read before building)

I did not have live access to your MCP component libraries while writing this. Sections 34 and 35 (component research and the sourcing matrix) are therefore **pre-selections based on general knowledge of those libraries**, written so they can be validated quickly. The first task of Phase 0 is the MCP research pass described in §34. If a live library offers a better candidate that passes the Admission Test, substitute it and log the decision. Nothing else in this PRD depends on which specific library component is chosen. Version numbers and API names (GSAP plugin options, font axes, Tailwind syntax) should be verified when dependencies are pinned.

---

## 1. Executive Summary

**What is being built.** A premium personal portfolio for an independent web designer and developer. It has two equal jobs: establish a distinctive personal brand, and convert visiting clients (founders, small businesses, agencies, creatives) into enquiries. The work itself carries the credibility; the site never says "award-winning" and never shows a number it cannot prove.

**The concept.** *Digital Object / Personal Studio.* The site is built from exactly three materials:

- **Type**: oversized, tightly set grotesk. It is the voice.
- **Plate**: a bounded image object with consistent physical behaviour (it tilts, reveals, expands). It is the proof.
- **Rule**: a hairline used only where it encodes structure (index rows, tables, form fields). It is the grammar.

Everything on the page is one of these three. There are no cards, no icon tiles, no gradients, no decorative shapes.

**The one memorable thing.** *Plate-to-Page*: when a visitor opens a project, the project's image expands out of the page into the case study hero, and the case study title sets itself over it. It is the only Level-4 interaction that repeats across the site, so it becomes the site's signature without becoming noise.

### Key decisions at a glance

| Area | Decision |
|---|---|
| Creative direction | **Direction C, Dark Interactive Art Direction**, disciplined by Direction A's rules; a single optional WebGL Plate borrows from Direction B (§3.2) |
| Hero headline | **WEBSITES / WITH A / POINT OF / VIEW.** Four alternatives with rationale in §11 |
| Palette | Ink `#0A0A0A`, Surface `#111111`, Bone `#F3F1EC`, one accent **Ultramarine `#5A6CFF`**. The closing screen inverts to Bone ("lights on") |
| Typography | **Instrument Sans** (variable weight and width) for every sans role; **Newsreader** (roman) only for long-form statements |
| Layout | 12 / 8 / 4 column grid, deliberate asymmetry, no card grids anywhere |
| Selected Work | Sequence of Features in six composition variants, then a typographic Archive with cursor-following preview |
| Signature | Plate-to-Page shared-element transition (GSAP Flip) |
| Motion | GSAP + ScrollTrigger + SplitText + Flip; Lenis smooth scroll on fine-pointer devices only; at most four Level-4 moments in the whole site |
| Stack | React 19, Vite, TypeScript, Tailwind CSS v4, React Router with build-time prerender, Radix primitives (via shadcn/ui), Vercel |
| Backend | None, except a single serverless function for the contact form |
| Performance | LCP ≤ 2.0 s, INP ≤ 150 ms, CLS ≤ 0.02, initial JS ≤ 180 KB gzip on a mid-range phone over throttled 4G |
| Content | Data-driven (`projects.json`), validated at build. **A production build fails if placeholder content remains** |

---

## 2. Product Vision

**Vision statement.** A visitor should finish the first minute believing three things: this person can design a site that looks considered, can build it properly in code, and is easy to work with. They should believe it because of what they saw, not what they were told.

**Experience principles** (used as tie-breakers in every later decision):

1. **Proof before pitch.** Real work appears immediately after the hero. Claims come after evidence.
2. **One bold moment.** Boldness is spent on the Plate-to-Page transition and the hero. Everything else is disciplined.
3. **Type first.** Hierarchy, rhythm and personality come from typography and space before imagery or effects.
4. **Static by default, motion by consequence.** Content is simply there. Motion appears when it answers a user action or explains a change of state, plus one orchestrated opening.
5. **Every device gets an intentional version.** Mobile is composed separately, not shrunk.
6. **Honest content.** No invented clients, awards, testimonials, metrics or skill percentages. Placeholders are visibly placeholders.
7. **Fast is part of the design.** A premium feel that stutters on a mid-range phone is not premium.

**How the first minute should feel**

| Time | What the visitor experiences |
|---|---|
| 0–5 s | A poster-like composition: four-line headline, one Plate showing real work, one line saying what this person does, availability status. No navigation confusion |
| 5–20 s | Scroll into the first Feature. A large, art-directed piece of work with its category and year. They understand the quality bar |
| 20–60 s | Two or three more Features in different compositions, the philosophy statement, the capabilities list. They understand the range and the way of working |
| Decision | A persistent, quiet "Contact" control and a closing screen that asks a plain question |

---

## 3. Design Philosophy

### 3.1 The concept: three materials

| Material | Role | Rules |
|---|---|---|
| **Type** | Voice and hierarchy | Oversized display type is set uppercase and tight; everything else is sentence case. Display lines are the only text that gets masked reveals |
| **Plate** | Proof and interaction target | One component. 4 px radius. Never carries text except a caption placed outside it. Same reveal, tilt and expand behaviour everywhere |
| **Rule** | Structure | 1 px, `--color-border`. Only used to separate index rows, table rows and form fields. Never decorative |

The "digital object" idea is the Plate: each image is treated as a tangible object with a consistent physical response, instead of a rectangle in a layout. The "personal studio" idea is the tone: first person, plain, one person doing the whole job.

### 3.2 Three creative directions considered

**Direction A: Editorial Minimal**

| | |
|---|---|
| Visual language | Paper-white ground, strict grid, generous whitespace, small images, almost no chrome |
| Typography | One neo-grotesk plus an editorial serif for body text; medium-scale headlines |
| Colour | Off-white and black; no accent |
| Motion | Fades and short slides only |
| Interaction | Standard links, standard cursor |
| Strengths | Highest trust, fastest to build, easiest to maintain, superb accessibility |
| Risks | Reads as "another minimal portfolio"; memorability depends entirely on imagery; hard to signal that this developer can build interactive work |
| Technical complexity | Low |

**Direction B: Experimental Digital Studio**

| | |
|---|---|
| Visual language | WebGL-forward: shader hero, draggable canvas of work, non-linear navigation, variable-type behaviour everywhere |
| Typography | Mixed scales and rotations, expressive type distortion |
| Colour | High-contrast with a saturated accent, occasional colour fields |
| Motion | Continuous, scroll- and pointer-driven across most of the page |
| Interaction | Custom cursor everywhere, drag navigation, animated page geometry |
| Strengths | Highest memorability, strongest "creative developer" signal |
| Risks | Confusing for business owners who need to find information fast; heavy on mid-range Android; expensive to maintain; motion overload can read as trying too hard |
| Technical complexity | High |

**Direction C: Dark Interactive Art Direction**

| | |
|---|---|
| Visual language | Ink ground, Bone type, oversized display lines, Plates as the only imagery, asymmetric compositions, one closing inversion to Bone |
| Typography | Instrument Sans at a wide range of scale, condensed for display; Newsreader only for statements |
| Colour | Ink, Surface, Bone, one Ultramarine accent used sparingly |
| Motion | One orchestrated hero opening, pointer-driven Plate behaviour, one signature transition, otherwise still |
| Interaction | Custom cursor with five states (fine pointers only), magnetic primary buttons, hover previews |
| Strengths | Feels like a studio, strong at first glance, showcases interaction skill without hiding the work, scales down to mobile cleanly |
| Risks | Dark portfolios are common; distinctiveness must come from the type and composition, not the colour. Interactions can accumulate |
| Technical complexity | Medium |

**Selected: Direction C, with A's discipline and one measured borrowing from B.**

Reasoning, qualitatively:

- *Uniqueness.* A is the least distinctive and B the most, but B's uniqueness comes from effects that a typical client will not value. C's uniqueness comes from composition, condensed display type and a coherent Plate behaviour, which are visible in the first screen and survive on mobile.
- *Professionalism and client trust.* C keeps the information architecture conventional enough that a business owner finds work, capabilities and contact without thinking. B fails this. A passes it but says little about capability.
- *Maintainability.* C's interaction language is small (Plate, Type, Rule) and shared, so adding a project does not mean adding code. B requires bespoke work per page.
- *Performance.* C is mostly transform and opacity on a handful of elements. WebGL is optional, lazy, and can be removed without changing the layout.
- *Visual impact.* C delivers a strong first frame and one high-impact transition. It gives up B's constant spectacle deliberately.

Rules taken from A: whitespace is a design material; content is present without needing an animation to reveal it; the site must look finished with all motion turned off. The one thing borrowed from B: an optional shader on the hero Plate (§37), which the site must not need.

### 3.3 Defaults deliberately rejected

These are the choices a template or code generator reaches for on "dark, editorial, premium" briefs. Each was considered and replaced.

| Common default | Why it is avoided | What this PRD does instead |
|---|---|---|
| Acid green or vermilion accent on near-black | The two most common accents for this exact look | Ultramarine, the "print ink" blue, which contrasts warmly with Bone and is used almost nowhere else |
| One word of the headline in italic serif or accent colour | A recognisable tell on generated sites | Headline is set in one style. Serif appears only in long statements (Philosophy, About lead) |
| Tracked all-caps eyebrow above every heading | Adds noise; labels that label nothing | Uppercase only for hero/contact display lines and 12 px metadata. No eyebrows |
| Monospace for small data labels | "Technical" costume | Metadata set in Instrument Sans with tabular figures |
| Arrow glyph appended to every link | Decoration | `↗` only on links that leave the site; internal links have no glyph |
| Fade-and-slide-up on every section | The generic default for scroll animation | No section-level scroll fades. Motion budget is defined in §25 |
| Everything in rounded cards with the same shadow | The SaaS kit | No cards. Plates only, 4 px radius, no shadows |
| Numbered markers on everything | Numbering that does not encode sequence | Numbers appear only in the Index (they are addresses, cross-referenced by Capabilities) and in Process (a true sequence) |
| Gradient washes, glass panels, blobs | Decorative | Flat Ink and Bone fields |
| Cream ground with terracotta accent | Another common signature | Bone appears only for the closing screen, paired with Ink type and Ultramarine |

### 3.4 Anti-cringe rules (strict checklist)

**The test.** Every visual or motion element must be assigned exactly one job: **Inform**, **Navigate**, **Prove**, or **Respond** (react to a user action). An element whose honest job is "Decorate" is removed. The implementer records the job for each element in the component's doc comment; reviewers reject any PR where the job is missing or is "Decorate".

**Hard rejects.** Any of the following fails review:

1. Skill percentage bars, skill "clouds", star ratings, tool-logo walls.
2. Fake or unlabelled placeholder testimonials, client logos, awards, statistics ("50+ projects", "99% satisfaction").
3. Emoji in UI or copy. Rocket ships, sparkles, waving hands.
4. Floating cards, glassmorphism, blurred blobs, aurora gradients, glow effects, neon.
5. Rotating cubes, particle fields, random spheres or any 3D without a stated job.
6. Typewriter effects, looping marquees of tech names, bouncing scroll arrows, infinite pulsing elements (the availability dot is static).
7. Headline patterns: "Hello, I'm…", "Turning ideas into…", "Crafting digital experiences", "Passionate developer".
8. Custom cursors that cover form controls, that lag more than 200 ms behind the pointer, or that exist on touch devices.
9. Scroll-jacking that overrides native scroll direction or blocks keyboard scroll.
10. Any animation that must finish before content can be read or used (the hero intro is capped at 1.8 s and never blocks input).
11. Copy that a competitor could paste in unchanged.
12. A component whose original library identity (default radius, shadow, gradient, font, easing) is still visible.

**Copy filter.** See §7 for banned and preferred words.

---

## 4. Goals

**Primary goals**

1. **Personal brand.** Communicate, through the site's own craft, that the owner designs interfaces, builds production websites, understands hierarchy and responsive systems, and handles modern front-end implementation.
2. **Client conversion.** Within one minute a prospective client understands what is offered, what quality to expect, what has been built, and how to make contact.

**Secondary goals**

3. Give recruiters, collaborators and other designers or developers a fast route to work, tools and contact.
4. Make adding a project a content task (edit JSON, add images), not a code task.
5. Stay fast enough to be a living proof of the "performance optimisation" capability.

**Success measures.** Baselines are set in the first 30 days after launch; no target is invented in advance.

| Measure | How it is captured |
|---|---|
| Contact rate | `contact_submit_success` and `email_click` per unique visitor (§48) |
| Work engagement | Share of visitors who open at least one project (`project_open`) |
| Live-site clicks | `live_site_click` per project |
| Performance | Lighthouse CI and field data (Core Web Vitals) against §45 budgets |
| Enquiry quality | Owner tags each enquiry as relevant / not relevant to tune positioning copy |

---

## 5. Non-Goals

- No blog, newsletter, or CMS in v1. (Content architecture leaves room for MDX later; see §32.)
- No light/dark toggle. The site is dark with one deliberate inversion.
- No localisation in v1. English only. Routes and copy are structured so it can be added.
- No e-commerce, accounts, chat widgets, cookie banners (analytics are cookieless) or third-party embeds.
- No pricing page. Engagement types are described; prices are discussed privately.
- No preloader or splash screen. It costs LCP and adds nothing.
- No testimonials, client-logo strip, "awards" or numerical claims until the owner can supply real, attributable ones (**[INPUT]**). The design has no slot that requires them.
- No standalone About page in v1. About is a home section.

---

## 6. Target Audience

| Segment | What they need in the first minute | What they look for | How the site serves them |
|---|---|---|---|
| **Founders and small businesses** (primary) | Can this person make my site look credible? What would they build for me? | Recognisable site types (business, e-commerce, landing, web app), clean project pages, an easy way to ask | Hero states the offer plainly; Features show varied site types; Capabilities lists them in plain language; Contact form asks what they are making |
| **Agencies and other studios** | Can I trust this person with front-end delivery? | Code quality signals, performance, accessibility, process | Case study "Development" blocks; stated performance and accessibility commitments; Process section |
| **Personal brands, artists, creative businesses** | Will my site feel like *me* rather than a template? | Taste, typography, imagery treatment | Editorial compositions; Plate treatment; About section voice |
| **Recruiters and collaborators** (secondary) | Role, stack, contact, résumé | Tools, links, clarity | About lists tools **[INPUT]**; résumé link **[INPUT]**; social links |
| **Developers and designers** (secondary) | Is the craft real? | Interaction quality, restraint, performance | The site itself, plus case study notes on technical decisions |

Design for the 20–60 second visitor first; everything deeper (case studies, Process, About) is for the visitor who has already decided to keep reading.

---

## 7. Brand Positioning

**Positioning statement.** *[NAME] is an independent web designer and developer who designs and builds websites end to end, so what gets designed is what gets shipped.*

**Differentiators to communicate (through work and copy, never through slogans)**

1. One person owns design and code: no handoff loss.
2. Layouts and type are considered at real content lengths, on real devices.
3. Motion is used deliberately and always has a reduced-motion version.
4. Sites are fast and accessible by default.

**Voice.** First person singular ("I design and build…"). Plain verbs. Specific nouns. Short sentences. Confident without claiming superiority.

| Prefer | Avoid |
|---|---|
| design, build, set up, ship, launch, tune, test, write | crafting, curating, elevating, unlocking, leveraging, empowering, revolutionising |
| websites, pages, stores, interfaces, layouts | solutions, experiences (as a noun for a website), ecosystems, journeys |
| "I" and "you" | "we" (unless a team exists), "our", third-person self-reference |
| Concrete claims the owner can back up | seamless, cutting-edge, world-class, award-winning, next-level, pixel-perfect |

**Name usage.** The wordmark is `[NAME]` set in Instrument Sans 600, sentence case, no logo mark, no icon. If the owner uses a studio name, the wordmark reads `[NAME]` and the footer states `[STUDIO NAME] — independent web design and development`. **[INPUT]**

---

## 8. Information Architecture

### 8.1 Narrative structure

| # | Section | Job for the visitor | Desktop height | Surface |
|---|---|---|---|---|
| 1 | **Hero** | Understand the offer and see real work | 100 svh | Ink |
| 2 | **Selected Work** | See proof: 3–5 Features, then a link to the Archive | ≈ 130 svh per Feature | Ink |
| 3 | **Philosophy** | Understand how design and code are treated as one job | ≈ 100 svh | Ink |
| 4 | **Capabilities** | Find the kind of site they need, in plain language | ≈ 180 svh (three sticky blocks) | Ink |
| 5 | **Process** | Understand what working together looks like | ≈ 350 svh pinned (desktop), stacked (mobile) | Ink |
| 6 | **About** | Meet the person; see tools and working style | ≈ 120 svh | Surface |
| 7 | **Contact + Footer** | Get in touch, easily | ≈ 110 svh | **Bone (inverted)** |

### 8.2 Changes from the suggested structure, and why

1. **Selected Work and Project Exploration are merged.** The exploration is the Feature sequence plus the Archive with hover preview. Two sections in a row about the same thing would slow the route to proof.
2. **Philosophy sits after Work, not before.** Proof before pitch. The statement lands harder once the visitor has seen what it describes.
3. **Process comes before About.** Prospective clients care how the project will run before who runs it. About is where the person appears, once trust exists.
4. **Contact and Footer share one inverted surface.** Switching to Bone at the very end reads as "lights on": a clear, unhurried ending and a strong reason for the contact section to feel different from everything above.
5. **No standalone About or Contact pages in v1.** Single-page anchors reduce navigation cost. `/work` and `/work/:slug` exist because they benefit from their own URLs and metadata.

### 8.3 Sitemap

```
/                  Home (all sections above)
/work              Archive: every published project as a typographic index
/work/:slug        Case study
/404               Not found
/sitemap.xml       Generated at build
/robots.txt        Static
```

---

## 9. User Journey

### 9.1 Primary journey: prospective client, first visit

| Stage | Trigger | Experience | Exit condition |
|---|---|---|---|
| Land | Link from social, search, referral | Hero opens in ≤ 1.8 s. Headline, descriptor, availability dot, hero Plate | Understands "web designer and developer" |
| Scan | Scroll cue or scroll | First Feature enters; large Plate, project name, category, year | Judges quality |
| Test | Curiosity | Hovers or taps a Plate; cursor becomes "Open" or the Plate responds | Opens a project |
| Deepen | Interest | Plate-to-Page transition; case study shows role, problem, approach, results, live link | Clicks "Visit live site ↗" or continues |
| Decide | Trust | Philosophy, Capabilities, Process answer "what would working together be like" | Scrolls to Contact or presses the nav Contact control |
| Act | Intent | Closing screen: plain question, email, short form | Sends form or clicks email |
| Return | Later | Sitemap and direct case-study URLs work as landing pages | — |

### 9.2 Secondary journeys

- **Recruiter (30 s).** Hero → nav "About" → tools list and résumé link → email.
- **Designer or developer (2 min).** Hero → Features → a case study's "Development" and "Challenges" blocks → view source of the page (clean semantic markup, no bloat).
- **Shared case-study link.** Lands directly on `/work/:slug`. The page must stand alone: title, role, year, summary and live link above the fold; "Next project" and "Back to work" at the end; header nav present.

### 9.3 Failure paths the design must handle

| Failure | Behaviour |
|---|---|
| JavaScript fails or is slow | Prerendered HTML is readable and navigable; no content is hidden by default and revealed by JS (§25 rule: reveals start from visible in a `no-js` state) |
| Fonts slow | Metric-matched fallback prevents layout shift (§20) |
| Images slow | Plates show a flat `placeholderColor` at the correct aspect ratio; no layout shift |
| WebGL unavailable or crashes | DOM Plate is already in place; canvas is an enhancement (§37) |
| Form submission fails | Inline error with the direct email link; the message text is preserved |

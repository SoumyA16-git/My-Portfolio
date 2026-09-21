## 14. About Specification

### 14.1 Intent

About is where the person appears, after trust has been built by work and process. It communicates mindset, way of working and the kinds of project taken on. It does not recite a biography, and it contains no claim the owner cannot back up (**[INPUT]** marks everything that needs confirmation).

### 14.2 Structure and copy (proposed, owner to approve)

| Element | Style | Content |
|---|---|---|
| Lead | Newsreader 400, 40 px / 1.2 desktop; 26 px / 1.25 mobile; max 24 em wide | "I design and build websites myself, so what gets drawn is what ships. The decisions made in the layout are the ones that arrive in the browser." |
| Paragraph 1 | Body, ≤ 62 ch | "I work on a small number of projects at a time. That keeps me in the details: how a headline breaks on a phone, how a page loads on a slow connection, what happens when a customer has a very long name or very little patience." |
| Paragraph 2 | Body | "Most of my work is business websites, online stores, landing pages and custom web applications. I'm based in [CITY], India, and work with clients in [TIME ZONES]. **[INPUT]**" |
| How I work | H3 + three ruled lines (sentence case, no numbers) | "Direct: one point of contact and written updates at agreed intervals." / "Careful: real content, real devices, tested before you see it." / "Ready to hand over: you receive the files, documentation and a walkthrough." **[INPUT: confirm commitments]** |
| Tools | H3 + plain text list (no logos, no levels) | **[INPUT]**. Proposed starting list: Figma, React, TypeScript, Tailwind CSS, GSAP, Three.js (where it earns its place), Vercel |
| Résumé | Text link, internal-download style (no `↗`) | "Download résumé (PDF)" **[INPUT]** |
| Portrait | Plate, 4:5, monochrome treatment | Real photograph **[INPUT]**. Caption outside the Plate: "[NAME], [CITY]" |

There is no timeline, no "years of experience" badge, no skill bars, no technology cloud.

### 14.3 Wireframe (desktop)

```wf 88
┌
│ ┌────────────────────┐       I design and build websites myself, so what
│ │                    │       gets drawn is what ships. The decisions made in
│ │                    │       the layout are the ones that arrive in the browser.
│ │     PORTRAIT       │       (Newsreader 40 / 1.2, cols 6–12)
│ │     4:5, mono      │
│ │     cols 1–4       │       I work on a small number of projects        How I work
│ │                    │       at a time. That keeps me in the details…    ─────────────
│ │                    │       (Body, cols 6–9)                            Direct: …
│ │                    │                                                   ─────────────
│ └────────────────────┘       Most of my work is business websites,       Careful: …
│ [NAME], [CITY]               online stores, landing pages…               ─────────────
│                                                                          Ready to hand over: …
│                              Tools                                       ─────────────
│                              Figma, React, TypeScript, Tailwind CSS,
│                              GSAP, Three.js, Vercel                      Download résumé (PDF)
└
```

Alignment: the portrait is left-anchored (cols 1–4) and bottom-aligned to the last text block; text is right-weighted (cols 6–12). This deliberately mirrors the left-anchored Capabilities above it.

### 14.4 Behaviour

- Surface is `--color-surface` (`#111111`), one step off Ink, so the section reads as a room change without a colour change.
- Portrait: monochrome (`filter: grayscale(1) contrast(1.05)`) by default; colour returns on hover over 500 ms on fine pointers only. Touch devices show the treated monochrome image; nothing depends on the colour.
- No entrance animation on text. The lead line may use the L3 display-line mask **only** if it is set in Instrument Sans; as Newsreader body copy it is static.
- Mobile: portrait first (full-bleed 4:5), then lead, paragraphs, How I work, Tools, résumé.

---

## 15. Capabilities Specification

### 15.1 Intent

Capabilities answers "can you make the kind of site I need?" in plain language, and ties each answer back to real projects. It is set like a **specimen sheet**: an oversized discipline name on the left, a ruled list on the right. No icons, no cards, no percentages.

### 15.2 Content (proposed)

**Web**

| Item | One-line description |
|---|---|
| Business websites | Clear, fast sites that explain what you do and make it easy to get in touch |
| E-commerce | Stores with considered product pages and a checkout that stays out of the way. Platforms: **[INPUT]** |
| Landing pages | Single-purpose pages for launches, campaigns and services |
| Custom web applications | Interfaces for tools, dashboards and internal systems |

**Design**

| Item | One-line description |
|---|---|
| Interface direction | Layout, hierarchy and typography set at real content lengths |
| Visual systems | Colour, type and spacing rules that keep a site consistent as it grows |
| Responsive interfaces | Composed separately for phone, tablet and desktop, not shrunk |
| Interaction and motion | Deliberate movement where it helps people use the page |

**Development**

| Item | One-line description |
|---|---|
| Front-end build | Semantic, accessible React and TypeScript, written to be maintained |
| Animation | GSAP-based motion, always with a reduced-motion version |
| CMS and data integration | Connecting content, products and forms to the systems you already use |
| Performance optimisation | Image, font and script budgets so pages load quickly on ordinary phones |

Owner may remove any item they do not want to offer. Nothing is added by the implementer.

### 15.3 Wireframe (desktop, one block shown)

```wf 88
┌
│ Web                                Business websites                     Seen in 01, 03
│                                    Clear, fast sites that explain what you do…
│ (H1 scale, 96 px)                  ────────────────────────────────────────────────────
│ sticky, top 120 px                 E-commerce                            Seen in 02
│ cols 1–5                           Stores with considered product pages…
│                                    ────────────────────────────────────────────────────
│                                    Landing pages
│                                    Single-purpose pages for launches…
│                                    ────────────────────────────────────────────────────
│                                    Custom web applications               Seen in 04
│                                    Interfaces for tools, dashboards…
│                                    cols 6–12
├
│ Design            (next block: heading sticks until its list scrolls past)
├
│ Development       (same pattern)
└
```

### 15.4 Behaviour

| Aspect | Spec |
|---|---|
| Sticky heading | CSS `position: sticky; top: 120px` inside its own block. No JavaScript |
| Row | Item name at `--text-h3` (28 px), description at Body in secondary colour, rule between rows |
| "Seen in" | Right-aligned metadata. Generated from each project's `capabilities` tags; each number links to that project. **If no project carries the tag, nothing is shown**. Never fabricated |
| Hover (fine pointer) | Row's "Seen in" numbers underline; item name shifts 8 px right over 300 ms. No other effects |
| Focus | "Seen in" links have the standard focus ring |
| Tablet | Same layout, headings at 72 px, sticky retained |
| Mobile | Heading is H2 scale (32 px), not sticky, sits above its list; rows stack; "Seen in" moves below the description |
| Reduced motion | The 8 px shift is removed |

---

## 16. Process Specification

### 16.1 Intent

Process reassures a prospective client that the project will be organised. The six steps are a true sequence, so numbering is appropriate here. The treatment avoids a horizontal timeline: on desktop the section is a pinned, spatial sequence in which a giant numeral changes as the visitor scrolls.

### 16.2 Content (proposed)

| Step | Title | Description | You get |
|---|---|---|---|
| 01 | Discover | We talk through the business, the audience and what the site has to do | A short written brief |
| 02 | Define | Scope, structure and content are agreed before design starts | Sitemap and scope |
| 03 | Design | Key pages are designed at real content lengths, for desktop and mobile | Approved page designs |
| 04 | Develop | The site is built in code, with working motion, forms and content structure | A staging link to review |
| 05 | Refine | Testing on real devices, tightening details, fixing what feels off | A tested build |
| 06 | Launch | Domain, hosting and analytics set up, then handover **[INPUT: post-launch support period]** | The live site and handover notes |

### 16.3 Wireframe (desktop pinned state, step 03 active)

```wf 88
┌
│ Process (H2, top-left, static)
│
│ ┌──────────────────────────────────────┐
│ │                                      │        Design
│ │            03                        │
│ │   (numeral, 34 vw, Instrument Sans   │        Key pages are designed at real
│ │    width 78, rolls vertically in     │        content lengths, for desktop
│ │    a mask when the step changes)     │        and mobile.
│ │                                      │
│ └──────────────────────────────────────┘        You get   Approved page designs
│
│ 01   02   [03]   04   05   06        (progress rule, 1 px, fill scales with progress)
└
```

### 16.4 Behaviour

| Aspect | Desktop (fine pointer, ≥ 1024, motion allowed) | Tablet / mobile / reduced motion |
|---|---|---|
| Layout | Pinned viewport for `6 × 70 svh` of scroll | Stacked list of six blocks, no pin |
| Step change | Triggered at each 1/6 of progress (not scrubbed). Numeral rolls up out of its mask and the next rolls in, 600 ms `--ease-inout`. Text crossfades, 300 ms | Each block's numeral is sticky within its own block; nothing animates on scroll. Block text is always visible |
| Progress rule | 1 px, scaleX fill linked to scroll progress. Ticks are anchor links that scroll to the matching step position (900 ms, Lenis) | Rule hidden |
| Keyboard | Regular page scrolling; ticks are focusable links | Native |
| Screen reader | An ordered list with all six steps is always in the DOM. Inactive steps are visually hidden with `opacity: 0` but remain in the accessibility tree. The giant numeral is `aria-hidden` | Native list |
| No JavaScript | Stacked list (identical to the mobile layout) | Same |

Design constraint: the pinned scroll length must not exceed 4.2 viewport heights in total. Users who scroll fast are never held; the pin is not a scroll trap. Pinning is disabled when viewport height < 640 px.

---

## 17. Contact Specification

### 17.1 Intent

Contact is a strong ending, not a form on a page. The surface switches to Bone (a hard edge, no gradient), the display type asks a plain question, and the action is obvious and calm.

### 17.2 Content

| Element | Content |
|---|---|
| Display statement | **TELL ME / WHAT YOU'RE / MAKING.** (three lines, Display size, Ink on Bone) |
| Availability | "Taking projects from [MONTH 2026]. Replies within [2 business days]." **[INPUT]** |
| Email | `[EMAIL]` set at `--text-h2`, underlined; adjacent **Copy** text button copies to clipboard and announces "Email copied" (polite live region) |
| Location | "[CITY], India" **[INPUT: owner may show country only]**; IST clock lives in the footer |
| Social | Only networks that exist **[INPUT]**: e.g. LinkedIn, GitHub, Instagram, Behance. Text links with `↗` |
| Privacy line | "Your message is used only to reply to you." (Small, under the submit button) |

Alternative statement directions considered: "LET'S MAKE / SOMETHING / WORTH / REMEMBERING." (from the brief; strong, but slightly generic and the second-person "let's" assumes a yes) and "START WITH / A PLAIN / DESCRIPTION." (functional but flat). The selected line is direct, specific to what the visitor does next, and reads as an invitation rather than a slogan.

### 17.3 Form specification

| Field | Type | Required | Validation | Error message |
|---|---|---|---|---|
| Name | text, `autocomplete="name"` | Yes | ≥ 2 characters | "Enter your name." |
| Email | email, `autocomplete="email"` | Yes | RFC-reasonable pattern, checked client and server | "Enter an email address like name@example.com." |
| What are you making? | native `<select>` | Yes | One of: A new website / A redesign / An online store / A web application / Something else | "Choose the closest option." |
| Current website | url | No | Valid URL if present | "Enter a full address, starting with https://." |
| Message | textarea, 4 rows | Yes | 20–3000 characters | "Add a few words about what you're making." |
| Honeypot | hidden text, `tabindex=-1`, `aria-hidden` | Must be empty | Server rejects if filled | — |

| Behaviour | Spec |
|---|---|
| Labels | Visible above each field, sentence case, 13 px / 500. Placeholders are never the only label |
| Field style | Bottom rule only (1 px `--color-border-strong`), 4 px radius on focus ring; focus draws a 2 px Ink underline over 250 ms and shows the focus ring |
| Validation timing | On blur for each field, and on submit. Errors are linked with `aria-describedby`, announced politely, and the first invalid field receives focus on failed submit |
| Submit | Primary pill button "Send message" (magnetic on fine pointers). Disabled only while sending; label becomes "Sending…" |
| Success | Form fades out (300 ms), replaced by "Thanks, [name]. I'll reply within [2 business days]." in the same place. Focus moves to this message; it is `role="status"` |
| Failure | Inline message above the button: "The message didn't send. Check your connection and try again, or email [EMAIL] directly." Content is preserved |
| Spam control | Honeypot; minimum 3 seconds between render and submit (time-trap); server-side length and rate checks; optional invisible Turnstile if abuse appears (Phase 5) |
| Backend | One Vercel serverless function (`/api/contact`) sending via a transactional email provider (Resend) **or** a form-forwarding service if the owner prefers zero server code. Decision: serverless function, to avoid third-party scripts on the page (§39) |

### 17.4 Wireframe (desktop, Bone surface)

```wf 88
├ BONE SURFACE (header switches to paper theme)
│
│ TELL ME
│       WHAT YOU'RE
│ MAKING.
│
│ Taking projects from [MONTH 2026].            Name
│ Replies within [2 business days].             ──────────────────────────────────
│                                               Email
│ [EMAIL]  Copy                                 ──────────────────────────────────
│ ────────────────                              What are you making?      ▾
│                                               ──────────────────────────────────
│ LinkedIn ↗   GitHub ↗   Instagram ↗           Message
│                                               ──────────────────────────────────
│ [CITY], India                                 ( Send message )
│                                               Your message is used only to reply.
├
│ [NAME]      Cookieless analytics        © 2026      India, 14:32 IST     Back to top
└
```

Alignment: the display statement runs cols 1–12 with the second line indented one column; the left column (cols 1–5) holds availability, email, socials; the form is cols 7–12. The primary button is the only filled shape on the screen (Ink on Bone), which makes it the obvious action without any aggressive treatment.

### 17.4b Behaviour

- **Surface change:** when the section's top edge reaches 20 % of the viewport, the `paper` theme is applied to the header, cursor and body (a class toggle; CSS transitions `background-color` and `color` over 200 ms only on the header). The section itself simply *is* Bone from its top edge; there is no scroll-driven colour blend.
- **Display lines:** masked line reveal once (900 ms, stagger 90 ms). This is the only Level-3 moment in the section.
- **Mobile:** statement at 76 px; email at 26 px; form full width with 48 px minimum field height; social links wrap onto two lines; Back to top sits right-aligned above the copyright.
- **Reduced motion:** no reveal; the theme switch is instant.

---

## 18. Footer Specification

### 18.1 Content

| Element | Content |
|---|---|
| Identity | `[NAME]` wordmark (and `[STUDIO NAME]` if used **[INPUT]**) |
| Email | `[EMAIL]` |
| Social | Same links as Contact |
| Legal | "© 2026 [NAME]" |
| Availability | Static dot and short status if `availability.status` is set |
| Small design detail | A live local-time readout in IST ("India, 14:32 IST"), updated once per minute. It says "a real person is here" and is functional for clients in other time zones |
| Analytics note | "Cookieless analytics. No cross-site tracking." |
| Back to top | Text button "Back to top"; smooth scroll 900 ms, `--ease-inout` (instant when reduced motion) |

The footer has no site map, no repeated navigation, no newsletter, no logo wall. It shares the Bone surface with Contact.

### 18.2 Behaviour by breakpoint

| Breakpoint | Layout |
|---|---|
| Desktop / laptop | One row: wordmark left; social, © and clock centred in three groups; Back to top right |
| Tablet | Two rows: wordmark and Back to top; social and clock below |
| Mobile | Stacked in this order: wordmark, email, social links, © and clock on one line, analytics note, Back to top |

Focus and hover follow the standard link and button rules (§24). The clock is `aria-hidden="true"` with the time also present visually only; screen readers do not need a ticking clock announcement.

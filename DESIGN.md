---
name: Alhambra Tour Ticket
description: Independent guide to visiting the Alhambra, with GetYourGuide ticket and tour links
colors:
  ink: "#14181f"
  muted: "#5b6472"
  line: "#e5e7eb"
  soft: "#f6f5f2"
  paper: "#ffffff"
  courtyard-sand: "#f3e6d8"
  brand: "#1d2b5c"
  brand-dark: "#141f45"
  brand-tint: "#eef1f8"
  amber: "#c47a1d"
  amber-deep: "#a35a0e"
  answer-cream: "#fdf6ec"
  answer-edge: "#efd5b5"
  answer-label: "#8a4b0a"
  alert: "#b42318"
  focus: "#2563eb"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.3rem, 5.6vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.6rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  article-body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
spacing:
  gutter: "20px"
  container: "1200px"
  article: "680px"
  section: "56px"
  section-lg: "64px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.brand-dark}"
  button-amber:
    backgroundColor: "{colors.amber-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "48px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "24px"
  answer-box:
    backgroundColor: "{colors.answer-cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.brand-tint}"
    textColor: "{colors.brand}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Alhambra Tour Ticket

## Overview

**Creative North Star: "The Evening Courtyard"**

The site should feel like the Alhambra at golden hour: warm stone and ivory light, quiet, unhurried, and trustworthy. Visitors arrive anxious ("is it sold out?", "will I miss my palace time?"). The design's job is to calm that anxiety with clear answers first, then one confident next step.

Warmth comes from the photography, the sand-coloured hero wash and a single amber accent. Trust comes from restraint: white reading surfaces, thin borders, navy buttons, and dates and sources shown openly. Serif headlines (Fraunces) carry the sense of place; the sans body (Figtree) carries the practical information.

**Key Characteristics:**
- Answer first: every money page and guide opens with a short-answer box before anything else.
- One primary action per screen, always navy; amber is reserved for emphasis and the occasional affiliate CTA inside articles.
- Real photography of the monument, self-hosted, never stock people.
- Flat surfaces with thin borders; shadows only for floating elements (header, hero search, hover).
- Independence and affiliate status always stated near the first booking link.

## Colors

A warm-neutral palette with one cool anchor (navy) for action and one warm accent (amber) for emphasis.

### Primary
- **Courtyard Navy** (brand): every primary button and key icon. The colour of action and trust.
- **Night Navy** (brand-dark): hover and pressed state of the primary button.
- **Navy Mist** (brand-tint): icon discs, step numbers, chips and table highlight columns.

### Secondary
- **Evening Amber** (amber): headline accent word, check icons in articles, tip-box icons. Never body text.
- **Burnt Amber** (amber-deep): amber buttons (white text passes contrast) and the amber link underline colour.

### Neutral
- **Ink** (ink): headings and body text.
- **Slate** (muted): supporting text, captions, dates.
- **Hairline** (line): borders, dividers and table rules.
- **Stone Wash** (soft): alternating section backgrounds and tip boxes.
- **Courtyard Sand** (courtyard-sand): hero background behind the photograph.
- **Answer Cream / Answer Edge / Answer Label**: the short-answer box only.
- **Alert Red** (alert): sold-out status chips only.

### Named Rules
**The One Navy Action Rule.** One navy primary button per screen. Everything else on that screen is outline, text link or amber inside articles.

**The Amber Is A Spice Rule.** Amber covers under 5% of any screen: an accent word, an icon, an underline. Never a large fill except the in-article CTA button.

## Typography

**Display Font:** Fraunces (with Georgia, serif)
**Body Font:** Figtree (with system-ui, sans-serif)

**Character:** A warm, slightly old-world serif for place and mood, paired with a friendly geometric sans for everything you need to act on. Both are self-hosted.

### Hierarchy
- **Display** (700, clamp(2.3rem, 5.6vw, 4.6rem), line-height 1, -0.03em): page H1s only. The home hero goes larger (up to 5.6rem).
- **Headline** (700, clamp(1.6rem, 3vw, 2.25rem), 1.15): section titles (`.section-title`).
- **Title** (700 sans, ~1.15rem): card and step titles.
- **Body** (400, 1.0625rem, 1.6): interface text. Reading pages use **Article Body** (1.125rem, 1.8) with a 680px column (about 70 characters).
- **Label** (600, 0.85rem): "Short answer", "Quick answer", eyebrows and meta lines.

### Named Rules
**The Serif Speaks Once Rule.** Fraunces is for H1, H2 and a few display numbers. Buttons, labels, tables and body text are always Figtree.

## Layout

A centred container of 1200px with 20px side gutters (`.wrap`). Sections stack vertically with 56–64px vertical padding, alternating white and Stone Wash backgrounds. Reading pages use a 680px article column plus a sticky sidebar (table of contents and one CTA box) from 1024px up. Hero rows use a two-column grid on large screens (text 1.6fr, aside 1fr) and stack on mobile. Fact strips use 2 columns on mobile and 4 on desktop, separated by hairlines. Mobile pages get a sticky bottom CTA bar once the hero scrolls away.

## Elevation & Depth

Mostly flat with tonal layering: white cards with Hairline borders on Stone Wash sections. Shadows are for things that float or respond.

### Shadow Vocabulary
- **Header float** (`0 8px 30px rgba(20,24,31,0.10)`): the sticky pill header.
- **Answer lift** (`0 10px 30px rgba(20,24,31,0.06)`): the quick-answer card on the tickets page.
- **Hover lift** (`0 14px 34px rgba(20,24,31,0.10)`): link cards on hover.
- **Featured ring** (`0 14px 40px rgba(29,43,92,0.14)` plus a 2px navy ring): the recommended option in a ranked list.

### Named Rules
**The Flat-At-Rest Rule.** Cards are flat at rest. Shadow appears only on floating chrome, the recommended option, or hover.

## Shapes

Gently rounded throughout: 10px on buttons and inputs, 16px on cards, images, tables and answer boxes, 24px on large feature panels, and full pills for the header, chips and segmented tabs. The pointed-arch silhouette (the logo mark and the `.arch` shape) is reserved for recommendations and the brand mark; it's never a generic frame.

## Components

### Buttons
- **Shape:** gently rounded (10px), minimum 48px tall (44px in dense rows), 22px side padding, 600 weight.
- **Primary:** Courtyard Navy with white text; Night Navy on hover.
- **Amber:** Burnt Amber with white text, only inside articles and sidebars for the affiliate CTA.
- **Outline:** white with a 1.5px Hairline inset border that turns Ink on hover. Used for the secondary action.
- **Focus:** a 3px blue focus ring (#2563eb) with a 2px offset on every interactive element.

### Chips
- **Style:** Navy Mist background, navy text, pill shape. Sold-out status chips use a pale red background with Alert Red text and a dot.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** white on Stone Wash sections, or Stone Wash on white sections.
- **Border:** 1px Hairline.
- **Internal Padding:** 20–24px.

### Answer Box (signature)
The trust anchor of every page: Answer Cream background, Answer Edge border, a small Answer Label caption reading "Short answer" or "Quick answer", then 1.1rem text in Ink. It always comes first, before any CTA, and holds checked facts only.

### Navigation
A floating pill header (white at 85% with a backdrop blur, Header float shadow, 2rem radius). Desktop has a centred pill nav with the active item lifted on white; mobile has a menu button and a single "Tickets" CTA. The footer is on Stone Wash with three link columns and the independence statement.

### Affiliate Note
A small Slate line ("Independent guide, not the official Alhambra ticket seller…") placed directly above or beside the first booking link on every money page. It is never hidden in the footer alone.

## Do's and Don'ts

### Do:
- **Do** open every money page and guide with the answer box, then one navy primary action.
- **Do** show the "last checked" date and sources on pages with prices or hours.
- **Do** use the self-hosted WebP photos with srcset and lazy loading below the fold.
- **Do** keep tables in 16px-rounded Hairline frames with a #f6f8fc header row.

### Don't:
- **Don't** show prices, ratings or review counts that aren't tied to the exact linked listing and dated.
- **Don't** use more than one navy primary button in the same viewport.
- **Don't** use Fraunces for buttons, labels or body text.
- **Don't** add new colours outside this palette; extend with tints of navy or amber only.

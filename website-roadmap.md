# North Horizon Partners: Website Roadmap & Build Log

Rebuilt end to end on 2026-07-12. One deliberate design decision, set by Nikhil mid-build: **the website must NOT mirror the capabilities deck.** Same facts, different clothes. A prospect who sees both should meet one firm with two distinct, professional surfaces.

## Site identity (vs deck identity)

| | Website | Deck |
|---|---|---|
| Surfaces | Deep night (#0B0C0F family) | Charcoal + off-white paper |
| Accent | Brand royal blue #2E6BF2 (sampled from the logo) | None (monochrome) |
| Type | Playfair Display + DM Sans | Times serif + Montserrat |
| Voice | Proximity / "you two should talk" editorial | Operator / capital-markets |

The blue appears in: CTAs, section labels, flagship table row, journey highlight, fit-yes panel, hero and closing glow, team titles, FAQ icons.

## Shipped (2026-07-12)

- [x] Brand: "North Horizon Partners" everywhere (was "Horizon Partners"); logo mark in nav, footer, favicon
- [x] Claims aligned with reality: trust bar = 4+ years / $1B+ opportunity value sourced / $10M+ client transactions supported / 8+ industries. $2M+ claim retired
- [x] Timing claims fixed: build weeks 1-4, first introductions ~2 weeks post warmup (FAQ + journey strip). The old "within the first week" claim is gone
- [x] Track record section: table with NOBLE flagship row (blue), Regent Peak, Clean-Seas, Vention, Connect Group + "Where this works best" audience card
- [x] Flagship mandate section: Noble paper card (own wording, not deck copy), real Noble logo
- [x] Case studies on homepage: 6 brief cards linking to the detail page
- [x] case-studies.html: NEW page, all 12 engagements detailed (Noble, Regent Peak, Clean-Seas, RESPILON, Vention, Connect Group, Crawford Thomas, Elate, ForPlayers, FabuLingua, HelpCare AI, Hippocratic AI, Lasting Blueprint), each with anchor id, The ask / What we did / What came back. All rebranded (zero myoProcess/Glintaro), operator language
- [x] Origination System section: six stages (own wording) + first-90-days journey strip
- [x] Team section: all 4 (Nikhil (Nick) Nischal, Saad Belcaid, Shiv Shankar Prasad, Nita D.) with photos, LinkedIn links, site-specific bios
- [x] Kept the site's own strong copy: The Gap, The Difference, The Reality, What Changes, manifesto, The Craft, Fit, FAQ
- [x] Footer: brand + contact@northhorizonpartners.com (contact.js updated from nick@); dead /privacy /terms links removed
- [x] OG meta + og-cover image, favicon = logo, page titles/descriptions
- [x] Content sweep passed: no myoProcess/Glintaro/100xVoice, no em dashes, no "leads/closers/six-figure", no reply-rate promises

## Still open / owner decisions

- [ ] Noble testimonial quote: place on flagship card when Nikhil is ready
- [ ] nick@ vs contact@ email: contact.js now says contact@ to match the deck; flip back in js/contact.js if nick@ is the monitored inbox
- [ ] /privacy and /terms pages do not exist; links were removed. Create real pages if ads/compliance ever need them
- [ ] Campaign screenshots and the future flagship case study (current client) when available
- [ ] favicon.svg is now unused (logo.png is the favicon); delete or keep
- [ ] Deck says "RP Wealth Advisors"; the firm's real name is Regent Peak Wealth Advisors (used on the site). Consider aligning the deck

## Build notes

- Assets live in images/ (headshots, LinkedIn icon, Noble logo, brand logo, og-cover)
- js/app.js untouched (scroll reveal .fi/.in, FAQ accordion, mobile menu, cursor, Lenis); contact.js is the single source of contact truth
- styles/: tokens.css is the design-system source of truth; proof.css (track/case/team/noble), casedetail.css (detail page) are new
- Screenshot QA tip: use Chrome headless with --force-prefers-reduced-motion, otherwise .fi elements render invisible

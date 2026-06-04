# Mockup Receipt — Heads Up Leading (Gary Wilson)

**Spawned:** 2026-06-02
**Type:** Speculative lead mockup (Axamo-style workflow, non-restaurant)
**Live URL:** https://heads-up-leading.vercel.app
**Repo:** https://github.com/eldardiz/heads-up-leading

---

## The brief (decoded from partner's Slack message)

The lead is **Gary Wilson**, who recently left **Iron Forums** (https://www.ironforums.org/,
a Christian peer-leadership-forum org) and started his own LLC doing the same work,
**Heads Up Leading, LLC** (Opelika, Alabama).

Partner's ask: *"mock up something for this site (his old job) and use his info instead"* —
i.e. build a site for his NEW company, using Iron Forums as the conceptual blueprint,
populated with Gary's own info so he can adopt it as his new site. Meeting door-opener:
*"here's your old job's concept, already rebuilt as yours."*

Note: Gary still does Iron Forums as a **contract facilitator** (Aug 2025–present), so he
hasn't fully cut ties. Worth knowing before the meeting.

## Three sources, three jobs

- **Design + motion** → https://harmonise.framer.website/ (the look the partner loves):
  light/calm, premium-minimal, subtle scroll reveals, count-up stats.
- **Concept DNA** → Iron Forums (Christian leadership world, Connect/Sharpen/Grow tone).
- **All content** → Gary's LinkedIn profile.

## Build decisions

- **v2 (current): rebuilt to match the Harmonise look and feel 1:1.** Partner asked for the
  actual Harmonise design language, not a different premium take. I studied the real site
  (computed tokens + full screenshot pass) and replicated its design system with Gary's content.
- **Design language (lifted from Harmonise, verified against the live site):**
  - Canvas: warm ivory `#FEFFEE`; panels: sand `#EFE9D5` / `#E2D4B9`; dark: espresso `#403427`.
  - Type: **Instrument Serif** for big elegant headlines (matches Harmonise exactly) + **Inter** body.
  - Fully-rounded pill buttons + floating pill nav (icon + links pill + dark Book pill).
  - Sections mirror Harmonise: full-bleed dark hero w/ serif headline bottom-left, sand marquee
    strip, centered serif statement with floating tags, bordered 4-col stats bar, sticky-left
    philosophy + scrolling numbered cards, 2x2 dark service cards, accordion FAQ, dark footer CTA,
    multi-column footer.
- **Content stays Gary's**; we replicated the visual style, not their copy.
- **v1 (superseded):** a warmer gold/serif (Fraunces) take that did NOT match Harmonise. Replaced.

## Tech

- Base: cloned `vibe-coding/projects/mockups/getfurnace-mockup` motion engine.
- Stack: Next.js 16.2.6, React 19, Tailwind v4, Lenis (smooth scroll), Framer Motion, GSAP (available).
- `robots: noindex, nofollow` set in layout metadata (mockup should not be indexed).
- `npm run build` passes clean (static export, no type errors).

## Sections (all copy is real, sourced from his LinkedIn; no em dashes)

1. **Nav** — floating pill: "HU" monogram + links pill + dark "Book Gary" pill
2. **Hero** — full-bleed dark block, serif "Helping the new leader lead well" bottom-left, 2 pills
3. **Marquee** — sand pill strip of focus areas (Hat Rack Model, Communication, etc.)
4. **Statement** — big centered serif line + floating credential tags
5. **Stats** — bordered 4-col bar: 50+ yrs · 3,000+ led · $11M turnaround · 27 yrs (count-up)
6. **Hat Rack Model** — sticky-left heading + scrolling cards: Caring / Competent / Character
7. **Services** — 2x2 dark cards: Speaking · Coaching · Team Development · Non-profit
8. **About Gary** — portrait slot + West Point → Army → $11M turnaround → EdD → certifications
9. **FAQ** — accordion (what is the model, who you work with, faith-based, speaking, coaching)
10. **CTA** — dark block "Everyone deserves to be led well" + multi-column footer

---

## ⚠️ PLACEHOLDERS — fix before/after the meeting

| Item | Current state | Action needed |
|------|--------------|---------------|
| **Photos (hero, services x4, about, CTA)** | Styled espresso gradient slots labeled "Photo" | Drop in real photography. Auto-stock returned junk (kittens), so slots are intentional placeholders. Need Gary speaking / portrait / candid shots, or approve AI-generated/licensed stock |
| **Portrait of Gary** | "GW" monogram on a dark block in About | Real hi-res headshot (LinkedIn shots too low-res to pull) |
| **Contact email** | `mailto:gary@headsupleading.com` (invented) | Confirm his real email + whether headsupleading.com domain exists |
| **Phone** | Not present | Add if he wants one |
| **Booking** | CTA is a mailto, no scheduler | Add Calendly/booking link if he uses one |
| **Testimonials** | Not included | His Iron Forums network has 5 named members; could seed real quotes later |
| **Logo** | Text wordmark + "HU" monogram only | Design a real logo/mark if he wants one |

## Suggested next additions (if he bites)

- Real photography in the existing photo slots (biggest single upgrade to the feel)
- Testimonials section (Harmonise has a strong one; borrow/adapt from his network)
- A speaking/topics page or one-sheet

## How to iterate

```
cd vibe-coding/mockups/heads-up-leading
npm run dev        # localhost
# edit components in app/components/, push to main → auto-deploys
```

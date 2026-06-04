# Mockup Receipt — Acton Academy Santa Barbara

**Spawned:** 2026-06-04
**For:** Nordic discovery-call lead (meeting next day). Speculative Axamo-style premium redesign mockup.
**Base template:** `heads-up-leading` mockup (NOT a restaurant archetype). Partner explicitly wanted the heads-up-leading look ("breathable, nature-focused, clean").

## Live

- **Production URL:** https://acton-academy-sb.vercel.app  (HTTP 200, public)
- **Repo:** https://github.com/eldardiz/acton-academy-sb
- **Vercel:** eldardizs-projects/acton-academy-sb (auto-deploys on push to `main`)
- Note: the raw deployment URL (`acton-academy-rglhn1w0k-...`) returns 401 due to Vercel deployment protection. Share the clean alias above, which is public.

## v2 Redesign (2026-06-04, post-partner feedback)

Partner felt v1 was "too Claude obvious." Reworked toward a bespoke, premium feel:

- **Identity shift → Aethera light/minimal**: white/black/gray palette, Instrument Serif display + Inter body, editorial whitespace. (`app/globals.css` rethemed; legacy color aliases kept so utility names still resolve.)
- **Hero**: Aethera-style centered serif headline with gray-italic emphasis + the exact Aethera CloudFront video band, with a custom requestAnimationFrame fade-in/out loop (`app/components/Hero.tsx`).
- **Real logo everywhere**: `public/logo.png` in the nav (on white) and in a light chip on the dark footer.
- **Real photos** (from `~/Desktop/academyImgs`) replace ALL stock: Spark Studio cards (gardening, kids outdoors, classroom, community day), founder/forest portrait, sunrise-hikers CTA. No stock placeholders remain.
- **Liquid-glass footer** (`app/components/Footer.tsx`): footer CloudFront video background + `.liquid-glass` panel, `motion/react` entrance, `lucide-react` social icons (Instagram/Facebook/LinkedIn/Mail/Phone), carrying Acton's existing footer copy.
- **Statement** made larger + taller + scroll-driven: frosted tags parallax-drift via `useScroll`/`useTransform` (`app/components/Statement.tsx`).
- **Premium motion** across nav/hero/sections.

**Build notes:**
- `lucide-react` pinned to `0.499.0` — the registry's `latest` (1.17.0) is a stripped build missing brand icons (Instagram/Facebook/Linkedin).
- The Helvetica `@font-face` from the spec is included in CSS, but Inter remains the primary `--font-sans` (avoids a hard dependency on an external font CDN that could fail during the live meeting; Inter is visually near-identical).
- `motion` + `framer-motion` both present; new/edited components use `motion/react`.

## Lead

- **Business:** Acton Academy Santa Barbara — learner-driven private micro-school, ages 4 to 7 ("Spark Studio")
- **Current site:** https://www.actonsb.org/ (Wix, "modern but hollow")
- **City:** Santa Barbara, CA
- **Founder:** Max Peck (former U.S. Marine Corps officer)

## Decisions (locked with partner via interview)

| Field | Decision |
|---|---|
| Photos | Their 2 real photos (kids hiking → hero; kids gardening → Spark Studio card 1) + keep template nature stock for the other slots |
| Palette | Kept heads-up-leading's exact warm palette (ivory `#FEFFEE` / sand `#EFE9D5` / espresso `#403427`). No change. |
| Stats bar | CUT (no real Acton numbers; avoid inventing metrics in front of the client) |
| Slug | `acton-academy-sb` |

## Contact details used (from their site)

- 50 E. Alamar Ave, Santa Barbara, CA · (805) 335-1796 · info@actonsb.org
- Hours: Mon to Fri, 8:00 to 3:30 · Tours by appointment · Instagram @acton_sb

## Section map (heads-up-leading → Acton)

| Section | Result |
|---|---|
| Nav | About · Our Approach · Spark Studio · FAQs + Admissions button; monogram `AS` |
| Hero | "What if school was a journey, not a system?" + real kids-hiking photo |
| Marquee | 7 Acton themes (Learning Through Wonder, Purposeful Play, etc.) |
| Statement | "Most schools prepare children for tests. We prepare them for life." + 6 core-belief tags |
| ~~Stats~~ | **Removed** |
| HatRack → Our Approach | Expanded 3 → **6 core beliefs** as cards |
| Services → Spark Studio | 4 program cards (Whole-Child, Purposeful Play, Montessori-Inspired, Character & Community); card 1 = real kids-gardening photo |
| About → Our Founder | Max Peck bio (ex-Marine, founded for his own children); `MP` monogram (no real photo) |
| FAQ | 5 school Q&As; section id `#faq` added |
| CTA → Admissions | "Begin your hero's journey" + mailto/tel buttons |
| Footer | Full school contact + Visit column |
| Metadata | Title/description updated; `robots: noindex` kept (mockup) |

## Image manifest

| Slot | File | Source |
|---|---|---|
| Hero | `kids-hiking.jpg` | **Real (from actonsb.org)** |
| Spark Studio card 1 (Whole-Child) | `kids-gardening.jpg` | **Real (from actonsb.org)** |
| Spark Studio card 2 (Purposeful Play) | `coaching.jpg` | ⚠️ Template stock placeholder |
| Spark Studio card 3 (Montessori) | `team.jpg` | ⚠️ Template stock placeholder |
| Spark Studio card 4 (Character) | `nonprofit.jpg` | ⚠️ Template stock placeholder |
| CTA | `cta.jpg` | Template stock (mountain path = journey, on-theme) |
| Unused on disk | `hero.jpg`, `speaking.jpg` | left in place |

## Caveats to raise before sending to the lead

1. **4 of 6 image slots are still nature stock** — Acton only had 2 usable photos on their site. Real campus/classroom/student photos would lift it significantly.
2. **About uses an `MP` monogram, not a real Max Peck photo** (none available).
3. **No testimonials** — Acton has none on their site; none were invented.
4. All copy is reused/adapted from their real site language; brand no-em-dash rule respected throughout.

## Skipped fields

None — all contact details were available from their public site.

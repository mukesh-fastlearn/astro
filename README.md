# Astro Website 2

A Vedic astrology website rebuilt as a static Next.js app, together with the
reverse-engineering material it was reconstructed from.

The site is a faithful reconstruction of a Vedic astrology site with working
calculators — kundli, guna-milan matching, numerology, Vimshottari dasha and
marriage prediction — with the calculation engine re-implemented in TypeScript
on top of a real ephemeris rather than mocked.

## Repository layout

| Path | What it is |
|------|------------|
| `astro-clone/` | **The application.** Next.js 15 (App Router) + React 19 + Tailwind v4, exported as a static site. See [astro-clone/README.md](astro-clone/README.md). |
| `site/` | Reference capture of the original site — saved HTML per page, plus a DOM dump and extracted text for the homepage. |
| `chunks/` | The original site's shipped JavaScript bundles, minified and beautified. These were read to recover the astrology lookup tables and formulas. |
| `*.html`, `globals.css` (root) | Earlier flat capture of the same pages, kept as a snapshot. |
| `scraper/` | Scraping setup. The Scrapegraph-ai checkout itself is not vendored here — clone it separately and copy `.env.example` to `.env`. |
| `main logo.png` | Source logo asset. |

## The application

**Stack:** Next.js 15 App Router, React 19, Tailwind CSS v4, `astronomy-engine`
for geocentric planetary positions, Inter + Playfair Display. `next.config.mjs`
sets `output: "export"` with unoptimized images, so `npm run build` produces a
fully static `out/` directory deployable to any static host.

**Pages** (`astro-clone/app/`): home, `free-kundli-tamil`, `kundli-matching`,
`numerology`, `marriage-prediction`, `dasha-timeline`, `zodiac-details`,
`horoscope-today-tamil/[sign]`, `services`, `contact`, `tamil-astrologer`.

**Calculation engine** (`astro-clone/lib/astrology/`, ~1,600 lines):

- `kundli.ts` — real planetary longitudes converted to **sidereal** (Lahiri
  ayanamsa with drift and nutation); ascendant from local sidereal time and
  obliquity; whole-sign houses; 27 nakshatras with KP sub-lords;
  exaltation/debilitation, combustion and retrogradation; 20 divisional charts
  (D1–D60); 5-level Vimshottari dasha seeded from the Moon's nakshatra fraction.
- `matching.ts` — 36-point Ashtakoota Guna Milan (Varna, Vashya, Tara, Yoni,
  Graha Maitri, Gana, Bhakoot, Nadi) with dosha warnings.
- `numerology.ts` — Mulank / Bhagyank / Namank on the Chaldean letter map,
  master numbers, soul-urge and personality numbers.
- `marriage.ts` — 7th-house analysis, Manglik dosha with cancellations, spouse
  description, dasha-based timing windows, remedies.
- `constants.ts`, `dasha-data.ts` — the lookup tables recovered from the bundles.

Place-of-birth geocoding uses the free Nominatim (OpenStreetMap) API.

## Running it

```bash
cd astro-clone
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

## A note on secrets

`.gitignore` excludes `*.pem`, `.env` and `api.txt`. Those files exist in the
working tree and are **not** in this repository. If any of those credentials
were ever shared or committed elsewhere, rotate them.

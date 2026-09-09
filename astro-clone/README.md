# Pandit Shri Govind Astro — Clone

A faithful reconstruction of [astrology-website-all.vercel.app](https://astrology-website-all.vercel.app/),
a Vedic astrology site with working calculators. Built by reverse-engineering the original site's
shipped JavaScript bundles and re-implementing the calculation engine in TypeScript.

## Stack
- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** (same theme tokens as the original: saffron `#ff6b35`, red `#c1121f`, gold `#fdb813`)
- **[astronomy-engine](https://github.com/cosinekitty/astronomy)** — the same open-source ephemeris the original uses, for real geocentric planetary positions
- Fonts: Inter + Playfair Display

## How the astrology is calculated
All math is reproduced from the original bundle (`lib/astrology/`):

| Module | What it does |
|--------|--------------|
| `kundli.ts` | Real planetary longitudes via Astronomy Engine → **sidereal** (Lahiri ayanamsa ≈ 23.85° + drift + nutation). Computes ascendant (from LST + obliquity), whole-sign houses, 27 nakshatras + KP sub-lords, exaltation/debilitation, combustion, retrograde, **20 divisional charts (D1–D60)**, and the **5-level Vimshottari dasha** seeded from the Moon's nakshatra fraction. |
| `matching.ts` | **36-point Ashtakoota Guna Milan** — Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi — with the exact lookup tables and dosha warnings from the original. |
| `numerology.ts` | **Mulank / Bhagyank / Namank** using the Chaldean letter map, master numbers (11/22/33), soul-urge & personality numbers, and the full per-number meaning tables. |
| `marriage.ts` | 7th-house analysis, **Manglik dosha** with cancellations, spouse description, dasha-based marriage timing windows, and remedies. |

The engine was sanity-checked against known ephemeris: for 2000-01-01 it yields ayanamsa 23.853°,
Sun in sidereal Sagittarius, and Jupiter/Saturn conjunct in early Aries (the real 2000 great conjunction).

## Pages
`/` · `/free-kundli-tamil` · `/kundli-matching` · `/numerology` · `/marriage-prediction` ·
`/dasha-timeline` · `/zodiac-details` · `/horoscope-today-tamil/[sign]` · `/services` · `/contact` · `/tamil-astrologer`

Place-of-birth geocoding uses the free Nominatim (OpenStreetMap) API, as in the original.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start
```

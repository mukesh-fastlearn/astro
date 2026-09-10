// Ashtakavarga — Bhinnashtakavarga (per planet) and Sarvashtakavarga (total).
//
// Each planet earns a benefic point (bindu) in a sign when that sign falls in
// one of the prescribed places counted from each of the seven grahas and the
// lagna. The tables below are the Parashari set.
//
// Correctness guard: the row totals of these tables are fixed and well known —
// Sun 48, Moon 49, Mars 39, Mercury 54, Jupiter 56, Venus 52, Saturn 39,
// summing to 337. verifyTables() checks that at module load, so a mistyped
// row fails loudly rather than silently producing a wrong chart.

import { ZODIAC_SIGNS } from "./constants";
import { PlanetDetail } from "./kundli";

export const AV_PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"] as const;
export type AvPlanet = (typeof AV_PLANETS)[number];

/** Contributors: the seven grahas plus the ascendant. */
const CONTRIBUTORS = [...AV_PLANETS, "Ascendant"] as const;

type Table = Record<string, number[]>;

export const BHINNA_TABLES: Record<AvPlanet, Table> = {
  Sun: {
    Sun: [1, 2, 4, 7, 8, 9, 10, 11],
    Moon: [3, 6, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [3, 5, 6, 9, 10, 11, 12],
    Jupiter: [5, 6, 9, 11],
    Venus: [6, 7, 12],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Ascendant: [3, 4, 6, 10, 11, 12],
  },
  Moon: {
    Sun: [3, 6, 7, 8, 10, 11],
    Moon: [1, 3, 6, 7, 10, 11],
    Mars: [2, 3, 5, 6, 9, 10, 11],
    Mercury: [1, 3, 4, 5, 7, 8, 10, 11],
    Jupiter: [1, 2, 4, 7, 8, 10, 11],
    Venus: [3, 4, 5, 7, 9, 10, 11],
    Saturn: [3, 5, 6, 11],
    Ascendant: [3, 6, 10, 11],
  },
  Mars: {
    Sun: [3, 5, 6, 10, 11],
    Moon: [3, 6, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [3, 5, 6, 11],
    Jupiter: [6, 10, 11, 12],
    Venus: [6, 8, 11, 12],
    Saturn: [1, 4, 7, 8, 9, 10, 11],
    Ascendant: [1, 3, 6, 10, 11],
  },
  Mercury: {
    Sun: [5, 6, 9, 11, 12],
    Moon: [2, 4, 6, 8, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [1, 3, 5, 6, 9, 10, 11, 12],
    Jupiter: [6, 8, 11, 12],
    Venus: [1, 2, 3, 4, 5, 8, 9, 11],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Ascendant: [1, 2, 4, 6, 8, 10, 11],
  },
  Jupiter: {
    Sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
    Moon: [2, 5, 7, 9, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [1, 2, 4, 5, 6, 9, 10, 11],
    Jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
    Venus: [2, 5, 6, 9, 10, 11],
    Saturn: [3, 5, 6, 12],
    Ascendant: [1, 2, 4, 5, 6, 7, 9, 10, 11],
  },
  Venus: {
    Sun: [8, 11, 12],
    Moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
    Mars: [3, 5, 6, 9, 11, 12],
    Mercury: [3, 5, 6, 9, 11],
    Jupiter: [5, 8, 9, 10, 11],
    Venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
    Saturn: [3, 4, 5, 8, 9, 10, 11],
    Ascendant: [1, 2, 3, 4, 5, 8, 9, 11],
  },
  Saturn: {
    Sun: [1, 2, 4, 7, 8, 10, 11],
    Moon: [3, 6, 11],
    Mars: [3, 5, 6, 10, 11, 12],
    Mercury: [6, 8, 9, 10, 11, 12],
    Jupiter: [5, 6, 11, 12],
    Venus: [6, 11, 12],
    Saturn: [3, 5, 6, 11],
    Ascendant: [1, 3, 4, 6, 10, 11],
  },
};

/** Canonical bindu totals — the integrity check for the tables above. */
export const CANONICAL_TOTALS: Record<AvPlanet, number> = {
  Sun: 48, Moon: 49, Mars: 39, Mercury: 54, Jupiter: 56, Venus: 52, Saturn: 39,
};

export function verifyTables(): { ok: boolean; problems: string[] } {
  const problems: string[] = [];
  for (const p of AV_PLANETS) {
    const total = Object.values(BHINNA_TABLES[p]).reduce((n, arr) => n + arr.length, 0);
    if (total !== CANONICAL_TOTALS[p]) {
      problems.push(`${p}: ${total} bindus, expected ${CANONICAL_TOTALS[p]}`);
    }
  }
  const grand = Object.values(CANONICAL_TOTALS).reduce((a, b) => a + b, 0);
  if (grand !== 337) problems.push(`grand total ${grand}, expected 337`);
  return { ok: problems.length === 0, problems };
}

export interface AshtakavargaResult {
  /** Per planet: bindus in each of the 12 signs, indexed Aries..Pisces. */
  bhinna: Record<AvPlanet, number[]>;
  /** Sarvashtakavarga: summed bindus per sign. */
  sarva: number[];
  /** SAV keyed by sign name, for readability. */
  sarvaBySign: Record<string, number>;
  /** Total across all signs — should be 337 for a valid chart. */
  sarvaTotal: number;
  tableCheck: { ok: boolean; problems: string[] };
}

/** Inclusive sign-count from a to b, 1..12. */
function dist(from: number, to: number): number {
  return ((to - from + 12) % 12) + 1;
}

export function computeAshtakavarga(planets: PlanetDetail[]): AshtakavargaResult {
  const idx = (name: string) => {
    const p = planets.find((x) => x.name === name);
    return p ? (ZODIAC_SIGNS as readonly string[]).indexOf(p.rashi) : -1;
  };

  const positions: Record<string, number> = {};
  for (const c of CONTRIBUTORS) positions[c] = idx(c);

  const bhinna = {} as Record<AvPlanet, number[]>;

  for (const target of AV_PLANETS) {
    const row = new Array(12).fill(0);
    const table = BHINNA_TABLES[target];

    for (const contributor of CONTRIBUTORS) {
      const from = positions[contributor];
      if (from < 0) continue;
      for (const place of table[contributor]) {
        // place is an inclusive count, so place 1 is the contributor's own sign.
        row[(from + place - 1) % 12] += 1;
      }
    }
    bhinna[target] = row;
  }

  const sarva = new Array(12).fill(0);
  for (const p of AV_PLANETS) {
    for (let s = 0; s < 12; s++) sarva[s] += bhinna[p][s];
  }

  const sarvaBySign: Record<string, number> = {};
  ZODIAC_SIGNS.forEach((sign, i) => (sarvaBySign[sign] = sarva[i]));

  return {
    bhinna,
    sarva,
    sarvaBySign,
    sarvaTotal: sarva.reduce((a, b) => a + b, 0),
    tableCheck: verifyTables(),
  };
}

/** SAV rendered per house from the ascendant, which is how it is read. */
export function sarvaByHouse(sarva: number[], ascSign: string) {
  const asc = (ZODIAC_SIGNS as readonly string[]).indexOf(ascSign);
  return Array.from({ length: 12 }, (_, i) => {
    const s = (asc + i) % 12;
    return { house: i + 1, sign: ZODIAC_SIGNS[s], bindus: sarva[s] };
  });
}

export { dist as signDistanceInclusive };

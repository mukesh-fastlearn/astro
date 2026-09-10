// Planetary strength — the Shadbala components that can be computed exactly
// from what this engine already knows.
//
// DELIBERATELY PARTIAL. Full Shadbala is six balas, and two of them cannot be
// computed honestly here:
//
//   Kala Bala    needs sunrise/sunset, paksha, ayana and the day/night lords.
//   Cheshta Bala needs the eight classical motion states, not just a speed sign.
//
// Rather than invent numbers and present a total as though it were Shadbala,
// this module returns only Naisargika, Uchcha, Dig and Drik, reports them
// individually, and names what is missing. Consumers must not present the
// subtotal as a complete Shadbala figure.

import { PlanetDetail } from "./kundli";
import { EXALT_DEGREE, SPECIAL_ASPECTS } from "./aspects";
import { norm360 } from "./kundli";

export const SHADBALA_PLANETS = [
  "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn",
] as const;

/** Naisargika (natural) bala is a fixed ranking, in virupas out of 60. */
export const NAISARGIKA: Record<string, number> = {
  Sun: 60.0,
  Moon: 51.43,
  Venus: 42.86,
  Jupiter: 34.29,
  Mercury: 25.71,
  Mars: 17.14,
  Saturn: 8.57,
};

/** The house-angle at which each planet has full directional strength. */
const DIG_STRONG_ANGLE: Record<string, number> = {
  // Degrees added to the ascendant longitude to reach the strong point.
  Jupiter: 0,   // ascendant
  Mercury: 0,
  Moon: 90,     // nadir / 4th
  Venus: 90,
  Saturn: 180,  // descendant / 7th
  Sun: 270,     // midheaven / 10th
  Mars: 270,
};

const MALEFICS = ["Sun", "Mars", "Saturn", "Rahu", "Ketu"];

export interface BalaBreakdown {
  planet: string;
  naisargika: number;
  uchcha: number;
  dig: number;
  drik: number;
  /** Sum of the four computed components ONLY — not a Shadbala total. */
  partialTotal: number;
  /** Rank among the seven by partialTotal, 1 = strongest. */
  rank: number;
}

export interface StrengthResult {
  components: BalaBreakdown[];
  included: string[];
  omitted: string[];
  disclaimer: string;
}

/** Shorter arc between two ecliptic longitudes, 0..180. */
function arc(a: number, b: number): number {
  const d = Math.abs(norm360(a) - norm360(b)) % 360;
  return d > 180 ? 360 - d : d;
}

/**
 * Uchcha bala: full 60 virupas at the deep exaltation point, zero at the
 * debilitation point directly opposite, scaling linearly between.
 */
function uchchaBala(planet: string, longitude: number): number {
  const ex = EXALT_DEGREE[planet];
  if (!ex) return 0;
  const exaltLon = ex.sign * 30 + ex.degree;
  const debilLon = norm360(exaltLon + 180);
  return +((60 * arc(longitude, debilLon)) / 180).toFixed(2);
}

/**
 * Dig bala: full strength at the planet's own direction, zero opposite it.
 *
 * Approximation: quadrant points are taken as ascendant + 0/90/180/270 along
 * the ecliptic. The classical calculation uses the true MC, which requires the
 * right ascension of the meridian. With whole-sign houses in use elsewhere,
 * this equal-quadrant approach is consistent and accurate to a few virupas.
 */
function digBala(planet: string, longitude: number, ascLongitude: number): number {
  const strongOffset = DIG_STRONG_ANGLE[planet];
  if (strongOffset === undefined) return 0;
  const weakPoint = norm360(ascLongitude + strongOffset + 180);
  return +((60 * arc(longitude, weakPoint)) / 180).toFixed(2);
}

/**
 * Drik bala: net drishti received, benefic aspects adding and malefic
 * subtracting. Simplified — the classical version weights each aspect by a
 * fractional drishti curve rather than treating a cast aspect as full.
 */
function drikBala(planet: string, planets: PlanetDetail[]): number {
  const target = planets.find((p) => p.name === planet);
  if (!target) return 0;
  const targetSign = Math.floor(target.longitude / 30);

  let score = 0;
  for (const other of planets) {
    if (other.name === planet || other.name === "Ascendant") continue;
    const fromSign = Math.floor(other.longitude / 30);
    const dists = [7, ...(SPECIAL_ASPECTS[other.name] || [])];
    const casts = dists.some((d) => (fromSign + d - 1) % 12 === targetSign);
    if (!casts) continue;
    score += MALEFICS.includes(other.name) ? -15 : 15;
  }
  return +Math.max(-60, Math.min(60, score)).toFixed(2);
}

export function computeStrength(planets: PlanetDetail[]): StrengthResult {
  const asc = planets.find((p) => p.name === "Ascendant");
  const ascLon = asc ? asc.longitude : 0;

  const rows = SHADBALA_PLANETS.map((name) => {
    const p = planets.find((x) => x.name === name);
    if (!p) {
      return { planet: name, naisargika: 0, uchcha: 0, dig: 0, drik: 0, partialTotal: 0, rank: 0 };
    }
    const naisargika = NAISARGIKA[name] ?? 0;
    const uchcha = uchchaBala(name, p.longitude);
    const dig = digBala(name, p.longitude, ascLon);
    const drik = drikBala(name, planets);
    return {
      planet: name,
      naisargika,
      uchcha,
      dig,
      drik,
      partialTotal: +(naisargika + uchcha + dig + drik).toFixed(2),
      rank: 0,
    };
  });

  [...rows]
    .sort((a, b) => b.partialTotal - a.partialTotal)
    .forEach((r, i) => {
      const row = rows.find((x) => x.planet === r.planet);
      if (row) row.rank = i + 1;
    });

  return {
    components: rows,
    included: ["Naisargika Bala", "Uchcha Bala", "Dig Bala", "Drik Bala (simplified)"],
    omitted: ["Kala Bala", "Cheshta Bala"],
    disclaimer:
      "Partial strength only. Kala Bala and Cheshta Bala are not computed, so this is NOT a complete Shadbala figure and must not be presented as one. Use it for relative comparison between planets in this chart.",
  };
}

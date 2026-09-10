// Parashari drishti (aspects), extended dignity, and planetary relationships.
//
// All of this is deterministic classical rule-work applied to positions the
// astronomy layer already produced — no new ephemeris maths here.

import { ZODIAC_SIGNS } from "./constants";
import { PlanetDetail } from "./kundli";

export const GRAHAS = [
  "Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu",
] as const;

/** Signs each planet owns, by sign index (Aries = 0). */
export const OWN_SIGNS: Record<string, number[]> = {
  Sun: [4],
  Moon: [3],
  Mars: [0, 7],
  Mercury: [2, 5],
  Jupiter: [8, 11],
  Venus: [1, 6],
  Saturn: [9, 10],
  // Nodes own no sign; tradition co-assigns them but it is not universal.
  Rahu: [],
  Ketu: [],
};

/** Moolatrikona: sign index plus the degree span within that sign. */
export const MOOLATRIKONA: Record<string, { sign: number; from: number; to: number }> = {
  Sun: { sign: 4, from: 0, to: 20 },
  Moon: { sign: 1, from: 4, to: 30 },
  Mars: { sign: 0, from: 0, to: 12 },
  Mercury: { sign: 5, from: 16, to: 20 },
  Jupiter: { sign: 8, from: 0, to: 10 },
  Venus: { sign: 6, from: 0, to: 15 },
  Saturn: { sign: 10, from: 0, to: 20 },
};

/** Exact exaltation degree (deep exaltation point). */
export const EXALT_DEGREE: Record<string, { sign: number; degree: number }> = {
  Sun: { sign: 0, degree: 10 },
  Moon: { sign: 1, degree: 3 },
  Mars: { sign: 9, degree: 28 },
  Mercury: { sign: 5, degree: 15 },
  Jupiter: { sign: 3, degree: 5 },
  Venus: { sign: 11, degree: 27 },
  Saturn: { sign: 6, degree: 20 },
};

/** Naisargika (natural) relationships, Parashari. */
export const NATURAL_RELATIONS: Record<string, { friends: string[]; neutral: string[]; enemies: string[] }> = {
  Sun: { friends: ["Moon", "Mars", "Jupiter"], neutral: ["Mercury"], enemies: ["Venus", "Saturn"] },
  Moon: { friends: ["Sun", "Mercury"], neutral: ["Mars", "Jupiter", "Venus", "Saturn"], enemies: [] },
  Mars: { friends: ["Sun", "Moon", "Jupiter"], neutral: ["Venus", "Saturn"], enemies: ["Mercury"] },
  Mercury: { friends: ["Sun", "Venus"], neutral: ["Mars", "Jupiter", "Saturn"], enemies: ["Moon"] },
  Jupiter: { friends: ["Sun", "Moon", "Mars"], neutral: ["Saturn"], enemies: ["Mercury", "Venus"] },
  Venus: { friends: ["Mercury", "Saturn"], neutral: ["Mars", "Jupiter"], enemies: ["Sun", "Moon"] },
  Saturn: { friends: ["Mercury", "Venus"], neutral: ["Jupiter"], enemies: ["Sun", "Moon", "Mars"] },
};

/**
 * Special drishti beyond the universal 7th. Counted inclusively in signs,
 * so "4" means the 4th sign from the planet's own.
 */
export const SPECIAL_ASPECTS: Record<string, number[]> = {
  Mars: [4, 8],
  Jupiter: [5, 9],
  Saturn: [3, 10],
  // Rahu/Ketu aspects vary by tradition; 5/7/9 is the common assignment and is
  // flagged as tradition-dependent in the output.
  Rahu: [5, 9],
  Ketu: [5, 9],
};

export type DignityStatus =
  | "exalted" | "debilitated" | "moolatrikona" | "own sign"
  | "great friend" | "friendly" | "neutral" | "enemy" | "great enemy";

export interface PlanetDignity {
  planet: string;
  sign: string;
  status: DignityStatus;
  /** How far from the exact exaltation point, in degrees (0 = deepest). */
  exaltationDistance?: number;
  dispositor: string;
}

export interface AspectLink {
  from: string;
  to: string;
  /** Sign distance, counted inclusively from the aspecting planet. */
  houseDistance: number;
  kind: "7th (full)" | "special";
  /** Virupas out of 60 — the classical strength of that drishti. */
  strength: number;
  traditionDependent?: true;
}

export interface RelationshipPair {
  planetA: string;
  planetB: string;
  natural: "friend" | "neutral" | "enemy";
  temporary: "friend" | "enemy";
  compound: "great friend" | "friend" | "neutral" | "enemy" | "great enemy";
}

const signIndex = (sign: string) => (ZODIAC_SIGNS as readonly string[]).indexOf(sign);

/** Inclusive sign-count from a to b, 1..12. */
function signDistance(fromSign: number, toSign: number): number {
  return ((toSign - fromSign + 12) % 12) + 1;
}

// --- dignity ----------------------------------------------------------------

export function computeDignities(planets: PlanetDetail[]): PlanetDignity[] {
  const bySign = new Map(planets.map((p) => [p.name, signIndex(p.rashi)]));

  return planets
    .filter((p) => p.name !== "Ascendant")
    .map((p) => {
      const sIdx = signIndex(p.rashi);
      const deg = p.degreeInRashi;
      const dispositor = p.rashiLord;

      let status: DignityStatus = "neutral";
      let exaltationDistance: number | undefined;

      const ex = EXALT_DEGREE[p.name];
      const mt = MOOLATRIKONA[p.name];
      const own = OWN_SIGNS[p.name] || [];

      if (ex && ex.sign === sIdx) {
        status = "exalted";
        exaltationDistance = Math.abs(deg - ex.degree);
      } else if (ex && (ex.sign + 6) % 12 === sIdx) {
        status = "debilitated";
        exaltationDistance = Math.abs(deg - ex.degree);
      } else if (mt && mt.sign === sIdx && deg >= mt.from && deg <= mt.to) {
        status = "moolatrikona";
      } else if (own.includes(sIdx)) {
        status = "own sign";
      } else {
        // Fall back to the compound relationship with the sign's lord.
        const rel = compoundRelation(p.name, dispositor, bySign);
        if (rel) status = rel === "friend" ? "friendly" : (rel as DignityStatus);
      }

      return {
        planet: p.name,
        sign: p.rashi,
        status,
        ...(exaltationDistance !== undefined ? { exaltationDistance: +exaltationDistance.toFixed(2) } : {}),
        dispositor,
      };
    });
}

// --- relationships ----------------------------------------------------------

function naturalRelation(a: string, b: string): "friend" | "neutral" | "enemy" {
  const rec = NATURAL_RELATIONS[a];
  if (!rec || a === b) return "neutral";
  if (rec.friends.includes(b)) return "friend";
  if (rec.enemies.includes(b)) return "enemy";
  return "neutral";
}

/**
 * Tatkalika (temporary): planets in the 2nd, 3rd, 4th, 10th, 11th or 12th
 * sign from each other are temporary friends; the rest are temporary enemies.
 */
function temporaryRelation(aSign: number, bSign: number): "friend" | "enemy" {
  const d = signDistance(aSign, bSign);
  return [2, 3, 4, 10, 11, 12].includes(d) ? "friend" : "enemy";
}

function combine(
  nat: "friend" | "neutral" | "enemy",
  tmp: "friend" | "enemy"
): RelationshipPair["compound"] {
  if (nat === "friend" && tmp === "friend") return "great friend";
  if (nat === "friend" && tmp === "enemy") return "neutral";
  if (nat === "neutral" && tmp === "friend") return "friend";
  if (nat === "neutral" && tmp === "enemy") return "enemy";
  if (nat === "enemy" && tmp === "friend") return "neutral";
  return "great enemy";
}

function compoundRelation(a: string, b: string, bySign: Map<string, number>) {
  const aS = bySign.get(a);
  const bS = bySign.get(b);
  if (aS === undefined || bS === undefined || !NATURAL_RELATIONS[a]) return null;
  return combine(naturalRelation(a, b), temporaryRelation(aS, bS));
}

export function computeRelationships(planets: PlanetDetail[]): RelationshipPair[] {
  const real = planets.filter((p) => p.name !== "Ascendant" && NATURAL_RELATIONS[p.name]);
  const bySign = new Map(real.map((p) => [p.name, signIndex(p.rashi)]));
  const out: RelationshipPair[] = [];

  for (const a of real) {
    for (const b of real) {
      if (a.name === b.name) continue;
      const nat = naturalRelation(a.name, b.name);
      const tmp = temporaryRelation(bySign.get(a.name)!, bySign.get(b.name)!);
      out.push({
        planetA: a.name,
        planetB: b.name,
        natural: nat,
        temporary: tmp,
        compound: combine(nat, tmp),
      });
    }
  }
  return out;
}

// --- drishti ----------------------------------------------------------------

/** Classical virupa values for the special aspects. */
function aspectStrength(planet: string, distance: number): number {
  if (distance === 7) return 60;
  if (planet === "Mars" && (distance === 4 || distance === 8)) return 60;
  if (planet === "Jupiter" && (distance === 5 || distance === 9)) return 60;
  if (planet === "Saturn" && (distance === 3 || distance === 10)) return 60;
  return 45;
}

export function computeAspects(planets: PlanetDetail[]): AspectLink[] {
  const real = planets.filter((p) => p.name !== "Ascendant");
  const out: AspectLink[] = [];

  for (const from of real) {
    const fromSign = signIndex(from.rashi);
    const targets = [7, ...(SPECIAL_ASPECTS[from.name] || [])];

    for (const dist of targets) {
      const aspectedSign = (fromSign + dist - 1) % 12;
      for (const to of real) {
        if (to.name === from.name) continue;
        if (signIndex(to.rashi) !== aspectedSign) continue;
        out.push({
          from: from.name,
          to: to.name,
          houseDistance: dist,
          kind: dist === 7 ? "7th (full)" : "special",
          strength: aspectStrength(from.name, dist),
          ...(from.name === "Rahu" || from.name === "Ketu" ? { traditionDependent: true as const } : {}),
        });
      }
    }
  }
  return out;
}

/** Which houses (1-12 from lagna) each planet casts drishti on. */
export function aspectedHouses(planets: PlanetDetail[], ascSign: string): Record<string, number[]> {
  const ascIdx = signIndex(ascSign);
  const out: Record<string, number[]> = {};
  for (const p of planets) {
    if (p.name === "Ascendant") continue;
    const fromSign = signIndex(p.rashi);
    const dists = [7, ...(SPECIAL_ASPECTS[p.name] || [])];
    out[p.name] = dists
      .map((d) => signDistance(ascIdx, (fromSign + d - 1) % 12))
      .sort((a, b) => a - b);
  }
  return out;
}

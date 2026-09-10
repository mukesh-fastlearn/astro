// Gochar (transits), Sade Sati and Dhaiya.
//
// Current positions are obtained by running the same verified chart engine for
// "now", rather than duplicating any ephemeris code. Location only affects the
// ascendant, which gochar does not use — everything here is counted in signs
// from the natal Moon or Lagna.

import { ZODIAC_SIGNS } from "./constants";
import { BirthChart, calculateBirthChart, PlanetDetail } from "./kundli";

const idx = (sign: string) => (ZODIAC_SIGNS as readonly string[]).indexOf(sign);
const inclusive = (from: number, to: number) => ((to - from + 12) % 12) + 1;

export interface TransitPosition {
  planet: string;
  sign: string;
  degree: number;
  retrograde: boolean;
  nakshatra: string;
  /** Sign-count from the natal ascendant. */
  houseFromLagna: number;
  /** Sign-count from the natal Moon — how gochar is traditionally read. */
  houseFromMoon: number;
}

export interface SadeSatiState {
  active: boolean;
  /** 1 = Saturn in 12th from Moon, 2 = over Moon, 3 = 2nd from Moon. */
  phase: 0 | 1 | 2 | 3;
  phaseName: string;
  natalMoonSign: string;
  saturnSign: string;
  /** Approximate boundaries, found by scanning Saturn's sign changes. */
  approxStart?: string;
  approxEnd?: string;
  note: string;
}

export interface DhaiyaState {
  active: boolean;
  kind?: "Kantaka Shani (4th from Moon)" | "Ashtama Shani (8th from Moon)";
  saturnSign: string;
  note: string;
}

/** Chart for the current moment. Location is irrelevant to sign placements. */
export function currentTransitChart(at: Date = new Date(), lat = 21.15, lon = 79.09): BirthChart {
  const pad = (n: number) => String(n).padStart(2, "0");
  return calculateBirthChart({
    date: `${at.getUTCFullYear()}-${pad(at.getUTCMonth() + 1)}-${pad(at.getUTCDate())}`,
    time: `${pad(at.getUTCHours())}:${pad(at.getUTCMinutes())}`,
    latitude: lat,
    longitude: lon,
    tzOffset: "Z",
  });
}

export function computeTransits(natal: BirthChart, at: Date = new Date()): TransitPosition[] {
  const now = currentTransitChart(at);
  const ascIdx = idx(natal.ascendant);
  const moonIdx = idx(natal.moonSign);

  return now.planetaryDetails
    .filter((p: PlanetDetail) => p.name !== "Ascendant")
    .map((p) => {
      const s = idx(p.rashi);
      return {
        planet: p.name,
        sign: p.rashi,
        degree: +p.degreeInRashi.toFixed(2),
        retrograde: p.isRetro,
        nakshatra: p.nakshatra,
        houseFromLagna: inclusive(ascIdx, s),
        houseFromMoon: inclusive(moonIdx, s),
      };
    });
}

const PHASE_NAMES: Record<number, string> = {
  1: "Rising phase — Saturn in the 12th from natal Moon",
  2: "Peak phase — Saturn transiting the natal Moon sign",
  3: "Setting phase — Saturn in the 2nd from natal Moon",
};

/**
 * Scan month by month for the window in which Saturn occupies any of the three
 * Sade Sati signs. Saturn spends ~2.5 years per sign, so monthly resolution is
 * ample and keeps this cheap enough to run in the browser.
 */
function saturnSignAt(when: Date): number {
  const c = currentTransitChart(when);
  const sat = c.planetaryDetails.find((p) => p.name === "Saturn");
  return sat ? idx(sat.rashi) : -1;
}

function scanBoundary(from: Date, signs: number[], direction: 1 | -1, maxMonths = 130): Date | null {
  const cursor = new Date(from.getTime());
  let last = new Date(from.getTime());
  for (let i = 0; i < maxMonths; i++) {
    cursor.setUTCMonth(cursor.getUTCMonth() + direction);
    if (!signs.includes(saturnSignAt(cursor))) return last;
    last = new Date(cursor.getTime());
  }
  return null;
}

export function computeSadeSati(natal: BirthChart, at: Date = new Date()): SadeSatiState {
  const moonIdx = idx(natal.moonSign);
  const satIdx = saturnSignAt(at);
  if (moonIdx < 0 || satIdx < 0) {
    return {
      active: false, phase: 0, phaseName: "",
      natalMoonSign: natal.moonSign, saturnSign: "",
      note: "Could not determine Saturn's position.",
    };
  }

  const twelfth = (moonIdx + 11) % 12;
  const second = (moonIdx + 1) % 12;
  const window = [twelfth, moonIdx, second];

  const phase: 0 | 1 | 2 | 3 =
    satIdx === twelfth ? 1 : satIdx === moonIdx ? 2 : satIdx === second ? 3 : 0;

  const base: SadeSatiState = {
    active: phase !== 0,
    phase,
    phaseName: phase ? PHASE_NAMES[phase] : "Not currently in Sade Sati",
    natalMoonSign: natal.moonSign,
    saturnSign: ZODIAC_SIGNS[satIdx],
    note:
      phase !== 0
        ? "Traditionally a period calling for patience and consolidation. It is not regarded as uniformly negative — Saturn rewards steady effort."
        : "Saturn is not transiting the 12th, 1st or 2nd from the natal Moon.",
  };

  if (phase === 0) return base;

  const start = scanBoundary(at, window, -1);
  const end = scanBoundary(at, window, 1);
  return {
    ...base,
    ...(start ? { approxStart: start.toISOString().slice(0, 10) } : {}),
    ...(end ? { approxEnd: end.toISOString().slice(0, 10) } : {}),
  };
}

export function computeDhaiya(natal: BirthChart, at: Date = new Date()): DhaiyaState {
  const moonIdx = idx(natal.moonSign);
  const satIdx = saturnSignAt(at);
  const fromMoon = inclusive(moonIdx, satIdx);

  if (fromMoon === 4 || fromMoon === 8) {
    return {
      active: true,
      kind: fromMoon === 4 ? "Kantaka Shani (4th from Moon)" : "Ashtama Shani (8th from Moon)",
      saturnSign: ZODIAC_SIGNS[satIdx],
      note: "A two-and-a-half year Saturn period traditionally asking for care in the affairs of that house.",
    };
  }
  return {
    active: false,
    saturnSign: satIdx >= 0 ? ZODIAC_SIGNS[satIdx] : "",
    note: "Saturn is not in the 4th or 8th from the natal Moon.",
  };
}

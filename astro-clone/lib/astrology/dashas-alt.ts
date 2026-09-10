// Dasha systems other than Vimshottari.
//
// Each system has a different total cycle and a different way of picking the
// starting period, so they are kept separate rather than parameterised. Cycle
// lengths are asserted at module load — Yogini 36 years, Ashtottari 108 — so a
// mistyped table fails loudly.

import { NAKSHATRAS, ZODIAC_SIGNS, RASHI_LORDS } from "./constants";
import { BirthChart, PlanetDetail } from "./kundli";

export interface AltDashaPeriod {
  name: string;
  lord: string;
  years: number;
  start: string;
  end: string;
  /** Sub-periods, where the system defines them. */
  sub?: AltDashaPeriod[];
}

export interface AltDashaResult {
  system: string;
  totalCycleYears: number;
  periods: AltDashaPeriod[];
  current: AltDashaPeriod | null;
  basis: string;
}

const DAYS_PER_YEAR = 365.2425;
const addYears = (d: Date, y: number) => new Date(d.getTime() + y * DAYS_PER_YEAR * 86_400_000);
const iso = (d: Date) => d.toISOString().slice(0, 10);

// --- Yogini (36-year cycle) -------------------------------------------------

const YOGINI = [
  { name: "Mangala", lord: "Moon", years: 1 },
  { name: "Pingala", lord: "Sun", years: 2 },
  { name: "Dhanya", lord: "Jupiter", years: 3 },
  { name: "Bhramari", lord: "Mars", years: 4 },
  { name: "Bhadrika", lord: "Mercury", years: 5 },
  { name: "Ulka", lord: "Saturn", years: 6 },
  { name: "Siddha", lord: "Venus", years: 7 },
  { name: "Sankata", lord: "Rahu", years: 8 },
];

// --- Ashtottari (108-year cycle) --------------------------------------------

const ASHTOTTARI = [
  { lord: "Sun", years: 6 },
  { lord: "Moon", years: 15 },
  { lord: "Mars", years: 8 },
  { lord: "Mercury", years: 17 },
  { lord: "Saturn", years: 10 },
  { lord: "Jupiter", years: 19 },
  { lord: "Rahu", years: 12 },
  { lord: "Venus", years: 21 },
];

/**
 * Ashtottari nakshatra groups, counted from Ardra (nakshatra index 5).
 * The group sizes 3-4-3-4-3-4-3-3 account for all 27.
 */
const ASHTOTTARI_GROUP_SIZES = [3, 4, 3, 4, 3, 4, 3, 3];

export function verifyCycles(): { ok: boolean; problems: string[] } {
  const problems: string[] = [];
  const y = YOGINI.reduce((n, x) => n + x.years, 0);
  if (y !== 36) problems.push(`Yogini cycle ${y}, expected 36`);
  const a = ASHTOTTARI.reduce((n, x) => n + x.years, 0);
  if (a !== 108) problems.push(`Ashtottari cycle ${a}, expected 108`);
  const g = ASHTOTTARI_GROUP_SIZES.reduce((n, x) => n + x, 0);
  if (g !== 27) problems.push(`Ashtottari groups cover ${g} nakshatras, expected 27`);
  return { ok: problems.length === 0, problems };
}

function moonDetail(chart: BirthChart): PlanetDetail | undefined {
  return chart.planetaryDetails.find((p) => p.name === "Moon");
}

/** Fraction of the current nakshatra already traversed, 0..1. */
function nakshatraFraction(longitude: number): number {
  const span = 360 / 27;
  return (longitude % span) / span;
}

export function computeYoginiDasha(chart: BirthChart, at: Date = new Date()): AltDashaResult {
  const moon = moonDetail(chart);
  if (!moon) {
    return { system: "Yogini", totalCycleYears: 36, periods: [], current: null, basis: "Moon position unavailable." };
  }

  const nakIdx = (NAKSHATRAS as readonly string[]).indexOf(moon.nakshatra); // 0-based
  // Classical rule: add 3 to the nakshatra number, divide by 8; the remainder
  // selects the yogini, with remainder 0 meaning the eighth (Sankata).
  const rem = (nakIdx + 1 + 3) % 8;
  const startIdx = rem === 0 ? 7 : rem - 1;

  const frac = nakshatraFraction(moon.longitude);
  const first = YOGINI[startIdx];
  const balance = first.years * (1 - frac);

  const periods: AltDashaPeriod[] = [];
  let cursor = new Date(chart.birthDate.getTime());

  // First period is the unexpired balance.
  let end = addYears(cursor, balance);
  periods.push({ name: first.name, lord: first.lord, years: +balance.toFixed(3), start: iso(cursor), end: iso(end) });
  cursor = end;

  // Two full cycles forward is plenty for a human lifetime.
  for (let i = 1; i < YOGINI.length * 2 + 1; i++) {
    const y = YOGINI[(startIdx + i) % YOGINI.length];
    end = addYears(cursor, y.years);
    periods.push({ name: y.name, lord: y.lord, years: y.years, start: iso(cursor), end: iso(end) });
    cursor = end;
  }

  return {
    system: "Yogini",
    totalCycleYears: 36,
    periods,
    current: periods.find((p) => new Date(p.start) <= at && at < new Date(p.end)) ?? null,
    basis: "36-year cycle of eight yoginis, started from the Moon's birth nakshatra.",
  };
}

export function computeAshtottariDasha(chart: BirthChart, at: Date = new Date()): AltDashaResult {
  const moon = moonDetail(chart);
  if (!moon) {
    return { system: "Ashtottari", totalCycleYears: 108, periods: [], current: null, basis: "Moon position unavailable." };
  }

  const nakIdx = (NAKSHATRAS as readonly string[]).indexOf(moon.nakshatra);
  // Count from Ardra (index 5).
  const fromArdra = (nakIdx - 5 + 27) % 27;

  let acc = 0;
  let group = 0;
  for (let i = 0; i < ASHTOTTARI_GROUP_SIZES.length; i++) {
    if (fromArdra < acc + ASHTOTTARI_GROUP_SIZES[i]) {
      group = i;
      break;
    }
    acc += ASHTOTTARI_GROUP_SIZES[i];
  }

  // Position within the group, refined by how far through the nakshatra we are.
  const withinGroup = fromArdra - acc;
  const size = ASHTOTTARI_GROUP_SIZES[group];
  const traversed = (withinGroup + nakshatraFraction(moon.longitude)) / size;

  const first = ASHTOTTARI[group];
  const balance = first.years * (1 - traversed);

  const periods: AltDashaPeriod[] = [];
  let cursor = new Date(chart.birthDate.getTime());
  let end = addYears(cursor, balance);
  periods.push({ name: first.lord, lord: first.lord, years: +balance.toFixed(3), start: iso(cursor), end: iso(end) });
  cursor = end;

  for (let i = 1; i < ASHTOTTARI.length + 1; i++) {
    const d = ASHTOTTARI[(group + i) % ASHTOTTARI.length];
    end = addYears(cursor, d.years);
    periods.push({ name: d.lord, lord: d.lord, years: d.years, start: iso(cursor), end: iso(end) });
    cursor = end;
  }

  return {
    system: "Ashtottari",
    totalCycleYears: 108,
    periods,
    current: periods.find((p) => new Date(p.start) <= at && at < new Date(p.end)) ?? null,
    basis: "108-year cycle over eight grahas, nakshatra groups counted from Ardra.",
  };
}

// --- Chara dasha (Jaimini, sign-based) --------------------------------------

const ODD_SIGNS = [0, 2, 4, 6, 8, 10]; // Aries, Gemini, Leo, Libra, Sagittarius, Aquarius

/**
 * Jaimini Chara dasha. Periods belong to signs, not planets.
 *
 * Direction: zodiacal if the lagna sign is odd, reverse if even.
 * Duration: the count from a sign to the sign its lord occupies, minus one;
 * twelve years if the lord sits in the sign itself.
 *
 * Simplification: Scorpio and Aquarius are taken with their classical lords
 * (Mars, Saturn). Jaimini texts allow the nodes as co-lords with a strength
 * test between them, which is not implemented here.
 */
export function computeCharaDasha(chart: BirthChart, at: Date = new Date()): AltDashaResult {
  const ascIdx = (ZODIAC_SIGNS as readonly string[]).indexOf(chart.ascendant);
  if (ascIdx < 0) {
    return { system: "Chara (Jaimini)", totalCycleYears: 0, periods: [], current: null, basis: "Ascendant unavailable." };
  }

  const signOf = new Map(
    chart.planetaryDetails
      .filter((p) => p.name !== "Ascendant")
      .map((p) => [p.name, (ZODIAC_SIGNS as readonly string[]).indexOf(p.rashi)])
  );

  const direct = ODD_SIGNS.includes(ascIdx);

  function durationOf(signIdx: number): number {
    const lord = RASHI_LORDS[signIdx];
    const lordSign = signOf.get(lord);
    if (lordSign === undefined) return 1;
    if (lordSign === signIdx) return 12;
    const forward = ((lordSign - signIdx + 12) % 12) + 1;
    const backward = ((signIdx - lordSign + 12) % 12) + 1;
    return (direct ? forward : backward) - 1;
  }

  const periods: AltDashaPeriod[] = [];
  let cursor = new Date(chart.birthDate.getTime());
  let total = 0;

  for (let i = 0; i < 12; i++) {
    const signIdx = direct ? (ascIdx + i) % 12 : (ascIdx - i + 12) % 12;
    const years = durationOf(signIdx);
    total += years;
    const end = addYears(cursor, years);
    periods.push({
      name: ZODIAC_SIGNS[signIdx],
      lord: RASHI_LORDS[signIdx],
      years,
      start: iso(cursor),
      end: iso(end),
    });
    cursor = end;
  }

  return {
    system: "Chara (Jaimini)",
    totalCycleYears: total,
    periods,
    current: periods.find((p) => new Date(p.start) <= at && at < new Date(p.end)) ?? null,
    basis: `Sign-based dasha running ${direct ? "zodiacally" : "in reverse"} from the ${chart.ascendant} lagna.`,
  };
}

export function computeAllAltDashas(chart: BirthChart, at: Date = new Date()) {
  return {
    cycleCheck: verifyCycles(),
    yogini: computeYoginiDasha(chart, at),
    ashtottari: computeAshtottariDasha(chart, at),
    chara: computeCharaDasha(chart, at),
  };
}

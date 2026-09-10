// Builds the compact chart payload sent to the AI chat backend.
//
// The full BirthChart carries 20 divisional charts and a 5-level dasha tree —
// far too much to put in a prompt. This trims it to the placements an
// astrologer actually reasons from, and resolves the *current* dasha rather
// than shipping the whole timeline.

import { BirthChart, DashaPeriod, PlanetDetail } from "./kundli";

export interface ChartContext {
  ascendant: string;
  moonSign: string;
  birthNakshatra: string;
  birthDate: string;
  planets: {
    name: string;
    sign: string;
    degree: string;
    house: number;
    signLord: string;
    nakshatra: string;
    pada: number;
    nakshatraLord: string;
    retrograde?: true;
    combust?: true;
    dignity?: string;
  }[];
  houses: { house: number; sign: string; planets: string[] }[];
  navamsaD9: { ascendant: string; houses: { house: number; sign: string; planets: string[] }[] };
  dashamshaD10: { ascendant: string; houses: { house: number; sign: string; planets: string[] }[] };
  currentDasha: { level: string; planet: string; from: string; to: string }[];
  meta?: { name?: string; place?: string; date?: string; time?: string };
}

const LEVEL_NAMES = ["mahadasha", "antardasha", "pratyantardasha", "sookshma", "prana"];

/** Which house (1-12) a sign falls in, counting from the ascendant sign. */
function houseOfSign(sign: string, houses: { houseNumber: number; sign: string }[]): number {
  return houses.find((h) => h.sign === sign)?.houseNumber ?? 0;
}

/** Walk the dasha tree for the periods containing `at`, outermost first. */
function activeDashaChain(periods: DashaPeriod[], at: Date): ChartContext["currentDasha"] {
  const out: ChartContext["currentDasha"] = [];
  let level = periods;
  let depth = 0;
  while (level && level.length && depth < LEVEL_NAMES.length) {
    const hit = level.find((p) => new Date(p.startDate) <= at && at < new Date(p.endDate));
    if (!hit) break;
    out.push({
      level: LEVEL_NAMES[depth],
      planet: hit.planet,
      from: hit.startDate,
      to: hit.endDate,
    });
    level = hit.subPeriods;
    depth += 1;
  }
  return out;
}

function slimPlanet(p: PlanetDetail, houses: BirthChart["houses"]) {
  const out: ChartContext["planets"][number] = {
    name: p.name,
    sign: p.rashi,
    degree: p.degreeInRashi.toFixed(2),
    house: houseOfSign(p.rashi, houses),
    signLord: p.rashiLord,
    nakshatra: p.nakshatra,
    pada: p.pada,
    nakshatraLord: p.nakshatraLord,
  };
  // Only include flags when true — keeps the prompt small and unambiguous.
  if (p.isRetro) out.retrograde = true;
  if (p.isCombust) out.combust = true;
  if (p.dignity !== "normal") out.dignity = p.dignity;
  return out;
}

function slimHouses(houses: BirthChart["houses"]) {
  return houses.map((h) => ({ house: h.houseNumber, sign: h.sign, planets: h.planets }));
}

export function buildChartContext(
  chart: BirthChart,
  meta?: ChartContext["meta"],
  now: Date = new Date()
): ChartContext {
  const d9 = chart.divisionalCharts["D9"];
  const d10 = chart.divisionalCharts["D10"];

  return {
    ascendant: chart.ascendant,
    moonSign: chart.moonSign,
    birthNakshatra: chart.nakshatra,
    birthDate: chart.birthDate.toISOString(),
    planets: chart.planetaryDetails.map((p) => slimPlanet(p, chart.houses)),
    houses: slimHouses(chart.houses),
    navamsaD9: d9
      ? { ascendant: d9.ascendant, houses: slimHouses(d9.houses) }
      : { ascendant: "", houses: [] },
    dashamshaD10: d10
      ? { ascendant: d10.ascendant, houses: slimHouses(d10.houses) }
      : { ascendant: "", houses: [] },
    currentDasha: activeDashaChain(chart.dashas, now),
    meta,
  };
}

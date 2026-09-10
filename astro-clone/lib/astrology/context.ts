// Builds the compact chart payload sent to the AI chat backend.
//
// The full BirthChart carries 20 divisional charts and a 5-level dasha tree —
// far too much to put in a prompt. This trims it to the placements an
// astrologer actually reasons from, and resolves the *current* dasha rather
// than shipping the whole timeline.

import { BirthChart, DashaPeriod, PlanetDetail } from "./kundli";
import { analyseChart } from "./analysis";

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
  /** Derived classical judgements — computed, never invented by the model. */
  analysis?: {
    dignities: { planet: string; sign: string; status: string; dispositor: string }[];
    houses: {
      house: number; sign: string; lord: string; lordInHouse: number;
      occupants: string[]; aspectedBy: string[]; significations: string[]; savBindus: number;
    }[];
    aspectedHouses: Record<string, number[]>;
    yogas: { name: string; category: string; conditionsMet: string[]; effects: string[]; basis: string; strength: number }[];
    charaKarakas: { karaka: string; planet: string; signifies: string }[];
    arudhaPadas: { id: string; arudhaSign: string; arudhaHouse: number }[];
    sarvashtakavargaByHouse: { house: number; sign: string; bindus: number }[];
    strength: {
      ranking: { planet: string; rank: number; partialTotal: number }[];
      included: string[]; omitted: string[]; disclaimer: string;
    };
    /** Complete six-bala Shadbala. Present only when the birth place is known. */
    shadbala?: {
      complete: true;
      rows: { planet: string; totalRupas: number; requiredRupas: number; ratio: number; meetsMinimum: boolean; rank: number; cheshtaState: string }[];
      method: string[];
    };
    sadeSati: { active: boolean; phaseName: string; saturnSign: string; approxStart?: string; approxEnd?: string; note: string };
    dhaiya: { active: boolean; kind?: string; note: string };
    transits: { planet: string; sign: string; retrograde: boolean; houseFromLagna: number; houseFromMoon: number }[];
    lalKitab: {
      houseScheme: string;
      placements: { planet: string; sign: string; house: number; state: string }[];
      upay: { planet: string; measures: string[]; avoid: string[] }[];
      disclaimer: string;
    };
    remedies: { type: string; planet: string; recommendation: string; reasons: string[]; confidence: number; cautions: string[] }[];
  };
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
  now: Date = new Date(),
  place?: { latitude: number; longitude: number }
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
    analysis: buildAnalysisContext(chart, now, place),
    meta,
  };
}

/**
 * The full analysis is far larger than a prompt should carry — 56 relationship
 * pairs and per-planet ashtakavarga rows among other things. This keeps the
 * judgements an astrologer actually cites and drops what is re-derivable.
 */
function buildAnalysisContext(
  chart: BirthChart,
  now: Date,
  place?: { latitude: number; longitude: number }
): ChartContext["analysis"] {
  let a;
  try {
    a = analyseChart(chart, now, place);
  } catch {
    return undefined;
  }

  return {
    dignities: a.dignities.map((d) => ({
      planet: d.planet, sign: d.sign, status: d.status, dispositor: d.dispositor,
    })),
    houses: a.houses.map((h) => ({
      house: h.house, sign: h.sign, lord: h.lord, lordInHouse: h.lordPlacedInHouse,
      occupants: h.occupants, aspectedBy: h.aspectedBy,
      significations: h.significations, savBindus: h.sarvashtakavargaBindus,
    })),
    aspectedHouses: a.aspectedHouses,
    yogas: a.yogas.map((y) => ({
      name: y.name, category: y.category, conditionsMet: y.conditionsMet,
      effects: y.effects, basis: y.basis, strength: y.strength,
    })),
    charaKarakas: a.charaKarakas.map((k) => ({
      karaka: k.karaka, planet: k.planet, signifies: k.signifies,
    })),
    arudhaPadas: a.arudhaPadas.map((p) => ({
      id: p.id, arudhaSign: p.arudhaSign, arudhaHouse: p.arudhaHouse,
    })),
    sarvashtakavargaByHouse: a.sarvaByHouse,
    strength: {
      ranking: a.strength.components
        .map((c) => ({ planet: c.planet, rank: c.rank, partialTotal: c.partialTotal }))
        .sort((x, y) => x.rank - y.rank),
      included: a.strength.included,
      omitted: a.strength.omitted,
      disclaimer: a.strength.disclaimer,
    },
    ...(a.shadbala
      ? {
          shadbala: {
            complete: true as const,
            rows: a.shadbala.rows.map((r) => ({
              planet: r.planet,
              totalRupas: r.totalRupas,
              requiredRupas: r.requiredRupas,
              ratio: r.ratio,
              meetsMinimum: r.meetsMinimum,
              rank: r.rank,
              cheshtaState: r.cheshta.state,
            })),
            method: a.shadbala.method,
          },
        }
      : {}),
    sadeSati: {
      active: a.sadeSati.active, phaseName: a.sadeSati.phaseName,
      saturnSign: a.sadeSati.saturnSign, approxStart: a.sadeSati.approxStart,
      approxEnd: a.sadeSati.approxEnd, note: a.sadeSati.note,
    },
    dhaiya: { active: a.dhaiya.active, kind: a.dhaiya.kind, note: a.dhaiya.note },
    transits: a.transits.map((t) => ({
      planet: t.planet, sign: t.sign, retrograde: t.retrograde,
      houseFromLagna: t.houseFromLagna, houseFromMoon: t.houseFromMoon,
    })),
    lalKitab: {
      houseScheme: a.lalKitab.houseScheme,
      placements: a.lalKitab.placements.map((p) => ({
        planet: p.planet, sign: p.sign, house: p.house, state: p.state,
      })),
      upay: a.lalKitab.upay.map((u) => ({
        planet: u.planet, measures: u.measures, avoid: u.avoid,
      })),
      disclaimer: a.lalKitab.disclaimer,
    },
    remedies: a.remedies.map((r) => ({
      type: r.type, planet: r.planet, recommendation: r.recommendation,
      reasons: r.reasons, confidence: r.confidence, cautions: r.cautions,
    })),
  };
}

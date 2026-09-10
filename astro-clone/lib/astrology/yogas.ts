// Yoga detection.
//
// Each yoga records the conditions that actually fired, so an interpretation
// can cite the placement rather than asserting the yoga bare. Definitions vary
// between traditions; where they do, the rule used here is stated in `basis`.

import { RASHI_LORDS, ZODIAC_SIGNS } from "./constants";
import { PlanetDetail } from "./kundli";
import { OWN_SIGNS, EXALT_DEGREE, SPECIAL_ASPECTS } from "./aspects";

export interface DetectedYoga {
  id: string;
  name: string;
  category: string;
  planets: string[];
  houses: number[];
  conditionsMet: string[];
  effects: string[];
  basis: string;
  /** 0..1 — a coarse confidence, not a classical strength measure. */
  strength: number;
}

const KENDRA = [1, 4, 7, 10];
const TRIKONA = [1, 5, 9];
const DUSTHANA = [6, 8, 12];
const BENEFICS = ["Jupiter", "Venus", "Mercury", "Moon"];

const idx = (sign: string) => (ZODIAC_SIGNS as readonly string[]).indexOf(sign);
const inclusive = (from: number, to: number) => ((to - from + 12) % 12) + 1;

interface Ctx {
  ascIdx: number;
  signOf: Map<string, number>;
  houseOf: Map<string, number>;
  /** house number -> lord planet name */
  lordOfHouse: Map<number, string>;
  /** planet -> houses it rules */
  housesRuledBy: Map<string, number[]>;
  planets: PlanetDetail[];
}

function buildCtx(planets: PlanetDetail[], ascSign: string): Ctx {
  const ascIdx = idx(ascSign);
  const real = planets.filter((p) => p.name !== "Ascendant");
  const signOf = new Map(real.map((p) => [p.name, idx(p.rashi)]));
  const houseOf = new Map(real.map((p) => [p.name, inclusive(ascIdx, idx(p.rashi))]));

  const lordOfHouse = new Map<number, string>();
  const housesRuledBy = new Map<string, number[]>();
  for (let h = 1; h <= 12; h++) {
    const sign = (ascIdx + h - 1) % 12;
    const lord = RASHI_LORDS[sign];
    lordOfHouse.set(h, lord);
    housesRuledBy.set(lord, [...(housesRuledBy.get(lord) || []), h]);
  }
  return { ascIdx, signOf, houseOf, lordOfHouse, housesRuledBy, planets: real };
}

/** Does `from` cast drishti on the sign `targetSign`? */
function aspectsSign(from: string, fromSign: number, targetSign: number): boolean {
  const dists = [7, ...(SPECIAL_ASPECTS[from] || [])];
  return dists.some((d) => (fromSign + d - 1) % 12 === targetSign);
}

function conjunct(ctx: Ctx, a: string, b: string): boolean {
  const sa = ctx.signOf.get(a);
  const sb = ctx.signOf.get(b);
  return sa !== undefined && sa === sb;
}

function mutualAspectOrConjunct(ctx: Ctx, a: string, b: string): string | null {
  const sa = ctx.signOf.get(a);
  const sb = ctx.signOf.get(b);
  if (sa === undefined || sb === undefined) return null;
  if (sa === sb) return "conjunct";
  if (aspectsSign(a, sa, sb) && aspectsSign(b, sb, sa)) return "mutual aspect";
  if (aspectsSign(a, sa, sb)) return `${a} aspects ${b}`;
  if (aspectsSign(b, sb, sa)) return `${b} aspects ${a}`;
  return null;
}

// --- individual detectors ---------------------------------------------------

function gajaKesari(ctx: Ctx): DetectedYoga | null {
  const moon = ctx.signOf.get("Moon");
  const jup = ctx.signOf.get("Jupiter");
  if (moon === undefined || jup === undefined) return null;
  const d = inclusive(moon, jup);
  if (![1, 4, 7, 10].includes(d)) return null;
  return {
    id: "GAJA_KESARI",
    name: "Gaja Kesari Yoga",
    category: "raja yoga",
    planets: ["Jupiter", "Moon"],
    houses: [ctx.houseOf.get("Jupiter")!, ctx.houseOf.get("Moon")!],
    conditionsMet: [`Jupiter is in the ${d}th sign from the Moon (a kendra)`],
    effects: ["intelligence", "reputation", "wisdom", "social standing"],
    basis: "Jupiter in a kendra (1/4/7/10) from the Moon.",
    strength: d === 1 ? 0.9 : 0.75,
  };
}

function budhaAditya(ctx: Ctx): DetectedYoga | null {
  if (!conjunct(ctx, "Sun", "Mercury")) return null;
  const merc = ctx.planets.find((p) => p.name === "Mercury");
  const combust = merc?.isCombust;
  return {
    id: "BUDHA_ADITYA",
    name: "Budha-Aditya Yoga",
    category: "intellect",
    planets: ["Sun", "Mercury"],
    houses: [ctx.houseOf.get("Sun")!],
    conditionsMet: [
      `Sun and Mercury are together in ${ZODIAC_SIGNS[ctx.signOf.get("Sun")!]}`,
      combust ? "Mercury is combust, which many traditions treat as weakening the yoga" : "Mercury is not combust",
    ],
    effects: ["analytical ability", "communication", "learning", "administrative skill"],
    basis: "Sun conjunct Mercury in the same sign.",
    strength: combust ? 0.5 : 0.8,
  };
}

function chandraMangala(ctx: Ctx): DetectedYoga | null {
  if (!conjunct(ctx, "Moon", "Mars")) return null;
  return {
    id: "CHANDRA_MANGALA",
    name: "Chandra-Mangala Yoga",
    category: "dhana yoga",
    planets: ["Moon", "Mars"],
    houses: [ctx.houseOf.get("Moon")!],
    conditionsMet: [`Moon and Mars are together in ${ZODIAC_SIGNS[ctx.signOf.get("Moon")!]}`],
    effects: ["earning drive", "enterprise", "resourcefulness"],
    basis: "Moon conjunct Mars.",
    strength: 0.7,
  };
}

const MAHAPURUSHA: Record<string, { name: string; effects: string[] }> = {
  Mars: { name: "Ruchaka Yoga", effects: ["courage", "leadership", "physical vigour"] },
  Mercury: { name: "Bhadra Yoga", effects: ["intellect", "eloquence", "commercial skill"] },
  Jupiter: { name: "Hamsa Yoga", effects: ["wisdom", "ethics", "respect"] },
  Venus: { name: "Malavya Yoga", effects: ["refinement", "comfort", "artistic ability"] },
  Saturn: { name: "Sasa Yoga", effects: ["discipline", "authority", "endurance"] },
};

function panchaMahapurusha(ctx: Ctx): DetectedYoga[] {
  const out: DetectedYoga[] = [];
  for (const [planet, meta] of Object.entries(MAHAPURUSHA)) {
    const sign = ctx.signOf.get(planet);
    const house = ctx.houseOf.get(planet);
    if (sign === undefined || house === undefined) continue;
    if (!KENDRA.includes(house)) continue;

    const own = (OWN_SIGNS[planet] || []).includes(sign);
    const ex = EXALT_DEGREE[planet];
    const exalted = ex && ex.sign === sign;
    if (!own && !exalted) continue;

    out.push({
      id: `MAHAPURUSHA_${planet.toUpperCase()}`,
      name: meta.name,
      category: "pancha mahapurusha",
      planets: [planet],
      houses: [house],
      conditionsMet: [
        `${planet} is in ${ZODIAC_SIGNS[sign]} (${exalted ? "exalted" : "own sign"})`,
        `${planet} occupies house ${house}, a kendra from the ascendant`,
      ],
      effects: meta.effects,
      basis: "Planet in own or exaltation sign, placed in a kendra from lagna.",
      strength: exalted ? 0.9 : 0.8,
    });
  }
  return out;
}

function kemadruma(ctx: Ctx): DetectedYoga | null {
  const moon = ctx.signOf.get("Moon");
  if (moon === undefined) return null;
  const second = (moon + 1) % 12;
  const twelfth = (moon + 11) % 12;

  // Sun and the nodes are excluded from the count by most texts.
  const counted = ctx.planets.filter(
    (p) => !["Moon", "Sun", "Rahu", "Ketu"].includes(p.name)
  );
  const neighbours = counted.filter((p) => [second, twelfth, moon].includes(idx(p.rashi)));
  if (neighbours.length > 0) return null;

  return {
    id: "KEMADRUMA",
    name: "Kemadruma Yoga",
    category: "challenging",
    planets: ["Moon"],
    houses: [ctx.houseOf.get("Moon")!],
    conditionsMet: [
      "No planet (excluding Sun and the nodes) sits with the Moon, or in the 2nd or 12th from it",
    ],
    effects: ["periods of feeling unsupported", "need to build one's own footing"],
    basis: "Moon without planetary company in the 12th, 1st or 2nd from itself.",
    // Widely held to be cancelled by many conditions, so kept deliberately low.
    strength: 0.4,
  };
}

function parivartana(ctx: Ctx): DetectedYoga[] {
  const out: DetectedYoga[] = [];
  const seen = new Set<string>();

  for (let h = 1; h <= 12; h++) {
    const lordA = ctx.lordOfHouse.get(h)!;
    const signA = ctx.signOf.get(lordA);
    if (signA === undefined) continue;
    const houseOfLordA = inclusive(ctx.ascIdx, signA);
    const lordB = ctx.lordOfHouse.get(houseOfLordA)!;
    if (lordB === lordA) continue;
    const signB = ctx.signOf.get(lordB);
    if (signB === undefined) continue;
    if (inclusive(ctx.ascIdx, signB) !== h) continue;

    const key = [h, houseOfLordA].sort((a, b) => a - b).join("-");
    if (seen.has(key)) continue;
    seen.add(key);

    const dusthanaInvolved = [h, houseOfLordA].some((x) => DUSTHANA.includes(x));
    out.push({
      id: `PARIVARTANA_${key}`,
      name: `Parivartana Yoga (${h}th ↔ ${houseOfLordA}th)`,
      category: dusthanaInvolved ? "parivartana (dainya)" : "parivartana (maha)",
      planets: [lordA, lordB],
      houses: [h, houseOfLordA],
      conditionsMet: [
        `${lordA}, lord of house ${h}, sits in house ${houseOfLordA}`,
        `${lordB}, lord of house ${houseOfLordA}, sits in house ${h}`,
      ],
      effects: dusthanaInvolved
        ? ["the two areas are entangled; gains often come after difficulty"]
        : ["the two life areas strongly reinforce each other"],
      basis: "Mutual exchange of signs between two house lords.",
      strength: dusthanaInvolved ? 0.55 : 0.8,
    });
  }
  return out;
}

function rajaYoga(ctx: Ctx): DetectedYoga[] {
  const out: DetectedYoga[] = [];
  const seen = new Set<string>();

  for (const k of KENDRA) {
    for (const t of TRIKONA) {
      const kLord = ctx.lordOfHouse.get(k)!;
      const tLord = ctx.lordOfHouse.get(t)!;
      if (kLord === tLord) continue;
      const key = [kLord, tLord].sort().join("-");
      if (seen.has(key)) continue;

      const link = mutualAspectOrConjunct(ctx, kLord, tLord);
      if (!link) continue;
      seen.add(key);

      out.push({
        id: `RAJA_${key.replace("-", "_").toUpperCase()}`,
        name: `Raja Yoga (${kLord}–${tLord})`,
        category: "raja yoga",
        planets: [kLord, tLord],
        houses: [k, t],
        conditionsMet: [
          `${kLord} rules kendra house ${k}`,
          `${tLord} rules trikona house ${t}`,
          `They are ${link}`,
        ],
        effects: ["rise in status", "recognition", "support from position"],
        basis: "Kendra lord and trikona lord linked by conjunction or aspect.",
        strength: link === "conjunct" ? 0.85 : 0.7,
      });
    }
  }
  return out;
}

function dhanaYoga(ctx: Ctx): DetectedYoga | null {
  const l2 = ctx.lordOfHouse.get(2)!;
  const l11 = ctx.lordOfHouse.get(11)!;
  if (l2 === l11) return null;
  const link = mutualAspectOrConjunct(ctx, l2, l11);
  if (!link) return null;

  return {
    id: "DHANA_2_11",
    name: "Dhana Yoga (2nd–11th)",
    category: "dhana yoga",
    planets: [l2, l11],
    houses: [2, 11],
    conditionsMet: [`${l2} rules the 2nd`, `${l11} rules the 11th`, `They are ${link}`],
    effects: ["accumulation of resources", "income growth"],
    basis: "Lords of the 2nd (wealth) and 11th (gains) connected.",
    strength: link === "conjunct" ? 0.8 : 0.65,
  };
}

function vipareetaRaja(ctx: Ctx): DetectedYoga[] {
  const out: DetectedYoga[] = [];
  for (const h of DUSTHANA) {
    const lord = ctx.lordOfHouse.get(h)!;
    const placed = ctx.houseOf.get(lord);
    if (placed === undefined || !DUSTHANA.includes(placed)) continue;
    const names: Record<number, string> = { 6: "Harsha", 8: "Sarala", 12: "Vimala" };
    out.push({
      id: `VIPAREETA_${h}`,
      name: `Vipareeta Raja Yoga (${names[h]})`,
      category: "vipareeta raja yoga",
      planets: [lord],
      houses: [h, placed],
      conditionsMet: [`${lord}, lord of the ${h}th, is placed in the ${placed}th — also a dusthana`],
      effects: ["difficulty turning to advantage", "gains through adversity"],
      basis: "Dusthana lord placed in another dusthana.",
      strength: 0.65,
    });
  }
  return out;
}

function kalaSarpa(ctx: Ctx): DetectedYoga | null {
  const rahu = ctx.signOf.get("Rahu");
  const ketu = ctx.signOf.get("Ketu");
  if (rahu === undefined || ketu === undefined) return null;

  const others = ctx.planets.filter((p) => !["Rahu", "Ketu"].includes(p.name));
  // Walk the arc from Rahu to Ketu; every planet must lie on one side.
  const arc = (s: number) => (s - rahu + 12) % 12;
  const ketuArc = arc(ketu);
  const inside = others.filter((p) => arc(idx(p.rashi)) < ketuArc).length;

  if (inside !== 0 && inside !== others.length) return null;

  return {
    id: "KALA_SARPA",
    name: "Kala Sarpa Yoga",
    category: "challenging",
    planets: ["Rahu", "Ketu"],
    houses: [ctx.houseOf.get("Rahu")!, ctx.houseOf.get("Ketu")!],
    conditionsMet: [
      `All seven grahas fall on one side of the Rahu–Ketu axis (Rahu in ${ZODIAC_SIGNS[rahu]}, Ketu in ${ZODIAC_SIGNS[ketu]})`,
    ],
    effects: ["intensity and delay in some areas", "strong karmic themes"],
    basis: "Every planet hemmed between the nodes. Definitions and exceptions vary considerably by tradition.",
    strength: 0.5,
  };
}

function adhiYoga(ctx: Ctx): DetectedYoga | null {
  const moon = ctx.signOf.get("Moon");
  if (moon === undefined) return null;
  const targets = [6, 7, 8].map((d) => (moon + d - 1) % 12);
  const found = ctx.planets.filter(
    (p) => BENEFICS.includes(p.name) && p.name !== "Moon" && targets.includes(idx(p.rashi))
  );
  if (found.length < 2) return null;

  return {
    id: "ADHI",
    name: "Adhi Yoga",
    category: "raja yoga",
    planets: found.map((p) => p.name),
    houses: found.map((p) => ctx.houseOf.get(p.name)!),
    conditionsMet: [
      `${found.map((p) => p.name).join(", ")} occupy the 6th, 7th or 8th from the Moon`,
    ],
    effects: ["steady support", "capability", "standing"],
    basis: "Benefics in the 6th, 7th and 8th from the Moon.",
    strength: found.length >= 3 ? 0.85 : 0.65,
  };
}

function neechaBhanga(ctx: Ctx): DetectedYoga[] {
  const out: DetectedYoga[] = [];
  for (const p of ctx.planets) {
    const ex = EXALT_DEGREE[p.name];
    if (!ex) continue;
    const sign = ctx.signOf.get(p.name)!;
    if ((ex.sign + 6) % 12 !== sign) continue; // not debilitated

    const reasons: string[] = [];
    const dispositor = RASHI_LORDS[sign];
    const dispHouse = ctx.houseOf.get(dispositor);
    if (dispHouse && KENDRA.includes(dispHouse)) {
      reasons.push(`${dispositor}, lord of the debilitation sign, sits in kendra house ${dispHouse}`);
    }
    const exLord = RASHI_LORDS[ex.sign];
    const exLordHouse = ctx.houseOf.get(exLord);
    if (exLordHouse && KENDRA.includes(exLordHouse)) {
      reasons.push(`${exLord}, lord of its exaltation sign, sits in kendra house ${exLordHouse}`);
    }
    if (!reasons.length) continue;

    out.push({
      id: `NEECHA_BHANGA_${p.name.toUpperCase()}`,
      name: `Neecha Bhanga (${p.name})`,
      category: "cancellation",
      planets: [p.name],
      houses: [ctx.houseOf.get(p.name)!],
      conditionsMet: [`${p.name} is debilitated in ${p.rashi}`, ...reasons],
      effects: ["the debilitation is substantially offset", "late-blooming strength"],
      basis: "Debilitation cancelled when the dispositor or exaltation lord occupies a kendra. Several other cancellation rules exist.",
      strength: 0.6,
    });
  }
  return out;
}

// --- entry point ------------------------------------------------------------

/**
 * Yogas found in a divisional chart rather than the rasi chart.
 *
 * A varga has signs and house positions but no degrees — the divisional
 * mapping collapses a 30-degree sign onto a whole varga sign. So detectors
 * that need a degree (Pancha Mahapurusha via exaltation degree, Neecha Bhanga,
 * combustion) cannot run there and are excluded rather than approximated.
 */
export interface VargaYogas {
  varga: string;
  vargaName: string;
  ascendant: string;
  yogas: DetectedYoga[];
}

/** Detectors that only need sign positions, so are valid in a varga. */
const SIGN_ONLY_DETECTORS = [
  "GAJA_KESARI", "BUDHA_ADITYA", "CHANDRA_MANGALA", "KEMADRUMA",
  "DHANA_2_11", "KALA_SARPA", "ADHI", "PARIVARTANA", "RAJA", "VIPAREETA",
  "MAHAPURUSHA",
];

function isSignOnly(id: string): boolean {
  return SIGN_ONLY_DETECTORS.some((prefix) => id.startsWith(prefix));
}

/**
 * Build pseudo PlanetDetail records for a divisional chart. Degrees are set to
 * NaN deliberately: any detector that reads a degree will produce a falsy
 * comparison rather than a plausible-looking wrong answer.
 */
function vargaPlanets(houses: { houseNumber: number; sign: string; planets: string[] }[]): PlanetDetail[] {
  const out: PlanetDetail[] = [];
  for (const h of houses) {
    for (const name of h.planets) {
      out.push({
        name,
        longitude: idx(h.sign) * 30,
        rashi: h.sign,
        degreeInRashi: NaN,
        formatted: "",
        rashiLord: RASHI_LORDS[idx(h.sign)],
        nakshatra: "",
        nakshatraLord: "",
        nakshatraSubLord: "",
        pada: 0,
        isRetro: false,
        isCombust: false,
        dignity: "normal",
      });
    }
  }
  return out;
}

export function detectYogasInVargas(
  divisionalCharts: Record<string, { id: string; name: string; ascendant: string; houses: { houseNumber: number; sign: string; planets: string[] }[] }>
): VargaYogas[] {
  const out: VargaYogas[] = [];

  for (const [id, dc] of Object.entries(divisionalCharts)) {
    if (id === "D1") continue; // the rasi chart is handled by detectYogas
    const planets = vargaPlanets(dc.houses);
    if (planets.length === 0) continue;

    const found = detectYogas(planets, dc.ascendant)
      .filter((y) => isSignOnly(y.id))
      .map((y) => ({
        ...y,
        id: `${id}_${y.id}`,
        name: `${y.name} in ${id}`,
        basis: `${y.basis} Detected in the ${id} (${dc.name}) chart, where it applies to that varga's significations rather than the whole life.`,
        // A varga yoga is a supporting indication, not equal to a rasi yoga.
        strength: +(y.strength * 0.6).toFixed(2),
      }));

    if (found.length) {
      out.push({ varga: id, vargaName: dc.name, ascendant: dc.ascendant, yogas: found });
    }
  }
  return out;
}

export function detectYogas(planets: PlanetDetail[], ascSign: string): DetectedYoga[] {
  const ctx = buildCtx(planets, ascSign);
  const found: (DetectedYoga | null)[] = [
    gajaKesari(ctx),
    budhaAditya(ctx),
    chandraMangala(ctx),
    kemadruma(ctx),
    dhanaYoga(ctx),
    kalaSarpa(ctx),
    adhiYoga(ctx),
  ];
  return [
    ...found.filter((y): y is DetectedYoga => y !== null),
    ...panchaMahapurusha(ctx),
    ...parivartana(ctx),
    ...rajaYoga(ctx),
    ...vipareetaRaja(ctx),
    ...neechaBhanga(ctx),
  ].sort((a, b) => b.strength - a.strength);
}

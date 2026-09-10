// Lal Kitab layer.
//
// Lal Kitab is a distinct system, not a variant of Parashari. Two differences
// matter for computation:
//
//   1. The chart is drawn with FIXED houses — the 1st house is always Aries,
//      the 2nd Taurus, and so on. A planet sits in the house matching its
//      sign, regardless of the natal ascendant. This is why a Lal Kitab
//      reading of the same birth data looks different from the Parashari one.
//   2. Remedies (upay) are prescribed largely from planet-in-house position,
//      and are deliberately mundane acts rather than ritual.
//
// SCOPE: the full text carries roughly 108 planet-in-house prescriptions plus
// extensive conditional rules. Implemented here are the fixed-house chart, the
// per-planet general upay, and the classical "sleeping"/"blind" house flags.
// Planet-in-house specifics are marked where present and absent otherwise —
// this is a subset, and says so.

import { ZODIAC_SIGNS } from "./constants";
import { PlanetDetail } from "./kundli";
import { readingFor, verifyHouseReadings } from "./lalkitab-houses";

export interface LalKitabPlacement {
  planet: string;
  sign: string;
  /** Lal Kitab house = sign number, Aries = 1. */
  house: number;
  /** Lal Kitab treats some placements as dormant. */
  state: "active" | "sleeping" | "exalted" | "debilitated";
  note?: string;
}

export interface LalKitabUpay {
  planet: string;
  house?: number;
  measures: string[];
  avoid: string[];
  scope: "general" | "house-specific";
}

export interface LalKitabReading {
  system: "Lal Kitab";
  houseScheme: "fixed — 1st house is always Aries";
  placements: LalKitabPlacement[];
  upay: LalKitabUpay[];
  emptyHouses: number[];
  /** Per planet-in-house readings, all 108 combinations available. */
  houseReadings: { planet: string; house: number; effect: string; measures: string[]; avoid: string[] }[];
  tableCheck: { ok: boolean; count: number; missing: string[] };
  disclaimer: string;
}

/** Lal Kitab exaltation/debilitation houses (fixed-sign scheme). */
const LK_EXALT: Record<string, number> = {
  Sun: 1, Moon: 2, Mars: 10, Mercury: 6, Jupiter: 4, Venus: 12, Saturn: 7, Rahu: 3, Ketu: 6,
};
const LK_DEBIL: Record<string, number> = {
  Sun: 7, Moon: 8, Mars: 4, Mercury: 12, Jupiter: 10, Venus: 6, Saturn: 1, Rahu: 9, Ketu: 12,
};

/**
 * "Sleeping" houses: Lal Kitab holds a planet dormant when no other planet
 * occupies or aspects its house. Simplified here to the unoccupied-house test,
 * which is the form most commonly applied.
 */
const LK_SLEEPING_PAIRS: Record<string, number[]> = {
  Sun: [11], Moon: [6], Mars: [12], Mercury: [8],
  Jupiter: [3], Venus: [8], Saturn: [5], Rahu: [11], Ketu: [5],
};

export const LAL_KITAB_UPAY: Record<string, { measures: string[]; avoid: string[] }> = {
  Sun: {
    measures: [
      "Offer water to the rising sun",
      "Donate wheat and jaggery on Sunday",
      "Keep a copper coin or copper vessel at home",
      "Serve and respect one's father and elders",
    ],
    avoid: ["Accepting free food or hospitality habitually", "Alcohol"],
  },
  Moon: {
    measures: [
      "Offer milk or rice at a temple",
      "Keep silver on the person",
      "Serve and respect one's mother",
      "Place a vessel of water by the bedside overnight, then water a plant with it",
    ],
    avoid: ["Giving away milk after dark", "Accepting used clothing as a gift"],
  },
  Mars: {
    measures: [
      "Feed sweet chapati to dogs",
      "Donate red lentils or jaggery on Tuesday",
      "Keep sweet items in the house",
      "Plant or care for a neem tree",
    ],
    avoid: ["Quarrels with siblings", "Carrying or gifting sharp weapons"],
  },
  Mercury: {
    measures: [
      "Feed green fodder to cows",
      "Donate green cloth or moong on Wednesday",
      "Keep a pierced copper coin",
      "Speak well of sisters, daughters and aunts",
    ],
    avoid: ["Deceit in speech or trade", "Insulting the women of the family"],
  },
  Jupiter: {
    measures: [
      "Apply saffron or turmeric tilak",
      "Water a peepal tree",
      "Donate turmeric, chana dal or books on Thursday",
      "Serve teachers, priests and elders",
    ],
    avoid: ["Disrespecting one's teacher or guru", "Cutting down a peepal tree"],
  },
  Venus: {
    measures: [
      "Feed and care for cows",
      "Donate white cloth, curd or rice on Friday",
      "Keep silver at home",
      "Treat one's spouse and the women of the house with respect",
    ],
    avoid: ["Deceit in relationships", "Accepting white clothing as charity"],
  },
  Saturn: {
    measures: [
      "Feed crows and stray dogs",
      "Donate mustard oil, iron or blankets on Saturday",
      "Serve labourers, the elderly and the poor",
      "Keep an iron item in the house",
    ],
    avoid: ["Alcohol and intoxicants", "Mistreating servants or workers"],
  },
  Rahu: {
    measures: [
      "Float a coconut or coal in flowing water",
      "Feed stray dogs",
      "Donate barley or mustard",
      "Keep silver on the person",
    ],
    avoid: ["Accepting electrical or blue-coloured items as gifts", "Living in an unclean house"],
  },
  Ketu: {
    measures: [
      "Feed stray dogs, particularly black or brown ones",
      "Donate blankets or sesame",
      "Keep a two-coloured blanket",
      "Care for one's children and respect elders",
    ],
    avoid: ["Piercing the ears without reason", "Disrespecting holy men or mendicants"],
  },
};

const DISCLAIMER =
  "Lal Kitab remedies are traditional practices recorded in the text. They are presented as tradition, not as a guaranteed means of changing health, wealth or life outcomes, and are not medical, legal or financial advice. Definitions and prescriptions differ between editions of the Lal Kitab.";

export function computeLalKitab(planets: PlanetDetail[]): LalKitabReading {
  const real = planets.filter((p) => p.name !== "Ascendant");

  // Lal Kitab house = sign index + 1 (Aries is always the 1st house).
  const placements: LalKitabPlacement[] = real.map((p) => {
    const house = (ZODIAC_SIGNS as readonly string[]).indexOf(p.rashi) + 1;
    let state: LalKitabPlacement["state"] = "active";
    let note: string | undefined;

    if (LK_EXALT[p.name] === house) {
      state = "exalted";
      note = `Lal Kitab treats ${p.name} as exalted in house ${house}`;
    } else if (LK_DEBIL[p.name] === house) {
      state = "debilitated";
      note = `Lal Kitab treats ${p.name} as weak in house ${house}`;
    }
    return { planet: p.name, sign: p.rashi, house, state, ...(note ? { note } : {}) };
  });

  const occupied = new Set(placements.map((p) => p.house));

  // Apply the sleeping-planet test now that occupancy is known.
  for (const pl of placements) {
    if (pl.state !== "active") continue;
    const sleepIn = LK_SLEEPING_PAIRS[pl.planet] || [];
    if (sleepIn.includes(pl.house) && !hasCompany(placements, pl)) {
      pl.state = "sleeping";
      pl.note = `Considered dormant — alone in house ${pl.house}`;
    }
  }

  // Planet-in-house specifics, now complete for all 9 x 12 pairs.
  const houseReadings = placements
    .map((pl) => readingFor(pl.planet, pl.house))
    .filter((r): r is NonNullable<typeof r> => !!r);

  const upay: LalKitabUpay[] = real.map((p) => {
    const kb = LAL_KITAB_UPAY[p.name];
    const placed = placements.find((x) => x.planet === p.name);
    const specific = placed ? readingFor(p.name, placed.house) : undefined;
    return {
      planet: p.name,
      ...(placed ? { house: placed.house } : {}),
      // House-specific measures first — they are the more precise prescription.
      measures: [...(specific ? specific.measures : []), ...(kb ? kb.measures : [])],
      avoid: [...(specific ? specific.avoid : []), ...(kb ? kb.avoid : [])],
      scope: (specific ? "house-specific" : "general") as LalKitabUpay["scope"],
    };
  });

  const emptyHouses = Array.from({ length: 12 }, (_, i) => i + 1).filter((h) => !occupied.has(h));

  return {
    system: "Lal Kitab",
    houseScheme: "fixed — 1st house is always Aries",
    placements,
    upay,
    emptyHouses,
    houseReadings,
    tableCheck: verifyHouseReadings(),
    disclaimer: DISCLAIMER,
  };
}

function hasCompany(all: LalKitabPlacement[], p: LalKitabPlacement): boolean {
  return all.some((x) => x.planet !== p.planet && x.house === p.house);
}

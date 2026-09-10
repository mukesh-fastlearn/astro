// Jaimini layer: Chara Karakas and Arudha Padas.

import { RASHI_LORDS, ZODIAC_SIGNS } from "./constants";
import { PlanetDetail } from "./kundli";

/** Seven-karaka (Chara) scheme, in descending-degree order. */
export const KARAKA_ORDER_7 = [
  "Atmakaraka", "Amatyakaraka", "Bhratrikaraka", "Matrikaraka",
  "Putrakaraka", "Gnatikaraka", "Darakaraka",
] as const;

/** Eight-karaka scheme includes Rahu and inserts Pitrikaraka. */
export const KARAKA_ORDER_8 = [
  "Atmakaraka", "Amatyakaraka", "Bhratrikaraka", "Matrikaraka",
  "Pitrikaraka", "Putrakaraka", "Gnatikaraka", "Darakaraka",
] as const;

export interface CharaKaraka {
  karaka: string;
  planet: string;
  sign: string;
  degree: number;
  signifies: string;
}

const KARAKA_MEANING: Record<string, string> = {
  Atmakaraka: "the soul, core self and central life theme",
  Amatyakaraka: "career, counsel and the mind's direction",
  Bhratrikaraka: "siblings, courage and initiative",
  Matrikaraka: "mother, nurture and emotional grounding",
  Pitrikaraka: "father and paternal lineage",
  Putrakaraka: "children, creativity and merit",
  Gnatikaraka: "obstacles, rivals and struggle",
  Darakaraka: "spouse and partnership",
};

/**
 * Chara karakas are assigned by degree within sign, highest first.
 * Rahu is measured in reverse (30° − degree) because it always moves backwards.
 * Ketu is excluded from the scheme in both traditions.
 */
export function computeCharaKarakas(
  planets: PlanetDetail[],
  scheme: 7 | 8 = 7
): CharaKaraka[] {
  const eligible = planets.filter((p) => {
    if (p.name === "Ascendant" || p.name === "Ketu") return false;
    if (p.name === "Rahu") return scheme === 8;
    return true;
  });

  const ranked = eligible
    .map((p) => ({
      planet: p.name,
      sign: p.rashi,
      // Rahu's effective degree is reversed.
      effective: p.name === "Rahu" ? 30 - p.degreeInRashi : p.degreeInRashi,
      degree: p.degreeInRashi,
    }))
    .sort((a, b) => b.effective - a.effective);

  const names = scheme === 8 ? KARAKA_ORDER_8 : KARAKA_ORDER_7;

  return ranked.slice(0, names.length).map((r, i) => ({
    karaka: names[i],
    planet: r.planet,
    sign: r.sign,
    degree: +r.degree.toFixed(2),
    signifies: KARAKA_MEANING[names[i]],
  }));
}

export interface ArudhaPada {
  /** AL, A2, A3 … A12 */
  id: string;
  house: number;
  houseSign: string;
  lord: string;
  lordSign: string;
  arudhaSign: string;
  /** Which house from lagna the arudha falls in. */
  arudhaHouse: number;
  adjusted?: "same sign — moved 10th" | "7th from house — moved 10th";
}

const idx = (sign: string) => (ZODIAC_SIGNS as readonly string[]).indexOf(sign);
const inclusive = (from: number, to: number) => ((to - from + 12) % 12) + 1;

/**
 * Arudha: count from the house to its lord, then the same count onward from
 * the lord. Parashara's exception — if the result lands on the house itself or
 * its 7th, the arudha is taken as the 10th sign from that result.
 */
export function computeArudhaPadas(
  planets: PlanetDetail[],
  houses: { houseNumber: number; sign: string }[]
): ArudhaPada[] {
  const ascSign = houses.find((h) => h.houseNumber === 1)?.sign;
  if (!ascSign) return [];
  const ascIdx = idx(ascSign);

  const planetSign = new Map(
    planets.filter((p) => p.name !== "Ascendant").map((p) => [p.name, idx(p.rashi)])
  );

  const out: ArudhaPada[] = [];

  for (const h of houses) {
    const hIdx = idx(h.sign);
    const lord = RASHI_LORDS[hIdx];
    const lordIdx = planetSign.get(lord);
    if (lordIdx === undefined) continue;

    const n = inclusive(hIdx, lordIdx);
    let arudha = (lordIdx + n - 1) % 12;

    let adjusted: ArudhaPada["adjusted"];
    if (arudha === hIdx) {
      arudha = (arudha + 9) % 12; // 10th from it
      adjusted = "same sign — moved 10th";
    } else if (arudha === (hIdx + 6) % 12) {
      arudha = (arudha + 9) % 12;
      adjusted = "7th from house — moved 10th";
    }

    out.push({
      id: h.houseNumber === 1 ? "AL" : `A${h.houseNumber}`,
      house: h.houseNumber,
      houseSign: h.sign,
      lord,
      lordSign: ZODIAC_SIGNS[lordIdx],
      arudhaSign: ZODIAC_SIGNS[arudha],
      arudhaHouse: inclusive(ascIdx, arudha),
      ...(adjusted ? { adjusted } : {}),
    });
  }

  return out;
}

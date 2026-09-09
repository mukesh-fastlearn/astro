// Guna Milan (Ashtakoota) compatibility — ported faithfully from the target site.
// 36-point system: Varna(1), Vashya(2), Tara(3), Yoni(4), Graha Maitri(5),
// Gana(6), Bhakoot(7), Nadi(8).

import { calculateBirthChart, BirthInput } from "./kundli";
import { NAKSHATRAS, ZODIAC_SIGNS } from "./constants";

const NAK = NAKSHATRAS as readonly string[];
const SIGNS = ZODIAC_SIGNS as readonly string[];

// Varna group by rashi (1=Brahmin .. 4=Shudra).
const VARNA: Record<string, number> = {
  Cancer: 1, Scorpio: 1, Pisces: 1,
  Aries: 2, Leo: 2, Sagittarius: 2,
  Taurus: 3, Virgo: 3, Capricorn: 3,
  Gemini: 4, Libra: 4, Aquarius: 4,
};

// Vashya group by rashi.
const VASHYA: Record<string, number> = {
  Aries: 1, Taurus: 1, Gemini: 2, Virgo: 2, Libra: 2, Aquarius: 2,
  Cancer: 3, Pisces: 3, Capricorn: 3, Leo: 4, Scorpio: 5, Sagittarius: 1,
};

// Yoni (animal) index by nakshatra (1..14).
const YONI: Record<string, number> = {
  Ashwini: 1, Shatabhisha: 1, Bharani: 2, Revati: 2, Krittika: 3, Pushya: 3,
  Rohini: 4, Mrigashira: 4, Ardra: 5, Mula: 5, Punarvasu: 6, Ashlesha: 6,
  Magha: 7, "Purva Phalguni": 7, "Uttara Phalguni": 8, "Uttara Bhadrapada": 8,
  Hasta: 9, Swati: 9, Chitra: 10, Vishakha: 10, Anuradha: 11, Jyeshtha: 11,
  "Purva Ashadha": 12, Shravana: 12, Dhanishta: 13, "Purva Bhadrapada": 13,
  "Uttara Ashadha": 14,
};

// Yoni compatibility matrix (1-indexed). Row 0 unused; each row has 15 entries.
const YONI_MATRIX: number[][] = [
  [],
  [0, 4, 2, 2, 3, 2, 2, 2, 1, 0, 1, 3, 3, 2, 2],
  [0, 2, 4, 3, 3, 2, 2, 2, 2, 3, 1, 2, 3, 0, 2],
  [0, 2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 3, 1],
  [0, 3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 0],
  [0, 2, 2, 1, 2, 4, 2, 1, 2, 2, 2, 1, 3, 1, 2],
  [0, 2, 2, 2, 1, 2, 4, 0, 2, 2, 2, 2, 3, 1, 2],
  [0, 2, 2, 1, 1, 1, 0, 4, 2, 2, 2, 2, 2, 1, 2],
  [0, 1, 2, 3, 1, 2, 2, 2, 4, 3, 0, 3, 2, 2, 2],
  [0, 0, 3, 3, 1, 2, 2, 2, 3, 4, 1, 2, 2, 2, 2],
  [0, 1, 1, 1, 2, 2, 2, 2, 0, 1, 4, 1, 1, 1, 2],
  [0, 3, 2, 2, 2, 1, 2, 2, 3, 2, 1, 4, 2, 1, 2],
  [0, 3, 3, 0, 2, 3, 3, 2, 2, 2, 1, 2, 4, 2, 2],
  [0, 2, 0, 3, 2, 1, 1, 1, 2, 2, 1, 1, 2, 4, 2],
  [0, 2, 2, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4],
];

// Rashi lord (planet) for Graha Maitri.
const RASHI_PLANET: Record<string, string> = {
  Aries: "Mars", Scorpio: "Mars", Taurus: "Venus", Libra: "Venus",
  Gemini: "Mercury", Virgo: "Mercury", Cancer: "Moon", Leo: "Sun",
  Sagittarius: "Jupiter", Pisces: "Jupiter", Capricorn: "Saturn", Aquarius: "Saturn",
};

// Planetary friendship matrix (Graha Maitri scores out of 5).
const MAITRI: Record<string, Record<string, number>> = {
  Sun: { Sun: 5, Moon: 5, Mars: 5, Mercury: 4, Jupiter: 5, Venus: 0, Saturn: 0 },
  Moon: { Sun: 5, Moon: 5, Mars: 4, Mercury: 5, Jupiter: 4, Venus: 1, Saturn: 1 },
  Mars: { Sun: 5, Moon: 4, Mars: 5, Mercury: 0, Jupiter: 5, Venus: 3, Saturn: 1 },
  Mercury: { Sun: 4, Moon: 5, Mars: 0, Mercury: 5, Jupiter: 1, Venus: 5, Saturn: 4 },
  Jupiter: { Sun: 5, Moon: 4, Mars: 5, Mercury: 1, Jupiter: 5, Venus: 1, Saturn: 3 },
  Venus: { Sun: 0, Moon: 1, Mars: 3, Mercury: 5, Jupiter: 1, Venus: 5, Saturn: 5 },
  Saturn: { Sun: 0, Moon: 1, Mars: 1, Mercury: 4, Jupiter: 3, Venus: 5, Saturn: 5 },
};

// Gana by nakshatra (1=Deva, 2=Manushya, 3=Rakshasa).
const GANA: Record<string, number> = {
  Ashwini: 1, Mrigashira: 1, Punarvasu: 1, Pushya: 1, Hasta: 1, Swati: 1,
  Anuradha: 1, Shravana: 1, Revati: 1, Bharani: 2, Rohini: 2, Ardra: 2,
  "Purva Phalguni": 2, "Uttara Phalguni": 2, "Purva Ashadha": 2, "Uttara Ashadha": 2,
  "Purva Bhadrapada": 2, "Uttara Bhadrapada": 2, Krittika: 3, Ashlesha: 3, Magha: 3,
  Chitra: 3, Vishakha: 3, Jyeshtha: 3, Mula: 3, Dhanishta: 3, Shatabhisha: 3,
};

// Nadi by nakshatra (1=Aadi, 2=Madhya, 3=Antya).
const NADI: Record<string, number> = {
  Ashwini: 1, Ardra: 1, Punarvasu: 1, "Uttara Phalguni": 1, Hasta: 1, Jyeshtha: 1,
  Mula: 1, Shatabhisha: 1, "Purva Bhadrapada": 1, Bharani: 2, Mrigashira: 2, Pushya: 2,
  "Purva Phalguni": 2, Chitra: 2, Anuradha: 2, "Purva Ashadha": 2, Dhanishta: 2,
  "Uttara Bhadrapada": 2, Krittika: 3, Rohini: 3, Ashlesha: 3, Magha: 3, Swati: 3,
  Vishakha: 3, "Uttara Ashadha": 3, Shravana: 3, Revati: 3,
};

function taraScore(boyNak: string, girlNak: string): number {
  const t = NAK.indexOf(boyNak);
  const r = NAK.indexOf(girlNak);
  if (t === -1 || r === -1) return 3;
  const s = ((r - t + 27) % 27) + 1;
  const i = ((t - r + 27) % 27) + 1;
  const n = s % 9 === 0 ? 9 : s % 9;
  const l = i % 9 === 0 ? 9 : i % 9;
  const o = n % 2 === 0 || n === 9;
  const c = l % 2 === 0 || l === 9;
  return o && c ? 3 : o || c ? 1.5 : 0;
}

export interface Koota {
  name: string;
  max: number;
  obtained: number;
  description: string;
}

export interface MatchResult {
  boyNakshatra: string;
  girlNakshatra: string;
  boyRasi: string;
  girlRasi: string;
  totalScore: number;
  maxScore: number;
  verdict: string;
  koots: Koota[];
}

export function calculateGunaMilan(boy: BirthInput, girl: BirthInput): MatchResult {
  const boyChart = calculateBirthChart(boy);
  const girlChart = calculateBirthChart(girl);
  const boyMoon = boyChart.planetaryDetails.find((p) => p.name === "Moon")!;
  const girlMoon = girlChart.planetaryDetails.find((p) => p.name === "Moon")!;

  const a = boyMoon.nakshatra;
  const t = girlMoon.nakshatra;
  const r = boyMoon.rashi;
  const s = girlMoon.rashi;

  // Varna (1)
  const iV = VARNA[r];
  const nV = VARNA[s];
  const varna = iV && nV ? +(iV <= nV) : 1;

  // Vashya (2)
  const b = VASHYA[r];
  const j = VASHYA[s];
  let vashya: number;
  if (b && j && b !== j && !(b === 2 && j === 3)) {
    vashya = b === 3 && j === 2 ? 1 : +((b !== 1 || j !== 4) && (b !== 4 || j !== 1));
  } else {
    vashya = 2;
  }

  // Tara (3)
  const tara = taraScore(a, t);

  // Yoni (4)
  const ky = YONI[a];
  const sy = YONI[t];
  const yoni = ky && sy ? YONI_MATRIX[ky][sy] : 4;

  // Graha Maitri (5)
  const bp = RASHI_PLANET[r];
  const vp = RASHI_PLANET[s];
  const maitri = bp && vp ? MAITRI[bp][vp] : 5;

  // Gana (6)
  const gG = GANA[a];
  const gL = GANA[t];
  let gana: number;
  if (gG && gL && gG !== gL && !(gG === 1 && gL === 2) && !(gG === 2 && gL === 1)) {
    gana = gG === 1 && gL === 3 ? 1 : 0;
  } else {
    gana = 6;
  }

  // Bhakoot (7)
  const rR = SIGNS.indexOf(r);
  const rT = SIGNS.indexOf(s);
  const bhakoot =
    rR === -1 || rT === -1
      ? 7
      : 7 * (([1, 7, 3, 11, 4, 10].includes(((rT - rR + 12) % 12) + 1) ? 1 : 0));

  // Nadi (8)
  const bn = NADI[a];
  const fn = NADI[t];
  const nadi = bn && fn ? 8 * (bn !== fn ? 1 : 0) : 8;

  const total = varna + vashya + tara + yoni + maitri + gana + bhakoot + nadi;

  let verdict =
    total < 18
      ? "Not Recommended. Below average compatibility."
      : total < 24
      ? "Average Match. Can proceed with remedies."
      : total < 30
      ? "Good Match. High compatibility."
      : "Excellent Match. Very auspicious combination.";
  if (nadi === 0) verdict += " (Warning: Nadi Dosha Present)";
  else if (bhakoot === 0) verdict += " (Warning: Bhakoot Dosha Present)";
  else if (gana === 0) verdict += " (Warning: Gana Dosha Present)";

  return {
    boyNakshatra: a,
    girlNakshatra: t,
    boyRasi: r,
    girlRasi: s,
    totalScore: total,
    maxScore: 36,
    verdict,
    koots: [
      { name: "Varna", max: 1, obtained: varna, description: "Work & Spiritual Compatibility" },
      { name: "Vashya", max: 2, obtained: vashya, description: "Dominance & Control" },
      { name: "Tara", max: 3, obtained: tara, description: "Destiny & Health" },
      { name: "Yoni", max: 4, obtained: yoni, description: "Mental & Physical Compatibility" },
      { name: "Graha Maitri", max: 5, obtained: maitri, description: "Friendship & Psychological Disposition" },
      { name: "Gana", max: 6, obtained: gana, description: "Temperament & Behavior" },
      { name: "Bhakoot", max: 7, obtained: bhakoot, description: "Love & Emotional Connection" },
      { name: "Nadi", max: 8, obtained: nadi, description: "Health & Genes" },
    ],
  };
}

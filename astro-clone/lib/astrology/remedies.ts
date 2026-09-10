// Traditional remedy and correspondence knowledge base.
//
// IMPORTANT FRAMING: everything here is recorded *traditional association*,
// not established fact. Nothing in this file should be presented as a way to
// change health, wealth or life outcomes. The `safety` block on each remedy
// exists so downstream code and prompts cannot quietly drop that framing.

export interface GemstoneInfo {
  name: string;
  /** Gemological facts, kept separate from astrological role. */
  mineral: string;
  hardnessMohs: number;
  colour: string;
}

export interface PlanetRemedies {
  planet: string;
  sanskrit: string;
  colours: string[];
  gemstone: { primary: string; alternates: string[] };
  metal: string;
  day: string;
  deities: string[];
  direction: string;
  beejaMantra: string;
  namaMantra: string;
  donations: string[];
  flowers: string[];
  foods: string[];
  rudrakshaMukhi: number[];
  yantra: string;
  numbers: number[];
  /** What this graha traditionally signifies — used to match a question. */
  domains: string[];
}

export const PLANET_REMEDIES: Record<string, PlanetRemedies> = {
  Sun: {
    planet: "Sun", sanskrit: "Surya",
    colours: ["red", "orange", "gold"],
    gemstone: { primary: "Ruby", alternates: ["Red Spinel", "Red Garnet"] },
    metal: "gold", day: "Sunday",
    deities: ["Surya", "Shiva"], direction: "East",
    beejaMantra: "Om Hraam Hreem Hraum Sah Suryaya Namah",
    namaMantra: "Om Suryaya Namah",
    donations: ["wheat", "jaggery", "copper vessels", "red cloth"],
    flowers: ["red lotus", "marigold"],
    foods: ["wheat"],
    rudrakshaMukhi: [1, 12], yantra: "Surya Yantra",
    numbers: [1, 10, 19, 28],
    domains: ["authority", "father", "vitality", "government", "self", "reputation"],
  },
  Moon: {
    planet: "Moon", sanskrit: "Chandra",
    colours: ["white", "cream", "silver"],
    gemstone: { primary: "Pearl", alternates: ["Moonstone"] },
    metal: "silver", day: "Monday",
    deities: ["Chandra", "Parvati", "Shiva"], direction: "Northwest",
    beejaMantra: "Om Shraam Shreem Shraum Sah Chandraya Namah",
    namaMantra: "Om Chandraya Namah",
    donations: ["rice", "milk", "white cloth", "silver"],
    flowers: ["white lotus", "jasmine"],
    foods: ["rice", "milk"],
    rudrakshaMukhi: [2], yantra: "Chandra Yantra",
    numbers: [2, 11, 20, 29],
    domains: ["mind", "mother", "emotion", "comfort", "public", "memory"],
  },
  Mars: {
    planet: "Mars", sanskrit: "Mangala",
    colours: ["red", "coral"],
    gemstone: { primary: "Red Coral", alternates: ["Carnelian"] },
    metal: "copper", day: "Tuesday",
    deities: ["Hanuman", "Kartikeya", "Narasimha"], direction: "South",
    beejaMantra: "Om Kraam Kreem Kraum Sah Bhaumaya Namah",
    namaMantra: "Om Mangalaya Namah",
    donations: ["red lentils (masoor)", "copper", "red cloth", "jaggery"],
    flowers: ["red flowers"],
    foods: ["masoor dal"],
    rudrakshaMukhi: [3], yantra: "Mangal Yantra",
    numbers: [9, 18, 27],
    domains: ["courage", "siblings", "property", "conflict", "energy", "surgery"],
  },
  Mercury: {
    planet: "Mercury", sanskrit: "Budha",
    colours: ["green"],
    gemstone: { primary: "Emerald", alternates: ["Green Tourmaline", "Peridot"] },
    metal: "bronze", day: "Wednesday",
    deities: ["Vishnu", "Ganesha"], direction: "North",
    beejaMantra: "Om Braam Breem Braum Sah Budhaya Namah",
    namaMantra: "Om Budhaya Namah",
    donations: ["green gram (moong)", "green cloth", "books"],
    flowers: ["green and white flowers"],
    foods: ["moong dal"],
    rudrakshaMukhi: [4], yantra: "Budha Yantra",
    numbers: [5, 14, 23],
    domains: ["intellect", "communication", "trade", "learning", "analysis"],
  },
  Jupiter: {
    planet: "Jupiter", sanskrit: "Guru / Brihaspati",
    colours: ["yellow", "golden"],
    gemstone: { primary: "Yellow Sapphire", alternates: ["Yellow Topaz", "Citrine"] },
    metal: "gold", day: "Thursday",
    deities: ["Brihaspati", "Vishnu", "Dakshinamurthy"], direction: "Northeast",
    beejaMantra: "Om Graam Greem Graum Sah Gurave Namah",
    namaMantra: "Om Brihaspataye Namah",
    donations: ["turmeric", "chana dal", "yellow cloth", "books"],
    flowers: ["yellow flowers"],
    foods: ["chana dal"],
    rudrakshaMukhi: [5], yantra: "Guru Yantra",
    numbers: [3, 12, 21, 30],
    domains: ["wisdom", "children", "wealth", "dharma", "teachers", "expansion"],
  },
  Venus: {
    planet: "Venus", sanskrit: "Shukra",
    colours: ["white", "pink", "pastels"],
    gemstone: { primary: "Diamond", alternates: ["White Sapphire", "White Zircon"] },
    metal: "silver", day: "Friday",
    deities: ["Lakshmi", "Shukra"], direction: "Southeast",
    beejaMantra: "Om Draam Dreem Draum Sah Shukraya Namah",
    namaMantra: "Om Shukraya Namah",
    donations: ["white cloth", "sugar", "rice", "curd", "silver"],
    flowers: ["white flowers", "rose"],
    foods: ["rice", "curd"],
    rudrakshaMukhi: [6], yantra: "Shukra Yantra",
    numbers: [6, 15, 24],
    domains: ["marriage", "beauty", "art", "luxury", "vehicles", "pleasure"],
  },
  Saturn: {
    planet: "Saturn", sanskrit: "Shani",
    colours: ["black", "dark blue", "navy"],
    gemstone: { primary: "Blue Sapphire", alternates: ["Amethyst", "Iolite", "Lapis Lazuli"] },
    metal: "iron", day: "Saturday",
    deities: ["Shani", "Hanuman", "Shiva"], direction: "West",
    beejaMantra: "Om Praam Preem Praum Sah Shanaischaraya Namah",
    namaMantra: "Om Shanaischaraya Namah",
    donations: ["black sesame", "mustard oil", "iron items", "black cloth", "blankets"],
    flowers: ["blue and dark flowers"],
    foods: ["sesame", "urad dal"],
    rudrakshaMukhi: [7], yantra: "Shani Yantra",
    numbers: [8, 17, 26],
    domains: ["discipline", "longevity", "labour", "delay", "servants", "endurance"],
  },
  Rahu: {
    planet: "Rahu", sanskrit: "Rahu",
    colours: ["smoky grey", "dark blue"],
    gemstone: { primary: "Hessonite (Gomed)", alternates: [] },
    metal: "lead / mixed metals", day: "Saturday",
    deities: ["Durga", "Bhairava"], direction: "Southwest",
    beejaMantra: "Om Bhraam Bhreem Bhraum Sah Rahave Namah",
    namaMantra: "Om Rahave Namah",
    donations: ["mustard", "black gram (urad)", "blankets", "coconut"],
    flowers: ["dark blue flowers"],
    foods: ["urad dal"],
    rudrakshaMukhi: [8], yantra: "Rahu Yantra",
    numbers: [4, 13, 22],
    domains: ["ambition", "foreign matters", "obsession", "technology", "sudden change"],
  },
  Ketu: {
    planet: "Ketu", sanskrit: "Ketu",
    colours: ["grey", "brown", "muted tones"],
    gemstone: { primary: "Cat's Eye (Lehsunia)", alternates: ["Chrysoberyl Cat's Eye"] },
    metal: "mixed metals", day: "Tuesday",
    deities: ["Ganesha", "Bhairava"], direction: "—",
    beejaMantra: "Om Sraam Sreem Sraum Sah Ketave Namah",
    namaMantra: "Om Ketave Namah",
    donations: ["sesame", "blankets", "coconut"],
    flowers: ["multicoloured flowers"],
    foods: ["sesame"],
    rudrakshaMukhi: [9], yantra: "Ketu Yantra",
    numbers: [7, 16, 25],
    domains: ["detachment", "moksha", "research", "past karma", "spirituality"],
  },
};

/** Gemological data, kept apart from astrological role by design. */
export const GEMSTONE_FACTS: Record<string, GemstoneInfo> = {
  Ruby: { name: "Ruby", mineral: "corundum", hardnessMohs: 9, colour: "red" },
  Pearl: { name: "Pearl", mineral: "organic (nacre)", hardnessMohs: 2.5, colour: "white" },
  "Red Coral": { name: "Red Coral", mineral: "organic (calcium carbonate)", hardnessMohs: 3.5, colour: "red" },
  Emerald: { name: "Emerald", mineral: "beryl", hardnessMohs: 7.5, colour: "green" },
  "Yellow Sapphire": { name: "Yellow Sapphire", mineral: "corundum", hardnessMohs: 9, colour: "yellow" },
  Diamond: { name: "Diamond", mineral: "carbon", hardnessMohs: 10, colour: "colourless" },
  "Blue Sapphire": { name: "Blue Sapphire", mineral: "corundum", hardnessMohs: 9, colour: "blue" },
  "Hessonite (Gomed)": { name: "Hessonite", mineral: "grossular garnet", hardnessMohs: 7, colour: "honey brown" },
  "Cat's Eye (Lehsunia)": { name: "Cat's Eye", mineral: "chrysoberyl", hardnessMohs: 8.5, colour: "greenish grey" },
};

/** Rudraksha are associated differently across traditions; sources vary. */
export const RUDRAKSHA: { mukhi: number; planet: string; associations: string[] }[] = [
  { mukhi: 1, planet: "Sun", associations: ["focus", "clarity of purpose"] },
  { mukhi: 2, planet: "Moon", associations: ["harmony", "relationships"] },
  { mukhi: 3, planet: "Mars", associations: ["release of past burden", "confidence"] },
  { mukhi: 4, planet: "Mercury", associations: ["learning", "expression"] },
  { mukhi: 5, planet: "Jupiter", associations: ["discipline", "meditation", "health"] },
  { mukhi: 6, planet: "Venus", associations: ["expression", "grounding"] },
  { mukhi: 7, planet: "Saturn", associations: ["steadiness", "relief from strain"] },
  { mukhi: 8, planet: "Rahu", associations: ["removal of obstacles"] },
  { mukhi: 9, planet: "Ketu", associations: ["courage", "inner strength"] },
  { mukhi: 10, planet: "—", associations: ["protection (attributed to Vishnu)"] },
  { mukhi: 11, planet: "—", associations: ["self-control (attributed to Hanuman)"] },
  { mukhi: 12, planet: "Sun", associations: ["radiance", "leadership"] },
  { mukhi: 13, planet: "Venus", associations: ["attraction (attributed to Kamadeva)"] },
  { mukhi: 14, planet: "Saturn", associations: ["intuition (attributed to Shiva)"] },
];

export const HOUSE_SIGNIFICATIONS: Record<number, string[]> = {
  1: ["self", "body", "vitality", "temperament", "appearance"],
  2: ["wealth", "family", "speech", "food", "accumulated resources"],
  3: ["siblings", "courage", "effort", "communication", "short journeys"],
  4: ["mother", "home", "property", "vehicles", "inner contentment"],
  5: ["children", "intellect", "creativity", "past merit", "speculation"],
  6: ["health", "debt", "enemies", "service", "daily work"],
  7: ["spouse", "partnership", "business dealings", "contracts"],
  8: ["longevity", "upheaval", "inheritance", "hidden matters", "research"],
  9: ["fortune", "father", "dharma", "higher learning", "long journeys"],
  10: ["career", "status", "authority", "public life", "action in the world"],
  11: ["gains", "income", "networks", "elder siblings", "fulfilment of desire"],
  12: ["loss", "expenditure", "foreign lands", "seclusion", "liberation"],
};

export interface RemedyRecommendation {
  type: "gemstone" | "colour" | "mantra" | "donation" | "day" | "deity" | "rudraksha" | "fast";
  recommendation: string;
  planet: string;
  reasons: string[];
  confidence: number;
  cautions: string[];
}

const SAFETY = [
  "Traditional practice, not a guaranteed outcome.",
  "Not medical, legal or financial advice.",
];

/**
 * Build remedy suggestions from actual chart factors rather than sun-sign
 * shorthand. Callers pass which planets the chart analysis flagged as
 * important — the running dasha lord, functional benefics, afflicted planets.
 */
export function recommendRemedies(opts: {
  /** Planets worth strengthening, with the reason each was chosen. */
  focusPlanets: { planet: string; reasons: string[]; confidence: number }[];
  /** Optional life area the user asked about. */
  domain?: string;
}): RemedyRecommendation[] {
  const out: RemedyRecommendation[] = [];

  for (const focus of opts.focusPlanets) {
    const kb = PLANET_REMEDIES[focus.planet];
    if (!kb) continue;

    const gemCautions = [
      ...SAFETY,
      "Gemstone traditions differ, and a strong gemstone is not advised for every chart. Treat this as a starting point for discussion, not a prescription.",
    ];

    out.push(
      {
        type: "colour",
        recommendation: kb.colours.join(", "),
        planet: kb.planet,
        reasons: focus.reasons,
        confidence: focus.confidence,
        cautions: SAFETY,
      },
      {
        type: "mantra",
        recommendation: kb.beejaMantra,
        planet: kb.planet,
        reasons: focus.reasons,
        confidence: focus.confidence,
        cautions: SAFETY,
      },
      {
        type: "day",
        recommendation: kb.day,
        planet: kb.planet,
        reasons: [...focus.reasons, `${kb.day} is traditionally ${kb.planet}'s day`],
        confidence: focus.confidence,
        cautions: SAFETY,
      },
      {
        type: "donation",
        recommendation: kb.donations.join(", "),
        planet: kb.planet,
        reasons: focus.reasons,
        confidence: focus.confidence,
        cautions: SAFETY,
      },
      {
        type: "deity",
        recommendation: kb.deities.join(", "),
        planet: kb.planet,
        reasons: focus.reasons,
        confidence: focus.confidence,
        cautions: SAFETY,
      },
      {
        type: "gemstone",
        recommendation: `${kb.gemstone.primary}${kb.gemstone.alternates.length ? ` (alternates: ${kb.gemstone.alternates.join(", ")})` : ""}`,
        planet: kb.planet,
        reasons: focus.reasons,
        // Gemstones are the highest-stakes suggestion, so they are deliberately
        // reported less confidently than the low-risk remedies above.
        confidence: +(focus.confidence * 0.7).toFixed(2),
        cautions: gemCautions,
      },
      {
        type: "rudraksha",
        recommendation: `${kb.rudrakshaMukhi.join(" or ")} mukhi`,
        planet: kb.planet,
        reasons: focus.reasons,
        confidence: +(focus.confidence * 0.8).toFixed(2),
        cautions: [...SAFETY, "Mukhi-to-planet mapping varies between traditions."],
      }
    );
  }

  return out;
}

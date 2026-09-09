// Marriage prediction engine — ported faithfully from the target site.
// Analyses 7th house, Manglik (Mars) dosha with cancellations, spouse traits,
// dasha-based timing windows, and remedies.

import { BirthChart, BirthInput, calculateBirthChart } from "./kundli";
import { RASHI_LORDS, ZODIAC_SIGNS } from "./constants";

const SIGNS = ZODIAC_SIGNS as readonly string[];

const SPOUSE_BY_SIGN: Record<string, { appearance: string; nature: string; career: string }> = {
  Aries: { appearance: "Athletic, prominent forehead, sharp gaze, energetic posture.", nature: "Independent, headstrong, action-oriented, quick to anger but quick to forgive.", career: "Military, sports, engineering, leadership roles, entrepreneurship." },
  Taurus: { appearance: "Attractive face, solid build, thick neck, pleasant voice, earthy charm.", nature: "Stable, patient, sensuous, stubborn, loves luxury and comfort.", career: "Finance, arts, agriculture, food industry, beauty." },
  Gemini: { appearance: "Youthful appearance, expressive eyes, slender, quick movements.", nature: "Talkative, intellectual, adaptable, playful, sometimes restless.", career: "Communication, writing, sales, IT, teaching, media." },
  Cancer: { appearance: "Round or moon-like face, gentle eyes, prone to weight fluctuation, caring demeanor.", nature: "Emotional, nurturing, protective, family-oriented, moody.", career: "Healthcare, hospitality, real estate, teaching, caregiving." },
  Leo: { appearance: "Regal posture, broad shoulders, striking hair, commanding presence.", nature: "Confident, generous, dramatic, loyal, needs appreciation.", career: "Management, politics, entertainment, luxury goods, CEO." },
  Virgo: { appearance: "Neat and clean appearance, modest, intelligent eyes, youthful.", nature: "Analytical, perfectionist, practical, helpful, critical at times.", career: "Accounting, health/medicine, editing, data analysis, administration." },
  Libra: { appearance: "Very attractive, symmetrical features, elegant, dimples often present.", nature: "Diplomatic, charming, romantic, indecisive, seeks harmony.", career: "Law, design, fashion, diplomacy, public relations." },
  Scorpio: { appearance: "Intense and magnetic eyes, prominent brow, mysterious aura, strong build.", nature: "Passionate, secretive, deeply emotional, fiercely loyal, vindictive if crossed.", career: "Research, psychology, surgery, investigation, occult." },
  Sagittarius: { appearance: "Tall, athletic, open and friendly face, prone to weight gain later in life.", nature: "Philosophical, adventurous, optimistic, blunt, loves freedom.", career: "Academia, travel, law, religion, consulting." },
  Capricorn: { appearance: "Serious expression, prominent bones/teeth, slim build, ages gracefully.", nature: "Disciplined, ambitious, traditional, responsible, reserved.", career: "Corporate management, government, engineering, construction." },
  Aquarius: { appearance: "Unique style, distant but friendly eyes, unusual features, tall.", nature: "Unconventional, humanitarian, intellectual, detached, friendly but aloof.", career: "Technology, science, social work, astrology, aviation." },
  Pisces: { appearance: "Dreamy eyes, soft features, delicate build, gentle smile.", nature: "Compassionate, artistic, intuitive, sensitive, easily overwhelmed.", career: "Arts, healing, spirituality, marine, charity work." },
};

const DYNAMICS_BY_LORD: Record<string, string> = {
  Sun: "A relationship where ego and authority may clash, but there is strong mutual respect. The partner may be dominant or have a high social status.",
  Moon: "A deeply emotional and nurturing connection. Moods may fluctuate, but there is a strong emotional bond and care.",
  Mars: "A passionate, energetic, and sometimes combative relationship. Arguments can happen quickly, but so does reconciliation.",
  Mercury: "A relationship built on communication, friendship, and intellectual compatibility. Lots of talking and shared hobbies.",
  Jupiter: "A relationship based on shared values, wisdom, and growth. Very auspicious, bringing luck and expansion to both.",
  Venus: "A highly romantic, affectionate, and sensual relationship. Focus is on love, harmony, and mutual appreciation.",
  Saturn: "A mature, serious, and committed relationship. It may lack initial romance but provides long-term stability and loyalty.",
};

export interface ManglikReport {
  isManglik: boolean;
  intensity: "None" | "Low" | "High";
  description: string;
  factors: string[];
  cancellations: string[];
}

export interface TimingPrediction {
  score: number;
  periodName: string;
  timeframe: string;
  description: string;
}

export interface Remedy {
  name: string;
  description: string;
  purpose: string;
}

export interface MarriageAnalysis {
  spouseDetails: {
    physicalAppearance: string;
    personality: string;
    careerOrStatus: string;
    relationshipDynamics: string;
  };
  marriageNature: string;
  advancedAnalysis: {
    loveVsArrangedTendency: string;
    delayFactors: string[];
  };
  manglikReport: ManglikReport;
  timingPredictions: TimingPrediction[];
  remedies: Remedy[];
}

function delayFactors(chart: BirthChart): string[] {
  const h7 = chart.houses.find((h) => h.houseNumber === 7);
  const out: string[] = [];
  if (h7?.planets.includes("Saturn")) out.push("Saturn in 7th house indicates maturity and delay in marriage.");
  if (h7?.planets.includes("Ketu")) out.push("Ketu in 7th house can cause detachment or delay in finding the right partner.");
  return out;
}

function analyzeManglik(chart: BirthChart): ManglikReport {
  const asc = chart.ascendant;
  const moon = chart.moonSign;
  const mars = chart.planetaryDetails.find((p) => p.name === "Mars");
  if (!mars) {
    return { isManglik: false, intensity: "None", description: "Mars data missing.", factors: [], cancellations: [] };
  }
  const s = SIGNS.indexOf(mars.rashi);
  const i = SIGNS.indexOf(asc);
  const l = SIGNS.indexOf(moon);
  const fromAsc = ((s - i + 12) % 12) + 1;
  const fromMoon = ((s - l + 12) % 12) + 1;
  const houses = [1, 2, 4, 7, 8, 12];
  const mAsc = houses.includes(fromAsc);
  const mMoon = houses.includes(fromMoon);
  const factors: string[] = [];
  if (mAsc) factors.push(`Mars in ${fromAsc}th house from Ascendant.`);
  if (mMoon) factors.push(`Mars in ${fromMoon}th house from Moon.`);

  const cancellations: string[] = [];
  let cancelled = false;
  if (mars.rashi === "Aries" || mars.rashi === "Scorpio") {
    cancellations.push("Mars is in its own sign (Aries or Scorpio).");
    cancelled = true;
  }
  if (mars.rashi === "Capricorn") {
    cancellations.push("Mars is Exalted in Capricorn.");
    cancelled = true;
  }
  if (fromAsc === 8 && (mars.rashi === "Sagittarius" || mars.rashi === "Pisces")) {
    cancellations.push("Mars in 8th house in Jupiter's sign cancels the Dosha.");
    cancelled = true;
  }
  if (fromAsc === 4 && (mars.rashi === "Aries" || mars.rashi === "Scorpio")) {
    cancellations.push("Mars in 4th house in its own sign cancels the Dosha.");
    cancelled = true;
  }
  if (fromAsc === 12 && (mars.rashi === "Taurus" || mars.rashi === "Libra")) {
    cancellations.push("Mars in 12th house in Venus's sign cancels the Dosha.");
    cancelled = true;
  }
  const jup = chart.planetaryDetails.find((p) => p.name === "Jupiter");
  if (jup) {
    if ([5, 7, 9].includes(((SIGNS.indexOf(jup.rashi) - s + 12) % 12) + 1)) {
      cancellations.push("Jupiter aspects Mars, neutralizing the Dosha.");
      cancelled = true;
    }
    if (jup.rashi === mars.rashi) {
      cancellations.push("Jupiter is conjunct Mars, neutralizing the Dosha.");
      cancelled = true;
    }
  }

  let intensity: ManglikReport["intensity"] = "None";
  let description = "You do not have Manglik Dosha.";
  if ((mAsc || mMoon) && !cancelled) {
    intensity = mAsc && mMoon ? "High" : "Low";
    description = `You have ${intensity} Manglik Dosha. Mars placement creates friction in relationships, requiring careful matching.`;
  } else if ((mAsc || mMoon) && cancelled) {
    intensity = "None";
    description = "You were born with Manglik Dosha, but astrological cancellations in your chart have fully neutralized it.";
  }
  return { isManglik: intensity !== "None", intensity, description, factors, cancellations };
}

function spouseDetails(chart: BirthChart) {
  const h7 = chart.houses.find((h) => h.houseNumber === 7);
  if (!h7) {
    return { physicalAppearance: "", personality: "", careerOrStatus: "", relationshipDynamics: "" };
  }
  const sign = h7.sign;
  const traits = SPOUSE_BY_SIGN[sign] || SPOUSE_BY_SIGN.Aries;
  const lord = RASHI_LORDS[SIGNS.indexOf(sign)];
  const dynamics = DYNAMICS_BY_LORD[lord] || "A balanced connection.";
  let appearance = traits.appearance;
  let nature = traits.nature;
  if (h7.planets.includes("Venus")) appearance += " Exceptionally beautiful/handsome.";
  if (h7.planets.includes("Saturn")) nature += " May be older or very mature.";
  if (h7.planets.includes("Mars")) nature += " Aggressive or highly active.";
  if (h7.planets.includes("Jupiter")) nature += " Very wise and ethically grounded.";
  return {
    physicalAppearance: appearance,
    personality: nature,
    careerOrStatus: traits.career,
    relationshipDynamics: dynamics,
  };
}

function marriageNature(chart: BirthChart): string {
  const h7 = chart.houses.find((h) => h.houseNumber === 7);
  const h5 = chart.houses.find((h) => h.houseNumber === 5);
  let love = 0;
  let arranged = 0;
  if (h7 && h5) {
    const lord5 = RASHI_LORDS[SIGNS.indexOf(h5.sign)];
    const lord7 = RASHI_LORDS[SIGNS.indexOf(h7.sign)];
    if (lord5 === lord7) love += 3;
    if (h7.planets.includes(lord5)) love += 2;
    if (h5.planets.includes(lord7)) love += 2;
    if (h7.planets.includes("Venus") || h5.planets.includes("Venus")) love += 2;
    if (h7.planets.includes("Rahu")) love += 1;
    if (h7.planets.includes("Jupiter") || h7.planets.includes("Sun")) arranged += 2;
    if (chart.houses.find((h) => h.houseNumber === 2)?.planets.includes(lord7)) arranged += 2;
  }
  if (love > arranged + 2) return "Strong Love";
  if (love > arranged) return "Lean Love";
  if (arranged > love + 2) return "Strong Arranged";
  if (arranged > love) return "Lean Arranged";
  return "Mixed";
}

function timingPredictions(chart: BirthChart): TimingPrediction[] {
  const h7 = chart.houses.find((h) => h.houseNumber === 7);
  if (!h7) return [];
  const karakas = [RASHI_LORDS[SIGNS.indexOf(h7.sign)], "Venus", "Jupiter", ...h7.planets];
  if (!chart.dashas || chart.dashas.length === 0) return [];
  const birthYear = chart.birthDate ? new Date(chart.birthDate).getFullYear() : 2000;
  const out: TimingPrediction[] = [];
  const now = new Date();
  const upper = new Date();
  upper.setFullYear(now.getFullYear() + 20);
  const lower = new Date();
  lower.setFullYear(now.getFullYear() - 10);

  chart.dashas.forEach((maha) => {
    const mahaKaraka = karakas.includes(maha.planet);
    maha.subPeriods.forEach((antar) => {
      const antarKaraka = karakas.includes(antar.planet);
      let score = 0;
      if (mahaKaraka && antarKaraka) score = 90;
      else if (mahaKaraka || antarKaraka) score = 60;
      else if (antar.planet === "Venus" || antar.planet === "Jupiter") score = 40;
      const start = new Date(antar.startDate);
      const end = new Date(antar.endDate);
      const age = start.getFullYear() - birthYear;
      if (age >= 24 && age <= 32) score += 20;
      else if (age > 32 && age <= 38) score += 10;
      if (score >= 60 && end > lower && start < upper && age >= 21) {
        let desc =
          "High probability for marriage or significant relationship commitment during this period due to the activation of the 7th house and marriage karakas.";
        if (score >= 90 && age >= 24 && age <= 32)
          desc = "Excellent phase for marriage. This period strongly aligns with both highly auspicious astrological timing and the most natural age for settling down.";
        else if (age > 32)
          desc = "Strong indications of a mature, stable marriage during this period. Planetary alignments favor a long-term, grounded commitment.";
        out.push({
          score,
          periodName: `${maha.planet} Mahadasha - ${antar.planet} Antardasha`,
          timeframe: `${start.getFullYear()} to ${end.getFullYear()}`,
          description: desc,
        });
      }
    });
  });
  out.sort((a, b) => b.score - a.score);
  const top = out.slice(0, 4);
  top.sort((a, b) => parseInt(a.timeframe.split(" ")[0]) - parseInt(b.timeframe.split(" ")[0]));
  return top;
}

function remedies(chart: BirthChart, manglik: ManglikReport): Remedy[] {
  const list: Remedy[] = [];
  if (manglik.isManglik) {
    list.push({
      name: "Kumbh Vivah / Arka Vivah",
      description: "A symbolic marriage to a pot or tree before actual marriage to absorb the negative Martian energy.",
      purpose: "To neutralize Manglik Dosha and ensure a peaceful married life.",
    });
    list.push({
      name: "Worship of Lord Hanuman",
      description: "Chant the Hanuman Chalisa daily and visit a Hanuman temple on Tuesdays.",
      purpose: "Lord Hanuman controls the aggressive energy of Mars.",
    });
  }
  const venus = chart.planetaryDetails.find((p) => p.name === "Venus");
  if (venus && (venus.dignity === "debilitated" || venus.isCombust)) {
    list.push({
      name: "Strengthen Venus",
      description: "Donate white clothes, sweets, or dairy products on Fridays. Respect women.",
      purpose: "Venus is the natural significator of marriage; strengthening it improves relationship harmony.",
    });
  }
  const h7 = chart.houses.find((h) => h.houseNumber === 7);
  if (h7 && (h7.planets.includes("Saturn") || h7.planets.includes("Rahu") || h7.planets.includes("Ketu"))) {
    list.push({
      name: "Pacify 7th House Afflictions",
      description: "Perform Rudrabhishek or chant the Mahamrityunjaya Mantra.",
      purpose: "To remove delays, misunderstandings, and obstacles in marriage caused by malefic planets in the 7th house.",
    });
  }
  if (list.length === 0) {
    list.push({
      name: "General Harmony Remedy",
      description: "Worship Lord Shiva and Goddess Parvati together.",
      purpose: "For a happy, prosperous, and everlasting marital bond.",
    });
  }
  return list;
}

export function analyzeMarriage(input: BirthInput): MarriageAnalysis {
  const chart = calculateBirthChart(input);
  const manglikReport = analyzeManglik(chart);
  const nature = marriageNature(chart);
  return {
    spouseDetails: spouseDetails(chart),
    marriageNature: nature,
    advancedAnalysis: {
      loveVsArrangedTendency: nature,
      delayFactors: delayFactors(chart),
    },
    manglikReport,
    timingPredictions: timingPredictions(chart),
    remedies: remedies(chart, manglikReport),
  };
}

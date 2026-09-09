// Vedic numerology engine — ported faithfully from the target site.
// Mulank (root, from birth day), Bhagyank (destiny, from full DOB),
// Namank (name, Chaldean letter values). Master numbers 11/22/33 preserved.

const CHALDEAN: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

const VOWELS = ["A", "E", "I", "O", "U"];

function reduce(n: number): { singleDigit: number; masterNumber?: number } {
  let master: number | undefined;
  let t = n;
  while (t > 9) {
    if (t === 11 || t === 22 || t === 33) master = t;
    t = t
      .toString()
      .split("")
      .reduce((a, d) => a + parseInt(d, 10), 0);
  }
  return { singleDigit: t, masterNumber: master };
}

function nameValue(name: string, mode: "all" | "vowels" | "consonants") {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, "");
  let sum = 0;
  for (const ch of clean) {
    const isVowel = VOWELS.includes(ch) || (ch === "Y" && mode === "vowels");
    if (mode === "all" || (mode === "vowels" && isVowel) || (mode === "consonants" && !isVowel)) {
      sum += CHALDEAN[ch] || 0;
    }
  }
  return reduce(sum);
}

export interface NumberMeaning {
  planet: string;
  desc: string;
  colors: string;
  days: string;
}

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    planet: "Sun (Surya)",
    desc: "You are a natural-born leader, independent, highly creative, and pioneering. Governed by the Sun, you radiate confidence and are driven to initiate and build. You possess strong willpower and dislike being dominated. Your path is one of innovation and self-reliance.",
    colors: "Yellow, Gold, Orange, Copper",
    days: "Sunday, Monday",
  },
  2: {
    planet: "Moon (Chandra)",
    desc: "You are the peacemaker—sensitive, intuitive, romantic, and highly diplomatic. Ruled by the Moon, your emotional depth is your greatest strength. You thrive in partnerships and possess an innate ability to heal and nurture others. You excel in supportive roles rather than taking the spotlight.",
    colors: "White, Light Green, Pearl",
    days: "Monday, Friday",
  },
  3: {
    planet: "Jupiter (Guru)",
    desc: "You are a natural communicator, expressive, social, and joyful. Governed by Jupiter, the planet of wisdom and expansion, you possess an optimistic and philosophical outlook on life. You are highly creative, inspiring, and often find success through artistic expression or teaching.",
    colors: "Yellow, Purple, Pink, Mauve",
    days: "Thursday, Tuesday",
  },
  4: {
    planet: "Rahu (North Node)",
    desc: "You are the builder—practical, disciplined, and hard-working. Ruled by Rahu, you possess a rebellious yet highly structured approach to life. You excel at creating solid foundations and organizing systems. Though you may face sudden changes, your resilience ensures ultimate success.",
    colors: "Blue, Khaki, Gray",
    days: "Saturday, Sunday, Monday",
  },
  5: {
    planet: "Mercury (Budh)",
    desc: "You are the adventurer—freedom-loving, adaptable, and dynamic. Governed by Mercury, the planet of intellect and communication, your mind is quick and versatile. You crave new experiences, travel, and constant mental stimulation. Routine is your enemy.",
    colors: "Light Green, White, Gray",
    days: "Wednesday, Friday",
  },
  6: {
    planet: "Venus (Shukra)",
    desc: "You are the nurturer—responsible, loving, protective, and drawn to beauty. Ruled by Venus, you have a deep appreciation for luxury, art, and harmony. You are naturally magnetic and often find yourself the focal point of your family and community.",
    colors: "Light Blue, Pink, White",
    days: "Friday, Tuesday",
  },
  7: {
    planet: "Ketu (South Node)",
    desc: "You are the seeker—analytical, spiritual, deep, and deeply intuitive. Governed by Ketu, you are constantly searching for underlying truths and hidden meanings. You require solitude to recharge and possess a highly developed inner wisdom that guides you through life.",
    colors: "Light Green, Light Yellow, White",
    days: "Sunday, Monday, Wednesday",
  },
  8: {
    planet: "Saturn (Shani)",
    desc: "You are the powerhouse—ambitious, goal-oriented, authoritative, and deeply karmic. Ruled by Saturn, the taskmaster, your life is shaped by hard work, discipline, and material success. You have excellent executive abilities and are capable of managing large-scale endeavors.",
    colors: "Black, Dark Blue, Purple",
    days: "Saturday, Friday",
  },
  9: {
    planet: "Mars (Mangal)",
    desc: "You are the humanitarian—compassionate, energetic, courageous, and dramatic. Governed by Mars, the warrior, you fight for ideals and justice. You possess immense vitality and are driven by a desire to heal the world. You are deeply passionate and protective of your loved ones.",
    colors: "Red, Pink, Coral",
    days: "Tuesday, Thursday, Friday",
  },
};

export const SOUL_URGE: Record<number, string> = {
  1: "Driven by independence, you desire to lead and carve your own unique path in life.",
  2: "Deeply sensitive, you seek harmony, deep emotional connections, and partnerships.",
  3: "Expressive and joyful, your inner soul yearns to create, communicate, and inspire.",
  4: "Practical and grounded, you desire stability, order, and a secure foundation.",
  5: "A restless spirit, you crave freedom, travel, adventure, and constant change.",
  6: "Nurturing and responsible, you seek to protect, care for, and bring harmony to others.",
  7: "A deep thinker, you yearn to uncover life's mysteries and seek spiritual truths.",
  8: "Ambitious and capable, you are driven by a desire for material success and authority.",
  9: "Idealistic and compassionate, you deeply wish to serve humanity and heal the world.",
};

export interface NumeroNumber {
  number: number;
  sanskritName: string;
  englishName: string;
  rulingPlanet: string;
  description: string;
  luckyColors: string;
  luckyDays: string;
  hasMasterInfluence: boolean;
  masterNumber?: number;
}

export interface NumerologyResult {
  mulank: NumeroNumber;
  bhagyank: NumeroNumber;
  namank: NumeroNumber;
  soulUrge: { number: number; text: string };
  personality: number;
}

export function calculateNumerology(name: string, dob: string): NumerologyResult {
  // dob = YYYY-MM-DD
  const parts = dob.split("-");
  const day = parts[2] || "";
  const mulankReduced = reduce(
    day.split("").reduce((a, d) => a + (parseInt(d, 10) || 0), 0)
  );
  const bhagyankReduced = reduce(
    dob.replace(/[^0-9]/g, "").split("").reduce((a, d) => a + parseInt(d, 10), 0)
  );
  const namankAll = nameValue(name, "all");
  const soul = nameValue(name, "vowels");
  const personality = nameValue(name, "consonants");

  const build = (
    r: { singleDigit: number; masterNumber?: number },
    sanskrit: string,
    english: string
  ): NumeroNumber => ({
    number: r.singleDigit,
    sanskritName: sanskrit,
    englishName: english,
    rulingPlanet: NUMBER_MEANINGS[r.singleDigit].planet,
    description: NUMBER_MEANINGS[r.singleDigit].desc,
    luckyColors: NUMBER_MEANINGS[r.singleDigit].colors,
    luckyDays: NUMBER_MEANINGS[r.singleDigit].days,
    hasMasterInfluence: !!r.masterNumber,
    masterNumber: r.masterNumber,
  });

  return {
    mulank: build(mulankReduced, "Mulank", "Root / Radical Number"),
    bhagyank: build(bhagyankReduced, "Bhagyank", "Destiny / Life Path"),
    namank: build(namankAll, "Namank", "Name / Expression"),
    soulUrge: { number: soul.singleDigit, text: SOUL_URGE[soul.singleDigit] },
    personality: personality.singleDigit,
  };
}

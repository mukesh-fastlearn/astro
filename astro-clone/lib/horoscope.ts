// Deterministic daily horoscope generator (seeded by date + sign) with Tamil.

import { ZODIAC, TAMIL_RASI } from "./zodiac";

const GENERAL_EN = [
  "Today brings a surge of positive energy. Trust your instincts and take the initiative.",
  "A calm, reflective day ahead. Patience will open doors that haste would keep shut.",
  "Unexpected opportunities arrive. Stay alert and be ready to act decisively.",
  "Focus on relationships today; a kind word will return to you multiplied.",
  "Your discipline pays off. Steady effort moves you closer to a long-held goal.",
  "Creativity flows freely. Channel it into something meaningful and lasting.",
  "A day for grounding and gratitude. Small joys carry great significance.",
];
const GENERAL_TA = [
  "இன்று நேர்மறை ஆற்றல் பெருகும். உங்கள் உள்ளுணர்வை நம்பி முன்னெடுங்கள்.",
  "அமைதியான, சிந்தனைமிக்க நாள். பொறுமை புதிய வாய்ப்புகளைத் திறக்கும்.",
  "எதிர்பாராத வாய்ப்புகள் வரும். விழிப்புடன் இருந்து செயல்படுங்கள்.",
  "உறவுகளில் கவனம் செலுத்துங்கள்; ஒரு இனிய சொல் பன்மடங்காகத் திரும்பும்.",
  "உங்கள் ஒழுக்கம் பலன் தரும். நிலையான முயற்சி இலக்கை நெருங்கச் செய்யும்.",
  "படைப்பாற்றல் தடையின்றி பாயும். அதை அர்த்தமுள்ள செயலில் பயன்படுத்துங்கள்.",
  "நன்றியுடன் இருக்கும் நாள். சிறிய மகிழ்ச்சிகள் பெரிய பொருள் தரும்.",
];
const LOVE_EN = [
  "Harmony returns to close relationships. Express your feelings openly.",
  "Singles may meet someone intriguing. Couples grow closer through honesty.",
  "Give your partner space today; understanding deepens the bond.",
  "Romance is favored in the evening. Plan something thoughtful.",
];
const LOVE_TA = [
  "நெருங்கிய உறவுகளில் இணக்கம் திரும்பும். உணர்வுகளை வெளிப்படையாகச் சொல்லுங்கள்.",
  "தனிநபர்கள் சுவாரஸ்யமான ஒருவரை சந்திக்கலாம். தம்பதிகள் நேர்மையால் நெருங்குவர்.",
  "இன்று துணைக்கு இடம் கொடுங்கள்; புரிதல் பந்தத்தை வலுப்படுத்தும்.",
  "மாலையில் காதல் சாதகமாக இருக்கும். சிந்தனைமிக்க ஒன்றைத் திட்டமிடுங்கள்.",
];
const CAREER_EN = [
  "A professional breakthrough is near. Present your ideas with confidence.",
  "Teamwork brings recognition. Support colleagues and they will support you.",
  "Avoid rushing financial decisions; review the details carefully.",
  "Hard work gets noticed by those who matter. Keep your standards high.",
];
const CAREER_TA = [
  "தொழில் வளர்ச்சி அருகில் உள்ளது. கருத்துகளை நம்பிக்கையுடன் முன்வையுங்கள்.",
  "குழு உழைப்பு அங்கீகாரம் தரும். சகாக்களுக்கு உதவுங்கள்.",
  "நிதி முடிவுகளில் அவசரப்படாதீர்கள்; விவரங்களை கவனமாகப் பாருங்கள்.",
  "கடின உழைப்பு முக்கியமானவர்களால் கவனிக்கப்படும். தரத்தை உயர்த்துங்கள்.",
];
const HEALTH_EN = [
  "Energy levels are high. A short walk will keep you balanced.",
  "Rest is important today. Do not ignore small signs of fatigue.",
  "Hydrate well and eat light. Your body will thank you.",
  "Mental calm is your medicine today. Try a few minutes of meditation.",
];
const HEALTH_TA = [
  "ஆற்றல் அதிகம். ஒரு குறுகிய நடைப்பயணம் சமநிலையைத் தரும்.",
  "இன்று ஓய்வு முக்கியம். சிறிய சோர்வு அறிகுறிகளை புறக்கணிக்காதீர்கள்.",
  "நன்றாக நீர் அருந்தி, இலகுவாக சாப்பிடுங்கள். உடல் நன்றி சொல்லும்.",
  "மன அமைதியே இன்றைய மருந்து. சில நிமிடம் தியானம் செய்யுங்கள்.",
];

function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export interface DailyHoroscope {
  sign: string;
  tamilName: string;
  ruler: string;
  element: string;
  dateLabel: string;
  general: { en: string; ta: string };
  love: { en: string; ta: string };
  career: { en: string; ta: string };
  health: { en: string; ta: string };
  luckyNumber: number;
  luckyColor: string;
  rating: number;
}

const COLORS = ["Saffron", "Red", "Gold", "Green", "White", "Blue", "Yellow", "Maroon"];

export function getDailyHoroscope(signSlug: string, date = new Date()): DailyHoroscope | null {
  const sign = Object.keys(ZODIAC).find((s) => s.toLowerCase() === signSlug.toLowerCase());
  if (!sign) return null;
  const z = ZODIAC[sign];
  const dateKey = date.toISOString().slice(0, 10);
  const seed = hashSeed(`${sign}-${dateKey}`);
  const pick = (arr: string[], salt: number) => arr[(seed + salt) % arr.length];
  return {
    sign,
    tamilName: TAMIL_RASI[sign],
    ruler: z.ruler,
    element: z.element,
    dateLabel: date.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    general: { en: pick(GENERAL_EN, 0), ta: GENERAL_TA[(seed + 0) % GENERAL_TA.length] },
    love: { en: pick(LOVE_EN, 1), ta: LOVE_TA[(seed + 1) % LOVE_TA.length] },
    career: { en: pick(CAREER_EN, 2), ta: CAREER_TA[(seed + 2) % CAREER_TA.length] },
    health: { en: pick(HEALTH_EN, 3), ta: HEALTH_TA[(seed + 3) % HEALTH_TA.length] },
    luckyNumber: (seed % 9) + 1,
    luckyColor: COLORS[seed % COLORS.length],
    rating: (seed % 3) + 3, // 3..5 stars
  };
}

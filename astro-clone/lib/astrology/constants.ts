// Vedic astrology constants — ported faithfully from the target site's bundle.

export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
] as const;

// Lord of each rashi (sign), indexed 0..11
export const RASHI_LORDS = [
  "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury",
  "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter",
] as const;

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
] as const;

// Vimshottari dasha lord order (also nakshatra lords, repeating every 9)
export const DASHA_ORDER = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
] as const;

// Vimshottari mahadasha durations in years (total 120)
export const DASHA_YEARS: Record<string, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7,
  Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
};

// Combustion orb (degrees from Sun) per planet
export const COMBUSTION_ORB: Record<string, number> = {
  Mercury: 14, Venus: 10, Mars: 17, Jupiter: 11, Saturn: 15,
};

// Exaltation / debilitation sign index per planet
export const DIGNITY: Record<string, { ex: number; deb: number }> = {
  Sun: { ex: 0, deb: 6 },
  Moon: { ex: 1, deb: 7 },
  Mars: { ex: 9, deb: 3 },
  Mercury: { ex: 5, deb: 11 },
  Jupiter: { ex: 3, deb: 9 },
  Venus: { ex: 11, deb: 5 },
  Saturn: { ex: 6, deb: 0 },
  Rahu: { ex: -1, deb: -1 },
  Ketu: { ex: -1, deb: -1 },
};

export const TITHIS = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashti", "Saptami",
  "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashti", "Saptami",
  "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya",
] as const;

export const YOGAS = [
  "Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma",
  "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
  "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha",
  "Shukla", "Brahma", "Indra", "Vaidhriti",
] as const;

export const HINDU_MONTHS = [
  "Chaitra", "Vaisakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
  "Ashvina", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna",
] as const;

export const PLANET_BODIES = [
  "Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn",
] as const;

export const DIVISIONAL_CHARTS = [
  { id: "D1", div: 1, name: "Rashi (Birth Chart)" },
  { id: "D2", div: 2, name: "Hora (Wealth)" },
  { id: "D3", div: 3, name: "Drekkana (Siblings)" },
  { id: "D4", div: 4, name: "Chaturthamsa (Fortune)" },
  { id: "D5", div: 5, name: "Panchamsa (Fame)" },
  { id: "D6", div: 6, name: "Shashthamsa (Health)" },
  { id: "D7", div: 7, name: "Saptamsa (Children)" },
  { id: "D8", div: 8, name: "Ashtamsa (Longevity)" },
  { id: "D9", div: 9, name: "Navamsa (Spouse)" },
  { id: "D10", div: 10, name: "Dasamsa (Career)" },
  { id: "D11", div: 11, name: "Rudramsa (Gains)" },
  { id: "D12", div: 12, name: "Dwadasamsa (Parents)" },
  { id: "D16", div: 16, name: "Shodasamsa (Vehicles)" },
  { id: "D20", div: 20, name: "Vimsamsa (Spirituality)" },
  { id: "D24", div: 24, name: "Chaturvimsamsa (Education)" },
  { id: "D27", div: 27, name: "Nakshatramsa (Strength)" },
  { id: "D30", div: 30, name: "Trimsamsa (Misfortune)" },
  { id: "D40", div: 40, name: "Khavedamsa (Maternal)" },
  { id: "D45", div: 45, name: "Akshavedamsa (Paternal)" },
  { id: "D60", div: 60, name: "Shashtiamsa (Karma)" },
] as const;

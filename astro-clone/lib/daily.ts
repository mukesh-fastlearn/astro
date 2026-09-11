// The daily panel: seeded horoscope text combined with real computed data.
//
// The prediction prose is deterministic-by-seed (same sign + same date always
// gives the same reading — it never shuffles on refresh). Everything that can
// be *calculated* is calculated instead of invented: panchang from the actual
// lunar and solar positions, and the auspicious/inauspicious windows from real
// sunrise and sunset at the user's location.

import { getDailyHoroscope, DailyHoroscope } from "./horoscope";
import { getPanchangInfo, PanchangInfo } from "./astrology/kundli";
import { computeMuhurta, MuhurtaDay, TimeWindow } from "./astrology/muhurta";
import { PLANET_REMEDIES } from "./astrology/remedies";

/** Weekday lords, Sunday first — these drive the day's colour and metal. */
const DAY_LORD = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];

export interface DailyPanel {
  horoscope: DailyHoroscope;
  panchang: PanchangInfo | null;
  muhurta: MuhurtaDay | null;
  /** Lord of the weekday, with its traditional correspondences. */
  dayLord: {
    planet: string;
    sanskrit: string;
    colours: string[];
    metal: string;
    deities: string[];
    mantra: string;
    donations: string[];
    numbers: number[];
  } | null;
  /** Best window to begin something, and the windows traditionally avoided. */
  bestTime: TimeWindow | null;
  avoidTimes: TimeWindow[];
  /** Auspicious Choghadiya slots still ahead today. */
  upcomingGood: TimeWindow[];
}

export function buildDailyPanel(
  signSlug: string,
  opts: { latitude?: number; longitude?: number; at?: Date } = {}
): DailyPanel | null {
  const at = opts.at ?? new Date();
  const horoscope = getDailyHoroscope(signSlug, at);
  if (!horoscope) return null;

  const lat = opts.latitude ?? 21.1458; // Nagpur, a reasonable default for India
  const lon = opts.longitude ?? 79.0882;

  let panchang: PanchangInfo | null = null;
  try {
    panchang = getPanchangInfo(at, lat, lon);
  } catch {
    /* panchang is optional; the panel still renders */
  }

  let muhurta: MuhurtaDay | null = null;
  try {
    muhurta = computeMuhurta(at, lat, lon);
  } catch {
    /* likewise */
  }

  const lordName = DAY_LORD[at.getDay()];
  const kb = PLANET_REMEDIES[lordName];
  const dayLord = kb
    ? {
        planet: kb.planet,
        sanskrit: kb.sanskrit,
        colours: kb.colours,
        metal: kb.metal,
        deities: kb.deities,
        mantra: kb.beejaMantra,
        donations: kb.donations,
        numbers: kb.numbers,
      }
    : null;

  const now = at.getTime();
  const upcomingGood = (muhurta?.choghadiyaDay ?? [])
    .filter((w) => w.quality === "auspicious" && new Date(w.end).getTime() > now)
    .slice(0, 3);

  return {
    horoscope,
    panchang,
    muhurta,
    dayLord,
    bestTime: muhurta?.abhijit ?? null,
    avoidTimes: muhurta?.inauspicious ?? [],
    upcomingGood,
  };
}

/** "14:32" in the viewer's own timezone. */
export function hhmm(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

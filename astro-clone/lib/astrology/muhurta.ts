// Muhurta: the inauspicious and auspicious time windows of a day.
//
// These all divide the interval between actual sunrise and sunset, so unlike
// the rest of the engine they need a real rise/set calculation rather than
// sign arithmetic. astronomy-engine provides it, so the windows here are
// computed for the given place rather than assumed from a fixed 6am–6pm day.

import * as Astronomy from "astronomy-engine";

export interface TimeWindow {
  name: string;
  start: string;
  end: string;
  quality: "inauspicious" | "auspicious" | "neutral";
  note?: string;
}

export interface MuhurtaDay {
  date: string;
  sunrise: string | null;
  sunset: string | null;
  dayLengthHours: number | null;
  weekday: string;
  inauspicious: TimeWindow[];
  abhijit: TimeWindow | null;
  choghadiyaDay: TimeWindow[];
  choghadiyaNight: TimeWindow[];
  note: string;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Which eighth of the daytime each window occupies, indexed by weekday
 * (0 = Sunday). Values are 1-based part numbers.
 */
const RAHU_PART = [8, 2, 7, 5, 6, 4, 3];
const YAMAGANDA_PART = [5, 4, 3, 2, 1, 7, 6];
const GULIKA_PART = [7, 6, 5, 4, 3, 2, 1];

/** Choghadiya sequence start index per weekday, into the day-time cycle. */
const CHOGHADIYA_CYCLE = ["Udveg", "Chal", "Labh", "Amrit", "Kaal", "Shubh", "Rog"] as const;
const CHOGHADIYA_QUALITY: Record<string, TimeWindow["quality"]> = {
  Amrit: "auspicious", Shubh: "auspicious", Labh: "auspicious",
  Chal: "neutral",
  Udveg: "inauspicious", Kaal: "inauspicious", Rog: "inauspicious",
};
/** Day-time Choghadiya begins with a different lord per weekday. */
const CHOGHADIYA_DAY_START = [0, 3, 6, 2, 5, 1, 4]; // Sun..Sat, index into CHOGHADIYA_CYCLE
const CHOGHADIYA_NIGHT_START = [4, 0, 3, 6, 2, 5, 1];

function fmt(d: Date | null): string | null {
  if (!d) return null;
  return d.toISOString();
}

function slice(start: Date, end: Date, part: number, total: number): { start: Date; end: Date } {
  const span = (end.getTime() - start.getTime()) / total;
  return {
    start: new Date(start.getTime() + span * (part - 1)),
    end: new Date(start.getTime() + span * part),
  };
}

export function computeMuhurta(date: Date, latitude: number, longitude: number): MuhurtaDay {
  const observer = new Astronomy.Observer(latitude, longitude, 0);
  const weekdayIdx = date.getUTCDay();

  // Search from the start of the day in UTC; limitDays 2 covers polar edge cases.
  const dayStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

  let sunrise: Date | null = null;
  let sunset: Date | null = null;
  try {
    const r = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, dayStart, 2);
    const s = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, dayStart, 2);
    sunrise = r ? r.date : null;
    sunset = s ? s.date : null;
    // If sunset precedes sunrise the search straddled midnight; re-search.
    if (sunrise && sunset && sunset <= sunrise) {
      const s2 = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, sunrise, 2);
      sunset = s2 ? s2.date : sunset;
    }
  } catch {
    // leave nulls; the caller renders a graceful fallback
  }

  const base: MuhurtaDay = {
    date: date.toISOString().slice(0, 10),
    sunrise: fmt(sunrise),
    sunset: fmt(sunset),
    dayLengthHours: null,
    weekday: WEEKDAYS[weekdayIdx],
    inauspicious: [],
    abhijit: null,
    choghadiyaDay: [],
    choghadiyaNight: [],
    note:
      "Windows are computed from actual sunrise and sunset for this location. Traditional timing practice, not a guarantee of outcomes.",
  };

  if (!sunrise || !sunset) {
    return { ...base, note: base.note + " Sunrise/sunset could not be determined for this location." };
  }

  base.dayLengthHours = +((sunset.getTime() - sunrise.getTime()) / 3_600_000).toFixed(2);

  const mk = (name: string, part: number, quality: TimeWindow["quality"], note?: string): TimeWindow => {
    const w = slice(sunrise!, sunset!, part, 8);
    return { name, start: w.start.toISOString(), end: w.end.toISOString(), quality, ...(note ? { note } : {}) };
  };

  base.inauspicious = [
    mk("Rahu Kalam", RAHU_PART[weekdayIdx], "inauspicious", "Traditionally avoided for beginning new work."),
    mk("Yamaganda", YAMAGANDA_PART[weekdayIdx], "inauspicious"),
    mk("Gulika Kalam", GULIKA_PART[weekdayIdx], "inauspicious"),
  ];

  // Abhijit: the 8th of 15 muhurtas, centred on local apparent noon.
  const abhijitSpan = slice(sunrise, sunset, 8, 15);
  base.abhijit = {
    name: "Abhijit Muhurta",
    start: abhijitSpan.start.toISOString(),
    end: abhijitSpan.end.toISOString(),
    quality: "auspicious",
    note: "Generally considered favourable, though traditionally not used for Wednesday travel.",
  };

  // Choghadiya: eight equal parts of day and of night.
  const nightEnd = new Date(sunrise.getTime() + 24 * 3_600_000);
  for (let i = 0; i < 8; i++) {
    const dayName = CHOGHADIYA_CYCLE[(CHOGHADIYA_DAY_START[weekdayIdx] + i) % 7];
    const w = slice(sunrise, sunset, i + 1, 8);
    base.choghadiyaDay.push({
      name: dayName,
      start: w.start.toISOString(),
      end: w.end.toISOString(),
      quality: CHOGHADIYA_QUALITY[dayName],
    });

    const nightName = CHOGHADIYA_CYCLE[(CHOGHADIYA_NIGHT_START[weekdayIdx] + i) % 7];
    const n = slice(sunset, nightEnd, i + 1, 8);
    base.choghadiyaNight.push({
      name: nightName,
      start: n.start.toISOString(),
      end: n.end.toISOString(),
      quality: CHOGHADIYA_QUALITY[nightName],
    });
  }

  return base;
}

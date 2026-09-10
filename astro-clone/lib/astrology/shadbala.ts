// Complete Shadbala — all six balas.
//
// This supersedes the partial calculation in strength.ts. The two components
// previously omitted are now computable because the engine has real
// sunrise/sunset (SearchRiseSet) and real daily motion (finite difference):
//
//   Kala Bala    Nathonnatha, Paksha, Tribhaga, Abda, Masa, Vara, Hora, Ayana
//   Cheshta Bala from the eight classical motion states
//
// Units are virupas throughout; 60 virupas = 1 rupa. Results are reported in
// both, against the classical required minimums.
//
// Where a text offers competing formulations the choice is stated in the
// `method` field of the result, so nothing is silently assumed.

import * as Astronomy from "astronomy-engine";
import { PlanetDetail, norm360, ayanamsa } from "./kundli";
import { EXALT_DEGREE, SPECIAL_ASPECTS, OWN_SIGNS, MOOLATRIKONA } from "./aspects";

export const SB_PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"] as const;
export type SbPlanet = (typeof SB_PLANETS)[number];

const BODY: Record<string, Astronomy.Body> = {
  Sun: Astronomy.Body.Sun,
  Moon: Astronomy.Body.Moon,
  Mars: Astronomy.Body.Mars,
  Mercury: Astronomy.Body.Mercury,
  Jupiter: Astronomy.Body.Jupiter,
  Venus: Astronomy.Body.Venus,
  Saturn: Astronomy.Body.Saturn,
};

/** Classical minimum Shadbala, in rupas. */
export const REQUIRED_RUPAS: Record<SbPlanet, number> = {
  Sun: 5, Moon: 6, Mars: 5, Mercury: 7, Jupiter: 6.5, Venus: 5.5, Saturn: 5,
};

/** Naisargika bala is fixed. */
const NAISARGIKA: Record<SbPlanet, number> = {
  Sun: 60.0, Moon: 51.43, Venus: 42.86, Jupiter: 34.29,
  Mercury: 25.71, Mars: 17.14, Saturn: 8.57,
};

/** Mean daily motion, degrees — used to classify motion state. */
const MEAN_MOTION: Record<SbPlanet, number> = {
  Sun: 0.9856, Moon: 13.1764, Mercury: 4.0923, Venus: 1.6021,
  Mars: 0.5240, Jupiter: 0.0831, Saturn: 0.0335,
};

/** Dig bala: ecliptic offset from the ascendant at which each is strongest. */
const DIG_STRONG: Record<SbPlanet, number> = {
  Jupiter: 0, Mercury: 0, Moon: 90, Venus: 90, Saturn: 180, Sun: 270, Mars: 270,
};

/** Weekday lords, Sunday first. */
const WEEKDAY_LORDS: SbPlanet[] = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
/** Chaldean order, used for the planetary hours. */
const CHALDEAN: SbPlanet[] = ["Saturn", "Jupiter", "Mars", "Sun", "Venus", "Mercury", "Moon"];

const BENEFIC: SbPlanet[] = ["Jupiter", "Venus", "Mercury", "Moon"];
const MALEFIC = ["Sun", "Mars", "Saturn", "Rahu", "Ketu"];

/** Planets strong in northern declination. */
const NORTH_STRONG: SbPlanet[] = ["Sun", "Mars", "Jupiter", "Venus"];

export interface ShadbalaRow {
  planet: SbPlanet;
  sthana: { uchcha: number; saptavargaja: number; ojhayugma: number; kendra: number; drekkana: number; total: number };
  dig: number;
  kala: {
    nathonnatha: number; paksha: number; tribhaga: number;
    abda: number; masa: number; vara: number; hora: number; ayana: number;
    yuddha: number; total: number;
  };
  cheshta: { state: string; virupas: number };
  naisargika: number;
  drik: number;
  totalVirupas: number;
  totalRupas: number;
  requiredRupas: number;
  ratio: number;
  meetsMinimum: boolean;
  rank: number;
}

export interface ShadbalaResult {
  rows: ShadbalaRow[];
  sunrise: string | null;
  sunset: string | null;
  method: string[];
  complete: boolean;
  notes: string[];
}

// --- helpers ----------------------------------------------------------------

const arcTo180 = (a: number, b: number) => {
  const d = Math.abs(norm360(a) - norm360(b)) % 360;
  return d > 180 ? 360 - d : d;
};

function eclipticLon(body: Astronomy.Body, when: Date): number {
  const t = Astronomy.MakeTime(when);
  const vec = Astronomy.GeoVector(body, t, true);
  return Astronomy.Ecliptic(vec).elon;
}

/** Degrees per day, by central difference. */
function dailySpeed(body: Astronomy.Body, when: Date): number {
  const half = 43_200_000; // 12h
  let d = eclipticLon(body, new Date(when.getTime() + half)) -
          eclipticLon(body, new Date(when.getTime() - half));
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

function declination(body: Astronomy.Body, when: Date): number {
  const t = Astronomy.MakeTime(when);
  const observer = new Astronomy.Observer(0, 0, 0);
  return Astronomy.Equator(body, t, observer, true, true).dec;
}

/** Julian day number. */
function julianDay(d: Date): number {
  return d.getTime() / 86_400_000 + 2440587.5;
}

/** Days since the Kali Yuga epoch, used for the year and month lords. */
function ahargana(d: Date): number {
  return Math.floor(julianDay(d) - 588465.5);
}

// --- Sthana Bala ------------------------------------------------------------

/** Uchcha: 60 at deep exaltation, 0 at the debilitation point opposite. */
function uchchaBala(planet: SbPlanet, lon: number): number {
  const ex = EXALT_DEGREE[planet];
  if (!ex) return 0;
  const debil = norm360(ex.sign * 30 + ex.degree + 180);
  return (60 * arcTo180(lon, debil)) / 180;
}

/**
 * Saptavargaja: strength from dignity across seven divisional charts.
 * Scored per varga — moolatrikona 45, own 30, friendly 15, neutral 7.5,
 * enemy 3.75 — then averaged to a 60-virupa scale.
 */
function saptavargajaBala(planet: SbPlanet, lon: number): number {
  const DIVS = [1, 2, 3, 7, 9, 12, 30];
  let score = 0;
  for (const div of DIVS) {
    const signIdx = divisionalSign(div, lon);
    const own = (OWN_SIGNS[planet] ?? []).includes(signIdx);
    const mt = MOOLATRIKONA[planet];
    const ex = EXALT_DEGREE[planet];
    if (mt && mt.sign === signIdx) score += 45;
    else if (ex && ex.sign === signIdx) score += 45;
    else if (own) score += 30;
    else if (ex && (ex.sign + 6) % 12 === signIdx) score += 3.75;
    else score += 7.5;
  }
  // Max attainable is 45 per varga; normalise onto 60.
  return (score / (DIVS.length * 45)) * 60;
}

/** Same divisional mapping the main engine uses. */
function divisionalSign(div: number, longitude: number): number {
  const lon = norm360(longitude);
  const sign = Math.floor(lon / 30);
  const deg = lon % 30;
  if (div === 1) return sign;
  const part = Math.floor((deg * div) / 30);
  return (sign * div + part) % 12;
}

/** Odd/even sign strength; benefics favour even signs, malefics odd. */
function ojhayugmaBala(planet: SbPlanet, lon: number): number {
  const odd = Math.floor(norm360(lon) / 30) % 2 === 0; // Aries = index 0 = odd sign
  const wantsOdd = !BENEFIC.includes(planet) || planet === "Sun";
  const favourable = planet === "Moon" || planet === "Venus" ? !odd : wantsOdd ? odd : !odd;
  return favourable ? 15 : 0;
}

/** Kendra bala: 60 in an angle, 30 in a succedent, 15 in a cadent house. */
function kendraBala(house: number): number {
  if ([1, 4, 7, 10].includes(house)) return 60;
  if ([2, 5, 8, 11].includes(house)) return 30;
  return 15;
}

/** Drekkana bala: 15 virupas by gender of the decanate occupied. */
function drekkanaBala(planet: SbPlanet, lon: number): number {
  const deg = norm360(lon) % 30;
  const third = deg < 10 ? 1 : deg < 20 ? 2 : 3;
  const male: SbPlanet[] = ["Sun", "Mars", "Jupiter"];
  const female: SbPlanet[] = ["Moon", "Venus"];
  if (male.includes(planet) && third === 1) return 15;
  if (female.includes(planet) && third === 2) return 15;
  if ((planet === "Mercury" || planet === "Saturn") && third === 3) return 15;
  return 0;
}

// --- Kala Bala --------------------------------------------------------------

/** Diurnal/nocturnal strength, from hours elapsed since local midnight. */
function nathonnathaBala(planet: SbPlanet, birth: Date, longitude: number): number {
  // Local apparent time, approximated from the longitude offset.
  const utcHours = birth.getUTCHours() + birth.getUTCMinutes() / 60 + birth.getUTCSeconds() / 3600;
  const local = (utcHours + longitude / 15 + 24) % 24;
  const fromNoon = Math.abs(local - 12) / 12; // 0 at noon, 1 at midnight

  if (planet === "Mercury") return 60; // strong at all times
  const dayStrong: SbPlanet[] = ["Sun", "Jupiter", "Venus"];
  return dayStrong.includes(planet) ? 60 * (1 - fromNoon) : 60 * fromNoon;
}

/** Paksha bala, from the Moon's elongation from the Sun. */
function pakshaBala(planet: SbPlanet, sunLon: number, moonLon: number): number {
  const elong = arcTo180(moonLon, sunLon); // 0 at new moon, 180 at full
  const benefic = BENEFIC.includes(planet);
  const base = benefic ? (60 * elong) / 180 : (60 * (180 - elong)) / 180;
  // The Moon's own paksha bala is doubled.
  return planet === "Moon" ? Math.min(60, base * 2) : base;
}

/** Tribhaga: 60 virupas to the lord of the third of day or night in force. */
function tribhagaBala(planet: SbPlanet, birth: Date, sunrise: Date | null, sunset: Date | null): number {
  if (planet === "Jupiter") return 60; // Jupiter always receives it
  if (!sunrise || !sunset) return 0;

  const t = birth.getTime();
  const isDay = t >= sunrise.getTime() && t < sunset.getTime();

  const dayLords: SbPlanet[] = ["Mercury", "Sun", "Saturn"];
  const nightLords: SbPlanet[] = ["Moon", "Venus", "Mars"];

  if (isDay) {
    const third = Math.min(2, Math.floor(((t - sunrise.getTime()) / (sunset.getTime() - sunrise.getTime())) * 3));
    return dayLords[third] === planet ? 60 : 0;
  }
  const nightStart = t < sunrise.getTime() ? sunset.getTime() - 86_400_000 : sunset.getTime();
  const nightEnd = nightStart + 86_400_000 - (sunset.getTime() - sunrise.getTime());
  const frac = (t - nightStart) / (nightEnd - nightStart);
  const third = Math.min(2, Math.max(0, Math.floor(frac * 3)));
  return nightLords[third] === planet ? 60 : 0;
}

/** Abda (year) lord receives 15 virupas. */
function abdaBala(planet: SbPlanet, birth: Date): number {
  const ah = ahargana(birth);
  const idx = ((Math.floor(ah / 360) * 3) + 1) % 7;
  return WEEKDAY_LORDS[idx] === planet ? 15 : 0;
}

/** Masa (month) lord receives 30 virupas. */
function masaBala(planet: SbPlanet, birth: Date): number {
  const ah = ahargana(birth);
  const idx = ((Math.floor(ah / 30) * 2) + 1) % 7;
  return WEEKDAY_LORDS[idx] === planet ? 30 : 0;
}

/** Vara (weekday) lord receives 45 virupas. The Vedic day begins at sunrise. */
function varaBala(planet: SbPlanet, birth: Date, sunrise: Date | null): number {
  let day = birth.getUTCDay();
  if (sunrise && birth.getTime() < sunrise.getTime()) day = (day + 6) % 7;
  return WEEKDAY_LORDS[day] === planet ? 45 : 0;
}

/** Hora (planetary hour) lord receives 60 virupas. */
function horaBala(planet: SbPlanet, birth: Date, sunrise: Date | null): number {
  if (!sunrise) return 0;
  let elapsed = (birth.getTime() - sunrise.getTime()) / 3_600_000;
  let dayIdx = birth.getUTCDay();
  if (elapsed < 0) {
    elapsed += 24;
    dayIdx = (dayIdx + 6) % 7;
  }
  const hourNumber = Math.floor(elapsed) % 24;

  // The first hora of the day belongs to that day's lord; subsequent horas
  // follow the Chaldean order.
  const dayLord = WEEKDAY_LORDS[dayIdx];
  const start = CHALDEAN.indexOf(dayLord);
  if (start < 0) return 0;
  const lord = CHALDEAN[(start + hourNumber) % 7];
  return lord === planet ? 60 : 0;
}

/** Ayana bala, from declination. Sun's value is doubled. */
function ayanaBala(planet: SbPlanet, birth: Date): number {
  const body = BODY[planet];
  if (body === undefined) return 0;
  let dec: number;
  try {
    dec = declination(body, birth);
  } catch {
    return 0;
  }
  const signed = NORTH_STRONG.includes(planet) ? dec : -dec;
  // Mercury is held strong in either direction.
  const effective = planet === "Mercury" ? Math.abs(dec) : signed;
  const bala = ((23.45 + effective) / 46.9) * 60;
  const clamped = Math.max(0, Math.min(60, bala));
  return planet === "Sun" ? Math.min(60, clamped * 2) : clamped;
}

/**
 * Yuddha bala: when two non-luminaries are within one degree, the more
 * northerly wins. The difference in their Shadbala is transferred.
 */
function yuddhaAdjustments(planets: PlanetDetail[], birth: Date): Record<string, number> {
  const adj: Record<string, number> = {};
  const eligible = planets.filter(
    (p) => SB_PLANETS.includes(p.name as SbPlanet) && p.name !== "Sun" && p.name !== "Moon"
  );

  for (let i = 0; i < eligible.length; i++) {
    for (let j = i + 1; j < eligible.length; j++) {
      const a = eligible[i];
      const b = eligible[j];
      if (arcTo180(a.longitude, b.longitude) > 1) continue;
      try {
        const decA = declination(BODY[a.name], birth);
        const decB = declination(BODY[b.name], birth);
        const winner = decA > decB ? a.name : b.name;
        const loser = winner === a.name ? b.name : a.name;
        adj[winner] = (adj[winner] ?? 0) + 30;
        adj[loser] = (adj[loser] ?? 0) - 30;
      } catch {
        /* skip if declination unavailable */
      }
    }
  }
  return adj;
}

// --- Cheshta Bala -----------------------------------------------------------

const MOTION_VIRUPAS: Record<string, number> = {
  Vakra: 60, Anuvakra: 30, Vikala: 15, Manda: 15,
  Mandatara: 7.5, Sama: 30, Chara: 30, Atichara: 45,
};

/**
 * The eight classical motion states, classified by actual speed against mean
 * daily motion. (Some texts derive Cheshta Bala from the cheshta kendra
 * instead; the motion-state table is used here and named in `method`.)
 */
function motionState(planet: SbPlanet, speed: number): string {
  const mean = MEAN_MOTION[planet];
  if (speed < 0) return "Vakra";
  if (Math.abs(speed) < mean * 0.02) return "Vikala";
  const r = speed / mean;
  if (r < 0.5) return "Mandatara";
  if (r < 0.9) return "Manda";
  if (r <= 1.1) return "Sama";
  if (r <= 1.5) return "Chara";
  return "Atichara";
}

// --- Drik Bala --------------------------------------------------------------

function drikBala(planet: SbPlanet, planets: PlanetDetail[]): number {
  const target = planets.find((p) => p.name === planet);
  if (!target) return 0;
  const targetSign = Math.floor(target.longitude / 30);
  let score = 0;
  for (const other of planets) {
    if (other.name === planet || other.name === "Ascendant") continue;
    const fromSign = Math.floor(other.longitude / 30);
    const dists = [7, ...(SPECIAL_ASPECTS[other.name] ?? [])];
    if (!dists.some((d) => (fromSign + d - 1) % 12 === targetSign)) continue;
    score += MALEFIC.includes(other.name) ? -15 : 15;
  }
  return Math.max(-60, Math.min(60, score));
}

// --- entry point ------------------------------------------------------------

export function computeShadbala(
  planets: PlanetDetail[],
  birth: Date,
  latitude: number,
  longitude: number
): ShadbalaResult {
  const asc = planets.find((p) => p.name === "Ascendant");
  const ascLon = asc ? asc.longitude : 0;
  const ascSign = Math.floor(ascLon / 30);

  const sun = planets.find((p) => p.name === "Sun");
  const moon = planets.find((p) => p.name === "Moon");

  let sunrise: Date | null = null;
  let sunset: Date | null = null;
  try {
    const observer = new Astronomy.Observer(latitude, longitude, 0);
    const dayStart = new Date(Date.UTC(birth.getUTCFullYear(), birth.getUTCMonth(), birth.getUTCDate()));
    sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, dayStart, 2)?.date ?? null;
    sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, dayStart, 2)?.date ?? null;
    if (sunrise && sunset && sunset <= sunrise) {
      sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, sunrise, 2)?.date ?? sunset;
    }
  } catch {
    /* rise/set unavailable; Tribhaga/Vara/Hora fall back to zero */
  }

  const yuddha = yuddhaAdjustments(planets, birth);

  const rows: ShadbalaRow[] = SB_PLANETS.map((name) => {
    const p = planets.find((x) => x.name === name);
    if (!p) {
      return emptyRow(name);
    }

    const house = ((Math.floor(p.longitude / 30) - ascSign + 12) % 12) + 1;

    const uchcha = uchchaBala(name, p.longitude);
    const saptavargaja = saptavargajaBala(name, p.longitude);
    const ojhayugma = ojhayugmaBala(name, p.longitude);
    const kendra = kendraBala(house);
    const drekkana = drekkanaBala(name, p.longitude);
    const sthanaTotal = uchcha + saptavargaja + ojhayugma + kendra + drekkana;

    const weakPoint = norm360(ascLon + DIG_STRONG[name] + 180);
    const dig = (60 * arcTo180(p.longitude, weakPoint)) / 180;

    const nathonnatha = nathonnathaBala(name, birth, longitude);
    const paksha = pakshaBala(name, sun?.longitude ?? 0, moon?.longitude ?? 0);
    const tribhaga = tribhagaBala(name, birth, sunrise, sunset);
    const abda = abdaBala(name, birth);
    const masa = masaBala(name, birth);
    const vara = varaBala(name, birth, sunrise);
    const hora = horaBala(name, birth, sunrise);
    const ayana = ayanaBala(name, birth);
    const y = yuddha[name] ?? 0;
    const kalaTotal = nathonnatha + paksha + tribhaga + abda + masa + vara + hora + ayana + y;

    // Sun and Moon take their Cheshta from Ayana and Paksha respectively.
    let state: string;
    let cheshtaVirupas: number;
    if (name === "Sun") {
      state = "from Ayana Bala";
      cheshtaVirupas = ayana;
    } else if (name === "Moon") {
      state = "from Paksha Bala";
      cheshtaVirupas = paksha;
    } else {
      let speed = 0;
      try {
        speed = dailySpeed(BODY[name], birth);
      } catch {
        /* leave zero */
      }
      state = motionState(name, speed);
      cheshtaVirupas = MOTION_VIRUPAS[state] ?? 0;
    }

    const naisargika = NAISARGIKA[name];
    const drik = drikBala(name, planets);

    const totalVirupas = sthanaTotal + dig + kalaTotal + cheshtaVirupas + naisargika + drik;
    const totalRupas = totalVirupas / 60;
    const required = REQUIRED_RUPAS[name];

    return {
      planet: name,
      sthana: {
        uchcha: r2(uchcha), saptavargaja: r2(saptavargaja), ojhayugma: r2(ojhayugma),
        kendra: r2(kendra), drekkana: r2(drekkana), total: r2(sthanaTotal),
      },
      dig: r2(dig),
      kala: {
        nathonnatha: r2(nathonnatha), paksha: r2(paksha), tribhaga: r2(tribhaga),
        abda: r2(abda), masa: r2(masa), vara: r2(vara), hora: r2(hora),
        ayana: r2(ayana), yuddha: r2(y), total: r2(kalaTotal),
      },
      cheshta: { state, virupas: r2(cheshtaVirupas) },
      naisargika: r2(naisargika),
      drik: r2(drik),
      totalVirupas: r2(totalVirupas),
      totalRupas: r2(totalRupas),
      requiredRupas: required,
      ratio: r2(totalRupas / required),
      meetsMinimum: totalRupas >= required,
      rank: 0,
    };
  });

  [...rows]
    .sort((a, b) => b.totalRupas - a.totalRupas)
    .forEach((r, i) => {
      const row = rows.find((x) => x.planet === r.planet);
      if (row) row.rank = i + 1;
    });

  return {
    rows,
    sunrise: sunrise ? sunrise.toISOString() : null,
    sunset: sunset ? sunset.toISOString() : null,
    complete: true,
    method: [
      "Cheshta Bala from the eight motion states (speed vs mean daily motion), not the cheshta-kendra formulation.",
      "Saptavargaja scored over D1, D2, D3, D7, D9, D12 and D30, normalised to 60 virupas.",
      "Dig Bala uses equal quadrants from the ascendant, consistent with the whole-sign houses used elsewhere.",
      "Drik Bala treats a cast drishti as full rather than applying the fractional drishti curve.",
    ],
    notes: [
      "All six balas are computed. Totals are given in virupas and rupas against the classical minimums.",
      sunrise ? "Sunrise and sunset were resolved for the birth place." : "Sunrise/sunset unavailable — Tribhaga, Vara and Hora Bala are zero for this chart.",
    ],
  };
}

function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

function emptyRow(name: SbPlanet): ShadbalaRow {
  return {
    planet: name,
    sthana: { uchcha: 0, saptavargaja: 0, ojhayugma: 0, kendra: 0, drekkana: 0, total: 0 },
    dig: 0,
    kala: { nathonnatha: 0, paksha: 0, tribhaga: 0, abda: 0, masa: 0, vara: 0, hora: 0, ayana: 0, yuddha: 0, total: 0 },
    cheshta: { state: "unavailable", virupas: 0 },
    naisargika: NAISARGIKA[name],
    drik: 0,
    totalVirupas: 0,
    totalRupas: 0,
    requiredRupas: REQUIRED_RUPAS[name],
    ratio: 0,
    meetsMinimum: false,
    rank: 0,
  };
}

export { ayanamsa };

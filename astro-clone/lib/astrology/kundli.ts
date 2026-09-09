// Vedic birth-chart (Kundli) engine.
// Ported from the target site, which uses the open-source Astronomy Engine
// for real geocentric planetary positions, then applies a sidereal (Lahiri)
// layer for Vedic positions, ascendant, houses, divisional charts, dashas.

import * as Astronomy from "astronomy-engine";
import {
  ZODIAC_SIGNS,
  RASHI_LORDS,
  NAKSHATRAS,
  DASHA_ORDER,
  DASHA_YEARS,
  COMBUSTION_ORB,
  DIGNITY,
  DIVISIONAL_CHARTS,
  TITHIS,
  YOGAS,
  HINDU_MONTHS,
} from "./constants";

const DEG = Math.PI / 180;

export function norm360(x: number): number {
  let t = x % 360;
  if (t < 0) t += 360;
  return t;
}

// Lahiri-style ayanamsa (degrees). e = Julian centuries from J2000 (TT).
export function ayanamsa(T: number): number {
  return (
    23.85709222 +
    1.3962944 * T +
    (-17.2 * Math.sin((125.04452 - 1934.136261 * T) * DEG) -
      1.32 * Math.sin(2 * (280.4665 + 36000.7698 * T) * DEG)) /
      3600
  );
}

// Mean lunar node longitude (tropical), e = Julian centuries from J2000.
function meanNode(T: number): number {
  return norm360(
    125.04452222 - 1934.1362608 * T + 0.0020708 * T * T + (T * T * T) / 450000
  );
}

const BODY: Record<string, Astronomy.Body> = {
  Sun: Astronomy.Body.Sun,
  Moon: Astronomy.Body.Moon,
  Mercury: Astronomy.Body.Mercury,
  Venus: Astronomy.Body.Venus,
  Mars: Astronomy.Body.Mars,
  Jupiter: Astronomy.Body.Jupiter,
  Saturn: Astronomy.Body.Saturn,
};

// Apparent geocentric true-ecliptic-of-date longitude (tropical).
function eclipticLongitude(body: Astronomy.Body, time: Astronomy.AstroTime): number {
  const vec = Astronomy.GeoVector(body, time, true);
  return Astronomy.Ecliptic(vec).elon;
}

// Retrograde test: longitude decreasing over the prior hour.
function isRetrograde(body: Astronomy.Body, time: Astronomy.AstroTime, date: Date): boolean {
  const prev = Astronomy.MakeTime(new Date(date.getTime() - 3.6e6));
  let diff = eclipticLongitude(body, time) - eclipticLongitude(body, prev);
  if (diff < -180) diff += 360;
  if (diff > 180) diff -= 360;
  return diff < 0;
}

// KP nakshatra sub-lord for a sidereal longitude.
function subLord(longitude: number, nakLord: string): string {
  const span = 360 / 27;
  const within = longitude % span;
  const startIdx = DASHA_ORDER.indexOf(nakLord as (typeof DASHA_ORDER)[number]);
  let acc = 0;
  let result = nakLord;
  for (let i = 0; i < 9; i++) {
    const lord = DASHA_ORDER[(startIdx + i) % 9];
    const portion = (DASHA_YEARS[lord] / 120) * span;
    if (within < acc + portion) {
      result = lord;
      break;
    }
    acc += portion;
  }
  return result;
}

// Divisional chart sign index for a given divisor and sidereal longitude.
function divisionalSign(div: number, longitude: number): number {
  const r = Math.floor(longitude / 30);
  const a = longitude % 30;
  const n = Math.floor((a * div) / 30);
  const even = r % 2 === 0;
  const mod3 = r % 3 === 0;
  const mod3is1 = r % 3 === 1;
  const mod4 = r % 4;
  switch (div) {
    case 1:
    default:
      return r;
    case 2:
      return even ? (n === 0 ? 4 : 3) : n === 0 ? 3 : 4;
    case 3:
      return (r + 4 * n) % 12;
    case 4:
      return (r + 3 * n) % 12;
    case 5:
    case 6:
    case 40:
      return even ? (0 + n) % 12 : (6 + n) % 12;
    case 7:
      return even ? (r + n) % 12 : (r + 6 + n) % 12;
    case 8:
    case 20:
      return mod3 ? (0 + n) % 12 : mod3is1 ? (8 + n) % 12 : (4 + n) % 12;
    case 9:
      return mod3 ? (r + n) % 12 : mod3is1 ? (r + 8 + n) % 12 : (r + 4 + n) % 12;
    case 10:
      return even ? (r + n) % 12 : (r + 8 + n) % 12;
    case 11:
      return (11 * r + n) % 12;
    case 12:
    case 60:
      return (r + n) % 12;
    case 16:
    case 45:
      return mod3 ? (0 + n) % 12 : mod3is1 ? (4 + n) % 12 : (8 + n) % 12;
    case 24:
      return even ? (4 + n) % 12 : (3 + n) % 12;
    case 27:
      return mod4 === 0
        ? (0 + n) % 12
        : mod4 === 1
        ? (3 + n) % 12
        : mod4 === 2
        ? (6 + n) % 12
        : (9 + n) % 12;
    case 30:
      if (even) {
        if (a < 5) return 0;
        if (a < 10) return 10;
        if (a < 18) return 8;
        if (a < 25) return 2;
        return 6;
      }
      if (a < 5) return 1;
      if (a < 12) return 5;
      if (a < 20) return 11;
      if (a < 25) return 9;
      return 7;
  }
}

// Add fractional Vedic years (using the tropical-year length used by the site).
function addYears(date: Date, years: number): Date {
  return new Date(date.getTime() + 365.2425 * years * 8.64e7);
}

function formatDegree(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  return `${String(d).padStart(2, "0")}° ${String(m).padStart(2, "0")}'`;
}

export interface PlanetDetail {
  name: string;
  longitude: number;
  rashi: string;
  degreeInRashi: number;
  formatted: string;
  rashiLord: string;
  nakshatra: string;
  nakshatraLord: string;
  nakshatraSubLord: string;
  pada: number;
  isRetro: boolean;
  isCombust: boolean;
  dignity: "normal" | "exalted" | "debilitated";
}

export interface House {
  houseNumber: number;
  sign: string;
  planets: string[];
}

export interface DashaPeriod {
  planet: string;
  startDate: string;
  endDate: string;
  level: number;
  subPeriods: DashaPeriod[];
}

export interface DivisionalChart {
  id: string;
  name: string;
  ascendant: string;
  houses: House[];
}

export interface BirthChart {
  ascendant: string;
  moonSign: string;
  nakshatra: string;
  houses: House[];
  planetaryDetails: PlanetDetail[];
  divisionalCharts: Record<string, DivisionalChart>;
  dashas: DashaPeriod[];
  birthDate: Date;
}

export interface BirthInput {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  latitude: number;
  longitude: number;
  tzOffset?: string; // e.g. "+05:30"
}

export function calculateBirthChart(input: BirthInput): BirthChart {
  const { date, time, latitude, longitude } = input;
  const tz = input.tzOffset && /^[+-]\d{2}:\d{2}$/.test(input.tzOffset) ? input.tzOffset : "Z";
  const iso = `${date}T${time}:00${tz}`;
  const parsed = new Date(iso);
  const birthDate = isNaN(parsed.getTime()) ? new Date() : parsed;

  const time0 = Astronomy.MakeTime(birthDate);
  const T = time0.tt / 36525;
  const ayan = ayanamsa(T);

  // Raw planet longitudes (sidereal).
  const raw: { name: string; longitude: number; isRetro: boolean }[] = [];
  for (const name of Object.keys(BODY)) {
    const lon = norm360(eclipticLongitude(BODY[name], time0) - ayan);
    raw.push({ name, longitude: lon, isRetro: isRetrograde(BODY[name], time0, birthDate) });
  }
  const rahu = norm360(meanNode(T) - ayan);
  raw.push({ name: "Rahu", longitude: rahu, isRetro: true });
  raw.push({ name: "Ketu", longitude: norm360(rahu + 180), isRetro: true });

  const sunLon = raw.find((p) => p.name === "Sun")?.longitude ?? 0;

  // Ascendant (sidereal).
  const ascLon = computeAscendant(birthDate, latitude, longitude, ayan, T);

  const planetaryDetails: PlanetDetail[] = raw.map((p) => {
    const lon = norm360(p.longitude);
    const signIdx = Math.floor(lon / 30);
    const degInSign = lon % 30;
    const nakIdx = Math.floor(lon / (360 / 27));
    let dignity: PlanetDetail["dignity"] = "normal";
    const dig = DIGNITY[p.name];
    if (dig) {
      if (dig.ex === signIdx) dignity = "exalted";
      else if (dig.deb === signIdx) dignity = "debilitated";
    }
    const nakLord = DASHA_ORDER[nakIdx % 9];
    return {
      name: p.name,
      longitude: lon,
      rashi: ZODIAC_SIGNS[signIdx],
      degreeInRashi: degInSign,
      formatted: formatDegree(degInSign),
      rashiLord: RASHI_LORDS[signIdx],
      nakshatra: NAKSHATRAS[nakIdx],
      nakshatraLord: nakLord,
      nakshatraSubLord: subLord(lon, nakLord),
      pada: Math.floor((lon % (360 / 27)) / (360 / 108)) + 1,
      isRetro: p.isRetro,
      isCombust: combust(p.name, lon, sunLon),
      dignity,
    };
  });

  // Ascendant detail prepended.
  const ascSignIdx = Math.floor(ascLon / 30);
  const ascNakIdx = Math.floor(ascLon / (360 / 27));
  const ascNakLord = DASHA_ORDER[ascNakIdx % 9];
  const ascDetail: PlanetDetail = {
    name: "Ascendant",
    longitude: ascLon,
    rashi: ZODIAC_SIGNS[ascSignIdx],
    degreeInRashi: ascLon % 30,
    formatted: formatDegree(ascLon % 30),
    rashiLord: RASHI_LORDS[ascSignIdx],
    nakshatra: NAKSHATRAS[ascNakIdx],
    nakshatraLord: ascNakLord,
    nakshatraSubLord: subLord(ascLon, ascNakLord),
    pada: Math.floor((ascLon % (360 / 27)) / (360 / 108)) + 1,
    isRetro: false,
    isCombust: false,
    dignity: "normal",
  };
  planetaryDetails.unshift(ascDetail);

  // Whole-sign houses from the ascendant sign.
  const houses: House[] = [];
  for (let i = 0; i < 12; i++) {
    const signIdx = (ascSignIdx + i) % 12;
    const planets = raw
      .filter((p) => Math.floor(p.longitude / 30) === signIdx)
      .map((p) => p.name);
    houses.push({ houseNumber: i + 1, sign: ZODIAC_SIGNS[signIdx], planets });
  }

  // Divisional charts.
  const divisionalCharts: Record<string, DivisionalChart> = {};
  for (const chart of DIVISIONAL_CHARTS) {
    const ascSign = divisionalSign(chart.div, ascLon);
    const placed = raw.map((p) => ({
      name: p.name,
      signIndex: divisionalSign(chart.div, p.longitude),
    }));
    const dHouses: House[] = [];
    for (let i = 0; i < 12; i++) {
      const signIdx = (ascSign + i) % 12;
      dHouses.push({
        houseNumber: i + 1,
        sign: ZODIAC_SIGNS[signIdx],
        planets: placed.filter((p) => p.signIndex === signIdx).map((p) => p.name),
      });
    }
    divisionalCharts[chart.id] = {
      id: chart.id,
      name: chart.name,
      ascendant: ZODIAC_SIGNS[ascSign],
      houses: dHouses,
    };
  }

  // Vimshottari dasha from the Moon's nakshatra fraction.
  const moon = planetaryDetails.find((p) => p.name === "Moon");
  const dashas = moon ? computeVimshottari(moon.longitude, birthDate) : [];

  const moonDetail = planetaryDetails.find((p) => p.name === "Moon");
  return {
    ascendant: ascDetail.rashi,
    moonSign: moonDetail ? moonDetail.rashi : "",
    nakshatra: moonDetail ? moonDetail.nakshatra : "",
    houses,
    planetaryDetails,
    divisionalCharts,
    dashas,
    birthDate,
  };
}

// ---- Panchang (almanac) ----
export interface PanchangInfo {
  sunrise: string;
  sunset: string;
  tithi: string;
  tithiEnd: string;
  nakshatra: string;
  nakshatraEnd: string;
  yoga: string;
  yogaEnd: string;
  karana: string;
  karanaEnd: string;
  paksha: string;
  dayLord: string;
  amantaMonth: string;
  purnimantaMonth: string;
  moonSign: string;
  sunSign: string;
  vikramSamvat: number;
}

function siderealSunMoon(date: Date): { sl: number; ml: number } {
  const t = Astronomy.MakeTime(date);
  const ay = ayanamsa(t.tt / 36525);
  return {
    sl: norm360(eclipticLongitude(Astronomy.Body.Sun, t) - ay),
    ml: norm360(eclipticLongitude(Astronomy.Body.Moon, t) - ay),
  };
}

// Find the next time the integer-valued fn changes from `cur` (48h window, binary refine).
function findChange(start: Date, fn: (d: Date) => number, cur: number): Date {
  let a = new Date(start.getTime());
  for (let i = 0; i < 96; i++) {
    a = new Date(a.getTime() + 18e5); // +30 min
    if (fn(a) !== cur) {
      let lo = a.getTime() - 18e5;
      let hi = a.getTime();
      while (hi - lo > 6e4) {
        const mid = Math.floor((lo + hi) / 2);
        if (fn(new Date(mid)) === cur) lo = mid;
        else hi = mid;
      }
      return new Date(hi);
    }
  }
  return new Date(start.getTime() + 864e5);
}

function fmtTime(t: Astronomy.AstroTime | Date | null): string {
  if (!t) return "--:--";
  const d = t instanceof Date ? t : t.date;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function getPanchangInfo(date: Date, lat: number, lon: number): PanchangInfo {
  const d0 = isNaN(date.getTime()) ? new Date() : date;
  const observer = new Astronomy.Observer(lat, lon, 0);
  const sunrise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, 1, d0, 1);
  const sunset = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, d0, 1);
  const { sl: sunLon, ml: moonLon } = siderealSunMoon(d0);
  const sunRashi = Math.floor(sunLon / 30);
  const moonRashi = Math.floor(moonLon / 30);

  // Tithi
  const tithiFn = (e: Date) => { const { sl, ml } = siderealSunMoon(e); let a = ml - sl; if (a < 0) a += 360; return Math.floor(a / 12); };
  const tIdx = tithiFn(d0);
  const tEnd = findChange(d0, tithiFn, tIdx);
  const S = tIdx + 1;
  const tithi = TITHIS[S - 1] || "Unknown";
  const paksha = S <= 15 ? "Shukla" : "Krishna";

  // Yoga
  const yogaFn = (e: Date) => { const { sl, ml } = siderealSunMoon(e); return Math.floor((ml + sl) / (360 / 27)) % 27; };
  const yIdx = yogaFn(d0);
  const yEnd = findChange(d0, yogaFn, yIdx);

  // Nakshatra
  const nakFn = (e: Date) => { const { ml } = siderealSunMoon(e); return Math.floor(ml / (360 / 27)); };
  const nIdx = nakFn(d0);
  const nEnd = findChange(d0, nakFn, nIdx);

  // Karana
  const karanaFn = (e: Date) => { const { sl, ml } = siderealSunMoon(e); let a = ml - sl; if (a < 0) a += 360; return Math.floor(a / 6); };
  const kIdx = karanaFn(d0);
  const kEnd = findChange(d0, karanaFn, kIdx);
  const V = kIdx + 1;
  let karana = "";
  if (V === 1) karana = "Kimstughna";
  else if (V >= 58) { if (V === 58) karana = "Shakuni"; if (V === 59) karana = "Chatushpada"; if (V === 60) karana = "Naga"; }
  else karana = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti"][(V - 2) % 7];

  const dayLord = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d0.getDay()];
  const E = (sunRashi + 1) % 12;

  return {
    sunrise: fmtTime(sunrise),
    sunset: fmtTime(sunset),
    tithi,
    tithiEnd: fmtTime(tEnd),
    nakshatra: NAKSHATRAS[nIdx],
    nakshatraEnd: fmtTime(nEnd),
    yoga: YOGAS[yIdx],
    yogaEnd: fmtTime(yEnd),
    karana,
    karanaEnd: fmtTime(kEnd),
    paksha,
    dayLord,
    amantaMonth: HINDU_MONTHS[E],
    purnimantaMonth: HINDU_MONTHS[paksha === "Krishna" ? (E + 1) % 12 : E],
    moonSign: ZODIAC_SIGNS[moonRashi],
    sunSign: ZODIAC_SIGNS[sunRashi],
    vikramSamvat: d0.getFullYear() + 57,
  };
}

export interface DashaBasis {
  moonLongitude: number;
  nakshatra: string;
  nakshatraLord: string;
  percentRemaining: number;
  balanceYears: number;
}

// Nakshatra dasha basis for the Moon's sidereal longitude.
export function getDashaBasis(moonLongitude: number): DashaBasis {
  const span = 360 / 27;
  const pos = moonLongitude / span;
  const nakIdx = Math.floor(pos);
  const lord = DASHA_ORDER[nakIdx % 9];
  const elapsedFraction = pos - nakIdx;
  const remaining = 1 - elapsedFraction;
  return {
    moonLongitude,
    nakshatra: NAKSHATRAS[nakIdx],
    nakshatraLord: lord,
    percentRemaining: remaining * 100,
    balanceYears: DASHA_YEARS[lord] * remaining,
  };
}

function combust(name: string, lon: number, sunLon: number): boolean {
  if (["Sun", "Moon", "Rahu", "Ketu"].includes(name)) return false;
  const orb = COMBUSTION_ORB[name];
  if (!orb) return false;
  let diff = Math.abs(lon - sunLon);
  if (diff > 180) diff = 360 - diff;
  return diff <= orb;
}

function computeAscendant(
  date: Date,
  lat: number,
  lon: number,
  ayan: number,
  T: number
): number {
  const time = Astronomy.MakeTime(date);
  const gast = Astronomy.SiderealTime(time); // GAST in hours
  const lstDeg = norm360(15 * (gast + lon / 15));
  const s = lstDeg * DEG;
  const obl = DEG * (23.4392911 - 0.0130042 * T - 1.6e-7 * T * T);
  const asc = norm360(
    (180 / Math.PI) *
      Math.atan2(
        Math.cos(s),
        -(Math.sin(s) * Math.cos(obl)) - Math.tan(lat * DEG) * Math.sin(obl)
      )
  );
  return norm360(asc - ayan);
}

function computeVimshottari(moonLon: number, birthDate: Date): DashaPeriod[] {
  const span = 360 / 27;
  const pos = moonLon / span;
  const nakIdx = Math.floor(pos);
  const lord = DASHA_ORDER[nakIdx % 9];
  const total = DASHA_YEARS[lord];
  const elapsedFraction = pos - nakIdx;
  // Balance of the current mahadasha at birth.
  let cursor = addYears(birthDate, -(total - total * (1 - elapsedFraction)));
  const periods: DashaPeriod[] = [];
  let lordIdx = DASHA_ORDER.indexOf(lord);
  for (let i = 0; i < 9; i++) {
    const p = DASHA_ORDER[lordIdx];
    const years = DASHA_YEARS[p];
    const end = addYears(cursor, years);
    periods.push({
      planet: p,
      startDate: cursor.toISOString(),
      endDate: end.toISOString(),
      level: 1,
      subPeriods: buildSubPeriods(p, cursor, years, 2),
    });
    cursor = end;
    lordIdx = (lordIdx + 1) % 9;
  }
  return periods;
}

function buildSubPeriods(
  lord: string,
  start: Date,
  totalYears: number,
  level: number
): DashaPeriod[] {
  if (level > 3) return [];
  const out: DashaPeriod[] = [];
  let cursor = new Date(start);
  let idx = DASHA_ORDER.indexOf(lord as (typeof DASHA_ORDER)[number]);
  for (let i = 0; i < 9; i++) {
    const p = DASHA_ORDER[idx];
    const years = (totalYears * DASHA_YEARS[p]) / 120;
    const end = addYears(cursor, years);
    out.push({
      planet: p,
      startDate: cursor.toISOString(),
      endDate: end.toISOString(),
      level,
      subPeriods: level < 3 ? buildSubPeriods(p, cursor, years, level + 1) : [],
    });
    cursor = end;
    idx = (idx + 1) % 9;
  }
  return out;
}

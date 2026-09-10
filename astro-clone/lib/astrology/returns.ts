// Planetary returns — when a transiting body comes back to its natal
// longitude. Found by scanning forward and bisecting, so the dates are real
// rather than the usual "Saturn return at 29" approximation.

import * as Astronomy from "astronomy-engine";
import { ayanamsa, norm360, BirthChart } from "./kundli";

export interface PlanetaryReturn {
  planet: string;
  type: string;
  ordinal: number;
  exactDate: string;
  ageAtReturn: number;
  note: string;
}

const BODIES: Record<string, Astronomy.Body> = {
  Sun: Astronomy.Body.Sun,
  Moon: Astronomy.Body.Moon,
  Jupiter: Astronomy.Body.Jupiter,
  Saturn: Astronomy.Body.Saturn,
};

/** Approximate orbital period in days, used to size the scan step. */
const PERIOD_DAYS: Record<string, number> = {
  Sun: 365.25,
  Moon: 27.32,
  Jupiter: 4332.6,
  Saturn: 10759.2,
};

function siderealLongitude(body: Astronomy.Body, when: Date): number {
  const t = Astronomy.MakeTime(when);
  const T = t.tt / 36525;
  const vec = Astronomy.GeoVector(body, t, true);
  return norm360(Astronomy.Ecliptic(vec).elon - ayanamsa(T));
}

/** Signed angular difference in (-180, 180]. */
function diff(a: number, b: number): number {
  let d = norm360(a) - norm360(b);
  if (d > 180) d -= 360;
  if (d <= -180) d += 360;
  return d;
}

/**
 * Scan forward in coarse steps for a sign change in the offset from the natal
 * longitude, then bisect to pin the crossing to within an hour.
 */
function findReturn(
  body: Astronomy.Body,
  natalLon: number,
  from: Date,
  periodDays: number,
  limitDays: number
): Date | null {
  const step = Math.max(1, periodDays / 40);
  let prev = from;
  let prevDiff = diff(siderealLongitude(body, prev), natalLon);

  for (let elapsed = step; elapsed <= limitDays; elapsed += step) {
    const cur = new Date(from.getTime() + elapsed * 86_400_000);
    const curDiff = diff(siderealLongitude(body, cur), natalLon);

    // A crossing shows as a sign flip that is not the -180/+180 wrap.
    if (prevDiff < 0 && curDiff >= 0 && Math.abs(curDiff - prevDiff) < 180) {
      let lo = prev;
      let hi = cur;
      for (let i = 0; i < 40; i++) {
        const mid = new Date((lo.getTime() + hi.getTime()) / 2);
        const d = diff(siderealLongitude(body, mid), natalLon);
        if (d < 0) lo = mid;
        else hi = mid;
        if (hi.getTime() - lo.getTime() < 3_600_000) break;
      }
      return hi;
    }
    prev = cur;
    prevDiff = curDiff;
  }
  return null;
}

const NOTES: Record<string, string> = {
  Saturn: "Traditionally read as a period of consolidation and reckoning with responsibility.",
  Jupiter: "Traditionally read as a renewal of growth and opportunity.",
  Sun: "The solar return marks the astrological birthday and is used to cast the year's chart.",
  Moon: "The lunar return recurs roughly monthly and is read for the emotional tone of the month.",
};

export function computeReturns(
  chart: BirthChart,
  opts: { from?: Date; horizonYears?: number } = {}
): PlanetaryReturn[] {
  const from = opts.from ?? new Date();
  const horizon = (opts.horizonYears ?? 40) * 365.25;
  const out: PlanetaryReturn[] = [];

  for (const [name, body] of Object.entries(BODIES)) {
    const natal = chart.planetaryDetails.find((p) => p.name === name);
    if (!natal) continue;

    // Slow planets return rarely; find the next couple. The Moon returns
    // monthly, so one is enough to be useful.
    const wanted = name === "Moon" ? 1 : name === "Sun" ? 1 : 2;
    let cursor = from;

    for (let n = 0; n < wanted; n++) {
      const hit = findReturn(body, natal.longitude, cursor, PERIOD_DAYS[name], horizon);
      if (!hit) break;

      const ageAtReturn =
        (hit.getTime() - chart.birthDate.getTime()) / (365.2425 * 86_400_000);

      // Which return this is, counted from birth.
      const ordinal = Math.max(1, Math.round(ageAtReturn / (PERIOD_DAYS[name] / 365.2425)));

      out.push({
        planet: name,
        type: name === "Sun" ? "Solar return" : name === "Moon" ? "Lunar return" : `${name} return`,
        ordinal,
        exactDate: hit.toISOString().slice(0, 10),
        ageAtReturn: +ageAtReturn.toFixed(1),
        note: NOTES[name] ?? "",
      });

      cursor = new Date(hit.getTime() + PERIOD_DAYS[name] * 0.5 * 86_400_000);
    }
  }

  return out.sort((a, b) => a.exactDate.localeCompare(b.exactDate));
}

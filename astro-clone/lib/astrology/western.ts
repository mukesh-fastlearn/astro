// Western (tropical) aspect layer, kept entirely separate from Parashari
// drishti — the two systems disagree about what an aspect even is, so mixing
// them would produce nonsense.
//
// The engine works sidereal, so tropical longitude is recovered by adding the
// ayanamsa back before measuring angles.

import * as Astronomy from "astronomy-engine";
import { ayanamsa, norm360, BirthChart, PlanetDetail } from "./kundli";

export interface WesternAspect {
  planetA: string;
  planetB: string;
  type: string;
  exactAngle: number;
  actualAngle: number;
  orb: number;
  applying: boolean;
  /** 1 at exact, falling to 0 at the orb limit. */
  strength: number;
}

export interface WesternChartLayer {
  zodiac: "tropical";
  ayanamsaApplied: number;
  positions: { planet: string; tropicalLongitude: number; sign: string; degree: number }[];
  aspects: WesternAspect[];
  note: string;
}

const TROPICAL_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

/** Aspect definitions with the orb allowed for each. */
export const ASPECT_TYPES = [
  { name: "Conjunction", angle: 0, orb: 8 },
  { name: "Opposition", angle: 180, orb: 8 },
  { name: "Trine", angle: 120, orb: 7 },
  { name: "Square", angle: 90, orb: 7 },
  { name: "Sextile", angle: 60, orb: 5 },
  { name: "Quincunx", angle: 150, orb: 3 },
  { name: "Semi-sextile", angle: 30, orb: 2 },
  { name: "Semi-square", angle: 45, orb: 2 },
  { name: "Sesquiquadrate", angle: 135, orb: 2 },
];

const BODIES: Record<string, Astronomy.Body> = {
  Sun: Astronomy.Body.Sun,
  Moon: Astronomy.Body.Moon,
  Mercury: Astronomy.Body.Mercury,
  Venus: Astronomy.Body.Venus,
  Mars: Astronomy.Body.Mars,
  Jupiter: Astronomy.Body.Jupiter,
  Saturn: Astronomy.Body.Saturn,
};

/** Separation between two longitudes, 0..180. */
function separation(a: number, b: number): number {
  const d = Math.abs(norm360(a) - norm360(b)) % 360;
  return d > 180 ? 360 - d : d;
}

/**
 * Daily motion, by finite difference either side of the moment. Needed to tell
 * an applying aspect from a separating one, which the natal chart does not
 * otherwise record.
 */
function dailySpeed(body: Astronomy.Body, when: Date): number {
  const step = 0.5; // days
  const before = new Date(when.getTime() - step * 43_200_000);
  const after = new Date(when.getTime() + step * 43_200_000);
  try {
    const lonAt = (d: Date) => {
      const t = Astronomy.MakeTime(d);
      const vec = Astronomy.GeoVector(body, t, true);
      return Astronomy.Ecliptic(vec).elon;
    };
    let delta = lonAt(after) - lonAt(before);
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    return delta / (2 * step);
  } catch {
    return 0;
  }
}

export function computeWesternLayer(chart: BirthChart): WesternChartLayer {
  const time = Astronomy.MakeTime(chart.birthDate);
  const T = time.tt / 36525;
  const ayan = ayanamsa(T);

  const real = chart.planetaryDetails.filter(
    (p: PlanetDetail) => p.name !== "Ascendant" && p.name !== "Rahu" && p.name !== "Ketu"
  );

  const positions = real.map((p) => {
    const tropical = norm360(p.longitude + ayan);
    const signIdx = Math.floor(tropical / 30);
    return {
      planet: p.name,
      tropicalLongitude: +tropical.toFixed(4),
      sign: TROPICAL_SIGNS[signIdx],
      degree: +(tropical % 30).toFixed(2),
    };
  });

  const speeds: Record<string, number> = {};
  for (const p of positions) {
    const body = BODIES[p.planet];
    speeds[p.planet] = body !== undefined ? dailySpeed(body, chart.birthDate) : 0;
  }

  const aspects: WesternAspect[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const a = positions[i];
      const b = positions[j];
      const actual = separation(a.tropicalLongitude, b.tropicalLongitude);

      for (const t of ASPECT_TYPES) {
        const orb = Math.abs(actual - t.angle);
        if (orb > t.orb) continue;

        // Applying when the separation is closing toward exactness.
        const futureSep = separation(
          a.tropicalLongitude + (speeds[a.planet] ?? 0) * 0.1,
          b.tropicalLongitude + (speeds[b.planet] ?? 0) * 0.1
        );
        const applying = Math.abs(futureSep - t.angle) < orb;

        aspects.push({
          planetA: a.planet,
          planetB: b.planet,
          type: t.name,
          exactAngle: t.angle,
          actualAngle: +actual.toFixed(2),
          orb: +orb.toFixed(2),
          applying,
          strength: +(1 - orb / t.orb).toFixed(2),
        });
        break; // one aspect per pair — the tightest match wins
      }
    }
  }

  aspects.sort((x, y) => y.strength - x.strength);

  return {
    zodiac: "tropical",
    ayanamsaApplied: +ayan.toFixed(4),
    positions,
    aspects,
    note:
      "Western tropical layer. Angles are measured in the tropical zodiac and use orb-based aspects — a different system from the Vedic drishti shown elsewhere. The two should not be read together as if they agreed.",
  };
}

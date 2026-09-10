// Runs every analysis layer over a computed BirthChart and returns one object.
//
// Layer separation follows the intended architecture: the astronomy engine
// (kundli.ts) produces positions, these rule modules derive classical
// judgements deterministically, and only then does anything reach an LLM.

import { BirthChart } from "./kundli";
import { computeAspects, computeDignities, computeRelationships, aspectedHouses, AspectLink, PlanetDignity, RelationshipPair } from "./aspects";
import { detectYogas, DetectedYoga } from "./yogas";
import { computeAshtakavarga, sarvaByHouse, AshtakavargaResult } from "./ashtakavarga";
import { computeCharaKarakas, computeArudhaPadas, CharaKaraka, ArudhaPada } from "./jaimini";
import { computeStrength, StrengthResult } from "./strength";
import { computeTransits, computeSadeSati, computeDhaiya, TransitPosition, SadeSatiState, DhaiyaState } from "./transits";
import { computeLalKitab, LalKitabReading } from "./lalkitab";
import { recommendRemedies, RemedyRecommendation, HOUSE_SIGNIFICATIONS } from "./remedies";
import { computeAllAltDashas } from "./dashas-alt";
import { computeWesternLayer, WesternChartLayer } from "./western";
import { computeReturns, PlanetaryReturn } from "./returns";
import { computeMuhurta, MuhurtaDay } from "./muhurta";
import { RASHI_LORDS, ZODIAC_SIGNS } from "./constants";

export interface HouseAnalysis {
  house: number;
  sign: string;
  lord: string;
  lordPlacedInHouse: number;
  occupants: string[];
  aspectedBy: string[];
  significations: string[];
  sarvashtakavargaBindus: number;
}

export interface ChartAnalysis {
  dignities: PlanetDignity[];
  relationships: RelationshipPair[];
  aspects: AspectLink[];
  aspectedHouses: Record<string, number[]>;
  houses: HouseAnalysis[];
  yogas: DetectedYoga[];
  ashtakavarga: AshtakavargaResult;
  sarvaByHouse: { house: number; sign: string; bindus: number }[];
  strength: StrengthResult;
  charaKarakas: CharaKaraka[];
  arudhaPadas: ArudhaPada[];
  transits: TransitPosition[];
  sadeSati: SadeSatiState;
  dhaiya: DhaiyaState;
  lalKitab: LalKitabReading;
  remedies: RemedyRecommendation[];
  currentDashaLord: string | null;
  altDashas: ReturnType<typeof computeAllAltDashas> | null;
  western: WesternChartLayer | null;
  returns: PlanetaryReturn[];
  muhurta: MuhurtaDay | null;
}

const inclusive = (from: number, to: number) => ((to - from + 12) % 12) + 1;

/** Mahadasha lord active at `at`. */
function activeDashaLord(chart: BirthChart, at: Date): string | null {
  const hit = chart.dashas.find(
    (d) => new Date(d.startDate) <= at && at < new Date(d.endDate)
  );
  return hit ? hit.planet : null;
}

/**
 * Choose which planets remedies should focus on, from actual chart factors —
 * never from sun sign alone. Each pick carries the reason it was made so the
 * recommendation stays explainable.
 */
function pickFocusPlanets(
  dignities: PlanetDignity[],
  strength: StrengthResult,
  dashaLord: string | null
) {
  const focus: { planet: string; reasons: string[]; confidence: number }[] = [];

  if (dashaLord) {
    focus.push({
      planet: dashaLord,
      reasons: [`${dashaLord} is the running mahadasha lord, so its themes are active now`],
      confidence: 0.8,
    });
  }

  for (const d of dignities) {
    if (d.status === "debilitated") {
      focus.push({
        planet: d.planet,
        reasons: [`${d.planet} is debilitated in ${d.sign}`],
        confidence: 0.7,
      });
    }
  }

  // Weakest planet by the components we can actually compute.
  const weakest = [...strength.components].sort((a, b) => a.partialTotal - b.partialTotal)[0];
  if (weakest && !focus.some((f) => f.planet === weakest.planet)) {
    focus.push({
      planet: weakest.planet,
      reasons: [`${weakest.planet} scores lowest on the computed strength components`],
      confidence: 0.5,
    });
  }

  // De-duplicate, merging reasons.
  const merged = new Map<string, { planet: string; reasons: string[]; confidence: number }>();
  for (const f of focus) {
    const seen = merged.get(f.planet);
    if (seen) {
      seen.reasons.push(...f.reasons);
      seen.confidence = Math.max(seen.confidence, f.confidence);
    } else {
      merged.set(f.planet, { ...f });
    }
  }
  return [...merged.values()];
}

export function analyseChart(
  chart: BirthChart,
  at: Date = new Date(),
  place?: { latitude: number; longitude: number }
): ChartAnalysis {
  const planets = chart.planetaryDetails;
  const ascSign = chart.ascendant;
  const ascIdx = (ZODIAC_SIGNS as readonly string[]).indexOf(ascSign);

  const dignities = computeDignities(planets);
  const relationships = computeRelationships(planets);
  const aspects = computeAspects(planets);
  const aspHouses = aspectedHouses(planets, ascSign);
  const yogas = detectYogas(planets, ascSign);
  const ashtakavarga = computeAshtakavarga(planets);
  const savHouses = sarvaByHouse(ashtakavarga.sarva, ascSign);
  const strength = computeStrength(planets);
  const charaKarakas = computeCharaKarakas(planets, 7);
  const arudhaPadas = computeArudhaPadas(planets, chart.houses);
  const lalKitab = computeLalKitab(planets);

  // Transits touch the ephemeris again, so guard them — a failure here must
  // not take down the whole reading.
  let transits: TransitPosition[] = [];
  let sadeSati: SadeSatiState = {
    active: false, phase: 0, phaseName: "unavailable",
    natalMoonSign: chart.moonSign, saturnSign: "", note: "Transit data unavailable.",
  };
  let dhaiya: DhaiyaState = { active: false, saturnSign: "", note: "Transit data unavailable." };
  try {
    transits = computeTransits(chart, at);
    sadeSati = computeSadeSati(chart, at);
    dhaiya = computeDhaiya(chart, at);
  } catch {
    // keep the fallbacks above
  }

  const planetSign = new Map(
    planets.filter((p) => p.name !== "Ascendant").map((p) => [p.name, (ZODIAC_SIGNS as readonly string[]).indexOf(p.rashi)])
  );

  const houses: HouseAnalysis[] = chart.houses.map((h) => {
    const signIdx = (ZODIAC_SIGNS as readonly string[]).indexOf(h.sign);
    const lord = RASHI_LORDS[signIdx];
    const lordSign = planetSign.get(lord);
    return {
      house: h.houseNumber,
      sign: h.sign,
      lord,
      lordPlacedInHouse: lordSign === undefined ? 0 : inclusive(ascIdx, lordSign),
      occupants: h.planets,
      aspectedBy: Object.entries(aspHouses)
        .filter(([, hs]) => hs.includes(h.houseNumber))
        .map(([planet]) => planet),
      significations: HOUSE_SIGNIFICATIONS[h.houseNumber] || [],
      sarvashtakavargaBindus: savHouses.find((s) => s.house === h.houseNumber)?.bindus ?? 0,
    };
  });

  // These layers each re-enter the ephemeris, so each is isolated: one
  // failing must not take down the rest of the reading.
  let altDashas: ChartAnalysis["altDashas"] = null;
  try { altDashas = computeAllAltDashas(chart, at); } catch { /* optional layer */ }

  let western: WesternChartLayer | null = null;
  try { western = computeWesternLayer(chart); } catch { /* optional layer */ }

  let returns: PlanetaryReturn[] = [];
  try { returns = computeReturns(chart, { from: at }); } catch { /* optional layer */ }

  let muhurta: MuhurtaDay | null = null;
  if (place) {
    try { muhurta = computeMuhurta(at, place.latitude, place.longitude); } catch { /* optional layer */ }
  }

  const currentDashaLord = activeDashaLord(chart, at);
  const remedies = recommendRemedies({
    focusPlanets: pickFocusPlanets(dignities, strength, currentDashaLord),
  });

  return {
    dignities,
    relationships,
    aspects,
    aspectedHouses: aspHouses,
    houses,
    yogas,
    ashtakavarga,
    sarvaByHouse: savHouses,
    strength,
    charaKarakas,
    arudhaPadas,
    transits,
    sadeSati,
    dhaiya,
    lalKitab,
    remedies,
    currentDashaLord,
    altDashas,
    western,
    returns,
    muhurta,
  };
}

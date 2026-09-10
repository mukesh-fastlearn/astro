// Retrieval corpus — every knowledge module flattened into passages.
//
// The knowledge graph handles exact-named lookups ("Saturn's gemstone").
// This corpus exists for the questions the graph cannot answer, where the
// user's wording shares no token with the record — "I keep losing money" has
// to reach the 2nd-house and Lal Kitab passages on wealth. That is what the
// embeddings are for, and it is why the corpus is worth building now that
// Lal Kitab alone contributes 108 prose entries.

import { LAL_KITAB_HOUSE_READINGS } from "./lalkitab-houses";
import { LAL_KITAB_UPAY } from "./lalkitab";
import { PLANET_REMEDIES, HOUSE_SIGNIFICATIONS, RUDRAKSHA, GEMSTONE_FACTS } from "./remedies";
import { NAKSHATRAS, DIVISIONAL_CHARTS, ZODIAC_SIGNS, RASHI_LORDS } from "./constants";
import { NATURAL_RELATIONS, OWN_SIGNS, EXALT_DEGREE, MOOLATRIKONA } from "./aspects";

export interface Passage {
  id: string;
  /** Which module it came from, so retrieval can be filtered or attributed. */
  source: string;
  /** Whether this is classical rule, recorded tradition, or hard fact. */
  basis: "classical" | "traditional-association" | "gemological";
  text: string;
}

const VARGA_PURPOSE: Record<string, string> = {
  D1: "overall life, body, personality and the main life themes",
  D2: "wealth, resources and financial capacity",
  D3: "siblings, courage, effort and communication",
  D4: "property, home, fixed assets and fortune",
  D5: "fame and recognition",
  D6: "health and ailments",
  D7: "children, progeny and creativity",
  D8: "longevity and sudden events",
  D9: "marriage, dharma, partnership and the underlying strength of planets",
  D10: "career, profession, authority, status and achievement",
  D11: "gains and the fulfilment of desire",
  D12: "parents and ancestry",
  D16: "vehicles, comforts and conveyances",
  D20: "spiritual practice and devotion",
  D24: "education and learning",
  D27: "underlying strength and vitality",
  D30: "misfortune, vulnerability and hidden weakness",
  D40: "maternal lineage",
  D45: "paternal lineage and character",
  D60: "karma and subtle influences carried from the past",
};

export function buildCorpus(): Passage[] {
  const out: Passage[] = [];
  const add = (id: string, source: string, basis: Passage["basis"], text: string) =>
    out.push({ id, source, basis, text });

  // --- Lal Kitab planet-in-house: the largest block, 108 passages ----------
  for (const r of LAL_KITAB_HOUSE_READINGS) {
    add(
      `lk-house-${r.planet}-${r.house}`,
      "lal-kitab",
      "traditional-association",
      `Lal Kitab: ${r.planet} in the ${r.house}th house. ${r.effect} ` +
        `Traditional measures (upay): ${r.measures.join("; ")}. ` +
        `Traditionally avoided: ${r.avoid.join("; ")}. ` +
        `Note that Lal Kitab numbers houses from a fixed scheme where the 1st house is always Aries.`
    );
  }

  // --- Lal Kitab general upay ---------------------------------------------
  for (const [planet, kb] of Object.entries(LAL_KITAB_UPAY)) {
    add(
      `lk-general-${planet}`,
      "lal-kitab",
      "traditional-association",
      `Lal Kitab general remedies for ${planet}: ${kb.measures.join("; ")}. ` +
        `Traditionally avoided: ${kb.avoid.join("; ")}.`
    );
  }

  // --- Planet correspondences ---------------------------------------------
  for (const [planet, kb] of Object.entries(PLANET_REMEDIES)) {
    add(
      `planet-${planet}`,
      "remedies",
      "traditional-association",
      `${planet} (${kb.sanskrit}) signifies ${kb.domains.join(", ")}. ` +
        `Its traditional colours are ${kb.colours.join(", ")}; its metal is ${kb.metal}; ` +
        `its day is ${kb.day}; its direction is ${kb.direction}. ` +
        `The primary gemstone is ${kb.gemstone.primary}` +
        (kb.gemstone.alternates.length ? ` with alternates ${kb.gemstone.alternates.join(", ")}` : "") +
        `. Associated deities are ${kb.deities.join(", ")}. ` +
        `Beeja mantra: ${kb.beejaMantra}. ` +
        `Traditional donations: ${kb.donations.join(", ")}. ` +
        `Foods: ${kb.foods.join(", ")}. Flowers: ${kb.flowers.join(", ")}. ` +
        `Rudraksha: ${kb.rudrakshaMukhi.join(" or ")} mukhi. Yantra: ${kb.yantra}. ` +
        `Numbers: ${kb.numbers.join(", ")}.`
    );

    // Dignity as its own passage — a distinct kind of question.
    const own = (OWN_SIGNS[planet] ?? []).map((i) => ZODIAC_SIGNS[i]);
    const ex = EXALT_DEGREE[planet];
    const mt = MOOLATRIKONA[planet];
    const rel = NATURAL_RELATIONS[planet];
    if (ex || own.length) {
      add(
        `dignity-${planet}`,
        "dignity",
        "classical",
        `${planet} dignity: ` +
          (own.length ? `owns ${own.join(" and ")}. ` : "") +
          (ex ? `Exalted in ${ZODIAC_SIGNS[ex.sign]} at ${ex.degree} degrees, debilitated in ${ZODIAC_SIGNS[(ex.sign + 6) % 12]}. ` : "") +
          (mt ? `Moolatrikona in ${ZODIAC_SIGNS[mt.sign]} between ${mt.from} and ${mt.to} degrees. ` : "") +
          (rel ? `Natural friends: ${rel.friends.join(", ") || "none"}. Natural enemies: ${rel.enemies.join(", ") || "none"}.` : "")
      );
    }
  }

  // --- Houses --------------------------------------------------------------
  for (const [house, sig] of Object.entries(HOUSE_SIGNIFICATIONS)) {
    add(
      `house-${house}`,
      "houses",
      "classical",
      `The ${house}th house (bhava) governs ${sig.join(", ")}. ` +
        `Questions about ${sig.slice(0, 3).join(", ")} are read from this house, its lord, ` +
        `the planets occupying it and the planets aspecting it.`
    );
  }

  // --- Signs ---------------------------------------------------------------
  ZODIAC_SIGNS.forEach((sign, i) => {
    add(
      `sign-${sign}`,
      "signs",
      "classical",
      `${sign} is the ${i + 1}th sign of the zodiac, ruled by ${RASHI_LORDS[i]}. ` +
        `A planet placed here takes on ${RASHI_LORDS[i]}'s colouring, and ${RASHI_LORDS[i]} ` +
        `becomes its dispositor.`
    );
  });

  // --- Nakshatras ----------------------------------------------------------
  NAKSHATRAS.forEach((n, i) => {
    const start = (i * 360) / 27;
    add(
      `nakshatra-${n}`,
      "nakshatras",
      "classical",
      `${n} is nakshatra ${i + 1} of 27, spanning ${start.toFixed(2)} to ${(start + 360 / 27).toFixed(2)} degrees of the sidereal zodiac. ` +
        `It is divided into four padas. The Moon's nakshatra at birth sets the Vimshottari dasha sequence.`
    );
  });

  // --- Divisional charts ---------------------------------------------------
  for (const c of DIVISIONAL_CHARTS) {
    add(
      `varga-${c.id}`,
      "vargas",
      "classical",
      `The ${c.id} chart (${c.name}) divides each sign into ${c.div} parts and is read for ` +
        `${VARGA_PURPOSE[c.id] ?? "its specific significations"}. ` +
        `A planet strong in the ${c.id} supports the matters that chart governs, even when the ` +
        `rasi chart is mixed.`
    );
  }

  // --- Gemstones -----------------------------------------------------------
  for (const [name, g] of Object.entries(GEMSTONE_FACTS)) {
    add(
      `gem-${name}`,
      "gemstones",
      "gemological",
      `${g.name} is a ${g.colour} ${g.mineral} with a Mohs hardness of ${g.hardnessMohs}. ` +
        `These are gemological facts; its astrological assignment to a planet is separate and traditional.`
    );
  }

  // --- Rudraksha -----------------------------------------------------------
  for (const r of RUDRAKSHA) {
    add(
      `rudraksha-${r.mukhi}`,
      "rudraksha",
      "traditional-association",
      `${r.mukhi} mukhi rudraksha is traditionally associated with ${r.planet === "—" ? "no single graha" : r.planet} ` +
        `and with ${r.associations.join(", ")}. Mukhi-to-planet mapping differs between traditions.`
    );
  }

  return out;
}

export function corpusStats() {
  const c = buildCorpus();
  const bySource: Record<string, number> = {};
  for (const p of c) bySource[p.source] = (bySource[p.source] ?? 0) + 1;
  return { total: c.length, bySource };
}

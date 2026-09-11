// Question-aware context selection.
//
// The full analysis serialises to roughly 7,400 tokens, and it was being sent
// on every message regardless of what was asked — a marriage question shipped
// Shadbala, all 100 varga yogas and every Lal Kitab upay. This narrows the
// payload to the slices a given question actually needs.
//
// Deliberately rule-based rather than an LLM call: classifying the topic with
// a model would cost more than the tokens it saves, and add a failure mode in
// front of every message. Unmatched questions fall back to a broad slice, so
// the failure direction is "sends too much", never "silently omits".

import { ChartContext } from "./context";

export type Topic =
  | "marriage" | "career" | "wealth" | "health" | "children" | "education"
  | "spirituality" | "property" | "timing" | "remedies" | "general";

interface TopicRule {
  topic: Topic;
  patterns: RegExp;
  /** Vargas worth including for this topic. */
  vargas: string[];
  /** Houses whose analysis rows matter most. */
  houses: number[];
}

const RULES: TopicRule[] = [
  {
    topic: "marriage",
    patterns: /\b(marriage|marry|married|wedding|spouse|husband|wife|partner|relationship|love|divorce|manglik|mangal dosh|kundli match|guna|compatib|shaadi|vivah|rishta)\b/i,
    vargas: ["D9"],
    houses: [7, 2, 8, 12],
  },
  {
    topic: "career",
    patterns: /\b(career|job|work|profession|business|promotion|boss|office|employment|salary|company|startup|naukri|kaam)\b/i,
    vargas: ["D10"],
    houses: [10, 6, 2, 11],
  },
  {
    topic: "wealth",
    patterns: /\b(money|wealth|rich|income|finance|financial|debt|loan|earning|savings|profit|loss|invest|property value|paisa|dhan)\b/i,
    vargas: ["D2", "D11"],
    houses: [2, 11, 5, 9],
  },
  {
    topic: "health",
    patterns: /\b(health|illness|disease|sick|medical|body|surgery|hospital|pain|energy|immunity|bimari|sehat)\b/i,
    vargas: ["D6", "D30"],
    houses: [6, 1, 8],
  },
  {
    topic: "children",
    patterns: /\b(child|children|kid|son|daughter|pregnan|conceive|fertility|santan|baby)\b/i,
    vargas: ["D7"],
    houses: [5, 9],
  },
  {
    topic: "education",
    patterns: /\b(education|study|studies|exam|college|university|degree|learn|school|course|padhai|vidya)\b/i,
    vargas: ["D24"],
    houses: [4, 5, 9],
  },
  {
    topic: "spirituality",
    patterns: /\b(spiritual|moksha|meditat|guru|dharma|temple|devotion|enlighten|puja|sadhana|bhakti)\b/i,
    vargas: ["D20"],
    houses: [9, 12, 5],
  },
  {
    topic: "property",
    patterns: /\b(property|house|home|land|vehicle|car|real estate|flat|plot|makaan|zameen)\b/i,
    vargas: ["D4", "D16"],
    houses: [4, 2, 11],
  },
  {
    topic: "timing",
    patterns: /\b(when|dasha|antardasha|period|timing|transit|gochar|sade sati|saturn return|future|next year|kab)\b/i,
    vargas: [],
    houses: [],
  },
  {
    topic: "remedies",
    patterns: /\b(remedy|remedies|upay|gemstone|stone|mantra|donate|donation|fast|fasting|rudraksha|yantra|colour|color|puja|lal kitab|ratna)\b/i,
    vargas: [],
    houses: [],
  },
];

export function classify(question: string): Topic[] {
  const hits = RULES.filter((r) => r.patterns.test(question)).map((r) => r.topic);
  return hits.length ? hits : ["general"];
}

export interface SelectedContext {
  /** What was matched, so the prompt can say why these slices are present. */
  topics: Topic[];
  context: Partial<ChartContext> & { ascendant: string; moonSign: string };
  /** Rough token counts, for logging and cost checks. */
  tokensBefore: number;
  tokensAfter: number;
}

const approxTokens = (o: unknown) => Math.round(JSON.stringify(o).length / 4);

/**
 * Build the trimmed payload for a question.
 *
 * Core placements, houses and the running dasha always travel — an astrologer
 * reasons from those whatever is asked. Everything else is opt-in by topic.
 */
export function selectContext(full: ChartContext, question: string): SelectedContext {
  const topics = classify(question);
  const rules = RULES.filter((r) => topics.includes(r.topic));

  const wantVargas = new Set(rules.flatMap((r) => r.vargas));
  const wantHouses = new Set(rules.flatMap((r) => r.houses));
  const has = (t: Topic) => topics.includes(t);
  const a = full.analysis;

  // Always-on core.
  const out: SelectedContext["context"] = {
    ascendant: full.ascendant,
    moonSign: full.moonSign,
    birthNakshatra: full.birthNakshatra,
    birthDate: full.birthDate,
    planets: full.planets,
    houses: full.houses,
    currentDasha: full.currentDasha,
    meta: full.meta,
  };

  if (!a) return { topics, context: out, tokensBefore: approxTokens(full), tokensAfter: approxTokens(out) };

  const analysis: NonNullable<ChartContext["analysis"]> = {
    dignities: a.dignities,
    // House rows are the single biggest block; keep the relevant ones in full
    // and reduce the rest to a one-line summary rather than dropping them.
    houses: wantHouses.size
      ? a.houses.map((h) =>
          wantHouses.has(h.house)
            ? h
            : { ...h, significations: h.significations.slice(0, 2), aspectedBy: h.aspectedBy }
        )
      : a.houses,
    aspectedHouses: a.aspectedHouses,
    yogas: a.yogas,
    charaKarakas: a.charaKarakas,
    arudhaPadas: has("general") || has("career") ? a.arudhaPadas : [],
    sarvashtakavargaByHouse: a.sarvashtakavargaByHouse,
    strength: a.strength,
    sadeSati: a.sadeSati,
    dhaiya: a.dhaiya,
    transits: has("timing") || has("general") || has("health") ? a.transits : [],
    lalKitab: has("remedies") || has("general")
      ? a.lalKitab
      : { ...a.lalKitab, upay: [], placements: a.lalKitab.placements },
    remedies: has("remedies") || has("general") ? a.remedies : [],
  };

  // Shadbala is large; include it only when strength is actually at issue.
  if (a.shadbala && (has("general") || has("career") || has("health") || has("timing"))) {
    analysis.shadbala = a.shadbala;
  }

  out.analysis = analysis;

  // Only the vargas this topic reads from. D1 is already in `houses`.
  if (wantVargas.has("D9") && full.navamsaD9) out.navamsaD9 = full.navamsaD9;
  if (wantVargas.has("D10") && full.dashamshaD10) out.dashamshaD10 = full.dashamshaD10;

  return {
    topics,
    context: out,
    tokensBefore: approxTokens(full),
    tokensAfter: approxTokens(out),
  };
}

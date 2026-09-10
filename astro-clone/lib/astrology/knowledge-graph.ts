// Astrology knowledge graph.
//
// A NOTE ON "RAG": this is a structured entity/relation graph with keyword and
// traversal retrieval — not vector search over embeddings. That is a deliberate
// choice, not a shortcut. The corpus here is a few hundred curated facts with
// exact names; embedding them would add an index, a similarity threshold and a
// class of silent retrieval errors, to answer questions that an exact lookup
// answers correctly. If the corpus later grows to free-text commentary, a
// vector layer becomes worth adding alongside this.

import { PLANET_REMEDIES, HOUSE_SIGNIFICATIONS, GEMSTONE_FACTS, RUDRAKSHA } from "./remedies";
import { NATURAL_RELATIONS, OWN_SIGNS, EXALT_DEGREE, MOOLATRIKONA } from "./aspects";
import { ZODIAC_SIGNS, RASHI_LORDS, NAKSHATRAS } from "./constants";

export type EntityKind =
  | "planet" | "sign" | "house" | "nakshatra" | "gemstone"
  | "colour" | "mantra" | "deity" | "metal" | "day" | "rudraksha" | "domain";

export interface Entity {
  id: string;
  kind: EntityKind;
  label: string;
  attributes?: Record<string, unknown>;
}

export interface Relation {
  from: string;
  type: string;
  to: string;
  /** Where the claim comes from, so a reader can weigh it. */
  basis: "classical" | "traditional-association" | "gemological" | "computed";
}

export interface KnowledgeGraph {
  entities: Map<string, Entity>;
  relations: Relation[];
}

const id = (kind: string, name: string) => `${kind}:${name.toLowerCase().replace(/\s+/g, "-")}`;

let cached: KnowledgeGraph | null = null;

export function buildKnowledgeGraph(): KnowledgeGraph {
  if (cached) return cached;

  const entities = new Map<string, Entity>();
  const relations: Relation[] = [];

  const add = (e: Entity) => {
    if (!entities.has(e.id)) entities.set(e.id, e);
    return e.id;
  };
  const link = (from: string, type: string, to: string, basis: Relation["basis"]) =>
    relations.push({ from, type, to, basis });

  // Signs and their lords.
  ZODIAC_SIGNS.forEach((sign, i) => {
    const sid = add({ id: id("sign", sign), kind: "sign", label: sign, attributes: { index: i } });
    const lid = add({ id: id("planet", RASHI_LORDS[i]), kind: "planet", label: RASHI_LORDS[i] });
    link(sid, "ruled_by", lid, "classical");
  });

  // Houses and what they signify.
  for (const [house, significations] of Object.entries(HOUSE_SIGNIFICATIONS)) {
    const hid = add({ id: id("house", `h${house}`), kind: "house", label: `House ${house}` });
    for (const s of significations) {
      const did = add({ id: id("domain", s), kind: "domain", label: s });
      link(hid, "signifies", did, "classical");
    }
  }

  // Nakshatras.
  NAKSHATRAS.forEach((n, i) => {
    add({ id: id("nakshatra", n), kind: "nakshatra", label: n, attributes: { index: i } });
  });

  // Planets, with every correspondence hanging off them.
  for (const [planet, kb] of Object.entries(PLANET_REMEDIES)) {
    const pid = add({
      id: id("planet", planet),
      kind: "planet",
      label: planet,
      attributes: { sanskrit: kb.sanskrit, domains: kb.domains },
    });

    for (const c of kb.colours) {
      link(pid, "associated_colour", add({ id: id("colour", c), kind: "colour", label: c }), "traditional-association");
    }
    for (const gem of [kb.gemstone.primary, ...kb.gemstone.alternates]) {
      const gid = add({
        id: id("gemstone", gem),
        kind: "gemstone",
        label: gem,
        attributes: GEMSTONE_FACTS[gem] ? { ...GEMSTONE_FACTS[gem] } : undefined,
      });
      link(pid, gem === kb.gemstone.primary ? "primary_gemstone" : "alternate_gemstone", gid, "traditional-association");
      if (GEMSTONE_FACTS[gem]) link(gid, "mineral_family", add({ id: id("domain", GEMSTONE_FACTS[gem].mineral), kind: "domain", label: GEMSTONE_FACTS[gem].mineral }), "gemological");
    }
    link(pid, "associated_metal", add({ id: id("metal", kb.metal), kind: "metal", label: kb.metal }), "traditional-association");
    link(pid, "associated_day", add({ id: id("day", kb.day), kind: "day", label: kb.day }), "traditional-association");
    for (const d of kb.deities) {
      link(pid, "associated_deity", add({ id: id("deity", d), kind: "deity", label: d }), "traditional-association");
    }
    link(pid, "beeja_mantra", add({ id: id("mantra", kb.beejaMantra), kind: "mantra", label: kb.beejaMantra }), "traditional-association");
    for (const dom of kb.domains) {
      link(pid, "signifies", add({ id: id("domain", dom), kind: "domain", label: dom }), "classical");
    }

    // Dignities.
    for (const s of OWN_SIGNS[planet] ?? []) {
      link(pid, "owns", id("sign", ZODIAC_SIGNS[s]), "classical");
    }
    const ex = EXALT_DEGREE[planet];
    if (ex) {
      link(pid, "exalted_in", id("sign", ZODIAC_SIGNS[ex.sign]), "classical");
      link(pid, "debilitated_in", id("sign", ZODIAC_SIGNS[(ex.sign + 6) % 12]), "classical");
    }
    const mt = MOOLATRIKONA[planet];
    if (mt) link(pid, "moolatrikona_in", id("sign", ZODIAC_SIGNS[mt.sign]), "classical");

    // Relationships between grahas.
    const rel = NATURAL_RELATIONS[planet];
    if (rel) {
      for (const f of rel.friends) link(pid, "friend_of", id("planet", f), "classical");
      for (const e of rel.enemies) link(pid, "enemy_of", id("planet", e), "classical");
    }
  }

  // Rudraksha.
  for (const r of RUDRAKSHA) {
    const rid = add({
      id: id("rudraksha", `${r.mukhi}-mukhi`),
      kind: "rudraksha",
      label: `${r.mukhi} Mukhi Rudraksha`,
      attributes: { associations: r.associations },
    });
    if (r.planet !== "—") link(rid, "associated_planet", id("planet", r.planet), "traditional-association");
  }

  cached = { entities, relations };
  return cached;
}

export interface RetrievedFact {
  subject: string;
  relation: string;
  object: string;
  basis: Relation["basis"];
}

/**
 * Keyword retrieval over the graph. Matches entity labels and attributes in
 * the question, then returns the relations touching those entities.
 */
export function retrieve(question: string, limit = 40): RetrievedFact[] {
  const g = buildKnowledgeGraph();
  const q = question.toLowerCase();

  const hits = new Set<string>();
  for (const e of g.entities.values()) {
    const label = e.label.toLowerCase();
    // Require a word-boundary match so "sun" does not match "Sunday".
    if (new RegExp(`\\b${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(q)) {
      hits.add(e.id);
    }
    const domains = (e.attributes?.domains as string[] | undefined) ?? [];
    if (domains.some((d) => q.includes(d.toLowerCase()))) hits.add(e.id);
  }

  if (hits.size === 0) return [];

  const out: RetrievedFact[] = [];
  for (const r of g.relations) {
    if (!hits.has(r.from) && !hits.has(r.to)) continue;
    const from = g.entities.get(r.from);
    const to = g.entities.get(r.to);
    if (!from || !to) continue;
    out.push({ subject: from.label, relation: r.type, object: to.label, basis: r.basis });
    if (out.length >= limit) break;
  }
  return out;
}

/** Everything the graph knows about one entity, for direct lookups. */
export function neighbours(entityId: string): RetrievedFact[] {
  const g = buildKnowledgeGraph();
  const out: RetrievedFact[] = [];
  for (const r of g.relations) {
    if (r.from !== entityId && r.to !== entityId) continue;
    const from = g.entities.get(r.from);
    const to = g.entities.get(r.to);
    if (from && to) out.push({ subject: from.label, relation: r.type, object: to.label, basis: r.basis });
  }
  return out;
}

export function graphStats() {
  const g = buildKnowledgeGraph();
  const byKind: Record<string, number> = {};
  for (const e of g.entities.values()) byKind[e.kind] = (byKind[e.kind] ?? 0) + 1;
  return { entities: g.entities.size, relations: g.relations.length, byKind };
}

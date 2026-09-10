/**
 * Builds the RAG index: embeds every corpus passage once, at build time, and
 * writes it for the chat backend to load.
 *
 * Embedding happens here rather than at request time so that serving a chat
 * message costs exactly one embedding call (the question), not hundreds.
 *
 *   VERTEX_BASE_URL=... VERTEX_API_KEY=... npx tsx scripts/build-rag-index.ts
 *
 * Output: server/rag-index.json  { model, dimensions, passages: [...] }
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildCorpus, corpusStats } from "../lib/astrology/corpus";

const BASE = (process.env.VERTEX_BASE_URL || "").replace(/\/+$/, "");
const KEY = process.env.VERTEX_API_KEY || "";
const MODEL = process.env.EMBED_MODEL || "text-embedding-005";
// The gateway's Vertex quota is per-minute and shared with other projects,
// so this paces deliberately rather than racing and eating 429s.
const BATCH = Number(process.env.EMBED_BATCH || 10);
const PACE_MS = Number(process.env.EMBED_PACE_MS || 5000);
const CHECKPOINT = resolve(process.cwd(), "../server/.rag-checkpoint.json");
const OUT = resolve(process.cwd(), "../server/rag-index.json");

if (!BASE || !KEY) {
  console.error("VERTEX_BASE_URL and VERTEX_API_KEY must be set.");
  process.exit(1);
}

async function embedBatch(texts: string[], attempt = 1): Promise<number[][]> {
  const res = await fetch(`${BASE}/raw`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": KEY },
    body: JSON.stringify({
      model: MODEL,
      method: "predict",
      body: { instances: texts.map((content) => ({ content })) },
    }),
  });

  const raw = await res.text();
  if (!res.ok) {
    // The gateway shares a quota with other projects, so back off and retry.
    if (attempt <= 8 && (res.status === 429 || res.status >= 500)) {
      // Exponential backoff capped at a minute — quota windows are per-minute.
      const wait = Math.min(60000, 5000 * 2 ** (attempt - 1));
      console.warn(`  batch failed (${res.status}), retrying in ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
      return embedBatch(texts, attempt + 1);
    }
    throw new Error(`embed failed ${res.status}: ${raw.slice(0, 300)}`);
  }

  const data = JSON.parse(raw);
  const preds = data.predictions;
  if (!Array.isArray(preds) || preds.length !== texts.length) {
    throw new Error(`expected ${texts.length} embeddings, got ${preds?.length}`);
  }
  return preds.map((p: { embeddings: { values: number[] } }) => p.embeddings.values);
}

async function main() {
  const corpus = buildCorpus();
  console.log("corpus:", JSON.stringify(corpusStats(), null, 1));

  // Resume from a checkpoint if a previous run was cut short by quota.
  let vectors: number[][] = [];
  if (existsSync(CHECKPOINT)) {
    try {
      const cp = JSON.parse(readFileSync(CHECKPOINT, "utf8"));
      if (cp.model === MODEL && cp.corpusSize === corpus.length && Array.isArray(cp.vectors)) {
        vectors = cp.vectors;
        console.log(`resuming from checkpoint at ${vectors.length}/${corpus.length}`);
      }
    } catch {
      /* corrupt checkpoint — start over */
    }
  }

  for (let i = vectors.length; i < corpus.length; i += BATCH) {
    const slice = corpus.slice(i, i + BATCH);
    const got = await embedBatch(slice.map((p) => p.text));
    vectors.push(...got);
    console.log(`  embedded ${vectors.length}/${corpus.length}`);

    mkdirSync(dirname(CHECKPOINT), { recursive: true });
    writeFileSync(CHECKPOINT, JSON.stringify({ model: MODEL, corpusSize: corpus.length, vectors }));

    if (vectors.length < corpus.length) await new Promise((r) => setTimeout(r, PACE_MS));
  }

  const dimensions = vectors[0]?.length ?? 0;
  if (!dimensions) throw new Error("no embeddings produced");
  if (!vectors.every((v) => v.length === dimensions)) {
    throw new Error("inconsistent embedding dimensions");
  }

  const passages = corpus.map((p, i) => ({
    id: p.id,
    source: p.source,
    basis: p.basis,
    text: p.text,
    // Stored pre-normalised so retrieval is a dot product, not a full cosine.
    vector: normalise(vectors[i]),
  }));

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(
    OUT,
    JSON.stringify({ model: MODEL, dimensions, builtAt: new Date().toISOString(), passages })
  );

  const mb = (JSON.stringify(passages).length / 1024 / 1024).toFixed(2);
  console.log(`\nwrote ${passages.length} passages (${dimensions}d, ${mb} MB) -> ${OUT}`);
}

function normalise(v: number[]): number[] {
  const mag = Math.hypot(...v);
  return mag === 0 ? v : v.map((x) => x / mag);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// Kundli export.
//
// No PDF library: html2canvas/jsPDF would add ~1MB to the bundle and produce a
// rasterised, unsearchable page. The browser's own print-to-PDF renders the
// real DOM with the print stylesheet, so text stays selectable and the charts
// stay vector. Alongside it, a plain-text report gives something portable that
// can be pasted into a message or email.

import { BirthChart } from "./astrology/kundli";
import { analyseChart } from "./astrology/analysis";

export interface ReportMeta {
  name?: string;
  date?: string;
  time?: string;
  place?: string;
}

function line(label: string, value: string | number): string {
  return `${label.padEnd(22)}${value}`;
}

/** A readable plain-text kundli — no rendering dependencies. */
export function buildTextReport(
  chart: BirthChart,
  meta: ReportMeta,
  place?: { latitude: number; longitude: number }
): string {
  const L: string[] = [];
  const rule = "=".repeat(62);
  const thin = "-".repeat(62);

  L.push(rule);
  L.push("  GOLDEN ERA ASTRO — VEDIC BIRTH CHART");
  L.push(rule, "");
  if (meta.name) L.push(line("Name", meta.name));
  if (meta.date) L.push(line("Date of birth", meta.date));
  if (meta.time) L.push(line("Time of birth", meta.time));
  if (meta.place) L.push(line("Place of birth", meta.place));
  L.push(line("Generated", new Date().toLocaleString()));
  L.push("");
  L.push(line("Ascendant (Lagna)", chart.ascendant));
  L.push(line("Moon sign (Rashi)", chart.moonSign));
  L.push(line("Birth nakshatra", chart.nakshatra));
  L.push("");

  L.push(thin);
  L.push("  PLANETARY POSITIONS");
  L.push(thin);
  L.push("Planet      Sign            Degree    Nakshatra          Pada  Notes");
  for (const p of chart.planetaryDetails) {
    const notes = [
      p.isRetro ? "Retro" : "",
      p.isCombust ? "Combust" : "",
      p.dignity !== "normal" ? p.dignity : "",
    ].filter(Boolean).join(", ");
    L.push(
      p.name.padEnd(12) +
        p.rashi.padEnd(16) +
        p.formatted.padEnd(10) +
        p.nakshatra.padEnd(19) +
        String(p.pada).padEnd(6) +
        notes
    );
  }
  L.push("");

  L.push(thin);
  L.push("  HOUSES (whole sign from lagna)");
  L.push(thin);
  for (const h of chart.houses) {
    L.push(line(`House ${h.houseNumber}`, `${h.sign}${h.planets.length ? "  —  " + h.planets.join(", ") : ""}`));
  }
  L.push("");

  // Analysis is optional — a failure here must not cost the user the report.
  try {
    const a = analyseChart(chart, new Date(), place);

    L.push(thin);
    L.push("  YOGAS");
    L.push(thin);
    if (a.yogas.length === 0) L.push("None from the implemented rule set.");
    for (const y of a.yogas) {
      L.push(`${y.name}  [${y.category}]`);
      for (const c of y.conditionsMet) L.push(`   - ${c}`);
      L.push(`   Indicates: ${y.effects.join(", ")}`);
      L.push("");
    }

    if (a.shadbala) {
      L.push(thin);
      L.push("  SHADBALA (rupas, against the classical minimum)");
      L.push(thin);
      for (const r of [...a.shadbala.rows].sort((x, y) => x.rank - y.rank)) {
        L.push(line(r.planet, `${r.totalRupas}  (needs ${r.requiredRupas})  ${r.meetsMinimum ? "OK" : "below"}`));
      }
      L.push("");
    }

    L.push(thin);
    L.push("  SARVASHTAKAVARGA");
    L.push(thin);
    L.push(a.sarvaByHouse.map((s) => `H${s.house}:${s.bindus}`).join("  "));
    L.push(line("Total", a.ashtakavarga.sarvaTotal));
    L.push("");

    L.push(thin);
    L.push("  CHARA KARAKAS");
    L.push(thin);
    for (const k of a.charaKarakas) L.push(line(k.karaka, `${k.planet} — ${k.signifies}`));
    L.push("");

    if (a.currentDashaLord) {
      L.push(thin);
      L.push("  CURRENT PERIOD");
      L.push(thin);
      L.push(line("Mahadasha lord", a.currentDashaLord));
      if (a.sadeSati.active) L.push(line("Sade Sati", a.sadeSati.phaseName));
      L.push("");
    }

    L.push(thin);
    L.push("  TRADITIONAL REMEDIES");
    L.push(thin);
    for (const r of a.remedies.slice(0, 10)) {
      L.push(`${r.type.toUpperCase()}: ${r.recommendation} (${r.planet})`);
      L.push(`   why: ${r.reasons.join("; ")}`);
    }
    L.push("");
  } catch {
    L.push("(Extended analysis unavailable for this chart.)", "");
  }

  L.push(rule);
  L.push("  Calculated from real planetary positions using the Lahiri ayanamsa.");
  L.push("  Remedies are traditional practice, not guaranteed outcomes, and are");
  L.push("  not medical, legal or financial advice.");
  L.push(rule);

  return L.join("\n");
}

/** Trigger a client-side file download. */
export function downloadText(filename: string, contents: string) {
  const blob = new Blob([contents], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke on the next tick; revoking immediately can cancel the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const safeFilename = (s: string) =>
  (s || "kundli").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);

"use client";

import { useMemo, useState } from "react";
import {
  Sparkles, Gem, Flame, BarChart3, Compass, Clock, ShieldAlert, BookOpen, Info,
  Hourglass, Globe2, RotateCw, Sun,
} from "lucide-react";
import { BirthChart } from "@/lib/astrology/kundli";
import { analyseChart } from "@/lib/astrology/analysis";

const CARD = "bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border border-gray-100";
const H3 = "text-xl font-serif font-bold text-primary-red mb-5 uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-4";

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-[11px] leading-relaxed text-gray-500 flex items-start gap-2">
      <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export default function ChartAnalysisPanels({
  chart,
  place,
}: {
  chart: BirthChart;
  place?: { latitude: number; longitude: number };
}) {
  // analyseChart hits the ephemeris again for transits, so memoise it.
  const a = useMemo(() => {
    try {
      return analyseChart(chart, new Date(), place);
    } catch {
      return null;
    }
  }, [chart, place]);

  const [showAllRemedies, setShowAllRemedies] = useState(false);

  if (!a) return null;

  const maxBindu = Math.max(...a.sarvaByHouse.map((s) => s.bindus), 1);
  const remedies = showAllRemedies ? a.remedies : a.remedies.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Yogas */}
      <div className={CARD}>
        <h3 className={H3}><Sparkles className="w-5 h-5" /> Yogas Detected</h3>
        {a.yogas.length === 0 ? (
          <p className="text-gray-600 text-sm font-medium">
            No yogas from the implemented rule set are present in this chart.
          </p>
        ) : (
          <div className="space-y-4">
            {a.yogas.map((y) => (
              <div key={y.id} className="border border-gray-100 rounded-2xl p-5 bg-primary-cream/40">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-serif font-bold text-gray-900">{y.name}</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-primary-saffron/15 text-primary-red">
                    {y.category}
                  </span>
                </div>
                <ul className="text-sm text-gray-700 space-y-1 mb-2">
                  {y.conditionsMet.map((c, i) => (
                    <li key={i} className="flex gap-2"><span className="text-primary-saffron">•</span>{c}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-600"><span className="font-bold">Indicates:</span> {y.effects.join(", ")}</p>
                <p className="text-[11px] text-gray-400 mt-1">{y.basis}</p>
              </div>
            ))}
          </div>
        )}
        <Note>Yoga definitions differ between traditions; the rule applied is stated under each.</Note>
      </div>

      {/* Shadbala */}
      <div className={CARD}>
        <h3 className={H3}><BarChart3 className="w-5 h-5" /> Shadbala</h3>
        {a.shadbala ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-100">
                    <th className="py-2">Planet</th><th>Sthana</th><th>Dig</th><th>Kala</th>
                    <th>Cheshta</th><th>Naisargika</th><th>Drik</th><th>Rupas</th><th>Req.</th>
                  </tr>
                </thead>
                <tbody>
                  {[...a.shadbala.rows].sort((x, y) => x.rank - y.rank).map((r) => (
                    <tr key={r.planet} className="border-b border-gray-50">
                      <td className="py-2 font-bold text-gray-800">{r.planet}</td>
                      <td className="text-gray-600">{r.sthana.total}</td>
                      <td className="text-gray-600">{r.dig}</td>
                      <td className="text-gray-600">{r.kala.total}</td>
                      <td className="text-gray-600" title={r.cheshta.state}>{r.cheshta.virupas}</td>
                      <td className="text-gray-600">{r.naisargika}</td>
                      <td className={r.drik < 0 ? "text-red-600" : "text-gray-600"}>{r.drik}</td>
                      <td className="font-bold text-gray-900">{r.totalRupas}</td>
                      <td className={r.meetsMinimum ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                        {r.requiredRupas} {r.meetsMinimum ? "✓" : "✗"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Motion states: {a.shadbala.rows.map((r) => `${r.planet} ${r.cheshta.state}`).join(" · ")}
            </p>
            <Note>
              All six balas computed, in virupas (60 virupas = 1 rupa), against the classical minimums.
              {" "}{a.shadbala.method[0]}
            </Note>
          </>
        ) : (
          <>
            <div className="space-y-2">
              {[...a.strength.components].sort((x, y) => x.rank - y.rank).map((c) => (
                <div key={c.planet} className="flex items-center gap-3">
                  <span className="w-20 text-sm font-bold text-gray-700 shrink-0">{c.planet}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-saffron to-primary-red rounded-full"
                      style={{ width: `${Math.max(2, (c.partialTotal / 240) * 100)}%` }}
                    />
                  </div>
                  <span className="w-14 text-right text-xs font-bold text-gray-500 shrink-0">
                    {c.partialTotal}
                  </span>
                </div>
              ))}
            </div>
            <Note>
              <strong>Partial figure.</strong> Full Shadbala needs the birth place for sunrise and
              sunset. {a.strength.disclaimer}
            </Note>
          </>
        )}
      </div>

      {/* Sarvashtakavarga */}
      <div className={CARD}>
        <h3 className={H3}><Compass className="w-5 h-5" /> Sarvashtakavarga</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {a.sarvaByHouse.map((s) => (
            <div
              key={s.house}
              className="rounded-xl border border-gray-100 p-3 text-center"
              style={{ background: `rgba(255,107,53,${0.06 + (s.bindus / maxBindu) * 0.22})` }}
            >
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">H{s.house}</div>
              <div className="text-lg font-serif font-bold text-gray-900">{s.bindus}</div>
              <div className="text-[10px] text-gray-500 truncate">{s.sign}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600 font-medium">
          Total across all signs: <span className="font-bold text-gray-900">{a.ashtakavarga.sarvaTotal}</span>
          {a.ashtakavarga.sarvaTotal === 337 && <span className="text-emerald-600"> ✓ matches the canonical 337</span>}
        </p>
        <Note>Higher bindu counts traditionally indicate houses that support their significations more readily.</Note>
      </div>

      {/* Jaimini */}
      <div className={CARD}>
        <h3 className={H3}><Clock className="w-5 h-5" /> Chara Karakas &amp; Arudha</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Chara Karakas</h4>
            <div className="space-y-2">
              {a.charaKarakas.map((k) => (
                <div key={k.karaka} className="flex items-baseline gap-2 text-sm">
                  <span className="font-bold text-gray-900 w-32 shrink-0">{k.karaka}</span>
                  <span className="text-primary-red font-bold">{k.planet}</span>
                  <span className="text-gray-500 text-xs">— {k.signifies}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Arudha Padas</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {a.arudhaPadas.map((p) => (
                <div key={p.id} className="flex gap-2">
                  <span className="font-bold text-gray-700 w-8">{p.id}</span>
                  <span className="text-gray-600">{p.arudhaSign} (H{p.arudhaHouse})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Note>Karakas are assigned by degree within sign, highest first; Rahu is excluded in the 7-karaka scheme used here.</Note>
      </div>

      {/* Sade Sati + transits */}
      <div className={CARD}>
        <h3 className={H3}><ShieldAlert className="w-5 h-5" /> Saturn &amp; Current Transits</h3>
        <div
          className={`rounded-2xl p-5 mb-5 border ${
            a.sadeSati.active ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"
          }`}
        >
          <p className="font-bold text-gray-900 mb-1">
            {a.sadeSati.active ? `Sade Sati active — ${a.sadeSati.phaseName}` : "Not in Sade Sati"}
          </p>
          <p className="text-sm text-gray-700">{a.sadeSati.note}</p>
          {a.sadeSati.active && a.sadeSati.approxStart && (
            <p className="text-xs text-gray-600 mt-2">
              Approximate window: {a.sadeSati.approxStart} → {a.sadeSati.approxEnd ?? "—"}
            </p>
          )}
          {a.dhaiya.active && (
            <p className="text-sm text-gray-700 mt-2"><strong>{a.dhaiya.kind}</strong> — {a.dhaiya.note}</p>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-100">
                <th className="py-2">Planet</th><th>Sign</th><th>From Lagna</th><th>From Moon</th>
              </tr>
            </thead>
            <tbody>
              {a.transits.map((t) => (
                <tr key={t.planet} className="border-b border-gray-50">
                  <td className="py-2 font-bold text-gray-800">
                    {t.planet}{t.retrograde && <span className="text-primary-red text-xs ml-1">R</span>}
                  </td>
                  <td className="text-gray-600">{t.sign}</td>
                  <td className="text-gray-600">{t.houseFromLagna}</td>
                  <td className="text-gray-600">{t.houseFromMoon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remedies */}
      <div className={CARD}>
        <h3 className={H3}><Gem className="w-5 h-5" /> Traditional Remedies</h3>
        <div className="space-y-3">
          {remedies.map((r, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-primary-saffron/15 text-primary-red">
                  {r.type}
                </span>
                <span className="font-bold text-gray-900">{r.recommendation}</span>
                <span className="text-xs text-gray-500">for {r.planet}</span>
              </div>
              <p className="text-xs text-gray-600">{r.reasons.join("; ")}</p>
            </div>
          ))}
        </div>
        {a.remedies.length > 6 && (
          <button
            onClick={() => setShowAllRemedies((v) => !v)}
            className="mt-4 text-sm font-bold text-primary-red hover:underline"
          >
            {showAllRemedies ? "Show fewer" : `Show all ${a.remedies.length}`}
          </button>
        )}
        <Note>
          These are recorded traditional associations, chosen from chart factors — the running dasha lord and
          weak or debilitated planets — not from sun sign. They are not a guaranteed means of changing outcomes,
          and are not medical, legal or financial advice.
        </Note>
      </div>

      {/* Lal Kitab */}
      <div className={CARD}>
        <h3 className={H3}><BookOpen className="w-5 h-5" /> Lal Kitab</h3>
        <p className="text-xs text-gray-500 font-medium mb-4">
          Houses are {a.lalKitab.houseScheme}, which is why these positions differ from the Parashari chart above.
        </p>
        <div className="grid sm:grid-cols-3 gap-2 mb-6">
          {a.lalKitab.placements.map((p) => (
            <div key={p.planet} className="border border-gray-100 rounded-xl px-3 py-2 text-sm flex items-center justify-between">
              <span className="font-bold text-gray-800">{p.planet}</span>
              <span className="text-gray-500 text-xs">
                H{p.house}
                {p.state !== "active" && <span className="ml-1 text-primary-red">{p.state}</span>}
              </span>
            </div>
          ))}
        </div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
          <Flame className="w-3.5 h-3.5" /> Upay (measures)
        </h4>
        <div className="space-y-3">
          {a.lalKitab.upay.slice(0, 4).map((u) => (
            <div key={u.planet} className="text-sm">
              <span className="font-bold text-gray-900">{u.planet}:</span>{" "}
              <span className="text-gray-700">{u.measures.slice(0, 2).join("; ")}</span>
            </div>
          ))}
        </div>
        <Note>{a.lalKitab.disclaimer}</Note>
      </div>

      {/* Alternative dasha systems */}
      {a.altDashas && (
        <div className={CARD}>
          <h3 className={H3}><Hourglass className="w-5 h-5" /> Other Dasha Systems</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[a.altDashas.yogini, a.altDashas.ashtottari, a.altDashas.chara].map((d) => (
              <div key={d.system} className="border border-gray-100 rounded-2xl p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                  {d.system}
                </div>
                {d.current ? (
                  <>
                    <div className="font-serif text-xl font-bold text-primary-red">
                      {d.current.name}
                    </div>
                    {d.current.lord !== d.current.name && (
                      <div className="text-xs text-gray-500">lord: {d.current.lord}</div>
                    )}
                    <div className="text-xs text-gray-600 mt-2">
                      {d.current.start} → {d.current.end}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">Not available</div>
                )}
                <p className="text-[11px] text-gray-400 mt-3">{d.basis}</p>
              </div>
            ))}
          </div>
          <Note>
            Vimshottari (shown in the main timeline) remains the primary system. These run alongside
            it and are read for confirmation, not in place of it.
          </Note>
        </div>
      )}

      {/* Planetary returns */}
      {a.returns.length > 0 && (
        <div className={CARD}>
          <h3 className={H3}><RotateCw className="w-5 h-5" /> Upcoming Planetary Returns</h3>
          <div className="space-y-2">
            {a.returns.map((r, i) => (
              <div key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-gray-50 pb-2">
                <span className="font-bold text-gray-900 w-36 shrink-0">{r.type}</span>
                <span className="text-primary-red font-bold">{r.exactDate}</span>
                <span className="text-xs text-gray-500">age {r.ageAtReturn}</span>
                <span className="text-xs text-gray-500 basis-full sm:basis-auto">{r.note}</span>
              </div>
            ))}
          </div>
          <Note>Dates are found by scanning the ephemeris for the exact return to the natal longitude, not by rounding to an average orbital period.</Note>
        </div>
      )}

      {/* Muhurta */}
      {a.muhurta && a.muhurta.sunrise && (
        <div className={CARD}>
          <h3 className={H3}><Sun className="w-5 h-5" /> Today&apos;s Muhurta</h3>
          <p className="text-xs text-gray-500 mb-4">
            {a.muhurta.weekday} · sunrise to sunset {a.muhurta.dayLengthHours}h
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[...a.muhurta.inauspicious, ...(a.muhurta.abhijit ? [a.muhurta.abhijit] : [])].map((w) => (
              <div
                key={w.name}
                className={`rounded-xl border p-4 ${
                  w.quality === "auspicious"
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <div className="font-bold text-gray-900 text-sm">{w.name}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {new Date(w.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {" – "}
                  {new Date(w.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                {w.note && <div className="text-[11px] text-gray-500 mt-1">{w.note}</div>}
              </div>
            ))}
          </div>
          <Note>{a.muhurta.note}</Note>
        </div>
      )}

      {/* Western layer */}
      {a.western && a.western.aspects.length > 0 && (
        <div className={CARD}>
          <h3 className={H3}><Globe2 className="w-5 h-5" /> Western (Tropical) Layer</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-100">
                  <th className="py-2">Aspect</th><th>Angle</th><th>Orb</th><th>Phase</th>
                </tr>
              </thead>
              <tbody>
                {a.western.aspects.slice(0, 10).map((asp, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 font-bold text-gray-800">
                      {asp.planetA} {asp.type} {asp.planetB}
                    </td>
                    <td className="text-gray-600">{asp.exactAngle}°</td>
                    <td className="text-gray-600">{asp.orb}°</td>
                    <td className="text-gray-600">{asp.applying ? "applying" : "separating"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Note>{a.western.note} Ayanamsa of {a.western.ayanamsaApplied}° was added back to recover tropical positions.</Note>
        </div>
      )}
    </div>
  );
}

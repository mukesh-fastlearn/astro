"use client";

import { useMemo, useState } from "react";
import { BirthChart, DashaPeriod, getDashaBasis } from "@/lib/astrology/kundli";
import {
  MAHADASHA_INFO, PLANET_GLYPH, getAntardashaInterpretation,
} from "@/lib/astrology/dasha-data";

const PLANET_SYM = PLANET_GLYPH;

function Glyph({ planet, size = "sm" }: { planet: string; size?: "sm" | "lg" }) {
  const g = PLANET_SYM[planet] || { bg: "#888", text: "#fff", badge: "?", icon: "" };
  const cls = size === "lg" ? "w-11 h-11 text-lg" : "w-8 h-8 text-sm";
  return (
    <span className={`inline-flex items-center justify-center rounded-full font-bold shrink-0 ${cls}`} style={{ background: g.bg, color: g.text }}>
      {g.icon || g.badge}
    </span>
  );
}

function fmt(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function daysBetween(a: number, b: number) {
  return Math.max(0, Math.round((b - a) / 86400000));
}

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "career", label: "Career" },
  { key: "health", label: "Health" },
  { key: "relationships", label: "Relations" },
  { key: "spirituality", label: "Spiritual" },
  { key: "remedies", label: "Remedies" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface BirthMeta {
  name: string;
  date: string;
  time: string;
  place: string;
}

export default function DashaResult({
  chart,
  meta,
  onEdit,
}: {
  chart: BirthChart;
  meta: BirthMeta;
  onEdit: () => void;
}) {
  const birthDate = chart.birthDate;
  const birthTime = birthDate.getTime();
  const yearMs = 365.25 * 86400000;
  const ageAt = (t: number) => Math.max(0, Math.floor((t - birthTime) / yearMs));
  const now = Date.now();

  const moon = chart.planetaryDetails.find((p) => p.name === "Moon");
  const basis = useMemo(() => getDashaBasis(moon ? moon.longitude : 0), [moon]);

  const mahas = chart.dashas;
  const currentMaha = mahas.find((m) => new Date(m.startDate).getTime() <= now && now < new Date(m.endDate).getTime());
  const currentAntar = currentMaha?.subPeriods.find((a) => new Date(a.startDate).getTime() <= now && now < new Date(a.endDate).getTime());
  const currentPraty = currentAntar?.subPeriods.find((p) => new Date(p.startDate).getTime() <= now && now < new Date(p.endDate).getTime());

  const [selMaha, setSelMaha] = useState<string>(currentMaha?.planet || mahas[0].planet);
  const [selAntar, setSelAntar] = useState<string>(currentAntar?.planet || "");
  const [tab, setTab] = useState<TabKey>("overview");

  const selMahaPeriod = mahas.find((m) => m.planet === selMaha) || mahas[0];
  const info = MAHADASHA_INFO[selMaha];
  const antarPlanet = selAntar || currentAntar?.planet || selMahaPeriod.subPeriods[0]?.planet || selMaha;
  const antarInterp = getAntardashaInterpretation(selMaha, antarPlanet);

  // Timeline total span for proportional widths
  const tStart = new Date(mahas[0].startDate).getTime();
  const tEnd = new Date(mahas[mahas.length - 1].endDate).getTime();
  const tSpan = tEnd - tStart;

  function CurrentCard({ label, period }: { label: string; period?: DashaPeriod }) {
    if (!period) return null;
    const end = new Date(period.endDate).getTime();
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex-1 min-w-[180px]">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{label}</p>
        <div className="flex items-center gap-3">
          <Glyph planet={period.planet} size="lg" />
          <div>
            <p className="font-serif text-xl font-bold text-gray-900">{period.planet}</p>
            <p className="text-xs text-gray-500">{fmt(new Date(period.startDate))} → {fmt(new Date(period.endDate))}</p>
          </div>
        </div>
        <p className="text-xs font-bold text-primary-red mt-3">{daysBetween(now, end)}d left</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header + chips */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button onClick={onEdit} className="text-sm font-bold text-primary-red mb-2 inline-flex items-center gap-1">← Edit Birth Details</button>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">{meta.name || "Your"}&apos;s Dasha Timeline</h2>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm shadow-sm">📅 {meta.date}</span>
        <span className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm shadow-sm">⏰ {meta.time}</span>
        <span className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm shadow-sm max-w-full">📍 <span className="truncate">{meta.place}</span></span>
      </div>

      {/* Dasha basis */}
      <div className="bg-orange-50/60 border border-orange-100 rounded-2xl p-5 text-sm text-gray-700 leading-relaxed">
        <span className="font-bold text-primary-red">Dasha Basis:</span> Your Moon is at{" "}
        <span className="font-bold">{basis.moonLongitude.toFixed(2)}°</span> sidereal longitude in{" "}
        <span className="font-bold">{basis.nakshatra}</span> Nakshatra (ruled by {PLANET_SYM[basis.nakshatraLord]?.icon} {basis.nakshatraLord}).
        At birth, <span className="font-bold">{basis.percentRemaining.toFixed(1)}%</span> of this Nakshatra remained, giving you{" "}
        <span className="font-bold">{basis.balanceYears.toFixed(1)} years</span> of {basis.nakshatraLord} Mahadasha from birth.
      </div>

      {/* Current period */}
      <div>
        <h3 className="text-lg font-serif font-bold text-primary-red mb-4 uppercase tracking-widest">⚡ Current Dasha Period</h3>
        <div className="flex flex-wrap gap-4">
          <CurrentCard label="Mahadasha" period={currentMaha} />
          <CurrentCard label="Antardasha" period={currentAntar} />
          <CurrentCard label="Pratyantar" period={currentPraty} />
        </div>
      </div>

      {/* Timeline bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-serif font-bold text-primary-red mb-5 uppercase tracking-widest">Mahadasha Timeline</h3>
        <div className="flex w-full h-14 rounded-xl overflow-hidden border border-gray-100">
          {mahas.map((m) => {
            const w = ((new Date(m.endDate).getTime() - new Date(m.startDate).getTime()) / tSpan) * 100;
            const active = m.planet === currentMaha?.planet;
            const g = PLANET_SYM[m.planet];
            return (
              <button
                key={m.planet + m.startDate}
                onClick={() => { setSelMaha(m.planet); setSelAntar(""); }}
                title={`${m.planet} ${fmt(new Date(m.startDate))} → ${fmt(new Date(m.endDate))}`}
                className="relative flex items-center justify-center text-[10px] font-bold transition hover:opacity-90"
                style={{ width: `${w}%`, background: g.bg, color: g.text }}
              >
                {g.badge}
                {active && <span className="absolute -top-0.5 right-0.5 text-[8px]">⚡</span>}
              </button>
            );
          })}
        </div>
        <div className="flex w-full mt-1 text-[10px] text-gray-400 font-bold">
          {mahas.map((m) => {
            const w = ((new Date(m.endDate).getTime() - new Date(m.startDate).getTime()) / tSpan) * 100;
            return <div key={m.planet + m.startDate} style={{ width: `${w}%` }}>{ageAt(new Date(m.startDate).getTime())}</div>;
          })}
        </div>
      </div>

      {/* Mahadasha periods list */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">Mahadasha Periods</h3>
        <p className="text-sm text-gray-500 mb-5">Click any period to view Antardashas and interpretations.</p>
        <div className="space-y-2">
          {mahas.map((m) => {
            const start = new Date(m.startDate).getTime();
            const end = new Date(m.endDate).getTime();
            const isActive = m.planet === currentMaha?.planet;
            const isPast = end < now;
            const isOpen = selMaha === m.planet;
            const progress = isActive ? ((now - start) / (end - start)) * 100 : isPast ? 100 : 0;
            const years = Math.round((end - start) / yearMs);
            return (
              <div key={m.planet + m.startDate} className={`rounded-xl border ${isActive ? "border-primary-saffron/50 bg-orange-50/40" : "border-gray-100"}`}>
                <button onClick={() => { setSelMaha(m.planet); setSelAntar(""); }} className="w-full flex items-center gap-3 p-3 text-left">
                  <Glyph planet={m.planet} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{m.planet}</span>
                      {isActive && <span className="text-[10px] font-bold bg-primary-red text-white px-2 py-0.5 rounded-full">ACTIVE</span>}
                      {isPast && <span className="text-[10px] font-bold text-gray-400">✓ Past</span>}
                    </div>
                    <p className="text-xs text-gray-500">{fmt(new Date(m.startDate))} → {fmt(new Date(m.endDate))} · Age {ageAt(start)}–{ageAt(end)}</p>
                    <div className="mt-1.5 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full" style={{ width: `${progress}%`, background: PLANET_SYM[m.planet].bg }} />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 shrink-0">{years}y</span>
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {m.subPeriods.map((a) => {
                      const aActive = a.planet === currentAntar?.planet && isActive;
                      const aSel = antarPlanet === a.planet;
                      return (
                        <button
                          key={a.planet + a.startDate}
                          onClick={() => setSelAntar(a.planet)}
                          className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 text-xs transition ${aSel ? "border-primary-saffron bg-orange-50" : aActive ? "border-primary-red/40" : "border-gray-100 hover:bg-gray-50"}`}
                        >
                          <Glyph planet={a.planet} />
                          <span className="font-semibold text-gray-700">{a.planet}</span>
                          <span className="text-[10px] text-gray-400 ml-auto">{new Date(a.startDate).getFullYear()}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interpretation panel */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="font-serif text-xl font-bold text-gray-900">📖 {info.title}</h3>
        <p className="text-sm text-primary-red font-semibold mt-1">Sub-period: {selMaha}–{antarPlanet} Antardasha</p>

        <div className="flex flex-wrap gap-2 mt-5 mb-6">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${tab === t.key ? "bg-primary-red text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" ? (
          <div className="space-y-5">
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Mahadasha Overview</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{info.overview}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <p className="font-bold text-emerald-700 text-sm mb-1">✅ Positive Themes</p>
                <p className="text-emerald-900/80 text-sm leading-relaxed">{info.positive}</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="font-bold text-amber-700 text-sm mb-1">⚠️ Challenges</p>
                <p className="text-amber-900/80 text-sm leading-relaxed">{info.challenges}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-sm leading-relaxed">{info[tab]}</p>
        )}

        {/* Antardasha interpretation */}
        <div className="mt-6 rounded-2xl border border-primary-saffron/30 bg-orange-50/40 p-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-serif font-bold text-gray-900">🔸 {antarInterp.title} — {antarInterp.theme}</h4>
            {antarInterp.yoga && <span className="text-[10px] font-bold bg-primary-red text-white px-2 py-1 rounded-full">{antarInterp.yoga}</span>}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">{antarInterp.interpretation}</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="text-sm"><span className="font-bold text-emerald-700">Favorable: </span><span className="text-gray-600">{antarInterp.favorable}</span></div>
            <div className="text-sm"><span className="font-bold text-amber-700">Caution: </span><span className="text-gray-600">{antarInterp.caution}</span></div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {antarInterp.keywords.map((k, i) => (
              <span key={i} className="text-[11px] font-semibold bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{k}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

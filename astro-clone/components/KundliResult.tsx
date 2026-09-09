"use client";

import { BirthChart, House } from "@/lib/astrology/kundli";
import { ZODIAC_SIGNS } from "@/lib/astrology/constants";
import { Download, Star, Pencil } from "lucide-react";

const ABBR: Record<string, string> = {
  Ascendant: "Asc", Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
  Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};

// South-Indian fixed grid positions [row, col] per sign index (0=Aries).
const GRID: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3],
  [3, 2], [3, 1], [3, 0], [2, 0], [1, 0], [0, 0],
];

function SouthIndianChart({
  housesBySign,
  ascSign,
  centerLabel,
}: {
  housesBySign: Record<string, string[]>;
  ascSign: string;
  centerLabel: string;
}) {
  const cells: (React.ReactNode | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null));
  ZODIAC_SIGNS.forEach((sign, idx) => {
    const [r, c] = GRID[idx];
    const planets = housesBySign[sign] || [];
    const isAsc = sign === ascSign;
    cells[r][c] = (
      <div className={`aspect-square border border-gray-200 p-1.5 text-[11px] leading-tight overflow-hidden ${isAsc ? "bg-orange-50" : "bg-white"}`}>
        <div className="text-gray-400 text-[9px] font-bold">{sign.slice(0, 3)}</div>
        <div className="flex flex-wrap gap-x-1 mt-0.5 font-bold text-gray-800">
          {isAsc && <span className="text-white bg-primary-red px-1 rounded text-[8px] leading-4">ASC</span>}
          {planets.map((p) => (
            <span key={p} className={p === "Sun" || p === "Moon" ? "text-primary-saffron" : ""}>{ABBR[p] || p}</span>
          ))}
        </div>
      </div>
    );
  });

  return (
    <div className="w-full max-w-[500px] mx-auto bg-white rounded-xl shadow-inner border border-gray-100 p-2">
      <div className="grid grid-cols-4 border border-gray-300 rounded-lg overflow-hidden">
        {cells.flatMap((row, r) =>
          row.map((cell, c) => {
            if (r >= 1 && r <= 2 && c >= 1 && c <= 2) {
              if (r === 1 && c === 1) {
                return (
                  <div key="center" className="col-span-2 row-span-2 flex items-center justify-center bg-gradient-to-br from-primary-saffron to-primary-red text-white text-center p-2" style={{ gridColumn: "2 / span 2", gridRow: "2 / span 2" }}>
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase">{centerLabel}</span>
                  </div>
                );
              }
              return null;
            }
            return <div key={`${r}-${c}`}>{cell}</div>;
          })
        )}
      </div>
      <p className="text-center text-primary-saffron font-sans text-[10px] font-bold tracking-widest uppercase mt-2">South Indian Style</p>
    </div>
  );
}

function housesToMap(houses: House[]): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  houses.forEach((h) => { map[h.sign] = h.planets; });
  return map;
}

interface Meta { name: string; date: string; time: string; place: string; }

const CHART_CARDS = [
  { id: "D1", label: "Lagna Chart (D1)", sub: "Life Path & Core" },
  { id: "D9", label: "Navamsa Chart (D9)", sub: "Marriage & Dharma" },
  { id: "D10", label: "Dashamsha Chart (D10)", sub: "Career & Status" },
];

export default function KundliResult({ chart, meta, onEdit }: { chart: BirthChart; meta: Meta; onEdit: () => void }) {
  const sun = chart.planetaryDetails.find((p) => p.name === "Sun");

  return (
    <div>
      {/* Edit button */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <button onClick={onEdit} className="px-8 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-primary-saffron hover:text-primary-saffron hover:bg-orange-50/50 transition-all shadow-sm flex items-center gap-2 mx-auto">
          <Pencil className="w-4 h-4" /> Edit Birth Details
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-serif font-bold text-primary-red">{meta.name || "Your"}&apos;s Birth Chart</h2>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 font-medium">
            <span className="flex items-center gap-1"><span className="text-primary-saffron">📅</span> {meta.date}</span>
            <span className="flex items-center gap-1"><span className="text-primary-saffron">⏰</span> {meta.time}</span>
            <span className="flex items-center gap-1"><span className="text-primary-saffron">📍</span> {meta.place}</span>
          </div>
        </div>
        <button onClick={() => window.print()} className="justify-center flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:border-primary-saffron hover:text-primary-saffron shadow-sm transition-all">
          <Download size={18} /> Download
        </button>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left: charts */}
        <div className="space-y-8">
          {CHART_CARDS.map((cc) => {
            const dc = chart.divisionalCharts[cc.id];
            return (
              <div key={cc.id} className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
                <h3 className="text-xl font-serif font-bold text-primary-red mb-6 text-center uppercase tracking-widest border-b border-gray-100 pb-4">
                  {cc.label}
                  <span className="block text-xs font-sans normal-case text-gray-500 mt-1">{cc.sub}</span>
                </h3>
                {dc && <SouthIndianChart housesBySign={housesToMap(dc.houses)} ascSign={dc.ascendant} centerLabel={cc.id} />}
              </div>
            );
          })}
        </div>

        {/* Right: tables */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
            <h3 className="text-xl font-serif font-bold text-primary-red mb-6 uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-4">
              <Star className="w-5 h-5" /> Planetary Positions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 font-bold bg-gray-50 uppercase tracking-wider text-xs">
                    <th className="p-3 rounded-l-lg">Planet</th>
                    <th className="p-3">Rashi</th>
                    <th className="p-3">Degree</th>
                    <th className="p-3 rounded-r-lg">Nakshatra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {chart.planetaryDetails.map((p) => (
                    <tr key={p.name} className="hover:bg-orange-50/50 transition-colors font-medium text-gray-700">
                      <td className="py-4 px-3 font-bold text-primary-red">{p.name}</td>
                      <td className="py-4 px-3">{p.rashi}</td>
                      <td className="py-4 px-3 text-gray-500 font-mono">{p.formatted}</td>
                      <td className="py-4 px-3">{p.nakshatra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
            <h3 className="text-xl font-serif font-bold text-primary-red mb-6 uppercase tracking-widest border-b border-gray-100 pb-4">Basic Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Ascendant (Lagna)", value: chart.ascendant },
                { label: "Sun Sign (Surya)", value: sun?.rashi || "Unknown" },
                { label: "Moon Sign (Rasi)", value: chart.moonSign },
                { label: "Birth Star", value: chart.nakshatra },
              ].map((b) => (
                <div key={b.label} className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100">
                  <span className="text-xs text-primary-saffron font-bold uppercase tracking-widest block mb-1">{b.label}</span>
                  <span className="text-lg font-bold text-gray-900">{b.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

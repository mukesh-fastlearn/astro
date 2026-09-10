"use client";

import { useState } from "react";
import { BirthChart } from "@/lib/astrology/kundli";
import { DIVISIONAL_CHARTS } from "@/lib/astrology/constants";
import NorthIndianChart from "@/components/NorthIndianChart";

/** What each varga is traditionally read for. */
const PURPOSE: Record<string, string> = {
  D1: "Overall life, body, personality",
  D2: "Wealth and material resources",
  D3: "Siblings, courage, initiative",
  D4: "Property, home, fixed assets",
  D5: "Fame and recognition",
  D6: "Health and ailments",
  D7: "Children and progeny",
  D8: "Longevity and sudden events",
  D9: "Marriage, dharma, planetary strength",
  D10: "Career, profession, authority",
  D11: "Gains and fulfilment of desire",
  D12: "Parents and ancestry",
  D16: "Vehicles and comforts",
  D20: "Spiritual practice",
  D24: "Education and learning",
  D27: "Underlying strength",
  D30: "Misfortune and vulnerability",
  D40: "Maternal lineage",
  D45: "Paternal lineage and character",
  D60: "Karma and subtle influences",
};

export default function VargaExplorer({
  chart,
  render,
}: {
  chart: BirthChart;
  /** Reuses the chart grid renderer from KundliResult. */
  render: (id: string) => React.ReactNode;
}) {
  const [active, setActive] = useState("D1");
  const [style, setStyle] = useState<"south" | "north">("south");
  const meta = DIVISIONAL_CHARTS.find((c) => c.id === active);
  const dc = chart.divisionalCharts[active];

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-xl font-serif font-bold text-primary-red uppercase tracking-widest">
            Divisional Charts
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-1">
            All {DIVISIONAL_CHARTS.length} vargas from the same birth moment.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {dc && (
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">{meta?.name}</div>
              <div className="text-xs text-gray-500">Lagna: {dc.ascendant}</div>
            </div>
          )}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 shrink-0">
            {(["south", "north"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={
                  style === s
                    ? "px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-primary-red text-white"
                    : "px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-white text-gray-600 hover:text-primary-red"
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable tab strip — 20 vargas will not fit on a phone otherwise. */}
      <div className="overflow-x-auto -mx-2 px-2 mb-6">
        <div className="flex gap-2 min-w-max pb-1">
          {DIVISIONAL_CHARTS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              title={PURPOSE[c.id]}
              className={
                active === c.id
                  ? "px-3.5 py-2 rounded-lg text-xs font-bold bg-primary-red text-white shrink-0"
                  : "px-3.5 py-2 rounded-lg text-xs font-bold bg-gray-50 text-gray-600 border border-gray-200 hover:border-primary-saffron hover:text-primary-red transition shrink-0"
              }
            >
              {c.id}
            </button>
          ))}
        </div>
      </div>

      {PURPOSE[active] && (
        <p className="text-center text-sm text-gray-600 font-medium mb-5">
          <span className="font-bold text-primary-red">{active}</span> — {PURPOSE[active]}
        </p>
      )}

      {style === "south"
        ? render(active)
        : dc && <NorthIndianChart houses={dc.houses} centerLabel={active} />}

      <p className="mt-4 text-center text-[11px] text-gray-400">
        {style === "south"
          ? "South Indian style — signs are fixed in the grid, the ascendant is marked."
          : "North Indian style — houses are fixed, the number in each compartment is the sign."}
      </p>
    </div>
  );
}

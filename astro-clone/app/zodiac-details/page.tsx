import type { Metadata } from "next";
import { ZODIAC, TAMIL_RASI } from "@/lib/zodiac";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Zodiac Signs Encyclopedia — Vedic Astrology",
  description:
    "Explore deep astrological profiles for every zodiac sign. Understand core traits, ruling planets, and career paths.",
};

export default function ZodiacDetailsPage() {
  const signs = Object.keys(ZODIAC);
  return (
    <div className="bg-vedic-gradient min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-primary-gold/40 text-sm font-semibold text-primary-red">
            <Sparkles className="w-4 h-4 text-primary-saffron" /> Zodiac Encyclopedia
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mt-5">Zodiac Insights</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            Explore deep astrological profiles for every zodiac sign. Understand core traits, ruling planets, and career paths.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signs.map((s) => {
            const z = ZODIAC[s];
            return (
              <div key={s} className="bg-white rounded-[2rem] border border-gray-100 p-7 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-gray-900">{s}</h2>
                    <p className="text-sm text-gray-500">{z.dates} · {TAMIL_RASI[s]}</p>
                  </div>
                  <span className="text-4xl text-primary-saffron">{z.symbol}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <Stat label="Ruler" value={z.ruler} />
                  <Stat label="Element" value={z.element} />
                  <Stat label="Color" value={z.color} />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm font-medium">
                  {z.traits} Those born under {s} are known for their profound connection to their ruling planet {z.ruler},
                  giving them a natural inclination towards their {z.element} element characteristics.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Ideal Careers</p>
                  <p className="text-sm text-gray-700">{z.career}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-primary-cream/60 rounded-xl py-2 px-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
      <p className="text-sm font-bold text-gray-900 leading-tight">{value}</p>
    </div>
  );
}

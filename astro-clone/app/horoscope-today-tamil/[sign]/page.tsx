import { notFound } from "next/navigation";
import Link from "next/link";
import { getDailyHoroscope } from "@/lib/horoscope";
import { ZODIAC_SIGN_SLUGS } from "@/lib/nav";
import { ZODIAC } from "@/lib/zodiac";
import { Star, Heart, Briefcase, HeartPulse, Sparkles } from "lucide-react";

export function generateStaticParams() {
  return ZODIAC_SIGN_SLUGS.map((sign) => ({ sign }));
}

export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params;
  const name = sign.charAt(0).toUpperCase() + sign.slice(1);
  return {
    title: `${name} Horoscope Today (Tamil) — இன்றைய ${name} ராசி பலன்`,
    description: `Today's free daily horoscope for ${name} in Tamil and English — love, career, health and lucky numbers.`,
  };
}

export default async function HoroscopePage({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params;
  const h = getDailyHoroscope(sign);
  if (!h) notFound();

  const sections = [
    { icon: Star, label: "General · பொது", data: h.general },
    { icon: Heart, label: "Love · காதல்", data: h.love },
    { icon: Briefcase, label: "Career · தொழில்", data: h.career },
    { icon: HeartPulse, label: "Health · ஆரோக்கியம்", data: h.health },
  ];

  return (
    <div className="bg-vedic-gradient min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="text-center mb-8">
          <span className="text-5xl text-primary-saffron">{ZODIAC[h.sign].symbol}</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mt-3">
            {h.sign} <span className="text-primary-red">{h.tamilName}</span>
          </h1>
          <p className="text-gray-600 mt-2 font-medium">இன்றைய ராசி பலன் · {h.dateLabel}</p>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < h.rating ? "text-primary-gold fill-primary-gold" : "text-gray-300"}`} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8 text-center">
          <Pill label="Ruler" value={h.ruler} />
          <Pill label="Lucky No." value={String(h.luckyNumber)} />
          <Pill label="Lucky Color" value={h.luckyColor} />
        </div>

        <div className="space-y-4">
          {sections.map((s) => (
            <div key={s.label} className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
                <s.icon className="w-5 h-5 text-primary-red" /> {s.label}
              </h3>
              <p className="text-gray-700 leading-relaxed">{s.data.en}</p>
              <p className="text-gray-600 leading-relaxed mt-2 border-t border-gray-100 pt-2">{s.data.ta}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-center text-sm font-semibold text-gray-500 mb-3">Other Signs · மற்ற ராசிகள்</p>
          <div className="flex flex-wrap justify-center gap-2">
            {ZODIAC_SIGN_SLUGS.map((s) => (
              <Link
                key={s}
                href={`/horoscope-today-tamil/${s}`}
                className={`capitalize px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  s === sign ? "bg-primary-red text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-primary-saffron"
                }`}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" /> Readings refresh daily based on planetary transits.
        </p>
      </div>
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 py-3 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
      <p className="font-bold text-gray-900">{value}</p>
    </div>
  );
}

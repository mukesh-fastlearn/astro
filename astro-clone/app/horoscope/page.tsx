"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Star, Heart, Briefcase, HeartPulse, Sparkles, Clock, ShieldAlert,
  Palette, Hash, Coins, CheckCircle2, ChevronRight,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import RequireAuth from "@/components/RequireAuth";
import { buildDailyPanel, hhmm } from "@/lib/daily";
import { calculateBirthChart } from "@/lib/astrology/kundli";
import { ZODIAC_SIGN_SLUGS } from "@/lib/nav";
import { TAMIL_RASI } from "@/lib/zodiac";

const CARD = "bg-white rounded-[2rem] shadow-lg border border-gray-100 p-5 md:p-6";
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function DailyInner() {
  const { user, birthProfile } = useAuth();

  // A user's real Moon sign is the correct basis for a Vedic daily reading —
  // far better than asking them to pick a sun sign. Fall back to a picker.
  const moonSlug = useMemo(() => {
    if (!birthProfile) return null;
    try {
      const c = calculateBirthChart({
        date: birthProfile.dob,
        time: birthProfile.tob,
        latitude: birthProfile.latitude,
        longitude: birthProfile.longitude,
        tzOffset: birthProfile.tz_offset || "+05:30",
      });
      return c.moonSign.toLowerCase();
    } catch {
      return null;
    }
  }, [birthProfile]);

  const [picked, setPicked] = useState<string | null>(null);
  const slug = picked ?? moonSlug ?? "aries";

  const panel = useMemo(
    () =>
      buildDailyPanel(slug, {
        latitude: birthProfile?.latitude,
        longitude: birthProfile?.longitude,
      }),
    [slug, birthProfile]
  );

  if (!panel) return null;
  const { horoscope: h, panchang, dayLord, bestTime, avoidTimes, upcomingGood } = panel;
  const usingMoon = !picked && !!moonSlug;

  return (
    <div className="min-h-screen bg-vedic-gradient pt-24 pb-8 px-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-saffron">{h.dateLabel}</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-1">
            {cap(h.sign)} <span className="text-primary-red">{TAMIL_RASI[cap(h.sign)] ?? ""}</span>
          </h1>
          <p className="text-sm text-gray-600 font-medium mt-1">
            {usingMoon ? "Based on your Moon sign" : "Pick your sign"} · ruled by {h.ruler} · {h.element}
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < h.rating ? "text-primary-gold fill-primary-gold" : "text-gray-200"}`} />
            ))}
          </div>
        </div>

        {/* Sign picker */}
        <div className="overflow-x-auto -mx-1 px-1">
          <div className="flex gap-2 min-w-max pb-1">
            {moonSlug && (
              <button onClick={() => setPicked(null)}
                className={usingMoon
                  ? "px-3.5 py-2 rounded-lg text-xs font-bold bg-primary-red text-white shrink-0"
                  : "px-3.5 py-2 rounded-lg text-xs font-bold bg-white border border-gray-200 text-gray-600 shrink-0"}>
                My sign
              </button>
            )}
            {ZODIAC_SIGN_SLUGS.map((s) => (
              <button key={s} onClick={() => setPicked(s)}
                className={picked === s
                  ? "px-3.5 py-2 rounded-lg text-xs font-bold bg-primary-red text-white shrink-0"
                  : "px-3.5 py-2 rounded-lg text-xs font-bold bg-white border border-gray-200 text-gray-600 hover:border-primary-saffron shrink-0"}>
                {cap(s)}
              </button>
            ))}
          </div>
        </div>

        {/* Lucky strip */}
        <div className="grid grid-cols-3 gap-3">
          <Lucky icon={<Hash className="w-4 h-4" />} label="Lucky number" value={String(h.luckyNumber)} />
          <Lucky icon={<Palette className="w-4 h-4" />} label="Lucky colour" value={h.luckyColor} />
          <Lucky icon={<Coins className="w-4 h-4" />} label="Day lord" value={dayLord?.planet ?? "—"} />
        </div>

        {/* Timing — computed, not invented */}
        <div className={CARD}>
          <h2 className="font-serif text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-red" /> Today&apos;s timing
          </h2>
          {bestTime ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 mb-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Best time — {bestTime.name}
              </div>
              <p className="text-emerald-900 font-serif text-xl font-bold mt-1">
                {hhmm(bestTime.start)} – {hhmm(bestTime.end)}
              </p>
              {bestTime.note && <p className="text-xs text-emerald-800/80 mt-1">{bestTime.note}</p>}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mb-3">Timing needs your birth place to be saved.</p>
          )}

          {avoidTimes.length > 0 && (
            <div className="space-y-2">
              {avoidTimes.map((w) => (
                <div key={w.name} className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 px-3 py-2">
                  <span className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                    <ShieldAlert className="w-3.5 h-3.5" /> {w.name}
                  </span>
                  <span className="text-amber-900 text-sm font-bold">{hhmm(w.start)} – {hhmm(w.end)}</span>
                </div>
              ))}
            </div>
          )}

          {upcomingGood.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Good windows ahead</p>
              <div className="flex flex-wrap gap-2">
                {upcomingGood.map((w, i) => (
                  <span key={i} className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {w.name} {hhmm(w.start)}
                  </span>
                ))}
              </div>
            </div>
          )}
          <p className="text-[11px] text-gray-400 mt-3">
            Computed from actual sunrise and sunset for your location, not a fixed clock.
          </p>
        </div>

        {/* Panchang */}
        {panchang && (
          <div className={CARD}>
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-3">Today&apos;s Panchang</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <Field label="Tithi" value={panchang.tithi} />
              <Field label="Nakshatra" value={panchang.nakshatra} />
              <Field label="Yoga" value={panchang.yoga} />
              <Field label="Karana" value={panchang.karana} />
              <Field label="Paksha" value={panchang.paksha} />
              <Field label="Month" value={panchang.amantaMonth} />
            </div>
          </div>
        )}

        {/* Predictions */}
        <Reading icon={<Sparkles className="w-5 h-5" />} title="General" en={h.general.en} ta={h.general.ta} />
        <Reading icon={<Heart className="w-5 h-5" />} title="Love" en={h.love.en} ta={h.love.ta} />
        <Reading icon={<Briefcase className="w-5 h-5" />} title="Career" en={h.career.en} ta={h.career.ta} />
        <Reading icon={<HeartPulse className="w-5 h-5" />} title="Health" en={h.health.en} ta={h.health.ta} />

        {/* Day lord remedies */}
        {dayLord && (
          <div className={CARD}>
            <h2 className="font-serif text-lg font-bold text-gray-900 mb-1">
              {new Date().toLocaleDateString("en-IN", { weekday: "long" })} belongs to {dayLord.planet}
            </h2>
            <p className="text-xs text-gray-500 mb-3">{dayLord.sanskrit}</p>
            <div className="space-y-2 text-sm">
              <Row label="Wear" value={dayLord.colours.join(", ")} />
              <Row label="Metal" value={dayLord.metal} />
              <Row label="Deities" value={dayLord.deities.join(", ")} />
              <Row label="Donate" value={dayLord.donations.slice(0, 3).join(", ")} />
              <Row label="Numbers" value={dayLord.numbers.join(", ")} />
            </div>
            <p className="text-xs text-gray-700 bg-primary-cream rounded-xl px-3 py-2 mt-3 font-medium">
              {dayLord.mantra}
            </p>
            <p className="text-[11px] text-gray-400 mt-2">
              Traditional associations, not a guaranteed outcome.
            </p>
          </div>
        )}

        <Link href="/free-kundli-tamil"
          className="flex items-center justify-between gap-3 bg-gradient-to-r from-primary-red to-primary-saffron text-white rounded-[2rem] p-5 shadow-lg">
          <span>
            <span className="block font-serif text-lg font-bold">Want more than a daily reading?</span>
            <span className="block text-white/85 text-sm">Generate your full kundli — 20 charts and an AI astrologer.</span>
          </span>
          <ChevronRight className="w-6 h-6 shrink-0" />
        </Link>

        {!birthProfile && user && (
          <p className="text-center text-xs text-gray-500">
            Save your birth details to get this based on your real Moon sign and your own location.
          </p>
        )}
      </div>
    </div>
  );
}

function Lucky({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center">
      <span className="inline-flex text-primary-saffron mb-1">{icon}</span>
      <span className="block text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
      <span className="block font-serif text-lg font-bold text-gray-900 truncate">{value}</span>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <span className="block text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
      <span className="font-bold text-gray-900 truncate block">{value}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-gray-500 w-20 shrink-0 text-xs uppercase tracking-wider pt-0.5">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

function Reading({ icon, title, en, ta }: { icon: React.ReactNode; title: string; en: string; ta: string }) {
  return (
    <div className={CARD}>
      <h2 className="font-serif text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        <span className="text-primary-red">{icon}</span> {title}
      </h2>
      <p className="text-gray-700 text-sm leading-relaxed">{en}</p>
      <p className="text-gray-500 text-sm leading-relaxed mt-2">{ta}</p>
    </div>
  );
}

export default function HoroscopePage() {
  return (
    <RequireAuth
      title="Sign in for your daily reading"
      reason="Your daily horoscope uses your real Moon sign and your location's sunrise, so it needs an account."
    >
      <DailyInner />
    </RequireAuth>
  );
}

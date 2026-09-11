"use client";

import { useState } from "react";
import BirthDetailsForm, { BirthData } from "@/components/BirthDetailsForm";
import { calculateGunaMilan, MatchResult } from "@/lib/astrology/matching";
import CalcHero from "@/components/CalcHero";
import { Sparkles } from "lucide-react";
import RequireAuth from "@/components/RequireAuth";

function KundliMatchingPageInner() {
  const [step, setStep] = useState(1);
  const [boy, setBoy] = useState<BirthData | null>(null);
  const [girl, setGirl] = useState<BirthData | null>(null);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);

  function onBoy(data: BirthData) {
    setBoy(data);
    setStep(2);
    setTimeout(() => document.getElementById("girl-form")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  }

  function onGirl(g: BirthData) {
    if (!boy) return;
    setGirl(g);
    setLoading(true);
    setTimeout(() => {
      try {
        setResult(
          calculateGunaMilan(
            { date: boy.date, time: boy.time, latitude: boy.lat, longitude: boy.lon, tzOffset: "+05:30" },
            { date: g.date, time: g.time, latitude: g.lat, longitude: g.lon, tzOffset: "+05:30" }
          )
        );
      } catch (e) {
        console.error(e);
        alert("Error calculating chart details.");
      } finally {
        setLoading(false);
      }
    }, 30);
  }

  function reset() {
    setResult(null);
    setStep(1);
    setBoy(null);
    setGirl(null);
  }

  return (
    <div className="bg-vedic-gradient min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <CalcHero
          badge="Ashtakoota Matchmaking"
          titleTop="Guna Milan"
          titleBottom="Compatibility"
          subtitle="Check marriage compatibility using the traditional 36-point Vedic system. Discover your Ashtakoota score instantly."
          tamil="திருமண பொருத்தம் கணிப்பான்"
        />

        {!result && (
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-7">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-saffron text-white flex items-center justify-center text-sm">1</span>
                Enter Boy&apos;s Details
              </h2>
              <BirthDetailsForm onGenerate={onBoy} defaultGender="Male" submitLabel="Continue →" />
            </div>

            {step === 2 && (
              <div id="girl-form" className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-7">
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-red text-white flex items-center justify-center text-sm">2</span>
                  Enter Girl&apos;s Details
                </h2>
                <BirthDetailsForm onGenerate={onGirl} defaultGender="Female" loading={loading} submitLabel="Match Kundli" />
              </div>
            )}
          </div>
        )}

        {result && boy && girl && (
          <div className="mt-4">
            <div className="text-center mb-10">
              <button onClick={reset} className="px-8 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-primary-saffron hover:text-primary-saffron hover:bg-orange-50/50 transition-all shadow-sm">
                ← Match Another Pair
              </button>
            </div>

            {/* Score */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Compatibility Score</h2>
              <div className="inline-block relative">
                <svg className="w-48 h-48 -rotate-90" viewBox="0 0 192 192">
                  <circle cx="96" cy="96" r="88" stroke="#f3f4f6" strokeWidth="12" fill="none" />
                  <circle cx="96" cy="96" r="88" stroke="url(#gmgrad)" strokeWidth="12" fill="none" strokeDasharray="553" strokeDashoffset={553 - 553 * (result.totalScore / 36)} strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gmgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="100%" stopColor="#C1121F" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-serif font-bold text-gray-900">{result.totalScore}</span>
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Out of 36</span>
                </div>
              </div>
              <div className="mt-8 px-6 py-4 bg-orange-50 rounded-2xl inline-block border border-orange-100">
                <h3 className="text-xl font-bold text-primary-red mb-1">{result.verdict}</h3>
              </div>
            </div>

            {/* Boy / Girl details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <h3 className="text-sm font-bold text-primary-saffron uppercase tracking-widest mb-4">Boy&apos;s Astrological Details</h3>
                <p className="text-xl font-serif font-bold text-gray-900 mb-1">{boy.name}</p>
                <p className="text-gray-600 font-medium">Rasi: <span className="text-gray-900">{result.boyRasi}</span></p>
                <p className="text-gray-600 font-medium">Nakshatra: <span className="text-gray-900">{result.boyNakshatra}</span></p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                <h3 className="text-sm font-bold text-primary-red uppercase tracking-widest mb-4">Girl&apos;s Astrological Details</h3>
                <p className="text-xl font-serif font-bold text-gray-900 mb-1">{girl.name}</p>
                <p className="text-gray-600 font-medium">Rasi: <span className="text-gray-900">{result.girlRasi}</span></p>
                <p className="text-gray-600 font-medium">Nakshatra: <span className="text-gray-900">{result.girlNakshatra}</span></p>
              </div>
            </div>

            {/* Koots */}
            <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-100 bg-gray-50">
                <h3 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="text-primary-gold w-5 h-5" /> Ashtakoota Details (8 Koots)
                </h3>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.koots.map((e) => (
                    <div key={e.name} className="flex justify-between items-center p-4 rounded-xl border border-gray-100 hover:border-primary-saffron/30 transition-colors">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{e.name}</p>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{e.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-serif font-bold text-primary-red">{e.obtained}</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">/ {e.max} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default function KundliMatchingPage() {
  return (
    <RequireAuth
      title="Sign in for Guna Milan"
      reason="Matching results are tied to your account so you can revisit them."
    >
      <KundliMatchingPageInner />
    </RequireAuth>
  );
}

"use client";

import { useState } from "react";
import { calculateNumerology, NumerologyResult, NumeroNumber } from "@/lib/astrology/numerology";
import CalcHero from "@/components/CalcHero";
import { Info } from "lucide-react";
import RequireAuth from "@/components/RequireAuth";

function NumberCard({ n, accent, bg, border }: { n: NumeroNumber; accent: string; bg: string; border: string }) {
  return (
    <div className={`bg-white p-8 rounded-[2rem] shadow-lg border ${border} relative overflow-hidden group`}>
      <div className={`absolute top-0 right-0 w-32 h-32 ${bg} rounded-bl-full -z-10 opacity-50`} />
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className={`text-sm font-bold ${accent} uppercase tracking-widest mb-1`}>{n.sanskritName}</h3>
          <p className="text-gray-500 font-medium text-xs uppercase tracking-wider">{n.englishName}</p>
        </div>
        <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center text-3xl font-serif font-bold ${accent} shadow-sm`}>
          {n.number}
        </div>
      </div>
      <div className="space-y-4">
        {n.hasMasterInfluence && (
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
            Master Number {n.masterNumber}
          </span>
        )}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Ruling Planet</p>
          <p className="font-serif font-bold text-lg text-gray-900">{n.rulingPlanet}</p>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm">{n.description}</p>
        <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Lucky Colors</p>
            <p className="text-sm font-medium text-gray-900">{n.luckyColors}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Lucky Days</p>
            <p className="text-sm font-medium text-gray-900">{n.luckyDays}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NumerologyPageInner() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<NumerologyResult | null>(null);

  function calc(e: React.FormEvent) {
    e.preventDefault();
    setResult(calculateNumerology(name, dob));
  }

  const inputCls = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary-saffron focus:ring-2 focus:ring-primary-saffron/20 transition";

  return (
    <div className="bg-vedic-gradient min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <CalcHero
          badge="Vedic System"
          titleTop="Numerology"
          titleBottom="Calculator"
          subtitle="Discover the hidden meanings behind your name and birth date. Uncover your Mulank, Bhagyank, and Namank according to pure Vedic traditions."
          tamil="எண் கணித பலன்"
        />

        <form onSubmit={calc} className="max-w-xl mx-auto bg-white rounded-[2rem] shadow-lg border border-gray-100 p-7 md:p-9 space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-primary-red ml-1 mb-1.5 block">Full Name</label>
            <input required className={inputCls} placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-primary-red ml-1 mb-1.5 block">Date of Birth</label>
            <input required type="date" className={inputCls} value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <button type="submit" className="w-full rounded-full bg-gradient-to-r from-primary-saffron to-primary-red text-white font-bold py-3.5 shadow-lg hover:shadow-xl transition">
            Reveal My Numbers
          </button>
        </form>

        {result && (
          <div className="mt-14">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">Your Numerology Profile</h2>
              <p className="text-gray-500 mt-2">A deep dive into your personality, destiny, and soul purpose.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <NumberCard n={result.mulank} accent="text-primary-saffron" bg="bg-orange-50" border="border-orange-100" />
              <NumberCard n={result.bhagyank} accent="text-primary-red" bg="bg-red-50" border="border-red-100" />
              <NumberCard n={result.namank} accent="text-primary-gold" bg="bg-yellow-50" border="border-yellow-100" />
            </div>
            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-primary-red flex items-center justify-center shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-gray-900">Soul Urge · Number {result.soulUrge.number}</h3>
                <p className="text-gray-600 mt-1 leading-relaxed">{result.soulUrge.text}</p>
                <p className="text-xs text-gray-400 mt-3">Personality (consonant) number: <span className="font-semibold text-gray-700">{result.personality}</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default function NumerologyPage() {
  return (
    <RequireAuth
      title="Sign in for numerology"
      reason="Create a free account to use this calculator."
    >
      <NumerologyPageInner />
    </RequireAuth>
  );
}

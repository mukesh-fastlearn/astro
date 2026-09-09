"use client";

import { useState } from "react";
import BirthDetailsForm, { BirthData } from "@/components/BirthDetailsForm";
import { analyzeMarriage, MarriageAnalysis } from "@/lib/astrology/marriage";
import CalcHero from "@/components/CalcHero";
import { Users, ShieldAlert, Clock, Sparkles } from "lucide-react";

export default function MarriagePredictionPage() {
  const [analysis, setAnalysis] = useState<MarriageAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  function handle(data: BirthData) {
    setLoading(true);
    setTimeout(() => {
      try {
        setAnalysis(
          analyzeMarriage({ date: data.date, time: data.time, latitude: data.lat, longitude: data.lon, tzOffset: "+05:30" })
        );
      } catch (e) {
        console.error(e);
        alert("Could not analyze the chart.");
      } finally {
        setLoading(false);
      }
    }, 30);
  }

  const s = analysis;
  const intensityCls = s
    ? s.manglikReport.intensity === "High"
      ? "bg-red-50 text-red-600 border border-red-200"
      : s.manglikReport.intensity === "Low"
      ? "bg-orange-50 text-orange-600 border border-orange-200"
      : "bg-emerald-50 text-emerald-600 border border-emerald-200"
    : "";

  return (
    <div className="bg-vedic-gradient min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <CalcHero
          badge="Vedic Relationship Analysis"
          titleTop="Marriage"
          titleBottom="Prediction"
          subtitle="Deep astrological insights into your relationship dynamics, timing, spouse characteristics, and overall marital harmony based on Vedic principles."
          tamil="திருமண பலன் கணிப்பு"
        />

        {!s && (
          <div className="max-w-xl mx-auto bg-white rounded-[2rem] shadow-lg border border-gray-100 p-7 md:p-9">
            <BirthDetailsForm onGenerate={handle} loading={loading} submitLabel="Reveal Marriage Insights" />
            <p className="text-center text-xs text-gray-400 mt-4">Ancient Vedic Algorithms • 100% Secure</p>
          </div>
        )}

        {s && (
          <div className="space-y-6">
            <div className="text-center mb-2">
              <button onClick={() => setAnalysis(null)} className="px-8 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:border-primary-saffron hover:text-primary-saffron hover:bg-orange-50/50 transition-all shadow-sm">
                ← Analyze Another Chart
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Future Spouse Profile */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-50 rounded-lg"><Users className="w-6 h-6 text-purple-600" /></div>
                  <h3 className="text-xl font-bold font-serif text-gray-900">Future Spouse Profile</h3>
                </div>
                <div className="space-y-4">
                  <Field label="Appearance" value={s.spouseDetails.physicalAppearance} />
                  <Field label="Nature & Personality" value={s.spouseDetails.personality} />
                  <Field label="Career Orientation" value={s.spouseDetails.careerOrStatus} />
                </div>
              </div>

              {/* Manglik & Harmony */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-rose-50 rounded-lg"><ShieldAlert className="w-6 h-6 text-primary-red" /></div>
                  <h3 className="text-xl font-bold font-serif text-gray-900">Manglik &amp; Harmony</h3>
                </div>
                <div className="mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-3 ${intensityCls}`}>
                    {s.manglikReport.intensity === "None" ? "Non-Manglik" : `${s.manglikReport.intensity} Manglik`}
                  </div>
                  <p className="text-gray-700 text-sm font-medium leading-relaxed">{s.manglikReport.description}</p>
                </div>
                {s.manglikReport.cancellations.length > 0 && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mt-4">
                    <h4 className="text-emerald-700 text-sm font-bold mb-2">Manglik Cancellations Found:</h4>
                    <ul className="list-disc list-inside text-sm text-emerald-600 font-medium space-y-1">
                      {s.manglikReport.cancellations.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                )}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Marriage Tendency</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 font-medium">{s.advancedAnalysis.loveVsArrangedTendency}</span>
                    <div className="w-1/2 bg-gray-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-rose-400 to-orange-400 h-2 rounded-full" style={{ width: s.advancedAnalysis.loveVsArrangedTendency.includes("Love") ? "80%" : "30%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Favorable Marriage Periods */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg"><Clock className="w-6 h-6 text-blue-600" /></div>
                <h3 className="text-xl font-bold font-serif text-gray-900">Favorable Marriage Periods</h3>
              </div>
              {s.timingPredictions.length > 0 ? (
                <div className="space-y-4">
                  {s.timingPredictions.map((t, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
                      <div className="sm:w-1/4 flex flex-col justify-center">
                        <span className="text-lg font-bold text-blue-600">{t.timeframe}</span>
                        <span className="text-xs text-gray-500 font-semibold uppercase">{t.periodName}</span>
                      </div>
                      <div className="sm:w-3/4 flex flex-col justify-center border-l border-gray-200 pl-4">
                        <p className="text-gray-700 text-sm font-medium">{t.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 font-medium">No highly favorable periods found in the immediate Dasha timeline. A detailed manual reading is recommended.</p>
              )}
              {s.advancedAnalysis.delayFactors.length > 0 && (
                <div className="mt-4 p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                  <h4 className="text-yellow-700 text-sm font-bold mb-2">Delay Indicators:</h4>
                  <ul className="list-disc list-inside text-sm text-yellow-600 font-medium space-y-1">
                    {s.advancedAnalysis.delayFactors.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              )}
            </div>

            {/* Remedies */}
            {s.remedies.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-emerald-50 rounded-lg"><Sparkles className="w-6 h-6 text-emerald-600" /></div>
                  <h3 className="text-xl font-bold font-serif text-gray-900">Recommended Astrological Remedies</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {s.remedies.map((r, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <h4 className="text-emerald-700 font-bold mb-1">{r.name}</h4>
                      <p className="text-gray-700 text-sm font-medium mb-2">{r.description}</p>
                      <p className="text-gray-500 text-xs italic font-medium">Why: {r.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</h4>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  );
}

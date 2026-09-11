"use client";

import { useState } from "react";
import BirthDetailsForm, { BirthData } from "@/components/BirthDetailsForm";
import { calculateBirthChart, BirthChart } from "@/lib/astrology/kundli";
import CalcHero from "@/components/CalcHero";
import KundliResult from "@/components/KundliResult";
import AstroChat from "@/components/AstroChat";
import ChartAnalysisPanels from "@/components/ChartAnalysisPanels";
import { useAuth } from "@/components/AuthProvider";
import { api } from "@/lib/api";
import { buildChartContext } from "@/lib/astrology/context";
import RequireAuth from "@/components/RequireAuth";

interface Meta { name: string; date: string; time: string; place: string; }

function FreeKundliPageInner() {
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState<{ latitude: number; longitude: number } | null>(null);
  const { user, refresh } = useAuth();

  function handle(data: BirthData) {
    setLoading(true);
    setMeta({ name: data.name, date: data.date, time: data.time, place: data.place });
    setPlace({ latitude: data.lat, longitude: data.lon });
    setTimeout(() => {
      try {
        const computed = calculateBirthChart({ date: data.date, time: data.time, latitude: data.lat, longitude: data.lon, tzOffset: "+05:30" });
        setChart(computed);

        // Signed-in users get their details and chart stored, so an astrologer
        // opening a consultation later sees exactly this chart rather than
        // recomputing it. Failures here must not break the reading.
        if (user) {
          api.saveBirth({
            dob: data.date, tob: data.time, pob: data.place,
            latitude: data.lat, longitude: data.lon, tzOffset: "+05:30",
          }).then(() => refresh()).catch(() => {});

          api.saveChart(
            buildChartContext(computed, { name: data.name, place: data.place, date: data.date, time: data.time },
              new Date(), { latitude: data.lat, longitude: data.lon })
          ).catch(() => {});
        }
      } catch (e) {
        console.error(e);
        alert("Could not calculate the chart. Please check the birth details.");
      } finally {
        setLoading(false);
      }
    }, 30);
  }

  return (
    <div className="bg-vedic-gradient min-h-screen pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {!chart && (
          <>
            <CalcHero
              badge="100% Free & Accurate"
              titleTop="Free"
              titleBottom="Kundli"
              subtitle="Enter your birth details below to generate your detailed Vedic birth chart according to ancient astrological principles."
              tamil="உங்கள் ஜாதகத்தை இலவசமாகப் பெறுங்கள்"
            />
            <div className="max-w-xl mx-auto bg-white rounded-[2rem] shadow-lg border border-gray-100 p-7 md:p-9">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Enter Your Birth Details</h2>
              <BirthDetailsForm onGenerate={handle} loading={loading} />
              <p className="text-center text-xs text-gray-400 mt-4">Ancient Vedic Algorithms • 100% Secure</p>
            </div>
          </>
        )}

        {chart && meta && (
          <>
            <KundliResult chart={chart} meta={meta} onEdit={() => setChart(null)} />
            <div className="mt-12">
              <ChartAnalysisPanels chart={chart} place={place ?? undefined} />
            </div>
            <div className="mt-12">
              <AstroChat chart={chart} meta={meta} place={place ?? undefined} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default function FreeKundliPage() {
  return (
    <RequireAuth
      title="Sign in to generate your kundli"
      reason="Your chart is saved to your profile, so astrologers and the AI can read it."
    >
      <FreeKundliPageInner />
    </RequireAuth>
  );
}

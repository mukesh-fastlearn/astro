"use client";

import { useState } from "react";
import BirthDetailsForm, { BirthData } from "@/components/BirthDetailsForm";
import { calculateBirthChart, BirthChart } from "@/lib/astrology/kundli";
import CalcHero from "@/components/CalcHero";
import DashaResult from "@/components/DashaResult";

interface Meta {
  name: string;
  date: string;
  time: string;
  place: string;
}

export default function DashaTimelinePage() {
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);

  function handle(data: BirthData) {
    setLoading(true);
    setMeta({ name: data.name, date: data.date, time: data.time, place: data.place });
    setTimeout(() => {
      try {
        setChart(
          calculateBirthChart({ date: data.date, time: data.time, latitude: data.lat, longitude: data.lon, tzOffset: "+05:30" })
        );
      } catch (e) {
        console.error(e);
        alert("Could not calculate dasha periods.");
      } finally {
        setLoading(false);
      }
    }, 30);
  }

  return (
    <div className="bg-vedic-gradient min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {!chart && (
          <>
            <CalcHero
              badge="Vimshottari Dasha"
              titleTop="Vimshottari Dasha"
              titleBottom="Calculator"
              subtitle="Enter your birth details to generate your complete planetary period analysis. Explore Mahadasha, Antardasha, and Pratyantar periods with detailed life interpretations."
              tamil="தசா புத்தி காலம்"
            />
            <div className="max-w-xl mx-auto bg-white rounded-[2rem] shadow-lg border border-gray-100 p-7 md:p-9">
              <BirthDetailsForm onGenerate={handle} loading={loading} submitLabel="Generate Dasha Timeline" />
            </div>
          </>
        )}

        {chart && meta && (
          <DashaResult chart={chart} meta={meta} onEdit={() => { setChart(null); }} />
        )}
      </div>
    </div>
  );
}

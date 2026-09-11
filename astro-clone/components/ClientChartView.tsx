"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Grid3x3, Sparkles, ScrollText } from "lucide-react";
import { calculateBirthChart, BirthChart } from "@/lib/astrology/kundli";
import { BirthProfile } from "@/lib/api";
import KundliResult from "@/components/KundliResult";
import ChartAnalysisPanels from "@/components/ChartAnalysisPanels";
import AstroChat from "@/components/AstroChat";

type Tab = "charts" | "analysis" | "ai";

/**
 * Everything an astrologer needs about a client, in one place.
 *
 * The chart is recomputed in the astrologer's browser from the client's stored
 * birth details rather than being shipped over. The engine is deterministic —
 * same inputs, same output — so this is the identical chart the client saw,
 * and it yields the full BirthChart object (all 20 vargas, dashas, analysis)
 * instead of the trimmed JSON snapshot the API stores for the record.
 */
export default function ClientChartView({
  profile,
  clientName,
  snapshotAt,
}: {
  profile: BirthProfile | null;
  clientName: string;
  snapshotAt?: string;
}) {
  const [tab, setTab] = useState<Tab>("charts");

  const chart: BirthChart | null = useMemo(() => {
    if (!profile) return null;
    try {
      return calculateBirthChart({
        date: profile.dob,
        time: profile.tob,
        latitude: profile.latitude,
        longitude: profile.longitude,
        tzOffset: profile.tz_offset || "+05:30",
      });
    } catch {
      return null;
    }
  }, [profile]);

  const place = profile ? { latitude: profile.latitude, longitude: profile.longitude } : undefined;

  if (!profile) {
    return (
      <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6">
        <div className="flex items-start gap-2 text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>This client has not saved their birth details yet, so no chart can be shown.</span>
        </div>
      </div>
    );
  }

  if (!chart) {
    return (
      <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6">
        <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>The chart could not be computed from these birth details.</span>
        </div>
      </div>
    );
  }

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "charts", label: "Charts", icon: <Grid3x3 className="w-4 h-4" /> },
    { id: "analysis", label: "Analysis", icon: <ScrollText className="w-4 h-4" /> },
    { id: "ai", label: "Ask AI", icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Client summary */}
      <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-5 md:p-6">
        <h2 className="font-serif text-xl font-bold text-gray-900">{clientName}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-sm">
          <Field label="Date" value={profile.dob} />
          <Field label="Time" value={profile.tob} />
          <Field label="Place" value={profile.pob} />
          <Field label="Lagna" value={chart.ascendant} accent />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-sm border-t border-gray-100 pt-3">
          <Field label="Moon sign" value={chart.moonSign} accent />
          <Field label="Nakshatra" value={chart.nakshatra} accent />
          <Field label="Coords" value={`${profile.latitude.toFixed(2)}, ${profile.longitude.toFixed(2)}`} />
          {snapshotAt && <Field label="Saved" value={snapshotAt.slice(0, 10)} />}
        </div>
      </div>

      {/* Tabs — horizontal scroll so three tabs never wrap on a phone */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="flex gap-2 min-w-max">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={
                tab === t.id
                  ? "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-red text-white text-sm font-bold shrink-0"
                  : "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-bold hover:border-primary-saffron shrink-0"
              }
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "charts" && (
        <KundliResult
          chart={chart}
          meta={{ name: clientName, date: profile.dob, time: profile.tob, place: profile.pob }}
          onEdit={() => {}}
          hideActions
        />
      )}

      {tab === "analysis" && <ChartAnalysisPanels chart={chart} place={place} />}

      {tab === "ai" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 px-1">
            Ask the AI about this client&apos;s chart while you advise them. Astrologer accounts are
            not charged credits for this.
          </p>
          <AstroChat
            chart={chart}
            meta={{ name: clientName, date: profile.dob, time: profile.tob, place: profile.pob }}
            place={place}
          />
        </div>
      )}
    </div>
  );
}

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="min-w-0">
      <span className="block text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
      <span className={`font-bold truncate block ${accent ? "text-primary-red" : "text-gray-900"}`}>
        {value}
      </span>
    </div>
  );
}

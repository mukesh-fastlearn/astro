"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Sparkles, ScrollText, AlertCircle } from "lucide-react";
import RequireAuth from "@/components/RequireAuth";
import AstroChat from "@/components/AstroChat";
import { useAuth } from "@/components/AuthProvider";
import { calculateBirthChart } from "@/lib/astrology/kundli";

function AiChatInner() {
  const { birthProfile, balance, costPerMessage } = useAuth();

  // The chat is only useful with a chart behind it, so rebuild it from the
  // saved birth details rather than asking for them again.
  const chart = useMemo(() => {
    if (!birthProfile) return null;
    try {
      return calculateBirthChart({
        date: birthProfile.dob,
        time: birthProfile.tob,
        latitude: birthProfile.latitude,
        longitude: birthProfile.longitude,
        tzOffset: birthProfile.tz_offset || "+05:30",
      });
    } catch {
      return null;
    }
  }, [birthProfile]);

  return (
    <div className="min-h-screen bg-vedic-gradient pt-24 pb-8 px-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
            AI <span className="saffron-gradient">Astrologer</span>
          </h1>
          <p className="text-gray-600 text-sm font-medium mt-1">
            Reads your computed chart. {costPerMessage} credits per question · {balance} left.
          </p>
        </div>

        {!birthProfile || !chart ? (
          <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6 text-center">
            <AlertCircle className="w-8 h-8 text-primary-saffron mx-auto mb-3" />
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">Generate your kundli first</h2>
            <p className="text-sm text-gray-600 mb-5">
              The AI answers from your actual chart, so it needs your birth details.
            </p>
            <Link href="/free-kundli-tamil"
              className="inline-flex items-center gap-2 px-6 py-3 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider">
              <ScrollText className="w-4 h-4" /> Generate kundli
            </Link>
          </div>
        ) : (
          <AstroChat
            chart={chart}
            meta={{ date: birthProfile.dob, time: birthProfile.tob, place: birthProfile.pob }}
            place={{ latitude: birthProfile.latitude, longitude: birthProfile.longitude }}
          />
        )}

        <p className="text-center text-[11px] text-gray-400">
          <Sparkles className="w-3 h-3 inline mr-1" />
          Traditional Vedic interpretation for guidance. Not medical, legal or financial advice.
        </p>
      </div>
    </div>
  );
}

export default function AiChatPage() {
  return (
    <RequireAuth
      title="Sign in to use the AI astrologer"
      reason="Answers are based on your saved chart, so the AI astrologer needs an account."
    >
      <AiChatInner />
    </RequireAuth>
  );
}

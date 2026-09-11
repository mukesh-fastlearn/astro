"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2, MessageCircle, BadgeCheck, Circle, AlertCircle, Sparkles, ArrowRight,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { api, ApiError } from "@/lib/api";

interface Astro {
  id: string;
  name: string;
  bio: string | null;
  expertise: string | null;
  is_available: number;
}

const CARD = "bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6";

export default function AstrologersPage() {
  const { user, birthProfile, balance, costPerMessage, loading } = useAuth();
  const [list, setList] = useState<Astro[]>([]);
  const [fetching, setFetching] = useState(true);
  const [starting, setStarting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.astrologers()
      .then((r) => setList(r.astrologers))
      .catch(() => setError("Could not load the astrologer list."))
      .finally(() => setFetching(false));
  }, []);

  async function startChat(a: Astro) {
    setError(null);

    if (!user) { window.location.href = "/register"; return; }
    if (!birthProfile) {
      setError("Generate your kundli first so the astrologer can see your chart.");
      return;
    }

    setStarting(a.id);
    try {
      const r = await api.createConsultation(`Consultation with ${a.name}`);
      window.location.href = `/consult?id=${r.id}`;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not start the consultation.");
      setStarting(null);
    }
  }

  return (
    <div className="min-h-screen bg-vedic-gradient pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900">
            Talk to an <span className="saffron-gradient">Astrologer</span>
          </h1>
          <p className="text-gray-600 font-medium mt-2 max-w-xl mx-auto text-sm md:text-base">
            Every astrologer here sees your full computed chart — all 20 divisional charts, dashas,
            yogas and strengths. You never have to repeat your birth details.
          </p>
        </div>

        {user && (
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-primary-saffron/10 text-primary-red font-bold">
              {balance} credits
            </span>
            <span className="text-gray-500">{costPerMessage} credits per message</span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm max-w-xl mx-auto">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              {error}{" "}
              {!birthProfile && user && (
                <Link href="/free-kundli-tamil" className="font-bold underline">Generate kundli</Link>
              )}
            </span>
          </div>
        )}

        {fetching || loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary-red" /></div>
        ) : list.length === 0 ? (
          <div className={`${CARD} text-center`}>
            <p className="text-gray-600 text-sm">
              No astrologers are listed yet. In the meantime, the AI astrologer is available on every
              kundli.
            </p>
            <Link href="/free-kundli-tamil"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider">
              <Sparkles className="w-4 h-4" /> Open AI astrologer
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {list.map((a) => (
              <div key={a.id} className={`${CARD} flex flex-col`}>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-saffron to-primary-red text-white font-serif font-bold text-lg flex items-center justify-center shrink-0">
                    {a.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif text-lg font-bold text-gray-900 truncate">{a.name}</h3>
                      <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                      a.is_available ? "text-emerald-600" : "text-gray-400"}`}>
                      <Circle className={`w-2 h-2 ${a.is_available ? "fill-emerald-600" : "fill-gray-400"}`} />
                      {a.is_available ? "Available" : "Busy"}
                    </span>
                  </div>
                </div>

                {a.expertise && (
                  <p className="text-xs font-bold text-primary-red mt-3">{a.expertise}</p>
                )}
                {a.bio && <p className="text-sm text-gray-600 mt-1 flex-1">{a.bio}</p>}

                <button
                  onClick={() => startChat(a)}
                  disabled={starting === a.id}
                  className="mt-4 w-full px-5 py-3 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {starting === a.id
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <MessageCircle className="w-4 h-4" />}
                  {user ? "Start chat" : "Sign up to chat"}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={`${CARD} text-center`}>
          <Sparkles className="w-7 h-7 text-primary-saffron mx-auto mb-2" />
          <h2 className="font-serif text-xl font-bold text-gray-900">Prefer an instant answer?</h2>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            The AI astrologer reads the same computed chart and replies immediately.
          </p>
          <Link href="/free-kundli-tamil"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-red hover:underline">
            Open AI astrologer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

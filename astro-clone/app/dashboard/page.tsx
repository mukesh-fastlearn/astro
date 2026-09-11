"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wallet, ScrollText, MessageCircle, Sparkles, Loader2, ArrowRight, Clock, User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { api, Consultation, LedgerRow } from "@/lib/api";

const CARD = "bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6 md:p-7";

const REASON_LABEL: Record<string, string> = {
  signup_bonus: "Welcome bonus",
  ai_chat: "AI astrologer",
  ai_chat_refund: "Refund",
  astrologer_chat: "Astrologer chat",
  test_recharge: "Recharge",
};

export default function DashboardPage() {
  const { user, balance, birthProfile, costPerMessage, loading } = useAuth();
  const [ledger, setLedger] = useState<LedgerRow[]>([]);
  const [consults, setConsults] = useState<Consultation[]>([]);
  const [aiSessions, setAiSessions] = useState<{ session_id: string; messages: number; first_question: string }[]>([]);

  useEffect(() => {
    if (!user) return;
    api.wallet().then((w) => setLedger(w.ledger)).catch(() => {});
    api.consultations().then((c) => setConsults(c.consultations)).catch(() => {});
    api.aiSessions().then((s) => setAiSessions(s.sessions)).catch(() => {});
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-vedic-gradient pt-32 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary-red" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-vedic-gradient pt-32 px-4">
        <div className={`${CARD} max-w-md mx-auto text-center`}>
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Please sign in</h1>
          <p className="text-gray-600 text-sm mb-6">Your charts, wallet and consultations live here.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="px-6 py-3 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider">Sign in</Link>
            <Link href="/register" className="px-6 py-3 rounded-xl border-2 border-primary-red text-primary-red font-bold uppercase text-sm tracking-wider">Create account</Link>
          </div>
        </div>
      </div>
    );
  }

  if (user.role === "astrologer" || user.role === "admin") {
    return (
      <div className="min-h-screen bg-vedic-gradient pt-28 pb-16 px-4">
        <div className={`${CARD} max-w-md mx-auto text-center`}>
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Astrologer account</h1>
          <p className="text-gray-600 text-sm mb-6">Your inquiries and consultations are in the astrologer panel.</p>
          <Link href="/astrologer" className="inline-flex px-6 py-3 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider">Open panel</Link>
        </div>
      </div>
    );
  }

  const messagesLeft = Math.floor(balance / costPerMessage);

  return (
    <div className="min-h-screen bg-vedic-gradient pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
            Namaste, {user.name.split(" ")[0]}
          </h1>
          <p className="text-gray-600 text-sm font-medium mt-1">{user.email}</p>
        </div>

        {/* Wallet */}
        <div className={CARD}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-saffron to-primary-red text-white flex items-center justify-center shrink-0">
                <Wallet className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-gray-900 leading-none">{balance}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">credits</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">{messagesLeft} messages left</div>
              <div className="text-xs text-gray-500">{costPerMessage} credits each</div>
            </div>
          </div>

          {ledger.length > 0 && (
            <div className="mt-6 border-t border-gray-100 pt-4 space-y-1.5 max-h-52 overflow-y-auto">
              {ledger.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{REASON_LABEL[r.reason] ?? r.reason}</span>
                  <span className="flex items-center gap-3">
                    <span className={r.delta > 0 ? "text-emerald-600 font-bold" : "text-gray-700 font-bold"}>
                      {r.delta > 0 ? "+" : ""}{r.delta}
                    </span>
                    <span className="text-gray-400 text-xs w-10 text-right">{r.balance_after}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="text-[11px] text-gray-400 mt-4">
            Recharging with real money is not connected yet — Razorpay is pending.
          </p>
        </div>

        {/* Birth details */}
        <div className={CARD}>
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-primary-red" /> Birth details
          </h2>
          {birthProfile ? (
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <div><span className="text-gray-500 block text-xs uppercase tracking-wider">Date</span><span className="font-bold text-gray-900">{birthProfile.dob}</span></div>
              <div><span className="text-gray-500 block text-xs uppercase tracking-wider">Time</span><span className="font-bold text-gray-900">{birthProfile.tob}</span></div>
              <div><span className="text-gray-500 block text-xs uppercase tracking-wider">Place</span><span className="font-bold text-gray-900">{birthProfile.pob}</span></div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">
              Not saved yet. Generate your kundli and it will be stored so an astrologer can see your chart.
            </p>
          )}
          <Link href="/free-kundli-tamil" className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-primary-red hover:underline">
            {birthProfile ? "Open my kundli" : "Generate my kundli"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tools */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/free-kundli-tamil" className={`${CARD} hover:shadow-xl transition group`}>
            <ScrollText className="w-8 h-8 text-primary-saffron mb-3" />
            <h3 className="font-serif text-lg font-bold text-gray-900">Kundli &amp; AI chat</h3>
            <p className="text-sm text-gray-600 mt-1">Full chart, 20 vargas, and the AI astrologer.</p>
          </Link>
          <Link href="/consult" className={`${CARD} hover:shadow-xl transition group`}>
            <MessageCircle className="w-8 h-8 text-primary-saffron mb-3" />
            <h3 className="font-serif text-lg font-bold text-gray-900">Consult an astrologer</h3>
            <p className="text-sm text-gray-600 mt-1">Talk to a real astrologer who sees your chart.</p>
          </Link>
        </div>

        {/* Consultations */}
        {consults.length > 0 && (
          <div className={CARD}>
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Your consultations</h2>
            <div className="space-y-2">
              {consults.map((c) => (
                <Link key={c.id} href={`/consult?id=${c.id}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary-saffron transition">
                  <span className="min-w-0">
                    <span className="block font-bold text-gray-900 text-sm truncate">{c.subject}</span>
                    <span className="block text-xs text-gray-500">
                      {c.astrologer_name ? `with ${c.astrologer_name}` : "waiting for an astrologer"}
                    </span>
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shrink-0 ${
                    c.status === "closed" ? "bg-gray-100 text-gray-500" :
                    c.status === "assigned" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {c.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* AI history */}
        {aiSessions.length > 0 && (
          <div className={CARD}>
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-red" /> Past AI conversations
            </h2>
            <div className="space-y-2">
              {aiSessions.slice(0, 8).map((s) => (
                <div key={s.session_id} className="flex items-center justify-between gap-3 text-sm border-b border-gray-50 pb-2">
                  <span className="text-gray-700 truncate">{s.first_question}</span>
                  <span className="text-xs text-gray-400 shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {s.messages}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

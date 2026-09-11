"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, MessageCircle, ArrowLeft, AlertCircle, BadgeCheck } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import ConsultThread from "@/components/ConsultThread";
import { api, ApiError, Consultation, ConsultMessage } from "@/lib/api";

const CARD = "bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6 md:p-7";

function ConsultInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const { user, loading, balance, setBalance, birthProfile, costPerMessage } = useAuth();

  const [list, setList] = useState<Consultation[]>([]);
  const [astrologers, setAstrologers] = useState<{ id: string; name: string; bio: string | null; expertise: string | null; is_available: number }[]>([]);
  const [thread, setThread] = useState<{ consultation: Consultation; messages: ConsultMessage[] } | null>(null);
  const [subject, setSubject] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadList = useCallback(() => {
    api.consultations().then((r) => setList(r.consultations)).catch(() => {});
    api.astrologers().then((r) => setAstrologers(r.astrologers)).catch(() => {});
  }, []);

  useEffect(() => {
    if (user) loadList();
  }, [user, loadList]);

  useEffect(() => {
    if (!id || !user) { setThread(null); return; }
    api.consultation(id)
      .then((r) => setThread({ consultation: r.consultation, messages: r.messages }))
      .catch((e) => setError(e instanceof ApiError ? e.message : "Could not open that consultation."));
  }, [id, user]);

  async function start(e: React.FormEvent) {
    e.preventDefault();
    const s = subject.trim();
    if (!s || busy) return;
    setBusy(true); setError(null);
    try {
      const r = await api.createConsultation(s);
      window.location.href = `/consult?id=${r.id}`;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not start the consultation.");
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-vedic-gradient pt-32 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary-red" /></div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-vedic-gradient pt-32 px-4">
        <div className={`${CARD} max-w-md mx-auto text-center`}>
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Sign in to consult</h1>
          <p className="text-gray-600 text-sm mb-6">An astrologer needs your chart, so you will need an account.</p>
          <Link href="/register" className="inline-flex px-6 py-3 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider">Create account</Link>
        </div>
      </div>
    );
  }

  if (thread) {
    return (
      <div className="min-h-screen bg-vedic-gradient pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href="/consult" className="inline-flex items-center gap-2 text-sm font-bold text-primary-red hover:underline">
            <ArrowLeft className="w-4 h-4" /> All consultations
          </Link>
          <ConsultThread
            consultationId={thread.consultation.id}
            consultation={thread.consultation}
            initialMessages={thread.messages}
            onBalanceChange={setBalance}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vedic-gradient pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Consult an astrologer</h1>
          <p className="text-gray-600 text-sm font-medium mt-1">
            They see your full computed chart — no need to repeat your birth details.
          </p>
        </div>

        <div className={CARD}>
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="font-bold text-gray-900">{balance} credits</span>
            <span className="text-gray-500">{costPerMessage} per message</span>
          </div>

          {!birthProfile ? (
            <div className="flex items-start gap-2 text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                Generate your kundli first so the astrologer can see your chart.{" "}
                <Link href="/free-kundli-tamil" className="font-bold underline">Do that now</Link>.
              </span>
            </div>
          ) : (
            <form onSubmit={start} className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500" htmlFor="subject">
                What would you like to discuss?
              </label>
              <input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={busy}
                maxLength={300}
                placeholder="e.g. Timing of marriage, career direction, a specific worry"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-saffron focus:ring-2 focus:ring-primary-saffron/20 outline-none text-base"
              />
              {error && (
                <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> <span>{error}</span>
                </div>
              )}
              <button type="submit" disabled={busy || !subject.trim()}
                className="w-full sm:w-auto px-6 py-3 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider flex items-center justify-center gap-2 disabled:opacity-50">
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                <MessageCircle className="w-4 h-4" /> Start consultation
              </button>
            </form>
          )}
        </div>

        {list.length > 0 && (
          <div className={CARD}>
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Your consultations</h2>
            <div className="space-y-2">
              {list.map((c) => (
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

        {astrologers.length > 0 && (
          <div className={CARD}>
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Our astrologers</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {astrologers.map((a) => (
                <div key={a.id} className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">{a.name}</span>
                    {a.is_available === 1 && <BadgeCheck className="w-4 h-4 text-emerald-600" />}
                  </div>
                  {a.expertise && <p className="text-xs text-primary-red font-bold">{a.expertise}</p>}
                  {a.bio && <p className="text-xs text-gray-600 mt-1">{a.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConsultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vedic-gradient pt-32 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary-red" /></div>}>
      <ConsultInner />
    </Suspense>
  );
}

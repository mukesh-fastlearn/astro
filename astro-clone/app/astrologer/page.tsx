"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, ArrowLeft, Inbox, Hand, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import ConsultThread from "@/components/ConsultThread";
import { api, ApiError, BirthProfile, Consultation, ConsultMessage } from "@/lib/api";
import ClientChartView from "@/components/ClientChartView";

const CARD = "bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6 md:p-7";

function AstrologerInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const { user, loading } = useAuth();

  const [list, setList] = useState<Consultation[]>([]);
  const [detail, setDetail] = useState<{
    consultation: Consultation; messages: ConsultMessage[];
    userChart: { chart: unknown } | null; userBirthProfile: BirthProfile | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const loadList = useCallback(() => {
    api.consultations().then((r) => setList(r.consultations)).catch(() => {});
  }, []);

  const loadDetail = useCallback(() => {
    if (!id) { setDetail(null); return; }
    api.consultation(id).then(setDetail)
      .catch((e) => setError(e instanceof ApiError ? e.message : "Could not open that inquiry."));
  }, [id]);

  useEffect(() => { if (user) loadList(); }, [user, loadList]);
  useEffect(() => { if (user) loadDetail(); }, [user, loadDetail]);

  // Keep the inbox fresh while it is on screen.
  useEffect(() => {
    if (!user || id) return;
    const t = setInterval(loadList, 10000);
    return () => clearInterval(t);
  }, [user, id, loadList]);

  async function claim() {
    if (!id || busy) return;
    setBusy(true);
    try { await api.claim(id); loadDetail(); }
    catch (e) { setError(e instanceof ApiError ? e.message : "Could not claim."); }
    finally { setBusy(false); }
  }

  async function close() {
    if (!id || busy) return;
    setBusy(true);
    try { await api.close(id); loadDetail(); }
    catch { /* ignore */ }
    finally { setBusy(false); }
  }

  if (loading) {
    return <div className="min-h-screen bg-vedic-gradient pt-32 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary-red" /></div>;
  }

  if (!user || (user.role !== "astrologer" && user.role !== "admin")) {
    return (
      <div className="min-h-screen bg-vedic-gradient pt-32 px-4">
        <div className={`${CARD} max-w-md mx-auto text-center`}>
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Astrologers only</h1>
          <p className="text-gray-600 text-sm mb-6">
            This panel is for astrologer accounts. Astrologer access is granted by the site owner, not self-service.
          </p>
          <Link href="/dashboard" className="inline-flex px-6 py-3 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider">My dashboard</Link>
        </div>
      </div>
    );
  }

  if (detail) {
    const c = detail.consultation;
    return (
      <div className="min-h-screen bg-vedic-gradient pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/astrologer" className="inline-flex items-center gap-2 text-sm font-bold text-primary-red hover:underline">
              <ArrowLeft className="w-4 h-4" /> Inbox
            </Link>
            <div className="flex gap-2">
              {!c.astrologer_id && (
                <button onClick={claim} disabled={busy}
                  className="px-4 py-2 saffron-button font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50">
                  <Hand className="w-3.5 h-3.5" /> Claim
                </button>
              )}
              {c.status !== "closed" && c.astrologer_id === user.id && (
                <button onClick={close} disabled={busy}
                  className="px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Close
                </button>
              )}
            </div>
          </div>

          {!c.astrologer_id && (
            <div className="flex items-start gap-2 text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Claim this inquiry before replying, so another astrologer does not answer the same client.</span>
            </div>
          )}

          {/* Chat first on mobile so the astrologer can reply without scrolling
              past the whole chart; side by side from lg upward. */}
          <div className="grid lg:grid-cols-2 gap-4 items-start">
            <div className="order-2 lg:order-1">
              <ClientChartView
                profile={detail.userBirthProfile}
                clientName={c.user_name || "Client"}
                snapshotAt={detail.userChart ? (detail.userChart as { computedAt?: string }).computedAt : undefined}
              />
            </div>
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <ConsultThread
                consultationId={c.id}
                consultation={c}
                initialMessages={detail.messages}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const unclaimed = list.filter((c) => !c.astrologer_id);
  const mine = list.filter((c) => c.astrologer_id === user.id);

  return (
    <div className="min-h-screen bg-vedic-gradient pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Astrologer panel</h1>
          <p className="text-gray-600 text-sm font-medium mt-1">{user.name}</p>
        </div>

        {error && (
          <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> <span>{error}</span>
          </div>
        )}

        <Section title="New inquiries" icon={<Inbox className="w-5 h-5 text-primary-red" />} rows={unclaimed}
          empty="No unclaimed inquiries right now." />
        <Section title="My consultations" icon={<CheckCircle2 className="w-5 h-5 text-primary-red" />} rows={mine}
          empty="You have not claimed any consultations yet." />
      </div>
    </div>
  );
}

function Section({ title, icon, rows, empty }: {
  title: string; icon: React.ReactNode; rows: Consultation[]; empty: string;
}) {
  return (
    <div className={CARD}>
      <h2 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">{icon} {title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">{empty}</p>
      ) : (
        <div className="space-y-2">
          {rows.map((c) => (
            <Link key={c.id} href={`/astrologer?id=${c.id}`}
              className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary-saffron transition">
              <span className="min-w-0">
                <span className="block font-bold text-gray-900 text-sm truncate">{c.subject}</span>
                <span className="block text-xs text-gray-500">{c.user_name} · {c.user_email}</span>
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shrink-0 ${
                c.status === "closed" ? "bg-gray-100 text-gray-500" :
                c.status === "assigned" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {c.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AstrologerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vedic-gradient pt-32 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary-red" /></div>}>
      <AstrologerInner />
    </Suspense>
  );
}

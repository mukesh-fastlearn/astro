"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2, Users, Wallet, MessageCircle, Activity, Search, AlertTriangle,
  ShieldCheck, Database, TrendingUp, Star, RefreshCw,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const CARD = "bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5";
const API = {
  overview: "/api/admin/overview",
  series: "/api/admin/timeseries?days=30",
  users: "/api/admin/users",
  astrologers: "/api/admin/astrologers",
  ledger: "/api/admin/ledger",
};

type Tab = "overview" | "users" | "astrologers" | "wallet";

interface Overview {
  users: { total: number; users: number; astrologers: number; admins: number; newToday: number; new7: number; new30: number };
  engagement: { withBirthProfile: number; withSavedChart: number; profileCompletionPct: number; aiSessions: number; aiQuestions: number; consultMessages: number };
  consultations: { total: number; open: number; assigned: number; closed: number };
  credits: { outstanding: number; granted: number; spent: number; spentOnAi: number; spentOnAstrologers: number; refunded: number; note: string; ledgerDrift: unknown[] };
  verification: { email: number; phone: number; providers: { email: string; sms: string; configured: boolean; devEcho: boolean } };
}

async function get<T>(url: string): Promise<T> {
  const r = await fetch(url, { credentials: "same-origin" });
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
}

function AdminInner() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [ov, setOv] = useState<Overview | null>(null);
  const [sys, setSys] = useState<{ dbBytes: number; sessionsActive: number; nodeVersion: string; uptimeSeconds: number } | null>(null);
  const [series, setSeries] = useState<{ day: string; signups: number; creditsSpent: number; messages: number }[]>([]);
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);
  const [userTotal, setUserTotal] = useState(0);
  const [astros, setAstros] = useState<Record<string, unknown>[]>([]);
  const [ledger, setLedger] = useState<Record<string, unknown>[]>([]);
  const [topSpenders, setTop] = useState<Record<string, unknown>[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const [o, s] = await Promise.all([
        get<{ overview: Overview; system: typeof sys }>(API.overview),
        get<{ series: typeof series }>(API.series),
      ]);
      setOv(o.overview);
      setSys(o.system);
      setSeries(s.series);
    } catch { /* the guard below covers the unauthorised case */ }
    setBusy(false);
  }, []);

  useEffect(() => { if (user?.role === "admin") load(); }, [user, load]);

  useEffect(() => {
    if (user?.role !== "admin") return;
    if (tab === "users") {
      get<{ rows: Record<string, unknown>[]; total: number }>(`${API.users}?q=${encodeURIComponent(q)}&limit=200`)
        .then((r) => { setUsers(r.rows); setUserTotal(r.total); }).catch(() => {});
    }
    if (tab === "astrologers") {
      get<{ astrologers: Record<string, unknown>[] }>(API.astrologers).then((r) => setAstros(r.astrologers)).catch(() => {});
    }
    if (tab === "wallet") {
      get<{ ledger: Record<string, unknown>[]; topSpenders: Record<string, unknown>[] }>(API.ledger)
        .then((r) => { setLedger(r.ledger); setTop(r.topSpenders); }).catch(() => {});
    }
  }, [tab, q, user]);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 pt-32 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary-red" /></div>;
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 px-4">
        <div className={`${CARD} max-w-md mx-auto text-center`}>
          <ShieldCheck className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Admin only</h1>
          <p className="text-gray-600 text-sm mb-5">
            Admin access is granted on the server, never through sign-up.
          </p>
          <Link href="/dashboard" className="inline-flex px-6 py-3 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider">
            My dashboard
          </Link>
        </div>
      </div>
    );
  }

  const maxSignup = Math.max(1, ...series.map((d) => d.signups));
  const maxSpend = Math.max(1, ...series.map((d) => d.creditsSpent));

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-3 md:px-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">Admin</h1>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
          <button onClick={load} disabled={busy}
            className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-primary-red" aria-label="Refresh">
            <RefreshCw className={`w-4 h-4 ${busy ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <div className="flex gap-2 min-w-max">
            {([
              ["overview", "Overview", <Activity key="a" className="w-4 h-4" />],
              ["users", "Users", <Users key="u" className="w-4 h-4" />],
              ["astrologers", "Astrologers", <Star key="s" className="w-4 h-4" />],
              ["wallet", "Wallet", <Wallet key="w" className="w-4 h-4" />],
            ] as [Tab, string, React.ReactNode][]).map(([id, label, icon]) => (
              <button key={id} onClick={() => setTab(id)}
                className={tab === id
                  ? "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-red text-white text-sm font-bold shrink-0"
                  : "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-bold shrink-0"}>
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Anything that means the books do not balance belongs at the top. */}
        {ov && ov.credits.ledgerDrift.length > 0 && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 text-sm">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              <strong>{ov.credits.ledgerDrift.length} wallet(s) disagree with their ledger.</strong>{" "}
              A balance was written outside a transaction — investigate before trusting the credit figures.
            </span>
          </div>
        )}

        {tab === "overview" && ov && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="Total users" value={ov.users.users} sub={`+${ov.users.newToday} today`} icon={<Users className="w-4 h-4" />} />
              <Stat label="Astrologers" value={ov.users.astrologers} sub={`${ov.users.admins} admin`} icon={<Star className="w-4 h-4" />} />
              <Stat label="Consultations" value={ov.consultations.total} sub={`${ov.consultations.open} open`} icon={<MessageCircle className="w-4 h-4" />} />
              <Stat label="AI questions" value={ov.engagement.aiQuestions} sub={`${ov.engagement.aiSessions} sessions`} icon={<Activity className="w-4 h-4" />} />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className={CARD}>
                <h2 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary-red" /> Signups — last 30 days
                </h2>
                <Spark data={series.map((d) => d.signups)} max={maxSignup} />
                <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                  <Mini label="Today" value={ov.users.newToday} />
                  <Mini label="7 days" value={ov.users.new7} />
                  <Mini label="30 days" value={ov.users.new30} />
                </div>
              </div>

              <div className={CARD}>
                <h2 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-primary-red" /> Credits spent — last 30 days
                </h2>
                <Spark data={series.map((d) => d.creditsSpent)} max={maxSpend} />
                <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                  <Mini label="AI" value={ov.credits.spentOnAi} />
                  <Mini label="Astrologer" value={ov.credits.spentOnAstrologers} />
                  <Mini label="Refunded" value={ov.credits.refunded} />
                </div>
              </div>
            </div>

            <div className={CARD}>
              <h2 className="font-bold text-gray-900 text-sm mb-3">Credits</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Mini label="Outstanding" value={ov.credits.outstanding} big />
                <Mini label="Granted" value={ov.credits.granted} big />
                <Mini label="Spent" value={ov.credits.spent} big />
              </div>
              <p className="text-[11px] text-gray-500 mt-3">{ov.credits.note}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className={CARD}>
                <h2 className="font-bold text-gray-900 text-sm mb-3">Engagement</h2>
                <Row label="Saved birth details" value={`${ov.engagement.withBirthProfile} (${ov.engagement.profileCompletionPct}%)`} />
                <Row label="Saved charts" value={ov.engagement.withSavedChart} />
                <Row label="Consultation messages" value={ov.engagement.consultMessages} />
                <Row label="Assigned / closed" value={`${ov.consultations.assigned} / ${ov.consultations.closed}`} />
              </div>

              <div className={CARD}>
                <h2 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary-red" /> System
                </h2>
                {sys && (
                  <>
                    <Row label="Database size" value={`${(sys.dbBytes / 1024 / 1024).toFixed(2)} MB`} />
                    <Row label="Active sessions" value={sys.sessionsActive} />
                    <Row label="Node" value={sys.nodeVersion} />
                    <Row label="Uptime" value={`${Math.floor(sys.uptimeSeconds / 3600)}h ${Math.floor((sys.uptimeSeconds % 3600) / 60)}m`} />
                  </>
                )}
                <Row label="Email verified" value={ov.verification.email} />
                <Row label="Phone verified" value={ov.verification.phone} />
                <div className={`mt-3 rounded-xl px-3 py-2 text-[11px] ${
                  ov.verification.providers.configured
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"}`}>
                  OTP providers — email: <strong>{ov.verification.providers.email}</strong>, sms:{" "}
                  <strong>{ov.verification.providers.sms}</strong>
                  {!ov.verification.providers.configured &&
                    ". No real provider configured, so codes are only written to the server log."}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "users" && (
          <div className={CARD}>
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-saffron" />
              <span className="text-xs text-gray-500 shrink-0">{userTotal} total</span>
            </div>
            <Table
              head={["Name", "Email", "Role", "Balance", "Spent", "Consults", "AI", "Chart", "Joined"]}
              rows={users.map((u) => [
                String(u.name), String(u.email), String(u.role),
                String(u.balance), String(u.credits_spent), String(u.consultations),
                String(u.ai_questions), u.has_birth_profile ? "yes" : "—",
                String(u.created_at).slice(0, 10),
              ])}
            />
          </div>
        )}

        {tab === "astrologers" && (
          <div className={CARD}>
            <h2 className="font-bold text-gray-900 text-sm mb-3">Astrologers</h2>
            {astros.length === 0 ? (
              <p className="text-sm text-gray-500">
                None yet. Promote one on the server:{" "}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">node make-astrologer.mjs promote email@example.com</code>
              </p>
            ) : (
              <Table
                head={["Name", "Email", "Expertise", "Clients", "Consults", "Replies", "Credits billed", "Joined"]}
                rows={astros.map((a) => [
                  String(a.name), String(a.email), String(a.expertise ?? "—"),
                  String(a.clients), String(a.consultations), String(a.replies),
                  String(a.credits_earned_for_site), String(a.created_at).slice(0, 10),
                ])}
              />
            )}
          </div>
        )}

        {tab === "wallet" && (
          <>
            <div className={CARD}>
              <h2 className="font-bold text-gray-900 text-sm mb-3">Top spenders</h2>
              <Table head={["Name", "Email", "Spent", "Balance"]}
                rows={topSpenders.map((t) => [String(t.name), String(t.email), String(t.spent), String(t.balance)])} />
            </div>
            <div className={CARD}>
              <h2 className="font-bold text-gray-900 text-sm mb-3">Recent ledger</h2>
              <Table head={["When", "User", "Change", "Balance", "Reason"]}
                rows={ledger.map((l) => [
                  String(l.created_at), String(l.name),
                  `${Number(l.delta) > 0 ? "+" : ""}${l.delta}`,
                  String(l.balance_after), String(l.reason),
                ])} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, sub, icon }: { label: string; value: number; sub?: string; icon: React.ReactNode }) {
  return (
    <div className={CARD}>
      <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-gray-500">{icon} {label}</span>
      <span className="block font-serif text-2xl font-bold text-gray-900 mt-1">{value}</span>
      {sub && <span className="block text-[11px] text-gray-500">{sub}</span>}
    </div>
  );
}

function Mini({ label, value, big }: { label: string; value: number; big?: boolean }) {
  return (
    <div className="rounded-lg bg-gray-50 py-2">
      <div className={`font-bold text-gray-900 ${big ? "text-lg" : "text-sm"}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-gray-50 text-sm last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}

/** Tiny inline bar chart — no charting library for a 30-bar sparkline. */
function Spark({ data, max }: { data: number[]; max: number }) {
  return (
    <div className="flex items-end gap-[2px] h-20">
      {data.map((v, i) => (
        <div key={i} className="flex-1 bg-primary-saffron/25 rounded-sm relative group" style={{ height: "100%" }}>
          <div className="absolute bottom-0 inset-x-0 bg-primary-red rounded-sm transition-all"
            style={{ height: `${(v / max) * 100}%` }} title={String(v)} />
        </div>
      ))}
    </div>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto -mx-4 md:-mx-5 px-4 md:px-5">
      <table className="w-full text-sm min-w-max">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-widest text-gray-500 border-b border-gray-100">
            {head.map((h) => <th key={h} className="py-2 pr-4 whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={head.length} className="py-4 text-gray-400 text-center">Nothing yet.</td></tr>
          ) : rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-50">
              {r.map((c, j) => (
                <td key={j} className={`py-2 pr-4 whitespace-nowrap ${j === 0 ? "font-bold text-gray-800" : "text-gray-600"}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-32 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary-red" /></div>}>
      <AdminInner />
    </Suspense>
  );
}

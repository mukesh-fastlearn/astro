"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Mail, Smartphone, AlertCircle, CheckCircle2 } from "lucide-react";

type Channel = "email" | "sms";

interface SendResult {
  sent: boolean;
  provider: string;
  expiresInMinutes: number;
  devCode?: string;
}

/**
 * Verify an email address or phone number by one-time code.
 *
 * When no provider is configured the backend's "console" sender writes the
 * code to the server log instead of delivering it, and this shows that plainly
 * rather than pretending a message is on its way.
 */
export default function VerifyOtp({
  channel,
  defaultTarget = "",
  verified,
  onVerified,
}: {
  channel: Channel;
  defaultTarget?: string;
  verified?: boolean;
  onVerified?: () => void;
}) {
  const [target, setTarget] = useState(defaultTarget);
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"idle" | "sent" | "done">(verified ? "done" : "idle");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<SendResult | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function post(url: string, body: unknown) {
    const r = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw Object.assign(new Error(data.error || "Request failed"), data);
    return data;
  }

  async function send() {
    if (busy || cooldown > 0) return;
    setBusy(true); setError(null);
    try {
      const r: SendResult = await post("/api/otp/send", { target: target.trim(), channel });
      setInfo(r);
      setStage("sent");
      setCooldown(60);
    } catch (e) {
      const err = e as Error & { retryAfter?: number };
      setError(err.message);
      if (err.retryAfter) setCooldown(err.retryAfter);
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    if (busy) return;
    setBusy(true); setError(null);
    try {
      await post("/api/otp/verify", { target: target.trim(), channel, code: code.trim() });
      setStage("done");
      onVerified?.();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const Icon = channel === "email" ? Mail : Smartphone;
  const label = channel === "email" ? "Email" : "Phone";

  if (stage === "done") {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span><strong>{label} verified.</strong> {target && <span className="text-emerald-700">{target}</span>}</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 p-4">
      <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-primary-red" /> Verify your {label.toLowerCase()}
      </h3>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          disabled={busy || stage === "sent"}
          type={channel === "email" ? "email" : "tel"}
          inputMode={channel === "email" ? "email" : "tel"}
          placeholder={channel === "email" ? "you@example.com" : "+919876543210"}
          className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 text-base outline-none focus:border-primary-saffron disabled:bg-gray-50"
        />
        <button
          onClick={send}
          disabled={busy || !target.trim() || cooldown > 0}
          className="px-5 py-3 saffron-button font-bold rounded-xl text-sm uppercase tracking-wider disabled:opacity-40 shrink-0"
        >
          {busy && stage === "idle" ? <Loader2 className="w-4 h-4 animate-spin" />
            : cooldown > 0 ? `${cooldown}s` : stage === "sent" ? "Resend" : "Send code"}
        </button>
      </div>

      {stage === "sent" && (
        <>
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="6-digit code"
              className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 text-base tracking-[0.4em] font-bold text-center outline-none focus:border-primary-saffron"
            />
            <button
              onClick={verify}
              disabled={busy || code.length !== 6}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider disabled:opacity-40 shrink-0 flex items-center justify-center gap-1.5"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />} Verify
            </button>
          </div>

          {info?.provider === "console" && (
            <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-[11px] text-amber-800">
              <strong>No {channel === "email" ? "email" : "SMS"} provider is configured.</strong> The code was written
              to the server log instead of being sent.
              {info.devCode && <span className="block mt-1 font-mono text-sm">Code: {info.devCode}</span>}
            </div>
          )}
          {info && info.provider !== "console" && (
            <p className="mt-2 text-[11px] text-gray-500">
              Sent via {info.provider}. Expires in {info.expiresInMinutes} minutes.
            </p>
          )}
        </>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> <span>{error}</span>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, AlertCircle, Sparkles } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

const INPUT =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-saffron focus:ring-2 focus:ring-primary-saffron/20 outline-none text-base font-medium disabled:bg-gray-50";
const LABEL = "block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { refresh } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      if (mode === "register") {
        await api.register({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          phone: form.phone.trim() || undefined,
        });
      } else {
        await api.login({ email: form.email.trim(), password: form.password });
      }
      await refresh();
      // Full navigation so the whole app picks up the new session.
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-vedic-gradient pt-28 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-7">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
            {mode === "register" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-gray-600 mt-2 text-sm font-medium">
            {mode === "register"
              ? "Save your kundli, talk to our AI astrologer, and consult a real astrologer."
              : "Sign in to your charts, wallet and consultations."}
          </p>
        </div>

        {mode === "register" && (
          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-primary-saffron/30 bg-primary-saffron/10 px-4 py-3">
            <Sparkles className="w-5 h-5 text-primary-red shrink-0" />
            <p className="text-sm font-bold text-primary-red">
              501 free credits on sign-up
              <span className="block font-medium text-gray-600 text-xs">
                Enough for 25 questions at 20 credits each.
              </span>
            </p>
          </div>
        )}

        <form
          onSubmit={submit}
          className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6 md:p-8 space-y-4"
        >
          {mode === "register" && (
            <div>
              <label className={LABEL} htmlFor="name">Full name</label>
              <input id="name" className={INPUT} value={form.name} onChange={set("name")}
                required disabled={busy} autoComplete="name" />
            </div>
          )}

          <div>
            <label className={LABEL} htmlFor="email">Email</label>
            <input id="email" type="email" inputMode="email" className={INPUT}
              value={form.email} onChange={set("email")} required disabled={busy}
              autoComplete="email" />
          </div>

          <div>
            <label className={LABEL} htmlFor="password">Password</label>
            <input id="password" type="password" className={INPUT}
              value={form.password} onChange={set("password")} required disabled={busy}
              minLength={mode === "register" ? 8 : undefined}
              autoComplete={mode === "register" ? "new-password" : "current-password"} />
            {mode === "register" && (
              <p className="text-[11px] text-gray-400 mt-1">At least 8 characters.</p>
            )}
          </div>

          {mode === "register" && (
            <div>
              <label className={LABEL} htmlFor="phone">Phone (optional)</label>
              <input id="phone" type="tel" inputMode="tel" className={INPUT}
                value={form.phone} onChange={set("phone")} disabled={busy} autoComplete="tel" />
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full px-6 py-3.5 saffron-button font-bold rounded-xl text-base uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {busy && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "register" ? "Create account" : "Sign in"}
          </button>

          <p className="text-center text-sm text-gray-600 pt-1">
            {mode === "register" ? (
              <>Already have an account? <Link href="/login" className="font-bold text-primary-red hover:underline">Sign in</Link></>
            ) : (
              <>New here? <Link href="/register" className="font-bold text-primary-red hover:underline">Create an account</Link></>
            )}
          </p>
        </form>

        <p className="text-center text-[11px] text-gray-400 mt-5 leading-relaxed">
          Your birth details are stored so your charts and consultations work.
          They are shared with an astrologer only when you start a consultation.
        </p>
      </div>
    </div>
  );
}

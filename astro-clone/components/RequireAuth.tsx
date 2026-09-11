"use client";

import Link from "next/link";
import { Loader2, Lock, Sparkles } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

/**
 * Gate for the tools that need an account.
 *
 * This is a convenience gate, not the security boundary — the site is a static
 * export, so anyone can read the page source. The real protection is that every
 * endpoint holding personal data checks the session server-side. What this does
 * is make sure a user's chart is tied to an account, so consultations and
 * history work at all.
 */
export default function RequireAuth({
  children,
  title = "Sign in to continue",
  reason = "Create a free account to use this tool. Your chart is saved to your profile so astrologers can see it.",
}: {
  children: React.ReactNode;
  title?: string;
  reason?: string;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-vedic-gradient pt-32 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary-red" />
      </div>
    );
  }

  if (user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-vedic-gradient pt-28 pb-24 px-4">
      <div className="max-w-md mx-auto bg-white rounded-[2rem] shadow-lg border border-gray-100 p-7 md:p-9 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-saffron to-primary-red text-white flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 text-sm mb-5">{reason}</p>

        <div className="flex items-center gap-2 rounded-2xl border border-primary-saffron/30 bg-primary-saffron/10 px-4 py-3 mb-6 text-left">
          <Sparkles className="w-5 h-5 text-primary-red shrink-0" />
          <p className="text-sm font-bold text-primary-red">
            501 free credits on sign-up
            <span className="block font-medium text-gray-600 text-xs">
              Enough for 25 questions to the AI astrologer.
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/register"
            className="flex-1 px-6 py-3.5 saffron-button font-bold rounded-xl uppercase text-sm tracking-wider">
            Create free account
          </Link>
          <Link href="/login"
            className="flex-1 px-6 py-3.5 rounded-xl border-2 border-primary-red text-primary-red font-bold uppercase text-sm tracking-wider">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle, ScrollText, Sparkles, Sun, Inbox, Users, MessagesSquare, UserCircle,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

interface Tab {
  href: string;
  label: string;
  icon: React.ReactNode;
  /** Extra paths that should also light this tab up. */
  match?: string[];
}

const USER_TABS: Tab[] = [
  { href: "/astrologers", label: "Astro Chat", icon: <MessageCircle className="w-5 h-5" />, match: ["/consult"] },
  { href: "/free-kundli-tamil", label: "Kundli", icon: <ScrollText className="w-5 h-5" /> },
  { href: "/ai-chat", label: "AI Chat", icon: <Sparkles className="w-5 h-5" /> },
  { href: "/horoscope", label: "Today", icon: <Sun className="w-5 h-5" />, match: ["/horoscope-today-tamil"] },
];

const ASTROLOGER_TABS: Tab[] = [
  { href: "/astrologer", label: "Inquiries", icon: <Inbox className="w-5 h-5" /> },
  { href: "/astrologer?view=clients", label: "Clients", icon: <Users className="w-5 h-5" /> },
  { href: "/astrologer?view=chats", label: "Chats", icon: <MessagesSquare className="w-5 h-5" /> },
  { href: "/astrologer?view=profile", label: "Profile", icon: <UserCircle className="w-5 h-5" /> },
];

/**
 * App-style bottom navigation, phones only.
 *
 * It renders for signed-in users and switches by role — an astrologer never
 * sees the consumer tabs. Anonymous visitors get nothing here, because every
 * destination behind these tabs needs an account anyway.
 */
export default function MobileTabBar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const isAstro = user.role === "astrologer" || user.role === "admin";
  const tabs = isAstro ? ASTROLOGER_TABS : USER_TABS;

  // Hide on auth screens so the bar does not cover the form on small phones.
  if (pathname === "/login" || pathname === "/register") return null;

  const active = (t: Tab) => {
    const base = t.href.split("?")[0];
    if (pathname === base) {
      // Several astrologer tabs share /astrologer; distinguish by the query.
      if (!isAstro) return true;
      const view = typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("view")
        : null;
      const tabView = new URLSearchParams(t.href.split("?")[1] ?? "").get("view");
      return (view ?? null) === (tabView ?? null);
    }
    return (t.match ?? []).some((m) => pathname.startsWith(m));
  };

  return (
    <>
      {/* Spacer so page content is never hidden behind the fixed bar. */}
      <div className="md:hidden h-[4.5rem]" aria-hidden />

      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-gray-200"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Primary"
      >
        <div className="grid grid-cols-4">
          {tabs.map((t) => {
            const on = active(t);
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={on ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[4rem] transition-colors ${
                  on ? "text-primary-red" : "text-gray-500 active:text-primary-saffron"
                }`}
              >
                <span className={on ? "scale-110 transition-transform" : "transition-transform"}>
                  {t.icon}
                </span>
                <span className="text-[10px] font-bold tracking-wide">{t.label}</span>
                {on && <span className="absolute bottom-0 h-0.5 w-8 bg-primary-red rounded-full" />}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/nav";
import { Menu, X, Wallet, LogOut, LayoutDashboard, Inbox } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const MAIN = [
  { label: "Home", href: "/" },
  { label: "Talk to an Astrologer", href: "/astrologers" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/tamil-astrologer" },
  { label: "Contact", href: "/contact" },
];

const TOOLS = [
  { label: "Free Kundli", href: "/free-kundli-tamil" },
  { label: "Marriage Prediction", href: "/marriage-prediction" },
  { label: "Vimshottari Dasha", href: "/dasha-timeline" },
  { label: "Guna Milan (Matchmaking)", href: "/kundli-matching" },
  { label: "Numerology Calculator", href: "/numerology" },
  { label: "Zodiac Insights", href: "/zodiac-details" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, balance, logout } = useAuth();
  const isAstro = user?.role === "astrologer" || user?.role === "admin";
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 ${
        scrolled ? "py-3 bg-white/95 backdrop-blur shadow-md" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={CONTACT.brand} className="w-11 h-11 rounded-full object-cover ring-2 ring-primary-gold/40 shrink-0" />
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-primary-red tracking-tight leading-none">{CONTACT.shortBrand}</span>
            <span className="font-sans text-[10px] font-bold text-primary-saffron uppercase tracking-widest leading-none mt-1">Vedic Astrology</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-bold transition-colors hover:text-primary-saffron text-primary-red">Home</Link>
          <div className="relative group">
            <button className="text-sm font-bold text-gray-700 hover:text-primary-saffron py-2">Free Tools ▾</button>
            <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col overflow-hidden translate-y-2 group-hover:translate-y-0">
              {TOOLS.map((t, i) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`px-5 py-3 hover:bg-orange-50 hover:text-primary-saffron font-bold text-sm text-gray-700 transition-colors ${
                    i < TOOLS.length - 1 ? "border-b border-gray-50" : ""
                  }`}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/astrologers" className="text-sm font-bold transition-colors hover:text-primary-saffron text-gray-700">Astrologers</Link>
          <Link href="/services" className="text-sm font-bold transition-colors hover:text-primary-saffron text-gray-700">Services</Link>
          <Link href="/tamil-astrologer" className="text-sm font-bold transition-colors hover:text-primary-saffron text-gray-700">About</Link>
          <Link href="/contact" className="text-sm font-bold transition-colors hover:text-primary-saffron text-gray-700">Contact</Link>
          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-saffron/10 text-primary-red text-sm font-bold">
                <Wallet className="w-4 h-4" /> {balance}
              </span>
              {isAdmin && (
                <Link href="/admin" className="text-sm font-bold text-gray-700 hover:text-primary-saffron">Admin</Link>
              )}
              <Link href={isAstro ? "/astrologer" : "/dashboard"}
                className="px-5 py-2.5 saffron-button font-bold rounded-full text-sm uppercase tracking-widest shadow-md">
                {isAstro ? "Panel" : "Dashboard"}
              </Link>
              <button onClick={logout} className="text-gray-500 hover:text-primary-red p-2" aria-label="Sign out">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-primary-saffron">Sign in</Link>
              <Link href="/register" className="px-6 py-2.5 saffron-button font-bold rounded-full text-sm uppercase tracking-widest shadow-md">Sign up free</Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          {user && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-saffron/10 text-primary-red text-xs font-bold">
              <Wallet className="w-3.5 h-3.5" /> {balance}
            </span>
          )}
        <button className="text-primary-red p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-3 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 max-h-[75vh] overflow-y-auto overscroll-contain">
          <p className="px-4 pt-1 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Pages</p>
          {MAIN.map((t) => (
            <Link key={t.href} href={t.href} onClick={() => setOpen(false)}
              className="block px-4 py-3 font-bold text-gray-700 hover:bg-orange-50 rounded-lg active:bg-orange-100">
              {t.label}
            </Link>
          ))}

          <p className="px-4 pt-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 border-t border-gray-100 mt-2">Free tools</p>
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} onClick={() => setOpen(false)}
              className="block px-4 py-3 font-bold text-gray-700 hover:bg-orange-50 rounded-lg active:bg-orange-100">
              {t.label}
            </Link>
          ))}

          <div className="border-t border-gray-100 mt-2 pt-2">
            {user ? (
              <>
                <div className="px-4 py-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 truncate">{user.name}</span>
                  <span className="flex items-center gap-1 text-primary-red text-sm font-bold shrink-0">
                    <Wallet className="w-4 h-4" /> {balance}
                  </span>
                </div>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setOpen(false)}
                    className="block px-4 py-3 font-bold text-gray-700 hover:bg-orange-50 rounded-lg">Admin panel</Link>
                )}
                <Link href={isAstro ? "/astrologer" : "/dashboard"} onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 font-bold text-gray-700 hover:bg-orange-50 rounded-lg">
                  {isAstro ? <Inbox className="w-4 h-4" /> : <LayoutDashboard className="w-4 h-4" />}
                  {isAstro ? "Astrologer panel" : "Dashboard"}
                </Link>
                {!isAstro && (
                  <Link href="/consult" onClick={() => setOpen(false)}
                    className="block px-4 py-3 font-bold text-gray-700 hover:bg-orange-50 rounded-lg">My consultations</Link>
                )}
                <button onClick={() => { setOpen(false); logout(); }}
                  className="w-full text-left flex items-center gap-2 px-4 py-3 font-bold text-gray-500 hover:bg-orange-50 rounded-lg">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)}
                  className="block px-4 py-3 font-bold text-gray-700 hover:bg-orange-50 rounded-lg">Sign in</Link>
                <Link href="/register" onClick={() => setOpen(false)}
                  className="block text-center mt-2 px-6 py-3.5 saffron-button font-bold rounded-full text-sm uppercase tracking-widest">
                  Sign up — 501 free credits
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

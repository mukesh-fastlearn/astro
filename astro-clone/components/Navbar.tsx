"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/nav";
import { Menu, X } from "lucide-react";

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
          <Link href="/services" className="text-sm font-bold transition-colors hover:text-primary-saffron text-gray-700">Services</Link>
          <Link href="/tamil-astrologer" className="text-sm font-bold transition-colors hover:text-primary-saffron text-gray-700">About</Link>
          <Link href="/contact" className="text-sm font-bold transition-colors hover:text-primary-saffron text-gray-700">Contact</Link>
          <Link href="/free-kundli-tamil" className="px-6 py-2.5 saffron-button font-bold rounded-full text-sm uppercase tracking-widest shadow-md ml-2">Get Kundli</Link>
        </div>

        <button className="md:hidden text-primary-red p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-3 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 space-y-1">
          <Link href="/" className="block px-4 py-2.5 font-bold text-primary-red" onClick={() => setOpen(false)}>Home</Link>
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="block px-4 py-2.5 font-bold text-gray-700 hover:bg-orange-50 rounded-lg" onClick={() => setOpen(false)}>
              {t.label}
            </Link>
          ))}
          <Link href="/services" className="block px-4 py-2.5 font-bold text-gray-700" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/tamil-astrologer" className="block px-4 py-2.5 font-bold text-gray-700" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" className="block px-4 py-2.5 font-bold text-gray-700" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/free-kundli-tamil" className="block text-center mt-2 px-6 py-3 saffron-button font-bold rounded-full text-sm uppercase tracking-widest" onClick={() => setOpen(false)}>Get Kundli</Link>
        </div>
      )}
    </nav>
  );
}

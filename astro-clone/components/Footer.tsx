import Link from "next/link";
import { CONTACT } from "@/lib/nav";
import { Phone, Mail, MapPin, ShieldCheck, Facebook, Instagram, Youtube } from "lucide-react";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Free Kundli", href: "/free-kundli-tamil" },
  { label: "Marriage Prediction", href: "/marriage-prediction" },
  { label: "Vimshottari Dasha", href: "/dasha-timeline" },
  { label: "Consultation Services", href: "/services" },
  { label: "About", href: "/tamil-astrologer" },
];

const EXPERTISE = [
  "Marriage & Relationship",
  "Career & Wealth Analysis",
  "Health & Dosha Nivarana",
  "Muhurat Selection",
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1c] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={CONTACT.brand} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-gold/40" />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-white leading-none">{CONTACT.shortBrand}</span>
              <span className="text-[10px] font-bold text-primary-saffron uppercase tracking-widest leading-none mt-1">Vedic Astrology</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Authentic Vedic astrology calculations — birth charts, compatibility, numerology
            and dasha timelines, computed from real planetary positions.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary-gold">
            <ShieldCheck className="w-4 h-4" /> 100% Confidential
          </div>
          <div className="flex gap-3 mt-5">
            {CONTACT.socials.facebook && <a href={CONTACT.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-saffron transition"><Facebook className="w-4 h-4" /></a>}
            {CONTACT.socials.instagram && <a href={CONTACT.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-saffron transition"><Instagram className="w-4 h-4" /></a>}
            {CONTACT.socials.youtube && <a href={CONTACT.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-saffron transition"><Youtube className="w-4 h-4" /></a>}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-widest">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {QUICK.map((q) => (
              <li key={q.label}><Link href={q.href} className="text-slate-400 hover:text-primary-saffron transition">{q.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-widest">Expertise</h4>
          <ul className="space-y-3 text-sm">
            {EXPERTISE.map((e) => (
              <li key={e} className="text-slate-400">{e}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-widest">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            {CONTACT.locations.map((l) => (
              <li key={l} className="flex items-start gap-3"><MapPin className="w-4 h-4 text-primary-saffron mt-0.5 shrink-0" /><span className="text-slate-400">{l}</span></li>
            ))}
            {CONTACT.phone && <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary-saffron shrink-0" /><a href={`tel:${CONTACT.phoneRaw}`} className="text-slate-400 hover:text-primary-saffron">{CONTACT.phone}</a></li>}
            {CONTACT.email && <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary-saffron shrink-0" /><a href={`mailto:${CONTACT.email}`} className="text-slate-400 hover:text-primary-saffron break-all">{CONTACT.email}</a></li>}
            {!CONTACT.phone && !CONTACT.email && <li className="text-slate-400">Reach us through the <Link href="/contact" className="text-primary-saffron hover:underline">contact form</Link>.</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {CONTACT.brand}. All Rights Reserved.
            <span className="mx-1">|</span>
            <span className="text-slate-400">Powered by <strong className="text-primary-saffron">Rtech AI Labs</strong></span>
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            <Link href="/privacy" className="hover:text-primary-saffron">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-saffron">Terms</Link>
            <Link href="/refund" className="hover:text-primary-saffron">Refund Policy</Link>
            <Link href="/delivery" className="hover:text-primary-saffron">Delivery</Link>
            <Link href="/pricing" className="hover:text-primary-saffron">Pricing</Link>
            <Link href="/contact" className="hover:text-primary-saffron">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

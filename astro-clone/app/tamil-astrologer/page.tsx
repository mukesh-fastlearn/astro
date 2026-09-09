import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/nav";
import { BadgeCheck, ShieldCheck, Award, Sparkles, Compass, Clock, HelpCircle, Home, Flame, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Astrologer Abhishek Soni — Master of Vedic & Nadi Astrology",
  description: "Meet Astrologer Abhishek Soni, a celebrity Vedic & Nadi astrologer from Nagpur with 25+ years of experience, guaranteed remedies, and proven results.",
};

const ACHIEVEMENTS = ["Jyotish Ratna Awardee", "Nadi & Prashna Expert", "50k+ Accurate Readings", "Guaranteed Remedies"];

const EXPERTISE = [
  { icon: ShieldCheck, title: "Dosha Nivarana", desc: "Expert remedies for Kuja Dosha, Kala Sarpa Dosha, and Pitru Dosha." },
  { icon: Clock, title: "Muhurat Selection", desc: "Calculating the exact auspicious time for weddings, business launches, and house warming." },
  { icon: HelpCircle, title: "Prashna Shastra", desc: "Providing immediate answers to urgent questions based on the exact time the question is asked." },
  { icon: Home, title: "Vastu & Astro-Vastu", desc: "Aligning architectural energies with your personal birth chart for maximum prosperity." },
];

const TIMELINE = [
  { n: "1", years: "1998 - 2008", title: "Rigorous Foundation", desc: "Intensive Gurukul training in traditional Vedic texts, astronomy, and Nadi astrology under revered masters." },
  { n: "2", years: "2009 - 2018", title: "Establishment of Practice", desc: "Started consulting in Nagpur, gaining a rapid reputation for highly accurate predictions and effective dosha remedies." },
  { n: "3", years: "2019 - Present", title: "Global Reach", desc: "Consulting clients worldwide, integrating modern technology while strictly maintaining traditional authenticity." },
];

const TRADITIONS = [
  { icon: Flame, title: "Vedic Homa & Havan" },
  { icon: Sparkles, title: "Pooja & Archana" },
  { icon: Star, title: "Temple Traditions" },
];

export default function AboutPage() {
  return (
    <div className="bg-white pt-32 pb-20 px-4 md:px-8 relative">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-28">
          <div>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-primary-saffron/20 text-primary-red text-xs font-bold uppercase tracking-widest"><BadgeCheck className="w-4 h-4" /> Verified Expert</span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-widest"><ShieldCheck className="w-4 h-4" /> 100% Guaranteed Solutions</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Meet <span className="saffron-gradient">Abhishek Soni</span>
            </h1>
            <p className="text-primary-red font-semibold mt-3 text-lg">Master of Vedic &amp; Nadi Astrology</p>
            <p className="text-gray-600 mt-6 font-medium leading-relaxed">
              With over <span className="font-bold text-gray-900">25 years of dedicated practice</span> in the sacred art of
              Jyothisham, Abhishek Soni has been a guiding light for thousands of individuals, families, and business leaders across the globe.
            </p>
            <p className="text-gray-600 mt-4 font-medium leading-relaxed">
              Hailing from a revered lineage of traditional astrologers, his unique approach combines ancient Vedic principles,
              precise mathematical calculations, and deep intuitive insights to offer <span className="font-bold text-gray-900">proven, practical solutions</span> to modern-day problems.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              {ACHIEVEMENTS.map((a) => (
                <div key={a} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Award className="w-4 h-4 text-primary-saffron shrink-0" /> {a}
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-square">
              <div className="absolute inset-0 border-4 border-primary-saffron/30 rounded-full animate-spin-slow" />
              <div className="absolute inset-3 border-4 border-dashed border-primary-gold/40 rounded-full animate-reverse-spin" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Astrologer Abhishek Soni" className="absolute inset-6 object-cover rounded-full shadow-2xl border-8 border-white" />
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-[3rem] p-10 md:p-16 mb-28 border border-orange-100 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-gold/10 blur-[80px] rounded-full" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">The Philosophy of <span className="saffron-gradient">Jyotish</span></h2>
            <p className="text-2xl font-serif italic text-primary-red leading-relaxed mb-6">
              &ldquo;Astrology is not about surrendering to fate; it is the map that helps you navigate the ocean of Karma.
              Through awareness and right action (Pariharam), we can alter the course of our destiny.&rdquo;
            </p>
            <p className="text-gray-700 font-medium leading-relaxed">
              Abhishek Soni strictly adheres to the principle that while the planetary placements at birth indicate past life karmas,
              the application of precise Vedic remedies—such as specific mantra chanting, gemstone therapy, and charitable acts—can
              significantly mitigate hardships and amplify success.
            </p>
          </div>
        </div>

        {/* Core Expertise */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Core <span className="saffron-gradient">Expertise</span></h2>
            <p className="text-gray-600 font-medium mt-3">Specialized astrological services requiring deep, esoteric knowledge.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERTISE.map((e) => (
              <div key={e.title} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-saffron to-primary-red text-white flex items-center justify-center mb-5"><e.icon className="w-7 h-7" /></div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{e.title}</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legacy timeline */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">A Legacy of <span className="saffron-gradient">Wisdom</span></h2>
            <p className="text-gray-600 font-medium mt-3">Decades of rigorous study and practical application of cosmic sciences.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIMELINE.map((t) => (
              <div key={t.n} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-saffron to-primary-red text-white font-serif font-bold text-xl flex items-center justify-center mb-5">{t.n}</div>
                <p className="text-primary-saffron font-bold text-sm uppercase tracking-widest mb-1">{t.years}</p>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{t.title}</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sacred Traditions */}
        <div className="mb-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Sacred <span className="saffron-gradient">Traditions</span></h2>
            <p className="text-gray-600 font-medium mt-3">A glimpse into the authentic practices and powerful poojas conducted by Abhishek Soni to resolve life&apos;s hurdles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRADITIONS.map((t) => (
              <div key={t.title} className="bg-gradient-to-br from-orange-50 to-red-50 p-10 rounded-3xl border border-orange-100 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5 text-primary-saffron"><t.icon className="w-8 h-8" /></div>
                <h3 className="font-serif text-xl font-bold text-gray-900">{t.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-[2.5rem] bg-gradient-to-r from-primary-saffron to-primary-red text-white p-12 text-center">
          <h2 className="font-serif text-3xl font-bold">Experience Authentic Guidance</h2>
          <p className="mt-3 text-white/90 max-w-xl mx-auto">Start with a free Kundli, or reach out for a personal consultation.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-7">
            <Link href="/free-kundli-tamil" className="px-7 py-3.5 rounded-full bg-white text-primary-red font-bold hover:shadow-xl transition">Free Kundli</Link>
            <Link href="/contact" className="px-7 py-3.5 rounded-full bg-primary-dark/20 border border-white/40 text-white font-bold hover:bg-primary-dark/30 transition">Book Consultation</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  Sparkles, Star, ArrowRight, ScrollText, HeartHandshake, Calculator,
  CalendarHeart, Hourglass, BookOpen, Briefcase, Heart, HeartPulse,
  CalendarCheck, FileText, PhoneCall, Repeat, ShieldCheck, Lock, BadgeCheck,
} from "lucide-react";
import { TAMIL_RASI } from "@/lib/zodiac";
import { ZODIAC_SIGN_SLUGS } from "@/lib/nav";
import Panchang from "@/components/Panchang";

const STATS = [
  { value: "20", label: "Divisional Charts" },
  { value: "36", label: "Point Guna Milan" },
  { value: "27", label: "Nakshatras Mapped" },
  { value: "5", label: "Dasha Levels" },
];

const NAVAGRAHA = [
  { en: "Ketu", sub: "South Node", size: "w-4 h-4 md:w-5 md:h-5", color: "#94a3b8" },
  { en: "Shani", sub: "Saturn", size: "w-7 h-7 md:w-10 md:h-10", color: "#64748b", ring: true },
  { en: "Mangala", sub: "Mars", size: "w-5 h-5 md:w-7 md:h-7", color: "#ef4444" },
  { en: "Chandra", sub: "Moon", size: "w-6 h-6 md:w-8 md:h-8", color: "#e2e8f0" },
  { en: "Surya", sub: "Sun", size: "w-10 h-10 md:w-14 md:h-14", color: "#fbbf24" },
  { en: "Budha", sub: "Mercury", size: "w-4 h-4 md:w-5 md:h-5", color: "#22c55e" },
  { en: "Brihaspati", sub: "Jupiter", size: "w-8 h-8 md:w-12 md:h-12", color: "#f59e0b" },
  { en: "Shukra", sub: "Venus", size: "w-6 h-6 md:w-9 md:h-9", color: "#f0abfc" },
  { en: "Rahu", sub: "North Node", size: "w-4 h-4 md:w-5 md:h-5", color: "#94a3b8" },
];

const TOOLS = [
  { icon: ScrollText, title: "Free Kundli Generator", desc: "Generate your birth chart with divisional charts and detailed planetary positions.", href: "/free-kundli-tamil", cta: "Try Now" },
  { icon: HeartHandshake, title: "Guna Milan", desc: "Check marital compatibility using the traditional 36-point Ashtakoota system.", href: "/kundli-matching", cta: "Try Now" },
  { icon: Calculator, title: "Numerology", desc: "Discover your Mulank, Bhagyank, and Namank based on ancient Vedic principles.", href: "/numerology", cta: "Try Now" },
  { icon: CalendarHeart, title: "Marriage Prediction", desc: "Predict your auspicious marriage timing and analyze your 7th house for harmony.", href: "/marriage-prediction", cta: "Try Now" },
  { icon: Hourglass, title: "Dasha Timeline", desc: "Explore your current Mahadasha and Antardasha periods for precise timing.", href: "/dasha-timeline", cta: "Try Now" },
  { icon: BookOpen, title: "Zodiac Encyclopedia", desc: "Deep dive into the characteristics, ruling planets, and elements of all 12 signs.", href: "/zodiac-details", cta: "Explore" },
];

const STEPS = [
  { icon: CalendarCheck, title: "1. Book Appointment", desc: "Select a convenient time slot for your detailed consultation." },
  { icon: FileText, title: "2. Provide Details", desc: "Share your exact date, time, and place of birth securely." },
  { icon: PhoneCall, title: "3. Direct Consultation", desc: "1-on-1 private consultation for in-depth analysis." },
  { icon: Repeat, title: "4. Perform Remedies", desc: "Follow specific, proven Vedic remedies to overcome life's hurdles." },
];

const SERVICES = [
  { icon: Briefcase, title: "Career & Business", tamil: "தொழில் வழிகாட்டுதல்", desc: "Identify periods of growth, overcome professional hurdles, and choose the right career path based on your 10th house analysis." },
  { icon: Heart, title: "Marriage & Dosha", tamil: "திருமண பொருத்தம்", desc: "In-depth Kundli matching, Mangalik dosha check, and timing of marriage to ensure lifelong harmony and happiness." },
  { icon: HeartPulse, title: "Health & Remedies", tamil: "ஆரோக்கியம் மற்றும் பரிகாரம்", desc: "Understand planetary influences on health and receive powerful Vedic remedies, gemstones, and mantra prescriptions." },
];

const FAQ = [
  { q: "How accurate are the predictions?", a: "Our calculations use real geocentric planetary positions from a professional ephemeris, converted to the sidereal zodiac using the Lahiri ayanamsa. The astronomy is exact; interpretation of those positions is the traditional Vedic layer applied on top." },
  { q: "Is the consultation completely confidential?", a: "Absolutely. 100% confidentiality is a core pillar of our practice. Your personal details, birth data, and the content of your consultation will never be shared with any third party." },
  { q: "Can remedies (Pariharam) change destiny?", a: "Remedies do not alter your fundamental karma, but they significantly reduce the intensity of negative impacts and enhance positive periods, much like an umbrella protects you from the rain." },
];

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative w-full flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-white">
        <div className="absolute inset-0 mandala-bg opacity-[0.25] z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left w-full">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-primary-saffron/20 text-primary-red text-sm font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-primary-saffron" />
              <span>Proven Results • 25+ Years Experience</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold mb-6 tracking-tight text-gray-900 leading-tight">
              Unlock Your Destiny with <span className="saffron-gradient">Golden Era Astro</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-10 leading-relaxed font-medium mx-auto lg:mx-0">
              Expert Vedic astrology consultations rooted in authentic tradition. Get precise predictions,
              powerful dosha nivarana, and guaranteed guidance for a prosperous life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <Link href="/free-kundli-tamil" className="px-6 py-3 saffron-button font-bold rounded-xl flex items-center justify-center gap-2 text-base uppercase tracking-wider shadow-xl">
                Generate Free Kundli <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="px-6 py-3 bg-white border-2 border-primary-red text-primary-red font-bold rounded-xl flex items-center justify-center gap-2 text-base uppercase tracking-wider hover:bg-primary-red/5 transition-all shadow-md">
                Book Consultation
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-md lg:max-w-none mx-auto mt-8 lg:mt-0">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 border-4 border-primary-saffron/30 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border-4 border-dashed border-primary-gold/40 rounded-full animate-reverse-spin" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-saffron/10 to-transparent rounded-full" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero.jpg" alt="Vedic astrologer offering celestial guidance" className="absolute inset-8 object-cover rounded-full shadow-2xl border-8 border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="w-full bg-gradient-to-r from-primary-red to-primary-saffron py-12 relative overflow-hidden">
        <div className="absolute inset-0 mandala-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-wrap justify-around items-center gap-8 text-white">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold mb-1">{s.value}</div>
              <div className="font-bold text-sm uppercase tracking-widest text-primary-gold drop-shadow-md">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Cosmic Alignment */}
      <section className="w-full bg-[#0a0f1c] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">The Cosmic Alignment</h2>
            <p className="text-slate-400 font-medium max-w-2xl mx-auto text-sm md:text-base">
              The Navagraha (nine celestial bodies) move in a continuous celestial dance, their alignment gently guiding the course of our destiny.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-10 md:gap-x-12 max-w-5xl mx-auto">
            {NAVAGRAHA.map((p) => (
              <div key={p.en} className="flex flex-col items-center group cursor-pointer">
                <div className={`rounded-full relative hover:scale-125 transition-transform duration-300 ${p.size}`} style={{ background: `radial-gradient(circle at 35% 30%, #fff6, ${p.color})`, boxShadow: `0 0 18px ${p.color}66` }}>
                  {p.ring && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210%] h-[34%] border-2 border-slate-400/60 rounded-[50%] -rotate-12 pointer-events-none" />}
                </div>
                <div className="mt-3 flex flex-col items-center">
                  <span className="text-white text-xs md:text-sm font-bold whitespace-nowrap">{p.en}</span>
                  <span className="text-slate-400 text-[10px] md:text-xs whitespace-nowrap">{p.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="w-full bg-white py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-red mb-4">Explore Our Free Tools</h2>
            <p className="text-gray-600 font-medium max-w-2xl mx-auto">
              Access our suite of advanced astrological calculators and insights, designed to provide instant, precise vedic guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className="group flex flex-col items-center text-center bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-primary-saffron/30 hover:shadow-xl transition-all">
                <div className="w-20 h-20 shrink-0 bg-white rounded-2xl shadow-sm border border-orange-50 flex items-center justify-center text-primary-saffron group-hover:scale-110 group-hover:bg-primary-saffron group-hover:text-white transition-all mb-6">
                  <t.icon className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary-red transition-colors">{t.title}</h3>
                <p className="text-gray-600 font-medium mb-4 text-sm">{t.desc}</p>
                <span className="text-primary-saffron font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                  {t.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Panchang */}
      <Panchang />

      {/* Zodiac selector */}
      <section className="w-full bg-primary-cream py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Select Your Zodiac Sign</h2>
            <p className="text-gray-600 font-medium max-w-2xl mx-auto">
              Discover daily insights tailored specifically for your astrological sign based on precise planetary movements.
            </p>
            <p className="text-primary-saffron font-bold mt-2">உங்கள் ராசியைத் தேர்ந்தெடுக்கவும்</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {ZODIAC_SIGN_SLUGS.map((slug) => {
              const name = slug.charAt(0).toUpperCase() + slug.slice(1);
              return (
                <Link key={slug} href={`/horoscope-today-tamil/${slug}`} className="group flex flex-col items-center text-center bg-white p-5 rounded-2xl border border-gray-100 hover:border-primary-saffron hover:shadow-lg transition-all">
                  <Star className="w-8 h-8 text-primary-saffron mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-serif font-bold text-gray-900">{name}</span>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{TAMIL_RASI[name]}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Path to Clarity */}
      <section className="w-full bg-gray-50 py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">The Path to Clarity</h2>
            <p className="text-gray-600 font-medium max-w-2xl mx-auto">A simple, transparent process to get profound insights into your life.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.title} className="text-center">
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm border border-orange-50 flex items-center justify-center text-primary-saffron mb-6">
                  <s.icon className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-red mb-4">Expert Astrology Services</h2>
            <p className="text-gray-600 font-medium max-w-2xl mx-auto">
              Comprehensive solutions for every aspect of your life, combining traditional wisdom with deep analytical expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <div key={s.title} className="group bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-primary-saffron/30 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-saffron to-primary-red rounded-2xl flex items-center justify-center text-white mb-6">
                  <s.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-primary-saffron font-bold text-sm mb-3">{s.tamil}</p>
                <p className="text-gray-600 font-medium text-sm mb-4 leading-relaxed">{s.desc}</p>
                <Link href="/services" className="text-primary-red font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-white py-24 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="group bg-gray-50 rounded-2xl border border-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-serif font-bold text-lg text-gray-900">
                  <span className="flex items-center gap-3"><span className="text-primary-saffron">Q.</span>{f.q}</span>
                  <span className="text-primary-saffron text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 font-medium mt-4 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-gradient-to-r from-primary-red to-primary-saffron py-20 relative overflow-hidden">
        <div className="absolute inset-0 mandala-bg opacity-20" />
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Do Not Leave Your Future to Chance</h2>
          <p className="text-white/90 font-medium max-w-2xl mx-auto mb-10">
            Get an accurate reading and take control of your destiny today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/free-kundli-tamil" className="px-8 py-3.5 bg-white text-primary-red font-bold rounded-xl uppercase tracking-wider shadow-lg hover:shadow-xl transition">Calculate Kundli</Link>
            <Link href="/contact" className="px-8 py-3.5 bg-primary-dark/20 border-2 border-white/60 text-white font-bold rounded-xl uppercase tracking-wider hover:bg-primary-dark/30 transition">Contact Now</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold">
            <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Secure</span>
            <span className="flex items-center gap-2"><Lock className="w-5 h-5" /> Private</span>
            <span className="flex items-center gap-2"><BadgeCheck className="w-5 h-5" /> Accurate</span>
          </div>
        </div>
      </section>
    </div>
  );
}

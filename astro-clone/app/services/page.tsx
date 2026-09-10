import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/nav";
import { Heart, Briefcase, Home, ScrollText, ArrowRight, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Astrology Services — Golden Era Astro",
  description: "Professional Vedic astrology services: marriage matching, career & finance, Vastu, and life prediction consultations.",
};

const SERVICES = [
  { icon: Heart, color: "bg-primary-red", title: "Marriage Matching", price: "₹1,100", tamil: "திருமண பொருத்தம்", desc: "Detailed analysis of 10 Poruthams and Kuja Dosha for a happy married life. Avoid potential pitfalls and ensure a harmonious partnership through deep Vedic compatibility analysis." },
  { icon: Briefcase, color: "bg-blue-600", title: "Career & Finance", price: "₹1,500", tamil: "தொழில் மற்றும் வருமானம்", desc: "Insights into the best professional paths, business success, and wealth creation. Discover when to switch jobs or start a new venture based on your planetary periods." },
  { icon: Home, color: "bg-green-600", title: "Vastu Consultation", price: "₹2,500", tamil: "வாஸ்து ஆலோசனை", desc: "Alignment of your home and workplace for prosperity and peace. Correct energy flows and remove Vastu Doshas without structural demolition." },
  { icon: ScrollText, color: "bg-primary-gold", title: "Life Prediction", price: "₹2,100", tamil: "வாழ்க்கை கணிப்பு", desc: "Comprehensive analysis of your birth chart covering all major aspects of life. Get a roadmap for the next 5 years, highlighting opportunities and caution periods." },
];

export default function ServicesPage() {
  const wa = `https://wa.me/${CONTACT.phoneRaw}`;
  return (
    <div className="bg-white pt-32 pb-20 px-4 md:px-8 min-h-screen relative">
      <div className="absolute inset-0 mandala-bg opacity-[0.03] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900">
            <span className="saffron-gradient">Sacred</span><br />Consultations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-5 font-medium">
            Professional astrological services rooted in pure Vedic tradition to deliver proven, life-changing results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((s) => (
            <div key={s.title} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row gap-8 items-start group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md text-white ${s.color}`}>
                <s.icon className="w-8 h-8" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2 gap-3">
                  <h3 className="text-2xl font-serif font-bold text-gray-900">{s.title}</h3>
                  <span className="text-primary-red font-bold text-xl bg-red-50 px-3 py-1 rounded-lg shrink-0">{s.price}</span>
                </div>
                <p className="text-sm text-primary-saffron font-bold uppercase tracking-widest mb-4">{s.tamil}</p>
                <p className="text-gray-600 font-medium leading-relaxed mb-8">{s.desc}</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary-red font-bold uppercase tracking-widest text-sm">
                  Book Consultation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 bg-gradient-to-r from-green-50 to-green-100 p-12 rounded-[3rem] text-center border border-green-200 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full" />
          <h2 className="text-3xl font-serif font-bold mb-6 text-green-900 relative z-10">Need Quick Guidance?</h2>
          <p className="text-green-800 font-medium mb-10 max-w-xl mx-auto relative z-10">
            Get instant answers to your pressing questions via WhatsApp. Connect directly with our office for priority booking.
          </p>
          {CONTACT.phoneRaw ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-3 px-10 py-5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl text-lg transition-all hover:scale-105 shadow-lg shadow-green-600/30">
              <MessageCircle className="w-6 h-6" /> Connect via WhatsApp
            </a>
          ) : (
            <Link href="/contact" className="relative z-10 inline-flex items-center gap-3 px-10 py-5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl text-lg transition-all hover:scale-105 shadow-lg shadow-green-600/30">
              <MessageCircle className="w-6 h-6" /> Send us a message
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

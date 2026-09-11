"use client";

import Link from "next/link";
import { Check, Sparkles, MessageCircle, Info } from "lucide-react";
import { CREDIT_PACKS, COST_PER_MESSAGE, SIGNUP_CREDITS, BUSINESS } from "@/lib/legal";

const CARD = "bg-white rounded-[2rem] shadow-lg border border-gray-100 p-6";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-vedic-gradient pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900">
            Simple <span className="saffron-gradient">Pricing</span>
          </h1>
          <p className="text-gray-600 font-medium mt-2 max-w-xl mx-auto">
            Every chart, calculator and daily reading is free. You only spend credits when you ask a
            question — {COST_PER_MESSAGE} credits per message, to the AI or to a human astrologer.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-primary-saffron/30 bg-primary-saffron/10 px-5 py-4 max-w-xl mx-auto">
          <Sparkles className="w-6 h-6 text-primary-red shrink-0" />
          <p className="text-sm font-bold text-primary-red">
            {SIGNUP_CREDITS} free credits when you sign up
            <span className="block font-medium text-gray-600 text-xs">
              That is {Math.floor(SIGNUP_CREDITS / COST_PER_MESSAGE)} questions, at no cost.
            </span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CREDIT_PACKS.map((p) => (
            <div
              key={p.id}
              className={`${CARD} relative flex flex-col ${p.popular ? "ring-2 ring-primary-saffron" : ""}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary-red text-white text-[10px] font-bold uppercase tracking-widest">
                  Most popular
                </span>
              )}
              <h2 className="font-serif text-lg font-bold text-gray-900">{p.label}</h2>
              <p className="font-serif text-3xl font-bold text-primary-red mt-2">₹{p.priceInr}</p>
              <p className="text-sm text-gray-600 mt-1">{p.credits.toLocaleString()} credits</p>
              <p className="text-xs text-gray-500 mt-0.5">
                ≈ {Math.floor(p.credits / COST_PER_MESSAGE)} questions
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-gray-600 flex-1">
                <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> AI astrologer</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Human astrologer chat</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Credits never expire</li>
              </ul>
              <button
                disabled
                className="mt-5 w-full px-5 py-3 rounded-xl bg-gray-100 text-gray-400 font-bold uppercase text-sm tracking-wider cursor-not-allowed"
              >
                Coming soon
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 max-w-2xl mx-auto">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            <strong>Payments are not live yet.</strong> Card and UPI checkout is pending Razorpay
            merchant approval. Until then nothing can be bought, and the {SIGNUP_CREDITS} free
            sign-up credits are the only way to use the service.
          </span>
        </div>

        <div className={`${CARD} max-w-2xl mx-auto`}>
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">What is always free</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {[
              "Full kundli with all 20 divisional charts",
              "Shadbala, Ashtakavarga, yogas, Chara karakas, Arudha padas",
              "Vimshottari, Yogini, Ashtottari and Chara dashas",
              "Guna Milan matching, numerology, marriage analysis",
              "Daily horoscope, panchang and muhurta timing",
              "Downloading your chart as PDF, text or JSON",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> {t}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            Credits are only for conversation — asking the AI or an astrologer a question.
          </p>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Read our{" "}
            <Link href="/refund" className="font-bold text-primary-red hover:underline">Refund Policy</Link>,{" "}
            <Link href="/terms" className="font-bold text-primary-red hover:underline">Terms</Link> and{" "}
            <Link href="/privacy" className="font-bold text-primary-red hover:underline">Privacy Policy</Link>.
          </p>
          <p className="mt-2">
            <Link href="/astrologers" className="inline-flex items-center gap-1.5 font-bold text-primary-red hover:underline">
              <MessageCircle className="w-4 h-4" /> Talk to an astrologer
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-4">
            All prices in Indian Rupees and inclusive of applicable taxes. {BUSINESS.tradingName}.
          </p>
        </div>
      </div>
    </div>
  );
}

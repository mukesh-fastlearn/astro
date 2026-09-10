"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/nav";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const inputCls = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary-saffron focus:ring-2 focus:ring-primary-saffron/20 transition";

  return (
    <div className="bg-vedic-gradient min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 font-medium">
            Reach out for a personal consultation, remedies, or any astrological guidance. We respond within 24 hours.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2 space-y-4">
            {CONTACT.locations.map((l) => (
              <Info key={l} icon={MapPin} label="Visit" value={l} />
            ))}
            {CONTACT.phone && <Info icon={Phone} label="Call / WhatsApp" value={CONTACT.phone} />}
            {CONTACT.email && <Info icon={Mail} label="Email" value={CONTACT.email} />}
          </div>

          <div className="md:col-span-3 bg-white rounded-[2rem] border border-gray-100 p-7 shadow-sm">
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-600 mt-2">We will get back to you shortly. 🙏</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-4"
              >
                <input required className={inputCls} placeholder="Your Name" />
                <input required type="email" className={inputCls} placeholder="Email Address" />
                <input className={inputCls} placeholder="Phone Number" />
                <textarea required rows={4} className={inputCls} placeholder="How can we help you?" />
                <button type="submit" className="w-full rounded-full bg-gradient-to-r from-primary-saffron to-primary-red text-white font-bold py-3.5 shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-3 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-orange-50 text-primary-red flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );
}

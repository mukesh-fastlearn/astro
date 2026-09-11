"use client";

import { AlertTriangle } from "lucide-react";
import { BUSINESS, businessIncomplete, isTodo } from "@/lib/legal";

/** Renders a business field, or a visible warning if it is still a placeholder. */
export function B({ field }: { field: keyof typeof BUSINESS }) {
  const v = BUSINESS[field];
  if (typeof v !== "string" || isTodo(v)) {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-red-100 text-red-700 px-1.5 py-0.5 text-[11px] font-bold align-middle">
        <AlertTriangle className="w-3 h-3" /> {String(field)} not set
      </span>
    );
  }
  return <span>{v}</span>;
}

export function FullAddress() {
  const parts = [BUSINESS.address, BUSINESS.city, BUSINESS.state, BUSINESS.pincode, BUSINESS.country];
  if (parts.some(isTodo)) {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-red-100 text-red-700 px-1.5 py-0.5 text-[11px] font-bold">
        <AlertTriangle className="w-3 h-3" /> Registered address not set
      </span>
    );
  }
  return <span>{parts.join(", ")}</span>;
}

export default function LegalPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const missing = businessIncomplete();

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        <p className="text-xs text-gray-400 mt-2">Last updated: {BUSINESS.lastUpdated}</p>

        {missing.length > 0 && (
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              <strong>This page is not ready for Razorpay review.</strong> {missing.length} business
              detail{missing.length === 1 ? "" : "s"} still unfilled ({missing.join(", ")}). Razorpay
              rejects merchant applications whose policy pages contain placeholder text. Edit{" "}
              <code className="bg-red-100 px-1 rounded text-[11px]">lib/legal.ts</code> and rebuild.
            </span>
          </div>
        )}

        <div className="prose-legal mt-8 space-y-6 text-gray-700 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-xl font-bold text-gray-900 mb-2">{heading}</h2>
      <div className="space-y-3 text-[15px]">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5 pl-1">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-primary-saffron shrink-0">•</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

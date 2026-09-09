"use client";

import { useEffect, useState } from "react";
import { getPanchangInfo, PanchangInfo } from "@/lib/astrology/kundli";
import { Sparkles, MapPin, Calendar, LocateFixed, Pencil, Search, Loader2 } from "lucide-react";

interface Loc { name: string; lat: number; lon: number; }

const DEFAULT_LOC: Loc = { name: "New Delhi, India", lat: 28.6139, lon: 77.209 };

export default function Panchang() {
  const [loc, setLoc] = useState<Loc>(DEFAULT_LOC);
  const [data, setData] = useState<PanchangInfo | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setData(getPanchangInfo(new Date(), loc.lat, loc.lon));
  }, [loc]);

  function useLive() {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      let name = "Your Location";
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const j = await r.json();
        name = j.address?.city || j.address?.town || j.address?.state || j.display_name?.split(",")[0] || name;
      } catch {}
      setLoc({ name, lat: latitude, lon: longitude });
    });
  }

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (query.length < 2) return;
    setSearching(true);
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
      const j = await r.json();
      if (j[0]) {
        setLoc({ name: j[0].display_name.split(",").slice(0, 2).join(",").trim(), lat: parseFloat(j[0].lat), lon: parseFloat(j[0].lon) });
        setShowSearch(false);
        setQuery("");
      }
    } catch {}
    setSearching(false);
  }

  const dateLabel = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const cells = data
    ? [
        { label: "Sunrise", value: data.sunrise },
        { label: "Sunset", value: data.sunset },
        { label: "Tithi", value: data.tithi, sub: `upto ${data.tithiEnd}`, highlight: true },
        { label: "Nakshatra", value: data.nakshatra, sub: `upto ${data.nakshatraEnd}`, highlight: true },
        { label: "Yoga", value: data.yoga, sub: `upto ${data.yogaEnd}` },
        { label: "Karana", value: data.karana, sub: `upto ${data.karanaEnd}` },
        { label: "Paksha", value: `${data.paksha} Paksha`, highlight: true },
        { label: "Weekday", value: data.dayLord },
        { label: "Amanta Month", value: data.amantaMonth },
        { label: "Purnimanta", value: data.purnimantaMonth },
        { label: "Moonsign", value: data.moonSign, highlight: true },
        { label: "Sunsign", value: data.sunSign },
      ]
    : [];

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {!data ? (
          <div className="w-full flex items-center justify-center p-12 bg-orange-50 rounded-3xl border border-orange-100 min-h-[300px]">
            <Loader2 className="w-10 h-10 animate-spin text-primary-saffron" />
          </div>
        ) : (
          <div className="bg-orange-50 rounded-3xl p-6 md:p-10 border border-orange-100 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-primary-saffron font-bold uppercase tracking-widest text-sm mb-2">
                  <Sparkles className="w-4 h-4" /> Today&apos;s Panchang
                </div>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Auspicious Timings</h3>
                <p className="text-gray-600 font-medium">Live planetary data calculated for your precise location.</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3 bg-white p-4 rounded-2xl shadow-sm border border-orange-50 w-full md:w-auto">
                <div className="flex items-center text-gray-800 font-bold"><MapPin className="w-4 h-4 mr-1.5 text-primary-red" />{loc.name}</div>
                <div className="text-gray-500 font-medium text-sm flex items-center"><Calendar className="w-4 h-4 mr-1.5" />{dateLabel}</div>
                <div className="flex items-center gap-2 mt-2 w-full">
                  <button onClick={useLive} title="Use current location" className="flex-1 md:flex-none px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-lg transition-colors flex items-center justify-center text-sm font-semibold">
                    <LocateFixed className="w-3.5 h-3.5 mr-1" /> Live
                  </button>
                  <button onClick={() => setShowSearch(!showSearch)} className="flex-1 md:flex-none px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors flex items-center justify-center text-sm font-semibold">
                    <Pencil className="w-3.5 h-3.5 mr-1" /> Change
                  </button>
                </div>
              </div>
            </div>

            {showSearch && (
              <form onSubmit={search} className="mb-8 flex">
                <input type="text" placeholder="Search for a city..." autoFocus value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 px-4 py-3 rounded-l-xl border border-gray-200 focus:outline-none focus:border-primary-saffron focus:ring-1 focus:ring-primary-saffron bg-white text-gray-800" />
                <button type="submit" disabled={searching} className="px-6 py-3 bg-primary-saffron hover:bg-orange-500 transition-colors text-white rounded-r-xl font-bold flex items-center">
                  {searching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
              </form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cells.map((c) => (
                <div key={c.label} className="bg-white p-4 rounded-xl shadow-sm border border-orange-50 flex flex-col justify-center transition-all hover:shadow-md">
                  <span className="text-xs font-bold text-gray-500 uppercase block mb-1">{c.label}</span>
                  <div className="flex flex-col">
                    <span className={`font-bold ${c.highlight ? "text-primary-red" : "text-gray-900"}`}>{c.value}</span>
                    {c.sub && <span className="text-xs text-gray-500 font-medium mt-0.5">{c.sub}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

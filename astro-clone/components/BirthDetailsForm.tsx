"use client";

import { useEffect, useRef, useState } from "react";
import { User, Calendar, Clock, MapPin } from "lucide-react";

export interface BirthData {
  name: string;
  gender: string;
  date: string;
  time: string;
  place: string;
  lat: number;
  lon: number;
}

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

export default function BirthDetailsForm({
  onGenerate,
  loading = false,
  defaultGender = "Male",
  submitLabel = "Generate My Kundli",
}: {
  onGenerate: (data: BirthData) => void;
  loading?: boolean;
  defaultGender?: string;
  submitLabel?: string;
}) {
  const [data, setData] = useState<BirthData>({
    name: "",
    date: "",
    time: "",
    lat: 13.0827,
    lon: 80.2707,
    place: "",
    gender: defaultGender,
  });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [typed, setTyped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!typed || query.length < 3) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );
        const json = await res.json();
        setResults(json);
        setShowResults(true);
      } catch (e) {
        console.error("Geocoding error:", e);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [query, typed]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowResults(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const inputCls =
    "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary-saffron focus:ring-2 focus:ring-primary-saffron/20 transition";
  const labelCls = "text-xs font-bold uppercase tracking-widest text-primary-red ml-1 mb-1.5 block";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate(data);
      }}
      className="space-y-5"
    >
      <div>
        <label className={labelCls}>Full Name</label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            required
            className={inputCls + " pl-11"}
            placeholder="Enter full name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Gender</label>
        <div className="flex gap-3">
          {["Male", "Female", "Other"].map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => setData({ ...data, gender: g })}
              className={`flex-1 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition ${
                data.gender === g
                  ? "border-primary-saffron bg-orange-50 text-primary-red"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Date of Birth</label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type="date"
              className={inputCls + " pl-11"}
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>Time of Birth</label>
          <div className="relative">
            <Clock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type="time"
              className={inputCls + " pl-11"}
              value={data.time}
              onChange={(e) => setData({ ...data, time: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div ref={ref} className="relative">
        <label className={labelCls}>Place of Birth</label>
        <div className="relative">
          <MapPin className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            required
            className={inputCls + " pl-11"}
            placeholder="Start typing a city…"
            value={query || data.place}
            onChange={(e) => {
              setTyped(true);
              setQuery(e.target.value);
              setData({ ...data, place: e.target.value });
            }}
          />
        </div>
        {showResults && results.length > 0 && (
          <div className="absolute z-20 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {results.map((r, i) => (
              <button
                type="button"
                key={i}
                className="block w-full text-left px-4 py-3 text-sm hover:bg-orange-50 border-b border-gray-50 last:border-0"
                onClick={() => {
                  setData({
                    ...data,
                    place: r.display_name,
                    lat: parseFloat(r.lat),
                    lon: parseFloat(r.lon),
                  });
                  setQuery(r.display_name);
                  setShowResults(false);
                }}
              >
                {r.display_name}
              </button>
            ))}
          </div>
        )}
        <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
          Defaults to Chennai if no place is selected.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-primary-saffron to-primary-red text-white font-bold py-3.5 shadow-lg hover:shadow-xl transition disabled:opacity-60"
      >
        {loading ? "Calculating…" : submitLabel}
      </button>
    </form>
  );
}

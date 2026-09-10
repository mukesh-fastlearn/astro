"use client";

import { House } from "@/lib/astrology/kundli";
import { ZODIAC_SIGNS } from "@/lib/astrology/constants";

const ABBR: Record<string, string> = {
  Ascendant: "Asc", Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
  Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};

/**
 * Label anchor for each of the twelve North-Indian compartments, in the order
 * house 1..12. Unlike the South-Indian grid the houses are FIXED here — the
 * 1st house is always the top-centre diamond — and the sign number moves.
 */
const ANCHORS: { x: number; y: number }[] = [
  { x: 200, y: 95 },   // 1  top centre diamond
  { x: 105, y: 48 },   // 2  top-left triangle
  { x: 52, y: 105 },   // 3  left-top triangle
  { x: 105, y: 200 },  // 4  left centre diamond
  { x: 52, y: 295 },   // 5  left-bottom triangle
  { x: 105, y: 352 },  // 6  bottom-left triangle
  { x: 200, y: 305 },  // 7  bottom centre diamond
  { x: 295, y: 352 },  // 8  bottom-right triangle
  { x: 348, y: 295 },  // 9  right-bottom triangle
  { x: 295, y: 200 },  // 10 right centre diamond
  { x: 348, y: 105 },  // 11 right-top triangle
  { x: 295, y: 48 },   // 12 top-right triangle
];

export default function NorthIndianChart({
  houses,
  centerLabel,
}: {
  houses: House[];
  centerLabel?: string;
}) {
  const ordered = [...houses].sort((a, b) => a.houseNumber - b.houseNumber);

  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[380px] mx-auto" role="img" aria-label="North Indian birth chart">
      {/* Outer square */}
      <rect x="2" y="2" width="396" height="396" fill="#fff" stroke="#c1121f" strokeWidth="2" />
      {/* Both diagonals */}
      <line x1="2" y1="2" x2="398" y2="398" stroke="#c1121f" strokeWidth="1.2" strokeOpacity="0.55" />
      <line x1="398" y1="2" x2="2" y2="398" stroke="#c1121f" strokeWidth="1.2" strokeOpacity="0.55" />
      {/* Inner diamond joining the midpoints */}
      <path d="M 200 2 L 398 200 L 200 398 L 2 200 Z" fill="none" stroke="#c1121f" strokeWidth="1.4" strokeOpacity="0.7" />

      {ordered.map((h, i) => {
        const a = ANCHORS[i];
        const signNumber = (ZODIAC_SIGNS as readonly string[]).indexOf(h.sign) + 1;
        const planets = h.planets.map((p) => ABBR[p] ?? p.slice(0, 2));

        return (
          <g key={h.houseNumber}>
            {/* Sign number — the North Indian convention, not the sign name */}
            <text
              x={a.x}
              y={a.y - 12}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="#b45309"
            >
              {signNumber}
            </text>
            {planets.map((p, j) => (
              <text
                key={j}
                x={a.x}
                y={a.y + 6 + j * 13}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#1f2937"
              >
                {p}
              </text>
            ))}
          </g>
        );
      })}

      {centerLabel && (
        <text x="200" y="205" textAnchor="middle" fontSize="11" fontWeight="700" fill="#c1121f" opacity="0.35">
          {centerLabel}
        </text>
      )}
    </svg>
  );
}

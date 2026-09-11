import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://astro.rtechailabs.com"),
  title: "Golden Era Astro — Vedic Astrology, Kundli & Free Tools",
  description:
    "Free Vedic astrology tools: Kundli birth chart, Guna Milan compatibility, numerology, Vimshottari dasha timeline, marriage prediction and daily horoscopes — computed from real planetary positions.",
  openGraph: {
    title: "Golden Era Astro — Vedic Astrology & Free Tools",
    description: "Free Vedic astrology calculators built on real astronomical data.",
    images: ["/logo.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

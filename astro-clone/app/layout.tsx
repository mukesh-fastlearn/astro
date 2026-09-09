import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://abhishekastro.com"),
  title: "Astrologer Abhishek Soni — Vedic Astrology, Kundli & Free Tools",
  description:
    "Celebrity Vedic astrologer Abhishek Soni (25+ years, Nagpur). Free Kundli, Guna Milan compatibility, numerology, Vimshottari dasha, marriage prediction and daily horoscopes. Guiding Stars to Destiny.",
  openGraph: {
    title: "Astrologer Abhishek Soni — Vedic Astrology & Free Tools",
    description: "Celebrity Vedic astrologer with 25+ years of experience. Guiding Stars to Destiny.",
    images: ["/logo.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

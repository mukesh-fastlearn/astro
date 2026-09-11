import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import MobileTabBar from "@/components/MobileTabBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://goldeneraastro.com"),
  title: "Golden Era Astro — Vedic Astrology, Kundli & Free Tools",
  description:
    "Free Vedic astrology tools: Kundli birth chart, Guna Milan compatibility, numerology, Vimshottari dasha timeline, marriage prediction and daily horoscopes — computed from real planetary positions.",
  appleWebApp: {
    capable: true,
    title: "Golden Era Astro",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Golden Era Astro — Vedic Astrology & Free Tools",
    description: "Free Vedic astrology calculators built on real astronomical data.",
    images: ["/logo.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Zoom stays enabled deliberately — disabling it breaks accessibility for
  // anyone who needs to enlarge text.
  maximumScale: 5,
  themeColor: "#c1121f",
  viewportFit: "cover",
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
            <MobileTabBar />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

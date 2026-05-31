import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./sections.css";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roan — From our land, into your hands.",
  description:
    "Roan is a grass-fed organ blend from Bar W Ranch, a single family ranch in Wyoming. Born here, raised on our grass, traceable to a pasture.",
  metadataBase: new URL("https://roan.com"),
  openGraph: {
    title: "Roan — From our land, into your hands.",
    description:
      "A grass-fed organ blend from a single family ranch in Wyoming.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="is-loading">{children}</body>
    </html>
  );
}

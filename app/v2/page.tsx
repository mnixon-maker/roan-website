import type { Metadata } from "next";
import "./v2.css";
import SmoothScroll from "@/components/SmoothScroll";
import V2Boot from "@/components/v2/V2Boot";
import V2Header from "@/components/v2/V2Header";
import V2Hero from "@/components/v2/V2Hero";
import LightStatement from "@/components/v2/LightStatement";
import Statement from "@/components/v2/Statement";
import FeatureCards from "@/components/v2/FeatureCards";
import InfluencerScroller from "@/components/v2/InfluencerScroller";
import StatBand from "@/components/v2/StatBand";
import V2CTA from "@/components/v2/V2CTA";
import V2Footer from "@/components/v2/V2Footer";

export const metadata: Metadata = {
  title: "Roan — Eat like the land intended",
  description:
    "A grass-fed organ blend from one family ranch in Wyoming. Whole-food organs, traceable to a pasture. Loved by ranchers, doctors, coaches and runners.",
};

export default function V2Page() {
  return (
    <div className="v2">
      <V2Boot />
      <SmoothScroll />
      <V2Header />
      <main>
        <V2Hero />
        <LightStatement />
        <FeatureCards />
        <Statement />
        <InfluencerScroller />
        <StatBand />
        <V2CTA />
      </main>
      <V2Footer />
    </div>
  );
}

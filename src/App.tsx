import React from "react";
import BendingMarquee from "@/components/ui/bending-marquee";
import ElasticLettering from "@/components/ui/elastic-lettering";
import MomentumRing, { ReelItem } from "@/components/ui/momentum-ring";
import ScrollPortal, { PortalFrame } from "@/components/ui/scroll-portal";

const BRAND_MANTRAS = [
  "From Small Business to Recognizable Brand",
  "Zero Templates. Ever.",
  "Commercial Editorial Precision",
  "Artisanal Packaging & Social Storytelling",
  "High-ROAS Local Customer Acquisition",
  "Designed for Real Market Impact",
  "Unmistakable Visual Identity",
];

const REEL_CASES: ReelItem[] = [
  {
    id: 1,
    title: "Artisan Roast",
    category: "Specialty Coffee Roastery",
    tag: "01 / Brand Suite",
    description: "Matte black packaging, gold foil seal & localized footprint reels.",
  },
  {
    id: 2,
    title: "Kura Studio",
    category: "Contemporary Apparel",
    tag: "02 / Lookbook",
    description: "Editorial typography, aesthetic collection drops & retargeting.",
  },
  {
    id: 3,
    title: "Apex Clinic",
    category: "Cosmetic Aesthetics",
    tag: "03 / Authority",
    description: "Patient transformation storytelling & consultation acquisition.",
  },
  {
    id: 4,
    title: "Urban Hearth",
    category: "Artisan Bakery",
    tag: "04 / Footfall",
    description: "Sensory slow-motion video & geo-targeted weekend promotions.",
  },
  {
    id: 5,
    title: "Aura Botanics",
    category: "Luxury Wellness",
    tag: "05 / Identity",
    description: "Minimal amber glass design & high-converting paid social ads.",
  },
  {
    id: 6,
    title: "Atelier Studio",
    category: "Fine Handcrafted Jewelry",
    tag: "06 / Commerce",
    description: "Macro craft cinematography & high-ticket buyer acquisition.",
  },
];

const PORTAL_FRAMES: PortalFrame[] = [
  {
    id: 1,
    tag: "01 / The Brand Vision",
    badge: "Identity",
    title: "From Small Business to Recognizable Brand.",
    subtitle: "Every landmark business began with an unmistakable voice.",
    description: "We sculpt timeless serif typography, sensory color palettes, and tactile packaging that command authority the moment someone encounters your storefront or feed.",
  },
  {
    id: 2,
    tag: "02 / The Craft",
    badge: "Creation",
    title: "Zero Templates. Pure Creative Precision.",
    subtitle: "Built by five people who left big agencies because the incentives were broken.",
    description: "No generic canva layouts. We direct bespoke slow-motion video, tactile unboxing lookbooks, and high-retention social content tailored specifically to your niche.",
  },
  {
    id: 3,
    tag: "03 / The Engine",
    badge: "Performance",
    title: "Laser-Targeted Local Acquisition.",
    subtitle: "Driving real walk-in footfall and high-ticket customer consultations.",
    description: "Precision 5km radius Meta & Google ad funnels that convert passive local scrollers into repeat weekly customers and qualified booking inquiries.",
  },
  {
    id: 4,
    tag: "04 / The Destination",
    badge: "Growth",
    title: "Ready to Build Something Unmistakable?",
    subtitle: "Now taking 2 ambitious client partners for Q2 2025.",
    description: "Direct founder access, zero middlemen, and weekly transparent revenue reporting. Let's sculpt your business into a recognizable brand.",
  },
];

export function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col justify-center items-center py-20 space-y-24">
      {/* Elastic Lettering Section */}
      <div className="text-center max-w-4xl px-6 space-y-4">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E87348] font-medium block">
          React Bits Pro ✦ Elastic Lettering
        </span>
        <div className="py-2">
          <ElasticLettering
            text="Grab & Stretch The Brand"
            fontSize="clamp(2.5rem, 6vw, 4.8rem)"
            align="center"
            className="font-serif font-light text-white"
            tensionColor="#E87348"
            loop={true}
            loopInterval={4500}
          />
        </div>
        <p className="text-sm font-light text-[#8A8A8A] max-w-lg mx-auto">
          Interactive rubber-band physics with automatic wave ripples and touch/mouse fling response.
        </p>
      </div>

      {/* Scroll Portal Section */}
      <div className="w-full">
        <div className="text-center max-w-3xl mx-auto px-6 mb-8">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E87348] font-medium block">
            React Bits Pro ✦ Scroll Portal
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal mt-3">
            Step Through Nested Brand Portals
          </h2>
          <p className="text-xs font-mono uppercase tracking-widest text-[#7A7A7A] mt-2">
            [ Scroll down to travel through nested frames ]
          </p>
        </div>
        <ScrollPortal frames={PORTAL_FRAMES} height="320vh" />
      </div>

      {/* Momentum Ring / Vertical Reel Section */}
      <div className="w-full max-w-5xl px-6 text-center space-y-6">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E87348] font-medium block">
          React Bits Pro ✦ Momentum Ring (Vertical Reel)
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal">
          3D Kinetic Case Showcase
        </h2>
        <p className="text-xs font-mono uppercase tracking-widest text-[#7A7A7A]">
          [ Drag to spin with momentum blur • Click any card to snap into focus ]
        </p>
        <MomentumRing
          items={REEL_CASES}
          direction="vertical"
          radius={380}
          cardWidth={340}
          cardHeight={400}
          autoRotateSpeed={7}
          motionBlur={true}
          snap={true}
        />
      </div>

      {/* Bending Marquee Section */}
      <div className="w-full max-w-7xl">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E87348] font-medium">
            React Bits Pro ✦ Bending Marquee
          </span>
        </div>
        <BendingMarquee
          items={BRAND_MANTRAS}
          bend={22}
          speed={28}
          direction="left"
          curve="arch"
        />
        <BendingMarquee
          items={[
            "Specialty Cafes & Hospitality",
            "Contemporary Apparel & Fashion",
            "High-Trust Professional Clinics",
            "Emerging Regional Ventures",
            "Bespoke Visual Systems",
          ]}
          bend={16}
          speed={34}
          direction="right"
          curve="valley"
          className="mt-6"
        />
      </div>
    </div>
  );
}

export default App;

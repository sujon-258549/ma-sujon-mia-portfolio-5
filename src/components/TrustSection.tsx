"use client";

import React, { useState } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import {
  BadgeCheck,
  Globe,
  Zap,
  Users,
  PencilLine,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TrustSectionData, BrandLogo, TrustStats } from "@/types/trust";
import { useIsAuthorized } from "@/lib/auth";
import { TrustSectionEditModal } from "./modals/TrustSectionEditModal";
import { Badge } from "@/components/ui/badge";

interface TrustSectionProps {
  initialData?: TrustSectionData | null;
}

const defaultBrands: BrandLogo[] = [
  {
    id: 1,
    name: "Google",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
  {
    id: 2,
    name: "Amazon",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: 3,
    name: "Microsoft",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    id: 4,
    name: "Slack",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
  },
  {
    id: 5,
    name: "Airbnb",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
  },
  {
    id: 6,
    name: "Netflix",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
];

const defaultStats: TrustStats[] = [
  { label: "Client Satisfaction", value: "99%", icon: "BadgeCheck" },
  { label: "Global Projects", value: "50+", icon: "Globe" },
  { label: "Faster Delivery", value: "2x", icon: "Zap" },
  { label: "Repeat Clients", value: "85%", icon: "Users" },
];

const TrustSection: React.FC<TrustSectionProps> = ({ initialData }) => {
  const isAuthorized = useIsAuthorized();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sectionData, setSectionData] = useState<TrustSectionData>(() => ({
    title: initialData?.title || "Trusted by Global Visionaries",
    subtitle: initialData?.subtitle || "Brands & Impact",
    description:
      initialData?.description ||
      "Empowering world-class companies with precision-engineered digital solutions and high-performance applications.",
    isActive: initialData?.isActive ?? true,
    brands: initialData?.brands || defaultBrands,
    stats: initialData?.stats || defaultStats,
  }));

  const handleSave = (newData: TrustSectionData) => {
    setSectionData(newData);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BadgeCheck":
        return <BadgeCheck className="w-5 h-5 md:w-6 md:h-6" />;
      case "Globe":
        return <Globe className="w-5 h-5 md:w-6 md:h-6" />;
      case "Zap":
        return <Zap className="w-5 h-5 md:w-6 md:h-6" />;
      case "Users":
        return <Users className="w-5 h-5 md:w-6 md:h-6" />;
      default:
        return <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />;
    }
  };

  if (!sectionData.isActive && !isAuthorized) return null;

  return (
    <section
      id="trust"
      className={cn(
        "py-16 md:py-28 bg-[#0E1416] relative overflow-x-hidden overflow-y-clip transition-all duration-300",
        !sectionData.isActive && "opacity-60 grayscale-[0.5]",
      )}
    >
      {/* ── Background Aesthetics ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Admin Indicators */}
      {!sectionData.isActive && isAuthorized && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50 uppercase text-[9px] font-black tracking-widest px-4 py-1">
            Section Hidden from Public
          </Badge>
        </div>
      )}

      {/* Admin Edit Button */}
      {isAuthorized && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-30">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] p-0 shadow-2xl transition-all duration-500 cursor-pointer border-2 border-emerald-400/50 flex items-center justify-center group"
          >
            <PencilLine className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      <div className="main-container">
        <div className=" relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* ─────────── Stats Grid ─────────── */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {sectionData.stats?.map((stat, idx) => (
                  <div
                    key={idx}
                    className="relative group p-6 sm:p-8 rounded-xl bg-white/2 border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 sm:mb-6 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 shadow-lg shadow-emerald-500/10">
                        {getIcon(stat.icon)}
                      </div>
                      <div className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tighter tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-slate-500 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.25em] leading-tight max-w-[120px]">
                        {stat.label}
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ─────────── Content & Brands ─────────── */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8 sm:space-y-12">
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] shadow-inner">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Industry Trusted Professional</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                  {sectionData.title}
                </h2>
                <p className="text-slate-400 text-sm sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {sectionData.description}
                </p>
              </div>

              <div className="pt-8 sm:pt-12 border-t border-white/5">
                <p className="text-slate-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-center lg:text-left">
                  Premium Brand Partners
                </p>

                {/* ── React Fast Marquee ── */}
                <div className="relative group/marquee bg-black/10 rounded-xl overflow-hidden py-8 h-auto max-h-[200px]">
                  <Marquee
                    gradient={true}
                    gradientColor="#0E1416"
                    gradientWidth={40}
                    speed={35}
                    pauseOnHover={true}
                  >
                    {sectionData.brands?.map((brand, idx) => (
                      <div
                        key={idx}
                        className="mx-6 md:mx-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex items-center justify-center group/brand relative h-8 md:h-12 w-20 md:w-28"
                      >
                        <Image
                          src={brand.image}
                          alt={brand.name}
                          fill
                          className="object-contain invert brightness-0 hover:brightness-100 group-hover/brand:invert-0 group-hover/brand:brightness-100"
                          sizes="(max-width: 768px) 80px, 120px"
                        />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500 text-black text-[7px] font-bold rounded opacity-0 group-hover/brand:opacity-100 transition-all duration-300 translate-y-1 group-hover/brand:translate-y-0 uppercase tracking-widest whitespace-nowrap z-20">
                          {brand.name}
                        </div>
                      </div>
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrustSectionEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={sectionData}
        onSave={handleSave}
      />
      <style jsx>{`
        .group\/marquee :global(.rfm-marquee-container) {
          overflow-x: hidden !important;
        }
        .group\/marquee::-webkit-scrollbar {
          display: none;
        }
        .group\/marquee {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TrustSection;

"use client";

import React from "react";
import { BadgeCheck, Globe, Zap, Users } from "lucide-react";
import { TrustSectionData, BrandLogo, TrustStats } from "@/types/trust";
import { useIsAuthorized } from "@/lib/auth";

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

  const sectionData: TrustSectionData = {
    title: initialData?.title || "Trusted by Visionary Teams",
    subtitle: initialData?.subtitle || "Brands & Impact",
    description:
      initialData?.description ||
      "Collaborating with global brands and forward-thinking companies to build scalable digital solutions.",
    isActive: initialData?.isActive ?? true,
    brands: initialData?.brands || defaultBrands,
    stats: initialData?.stats || defaultStats,
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BadgeCheck":
        return <BadgeCheck className="w-6 h-6" />;
      case "Globe":
        return <Globe className="w-6 h-6" />;
      case "Zap":
        return <Zap className="w-6 h-6" />;
      case "Users":
        return <Users className="w-6 h-6" />;
      default:
        return <BadgeCheck className="w-6 h-6" />;
    }
  };

  if (!sectionData.isActive && !isAuthorized) return null;

  return (
    <section className="py-20 bg-[#121A1C] relative overflow-hidden border-y border-emerald-500/10">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <BadgeCheck className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {sectionData.title}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {sectionData.description}
          </p>
        </div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {sectionData.stats?.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-emerald-500/20 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-transform">
                {getIcon(stat.icon)}
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Brand Marquee */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#121A1C] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#121A1C] to-transparent z-10" />

          <div className="flex overflow-hidden group">
            <div className="flex animate-marquee group-hover:pause gap-12 items-center">
              {[...sectionData.brands!, ...sectionData.brands!].map(
                (brand, idx) => (
                  <div
                    key={idx}
                    className="w-32 md:w-40 h-20 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer flex items-center justify-center invert brightness-0"
                  >
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="max-w-full max-h-12 object-contain"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustSection;

"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsAuthorized } from "@/lib/auth";
import { AboutSectionData } from "@/types/about";
import { AboutEditModal } from "./modals/AboutEditModal";

interface AboutSectionProps {
  initialData?: AboutSectionData | null;
}

const AboutSection = ({ initialData }: AboutSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultData: AboutSectionData = {
    badge: "Professional Overview",
    badgeIcon: "fa-solid fa-sparkles",
    title: "Driven by Innovation & Technical",
    titleHighlight: "Precision",
    description: [
      "I am a dedicated Full Stack Developer with over half a decade of experience in crafting digital solutions that merge creativity with deep technical logic. Based in Bangladesh, I have helped numerous brands build scalable platforms from the ground up.",
      "My expertise lies in building high-performance applications using the MERN & Next.js stack. I don't just write code; I architect experiences that are blazing fast, accessible, and future-proof. Whether it's complex backend engineering or pixel-perfect interactive frontends, I ensure every project meets the highest industry standards.",
      "Currently, I am focused on pushing the boundaries of web technology, exploring real-time systems, and contributing to open-source communities while delivering premium value to my clients worldwide.",
    ],
    name: "Sujon Ahmed",
    role: "Full Stack Developer",
    image: "https://i.ibb.co.com/sdBh779Q/image.png",
    highlights: [
      {
        title: "Full Stack Development",
        desc: "Building seamless web applications with React, Next.js, and Node.js.",
        icon: "fa-solid fa-code",
      },
      {
        title: "Optimized Performance",
        desc: "Creating high-speed, scalable digital solutions for better UX.",
        icon: "fa-solid fa-rocket",
      },
      {
        title: "Global Standards",
        desc: "Adhering to modern coding practices and clean architecture.",
        icon: "fa-solid fa-globe",
      },
    ],
    stats: [
      { label: "Experience", value: "5+ Years", icon: "fa-solid fa-briefcase" },
      {
        label: "Products",
        value: "50+ Projects",
        icon: "fa-solid fa-layer-group",
      },
    ],
  };

  const [aboutData, setAboutData] = useState<AboutSectionData>(
    initialData || defaultData,
  );

  const handleSave = (newData: AboutSectionData) => {
    setAboutData(newData);
    console.log("Saved About Data:", newData);
  };

  // If section is inactive and not admin, hide entirely
  if (!aboutData.isActive && !isAuthorized) return null;

  return (
    <section
      id="about"
      className={`bg-[#121A1C] relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 ${!aboutData.isActive ? "opacity-60 grayscale-[0.5]" : ""}`}
    >
      {/* ── Background Glows ── */}
      <div className="absolute top-0 right-0 w-60 h-60 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-emerald-500/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Admin Indicators */}
      {!aboutData.isActive && isAuthorized && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50 uppercase text-[9px] font-black tracking-widest px-4 py-1">
            About Section Hidden from Public
          </Badge>
        </div>
      )}

      {/* Admin Edit Button */}
      {isAuthorized && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-30">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] p-0 shadow-2xl transition-all duration-500 cursor-pointer border-2 border-emerald-400/50 flex items-center justify-center"
            title="Edit About Section"
          >
            <i className="fa-solid fa-pen-to-square text-base sm:text-lg" />
          </Button>
        </div>
      )}

      <div className="main-container relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-14 items-start">
          {/* ─────────── Left Column: Image & Stats ─────────── */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-24">
            {/* Profile Image Card */}
            <div className="relative aspect-4/5 max-w-full md:max-w-sm lg:max-w-full mx-auto mb-6 sm:mb-8 group cursor-pointer">
              {/* Subtle Glow Behind Image */}
              <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-xl sm:rounded-3xl overflow-hidden border border-white/8 bg-[#1A2426] shadow-2xl transition-shadow duration-700">
                <Image
                  src={aboutData.image}
                  alt={aboutData.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 384px, (max-width: 1024px) 384px, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Permanent Bottom Gradient (always visible) */}
                <div className="absolute inset-0 bg-linear-to-t from-[#121A1C]/30 via-transparent to-transparent pointer-events-none" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#121A1C] via-emerald-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 sm:p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 text-center">
                  <div className="mb-3 sm:mb-4 transform -translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {aboutData.name}
                    </h3>
                    <p className="text-emerald-500 font-medium text-xs sm:text-sm tracking-widest uppercase">
                      {aboutData.role}
                    </p>
                  </div>

                  <div className="h-px w-10 sm:w-12 bg-emerald-500/50 mx-auto mb-3 sm:mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200" />

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                    {aboutData.title} {aboutData.titleHighlight}
                  </p>

                  <div className="flex justify-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-[400ms]">
                    <span className="px-2.5 sm:px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] sm:text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">
                      Innovation
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] sm:text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">
                      Precision
                    </span>
                  </div>
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/7 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6! md:mt-10! max-w-full  sm:max-w-xs md:max-w-sm lg:max-w-full mx-auto">
              {aboutData.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center hover:border-emerald-500/40 hover:bg-white/[0.07] transition-all duration-300 group/stat"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-1.5 sm:mb-2 group-hover/stat:scale-110 transition-transform duration-300">
                    <i
                      className={`${stat.icon} text-emerald-500 text-sm sm:text-base`}
                    />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-white leading-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────── Right Column: Content ─────────── */}
          <div className="w-full lg:w-7/12 pt-2 sm:pt-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4 sm:mb-6">
              <i
                className={`${aboutData.badgeIcon} text-xs sm:text-sm text-emerald-500`}
              />
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-500 uppercase tracking-widest">
                {aboutData.badge}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 sm:mb-6 md:mb-8 leading-tight">
              {aboutData.title}{" "}
              <span className="text-emerald-500">
                {aboutData.titleHighlight}
              </span>
            </h2>

            {/* Decorative Separator */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="h-0.5 w-8 sm:w-12 bg-linear-to-r from-emerald-500 to-emerald-500/0 rounded-full" />
              <div className="h-1 w-1 rounded-full bg-emerald-500/60" />
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10">
              {aboutData.description.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-5 sm:pt-6 border-t border-white/10">
              {aboutData.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 sm:gap-4 items-start group/highlight p-3 sm:p-4 rounded-xl hover:bg-white/3 transition-all duration-300"
                >
                  <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover/highlight:border-emerald-500/50 group-hover/highlight:bg-emerald-500/15 transition-all duration-300">
                    <i
                      className={`${item.icon} text-emerald-500 text-sm sm:text-base`}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 mb-0.5 sm:mb-1 group-hover/highlight:text-emerald-500 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-xs leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AboutEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={aboutData}
        onSave={handleSave}
      />
    </section>
  );
};

export default AboutSection;

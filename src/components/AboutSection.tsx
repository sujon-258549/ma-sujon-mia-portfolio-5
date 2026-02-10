"use client";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { isAdminAuthorized } from "@/lib/auth";
import { AboutSectionData } from "@/types/about";
import { AboutEditModal } from "./modals/AboutEditModal";

const AboutSection = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aboutData, setAboutData] = useState<AboutSectionData>({
    badge: "Professional Overview",
    badgeIcon: "Sparkles",
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
        icon: "Code2",
      },
      {
        title: "Optimized Performance",
        desc: "Creating high-speed, scalable digital solutions for better UX.",
        icon: "Rocket",
      },
      {
        title: "Global Standards",
        desc: "Adhering to modern coding practices and clean architecture.",
        icon: "Globe",
      },
    ],
    stats: [
      { label: "Experience", value: "5+ Years", icon: "Briefcase" },
      { label: "Products", value: "50+ Projects", icon: "Layout" },
    ],
  });

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAdminAuthorized();
      setIsAuthorized(authStatus);
    };
    checkAuth();
  }, []);

  const renderIcon = (
    iconName: string,
    className: string = "w-5 h-5 text-emerald-500",
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Info;
    return <Icon className={className} />;
  };

  const handleSave = (newData: AboutSectionData) => {
    setAboutData(newData);
    // In a real app, you would save to a database here
    console.log("Saved About Data:", newData);
  };

  return (
    <section
      id="about"
      className="bg-[#121A1C] relative overflow-hidden py-16 md:py-24"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] -z-1" />

      {/* Admin Edit Button */}
      {isAuthorized && (
        <div className="absolute top-8 right-8 z-30">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] p-0 shadow-2xl transition-all duration-500 cursor-pointer border-2 border-emerald-400/50 flex items-center justify-center"
            title="Edit About Section"
          >
            <i className="fa-solid fa-pen-to-square text-lg group-hover:scale-110 transition-transform"></i>
          </Button>
        </div>
      )}

      <div className="main-container relative z-10 px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Side: Image & Hover Content */}
          <div className="w-full lg:w-5/12 sticky top-24">
            <div className="relative aspect-[4/5] max-w-sm mx-auto mb-8 group cursor-pointer">
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-[#1A2426] shadow-2xl">
                {/* Profile Image */}
                <Image
                  src={aboutData.image}
                  alt={aboutData.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121A1C] via-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 text-center">
                  <div className="mb-4 transform -translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {aboutData.name}
                    </h3>
                    <p className="text-emerald-500 font-medium text-sm tracking-widest uppercase">
                      {aboutData.role}
                    </p>
                  </div>

                  <div className="h-px w-12 bg-emerald-500/50 mx-auto mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200" />

                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                    {aboutData.title} {aboutData.titleHighlight}
                  </p>

                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-400">
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">
                      Innovation
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">
                      Precision
                    </span>
                  </div>
                </div>

                {/* Decorative gradients */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Border Decoration */}
              <div className="absolute -inset-3 border border-emerald-500/20 rounded-[2.5rem] -z-10 translate-x-4 translate-y-4 opacity-40 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            </div>

            {/* Experience and Product Stats (Bottom of Image) */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              {aboutData.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    {renderIcon(stat.icon)}
                  </div>
                  <span className="text-xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Expanded Content */}
          <div className="w-full lg:w-7/12 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              {renderIcon(aboutData.badgeIcon, "w-3.5 h-3.5 text-emerald-500")}
              <span className="text-[11px] font-extrabold text-emerald-500 uppercase tracking-widest">
                {aboutData.badge}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              {aboutData.title}{" "}
              <span className="text-emerald-500">
                {aboutData.titleHighlight}
              </span>
            </h2>

            <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-10">
              {aboutData.description.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-white/10">
              {aboutData.highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/50 transition-all">
                    {renderIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 mb-1 group-hover:text-emerald-500 transition-colors">
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

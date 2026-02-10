"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import { isAdminAuthorized } from "@/lib/auth";
import { HeroSectionData } from "@/types/hero";
import { HeroEditModal } from "./modals/HeroEditModal";

const HeroSection = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(150);

  const [heroData, setHeroData] = useState<HeroSectionData>({
    greeting: "Hi, I'm",
    name: "Sujon",
    nameHighlight: "Sujon",
    rotatingTexts: [
      "Full Stack Developer",
      "UI/UX Enthusiast",
      "Tech Renovator",
    ],
    description:
      "Transforming ideas into scalable and high-performance web applications. Specialized in building modern digital experiences with",
    techHighlights: ["React", "Next.js", "Node.js"],
    buttons: {
      primary: {
        text: "Hire Me",
        link: "#contact",
      },
      secondary: {
        text: "Download CV",
        link: "/cv.pdf",
      },
    },
    techStack: [
      { name: "Frontend", icon: "Code2" },
      { name: "Backend", icon: "Terminal" },
      { name: "System", icon: "Cpu" },
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com", icon: "Github" },
      { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
      { platform: "Email", url: "mailto:sujon@example.com", icon: "Mail" },
      { platform: "Phone", url: "tel:+1234567890", icon: "Phone" },
      {
        platform: "WhatsApp",
        url: "https://wa.me/1234567890",
        icon: "MessageCircle",
      },
      { platform: "Facebook", url: "https://facebook.com", icon: "Facebook" },
    ],
  });

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAdminAuthorized();
      setIsAuthorized(authStatus);
    };
    checkAuth();
  }, []);

  const tick = () => {
    const i = loopNum % heroData.rotatingTexts.length;
    const fullText = heroData.rotatingTexts[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000); // Wait before deleting
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(150); // Reset typing speed
    } else {
      // Normal typing speed
      if (isDeleting) {
        setDelta(50);
      } else {
        setDelta(150);
      }
    }
  };

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text, delta]);

  const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
    const icons = LucideIcons as Record<string, unknown>;
    const IconComponent = icons[iconName];

    if (IconComponent && typeof IconComponent === "function") {
      const Icon = IconComponent as React.ComponentType<{ className?: string }>;
      return <Icon className={className} />;
    }

    return <LucideIcons.Code2 className={className} />;
  };

  const handleSave = (newData: HeroSectionData) => {
    setHeroData(newData);
    // In a real app, you would save to a database here
    console.log("Saved Hero Data:", newData);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121A1C] pb-20 pt-40">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full bg-[#121A1C]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] opacity-20 animate-pulse" />
      </div>

      {/* Admin Edit Button */}
      {isAuthorized && (
        <div className="absolute top-8 right-8 z-30">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] p-0 shadow-2xl transition-all duration-500 cursor-pointer border-2 border-emerald-400/50 flex items-center justify-center"
            title="Edit Hero Section"
          >
            <i className="fa-solid fa-pen-to-square text-lg group-hover:scale-110 transition-transform"></i>
          </Button>
        </div>
      )}

      <div className="main-container relative z-10 w-full">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4">
          {/* Main Headline */}
          <h1 className="animate-fade-in-up text-3xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            {heroData.greeting}{" "}
            <span className="text-emerald-500">{heroData.nameHighlight}</span>
            <br />
            <span className="text-3xl md:text-5xl mt-2 block text-slate-300">
              {text}
              <span className="animate-pulse text-emerald-500">|</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="animate-fade-in-up delay-100 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroData.description}{" "}
            {heroData.techHighlights.map((tech, idx) => (
              <span key={idx}>
                <span className="text-emerald-400 font-medium">{tech}</span>
                {idx < heroData.techHighlights.length - 1 && ", "}
                {idx === heroData.techHighlights.length - 2 && "and "}
              </span>
            ))}
            .
          </p>

          {/* Action Buttons */}
          <div className="animate-fade-in-up delay-200 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              onClick={() =>
                (window.location.href = heroData.buttons.primary.link)
              }
              className="h-10 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {heroData.buttons.primary.text}
              {renderIcon("Send", "ml-2 w-4 h-4")}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                (window.location.href = heroData.buttons.secondary.link)
              }
              className="h-10 px-8 bg-white/5 border border-white/10 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 font-medium rounded-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {heroData.buttons.secondary.text}
              {renderIcon("Download", "ml-2 w-4 h-4")}
            </Button>
          </div>

          {/* Tech Stack Indicators */}
          <div className="animate-fade-in-up delay-300 mt-12 pt-8 border-t border-white/5 w-full max-w-2xl">
            <p className="text-sm text-slate-500 mb-4 tracking-wider font-medium">
              Tech Stack
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {heroData.techStack.map((stack, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all">
                    {renderIcon(
                      stack.icon,
                      "w-6 h-6 text-slate-300 group-hover:text-emerald-400",
                    )}
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                    {stack.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Social Links Side Bar */}
          <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-50">
            {/* Vertical Line Top */}
            <div className="h-16 w-px bg-gradient-to-t from-emerald-500/50 to-transparent mx-auto mb-2" />
            {heroData.socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all transform hover:scale-110 hover:translate-x-1"
                title={link.platform}
              >
                {renderIcon(link.icon, "w-4 h-4")}
              </a>
            ))}

            {/* Vertical Line */}
            <div className="h-16 w-px bg-gradient-to-b from-emerald-500/50 to-transparent mx-auto mt-2" />
          </div>
        </div>
      </div>

      <HeroEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={heroData}
        onSave={handleSave}
      />
    </section>
  );
};

export default HeroSection;

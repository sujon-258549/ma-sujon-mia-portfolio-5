"use client";

import { NavLink } from "@/types/header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface FloatingNavProps {
  navLinks: NavLink[];
  isSideOpen?: boolean;
  isAuthorized?: boolean;
}

export const FloatingNav = ({
  navLinks,
  isSideOpen = false,
  isAuthorized = false,
}: FloatingNavProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(true); // Open by default

  useEffect(() => {
    const handleScroll = () => {
      // Update Scroll Progress
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Active Section Detection
      const scrollPosition = window.scrollY + 250;
      for (const item of navLinks) {
        const id = item.link.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.link);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  if (!isSideOpen && !isAuthorized) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-center gap-3">
      {/* Toggle Button (Modern UI) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-9 h-9 flex items-center justify-center bg-[#0A0F11]/80 backdrop-blur-xl border border-emerald-500/15 rounded-sm shadow-2xl transition-all duration-300 hover:bg-[#121A1C] hover:border-emerald-500/30 group z-[110] ${
          isOpen ? "text-emerald-500" : "text-slate-400"
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <Menu className="w-5 h-5 animate-pulse" />
        )}
      </button>

      {/* Smart Dock Container */}
      <div
        className={`relative flex flex-col items-center py-4 bg-[#0A0F11]/60 backdrop-blur-2xl border border-emerald-500/15 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)] group/dock transition-all duration-500 hover:border-emerald-500/20 px-1.5 gap-3 origin-top ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 -translate-y-4 pointer-events-none h-0 py-0 border-none overflow-hidden"
        }`}
      >
        {/* Vertical Progress Line (Smart Edge) */}
        <div className="absolute right-0 top-6 bottom-6 w-[1.5px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="w-full bg-emerald-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>

        {navLinks.map((item, idx) => {
          const isActive = activeSection === item.link;

          return (
            <Link
              key={idx}
              href={item.link}
              className="group relative flex items-center justify-center w-8 h-8 focus:outline-none"
            >
              {/* Intelligent Tooltip */}
              <div className="absolute right-full mr-5 px-3 py-1.5 rounded-sm bg-black/95 backdrop-blur-2xl border border-emerald-500/15 text-white text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap opacity-0 translate-x-4 pointer-events-none transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:mr-7 flex items-center gap-2 z-[120]">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                {item.text}
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-black/95 border-r border-t border-emerald-500/15 rotate-45" />
              </div>

              {/* Icon Container (Minimal Box) */}
              <div
                className={`flex items-center justify-center w-full h-full rounded-sm transition-all duration-500 relative z-20 ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 scale-110 border border-emerald-500/20"
                    : "bg-white/5 text-slate-500 hover:text-white hover:bg-white/10"
                }`}
              >
                {/* Active Bloom */}
                {isActive && (
                  <div className="absolute inset-0 bg-emerald-500/5 blur-lg rounded-sm animate-pulse" />
                )}

                <i
                  className={`${item.icon || "fa-solid fa-circle"} text-[12px] transition-all duration-500 group-hover:scale-110`}
                />
              </div>

              {/* Status Indicator Dot */}
              <div
                className={`absolute -right-2 w-1 h-1 rounded-full bg-emerald-500 transition-all duration-500 ${
                  isActive
                    ? "opacity-100 scale-100 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    : "opacity-0 scale-0 group-hover:opacity-40"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

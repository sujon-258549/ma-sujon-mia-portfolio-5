"use client";

import { NavLink } from "@/types/header";
import Link from "next/link";
import { useState, useEffect } from "react";

interface FloatingNavProps {
  navLinks: NavLink[];
}

export const FloatingNav = ({ navLinks }: FloatingNavProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex items-center gap-4">
      {/* Smart Dock Container */}
      <div className="relative flex flex-col items-center py-4 bg-[#0A0F11]/40 backdrop-blur-2xl border border-white/5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] group/dock transition-all duration-500 hover:border-emerald-500/20 hover:bg-[#0A0F11]/60 px-1.5 gap-2">
        {/* Vertical Progress Line (Smart Edge) */}
        <div className="absolute right-0 top-6 bottom-6 w-[1px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="w-full bg-emerald-500/40 transition-all duration-300 ease-out"
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
              <div className="absolute right-full mr-5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 text-white text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap opacity-0 translate-x-4 pointer-events-none transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:mr-6 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                {item.text}
                {/* Pointer */}
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-black/80 border-r border-t border-white/10 rotate-45" />
              </div>

              {/* Icon Logic */}
              <div
                className={`flex items-center justify-center w-full h-full rounded-full transition-all duration-500 relative z-20 ${
                  isActive
                    ? "text-emerald-400 scale-110"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {/* Active Bloom Effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full animate-pulse" />
                )}

                <i
                  className={`${item.icon || "fa-solid fa-circle"} text-[10px] transition-transform duration-500 group-hover:scale-125 group-active:scale-95`}
                />
              </div>

              {/* Magnetic Dot Indicator */}
              <div
                className={`absolute -right-1 w-1 h-1 rounded-full bg-emerald-500 transition-all duration-500 ${
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-40"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
  );
};

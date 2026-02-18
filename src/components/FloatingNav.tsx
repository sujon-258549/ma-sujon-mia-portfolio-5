"use client";

import { NavLink } from "@/types/header";
import Link from "next/link";
import { useState, useEffect } from "react";

interface FloatingNavProps {
  navLinks: NavLink[];
}

export const FloatingNav = ({ navLinks }: FloatingNavProps) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of navLinks) {
        const id = item.link.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
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
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-4 items-end">
      {navLinks.map((item, idx) => (
        <Link
          key={idx}
          href={item.link}
          className="group relative flex items-center justify-end"
        >
          {/* Label - Slides in from right to left (revealing to the left of the icon) */}
          <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-emerald-500 text-[#0E1416] text-xs font-black uppercase tracking-widest whitespace-nowrap opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shadow-xl shadow-emerald-500/20">
            {item.text}
            {/* Arrow */}
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-emerald-500" />
          </div>

          {/* Icon Circle */}
          <div
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
              activeSection === item.link
                ? "bg-emerald-500 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "bg-[#121A1C]/80 backdrop-blur-md border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 group-hover:scale-110"
            }`}
          >
            {/* "Push Switch" Effect Background */}
            <div
              className={`absolute inset-0 bg-emerald-500 transition-transform duration-500 ease-in-out origin-bottom translate-y-full group-hover:translate-y-0 ${activeSection === item.link ? "translate-y-0" : ""}`}
            />

            <i
              className={`${item.icon || "fa-solid fa-circle"} transition-all duration-300 relative z-10 ${
                activeSection === item.link
                  ? "text-[#0E1416] scale-110"
                  : "text-slate-400 group-hover:text-emerald-400"
              }`}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

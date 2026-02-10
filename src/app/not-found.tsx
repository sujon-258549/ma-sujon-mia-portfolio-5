"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0E1416] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-2xl mx-auto px-6 text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-red-500/20 flex items-center justify-center border border-emerald-500/30">
              <i className="fa-solid fa-triangle-exclamation text-4xl text-emerald-500"></i>
            </div>
            <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-xl -z-10 animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          Oops! The page you,re looking for seems to have wandered off into the
          digital void. Do,'t worry, even the best explorers get lost sometimes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] font-bold rounded-lg transition-all duration-300 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 active:scale-95 flex items-center gap-3"
          >
            <i className="fa-solid fa-house text-lg group-hover:scale-110 transition-transform"></i>
            <span>Back to Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all duration-300 border border-white/10 hover:border-emerald-500/50 active:scale-95 flex items-center gap-3"
          >
            <i className="fa-solid fa-arrow-left text-lg group-hover:-translate-x-1 transition-transform"></i>
            <span>Go Back</span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-slate-500 text-sm mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              {
                name: "Projects",
                href: "/#projects",
                icon: "fa-solid fa-briefcase",
              },
              { name: "Skills", href: "/#skills", icon: "fa-solid fa-code" },
              {
                name: "Contact",
                href: "/#contact",
                icon: "fa-solid fa-envelope",
              },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 bg-white/5 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-500 rounded-lg text-sm transition-all duration-300 border border-white/5 hover:border-emerald-500/30 flex items-center gap-2"
              >
                <i className={`${link.icon} text-xs`}></i>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-50" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-cyan-500 rounded-full animate-ping opacity-50 delay-300" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-50 delay-700" />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-cyan-500 rounded-full animate-ping opacity-50 delay-1000" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [particles, setParticles] = useState<
    { top: string; left: string; delay: string }[]
  >([]);

  useEffect(() => {
    setMounted(true);
    console.error("Error occurred:", error);

    // Generate random particles on client side only to avoid hydration mismatch
    const newParticles = [...Array(8)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${i * 200}ms`,
    }));
    setParticles(newParticles);
  }, [error]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleReset = () => {
    setCountdown(10);
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0E1416] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:700ms]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Error Icon with Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border-2 border-red-500/30 animate-pulse">
              <i className="fa-solid fa-circle-exclamation text-6xl text-red-500 animate-bounce"></i>
            </div>
            <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-2xl -z-10 animate-pulse" />

            {/* Rotating Ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-red-500/50 rounded-full animate-spin" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 mb-4">
          Oops! Something Broke
        </h1>

        {/* Error Subtitle */}
        <p className="text-xl text-slate-300 mb-8">
          Don&apos;t panic! Even the best code has bad days.
        </p>

        {/* Error Details Card */}
        <div className="mb-8 p-6 bg-red-500/5 border border-red-500/20 rounded-xl backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-1">
              <i className="fa-solid fa-bug text-2xl text-red-400"></i>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-bold text-red-400 mb-2">
                Error Details
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                We encountered an unexpected error while processing your
                request. Our team has been automatically notified and is working
                on a fix.
              </p>

              {/* Development Mode Error Message */}
              {process.env.NODE_ENV === "development" && (
                <div className="mt-4 p-4 bg-black/30 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-xs font-mono break-all text-left">
                    <strong>Error Message:</strong> {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-orange-400 text-xs font-mono mt-2">
                      <strong>Digest:</strong> {error.digest}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleReset}
            className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] font-bold rounded-lg transition-all duration-300 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 active:scale-95 flex items-center gap-3 min-w-[200px]"
          >
            <i className="fa-solid fa-rotate-right text-lg group-hover:rotate-180 transition-transform duration-500"></i>
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all duration-300 border border-white/10 hover:border-emerald-500/50 active:scale-95 flex items-center gap-3 min-w-[200px]"
          >
            <i className="fa-solid fa-house text-lg group-hover:scale-110 transition-transform"></i>
            <span>Go Home</span>
          </Link>
        </div>

        {/* Auto-refresh Countdown */}
        <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-center justify-center gap-3">
            <i className="fa-solid fa-clock text-emerald-500"></i>
            <p className="text-slate-400 text-sm">
              Auto-refresh in{" "}
              <span className="text-emerald-500 font-bold text-lg">
                {countdown}
              </span>{" "}
              seconds
            </p>
          </div>
          <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
              style={{ width: `${(countdown / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Helpful Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: "fa-solid fa-rotate",
              title: "Refresh the page",
              desc: "Sometimes a simple refresh fixes everything",
            },
            {
              icon: "fa-solid fa-wifi",
              title: "Check connection",
              desc: "Make sure you're connected to the internet",
            },
            {
              icon: "fa-solid fa-clock-rotate-left",
              title: "Try again later",
              desc: "We might be updating our systems",
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
            >
              <i className={`${tip.icon} text-2xl text-emerald-500 mb-2`}></i>
              <h4 className="text-sm font-bold text-white mb-1">{tip.title}</h4>
              <p className="text-xs text-slate-400">{tip.desc}</p>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="pt-8 border-t border-white/5">
          <p className="text-slate-500 text-sm mb-4">
            Still having issues? We&apos;re here to help!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              {
                name: "Contact Support",
                href: "/#contact",
                icon: "fa-solid fa-envelope",
              },
              {
                name: "Report Bug",
                href: "/#contact",
                icon: "fa-solid fa-bug",
              },
              { name: "Documentation", href: "/", icon: "fa-solid fa-book" },
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

      {/* Floating Error Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500 rounded-full animate-ping opacity-30"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

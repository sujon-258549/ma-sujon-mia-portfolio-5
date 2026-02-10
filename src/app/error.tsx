"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0E1416] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center border-2 border-red-500/30">
              <i className="fa-solid fa-circle-exclamation text-5xl text-red-500"></i>
            </div>
            <div className="absolute -inset-3 bg-red-500/20 rounded-full blur-xl -z-10 animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          We encountered an unexpected error. Don't worry, our team has been
          notified and we're working on it.
        </p>

        {/* Error Details (in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
            <p className="text-red-400 text-sm font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] font-bold rounded-lg transition-all duration-300 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 active:scale-95 flex items-center gap-3"
          >
            <i className="fa-solid fa-rotate-right text-lg group-hover:rotate-180 transition-transform duration-500"></i>
            <span>Try Again</span>
          </button>

          <a
            href="/"
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all duration-300 border border-white/10 hover:border-emerald-500/50 active:scale-95 flex items-center gap-3"
          >
            <i className="fa-solid fa-house text-lg group-hover:scale-110 transition-transform"></i>
            <span>Go Home</span>
          </a>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-slate-500 text-sm">
            If this problem persists, please{" "}
            <a
              href="/#contact"
              className="text-emerald-500 hover:text-emerald-400 underline"
            >
              contact support
            </a>
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-50" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-50 delay-300" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-50 delay-700" />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-50 delay-1000" />
      </div>
    </div>
  );
}

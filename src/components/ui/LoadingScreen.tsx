"use client";

import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0F11]/80 backdrop-blur-3xl">
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated Logo/Icon Container */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-emerald-400/50 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border-b-2 border-emerald-300/30 animate-spin-slower" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse">
              S
            </span>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-bold text-white tracking-widest uppercase">
            Loading
          </h3>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -5 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2,
                }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

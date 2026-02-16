"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-[#121A1C] text-white">
      <Header />

      {/* Hero Skeleton */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121A1C] pb-20 pt-40">
        <div className="main-container relative z-10 w-full animate-pulse">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 space-y-8">
            {/* Title Skeleton */}
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="h-12 md:h-20 w-3/4 bg-white/10 rounded-2xl"></div>
              <div className="h-10 md:h-16 w-1/2 bg-white/5 rounded-xl"></div>
            </div>

            {/* Subheading Skeleton */}
            <div className="space-y-3 w-full max-w-2xl flex flex-col items-center">
              <div className="h-4 w-full bg-white/5 rounded-full"></div>
              <div className="h-4 w-5/6 bg-white/5 rounded-full"></div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="h-12 w-40 bg-emerald-500/20 rounded-xl"></div>
              <div className="h-12 w-40 bg-white/5 rounded-xl border border-white/10"></div>
            </div>

            {/* Tech Stack Skeleton */}
            <div className="mt-12 pt-8 border-t border-white/5 w-full max-w-2xl">
              <div className="h-3 w-24 bg-white/5 rounded-full mx-auto mb-6"></div>
              <div className="flex justify-center gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10"></div>
                    <div className="h-2 w-12 bg-white/5 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections Skeleton Preview */}
      <div className="main-container py-32 space-y-40">
        {/* Skills Preview */}
        <div className="space-y-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-6 w-32 bg-white/5 rounded-full"></div>
            <div className="h-12 w-64 bg-white/10 rounded-xl"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-48 bg-[#172023] rounded-3xl border border-white/5 p-8 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5"></div>
                  <div className="h-4 w-40 bg-white/5 rounded-full"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div
                      key={j}
                      className="h-6 w-16 bg-white/5 rounded-lg"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Preview */}
        <div className="space-y-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-6 w-32 bg-white/5 rounded-full"></div>
            <div className="h-12 w-64 bg-white/10 rounded-xl"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 bg-[#121A1C] rounded-3xl border border-white/5 p-8 space-y-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5"></div>
                <div className="space-y-4">
                  <div className="h-6 w-3/4 bg-white/10 rounded-lg"></div>
                  <div className="h-20 w-full bg-white/5 rounded-lg"></div>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="h-2 w-1/2 bg-white/5 rounded-full"></div>
                  <div className="h-2 w-1/3 bg-white/5 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Preview */}
        <div className="space-y-16">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-6 w-32 bg-white/5 rounded-full"></div>
            <div className="h-12 w-64 bg-white/10 rounded-xl"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[450px] bg-[#172023] rounded-3xl border border-white/5 overflow-hidden flex flex-col"
              >
                <div className="h-56 bg-white/5"></div>
                <div className="p-8 space-y-4 flex-1">
                  <div className="h-6 w-3/4 bg-white/10 rounded-lg"></div>
                  <div className="h-12 w-full bg-white/5 rounded-lg"></div>
                  <div className="pt-4 flex gap-2">
                    <div className="h-6 w-12 bg-white/5 rounded-full"></div>
                    <div className="h-6 w-12 bg-white/5 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

"use client";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0E1416]">
      {/* Hero Section Skeleton */}
      <section className="min-h-screen bg-[#0E1416] relative flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:700ms]" />
        </div>

        {/* Content Skeleton */}
        <div className="relative z-10 main-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="space-y-6 animate-pulse">
              <div className="h-6 bg-white/5 rounded w-48" />
              <div className="space-y-4">
                <div className="h-16 bg-white/5 rounded w-full" />
                <div className="h-16 bg-white/5 rounded w-5/6" />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-4/5" />
              </div>
              <div className="flex gap-4">
                <div className="h-12 bg-white/5 rounded-lg w-32" />
                <div className="h-12 bg-white/5 rounded-lg w-32" />
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex justify-center lg:justify-end animate-pulse">
              <div className="w-80 h-80 bg-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="section-spacing bg-[#121A1C] relative overflow-hidden">
        <div className="main-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Skeleton */}
            <div className="animate-pulse">
              <div className="w-full h-96 bg-white/5 rounded-2xl" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6 animate-pulse">
              <div className="h-8 bg-white/5 rounded w-32" />
              <div className="h-12 bg-white/5 rounded w-3/4" />
              <div className="space-y-3">
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-5/6" />
                <div className="h-4 bg-white/5 rounded w-4/6" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="h-20 bg-white/5 rounded-lg" />
                <div className="h-20 bg-white/5 rounded-lg" />
                <div className="h-20 bg-white/5 rounded-lg" />
                <div className="h-20 bg-white/5 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      </section>

      {/* Skills Section Skeleton */}
      <section className="section-spacing bg-[#0E1416] relative">
        <div className="main-container">
          {/* Section Header */}
          <div className="text-center mb-16 animate-pulse">
            <div className="inline-block h-8 bg-white/5 rounded-full w-32 mb-4" />
            <div className="h-12 bg-white/5 rounded w-96 mx-auto mb-4" />
            <div className="h-4 bg-white/5 rounded w-2/3 mx-auto" />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#172023] border border-white/5 rounded-lg p-6 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-white/5 rounded-lg" />
                  <div className="h-5 bg-white/5 rounded w-32" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-8 bg-white/5 rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section Skeleton */}
      <section className="section-spacing bg-[#121A1C] relative">
        <div className="main-container">
          {/* Section Header */}
          <div className="text-center mb-16 animate-pulse">
            <div className="inline-block h-8 bg-white/5 rounded-full w-32 mb-4" />
            <div className="h-12 bg-white/5 rounded w-96 mx-auto mb-4" />
            <div className="h-4 bg-white/5 rounded w-2/3 mx-auto" />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-[#172023] border border-white/5 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-white/5" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-white/5 rounded w-3/4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-white/5 rounded w-full" />
                    <div className="h-3 bg-white/5 rounded w-5/6" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-white/5 rounded-full w-16" />
                    <div className="h-6 bg-white/5 rounded-full w-20" />
                    <div className="h-6 bg-white/5 rounded-full w-14" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section Skeleton */}
      <section className="section-spacing bg-[#0E1416] relative">
        <div className="main-container">
          {/* Section Header */}
          <div className="text-center mb-16 animate-pulse">
            <div className="inline-block h-8 bg-white/5 rounded-full w-32 mb-4" />
            <div className="h-12 bg-white/5 rounded w-96 mx-auto mb-4" />
            <div className="h-4 bg-white/5 rounded w-2/3 mx-auto" />
          </div>

          {/* Education Cards */}
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-[#172023] border border-white/5 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="p-8 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="h-8 bg-white/5 rounded w-3/4" />
                      <div className="h-4 bg-white/5 rounded w-1/2" />
                    </div>
                    <div className="h-10 bg-white/5 rounded-lg w-32" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/5 rounded w-full" />
                    <div className="h-3 bg-white/5 rounded w-5/6" />
                  </div>
                </div>
                <div className="p-8 bg-[#121A1C]/50 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-16 bg-white/5 rounded-lg" />
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="h-8 bg-white/5 rounded-lg flex-1"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section Skeleton */}
      <section className="section-spacing bg-[#121A1C] relative">
        <div className="main-container">
          {/* Section Header */}
          <div className="text-center mb-16 animate-pulse">
            <div className="inline-block h-8 bg-white/5 rounded-full w-32 mb-4" />
            <div className="h-12 bg-white/5 rounded w-96 mx-auto mb-4" />
            <div className="h-4 bg-white/5 rounded w-2/3 mx-auto" />
          </div>

          {/* Experience Cards */}
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-[#172023] border border-white/5 rounded-lg overflow-hidden animate-pulse"
              >
                <div className="p-8 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="h-8 bg-white/5 rounded w-3/4" />
                      <div className="h-4 bg-white/5 rounded w-1/2" />
                      <div className="flex gap-2">
                        <div className="h-6 bg-white/5 rounded-full w-24" />
                        <div className="h-6 bg-white/5 rounded-full w-24" />
                      </div>
                    </div>
                    <div className="h-10 bg-white/5 rounded-lg w-32" />
                  </div>
                </div>
                <div className="p-8 bg-[#121A1C]/50 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-16 bg-white/5 rounded-lg" />
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-16 bg-white/5 rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="section-spacing bg-[#0E1416] relative">
        <div className="main-container">
          {/* Section Header */}
          <div className="text-center mb-16 animate-pulse">
            <div className="inline-block h-8 bg-white/5 rounded-full w-32 mb-4" />
            <div className="h-12 bg-white/5 rounded w-96 mx-auto mb-4" />
            <div className="h-4 bg-white/5 rounded w-2/3 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Skeleton */}
            <div className="space-y-6 animate-pulse">
              <div className="h-12 bg-white/5 rounded-lg" />
              <div className="h-12 bg-white/5 rounded-lg" />
              <div className="h-32 bg-white/5 rounded-lg" />
              <div className="h-12 bg-white/5 rounded-lg" />
            </div>

            {/* Contact Cards Skeleton */}
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-white/5 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Shimmer Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
      </div>
    </div>
  );
}

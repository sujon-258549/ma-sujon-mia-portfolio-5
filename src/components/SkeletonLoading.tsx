export function SkeletonCard() {
  return (
    <div className="bg-[#172023] border border-emerald-500/15 rounded-lg p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-white/5 rounded-lg" />
        <div className="flex-1">
          <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
          <div className="h-3 bg-white/5 rounded w-1/2" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-5/6" />
        <div className="h-3 bg-white/5 rounded w-4/6" />
      </div>

      {/* Footer */}
      <div className="flex gap-2 mt-4">
        <div className="h-6 bg-white/5 rounded-full w-16" />
        <div className="h-6 bg-white/5 rounded-full w-20" />
        <div className="h-6 bg-white/5 rounded-full w-14" />
      </div>
    </div>
  );
}

export function SkeletonSection() {
  return (
    <section className="section-spacing bg-[#121A1C] relative">
      <div className="main-container">
        {/* Section Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="inline-block h-8 bg-white/5 rounded-full w-32 mb-4" />
          <div className="h-12 bg-white/5 rounded w-96 mx-auto mb-4" />
          <div className="h-4 bg-white/5 rounded w-2/3 mx-auto" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
    </section>
  );
}

export function SkeletonHero() {
  return (
    <section className="min-h-screen bg-[#0E1416] relative flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
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
  );
}

export function SkeletonList() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-[#172023] border border-emerald-500/15 rounded-lg p-6 animate-pulse"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/5 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-white/5 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
              <div className="h-3 bg-white/5 rounded w-full" />
              <div className="h-3 bg-white/5 rounded w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0E1416] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:700ms]" />
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Spinner */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />

          {/* Inner Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-[spin_1.5s_linear_infinite_reverse]" />
          </div>

          {/* Center Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl font-bold text-white">
            Loading<span className="animate-pulse">...</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Please wait while we prepare your experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 animate-[shimmer_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

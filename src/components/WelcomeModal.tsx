"use client";

import { useEffect, useState } from "react";

import { X, ArrowRight, Sparkles, Settings2 } from "lucide-react";
import { WelcomeModalData } from "@/types/welcome";
import { useIsAuthorized } from "@/lib/auth";
import { WelcomeModalEditModal } from "@/components/modals/WelcomeModalEditModal";

// Updated key again to force show for testing
const STORAGE_KEY = "portfolio_welcome_shown_v4";
const AUTO_CLOSE_DELAY = 10000; // 10 seconds

interface WelcomeModalProps {
  initialData?: WelcomeModalData | null;
}

export const WelcomeModal = ({ initialData }: WelcomeModalProps) => {
  const isAuthorized = useIsAuthorized();
  const [isVisible, setIsVisible] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isManuallyClosed, setIsManuallyClosed] = useState(false);

  // Default data fallback
  const [data, setData] = useState<WelcomeModalData>(() => ({
    isActive: initialData?.isActive ?? true,
    welcomeBadge: initialData?.welcomeBadge || "Welcome to my portfolio",
    title: initialData?.title || "Hey, I'm",
    titleHighlight: initialData?.titleHighlight || "Sujon Mia",
    description:
      initialData?.description ||
      "Full-Stack Developer · Building fast & beautiful web apps.",
    quickLinks: initialData?.quickLinks || [
      { id: "projects", label: "Projects", icon: "fa-solid fa-folder-open" },
      { id: "skills", label: "Skills", icon: "fa-solid fa-layer-group" },
      { id: "experience", label: "Experience", icon: "fa-solid fa-briefcase" },
      { id: "reviews", label: "Reviews", icon: "fa-solid fa-star" },
    ],
    ctaText: initialData?.ctaText || "Let's Work Together",
    ctaLink: initialData?.ctaLink || "contact",
  }));

  // Sync with initialData if it updates
  // Track previous initialData to avoid unnecessary updates/re-renders
  // Sync with initialData if it updates
  const [prevInitialDataStr, setPrevInitialDataStr] = useState(
    initialData ? JSON.stringify(initialData) : null,
  );

  if (initialData) {
    const currentInitialDataStr = JSON.stringify(initialData);
    if (currentInitialDataStr !== prevInitialDataStr) {
      setPrevInitialDataStr(currentInitialDataStr);
      setData((prev) => ({ ...prev, ...initialData }));
    }
  }

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsManuallyClosed(true); // Mark as manually closed
    }, 400);
  };

  const handleScrollTo = (id: string) => {
    handleClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 450);
  };

  const handleSave = (newData: WelcomeModalData) => {
    setData(newData);
    // After saving, reopen the welcome modal to show changes
    setIsVisible(true);
    setIsAnimatingOut(false);
    setIsManuallyClosed(false);
  };

  // Show logic
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);

    // If admin, we allow reopening via the floating button, but initial auto-show logic remains
    if (alreadyShown && !isAuthorized) return;
    if (!data.isActive && !isAuthorized) return;

    // Initial delayed show
    const showTimer = setTimeout(() => {
      if (!isManuallyClosed && !isEditOpen) {
        setIsVisible(true);
        if (!isAuthorized) {
          sessionStorage.setItem(STORAGE_KEY, "true");
          // Auto-close only for non-admins
          const closeTimer = setTimeout(() => handleClose(), AUTO_CLOSE_DELAY);
          return () => clearTimeout(closeTimer);
        }
      }
    }, 2000);

    return () => clearTimeout(showTimer);
  }, [data.isActive, isAuthorized, isManuallyClosed, isEditOpen]);

  // Progress bar countdown
  useEffect(() => {
    if (!isVisible || isAnimatingOut || isAuthorized) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p - 100 / (AUTO_CLOSE_DELAY / 100);
        return next <= 0 ? 0 : next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isVisible, isAnimatingOut, isAuthorized]);

  return (
    <>
      {/* Admin Floating Trigger (when modal is closed) */}
      {isAuthorized && !isVisible && !isEditOpen && (
        <button
          onClick={() => {
            setIsVisible(true);
            setIsAnimatingOut(false);
            setIsManuallyClosed(false);
            setProgress(100);
          }}
          className="fixed bottom-4 right-4 z-50 w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-2xl hover:bg-emerald-400 hover:scale-110 transition-all border-2 border-white/10"
          title="Show Welcome Modal Settings"
        >
          <Settings2 className="w-5 h-5 animate-spin-slow" />
        </button>
      )}

      {/* Welcome Modal */}
      {isVisible && !isEditOpen && (
        <>
          <div
            className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
              isAnimatingOut ? "opacity-0" : "opacity-100"
            }`}
            onClick={handleClose}
          />

          <div
            className={`fixed z-[10000] inset-0 flex items-center justify-center px-4 pointer-events-none transition-all duration-400 ${
              isAnimatingOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="pointer-events-auto w-full max-w-md relative group/modal">
              {/* Edit Button (on the modal itself) */}
              {isAuthorized && (
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setIsEditOpen(true);
                  }}
                  className="absolute -top-3 -right-3 z-50 w-8 h-8 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer border-2 border-white/10 opacity-0 group-hover/modal:opacity-100"
                  title="Edit Content"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              )}

              <div className="relative bg-[#0E1416] border border-emerald-500/25 rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)] shadow-emerald-500/10">
                {!isAuthorized && (
                  <div className="h-0.5 w-full bg-white/5">
                    <div
                      className="h-full bg-emerald-500 transition-none rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="px-8 py-8 relative z-10">
                  <div className="flex items-center gap-1.5 mb-5">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-500">
                      {data.welcomeBadge}
                    </span>
                  </div>

                  <h2 className="text-white font-black text-3xl leading-tight mb-2">
                    {data.title}{" "}
                    <span className="text-emerald-400">
                      {data.titleHighlight}
                    </span>{" "}
                    👋
                  </h2>
                  <p className="text-slate-400 text-base leading-relaxed mb-6">
                    {data.description}
                  </p>

                  <div className="h-px bg-white/5 mb-6" />

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {data.quickLinks.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleScrollTo(item.id)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/8 hover:bg-emerald-500/10 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 transition-all duration-200 cursor-pointer text-left group"
                      >
                        <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                          <i
                            className={`${item.icon} text-[10px] shrink-0 text-emerald-500/70`}
                          />
                        </div>
                        <span className="text-sm font-semibold">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleScrollTo(data.ctaLink)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all duration-200 cursor-pointer active:scale-[0.98] group shadow-lg shadow-emerald-500/20"
                  >
                    {data.ctaText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {!isAuthorized && (
                    <p className="text-center text-[10px] text-slate-600 mt-4 opacity-60">
                      Closes automatically in {AUTO_CLOSE_DELAY / 1000}s
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Modal (Always separate) */}
      {isAuthorized && (
        <WelcomeModalEditModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setIsVisible(true); // Re-show welcome modal when closing settings
          }}
          currentData={data}
          onSave={handleSave}
        />
      )}
    </>
  );
};

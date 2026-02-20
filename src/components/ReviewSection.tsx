"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { useIsAuthorized } from "@/lib/auth";
import { Review, ReviewSectionHeaderData } from "@/types/review";
import {
  Quote,
  MessageSquarePlus,
  Trash2,
  Settings2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AddReviewModal } from "@/components/modals/AddReviewModal";
import { ReviewSectionHeaderEditModal } from "@/components/modals/ReviewSectionHeaderEditModal";
import { reviewService } from "@/services/reviewService";
import { toast } from "sonner";
import { revalidateData } from "@/app/actions";

interface ReviewSectionProps {
  headerData?: ReviewSectionHeaderData | null;
  reviews?: Review[];
}

const SLIDE_INTERVAL = 4000; // ms between auto-slides

const ReviewSection = ({
  headerData,
  reviews: initialReviews,
}: ReviewSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditHeaderOpen, setIsEditHeaderOpen] = useState(false);

  // Slider state
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [sectionData, setSectionData] = useState<ReviewSectionHeaderData>(
    () => ({
      badge: headerData?.badge || "Testimonials",
      badgeIcon: headerData?.badgeIcon || "fa-solid fa-comments",
      title: headerData?.title || "What People",
      titleHighlight: headerData?.titleHighlight || "Say",
      description:
        headerData?.description ||
        "Feedback from clients, colleagues, and companies I've had the pleasure of working with.",
      isActive: headerData?.isActive ?? true,
    }),
  );

  const [reviews, setReviews] = useState<Review[]>(
    initialReviews && initialReviews.length > 0
      ? initialReviews
      : [
         
        ],
  );

  const total = reviews.length;

  // ── Navigation ──────────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || total === 0) return;
      setIsAnimating(true);
      setCurrent((index + total) % total);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating, total],
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // ── Auto-play ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || total === 0) return;
    autoPlayRef.current = setTimeout(() => next(), SLIDE_INTERVAL);
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [current, isPaused, next, total]);

  // ── Keyboard navigation ──────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // ── Touch / drag ─────────────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleNewReview = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
  };

  const handleHeaderSave = (data: ReviewSectionHeaderData) => {
    setSectionData(data);
  };

  const handleDeleteReview = async (review: Review) => {
    if (!window.confirm(`Delete review from "${review.name}"?`)) return;
    try {
      const reviewId = (review as Review & { _id?: string })._id || review.id;
      await reviewService.deleteReview(reviewId);
      setReviews((prev) =>
        prev.filter(
          (r) =>
            (r as Review & { _id?: string })._id !== reviewId &&
            r.id !== reviewId,
        ),
      );
      // Revalidate the cache
      await revalidateData("reviews");
      toast.success("Review deleted.");
    } catch {
      toast.error("Failed to delete review.");
    }
  };

  if (!sectionData.isActive && !isAuthorized) return null;

  // Visible indices: prev, current, next (for 3-card layout)
  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  const getCardClass = (idx: number) => {
    if (idx === current) return "center";
    if (idx === prevIdx) return "left";
    if (idx === nextIdx) return "right";
    return "hidden";
  };

  return (
    <section
      id="reviews"
      className={`section-spacing bg-[#121A1C] relative overflow-hidden ${
        !sectionData.isActive ? "opacity-60 grayscale-[0.5]" : ""
      }`}
    >
      {/* Background glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute -left-32 top-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-32 bottom-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Admin: Section Hidden Badge */}
      {!sectionData.isActive && isAuthorized && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50 uppercase text-[9px] font-black tracking-widest px-4 py-1">
            Section Hidden
          </Badge>
        </div>
      )}

      {/* Admin: Edit Header Button */}
      {isAuthorized && (
        <button
          type="button"
          onClick={() => setIsEditHeaderOpen(true)}
          className="absolute top-4 right-4 sm:top-10 sm:right-10 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-2xl hover:bg-emerald-400 transition-all cursor-pointer border-2 border-white/10"
          title="Edit Section Header"
        >
          <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      <div className="main-container relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-7 md:mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <i
              className={`${sectionData.badgeIcon} text-xs text-emerald-500`}
            ></i>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
              {sectionData.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white leading-tight">
            {sectionData.title}{" "}
            <span className="text-emerald-500">
              {sectionData.titleHighlight}
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
            {sectionData.description}
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm hover:bg-emerald-500 hover:text-black transition-all duration-300 cursor-pointer active:scale-95 group"
            >
              <MessageSquarePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Add Your Review
            </button>
          </div>
        </div>

        {/* ── Slider ── */}
        {total > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Cards stage */}
            <div
              ref={trackRef}
              className="relative flex items-center justify-center overflow-hidden"
              style={{ minHeight: "clamp(280px, 50vw, 380px)" }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {reviews.map((review, idx) => {
                const cardRole = getCardClass(idx);
                const reviewId =
                  (review as Review & { _id?: string })._id ||
                  review.id ||
                  String(idx);
                const isExpanded = expandedId === reviewId;

                if (cardRole === "hidden") return null;

                return (
                  <div
                    key={reviewId}
                    className={`review-slider-card absolute transition-all duration-500 ease-in-out ${
                      cardRole === "center"
                        ? "z-20 scale-100 opacity-100 translate-x-0"
                        : cardRole === "left"
                          ? "z-10 scale-[0.82] opacity-40 -translate-x-[62%] hidden sm:block"
                          : "z-10 scale-[0.82] opacity-40 translate-x-[62%] hidden sm:block"
                    }`}
                    style={{ width: "min(560px, 92vw)" }}
                  >
                    <div
                      className={`relative bg-[#1A2325] border rounded-2xl p-5 sm:p-8 flex flex-col transition-all duration-500 ${
                        cardRole === "center"
                          ? "border-emerald-500/30 shadow-2xl shadow-emerald-500/10"
                          : "border-white/5 cursor-pointer"
                      }`}
                      onClick={() => cardRole !== "center" && goTo(idx)}
                    >
                      {/* Admin delete */}
                      {isAuthorized && cardRole === "center" && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteReview(review);
                          }}
                          className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/50 rounded-lg border border-white/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center cursor-pointer"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Decorative quote */}
                      <div className="absolute top-6 right-8 text-white/5">
                        <Quote size={52} />
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-5 text-emerald-500 text-sm relative z-10">
                        {[...Array(Math.min(review.rating, 5))].map((_, i) => (
                          <i key={i} className="fa-solid fa-star" />
                        ))}
                      </div>

                      {/* Review text — 4 lines clamped */}
                      <div className="relative z-10 mb-6 flex-1">
                        <p
                          className={`text-slate-300 italic leading-relaxed transition-all duration-300 ${
                            isExpanded ? "" : "line-clamp-4"
                          }`}
                        >
                          &quot;{review.content}&quot;
                        </p>
                        {cardRole === "center" && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedId(isExpanded ? null : reviewId)
                            }
                            className="mt-2 text-[11px] text-emerald-500/70 hover:text-emerald-400 font-semibold cursor-pointer transition-colors"
                          >
                            {isExpanded ? "Show less ↑" : "Read more ↓"}
                          </button>
                        )}
                      </div>

                      {/* Reviewer */}
                      <div className="flex items-center gap-4 pt-5 border-t border-white/5">
                        <div className="w-12 h-12 rounded-full shrink-0 bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-lg">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold text-sm truncate">
                            {review.name}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {[review.role, review.company]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Controls ── */}
            <div className="flex items-center justify-center gap-6 mt-10">
              {/* Prev */}
              <button
                type="button"
                onClick={prev}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-emerald-500 hover:border-emerald-500 hover:text-black text-slate-400 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      idx === current
                        ? "w-8 h-2.5 bg-emerald-500"
                        : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={next}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-emerald-500 hover:border-emerald-500 hover:text-black text-slate-400 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Auto-play progress bar */}
            <div className="mt-6 mx-auto w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
              <div
                key={`${current}-${isPaused}`}
                className={`h-full bg-emerald-500 rounded-full ${
                  isPaused ? "" : "animate-progress-bar"
                }`}
                style={{
                  animationDuration: `${SLIDE_INTERVAL}ms`,
                  animationTimingFunction: "linear",
                  animationFillMode: "forwards",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddReviewModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleNewReview}
      />
      {isAuthorized && (
        <ReviewSectionHeaderEditModal
          isOpen={isEditHeaderOpen}
          onClose={() => setIsEditHeaderOpen(false)}
          currentData={sectionData}
          onSave={handleHeaderSave}
        />
      )}
    </section>
  );
};

export default ReviewSection;

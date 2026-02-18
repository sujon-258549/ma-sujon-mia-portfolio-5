"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { reviewService } from "@/services/reviewService";
import { Review } from "@/types/review";
import { revalidateData } from "@/app/actions";
import {
  Loader2,
  Star,
  Mail,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Step = "identity" | "verify" | "review";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (review: Review) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export const AddReviewModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AddReviewModalProps) => {
  // Step state
  const [step, setStep] = useState<Step>("identity");

  // Loading states
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resend cooldown
  const [resendCooldown, setResendCooldown] = useState(0);

  // OTP inputs (6 boxes)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Star rating
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const ratingLabel = ["", "Poor", "Fair", "Good", "Great!", "Excellent!"];

  // Form data
  const [identity, setIdentity] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    phone: "",
    content: "",
  });

  // ── Cooldown timer ──────────────────────────────────────────────────────
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // ── Reset everything on close ───────────────────────────────────────────
  const handleClose = () => {
    setStep("identity");
    setIdentity({ name: "", email: "" });
    setFormData({ role: "", company: "", phone: "", content: "" });
    setOtp(["", "", "", "", "", ""]);
    setRating(5);
    setHoveredRating(0);
    setResendCooldown(0);
    onClose();
  };

  // ── STEP 1 → Send OTP ──────────────────────────────────────────────────
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.name.trim() || !identity.email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }
    setIsSending(true);
    try {
      await reviewService.sendVerificationCode(identity.name, identity.email);
      toast.success(`Verification code sent to ${identity.email}`);
      setStep("verify");
      setResendCooldown(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send code.");
    } finally {
      setIsSending(false);
    }
  };

  // ── Resend OTP ──────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setIsSending(true);
    try {
      await reviewService.sendVerificationCode(identity.name, identity.email);
      toast.success("New code sent!");
      setOtp(["", "", "", "", "", ""]);
      setResendCooldown(60);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to resend code.",
      );
    } finally {
      setIsSending(false);
    }
  };

  // ── OTP box key handling ────────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((ch, i) => {
      next[i] = ch;
    });
    setOtp(next);
    const lastFilled = Math.min(pasted.length, 5);
    otpRefs.current[lastFilled]?.focus();
  };

  // ── STEP 2 → Verify OTP ────────────────────────────────────────────────
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }
    setIsVerifying(true);
    try {
      await reviewService.verifyCode(identity.email, code);
      toast.success("Email verified! Now write your review.");
      setStep("review");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Invalid code. Try again.",
      );
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } finally {
      setIsVerifying(false);
    }
  };

  // ── STEP 3 → Submit Review ─────────────────────────────────────────────
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      toast.error("Please write your review.");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload: Omit<Review, "id"> = {
        name: identity.name,
        email: identity.email,
        ...formData,
        rating,
      };
      const result = await reviewService.createReview(payload);
      // Revalidate the cache
      await revalidateData("reviews");
      toast.success("Thank you for your review! 🎉");
      onSuccess(result);
      handleClose();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to submit review.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step meta ───────────────────────────────────────────────────────────
  const stepMeta = {
    identity: { label: "Step 1 of 3", title: "Your Identity" },
    verify: { label: "Step 2 of 3", title: "Verify Email" },
    review: { label: "Step 3 of 3", title: "Write Your Review" },
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] w-[95vw] h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        {/* ── Header ── */}
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <div className="w-2 h-8 bg-emerald-500 rounded-full" />
              Share Your Experience
            </DialogTitle>

            {/* Step indicator */}
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  {stepMeta[step].label}
                </span>
                <span className="text-[9px] text-slate-500 font-bold uppercase">
                  {stepMeta[step].title}
                </span>
              </div>
              {/* Step dots */}
              <div className="flex gap-1.5">
                {(["identity", "verify", "review"] as Step[]).map((s) => (
                  <div
                    key={s}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step === s
                        ? "bg-emerald-500 scale-125"
                        : s === "identity" ||
                            (s === "verify" && step === "review")
                          ? "bg-emerald-500/40"
                          : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          {/* ════════════════════════════════════════════
              STEP 1 — Identity (Name + Email + Send OTP)
          ════════════════════════════════════════════ */}
          {step === "identity" && (
            <form
              id="identity-form"
              onSubmit={handleSendCode}
              className="py-8 space-y-8"
            >
              <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Enter your name and email. We will send a{" "}
                  <span className="text-blue-400 font-bold">
                    6-digit verification code
                  </span>{" "}
                  to confirm your identity before submitting the review.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                    Your Name *
                  </Label>
                  <Input
                    value={identity.name}
                    onChange={(e) =>
                      setIdentity({ ...identity, name: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-300"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                    Email Address *
                  </Label>
                  <Input
                    type="email"
                    value={identity.email}
                    onChange={(e) =>
                      setIdentity({ ...identity, email: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-300"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="bg-transparent border-white/10 text-white hover:bg-white/5 px-8 h-11 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  form="identity-form"
                  type="submit"
                  disabled={isSending}
                  className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] px-8 h-11 rounded-lg font-bold shadow-xl shadow-emerald-500/20 cursor-pointer disabled:opacity-70 gap-2"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending
                      Code...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" /> Send Verification Code
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* ════════════════════════════════════════════
              STEP 2 — OTP Verification
          ════════════════════════════════════════════ */}
          {step === "verify" && (
            <form
              id="verify-form"
              onSubmit={handleVerifyCode}
              className="py-8 space-y-8"
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <Mail className="w-7 h-7 text-emerald-500" />
                </div>
                <p className="text-white font-bold text-lg">Check your inbox</p>
                <p className="text-slate-400 text-sm">
                  We sent a 6-digit code to{" "}
                  <span className="text-emerald-400 font-bold">
                    {identity.email}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => setStep("identity")}
                  className="text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 cursor-pointer transition-colors"
                >
                  Wrong email? Go back
                </button>
              </div>

              {/* OTP Boxes */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                    className={`w-12 h-14 text-center text-2xl font-black rounded-xl border-2 bg-white/5 text-white outline-none transition-all duration-200 caret-emerald-500 ${
                      digit
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-white/10 focus:border-emerald-500/50"
                    }`}
                  />
                ))}
              </div>

              {/* Resend */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || isSending}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    resendCooldown > 0
                      ? "text-slate-600 cursor-not-allowed"
                      : "text-slate-400 hover:text-emerald-400"
                  }`}
                >
                  <RefreshCw
                    className={`w-3 h-3 ${isSending ? "animate-spin" : ""}`}
                  />
                  {resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : "Resend code"}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("identity")}
                  className="bg-transparent border-white/10 text-white hover:bg-white/5 px-8 h-11 rounded-lg font-semibold cursor-pointer"
                >
                  Back
                </Button>
                <Button
                  form="verify-form"
                  type="submit"
                  disabled={isVerifying || otp.join("").length < 6}
                  className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] px-8 h-11 rounded-lg font-bold shadow-xl shadow-emerald-500/20 cursor-pointer disabled:opacity-70 gap-2"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" /> Verify & Continue
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* ════════════════════════════════════════════
              STEP 3 — Write Review
          ════════════════════════════════════════════ */}
          {step === "review" && (
            <form
              id="review-form"
              onSubmit={handleSubmitReview}
              className="py-8 space-y-8"
            >
              {/* Verified badge */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-[11px] text-slate-400">
                  Email verified as{" "}
                  <span className="text-emerald-400 font-bold">
                    {identity.email}
                  </span>
                  . Now share your experience!
                </p>
              </div>

              {/* Star Rating */}
              <div className="space-y-3">
                <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                  Your Rating *
                </Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 transition-all duration-150 ${
                          star <= (hoveredRating || rating)
                            ? "fill-emerald-500 text-emerald-500"
                            : "text-white/20"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-emerald-400">
                    {ratingLabel[hoveredRating || rating]}
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-2">
                <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                  Your Review *
                </Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white min-h-[120px] resize-none placeholder:text-gray-300"
                  placeholder="Share your honest experience working together..."
                  required
                />
              </div>

              {/* Role & Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                    Your Role / Position
                  </Label>
                  <Input
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-300"
                    placeholder="CEO, Developer, Designer..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                    Company / Organization
                  </Label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-300"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                  Phone Number (Optional)
                </Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-300"
                  placeholder="+880 1xxx-xxxxxx"
                />
              </div>

              {/* Privacy note */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/3 border border-white/5">
                <i className="fa-solid fa-lock text-slate-500 text-xs mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Your email and phone are private and will never be shown
                  publicly. Only your name, role, company, and review will be
                  displayed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="bg-transparent border-white/10 text-white hover:bg-white/5 px-8 h-11 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  form="review-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] px-8 h-11 rounded-lg font-bold shadow-xl shadow-emerald-500/20 cursor-pointer disabled:opacity-70 gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

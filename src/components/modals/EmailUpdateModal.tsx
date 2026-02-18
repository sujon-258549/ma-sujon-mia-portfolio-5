"use client";

import { useState } from "react";
import { authService } from "@/lib/authService";
import { toast } from "sonner";
import { Loader2, X, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface EmailUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailUpdateModal = ({
  isOpen,
  onClose,
}: EmailUpdateModalProps) => {
  const { logout } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.requestEmailUpdate(newEmail);
      toast.success("OTP sent to your new email address");
      setStep(2);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to request email update");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.verifyEmailUpdate(otp);
      toast.success("Email updated successfully! Please login again.");
      onClose();
      // Logout the user as the token is likely invalid now (based on requirement)
      logout();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-md bg-[#0E1416] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-emerald-500">
            <Mail className="w-5 h-5" />
            Update Email Address
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Steps Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= 1
                  ? "bg-emerald-500 text-black"
                  : "bg-white/10 text-slate-500"
              }`}
            >
              1
            </div>
            <div className="w-12 h-0.5 bg-white/10">
              <div
                className={`h-full bg-emerald-500 transition-all duration-300 ${
                  step >= 2 ? "w-full" : "w-0"
                }`}
              />
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= 2
                  ? "bg-emerald-500 text-black"
                  : "bg-white/10 text-slate-500"
              }`}
            >
              2
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  New Email Address
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600"
                  placeholder="Enter new email"
                  required
                />
                <p className="text-xs text-slate-500">
                  We&apos;ll send a verification code (OTP) to this address.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Send OTP <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  Enter OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-600 text-center tracking-widest text-lg font-mono"
                  placeholder="000000"
                  required
                  maxLength={6}
                />
                <p className="text-xs text-slate-500 text-center">
                  Check your inbox at{" "}
                  <span className="text-emerald-400">{newEmail}</span>
                </p>
              </div>

              <div className="flex justify-between items-center pt-2 gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Change Email
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Verify & Update <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

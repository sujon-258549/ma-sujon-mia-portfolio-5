"use client";

import { useState } from "react";
import { authService } from "@/lib/authService";
import { toast } from "sonner";
import { Loader2, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface EmailUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to request email update";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 2: Verify OTP (email is NOT sent in body, as requested)
      await authService.verifyEmailUpdate(otp);
      toast.success("Email updated successfully! Please login again.");
      onClose();
      logout();
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Invalid OTP";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-[#0E1416] border-white/10 text-white p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-white/10 bg-white/5">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2 text-emerald-500">
            <Mail className="w-5 h-5" />
            Update Email Address
          </DialogTitle>
        </DialogHeader>

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
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-black/40 border-white/10 text-white focus-visible:ring-emerald-500/50"
                  placeholder="Enter new email"
                  required
                />
                <p className="text-xs text-slate-500">
                  We&apos;ll send a verification code (OTP) to this address.
                </p>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-500 text-black hover:bg-emerald-400 font-medium w-full sm:w-auto"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Send OTP <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  Enter OTP Code
                </label>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-black/40 border-white/10 text-white focus-visible:ring-emerald-500/50 text-center tracking-widest text-lg font-mono"
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
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-white p-0 h-auto"
                >
                  Change Email
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-500 text-black hover:bg-emerald-400 font-medium"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Verify & Update <CheckCircle2 className="w-4 h-4 ml-2" />
                    </>
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

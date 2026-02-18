"use client";

import { useState } from "react";
import { authService } from "@/lib/authService";
import { toast } from "sonner";
import { Loader2, Lock, Key, ShieldCheck } from "lucide-react";

interface ChangePasswordModalProps {
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

export const ChangePasswordModal = ({
  isOpen,
  onClose,
}: ChangePasswordModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.changePassword(
        formData.oldPassword,
        formData.newPassword,
      );

      if (response.data?.accessToken) {
        authService.setAuthData(response.data.accessToken);
        toast.success("Password changed successfully");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        onClose();
      }
    } catch (error: unknown) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to change password";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-[#0E1416] border-white/10 text-white p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-white/10 bg-white/5">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2 text-emerald-500">
            <Lock className="w-5 h-5" />
            Change Password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-4">
            {/* Old Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Key className="w-4 h-4" /> Current Password
              </label>
              <Input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="bg-black/40 border-white/10 text-white focus-visible:ring-emerald-500/50"
                placeholder="Enter current password"
                required
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> New Password
              </label>
              <Input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="bg-black/40 border-white/10 text-white focus-visible:ring-emerald-500/50"
                placeholder="Enter new password"
                required
                minLength={6}
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Confirm New Password
              </label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-black/40 border-white/10 text-white focus-visible:ring-emerald-500/50"
                placeholder="Confirm new password"
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-xs text-emerald-400/80">
            <p>
              Make sure your new password is secure and at least 6 characters
              long.
            </p>
          </div>

          <DialogFooter className="border-t border-white/10 pt-4 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 text-black hover:bg-emerald-400 font-medium"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Update Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

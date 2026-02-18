"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { authService } from "@/lib/authService";
import { toast } from "sonner";
import {
  Loader2,
  Camera,
  User as UserIcon,
  Type,
  FileText,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUpdate: () => void; // Callback to refresh user data
}

export const ProfileModal = ({
  isOpen,
  onClose,
  user,
  onUpdate,
}: ProfileModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    photo: user?.photo || "",
    bio: user?.bio || "",
  });

  console.log("ProfileModal user prop:", user);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isOpen) {
        // First try to set from props if available
        if (user) {
          setFormData({
            name: user.name || "",
            photo: user.photo || "",
            bio: user.bio || "",
          });
        }

        // Then fetch fresh data from API to ensure we have the latest (including bio, etc.)
        try {
          const freshUser = await authService.getMe();
          if (freshUser) {
            setFormData({
              name: freshUser.name || "",
              photo: freshUser.photo || "",
              bio: freshUser.bio || "",
            });
          }
        } catch (error) {
          console.error("Failed to fetch latest user profile:", error);
        }
      }
    };

    fetchUserData();
  }, [isOpen, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.updateProfile(formData);
      toast.success("Profile updated successfully");
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-[#0E1416] border-white/10 text-white p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-white/10 bg-white/5">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2 text-white">
            <UserIcon className="w-5 h-5 text-emerald-500" />
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[80vh] overflow-y-auto"
        >
          {/* Profile Image Preview */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500/20 bg-white/5 ring-4 ring-black">
                {formData.photo ? (
                  <Image
                    src={formData.photo}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <UserIcon className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-xs text-white font-medium">Preview</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Type className="w-4 h-4" /> Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-black/40 border-white/10 text-white focus-visible:ring-emerald-500/50"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Camera className="w-4 h-4" /> Photo URL
              </label>
              <Input
                type="url"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="bg-black/40 border-white/10 text-white focus-visible:ring-emerald-500/50"
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="text-xs text-slate-500">
                Provide a direct URL to your profile image (e.g., from ImgBB).
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Bio
              </label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="bg-black/40 border-white/10 text-white focus-visible:ring-emerald-500/50 min-h-[100px]"
                placeholder="Tell something about yourself..."
              />
            </div>
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

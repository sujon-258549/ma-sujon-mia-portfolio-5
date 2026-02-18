"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { authService } from "@/lib/authService";
import { toast } from "sonner";
import {
  Loader2,
  X,
  Camera,
  User as UserIcon,
  Type,
  FileText,
} from "lucide-react";
import Image from "next/image";

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
    name: "",
    photo: "",
    bio: "",
  });

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || "",
        photo: user.photo || "",
        bio: user.bio || "",
      });
    }
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-lg bg-[#0E1416] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-emerald-500" />
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none text-white transition-all placeholder:text-slate-600"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Camera className="w-4 h-4" /> Photo URL
              </label>
              <input
                type="url"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none text-white transition-all placeholder:text-slate-600"
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="text-xs text-slate-500">
                Provide a direct URL to your profile image (e.g., from ImgBB,
                Cloudinary).
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none text-white transition-all resize-none placeholder:text-slate-600"
                placeholder="Tell something about yourself..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg text-sm font-medium bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

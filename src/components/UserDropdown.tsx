"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import Image from "next/image";
import { User, LogOut, Lock, Mail, UserCircle } from "lucide-react";
import { ProfileModal } from "./modals/ProfileModal";
import { ChangePasswordModal } from "./modals/ChangePasswordModal";
import { EmailUpdateModal } from "./modals/EmailUpdateModal";

export const UserDropdown = () => {
  const { user, logout, refreshUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Modal states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
          title={user.name}
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 group-hover:border-emerald-500/50 transition-colors bg-emerald-500/5">
            {user.photo ? (
              <Image
                src={user.photo}
                alt={user.name}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-emerald-500">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-[#1C2629] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
            <div className="px-4 py-3 border-b border-white/5">
              <p className="text-sm font-bold text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>

            <div className="p-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsProfileOpen(true);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <UserCircle className="w-4 h-4 text-emerald-500" />
                My Profile
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPasswordOpen(true);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Lock className="w-4 h-4 text-emerald-500" />
                Change Password
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsEmailOpen(true);
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-500" />
                Update Email
              </button>
            </div>

            <div className="border-t border-white/5 p-1">
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdate={refreshUser}
      />

      <ChangePasswordModal
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
      />

      <EmailUpdateModal
        isOpen={isEmailOpen}
        onClose={() => setIsEmailOpen(false)}
      />
    </>
  );
};

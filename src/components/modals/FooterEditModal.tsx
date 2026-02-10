"use client";

import { useState } from "react";
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

import { FooterData, SocialLink, QuickLink } from "@/types/footer";

interface FooterEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: FooterData;
  onSave: (newData: FooterData) => void;
}

export const FooterEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: FooterEditModalProps) => {
  const [formData, setFormData] = useState<FooterData>(currentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateSocialLink = (
    index: number,
    field: keyof SocialLink,
    value: string,
  ) => {
    const newLinks = [...formData.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: newLinks });
  };

  const updateQuickLink = (
    index: number,
    field: keyof QuickLink,
    value: string,
  ) => {
    const newLinks = [...formData.quickLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, quickLinks: newLinks });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] w-[98vw] h-[95vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none">
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <div className="w-2 h-8 bg-emerald-500 rounded-full" />
              Customize Footer Layout
            </DialogTitle>
            <div className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest font-medium">
              Admin Interface
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* --- LEFT COLUMN: BRAND & SOCIALS --- */}
              <div className="space-y-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                  <i className="fa-solid fa-layer-group"></i>
                  <span>Column 1: Brand & Socials</span>
                </div>

                <div className="bg-[#121A1C] border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl">
                  {/* Logo */}
                  <div className="space-y-4">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-image text-emerald-500/70"></i>{" "}
                      Brand Logo
                    </Label>
                    <div className="flex flex-col gap-4">
                      <div className="relative w-full h-32 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden p-4 group">
                        <img
                          src={formData.logo}
                          alt="Preview"
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="bg-white/5 border-white/10 text-white cursor-pointer file:bg-emerald-500 file:border-none file:text-white file:rounded file:px-2 file:mr-4 file:text-[10px] h-10 text-xs"
                        />
                        <Input
                          value={formData.logo}
                          onChange={(e) =>
                            setFormData({ ...formData, logo: e.target.value })
                          }
                          placeholder="Or paste image URL here..."
                          className="bg-white/5 border-white/10 text-white text-xs h-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-align-left text-emerald-500/70"></i>{" "}
                      Footer Description
                    </Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10 text-white min-h-[120px] focus:ring-emerald-500/20 text-sm leading-relaxed"
                      placeholder="Enter brand description..."
                    />
                  </div>

                  {/* Socials Group */}
                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-share-nodes text-emerald-500/70"></i>{" "}
                      Social Presence
                    </Label>
                    <div className="grid grid-cols-1 gap-3">
                      {formData.socialLinks.map((link, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-3 p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-emerald-500/30 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <i
                                className={`${link.faIcon} text-emerald-500 w-5`}
                              ></i>
                              <Input
                                value={link.label}
                                onChange={(e) =>
                                  updateSocialLink(
                                    index,
                                    "label",
                                    e.target.value,
                                  )
                                }
                                className="h-6 w-24 bg-transparent border-none text-[10px] text-slate-500 font-bold uppercase tracking-widest p-0 focus-visible:ring-0"
                                placeholder="Platform..."
                              />
                            </div>
                            <div className="flex items-center gap-2 bg-black/20 rounded-md px-2 py-1">
                              <Label className="text-[8px] text-slate-600 uppercase font-black">
                                Icon Code
                              </Label>
                              <Input
                                value={link.faIcon}
                                onChange={(e) =>
                                  updateSocialLink(
                                    index,
                                    "faIcon",
                                    e.target.value,
                                  )
                                }
                                className="h-6 w-28 bg-transparent border-none text-[9px] font-mono p-0 focus-visible:ring-0"
                                placeholder="fa-brands fa-github"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-[9px] text-slate-600 uppercase font-black ml-1">
                              Profile URL
                            </Label>
                            <Input
                              value={link.href}
                              onChange={(e) =>
                                updateSocialLink(index, "href", e.target.value)
                              }
                              className="h-9 text-[11px] bg-black/40 border-white/10 focus:border-emerald-500/50 transition-all font-mono"
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- MIDDLE COLUMN: QUICK LINKS --- */}
              <div className="space-y-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                  <i className="fa-solid fa-link"></i>
                  <span>Column 2: Resources</span>
                </div>

                <div className="bg-[#121A1C] border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl flex-1">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest opacity-60">
                      Heading Title
                    </Label>
                    <Input
                      value={formData.linksTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, linksTitle: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-emerald-500 font-bold"
                    />
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest opacity-60">
                      Navigation Links
                    </Label>
                    <div className="space-y-3">
                      {formData.quickLinks.map((link, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3 hover:border-emerald-500/30 transition-colors"
                        >
                          <div className="flex flex-col gap-2">
                            <Label className="text-[9px] text-slate-500 uppercase font-black">
                              Link Name
                            </Label>
                            <Input
                              value={link.name}
                              onChange={(e) =>
                                updateQuickLink(index, "name", e.target.value)
                              }
                              className="h-9 text-sm bg-black/20 border-white/5"
                              placeholder="Link Title..."
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="text-[9px] text-slate-500 uppercase font-black">
                              Destination URL
                            </Label>
                            <Input
                              value={link.href}
                              onChange={(e) =>
                                updateQuickLink(index, "href", e.target.value)
                              }
                              className="h-9 text-[11px] bg-black/20 border-white/5 font-mono"
                              placeholder="Link URL..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- RIGHT COLUMN: CONTACT --- */}
              <div className="space-y-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>Column 3: Contact Details</span>
                </div>

                <div className="bg-[#121A1C] border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl flex-1">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest opacity-60">
                      Heading Title
                    </Label>
                    <Input
                      value={formData.contactTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactTitle: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10 text-emerald-500 font-bold"
                    />
                  </div>

                  <div className="space-y-8 pt-8 border-t border-white/5">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-slate-300 font-semibold flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <i className="fa-solid fa-envelope text-emerald-500"></i>
                          </div>
                          Support Email
                        </Label>
                        <Input
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="bg-white/5 border-white/10 h-11 text-emerald-400 font-medium"
                        />
                      </div>

                      <div className="space-y-3 pt-2">
                        <Label className="text-slate-300 font-semibold flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <i className="fa-solid fa-location-dot text-emerald-500"></i>
                          </div>
                          Physical Office
                        </Label>
                        <Input
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          className="bg-white/5 border-white/10 h-11"
                        />
                      </div>
                    </div>

                    <div className="mt-12 p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-xs text-emerald-500/70 leading-relaxed italic relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
                      <div className="relative z-10">
                        <i className="fa-solid fa-circle-info mr-2 text-emerald-500"></i>
                        Tip: Changes applied here will update your live
                        portfolio footer instantly. Make sure to double-check
                        URLs.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- BOTTOM BAR SECTION --- */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-window-minimize"></i>
                <span>Bottom Bar: Legal & Credits</span>
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest opacity-60">
                      Copyright Text
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-emerald-500/50 text-sm">
                        © {new Date().getFullYear()}
                      </span>
                      <Input
                        value={formData.copyrightText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            copyrightText: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10 pl-16"
                        placeholder="Your site name..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest opacity-60">
                      Crafted By Label
                    </Label>
                    <Input
                      value={formData.craftedBy}
                      onChange={(e) =>
                        setFormData({ ...formData, craftedBy: e.target.value })
                      }
                      className="bg-white/5 border-white/10"
                      placeholder="Crafted with..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Aligned buttons to the right and changed to rounded-lg */}
          <div className="p-6 pt-4 flex flex-col sm:flex-row justify-end gap-3 pb-12">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 px-8 h-11 rounded-lg font-semibold transition-all hover:border-white/20 active:scale-95 order-2 sm:order-1"
            >
              Discard Changes
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] shadow-xl shadow-emerald-500/20 px-8 h-11 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 order-1 sm:order-2"
            >
              Publish Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useState } from "react";
import NextImage from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HeaderData, NavLink } from "@/types/header";
import {
  Settings2,
  Image as ImageIcon,
  Link as LinkIcon,
  Menu,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import { dynamicContentService } from "@/services/dynamicContentService";
import { toast } from "sonner";

interface HeaderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: HeaderData;
  onSave: (newData: HeaderData) => void;
}

export const HeaderEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: HeaderEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<HeaderData>({
    ...currentData,
    isActive: currentData.isActive ?? true,
    isSideOpen: currentData.isSideOpen ?? true,
  });

  const addNavLink = () => {
    setFormData({
      ...formData,
      navLinks: [
        ...(formData.navLinks || []),
        { text: "", link: "", icon: "fa-solid fa-circle", showInHeader: true },
      ],
    });
  };

  const updateNavLink = (
    index: number,
    field: keyof NavLink,
    value: string | boolean,
  ) => {
    const newLinks = [...(formData.navLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value } as NavLink;
    setFormData({ ...formData, navLinks: newLinks });
  };

  const removeNavLink = (index: number) => {
    setFormData({
      ...formData,
      navLinks: formData.navLinks.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = {
      ...formData,
      type: "header",
    };
    console.log("update section", updateData);
    try {
      const res = await dynamicContentService.upsertContent(updateData);
      if (res.success) {
        toast.success("Header updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Header update error:", error);
      toast.error("Header update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <Settings2 className="w-6 h-6 animate-spin-slow" />
              Customize Header
            </DialogTitle>
            <div className="flex items-center gap-6 mr-8">
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Side Nav:
                </span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.isSideOpen !== false}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isSideOpen: checked })
                    }
                    className="data-[state=checked]:bg-emerald-500 scale-75"
                  />
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${formData.isSideOpen !== false ? "text-emerald-500" : "text-slate-500"}`}
                  >
                    {formData.isSideOpen !== false ? "Visible" : "Hidden"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Header:
                </span>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isActive: checked })
                    }
                    className="data-[state=checked]:bg-emerald-500 scale-75"
                  />
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest ${formData.isActive ? "text-emerald-500" : "text-slate-500"}`}
                  >
                    {formData.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 bg-[#0E1416]/50">
          {/* Logo Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
              <ImageIcon className="w-4 h-4" />
              Logo Configuration
            </div>

            <div className="bg-[#121A1C] p-6 rounded-lg border border-white/5 space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Logo URL
                </Label>
                <Input
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  placeholder="/logo.png or https://..."
                />

                {/* Logo Preview */}
                {formData.logo && (
                  <div className="mt-4 p-4 bg-black/30 rounded-lg border border-white/5 flex flex-col items-center gap-2">
                    <p className="text-[10px] text-slate-500 uppercase font-black self-start tracking-widest">
                      Preview
                    </p>
                    <div className="relative group/preview mt-2 p-2 bg-white/5 rounded-xl border border-emerald-500/20">
                      <NextImage
                        src={formData.logo}
                        alt="Logo Preview"
                        width={200}
                        height={50}
                        unoptimized
                        className="max-w-full h-auto max-h-[80px] object-contain"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>,
                        ) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/200x50?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Logo Alt Text
                </Label>
                <Input
                  value={formData.logoAlt}
                  onChange={(e) =>
                    setFormData({ ...formData, logoAlt: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  placeholder="Sujon Logo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                    Logo Width (px)
                  </Label>
                  <Input
                    type="number"
                    value={formData.logoWidth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        logoWidth: parseInt(e.target.value) || 200,
                      })
                    }
                    className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                    Logo Height (px)
                  </Label>
                  <Input
                    type="number"
                    value={formData.logoHeight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        logoHeight: parseInt(e.target.value) || 50,
                      })
                    }
                    className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
              <LinkIcon className="w-4 h-4" />
              Action Buttons
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Button */}
              <div className="bg-[#121A1C] p-6 rounded-lg border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-wider">
                  Primary Button
                </h4>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Text
                  </Label>
                  <Input
                    value={formData.buttons.primary.text}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          primary: {
                            ...formData.buttons.primary,
                            text: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs"
                    placeholder="Hire Me"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Link
                  </Label>
                  <Input
                    value={formData.buttons.primary.link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          primary: {
                            ...formData.buttons.primary,
                            link: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs"
                    placeholder="#contact"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Icon (Lucide)
                  </Label>
                  <Input
                    value={formData.buttons.primary.icon}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          primary: {
                            ...formData.buttons.primary,
                            icon: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs font-mono"
                    placeholder="Send"
                  />
                </div>
              </div>

              {/* Secondary Button */}
              <div className="bg-[#121A1C] p-6 rounded-lg border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-sky-500 uppercase tracking-wider">
                  Secondary Button
                </h4>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Text
                  </Label>
                  <Input
                    value={formData.buttons.secondary.text}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          secondary: {
                            ...formData.buttons.secondary,
                            text: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs"
                    placeholder="Resume"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Link
                  </Label>
                  <Input
                    value={formData.buttons.secondary.link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          secondary: {
                            ...formData.buttons.secondary,
                            link: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs"
                    placeholder="/resume.pdf"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Icon (Lucide)
                  </Label>
                  <Input
                    value={formData.buttons.secondary.icon}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        buttons: {
                          ...formData.buttons,
                          secondary: {
                            ...formData.buttons.secondary,
                            icon: e.target.value,
                          },
                        },
                      })
                    }
                    className="bg-black/40 border-none h-10 text-xs font-mono"
                    placeholder="Download"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <Menu className="w-4 h-4" />
                Navigation Links
              </div>
              <Button
                onClick={addNavLink}
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg px-3"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Link
              </Button>
            </div>

            <div className="space-y-4">
              {(formData.navLinks || []).map((link, idx) => (
                <div
                  key={idx}
                  className="bg-[#121A1C] p-4 rounded-lg border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 relative group"
                >
                  <div className="space-y-4 md:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                          Link Text
                        </Label>
                        <Input
                          value={link.text}
                          onChange={(e) =>
                            updateNavLink(idx, "text", e.target.value)
                          }
                          className="bg-black/40 border-none h-10 text-xs text-white"
                          placeholder="About"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                          Icon (FontAwesome)
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            value={link.icon || "fa-solid fa-circle"}
                            onChange={(e) =>
                              updateNavLink(idx, "icon", e.target.value)
                            }
                            className="bg-black/40 border-none h-10 text-xs text-white font-mono"
                            placeholder="fa-solid fa-user"
                          />
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <i
                              className={`${link.icon || "fa-solid fa-circle"} text-[10px] text-emerald-500`}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                        URL / Anchor
                      </Label>
                      <Input
                        value={link.link}
                        onChange={(e) =>
                          updateNavLink(idx, "link", e.target.value)
                        }
                        className="bg-black/40 border-none h-10 text-xs text-white"
                        placeholder="#about"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 px-1">
                      <div className="flex flex-col">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none">
                          Show in Header
                        </Label>
                        <span className="text-[8px] text-slate-600 uppercase font-bold mt-0.5">
                          {link.showInHeader !== false
                            ? "Visible in Top Nav"
                            : "Hidden from Top Nav"}
                        </span>
                      </div>
                      <Switch
                        checked={link.showInHeader !== false}
                        onCheckedChange={(checked) =>
                          updateNavLink(idx, "showInHeader", checked)
                        }
                        className="data-[state=checked]:bg-emerald-500 scale-75"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeNavLink(idx)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-10 border-t border-emerald-500/10 flex justify-end gap-3 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-8 h-12 rounded-lg font-bold border-white/10 hover:bg-white/5 cursor-pointer"
            >
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] px-10 h-12 rounded-lg font-black shadow-xl shadow-emerald-500/20 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Update Header"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

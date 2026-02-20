"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HeroSectionData } from "@/types/hero";
import {
  Settings2,
  Plus,
  Trash2,
  User,
  Type,
  Link as LinkIcon,
  Code2,
  Share2,
  Loader2,
} from "lucide-react";
import { dynamicContentService } from "@/services/dynamicContentService";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { revalidateData } from "@/app/actions";

interface HeroEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: HeroSectionData;
  onSave: (newData: HeroSectionData) => void;
}

export const HeroEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: HeroEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<HeroSectionData>(() => ({
    ...currentData,
    isActive: currentData.isActive ?? true,
    slNumber: currentData.slNumber ?? 0,
  }));

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...currentData,
        isActive: currentData.isActive ?? true,
        slNumber: currentData.slNumber ?? 0,
      });
    }
  }, [isOpen, currentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = {
      ...formData,
      type: "hero",
    };
    try {
      console.log("update section", updateData);
      const res = await dynamicContentService.upsertContent(updateData);
      if (res.success) {
        // Revalidate the cache
        await revalidateData("dynamic-content");
        toast.success("Hero updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Hero update error:", error);
      toast.error("Hero update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  // Rotating Texts Management
  const addRotatingText = () => {
    setFormData({
      ...formData,
      rotatingTexts: [...formData.rotatingTexts, ""],
    });
  };

  const updateRotatingText = (index: number, value: string) => {
    const newTexts = [...formData.rotatingTexts];
    newTexts[index] = value;
    setFormData({ ...formData, rotatingTexts: newTexts });
  };

  const removeRotatingText = (index: number) => {
    setFormData({
      ...formData,
      rotatingTexts: formData.rotatingTexts.filter((_, i) => i !== index),
    });
  };

  // Tech Highlights Management
  const addTechHighlight = () => {
    setFormData({
      ...formData,
      techHighlights: [...formData.techHighlights, ""],
    });
  };

  const updateTechHighlight = (index: number, value: string) => {
    const newHighlights = [...formData.techHighlights];
    newHighlights[index] = value;
    setFormData({ ...formData, techHighlights: newHighlights });
  };

  const removeTechHighlight = (index: number) => {
    setFormData({
      ...formData,
      techHighlights: formData.techHighlights.filter((_, i) => i !== index),
    });
  };

  // Tech Stack Management
  const addTechStack = () => {
    setFormData({
      ...formData,
      techStack: [...formData.techStack, { name: "", icon: "" }],
    });
  };

  const updateTechStack = (index: number, field: string, value: string) => {
    const newStack = [...formData.techStack];
    newStack[index] = { ...newStack[index], [field]: value };
    setFormData({ ...formData, techStack: newStack });
  };

  const removeTechStack = (index: number) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((_, i) => i !== index),
    });
  };

  // Social Links Management
  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [
        ...formData.socialLinks,
        { platform: "", url: "", icon: "" },
      ],
    });
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const newLinks = [...formData.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: newLinks });
  };

  const removeSocialLink = (index: number) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_, i) => i !== index),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <Settings2 className="w-6 h-6 animate-spin-slow" />
              Customize Hero Section
            </DialogTitle>
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  Section Activity
                </span>
                <span className="text-[9px] text-slate-500 font-bold uppercase">
                  {formData.isActive
                    ? "Publicly Visible"
                    : "Hidden from Public"}
                </span>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 bg-[#0E1416]/50">
          {/* Basic Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
              <User className="w-4 h-4" />
              Personal Info
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121A1C] p-6 rounded-lg border border-white/5">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Greeting
                </Label>
                <Input
                  value={formData.greeting}
                  onChange={(e) =>
                    setFormData({ ...formData, greeting: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  placeholder="Hi, I'm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Name
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Name Highlight Color
                </Label>
                <Input
                  value={formData.nameHighlight}
                  onChange={(e) =>
                    setFormData({ ...formData, nameHighlight: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm text-emerald-500 font-bold"
                  placeholder="Same as name or different"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Sorting Number (Serial)
                </Label>
                <Input
                  type="number"
                  value={formData.slNumber ?? 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slNumber: parseInt(e.target.value) || 0,
                    })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm text-emerald-500 font-mono"
                />
                <p className="text-[10px] text-slate-500 italic">
                  Lower numbers appear first on the home page.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
              <Type className="w-4 h-4" />
              Description
            </div>
            <div className="bg-[#121A1C] p-6 rounded-lg border border-white/5">
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-black/40 border-white/5 min-h-[120px] rounded-lg focus:ring-emerald-500/20 text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Rotating Texts */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <Type className="w-4 h-4" />
                Rotating Texts
              </div>
              <Button
                onClick={addRotatingText}
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg px-3"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Text
              </Button>
            </div>
            <div className="space-y-4">
              {formData.rotatingTexts.map((text, idx) => (
                <div key={idx} className="relative group">
                  <Input
                    value={text}
                    onChange={(e) => updateRotatingText(idx, e.target.value)}
                    className="bg-[#121A1C] border-white/5 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                    placeholder="e.g., Full Stack Developer"
                  />
                  <button
                    onClick={() => removeRotatingText(idx)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Highlights */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <Code2 className="w-4 h-4" />
                Tech Highlights (in description)
              </div>
              <Button
                onClick={addTechHighlight}
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg px-3"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Tech
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.techHighlights.map((tech, idx) => (
                <div key={idx} className="relative group">
                  <Input
                    value={tech}
                    onChange={(e) => updateTechHighlight(idx, e.target.value)}
                    className="bg-[#121A1C] border-white/5 h-10 rounded-lg focus:ring-emerald-500/20 text-xs"
                    placeholder="React"
                  />
                  <button
                    onClick={() => removeTechHighlight(idx)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em] mb-4">
              <LinkIcon className="w-4 h-4" />
              Action Buttons
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121A1C] p-6 rounded-lg border border-white/5">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-emerald-500">
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
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Icon (Font Awesome)
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
                    placeholder="fa-solid fa-paper-plane"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-sky-500">
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
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                    Icon (Font Awesome)
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
                    placeholder="fa-solid fa-download"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <Code2 className="w-4 h-4" />
                Tech Stack Icons
              </div>
              <Button
                onClick={addTechStack}
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg px-3"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Stack
              </Button>
            </div>
            <div className="space-y-4">
              {formData.techStack.map((stack, idx) => (
                <div
                  key={idx}
                  className="bg-[#121A1C] p-4 rounded-lg border border-white/5 grid grid-cols-2 gap-4 relative group"
                >
                  <div className="space-y-2">
                    <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                      Name
                    </Label>
                    <Input
                      value={stack.name}
                      onChange={(e) =>
                        updateTechStack(idx, "name", e.target.value)
                      }
                      className="bg-black/40 border-none h-10 text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                      Icon (Font Awesome)
                    </Label>
                    <Input
                      value={stack.icon}
                      onChange={(e) =>
                        updateTechStack(idx, "icon", e.target.value)
                      }
                      className="bg-black/40 border-none h-10 text-xs font-mono"
                      placeholder="fa-solid fa-code"
                    />
                  </div>
                  <button
                    onClick={() => removeTechStack(idx)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <Share2 className="w-4 h-4" />
                Social Links
              </div>
              <Button
                onClick={addSocialLink}
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg px-3"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Link
              </Button>
            </div>
            <div className="space-y-4">
              {formData.socialLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="bg-[#121A1C] p-4 rounded-lg border border-white/5 grid grid-cols-3 gap-4 relative group"
                >
                  <div className="space-y-2">
                    <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                      Platform
                    </Label>
                    <Input
                      value={link.platform}
                      onChange={(e) =>
                        updateSocialLink(idx, "platform", e.target.value)
                      }
                      className="bg-black/40 border-none h-10 text-xs"
                      placeholder="GitHub"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                      URL
                    </Label>
                    <Input
                      value={link.url}
                      onChange={(e) =>
                        updateSocialLink(idx, "url", e.target.value)
                      }
                      className="bg-black/40 border-none h-10 text-xs"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] text-slate-500 uppercase font-black ml-1">
                      Icon (Font Awesome)
                    </Label>
                    <Input
                      value={link.icon}
                      onChange={(e) =>
                        updateSocialLink(idx, "icon", e.target.value)
                      }
                      className="bg-black/40 border-none h-10 text-xs font-mono"
                      placeholder="fa-brands fa-github"
                    />
                  </div>
                  <button
                    onClick={() => removeSocialLink(idx)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
                "Update Section"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

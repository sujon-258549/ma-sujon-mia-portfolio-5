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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { dynamicContentService } from "@/services/dynamicContentService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { revalidateData } from "@/app/actions";

export interface ProjectSectionHeaderData {
  badge: string;
  badgeIcon: string;
  title: string;
  titleHighlight: string;
  description: string;
  completedCount: string;
  isActive?: boolean;
  slNumber?: number;
}

interface ProjectSectionHeaderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ProjectSectionHeaderData;
  onSave: (data: ProjectSectionHeaderData) => void;
}

export const ProjectSectionHeaderEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: ProjectSectionHeaderEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectSectionHeaderData>({
    ...currentData,
    isActive: currentData.isActive ?? true,
    slNumber: currentData.slNumber ?? 0,
  });

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
      type: "project-section-header",
    };
    try {
      console.log("footer data", updateData);
      const res = await dynamicContentService.upsertContent(updateData);
      if (res.success) {
        // Revalidate the cache
        await revalidateData("dynamic-content");
        toast.success("Project Section Header updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Project Section Header update failure:", error);
      toast.error("Project Section Header update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <div className="w-2 h-8 bg-emerald-500 rounded-full" />
              Edit Project Section Header
            </DialogTitle>
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Visibility:
              </span>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  className="data-[state=checked]:bg-emerald-500"
                />
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${formData.isActive ? "text-emerald-500" : "text-slate-500"}`}
                >
                  {formData.isActive ? "Visible" : "Hidden"}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8 space-y-8">
            {/* --- SECTION: Counter Badge ("90+ Projects Completed") --- */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-trophy"></i>
                <span>Counter Badge</span>
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 shadow-xl space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                    <i className="fa-solid fa-hashtag text-emerald-500/70"></i>
                    Completed Count (e.g. &quot;90+&quot;)
                  </Label>
                  <Input
                    value={formData.completedCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        completedCount: e.target.value,
                      })
                    }
                    className="bg-white/5 border-white/10 text-emerald-500 font-bold text-lg h-12"
                    placeholder="90+"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
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
                    className="bg-white/5 border-white/10 text-emerald-500 font-mono h-10 w-24"
                  />
                  <p className="text-[10px] text-slate-500 italic">
                    Lower numbers appear first on the home page.
                  </p>
                </div>

                {/* Live Preview */}
                <div className="mt-4 p-4 bg-black/30 rounded-lg border border-white/5">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-3">
                    Live Preview
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-[#172023] border border-emerald-500/20 px-4 py-2 rounded-full shadow-2xl">
                      <i className="fa-solid fa-trophy text-base text-emerald-500"></i>
                      <span className="text-xs font-black text-white uppercase tracking-tighter">
                        <span className="text-emerald-500">
                          {formData.completedCount}
                        </span>{" "}
                        Projects Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- SECTION: Badge --- */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-tag"></i>
                <span>Section Badge</span>
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 shadow-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-font text-emerald-500/70"></i>
                      Badge Text
                    </Label>
                    <Input
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData({ ...formData, badge: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white h-10 text-sm"
                      placeholder="Featured Projects"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-icons text-emerald-500/70"></i>
                      Badge Icon (FontAwesome)
                    </Label>
                    <Input
                      value={formData.badgeIcon}
                      onChange={(e) =>
                        setFormData({ ...formData, badgeIcon: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-emerald-400 font-mono text-xs h-10"
                      placeholder="fa-solid fa-rocket"
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div className="mt-2 p-4 bg-black/30 rounded-lg border border-white/5">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-3">
                    Live Preview
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-white/10">
                      <i
                        className={`${formData.badgeIcon} text-xs text-emerald-500`}
                      ></i>
                      <span className="text-sm font-medium text-emerald-500">
                        {formData.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- SECTION: Title --- */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-heading"></i>
                <span>Section Title</span>
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 shadow-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-font text-emerald-500/70"></i>
                      Title (First Part)
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white font-bold h-12 text-lg"
                      placeholder="My Creative"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-highlighter text-emerald-500/70"></i>
                      Title Highlight (Colored Part)
                    </Label>
                    <Input
                      value={formData.titleHighlight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          titleHighlight: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10 text-emerald-500 font-bold h-12 text-lg"
                      placeholder="Works"
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div className="mt-2 p-4 bg-black/30 rounded-lg border border-white/5">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-3">
                    Live Preview
                  </p>
                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {formData.title}{" "}
                      <span className="text-emerald-500">
                        {formData.titleHighlight}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* --- SECTION: Description --- */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-align-left"></i>
                <span>Section Description</span>
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 shadow-xl space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                    <i className="fa-solid fa-paragraph text-emerald-500/70"></i>
                    Description Text
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
                    placeholder="Explore a selection of my recently completed projects..."
                  />
                </div>

                {/* Live Preview */}
                <div className="mt-2 p-4 bg-black/30 rounded-lg border border-white/5">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-3">
                    Live Preview
                  </p>
                  <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed text-center">
                    {formData.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Tip */}
            <div className="p-5 bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-xs text-emerald-500/70 leading-relaxed italic relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
              <div className="relative z-10">
                <i className="fa-solid fa-circle-info mr-2 text-emerald-500"></i>
                Tip: These fields control the header area above your project
                cards. Changes applied here will be reflected immediately on the
                live page.
              </div>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="p-6 pt-4 flex flex-col sm:flex-row justify-end gap-3 pb-12">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 px-8 h-11 rounded-lg font-semibold transition-all hover:border-white/20 active:scale-95 order-2 sm:order-1 cursor-pointer"
            >
              Discard Changes
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] shadow-xl shadow-emerald-500/20 px-8 h-11 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 order-1 sm:order-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Publish Changes"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
import { toast } from "sonner";
import { Loader2, MessageSquare } from "lucide-react";
import { ReviewSectionHeaderData } from "@/types/review";
import { dynamicContentService } from "@/services/dynamicContentService";
import { revalidateData } from "@/app/actions";

interface ReviewSectionHeaderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ReviewSectionHeaderData;
  onSave: (data: ReviewSectionHeaderData) => void;
}

export const ReviewSectionHeaderEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: ReviewSectionHeaderEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ReviewSectionHeaderData>({
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
      badge: formData.badge,
      badgeIcon: formData.badgeIcon,
      title: formData.title,
      titleHighlight: formData.titleHighlight,
      description: formData.description,
      isActive: formData.isActive,
      slNumber: formData.slNumber,
      type: "review_section_header",
    };

    try {
      console.log("Review section header update data:", updateData);
      const res = await dynamicContentService.upsertContent(updateData);
      if (res) {
        // Revalidate the cache
        await revalidateData("dynamic-content");
        toast.success("Review section header updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Review section header update failure:", error);
      toast.error("Review section header update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <MessageSquare className="w-6 h-6" />
              Review Section Configuration
            </DialogTitle>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Section Status:
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
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    formData.isActive ? "text-emerald-500" : "text-slate-500"
                  }`}
                >
                  {formData.isActive ? "Active" : "Hidden"}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form
            id="review-header-form"
            onSubmit={handleSubmit}
            className="py-8 space-y-8"
          >
            {/* Badge */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-tag" />
                <span>Section Badge</span>
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 shadow-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest">
                      Badge Text
                    </Label>
                    <Input
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData({ ...formData, badge: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white h-10 text-sm"
                      placeholder="Testimonials"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest">
                      Badge Icon (FontAwesome class)
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={formData.badgeIcon}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            badgeIcon: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/10 text-emerald-400 font-mono text-xs h-10"
                        placeholder="fa-solid fa-comments"
                      />
                      {/* Live preview */}
                      <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <i
                          className={`${formData.badgeIcon} text-emerald-500 text-sm`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest">
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
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-heading" />
                <span>Section Title</span>
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 shadow-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest">
                      Title (First Part)
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white font-bold h-12 text-lg"
                      placeholder="What People"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold uppercase text-[10px] tracking-widest">
                      Highlighted Word (Emerald)
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
                      placeholder="Say"
                    />
                  </div>
                </div>
                {/* Live preview */}
                <div className="mt-2 p-3 rounded-lg bg-black/20 border border-white/5 text-center">
                  <span className="text-white font-bold text-xl">
                    {formData.title}{" "}
                  </span>
                  <span className="text-emerald-500 font-bold text-xl">
                    {formData.titleHighlight}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-align-left" />
                <span>Section Description</span>
              </div>
              <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 shadow-xl">
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-white min-h-[100px] focus:ring-emerald-500/20 text-sm leading-relaxed"
                  placeholder="Feedback from clients, colleagues, and companies I've had the pleasure of working with."
                />
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="p-6 pt-4 flex flex-col sm:flex-row justify-end gap-3 pb-12">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 px-8 h-11 rounded-lg font-semibold cursor-pointer"
            >
              Discard
            </Button>
            <Button
              form="review-header-form"
              type="submit"
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] shadow-xl shadow-emerald-500/20 px-8 h-11 rounded-lg font-bold transition-all hover:scale-105 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  Saving...
                </>
              ) : (
                "Update Review Section"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

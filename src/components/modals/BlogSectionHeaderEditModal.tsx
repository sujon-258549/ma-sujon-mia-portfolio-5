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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, LayoutPanelLeft } from "lucide-react";
import { BlogSectionData } from "@/types/blog";
import { dynamicContentService } from "@/services/dynamicContentService";
import { revalidateData } from "@/app/actions";

interface BlogSectionHeaderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: BlogSectionData;
  onSave: (data: BlogSectionData) => void;
}

export const BlogSectionHeaderEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: BlogSectionHeaderEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BlogSectionData>({
    ...currentData,
    isActive: currentData.isActive ?? true,
    slNumber: currentData.slNumber ?? 0,
  });

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
      type: "blog_header",
    };

    try {
      console.log("Saving blog header data:", updateData);
      const res = await dynamicContentService.upsertContent(updateData);
      if (res) {
        // Revalidate the cache
        await revalidateData("blog-header");
        toast.success("Blog Section header updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Blog Section header update failure:", error);
      toast.error("Blog Section header update failed!");
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
              <LayoutPanelLeft className="w-6 h-6" />
              Blog Section Configuration
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
                  className={`text-[10px] font-black uppercase tracking-widest ${formData.isActive ? "text-emerald-500" : "text-slate-500"}`}
                >
                  {formData.isActive ? "Active" : "Hidden"}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8 space-y-8">
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
                      Badge Text
                    </Label>
                    <Input
                      value={formData.badge}
                      onChange={(e) =>
                        setFormData({ ...formData, badge: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      Badge Icon (FontAwesome)
                    </Label>
                    <Input
                      value={formData.badgeIcon}
                      onChange={(e) =>
                        setFormData({ ...formData, badgeIcon: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-emerald-400 font-mono text-xs h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      Sorting Number (Serial)
                    </Label>
                    <Input
                      type="number"
                      value={formData.slNumber}
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
                      Title (First Part)
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white font-bold h-12 text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-semibold flex items-center gap-2 uppercase text-[10px] tracking-widest">
                      Highlight
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
                    />
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
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white min-h-[120px] focus:ring-emerald-500/20 text-sm leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </form>

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
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] shadow-xl shadow-emerald-500/20 px-8 h-11 rounded-lg font-bold transition-all hover:scale-105 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : null}
              {isLoading ? "Saving..." : "Update Blog Section"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

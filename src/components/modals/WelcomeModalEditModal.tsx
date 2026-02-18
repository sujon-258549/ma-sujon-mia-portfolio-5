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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WelcomeModalData } from "@/types/welcome";
import { dynamicContentService } from "@/services/dynamicContentService";
import { revalidateData } from "@/app/actions";

interface WelcomeModalEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: WelcomeModalData;
  onSave: (data: WelcomeModalData) => void;
}

export const WelcomeModalEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: WelcomeModalEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<WelcomeModalData>({
    ...currentData,
    isActive: currentData.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app we'd save to DB here
      const updateData = {
        ...formData,
        type: "welcome_modal",
      };

      console.log("Saving welcome modal data:", updateData);
      const res = await dynamicContentService.upsertContent(updateData);

      if (res) {
        // Revalidate the cache
        await revalidateData("dynamic-content");
        toast.success("Welcome Modal updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Failed to update welcome modal:", error);
      toast.error("Failed to update welcome modal");
    } finally {
      setIsLoading(false);
    }
  };

  const updateLink = (
    index: number,
    field: keyof (typeof formData.quickLinks)[0],
    value: string,
  ) => {
    const newLinks = [...formData.quickLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, quickLinks: newLinks });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-3 text-emerald-500">
              <Sparkles className="w-5 h-5" />
              Welcome Modal Settings
            </DialogTitle>
            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Status:
              </span>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
                className="data-[state=checked]:bg-emerald-500 scale-75"
              />
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-6 space-y-6">
            {/* Badge & CTA */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="uppercase text-[10px] tracking-widest text-slate-400">
                  Badge Text
                </Label>
                <Input
                  value={formData.welcomeBadge}
                  onChange={(e) =>
                    setFormData({ ...formData, welcomeBadge: e.target.value })
                  }
                  className="bg-white/5 border-white/10 h-9 text-xs"
                />
              </div>
              <div className="space-y-2">
                <Label className="uppercase text-[10px] tracking-widest text-slate-400">
                  CTA Button Text
                </Label>
                <Input
                  value={formData.ctaText}
                  onChange={(e) =>
                    setFormData({ ...formData, ctaText: e.target.value })
                  }
                  className="bg-white/5 border-white/10 h-9 text-xs font-bold text-emerald-500"
                />
              </div>
            </div>

            {/* Title */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="uppercase text-[10px] tracking-widest text-slate-400">
                  Title (First part)
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-white/5 border-white/10 h-10 font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="uppercase text-[10px] tracking-widest text-slate-400">
                  Highlight (Emerald)
                </Label>
                <Input
                  value={formData.titleHighlight}
                  onChange={(e) =>
                    setFormData({ ...formData, titleHighlight: e.target.value })
                  }
                  className="bg-white/5 border-white/10 h-10 font-bold text-emerald-500"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="uppercase text-[10px] tracking-widest text-slate-400">
                Description
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-white/5 border-white/10 min-h-[80px] text-sm"
              />
            </div>

            {/* Quick Links */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <Label className="uppercase text-[10px] tracking-widest text-emerald-500 font-bold">
                  Quick Links (Max 4)
                </Label>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {formData.quickLinks.map((link, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2 items-center bg-white/3 p-2 rounded-lg border border-white/5"
                  >
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0">
                      <i className={`${link.icon} text-xs text-slate-400`} />
                    </div>
                    <Input
                      value={link.label}
                      onChange={(e) => updateLink(idx, "label", e.target.value)}
                      className="bg-transparent border-none h-8 text-xs focus-visible:ring-0 px-0"
                      placeholder="Label"
                    />
                    <Input
                      value={link.id}
                      onChange={(e) => updateLink(idx, "id", e.target.value)}
                      className="bg-white/5 border-none h-7 text-[10px] w-20 font-mono text-slate-400 focus-visible:ring-0"
                      placeholder="#id"
                    />
                    <Input
                      value={link.icon}
                      onChange={(e) => updateLink(idx, "icon", e.target.value)}
                      className="bg-white/5 border-none h-7 text-[10px] w-32 font-mono text-slate-400 focus-visible:ring-0"
                      placeholder="Icon class"
                    />
                  </div>
                ))}
              </div>
            </div>
          </form>

          <div className="p-6 pt-0 flex justify-end gap-3 pb-8">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-white/5"
            >
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

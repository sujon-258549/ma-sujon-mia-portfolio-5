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
import { Loader2, Settings2, Sliders, Type } from "lucide-react";
import { CreativeSectionData } from "@/types/creative";
import { revalidateData } from "@/app/actions";

interface CreativeSectionHeaderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: CreativeSectionData;
  onSave: (data: CreativeSectionData) => void;
}

export const CreativeSectionHeaderEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: CreativeSectionHeaderEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreativeSectionData>({
    ...currentData,
    slNumber: currentData.slNumber ?? 0,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...currentData,
        slNumber: currentData.slNumber ?? 0,
      });
    }
  }, [isOpen, currentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = {
      ...formData,
      type: "creative_section", // Unified type for the header
    };
    console.log("data", updateData);
    try {
      const res = await dynamicContentService.upsertContent(updateData);
      if (res.success) {
        await revalidateData("dynamic-content"); // Standard revalidation
        toast.success("Creative Header updated successfully!");
        onSave(formData);
        onClose();
      } else {
        toast.error("Failed to update Header!");
      }
    } catch (error) {
      console.error("Header update failure:", error);
      toast.error("Failed to update Header!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] w-[90%] h-[90%] flex flex-col bg-[#0E1416] border border-white/10 text-white p-0 overflow-hidden shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 border-b border-white/5 bg-[#121A1C]">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Settings2 className="w-5 h-5" />
            </div>
            Customize Header
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#121A1C] border border-white/5 rounded-xl">
              <div className="space-y-1">
                <span className="text-sm font-bold text-white block">
                  Section Visibility
                </span>
                <span className="text-xs text-slate-500">
                  Publicly show this section on your site
                </span>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
                className="data-[state=checked]:bg-emerald-500"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/5" />
              <div className="space-y-6 pl-10">
                {/* Badge Section */}
                <div className="relative">
                  <span className="absolute -left-10 top-2 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-[#0E1416]" />
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4">
                    <Sliders className="w-3 h-3" /> Badge Settings
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold">
                        Badge Text
                      </Label>
                      <Input
                        value={formData.badge}
                        onChange={(e) =>
                          setFormData({ ...formData, badge: e.target.value })
                        }
                        className="bg-[#121A1C] border-white/10 h-10 font-bold focus:border-emerald-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold">
                        Icon
                      </Label>
                      <div className="relative">
                        <i
                          className={`absolute left-3 top-1/2 -translate-y-1/2 ${formData.badgeIcon} text-emerald-500/50 text-xs`}
                        />
                        <Input
                          value={formData.badgeIcon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              badgeIcon: e.target.value,
                            })
                          }
                          className="bg-[#121A1C] border-white/10 pl-9 font-mono text-xs text-emerald-400 focus:border-emerald-500/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold">
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
                        className="bg-[#121A1C] border-white/10 h-10 font-mono text-emerald-500 w-24 focus:border-emerald-500/50"
                      />
                      <p className="text-[10px] text-slate-500 italic">
                        Lower numbers appear first on the home page.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Title Section */}
                <div className="relative pt-2">
                  <span className="absolute -left-10 top-4 w-2 h-2 rounded-full bg-slate-700 ring-4 ring-[#0E1416]" />
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    <Type className="w-3 h-3" /> Typography
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold">
                        Main Title
                      </Label>
                      <Input
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="bg-[#121A1C] border-white/10 h-10 font-bold text-lg focus:border-emerald-500/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold">
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
                        className="bg-[#121A1C] border-white/10 h-10 font-bold text-lg text-emerald-500 focus:border-emerald-500/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold">
                      Subtitle / Description
                    </Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="bg-[#121A1C] border-white/10 min-h-[100px] text-sm leading-relaxed focus:border-emerald-500/50 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Save Configuration
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
import { creativeService } from "@/services/creativeService";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  PenSquare,
  Image as ImageIcon,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";
import { CreativeItem } from "@/types/creative";
import { revalidateData } from "@/app/actions";
import Image from "next/image";

interface CreativeItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem?: CreativeItem | null;
  onSave: (data: CreativeItem) => void;
}

export const CreativeItemModal = ({
  isOpen,
  onClose,
  currentItem,
  onSave,
}: CreativeItemModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreativeItem>({
    title: "",
    description: "",
    icon: "fa-solid fa-paintbrush",
    image: "",
    link: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (currentItem) {
        setFormData(currentItem);
      } else {
        setFormData({
          title: "",
          description: "",
          icon: "fa-solid fa-paintbrush",
          image: "",
          link: "",
        });
      }
    }
  }, [isOpen, currentItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let res;
      if (currentItem && currentItem.id) {
        // Edit mode
        res = await creativeService.updateItem(currentItem.id, formData);
      } else {
        // Add mode

        console.log("item", formData);
        res = await creativeService.createItem(formData);
      }

      if (res.success) {
        await revalidateData("creative-items");
        toast.success(
          currentItem
            ? "Creative Item updated successfully!"
            : "Creative Item added successfully!",
        );
        onSave(res.data);
        onClose();
      } else {
        toast.error(res.message || "Operation failed");
      }
    } catch (error) {
      console.error("Item update failure:", error);
      toast.error("Failed to update item!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] w-[90%] h-[90%] flex flex-col bg-[#0E1416] border border-emerald-500/15 text-white p-0 overflow-hidden shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 border-b border-emerald-500/15 bg-[#121A1C]">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              {currentItem ? (
                <PenSquare className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </div>
            {currentItem ? "Edit Creative Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold">
                  Project Title
                </Label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-[#121A1C] border-emerald-500/15 h-10 focus:border-emerald-500/50"
                  placeholder="e.g. Neon Horizon"
                />
              </div>
              <div className="space-y-2">
                <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold">
                  Icon Class
                </Label>
                <div className="relative">
                  <i
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${formData.icon} text-emerald-500/50 text-xs`}
                  />
                  <Input
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="bg-[#121A1C] border-emerald-500/15 h-10 pl-9 font-mono text-xs text-emerald-400 focus:border-emerald-500/50"
                    placeholder="fa-solid fa-star"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold flex items-center gap-2">
                <ImageIcon className="w-3 h-3" /> Cover Image URL
              </Label>
              <div className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="bg-[#121A1C] border-emerald-500/15 font-mono text-xs text-sky-400 focus:border-emerald-500/50"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <AlertCircle className="w-3 h-3" />
                    <span>Recommended size: 800x600px or larger</span>
                  </div>
                </div>
                <div className="w-24 h-16 bg-[#121A1C] border border-emerald-500/15 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt="Preview"
                      width={96}
                      height={64}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-white/5" />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold flex items-center gap-2">
                <LinkIcon className="w-3 h-3" /> Project Link
              </Label>
              <Input
                value={formData.link || ""}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="bg-[#121A1C] border-emerald-500/15 font-mono text-xs text-emerald-400 focus:border-emerald-500/50"
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label className="uppercase text-[10px] tracking-widest text-slate-500 font-bold">
                Description
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-[#121A1C] border-emerald-500/15 min-h-[120px] text-sm leading-relaxed focus:border-emerald-500/50 resize-none"
                placeholder="Describe your creative process..."
              />
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-emerald-500/15">
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
                {currentItem ? "Save Changes" : "Create Project"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

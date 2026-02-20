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
import {
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CreativeSectionData, CreativeItem } from "@/types/creative";
import { revalidateData } from "@/app/actions";
import Image from "next/image";

interface CreativeEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: CreativeSectionData;
  onSave: (data: CreativeSectionData) => void;
}

export const CreativeEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: CreativeEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreativeSectionData>(() => ({
    ...currentData,
    slNumber: currentData.slNumber ?? 0,
  }));
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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
      type: "creative",
    };
    try {
      const res = await dynamicContentService.upsertContent(updateData);
      if (res.success) {
        await revalidateData("dynamic-content");
        toast.success("Creative Content updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Content update failure:", error);
      toast.error("Failed to update content!");
    } finally {
      setIsLoading(false);
    }
  };

  // Item Management
  const handleAddItem = () => {
    const newItem: CreativeItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Project",
      description: "",
      icon: "fa-solid fa-star",
      image: "",
      link: "",
    };
    setFormData((prev) => ({
      ...prev,
      items: [newItem, ...(prev.items || [])],
    }));
    setExpandedItems((prev) => [newItem.id!, ...prev]);
  };

  const handleRemoveItem = (id: string) => {
    if (!window.confirm("Delete this item?")) return;
    setFormData((prev) => ({
      ...prev,
      items: (prev.items || []).filter((item) => item.id !== id),
    }));
  };

  const updateItem = (id: string, field: keyof CreativeItem, value: string) => {
    setFormData((prev) => ({
      ...prev,
      items: (prev.items || []).map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] w-[98vw] h-[75vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-white/5 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <div className="w-2 h-8 bg-emerald-500 rounded-full" />
              Creative Section Manager
            </DialogTitle>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                    Section Visibility
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase">
                    {formData.isActive ? "Visible Publicly" : "Hidden"}
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
            </div>
          </div>
        </DialogHeader>

        {/* Content - Two Column Layout */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Column: Global Settings */}
          <div className="w-full lg:w-[400px] border-r border-white/5 bg-[#121A1C]/30 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <i className="fa-solid fa-sliders"></i>
                <span>Section Configuration</span>
              </div>

              <div className="space-y-4 bg-white/5 p-4 rounded-lg border border-white/5">
                <div className="space-y-2">
                  <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                    Badge Text
                  </Label>
                  <Input
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    className="bg-[#0E1416] border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                    Badge Icon
                  </Label>
                  <Input
                    value={formData.badgeIcon}
                    onChange={(e) =>
                      setFormData({ ...formData, badgeIcon: e.target.value })
                    }
                    className="bg-[#0E1416] border-white/10 font-mono text-xs text-emerald-400"
                  />
                </div>
              </div>

              <div className="space-y-4 bg-white/5 p-4 rounded-lg border border-white/5">
                <div className="space-y-2">
                  <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                    Main Title
                  </Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="bg-[#0E1416] border-white/10 font-bold text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                    Highlight Title
                  </Label>
                  <Input
                    value={formData.titleHighlight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        titleHighlight: e.target.value,
                      })
                    }
                    className="bg-[#0E1416] border-white/10 font-bold text-lg text-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2 bg-white/5 p-4 rounded-lg border border-white/5">
                <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                  Description
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-[#0E1416] border-white/10 min-h-[100px] text-sm"
                />
              </div>

              <div className="space-y-2 bg-white/5 p-4 rounded-lg border border-white/5">
                <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
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
                  className="bg-[#0E1416] border-white/10 h-10 w-24 font-mono text-emerald-500"
                />
                <p className="text-[10px] text-slate-500 italic">
                  Lower numbers appear first on the home page.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Items List */}
          <div className="flex-1 overflow-y-auto bg-[#0E1416] p-6 lg:p-10 custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                  <i className="fa-solid fa-layer-group"></i>
                  <span>Portfolio Items ({formData.items?.length || 0})</span>
                </div>
                <Button
                  onClick={handleAddItem}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase tracking-wider"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
              </div>

              <div className="grid gap-4">
                {(formData.items || []).map((item, index) => {
                  const isExpanded = expandedItems.includes(item.id!);
                  return (
                    <div
                      key={item.id || index}
                      className={`bg-[#121A1C] border transition-all duration-300 rounded-lg overflow-hidden ${isExpanded ? "border-emerald-500/30 ring-1 ring-emerald-500/10 shadow-2xl" : "border-white/5 hover:border-white/10"}`}
                    >
                      {/* Item Header / Bar */}
                      <div
                        onClick={() => toggleExpand(item.id!)}
                        className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition-colors"
                      >
                        <div className="text-slate-500 cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-5 h-5" />
                        </div>

                        <div className="w-12 h-12 rounded bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt=""
                              width={48}
                              height={48}
                              className="object-cover w-full h-full opacity-70"
                              unoptimized
                            />
                          ) : (
                            <i
                              className={`${item.icon} text-emerald-500 text-lg`}
                            />
                          )}
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-white text-sm">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {item.description || "No description provided"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveItem(item.id!);
                            }}
                            className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Edit Form */}
                      {isExpanded && (
                        <div className="p-6 pt-0 border-t border-white/5 bg-black/20 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-200">
                          <div className="md:col-span-2 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                                  Project Title
                                </Label>
                                <Input
                                  value={item.title}
                                  onChange={(e) =>
                                    updateItem(
                                      item.id!,
                                      "title",
                                      e.target.value,
                                    )
                                  }
                                  className="bg-[#0E1416] border-white/10"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold">
                                  Icon Class
                                </Label>
                                <div className="relative">
                                  <i
                                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${item.icon} text-emerald-500/50 text-xs`}
                                  />
                                  <Input
                                    value={item.icon}
                                    onChange={(e) =>
                                      updateItem(
                                        item.id!,
                                        "icon",
                                        e.target.value,
                                      )
                                    }
                                    className="bg-[#0E1416] border-white/10 pl-9 font-mono text-xs text-emerald-400"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold mb-2 block">
                              Image URL
                            </Label>
                            <div className="flex gap-4">
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={item.image}
                                  onChange={(e) =>
                                    updateItem(
                                      item.id!,
                                      "image",
                                      e.target.value,
                                    )
                                  }
                                  className="bg-[#0E1416] border-white/10 font-mono text-xs text-sky-400"
                                  placeholder="https://..."
                                />
                              </div>
                              <div className="w-20 h-14 bg-black/40 rounded border border-white/10 overflow-hidden shrink-0">
                                {item.image && (
                                  <Image
                                    src={item.image}
                                    alt=""
                                    width={80}
                                    height={56}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold mb-2 block">
                              Project Link
                            </Label>
                            <Input
                              value={item.link}
                              onChange={(e) =>
                                updateItem(item.id!, "link", e.target.value)
                              }
                              className="bg-[#0E1416] border-white/10 font-mono text-xs text-emerald-400"
                              placeholder="https://..."
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label className="uppercase text-[10px] tracking-widest text-slate-400 font-bold mb-2 block">
                              Description
                            </Label>
                            <Textarea
                              value={item.description}
                              onChange={(e) =>
                                updateItem(
                                  item.id!,
                                  "description",
                                  e.target.value,
                                )
                              }
                              className="bg-[#0E1416] border-white/10 min-h-[100px] text-sm leading-relaxed"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-[#121A1C] flex justify-end gap-3 z-30">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="bg-transparent border-white/10 text-slate-400 hover:text-white hover:bg-white/5 px-8 h-11 rounded-lg font-semibold"
          >
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] shadow-xl shadow-emerald-500/20 px-8 h-11 rounded-lg font-bold"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

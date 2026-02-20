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
import { ServiceItem, ServicesSectionData } from "@/types/service";
import { dynamicContentService } from "@/services/dynamicContentService";
import { toast } from "sonner";
import { Edit, Loader2, Plus, Trash2, Wand2 } from "lucide-react";
import { revalidateData } from "@/app/actions";
import { Switch } from "@/components/ui/switch";

interface ServicesSectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ServicesSectionData;
  onSave: (newData: ServicesSectionData) => void;
}

export const ServicesSectionEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: ServicesSectionEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ServicesSectionData>(() => ({
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
      type: "services",
    };
    try {
      console.log(updateData);
      const res = await dynamicContentService.upsertContent(updateData);
      if (res.success) {
        // Revalidate the cache
        await revalidateData("dynamic-content");
        toast.success("Services section updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Services update error:", error);
      toast.error("Services section update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const updateService = <K extends keyof ServiceItem>(
    index: number,
    field: K,
    value: ServiceItem[K],
  ) => {
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setFormData({ ...formData, services: newServices });
  };

  const addService = () => {
    const newService: ServiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Service",
      description: "Service description here...",
      icon: "fa-solid fa-star",
      features: ["Feature 1"],
    };
    setFormData({
      ...formData,
      services: [...formData.services, newService],
    });
  };

  const removeService = (index: number) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
  };

  const addFeature = (serviceIndex: number) => {
    const newServices = [...formData.services];
    if (!newServices[serviceIndex].features) {
      newServices[serviceIndex].features = [];
    }
    newServices[serviceIndex].features?.push("New Feature");
    setFormData({ ...formData, services: newServices });
  };

  const updateFeature = (
    serviceIndex: number,
    featureIndex: number,
    value: string,
  ) => {
    const newServices = [...formData.services];
    if (newServices[serviceIndex].features) {
      newServices[serviceIndex].features![featureIndex] = value;
    }
    setFormData({ ...formData, services: newServices });
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const newServices = [...formData.services];
    newServices[serviceIndex].features = newServices[
      serviceIndex
    ].features?.filter((_, i) => i !== featureIndex);
    setFormData({ ...formData, services: newServices });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl rounded-lg outline-none">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <Wand2 className="w-6 h-6" />
              Manage Services Section
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

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 scrollbar-hide">
          {/* Header Config */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-widest">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              Section Branding
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#121A1C] p-6 rounded-2xl border border-emerald-500/15">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Badge
                </Label>
                <Input
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="bg-black/40 border-emerald-500/15 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Title
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-black/40 border-emerald-500/15 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-emerald-500/80 uppercase font-black tracking-widest ml-1">
                  Highlight
                </Label>
                <Input
                  value={formData.titleHighlight}
                  onChange={(e) =>
                    setFormData({ ...formData, titleHighlight: e.target.value })
                  }
                  className="bg-black/40 border-emerald-500/15 h-11 text-emerald-500 font-bold"
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
                  className="bg-black/40 border-emerald-500/15 h-11 text-emerald-500 font-mono"
                />
                <p className="text-[10px] text-slate-500 italic">
                  Lower numbers appear first on the home page.
                </p>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-widest">
                <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                Service Offerings
              </div>
              <Button
                onClick={addService}
                size="sm"
                className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-[#0E1416] gap-2 rounded-xl text-xs font-black"
              >
                <Plus className="w-4 h-4" /> Add Service
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formData.services.map((service, idx) => (
                <div
                  key={service.id}
                  className="bg-[#121A1C] border border-emerald-500/15 rounded-2xl p-6 relative group border-t-4 border-t-emerald-500/20 hover:border-t-emerald-500 transition-all duration-300"
                >
                  <button
                    onClick={() => removeService(idx)}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-[9px] text-slate-500 uppercase font-black">
                        Title
                      </Label>
                      <Input
                        value={service.title}
                        onChange={(e) =>
                          updateService(idx, "title", e.target.value)
                        }
                        className="bg-black/20 border-emerald-500/15 h-10 text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] text-slate-500 uppercase font-black">
                        Icon (FontAwesome)
                      </Label>
                      <Input
                        value={service.icon}
                        onChange={(e) =>
                          updateService(idx, "icon", e.target.value)
                        }
                        className="bg-black/20 border-emerald-500/15 h-10 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label className="text-[9px] text-slate-500 uppercase font-black">
                      Description
                    </Label>
                    <Textarea
                      value={service.description}
                      onChange={(e) =>
                        updateService(idx, "description", e.target.value)
                      }
                      className="bg-black/20 border-emerald-500/15 min-h-[80px] text-xs resize-none"
                    />
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] text-slate-500 uppercase font-black tracking-widest">
                        Key Features
                      </Label>
                      <Button
                        onClick={() => addFeature(idx)}
                        variant="ghost"
                        size="sm"
                        className="h-6 text-[10px] text-emerald-500 hover:bg-emerald-500/10 gap-1 rounded px-2"
                      >
                        <Plus className="w-3 h-3" /> Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.features?.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2 bg-black/40 rounded-lg p-1 px-3 border border-emerald-500/15"
                        >
                          <input
                            value={feature}
                            onChange={(e) =>
                              updateFeature(idx, fIdx, e.target.value)
                            }
                            className="bg-transparent border-none text-[10px] text-slate-300 w-24 outline-none font-bold"
                          />
                          <button
                            onClick={() => removeFeature(idx, fIdx)}
                            className="text-slate-600 hover:text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-emerald-500/10 bg-[#121A1C]/50 flex justify-end gap-3 sticky bottom-0 z-20 backdrop-blur-md">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-11 px-8 rounded-xl border-emerald-500/15 hover:bg-white/5 text-xs font-bold transition-all"
          >
            Discard Changes
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-11 px-10 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-black rounded-xl shadow-xl shadow-emerald-500/20 text-xs transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Edit className="w-4 h-4 mr-2" />
            )}
            Publish Section
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
import {
  Loader2,
  ShieldCheck,
  Plus,
  Trash2,
  Globe,
  Zap,
  Users,
  Award,
} from "lucide-react";
import { TrustSectionData, BrandLogo, TrustStats } from "@/types/trust";
import { dynamicContentService } from "@/services/dynamicContentService";
import { revalidateData } from "@/app/actions";

interface TrustSectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: TrustSectionData;
  onSave: (data: TrustSectionData) => void;
}

export const TrustSectionEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: TrustSectionEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TrustSectionData>({
    ...currentData,
    isActive: currentData.isActive ?? true,
    slNumber: currentData.slNumber ?? 0,
    brands: currentData.brands || [],
    stats: currentData.stats || [],
  });
  const [activeTab, setActiveTab] = useState<"general" | "brands" | "stats">(
    "general",
  );

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...currentData,
        isActive: currentData.isActive ?? true,
        slNumber: currentData.slNumber ?? 0,
        brands: currentData.brands || [],
        stats: currentData.stats || [],
      });
    }
  }, [isOpen, currentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = {
      ...formData,
      type: "trust_section",
    };

    console.log("updateData", updateData);

    try {
      const res = await dynamicContentService.upsertContent(updateData);
      if (res) {
        await revalidateData("dynamic-content");
        toast.success("Trust section updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Trust update failure:", error);
      toast.error("Trust update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const addBrand = () => {
    const newBrand: BrandLogo = {
      id: Date.now(),
      name: "",
      image: "",
    };
    setFormData({
      ...formData,
      brands: [...(formData.brands || []), newBrand],
    });
  };

  const removeBrand = (index: number) => {
    const newBrands = (formData.brands || []).filter((_, i) => i !== index);
    setFormData({ ...formData, brands: newBrands });
  };

  const updateBrand = (
    index: number,
    field: keyof BrandLogo,
    value: string,
  ) => {
    const newBrands = [...(formData.brands || [])];
    newBrands[index] = { ...newBrands[index], [field]: value };
    setFormData({ ...formData, brands: newBrands });
  };

  const updateStat = (
    index: number,
    field: keyof TrustStats,
    value: string,
  ) => {
    const newStats = [...(formData.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[850px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <ShieldCheck className="w-6 h-6" />
              Trust & Impact Control
            </DialogTitle>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 mr-8">
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
                {formData.isActive ? "Section Active" : "Section Hidden"}
              </span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            {(["general", "brands", "stats"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                  activeTab === tab
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                    : "bg-white/5 text-slate-400 hover:bg-white/10",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-hide">
          <form id="trust-edit-form" onSubmit={handleSubmit}>
            {activeTab === "general" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-[#121A1C] border border-white/5 rounded-xl p-6 space-y-4 shadow-xl">
                  <div className="space-y-2">
                    <Label className="text-slate-400 uppercase text-[10px] font-black">
                      Section Title
                    </Label>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="bg-black/20 border-white/10 h-12 text-lg font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 uppercase text-[10px] font-black">
                      Description
                    </Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="bg-black/20 border-white/10 min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-400 uppercase text-[10px] font-black">
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
                      className="bg-black/20 border-white/10 h-10 w-24 font-mono text-emerald-500"
                    />
                    <p className="text-[10px] text-slate-500 italic">
                      Lower numbers appear first on the home page.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "brands" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-emerald-500 font-black uppercase text-xs tracking-widest">
                    Brand Logos
                  </div>
                  <Button
                    type="button"
                    onClick={addBrand}
                    size="sm"
                    className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black h-8 px-4"
                  >
                    <Plus className="w-3 h-3 mr-2" /> Add Brand
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.brands?.map((brand, idx) => (
                    <div
                      key={idx}
                      className="bg-[#121A1C] border border-white/5 rounded-xl p-4 relative group hover:border-emerald-500/30 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => removeBrand(idx)}
                        className="absolute top-2 right-2 text-slate-500 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="space-y-3">
                        <Input
                          placeholder="Brand Name"
                          value={brand.name}
                          onChange={(e) =>
                            updateBrand(idx, "name", e.target.value)
                          }
                          className="bg-black/20 border-white/10 h-9 text-xs"
                        />
                        <Input
                          placeholder="Logo URL"
                          value={brand.image}
                          onChange={(e) =>
                            updateBrand(idx, "image", e.target.value)
                          }
                          className="bg-black/20 border-white/10 h-9 text-[10px] font-mono"
                        />
                        {brand.image && (
                          <div className="h-12 w-full bg-white/5 rounded flex items-center justify-center p-2 invert brightness-0">
                            <img
                              src={brand.image}
                              alt="Preview"
                              className="max-h-full object-contain opacity-50"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="text-emerald-500 font-black uppercase text-xs tracking-widest mb-4">
                  Impact Statistics
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formData.stats?.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#121A1C] border border-white/5 rounded-xl p-6 space-y-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                          {idx === 1 && <Globe className="w-5 h-5" />}
                          {idx === 2 && <Zap className="w-5 h-5" />}
                          {idx === 3 && <Users className="w-5 h-5" />}
                        </div>
                        <Label className="text-slate-300 font-bold uppercase text-[10px]">
                          Stat #{idx + 1}
                        </Label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[9px] text-slate-500 font-black uppercase">
                            Value
                          </Label>
                          <Input
                            value={stat.value}
                            onChange={(e) =>
                              updateStat(idx, "value", e.target.value)
                            }
                            className="bg-black/20 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[9px] text-slate-500 font-black uppercase">
                            Label
                          </Label>
                          <Input
                            value={stat.label}
                            onChange={(e) =>
                              updateStat(idx, "label", e.target.value)
                            }
                            className="bg-black/20 border-white/10"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="p-6 border-t border-emerald-500/10 bg-[#121A1C]/50 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/10 text-white hover:bg-white/5"
          >
            Discard
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-8 shadow-lg shadow-emerald-500/20"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper for conditional classes if cn is not imported, but it usually is in this project
import { cn } from "@/lib/utils";

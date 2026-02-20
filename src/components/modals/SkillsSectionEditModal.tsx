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
import { Switch } from "@/components/ui/switch";
import { SkillCategory, SkillsSectionData } from "@/types/skill";
import { dynamicContentService } from "@/services/dynamicContentService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { revalidateData } from "@/app/actions";

interface SkillsSectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: SkillsSectionData;
  onSave: (newData: SkillsSectionData) => void;
}

export const SkillsSectionEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: SkillsSectionEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SkillsSectionData>({
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
      type: "skills",
    };
    try {
      const res = await dynamicContentService.upsertContent(updateData);
      if (res.success) {
        // Revalidate the cache
        await revalidateData("dynamic-content");
        toast.success("Skills section updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Skills update error:", error);
      toast.error("Skills section update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = <K extends keyof SkillCategory>(
    index: number,
    field: K,
    value: SkillCategory[K],
  ) => {
    const newCategories = [...formData.categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    setFormData({ ...formData, categories: newCategories });
  };

  const addCategory = () => {
    const newCategory: SkillCategory = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Category",
      icon: "fa-solid fa-code",
      skills: ["New Skill"],
    };
    setFormData({
      ...formData,
      categories: [...formData.categories, newCategory],
    });
  };

  const removeCategory = (index: number) => {
    const newCategories = formData.categories.filter((_, i) => i !== index);
    setFormData({ ...formData, categories: newCategories });
  };

  const addSkillToCategory = (catIndex: number) => {
    const newCategories = [...formData.categories];
    newCategories[catIndex].skills.push("");
    setFormData({ ...formData, categories: newCategories });
  };

  const updateSkillInCategory = (
    catIndex: number,
    skillIndex: number,
    value: string,
  ) => {
    const newCategories = [...formData.categories];
    newCategories[catIndex].skills[skillIndex] = value;
    setFormData({ ...formData, categories: newCategories });
  };

  const removeSkillFromCategory = (catIndex: number, skillIndex: number) => {
    const newCategories = [...formData.categories];
    newCategories[catIndex].skills = newCategories[catIndex].skills.filter(
      (_, i) => i !== skillIndex,
    );
    setFormData({ ...formData, categories: newCategories });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <i className="fa-solid fa-gear text-xl"></i>
              Manage Skills Section
            </DialogTitle>
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-emerald-500/15 mr-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Section Status:
              </span>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  className="data-[state=checked]:bg-emerald-500 scale-75"
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

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 scrollbar-hide">
          {/* Section Header Configuration */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              Section Header
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#121A1C] p-6 rounded-lg border border-emerald-500/15">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Section Badge
                </Label>
                <Input
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="bg-black/40 border-emerald-500/15 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  placeholder="e.g. My Skills"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Main Title
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="bg-black/40 border-emerald-500/15 h-12 rounded-lg focus:ring-emerald-500/20 text-sm"
                  placeholder="e.g. Showcasing My"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Title Highlight
                </Label>
                <Input
                  value={formData.titleHighlight}
                  onChange={(e) =>
                    setFormData({ ...formData, titleHighlight: e.target.value })
                  }
                  className="bg-black/40 border-emerald-500/15 h-12 rounded-lg focus:ring-emerald-500/20 text-sm text-emerald-500 font-bold"
                  placeholder="e.g. Expertise"
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
                  className="bg-black/40 border-emerald-500/15 h-12 rounded-lg focus:ring-emerald-500/20 text-sm text-emerald-500 font-mono"
                />
                <p className="text-[10px] text-slate-500 italic">
                  Lower numbers appear first on the home page.
                </p>
              </div>
            </div>
          </div>

          {/* Skill Categories Configuration */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                Technical Categories
              </div>
              <Button
                type="button"
                onClick={addCategory}
                variant="ghost"
                size="sm"
                className="h-8 text-xs bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg px-3 cursor-pointer"
              >
                <i className="fa-solid fa-plus text-sm mr-2"></i> Add Category
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formData.categories.map((category, catIndex) => (
                <div
                  key={category.id}
                  className="bg-[#121A1C] border border-emerald-500/15 rounded-lg p-6 relative group border-t-4 border-t-emerald-500/20 hover:border-t-emerald-500 transition-all duration-300 shadow-xl"
                >
                  <button
                    type="button"
                    onClick={() => removeCategory(catIndex)}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10 cursor-pointer"
                  >
                    <i className="fa-solid fa-trash text-sm"></i>
                  </button>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label className="text-[9px] text-slate-500 uppercase font-black tracking-widest ml-1">
                        Category Title
                      </Label>
                      <Input
                        value={category.title}
                        onChange={(e) =>
                          updateCategory(catIndex, "title", e.target.value)
                        }
                        className="bg-black/40 border-emerald-500/15 h-11 rounded-lg focus:ring-emerald-500/20 text-sm font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[9px] text-slate-500 uppercase font-black tracking-widest ml-1">
                        Icon Name
                      </Label>
                      <Input
                        value={category.icon}
                        onChange={(e) =>
                          updateCategory(catIndex, "icon", e.target.value)
                        }
                        className="bg-black/40 border-emerald-500/15 h-11 rounded-lg focus:ring-emerald-500/20 text-xs font-mono"
                        placeholder="fa-solid fa-code"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-[9px] text-slate-500 uppercase font-black tracking-widest ml-1">
                        Skills
                      </Label>
                      <Button
                        type="button"
                        onClick={() => addSkillToCategory(catIndex)}
                        variant="ghost"
                        size="sm"
                        className="h-6 text-[10px] text-emerald-500 hover:bg-emerald-500/10 rounded px-2 cursor-pointer"
                      >
                        <i className="fa-solid fa-plus text-xs mr-1"></i> Add
                        Skill
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto pr-2 scrollbar-hide py-1">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center gap-1 group/skill bg-black/40 rounded-lg p-1 pr-2 border border-emerald-500/15 hover:border-emerald-500/30 transition-all"
                        >
                          <Input
                            value={skill}
                            onChange={(e) =>
                              updateSkillInCategory(
                                catIndex,
                                skillIndex,
                                e.target.value,
                              )
                            }
                            className="h-7 w-24 bg-transparent border-none text-[11px] focus-visible:ring-0 p-1"
                            placeholder="Skill..."
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeSkillFromCategory(catIndex, skillIndex)
                            }
                            className="text-slate-600 hover:text-red-500 p-0.5 cursor-pointer"
                          >
                            <i className="fa-solid fa-trash text-xs"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-10 border-t border-emerald-500/10 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 h-11 rounded-lg font-bold border-emerald-500/15 hover:bg-white/5 cursor-pointer text-xs"
            >
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] px-8 h-11 rounded-lg font-black shadow-xl shadow-emerald-500/20 active:scale-95 cursor-pointer text-xs disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Apply Changes"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
import { Label } from "@/components/ui/label";
import { SkillCategory, SkillsSectionData } from "@/types/skill";
import { Plus, Trash2, Settings2 } from "lucide-react";

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
  const [formData, setFormData] = useState<SkillsSectionData>(currentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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
      icon: "Code2",
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
      <DialogContent className="sm:max-w-[1000px] w-[95vw] max-h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-2xl">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <Settings2 className="w-6 h-6" />
              Manage Skills Section
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 scrollbar-hide">
          {/* Section Header Configuration */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              Section Header
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#121A1C] p-6 rounded-2xl border border-white/5">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">
                  Section Badge
                </Label>
                <Input
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  className="bg-black/40 border-white/5 h-12 rounded-xl focus:ring-emerald-500/20 text-sm"
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
                  className="bg-black/40 border-white/5 h-12 rounded-xl focus:ring-emerald-500/20 text-sm"
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
                  className="bg-black/40 border-white/5 h-12 rounded-xl focus:ring-emerald-500/20 text-sm text-emerald-500 font-bold"
                  placeholder="e.g. Expertise"
                />
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
                <Plus className="w-4 h-4 mr-2" /> Add Category
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formData.categories.map((category, catIndex) => (
                <div
                  key={category.id}
                  className="bg-[#121A1C] border border-white/5 rounded-2xl p-6 relative group border-t-4 border-t-emerald-500/20 hover:border-t-emerald-500 transition-all duration-300 shadow-xl"
                >
                  <button
                    type="button"
                    onClick={() => removeCategory(catIndex)}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
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
                        className="bg-black/40 border-white/5 h-11 rounded-xl focus:ring-emerald-500/20 text-sm font-bold"
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
                        className="bg-black/40 border-white/5 h-11 rounded-xl focus:ring-emerald-500/20 text-xs font-mono"
                        placeholder="Code2, Server, Globe, etc."
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
                        <Plus className="w-3 h-3 mr-1" /> Add Skill
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto pr-2 scrollbar-hide py-1">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center gap-1 group/skill bg-black/40 rounded-lg p-1 pr-2 border border-white/5 hover:border-emerald-500/30 transition-all"
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

        <div className="p-6 border-t border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl flex justify-end gap-3 rounded-b-2xl">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6 h-11 rounded-xl font-bold border-white/10 hover:bg-white/5 cursor-pointer text-xs"
          >
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] px-8 h-11 rounded-xl font-black shadow-xl shadow-emerald-500/20 active:scale-95 cursor-pointer text-xs"
          >
            Apply Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

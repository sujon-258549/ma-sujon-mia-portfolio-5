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
import { Experience, ExperienceSectionData } from "@/types/experience";
import { Plus, X, TrendingUp, Users, Code2 } from "lucide-react";

interface ExperienceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ExperienceSectionData;
  onSave: (newData: ExperienceSectionData) => void;
}

export const ExperienceEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: ExperienceEditModalProps) => {
  const [formData, setFormData] = useState<ExperienceSectionData>(currentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addExperience = () => {
    const newExp: Experience = {
      title: "New Role",
      company: "Company Name",
      companyType: "Company Sector",
      location: "Location",
      period: "2024 - Present",
      duration: "Present",
      type: "Full-time",
      icon: "fa-solid fa-briefcase",
      description: "Short description of your role...",
      achievements: ["Key achievement 1"],
      responsibilities: ["Core responsibility 1"],
      technologies: ["React", "Node.js"],
    };
    setFormData({
      ...formData,
      experiences: [newExp, ...formData.experiences],
    });
  };

  const removeExperience = (index: number) => {
    const newExps = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: newExps });
  };

  const updateExperience = <K extends keyof Experience>(
    index: number,
    field: K,
    value: Experience[K],
  ) => {
    const newExps = [...formData.experiences];
    newExps[index] = { ...newExps[index], [field]: value };
    setFormData({ ...formData, experiences: newExps });
  };

  const handleArrayUpdate = (
    expIndex: number,
    field: "achievements" | "responsibilities" | "technologies",
    itemIndex: number,
    value: string,
  ) => {
    const newExps = [...formData.experiences];
    const newArray = [...newExps[expIndex][field]];
    newArray[itemIndex] = value;
    newExps[expIndex] = { ...newExps[expIndex], [field]: newArray };
    setFormData({ ...formData, experiences: newExps });
  };

  const addArrayItem = (
    expIndex: number,
    field: "achievements" | "responsibilities" | "technologies",
  ) => {
    const newExps = [...formData.experiences];
    newExps[expIndex] = {
      ...newExps[expIndex],
      [field]: [...newExps[expIndex][field], ""],
    };
    setFormData({ ...formData, experiences: newExps });
  };

  const removeArrayItem = (
    expIndex: number,
    field: "achievements" | "responsibilities" | "technologies",
    itemIndex: number,
  ) => {
    const newExps = [...formData.experiences];
    newExps[expIndex] = {
      ...newExps[expIndex],
      [field]: newExps[expIndex][field].filter((_, i) => i !== itemIndex),
    };
    setFormData({ ...formData, experiences: newExps });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] w-[98vw] h-[95vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <div className="w-2 h-8 bg-emerald-500 rounded-full" />
              Customize Work Experience
            </DialogTitle>
            <Button
              onClick={addExperience}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-bold px-6 h-10 rounded-lg cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Experience
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8 space-y-12">
            {/* --- SECTION HEADER --- */}
            <div className="bg-[#121A1C] border border-white/5 rounded-lg p-6 space-y-6 shadow-xl">
              <div className="flex items-center gap-2 mb-2 text-emerald-500 font-bold uppercase text-xs tracking-[0.2em]">
                <TrendingUp className="w-4 h-4" />
                <span>Section Information</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                    Badge Text
                  </Label>
                  <Input
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                    Badge Icon
                  </Label>
                  <Input
                    value={formData.badgeIcon}
                    onChange={(e) =>
                      setFormData({ ...formData, badgeIcon: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-emerald-400 font-mono h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                    Main Title
                  </Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                    Highlight Title
                  </Label>
                  <Input
                    value={formData.titleColor}
                    onChange={(e) =>
                      setFormData({ ...formData, titleColor: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-emerald-500 font-bold h-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 uppercase text-[10px] tracking-widest font-bold">
                  Section Description
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-slate-300 resize-none"
                  rows={2}
                />
              </div>
            </div>

            {/* --- EXPERIENCE LIST --- */}
            <div className="space-y-8">
              {formData.experiences.map((exp, expIdx) => (
                <div
                  key={expIdx}
                  className="bg-[#121A1C] border border-white/5 rounded-lg overflow-hidden shadow-2xl relative group/card"
                >
                  <button
                    type="button"
                    onClick={() => removeExperience(expIdx)}
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all cursor-pointer z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="p-8 border-b border-white/5 bg-linear-to-r from-emerald-500/5 to-transparent">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2 lg:col-span-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Job Title
                        </Label>
                        <Input
                          value={exp.title}
                          onChange={(e) =>
                            updateExperience(expIdx, "title", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-lg font-bold text-white h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Company
                        </Label>
                        <Input
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(expIdx, "company", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-emerald-500 font-bold h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Job Type
                        </Label>
                        <Input
                          value={exp.type}
                          onChange={(e) =>
                            updateExperience(expIdx, "type", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-white h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Location
                        </Label>
                        <Input
                          value={exp.location}
                          onChange={(e) =>
                            updateExperience(expIdx, "location", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-white h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Period
                        </Label>
                        <Input
                          value={exp.period}
                          onChange={(e) =>
                            updateExperience(expIdx, "period", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-white h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Duration
                        </Label>
                        <Input
                          value={exp.duration}
                          onChange={(e) =>
                            updateExperience(expIdx, "duration", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-white h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Industry / Sector
                        </Label>
                        <Input
                          value={exp.companyType}
                          onChange={(e) =>
                            updateExperience(
                              expIdx,
                              "companyType",
                              e.target.value,
                            )
                          }
                          className="bg-black/20 border-white/5 text-slate-400 h-11 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black">
                        Short Description
                      </Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            expIdx,
                            "description",
                            e.target.value,
                          )
                        }
                        className="bg-black/20 border-white/5 text-slate-300 resize-none h-20 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Achievements */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-[11px] tracking-widest">
                          <TrendingUp className="w-4 h-4" />
                          <span>Achievements</span>
                        </div>
                        <Button
                          type="button"
                          onClick={() => addArrayItem(expIdx, "achievements")}
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[10px] bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white px-2 cursor-pointer transition-all"
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {exp.achievements.map((item, idx) => (
                          <div key={idx} className="flex gap-2 group/item">
                            <Input
                              value={item}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  expIdx,
                                  "achievements",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="bg-white/5 border-white/5 text-sm h-9"
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                removeArrayItem(expIdx, "achievements", idx)
                              }
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 text-red-400 hover:text-white hover:bg-red-500 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sky-500 font-bold uppercase text-[11px] tracking-widest">
                          <Users className="w-4 h-4" />
                          <span>Core Responsibilities</span>
                        </div>
                        <Button
                          type="button"
                          onClick={() =>
                            addArrayItem(expIdx, "responsibilities")
                          }
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[10px] bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white px-2 cursor-pointer transition-all"
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {exp.responsibilities.map((item, idx) => (
                          <div key={idx} className="flex gap-2 group/item">
                            <Input
                              value={item}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  expIdx,
                                  "responsibilities",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="bg-white/5 border-white/5 text-sm h-9"
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                removeArrayItem(expIdx, "responsibilities", idx)
                              }
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 text-red-400 hover:text-white hover:bg-red-500 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-4 lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase text-[11px] tracking-widest">
                          <Code2 className="w-4 h-4" />
                          <span>Technologies Used</span>
                        </div>
                        <Button
                          type="button"
                          onClick={() => addArrayItem(expIdx, "technologies")}
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[10px] bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white px-2 cursor-pointer transition-all"
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add Tech
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-3 p-4 bg-white/5 rounded-lg border border-white/5">
                        {exp.technologies.map((item, idx) => (
                          <div key={idx} className="relative group/tech">
                            <Input
                              value={item}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  expIdx,
                                  "technologies",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="bg-black/20 border-white/10 text-xs w-28 h-8 rounded-md pr-6"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeArrayItem(expIdx, "technologies", idx)
                              }
                              className="absolute top-1/2 -right-1 -translate-y-1/2 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/tech:opacity-100 transition-opacity cursor-pointer"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>

          <div className="mt-12 p-8 border-t border-white/5 flex flex-col sm:flex-row justify-end gap-3 pb-12">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-white/10 text-white hover:bg-white/5 px-10 h-12 rounded-lg font-semibold transition-all cursor-pointer"
            >
              Discard Changes
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] px-10 h-12 rounded-lg font-bold shadow-xl shadow-emerald-500/20 cursor-pointer active:scale-95"
            >
              Publish Experience
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

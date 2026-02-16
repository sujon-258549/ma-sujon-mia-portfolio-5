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
import { EducationItem, EducationSectionData } from "@/types/education";
import { Plus, X, Award, BookOpen, TrendingUp, Loader2 } from "lucide-react";
import { dynamicContentService } from "@/services/dynamicContentService";
import { toast } from "sonner";

interface EducationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: EducationSectionData;
  onSave: (newData: EducationSectionData) => void;
}

export const EducationEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: EducationEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<EducationSectionData>(currentData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = {
      ...formData,
      type: "education",
    };
    console.log("update section", updateData);
    try {
      const res = await dynamicContentService.upsertContent(updateData);
      if (res.success) {
        toast.success("Education updated successfully!");
        onSave(formData);
        onClose();
      }
    } catch (error) {
      console.error("Education update error:", error);
      toast.error("Education update failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const addEducation = () => {
    const newItem: EducationItem = {
      degree: "New Degree/Course",
      institution: "Institution Name",
      location: "Location",
      period: "Year",
      grade: "Grade/Certificate",
      description: "Short description...",
      highlights: ["Key achievement"],
      courses: [],
      isMain: false,
      icon: "fa-solid fa-graduation-cap",
    };
    setFormData({
      ...formData,
      education: [newItem, ...formData.education],
    });
  };

  const removeEducation = (index: number) => {
    const newItems = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newItems });
  };

  const updateEducation = <K extends keyof EducationItem>(
    index: number,
    field: K,
    value: EducationItem[K],
  ) => {
    const newItems = [...formData.education];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, education: newItems });
  };

  const handleArrayUpdate = (
    eduIndex: number,
    field: "highlights" | "courses",
    itemIndex: number,
    value: string,
  ) => {
    const newItems = [...formData.education];
    const newArray = [...newItems[eduIndex][field]];
    newArray[itemIndex] = value;
    newItems[eduIndex] = { ...newItems[eduIndex], [field]: newArray };
    setFormData({ ...formData, education: newItems });
  };

  const addArrayItem = (eduIndex: number, field: "highlights" | "courses") => {
    const newItems = [...formData.education];
    newItems[eduIndex] = {
      ...newItems[eduIndex],
      [field]: [...newItems[eduIndex][field], ""],
    };
    setFormData({ ...formData, education: newItems });
  };

  const removeArrayItem = (
    eduIndex: number,
    field: "highlights" | "courses",
    itemIndex: number,
  ) => {
    const newItems = [...formData.education];
    newItems[eduIndex] = {
      ...newItems[eduIndex],
      [field]: newItems[eduIndex][field].filter((_, i) => i !== itemIndex),
    };
    setFormData({ ...formData, education: newItems });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] w-[98vw] h-[95vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <div className="w-2 h-8 bg-emerald-500 rounded-full" />
              Educational Journey Editor
            </DialogTitle>
            <Button
              onClick={addEducation}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-bold px-6 h-10 rounded-lg cursor-pointer transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Record
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8 space-y-12 pb-24">
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
                    Highlight Color
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
                  Short Intro
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-white/5 border-white/10 text-slate-300 resize-none h-20"
                />
              </div>
            </div>

            {/* --- EDUCATION RECORDS --- */}
            <div className="space-y-8">
              {formData.education.map((edu, eduIdx) => (
                <div
                  key={eduIdx}
                  className={`bg-[#121A1C] border ${edu.isMain ? "border-emerald-500/30" : "border-white/5"} rounded-lg overflow-hidden shadow-2xl relative group/card`}
                >
                  <button
                    type="button"
                    onClick={() => removeEducation(eduIdx)}
                    className="absolute top-4 right-4 w-10 h-10 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all cursor-pointer z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="p-8 border-b border-white/5 bg-linear-to-r from-emerald-500/5 to-transparent">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2 lg:col-span-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Degree / Certification
                        </Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(eduIdx, "degree", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-lg font-bold text-white h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Institution
                        </Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(
                              eduIdx,
                              "institution",
                              e.target.value,
                            )
                          }
                          className="bg-black/20 border-white/5 text-emerald-500 font-bold h-11 rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Major / Department
                        </Label>
                        <Input
                          value={edu.location}
                          onChange={(e) =>
                            updateEducation(eduIdx, "location", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-sky-400 font-bold h-11 rounded-lg"
                          placeholder="e.g. Computer Science"
                        />
                      </div>
                      <div className="space-y-4 flex flex-col justify-end">
                        <div className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-white/5 h-11">
                          <Switch
                            checked={edu.isMain}
                            onCheckedChange={(val: boolean) =>
                              updateEducation(eduIdx, "isMain", val)
                            }
                            className="data-[state=checked]:bg-emerald-500"
                          />
                          <Label className="text-[10px] text-slate-300 uppercase font-bold cursor-pointer">
                            Main / Highlight
                          </Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Location
                        </Label>
                        <Input
                          value={edu.location}
                          onChange={(e) =>
                            updateEducation(eduIdx, "location", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-white h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Period
                        </Label>
                        <Input
                          value={edu.period}
                          onChange={(e) =>
                            updateEducation(eduIdx, "period", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-white h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Grade / Result
                        </Label>
                        <Input
                          value={edu.grade}
                          onChange={(e) =>
                            updateEducation(eduIdx, "grade", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-amber-500 font-bold h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-slate-500 uppercase font-black">
                          Item Icon (FontAwesome)
                        </Label>
                        <Input
                          value={edu.icon || ""}
                          onChange={(e) =>
                            updateEducation(eduIdx, "icon", e.target.value)
                          }
                          className="bg-black/20 border-white/5 text-emerald-400 font-mono text-xs h-11"
                        />
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <Label className="text-[10px] text-slate-500 uppercase font-black">
                        Brief Description
                      </Label>
                      <Textarea
                        value={edu.description}
                        onChange={(e) =>
                          updateEducation(eduIdx, "description", e.target.value)
                        }
                        className="bg-black/20 border-white/5 text-slate-300 resize-none h-20 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Highlights */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase text-[11px] tracking-widest">
                          <Award className="w-4 h-4" />
                          <span>Key Highlights</span>
                        </div>
                        <Button
                          type="button"
                          onClick={() => addArrayItem(eduIdx, "highlights")}
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[10px] bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white px-2 cursor-pointer transition-all"
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add Point
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {edu.highlights.map((item, idx) => (
                          <div key={idx} className="flex gap-2 group/item">
                            <Input
                              value={item}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  eduIdx,
                                  "highlights",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="bg-white/5 border-white/5 text-sm h-9"
                              placeholder="Awarded dean's list..."
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                removeArrayItem(eduIdx, "highlights", idx)
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

                    {/* Courses */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sky-500 font-bold uppercase text-[11px] tracking-widest">
                          <BookOpen className="w-4 h-4" />
                          <span>Coursework</span>
                        </div>
                        <Button
                          type="button"
                          onClick={() => addArrayItem(eduIdx, "courses")}
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[10px] bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white px-2 cursor-pointer transition-all"
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add Course
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-lg border border-white/5">
                        {edu.courses.map((item, idx) => (
                          <div key={idx} className="relative group/course">
                            <Input
                              value={item}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  eduIdx,
                                  "courses",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="bg-black/20 border-white/10 text-xs w-32 h-8 rounded-md pr-6"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeArrayItem(eduIdx, "courses", idx)
                              }
                              className="absolute top-1/2 -right-1 -translate-y-1/2 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/course:opacity-100 transition-opacity cursor-pointer"
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

            <div className="mt-12 p-8 border-t border-white/5 flex flex-col sm:flex-row justify-end gap-3 pb-12">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-transparent border-white/10 text-white hover:bg-white/5 px-10 h-12 rounded-lg font-semibold transition-all cursor-pointer"
              >
                Discard
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] px-10 h-12 rounded-lg font-bold shadow-xl shadow-emerald-500/20 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Education"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

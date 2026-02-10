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
import { Project } from "@/types/project";
import {
  X,
  Globe,
  Github,
  Layers,
  Rocket,
  Target,
  Code2,
  Users,
  Clock,
  Plus,
  Trash2,
  Cpu,
  Monitor,
  Server,
  Database,
  Hammer,
} from "lucide-react";

interface ProjectEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (project: Project) => void;
  mode: "add" | "edit";
}

export const ProjectEditModal = ({
  isOpen,
  onClose,
  project,
  onSave,
  mode,
}: ProjectEditModalProps) => {
  const [formData, setFormData] = useState<Project>(() => ({
    id: project?.id || Math.random().toString(36).substr(2, 9),
    title: project?.title || "",
    shortDescription: project?.shortDescription || "",
    longDescription: project?.longDescription || "",
    image: project?.image || "bg-gradient-to-br from-slate-900 to-slate-800",
    thumbnail: project?.thumbnail || "",
    tags: project?.tags || [],
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
    role: project?.role || "",
    problem: project?.problem || "",
    plan: project?.plan || "",
    teamMembers: project?.teamMembers || [],
    duration: project?.duration || "",
    features: project?.features || [],
    technologies: project?.technologies || {
      frontend: [],
      backend: [],
      database: [],
      tools: [],
    },
    challenges: project?.challenges || [],
    solutions: project?.solutions || [],
    detailedDescriptions: project?.detailedDescriptions || [],
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const updateField = <K extends keyof Project>(
    field: K,
    value: Project[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayUpdate = (
    field: "tags" | "features" | "challenges" | "solutions" | "teamMembers",
    index: number,
    value: string,
  ) => {
    const arr = (formData[field] as string[]) || [];
    const newArray = [...arr];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (
    field: "tags" | "features" | "challenges" | "solutions" | "teamMembers",
  ) => {
    const arr = (formData[field] as string[]) || [];
    setFormData((prev) => ({
      ...prev,
      [field]: [...arr, ""],
    }));
  };

  const removeArrayItem = (
    field: "tags" | "features" | "challenges" | "solutions" | "teamMembers",
    index: number,
  ) => {
    const arr = (formData[field] as string[]) || [];
    setFormData((prev) => ({
      ...prev,
      [field]: arr.filter((_, i) => i !== index),
    }));
  };

  const handleTechUpdate = (
    category: "frontend" | "backend" | "database" | "tools",
    index: number,
    value: string,
  ) => {
    const tech = { ...formData.technologies };
    const arr = [...(tech[category] || [])];
    arr[index] = value;
    tech[category] = arr;
    setFormData((prev) => ({ ...prev, technologies: tech }));
  };

  const addTechItem = (
    category: "frontend" | "backend" | "database" | "tools",
  ) => {
    const tech = { ...formData.technologies };
    tech[category] = [...(tech[category] || []), ""];
    setFormData((prev) => ({ ...prev, technologies: tech }));
  };

  const removeTechItem = (
    category: "frontend" | "backend" | "database" | "tools",
    index: number,
  ) => {
    const tech = { ...formData.technologies };
    tech[category] = (tech[category] || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, technologies: tech }));
  };

  const updateDetailedDesc = (
    index: number,
    field: "title" | "content",
    value: string,
  ) => {
    const newDescs = [...(formData.detailedDescriptions || [])];
    newDescs[index] = { ...newDescs[index], [field]: value };
    setFormData((prev) => ({ ...prev, detailedDescriptions: newDescs }));
  };

  const addDetailedDesc = () => {
    setFormData((prev) => ({
      ...prev,
      detailedDescriptions: [
        ...(prev.detailedDescriptions || []),
        { title: "", content: "" },
      ],
    }));
  };

  const removeDetailedDesc = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      detailedDescriptions: (prev.detailedDescriptions || []).filter(
        (_, i) => i !== index,
      ),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] w-[98vw] h-[95vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
            <Code2 className="w-6 h-6" />
            {mode === "edit" ? "Update Project Details" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8 space-y-10 pb-24">
            <div className="bg-[#121A1C] border border-white/5 rounded-lg overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-linear-to-br from-emerald-500/5 to-transparent">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          Project Name
                        </Label>
                        <Input
                          value={formData.title}
                          onChange={(e) => updateField("title", e.target.value)}
                          className="bg-black/40 border-white/5 text-xl font-bold text-white h-14 rounded-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          Category
                        </Label>
                        <Input
                          value={formData.category}
                          onChange={(e) =>
                            updateField("category", e.target.value)
                          }
                          className="bg-black/40 border-white/5 text-emerald-500 font-bold h-14 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          Duration
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                          <Input
                            value={formData.duration}
                            onChange={(e) =>
                              updateField("duration", e.target.value)
                            }
                            className="bg-black/40 border-white/5 pl-12 h-14 rounded-lg"
                            placeholder="e.g. 3 Months"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          Role
                        </Label>
                        <Input
                          value={formData.role || ""}
                          onChange={(e) => updateField("role", e.target.value)}
                          className="bg-black/40 border-white/5 text-sky-400 h-14 rounded-lg"
                          placeholder="e.g. Lead Designer"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                        Problem Statement
                      </Label>
                      <Textarea
                        value={formData.problem}
                        onChange={(e) => updateField("problem", e.target.value)}
                        className="bg-black/40 border-white/5 text-slate-300 min-h-[100px] rounded-lg"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                        Project Plan
                      </Label>
                      <Textarea
                        value={formData.plan}
                        onChange={(e) => updateField("plan", e.target.value)}
                        className="bg-black/40 border-white/5 text-slate-300 min-h-[100px] rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-black/40 p-6 rounded-lg border border-white/5 space-y-6">
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          <Globe className="w-3 h-3" /> Live Demo
                        </Label>
                        <Input
                          value={formData.liveUrl}
                          onChange={(e) =>
                            updateField("liveUrl", e.target.value)
                          }
                          className="bg-white/5 border-white/5 text-sky-400 font-mono"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          <Github className="w-3 h-3" /> Code Link
                        </Label>
                        <Input
                          value={formData.githubUrl}
                          onChange={(e) =>
                            updateField("githubUrl", e.target.value)
                          }
                          className="bg-white/5 border-white/5 text-slate-400 font-mono"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          Cover Class
                        </Label>
                        <Input
                          value={formData.image}
                          onChange={(e) => updateField("image", e.target.value)}
                          className="bg-white/5 border-white/5 text-emerald-400 font-mono"
                        />
                      </div>
                    </div>

                    <div className="bg-black/40 p-6 rounded-lg border border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest">
                          <Users className="w-4 h-4" /> Team Members
                        </Label>
                        <Button
                          type="button"
                          onClick={() => addArrayItem("teamMembers")}
                          size="sm"
                          variant="ghost"
                          className="h-7 text-emerald-500 hover:text-white hover:bg-emerald-500 text-[10px]"
                        >
                          + Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {formData.teamMembers?.map((m, i) => (
                          <div key={i} className="flex gap-2">
                            <Input
                              value={m}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  "teamMembers",
                                  i,
                                  e.target.value,
                                )
                              }
                              className="bg-white/5 border-white/5 h-9 text-xs"
                            />
                            <Button
                              type="button"
                              onClick={() => removeArrayItem("teamMembers", i)}
                              size="sm"
                              variant="ghost"
                              className="h-9 w-9 p-0 text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies Section - Many Options */}
              <div className="p-8 border-b border-white/5 bg-black/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-1 bg-emerald-500 rounded-full" />
                  <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-emerald-500" />
                    Project Technologies
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      id: "frontend",
                      icon: Monitor,
                      label: "Frontend",
                      color: "sky",
                    },
                    {
                      id: "backend",
                      icon: Server,
                      label: "Backend",
                      color: "emerald",
                    },
                    {
                      id: "database",
                      icon: Database,
                      label: "Database",
                      color: "amber",
                    },
                    {
                      id: "tools",
                      icon: Hammer,
                      label: "Tools",
                      color: "rose",
                    },
                  ].map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-black/30 p-5 rounded-lg border border-white/5 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <Label
                          className={`flex items-center gap-2 text-${cat.color}-500 font-black uppercase text-[10px] tracking-widest`}
                        >
                          <cat.icon className="w-4 h-4" />
                          {cat.label}
                        </Label>
                        <Button
                          type="button"
                          onClick={() => addTechItem(cat.id as any)}
                          size="sm"
                          variant="ghost"
                          className={`h-6 text-${cat.color}-500 hover:text-white hover:bg-${cat.color}-500 text-[10px] px-2`}
                        >
                          + Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {formData.technologies[
                          cat.id as keyof typeof formData.technologies
                        ]?.map((item, idx) => (
                          <div key={idx} className="flex gap-2 group/tech">
                            <Input
                              value={item}
                              onChange={(e) =>
                                handleTechUpdate(
                                  cat.id as any,
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="bg-white/5 border-white/5 h-8 text-[10px]"
                              placeholder={`${cat.label} item...`}
                            />
                            <Button
                              type="button"
                              onClick={() => removeTechItem(cat.id as any, idx)}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-500/30 group-hover/tech:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-sky-500 font-black uppercase text-[12px] tracking-widest">
                      <Rocket className="w-5 h-5" /> Detailed Descriptions
                      (Multi-Add)
                    </Label>
                    <Button
                      type="button"
                      onClick={addDetailedDesc}
                      className="bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white rounded-lg px-6"
                    >
                      + Add Section
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formData.detailedDescriptions?.map((desc, i) => (
                      <div
                        key={i}
                        className="bg-black/30 p-6 rounded-lg border border-white/5 relative group"
                      >
                        <Button
                          type="button"
                          onClick={() => removeDetailedDesc(i)}
                          variant="ghost"
                          className="absolute top-4 right-4 text-red-500/50 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="space-y-4">
                          <Input
                            value={desc.title}
                            onChange={(e) =>
                              updateDetailedDesc(i, "title", e.target.value)
                            }
                            placeholder="Section Title..."
                            className="bg-white/5 border-white/5 font-bold"
                          />
                          <Textarea
                            value={desc.content}
                            onChange={(e) =>
                              updateDetailedDesc(i, "content", e.target.value)
                            }
                            placeholder="Enter details..."
                            className="bg-white/5 border-white/5 min-h-[120px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest">
                        <Layers className="w-4 h-4" /> Tech Tags
                      </Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem("tags")}
                        size="sm"
                        variant="ghost"
                        className="h-7 text-emerald-500"
                      >
                        + Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 p-4 bg-black/20 rounded-lg border border-white/5 min-h-[120px]">
                      {formData.tags.map((tag, idx) => (
                        <div key={idx} className="relative group/tag">
                          <Input
                            value={tag}
                            onChange={(e) =>
                              handleArrayUpdate("tags", idx, e.target.value)
                            }
                            className="bg-white/5 border-white/10 text-[10px] w-20 h-7 rounded-full text-center pr-6"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem("tags", idx)}
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 opacity-0 group-hover/tag:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-amber-500 font-black uppercase text-[10px] tracking-widest">
                        <Target className="w-4 h-4" /> Logic & Challenges
                      </Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem("challenges")}
                        size="sm"
                        variant="ghost"
                        className="h-7 text-amber-500"
                      >
                        + Add
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData.challenges?.map((c, i) => (
                        <div key={i} className="flex gap-2">
                          <Input
                            value={c}
                            onChange={(e) =>
                              handleArrayUpdate("challenges", i, e.target.value)
                            }
                            className="bg-black/20 text-xs border-white/5"
                          />
                          <Button
                            type="button"
                            onClick={() => removeArrayItem("challenges", i)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500/50 hover:text-red-500"
                          >
                            x
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-sky-500 font-black uppercase text-[10px] tracking-widest">
                        <Rocket className="w-4 h-4" /> Features
                      </Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem("features")}
                        size="sm"
                        variant="ghost"
                        className="h-7 text-sky-500"
                      >
                        + Add
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData.features.map((f, i) => (
                        <div key={i} className="flex gap-2">
                          <Input
                            value={f}
                            onChange={(e) =>
                              handleArrayUpdate("features", i, e.target.value)
                            }
                            className="bg-black/20 text-xs border-white/5"
                          />
                          <Button
                            type="button"
                            onClick={() => removeArrayItem("features", i)}
                            size="sm"
                            variant="ghost"
                            className="text-red-500/50 hover:text-red-500"
                          >
                            x
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-8 h-12 rounded-lg font-bold border-white/10"
              >
                Discard
              </Button>
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] px-12 h-12 rounded-lg font-black shadow-xl shadow-emerald-500/20 active:scale-95"
              >
                {mode === "edit" ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

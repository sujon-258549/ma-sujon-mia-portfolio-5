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
import { Project, ProjectsSectionData } from "@/types/project";
import {
  Plus,
  X,
  Globe,
  Github,
  Layers,
  Rocket,
  Target,
  Code2,
} from "lucide-react";

interface ProjectEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ProjectsSectionData;
  onSave: (newData: ProjectsSectionData) => void;
  editingProjectIndex?: number;
}

export const ProjectEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
  editingProjectIndex,
}: ProjectEditModalProps) => {
  const [formData, setFormData] = useState<ProjectsSectionData>(currentData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addProject = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Project",
      shortDescription: "Short hook for project card",
      longDescription: "Detailed story about development process...",
      image: "bg-gradient-to-br from-slate-900 to-slate-800",
      thumbnail: "",
      tags: ["React"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Web Development",
      features: ["Real-time synchronization"],
      technologies: {
        frontend: ["React", "Tailwind"],
        backend: ["Node.js"],
        database: ["MongoDB"],
      },
      challenges: ["Scaling real-time updates"],
      solutions: ["Optimized WebSocket handling"],
      stats: [{ label: "Growth", value: "20%" }],
    };
    setFormData({
      ...formData,
      projects: [newProject, ...formData.projects],
    });
  };

  const removeProject = (index: number) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: newProjects });
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setFormData({ ...formData, projects: newProjects });
  };

  const updateProjectTech = (
    index: number,
    techField: keyof Project["technologies"],
    value: string[],
  ) => {
    const newProjects = [...formData.projects];
    newProjects[index] = {
      ...newProjects[index],
      technologies: { ...newProjects[index].technologies, [techField]: value },
    };
    setFormData({ ...formData, projects: newProjects });
  };

  const handleArrayUpdate = (
    projIdx: number,
    field: "tags" | "features" | "challenges" | "solutions",
    itemIdx: number,
    value: string,
  ) => {
    const newProjects = [...formData.projects];
    const newArray = [...(newProjects[projIdx][field] as string[])];
    newArray[itemIdx] = value;
    newProjects[projIdx] = { ...newProjects[projIdx], [field]: newArray };
    setFormData({ ...formData, projects: newProjects });
  };

  const addArrayItem = (
    projIdx: number,
    field: "tags" | "features" | "challenges" | "solutions",
  ) => {
    const newProjects = [...formData.projects];
    newProjects[projIdx] = {
      ...newProjects[projIdx],
      [field]: [...(newProjects[projIdx][field] as string[]), ""],
    };
    setFormData({ ...formData, projects: newProjects });
  };

  const removeArrayItem = (
    projIdx: number,
    field: "tags" | "features" | "challenges" | "solutions",
    itemIdx: number,
  ) => {
    const newProjects = [...formData.projects];
    newProjects[projIdx] = {
      ...newProjects[projIdx],
      [field]: (newProjects[projIdx][field] as string[]).filter(
        (_, i) => i !== itemIdx,
      ),
    };
    setFormData({ ...formData, projects: newProjects });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] w-[98vw] h-[95vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none">
        <DialogHeader className="p-6 pb-4 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <Code2 className="w-6 h-6" />
              Project Portfolio Manager
            </DialogTitle>
            <Button
              onClick={addProject}
              className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-bold px-6 h-10 rounded-lg cursor-pointer transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4 mr-2" /> New Project
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8 space-y-12 pb-24">
            {/* SECTION HEADER SETTINGS */}
            <div className="bg-[#121A1C] border border-white/5 rounded-3xl p-8 space-y-8 shadow-2xl">
              <div className="flex items-center gap-3 text-emerald-500 font-bold uppercase text-xs tracking-[0.3em]">
                <Rocket className="w-5 h-5 animate-pulse" />
                <span>Section Presentation</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-3">
                  <Label className="text-slate-500 uppercase text-[10px] tracking-widest font-black">
                    Badge Text
                  </Label>
                  <Input
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white h-12 focus:border-emerald-500/50"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-500 uppercase text-[10px] tracking-widest font-black">
                    Icon Class
                  </Label>
                  <Input
                    value={formData.badgeIcon}
                    onChange={(e) =>
                      setFormData({ ...formData, badgeIcon: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-emerald-400 font-mono h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-500 uppercase text-[10px] tracking-widest font-black">
                    Main Title
                  </Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-500 uppercase text-[10px] tracking-widest font-black">
                    Highlight Word
                  </Label>
                  <Input
                    value={formData.titleHighlight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        titleHighlight: e.target.value,
                      })
                    }
                    className="bg-white/5 border-white/10 text-emerald-500 font-bold h-12"
                  />
                </div>
              </div>
            </div>

            {/* PROJECTS LIST */}
            <div className="space-y-12">
              {formData.projects.map((project, projIdx) => (
                <div
                  key={projIdx}
                  className="bg-[#121A1C] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative group/card hover:border-emerald-500/20 transition-all duration-500"
                >
                  <div className="absolute top-6 right-6 flex gap-2 z-10">
                    <button
                      type="button"
                      onClick={() => removeProject(projIdx)}
                      className="w-12 h-12 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-10 border-b border-white/5 bg-linear-to-br from-emerald-500/[0.03] to-transparent">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      {/* Left Side: Basic Info */}
                      <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                              Project Name
                            </Label>
                            <Input
                              value={project.title}
                              onChange={(e) =>
                                updateProject(projIdx, "title", e.target.value)
                              }
                              className="bg-black/40 border-white/5 text-xl font-bold text-white h-14 rounded-2xl focus:border-emerald-500/30"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                              Category
                            </Label>
                            <Input
                              value={project.category}
                              onChange={(e) =>
                                updateProject(
                                  projIdx,
                                  "category",
                                  e.target.value,
                                )
                              }
                              className="bg-black/40 border-white/5 text-emerald-500 font-bold h-14 rounded-2xl"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                            Short Hook/Subtitle
                          </Label>
                          <Input
                            value={project.shortDescription}
                            onChange={(e) =>
                              updateProject(
                                projIdx,
                                "shortDescription",
                                e.target.value,
                              )
                            }
                            className="bg-black/40 border-white/5 text-slate-300 h-14 rounded-2xl"
                            placeholder="A brief catchy line for the card..."
                          />
                        </div>

                        <div className="space-y-3">
                          <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                            Full Project Story (For Details Page)
                          </Label>
                          <Textarea
                            value={project.longDescription}
                            onChange={(e) =>
                              updateProject(
                                projIdx,
                                "longDescription",
                                e.target.value,
                              )
                            }
                            className="bg-black/40 border-white/5 text-slate-400 resize-none h-40 rounded-3xl p-6 leading-relaxed"
                            placeholder="Write about the project's inception, development, and results..."
                          />
                        </div>
                      </div>

                      {/* Right Side: Links & Media */}
                      <div className="lg:col-span-4 space-y-6">
                        <div className="bg-black/40 p-6 rounded-[2rem] border border-white/5 space-y-6">
                          <div className="space-y-3">
                            <Label className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-black tracking-widest">
                              <Globe className="w-3 h-3" /> Live Demo URL
                            </Label>
                            <Input
                              value={project.liveUrl}
                              onChange={(e) =>
                                updateProject(
                                  projIdx,
                                  "liveUrl",
                                  e.target.value,
                                )
                              }
                              className="bg-white/5 border-white/5 text-sky-400 h-11 rounded-xl font-mono text-sm"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-black tracking-widest">
                              <Github className="w-3 h-3" /> Github Repository
                            </Label>
                            <Input
                              value={project.githubUrl}
                              onChange={(e) =>
                                updateProject(
                                  projIdx,
                                  "githubUrl",
                                  e.target.value,
                                )
                              }
                              className="bg-white/5 border-white/5 text-slate-400 h-11 rounded-xl font-mono text-sm"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                              Cover Gradient/Image Class
                            </Label>
                            <Input
                              value={project.image}
                              onChange={(e) =>
                                updateProject(projIdx, "image", e.target.value)
                              }
                              className="bg-white/5 border-white/5 text-emerald-400 h-11 rounded-xl font-mono text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ARRAY SECTIONS (TAGS, FEATURES, CHALLENGES) */}
                  <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 bg-[#0E1416]/30">
                    {/* Project Tags */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[11px] tracking-widest">
                          <Layers className="w-4 h-4" /> Card Tags
                        </Label>
                        <Button
                          type="button"
                          onClick={() => addArrayItem(projIdx, "tags")}
                          className="h-8 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white px-3 text-[10px] font-bold rounded-lg cursor-pointer"
                        >
                          Add Tag
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-3xl border border-white/5 min-h-[100px]">
                        {project.tags.map((tag, tagIdx) => (
                          <div key={tagIdx} className="relative group/idx">
                            <Input
                              value={tag}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  projIdx,
                                  "tags",
                                  tagIdx,
                                  e.target.value,
                                )
                              }
                              className="bg-black/40 border-white/10 text-[10px] w-24 h-8 rounded-full pr-6 text-center"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeArrayItem(projIdx, "tags", tagIdx)
                              }
                              className="absolute top-1/2 -right-1 -translate-y-1/2 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/idx:opacity-100 transition-opacity cursor-pointer z-10"
                            >
                              <X className="w-2 h-2" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2 text-sky-500 font-black uppercase text-[11px] tracking-widest">
                          <Rocket className="w-4 h-4" /> Core Features
                        </Label>
                        <button
                          type="button"
                          onClick={() => addArrayItem(projIdx, "features")}
                          className="text-[10px] font-bold text-sky-500 hover:underline cursor-pointer"
                        >
                          + Add Feature
                        </button>
                      </div>
                      <div className="space-y-3">
                        {project.features.map((feat, featIdx) => (
                          <div key={featIdx} className="flex gap-2 group/item">
                            <Input
                              value={feat}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  projIdx,
                                  "features",
                                  featIdx,
                                  e.target.value,
                                )
                              }
                              className="bg-white/5 border-white/5 text-xs h-10 rounded-xl"
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                removeArrayItem(projIdx, "features", featIdx)
                              }
                              variant="ghost"
                              className="h-10 w-10 p-0 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenges & Solutions */}
                    <div className="space-y-6">
                      <Label className="flex items-center gap-2 text-amber-500 font-black uppercase text-[11px] tracking-widest">
                        <Target className="w-4 h-4" /> Logic & Challenges
                      </Label>
                      <div className="space-y-6">
                        <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] uppercase font-bold text-slate-500">
                              Challenges
                            </span>
                            <button
                              onClick={() =>
                                addArrayItem(projIdx, "challenges")
                              }
                              type="button"
                              className="text-amber-500 text-[10px] hover:underline cursor-pointer"
                            >
                              + Add
                            </button>
                          </div>
                          <div className="space-y-2">
                            {project.challenges?.map((c, i) => (
                              <div key={i} className="flex gap-2">
                                <Input
                                  value={c}
                                  onChange={(e) =>
                                    handleArrayUpdate(
                                      projIdx,
                                      "challenges",
                                      i,
                                      e.target.value,
                                    )
                                  }
                                  className="bg-black/20 h-8 text-[11px] border-white/5"
                                />
                                <button
                                  onClick={() =>
                                    removeArrayItem(projIdx, "challenges", i)
                                  }
                                  type="button"
                                  className="text-red-500/50 cursor-pointer hover:text-red-500"
                                >
                                  x
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] uppercase font-bold text-emerald-500">
                              Solutions
                            </span>
                            <button
                              onClick={() => addArrayItem(projIdx, "solutions")}
                              type="button"
                              className="text-emerald-500 text-[10px] hover:underline cursor-pointer"
                            >
                              + Add
                            </button>
                          </div>
                          <div className="space-y-2">
                            {project.solutions?.map((s, i) => (
                              <div key={i} className="flex gap-2">
                                <Input
                                  value={s}
                                  onChange={(e) =>
                                    handleArrayUpdate(
                                      projIdx,
                                      "solutions",
                                      i,
                                      e.target.value,
                                    )
                                  }
                                  className="bg-black/20 h-8 text-[11px] border-white/5"
                                />
                                <button
                                  onClick={() =>
                                    removeArrayItem(projIdx, "solutions", i)
                                  }
                                  type="button"
                                  className="text-red-500/50 cursor-pointer hover:text-red-500"
                                >
                                  x
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* MODAL FOOTER - Consistent With Previous Modals */}
            <div className="mt-12 p-8 border-t border-white/5 flex flex-col sm:flex-row justify-end gap-3 pb-12">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-transparent border-white/10 text-white hover:bg-white/5 px-10 h-12 rounded-xl font-semibold transition-all cursor-pointer"
              >
                Discard
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] px-10 h-12 rounded-xl font-bold shadow-xl shadow-emerald-500/20 cursor-pointer active:scale-95"
              >
                Save All Projects
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

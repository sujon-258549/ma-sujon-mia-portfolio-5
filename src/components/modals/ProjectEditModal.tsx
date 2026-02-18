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
import { Project } from "@/types/project";
import { projectService } from "@/services/projectService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProjectEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSuccess: (project: Project, mode: "add" | "edit") => void;
  mode: "add" | "edit";
}

export const ProjectEditModal = ({
  isOpen,
  onClose,
  project,
  onSuccess,
  mode,
}: ProjectEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Project>(() => ({
    _id: project?._id,
    id: project?.id || Math.random().toString(36).substr(2, 9),
    sl: project?.sl || "",
    slug: project?.slug || "",
    title: project?.title || "",
    shortDescription: project?.shortDescription || "",
    longDescription: project?.longDescription || "",
    image: project?.image || "bg-gradient-to-br from-slate-900 to-slate-800",
    imageName: project?.imageName || "",
    thumbnail: project?.thumbnail || "",
    tags: project?.tags || [],
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
    role: project?.role || "",
    problem: project?.problem || "",
    plan: project?.plan || "",
    teamMembers:
      project?.teamMembers && project.teamMembers.length > 0
        ? project.teamMembers
        : [""],
    duration: project?.duration || "",
    features:
      project?.features && project.features.length > 0
        ? project.features
        : [""],
    technologies: {
      frontend:
        project?.technologies?.frontend &&
        project.technologies.frontend.length > 0
          ? project.technologies.frontend
          : [""],
      backend:
        project?.technologies?.backend &&
        project.technologies.backend.length > 0
          ? project.technologies.backend
          : [""],
      database:
        project?.technologies?.database &&
        project.technologies.database.length > 0
          ? project.technologies.database
          : [""],
      tools:
        project?.technologies?.tools && project.technologies.tools.length > 0
          ? project.technologies.tools
          : [""],
    },
    challenges:
      project?.challenges && project.challenges.length > 0
        ? project.challenges
        : [""],
    solutions:
      project?.solutions && project.solutions.length > 0
        ? project.solutions
        : [{ text: "", image: "" }],
    gallery:
      project?.gallery && project.gallery.length > 0 ? project.gallery : [""],
    stats:
      project?.stats && project.stats.length > 0
        ? project.stats
        : [{ label: "", value: "" }],
    detailedDescriptions: project?.detailedDescriptions || [],
    isActive: project?.isActive ?? true,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let savedProject: Project;
      const projectId = formData._id || formData.id;

      if (mode === "edit" && projectId) {
        // Strip out IDs from the update payload as they go in URL params
        const updatePayload = { ...formData } as Partial<Project>;
        delete updatePayload._id;
        delete updatePayload.id;
        savedProject = await projectService.updateProject(
          projectId,
          updatePayload,
        );
        toast.success("Project updated successfully!");
      } else {
        savedProject = await projectService.createProject(formData);
        toast.success("Project created successfully!");
      }

      onSuccess(savedProject, mode);
      onClose();
    } catch (error) {
      console.error("Failed to save project:", error);
      const errorMessage =
        error instanceof Error
          ? (error as { error?: string }).error || error.message
          : "Failed to save project";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = <K extends keyof Project>(
    field: K,
    value: Project[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayUpdate = (
    field: "tags" | "features" | "challenges" | "teamMembers",
    index: number,
    value: string,
  ) => {
    const arr = (formData[field] as string[]) || [];
    const newArray = [...arr];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (
    field: "tags" | "features" | "challenges" | "teamMembers",
  ) => {
    const arr = (formData[field] as string[]) || [];
    setFormData((prev) => ({
      ...prev,
      [field]: [...arr, ""],
    }));
  };

  const removeArrayItem = (
    field: "tags" | "features" | "challenges" | "teamMembers",
    index: number,
  ) => {
    const arr = (formData[field] as string[]) || [];
    setFormData((prev) => ({
      ...prev,
      [field]: arr.filter((_, i) => i !== index),
    }));
  };

  // Solution handlers (object array: {text, image})
  const addSolution = () => {
    setFormData((prev) => ({
      ...prev,
      solutions: [...(prev.solutions || []), { text: "", image: "" }],
    }));
  };

  const updateSolution = (
    index: number,
    field: "text" | "image",
    value: string,
  ) => {
    const newSolutions = [...(formData.solutions || [])];
    newSolutions[index] = { ...newSolutions[index], [field]: value };
    setFormData((prev) => ({ ...prev, solutions: newSolutions }));
  };

  const removeSolution = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      solutions: (prev.solutions || []).filter((_, i) => i !== index),
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

  // Gallery handlers
  const addGalleryItem = () => {
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), ""],
    }));
  };

  const updateGalleryItem = (index: number, value: string) => {
    const newGallery = [...(formData.gallery || [])];
    newGallery[index] = value;
    setFormData((prev) => ({ ...prev, gallery: newGallery }));
  };

  const removeGalleryItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index),
    }));
  };

  // Stats handlers
  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), { label: "", value: "" }],
    }));
  };

  const updateStat = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    const newStats = [...(formData.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData((prev) => ({ ...prev, stats: newStats }));
  };

  const removeStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: (prev.stats || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] w-[98vw] h-[95vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              <i className="fa-solid fa-code text-xl"></i>
              {mode === "edit" ? "Update Project Details" : "Add New Project"}
            </DialogTitle>

            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Status:
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

        <div className="flex-1 overflow-y-auto px-6 scrollbar-hide bg-[#0E1416]/50">
          <form onSubmit={handleSubmit} className="py-8 space-y-10 pb-24">
            <div className="bg-[#121A1C] border border-white/5 rounded-lg overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 bg-linear-to-br from-emerald-500/5 to-transparent">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          SL (Serial)
                        </Label>
                        <Input
                          type="text"
                          value={formData.sl}
                          onChange={(e) => updateField("sl", e.target.value)}
                          className="bg-black/40 border-white/5 text-lg font-bold text-emerald-500 h-14 rounded-lg"
                        />
                      </div>
                      <div className="md:col-span-1 space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          Project Name
                        </Label>
                        <Input
                          value={formData.title}
                          onChange={(e) => {
                            const newTitle = e.target.value;
                            updateField("title", newTitle);
                            if (mode === "add") {
                              const slug = newTitle
                                .toLowerCase()
                                .replace(/[^\w\s-]/g, "")
                                .replace(/[\s_-]+/g, "-")
                                .replace(/^-+|-+$/g, "");
                              updateField("slug", slug);
                            }
                          }}
                          className="bg-black/40 border-white/5 text-lg font-bold text-white h-14 rounded-lg"
                        />
                      </div>
                      <div className="md:col-span-1 space-y-3">
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

                    <div className="space-y-3">
                      <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                        Project Slug
                      </Label>
                      <Input
                        value={formData.slug || ""}
                        onChange={(e) => updateField("slug", e.target.value)}
                        className="bg-black/40 border-white/5 text-slate-400 font-mono h-14 rounded-lg"
                        placeholder="project-title-slug"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          Duration
                        </Label>
                        <div className="relative">
                          <i className="fa-solid fa-clock absolute left-4 top-1/2 -translate-y-1/2 text-base text-emerald-500"></i>
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
                        Short Description
                      </Label>
                      <Textarea
                        value={formData.shortDescription}
                        onChange={(e) =>
                          updateField("shortDescription", e.target.value)
                        }
                        className="bg-black/40 border-white/5 text-slate-300 min-h-[80px] rounded-lg"
                        placeholder="Brief one-liner about the project..."
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                        Long Description
                      </Label>
                      <Textarea
                        value={formData.longDescription}
                        onChange={(e) =>
                          updateField("longDescription", e.target.value)
                        }
                        className="bg-black/40 border-white/5 text-slate-300 min-h-[120px] rounded-lg"
                        placeholder="Detailed description of the project..."
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                        Problem Statement
                      </Label>
                      <Textarea
                        value={formData.problem}
                        onChange={(e) => updateField("problem", e.target.value)}
                        className="bg-black/40 border-white/5 text-slate-300 min-h-[100px] rounded-lg"
                        placeholder="What problem does this project solve?"
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
                        placeholder="How was the project planned and executed?"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-black/40 p-6 rounded-lg border border-white/5 space-y-6">
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          <i className="fa-solid fa-globe text-xs"></i> Live
                          Demo
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
                          <i className="fa-brands fa-github text-xs"></i> Code
                          Link
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
                          Image Name / Alt Text
                        </Label>
                        <Input
                          value={formData.imageName || ""}
                          onChange={(e) =>
                            updateField("imageName", e.target.value)
                          }
                          className="bg-white/5 border-white/5 text-white"
                          placeholder="e.g. E-Commerce Dashboard Preview"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          Cover Class / Image URL
                        </Label>
                        <Input
                          value={formData.image}
                          onChange={(e) => updateField("image", e.target.value)}
                          className="bg-white/5 border-white/5 text-emerald-400 font-mono"
                          placeholder="bg-gradient-to-br from-... or image URL"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                          Thumbnail URL
                        </Label>
                        <Input
                          value={formData.thumbnail}
                          onChange={(e) =>
                            updateField("thumbnail", e.target.value)
                          }
                          className="bg-white/5 border-white/5 text-sky-400 font-mono"
                          placeholder="https://... thumbnail image"
                        />
                      </div>
                    </div>

                    <div className="bg-black/40 p-6 rounded-lg border border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest">
                          <i className="fa-solid fa-users text-base"></i> Team
                          Members
                        </Label>
                        <Button
                          type="button"
                          onClick={() => addArrayItem("teamMembers")}
                          size="sm"
                          variant="ghost"
                          className="h-7 text-emerald-500 hover:text-white hover:bg-emerald-500 text-[10px] cursor-pointer"
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
                              className="h-9 w-9 p-0 text-red-500 hover:bg-red-500/10 cursor-pointer"
                            >
                              <i className="fa-solid fa-trash text-sm"></i>
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
                    <i className="fa-solid fa-microchip text-lg text-emerald-500"></i>
                    Project Technologies
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      id: "frontend",
                      label: "Frontend",
                      color: "sky",
                    },
                    {
                      id: "backend",
                      label: "Backend",
                      color: "emerald",
                    },
                    {
                      id: "database",
                      label: "Database",
                      color: "amber",
                    },
                    {
                      id: "tools",
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
                          <i
                            className={`fa-solid ${cat.id === "frontend" ? "fa-desktop" : cat.id === "backend" ? "fa-server" : cat.id === "database" ? "fa-database" : "fa-hammer"} text-base`}
                          ></i>
                          {cat.label}
                        </Label>
                        <Button
                          type="button"
                          onClick={() =>
                            addTechItem(
                              cat.id as
                                | "frontend"
                                | "backend"
                                | "database"
                                | "tools",
                            )
                          }
                          size="sm"
                          variant="ghost"
                          className={`h-6 text-${cat.color}-500 hover:text-white hover:bg-${cat.color}-500 text-[10px] px-2 cursor-pointer`}
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
                                  cat.id as
                                    | "frontend"
                                    | "backend"
                                    | "database"
                                    | "tools",
                                  idx,
                                  e.target.value,
                                )
                              }
                              className="bg-white/5 border-white/5 h-8 text-[10px]"
                              placeholder={`${cat.label} item...`}
                            />
                            <Button
                              type="button"
                              onClick={() =>
                                removeTechItem(
                                  cat.id as
                                    | "frontend"
                                    | "backend"
                                    | "database"
                                    | "tools",
                                  idx,
                                )
                              }
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-500/30 group-hover/tech:text-red-500 cursor-pointer"
                            >
                              <i className="fa-solid fa-xmark text-xs"></i>
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
                      <i className="fa-solid fa-rocket text-lg"></i> Detailed
                      Descriptions (Multi-Add)
                    </Label>
                    <Button
                      type="button"
                      onClick={addDetailedDesc}
                      className="bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white rounded-lg px-6 cursor-pointer"
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
                          className="absolute top-4 right-4 text-red-500/50 hover:text-red-500 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash text-base"></i>
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
                        <i className="fa-solid fa-layer-group text-base"></i>{" "}
                        Tech Tags
                      </Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem("tags")}
                        size="sm"
                        variant="ghost"
                        className="h-7 text-emerald-500 cursor-pointer"
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
                            className="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 opacity-0 group-hover/tag:opacity-100 transition-opacity cursor-pointer"
                          >
                            <i className="fa-solid fa-xmark text-xs"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-amber-500 font-black uppercase text-[10px] tracking-widest">
                        <i className="fa-solid fa-bullseye text-base"></i> Logic
                        & Challenges
                      </Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem("challenges")}
                        size="sm"
                        variant="ghost"
                        className="h-7 text-amber-500 cursor-pointer"
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
                            className="text-red-500/50 hover:text-red-500 cursor-pointer"
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
                        <i className="fa-solid fa-rocket text-base"></i>{" "}
                        Features
                      </Label>
                      <Button
                        type="button"
                        onClick={() => addArrayItem("features")}
                        size="sm"
                        variant="ghost"
                        className="h-7 text-sky-500 cursor-pointer"
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
                            className="text-red-500/50 hover:text-red-500 cursor-pointer"
                          >
                            x
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Solutions Section */}
                <div className="mt-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-green-500 font-black uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-lightbulb text-base"></i>{" "}
                      Solutions
                    </Label>
                    <Button
                      type="button"
                      onClick={addSolution}
                      size="sm"
                      variant="ghost"
                      className="h-7 text-green-500 cursor-pointer"
                    >
                      + Add
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {formData.solutions?.map((sol, i) => (
                      <div
                        key={i}
                        className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-3 relative group/sol hover:border-green-500/20 transition-all"
                      >
                        <Button
                          type="button"
                          onClick={() => removeSolution(i)}
                          variant="ghost"
                          className="absolute top-2 right-2 text-red-500/30 group-hover/sol:text-red-500 h-7 w-7 p-0 cursor-pointer"
                        >
                          <i className="fa-solid fa-xmark text-xs"></i>
                        </Button>
                        <div className="space-y-2">
                          <Label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">
                            Solution Text
                          </Label>
                          <Input
                            value={sol.text}
                            onChange={(e) =>
                              updateSolution(i, "text", e.target.value)
                            }
                            className="bg-white/5 border-white/5 h-9 text-xs"
                            placeholder="Solution description..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1">
                            <i className="fa-solid fa-image text-green-500/50"></i>
                            Solution Image URL
                          </Label>
                          <Input
                            value={sol.image || ""}
                            onChange={(e) =>
                              updateSolution(i, "image", e.target.value)
                            }
                            className="bg-white/5 border-white/5 h-9 text-xs font-mono text-green-400"
                            placeholder="https://... solution image"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery Section */}
                <div className="mt-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-purple-500 font-black uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-images text-base"></i> Gallery
                      Images
                    </Label>
                    <Button
                      type="button"
                      onClick={addGalleryItem}
                      size="sm"
                      variant="ghost"
                      className="h-7 text-purple-500 cursor-pointer"
                    >
                      + Add
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {formData.gallery?.map((img, i) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          value={img}
                          onChange={(e) => updateGalleryItem(i, e.target.value)}
                          className="bg-black/20 text-xs border-white/5 font-mono"
                          placeholder="Image URL..."
                        />
                        <Button
                          type="button"
                          onClick={() => removeGalleryItem(i)}
                          size="sm"
                          variant="ghost"
                          className="text-red-500/50 hover:text-red-500 cursor-pointer"
                        >
                          x
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Section */}
                <div className="mt-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-widest">
                      <i className="fa-solid fa-chart-bar text-base"></i>{" "}
                      Project Stats
                    </Label>
                    <Button
                      type="button"
                      onClick={addStat}
                      size="sm"
                      variant="ghost"
                      className="h-7 text-rose-500 cursor-pointer"
                    >
                      + Add Stat
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.stats?.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-3 relative group/stat"
                      >
                        <Button
                          type="button"
                          onClick={() => removeStat(i)}
                          variant="ghost"
                          className="absolute top-2 right-2 text-red-500/30 group-hover/stat:text-red-500 h-7 w-7 p-0 cursor-pointer"
                        >
                          <i className="fa-solid fa-xmark text-xs"></i>
                        </Button>
                        <div className="space-y-2">
                          <Label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">
                            Label
                          </Label>
                          <Input
                            value={stat.label}
                            onChange={(e) =>
                              updateStat(i, "label", e.target.value)
                            }
                            className="bg-white/5 border-white/5 h-9 text-xs"
                            placeholder="e.g. Users, Downloads"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">
                            Value
                          </Label>
                          <Input
                            value={stat.value}
                            onChange={(e) =>
                              updateStat(i, "value", e.target.value)
                            }
                            className="bg-white/5 border-white/5 h-9 text-xs text-rose-400 font-bold"
                            placeholder="e.g. 10K+, 99%"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-8 h-12 rounded-lg font-bold border-white/10 cursor-pointer"
              >
                Discard
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] px-12 h-12 rounded-lg font-black shadow-xl shadow-emerald-500/20 active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : mode === "edit" ? (
                  "Update Project"
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

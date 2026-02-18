"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { projectService } from "@/services/projectService";
import { toast } from "sonner";
import { useIsAuthorized } from "@/lib/auth";
import { ProjectsSectionData, Project } from "@/types/project";
import { ProjectEditModal } from "./modals/ProjectEditModal";
import {
  ProjectSectionHeaderEditModal,
  ProjectSectionHeaderData,
} from "./modals/ProjectSectionHeaderEditModal";

interface ProjectsSectionProps {
  projects?: Project[];
  initialData?: ProjectSectionHeaderData | null;
}

// Helper: get a valid image URL from project data
const getProjectImage = (project: Project): string | null => {
  // Check if image field is a valid URL
  if (
    project.image &&
    (project.image.startsWith("http") || project.image.startsWith("/"))
  ) {
    return project.image;
  }
  // Fallback to first gallery image
  if (
    project.gallery &&
    project.gallery.length > 0 &&
    project.gallery[0].startsWith("http")
  ) {
    return project.gallery[0];
  }
  // Fallback to thumbnail
  if (
    project.thumbnail &&
    (project.thumbnail.startsWith("http") || project.thumbnail.startsWith("/"))
  ) {
    return project.thumbnail;
  }
  return null;
};

const ProjectsSection = ({
  projects: initialProjects,
  initialData,
}: ProjectsSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);

  const [completedCount, setCompletedCount] = useState(
    initialData?.completedCount || "20+",
  );

  const [sectionData, setSectionData] = useState<ProjectsSectionData>(() => ({
    badge: initialData?.badge || "Featured Projects",
    badgeIcon: initialData?.badgeIcon || "fa-solid fa-rocket",
    title: initialData?.title || "My Creative",
    titleHighlight: initialData?.titleHighlight || "Works",
    description:
      initialData?.description ||
      "Explore a selection of my recently completed projects, ranging from focused experiments to full-scale applications.",
    projects: initialProjects || [],
    isActive: initialData?.isActive ?? true,
  }));

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await projectService.deleteProject(id);
      toast.success("Project deleted successfully!");
      setSectionData((prev) => ({
        ...prev,
        projects: prev.projects.filter((p) => p._id !== id && p.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete project:", error);
      const errorMessage =
        error instanceof Error
          ? (error as { error?: string }).error || error.message
          : "Failed to delete project";
      toast.error(errorMessage);
    }
  };

  const handleSuccess = (savedProject: Project, mode: "add" | "edit") => {
    setSectionData((prev) => {
      let updatedProjects: Project[];
      if (mode === "edit") {
        updatedProjects = prev.projects.map((p) =>
          (p._id && p._id === savedProject._id) ||
          (p.id && p.id === savedProject.id)
            ? savedProject
            : p,
        );
      } else {
        updatedProjects = [savedProject, ...prev.projects];
      }

      const newData = {
        ...prev,
        projects: updatedProjects,
      };

      // Sync with localStorage as backup
      localStorage.setItem("projectsSectionData", JSON.stringify(newData));

      return newData;
    });
  };

  const handleSaveHeader = (data: ProjectSectionHeaderData) => {
    setSectionData((prev) => {
      const newData = {
        ...prev,
        badge: data.badge,
        badgeIcon: data.badgeIcon,
        title: data.title,
        titleHighlight: data.titleHighlight,
        description: data.description,
        isActive: data.isActive ?? prev.isActive,
      };
      localStorage.setItem("projectsSectionData", JSON.stringify(newData));
      return newData;
    });
    setCompletedCount(data.completedCount);
  };

  const filteredProjects = (
    isAuthorized
      ? sectionData.projects
      : sectionData.projects.filter((p) => p.isActive !== false)
  ).sort((a, b) => (a.sl || 0) - (b.sl || 0));

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 3);

  if (!sectionData.isActive && !isAuthorized) return null;

  return (
    <section
      id="projects"
      className={`section-spacing bg-[#121A1C] relative ${!sectionData.isActive ? "opacity-60 grayscale-[0.5]" : ""}`}
    >
      {/* Admin Quick Add - Floating Premium Aesthetic */}
      {isAuthorized && (
        <div className="absolute top-10 right-10 z-30 group">
          <Button
            onClick={() => {
              setModalMode("add");
              setEditingProject(null);
              setIsModalOpen(true);
            }}
            className="relative bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] font-black w-12 h-12 p-0 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] active:scale-90 cursor-pointer transition-all duration-500 flex items-center justify-center border-2 border-emerald-400/50 group-hover:border-emerald-300"
          >
            <div className="relative">
              <i className="fa-solid fa-plus text-2xl transition-transform duration-500 group-hover:rotate-90"></i>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>

          {/* Pulsing Aura Background */}
          <div className="absolute -inset-1 bg-emerald-500/20 rounded-2xl blur-xl group-hover:bg-emerald-500/40 transition-all duration-500 -z-10" />
        </div>
      )}

      {!sectionData.isActive && isAuthorized && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50 uppercase text-[9px] font-black tracking-widest px-4 py-1">
            Section Hidden from Public
          </Badge>
        </div>
      )}

      <div className="main-container">
        <div className="text-center mb-16 relative group/header">
          {/* Admin Header Edit Button */}
          {isAuthorized && (
            <button
              onClick={() => setIsHeaderModalOpen(true)}
              className="absolute top-0 right-0 z-20 w-9 h-9 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-90 opacity-0 group-hover/header:opacity-100"
            >
              <i className="fa-solid fa-pen-to-square text-xs"></i>
            </button>
          )}

          {/* 90+ Projects Completed Badge */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#172023] border border-emerald-500/20 px-4 py-2 rounded-full shadow-2xl">
            <i className="fa-solid fa-trophy text-base text-emerald-500"></i>
            <span className="text-xs font-semibold text-white uppercase tracking-tighter">
              <span className="text-emerald-500">{completedCount}</span>{" "}
              Projects Completed
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-white/10 mb-4">
            <i
              className={`${sectionData.badgeIcon} text-xs text-emerald-500`}
            ></i>
            <span className="text-sm font-medium text-emerald-500">
              {sectionData.badge}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {sectionData.title}{" "}
            <span className="text-emerald-500">
              {sectionData.titleHighlight}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {sectionData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedProjects.map((project, index) => (
            <Card
              key={index}
              className={`bg-[#121A1C] border border-white/5 rounded-lg overflow-hidden group hover:border-emerald-500/20 transition-all duration-500 flex flex-col relative gap-0 py-0 ${project.isActive === false ? "border-dashed border-red-500/30" : ""}`}
            >
              {/* Admin Individual Edit/Delete Buttons */}
              {isAuthorized && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setModalMode("edit");
                      setEditingProject(project);
                      setIsModalOpen(true);
                    }}
                    className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-90"
                    title="Edit Project"
                  >
                    <i className="fa-solid fa-pen-to-square text-xs"></i>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const projectId = project._id || project.id;
                      if (projectId) handleDeleteProject(projectId);
                    }}
                    className="w-8 h-8 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-90"
                    title="Delete Project"
                  >
                    <i className="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </div>
              )}

              {project.isActive === false && isAuthorized && (
                <div className="absolute top-4 left-4 z-40">
                  <Badge className="bg-black/60 backdrop-blur-md text-slate-400 border-white/10 uppercase text-[8px] font-black tracking-widest">
                    Draft
                  </Badge>
                </div>
              )}

              {isAuthorized && project.sl !== undefined && (
                <div className="absolute top-4 left-4 z-40">
                  <Badge className="bg-emerald-500/80 backdrop-blur-md text-black border-none uppercase text-[9px] font-black tracking-widest">
                    SL: {project.sl}
                  </Badge>
                </div>
              )}

              {/* Image Container */}
              {(() => {
                const imgUrl = getProjectImage(project);
                return (
                  <div className="h-64 relative overflow-hidden bg-[#172023]">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={project.title}
                        className="w-full h-[200%] object-cover object-top group-hover:translate-y-[-50%] transition-transform duration-[3s] ease-in-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-emerald-900 to-slate-900 flex items-center justify-center">
                        <i className="fa-solid fa-code text-4xl text-white/20"></i>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 p-8">
                      <Link
                        href={`/projects/${project._id || project.id || index}`}
                        className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 text-white font-bold gap-2 hover:bg-[#121A1C]/70 hover:border-emerald-500 hover:text-emerald-500 transition-all"
                      >
                        <i className="fa-solid fa-eye text-lg"></i>
                        View Case Study
                      </Link>
                    </div>
                  </div>
                );
              })()}

              <CardHeader className="p-6">
                <div className="flex items-center gap-2 mb-3 text-[10px] uppercase font-black text-emerald-500 tracking-widest">
                  <i className="fa-solid fa-rocket text-xs"></i>
                  {project.category || "Development"}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <CardDescription className="text-slate-400 line-clamp-2 text-sm">
                  {project.shortDescription}
                </CardDescription>
              </CardHeader>

              <div className="px-6 flex flex-wrap gap-2 mb-6">
                {Array.isArray(project.tags) &&
                  project.tags
                    .filter(
                      (tag) => typeof tag === "string" && tag.trim() !== "",
                    )
                    .slice(0, 9)
                    .map((tag, idx) => (
                      <Badge
                        key={`${tag}-${idx}`}
                        variant="outline"
                        className="bg-white/5 border-white/5 text-[10px] text-slate-400 py-0 h-6 px-2 font-bold"
                      >
                        {tag}
                      </Badge>
                    ))}
              </div>

              <CardFooter className="p-6 mt-auto border-t border-white/5 bg-black/20 grid grid-cols-2 gap-3">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-emerald-500 text-black font-bold text-xs py-2 rounded-xl hover:bg-[#121A1C] hover:text-white transition-all active:scale-95"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                  Live Demo
                </Link>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold text-xs py-2.5 rounded-xl hover:bg-white/10 transition-all active:scale-95"
                >
                  <i className="fa-brands fa-github text-sm"></i>
                  View Code
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {(filteredProjects.length > 3 || showAll) && (
          <div className="flex items-center justify-center gap-6 mt-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center gap-4 px-12 py-4 bg-emerald-500 text-black font-black text-[11px] uppercase tracking-[0.2em] overflow-hidden rounded-xl transition-all hover:bg-emerald-400 shadow-2xl shadow-emerald-500/20 cursor-pointer active:scale-95 h-14"
            >
              <span>
                {showAll ? "Minimize Portfolio" : "View Full Portfolio"}
              </span>
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-all">
                <i
                  className={`fa-solid fa-arrow-right text-sm transition-transform duration-500 ${showAll ? "rotate-270" : "rotate-0 group-hover:translate-x-1"}`}
                ></i>
              </div>
            </button>
          </div>
        )}
      </div>

      <ProjectEditModal
        key={`${editingProject?._id || editingProject?.id || "new"}-${isModalOpen}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={editingProject}
        onSuccess={handleSuccess}
        mode={modalMode}
      />

      <ProjectSectionHeaderEditModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        currentData={{
          badge: sectionData.badge,
          badgeIcon: sectionData.badgeIcon,
          title: sectionData.title,
          titleHighlight: sectionData.titleHighlight,
          description: sectionData.description,
          completedCount: completedCount,
          isActive: sectionData.isActive,
        }}
        onSave={handleSaveHeader}
      />
    </section>
  );
};

export default ProjectsSection;

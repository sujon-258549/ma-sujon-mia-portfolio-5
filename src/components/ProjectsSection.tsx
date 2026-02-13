"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isAdminAuthorized } from "@/lib/auth";
import { ProjectsSectionData, Project } from "@/types/project";
import { ProjectEditModal } from "./modals/ProjectEditModal";
import {
  ProjectSectionHeaderEditModal,
  ProjectSectionHeaderData,
} from "./modals/ProjectSectionHeaderEditModal";

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAuthorized(isAdminAuthorized());
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const [completedCount, setCompletedCount] = useState("90+");

  const [sectionData, setSectionData] = useState<ProjectsSectionData>({
    badge: "Featured Projects",
    badgeIcon: "fa-solid fa-rocket",
    title: "My Creative",
    titleHighlight: "Works",
    description:
      "Explore a selection of my recently completed projects, ranging from focused experiments to full-scale applications.",
    projects: [
      {
        id: "1",
        title: "E-Commerce Platform",
        shortDescription:
          "A full-featured online store with cart, checkout, and admin dashboard.",
        longDescription:
          "A comprehensive e-commerce solution focused on scalability and conversion optimization.",
        image: "bg-gradient-to-br from-emerald-900 to-slate-900",
        thumbnail: "",
        tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
        liveUrl: "#",
        githubUrl: "#",
        category: "Web Application",
        role: "Lead Developer",
        duration: "3 Months",
        features: ["Secure Checkout", "Inventory Management"],
        technologies: { frontend: ["React", "Tailwind", "Redux"] },
      },
      {
        id: "2",
        title: "Meta Tasker",
        shortDescription:
          "Collaborative project management tool with real-time updates.",
        longDescription:
          "Real-time task management system for modern remote teams.",
        image: "bg-gradient-to-br from-teal-900 to-slate-900",
        thumbnail: "",
        tags: ["React", "Firebase", "Tailwind"],
        liveUrl: "#",
        githubUrl: "#",
        category: "Productivity",
        role: "Full Stack Developer",
        duration: "2 Months",
        features: ["Real-time Sync", "Team Chat"],
        technologies: { frontend: ["React", "Firebase"] },
      },
      {
        id: "3",
        title: "AI Image SaaS",
        shortDescription:
          "Generation of artistic images using stable diffusion API.",
        longDescription:
          "A modern SaaS platform for AI-powered image generation and editing.",
        image: "bg-gradient-to-br from-indigo-900 to-slate-900",
        thumbnail: "",
        tags: ["Next.js", "OpenAI", "Tailwind"],
        liveUrl: "#",
        githubUrl: "#",
        category: "Artificial Intelligence",
        role: "AI Engineer",
        duration: "1.5 Months",
        features: ["Image Generation", "Gallery Sync"],
        technologies: { frontend: ["Next.js", "Clerk"] },
      },
      {
        id: "4",
        title: "Fitness Tracker App",
        shortDescription:
          "Mobile-first web app for tracking workouts and nutrition.",
        longDescription:
          "Comprehensive fitness companion for health enthusiasts.",
        image: "bg-gradient-to-br from-rose-900 to-slate-900",
        thumbnail: "",
        tags: ["React Native", "Node.js", "MongoDB"],
        liveUrl: "#",
        githubUrl: "#",
        category: "Health & Fitness",
        role: "Lead Developer",
        duration: "4 Months",
        features: ["Workout Plans", "Calorie Counter"],
        technologies: { frontend: ["React Native", "Expo"] },
      },
      {
        id: "5",
        title: "Crypto Dashboard",
        shortDescription:
          "Real-time cryptocurrency analytics and wallet tracker.",
        longDescription:
          "Advanced trading tools and market insights for crypto investors.",
        image: "bg-gradient-to-br from-amber-900 to-slate-900",
        thumbnail: "",
        tags: ["Vue.js", "Web3.js", "D3.js"],
        liveUrl: "#",
        githubUrl: "#",
        category: "FinTech",
        role: "Vue Developer",
        duration: "2.5 Months",
        features: ["Price Alerts", "Portfolio Tracking"],
        technologies: { frontend: ["Vue.js", "Chart.js"] },
      },
      {
        id: "6",
        title: "Social Media Platform",
        shortDescription:
          "Connecting professionals through interest-based networking.",
        longDescription:
          "A niche social network for highly specific professional groups.",
        image: "bg-gradient-to-br from-blue-900 to-slate-900",
        thumbnail: "",
        tags: ["Laravel", "MySQL", "Inertia.js"],
        liveUrl: "#",
        githubUrl: "#",
        category: "Social Networking",
        role: "Backend Lead",
        duration: "6 Months",
        features: ["Interest Groups", "Direct Messaging"],
        technologies: { frontend: ["React", "Inertia"] },
      },
    ],
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("projectsSectionData");
    if (savedData) {
      try {
        setSectionData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved projects data", e);
      }
    }
  }, []);

  const handleSaveProject = (newProject: Project) => {
    setSectionData((prev) => {
      let newData: ProjectsSectionData;

      if (modalMode === "edit") {
        newData = {
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === newProject.id ? newProject : p,
          ),
        };
      } else {
        newData = {
          ...prev,
          projects: [newProject, ...prev.projects],
        };
      }

      // Save to localStorage
      localStorage.setItem("projectsSectionData", JSON.stringify(newData));
      return newData;
    });
  };

  const handleSaveHeader = (data: ProjectSectionHeaderData) => {
    setSectionData((prev) => ({
      ...prev,
      badge: data.badge,
      badgeIcon: data.badgeIcon,
      title: data.title,
      titleHighlight: data.titleHighlight,
      description: data.description,
    }));
    setCompletedCount(data.completedCount);
  };

  const displayedProjects = showAll
    ? sectionData.projects
    : sectionData.projects.slice(0, 3);

  return (
    <section id="projects" className="section-spacing bg-[#121A1C] relative">
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
            <span className="text-xs font-black text-white uppercase tracking-tighter">
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
              className="bg-[#121A1C] border border-white/5 rounded-lg overflow-hidden group hover:border-emerald-500/20 transition-all duration-500 flex flex-col relative"
            >
              {/* Admin Individual Edit Button */}
              {isAuthorized && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModalMode("edit");
                    setEditingProject(project);
                    setIsModalOpen(true);
                  }}
                  className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-90"
                >
                  <i className="fa-solid fa-pen-to-square text-xs"></i>
                </button>
              )}

              {/* Image Container */}
              <div className={`h-56 ${project.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 p-8">
                  <Link
                    href={`/projects/${project.id || index}`}
                    className="w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 text-white font-bold gap-2 hover:bg-emerald-500 hover:border-emerald-500 transition-all"
                  >
                    <i className="fa-solid fa-eye text-lg"></i>
                    View Case Study
                  </Link>
                </div>
              </div>

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
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
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
                  className="flex items-center justify-center gap-2 bg-emerald-500 text-black font-bold text-xs py-2.5 rounded-lg hover:bg-emerald-400 transition-all active:scale-95"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                  Live Demo
                </Link>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-white/10 transition-all active:scale-95"
                >
                  <i className="fa-brands fa-github text-sm"></i>
                  View Code
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sectionData.projects.length > 5 && (
          <div className="text-center mt-16">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#172023] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white rounded-lg px-12 h-12 cursor-pointer font-bold shadow-xl transition-all group"
            >
              {showAll ? (
                <>
                  Minimize Portfolio
                  <i className="fa-solid fa-chevron-up text-lg ml-2 group-hover:-translate-y-1 transition-transform"></i>
                </>
              ) : (
                <>
                  View Full Portfolio
                  <i className="fa-solid fa-chevron-down text-base ml-2 group-hover:translate-y-1 transition-transform"></i>
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <ProjectEditModal
        key={`${editingProject?.id || "new"}-${isModalOpen}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={editingProject}
        onSave={handleSaveProject}
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
        }}
        onSave={handleSaveHeader}
      />
    </section>
  );
};

export default ProjectsSection;

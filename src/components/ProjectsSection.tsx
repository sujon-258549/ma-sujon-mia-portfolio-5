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
import {
  ExternalLink,
  Github,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Rocket,
  Eye,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { isAdminAuthorized } from "@/lib/auth";
import { ProjectsSectionData, Project } from "@/types/project";
import { ProjectEditModal } from "./modals/ProjectEditModal";

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAuthorized(isAdminAuthorized());
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

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

  const handleSaveProject = (newProject: Project) => {
    if (modalMode === "edit") {
      setSectionData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === newProject.id ? newProject : p,
        ),
      }));
    } else {
      setSectionData((prev) => ({
        ...prev,
        projects: [newProject, ...prev.projects],
      }));
    }
  };

  const displayedProjects = showAll
    ? sectionData.projects
    : sectionData.projects.slice(0, 5);

  return (
    <section id="projects" className="section-spacing bg-[#121A1C] relative">
      {/* Admin Quick Add */}
      {isAuthorized && (
        <div className="absolute top-8 right-8 z-30">
          <Button
            onClick={() => {
              setModalMode("add");
              setEditingProject(null);
              setIsModalOpen(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-bold px-6 h-12 rounded-full shadow-2xl shadow-emerald-500/20 active:scale-95 cursor-pointer transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">New Project</span>
          </Button>
        </div>
      )}

      <div className="main-container">
        <div className="text-center mb-16 relative">
          {/* 90+ Projects Completed Badge */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#172023] border border-emerald-500/20 px-4 py-2 rounded-full shadow-2xl">
            <Trophy className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-black text-white uppercase tracking-tighter">
              <span className="text-emerald-500">90+</span> Projects Completed
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <Eye className="w-5 h-5" />
                    View Case Study
                  </Link>
                </div>
              </div>

              <CardHeader className="p-6">
                <div className="flex items-center gap-2 mb-3 text-[10px] uppercase font-black text-emerald-500 tracking-widest">
                  <Rocket className="w-3 h-3" />
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
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </Link>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-white/10 transition-all active:scale-95"
                >
                  <Github className="w-3.5 h-3.5" />
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
              className="bg-[#172023] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white rounded-lg px-12 h-14 font-bold shadow-xl transition-all group"
            >
              {showAll ? (
                <>
                  Minimize Portfolio
                  <ChevronUp className="w-5 h-5 ml-2 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  View Full Portfolio
                  <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
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
    </section>
  );
};

export default ProjectsSection;

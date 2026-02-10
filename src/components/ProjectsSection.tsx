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
} from "lucide-react";
import Link from "next/link";
import { isAdminAuthorized } from "@/lib/auth";
import { ProjectsSectionData } from "@/types/project";
import { ProjectEditModal } from "./modals/ProjectEditModal";

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        features: ["Secure Checkout", "Inventory Management"],
        technologies: { frontend: ["React"] },
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
        features: ["Real-time Sync", "Team Chat"],
        technologies: { frontend: ["React"] },
      },
    ],
  });

  const displayedProjects = showAll
    ? sectionData.projects
    : sectionData.projects.slice(0, 3);

  return (
    <section id="projects" className="section-spacing bg-[#121A1C] relative">
      {/* Admin Quick Add */}
      {isAuthorized && (
        <div className="absolute top-8 right-8 z-30 flex gap-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-bold px-6 h-12 rounded-full shadow-2xl shadow-emerald-500/20 active:scale-95 cursor-pointer transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add New Project</span>
          </Button>
        </div>
      )}

      <div className="main-container">
        <div className="text-center mb-16">
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
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {sectionData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
          {displayedProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-[#172023] border border-emerald-500/10 overflow-hidden group hover:border-emerald-500/40 transition-all duration-500 flex flex-col h-[520px] relative rounded-[2rem]"
            >
              {/* Admin Individual Edit Button */}
              {isAuthorized && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-90"
                >
                  <i className="fa-solid fa-pen-to-square text-xs"></i>
                </button>
              )}

              {/* Image Preview */}
              <Link href={`/projects/${project.id || index}`} className="block">
                <div
                  className={`h-60 ${project.image} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 text-white font-bold text-sm bg-black/40 backdrop-blur-sm m-6 rounded-2xl border border-white/10">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    View Details
                  </div>
                </div>
              </Link>

              <CardHeader className="pt-8">
                <div className="flex items-center gap-2 mb-3 text-[10px] uppercase tracking-widest text-emerald-500 font-black font-mono">
                  <Rocket className="w-3 h-3" />
                  {project.category || "Project"}
                </div>
                <Link href={`/projects/${project.id || index}`}>
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <CardDescription className="text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                  {project.shortDescription}
                </CardDescription>
              </CardHeader>

              <div className="px-6 flex flex-wrap gap-2 mt-auto mb-6">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-white/5 border-white/5 text-slate-400 text-[10px] px-3 py-1 font-bold group-hover:border-emerald-500/30 transition-all"
                  >
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[10px] text-slate-500 font-bold self-center">
                    +{project.tags.length - 3} more
                  </span>
                )}
              </div>

              <CardFooter className="pb-8 border-t border-white/5 pt-6 bg-black/10 flex gap-4 mt-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="flex-1 text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/5 cursor-pointer font-bold text-xs"
                >
                  <Link href={project.liveUrl} target="_blank">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Site
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="flex-1 text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/5 cursor-pointer font-bold text-xs border-l border-white/5 rounded-none"
                >
                  <Link href={project.githubUrl} target="_blank">
                    <Github className="w-4 h-4 mr-2" />
                    Github
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sectionData.projects.length > 3 && (
          <div className="text-center mt-16">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white rounded-2xl px-12 h-14 font-bold shadow-xl cursor-not-allowed group transition-all"
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={sectionData}
        onSave={(newData) => setSectionData(newData)}
      />
    </section>
  );
};

export default ProjectsSection;

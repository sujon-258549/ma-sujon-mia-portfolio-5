"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
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
} from "lucide-react";

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with cart, checkout, and admin dashboard.",
      tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
      image: "bg-gradient-to-br from-emerald-900 to-slate-900",
      live: "#",
      github: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates.",
      tags: ["React", "Firebase", "Tailwind"],
      image: "bg-gradient-to-br from-teal-900 to-slate-900",
      live: "#",
      github: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "Minimalist personal portfolio with dark mode and animations.",
      tags: ["Next.js", "Framer Motion", "Shadcn UI"],
      image: "bg-gradient-to-br from-blue-900 to-slate-900",
      live: "#",
      github: "#",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for tracking social media metrics and engagement.",
      tags: ["React", "Chart.js", "Node.js"],
      image: "bg-gradient-to-br from-purple-900 to-slate-900",
      live: "#",
      github: "#",
    },
    {
      title: "Weather Application",
      description:
        "Real-time weather app with location-based forecasts and alerts.",
      tags: ["Vue.js", "Weather API", "Tailwind"],
      image: "bg-gradient-to-br from-cyan-900 to-slate-900",
      live: "#",
      github: "#",
    },
    {
      title: "Blog Platform",
      description:
        "Full-stack blogging platform with markdown support and comments.",
      tags: ["Next.js", "MongoDB", "MDX"],
      image: "bg-gradient-to-br from-orange-900 to-slate-900",
      live: "#",
      github: "#",
    },
  ];

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="section-spacing bg-[#121A1C]">
      <div className="main-container">
        <div className="text-center mb-16">
          <h5>Featured Projects</h5>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My Creative <span className="text-emerald-500">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
          {displayedProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-[#172023] border border-emerald-500/20 overflow-hidden group hover:border-emerald-500/50 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Placeholder */}
              <div className={`h-48 ${project.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                {/* Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <CardHeader>
                <h3>{project.title}</h3>
                <CardDescription className="text-slate-400 line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-emerald-500/30 text-slate-400 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-0 flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-emerald-500/30 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/50 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-emerald-500/30 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/50 cursor-pointer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        <div className="text-center mt-12">
          <Button
            onClick={() => setShowAll(!showAll)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-8 cursor-pointer"
          >
            {showAll ? (
              <>
                View Less
                <ChevronUp className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                View More
                <ChevronDown className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

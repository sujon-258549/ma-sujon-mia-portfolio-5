"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";
import { isAdminAuthorized } from "@/lib/auth";
import { SkillsSectionEditModal } from "./modals/SkillsSectionEditModal";
import { SkillsSectionData } from "@/types/skill";

const SkillsSection = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillsData, setSkillsData] = useState<SkillsSectionData>({
    badge: "My Skills",
    title: "Showcasing My",
    titleHighlight: "Expertise",
    categories: [
      {
        id: "1",
        title: "Frontend Development",
        icon: "Code2",
        skills: [
          "React",
          "Next.js",
          "Redux",
          "Tailwind CSS",
          "Bootstrap",
          "HTML5",
          "CSS3",
          "JavaScript",
          "TypeScript",
        ],
      },
      {
        id: "2",
        title: "Backend Development",
        icon: "Server",
        skills: [
          "Node.js",
          "Express.js",
          "MongoDB",
          "PostgreSQL",
          "Mongoose",
          "Prisma",
          "REST API",
          "GraphQL",
        ],
      },
      {
        id: "3",
        title: "DevOps & AWS",
        icon: "Globe",
        skills: [
          "Docker",
          "AWS EC2",
          "AWS S3",
          "CI/CD",
          "Nginx",
          "Git",
          "GitHub Actions",
        ],
      },
      {
        id: "4",
        title: "Tools & Technologies",
        icon: "Terminal",
        skills: [
          "VS Code",
          "Postman",
          "Figma",
          "Jira",
          "Trello",
          "Vercel",
          "Netlify",
        ],
      },
    ],
  });

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAdminAuthorized();
      setIsAuthorized(authStatus);
    };
    checkAuth();
  }, []);

  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Code2;
    return <Icon className="w-8 h-8 text-emerald-500" />;
  };

  const handleSaveSection = (newData: SkillsSectionData) => {
    setSkillsData(newData);
    setIsModalOpen(false);
  };

  return (
    <section id="skills" className="section-spacing bg-[#121A1C] relative">
      {isAuthorized && (
        <div className="absolute top-10 right-10 z-30 group">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] p-0 shadow-2xl transition-all duration-500 cursor-pointer border-2 border-emerald-400/50 flex items-center justify-center p-0"
            title="Edit Skills Section"
          >
            <i className="fa-solid fa-pen-to-square text-lg group-hover:scale-110 transition-transform"></i>
          </Button>
          <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur group-hover:bg-emerald-500/30 transition-all duration-500 -z-10" />
        </div>
      )}
      <div className="main-container">
        <div className="text-center mb-16">
          <h5>{skillsData.badge}</h5>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {skillsData.title}{" "}
            <span className="text-emerald-500">
              {skillsData.titleHighlight}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {skillsData.categories.map((category) => (
            <Card
              key={category.id}
              className="bg-[#172023] border border-emerald-500/15 hover:border-emerald-500/50 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-emerald-500/10"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                    {renderIcon(category.icon)}
                  </div>
                  <h3>{category.title}</h3>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-[#1C2629] text-slate-300 border border-emerald-500/15 hover:border-emerald-500/50 hover:text-emerald-400 px-3 py-1 text-sm transition-all"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <SkillsSectionEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={skillsData}
        onSave={handleSaveSection}
      />
    </section>
  );
};

export default SkillsSection;

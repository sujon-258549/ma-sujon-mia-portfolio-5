"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsAuthorized } from "@/lib/auth";
import { SkillsSectionEditModal } from "./modals/SkillsSectionEditModal";
import { SkillsSectionData } from "@/types/skill";

interface SkillsSectionProps {
  initialData?: SkillsSectionData | null;
}

const SkillsSection = ({ initialData }: SkillsSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultData: SkillsSectionData = {
    badge: "My Skills",
    title: "Showcasing My",
    titleHighlight: "Expertise",
    categories: [
      {
        id: "1",
        title: "Frontend Development",
        icon: "fa-solid fa-code",
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
        icon: "fa-solid fa-server",
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
        icon: "fa-solid fa-globe",
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
        icon: "fa-solid fa-terminal",
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
  };

  const [skillsData, setSkillsData] = useState<SkillsSectionData>(
    initialData || defaultData,
  );

  const handleSaveSection = (newData: SkillsSectionData) => {
    setSkillsData(newData);
    setIsModalOpen(false);
  };

  // If section is inactive and not admin, hide entirely
  if (!skillsData.isActive && !isAuthorized) return null;

  return (
    <section
      id="skills"
      className={`section-spacing bg-[#121A1C] relative ${!skillsData.isActive ? "opacity-60 grayscale-[0.5]" : ""}`}
    >
      {!skillsData.isActive && isAuthorized && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50 uppercase text-[9px] font-black tracking-widest px-4 py-1">
            Section Hidden from Public
          </Badge>
        </div>
      )}

      {isAuthorized && (
        <div className="absolute top-10 right-10 z-30 group">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] p-0 shadow-2xl transition-all duration-500 cursor-pointer border-2 border-emerald-400/50 flex items-center justify-center"
            title="Edit Skills Section"
          >
            <i className="fa-solid fa-pen-to-square text-lg group-hover:scale-110 transition-transform"></i>
          </Button>
          <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur group-hover:bg-emerald-500/30 transition-all duration-500 -z-10" />
        </div>
      )}
      <div className="main-container">
        <div className="text-center mb-10 md:mb-16">
          <h5>{skillsData.badge}</h5>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            {skillsData.title}{" "}
            <span className="text-emerald-500">
              {skillsData.titleHighlight}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {skillsData.categories.map((category, index) => {
            const isLastOdd =
              skillsData.categories.length % 2 !== 0 &&
              index === skillsData.categories.length - 1;

            return (
              <Card
                key={category.id}
                className={`bg-[#172023] border border-emerald-500/15 hover:border-emerald-500/50 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-emerald-500/10 ${
                  isLastOdd
                    ? "md:col-span-2 md:w-[calc(50%-12px)] md:mx-auto"
                    : ""
                }`}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6 text-left">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                      <i
                        className={`${category.icon} text-2xl sm:text-3xl text-emerald-500`}
                      ></i>
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
                        className="bg-[#1C2629] text-slate-300 border border-emerald-500/15 hover:border-emerald-500/50 hover:text-emerald-400 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm transition-all"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
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

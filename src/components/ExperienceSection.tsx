"use client";

import { useState } from "react";
import { useIsAuthorized } from "@/lib/auth";
import { ExperienceSectionData } from "@/types/experience";
import { ExperienceEditModal } from "./modals/ExperienceEditModal";
import { Button } from "./ui/button";

interface ExperienceSectionProps {
  initialData?: ExperienceSectionData | null;
}

const ExperienceSection = ({ initialData }: ExperienceSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultData: ExperienceSectionData = {
    badge: "Professional Journey",
    badgeIcon: "fa-solid fa-briefcase",
    title: "Work",
    titleColor: "Experience",
    description:
      "Building innovative solutions and growing through challenging projects",
    experiences: [
      {
        title: "MERN & PERN Stack Developer",
        company: "Programming Hero Bootcamp",
        companyType: "Intensive Training Program",
        location: "Online",
        period: "2023 - 2024",
        duration: "1 year",
        type: "Full-time Training",
        icon: "fa-solid fa-briefcase",
        description:
          "Completed comprehensive full-stack development bootcamp with hands-on projects and real-world applications. Gained expertise in modern JavaScript frameworks, database technologies, and industry best practices.",
        achievements: [
          "Successfully completed 1-year intensive bootcamp program with 95% average score",
          "Built and deployed 15+ full-stack web applications using MERN and PERN stacks",
          "Developed e-commerce platforms, social media apps, and real-time chat applications",
          "Received certificate of excellence for outstanding performance and project quality",
        ],
        responsibilities: [
          "Develop full-stack applications using MERN stack",
          "Build scalable applications with PERN stack",
          "Implement RESTful APIs and integrate with frontend",
          "Work on team projects following agile methodologies",
          "Deploy applications to cloud platforms",
          "Write clean, maintainable code following industry best practices",
        ],
        technologies: [
          "React",
          "Next.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "PostgreSQL",
          "Mongoose",
          "Prisma",
          "JWT",
          "Redux",
          "Tailwind CSS",
          "Firebase",
          "Git & GitHub",
        ],
      },
    ],
  };

  const [sectionData, setSectionData] = useState<ExperienceSectionData>(() => ({
    ...(initialData || defaultData),
    isActive: initialData?.isActive ?? true,
  }));

  if (!sectionData.isActive && !isAuthorized) return null;

  return (
    <section
      id="experience"
      className={`section-spacing bg-[#121A1C] relative group transition-all duration-300 ${!sectionData.isActive ? "opacity-50 grayscale hover:opacity-100 transition-opacity" : ""}`}
    >
      {/* Admin Edit Trigger */}
      {isAuthorized && (
        <div className="absolute top-8 right-8 z-30 flex flex-col items-center gap-4">
          {!sectionData.isActive && (
            <div className="bg-red-500 text-[8px] font-black px-2 py-1 rounded uppercase tracking-[0.2em] shadow-lg animate-pulse whitespace-nowrap">
              Section Hidden from Public
            </div>
          )}
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="w-12 h-12 bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full shadow-2xl backdrop-blur-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            <i className="fa-solid fa-pen-to-square text-lg"></i>
          </Button>
        </div>
      )}

      <div className="main-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-white/10 mb-4">
            <i
              className={`${sectionData.badgeIcon} text-xs text-emerald-500`}
            ></i>
            <span className="text-sm font-medium text-emerald-500">
              {sectionData.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 font-inherit">
            {sectionData.title}{" "}
            <span className="text-emerald-500">{sectionData.titleColor}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {sectionData.description}
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-4 md:space-y-6">
          {sectionData.experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-[#172023] border border-emerald-500/15 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/50 group/item"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-emerald-500/5 via-transparent to-transparent p-5 sm:p-6 md:p-8 border-b border-emerald-500/10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/15 group-hover/item:scale-110 transition-transform flex items-center justify-center w-12 h-12">
                        <i
                          className={`${exp.icon || "fa-solid fa-briefcase"} text-lg text-emerald-500`}
                        ></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-emerald-500 font-bold mb-1">
                          {exp.company}
                        </p>
                        <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-4">
                          {exp.companyType}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-sm text-slate-400">
                          <div className="flex items-center gap-1.5 bg-white/5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/5">
                            <i className="fa-solid fa-location-dot text-xs text-emerald-500/70"></i>
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-white/5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/5">
                            <i className="fa-solid fa-calendar text-xs text-emerald-500/70"></i>
                            <span>{exp.period}</span>
                          </div>
                          <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-500/5 text-emerald-500 rounded-full border border-emerald-500/10 font-medium">
                            {exp.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-5 py-2.5 rounded-xl font-bold shadow-xl shadow-emerald-500/5 self-start text-sm uppercase tracking-wider">
                    {exp.type}
                  </div>
                </div>

                <p className="text-slate-400 mt-6 leading-relaxed text-base italic border-l-2 border-emerald-500/30 pl-4">
                  {exp.description}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 bg-[#121A1C]/50">
                {/* Key Achievements */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-arrow-trend-up text-base text-emerald-500"></i>
                    <h4 className="text-sm font-black text-slate-200 uppercase tracking-widest">
                      Key Achievements
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all group/ach"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover/ach:scale-125 transition-transform" />
                        <span className="text-sm text-slate-300 leading-relaxed">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-users text-base text-sky-500"></i>
                    <h4 className="text-sm font-black text-slate-200 uppercase tracking-widest">
                      Core Responsibilities
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-sky-500/5 hover:border-sky-500/20 transition-all group/res"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0 group-hover/res:scale-125 transition-transform" />
                        <span className="text-sm text-slate-400 leading-relaxed">
                          {responsibility}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="lg:col-span-2 space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-code text-base text-amber-500"></i>
                    <h4 className="text-sm font-black text-slate-200 uppercase tracking-widest">
                      Tech Stack Used
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-black/20 text-slate-300 text-xs font-bold rounded-lg border border-white/5 hover:border-amber-500/30 hover:text-amber-500 hover:bg-amber-500/5 transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ExperienceEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={sectionData}
        onSave={(newData) => setSectionData(newData)}
      />
    </section>
  );
};

export default ExperienceSection;

"use client";

import { Award, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { isAdminAuthorized } from "@/lib/auth";
import { EducationSectionData } from "@/types/education";
import { EducationEditModal } from "./modals/EducationEditModal";
import { Button } from "./ui/button";

const EducationSection = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAuthorized(isAdminAuthorized());
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const [sectionData, setSectionData] = useState<EducationSectionData>({
    badge: "Academic Background",
    badgeIcon: "fa-solid fa-graduation-cap",
    title: "Educational",
    titleColor: "Journey",
    description:
      "Building a strong foundation through quality education and continuous learning",
    education: [
      {
        degree: "Diploma in Computer Science & Technology",
        institution: "Technical Institute",
        location: "Dhaka, Bangladesh",
        period: "2020 - 2024",
        grade: "CGPA 3.75/4.00",
        description:
          "Specialized in Software Development, Web Technologies, and Database Management.",
        highlights: [
          "Achieved excellent academic performance throughout the program",
          "Completed multiple real-world projects and assignments",
        ],
        courses: ["Web Development", "Database Management", "Data Structures"],
        isMain: true,
        icon: "fa-solid fa-graduation-cap",
      },
      {
        degree: "Complete Web Development Course",
        institution: "Programming Hero",
        location: "Online",
        period: "2023",
        grade: "Certificate",
        description:
          "Intensive training covering modern frontend and backend technologies.",
        highlights: ["Mastered MERN stack fundamentals", "Built 20+ projects"],
        courses: [],
        isMain: false,
        icon: "fa-solid fa-code",
      },
      {
        degree: "Next Level Web Development",
        institution: "Programming Hero",
        location: "Online",
        period: "2024",
        grade: "On going",
        description:
          "Advanced course focusing on Next.js, Redux, and complex architectures.",
        highlights: [
          "Advanced state management",
          "Server-side rendering patterns",
        ],
        courses: [],
        isMain: false,
        icon: "fa-solid fa-laptop-code",
      },
    ],
  });

  const mainEducation = sectionData.education.filter((edu) => edu.isMain);
  const secondaryEducation = sectionData.education.filter((edu) => !edu.isMain);

  return (
    <section
      id="education"
      className="section-spacing bg-[#121A1C] relative px-4 md:px-0"
    >
      {/* Admin Edit Trigger */}
      {isAuthorized && (
        <div className="absolute top-8 right-8 z-30">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className="w-12 h-12 bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-full shadow-2xl backdrop-blur-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            <i className="fa-solid fa-pen-to-square text-lg"></i>
          </Button>
        </div>
      )}

      <div className="main-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-white/10 mb-4">
            <i
              className={`${sectionData.badgeIcon} text-xs text-emerald-500`}
            ></i>
            <span className="text-sm font-medium text-emerald-500">
              {sectionData.badge}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {sectionData.title}{" "}
            <span className="text-emerald-500">{sectionData.titleColor}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {sectionData.description}
          </p>
        </div>

        {/* Education Cards */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Cards */}
          {mainEducation.map((edu, index) => (
            <div
              key={index}
              className="bg-[#172023] border border-emerald-500/15 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/50 group/item"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-emerald-500/5 via-transparent to-transparent p-6 md:p-10 border-b border-emerald-500/10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/15 group-hover/item:scale-110 transition-transform w-14 h-14 flex items-center justify-center">
                        <i
                          className={`${edu.icon || "fa-solid fa-graduation-cap"} text-2xl text-emerald-500`}
                        ></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                          {edu.degree}
                        </h3>
                        <p className="text-xl text-emerald-400 font-bold mb-3">
                          {edu.institution}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            📍 {edu.location}
                          </span>
                          <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            📅 {edu.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-5 py-2 rounded-xl font-bold shadow-xl shadow-emerald-500/5 self-start">
                    <Award className="w-5 h-5" />
                    <span>{edu.grade}</span>
                  </div>
                </div>
                <p className="text-slate-400 mt-6 leading-relaxed text-base">
                  {edu.description}
                </p>
              </div>

              {/* Body */}
              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#121A1C]/50">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-black text-slate-200 uppercase tracking-widest mb-4">
                    <Award className="w-4 h-4 text-emerald-500" />
                    Achievements
                  </h4>
                  <div className="space-y-3">
                    {edu.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span className="text-sm text-slate-300">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {edu.courses.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-black text-slate-200 uppercase tracking-widest mb-4">
                      <BookOpen className="w-4 h-4 text-sky-500" />
                      Key Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 bg-black/20 text-slate-400 text-xs font-bold rounded-lg border border-white/5"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Secondary Cards Grid */}
          {secondaryEducation.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {secondaryEducation.map((edu, index) => (
                <div
                  key={index}
                  className="bg-[#172023] border border-emerald-500/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all p-6 group/card"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/15 group-hover/card:scale-110 transition-transform">
                      <i
                        className={`${edu.icon || "fa-solid fa-code"} text-xl text-emerald-500`}
                      ></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1 leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-emerald-500 font-bold">
                        {edu.institution}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <span className="bg-white/5 px-2 py-1 rounded border border-white/5">
                      {edu.period}
                    </span>
                    <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/10">
                      {edu.grade}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {edu.description}
                  </p>
                  <div className="space-y-2">
                    {edu.highlights.slice(0, 2).map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-slate-500"
                      >
                        <div className="w-1 h-1 rounded-full bg-emerald-500/50" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <EducationEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={sectionData}
        onSave={(newData) => setSectionData(newData)}
      />
    </section>
  );
};

export default EducationSection;

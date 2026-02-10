"use client";

import { GraduationCap, Award, BookOpen } from "lucide-react";

const EducationSection = () => {
  const education = [
    {
      degree: "Diploma in Computer Science & Technology",
      institution: "Technical Institute",
      location: "Dhaka, Bangladesh",
      period: "2020 - 2024",
      grade: "CGPA 3.75/4.00",
      description:
        "Specialized in Software Development, Web Technologies, and Database Management. Completed comprehensive training in modern programming languages and frameworks.",
      highlights: [
        "Achieved excellent academic performance throughout the program",
        "Completed multiple real-world projects and assignments",
        "Active participant in coding competitions and tech events",
        "Developed strong foundation in computer science fundamentals",
      ],
      courses: [
        "Web Development",
        "Database Management",
        "Programming Fundamentals",
        "Data Structures",
        "Software Engineering",
        "Computer Networks",
      ],
      isMain: true,
    },
    {
      degree: "Complete Web Development Course",
      institution: "Programming Hero",
      location: "Online",
      period: "2023",
      grade: "Certificate",
      description:
        "Intensive web development course covering modern frontend and backend technologies.",
      highlights: [
        "Mastered HTML, CSS, JavaScript fundamentals",
        "Built responsive websites and web applications",
      ],
      courses: [],
      isMain: false,
    },
    {
      degree: "Advanced Web Development",
      institution: "Online Learning Platform",
      location: "Online",
      period: "2023",
      grade: "Certificate",
      description:
        "Advanced course focusing on modern frameworks and full-stack development.",
      highlights: [
        "Learned React, Node.js, and MongoDB",
        "Completed multiple full-stack projects",
      ],
      courses: [],
      isMain: false,
    },
  ];

  return (
    <section id="education" className="section-spacing bg-background">
      <div className="main-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-white/10 mb-4">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-500">
              Academic Background
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Educational <span className="text-emerald-500">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Building a strong foundation through quality education
          </p>
        </div>

        {/* Education Cards */}
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
          {/* Main Diploma Card */}
          {education
            .filter((edu) => edu.isMain)
            .map((edu, index) => (
              <div
                key={index}
                className="bg-card border border-emerald-500/15 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/50"
              >
                {/* Card Header */}
                <div className="bg-linear-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-6 md:p-8 border-b border-emerald-500/15">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/15">
                          <GraduationCap className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            {edu.degree}
                          </h3>
                          <p className="text-lg text-emerald-500 font-semibold mb-1">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>📍 {edu.location}</span>
                            <span>•</span>
                            <span>📅 {edu.period}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-emerald-500/20">
                      <Award className="w-4 h-4" />
                      <span>{edu.grade}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    {edu.description}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Highlights */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-emerald-500" />
                      <h4 className="text-lg font-semibold text-foreground">
                        Key Achievements
                      </h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {edu.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg border border-emerald-500/15 hover:bg-muted transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span className="text-sm text-foreground">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relevant Courses */}
                  {edu.courses.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-emerald-500" />
                        <h4 className="text-lg font-semibold text-foreground">
                          Relevant Coursework
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-muted text-foreground text-sm rounded-lg border border-emerald-500/15 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-default"
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

          {/* Course Cards Grid */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {education
              .filter((edu) => !edu.isMain)
              .map((edu, index) => (
                <div
                  key={index}
                  className="bg-card border border-emerald-500/15 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:border-emerald-500/50"
                >
                  {/* Small Card Header */}
                  <div className="bg-linear-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-4 border-b border-emerald-500/15">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/15">
                        <GraduationCap className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-foreground mb-1">
                          {edu.degree}
                        </h4>
                        <p className="text-sm text-emerald-500 font-semibold">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="px-2 py-1 bg-emerald-500 text-white text-xs rounded font-semibold">
                        {edu.grade}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      📍 {edu.location} • 📅 {edu.period}
                    </p>
                  </div>

                  {/* Small Card Body */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                    <div className="space-y-2">
                      {edu.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                          <span className="text-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

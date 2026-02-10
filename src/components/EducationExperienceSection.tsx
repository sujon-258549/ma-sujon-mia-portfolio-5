"use client";

import {
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  TrendingUp,
  Code2,
  Users,
} from "lucide-react";

const EducationExperienceSection = () => {
  const items = [
    {
      type: "education",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Dhaka",
      location: "Dhaka, Bangladesh",
      period: "2018 - 2022",
      grade: "CGPA 3.85/4.00",
      description:
        "Specialized in Software Engineering, Data Structures & Algorithms, and Web Technologies. Completed thesis on Machine Learning applications in web development.",
      highlights: [
        "Dean's List: 6 consecutive semesters",
        "Best Final Year Project Award 2022",
        "President, Computer Science Club (2021-2022)",
        "Published research paper on AI-driven web optimization",
      ],
      courses: [
        "Advanced Web Development",
        "Database Management Systems",
        "Software Engineering",
        "Machine Learning",
        "Cloud Computing",
        "Mobile App Development",
      ],
    },
    {
      type: "experience",
      title: "Senior Full Stack Developer",
      company: "TechVision Solutions",
      companyType: "Product-based Company",
      location: "Remote",
      period: "January 2023 - Present",
      duration: "1+ year",
      badge: "Full-time",
      description:
        "Leading the development of enterprise-level web applications and mentoring a team of developers. Responsible for architectural decisions and implementing scalable solutions.",
      achievements: [
        "Architected and deployed microservices infrastructure serving 100K+ daily users",
        "Improved application performance by 45% through code optimization and caching strategies",
        "Led migration from monolithic to microservices architecture, reducing deployment time by 60%",
        "Mentored 5 junior developers and conducted technical interviews for hiring",
      ],
      responsibilities: [
        "Design and develop scalable web applications using React, Next.js, and Node.js",
        "Implement CI/CD pipelines using GitHub Actions and Docker",
        "Collaborate with product managers and designers for feature planning",
        "Code review and maintain high code quality standards",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "PostgreSQL",
        "AWS",
        "Docker",
        "Redis",
      ],
    },
  ];

  return (
    <section id="education" className="py-20 bg-background">
      <div className="main-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-white/10 mb-4">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-500">
              Education & Experience
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-emerald-500">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Academic background and professional experience
          </p>
        </div>

        {/* Grid Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-white/10"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-6 md:p-8 border-b border-white/5">
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg border border-white/10">
                        {item.type === "education" ? (
                          <GraduationCap className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <Briefcase className="w-6 h-6 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                          {item.type === "education" ? item.degree : item.title}
                        </h3>
                        <p className="text-base text-emerald-500 font-semibold mb-1">
                          {item.institution || item.company}
                        </p>
                        {item.companyType && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.companyType}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{item.location}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{item.period}</span>
                          </div>
                          {item.duration && (
                            <>
                              <span>•</span>
                              <span className="font-medium">
                                {item.duration}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-emerald-500/20 self-start">
                    {item.type === "education" ? (
                      <>
                        <Award className="w-4 h-4" />
                        <span>{item.grade}</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-4 h-4" />
                        <span>{item.badge}</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Highlights/Achievements */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {item.type === "education" ? (
                      <>
                        <Award className="w-5 h-5 text-emerald-500" />
                        <h4 className="text-base font-semibold text-foreground">
                          Key Achievements
                        </h4>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <h4 className="text-base font-semibold text-foreground">
                          Key Achievements
                        </h4>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {(item.highlights || item.achievements)?.map(
                      (text, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg border border-white/5 hover:bg-muted transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span className="text-sm text-foreground leading-relaxed">
                            {text}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Responsibilities (Experience only) */}
                {item.type === "experience" && item.responsibilities && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-emerald-500" />
                      <h4 className="text-base font-semibold text-foreground">
                        Core Responsibilities
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {item.responsibilities.map((responsibility, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg border border-white/5 hover:bg-muted transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {responsibility}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses/Technologies */}
                {((item.type === "education" &&
                  item.courses &&
                  item.courses.length > 0) ||
                  (item.type === "experience" && item.technologies)) && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      {item.type === "education" ? (
                        <>
                          <BookOpen className="w-5 h-5 text-emerald-500" />
                          <h4 className="text-base font-semibold text-foreground">
                            Relevant Coursework
                          </h4>
                        </>
                      ) : (
                        <>
                          <Code2 className="w-5 h-5 text-emerald-500" />
                          <h4 className="text-base font-semibold text-foreground">
                            Technologies Used
                          </h4>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(item.courses || item.technologies)?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-muted text-foreground text-xs rounded-lg border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationExperienceSection;

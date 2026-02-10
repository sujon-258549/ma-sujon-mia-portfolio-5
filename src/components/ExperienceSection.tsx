"use client";

import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  Code2,
  Users,
} from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "MERN & PERN Stack Developer",
      company: "Programming Hero Bootcamp",
      companyType: "Intensive Training Program",
      location: "Online",
      period: "2023 - 2024",
      duration: "1 year",
      type: "Full-time Training",
      description:
        "Completed comprehensive full-stack development bootcamp with hands-on projects and real-world applications. Gained expertise in modern JavaScript frameworks, database technologies, and industry best practices.",
      achievements: [
        "Successfully completed 1-year intensive bootcamp program with 95% average score",
        "Built and deployed 15+ full-stack web applications using MERN and PERN stacks",
        "Developed e-commerce platforms, social media apps, and real-time chat applications",
        "Received certificate of excellence for outstanding performance and project quality",
      ],
      responsibilities: [
        "Develop full-stack applications using MERN (MongoDB, Express, React, Node.js) stack",
        "Build scalable applications with PERN (PostgreSQL, Express, React, Node.js) stack",
        "Implement RESTful APIs and integrate with frontend applications",
        "Work on team projects following agile methodologies and Git workflow",
        "Deploy applications to cloud platforms (Vercel, Netlify, Heroku)",
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
  ];

  return (
    <section id="experience" className="section-spacing bg-muted/30">
      <div className="main-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-white/10 mb-4">
            <Briefcase className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-500">
              Professional Journey
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Work <span className="text-emerald-500">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Building innovative solutions and growing through challenging
            projects
          </p>
        </div>

        {/* Experience Cards */}
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-card border border-emerald-500/15 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/50"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-6 md:p-8 border-b border-emerald-500/15">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/15">
                        <Briefcase className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-emerald-500 font-semibold mb-1">
                          {exp.company}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {exp.companyType}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                          <span>•</span>
                          <span className="font-medium">{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-emerald-500/20 self-start">
                    <TrendingUp className="w-4 h-4" />
                    <span>{exp.type}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Key Achievements */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <h4 className="text-lg font-semibold text-foreground">
                      Key Achievements
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/15 hover:bg-emerald-500/10 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="text-sm text-foreground leading-relaxed">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-emerald-500" />
                    <h4 className="text-lg font-semibold text-foreground">
                      Core Responsibilities
                    </h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-muted/50 p-3 rounded-lg border border-emerald-500/15 hover:bg-muted transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {responsibility}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-5 h-5 text-emerald-500" />
                    <h4 className="text-lg font-semibold text-foreground">
                      Technologies Used
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-lg border border-emerald-500/15 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-default"
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
    </section>
  );
};

export default ExperienceSection;

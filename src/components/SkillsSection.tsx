import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Globe, Server, Terminal } from "lucide-react";

const SkillsSection = () => {
  const skillsData = [
    {
      title: "Frontend Development",
      icon: <Code2 className="w-8 h-8 text-emerald-500" />,
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
      title: "Backend Development",
      icon: <Server className="w-8 h-8 text-emerald-500" />,
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
      title: "DevOps & AWS",
      icon: <Globe className="w-8 h-8 text-emerald-500" />,
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
      title: "Tools & Technologies",
      icon: <Terminal className="w-8 h-8 text-emerald-500" />,
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
  ];

  return (
    <section id="skills" className="section-spacing bg-[#121A1C] relative">
      <div className="main-container">
        <div className="text-center mb-16">
          <h5>My Skills</h5>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Showcasing My <span className="text-emerald-500">Expertise</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {skillsData.map((category, index) => (
            <Card
              key={index}
              className="bg-[#172023] border border-emerald-500/15 hover:border-emerald-500/50 transition-all duration-300 group overflow-hidden shadow-lg hover:shadow-emerald-500/10"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
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
    </section>
  );
};

export default SkillsSection;

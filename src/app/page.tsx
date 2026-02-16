import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import { dynamicContentService } from "@/services/dynamicContentService";
import { projectService } from "@/services/projectService";

export default async function Home() {
  const [
    headerContent,
    heroContent,
    aboutContent,
    skillsContent,
    servicesContent,
    educationContent,
    experienceContent,
    contactContent,
    footerContent,
  ] = await Promise.all([
    dynamicContentService.getContent("header").catch(() => null),
    dynamicContentService.getContent("hero").catch(() => null),
    dynamicContentService.getContent("about").catch(() => null),
    dynamicContentService.getContent("skills").catch(() => null),
    dynamicContentService.getContent("services").catch(() => null),
    dynamicContentService.getContent("education").catch(() => null),
    dynamicContentService.getContent("experience").catch(() => null),
    dynamicContentService.getContent("contact").catch(() => null),
    dynamicContentService.getContent("footer").catch(() => null),
  ]);

  const projects = await projectService.getAllProjects().catch(() => []);

  return (
    <div className="min-h-screen bg-[#121A1C]">
      {/* Navigation */}
      <Header initialData={headerContent} />

      {/* Hero Section */}
      <HeroSection initialData={heroContent} />

      {/* About Section */}
      <AboutSection initialData={aboutContent} />

      {/* Skills Section */}
      <SkillsSection initialData={skillsContent} />

      {/* Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Education Section */}
      <EducationSection initialData={educationContent} />

      {/* Experience Section */}
      <ExperienceSection initialData={experienceContent} />

      {/* Services Section */}
      <ServicesSection initialData={servicesContent} />

      {/* Contact Section */}
      <ContactSection initialData={contactContent} />

      {/* Footer */}
      <Footer initialData={footerContent} />
    </div>
  );
}

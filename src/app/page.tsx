import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import WorkflowSection from "@/components/WorkflowSection";
import { dynamicContentService } from "@/services/dynamicContentService";
import { projectService } from "@/services/projectService";
import { blogService } from "@/services/blogService";

export default async function Home() {
  const [
    headerContent,
    heroContent,
    aboutContent,
    skillsContent,
    workflowContent,
    servicesContent,
    educationContent,
    experienceContent,
    contactContent,
    footerContent,
    projectSectionHeaderContent,
    blogHeaderData,
  ] = await Promise.all([
    dynamicContentService.getContent("header").catch(() => null),
    dynamicContentService.getContent("hero").catch(() => null),
    dynamicContentService.getContent("about").catch(() => null),
    dynamicContentService.getContent("skills").catch(() => null),
    dynamicContentService.getContent("workflow").catch(() => null),
    dynamicContentService.getContent("services").catch(() => null),
    dynamicContentService.getContent("education").catch(() => null),
    dynamicContentService.getContent("experience").catch(() => null),
    dynamicContentService.getContent("contact").catch(() => null),
    dynamicContentService.getContent("footer").catch(() => null),
    dynamicContentService
      .getContent("project-section-header")
      .catch(() => null),
    dynamicContentService.getContent("blog_header").catch(() => null),
  ]);

  const projects = await projectService.getAllProjects().catch(() => []);
  const blogPosts = await blogService.getAllPosts().catch(() => []);

  // Merge header data and posts for BlogSection
  const blogContent = {
    ...blogHeaderData,
    posts: blogPosts,
  };

  return (
    <div className="min-h-screen bg-[#121A1C]">
      {/* Navigation */}
      <Header initialData={headerContent} />

      {/* Hero Section */}
      <HeroSection initialData={heroContent} />

      {/* About Section */}
      <AboutSection initialData={aboutContent} />

      {/* SkillsSection */}
      <SkillsSection initialData={skillsContent} />

      {/* Workflow Section */}

      {/* Projects Section */}
      <ProjectsSection
        projects={projects}
        initialData={projectSectionHeaderContent}
      />

      <WorkflowSection initialData={workflowContent} />
      {/* Education Section */}
      <EducationSection initialData={educationContent} />

      {/* Experience Section */}
      <ExperienceSection initialData={experienceContent} />

      {/* GitHub Stats Section */}
      {/* <GithubStatsSection /> */}

      {/* Services Section */}
      <ServicesSection initialData={servicesContent} />

      {/* Blog Section */}
      <BlogSection initialData={blogContent} />

      {/* Contact Section */}
      <ContactSection initialData={contactContent} />

      {/* Footer */}
      <Footer initialData={footerContent} />
    </div>
  );
}

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
import ReviewSection from "@/components/ReviewSection";
import FaqSection from "@/components/FaqSection";
import GithubStatsSection from "@/components/GithubStatsSection";
import TrustSection from "@/components/TrustSection";
import { WelcomeModal } from "@/components/WelcomeModal";
import CreativeSection from "@/components/CreativeSection";
import { dynamicContentService } from "@/services/dynamicContentService";
import { projectService } from "@/services/projectService";
import { blogService } from "@/services/blogService";
import { serverAuth } from "@/services/serverAuth";
import { reviewService } from "@/services/reviewService";
import { creativeService } from "@/services/creativeService";

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
    reviewContent,
    reviews,
    welcomeModalContent,
    creativeHeaderContent,
    creativeItems,
    faqContent,
    trustContent,
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
    dynamicContentService.getContent("review_section_header").catch(() => null),
    reviewService.getAllReviews().catch(() => []),
    dynamicContentService.getContent("welcome_modal").catch(() => null),
    dynamicContentService.getContent("creative_section").catch(() => null),
    creativeService.getItems().catch(() => []),
    dynamicContentService.getContent("faq").catch(() => null),
    dynamicContentService.getContent("trust_section").catch(() => null),
  ]);

  const projects = await projectService.getAllProjects().catch(() => []);
  const blogPosts = await blogService.getAllPosts().catch(() => []);

  const authData = await serverAuth.getUser();
  const role = authData?.role === "admin";

  // Define sortable sections configuration
  const sectionConfigs = [
    {
      id: "hero",
      content: heroContent,
      render: () => <HeroSection initialData={heroContent} />,
    },
    {
      id: "about",
      content: aboutContent,
      render: () => <AboutSection initialData={aboutContent} />,
    },
    {
      id: "skills",
      content: skillsContent,
      render: () => <SkillsSection initialData={skillsContent} />,
    },
    {
      id: "workflow",
      content: workflowContent,
      render: () => <WorkflowSection initialData={workflowContent} />,
    },
    {
      id: "projects",
      content: projectSectionHeaderContent,
      render: () => (
        <ProjectsSection
          projects={projects}
          initialData={projectSectionHeaderContent}
        />
      ),
    },
    {
      id: "creative",
      content: creativeHeaderContent,
      render: () => (
        <CreativeSection
          headerData={creativeHeaderContent}
          items={creativeItems}
        />
      ),
    },
    {
      id: "education",
      content: educationContent,
      render: () => <EducationSection initialData={educationContent} />,
    },
    {
      id: "experience",
      content: experienceContent,
      render: () => <ExperienceSection initialData={experienceContent} />,
    },
    {
      id: "services",
      content: servicesContent,
      render: () => <ServicesSection initialData={servicesContent} />,
    },
    {
      id: "blog",
      content: blogHeaderData,
      render: () => (
        <BlogSection initialData={{ ...blogHeaderData, posts: blogPosts }} />
      ),
    },
    {
      id: "reviews",
      content: reviewContent,
      render: () => (
        <ReviewSection headerData={reviewContent} reviews={reviews} />
      ),
    },
    {
      id: "contact",
      content: contactContent,
      render: () => <ContactSection initialData={contactContent} />,
    },
    {
      id: "faq",
      content: faqContent,
      render: () => <FaqSection initialData={faqContent} />,
    },
    {
      id: "trust",
      content: trustContent,
      render: () => <TrustSection initialData={trustContent} />,
    },
  ];

  // Filter based on isActive or Role, then sort by slNumber
  const sortedSections = sectionConfigs
    .filter((section) => role || section.content?.isActive)
    .sort((a, b) => {
      const slA = a.content?.slNumber ?? 999;
      const slB = b.content?.slNumber ?? 999;
      return slA - slB;
    });

  return (
    <div className="min-h-screen bg-[#121A1C]">
      {/* Navigation - Fixed at top */}
      <Header initialData={headerContent} />

      {/* Render Dynamic Sorted Sections */}
      {sortedSections.map((section) => (
        <div key={section.id}>{section.render()}</div>
      ))}

      {/* Footer - Fixed at bottom */}
      <Footer initialData={footerContent} />

      {/* Welcome Modal — shows 2s after load, once per session */}
      <WelcomeModal initialData={welcomeModalContent} />
    </div>
  );
}

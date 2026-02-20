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
  ]);

  const projects = await projectService.getAllProjects().catch(() => []);
  const blogPosts = await blogService.getAllPosts().catch(() => []);

  // Merge header data and posts for BlogSection
  const blogContent = {
    ...blogHeaderData,
    posts: blogPosts,
  };

  const authData = await serverAuth.getUser();
  const role = authData?.role === "admin";

  return (
    <div className="min-h-screen bg-[#121A1C]">
      {/* Navigation */}
      <Header initialData={headerContent} />

      {/* Hero Section */}
      {(role || heroContent?.isActive) && (
        <HeroSection initialData={heroContent} />
      )}

      {/* About Section */}
      {(role || aboutContent?.isActive) && (
        <AboutSection initialData={aboutContent} />
      )}

      {/* SkillsSection */}
      {(role || skillsContent?.isActive) && (
        <SkillsSection initialData={skillsContent} />
      )}

      {/* Workflow Section */}

      {/* Projects Section */}
      {(role || projectSectionHeaderContent?.isActive) && (
        <ProjectsSection
          projects={projects}
          initialData={projectSectionHeaderContent}
        />
      )}

      {(role || workflowContent?.isActive) && (
        <WorkflowSection initialData={workflowContent} />
      )}

      {/* Creative Section */}
      {(role || creativeHeaderContent?.isActive) && (
        <CreativeSection
          headerData={creativeHeaderContent}
          items={creativeItems}
        />
      )}
      {/* Education Section */}
      {(role || educationContent?.isActive) && (
        <EducationSection initialData={educationContent} />
      )}

      {/* Experience Section */}
      {(role || experienceContent?.isActive) && (
        <ExperienceSection initialData={experienceContent} />
      )}

      {/* GitHub Stats Section */}
      {/* <GithubStatsSection /> */}

      {/* Services Section */}
      {(role || servicesContent?.isActive) && (
        <ServicesSection initialData={servicesContent} />
      )}

      {/* Blog Section */}
      {(role || blogHeaderData?.isActive) && (
        <BlogSection initialData={blogContent} />
      )}

      {/* Review Section */}
      {(role || reviewContent?.isActive) && (
        <ReviewSection headerData={reviewContent} reviews={reviews} />
      )}

      {/* Contact Section */}
      {(role || contactContent?.isActive) && (
        <ContactSection initialData={contactContent} />
      )}

      {/* FAQ Section */}
      {(role || faqContent?.isActive) && (
        <FaqSection initialData={faqContent} />
      )}

      {/* Footer */}
      <Footer initialData={footerContent} />

      {/* Welcome Modal — shows 2s after load, once per session */}
      <WelcomeModal initialData={welcomeModalContent} />
    </div>
  );
}

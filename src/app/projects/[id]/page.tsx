import { Metadata } from "next";
import { projectService } from "@/services/projectService";
import ProjectDetailsClient from "./ProjectDetailsClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const project = await projectService.getProjectById(id);

    if (!project) {
      return {
        title: "Project Not Found | Portfolio",
        description: "The requested project could not be found.",
      };
    }

    return {
      title: `${project.title} | Project Details`,
      description: project.shortDescription,
      openGraph: {
        title: project.title,
        description: project.shortDescription,
        images:
          project.image && !project.image.startsWith("bg-")
            ? [project.image]
            : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.shortDescription,
        images:
          project.image && !project.image.startsWith("bg-")
            ? [project.image]
            : [],
      },
    };
  } catch (err) {
    console.error("Metadata fetch error:", err);
    return {
      title: "Project Details | Portfolio",
      description: "View project details on my portfolio.",
    };
  }
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params;
  let project = null;

  try {
    project = await projectService.getProjectById(id);
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return <ProjectNotFound error="Failed to load project details." />;
  }

  if (!project) {
    return <ProjectNotFound />;
  }

  return <ProjectDetailsClient project={project} />;
}

function ProjectNotFound({ error }: { error?: string }) {
  return (
    <div className="min-h-screen bg-[#0E1416] text-white">
      <Header />
      <main className="pt-32 pb-20 px-4 md:px-0">
        <div className="main-container text-center py-20">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <i className="fa-solid fa-triangle-exclamation text-4xl text-red-500"></i>
          </div>
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
            {error ||
              "The project you're looking for doesn't exist or has been removed."}
          </p>
          <Link href="/#projects">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-bold px-8 h-12 rounded-xl cursor-pointer">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

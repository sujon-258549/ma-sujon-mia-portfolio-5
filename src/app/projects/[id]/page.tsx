"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Github,
  Globe,
  ArrowLeft,
  Rocket,
  Target,
  ShieldCheck,
  Layers,
  ChevronRight,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Project } from "@/types/project";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// This would usually come from an API or shared state
const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    shortDescription:
      "A full-featured online store with cart, checkout, and admin dashboard.",
    longDescription:
      "This e-commerce platform was built to handle high-traffic retail scenarios. It features a robust product management system, integrated payment gateways with Stripe, and a real-time analytics dashboard for store owners. The project focused on performance optimization and user psychological factors to increase conversion rates.",
    image: "bg-gradient-to-br from-emerald-900 to-slate-900",
    thumbnail: "",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Web Application",
    features: [
      "Dynamic Cart Management with Persistent State",
      "Stripe Integration with Webhooks for Secure Payments",
      "Full CRUD Admin Panel for Inventory Control",
      "Responsive Product Filtering and Search",
      "User Authentication and Order History",
    ],
    technologies: {
      frontend: ["Next.js 14", "React Query", "Tailwind CSS"],
      backend: ["Node.js", "Next Auth"],
      database: ["PostgreSQL", "Prisma ORM"],
    },
    challenges: [
      "Managing complex checkout states and stock synchronization",
      "Implementing secure payment workflows with multi-step validation",
    ],
    solutions: [
      "Used Zustand for lightweight client state management",
      "Implemented server-side validation for all price-related calculations",
    ],
    stats: [
      { label: "Load Time", value: "< 1.2s" },
      { label: "SEO Score", value: "98/100" },
    ],
  },
];

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const project =
    mockProjects.find((p) => p.id === params.id) || mockProjects[0];

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#0E1416] text-white">
      <Header />

      <main className="pt-32 pb-20 px-4 md:px-0">
        <div className="main-container">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-bold mb-10 transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>

          {/* Hero Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-6 font-mono text-xs uppercase tracking-widest text-emerald-500 font-black">
                <Rocket className="w-3 h-3" />
                {project.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">
                {project.title}
              </h1>
              <p className="text-slate-400 text-xl md:text-2xl leading-relaxed mb-10 italic border-l-4 border-emerald-500/50 pl-6">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-bold px-10 h-10 rounded-lg shadow-xl shadow-emerald-500/10 transition-all active:scale-95 cursor-pointer">
                  <Globe className="w-5 h-5 mr-3" />
                  Live Demo
                </Button>
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold px-10 h-10 rounded-lg transition-all cursor-pointer"
                >
                  <Github className="w-5 h-5 mr-3" />
                  Source Code
                </Button>
              </div>
            </div>

            <div
              className={`aspect-video ${project.image} rounded-lg border border-white/10 shadow-3xl flex items-center justify-center p-1 relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
              <Code2 className="w-20 h-20 text-white/20 group-hover:scale-125 group-hover:text-emerald-500/30 transition-all duration-700" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* About Section */}
              <section>
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                  <div className="w-8 h-1 bg-emerald-500 rounded-full" />
                  The Story
                </h2>
                <div className="text-slate-400 text-lg leading-loose space-y-6">
                  {project.longDescription}
                </div>
              </section>

              {/* Key Features */}
              <section className="bg-slate-900/40 border border-white/5 rounded-lg p-4 md:p-6">
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
                  <Rocket className="w-8 h-8 text-sky-500" />
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-bold">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 bg-white/5 rounded-lg border border-white/5 hover:border-emerald-500/20 transition-all"
                    >
                      <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                      <span className="text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Challenges & Solutions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <section className="space-y-6">
                  <h3 className="text-xl font-bold text-amber-500 flex items-center gap-3">
                    <Target className="w-5 h-5" />
                    Challenges
                  </h3>
                  <div className="space-y-4">
                    {project.challenges?.map((c, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 bg-red-500/5 rounded-lg border border-red-500/10 text-slate-400 text-sm italic"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </section>
                <section className="space-y-6">
                  <h3 className="text-xl font-bold text-emerald-500 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5" />
                    Solutions
                  </h3>
                  <div className="space-y-4">
                    {project.solutions?.map((s, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-slate-400 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Sidebar Stats & Tech */}
            <div className="lg:col-span-4 space-y-10">
              <div className="bg-[#172023] border border-white/5 rounded-lg p-8 space-y-10 sticky top-32">
                {/* Tech Stack */}
                <div className="space-y-6">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/5 pb-4">
                    <Layers className="w-4 h-4" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-black/40 text-emerald-500 border border-emerald-500/20 rounded-lg text-xs font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact / Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {project.stats?.map((stat, i) => (
                    <div
                      key={i}
                      className="p-6 bg-black/40 rounded-lg border border-white/5 text-center"
                    >
                      <div className="text-2xl font-black text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link href={project.liveUrl} target="_blank" className="block">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-bold h-10 rounded-lg group cursor-pointer transition-all">
                    Visit Live Site
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

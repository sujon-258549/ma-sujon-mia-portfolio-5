"use client";

import { useRouter } from "next/navigation";
import {
  Github,
  Globe,
  ArrowLeft,
  Rocket,
  Target,
  ShieldCheck,
  ChevronRight,
  Code2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProjectDetailsClientProps {
  project: Project;
}

export default function ProjectDetailsClient({
  project,
}: ProjectDetailsClientProps) {
  const router = useRouter();

  const allTechTags = [
    ...(project.technologies?.frontend || []),
    ...(project.technologies?.backend || []),
    ...(project.technologies?.database || []),
    ...(project.technologies?.tools || []),
  ];

  return (
    <div className="min-h-screen bg-[#0E1416] pt-10 md:pt-16 text-white selection:bg-emerald-500/30">
      <Header />

      <main className="pt-10 md:pt-16 pb-20 px-4 md:px-0">
        <div className="main-container max-w-6xl mx-auto">
          {/* Back Navigation */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 font-bold mb-6 transition-all group cursor-pointer text-sm tracking-widest uppercase"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Catalog
          </button>

          {/* ─── Minimal Hero Header ─── */}
          <div className="space-y-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-black">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {project.category || "Project Case Study"}
              </div>
              <h1 className="text-3xl md:text-5xl py-3 font-bold tracking-tight text-white leading-[1.05]">
                {project.title}
              </h1>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                {project.shortDescription}
              </p>
            </div>

            {/* Smart Hero Image */}
            <div className="relative aspect-21/9 w-full rounded-lg overflow-hidden border border-emerald-500/15 shadow-3xl group bg-[#121A1C]">
              {project.image && !project.image.startsWith("bg-") ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-1000"
                  unoptimized
                />
              ) : (
                <div
                  className={`w-full h-full ${project.image || "bg-linear-to-br from-emerald-950/50 to-slate-950"} flex items-center justify-center`}
                >
                  <Code2 className="w-24 h-24 text-white/5 group-hover:text-emerald-500/10 transition-all duration-700" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-[#0E1416] via-transparent to-transparent opacity-60" />

              {/* Floating Live Link Overlay */}
              <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-4 items-center justify-between pointer-events-none">
                <div className="flex gap-4 pointer-events-auto">
                  <Link href={project.liveUrl} target="_blank">
                    <Button className="bg-white text-[#0E1416] hover:bg-emerald-500 hover:text-white font-black px-6 h-12 rounded-xl shadow-2xl transition-all active:scale-95 cursor-pointer group/btn">
                      <Globe className="w-4 h-4 mr-2" />
                      Live Experience
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180 opacity-60 group-hover/btn:rotate-225 transition-transform" />
                    </Button>
                  </Link>
                  <Link href={project.githubUrl} target="_blank">
                    <Button className="bg-[#0E1416]/80 backdrop-blur-md text-white border border-emerald-500/15 hover:bg-white hover:text-[#0E1416] font-black px-6 h-12 rounded-xl transition-all cursor-pointer">
                      <Github className="w-4 h-4 mr-2" />
                      Repository
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Modern Grid Layout ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content — The Narrative */}
            <div className="lg:col-span-8 space-y-12">
              {/* Narrative Section */}
              <section className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500/60 flex items-center gap-3">
                  <div className="w-10 h-px bg-emerald-500/30" />
                  01. Project Narrative
                </h3>
                <div className="text-slate-100 text-[12px] md:text-[16px] leading-relaxed space-y-3 selection:bg-emerald-500/40">
                  {project.longDescription?.split("\n").map((para, i) => (
                    <p key={i} className="last:mb-0">
                      {para}
                    </p>
                  )) || <p>{project.shortDescription}</p>}
                </div>
              </section>

              {/* Strategy & Problem Section */}
              {(project.problem || project.plan) && (
                <section className="space-y-6 animate-in fade-in duration-1000">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500/60 flex items-center gap-3">
                    <div className="w-10 h-px bg-emerald-500/30" />
                    02. Strategy & Challenges
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-medium">
                    {project.problem && (
                      <div className="p-5 rounded-lg bg-[#121A1C] border border-emerald-500/15 space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                          <Target className="w-5 h-5" />
                        </div>
                        <h4 className="text-white font-bold">The Challenge</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                    )}
                    {project.plan && (
                      <div className="p-8 rounded-lg bg-[#121A1C] border border-emerald-500/15 space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <Rocket className="w-5 h-5" />
                        </div>
                        <h4 className="text-white font-bold">The Solution</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {project.plan}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Features Grid */}
              {project.features && project.features.length > 0 && (
                <section className="space-y-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500/60 flex items-center gap-2">
                    <div className="w-10 h-px bg-emerald-500/30" />
                    03. Core Capabilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-[#121A1C] border border-emerald-500/15 rounded-lg hover:border-emerald-500/30 transition-all group/feat"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-300 text-sm font-bold tracking-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Gallery — Unified Image Style */}
              <section className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500/60 flex items-center gap-2">
                  <div className="w-10 h-px bg-emerald-500/30" />
                  04. Interface Design
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="relative aspect-video rounded-lg overflow-hidden border border-emerald-500/15 group/gallery bg-[#121A1C]"
                    >
                      {project.image && !project.image.startsWith("bg-") ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} view ${i}`}
                          fill
                          className="object-cover opacity-80 group-hover/gallery:opacity-100 group-hover/gallery:scale-105 transition-all duration-700"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-emerald-950/50 to-slate-950 flex items-center justify-center">
                          <Code2 className="w-12 h-12 text-white/5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar — Project Intelligence */}
            <div className="lg:col-span-4 space-y-4">
              <aside className="sticky top-24 space-y-4">
                {/* Project Brief Card */}
                <div className="bg-[#121A1C] border border-emerald-500/15 rounded-lg p-5 space-y-5 shadow-2xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 border-b border-emerald-500/15 pb-3">
                    Project Intel
                  </h4>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {project.role && (
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500/60">
                          My Role
                        </p>
                        <p className="text-sm font-bold text-white">
                          {project.role}
                        </p>
                      </div>
                    )}
                    {project.duration && (
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500/60">
                          Duration
                        </p>
                        <p className="text-sm font-bold text-white">
                          {project.duration}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Smart Tech Stack Labels */}
                  {allTechTags.length > 0 && (
                    <div className="space-y-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        Infrastructure
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {allTechTags.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-white/5 text-white border border-emerald-500/15 rounded-lg text-[10px] font-black uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Impact Stats */}
                  {project.stats && project.stats.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-emerald-500/15">
                      <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500">
                        Key Metrics
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {project.stats.map((stat, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center p-3 bg-white/2 rounded-lg border border-emerald-500/15"
                          >
                            <span className="text-[11px] font-bold text-slate-400">
                              {stat.label}
                            </span>
                            <span className="text-sm font-black text-emerald-500">
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team */}
                  {project.teamMembers && project.teamMembers.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-emerald-500/15">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        Collaboration
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.teamMembers.map((member, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] font-black text-emerald-500"
                            title={member}
                          >
                            {member.charAt(0).toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Group */}
                  <div className="space-y-3 pt-6">
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="block"
                    >
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0E1416] font-black h-12 rounded-xl group cursor-pointer transition-all">
                        View Live Site
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                      </Button>
                    </Link>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="block"
                    >
                      <Button
                        variant="ghost"
                        className="w-full text-slate-400 hover:text-white hover:bg-white/5 font-bold h-12 rounded-xl transition-all"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Explore Source
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Next Steps / Contact Card */}
                <div className="p-5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-center space-y-2">
                  <h5 className="font-bold text-white">
                    Interested in this project?
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Let&apos;s discuss how we can build something similar for
                    your business.
                  </p>
                  <Link href="/#contact" className="inline-block pt-2">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 cursor-pointer flex items-center gap-2">
                      Start a Conversation <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

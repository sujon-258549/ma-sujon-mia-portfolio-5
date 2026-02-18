"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { useIsAuthorized } from "@/lib/auth";
import { WorkflowSectionData } from "@/types/workflow";
import { WorkflowSectionEditModal } from "@/components/modals/WorkflowSectionEditModal";
import { Settings2 } from "lucide-react";

interface WorkflowSectionProps {
  initialData?: WorkflowSectionData | null;
}

const WorkflowSection = ({ initialData }: WorkflowSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [sectionData, setSectionData] = useState<WorkflowSectionData>(() => ({
    badge: initialData?.badge || "How I Work",
    badgeIcon: initialData?.badgeIcon || "fa-solid fa-list-check",
    title: initialData?.title || "My Creative",
    titleHighlight: initialData?.titleHighlight || "Process",
    description:
      initialData?.description ||
      "A systematic approach to bringing complex ideas to life, ensuring quality and efficiency at every step.",
    steps: initialData?.steps || [
      {
        id: "1",
        stepNumber: "01",
        title: "Discovery & Planning",
        description:
          "Understanding the core problem, analyzing requirements, and creating a strategic roadmap for execution.",
        icon: "fa-solid fa-magnifying-glass",
      },
      {
        id: "2",
        stepNumber: "02",
        title: "Design & Prototyping",
        description:
          "Translating concepts into visual designs and interactive prototypes to validate user experience.",
        icon: "fa-solid fa-pen-ruler",
      },
      {
        id: "3",
        stepNumber: "03",
        title: "Development",
        description:
          "Writing clean, scalable code using modern technologies to build a robust and high-performing application.",
        icon: "fa-solid fa-code",
      },
      {
        id: "4",
        stepNumber: "04",
        title: "Testing & QA",
        description:
          "Rigorous testing to ensure bug-free functionality, performance optimization, and cross-device compatibility.",
        icon: "fa-solid fa-bug-slash",
      },
      {
        id: "5",
        stepNumber: "05",
        title: "Deployment & Launch",
        description:
          "Setting up CI/CD pipelines, configuring servers, and ensuring a smooth go-live experience.",
        icon: "fa-solid fa-rocket",
      },
    ],
    isActive: initialData?.isActive ?? true,
  }));

  // Intersection Observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const steps = document.querySelectorAll(".workflow-step");
    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, [sectionData.steps]);

  const handleSave = (newData: WorkflowSectionData) => {
    setSectionData(newData);
  };

  if (!sectionData.isActive && !isAuthorized) return null;

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className={`section-spacing bg-[#0E1416] relative overflow-hidden ${!sectionData.isActive ? "opacity-60 grayscale-[0.5]" : ""}`}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-emerald-500/10 to-transparent" />

      {/* Admin Controls */}
      {isAuthorized && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-10 right-10 z-50 w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-2xl hover:bg-emerald-400 transition-all cursor-pointer border-2 border-white/10"
          title="Edit Section"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      )}

      {!sectionData.isActive && isAuthorized && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50 uppercase text-[9px] font-black tracking-widest px-4 py-1">
            Section Hidden
          </Badge>
        </div>
      )}

      <div className="main-container relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <i
              className={`${sectionData.badgeIcon} text-xs text-emerald-500`}
            ></i>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
              {sectionData.badge}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {sectionData.title}{" "}
            <span className="text-emerald-500">
              {sectionData.titleHighlight}
            </span>
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed">
            {sectionData.description}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 md:-translate-x-1/2 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500 w-full h-full -translate-y-full animate-[flow_3s_infinite_linear] opacity-50" />
          </div>

          <div className="space-y-12 md:space-y-24 relative">
            {sectionData.steps.map((step, index) => (
              <div
                key={step.id}
                className={`workflow-step opacity-0 translate-y-10 transition-all duration-1000 ease-out flex flex-col md:flex-row items-center gap-8 md:gap-0 relative`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Left Side */}
                <div className="flex-1 w-full md:w-1/2 md:px-12 flex justify-end">
                  {/* If index is even (0, 2, 4), Show Image (or Card if no image). If odd, Show Text. */}

                  {/* LOGIC: 
                      Even Index: Left = Image/Visual, Right = Text content
                      Odd Index: Left = Text content, Right = Image/Visual
                  */}

                  {index % 2 === 0 ? (
                    // Even Index LEFT SIDE -> Displays VISUAL (Icon/Image)
                    <div className="w-full relative group">
                      {step.image ? (
                        <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:border-emerald-500/50 transition-all duration-500 group-hover:-translate-y-2">
                          <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <img
                            src={step.image}
                            alt={step.title}
                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Floating Icon */}
                          <div className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-xl bg-black/80 backdrop-blur-md flex items-center justify-center text-emerald-500 border border-emerald-500/30 shadow-lg">
                            <i className={`${step.icon} text-xl`}></i>
                          </div>
                        </div>
                      ) : (
                        // No Image Fallback - Big Icon Card
                        <div className="h-64 rounded-2xl bg-[#121A1C] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-500/30 transition-all duration-500">
                          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500" />
                          <i
                            className={`${step.icon} text-8xl text-emerald-500/10 group-hover:text-emerald-500/20 transition-all duration-500 transform group-hover:scale-110`}
                          ></i>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                              <i className={`${step.icon} text-3xl`}></i>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Odd Index LEFT SIDE -> Displays CONTENT
                    <div className="w-full text-right">
                      <span className="text-6xl font-black text-white/5 block mb-2 -mr-1">
                        {step.stepNumber}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Center Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center z-10 hidden md:flex">
                  <div className="w-4 h-4 rounded-full bg-[#0E1416] border-[3px] border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] relative z-10">
                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-white/5 bg-[#0E1416] -z-10 scale-0 transition-transform duration-500 group-hover:scale-100" />
                </div>

                {/* Right Side */}
                <div className="flex-1 w-full md:w-1/2 md:px-12">
                  {index % 2 !== 0 ? (
                    // Odd Index RIGHT SIDE -> Displays VISUAL
                    <div className="w-full relative group">
                      {step.image ? (
                        <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:border-emerald-500/50 transition-all duration-500 group-hover:-translate-y-2">
                          <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <img
                            src={step.image}
                            alt={step.title}
                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Floating Icon */}
                          <div className="absolute bottom-4 left-4 z-20 w-12 h-12 rounded-xl bg-black/80 backdrop-blur-md flex items-center justify-center text-emerald-500 border border-emerald-500/30 shadow-lg">
                            <i className={`${step.icon} text-xl`}></i>
                          </div>
                        </div>
                      ) : (
                        // No Image Fallback - Big Icon Card
                        <div className="h-64 rounded-2xl bg-[#121A1C] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-emerald-500/30 transition-all duration-500">
                          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500" />
                          <i
                            className={`${step.icon} text-8xl text-emerald-500/10 group-hover:text-emerald-500/20 transition-all duration-500 transform group-hover:scale-110`}
                          ></i>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                              <i className={`${step.icon} text-3xl`}></i>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Even Index RIGHT SIDE -> Displays CONTENT
                    <div className="w-full text-left">
                      <span className="text-6xl font-black text-white/5 block mb-2 -ml-1">
                        {step.stepNumber}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WorkflowSectionEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={sectionData}
        onSave={handleSave}
      />

      <style jsx>{`
        @keyframes flow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default WorkflowSection;

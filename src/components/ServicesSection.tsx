"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useIsAuthorized } from "@/lib/auth";
import { ServicesSectionData } from "@/types/service";
import { ServicesSectionEditModal } from "./modals/ServicesSectionEditModal";

interface ServicesSectionProps {
  initialData?: ServicesSectionData | null;
}

const ServicesSection = ({ initialData }: ServicesSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultData: ServicesSectionData = {
    badge: "What I Do",
    title: "Services I",
    titleHighlight: "Provide",
    services: [
      {
        id: "1",
        title: "Web Development",
        description:
          "Building responsive, high-performance web applications using modern frameworks and best practices.",
        icon: "fa-solid fa-code",
        features: [
          "React & Next.js",
          "State Management",
          "Performance Optimization",
        ],
      },
      {
        id: "2",
        title: "Backend Solutions",
        description:
          "Designing scalable server-side architectures and robust APIs to power your digital products.",
        icon: "fa-solid fa-server",
        features: ["Node.js & Express", "Database Design", "Cloud Integration"],
      },
      {
        id: "3",
        title: "UI/UX Design",
        description:
          "Creating intuitive and visually stunning user interfaces with a focus on user experience and accessibility.",
        icon: "fa-solid fa-pen-nib",
        features: [
          "Modern UI Kits",
          "User Flow Design",
          "Interactive Prototypes",
        ],
      },
    ],
  };

  const [servicesData, setServicesData] = useState<ServicesSectionData>(() => ({
    ...(initialData || defaultData),
    isActive: initialData?.isActive ?? true,
    slNumber: initialData?.slNumber ?? 0,
  }));

  const handleSave = (newData: ServicesSectionData) => {
    setServicesData(newData);
    setIsModalOpen(false);
  };

  if (!servicesData.isActive && !isAuthorized) return null;

  return (
    <section
      id="services"
      className={`section-spacing bg-[#0E1416] relative overflow-hidden transition-all duration-300 ${!servicesData.isActive ? "opacity-50 grayscale hover:opacity-100 transition-opacity" : ""}`}
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] -z-10" />

      {isAuthorized && (
        <div className="absolute top-10 right-10 z-30 flex flex-col items-center gap-4">
          {!servicesData.isActive && (
            <div className="bg-red-500 text-[8px] font-black px-2 py-1 rounded uppercase tracking-[0.2em] shadow-lg animate-pulse whitespace-nowrap">
              Section Hidden from Public
            </div>
          )}
          <div className="group relative">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] p-0 shadow-2xl transition-all duration-500 cursor-pointer border-2 border-emerald-400/50 flex items-center justify-center"
              title="Edit Services"
            >
              <i className="fa-solid fa-pen-to-square text-lg transition-transform"></i>
            </Button>
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur group-hover:bg-emerald-500/30 transition-all duration-500 -z-10" />
          </div>
        </div>
      )}

      <div className="main-container">
        <div className="text-center mb-10 md:mb-16">
          <h5 className="mb-4">{servicesData.badge}</h5>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            {servicesData.title}{" "}
            <span className="text-emerald-500">
              {servicesData.titleHighlight}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.services.map((service) => (
            <div
              key={service.id}
              className="group relative p-5 sm:p-8 rounded-xl bg-[#121A1C] border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 shadow-2xl hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 sm:mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-[#0E1416] transition-all duration-500 shadow-lg shadow-emerald-500/5">
                  <i className={`${service.icon} text-xl sm:text-2xl`}></i>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 transition-colors group-hover:text-emerald-400">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>

                {service.features && (
                  <ul className="space-y-3 pt-6 border-t border-emerald-500/15">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ServicesSectionEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentData={servicesData}
          onSave={handleSave}
        />
      )}
    </section>
  );
};

export default ServicesSection;

"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface FaqSectionData {
  title?: string;
  subtitle?: string;
  description?: string;
  isActive?: boolean;
  faqs?: FaqItem[];
}

interface FaqSectionProps {
  initialData?: FaqSectionData;
}

const defaultFaqs: FaqItem[] = [
  {
    id: 1,
    question: "How long does it take to complete a project?",
    answer:
      "The timeline depends on the project's complexity. A simple website might take 1-2 weeks, while a complex web application can take 4-8 weeks. I always prioritize quality and transparency.",
  },
  {
    id: 2,
    question: "Do you offer post-launch support?",
    answer:
      "Yes, I provide 1-3 months of free maintenance and support after launch to ensure everything runs smoothly. Long-term support options are also available.",
  },
  {
    id: 3,
    question: "Which technologies do you specialize in?",
    answer:
      "I specialize in the MERN stack (MongoDB, Express, React, Node.js), Next.js, TypeScript, and modern styling tools like Tailwind CSS. I'm also experienced in mobile app development using React Native.",
  },
  {
    id: 4,
    question: "Can you redesign an existing website?",
    answer:
      "Absolutely! I can give your old website a fresh, modern look while improving its performance and responsiveness for all devices.",
  },
];

const FaqSection: React.FC<FaqSectionProps> = ({ initialData }) => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const sectionData = initialData || {
    title: "Common Questions",
    subtitle: "Frequently Asked Questions",
    description:
      "Find answers to some of the most common questions about my workflow, pricing, and services.",
  };

  return (
    <section
      id="faq"
      className="pb-12 md:pb-20 mt-5 md:mt-10 bg-[#121A1C] relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {sectionData.title}
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              {sectionData.description}
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {(sectionData.faqs || defaultFaqs).map((faq: FaqItem) => (
              <div
                key={faq.id}
                className={cn(
                  "border border-white/5 rounded-2xl transition-all duration-300 overflow-hidden",
                  openId === faq.id
                    ? "bg-white/5 border-white/10 ring-1 ring-white/10"
                    : "bg-white/2 hover:bg-white/4",
                )}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-4 py-4 md:px-6 md:py-5 flex items-center justify-between text-left transition-colors"
                >
                  <span
                    className={cn(
                      "text-base md:text-lg font-medium transition-colors",
                      openId === faq.id ? "text-cyan-400" : "text-white/80",
                    )}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300",
                      openId === faq.id
                        ? "bg-cyan-500/20 text-cyan-400 rotate-180"
                        : "bg-white/5 text-gray-500",
                    )}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <div
                  className={cn(
                    "px-4 md:px-6 overflow-hidden transition-all duration-300 ease-in-out",
                    openId === faq.id
                      ? "max-h-[500px] pb-5 md:pb-6 opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

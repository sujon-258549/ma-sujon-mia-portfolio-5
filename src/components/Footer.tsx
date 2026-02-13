"use client";

import { useState } from "react";
import { Heart, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useIsAuthorized } from "@/lib/auth";
import { FooterEditModal } from "./modals/FooterEditModal";
import { FooterData } from "@/types/footer";
import { dynamicContentService } from "@/services/dynamicContentService";
import { toast } from "sonner";

const Footer = () => {
  const isAuthorized = useIsAuthorized();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Dynamic Footer Data
  const [footerData, setFooterData] = useState<FooterData>({
    description:
      "Crafting digital experiences with clean code and modern design. Transforming ideas into reality through innovative web solutions.",
    logo: "https://i.ibb.co.com/r22rB4k4/logo.webp",
    contactTitle: "Get In Touch",
    contactTitleIcon: "fa-solid fa-paper-plane",
    linksTitle: "Quick Links",
    linksTitleIcon: "fa-solid fa-link",
    copyrightText: "Sujon.dev. All rights reserved.",
    craftedBy: "Crafted with",
    socialLinks: [
      {
        faIcon: "fa-brands fa-github",
        href: "https://github.com",
        label: "GitHub",
        color: "hover:bg-gray-700",
      },
      {
        faIcon: "fa-brands fa-linkedin-in",
        href: "https://linkedin.com",
        label: "LinkedIn",
        color: "hover:bg-blue-600",
      },
      {
        faIcon: "fa-brands fa-x-twitter",
        href: "https://twitter.com",
        label: "Twitter",
        color: "hover:bg-sky-500",
      },
      {
        faIcon: "fa-solid fa-envelope",
        href: "mailto:sujon258549@gmail.com",
        label: "Email",
        color: "hover:bg-emerald-600",
      },
    ],
    quickLinks: [
      { name: "About Me", href: "#about" },
      { name: "My Skills", href: "#skills" },
      { name: "Education", href: "#education" },
      { name: "Experience", href: "#experience" },
    ],
    contactItems: [
      {
        label: "Email",
        value: "sujon258549@gmail.com",
        icon: "fa-solid fa-envelope",
        href: "mailto:sujon258549@gmail.com",
      },
      {
        label: "Location",
        value: "Dhaka, Bangladesh",
        icon: "fa-solid fa-location-dot",
      },
    ],
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0E1416] border-t border-emerald-500/20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Admin Edit Button - Positioned to the top right of the footer section */}
      {isAuthorized && (
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="absolute top-8 right-8 w-11 h-11 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full shadow-lg shadow-emerald-500/5 backdrop-blur-md z-50 flex items-center justify-center transition-all cursor-pointer active:scale-95 group hover:bg-emerald-500 hover:text-[#0E1416]"
          title="Edit Footer Content"
        >
          <i className="fa-solid fa-pen-to-square text-lg group-hover:scale-110 transition-transform"></i>
        </button>
      )}

      <div className="main-container relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-6 lg:col-span-1">
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={footerData.logo}
                  alt="Sujon Logo"
                  width={200}
                  height={100}
                  className="w-[200px] h-[50px] object-contain"
                  unoptimized
                />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                {footerData.description}
              </p>
            </div>

            {/* Social Links */}
            <div>
              <div className="flex gap-3">
                {footerData.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-11 h-11 rounded-lg bg-card border border-emerald-500/20 flex items-center justify-center text-muted-foreground hover:text-white hover:border-emerald-500/50 transition-all cursor-pointer group ${social.color}`}
                  >
                    <i
                      className={`${social.faIcon} text-xl group-hover:scale-110 transition-transform`}
                    ></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-5 bg-emerald-500 rounded-full" />
              <i
                className={`${footerData.linksTitleIcon || "fa-solid fa-link"} text-emerald-500 text-xs`}
              ></i>
              {footerData.linksTitle || "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-emerald-500 transition-colors text-sm cursor-pointer flex items-center gap-2 group"
                  >
                    {link.icon ? (
                      <i
                        className={`${link.icon} text-[10px] text-emerald-500 group-hover:translate-x-1 transition-all`}
                      />
                    ) : (
                      <span className="w-0 h-0.5 bg-emerald-500 group-hover:w-4 transition-all" />
                    )}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-5 bg-emerald-500 rounded-full" />
              <i
                className={`${footerData.contactTitleIcon || "fa-solid fa-paper-plane"} text-emerald-500 text-xs`}
              ></i>
              {footerData.contactTitle || "Get In Touch"}
            </h4>
            <div className="space-y-4 text-sm">
              {footerData.contactItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-muted-foreground group"
                >
                  <i
                    className={`${item.icon || "fa-solid fa-circle-info"} w-5 text-emerald-500 group-hover:scale-110 transition-transform`}
                  ></i>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-emerald-500 transition-colors cursor-pointer"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-500/10" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left flex items-center gap-2 flex-wrap justify-center">
            <span>
              © {currentYear} {footerData.copyrightText}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              {footerData.craftedBy}{" "}
              <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500 animate-pulse" />
            </span>
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="#"
              className="hover:text-emerald-500 transition-colors cursor-pointer"
            >
              Privacy
            </a>
            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
            <a
              href="#"
              className="hover:text-emerald-500 transition-colors cursor-pointer"
            >
              Terms
            </a>
            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
            <a
              href="#"
              className="hover:text-emerald-500 transition-colors cursor-pointer"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all cursor-pointer z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>

      {/* Edit Modal */}
      <FooterEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentData={footerData}
        onSave={(newData) => {
          setFooterData(newData);
          toast.success("Footer updated locally!");
        }}
      />
    </footer>
  );
};

export default Footer;

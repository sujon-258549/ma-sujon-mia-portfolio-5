"use client";

import { useState, useEffect } from "react";
import { dynamicContentService } from "@/services/dynamicContentService";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeaderData } from "@/types/header";
import { HeaderEditModal } from "./modals/HeaderEditModal";
import { useAuth, useIsAuthorized } from "@/lib/auth";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isAuthorized = useIsAuthorized();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [headerData, setHeaderData] = useState<HeaderData>({
    logo: "https://i.ibb.co.com/r22rB4k4/logo.webp",
    logoAlt: "Sujon Logo",
    logoWidth: 200,
    logoHeight: 50,
    navLinks: [
      { text: "About", link: "#about" },
      { text: "Skills", link: "#skills" },
      { text: "Education", link: "#education" },
      { text: "Experience", link: "#experience" },
      { text: "Projects", link: "#projects" },
      { text: "Contact", link: "#contact" },
    ],
    buttons: {
      primary: {
        text: "Hire Me",
        link: "#contact",
        icon: "fa-solid fa-paper-plane",
      },
      secondary: {
        text: "Resume",
        link: "/resume.pdf",
        icon: "fa-solid fa-download",
      },
    },
  });

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await dynamicContentService.getContent("header");
        if (data) {
          setHeaderData((prev) => ({
            ...prev, // Keep current state as baseline
            ...data,
            navLinks: data.navLinks || prev.navLinks || [],
          }));
        }
      } catch (error) {
        console.error("Failed to fetch header data:", error);
      }
    };
    fetchHeaderData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "skills",
        "education",
        "experience",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSave = (newData: HeaderData) => {
    setHeaderData(newData);
    console.log("Saved Header Data:", newData);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="main-container px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Image
              src={headerData.logo || "/logo.png"}
              alt={headerData.logoAlt}
              width={headerData.logoWidth}
              height={headerData.logoHeight}
              style={{
                width: `${headerData.logoWidth}px`,
                height: `${headerData.logoHeight}px`,
              }}
              className="object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {(headerData.navLinks || []).map((item) => (
              <a
                key={item.text}
                href={item.link}
                className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                  activeSection === item.text.toLowerCase()
                    ? "text-emerald-500"
                    : "text-muted-foreground"
                }`}
              >
                {item.text}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Admin Edit Button */}
            {isAuthorized && (
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="h-10 w-10 p-0 bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-all cursor-pointer"
                title="Edit Header"
              >
                <i className="fa-solid fa-pen-to-square text-sm"></i>
              </Button>
            )}

            {/* Logout Button */}
            {user && (
              <Button
                onClick={logout}
                variant="outline"
                className="h-10 px-4 bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all cursor-pointer"
                title="Logout"
              >
                <i className="fa-solid fa-right-from-bracket mr-2"></i>
                Logout
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() =>
                (window.location.href = headerData.buttons.secondary.link)
              }
              className="h-10 px-8 bg-white/5 border border-white/10 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 font-medium rounded-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {headerData.buttons.secondary.text}
              <i className={`${headerData.buttons.secondary.icon} ml-2`}></i>
            </Button>

            <Button
              className="h-10 px-8 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              onClick={() =>
                (window.location.href = headerData.buttons.primary.link)
              }
            >
              {headerData.buttons.primary.text}
              <i className={`${headerData.buttons.primary.icon} ml-2`}></i>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-emerald-400 transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark text-xl"></i>
            ) : (
              <i className="fa-solid fa-bars text-xl"></i>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1C2629] border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 shadow-xl">
          {(headerData.navLinks || []).map((item) => (
            <a
              key={item.text}
              href={item.link}
              className={`text-lg font-medium py-2 transition-colors ${
                activeSection === item.text.toLowerCase()
                  ? "text-emerald-500"
                  : "text-foreground hover:text-emerald-400"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.text}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            {/* Mobile Logout Button */}
            {user && (
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
                variant="outline"
                className="w-full h-10 bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white font-medium rounded-lg transition-all active:scale-95 cursor-pointer"
              >
                <i className="fa-solid fa-right-from-bracket mr-2"></i>
                Logout
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => {
                setIsMenuOpen(false);
                window.location.href = headerData.buttons.secondary.link;
              }}
              className="w-full h-10 bg-white/5 border border-white/10 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 font-medium rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              {headerData.buttons.secondary.text}
              <i className={`${headerData.buttons.secondary.icon} ml-2`}></i>
            </Button>
            <Button
              className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                window.location.href = headerData.buttons.primary.link;
              }}
            >
              {headerData.buttons.primary.text}
              <i className={`${headerData.buttons.primary.icon} ml-2`}></i>
            </Button>
          </div>
        </div>
      )}

      <HeaderEditModal
        key={isModalOpen ? "header-open" : "header-closed"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={headerData}
        onSave={handleSave}
      />
    </nav>
  );
};

export default Header;

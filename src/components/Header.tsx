"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { HeaderData } from "@/types/header";
import { HeaderEditModal } from "./modals/HeaderEditModal";
import { useAuth, useIsAuthorized } from "@/lib/auth";
import { UserDropdown } from "./UserDropdown";
import { FloatingNav } from "./FloatingNav";

interface HeaderProps {
  initialData?: HeaderData | null;
}

const Header = ({ initialData }: HeaderProps) => {
  const { user, token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isAuthorized = useIsAuthorized();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultData: HeaderData = {
    logo: "https://i.ibb.co.com/r22rB4k4/logo.webp",
    logoAlt: "Sujon Logo",
    logoWidth: 200,
    logoHeight: 50,
    navLinks: [
      { text: "About", link: "#about", icon: "fa-solid fa-user" },
      { text: "Skills", link: "#skills", icon: "fa-solid fa-code" },
      {
        text: "Education",
        link: "#education",
        icon: "fa-solid fa-graduation-cap",
      },
      {
        text: "Experience",
        link: "#experience",
        icon: "fa-solid fa-briefcase",
      },
      { text: "Projects", link: "#projects", icon: "fa-solid fa-folder-open" },
      { text: "Contact", link: "#contact", icon: "fa-solid fa-paper-plane" },
      { text: "Chronicles", link: "#blog", icon: "fa-solid fa-book-open" },
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
  };

  const [headerData, setHeaderData] = useState<HeaderData>(() => ({
    ...(initialData || defaultData),
    isActive: initialData?.isActive ?? true,
    isSideOpen: initialData?.isSideOpen ?? true,
    navLinks: (initialData?.navLinks || defaultData.navLinks).map(
      (link, idx) => ({
        ...link,
        icon:
          link.icon || defaultData.navLinks[idx]?.icon || "fa-solid fa-circle",
      }),
    ),
  }));

  useEffect(() => {
    const handleScroll = () => {
      const sections = headerData.navLinks.map((l) => l.link.replace("#", ""));
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
  }, [headerData.navLinks]);

  const handleSave = (newData: HeaderData) => {
    setHeaderData(newData);
    console.log("Saved Header Data:", newData);
  };

  return (
    <>
      <FloatingNav
        navLinks={headerData.navLinks}
        isSideOpen={headerData.isSideOpen}
        isAuthorized={isAuthorized}
      />

      {(headerData.isActive || isAuthorized) && (
        <nav
          className={`fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 ${!headerData.isActive ? "opacity-50 grayscale hover:opacity-100 transition-opacity" : ""}`}
        >
          <div className="main-container py-4 relative">
            {!headerData.isActive && isAuthorized && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-red-500 text-[8px] font-black px-2 py-0.5 rounded-b uppercase tracking-widest leading-none pointer-events-none">
                Header Hidden from Public
              </div>
            )}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative group/logo">
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
                  <div className="absolute inset-0 bg-emerald-500/0 group-hover/logo:bg-emerald-500/5 transition-colors rounded-lg" />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {(headerData.navLinks || [])
                  .filter((item) => item.showInHeader !== false)
                  .map((item) => (
                    <Link
                      key={item.text}
                      href={item.link}
                      className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                        activeSection === item.link.replace("#", "")
                          ? "text-emerald-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.text}
                    </Link>
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

                {/* User Dropdown (replaces Logout) */}
                {(user || token) && <UserDropdown />}

                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = headerData.buttons.secondary.link)
                  }
                  className="h-10 px-8 bg-white/5 border border-emerald-500/15 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 font-medium rounded-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {headerData.buttons.secondary.text}
                  <i
                    className={`${headerData.buttons.secondary.icon} ml-2`}
                  ></i>
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
            <div className="md:hidden absolute top-full left-0 w-full bg-[#1C2629] border-b border-emerald-500/15 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 shadow-xl">
              {(headerData.navLinks || [])
                .filter((item) => item.showInHeader !== false)
                .map((item) => (
                  <Link
                    key={item.text}
                    href={item.link}
                    className={`text-lg font-medium py-2 transition-colors ${
                      activeSection === item.link.replace("#", "")
                        ? "text-emerald-500"
                        : "text-foreground hover:text-emerald-400"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-emerald-500/15">
                {/* Mobile User Options */}
                {(user || token) && (
                  <>
                    <div className="py-2 px-1 border-b border-emerald-500/15 mb-2">
                      <p className="text-sm font-bold text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-400">{user?.email}</p>
                    </div>
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
                  </>
                )}

                <Button
                  variant="outline"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = headerData.buttons.secondary.link;
                  }}
                  className="w-full h-10 bg-white/5 border border-emerald-500/15 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 font-medium rounded-lg transition-all active:scale-95 cursor-pointer"
                >
                  {headerData.buttons.secondary.text}
                  <i
                    className={`${headerData.buttons.secondary.icon} ml-2`}
                  ></i>
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
        </nav>
      )}

      <HeaderEditModal
        key={isModalOpen ? "header-open" : "header-closed"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={headerData}
        onSave={handleSave}
      />
    </>
  );
};

export default Header;

"use client";

import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (windowHeight === 0) return;

      const progress = totalScroll / windowHeight;

      if (totalScroll > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const circumference = 301.59; // 2 * PI * 48

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[999] transition-all duration-300 transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      } bg-background rounded-full shadow-lg border border-border group`}
      aria-label="Scroll to top"
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        {/* Progress Circle SVG */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 transform"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted/20"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-cyan-500 transition-all duration-100 ease-out"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - scrollProgress * circumference}
            strokeLinecap="round"
          />
        </svg>

        {/* Arrow Icon */}
        {/* <ArrowUp className="w-5 h-5 text-cyan-500 group-hover:animate-bounce z-50!" /> */}
      </div>
    </button>
  );
};

export default ScrollToTop;

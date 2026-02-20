"use client";

import Link from "next/link";
import React from "react";
import { Github, ExternalLink, Activity } from "lucide-react";

const GithubStatsSection = () => {
  const username = "sujon-258549";
  // Emerald Theme Colors
  const theme = {
    title: "10b981", // emerald-500
    icon: "10b981",
    text: "94a3b8", // slate-400
    bg: "121A1C", // Your background
    border: "1e293b", // slate-800
  };

  const statCards = [
    {
      // Added count_private=true and include_all_commits=true
      url: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&count_private=true&include_all_commits=true&title_color=${theme.title}&icon_color=${theme.icon}&text_color=${theme.text}&bg_color=${theme.bg}&border_color=${theme.border}&hide_border=false`,
      alt: "GitHub Stats",
    },
    {
      url: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&title_color=${theme.title}&icon_color=${theme.icon}&text_color=${theme.text}&bg_color=${theme.bg}&border_color=${theme.border}&hide_border=false`,
      alt: "Top Languages",
    },
    {
      url: `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&fire=${theme.title}&currStreakLabel=${theme.title}&sideNums=${theme.text}&sideLabels=${theme.text}&dates=${theme.text}&background=${theme.bg}&border=${theme.border}&hide_border=false`,
      alt: "GitHub Streak",
    },
  ];

  return (
    <section
      id="github"
      className="py-20 bg-[#121A1C] relative overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <Activity className="w-3.5 h-3.5" />
                <span>Open Source Contribution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                My <span className="text-emerald-500">GitHub</span> Activity
              </h2>
              <p className="text-slate-400">
                Exploring my coding habits and open-source contributions.
              </p>
            </div>

            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-emerald-500/15 text-white font-medium hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all active:scale-95 group"
            >
              <Github className="w-5 h-5" />
              <span>@{username}</span>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
            </Link>
          </div>

          {/* Contribution Graph */}
          <div className="mb-10 p-6 rounded-2xl bg-white/2 border border-emerald-500/15 hover:border-emerald-500/20 transition-all group">
            <h3 className="text-white font-medium mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Contributions Calendar
            </h3>
            <div className="overflow-x-auto overflow-y-hidden">
              <img
                src={`https://ghchart.rshah.org/10b981/${username}`}
                alt="GitHub Contribution Graph"
                className="min-w-[800px] md:w-full grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-700"
              />
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((card, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden bg-white/2 border border-emerald-500/15 hover:border-emerald-500/20 transition-all p-2 flex justify-center items-center h-full"
              >
                <img
                  src={card.url}
                  alt={card.alt}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubStatsSection;

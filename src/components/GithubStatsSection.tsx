"use client";

import { GitHubCalendar } from "react-github-calendar";
import Link from "next/link";

const GithubStatsSection = () => {
  // TODO: Replace with your actual GitHub username.
  // Based on your email 'sujon258549@gmail.com', this is likely your username.
  const username = "sujon-258549";

  return (
    <section className="py-12 bg-[#0d1117] flex justify-center text-slate-300 font-sans">
      <div className="w-full max-w-[896px] px-4 space-y-4">
        {/* Header */}
        <div className="flex items-end justify-between px-1">
          <h2 className="text-base font-normal">
            <span className="mr-2">Contribution Activity</span>
          </h2>
          <Link
            href={`https://github.com/${username}`}
            target="_blank"
            className="text-xs text-[#58a6ff] hover:underline mb-0.5"
          >
            Visit Profile
          </Link>
        </div>

        {/* Calendar - Using Package */}
        <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] shadow-sm flex justify-center overflow-auto">
          <GitHubCalendar
            username={username}
            colorScheme="dark"
            fontSize={12}
            blockSize={10}
            blockMargin={4}
            style={{
              color: "#c9d1d9",
            }}
            theme={{
              dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            }}
          />
        </div>

        {/* Stats & Languages - Using Image Cards (Best for this visual style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-[#30363d] rounded-md bg-[#0d1117] p-4 flex justify-center items-center h-44 hover:border-[#58a6ff]/50 transition-colors">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&bg_color=0d1117&hide_border=true&count_private=true&title_color=58a6ff&icon_color=58a6ff&text_color=c9d1d9`}
              alt="GitHub Stats"
              className="h-full object-contain"
            />
          </div>
          <div className="border border-[#30363d] rounded-md bg-[#0d1117] p-4 flex justify-center items-center h-44 hover:border-[#58a6ff]/50 transition-colors">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&bg_color=0d1117&hide_border=true&title_color=58a6ff&text_color=c9d1d9`}
              alt="Top Languages"
              className="h-full object-contain"
            />
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-[#8b949e]">
            * If stats are not showing, please verify the username
            <span className="font-mono bg-[#23292e] px-1 rounded ml-1 text-[#c9d1d9]">
              {username}
            </span>
            is correct in{" "}
            <span className="text-[#58a6ff]">
              src/components/GithubStatsSection.tsx
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GithubStatsSection;

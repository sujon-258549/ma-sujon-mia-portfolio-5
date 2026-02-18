import Link from "next/link";
import React from "react";

const GithubStatsSection = () => {
  const username = "sujon-258549";

  return (
    <section className="py-12 bg-[#0d1117] flex justify-center text-[#c9d1d9] font-sans">
      <div className="w-full max-w-[1080px] px-4 space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between px-1 border-b border-[#30363d] pb-4">
          <h2 className="text-xl font-semibold text-white">
            GitHub Contributions
          </h2>
          <Link
            href={`https://github.com/${username}`}
            target="_blank"
            className="text-sm text-[#58a6ff] hover:underline mb-1"
          >
            @sujon-258549
          </Link>
        </div>

        {/* Calendar Image */}
        <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex justify-center overflow-x-auto">
          <img
            src={`https://ghchart.rshah.org/40c463/${username}`}
            alt="GitHub Contribution Graph"
            className="min-w-[700px] md:w-full"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-[#30363d] rounded-md bg-[#0d1117] p-4 flex justify-center items-center hover:border-[#8b949e] transition-colors">
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=github_dark`}
              alt="GitHub Stats"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="border border-[#30363d] rounded-md bg-[#0d1117] p-4 flex justify-center items-center hover:border-[#8b949e] transition-colors">
            <img
              src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=github_dark`}
              alt="Top Languages"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubStatsSection;

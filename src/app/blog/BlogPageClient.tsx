"use client";

import { useState } from "react";
import { CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { BlogPost, BlogSectionData } from "@/types/blog";
import { useIsAuthorized } from "@/lib/auth";
import {
  Clock,
  ArrowRight,
  Search,
  User,
  SlidersHorizontal,
} from "lucide-react";

interface BlogPageClientProps {
  blogs: BlogPost[];
  initialData?: BlogSectionData | null;
}

export default function BlogPageClient({
  blogs,
  initialData,
}: BlogPageClientProps) {
  const isAuthorized = useIsAuthorized();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  const filteredBlogs = blogs.filter((blog) => {
    // Basic Active Filter
    if (!isAuthorized && blog.isActive === false) return false;

    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const [visibleCount, setVisibleCount] = useState(6);

  const postsToShow = filteredBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBlogs.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <main className="pt-40 pb-32 bg-[#0E1416]">
      <div className="main-container">
        {/* Elegant Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
                {initialData?.badge || "Exploration"}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              {initialData?.title || "Project"}{" "}
              <span className="text-emerald-500">
                {initialData?.titleHighlight || "Notebook"}
              </span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed max-w-xl">
              {initialData?.description ||
                "A collection of deep dives into modern technology, architectural designs, and the future of web development."}
            </p>
          </div>

          <div className="bg-[#172023] p-1.5 rounded-lg border border-white/3 flex items-center shadow-2xl">
            <div className="flex items-center px-4 py-3 gap-3 border-r border-white/5">
              <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Filters
              </span>
            </div>
            <div className="flex gap-1 pl-1.5 overflow-x-auto scrollbar-hide py-1 pr-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setVisibleCount(6); // Reset count on filter change
                  }}
                  className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-emerald-500 text-black shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Search Area */}
        <div className="relative w-full mb-16 group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-600 group-hover:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search through the journal..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(6); // Reset count on search
            }}
            className="w-full bg-[#172023] border border-white/3 rounded-lg py-8 pl-18 pr-12 text-white text-lg placeholder:text-slate-600 focus:outline-hidden focus:border-emerald-500/30 transition-all focus:bg-[#1C2629] shadow-inner"
          />
        </div>

        {/* Refined Blog Grid */}
        {postsToShow.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {postsToShow.map((post) => (
                <div
                  key={post.id || post._id}
                  className={`group bg-[#172023] rounded-lg overflow-hidden border transition-all duration-700 flex flex-col hover:shadow-3xl hover:shadow-black/60 translate-y-0 hover:-translate-y-4 relative ${post.isActive === false ? "border-dashed border-red-500/30" : "border-white/3 hover:border-emerald-500/20"}`}
                >
                  {post.isActive === false && isAuthorized && (
                    <div className="absolute top-4 left-4 z-40">
                      <Badge className="bg-black/60 backdrop-blur-md text-slate-500 border-white/10 uppercase text-[8px] font-black tracking-widest">
                        Draft Archive
                      </Badge>
                    </div>
                  )}

                  {/* Image Area */}
                  <div className="relative h-72 overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                      unoptimized
                    />
                    {/* Date Overlay */}
                    <div className="absolute top-8 right-8 z-20">
                      <div className="bg-emerald-500 text-black w-14 h-16 rounded-lg flex flex-col items-center justify-center shadow-2xl">
                        <span className="text-xl font-black leading-none">
                          {post.date.split(" ").length > 1
                            ? post.date.split(" ")[0]
                            : "15"}
                        </span>
                        <span className="text-[10px] uppercase font-black tracking-tighter">
                          {post.date.split(" ").length > 1
                            ? post.date.split(" ")[1]
                            : "FEB"}
                        </span>
                      </div>
                    </div>
                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#172023] via-transparent to-transparent opacity-90" />
                  </div>

                  {/* Content Area */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <Badge className="bg-emerald-500 text-black border-none uppercase text-[9px] font-black tracking-widest px-4 py-1.5 rounded-full">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-4 h-4 text-emerald-500/70" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-[1.3] group-hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    <CardDescription className="text-slate-400 text-base leading-relaxed line-clamp-3 mb-8 flex-1">
                      {post.excerpt}
                    </CardDescription>

                    {/* Minimalist Action Bar */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-emerald-500/60 border border-white/5">
                          <User className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Master Author
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-3 text-white hover:text-emerald-500 transition-all font-black whitespace-nowrap"
                      >
                        <span className="text-[10px] uppercase tracking-[0.2em]">
                          Read More
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all border border-white/10 group-hover:border-emerald-500 shadow-xl">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button Area */}
            {hasMore && (
              <div className="mt-20 flex justify-center">
                <button
                  onClick={handleShowMore}
                  className="group relative flex items-center gap-4 px-14 py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.3em] overflow-hidden rounded-lg transition-all hover:bg-emerald-500 shadow-2xl hover:shadow-emerald-500/20 active:scale-95"
                >
                  <span className="relative z-10">Load More Chronicles</span>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  {/* Glossy Effect */}
                  <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-1000" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 bg-[#172023] rounded-lg border border-white/3 shadow-inner">
            <div className="w-24 h-24 bg-emerald-500/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/10">
              <Search className="w-10 h-10 text-emerald-500/20" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Chronicle Not Found
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto text-lg leading-relaxed">
              The search query returned no matching articles in our database.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

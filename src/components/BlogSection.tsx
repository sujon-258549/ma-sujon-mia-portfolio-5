"use client";

import { useState } from "react";
import { CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { BlogPost, BlogSectionData } from "@/types/blog";
import { Clock, ArrowRight, User, Plus, Edit3, Settings2 } from "lucide-react";
import { useIsAuthorized } from "@/lib/auth";
import { BlogSectionHeaderEditModal } from "./modals/BlogSectionHeaderEditModal";
import { BlogPostEditModal } from "./modals/BlogPostEditModal";

interface BlogSectionProps {
  initialData?: BlogSectionData | null;
}

const BlogSection = ({ initialData }: BlogSectionProps) => {
  const isAuthorized = useIsAuthorized();
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const defaultPosts: BlogPost[] = [
    {
      id: "1",
      _id: "1",
      title: "Mastering Next.js 14 Server Components",
      excerpt:
        "Deep dive into the new era of React with Server Components and how they change the way we think about data fetching.",
      date: "15 Feb",
      image:
        "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1000&auto=format&fit=crop",
      category: "Development",
      readTime: "8 min",
      slug: "mastering-nextjs-14",
      isActive: true,
    },
    {
      id: "2",
      _id: "2",
      title: "The Future of AI in Modern Web Apps",
      excerpt:
        "Exploring how integrated AI models are transforming user experiences from simple chatbots to complex generative interfaces.",
      date: "10 Feb",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      readTime: "12 min",
      slug: "future-of-ai-web",
      isActive: true,
    },
    {
      id: "3",
      _id: "3",
      title: "Building Scalable Design Systems",
      excerpt:
        "Learn the secrets behind creating consistent and maintainable design systems that grow with your application.",
      date: "05 Feb",
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563de4c?q=80&w=1000&auto=format&fit=crop",
      category: "Design",
      readTime: "10 min",
      slug: "scalable-design-systems",
      isActive: true,
    },
    {
      id: "4",
      _id: "4",
      title: "React 19: What to Expect Next",
      excerpt:
        "An overview of the upcoming features in React 19, including the React Compiler and new hook improvements.",
      date: "28 Jan",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
      category: "Frontend",
      readTime: "15 min",
      slug: "react-19-preview",
      isActive: true,
    },
    {
      id: "5",
      _id: "5",
      title: "Modern Backend Architecture",
      excerpt:
        "Exploring the shift from monoliths to microservices and how serverless is changing the backend landscape.",
      date: "20 Jan",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1000&auto=format&fit=crop",
      category: "Backend",
      readTime: "18 min",
      slug: "modern-backend-architecture",
      isActive: true,
    },
    {
      id: "6",
      _id: "6",
      title: "Optimizing Web Performance",
      excerpt:
        "A comprehensive guide on how to achieve 100 on Lighthouse and deliver snappy user experiences.",
      date: "12 Jan",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      category: "Performance",
      readTime: "20 min",
      slug: "web-performance-optimization",
      isActive: true,
    },
  ];

  const [sectionData, setSectionData] = useState<BlogSectionData>(() => ({
    badge: initialData?.badge || "Journal & Insights",
    badgeIcon: initialData?.badgeIcon || "fa-solid fa-feather-pointed",
    title: initialData?.title || "Digital",
    titleHighlight: initialData?.titleHighlight || "Chronicles",
    description:
      initialData?.description ||
      "Exploring the intersection of complex code, high-end design, and digital innovation through technical narratives.",
    posts: initialData?.posts || defaultPosts,
    isActive: initialData?.isActive ?? true,
    type: initialData?.type || "blog_header",
  }));

  const [visibleCount, setVisibleCount] = useState(3);

  // Filter posts based on active status if not authorized
  const filteredPosts = isAuthorized
    ? sectionData.posts
    : sectionData.posts.filter((post) => post.isActive);

  const postsToShow = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleHideMore = () => {
    setVisibleCount((prev) => (prev > 3 ? prev - 3 : 3));
  };

  const openAddModal = () => {
    setEditingPost(null);
    setModalMode("add");
    setIsPostModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setModalMode("edit");
    setIsPostModalOpen(true);
  };

  const handleHeaderSave = (newData: BlogSectionData) => {
    setSectionData((prev) => ({ ...prev, ...newData }));
  };

  const handlePostSuccess = (
    post: BlogPost,
    mode: "add" | "edit" | "delete",
  ) => {
    if (mode === "add") {
      setSectionData((prev) => ({
        ...prev,
        posts: [post, ...prev.posts],
      }));
    } else if (mode === "edit") {
      setSectionData((prev) => ({
        ...prev,
        posts: prev.posts.map((p) =>
          p._id === post._id || p.id === post.id ? post : p,
        ),
      }));
    } else if (mode === "delete") {
      setSectionData((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p._id !== post._id && p.id !== post.id),
      }));
    }
  };

  // If section is inactive and not admin, hide entirely
  if (!sectionData.isActive && !isAuthorized) return null;

  return (
    <section
      id="blog"
      className={`section-spacing bg-[#121A1C] relative overflow-hidden ${!sectionData.isActive ? "opacity-60 grayscale-[0.5]" : ""}`}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {isAuthorized && (
        <div className="absolute top-10 right-10 z-50 flex gap-4">
          {/* Section Settings Toggle */}
          <button
            onClick={() => setIsHeaderModalOpen(true)}
            className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-2xl hover:bg-emerald-400 transition-all cursor-pointer border-2 border-white/10"
            title="Section Settings"
          >
            <Settings2 className="w-5 h-5" />
          </button>

          {/* Add Post Button */}
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-emerald-500 transition-all cursor-pointer border-2 border-white/10"
          >
            <Plus className="w-4 h-4" /> Add Chronicle
          </button>
        </div>
      )}

      {!sectionData.isActive && isAuthorized && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <Badge className="bg-red-500/20 text-red-500 border-red-500/50 uppercase text-[9px] font-black tracking-widest px-4 py-1">
            Section Hidden from Public
          </Badge>
        </div>
      )}

      <div className="main-container relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
              {sectionData.badge}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            {sectionData.title}{" "}
            <span className="text-emerald-500">
              {sectionData.titleHighlight}
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            {sectionData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsToShow.map((post) => (
            <div
              key={post.id || post._id}
              className={`group bg-[#172023] rounded-lg overflow-hidden border border-white/[0.03] hover:border-emerald-500/20 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-black/40 relative ${!post.isActive ? "border-dashed border-red-500/30" : ""}`}
            >
              {/* Image Area with Link */}
              <Link
                href={`/blog/${post.slug}`}
                className="block relative h-64 overflow-hidden rounded-t-lg"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  unoptimized
                />
                {/* Floating Date Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <div className="bg-emerald-500 text-black px-4 py-2 rounded-lg flex flex-col items-center shadow-xl">
                    <span className="text-lg font-black leading-none">
                      {post.date.split(" ")[0]}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-tighter">
                      {post.date.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#172023] via-transparent to-transparent opacity-80" />
              </Link>

              {isAuthorized && (
                <button
                  onClick={() => openEditModal(post)}
                  className="absolute top-4 right-4 z-40 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-500 hover:text-black cursor-pointer border border-white/10"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}

              {!post.isActive && isAuthorized && (
                <div className="absolute top-4 left-4 z-40">
                  <Badge className="bg-black/60 backdrop-blur-md text-slate-400 border-white/10 uppercase text-[8px] font-black tracking-widest">
                    Draft
                  </Badge>
                </div>
              )}

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none uppercase text-[9px] font-black tracking-widest px-3 py-1">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold text-white mb-3 leading-[1.3] group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                </Link>

                <CardDescription className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
                  {post.excerpt}
                </CardDescription>

                {/* Minimalist Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-emerald-500/50">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      Admin
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-2 text-white hover:text-emerald-500 transition-all group/read whitespace-nowrap"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Full Article
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/read:bg-emerald-500 group-hover/read:text-black transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(hasMore || visibleCount > 3) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
            {hasMore && (
              <button
                onClick={handleShowMore}
                className="group relative inline-flex items-center gap-4 px-12 py-4 bg-emerald-500 text-black font-black text-[11px] uppercase tracking-[0.2em] overflow-hidden rounded-xl transition-all hover:bg-emerald-400 shadow-2xl shadow-emerald-500/20 cursor-pointer active:scale-95 h-14"
              >
                <span>Show More Blog</span>
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                </div>
              </button>
            )}

            {visibleCount > 3 && (
              <button
                onClick={handleHideMore}
                className="group relative inline-flex items-center gap-4 px-12 py-4 bg-[#1A2426] text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] overflow-hidden rounded-xl transition-all hover:text-white border border-white/10 cursor-pointer active:scale-95 h-14"
              >
                <span>Hide More Blog</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-all group-hover:bg-white/10">
                  <ArrowRight className="w-4 h-4 rotate-270" />
                </div>
              </button>
            )}
          </div>
        )}
      </div>

      <BlogSectionHeaderEditModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        currentData={sectionData}
        onSave={handleHeaderSave}
      />

      <BlogPostEditModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        post={editingPost}
        mode={modalMode}
        onSuccess={handlePostSuccess}
      />
    </section>
  );
};

export default BlogSection;

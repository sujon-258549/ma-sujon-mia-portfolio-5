"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "next-share";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof slug !== "string") return;
      try {
        const data = await blogService.getPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0E1416] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0E1416] text-white">
        <Header />
        <main className="pt-40 pb-20 text-center">
          <h1 className="text-4xl font-bold mb-6 text-white">Post Not Found</h1>
          <p className="text-slate-400 mb-8">
            The article you are looking for does not exist.
          </p>
          <Link href="/">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-8 rounded-lg">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E1416] text-white">
      <Header />

      <main className="pt-32 pb-20">
        <article className="main-container max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mb-8 font-bold text-sm transition-colors group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </Link>

            <Badge className="bg-emerald-500 text-black border-none uppercase text-[10px] font-black tracking-widest px-4 py-1.5 mb-6 rounded-lg">
              {post.category}
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm border-b border-white/5 pb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-500" />
                <span className="font-bold uppercase tracking-widest text-[10px]">
                  Master Author
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <span className="font-bold uppercase tracking-widest text-[10px]">
                  {post.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span className="font-bold uppercase tracking-widest text-[10px]">
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Feature Image */}
          <div className="relative h-[400px] md:h-[600px] w-full mb-16 rounded-lg overflow-hidden border border-white/5">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Content Area */}
          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-xl text-slate-300 leading-relaxed mb-10 font-medium italic border-l-4 border-emerald-500 pl-6 py-2">
              {post.excerpt}
            </p>

            <div className="text-slate-300 leading-relaxed space-y-8 text-lg">
              {/* If we have detailed content, show it. Otherwise show placeholder. */}
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <h2 className="text-2xl font-bold text-white mt-12 mb-6">
                    Innovative Solutions for Modern Problems
                  </h2>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum. Sed
                    ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque
                    ipsa quae ab illo inventore veritatis et quasi architecto
                    beatae vitae dicta sunt explicabo.
                  </p>
                  <blockquote className="bg-[#121A1C] p-8 rounded-lg border border-emerald-500/20 my-10 relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-emerald-500/20 italic font-serif"></span>
                    <p className="text-white text-xl italic relative z-10 leading-relaxed">
                      Real software engineering is not just about writing code;
                      it,s about solving problems elegantly while maintaining a
                      vision for scalability and user experience.
                    </p>
                  </blockquote>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Footer of the article */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                Share This:
              </span>
              <div className="flex gap-2">
                <FacebookShareButton url={shareUrl} quote={post.title}>
                  <div className="w-10 h-10 rounded-lg bg-[#121A1C] border border-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all cursor-pointer">
                    <Facebook className="w-4 h-4" />
                  </div>
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={post.title}>
                  <div className="w-10 h-10 rounded-lg bg-[#121A1C] border border-white/5 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all cursor-pointer">
                    <Twitter className="w-4 h-4" />
                  </div>
                </TwitterShareButton>

                <LinkedinShareButton url={shareUrl}>
                  <div className="w-10 h-10 rounded-lg bg-[#121A1C] border border-white/5 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all cursor-pointer">
                    <Linkedin className="w-4 h-4" />
                  </div>
                </LinkedinShareButton>

                <WhatsappShareButton
                  url={shareUrl}
                  title={post.title}
                  separator=":: "
                >
                  <div className="w-10 h-10 rounded-lg bg-[#121A1C] border border-white/5 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all cursor-pointer">
                    <i className="fa-brands fa-whatsapp w-4 h-4 flex items-center justify-center" />
                  </div>
                </WhatsappShareButton>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    toast.success("Link copied to clipboard!");
                  }}
                  className="w-10 h-10 rounded-lg bg-[#121A1C] border border-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
                  title="Copy Link"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import NextImage from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { blogService } from "@/services/blogService";
import { toast } from "sonner";
import {
  Loader2,
  FilePlus,
  FileEdit,
  Trash2,
  Calendar,
  Clock,
  Tag,
  Link2,
} from "lucide-react";
import { BlogPost } from "@/types/blog";
import { revalidateData } from "@/app/actions";

interface BlogPostEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
  onSuccess: (post: BlogPost, mode: "add" | "edit" | "delete") => void;
  mode: "add" | "edit";
}

export const BlogPostEditModal = ({
  isOpen,
  onClose,
  post,
  onSuccess,
  mode,
}: BlogPostEditModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>(() => ({
    _id: post?._id,
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    date:
      post?.date ||
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    image: post?.image || "",
    category: post?.category || "Development",
    readTime: post?.readTime || "5 min",
    slug: post?.slug || "",
    isActive: post?.isActive ?? true,
    slNumber: post?.slNumber ?? 0,
  }));

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: mode === "add" ? generateSlug(newTitle) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("form data", formData);
      let result: BlogPost;
      if (mode === "edit" && post?._id) {
        result = await blogService.updateBlog(post._id, formData);
        toast.success("Blog post updated!");
      } else {
        console.log("blog data", formData);
        result = await blogService.createBlog(formData);
        toast.success("New chronicle published!");
      }
      await revalidateData("blogs");
      onSuccess(result, mode);
      onClose();
    } catch (error) {
      console.error("Failed to save blog post:", error);
      toast.error("Process failed. Please verify your data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post?._id) return;
    if (
      !confirm(
        "Are you certain you wish to erase this chronicle? This action is irreversible.",
      )
    )
      return;

    setIsLoading(true);
    try {
      await blogService.deleteBlog(post._id);
      toast.success("Chronicle erased from archives.");
      await revalidateData("blogs");
      onSuccess(post, "delete");
      onClose();
    } catch (error) {
      console.error("Delete failure:", error);
      toast.error("Extermination failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[850px] w-[95vw] h-[90vh] flex flex-col bg-[#0E1416] border-emerald-500/20 text-white p-0 overflow-hidden shadow-2xl focus:outline-none rounded-lg">
        <DialogHeader className="p-6 border-b border-emerald-500/10 bg-[#121A1C]/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="flex items-center justify-between w-full pr-8">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-emerald-500">
              {mode === "add" ? (
                <FilePlus className="w-6 h-6" />
              ) : (
                <FileEdit className="w-6 h-6" />
              )}
              {mode === "add" ? "Create New Chronicle" : "Edit Digital Record"}
            </DialogTitle>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-emerald-500/15">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                  className="data-[state=checked]:bg-emerald-500 scale-75"
                />
                <span
                  className={`text-[9px] font-black uppercase tracking-widest ${formData.isActive ? "text-emerald-500" : "text-slate-500"}`}
                >
                  {formData.isActive ? "Visible" : "Draft"}
                </span>
              </div>

              {mode === "edit" && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleDelete}
                  className="h-9 w-9 p-0 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-8 scrollbar-hide bg-[#0E1416]/50">
          <form
            id="blog-form"
            onSubmit={handleSubmit}
            className="py-10 space-y-10"
          >
            {/* Essential Info */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-8 space-y-8">
                <div className="space-y-3">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                    <Tag className="w-3 h-3" /> Chronicle Title
                  </Label>
                  <Input
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="bg-black/40 border-emerald-500/15 text-xl font-bold h-14 rounded-lg focus:ring-emerald-500/20"
                    placeholder="E.g. The Quantum Leap in React Architecture"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      <Link2 className="w-3 h-3 text-emerald-500" /> Digital
                      Slug
                    </Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="bg-black/40 border-emerald-500/15 font-mono text-xs h-12 text-slate-400"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      Category
                    </Label>
                    <Input
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="bg-black/40 border-emerald-500/15 text-emerald-500 font-bold h-12"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">
                    Summary / Excerpt
                  </Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    className="bg-black/40 border-emerald-500/15 min-h-[100px] rounded-lg text-slate-300 italic"
                    placeholder="A brief teaser to pull readers in..."
                  />
                </div>
              </div>

              <div className="md:col-span-4 space-y-8 bg-[#121A1C] p-6 rounded-lg border border-emerald-500/15">
                <div className="space-y-3">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Timestamp
                  </Label>
                  <Input
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="bg-white/5 border-none h-10 text-xs"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                    <Clock className="w-3 h-3 text-sky-400" /> Read Duration
                  </Label>
                  <Input
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: e.target.value })
                    }
                    className="bg-white/5 border-none h-10 text-xs text-sky-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                    Sorting Number (Serial)
                  </Label>
                  <Input
                    type="number"
                    value={formData.slNumber ?? 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slNumber: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-white/5 border-none h-10 text-xs text-emerald-500 font-mono"
                  />
                </div>

                <div className="space-y-3 pt-4 border-t border-emerald-500/15">
                  <Label className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">
                    Visual Archive URL
                  </Label>
                  <Input
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="bg-white/5 border-none h-10 text-xs text-emerald-500 font-mono"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {formData.image && (
                    <div className="mt-4 relative h-32 w-full rounded-lg overflow-hidden border border-emerald-500/15">
                      <NextImage
                        src={formData.image || ""}
                        className="object-cover w-full h-full opacity-60"
                        alt="Preview"
                        fill
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] text-emerald-500 uppercase font-black tracking-[0.3em]">
                  Full Narrative (HTML Supported)
                </Label>
                <div className="text-[9px] text-slate-500 italic">
                  Formatting tools coming soon
                </div>
              </div>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="bg-black/60 border-emerald-500/15 min-h-[400px] font-mono text-sm leading-relaxed text-slate-200 p-8 rounded-lg"
                placeholder="Once upon a pixel..."
              />
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-emerald-500/10 flex justify-end gap-4 bg-[#0E1416]">
          <Button
            variant="ghost"
            onClick={onClose}
            className="px-10 h-12 text-slate-400 hover:text-white font-bold cursor-pointer"
          >
            Discard
          </Button>
          <Button
            form="blog-form"
            type="submit"
            disabled={isLoading}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 h-12 rounded-lg font-black shadow-2xl shadow-emerald-500/20 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isLoading && <Loader2 className="animate-spin w-5 h-5 mr-3" />}
            {mode === "add" ? "Publish Chronicle" : "Save Digital Record"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

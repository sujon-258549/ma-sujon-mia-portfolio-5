import BlogPageClient from "./BlogPageClient";
import { blogService } from "@/services/blogService";
import { dynamicContentService } from "@/services/dynamicContentService";

export const metadata = {
  title: "Master Chronicles | Digital Journal",
  description:
    "Exploring the intersection of code, design, and innovation through technical narratives.",
};

export default async function BlogPage() {
  const [blogs, blogContent] = await Promise.all([
    blogService.getAllPosts().catch(() => []),
    dynamicContentService.getContent("blog").catch(() => null),
  ]);

  return <BlogPageClient blogs={blogs} initialData={blogContent} />;
}

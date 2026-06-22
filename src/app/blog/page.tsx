import { BlogClient } from "./blog-client";
import { client } from "@/sanity/client";
import { blogsQuery } from "@/sanity/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | Creating Lasting Social Impact",
  description: "Read our articles and step-by-step guides on creating lasting social impact, volunteering, animal rescue, and community building.",
  keywords: [
    "social impact blog",
    "volunteer guides",
    "community building articles",
    "animal welfare blog",
    "NGO updates Bangalore",
  ],
  alternates: {
    canonical: "/blog",
  },
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function BlogPage() {
  let blogsData = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const data = await client.fetch(blogsQuery);
      if (data && data.length > 0) {
        blogsData = data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity:", error);
  }

  return <BlogClient initialBlogs={blogsData || undefined} />;
}

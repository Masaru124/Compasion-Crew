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

export const revalidate = 60;

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "COMPASSION CREW — Social Impact Blog",
  "description": "Guides, insights, and real stories on social impact, volunteering, community building, and animal welfare in India.",
  "url": "https://www.compassioncrew.in/blog",
  "publisher": {
    "@type": "NGO",
    "name": "COMPASSION CREW",
    "url": "https://www.compassioncrew.in",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.compassioncrew.in/images/logo.png"
    }
  },
  "inLanguage": "en-IN"
};

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClient initialBlogs={blogsData || undefined} />
    </>
  );
}


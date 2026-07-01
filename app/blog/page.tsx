import { BlogClient } from "./blog-client";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | Creating Lasting Social Impact",
  description: "Read our articles and step-by-step guides on creating lasting social impact, volunteering, animal rescue, and community building.",
  keywords: [
    "social impact blog",
    "volunteer guides",
    "community building articles",
    "animal welfare blog",
    "social impact updates Bangalore",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Insights | Creating Lasting Social Impact | COMPASSION CREW",
    description: "Read our articles and step-by-step guides on creating lasting social impact, volunteering, animal rescue, and community building.",
    type: "website",
    url: "https://www.compassioncrew.in/blog",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "COMPASSION CREW Blog",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | Creating Lasting Social Impact | COMPASSION CREW",
    description: "Read our articles and step-by-step guides on creating lasting social impact, volunteering, animal rescue, and community building.",
    images: ["/images/og-image.jpg"],
  }
};

export const revalidate = 60;

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "COMPASSION CREW — Social Impact Blog",
  "description": "Guides, insights, and real stories on social impact, volunteering, community building, and animal welfare in India.",
  "url": "https://www.compassioncrew.in/blog",
  "publisher": {
    "@type": "Organization",
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
    const list = await db.select().from(blogs).orderBy(desc(blogs.publishedAt));
    if (list && list.length > 0) {
      blogsData = list.map((b) => ({
        ...b,
        _id: b.id,
        author: {
          name: b.authorName || "",
          role: b.authorRole || "",
          bio: b.authorBio || "",
          email: b.authorEmail || "",
        },
      }));
    }
  } catch (error) {
    console.error("Failed to fetch blog posts from Postgres:", error);
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.compassioncrew.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog & Insights",
        "item": "https://www.compassioncrew.in/blog"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogClient initialBlogs={blogsData || undefined} />
    </>
  );
}

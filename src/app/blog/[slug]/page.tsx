/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { BlogPostClient } from "./blog-post-client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { BlogPost } from "../blog-client";
import { eq, ne, desc } from "drizzle-orm";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const mapBlogFromDb = (b: any): (BlogPost & { body: any }) | null => {
  if (!b) return null;
  return {
    ...b,
    _id: b.id,
    author: {
      name: b.authorName || "",
      role: b.authorRole || "",
      bio: b.authorBio || "",
      email: b.authorEmail || "",
    },
    body: (b.body.startsWith("[") || b.body.startsWith("{")) ? JSON.parse(b.body) : b.body,
  };
};

export async function generateStaticParams() {
  try {
    const list = await db.select({ slug: blogs.slug }).from(blogs);
    return list.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for blogs:", error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let post = null;

  try {
    const list = await db.select().from(blogs).where(eq(blogs.slug, slug)).limit(1);
    if (list && list.length > 0) {
      post = mapBlogFromDb(list[0]);
    }
  } catch (e) {
    console.error("Error fetching metadata for blog post:", e);
  }

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const keywords = post.keywords || [post.category, "social impact", "volunteer"];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.compassioncrew.in/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author?.name || post.authorNameFallback || "COMPASSION CREW"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post = null;
  let recentPosts: any[] = [];

  try {
    const [list, recentList] = await Promise.all([
      db.select().from(blogs).where(eq(blogs.slug, slug)).limit(1),
      db.select().from(blogs).where(ne(blogs.slug, slug)).orderBy(desc(blogs.publishedAt)).limit(3),
    ]);

    if (list && list.length > 0) {
      post = mapBlogFromDb(list[0]);
    }

    if (recentList && recentList.length > 0) {
      recentPosts = recentList.map(b => mapBlogFromDb(b)).filter(Boolean);
    }
  } catch (error) {
    console.error("Error fetching blog post details from Postgres:", error);
  }

  if (!post) {
    notFound();
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
        "name": "Blog",
        "item": "https://www.compassioncrew.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.compassioncrew.in/blog/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClient post={post} recentPosts={recentPosts} />
    </>
  );
}

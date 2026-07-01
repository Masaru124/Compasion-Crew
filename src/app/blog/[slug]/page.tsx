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

const extractFaqs = (body: any): { q: string; a: string }[] => {
  if (!Array.isArray(body)) return [];
  const faqs: { q: string; a: string }[] = [];
  const faqStartIndex = body.findIndex(block => 
    block._type === "block" && 
    block.style === "h2" && 
    block.children?.some((c: any) => c.text?.toLowerCase().includes("frequently asked questions"))
  );
  
  if (faqStartIndex === -1) return [];
  
  for (let i = faqStartIndex + 1; i < body.length; i++) {
    const block = body[i];
    if (block._type === "block" && block.style === "h3") {
      const question = block.children?.map((c: any) => c.text).join("") || "";
      let answer = "";
      for (let j = i + 1; j < body.length; j++) {
        const nextBlock = body[j];
        if (nextBlock._type === "block") {
          if (nextBlock.style === "normal") {
            answer = nextBlock.children?.map((c: any) => c.text).join("") || "";
            break;
          } else if (nextBlock.style === "h3" || nextBlock.style === "h2") {
            break;
          }
        }
      }
      if (question && answer) {
        faqs.push({ q: question, a: answer });
      }
    }
  }
  return faqs;
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
  const ogImageUrl = post.mainImage ? `https://www.compassioncrew.in${post.mainImage}` : "https://www.compassioncrew.in/images/og-image.jpg";

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
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.seoDescription,
    "image": post.mainImage ? `https://www.compassioncrew.in${post.mainImage}` : "https://www.compassioncrew.in/images/og-image.jpg",
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || post.authorNameFallback || "Khushi Kalpesh Joshi",
      "jobTitle": post.author?.role || "Founder & Director"
    },
    "publisher": {
      "@type": "Organization",
      "name": "COMPASSION CREW",
      "url": "https://www.compassioncrew.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.compassioncrew.in/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.compassioncrew.in/blog/${slug}`
    }
  };

  const blogFaqs = extractFaqs(post.body);
  const faqSchema = blogFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": blogFaqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <BlogPostClient post={post} recentPosts={recentPosts} />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, User, Clock, Link2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { BlogPost } from "../blog-client";

interface BlogPostClientProps {
  post: BlogPost & { body: any };
  recentPosts: BlogPost[];
}

export function BlogPostClient({ post, recentPosts }: BlogPostClientProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const timer = setTimeout(() => {
        setShareUrl(currentUrl);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const getImageUrl = (img: any) => {
    if (!img) return "/images/social_impact_blog.png";
    if (typeof img === "string") return img;
    return "/images/social_impact_blog.png";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Filter body to exclude FAQ section from rendering in the frontend (FAQ is kept in schema only)
  const filteredBody = useMemo(() => {
    if (!Array.isArray(post.body)) return post.body;
    const faqStartIndex = post.body.findIndex((block: any) => 
      block._type === "block" && 
      block.style === "h2" && 
      block.children?.some((c: any) => c.text?.toLowerCase().includes("frequently asked questions"))
    );
    if (faqStartIndex === -1) return post.body;
    return post.body.slice(0, faqStartIndex);
  }, [post.body]);

  // Generate Table of Contents headings
  const headings = useMemo(() => {
    return Array.isArray(filteredBody)
      ? filteredBody
          .filter(
            (block: any) =>
              block._type === "block" &&
              (block.style === "h2" || block.style === "h3"),
          )
          .map((block: any) => {
            const text = block.children?.map((c: any) => c.text).join("") || "";
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            return { text, id, level: block.style };
          })
      : [];
  }, [filteredBody]);

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];
      const scrollPosition = window.scrollY + 200;

      let currentActive = "";
      for (const el of headingElements) {
        if (el.offsetTop <= scrollPosition) {
          currentActive = el.id;
        } else {
          break;
        }
      }
      setActiveHeading(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render portable text config
  const portableTextComponents = {
    block: {
      h1: ({ children }: any) => (
        <h1 className="font-heading text-foreground mt-10 mb-4 text-3xl font-bold tracking-tight">
          {children}
        </h1>
      ),
      h2: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join("") || "";
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return (
          <h2
            id={id}
            className="font-heading text-foreground mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight"
          >
            {children}
          </h2>
        );
      },
      h3: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join("") || "";
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return (
          <h3
            id={id}
            className="font-heading text-foreground mt-8 mb-3 scroll-mt-24 text-xl font-medium tracking-tight"
          >
            {children}
          </h3>
        );
      },
      normal: ({ children }: any) => (
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed lg:text-base">
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-primary bg-primary/5 text-foreground font-heading my-8 rounded-r-lg border-l-4 py-4 pr-3 pl-5 text-base italic md:text-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="text-muted-foreground mb-6 list-outside list-disc space-y-2 pl-6 text-sm lg:text-base">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="text-muted-foreground mb-6 list-outside list-decimal space-y-2 pl-6 text-sm lg:text-base">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="marker:text-primary pl-1">{children}</li>
      ),
      number: ({ children }: any) => (
        <li className="marker:text-primary pl-1 font-medium">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="text-foreground font-semibold">{children}</strong>
      ),
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="bg-secondary text-terracotta rounded px-1.5 py-0.5 font-mono text-xs">
          {children}
        </code>
      ),
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        const target = !value.href.startsWith("/") ? "_blank" : undefined;
        return (
          <a
            href={value.href}
            rel={rel}
            target={target}
            className="text-primary hover:text-primary-hover decoration-primary/30 font-medium underline transition-colors"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }: any) => {
        const srcUrl =
          typeof value === "string"
            ? value
            : value?.url ||
              value?.asset?.url ||
              "/images/social_impact_blog.png";
        return (
          <div className="border-border relative my-8 h-64 w-full overflow-hidden border shadow-sm md:h-[400px]">
            <Image
              src={srcUrl}
              alt={value?.alt || "Article Image"}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        );
      },
    },
  };

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: getImageUrl(post.mainImage),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    keywords: post.keywords ? post.keywords.join(", ") : undefined,
    author: {
      "@type": "Person",
      name: post.author?.name || post.authorNameFallback || "COMPASSION CREW",
      jobTitle: post.author?.role || "Team Member",
      description: post.author?.bio || undefined,
      email: post.author?.email || undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "COMPASSION CREW",
      url: "https://www.compassioncrew.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.compassioncrew.in/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.compassioncrew.in/blog/${post.slug}`,
    },
  };

  return (
    <div className="planner-bg mx-auto min-h-screen max-w-7xl px-6 py-12 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />

      {/* Article Header */}
      <header className="pt-10 pb-10">
        <div className="section-container max-w-[1200px]">
          <div className="max-w-3xl">
            <h1 className="font-heading text-foreground mb-6 text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
              {post.title}
            </h1>

            <div className="text-muted-foreground border-border flex flex-wrap items-center gap-6 border-b pb-6 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="text-terracotta h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <User className="text-primary h-4 w-4" />
                {post.author?.name ||
                  post.authorNameFallback ||
                  "Staff Coordinator"}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="text-accent h-4 w-4" />7 min read
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <section className="pb-24">
        <div className="section-container max-w-[1200px]">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* Left Sticky Sidebar (Table of Contents & Sharing) */}
            <aside className="order-2 flex flex-col gap-8 lg:sticky lg:top-28 lg:order-1 lg:col-span-3">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-card/50 border-border hidden border p-5 backdrop-blur-sm lg:block">
                  <h4 className="text-foreground border-border mb-4 border-b pb-2 font-mono text-xs font-semibold tracking-wider uppercase">
                    Table of Contents
                  </h4>
                  <nav className="flex flex-col gap-2.5">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`hover:text-foreground text-xs leading-normal transition-colors ${
                          h.level === "h3"
                            ? "border-border/60 border-l pl-3.5"
                            : "font-medium"
                        } ${
                          activeHeading === h.id
                            ? "text-primary font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Share Article */}
              <div className="bg-card/50 border-border border p-5 backdrop-blur-sm">
                <h4 className="text-foreground border-border mb-4 border-b pb-2 font-mono text-xs font-semibold tracking-wider uppercase">
                  Share Article
                </h4>
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="flex w-fit items-center justify-center gap-1.5 text-xs"
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                  <a
                    href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
                      post.title,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-9 w-9 items-center justify-center rounded border transition-colors"
                    aria-label="Share on X"
                  >
                    <span className="font-mono text-xs font-bold">X</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-9 w-9 items-center justify-center rounded border transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <span className="font-mono text-xs font-bold">in</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Middle Main Content Area */}
            <article className="order-1 lg:order-2 lg:col-span-9">
              {/* Feature Image Banner */}
              <div className="border-border/80 relative mb-10 h-64 w-full overflow-hidden border shadow-md md:h-[480px]">
                <Image
                  src={getImageUrl(post.mainImage)}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 850px"
                  className="object-cover"
                />
              </div>

              {/* Rich Body Content */}
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {Array.isArray(filteredBody) ? (
                  <PortableText
                    value={filteredBody}
                    components={portableTextComponents}
                  />
                ) : (
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    {filteredBody || "No body content available."}
                  </p>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Bottom Recommendation Section: Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-muted/10 border-border border-t py-20">
          <div className="section-container max-w-7xl">
            <h3 className="font-heading text-foreground mb-8 text-2xl font-semibold tracking-tight">
              Recommended Reads
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Card
                  key={post._id}
                  className="group flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="relative h-44 w-full">
                      <Image
                        src={getImageUrl(post.mainImage)}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-terracotta mb-2 block font-mono text-[10px] font-bold tracking-widest uppercase">
                        {post.category}
                      </span>
                      <h4 className="font-heading text-foreground group-hover:text-primary line-clamp-2 text-base font-semibold tracking-tight transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <p className="text-muted-foreground mt-2.5 line-clamp-2 text-xs leading-normal">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pt-0 pb-5">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary inline-flex items-center gap-1 text-xs font-semibold"
                      aria-label={`Read article: ${post.title}`}
                    >
                      Read Article &rarr;
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

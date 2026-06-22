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
import { urlFor } from "@/sanity/client";
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
    if (img.asset || img._type === "image") {
      return urlFor(img).url() || "/images/social_impact_blog.png";
    }
    return "/images/social_impact_blog.png";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate Table of Contents headings
  const headings = useMemo(() => {
    return Array.isArray(post.body)
      ? post.body
          .filter((block: any) => block._type === "block" && (block.style === "h2" || block.style === "h3"))
          .map((block: any) => {
            const text = block.children?.map((c: any) => c.text).join("") || "";
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return { text, id, level: block.style };
          })
      : [];
  }, [post.body]);

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
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
        <h1 className="font-heading text-3xl font-bold mt-10 mb-4 tracking-tight text-foreground">
          {children}
        </h1>
      ),
      h2: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join("") || "";
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return (
          <h2 id={id} className="font-heading text-2xl font-semibold mt-12 mb-4 scroll-mt-24 text-foreground tracking-tight">
            {children}
          </h2>
        );
      },
      h3: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join("") || "";
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return (
          <h3 id={id} className="font-heading text-xl font-medium mt-8 mb-3 scroll-mt-24 text-foreground tracking-tight">
            {children}
          </h3>
        );
      },
      normal: ({ children }: any) => (
        <p className="mb-6 leading-relaxed text-muted-foreground text-sm lg:text-base">
          {children}
        </p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-primary bg-primary/5 pl-5 pr-3 py-4 rounded-r-lg italic my-8 text-foreground font-heading text-base md:text-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-outside mb-6 text-muted-foreground pl-6 space-y-2 text-sm lg:text-base">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-outside mb-6 text-muted-foreground pl-6 space-y-2 text-sm lg:text-base">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => <li className="marker:text-primary pl-1">{children}</li>,
      number: ({ children }: any) => <li className="marker:text-primary font-medium pl-1">{children}</li>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-semibold text-foreground">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-xs text-terracotta">
          {children}
        </code>
      ),
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
        const target = !value.href.startsWith("/") ? "_blank" : undefined;
        return (
          <a
            href={value.href}
            rel={rel}
            target={target}
            className="text-primary underline hover:text-primary-hover transition-colors font-medium decoration-primary/30"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }: any) => {
        return (
          <div className="relative h-64 md:h-[400px] w-full my-8 rounded-lg overflow-hidden border border-border shadow-sm">
            <Image
              src={urlFor(value).url() || "/images/social_impact_blog.png"}
              alt={value.alt || "Article Image"}
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
    "headline": post.title,
    "description": post.excerpt,
    "image": getImageUrl(post.mainImage),
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || post.authorNameFallback || "COMPASSION CREW",
      "jobTitle": post.author?.role || "Team Member"
    },
    "publisher": {
      "@type": "NGO",
      "name": "COMPASSION CREW",
      "url": "https://compassioncrew.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://compassioncrew.in/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://compassioncrew.in/blog/${post.slug}`
    }
  };

  return (
    <div className="planner-bg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />

      {/* Back Link */}
      <div className="pt-28">
        <div className="section-container max-w-[1200px]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group mb-8"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="pb-10">
        <div className="section-container max-w-[1200px]">
          <div className="max-w-3xl">
            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full py-1 px-3.5 mb-4 text-xs font-mono font-medium tracking-wider uppercase">
              {post.category}
            </Badge>

            <h1 className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-6 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-terracotta" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                {post.author?.name || post.authorNameFallback || "Staff Coordinator"}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                7 min read
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <section className="pb-24">
        <div className="section-container max-w-[1200px]">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Sticky Sidebar (Table of Contents & Sharing) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-28 flex flex-col gap-8 order-2 lg:order-1">
              
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-card/50 border border-border p-5 rounded-xl backdrop-blur-sm hidden lg:block">
                  <h4 className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase mb-4 pb-2 border-b border-border">
                    Table of Contents
                  </h4>
                  <nav className="flex flex-col gap-2.5">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`text-xs transition-colors hover:text-foreground leading-normal ${
                          h.level === "h3" ? "pl-3.5 border-l border-border/60" : "font-medium"
                        } ${
                          activeHeading === h.id ? "text-primary font-semibold" : "text-muted-foreground"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Share Article */}
              <div className="bg-card/50 border border-border p-5 rounded-xl backdrop-blur-sm">
                <h4 className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase mb-4 pb-2 border-b border-border">
                  Share Article
                </h4>
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs flex items-center justify-center gap-1.5"
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                  <a
                    href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
                      post.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Share on X"
                  >
                    <span className="font-mono text-xs font-bold">X</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <span className="font-mono text-xs font-bold">in</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Middle Main Content Area */}
            <article className="lg:col-span-9 order-1 lg:order-2">
              
              {/* Feature Image Banner */}
              <div className="relative h-64 md:h-[480px] w-full rounded-2xl overflow-hidden border border-border/80 shadow-md mb-10">
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
                {Array.isArray(post.body) ? (
                  <PortableText value={post.body} components={portableTextComponents} />
                ) : (
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {post.body || "No body content available."}
                  </p>
                )}
              </div>

              {/* Author Bio Box */}
              {(post.author || post.authorNameFallback) && (
                <div className="mt-16 bg-card border border-border p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start shadow-sm">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary font-heading text-2xl font-bold flex-shrink-0">
                    {(post.author?.name || post.authorNameFallback || "C").charAt(0)}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-terracotta font-semibold block mb-1">
                      Written By
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      {post.author?.name || post.authorNameFallback}
                    </h3>
                    {post.author?.role && (
                      <p className="text-primary text-xs font-medium mb-3">{post.author.role}</p>
                    )}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.author?.bio ||
                        "NGO Volunteer Coordinator dedicated to bridging the gaps in communities and driving positive grassroots initiatives across India."}
                    </p>
                  </div>
                </div>
              )}

              {/* Editorial CTA */}
              <div className="mt-12 bg-primary text-primary-foreground p-8 md:p-12 rounded-2xl text-center shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -mr-4 -mt-4" />
                <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight mb-4 text-primary-foreground">
                  Inspired to Create Lasting Impact?
                </h3>
                <p className="text-primary-foreground/80 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                  Join our community of changemakers. You can contribute your skills as a volunteer or support our running projects through a tax-deductible donation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/volunteer">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto font-medium">
                      Become a Volunteer
                    </Button>
                  </Link>
                  <Link href="/donate">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-medium"
                    >
                      <Heart className="h-4.5 w-4.5 mr-2 inline fill-current" />
                      Donate Now (80G)
                    </Button>
                  </Link>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Bottom Recommendation Section: Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-muted/10 border-t border-border py-20">
          <div className="section-container max-w-[1200px]">
            <h3 className="font-heading text-2xl font-semibold text-foreground tracking-tight mb-8">
              Recommended Reads
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card key={post._id} className="overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between">
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
                      <span className="text-[10px] font-mono text-terracotta uppercase font-bold tracking-widest block mb-2">
                        {post.category}
                      </span>
                      <h4 className="font-heading text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-muted-foreground text-xs leading-normal mt-2.5 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-0">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
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

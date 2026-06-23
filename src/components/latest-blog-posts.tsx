"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPreview {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: string;
}

interface LatestBlogPostsProps {
  posts: BlogPreview[];
}

const fallbackPosts: BlogPreview[] = [
  {
    _id: "1",
    title: "Creating Lasting Social Impact: A Step-by-Step Approach",
    slug: "creating-lasting-social-impact-step-by-step",
    publishedAt: "2026-06-22T10:00:00Z",
    excerpt:
      "Discover a structured, actionable guide to making a sustainable social impact — from defining your core cause to measuring and scaling your efforts.",
    category: "Social Impact",
  },
];

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function LatestBlogPosts({ posts }: LatestBlogPostsProps) {
  const displayPosts = posts?.length > 0 ? posts : fallbackPosts;

  return (
    <section className="section-padding border-t border-border">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-2">
              Latest Insights
            </span>
            <h2 className="font-heading text-fluid-section text-foreground tracking-tight">
              From Our Blog
            </h2>
          </div>
          <Link href="/blog">
            <Button variant="outline" size="sm" className="group shrink-0">
              View All Posts
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full"
                aria-label={`Read more about: ${post.title}`}
              >
                <div className="h-full bg-card border border-border rounded-xl p-6 flex flex-col hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  {/* Category + Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-terracotta bg-terracotta/8 px-2.5 py-1 rounded">
                      <BookOpen className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-medium text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* CTA */}
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

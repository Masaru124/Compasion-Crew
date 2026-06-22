/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/sanity/client";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  mainImage?: any;
  author?: {
    name: string;
    role: string;
    bio?: string;
    email?: string;
  };
  authorNameFallback?: string;
}

// Fallback mock blogs if Sanity returns empty or is not configured yet
const defaultBlogs: BlogPost[] = [
  {
    _id: "default-1",
    title: "Creating Lasting Social Impact: A Step-by-Step Approach",
    slug: "creating-lasting-social-impact-step-by-step",
    publishedAt: "2026-06-22T10:00:00Z",
    excerpt: "Discover a structured, actionable guide to making a sustainable social impact, from defining your core cause to measuring and scaling your efforts for long-term community benefits.",
    category: "Social Impact",
    author: {
      name: "Khushi Kalpesh Joshi",
      role: "Co-Founder & COO",
    },
  },
  {
    _id: "default-2",
    title: "The Power of Volunteering: How 2 Hours a Week Can Change Lives",
    slug: "power-of-volunteering-changing-lives",
    publishedAt: "2026-06-15T09:00:00Z",
    excerpt: "Explore the psychological, social, and physical benefits of volunteering, and learn how dedicating just two hours a week can create ripples of positive change in your community.",
    category: "Volunteering",
    authorNameFallback: "Matharrishwa",
  },
  {
    _id: "default-3",
    title: "Educating the Future: Mentoring Underprivileged Youth",
    slug: "educating-future-mentoring-youth",
    publishedAt: "2026-06-08T08:30:00Z",
    excerpt: "Education is the greatest tool for empowerment. Read about our latest initiatives to connect professional mentors with children from underserved areas.",
    category: "Education",
    author: {
      name: "Bharath S",
      role: "Head of Programs",
    },
  },
];

interface BlogClientProps {
  initialBlogs?: BlogPost[];
}

export function BlogClient({ initialBlogs }: BlogClientProps) {
  const blogs = initialBlogs || defaultBlogs;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Social Impact", "Volunteering", "Community", "Education", "Animal Welfare"];

  const getImageUrl = (img: any) => {
    if (!img) return "/images/yoga.jpeg";
    if (typeof img === "string") return img;
    if (img.asset || img._type === "image") {
      return urlFor(img).url() || "/images/yoga.jpeg";
    }
    return "/images/yoga.jpeg";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Filter posts
  const filteredBlogs = blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured blog (latest one)
  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  return (
    <div className="planner-bg min-h-screen">
      {/* Hero Banner */}
      <section className="pt-32 pb-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
              Compassion Insights
            </span>
            <h1 className="font-heading text-fluid-hero text-foreground mb-6 tracking-tight">
              Stories & Guides
            </h1>
            <p className="text-muted-foreground">
              Welcome to our blog page. Dive into resources, step-by-step approaches,
              and reflections from our volunteers, coordinators, and directors working on the ground.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controls: Search and Filters */}
      <section className="pb-12">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-card border border-border p-6 rounded shadow-sm">
            {/* Search input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="rounded-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Section */}
      {featuredBlog && !searchQuery && selectedCategory === "All" && (
        <section className="pb-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded overflow-hidden shadow-sm grid lg:grid-cols-12 gap-0 group"
            >
              <div className="lg:col-span-7 relative h-72 lg:h-[450px]">
                <Image
                  src={getImageUrl(featuredBlog.mainImage)}
                  alt={featuredBlog.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary hover:bg-primary/95 text-white py-1 px-3 rounded-full text-xs">
                    Featured &bull; {featuredBlog.category}
                  </Badge>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(featuredBlog.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {featuredBlog.author?.name || featuredBlog.authorNameFallback || "Compassion Crew"}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl lg:text-3xl font-medium text-foreground mb-4 tracking-tight leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/blog/${featuredBlog.slug}`}>
                      {featuredBlog.title}
                    </Link>
                  </h2>

                  <p className="text-muted-foreground text-sm lg:text-base mb-6 line-clamp-4">
                    {featuredBlog.excerpt}
                  </p>
                </div>

                <Link href={`/blog/${featuredBlog.slug}`}>
                  <Button className="w-full sm:w-auto flex items-center justify-center gap-2 group-hover:translate-x-0.5 transition-transform">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blogs Grid */}
      <section className="pb-24">
        <div className="section-container">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded shadow-sm">
              <p className="text-muted-foreground text-lg mb-4">No articles found matching your criteria.</p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div>
              {/* If we are showing featured blog, we list remaining. Else (under filter/search) list everything. */}
              <h2 className="font-heading text-2xl text-foreground mb-8 tracking-tight font-medium">
                {searchQuery || selectedCategory !== "All" ? "Search Results" : "Recent Articles"}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchQuery || selectedCategory !== "All" ? filteredBlogs : remainingBlogs).map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-card border border-border rounded overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-shadow group"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={getImageUrl(post.mainImage)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-102"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary/90 text-white rounded-full text-xs py-0.5 px-2.5">
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author?.name || post.authorNameFallback || "Staff"}
                          </span>
                        </div>

                        <h3 className="font-heading text-lg font-medium text-foreground mb-3 tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-muted-foreground text-xs leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover group-hover:gap-2.5 transition-all">
                        Read Full Story
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

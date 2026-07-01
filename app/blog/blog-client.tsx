/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  seoTitle?: string | null;
  seoDescription?: string | null;
  keywords?: string[] | null;
}

// Fallback mock blogs if Sanity returns empty or is not configured yet
const defaultBlogs: BlogPost[] = [
  {
    _id: "default-1",
    title: "Creating Lasting Social Impact: A Step-by-Step Approach",
    slug: "creating-lasting-social-impact-step-by-step",
    publishedAt: "2026-06-22T10:00:00Z",
    excerpt:
      "Discover a structured, actionable guide to making a sustainable social impact, from defining your core cause to measuring and scaling your efforts for long-term community benefits.",
    category: "Social Impact",
    author: {
      name: "Khushi Kalpesh Joshi",
      role: "Founder & Director",
    },
  },
  {
    _id: "default-2",
    title: "The Power of Volunteering: How 2 Hours a Week Can Change Lives",
    slug: "power-of-volunteering-changing-lives",
    publishedAt: "2026-06-15T09:00:00Z",
    excerpt:
      "Explore the psychological, social, and physical benefits of volunteering, and learn how dedicating just two hours a week can create ripples of positive change in your community.",
    category: "Volunteering",
    authorNameFallback: "Matharishwa",
  },
  {
    _id: "default-3",
    title: "Educating the Future: Mentoring Underprivileged Youth",
    slug: "educating-future-mentoring-youth",
    publishedAt: "2026-06-08T08:30:00Z",
    excerpt:
      "Education is the greatest tool for empowerment. Read about our latest initiatives to connect professional mentors with children from underserved areas.",
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

  const categories = [
    "All",
    "Social Impact",
    "Volunteering",
    "Community",
    "Education",
    "Animal Welfare",
  ];

  const getImageUrl = (img: any) => {
    if (!img) return "/images/social_impact_blog.png";
    if (typeof img === "string") return img;
    if (img?.asset?.url) return img.asset.url;
    return "/images/social_impact_blog.png";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter posts based on search and category
  const filteredBlogs = blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured blog (latest one)
  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 pt-24 lg:pt-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl leading-tight font-bold tracking-tight text-gray-950 lg:text-6xl">
              Our Stories
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Insights, stories, and impact from our community making a
              difference every day.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-16 border-b border-gray-200 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gray-950 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="py-24 text-center">
            <p className="mb-8 text-lg text-gray-600">No articles found.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="inline-flex items-center gap-2 bg-gray-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {featuredBlog && (
              <div className="mb-20 border-b border-gray-200 pb-20">
                <article className="grid gap-12 md:grid-cols-2 md:gap-16">
                  <Link
                    href={`/blog/${featuredBlog.slug}`}
                    className="group relative aspect-[4/3] overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={getImageUrl(featuredBlog.mainImage)}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="inline-block bg-gray-950 px-3 py-1 text-xs font-semibold text-white">
                        {featuredBlog.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(featuredBlog.publishedAt)}
                      </span>
                    </div>

                    <h2 className="mb-6 text-4xl leading-tight font-light text-gray-950 lg:text-5xl">
                      <Link href={`/blog/${featuredBlog.slug}`}>
                        {featuredBlog.title}
                      </Link>
                    </h2>

                    <p className="mb-8 text-base leading-relaxed text-gray-600">
                      {featuredBlog.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {featuredBlog.author?.name ||
                          featuredBlog.authorNameFallback ||
                          "Compassion Crew"}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-gray-950 transition hover:gap-5"
                    >
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </div>
            )}

            {remainingBlogs.length > 0 && (
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {remainingBlogs.map((post) => (
                  <article
                    key={post._id}
                    className="group flex flex-col transition"
                  >
                    {/* Image */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group relative mb-6 aspect-[4/3] overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={getImageUrl(post.mainImage)}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Content */}
                    <div className="flex flex-grow flex-col">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>

                      <h3 className="mb-4 text-xl leading-snug font-light text-gray-950 lg:text-2xl">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600">
                        {post.excerpt}
                      </p>

                      <div className="mb-6 text-xs text-gray-500">
                        <span className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          {post.author?.name ||
                            post.authorNameFallback ||
                            "Compassion Crew"}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-950 transition hover:gap-3"
                      >
                        Read More
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

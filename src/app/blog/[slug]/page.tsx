/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/client";
import { blogBySlugQuery, recentBlogsQuery } from "@/sanity/queries";
import { BlogPostClient } from "./blog-post-client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { BlogPost } from "../blog-client";

// Fallback content in case Sanity isn't seeded/connected
const fallbackBlogs: Record<string, BlogPost & { body: any }> = {
  "creating-lasting-social-impact-step-by-step": {
    _id: "default-1",
    title: "Creating Lasting Social Impact: A Step-by-Step Approach",
    slug: "creating-lasting-social-impact-step-by-step",
    publishedAt: "2026-06-22T10:00:00Z",
    excerpt: "Discover a structured, actionable guide to making a sustainable social impact, from defining your core cause to measuring and scaling your efforts for long-term community benefits.",
    category: "Social Impact",
    author: {
      name: "Khushi Kalpesh Joshi",
      role: "Co-Founder & COO",
      bio: "Operations expert with 10+ years in NGO management. Leads our ground initiatives across India.",
    },
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Creating a lasting social impact is one of the most rewarding endeavors an individual or organization can undertake. However, true change goes beyond quick fixes or temporary charity. It requires a systematic, empathetic, and structured approach to address the root causes of societal gaps.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 1: Identify the Root Problem & Define Your Cause" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Before launching any social campaign, it is vital to research and map out the community. Many programs fail because they address symptoms rather than the disease. Spend time listening to community members, gathering quantitative data, and mapping out structural issues.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 2: Establish Clear, Measurable Goals" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "A vague mission statement like 'helping children' makes it hard to coordinate resources. Instead, set Specific, Measurable, Achievable, Relevant, and Time-bound (SMART) goals. For example: 'Provide weekly basic digital literacy mentorship to 50 children in the Cubbon Park locality by December 2026.'",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 3: Design Sustainable, Empowerment-Focused Solutions" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Charity provides temporary relief, but empowerment builds resilience. Focus on programs that teach skills, build infrastructure, or provide resource pathways that allow beneficiaries to ultimately support themselves. Co-create solutions with the local community to foster ownership.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 4: Build a Dedicated Team and Partner Network" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "No single person can create systemic change alone. Connect with local volunteers, corporate partners, and other NGOs. COMPASSION CREW, for instance, thrives because of a strong network of coordinators and passionate volunteers who share a unified vision.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 5: Mobilize Resources & Maintain Legal Compliance" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Structure your fundraising, logistics, and legal compliance. Transparency builds trust. If you are operating a registered NGO in India, offering benefits like 80G tax deductions helps mobilize corporate and individual donations that fuel ground operations.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 6: Execute with Empathy & Continuous Feedback" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Implementation is where plans meet reality. Maintain a feedback loop with the community you serve. Be flexible enough to alter strategies based on actual ground experiences, while staying firm on the overall mission.",
          }
        ]
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Step 7: Measure, Document, and Scale Impact" }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Collect data continually. Document before-and-after conditions, write case studies, and record quantitative stats (e.g. lives impacted, children educated). Share these stories with your network to attract more support and scale your initiatives to other regions.",
          }
        ]
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          {
            _type: "span",
            text: "'True compassion is not just feeling empathy, but having the courage and structure to act on it.' — Khushi Kalpesh Joshi",
          }
        ]
      }
    ],
  },
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return Object.keys(fallbackBlogs).map((slug) => ({ slug }));
    }
    const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current }`);
    return posts.map((post: { slug: string }) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for blogs:", error);
    return Object.keys(fallbackBlogs).map((slug) => ({ slug }));
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let post = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      post = await client.fetch(blogBySlugQuery, { slug });
    }
  } catch (e) {
    console.error("Error fetching metadata for blog post:", e);
  }

  // Use fallback if not found in Sanity
  const currentPost = post || fallbackBlogs[slug];

  if (!currentPost) {
    return {
      title: "Post Not Found",
    };
  }

  const title = currentPost.seoTitle || currentPost.title;
  const description = currentPost.seoDescription || currentPost.excerpt;
  const keywords = currentPost.keywords || [currentPost.category, "social impact", "volunteer"];

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
      url: `https://compassioncrew.in/blog/${slug}`,
      publishedTime: currentPost.publishedAt,
      authors: [currentPost.author?.name || currentPost.authorNameFallback || "COMPASSION CREW"],
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
  let recentPosts = [];

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      [post, recentPosts] = await Promise.all([
        client.fetch(blogBySlugQuery, { slug }),
        client.fetch(recentBlogsQuery, { slug }),
      ]);
    }
  } catch (error) {
    console.error("Error fetching blog post details from Sanity:", error);
  }

  const currentPost = post || fallbackBlogs[slug];
  const displayRecent = recentPosts.length > 0 ? recentPosts : Object.values(fallbackBlogs).filter((p) => p.slug !== slug);

  if (!currentPost) {
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
        "item": "https://compassioncrew.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://compassioncrew.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": currentPost.title,
        "item": `https://compassioncrew.in/blog/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostClient post={currentPost} recentPosts={displayRecent} />
    </>
  );
}


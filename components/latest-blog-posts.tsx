import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPreview {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  mainImage?: string | null | undefined;
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
    <section className="border-border border-t py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-primary mb-2 block text-sm font-medium">
              Latest Insights
            </span>
            <h2 className="text-foreground text-3xl font-bold tracking-tight lg:text-5xl">
              From Our <span className="text-primary italic">Blog</span>
            </h2>
          </div>
          <Link href="/blog">
            <Button variant="ghost">
              View All Posts
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <div key={post._id} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full"
                aria-label={`Read more about: ${post.title}`}
              >
                <div className="border-border bg-card flex h-full flex-col justify-between rounded border p-8 transition-shadow hover:shadow-sm">
                  <div>
                    <h3 className="text-foreground group-hover:text-primary mb-3 line-clamp-2 text-xl leading-snug font-light tracking-tight transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="text-primary border-border mt-auto flex items-center gap-1.5 border-t pt-4 text-sm font-medium transition-colors">
                    <span>Read more</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

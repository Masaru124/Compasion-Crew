import { HeroSection } from "@/components/hero-section";
import { WorkAreas } from "@/components/work-areas";
import { StorySection } from "@/components/story-section";
import { CTASection } from "@/components/cta-section";
import { LatestBlogPosts } from "@/components/latest-blog-posts";
import { client } from "@/sanity/client";
import {
  workAreasQuery,
  storiesQuery,
  heroSectionQuery,
  ctaSectionQuery,
  latestBlogsQuery,
} from "@/sanity/queries";

export const revalidate = 60;

export default async function Home() {
  let workAreasData = null;
  let storiesData = null;
  let heroData = null;
  let ctaData = null;
  let latestBlogs = [];

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const [areas, stories, hero, cta, blogs] = await Promise.all([
        client.fetch(workAreasQuery),
        client.fetch(storiesQuery),
        client.fetch(heroSectionQuery),
        client.fetch(ctaSectionQuery),
        client.fetch(latestBlogsQuery),
      ]);

      if (areas && areas.length > 0) workAreasData = areas;
      if (stories && stories.length > 0) storiesData = stories;
      if (hero) heroData = hero;
      if (cta) ctaData = cta;
      if (blogs && blogs.length > 0) latestBlogs = blogs;
    }
  } catch (error) {
    console.error("Failed to fetch homepage data from Sanity:", error);
  }

  return (
    <>
      <HeroSection initialHero={heroData || undefined} />
      <WorkAreas initialWorkAreas={workAreasData || undefined} />
      <StorySection initialStories={storiesData || undefined} />
      <LatestBlogPosts posts={latestBlogs} />
      <CTASection initialCTA={ctaData || undefined} />
    </>
  );
}


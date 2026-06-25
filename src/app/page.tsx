import { HeroSection } from "@/components/hero-section";
import { WorkAreas } from "@/components/work-areas";
import { StorySection } from "@/components/story-section";
import { CTASection } from "@/components/cta-section";
import { LatestBlogPosts } from "@/components/latest-blog-posts";
import { FAQSection } from "@/components/faq-section";
import { db } from "@/db";
import { heroSection, ctaSection, workAreas, stories, blogs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "COMPASSION CREW | Social Impact Community in Bangalore",
  description: "Join COMPASSION CREW, Bangalore's leading social impact community. Participate in community events, volunteer drives, youth mentorship, and animal rescue campaigns. 80G tax benefits.",
  keywords: [
    "social impact community in Bangalore",
    "social impact community Bangalore",
    "volunteer opportunities Bangalore",
    "80G tax deductible donations India",
    "youth mentorship Bangalore",
    "animal welfare Bangalore volunteer",
    "women empowerment Bangalore",
    "community engagement events Bangalore",
    "COMPASSION CREW",
    "Compassion Crew Bangalore"
  ],
  alternates: {
    canonical: "/",
  }
};

export const revalidate = 60;

export default async function Home() {
  let workAreasData = null;
  let storiesData = null;
  let heroData = null;
  let ctaData = null;
  let latestBlogs: (typeof blogs.$inferSelect & { _id: string })[] = [];

  try {
    const [areas, listStories, heroList, ctaList, blogsList] = await Promise.all([
      db.select().from(workAreas),
      db.select().from(stories).where(eq(stories.approved, true)),
      db.select().from(heroSection).limit(1),
      db.select().from(ctaSection).limit(1),
      db.select().from(blogs).orderBy(desc(blogs.publishedAt)).limit(3),
    ]);

    if (areas && areas.length > 0) workAreasData = areas;
    if (listStories && listStories.length > 0) storiesData = listStories;
    if (heroList && heroList.length > 0) heroData = heroList[0];
    if (ctaList && ctaList.length > 0) ctaData = ctaList[0];
    if (blogsList && blogsList.length > 0) {
      latestBlogs = blogsList.map(b => ({
        ...b,
        _id: b.id,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch homepage data from Postgres:", error);
  }

  return (
    <>
      <HeroSection initialHero={heroData || undefined} />
      <WorkAreas initialWorkAreas={workAreasData || undefined} />
      <StorySection initialStories={storiesData || undefined} />
      <LatestBlogPosts posts={latestBlogs} />
      <FAQSection />
      <CTASection initialCTA={ctaData || undefined} />
    </>
  );
}

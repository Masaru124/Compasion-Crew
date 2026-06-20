import { HeroSection } from "@/components/hero-section";
import { WorkAreas } from "@/components/work-areas";
import { ImpactStats } from "@/components/impact-stats";
import { StorySection } from "@/components/story-section";
import { CTASection } from "@/components/cta-section";
import { client } from "@/sanity/client";
import {
  workAreasQuery,
  storiesQuery,
  heroSectionQuery,
  ctaSectionQuery,
  impactStatsQuery,
} from "@/sanity/queries";

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function Home() {
  let workAreasData = null;
  let storiesData = null;
  let heroData = null;
  let ctaData = null;
  let statsData = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const [areas, stories, hero, cta, stats] = await Promise.all([
        client.fetch(workAreasQuery),
        client.fetch(storiesQuery),
        client.fetch(heroSectionQuery),
        client.fetch(ctaSectionQuery),
        client.fetch(impactStatsQuery),
      ]);
      
      if (areas && areas.length > 0) workAreasData = areas;
      if (stories && stories.length > 0) storiesData = stories;
      if (hero) heroData = hero;
      if (cta) ctaData = cta;
      if (stats && stats.length > 0) statsData = stats;
    }
  } catch (error) {
    console.error("Failed to fetch homepage data from Sanity:", error);
  }

  return (
    <>
      <HeroSection initialHero={heroData || undefined} />
      <WorkAreas initialWorkAreas={workAreasData || undefined} />
      <ImpactStats initialStats={statsData || undefined} />
      <StorySection initialStories={storiesData || undefined} />
      <CTASection initialCTA={ctaData || undefined} />
    </>
  );
}

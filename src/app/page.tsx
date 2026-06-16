import { HeroSection } from "@/components/hero-section";
import { WorkAreas } from "@/components/work-areas";
import { StorySection } from "@/components/story-section";
import { CTASection } from "@/components/cta-section";
import { client } from "@/sanity/client";
import {
  workAreasQuery,
  storiesQuery,
  heroSectionQuery,
  ctaSectionQuery,
} from "@/sanity/queries";

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function Home() {
  let workAreasData = null;
  let storiesData = null;
  let heroData = null;
  let ctaData = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const [areas, stories, hero, cta] = await Promise.all([
        client.fetch(workAreasQuery),
        client.fetch(storiesQuery),
        client.fetch(heroSectionQuery),
        client.fetch(ctaSectionQuery),
      ]);
      
      if (areas && areas.length > 0) workAreasData = areas;
      if (stories && stories.length > 0) storiesData = stories;
      if (hero) heroData = hero;
      if (cta) ctaData = cta;
    }
  } catch (error) {
    console.error("Failed to fetch homepage data from Sanity:", error);
  }

  return (
    <>
      <HeroSection initialHero={heroData || undefined} />
      <WorkAreas initialWorkAreas={workAreasData || undefined} />
      <StorySection initialStories={storiesData || undefined} />
      <CTASection initialCTA={ctaData || undefined} />
    </>
  );
}

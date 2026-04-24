import { HeroSection } from "@/components/hero-section";
import { WorkAreas } from "@/components/work-areas";
import { ImpactStats } from "@/components/impact-stats";
import { StorySection } from "@/components/story-section";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WorkAreas />
      <ImpactStats />
      <StorySection />
      <CTASection />
    </>
  );
}

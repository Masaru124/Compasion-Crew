import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ImpactStats } from "@/components/impact-stats";
import { WorkAreas } from "@/components/work-areas";
import { FounderSection } from "@/components/founder-section";
import { StorySection } from "@/components/story-section";
import { TeamSection } from "@/components/team-section";
import { VolunteerSection } from "@/components/volunteer-section";
import { LatestBlogPosts } from "@/components/latest-blog-posts";
import { DonateSection } from "@/components/donate-section";
import { FAQSection } from "@/components/faq-section";
import { db } from "@/db";
import { heroSection, ctaSection, workAreas, stories, blogs, founderPage, teamMembers, volunteerPage, donatePage } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compassion Crew | Social Impact Community in Bangalore",
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
  let founderData = null;
  let teamMembersData = null;
  let volunteerData = null;
  let donateData = null;
  let latestBlogs: (typeof blogs.$inferSelect & { _id: string })[] = [];

  try {
    const [areas, listStories, heroList, ctaList, blogsList, founderList, teamList, volunteerList, donateList] = await Promise.all([
      db.select().from(workAreas),
      db.select().from(stories).where(eq(stories.approved, true)),
      db.select().from(heroSection).limit(1),
      db.select().from(ctaSection).limit(1),
      db.select().from(blogs).orderBy(desc(blogs.publishedAt)).limit(3),
      db.select().from(founderPage).limit(1),
      db.select().from(teamMembers),
      db.select().from(volunteerPage).limit(1),
      db.select().from(donatePage).limit(1),
    ]);

    if (areas && areas.length > 0) workAreasData = areas;
    if (listStories && listStories.length > 0) storiesData = listStories;
    if (heroList && heroList.length > 0) heroData = heroList[0];
    if (ctaList && ctaList.length > 0) ctaData = ctaList[0];
    if (founderList && founderList.length > 0) founderData = founderList[0];
    if (teamList && teamList.length > 0) teamMembersData = teamList;
    if (volunteerList && volunteerList.length > 0) volunteerData = volunteerList[0];
    if (donateList && donateList.length > 0) {
      donateData = {
        ...donateList[0],
        donationOptions: JSON.parse(donateList[0].donationOptions),
      };
    }
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
      <AboutSection />
      {/* <ImpactStats /> */}
      <WorkAreas initialWorkAreas={workAreasData || undefined} />
      <FounderSection initialFounder={founderData || undefined} />
      {/* <StorySection initialStories={storiesData || undefined} /> */}
      <TeamSection initialTeamMembers={teamMembersData || undefined} />
      <LatestBlogPosts posts={latestBlogs} />
      {/* <DonateSection initialDonate={donateData || undefined} /> */}
      <FAQSection />
    </>
  );
}   

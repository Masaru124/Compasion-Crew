import { TeamPageClient } from "./team-client";
import { client } from "@/sanity/client";
import { teamMembersQuery } from "@/sanity/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description: "Meet the community coordinators and program leaders behind COMPASSION CREW, dedicating their expertise to empower learning and connection.",
  keywords: ["COMPASSION CREW team", "community coordinators India", "social program leaders Bangalore"],
  alternates: {
    canonical: "/team",
  }
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

export default async function TeamPage() {
  let teamMembersData = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const data = await client.fetch(teamMembersQuery);
      if (data && data.length > 0) {
        teamMembersData = data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch team members from Sanity:", error);
  }

  return <TeamPageClient initialTeamMembers={teamMembersData || undefined} />;
}

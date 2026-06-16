import { TeamPageClient } from "./team-client";
import { client } from "@/sanity/client";
import { teamMembersQuery } from "@/sanity/queries";

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

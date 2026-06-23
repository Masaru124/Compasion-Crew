import { TeamPageClient } from "./team-client";
import { db } from "@/db";
import { teamMembers } from "@/db/schema";
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
    const list = await db.select().from(teamMembers);
    if (list && list.length > 0) {
      teamMembersData = list;
    }
  } catch (error) {
    console.error("Failed to fetch team members from Postgres:", error);
  }

  return <TeamPageClient initialTeamMembers={teamMembersData || undefined} />;
}

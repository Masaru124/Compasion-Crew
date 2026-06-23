import { RegisterClient } from "./register-client";
import { db } from "@/db";
import { events } from "@/db/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Registration - Secure Your Spot",
  description: "Register for COMPASSION CREW upcoming community events, expert talks, workshops, and volunteer activities across India.",
  keywords: ["community event registration", "expert talk sign up India", "volunteer service signup"],
  alternates: {
    canonical: "/register",
  }
};

export default async function RegisterPage() {
  let eventsData: any[] = [];
  
  try {
    const list = await db.select().from(events);
    // Filter to upcoming events where registration is open
    eventsData = list.filter((e: any) => !e.isPast && e.registrationOpen !== false);
  } catch (error) {
    console.error("Failed to fetch upcoming events for registration:", error);
  }

  return <RegisterClient initialEvents={eventsData} />;
}

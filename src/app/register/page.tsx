import { RegisterClient } from "./register-client";
import { client } from "@/sanity/client";
import { eventsQuery } from "@/sanity/queries";
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
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const data = await client.fetch(eventsQuery);
      if (data && data.length > 0) {
        // Filter to upcoming events where registration is open
        eventsData = data.filter((e: any) => !e.isPast && e.registrationOpen !== false);
      }
    }
  } catch (error) {
    console.error("Failed to fetch upcoming events for registration:", error);
  }

  return <RegisterClient initialEvents={eventsData} />;
}

import { EventsPageClient } from "./events-client";
import { client } from "@/sanity/client";
import { eventsQuery } from "@/sanity/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Community Events & Expert Talks",
  description: "Join our community expert talks, networking sessions, and volunteer service drives organized by COMPASSION CREW across India.",
  keywords: ["social impact events India", "expert talks Bangalore", "networking meetups Bangalore", "volunteering drives"],
  alternates: {
    canonical: "/events",
  }
};

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

const safeParseDate = (dateStr: string) => {
  try {
    const cleanDateStr = dateStr.split("-")[0].split("to")[0].trim();
    const parsed = new Date(cleanDateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0];
    }
  } catch (e) {
    // ignore parsing errors
  }
  return "2026-12-15";
};

export default async function EventsPage() {
  let eventsData = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const data = await client.fetch(eventsQuery);
      if (data && data.length > 0) {
        eventsData = data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch events from Sanity:", error);
  }

  const activeEvents = eventsData || [];

  const schemaData = activeEvents.map((event: any) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": safeParseDate(event.date),
    "eventAttendanceMode": event.location.toLowerCase().includes("zoom") || event.location.toLowerCase().includes("online") 
      ? "https://schema.org/OnlineEventAttendanceMode" 
      : "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": event.location.toLowerCase().includes("zoom") || event.location.toLowerCase().includes("online")
      ? {
          "@type": "VirtualLocation",
          "url": "https://www.compassioncrew.in/events"
        }
      : {
          "@type": "Place",
          "name": event.location,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": event.location.split(",").pop()?.trim() || "India",
            "addressCountry": "IN"
          }
        },
    "organizer": {
      "@type": "NGO",
      "name": "COMPASSION CREW",
      "url": "https://www.compassioncrew.in"
    }
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <EventsPageClient initialEvents={eventsData || []} />
    </>
  );
}

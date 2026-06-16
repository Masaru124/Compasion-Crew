import { EventsPageClient } from "./events-client";
import { client } from "@/sanity/client";
import { eventsQuery } from "@/sanity/queries";

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

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

  return <EventsPageClient initialEvents={eventsData || undefined} />;
}

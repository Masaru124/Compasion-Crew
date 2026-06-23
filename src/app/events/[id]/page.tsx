import { client } from "@/sanity/client";
import { eventByIdQuery } from "@/sanity/queries";
import { EventDetailClient } from "./event-detail-client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return [];
    }
    const events = await client.fetch(`*[_type == "event"] { _id }`);
    return events.map((ev: { _id: string }) => ({
      id: ev._id,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for events:", error);
    return [];
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  let event = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      event = await client.fetch(eventByIdQuery, { id });
    }
  } catch {
    console.error("Error fetching metadata for event page");
  }

  if (!event) {
    return {
      title: "Event Details | COMPASSION CREW",
    };
  }

  const title = `${event.title} | Event Details`;
  const description = event.description || "Join this community event organized by COMPASSION CREW.";

  return {
    title,
    description,
    alternates: {
      canonical: `/events/${id}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.compassioncrew.in/events/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params;
  let event = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      event = await client.fetch(eventByIdQuery, { id });
    }
  } catch (error) {
    console.error("Error fetching event details from Sanity:", error);
  }

  if (!event) {
    notFound();
  }

  const safeParseDate = (dateStr: string) => {
    try {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split("T")[0];
      }
    } catch {
      // ignore
    }
    return "2026-12-15";
  };

  const schemaData = {
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
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.compassioncrew.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Events",
        "item": "https://www.compassioncrew.in/events"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": event.title,
        "item": `https://www.compassioncrew.in/events/${id}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EventDetailClient event={event} />
    </>
  );
}

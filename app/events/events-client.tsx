"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Clock, Users, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  spots: number;
  image?: string | null;
  isPast?: boolean;
  registrationOpen?: boolean;
  details?: string | null;
  gallery?: string[] | null;
}

// Date & Time Formatting Helpers
const formatEventDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  } catch {}
  return dateStr;
};

const formatEventTime = (timeStr: string) => {
  try {
    const clean = timeStr.trim().toLowerCase();
    if (clean.includes("am") || clean.includes("pm")) {
      return timeStr;
    }
    const [hoursStr, minutesStr] = clean.split(":");
    const hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutesStr} ${ampm}`;
  } catch {
    return timeStr;
  }
};

const formatEventTimeRange = (timeRangeStr: string) => {
  if (!timeRangeStr) return "";
  const parts = timeRangeStr.split(" - ");
  if (parts.length === 2) {
    return `${formatEventTime(parts[0])} - ${formatEventTime(parts[1])}`;
  }
  return formatEventTime(timeRangeStr);
};

const getCategoryVariant = (category: string) => {
  const variants: Record<
    string,
    "default" | "accent" | "success" | "warning" | "secondary" | "outline"
  > = {
    "Expert Talk": "accent",
    "Community Meetup": "default",
    "Service Drive": "warning",
    Campaign: "success",
    Workshop: "secondary",
  };
  return variants[category] || "default";
};

interface EventsPageClientProps {
  initialEvents: EventItem[];
}

export function EventsPageClient({ initialEvents }: EventsPageClientProps) {
  const displayEvents = initialEvents || [];
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // Group events
  const upcomingEvents = displayEvents.filter((event) => !event.isPast);
  const pastEvents = displayEvents.filter((event) => event.isPast);
  const currentList = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const getEventImageUrl = (img: string | null | undefined) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    return null;
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="">
        <div className="mx-auto max-w-6xl px-6 pt-24 lg:pt-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl leading-tight font-bold tracking-tight text-gray-950 lg:text-6xl">
              Our Events
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Join us for experiences that create impact. Learn, volunteer,
              collaborate, and create meaningful change together.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        {/* Tab Switcher */}
        <div className="mb-16 flex gap-4 border-b border-gray-200 pb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "upcoming"
                ? "border-b-2 border-gray-950 text-gray-950"
                : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Upcoming{" "}
            <span className="ml-2 text-xs text-gray-500">
              ({upcomingEvents.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "past"
                ? "border-b-2 border-gray-950 text-gray-950"
                : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Past Events{" "}
            <span className="ml-2 text-xs text-gray-500">
              ({pastEvents.length})
            </span>
          </button>
        </div>

        {/* Events Grid */}
        {currentList.length === 0 ? (
          <div className="py-24 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="mb-2 text-lg text-gray-600">No events found.</p>
            <p className="text-sm text-gray-500">
              Check back later for upcoming events.
            </p>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {currentList.map((event) => {
              const coverUrl = getEventImageUrl(event.image);
              const hasGallery = event.gallery && event.gallery.length > 0;
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group flex flex-col transition"
                >
                  {/* Event Cover Image */}
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-gray-100">
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <ImageIcon className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-gray-950 px-3 py-1 text-xs font-semibold text-white">
                        {event.category}
                      </span>
                    </div>
                    {/* Gallery Count */}
                    {hasGallery && (
                      <div className="absolute right-4 bottom-4 bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        +{event.gallery!.length} photos
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-grow flex-col">
                    {/* Title */}
                    <h3 className="mb-3 text-xl leading-snug font-light text-gray-950 lg:text-2xl">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 line-clamp-2 flex-grow text-sm leading-relaxed text-gray-600">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="mb-6 space-y-2 border-t border-gray-200 pt-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatEventDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{formatEventTimeRange(event.time)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      {!event.isPast && (
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{event.spots} spots available</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div>
                      {event.isPast ? (
                        <button className="inline-flex items-center gap-2 text-xs font-semibold text-gray-950">
                          View Recap
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      ) : event.registrationOpen ? (
                        <button className="inline-flex items-center gap-2 text-xs font-semibold text-gray-950">
                          Register Now
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-gray-400">
                          Registration Closed
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

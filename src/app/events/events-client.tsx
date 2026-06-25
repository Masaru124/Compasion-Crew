"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  const variants: Record<string, "default" | "accent" | "success" | "warning" | "secondary" | "outline"> = {
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
    <div className="planner-bg min-h-screen pb-24">
      {/* Hero Header */}
      <section className="pt-32 pb-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
              Events & Programmes
            </span>
            <h1 className="font-heading text-fluid-hero text-foreground mb-6 tracking-tight">
              Community Events, Expert Talks & Volunteer Drives
            </h1>
            <p className="text-muted-foreground">
              From high-impact expert talk sessions to hands-on volunteer campaigns and local action meetups — find out what is coming up next or explore details from past events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="pb-12">
        <div className="section-container flex justify-center">
          <div className="flex rounded-xl bg-card border border-border p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "upcoming"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Upcoming ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "past"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Past / Recap ({pastEvents.length})
            </button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section>
        <div className="section-container">
          {currentList.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-2xl shadow-sm max-w-xl mx-auto">
              <Calendar className="w-12 h-12 text-muted-foreground/30 mb-4 mx-auto" />
              <p className="text-muted-foreground font-medium">No events found in this category.</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Check back later or explore other sections.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentList.map((event, index) => {
                const coverUrl = getEventImageUrl(event.image);
                const hasGallery = event.gallery && event.gallery.length > 0;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
                  >
                    {/* Event Cover Image */}
                    <Link
                      href={`/events/${event.id}`}
                      className="h-48 relative bg-muted flex items-center justify-center text-muted-foreground overflow-hidden cursor-pointer block"
                    >
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-terracotta/10 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 opacity-25" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge variant={getCategoryVariant(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                      {hasGallery && (
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[9px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                          + {event.gallery!.length} Photos
                        </div>
                      )}
                    </Link>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-heading text-xl font-medium text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/events/${event.id}`}>
                          {event.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
                        {event.description}
                      </p>

                      {/* Icon stats */}
                      <div className="space-y-2 mb-6 border-t border-b border-border/50 py-4">
                        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                          <Calendar className="w-4 h-4 text-terracotta shrink-0" />
                          <span>{formatEventDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                          <Clock className="w-4 h-4 text-terracotta shrink-0" />
                          <span>{formatEventTimeRange(event.time)}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                          <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        {!event.isPast && (
                          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                            <Users className="w-4 h-4 text-terracotta shrink-0" />
                            <span>{event.spots} spots available</span>
                          </div>
                        )}
                      </div>

                      {/* CTAs */}
                      <div className="space-y-2">
                        {event.isPast ? (
                          <Link
                            href={`/events/${event.id}`}
                            className="w-full block"
                            aria-label={`View recap and details for event: ${event.title}`}
                          >
                            <Button variant="secondary" className="w-full text-xs h-10">
                              View Recap & Details
                            </Button>
                          </Link>
                        ) : (
                          <div className="flex gap-2">
                            <Link
                              href={`/events/${event.id}`}
                              className="flex-1 block"
                              aria-label={`View details for event: ${event.title}`}
                            >
                              <Button variant="outline" className="w-full text-xs h-10">
                                View Details
                              </Button>
                            </Link>
                            {event.registrationOpen ? (
                              <Link
                                href={`/register?event=${event.id}`}
                                className="flex-1 block"
                                aria-label={`Register for event: ${event.title}`}
                              >
                                <Button className="w-full text-xs h-10">
                                  Register
                                </Button>
                              </Link>
                            ) : (
                              <Button disabled className="flex-1 text-xs h-10">
                                Closed
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

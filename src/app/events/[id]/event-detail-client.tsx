/* eslint-disable @typescript-eslint/no-explicit-any -- Sanity image builders and event objects use weakly typed schemas */
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Link2
} from "lucide-react";
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
  image?: any;
  isPast?: boolean;
  registrationOpen?: boolean;
  details?: string | null;
  gallery?: any[] | null;
}

interface EventDetailClientProps {
  event: EventItem;
}

// Formatting Helpers
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
  } catch {
    // ignore
  }
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

export function EventDetailClient({ event }: EventDetailClientProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const timer = setTimeout(() => {
        setShareUrl(currentUrl);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const getImageUrl = (img: any) => {
    if (!img) return null;
    if (typeof img === "string") return img;
    return null;
  };

  const imagesList = useMemo(() => {
    const list: string[] = [];
    const coverUrl = getImageUrl(event.image);
    if (coverUrl) list.push(coverUrl);

    if (event.gallery && event.gallery.length > 0) {
      event.gallery.forEach((img) => {
        const url = getImageUrl(img);
        if (url && !list.includes(url)) {
          list.push(url);
        }
      });
    }
    return list;
  }, [event.image, event.gallery]);

  const handlePrevSlide = () => {
    if (imagesList.length === 0) return;
    setCarouselIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleNextSlide = () => {
    if (imagesList.length === 0) return;
    setCarouselIndex((prev) => (prev + 1) % imagesList.length);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="planner-bg min-h-screen">
      {/* Back link */}
      <div className="pt-28">
        <div className="section-container max-w-[1000px] px-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group mb-6"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Events
          </Link>
        </div>
      </div>

      <section className="pb-24">
        <div className="section-container max-w-[1000px] px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side detail info block */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Event category and title */}
              <div>
                <Badge variant={getCategoryVariant(event.category)} className="py-1 px-3 mb-3 text-xs uppercase tracking-wide">
                  {event.category}
                </Badge>
                <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-tight">
                  {event.title}
                </h1>
              </div>

              {/* Main Media Gallery Carousel */}
              <div className="relative h-64 md:h-[420px] w-full rounded-2xl overflow-hidden border border-border/80 shadow-md bg-muted">
                {imagesList.length > 0 ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={imagesList[carouselIndex]}
                      alt={`${event.title} - view ${carouselIndex + 1}`}
                      fill
                      priority
                      className="object-cover"
                    />

                    {/* Carousel navigation controls */}
                    {imagesList.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevSlide}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                          title="Previous Image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleNextSlide}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                          title="Next Image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Indicator count */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                          {carouselIndex + 1} / {imagesList.length}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-terracotta/10 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 opacity-25" />
                  </div>
                )}
              </div>

              {/* Overview & detailed explanation */}
              <div className="space-y-4 pt-4">
                <h3 className="font-heading text-lg font-medium text-foreground tracking-tight border-b border-border/50 pb-2">
                  Event Overview
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              {event.details && (
                <div className="space-y-4 pt-4">
                  <h3 className="font-heading text-lg font-medium text-foreground tracking-tight border-b border-border/50 pb-2">
                    {event.isPast ? "Event Recap & Outcomes" : "Important Details"}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
                    {event.details}
                  </p>
                </div>
              )}
            </div>

            {/* Right side static/sticky widget panel */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              
              {/* Details card widget */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-5">
                <h4 className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase pb-2 border-b border-border">
                  Event Details
                </h4>

                <div className="space-y-4 text-sm">
                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Date</span>
                      <span className="text-foreground font-semibold">{formatEventDate(event.date)}</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Time</span>
                      <span className="text-foreground font-semibold">{formatEventTimeRange(event.time)}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-mono block">Location</span>
                      <span className="text-foreground font-semibold leading-normal">{event.location}</span>
                    </div>
                  </div>

                  {/* Spots */}
                  {!event.isPast && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-mono block">Availability</span>
                        <span className="text-foreground font-semibold">{event.spots} spots available</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Event State / Registration CTA */}
                <div className="pt-2">
                  {event.isPast ? (
                    <Button disabled className="w-full h-11 text-xs uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-muted-foreground">
                      Past Event Recap
                    </Button>
                  ) : event.registrationOpen ? (
                    <Link href={`/register?event=${event.id}`} className="block w-full">
                      <Button className="w-full h-11 text-xs uppercase tracking-wider font-semibold">
                        Register to Event
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full h-11 text-xs uppercase tracking-wider text-destructive bg-destructive/5 border border-destructive/10">
                      Registration Closed
                    </Button>
                  )}
                </div>
              </div>

              {/* Share widget */}
              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
                <h4 className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase pb-2 border-b border-border">
                  Share Event
                </h4>
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs flex items-center justify-center gap-1.5"
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                  <a
                    href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
                      event.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-9 border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                    aria-label="Share on X"
                  >
                    <span className="font-mono text-xs font-bold">X</span>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-9 border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                    aria-label="Share on LinkedIn"
                  >
                    <span className="font-mono text-xs font-bold">in</span>
                  </a>
                </div>
              </div>

              {/* General CTA sidebar box */}
              <div className="bg-primary text-primary-foreground p-6 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-xl -mr-4 -mt-4" />
                <h4 className="font-heading text-base font-semibold mb-2">Want to serve?</h4>
                <p className="text-xs text-primary-foreground/80 leading-relaxed mb-4">
                  Become a volunteer today to learn, connect, and take meaningful action for communities.
                </p>
                <Link href="/volunteer">
                  <Button variant="secondary" size="sm" className="w-full text-xs font-medium">
                    Become a Volunteer
                  </Button>
                </Link>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

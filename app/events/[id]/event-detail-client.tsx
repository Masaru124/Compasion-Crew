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
  Link2,
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
    setCarouselIndex(
      (prev) => (prev - 1 + imagesList.length) % imagesList.length,
    );
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
    <div className="w-full">
      {/* Back Navigation */}
      <div className="border-b mt-20 border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-950"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-4">
            <span className="inline-block bg-gray-950 px-3 py-1 text-xs font-semibold text-white">
              {event.category}
            </span>
          </div>
          <h1 className="text-4xl leading-tight font-light tracking-tight text-gray-950 lg:text-5xl">
            {event.title}
          </h1>
        </div>

        {/* Image Gallery */}
        <div className="mb-16">
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
            {imagesList.length > 0 ? (
              <div className="relative h-full w-full">
                <Image
                  src={imagesList[carouselIndex]}
                  alt={`${event.title} - view ${carouselIndex + 1}`}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Carousel Navigation */}
                {imagesList.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevSlide}
                      className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                      title="Previous Image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                      title="Next Image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {carouselIndex + 1} / {imagesList.length}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <ImageIcon className="h-12 w-12 text-gray-300" />
              </div>
            )}
          </div>
        </div>

        {/* Content & Details Grid */}
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Left Content */}
          <div className="space-y-12 lg:col-span-2">
            {/* Overview */}
            <section>
              <h2 className="mb-6 border-b border-gray-200 pb-4 text-lg font-medium text-gray-950">
                Overview
              </h2>
              <p className="text-base leading-relaxed whitespace-pre-line text-gray-600">
                {event.description}
              </p>
            </section>

            {/* Details */}
            {event.details && (
              <section>
                <h2 className="mb-6 border-b border-gray-200 pb-4 text-lg font-medium text-gray-950">
                  {event.isPast
                    ? "Event Recap & Outcomes"
                    : "Important Details"}
                </h2>
                <p className="text-base leading-relaxed whitespace-pre-line text-gray-600">
                  {event.details}
                </p>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-8">
            {/* Event Details Card */}
            <div className="border-t border-gray-200 pt-0 lg:border-t-0 lg:pt-0">
              <div className="space-y-6">
                {/* Date */}
                <div>
                  <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Date
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-base font-medium text-gray-950">
                      {formatEventDate(event.date)}
                    </span>
                  </div>
                </div>

                {/* Time */}
                <div>
                  <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Time
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-base font-medium text-gray-950">
                      {formatEventTimeRange(event.time)}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Location
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-gray-400" />
                    <span className="text-base font-medium text-gray-950">
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Availability */}
                {!event.isPast && (
                  <div>
                    <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                      Availability
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-base font-medium text-gray-950">
                        {event.spots} spots available
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="border-t border-gray-200 pt-8">
              {event.isPast ? (
                <button
                  disabled
                  className="w-full bg-gray-100 px-6 py-3 text-sm font-medium text-gray-400"
                >
                  Past Event Recap
                </button>
              ) : event.registrationOpen ? (
                <Link
                  href={`/register?event=${event.id}`}
                  className="block w-full"
                >
                  <Button>Register Now</Button>
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-100 px-6 py-3 text-sm font-medium text-gray-400"
                >
                  Registration Closed
                </button>
              )}
            </div>

            {/* Share Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="mb-4 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Share
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-950 transition hover:bg-gray-50"
                >
                  {copied ? "Copied!" : "Copy Link"}
                </button>
                <a
                  href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
                    event.title,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-10 items-center justify-center border border-gray-300 bg-white text-xs font-bold text-gray-950 transition hover:bg-gray-50"
                  aria-label="Share on X"
                >
                  X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-10 items-center justify-center border border-gray-300 bg-white text-xs font-bold text-gray-950 transition hover:bg-gray-50"
                  aria-label="Share on LinkedIn"
                >
                  in
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

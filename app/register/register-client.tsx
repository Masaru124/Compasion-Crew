"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Send,
  ExternalLink,
  Sparkles,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  category?: string | null;
  time?: string | null;
  spots?: number | null;
  image?: string | null;
  registrationUrl?: string | null;
  details?: string | null;
  description?: string | null;
}

function RegisterContent({ initialEvents = [] }: { initialEvents?: EventItem[] }) {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");

  const [selectedEvent, setSelectedEvent] = useState<string>(
    eventId || (initialEvents.length === 1 ? initialEvents[0].id : "")
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectedEventData = initialEvents.find((e) => e.id === selectedEvent);

  if (isSubmitted) {
    return (
      <section className="pt-32 pb-24 min-h-screen">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-xl shadow-sm p-8 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-5 bg-success/10 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <h2 className="font-heading text-xl font-medium text-foreground mb-4 tracking-tight">
              Registration Confirmed!
            </h2>
            <p className="text-muted-foreground mb-8">
              Thank you for registering. We&apos;ve sent a confirmation email with all the details.
              We look forward to seeing you at the event!
            </p>
            <Link href="/events">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
          <h1 className="font-heading text-fluid-hero text-foreground mb-4 tracking-tight">
            Event Registration
          </h1>
          <p className="text-muted-foreground">
            Complete your registration to secure your spot at our upcoming event.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            {selectedEventData?.registrationUrl ? (
              <div className="bg-card border border-border rounded-xl shadow-sm p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="event-select">Selected Event</Label>
                  <select
                    id="event-select"
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="h-12 w-full min-w-0 rounded-xl border border-input bg-white px-3 py-2 text-sm text-foreground transition-all outline-none appearance-none cursor-pointer focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-muted/50"
                  >
                    <option value="">Choose an event</option>
                    {initialEvents.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title} {event.registrationUrl ? "(External Form)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-900 dark:text-amber-200 mb-1">
                        Official External Registration
                      </span>
                      <h3 className="font-heading text-lg font-medium text-foreground">
                        Registration for {selectedEventData.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        Registration and team roster submissions for this event are hosted via the official Google Form portal.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-amber-500/20 pt-4 space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">Registration Steps:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Click the button below to open the official Google registration form in a new tab.</li>
                      <li>Fill out team details, participant information, and institutional details.</li>
                      <li>Complete the registration fee payment process outlined in the form.</li>
                      <li>Submit transaction reference details to confirm your team&apos;s spot.</li>
                    </ul>
                  </div>

                  <a
                    href={selectedEventData.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block pt-2"
                  >
                    <Button size="xl" className="w-full flex items-center justify-center gap-2 text-base">
                      <span>Open Official Google Registration Form</span>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Need assistance? Contact our team at{" "}
                  <a href="mailto:compasioncrew@gmail.com" className="text-primary underline">
                    compasioncrew@gmail.com
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl shadow-sm p-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" required placeholder="Enter your full name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required placeholder="Enter your email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" required placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event">Select Event *</Label>
                  <select
                    id="event"
                    required
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="h-12 w-full min-w-0 rounded-xl border border-input bg-white px-3 py-2 text-sm text-foreground transition-all outline-none appearance-none cursor-pointer focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-muted/50"
                  >
                    <option value="">Choose an event</option>
                    {initialEvents.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title} {event.registrationUrl ? "(External Form)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Any special requirements or questions?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="xl"
                  className="w-full"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Complete Registration
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-card border border-border rounded-xl shadow-sm p-8 sticky top-32">
              <h3 className="font-heading text-xl font-medium text-foreground mb-6 tracking-tight">
                {selectedEventData ? "Event Details" : "Select an Event"}
              </h3>

              {selectedEventData ? (
                <div className="space-y-4">
                  <div className="pb-4 border-b border-border">
                    <h4 className="font-medium text-foreground mb-1">{selectedEventData.title}</h4>
                    {selectedEventData.category && (
                      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {selectedEventData.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-terracotta shrink-0" />
                    <span>{selectedEventData.date}</span>
                  </div>
                  {selectedEventData.time && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-terracotta shrink-0" />
                      <span>{selectedEventData.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                    <span>{selectedEventData.location}</span>
                  </div>
                  {selectedEventData.registrationUrl ? (
                    <div className="pt-4 border-t border-border mt-4 space-y-3">
                      <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-800 dark:text-amber-300">
                        ⚡ <strong>External Registration:</strong> Registration for this event is conducted on Google Forms.
                      </div>
                      <a
                        href={selectedEventData.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button variant="outline" className="w-full text-xs flex items-center justify-center gap-1.5">
                          <span>Open Google Form</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </a>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-border mt-4">
                      <p className="text-sm text-muted-foreground">
                        We will send a confirmation email with complete event details including timing and any items to bring.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Choose an event from the dropdown to see details here.
                  </p>
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground text-sm mb-2">Why Attend?</h4>
                    <ul className="text-muted-foreground text-sm space-y-1.5">
                      <li>&bull; Connect with like-minded individuals</li>
                      <li>&bull; Learn about our impact firsthand</li>
                      <li>&bull; Contribute to meaningful causes</li>
                      <li>&bull; Get involved with our programs</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface RegisterClientProps {
  initialEvents?: EventItem[];
}

export function RegisterClient({ initialEvents }: RegisterClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <RegisterContent initialEvents={initialEvents} />
    </Suspense>
  );
}

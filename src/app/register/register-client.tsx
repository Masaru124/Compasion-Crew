"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Calendar, MapPin, CheckCircle, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface EventItem {
  _id: string;
  title: string;
  date: string;
  location: string;
}

function RegisterContent({ initialEvents = [] }: { initialEvents?: EventItem[] }) {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");

  const [selectedEvent, setSelectedEvent] = useState<string>(eventId || "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectedEventData = initialEvents.find((e) => e._id === selectedEvent);

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
            Complete the form below to secure your spot at our upcoming event.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
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
                    <option key={event._id} value={event._id}>
                      {event.title}
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
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-terracotta shrink-0" />
                    <span>{selectedEventData.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                    <span>{selectedEventData.location}</span>
                  </div>
                  <div className="pt-4 border-t border-border mt-4">
                    <p className="text-sm text-muted-foreground">
                      We will send a confirmation email with complete event details including timing and any items to bring.
                    </p>
                  </div>
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

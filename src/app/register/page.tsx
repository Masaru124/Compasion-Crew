"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Calendar, MapPin, Clock, CheckCircle, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const events = [
  { id: 1, title: "Annual Fundraising Gala", date: "December 15, 2024", location: "Taj Mahal Palace, Mumbai" },
  { id: 2, title: "Women Empowerment Workshop", date: "November 20, 2024", location: "Community Center, Delhi" },
  { id: 3, title: "Animal Adoption Drive", date: "December 5, 2024", location: "CAMPASION Animal Shelter, Pune" },
  { id: 4, title: "Children's Education Camp", date: "January 10-16, 2025", location: "Rural School, Rajasthan" },
  { id: 5, title: "Volunteer Training Program", date: "December 1, 2024", location: "Online (Zoom)" },
  { id: 6, title: "Clean Water Initiative Launch", date: "November 30, 2024", location: "Village Square, Maharashtra" },
];

function RegisterContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");
  
  const [selectedEvent, setSelectedEvent] = useState<string>(eventId || "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectedEventData = events.find((e) => e.id.toString() === selectedEvent);

  if (isSubmitted) {
    return (
      <section className="pt-32 pb-24 bg-[#FAF7F2] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-10 md:p-16 text-center shadow-sm"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-[#2D5A3D]/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#2D5A3D]" />
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-semibold text-[#2C2416] mb-4">
              Registration Confirmed!
            </h2>
            <p className="text-[#6B5B4F] text-lg mb-8">
              Thank you for registering. We've sent a confirmation email with all the details. 
              We look forward to seeing you at the event!
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 bg-[#2D5A3D] hover:bg-[#1F3D2A] text-white font-medium px-8 py-4 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-[#6B5B4F] hover:text-[#2D5A3D] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-[#2C2416] mb-4">
            Event Registration
          </h1>
          <p className="text-lg text-[#6B5B4F]">
            Complete the form below to secure your spot at our upcoming event.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#2C2416] font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  required
                  placeholder="Enter your full name"
                  className="border-[#E5DDD3] focus:border-[#2D5A3D] focus:ring-[#2D5A3D] rounded-xl h-12"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2C2416] font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="border-[#E5DDD3] focus:border-[#2D5A3D] focus:ring-[#2D5A3D] rounded-xl h-12"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#2C2416] font-medium">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className="border-[#E5DDD3] focus:border-[#2D5A3D] focus:ring-[#2D5A3D] rounded-xl h-12"
                />
              </div>

              {/* Event Selection */}
              <div className="space-y-2">
                <Label htmlFor="event" className="text-[#2C2416] font-medium">
                  Select Event *
                </Label>
                <select
                  id="event"
                  required
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full h-12 px-4 border border-[#E5DDD3] rounded-xl focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] outline-none bg-white text-[#2C2416]"
                >
                  <option value="">Choose an event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[#2C2416] font-medium">
                  Message (Optional)
                </Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Any special requirements or questions?"
                  className="w-full px-4 py-3 border border-[#E5DDD3] rounded-xl focus:border-[#2D5A3D] focus:ring-1 focus:ring-[#2D5A3D] outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E07B39] hover:bg-[#C45C3E] text-white font-semibold py-6 rounded-xl text-base transition-all duration-300"
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

          {/* Event Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-[#2D5A3D] rounded-2xl p-8 text-white sticky top-32">
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold mb-6">
                {selectedEventData ? "Event Details" : "Select an Event"}
              </h3>
              
              {selectedEventData ? (
                <div className="space-y-4">
                  <div className="pb-4 border-b border-white/20">
                    <h4 className="font-semibold text-lg mb-1">{selectedEventData.title}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#F4A261]" />
                    <span>{selectedEventData.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#F4A261]" />
                    <span>{selectedEventData.location}</span>
                  </div>
                  <div className="pt-4 border-t border-white/20 mt-4">
                    <p className="text-white/80 text-sm">
                      We will send a confirmation email with complete event details including timing and any items to bring.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-white/80">
                    Choose an event from the dropdown to see details here.
                  </p>
                  <div className="pt-4 border-t border-white/20">
                    <h4 className="font-semibold mb-2">Why Attend?</h4>
                    <ul className="text-white/80 text-sm space-y-2">
                      <li>• Connect with like-minded individuals</li>
                      <li>• Learn about our impact firsthand</li>
                      <li>• Contribute to meaningful causes</li>
                      <li>• Get involved with our programs</li>
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

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}

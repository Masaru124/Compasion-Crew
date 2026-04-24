"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "Annual Fundraising Gala",
    description: "An evening of inspiration, stories, and celebration of our collective impact. Join us for dinner, performances, and the chance to support our mission.",
    date: "December 15, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Taj Mahal Palace, Mumbai",
    category: "Fundraiser",
    image: "gala",
    spots: 200,
  },
  {
    id: 2,
    title: "Women Empowerment Workshop",
    description: "A free skill development workshop for women focusing on entrepreneurship, digital literacy, and financial independence.",
    date: "November 20, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Community Center, Delhi",
    category: "Workshop",
    image: "workshop",
    spots: 50,
  },
  {
    id: 3,
    title: "Animal Adoption Drive",
    description: "Meet rescued animals looking for forever homes. Our team will guide you through the adoption process and provide post-adoption support.",
    date: "December 5, 2024",
    time: "11:00 AM - 5:00 PM",
    location: "CAMPASION Animal Shelter, Pune",
    category: "Adoption",
    image: "adoption",
    spots: 100,
  },
  {
    id: 4,
    title: "Children's Education Camp",
    description: "A week-long educational camp for underprivileged children featuring interactive learning, arts, sports, and life skills.",
    date: "January 10-16, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Rural School, Rajasthan",
    category: "Education",
    image: "camp",
    spots: 150,
  },
  {
    id: 5,
    title: "Volunteer Training Program",
    description: "Comprehensive training for new volunteers covering our programs, values, safety protocols, and effective community engagement.",
    date: "December 1, 2024",
    time: "9:00 AM - 1:00 PM",
    location: "Online (Zoom)",
    category: "Training",
    image: "training",
    spots: 100,
  },
  {
    id: 6,
    title: "Clean Water Initiative Launch",
    description: "Join us as we inaugurate 25 new water purification systems in drought-affected villages. Light refreshments will be served.",
    date: "November 30, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Village Square, Maharashtra",
    category: "Launch",
    image: "water",
    spots: 75,
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Fundraiser: "bg-[#E07B39]",
    Workshop: "bg-[#2D5A3D]",
    Adoption: "bg-[#C45C3E]",
    Education: "bg-[#3D7A52]",
    Training: "bg-[#8B7355]",
    Launch: "bg-[#D4A574]",
  };
  return colors[category] || "bg-[#6B5B4F]";
};

export default function EventsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-[#E07B39] font-medium text-sm tracking-wider uppercase">
              Events
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-[#2C2416] mt-4 mb-6">
              Join Us in Making a Difference
            </h1>
            <p className="text-lg text-[#6B5B4F] leading-relaxed">
              From fundraising galas to community workshops, our events bring together 
              passionate individuals committed to creating positive change.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-[#FAF7F2] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-[#2D5A3D] to-[#3D7A52] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white/60">
                      <span className="text-lg font-medium">{event.image}</span>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`${getCategoryColor(event.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2C2416] mb-3 group-hover:text-[#E07B39] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-[#6B5B4F] text-sm leading-relaxed mb-4 flex-1">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-[#6B5B4F]">
                        <Calendar className="w-4 h-4 text-[#E07B39]" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6B5B4F]">
                        <Clock className="w-4 h-4 text-[#E07B39]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6B5B4F]">
                        <MapPin className="w-4 h-4 text-[#E07B39]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6B5B4F]">
                        <Users className="w-4 h-4 text-[#E07B39]" />
                        <span>{event.spots} spots available</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/register?event=${event.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full bg-[#2D5A3D] hover:bg-[#1F3D2A] text-white font-medium py-3 rounded-xl transition-colors group/btn"
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

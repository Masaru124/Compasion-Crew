"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const events = [
  {
    id: 1,
    title: "Annual Fundraising Gala",
    description: "An evening of inspiration, stories, and celebration of our collective impact.",
    date: "December 15, 2024",
    time: "6:00 PM - 10:00 PM",
    location: "Taj Mahal Palace, Mumbai",
    category: "Fundraiser",
    spots: 200,
  },
  {
    id: 2,
    title: "Women Empowerment Workshop",
    description: "A free skill development workshop focusing on entrepreneurship and digital literacy.",
    date: "November 20, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Community Center, Delhi",
    category: "Workshop",
    spots: 50,
  },
  {
    id: 3,
    title: "Animal Adoption Drive",
    description: "Meet rescued animals looking for forever homes with guidance from our team.",
    date: "December 5, 2024",
    time: "11:00 AM - 5:00 PM",
    location: "CAMPASION Animal Shelter, Pune",
    category: "Adoption",
    spots: 100,
  },
  {
    id: 4,
    title: "Children's Education Camp",
    description: "A week-long educational camp featuring interactive learning, arts, and sports.",
    date: "January 10-16, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Rural School, Rajasthan",
    category: "Education",
    spots: 150,
  },
  {
    id: 5,
    title: "Volunteer Training Program",
    description: "Comprehensive training covering our programs, values, and community engagement.",
    date: "December 1, 2024",
    time: "9:00 AM - 1:00 PM",
    location: "Online (Zoom)",
    category: "Training",
    spots: 100,
  },
  {
    id: 6,
    title: "Clean Water Initiative Launch",
    description: "Inauguration of 25 new water purification systems in drought-affected villages.",
    date: "November 30, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Village Square, Maharashtra",
    category: "Launch",
    spots: 75,
  },
];

const getCategoryVariant = (category: string) => {
  const variants: Record<string, "default" | "accent" | "success" | "warning" | "secondary" | "outline"> = {
    Fundraiser: "accent",
    Workshop: "default",
    Adoption: "warning",
    Education: "success",
    Training: "secondary",
    Launch: "outline",
  };
  return variants[category] || "default";
};

export default function EventsPage() {
  return (
    <div className="planner-bg">
      <section className="pt-32 pb-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
              Events
            </span>
            <h1 className="font-heading text-fluid-hero text-foreground mb-6 tracking-tight">
              Join Us in Making a Difference
            </h1>
            <p className="text-muted-foreground">
              From fundraising galas to community workshops, our events bring together
              passionate individuals committed to creating positive change.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-heading text-xl font-medium text-foreground tracking-tight">
                      {event.title}
                    </h3>
                    <Badge variant={getCategoryVariant(event.category)} className="flex-shrink-0">
                      {event.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-terracotta shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-terracotta shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-terracotta shrink-0" />
                      <span>{event.spots} spots available</span>
                    </div>
                  </div>

                  <Link href={`/register?event=${event.id}`}>
                    <Button className="w-full">
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

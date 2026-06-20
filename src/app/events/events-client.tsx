"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventItem {
  id: number | string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  spots: number;
}

const defaultEvents: EventItem[] = [
  {
    id: 1,
    title: "Expert Talk: Inspiring Social Changemakers",
    description: "Join us for an inspiring session with social leaders sharing practical knowledge on sustainable development and social entrepreneurship.",
    date: "October 10, 2026",
    time: "5:00 PM - 7:00 PM",
    location: "National Institute of Design, Bangalore",
    category: "Expert Talk",
    spots: 150,
  },
  {
    id: 2,
    title: "Community Connection: Local Action Meetup",
    description: "An interactive networking event to exchange ideas, connect with fellow changemakers, and discuss grassroots collaboration.",
    date: "November 14, 2026",
    time: "4:00 PM - 6:30 PM",
    location: "Community Center, Indiranagar, Bangalore",
    category: "Community Meetup",
    spots: 80,
  },
  {
    id: 3,
    title: "Volunteer Service Drive: Youth Mentorship Camp",
    description: "Contribute your time and skills by mentoring children from underserved communities in basic digital and creative skills.",
    date: "December 5, 2026",
    time: "10:00 AM - 3:00 PM",
    location: "Government High School, Bangalore",
    category: "Service Drive",
    spots: 50,
  },
  {
    id: 4,
    title: "Social Awareness Campaign: Sustainable Living",
    description: "A public campaign promoting sustainable lifestyle practices, zero-waste initiatives, and ecological responsibility.",
    date: "December 20, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Cubbon Park, Bangalore",
    category: "Campaign",
    spots: 120,
  },
  {
    id: 5,
    title: "Compassion Project Planning Workshop",
    description: "Co-create our future compassion initiatives focusing on child support, education assistance, and senior citizen welfare.",
    date: "January 15, 2027",
    time: "11:00 AM - 1:30 PM",
    location: "Online (Zoom)",
    category: "Workshop",
    spots: 250,
  },
];

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
  initialEvents?: EventItem[];
}

export function EventsPageClient({ initialEvents }: EventsPageClientProps) {
  const displayEvents = initialEvents || defaultEvents;

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
            {displayEvents.map((event, index) => (
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

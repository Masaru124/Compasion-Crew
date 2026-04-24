"use client";

import { motion } from "framer-motion";
import { Users, Calendar, MapPin, Heart, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const opportunities = [
  {
    title: "Teaching Assistant",
    description: "Help children with their studies at our education centers.",
    commitment: "4 hours/week",
    location: "Multiple cities",
    icon: Users,
  },
  {
    title: "Animal Caretaker",
    description: "Feed, clean, and care for rescued animals at our shelters.",
    commitment: "Weekends",
    location: "Pune, Mumbai",
    icon: Heart,
  },
  {
    title: "Women Skills Trainer",
    description: "Teach vocational skills like tailoring, crafts, or digital literacy.",
    commitment: "Flexible",
    location: "Rural centers",
    icon: Users,
  },
  {
    title: "Event Coordinator",
    description: "Help organize fundraising and community events.",
    commitment: "Project-based",
    location: "Pan-India",
    icon: Calendar,
  },
];

export default function VolunteerPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-[#2D5A3D]/10 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-[#2D5A3D]" />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-[#2C2416] mb-6">
              Join Our Volunteer Family
            </h1>
            <p className="text-lg text-[#6B5B4F] leading-relaxed">
              Your time and skills can transform lives. Join our community of 500+ 
              volunteers making a real difference across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-[#E07B39] font-medium text-sm tracking-wider uppercase">
              Opportunities
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2C2416] mt-4">
              Ways to Contribute
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#FAF7F2] rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#2D5A3D]/10 rounded-xl flex items-center justify-center mb-6">
                  <opp.icon className="w-7 h-7 text-[#2D5A3D]" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2C2416] mb-3">
                  {opp.title}
                </h3>
                <p className="text-[#6B5B4F] mb-6">{opp.description}</p>
                <div className="flex items-center gap-4 text-sm text-[#6B5B4F]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#E07B39]" />
                    {opp.commitment}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#E07B39]" />
                    {opp.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#2D5A3D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Whether you have a few hours a week or can commit to regular volunteering, 
              we have a place for you in our mission.
            </p>
            <Link href="/register?event=5">
              <Button className="bg-[#E07B39] hover:bg-[#C45C3E] text-white font-semibold px-10 py-6 rounded-full text-lg">
                Apply to Volunteer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

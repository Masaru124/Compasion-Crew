"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gmail, LinkedIn } from "developer-icons";

interface TeamMemberItem {
  name: string;
  role: string;
  bio: string;
  linkedin?: string | null;
  x?: string | null;
  email?: string | null;
}

const defaultTeamMembers: TeamMemberItem[] = [
  {
    name: "Khushi Kalpesh Joshi",
    role: "Founder & Director",
    bio: "Founder of COMPASSION CREW. Dedicated to building a compassionate society, connecting students, professionals, and leaders across India to drive social impact.",
  },
  {
    name: "Bharath S",
    role: "Head of Programs",
    bio: "Development professional specializing in education and women's empowerment programs.",
  },
  {
    name: "Bichitra Behera",
    role: "Full-Stack Developer",
    bio: "Full-stack developer building scalable web products with a focus on clean architecture, performance, and developer experience.",
    linkedin: "https://linkedin.com/in/bichitrabehera",
    email: "bichitrabehera.345@gmail.com",
  },
  {
    name: "Shivnandan Tiwari",
    role: "Community & Events Lead",
    bio: "Building technology, communities, and opportunities - one project, one event, and one connection at a time.",
    linkedin: "https://linkedin.com/in/shivnandan-1303st",
    email: "shivnandantiwati1303@gmail.com",
  },
  {
    name: "Ravikiran T S",
    role: "Operations Lead",
    bio: "Someone who shows up, gives fully, and leaves things better than they found them.",
    linkedin: "https://www.linkedin.com/in/ravikiran-t-s-32078125a/",
    email: "ravikirantsrk@gmail.com",
  },
  {
    name: "Matharishwa",
    role: "Volunteer Coordinator",
    bio: "Community builder managing our network of 500+ volunteers across 15 states.",
  },
];

interface TeamPageClientProps {
  initialTeamMembers?: TeamMemberItem[];
}

export function TeamPageClient({ initialTeamMembers }: TeamPageClientProps) {
  const displayTeamMembers = initialTeamMembers || defaultTeamMembers;

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
              Our Team
            </span>
            <h1 className="font-heading text-fluid-hero text-foreground mb-6 tracking-tight">
              Our NGO Coordinators & Volunteer Organizers
            </h1>
            <p className="text-muted-foreground">
              Meet the dedicated individuals who work tirelessly to make our
              vision a reality. Each team member brings unique expertise and
              boundless compassion to our cause.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTeamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-card border border-border rounded shadow-sm p-8"
              >
                <div className="w-12 h-12 mx-auto mb-5 rounded bg-primary/10 flex items-center justify-center text-primary font-heading text-xl font-medium">
                  {member.name.charAt(0)}
                </div>

                <div className="text-center">
                  <h3 className="font-heading text-xl font-medium text-foreground mb-1 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-terracotta font-medium text-sm mb-4">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-6">
                    {member.bio}
                  </p>

                  <div className="flex justify-center gap-2">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded flex items-center justify-center hover:bg-neutral-100 hover:text-primary-foreground transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedIn className="h-4 w-4" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={member.email.startsWith("mailto:") ? member.email : `mailto:${member.email}`}
                        className="w-9 h-9 rounded flex items-center justify-center hover:bg-neutral-100 hover:text-primary-foreground transition-colors"
                        aria-label="Email"
                      >
                        <Gmail className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-fluid-section text-primary-foreground mb-4 tracking-tight">
              Join Our NGO Team in Bangalore
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              We&apos;re always looking for passionate individuals who want to
              make a difference. Whether you&apos;re a professional or a
              volunteer, there&apos;s a place for you here.
            </p>
            <Link href="/volunteer">
              <Button variant="secondary" size="xl">
                View Opportunities
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Gmail, LinkedIn } from "developer-icons";

interface TeamMemberItem {
  name: string;
  role: string;
  bio: string;
  linkedin?: string | null;
  x?: string | null;
  email?: string | null;
  image?: string | null;
}

const defaultTeamMembers: TeamMemberItem[] = [
  {
    name: "Khushi Kalpesh Joshi",
    role: "Founder & Director",
    bio: "Founder of COMPASSION CREW. Dedicated to building a compassionate society, connecting students, professionals, and leaders across India to drive social impact.",
    image: "/images/khushi.jpg",
  },
  {
    name: "Bharath S",
    role: "Marketing Lead",
    bio: "Strategic marketer driving outreach, community campaigns, and digital engagement to expand the reach and social impact of COMPASSION CREW.",
    image: "/images/bharath.jpeg",
  },
  {
    name: "Bichitra Behera",
    role: "Tech Lead",
    bio: "Full-stack developer building scalable web products with a focus on clean architecture, performance, and developer experience.",
    linkedin: "https://linkedin.com/in/bichitrabehera",
    email: "bichitrabehera.345@gmail.com",
    image: "/images/bichitra.png",
  },
  {
    name: "Shivnandan Tiwari",
    role: "Community & Events Lead",
    bio: "Building technology, communities, and opportunities - one project, one event, and one connection at a time.",
    linkedin: "https://linkedin.com/in/shivnandan-1303st",
    email: "shivnandantiwati1303@gmail.com",
    image: "/images/shivam.png",
  },
  {
    name: "Ravikiran T S",
    role: "Finance Lead",
    bio: "Someone who shows up, gives fully, and leaves things better than they found them.",
    linkedin: "https://www.linkedin.com/in/ravikiran-t-s-32078125a/",
    email: "ravikirantsrk@gmail.com",
    image: "/images/ravikiran.png",
  },
  {
    name: "Matharishwa",
    role: "CTO",
    bio: "Chief Technology Officer directing digital innovation, volunteer coordination portals, and regional tech enablement across India.",
    image: "/images/matha.jpeg",
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
              Our Coordinators & Volunteer Organizers
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
                className="group relative bg-card/40 backdrop-blur-md border border-border/80 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                {/* Vertical Photo Header — Matching Portrait Photos */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/40">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-muted-foreground bg-muted/40">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  {/* Overlay Blueprint Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 font-mono text-[10px] uppercase text-white/90">
                    COORD // SYS-0{index + 1}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-medium text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-terracotta font-mono text-xs uppercase tracking-wider font-semibold mt-1">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                      {member.bio}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-border/40 justify-start items-center mt-auto">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono uppercase tracking-wider"
                        aria-label="LinkedIn"
                      >
                        <LinkedIn className="h-4 w-4" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={member.email.startsWith("mailto:") ? member.email : `mailto:${member.email}`}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono uppercase tracking-wider"
                        aria-label="Email"
                      >
                        <Gmail className="h-4 w-4" />
                        <span>Email</span>
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
              Join Our Team in Bangalore
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

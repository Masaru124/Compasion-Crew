"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gmail, LinkedIn, XDark } from "developer-icons";

interface TeamMemberItem {
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  x?: string;
  email?: string;
}

const defaultTeamMembers: TeamMemberItem[] = [
  {
    name: "Khushi Kalpesh Joshi",
    role: "Co-Founder & COO",
    bio: "Operations expert with 10+ years in NGO management. Leads our ground initiatives across India.",
  },
  {
    name: "Dr. Arun Kumar",
    role: "Head of Programs",
    bio: "Development professional specializing in education and women's empowerment programs.",
  },
  {
    name: "Meera Singh",
    role: "Animal Welfare Director",
    bio: "Veterinarian and animal rights activist. Heads our rescue and rehabilitation centers.",
  },
  {
    name: "Vikram Desai",
    role: "Finance Director",
    bio: "CA with expertise in nonprofit financial management. Ensures transparency in all operations.",
  },
  {
    name: "Anjali Rao",
    role: "Communications Lead",
    bio: "Journalist turned communications expert. Tells our stories to inspire action.",
  },
  {
    name: "Rahul Menon",
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
              The People Behind Our Mission
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
                    {member.x && (
                      <a
                        href={member.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded flex items-center justify-center hover:bg-neutral-100 hover:text-primary-foreground transition-colors"
                        aria-label="X"
                      >
                        <XDark className="h-4 w-4" />
                      </a>
                    )}
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
              Join Our Team
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

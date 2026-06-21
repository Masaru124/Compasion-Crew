"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Eye, Lightbulb, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

const defaultMilestones: MilestoneItem[] = [
  { year: "2018", title: "Foundation", description: "COMPASSION CREW was founded with a mission to serve every life with dignity." },
  { year: "2019", title: "First State Expansion", description: "Extended operations to 5 states across India." },
  { year: "2020", title: "Pandemic Response", description: "Served 10,000+ families during COVID-19 crisis." },
  { year: "2021", title: "Women Centers", description: "Opened 10 skill development centers for women." },
  { year: "2022", title: "Animal Shelter", description: "Established our first dedicated animal rescue center." },
  { year: "2023", title: "Education Program", description: "Launched scholarship program for underprivileged children." },
];

interface AboutPageClientProps {
  initialMilestones?: MilestoneItem[];
}

export function AboutPageClient({ initialMilestones }: AboutPageClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const displayMilestones = initialMilestones || defaultMilestones;

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About COMPASSION CREW NGO",
    "description": "Learn about COMPASSION CREW, a registered NGO operating since 2018. Discover our mission, core values, and journey in empowering women, educating children, and rescuing animals across India.",
    "publisher": {
      "@type": "NGO",
      "name": "COMPASSION CREW",
      "url": "https://compassioncrew.in"
    }
  };

  return (
    <div className="planner-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <section className="pt-32 pb-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
              About Us
            </span>
            <h1 className="font-heading text-fluid-hero text-foreground mb-6 tracking-tight">
              Our Story of Compassion
            </h1>
            <p className="text-muted-foreground">
              COMPASSION CREW is a community-driven social impact organization dedicated to inspiring compassion, learning, and positive action. We bring together students, professionals, and changemakers through meaningful events, expert talks, volunteering opportunities, and community initiatives.
            </p>
            <p className="text-muted-foreground mt-4">
              Our goal is to create a platform where people can connect, grow, and contribute to causes that make a difference in society.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-primary rounded p-8 text-primary-foreground"
            >
              <div className="w-12 h-12 bg-primary-foreground/10 rounded-xl flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-xl font-medium mb-4 tracking-tight">
                Our Vision
              </h2>
              <p className="text-primary-foreground/80">
                To build a compassionate society where individuals are empowered to learn, serve, and create meaningful change in their communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded shadow-sm p-8"
            >
              <div className="w-12 h-12 bg-terracotta/10 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-terracotta" />
              </div>
              <h2 className="font-heading text-xl font-medium mb-4 tracking-tight">
                Our Mission
              </h2>
              <ul className="text-muted-foreground text-sm space-y-2 list-disc list-inside">
                <li>Inspire people to become active contributors to society.</li>
                <li>Create accessible platforms for learning, networking, and community engagement.</li>
                <li>Support social causes through awareness, volunteering, and collaborative initiatives.</li>
                <li>Build a strong community driven by empathy, responsibility, and action.</li>
                <li>Encourage sustainable social impact through partnerships and innovation.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/20 border-t border-b border-border">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-3 text-center">
              The Challenges
            </span>
            <h2 className="font-heading text-fluid-section text-foreground mb-8 tracking-tight text-center">
              The Gaps We Bridge
            </h2>
            <p className="text-muted-foreground mb-8 text-center">
              Many passionate individuals want to create a positive impact but face structural barriers:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Lack of awareness about critical social issues.",
                "Limited opportunities to volunteer and contribute active skills.",
                "Lack of guidance, structured mentorship, and inspiration.",
                "Weak connections between communities, experts, and social causes.",
                "Social issues affecting children, senior citizens, and animals going unnoticed."
              ].map((problem, i) => (
                <div key={i} className="bg-card border border-border/50 rounded-xl p-6 flex gap-3 items-start">
                  <span className="font-mono text-xs text-terracotta mt-0.5">0{i+1}.</span>
                  <p className="text-sm text-foreground/80">{problem}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-8 text-center text-sm font-medium">
              We aim to bridge these gaps by creating opportunities for active engagement, education, and collaborative action.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
              What Guides Us
            </span>
            <h2 className="font-heading text-fluid-section text-foreground tracking-tight">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Empathy", desc: "Inspiring compassion and active care in all initiatives." },
              { icon: Lightbulb, title: "Learning", desc: "Fostering continuous growth and knowledge sharing." },
              { icon: Users, title: "Connection", desc: "Bringing changemakers, professionals, and students together." },
              { icon: Leaf, title: "Contribution", desc: "Enabling sustainable, structured social impact." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border border-border rounded shadow-sm p-8 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/5 rounded flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-medium text-foreground mb-2 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
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
              Join Our Mission
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Be part of a movement that believes in dignity and care for every life. Volunteer your time, sponsor child education, or support animal rescues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 items-center">
              <Link href="/volunteer">
                <Button variant="secondary" size="xl">
                  Get Involved / Volunteer
                </Button>
              </Link>
              <Link href="/donate">
                <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors">
                  Donate to Our Cause
                </Button>
              </Link>
              <Link href="/team">
                <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

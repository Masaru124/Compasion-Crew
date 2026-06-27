"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Eye, Lightbulb, Users, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutPageClient() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About COMPASSION CREW Bangalore",
    "description": "Learn about COMPASSION CREW, a social impact community in Bangalore operating since 2026. Discover our mission, core values, and programs in educating underprivileged children, empowering women, and rescuing animals across India.",
    "publisher": {
      "@type": "Organization",
      "name": "COMPASSION CREW",
      "url": "https://www.compassioncrew.in"
    }
  };

  return (
    <div className="planner-bg min-h-screen pb-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <section className="pt-32 pb-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3 border-l-2 border-terracotta pl-3 w-fit mx-auto">
              About Us
            </span>
            <h1 className="font-heading text-fluid-hero text-foreground mb-6 tracking-tight font-light">
              About COMPASSION CREW — Social Impact Community Founded in Bangalore
            </h1>
            <p className="text-muted-foreground text-sm">
              Founded in 2026, COMPASSION CREW is a registered social impact organization connecting students, working professionals, and changemakers through expert talks, volunteering opportunities, and structured community campaigns that drive real, measurable change across India.
            </p>
            <p className="text-muted-foreground text-sm mt-4">
              Our goal is to bridge the gap between people who want to make a difference and the communities that need it most — giving every person a meaningful platform to learn, connect, and contribute.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section ref={ref} className="pb-16">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="group relative bg-card/25 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-3">
                  <span>COORD // CC-VIS-01</span>
                  <span className="text-terracotta font-semibold">[VISION_STATEMENT]</span>
                </div>
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-light text-foreground mb-4 tracking-tight">
                  Our Vision for Social Change
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To build a compassionate society where individuals are empowered to learn, serve, and create meaningful change in their communities.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative bg-card/25 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-3">
                  <span>COORD // CC-MIS-01</span>
                  <span className="text-terracotta font-semibold">[MISSION_GOALS]</span>
                </div>
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-light text-foreground mb-4 tracking-tight">
                  Our Mission & Community Activities
                </h2>
                <ul className="text-muted-foreground text-sm space-y-2 list-none">
                  {[
                    "Inspire people to become active contributors to society.",
                    "Create accessible platforms for learning, networking, and community engagement.",
                    "Support social causes through awareness, volunteering, and collaborative initiatives.",
                    "Build a strong community driven by empathy, responsibility, and action.",
                    "Encourage sustainable social impact through partnerships and innovation."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2 items-start text-xs font-mono">
                      <span className="text-terracotta">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges Gaps */}
      <section className="section-padding border-t border-b border-border/60">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3 text-center border-l-2 border-terracotta pl-3 w-fit mx-auto">
              The Challenges
            </span>
            <h2 className="font-heading text-fluid-section text-foreground mb-8 tracking-tight text-center font-light">
              Social Gaps We Bridge in <span className="italic text-primary">India</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-center text-sm">
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
                <div key={i} className="bg-card/20 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <div>
                    <div className="flex justify-between items-center mb-4 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-2">
                      <span>COORD // GAP-0{i+1}</span>
                      <span className="text-terracotta">[GAP_DETECTED]</span>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{problem}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-8 text-center text-sm font-medium">
              We aim to bridge these gaps by creating opportunities for active engagement, education, and collaborative action.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3 border-l-2 border-terracotta pl-3 w-fit mx-auto">
              What Guides Us
            </span>
            <h2 className="font-heading text-fluid-section text-foreground tracking-tight font-light">
              Our Core <span className="italic text-primary">Values</span>
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
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-card/25 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-center mb-5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-2">
                  <span>VAL-0{index + 1}</span>
                  <span className="text-accent font-semibold">[VALUE]</span>
                </div>
                <div className="w-10 h-10 mx-auto mb-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-light text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Page */}
      <section className="section-padding border-t border-border/60">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-card/25 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-3xl p-10 md:p-16 max-w-4xl mx-auto shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 text-center overflow-hidden"
          >
            <div className="flex justify-between items-center mb-10 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-3">
              <span>COORD // CC-ACT-01</span>
              <span className="text-terracotta font-semibold">[CAMPAIGN_DIRECTIVE]</span>
            </div>
            <h2 className="font-heading text-fluid-section text-foreground mb-4 tracking-tight font-light">
              Support Our Community in Bangalore — Volunteer or Donate
            </h2>
            <p className="text-muted-foreground text-sm mb-10 max-w-xl mx-auto leading-relaxed">
              Be part of a movement that believes in dignity and care for every life. Volunteer your time, sponsor child education, or support animal rescues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/volunteer">
                <Button size="xl" className="group font-mono uppercase tracking-wider h-12 w-full sm:w-auto">
                  Volunteer / Get Involved
                </Button>
              </Link>
              <Link href="/donate">
                <Button variant="outline" size="xl" className="group font-mono uppercase tracking-wider h-12 border-border/80 hover:bg-primary/10 w-full sm:w-auto">
                  Donate to Our Cause
                </Button>
              </Link>
              <Link href="/team">
                <Button variant="ghost" size="xl" className="group font-mono uppercase tracking-wider h-12 hover:bg-primary/10 w-full sm:w-auto">
                  Meet Our Team
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

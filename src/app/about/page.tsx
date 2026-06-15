"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Eye, Lightbulb, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const milestones = [
  { year: "2018", title: "Foundation", description: "CAMPASION CREW was founded with a mission to serve every life with dignity." },
  { year: "2019", title: "First State Expansion", description: "Extended operations to 5 states across India." },
  { year: "2020", title: "Pandemic Response", description: "Served 10,000+ families during COVID-19 crisis." },
  { year: "2021", title: "Women Centers", description: "Opened 10 skill development centers for women." },
  { year: "2022", title: "Animal Shelter", description: "Established our first dedicated animal rescue center." },
  { year: "2023", title: "Education Program", description: "Launched scholarship program for underprivileged children." },
];

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              About Us
            </span>
            <h1 className="font-heading text-fluid-hero text-foreground mb-6 tracking-tight">
              Our Story of Compassion
            </h1>
            <p className="text-muted-foreground">
              CAMPASION CREW was born from a simple belief: every life—whether human
              or animal—deserves dignity, care, and equal value. Since 2018, we have
              been working tirelessly across India to turn this belief into reality.
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
                A world where every life is treated with dignity and compassion.
                Where women walk with confidence, children dream without boundaries,
                and animals live without fear.
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
              <p className="text-muted-foreground">
                To create sustainable change through empowerment, education, and care.
                We work with communities, not just for them, building lasting solutions
                that honor local wisdom and culture.
              </p>
            </motion.div>
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
              { icon: Heart, title: "Compassion", desc: "Every action is driven by genuine care and empathy" },
              { icon: Lightbulb, title: "Innovation", desc: "Finding creative solutions to complex challenges" },
              { icon: Users, title: "Community", desc: "Building together with those we serve" },
              { icon: Leaf, title: "Sustainability", desc: "Creating lasting change that endures" },
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

      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
              Our Journey
            </span>
            <h2 className="font-heading text-fluid-section text-foreground tracking-tight">
              Milestones of Impact
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border border-border rounded shadow-sm p-8 flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="font-heading text-2xl font-medium text-terracotta">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-medium text-foreground mb-1 tracking-tight">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
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
              Join Our Mission
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Be part of a movement that believes in dignity and care for every life.
            </p>
            <Link href="/volunteer">
              <Button variant="secondary" size="xl">
                Get Involved
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

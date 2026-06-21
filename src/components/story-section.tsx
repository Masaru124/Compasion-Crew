"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

interface StoryItem {
  quote: string;
  name: string;
  role: string;
  location: string;
}

const stories: StoryItem[] = [
  {
    quote: "COMPASSION CREW didn't just give me skills, they gave me confidence. Today, I run my own tailoring business and support my family with dignity.",
    name: "Lakshmi Devi",
    role: "Women Empowerment Program",
    location: "Rajasthan",
  },
  {
    quote: "My daughter now goes to school every day with a smile. The educational support changed not just her life, but our entire family's future.",
    name: "Mohammed Rafiq",
    role: "Children Education Program",
    location: "Kerala",
  },
  {
    quote: "When they rescued my street dog friend Bruno, I saw true compassion in action. They treat every animal with the love they deserve.",
    name: "Priya Sharma",
    role: "Animal Rescue Volunteer",
    location: "Mumbai",
  },
];

interface StorySectionProps {
  initialStories?: StoryItem[];
}

export function StorySection({ initialStories }: StorySectionProps) {
  const displayStories = initialStories || stories;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
            Real Stories
          </span>
          <h2 className="font-heading text-fluid-section text-foreground mb-4 tracking-tight">
            Voices of Change
          </h2>
          <p className="text-muted-foreground">
            These are not just testimonials—they are echoes of transformed lives,
            of hope restored, and of dignity reclaimed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border rounded shadow-sm p-8"
            >
              <div className="w-12 h-12 bg-primary/5 rounded flex items-center justify-center mb-5">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              <blockquote className="text-foreground/80 mb-8">
                &ldquo;{story.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 bg-primary roundedl flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{story.name}</div>
                  <div className="text-sm text-muted-foreground">{story.role}</div>
                  <div className="text-xs text-terracotta mt-0.5">{story.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

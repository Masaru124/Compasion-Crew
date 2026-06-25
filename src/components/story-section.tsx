"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <section ref={ref} className="relative planner-bg border-b border-border/60 section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3 border-l-2 border-terracotta pl-3 w-fit mx-auto">
            Real Stories
          </span>
          <h2 className="font-heading text-fluid-section text-foreground mb-4 tracking-tight font-light">
            Voices of <span className="italic text-primary">Change</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            These are not just testimonials—they are echoes of transformed lives,
            of hope restored, and of dignity reclaimed.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {displayStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-card/20 backdrop-blur-md border border-border/80 hover:border-primary/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
            >
              <div>
                {/* Terminal header */}
                <div className="flex justify-between items-center mb-6 font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border-b border-border/40 pb-3">
                  <span>COORD // STY-0{index + 1}</span>
                  <span className="text-terracotta font-semibold">[VERIFIED_LOG]</span>
                </div>

                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Quote className="w-4 h-4 text-primary" />
                </div>

                <blockquote className="font-heading text-lg font-light text-foreground/90 italic leading-relaxed mb-8">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border/40">
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary font-heading text-base font-medium">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <div className="font-heading text-base font-medium text-foreground tracking-tight">{story.name}</div>
                  <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">{story.role}</div>
                  <div className="text-[10px] font-mono text-terracotta uppercase tracking-wider mt-0.5">LOC // {story.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Share Your Story Action Button */}
        <div className="text-center">
          <Link href="/share-story">
            <Button
              variant="outline"
              size="xl"
              className="font-mono uppercase tracking-wider h-12 border-border/80 hover:bg-primary/10 rounded-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Share Your Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

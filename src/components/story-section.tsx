"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitStoryAction } from "@/app/actions/moderator-actions";

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

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [quote, setQuote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const res = await submitStoryAction({
      name,
      role,
      location,
      quote,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      setName("");
      setRole("");
      setLocation("");
      setQuote("");
      // Reset success state and close form after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 4000);
    } else {
      setSubmitError(res.error || "Failed to submit story. Please try again.");
    }
  };

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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {displayStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border rounded shadow-sm p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-primary/5 rounded flex items-center justify-center mb-5">
                  <Quote className="w-5 h-5 text-primary" />
                </div>

                <blockquote className="text-foreground/80 mb-8 italic text-sm leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 bg-primary rounded flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0">
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

        {/* Share Your Story Action Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl hover:-translate-y-0.5 transition-transform"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {showForm ? "Cancel Sharing" : "Share Your Story"}
          </Button>
        </div>

        {/* Expandable glassmorphic submission form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden max-w-xl mx-auto"
            >
              <div className="glass-panel border border-border/80 rounded-2xl p-8 shadow-lg relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent" />
                
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-12 h-12 mx-auto bg-success/10 rounded-full flex items-center justify-center text-success">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-lg font-medium text-foreground">
                      Story Submitted!
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Thank you for sharing your journey. It will appear live on the site once approved by our moderation team.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="text-center mb-6">
                      <h3 className="font-heading text-lg font-medium text-foreground">
                        Submit Testimonial
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Your words will inspire others in the community.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="user-name">Full Name *</Label>
                        <Input
                          id="user-name"
                          required
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-10 rounded-xl bg-background/30"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="user-role">Your Program / Role *</Label>
                        <Input
                          id="user-role"
                          required
                          placeholder="e.g., Volunteer, Donor"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="h-10 rounded-xl bg-background/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="user-location">Location (City, State/Country) *</Label>
                      <Input
                        id="user-location"
                        required
                        placeholder="e.g., Bangalore, Karnataka"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-10 rounded-xl bg-background/30"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="user-quote">Your Testimonial / Story *</Label>
                      <Textarea
                        id="user-quote"
                        required
                        rows={4}
                        placeholder="Tell us about your experience with Compassion Crew..."
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        className="rounded-xl bg-background/30"
                      />
                    </div>

                    {submitError && (
                      <div className="flex gap-2 items-center text-xs text-destructive bg-destructive/5 border border-destructive/20 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl hover:-translate-y-0.5 transition-transform"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <span className="flex items-center justify-center gap-1.5">
                          Submit Story
                          <Send className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

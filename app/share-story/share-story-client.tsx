"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  MapPin, 
  User, 
  Briefcase, 
  Quote, 
  CheckCircle2, 
  Copy, 
  Check, 
  QrCode, 
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { submitStoryAction } from "@/app/actions/moderator-actions";
import { QRCodeSVG } from "qrcode.react";
import { useTheme } from "next-themes";

export function ShareStoryClient() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [shareUrl, setShareUrl] = useState("https://www.compassioncrew.in/share-story");
  const [copied, setCopied] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [quote, setQuote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        setShareUrl(window.location.origin + "/share-story");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const qrColor = mounted && resolvedTheme === "dark" ? "#2d8a76" : "#1f5d50";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !location.trim() || !quote.trim()) {
      setSubmitError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitStoryAction({
        name: name.trim(),
        role: role.trim(),
        location: location.trim(),
        quote: quote.trim(),
        honeypot,
      });

      if (result.success) {
        setIsSubmitted(true);
        // Reset form
        setName("");
        setRole("");
        setLocation("");
        setQuote("");
      } else {
        setSubmitError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Story submission error:", err);
      setSubmitError("Failed to submit story. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="planner-bg min-h-screen flex items-center justify-center pt-32 pb-24">
        <div className="section-container max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-xl shadow-sm p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-success/10 rounded-2xl flex items-center justify-center text-success">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl font-medium text-foreground mb-4 tracking-tight">
              Story Submitted Successfully!
            </h2>
            <p className="text-muted-foreground mb-8">
              Thank you for sharing your experience. To protect our community, submissions are reviewed by moderators before appearing on the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsSubmitted(false)} variant="default">
                Share Another Story
              </Button>
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="planner-bg mx-auto mt-30 min-h-screen max-w-7xl px-6 pb-24 lg:px-8 lg:py-16">
      {/* Header Section */}
      <section className="pb-12">
        <div className="section-container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-fluid-hero text-foreground mb-4 text-3xl tracking-tight">
            Tell Your Story
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Every journey of change starts with a single step. Share your
            volunteering, community, or testimonial story with us to inspire
            others.
          </p>
        </div>
      </section>

      {/* Main content grid */}
      <section className="section-container mx-auto max-w-5xl pb-24">
        <div className="grid items-start gap-8 md:grid-cols-5">
          {/* QR Code / Share Panel (Left Side on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-2 md:order-1 md:col-span-2"
          >
            <div className="bg-card border-border sticky top-32 flex flex-col items-center rounded-xl border p-6 text-center shadow-sm">
              <div className="bg-accent/10 text-accent mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                <QrCode className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-foreground mb-2 text-lg font-medium tracking-tight">
                Share on Mobile
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xs text-sm">
                Scan this QR code to quickly open this form on your phone and
                share your story on the go.
              </p>

              {/* QR Code Canvas Frame */}
              <div className="border-border/80 mb-6 rounded-2xl border bg-white p-4 shadow-inner">
                <QRCodeSVG
                  value={shareUrl}
                  size={160}
                  level="H"
                  fgColor={qrColor}
                  bgColor="#ffffff"
                  includeMargin={false}
                />
              </div>

              <div className="border-border/50 flex w-full flex-col items-center gap-3 border-t pt-4">
                <span className="text-muted-foreground bg-muted/30 border-border/20 w-full rounded border px-2 py-1 font-mono text-xs break-all select-all">
                  {shareUrl}
                </span>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  className="flex w-full items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="text-success h-3.5 w-3.5" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Form Link</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Submission Form Panel (Right Side on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2 md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card border-border space-y-6 rounded-xl border p-8 shadow-sm"
            >
              <div className="border-border/50 flex items-center gap-3 border-b pb-2">
                <MessageSquare className="text-terracotta h-5 w-5" />
                <h2 className="font-heading text-foreground text-lg font-medium tracking-tight">
                  Write Your Story
                </h2>
              </div>

              {submitError && (
                <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-center gap-2 rounded-xl border p-4 text-sm">
                  <span>⚠️</span>
                  <span>{submitError}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1.5">
                  <User className="text-muted-foreground h-3.5 w-3.5" />
                  Your Name *
                </Label>
                <Input
                  id="name"
                  required
                  maxLength={100}
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-1.5">
                    <Briefcase className="text-muted-foreground h-3.5 w-3.5" />
                    Program / Role *
                  </Label>
                  <Input
                    id="role"
                    required
                    maxLength={100}
                    placeholder="e.g. Volunteer / Donor / Beneficiary"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="flex items-center gap-1.5"
                  >
                    <MapPin className="text-muted-foreground h-3.5 w-3.5" />
                    Location *
                  </Label>
                  <Input
                    id="location"
                    required
                    maxLength={100}
                    placeholder="e.g. Bangalore, Karnataka"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote" className="flex items-center gap-1.5">
                  <Quote className="text-muted-foreground h-3.5 w-3.5 rotate-180 transform" />
                  Your Story / Testimonial *
                </Label>
                <Textarea
                  id="quote"
                  required
                  rows={6}
                  maxLength={2000}
                  placeholder="Tell us about your experience, how COMPASSION CREW has influenced you or how you participated..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Honeypot field — hidden from humans, traps bots */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting your story...
                  </span>
                ) : (
                  <span>Submit for Review</span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

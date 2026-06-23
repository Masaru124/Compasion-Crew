"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is COMPASSION CREW?",
    answer: "COMPASSION CREW is Bangalore's leading social impact community and registered NGO. We empower students, professionals, and changemakers to learn, connect, and contribute through expert talks, networking events, volunteer service drives, and community campaigns.",
  },
  {
    question: "How can I volunteer with COMPASSION CREW?",
    answer: "Anyone who wants to make a difference is welcome to join! You can fill out our volunteer application form on the Volunteer page. We require a commitment of at least 2–4 hours per month, and we offer official participation certificates, skill development, and networking opportunities with social leaders.",
  },

  {
    question: "What kinds of projects does COMPASSION CREW run?",
    answer: "We focus on three core areas: (1) Youth Mentorship & Education support for underprivileged children, (2) Women Empowerment programs, and (3) Animal Welfare & Rescue campaigns. We also hold expert talks and networking events to build social awareness and connect changemakers.",
  },
  {
    question: "How are donations utilized?",
    answer: "Over 90% of all public donations directly fund ground projects, including school supplies for children, medical treatment and food for rescued animals, and community outreach campaigns. The remaining support goes towards essential operational costs.",
  },
  {
    question: "Can I suggest a new cause or host an event with the Crew?",
    answer: "Absolutely! We are a community-driven group. You can share your story or propose collaborative events by visiting our Share Your Story page or contacting us directly at compasioncrew@gmail.com.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="section-padding border-t border-border bg-background/50 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="font-heading text-fluid-section text-foreground tracking-tight">
            Got Questions? We Have Answers
          </h2>
          <p className="text-muted-foreground mt-4">
            Learn more about our volunteer programs, donation tax exemptions, and how we manage community operations.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const uniqueId = `faq-item-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="mb-4"
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30 shadow-sm">
                  <h3>
                    <button
                      id={uniqueId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between gap-4 p-6 text-left font-sans text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-primary shrink-0 opacity-80" />
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "transform rotate-180 text-primary" : ""
                          }`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={uniqueId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm md:text-base leading-relaxed text-muted-foreground border-t border-border/50 bg-background/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

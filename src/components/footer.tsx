"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";

const footerLinks = {
  organization: [
    { href: "/about", label: "About Us" },
    { href: "/founder", label: "Our Founder" },
    { href: "/team", label: "Our Team" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ],
  work: [
    { href: "/#work", label: "Women Empowerment" },
    { href: "/#work", label: "Children Welfare" },
    { href: "/#work", label: "Animal Rescue" },
  ],
  getInvolved: [
    { href: "/volunteer", label: "Volunteer" },
    { href: "/partner", label: "Partner" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Massive CTA Section */}
      <div className="relative pt-32 pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto border-b border-white/10">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-accent/10 organic-shape blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] font-light leading-[0.9] tracking-tighter mb-6">
              Join the <br />
              <span className="italic text-secondary">Crew.</span>
            </h2>
            <p className="text-xl text-primary-foreground/70 font-light max-w-md">
              Become part of a movement that believes in dignity and care for every life.
            </p>
          </div>

          <MagneticButton>
            <Link
              href="/volunteer"
              className="interactive flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all duration-300 shadow-2xl group"
            >
              <span className="text-lg font-medium mr-2">Volunteer</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="interactive flex items-center gap-3 mb-8 group">
              <div className="relative w-12 h-12 bg-background/5 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-500">
                <Image 
                  src="/images/logo.png" 
                  alt="Campasion Crew Logo" 
                  fill 
                  sizes="48px"
                  className="object-cover p-1 group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-medium text-primary-foreground leading-none tracking-tight">
                  CAMPASION
                </span>
                <span className="text-xs text-primary-foreground/50 tracking-[0.3em] font-medium mt-1">
                  CREW
                </span>
              </div>
            </Link>

            <div className="space-y-4 mb-8">
              <a href="mailto:contact@campasioncrew.org" className="interactive flex items-center gap-4 text-primary-foreground/70 hover:text-accent transition-colors group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>contact@campasioncrew.org</span>
              </a>
              <a href="tel:+919876543210" className="interactive flex items-center gap-4 text-primary-foreground/70 hover:text-accent transition-colors group">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>+91 8884156247</span>
              </a>
              <div className="flex items-center gap-4 text-primary-foreground/70">
                <MapPin className="w-5 h-5" />
                <span>Bangalore , Karnataka, India</span>
              </div>
            </div>

            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="interactive text-sm font-medium text-primary-foreground hover:text-accent transition-colors uppercase tracking-wider"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-xl text-primary-foreground mb-6 opacity-50 font-light">
              Organization
            </h4>
            <ul className="space-y-4">
              {footerLinks.organization.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="interactive text-primary-foreground/80 hover:text-secondary text-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl text-primary-foreground mb-6 opacity-50 font-light">
              Our Work
            </h4>
            <ul className="space-y-4">
              {footerLinks.work.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="interactive text-primary-foreground/80 hover:text-secondary text-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl text-primary-foreground mb-6 opacity-50 font-light">
              Get Involved
            </h4>
            <ul className="space-y-4">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="interactive text-primary-foreground/80 hover:text-secondary text-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} CAMPASION CREW. All rights reserved.
          </p>
          <p className="text-primary-foreground/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-secondary fill-secondary" /> for every life.
          </p>
        </div>
      </div>
    </footer>
  );
}

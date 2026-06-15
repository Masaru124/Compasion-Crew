"use client";

import Link from "next/link";
import { Heart, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const footerLinks = {
  organization: [
    { href: "/about", label: "About Us" },
    { href: "/founder", label: "Our Founder" },
    { href: "/team", label: "Our Team" },
    { href: "/events", label: "Events" },
  ],
  getInvolved: [
    { href: "/volunteer", label: "Volunteer" },
    { href: "/donate", label: "Donate" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 bg-primary-foreground/10 rounded flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Campasion Crew Logo"
                  fill
                  className="object-cover p-0.5 rounded"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg font-medium text-primary-foreground leading-none tracking-tight">
                  CAMPASION CREW
                </span>
              </div>
            </div>

            <p className="text-primary-foreground/70 text-sm max-w-sm mb-6">
              Dignity, care, and equal value for every life. Supporting women,
              children, and animals across India.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:contact@campasioncrew.org"
                className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>contact@campasioncrew.org</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+91 8884156247</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm text-primary-foreground mb-5 font-medium">
              Organization
            </h4>
            <ul className="space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm text-primary-foreground mb-5 font-medium">
              Get Involved
            </h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/volunteer">
              <Button
                variant="secondary"
                size="sm"
                className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 border-0"
              >
                Join the Crew
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-xs">
            &copy; {new Date().getFullYear()} CAMPASION CREW. All rights
            reserved.
          </p>
          <p className="text-primary-foreground/40 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-terracotta" /> for every
            life.
          </p>
        </div>
      </div>
    </footer>
  );
}

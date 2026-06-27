import Link from "next/link";
import { Heart, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";

const footerLinks = {
  organization: [
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog & Insights" },
  ],
  getInvolved: [
    { href: "/volunteer", label: "Volunteer" },
    { href: "/donate", label: "Donate" },
  ],
};

interface SiteSettings {
  email: string;
  phone: string;
  address: string;
  footerDescription: string;
  copyrightText?: string;
}

const defaultSettings: SiteSettings = {
  email: "compasioncrew@gmail.com",
  phone: "+91 8884156247",
  address: "Bangalore, Karnataka, India",
  footerDescription:
    "Dignity, care, and equal value for every life. Supporting women, children, and animals across India.",
  copyrightText: "COMPASSION CREW. All rights reserved.",
};

export async function Footer() {
  let settings: SiteSettings = defaultSettings;

  try {
    const list = await db.select().from(siteSettings).limit(1);
    if (list && list.length > 0) {
      const data = list[0];
      settings = {
        email: data.email || defaultSettings.email,
        phone: data.phone || defaultSettings.phone,
        address: data.address || defaultSettings.address,
        footerDescription:
          data.footerDescription || defaultSettings.footerDescription,
        copyrightText: data.copyrightText || defaultSettings.copyrightText,
      };
    }
  } catch (error) {
    console.error("Failed to fetch footer settings from Postgres:", error);
  }

  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 pb-10">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded">
                <Image
                  src="/images/logo.png"
                  alt="Compassion Crew Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-secondary-foreground text-lg leading-none font-medium">
                  COMPASSION CREW
                </span>
              </div>
            </div>
            <p className="text-secondary-foreground/70 mb-6 max-w-sm">
              {settings.footerDescription}
            </p>
          </div>

          <div>
            <h4 className="font-heading mb-5 font-medium text-white">
              Organization
            </h4>
            <ul className="space-y-3">
              {footerLinks.organization.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading mb-5 font-medium text-white">
              Get Involved
            </h4>
            <ul className="mb-6 space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading mb-5 font-medium text-white">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>{settings.email}</span>
              </a>
              <a
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>{settings.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{settings.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {settings.copyrightText}
          </p>
          <p className="flex items-center gap-1 text-xs text-white/40">
            Made with <Heart className="h-3 w-3" /> for every life.
          </p>
        </div>
      </div>
    </footer>
  );
}

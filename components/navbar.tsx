"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/share-story", label: "Share Your Story" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-999 mx-auto border border-neutral-200 bg-[#F6F2EA] backdrop-blur-3xl transition-all duration-300 ${
          isScrolled ? "shadow-0" : ""
        }`}
      >
        <div className="">
          <nav className="mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="">
                <p className="text font-semibold uppercase">Compassion Crew</p>
              </div>
            </Link>

            {/* Desktop */}
            <div className="hidden items-center gap-2 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                >
                  {link.label}
                </Link>
              ))}

              <Link href="/donate">
                <Button
                  variant="outline"
                  className="h-10 border-neutral-300 px-5"
                >
                  Donate
                </Button>
              </Link>

              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSeYJ4-OKlvkBQm0vSaGKHMrNWHflIMaKZQKAQxeN73b7PFoUg/viewform"
                target="_blank"
              >
                <Button className="h-10 px-5">Volunteer</Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-colors hover:bg-neutral-100 lg:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <Button variant="ghost">Close</Button>
              ) : (
                <Button>Menu</Button>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#F6F2EA] transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-8 pt-22 pb-10">
          <div className="flex flex-1 flex-col items-start">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group hover:text-primary text flex items-center justify-between border-b border-neutral-200 py-6 tracking-tight text-neutral-900 transition-colors"
              >
                {link.label}

                <ArrowRight className="ml-6 h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          <div className="space-y-3 text-3xl">
            <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="h-12 w-full border-neutral-300"
              >
                Donate
              </Button>
            </Link>

            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeYJ4-OKlvkBQm0vSaGKHMrNWHflIMaKZQKAQxeN73b7PFoUg/viewform"
              target="_blank"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button variant="default" className="mt-4 h-12 w-full">
                Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

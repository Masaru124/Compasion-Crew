"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/founder", label: "Founder" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
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
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center backdrop-blur-2xl"
      >
        <nav
          className={`flex items-center section-container justify-between transition-all duration-300 py-4 w-full max-w-[--container-max]`}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 bg-primary/5 rounded flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Campasion Crew Logo"
                fill
                sizes="px"
                className="object-cover border  rounded"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base font-medium text-foreground leading-none tracking-tight">
                CAMPASION
              </span>
              <span className="text-[9px] text-muted-foreground tracking-[0.3em] font-medium">
                CREW
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/donate">
              <Button variant="ghost" size="sm">
                Donate
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button size="sm" className="hover:bg-green-800">Volunteer</Button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-background"
          >
            <div className="flex flex-col h-full pt-28 px-6 pb-10 overflow-y-auto">
              <div className="flex flex-col gap-2 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-12">
                    Donate
                  </Button>
                </Link>
                <Link
                  href="/volunteer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full h-12">Become a Volunteer</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

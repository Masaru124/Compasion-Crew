"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/founder", label: "Founder" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/#work", label: "Work" },
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6"
      >
        <nav 
          className={`flex items-center justify-between transition-all duration-500 rounded-full px-6 py-3 w-full max-w-7xl ${
            isScrolled 
              ? "bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50" 
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <MagneticButton>
            <Link href="/" className="interactive flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-500">
                <Image 
                  src="/images/logo.png" 
                  alt="Campasion Crew Logo" 
                  fill 
                  sizes="40px"
                  className="object-cover p-1 group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-medium text-foreground leading-none tracking-tight">
                  CAMPASION
                </span>
                <span className="text-[10px] text-muted-foreground tracking-[0.3em] font-medium mt-1">
                  CREW
                </span>
              </div>
            </Link>
          </MagneticButton>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 bg-black/5 px-6 py-2 rounded-full">
            {navLinks.map((link) => (
              <MagneticButton key={link.href}>
                <Link
                  href={link.href}
                  className="interactive relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group px-2 py-1"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </MagneticButton>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center">
            <MagneticButton>
              <Link href="/volunteer" className="interactive">
                <Button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-8 rounded-full transition-transform">
                  Volunteer
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden bg-background"
          >
            <div className="flex flex-col h-full pt-32 px-8 pb-12 overflow-y-auto">
              <div className="flex flex-col gap-8 flex-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-4xl font-heading font-medium text-foreground hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <Link href="/volunteer" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium py-8 rounded-full text-lg">
                    <Heart className="w-5 h-5 mr-3 fill-current" />
                    Become a Volunteer
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Heart, Users, Baby, PawPrint, Award, Globe } from "lucide-react";

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isInView: boolean;
  colorClass: string;
}

function StatItem({ icon: Icon, value, suffix, label, delay, isInView, colorClass }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      className="text-center group relative p-6"
    >
      <div className="absolute inset-0 bg-white/5 organic-shape opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-${colorClass.split("-")[1]} transition-colors duration-500`}>
        <Icon className={`w-8 h-8 ${colorClass}`} />
      </div>
      
      <div className="font-heading text-5xl md:text-6xl font-light text-primary-foreground mb-3 tracking-tighter">
        {count.toLocaleString()}<span className={colorClass}>{suffix}</span>
      </div>
      
      <div className="text-primary-foreground/70 font-medium tracking-wide uppercase text-sm">
        {label}
      </div>
    </motion.div>
  );
}

const stats = [
  { icon: Heart, value: 50000, suffix: "+", label: "Lives Impacted", colorClass: "text-secondary" },
  { icon: Users, value: 25000, suffix: "+", label: "Women Empowered", colorClass: "text-accent" },
  { icon: Baby, value: 15000, suffix: "+", label: "Children Educated", colorClass: "text-secondary" },
  { icon: PawPrint, value: 10000, suffix: "+", label: "Animals Rescued", colorClass: "text-accent" },
  { icon: Award, value: 150, suffix: "", label: "Awards Won", colorClass: "text-secondary" },
  { icon: Globe, value: 15, suffix: "+", label: "States Covered", colorClass: "text-accent" },
];

export function ImpactStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-primary relative overflow-hidden">
      {/* Background Organic Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/20 organic-shape blur-[100px] opacity-40" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-accent/20 organic-shape-2 blur-[100px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="text-accent font-medium text-sm tracking-[0.2em] uppercase">
            Our Impact
          </span>
          <h2 className="font-heading text-fluid-h2 text-primary-foreground mt-6 mb-8 tracking-tight leading-tight">
            Numbers that tell <span className="italic text-secondary">stories</span>.
          </h2>
          <p className="text-primary-foreground/70 text-lg md:text-xl font-light">
            Behind every number is a life transformed, a dream realized, 
            and a future rewritten with dignity and care.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              {...stat}
              delay={index * 0.15}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

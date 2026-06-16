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
}

function StatItem({ icon: Icon, value, suffix, label, delay, isInView }: StatItemProps) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="w-12 h-12 mx-auto mb-5 rounded bg-primary/5 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      <div className="font-heading text-4xl md:text-5xl font-light text-foreground mb-2 tracking-tighter">
        {count.toLocaleString()}<span className="text-terracotta">{suffix}</span>
      </div>

      <div className="text-muted-foreground text-sm font-medium">
        {label}
      </div>
    </motion.div>
  );
}

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Users,
  Baby,
  PawPrint,
  Award,
  Globe
};

interface ImpactStatInput {
  icon: string | React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: ImpactStatInput[] = [
  { icon: Heart, value: 50000, suffix: "+", label: "Lives Impacted" },
  { icon: Users, value: 25000, suffix: "+", label: "Women Empowered" },
  { icon: Baby, value: 15000, suffix: "+", label: "Children Educated" },
  { icon: PawPrint, value: 10000, suffix: "+", label: "Animals Rescued" },
  { icon: Award, value: 150, suffix: "", label: "Awards Won" },
  { icon: Globe, value: 15, suffix: "+", label: "States Covered" },
];

interface ImpactStatsProps {
  initialStats?: ImpactStatInput[];
}

export function ImpactStats({ initialStats }: ImpactStatsProps) {
  const displayStats = initialStats || stats;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-muted/50 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
            Our Impact
          </span>
          <h2 className="font-heading text-fluid-section text-foreground mb-4 tracking-tight">
            Numbers that tell <span className="italic text-primary">stories</span>.
          </h2>
          <p className="text-muted-foreground">
            Behind every number is a life transformed, a dream realized,
            and a future rewritten with dignity and care.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStats.map((stat, index) => {
            const IconComponent = typeof stat.icon === "string" ? (iconMap[stat.icon] || Heart) : stat.icon;
            return (
              <StatItem
                key={stat.label}
                icon={IconComponent}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.1}
                isInView={isInView}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

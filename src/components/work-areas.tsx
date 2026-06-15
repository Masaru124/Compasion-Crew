"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const workAreas = [
  {
    id: "women",
    title: "Women Empowerment",
    description:
      "Every woman deserves the chance to dream, grow, and lead. Our organization works alongside women from underserved communities by providing education, vocational training, self-employment opportunities, and emotional support that help transform lives with dignity and confidence.",
    image: "/images/women.png",
    href: "/work/women",
    number: "01",
  },
  {
    id: "children",
    title: "Children Welfare",
    description:
      "We work towards building a world where every child feels safe, valued, and empowered. By providing access to education, nutritious meals, healthcare, and emotional support, we help children grow into confident and capable individuals.",
    image: "/images/child.png",
    href: "/work/children",
    number: "02",
  },
  {
    id: "animals",
    title: "Animal Rescue",
    description:
      "Every animal matters and should be treated with kindness and care. Our organization rescues abandoned and injured animals, provides medical treatment and shelter, and works towards creating a more compassionate world for all living beings.",
    image: "/images/animal.png",
    href: "/work/animals",
    number: "03",
  },
];

export function WorkAreas() {
  return (
    <section id="work" className="bg-background">
      <div className="section-container section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-3">
            Our Focus Areas
          </span>
          <h2 className="font-heading text-fluid-section text-foreground tracking-tight">
            Where we make a lasting{" "}
            <span className="italic text-primary">impact</span>.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="hidden lg:block lg:w-1/2 relative h-[55vh] max-h-[500px] sticky top-[12vh]">
            <div className="w-full h-full rounded overflow-hidden border border-border/50 shadow-sm">
              <Image
                src="/images/hero.png"
                alt="Our Work"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-16 lg:gap-24">
            {workAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="block lg:hidden w-full h-[300px] relative rounded overflow-hidden mb-8 border border-border/50">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="font-heading text-5xl font-light text-primary/20">
                    {area.number}
                  </span>
                  <div className="h-px w-12 bg-border" />
                </div>

                <h3 className="font-heading text-xl font-medium text-foreground mb-4 tracking-tight">
                  {area.title}
                </h3>

                <p className="text-muted-foreground mb-8 max-w-lg">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

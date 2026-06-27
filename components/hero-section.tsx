import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  image: string | null | undefined;
}

interface HeroSectionProps {
  initialHero?: HeroData;
}

const defaultHero: HeroData = {
  eyebrow: "Social Impact Community",
  title:
    "Building stronger communities through connection, learning, and meaningful action.",
  description:
    "A community that empowers people to learn, connect, and contribute through expert talks, networking events, volunteering, and social campaigns.",
  primaryBtnText: "Get Involved",
  primaryBtnLink: "/volunteer",
  secondaryBtnText: "Learn More",
  secondaryBtnLink: "/about",
  image: "/images/yoga.jpeg",
};

export function HeroSection({ initialHero }: HeroSectionProps) {
  const data = initialHero || defaultHero;

  const parseTitle = (text: string) => {
    if (!text.includes("*")) return text;
    const parts = text.split("*");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="text-primary italic">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const getImageUrl = (img: string | null | undefined) => {
    if (!img) return "/images/yoga.jpeg";
    if (typeof img === "string") return img;
    return "/images/yoga.jpeg";
  };

  return (
    <section className="relative min-h-screen border-b border-neutral-200 pt-24 pb-12 lg:pt-32 lg:pb-16 selection:bg-primary selection:text-primary-foreground">
      <div className="mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid min-h-[80vh] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-10">
          {/* LEFT */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold sm:text-6xl lg:text-[4rem]">
                Building stronger communities through connection, learning, and
                meaningful action.  
              </h1>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-between">
            <div className="flex justify-center lg:justify-end">
              <div className="relative h-[260px] w-full max-w-2xl overflow-hidden sm:h-[340px] sm:max-w-md lg:h-[420px] lg:w-[520px] lg:max-w-none">
                <Image
                  src={getImageUrl(data.image)}
                  alt={data.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-10 max-w-2xl lg:mt-0 lg:self-end">
              <p className="text-lg leading-relaxed text-neutral-900 sm:text-xl lg:text-3xl lg:leading-snug">
                {data.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href={data.primaryBtnLink} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    {data.primaryBtnText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href={data.secondaryBtnLink} className="w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {data.secondaryBtnText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

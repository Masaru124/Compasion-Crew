import Image from "next/image";

interface FounderData {
  name: string;
  role: string;
  biography: string[];
  image: string | null;
}

interface FounderSectionProps {
  initialFounder?: FounderData;
}

const defaultFounder: FounderData = {
  name: "Khushi Kalpesh Joshi",
  role: "Founder & Director",
  biography: [
    "Khushi Kalpesh Joshi founded COMPASSION CREW in 2026 with the vision of building a compassionate community where people are inspired to learn, connect, and create positive social impact.",

    "Through expert talks, volunteer initiatives, and community programs, she aims to empower individuals to turn compassion into meaningful action and lasting change.",
  ],
  image: "/images/founders.jpeg",
};

export function FounderSection({ initialFounder }: FounderSectionProps) {
  const data = initialFounder || defaultFounder;

  return (
    <section className="border-t border-neutral-200 py-24 lg:py-32">
      <div className="mx-auto px-6 max-w-7xl">
        <div className="grid gap-20 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="relative w-fit">
              {/* Main image */}
              <div className="relative aspect-[4/5] w-[320px] overflow-hidden lg:w-[420px]">
                <Image
                  src={data.image || "/images/founders.jpeg"}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold">{data.name}</h3>

                <p className="mt-1 text-neutral-500">{data.role}</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            <div className="space-y-2">
              <p className="mt-auto leading-8 text-neutral-700">
                <span className="rounded-md bg-blue-100 px-2 py-1 font-semibold text-blue-900">
                  Khushi Kalpesh Joshi
                </span>{" "}
                founded{" "}
                <span className="rounded-md bg-emerald-100 px-2 py-1 font-semibold text-emerald-900">
                  COMPASSION CREW
                </span>{" "}
                with a vision of building a{" "}
                <span className="rounded-md bg-rose-100 px-2 py-1 font-semibold text-rose-900">
                  compassionate society
                </span>{" "}
                where people are inspired to learn, connect, and create
                meaningful change. Through community initiatives, volunteering,
                and awareness programs, she believes everyone has the power to
                make a positive impact.
                <br />
                <br />
                What began as a simple idea has grown into a{" "}
                <span className="text-primary font-semibold">
                  social impact movement
                </span>{" "}
                that brings together students, professionals, and changemakers
                across India. Rather than waiting for perfect conditions, the
                focus has always been on{" "}
                <span className="text-primary font-semibold">
                  building a community
                </span>{" "}
                driven by compassion and collective action.
                <br />
                <br />
                Today, COMPASSION CREW continues to create opportunities for
                people to{" "}
                <span className="rounded-md bg-violet-100 px-2 py-1 font-semibold text-violet-900">
                  learn, serve, and lead with purpose.
                </span>{" "}
                Every initiative is built on one belief:
                <span className="text-primary font-semibold italic">
                  {" "}
                  small acts of compassion create lasting change.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StoryItem {
  quote: string;
  name: string;
  role: string;
  location: string;
}

interface StorySectionProps {
  initialStories?: StoryItem[];
}

export function StorySection({ initialStories }: StorySectionProps) {
  // const displayStories = initialStories || [
  //   {
  //     quote:
  //       "Compassion Crew has been a beacon of hope in my life. Their support and guidance have helped me navigate through some of the toughest times.",
  //     name: "Jane Doe",
  //     role: "Community Member",
  //     location: "New York, USA",
  //   },
  //   {
  //     quote:
  //       "The team at Compassion Crew truly cares about the people they serve. Their dedication and compassion are unmatched.",
  //     name: "John Smith",
  //     role: "Volunteer",
  //     location: "Los Angeles, USA",
  //   },
  //   {
  //     quote:
  //       "I am forever grateful for the opportunities and support I received from Compassion Crew. They have changed my life for the better.",
  //     name: "Emily Johnson",
  //     role: "Beneficiary",
  //     location: "Chicago, USA",
  //   },
  // ];

  return (
    <section className="border-border border-b py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-primary mb-3 block text-sm font-medium">
            Real Stories
          </span>
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight lg:text-4xl">
            Voices of <span className="text-primary italic">Change</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            These are not just testimonials—they are echoes of transformed
            lives, of hope restored, and of dignity reclaimed.
          </p>
        </div>

        {/* <div className="mb-12 grid gap-6 md:grid-cols-3">
          {displayStories.map((story) => (
            <div
              key={story.name}
              className="border-border bg-card flex flex-col justify-between rounded-lg border p-8 transition-shadow hover:shadow-sm"
            >
              <div>
                <blockquote className="font-heading text-foreground/90 mb-8 text-lg leading-relaxed font-light italic">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>

              <div className="border-border flex items-center gap-4 border-t pt-6">
                <div className="bg-primary/10 text-primary font-heading flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-medium">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <div className="font-heading text-foreground text-base font-medium tracking-tight">
                    {story.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {story.role}
                  </div>
                  <div className="text-muted-foreground/70 text-xs">
                    {story.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <div className="text-center">
          <Link href="/share-story">
            <Button variant="outline">Share Your Story</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

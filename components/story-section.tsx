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
  const displayStories = initialStories

  return (
    <section className="border-b border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary block mb-3">
            Real Stories
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            Voices of <span className="italic text-primary">Change</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These are not just testimonials—they are echoes of transformed lives,
            of hope restored, and of dignity reclaimed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {displayStories.map((story) => (
            <div
              key={story.name}
              className="rounded-lg border border-border bg-card p-8 flex flex-col justify-between hover:shadow-sm transition-shadow"
            >
              <div>
                <blockquote className="font-heading text-lg font-light text-foreground/90 italic leading-relaxed mb-8">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-heading text-base font-medium shrink-0">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <div className="font-heading text-base font-medium text-foreground tracking-tight">{story.name}</div>
                  <div className="text-sm text-muted-foreground">{story.role}</div>
                  <div className="text-xs text-muted-foreground/70">{story.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/share-story">
            <Button variant="outline">
              Share Your Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

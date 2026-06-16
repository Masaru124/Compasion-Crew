import { client } from "@/sanity/client";
import { volunteerPageQuery } from "@/sanity/queries";

export const revalidate = 60; // Revalidate page every 60 seconds (ISR)

interface VolunteerData {
  title: string;
  description: string;
  formUrl: string;
  formHeight: number;
}

const defaultVolunteer: VolunteerData = {
  title: "Join Our Volunteer Team",
  description:
    "Thank you for your interest in volunteering with us. Please complete the application form below. We will review your submission and contact shortlisted applicants.",
  formUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeYJ4-OKlvkBQm0vSaGKHMrNWHflIMaKZQKAQxeN73b7PFoUg/viewform?embedded=true",
  formHeight: 3600,
};

export default async function VolunteerPage() {
  let volunteerData = null;

  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const data = await client.fetch(volunteerPageQuery);
      if (data) {
        volunteerData = data;
      }
    }
  } catch (error) {
    console.error("Failed to fetch volunteer settings from Sanity:", error);
  }

  const data = volunteerData || defaultVolunteer;

  return (
    <div className="planner-bg">
      <section className="pt-32 pb-16">
        <div className=" max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-fluid-hero text-foreground mb-4 tracking-tight">
            {data.title}
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>
      </section>

      <section className="">
        <div className=" mx-auto">
          <div className="paper-card ">
            <iframe
              src={data.formUrl}
              width="100%"
              height={data.formHeight}
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              loading="lazy"
              title="Contact form"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

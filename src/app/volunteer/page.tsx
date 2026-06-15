export default function VolunteerPage() {
  return (
    <div className="planner-bg">
      <section className="pt-32 pb-16">
        <div className=" max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-fluid-hero text-foreground mb-4 tracking-tight">
            Join Our Volunteer Team
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thank you for your interest in volunteering with us. Please complete
            the application form below. We will review your submission and
            contact shortlisted applicants.
          </p>
        </div>
      </section>

      <section className="">
        <div className=" mx-auto">
          <div className="paper-card ">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeYJ4-OKlvkBQm0vSaGKHMrNWHflIMaKZQKAQxeN73b7PFoUg/viewform?embedded=true"
              width="100%"
              height="3600"
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

// https://docs.google.com/forms/d/e/1FAIpQLSeYJ4-OKlvkBQm0vSaGKHMrNWHflIMaKZQKAQxeN73b7PFoUg/viewform?usp=publish-editor

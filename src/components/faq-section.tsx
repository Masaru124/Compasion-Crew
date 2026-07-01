interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is COMPASSION CREW?",
    answer: "COMPASSION CREW is Bangalore's leading social impact community. We empower students, professionals, and changemakers to learn, connect, and contribute through expert talks, networking events, volunteer service drives, and community campaigns.",
  },
  {
    question: "How can I volunteer with COMPASSION CREW?",
    answer: "Anyone who wants to make a difference is welcome to join! You can fill out our volunteer application form on the Volunteer page. We require a commitment of at least 2–4 hours per month, and we offer official participation certificates, skill development, and networking opportunities with social leaders.",
  },
  {
    question: "What kinds of projects does COMPASSION CREW run?",
    answer: "We focus on three core areas: (1) Youth Mentorship & Education support for underprivileged children, (2) Women Empowerment programs, and (3) Animal Welfare & Rescue campaigns. We also hold expert talks and networking events to build social awareness and connect changemakers.",
  },
  {
    question: "How are donations utilized?",
    answer: "Over 90% of all public donations directly fund ground projects, including school supplies for children, medical treatment and food for rescued animals, and community outreach campaigns. The remaining support goes towards essential operational costs.",
  },
  {
    question: "Can I suggest a new cause or host an event with the Crew?",
    answer: "Absolutely! We are a community-driven group. You can share your story or propose collaborative events by visiting our Share Your Story page or contacting us directly at compasioncrew@gmail.com.",
  },
];

export function FAQSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is COMPASSION CREW?",
    answer:
      "COMPASSION CREW is a community-driven organization that brings people together through expert talks, volunteer initiatives, social campaigns, and community events to create meaningful social impact.",
  },
  {
    question: "Who can join COMPASSION CREW?",
    answer:
      "Anyone who shares our vision of creating positive social impact is welcome to join. Whether you're a student, working professional, entrepreneur, or retiree, there are opportunities to learn, volunteer, and contribute.",
  },
  {
    question: "How can I become a volunteer?",
    answer:
      "Simply complete our volunteer application form. Once registered, our team will contact you with upcoming volunteer opportunities, events, and onboarding information.",
  },
  {
    question: "Do I need prior volunteering experience?",
    answer:
      "No. Prior experience is not required. We welcome first-time volunteers and provide guidance to help you participate confidently in our activities.",
  },
  {
    question: "What are your focus areas?",
    answer:
      "Our initiatives focus on education, community development, women's empowerment, animal welfare, youth engagement, and awareness campaigns that encourage compassion and social responsibility.",
  },
  {
    question: "How can I participate in your events?",
    answer:
      "You can browse upcoming events on our website and register online. Some events are open to everyone, while others may require prior registration due to limited capacity.",
  },
  {
    question: "Can I partner with COMPASSION CREW?",
    answer:
      "Yes. We welcome collaborations with educational institutions, NGOs, businesses, community groups, and individuals who share our mission of creating positive social change.",
  },
  {
    question: "How are donations used?",
    answer:
      "Donations support our community programs, volunteer initiatives, awareness campaigns, educational activities, and operational needs that enable us to serve communities effectively.",
  },
  {
    question: "Can I suggest a social cause or community project?",
    answer:
      "Absolutely. We encourage community members to share ideas for new initiatives, awareness campaigns, volunteer projects, or local community needs that align with our mission.",
  },
  {
    question: "How can I stay updated with upcoming activities?",
    answer:
      "Follow us on social media, subscribe to our updates, or regularly visit our website to stay informed about upcoming events, volunteer opportunities, campaigns, and community initiatives.",
  },
];

export function FAQSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
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

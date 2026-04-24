"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Khushi Kalpesh  Joshi",
    role: "Co-Founder & COO",
    bio: "Operations expert with 10+ years in NGO management. Leads our ground initiatives across India.",
    color: "#E07B39",
  },
  {
    name: "Dr. Arun Kumar",
    role: "Head of Programs",
    bio: "Development professional specializing in education and women's empowerment programs.",
    color: "#2D5A3D",
  },
  {
    name: "Meera Singh",
    role: "Animal Welfare Director",
    bio: "Veterinarian and animal rights activist. Heads our rescue and rehabilitation centers.",
    color: "#C45C3E",
  },
  {
    name: "Vikram Desai",
    role: "Finance Director",
    bio: "CA with expertise in nonprofit financial management. Ensures transparency in all operations.",
    color: "#3D7A52",
  },
  {
    name: "Anjali Rao",
    role: "Communications Lead",
    bio: "Journalist turned communications expert. Tells our stories to inspire action.",
    color: "#E07B39",
  },
  {
    name: "Rahul Menon",
    role: "Volunteer Coordinator",
    bio: "Community builder managing our network of 500+ volunteers across 15 states.",
    color: "#2D5A3D",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-[#E07B39] font-medium text-sm tracking-wider uppercase">
              Our Team
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-semibold text-[#2C2416] mt-4 mb-6">
              The People Behind Our Mission
            </h1>
            <p className="text-lg text-[#6B5B4F] leading-relaxed">
              Meet the dedicated individuals who work tirelessly to make our vision a reality. 
              Each team member brings unique expertise and boundless compassion to our cause.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-[#FAF7F2] rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Avatar */}
                  <div
                    className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-3xl font-[family-name:var(--font-playfair)] font-bold transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2C2416] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#E07B39] font-medium text-sm mb-4">{member.role}</p>
                    <p className="text-[#6B5B4F] text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      <a
                        href="#"
                        className="w-10 h-10 bg-[#2D5A3D]/10 rounded-full flex items-center justify-center text-[#2D5A3D] hover:bg-[#2D5A3D] hover:text-white transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-[#2D5A3D]/10 rounded-full flex items-center justify-center text-[#2D5A3D] hover:bg-[#2D5A3D] hover:text-white transition-colors"
                        aria-label={`${member.name} Twitter`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 bg-[#2D5A3D]/10 rounded-full flex items-center justify-center text-[#2D5A3D] hover:bg-[#2D5A3D] hover:text-white transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-24 bg-[#2D5A3D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-semibold text-white mb-6">
              Join Our Team
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals who want to make a difference. 
              Whether you're a professional or a volunteer, there's a place for you here.
            </p>
            <a
              href="/volunteer"
              className="inline-flex items-center gap-2 bg-[#E07B39] hover:bg-[#C45C3E] text-white font-semibold px-8 py-4 rounded-full transition-colors"
            >
              View Opportunities
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

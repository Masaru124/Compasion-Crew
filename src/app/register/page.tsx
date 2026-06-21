import { RegisterClient } from "./register-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Registration - Secure Your Spot",
  description: "Register for COMPASSION CREW upcoming community events, expert talks, workshops, and volunteer activities across India.",
  keywords: ["community event registration", "expert talk sign up India", "volunteer service signup"],
  alternates: {
    canonical: "/register",
  }
};

export default function RegisterPage() {
  return <RegisterClient />;
}

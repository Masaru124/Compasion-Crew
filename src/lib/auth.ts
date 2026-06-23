import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { loginLimiter } from "./rate-limit";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Rate limit check — use email as the key
        const rateLimitResult = loginLimiter.check(email);
        if (rateLimitResult.limited) {
          // Return null to deny access; NextAuth will show an error
          return null;
        }

        // Validate against environment variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail || !adminPasswordHash) {
          console.error("Auth config error: ADMIN_EMAIL or ADMIN_PASSWORD_HASH missing from environment.");
          return null;
        }

        // Constant-time email comparison (convert both to lowercase)
        if (email.toLowerCase() !== adminEmail.toLowerCase()) {
          return null;
        }

        // Verify password against bcrypt hash
        const passwordValid = await bcrypt.compare(password, adminPasswordHash);
        if (!passwordValid) {
          return null;
        }

        // Success — reset rate limiter for this email
        loginLimiter.reset(email);

        return {
          id: "admin",
          email: adminEmail,
          name: "Admin",
        };
      },
    }),
  ],
});

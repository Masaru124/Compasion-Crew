import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js configuration.
 * This file is imported by middleware.ts and must not contain
 * Node.js-only modules (bcryptjs, database clients, etc.).
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin",
  },
  providers: [], // Providers are defined in auth.ts (Node.js runtime only)
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isAuthApi = nextUrl.pathname.startsWith("/api/auth");

      // Allow auth API routes to pass through
      if (isAuthApi) return true;

      // Protect /admin routes — except the login page itself
      if (isAdminRoute) {
        return isLoggedIn;
      }

      // All other routes are public
      return true;
    },
  },
};

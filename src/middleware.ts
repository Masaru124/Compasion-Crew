import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

// Export as named middleware and default export for compatibility and Turbopack analysis
export { auth as middleware };
export default auth;

export const config = {
  // Protect /admin routes but exclude static assets, api/auth, and other public routes
  matcher: ["/admin/:path*"],
};

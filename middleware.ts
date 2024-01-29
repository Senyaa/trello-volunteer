import { withAuth } from "next-auth/middleware";
import { authOptions } from "@/lib/authOptions";

export default withAuth({
  callbacks: {
    authorized: async ({ token, req: { cookies } }) => {
      if (token) {
        return true;
      }

      const sessionToken = cookies.get("next-auth.session-token");

      return sessionToken != null;
    },
  },
  pages: authOptions.pages,
  secret: authOptions.secret,
});

export const config = { matcher: ["/protected/:path*"] };

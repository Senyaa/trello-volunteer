import { AuthOptions } from "next-auth";
import { drizzle, drizzleSchema } from "@/drizzle/drizzle";
import { drizzleAdapter } from "@/drizzle/adapter";
import { eq } from "drizzle-orm";

export const authOptions: AuthOptions = {
  adapter: drizzleAdapter(drizzle),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.trelloId = user.trelloId;
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user, account }) {
      await drizzle
        .update(drizzleSchema.account)
        .set({
          oauthToken: (account as any).oauth_token,
          oauthTokenSecret: (account as any).oauth_token_secret,
        })
        .where(eq(drizzleSchema.account.userId, user.id))
        .returning();

      return true;
    },
  },

  providers: [
    {
      id: "trello",
      name: "Trello",
      type: "oauth",
      version: "1.0A",
      accessTokenUrl: "https://trello.com/1/OAuthGetAccessToken",
      requestTokenUrl: "https://trello.com/1/OAuthGetRequestToken",
      authorization: "https://trello.com/1/OAuthAuthorizeToken",
      profileUrl: "https://api.trello.com/1/members/me",
      clientId: process.env.NEXT_PUBLIC_TRELLO_API,
      clientSecret: process.env.NEXT_PUBLIC_TRELLO_SECRET,
      profile(profile) {
        return {
          trelloId: profile.id,
          id: profile.id,
          name: profile.username,
          fullName: profile.fullName,
          image: profile.avatarUrl,
          boards: profile.idBoards,
        };
      },
    },
  ],
};

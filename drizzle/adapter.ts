import { PgDatabase } from "drizzle-orm/pg-core";
import * as schema from "./drizzleSchema";
import { Adapter } from "next-auth/adapters";
import { and, eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export function drizzleAdapter(
  client: InstanceType<typeof PgDatabase>
): Adapter {
  const { users, accounts, sessions, verificationTokens } = schema;

  return {
    //@ts-expect-error
    async createUser(data) {
      return await client
        .insert(users)
        .values({ ...data, id: createId() })
        .returning()
        .then((res) => res[0] ?? null);
    },
    //@ts-expect-error
    async getUser(data) {
      console.log("getUser", data);
      return await client
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => res[0] ?? null);
    },
    //@ts-expect-error
    async getUserByEmail(data) {
      console.log("getUserByEmail", data);
      return await client
        .select()
        .from(users)
        .where(eq(users.email, data))
        .then((res) => res[0] ?? null);
    },
    async createSession(data) {
      return await client
        .insert(sessions)
        .values({ ...data, id: createId() })
        .returning()
        .then((res) => res[0]);
    },
    //@ts-expect-error
    async getSessionAndUser(data) {
      return await client
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0] ?? null);
    },
    //@ts-expect-error
    async updateUser(data) {
      if (!data.id) {
        throw new Error("No user id.");
      }

      return await client
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .then((res) => res[0]);
    },
    async updateSession(data) {
      return await client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0]);
    },
    async linkAccount(rawAccount) {
      //@ts-expect-error
      return stripUndefined(
        await client
          .insert(accounts)
          //@ts-expect-error
          .values(rawAccount)
          .returning()
          .then((res) => res[0])
      );
    },
    //@ts-expect-error
    async getUserByAccount(account) {
      console.log("getUserByAccount", account);
      const dbAccount =
        (await client
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider)
            )
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null;

      console.log(dbAccount);

      return dbAccount?.User ?? null;
    },
    async deleteSession(sessionToken) {
      const session = await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .then((res) => res[0] ?? null);

      return session;
    },
    async createVerificationToken(token) {
      return await client
        .insert(verificationTokens)
        .values(token)
        .returning()
        .then((res) => res[0]);
    },
    async useVerificationToken(token) {
      try {
        return await client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token)
            )
          )
          .returning()
          .then((res) => res[0] ?? null);
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
    async deleteUser(id) {
      await client
        .delete(users)
        .where(eq(users.id, id))
        .returning()
        .then((res) => res[0] ?? null);
    },
    async unlinkAccount(account) {
      const { type, provider, providerAccountId, userId } = await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .returning()
        .then((res) => res[0] ?? null);

      return { provider, type, providerAccountId, userId };
    },
  };
}

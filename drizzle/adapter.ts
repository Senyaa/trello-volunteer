import { PgDatabase } from "drizzle-orm/pg-core";
import * as schema from "./drizzleSchema";
import { Adapter } from "next-auth/adapters";
import { and, eq } from "drizzle-orm";

type NonNullableProps<T> = {
  [P in keyof T]: null extends T[P] ? never : P
}[keyof T]

function stripUndefined<T>(obj: T): Pick<T, NonNullableProps<T>> {
  const result = {} as T
  for (const key in obj) if (obj[key] !== undefined) result[key] = obj[key]
  return result
}

export function drizzleAdapter(
  client: InstanceType<typeof PgDatabase>
): Adapter {
  const { user, account, session, verificationToken } = schema;

  return {
    async createUser(data) {
      return await client
        .insert(user)
        .values(data)
        .returning()
        .then((res) => res[0] ?? null);
    },
    async getUser(data) {
      return await client
        .select()
        .from(user)
        .where(eq(user.id, data))
        .then((res) => res[0] ?? null);
    },
    async getUserByEmail(data) {
      return await client
        .select()
        .from(user)
        .where(eq(user.email, data))
        .then((res) => res[0] ?? null);
    },
    async createSession(data) {
      return await client
        .insert(session)
        .values(data)
        .returning()
        .then((res) => res[0]);
    },
    async getSessionAndUser(data) {
      return await client
        .select({
          session: session,
          user: user,
        })
        .from(session)
        .where(eq(session.sessionToken, data))
        .innerJoin(user, eq(user.id, session.userId))
        .then((res) => res[0] ?? null);
    },
    async updateUser(data) {
      if (!data.id) {
        throw new Error("No user id.");
      }

      return await client
        .update(user)
        .set(data)
        .where(eq(user.id, data.id))
        .returning()
        .then((res) => res[0]);
    },
    async updateSession(data) {
      return await client
        .update(session)
        .set(data)
        .where(eq(session.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0]);
    },
    async linkAccount(rawAccount) {
      return stripUndefined(
        await client
          .insert(account)
          .values({
            ...rawAccount,
            oauthToken: rawAccount.oauth_token as string,
            oauthTokenSecret: rawAccount.oauth_token_secret as string,
          })
          .returning()
          .then((res) => res[0])
      );
    },
    async getUserByAccount(acc) {
      const dbAccount =
        (await client
          .select()
          .from(account)
          .where(
            and(
              eq(account.providerAccountId, acc.providerAccountId),
              eq(account.provider, acc.provider)
            )
          )
          .leftJoin(user, eq(account.userId, user.id))
          .then((res) => res[0])) ?? null;

      return dbAccount?.user ?? null;
    },
    async deleteSession(sessionToken) {
      const sessionReturned = await client
        .delete(session)
        .where(eq(session.sessionToken, sessionToken))
        .returning()
        .then((res) => res[0] ?? null);

      return sessionReturned;
    },
    async createVerificationToken(token) {
      return await client
        .insert(verificationToken)
        .values(token)
        .returning()
        .then((res) => res[0]);
    },
    async useVerificationToken(token) {
      try {
        return await client
          .delete(verificationToken)
          .where(
            and(
              eq(verificationToken.identifier, token.identifier),
              eq(verificationToken.token, token.token)
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
        .delete(user)
        .where(eq(user.id, id))
        .returning()
        .then((res) => res[0] ?? null);
    },
    async unlinkAccount(acc) {
      const { type, provider, providerAccountId, userId } = await client
        .delete(account)
        .where(
          and(
            eq(account.providerAccountId, acc.providerAccountId),
            eq(account.provider, acc.provider)
          )
        )
        .returning()
        .then((res) => res[0] ?? null);

      return { provider, type, providerAccountId, userId };
    },
  };
}

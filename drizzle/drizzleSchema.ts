import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";

export const accounts = pgTable(
  "Account",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    oauth_token: text("oauth_token"),
    oauth_token_secret: text("oauth_token_secret"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("Session", {
  id: text("id").primaryKey(),
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const shifts = pgTable("Shift", {
  id: text("id").notNull().primaryKey(),
  shiftType: text("shiftType"),
  finished: timestamp("finished"),
  started: timestamp("started"),
  description: text("description"),
});

export const users = pgTable("User", {
  id: text("id").primaryKey(),
  trelloId: text("trelloId"),
  name: text("name"),
  fullName: text("fullName"),
  email: text("email"),
  emailVerified: timestamp("emailVerified"),
  image: text("image"),
  boards: text("boards").array(),
});

export const verificationTokens = pgTable(
  "VerificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const usersOnShift = pgTable(
  "UsersOnShift",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    shiftId: text("shiftId")
      .notNull()
      .references(() => shifts.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.shiftId] }),
  })
);

export const animalOnShift = pgTable("AnimalOnShift", {
  id: text("id").primaryKey(),
  animalTrelloId: text("animalTrelloId"),
  shiftId: text("shiftId"),
  done: boolean("done"),
  description: text("description"),
});

export const settings = pgTable("Settings", {
  userId: text("userId").primaryKey(),
  foodEnabled: boolean("foodEnabled").default(true),
  medsEnabled: boolean("medsEnabled").default(false),
  testsEnabled: boolean("testsEnabled").default(false),
  statusEnabled: boolean("statusEnabled").default(false),
  personalityEnabled: boolean("personalityEnabled").default(false),
  castrationEnabled: boolean("castrationEnabled").default(false),
});

export const userRelations = relations(users, ({ many, one }) => ({
  shifts: many(usersOnShift),
  settings: one(settings),
}));

export const shiftRelations = relations(shifts, ({ many }) => ({
  usersOnShift: many(usersOnShift),
}));

export const usersOnShiftRelations = relations(usersOnShift, ({ one }) => ({
  shift: one(shifts, {
    fields: [usersOnShift.shiftId],
    references: [shifts.id],
  }),
  user: one(users, {
    fields: [usersOnShift.userId],
    references: [users.id],
  }),
}));

export const settingsRelations = relations(settings, ({ one }) => ({
  user: one(users, {
    fields: [settings.userId],
    references: [users.id],
  }),
}));

export const imageUrl = pgTable("ImageUrl", {
  attachmentId: text("attachmentId"),
  url: text("url"),
  createdAt: timestamp("createdAt").default(sql`now()`),
});

export const document = pgTable("Document", {
  id: text("id"),
  name: text("name"),
  createdAt: timestamp("createdAt").default(sql`now()`),
  content: text("content"),
});

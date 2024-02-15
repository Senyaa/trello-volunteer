import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";

export const account = pgTable(
  "account",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    oauthToken: text("oauth_token"),
    oauthTokenSecret: text("oauth_token_secret"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (account) => ({
    uniqueProvider: unique().on(account.provider, account.providerAccountId),
  })
);

export const session = pgTable("session", {
  sessionToken: text("session_token").notNull().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const shift = pgTable("shift", {
  id: uuid("id").primaryKey().defaultRandom(),
  shiftType: text("shift_type"),
  finished: timestamp("finished"),
  started: timestamp("started"),
  description: text("description"),
});

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  trelloId: text("trello_id"),
  name: text("name"),
  fullName: text("full_name"),
  email: text("email").default("").notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  boards: text("boards").array(),
});

export const verificationToken = pgTable(
  "verification_token",
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
  "users_on_shift",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    shiftId: uuid("shift_id")
      .notNull()
      .references(() => shift.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.shiftId] }),
  })
);

export const animalOnShift = pgTable(
  "animal_on_shift",
  {
    shiftId: uuid("shift_id"),
    animalTrelloId: text("animal_trello_id"),
    done: boolean("done"),
    description: text("description"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.shiftId, t.animalTrelloId] }),
  })
);

export const settings = pgTable("settings", {
  userId: uuid("user_id").primaryKey(),
  foodEnabled: boolean("food_enabled").notNull().default(true),
  medsEnabled: boolean("meds_enabled").notNull().default(false),
  testsEnabled: boolean("tests_enabled").notNull().default(false),
  statusEnabled: boolean("status_enabled").notNull().default(false),
  personalityEnabled: boolean("personality_enabled").notNull().default(false),
  castrationEnabled: boolean("castration_enabled").notNull().default(false),
});

export const userRelations = relations(user, ({ many, one }) => ({
  shifts: many(usersOnShift),
  settings: one(settings),
  account: one(account),
}));

export const shiftRelations = relations(shift, ({ many }) => ({
  usersOnShift: many(usersOnShift),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const usersOnShiftRelations = relations(usersOnShift, ({ one }) => ({
  shift: one(shift, {
    fields: [usersOnShift.shiftId],
    references: [shift.id],
  }),
  user: one(user, {
    fields: [usersOnShift.userId],
    references: [user.id],
  }),
}));

export const settingsRelations = relations(settings, ({ one }) => ({
  user: one(user, {
    fields: [settings.userId],
    references: [user.id],
  }),
}));

export const imageUrl = pgTable("image_url", {
  attachmentId: text("attachment_id").primaryKey(),
  url: text("url"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const document = pgTable("document", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  createdAt: timestamp("created_at").default(sql`now()`),
  content: text("content"),
});

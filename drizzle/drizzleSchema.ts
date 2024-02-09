import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgTable,
  primaryKey,
  text,
  uuid,
} from "drizzle-orm/pg-core";

export const shifts = pgTable("Shift", {
  id: uuid("id").primaryKey(),
  shiftType: text("shiftType"),
  finished: date("finished"),
});

export const users = pgTable("User", {
  id: uuid("id").primaryKey(),
});

export const usersOnShift = pgTable(
  "UsersOnShift",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id),
    shiftId: uuid("shiftId")
      .notNull()
      .references(() => shifts.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.shiftId),
  })
);

export const animalOnShift = pgTable("AnimalOnShift", {
  id: uuid("id").primaryKey().defaultRandom(),
  animalTrelloId: uuid("animalTrelloId"),
  shiftId: uuid("shiftId"),
  done: boolean("done"),
  description: text("description"),
});

export const userRelations = relations(users, ({ many }) => ({
  shifts: many(usersOnShift),
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

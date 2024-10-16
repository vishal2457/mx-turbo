import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const TB_user = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    active: boolean("active").default(true),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").$onUpdate(() => new Date()),
  },
  (adminUser) => ({
    emailIdx: uniqueIndex("emailIdx").on(adminUser.email),
  })
);

export const Z_user_insert = createInsertSchema(TB_user);
export const Z_user = createSelectSchema(TB_user);
export type TUser = typeof TB_user.$inferSelect;

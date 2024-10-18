import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const TB_customer = pgTable("customer", {
  id: serial("id").primaryKey(),
  deviceID: text("deviceID").notNull().unique(),
  device: text("device").default("ios"),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
  password: text("password").notNull(),
  isVerified: boolean("isVerified").default(false),
  bio: text("bio").default(""),
  avatar: text("avatar").default(""),
  homeTown: text("homeTown").default(""),
  gender: text("gender").default("Male"),
  createdAt: text("createdAt").notNull().default("now()"),
  updatedAt: text("updatedAt").notNull().default("now()"),
});

export const Z_customer_insert = createInsertSchema(TB_customer);
export const Z_customer = createSelectSchema(TB_customer);

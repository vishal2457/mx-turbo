import { integer } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { TB_customer } from "../customer/customer.schema";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";

export const TRIP_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const statusEnum = pgEnum("status", [
  TRIP_STATUS.PENDING,
  TRIP_STATUS.IN_PROGRESS,
  TRIP_STATUS.COMPLETED,
  TRIP_STATUS.CANCELLED,
]);

export const TB_trip = pgTable("trip", {
  id: serial("id").primaryKey(),
  customerID: integer("customerID")
    .notNull()
    .references(() => TB_customer.id),
  name: text("name").notNull(),
  status: statusEnum("status").default(TRIP_STATUS.PENDING),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  createdAt: text("createdAt").notNull().default("now()"),
  updatedAt: text("updatedAt").notNull().default("now()"),
});

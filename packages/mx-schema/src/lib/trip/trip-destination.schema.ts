import { text } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { TB_trip } from "./trip.schema";
import { integer } from "drizzle-orm/pg-core";
import { TB_customer } from "../customer/customer.schema";

export const TB_trip_destination = pgTable("trip_destination", {
  id: serial("id").primaryKey(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  tripID: integer("tripID")
    .notNull()
    .references(() => TB_trip.id),
  createdBy: integer("createdBy")
    .notNull()
    .references(() => TB_customer.id),
});

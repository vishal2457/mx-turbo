import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env` });

import { Pool } from "pg";
import {
  TB_customer,
  TB_customerFcm,
  TB_menu,
  TB_notification,
  TB_role,
  TB_user,
} from "@repo/mx-schema";
import { seedMenu } from "./menu";
import { hashPassword } from "../../shared/password-hash";
import { eq } from "drizzle-orm";

const pool = new Pool({
  host: process.env.NODE_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "maximus",
});

async function seed() {
  const db = drizzle(pool, {
    logger: true,
    schema: {
      TB_user,
      TB_customer,
      TB_customerFcm,
      TB_menu,
      TB_notification,
      TB_role,
    },
  });

  await db.delete(TB_menu);
  await db.insert(TB_menu).values(seedMenu);

  await db.delete(TB_user).where(eq(TB_user.email, "test@test.com"));
  await db
    .insert(TB_user)
    .values([{ email: "test@test.com", password: hashPassword("123") }]);

  await db.delete(TB_role).where(eq(TB_role.name, "admin"));
  await db
    .insert(TB_role)
    .values([
      { name: "admin", description: "Admin role with all the permissions" },
    ]);

  process.exit(0);
}

seed();

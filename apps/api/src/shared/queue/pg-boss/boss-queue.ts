import PgBoss from "pg-boss";
import { APP_SETTINGS } from "../../app-settings";

const boss = new PgBoss(
  `postgres://${APP_SETTINGS.DB_USERNAME}:${APP_SETTINGS.DB_PASSWORD}@${APP_SETTINGS.DB_HOST}/${APP_SETTINGS.DB_NAME}`
);

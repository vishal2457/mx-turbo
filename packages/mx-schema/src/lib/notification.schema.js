"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z_notification = exports.Z_notification_insert = exports.TB_notification = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.TB_notification = (0, pg_core_1.pgTable)('notifications', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    body: (0, pg_core_1.text)('body').notNull(),
    image: (0, pg_core_1.text)('imageUrl'),
    createdAt: (0, pg_core_1.timestamp)('createdAt').notNull().defaultNow(),
    udpatedAt: (0, pg_core_1.timestamp)('updatedAt').$onUpdate(() => (0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
});
exports.Z_notification_insert = (0, drizzle_zod_1.createInsertSchema)(exports.TB_notification);
exports.Z_notification = (0, drizzle_zod_1.createSelectSchema)(exports.TB_notification);

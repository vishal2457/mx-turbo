"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z_customer = exports.Z_customer_insert = exports.TB_customer = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.TB_customer = (0, pg_core_1.pgTable)('customer', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    deviceID: (0, pg_core_1.text)('deviceID').notNull().unique(),
    device: (0, pg_core_1.text)('device').default('ios'),
    removeAds: (0, pg_core_1.boolean)('removeAds').default(false),
});
exports.Z_customer_insert = (0, drizzle_zod_1.createInsertSchema)(exports.TB_customer);
exports.Z_customer = (0, drizzle_zod_1.createSelectSchema)(exports.TB_customer);

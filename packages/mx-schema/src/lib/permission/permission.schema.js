"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z_permission_insert = exports.Z_permission = exports.TB_permission = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.TB_permission = (0, pg_core_1.pgTable)('permission', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
});
exports.Z_permission = (0, drizzle_zod_1.createSelectSchema)(exports.TB_permission);
exports.Z_permission_insert = (0, drizzle_zod_1.createInsertSchema)(exports.TB_permission);

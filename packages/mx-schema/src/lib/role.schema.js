"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z_role = exports.Z_role_insert = exports.TB_role = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.TB_role = (0, pg_core_1.pgTable)('role', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
});
exports.Z_role_insert = (0, drizzle_zod_1.createInsertSchema)(exports.TB_role);
exports.Z_role = (0, drizzle_zod_1.createSelectSchema)(exports.TB_role);

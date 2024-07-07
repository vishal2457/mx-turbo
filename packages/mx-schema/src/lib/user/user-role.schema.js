"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z_userRole = exports.Z_userRole_insert = exports.TB_userRole = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.TB_userRole = (0, pg_core_1.pgTable)('userRole', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    roleID: (0, pg_core_1.integer)('roleID').notNull(),
    userID: (0, pg_core_1.integer)('userID').notNull(),
});
exports.Z_userRole_insert = (0, drizzle_zod_1.createInsertSchema)(exports.TB_userRole);
exports.Z_userRole = (0, drizzle_zod_1.createSelectSchema)(exports.TB_userRole);

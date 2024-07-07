"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z_rolePermission_insert = exports.Z_rolePermission = exports.TB_rolePermission = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.TB_rolePermission = (0, pg_core_1.pgTable)('rolePermission', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    permissionID: (0, pg_core_1.integer)('permissionID').notNull(),
    roleID: (0, pg_core_1.integer)('roleID').notNull(),
}, (rolePermission) => ({
    roleIdx: (0, pg_core_1.index)('roleIdx').on(rolePermission.roleID),
    permissionIdx: (0, pg_core_1.index)('permissionIdx').on(rolePermission.permissionID),
}));
exports.Z_rolePermission = (0, drizzle_zod_1.createSelectSchema)(exports.TB_rolePermission);
exports.Z_rolePermission_insert = (0, drizzle_zod_1.createInsertSchema)(exports.TB_rolePermission);

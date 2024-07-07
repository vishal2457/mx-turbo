"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z_user = exports.Z_user_insert = exports.TB_user = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.TB_user = (0, pg_core_1.pgTable)('user', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name'),
    email: (0, pg_core_1.text)('email').notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    active: (0, pg_core_1.boolean)('active').default(true),
    createdAt: (0, pg_core_1.timestamp)('createdAt').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt').$onUpdate(() => new Date()),
}, (adminUser) => ({
    emailIdx: (0, pg_core_1.uniqueIndex)('emailIdx').on(adminUser.email),
}));
exports.Z_user_insert = (0, drizzle_zod_1.createInsertSchema)(exports.TB_user);
exports.Z_user = (0, drizzle_zod_1.createSelectSchema)(exports.TB_user);

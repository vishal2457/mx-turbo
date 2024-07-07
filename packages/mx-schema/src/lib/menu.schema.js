"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z_menu = exports.Z_menu_insert = exports.TB_menu = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.TB_menu = (0, pg_core_1.pgTable)('menu', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    icon: (0, pg_core_1.text)('icon').notNull(),
    link: (0, pg_core_1.text)('link').notNull(),
    active: (0, pg_core_1.boolean)('active').default(true),
    parent: (0, pg_core_1.integer)('parent'),
});
exports.Z_menu_insert = (0, drizzle_zod_1.createInsertSchema)(exports.TB_menu);
exports.Z_menu = (0, drizzle_zod_1.createSelectSchema)(exports.TB_menu);
